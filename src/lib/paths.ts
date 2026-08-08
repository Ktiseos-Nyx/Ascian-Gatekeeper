import fs from 'fs';
import path from 'path';

export const DATA_DIR = process.env.DATA_DIR ?? process.cwd();

export function dataFile(name: string): string {
  return path.join(process.env.DATA_DIR ?? process.cwd(), name);
}

export function repoFile(name: string): string {
  return path.resolve(process.cwd(), name);
}

export function writeJsonAtomic(target: string, data: unknown): void {
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const tmp = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, target);
}
