"use client";

import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListSubheader
} from '@mui/material';

const DRUM_SOUNDS = ['kick', 'snare', 'hihat', 'rim', 'shaker'];
const INTENSITIES = ['soft', 'medium', 'strong'];
const BASS_NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const OCTAVES = [1, 2, 3, 4];

export default function SoundSelectionMenu({
  anchorEl,
  open,
  onClose,
  trackType,
  currentCellData,
  onSoundChange,
  onIntensityChange,
  onNoteChange,
  onOctaveChange
}) {

  const isDrum = trackType === 'drumA' || trackType === 'drumB';
  const isBass = trackType === 'bass' || trackType === 'bassB';

  const handleSoundSelect = (sound) => {
    onSoundChange(sound);
    // Don't close menu - let user pick intensity too
  };

  const handleIntensitySelect = (intensity) => {
    onIntensityChange(intensity);
    onClose(); // Close after selecting intensity
  };

  const handleNoteSelect = (note) => {
    onNoteChange(note);
    // Don't close menu - let user pick octave and intensity too
  };

  const handleOctaveSelect = (octave) => {
    onOctaveChange(octave);
    // Don't close menu - let user pick intensity too
  };

  const getSoundDisplayName = (sound) => {
    const names = {
      kick: 'Kick Drum',
      snare: 'Snare Drum', 
      hihat: 'Hi-Hat',
      rim: 'Rim Shot',
      shaker: 'Shaker'
    };
    return names[sound] || sound;
  };

  const getIntensityDisplayName = (intensity) => {
    const names = {
      soft: '○ Soft',
      medium: '◐ Medium',
      strong: '● Strong'
    };
    return names[intensity] || intensity;
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          maxHeight: 400,
          width: 200
        }
      }}
    >
      {isDrum && [
          <ListSubheader key="sound-header">Sound</ListSubheader>,
          ...DRUM_SOUNDS.map((sound) => (
            <MenuItem
              key={sound}
              onClick={() => handleSoundSelect(sound)}
              selected={currentCellData.sound === sound}
              sx={{ pl: 3 }}
            >
              {getSoundDisplayName(sound)}
            </MenuItem>
          )),
          
          <Divider key="divider-1" />,
          
          <ListSubheader key="intensity-header">Intensity</ListSubheader>,
          ...INTENSITIES.map((intensity) => (
            <MenuItem
              key={intensity}
              onClick={() => handleIntensitySelect(intensity)}
              selected={currentCellData.intensity === intensity}
              sx={{ pl: 3 }}
            >
              {getIntensityDisplayName(intensity)}
            </MenuItem>
          ))
      ]}

      {isBass && [
          <ListSubheader key="note-header">Note</ListSubheader>,
          ...BASS_NOTES.map((note) => (
            <MenuItem
              key={note}
              onClick={() => handleNoteSelect(note)}
              selected={currentCellData.note === note}
              sx={{ pl: 3 }}
            >
              {note}
            </MenuItem>
          )),
          
          <Divider key="divider-2" />,
          
          <ListSubheader key="octave-header">Octave</ListSubheader>,
          ...OCTAVES.map((octave) => (
            <MenuItem
              key={octave}
              onClick={() => handleOctaveSelect(octave)}
              selected={currentCellData.octave === octave}
              sx={{ pl: 3 }}
            >
              {octave}
            </MenuItem>
          )),
          
          <Divider key="divider-3" />,
          
          <ListSubheader key="intensity-header-bass">Intensity</ListSubheader>,
          ...INTENSITIES.map((intensity) => (
            <MenuItem
              key={`bass-${intensity}`}
              onClick={() => handleIntensitySelect(intensity)}
              selected={currentCellData.intensity === intensity}
              sx={{ pl: 3 }}
            >
              {getIntensityDisplayName(intensity)}
            </MenuItem>
          ))
      ]}
    </Menu>
  );
}

SoundSelectionMenu.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  trackType: PropTypes.oneOf(['drumA', 'drumB', 'bass', 'bassB']).isRequired,
  currentCellData: PropTypes.object.isRequired,
  onSoundChange: PropTypes.func,
  onIntensityChange: PropTypes.func.isRequired,
  onNoteChange: PropTypes.func,
  onOctaveChange: PropTypes.func
};