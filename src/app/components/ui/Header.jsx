"use client";

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Collapse,
  ListItemIcon,
  ListItemButton,
  Box,
  useTheme,
  Typography,
  keyframes
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

// Define a pulsing animation
const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    dances: false,
    tango: false,
    vals: false,
    milonga: false,
    terminology: false,
    bestPractices: false
  });
  
  const theme = useTheme();

  const toggleDrawer = (state) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(state);
  };

  const handleMenuToggle = (menu) => {
    setOpenMenus({
      ...openMenus,
      [menu]: !openMenus[menu]
    });
  };

  const handleSubMenuToggle = (menu, submenu) => {
    if (!openMenus[`${menu}_${submenu}`]) {
      setOpenMenus({
        ...openMenus,
        [`${menu}_${submenu}`]: true
      });
    } else {
      setOpenMenus({
        ...openMenus,
        [`${menu}_${submenu}`]: false
      });
    }
  };

  const isSubMenuOpen = (menu, submenu) => {
    return Boolean(openMenus[`${menu}_${submenu}`]);
  };

  const list = () => (
    <List sx={{ width: 280 }} onClick={(e) => e.stopPropagation()}>
      <ListItem onClick={toggleDrawer(false)}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <ListItemText primary="Home" />
        </Link>
      </ListItem>
      
      {/* THE DANCES SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('dances')}>
        <ListItemIcon>
          <MusicNoteIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="The Dances" />
        {openMenus.dances ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.dances} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* TANGO */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubMenuToggle('dances', 'tango')}>
            <ListItemText primary="Tango" />
            {isSubMenuOpen('dances', 'tango') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={isSubMenuOpen('dances', 'tango')} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }} onClick={() => handleSubMenuToggle('dances', 'tango_rhythms')}>
                <ListItemText primary="Rhythms" />
                {isSubMenuOpen('dances', 'tango_rhythms') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              
              <Collapse in={isSubMenuOpen('dances', 'tango_rhythms')} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {['1-3-', '1---', '----', '1-34', '123-', '1234'].map((rhythm) => (
                    <ListItem key={rhythm} sx={{ pl: 8 }} onClick={toggleDrawer(false)}>
                      <Link href={`/rhythms/tango/${rhythm}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                        <ListItemText primary={rhythm} />
                      </Link>
                    </ListItem>
                  ))}
                  <ListItem sx={{ pl: 8 }}>
                    <ListItemText primary="Advanced (coming soon)" />
                  </ListItem>
                </List>
              </Collapse>
              
              <ListItem sx={{ pl: 6 }} onClick={toggleDrawer(false)}>
                <Link href="/rhythms/tango/summary" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Summary" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          
          {/* VALS */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubMenuToggle('dances', 'vals')}>
            <ListItemText primary="Vals" />
            {isSubMenuOpen('dances', 'vals') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={isSubMenuOpen('dances', 'vals')} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 6 }}>
                <ListItemText primary="Rhythms (coming soon)" />
              </ListItem>
              
              <ListItem sx={{ pl: 6 }}>
                <ListItemText primary="Summary (coming soon)" />
              </ListItem>
            </List>
          </Collapse>
          
          {/* MILONGA */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubMenuToggle('dances', 'milonga')}>
            <ListItemText primary="Milonga" />
            {isSubMenuOpen('dances', 'milonga') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={isSubMenuOpen('dances', 'milonga')} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 6 }}>
                <ListItemText primary="Rhythms (coming soon)" />
              </ListItem>
              
              <ListItem sx={{ pl: 6 }}>
                <ListItemText primary="Summary (coming soon)" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Collapse>
      
      {/* TERMINOLOGY SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('terminology')}>
        <ListItemIcon>
          <SchoolIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="Terminology" />
        {openMenus.terminology ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.terminology} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/terms-music" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Musical" />
            </Link>
          </ListItem>
          
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/terms-dance" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Dancing" />
            </Link>
          </ListItem>
          
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/terms-argentine-tango" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Argentine Tango" />
            </Link>
          </ListItem>
        </List>
      </Collapse>
      
      {/* BEST PRACTICES SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('bestPractices')}>
        <ListItemIcon>
          <CheckCircleOutlineIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="Best Practices" />
        {openMenus.bestPractices ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.bestPractices} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/tango-is" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Tango is" />
            </Link>
          </ListItem>
          
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/tango-is-not" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Tango is NOT" />
            </Link>
          </ListItem>
          
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/milongas" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Milongas" />
            </Link>
          </ListItem>
          
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/practicas" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Practicas" />
            </Link>
          </ListItem>
        </List>
      </Collapse>
      
      <ListItem onClick={toggleDrawer(false)}>
        <Link href="/about" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <ListItemText primary="About" />
        </Link>
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: '64px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ArrowBackIcon 
              sx={{ 
                color: '#ffffff',
                animation: open ? 'none' : `${pulse} 1.5s infinite ease-in-out`,
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                mr: 1
              }} 
            />
            
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(!open)}
              sx={{ 
                color: '#ffffff', 
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              <MenuIcon sx={{ fontSize: '1.75rem', color: '#ffffff' }} />
            </IconButton>
            
            <Typography 
              variant="button" 
              sx={{ 
                ml: 1, 
                color: '#ffffff', 
                fontWeight: 'bold',
                animation: `${pulse} 1.5s infinite ease-in-out`,
                display: { xs: 'block', sm: 'block' }
              }}
            >
              MENU
            </Typography>
            
            {/* Home button on the right side of the AppBar */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/" passHref>
                <IconButton
                  aria-label="home"
                  sx={{ 
                    color: '#ffffff', 
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                >
                  <HomeIcon sx={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Add a toolbar placeholder to prevent content from hiding under the AppBar */}
      <Toolbar />
      
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}

Header.propTypes = {};