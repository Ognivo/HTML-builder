const fs = require('fs/promises');
const path = require('path');

async function copyDir(srcDir, destDir) {
  try {
    const destPath = path.join(destDir, 'files-copy');
    await fs.mkdir(destPath, { recursive: true });

    const files = await fs.readdir(srcDir);

    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destFilePath = path.join(destPath, file);

      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destFilePath);
      }
    }

    console.log('Directory copied successfully.');
  } catch (error) {
    console.error(`Error copying directory: ${error.message}`);
  }
}

const srcDirectory = '04-copy-directory/files';
const destDirectory = '04-copy-directory';

copyDir(srcDirectory, destDirectory);