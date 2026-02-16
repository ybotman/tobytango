/**
 * People Registry for tobytango.com
 *
 * This file contains metadata for all profiled individuals.
 * Profile content lives in /public/tango-papers/people/[slug].md
 *
 * Status values:
 *   - "published" = profile page live and complete
 *   - "draft" = profile exists but not linked publicly
 *   - "pending" = no profile yet, placeholder only
 */

const peopleData = [
  // === DANCERS: Nuevo Generation ===
  {
    slug: "chicho-frumboli",
    displayName: "Chicho Frúmboli",
    fullName: "Mariano 'Chicho' Frúmboli",
    type: "dancer",
    generation: "nuevo",
    born: "1970-09-21",
    died: null,
    nationality: "Argentine",
    tags: ["nuevo", "investigacion", "innovator", "rebound-master", "performer", "teacher"],
    summary: "Argentine tango dancer and innovator, founder of tango nuevo, known as 'the master of the rebound.'",
    paperPath: "/tango-papers/people/chicho-frumboli.md",
    status: "published",
    priority: 1
  },
  {
    slug: "gustavo-naveira",
    displayName: "Gustavo Naveira",
    fullName: "Gustavo Naveira",
    type: "dancer",
    generation: "nuevo",
    born: "1960-08-12",
    died: null,
    nationality: "Argentine",
    tags: ["nuevo", "investigacion", "cosmotango", "analytical", "teacher", "performer"],
    summary: "Co-founder of tango nuevo, organized Cochabamba Investigation Group, co-founded Cosmotango and CITA with Fabian Salas, 'Godfather of Argentine Tango.'",
    paperPath: "/tango-papers/people/gustavo-naveira.md",
    status: "published",
    priority: 2
  },
  {
    slug: "fabian-salas",
    displayName: "Fabián Salas",
    fullName: "Fabián Salas",
    type: "dancer",
    generation: "nuevo",
    born: "1963",
    died: null,
    nationality: "Argentine",
    tags: ["nuevo", "investigacion", "cita", "cosmotango", "teacher", "choreographer"],
    summary: "Co-founder of tango nuevo with Naveira, creator of CITA (world's longest-running tango festival since 1999), pioneer of analytical teaching methodology.",
    paperPath: "/tango-papers/people/fabian-salas.md",
    status: "published",
    priority: 3
  },
  {
    slug: "juana-sepulveda",
    displayName: "Juana Sepúlveda",
    fullName: "Juana Sepúlveda",
    type: "dancer",
    generation: "nuevo",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["nuevo", "performer", "teacher", "chicho-partner"],
    summary: "Chicho's partner since 2007, 17+ years tango experience, 'innovative subtlety and stunning power.'",
    paperPath: "/tango-papers/people/juana-sepulveda.md",
    status: "published",
    priority: 21
  },
  {
    slug: "giselle-anne",
    displayName: "Giselle Anne",
    fullName: "Giselle Anne",
    type: "dancer",
    generation: "nuevo",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["nuevo", "boulder", "teacher", "choreographer", "ballet-trained", "naveira-partner"],
    summary: "Naveira's partner since ~1995, co-created nuevo methodology, ballet-trained, learned from Todaro & Pepito, Boulder Tango Festival.",
    paperPath: "/tango-papers/people/giselle-anne.md",
    status: "published",
    priority: 22
  },

  // === DANCERS: Guardian Generation ===
  {
    slug: "tete-rusconi",
    displayName: "Tete Rusconi",
    fullName: "Pedro Alberto Rusconi",
    type: "dancer",
    generation: "guardian",
    born: "1936-01-09",
    died: "2010-01-07",
    nationality: "Argentine",
    tags: ["milonguero", "guardian", "close-embrace", "vals", "teacher"],
    summary: "Guardian generation milonguero, vals specialist, brought close-embrace style to USA with Susana Miller, performed with Pina Bausch.",
    paperPath: "/tango-papers/people/tete-rusconi.md",
    status: "published",
    priority: 4
  },
  {
    slug: "el-turco-jose",
    displayName: "El Turco José",
    fullName: "José Brahemcha",
    type: "dancer",
    generation: "guardian",
    born: "1931-07-17",
    died: "2010-04-15",
    nationality: "Argentine",
    tags: ["milonguero", "guardian", "villa-urquiza", "style-creator", "teacher"],
    summary: "Co-creator of Villa Urquiza style with Luis 'Milonguita' Lemos (1945–1956), known for elegant rotation and grounded technique.",
    paperPath: "/tango-papers/people/el-turco-jose.md",
    status: "published",
    priority: 5
  },
  {
    slug: "pepito-avellaneda",
    displayName: "Pepito Avellaneda",
    fullName: "José Domingo Monteleone",
    type: "dancer",
    generation: "guardian",
    born: "1930-11-30",
    died: "1996-04-29",
    nationality: "Argentine",
    tags: ["milonguero", "guardian", "avellaneda", "teacher", "vals", "milonga"],
    summary: "Neighborhood legend — Guardian generation, established European tango schools, true milonguero philosophy, pizza seller by day.",
    paperPath: "/tango-papers/people/pepito-avellaneda.md",
    status: "published",
    priority: 24
  },
  {
    slug: "finito",
    displayName: "Finito",
    fullName: "Ramón Rivera",
    type: "dancer",
    generation: "guardian",
    born: null,
    died: "1987",
    nationality: "Argentine",
    tags: ["milonguero", "guardian", "villa-urquiza", "elegance"],
    summary: "Elegance personified — best social dancer of 1980s, Villa Urquiza style, returned after 20-year hiatus for revival.",
    paperPath: "/tango-papers/people/finito.md",
    status: "published",
    priority: 25
  },

  // === DANCERS: Stage Pioneers ===
  {
    slug: "carlos-gavito",
    displayName: "Carlos Gavito",
    fullName: "Carlos Eduardo Gavito",
    type: "dancer",
    generation: "stage",
    born: "1942-04-27",
    died: "2005-07-01",
    nationality: "Argentine",
    tags: ["stage", "forever-tango", "milonguero", "teacher", "philosopher"],
    summary: "'The last milonguero' — Forever Tango star, minimalist master of the pause and embrace, philosopher-poet of tango.",
    paperPath: "/tango-papers/people/carlos-gavito.md",
    status: "published",
    priority: 6
  },
  {
    slug: "juan-carlos-copes",
    displayName: "Juan Carlos Copes",
    fullName: "Juan Carlos Copes",
    type: "dancer",
    generation: "stage",
    born: "1931-05-31",
    died: "2021-01-16",
    nationality: "Argentine",
    tags: ["stage", "tango-argentino-show", "choreographer", "teacher", "broadway"],
    summary: "Brought tango to Broadway (1985), Tony-nominated choreographer, created 'Copes method' with María Nieves.",
    paperPath: "/tango-papers/people/juan-carlos-copes.md",
    status: "published",
    priority: 7
  },
  {
    slug: "maria-nieves",
    displayName: "María Nieves",
    fullName: "María Nieves Rego",
    type: "dancer",
    generation: "stage",
    born: "1934-09-06",
    died: null,
    nationality: "Argentine",
    tags: ["stage", "tango-argentino-show", "living-legend", "broadway"],
    summary: "Living legend, half of tango's greatest partnership with Copes, star of 'Tango Argentino' (1985).",
    paperPath: "/tango-papers/people/maria-nieves.md",
    status: "published",
    priority: 8
  },
  {
    slug: "pablo-veron",
    displayName: "Pablo Verón",
    fullName: "Pablo Verón",
    type: "dancer",
    generation: "stage",
    born: "1971-10-17",
    died: null,
    nationality: "Argentine",
    tags: ["stage", "film", "tango-lesson", "choreographer", "guggenheim-fellow"],
    summary: "'Feet of God' (NYT) — starred in The Tango Lesson, Guggenheim Fellow, American Choreography Award, worked with Depp, Duvall, Dunst.",
    paperPath: "/tango-papers/people/pablo-veron.md",
    status: "published",
    priority: 15
  },
  {
    slug: "miguel-angel-zotto",
    displayName: "Miguel Ángel Zotto",
    fullName: "Miguel Ángel Zotto",
    type: "dancer",
    generation: "stage",
    born: "1958-08-07",
    died: null,
    nationality: "Argentine",
    tags: ["stage", "tango-x-2", "choreographer", "academia-nacional", "teacher"],
    summary: "Face of tango — one of three greatest dancers of the century, María Ruanova Award, National Tango Academy Academic, created Tango x 2 with Milena Plebs.",
    paperPath: "/tango-papers/people/miguel-angel-zotto.md",
    status: "published",
    priority: 16
  },
  {
    slug: "milena-plebs",
    displayName: "Milena Plebs",
    fullName: "Milena Plebs",
    type: "dancer",
    generation: "stage",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["stage", "tango-x-2", "journalist", "choreographer", "academia-nacional", "researcher"],
    summary: "Dancer who writes — Teatro San Martín trained, co-created Tango x 2, María Ruanova Award, El Tangauta columnist, Honorary Academic.",
    paperPath: "/tango-papers/people/milena-plebs.md",
    status: "published",
    priority: 17
  },

  // === DANCERS: Bridge Generation ===
  {
    slug: "graciela-gonzalez",
    displayName: "Graciela González",
    fullName: "Graciela González",
    type: "dancer",
    generation: "bridge",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["milonguera", "bridge", "teacher", "pedagogy-pioneer"],
    summary: "Bridge generation, 'Followers/Leaders Technique' pioneer (1994–95), trained Mora Godoy and Marcela Durán.",
    paperPath: "/tango-papers/people/graciela-gonzalez.md",
    status: "published",
    priority: 13
  },
  {
    slug: "susana-miller",
    displayName: "Susana Miller",
    fullName: "Susana Miller",
    type: "dancer",
    generation: "bridge",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["milonguera", "bridge", "encuentro-pioneer", "milonguero-style", "terminology-creator", "teacher"],
    summary: "Coined 'milonguero style' term (1990s), founded La Academia de Tango Milonguero and El Beso milonga, named by Clarín as one of four most important influences on contemporary tango.",
    paperPath: "/tango-papers/people/susana-miller.md",
    status: "published",
    priority: 14
  },

  // === MUSICIANS: Golden Age Orchestra Leaders ===
  {
    slug: "anibal-troilo",
    displayName: "Aníbal Troilo",
    fullName: "Aníbal Carmelo Troilo",
    type: "musician",
    generation: "golden-age",
    born: "1914-07-11",
    died: "1975-05-18",
    nationality: "Argentine",
    tags: ["orchestra-leader", "bandoneon", "composer", "pichuco", "golden-age"],
    summary: "'Pichuco' — Supreme Bandoneón of Buenos Aires, definitive Golden Age orchestra, July 11 is National Bandoneón Day.",
    paperPath: "/tango-papers/people/anibal-troilo.md",
    status: "published",
    priority: 9
  },
  {
    slug: "carlos-di-sarli",
    displayName: "Carlos Di Sarli",
    fullName: "Carlos Di Sarli",
    type: "musician",
    generation: "golden-age",
    born: "1903-01-07",
    died: "1960-01-12",
    nationality: "Argentine",
    tags: ["orchestra-leader", "piano", "composer", "golden-age", "elegant"],
    summary: "'El Señor del Tango' — elegant walking music, piano-driven sound, 'the style, I make it myself.'",
    paperPath: "/tango-papers/people/carlos-di-sarli.md",
    status: "published",
    priority: 10
  },
  {
    slug: "juan-darienzo",
    displayName: "Juan D'Arienzo",
    fullName: "Juan D'Arienzo",
    type: "musician",
    generation: "golden-age",
    born: "1900-12-14",
    died: "1976-01-14",
    nationality: "Argentine",
    tags: ["orchestra-leader", "violin", "golden-age", "rhythmic", "big-four"],
    summary: "'El Rey del Compás' — saved tango with 1935 rhythmic revolution, 'tango is rhythm, nerve, strength and character.'",
    paperPath: "/tango-papers/people/juan-darienzo.md",
    status: "published",
    priority: 11
  },
  {
    slug: "osvaldo-pugliese",
    displayName: "Osvaldo Pugliese",
    fullName: "Osvaldo Pedro Pugliese",
    type: "musician",
    generation: "golden-age",
    born: "1905-12-02",
    died: "1995-07-25",
    nationality: "Argentine",
    tags: ["orchestra-leader", "piano", "composer", "golden-age", "dramatic", "la-yumba", "big-four"],
    summary: "Communist, cooperative orchestra, imprisoned by every regime, red carnation symbol, composer of 'La Yumba.'",
    paperPath: "/tango-papers/people/osvaldo-pugliese.md",
    status: "published",
    priority: 12
  },

  // === SINGER ===
  {
    slug: "carlos-gardel",
    displayName: "Carlos Gardel",
    fullName: "Carlos Gardel",
    type: "singer",
    generation: "golden-age",
    born: "1890-12-11",
    died: "1935-06-24",
    nationality: "Argentine",
    tags: ["singer", "zorzal-criollo", "icon", "film", "tango-cancion", "composer"],
    summary: "El Zorzal Criollo — most famous tango singer ever, created tango-canción (1917), died at height of fame. 'Gardel sings better every day.'",
    paperPath: "/tango-papers/people/carlos-gardel.md",
    status: "published",
    priority: 18
  },

  // === COMPOSER ===
  {
    slug: "astor-piazzolla",
    displayName: "Astor Piazzolla",
    fullName: "Astor Pantaleón Piazzolla",
    type: "composer",
    generation: "post-golden",
    born: "1921-03-11",
    died: "1992-07-04",
    nationality: "Argentine",
    tags: ["composer", "bandoneon", "nuevo-tango-music", "revolutionary", "quintet"],
    summary: "Tango assassin/savior — revolutionized tango into nuevo tango, 750 compositions, Libertango, studied with Boulanger. 'I performed plastic surgery on it.'",
    paperPath: "/tango-papers/people/astor-piazzolla.md",
    status: "published",
    priority: 19
  },

  // === TEACHER/HISTORIAN ===
  {
    slug: "daniel-trenner",
    displayName: "Daniel Trenner",
    fullName: "Daniel Trenner",
    type: "teacher",
    generation: "bridge",
    born: null,
    died: null,
    nationality: "American",
    tags: ["teacher", "historian", "tango-archive", "filmmaker", "american-pioneer"],
    summary: "Johnny Appleseed of tango — filmed Golden Age milongueros, 80+ instructional videos, Bridge to the Tango tours, M.Ed. in Dance.",
    paperPath: "/tango-papers/people/daniel-trenner.md",
    status: "published",
    priority: 20
  },

  // === ORGANIZER ===
  {
    slug: "cachirulo",
    displayName: "Cachirulo",
    fullName: "Héctor Pellozo",
    type: "organizer",
    generation: "bridge",
    born: "1937-07-05",
    died: null,
    nationality: "Argentine",
    tags: ["organizer", "milonga", "tradition-keeper", "milonguero", "codes"],
    summary: "The rule enforcer — organizes Cachirulo milonga, enforces codes with red/yellow cards, featured in Milongueros documentary.",
    paperPath: "/tango-papers/people/cachirulo.md",
    status: "published",
    priority: 23
  },

  // === CONTEMPORARY FIGURES ===
  {
    slug: "ignacio-varchausky",
    displayName: "Ignacio Varchausky",
    fullName: "Ignacio Varchausky",
    type: "musician",
    generation: "contemporary",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["contrabass", "producer", "el-arranque", "orquesta-escuela", "latin-grammy", "preservation"],
    summary: "Most important preservation figure — El Arranque founder, Orquesta Escuela creator, Latin Grammy winner, TangoVia Buenos Aires.",
    paperPath: "/tango-papers/people/ignacio-varchausky.md",
    status: "published",
    priority: 26
  },
  {
    slug: "dimitris-bronowski",
    displayName: "Dimitris Bronowski",
    fullName: "Dimitris Bronowski",
    type: "author",
    generation: "contemporary",
    born: null,
    died: null,
    nationality: null,
    tags: ["author", "blogger", "podcast", "tangofulness", "tango-philosophy"],
    summary: "Author of Tangofulness (12 languages), The Curious Tanguero creator, mission to help 1M experience tango.",
    paperPath: "/tango-papers/people/dimitris-bronowski.md",
    status: "published",
    priority: 27
  },
  {
    slug: "steve-darmo",
    displayName: "Steve Darmo",
    fullName: "Steve Darmo",
    type: "author",
    generation: "contemporary",
    born: null,
    died: null,
    nationality: null,
    tags: ["author", "musicality", "tango-endings", "research"],
    summary: "Author of Tango Endings — studied 1,700 tangos, classified 9 ending types, definitive musicality work.",
    paperPath: "/tango-papers/people/steve-darmo.md",
    status: "published",
    priority: 28
  },
  {
    slug: "guido-iacopetti",
    displayName: "Guido Iacopetti",
    fullName: "Guido Iacopetti",
    type: "musician",
    generation: "contemporary",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["composer", "guitarist", "arranger", "producer", "sexteto-fantasma", "latin-grammy-nominee"],
    summary: "Sexteto Fantasma founder, 2025 Latin Grammy nominee, new tango sound blending jazz/rock/Latin rhythms.",
    paperPath: "/tango-papers/people/guido-iacopetti.md",
    status: "published",
    priority: 29
  },
  {
    slug: "roberto-alvarez",
    displayName: "Roberto Álvarez",
    fullName: "Roberto Álvarez",
    type: "musician",
    generation: "contemporary",
    born: "1940",
    died: "2023-03-05",
    nationality: "Argentine",
    tags: ["bandoneon", "orchestra-leader", "color-tango", "pugliese-disciple", "arranger", "composer"],
    summary: "Pugliese's lead bandoneonist (1984–1995), Color Tango founder (1989), carried Pugliese tradition for 30+ years.",
    paperPath: "/tango-papers/people/roberto-alvarez.md",
    status: "published",
    priority: 30
  }
];

// Helper functions
export const getPeopleByType = (type) => peopleData.filter(p => p.type === type);
export const getPeopleByGeneration = (gen) => peopleData.filter(p => p.generation === gen);
export const getPeopleByTag = (tag) => peopleData.filter(p => p.tags.includes(tag));
export const getPublishedPeople = () => peopleData.filter(p => p.status === 'published');
export const getPersonBySlug = (slug) => peopleData.find(p => p.slug === slug);

// Type/generation labels for display
export const typeLabels = {
  dancer: 'Dancer',
  musician: 'Musician',
  singer: 'Singer',
  composer: 'Composer',
  teacher: 'Teacher',
  organizer: 'Organizer',
  author: 'Author'
};

export const generationLabels = {
  guardian: 'Guardian Generation',
  bridge: 'Bridge Generation',
  stage: 'Stage Pioneers',
  nuevo: 'Nuevo Innovators',
  'golden-age': 'Golden Age',
  'post-golden': 'Post-Golden Age',
  contemporary: 'Contemporary'
};

export default peopleData;
