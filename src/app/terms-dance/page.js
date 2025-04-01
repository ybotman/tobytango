import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DanceTermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Tango Dance Terms
      </Typography>

      <Box sx={{ my: 3 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">STEP</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Transfer of weight from one foot to another.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">SEQUENCE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A series of predefined steps. In Argentine Tango, sequences are primarily tools for learning rather than fixed dance routines.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">RHYTHM</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The choices of beats or sub-beats on which to step or move.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">CADENCIA</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The subtle, rhythmic quality of movement expressing musicality and connection. Often described as the natural sway or flow within Tango movement.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">MOVEMENTS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Tango movements can be broadly categorized as:
            </Typography>
            <Typography variant="body1">
              <strong>Linear:</strong> Movements in a straight line, typically forward, backward, or side steps.<br />
              <strong>Rotational:</strong> Movements involving pivots, turns, or circular actions, typically around the axis of the dancer or partnership.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

DanceTermsPage.propTypes = {};