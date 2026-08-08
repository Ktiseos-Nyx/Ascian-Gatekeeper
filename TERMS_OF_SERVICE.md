# Terms of Service for Ascian Gatekeeper

**Last Updated:** August 8, 2026

## The Human-Readable Version

By using this bot, you agree to:
- ✅ Not be a jerk
- ✅ Not abuse the bot
- ✅ Not blame us if something breaks
- ✅ Follow Discord's Terms of Service

That's basically it. The rest is legal CYA stuff.

---

## 1. Acceptance of Terms

By using Ascian Gatekeeper ("the Bot"), you agree to these Terms of Service ("Terms").
If you don't agree, don't use the Bot. Simple.

## 2. What This Bot Does

The Bot provides several services, which server admins can enable or disable **per
server** via `/settings`:

**Automated moderation (anti-spam / anti-scam):**
- Inspecting messages, senders, and attachments in monitored servers for known scam/spam
  patterns
- **Automatically deleting messages and/or banning users** that match
- Maintaining a ban registry — shared across servers the same bot instance runs in — so
  repeat offenders and known scam campaigns are caught again

**Fun & utility commands:**
- `/decide` — make random choices
- `/poll` — run yes/no or A/B polls
- `/wildcard` — generate random art prompts
- `/interact` — hug, poke, taunt, pat, or high-five other users
- `/goodnight` — send goodnight messages
- `/remind` — set one-time or recurring reminders
- `/qotd` — Question of the Day system

**Admin tools:**
- `/settings` — per-server configuration panel (moderation, trust, fun features)
- `/security` — configure anti-spam thresholds, trust/untrust users and roles
- `/banregistry` — view and manage the cross-server ban and pattern registry
- `/report` — member reporting with automatic timeout thresholds

**What the Bot does NOT do:**
- No AI features, no image processing, no metadata extraction
- No storing of your messages, images, or content outside of moderation records
- No selling or profiling your data

## 3. Your Responsibilities

### 3.1 Don't Be a Jerk
- Don't spam the Bot with requests
- Don't try to break the Bot
- Don't use the Bot to harass others
- Don't post illegal content

### 3.2 Follow Discord's Rules
- You must comply with Discord's Terms of Service: https://discord.com/terms
- You must comply with Discord's Community Guidelines: https://discord.com/guidelines
- Getting banned from Discord is not our problem

### 3.3 Server Owner Responsibilities
If you invite the Bot to your server:
- You're responsible for configuring it via `/settings` — which channels it monitors,
  whether automated moderation is on, who is trusted, where alerts go
- You should inform your server members that the Bot is active, that **automated
  moderation may delete messages and ban users**, and that bans contribute to a
  **registry shared across servers the bot runs in**
- You are responsible for your own moderation configuration and decisions
- You're responsible for compliance with applicable laws in your jurisdiction

## 4. What We're NOT Responsible For

### 4.1 Availability
- The Bot is provided "as-is"
- We don't guarantee 24/7 uptime
- The Bot may go offline for maintenance, updates, or because someone tripped over the
  power cord
- We're not liable if the Bot is down when you need it

### 4.2 Your Content
- You're responsible for the content you post
- We don't review, approve, or endorse any content in your server
- If you post something illegal, that's on you, not us
- We may cooperate with law enforcement if required by law

### 4.3 API Keys and Credentials
- You are solely responsible for securing your API keys and bot token
- We are NOT responsible if you:
  - Leak your credentials
  - Commit secrets to public repositories
  - Share your credentials with others
  - Experience unauthorized access due to poor key management
- **NEVER share your bot token or API keys publicly**

### 4.4 Automated Moderation (Anti-Spam / Anti-Scam)
- The Bot's moderation is **automated and heuristic** — it scores messages for spam/scam
  signals and may delete messages or ban users **without human review**
- **False positives can happen.** We are not liable for legitimate users caught by
  automated moderation
- **Appeals and reversals are handled by the server's own admins/moderators**, who can
  unban and manage entries via `/banregistry` — not by the Bot operator
- Server admins choose whether moderation is enabled and how it's tuned; the Bot operator
  is not responsible for an individual server's moderation choices or outcomes
