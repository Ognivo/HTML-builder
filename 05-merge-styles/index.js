const fs = require('fs/promises');
const path = require('path');

async function buildCSSBundle() {
  try {
    const stylesFolderPath = path.join(__dirname, 'styles');
    const projectDistFolderPath = path.join(__dirname, 'project-dist');
    const bundleFileName = 'bundle.css';

    const files = await fs.readdir(stylesFolderPath);

    const cssFiles = files.filter(file => path.extname(file) === '.css');

    const stylesArray = await Promise.all(
      cssFiles.map(async cssFile => {
        const filePath = path.join(stylesFolderPath, cssFile);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return `/* Styles from ${cssFile} */\n${fileContent}\n`;
      })
    );

    const bundlePath = path.join(projectDistFolderPath, bundleFileName);
    await fs.writeFile(bundlePath, stylesArray.join('\n'));

    console.log('CSS bundle created successfully.');
  } catch (error) {
    console.error(`Error building CSS bundle: ${error.message}`);
  }
}

buildCSSBundle();
