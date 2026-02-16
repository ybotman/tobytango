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
    born: "1961",
    died: null,
    nationality: "Argentine",
    tags: ["nuevo", "investigacion", "cosmotango", "analytical"],
    summary: "Co-founder of tango nuevo, analytical framework pioneer, Cosmotango organizer.",
    paperPath: "/tango-papers/people/gustavo-naveira.md",
    status: "pending",
    priority: 2
  },
  {
    slug: "fabian-salas",
    displayName: "Fabián Salas",
    fullName: "Fabián Salas",
    type: "dancer",
    generation: "nuevo",
    born: "1964",
    died: null,
    nationality: "Argentine",
    tags: ["nuevo", "investigacion", "cita", "teacher"],
    summary: "Co-founder of tango nuevo, CITA organizer, investigation group pioneer.",
    paperPath: "/tango-papers/people/fabian-salas.md",
    status: "pending",
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
    tags: ["nuevo", "performer"],
    summary: "Chicho's partner, nuevo performer and teacher.",
    paperPath: "/tango-papers/people/juana-sepulveda.md",
    status: "pending",
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
    tags: ["nuevo", "boulder", "teacher"],
    summary: "Naveira's partner, nuevo pioneer, Boulder-based teacher.",
    paperPath: "/tango-papers/people/giselle-anne.md",
    status: "pending",
    priority: 22
  },

  // === DANCERS: Guardian Generation ===
  {
    slug: "tete-rusconi",
    displayName: "Tete Rusconi",
    fullName: "Pedro 'Tete' Rusconi",
    type: "dancer",
    generation: "guardian",
    born: "1930",
    died: "2010",
    nationality: "Argentine",
    tags: ["milonguero", "guardian", "villa-urquiza"],
    summary: "Guardian generation master, milonguero style icon.",
    paperPath: "/tango-papers/people/tete-rusconi.md",
    status: "pending",
    priority: 4
  },
  {
    slug: "el-turco-jose",
    displayName: "El Turco José",
    fullName: "José Brahemcha",
    type: "dancer",
    generation: "guardian",
    born: "1920",
    died: "2010",
    nationality: "Argentine",
    tags: ["milonguero", "guardian", "villa-urquiza"],
    summary: "Guardian generation, Villa Urquiza style co-creator.",
    paperPath: "/tango-papers/people/el-turco-jose.md",
    status: "pending",
    priority: 5
  },
  {
    slug: "pepito-avellaneda",
    displayName: "Pepito Avellaneda",
    fullName: "José Giambuzzi",
    type: "dancer",
    generation: "guardian",
    born: "1912",
    died: "1995",
    nationality: "Argentine",
    tags: ["milonguero", "guardian", "avellaneda"],
    summary: "Guardian generation milonguero, neighborhood legend.",
    paperPath: "/tango-papers/people/pepito-avellaneda.md",
    status: "pending",
    priority: 24
  },
  {
    slug: "finito",
    displayName: "Finito",
    fullName: "José Giambuzzi",
    type: "dancer",
    generation: "guardian",
    born: "1916",
    died: "1996",
    nationality: "Argentine",
    tags: ["canyengue", "guardian"],
    summary: "Guardian generation, canyengue master.",
    paperPath: "/tango-papers/people/finito.md",
    status: "pending",
    priority: 25
  },

  // === DANCERS: Stage Pioneers ===
  {
    slug: "carlos-gavito",
    displayName: "Carlos Gavito",
    fullName: "Carlos Gavito",
    type: "dancer",
    generation: "stage",
    born: "1942",
    died: "2005",
    nationality: "Argentine",
    tags: ["stage", "tango-argentino-show", "dramatic"],
    summary: "Stage pioneer, Tango Argentino show, dramatic style master.",
    paperPath: "/tango-papers/people/carlos-gavito.md",
    status: "pending",
    priority: 6
  },
  {
    slug: "juan-carlos-copes",
    displayName: "Juan Carlos Copes",
    fullName: "Juan Carlos Copes",
    type: "dancer",
    generation: "stage",
    born: "1931",
    died: "2021",
    nationality: "Argentine",
    tags: ["stage", "tango-argentino-show"],
    summary: "Stage pioneer, Tango Argentino show, partnered María Nieves.",
    paperPath: "/tango-papers/people/juan-carlos-copes.md",
    status: "pending",
    priority: 7
  },
  {
    slug: "maria-nieves",
    displayName: "María Nieves",
    fullName: "María Nieves Rego",
    type: "dancer",
    generation: "stage",
    born: "1938",
    died: null,
    nationality: "Argentine",
    tags: ["stage", "tango-argentino-show"],
    summary: "Stage pioneer, Tango Argentino show, partnered Juan Carlos Copes.",
    paperPath: "/tango-papers/people/maria-nieves.md",
    status: "pending",
    priority: 8
  },
  {
    slug: "pablo-veron",
    displayName: "Pablo Verón",
    fullName: "Pablo Verón",
    type: "dancer",
    generation: "stage",
    born: "1962",
    died: null,
    nationality: "Argentine",
    tags: ["stage", "film", "tango-lesson"],
    summary: "Stage pioneer, starred in The Tango Lesson with Sally Potter.",
    paperPath: "/tango-papers/people/pablo-veron.md",
    status: "pending",
    priority: 15
  },
  {
    slug: "miguel-angel-zotto",
    displayName: "Miguel Ángel Zotto",
    fullName: "Miguel Ángel Zotto",
    type: "dancer",
    generation: "stage",
    born: "1958",
    died: null,
    nationality: "Argentine",
    tags: ["stage", "tango-x-2"],
    summary: "Stage pioneer, Tango x 2, partnered Milena Plebs.",
    paperPath: "/tango-papers/people/miguel-angel-zotto.md",
    status: "pending",
    priority: 16
  },
  {
    slug: "milena-plebs",
    displayName: "Milena Plebs",
    fullName: "Milena Plebs",
    type: "dancer",
    generation: "stage",
    born: "1962",
    died: null,
    nationality: "Argentine",
    tags: ["stage", "tango-x-2", "journalist"],
    summary: "Stage pioneer, Tango x 2, El Tangauta interviewer.",
    paperPath: "/tango-papers/people/milena-plebs.md",
    status: "pending",
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
    tags: ["milonguera", "bridge", "teacher"],
    summary: "Bridge generation, milonguera, influential teacher.",
    paperPath: "/tango-papers/people/graciela-gonzalez.md",
    status: "pending",
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
    tags: ["milonguero", "bridge", "encuentro", "usa"],
    summary: "Bridge generation, brought milonguero style to US, encuentro pioneer.",
    paperPath: "/tango-papers/people/susana-miller.md",
    status: "pending",
    priority: 14
  },

  // === MUSICIANS: Golden Age Orchestra Leaders ===
  {
    slug: "anibal-troilo",
    displayName: "Aníbal Troilo",
    fullName: "Aníbal Carmelo Troilo",
    type: "musician",
    generation: "golden-age",
    born: "1914",
    died: "1975",
    nationality: "Argentine",
    tags: ["orchestra-leader", "bandoneon", "pichuco", "golden-age"],
    summary: "Pichuco, major Golden Age orchestra leader, legendary bandoneonist.",
    paperPath: "/tango-papers/people/anibal-troilo.md",
    status: "pending",
    priority: 9
  },
  {
    slug: "carlos-di-sarli",
    displayName: "Carlos Di Sarli",
    fullName: "Carlos Di Sarli",
    type: "musician",
    generation: "golden-age",
    born: "1903",
    died: "1960",
    nationality: "Argentine",
    tags: ["orchestra-leader", "piano", "golden-age", "elegant"],
    summary: "El Señor del Tango, Golden Age orchestra leader, elegant style.",
    paperPath: "/tango-papers/people/carlos-di-sarli.md",
    status: "pending",
    priority: 10
  },
  {
    slug: "juan-darienzo",
    displayName: "Juan D'Arienzo",
    fullName: "Juan D'Arienzo",
    type: "musician",
    generation: "golden-age",
    born: "1900",
    died: "1976",
    nationality: "Argentine",
    tags: ["orchestra-leader", "violin", "golden-age", "rhythmic"],
    summary: "El Rey del Compás, Golden Age orchestra leader, rhythmic revolution 1935.",
    paperPath: "/tango-papers/people/juan-darienzo.md",
    status: "pending",
    priority: 11
  },
  {
    slug: "osvaldo-pugliese",
    displayName: "Osvaldo Pugliese",
    fullName: "Osvaldo Pugliese",
    type: "musician",
    generation: "golden-age",
    born: "1905",
    died: "1995",
    nationality: "Argentine",
    tags: ["orchestra-leader", "piano", "golden-age", "dramatic", "la-yumba"],
    summary: "Golden Age orchestra leader, dramatic style, composer of La Yumba.",
    paperPath: "/tango-papers/people/osvaldo-pugliese.md",
    status: "pending",
    priority: 12
  },

  // === SINGER ===
  {
    slug: "carlos-gardel",
    displayName: "Carlos Gardel",
    fullName: "Carlos Gardel",
    type: "singer",
    generation: "golden-age",
    born: "1890",
    died: "1935",
    nationality: "Argentine",
    tags: ["singer", "zorzal-criollo", "icon", "film"],
    summary: "El Zorzal Criollo, most famous tango singer ever.",
    paperPath: "/tango-papers/people/carlos-gardel.md",
    status: "pending",
    priority: 18
  },

  // === COMPOSER ===
  {
    slug: "astor-piazzolla",
    displayName: "Astor Piazzolla",
    fullName: "Astor Pantaleón Piazzolla",
    type: "composer",
    generation: "post-golden",
    born: "1921",
    died: "1992",
    nationality: "Argentine",
    tags: ["composer", "bandoneon", "nuevo-tango-music", "revolutionary"],
    summary: "Nuevo tango (music) revolutionary, legendary bandoneonist and composer.",
    paperPath: "/tango-papers/people/astor-piazzolla.md",
    status: "pending",
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
    tags: ["teacher", "historian", "tango-archive", "filmmaker"],
    summary: "American pioneer, Tango Archive, filmed milongueros 1980s-90s.",
    paperPath: "/tango-papers/people/daniel-trenner.md",
    status: "pending",
    priority: 20
  },

  // === ORGANIZER ===
  {
    slug: "cachirulo",
    displayName: "Cachirulo",
    fullName: "Carlos Anzuate",
    type: "organizer",
    generation: "bridge",
    born: null,
    died: null,
    nationality: "Argentine",
    tags: ["organizer", "milonga", "tradition"],
    summary: "Legendary milonga organizer, tradition keeper.",
    paperPath: "/tango-papers/people/cachirulo.md",
    status: "pending",
    priority: 23
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
  organizer: 'Organizer'
};

export const generationLabels = {
  guardian: 'Guardian Generation',
  bridge: 'Bridge Generation',
  stage: 'Stage Pioneers',
  nuevo: 'Nuevo Innovators',
  'golden-age': 'Golden Age',
  'post-golden': 'Post-Golden Age'
};

export default peopleData;
