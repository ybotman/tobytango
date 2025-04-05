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

export default function MilongaRhythmsPage() {
  const [expanded, setExpanded] = useState(false);
  const audioPlayer = useAudioPlayer();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const rhythms = ['Lisa', 'Traspie', 'Contratiempo'];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Milonga Rhythms
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Milonga has its own distinct rhythm structures that differ from tango and vals. 
        These patterns range from simple walking beats to more complex syncopations, 
        providing dancers with various ways to interpret this energetic and playful style.
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
              {rhythm === "Lisa" ? "Milonga Lisa (Simple)" : 
               rhythm === "Traspie" ? "Milonga Traspie (Double Step)" : 
               rhythm === "Contratiempo" ? "Contratiempo (Off-beat Syncopation)" : rhythm}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 3 }}>
            <Typography variant="body1" paragraph>
              {rhythmDescriptions[rhythm] || getRhythmDescription(rhythm)}
            </Typography>

            <Grid container justifyContent="center" sx={{ my: 3 }}>
              <Grid sx={{ width: { xs: '100%', md: '80%', lg: '60%' } }}>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  {/* Placeholder for visualization image */}
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
              {rhythm === "Lisa" && (
                <>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Step per beat (on the strong beat)
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Feeling: Steady, grounded, like walking
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Use: Default milonga rhythm; great for musical clarity and floor navigation
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1" color="success.main" fontWeight="bold">
                      &quot;Lisa&quot; = Clean, simple walking beat. Always grounded.
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1" color="text.secondary" fontStyle="italic">
                      Audio examples for this rhythm pattern coming soon
                    </Typography>
                  </Box>
                </>
              )}
              {rhythm === "Traspie" && (
                <>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Quick-quick-slow pattern (usually two steps inside one beat + a pause)
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Feeling: Playful, bouncy, syncopated
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Use: Adds texture and variety, matches faster or more rhythmic sections
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1" color="warning.main" fontWeight="bold">
                      &quot;Traspie&quot; = literally &quot;stumble&quot; or &quot;trip&quot;, used to reflect syncopation or musical play
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1" color="text.secondary" fontStyle="italic">
                      Audio examples for this rhythm pattern coming soon
                    </Typography>
                  </Box>
                </>
              )}
              {rhythm === "Contratiempo" && (
                <>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Emphasizing the upbeat or the &quot;and&quot; between beats
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Feeling: Accentuates tension and lift
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      Use: More advanced, often used in moments of rhythmic contrast
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body1" color="primary.main" fontWeight="bold">
                      Feels like dancing &quot;in the cracks&quot; between the main beats
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

// Helper function to provide rhythm descriptions for milonga rhythms
function getRhythmDescription(rhythm) {
  switch(rhythm) {
    case "Lisa":
      return "The most fundamental milonga rhythm, characterized by its clean, simple walking beat. This rhythm provides a stable foundation for the dance, emphasizing strong beats with a steady, grounded feeling.";
    case "Traspie":
      return "A more playful, syncopated milonga rhythm featuring quick-quick-slow patterns. This 'double step' adds texture and variety to the dance, creating a bouncy, energetic quality perfect for more expressive movements.";
    case "Contratiempo":
      return "An advanced milonga rhythm that emphasizes the upbeats or spaces between main beats. This off-beat syncopation creates tension and lift in the dance, allowing for sophisticated musical interpretation in the spaces between regular pulses.";
    default:
      return "A fundamental milonga rhythm pattern.";
  }
}