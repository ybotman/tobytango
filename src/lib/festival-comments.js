import { readJsonFromBlob, writeJsonToBlob } from '@/lib/azure-json-storage';
import { FESTIVAL_CONTAINER } from '@/lib/festival-access';

/**
 * Toby's comments on the archive. Admin-authored, everyone-readable.
 *
 * SINGLE WRITER IS LOad-BEARING, not incidental. This is a read-modify-write on
 * one blob with no etag or lease, exactly like access.json. That is safe only
 * because one person writes it. Two simultaneous writers and one comment
 * vanishes with no error -- the same silent-loss shape the plan calls out.
 *
 * So: if comments are ever opened to attendees, this file is NOT the thing to
 * change first. It needs per-comment blobs, or If-Match optimistic concurrency,
 * BEFORE a second writer exists. Widening the permission alone would introduce
 * the bug quietly.
 *
 * A comment anchors to a recording, and optionally to a moment within it. The
 * moment is stored as SECONDS as well as a cue index: cue numbering can shift
 * if a transcript is ever re-generated, but a timestamp still points at the
 * same instant of audio. Search (E3) can then land on the moment.
 */

const COMMENTS_BLOB = 'data/comments.json';
const FESTIVAL_ACCOUNT = 'festival';
const EMPTY = { comments: [] };

/**
 * Read all comments. Throws on a real read error rather than returning empty --
 * an empty result would let a subsequent write wipe the real file.
 */
export async function readComments() {
  const data = await readJsonFromBlob(COMMENTS_BLOB, {
    account: FESTIVAL_ACCOUNT,
    container: FESTIVAL_CONTAINER,
    fallback: EMPTY,
  });
  return { comments: Array.isArray(data?.comments) ? data.comments : [] };
}

export async function writeComments(data) {
  return writeJsonToBlob(
    COMMENTS_BLOB,
    { comments: data.comments || [] },
    { account: FESTIVAL_ACCOUNT, container: FESTIVAL_CONTAINER }
  );
}

export const commentsFor = (all, recordingBlob) =>
  all
    .filter((c) => c.recording === recordingBlob)
    .sort((a, b) => {
      // Moment-anchored comments first, in time order; page-level ones after.
      if (a.t == null && b.t == null) return (a.created || '').localeCompare(b.created || '');
      if (a.t == null) return 1;
      if (b.t == null) return -1;
      return a.t - b.t;
    });

/** Stable id without Math.random, so it is reproducible and collision-checked. */
export function nextCommentId(existing) {
  const used = new Set(existing.map((c) => c.id));
  let n = existing.length + 1;
  while (used.has(`c-${n}`)) n++;
  return `c-${n}`;
}

export function sanitiseText(raw) {
  // Plain text only. It is rendered as text, never as HTML, so this is about
  // keeping the stored record tidy rather than about escaping.
  return String(raw || '').replace(/\r/g, '').trim().slice(0, 4000);
}
