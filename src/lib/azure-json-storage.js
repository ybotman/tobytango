import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

function getBlobClient(blobName) {
  const accountName = (process.env.AZURE_STORAGE_ACCOUNT_NAME || '').trim();
  const accountKey = (process.env.AZURE_STORAGE_ACCOUNT_KEY || '').trim();
  const containerName = (process.env.AZURE_STORAGE_CONTAINER || 'tangolab-study').trim();

  if (!accountName || !accountKey) {
    throw new Error('Azure Storage not configured');
  }

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  return containerClient.getBlockBlobClient(blobName);
}

export async function readJsonFromBlob(blobName) {
  try {
    const blobClient = getBlobClient(blobName);
    const downloadResponse = await blobClient.download(0);
    const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
    return JSON.parse(downloaded.toString('utf-8'));
  } catch (error) {
    // If blob doesn't exist, return default structure
    if (error.statusCode === 404) {
      return { videos: [] };
    }
    console.error(`Error reading ${blobName}:`, error.message);
    return { videos: [] };
  }
}

export async function writeJsonToBlob(blobName, data) {
  try {
    const blobClient = getBlobClient(blobName);
    const content = JSON.stringify(data, null, 2);
    const buffer = Buffer.from(content, 'utf-8');
    await blobClient.uploadData(buffer, {
      overwrite: true,
      blobHTTPHeaders: { blobContentType: 'application/json' }
    });
    return true;
  } catch (error) {
    console.error(`Error writing ${blobName}:`, error.message);
    throw error;
  }
}

// Helper to convert stream to buffer (works in serverless)
async function streamToBuffer(readableStream) {
  if (!readableStream) return Buffer.from('{}');

  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}
