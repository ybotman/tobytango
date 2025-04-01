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
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SchoolIcon from '@mui/icons-material/School';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    tango: false,
    vals: false,
    milonga: false,
    terminology: false
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
      
      {/* TANGO SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('tango')}>
        <ListItemIcon>
          <MusicNoteIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="Tango" />
        {openMenus.tango ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.tango} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* RHYTHMS */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubMenuToggle('tango', 'rhythms')}>
            <ListItemText primary="Rhythms" />
            {isSubMenuOpen('tango', 'rhythms') ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={isSubMenuOpen('tango', 'rhythms')} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {['1-3-', '1---', '----', '1-34', '123-', '1234'].map((rhythm) => (
                <ListItem key={rhythm} sx={{ pl: 6 }} onClick={toggleDrawer(false)}>
                  <Link href={`/rhythms/tango/${rhythm}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <ListItemText primary={rhythm} />
                  </Link>
                </ListItem>
              ))}
              <ListItem sx={{ pl: 6 }}>
                <ListItemText primary="Advanced (coming soon)" />
              </ListItem>
            </List>
          </Collapse>
          
          {/* SUMMARY */}
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/rhythms/tango/summary" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="Summary" />
            </Link>
          </ListItem>
        </List>
      </Collapse>
      
      {/* VALS SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('vals')}>
        <ListItemIcon>
          <MusicNoteIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="Vals" />
        {openMenus.vals ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.vals} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Rhythms (coming soon)" />
          </ListItem>
          
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Summary (coming soon)" />
          </ListItem>
        </List>
      </Collapse>
      
      {/* MILONGA SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('milonga')}>
        <ListItemIcon>
          <MusicNoteIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="Milonga" />
        {openMenus.milonga ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.milonga} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Rhythms (coming soon)" />
          </ListItem>
          
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="Summary (coming soon)" />
          </ListItem>
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
              <ListItemText primary="Argentine Tango" />
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ 
              color: '#ffffff', 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }
            }}
          >
            <MenuIcon sx={{ fontSize: '1.75rem', color: '#ffffff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
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