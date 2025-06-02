"use client";

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

// Available rhythm presets - expanded with tango, vals, etc.
const PRESET_FILES = [
  // Milonga rhythms
  { value: 'milonga-lisa', label: 'Milonga Lisa (Simple)', type: 'milonga' },
  { value: 'milonga-traspie', label: 'Milonga Traspie (Double Step)', type: 'milonga' },
  { value: 'milonga-contratiempo', label: 'Milonga Contratiempo (Off-beat)', type: 'milonga' },
  
  // Tango rhythms  
  { value: 'Tango1', label: 'Tango Basic (1---)', type: 'tango' },
  { value: 'Tango 1-3', label: 'Tango 1-3- Pattern', type: 'tango' },
  { value: 'Tango 123', label: 'Tango 123- Pattern', type: 'tango' },
  { value: 'Tango 134', label: 'Tango 1-34 Pattern', type: 'tango' },
  { value: 'Tango 2-4', label: 'Tango -2-4 Pattern', type: 'tango' },
  { value: 'Tango 332', label: 'Tango 3-3-2 Pattern', type: 'tango' },
  { value: 'Tango 4-1', label: 'Tango 4--1 Pattern', type: 'tango' },
  { value: 'Tango Sycopa A', label: 'Tango Syncopa A', type: 'tango' },
  { value: 'Tango Sycopa A-B', label: 'Tango Syncopa A-B', type: 'tango' },
  
  // Vals rhythms
  { value: 'Vals1-1', label: 'Vals 1-1 Pattern', type: 'vals' },
  { value: 'Vals1-2', label: 'Vals 1-2 Pattern', type: 'vals' },
  { value: 'Vals3-1', label: 'Vals 3-1 Pattern', type: 'vals' },
  { value: 'Vals123', label: 'Vals 123 Pattern', type: 'vals' },
];

export default function RhythmPresetSelector({ selectedPreset, onPresetChange, loading }) {
  const [presets, setPresets] = useState(PRESET_FILES);
  const [loadError, setLoadError] = useState(null);
  
  // Group presets by type for organized display
  const groupedPresets = presets.reduce((acc, preset) => {
    const type = preset.type || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(preset);
    return acc;
  }, {});

  const handlePresetChange = async (event) => {
    const presetValue = event.target.value;
    if (presetValue === '') {
      onPresetChange(null);
      return;
    }

    try {
      setLoadError(null);
      const response = await fetch(`/rhythms/canned/${presetValue}.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load preset: ${response.status}`);
      }
      
      const presetData = await response.json();
      onPresetChange(presetData);
    } catch (error) {
      console.error('Error loading preset:', error);
      setLoadError(`Failed to load preset: ${error.message}`);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="rhythm-preset-label">Select Rhythm Preset</InputLabel>
        <Select
          labelId="rhythm-preset-label"
          value={selectedPreset?.name ? 
            presets.find(p => selectedPreset.name.includes(p.label.split(' ')[1]))?.value || '' 
            : ''
          }
          onChange={handlePresetChange}
          label="Select Rhythm Preset"
          disabled={loading}
          startAdornment={loading && (
            <CircularProgress size={20} sx={{ mr: 1 }} />
          )}
        >
          <MenuItem value="">
            <em>None - Create Custom</em>
          </MenuItem>
          {/* Group presets by type */}
          {Object.entries(groupedPresets).map(([type, typePresets]) => [
            <MenuItem key={`${type}-header`} disabled sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Rhythms
            </MenuItem>,
            ...typePresets.map((preset) => (
              <MenuItem key={preset.value} value={preset.value} sx={{ pl: 4 }}>
                {preset.label}
              </MenuItem>
            ))
          ]).flat()}
        </Select>
      </FormControl>
      
      {selectedPreset && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            {selectedPreset.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Time Signature: {selectedPreset.timeSignature} | 
            Default BPM: {selectedPreset.defaultBPM} | 
            Loop Length: {selectedPreset.loopLength} steps
          </Typography>
        </Box>
      )}
      
      {loadError && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
          <Typography variant="body2" color="error.dark">
            {loadError}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

RhythmPresetSelector.propTypes = {
  selectedPreset: PropTypes.object,
  onPresetChange: PropTypes.func.isRequired,
  loading: PropTypes.bool
};