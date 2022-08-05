#!/usr/bin/env node

const exec = require('child_process').exec;
const fs = require('fs');
require('dotenv/config');

const inputDir = process.env.SWAGGER_DIR || '../swagger';
const outputDir = `${__dirname}/${process.env.OUT_DIR || '../src'}`;
const regex = /.swagger.(ya?ml|json)/i
const reserved = /(\.|-)/ig

function validModuleName(name) {
  return name.replace(reserved, '_');
}

async function generateIndex(output, imports) {
  const content =
    imports.map(v => `export * as ${validModuleName(v)} from './lib/${v}';`)
           .join('\n');

  fs.writeFileSync(output, content, { flag: 'w'});
}

async function generateClient(input, output, name) {
  exec(`
    npx swagger-typescript-api \
      --unwrap-response-data \
      --extract-request-params \
      --extract-request-body \
      --responses \
      --axios \
      --module-name-index 0 \
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

  generateIndex(`${outputDir}/index.ts`, names)
}

main();