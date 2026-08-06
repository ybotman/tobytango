'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Chip, CircularProgress,
  Divider, Paper, Stack, Typography, Button, TextField, IconButton, Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanel from './AdminPanel';

/**
 * A day of the archive: recordings, each opening into a transcript whose lines
 * play that exact moment of the audio.
 *
 * Rules this component exists to keep:
 *  - A SAS URL is never rendered into the page or held in a cached response. It
 *    is fetched at play time and kept only in component state for its lifetime.
 *  - An inferred recording never shows a clock time. It shows its number and
 *    says the time was not recorded.
 *  - A missing subject is never rendered as an empty one.
 *  - A transcript that cannot be synced is not shown as a transcript. The audio
 *    still plays -- the recording is fine, only the transcription failed.
 */

const fmt = (s) => {
  const t = Math.max(0, Math.floor(s));
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};

/**
 * Toby's notes on a recording. Read-only for everyone but him (plan §E4): the
 * gate is a courtesy gate and does not prove an address belongs to whoever
 * typed it, so words are never published under an attendee's name.
 */
function CommentBlock({ rec, comments, isAdmin, draft, setDraft, busy, error, onSave, onRemove, onSeek }) {
  if (!comments.length && !isAdmin) return null;
  return (
    <Box sx={{ mt: 2 }}>
      {comments.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>Toby&apos;s notes</Typography>
          <Stack spacing={1} sx={{ mb: 1 }}>
            {comments.map((c) => (
              <Paper key={c.id} variant="outlined" sx={{ p: 1.25 }}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  {c.t != null && (
                    <Button size="small" onClick={() => onSeek(c.t)}
                      sx={{ minWidth: 0, fontFamily: 'monospace' }}>
                      {fmt(c.t)}
                    </Button>
                  )}
                  <Typography variant="body2" sx={{ flex: 1, whiteSpace: 'pre-wrap' }}>
                    {c.text}
                  </Typography>
                  {isAdmin && (
                    <Tooltip title="Delete note">
                      <IconButton size="small" onClick={() => onRemove(c.id)} disabled={busy}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
        </>
      )}

      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

      {isAdmin && draft && (
        <Paper variant="outlined" sx={{ p: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            {draft.t != null
              ? `Anchored to ${fmt(draft.t)} — search will land on this moment.`
              : 'Anchored to the whole recording.'}
          </Typography>
          <TextField fullWidth multiline minRows={2} size="small" sx={{ mt: 1 }}
            placeholder="Your note…" value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })} />
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button size="small" variant="contained" disabled={busy || !draft.text.trim()}
              onClick={() => onSave(draft.text, draft.t, draft.cue)}>
              Save note
            </Button>
            <Button size="small" onClick={() => setDraft(undefined)}>Cancel</Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default function DayArchive({
  festivalKey, day, isAdmin = false, adminAvailable = false,
  initialComments = [], commentsError = null,
}) {
  const [openId, setOpenId] = useState(null);
  const [transcripts, setTranscripts] = useState({});
  const [mediaUrls, setMediaUrls] = useState({});
  const [mediaError, setMediaError] = useState({});
  const [activeLine, setActiveLine] = useState(-1);
  const [openVideo, setOpenVideo] = useState(null);
  const audioRef = useRef(null);

  // Curation view (admin only -- attendees are never sent the hidden lines).
  const [showChatter, setShowChatter] = useState(false);
  const [showDropped, setShowDropped] = useState(false);
  const onToggle = (which, value) =>
    (which === 'chatter' ? setShowChatter : setShowDropped)(value);

  const [comments, setComments] = useState(initialComments);
  const [commentDraft, setCommentDraft] = useState({});
  const [commentBusy, setCommentBusy] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const visibleLines = useCallback((lines) => {
    if (!isAdmin) return lines; // the server already sent only the kept lines
    return lines.filter((l) => {
      const cls = l.cls || 'keep';
      if (cls === 'chatter') return showChatter;
      if (cls === 'dropped') return showDropped;
      return true;
    });
  }, [isAdmin, showChatter, showDropped]);

  /* ---- media: minted on demand, never rendered into the page ----
     Contract is Franklin's B4 route: { festival, blobs: [...] } ->
     { urls: { blob: url }, expiresOn, ttlSeconds }. A SAS is a public URL for
     its lifetime, so it lives only in component state and is re-minted rather
     than persisted. */
  const mintUrl = useCallback(async (blob, { force = false } = {}) => {
    // `force` matters: React state updates are async, so on a retry the cache
    // read below would still see the URL we just dropped.
    const cached = force ? null : mediaUrls[blob];
    if (cached && cached.expiresAt > Date.now() + 5000) return cached.url;

    const res = await fetch('/api/festival/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ festival: festivalKey, blobs: [blob] }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Could not open the media (HTTP ${res.status})`);

    const url = data.urls?.[blob];
    if (!url) throw new Error('The media link came back empty.');
    const expiresAt = data.expiresOn
      ? new Date(data.expiresOn).getTime()
      : Date.now() + (data.ttlSeconds || 900) * 1000;
    setMediaUrls((m) => ({ ...m, [blob]: { url, expiresAt } }));
    return url;
  }, [festivalKey, mediaUrls]);

  /* ---- transcript: fetched when a recording is opened ---- */
  const loadTranscript = useCallback(async (rec) => {
    if (!rec.transcriptBlob || transcripts[rec.id]) return;
    setTranscripts((t) => ({ ...t, [rec.id]: { loading: true } }));
    try {
      const res = await fetch('/api/festival/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ festival: festivalKey, blob: rec.transcriptBlob }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setTranscripts((t) => ({ ...t, [rec.id]: { loading: false, data } }));
    } catch (e) {
      setTranscripts((t) => ({ ...t, [rec.id]: { loading: false, error: e.message } }));
    }
  }, [festivalKey, transcripts]);

  const toggle = (rec) => async (_e, expanded) => {
    setOpenId(expanded ? rec.id : null);
    setActiveLine(-1);
    if (expanded) loadTranscript(rec);
  };

  /* ---- play from a given second ---- */
  const playFrom = async (rec, seconds) => {
    setMediaError((m) => ({ ...m, [rec.id]: null }));
    let url;
    try {
      url = await mintUrl(rec.blob);
    } catch (e) {
      setMediaError((m) => ({ ...m, [rec.id]: e.message }));
      return;
    }
    const el = audioRef.current;
    if (!el) return;
    if (el.dataset.blob !== rec.blob) {
      el.src = url;
      el.dataset.blob = rec.blob;
    }
    try {
      el.currentTime = seconds;
      await el.play();
    } catch {
      // A SAS that expired mid-session: drop it, mint once more, then give up
      // honestly rather than leaving a dead player on screen.
      try {
        const fresh = await mintUrl(rec.blob, { force: true });
        el.src = fresh;
        el.currentTime = seconds;
        await el.play();
      } catch (e2) {
        setMediaError((m) => ({ ...m, [rec.id]: e2.message || 'Playback failed.' }));
      }
    }
  };

  /* ---- follow along: highlight the line currently being spoken ---- */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return undefined;
    const onTime = () => {
      const entry = transcripts[openId];
      const lines = entry?.data?.lines;
      if (!lines?.length) return;
      let best = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].t <= el.currentTime) best = i;
        else break;
      }
      setActiveLine((prev) => (prev === best ? prev : best));
    };
    el.addEventListener('timeupdate', onTime);
    return () => el.removeEventListener('timeupdate', onTime);
  }, [openId, transcripts]);

  /* ---- comments: everyone reads, only the owner writes (plan E4) ---- */
  const mutateComment = async (payload) => {
    setCommentBusy(true);
    setCommentError(null);
    try {
      const res = await fetch('/api/festival/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ festival: festivalKey, ...payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setComments((data.comments || []).filter((c) => c.date === day.date));
    } catch (e) {
      setCommentError(e.message);
    } finally {
      setCommentBusy(false);
    }
  };

  /* ---- curation: admin re-classifies one line ---- */
  const setLineClass = async (rec, line, cls) => {
    try {
      const res = await fetch('/api/festival/annotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ festival: festivalKey, recording: rec.blob, cue: line.i, cls }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setTranscripts((t) => {
        const entry = t[rec.id];
        if (!entry?.data) return t;
        return {
          ...t,
          [rec.id]: {
            ...entry,
            data: {
              ...entry.data,
              lines: entry.data.lines.map((l) => (l.i === line.i ? { ...l, cls } : l)),
            },
          },
        };
      });
    } catch (e) {
      setMediaError((m) => ({ ...m, [rec.id]: e.message }));
    }
  };

  const hasAudio = day.recordings.length > 0;

  return (
    <Box>
      <AdminPanel
        isAdmin={isAdmin}
        adminAvailable={adminAvailable}
        showChatter={showChatter}
        showDropped={showDropped}
        onToggle={onToggle}
        curation={transcripts[openId]?.data?.curation}
      />

      {commentsError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          The comments could not be read, so none are shown. That is a reading
          problem, not a missing-comments one. ({commentsError})
        </Alert>
      )}

      {day.note && (
        <Alert severity="info" variant="outlined" sx={{ mb: 3 }}>{day.note}</Alert>
      )}

      {day.inferred && (
        <Alert severity="warning" variant="outlined" sx={{ mb: 3 }}>
          <strong>No clock times survive for the audio on this day.</strong> The
          recordings are shown in the order they were made and identified by number;
          the day itself was worked out from the session index, not from the files.
          Treat the order as reliable and the exact hour as unknown.
          {day.videos.length > 0 && (
            <> The <strong>video</strong> times further down are real — the camera
              stamped them, and they have been corrected to true local time.</>
          )}
        </Alert>
      )}

      {/* One audio element for the whole day: only one recording plays at a time. */}
      <audio ref={audioRef} controls style={{ width: '100%', marginBottom: 24 }} preload="none" />

      {!hasAudio && (
        <Alert severity="info" sx={{ mb: 3 }}>
          There is no audio for this day — only video. Nothing has been lost from the
          archive here; nothing was recorded.
        </Alert>
      )}

      {hasAudio && (
        <>
          <Typography variant="h6" gutterBottom>
            {day.recordings.length} recording{day.recordings.length === 1 ? '' : 's'}
          </Typography>

          {day.recordings.map((rec) => {
            const entry = transcripts[rec.id];
            const t = entry?.data;
            return (
              <Accordion key={rec.id} expanded={openId === rec.id} onChange={toggle(rec)}
                disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack sx={{ width: '100%' }} spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                      {rec.clock ? (
                        <Chip size="small" label={rec.clock} />
                      ) : (
                        <Chip size="small" color="warning" variant="outlined"
                          label={rec.recordingNumber != null
                            ? `Recording ${rec.recordingNumber} · time not recorded`
                            : 'time not recorded'} />
                      )}
                      {rec.students && <Chip size="small" variant="outlined" label="students" />}
                    </Stack>
                    <Typography variant="body2" color={rec.subject ? 'text.primary' : 'text.secondary'}>
                      {rec.subject || (
                        <em>No subject noted — the session index does not annotate this
                          segment (usually counting or a drill). The recording itself is here.</em>
                      )}
                    </Typography>
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Button size="small" variant="outlined" sx={{ mb: 2 }}
                    onClick={() => playFrom(rec, 0)}>
                    ▶ Play from the start
                  </Button>

                  {mediaError[rec.id] && (
                    <Alert severity="warning" sx={{ mb: 2 }}>{mediaError[rec.id]}</Alert>
                  )}

                  {entry?.loading && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CircularProgress size={18} />
                      <Typography variant="body2" color="text.secondary">
                        Loading the transcript…
                      </Typography>
                    </Stack>
                  )}

                  {entry?.error && (
                    <Alert severity="error">Could not load the transcript: {entry.error}</Alert>
                  )}

                  {/* Comments: everyone reads them, only the owner writes them. */}
                  <CommentBlock
                    rec={rec}
                    comments={comments.filter((c) => c.recording === rec.blob)}
                    isAdmin={isAdmin}
                    draft={commentDraft[rec.id]}
                    setDraft={(v) => setCommentDraft((d) => ({ ...d, [rec.id]: v }))}
                    busy={commentBusy}
                    error={commentError}
                    onSave={(text, t, cue) => mutateComment({
                      action: 'add', recording: rec.blob, text, t, cue,
                    }).then(() => setCommentDraft((d) => ({ ...d, [rec.id]: undefined })))}
                    onRemove={(id) => mutateComment({ action: 'remove', id })}
                    onSeek={(t) => playFrom(rec, t)}
                  />

                  {t && !t.usable && (
                    <Alert severity="info" variant="outlined">
                      <strong>No usable transcript for this recording.</strong> The
                      transcriber could not make sense of it — {t.reason}. The audio
                      itself is fine; play it above.
                    </Alert>
                  )}

                  {t?.usable && (
                    <>
                      {t.loopShare >= 25 && (
                        <Alert severity="warning" variant="outlined" sx={{ mb: 2 }}>
                          Parts of this transcript are the transcriber stuck in a loop on
                          near-silence. Those lines are marked; the rest is real.
                        </Alert>
                      )}
                      {isAdmin && t.curation?.counts && (
                        <Typography variant="caption" color="text.secondary"
                          sx={{ display: 'block', mb: 1 }}>
                          Curation: {t.curation.counts.keep} kept ·{' '}
                          {t.curation.counts.chatter} chatter ·{' '}
                          {t.curation.counts.dropped} dropped.
                          {(!showChatter || !showDropped) &&
                            ' Attendees see only the kept lines.'}
                        </Typography>
                      )}

                      <Paper variant="outlined" sx={{ maxHeight: 420, overflowY: 'auto' }}>
                        {visibleLines(t.lines).map((line, i) => {
                          const cls = line.cls || 'keep';
                          return (
                            <Box key={line.i}>
                              {i > 0 && <Divider />}
                              <Box
                                sx={{
                                  display: 'flex', gap: 1.5, p: 1, alignItems: 'baseline',
                                  bgcolor: openId === rec.id && activeLine === line.i
                                    ? 'action.selected' : 'transparent',
                                  '&:hover': { bgcolor: 'action.hover' },
                                }}
                              >
                                <Typography variant="caption" onClick={() => playFrom(rec, line.t)}
                                  sx={{ fontFamily: 'monospace', opacity: 0.7, cursor: 'pointer' }}>
                                  {fmt(line.t)}
                                </Typography>
                                <Typography variant="body2" onClick={() => playFrom(rec, line.t)}
                                  sx={{
                                    flex: 1, cursor: 'pointer',
                                    opacity: line.loop || cls !== 'keep' ? 0.45 : 1,
                                    fontStyle: line.loop ? 'italic' : 'normal',
                                    textDecoration: cls === 'dropped' ? 'line-through' : 'none',
                                  }}>
                                  {line.loop ? '[transcriber loop] ' : ''}{line.text}
                                </Typography>

                                {isAdmin && (
                                  <Stack direction="row" spacing={0.5} alignItems="center">
                                    {cls !== 'keep' && (
                                      <Chip size="small" variant="outlined" label={cls} />
                                    )}
                                    {['keep', 'chatter', 'dropped']
                                      .filter((c) => c !== cls)
                                      .map((c) => (
                                        <Button key={c} size="small" sx={{ minWidth: 0, px: 0.75 }}
                                          onClick={() => setLineClass(rec, line, c)}>
                                          {c}
                                        </Button>
                                      ))}
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          );
                        })}
                      </Paper>
                      <Typography variant="caption" color="text.secondary"
                        sx={{ display: 'block', mt: 1 }}>
                        Click any line to hear that moment.
                      </Typography>

                      {isAdmin && (
                        <Box sx={{ mt: 1 }}>
                          <Button size="small" variant="outlined"
                            onClick={() => setCommentDraft((d) => ({
                              ...d,
                              [rec.id]: {
                                text: '',
                                t: activeLine >= 0
                                  ? visibleLines(t.lines).find((l) => l.i === activeLine)?.t ?? null
                                  : null,
                                cue: activeLine >= 0 ? activeLine : null,
                              },
                            }))}>
                            + Comment{activeLine >= 0 ? ' on this moment' : ' on this recording'}
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      )}

      {day.videos.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            {day.videos.length} video clip{day.videos.length === 1 ? '' : 's'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Filmed from the corner of the room. Times are the real wall-clock time,
            corrected — the camera&apos;s own clock was four hours out.
          </Typography>
          <Paper variant="outlined">
            {day.videos.map((v, i) => (
              <Box key={v.id}>
                {i > 0 && <Divider />}
                <Box sx={{ p: 1.5 }}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Chip size="small" label={v.clock || 'time unknown'} />
                    {v.minutes != null && (
                      <Typography variant="caption" color="text.secondary">
                        {v.minutes.toFixed(1)} min
                      </Typography>
                    )}
                    <Box sx={{ flex: 1 }} />
                    <Button size="small"
                      onClick={async () => {
                        setMediaError((m) => ({ ...m, [v.id]: null }));
                        try {
                          const url = await mintUrl(v.blob);
                          setOpenVideo({ id: v.id, url });
                        } catch (e) {
                          setMediaError((m) => ({ ...m, [v.id]: e.message }));
                        }
                      }}>
                      ▶ Watch
                    </Button>
                  </Stack>
                  {mediaError[v.id] && (
                    <Alert severity="warning" sx={{ mt: 1 }}>{mediaError[v.id]}</Alert>
                  )}
                  {openVideo?.id === v.id && (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={openVideo.url} controls style={{ width: '100%', marginTop: 12 }} />
                  )}
                </Box>
              </Box>
            ))}
          </Paper>
        </>
      )}
    </Box>
  );
}
