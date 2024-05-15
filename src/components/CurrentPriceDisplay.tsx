import React from 'react';
import styled from 'styled-components';

import Text from './Text';
import { useCurrentPrice } from '../contexts/CurrentPriceContext';
import ArrowIcon from '../icons/ArrowIcon';
import BorgExchangeIcon from '../icons/BorgExchangeIcon';
import USDIcon from '../icons/USDIcon';

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #191E2933;
  background: #30353E;
  padding: 0.915rem;
  border-radius: 0.375rem;
`;

const IconsRow = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  gap: 0.125rem;
`;

const IconWrapper = styled.div`
  position: absolute;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrentPriceDisplay: React.FC = () => {
  const { price, isLoading } = useCurrentPrice();

  if (isLoading) return <p>Loading current price...</p>;
  if (!price) return <p>No current price data available.</p>;

  return (
    <PriceContainer>
      <IconsRow>
        <USDIcon />
        <IconWrapper><ArrowIcon /></IconWrapper>
        <BorgExchangeIcon />
      </IconsRow>
      <PriceInfo>
        <Text fontSize="small">USD ${price.usd.price.toFixed(3)}</Text>
        <Text fontSize="tiny" color="green">{price.usd.change24h.toFixed(3)}% 24h</Text>
      </PriceInfo>
    </PriceContainer>
  );
};

export default CurrentPriceDisplay;
