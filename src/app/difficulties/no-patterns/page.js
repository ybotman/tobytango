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

export default function NoPatternsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#872020', fontWeight: 'bold' }}>
        The Challenge: No Standard Patterns
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
        One of the most significant difficulties for tango beginners is that, unlike many other partner dances,
        Argentine tango does not rely on fixed step patterns that can be memorized and repeated.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          Traditional Dance Learning vs. Tango
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            In most partner dances:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">Basic steps form a repeatable pattern (e.g., "step-step-close" in waltz)</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">You learn figures that have a fixed sequence of movements</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">Each figure has a standard entry and exit</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">Leaders learn to chain patterns together in a predictable way</Typography>}
              />
            </ListItem>
          </List>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="h6" gutterBottom>
            In Argentine tango:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">There is no basic step pattern that repeats predictably</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">Movement is improvised based on principles rather than set sequences</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">The dance is built from individual elements that can be combined in countless ways</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">Every step must be led and followed in the moment</Typography>}
              />
            </ListItem>
          </List>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          Why This Is Challenging
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Cognitive Overload
            </Typography>
            <Typography variant="body1">
              Beginners can&apos;t rely on muscle memory from repeated patterns, so they must think about each step.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Different Learning Curve
            </Typography>
            <Typography variant="body1">
              Progress feels slower initially because you&apos;re learning a system rather than sequences.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Feels Less Structured
            </Typography>
            <Typography variant="body1">
              The open-ended nature can feel chaotic or overwhelming compared to pattern-based dances.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              More Responsibility
            </Typography>
            <Typography variant="body1">
              Leaders must create the dance in real-time; followers must interpret and respond to unpredictable leads.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          How to Approach Learning Without Patterns
        </Typography>
        
        <Box component="ol" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Focus on Building Blocks, Not Figures
            </Typography>
            <Typography variant="body1">
              Learn individual steps, pivots, and weight changes as separate elements that can be combined freely.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Understand the Connection System
            </Typography>
            <Typography variant="body1">
              Study how the embrace communicates movement intentions between partners—this is the true structure of tango.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Develop Strong Fundamentals
            </Typography>
            <Typography variant="body1">
              Master walking, axis, embrace, and dissociation before worrying about complex movements.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Embrace Improvisation Gradually
            </Typography>
            <Typography variant="body1">
              Start with simple combinations and slowly increase your repertoire of movements and transitions.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Practice Navigation
            </Typography>
            <Typography variant="body1">
              Learn to adapt your movements to the available space and other couples, which is a core skill in tango.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020', borderBottom: '2px solid #872020', pb: 1 }}>
          The Reward
        </Typography>
        
        <Typography variant="body1" paragraph>
          Though challenging at first, the lack of fixed patterns in tango offers profound benefits:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>True Improvisation:</strong> The freedom to create unique dances every time
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Deep Connection:</strong> A more intimate communication between partners
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Musical Expression:</strong> The ability to respond directly to what you hear in the music
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Endless Growth:</strong> No ceiling to your development as there are always new possibilities
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Personal Style:</strong> The opportunity to develop your own distinctive approach to the dance
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mt: 3, fontStyle: 'italic' }}>
          Remember that this aspect of tango that initially makes it difficult is ultimately what makes it so rewarding.
          The lack of patterns isn&apos;t a limitation—it&apos;s the source of tango&apos;s endless depth and appeal.
        </Typography>
      </Box>
    </Container>
  );
}