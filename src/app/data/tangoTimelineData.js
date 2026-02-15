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
        status: "populated",
        summary: [
          "Tango born in cultural estuary of Buenos Aires AND Montevideo — UNESCO 2009 recognized both",
          "African candombe foundation: cortes, quebradas, bent-knee canyengue — later erased by nationalist myth",
          "Afro-Argentine pioneers: Casimiro Alcorta, Rosendo Mendizábal ('El Entrerriano' 1898)",
          "5.9 million European immigrants 1870-1914; 52% of Buenos Aires foreign-born by 1895",
          "Conventillos, academias, street corners — NOT primarily brothels (scholarly consensus)",
          "Bandoneón arrives ~1870, becomes central by 1910s (Maglio, Arolas)",
          "Paris tangomania 1912-1914: Pope bans it, Kaiser forbids officers, tango conquers anyway",
          "Villoldo's 'El Choclo' (1903), Matos Rodríguez's 'La Cumparsita' (1916) define the era"
        ],
        keyFigures: [
          { name: "Ángel Villoldo", type: "individual", role: "El Padre del Tango — 'El Choclo', 'La Morocha' (1861–1919)" },
          { name: "Rosendo Mendizábal", type: "individual", role: "Afro-Argentine — first published tango 'El Entrerriano' (1868–1913)" },
          { name: "Casimiro Alcorta", type: "individual", role: "Afro-Argentine — 'father of tango', first ensemble (~1840–1913)" },
          { name: "Gerardo Matos Rodríguez", type: "individual", role: "Uruguayan — composed 'La Cumparsita' (1897–1948)" },
          { name: "Eduardo Arolas", type: "individual", role: "El Tigre del Bandoneón — died Paris at 32 (1892–1924)" },
          { name: "Roberto Firpo", type: "orchestra", role: "Established piano, first 'La Cumparsita' recording (1884–1969)" },
          { name: "Vicente Greco", type: "orchestra", role: "Created Orquesta Típica Criolla format (1888–1924)" },
          { name: "Francisco Canaro", type: "orchestra", role: "Born Uruguay, added double bass, ~3,800 recordings (1888–1964)" },
          { name: "Gabino Ezeiza", type: "individual", role: "Afro-Argentine payador — linked milonga to candombe (1858–1916)" },
          { name: "El Cachafaz", type: "individual", role: "Legendary early dancer, bridges to Golden Age (1885–1942)" }
        ],
        paperPath: "/tango-papers/argentina/guardia-vieja.md"
      },
      {
        id: "guardia-nueva",
        title: "La Guardia Nueva",
        subtitle: "The New Guard",
        yearStart: 1925,
        yearEnd: 1935,
        status: "populated",
        summary: [
          "Julio De Caro's 1924 orchestral revolution invents modern tango arrangement",
          "Carlos Gardel creates tango canción — 'Mi noche triste' (1917) births the sung tango",
          "Bandoneon finds its true voice: Arolas, Maffia, Laurenz unlock its dark, lyrical potential",
          "Sextet to orquesta típica: 2 bandoneons, 2 violins, piano, bass becomes standard format",
          "Records (4M/year by 1926) and radio (25 stations) carry tango into every Argentine home",
          "Tango lyrics become literature: Discépolo, Manzi, Flores, Cadícamo",
          "September 1930 coup begins Década Infame — but tango proves resilient"
        ],
        keyFigures: [
          { name: "Julio De Caro", type: "orchestra", role: "Inventor of modern tango orchestration (1899–1980)" },
          { name: "Carlos Gardel", type: "singer", role: "El Zorzal Criollo — voice of tango, 800+ recordings (1890–1935)" },
          { name: "Eduardo Arolas", type: "individual", role: "El Tigre del Bandoneón — died Paris 1924 at 32" },
          { name: "Pedro Maffia", type: "individual", role: "Found bandoneon's dark, singing voice (1899–1967)" },
          { name: "Pedro Laurenz", type: "individual", role: "El Cadenero — vibrant rhythmic precision (1902–1972)" },
          { name: "Francisco Canaro", type: "orchestra", role: "Pirincho — ~3,800 recordings, founded SADAIC (1888–1964)" },
          { name: "Roberto Firpo", type: "orchestra", role: "First to record 'La Cumparsita' (1884–1969)" },
          { name: "Osvaldo Fresedo", type: "orchestra", role: "El Pibe de La Paternal — aristocratic style (1897–1984)" },
          { name: "Enrique Santos Discépolo", type: "lyricist", role: "Philosophical depth — 'Cambalache', 'Yira Yira' (1901–1951)" },
          { name: "Alfredo Le Pera", type: "lyricist", role: "Gardel's partner — 'Volver', 'Por una cabeza' (1900–1935)" }
        ],
        paperPath: "/tango-papers/argentina/guardia-nueva.md"
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
        status: "populated",
        summary: [
          "Never explicitly banned — but effectively crushed through curfews, gathering bans, lunfardo censorship",
          "Tango = Peronist = politically suspect; selective enforcement closed milongas while rock clubs stayed open",
          "Rock nacional, cumbia, folklore revival capture youth; tango becomes 'grandparents' music'",
          "Orquestas típicas collapse: hundreds → single digits; large orchestras → duos/quintets",
          "Big Four die: Di Sarli (1960), Troilo (1975), D'Arienzo (1976) — only Pugliese survives",
          "Milongueros stop dancing 20-30 years; mentor system destroyed; generational knowledge gap"
        ],
        keyFigures: [
          { name: "Osvaldo Pugliese", type: "orchestra", role: "Imprisoned by every regime; red carnation defiance; kept tango alive" },
          { name: "Astor Piazzolla", type: "individual", role: "Nuevo tango — 'music to listen to, not dance to'; split community" },
          { name: "Rock Nacional", type: "movement", role: "Replaced tango as Argentina's most popular music" }
        ],
        paperPath: "/tango-papers/argentina/decadencia.md"
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
        yearStart: 1990,
        yearEnd: 2005,
        status: "populated",
        summary: [
          "Cochabamba 444 practica (early 1990s–1997): birthplace of tango investigation movement",
          "Naveira & Salas reduce tango to 3 fundamental steps: cruce adelante, apertura, cruce atrás",
          "Shift from 'what to dance' → 'how to dance': analytical framework replaces rote memorization",
          "Off-axis vocabulary systematized: volcadas, colgadas, soltadas — Salas called 'Father of Volcadas'",
          "Chicho joins Investigation Group 1994 — 'In one month-and-a-half I learned what I hadn't learned in two years'",
          "Cosmotango organization and CITA festival founded (1999)",
          "2001-2002 economic crisis makes Buenos Aires affordable — tango tourism explodes"
        ],
        keyFigures: [
          { name: "Gustavo Naveira", type: "individual", role: "Architect of investigation — born 1960, studied with Dinzels, Pepito, Todaro, Virulazo" },
          { name: "Fabián Salas", type: "individual", role: "Co-architect — trained as lawyer, first touring tango teacher (1992), 'Father of Volcadas'" },
          { name: "Chicho Frumboli", type: "individual", role: "Prodigy — rock drummer who became 'absolutely the best dancer' (Naveira)" },
          { name: "Giselle Anne", type: "individual", role: "Classical ballet background, National Dance School — brought academic rigor" },
          { name: "Luciana Valle", type: "individual", role: "Investigation Group 1995-1997, contributed to universal teaching language" },
          { name: "El Pulpo Esbrez", type: "individual", role: "Developed suspension concept, extended barrida vocabulary" }
        ],
        paperPath: "/tango-papers/argentina/investigacion.md"
      },
      {
        id: "nuevo-peak",
        title: "Tango Nuevo Peak",
        subtitle: "Globalization Peak",
        yearStart: 2005,
        yearEnd: 2012,
        status: "populated",
        summary: [
          "40+ tango festivals in North America alone by 2006; CITA Buenos Aires: 30+ teachers, 90+ classes",
          "Istanbul becomes 'world's second-largest tango city'; Japan, Korea, Australia scenes mature",
          "Chicho & Juana's Canaro tangos and d'Arienzo milongas shock purists — nuevo meets Golden Age",
          "YouTube launches 2005 — demo videos spread movement vocabulary globally overnight",
          "UNESCO declares tango Intangible Cultural Heritage (2009)",
          "Teaching systematized: figures named, vocabulary codified, anyone can learn the framework"
        ],
        keyFigures: [
          { name: "Chicho Frumboli & Juana Sepúlveda", type: "couple", role: "Peak nuevo expression — virtuosity + Golden Age music" },
          { name: "Pablo Verón", type: "individual", role: "Film star (Tango Lesson), nuevo poster figure" },
          { name: "Fabian Salas & Lola Diaz", type: "couple", role: "Investigation systematizer, tours worldwide" }
        ],
        paperPath: "/tango-papers/argentina/nuevo-to-neotrad.md"
      },
      {
        id: "neo-traditional",
        title: "Neo-Traditional",
        subtitle: "Return to Roots",
        yearStart: 2008,
        yearEnd: 2030,
        status: "populated",
        summary: [
          "2008 financial crisis ends festival economy — teachers can't sustain international circuit",
          "Encuentro milonguero format spreads from Europe: all-invite, códigos enforced, DJ-centric",
          "Close embrace + nuevo body mechanics + Golden Age music = neo-traditional synthesis",
          "Chicho himself shifts to close embrace; Gavito's apilado embraced by former nuevo dancers",
          "Last milongueros pass: Tete (2010), Cartery (2015), Segarra (2018) — preservation urgent",
          "COVID (2020-2022) devastates communities; survivors rebuild with stronger local focus"
        ],
        keyFigures: [
          { name: "Carlos Gavito", type: "individual", role: "Apilado embrace icon — 'tango is a feeling' (1942–2005)" },
          { name: "Tete Rusconi", type: "individual", role: "Last guardian of estilo del centro (1936–2010)" },
          { name: "Osvaldo y Coca Cartery", type: "couple", role: "Unbroken milonguero tradition (Coca d. 2015)" }
        ],
        paperPath: "/tango-papers/argentina/nuevo-to-neotrad.md"
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
        paperPath: "/tango-papers/dancers/generations/pre-nuevo-masters.md",
        additionalPapers: ["/tango-papers/dancers/generations/thirty-year-window.md", "/tango-papers/dancers/generations/milonguero-generation.md"]
      },
      {
        id: "dark-years",
        title: "The Dark Years",
        subtitle: "La Decadencia — When Dancing Went Underground",
        yearStart: 1955,
        yearEnd: 1983,
        status: "populated",
        summary: [
          "Military coup (1955) overthrows Perón — tango associated with peronismo becomes suspect",
          "Curfews, gathering restrictions make milongas impossible; orquestas collapse from hundreds to single digits",
          "Most milongueros STOP dancing for 20-30 years — working, raising families, surviving",
          "Only stage professionals (Copes, María Nieves) and a few stubborn milongueros persist",
          "Rock Nacional captures youth; tango becomes 'music of grandparents'",
          "Mentor system destroyed — no new generation learns in the milongas",
          "Tango Argentino show (Paris 1983) rescues forgotten dancers from obscurity"
        ],
        keyFigures: [
          { name: "Juan Carlos Copes", type: "individual", role: "Stage professional who survived entire Decadencia performing" },
          { name: "María Nieves", type: "individual", role: "Copes' partner 30+ years, kept dancing through dark years" },
          { name: "Virulazo", type: "individual", role: "Discovered in obscurity for Tango Argentino cast" },
          { name: "Osvaldo Pugliese", type: "orchestra", role: "Only major orchestra that kept playing; red carnation defiance" }
        ],
        whatHappened: {
          stoppedDancing: ["Tete", "Pepito", "Pupi", "Vidort", "Portalea", "El Turco José", "most milongueros"],
          keptDancing: ["Copes & María Nieves (stage)", "Virulazo (underground)", "a handful of stubborn old-timers"],
          yearsLost: "20-30 years for most Guardian Generation dancers"
        },
        paperPath: "/tango-papers/argentina/decadencia.md"
      },
      {
        id: "bridge-generation",
        title: "Bridge Generation",
        subtitle: "Codifiers and Teachers",
        yearStart: 1983,
        yearEnd: 2000,
        status: "populated",
        summary: [
          "Learned directly from Guardian Generation in critical 1985–1995 transmission window",
          "Transformed instinctive knowledge into teachable methodology",
          "Graciela González: first Followers Technique seminar (1994), 20 years studying with Pupi",
          "Susana Miller: codified 'milonguero style' as distinct approach, studied with Tete",
          "Silvia Ceriani: Tete's partner from 1995, musicalizadora, continues transmitting",
          "Daniel Trenner: 'Johnny Appleseed' — brought 1,500+ Americans to BA, taught 100+ US cities"
        ],
        keyFigures: [
          { name: "Graciela González", type: "individual", role: "La Leona del Tango — first followers technique pedagogy" },
          { name: "Susana Miller", type: "individual", role: "Codified milonguero style, studied with Tete" },
          { name: "Silvia Ceriani", type: "individual", role: "Tete's partner from 1995, musicalizadora" },
          { name: "Myriam Pincen", type: "individual", role: "30+ year milonguera, Vidort's partner" },
          { name: "Daniel Trenner", type: "individual", role: "Bridge to the Tango tours — US pioneer" },
          { name: "Gloria & Rodolfo Dinzel", type: "couple", role: "Dinzel System — 3,600+ catalogued figures" }
        ],
        paperPath: "/tango-papers/dancers/generations/pre-nuevo-masters.md",
        additionalPapers: ["/tango-papers/dancers/generations/thirty-year-window.md"]
      },
      {
        id: "nuevo-innovators",
        title: "Nuevo Innovators",
        subtitle: "The Investigation Generation",
        yearStart: 1990,
        yearEnd: 2010,
        status: "populated",
        summary: [
          "Naveira & Salas: Cochabamba 444 prácticas (1987–97), crowds of 200+ — systematic investigation",
          "Shift from 'what to dance' → 'how to dance': axis, dissociation, projection analyzed",
          "Vocabulary named/created: colgadas, volcadas, soltadas — physics of improvisation decoded",
          "Electrotango soundtracks: Gotan Project (2001), Bajofondo (2002) — new audiences",
          "Peak 2003–2008: Practica X opens 2004, international visibility peak 2005–07",
          "Decline: Aug 2008 'retrenchment to close embrace' (Merritt); Chicho repudiates nuevo (Dec 2009)"
        ],
        keyFigures: [
          { name: "Gustavo Naveira", type: "individual", role: "Investigation leader, studied with Pepito & Todaro" },
          { name: "Fabián Salas", type: "individual", role: "Partner in investigation, analytical methodology" },
          { name: "Chicho Frumboli", type: "individual", role: "Learned with last milongueros, repudiated nuevo 2009" },
          { name: "Sebastián Arce & Mariana Montes", type: "couple", role: "Nuevo era teachers and performers" },
          { name: "Giselle Anne", type: "individual", role: "Classical ballet background, analytical approach" }
        ],
        paperPath: "/tango-papers/dancers/nuevo-innovators.md",
        additionalPapers: ["/tango-papers/dancers/generations/thirty-year-window.md"]
      },
      {
        id: "stage-pioneers",
        title: "Stage Pioneers",
        subtitle: "Theatrical Tango",
        yearStart: 1983,
        yearEnd: 2000,
        status: "populated",
        summary: [
          "'Tango Argentino' (1983): Copes & María Nieves headliners; Virulazo found in butcher shop",
          "Dinzels create 'Dinzel System' — 3,600+ catalogued figures; Naveira credits as first teachers",
          "Forever Tango (1997): Carlos Gavito's minimalist stage style — 'tent' embrace, dramatic pauses",
          "Pablo Verón: 'The Tango Lesson' (1997) brings tango to art-house cinema",
          "Miguel Ángel Zotto & Milena Plebs: founded Tango x 2 (1988), studied with Dinzels, Todaro, Pepito",
          "Stage vs. social divide: Mundial (2003) formalizes Salón vs. Escenario categories"
        ],
        keyFigures: [
          { name: "Juan Carlos Copes", type: "individual", role: "'Tango Argentino' choreographer (1931–2021)" },
          { name: "María Nieves Rego", type: "individual", role: "Partner age 14, Ed Sullivan appearances (b. 1934)" },
          { name: "Virulazo & Elvira Santamaría", type: "couple", role: "Raw milonguero authenticity, 278 lbs" },
          { name: "Gloria & Rodolfo Dinzel", type: "couple", role: "Dinzel System, Centro Educativo del Tango" },
          { name: "Carlos Gavito", type: "individual", role: "Forever Tango star, minimalist stage (1942–2005)" },
          { name: "Pablo Verón", type: "individual", role: "'The Tango Lesson' film star (b. ~1963)" },
          { name: "Miguel Ángel Zotto & Milena Plebs", type: "couple", role: "Tango x 2 founders (b. 1958)" },
          { name: "Nelson Avila & Nélida Rodriguez de Aure", type: "couple", role: "Speed and acrobatic steps" },
          { name: "Héctor & Elsa María Mayoral", type: "couple", role: "Elegant salon style" }
        ],
        paperPath: "/tango-papers/dancers/stage-pioneers.md",
        additionalPapers: ["/tango-papers/dancers/generations/thirty-year-window.md"]
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
        yearStart: 1907,
        yearEnd: 1914,
        status: "populated",
        summary: [
          "Villoldo travels to Paris 1907; Flora Rodríguez records 'La Morocha' — first tango vocal in Europe",
          "1913: H.G. Wells calls it 'the year of the tango' — Magic-City becomes epicenter",
          "Pope Pius X condemns tango Nov 1913; Kaiser bans officers in uniform Nov 17, 1913",
          "Niños bien (Argentine rich sons) transmit dance they'd never do at home",
          "Thé dansant format spreads tango to bourgeois women without scandal",
          "Fashion revolution: corsets cast off, slit skirts appear, 'Tango Orange' color craze",
          "WWI kills first tangomania — but validation has boomeranged back to Buenos Aires"
        ],
        keyFigures: [
          { name: "Ángel Villoldo", type: "individual", role: "Paris 1907; first tango recordings in Europe" },
          { name: "Enrique Saborido", type: "individual", role: "Composer of 'La Morocha', taught Paris 1911-1914" },
          { name: "Camille de Rhynal", type: "individual", role: "Sanitized tango for European ballrooms" },
          { name: "Maurice Mouvet", type: "individual", role: "First professional to perform tango in Paris (1908)" },
          { name: "Vernon & Irene Castle", type: "couple", role: "Made tango 'acceptable' — young, clean, married" }
        ],
        paperPath: "/tango-papers/europe/paris-tango.md"
      },
      {
        id: "interwar",
        title: "Interwar Period",
        subtitle: "Tango Continuation",
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
        yearEnd: 1990,
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
        status: "populated",
        summary: [
          "'Tango Argentino' premieres Théâtre du Châtelet, Nov 11, 1983 — Festival d'Automne",
          "Cast flew on Argentine Air Force cargo plane; Virulazo found in butcher shop, 278 lbs",
          "Only 250 tickets sold before opening — sold out every night for 6 days",
          "Libération: 'Le tango est entré de nouveau dans Paris' — Paris validates tango, again",
          "Broadway Oct 1985: 198 performances, 3 Tony nominations, $6.2M gross",
          "Cast seeded tango communities worldwide wherever they toured for 15 years"
        ],
        keyFigures: [
          { name: "Claudio Segovia", type: "individual", role: "Co-creator, visionary designer (1933–2025)" },
          { name: "Héctor Orezzoli", type: "individual", role: "Co-creator, 'Yuyo' (1953–1991)" },
          { name: "Juan Carlos Copes & María Nieves", type: "couple", role: "Headliners, choreography" },
          { name: "Virulazo & Elvira Santamaría", type: "couple", role: "Raw milonguero authenticity" },
          { name: "Gloria & Rodolfo Dinzel", type: "couple", role: "Scholarly precision" },
          { name: "Sexteto Mayor", type: "orchestra", role: "House orchestra" },
          { name: "Roberto Goyeneche", type: "individual", role: "Sang at world premiere" }
        ],
        paperPath: "/tango-papers/europe/paris-tango.md"
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
        status: "populated",
        summary: [
          "Tango arrives via Paris (~1911); 'tango pirates' teach in hotels for tips",
          "Moral panic: clergy condemn, cities attempt bans — makes tango more desirable",
          "Vernon & Irene Castle (1912-1918) sanitize tango — 'young, clean, married, well-mannered'",
          "Castle's 'Modern Dancing' (1914) removes close embrace, sensuality, improvisation",
          "Rudolph Valentino's gaucho tango in Four Horsemen (1921) fixes exotic spectacle image",
          "Tea dances, hotel ballrooms, cabarets — tango becomes American social dance (heavily altered)"
        ],
        keyFigures: [
          { name: "Vernon Castle", type: "individual", role: "English-born; sanitized tango (1887–1918)" },
          { name: "Irene Castle", type: "individual", role: "Fashion icon, Castle Bob haircut (1893–1969)" },
          { name: "James Reese Europe", type: "individual", role: "African American bandleader; Castles' music director" },
          { name: "Rudolph Valentino", type: "individual", role: "Four Horsemen tango scene (1895–1926)" },
          { name: "Maurice Mouvet", type: "individual", role: "Professional exhibition dancer, tango star" }
        ],
        paperPath: "/tango-papers/usa/early-usa.md"
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
        status: "populated",
        summary: [
          "'Tango Argentino' opens Mark Hellinger Theatre Oct 9, 1985 — 198 performances, $6.2M gross",
          "Cast average age 42; one set, four bandoneóns, no English — broke every Broadway rule",
          "Americans see real tango for first time — nothing like ballroom's head-snaps and roses",
          "Sandra Cameron's Greenwich Village school: tango enrollment triples overnight (40 → 124)",
          "Stanford Tango Week founded 1991 by Richard Powers — first US tango festival",
          "Daniel Trenner's 'Bridge to the Tango' tours bring 1,500+ Americans to Buenos Aires by 2001"
        ],
        keyFigures: [
          { name: "Juan Carlos Copes & María Nieves", type: "couple", role: "Headliners, 30+ year partnership" },
          { name: "Virulazo & Elvira", type: "couple", role: "278-lb former butcher, raw milonguero truth" },
          { name: "Gloria & Rodolfo Dinzel", type: "couple", role: "Scholarly precision, created Dinzel System" },
          { name: "Daniel Trenner", type: "individual", role: "Johnny Appleseed of tango — 100+ US cities" },
          { name: "Paul Pellicoro", type: "individual", role: "DanceSport NYC, trained Al Pacino for Scent of a Woman" },
          { name: "Nora Dinzelbacher", type: "individual", role: "First Argentine tango teacher at Stanford 1991" },
          { name: "Sandra Cameron", type: "individual", role: "Greenwich Village studio, first dedicated AT program" }
        ],
        paperPath: "/tango-papers/usa/broadway-impact.md"
      },
      {
        id: "american-growth",
        title: "American Growth",
        subtitle: "Coast to Coast",
        yearStart: 1995,
        yearEnd: 2010,
        status: "populated",
        summary: [
          "Post-1995: festivals multiply (ValenTango '97, Denver Memorial Day, Austin, Miami, Chicago)",
          "Forever Tango Broadway (1997): 322 performances, Carlos Gavito becomes iconic",
          "Internet era: Tango-L mailing list, TangoCD.com for music, early websites connect scenes",
          "Argentina's 2001 crisis: peso collapses, teachers migrate, BA becomes affordable tango tourism",
          "Style wars: open vs. close embrace, nuevo vs. traditional, regional scenes diverge",
          "Communities reach critical mass: self-sustaining milongas in 30+ US cities"
        ],
        keyFigures: [
          { name: "Carlos Gavito", type: "individual", role: "Forever Tango star (1942–2005)" },
          { name: "Luis Bravo", type: "individual", role: "Forever Tango creator (1990)" },
          { name: "Alberto Paz & Valorie Hart", type: "couple", role: "Planet Tango, Tango Our Dance — Bay Area" },
          { name: "Homer & Cristina Ladas", type: "couple", role: "Bay Area teaching, festival circuit" },
          { name: "Clay Nelson", type: "individual", role: "Portland scene builder" },
          { name: "Rebecca Shulman", type: "individual", role: "NYC organizer, Triangulo connection" }
        ],
        paperPath: "/tango-papers/usa/american-growth.md"
      },
      {
        id: "american-present",
        title: "Contemporary USA",
        subtitle: "Mature Communities",
        yearStart: 2010,
        yearEnd: 2030,
        status: "populated",
        summary: [
          "Neo-traditional turn: close embrace, Golden Age music, códigos adoption accelerates",
          "YouTube transforms learning — demo videos, milonga footage, historical archives",
          "Encuentro/marathon format imports from Europe; traditional milonga format valued",
          "COVID devastation (2020–2022): venues close, teachers pivot, communities rebuild",
          "Post-COVID: smaller but more committed communities; some scenes did not survive",
          "American-trained teachers now teach internationally; US no longer purely 'importing'"
        ],
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
        subtitle: "Guitar, Flute & First Bandoneón",
        yearStart: 1880,
        yearEnd: 1920,
        status: "populated",
        summary: [
          "Earliest trios: flute, guitar, violin (sometimes clarinet) — 1880s-1890s",
          "First ensemble: Casimiro Alcorta + El Mulato Sinforoso + guitarist (1870s-1890s)",
          "Bandoneón arrives ~1870 via German/Italian emigrants — slows music to accommodate instrument",
          "Vicente Greco coins 'Orquesta Típica Criolla' (1910) — sets the template",
          "Roberto Firpo establishes piano (1913), Canaro adds double bass (1917)",
          "First recordings: Villoldo 'El Choclo' (Philadelphia, 1906), Greco 'Don Juan' (1910)",
          "2/4 time, fast tempo, largely improvised, three-section structure"
        ],
        keyFigures: [
          { name: "Casimiro Alcorta", type: "individual", role: "Afro-Argentine — first documented tango ensemble (~1840–1913)" },
          { name: "Vicente Greco", type: "orchestra", role: "Created Orquesta Típica Criolla name/format (1888–1924)" },
          { name: "Roberto Firpo", type: "orchestra", role: "Established piano, first 'La Cumparsita' (1884–1969)" },
          { name: "Juan 'Pacho' Maglio", type: "individual", role: "First popular bandoneón recordings 1912-13 (1880–1934)" },
          { name: "Eduardo Arolas", type: "individual", role: "El Tigre del Bandoneón (1892–1924)" },
          { name: "Ángel Villoldo", type: "individual", role: "El Padre del Tango — first recordings (1861–1919)" },
          { name: "Francisco Canaro", type: "orchestra", role: "Added double bass 1917, Uruguayan-born (1888–1964)" },
          { name: "Agustín Bardi", type: "individual", role: "Harmonically advanced, ahead of his time (1884–1941)" }
        ],
        paperPath: "/tango-papers/argentina/guardia-vieja.md"
      },
      {
        id: "guardia-nueva-orchestras",
        title: "Guardia Nueva Orchestras",
        subtitle: "Refinement of the Orquesta Típica",
        yearStart: 1925,
        yearEnd: 1935,
        status: "populated",
        summary: [
          "Julio De Caro's 1924 revolution: written arrangements, counterpoint, instrumental independence",
          "Sexteto típico codified: 2 bandoneons, 2 violins, piano, double bass",
          "De Caro introduces Stroh violin (violín-corneta) as visual/sonic trademark",
          "Francisco De Caro's piano becomes 'heart of the orchestra' — melodic, ornamental, linking",
          "Bandoneon trio: Arolas (octave phrasing), Maffia (dark voice), Laurenz (rhythmic fire)",
          "By 1926: 4 million discs/year, Victor vs Odeon rivalry shapes tango's evolution",
          "Escuela Decareana directly leads to Troilo, Pugliese, Salgán, Piazzolla"
        ],
        keyFigures: [
          { name: "Julio De Caro", type: "orchestra", role: "Father of modern orchestration — 420+ works (1899–1980)" },
          { name: "Francisco De Caro", type: "individual", role: "Piano innovation, co-led sextet (1898–1976)" },
          { name: "Pedro Maffia", type: "individual", role: "Discovered bandoneon's singing voice (1899–1967)" },
          { name: "Pedro Laurenz", type: "individual", role: "El Cadenero — 'Los dos Pedritos' with Maffia (1902–1972)" },
          { name: "Eduardo Arolas", type: "individual", role: "El Tigre del Bandoneón — died Paris at 32 (1892–1924)" },
          { name: "Francisco Canaro", type: "orchestra", role: "~3,800 tracks, founded SADAIC, pioneered estribillista (1888–1964)" },
          { name: "Roberto Firpo", type: "orchestra", role: "Established piano in orchestra, first 'La Cumparsita' (1884–1969)" },
          { name: "Osvaldo Fresedo", type: "orchestra", role: "Aristocratic style, 63-year career, 1,250+ recordings (1897–1984)" },
          { name: "Juan Carlos Cobián", type: "orchestra", role: "Tango romanza pioneer — 'Nostalgias' (1896–1953)" }
        ],
        paperPath: "/tango-papers/argentina/guardia-nueva.md"
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
        paperPath: "/tango-papers/argentina/epoca-de-oro.md",
        additionalPapers: ["/tango-papers/orchestras/golden-age-singers.md"]
      },
      {
        id: "post-golden",
        title: "Post-Golden Age",
        subtitle: "When the Orchestras Died",
        yearStart: 1955,
        yearEnd: 1990,
        status: "populated",
        summary: [
          "Coup Sept 16, 1955: Perón overthrown — tango funding evaporates, gatherings restricted",
          "Military imposes indoor curfews, licensing fees; orchestras can't fill venues or get paid",
          "Big Four collapse: Di Sarli (1960), D'Arienzo (1976), Troilo (1975), Pugliese survives to 1995",
          "Orquestas típicas: ~200 (1945) → 12-15 (1965) → 2-3 (1975) — economic extinction",
          "1970s rock Nacional captures youth; 'Flaca' (Spinetta) replaces 'La Cumparsita'",
          "Piazzolla's Octeto Buenos Aires (1955) polarizes: 'not tango' vs. 'tango's future'",
          "80,000+ master recordings lost in vault fires (SADAIC 1962, Radio El Mundo 1988)"
        ],
        keyFigures: [
          { name: "Osvaldo Pugliese", type: "orchestra", role: "Last survivor of Big Four — red carnation defiance (1905–1995)" },
          { name: "Astor Piazzolla", type: "individual", role: "Nuevo tango revolution — exiled from dance halls (1921–1992)" },
          { name: "Sexteto Tango", type: "orchestra", role: "Ex-Pugliese musicians, late-night Radio Municipal (1968–present)" },
          { name: "Carlos Di Sarli", type: "orchestra", role: "Last concert June 12, 1960; died Jan 12, 1983 (1903–1960)" },
          { name: "Aníbal Troilo", type: "orchestra", role: "Kept 15-piece orchestra through bad years; died May 18, 1975" }
        ],
        paperPath: "/tango-papers/orchestras/post-golden.md"
      },
      {
        id: "revival-orchestras",
        title: "Revival Orchestras",
        subtitle: "New Generations",
        yearStart: 1990,
        yearEnd: 2030,
        status: "populated",
        summary: [
          "Color Tango (1990): Roberto Álvarez (Pugliese's first bandoneón) preserves arrangements note-for-note",
          "Orquesta Típica Fernández Fierro (2001): punk energy, cooperative model, own venue — reaches new audiences",
          "Sexteto Milonguero (2006–2020): focused on dance-floor practicality, Golden Age faithful",
          "International expansion: Bandonegro (Poland, 2010) proves non-Argentines can play authentic tango",
          "Training pipeline rebuilt: Escuela de Música Popular de Avellaneda, Orquesta Escuela Emilio Balcarce",
          "The challenge: competing with 50,000 perfect Golden Age recordings; bandoneón supply limited"
        ],
        keyFigures: [
          { name: "Color Tango", type: "orchestra", role: "First revival orchestra (1990), Pugliese faithful" },
          { name: "Roberto Álvarez", type: "individual", role: "Pugliese's first bandoneón, Color Tango founder" },
          { name: "Orquesta Típica Fernández Fierro", type: "orchestra", role: "Punk tango cooperative (2001)" },
          { name: "Sexteto Milonguero", type: "orchestra", role: "Dance-focused orchestra (2006–2020)" },
          { name: "El Arranque", type: "orchestra", role: "Early revival, traditional approach" },
          { name: "Tango Bardo", type: "orchestra", role: "Nuevo generation orchestra" },
          { name: "Orquesta Rascacielos", type: "orchestra", role: "Contemporary revival orchestra" },
          { name: "Bandonegro", type: "orchestra", role: "Polish orchestra, international circuit (2010)" },
          { name: "Gotan Project", type: "orchestra", role: "Electrotango — listeners not dancers (2001)" },
          { name: "Bajofondo", type: "orchestra", role: "Electronic tango collective (2002)" }
        ],
        paperPath: "/tango-papers/orchestras/revival-orchestras.md"
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
        status: "populated",
        summary: [
          "April 1905: Columbia Records sends engineers to Río de la Plata — Villoldo records first matrices",
          "1907: Villoldo travels to Paris with Gobbis, records 'El Choclo' for international distribution",
          "'La Morocha' sells 280,000+ sheet music copies — first tango exported to Europe",
          "By 1910: 350+ tango discs; over 1/3 of all gramophone records feature tango"
        ],
        keyFigures: [
          { name: "Ángel Villoldo", type: "individual", role: "First tango recordings" },
          { name: "Vicente Greco", type: "orchestra", role: "First orquesta típica recording" }
        ],
        eventType: "recording",
        paperPath: "/tango-papers/events/first-recordings.md"
      },
      {
        id: "mi-noche-triste",
        title: "'Mi Noche Triste'",
        subtitle: "Birth of Tango-Canción",
        yearStart: 1917,
        yearEnd: 1918,
        status: "populated",
        summary: [
          "Gardel records 'Mi Noche Triste' — first tango with integrated sentimental lyrics",
          "Invents tango-canción; transforms tango from dance music to storytelling"
        ],
        keyFigures: [{ name: "Carlos Gardel", type: "individual", role: "Singer" }],
        eventType: "recording"
      },
      {
        id: "valentino-tango",
        title: "Valentino's Tango",
        subtitle: "Four Horsemen",
        yearStart: 1921,
        yearEnd: 1922,
        status: "populated",
        summary: [
          "Rudolph Valentino's gaucho tango in 'Four Horsemen of the Apocalypse'",
          "Fixes tango-as-exotic-spectacle image in American imagination for decades"
        ],
        keyFigures: [{ name: "Rudolph Valentino", type: "individual", role: "Actor" }],
        eventType: "film"
      },
      {
        id: "arolas-death",
        title: "Arolas Dies",
        subtitle: "El Tigre del Bandoneón",
        yearStart: 1924,
        yearEnd: 1925,
        status: "populated",
        summary: [
          "Eduardo Arolas dies alone in Paris at 32 (Sept 29, 1924)",
          "Greatest bandoneonist of Guardia Vieja — genius lost to poverty and addiction"
        ],
        keyFigures: [{ name: "Eduardo Arolas", type: "individual", role: "El Tigre" }],
        eventType: "death"
      },
      {
        id: "gardel-films",
        title: "Gardel Films",
        subtitle: "Paramount Era",
        yearStart: 1931,
        yearEnd: 1935,
        status: "populated",
        summary: [
          "Gardel makes films for Paramount in Paris & NYC (1931–1935)",
          "'El Día Que Me Quieras' (1935) released after his death — immortalizes his image"
        ],
        keyFigures: [
          { name: "Carlos Gardel", type: "individual", role: "Star" },
          { name: "Alfredo Le Pera", type: "individual", role: "Lyricist" }
        ],
        eventType: "film"
      },
      {
        id: "tango-1933-film",
        title: "'¡Tango!'",
        subtitle: "First Argentine Sound Film",
        yearStart: 1933,
        yearEnd: 1934,
        status: "populated",
        summary: [
          "Argentina's first sound film — directed by Luis Moglia Barth",
          "Stars Tita Merello, Libertad Lamarque, Alberto Gómez"
        ],
        keyFigures: [{ name: "Tita Merello", type: "individual", role: "Actress" }],
        eventType: "film"
      },
      {
        id: "paris-tangomania",
        title: "Paris Tangomania",
        subtitle: "Tangomanía en París",
        yearStart: 1912,
        yearEnd: 1914,
        status: "populated",
        summary: [
          "Tango arrives like fire — first a flicker, then an inferno by 1913",
          "Pope Pius X condemns it (Nov 1913); Kaiser, Queen Mary, Italian War Minister all ban it",
          "Fashion revolution: split skirts, 'tango orange' color, thé dansants",
          "Argentine ambassador warns French it's 'found only in whorehouses' — French don't care",
          "WWI interrupts the party, but tango has permanently escaped Buenos Aires slums"
        ],
        eventType: "cultural",
        paperPath: "/tango-papers/events/paris-tangomania.md"
      },
      {
        id: "gardel-death",
        title: "Gardel Dies",
        subtitle: "Muerte de Gardel",
        yearStart: 1935,
        yearEnd: 1936,
        status: "populated",
        summary: [
          "June 24, 1935: Ford Trimotor crashes at Medellín — 17 dead including Gardel and lyricist Le Pera",
          "800+ recordings, 8 Paramount films — transformed tango from arrabal dance to global art",
          "Body travels through Colombia, Venezuela, NYC, Rio before Montevideo and final rest at Chacarita",
          "UNESCO Memory of the World (2003); 'Gardel cada día canta mejor'"
        ],
        keyFigures: [{ name: "Carlos Gardel", type: "individual" }],
        eventType: "death",
        paperPath: "/tango-papers/events/gardel-death.md"
      },
      {
        id: "darienzo-revolution",
        title: "D'Arienzo Revolution",
        subtitle: "Revolución D'Arienzo",
        yearStart: 1935,
        yearEnd: 1938,
        status: "populated",
        summary: [
          "Pianist Rodolfo Biagi pushes D'Arienzo back to 2/4 beat of Guardia Vieja",
          "1935-1939: 116 sides recorded, outselling Canaro and Troilo combined",
          "El Rey del Compás — 'Laugh if you will, but without D'Arienzo we'd all be out of work' (Troilo)",
          "Launches the Golden Age, filling dance floors for next 20 years"
        ],
        keyFigures: [
          { name: "Juan D'Arienzo", type: "orchestra" },
          { name: "Rodolfo Biagi", type: "individual", role: "Pianist" }
        ],
        eventType: "music",
        paperPath: "/tango-papers/events/darienzo-revolution.md"
      },
      {
        id: "lunfardo-ban",
        title: "Lunfardo Banned",
        subtitle: "Censorship Begins",
        yearStart: 1943,
        yearEnd: 1944,
        status: "populated",
        summary: [
          "Military government bans lunfardo slang from radio",
          "Tango lyrics forced to use 'proper' Spanish — kills authentic voice"
        ],
        eventType: "political"
      },
      {
        id: "lunfardo-restored",
        title: "Lunfardo Restored",
        subtitle: "Delegation to Perón",
        yearStart: 1949,
        yearEnd: 1950,
        status: "populated",
        summary: [
          "March 25, 1949: Canaro, Troilo, Manzi, Cadícamo petition Perón",
          "Lunfardo ban lifted — tango can speak in its own voice again"
        ],
        keyFigures: [
          { name: "Francisco Canaro", type: "orchestra" },
          { name: "Aníbal Troilo", type: "orchestra" }
        ],
        eventType: "political"
      },
      {
        id: "peron-fall",
        title: "Perón Overthrown",
        subtitle: "Caída de Perón",
        yearStart: 1955,
        yearEnd: 1956,
        status: "populated",
        summary: [
          "September 16, 1955: Military rises, Navy threatens to bomb BA; Perón flees on gunboat",
          "Revolución Libertadora bans Peronist party, blacklists artists, 'de-Peronization'",
          "Lunfardo censored, milongas restricted, tango = Peronist = suspect",
          "Rock arrives from US; no formal teaching tradition means broken transmission = evaporating knowledge"
        ],
        eventType: "political",
        paperPath: "/tango-papers/events/peron-overthrown.md"
      },
      {
        id: "di-sarli-death",
        title: "Di Sarli Dies",
        subtitle: "El Señor del Tango",
        yearStart: 1960,
        yearEnd: 1961,
        status: "populated",
        summary: [
          "Carlos Di Sarli dies January 12, 1960",
          "First of the Big Four to pass — elegant walking music silenced"
        ],
        keyFigures: [{ name: "Carlos Di Sarli", type: "orchestra" }],
        eventType: "death"
      },
      {
        id: "rca-masters-destroyed",
        title: "RCA Masters Destroyed",
        subtitle: "Cultural Catastrophe",
        yearStart: 1964,
        yearEnd: 1965,
        status: "populated",
        summary: [
          "RCA Argentina destroys warehouse of original metal masters",
          "Irreplaceable Golden Age recordings lost forever — cultural vandalism"
        ],
        eventType: "recording"
      },
      {
        id: "troilo-death",
        title: "Troilo Dies",
        subtitle: "Pichuco",
        yearStart: 1975,
        yearEnd: 1976,
        status: "populated",
        summary: [
          "Aníbal Troilo dies May 18, 1975",
          "Buenos Aires mourns — 'the musician's musician' is gone"
        ],
        keyFigures: [{ name: "Aníbal Troilo", type: "orchestra" }],
        eventType: "death"
      },
      {
        id: "darienzo-death",
        title: "D'Arienzo Dies",
        subtitle: "El Rey del Compás",
        yearStart: 1976,
        yearEnd: 1977,
        status: "populated",
        summary: [
          "Juan D'Arienzo dies January 14, 1976",
          "The King of the Beat — three of Big Four now gone"
        ],
        keyFigures: [{ name: "Juan D'Arienzo", type: "orchestra" }],
        eventType: "death"
      },
      {
        id: "dirty-war",
        title: "Dirty War",
        subtitle: "Guerra Sucia",
        yearStart: 1976,
        yearEnd: 1983,
        status: "populated",
        summary: [
          "March 24, 1976: Military seizes power — 22,000-30,000 disappeared",
          "10 PM curfew in culture where milongas start at midnight; gatherings of 3+ banned",
          "No explicit ban needed; rock clubs could bribe, milonga organizers couldn't",
          "By 1982: tango at 'minimum expression' — knowledge held by shrinking handful of old men"
        ],
        eventType: "political",
        paperPath: "/tango-papers/events/dirty-war.md"
      },
      {
        id: "national-tango-day",
        title: "National Tango Day",
        subtitle: "Día Nacional del Tango",
        yearStart: 1977,
        yearEnd: 1978,
        status: "populated",
        summary: [
          "December 11 declared National Tango Day",
          "Date honors both Gardel and Julio De Caro (same birthday)"
        ],
        eventType: "cultural"
      },
      {
        id: "tango-argentino-show",
        title: "'Tango Argentino'",
        subtitle: "El Show que Cambió Todo",
        yearStart: 1983,
        yearEnd: 1985,
        status: "populated",
        summary: [
          "Paris premiere Nov 11, 1983 — sold out Châtelet every night, crowds outside just to listen",
          "Broadway Oct 9, 1985: 199 performances, Tony nomination, $6.2M gross",
          "Sinatra, Madonna, Baryshnikov attended — tango lesson demand triples overnight",
          "Toured 15+ years; spawned Forever Tango, Tango Pasión — 'If today milongas in Verona or Alaska, Tango Argentino is responsible'"
        ],
        keyFigures: [
          { name: "Claudio Segovia", type: "individual" },
          { name: "Héctor Orezzoli", type: "individual" },
          { name: "Copes & Nieves", type: "couple" },
          { name: "Virulazo & Elvira", type: "couple" }
        ],
        eventType: "show",
        paperPath: "/tango-papers/events/tango-argentino-show.md"
      },
      {
        id: "democracy-returns",
        title: "Democracy Returns",
        subtitle: "Vuelta a la Democracia",
        yearStart: 1983,
        yearEnd: 1984,
        status: "populated",
        summary: [
          "October 30, 1983: Alfonsín elected; December 10: civilian government returns",
          "Cadícamo: 'The tango in 1983 was a memory'",
          "Old milongueros emerge from isolation — suspicious, reluctant, but they come back",
          "Two currents: BA milongueros reclaim floors + Paris premiere sparks international revival"
        ],
        eventType: "political",
        paperPath: "/tango-papers/events/democracy-returns.md"
      },
      {
        id: "exilio-gardel-film",
        title: "Tangos: el exilio de Gardel",
        subtitle: "Solanas Film",
        yearStart: 1985,
        yearEnd: 1986,
        status: "populated",
        summary: [
          "Fernando Solanas film about Argentine exiles in Paris",
          "Tango as metaphor for displaced identity during dictatorship"
        ],
        keyFigures: [{ name: "Fernando Solanas", type: "individual", role: "Director" }],
        eventType: "film"
      },
      {
        id: "finito-death",
        title: "Finito Dies",
        subtitle: "Muerte de Finito",
        yearStart: 1987,
        yearEnd: 1988,
        status: "populated",
        summary: [
          "1987: Ramón 'Finito' Rivera dies at ~55 — best social dancer of 1980s revival",
          "Villa Urquiza master; stopped dancing 20-25 years during dictatorship, returned with democracy",
          "Appeared in Tango: Baile Nuestro alongside Portalea and Balmaceda",
          "HITM FLAG: Sources scarce — dates, birth year need verification"
        ],
        keyFigures: [{ name: "Finito", type: "individual" }],
        eventType: "death",
        paperPath: "/tango-papers/events/finito-death.md"
      },
      {
        id: "forever-tango-sf",
        title: "Forever Tango (SF)",
        subtitle: "92-Week Run",
        yearStart: 1994,
        yearEnd: 1995,
        status: "populated",
        summary: [
          "Luis Bravo's Forever Tango runs 92 weeks in San Francisco",
          "Bay Area tango explodes — BAATA list grows from 400 to 1,400 dancers"
        ],
        keyFigures: [{ name: "Luis Bravo", type: "individual", role: "Creator" }],
        eventType: "show"
      },
      {
        id: "pugliese-death",
        title: "Pugliese Dies",
        subtitle: "San Pugliese",
        yearStart: 1995,
        yearEnd: 1996,
        status: "populated",
        summary: [
          "Osvaldo Pugliese dies July 25, 1995 at 89",
          "Last of Big Four — imprisoned by every regime, red carnation defiance, kept tango alive"
        ],
        keyFigures: [{ name: "Osvaldo Pugliese", type: "orchestra" }],
        eventType: "death"
      },
      {
        id: "ley-nacional-tango",
        title: "Ley Nacional del Tango",
        subtitle: "National Patrimony",
        yearStart: 1996,
        yearEnd: 1997,
        status: "populated",
        summary: [
          "Argentina declares tango part of national cultural patrimony",
          "Legal recognition of what the world already knew"
        ],
        eventType: "cultural"
      },
      {
        id: "pepito-death",
        title: "Pepito Dies",
        subtitle: "Muerte de Pepito",
        yearStart: 1996,
        yearEnd: 1997,
        status: "populated",
        summary: [
          "April 29, 1996: José Domingo Monteleone dies at 65",
          "King of the Milonga — danced orillero style from Avellaneda",
          "Pizzero by day, taught Amsterdam 1991-96, Northwestern 1995",
          "Got 5-year US visa; never got to use it"
        ],
        keyFigures: [{ name: "Pepito Avellaneda", type: "individual" }],
        eventType: "death",
        paperPath: "/tango-papers/events/pepito-death.md"
      },
      {
        id: "forever-tango-broadway",
        title: "Forever Tango (Broadway)",
        subtitle: "Gavito Stars",
        yearStart: 1997,
        yearEnd: 1998,
        status: "populated",
        summary: [
          "Forever Tango opens Broadway June 19, 1997 — 322+ performances",
          "Carlos Gavito & Marcela Durán's 'A Evaristo Carriego' becomes iconic"
        ],
        keyFigures: [
          { name: "Carlos Gavito", type: "individual", role: "Star" },
          { name: "Luis Bravo", type: "individual", role: "Creator" }
        ],
        eventType: "show"
      },
      {
        id: "tango-lesson-film",
        title: "'The Tango Lesson'",
        subtitle: "Film de Sally Potter",
        yearStart: 1997,
        yearEnd: 1998,
        status: "populated",
        summary: [
          "Sally Potter semi-autobiographical film — showed world what real Argentine tango looks like",
          "Cast includes Verón ('feet of God' — NYT), plus Naveira and Salas",
          "Venice Film Festival premiere; Best Film Mar del Plata; Sony Pictures Classics",
          "Teachers worldwide report surge of students: 'I saw this film'"
        ],
        keyFigures: [
          { name: "Pablo Verón", type: "individual", role: "Dancer/Actor" },
          { name: "Sally Potter", type: "individual", role: "Director" },
          { name: "Gustavo Naveira", type: "individual", role: "Featured dancer" }
        ],
        eventType: "film",
        paperPath: "/tango-papers/events/tango-lesson-film.md"
      },
      {
        id: "tango-saura-film",
        title: "Tango (Saura)",
        subtitle: "Oscar Nominated",
        yearStart: 1998,
        yearEnd: 1999,
        status: "populated",
        summary: [
          "Carlos Saura's 'Tango' nominated for Academy Award",
          "Tango recognized as high art by international film establishment"
        ],
        keyFigures: [{ name: "Carlos Saura", type: "individual", role: "Director" }],
        eventType: "film"
      },
      {
        id: "argentina-crisis",
        title: "Economic Crisis",
        subtitle: "Crisis Argentina",
        yearStart: 2001,
        yearEnd: 2002,
        status: "populated",
        summary: [
          "December 1, 2001: Corralito freezes accounts; peso loses 3/4 value; $95B default",
          "President flees by helicopter; 5 presidents in 2 weeks; milonga attendance drops 40%",
          "Paradox: crisis spreads tango globally — teachers migrate, collapsed peso makes BA cheap",
          "Tango tourism emerges; 'During crisis, people need a place to meet, distract themselves'"
        ],
        eventType: "political",
        paperPath: "/tango-papers/events/economic-crisis.md"
      },
      {
        id: "assassination-tango-film",
        title: "Assassination Tango",
        subtitle: "Duvall's Devotion",
        yearStart: 2002,
        yearEnd: 2003,
        status: "populated",
        summary: [
          "Robert Duvall writes, directs, stars in tango film",
          "American devotee's love letter to Buenos Aires milongas"
        ],
        keyFigures: [{ name: "Robert Duvall", type: "individual", role: "Director/Star" }],
        eventType: "film"
      },
      {
        id: "mundial-begins",
        title: "Mundial Begins",
        subtitle: "Primer Campeonato",
        yearStart: 2003,
        yearEnd: 2004,
        status: "populated",
        summary: [
          "2003: First Campeonato Mundial — 218 couples ages 18-85",
          "Two categories: Tango de Pista (social) and Tango Escenario (stage)",
          "By 2024: 750 couples from 53 countries; pre-qualifying in 30+ cities; $460M economic impact",
          "2013: Same-sex couples allowed; controversial among purists re: competition vs. social dancing"
        ],
        eventType: "cultural",
        paperPath: "/tango-papers/events/mundial-begins.md"
      },
      {
        id: "gavito-death",
        title: "Gavito Dies",
        subtitle: "Muerte de Gavito",
        yearStart: 2005,
        yearEnd: 2006,
        status: "populated",
        summary: [
          "July 1, 2005: Dies of cancer at 63 in Buenos Aires",
          "Forever Tango star — 'A Evaristo Carriego' with Marcela Durán became iconic",
          "'The tent' embrace — minimalist, intensely dramatic; 'The milonga is a cathedral — tango is a religion'",
          "'The man who does not make the woman look like a Queen will never be King'"
        ],
        keyFigures: [{ name: "Carlos Gavito", type: "individual" }],
        eventType: "death",
        paperPath: "/tango-papers/events/gavito-death.md"
      },
      {
        id: "vidort-death",
        title: "Vidort Dies",
        subtitle: "The Last Compadrito",
        yearStart: 2006,
        yearEnd: 2007,
        status: "populated",
        summary: [
          "May 21, 2006: Dies in Santa Fe, NM at 76 — 'The Last Compadrito'",
          "Danced the phrase, not the rhythm; incorporated compás into giros/corridas uniquely",
          "One of only two milongueros (with Gavito) who learned English — intimate international teaching",
          "HITM FLAG: Primary sources are tango community blogs"
        ],
        keyFigures: [{ name: "Ricardo Vidort", type: "individual" }],
        eventType: "death",
        paperPath: "/tango-papers/events/vidort-death.md"
      },
      {
        id: "pupi-portalea-death",
        title: "Pupi & Portalea Die",
        subtitle: "Pérdidas de 2007",
        yearStart: 2007,
        yearEnd: 2008,
        status: "populated",
        summary: [
          "2007: Villa Urquiza loses both pillars within a month of each other",
          "Pupi (~July 20): extrovert, 19-year partner of Graciela González, BBC documentary star",
          "Portalea: gravedigger, serious, modest — 'the finest dancer the northern barrios produced'",
          "HITM FLAG: Portalea details need verification; correct name is GERARDO (not Osvaldo)"
        ],
        keyFigures: [
          { name: "Pupi Castello", type: "individual" },
          { name: "Gerardo Portalea", type: "individual" }
        ],
        eventType: "death",
        paperPath: "/tango-papers/events/pupi-portalea-death.md"
      },
      {
        id: "cafe-maestros-film",
        title: "Café de los Maestros",
        subtitle: "Documentary",
        yearStart: 2008,
        yearEnd: 2009,
        status: "populated",
        summary: [
          "Documentary reunites surviving Golden Age musicians",
          "Horacio Salgán, Leopoldo Federico, others — living history captured on film"
        ],
        keyFigures: [{ name: "Horacio Salgán", type: "individual", role: "Pianist" }],
        eventType: "film"
      },
      {
        id: "unesco-recognition",
        title: "UNESCO Heritage",
        subtitle: "Patrimonio UNESCO",
        yearStart: 2009,
        yearEnd: 2010,
        status: "populated",
        summary: [
          "September 30, 2009 in Abu Dhabi: Tango declared Intangible Cultural Heritage of Humanity",
          "Joint Argentina/Uruguay nomination — historic rivals set aside ownership dispute",
          "Recognition covers dance, music, poetry, milonga rituals, oral traditions",
          "Second attempt (2001 rejected as 'too global'); gives 60+ country communities legitimacy"
        ],
        eventType: "cultural",
        paperPath: "/tango-papers/events/unesco-heritage.md"
      },
      {
        id: "tete-death",
        title: "Tete Dies",
        subtitle: "Muerte de Tete",
        yearStart: 2010,
        yearEnd: 2011,
        status: "populated",
        summary: [
          "January 7, 2010: Dies in Almagro, two days before 74th birthday — filmed at Canning 10 days prior",
          "Pina Bausch: 'He has an orchestra in his head' — danced Nur Du with Tanztheater Wuppertal 1995-97",
          "'Dance the music. Because the music is the tango.'",
          "Taught through Susana Miller who coined 'milonguero style' based on his dancing"
        ],
        keyFigures: [{ name: "Tete Rusconi", type: "individual" }],
        eventType: "death",
        paperPath: "/tango-papers/events/tete-death.md"
      },
      {
        id: "our-last-tango-film",
        title: "Our Last Tango",
        subtitle: "Un Tango Más",
        yearStart: 2015,
        yearEnd: 2016,
        status: "populated",
        summary: [
          "Documentary on Juan Carlos Copes & María Nieves",
          "Story of legendary partnership, love, betrayal — history through their bodies"
        ],
        keyFigures: [
          { name: "Juan Carlos Copes", type: "individual" },
          { name: "María Nieves", type: "individual" }
        ],
        eventType: "film"
      },
      {
        id: "covid-pandemic",
        title: "COVID Pandemic",
        subtitle: "Pandemia",
        yearStart: 2020,
        yearEnd: 2022,
        status: "populated",
        summary: [
          "March 8, 2020: All BA milongas close simultaneously — 118-200 venues, 18 months quarantine (world's longest)",
          "50+ milongas closed permanently; 10,000-person industry collapses; musicians pawn bandoneóns",
          "Survival strategies: Fabián Salas offers free Zoom classes; Nicolás Ponce sells plants; teachers pivot online",
          "Mora Godoy (taught Obama) closes school after 419 shows in 2019; La Viruta cuts 18 employees to 3",
          "Rivadavia Club (16 years) shutters March 2021; Daniel Rezk's Nuevo Gricel somehow survives entire pandemic",
          "Reopening Sept 2021: smaller but committed communities; encuentro circuit dark for 2 full years"
        ],
        keyFigures: [
          { name: "Mora Godoy", type: "individual", role: "Closed school after 419 shows in 2019" },
          { name: "Fabián Salas", type: "individual", role: "Offered free Zoom technique classes" },
          { name: "Daniel Rezk", type: "individual", role: "Kept Nuevo Gricel alive through entire pandemic" },
          { name: "Luciana Fuentes", type: "individual", role: "Organized defiant outdoor dancing at the Obelisco" }
        ],
        eventType: "political",
        paperPath: "/tango-papers/events/covid-pandemic.md"
      },
      {
        id: "copes-death",
        title: "Copes Dies",
        subtitle: "COVID Claims Pioneer",
        yearStart: 2021,
        yearEnd: 2022,
        status: "populated",
        summary: [
          "Juan Carlos Copes dies January 16, 2021 at 89 — COVID; highest-profile pandemic loss in tango",
          "Contracted virus December 2020; died in Buenos Aires hospital",
          "Created 'Tango Argentino' (Paris 1983, Broadway 1985) that triggered worldwide revival",
          "Taught Liza Minnelli, Robert Duvall, Mikhail Baryshnikov, Julio Bocca"
        ],
        keyFigures: [{ name: "Juan Carlos Copes", type: "individual", role: "Turned tango from social dance to theatrical art form" }],
        eventType: "death"
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
