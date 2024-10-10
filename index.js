import { exitPhrase, INPUT_COMAND, pathPhrase, welcomePhrase } from './src/constants/constants.js';
import { userName } from './src/cli/args.js';
import readline from 'node:readline';
import { __dirname, homedir } from './src/path/path.js';
import path from 'node:path';

// console.log('bbbbbbb');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdout.write(welcomePhrase + '\n');

rl.on('line', (input) => {
  if (input === INPUT_COMAND.exit) {
    rl.close();
  }

  console.log(pathPhrase(homedir))
});

rl.on('close', () => {
  console.log(exitPhrase);
});