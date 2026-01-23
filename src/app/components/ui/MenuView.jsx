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
    title: "Cool Vids",
    mainImage: "/navigation/tangolab.jpg",
    link: "/cool-vids",
  },
  {
    id: 3,
    title: "About Toby",
    mainImage: "/navigation/about.png",
    link: "/about",
  },
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