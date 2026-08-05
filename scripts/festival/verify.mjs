// Phase C acceptance — report what is OBSERVED in the container, not what was intended.
import { readFileSync, statSync, openSync, readSync, closeSync } from 'node:fs';


import { SRC, WORK, containerClient, loadEnv, NEVER_WRITE } from './_env.mjs';

loadEnv();
const acct = process.env.AZURE_FESTIVAL_ACCOUNT_NAME;
const cont = process.env.AZURE_FESTIVAL_CONTAINER;
const cc = containerClient();

// --- 1. observed inventory ---
const groups = {};
let total = 0;
const present = new Map();
for await (const b of cc.listBlobsFlat()) {
  const pre = b.name.split('/')[0];
  groups[pre] = groups[pre] || { n: 0, bytes: 0 };
  groups[pre].n++; groups[pre].bytes += b.properties.contentLength;
  total += b.properties.contentLength;
  present.set(b.name, { bytes: b.properties.contentLength, type: b.properties.contentType });
}
console.log(`OBSERVED in ${acct}/${cont}:`);
for (const [k, v] of Object.entries(groups).sort()) {
  console.log(`  ${(k + '/').padEnd(14)} ${String(v.n).padStart(4)} blobs  ${(v.bytes / 1e9).toFixed(3)} GB`);
}
console.log(`  ${'TOTAL'.padEnd(14)} ${String(present.size).padStart(4)} blobs  ${(total / 1e9).toFixed(3)} GB`);

// --- 2. every manifest item actually present, at the right size ---
const { video, audio } = JSON.parse(readFileSync(`${WORK}/manifest.json`, 'utf-8'));
const missing = [], wrongSize = [], wrongType = [];
for (const it of [...video, ...audio]) {
  const got = present.get(it.blob);
  if (!got) { missing.push(it.blob); continue; }
  if (got.bytes !== it.bytes) wrongSize.push(`${it.blob}: ${got.bytes} != ${it.bytes}`);
  const want = it.blob.endsWith('.mp4') ? 'video/mp4' : 'audio/mp4';
  if (got.type !== want) wrongType.push(`${it.blob}: ${got.type} != ${want}`);
}
console.log(`\nmedia integrity: ${video.length} video + ${audio.length} audio expected`);
console.log(`  missing   : ${missing.length}${missing.length ? ' -> ' + missing.slice(0, 5).join(', ') : ''}`);
console.log(`  wrong size: ${wrongSize.length}${wrongSize.length ? ' -> ' + wrongSize.slice(0, 5).join(', ') : ''}`);
console.log(`  wrong type: ${wrongType.length}${wrongType.length ? ' -> ' + wrongType.slice(0, 5).join(', ') : ''}`);

// --- 3. SEEK: Range request mid-file, bytes compared against the source ---
console.log('\nseek / Range spot-check (mid-file, bytes verified against source):');
const picks = [video[0], video[Math.floor(video.length / 2)], audio.find((a) => a.timing === 'exact'), audio.find((a) => a.timing === 'inferred'), audio.slice().sort((x, y) => y.bytes - x.bytes)[0]];
for (const it of picks) {
  const bc = cc.getBlobClient(it.blob);
  const start = Math.floor(it.bytes / 2);      // seek to the middle
  // clamp: some recordings are only ~100 KB, so a fixed window runs past EOF
  const len = Math.min(65536, it.bytes - start);
  const r = await bc.download(start, len);
  const chunks = []; for await (const c of r.readableStreamBody) chunks.push(c);
  const got = Buffer.concat(chunks);

  const fd = openSync(`${SRC}/${it.source}`, 'r');
  const want = Buffer.alloc(len);
  const n = readSync(fd, want, 0, len, start); closeSync(fd);

  const okBytes = n === len && got.equals(want);
  const cr = r.contentRange || '';
  const ok = okBytes && got.length === len && /^bytes /.test(cr);
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${it.blob}`);
  console.log(`        Content-Range: ${cr}  Accept-Ranges: ${r.acceptRanges || '(none)'}  type: ${r.contentType}`);
  console.log(`        bytes ${start}-${start + len - 1} match source: ${okBytes}`);
  if (!ok) process.exitCode = 1;
}

// --- 4. the allowlist was not collateral damage ---
// Snapshot with `node scripts/festival/snapshot-access.mjs` BEFORE uploading.
// NOTE: a changed etag does not by itself mean this pipeline wrote it — the
// admin UI writes the same blob, legitimately, while an upload is running. The
// question is whether WE wrote it, so report the users too and let a human read
// it. This pipeline never writes user records at all.
const p = await cc.getBlockBlobClient(NEVER_WRITE).getProperties();
let before = null;
try { before = JSON.parse(readFileSync(`${WORK}/access-before.json`, 'utf-8')); } catch { /* no baseline */ }

console.log(`\n${NEVER_WRITE}:`);
console.log(`  now    ${p.etag} @ ${p.lastModified?.toISOString?.() || p.lastModified} (${p.contentLength} bytes)`);
if (!before) {
  console.log('  no baseline recorded — run snapshot-access.mjs before the next upload');
} else if (p.etag === before.etag) {
  console.log(`  UNCHANGED since baseline — this run did not touch it`);
} else {
  console.log(`  CHANGED since baseline (${before.etag} @ ${before.lastModified})`);
  console.log('  -> expected if the admin UI was used during the run; this pipeline');
  console.log('     never writes user records. Inspect the contents before concluding.');
}
