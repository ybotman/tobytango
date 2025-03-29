import React from 'react';
import { Container, Typography } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">About Toby</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is the About Toby page.
      </Typography>
    </Container>
  );
}