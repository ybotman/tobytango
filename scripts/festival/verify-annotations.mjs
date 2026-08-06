// E0 acceptance — verify the curation in the CONTAINER against the HTML source.
// Downloads what actually landed; does not trust the local copy.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SRC, WORK, containerClient, NEVER_WRITE } from './_env.mjs';

const cc = containerClient();
const read = async (name) => {
  const r = await cc.getBlobClient(name).download(0);
  const c = []; for await (const x of r.readableStreamBody) c.push(x);
  return Buffer.concat(c);
};

// --- what is in the container ---
const buf = await read('data/annotations.json');
const ann = JSON.parse(buf.toString());
console.log(`data/annotations.json in container: ${(buf.length / 1024).toFixed(1)} KB`);
console.log(`  recordings ${ann.counts.recordings}  segments ${ann.counts.segments}  keep ${ann.counts.keep}  dropped ${ann.counts.dropped}`);

// --- recount from the payload itself, not the stored counts ---
let segs = 0, keep = 0;
for (const r of ann.recordings) { segs += r.segments.length; keep += r.segments.filter((g) => g.s).length; }
const selfConsistent = segs === ann.counts.segments && keep === ann.counts.keep;
console.log(`  recounted from payload: segments ${segs}, keep ${keep} — header agrees: ${selfConsistent}`);

// --- against the ORIGINAL html ---
const raw = readFileSync(`${SRC}/site/index.html`, 'utf-8');
const src = JSON.parse(raw.match(/<script id="data"[^>]*>([\s\S]*?)<\/script>/)[1]);
const srcClips = {};
for (const d of src.days) for (const s of d.sessions) for (const c of s.clips) srcClips[c.id] = c;

let sTot = 0, sKeep = 0;
for (const c of Object.values(srcClips)) { sTot += c.segs.length; sKeep += c.segs.filter((g) => g.s === true).length; }
console.log(`\nsource html: recordings ${Object.keys(srcClips).length}  segments ${sTot}  keep ${sKeep}  dropped ${sTot - sKeep}`);
const countsMatch = sTot === segs && sKeep === keep && Object.keys(srcClips).length === ann.recordings.length;
console.log(`counts match source EXACTLY: ${countsMatch}`);

// --- spot-check: every cue+flag of 3 recordings, one per day-type ---
const picks = [
  ann.recordings.find((r) => r.date === '2026-07-28'),              // inferred day
  ann.recordings.find((r) => r.date === '2026-07-31'),              // exact-time day
  ann.recordings.slice().sort((a, b) => b.segments.length - a.segments.length)[0], // largest
].filter(Boolean);

console.log('\nspot-check — per-cue flags vs the HTML:');
let allOk = true;
for (const r of picks) {
  const c = srcClips[r.id];
  const mismatches = [];
  if (!c) { console.log(`  FAIL ${r.id}: not in source`); allOk = false; continue; }
  if (c.segs.length !== r.segments.length) mismatches.push(`length ${c.segs.length} vs ${r.segments.length}`);
  for (let i = 0; i < Math.min(c.segs.length, r.segments.length); i++) {
    const a = c.segs[i], b = r.segments[i];
    if ((a.s === true) !== b.s) mismatches.push(`seg ${i}: s ${a.s} vs ${b.s}`);
    if (a.t !== b.t) mismatches.push(`seg ${i}: t ${a.t} vs ${b.t}`);
    if (a.x !== b.x) mismatches.push(`seg ${i}: text differs`);
  }
  const ok = mismatches.length === 0;
  allOk = allOk && ok;
  console.log(`  ${ok ? 'PASS' : 'FAIL'} ${r.id.padEnd(26)} ${r.segments.length} segs, ${r.segments.filter((g) => g.s).length} keep, day ${r.date}`);
  if (!ok) console.log(`       ${mismatches.slice(0, 4).join('; ')}`);
}

// --- the preservation copy is byte-identical ---
const pres = await read('data/site-index.html');
const srcSha = createHash('sha256').update(readFileSync(`${SRC}/site/index.html`)).digest('hex');
const blobSha = createHash('sha256').update(pres).digest('hex');
console.log(`\npreservation copy data/site-index.html: ${pres.length} bytes`);
console.log(`  sha256 matches the file on DEVL: ${srcSha === blobSha}`);
console.log(`  recorded provenance sha256 agrees: ${ann.provenance.sourceSha256 === srcSha}`);

// --- access.json untouched ---
const p = await cc.getBlockBlobClient(NEVER_WRITE).getProperties();
let before = null;
try { before = JSON.parse(readFileSync(`${WORK}/access-before.json`, 'utf-8')); } catch {}
console.log(`\n${NEVER_WRITE}: ${p.etag} @ ${p.lastModified.toISOString()} (${p.contentLength} bytes)`);
if (before) console.log(`  ${p.etag === before.etag ? 'UNCHANGED since baseline — this run did not touch it' : `CHANGED from ${before.etag} — inspect contents before concluding`}`);

if (!(countsMatch && selfConsistent && allOk && srcSha === blobSha)) process.exitCode = 1;
