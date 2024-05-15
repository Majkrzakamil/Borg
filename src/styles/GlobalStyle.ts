import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: 'TT Commons';
    src: url('/fonts/TTCommons-Regular.woff2') format('woff2'),
         url('/fonts/TTCommons-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'TT Commons';
    src: url('/fonts/TTCommons-DemiBold.woff2') format('woff2'),
         url('/fonts/TTCommons-DemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'TT Commons', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(270deg, #364053 0%, #191E29 100%);
    color: #191E29;
  }
`;
