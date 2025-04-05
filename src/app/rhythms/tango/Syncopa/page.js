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
  
  // Examples will be added later
  const examples = [];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tango Rhythm: Syncopa
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {rhythmDescriptions['Syncopa']}
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Understanding Syncopa in Musical Terms
        </Typography>
        
        <Typography variant="body1" paragraph>
          In standard musical notation, we count the main beats as 1-2-3-4, with each beat subdivided into two subbeats,
          written as 1&2&3&4&, where the "&" represents the "and" between beats.
        </Typography>
        
        <Typography variant="body1" paragraph>
          In tango notation:
        </Typography>
        
        <List sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', borderRadius: 2, py: 2, px: 3, mb: 3 }}>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1">"-" (dash) indicates a main beat where we don't step or pulse</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1">" " (space) indicates a subbeat where we don't step</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1">"&" represents the subbeat between main beats</Typography>}
            />
          </ListItem>
        </List>
        
        <Typography variant="body1" paragraph>
          <strong>Definition:</strong> In Argentine tango, syncopa (syncopation) refers to playing or dancing (often with accent) 
          on the "off-beats" or "and" counts, especially between beats 1 and 2 (the "1&") and between beats 2 and 3 (the "2&").
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Common Syncopa Patterns
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Pattern 1: 1& - 3 -
            </Typography>
            <Typography variant="body1" paragraph>
              Step on beat 1, then immediately on the "and" after beat 1, then on beat 3, creating a quick-quick-slow rhythm.
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'white', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                1&2 3 4 
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                (Steps on 1, &, and 3)
              </Typography>
            </Paper>
          </Box>
          
          <Divider />
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Pattern 2: 1 -&3 -
            </Typography>
            <Typography variant="body1" paragraph>
              Step on beat 1, then on the "and" after beat 2, then on beat 3, creating a slow-quick-quick rhythm.
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'white', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                1 2&3 4 
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                (Steps on 1, & after 2, and 3)
              </Typography>
            </Paper>
          </Box>
          
          <Divider />
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Pattern 3: 1&-&3 -
            </Typography>
            <Typography variant="body1" paragraph>
              Step on beat 1, the "and" after beat 1, the "and" after beat 2, and then beat 3, creating a complex syncopated pattern.
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'white', mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                1&2&3 4 
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                (Steps on 1, & after 1, & after 2, and 3)
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Dancing with Syncopa
        </Typography>
        
        <Typography variant="body1" paragraph>
          Syncopa creates a distinctive "push-pull" feeling in the dance, adding energy and dynamic contrast. Here are tips for dancing with syncopa:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Listen for the "in-between" notes - not just the strong beats
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              The "and" counts should be emphasized but still connected to the main beats
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Maintain a clear separation between steps on main beats and steps on subbeats
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Use syncopation to express energy, playfulness, and musical complexity
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Practice by clapping the syncopa patterns before dancing them
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Common Uses in Tango
        </Typography>
        
        <Typography variant="body1" paragraph>
          Syncopa is most commonly used in:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              The cruzada (cross) and resolution
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Decorative movements (adornos)
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Quick direction changes
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              During musical phrases with clear syncopation
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              As a contrast to regular, predictable rhythms
            </Typography>
          </Box>
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