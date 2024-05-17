import React from 'react';
import styled from 'styled-components';
import { useSupplyStats } from '../contexts/SupplyStatsContext';
import ListItem from './ListItem';
import BorgIcon from '../icons/BorgIcon';
import BuybackIcon from '../icons/BuybackIcon';
import DiamondIcon from '../icons/DiamondIcon';
import FireIcon from '../icons/FireIcon';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 34.375rem;
  width: 100%;
`;

const StatsList: React.FC = () => {
  const { supplyData, isLoading, error } = useSupplyStats();

  if (isLoading) return <LoadingSpinner $mobileHeight="26.25rem" $desktopHeight="23.5rem" />;
  if (error) return <p>Error loading data: {error.message}</p>;
  if (!supplyData) return <p>No data available</p>;

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}% of Circulating Supply`;

  const dataMapping = [
    {
      label: 'Remaining Circulating Supply',
      value: supplyData.circulatingSupplyTokens.toLocaleString(),
      icon: BorgIcon
    },
    {
      label: 'BORG Staked',
      subLabel: formatPercentage(supplyData.stakedBorgPercentage),
      value: supplyData.stakedBorgTokens.toLocaleString(),
      icon: DiamondIcon
    },
    {
      label: 'BORG in Yield',
      subLabel: formatPercentage(supplyData.borgInYieldPercentage),
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
    <List>
      {dataMapping.map((item, index) => (
        <ListItem key={index} label={item.label} value={item.value} icon={item.icon} subLabel={item.subLabel} />
      ))}
    </List>
  );
};

export default StatsList;
