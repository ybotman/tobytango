import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import ScienceIcon from '@mui/icons-material/Science';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

/**
 * Menu structure for navigation
 * Each section has a title, icon, and potential nested menus
 */
const menuStructure = [
  {
    id: 'lab',
    title: 'The Lab',
    icon: ScienceIcon,
    items: [
      { title: 'Lab Mondays', path: '/lab-mondays', isSecondary: true },
      { title: 'Lab Workshop', path: '/lab-workshop', isSecondary: true },
      { title: 'Journey Practica', path: '/journey-practica', isSecondary: true }
    ]
  },
  {
    id: 'rhythms',
    title: 'The Rhythms',
    icon: MusicNoteIcon,
    items: [
      { 
        title: 'Tango', 
        isSecondary: true,
        submenus: [
          {
            id: 'simpleTime',
            title: 'Simple Time',
            isSecondary: true,
            items: [
              { title: '1-3-', path: '/rhythms/tango/1-3-' }
            ]
          },
          {
            id: 'doubleTime',
            title: 'Double Time',
            isSecondary: true,
            items: [
              { title: '123-', path: '/rhythms/tango/123-' },
              { title: '1-34', path: '/rhythms/tango/1-34' },
              { title: '1234', path: '/rhythms/tango/1234' }
            ]
          },
          {
            id: 'halfTime',
            title: 'Half/Zero Time',
            isSecondary: true,
            items: [
              { title: '1---', path: '/rhythms/tango/1---' },
              { title: '----', path: '/rhythms/tango/----' }
            ]
          },
          {
            id: 'advanced',
            title: 'Advanced',
            isSecondary: true,
            items: [
              { title: 'OffBeat -2-4 (coming soon)' },
              { title: 'Syncopa', path: '/rhythms/tango/Syncopa' },
              { title: '332 (coming soon)' }
            ]
          },
          { title: 'Summary', path: '/rhythms/tango/summary', isSecondary: true }
        ]
      },
      { 
        title: 'Vals', 
        isSecondary: true,
        submenus: [
          { title: 'Rhythms (coming soon)', isSecondary: true },
          { title: 'Summary (coming soon)', isSecondary: true }
        ]
      },
      { 
        title: 'Milonga', 
        isSecondary: true,
        submenus: [
          { title: 'Rhythms (coming soon)', isSecondary: true },
          { title: 'Summary (coming soon)', isSecondary: true }
        ]
      }
    ]
  },
  {
    id: 'terminology',
    title: 'The Terminology',
    icon: SchoolIcon,
    items: [
      { title: 'Musical', path: '/terms-music', isSecondary: true },
      { title: 'Dancing', path: '/terms-dance', isSecondary: true },
      { title: 'Argentine Tango', path: '/terms-argentine-tango', isSecondary: true }
    ]
  },
  {
    id: 'artists',
    title: 'The Artists',
    icon: PeopleIcon,
    items: [
      { title: 'View All Artists', path: '/artists', isSecondary: true },
      { title: 'Timelines', path: '/artists/timelines', isSecondary: true }
    ]
  },
  {
    id: 'songs',
    title: 'The Songs',
    icon: MusicNoteIcon,
    items: [
      { title: 'Coming soon', isSecondary: true }
    ]
  },
  {
    id: 'dancers',
    title: 'The Dancers',
    icon: DirectionsRunIcon,
    items: [
      { title: 'Famous Dancers', path: '/dancers', isSecondary: true },
      { title: 'Fun Miscellaneous', path: '/favorite-videos', isSecondary: true, highlight: true },
      { 
        title: 'Dance Stance', 
        isSecondary: true,
        submenus: [
          { title: 'Chicho Frumboli', path: '/dance-stance/chicho', isSecondary: true },
          { title: 'Gustavo Naveira', path: '/dance-stance/gustavo', isSecondary: true },
          { title: 'Carlitos Espinoza', path: '/dance-stance/carlitos', isSecondary: true },
          { title: 'Hernan Brizuela', path: '/dance-stance/hernan', isSecondary: true }
        ]
      },
      { title: 'Tango History (coming soon)', isSecondary: true }
    ]
  },
  {
    id: 'bestPractices',
    title: 'The Best Practices',
    icon: CheckCircleOutlineIcon,
    items: [
      { title: 'Tango is', path: '/tango-is', isSecondary: true },
      { title: 'Tango is NOT', path: '/tango-is-not', isSecondary: true },
      { title: 'Milongas', path: '/milongas', isSecondary: true },
      { title: 'Practicas', path: '/practicas', isSecondary: true }
    ]
  },
  {
    id: 'difficulties',
    title: 'The Difficulties',
    icon: CheckCircleOutlineIcon,
    items: [
      { title: 'No Drums', path: '/difficulties/no-drums', isSecondary: true },
      { title: 'No Standard Patterns', path: '/difficulties/no-patterns', isSecondary: true },
      { title: 'Improvisational', path: '/difficulties/improvisational', isSecondary: true },
      { title: 'No One in Charge', path: '/difficulties/no-one-in-charge', isSecondary: true }
    ]
  },
  {
    id: 'hurdles',
    title: 'The Hurdles',
    icon: CheckCircleOutlineIcon,
    items: [
      { title: 'Partnership of Lead and Follow (coming soon)', isSecondary: true },
      { title: 'Tortion vs Direction (coming soon)', isSecondary: true },
      { title: 'More coming soon...', isSecondary: true }
    ]
  },
  {
    title: 'About',
    path: '/about',
    icon: null
  }
];

export default menuStructure;