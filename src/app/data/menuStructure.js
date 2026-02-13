import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ScienceIcon from '@mui/icons-material/Science';

/**
 * Menu structure for navigation
 * Each section has a title, icon, and potential nested menus
 */
const menuStructure = [
  {
    title: 'TangoCollab',
    path: '/tango-collab',
    icon: null
  },
  {
    title: 'Cool Vids',
    path: '/cool-vids',
    icon: null
  },
  {
    id: 'tangolab',
    title: 'TangoLab',
    path: '/tangolab',
    icon: ScienceIcon,
    items: [
      { title: 'TangoLab Home', path: '/tangolab', isSecondary: true },
      {
        title: 'The Rhythms',
        isSecondary: true,
        submenus: [
          {
            title: 'Tango',
            isSecondary: true,
            submenus: [
              { title: 'Single Time', path: '/rhythms/tango/SingleTime', isSecondary: true },
              { title: 'Double Time', path: '/rhythms/tango/DoubleTime', isSecondary: true },
              { title: 'Half/Zero Time', path: '/rhythms/tango/HalfZeroTime', isSecondary: true },
              { title: 'Advanced Time', path: '/rhythms/tango/Advanced', isSecondary: true },
              { title: 'Analysis', path: '/rhythms/tango/summary', isSecondary: true }
            ]
          },
          { title: 'Vals', path: '/rhythms/vals', isSecondary: true },
          { title: 'Milonga', path: '/rhythms/milonga', isSecondary: true },
          { title: 'Interactive Grid', path: '/rhythms/canned', isSecondary: true, highlight: true }
        ]
      },
      {
        title: 'The Terminology',
        isSecondary: true,
        submenus: [
          { title: 'Musical', path: '/terms-music', isSecondary: true },
          { title: 'Dancing', path: '/terms-dance', isSecondary: true },
          { title: 'Argentine Tango', path: '/terms-argentine-tango', isSecondary: true }
        ]
      },
      {
        title: 'The Artists',
        isSecondary: true,
        submenus: [
          { title: 'View All Artists', path: '/artists', isSecondary: true },
          { title: 'Timelines', path: '/artists/timelines', isSecondary: true },
          { title: 'Umbrella Technique', path: '/artists/umbrella-technique', isSecondary: true, highlight: true }
        ]
      },
      {
        title: 'The Songs',
        isSecondary: true,
        submenus: [
          { title: 'All Songs', path: '/songs', isSecondary: true }
        ]
      },
      {
        title: 'The Dancers',
        isSecondary: true,
        submenus: [
          { title: 'Influential Dancers', path: '/dancers', isSecondary: true },
          {
            title: 'Dance Stance',
            isSecondary: true,
            submenus: [
              { title: 'Chicho Frumboli', path: '/dance-stance/chicho', isSecondary: true },
              { title: 'Gustavo Naveira', path: '/dance-stance/gustavo', isSecondary: true },
              { title: 'Carlitos Espinoza', path: '/dance-stance/carlitos', isSecondary: true },
              { title: 'Hernan Brizuela', path: '/dance-stance/hernan', isSecondary: true }
            ]
          }
        ]
      },
      {
        title: 'Tango History',
        isSecondary: true,
        highlight: true,
        submenus: [
          { title: 'Timeline Overview', path: '/tango-history', isSecondary: true },
          { title: 'Tango Argentina', path: '/tango-history/argentina', isSecondary: true },
          { title: 'Dancers & Couples', path: '/tango-history/dancers', isSecondary: true, highlight: true },
          { title: 'Tango Europe', path: '/tango-history/europe', isSecondary: true },
          { title: 'Tango USA', path: '/tango-history/usa', isSecondary: true },
          { title: 'Orchestras', path: '/tango-history/orchestras', isSecondary: true },
          { title: 'Glossary', path: '/tango-history/glossary', isSecondary: true }
        ]
      },
      {
        title: 'The Best Practices',
        isSecondary: true,
        submenus: [
          { title: 'Tango is', path: '/tango-is', isSecondary: true },
          { title: 'Tango is NOT', path: '/tango-is-not', isSecondary: true },
          { title: 'Milongas', path: '/milongas', isSecondary: true },
          { title: 'Practicas', path: '/practicas', isSecondary: true }
        ]
      },
      {
        title: 'The Difficulties',
        isSecondary: true,
        submenus: [
          { title: 'No Drums', path: '/difficulties/no-drums', isSecondary: true },
          { title: 'No Standard Patterns', path: '/difficulties/no-patterns', isSecondary: true },
          { title: 'Improvisational', path: '/difficulties/improvisational', isSecondary: true },
          { title: 'No One in Charge', path: '/difficulties/no-one-in-charge', isSecondary: true }
        ]
      },
      {
        title: 'The Hurdles',
        isSecondary: true,
        submenus: [
          { title: 'Partnership of Lead and Follow (coming soon)', isSecondary: true },
          { title: 'Tortion vs Direction (coming soon)', isSecondary: true },
          { title: 'More coming soon...', isSecondary: true }
        ]
      }
    ]
  },
  {
    title: 'About',
    path: '/about',
    icon: null
  }
];

export default menuStructure;
