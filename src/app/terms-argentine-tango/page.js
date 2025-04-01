import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Making sure we're using the correct file path
// This should be at /app/terms-argentine-tango/page.js
export default function ArgentineTangoTermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Argentine Tango Terminology
      </Typography>
      
      <Typography variant="body1" paragraph>
        A comprehensive guide to essential Argentine tango terminology, movements, and concepts that every dancer should know.
      </Typography>

      <Box sx={{ my: 3 }}>
        {/* Social Customs & Practices */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Social Customs & Practices
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Cabeceo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The traditional way to invite someone to dance using a head nod from across the room. This subtle gesture allows for discrete invitations and respectful declinations without embarrassment.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Mirada</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The intentional gaze that precedes the cabeceo. When a dancer is looking for a partner, they use the mirada to establish eye contact before initiating the cabeceo.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Practica</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A practice session dedicated to learning and refining tango skills. Unlike milongas, practicas are focused on improvement rather than social dancing. They provide a relaxed environment where dancers can stop, discuss, and work on specific elements.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Milonga</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              This term has three meanings in tango: 1) A social dance event where tango is danced, 2) A specific style of music that is faster and more rhythmic than tango, and 3) The dance style used when dancing to milonga music.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Tanda</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A set of 3-4 songs of the same style (tango, vals, or milonga) and usually by the same orchestra. Dancers traditionally stay with the same partner for an entire tanda.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Cortina</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A short musical interlude played between tandas to signal the end of a set. Dancers typically return to their seats during the cortina, allowing for partner changes.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Abrazo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The embrace between dance partners. The abrazo can range from close (cerrado) to open (abierto) depending on the style and preference of the dancers.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Movements */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Movements
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Baldosa</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The basic tango step pattern, which resembles a tile or floor pattern. It includes forward, side, and back steps, typically forming a rectangular or square pattern.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Media Luna</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A &quot;half moon&quot; or semicircular movement, typically performed as the follower moves around the leader in a half-circle pattern.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Sacada</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A displacement movement where one dancer steps into the space occupied by their partner, gently displacing them from that position. This creates an intertwining of legs and shared axis moment.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Boleo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A whipping movement where momentum carries the free leg in a circular motion. Boleos can be high (above the knee) or low (below the knee) and can occur during changes of direction.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Picado</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A sharp stabbing or picking motion with the foot, where the toe taps or &quot;picks&quot; the floor, typically without weight transfer.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Planeo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A sweeping or gliding movement where the foot stays in contact with the floor as it moves, creating a smooth, continuous line.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Ocho</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A figure-eight movement, typically performed by the follower. Ochos can be forward (ocho adelante) or backward (ocho atrás) and involve a pivot between each step.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Gancho</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A &quot;hook&quot; movement where one dancer hooks their leg around their partner&apos;s leg. This creates an intertwined position before unhooking and continuing the dance.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Barrida</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A sweeping movement where one dancer&apos;s foot gently sweeps or drags their partner&apos;s foot across the floor. The foot being swept maintains light contact with the floor throughout.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Colgada</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A leaning movement where both dancers share a counterbalance outside their own axes, creating a &quot;hanging&quot; position (colgada means &quot;hung&quot; in Spanish).
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Axis Positions */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Axis Positions
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Volcada</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              An inclined position where the follower leans toward the leader, typically with the upper bodies leaning away from each other. The leader supports the follower while maintaining a shared axis.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Colgada</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A position where both dancers counterbalance each other by leaning away from a shared axis, creating tension in the embrace that allows for circular movements around an external point.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Apilado</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              A &quot;stacked&quot; position where both dancers share a vertical axis, aligned closely in a comfortable, balanced embrace. Common in close-embrace styles like milonguero.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Navigation & Floor Dynamics */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Navigation & Floor Dynamics
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Ronda</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The counter-clockwise flow of dancers around the floor. Maintaining the ronda is an essential aspect of floor craft in tango.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Línea de Baile</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The &quot;line of dance&quot; that follows the counter-clockwise flow around the dance floor. Good dancers maintain awareness of this line to ensure smooth navigation.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Carril</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The &quot;lane&quot; or track in which a couple dances, moving along the line of dance. Multiple carriels form concentric circles on the dance floor.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Additional Concepts */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Additional Concepts
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Cadencia</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              The rhythmic sway or pendulum-like quality in tango movement. Cadencia is the subtle body movement that expresses musicality between steps.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Pausas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Intentional pauses in movement that create musical tension and emphasis. Pauses can occur on any beat and are a powerful tool for musical expression.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Parallel System vs. Cross System</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Two fundamental walking arrangements in tango:
              <br /><br />
              <strong>Parallel System:</strong> Partners walk with the same feet (both right or both left).
              <br /><br />
              <strong>Cross System:</strong> Partners walk with opposite feet (leader&apos;s right with follower&apos;s left, or vice versa).
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}