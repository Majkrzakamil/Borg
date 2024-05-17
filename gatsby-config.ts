import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `BORG`,
    siteUrl: `https://gentle-faloodeh-4e50e9.netlify.app`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        displayName: false,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-minify',
    'gatsby-plugin-offline',
    'gatsby-plugin-loadable-components-ssr',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `BORG`,
        short_name: `BORG`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#191E29`,
        display: `standalone`,
        icon: `static/icons/favicon.svg`,
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        analyzerMode: 'static',
        reportFilename: './report.html',
        openAnalyzer: false,
      },
    },
    {
      resolve: 'gatsby-plugin-perf-budgets',
      options: {
        thresholds: {
          'max-size-total': 300,
          'max-size-js': 150,
          'max-size-css': 50,
        },
      },
    },
  ],
};

export default config;
