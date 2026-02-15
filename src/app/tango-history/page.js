"use client";

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Tooltip,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import timelineCategories from '../data/tangoTimelineData';

// Timeline configuration
const TIMELINE_START = 1880;
const TIMELINE_END = 2030;
const PIXELS_PER_YEAR = 4;
const HEADER_HEIGHT = 50;

// Generate decade markers
const decades = [];
for (let year = 1880; year <= 2030; year += 10) {
  decades.push(year);
}

// Get position and height for an era
const getEraPosition = (yearStart, yearEnd) => {
  const top = (yearStart - TIMELINE_START) * PIXELS_PER_YEAR;
  const height = Math.max((yearEnd - yearStart) * PIXELS_PER_YEAR, 28);
  return { top, height };
};

const getYearPosition = (year) => {
  return (year - TIMELINE_START) * PIXELS_PER_YEAR;
};

// Calculate lanes for overlapping eras within a category
// Returns a map of eraId -> { lane, totalLanes }
const calculateEraLanes = (eras) => {
  const laneMap = {};

  // Sort eras by start year
  const sortedEras = [...eras].sort((a, b) => a.yearStart - b.yearStart);

  // Track which lanes are occupied at each point
  // Each lane entry is { endYear, eraId }
  const lanes = [];

  sortedEras.forEach(era => {
    // Find the first available lane (one that ends before this era starts)
    let assignedLane = -1;
    for (let i = 0; i < lanes.length; i++) {
      if (lanes[i].endYear <= era.yearStart) {
        assignedLane = i;
        lanes[i] = { endYear: era.yearEnd, eraId: era.id };
        break;
      }
    }

    // If no lane available, create a new one
    if (assignedLane === -1) {
      assignedLane = lanes.length;
      lanes.push({ endYear: era.yearEnd, eraId: era.id });
    }

    laneMap[era.id] = { lane: assignedLane };
  });

  // Calculate total lanes for each era (based on overlapping eras)
  sortedEras.forEach(era => {
    // Count how many eras overlap with this one
    let maxConcurrent = 1;
    sortedEras.forEach(other => {
      if (other.id !== era.id) {
        // Check if they overlap
        if (era.yearStart < other.yearEnd && era.yearEnd > other.yearStart) {
          maxConcurrent = Math.max(maxConcurrent,
            Math.max(laneMap[era.id].lane, laneMap[other.id].lane) + 1);
        }
      }
    });
    laneMap[era.id].totalLanes = maxConcurrent;
  });

  return laneMap;
};

// Pre-calculate lanes for all categories
const categoryLanes = {};
timelineCategories.forEach(category => {
  categoryLanes[category.categoryId] = calculateEraLanes(category.eras);
});

// Display order for timeline columns
const categoryOrder = ['argentina', 'orchestras', 'dancers', 'europe', 'usa'];


