"use client";

import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConstructionIcon from '@mui/icons-material/Construction';
import Link from 'next/link';
import timelineCategories from '../../data/tangoTimelineData';

const category = timelineCategories.find(c => c.categoryId === 'orchestras');

export default function OrchestrasTimelinePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button component={Link} href="/tango-history" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to Timeline
      </Button>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: category.color }}>
          {category.categoryTitle}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>{category.categorySubtitle}</Typography>
      </Box>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <ConstructionIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h5" gutterBottom>Content Coming Soon</Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The great orchestras of tango — D'Arienzo, Di Sarli, Troilo, Pugliese, and the dozens more
          who created the music that milongueros dance to forever.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This section will cover orchestra histories, signature styles, and listening guides.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Available Now</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button component={Link} href="/tango-history/argentina" variant="outlined">Argentina Timeline</Button>
          <Button component={Link} href="/tango-history/dancers" variant="contained">Dancers & Couples</Button>
          <Button component={Link} href="/artists" variant="outlined">View Artists</Button>
        </Box>
      </Paper>
    </Container>
  );
}
