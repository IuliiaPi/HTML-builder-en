const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, './text.txt');
// if a big file - chunks gather in []
const data = [];

const readStream = fs.createReadStream(pathToFile, 'utf-8');

readStream.on('data', (chunk) => {
  // push chunks
  data.push(chunk);
});

readStream.on('end', () => {
  // if stream end => console.log all chunks
  console.log(data.join(''));
});

// const readStream = new fs.createReadStream(pathToFile);
// readStream.pipe(process.stdout);
