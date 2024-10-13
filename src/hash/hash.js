import crypto from 'crypto';
import fs from 'fs';

export const calculateHash = async (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const readStream = fs.createReadStream(filePath);

    readStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readStream.on('error', (error) => {
      reject(`Error reading file: ${error.message}`);
    });

    readStream.on('end', () => {
      const fileHash = hash.digest('hex');
      resolve(fileHash);
    });
  });
};