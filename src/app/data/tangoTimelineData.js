/**
 * Tango History Timeline Data
 *
 * This file contains the structured data for the tango history timeline system.
 * Content is populated incrementally from white papers.
 *
 * Status values:
 * - "populated" = content ready to display
 * - "partial" = some content, more coming
 * - "placeholder" = structure defined, no content yet
 */

export const timelineCategories = [
  {
    categoryId: "argentina",
    categoryTitle: "Tango Argentina",
    categorySubtitle: "The Dance's Homeland",
    path: "/tango-history/argentina",
    color: "#1976d2", // blue
    eras: [
      {
        id: "guardia-vieja",
        title: "La Guardia Vieja",
        subtitle: "The Old Guard",
        yearStart: 1880,
        yearEnd: 1920,
        status: "partial",
        summary: [
          "Tango's birth in Río de la Plata — Buenos Aires and Montevideo",
          "African candombe, habanera, milonga criolla fusion",
          "Canyengue style emerges in conventillos, academias, patios",
          "Paris validation (1910-1913) brings respectability"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "guardia-nueva",
        title: "La Guardia Nueva",
        subtitle: "The New Guard",
        yearStart: 1920,
        yearEnd: 1935,
        status: "partial",
        summary: [
          "Tango becomes respectable and mainstream",
          "Bandoneon becomes central instrument",
          "First great orchestras form (De Caro, Firpo, Canaro)",
          "Carlos Gardel becomes global voice of tango (dies 1935)"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "epoca-de-oro",
        title: "La Época de Oro",
        subtitle: "The Golden Age",
        yearStart: 1935,
        yearEnd: 1955,
        status: "populated",
        summary: [
          "600 orquestas típicas formed; ~50 professional orchestras at peak",
          "D'Arienzo's 1935 revolution returns tango to dance floors",
          "The Big Four: D'Arienzo, Di Sarli, Troilo, Pugliese",
          "~50,000 recordings on 78 RPM shellac — the canon for today's milongas",
          "Argentina becomes world's second-largest recorded music producer"
        ],
        keyFigures: [
          { name: "Juan D'Arienzo", type: "orchestra", role: "El Rey del Compás — revived danceable tango" },
          { name: "Carlos Di Sarli", type: "orchestra", role: "El Señor del Tango — elegant walking music" },
          { name: "Aníbal Troilo", type: "orchestra", role: "Pichuco — perfect synthesis of rhythm and emotion" },
          { name: "Osvaldo Pugliese", type: "orchestra", role: "Dramatic, symphonic intensity" },
          { name: "Rodolfo Biagi", type: "orchestra", role: "Manos Brujas — staccato piano style" },
          { name: "Ricardo Tanturi", type: "orchestra", role: "Explosive combination with Alberto Castillo" },
          { name: "El Turco José", type: "individual", role: "Co-created Villa Urquiza style" },
          { name: "Luis 'Milonguita' Lemos", type: "individual", role: "Co-created Villa Urquiza style" }
        ],
        paperPath: "/tango-papers/argentina/epoca-de-oro.md"
      },
      {
        id: "decadencia",
        title: "La Decadencia",
        subtitle: "The Decline",
        yearStart: 1955,
        yearEnd: 1983,
        status: "partial",
        summary: [
          "Perón overthrown 1955, tango culture suppressed",
          "Military governments impose curfews, view tango with suspicion",
          "Rock and roll, folk music capture younger generations",
          "Most milongueros stop dancing for 20-30 years"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "renacimiento",
        title: "El Renacimiento",
        subtitle: "The Rebirth",
        yearStart: 1983,
        yearEnd: 1995,
        status: "populated",
        summary: [
          "Democracy returns (1983), 'Tango Argentino' ignites global interest",
          "Old milongueros return: Finito (1980), Pupi Castello (mid-1980s)",
          "Susana Miller codifies 'milonguero style' (early 1990s)",
          "Precious window where living Golden Age tradition can be learned"
        ],
        keyFigures: [
          { name: "Finito", type: "individual", role: "Best social dancer of 1980s" },
          { name: "Pupi Castello", type: "individual", role: "El Maestro de los Maestros" },
          { name: "Tete Rusconi", type: "individual", role: "Close embrace master" },
          { name: "Pepito Avellaneda", type: "individual", role: "King of the Milonga" },
          { name: "Ricardo Vidort", type: "individual", role: "The Last Compadrito" },
          { name: "Gerardo Portalea", type: "individual", role: "Standard of Villa Urquiza" }
        ],
        paperPath: "/tango-papers/dancers/generations/pre-nuevo-masters.md"
      },
      {
        id: "investigacion",
        title: "La Investigación",
        subtitle: "The Investigation / Early Nuevo",
        yearStart: 1995,
        yearEnd: 2005,
        status: "partial",
        summary: [
          "Naveira and Salas analyze tango mechanics at Cochabamba sessions",
          "Open embrace, nuevo vocabulary enters the picture",
          "Campeonato Mundial begins (2003)",
          "2001-2002 economic crisis accelerates tango tourism"
        ],
        keyFigures: [
          { name: "Gustavo Naveira", type: "individual", role: "Investigation pioneer" },
          { name: "Fabian Salas", type: "individual", role: "Investigation pioneer" }
        ],
        paperPath: null
      },
      {
        id: "nuevo-peak",
        title: "Tango Nuevo Peak",
        subtitle: "Globalization Peak",
        yearStart: 2005,
        yearEnd: 2012,
        status: "partial",
        summary: [
          "Nuevo tango dance reaches peak visibility",
          "UNESCO declares tango Intangible Cultural Heritage (2009)",
          "Marathon and encuentro formats emerge as counter-movement",
          "Global community fractures between traditionalists and innovators"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "neo-traditional",
        title: "Neo-Traditional",
        subtitle: "Return to Roots",
        yearStart: 2012,
        yearEnd: 2030,
        status: "partial",
        summary: [
          "Widespread return to traditional values and close embrace",
          "Encuentro milonguero movement grows",
          "Last milongueros pass: Tete (2010), Cartery (2015), Segarra (2018)",
          "Documentation and preservation become urgent"
        ],
        keyFigures: [],
        paperPath: null
      }
    ]
  },
  {
    categoryId: "dancers",
    categoryTitle: "Dancers & Couples",
    categorySubtitle: "The Masters",
    path: "/tango-history/dancers",
    color: "#9c27b0", // purple
    eras: [
      {
        id: "guardian-generation",
        title: "Guardian Generation",
        subtitle: "Living Bridge to Golden Age",
        yearStart: 1935,
        yearEnd: 1960,
        learnedDuring: "Golden Age (1935-1955)",
        status: "populated",
        summary: [
          "Learned in milongas of the 1940s-50s by watching and practicing",
          "Stopped dancing during Decadencia (1960s-70s)",
          "Returned in Renacimiento (1980s-90s)",
          "Last direct connection to Golden Age tradition"
        ],
        keyFigures: [
          { name: "Finito (Ramón Rivera)", type: "individual", born: "c.1932", died: "1987", style: "Villa Urquiza" },
          { name: "Tete Rusconi", type: "individual", born: "1936", died: "2010", style: "Milonguero" },
          { name: "Pepito Avellaneda", type: "individual", born: "1930", died: "1996", style: "Orillero" },
          { name: "Pupi Castello", type: "individual", born: "c.1935", died: "2007", style: "Salon" },
          { name: "Ricardo Vidort", type: "individual", born: "1929", died: "2006", style: "Milonguero" },
          { name: "Gerardo Portalea", type: "individual", born: "1928", died: "2007", style: "Villa Urquiza" },
          { name: "El Turco José", type: "individual", born: "1931", died: null, style: "Urquiza" },
          { name: "El Chino Perico", type: "individual", born: "c.1941", died: null, style: "Villa Urquiza" },
          { name: "Carlos Pérez & Rosa Forte", type: "couple", style: "Villa Urquiza 1950s" },
          { name: "Nito y Elba García", type: "couple", style: "Salon" },
          { name: "Osvaldo y Coca Cartery", type: "couple", style: "Milonguero" },
          { name: "Pocho y Nelly", type: "couple", style: "Milonguero" }
        ],
        styles: [
          { name: "Estilo del Centro / Milonguero", description: "Close embrace, compact, apilado" },
          { name: "Estilo del Barrio / Villa Urquiza", description: "Upright, elegant walking, can open" }
        ],
        paperPath: "/tango-papers/dancers/generations/pre-nuevo-masters.md"
      },
      {
        id: "bridge-generation",
        title: "Bridge Generation",
        subtitle: "Codifiers and Teachers",
        yearStart: 1980,
        yearEnd: 2000,
        status: "partial",
        summary: [
          "Learned directly from Guardian Generation in the revival window",
          "Codified, systematized and taught tango methodology",
          "Graciela González creates first Followers Technique seminar (1994)",
          "Susana Miller codifies milonguero style"
        ],
        keyFigures: [
          { name: "Graciela González", type: "individual", role: "La Leona del Tango, pedagogical pioneer" },
          { name: "Silvia Ceriani", type: "individual", role: "Partner of Tete, co-teacher" },
          { name: "Myriam Pincen", type: "individual", role: "30+ year milonguera, keeper of tradition" },
          { name: "Susana Miller", type: "individual", role: "Codified milonguero style" }
        ],
        paperPath: "/tango-papers/dancers/generations/pre-nuevo-masters.md"
      },
      {
        id: "nuevo-innovators",
        title: "Nuevo Innovators",
        subtitle: "The Investigation Generation",
        yearStart: 1995,
        yearEnd: 2010,
        status: "placeholder",
        summary: [
          "Systematically analyzed tango mechanics",
          "Created nuevo vocabulary (colgadas, volcadas, soltadas)",
          "Brought tango to global festival circuits",
          "Tension between social and stage tango grows"
        ],
        keyFigures: [
          { name: "Gustavo Naveira", type: "individual" },
          { name: "Fabian Salas", type: "individual" },
          { name: "Chicho Frumboli", type: "individual" }
        ],
        paperPath: null
      },
      {
        id: "stage-pioneers",
        title: "Stage Pioneers",
        subtitle: "Theatrical Tango",
        yearStart: 1983,
        yearEnd: 2000,
        status: "placeholder",
        summary: [
          "'Tango Argentino' cast brings authentic tango to world stage (1983)",
          "Stage tango diverges from social tango",
          "International audiences discover Argentine tango"
        ],
        keyFigures: [
          { name: "Juan Carlos Copes & María Nieves", type: "couple" },
          { name: "Gloria & Rodolfo Dinzel", type: "couple" },
          { name: "Virulazo & Elvira", type: "couple" },
          { name: "Carlos Gavito", type: "individual", role: "Forever Tango; minimalist stage style" },
          { name: "Pablo Verón", type: "individual", role: "The Tango Lesson (1997); film star" },
          { name: "Miguel Angel Zotto", type: "individual" }
        ],
        paperPath: null
      }
    ]
  },
  {
    categoryId: "europe",
    categoryTitle: "Tango Europe",
    categorySubtitle: "The European Journey",
    path: "/tango-history/europe",
    color: "#2e7d32", // green
    eras: [
      {
        id: "first-tangomania",
        title: "First Tangomania",
        subtitle: "Paris Goes Mad",
        yearStart: 1910,
        yearEnd: 1914,
        status: "partial",
        summary: [
          "Tango arrives in Paris around 1910-1913",
          "Tangomania sweeps the city - tango teas, tango fashion",
          "Vatican condemns it, Kaiser bans officers from dancing it",
          "Europe gets tango before Argentina fully respected it"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "interwar",
        title: "Interwar Period",
        subtitle: "European Golden Period",
        yearStart: 1920,
        yearEnd: 1940,
        status: "partial",
        summary: [
          "Tango becomes permanent fixture of European social dance",
          "Paris retains some authenticity through Argentine expats",
          "London develops stiff 'English tango' - unrecognizable to Argentines",
          "Finnish tango emerges as distinctly Nordic art form"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "disconnect",
        title: "The Disconnect",
        subtitle: "Lost Connection",
        yearStart: 1940,
        yearEnd: 1980,
        status: "partial",
        summary: [
          "WWII and aftermath severs organic connection",
          "European ballroom tango calcifies into competition formats",
          "International Standard Tango: rigid, no improvisation, no connection",
          "Paris remains one city where thread of authentic tango persists"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "piazzolla-europe",
        title: "Piazzolla's Europe",
        subtitle: "Musical Survival",
        yearStart: 1970,
        yearEnd: 1985,
        status: "partial",
        summary: [
          "Piazzolla keeps tango music alive in European consciousness",
          "'Libertango' (1974, Milan) becomes globally famous",
          "Europeans know tango as concert music, not social dance",
          "Musical and dance worlds almost completely separated"
        ],
        keyFigures: [
          { name: "Astor Piazzolla", type: "individual" }
        ],
        paperPath: null
      },
      {
        id: "paris-explosion",
        title: "Paris Explosion",
        subtitle: "'Tango Argentino' Premiere",
        yearStart: 1983,
        yearEnd: 1985,
        status: "partial",
        summary: [
          "'Tango Argentino' premieres Théâtre du Châtelet, November 11, 1983",
          "Paris audiences stunned - nothing like ballroom tango",
          "Transfers to Broadway 1985, nominated for Tony",
          "Demand for authentic instruction explodes"
        ],
        keyFigures: [
          { name: "Claudio Segovia & Héctor Orezzoli", type: "couple", role: "Creators" },
          { name: "Juan Carlos Copes & María Nieves", type: "couple", role: "Cast" },
          { name: "Gloria & Rodolfo Dinzel", type: "couple", role: "Cast" }
        ],
        paperPath: null
      },
      {
        id: "first-communities",
        title: "First Communities",
        subtitle: "Seeds Take Root",
        yearStart: 1985,
        yearEnd: 1995,
        status: "partial",
        summary: [
          "Tiny communities form in Paris, Amsterdam, London, Berlin",
          "Dance enthusiasts who saw 'Tango Argentino' or traveled to BA",
          "Milonguero tradition largely unknown - códigos, cabeceo absent",
          "Europeans dance open embrace, mixing ballroom habits"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "german-nordic",
        title: "German & Nordic Wave",
        subtitle: "Northern Embrace",
        yearStart: 1990,
        yearEnd: 2000,
        status: "partial",
        summary: [
          "Germany becomes one of tango's strongest European homes",
          "Berlin Wall falls (1989), cultural openness that tango fills",
          "Pina Bausch invites Tete to Tanztheater Wuppertal (1994-1997)",
          "Finnish tango remains parallel universe"
        ],
        keyFigures: [
          { name: "Pina Bausch", type: "individual", role: "Choreographer" },
          { name: "Tete Rusconi", type: "individual", role: "Bausch collaborator" }
        ],
        paperPath: null
      },
      {
        id: "film-legitimacy",
        title: "Film & Cultural Legitimacy",
        subtitle: "Permission Granted",
        yearStart: 1994,
        yearEnd: 2002,
        status: "partial",
        summary: [
          "Bausch's work with Tete connects tango to European high-art",
          "'The Tango Lesson' (1997) - Sally Potter, Pablo Verón",
          "Carlos Saura's 'Tango' (1998)",
          "Films give cultural permission - tango is serious art"
        ],
        keyFigures: [
          { name: "Sally Potter", type: "individual", role: "Director" },
          { name: "Pablo Verón", type: "individual", role: "Film star" }
        ],
        paperPath: null
      },
      {
        id: "festival-era",
        title: "Festival Era",
        subtitle: "The Great Migration",
        yearStart: 2000,
        yearEnd: 2010,
        status: "partial",
        summary: [
          "Festivals proliferate - nearly every weekend somewhere in Europe",
          "Argentina's 2001-2002 crisis drives teachers to Europe",
          "Marathon and encuentro formats emerge as European innovations",
          "Istanbul becomes major tango city"
        ],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "maturation",
        title: "Maturation",
        subtitle: "Self-Sustaining Scenes",
        yearStart: 2009,
        yearEnd: 2030,
        status: "partial",
        summary: [
          "UNESCO recognition (2009) celebrates what communities built",
          "Most European cities have self-sustaining tango communities",
          "Neo-traditional turn mirrors global trend",
          "European dancers travel to BA for social dancing, not workshops"
        ],
        keyFigures: [],
        paperPath: null
      }
    ]
  },
  {
    categoryId: "usa",
    categoryTitle: "Tango USA",
    categorySubtitle: "The American Story",
    path: "/tango-history/usa",
    color: "#d32f2f", // red
    eras: [
      {
        id: "early-usa",
        title: "Early American Tango",
        subtitle: "Vernon & Irene Castle Era",
        yearStart: 1910,
        yearEnd: 1930,
        status: "placeholder",
        summary: ["Content coming soon"],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "ballroom-era",
        title: "Ballroom Era",
        subtitle: "American Tango Diverges",
        yearStart: 1930,
        yearEnd: 1985,
        status: "populated",
        summary: [
          "Arthur Murray & Fred Astaire franchises industrialize 'tango'",
          "Bronze/Silver/Gold syllabus replaces improvisation with choreography",
          "Head snaps, roses, arm's-length hold — none from Argentina",
          "Golden Age recordings unknown; strict-tempo accordion music instead",
          "Complete disconnect: Americans knew nothing of real tango until 1985"
        ],
        keyFigures: [
          { name: "Vernon & Irene Castle", type: "couple", role: "Sanitized tango for America (1912-1918)" },
          { name: "Arthur Murray", type: "individual", role: "Franchise empire, footprint diagrams (1895-1991)" },
          { name: "Fred Astaire", type: "individual", role: "Dance studios from 1947, Hollywood tango" },
          { name: "Rudolph Valentino", type: "individual", role: "Fixed tango-as-spectacle image (1921)" },
          { name: "Xavier Cugat", type: "individual", role: "Waldorf-Astoria bandleader, commercial 'tango'" }
        ],
        paperPath: "/tango-papers/usa/ballroom-era.md"
      },
      {
        id: "broadway-impact",
        title: "Broadway Impact",
        subtitle: "'Tango Argentino' Arrives",
        yearStart: 1985,
        yearEnd: 1995,
        status: "placeholder",
        summary: ["Content coming soon"],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "american-growth",
        title: "American Growth",
        subtitle: "Coast to Coast",
        yearStart: 1995,
        yearEnd: 2010,
        status: "placeholder",
        summary: ["Content coming soon"],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "american-present",
        title: "Contemporary USA",
        subtitle: "Mature Communities",
        yearStart: 2010,
        yearEnd: 2030,
        status: "placeholder",
        summary: ["Content coming soon"],
        keyFigures: [],
        paperPath: null
      }
    ]
  },
  {
    categoryId: "orchestras",
    categoryTitle: "Tango Orchestras",
    categorySubtitle: "The Music",
    path: "/tango-history/orchestras",
    color: "#ff9800", // orange
    eras: [
      {
        id: "early-orchestras",
        title: "Early Orchestras",
        subtitle: "Guitar & Flute Era",
        yearStart: 1880,
        yearEnd: 1920,
        status: "placeholder",
        summary: ["Content coming soon"],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "guardia-nueva-orchestras",
        title: "Guardia Nueva Orchestras",
        subtitle: "Birth of the Orquesta Típica",
        yearStart: 1920,
        yearEnd: 1935,
        status: "partial",
        summary: [
          "Julio De Caro invents modern tango orchestration (1924)",
          "Transition from sextet to orquesta típica format",
          "Bandoneon becomes central instrument",
          "Roberto Firpo, Francisco Canaro, Eduardo Arolas define the sound"
        ],
        keyFigures: [
          { name: "Julio De Caro", type: "orchestra", role: "Father of modern tango orchestration (1899–1980)" },
          { name: "Eduardo Arolas", type: "individual", role: "El Tigre del Bandoneón (1892–1924)" },
          { name: "Roberto Firpo", type: "orchestra", role: "First to record 'La Cumparsita' (1884–1969)" },
          { name: "Francisco Canaro", type: "orchestra", role: "Prolific recording pioneer (1888–1964)" },
          { name: "Osvaldo Fresedo", type: "orchestra", role: "Early aristocratic style (1897–1984)" }
        ],
        paperPath: null
      },
      {
        id: "golden-orchestras",
        title: "Golden Age Orchestras",
        subtitle: "The Big Four and More",
        yearStart: 1935,
        yearEnd: 1955,
        status: "partial",
        summary: [
          "~50 professional orchestras performing simultaneously in Buenos Aires",
          "The Big Four: D'Arienzo, Di Sarli, Troilo, Pugliese",
          "Essential supporting: Tanturi, Biagi, Caló, De Angelis, Fresedo, Canaro",
          "~50,000 recordings on 78 RPM — 3-minute limit forced structural perfection"
        ],
        keyFigures: [
          { name: "Juan D'Arienzo", type: "orchestra", role: "El Rey del Compás (1900–1976)" },
          { name: "Carlos Di Sarli", type: "orchestra", role: "El Señor del Tango (1903–1960)" },
          { name: "Aníbal Troilo", type: "orchestra", role: "Pichuco (1914–1975)" },
          { name: "Osvaldo Pugliese", type: "orchestra", role: "La Yumba (1905–1995)" },
          { name: "Ricardo Tanturi", type: "orchestra", role: "With Alberto Castillo (1905–1973)" },
          { name: "Rodolfo Biagi", type: "orchestra", role: "Manos Brujas (1906–1969)" },
          { name: "Miguel Caló", type: "orchestra", role: "Orquesta de las Estrellas (1907–1972)" },
          { name: "Alfredo De Angelis", type: "orchestra", role: "Glostora Tango Club (1910–1992)" },
          { name: "Francisco Canaro", type: "orchestra", role: "3,792 recordings (1888–1964)" },
          { name: "Ángel D'Agostino", type: "orchestra", role: "With Vargas — essential dance music (1900–1991)" },
          { name: "Osvaldo Fresedo", type: "orchestra", role: "63-year career, aristocratic style (1897–1984)" }
        ],
        paperPath: "/tango-papers/argentina/epoca-de-oro.md"
      },
      {
        id: "post-golden",
        title: "Post-Golden Age",
        subtitle: "Evolution & Decline",
        yearStart: 1955,
        yearEnd: 1990,
        status: "placeholder",
        summary: ["Content coming soon"],
        keyFigures: [],
        paperPath: null
      },
      {
        id: "revival-orchestras",
        title: "Revival Orchestras",
        subtitle: "New Generations",
        yearStart: 1990,
        yearEnd: 2030,
        status: "placeholder",
        summary: ["Content coming soon"],
        keyFigures: [],
        paperPath: null
      }
    ]
  }
  ,
  {
    categoryId: "events",
    categoryTitle: "Key Events",
    categorySubtitle: "Eventos Importantes",
    path: "/tango-history/events",
    color: "#e91e63", // pink
    eras: [
      {
        id: "first-recordings",
        title: "First Recordings",
        subtitle: "Primeras Grabaciones",
        yearStart: 1905,
        yearEnd: 1910,
        status: "partial",
        summary: ["First tango recordings made", "Angel Villoldo records 'El Choclo' (1906)"],
        keyFigures: [{ name: "Angel Villoldo", type: "individual" }],
        eventType: "recording"
      },
      {
        id: "paris-tangomania",
        title: "Paris Tangomania",
        subtitle: "Tangomanía en París",
        yearStart: 1912,
        yearEnd: 1914,
        status: "partial",
        summary: ["Tango conquers Paris", "Vatican condemns the dance"],
        eventType: "cultural"
      },
      {
        id: "gardel-death",
        title: "Gardel Dies",
        subtitle: "Muerte de Gardel",
        yearStart: 1935,
        yearEnd: 1936,
        status: "partial",
        summary: ["Carlos Gardel dies in plane crash, Medellín", "June 24, 1935 - tango loses its voice"],
        keyFigures: [{ name: "Carlos Gardel", type: "individual" }],
        eventType: "death"
      },
      {
        id: "darienzo-revolution",
        title: "D'Arienzo Revolution",
        subtitle: "Revolución D'Arienzo",
        yearStart: 1935,
        yearEnd: 1938,
        status: "partial",
        summary: ["D'Arienzo returns tango to its rhythmic roots", "Dance floors fill again"],
        keyFigures: [{ name: "Juan D'Arienzo", type: "orchestra" }],
        eventType: "music"
      },
      {
        id: "peron-fall",
        title: "Perón Overthrown",
        subtitle: "Caída de Perón",
        yearStart: 1955,
        yearEnd: 1956,
        status: "partial",
        summary: ["Military coup ends Perón era", "Beginning of tango's decline"],
        eventType: "political"
      },
      {
        id: "dirty-war",
        title: "Dirty War",
        subtitle: "Guerra Sucia",
        yearStart: 1976,
        yearEnd: 1983,
        status: "partial",
        summary: ["Military junta, curfews, gatherings banned", "Milongas close or go underground"],
        eventType: "political"
      },
      {
        id: "tango-argentino-show",
        title: "'Tango Argentino'",
        subtitle: "El Show que Cambió Todo",
        yearStart: 1983,
        yearEnd: 1985,
        status: "populated",
        summary: ["Paris premiere Nov 11, 1983", "Broadway 1985 - Tony nomination", "Ignites worldwide tango revival"],
        keyFigures: [
          { name: "Claudio Segovia", type: "individual" },
          { name: "Copes & Nieves", type: "couple" }
        ],
        eventType: "show"
      },
      {
        id: "democracy-returns",
        title: "Democracy Returns",
        subtitle: "Vuelta a la Democracia",
        yearStart: 1983,
        yearEnd: 1984,
        status: "partial",
        summary: ["Alfonsín elected president", "Cultural programs restart", "Milongueros return to the floor"],
        eventType: "political"
      },
      {
        id: "finito-death",
        title: "Finito Dies",
        subtitle: "Muerte de Finito",
        yearStart: 1987,
        yearEnd: 1988,
        status: "partial",
        summary: ["Ramón 'Finito' Rivera dies at ~55", "Best social dancer of 1980s revival lost young"],
        keyFigures: [{ name: "Finito", type: "individual" }],
        eventType: "death"
      },
      {
        id: "pepito-death",
        title: "Pepito Dies",
        subtitle: "Muerte de Pepito",
        yearStart: 1996,
        yearEnd: 1997,
        status: "partial",
        summary: ["Pepito Avellaneda dies", "King of the Milonga passes"],
        keyFigures: [{ name: "Pepito Avellaneda", type: "individual" }],
        eventType: "death"
      },
      {
        id: "tango-lesson-film",
        title: "'The Tango Lesson'",
        subtitle: "Film de Sally Potter",
        yearStart: 1997,
        yearEnd: 1998,
        status: "partial",
        summary: ["Sally Potter film with Pablo Verón", "Brings tango to mainstream cinema"],
        keyFigures: [{ name: "Pablo Verón", type: "individual" }],
        eventType: "film"
      },
      {
        id: "argentina-crisis",
        title: "Economic Crisis",
        subtitle: "Crisis Argentina",
        yearStart: 2001,
        yearEnd: 2002,
        status: "partial",
        summary: ["Peso collapses", "Argentine teachers migrate to Europe/USA", "BA becomes affordable for tango tourists"],
        eventType: "political"
      },
      {
        id: "mundial-begins",
        title: "Mundial Begins",
        subtitle: "Primer Campeonato",
        yearStart: 2003,
        yearEnd: 2004,
        status: "partial",
        summary: ["First Campeonato Mundial de Tango", "Salón and Escenario categories"],
        eventType: "cultural"
      },
      {
        id: "gavito-death",
        title: "Gavito Dies",
        subtitle: "Muerte de Gavito",
        yearStart: 2005,
        yearEnd: 2006,
        status: "partial",
        summary: ["Carlos Gavito dies", "Theatrical tango master lost"],
        keyFigures: [{ name: "Carlos Gavito", type: "individual" }],
        eventType: "death"
      },
      {
        id: "vidort-death",
        title: "Vidort Dies",
        subtitle: "Muerte de Vidort",
        yearStart: 2006,
        yearEnd: 2007,
        status: "partial",
        summary: ["Ricardo Vidort dies in Santa Fe, NM", "The Last Compadrito"],
        keyFigures: [{ name: "Ricardo Vidort", type: "individual" }],
        eventType: "death"
      },
      {
        id: "pupi-portalea-death",
        title: "Pupi & Portalea Die",
        subtitle: "Pérdidas de 2007",
        yearStart: 2007,
        yearEnd: 2008,
        status: "partial",
        summary: ["Pupi Castello and Gerardo Portalea both die in 2007", "Two pillars of Villa Urquiza lost"],
        keyFigures: [
          { name: "Pupi Castello", type: "individual" },
          { name: "Gerardo Portalea", type: "individual" }
        ],
        eventType: "death"
      },
      {
        id: "unesco-recognition",
        title: "UNESCO Heritage",
        subtitle: "Patrimonio UNESCO",
        yearStart: 2009,
        yearEnd: 2010,
        status: "partial",
        summary: ["Tango declared Intangible Cultural Heritage of Humanity", "September 30, 2009"],
        eventType: "cultural"
      },
      {
        id: "tete-death",
        title: "Tete Dies",
        subtitle: "Muerte de Tete",
        yearStart: 2010,
        yearEnd: 2011,
        status: "partial",
        summary: ["Pedro 'Tete' Rusconi dies Jan 7, 2010", "Two days before his 74th birthday"],
        keyFigures: [{ name: "Tete Rusconi", type: "individual" }],
        eventType: "death"
      },
      {
        id: "covid-pandemic",
        title: "COVID Pandemic",
        subtitle: "Pandemia",
        yearStart: 2020,
        yearEnd: 2022,
        status: "partial",
        summary: ["Milongas worldwide close", "Tango communities devastated", "Slow rebuilding begins"],
        eventType: "political"
      }
    ]
  }
];

// Helper to get all eras across all categories for the master timeline
export const getAllEras = () => {
  const allEras = [];
  timelineCategories.forEach(category => {
    category.eras.forEach(era => {
      allEras.push({
        ...era,
        categoryId: category.categoryId,
        categoryTitle: category.categoryTitle,
        categoryColor: category.color
      });
    });
  });
  return allEras.sort((a, b) => a.yearStart - b.yearStart);
};

// Helper to get unique time periods for alignment
export const getTimePeriods = () => {
  const periods = new Set();
  timelineCategories.forEach(category => {
    category.eras.forEach(era => {
      periods.add(`${era.yearStart}-${era.yearEnd}`);
    });
  });
  return Array.from(periods).sort();
};

export default timelineCategories;
