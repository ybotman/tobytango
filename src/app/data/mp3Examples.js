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
      id: 'canaro-poema', 
      title: 'Canaro - Poema', 
      file: '/audio/rhythms/1---canaro-poema.mp3', 
      startTime: 25,
      orchestra: "Canaro",
      year: 1939
    },
    { 
      id: 'pugliese-gallo-ciego', 
      title: 'Pugliese - Gallo ciego', 
      file: '/audio/rhythms/1---pugliese-gallo-ciego.mp3', 
      startTime: 30,
      orchestra: "Pugliese",
      year: 1943
    }
  ],
  '----': [
    { 
      id: 'pugliese-yumba', 
      title: 'Pugliese - La yumba', 
      file: '/audio/rhythms/----pugliese-yumba.mp3', 
      startTime: 15,
      orchestra: "Pugliese",
      year: 1946
    },
    { 
      id: 'piazzolla-libertango', 
      title: 'Piazzolla - Libertango', 
      file: '/audio/rhythms/----piazzolla-libertango.mp3', 
      startTime: 40,
      orchestra: "Piazzolla",
      year: 1974
    }
  ],
  '1-34': [
    { 
      id: 'canaro-invierno', 
      title: 'Canaro - Invierno', 
      file: '/audio/rhythms/1-34-canaro-invierno.mp3', 
      startTime: 18,
      orchestra: "Canaro",
      year: 1937
    },
    { 
      id: 'troilo-inspiracion', 
      title: 'Troilo - Inspiración', 
      file: '/audio/rhythms/1-34-troilo-inspiracion.mp3', 
      startTime: 22,
      orchestra: "Troilo",
      year: 1943
    }
  ],
  '123-': [
    { 
      id: 'fresedo-vida-mia', 
      title: 'Fresedo - Vida mía', 
      file: '/audio/rhythms/123-fresedo-vida-mia.mp3', 
      startTime: 15,
      orchestra: "Fresedo",
      year: 1933
    },
    { 
      id: 'calo-al-compas', 
      title: 'Caló - Al compás del corazón', 
      file: '/audio/rhythms/123-calo-al-compas.mp3', 
      startTime: 30,
      orchestra: "Caló",
      year: 1942
    }
  ],
  '1234': [
    { 
      id: 'darienzo-choclo', 
      title: 'D\'Arienzo - El choclo', 
      file: '/audio/rhythms/1234-darienzo-choclo.mp3', 
      startTime: 10,
      orchestra: "D'Arienzo",
      year: 1937
    },
    { 
      id: 'rodriguez-cumparsita', 
      title: 'Rodríguez - La cumparsita', 
      file: '/audio/rhythms/1234-rodriguez-cumparsita.mp3', 
      startTime: 15,
      orchestra: "Rodríguez",
      year: 1936
    }
  ]
};

export default mp3Examples;