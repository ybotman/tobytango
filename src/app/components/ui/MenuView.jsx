"use client";

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MenuCard from './MenuCard';

const navItems = [
  {
    id: 1,
    title: "TobyTango Lab Mondays",
    mainImage: "/navigation/lab-mondays.png",
    link: "/lab-mondays",
  },
  {
    id: 2,
    title: "TobyTango Lab Workshop",
    mainImage: "/navigation/lab-workshops.png",
    link: "/lab-workshop",
  },
  {
    id: 3,
    title: "Journey Practice",
    mainImage: "/navigation/journey-practica.png",
    link: "/journey-practica",
  },
  {
    id: 4,
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