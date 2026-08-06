import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hasAccess, FESTIVALS } from '@/lib/festival-access';
import { SESSION_COOKIE, verifySession } from '@/lib/festival-session';
import { isAdminRequest } from '@/lib/festival-admin';
import { loadWorkshop } from '@/lib/festival-archive';
import {
  readComments, writeComments, nextCommentId, sanitiseText,
} from '@/lib/festival-comments';

/**
 * Comments on the archive.
 *
 *   GET  ?festival=&date=   -> read (any signed-in viewer on the allowlist)
 *   POST { action: add | update | remove, ... }  -> ADMIN ONLY
 *
 * Reading is gated exactly like the pages: cookie supplies the email,
 * hasAccess() is re-checked live. Writing additionally requires the admin
 * cookie. There is no path where a non-admin writes.
 *
 * Per plan §E4 this is deliberately single-writer: the store is one blob under
 * read-modify-write. Do not widen writing to attendees without moving to
 * per-comment blobs or If-Match first.
 */

const noStore = { 'Cache-Control': 'no-store' };
const deny = (msg, code) => NextResponse.json({ error: msg }, { status: code, headers: noStore });

/** Shared gate: returns the viewer's email or a denial response. */
async function requireViewer(festival) {
  if (!FESTIVALS.some((f) => f.key === festival)) return { error: deny('Unknown festival', 400) };
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session?.email) return { error: deny('Not signed in', 401) };

  let allowed;
  try {
    allowed = await hasAccess(session.email, festival);
  } catch {
    return { error: deny('Could not verify access right now.', 502) }; // never fail open
  }
  if (!allowed) return { error: deny('No access', 403) };
  return { email: session.email, store };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const festival = String(searchParams.get('festival') || '').trim();
  const gate = await requireViewer(festival);
  if (gate.error) return gate.error;

  try {
    const { comments } = await readComments();
    const date = searchParams.get('date');
    const filtered = date ? comments.filter((c) => c.date === date) : comments;
    return NextResponse.json(
      { comments: filtered, canEdit: isAdminRequest(gate.store) },
      { headers: noStore }
    );
  } catch (e) {
    // Surface the failure rather than pretending there are no comments.
    return deny(`Could not read the comments: ${e.message}`, 502);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return deny('Invalid JSON body', 400);
  }

  const festival = String(body?.festival || '').trim();
  const gate = await requireViewer(festival);
  if (gate.error) return gate.error;

  // --- the admin-only boundary ---
  if (!isAdminRequest(gate.store)) {
    return deny('Comments are written by the archive owner only.', 403);
  }

  let store;
  try {
    store = await readComments();
  } catch (e) {
    // Refuse to mutate a list we could not read -- writing now would clobber it.
    return deny(`Could not read the comments, refusing to write: ${e.message}`, 502);
  }
  let comments = store.comments;

  const action = String(body?.action || '').trim();

  if (action === 'add' || action === 'update') {
    const text = sanitiseText(body?.text);
    if (!text) return deny('A comment needs some text', 400);

    if (action === 'add') {
      const recording = String(body?.recording || '').trim();

      // Anchor must be a recording this archive actually has.
      let workshop;
      try {
        workshop = await loadWorkshop();
      } catch {
        return deny('The archive index is unavailable', 502);
      }
      const rec = (workshop.audio || []).find((a) => a.blob === recording);
      if (!rec) return deny('Unknown recording', 404);

      const t = body?.t == null ? null : Number(body.t);
      if (t != null && (!Number.isFinite(t) || t < 0)) return deny('Invalid moment', 400);

      comments = [...comments, {
        id: nextCommentId(comments),
        recording,
        date: rec.date,
        // Seconds are the durable anchor; the cue index is a convenience that
        // can go stale if a transcript is ever re-generated.
        t: t == null ? null : Math.round(t * 100) / 100,
        cue: Number.isInteger(body?.cue) ? body.cue : null,
        text,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      }];
    } else {
      const id = String(body?.id || '').trim();
      const idx = comments.findIndex((c) => c.id === id);
      if (idx < 0) return deny('No such comment', 404);
      comments = comments.map((c, i) =>
        i === idx ? { ...c, text, updated: new Date().toISOString() } : c);
    }
  } else if (action === 'remove') {
    const id = String(body?.id || '').trim();
    const before = comments.length;
    comments = comments.filter((c) => c.id !== id);
    if (comments.length === before) return deny('No such comment', 404);
  } else {
    return deny(`Unknown action: ${action}`, 400);
  }

  try {
    await writeComments({ comments });
  } catch (e) {
    return deny(`Save failed: ${e.message}`, 502);
  }
  return NextResponse.json({ ok: true, comments }, { headers: noStore });
}
