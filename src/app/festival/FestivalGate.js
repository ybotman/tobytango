'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Container, Paper, Typography, TextField, Button, Alert, CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

/**
 * Email-entry gate for a festival archive.
 *
 * Deliberately honest about what it is (plan §1 R1): a courtesy gate, not a
 * lock. It answers "don't let this be stumbled on or indexed", not "prove you
 * are who you say". The copy must not imply otherwise -- if it ever needs to be
 * a real lock, the swap is a magic link behind the same session cookie.
 */
export default function FestivalGate({ festivalKey, label }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/festival/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, festival: festivalKey }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Could not sign in (HTTP ${res.status})`);
      // The server component re-runs and re-checks access on the refresh.
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LockOutlinedIcon color="primary" />
          <Typography variant="h5">{label}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This workshop archive is shared with the people who were there. Enter the
          email address Toby has for you to open it.
        </Typography>

        <Alert severity="info" variant="outlined" sx={{ mb: 3 }}>
          This is a courtesy gate, not a secure login. It keeps the archive out of
          search results and away from passers-by. It does not verify that the
          address is yours, so please do not pass it around: the material is
          Chicho and Juana&apos;s, and the recordings carry other attendees&apos; voices.
        </Alert>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={submit}>
          <TextField
            fullWidth
            type="email"
            label="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoComplete="email"
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" type="submit" disabled={busy || !email}>
            {busy ? <CircularProgress size={22} /> : 'Open the archive'}
          </Button>
        </form>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3 }}>
          Not on the list and think you should be? Ask Toby.
        </Typography>
      </Paper>
    </Container>
  );
}
