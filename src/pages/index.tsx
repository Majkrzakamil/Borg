import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Common/Layout";
import Section from "../components/Common/Section";
import FlexContainer from "../components/Common/FlexContainer";
import { SupplyStatsProvider } from '../contexts/SupplyStatsContext';
import DoughnutChart from '../components/DoughnutChart';
import StatsList from "../components/StatsList";
import PriceAndChart from "../components/PriceAndChart"

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<main>
				<Section variant="dark">
					<FlexContainer direction="column" alignItems="center">
						<h1>BORG Token Metrics</h1>
						<p>Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.</p>
						<PriceAndChart />
					</FlexContainer>
				</Section>
				<Section>
					<SupplyStatsProvider>
						<FlexContainer direction="column" alignItems="center">
							<h2>Breakdown of BORG’s circulating supply</h2>
							<FlexContainer justifyContent="space-between">
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
