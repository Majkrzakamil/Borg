import React from 'react';
import type { PageProps } from 'gatsby';
import App from '../components/App';

const IndexPage: React.FC<PageProps> = () => {
  const seoData = {
    title: 'BORG Token Metrics - Comprehensive Overview',
    description:
      'Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.',
    url: 'https://gentle-faloodeh-4e50e9.netlify.app',
    twitterUsername: '@elonmusk',
  };

  return <App seoData={seoData} />;
};

export default IndexPage;
