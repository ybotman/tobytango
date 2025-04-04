"use client";

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  useTheme
} from '@mui/material';

export default function TangoArtistsTimelinePage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tango Orchestras Timeline
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        This timeline shows the active periods of major Argentine tango orchestras throughout history,
        giving a visual representation of how different eras of tango music overlapped and evolved.
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          mt: 2, 
          mb: 4, 
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Argentine Tango Orchestras - Active Periods
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 2
          }}
        >
          <Box
            component="img"
            src="/Argentine Tango Orchestras Active.png"
            alt="Timeline of Argentine Tango Orchestras"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 1
            }}
          />
        </Box>
      </Paper>

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Understanding Tango Eras
      </Typography>
      
      <Typography variant="body1" paragraph>
        Tango music evolved through several distinct periods, each with characteristic styles, 
        orchestration, and rhythmic patterns:
      </Typography>
      
      <Box component="ul" sx={{ pl: 3 }}>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            <strong>Guardia Vieja (Old Guard, 1880s-1920s):</strong> The earliest formative period of tango, 
            featuring simpler arrangements with prominent rhythmic elements.
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            <strong>Guardia Nueva (New Guard, 1920s-1940s):</strong> A transformation toward more sophisticated 
            arrangements, with orchestras growing in size and complexity.
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            <strong>Golden Age (1940s-1950s):</strong> The pinnacle of tango's popularity and artistic development, 
            with distinctive orchestra styles fully formed.
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            <strong>Post-Golden Age (1950s-1960s):</strong> A period of experimentation and adaptation 
            as tango responded to changing musical tastes.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}