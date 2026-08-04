import { NextResponse } from 'next/server';
import {
  readAccess,
  writeAccess,
  hasAccess,
  isAdminPassword,
  isValidEmail,
  normaliseEmail,
  FESTIVALS,
} from '@/lib/festival-access';

/**
 * Admin API for the Festival access allowlist.
 *
 *   GET  ?password=ADMIN                 -> list users
 *   POST { password, action, ... }       -> add | update | remove
 *   POST { action: 'check', email, key } -> is this email allowed? (no password)
 *
 * The 'check' action is deliberately unauthenticated so the login page can use
 * it, and deliberately returns ONLY a boolean -- it never reveals the list.
 */

const deny = (msg, code) => NextResponse.json({ error: msg }, { status: code });

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (!isAdminPassword(searchParams.get('password'))) {
    return deny('Admin access required', 401);
  }
  try {
    const access = await readAccess();
    return NextResponse.json({ users: access.users, festivals: FESTIVALS });
  } catch (e) {
    // Surface the failure instead of pretending the list is empty.
    return deny(`Could not read access list: ${e.message}`, 502);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return deny('Invalid JSON body', 400);
  }
  const { action } = body;

  // --- unauthenticated: does this email have access? boolean only ---
  if (action === 'check') {
    const allowed = await hasAccess(body.email, body.festival);
    return NextResponse.json({ allowed });
  }

  if (!isAdminPassword(body.password)) {
    return deny('Admin access required', 403);
  }

  let access;
  try {
    access = await readAccess();
  } catch (e) {
    // Refuse to mutate a list we could not read -- writing now would clobber it.
    return deny(`Could not read access list, refusing to write: ${e.message}`, 502);
  }

  const email = normaliseEmail(body.email);

  if (action === 'add' || action === 'update') {
    if (!isValidEmail(email)) return deny('A valid email is required', 400);
    const pages = Array.isArray(body.pages) ? body.pages : [];
    if (!pages.length) return deny('Grant at least one festival', 400);

    const idx = access.users.findIndex((u) => normaliseEmail(u.email) === email);
    const record = {
      email,
      name: String(body.name || '').trim(),
      pages,
      note: String(body.note || '').trim(),
      added: idx >= 0 ? access.users[idx].added : new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    if (idx >= 0) access.users[idx] = record;
    else access.users.push(record);
  } else if (action === 'remove') {
    if (!email) return deny('Email is required', 400);
    const before = access.users.length;
    access.users = access.users.filter((u) => normaliseEmail(u.email) !== email);
    if (access.users.length === before) return deny('No such user', 404);
  } else {
    return deny(`Unknown action: ${action}`, 400);
  }

  access.users.sort((a, b) => a.email.localeCompare(b.email));
  try {
    await writeAccess(access);
  } catch (e) {
    return deny(`Save failed: ${e.message}`, 502);
  }
  return NextResponse.json({ ok: true, users: access.users });
}
