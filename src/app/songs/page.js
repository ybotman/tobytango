"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  LinearProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

// Song data organized by category and orchestra
const songData = {
  Tango: [
    { id: 'calo-charamusca', title: 'Charamusca', orchestra: 'Calo', file: '/audio/Tango/Calo/Charamusca.mp3' },
    { id: 'calo-ninguna', title: 'Ninguna', orchestra: 'Calo', file: '/audio/Tango/Calo/Ninguna.mp3' },
    { id: 'canaro-la-maleva', title: 'La Maleva', orchestra: 'Canaro', file: '/audio/Tango/Canaro/La Maleva.mp3' },
    { id: 'darienzo-dime-mi-amor', title: 'Dime Mi Amor', orchestra: 'D\'Arienzo', file: '/audio/Tango/D\'Arienzo/Dime Mi Amor.mp3' },
    { id: 'darienzo-don-juan', title: 'Don Juan', orchestra: 'D\'Arienzo', file: '/audio/Tango/D\'Arienzo/Don Juan.mp3' },
    { id: 'darienzo-el-flete', title: 'El Flete', orchestra: 'D\'Arienzo', file: '/audio/Tango/D\'Arienzo/El Flete.mp3' },
    { id: 'darienzo-el-irresistible', title: 'El Irresistible', orchestra: 'D\'Arienzo', file: '/audio/Tango/D\'Arienzo/El Irresistible.mp3' },
    { id: 'darienzo-la-mariposa', title: 'La Mariposa', orchestra: 'D\'Arienzo', file: '/audio/Tango/D\'Arienzo/La Mariposa.mp3' },
    { id: 'darienzo-nada-mas', title: 'Nada Mas', orchestra: 'D\'Arienzo', file: '/audio/Tango/D\'Arienzo/Nada Mas.mp3' },
    { id: 'disarli-a-la-gran-muneca', title: 'A La Gran Muñeca', orchestra: 'Di Sarli', file: '/audio/Tango/DiSarli/A La Gran Muñeca.mp3' },
    { id: 'disarli-bahia-blanca', title: 'Bahia Blanca', orchestra: 'Di Sarli', file: '/audio/Tango/DiSarli/Bahia Blanca.mp3' },
    { id: 'disarli-champagne-tango', title: 'Champagne Tango', orchestra: 'Di Sarli', file: '/audio/Tango/DiSarli/Champagne Tango.mp3' },
    { id: 'disarli-criollo-viejo', title: 'Criollo viejo', orchestra: 'Di Sarli', file: '/audio/Tango/DiSarli/Criollo viejo.mp3' },
    { id: 'disarli-el-choclo', title: 'El Choclo', orchestra: 'Di Sarli', file: '/audio/Tango/DiSarli/El Choclo.mp3' },
    { id: 'disarli-el-jaguel', title: 'El Jaguel', orchestra: 'Di Sarli', file: '/audio/Tango/DiSarli/El Jaguel -- 8.mp3' },
    { id: 'disarli-nueve-puntos', title: 'Nueve Puntos', orchestra: 'Di Sarli', file: '/audio/Tango/DiSarli/Nueve Puntos.mp3' },
    { id: 'donato-el-pollito', title: 'El Pollitio', orchestra: 'Donato', file: '/audio/Tango/Donato/El Pollitio.mp3' },
    { id: 'donato-tierrita', title: 'Tierrita', orchestra: 'Donato', file: '/audio/Tango/Donato/Tierrita.mp3' },
    { id: 'pugliese-la-yumba', title: 'La Yumba', orchestra: 'Pugliese', file: '/audio/Tango/Pugliese/La Yumba.mp3' },
    { id: 'pugliese-remembranzas', title: 'Remembranzas', orchestra: 'Pugliese', file: '/audio/Tango/Pugliese/Remembranzas.mp3' },
    { id: 'pugliese-tierra-querida', title: 'Tierra Querida', orchestra: 'Pugliese', file: '/audio/Tango/Pugliese/Tierra Querida.mp3' },
    { id: 'rodriguez-di-di', title: 'Di Di', orchestra: 'Rodriguez', file: '/audio/Tango/Rodriguez/Di Di.mp3' }
  ],
  Vals: [
    { id: 'darienzo-amor-y-celos', title: 'Amor y Celos', orchestra: 'D\'Arienzo', file: '/audio/Vals/D\'Arienzo/Amor y Celos.mp3' },
    { id: 'disarli-ausencia', title: 'Ausencia', orchestra: 'Di Sarli', file: '/audio/Vals/DiSarli/Ausencia.mp3' }
  ],
  Milonga: [
    { id: 'darienzo-milonga-de-mis-amores', title: 'Milonga de Mis Amores', orchestra: 'D\'Arienzo', file: '/audio/Milonga/D\'Arienzo/Milonga de Mis Amores.mp3' }
  ],
  Interesting: [
    // Gotan Project
    { id: 'gotan-vuelvo-al-sur', title: 'Vuelvo Al Sur', orchestra: 'Gotan Project', file: '/audio/Interesting/Gotan/00 Vuelvo Al Sur.mp3' },
    { id: 'gotan-checkmate', title: 'Checkmate Jaque Mate', orchestra: 'Gotan Project', file: '/audio/Interesting/Gotan/CHECKMATE JAQUE MATE.mp3' },
    { id: 'gotan-una-musica-brutal', title: 'Una Musica Brutal', orchestra: 'Gotan Project', file: '/audio/Interesting/Gotan/Una Musica Brutal.mp3' },
    
    // Piazzolla
    { id: 'piazzolla-milonga-del-angel', title: 'Milonga del Angel', orchestra: 'Piazzolla', file: '/audio/Interesting/Piazzolla/Milonga_del_angel.mp3' },
    { id: 'piazzolla-oblivion', title: 'Oblivion', orchestra: 'Piazzolla', file: '/audio/Interesting/Piazzolla/Oblivion.mp3' }
  ]
};

