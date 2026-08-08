import { Client, Events, ChatInputCommandInteraction, REST, Routes } from 'discord.js';
import { decideCommand, pollCommand, wildcardCommand, interactCommand, goodnightCommand } from './fun';
import { qotdCommand } from './qotd';
import { remindCommand } from './reminders';
import { settingsCommand } from './settings';
import { securityCommand } from './security';
import { banregistryCommand } from './banregistry';
import { reportCommand } from './report';

const slashCommands = [
  decideCommand, pollCommand, wildcardCommand, interactCommand, goodnightCommand,
  qotdCommand, remindCommand,
  settingsCommand, securityCommand, banregistryCommand, reportCommand,
];

export function registerCommands(client: Client): void {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
      const cmd = slashCommands.find(c => c.data.name === interaction.commandName);
      if (cmd) await cmd.execute(interaction as ChatInputCommandInteraction).catch(console.error);
    }
  });

  client.once(Events.ClientReady, async (c) => {
    const rest = new REST().setToken(process.env.BOT_TOKEN!);
    const body = slashCommands.map(c => c.data.toJSON());
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await rest.put(Routes.applicationCommands(c.user.id), { body });
        console.log(`Synced ${body.length} slash commands`);
        return;
      } catch (err) {
        console.error(`[commands] sync attempt ${attempt}/3 failed:`, err);
        if (attempt < 3) await new Promise(r => setTimeout(r, 2000 * attempt));
      }
    }
    console.error('[commands] giving up after 3 attempts — commands not synced');
    process.exit(1);
  });
}
