# Ascian Gatekeeper

A Discord bot focused on server security and community fun. Moderation, anti-scam
detection, honeypot roles, cross-server ban registry, and fun commands — with the flair
of fandom and the nightmares of the Ancients. If you've ever considered visiting a
volcano or touching squapes, this bot is for you and your kin. Either that or you're
just looking for a community bot run by the most neurodivergent dev on the planet.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/OCA5uC?referralCode=EQxw4P&utm_medium=integration&utm_source=template&utm_campaign=generic)

[![Twitch](https://img.shields.io/badge/Twitch-Follow%20on%20Twitch-9146FF?logo=twitch&style=for-the-badge)](https://twitch.tv/duskfallcrew)

[![Support us on Ko-fi](https://img.shields.io/badge/Support%20us%20on-Ko--Fi-FF5E5B?style=for-the-badge&logo=kofi)](https://ko-fi.com/duskfallcrew)

## 📑 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Data & Persistence](#data--persistence-important-for-hosted-deploys)
- [Per-Server Settings](#per-server-settings)
- [How to Use](#how-to-use)
- [Security System](#security-system)
- [Guild Allowlist](#guild-allowlist-owner-cost-control)
- [Configuration](#configuration)
- [Permissions](#permissions)
- [Troubleshooting](#troubleshooting)
- [Forking This Bot](#forking-this-bot)
- [Legal](#legal)
- [Credits](#credits)

---

## Features

### Moderation (anti-spam / anti-scam)

- 🛡️ **Behaviour-based scam detection** — crypto/wallet spam scoring
- 🖼️ **Screenshot-spam protection** — 4+ images cross-posted across channels → ban
- 🔣 **Obfuscation detection** — zero-width / zalgo / homoglyph "algo-speak" used to evade filters
- 🗣️ **Mention spam detection** — `@everyone` / `@here` / mass-user-mention attacks
- 🔒 **Malware prevention** — magic-bytes check on attachments and embeds with SSRF protection on embed URLs
- 🗂️ **Cross-server ban registry** — known bad actors and scam fingerprints are remembered across servers the bot runs in
- 🧰 **Admin tools** — `/report`, `/banregistry`, configurable word filters

### Per-server configuration

- ⚙️ **`/settings` panel** — admins toggle features and configure moderation routing per server, no bot-owner involvement
- 🎛️ Set the alert channel, trusted roles/users, monitored channels, and catcher role — all per server

### Fun & utility

- 🎲 `/decide`, `/poll`, `/wildcard`, `/goodnight`, `/interact`
- ⏰ `/remind` (one-time or recurring) and a Question-of-the-Day system

---

## Quick Start

This is a **Node.js / TypeScript** project (Node 22+).

<details>
<summary><b>Local Setup</b></summary>

```bash
# Clone and install
git clone https://github.com/Ktiseos-Nyx/Ascian-Gatekeeper.git
cd Ascian-Gatekeeper
npm install

# Configure
cp config.example.toml config.toml   # optional; env vars take precedence
# Put at least BOT_TOKEN in a .env file

# Run in dev (tsx)
npm run dev

# Or build + run compiled
npm run build
npm start
```

</details>

<details>
<summary><b>Docker</b></summary>

```bash
docker build -t ascian-gatekeeper .

# Mount a volume so persistent data survives restarts (see Data & Persistence)
docker run -d --env-file .env \
  -e DATA_DIR=/data -v ascian-gatekeeper-data:/data \
  ascian-gatekeeper
```

</details>

<details>
<summary><b>Railway</b></summary>

1. Click the **Deploy on Railway** button above.
2. Set `BOT_TOKEN` (and any optional keys) in the service variables.
3. **Add a Volume**, mount it at `/data`, and set `DATA_DIR=/data` — otherwise settings and the ban registry reset on every redeploy (see [Data & Persistence](#data--persistence-important-for-hosted-deploys)).

</details>

<details>
<summary><b>Environment Variables (minimum)</b></summary>

```env
BOT_TOKEN=your_discord_bot_token

# Recommended on hosted/ephemeral platforms
DATA_DIR=/data
```

</details>

---

## Data & Persistence (important for hosted deploys)

The bot stores state in JSON files: `guild_settings.json` (per-server settings),
`ban-registry.json` (cross-server ban/scam registry), `schedules.json` (reminders / QOTD),
and `reports.json`. All of these resolve under **`DATA_DIR`** (default: the working
directory).

> ⚠️ **On ephemeral hosts like Railway, the container disk is wiped on every redeploy.**
> Mount a persistent **volume** and set `DATA_DIR` to it (e.g. `/data`), or per-server
> settings and the ban registry will reset each deploy.

What persists (and why): the moderation/safety record (banned user IDs, reasons, scam
fingerprints), per-server configuration, and any reminders. See the
[Privacy Policy](PRIVACY.md) for the full data story.

---

## Per-Server Settings

Run **`/settings`** (requires **Manage Server**) to open an interactive panel. It's paged:

| Page | What you configure |
| ---- | ------------------ |
| **Moderation** | Anti-scam on/off, alert channel, monitored channels, catcher role |
| **Trust** | Trusted roles and users (skipped by anti-scam) |
| **Fun** | Toggle fun commands, `/interact`, QOTD |

Everything is per server and persists immediately. Where a server hasn't set a value, the
bot falls back to the global environment defaults.

---

## How to Use

### Moderation & reports

- Automated moderation runs in monitored servers when **Anti-scam** is enabled.
- `/report file <user> <reason>` — members report bad actors; enough unique reports auto-times-out the target and alerts mods.
- `/banregistry` — mods view/manage the cross-server ban + pattern registry.

### Fun commands

- `/decide <option1> <option2>` — randomly pick between options
- `/poll <question> [option-a] [option-b]` — run a poll
- `/wildcard` — generate a random art prompt
- `/interact <action> <user>` — hug, poke, taunt, pat, or high-five someone
- `/goodnight` — send a goodnight message
- `/remind set <time> <message>` — set a reminder (e.g. `5m`, `2h`, `1d`, `1wk`)
- `/qotd setup <channel>` — set up a Question of the Day channel

---

## Security System

<details>
<summary><b>🛡️ How moderation works</b></summary>

### Scam scoring → action

| Score | Action |
| ----- | ------ |
| **100+** | Instant ban; message deleted, recent messages purged |
| **75–99** | Message deleted + admins alerted |

Signals include currency symbols / hoisting characters / auto-generated usernames, ALL-CAPS
crypto spam, wallet/SOL/"dead tokens" keywords, missing avatar, and role shape (e.g. a user
whose only role is the configured **catcher** role).

### Other detections

- **Screenshot spam** — 4+ images cross-posted to 2+ channels → ban (or ban on no-roles + gibberish)
- **Algo-speak / obfuscation** — zero-width, zalgo, and Cyrillic-homoglyph evasion; combined with cross-posting → ban
- **Cross-posting** — the same message fingerprinted across 2+ channels
- **Magic bytes** — executables disguised as images, in both attachments and embeds
- **Word filters** — admin-defined patterns with `warn` / `delete` / `ban` actions
- **Ban registry** — banned users and scam fingerprints are shared across every server the bot instance runs in; joins by known bad actors alert mods

### Automatic bypasses

- ✅ Server owner
- ✅ Trusted users and **trusted roles** (set per server via `/settings`)

</details>

---

## Guild Allowlist (owner cost control)

Set **`ALLOWED_GUILD_IDS`** (comma-separated) to restrict where the bot will run. When the
list is **non-empty**, the bot leaves any server that isn't on it — both on invite and via a
startup sweep. When the list is **empty**, the bot runs anywhere (open mode). This is an
owner/env setting, not something server admins can change.

> Before deploying with an allowlist, make sure **every** server you want kept (including
> your own) is in the list, or the startup sweep will leave it.

---

## Configuration

<details>
<summary><b>⚙️ Environment variables</b></summary>

Resolution order: environment variable → `config.toml` → built-in default.

```env
# Discord
BOT_TOKEN=...
ALLOWED_GUILD_IDS=123,456          # empty = run anywhere
MONITORED_CHANNEL_IDS=             # global fallback; prefer per-server /settings

# Moderation routing (global fallback; per-server values set via /settings win)
ADMIN_CHANNEL_IDS=123,456          # where alerts go
TRUSTED_USER_IDS=123,456
CATCHER_ROLE_ID=...
BLOCKED_IMAGE_DOMAINS=imgur.com    # optional; blocklisted image hosts checked on embed links

# Media spam thresholds
MEDIA_SPAM_CHANNELS=4              # channels for any-media track
MEDIA_SPAM_SAME_CHANNELS=3         # channels for identity track
MEDIA_SPAM_WINDOW_SEC=120          # velocity window in seconds
LARGE_MEDIA_TYPES=image/gif        # types treated as raid-risky on direct upload
HONEYPOT_MODE=crosspost            # off | crosspost | strict

# GIF source domains (links treated as media for velocity checks)
GIF_SOURCE_DOMAINS=tenor.com,giphy.com

# Persistence
DATA_DIR=/data                     # set to a mounted volume on hosted deploys
```

</details>

---

## Permissions

**Required:** View Channel, Send Messages, Read Message History.

**For moderation:** Ban Members (bot alerts if missing instead of silently failing), Moderate Members (timeouts), Manage Messages.

---

## Troubleshooting

<details>
<summary><b>Common issues</b></summary>

- **Settings reset after a redeploy** → you're on an ephemeral host without a volume. Set `DATA_DIR` to a mounted volume (see [Data & Persistence](#data--persistence-important-for-hosted-deploys)).
- **Anti-scam catching a legit user** → add them to trusted users/roles via `/settings`; owners are always trusted.
- **Alerts going nowhere** → set the alert channel in `/settings` (or `ADMIN_CHANNEL_IDS` as a global fallback).
- **Bot leaves your server on startup** → your server ID isn't in `ALLOWED_GUILD_IDS`. Add it or clear the list for open mode.

</details>

---

## Forking This Bot

<details>
<summary><b>🍴 Notes for forks</b></summary>

If you fork this bot, update anything personal to the upstream project:

- **Support / donation links** — search the codebase for our Discord
  invites and Ko-fi links and replace them with your own.
- **Bot identity** — the bot works under your own `BOT_TOKEN`; renaming the application or
  bot user in the Discord Developer Portal does not require code changes.
- **Persistence** — set `DATA_DIR` (and a volume) for your own deployment.

Contributions back via pull request are welcome. Run `npm run build` before opening one.

</details>

---

## Legal

- 📄 **[Privacy Policy](PRIVACY.md)** — what we process and what we keep
- 📜 **[Terms of Service](TERMS_OF_SERVICE.md)** — the rules

**Support:**
- Under Rug Swept Misfits: https://discord.gg/5t2kYxt7An

---

## Credits

- **Icon:** Flower icons created by Icongeek26 - Flaticon (base icon, modified for this bot).
- Originally forked from [PromptInspectorBot](https://github.com/sALTaccount/PromptInspectorBot) and [KNX Tools](https://github.com/Ktiseos-Nyx/PromptInspectorBot); since stripped to focus on security and community features.
