"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  IconButton, 
  Slider, 
  Typography, 
  Paper,
  Grid
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

export default function GridPlaybackControls({ 
  isPlaying, 
  bpm, 
  onPlay, 
  onPause, 
  onStop, 
  onBpmChange,
  currentStep,
  totalSteps 
}) {
  
  const handleBpmChange = (event, newValue) => {
    onBpmChange(newValue);
  };

  const formatBpm = (value) => `${value} BPM`;

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      {/* Tempo Control - Full Width at Top */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Tempo Control
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
          <Typography variant="body1" sx={{ minWidth: 60, fontWeight: 'bold' }}>
            60 BPM
          </Typography>
          <Slider
            value={bpm}
            onChange={handleBpmChange}
            min={60}
            max={200}
            step={5}
            valueLabelDisplay="on"
            valueLabelFormat={formatBpm}
            color="primary"
            sx={{ 
              flexGrow: 1,
              height: 10,
              '& .MuiSlider-thumb': {
                width: 28,
                height: 28
              },
              '& .MuiSlider-track': {
                height: 10
              },
              '& .MuiSlider-rail': {
                height: 10
              }
            }}
            marks={[
              { value: 60, label: '60' },
              { value: 90, label: '90' },
              { value: 120, label: '120' },
              { value: 150, label: '150' },
              { value: 180, label: '180' },
              { value: 200, label: '200' }
            ]}
          />
          <Typography variant="body1" sx={{ minWidth: 60, fontWeight: 'bold' }}>
            200 BPM
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          color="primary" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {bpm} BPM
        </Typography>
      </Box>

      {/* Playback Controls and Progress */}
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {/* Playback Controls */}
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={isPlaying ? onPause : onPlay}
              color="primary"
              size="large"
              sx={{ 
                bgcolor: isPlaying ? 'warning.light' : 'primary.light',
                '&:hover': {
                  bgcolor: isPlaying ? 'warning.main' : 'primary.main'
                }
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            
            <IconButton 
              onClick={onStop}
              color="secondary"
              size="large"
              disabled={!isPlaying}
            >
              <StopIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Progress Indicator */}
        <Grid item>
          <Box sx={{ textAlign: 'center', minWidth: 80 }}>
            <Typography variant="h6" color="primary">
              {isPlaying ? `${currentStep + 1}/${totalSteps}` : `0/${totalSteps}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Step
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Visual Progress Bar */}
      {isPlaying && (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              width: '100%',
              height: 4,
              bgcolor: 'rgba(0,0,0,0.1)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: `${((currentStep + 1) / totalSteps) * 100}%`,
                height: '100%',
                bgcolor: 'primary.main',
                transition: 'width 0.1s ease',
                borderRadius: 2
              }}
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
}

GridPlaybackControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  bpm: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onBpmChange: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number.isRequired
};