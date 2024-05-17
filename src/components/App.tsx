import React from 'react';
import loadable from '@loadable/component';
import Layout from './Common/Layout';
import Section from './Common/Section';
import FlexContainer from './Common/FlexContainer';
import { SupplyStatsProvider } from '../contexts/SupplyStatsContext';
import Text from './Text';
import SEO from './SEO';
import PriceAndChart from './PriceAndChart';
import LoadingSpinner from './Common/LoadingSpinner';

const DoughnutChart = loadable(() => import('./DoughnutChart'), {
	fallback: <LoadingSpinner $mobileHeight="27rem" $desktopHeight="27rem" />,
});
const StatsList = loadable(() => import('./StatsList'), {
	fallback: <LoadingSpinner $mobileHeight="26.25rem" $desktopHeight="23.5rem" />,
});

interface AppProps {
	seoData: {
		title: string;
		description: string;
		url: string;
		twitterUsername?: string;
	};
}

const App: React.FC<AppProps> = ({ seoData }) => {
	return (
		<Layout>
			<main>
				<SEO {...seoData} />
				<Section $variant="dark">
					<FlexContainer direction="column" $alignItems="center">
						<Text as="h1" fontSize="headline" fontWeight="demiBold" $textAlign="center">
							BORG Token Metrics
						</Text>
						<Text as="p" $textAlign="center">
							Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.
						</Text>
						<PriceAndChart />
					</FlexContainer>
				</Section>
				<Section>
					<SupplyStatsProvider>
						<FlexContainer direction="column" $alignItems="center">
							<Text as="h2" color="dark" fontSize="title" fontWeight="demiBold" $textAlign="center">
								Breakdown of BORG’s circulating supply
							</Text>
							<FlexContainer $justifyContent="space-between" $alignItems="center">
								<StatsList />
								<DoughnutChart />
							</FlexContainer>
						</FlexContainer>
					</SupplyStatsProvider>
				</Section>
			</main>
		</Layout>
	);
};

export default App;
