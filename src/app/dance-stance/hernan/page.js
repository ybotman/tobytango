'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Alert,
  Divider
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import Link from 'next/link';

export default function HernanStancePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, borderBottom: '2px solid #872020', pb: 2 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#872020',
            fontWeight: 'bold'
          }}
        >
          Hernan Brizuela&apos;s Dance Stance Analysis
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
          Hernan Brizuela is known for his exceptional footwork, rhythm, and connection with his partners.
          His performances demonstrate precise musicality and elegant posture.
        </Typography>
      </Box>
      
      <Alert 
        severity="info" 
        icon={<ConstructionIcon sx={{ color: '#872020' }} />}
        sx={{ 
          my: 4, 
          py: 3,
          display: 'flex',
          alignItems: 'center',
          border: '1px solid rgba(135, 32, 32, 0.3)',
          backgroundColor: 'rgba(135, 32, 32, 0.05)'
        }}
      >
        <Box>
          <Typography 
            variant="h6" 
            component="div" 
            gutterBottom
            sx={{ color: '#872020', fontWeight: 'bold' }}
          >
            Coming Soon!
          </Typography>
          <Typography variant="body1">
            We are currently collecting and analyzing images of Hernan Brizuela&apos;s dance stance.
            Check back later for a detailed breakdown of his technique and posture.
          </Typography>
        </Box>
      </Alert>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          backgroundColor: 'rgba(135, 32, 32, 0.05)',
          borderLeft: '4px solid #872020',
          borderRadius: '4px'
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            color: '#872020',
            fontWeight: 'bold'
          }}
        >
          What to expect on this page:
        </Typography>
        <Box component="ul" sx={{ pl: 2, fontFamily: 'inherit' }}>
          {[
            'Detailed images of Hernan&apos;s embrace and axis',
            'Analysis of his musical interpretation through movement',
            'Breakdown of his precise footwork technique',
            'Examination of his connection with different partners',
            'Observations on his balance and weight transfer'
          ].map((item, index) => (
            <Typography 
              component="li" 
              key={index} 
              sx={{ 
                mb: 1,
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Paper>
      
      <Divider sx={{ my: 4, borderColor: 'rgba(135, 32, 32, 0.3)' }} />
      
      <Box sx={{ mt: 3, mb: 5 }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            color: '#872020',
            fontWeight: 'bold',
            borderBottom: '2px solid #872020',
            pb: 1
          }}
        >
          Explore Other Dancers:
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 2,
            mt: 3
          }}
        >
          <Link href="/dance-stance/chicho" style={{ textDecoration: 'none', flexGrow: 1, flexBasis: '33%' }}>
            <Paper 
              sx={{ 
                p: 2, 
                height: '100%',
                backgroundColor: '#872020', 
                color: 'white',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#6e1a1a',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 10px rgba(0,0,0,0.15)'
                }
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>Chicho Frumboli</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Powerful, dynamic style with excellent posture
              </Typography>
            </Paper>
          </Link>
          <Link href="/dance-stance/carlitos" style={{ textDecoration: 'none', flexGrow: 1, flexBasis: '33%' }}>
            <Paper 
              sx={{ 
                p: 2,
                height: '100%',
                backgroundColor: '#872020', 
                color: 'white',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#6e1a1a',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 10px rgba(0,0,0,0.15)'
                }
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>Carlitos Espinoza</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Elegant musicality with smooth movements
              </Typography>
            </Paper>
          </Link>
          <Link href="/dance-stance/gustavo" style={{ textDecoration: 'none', flexGrow: 1, flexBasis: '33%' }}>
            <Paper 
              sx={{ 
                p: 2,
                height: '100%',
                backgroundColor: '#872020', 
                color: 'white',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#6e1a1a',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 10px rgba(0,0,0,0.15)'
                }
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>Gustavo Naveira</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Analytical approach with exceptional technique
              </Typography>
            </Paper>
          </Link>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          mt: 5, 
          p: 3, 
          backgroundColor: 'rgba(135, 32, 32, 0.05)', 
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Please note: All stance analyses are provided for educational purposes to help dancers
          understand different techniques and approaches to Argentine tango.
        </Typography>
      </Box>
    </Container>
  );
}