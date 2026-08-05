import React from 'react';
import { Container, Typography, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { FESTIVALS } from '@/lib/festival-access';

// The nav's "Festival" group points here, so this route has to exist or the
// header links to a 404. Listing the festivals is safe: each one is gated, and
// this page carries the same noindex header as everything under /festival/*.
export const metadata = {
  title: 'Festival Archives',
  robots: { index: false, follow: false },
};

export default function FestivalIndexPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>Festival Archives</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Workshop recordings, shared with the people who were in the room. Each
        archive asks for your email before it opens.
      </Typography>

      <Paper variant="outlined">
        <List disablePadding>
          {FESTIVALS.map((f) => (
            <ListItem key={f.key} disablePadding>
              {/* Plain href, not component={Link}: this is a server component and
                  next/link cannot be passed across the boundary as a prop. */}
              <ListItemButton href={`/festival/${f.key}`}>
                <ListItemText primary={f.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
