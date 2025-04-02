import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function FavoriteVideosPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>My Favorite Tango Videos</Typography>
      
      <Typography variant="body1" paragraph>
        A collection of my favorite Argentine tango performances that showcase extraordinary musicality, connection, and creativity.
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Legendary Performances</Typography>
        
        <Box component="ul" sx={{ pl: 4 }}>
          <Box component="li" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Gustavo Naveira, Gisele Anne, Chicho Frumboli & Juana Sepulveda</Typography>
            <Box sx={{ mb: 1 }}>
              <a 
                href="https://www.youtube.com/watch?v=aWtIKU8x8e0&t=82s" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#4caf50", fontWeight: "bold" }}
              >
                Gustavo Naveira, Gisele Anne, &quot;Chicho&quot; Frumboli & Juana Sepulveda - CSTW 2017
              </a>
            </Box>
            <Typography variant="body2">
              A remarkable collaboration between two of the most influential tango couples, showcasing their distinctive styles and mutual respect.
            </Typography>
          </Box>
          
          <Box component="li" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Tymoteusz Ley and Panagiotis Triantafyll</Typography>
            <Box sx={{ mb: 1 }}>
              <a 
                href="https://youtu.be/rQZ40DS42gc?si=7IG6MGtWSmG57BDn" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#4caf50", fontWeight: "bold" }}
              >
                Tymoteusz Ley and Panagiotis Triantafyllou - Believer
              </a>
            </Box>
            <Typography variant="body2">
              A stunning modern interpretation that brings fresh energy and perspective to tango while honoring its traditional roots.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}