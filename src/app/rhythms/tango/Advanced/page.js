"use client";

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import AudioPlayer from '../../../components/shared/AudioPlayer';
import rhythmDescriptions from '../../../data/rhythmDescriptions';
import mp3Examples from '../../../data/mp3Examples';

export default function AdvancedRhythmsPage() {
  const [expanded, setExpanded] = useState(false);
  const audioPlayer = useAudioPlayer();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Currently only Syncopa is implemented, others are coming soon
  const rhythms = ['Syncopa', '332'];
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Advanced Rhythms
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Advanced rhythms incorporate syncopation, off-beats, and complex patterns that add sophistication 
        to tango dancing. These rhythms allow for more nuanced expression and musicality.
      </Typography>

      {rhythms.map(rhythm => {
        const isComingSoon = rhythm !== 'Syncopa';
        
        return (
          <Accordion 
            key={rhythm} 
            expanded={expanded === rhythm && !isComingSoon} 
            onChange={handleChange(rhythm)}
            disabled={isComingSoon}
            sx={{ 
              mb: 2,
              boxShadow: 2,
              '&:before': { display: 'none' },
              borderRadius: '4px',
              overflow: 'hidden',
              opacity: isComingSoon ? 0.7 : 1
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                bgcolor: 'rgba(0, 0, 0, 0.03)',
                borderBottom: expanded === rhythm && !isComingSoon ? '1px solid rgba(0, 0, 0, 0.125)' : 'none'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: expanded === rhythm && !isComingSoon ? 'bold' : 'normal' }}>
                {rhythm === '332' ? '332 Pattern' : rhythm}
                {isComingSoon && ' (Coming Soon)'}
              </Typography>
            </AccordionSummary>
            
            {!isComingSoon && (
              <AccordionDetails sx={{ pt: 3 }}>
                <Typography variant="body1" paragraph>
                  {rhythmDescriptions[rhythm] || 'A sophisticated tango rhythm pattern.'}
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
                  {rhythm === "Syncopa" && (
                    <>
                      <Box component="li" sx={{ mb: 1 }}>
                        <Typography variant="body1">
                          Emphasizing the &quot;and&quot; counts between main beats
                        </Typography>
                      </Box>
                      <Box component="li" sx={{ mb: 1 }}>
                        <Typography variant="body1">
                          Creating push-pull feelings with dynamic energy
                        </Typography>
                      </Box>
                      <Box component="li" sx={{ mb: 1 }}>
                        <Typography variant="body1">
                          Surprising accent placements that create tension
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
            )}
          </Accordion>
        );
      })}
    </Container>
  );
}