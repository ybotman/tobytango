"use client";

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SchoolIcon from '@mui/icons-material/School';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Link from 'next/link';

const guidelines = [
  {
    icon: <GroupsIcon color="primary" />,
    text: "We are a sharing and collaborating group, invite only, but we are all here to share with each other and spread our enthusiasm, learnings, and attitude to all others in the tango community."
  },
  {
    icon: <HandshakeIcon color="primary" />,
    text: "We are not here to correct or fix each other, but if the relationship is positive then constructive conversation is appropriate."
  },
  {
    icon: <SelfImprovementIcon color="primary" />,
    text: "We are not here to just dance tandas, but rather to use a tanda to practice the things we are working on."
  },
  {
    icon: <CelebrationIcon color="primary" />,
    text: "Mostly, we are here to explore and share and learn from each other in a positive and supportive place."
  },
  {
    icon: <SchoolIcon color="primary" />,
    text: "This is not teaching, but sharing."
  }
];

export default function TangoCollabPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        TangoCollab
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FavoriteIcon color="error" />
            Our Guidelines
          </Typography>

          <List>
            {guidelines.map((guideline, index) => (
              <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ mt: 0.5 }}>
                  {guideline.icon}
                </ListItemIcon>
                <ListItemText
                  primary={guideline.text}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={Link}
          href="/favorite-videos"
          variant="contained"
          size="large"
          startIcon={<VideoLibraryIcon />}
          sx={{ mr: 2 }}
        >
          Favorite Tango Videos
        </Button>
        <Button
          component={Link}
          href="/my-videos"
          variant="outlined"
          size="large"
          startIcon={<VideoLibraryIcon />}
        >
          My Videos
        </Button>
      </Box>
    </Container>
  );
}
