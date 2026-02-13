"use client";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import timelineCategories from '../../data/tangoTimelineData';

const category = timelineCategories.find(c => c.categoryId === 'dancers');

export default function DancersTimelinePage() {
  const [expanded, setExpanded] = useState(false);

  // Handle hash navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setExpanded(hash);
        // Scroll to the element after a brief delay
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
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
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: category.color }}>
          {category.categoryTitle}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {category.categorySubtitle}
        </Typography>
        <Typography variant="body1" paragraph>
          The story of tango is told through its dancers — from the Guardian Generation who learned
          in the Golden Age milongas, through the Bridge Generation who codified and taught, to the
          Nuevo innovators who analyzed and expanded the vocabulary.
        </Typography>
      </Box>

      {/* Vertical Timeline */}
      <Box sx={{ position: 'relative', pl: 3 }}>
        {/* Timeline line */}
        <Box sx={{
          position: 'absolute',
          left: 12,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: category.color,
          opacity: 0.3
        }} />

        {category.eras.map((era, index) => {
          const isPopulated = era.status === 'populated';
          const isPartial = era.status === 'partial';

          return (
            <Box key={era.id} id={era.id} sx={{ mb: 3, position: 'relative' }}>
              {/* Timeline dot */}
              <Box sx={{
                position: 'absolute',
                left: -24,
                top: 20,
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: isPopulated ? 'success.main' : isPartial ? 'warning.main' : 'grey.400',
                border: '3px solid white',
                boxShadow: 1
              }} />

              <Accordion
                expanded={expanded === era.id}
                onChange={handleChange(era.id)}
                sx={{
                  '&:before': { display: 'none' },
                  boxShadow: expanded === era.id ? 3 : 1
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor: expanded === era.id ? category.color : 'background.paper',
                    color: expanded === era.id ? 'white' : 'text.primary',
                    '&:hover': { bgcolor: expanded === era.id ? category.color : 'action.hover' }
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{era.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {era.subtitle} • {era.yearStart}–{era.yearEnd}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={isPopulated ? 'Complete' : isPartial ? 'Partial' : 'Coming Soon'}
                    sx={{
                      mr: 2,
                      bgcolor: isPopulated ? 'success.light' : isPartial ? 'warning.light' : 'grey.300'
                    }}
                  />
                </AccordionSummary>

                <AccordionDetails>
                  {/* Summary bullets */}
                  {era.summary && era.summary[0] !== "Content coming soon" && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>Summary</Typography>
                      <List dense>
                        {era.summary.map((point, i) => (
                          <ListItem key={i} sx={{ py: 0.5 }}>
                            <ListItemText
                              primary={`• ${point}`}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Styles (if present) */}
                  {era.styles && era.styles.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>Styles</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {era.styles.map((style, i) => (
                          <Chip
                            key={i}
                            label={style.name}
                            title={style.description}
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Key Figures */}
                  {era.keyFigures && era.keyFigures.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>Key Figures</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {era.keyFigures.map((figure, i) => (
                          <Chip
                            key={i}
                            icon={figure.type === 'couple' ? <GroupIcon /> : <PersonIcon />}
                            label={
                              <Box>
                                <span>{figure.name}</span>
                                {figure.born && (
                                  <Typography component="span" variant="caption" sx={{ ml: 0.5, opacity: 0.7 }}>
                                    ({figure.born}–{figure.died || 'present'})
                                  </Typography>
                                )}
                              </Box>
                            }
                            variant="outlined"
                            sx={{
                              height: 'auto',
                              '& .MuiChip-label': { py: 0.5 }
                            }}
                            title={figure.role || figure.style}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Paper download */}
                  {era.paperPath && (
                    <Box sx={{ mt: 2 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        href={era.paperPath}
                        download
                        size="small"
                      >
                        Download Full Research Paper
                      </Button>
                    </Box>
                  )}

                  {/* Placeholder for empty eras */}
                  {era.status === 'placeholder' && (
                    <Typography variant="body2" color="text.secondary" fontStyle="italic">
                      Detailed content coming soon. Check back as we continue building this resource.
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
      </Box>

      {/* Related Links */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Related Pages</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button component={Link} href="/dancers" variant="outlined">
            Influential Dancers
          </Button>
          <Button component={Link} href="/tango-history/argentina" variant="outlined">
            Argentina Timeline
          </Button>
          <Button component={Link} href="/terms-argentine-tango" variant="outlined">
            Tango Terminology
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
