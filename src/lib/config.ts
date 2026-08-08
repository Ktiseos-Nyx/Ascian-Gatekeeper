import 'dotenv/config';
import fs from 'fs';
import type { EnvModDefaults } from './settings-types';
import { CROSS_POST_WINDOW } from './security';

function parseIdList(envVar: string | undefined): Set<string> {
  if (!envVar || envVar === '[]') return new Set();
  return new Set(envVar.split(',').map(s => s.trim()).filter(Boolean));
}

// ── Raw config file (optional) ───────────────────────────────────────────────
let fileConfig: Record<string, any> = {};
if (fs.existsSync('config.toml')) {
  const raw = fs.readFileSync('config.toml', 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (!m) continue;
    const [, key, val] = m;
    if (val.startsWith('[')) {
      fileConfig[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
    } else {
      fileConfig[key] = val.replace(/['"]/g, '').trim();
    }
  }
}

function cfg(envKey: string, configKey: string, fallback: string): string {
  return process.env[envKey] ?? fileConfig[configKey] ?? fallback;
}

function cfgInt(envKey: string, configKey: string, fallback: number, min: number, max = Number.MAX_SAFE_INTEGER): number {
  const n = parseInt(cfg(envKey, configKey, String(fallback)), 10);
  return Math.min(Math.max(Number.isFinite(n) ? n : fallback, min), max);
}

function cfgList(envKey: string, configKey: string, fallback: string): string[] {
  const raw: unknown = process.env[envKey] ?? fileConfig[configKey] ?? fallback;
  const parts = Array.isArray(raw) ? raw.map(String) : String(raw).split(',');
  return parts.map(s => s.trim()).filter(Boolean);
}

// ── Discord ───────────────────────────────────────────────────────────────────
export const BOT_TOKEN = process.env.BOT_TOKEN ?? '';
export const ALLOWED_GUILD_IDS = parseIdList(process.env.ALLOWED_GUILD_IDS);
export const MONITORED_CHANNEL_IDS = parseIdList(process.env.MONITORED_CHANNEL_IDS);

// ── Security ──────────────────────────────────────────────────────────────────
export const CATCHER_ROLE_ID = process.env.CATCHER_ROLE_ID ?? fileConfig['CATCHER_ROLE_ID'] ?? '';
export const TRUSTED_USER_IDS = parseIdList(process.env.TRUSTED_USER_IDS);
export const ADMIN_CHANNEL_IDS = parseIdList(process.env.ADMIN_CHANNEL_IDS ?? process.env.ADMIN_CHANNEL_ID);
export const DM_ALLOWED_USER_IDS = parseIdList(process.env.DM_ALLOWED_USER_IDS);
export const DM_RESPONSE_MESSAGE = process.env.DM_RESPONSE_MESSAGE ?? '👋 This bot is configured for server use only.';

export const MEDIA_SPAM_CHANNELS = cfgInt('MEDIA_SPAM_CHANNELS', 'MEDIA_SPAM_CHANNELS', 4, 2);
export const MEDIA_SPAM_SAME_CHANNELS = cfgInt('MEDIA_SPAM_SAME_CHANNELS', 'MEDIA_SPAM_SAME_CHANNELS', 3, 2);
export const MEDIA_SPAM_WINDOW_SEC = cfgInt('MEDIA_SPAM_WINDOW_SEC', 'MEDIA_SPAM_WINDOW_SEC', 120, 1, CROSS_POST_WINDOW);
export const LARGE_MEDIA_TYPES = new Set(
  cfgList('LARGE_MEDIA_TYPES', 'LARGE_MEDIA_TYPES', 'image/gif').map(s => s.toLowerCase()),
);
const HONEYPOT_MODE_RAW = cfg('HONEYPOT_MODE', 'HONEYPOT_MODE', 'crosspost');
export const HONEYPOT_MODE: 'off' | 'crosspost' | 'strict' =
  HONEYPOT_MODE_RAW === 'off' || HONEYPOT_MODE_RAW === 'strict' ? HONEYPOT_MODE_RAW : 'crosspost';
export const GIF_SOURCE_DOMAINS = cfgList(
  'GIF_SOURCE_DOMAINS', 'GIF_SOURCE_DOMAINS',
  'tenor.com,giphy.com,gfycat.com,media.discordapp.net,cdn.discordapp.com,imgur.com',
).map(s => s.toLowerCase());

export const BLOCKED_IMAGE_DOMAINS = new Set(
  cfgList('BLOCKED_IMAGE_DOMAINS', 'BLOCKED_IMAGE_DOMAINS', '')
    .map(s => s.toLowerCase()),
);

export const ENV_MOD_DEFAULTS: EnvModDefaults = {
  alertChannelIds: ADMIN_CHANNEL_IDS,
  trustedRoleIds: new Set<string>(),
  trustedUserIds: TRUSTED_USER_IDS,
  monitoredChannelIds: MONITORED_CHANNEL_IDS,
  catcherRoleId: CATCHER_ROLE_ID || null,
  mediaSpamChannels: MEDIA_SPAM_CHANNELS,
  mediaSpamSameChannels: MEDIA_SPAM_SAME_CHANNELS,
  mediaSpamWindowSec: MEDIA_SPAM_WINDOW_SEC,
  largeMediaTypes: LARGE_MEDIA_TYPES,
  honeypotMode: HONEYPOT_MODE,
  gifSourceDomains: GIF_SOURCE_DOMAINS,
  blockedImageDomains: [...BLOCKED_IMAGE_DOMAINS],
};
