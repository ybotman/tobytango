'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import Link from 'next/link';

export default function CarlitosStancePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>Carlitos Espinoza&apos;s Dance Stance Analysis</Typography>
      
      <Typography variant="body1" paragraph>
        Carlitos Espinoza is renowned for his elegant musicality and smooth, controlled movements.
        This page will analyze key stance elements from his performances.
      </Typography>
      
      <Alert 
        severity="info" 
        icon={<ConstructionIcon />}
        sx={{ 
          my: 4, 
          py: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h6" component="div" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography variant="body1">
            We are currently collecting and analyzing images of Carlitos Espinoza&apos;s dance stance.
            Check back later for a detailed breakdown of his technique and posture.
          </Typography>
        </Box>
      </Alert>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" gutterBottom>
          What to expect on this page:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" sx={{ mb: 1 }}>
            Detailed images of Carlitos&apos;s stance and posture
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Analysis of his precise footwork technique
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Breakdown of his connection in various embrace styles
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Observations on his musical interpretation through posture
          </Typography>
          <Typography component="li">
            Comparisons across different performances
          </Typography>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">
          In the meantime, you can check out our existing stance analysis for:
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Link href="/dance-stance/chicho" style={{ textDecoration: 'none' }}>
            <Paper 
              sx={{ 
                p: 2, 
                backgroundColor: '#4a4a4a', 
                color: 'white',
                '&:hover': {
                  backgroundColor: '#2a2a2a',
                }
              }}
            >
              <Typography variant="h6">Chicho Frumboli Stance Analysis</Typography>
            </Paper>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}