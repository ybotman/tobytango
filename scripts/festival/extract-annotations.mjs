// E0 — RESCUE THE CURATION.
//
// site/index.html is the ONLY home of Toby's segment-level classification:
// 13,456 transcript segments, each with a keep/drop flag (`s`). It is not in
// workshop.json, not in the blob, and lives on one external drive.
//
// This EXTRACTS those values verbatim. It deliberately does NOT re-run
// annotations.py: regenerating is not preserving, and a rebuild that classified
// even slightly differently would silently replace a person's judgement with a
// machine's, with no way to tell which you were looking at afterwards.
//
// Writes annotations.json to WORK. Uploads nothing — see upload-annotations.mjs.
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SRC, WORK } from './_env.mjs';

const HTML = `${SRC}/site/index.html`;
const raw = readFileSync(HTML, 'utf-8');
const bytes = statSync(HTML).size;
const sha256 = createHash('sha256').update(readFileSync(HTML)).digest('hex');

const m = raw.match(/<script id="data"[^>]*>([\s\S]*?)<\/script>/);
if (!m) throw new Error('could not find the embedded <script id="data"> payload');
const data = JSON.parse(m[1]);

/** Same naming rules as build-manifest, so annotations join to the audio blobs. */
function blobFor(clipId) {
  const ts = clipId.match(/(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (ts) return `audio/${ts[1]}_${ts[2]}${ts[3]}${ts[4]}.m4a`;
  const rn = clipId.match(/New Recording (\d+)([^.]*)/);
  if (rn) {
    const suffix = rn[2].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `audio/rec-${String(Number(rn[1])).padStart(3, '0')}${suffix ? `-${suffix}` : ''}.m4a`;
  }
  return null;
}

const recordings = [];
let segments = 0, keep = 0, dropped = 0;

for (const day of data.days) {
  for (const session of day.sessions) {
    for (const c of session.clips) {
      const segs = c.segs.map((g, i) => ({
        i,                     // ordinal within the recording
        t: g.t,                // cue offset, seconds into the audio
        o: g.o,                // cue as the source rendered it
        ...(g.w ? { w: g.w } : {}),   // wall clock — present ONLY on the exact-time days
        s: g.s === true,       // THE CURATION: keep (true) vs chatter/dropped
        x: g.x,                // the text the flag was applied to
      }));
      segments += segs.length;
      for (const g of segs) (g.s ? keep++ : dropped++);

      recordings.push({
        id: c.id,
        key: c.key,
        blob: blobFor(c.id),
        date: day.id,
        dayLabel: day.label,
        session: session.title,
        subject: c.subject,          // '??' where the source left it unlabelled
        students: c.students === true,
        practice: c.practice === true,
        dur: c.dur,
        segments: segs,
      });
    }
  }
}

// `New Recording 92 copy` is segment-for-segment identical to `New Recording 92`
// and its audio was removed from the archive on Toby's call. Its annotations are
// preserved so the totals still match the source exactly, but flagged so nothing
// double-counts them or looks for a blob that is not there.
for (const r of recordings) {
  if (/copy/i.test(r.id)) {
    r.duplicateOf = 'New Recording 92';
    r.audioRemovedFromArchive = true;
    r.note = 'Identical segments to Recording 92; audio removed from the archive 2026-08-05. Kept so counts reconcile with the source.';
  }
}

const out = {
  provenance: {
    what: 'Segment-level keep/drop curation for the Chicho 2026 workshop transcripts.',
    extractedFrom: 'site/index.html (the standalone browser built by the local pipeline)',
    sourceBytes: bytes,
    sourceSha256: sha256,
    method:
      'Values copied VERBATIM from the embedded JSON payload. annotations.py was ' +
      'NOT re-run: regenerating is not preserving, and a rebuild that classified ' +
      'differently would silently replace human judgement with a machine\'s.',
    generator: 'annotations.py (survives at ~/Library/Mobile Documents/com~apple~CloudDocs/Tango/workshops/chicho202606/scripts/) — recorded as how these were produced, not as a substitute for them',
    fieldNotes: {
      s: 'true = KEEP (Chicho teaching worth surfacing); false = chatter/dropped.',
      t: 'cue offset in seconds into the recording — join key to the SRT.',
      w: 'wall-clock time. Present ONLY on 30 Jul, 31 Jul, 01 Aug. Absent on 28/29 Jul, whose clock times were destroyed.',
      x: 'the transcript text the flag was applied to; kept so a flag is never divorced from what it classified.',
    },
  },
  counts: { recordings: recordings.length, segments, keep, dropped },
  recordings,
};

writeFileSync(`${WORK}/annotations.json`, JSON.stringify(out, null, 1));

console.log(`source: ${HTML}`);
console.log(`  ${bytes} bytes  sha256 ${sha256.slice(0, 16)}…`);
console.log(`recordings : ${recordings.length}`);
console.log(`segments   : ${segments}`);
console.log(`  keep     : ${keep}`);
console.log(`  dropped  : ${dropped}`);
const perDay = {};
for (const r of recordings) {
  perDay[r.date] = perDay[r.date] || { segs: 0, keep: 0, wall: 0 };
  perDay[r.date].segs += r.segments.length;
  perDay[r.date].keep += r.segments.filter((g) => g.s).length;
  perDay[r.date].wall += r.segments.filter((g) => g.w).length;
}
console.log('per day  (segs / keep / with wall-clock):');
for (const [d, v] of Object.entries(perDay).sort()) {
  console.log(`  ${d}  ${String(v.segs).padStart(5)} / ${String(v.keep).padStart(4)} / ${String(v.wall).padStart(5)}`);
}
const noBlob = recordings.filter((r) => !r.blob);
if (noBlob.length) console.log(`\n!! ${noBlob.length} recordings have no derivable blob: ${noBlob.map((r) => r.id).join(', ')}`);
console.log(`\nwritten: ${WORK}/annotations.json`);
