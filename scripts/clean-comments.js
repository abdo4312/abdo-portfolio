#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const file = process.argv[2];
if (!file || !fs.existsSync(file)) process.exit(0);

let content = fs.readFileSync(file, 'utf8');
const original = content;

// Remove single-line comments // but not inside strings - simple approach
// Remove /* */ block comments but not /** */ (JSDoc)
// This is simplified but should work for most cases

// Remove block comments except JSDoc
content = content.replace(/\/\*(?!\*)([\s\S]*?)\*\//g, '');
// Remove single line comments that are not inside strings (very basic)
// Better to do line by line
const lines = content.split('\n');
const cleaned = [];
for (let line of lines) {
  // Skip if it's a JSDoc line or has JSDoc
  if (line.trim().startsWith('*') || line.includes('/**')) {
    cleaned.push(line);
    continue;
  }
  // Remove // comments not in strings - simple heuristic
  // This is not perfect but catches most unnecessary comments
  let inString = false;
  let stringChar = null;
  let result = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if ((ch === '"' || ch === "'" || ch === '`') && line[i-1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = ch;
      } else if (stringChar === ch) {
        inString = false;
        stringChar = null;
      }
      result += ch;
      continue;
    }
    if (ch === '/' && line[i+1] === '/' && !inString) {
      break; // rest is comment
    }
    result += ch;
  }
  // Trim trailing whitespace
  if (result.trim() === '') {
    // Empty line after comment removal - skip if it was just a comment
    const origTrim = line.trim();
    if (origTrim.startsWith('//')) continue;
  }
  cleaned.push(result.replace(/\s+$/, ''));
}

content = cleaned.join('\n');

if (content !== original) {
  fs.writeFileSync(file, content);
  console.log(`Cleaned comments in ${file}`);
}
