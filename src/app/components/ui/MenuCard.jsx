"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, Box } from '@mui/material';
import Link from 'next/link';

export default function MenuCard({ title, mainImage, link }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Link href={link} passHref legacyBehavior>
        <Card sx={{ cursor: 'pointer', overflow: 'hidden', backgroundColor: 'transparent', boxShadow: 'none' }}>
          <CardMedia
            component="img"
            height="200"
            image={mainImage}
            alt={title}
            sx={{ objectFit: 'cover', transition: 'all 0.5s ease' }}
          />
        </Card>
      </Link>
    </Box>
  );
}

MenuCard.propTypes = {
  title: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};