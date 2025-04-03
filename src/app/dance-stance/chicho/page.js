'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import Link from 'next/link';

export default function ChichoStancePage() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const imageList = [
    {
      id: 'panel1',
      title: 'Chicho Todo Milonga Stance 1',
      imgSrc: '/dance-stance/chicho-todo-milonga-1.png',
      description: 'Close embrace position with proper alignment shown during Todo Milonga.'
    },
    {
      id: 'panel2',
      title: 'Chicho Todo Milonga Stance 2',
      imgSrc: '/dance-stance/chicho-todo-milonga-2.png',
      description: 'Posture during turn sequence with weight properly distributed.'
    },
    {
      id: 'panel3',
      title: 'Chicho Todo Milonga Stance 3',
      imgSrc: '/dance-stance/chicho-todo-milonga-3.png',
      description: 'Dynamic movement showing frame maintenance during complex figure.'
    },
    {
      id: 'panel4',
      title: 'Chicho Todo Milonga Stance 4',
      imgSrc: '/dance-stance/chicho-todo-milonga-4.png',
      description: 'Open embrace showing upper body connection while maintaining space.'
    },
    {
      id: 'panel5',
      title: 'Chicho Todo Milonga Stance 5',
      imgSrc: '/dance-stance/chicho-todo-milonga-5.png',
      description: 'Final position demonstrating balance and proper weight placement.'
    }
  ];

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
          Chicho&apos;s Dance Stance Analysis
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
          Mariano &quot;Chicho&quot; Frumboli is known for his powerful, dynamic style with excellent posture and frame. 
          This page analyzes key stance elements from his Todo Milonga performance.
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
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Note: Images are captured from public performances for educational purposes. 
          Study these reference images to improve your own tango stance and posture.
        </Typography>
      </Paper>
      
      <Box sx={{ mt: 4 }}>
        {imageList.map((item) => (
          <Accordion 
            key={item.id}
            expanded={expanded === item.id} 
            onChange={handleChange(item.id)}
            sx={{ 
              mb: 2,
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              '&.Mui-expanded': {
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              },
              background: expanded === item.id ? 'linear-gradient(to right, #f7f7f7, #ffffff)' : '#ffffff'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#872020' }} />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
              sx={{
                backgroundColor: expanded === item.id ? 'rgba(135, 32, 32, 0.08)' : 'transparent',
                borderLeft: expanded === item.id ? '4px solid #872020' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(135, 32, 32, 0.08)',
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#333',
                  fontWeight: expanded === item.id ? 'bold' : 'normal'
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: { xs: '250px', sm: '350px', md: '450px' },
                    mb: 2,
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image 
                      src={item.imgSrc} 
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                    />
                  </div>
                </Box>
                <Typography variant="body1">
                  {item.description}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      
      <Box 
        sx={{ 
          mt: 4, 
          p: 3, 
          backgroundColor: 'rgba(135, 32, 32, 0.05)', 
          borderRadius: 2,
          borderLeft: '4px solid #872020'
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
          Key Stance Elements to Observe:
        </Typography>
        <Box component="ul" sx={{ pl: 2, fontFamily: 'inherit' }}>
          {[
            'Postural alignment through spine and neck',
            'Weight distribution and balance',
            'Frame maintenance during movement',
            'Connection points between partners',
            'Grounding and floor contact'
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
      </Box>
      
      <Box sx={{ mt: 5, mb: 3 }}>
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
          Other Dancers (Coming Soon):
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 2,
            mt: 3
          }}
        >
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
          <Link href="/dance-stance/hernan" style={{ textDecoration: 'none', flexGrow: 1, flexBasis: '33%' }}>
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
              <Typography variant="h6" sx={{ mb: 1 }}>Hernan Brizuela</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Exceptional footwork and rhythm
              </Typography>
            </Paper>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}