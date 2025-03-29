import React from 'react';
import { Container, Typography } from '@mui/material';

export default function LabWorkshopPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">TobyTango Lab Workshop</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is the TobyTango Lab Workshop page.
      </Typography>
    </Container>
  );
}