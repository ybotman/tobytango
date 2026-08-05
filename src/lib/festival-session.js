import crypto from 'crypto';
import { normaliseEmail } from '@/lib/festival-access';

/**
 * Signed session for the gated Festival archives.
 *
 * The cookie carries the EMAIL, not a grant. That is deliberate and it is the
 * whole point of this layer:
 *
 *   - Revocation bites at the next request. Every gated request re-runs
 *     hasAccess() against the live allowlist using the email from the cookie.
 *     The cookie proves "this browser claimed this address and we checked it
 *     once"; it is never treated as a standing permission.
 *   - The identity step stays swappable. Replacing the email box with a magic
 *     link later means changing only who is allowed to call issueSession() --
 *     nothing downstream of the cookie has to change.
 *
 * This is a courtesy gate, not a lock, and the UI says so. A signed cookie stops
 * someone editing their own email to another person's; it does not stop someone
 * typing a friend's address in the first place. That is the accepted trade per
 * plan §1 R1 -- the threat being answered is discoverability, not impersonation.
 */

export const SESSION_COOKIE = 'festival_session';

/** 12 hours. Long enough to watch an archive, short enough to expire in a day. */
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

/**
 * The signing key. Returns null when unset or too short to be worth anything --
 * callers must treat null as "deny", never as "skip the signature".
 */
function secret() {
  const s = (process.env.FESTIVAL_SESSION_SECRET || '').trim();
  return s.length >= 16 ? s : null;
}

/** Is the session layer configured at all? Used to fail closed with a clear reason. */
export function isSessionConfigured() {
  return secret() !== null;
}

const sign = (body, key) =>
  crypto.createHmac('sha256', key).update(body).digest('base64url');

/**
 * Mint a signed token for this email.
 * Throws when no secret is configured -- callers must let that deny the request
 * rather than falling back to an unsigned cookie.
 */
export function signSession(email, ttlSeconds = SESSION_TTL_SECONDS) {
  const key = secret();
  if (!key) throw new Error('FESTIVAL_SESSION_SECRET is not configured');

  const addr = normaliseEmail(email);
  if (!addr) throw new Error('Cannot sign a session without an email');

  const payload = { email: addr, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${sign(body, key)}`;
}

/**
 * Verify a token and return its payload, or null.
 *
 * Fails closed on every path: no secret, no token, malformed token, bad
 * signature, unparseable payload, missing email, or expired. There is no
 * branch that returns a payload without a verified signature.
 */
export function verifySession(token) {
  const key = secret();
  if (!key || !token) return null;

  const parts = String(token).split('.');
  if (parts.length !== 2) return null;
  const [body, provided] = parts;
  if (!body || !provided) return null;

  const expected = sign(body, key);
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // Length check first: timingSafeEqual throws on a length mismatch.
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }

  const email = normaliseEmail(payload?.email);
  if (!email) return null;
  if (typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()) return null;

  return { email, exp: payload.exp };
}

/**
 * Cookie attributes.
 *
 * `secure` is production-only by necessity: dev runs on http://localhost:4003
 * and a Secure cookie is silently dropped there, which would make the gate
 * untestable locally. Every deployed environment is https, so this is Secure
 * everywhere it matters.
 */
export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  };
}
