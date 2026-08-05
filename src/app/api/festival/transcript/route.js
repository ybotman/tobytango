import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hasAccess, FESTIVALS } from '@/lib/festival-access';
import { SESSION_COOKIE, verifySession } from '@/lib/festival-session';
import { getTranscript, loadWorkshop } from '@/lib/festival-archive';

/**
 * Transcript for one recording, fetched on demand when a reader opens it.
 *
 *   POST { festival, blob } -> { usable, reason, lines[], loopCount, ... }
 *
 * Gated exactly like the page: the cookie supplies the email, and hasAccess()
 * is re-checked here against the live allowlist. A revoked person loses this
 * at their next request too -- the API must not be a way around the property
 * the page enforces.
 *
 * `blob` is validated against workshop.json rather than trusted, so this cannot
 * be used to read an arbitrary blob out of the container.
 */

const deny = (msg, code) => NextResponse.json({ error: msg }, { status: code });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return deny('Invalid JSON body', 400);
  }

  const festival = String(body?.festival || '').trim();
  if (!FESTIVALS.some((f) => f.key === festival)) return deny('Unknown festival', 400);

  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session?.email) return deny('Not signed in', 401);
  if (!(await hasAccess(session.email, festival))) return deny('No access', 403);

  const blob = String(body?.blob || '').trim();

  // Only a transcript that workshop.json actually references may be read.
  let workshop;
  try {
    workshop = await loadWorkshop();
  } catch {
    return deny('The archive index is unavailable', 502);
  }
  const known = (workshop.audio || []).some((a) => a.transcript?.srt === blob);
  if (!known) return deny('Unknown transcript', 404);

  try {
    return NextResponse.json(await getTranscript(blob));
  } catch (e) {
    return deny(`Could not read the transcript: ${e.message}`, 502);
  }
}
