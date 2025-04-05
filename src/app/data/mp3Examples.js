/**
 * MP3 examples for each tango rhythm
 */
const mp3Examples = {
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
  '1-34': [],
  '123-': [],
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
  ]
};

export default mp3Examples;