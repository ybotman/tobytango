"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
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

// TimelineJS event data
const timelineEvents = {
  "title": {
    "text": {
      "headline": "Key Events / Eventos Clave",
      "text": "<p>Navigate events to highlight corresponding eras above</p>"
    }
  },
  "events": [
    { "start_date": { "year": "1906" }, "text": { "headline": "First Recordings", "text": "<p>Angel Villoldo records 'El Choclo'</p>" }, "group": "Recording" },
    { "start_date": { "year": "1912" }, "end_date": { "year": "1914" }, "text": { "headline": "Paris Tangomania", "text": "<p>Tango conquers Paris. Vatican condemns it.</p>" }, "group": "Cultural" },
    { "start_date": { "year": "1935", "month": "6", "day": "24" }, "text": { "headline": "Gardel Dies", "text": "<p>Carlos Gardel dies in plane crash, Medellín</p>" }, "group": "Death" },
    { "start_date": { "year": "1935" }, "text": { "headline": "D'Arienzo Revolution", "text": "<p>Golden Age begins - dance floors fill again</p>" }, "group": "Music" },
    { "start_date": { "year": "1955", "month": "9" }, "text": { "headline": "Perón Overthrown", "text": "<p>Military coup - tango's decline begins</p>" }, "group": "Political" },
    { "start_date": { "year": "1976" }, "end_date": { "year": "1983" }, "text": { "headline": "Dirty War", "text": "<p>Military junta. Milongas close. 30,000 disappeared.</p>" }, "group": "Political" },
    { "start_date": { "year": "1983", "month": "11", "day": "13" }, "text": { "headline": "'Tango Argentino' Paris", "text": "<p>The show that changed everything</p>" }, "group": "Show" },
    { "start_date": { "year": "1983", "month": "12" }, "text": { "headline": "Democracy Returns", "text": "<p>Alfonsín elected. Milongueros return.</p>" }, "group": "Political" },
    { "start_date": { "year": "1985" }, "text": { "headline": "'Tango Argentino' Broadway", "text": "<p>Tony nomination. America discovers tango.</p>" }, "group": "Show" },
    { "start_date": { "year": "1987" }, "text": { "headline": "Finito Dies", "text": "<p>Best social dancer of 1980s revival lost at ~55</p>" }, "group": "Death" },
    { "start_date": { "year": "1994" }, "text": { "headline": "Graciela's Technique Seminar", "text": "<p>First systematic followers technique workshop</p>" }, "group": "Cultural" },
    { "start_date": { "year": "1994" }, "end_date": { "year": "1997" }, "text": { "headline": "Tete & Pina Bausch", "text": "<p>'An orchestra in his head' - Tanztheater Wuppertal</p>" }, "group": "Show" },
    { "start_date": { "year": "1996", "month": "4" }, "text": { "headline": "Pepito Dies", "text": "<p>King of the Milonga passes</p>" }, "group": "Death" },
    { "start_date": { "year": "1997" }, "text": { "headline": "'The Tango Lesson'", "text": "<p>Sally Potter film with Pablo Verón</p>" }, "group": "Film" },
    { "start_date": { "year": "2001" }, "end_date": { "year": "2002" }, "text": { "headline": "Economic Crisis", "text": "<p>Peso collapses. Teachers migrate. BA becomes affordable.</p>" }, "group": "Political" },
    { "start_date": { "year": "2003" }, "text": { "headline": "Mundial Begins", "text": "<p>First World Tango Championship</p>" }, "group": "Cultural" },
    { "start_date": { "year": "2006", "month": "5" }, "text": { "headline": "Vidort Dies", "text": "<p>The Last Compadrito - Santa Fe, NM</p>" }, "group": "Death" },
    { "start_date": { "year": "2007" }, "text": { "headline": "Pupi & Portalea Die", "text": "<p>Two Villa Urquiza pillars lost</p>" }, "group": "Death" },
    { "start_date": { "year": "2009", "month": "9", "day": "30" }, "text": { "headline": "UNESCO Heritage", "text": "<p>Tango declared Intangible Cultural Heritage</p>" }, "group": "Cultural" },
    { "start_date": { "year": "2010", "month": "1", "day": "7" }, "text": { "headline": "Tete Dies", "text": "<p>Two days before his 74th birthday</p>" }, "group": "Death" },
    { "start_date": { "year": "2020", "month": "3" }, "end_date": { "year": "2022" }, "text": { "headline": "COVID Pandemic", "text": "<p>Milongas close worldwide. The embrace forbidden.</p>" }, "group": "Political" }
  ]
};

// Find which eras contain a given year
const findErasForYear = (year) => {
  const matches = [];
  timelineCategories.forEach(category => {
    if (!categoryOrder.includes(category.categoryId)) return;
    category.eras.forEach(era => {
      if (year >= era.yearStart && year <= era.yearEnd) {
        matches.push(`${category.categoryId}-${era.id}`);
      }
    });
  });
  return matches;
};

