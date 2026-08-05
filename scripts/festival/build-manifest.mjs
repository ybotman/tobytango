// Phase C — build the source->blob mapping. DRY RUN: writes manifest.json, uploads nothing.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { SRC, WORK } from './_env.mjs';


const idx = JSON.parse(readFileSync(`${SRC}/Video/video_index.json`, 'utf-8'));

// --- video: blob name from the CORRECTED local time in video_index.json ---
// Verified empirically: creation_time(UTC) + 2h == index 'local'; the DJI
// filename stamp is 4h behind creation_time and must NOT be used.
const byStem = new Map();
for (const r of idx) byStem.set(r.file.replace(/\.[^.]+$/, ''), r);

const proxies = readdirSync(`${SRC}/Video_web`).filter((f) => /\.mp4$/i.test(f)).sort();
const video = [];
const unmatched = [];
for (const f of proxies) {
  const stem = f.replace(/\.[^.]+$/, '');
  const rec = byStem.get(stem);
  if (!rec) { unmatched.push(f); continue; }
  const [d, t] = rec.local.split(' ');
  video.push({
    source: `Video_web/${f}`,
    blob: `video/${d}_${t.replace(/:/g, '')}.mp4`,
    bytes: statSync(`${SRC}/Video_web/${f}`).size,
    local: rec.local,
    dur: rec.dur,
    original: rec.file,
  });
}

// --- audio ---
// Two shapes per handover §5:
//   'Chicho :2026-07-31T17:19:15+02:00.m4a' -> audio/2026-07-31_171915.m4a
//   'New Recording 86.m4a'                  -> audio/rec-086.m4a
// The rec-* files have no surviving clock time. transcripts/Workshop/_INDEX.md
// assigns them to days by recording number: 63-84 = Tue 28 Jul, 85-97 = Wed 29
// Jul (both marked INFERRED). Carried into workshop.json so Phase D can order
// them; the blob name keeps the documented convention.
const inferredDay = (n) => (n >= 63 && n <= 84 ? '2026-07-28' : n >= 85 && n <= 97 ? '2026-07-29' : null);

// Toby's call 2026-08-05: 'New Recording 92 copy.m4a' is a true duplicate of
// 'New Recording 92.m4a' (same duration, byte-identical transcript) and is not
// wanted in the archive. Excluded here so it is neither uploaded nor tracked.
// The source file on DEVL is left untouched.
const EXCLUDE = new Set(['New Recording 92 copy.m4a']);

const audio = [];
for (const f of readdirSync(`${SRC}/vocals`).filter((f) => /\.m4a$/i.test(f) && !EXCLUDE.has(f)).sort()) {
  const bytes = statSync(`${SRC}/vocals/${f}`).size;
  const ts = f.match(/(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (ts) {
    audio.push({
      source: `vocals/${f}`,
      blob: `audio/${ts[1]}_${ts[2]}${ts[3]}${ts[4]}.m4a`,
      bytes, local: `${ts[1]} ${ts[2]}:${ts[3]}:${ts[4]}`,
      speaker: f.split(' :')[0], timing: 'exact',
    });
    continue;
  }
  // `New Recording 92 copy.m4a` exists alongside `New Recording 92.m4a` — same
  // duration and a byte-identical transcript, so it is a true duplicate. Both
  // ship (acceptance wants all 79 present); the suffix is slugified into the
  // blob name so neither silently overwrites the other.
  const rn = f.match(/New Recording (\d+)([^.]*)/);
  if (rn) {
    const n = Number(rn[1]);
    const suffix = rn[2].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    audio.push({
      source: `vocals/${f}`,
      blob: `audio/rec-${String(n).padStart(3, '0')}${suffix ? `-${suffix}` : ''}.m4a`,
      bytes, recording: n, day: inferredDay(n), timing: 'inferred',
      ...(suffix ? { duplicateOf: `rec-${String(n).padStart(3, '0')}.m4a` } : {}),
    });
    continue;
  }
  audio.push({ source: `vocals/${f}`, blob: null, bytes, timing: 'UNHANDLED' });
}

// --- collision + integrity checks ---
const problems = [];
if (unmatched.length) problems.push(`${unmatched.length} proxies absent from video_index.json: ${unmatched.join(', ')}`);
const seen = new Map();
for (const it of [...video, ...audio]) {
  if (!it.blob) { problems.push(`no blob name derived for ${it.source}`); continue; }
  if (seen.has(it.blob)) problems.push(`COLLISION ${it.blob}: ${seen.get(it.blob)} vs ${it.source}`);
  seen.set(it.blob, it.source);
}
for (const a of audio) if (a.timing === 'inferred' && !a.day) problems.push(`no inferred day for ${a.source}`);

const gb = (n) => (n / 1e9).toFixed(2);
console.log(`video : ${video.length} files, ${gb(video.reduce((s, x) => s + x.bytes, 0))} GB`);
console.log(`audio : ${audio.length} files, ${(audio.reduce((s, x) => s + x.bytes, 0) / 1e6).toFixed(0)} MB`);
console.log(`        exact-time ${audio.filter((a) => a.timing === 'exact').length}, inferred ${audio.filter((a) => a.timing === 'inferred').length}`);
console.log(`unique blob names: ${seen.size} (expect ${video.length + audio.length})`);
console.log(problems.length ? `\nPROBLEMS:\n  ${problems.join('\n  ')}` : '\nno collisions, no unmatched, every file has a blob name');

console.log('\nsamples:');
for (const v of video.slice(0, 2)) console.log(`  ${v.source}\n    -> ${v.blob}`);
for (const a of [audio.find((x) => x.timing === 'exact'), audio.find((x) => x.timing === 'inferred')]) {
  if (a) console.log(`  ${a.source}\n    -> ${a.blob}${a.day ? `  (inferred day ${a.day})` : ''}`);
}

writeFileSync(`${WORK}/manifest.json`, JSON.stringify({ video, audio }, null, 1));
console.log(`\nmanifest written: ${video.length + audio.length} items`);
