const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, './secret-folder');

const getBasename = (pathToFile, ext) => {
  return path.basename(pathToFile, ext);
};

const getExtension = (pathToFile) => {
  const ext = path.extname(pathToFile);
  return ext.slice(1);
};

const BYTES_IN_KB = 1024;

const getSize = (fileStats) => {
  return `${Math.round(fileStats.size / BYTES_IN_KB)} kb`;
};

fs.readdir(pathToFolder, (err, folderContent) => {
  if (err) {
    console.log(err);
  } else {
    folderContent.forEach((item) => {
      const pathToFile = path.join(pathToFolder, item);

      fs.stat(pathToFile, (err, fileStats) => {
        if (err) {
          console.error(err);
        } else {
          if (fileStats.isFile()) {
            const ext = path.extname(pathToFile);

            const basename = getBasename(pathToFile, ext);
            const extension = getExtension(pathToFile);
            const fileSizeKb = getSize(fileStats);

            const output = `${basename} - ${extension} - ${fileSizeKb}`;
            console.log(output);
          }
        }
      });
    });
  }
});

// const basename = path.basename(pathToFile, path.extname(pathToFile));
// const extension = (path.extname(pathToFile)).slice(1);
// const fileSize = fileStats.size;