export default function TangoHistoryPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [hoveredEra, setHoveredEra] = useState(null);
  const [highlightedEras, setHighlightedEras] = useState([]);
  const [activeEventYear, setActiveEventYear] = useState(null);
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);

  const handleEraClick = (categoryId, eraId) => {
    router.push(`/tango-history/${categoryId}#${eraId}`);
  };

  const handleCategoryClick = (path) => {
    router.push(path);
  };

  // Initialize TimelineJS
  useEffect(() => {
    if (timelineLoaded && timelineRef.current && window.TL && !timelineInstance.current) {
      timelineInstance.current = new window.TL.Timeline('timeline-embed', timelineEvents, {
        hash_bookmark: false,
        initial_zoom: 1,
        scale_factor: 1,
        timenav_position: 'bottom',
        timenav_height: 150,
        optimal_tick_width: 60,
        start_at_slide: 0
      });

      // Listen for slide changes
      timelineInstance.current.on('change', function(data) {
        if (data.unique_id) {
          const event = timelineEvents.events.find((e, i) => i === data.index - 1); // -1 for title slide
          if (event) {
            const year = parseInt(event.start_date.year);
            setActiveEventYear(year);
            const eras = findErasForYear(year);
            setHighlightedEras(eras);
          }
        }
      });
    }
  }, [timelineLoaded]);

  const timelineHeight = (TIMELINE_END - TIMELINE_START) * PIXELS_PER_YEAR;

  return (
    <>
      <link rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css" />
      <Script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js" onLoad={() => setTimelineLoaded(true)} />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Tango History Timeline
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Cronología del Tango
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Era bands sized by duration. Navigate events below to highlight corresponding eras.
          </Typography>

          {/* Disclaimer */}
          <Paper sx={{ p: 2, bgcolor: 'grey.100', borderLeft: '4px solid', borderColor: 'warning.main' }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Disclaimer:</strong> This timeline was researched and compiled using AI assistance (Claude/Anthropic).
              Toby Balsley facilitated and curated this research but is not the author of the historical content.
              Errors may exist — corrections and contributions from the tango community are welcome.
            </Typography>
          </Paper>
        </Box>

        {/* Legend */}
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>Status:</Typography>
          <Chip size="small" label="Populated" sx={{ bgcolor: 'success.light' }} />
          <Chip size="small" label="Partial" sx={{ bgcolor: 'warning.light' }} />
          <Chip size="small" label="Coming Soon" sx={{ bgcolor: 'grey.300' }} />
          {activeEventYear && (
            <Chip size="small" label={`Event: ${activeEventYear}`} color="secondary" sx={{ ml: 2 }} />
          )}
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
                  const isActiveYear = activeEventYear && Math.abs(year - activeEventYear) < 5;
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
                        fontWeight: isMajor || isActiveYear ? 'bold' : 'normal',
                        fontSize: isMajor ? '0.75rem' : '0.65rem',
                        color: isActiveYear ? 'secondary.main' : isMajor ? 'text.primary' : 'text.secondary'
                      }}>
                        {year}
                      </Typography>
                      <Box sx={{
                        width: isMajor ? 10 : 5,
                        height: 2,
                        bgcolor: isActiveYear ? 'secondary.main' : isMajor ? 'text.primary' : 'grey.400',
                        ml: 0.5
                      }} />
                    </Box>
                  );
                })}
                {/* Active year marker */}
                {activeEventYear && (
                  <Box sx={{
                    position: 'absolute',
                    top: getYearPosition(activeEventYear),
                    left: 0,
                    right: 0,
                    height: 3,
                    bgcolor: 'secondary.main',
                    zIndex: 10
                  }} />
                )}
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

                  {/* Active year line across columns */}
                  {activeEventYear && (
                    <Box sx={{
                      position: 'absolute',
                      top: getYearPosition(activeEventYear),
                      left: 0,
                      right: 0,
                      height: 2,
                      bgcolor: 'secondary.main',
                      opacity: 0.5,
                      zIndex: 0
                    }} />
                  )}

                  {category.eras.map((era) => {
                    const { top, height } = getEraPosition(era.yearStart, era.yearEnd);
                    const isPopulated = era.status === 'populated';
                    const isPartial = era.status === 'partial';
                    const isHovered = hoveredEra === `${category.categoryId}-${era.id}`;
                    const isHighlighted = highlightedEras.includes(`${category.categoryId}-${era.id}`);

                    // Get lane info for overlapping eras
                    const laneInfo = categoryLanes[category.categoryId]?.[era.id] || { lane: 0, totalLanes: 1 };
                    const { lane, totalLanes } = laneInfo;
                    const laneWidth = totalLanes > 1 ? `${100 / totalLanes}%` : 'auto';
                    const laneLeft = totalLanes > 1 ? `${(lane / totalLanes) * 100}%` : '3px';
                    const laneRight = totalLanes > 1 ? `${((totalLanes - lane - 1) / totalLanes) * 100}%` : '3px';

                    const statusColor = isPopulated ? 'success.main' : isPartial ? 'warning.main' : 'grey.400';
                    const bgColor = isHighlighted
                      ? category.color
                      : isPopulated ? 'success.light' : isPartial ? 'warning.light' : 'grey.200';

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
                            color: (isHovered || isHighlighted) ? 'white' : 'text.primary',
                            borderRadius: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            px: 0.75,
                            py: 0.25,
                            overflow: 'hidden',
                            border: isHighlighted ? '3px solid' : '2px solid',
                            borderColor: isHighlighted ? 'secondary.main' : isHovered ? category.color : statusColor,
                            boxShadow: isHighlighted ? 4 : isHovered ? 2 : 0,
                            zIndex: isHighlighted ? 10 : isHovered ? 5 : 1,
                            transform: isHighlighted ? 'scale(1.05)' : 'none',
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

        {/* Events Timeline at Bottom */}
        <Paper sx={{ overflow: 'hidden', mb: 4 }}>
          <Box sx={{ p: 2, bgcolor: '#e91e63', color: 'white' }}>
            <Typography variant="h6">Key Events / Eventos Clave</Typography>
            <Typography variant="caption">Navigate to highlight eras above</Typography>
          </Box>
          <div
            id="timeline-embed"
            ref={timelineRef}
            style={{ width: '100%', height: '400px' }}
          />
          {!timelineLoaded && (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography>Loading timeline...</Typography>
            </Box>
          )}
        </Paper>

      </Container>
    </>
  );
}
