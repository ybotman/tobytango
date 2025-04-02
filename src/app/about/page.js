import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box, Divider } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        About Toby Balsley
      </Typography>

      <Box
        component="img"
        src="/tobyCoffee.jpg"
        alt="Toby Balsley enjoying coffee"
        title="Toby Balsley"
        sx={{
          width: '100%',
          maxWidth: 400,
          display: 'block',
          margin: '20px auto',
          borderRadius: 2,
          boxShadow: 3
        }}
      />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        My Tango Journey
      </Typography>
      <Typography variant="body1" paragraph>
        I&apos;ve been a avid dancer my whole adult life (not my normal day job), but since 2015 I have fully immersed myself in the art of Argentine Tango. As a Boston-based Milongero, I travel the world with my wife, Wailing – an accomplished and beautiful tango dancer – sharing our passion for this deeply expressive dance.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Teaching &amp; Musicality
      </Typography>
      <Typography variant="body1" paragraph>
        I regularly lead a musicality class known as Boston Tango Lab, where we explore rhythms, musical phrases, and the subtle interplay between movement and music. My mission is to help make the US tango community more musically aware by inspiring dancers to embrace the deep connection between music and partnered movement.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Dance Philosophy
      </Typography>
      <Typography variant="body1" paragraph>
        Tango in the US is relatively young compared to Europe and Argentina. I believe that tango is not about an inventory of steps – it&apos;s about partnership, communication, and expression. My approach focuses on the essence of the dance: the connection between partners and music.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Dance Background
      </Typography>
      <Typography variant="body1" paragraph>
        Since the 1990s, I&apos;ve studied various dance forms including Swing, Latin, ballroom, country 2-step, and West Coast Swing. I began my tango journey at Ultimate Tango with Hernan Brizuela and Anita Flejter, who enriched my understanding of Argentine Tango. This diverse experience helps me guide dancers to truly become enveloped in the dance.
      </Typography>
      
      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" component="h2" gutterBottom>
        Professional Life
      </Typography>
      <Typography variant="body1" paragraph>
        By day, I work in technology as a strategic thinker focused on delivering value in small, meaningful chunks. Recently, I&apos;ve become deeply involved in Generative AI and its applications.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Other Interests
      </Typography>
      <Typography variant="body1" paragraph>
        I&apos;m an avid coffee enthusiast, exploring everything from bean roasting to brewing techniques. I&apos;m also a dedicated birder with a particular interest in migratory warblers and cross-species communication. My background as a singer and musician gives me a deep appreciation for the musicality of tango.
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 4, fontStyle: 'italic' }}>
        If you ever fancy a Mirada + Cabeceo, my door is always open to anyone eager to explore the beauty and musicality of tango.
      </Typography>

      <Typography variant="body1" paragraph sx={{ textAlign: 'right', mt: 2 }}>
        – Toby Balsley
      </Typography>
    </Container>
  );
}

AboutPage.propTypes = {};