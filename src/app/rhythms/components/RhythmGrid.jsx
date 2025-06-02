"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Alert,
  IconButton,
  Tooltip,
  Slider
} from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import * as Tone from 'tone';
import GridCell from './GridCell';
import GridPlaybackControls from './GridPlaybackControls';
import RhythmPresetSelector from './RhythmPresetSelector';

// Sound definitions for Tone.js
const DRUM_SOUNDS = {
  kick: { frequency: 60, envelope: { attack: 0.01, decay: 0.3, sustain: 0 } },
  snare: { frequency: 200, envelope: { attack: 0.01, decay: 0.2, sustain: 0 } },
  hihat: { frequency: 800, envelope: { attack: 0.01, decay: 0.1, sustain: 0 } },
  rim: { frequency: 300, envelope: { attack: 0.01, decay: 0.15, sustain: 0 } }
};

const BASS_NOTES = {
  'A': 55.00,   // A1
  'A#': 58.27,  // A#1/Bb1
  'Bb': 58.27,  // Bb1 (same as A#)
  'B': 61.74,   // B1
  'C': 65.41,   // C2
  'C#': 69.30,  // C#2/Db2
  'Db': 69.30,  // Db2 (same as C#)
  'D': 73.42,   // D2
  'D#': 77.78,  // D#2/Eb2
  'Eb': 77.78,  // Eb2 (same as D#)
  'E': 82.41,   // E2
  'F': 87.31,   // F2
  'F#': 92.50,  // F#2/Gb2
  'Gb': 92.50,  // Gb2 (same as F#)
  'G': 98.00,   // G2
  'G#': 103.83, // G#2/Ab2
  'Ab': 103.83  // Ab2 (same as G#)
};

