import React from 'react';
import { cookies } from 'next/headers';
import {
  Box, Container, Typography, Alert, Divider, Paper, List, ListItem,
  ListItemButton, ListItemText, Chip, Stack,
} from '@mui/material';
import { hasAccess, FESTIVALS } from '@/lib/festival-access';
import { SESSION_COOKIE, verifySession } from '@/lib/festival-session';
import { getDays, getFestivalMeta } from '@/lib/festival-archive';
import FestivalGate from '../FestivalGate';
import SignOutButton from '../SignOutButton';

const FESTIVAL_KEY = 'chicho2026';
const LABEL = FESTIVALS.find((f) => f.key === FESTIVAL_KEY)?.label || 'Chicho 2026';

// Never prerendered, never cached: the allowlist is re-read on every request so
// that a revocation takes effect at the revoked person's next request rather
// than whenever their cookie happens to expire.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: `${LABEL} — Festival Archive`,
  robots: { index: false, follow: false },
};

export default async function Chicho2026Page() {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);

  // The cookie is evidence of a past check, never a standing grant. Re-check.
  const allowed = session?.email ? await hasAccess(session.email, FESTIVAL_KEY) : false;
  if (!allowed) return <FestivalGate festivalKey={FESTIVAL_KEY} label={LABEL} />;

  let days = [];
  let meta = null;
  let loadError = null;
  try {
    [days, meta] = await Promise.all([getDays(), getFestivalMeta()]);
  } catch (e) {
    loadError = e.message;
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1 }}>
        <Typography variant="h4" sx={{ flex: 1 }}>{LABEL}</Typography>
        <Typography variant="body2" color="text.secondary">{session.email}</Typography>
        <SignOutButton />
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Workshop archive — Chicho and Juana, 27 July – 1 August 2026.
      </Typography>
      {meta?.schedule && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {meta.schedule}
        </Typography>
      )}

      <Divider sx={{ mb: 3 }} />

      {loadError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          The archive index could not be loaded, so the days below are missing.
          Nothing is lost — this is a reading problem, not a data problem. ({loadError})
        </Alert>
      )}

      {!loadError && (
        <>
          <Typography variant="h6" gutterBottom>Six days</Typography>
          <Paper variant="outlined" sx={{ mb: 3 }}>
            <List disablePadding>
              {days.map((day, i) => (
                <ListItem key={day.date} disablePadding divider={i < days.length - 1}>
                  {/* Plain href, not component={Link}: server component. */}
                  <ListItemButton href={`/festival/${FESTIVAL_KEY}/${day.date}`}>
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                          <span>{day.label}</span>
                          {day.inferred && (
                            <Chip size="small" color="warning" variant="outlined"
                              label="times not recorded" />
                          )}
                          {day.audioCount === 0 && (
                            <Chip size="small" variant="outlined" label="video only" />
                          )}
                        </Stack>
                      }
                      secondary={
                        day.audioCount === 0
                          ? `${day.videoCount} video, no audio`
                          : `${day.audioCount} recordings · ${day.videoCount} video`
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>

          <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
            Two days — Tuesday and Wednesday — have <strong>no surviving clock
            times</strong>. Those recordings are shown in the order they were made,
            numbered, and never with a made-up time. Monday has video but no audio.
          </Alert>
        </>
      )}

      <Alert severity="warning" variant="outlined">
        Please keep this here. It is Chicho and Juana&apos;s copyrighted workshop
        material, and the audio carries other attendees&apos; voices.
      </Alert>
    </Container>
  );
}
