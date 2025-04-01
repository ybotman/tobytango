import React from 'react';
import { Container, Typography, Box, Paper, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MilongasPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Milongas: The Social Events of Tango
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        The milonga is the traditional social gathering where tango is danced. Understanding milonga etiquette and traditions enhances the experience for everyone and preserves the cultural heritage of tango.
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          What is a Milonga?
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          A milonga is both a type of music/dance and the name for the social event where tango is danced. As an event, a milonga typically features tandas (sets) of tango, vals, and milonga music, with cortinas (short musical breaks) between tandas to facilitate partner changes.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Milongas range from formal traditional events that closely follow Buenos Aires customs to more relaxed gatherings adapted to local cultures. Regardless of style, milongas are about community, connection, and the shared joy of tango.
        </Typography>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Milonga Etiquette
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Navigation & Floor Craft</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • Dance counter-clockwise around the floor (line of dance)
            </Typography>
            <Typography variant="body1" paragraph>
              • Maintain awareness of surrounding couples to avoid collisions
            </Typography>
            <Typography variant="body1" paragraph>
              • Don&apos;t pass couples unless there is ample space
            </Typography>
            <Typography variant="body1" paragraph>
              • Keep movements compact and appropriate for the floor density
            </Typography>
            <Typography variant="body1">
              • If a collision occurs, a simple apology and smile is appropriate
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Invitations to Dance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • The cabeceo (head nod) is the traditional way to invite someone to dance from across the room
            </Typography>
            <Typography variant="body1" paragraph>
              • This allows for discrete invitations and refusals without embarrassment
            </Typography>
            <Typography variant="body1" paragraph>
              • In less traditional settings, verbal invitations are common
            </Typography>
            <Typography variant="body1" paragraph>
              • Accept or decline invitations graciously
            </Typography>
            <Typography variant="body1">
              • A decline is for that tanda only, not for the entire evening
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Tandas & Cortinas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • A tanda consists of 3-4 songs of the same style and usually the same orchestra
            </Typography>
            <Typography variant="body1" paragraph>
              • The cortina (short non-tango music) signals the end of a tanda
            </Typography>
            <Typography variant="body1" paragraph>
              • It's customary to dance the full tanda with the same partner
            </Typography>
            <Typography variant="body1" paragraph>
              • Thank your partner after the tanda and escort them back near their seat
            </Typography>
            <Typography variant="body1">
              • Use the cortina to find a new partner or take a break
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">General Courtesy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              • Dress appropriately for the event (most milongas have a dress code)
            </Typography>
            <Typography variant="body1" paragraph>
              • Maintain good personal hygiene and consider bringing a change of shirt for longer events
            </Typography>
            <Typography variant="body1" paragraph>
              • Keep conversations on the dance floor brief
            </Typography>
            <Typography variant="body1" paragraph>
              • Avoid teaching on the dance floor during a milonga
            </Typography>
            <Typography variant="body1">
              • Respect the focus on dancing—save lengthy discussions for the breaks
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Types of Milongas
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Traditional Milongas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Traditional milongas closely follow Argentine customs. They typically feature:
            </Typography>
            <Typography variant="body1" paragraph>
              • Strict adherence to tandas and cortinas
            </Typography>
            <Typography variant="body1" paragraph>
              • Use of cabeceo for invitations
            </Typography>
            <Typography variant="body1" paragraph>
              • Traditional seating with men and women often in separate areas
            </Typography>
            <Typography variant="body1">
              • Classic tango music from the Golden Age (1935-1955)
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Relaxed/Informal Milongas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Many milongas outside Argentina adapt traditions to local culture:
            </Typography>
            <Typography variant="body1" paragraph>
              • More verbal invitations rather than cabeceo
            </Typography>
            <Typography variant="body1" paragraph>
              • Mixed seating rather than separate areas
            </Typography>
            <Typography variant="body1" paragraph>
              • More diverse music, sometimes including non-traditional or contemporary tango
            </Typography>
            <Typography variant="body1">
              • Sometimes include brief classes before the dancing begins
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Alternative/Nuevo Milongas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Some milongas cater to alternative styles:
            </Typography>
            <Typography variant="body1" paragraph>
              • Focus on tango nuevo or alternative movement vocabulary
            </Typography>
            <Typography variant="body1" paragraph>
              • More open floor patterns and creative navigation
            </Typography>
            <Typography variant="body1" paragraph>
              • Often feature non-traditional or electronic tango music
            </Typography>
            <Typography variant="body1">
              • Usually more relaxed dress codes and etiquette
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Marathons & Festivals</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Extended tango events have their own characteristics:
            </Typography>
            <Typography variant="body1" paragraph>
              • Marathons: 20+ hours of dancing over 2-3 days, often with balanced registration of roles
            </Typography>
            <Typography variant="body1" paragraph>
              • Festivals: Multiple days of workshops and evening milongas
            </Typography>
            <Typography variant="body1" paragraph>
              • Encuentros: Focus on social dancing in close embrace, often with invited participants
            </Typography>
            <Typography variant="body1">
              • Each has its own culture and expectations, often specified by organizers
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
}