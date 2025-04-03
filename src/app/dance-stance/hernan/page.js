'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  Divider
} from '@mui/material';
import Image from 'next/image';
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
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            color: '#872020',
            fontWeight: 'bold'
          }}
        >
          Relaxed Balance Exercise
        </Typography>
        
        <Typography variant="body1" paragraph>
          Hernan emphasizes the importance of relaxed, natural balance in tango. His technique shows how 
          standing on one foot in a relaxed state creates a natural curve or &quot;banana shape&quot; in the body&apos;s posture.
        </Typography>
        
        <Typography variant="body1" paragraph>
          <strong>Key points from Hernan&apos;s stance:</strong>
        </Typography>
        
        <Box component="ul" sx={{ pl: 2, mb: 3 }}>
          <Typography component="li" sx={{ mb: 1 }}>
            Allow your hips to find their natural position rather than forcing them
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            The banana-shaped curve from the front view is a sign of proper relaxed balance
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            Notice how the body naturally curves when standing on one foot in complete relaxation
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', height: 300, borderRadius: '8px', overflow: 'hidden' }}>
              <Image 
                src="/dance-stance/hernan-excersizeA-1.png"
                alt="Hernan Brizuela stance exercise position 1"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 1, fontStyle: 'italic' }}>
              Initial balanced position
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', height: 300, borderRadius: '8px', overflow: 'hidden' }}>
              <Image 
                src="/dance-stance/hernan-excersizeA-2.png"
                alt="Hernan Brizuela stance exercise position 2"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 1, fontStyle: 'italic' }}>
              Notice the natural curve forming
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', height: 300, borderRadius: '8px', overflow: 'hidden' }}>
              <Image 
                src="/dance-stance/hernan-excersizeA-3.png"
                alt="Hernan Brizuela stance exercise position 3"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 1, fontStyle: 'italic' }}>
              Complete &quot;banana shape&quot; in full relaxation
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
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
          variant="h5" 
          component="h2"
          gutterBottom
          sx={{ 
            color: '#872020',
            fontWeight: 'bold'
          }}
        >
          Applying This to Your Dance
        </Typography>
        
        <Typography variant="body1" paragraph>
          This exercise demonstrates one of the key principles in Hernan&apos;s approach to tango: 
          finding natural balance through relaxation rather than tension. The implications for your dancing include:
        </Typography>
        
        <Box component="ul" sx={{ pl: 2, mb: 3 }}>
          <Typography component="li" sx={{ mb: 1 }}>
            <strong>Don&apos;t force your hips</strong> - Allow them to find their natural position when standing on one leg
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            <strong>Embrace the natural curve</strong> - The &quot;banana shape&quot; is not a flaw but a sign of proper relaxed balance
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            <strong>Release unnecessary tension</strong> - Notice how the body automatically finds its optimal position
          </Typography>
          <Typography component="li" sx={{ mb: 1 }}>
            <strong>Improve partner connection</strong> - A relaxed frame allows for better communication between dancers
          </Typography>
        </Box>
        
        <Typography variant="body1">
          Practice this exercise regularly to develop an intuitive understanding of how your body naturally balances.
          This will translate directly into more fluid movement and better connection in your tango.
        </Typography>
      </Paper>
      
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
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            color: '#872020',
            fontWeight: 'bold'
          }}
        >
          Balance with Picado and Front Boleo
        </Typography>
        
        <Typography variant="body1" paragraph>
          Hernan demonstrates how to maintain balance while executing more advanced movements like the picado (sharp tap) 
          and front boleo. This exercise helps dancers integrate proper balance into dynamic movements.
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: 300, borderRadius: '8px', overflow: 'hidden' }}>
              <Image 
                src="/dance-stance/hernan-excersizeA-4.png"
                alt="Hernan Brizuela stance exercise position 4"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 1, fontStyle: 'italic' }}>
              Picado (sharp tap) while maintaining balance
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: 300, borderRadius: '8px', overflow: 'hidden' }}>
              <Image 
                src="/dance-stance/hernan-excersizeA-5.png"
                alt="Hernan Brizuela stance exercise position 5"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 1, fontStyle: 'italic' }}>
              Front boleo with proper balance control
            </Typography>
          </Grid>
        </Grid>
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