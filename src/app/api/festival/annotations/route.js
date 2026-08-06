import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hasAccess, FESTIVALS } from '@/lib/festival-access';
import { SESSION_COOKIE, verifySession } from '@/lib/festival-session';
import { isAdminRequest } from '@/lib/festival-admin';
import { loadWorkshop } from '@/lib/festival-archive';
import { writeAnnotation, CLASSES } from '@/lib/festival-annotations';

/**
 * Change the curation of one transcript segment. ADMIN ONLY (plan §E2 — this is
 * Toby's curation, not a per-visitor preference).
 *
 *   POST { festival, recording, cue, cls: "keep"|"chatter"|"dropped" }
 *
 * Refuses while plan E0 is outstanding: writeAnnotation() will not create
 * data/annotations.json from a blank slate, because doing so would discard the
 * 13,456-segment classification Franklin is extracting.
 */

const noStore = { 'Cache-Control': 'no-store' };
const deny = (msg, code) => NextResponse.json({ error: msg }, { status: code, headers: noStore });

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

  let allowed;
  try {
    allowed = await hasAccess(session.email, festival);
  } catch {
    return deny('Could not verify access right now.', 502); // never fail open
  }
  if (!allowed) return deny('No access', 403);

  if (!isAdminRequest(store)) {
    return deny('Curation is changed by the archive owner only.', 403);
  }

  const recording = String(body?.recording || '').trim();
  const cue = body?.cue;
  const cls = String(body?.cls || '').trim();

  if (!Number.isInteger(cue) || cue < 0) return deny('Invalid cue', 400);
  if (!CLASSES.includes(cls)) return deny(`cls must be one of ${CLASSES.join(', ')}`, 400);

  let workshop;
  try {
    workshop = await loadWorkshop();
  } catch {
    return deny('The archive index is unavailable', 502);
  }
  if (!(workshop.audio || []).some((a) => a.blob === recording)) {
    return deny('Unknown recording', 404);
  }

  try {
    await writeAnnotation(recording, cue, cls);
  } catch (e) {
    // Includes the deliberate refusal while E0 is outstanding.
    return deny(e.message, 409);
  }
  return NextResponse.json({ ok: true }, { headers: noStore });
}
