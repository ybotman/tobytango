"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from '../theme';

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired,
};