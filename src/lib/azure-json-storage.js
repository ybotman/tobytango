import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

function getBlobClient(blobName, container) {
  const accountName = (process.env.AZURE_STORAGE_ACCOUNT_NAME || '').trim();
  const accountKey = (process.env.AZURE_STORAGE_ACCOUNT_KEY || '').trim();
  // `container` lets callers target a different container (e.g. the festival
  // archive) without changing the default used by existing routes.
  const containerName = (container || process.env.AZURE_STORAGE_CONTAINER || 'tangolab-study').trim();

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

export async function readJsonFromBlob(blobName, options = {}) {
  const { container, fallback } = options;
  try {
    const blobClient = getBlobClient(blobName, container);
    const downloadResponse = await blobClient.download(0);
    const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
    return JSON.parse(downloaded.toString('utf-8'));
  } catch (error) {
    // If blob doesn't exist, return the caller's shape (defaults to the legacy
    // { videos: [] } so existing callers keep behaving exactly as before).
    if (error.statusCode === 404) {
      return fallback !== undefined ? fallback : { videos: [] };
    }
    console.error(`Error reading ${blobName}:`, error.message);
    // A read failure must NOT look like "empty" to an access-control caller —
    // rethrow when the caller supplied its own fallback shape.
    if (fallback !== undefined) throw error;
    return { videos: [] };
  }
}

export async function writeJsonToBlob(blobName, data, options = {}) {
  try {
    const blobClient = getBlobClient(blobName, options.container);
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
