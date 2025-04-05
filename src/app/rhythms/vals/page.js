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
import useAudioPlayer from '../../hooks/useAudioPlayer';
import AudioPlayer from '../../components/shared/AudioPlayer';
import rhythmDescriptions from '../../data/rhythmDescriptions';
import mp3Examples from '../../data/mp3Examples';

export default function ValsRhythmsPage() {
  const [expanded, setExpanded] = useState(false);
  const audioPlayer = useAudioPlayer();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const rhythms = ['1--', '12-', '1-3'];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Vals Rhythms
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Vals rhythms have a distinct 3/4 time signature, creating a flowing, waltz-like quality. 
        These patterns allow dancers to express the more lyrical and romantic qualities of tango music.
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
              {rhythm === "1--" ? "The One " + rhythm : 
               rhythm === "12-" ? "The OneTwo " + rhythm : 
               rhythm === "1-3" ? "The ThreeOne " + rhythm : rhythm}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 3 }}>
            <Typography variant="body1" paragraph>
              {rhythmDescriptions[rhythm] || getRhythmDescription(rhythm)}
            </Typography>

            <Grid container justifyContent="center" sx={{ my: 3 }}>
              <Grid sx={{ width: { xs: '100%', md: '80%', lg: '60%' } }}>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  {/* Conditionally display image if available */}
                  {isImageAvailable(rhythm) ? (
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
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0,0,0,0.05)',
                        borderRadius: 1
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Rhythm visualization coming soon
                      </Typography>
                    </Box>
                  )}
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
              {rhythm === "1--" && (
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    Emphasizing the strong downbeat (beat 1) of each vals measure with a clear step, creating a smooth, flowing quality
                  </Typography>
                </Box>
              )}
              {rhythm === "12-" && (
                <>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Creating a driving, forward momentum by stepping on beats 1 and 2, while leaving space on beat 3
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Using quick-quick-slow patterns that give vals its characteristic lilt
                    </Typography>
                  </Box>
                </>
              )}
              {rhythm === "1-3" && (
                <>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Creating a distinctive swing feel by emphasizing beats 1 and 3, with a pause on beat 2
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Allowing for expressive, elongated movements between the beats
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1" color="text.secondary" fontStyle="italic">
                      Audio examples for this rhythm pattern coming soon
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

// Helper function to check if an image is likely available
function isImageAvailable(rhythm) {
  // This is a placeholder - in reality you might want to check if files exist
  return false; // Set to false for now as we don't have images yet
}

// Helper function to provide rhythm descriptions for vals rhythms not in the main descriptions file
function getRhythmDescription(rhythm) {
  switch(rhythm) {
    case "1--":
      return "The simplest vals rhythm pattern, emphasizing just the first beat of each measure. This creates a graceful, flowing movement perfect for beginners learning the vals rhythm.";
    case "12-":
      return "A common vals pattern with emphasis on the first and second beats, creating a forward momentum that drives the dance. This pattern helps dancers connect to the waltz-like quality of the music.";
    case "1-3":
      return "A more sophisticated vals pattern emphasizing the first and third beats. This creates a distinctive swing feel that allows for more expressive movements between accents.";
    default:
      return "A fundamental vals rhythm pattern.";
  }
}