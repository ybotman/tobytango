#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const API_BASE = 'https://www.tobytango.com';
const ADMIN_PASSWORD = '!oveuN4stoP';

const TAGS = ['Argentina2024'];
const FILES = [
  '/Users/tobybalsley/Downloads/argentina2024-1.MOV',
  '/Users/tobybalsley/Downloads/argentina2024-2.MOV',
  '/Users/tobybalsley/Downloads/argentina2024-3.MOV',
  '/Users/tobybalsley/Downloads/argentina2024-4.MOV',
  '/Users/tobybalsley/Downloads/argentina2024-5.MOV'
];

async function getUploadToken(fileName) {
  const response = await fetch(`${API_BASE}/api/tango-collab/upload-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: ADMIN_PASSWORD, fileName })
  });

  if (!response.ok) {
    throw new Error(`Failed to get upload token: ${response.status}`);
  }

  return response.json();
}

async function uploadToAzure(blobUrl, sasToken, filePath, contentType) {
  const fileBuffer = fs.readFileSync(filePath);

  const response = await fetch(`${blobUrl}?${sasToken}`, {
    method: 'PUT',
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': contentType,
    },
    body: fileBuffer
  });

  if (!response.ok) {
    throw new Error(`Failed to upload to Azure: ${response.status}`);
  }

  return blobUrl;
}

async function createVideoRecord(title, videoUrl) {
  const response = await fetch(`${API_BASE}/api/tango-collab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: ADMIN_PASSWORD,
      title,
      videoUrl,
      type: 'azure',
      tags: TAGS,
      artists: [],
      description: ''
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Failed to create video record: ${err.error || response.status}`);
  }

  return response.json();
}

async function uploadVideo(filePath) {
  const fileName = path.basename(filePath);
  const title = path.basename(filePath, path.extname(filePath));
  const contentType = 'video/quicktime';

  console.log(`\nUploading: ${fileName} (${(fs.statSync(filePath).size / 1024 / 1024).toFixed(1)} MB)`);

  // Get upload token
  console.log('  Getting upload token...');
  const { sasToken, blobUrl } = await getUploadToken(fileName);

  // Upload video
  console.log('  Uploading to Azure...');
  await uploadToAzure(blobUrl, sasToken, filePath, contentType);

  // Create video record
  console.log('  Creating video record...');
  const result = await createVideoRecord(title, blobUrl);

  console.log(`  Done! Video ID: ${result.video.id}`);
  return result.video;
}

async function main() {
  console.log('Argentina 2024 Upload Script');
  console.log('============================');
  console.log(`Tags: ${TAGS.join(', ')}`);
  console.log(`Files: ${FILES.length}`);

  let success = 0;
  let failed = 0;

  for (const filePath of FILES) {
    try {
      await uploadVideo(filePath);
      success++;
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n============================`);
  console.log(`Completed: ${success} uploaded, ${failed} failed`);
}

main().catch(console.error);
