# Privacy Policy for Ascian Gatekeeper

**Last Updated:** August 8, 2026

## TL;DR (The Actually Useful Version)

- ❌ We don't process images for metadata — this bot has no AI or metadata features
- ❌ We don't store your messages, images, or any content you post
- ❌ We don't track you, build profiles, or sell your data
- ✅ We DO keep some operational data so the bot can do its job: each server's
  settings, and a moderation/safety record (the anti-scam **ban registry**) — full
  details below
- ⚠️ The bot performs **automated anti-spam / anti-scam moderation**, which can
  **delete messages and ban users**, and shares its ban registry across every server
  the same bot instance runs in

## What This Bot Does

Ascian Gatekeeper is a Discord bot focused on server security and community fun features.

**Automated moderation (anti-spam / anti-scam):**
In a monitored server the bot inspects messages, senders, and attachments for known scam/spam
patterns, and can **automatically delete messages or ban users**. To recognise repeat
offenders it keeps a moderation record — see "What We Store" below. Server admins
control whether this is on and how it's configured via `/settings`.

**Fun & utility commands:**
`/decide`, `/poll`, `/wildcard`, `/goodnight`, `/interact`, plus a Question-of-the-Day
system and `/remind`. These operate on the content you explicitly provide in the command
and do not inspect or store message content outside of what you type into the command.

## What Data We Collect

### Discord IDs (Mostly Transient)
- **What:** Your Discord user ID, channel IDs, role IDs
- **Why:** To know who to respond to, which channels to monitor, and to run moderation
- **How long:** Usually only while processing a message
- **Storage:** Not stored — *except* where an ID is part of the persistent data described
  in "What We Store" below (e.g. a banned user's ID, or the trusted-role / channel IDs an
  admin saves in server settings)

### Reminder Text (if used)
- **What:** The text you provide in a `/remind` command
- **Why:** To deliver your reminder at the requested time
- **How long:** Until delivered or deleted
- **Storage:** In the `schedules.json` file on the bot host

### QOTD Questions (if used)
- **What:** Questions added by server admins via `/qotd add`
- **Why:** To build a question bank for the Question-of-the-Day feature
- **How long:** Until removed by an admin
- **Storage:** In the `qotd-questions.json` or `schedules.json` file on the bot host

### Logs (If Enabled)
- **What:** Basic operational logs (errors, command usage)
- **Why:** Debugging and making sure the bot works
- **What's logged:** Timestamps, general events like "command executed," error messages
- **What's NOT logged:** Your message content, your personal info
- **Retention:** Depends on host setup, typically rotated/deleted regularly

## What We Store (The Stuff We DO Keep)

We don't keep your messages or any content posted in servers beyond what's needed for
moderation and bot operation. This data lives in plain JSON files on the bot host —
there is no cloud database.

### Moderation & Safety Record — the "ban registry"
When automated moderation acts (or a moderator uses the `/banregistry` command), the bot
stores:
- **Banned users:** the user's Discord ID, the reason, a timestamp, the server it
  happened in, and — for manual actions — the acting moderator's ID
- **Scam-message fingerprints:** a one-way hash of a flagged message plus a short sample
  (first ~100 characters) of it, so identical scam blasts are caught again
- **Word filters:** patterns an admin chooses to warn/delete/ban on, plus who added them
- **Why:** to recognise repeat offenders and known scam campaigns and protect servers
- **Cross-server:** this registry is shared across every server the same bot instance runs
  in — a user banned for scamming in one server is flagged on sight in the others
- **Retention:** kept until a moderator removes the entry (`/banregistry`) or the bot
  operator resets the registry

### Server Settings
- **What:** each server's feature toggles, and the moderation routing an admin sets via
  `/settings` — the alert channel, monitored channels, trusted roles, and any trusted
  user IDs
- **Why:** so the bot remembers how each server wants it configured
- **Retention:** until changed, or until the bot is removed from the server

### Reminders / Question-of-the-Day (only if used)
- **What:** reminder text and user ID; QOTD channel configs and question schedule
- **Why:** to deliver reminders and post QOTD questions on schedule
- **Retention:** until delivered/removed

### User Reports (only if used)
- **What:** when a user runs `/report file`, the bot stores the reported user's ID, the
  reporter's ID, the reason, and a timestamp
