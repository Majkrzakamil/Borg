import React from 'react';
import loadable from '@loadable/component';
import styled from 'styled-components';
import { CurrentPriceProvider } from '../contexts/CurrentPriceContext';
import { HistoricalPriceProvider } from '../contexts/HistoricalPriceContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const CurrentPriceDisplay = loadable(() => import('./CurrentPriceDisplay'), {
  fallback: (
    <LoadingSpinner $mobileHeight="5.766875rem" $desktopHeight="3.8575rem" />
  ),
});
const LineChart = loadable(() => import('./LineChart'), {
  fallback: (
    <LoadingSpinner $mobileHeight="10.6875rem" $desktopHeight="22.5rem" />
  ),
});
const ChartControls = loadable(() => import('./ChartControls'), {
  fallback: (
    <LoadingSpinner $mobileHeight="1.676875rem" $desktopHeight="1.676875rem" />
  ),
});

const PriceChartContainer = styled.div`
  background: #191e29;
  box-shadow: 0px 7.32px 12.2px 0px #0000004d;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  max-width: 45rem;
  width: 100%;
  overflow: hidden;
  min-height: 28.005625rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 18.818125rem;
  }
`;

const PriceAndChart: React.FC = () => {
  return (
    <PriceChartContainer>
      <CurrentPriceProvider>
        <CurrentPriceDisplay />
      </CurrentPriceProvider>
      <HistoricalPriceProvider>
        <LineChart />
        <ChartControls />
      </HistoricalPriceProvider>
    </PriceChartContainer>
  );
};

export default PriceAndChart;
