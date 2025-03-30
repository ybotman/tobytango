import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box } from '@mui/material';

export default function DanceTermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Tango Dance Terms
      </Typography>

      <Box sx={{ my: 3 }}>
        <Typography variant="h5" gutterBottom>
          STEP
        </Typography>
        <Typography variant="body1">
          Transfer of weight from one foot to another.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h5" gutterBottom>
          SEQUENCE
        </Typography>
        <Typography variant="body1">
          A series of predefined steps. In Argentine Tango, sequences are primarily tools for learning rather than fixed dance routines.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h5" gutterBottom>
          RHYTHM
        </Typography>
        <Typography variant="body1">
          The choices of beats or sub-beats on which to step or move.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h5" gutterBottom>
          CADENCIA
        </Typography>
        <Typography variant="body1">
          The subtle, rhythmic quality of movement expressing musicality and connection. Often described as the natural sway or flow within Tango movement.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h5" gutterBottom>
          MOVEMENTS
        </Typography>
        <Typography variant="body1" paragraph>
          Tango movements can be broadly categorized as:
        </Typography>
        <Typography variant="body1">
          <strong>Linear:</strong> Movements in a straight line, typically forward, backward, or side steps.<br />
          <strong>Rotational:</strong> Movements involving pivots, turns, or circular actions, typically around the axis of the dancer or partnership.
        </Typography>
      </Box>
    </Container>
  );
}

DanceTermsPage.propTypes = {};
