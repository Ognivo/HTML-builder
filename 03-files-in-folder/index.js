const fs = require('fs/promises');
const path = require('path');

const folderPath = '03-files-in-folder/secret-folder';

fs.readdir(folderPath, { withFileTypes: true })
  .then((files) => {
    files.forEach(async (file) => {
      if (file.isFile()) {
        const fileExtension = path.extname(file.name).slice(1);

        const fileStats = await fs.stat(path.join(folderPath, file.name));

        console.log(`${file.name} - ${fileExtension} - ${fileStats.size}B`);
      } else {
        console.error(`Error: ${file.name} is a directory. Only files are supported.`);
      }
    });
  })
  .catch((error) => {
    console.error(`Error reading folder: ${error.message}`);
  });