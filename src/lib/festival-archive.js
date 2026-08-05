import { readJsonFromBlob, readTextFromBlob } from '@/lib/azure-json-storage';
import { FESTIVAL_CONTAINER } from '@/lib/festival-access';

/**
 * Read model for the festival archive: turns data/workshop.json into what a
 * day page needs, and parses the SRT transcripts.
 *
 * Three things in this data will silently produce a plausible-looking WRONG
 * page if handled naively, so they are handled explicitly here rather than in
 * the components:
 *
 *  1. `timing: 'exact' | 'inferred'`. 35 of 78 recordings have no surviving
 *     clock time -- their file metadata is the copy time. Their day came from
 *     an index by recording NUMBER. Never render an inferred day as a precise
 *     time; callers get `timing` and must show it as inferred.
 *  2. Missing subject is not an empty subject. 13 recordings are raw
 *     counting/drill segments the index does not annotate. `subject` is null
 *     for those, never ''.
 *  3. Times are already CORRECTED local wall-clock (the DJI camera clock was
 *     4h out). Never re-derive a time from a filename -- read it from here.
 *
 * A fourth, found while building and not in the brief: a transcript existing
 * is not a transcript being usable. See assessTranscript().
 */

const WORKSHOP_BLOB = 'data/workshop.json';
const FESTIVAL_ACCOUNT = 'festival';

// workshop.json is ~73 KB and immutable in practice. Cache it in module memory
// so a day view is one blob read, not one per request. This is NOT a SAS and
// carries no per-user state, so caching it leaks nothing -- the page above it
// still re-checks hasAccess() on every request.
let cache = null;
let cachedAt = 0;
const TTL_MS = 5 * 60 * 1000;

export async function loadWorkshop() {
  if (cache && Date.now() - cachedAt < TTL_MS) return cache;
  const data = await readJsonFromBlob(WORKSHOP_BLOB, {
    account: FESTIVAL_ACCOUNT,
    container: FESTIVAL_CONTAINER,
    fallback: null,
  });
  if (!data) throw new Error('workshop.json not found in the festival container');
  cache = data;
  cachedAt = Date.now();
  return data;
}

/** Index the human-written session notes so a recording can find its subject. */
function buildSubjectIndex(workshop) {
  const byRecording = new Map();
  const byDateTime = new Map();
  for (const day of workshop.days || []) {
    for (const session of day.sessions || []) {
      for (const item of session.items || []) {
        const entry = { ...item, sessionTitle: session.title };
        if (item.recording !== undefined) byRecording.set(item.recording, entry);
        if (item.time) byDateTime.set(`${day.date} ${item.time}`, entry);
      }
    }
  }
  return { byRecording, byDateTime };
}

function subjectFor(rec, index) {
  const entry =
    rec.timing === 'inferred'
      ? index.byRecording.get(rec.recording)
      : index.byDateTime.get(`${rec.date} ${(rec.local || '').slice(11)}`);
  return {
    // null, never '' -- "we have no note for this" is not "this had no content".
    subject: entry?.subject || null,
    students: entry?.students ?? null,
    sessionTitle: entry?.sessionTitle || null,
  };
}

const clockOf = (rec) => (rec.timing === 'exact' && rec.local ? rec.local.slice(11, 16) : null);

/** Day summaries for the archive index. */
export async function getDays() {
  const w = await loadWorkshop();
  return (w.days || []).map((day) => {
    const audio = (w.audio || []).filter((a) => a.date === day.date);
    const video = (w.video || []).filter((v) => v.date === day.date);
    return {
      date: day.date,
      label: day.label,
      inferred: Boolean(day.inferred),
      note: day.note || null,
      audioCount: audio.length,
      videoCount: video.length,
      // A day is only as precise as its least precise recording.
      anyExactTime: audio.some((a) => a.timing === 'exact'),
    };
  });
}

export async function getFestivalMeta() {
  const w = await loadWorkshop();
  return { ...(w.festival || {}), counts: w.counts || {}, provenance: w.provenance || {} };
}

/** Everything one day's page needs. Returns null for an unknown date. */
export async function getDay(date) {
  const w = await loadWorkshop();
  const day = (w.days || []).find((d) => d.date === date);
  if (!day) return null;
  const index = buildSubjectIndex(w);

  const recordings = (w.audio || [])
    .filter((a) => a.date === date)
    .map((rec) => ({
      id: rec.blob,
      blob: rec.blob,
      timing: rec.timing,
      clock: clockOf(rec),
      recordingNumber: rec.recording ?? null,
      speaker: rec.speaker || null,
      bytes: rec.bytes,
      transcriptBlob: rec.transcript?.srt || null,
      ...subjectFor(rec, index),
    }))
    .sort((a, b) => {
      if (a.clock && b.clock) return a.clock.localeCompare(b.clock);
      if (a.recordingNumber != null && b.recordingNumber != null)
        return a.recordingNumber - b.recordingNumber;
      return a.blob.localeCompare(b.blob);
    });

  const videos = (w.video || [])
    .filter((v) => v.date === date)
    .map((v) => ({
      id: v.blob,
      blob: v.blob,
      clock: v.local ? v.local.slice(11, 16) : null,
      minutes: typeof v.dur === 'number' ? v.dur : null,
      bytes: v.bytes,
    }))
    .sort((a, b) => (a.clock || '').localeCompare(b.clock || ''));

  return {
    date: day.date,
    label: day.label,
    inferred: Boolean(day.inferred),
    note: day.note || null,
    sessions: (day.sessions || []).map((s) => ({ title: s.title })),
    recordings,
    videos,
  };
}

