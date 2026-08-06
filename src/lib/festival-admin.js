import crypto from 'crypto';

/**
 * Admin session for the archive's authoring surfaces (E2 curation toggles, E4
 * comments).
 *
 * Why this exists: until now "admin" meant posting FESTIVAL_ADMIN_PASSWORD with
 * each request from /admin/access. The archive pages need to decide what to
 * RENDER server-side -- toggles or not, a comment box or not -- so they need an
 * admin identity on the request itself.
 *
 * Two properties this deliberately keeps:
 *
 *  - It is NOT a view gate. Being admin does not grant access to the archive;
 *    hasAccess() still decides that on every request, unchanged. This cookie
 *    only unlocks AUTHORING. Keeping the two orthogonal means the gate stays
 *    exactly as verified in Phase B.
 *  - It is domain-separated from the viewer session. Both are HMACs under
 *    FESTIVAL_SESSION_SECRET, so without separation a viewer token and an admin
 *    token would be forgeable from one another. The key here is derived
 *    HMAC(secret, 'festival-admin-session-v1'), and the payload carries an
 *    explicit purpose that is checked on verify.
 */

export const ADMIN_COOKIE = 'festival_admin';

/** Short by design: this is a writing session, not a reading one. */
export const ADMIN_TTL_SECONDS = 60 * 60 * 4;

const PURPOSE = 'festival-admin-session-v1';

function adminKey() {
  const base = (process.env.FESTIVAL_SESSION_SECRET || '').trim();
  if (base.length < 16) return null;
  return crypto.createHmac('sha256', base).update(PURPOSE).digest();
}

export function isAdminSessionConfigured() {
  return adminKey() !== null && Boolean((process.env.FESTIVAL_ADMIN_PASSWORD || '').trim());
}

const sign = (body, key) => crypto.createHmac('sha256', key).update(body).digest('base64url');

export function signAdminSession(ttlSeconds = ADMIN_TTL_SECONDS) {
  const key = adminKey();
  if (!key) throw new Error('FESTIVAL_SESSION_SECRET is not configured');
  const payload = { purpose: PURPOSE, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${sign(body, key)}`;
}

/** True only for a valid, unexpired, purpose-matching admin token. */
export function verifyAdminSession(token) {
  const key = adminKey();
  if (!key || !token) return false;

  const parts = String(token).split('.');
  if (parts.length !== 2) return false;
  const [body, provided] = parts;
  if (!body || !provided) return false;

  const expected = sign(body, key);
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return false;
  }
  if (payload?.purpose !== PURPOSE) return false;
  if (typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()) return false;
  return true;
}

export function adminCookieOptions(maxAge = ADMIN_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  };
}

/** Read the admin flag off a Next cookie store. Never throws. */
export function isAdminRequest(cookieStore) {
  try {
    return verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
  } catch {
    return false;
  }
}
