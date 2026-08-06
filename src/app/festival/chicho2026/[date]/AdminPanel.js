'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert, Box, Button, Paper, Stack, TextField, Typography, FormControlLabel, Switch,
} from '@mui/material';

/**
 * The archive owner's controls (plan §E2/§E4): sign in to author, then show the
 * chatter and dropped segments that attendees do not see.
 *
 * Deliberately understated. Attendees never see this -- the server does not send
 * it to them -- and Toby only needs it while curating.
 */
export default function AdminPanel({
  isAdmin, adminAvailable, showChatter, showDropped, onToggle, curation,
}) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/festival/admin-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setPassword('');
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    setBusy(true);
    try {
      await fetch('/api/festival/admin-session', { method: 'DELETE' });
    } finally {
      router.refresh();
      setBusy(false);
    }
  };

  if (!adminAvailable) return null;

  if (!isAdmin) {
    return (
      <Box sx={{ mb: 3 }}>
        {!open ? (
          <Button size="small" onClick={() => setOpen(true)} sx={{ opacity: 0.6 }}>
            Owner sign-in
          </Button>
        ) : (
          <Paper variant="outlined" sx={{ p: 2, maxWidth: 420 }}>
            <Typography variant="subtitle2" gutterBottom>Owner sign-in</Typography>
            {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
            <form onSubmit={signIn}>
              <Stack direction="row" spacing={1}>
                <TextField size="small" type="password" label="Admin password" fullWidth
                  value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
                <Button type="submit" variant="contained" disabled={busy || !password}>
                  Go
                </Button>
                <Button onClick={() => { setOpen(false); setError(''); }}>Cancel</Button>
              </Stack>
            </form>
          </Paper>
        )}
      </Box>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          Owner view — you are seeing what attendees do not.
        </Typography>
        <Button size="small" onClick={signOut} disabled={busy}>Leave owner view</Button>
      </Stack>

      {!curation?.present && (
        <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
          {curation?.malformed
            ? 'The curation file exists but does not match the expected shape, so it is being ignored rather than half-read. Nothing is hidden.'
            : curation?.error
              ? `The curation could not be read (${curation.error}), so nothing is hidden.`
              : 'No curation has been loaded yet, so every line is shown. The keep/chatter/dropped classification is still being extracted from the local browser (plan E0); the controls below activate once it lands.'}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 1 }} flexWrap="wrap">
        <FormControlLabel
          control={<Switch size="small" checked={showChatter}
            onChange={(e) => onToggle('chatter', e.target.checked)} />}
          label="Show chatter"
        />
        <FormControlLabel
          control={<Switch size="small" checked={showDropped}
            onChange={(e) => onToggle('dropped', e.target.checked)} />}
          label="Show dropped"
        />
      </Stack>
    </Paper>
  );
}
