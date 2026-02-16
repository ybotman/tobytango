"use client";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  Divider,
  Skeleton,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicIcon from '@mui/icons-material/Mic';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPersonBySlug, typeLabels, generationLabels } from '../../data/peopleData';

const typeIcons = {
  dancer: <PersonIcon sx={{ fontSize: 40 }} />,
  musician: <MusicNoteIcon sx={{ fontSize: 40 }} />,
  singer: <MicIcon sx={{ fontSize: 40 }} />,
  composer: <MusicNoteIcon sx={{ fontSize: 40 }} />,
  teacher: <SchoolIcon sx={{ fontSize: 40 }} />,
  organizer: <PersonIcon sx={{ fontSize: 40 }} />
};

const generationColors = {
  guardian: '#8B4513',
  bridge: '#2E7D32',
  stage: '#7B1FA2',
  nuevo: '#1976D2',
  'golden-age': '#F9A825',
  'post-golden': '#E65100'
};

export default function PersonProfilePage() {
  const params = useParams();
  const slug = params.slug;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const person = getPersonBySlug(slug);

  // Fetch markdown content
  useEffect(() => {
    if (!person) {
      setLoading(false);
      return;
    }

    fetch(person.paperPath)
      .then(res => {
        if (!res.ok) {
          throw new Error('Profile not yet available');
        }
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [person]);

  // Person not found in registry
  if (!person) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          component={Link}
          href="/people"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to People
        </Button>
        <Alert severity="error">
          Person not found: {slug}
        </Alert>
      </Container>
    );
  }

  // Parse markdown content (simple parser for display)
  const renderContent = (markdown) => {
    if (!markdown) return null;

    // Split into sections by ## headers
    const sections = markdown.split(/(?=^## )/gm);

    return sections.map((section, idx) => {
      const lines = section.trim().split('\n');
      const firstLine = lines[0];

      // Check if it's a header
      if (firstLine.startsWith('## ')) {
        const headerText = firstLine.replace('## ', '');
        const bodyLines = lines.slice(1).join('\n').trim();

        return (
          <Box key={idx} sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              {headerText}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {bodyLines}
            </Typography>
          </Box>
        );
      } else if (firstLine.startsWith('# ')) {
        // Skip title header, we display it separately
        return null;
      } else {
        // Regular content
        return (
          <Typography
            key={idx}
            variant="body1"
            component="div"
            sx={{ whiteSpace: 'pre-wrap', mb: 2 }}
          >
            {section.trim()}
          </Typography>
        );
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Link */}
      <Button
        component={Link}
        href="/people"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to People
      </Button>

      {/* Header Card */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderLeft: `6px solid ${generationColors[person.generation] || '#666'}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          {/* Icon / Photo Placeholder */}
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: 2,
              bgcolor: generationColors[person.generation] || '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0
            }}
          >
            {typeIcons[person.type]}
          </Box>

          {/* Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {person.displayName}
            </Typography>

            {person.fullName !== person.displayName && (
              <Typography variant="subtitle1" color="text.secondary">
                {person.fullName}
              </Typography>
            )}

            {person.born && (
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {person.born}–{person.died || 'present'}
                {person.nationality && ` • ${person.nationality}`}
              </Typography>
            )}

            <Typography variant="body1" sx={{ mb: 2 }}>
              {person.summary}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label={generationLabels[person.generation] || person.generation}
                sx={{
                  bgcolor: generationColors[person.generation],
                  color: 'white'
                }}
              />
              <Chip
                label={typeLabels[person.type]}
                variant="outlined"
              />
              {person.tags.slice(0, 4).map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Content Area */}
      {loading ? (
        <Box>
          <Skeleton variant="text" height={40} width="60%" />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} width="80%" />
          <Skeleton variant="text" height={40} width="50%" sx={{ mt: 3 }} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
        </Box>
      ) : error ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          Full profile coming soon. This person is queued for research.
        </Alert>
      ) : (
        <Box>
          {renderContent(content)}

          <Divider sx={{ my: 3 }} />

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            href={person.paperPath}
            download
          >
            Download Full Profile
          </Button>
        </Box>
      )}

      {/* Related Links */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Related</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button component={Link} href="/people" variant="outlined">
            All People
          </Button>
          {person.type === 'dancer' && (
            <Button component={Link} href="/tango-history/dancers" variant="outlined">
              Dancers Timeline
            </Button>
          )}
          {(person.type === 'musician' || person.type === 'composer') && (
            <Button component={Link} href="/tango-history/orchestras" variant="outlined">
              Orchestras Timeline
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
