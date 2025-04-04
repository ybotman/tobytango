"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  Box, 
  IconButton, 
  Slider 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PulseIcon from './PulseIcon';

export default function AudioPlayer({ example, audioPlayer }) {
  const {
    isPlaying,
    currentTime,
    duration,
    muted,
    audioRefs,
    formatTime,
    togglePlay,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleVolumeChange,
    toggleMute,
    pulseData
  } = audioPlayer;

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            {example.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Orchestra: {example.orchestra} ({example.year})
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              width: 120,
              height: 120,
              bgcolor: 'rgba(33, 150, 243, 0.15)',  // Very light blue background with transparency
              borderRadius: '50%',
              position: 'relative'
            }}
          >
            {isPlaying[example.id] && (
              <PulseIcon 
                audioRef={audioRefs.current[example.id]} 
                pulseData={pulseData[example.id] || []} 
                isPlaying={isPlaying[example.id]}
              />
            )}
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, alignItems: 'center' }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<MusicNoteIcon />}
            onClick={() => togglePlay(example)}
            sx={{ px: 2 }}
          >
            Listen at {formatTime(example.startTime)}
          </Button>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <audio
          ref={el => audioRefs.current[example.id] = el}
          src={example.file}
          onTimeUpdate={() => handleTimeUpdate(example)}
          onLoadedMetadata={() => handleLoadedMetadata(example)}
          onEnded={() => setIsPlaying(prev => ({...prev, [example.id]: false}))}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton 
            onClick={() => togglePlay(example)}
            color="primary"
            size="large"
          >
            {isPlaying[example.id] ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Slider
              value={currentTime[example.id] ? (currentTime[example.id] - (example.startTime || 0)) : 0}
              min={0}
              max={example.duration || (duration[example.id] - (example.startTime || 0)) || 100}
              onChange={(_, newValue) => audioPlayer.handleSliderChange(example, (example.startTime || 0) + newValue)}
              aria-label="audio position"
              color="primary"
            />
          </Box>
          
          <Typography variant="caption" sx={{ minWidth: 60, textAlign: 'right' }}>
            {formatTime((currentTime[example.id] || 0) - (example.startTime || 0))} / {formatTime(example.duration || ((duration[example.id] || 0) - (example.startTime || 0)))}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleMute} size="small">
            {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
          </IconButton>
          
          <Slider
            value={audioPlayer.volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            aria-label="Volume"
            size="small"
            sx={{ mx: 2, width: 100 }}
          />
          
          <Typography variant="body2" sx={{ ml: 2, flexGrow: 1, fontStyle: 'italic' }}>
            Note: {example.comment || `Listen for the rhythm pattern starting at ${formatTime(example.startTime)}`}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

AudioPlayer.propTypes = {
  example: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    startTime: PropTypes.number,
    duration: PropTypes.number,
    orchestra: PropTypes.string,
    year: PropTypes.number,
    comment: PropTypes.string
  }).isRequired,
  audioPlayer: PropTypes.object.isRequired
};