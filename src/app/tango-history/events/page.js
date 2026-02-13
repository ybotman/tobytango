"use client";

import React, { useEffect, useRef } from 'react';
import {
  Container, Typography, Box, Paper, Button, Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Script from 'next/script';

// TimelineJS3 event data
const timelineData = {
  "title": {
    "text": {
      "headline": "Tango History Events",
      "text": "<p>Key moments that shaped tango — shows, films, recordings, political events, and the passing of the masters.</p>"
    }
  },
  "events": [
    {
      "start_date": { "year": "1906" },
      "text": {
        "headline": "First Recordings",
        "text": "<p>Angel Villoldo records 'El Choclo' — one of the first tango recordings ever made.</p>"
      },
      "group": "Recording"
    },
    {
      "start_date": { "year": "1912" },
      "end_date": { "year": "1914" },
      "text": {
        "headline": "Paris Tangomania",
        "text": "<p>Tango conquers Paris. Tango teas, tango fashion, tango orange. The Vatican condemns it. Kaiser Wilhelm bans officers from dancing it in uniform.</p>"
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "1935", "month": "6", "day": "24" },
      "text": {
        "headline": "Carlos Gardel Dies",
        "text": "<p>Carlos Gardel, the voice of tango, dies in a plane crash in Medellín, Colombia. Tango loses its greatest ambassador.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "1935" },
      "text": {
        "headline": "D'Arienzo Revolution",
        "text": "<p>Juan D'Arienzo, 'El Rey del Compás,' returns tango to its rhythmic roots. Dance floors fill again. The Golden Age begins.</p>"
      },
      "group": "Music"
    },
    {
      "start_date": { "year": "1955", "month": "9" },
      "text": {
        "headline": "Perón Overthrown",
        "text": "<p>Military coup ends the Perón era. Curfews imposed, gatherings restricted. The beginning of tango's long decline.</p>"
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "1976" },
      "end_date": { "year": "1983" },
      "text": {
        "headline": "Dirty War / Guerra Sucia",
        "text": "<p>Military junta rules Argentina. 30,000 'disappeared.' Milongas close or go underground. Most milongueros stop dancing entirely.</p>"
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "1983", "month": "11", "day": "13" },
      "text": {
        "headline": "'Tango Argentino' Paris Premiere",
        "text": "<p>The show that changed everything. Théâtre du Châtelet, Paris. Authentic Argentine tango stuns European audiences. Global revival begins.</p>"
      },
      "group": "Show"
    },
    {
      "start_date": { "year": "1983", "month": "12" },
      "text": {
        "headline": "Democracy Returns",
        "text": "<p>Raúl Alfonsín elected president. Cultural programs restart. The milongueros begin returning to the dance floor.</p>"
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "1985" },
      "text": {
        "headline": "'Tango Argentino' Broadway",
        "text": "<p>The show transfers to Broadway and earns a Tony nomination. America discovers authentic Argentine tango.</p>"
      },
      "group": "Show"
    },
    {
      "start_date": { "year": "1987" },
      "text": {
        "headline": "Finito Dies",
        "text": "<p>Ramón 'Finito' Rivera dies at approximately 55. The best social dancer of the 1980s revival is lost far too young.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "1994" },
      "text": {
        "headline": "Graciela's Followers Technique",
        "text": "<p>Graciela González creates the first systematic 'Followers Technique' seminar — a pedagogical revolution.</p>"
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "1994" },
      "end_date": { "year": "1997" },
      "text": {
        "headline": "Tete & Pina Bausch",
        "text": "<p>Pina Bausch invites Tete Rusconi to dance in her Tanztheater Wuppertal production 'Nur Du.' She says he has 'an orchestra in his head.'</p>"
      },
      "group": "Show"
    },
    {
      "start_date": { "year": "1996", "month": "4", "day": "29" },
      "text": {
        "headline": "Pepito Avellaneda Dies",
        "text": "<p>José 'Pepito Avellaneda' Monteleone dies. The King of the Milonga passes.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "1997" },
      "text": {
        "headline": "'The Tango Lesson' Released",
        "text": "<p>Sally Potter's film featuring Pablo Verón brings tango to mainstream cinema audiences worldwide.</p>"
      },
      "group": "Film"
    },
    {
      "start_date": { "year": "1998" },
      "text": {
        "headline": "Carlos Saura's 'Tango'",
        "text": "<p>Spanish-Argentine film brings visual splendor to tango on the big screen.</p>"
      },
      "group": "Film"
    },
    {
      "start_date": { "year": "2001" },
      "end_date": { "year": "2002" },
      "text": {
        "headline": "Argentine Economic Crisis",
        "text": "<p>The peso collapses. Argentine teachers migrate to Europe and USA. Buenos Aires becomes affordable for tango tourists.</p>"
      },
      "group": "Political"
    },
    {
      "start_date": { "year": "2003" },
      "text": {
        "headline": "First Campeonato Mundial",
        "text": "<p>The World Tango Championship begins in Buenos Aires. Salón and Escenario categories established.</p>"
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "2005" },
      "text": {
        "headline": "Carlos Gavito Dies",
        "text": "<p>Carlos Gavito, master of theatrical close-embrace tango, passes away.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2006", "month": "5", "day": "21" },
      "text": {
        "headline": "Ricardo Vidort Dies",
        "text": "<p>Ricardo Vidort, 'The Last Compadrito,' dies in Santa Fe, New Mexico. 53 years of dancing tango.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2007", "month": "6", "day": "2" },
      "text": {
        "headline": "Gerardo Portalea Dies",
        "text": "<p>Gerardo Portalea dies at 78. The standard of Villa Urquiza style, the gravedigger who danced like a poet.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2007", "month": "7", "day": "21" },
      "text": {
        "headline": "Pupi Castello Dies",
        "text": "<p>Ernesto 'Pupi' Castello dies. 'El Maestro de los Maestros' — his students became the next generation of masters.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2009", "month": "9", "day": "30" },
      "text": {
        "headline": "UNESCO Recognition",
        "text": "<p>Tango declared Intangible Cultural Heritage of Humanity by UNESCO.</p>"
      },
      "group": "Cultural"
    },
    {
      "start_date": { "year": "2010", "month": "1", "day": "7" },
      "text": {
        "headline": "Tete Rusconi Dies",
        "text": "<p>Pedro 'Tete' Rusconi dies two days before his 74th birthday. The man with an orchestra in his head falls silent.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2018", "month": "11", "day": "21" },
      "text": {
        "headline": "Roberto Segarra Dies",
        "text": "<p>Roberto Segarra dies at 98. One of the last milongueros who danced through the Golden Age, Decline, and Revival.</p>"
      },
      "group": "Death"
    },
    {
      "start_date": { "year": "2020", "month": "3" },
      "end_date": { "year": "2022" },
      "text": {
        "headline": "COVID-19 Pandemic",
        "text": "<p>Milongas worldwide close. Tango communities devastated. The embrace — tango's essence — becomes forbidden.</p>"
      },
      "group": "Political"
    }
  ]
};

export default function EventsTimelinePage() {
  const timelineRef = useRef(null);
  const [timelineLoaded, setTimelineLoaded] = React.useState(false);

  useEffect(() => {
    if (timelineLoaded && timelineRef.current && window.TL) {
      new window.TL.Timeline('timeline-embed', timelineData, {
        hash_bookmark: true,
        initial_zoom: 2,
        scale_factor: 2,
        timenav_position: 'bottom',
        optimal_tick_width: 100
      });
    }
  }, [timelineLoaded]);

  return (
    <>
      {/* TimelineJS CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css"
      />

      {/* TimelineJS Script */}
      <Script
        src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"
        onLoad={() => setTimelineLoaded(true)}
      />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button component={Link} href="/tango-history" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
          Back to Timeline
        </Button>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#e91e63' }}>
            Key Events in Tango History
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Eventos Importantes en la Historia del Tango
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Navigate through the defining moments — scroll horizontally or use the timeline below.
          </Typography>
        </Box>

        {/* Event type legend */}
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip label="Show" size="small" sx={{ bgcolor: '#9c27b0', color: 'white' }} />
          <Chip label="Film" size="small" sx={{ bgcolor: '#2196f3', color: 'white' }} />
          <Chip label="Music" size="small" sx={{ bgcolor: '#ff9800', color: 'white' }} />
          <Chip label="Political" size="small" sx={{ bgcolor: '#f44336', color: 'white' }} />
          <Chip label="Cultural" size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />
          <Chip label="Death" size="small" sx={{ bgcolor: '#607d8b', color: 'white' }} />
        </Box>

        {/* TimelineJS Container */}
        <Paper sx={{ overflow: 'hidden', mb: 4 }}>
          <div
            id="timeline-embed"
            ref={timelineRef}
            style={{ width: '100%', height: '600px' }}
          />
          {!timelineLoaded && (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography>Loading timeline...</Typography>
            </Box>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Related Pages</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button component={Link} href="/tango-history/dancers" variant="outlined">
              Dancers Timeline
            </Button>
            <Button component={Link} href="/tango-history/argentina" variant="outlined">
              Argentina Timeline
            </Button>
            <Button component={Link} href="/tango-history" variant="outlined">
              All Timelines
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
