'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  CircularProgress,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function EditUmbrellaTechniquePage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [formData, setFormData] = useState({
    leaderFirst: '',
    leaderLast: '',
    followerFirst: '',
    followerLast: '',
    energy: 0,
    onTheSpot: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await fetch('/api/artists-umbrella');
      const data = await response.json();
      setArtists(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artists:', error);
      setError('Failed to load artists');
      setLoading(false);
    }
  };

  const handleEdit = (artist) => {
    setCurrentArtist(artist);
    setFormData({
      leaderFirst: artist.leaderFirst,
      leaderLast: artist.leaderLast,
      followerFirst: artist.followerFirst,
      followerLast: artist.followerLast,
      energy: artist.energy,
      onTheSpot: artist.onTheSpot
    });
    setEditDialog(true);
  };

  const handleCreate = () => {
    setCurrentArtist(null);
    setFormData({
      leaderFirst: '',
      leaderLast: '',
      followerFirst: '',
      followerLast: '',
      energy: 0,
      onTheSpot: 0
    });
    setEditDialog(true);
  };

  const handleSave = async () => {
    try {
      const url = currentArtist 
        ? `/api/artists-umbrella/${currentArtist.id}`
        : '/api/artists-umbrella';
      
      const method = currentArtist ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchArtists();
        setEditDialog(false);
        setError('');
      } else {
        setError('Failed to save artist');
      }
    } catch (error) {
      console.error('Error saving artist:', error);
      setError('Failed to save artist');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/artists-umbrella/${currentArtist.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchArtists();
        setDeleteDialog(false);
        setCurrentArtist(null);
      } else {
        setError('Failed to delete artist');
      }
    } catch (error) {
      console.error('Error deleting artist:', error);
      setError('Failed to delete artist');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Edit Artists
        </Typography>
        <Box>
          <Link href="/artists/umbrella-technique" passHref>
            <Button startIcon={<ArrowBackIcon />} sx={{ mr: 2 }}>
              Back to Grid
            </Button>
          </Link>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
            Add New Artist
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 3 }}>
        <List>
          {artists.map((artist) => (
            <ListItem key={artist.id} divider>
              <ListItemText
                primary={artist.fullName}
                secondary={`${artist.shortName} - Energy: ${artist.energy}, OnTheSpot: ${artist.onTheSpot}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEdit(artist)} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  onClick={() => { setCurrentArtist(artist); setDeleteDialog(true); }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Edit/Create Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentArtist ? 'Edit Artist' : 'Create New Artist'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Leader First Name"
                value={formData.leaderFirst}
                onChange={(e) => setFormData({ ...formData, leaderFirst: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Leader Last Name"
                value={formData.leaderLast}
                onChange={(e) => setFormData({ ...formData, leaderLast: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Follower First Name"
                value={formData.followerFirst}
                onChange={(e) => setFormData({ ...formData, followerFirst: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Follower Last Name"
                value={formData.followerLast}
                onChange={(e) => setFormData({ ...formData, followerLast: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Energy: {formData.energy} (Oppositional ← → Supportive)
              </Typography>
              <Slider
                value={formData.energy}
                onChange={(e, value) => setFormData({ ...formData, energy: value })}
                min={-10}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                OnTheSpot: {formData.onTheSpot} (Memorized ← → Free)
              </Typography>
              <Slider
                value={formData.onTheSpot}
                onChange={(e, value) => setFormData({ ...formData, onTheSpot: value })}
                min={-10}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {currentArtist?.fullName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}