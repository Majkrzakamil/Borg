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
          desktop: string;
          mobile: string;
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
    headline: {
      desktop: '5rem', // 80px
      mobile: '2.5rem', // 40px
    },
    title: {
      desktop: '3rem', // 48px
      mobile: '2rem', // 32px
    },
    subtitle: {
      desktop: '1.75rem', // 28px
      mobile: '1.375rem', // 22px
    },
    regular: {
      desktop: '1.375rem', // 22px
      mobile: '1.125rem', // 18px
    },
    medium: {
      desktop: '1.125rem', // 18px
      mobile: '1.125rem', // 18px
    },
    small: {
      desktop: '1.0625rem', // 17px
      mobile: '0.6875rem', // 11px
    },
    tiny: {
      desktop: '0.6875rem', // 11px
      mobile: '0.6875rem', // 11px
    },
  },
  fontWeights: {
    regular: 400,
    demiBold: 600,
  },
  breakpoints: {
    mobile: '520px',
    desktop: '1101px',
  },
};
