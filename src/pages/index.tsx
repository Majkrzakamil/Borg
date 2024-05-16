import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Common/Layout";
import Section from "../components/Common/Section";
import FlexContainer from "../components/Common/FlexContainer";
import { SupplyStatsProvider } from '../contexts/SupplyStatsContext';
import DoughnutChart from '../components/DoughnutChart';
import StatsList from "../components/StatsList";
import PriceAndChart from "../components/PriceAndChart"
import Text from "../components/Text"

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<main>
				<Section $variant="dark">
					<FlexContainer direction="column" $alignItems="center">
						<Text as="h1" fontSize="headline" fontWeight="demiBold" textAlign="center">
							BORG Token Metrics
						</Text>
						<Text as="p" textAlign="center">
							Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.
						</Text>
						<PriceAndChart />
					</FlexContainer>
				</Section>
				<Section>
					<SupplyStatsProvider>
						<FlexContainer direction="column" $alignItems="center">
							<Text as="h2" color="dark" fontSize="title" fontWeight="demiBold" textAlign="center">
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
}

export default IndexPage;
export const Head: HeadFC = () => <title>Home Page</title>;
