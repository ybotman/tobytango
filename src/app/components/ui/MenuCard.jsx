"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function MenuCard({ title, mainImage, link, brandText, brandSubtitle }) {
  // Tangology-style branded text card
  if (brandText) {
    return (
      <Box sx={{ mb: 3 }}>
        <Link href={link} passHref legacyBehavior>
          <Card
            sx={{
              cursor: 'pointer',
              overflow: 'hidden',
              backgroundColor: '#0D0D0D',
              boxShadow: 'none',
              border: '1px solid rgba(200,169,110,0.15)',
              borderRadius: '8px',
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'rgba(200,169,110,0.4)',
                backgroundColor: '#1A1714',
              }
            }}
          >
            {/* Subtle gradient overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#C8A96E',
                fontSize: { xs: '2.2rem', sm: '2.8rem' },
                fontWeight: 700,
                letterSpacing: '0.15em',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {brandText}
            </Typography>
            {brandSubtitle && (
              <Typography
                sx={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: '#6B6560',
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  letterSpacing: '0.2em',
                  fontWeight: 400,
                  mt: 0.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {brandSubtitle}
              </Typography>
            )}
          </Card>
        </Link>
      </Box>
    );
  }

  // Standard image card
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
  mainImage: PropTypes.string,
  link: PropTypes.string.isRequired,
  brandText: PropTypes.string,
  brandSubtitle: PropTypes.string,
};