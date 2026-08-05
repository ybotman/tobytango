import { NextResponse } from 'next/server';
import { hasAccess, isValidEmail, normaliseEmail, FESTIVALS } from '@/lib/festival-access';
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  signSession,
  sessionCookieOptions,
  isSessionConfigured,
} from '@/lib/festival-session';

/**
 * Session for the gated Festival archives.
 *
 *   POST   { email, festival }  -> check the allowlist, then set a signed cookie
 *   DELETE                      -> clear the cookie (sign out)
 *
 * This route only ISSUES a session. It is not the gate. Every gated page
 * re-checks hasAccess() server-side on each request, so a session issued here
 * stops working the moment the user is revoked -- see lib/festival-session.js.
 *
 * Fails closed on every path: bad JSON, invalid email, unknown festival,
 * unlisted email, unreadable allowlist, or unconfigured signing secret all
 * deny. No branch sets a cookie without hasAccess() having returned true.
 */

const deny = (msg, code) => NextResponse.json({ error: msg }, { status: code });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return deny('Invalid JSON body', 400);
  }

  const email = normaliseEmail(body?.email);
  if (!isValidEmail(email)) {
    return deny('Enter a valid email address', 400);
  }

  const festival = String(body?.festival || '').trim();
  if (!FESTIVALS.some((f) => f.key === festival)) {
    return deny('Unknown festival', 400);
  }

  // Refuse before touching the allowlist if we could not sign the result
  // anyway -- an unsigned cookie must never be the fallback.
  if (!isSessionConfigured()) {
    return deny(
      'This archive is not fully configured yet, so it cannot let anyone in. Please tell Toby.',
      503
    );
  }

  // hasAccess() is already fail-closed: unknown email, unreadable list or
  // missing grant all return false.
  const allowed = await hasAccess(email, festival);
  if (!allowed) {
    return deny('That address is not on the list for this archive.', 403);
  }

  let token;
  try {
    token = signSession(email);
  } catch {
    return deny('Could not start a session. Please tell Toby.', 503);
  }

  const res = NextResponse.json({ ok: true, email });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(SESSION_TTL_SECONDS));
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', sessionCookieOptions(0));
  return res;
}
