import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function TangoIsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        What Tango Is
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Understanding the essence of Argentine Tango helps dancers appreciate its depth and beauty. Here we explore what makes tango the special dance that has captivated people worldwide for generations.
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          The Essence of Tango
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="A Dance of Connection" 
              secondary="At its core, tango is about the connection between partners. This connection is both physical and emotional, creating a unique conversation without words."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="An Improvised Dance" 
              secondary="Unlike choreographed dances, tango is improvised in the moment. Dancers respond to the music, the floor space, and each other's movements, creating a unique dance each time."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="A Musical Interpretation" 
              secondary="Tango is the physical embodiment of the music. Dancers interpret the melody, rhythm, and emotion of the orchestra through their movements."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="A Social Dance" 
              secondary="Tango evolved as a social dance where people connect with each other. The milonga (tango social event) is a community gathering where the dance is shared and celebrated."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="A Cultural Expression" 
              secondary="Tango carries the history and cultural heritage of Argentina and Uruguay. It embodies the influences of European immigrants, African rhythms, and the unique social conditions of early 20th century Buenos Aires."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="A Journey of Learning" 
              secondary="Tango is a lifelong journey. Even after decades, dancers continue to discover new dimensions, deeper connection, and greater musicality."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="An Embrace" 
              secondary="The embrace in tango (abrazo) is both a dance position and a metaphor for the connection between partners. It ranges from close and intimate to open and flexible, depending on the style and preference."
            />
          </ListItem>
        </List>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          The Beauty of Tango
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          Tango&apos;s beauty lies in its simplicity and complexity existing simultaneously. A dance that can be started with just walking together, yet can evolve into intricate movements that express deep emotions.
        </Typography>
        
        <Typography variant="body1" paragraph>
          When we understand what tango truly is—a connection, a conversation, a shared moment of musical interpretation—we approach the dance with respect for its traditions while finding our own expression within it.
        </Typography>
        
        <Typography variant="body1">
          This understanding helps us move away from treating tango as merely a collection of steps or figures to master, and instead embrace it as an organic, living dance that evolves with each partnership and each song.
        </Typography>
      </Paper>
    </Container>
  );
}