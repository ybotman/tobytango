import { readJsonFromBlob, writeJsonToBlob } from '@/lib/azure-json-storage';

/**
 * Access control for the gated Festival archives.
 *
 * The allowlist lives in the festival blob container as data/access.json:
 *
 *   { "users": [ { email, name, pages: ["chicho2026"], added, note } ] }
 *
 * `pages` holds festival keys, or "*" for every festival. Access is an
 * ALLOWLIST: anyone not present is denied, so a missing or empty file
 * fails CLOSED.
 */

export const FESTIVAL_CONTAINER =
  (process.env.AZURE_FESTIVAL_CONTAINER || 'festival-chicho-202606').trim();

/**
 * The festival container lives in the `tobytango` storage account, NOT in the
 * `tangotiempoimages` account the other routes use. This selects that account
 * (and its container-scoped service principal) in azure-json-storage.
 */
const FESTIVAL_ACCOUNT = 'festival';

const ACCESS_BLOB = 'data/access.json';
const EMPTY = { users: [] };

/** Festivals that can be granted. Add new ones here as they are published. */
export const FESTIVALS = [
  { key: 'chicho2026', label: 'Chicho 2026' },
];

export const normaliseEmail = (e) => String(e || '').trim().toLowerCase();

export function isValidEmail(e) {
  const v = normaliseEmail(e);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/**
 * Read the allowlist. Throws on a real read error rather than returning empty:
 * an empty result would make the admin UI look like "no users yet", and a
 * subsequent save would then wipe the real list.
 */
export async function readAccess() {
  const data = await readJsonFromBlob(ACCESS_BLOB, {
    account: FESTIVAL_ACCOUNT,
    container: FESTIVAL_CONTAINER,
    fallback: EMPTY,
  });
  return { users: Array.isArray(data?.users) ? data.users : [] };
}

export async function writeAccess(data) {
  return writeJsonToBlob(
    ACCESS_BLOB,
    { users: data.users || [] },
    { account: FESTIVAL_ACCOUNT, container: FESTIVAL_CONTAINER }
  );
}

/**
 * Is this email allowed to see this festival?
 * Fails closed: unknown email, unreadable list, or missing grant => false.
 */
export async function hasAccess(email, festivalKey) {
  const addr = normaliseEmail(email);
  if (!addr) return false;
  let access;
  try {
    access = await readAccess();
  } catch {
    return false; // never fail open
  }
  const user = access.users.find((u) => normaliseEmail(u.email) === addr);
  if (!user) return false;
  const pages = Array.isArray(user.pages) ? user.pages : [];
  return pages.includes('*') || pages.includes(festivalKey);
}

export function isAdminPassword(supplied) {
  const expected = (process.env.FESTIVAL_ADMIN_PASSWORD || '').trim();
  // With no password configured, refuse rather than allowing everyone in.
  if (!expected) return false;
  return String(supplied || '').trim() === expected;
}
