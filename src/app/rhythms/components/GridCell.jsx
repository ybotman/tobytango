"use client";

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
import SoundSelectionMenu from './SoundSelectionMenu';

const SOUND_COLORS = {
  kick: '#f44336',    // Red
  snare: '#2196f3',   // Blue
  hihat: '#ff9800',   // Orange
  rim: '#9c27b0'      // Purple
};

const BASS_COLOR = '#4caf50'; // Green

const INTENSITY_OPACITY = {
  strong: 1.0,
  medium: 0.7,
  soft: 0.4
};

export default function GridCell({ 
  cellData, 
  trackType, 
  stepIndex, 
  isPlaying, 
  currentStep, 
  onCellClick,
  onCellChange
}) {
  const { isActive, sound, note, octave, intensity = 'medium' } = cellData;
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);
  
  const isCurrentStep = isPlaying && currentStep === stepIndex;
  const opacity = isActive ? (INTENSITY_OPACITY[intensity] || 0.7) : 0.1;
  const menuOpen = Boolean(menuAnchor);
  
  // Determine cell color based on track type and sound
  const getCellColor = () => {
    if (trackType === 'bass' || trackType === 'bassB') {
      return BASS_COLOR;
    }
    return SOUND_COLORS[sound] || '#666';
  };

  // Get display content for cell
  const getCellContent = () => {
    if (!isActive) return '';
    
    if (trackType === 'bass' || trackType === 'bassB') {
      return `${note}${octave}`;
    }
    
    // For drums, show intensity indicator
    switch (intensity) {
      case 'strong': return '●';
      case 'medium': return '◐';
      case 'soft': return '○';
      default: return '◐';
    }
  };

  // Handle cell click - toggle active state
  const handleCellClick = () => {
    onCellClick(stepIndex, !isActive);
  };

  // Handle mouse down for long press detection
  const handleMouseDown = (event) => {
    const timer = setTimeout(() => {
      setMenuAnchor(event.currentTarget);
    }, 500); // 500ms long press
    setPressTimer(timer);
  };

  // Handle mouse up - clear timer or execute click
  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  // Handle context menu (right click)
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuAnchor(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // Handle sound/note/intensity changes
  const handleSoundChange = (newSound) => {
    const updatedCell = { ...cellData, sound: newSound };
    onCellChange(stepIndex, updatedCell);
  };

  const handleIntensityChange = (newIntensity) => {
    const updatedCell = { ...cellData, intensity: newIntensity };
    onCellChange(stepIndex, updatedCell);
  };

  const handleNoteChange = (newNote) => {
    const updatedCell = { ...cellData, note: newNote };
    onCellChange(stepIndex, updatedCell);
  };

  const handleOctaveChange = (newOctave) => {
    const updatedCell = { ...cellData, octave: newOctave };
    onCellChange(stepIndex, updatedCell);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 35, sm: 40, md: 45 },
        height: { xs: 35, sm: 40, md: 45 },
        margin: 0.5,
        border: isCurrentStep ? '3px solid #90caf9' : '1px solid #ddd',
        borderRadius: 1,
        cursor: 'pointer',
        transition: 'all 0.1s ease',
        transform: isCurrentStep ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isCurrentStep ? 2 : 0
      }}
    >
      <IconButton
        onClick={handleCellClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={handleContextMenu}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 1,
          backgroundColor: getCellColor(),
          opacity: opacity,
          color: 'white',
          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
          fontWeight: 'bold',
          '&:hover': {
            opacity: Math.min(opacity + 0.2, 1),
            transform: 'scale(1.05)'
          },
          '&:active': {
            transform: 'scale(0.95)'
          }
        }}
      >
        {getCellContent()}
      </IconButton>
      
      {/* Sound Selection Menu */}
      <SoundSelectionMenu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        trackType={trackType}
        currentCellData={cellData}
        onSoundChange={handleSoundChange}
        onIntensityChange={handleIntensityChange}
        onNoteChange={handleNoteChange}
        onOctaveChange={handleOctaveChange}
      />
      
      {/* Step number indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          left: -8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          fontSize: '0.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}
      >
        {stepIndex + 1}
      </Box>
    </Box>
  );
}

GridCell.propTypes = {
  cellData: PropTypes.shape({
    isActive: PropTypes.bool.isRequired,
    sound: PropTypes.string,
    note: PropTypes.string,
    octave: PropTypes.number,
    intensity: PropTypes.oneOf(['strong', 'medium', 'soft'])
  }).isRequired,
  trackType: PropTypes.oneOf(['drumA', 'drumB', 'bass', 'bassB']).isRequired,
  stepIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
  currentStep: PropTypes.number,
  onCellClick: PropTypes.func.isRequired,
  onCellChange: PropTypes.func.isRequired
};