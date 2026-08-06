import { readJsonFromBlob, writeJsonToBlob } from '@/lib/azure-json-storage';
import { FESTIVAL_CONTAINER } from '@/lib/festival-access';

/**
 * Toby's curation: which transcript segments are kept and which are chatter.
 *
 * ---------------------------------------------------------------------------
 * TWO FILES, AND THE DIFFERENCE MATTERS.
 *
 *   data/annotations.json   Franklin's E0 rescue. READ-ONLY here, always.
 *   data/curation-edits.json  Toby's ongoing changes. An overlay this code owns.
 *
 * The rescue is a preserved artifact — its provenance records the sha256 of the
 * 1.2 MB source it was copied from, verbatim, because "regenerating is not
 * preserving". Editing it in place would destroy the thing that was rescued and
 * make that checksum a lie. So changes go into a separate overlay and the
 * rescue is never written to. That also means one writer per file rather than
 * two, which is what keeps the naive read-modify-write correct.
 * ---------------------------------------------------------------------------
 *
 * WHAT `s` ACTUALLY MEANS — verified against the reference browser, not assumed:
 *
 *     if (!sg.s && se.text === undefined) cls.push('chatter');
 *     if (se.hidden) cls.push('seg-hidden');       // <- this is "dropped"
 *
 * So `s: false` is CHATTER, not dropped. The 10,295 segments in the rescue are
 * chatter. "Dropped" was a separate manual layer held in `edits`, which the
 * reference loaded from **localStorage only** — it is not in the rescue, not on
 * the drive, and not recoverable from it. See the note in PHASE-E-STATUS.
 *
 * Rendering those 10,295 as "dropped" would misrepresent Toby's curation as
 * discarding eight times more than he did, so the mapping below is deliberate.
 */

const RESCUE_BLOB = 'data/annotations.json';
const OVERLAY_BLOB = 'data/curation-edits.json';
const FESTIVAL_ACCOUNT = 'festival';

export const CLASSES = ['keep', 'chatter', 'dropped'];
export const DEFAULT_CLASS = 'keep';

const readOpts = (fallback) => ({
  account: FESTIVAL_ACCOUNT,
  container: FESTIVAL_CONTAINER,
  fallback,
});

/**
 * Read the rescue + the overlay.
 *
 * An unrecognised rescue shape is reported as `malformed`, never half-read:
 * mis-reading it would hide real content from every attendee.
 */
export async function readAnnotations() {
  let rescue;
  try {
    rescue = await readJsonFromBlob(RESCUE_BLOB, readOpts(null));
  } catch (e) {
    // A read error is not "no curation".
    return { present: false, error: e.message };
  }
  if (rescue === null) return { present: false };

  if (!Array.isArray(rescue?.recordings)) {
    return { present: false, malformed: true };
  }

  // blob -> { cueIndex -> 'keep' | 'chatter' }
  const base = new Map();
  for (const rec of rescue.recordings) {
    if (!rec?.blob || !Array.isArray(rec.segments)) continue;
    const segs = new Map();
    for (const seg of rec.segments) {
      if (!Number.isInteger(seg?.i)) continue;
      segs.set(seg.i, seg.s === false ? 'chatter' : 'keep');
    }
    base.set(rec.blob, segs);
  }

  let overlay = {};
  try {
    const raw = await readJsonFromBlob(OVERLAY_BLOB, readOpts({ edits: {} }));
    overlay = raw?.edits && typeof raw.edits === 'object' ? raw.edits : {};
  } catch (e) {
    // The overlay failing is not fatal — the rescue is still the truth. Report
    // it so the admin knows their recent edits may not be reflected.
    return { present: true, base, overlay: {}, counts: rescue.counts || null, overlayError: e.message };
  }

  return { present: true, base, overlay, counts: rescue.counts || null };
}

/** Effective classification for one cue: the overlay wins over the rescue. */
export function classOf(annotations, recordingBlob, cueIndex) {
  if (!annotations?.present) return DEFAULT_CLASS;
  const edited = annotations.overlay?.[recordingBlob]?.[String(cueIndex)];
  if (CLASSES.includes(edited)) return edited;
  return annotations.base?.get(recordingBlob)?.get(cueIndex) || DEFAULT_CLASS;
}

/** Per-recording tally, so the admin can see what attendees are not shown. */
export function tally(annotations, recordingBlob, lineCount) {
  const counts = { keep: 0, chatter: 0, dropped: 0 };
  for (let i = 0; i < lineCount; i++) counts[classOf(annotations, recordingBlob, i)] += 1;
  return counts;
}

/**
 * Record a classification change in the OVERLAY. Admin-only at the route layer.
 *
 * Refuses while the rescue is missing or unreadable: curating against an
 * unknown baseline would silently diverge from Toby's real classification.
 * Single-writer read-modify-write, safe for the same reason comments are.
 */
export async function writeAnnotation(recordingBlob, cueIndex, value) {
  if (!CLASSES.includes(value)) throw new Error(`Unknown classification: ${value}`);

  const current = await readAnnotations();
  if (!current.present) {
    throw new Error(
      current.malformed
        ? 'The rescued curation does not match the expected shape, so edits would be made against an unknown baseline. Refusing.'
        : 'The rescued curation (plan E0) is not readable yet, so there is no baseline to edit against. Refusing.'
    );
  }

  let existing;
  try {
    existing = await readJsonFromBlob(OVERLAY_BLOB, readOpts({ edits: {} }));
  } catch (e) {
    // Refuse to write an overlay we could not first read -- that would drop
    // every previous edit.
    throw new Error(`Could not read the existing edits, refusing to overwrite them: ${e.message}`);
  }

  const edits = existing?.edits && typeof existing.edits === 'object' ? existing.edits : {};
  const forBlob = { ...(edits[recordingBlob] || {}), [String(cueIndex)]: value };

  await writeJsonToBlob(
    OVERLAY_BLOB,
    {
      note: 'Overlay on data/annotations.json. The rescue is never modified; this holds changes made since.',
      updated: new Date().toISOString(),
      edits: { ...edits, [recordingBlob]: forBlob },
    },
    { account: FESTIVAL_ACCOUNT, container: FESTIVAL_CONTAINER }
  );
  return true;
}
