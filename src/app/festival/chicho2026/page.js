import React from 'react';
import { cookies } from 'next/headers';
import { Box, Container, Paper, Typography, Alert, Divider } from '@mui/material';
import { hasAccess, FESTIVALS } from '@/lib/festival-access';
import { SESSION_COOKIE, verifySession } from '@/lib/festival-session';
import FestivalGate from '../FestivalGate';
import SignOutButton from '../SignOutButton';

const FESTIVAL_KEY = 'chicho2026';
const LABEL = FESTIVALS.find((f) => f.key === FESTIVAL_KEY)?.label || 'Chicho 2026';

// Never prerendered, never cached: the allowlist is re-read on every request so
// that a revocation takes effect at the revoked person's next request rather
// than whenever their cookie happens to expire.
export const dynamic = 'force-dynamic';

// Belt to the X-Robots-Tag braces in next.config.mjs. The root layout sets
// index:true site-wide; this overrides it for the gated route.
export const metadata = {
  title: `${LABEL} — Festival Archive`,
  robots: { index: false, follow: false },
};

export default async function Chicho2026Page() {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);

  // The cookie is evidence of a past check, never a standing grant. Re-check.
  const allowed = session?.email ? await hasAccess(session.email, FESTIVAL_KEY) : false;

  if (!allowed) {
    return <FestivalGate festivalKey={FESTIVAL_KEY} label={LABEL} />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1 }}>
        <Typography variant="h4" sx={{ flex: 1 }}>{LABEL}</Typography>
        <Typography variant="body2" color="text.secondary">{session.email}</Typography>
        <SignOutButton />
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Workshop archive — Chicho and Juana, 27 July – 1 August 2026.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>The players are still being built</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          You are on the list and the door works. All six days are recorded and
          stored — video, audio and transcripts. What is not ready yet is the way
          to watch them: the archive page and its players are still being built.
          Check back, or ask Toby.
        </Typography>
        <Alert severity="warning" variant="outlined">
          When it opens, please keep it here. This is Chicho and Juana&apos;s
          copyrighted workshop material, and the audio carries other
          attendees&apos; voices.
        </Alert>
      </Paper>
    </Container>
  );
}
