#!/usr/bin/env node

import axios from 'axios';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const endpointTpl = 'https://api.github.com/repos/{owner}/{repo}/contents/{path}';
const outputDir = process.env.OUT_DIR || '../swagger';
const syncServices = process.env.SYNC_SERVICES.split(','); // configured in package.json

async function downloadSwagger(service) {
  const url = endpointTpl
    .replace('{owner}', process.env.GITHUB_OWNER || 'bartekdobija')
    .replace('{repo}', process.env.GITHUB_REPO || 'api-session-manager')
    .replace('{path}', `openapi.yaml`);

  console.log('Fetching swagger for service', service);
  const response = await axios.get(url, {
    headers: {
      'Accept': 'application/vnd.github.v3.raw',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  });

  if (response.status !== 200) {
    throw Error('Failed to download swagger file');
  }

  fs.writeFileSync(
    `${__dirname}/${outputDir}/${service}.swagger.yaml`, response.data);
}

async function main() {
  await Promise.all(syncServices.map(downloadSwagger));
}

main()