import { NextResponse } from 'next/server';
import { isAdminPassword } from '@/lib/festival-access';
import {
  ADMIN_COOKIE, ADMIN_TTL_SECONDS, signAdminSession, adminCookieOptions,
  isAdminSessionConfigured,
} from '@/lib/festival-admin';

/**
 * Admin session for the archive's authoring surfaces.
 *
 *   POST { password } -> sets the admin cookie
 *   DELETE            -> clears it
 *
 * Grants AUTHORING only. It never grants access to the archive itself -- every
 * page still re-checks hasAccess() for the viewer's email on every request.
 *
 * Fails closed: no signing secret, no configured password, or a wrong password
 * all deny, and no branch sets a cookie without isAdminPassword() returning
 * true.
 */

const deny = (msg, code) =>
  NextResponse.json({ error: msg }, { status: code, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  if (!isAdminSessionConfigured()) {
    return deny('Admin authoring is not configured on this deployment.', 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return deny('Invalid JSON body', 400);
  }

  if (!isAdminPassword(body?.password)) {
    return deny('Wrong password.', 403);
  }

  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(ADMIN_COOKIE, signAdminSession(), adminCookieOptions(ADMIN_TTL_SECONDS));
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  res.cookies.set(ADMIN_COOKIE, '', adminCookieOptions(0));
  return res;
}
