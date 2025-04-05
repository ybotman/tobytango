"use client";

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import AudioPlayer from '../../../components/shared/AudioPlayer';
import rhythmDescriptions from '../../../data/rhythmDescriptions';

export default function SyncopaRhythmPage() {
  // Initialize audio player hook
  const audioPlayer = useAudioPlayer();
  
  // Audio examples for Syncopa rhythm
  const examples = [
    {
      id: 'pugliese-la-yumba',
      title: 'La Yumba',
      orchestra: 'Osvaldo Pugliese',
      year: 1946,
      file: '/audio/Tango/Pugliese/La Yumba.mp3',
      startTime: 0,
      duration: 37,
      comment: 'Note: Single Time (1-3-) pattern 3x, then Syncopa at 00:14, then more single time with different syncopa at 00:30'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tango Rhythm: Syncopa
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#222', color: 'white' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Common Syncopa Patterns
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Pattern 1: 1& - 3 -
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#444', color: 'white', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                1&2 3 4 
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                (Steps on 1, &, and 3)
              </Typography>
            </Paper>
          </Box>
          
          <Divider sx={{ bgcolor: '#555' }} />
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Pattern 2: 1 -&3 -
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#444', color: 'white', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                1 2&3 4 
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                (Steps on 1, & after 2, and 3)
              </Typography>
            </Paper>
          </Box>
          
          <Divider sx={{ bgcolor: '#555' }} />
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Pattern 3: 1&-&3 -
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#444', color: 'white', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                1&2&3 4 
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                (Steps on 1, & after 1, & after 2, and 3)
              </Typography>
            </Paper>
          </Box>
          
          <Divider sx={{ bgcolor: '#555' }} />
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Pattern 4: 1--&4
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#444', color: 'white', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                1 2 3&4
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                (Steps on 1, & after 3, and 4)
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Paper>

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