// Shared setup for the festival media pipeline.
//
// Loads .env.local the way Next does (including the dotenv-expand `\$` escape)
// and hands back a container client authenticated with the container-scoped
// service principal. Never logs a secret.
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BlobServiceClient } from '@azure/storage-blob';
import { ClientSecretCredential } from '@azure/identity';

export const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** Source media tree on the DEVL volume. Override with FESTIVAL_SRC. */
export const SRC = process.env.FESTIVAL_SRC || '/Volumes/DEVL/Tango/workshops/chicho202606';

/** Scratch dir for the generated manifest / json. Override with FESTIVAL_WORK. */
export const WORK = process.env.FESTIVAL_WORK || join(REPO, '.festival-work');
mkdirSync(WORK, { recursive: true });

export function loadEnv() {
  for (const line of readFileSync(join(REPO, '.env.local'), 'utf-8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    // dotenv-expand treats an unescaped $NAME as a variable reference; the
    // escape in .env.local is deliberate. Unescape it the same way Next does.
    process.env[k] = v.replace(/\\\$/g, '$');
  }
}

/** The one blob that must never be written by this pipeline. */
export const NEVER_WRITE = 'data/access.json';

export function containerClient() {
  loadEnv();
  const account = (process.env.AZURE_FESTIVAL_ACCOUNT_NAME || '').trim();
  const container = (process.env.AZURE_FESTIVAL_CONTAINER || '').trim();
  const tenantId = (process.env.AZURE_FESTIVAL_TENANT_ID || '').trim();
  const clientId = (process.env.AZURE_FESTIVAL_CLIENT_ID || '').trim();
  const clientSecret = (process.env.AZURE_FESTIVAL_CLIENT_SECRET || '').trim();

  if (!account || !container || !tenantId || !clientId || !clientSecret) {
    throw new Error('Azure festival storage not configured — see plan §A2 for the env contract');
  }
  return new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    new ClientSecretCredential(tenantId, clientId, clientSecret)
  ).getContainerClient(container);
}

/** Blob names are URL-facing: source names carry spaces, colons and `+`. */
export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-|-$/g, '');
