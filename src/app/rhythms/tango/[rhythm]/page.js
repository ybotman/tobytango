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
            Movement quality that reflects the rhythm&lsquo;s character
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            Pauses and movement during appropriate beats
          </Typography>
        </Box>
      </Box>

      {examples.length > 0 && (
        <>
          <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 3 }}>
            Musical Examples
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {examples.map((example) => (
              <AudioPlayer 
                key={example.id}
                example={example}
                audioPlayer={audioPlayer}
              />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}