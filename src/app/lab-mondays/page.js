import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box, List, ListItem } from '@mui/material';

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
        <Typography variant="h5" component="h2" gutterBottom>
          Phrasing and the 6 Rhythms
        </Typography>
        <List>
          <ListItem>- Explore hearing (and dancing) to ‘pulses’.</ListItem>
          <ListItem>- Explore the musical phrasing of the orchestras.</ListItem>
          <ListItem>- Discover your personal ‘spontaneous’ patterns.</ListItem>
          <ListItem>- The more advance might explore alternaitve rhythms and phrasing.</ListItem>
        </List>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Systems - Directions - Movements
        </Typography>
        <List>
          <ListItem>- Dynamically explore the 2 systems in the music.</ListItem>
          <ListItem>- Merge linear and rotational movements (via systems).</ListItem>
          <ListItem>- Integrate with patterns you already know.</ListItem>
        </List>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Partnership and Fluidity
        </Typography>
        <List>
          <ListItem>- Focus on shared collaboration.</ListItem>
          <ListItem>- Expand your shared expression.</ListItem>
          <ListItem>- Find you and your partner’s ‘Cadencia’.</ListItem>
        </List>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          The Iconic Orchestras
        </Typography>
        <List>
          <ListItem>- Explore and exercise the pulses in the 3 styles.</ListItem>
          <ListItem>- Hear the many layers of the classic pieces.</ListItem>
          <ListItem>- Discover hidden structures and layers.</ListItem>
        </List>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Weekly Focus
        </Typography>
        <List>
          <ListItem>
            - <strong>Week 1:</strong> Focus on the 6 classic rhythms.
          </ListItem>
          <ListItem>
            - <strong>Week 2:</strong> Add Week 1 focus to systems and rotations.
          </ListItem>
          <ListItem>
            - <strong>Week 3:</strong> Integrate the 6 rhythms with the 2 systems/rotations into partnership.
          </ListItem>
          <ListItem>
            - <strong>Week 4:</strong> Combine everything with the orchestras – your magic moment.
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

LabMondaysPage.propTypes = {};