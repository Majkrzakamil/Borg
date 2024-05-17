import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './src/styles/GlobalStyle';
import { theme } from './src/styles/theme';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
);
