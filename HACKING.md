# Hacking on Ascian Gatekeeper

This file is a practical reference for adding features to this bot. It covers
the patterns used in the codebase — read it once, then use it as a cheat sheet.

---

## Quick map: where stuff lives

```text
src/
├── index.ts              ← entry point — boots everything, don't touch unless adding a subsystem
├── commands/             ← slash commands — one file per command (or command group)
│   └── index.ts          ← registerCommands() — add new commands HERE
├── panels/               ← interactive settings panel — one file per page
│   ├── index.ts          ← buildSettingsPanel() router — add new pages HERE
│   └── shared.ts         ← nav bar, formatters, toggle logic — shared by all pages
├── events/               ← Discord event handlers (message, join, guild)
│   └── index.ts          ← registerEvents() — add new event modules HERE
└── lib/                  ← shared utilities — guild settings, security, ban registry, etc.
```

---

## Adding a new slash command

### Step 1: Create the command file

Put it in `src/commands/`. Name it after the command (e.g. `greet.ts` for `/greet`).

```ts
// src/commands/greet.ts
import {
  ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder,
  MessageFlags,
} from 'discord.js';

export const greetCommand = {
  data: new SlashCommandBuilder()
    .setName('greet')
    .setDescription('Say hello to someone')
    .addUserOption(o =>
      o.setName('target').setDescription('Who to greet').setRequired(true),
    )
    // Optional: restrict to admins
    // .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction: ChatInputCommandInteraction) {
    // Guard: server-only? DM-only?
    if (!interaction.guild) {
      return interaction.reply({ content: 'Server only.', flags: MessageFlags.Ephemeral });
    }

    const target = interaction.options.getUser('target', true);
    await interaction.reply(`Hello ${target}!`);
  },
};
```

### Step 2: Register it

In `src/commands/index.ts`:

```ts
// 1. Import
import { greetCommand } from './greet';

// 2. Add to the array
const slashCommands = [
  greetCommand,                           // ← ADD HERE
  decideCommand, pollCommand, /* ... */,
];
```

That's it. The `registerCommands()` function handles registration with Discord's REST API
on startup, and the InteractionCreate handler dispatches incoming interactions to the
right command by name.

### Patterns to copy

| Pattern | Example |
|---------|---------|
| Ephemeral reply | `interaction.reply({ content: '...', flags: MessageFlags.Ephemeral })` |
| Permission gate | `.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)` |
| Deferred reply | `await interaction.deferReply(); /* do slow work */ await interaction.editReply('...')` |
| Guild settings | `import { getGuildSetting } from '../lib/guild-settings';` then `getGuildSetting(guildId, 'key', fallback)` |

---

## Adding a new panel page

Panels are the interactive `/settings` UI. Each page is its own file in `src/panels/`.

### Step 1: Create the page file

```ts
// src/panels/example.ts
import { EmbedBuilder, Colors, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { navRow } from './shared';
import type { GuildEntry } from '../lib/settings-types';

export function buildExamplePanel(state: GuildEntry) {
  const t = state.toggles ?? {};

  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setTitle('📄 Example Page')
    .setDescription('This is what the page looks like.');

  const components: ActionRowBuilder<any>[] = [
    navRow('example', t.security ?? true),   // always FIRST — nav bar + anti-scam toggle
    // Your page-specific rows here...
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('settings:example:thing')
        .setPlaceholder('Pick something')
        .setMinValues(0).setMaxValues(1)
        .addOptions([
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
        ]),
    ),
  ];

  return { embeds: [embed], components };
}
```

### Step 2: Add the page type

In `src/panels/index.ts`:

```ts
export type Page = 'moderation' | 'trust' | 'fun' | 'example';  // add yours
```

### Step 3: Add the route

In `src/panels/index.ts`, inside `buildSettingsPanel()`:

```ts
case 'example':
  return buildExamplePanel(state);
```

### Step 4: Add the nav button

In `src/panels/shared.ts`, inside `navRow()`:

