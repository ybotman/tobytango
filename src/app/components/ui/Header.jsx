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
import PeopleIcon from '@mui/icons-material/People';
import ScienceIcon from '@mui/icons-material/Science';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Link from 'next/link';

// Define a pulsing animation
const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  
  const theme = useTheme();
  
  // Secondary menu style
  const secondaryStyle = { fontStyle: 'italic', color: theme.palette.primary.light };

  const toggleDrawer = (state) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(state);
  };

  const handleMenuToggle = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  // This function is specific for the rhythm items to make sure they open properly
  const handleLinkClick = (path) => {
    // This will execute the navigation without closing the drawer immediately
    // so the user can see submenu items
    window.location.href = path;
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
              sx={{ color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }}}
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
                  sx={{ color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }}}
                >
                  <HomeIcon sx={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Toolbar />
      
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <List sx={{ width: 280 }} onClick={(e) => e.stopPropagation()}>
          <ListItem onClick={toggleDrawer(false)}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          
          {/* LAB SECTION */}
          <ListItemButton onClick={() => handleMenuToggle('lab')}>
            <ListItemIcon><ScienceIcon /></ListItemIcon>
            <ListItemText primary="Lab" />
            {openMenus.lab ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={!!openMenus.lab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/lab-mondays" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Lab Mondays" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/lab-workshop" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Lab Workshop" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/journey-practica" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Journey Practica" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          
          {/* THE RHYTHMS SECTION */}
          <ListItemButton onClick={() => handleMenuToggle('rhythms')}>
            <ListItemIcon><MusicNoteIcon /></ListItemIcon>
            <ListItemText primary="The Rhythms" />
            {openMenus.rhythms ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={!!openMenus.rhythms} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* TANGO */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuToggle('tango')}>
                <ListItemText primary="Tango" primaryTypographyProps={secondaryStyle} />
                {openMenus.tango ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              
              <Collapse in={!!openMenus.tango} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* Simple Time */}
                  <ListItemButton sx={{ pl: 6 }} onClick={() => handleMenuToggle('simpleTime')}>
                    <ListItemText primary="Simple Time" primaryTypographyProps={secondaryStyle} />
                    {openMenus.simpleTime ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  
                  <Collapse in={!!openMenus.simpleTime} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 8 }} onClick={() => handleLinkClick('/rhythms/tango/1-3-')}>
                        <ListItemText primary="1-3-" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  
                  {/* Double Time */}
                  <ListItemButton sx={{ pl: 6 }} onClick={() => handleMenuToggle('doubleTime')}>
                    <ListItemText primary="Double Time" primaryTypographyProps={secondaryStyle} />
                    {openMenus.doubleTime ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  
                  <Collapse in={!!openMenus.doubleTime} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 8 }} onClick={() => handleLinkClick('/rhythms/tango/123-')}>
                        <ListItemText primary="123-" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 8 }} onClick={() => handleLinkClick('/rhythms/tango/1-34')}>
                        <ListItemText primary="1-34" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 8 }} onClick={() => handleLinkClick('/rhythms/tango/1234')}>
                        <ListItemText primary="1234" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  
                  {/* Half Time */}
                  <ListItemButton sx={{ pl: 6 }} onClick={() => handleMenuToggle('halfTime')}>
                    <ListItemText primary="Half Time" primaryTypographyProps={secondaryStyle} />
                    {openMenus.halfTime ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  
                  <Collapse in={!!openMenus.halfTime} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 8 }} onClick={() => handleLinkClick('/rhythms/tango/1---')}>
                        <ListItemText primary="1---" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 8 }} onClick={() => handleLinkClick('/rhythms/tango/----')}>
                        <ListItemText primary="----" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  
                  {/* Advanced */}
                  <ListItemButton sx={{ pl: 6 }} onClick={() => handleMenuToggle('advanced')}>
                    <ListItemText primary="Advanced" primaryTypographyProps={secondaryStyle} />
                    {openMenus.advanced ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  
                  <Collapse in={!!openMenus.advanced} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 8 }}>
                        <ListItemText primary="-2-4 (coming soon)" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 8 }}>
                        <ListItemText primary="Syncopa (coming soon)" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 8 }}>
                        <ListItemText primary="332 (coming soon)" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  
                  {/* Summary */}
                  <ListItemButton sx={{ pl: 6 }} onClick={() => handleLinkClick('/rhythms/tango/summary')}>
                    <ListItemText primary="Summary" primaryTypographyProps={secondaryStyle} />
                  </ListItemButton>
                </List>
              </Collapse>
              
              {/* VALS */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuToggle('vals')}>
                <ListItemText primary="Vals" primaryTypographyProps={secondaryStyle} />
                {openMenus.vals ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              
              <Collapse in={!!openMenus.vals} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 6 }}>
                    <ListItemText primary="Rhythms (coming soon)" primaryTypographyProps={secondaryStyle} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 6 }}>
                    <ListItemText primary="Summary (coming soon)" primaryTypographyProps={secondaryStyle} />
                  </ListItemButton>
                </List>
              </Collapse>
              
              {/* MILONGA */}
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuToggle('milonga')}>
                <ListItemText primary="Milonga" primaryTypographyProps={secondaryStyle} />
                {openMenus.milonga ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              
              <Collapse in={!!openMenus.milonga} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 6 }}>
                    <ListItemText primary="Rhythms (coming soon)" primaryTypographyProps={secondaryStyle} />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 6 }}>
                    <ListItemText primary="Summary (coming soon)" primaryTypographyProps={secondaryStyle} />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Collapse>
          
          {/* TERMINOLOGY SECTION */}
          <ListItemButton onClick={() => handleMenuToggle('terminology')}>
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary="Terminology" />
            {openMenus.terminology ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={!!openMenus.terminology} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/terms-music" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Musical" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/terms-dance" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Dancing" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/terms-argentine-tango" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Argentine Tango" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          
          {/* ARTISTS SECTION */}
          <ListItemButton onClick={() => handleMenuToggle('artists')}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Tango Artists" />
            {openMenus.artists ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={!!openMenus.artists} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/artists" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="View All Artists" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
            </List>
          </Collapse>
          
          {/* THE DANCERS SECTION */}
          <ListItemButton onClick={() => handleMenuToggle('dancers')}>
            <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
            <ListItemText primary="The Dancers" />
            {openMenus.dancers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={!!openMenus.dancers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/dancers" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Famous Dancers" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText primary="Dance Styles (coming soon)" primaryTypographyProps={secondaryStyle} />
              </ListItem>
              <ListItem sx={{ pl: 4 }}>
                <ListItemText primary="Tango History (coming soon)" primaryTypographyProps={secondaryStyle} />
              </ListItem>
            </List>
          </Collapse>
          
          {/* BEST PRACTICES SECTION */}
          <ListItemButton onClick={() => handleMenuToggle('bestPractices')}>
            <ListItemIcon><CheckCircleOutlineIcon /></ListItemIcon>
            <ListItemText primary="Best Practices" />
            {openMenus.bestPractices ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={!!openMenus.bestPractices} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/tango-is" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Tango is" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/tango-is-not" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Tango is NOT" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/milongas" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Milongas" primaryTypographyProps={secondaryStyle} />
                </Link>
              </ListItem>
              <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
                <Link href="/practicas" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary="Practicas" primaryTypographyProps={secondaryStyle} />
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
      </Drawer>
    </>
  );
}

Header.propTypes = {};