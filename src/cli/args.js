export const args = process.argv.slice(2);
const userNameWithPrefix = args.find(arg => arg.startsWith('--username='));
export const userName = userNameWithPrefix.split("--username=")[1];