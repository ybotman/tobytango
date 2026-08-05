import { NextResponse } from 'next/server';
import { hasAccess, FESTIVALS } from '@/lib/festival-access';
import { SESSION_COOKIE, verifySession, isSessionConfigured } from '@/lib/festival-session';
import { mintMediaUrls, isSignableBlob, MEDIA_SAS_TTL_SECONDS } from '@/lib/festival-media';

/**
 * Mint short-lived media URLs for the gated Festival archive.
 *
 *   POST { festival, blobs: ["video/…mp4", "audio/…m4a"] }
 *     -> { urls: { "<blob>": "<https url with SAS>" }, expiresOn, ttlSeconds }
 *
 * The browser then fetches media straight from Azure, so seeking (Range) works
 * natively and the bytes never pass through Vercel.
 *
 * The cookie is NOT a standing grant. Every call re-runs hasAccess() against
 * the live allowlist, so a revoked person stops getting URLs on their very next
 * request — the same property the gate itself has, preserved at the media layer.
 * Already-issued URLs stay valid until they expire; that is what keeps the TTL
 * short.
 *
 * Fails closed on every path: no session, bad signature, expired cookie,
 * unknown festival, revoked user, unsignable blob name, or unconfigured storage
 * all deny. No branch mints a URL without hasAccess() having returned true.
 */

// A SAS must never be cached or reused by another visitor.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** Bounded so one request cannot ask for the whole archive at once. */
const MAX_BLOBS = 60;

const deny = (msg, code) =>
  NextResponse.json({ error: msg }, { status: code, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request) {
  if (!isSessionConfigured()) {
    return deny('This archive is not fully configured yet. Please tell Toby.', 503);
  }

  const session = verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    return deny('Not signed in for this archive.', 401);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return deny('Invalid JSON body', 400);
  }

  const festival = String(body?.festival || '').trim();
  if (!FESTIVALS.some((f) => f.key === festival)) {
    return deny('Unknown festival', 400);
  }

  const blobs = Array.isArray(body?.blobs) ? body.blobs : [];
  if (!blobs.length) return deny('blobs is required', 400);
  if (blobs.length > MAX_BLOBS) return deny(`At most ${MAX_BLOBS} blobs per request`, 400);

  // Reject the whole request rather than silently dropping bad entries — a
  // caller must never think it received a URL it did not.
  const bad = blobs.filter((b) => !isSignableBlob(b));
  if (bad.length) {
    return deny(`Not a signable media path: ${String(bad[0]).slice(0, 80)}`, 400);
  }

  // The live re-check. This is the point of the whole design: revocation bites
  // here, on this request, not whenever the cookie happens to expire.
  let allowed;
  try {
    allowed = await hasAccess(session.email, festival);
  } catch {
    return deny('Could not verify access right now.', 502);   // never fail open
  }
  if (!allowed) {
    return deny('That address is no longer on the list for this archive.', 403);
  }

  let minted;
  try {
    minted = await mintMediaUrls([...new Set(blobs)]);
  } catch (e) {
    console.error('Festival media SAS mint failed:', e.message);
    return deny('Could not prepare the media right now.', 502);
  }

  return NextResponse.json(
    { urls: minted.urls, expiresOn: minted.expiresOn, ttlSeconds: MEDIA_SAS_TTL_SECONDS },
    { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, private' } }
  );
}
