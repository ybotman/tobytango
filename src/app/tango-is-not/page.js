import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

export default function TangoIsNotPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        What Tango Is NOT
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Understanding what tango is not can be just as valuable as knowing what it is. This helps new dancers avoid common misconceptions and approach the dance with the right mindset.
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Common Misconceptions
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <NotInterestedIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Not About Memorized Sequences" 
              secondary="Tango is not about memorizing long sequences of steps. While sequences can be useful learning tools, authentic tango is improvised in the moment, responding to the music and partnership."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <NotInterestedIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Not About Showing-off" 
              secondary="Tango is not about showing off (even if competing) to an audiance or to other dancers. The focus should be on the connection with your partner and the music, not on impressing others."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <NotInterestedIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Not Ballroom Tango" 
              secondary="Argentine Tango is distinct from ballroom tango. They share a name but have different techniques, music, embrace, and philosophy. Ballroom tango is standardized with specific steps; Argentine tango is improvised."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <NotInterestedIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Not About Exaggerated Movements" 
              secondary="Social tango is not about dramatic poses, kicks, or exaggerated movements seen in stage performances. Those elements are choreographed for shows, while social tango is more subtle and intimate."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <NotInterestedIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Not Limited to One Style" 
              secondary="Tango is not limited to one 'correct' style. There are various styles (salon, milonguero, nuevo, etc.) each with their own characteristics. Each is valid in its appropriate context."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <NotInterestedIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Not Just a Dance" 
              secondary="Tango is not just a dance but a cultural system that includes the music, poetry, social customs, and history. Understanding these elements enriches the dance experience."
            />
          </ListItem>
          
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <NotInterestedIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Not a Dance of Tension" 
              secondary="While tango requires tone and presence, it should not create tension in the body. Effective tango feels comfortable and sustainable, not strained or forced."
            />
          </ListItem>
        </List>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Moving Beyond Misconceptions
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          By understanding what tango is not, we can more clearly see what it truly is. This clarity helps dancers approach tango with respect for its traditions while finding their own authentic expression within the dance.
        </Typography>

        
        <Typography variant="body1">
          Embracing tango as an improvised dance of connection, rather than a performance of memorized steps, opens the door to a more fulfilling and sustainable tango journey.
        </Typography>
      </Paper>
    </Container>
  );
}