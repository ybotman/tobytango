"use client";

import React from 'react';
import { 
  Container, 
  Typography, 
  Box
} from '@mui/material';
import RhythmGrid from '../components/RhythmGrid';

export default function CannedRhythmsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Interactive Rhythm Grid
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Create and play rhythms using the interactive grid below. 
        Click cells to toggle sounds, adjust tempo, and experiment with different patterns.
        Right-click or long-press cells for detailed sound selection.
      </Typography>

      <RhythmGrid />
    </Container>
  );
}