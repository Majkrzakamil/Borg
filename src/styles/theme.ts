// src/styles/theme.ts
export interface Theme {
  colors: {
    [key: string]: string;
  };
  fonts: {
    body: string;
  };
  fontSizes: {
    [key: string]: string;
  };
  fontWeights: {
    regular: number;
    demiBold: number;
  };
}

export const theme: Theme = {
  colors: {
    primary: '#191E29',
    white: '#FFFFFF',
    green: '#01C38D',
    grey: '#30353E',
    greyLight: '#454950',
    backgroundDark: 'linear-gradient(270deg, #364053 0%, #191E29 100%)'
  },
  fonts: {
    body: 'TT Commons, sans-serif'
  },
  fontSizes: {
    headline: '5rem',    // 80px
    title: '3rem',       // 48px
    subtitle: '1.75rem', // 28px
    regular: '1.375rem', // 22px
    small: '1.0625rem',  // 17px
    tiny: '0.6875rem'    // 11px
  },
  fontWeights: {
    regular: 400,
    demiBold: 600
  }
};
