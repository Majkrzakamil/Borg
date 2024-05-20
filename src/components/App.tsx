import React from 'react';
import loadable from '@loadable/component';
import Layout from './Common/Layout';
import Section from './Common/Section';
import FlexContainer from './Common/FlexContainer';
import Text from './Text';
import SEO from './SEO';
import PriceAndChart from './PriceAndChart';
import LoadingSpinner from './Common/LoadingSpinner';
import {
  CurrentPriceResponse,
  HistoricalPrice,
  BorgStats,
} from '../types/apiTypes';
import { CurrentPriceProvider } from '../contexts/CurrentPriceContext';
import { HistoricalPriceProvider } from '../contexts/HistoricalPriceContext';
import { SupplyStatsProvider } from '../contexts/SupplyStatsContext';

const DoughnutChart = loadable(() => import('./DoughnutChart'), {
  fallback: (
    <LoadingSpinner
      $desktopWidth="40%"
      $mobileHeight="27rem"
      $desktopHeight="27rem"
    />
  ),
});
const StatsList = loadable(() => import('./StatsList'), {
  fallback: (
    <LoadingSpinner
      $desktopWidth="40%"
      $mobileHeight="26.3125rem"
      $desktopHeight="23.5625rem"
    />
  ),
});

interface AppProps {
  seoData: {
    title: string;
    description: string;
    url: string;
    twitterUsername?: string;
  };
  currentPriceData: CurrentPriceResponse;
  historicalPriceData: HistoricalPrice[];
  supplyStatsData: BorgStats;
}

const App: React.FC<AppProps> = ({
  seoData,
  currentPriceData,
  historicalPriceData,
  supplyStatsData,
}) => {
  return (
    <CurrentPriceProvider initialData={currentPriceData}>
      <HistoricalPriceProvider initialData={historicalPriceData}>
        <SupplyStatsProvider initialData={supplyStatsData}>
          <Layout>
            <main>
              <SEO {...seoData} />
              <Section $variant="dark">
                <FlexContainer direction="column" $alignItems="center">
                  <Text
                    as="h1"
                    fontSize="headline"
                    fontWeight="demiBold"
                    $textAlign="center"
                  >
                    BORG Token Metrics
                  </Text>
                  <Text as="p" $textAlign="center">
                    Deep-dive into the statistics of BORG and the mechanics of
                    the full SwissBorg Ecosystem.
                  </Text>
                  <PriceAndChart />
                </FlexContainer>
              </Section>
              <Section>
                <FlexContainer direction="column" $alignItems="center">
                  <Text
                    as="h2"
                    color="dark"
                    fontSize="title"
                    fontWeight="demiBold"
                    $textAlign="center"
                  >
                    Breakdown of BORG’s circulating supply
                  </Text>
                  <FlexContainer
                    $justifyContent="space-between"
                    $alignItems="center"
                  >
                    <StatsList />
                    <DoughnutChart />
                  </FlexContainer>
                </FlexContainer>
              </Section>
            </main>
          </Layout>
        </SupplyStatsProvider>
      </HistoricalPriceProvider>
    </CurrentPriceProvider>
  );
};

export default App;
