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
  Box,
  useTheme,
  Typography,
  keyframes
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import NestedMenuItem from './NestedMenuItem';
import menuStructure from '../../data/menuStructure';

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

  const [isClient, setIsClient] = React.useState(false);
  
  // Only enable animations after client-side hydration
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ minHeight: '64px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* Home button moved to the very left */}
            <Link href="/" passHref>
              <IconButton
                aria-label="home"
                sx={{ color: '#ffffff', mr: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }}}
              >
                <HomeIcon sx={{ fontSize: '1.75rem' }} />
              </IconButton>
            </Link>
            
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(!open)}
              sx={{ color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }}}
            >
              <MenuIcon sx={{ fontSize: '1.75rem', color: '#ffffff' }} />
            </IconButton>
            
            {/* Arrow now after the hamburger menu */}
            <ArrowBackIcon 
              sx={{ 
                color: '#ffffff',
                ml: 1,
                animation: isClient && !open ? `${pulse} 1.5s infinite ease-in-out` : 'none',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }} 
            />
            
            <Typography 
              variant="button" 
              sx={{ 
                ml: 1, 
                color: '#ffffff', 
                fontWeight: 'bold',
                animation: isClient ? `${pulse} 1.5s infinite ease-in-out` : 'none',
                display: { xs: 'block', sm: 'block' }
              }}
            >
              MENU
            </Typography>
            
            <Box sx={{ flexGrow: 1 }} />
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
          
          {/* Render menu items from menu structure */}
          {menuStructure.map((menuItem, index) => (
            menuItem.path ? (
              <ListItem key={index} onClick={toggleDrawer(false)}>
                <Link href={menuItem.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemText primary={menuItem.title} />
                </Link>
              </ListItem>
            ) : (
              <NestedMenuItem
                key={index}
                item={menuItem}
                openMenus={openMenus}
                handleMenuToggle={handleMenuToggle}
                handleLinkClick={handleLinkClick}
                toggleDrawer={toggleDrawer}
                secondaryStyle={secondaryStyle}
              />
            )
          ))}
        </List>
      </Drawer>
    </>
  );
}

Header.propTypes = {};