/* ------------------------------------------------------------------ */
/* Transcripts                                                         */
/* ------------------------------------------------------------------ */

const toSeconds = (stamp) => {
  const m = String(stamp).match(/(\d+):(\d+):(\d+)[,.](\d+)/);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000 : 0;
};

export function parseSrt(text) {
  const cues = [];
  for (const block of String(text).replace(/\r/g, '').split(/\n\n+/)) {
    const lines = block.split('\n').filter((l) => l.length);
    const timeLine = lines.find((l) => l.includes('-->'));
    if (!timeLine) continue;
    const [from, to] = timeLine.split('-->');
    const body = lines.slice(lines.indexOf(timeLine) + 1).join(' ').trim();
    cues.push({ start: toSeconds(from), end: toSeconds(to), text: body });
  }
  return cues;
}

/**
 * Is this single cue an ASR loop?
 *
 * Whisper fills near-silence by repeating one phrase until the cue is full.
 * Detected two ways: a short phrase tiling most of the cue, or so few distinct
 * words that it cannot be real speech. Loops are marked, not deleted -- the
 * reader decides, and a marked line still carries a real timestamp.
 */
function isLoop(text) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 10) return false;
  for (let n = 1; n <= 6; n++) {
    const phrase = words.slice(0, n).join(' ').toLowerCase();
    let i = 0;
    let hits = 0;
    while (i + n <= words.length && words.slice(i, i + n).join(' ').toLowerCase() === phrase) {
      hits++;
      i += n;
    }
    if ((hits * n) / words.length > 0.8) return true;
  }
  const distinct = new Set(words.map((x) => x.toLowerCase()));
  return distinct.size / words.length < 0.12;
}

/**
 * Judge a transcript before showing it.
 *
 * 15 of the 78 cannot be rendered as a transcript at all: no text, or every cue
 * on one identical timestamp so nothing can be synced, or a few characters of
 * noise. Showing those as a transcript produces a page that looks broken --
 * dozens of blank lines that all seek to the same instant. The audio is still
 * perfectly good, so the honest answer is to say there is no usable transcript
 * and still let people listen.
 */
export function assessTranscript(cues) {
  const withText = cues.filter((c) => c.text.length);
  const distinctSpans = new Set(cues.map((c) => `${c.start}|${c.end}`)).size;
  const loops = withText.filter((c) => isLoop(c.text));
  const loopChars = loops.reduce((n, c) => n + c.text.length, 0);
  const allChars = withText.reduce((n, c) => n + c.text.length, 0);
  const cleanChars = allChars - loopChars;

  let reason = null;
  if (!cues.length) reason = 'the transcript file is empty';
  else if (!withText.length) reason = 'the transcriber returned no words for this recording';
  else if (distinctSpans <= 1) reason = 'every line carries the same timestamp, so nothing can be synced to the audio';
  else if (cleanChars < 200) reason = 'the transcriber returned almost nothing usable for this recording';

  return {
    usable: reason === null,
    reason,
    lineCount: withText.length,
    loopCount: loops.length,
    // Share of the text that is looping, for a heads-up when it is substantial.
    loopShare: allChars ? Math.round((loopChars / allChars) * 100) : 0,
  };
}

/** Fetch + parse + judge one transcript. Server-side only. */
export async function getTranscript(blobName) {
  // Franklin's readTextFromBlob, not a private copy: it shares the account
  // resolution and the fail-closed semantics with the JSON path, so a read
  // failure can never quietly present as an empty transcript.
  const text = await readTextFromBlob(blobName, {
    account: FESTIVAL_ACCOUNT,
    container: FESTIVAL_CONTAINER,
    fallback: null,
  });
  if (text === null) {
    return { usable: false, reason: 'the transcript file is missing', lineCount: 0, loopCount: 0, loopShare: 0, lines: [] };
  }
  const cues = parseSrt(text);
  const assessment = assessTranscript(cues);
  // Sort by start time before numbering. The transcriber occasionally emits a
  // cue slightly out of order (one 0.5 s inversion in a 327-line transcript was
  // found on 30 July). Clicking a line is unaffected either way, but the
  // follow-along highlight scans forward and stops at the first line ahead of
  // the playhead, so a single inversion would freeze the highlight early.
  const lines = cues
    .filter((c) => c.text.length)
    .sort((a, b) => a.start - b.start)
    .map((c, i) => ({ i, t: c.start, text: c.text, loop: isLoop(c.text) }));
  return { ...assessment, lines: assessment.usable ? lines : [] };
}
