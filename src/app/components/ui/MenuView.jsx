"use client";

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MenuCard from './MenuCard';

const navItems = [
  {
    id: 1,
    title: "TangoCollab",
    mainImage: "/tangoCollab1.png",
    link: "/tango-collab",
  },
  {
    id: 2,
    title: "TangoLab Traveling",
    mainImage: "/navigation/lab-workshops.png",
    link: "/lab-workshop",
  },
  {
    id: 3,
    title: "Practice Videos",
    mainImage: "/navigation/tangolab.jpg",
    link: "/practice-videos",
  },
  {
    id: 4,
    title: "About Toby",
    mainImage: "/navigation/about.png",
    link: "/about",
  },
  {
    id: 5,
    title: "My Favorite Tango Videos",
    mainImage: "/navigation/videos.png",
    link: "/favorite-videos",
  }
];

export default function MenuView() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        {navItems.map(item => (
          <MenuCard
            key={item.id}
            title={item.title}
            mainImage={item.mainImage}
            link={item.link}
          />
        ))}
      </Box>
    </Container>
  );
}