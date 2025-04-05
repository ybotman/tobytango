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

export default function NoOneInChargePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#872020', fontWeight: 'bold' }}>
        The Challenge: No One in Charge
      </Typography>

      <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
        Unlike many other dance traditions, Argentine tango lacks centralized authority, standardized certification, or an official governing body.
        This unique characteristic creates both freedoms and challenges for dancers at all levels.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          How Tango Differs from Other Dances
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Many dance forms have centralized authorities:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1"><strong>Ballroom:</strong> Has governing bodies like the World Dance Council with standardized syllabus and competition rules</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1"><strong>Ballet:</strong> Follows established techniques (Vaganova, Cecchetti, RAD) with structured progression and examinations</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1"><strong>Salsa:</strong> Has recognized congress circuits and style lineages (LA, NY, Cuban) with identifiable standards</Typography>}
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
                primary={<Typography variant="body1">No single organization determines what is &quot;correct&quot; tango</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">No standardized curriculum or syllabus exists across all teachers</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">Multiple valid styles and approaches coexist (salon, milonguero, nuevo, etc.)</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">No official certification process for instructors</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">Different communities may have different customs and expectations</Typography>}
              />
            </ListItem>
          </List>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          Why This Creates Challenges
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For Beginners:
            </Typography>
            <Typography variant="body1">
              No clear roadmap for progression or universal agreement on what to learn first.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For Intermediate Dancers:
            </Typography>
            <Typography variant="body1">
              Contradictory guidance from different teachers can cause confusion or stalled progress.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For Advanced Dancers:
            </Typography>
            <Typography variant="body1">
              Difficulty in objectively assessing one&apos;s own level or identifying areas for improvement.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For Teachers:
            </Typography>
            <Typography variant="body1">
              No established credentials or training standards to validate teaching authority.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              For Communities:
            </Typography>
            <Typography variant="body1">
              Potential for fragmentation, cliques, or conflicts between different approaches.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(135, 32, 32, 0.05)', borderLeft: '4px solid #872020' }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020' }}>
          How to Navigate This Challenge
        </Typography>
        
        <Box component="ol" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Seek Multiple Perspectives
            </Typography>
            <Typography variant="body1">
              Learn from various teachers rather than following only one approach. This helps you develop a more complete understanding.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Focus on Principles Over Rules
            </Typography>
            <Typography variant="body1">
              Rather than looking for &quot;the right way,&quot; understand the underlying principles that make movements work.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Develop Critical Thinking
            </Typography>
            <Typography variant="body1">
              Question what you&apos;re taught and assess whether it works for your body and dance goals.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Respect Different Styles
            </Typography>
            <Typography variant="body1">
              Recognize that close-embrace milonguero, salon style, and nuevo approaches all have valid contexts and practitioners.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Connect with Experienced Dancers
            </Typography>
            <Typography variant="body1">
              Dance with and observe those who have been in the community for many years, learning from their experience.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Study Tango History
            </Typography>
            <Typography variant="body1">
              Understanding the evolution of tango helps contextualize different approaches and techniques.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#872020', borderBottom: '2px solid #872020', pb: 1 }}>
          The Hidden Benefit
        </Typography>
        
        <Typography variant="body1" paragraph>
          The lack of central authority in tango is not just a challenge—it&apos;s also one of its greatest strengths:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Creative Freedom:</strong> Without rigid rules, dancers can develop personal styles and expressions
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Cultural Diversity:</strong> Tango communities worldwide develop unique characteristics while maintaining core principles
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Continuous Evolution:</strong> The dance remains alive and evolving rather than frozen in a standardized form
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Personal Journey:</strong> Each dancer must find their own path, leading to deeper engagement and ownership
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Accessibility:</strong> Without certification requirements, passionate dancers from all backgrounds can share their knowledge
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mt: 3, fontStyle: 'italic' }}>
          The decentralized nature of tango requires more from each dancer—more responsibility, more discernment, 
          and more active participation in shaping your own learning. While initially challenging, this ultimately 
          creates more independent, thoughtful, and creative dancers.
        </Typography>
      </Box>
    </Container>
  );
}