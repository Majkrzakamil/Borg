export interface Theme {
  colors: {
    [key: string]: string;
  };
  fonts: {
    body: string;
  };
  fontSizes: {
    [key: string]:
      | string
      | {
          [key: string]: string;
        };
  };
  fontWeights: {
    regular: number;
    demiBold: number;
  };
  breakpoints: {
    [key: string]: string;
  };
}

export const theme: Theme = {
  colors: {
    dark: '#191E29',
    white: '#FFFFFF',
    green: '#01C38D',
    grey: '#30353E',
    greyLight: '#454950',
    backgroundDark: 'linear-gradient(270deg, #364053 0%, #191E29 100%)',
  },
  fonts: {
    body: 'TT Commons, sans-serif',
  },
  fontSizes: {
    headline: '5rem', // 80px
    title: '3rem', // 48px
    subtitle: '1.75rem', // 28px
    regular: '1.375rem', // 22px
    medium: '1.125rem', // 18px
    small: '1.0625rem', // 17px
    tiny: '0.6875rem', // 11px
    mobile: {
      headline: '2.5rem', // 40px
      title: '2rem', // 32px
      subtitle: '1.375rem', // 22px
      regular: '1.125rem', // 18px
      medium: '1.125rem', // 18px
      small: '0.6875rem', // 11px 8.6px - in figma but it's too small
      tiny: '0.6875rem', // 11px 7px - in figma but it's too small
    },
  },
  fontWeights: {
    regular: 400,
    demiBold: 600,
  },
  breakpoints: {
    mobile: '520px',
    tablet: '800px',
    desktop: '1101px',
  },
};
