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
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    tango: false,
    vals: false,
    milonga: false
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
      
      <ListItem onClick={toggleDrawer(false)}>
        <Link href="/about" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <ListItemText primary="About" />
        </Link>
      </ListItem>
      
      {/* TANGO SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('tango')}>
        <ListItemIcon>
          <MusicNoteIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="TANGO" />
        {openMenus.tango ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.tango} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* RHYTHMS */}
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleSubMenuToggle('tango', 'rhythms')}>
            <ListItemText primary="RHYTHMS" />
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
            </List>
          </Collapse>
          
          {/* SUMMARY */}
          <ListItem sx={{ pl: 4 }} onClick={toggleDrawer(false)}>
            <Link href="/rhythms/tango/summary" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemText primary="SUMMARY" />
            </Link>
          </ListItem>
        </List>
      </Collapse>
      
      {/* VALS SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('vals')}>
        <ListItemIcon>
          <MusicNoteIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="VALS" />
        {openMenus.vals ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.vals} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="RHYTHMS (Coming soon)" />
          </ListItem>
          
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="SUMMARY (Coming soon)" />
          </ListItem>
        </List>
      </Collapse>
      
      {/* MILONGA SECTION */}
      <ListItemButton onClick={() => handleMenuToggle('milonga')}>
        <ListItemIcon>
          <MusicNoteIcon style={{ color: theme.palette.primary.contrastText }} />
        </ListItemIcon>
        <ListItemText primary="MILONGA" />
        {openMenus.milonga ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={openMenus.milonga} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="RHYTHMS (Coming soon)" />
          </ListItem>
          
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="SUMMARY (Coming soon)" />
          </ListItem>
        </List>
      </Collapse>
      
      <ListItem onClick={toggleDrawer(false)}>
        <Link href="/terms-music" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <ListItemText primary="Musical Terms" />
        </Link>
      </ListItem>
      
      <ListItem onClick={toggleDrawer(false)}>
        <Link href="/terms-dance" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <ListItemText primary="Dance Terms" />
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