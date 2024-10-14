import os from 'node:os';

export const getEOL = async () => {
  const eol = os.EOL;

  console.log(`End of Line (EOL) for this OS: '${eol}'`);
}

export const getCpus = () => {
  const cpus = os.cpus();

  const totalCpus = cpus.length;
  console.log(`Total number of CPUs: ${totalCpus}`);

  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
}

export const getSystemUserName = () => {
  const userInfo = os.userInfo();
  console.log(`Current system username: ${userInfo.username}`);
}

export const getCpuArch = () => {
  const cpuArchitecture = os.arch();
  console.log(`CPU architecture: ${cpuArchitecture}`);
}