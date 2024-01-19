const fs = require('fs');
const path = require('path');
const rl = require('readline');

const pathToFile = path.join(__dirname, './text.txt');

const writeStream = fs.createWriteStream(pathToFile, { flags: 'a' }, 'utf-8'); // {flags: 'a'} for dopisat file , no perepisat file

const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout, // for working readLine.on
});

readLine.on('line', (data) => {
  if (data.toString().trim() === 'exit') {
    console.log('Thank you for your feedback. \n');
    process.exit();
  }

  writeStream.write(data.toString() + '\n');
});

readLine.on('SIGINT', () => {
  console.log('Thank you for your feedback. \n');
  process.exit();
});

console.log('What do you think of RS School?');

// or

// process.stdout.write('What do you think of RS School? \n');

// process.on('SIGINT', () => {
//   process.stdout.write('Thank you for your feedback');
//   process.exit();
// });

// process.stdin.on('data', fileContent => {
//   if (fileContent.toString().trim() === 'exit') {
//     process.stdout.write('Thank you for your feedback');
//     process.exit();
//   } else {
//     writeStream.write(fileContent.toString());
//   }
// });
