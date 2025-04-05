"use client";

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid
} from '@mui/material';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import AudioPlayer from '../../../components/shared/AudioPlayer';
import rhythmDescriptions from '../../../data/rhythmDescriptions';
import mp3Examples from '../../../data/mp3Examples';

export default function SimpleTimePage() {
  const audioPlayer = useAudioPlayer();
  const rhythm = "1-3-";
  const examples = mp3Examples[rhythm] || [];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Simple Time Rhythm: {rhythm}
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        {rhythmDescriptions[rhythm] || 'A fundamental tango rhythm pattern.'}
      </Typography>

      <Grid container justifyContent="center" sx={{ my: 4 }}>
        <Grid sx={{ width: { xs: '100%', md: '80%', lg: '60%' } }}>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
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
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Dancing with this Rhythm
      </Typography>
      
      <Typography variant="body1" paragraph>
        This rhythm creates a specific musical feeling that can be expressed in your dance through:
      </Typography>
      
      <Box component="ul" sx={{ pl: 3, mb: 4 }}>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            The most common beat early to mid tango dancers use (often more than 60% of steps). We want to use other rhythm patterns more often. This is the first set of pulses we hear and are taught.
          </Typography>
        </Box>
      </Box>

      {examples.length > 0 && (
        <>
          <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 3 }}>
            Musical Examples
          </Typography>
          
          <Grid container spacing={4}>
            {examples.map((example) => (
              <Grid key={example.id} sx={{ width: '100%' }}>
                <AudioPlayer 
                  example={example}
                  audioPlayer={audioPlayer}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}