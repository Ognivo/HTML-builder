const fs = require('fs');
const readline = require('readline');

const filePath = '02-write-file/text.txt';

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome! Enter text below:');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Farewell! Exiting...');
    writeStream.end();
    rl.close();
  } else {
    writeStream.write(`${input}\n`);
    console.log('Enter more text:');
  }
});

rl.on('close', () => {
  console.log('Process terminated.');
});

writeStream.on('error', (err) => {
  console.error(`Error writing to file: ${err.message}`);
});