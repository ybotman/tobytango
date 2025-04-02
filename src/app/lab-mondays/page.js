import React from 'react';
import { Container, Typography, Box, List, ListItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function LabMondaysPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        TobyTango Lab Mondays
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome to TobyTango Lab Mondays – a dedicated space to explore the musicality and movement of tango. Each week, we focus on different aspects of tango dancing.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Monthly Program
        </Typography>
        
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Week 1: The Classic Rhythms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Exploring the six classic tango rhythms and finding beauty in fewer patterns with deeper musicality. 
              We&apos;ll master the Long and None rhythms and map patterns on selected songs.
            </Typography>
            <Typography paragraph>
              <strong>Focus:</strong> Single, Doubles, and Zero rhythms - understanding their distinct character and how they form the backbone of tango musical expression.
            </Typography>
            <Typography paragraph>
              <strong>Featured Music:</strong> Di Sarli&apos;s &quot;El Amanecer&quot; / &quot;El Flete&quot; and D&apos;Arienzo&apos;s &quot;Dime Mi Amor&quot;
            </Typography>
            <Typography>
              We&apos;ll discover how these iconic pieces showcase the fundamental tango rhythms and create a foundation for musical expression.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Week 2: Systems and Rotations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Building on our rhythm work, we&apos;ll integrate these patterns with two movement systems and the two rotation types.
            </Typography>
            <Typography paragraph>
              <strong>Focus:</strong> Moving fluidly between different systems while maintaining rhythmic clarity. 
              Exploring how rotational movements can express the music&apos;s character.
            </Typography>
            <Typography>
              We&apos;ll continue working with the same songs as Week 1, deepening our understanding of how movement systems 
              enhance our musical interpretation.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Week 3: Communication and Togetherness</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              This week focuses on exploring communication and togetherness in the dance partnership.
            </Typography>
            <Typography paragraph>
              We&apos;ll work on how partners can maintain connection while executing complex rhythmic patterns, 
              and develop a shared sense of musical interpretation.
            </Typography>
            <Typography>
              The emphasis will be on collaborative expression and developing mutual &quot;Cadencia&quot; - 
              the flowing quality that makes tango partnerships magical.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Week 4: Finding Musicality</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              The culmination of our month&apos;s work: discovering orchestral magic by combining rhythms, 
              systems, rotations, and partnership skills.
            </Typography>
            <Typography paragraph>
              <strong>Focus:</strong> Identifying and responding to orchestral voices, understanding the 
              layered complexity of tango music, and developing a personal approach to musicality.
            </Typography>
            <Typography>
              We&apos;ll explore how different orchestras present unique opportunities for expression, 
              and how to adapt your dancing to showcase the character of each piece.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Other Topics Covered:
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Phrasing and Musical Expression</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>Explore pulses</ListItem>
              <ListItem>Understand orchestral phrasing</ListItem>
              <ListItem>Discover spontaneous patterns</ListItem>
              <ListItem>Explore alternative rhythms and phrasing (advanced)</ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Systems – Directions – Movements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>Dynamically explore musical systems</ListItem>
              <ListItem>Merge linear and rotational movements</ListItem>
              <ListItem>Integrate familiar patterns</ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Partnership and Fluidity</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>Collaboration focus</ListItem>
              <ListItem>Expand shared expression</ListItem>
              <ListItem>Develop mutual &quot;Cadencia&quot;</ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>The Iconic Orchestras</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>Explore pulses in different styles</ListItem>
              <ListItem>Understand layers in classic pieces</ListItem>
              <ListItem>Discover hidden musical structures</ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Container>
  );
}