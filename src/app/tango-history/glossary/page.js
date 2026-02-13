"use client";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Tooltip,
  Link as MuiLink,
  CircularProgress,
  TextField,
  InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StyleIcon from '@mui/icons-material/Style';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';

// Type configuration with icons and display names
const typeConfig = {
  person: { label: 'People', icon: PersonIcon, color: '#1976d2' },
  couple: { label: 'Couples', icon: PeopleIcon, color: '#7b1fa2' },
  orchestra: { label: 'Orchestras', icon: MusicNoteIcon, color: '#c62828' },
  venue: { label: 'Venues', icon: PlaceIcon, color: '#2e7d32' },
  style: { label: 'Styles', icon: StyleIcon, color: '#ed6c02' },
  term: { label: 'Terms', icon: MenuBookIcon, color: '#0288d1' },
  event: { label: 'Events', icon: MenuBookIcon, color: '#d81b60' }
};

// Order for display
const typeOrder = ['person', 'couple', 'orchestra', 'venue', 'style', 'term', 'event'];

export default function GlossaryPage() {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState('');

  // Load index data
  useEffect(() => {
    fetch('/tango-papers/index/master-index.json')
      .then(res => res.json())
      .then(data => {
        setEntities(data.entities || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load index:', err);
        setLoading(false);
      });
  }, []);

  // Get unique types that exist in data
  const availableTypes = [...new Set(entities.map(e => e.type))].filter(t => typeConfig[t]);

  // Filter and search
  const filteredEntities = entities.filter(entity => {
    const matchesFilter = !filter || entity.type === filter;
    const searchLower = search.toLowerCase();
    const matchesSearch = !search ||
      entity.displayName.toLowerCase().includes(searchLower) ||
      entity.summary?.toLowerCase().includes(searchLower) ||
      entity.aliases?.some(a => a.toLowerCase().includes(searchLower));
    return matchesFilter && matchesSearch;
  });

  // Group by type
  const groupedEntities = {};
  typeOrder.forEach(type => {
    const items = filteredEntities.filter(e => e.type === type);
    if (items.length > 0) {
      groupedEntities[type] = items.sort((a, b) => a.displayName.localeCompare(b.displayName));
    }
  });

  // Format dates for display
  const formatLifespan = (entity) => {
    if (!entity.born && !entity.died) return null;
    const born = entity.born ? entity.born.split('-')[0] : '?';
    const died = entity.died ? entity.died.split('-')[0] : (entity.born ? 'present' : '?');
    return `${born}–${died}`;
  };

  // Build tooltip content
  const renderTooltip = (entity) => (
    <Box sx={{ p: 1, maxWidth: 300 }}>
      <Typography variant="subtitle2" fontWeight="bold">{entity.displayName}</Typography>
      {entity.fullName && entity.fullName !== entity.displayName && (
        <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
          {entity.fullName}
        </Typography>
      )}
      {formatLifespan(entity) && (
        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
          {formatLifespan(entity)}
        </Typography>
      )}
      {entity.location && (
        <Typography variant="caption" display="block">{entity.location}</Typography>
      )}
      <Typography variant="body2" sx={{ mt: 1 }}>{entity.summary}</Typography>
      {entity.styles && entity.styles.length > 0 && (
        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {entity.styles.map(s => (
            <Chip key={s} label={s} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
          ))}
        </Box>
      )}
      {entity.appearsIn && entity.appearsIn.length > 0 && (
        <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.7 }}>
          Click for more details
        </Typography>
      )}
    </Box>
  );

  // Get link for entity (first paper it appears in)
  const getEntityLink = (entity) => {
    if (entity.pageUrl) return entity.pageUrl;
    if (entity.appearsIn && entity.appearsIn.length > 0) {
      // Convert paper path to web path
      // /tango-papers/dancers/generations/pre-nuevo-masters.md -> /tango-history/dancers
      const paperPath = entity.appearsIn[0];
      const match = paperPath.match(/\/tango-papers\/(\w+)\//);
      if (match) {
        return `/tango-history/${match[1]}`;
      }
    }
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button component={Link} href="/tango-history" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to Timeline
      </Button>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Tango Index
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Índice del Tango
        </Typography>
        <Typography variant="body1" color="text.secondary">
          People, orchestras, venues, styles, and terms from the tango history timeline.
          Hover for quick definitions. Click for full articles.
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search index..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Type Filter */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={`All (${entities.length})`}
            onClick={() => setFilter(null)}
            variant={filter === null ? 'filled' : 'outlined'}
            color={filter === null ? 'primary' : 'default'}
          />
          {typeOrder.filter(t => availableTypes.includes(t)).map(type => {
            const config = typeConfig[type];
            const count = entities.filter(e => e.type === type).length;
            const Icon = config.icon;
            return (
              <Chip
                key={type}
                icon={<Icon sx={{ fontSize: 16 }} />}
                label={`${config.label} (${count})`}
                onClick={() => setFilter(filter === type ? null : type)}
                variant={filter === type ? 'filled' : 'outlined'}
                sx={{
                  borderColor: filter === type ? config.color : undefined,
                  bgcolor: filter === type ? config.color : undefined,
                  color: filter === type ? 'white' : undefined,
                  '&:hover': { borderColor: config.color }
                }}
              />
            );
          })}
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredEntities.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {search ? 'No results found' : 'No entries yet'}
          </Typography>
        </Paper>
      ) : (
        /* Grouped Entity Lists */
        Object.entries(groupedEntities).map(([type, items]) => {
          const config = typeConfig[type];
          const Icon = config.icon;

          return (
            <Paper key={type} sx={{ mb: 3, overflow: 'hidden' }}>
              {/* Section Header */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 2,
                bgcolor: config.color,
                color: 'white'
              }}>
                <Icon />
                <Typography variant="h6">{config.label}</Typography>
                <Chip
                  label={items.length}
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>

              {/* Entity Grid */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 0
              }}>
                {items.map((entity, i) => {
                  const link = getEntityLink(entity);
                  const lifespan = formatLifespan(entity);

                  const content = (
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: '1px solid',
                        borderRight: { xs: 'none', sm: '1px solid' },
                        borderColor: 'divider',
                        cursor: link ? 'pointer' : 'default',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          bgcolor: link ? 'action.hover' : 'transparent'
                        }
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        {entity.displayName}
                      </Typography>
                      {lifespan && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {lifespan}
                        </Typography>
                      )}
                      {entity.location && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {entity.location}
                        </Typography>
                      )}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {entity.summary}
                      </Typography>
                      {entity.styles && entity.styles.length > 0 && (
                        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {entity.styles.slice(0, 3).map(s => (
                            <Chip
                              key={s}
                              label={s}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.65rem', height: 20 }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  );

                  return (
                    <Tooltip key={entity.id} title={renderTooltip(entity)} placement="top" arrow>
                      {link ? (
                        <MuiLink
                          component={Link}
                          href={link}
                          underline="none"
                          color="inherit"
                        >
                          {content}
                        </MuiLink>
                      ) : (
                        content
                      )}
                    </Tooltip>
                  );
                })}
              </Box>
            </Paper>
          );
        })
      )}

      {/* Stats Footer */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>Index Status</Typography>
        <Typography variant="body2" color="text.secondary">
          {entities.length} entries indexed from {new Set(entities.flatMap(e => e.appearsIn || [])).size} source papers.
          This index grows automatically as content is added to the timeline.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {typeOrder.filter(t => availableTypes.includes(t)).map(type => {
            const config = typeConfig[type];
            const count = entities.filter(e => e.type === type).length;
            return (
              <Chip
                key={type}
                size="small"
                label={`${count} ${config.label.toLowerCase()}`}
                sx={{ bgcolor: config.color, color: 'white', fontSize: '0.7rem' }}
              />
            );
          })}
        </Box>
      </Paper>
    </Container>
  );
}