```ts
mk('example', 'Example'),   // add a button for your page
```

### Step 5: Handle interactions (if your page has custom IDs)

In `src/commands/settings.ts`, inside the collector's `'collect'` handler, add
an `else if` block for your custom IDs:

```ts
} else if (id === 'settings:example:thing') {
  const sel = i as AnySelectMenuInteraction;
  // do something with sel.values
}
```

### Trust list caps

If your page uses role/user selects, cap them:

```ts
import { TRUSTED_USERS_MAX, TRUSTED_ROLES_MAX } from './shared';
```

---

## Adding a new event handler

### Step 1: Create the event file

```ts
// src/events/onSomething.ts
import { Events, type Client } from 'discord.js';

export function registerSomethingEvents(client: Client): void {
  client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    // do stuff
  });
}
```

### Step 2: Register it

In `src/events/index.ts`:

```ts
import { registerSomethingEvents } from './onSomething';

export function registerEvents(client: Client): void {
  registerMessageEvents(client);
  registerJoinEvents(client);
  registerGuildEvents(client);
  registerSomethingEvents(client);   // ← ADD HERE
}
```

---

## The entry point flow

When the bot starts (`src/index.ts`):

```text
1. load env + config   (dotenv/config, BOT_TOKEN, config.toml)
2. create Client       (intents: Guilds, GuildMessages, MessageContent, GuildMembers, DirectMessages)
3. registerEvents()    → hooks into messageCreate, guildMemberAdd, guildCreate, ClientReady
4. registerCommands()  → hooks into InteractionCreate, syncs slash commands with Discord on ready
5. client.on(Ready)    → startScheduler() — QOTD + reminder timer
6. graceful shutdown   → SIGTERM/SIGINT → stop scheduler, destroy client, exit 0
```

---

## Lib utilities cheat sheet

| You want to... | Use |
|----------------|-----|
| Read a per-guild toggle | `getGuildSetting(guildId, 'fun_commands', true)` |
| Read all guild toggles | `getAllGuildSettings(guildId)` |
| Write a toggle | `setGuildSetting(guildId, 'key', true)` |
| Read guild moderation | `getGuildModeration(guildId)` |
| Write a moderation field | `setModerationField(guildId, 'alertChannelId', '123')` |
| Read config value | `import { BOT_TOKEN, ALLOWED_GUILD_IDS } from '../lib/config'` |
| Read a bundled JSON file | `repoFile('wildcards.json')` → `JSON.parse(fs.readFileSync(...))` |
| Persist data atomically | `writeJsonAtomic(path, data)` — temp-file-then-rename |
| Add to ban registry | `import { recordBan } from '../lib/ban-registry'` |

---

## Common gotchas

1. **Discord component row limit**: max 5 `ActionRowBuilder`s per message. `navRow()` always takes 1 slot — you have 4 left for page content.

2. **Select defaults can't exceed max_values**: If you prefill a select with 10 defaults but max_values is 5, Discord throws. The trust panel caps defaults to `TRUSTED_USERS_MAX` / `TRUSTED_ROLES_MAX` for this reason.

3. **Component interactions expire**: The collector has a 5-minute idle timeout. The `try/catch` in the collector handler prevents an expired interaction from crashing the bot (the global `unhandledRejection` handler calls `process.exit(1)`).

4. **`.env` uses `BOT_TOKEN`**: Not `DISCORD_TOKEN`. Config reads `process.env.BOT_TOKEN`.

5. **`repoFile()` vs `dataFile()`**: `repoFile()` resolves to `cwd` (committed JSON like qotd-questions). `dataFile()` respects `DATA_DIR` (mutable state like guild_settings). Don't mix them up — mutable files on a mounted volume, committed files at the repo root.

6. **`as any` casts in settings.ts**: The `snapshot()` function returns `{ toggles, moderation }` but the `buildSettingsPanel()` expects `GuildEntry`. The cast is intentional — `GuildEntry` has `toggles: Record<string, boolean>` and the resolved defaults object technically has a wider type. Replace at your own risk.
