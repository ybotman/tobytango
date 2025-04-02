import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function TangoSummaryPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tango Rhythm Summary
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        These charts show the distribution and usage of the six fundamental tango rhythms.
      </Typography>

      <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Goals Distribution
        </Typography>
        <Box
          component="img"
          src="/rhythms/Goals-Distribution.png"
          alt="Tango Rhythms Goals Distribution Chart"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            boxShadow: 3,
            borderRadius: 1,
            mb: 2
          }}
        />
        <Typography variant="body2" sx={{ mt: 1, mb: 4 }}>
          Commentary coming soon
        </Typography>
      </Box>

      <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Time Type Distribution
        </Typography>
        <Box
          component="img"
          src="/rhythms/TimeType-Distribution.png"
          alt="Tango Rhythms Time Type Distribution Chart"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            boxShadow: 3,
            borderRadius: 1,
            mb: 2
          }}
        />
        <Typography variant="body2" sx={{ mt: 1, mb: 4 }}>
          Commentary coming soon
        </Typography>
      </Box>
    </Container>
  );
}