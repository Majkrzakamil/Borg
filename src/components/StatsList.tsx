import React from 'react';
import { useSupplyStats } from '../contexts/SupplyStatsContext';
import ListItem from './ListItem';
import BorgIcon from '../icons/BorgIcon'
import BuybackIcon from '../icons/BuybackIcon'
import DiamondIcon from '../icons/DiamondIcon'
import FireIcon from '../icons/FireIcon'


const StatsList: React.FC = () => {
	const { supplyData, isLoading, error } = useSupplyStats();

	if (isLoading) return <p>Loading data...</p>;
	if (error) return <p>Error loading data: {error.message}</p>;
	if (!supplyData) return <p>No data available</p>;

	const dataMapping = [
		{
			label: 'Remaining Circulating Supply',
			value: supplyData.circulatingSupplyTokens.toLocaleString(),
			icon: BorgIcon
		},
		{
			label: 'BORG Staked',
			value: supplyData.stakedBorgTokens.toLocaleString(),
			icon: DiamondIcon
		},
		{
			label: 'BORG in Yield',
			value: supplyData.borgInYieldTokens.toLocaleString(),
			icon: DiamondIcon
		},
		{
			label: 'Circulating Supply Burned',
			value: supplyData.borgBurnedTokens.toLocaleString(),
			icon: FireIcon
		},
		{
			label: 'BORG in Buyback Pool',
			value: supplyData.borgInBubackPoolTokens.toLocaleString(),
			icon: BuybackIcon
		}
	];

	return (
		<div>
			<h3>BORG Token Stats</h3>
			<ul>
				{dataMapping.map((item, index) => (
					<ListItem key={index} label={item.label} value={item.value} icon={item.icon} />
				))}
			</ul>
		</div>
	);
};

export default StatsList;
