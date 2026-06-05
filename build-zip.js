import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

try {
  const zip = new AdmZip();
  
  // Add folders
  if (fs.existsSync('./src')) {
    zip.addLocalFolder('./src', 'src');
  }
  if (fs.existsSync('./assets')) {
    zip.addLocalFolder('./assets', 'assets');
  }
  
  // Add root files
  const rootFiles = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    '.gitignore',
    '.env.example',
    'vercel.json',
    'metadata.json',
    'build-zip.js'
  ];
  
  rootFiles.forEach(file => {
    if (fs.existsSync(file)) {
      zip.addLocalFile(file);
    }
  });
  
  zip.writeZip('./proyecto.zip');
  console.log('ZIP generated successfully under ./proyecto.zip');
} catch (err) {
  console.error('Error in build-zip.js:', err);
  process.exit(1);
}