- **Why:** to track report patterns; enough unique reporters against the same user in a
  7-day window triggers an automatic timeout
- **Retention:** 7 days, or until the report is manually cleared

## What Data We DON'T Collect

- ❌ Your message content — *except* that automated moderation inspects messages for
  scam/spam patterns and may store a short sample of a **flagged** message in the ban
  registry (see "What We Store")
- ❌ Your images or attachments
- ❌ Your prompts or AI responses (this bot has no AI features)
- ❌ Your IP address
- ❌ Tracking cookies (it's a Discord bot, not a website)
- ❌ Analytics/telemetry
- ❌ Usage statistics tied to your identity

## How We Use Your Data

We use data only to run the features you (and your server) use: **automated moderation**
of the server, **fun and utility commands**, and **per-server configuration**.

We do NOT:
- Sell your data
- Share your data with third parties for marketing
- Use your data for advertising
- Use your data for analytics or profiling
- Send your data to any AI provider (this bot has no AI features)

## Third-Party Services

This bot does not use any third-party AI services, image processing services, or external
APIs beyond Discord itself. All processing happens locally on the bot host.

### Discord
Obviously, this is a Discord bot. Discord's privacy policy applies to all Discord interactions:
https://discord.com/privacy

## Your Rights

We store very little about you, but here's how to manage it:

- ✅ **Right to know:** The moderation record (ban registry) contains only what is listed
  in "What We Store" above. A server admin can view it via `/banregistry view`.
- ✅ **Right to delete:** A moderation record (e.g. a ban-registry entry) can be removed
  by a server admin (`/banregistry removeuser`) or the bot operator on request
- ✅ **Right to opt-out:** Don't use the bot in monitored channels, block the bot, or ask
  server admins to remove it
- ✅ **Right to ask questions:** Contact us (see below)

## Data Security

- 🔒 Persistent data (ban registry, server settings, reminders, reports) is stored in
  plain JSON files on the bot host, protected by the host's filesystem permissions —
  there is no separate cloud database
- 🔒 Bot token and API keys stored securely (not in code)
- 🔒 Open source = you can verify everything we're saying

## Self-Hosting

If you self-host this bot:
- **You** are responsible for data handling on your server
- **You** should review this privacy policy and modify if needed
- **You** control what gets logged and where
- **You** should ensure your hosting complies with applicable laws

## Children's Privacy

This bot is not directed at children under 13. We don't knowingly collect data from
children. If you're under 13, you shouldn't be on Discord anyway (per Discord's ToS).

## Changes to This Policy

If we update this policy, we'll:
- Update the "Last Updated" date
- Post changes in the GitHub repository
- Notify users through Discord (if we have a way to reach you)

## International Users

This bot may be hosted anywhere. If you're in the EU, GDPR applies. Good news: we already
don't store your personal data, so we're pretty compliant by default.

**GDPR-specific notes:**
- **Legal basis:** Legitimate interest — providing the service you requested, and
  protecting servers from spam/scam abuse (the basis for the moderation record)
- **Data retention:** Moderation records and server settings are kept until removed by a
  moderator/admin or the operator (see "What We Store")
- **Right to erasure:** To remove a moderation record, contact a server admin (they can
  use `/banregistry`) or the bot operator
- **Data portability:** We hold minimal personal data — only what is described in "What
  We Store"

## Contact

Questions? Concerns? Found a privacy issue?

- **GitHub Issues:** https://github.com/Ktiseos-Nyx/Ascian-Gatekeeper/issues
- **Project Maintainer:** See GitHub repository

**Prefer Discord support?**
- Under Rug Swept Misfits: https://discord.gg/5t2kYxt7An

## The Legal Stuff (Actually Readable Version)

**We don't store your messages or content** — outside of the moderation record and
operational data described above. We process messages to detect scams and spam, run the
fun/utility commands you explicitly invoke, and keep servers safe.

**We're not doing anything sketchy.** This is a security + community bot. It detects scams,
runs fun commands, and keeps a ban registry to protect servers.

**If you don't trust us:** The code is open source. Read it. Verify it. Self-host it.

**If something seems wrong:** Tell us. We'll fix it.

---

**Remember:** The best privacy policy is keeping as little as possible — so we keep only
what the bot genuinely needs to work.

*This privacy policy was written by humans, for humans. If you need a lawyer-approved
version for commercial use, consult an actual lawyer.*
