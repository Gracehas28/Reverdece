import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {defineConfig, type Plugin} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function zipDownloaderPlugin(): Plugin {
  return {
    name: 'zip-downloader',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (url === '/proyecto.zip' || url === '/download-zip' || url.endsWith('/proyecto.zip')) {
          try {
            // Run separate node process to compile the ZIP, keeping adm-zip out of vite.config.ts to prevent Vercel build issues
            const { execSync } = await import('child_process');
            execSync('node build-zip.js', { stdio: 'inherit' });
            
            if (fs.existsSync('./proyecto.zip')) {
              const buffer = fs.readFileSync('./proyecto.zip');
              res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="proyecto.zip"',
                'Content-Length': buffer.length,
              });
              res.end(buffer);
            } else {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('ZIP file was not created successfully by build-zip.js');
            }
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error generating ZIP: ' + err.message);
          }
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), zipDownloaderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
