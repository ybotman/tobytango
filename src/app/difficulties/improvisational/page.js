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

export default function ImprovisationalPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#872020', fontWeight: 'bold' }}>
        The Challenge of Improvisation in Argentine Tango
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
        Argentine tango stands apart from most partnered dances because of its fundamentally improvisational nature.
        Instead of following choreographed routines, dancers create the dance in the moment, responding to the music,
        their partner, and the dance floor around them.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          What Makes Tango Improvisational
        </Typography>
        
        <List sx={{ pl: 2, mb: 3 }}>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>No Fixed Sequence:</strong> Unlike dances with a basic step pattern that repeats (waltz, salsa, swing), tango has infinite possible sequences</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>Moment-to-Moment Creation:</strong> Each step is led and followed individually, not as part of a predetermined figure</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>Musical Interpretation:</strong> The dance adapts to the specific phrasing, accents, and character of each piece of music</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>Environmental Responsiveness:</strong> Movement choices must adapt to constantly changing floor conditions and space</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body1"><strong>Spontaneous Dialogue:</strong> The dance is a conversation where both partners contribute to the emerging movement</Typography>}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          Why Improvisation Is Challenging
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For Leaders:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Box component="li">
                <Typography variant="body1">
                  Multitasking between planning, leading, navigating, and interpreting the music
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Making split-second decisions about what to lead next
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Managing floorcraft while maintaining musicality
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Adapting when a movement doesn&apos;t work as intended
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For Followers:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Box component="li">
                <Typography variant="body1">
                  Remaining present and responsive without anticipating or guessing
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Balancing technical precision with adaptability
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Processing leads in real-time without predetermined expectations
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Adding personal expression while honoring the leader&apos;s intention
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For All Dancers:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Box component="li">
                <Typography variant="body1">
                  Overcoming the fear of &quot;getting it wrong&quot; when there&apos;s no fixed choreography
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Developing musicality that informs spontaneous movement choices
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1">
                  Building enough technique to execute movements not known in advance
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          How to Develop Improvisational Skills
        </Typography>
        
        <Box component="ol" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Master the Fundamentals
            </Typography>
            <Typography variant="body1">
              Develop strong walking technique, balance, and connection—these are the foundation of all improvisation.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Build a Movement Vocabulary
            </Typography>
            <Typography variant="body1">
              Learn individual elements (steps, pivots, etc.) thoroughly so they become tools you can use spontaneously.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Practice Transitions
            </Typography>
            <Typography variant="body1">
              Focus on how to move smoothly between different elements rather than memorizing fixed combinations.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Develop Musicality
            </Typography>
            <Typography variant="body1">
              Listen to tango music analytically, identifying phrases, rhythms, and accents that can inspire movement.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Embrace Mistakes
            </Typography>
            <Typography variant="body1">
              View &quot;errors&quot; as opportunities for creativity—some of the best moments in tango come from unexpected directions.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Dance with Different Partners
            </Typography>
            <Typography variant="body1">
              Each partner brings different energy and responses, expanding your adaptability and improvisation skills.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020', borderBottom: '2px solid #872020', pb: 1 }}>
          The Rewards of Improvisation
        </Typography>
        
        <Typography variant="body1" paragraph>
          While improvisation makes tango challenging to learn, it also offers unique rewards:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Every Dance Is Unique:</strong> You&apos;ll never dance the same tango twice
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Deeper Musical Connection:</strong> Your dancing can respond precisely to the nuances of each piece
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>True Partnership:</strong> The dance emerges from the connection between both people, not from memorized steps
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Endless Creativity:</strong> There&apos;s no limit to what you can express as your skills grow
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Present Moment Awareness:</strong> Improvisation demands and cultivates mindfulness and presence
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mt: 3, fontStyle: 'italic' }}>
          The improvisational nature of tango is both its greatest challenge and its most profound gift. 
          By embracing the uncertainty and developing your capacity to create in the moment, 
          you&apos;ll discover a form of expression unlike any other dance.
        </Typography>
      </Box>
    </Container>
  );
}