import { userName } from "../cli/args.js";

export const welcomePhrase = `Welcome to the File Manager, ${userName}!`;
export const exitPhrase = `Thank you for using File Manager, ${userName}!`;
export const pathPhrase = (path) => `You are currently in ${path}`;

export const INPUT_COMAND = {
  exit: '.exit',
  cd: 'cd',
}