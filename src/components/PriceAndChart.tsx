import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { CurrentPriceProvider } from '../contexts/CurrentPriceContext';
import { HistoricalPriceProvider } from '../contexts/HistoricalPriceContext';

const CurrentPriceDisplay = lazy(() => import('./CurrentPriceDisplay'));
const LineChart = lazy(() => import('./LineChart'));
const ChartControls = lazy(() => import('./ChartControls'));

const PriceChartContainer = styled.div`
  background: #191E29;
  box-shadow: box-shadow: 0px 7.32px 12.2px 0px #0000004D;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  max-width: 45rem;
  width: 100%;
  overflow: hidden;
`;

const PriceAndChart = () => {
	return (
		<PriceChartContainer>
			<CurrentPriceProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<CurrentPriceDisplay />
				</Suspense>
			</CurrentPriceProvider>
			<HistoricalPriceProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<LineChart />
					<ChartControls />
				</Suspense>
			</HistoricalPriceProvider>
		</PriceChartContainer>
	);
};

export default PriceAndChart;
