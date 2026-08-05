import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { ClientSecretCredential } from '@azure/identity';

/**
 * Two storage accounts are genuinely in play, so the account — not just the
 * container — is resolved per call:
 *
 *   'default'  (omitted)  tangotiempoimages, reached with a full-account key.
 *                         Used by practice-videos and tango-collab. Behaviour
 *                         must not change.
 *   'festival'            tobytango, reached with the service principal
 *                         `tobytango-festival-blob`, whose single role
 *                         assignment is scoped to the festival container alone.
 *
 * Callers select with the `account` option, the same backward-compatible way
 * `container` was added. Omitting it keeps the historical path exactly as it
 * was.
 */

const env = (name) => (process.env[name] || '').trim();

function resolveAccount(account) {
  if (account === 'festival') {
    const accountName = env('AZURE_FESTIVAL_ACCOUNT_NAME');
    const tenantId = env('AZURE_FESTIVAL_TENANT_ID');
    const clientId = env('AZURE_FESTIVAL_CLIENT_ID');
    const clientSecret = env('AZURE_FESTIVAL_CLIENT_SECRET');

    // Fail closed. Never fall back to the default account when the festival
    // credentials are missing: that would silently send festival reads to an
    // account that does not hold the container, which is exactly the bug this
    // change exists to fix.
    if (!accountName || !tenantId || !clientId || !clientSecret) {
      throw new Error('Azure festival storage not configured');
    }

    return {
      cacheKey: `festival:${accountName}:${clientId}`,
      accountName,
      defaultContainer: env('AZURE_FESTIVAL_CONTAINER') || 'festival-chicho-202606',
      makeCredential: () => new ClientSecretCredential(tenantId, clientId, clientSecret),
    };
  }

  if (account && account !== 'default') {
    throw new Error(`Unknown storage account: ${account}`);
  }

  const accountName = env('AZURE_STORAGE_ACCOUNT_NAME');
  const accountKey = env('AZURE_STORAGE_ACCOUNT_KEY');

  if (!accountName || !accountKey) {
    throw new Error('Azure Storage not configured');
  }

  return {
    cacheKey: `default:${accountName}`,
    accountName,
    defaultContainer: env('AZURE_STORAGE_CONTAINER') || 'tangolab-study',
    makeCredential: () => new StorageSharedKeyCredential(accountName, accountKey),
  };
}

/**
 * The festival account's name and a fresh credential, resolved through the same
 * fail-closed rules as everything else here. Exported so the media-SAS layer
 * cannot drift into its own copy of the credential logic.
 */
export function festivalAccount() {
  const r = resolveAccount('festival');
  return {
    accountName: r.accountName,
    defaultContainer: r.defaultContainer,
    credential: r.makeCredential(),
  };
}

// One service client (and so one cached token) per account, not per request.
const serviceClients = new Map();

function getServiceClient(resolved) {
  const cached = serviceClients.get(resolved.cacheKey);
  if (cached) return cached;

  const client = new BlobServiceClient(
    `https://${resolved.accountName}.blob.core.windows.net`,
    resolved.makeCredential()
  );
  serviceClients.set(resolved.cacheKey, client);
  return client;
}

function getBlobClient(blobName, options = {}) {
  const resolved = resolveAccount(options.account);
  // `container` lets callers target a different container (e.g. the festival
  // archive) without changing the default used by existing routes.
  const containerName = (options.container || resolved.defaultContainer).trim();

  const containerClient = getServiceClient(resolved).getContainerClient(containerName);
  return containerClient.getBlockBlobClient(blobName);
}

export async function readJsonFromBlob(blobName, options = {}) {
  const { container, account, fallback } = options;
  try {
    const blobClient = getBlobClient(blobName, { container, account });
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

/**
 * Read a TEXT blob (e.g. an `.srt` transcript) as a string.
 *
 * Same account/container resolution and the same fail-closed semantics as
 * readJsonFromBlob — it just does not parse. Exists so the transcript path does
 * not need its own copy of the festival credential logic, which is the drift
 * that causes the two to disagree later.
 *
 * A missing blob returns `fallback` when one is given, otherwise null. Any
 * other error rethrows when the caller supplied a fallback, so a read failure
 * can never be mistaken for "this transcript is empty".
 */
export async function readTextFromBlob(blobName, options = {}) {
  const { container, account, fallback } = options;
  try {
    const blobClient = getBlobClient(blobName, { container, account });
    const downloadResponse = await blobClient.download(0);
    const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
    return downloaded.toString('utf-8');
  } catch (error) {
    if (error.statusCode === 404) {
      return fallback !== undefined ? fallback : null;
    }
    console.error(`Error reading ${blobName}:`, error.message);
    if (fallback !== undefined) throw error;
    return null;
  }
}

export async function writeJsonToBlob(blobName, data, options = {}) {
  try {
    const blobClient = getBlobClient(blobName, {
      container: options.container,
      account: options.account,
    });
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
