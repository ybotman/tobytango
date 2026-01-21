'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Paper,
  Button,
  Grid,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

export default function UmbrellaTechniquePage() {
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await fetch('/api/artists-umbrella');
      const data = await response.json();
      setArtists(data);
      
      // Initialize all artists as selected
      const initialSelection = {};
      data.forEach(artist => {
        initialSelection[artist.id] = true;
      });
      setSelectedArtists(initialSelection);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artists:', error);
      setLoading(false);
    }
  };

  const handleArtistToggle = (artistId) => {
    setSelectedArtists(prev => ({
      ...prev,
      [artistId]: !prev[artistId]
    }));
  };

  // Color palette for artists
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7B731', '#5F27CD', '#00D9FF', '#A29BFE', '#FD79A8',
    '#74B9FF', '#A0E7E5', '#FFBE76', '#FF7979', '#BADC58',
    '#6C5CE7', '#FFEAA7', '#DFE6E9', '#00B894', '#0984E3',
    '#E17055', '#FDCB6E', '#6C5CE7', '#00CEC9', '#E84393',
    '#0984E3', '#A29BFE', '#FD79A8', '#FDCB6E', '#6C5CE7'
  ];

  // Prepare data for scatter chart
  const chartData = artists
    .filter(artist => selectedArtists[artist.id])
    .map((artist, index) => ({
      x: artist.energy,
      y: artist.onTheSpot,
      id: artist.shortName,
      label: artist.shortName
    }));

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Artist Dance Umbrella Technique
        </Typography>
        <Link href="/artists/umbrella-technique/edit" passHref>
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit Artists
          </Button>
        </Link>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, height: 700, position: 'relative' }}>
            <Box sx={{ position: 'relative', width: 900, height: 650, backgroundColor: '#2a2a2a' }}>
              {/* Custom grid implementation */}
              <svg width="900" height="650" style={{ position: 'absolute', top: 0, left: 0 }}>
                {/* Axis lines at 0,0 */}
                <line x1="450" y1="50" x2="450" y2="600" stroke="#fff" strokeWidth="2" />
                <line x1="50" y1="325" x2="850" y2="325" stroke="#fff" strokeWidth="2" />
                
                {/* Axis labels on the lines */}
                <text x="450" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">Improvised</text>
                <text x="450" y="620" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">Memorized</text>
                <text x="60" y="320" textAnchor="start" fontSize="16" fontWeight="bold" fill="#fff">Oppositional</text>
                <text x="840" y="320" textAnchor="end" fontSize="16" fontWeight="bold" fill="#fff">Supportive</text>
                
                {/* Axis ticks and labels */}
                {[-10, -5, 0, 5, 10].map(val => (
                  <g key={`x-${val}`}>
                    <line x1={450 + val * 40} y1={320} x2={450 + val * 40} y2={330} stroke="#fff" strokeWidth="2" />
                    <text x={450 + val * 40} y={345} textAnchor="middle" fontSize="14" fill="#fff">{val}</text>
                  </g>
                ))}
                {[-10, -5, 0, 5, 10].map(val => (
                  <g key={`y-${val}`}>
                    <line x1={445} y1={325 - val * 27.5} x2={455} y2={325 - val * 27.5} stroke="#fff" strokeWidth="2" />
                    <text x={430} y={330 - val * 27.5} textAnchor="end" fontSize="14" fill="#fff">{val}</text>
                  </g>
                ))}
                
                {/* Artist points and labels */}
                {chartData.map((point, index) => {
                  const x = 450 + (point.x * 40);
                  const y = 325 - (point.y * 27.5);
                  const color = colors[index % colors.length];
                  return (
                    <g key={point.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r={12}
                        fill={color}
                        stroke="#fff"
                        strokeWidth={2}
                        style={{ cursor: 'pointer' }}
                      />
                      <text
                        x={x}
                        y={y - 18}
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="bold"
                        fill={color}
                      >
                        {point.label}
                      </text>
                    </g>
                  );
                })}
                
              </svg>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, maxHeight: 700, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Select Artists to Display
            </Typography>
            <FormGroup>
              {artists.map((artist, index) => (
                <FormControlLabel
                  key={artist.id}
                  control={
                    <Checkbox
                      checked={selectedArtists[artist.id] || false}
                      onChange={() => handleArtistToggle(artist.id)}
                      sx={{
                        color: colors[index % colors.length],
                        '&.Mui-checked': {
                          color: colors[index % colors.length],
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: colors[index % colors.length],
                          border: '1px solid #fff',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                      />
                      {artist.fullName}
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          This visualization maps tango artist couples across two dimensions:
        </Typography>
        <Typography variant="body2" component="ul">
          <li><strong>X-axis (Energy):</strong> From Oppositional (-10) to Supportive (+10)</li>
          <li><strong>Y-axis (Improvisation):</strong> From Memorized (-10) to Improvised (+10)</li>
        </Typography>
      </Box>
    </Container>
  );
}