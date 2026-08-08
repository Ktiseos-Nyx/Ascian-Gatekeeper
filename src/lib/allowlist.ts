export function shouldLeaveGuild(guildId: string, allowlist: Set<string>): boolean {
  if (allowlist.size === 0) return false;
  return !allowlist.has(guildId);
}
