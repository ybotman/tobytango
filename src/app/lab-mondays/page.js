import React from 'react';
import { Container, Typography } from '@mui/material';

export default function LabMondaysPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">TobyTango Lab Mondays</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is the TobyTango Lab Mondays page.
      </Typography>
    </Container>
  );
}