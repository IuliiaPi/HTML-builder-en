const {readdir, mkdir, stat, copyFile, unlink} = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, './files');
const pathToFileCopy = path.join(__dirname, './files-copy');

async function copyFiles() {
  const files = await readdir(pathToFile);

  for (const file of files) {
    const pathToFiles = path.join(pathToFile, file);
    const pathToFilesCopy = path.join(pathToFileCopy, file);

    await copyFile(pathToFiles, pathToFilesCopy);
  }
}

async function clearFolder() {
  const files = await readdir(pathToFileCopy);

  for (const file of files) {
    const pathToFilesCopy = path.join(pathToFileCopy, file);

    await unlink(pathToFilesCopy);
  }
}

const build = async () => {
  try {
    await stat(pathToFileCopy);
    await clearFolder();
  } catch {
    await mkdir(pathToFileCopy, {
      recursive: true,
    });
  } finally {
    await copyFiles();
  }
};

build();

// //////////////////////////////////////////////

// const fs = require('fs');
// fs.access(pathToFileCopy, (error) => {
//   if (error) {
//     fs.mkdir(pathToFileCopy, (error) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('New Directory created successfully !');
//       }
//     });
//   } else {
//     console.log('Given Directory already exists !');
//   }
// });

// fs.readdir(pathToFile, (err, files) => {
//   if(err) throw err;

//   files.forEach(file => {
//     const pathToFiles = path.join(__dirname, './files', file);
//     const pathToFilesCopy = path.join(__dirname, './files-copy', file);

//     fs.copyFile(pathToFiles, pathToFilesCopy, (err) => {
//       if (err) throw err;
//     });
//   });
// });
