"use client";

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicIcon from '@mui/icons-material/Mic';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import peopleData, { typeLabels, generationLabels, getPublishedPeople } from '../data/peopleData';

const typeIcons = {
  dancer: <PersonIcon />,
  musician: <MusicNoteIcon />,
  singer: <MicIcon />,
  composer: <MusicNoteIcon />,
  teacher: <SchoolIcon />,
  organizer: <PersonIcon />
};

const generationColors = {
  guardian: '#8B4513',
  bridge: '#2E7D32',
  stage: '#7B1FA2',
  nuevo: '#1976D2',
  'golden-age': '#F9A825',
  'post-golden': '#E65100'
};

export default function PeopleIndexPage() {
  const [filterType, setFilterType] = useState('all');
  const [filterGeneration, setFilterGeneration] = useState('all');

  // Filter people - show all, but mark unpublished
  const filteredPeople = peopleData.filter(person => {
    if (filterType !== 'all' && person.type !== filterType) return false;
    if (filterGeneration !== 'all' && person.generation !== filterGeneration) return false;
    return true;
  });

  // Sort by priority (lower = higher priority)
  const sortedPeople = [...filteredPeople].sort((a, b) => a.priority - b.priority);

  // Get unique types and generations for filter buttons
  const types = [...new Set(peopleData.map(p => p.type))];
  const generations = [...new Set(peopleData.map(p => p.generation))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Link */}
      <Button
        component={Link}
        href="/tango-history"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Timeline
      </Button>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          People of Tango
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Dancers, Musicians, Composers, and Cultural Figures
        </Typography>
        <Typography variant="body1" paragraph>
          The individuals who shaped tango's evolution from the conventillos of Buenos Aires
          to stages and milongas worldwide.
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="subtitle2" gutterBottom>Filter by Type</Typography>
        <ToggleButtonGroup
          value={filterType}
          exclusive
          onChange={(e, val) => val && setFilterType(val)}
          size="small"
          sx={{ mb: 2, flexWrap: 'wrap' }}
        >
          <ToggleButton value="all">All</ToggleButton>
          {types.map(type => (
            <ToggleButton key={type} value={type}>
              {typeLabels[type] || type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>Filter by Generation</Typography>
        <ToggleButtonGroup
          value={filterGeneration}
          exclusive
          onChange={(e, val) => val && setFilterGeneration(val)}
          size="small"
          sx={{ flexWrap: 'wrap' }}
        >
          <ToggleButton value="all">All</ToggleButton>
          {generations.map(gen => (
            <ToggleButton key={gen} value={gen}>
              {generationLabels[gen] || gen}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {sortedPeople.length} of {peopleData.length} profiles
      </Typography>

      {/* People Grid */}
      <Grid container spacing={3}>
        {sortedPeople.map(person => {
          const isPublished = person.status === 'published';
          const isDraft = person.status === 'draft';

          return (
            <Grid key={person.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: isPublished ? 1 : 0.7,
                  borderLeft: `4px solid ${generationColors[person.generation] || '#666'}`
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {typeIcons[person.type]}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {person.displayName}
                    </Typography>
                  </Box>

                  {person.born && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {person.born}–{person.died || 'present'}
                    </Typography>
                  )}

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {person.summary}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip
                      label={generationLabels[person.generation] || person.generation}
                      size="small"
                      sx={{
                        bgcolor: generationColors[person.generation],
                        color: 'white',
                        fontSize: '0.7rem'
                      }}
                    />
                    <Chip
                      label={typeLabels[person.type]}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                </CardContent>

                <CardActions>
                  {isPublished ? (
                    <Button
                      component={Link}
                      href={`/people/${person.slug}`}
                      size="small"
                      variant="contained"
                    >
                      View Profile
                    </Button>
                  ) : (
                    <Chip
                      label={isDraft ? 'Draft' : 'Coming Soon'}
                      size="small"
                      color={isDraft ? 'warning' : 'default'}
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Related Links */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Related Pages</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button component={Link} href="/tango-history/dancers" variant="outlined">
            Dancers Timeline
          </Button>
          <Button component={Link} href="/tango-history/orchestras" variant="outlined">
            Orchestras Timeline
          </Button>
          <Button component={Link} href="/terms-argentine-tango" variant="outlined">
            Tango Terminology
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
