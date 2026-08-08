import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import type { Page } from './index';

export function fmtChannel(id: string | null | undefined): string {
  return id ? `<#${id}>` : '*(not set)*';
}

export function fmtRoles(ids: string[] | null | undefined): string {
  return ids?.length ? ids.map(r => `<@&${r}>`).join(' ') : '*(none)*';
}

// ... add fmtChannels and fmtUsers here too ...

export function navRow(active: Page, securityOn: boolean): ActionRowBuilder<ButtonBuilder> {
  const mk = (page: Page, label: string) =>
    new ButtonBuilder()
      .setCustomId(`settings:nav:${page}`)
      .setLabel(label)
      .setStyle(page === active ? ButtonStyle.Primary : ButtonStyle.Secondary);
      
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    mk('moderation', 'Moderation'), 
    mk('fun', 'Fun'), 
    mk('trust', 'Trust'),
    new ButtonBuilder()
      .setCustomId('settings:toggle:security')
      .setLabel(`Anti-scam: ${securityOn ? 'ON' : 'OFF'}`)
      .setStyle(securityOn ? ButtonStyle.Success : ButtonStyle.Danger),
  );
}