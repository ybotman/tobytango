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
          Weekly Focus
        </Typography>
        <List>
          <ListItem><strong>Week 1:</strong> 6 classic rhythms. Finding beauty in fewer patterns with deeper musicality. Mastering the Long and None. Mapping patterns on selected songs.</ListItem>
          <ListItem><strong>Week 2:</strong> Integrate rhythms with systems and rotations.</ListItem>
          <ListItem><strong>Week 3:</strong> Combine rhythms, systems, and rotations in partnership.</ListItem>
          <ListItem><strong>Week 4:</strong> Combine everything, discovering orchestral magic.</ListItem>
        </List>
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
              <ListItem>Develop mutual `&#39;`Cadencia`&#39;`</ListItem>
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