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
      <Grid container spacing={3} alignItems="center">
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

        {/* Tempo Control */}
        <Grid item xs>
          <Box sx={{ px: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Tempo
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ minWidth: 40 }}>
                60
              </Typography>
              <Slider
                value={bpm}
                onChange={handleBpmChange}
                min={60}
                max={180}
                step={5}
                valueLabelDisplay="auto"
                valueLabelFormat={formatBpm}
                color="primary"
                sx={{ flexGrow: 1 }}
              />
              <Typography variant="body2" sx={{ minWidth: 40 }}>
                180
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              color="primary" 
              sx={{ textAlign: 'center', mt: 1 }}
            >
              {bpm} BPM
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