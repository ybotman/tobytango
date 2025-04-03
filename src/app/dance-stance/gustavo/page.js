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

export default function GustavoStancePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>Gustavo Naveira&apos;s Dance Stance Analysis</Typography>
      
      <Typography variant="body1" paragraph>
        Gustavo Naveira is one of the most influential figures in modern tango, known for his analytical approach 
        to movement and exceptional technique. This page will analyze key stance elements from his performances.
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
            We are currently collecting and analyzing images of Gustavo Naveira&apos;s dance stance.
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
            Detailed images of Gustavo&apos;s stance and posture
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Analysis of his unique embrace technique
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Breakdown of weight distribution and axis control
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Observations on his partnering technique
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