- The ban registry is **shared across servers** the same bot instance runs in; by using
  the Bot, a server participates in this shared protection

### 4.5 Data Loss
- We don't store your messages or content (see Privacy Policy)
- Operational data the Bot does keep (ban registry, server settings) lives in files on
  the host and may be lost on host/redeploy events if not persisted; we don't guarantee
  its retention

## 5. Intellectual Property

### 5.1 The Bot's Code
- The Bot is open source (see LICENSE file in repository)
- You can view, modify, and self-host the code
- If you modify the code, you're responsible for your version

## 6. Privacy

See our Privacy Policy (PRIVACY.md) for details on how we handle data.

**TL;DR:** We don't store your messages or content. We run moderation detection, log
operational events, and keep a ban registry and per-server settings. That's it.

## 7. Prohibited Uses

Don't use the Bot to:
- ❌ Process illegal content
- ❌ Harass or stalk other users
- ❌ Spam or flood channels
- ❌ Attempt to break, hack, or exploit the Bot
- ❌ Scrape or collect data on a large scale
- ❌ Violate anyone's privacy
- ❌ Impersonate the Bot or its developers
- ❌ Use the Bot for commercial purposes without permission

## 8. Termination

We reserve the right to:
- Block users from using the Bot (for abuse, spam, or violations of these Terms)
- Shut down the Bot at any time, for any reason
- Modify or discontinue features without notice

You can stop using the Bot at any time by:
- Not using it in monitored channels
- Blocking the Bot
- Asking server admins to remove the Bot from your server

## 9. Self-Hosting

If you self-host the Bot:
- You're responsible for your instance
- These Terms apply to the official hosted version only
- You should create your own Terms/Privacy Policy if running a public instance
- We're not responsible for problems with your self-hosted version

## 10. Limitation of Liability

**IN PLAIN ENGLISH:**
We provide this Bot for free, as a community security and fun tool. We're not liable for
anything that goes wrong. Use at your own risk.

**THE LEGAL VERSION:**
TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE BOT AND ITS DEVELOPERS ARE NOT LIABLE FOR
ANY DAMAGES ARISING FROM YOUR USE OF THE BOT, INCLUDING BUT NOT LIMITED TO:
- Direct, indirect, incidental, or consequential damages
- Loss of data, profits, or opportunities
- Bot downtime or malfunctions
- Actions taken based on automated moderation

## 11. Indemnification

If you do something dumb with the Bot and someone sues us, you agree to cover our legal
costs. Don't do dumb things with the Bot.

## 12. Changes to These Terms

We may update these Terms at any time. Changes will be:
- Posted in the GitHub repository
- Dated with "Last Updated"
- Effective immediately upon posting

Continued use of the Bot after changes means you accept the new Terms.

## 13. Governing Law

These Terms are governed by the laws of your jurisdiction. Disputes will be resolved through:
- Good-faith discussion first (be cool)
- Mediation if needed
- Arbitration or courts as a last resort

## 14. Severability

If any part of these Terms is found invalid or unenforceable, the rest still applies.

## 15. Contact

Questions about these Terms?
- **GitHub Issues:** https://github.com/Ktiseos-Nyx/Ascian-Gatekeeper/issues
- **Repository:** https://github.com/Ktiseos-Nyx/Ascian-Gatekeeper

**Prefer Discord support?**
- Under Rug Swept Misfits: https://discord.gg/5t2kYxt7An

---

## The Actually Important Part

**Look, here's the deal:**

This is a free, open-source community bot for Discord servers. It detects scams and spam,
runs fun commands, and helps communities stay safe. That's it.

- We're not making money off this
- We're not storing your messages or content
- We're not doing anything sketchy
- We're just trying to make a useful tool

If you use the Bot responsibly, we won't have any problems. If you abuse it, we'll block
you. If something breaks, we'll try to fix it, but no promises.

**Use common sense. Be nice. Don't sue us.**

That's the whole philosophy. The legal stuff above is just covering our bases.

---

**Remember:** These Terms exist to protect both you and us. Read them, understand them,
and if you have questions, ask.

*This Terms of Service was written by humans, for humans. If you need a lawyer-approved
version for commercial use, consult an actual lawyer.*
