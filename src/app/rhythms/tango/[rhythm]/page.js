"use client";

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'next/navigation';

export default function RhythmDetailPage() {
  const params = useParams();
  const rhythm = params.rhythm;

  const rhythmDescriptions = {
    '1-3-': 'The classic tango rhythm. Strong, definitive, and foundational to tango musical interpretation.',
    '1---': 'The "long note" rhythm. Creates space and dramatic tension in the dance.',
    '----': 'The "pause" or "none" rhythm. Offers moments of stillness and anticipation.',
    '1-34': 'A dynamic rhythm with quick double beats at the end. Creates forward momentum.',
    '123-': 'The "triplet" rhythm. Offers a rolling, continuous feeling followed by a pause.',
    '1234': 'The "marcato" rhythm. Every beat is accented, creating consistent drive.'
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tango Rhythm: {rhythm}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {rhythmDescriptions[rhythm] || 'A fundamental tango rhythm pattern.'}
      </Typography>

      <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
        <Box
          component="img"
          src={`/rhythms/${rhythm}.png`}
          alt={`Rhythm ${rhythm} visualization`}
          sx={{
            maxWidth: '100%',
            height: 'auto',
            boxShadow: 3,
            borderRadius: 1
          }}
        />
      </Box>

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Dancing with this Rhythm
      </Typography>
      
      <Typography variant="body1" paragraph>
        This rhythm creates a specific musical feeling that can be expressed in your dance through:
      </Typography>
      
      <Box component="ul" sx={{ pl: 3 }}>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            Weight changes that align with the accented beats
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            Movement quality that reflects the rhytåhm&apos;s character
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            Pauses and movement during appropriate beats
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}