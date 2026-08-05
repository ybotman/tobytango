// Record data/access.json state so "untouched by my run" is provable, not asserted.
import { readFileSync } from 'node:fs';

import { WORK, containerClient, NEVER_WRITE } from './_env.mjs';
import { writeFileSync } from 'node:fs';

const cc = containerClient();

try {
  const p = await cc.getBlockBlobClient(NEVER_WRITE).getProperties();
  const rec = { exists: true, etag: p.etag, lastModified: p.lastModified, bytes: p.contentLength };
  writeFileSync(`${WORK}/access-before.json`, JSON.stringify(rec));
  console.log(`baseline recorded: ${JSON.stringify(rec)}`);
} catch (e) {
  const rec = { exists: false, status: e.statusCode };
  writeFileSync(`${WORK}/access-before.json`, JSON.stringify(rec));
  console.log(`baseline recorded: ${JSON.stringify(rec)}`);
}
