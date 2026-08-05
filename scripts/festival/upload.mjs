// Phase C — upload media to the festival container using the scoped SP.
// Idempotent: a blob already present with the same byte size is skipped, so an
// interrupted run resumes instead of re-sending 4 GB.
// NEVER touches data/access.json — Charlotte is exercising the live allowlist.
import { readFileSync, readdirSync, statSync } from 'node:fs';



import { SRC, WORK, containerClient, NEVER_WRITE, slug } from './_env.mjs';

const cc = containerClient();

const TYPES = {
  '.mp4': 'video/mp4', '.m4a': 'audio/mp4', '.srt': 'application/x-subrip',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json',
};
const typeOf = (n) => TYPES[n.slice(n.lastIndexOf('.')).toLowerCase()] || 'application/octet-stream';

const { video, audio } = JSON.parse(readFileSync(`${WORK}/manifest.json`, 'utf-8'));

// transcripts: slugified, flat, alongside the audio they belong to
const transcripts = [];
for (const f of readdirSync(`${SRC}/transcripts`)) {
  if (!/\.(srt|txt)$/i.test(f)) continue;
  transcripts.push({ source: `transcripts/${f}`, blob: `transcripts/${slug(f)}`, bytes: statSync(`${SRC}/transcripts/${f}`).size });
}
const walk = (dir, pre) => readdirSync(`${SRC}/${dir}`, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(`${dir}/${e.name}`, `${pre}${slug(e.name)}/`)
    : /\.md$/i.test(e.name) ? [{ source: `${dir}/${e.name}`, blob: `transcripts/workshop/${pre}${slug(e.name)}`, bytes: statSync(`${SRC}/${dir}/${e.name}`).size }] : []);
const workshopDocs = walk('transcripts/Workshop', '');

const items = [...video, ...audio, ...transcripts, ...workshopDocs];
if (items.some((i) => i.blob === NEVER_WRITE)) throw new Error('refusing to touch data/access.json');

const total = items.reduce((s, i) => s + i.bytes, 0);
console.log(`${items.length} items, ${(total / 1e9).toFixed(2)} GB total`);
console.log(`  video ${video.length} · audio ${audio.length} · transcripts ${transcripts.length} · workshop docs ${workshopDocs.length}\n`);

let done = 0, sent = 0, skipped = 0, failed = [];
const started = process.hrtime.bigint();

async function put(item) {
  const bc = cc.getBlockBlobClient(item.blob);
  try {
    const p = await bc.getProperties();
    if (p.contentLength === item.bytes) { skipped++; done++; return; }
  } catch { /* absent -> upload */ }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await bc.uploadFile(`${SRC}/${item.source}`, {
        blockSize: 8 * 1024 * 1024,
        concurrency: 4,
        blobHTTPHeaders: { blobContentType: typeOf(item.blob), blobCacheControl: 'private, max-age=3600' },
      });
      sent++; done++;
      return;
    } catch (e) {
      if (attempt === 3) { failed.push(`${item.source}: ${e.message.split('\n')[0]}`); done++; return; }
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

// modest parallelism: big files already parallelise internally
const QUEUE = [...items].sort((a, b) => b.bytes - a.bytes);
const tick = setInterval(() => {
  const el = Number(process.hrtime.bigint() - started) / 1e9;
  console.log(`  ${done}/${items.length}  sent ${sent} skipped ${skipped} failed ${failed.length}  ${el.toFixed(0)}s`);
}, 20000);

await Promise.all(Array.from({ length: 4 }, async () => {
  while (QUEUE.length) await put(QUEUE.shift());
}));
clearInterval(tick);

const el = Number(process.hrtime.bigint() - started) / 1e9;
console.log(`\nuploaded ${sent}, skipped ${skipped} (already present), failed ${failed.length}, in ${el.toFixed(0)}s`);
if (failed.length) { console.log('FAILURES:\n  ' + failed.join('\n  ')); process.exitCode = 1; }
