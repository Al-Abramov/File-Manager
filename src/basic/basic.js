import fs from 'node:fs';
import { currentDir } from '../constants/constants.js';
import path from 'node:path';

export const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
  
    stream.on('data', (chunk) => {
      resolve(chunk);
    });

    stream.on('error', (error) => {
      reject('Error reading file: ' + error);
    });
  })
}

export const addFile = async (fileName) => {
  const filePath = `${currentDir}\\${fileName}`;

  await fs.promises.writeFile(filePath, '');
}

export const renameFile = async (oldFilePath, newFileName) => {
  const newFilePath = `${currentDir}/${newFileName}`;

  await fs.promises.rename(oldFilePath, newFilePath, (error) => {
    if (error) {
      console.error('Error renaming file:', error);
    } else {
      console.log(`File has been renamed to "${newFileName}"`);
    }
  });
}

export const copyFile = async (sourceFilePath, destinationDir) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(sourceFilePath);
    const destinationFilePath = path.join(destinationDir, fileName);

    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(destinationFilePath);

    readStream.on('error', (error) => {
      reject('Error reading file: ' + error);
    });

    writeStream.on('error', (error) => {
      reject('Error writing file: ' + error);
    });

    writeStream.on('finish', () => {
      resolve(`File copied to ${destinationFilePath}`);
    });

    readStream.pipe(writeStream);
  });
};

export const moveFile = async (sourceFilePath, destinationDir) => {
  const fileName = path.basename(sourceFilePath);
  const destinationFilePath = path.join(destinationDir, fileName);

  await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(destinationFilePath);

    readStream.on('error', (error) => {
      reject('Error reading file: ' + error);
    });

    writeStream.on('error', (error) => {
      reject('Error writing file: ' + error);
    });

    writeStream.on('finish', () => {
      resolve();
    });

    readStream.pipe(writeStream);
  });

  await fs.promises.unlink(sourceFilePath);
  return `File moved to ${destinationFilePath}`;
};

export const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
    return `File ${filePath} has been deleted.`;
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
};