export default function SongsPage() {
  const [expanded, setExpanded] = useState('Interesting');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({});
  
  // Single audio element to ensure only one song plays at a time
  const audioElement = useRef(null);
  const progressInterval = useRef(null);

  // Initialize audio on component mount
  useEffect(() => {
    audioElement.current = new Audio();
    
    // Set up audio event handlers
    audioElement.current.onended = () => {
      if (currentSong) {
        setProgress(prev => ({
          ...prev,
          [currentSong.id]: 0
        }));
      }
      
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.currentTime = 0;
      }
      
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      
      setIsPlaying(false);
      setCurrentSong(null);
    };
    audioElement.current.onpause = () => setIsPlaying(false);
    audioElement.current.onplay = () => setIsPlaying(true);
    
    // Clean up on unmount
    return () => {
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.currentTime = 0;
      }
      
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      
      setIsPlaying(false);
    };
  }, []);

  // Handler for accordion expansion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Stop playing and clean up resources
  const stopAndCleanup = () => {
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
    }
    
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    
    setIsPlaying(false);
    
    if (currentSong) {
      setProgress(prev => ({
        ...prev,
        [currentSong.id]: 0
      }));
      setCurrentSong(null);
    }
  };

  // Handle song end event
  const handleSongEnd = () => {
    if (currentSong) {
      setProgress(prev => ({
        ...prev,
        [currentSong.id]: 0
      }));
    }
    
    stopAndCleanup();
  };

  // Start or pause a song
  const handlePlayPause = (song) => {
    // If same song is clicked while playing, pause it
    if (currentSong && currentSong.id === song.id && isPlaying) {
      audioElement.current.pause();
      setIsPlaying(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      return;
    }
    
    // If different song, stop current and play new one
    if (currentSong && currentSong.id !== song.id) {
      stopAndCleanup();
    }
    
    // Set up and play the new song
    setCurrentSong(song);
    audioElement.current.src = song.file;
    
    // Play and start tracking progress
    const playPromise = audioElement.current.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
        
        // Update progress every second
        progressInterval.current = setInterval(() => {
          if (audioElement.current) {
            const currentProgress = (audioElement.current.currentTime / audioElement.current.duration) * 100;
            setProgress(prev => ({
              ...prev,
              [song.id]: currentProgress
            }));
          }
        }, 1000);
      }).catch(error => {
        console.error("Playback error:", error);
        stopAndCleanup();
      });
    }
  };

  // Stop the currently playing song
  const handleStop = () => {
    stopAndCleanup();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        The Songs
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Explore the essential tango, vals, milonga, and interesting fusion songs in our collection. Click on any song to listen.
      </Typography>

      {Object.keys(songData).map(category => (
        <Accordion 
          key={category} 
          expanded={expanded === category} 
          onChange={handleChange(category)}
          sx={{ 
            mb: 2,
            boxShadow: 2,
            '&:before': { display: 'none' },
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.03)',
              borderBottom: expanded === category ? '1px solid rgba(0, 0, 0, 0.125)' : 'none'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: expanded === category ? 'bold' : 'normal' }}>
              {category} ({songData[category].length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 3 }}>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Controls</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Orchestra</TableCell>
                    <TableCell>Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {songData[category].map((song) => (
                    <TableRow key={song.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handlePlayPause(song)}
                            color="primary"
                          >
                            {currentSong?.id === song.id && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={handleStop}
                            disabled={!(currentSong?.id === song.id)}
                            color="error"
                          >
                            <StopIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>{song.title}</TableCell>
                      <TableCell>{song.orchestra}</TableCell>
                      <TableCell sx={{ width: '40%' }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={progress[song.id] || 0} 
                          sx={{ height: 8, borderRadius: 2 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}