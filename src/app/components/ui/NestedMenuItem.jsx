"use client";

import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  ListItem
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

export default function NestedMenuItem({ 
  item, 
  openMenus, 
  handleMenuToggle, 
  handleLinkClick, 
  toggleDrawer, 
  level = 0,
  secondaryStyle
}) {
  // If this is a simple menu item with a link
  if (item.path && !item.submenus) {
    return (
      <ListItem 
        sx={{ pl: 4 * level }} 
        onClick={toggleDrawer(false)}
      >
        <Link href={item.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <ListItemText 
            primary={item.title} 
            primaryTypographyProps={
              item.isSecondary 
                ? item.highlight 
                  ? {...secondaryStyle, fontWeight: 'bold'} 
                  : secondaryStyle 
                : {}
            } 
          />
        </Link>
      </ListItem>
    );
  }
  
  // If this is a menu item with submenus
  if (item.submenus) {
    return (
      <>
        <ListItemButton 
          sx={{ pl: 4 * level }} 
          onClick={() => handleMenuToggle(item.id)}
        >
          <ListItemText 
            primary={item.title} 
            primaryTypographyProps={item.isSecondary ? secondaryStyle : {}} 
          />
          {openMenus[item.id] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        
        <Collapse in={!!openMenus[item.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.submenus.map((submenu, index) => (
              <NestedMenuItem
                key={`${item.id}-submenu-${index}`}
                item={submenu}
                openMenus={openMenus}
                handleMenuToggle={handleMenuToggle}
                handleLinkClick={handleLinkClick}
                toggleDrawer={toggleDrawer}
                level={level + 1}
                secondaryStyle={secondaryStyle}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  
  // For menu items with nested items (not submenus)
  return (
    <>
      <ListItemButton onClick={() => handleMenuToggle(item.id)}>
        {item.icon && (
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
        )}
        <ListItemText primary={item.title} />
        {openMenus[item.id] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={!!openMenus[item.id]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.items && item.items.map((nestedItem, index) => (
            <NestedMenuItem
              key={`${item.id}-item-${index}`}
              item={nestedItem}
              openMenus={openMenus}
              handleMenuToggle={handleMenuToggle}
              handleLinkClick={handleLinkClick}
              toggleDrawer={toggleDrawer}
              level={1}
              secondaryStyle={secondaryStyle}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

NestedMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  openMenus: PropTypes.object.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  handleLinkClick: PropTypes.func,
  toggleDrawer: PropTypes.func.isRequired,
  level: PropTypes.number,
  secondaryStyle: PropTypes.object
};