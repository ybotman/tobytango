import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box } from '@mui/material';

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
          margin: '20px auto'
        }}
      />

      <Typography variant="h5" component="h2" gutterBottom>
        My Tango Journey
      </Typography>
      <Typography variant="body1" paragraph>
        I have been a dancer my whole adult life, but since 2015 I have fully immersed myself in the art of Argentine Tango. As a Boston-based Milongero, I travel the world with my wife, Wailing – an accomplished and beautiful tango dancer – sharing our passion for this deeply expressive dance.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Teaching &amp; Musicality
      </Typography>
      <Typography variant="body1" paragraph>
        Alongside our full-time day jobs, we dedicate ourselves to teaching new and intermediate dancers. I regularly lead a musicality class known as Boston Tango Lab, where we explore rhythms, musical phrases, and the subtle interplay between movement and music. My mission is to help make the US more musically aware by inspiring dancers to embrace the deep connection between music and partnered movement.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Tango: A Dance of Connection
      </Typography>
      <Typography variant="body1" paragraph>
        Tango in the US is very young compared to Europe and of course Argentina. I am only in since 2015 or so and hence a newbie. But I try to take my life lessons and learnings to tango in a way I do not often see in the US. <br />
        Tango is not about an inventory of steps – it’s about partnership, communication, and expression. 
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        By day, and other stuffs
      </Typography>
      <Typography variant="body1" paragraph>
        By day I hope to be  a big thinker that delivers value in small chuncks and recently i have drank the Koolaid and became a Gen AI guy.  I love to explore the intersections of technology and creativity, and I bring that same curiosity to my tango teaching.  
      </Typography>

      <Typography variant="body1" paragraph>
        By night and weekends, i have many other hobbies include coffee, birding, and weird connectis of tech to people. <br />
  
        But lets talk coffee. I am a coffee enthusist.  All aspects of coffee. How to extract the best flavors from a bean, the chemistry of brewing, and the roasting science of the bean cooking iteslf.  I have spent way yoo much on my grider and even now may have to upgrade -- it is the one item to spend money on.  I have explored nearly all methods of brewing coffee from pour-over to siphon, and I even been known to roast my own beans at home. <br />
    

        Birding - well, I am not a birder, but I love to watch birds.  I love to know what birds are saying and how cross species communicate works.  I have spent years thinking, studiing and testing this facinating subject.   Sea birds i love but they are my worst category. My favorite?  Migratory warblers.
      </Typography>

    <Typography variant="body1" paragraph>
      Over the dance years (1990), my background studied from  dance forms like Swing, Latin, ballroom, country 2-step, and West Coast Swing. But I began my tango journey at Ultimate Tango with Hernan Brizuela and Anita Flejter.  They ha enriched my understanding of tango. This diverse experience helps me guide dancers into truly becoming enveloped in the dance.
      </Typography>
            <Typography variant="body1" paragraph>
I am previous life, i was a singer and musician.  I arranged music and am currently exploring how to use generative AI to assist and producinging compiliing and arranging music.  Becuase of this I have a deep appreciation for the musicality of tango, and I believe that understanding music is key to becoming a better dancer. This passion for music informs my teaching and inspires me to help others connect with the rhythms and melodies of tango. 
      </Typography>

      <Typography variant="body1" paragraph>
        Look me up – if you ever fancy a Mirada + Cabecero, know that my door is always open to anyone eager to explore the beauty and musicality of tango.
      </Typography>

      <Typography variant="body1" paragraph>
        – Toby Balsley
      </Typography>
    </Container>
  );
}

AboutPage.propTypes = {};