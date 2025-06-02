"use client";

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Alert
} from '@mui/material';
import RhythmPresetSelector from '../components/RhythmPresetSelector';
import GridCell from '../components/GridCell';
import GridPlaybackControls from '../components/GridPlaybackControls';
import * as Tone from 'tone';

export default function CannedRhythmsPage() {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Interactive Rhythm Grid
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Select a rhythm preset to begin creating and playing rhythms. 
        Click cells to toggle sounds, adjust tempo, and experiment with different patterns.
        Right-click or long-press cells for detailed sound selection.
      </Typography>

      {/* Always show the preset selector at the top */}
      <RhythmPresetSelector 
        selectedPreset={selectedPreset}
        onPresetChange={handlePresetChange}
        loading={loading}
      />

      {!selectedPreset && (
        <Alert severity="info" sx={{ mt: 3 }}>
          Select a rhythm preset above to begin creating and editing rhythms.
        </Alert>
      )}

      {selectedPreset && (
        <Box sx={{ mt: 3 }}>
          {/* This will be the full rhythm grid once a preset is selected */}
          <Typography variant="h6" gutterBottom>
            Now editing: {selectedPreset.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Time Signature: {selectedPreset.timeSignature} | 
            BPM: {selectedPreset.defaultBPM} | 
            Length: {selectedPreset.loopLength} steps
          </Typography>

          {/* Show the rhythm grid tracks */}
          {Object.entries(selectedPreset.tracks).map(([trackType, trackData]) => (
            <Box key={trackType} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                {trackType === 'drumA' ? 'Drum A' : 
                 trackType === 'drumB' ? 'Drum B' : 
                 trackType === 'bass' ? 'Bass A' :
                 trackType === 'bassB' ? 'Bass B' : trackType}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {trackData.map((cellData, stepIndex) => (
                  <Box key={stepIndex} sx={{ 
                    minWidth: 45, 
                    minHeight: 45, 
                    border: '1px solid #ccc', 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: cellData.isActive ? 
                      (trackType.includes('bass') ? '#4caf50' : '#2196f3') : '#f5f5f5',
                    opacity: cellData.isActive ? 0.8 : 0.3,
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: cellData.isActive ? 'white' : '#666'
                  }}>
                    {stepIndex + 1}
                    {cellData.isActive && (
                      <Box sx={{ ml: 0.5, fontSize: '0.6rem' }}>
                        {trackType.includes('bass') ? 
                          `${cellData.note}${cellData.octave}` : 
                          cellData.intensity?.charAt(0).toUpperCase()}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}

          <Alert severity="success" sx={{ mt: 2 }}>
            Full interactive grid with playback controls coming next! 
            This shows the selected preset data structure.
          </Alert>
        </Box>
      )}
    </Container>
  );
}