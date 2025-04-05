"use client";

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function PulseIcon({ audioRef, pulseData, isPlaying, size = 120 }) {
  const [opacity, setOpacity] = useState(0); // Fully transparent by default
  const [animationId, setAnimationId] = useState(null);
  const [currentIconPath, setCurrentIconPath] = useState(null);
  const [preloadedIcons, setPreloadedIcons] = useState({});

  // Preload all icons used in the pulse data
  useEffect(() => {
    if (!pulseData || pulseData.length === 0) return;
    
    // Get unique icon paths
    const uniqueIconPaths = [...new Set(pulseData
      .filter(pulse => pulse.icon)
      .map(pulse => pulse.icon))];
    
    // Create an object to store preloaded images
    const iconCache = {};
    
    // Preload each unique icon
    uniqueIconPaths.forEach(path => {
      const img = new Image();
      img.src = `/${path}`;
      iconCache[path] = img;
    });
    
    setPreloadedIcons(iconCache);
  }, [pulseData]);

  // Function to update opacity based on current time
  const updateOpacity = () => {
    if (!audioRef || !isPlaying || !pulseData || pulseData.length === 0) {
      setOpacity(0);
      setCurrentIconPath(null);
      return;
    }

    const currentTime = audioRef.currentTime;
    
    // Find if current time is within any pulse interval
    const activePulse = pulseData.find(
      pulse => currentTime >= pulse.start && currentTime <= pulse.end
    );
    
    if (activePulse) {
      // Calculate the fraction of progress through the pulse
      const fraction = (currentTime - activePulse.start) / (activePulse.end - activePulse.start);
      
      // Simple ease-in and ease-out for opacity
      const normalizedOpacity = Math.sin(fraction * Math.PI);
      setOpacity(normalizedOpacity);
      
      // Set current icon path
      if (activePulse.icon) {
        setCurrentIconPath(activePulse.icon);
      }
    } else {
      // If not in any pulse interval
      setOpacity(0);
      setCurrentIconPath(null);
    }
    
    // Continue animation loop
    const id = requestAnimationFrame(updateOpacity);
    setAnimationId(id);
  };

  // Set up animation loop when playing starts
  useEffect(() => {
    if (isPlaying && audioRef) {
      updateOpacity();
    } else if (animationId) {
      // Clean up animation when not playing
      cancelAnimationFrame(animationId);
      setOpacity(0);
      setCurrentIconPath(null);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, audioRef, pulseData]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      {currentIconPath && (
        <Box
          sx={{
            width: size * 0.8,
            height: size * 0.8,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(33, 150, 243, 0.8)', // Light blue background
            opacity: opacity,
            transition: 'opacity 0.1s ease-out',
            overflow: 'hidden'
          }}
        >
          <Box
            component="img"
            src={`/${currentIconPath}`}
            alt="Rhythm icon"
            sx={{
              width: size * 0.6,
              height: size * 0.6,
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </Box>
      )}
    </Box>
  );
}

PulseIcon.propTypes = {
  audioRef: PropTypes.object,
  pulseData: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      icon: PropTypes.string
    })
  ),
  isPlaying: PropTypes.bool.isRequired,
  size: PropTypes.number
};