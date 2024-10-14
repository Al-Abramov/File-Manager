import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = process.cwd()

export const homedir = os.homedir();

export const goUp = (currentDir) => {
  const parentDir = path.dirname(currentDir);

  if (parentDir === currentDir || parentDir === homedir) {
    console.log("You are already at the root directory.");
  } else {
    currentDir = parentDir;
  }
  
  return currentDir;
}