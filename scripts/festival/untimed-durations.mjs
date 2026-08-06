// Precise durations for the untimed recordings, so a date+duration listing off
// the phone can be matched to them MECHANICALLY rather than by guesswork.
//
// Byte size alone does not identify them (collisions below). Duration to
// milliseconds plus recording ORDER should.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { SRC, WORK } from './_env.mjs';

const dur = (path) =>
  Number(execFileSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path,
  ]).toString().trim());

// The untimed set: 'New Recording NN.m4a', no clock time anywhere in the name.
const files = readdirSync(`${SRC}/vocals`)
  .filter((f) => /^New Recording \d+.*\.m4a$/i.test(f))
  .map((f) => ({ file: f, n: Number(f.match(/New Recording (\d+)/)[1]), copy: /copy/i.test(f) }))
  .sort((a, b) => a.n - b.n || (a.copy ? 1 : -1));

// 63-84 = Tue 28 Jul, 85-97 = Wed 29 Jul, per transcripts/Workshop/_INDEX.md.
const day = (n) => (n >= 63 && n <= 84 ? '2026-07-28' : n >= 85 && n <= 97 ? '2026-07-29' : null);

const rows = files.map((f, i) => {
  const p = `${SRC}/vocals/${f.file}`;
  const seconds = dur(p);
  return {
    order: i + 1,
    recording: f.n,
    source: f.file,
    blob: `audio/rec-${String(f.n).padStart(3, '0')}${f.copy ? '-copy' : ''}.m4a`,
    inArchive: !f.copy,           // the copy's audio was removed on Toby's call
    inferredDay: day(f.n),
    seconds: Number(seconds.toFixed(3)),
    hms: new Date(seconds * 1000).toISOString().slice(11, 19),
    bytes: statSync(p).size,
  };
});

// Which discriminators are actually unique? This is the point of the exercise.
const uniq = (key) => {
  const seen = new Map();
  for (const r of rows) seen.set(r[key], (seen.get(r[key]) || 0) + 1);
  return [...seen.entries()].filter(([, c]) => c > 1);
};
const byteDupes = uniq('bytes');
const secDupes = uniq('seconds');
const shipping = rows.filter((r) => r.inArchive);

console.log(`untimed recordings: ${rows.length} (${shipping.length} in the archive + ${rows.length - shipping.length} removed duplicate)\n`);
console.log('ord  rec  day         duration     h:mm:ss     bytes       blob');
for (const r of rows) {
  console.log(
    `${String(r.order).padStart(3)}  ${String(r.recording).padStart(3)}  ${r.inferredDay}  ` +
    `${String(r.seconds).padStart(9)}s  ${r.hms}  ${String(r.bytes).padStart(9)}  ${r.blob}${r.inArchive ? '' : '  (removed)'}`
  );
}

console.log(`\ndiscriminator check across all ${rows.length}:`);
console.log(`  bytes    — ${byteDupes.length ? `NOT unique: ${byteDupes.map(([v, c]) => `${v}×${c}`).join(', ')}` : 'unique'}`);
console.log(`  duration — ${secDupes.length ? `NOT unique: ${secDupes.map(([v, c]) => `${v}s ×${c}`).join(', ')}` : 'unique to the millisecond'}`);
console.log(`  duration + order — always unique (order is total)`);

writeFileSync(`${WORK}/untimed-durations.json`, JSON.stringify({ rows, byteDupes, secDupes }, null, 1));
console.log(`\nwritten: ${WORK}/untimed-durations.json`);
