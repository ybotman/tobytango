"use client";

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  Grid
} from '@mui/material';
import { useParams } from 'next/navigation';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import AudioPlayer from '../../../components/shared/AudioPlayer';
import rhythmDescriptions from '../../../data/rhythmDescriptions';
import mp3Examples from '../../../data/mp3Examples';

export default function RhythmDetailPage() {
  const params = useParams();
  const rhythm = params.rhythm;

  // Initialize audio player hook
  const audioPlayer = useAudioPlayer();

  // Get examples for the current rhythm
  const examples = mp3Examples[rhythm] || [];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid>
          <Typography variant="h4" component="h1" gutterBottom>
            Tango Rhythm: {rhythm}
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {rhythmDescriptions[rhythm] || 'A fundamental tango rhythm pattern.'}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" sx={{ my: 4 }}>
        <Grid sx={{ width: { xs: '100%', md: '83%', lg: '66%' } }}>
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
      
      <Grid container spacing={2}>
        <Grid>
          <Box component="ul" sx={{ pl: 3 }}>
            {rhythm === "1-3-" && (
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1">
                  The most common beat early to mid tango dancers use (often more than 60% of steps). We want to use other rhythm patterns more often. This is the first set of pulses we hear and are taught.
                </Typography>
              </Box>
            )}
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">
                Weight changes that align with the accented beats
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">
                Movement quality that reflects the rhythm&lsquo;s character
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">
                Pauses and movement during appropriate beats
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {examples.length > 0 && (
        <>
          <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 3 }}>
            Musical Examples
          </Typography>
          
          {(rhythm === '123-' || rhythm === '1-34' || rhythm === '1234' || rhythm === '1--4') && (
            <Typography variant="body1" color="error.main" fontWeight="bold" sx={{ mb: 2 }}>
              Time-ing of pulse is wrong
            </Typography>
          )}
          
          <Grid container spacing={4}>
            {examples.map((example) => (
              <Grid key={example.id}>
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