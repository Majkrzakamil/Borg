import React from 'react';
import type { PageProps } from 'gatsby';
import App from '../components/App';
import { fetchCurrentPrice, fetchHistoricalPrice, fetchBorgStats } from '../services';
import {
	HistoricalPrice,
	CurrentPriceResponse,
	BorgStats
} from '../types/apiTypes';

interface IndexPageProps extends PageProps {
	serverData: {
		seoData: {
			title: string;
			description: string;
			url: string;
			twitterUsername?: string;
		};
		currentPriceData: CurrentPriceResponse;
		historicalPriceData: HistoricalPrice[];
		supplyStatsData: BorgStats;
	};
}

const IndexPage: React.FC<IndexPageProps> = ({ serverData }) => {
	return <App {...serverData} />;
};

export default IndexPage;

export async function getServerData() {
	try {
		const seoData = {
			title: 'BORG Token Metrics - Comprehensive Overview',
			description: 'Deep-dive into the statistics of BORG and the mechanics of the full SwissBorg Ecosystem.',
			url: 'https://gentle-faloodeh-4e50e9.netlify.app',
			twitterUsername: '@elonmusk',
		};

		const currentPriceData = await fetchCurrentPrice();
		const historicalPriceData = await fetchHistoricalPrice('day');
		const supplyStatsData = await fetchBorgStats();

		return {
			props: {
				seoData,
				currentPriceData,
				historicalPriceData,
				supplyStatsData,
			},
		};
	} catch (error) {
		return {
			status: 500,
			headers: {},
			props: {},
		};
	}
}