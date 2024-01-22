const { readdir, stat } = require('fs/promises');

const fs = require('fs');
const path = require('path');

const pathToBundle = path.join(__dirname, 'project-dist', './bundle.css');

const ws = fs.createWriteStream(pathToBundle);

const readDirectory = async () => {
  const pathToFolder = path.join(__dirname, './styles');

  try {
    const folderContent = await readdir(pathToFolder);

    folderContent.forEach(async (item) => {
      const pathToFile = path.join(pathToFolder, item);
      const itemStats = await stat(pathToFile);

      if (itemStats.isFile() && path.extname(pathToFile) === '.css') {
        const rs = fs.createReadStream(pathToFile, 'utf-8');
        rs.pipe(ws);
      }
    });
  } catch (err) {
    if (err) console.error(err.message);
  }
};

readDirectory();

//

// const { readdir, stat } = require('fs/promises');

// const fs = require('fs');
// const path = require('path');
// const { pipeline } = require('stream');

// const pathToBundle = path.join(__dirname, 'project-dist', './bundle.css');

// // const writeStream = fs.createWriteStream(pathToBundle);

// const readDirectory = async () => {
//   const pathToFolder = path.join(__dirname, './styles');

//   try {
//     const folderContent = await readdir(pathToFolder);

//     folderContent.forEach(async (item) => {
//       const pathToFile = path.join(pathToFolder, item);

//       const itemStats = await stat(pathToFile);

//       if (itemStats.isFile() && path.extname(pathToFile) === '.css') {
//         const readStream = fs.createReadStream(pathToFile, 'utf-8');
//         const writeStream = fs.createWriteStream(
//           pathToBundle,
//           { flags: 'a' },
//           'utf-8',
//         );

//         await pipeline(readStream, writeStream);
//         // readStream.pipe(writeStream);
//       }
//     });
//   } catch (err) {
//     if (err) console.error(err.message);
//   }
// };

// readDirectory();

//
