import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dir = __dirname.split(path.sep).slice(0, -2).join(path.sep);

function upPath() {
  let root = dir.split(path.sep).length === 2 ? true : false;

  if(root) {
    dir = `C:${path.sep}`;
    process.chdir(`C:${path.sep}`);
    return;
  }
  
  dir = dir.split(path.sep).slice(0, -1).join(path.sep);
  process.chdir(dir);

}

function goTotPath(input) {
  const inputSplit = input.split(' ');

  if(inputSplit.length > 2 || inputSplit.length == 1) {
    console.log('Please try again');
    return;
  }

  const pathSplit = inputSplit.slice(-1).join('');

  console.log(path.isAbsolute(pathSplit));

  if(path.isAbsolute(pathSplit)) {
    pathSplit.startsWith('C:') ? 
      dir = pathSplit
      :
      dir = path.join(process.cwd(), pathSplit);
  } else {
    dir = path.join(process.cwd(), pathSplit);
  }

  process.chdir(dir);
}

export { dir, upPath, goTotPath };