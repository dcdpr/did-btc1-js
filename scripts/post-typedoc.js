// scripts/fix-html-escapes.js
import fs from 'fs';
import path from 'path';

const docsPath = './docs';

function escapeHtml(content) {
  return content
    .replace(/<|\\</g, '&lt;')
    .replace(/>|\\>/g, '&gt;')
}

function fixFile(filePath) {
  if (!filePath.endsWith('.md')) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  const escaped = escapeHtml(content);

  if (escaped !== content) {
    fs.writeFileSync(filePath, escaped, 'utf-8');
    console.log(`✔ Escaped: ${filePath}`);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else fixFile(fullPath);
  }
}

walk(docsPath);
