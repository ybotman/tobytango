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
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link as MuiLink
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MicIcon from '@mui/icons-material/Mic';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

// Custom components for ReactMarkdown to use MUI
const markdownComponents = {
  h1: ({ children }) => (
    <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600, borderBottom: '2px solid', borderColor: 'primary.main', pb: 1 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Paper
      elevation={0}
      sx={{
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        pl: 3,
        py: 1,
        my: 2,
        bgcolor: 'action.hover',
        fontStyle: 'italic'
      }}
    >
      {children}
    </Paper>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, my: 2 }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, my: 2 }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }}>
      {children}
    </Typography>
  ),
  table: ({ children }) => (
    <TableContainer component={Paper} sx={{ my: 3 }} elevation={1}>
      <Table size="small">
        {children}
      </Table>
    </TableContainer>
  ),
  thead: ({ children }) => (
    <TableHead sx={{ bgcolor: 'primary.main' }}>
      {children}
    </TableHead>
  ),
  tbody: ({ children }) => (
    <TableBody>
      {children}
    </TableBody>
  ),
  tr: ({ children }) => (
    <TableRow hover>
      {children}
    </TableRow>
  ),
  th: ({ children }) => (
    <TableCell sx={{ fontWeight: 600, color: 'white' }}>
      {children}
    </TableCell>
  ),
  td: ({ children }) => (
    <TableCell>
      {children}
    </TableCell>
  ),
  a: ({ href, children }) => (
    <MuiLink href={href} target="_blank" rel="noopener noreferrer" underline="hover">
      {children}
    </MuiLink>
  ),
  hr: () => (
    <Divider sx={{ my: 4 }} />
  ),
  strong: ({ children }) => (
    <Box component="strong" sx={{ fontWeight: 600 }}>
      {children}
    </Box>
  ),
  em: ({ children }) => (
    <Box component="em" sx={{ fontStyle: 'italic' }}>
      {children}
    </Box>
  ),
  code: ({ children }) => (
    <Box
      component="code"
      sx={{
        bgcolor: 'action.hover',
        px: 0.5,
        py: 0.25,
        borderRadius: 0.5,
        fontFamily: 'monospace',
        fontSize: '0.9em'
      }}
    >
      {children}
    </Box>
  ),
  pre: ({ children }) => (
    <Paper
      component="pre"
      sx={{
        p: 2,
        my: 2,
        overflow: 'auto',
        bgcolor: 'grey.900',
        color: 'grey.100',
        fontFamily: 'monospace',
        fontSize: '0.85em'
      }}
    >
      {children}
    </Paper>
  )
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
        // Remove YAML frontmatter if present
        const contentWithoutFrontmatter = text.replace(/^---[\s\S]*?---\n*/m, '');
        setContent(contentWithoutFrontmatter);
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {content}
          </ReactMarkdown>

          <Divider sx={{ my: 4 }} />

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
