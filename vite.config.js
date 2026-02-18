import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Save commentary logs to tube/ folder
function saveCommentaryPlugin() {
  return {
    name: 'save-commentary',
    configureServer(server) {
      server.middlewares.use('/api/save-commentary', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const now = new Date();
            const ts = now.getFullYear().toString() +
              String(now.getMonth() + 1).padStart(2, '0') +
              String(now.getDate()).padStart(2, '0') + '_' +
              String(now.getHours()).padStart(2, '0') +
              String(now.getMinutes()).padStart(2, '0');

            const filename = `commentary_${ts}.json`;
            const filePath = path.resolve('tube', filename);

            // Ensure tube/ exists
            fs.mkdirSync(path.resolve('tube'), { recursive: true });
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

            console.log(`💾 Commentary saved: ${filePath}`);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, filename }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/sort-compare/',
  plugins: [
    react(),
    tailwindcss(),
    saveCommentaryPlugin(),
  ],
})
