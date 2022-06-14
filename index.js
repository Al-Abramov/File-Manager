import process from 'process';
import readline from 'readline';
import { exitPhrase, pathPhrase, welcomePhrase } from './src/constants/phraseConst.js';
import { dir, goTotPath, upPath } from './src/path/path.js';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(welcomePhrase + '\n');
console.log(pathPhrase(process.cwd()));

rl.on('line', (userInput) => {
  if(userInput.trim() === 'up') {
    upPath();
  }

  if(userInput.trim().startsWith('cd')) {
    const input = userInput.trim();
    goTotPath(input);
  }

  console.log(pathPhrase(dir));
});

rl.once('close', () => {
  console.log(exitPhrase);
});