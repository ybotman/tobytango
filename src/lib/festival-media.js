import {
  BlobServiceClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
} from '@azure/storage-blob';
import { festivalAccount } from '@/lib/azure-json-storage';
import { FESTIVAL_CONTAINER } from '@/lib/festival-access';

/**
 * Short-lived, per-blob, read-only media URLs for the gated Festival archive.
 *
 * The browser fetches media DIRECTLY from Azure, so Range requests (seeking)
 * work natively and 4.4 GB never flows through Vercel. What makes that safe is
 * a user-delegation SAS: it is signed with a key obtained as the service
 * principal, so it stays bounded by that principal's own RBAC. The SP can only
 * reach the festival container, therefore so can any SAS it mints — granting
 * `Storage Blob Delegator` added the ability to delegate, not new data access.
 *
 * A SAS URL IS a public URL for its lifetime. Anyone holding it can fetch it,
 * and anything that logs, caches or shares it extends the leak. The short
 * expiry is the entire control, so keep it short and never let one be cached.
 */

/** 15 minutes. Long enough to start playing, short enough that a leaked URL dies fast. */
export const MEDIA_SAS_TTL_SECONDS = 15 * 60;

/** Small backdate so a slightly-fast client clock cannot reject a fresh SAS. */
const CLOCK_SKEW_SECONDS = 120;

/**
 * Only these prefixes may ever be signed.
 *
 * This is the control that stops the route becoming a read-any-blob oracle:
 * the SP can read the WHOLE container, `data/access.json` included, so without
 * this an authenticated visitor could ask for the allowlist and be handed a
 * signed URL to it.
 */
const SIGNABLE = /^(video|audio|transcripts)\/[A-Za-z0-9][A-Za-z0-9._\-/]*$/;

/**
 * Is this blob name safe to sign? Fails closed on anything unexpected.
 * Rejects traversal, absolute paths, doubled slashes and every `data/` blob.
 */
export function isSignableBlob(name) {
  const n = String(name || '');
  if (!n || n.length > 300) return false;
  if (n.includes('..') || n.includes('//') || n.includes('\\')) return false;
  if (n.startsWith('/') || n.endsWith('/')) return false;
  if (decodeURIComponent(n) !== n) return false;  // no percent-encoded smuggling
  return SIGNABLE.test(n);
}

/**
 * The user-delegation key is an account round-trip, so cache it. It is NOT a
 * grant to anything by itself — it only signs SAS bounded by the SP's RBAC.
 */
let cached = null;

async function delegationKey(service, accountName) {
  const now = Date.now();
  // Re-fetch well before expiry so a request never races the boundary.
  if (cached && cached.accountName === accountName && cached.expiresAt - now > 10 * 60 * 1000) {
    return cached.key;
  }
  const startsOn = new Date(now - CLOCK_SKEW_SECONDS * 1000);
  const expiresOn = new Date(now + 60 * 60 * 1000);
  const key = await service.getUserDelegationKey(startsOn, expiresOn);
  cached = { key, accountName, expiresAt: expiresOn.getTime() };
  return key;
}

/**
 * Mint read-only, time-limited URLs for the given blobs.
 *
 * Callers MUST have re-checked access for this request first — this function
 * deliberately knows nothing about who is asking. It throws rather than
 * returning a partial result if the account is misconfigured.
 */
export async function mintMediaUrls(blobNames, ttlSeconds = MEDIA_SAS_TTL_SECONDS) {
  const { accountName, credential } = festivalAccount();
  const containerName = FESTIVAL_CONTAINER;

  const service = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, credential);
  const key = await delegationKey(service, accountName);

  const now = Date.now();
  const startsOn = new Date(now - CLOCK_SKEW_SECONDS * 1000);
  const expiresOn = new Date(now + ttlSeconds * 1000);

  const out = {};
  for (const blobName of blobNames) {
    const sas = generateBlobSASQueryParameters(
      {
        containerName,
        blobName,
        permissions: BlobSASPermissions.parse('r'),   // read only, never write or delete
        startsOn,
        expiresOn,
        protocol: SASProtocol.Https,
      },
      key,
      accountName
    ).toString();

    const path = blobName.split('/').map(encodeURIComponent).join('/');
    out[blobName] = `https://${accountName}.blob.core.windows.net/${containerName}/${path}?${sas}`;
  }

  return { urls: out, expiresOn: expiresOn.toISOString() };
}
