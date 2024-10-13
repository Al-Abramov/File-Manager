import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

export const compressFile = async (sourceFilePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliCompress();
    
    readStream.on('error', (error) => {
      reject(`Error reading file: ${error.message}`);
    });

    writeStream.on('error', (error) => {
      reject(`Error writing file: ${error.message}`);
    });

    writeStream.on('finish', () => {
      resolve(`File compressed to ${destinationPath}`);
    });

    readStream.pipe(brotli).pipe(writeStream);
  });
};

export const decompressFile = async (sourceFilePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotli = zlib.createBrotliDecompress();

    readStream.on('error', (error) => {
      reject(`Error reading file: ${error.message}`);
    });

    writeStream.on('error', (error) => {
      reject(`Error writing file: ${error.message}`);
    });

    writeStream.on('finish', () => {
      resolve(`File decompressed to ${destinationPath}`);
    });

    readStream.pipe(brotli).pipe(writeStream);
  });
};