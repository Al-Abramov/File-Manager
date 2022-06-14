import { argName } from "../cli/arg.js";

const welcomePhrase = `Welcome to the File Manager, ${argName}!`;
const exitPhrase = `Thank you for using File Manager, ${argName}!`;
const pathPhrase = (path) => `You are currently in ${path}`;

export { welcomePhrase, exitPhrase, pathPhrase };
