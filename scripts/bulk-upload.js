#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = '/Users/tobybalsley/Downloads/AdvClass';
const API_BASE = 'https://www.tobytango.com';
const ADMIN_PASSWORD = '!oveuN4stoP';

const TAGS = ['ut', 'class', 'sequence', 'secretadvanced'];
const ARTIST = 'Hernan';

// Files to skip (already uploaded)
const SKIP_FILES = ['20241123', '20241130', '20241221', '20241228'];

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
      artists: [ARTIST],
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
  const ext = path.extname(filePath).toLowerCase();
  const contentType = ext === '.mov' ? 'video/quicktime' : 'video/mp4';

  console.log(`\nUploading: ${fileName}`);

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
  console.log('Bulk Video Upload Script');
  console.log('========================');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Tags: ${TAGS.join(', ')}`);
  console.log(`Artist: ${ARTIST}`);
  console.log(`Skipping: ${SKIP_FILES.join(', ')}`);

  // Get list of video files
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.(mp4|mov)$/i.test(f))
    .filter(f => {
      const baseName = path.basename(f, path.extname(f));
      return !SKIP_FILES.some(skip => baseName.startsWith(skip));
    })
    .map(f => path.join(SOURCE_DIR, f))
    .sort();

  console.log(`\nFound ${files.length} files to upload:\n`);
  files.forEach(f => console.log(`  - ${path.basename(f)}`));

  // Upload each file
  let success = 0;
  let failed = 0;

  for (const filePath of files) {
    try {
      await uploadVideo(filePath);
      success++;
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n========================`);
  console.log(`Completed: ${success} uploaded, ${failed} failed`);
  console.log('\nNote: Use the UI to regenerate thumbnails for uploaded videos.');
}

main().catch(console.error);
