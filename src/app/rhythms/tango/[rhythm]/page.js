"use client";

import React, { useState, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Slider, 
  IconButton,
  Grid
} from '@mui/material';
import { useParams } from 'next/navigation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function RhythmDetailPage() {
  const params = useParams();
  const rhythm = params.rhythm;

  // State for audio player
  const [isPlaying, setIsPlaying] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  
  // Refs for audio elements
  const audioRefs = useRef({});

  const rhythmDescriptions = {
    '1-3-': 'The classic tango rhythm. Strong, definitive, and foundational to tango musical interpretation.',
    '1---': 'The "long note" rhythm. Creates space and dramatic tension in the dance.',
    '----': 'The "pause" or "none" rhythm. Offers moments of stillness and anticipation.',
    '1-34': 'Often used in basic to cross (follower)',
    '123-': 'Often used in leader to go to cross system',
    '1234': 'The "marcato" rhythm. Every beat is accented, creating consistent drive.'
  };

  // MP3 examples for each rhythm
  const mp3Examples = {
    '1-3-': [
      { 
        id: 'disarli-el-jaguel', 
        title: 'Di Sarli - El Jaguel', 
        file: '/audio/Tango/DiSarli/El Jaguel -- 8.mp3', 
        startTime: 0, 
        duration: 28, // Limit to 28 seconds with 4 second fade
        orchestra: "Di Sarli",
        year: 1940,
        comment: "Listen for 3 times of 1-3-, then a 1---, then back to 3 times of 1-3-"
      }
    ],
    '1---': [
      { 
        id: 'canaro-poema', 
        title: 'Canaro - Poema', 
        file: '/audio/rhythms/1---canaro-poema.mp3', 
        startTime: 25,
        orchestra: "Canaro",
        year: 1939
      },
      { 
        id: 'pugliese-gallo-ciego', 
        title: 'Pugliese - Gallo ciego', 
        file: '/audio/rhythms/1---pugliese-gallo-ciego.mp3', 
        startTime: 30,
        orchestra: "Pugliese",
        year: 1943
      }
    ],
    '----': [
      { 
        id: 'pugliese-yumba', 
        title: 'Pugliese - La yumba', 
        file: '/audio/rhythms/----pugliese-yumba.mp3', 
        startTime: 15,
        orchestra: "Pugliese",
        year: 1946
      },
      { 
        id: 'piazzolla-libertango', 
        title: 'Piazzolla - Libertango', 
        file: '/audio/rhythms/----piazzolla-libertango.mp3', 
        startTime: 40,
        orchestra: "Piazzolla",
        year: 1974
      }
    ],
    '1-34': [
      { 
        id: 'canaro-invierno', 
        title: 'Canaro - Invierno', 
        file: '/audio/rhythms/1-34-canaro-invierno.mp3', 
        startTime: 18,
        orchestra: "Canaro",
        year: 1937
      },
      { 
        id: 'troilo-inspiracion', 
        title: 'Troilo - Inspiración', 
        file: '/audio/rhythms/1-34-troilo-inspiracion.mp3', 
        startTime: 22,
        orchestra: "Troilo",
        year: 1943
      }
    ],
    '123-': [
      { 
        id: 'fresedo-vida-mia', 
        title: 'Fresedo - Vida mía', 
        file: '/audio/rhythms/123-fresedo-vida-mia.mp3', 
        startTime: 15,
        orchestra: "Fresedo",
        year: 1933
      },
      { 
        id: 'calo-al-compas', 
        title: 'Caló - Al compás del corazón', 
        file: '/audio/rhythms/123-calo-al-compas.mp3', 
        startTime: 30,
        orchestra: "Caló",
        year: 1942
      }
    ],
    '1234': [
      { 
        id: 'darienzo-choclo', 
        title: 'D\'Arienzo - El choclo', 
        file: '/audio/rhythms/1234-darienzo-choclo.mp3', 
        startTime: 10,
        orchestra: "D'Arienzo",
        year: 1937
      },
      { 
        id: 'rodriguez-cumparsita', 
        title: 'Rodríguez - La cumparsita', 
        file: '/audio/rhythms/1234-rodriguez-cumparsita.mp3', 
        startTime: 15,
        orchestra: "Rodríguez",
        year: 1936
      }
    ]
  };

  // Get examples for the current rhythm
  const examples = mp3Examples[rhythm] || [];

  // Handle play/pause
  const togglePlay = (example) => {
    const audio = audioRefs.current[example.id];
    
    // Stop all other playing tracks
    Object.keys(audioRefs.current).forEach(id => {
      if (id !== example.id && audioRefs.current[id]) {
        audioRefs.current[id].pause();
        setIsPlaying(prev => ({...prev, [id]: false}));
      }
    });
    
    if (!isPlaying[example.id]) {
      audio.currentTime = example.startTime || 0;
      audio.play();
      setIsPlaying(prev => ({...prev, [example.id]: true}));
      
      // If there's a duration limit, set up fade out and stop
      if (example.duration) {
        const fadeDuration = 4; // 4 seconds fade out
        const stopTime = (example.startTime || 0) + example.duration;
        
        setTimeout(() => {
          // Start fade out
          const fadeInterval = setInterval(() => {
            if (audio.volume > 0.05) {
              audio.volume = Math.max(0, audio.volume - 0.05);
            } else {
              clearInterval(fadeInterval);
              audio.pause();
              audio.volume = volume; // Reset volume
              setIsPlaying(prev => ({...prev, [example.id]: false}));
            }
          }, 200); // Adjust fade step rate
        }, (example.duration - fadeDuration) * 1000);
      }
    } else {
      audio.pause();
      audio.volume = volume; // Reset volume in case it was fading
      setIsPlaying(prev => ({...prev, [example.id]: false}));
    }
  };

  // Handle time update
  const handleTimeUpdate = (example) => {
    const audio = audioRefs.current[example.id];
    setCurrentTime(prev => ({...prev, [example.id]: audio.currentTime}));
    
    // If there's a duration limit and we've exceeded it, stop playback
    if (example.duration && audio.currentTime >= (example.startTime || 0) + example.duration) {
      audio.pause();
      setIsPlaying(prev => ({...prev, [example.id]: false}));
    }
  };

  // Handle audio loaded
  const handleLoadedMetadata = (example) => {
    const audio = audioRefs.current[example.id];
    // Use custom duration if provided, otherwise use audio duration
    const audioDuration = example.duration 
      ? (example.startTime || 0) + example.duration 
      : audio.duration;
    setDuration(prev => ({...prev, [example.id]: audioDuration}));
  };

  // Handle slider change
  const handleSliderChange = (example, newValue) => {
    const audio = audioRefs.current[example.id];
    audio.currentTime = newValue;
    setCurrentTime(prev => ({...prev, [example.id]: newValue}));
  };

  // Format time
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Handle volume change
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    
    // Set volume for all audio elements
    Object.keys(audioRefs.current).forEach(id => {
      if (audioRefs.current[id]) {
        audioRefs.current[id].volume = newValue;
      }
    });
  };

  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
    
    // Set mute for all audio elements
    Object.keys(audioRefs.current).forEach(id => {
      if (audioRefs.current[id]) {
        audioRefs.current[id].muted = !muted;
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tango Rhythm: {rhythm}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {rhythmDescriptions[rhythm] || 'A fundamental tango rhythm pattern.'}
      </Typography>

      <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
        <Box
          component="img"
          src={`/rhythms/${rhythm}.png`}
          alt={`Rhythm ${rhythm} visualization`}
          sx={{
            maxWidth: '100%',
            height: 'auto',
            boxShadow: 3,
            borderRadius: 1
          }}
        />
      </Box>

      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Dancing with this Rhythm
      </Typography>
      
      <Typography variant="body1" paragraph>
        This rhythm creates a specific musical feeling that can be expressed in your dance through:
      </Typography>
      
      <Box component="ul" sx={{ pl: 3 }}>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            Weight changes that align with the accented beats
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            Movement quality that reflects the rhythm&lsquo;s character
          </Typography>
        </Box>
        <Box component="li" sx={{ mb: 1 }}>
          <Typography variant="body1">
            Pauses and movement during appropriate beats
          </Typography>
        </Box>
      </Box>

      {examples.length > 0 && (
        <>
          <Typography variant="h5" component="h2" sx={{ mt: 5, mb: 3 }}>
            Musical Examples
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {examples.map((example) => (
              <Paper key={example.id} elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" gutterBottom>
                      {example.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Orchestra: {example.orchestra} ({example.year})
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
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
                        onChange={(_, newValue) => handleSliderChange(example, (example.startTime || 0) + newValue)}
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
                      value={volume}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={handleVolumeChange}
                      aria-label="Volume"
                      size="small"
                      sx={{ mx: 2, width: 100 }}
                    />
                    
                    <Typography variant="body2" sx={{ ml: 2, flexGrow: 1, fontStyle: 'italic' }}>
                      Note: {example.comment || `Listen for the ${rhythm} rhythm pattern starting at ${formatTime(example.startTime)}`}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}