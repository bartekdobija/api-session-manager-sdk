#!/usr/bin/env node

import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputDir = process.env.SWAGGER_DIR || '../swagger';
const outputDir = `${__dirname}/${process.env.OUT_DIR || '../dist'}`;
const regex = /.swagger.(ya?ml|json)/i
const reserved = /(\.|-)/ig

function validModuleName(name) {
  return name.replace(reserved, '_');
}

async function generateIndex(output, imports) {
  const content =
    imports.map(v => `import * as ${validModuleName(v)} from './lib/${v}';`)
           .join('\n');

  fs.writeFileSync(output, content, { flag: 'w'});
}

async function generateClient(input, output, name) {
  exec(`
    npx swagger-typescript-api \
      --axios \
      --js \
      --name ${name} \
      --path "${input}" \
      --output "${output}"
  `);
}

async function main() {
  console.log("Generating client SDKs...");

  const swaggerFiles = fs.readdirSync(`${__dirname}/${inputDir}`)
                         .filter((v) => regex.test(v));

  const names = swaggerFiles.map(file => file.replace(regex, ''));

  swaggerFiles.forEach(file =>
    generateClient(`${__dirname}/${inputDir}/${file}`,
                   `${outputDir}/lib`,
                   file.replace('.swagger.yaml', ''))
  );

  [`${outputDir}/index.js`, `${outputDir}/index.d.ts`]
    .forEach(v => generateIndex(v, names))
}

main();