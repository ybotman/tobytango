"use client";

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(state);
  };

  const list = () => (
    <List sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <ListItem button component={Link} href="/">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} href="/terms-music">
        <ListItemText primary="Musical Terms" />
      </ListItem>
      <ListItem button component={Link} href="/terms-dance">
        <ListItemText primary="Dance Terms" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          {/* Removed the header label */}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}

Header.propTypes = {};