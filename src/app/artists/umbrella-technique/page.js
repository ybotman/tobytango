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
import { ScatterChart } from '@mui/x-charts/ScatterChart';
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

  // Prepare data for scatter chart
  const chartData = artists
    .filter(artist => selectedArtists[artist.id])
    .map(artist => ({
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
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 600 }}>
            <ScatterChart
              width={700}
              height={550}
              series={[{
                data: chartData,
                label: 'Artists',
                valueFormatter: (value) => value.label
              }]}
              xAxis={[{
                min: -10,
                max: 10,
                label: 'Energy: Oppositional ← → Supportive',
                tickInterval: 5
              }]}
              yAxis={[{
                min: -10,
                max: 10,
                label: 'OnTheSpot: Memorized ← → Free',
                tickInterval: 5
              }]}
              grid={{ vertical: true, horizontal: true }}
              margin={{ top: 20, right: 20, bottom: 50, left: 70 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, maxHeight: 600, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Select Artists to Display
            </Typography>
            <FormGroup>
              {artists.map((artist) => (
                <FormControlLabel
                  key={artist.id}
                  control={
                    <Checkbox
                      checked={selectedArtists[artist.id] || false}
                      onChange={() => handleArtistToggle(artist.id)}
                    />
                  }
                  label={artist.fullName}
                />
              ))}
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          This visualization maps tango artist couples across two dimensions:
        </Typography>
        <Typography variant="body2" component="ul">
          <li><strong>X-axis (Energy):</strong> From Oppositional (-10) to Supportive (+10)</li>
          <li><strong>Y-axis (OnTheSpot):</strong> From Memorized (-10) to Free (+10)</li>
        </Typography>
      </Box>
    </Container>
  );
}