import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

export default function JourneyPracticaPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Journey Practice
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Coming Soon
          </Typography>
          
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            We&apos;re preparing a special practice journey for your tango development.
            Check back soon for updates on this exciting new program.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}