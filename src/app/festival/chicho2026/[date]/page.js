import React from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Box, Container, Typography, Alert, Divider, Button } from '@mui/material';
import { hasAccess, FESTIVALS } from '@/lib/festival-access';
import { SESSION_COOKIE, verifySession } from '@/lib/festival-session';
import { getDay } from '@/lib/festival-archive';
import FestivalGate from '../../FestivalGate';
import SignOutButton from '../../SignOutButton';
import DayArchive from './DayArchive';

const FESTIVAL_KEY = 'chicho2026';
const LABEL = FESTIVALS.find((f) => f.key === FESTIVAL_KEY)?.label || 'Chicho 2026';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { date } = await params;
  return {
    title: `${date} — ${LABEL}`,
    robots: { index: false, follow: false },
  };
}

export default async function DayPage({ params }) {
  const { date } = await params;

  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  const allowed = session?.email ? await hasAccess(session.email, FESTIVAL_KEY) : false;
  if (!allowed) return <FestivalGate festivalKey={FESTIVAL_KEY} label={LABEL} />;

  let day = null;
  let loadError = null;
  try {
    day = await getDay(date);
  } catch (e) {
    loadError = e.message;
  }
  if (!loadError && !day) notFound();

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1 }}>
        <Button size="small" href={`/festival/${FESTIVAL_KEY}`}>← All days</Button>
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" color="text.secondary">{session.email}</Typography>
        <SignOutButton />
      </Box>

      {loadError ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          This day could not be loaded. ({loadError})
        </Alert>
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 1 }}>{day.label}</Typography>
          <Divider sx={{ mb: 3 }} />
          <DayArchive festivalKey={FESTIVAL_KEY} day={day} />
        </>
      )}
    </Container>
  );
}
