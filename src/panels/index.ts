import type { GuildEntry } from '../lib/settings-types';
import { buildModerationPanel } from './moderation';
import { buildTrustPanel } from './trust';
import { buildFunPanel } from './fun';

export type Page = 'moderation' | 'trust' | 'fun';

export function buildSettingsPanel(state: GuildEntry, page: Page) {
  switch (page) {
    case 'moderation':
      return buildModerationPanel(state);
    case 'trust':
      return buildTrustPanel(state);
    case 'fun':
      return buildFunPanel(state);
    default:
      // Fallback just in case
      return buildModerationPanel(state); 
  }
}