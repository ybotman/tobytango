'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Card, CardContent, Grid, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import StarIcon from '@mui/icons-material/Star';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';

const sections = [
  {
    title: 'The Rhythms',
    icon: <MusicNoteIcon />,
    links: [
      { title: 'Tango - Single Time', path: '/rhythms/tango/SingleTime' },
      { title: 'Tango - Double Time', path: '/rhythms/tango/DoubleTime' },
      { title: 'Tango - Half/Zero Time', path: '/rhythms/tango/HalfZeroTime' },
      { title: 'Tango - Advanced', path: '/rhythms/tango/Advanced' },
      { title: 'Tango - Analysis', path: '/rhythms/tango/summary' },
      { title: 'Vals', path: '/rhythms/vals' },
      { title: 'Milonga', path: '/rhythms/milonga' },
      { title: 'Interactive Grid', path: '/rhythms/canned', highlight: true },
    ]
  },
  {
    title: 'The Terminology',
    icon: <MenuBookIcon />,
    links: [
      { title: 'Musical Terms', path: '/terms-music' },
      { title: 'Dancing Terms', path: '/terms-dance' },
      { title: 'Argentine Tango Terms', path: '/terms-argentine-tango' },
    ]
  },
  {
    title: 'The Artists',
    icon: <LibraryMusicIcon />,
    links: [
      { title: 'View All Artists', path: '/artists' },
      { title: 'Timelines', path: '/artists/timelines' },
      { title: 'Umbrella Technique', path: '/artists/umbrella-technique', highlight: true },
    ]
  },
  {
    title: 'The Songs',
    icon: <LibraryMusicIcon />,
    links: [
      { title: 'All Songs', path: '/songs' },
    ]
  },
  {
    title: 'The Dancers',
    icon: <DirectionsWalkIcon />,
    links: [
      { title: 'Influential Dancers', path: '/dancers' },
      { title: 'Dance Stance - Chicho Frumboli', path: '/dance-stance/chicho' },
      { title: 'Dance Stance - Gustavo Naveira', path: '/dance-stance/gustavo' },
      { title: 'Dance Stance - Carlitos Espinoza', path: '/dance-stance/carlitos' },
      { title: 'Dance Stance - Hernan Brizuela', path: '/dance-stance/hernan' },
    ]
  },
  {
    title: 'The Best Practices',
    icon: <StarIcon />,
    links: [
      { title: 'Tango Is', path: '/tango-is' },
      { title: 'Tango Is NOT', path: '/tango-is-not' },
      { title: 'Milongas', path: '/milongas' },
      { title: 'Practicas', path: '/practicas' },
    ]
  },
  {
    title: 'The Difficulties',
    icon: <WarningIcon />,
    links: [
      { title: 'No Drums', path: '/difficulties/no-drums' },
      { title: 'No Standard Patterns', path: '/difficulties/no-patterns' },
      { title: 'Improvisational', path: '/difficulties/improvisational' },
      { title: 'No One in Charge', path: '/difficulties/no-one-in-charge' },
    ]
  },
];

export default function TangoLabPage() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <ScienceIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Box>
          <Typography variant="h3" component="h1">
            TangoLab
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Collaborate and share the art and science of Argentine Tango
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Our Philosophy
        </Typography>
        <Typography variant="body1" paragraph>
          We are a sharing and collaborating group, invite only, but we are all here to share with each other.
        </Typography>
        <Typography variant="body1" paragraph>
          We spread our enthusiasm, learnings, and attitude to all others in the tango community.
        </Typography>
        <Typography variant="body1" paragraph>
          We are not here to correct or fix each other, but to share with each other. When the relationship is positive, constructive two-way conversation is always appropriate.
        </Typography>
        <Typography variant="body1" paragraph>
          We are not here to just dance tandas, but rather to use a tanda to practice the things we are working on.
        </Typography>
        <Typography variant="body1" paragraph>
          Mostly, we are here to explore, share, and learn from each other in a positive and supportive place.
        </Typography>
        <Typography variant="body1" paragraph>
          No more than 30 minutes with a single partnership, then go participate elsewhere.
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 'medium' }}>
          This is not teaching, but sharing. Did we mention collaborate and share?
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {section.icon}
                  <Typography variant="h6">{section.title}</Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <List dense disablePadding>
                  {section.links.map((link) => (
                    <ListItem key={link.path} disablePadding>
                      <ListItemButton
                        onClick={() => router.push(link.path)}
                        sx={link.highlight ? { bgcolor: 'action.hover' } : {}}
                      >
                        <ListItemText
                          primary={link.title}
                          primaryTypographyProps={{
                            color: link.highlight ? 'primary' : 'inherit',
                            fontWeight: link.highlight ? 'bold' : 'normal'
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
