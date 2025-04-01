import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function TangoSummaryPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tango Rhythm Summary
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        This chart shows the distribution and usage of the six fundamental tango rhythms.
      </Typography>

      <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
        <Box
          component="img"
          src="/rhythms/percentage.png"
          alt="Tango Rhythms Distribution Chart"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            boxShadow: 3,
            borderRadius: 1
          }}
        />
      </Box>

      <Typography variant="body1" sx={{ my: 4 }}>
              Key notes: <br /><br />
              The BLUE 1-3-.  Over is an over used pattern.<br />
              The BLUE ---- is way under used!<br />
<br />
              Then notice the GREEN (goals) is much more generally &apos;distributed&apos;
              
      </Typography>
    </Container>
  );
}