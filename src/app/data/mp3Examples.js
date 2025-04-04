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
  '1---': [],
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
  ]
};

export default mp3Examples;