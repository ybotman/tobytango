'use client';

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

export default function NoDrumsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#872020', fontWeight: 'bold' }}>
        The Challenge of No Drums in Tango
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
        One of the most unique challenges for beginners in Argentine tango is learning to dance to music that lacks a pronounced drum beat.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          Why Tango Has No Drums
        </Typography>
        
        <Typography variant="body1" paragraph>
          Unlike many other dance forms (salsa, bachata, ballroom), traditional Argentine tango orchestras 
          typically do not include drums or percussion instruments. Instead, rhythm is created through:
        </Typography>
        
        <List sx={{ pl: 2, mb: 3 }}>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>String Instruments:</strong> The rhythmic bass and chord patterns from the double bass and piano</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>Marcato Style:</strong> The sharp, accented playing style of the entire orchestra</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>Bandoneón:</strong> The characteristic instrument of tango that can play both melody and rhythmic elements</Typography>}
            />
          </ListItem>
        </List>
        
        <Typography variant="body1" paragraph>
          This creates a rich, complex rhythmic texture rather than an obvious beat to follow.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          Why This Is Challenging
        </Typography>
        
        <Typography variant="body1" paragraph>
          Many dancers come to tango from other styles where the rhythm is clearly marked with percussion, making it easier to:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Find the beat instantly
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Maintain consistent timing
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Get back on beat if you lose it
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              Predict the next beat reliably
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body1">
          In tango, dancers must learn to hear the implicit rhythm within the melodic and harmonic structure,
          which requires developing a different kind of musical awareness.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          How to Overcome This Challenge
        </Typography>
        
        <Box component="ol" sx={{ pl: 3, mb: 3 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Start with Rhythmic Orchestras
            </Typography>
            <Typography variant="body1">
              Begin with orchestras like D&apos;Arienzo, Biagi, and Canaro, which have stronger, more obvious rhythmic patterns.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Listen Actively to Tango Music
            </Typography>
            <Typography variant="body1">
              Spend time just listening to tango music, trying to identify the 1-2-3-4 beat pattern without dancing.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Practice Clapping the Beat
            </Typography>
            <Typography variant="body1">
              Try clapping along with tango music to internalize the rhythm before attempting to dance to it.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Focus on the Bass Line
            </Typography>
            <Typography variant="body1">
              Train your ear to follow the bass line or piano left hand, which often marks the beat most clearly.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Study Specific Rhythm Patterns
            </Typography>
            <Typography variant="body1">
              Learn the common tango rhythm patterns (1-3-, 1234, etc.) and practice identifying them in the music.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020', borderBottom: '2px solid #872020', pb: 1 }}>
          The Reward
        </Typography>
        
        <Typography variant="body1" paragraph>
          Once you develop the ability to dance without obvious percussion, you gain:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              A deeper connection to the music&apos;s structure and expression
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              More freedom to interpret musical nuances beyond the beat
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              The ability to dance to a wider range of tango orchestras, including the more lyrical ones
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              A unique musicality that translates well to other dance forms
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}