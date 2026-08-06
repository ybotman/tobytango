// E0 — upload the rescued curation + a preservation copy of its only source.
//
// Both go under data/, which is deliberately NOT signable by the media route —
// this is archive data, not media, and site/index.html contains every transcript.
import { readFileSync } from 'node:fs';
import { WORK, SRC, containerClient, NEVER_WRITE } from './_env.mjs';

const cc = containerClient();

const items = [
  { blob: 'data/annotations.json', path: `${WORK}/annotations.json`, type: 'application/json' },
  { blob: 'data/site-index.html', path: `${SRC}/site/index.html`, type: 'text/html; charset=utf-8' },
];

for (const it of items) {
  if (it.blob === NEVER_WRITE) throw new Error('refusing');
  const body = readFileSync(it.path);
  await cc.getBlockBlobClient(it.blob).uploadData(body, {
    blobHTTPHeaders: { blobContentType: it.type, blobCacheControl: 'private, max-age=300' },
  });
  console.log(`  uploaded ${it.blob.padEnd(26)} ${(body.length / 1024).toFixed(1)} KB`);
}
