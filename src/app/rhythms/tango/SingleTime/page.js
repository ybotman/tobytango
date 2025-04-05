"use client";

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import AudioPlayer from '../../../components/shared/AudioPlayer';
import rhythmDescriptions from '../../../data/rhythmDescriptions';
import mp3Examples from '../../../data/mp3Examples';

export default function SingleTimePage() {
  const [expanded, setExpanded] = useState('1-3-');
  const audioPlayer = useAudioPlayer();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const rhythms = ['1-3-', '-2-4'];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Single Time Rhythms
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Single time rhythms contain only one or two beats per measure, creating a clear structure for basic tango steps.
        These rhythms form the foundation for tango dancing and provide essential patterns for musical interpretation.
      </Typography>

      {rhythms.map(rhythm => (
        <Accordion 
          key={rhythm} 
          expanded={expanded === rhythm} 
          onChange={handleChange(rhythm)}
          sx={{ 
            mb: 2,
            boxShadow: 2,
            '&:before': { display: 'none' },
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.03)',
              borderBottom: expanded === rhythm ? '1px solid rgba(0, 0, 0, 0.125)' : 'none'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: expanded === rhythm ? 'bold' : 'normal' }}>
              {rhythm === "-2-4" ? "OffBeat " + rhythm : rhythm}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 3 }}>
            <Typography variant="body1" paragraph>
              {rhythmDescriptions[rhythm] || 'A fundamental tango rhythm pattern.'}
            </Typography>

            <Grid container justifyContent="center" sx={{ my: 3 }}>
              <Grid sx={{ width: { xs: '100%', md: '80%', lg: '60%' } }}>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={`/rhythms/${rhythm}.png`}
                    alt={`Rhythm ${rhythm} visualization`}
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      boxShadow: 3,
                      borderRadius: 1
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 2 }}>
              Dancing with this Rhythm
            </Typography>
            
            <Typography variant="body1" paragraph>
              This rhythm creates a specific musical feeling that can be expressed in your dance through:
            </Typography>
            
            <Box component="ul" sx={{ pl: 3, mb: 4 }}>
              {rhythm === "1-3-" && (
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    The most common beat early to mid tango dancers use (often more than 60% of steps). We want to use other rhythm patterns more often. This is the first set of pulses we hear and are taught.
                  </Typography>
                </Box>
              )}
              {rhythm === "-2-4" && (
                <>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Emphasizing steps on the traditionally weaker beats (2 and 4)
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Creating contrast and syncopation against more traditional rhythm patterns
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {mp3Examples[rhythm] && mp3Examples[rhythm].length > 0 && (
              <>
                <Typography variant="h6" component="h3" sx={{ mt: 4, mb: 3 }}>
                  Musical Examples
                </Typography>
                
                <Grid container spacing={3}>
                  {mp3Examples[rhythm].map((example) => (
                    <Grid key={example.id} sx={{ width: '100%' }}>
                      <AudioPlayer 
                        example={example}
                        audioPlayer={audioPlayer}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}