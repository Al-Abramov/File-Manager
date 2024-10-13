import fs from 'node:fs';

export const getFileList = (currentDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(currentDir, { withFileTypes: true }, (error, files) => {
      if (error) {
        reject('Error reading directory: ' + error);
        return;
      }
  
      const directories = [];
      const regularFiles = [];
  
      files.forEach((file) => {
        if(file.isDirectory()) {
          directories.push({ name: file.name, type: "directory"});
        }
  
        if(file.isFile()) {
          regularFiles.push({ name: file.name, type: 'file' });
        }
      });
  
      directories.sort((a, b) => a.name.localeCompare(b.name));
      regularFiles.sort((a, b) => a.name.localeCompare(b.name));
  
      const result = [...directories, ...regularFiles];  
  
      resolve(result);
    });
  });
}