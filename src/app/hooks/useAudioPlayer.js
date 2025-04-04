"use client";

import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for audio player functionality
 * @param {Object} options - Configuration options
 * @param {number} options.defaultVolume - Default volume level (0-1)
 * @returns {Object} Audio player state and controls
 */
export default function useAudioPlayer(options = {}) {
  const { defaultVolume = 0.7 } = options;
  
  // State for audio player
  const [isPlaying, setIsPlaying] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const [volume, setVolume] = useState(defaultVolume);
  const [muted, setMuted] = useState(false);
  const [pulseData, setPulseData] = useState({});
  
  // Refs for audio elements
  const audioRefs = useRef({});

  // Format time helper
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Handle play/pause
  const togglePlay = async (example) => {
    const audio = audioRefs.current[example.id];
    
    if (!audio) return;
    
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
      
      // Fetch pulse data if not already loaded
      if (!pulseData[example.id]) {
        try {
          // Get JSON file path from audio file path (replace extension)
          const jsonPath = example.file.replace(/\.[^.]+$/, '.json');
          const response = await fetch(jsonPath);
          
          if (response.ok) {
            const data = await response.json();
            setPulseData(prev => ({...prev, [example.id]: data.pulses || []}));
          } else {
            console.warn(`No pulse data found for ${example.id}`);
            setPulseData(prev => ({...prev, [example.id]: []}));
          }
        } catch (error) {
          console.error("Error loading pulse data:", error);
          setPulseData(prev => ({...prev, [example.id]: []}));
        }
      }
      
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

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    audioRefs,
    formatTime,
    togglePlay,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleSliderChange,
    handleVolumeChange,
    toggleMute,
    pulseData
  };
}