import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MusicDefinitionsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Musical Terms for Argentine Tango Dancers
      </Typography>
      <Typography variant="body1" paragraph>
        A guide to help dancers without a musical background understand key musical concepts as they relate to Argentine Tango.
      </Typography>
      
      <Typography variant="body1" paragraph>
        When we dance, we often use &apos;standard&apos; terms that are common among dancers. However, music has a much larger pedagogical history and better defined musical terms. These at times differ from dancers&apos; terms, so beware. This page is for Lab Class and is a well-defined list of agreed &apos;musical&apos; terms, used for distinction and clarity where needed.
      </Typography>

      <Box sx={{ my: 3 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">BEAT</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              A single, precise click in time, like the tick of a clock. Each step often aligns with a beat.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">TEMPO</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The speed of the music—how fast or slow the beats occur. Tango tempos can be:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Strict:</strong> consistent speed throughout.<br />
              <strong>Flexible:</strong> gently slowing or speeding up within phrases.<br />
              <strong>Free (Rubato):</strong> fluid, expressive, without a steady beat.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">COUNT</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Numbering beats to keep track of where you are in the music. Commonly counting 1-2-3-4 in Tango or 1-2-3 in Vals.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">METER</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              How beats group together consistently:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Tango (4/4):</strong> beats grouped as four (1-2-3-4).<br />
              <strong>Milonga (2/4):</strong> beats grouped as two (1-2). However, dancers often count it as four beats for simplicity, and commonly study it in groups of 8 beats, stepping typically on beats 1, 4, 5, and 7.<br />
              <strong>Vals (3/4):</strong> beats grouped as three (1-2-3).
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">BAR</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              One complete set of counted beats according to the meter:<br />
              <strong>Tango (4/4):</strong> 4 beats per bar (1-2-3-4).<br />
              <strong>Milonga (2/4):</strong> 2 beats per bar (1-2), though dancers frequently count and feel this rhythm as 4 or even 8 beats for clarity and musicality.<br />
              <strong>Vals (3/4):</strong> 3 beats per bar (1-2-3).
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">STYLE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The specific type of music and dance within Argentine Tango:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Tango:</strong> slower, dramatic, expressive.<br />
              <strong>Vals:</strong> flowing, graceful, turning.<br />
              <strong>Milonga:</strong> playful, rhythmic, faster.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">PHRASE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              A meaningful musical sentence, typically consisting of 8 bars, often aligning naturally with dance movements. Occasionally shorter or longer.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">PHRASE HALF</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              Half of a full phrase (usually 4 bars). Useful in interpreting shorter musical ideas, pauses, or breathing points within the dance.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">SECTION</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              A larger portion of music composed of multiple phrases. Typically, four phrases make up one section (often called a 32-bar structure because 4 phrases × 8 bars = 32 bars). Argentine tango songs typically have distinct sections (Intro, Verse, Bridge, Chorus).
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" component="h2">SONG</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              The complete musical piece created by combining all sections (typically multiple 32-bar sections, plus intros or outros). A full song forms the basis for an entire tango dance or tanda.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

MusicDefinitionsPage.propTypes = {};