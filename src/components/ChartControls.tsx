import React from 'react';
import styled from 'styled-components';
import { useHistoricalPrice } from '../contexts/HistoricalPriceContext';
import Button from '../components/Button';
import { Period } from '../types';

const periodOptions: { key: Period, label: string }[] = [
  { key: 'day', label: '1D' },
  { key: 'month', label: '1M' },
  { key: 'year', label: '1Y' },
  { key: 'all', label: 'ALL' }
];

const ControlsContainer = styled.div`
  display: flex;
`;

const ChartControls = () => {
  const { handlePeriodChange, period } = useHistoricalPrice();

  return (
    <ControlsContainer>
      {periodOptions.map(option => (
        <Button
          key={option.key}
          active={period === option.key}
          onClick={() => handlePeriodChange(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </ControlsContainer>
  );
};

export default ChartControls;
