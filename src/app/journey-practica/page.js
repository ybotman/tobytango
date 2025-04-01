import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

export default function JourneyPracticaPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Journey Practice
      </Typography>
      
      <Box 
        component="img"
        src="/navigation/journey-practica.png"
        alt="Journey Practice"
        sx={{
          width: '100%',
          maxHeight: 250,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 4
        }}
      />
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Our Hope
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>
          Our journey practica is designed to create a supportive environment where dancers can focus on personal growth and exploration. We believe that a dedicated practice space allows tango dancers to develop musicality, connection, and technique in a more intentional way.
        </Typography>
        <Typography variant="body1">
          By providing a structured yet flexible format, we hope to foster a community of learners who support each other&apos;s tango journey, regardless of level or experience. This is a space where questions are welcomed, experimentation is encouraged, and growth is celebrated.
        </Typography>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Practica Guidelines
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>
          Our journey practica follows these guidelines to ensure a productive and respectful environment for all participants:
        </Typography>
        
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Focus on Learning:</strong> This is a space for intentional practice, not a social dance event. Feel free to stop, discuss, and work on elements of the dance.
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Respectful Feedback:</strong> Offer and receive feedback in a constructive, kind manner. Ask before giving unsolicited advice.
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Inclusive Atmosphere:</strong> Welcome dancers of all levels and backgrounds. Rotate partners regularly to learn from different perspectives.
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Mindful Floor Craft:</strong> Practice navigating the floor and being aware of other couples, an essential skill for milongas.
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>Music Exploration:</strong> We&apos;ll provide a variety of music to practice different rhythms, tempos, and orchestras.
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(144, 202, 249, 0.1)', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
            Details about our upcoming Journey Practica sessions, including dates, times, and location, will be announced soon. Check back for updates!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}