export default function TangoHistoryPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [hoveredEra, setHoveredEra] = useState(null);

  const handleEraClick = (categoryId, eraId) => {
    router.push(`/tango-history/${categoryId}#${eraId}`);
  };

  const handleCategoryClick = (path) => {
    router.push(path);
  };

  const timelineHeight = (TIMELINE_END - TIMELINE_START) * PIXELS_PER_YEAR;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Tango History Timeline
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Cronología del Tango
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Era bands sized by duration. Click any era to explore details.
        </Typography>
      </Box>

      {/* Legend */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>Status:</Typography>
        <Chip size="small" label="Populated" sx={{ bgcolor: 'success.light' }} />
        <Chip size="small" label="Partial" sx={{ bgcolor: 'warning.light' }} />
        <Chip size="small" label="Coming Soon" sx={{ bgcolor: 'grey.300' }} />
      </Box>

        {/* Visual Timeline - Era Bands */}
        <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, mb: 2, overflow: 'hidden' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, textAlign: 'center' }}>
            ← Scroll horizontally to see all timelines →
          </Typography>

          <Box sx={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            maxHeight: timelineHeight + HEADER_HEIGHT + 20,
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-track': { bgcolor: 'grey.100', borderRadius: 4 },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: 4 }
          }}>

            {/* Year Scale Column */}
            <Box sx={{
              width: 60,
              flexShrink: 0,
              position: 'sticky',
              left: 0,
              bgcolor: 'background.paper',
              zIndex: 20,
              borderRight: '2px solid',
              borderColor: 'divider'
            }}>
              <Box sx={{ height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" fontWeight="bold">Year</Typography>
              </Box>
              <Box sx={{ position: 'relative', height: timelineHeight }}>
                {decades.map(year => {
                  const top = getYearPosition(year);
                  const isMajor = year % 50 === 0;
                  return (
                    <Box key={year} sx={{
                      position: 'absolute',
                      top: top,
                      right: 0,
                      left: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      pr: 0.5
                    }}>
                      <Typography variant="caption" sx={{
                        fontWeight: isMajor ? 'bold' : 'normal',
                        fontSize: isMajor ? '0.75rem' : '0.65rem',
                        color: isMajor ? 'text.primary' : 'text.secondary'
                      }}>
                        {year}
                      </Typography>
                      <Box sx={{
                        width: isMajor ? 10 : 5,
                        height: 2,
                        bgcolor: isMajor ? 'text.primary' : 'grey.400',
                        ml: 0.5
                      }} />
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Category Columns */}
            {categoryOrder.map(catId => timelineCategories.find(c => c.categoryId === catId)).filter(Boolean).map((category) => (
              <Box
                key={category.categoryId}
                sx={{
                  minWidth: { xs: 120, sm: 140, md: 160 },
                  flex: 1,
                  borderLeft: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box
                  onClick={() => handleCategoryClick(category.path)}
                  sx={{
                    height: HEADER_HEIGHT,
                    bgcolor: category.color,
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 1,
                    '&:hover': { opacity: 0.9 }
                  }}
                >
                  <Typography variant="caption" fontWeight="bold" noWrap sx={{ fontSize: '0.7rem' }}>
                    {category.categoryTitle}
                  </Typography>
                </Box>

                <Box sx={{ position: 'relative', height: timelineHeight }}>
                  {decades.map(year => {
                    const top = getYearPosition(year);
                    return (
                      <Box key={`grid-${year}`} sx={{
                        position: 'absolute',
                        top: top,
                        left: 0,
                        right: 0,
                        height: 1,
                        bgcolor: year % 50 === 0 ? 'grey.300' : 'grey.100'
                      }} />
                    );
                  })}

                  {category.eras.map((era) => {
                    const { top, height } = getEraPosition(era.yearStart, era.yearEnd);
                    const isPopulated = era.status === 'populated';
                    const isPartial = era.status === 'partial';
                    const isHovered = hoveredEra === `${category.categoryId}-${era.id}`;

                    // Get lane info for overlapping eras
                    const laneInfo = categoryLanes[category.categoryId]?.[era.id] || { lane: 0, totalLanes: 1 };
                    const { lane, totalLanes } = laneInfo;
                    const laneLeft = totalLanes > 1 ? `${(lane / totalLanes) * 100}%` : '3px';
                    const laneRight = totalLanes > 1 ? `${((totalLanes - lane - 1) / totalLanes) * 100}%` : '3px';

                    const statusColor = isPopulated ? 'success.main' : isPartial ? 'warning.main' : 'grey.400';
                    const bgColor = isPopulated ? 'success.light' : isPartial ? 'warning.light' : 'grey.200';

                    return (
                      <Tooltip
                        key={era.id}
                        title={
                          <Box sx={{ p: 1, maxWidth: 280 }}>
                            <Typography variant="subtitle2" fontWeight="bold">{era.title}</Typography>
                            <Typography variant="caption" display="block">{era.subtitle}</Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                              {era.yearStart}–{era.yearEnd} ({era.yearEnd - era.yearStart} years)
                            </Typography>
                            {era.summary && era.summary[0] !== "Content coming soon" && (
                              <Typography variant="body2" sx={{ mt: 1, fontSize: '0.75rem' }}>{era.summary[0]}</Typography>
                            )}
                          </Box>
                        }
                        placement="right"
                        arrow
                      >
                        <Box
                          onClick={() => handleEraClick(category.categoryId, era.id)}
                          onMouseEnter={() => setHoveredEra(`${category.categoryId}-${era.id}`)}
                          onMouseLeave={() => setHoveredEra(null)}
                          sx={{
                            position: 'absolute',
                            top: top,
                            left: laneLeft,
                            right: laneRight,
                            height: height,
                            bgcolor: isHovered ? category.color : bgColor,
                            color: isHovered ? 'white' : 'text.primary',
                            borderRadius: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            px: 0.75,
                            py: 0.25,
                            overflow: 'hidden',
                            border: '2px solid',
                            borderColor: isHovered ? category.color : statusColor,
                            boxShadow: isHovered ? 2 : 0,
                            zIndex: isHovered ? 5 : 1,
                            '&:hover': { transform: 'scale(1.03)' }
                          }}
                        >
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            noWrap
                            sx={{ fontSize: height < 35 ? '0.55rem' : '0.65rem', lineHeight: 1.2 }}
                          >
                            {era.title}
                          </Typography>
                          {height >= 45 && era.subtitle && (
                            <Typography
                              variant="caption"
                              fontStyle="italic"
                              noWrap
                              sx={{ fontSize: '0.55rem', opacity: 0.85, lineHeight: 1.1 }}
                            >
                              {era.subtitle}
                            </Typography>
                          )}
                          {height >= 60 && (
                            <Typography
                              variant="caption"
                              noWrap
                              sx={{ fontSize: '0.5rem', opacity: 0.7, lineHeight: 1.1 }}
                            >
                              {era.yearStart}–{era.yearEnd}
                            </Typography>
                          )}
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Navigation to Events */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
          <Button
            component={Link}
            href="/tango-history/events"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ bgcolor: '#e91e63', '&:hover': { bgcolor: '#c2185b' } }}
          >
            View Key Events Timeline
          </Button>
        </Box>

        {/* Disclaimer */}
        <Paper sx={{
          p: 2,
          bgcolor: 'warning.light',
          borderLeft: '4px solid',
          borderColor: 'warning.dark',
          mt: 4
        }}>
          <Typography variant="body2" color="text.primary">
            <strong>Disclaimer:</strong> This timeline was researched and compiled using AI assistance (Claude/Anthropic).
            Toby Balsley facilitated and curated this research but is not the author of the historical content.
            Errors may exist — corrections and contributions from the tango community are welcome.
          </Typography>
        </Paper>

    </Container>
  );
}
