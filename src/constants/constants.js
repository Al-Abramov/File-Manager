import { userName } from "../cli/args.js";
import { getFileList } from "../navigation/navigation.js";
import path from 'node:path';
import { homedir } from "../path/path.js";
import { addFile, copyFile, deleteFile, moveFile, readFile, renameFile } from "../basic/basic.js";
import { compressFile, decompressFile } from "../zip/zip.js";
import { calculateHash } from "../hash/hash.js";
import { getCpuArch, getCpus, getEOL, getSystemUserName } from "../system/system.js";

export const welcomePhrase = `Welcome to the File Manager, ${userName}!`;
export const exitPhrase = `Thank you for using File Manager, ${userName}!`;
export const pathPhrase = (path) => `You are currently in ${path}`;

export const INPUT_COMAND = {
  exit: '.exit',
  cd: 'cd',
  up: "up",
  ls: "ls",
  cat: "cat",
  add: "add",
  rn: "rn",
  cp: "cp",
  mv: "mv",
  rm: "rm",
  compress: "compress",
  decompress: "decompress",
  hash: "hash",
  os: "os",
}

export const OS_ARGS = {
  EOL: "EOL",
  cpus: "cpus",
  homedir: "homedir",
  username: "username",
  architecture: "architecture",
}

export let currentDir = homedir;

export const OS_ACTIONS = {
  [OS_ARGS.EOL]: async () => {
    getEOL();
  },
  [OS_ARGS.cpus]: () => {
    getCpus();
  },
  [OS_ARGS.homedir]: () => {
    console.log(`Home directory: ${homedir}`)
  },
  [OS_ARGS.username]: () => {
    getSystemUserName();
  },
  [OS_ARGS.architecture]: () => {
    getCpuArch();
  },
}

export const ACTIONS = {
  [INPUT_COMAND.ls]: async () => {
    const fileList = await getFileList(currentDir);
    console.table(fileList);
  },
  [INPUT_COMAND.up]: () => {
    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir || parentDir === homedir) {
      console.log("You are already at the root directory.");
    } else {
      currentDir = parentDir;
    }
  },
  [INPUT_COMAND.cat]: async (dto) => {
    const { filePath } = dto;

    if (filePath) {
      const text = await readFile(filePath);
      console.log(text);
    } else {
      console.log('Please provide a file path.');
    }
  },
  [INPUT_COMAND.add]: async (dto) => {
    const { filePath } = dto;

    if (filePath) {
      await addFile(filePath);
    } else {
      console.log('Please provide a file name.');
    }
  },
  [INPUT_COMAND.rn]: async (dto) => {
    const { filePath, newFileName } = dto;

    if (filePath && newFileName) {
      await renameFile(filePath, newFileName);
    } else {
      console.log('Please provide both the old file path and the new file name.');
    }
  },
  [INPUT_COMAND.cp]: async (dto) => {
    const { filePath, newFileName } = dto;

    if (filePath && newFileName) {
      await copyFile(filePath, newFileName);
    } else {
      console.log('Please provide both the source file path and the destination directory.');
    }
  },
  [INPUT_COMAND.mv]: async (dto) => {
    const { filePath, newFileName } = dto;

    if (filePath && newFileName) {
      const message = await moveFile(filePath, newFileName);
      console.log(message);
    } else {
      console.log('Please provide both the source file path and the destination directory.');
    }
  },
  [INPUT_COMAND.rm]: async (dto) => {
    const { filePath } = dto;

    if (filePath) {
      const message = await deleteFile(filePath);
      console.log(message);
    } else {
      console.log('Please provide a file path to delete.');
    }
  },
  [INPUT_COMAND.compress]: async (dto) => {
    const { filePath, newFileName } = dto;

    if (filePath && newFileName) {
      const message = await compressFile(filePath, newFileName);
      console.log(message);
    } else {
      console.log('Please provide both the source file path and the destination path.');
    }
  },
  [INPUT_COMAND.decompress]: async (dto) => {
    const { filePath, newFileName } = dto;

    if (filePath && newFileName) {
      const message = await decompressFile(filePath, newFileName);
      console.log(message);
    } else {
      console.log('Please provide both the source file path and the destination path.');
    }
  },
  [INPUT_COMAND.hash]: async (dto) => {
    const { filePath } = dto;

    if (filePath) {
      const fileHash = await calculateHash(filePath);
      console.log(`Hash of file ${filePath}: ${fileHash}`);
    } else {
      console.log('Please provide a file path to calculate the hash.');
    }
  },
  [INPUT_COMAND.os]: async (dto) => {
    const { arg } = dto;
    const isCorrectArg = arg.startsWith("--");

    if (isCorrectArg) {
      const osArg = arg.slice(2);
      try {
        OS_ACTIONS[osArg]();
      } catch (error) {
        console.log('Wrong arguments!');
      }
    } else {
      console.log('Arguments have to started --');
    }
  
  },
}