export default function RhythmGrid() {
  const [rhythmData, setRhythmData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [loading, setLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [mutedTracks, setMutedTracks] = useState({
    drumA: false,
    drumB: false,
    bass: false,
    bassB: false
  });
  const [trackVolumes, setTrackVolumes] = useState({
    drumA: 70,
    drumB: 70, 
    bass: 70,
    bassB: 70
  });

  // Tone.js refs
  const synthsRef = useRef({
    drumA: null,
    drumB: null,
    bass: null,
    bassB: null
  });
  const sequenceRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Initialize Tone.js components
  const initializeAudio = useCallback(async () => {
    if (isInitializedRef.current) return;

    try {
      // Create synths for each track
      synthsRef.current.drumA = new Tone.MembraneSynth().toDestination();
      synthsRef.current.drumB = new Tone.MembraneSynth().toDestination();
      synthsRef.current.bass = new Tone.Synth().toDestination();
      synthsRef.current.bassB = new Tone.Synth().toDestination();

      // Set up transport
      Tone.Transport.bpm.value = bpm;
      
      isInitializedRef.current = true;
      setAudioError(null);
    } catch (error) {
      console.error('Error initializing audio:', error);
      setAudioError('Failed to initialize audio system. Please check your browser audio settings.');
    }
  }, [bpm]);

  // Client-side initialization to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Clean up Tone.js on unmount
  useEffect(() => {
    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
      }
      Object.values(synthsRef.current).forEach(synth => {
        if (synth) synth.dispose();
      });
      Tone.Transport.stop();
    };
  }, []);

  // Handle preset selection
  const handlePresetChange = (preset) => {
    setRhythmData(preset);
    if (preset) {
      setBpm(preset.defaultBPM);
    }
    handleStop(); // Stop playback when changing presets
  };

  // Handle cell click (toggle active state) - avoid sequence recreation
  const handleCellClick = (trackType, stepIndex, isActive) => {
    if (!rhythmData) return;

    // Create new rhythm data without triggering sequence recreation
    setRhythmData(prevData => {
      const newRhythmData = { ...prevData };
      newRhythmData.tracks[trackType][stepIndex] = {
        ...newRhythmData.tracks[trackType][stepIndex],
        isActive: isActive
      };
      return newRhythmData;
    });
  };

  // Handle cell data change (sound, note, intensity, etc.) - avoid sequence recreation
  const handleCellChange = (trackType, stepIndex, newCellData) => {
    if (!rhythmData) return;

    // Create new rhythm data without triggering sequence recreation
    setRhythmData(prevData => {
      const newRhythmData = { ...prevData };
      newRhythmData.tracks[trackType][stepIndex] = newCellData;
      return newRhythmData;
    });
  };

  // Handle BPM change
  const handleBpmChange = (newBpm) => {
    setBpm(newBpm);
    if (isInitializedRef.current) {
      Tone.Transport.bpm.value = newBpm;
    }
  };

  // Handle track mute toggle - works during playback
  const handleTrackMute = (trackType) => {
    setMutedTracks(prev => {
      const newMutedState = !prev[trackType];
      
      // Immediately apply mute to the synth if it exists
      if (synthsRef.current[trackType]) {
        if (newMutedState) {
          // Mute: set volume to -Infinity
          synthsRef.current[trackType].volume.value = -Infinity;
        } else {
          // Unmute: restore volume based on track volume setting
          const trackVolumeDb = (trackVolumes[trackType] / 100) * 40 - 40;
          synthsRef.current[trackType].volume.value = trackVolumeDb;
        }
      }
      
      return {
        ...prev,
        [trackType]: newMutedState
      };
    });
  };

  // Handle track volume change - works during playback
  const handleTrackVolume = (trackType, volume) => {
    setTrackVolumes(prev => ({
      ...prev,
      [trackType]: volume
    }));
    
    // Immediately apply volume to the synth if it exists and not muted
    if (synthsRef.current[trackType] && !mutedTracks[trackType]) {
      const trackVolumeDb = (volume / 100) * 40 - 40;
      synthsRef.current[trackType].volume.value = trackVolumeDb;
    }
  };

  // Create and schedule the sequence
  const createSequence = useCallback(() => {
    if (!rhythmData || !isInitializedRef.current) return;

    // Clear existing sequence
    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }

    const { tracks, loopLength } = rhythmData;
    
    sequenceRef.current = new Tone.Sequence(
      (time, step) => {
        // Update current step for indicator
        setCurrentStep(step);

        // Play drum A - muting handled by synth volume
        const drumACell = tracks.drumA[step];
        if (drumACell?.isActive && synthsRef.current.drumA) {
          const sound = DRUM_SOUNDS[drumACell.sound] || DRUM_SOUNDS.kick;
          synthsRef.current.drumA.triggerAttackRelease(sound.frequency, "8n", time);
        }

        // Play drum B - muting handled by synth volume
        const drumBCell = tracks.drumB[step];
        if (drumBCell?.isActive && synthsRef.current.drumB) {
          const sound = DRUM_SOUNDS[drumBCell.sound] || DRUM_SOUNDS.snare;
          synthsRef.current.drumB.triggerAttackRelease(sound.frequency, "8n", time);
        }

        // Play bass - muting handled by synth volume
        const bassCell = tracks.bass[step];
        if (bassCell?.isActive && synthsRef.current.bass) {
          const noteFreq = BASS_NOTES[bassCell.note] || BASS_NOTES.A;
          const octaveMultiplier = Math.pow(2, (bassCell.octave || 2) - 1);
          const frequency = noteFreq * octaveMultiplier;
          synthsRef.current.bass.triggerAttackRelease(frequency, "8n", time);
        }

        // Play bass B - muting handled by synth volume
        const bassBCell = tracks.bassB[step];
        if (bassBCell?.isActive && synthsRef.current.bassB) {
          const noteFreq = BASS_NOTES[bassBCell.note] || BASS_NOTES.A;
          const octaveMultiplier = Math.pow(2, (bassBCell.octave || 2) - 1);
          const frequency = noteFreq * octaveMultiplier;
          synthsRef.current.bassB.triggerAttackRelease(frequency, "8n", time);
        }
      },
      Array.from({ length: loopLength }, (_, i) => i),
      "8n"
    );

    sequenceRef.current.loop = true;
  }, [rhythmData]);

  // Track when preset changes to recreate sequence (not for cell edits)
  const [lastPresetName, setLastPresetName] = useState(null);
  
  // Recreate sequence only when preset changes (not for cell edits)
  useEffect(() => {
    if (rhythmData && isInitializedRef.current) {
      // Only recreate sequence if preset changed, not cell edits
      if (rhythmData.name !== lastPresetName) {
        setLastPresetName(rhythmData.name);
        createSequence();
      }
    }
  }, [rhythmData, createSequence, lastPresetName]);

  // Handle play
  const handlePlay = async () => {
    try {
      if (!isInitializedRef.current) {
        await initializeAudio();
      }

      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      createSequence();
      
      if (sequenceRef.current) {
        sequenceRef.current.start();
        Tone.Transport.start();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error starting playback:', error);
      setAudioError('Failed to start playback. Please try again.');
    }
  };

  // Handle pause
  const handlePause = () => {
    Tone.Transport.pause();
    setIsPlaying(false);
  };

  // Handle stop
  const handleStop = () => {
    Tone.Transport.stop();
    if (sequenceRef.current) {
      sequenceRef.current.stop();
    }
    setIsPlaying(false);
    setCurrentStep(0);
  };

  // Update BPM when it changes
  useEffect(() => {
    if (isInitializedRef.current) {
      Tone.Transport.bpm.value = bpm;
    }
  }, [bpm]);

  // Prevent hydration mismatch by only rendering interactive components on client
  if (!isClient) {
    return (
      <Box>
        <RhythmPresetSelector 
          selectedPreset={null}
          onPresetChange={() => {}}
          loading={false}
        />
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Loading interactive rhythm grid...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!rhythmData) {
    return (
      <Box>
        <RhythmPresetSelector 
          selectedPreset={rhythmData}
          onPresetChange={handlePresetChange}
          loading={loading}
        />
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Select a rhythm preset above to begin
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <RhythmPresetSelector 
        selectedPreset={rhythmData}
        onPresetChange={handlePresetChange}
        loading={loading}
      />

      {audioError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {audioError}
        </Alert>
      )}

      {/* Rhythm Grid */}
      <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Rhythm Grid
        </Typography>
        
        {/* Track Labels and Grid */}
        <Box sx={{ overflowX: 'auto' }}>
          {Object.entries(rhythmData.tracks).map(([trackType, trackData]) => (
            <Box key={trackType} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    minWidth: { xs: 60, sm: 80 }, 
                    fontWeight: 'bold',
                    color: (trackType === 'bass' || trackType === 'bassB') ? '#4caf50' : '#1976d2'
                  }}
                >
                  {trackType === 'drumA' ? 'Drum A' : 
                   trackType === 'drumB' ? 'Drum B' : 
                   trackType === 'bass' ? 'Bass A' :
                   trackType === 'bassB' ? 'Bass B' : trackType}
                </Typography>
                
                {/* Mute Button */}
                <Tooltip title={mutedTracks[trackType] ? 'Unmute Track' : 'Mute Track'}>
                  <IconButton
                    onClick={() => handleTrackMute(trackType)}
                    size="small"
                    sx={{
                      ml: 1,
                      color: mutedTracks[trackType] ? '#f44336' : '#666',
                      '&:hover': {
                        backgroundColor: mutedTracks[trackType] ? 'rgba(244, 67, 54, 0.1)' : 'rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    {mutedTracks[trackType] ? <VolumeOffIcon /> : <VolumeUpIcon />}
                  </IconButton>
                </Tooltip>
                
                {/* Volume Slider */}
                <Box sx={{ ml: 2, minWidth: 100, maxWidth: 150 }}>
                  <Slider
                    value={trackVolumes[trackType]}
                    onChange={(_, value) => handleTrackVolume(trackType, value)}
                    min={0}
                    max={100}
                    size="small"
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    sx={{
                      color: (trackType === 'bass' || trackType === 'bassB') ? '#4caf50' : '#1976d2',
                      '& .MuiSlider-thumb': {
                        width: 16,
                        height: 16
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {trackData.map((cellData, stepIndex) => (
                    <GridCell
                      key={stepIndex}
                      cellData={cellData}
                      trackType={trackType}
                      stepIndex={stepIndex}
                      isPlaying={isPlaying}
                      currentStep={currentStep}
                      onCellClick={(step, active) => handleCellClick(trackType, step, active)}
                      onCellChange={(step, newData) => handleCellChange(trackType, step, newData)}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Playback Controls */}
      <GridPlaybackControls
        isPlaying={isPlaying}
        bpm={bpm}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
        onBpmChange={handleBpmChange}
        currentStep={currentStep}
        totalSteps={rhythmData.loopLength}
      />
    </Box>
  );
}