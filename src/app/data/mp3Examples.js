/**
 * MP3 examples for each rhythm (tango, vals, and milonga)
 */
const mp3Examples = {
  // Tango rhythms
  '1-3-': [
    { 
      id: 'disarli-el-jaguel', 
      title: 'Di Sarli - El Jaguel', 
      file: '/audio/Tango/DiSarli/El Jaguel -- 8.mp3', 
      startTime: 0, 
      duration: 28, // Limit to 28 seconds with 4 second fade
      orchestra: "Di Sarli",
      year: 1940,
      comment: "Listen for 3 times of 1-3-, then a 1---, then back to 3 times of 1-3-"
    }
  ],
  '1---': [
    { 
      id: 'disarli-bahia-blanca', 
      title: 'Di Sarli - Bahia Blanca', 
      file: '/audio/Tango/DiSarli/Bahia Blanca.mp3', 
      startTime: 0, 
      duration: 35, // 35 seconds with fadeout to accommodate all 16 pulses
      orchestra: "Di Sarli",
      year: 1942,
      comment: "Listen for the strong first beats followed by extended pauses - a perfect example of half-time rhythm."
    }
  ],
  '----': [],
  '1-34': [
    { 
      id: 'donato-el-pollitio', 
      title: 'Donato - El Pollitio', 
      file: '/audio/Tango/Donato/El Pollitio.mp3', 
      startTime: 0, 
      duration: 30, // Limit to 30 seconds
      orchestra: "Donato",
      year: 1938,
      comment: "Listen for the clear 1-3-4 pattern that creates a driving, syncopated feel."
    }
  ],
  '123-': [
    { 
      id: 'disarli-comme-il-faut', 
      title: 'Di Sarli - Comme Il Faut', 
      file: '/audio/Tango/DiSarli/Comme Il Faut.mp3', 
      startTime: 0, 
      duration: 31,
      orchestra: "Di Sarli",
      year: 1942,
      comment: "Notice how beats 1, 2, and 3 are emphasized, creating a fuller, richer rhythm that omits only the 4th beat."
    }
  ],
  '1234': [
    { 
      id: 'darienzo-don-juan', 
      title: "D'Arienzo - Don Juan", 
      file: "/audio/Tango/D'Arienzo/Don Juan.mp3", 
      startTime: 0, 
      duration: 30, // 30 seconds with fadeout
      orchestra: "D'Arienzo",
      year: 1936,
      comment: "This is typically a fast driving beat for tango. It's often used in the 3rd 'section' of 32 bar form (the variation section)."
    }
  ],
  '-2-4': [
    { 
      id: 'rodriguez-di-di', 
      title: "Rodriguez - Di Di", 
      file: "/audio/Tango/Rodriguez/Di Di.mp3", 
      startTime: 0, 
      duration: 20, // 20 seconds with fadeout
      orchestra: "Rodriguez",
      year: 1935,
      comment: "Listen for how the piece emphasizes beats 2 and 4, creating a distinctive off-beat rhythm."
    }
  ],
  
  // Vals rhythms
  '1--': [
    { 
      id: 'darienzo-amor-y-celos', 
      title: "D'Arienzo - Amor y Celos", 
      file: "/audio/Vals/D'Arienzo/Amor y Celos.mp3", 
      startTime: 0, 
      duration: 25,
      orchestra: "D'Arienzo",
      year: 1938,
      comment: "Listen for the emphasized first beat of each measure, creating the classic vals feel."
    }
  ],
  '12-': [
    { 
      id: 'disarli-ausencia', 
      title: "Di Sarli - Ausencia", 
      file: "/audio/Vals/DiSarli/Ausencia.mp3", 
      startTime: 0, 
      duration: 25,
      orchestra: "Di Sarli",
      year: 1943,
      comment: "Notice how beats 1 and 2 are emphasized with the classic OneTwo vals pattern."
    }
  ],
  '1-3': [],
  
  // Milonga rhythms
  'Lisa': [],
  'Traspie': [],
  'Contratiempo': []
};

export default mp3Examples;