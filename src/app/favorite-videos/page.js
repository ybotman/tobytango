import React from 'react';
import { Container, Typography } from '@mui/material';

export default function FavoriteVideosPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4">My Favorite Tango Videos</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is the page for My Favorite Tango Videos.
      </Typography>
    </Container>
  );
}