'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box, Container, Typography, TextField, Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, FormGroup,
  FormControlLabel, Checkbox, CircularProgress, Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockIcon from '@mui/icons-material/Lock';

const API = '/api/festival/access';
const BLANK = { email: '', name: '', pages: [], note: '' };

export default function FestivalAccessAdmin() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [users, setUsers] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState(BLANK);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async (pwd) => {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`${API}?password=${encodeURIComponent(pwd)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setUsers(data.users || []);
      setFestivals(data.festivals || []);
      setAuthed(true);
      sessionStorage.setItem('festivalAdminPassword', pwd);
    } catch (e) {
      setError(e.message);
      setAuthed(false);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem('festivalAdminPassword');
    if (saved) {
      setPassword(saved);
      load(saved);
    }
  }, [load]);

  const mutate = async (payload) => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setUsers(data.users || []);
      setNotice(
        payload.action === 'remove'
          ? `Removed ${payload.email}`
          : `Saved ${payload.email}`
      );
      setDialogOpen(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const openAdd = () => { setDraft(BLANK); setEditing(false); setDialogOpen(true); };
  const openEdit = (u) => {
    setDraft({ email: u.email, name: u.name || '', pages: u.pages || [], note: u.note || '' });
    setEditing(true);
    setDialogOpen(true);
  };

  const togglePage = (key) => {
    setDraft((d) => ({
      ...d,
      pages: d.pages.includes(key) ? d.pages.filter((p) => p !== key) : [...d.pages, key],
    }));
  };

  const remove = (u) => {
    if (!window.confirm(`Remove access for ${u.email}?\n\nThey will lose access immediately.`)) return;
    mutate({ action: 'remove', email: u.email });
  };

  /* ----- login ----- */
  if (!authed) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LockIcon color="primary" />
            <Typography variant="h5">Festival Access Admin</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Grant or revoke access to gated festival archives.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={(e) => { e.preventDefault(); load(password); }}>
            <TextField
              fullWidth type="password" label="Admin password" value={password}
              onChange={(e) => setPassword(e.target.value)} autoFocus sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" type="submit" disabled={busy || !password}>
              {busy ? <CircularProgress size={22} /> : 'Sign in'}
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }

  /* ----- admin ----- */
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4" sx={{ flex: 1 }}>Festival Access</Typography>
        <Button variant="contained" startIcon={<PersonAddIcon />} onClick={openAdd}>
          Grant access
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {notice && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setNotice('')}>{notice}</Alert>}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {users.length} {users.length === 1 ? 'person has' : 'people have'} access.
        Anyone not listed is denied.
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Festivals</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Added</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    Nobody has access yet. Use “Grant access” to add someone.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {users.map((u) => (
              <TableRow key={u.email} hover>
                <TableCell sx={{ fontFamily: 'monospace' }}>{u.email}</TableCell>
                <TableCell>{u.name || '—'}</TableCell>
                <TableCell>
                  {(u.pages || []).map((p) => (
                    <Chip key={p} size="small" sx={{ mr: 0.5 }}
                      label={p === '*' ? 'ALL' : (festivals.find((f) => f.key === p)?.label || p)}
                      color={p === '*' ? 'secondary' : 'default'} />
                  ))}
                </TableCell>
                <TableCell>{u.note || '—'}</TableCell>
                <TableCell>{u.added ? new Date(u.added).toLocaleDateString() : '—'}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit"><span>
                    <IconButton size="small" onClick={() => openEdit(u)} disabled={busy}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </span></Tooltip>
                  <Tooltip title="Revoke"><span>
                    <IconButton size="small" color="error" onClick={() => remove(u)} disabled={busy}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </span></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit access' : 'Grant access'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Email" value={draft.email} disabled={editing}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            sx={{ mt: 1, mb: 2 }} autoFocus={!editing}
          />
          <TextField
            fullWidth label="Name (optional)" value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })} sx={{ mb: 2 }}
          />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Festivals</Typography>
          <FormGroup sx={{ mb: 2 }}>
            {festivals.map((f) => (
              <FormControlLabel key={f.key}
                control={<Checkbox checked={draft.pages.includes(f.key)} onChange={() => togglePage(f.key)} />}
                label={f.label} />
            ))}
            <FormControlLabel
              control={<Checkbox checked={draft.pages.includes('*')} onChange={() => togglePage('*')} />}
              label="All festivals (including future ones)" />
          </FormGroup>
          <TextField
            fullWidth label="Note (optional)" value={draft.note}
            placeholder="e.g. attended the workshop"
            onChange={(e) => setDraft({ ...draft, note: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" disabled={busy || !draft.email || !draft.pages.length}
            onClick={() => mutate({ action: editing ? 'update' : 'add', ...draft })}>
            {busy ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
