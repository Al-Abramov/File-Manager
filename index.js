import { ACTIONS, currentDir, exitPhrase, INPUT_COMAND, pathPhrase, welcomePhrase } from './src/constants/constants.js';
import readline from 'node:readline';
import { __dirname } from './src/path/path.js';
import path from 'node:path';
import fs from 'node:fs';
import os from 'os';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdout.write(welcomePhrase + '\n');
//let currentDir = homedir;

rl.on('line', async (input) => {
  const [command, ...commandArgs] = input.split(' ');

  try {
    if (command === INPUT_COMAND.exit) {
      rl.close();
    }
  
    if (command === INPUT_COMAND.cd) {
      const targetPath = commandArgs.join(' ');
      const newDir = path.isAbsolute(targetPath) ? targetPath : path.join(currentDir, targetPath);
  
      try {
        const stats = await fs.stat(newDir);
  
        if (stats.isDirectory()) {
          currentDir = newDir;
        } else {
          console.log(`Not a directory: ${targetPath}`);
        }
      } catch (error) {
        console.log(`Directory not found: ${targetPath}`);
      }
    }

    if (ACTIONS[command]) {
      await ACTIONS[command]({
        filePath: commandArgs[0],
        newFileName: commandArgs[1],
        arg: commandArgs[0],
      });
    }
  
    console.log(pathPhrase(currentDir));
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
});

rl.on('close', () => {
  console.log(exitPhrase);
});