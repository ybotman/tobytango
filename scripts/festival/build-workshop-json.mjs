// Build data/workshop.json (mapping + subjects) and data/video-index.json.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { SRC, WORK, slug } from './_env.mjs';


const { video, audio } = JSON.parse(readFileSync(`${WORK}/manifest.json`, 'utf-8'));
const idxRaw = JSON.parse(readFileSync(`${SRC}/Video/video_index.json`, 'utf-8'));
const indexMd = readFileSync(`${SRC}/transcripts/Workshop/_INDEX.md`, 'utf-8');

// --- parse the curated index: day sections, then per-item subjects ---
const days = [];
const subjectByTime = new Map();   // "HH:MM:SS" -> {subject, date, session}
const subjectByRec = new Map();    // recording number -> {subject, date}

let cur = null;
for (const line of indexMd.split('\n')) {
  const h = line.match(/^## \[([^\]]+)\]\((\d{4}-\d{2}-\d{2})[^/]*\/([^)]+)\)/);
  if (h) {
    const date = h[2];
    let day = days.find((d) => d.date === date);
    if (!day) { day = { date, label: h[1].split(' — ')[0].replace(/\s*\(.*/, '').trim(), inferred: /INFERRED/.test(h[1]), sessions: [] }; days.push(day); }
    const sess = { title: h[1], source: h[3], items: [] };
    day.sessions.push(sess);
    cur = { date, sess };
    continue;
  }
  const t = line.match(/^- `(\d{2}:\d{2}:\d{2})` — (.+)$/);
  if (t && cur) {
    const subject = t[2].replace(/\s*`\[STUDENTS\]`\s*$/, '').trim();
    const students = /\[STUDENTS\]/.test(t[2]);
    subjectByTime.set(`${cur.date} ${t[1]}`, { subject, students });
    cur.sess.items.push({ time: t[1], subject, students });
    continue;
  }
  const r = line.match(/^- `Recording (\d+)` — (.+)$/);
  if (r && cur) {
    const n = Number(r[1]);
    const subject = r[2].replace(/\s*`\[STUDENTS\]`\s*$/, '').trim();
    const students = /\[STUDENTS\]/.test(r[2]);
    if (!subjectByRec.has(n)) subjectByRec.set(n, { subject, students, date: cur.date });
    // _INDEX.md lists `Recording 92` twice (the artefact of the duplicate source
    // file). Dedupe so Phase D does not render a ghost entry.
    if (!cur.sess.items.some((i) => i.recording === n)) {
      cur.sess.items.push({ recording: n, subject, students });
    }
  }
}

// 2026-07-27 is documented as NO-AUDIO and has no section in _INDEX.md.
if (!days.some((d) => d.date === '2026-07-27')) {
  days.unshift({ date: '2026-07-27', label: 'Mon 27 Jul', inferred: false, note: 'No audio survives for this day; video only.', sessions: [] });
}
days.sort((a, b) => a.date.localeCompare(b.date));

// --- transcript blob names, matched to each audio file ---
const transcriptFor = (sourceName) => {
  const stem = sourceName.replace(/^vocals\//, '').replace(/\.m4a$/i, '');
  const out = {};
  for (const ext of ['srt', 'txt']) {
    if (existsSync(`${SRC}/transcripts/${stem}.${ext}`)) out[ext] = `transcripts/${slug(`${stem}.${ext}`)}`;
  }
  return Object.keys(out).length ? out : null;
};

const audioOut = audio.map((a) => {
  const rec = a.recording != null ? subjectByRec.get(a.recording) : null;
  const byTime = a.local ? subjectByTime.get(a.local) : null;
  return {
    blob: a.blob,
    source: a.source,
    bytes: a.bytes,
    timing: a.timing,                       // 'exact' | 'inferred'
    ...(a.local ? { local: a.local } : {}),
    ...(a.speaker ? { speaker: a.speaker } : {}),
    ...(a.recording != null ? { recording: a.recording } : {}),
    date: a.local ? a.local.slice(0, 10) : a.day || rec?.date || null,
    ...(byTime?.subject || rec?.subject ? { subject: byTime?.subject || rec.subject } : {}),
    ...(byTime?.students || rec?.students ? { students: true } : {}),
    ...(a.duplicateOf ? { duplicateOf: a.duplicateOf } : {}),
    transcript: transcriptFor(a.source),
  };
}).sort((a, b) => (a.date || '').localeCompare(b.date || '') || (a.local || '').localeCompare(b.local || '') || (a.recording ?? 0) - (b.recording ?? 0));

const videoOut = video.map((v) => ({
  blob: v.blob, source: v.source, bytes: v.bytes, local: v.local,
  date: v.local.slice(0, 10), dur: v.dur, original: v.original,
})).sort((a, b) => a.local.localeCompare(b.local));

const workshop = {
  festival: {
    key: 'chicho2026',
    title: 'Chicho Frumboli & Juana Sepúlveda — workshop',
    dates: { from: '2026-07-27', to: '2026-08-01' },
    container: 'festival-chicho-202606',
    note: 'Six days. Audio is the primary record; the DJI video is a separate visual reference.',
    schedule: 'Sessions ran roughly 17:20–19:00, break, 19:25–21:15.',
  },
  provenance: {
    videoTime:
      'Video blob names use CORRECTED local wall-clock, not the DJI filename stamp. ' +
      'The camera clock is 4h behind; local = mp4 creation_time (UTC) + 2h. Verified ' +
      'on DJI_20260727131939_0004_D: creation_time 2026-07-27T17:19:40Z -> local 19:19:40, ' +
      'filename stamp 13:19:39. Times come from Video/video_index.json.',
    audioTime:
      'Timestamped filenames carry exact local time (+02:00). The 36 "New Recording NN" ' +
      'files have NO surviving clock time — their metadata timestamp is the 2026-08-03 copy ' +
      'time, not the recording time. Day assigned by recording number per ' +
      'transcripts/Workshop/_INDEX.md (63-84 = Tue 28 Jul, 85-97 = Wed 29 Jul), both marked ' +
      'INFERRED. These carry timing:"inferred" and have no clock time.',
    masters: 'HEVC originals (~70 GB) stay on /Volumes/DEVL and are deliberately NOT uploaded; the 720p H.264 proxies are what plays in browsers.',
  },
  counts: {
    video: videoOut.length,
    audio: audioOut.length,
    audioExactTime: audioOut.filter((a) => a.timing === 'exact').length,
    audioInferredTime: audioOut.filter((a) => a.timing === 'inferred').length,
  },
  days,
  audio: audioOut,
  video: videoOut,
};

writeFileSync(`${WORK}/workshop.json`, JSON.stringify(workshop, null, 1));
writeFileSync(`${WORK}/video-index.json`, JSON.stringify(idxRaw, null, 1));

console.log(`workshop.json  : ${audioOut.length} audio + ${videoOut.length} video, ${days.length} days`);
console.log(`  subjects matched: audio ${audioOut.filter((a) => a.subject).length}/${audioOut.length}`);
console.log(`  transcripts linked: ${audioOut.filter((a) => a.transcript).length}/${audioOut.length}`);
console.log(`  days: ${days.map((d) => `${d.date}${d.inferred ? '*' : ''}(${d.sessions.length}s)`).join(' ')}`);
console.log(`video-index.json: ${idxRaw.length} records (verbatim copy)`);
