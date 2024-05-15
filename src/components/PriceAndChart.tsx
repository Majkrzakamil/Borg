// PriceAndChart.tsx
import React from 'react';
import styled from 'styled-components';

import CurrentPriceDisplay from './CurrentPriceDisplay';
import LineChart from './LineChart';
import { CurrentPriceProvider } from '../contexts/CurrentPriceContext';
import { HistoricalPriceProvider } from '../contexts/HistoricalPriceContext';

const PriceChartContainer = styled.div`
  background: #191E29;
  box-shadow: box-shadow: 0px 7.32px 12.2px 0px #0000004D;
  // border-radius: 8px;
  display: flex;
  flex-direction: column;
	max-width: 45rem;
	width: 100%;
`;

const PriceAndChart = () => {
	return (
		<PriceChartContainer>
			<CurrentPriceProvider>
				<CurrentPriceDisplay />
			</CurrentPriceProvider>
			<HistoricalPriceProvider>
				<LineChart />
			</HistoricalPriceProvider>
		</PriceChartContainer>
	);
};

export default PriceAndChart;