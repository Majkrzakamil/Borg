import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  $mobileHeight: string;
  $desktopHeight: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div<LoadingSpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => props.$mobileHeight};
  background-color: #e0e0e0;
  
  @media (min-width: 768px) {
    height: ${(props) => props.$desktopHeight};
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ $mobileHeight, $desktopHeight }) => (
  <SpinnerWrapper $mobileHeight={$mobileHeight} $desktopHeight={$desktopHeight}>
    <Spinner />
  </SpinnerWrapper>
);

export default LoadingSpinner;
