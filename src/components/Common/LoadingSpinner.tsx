import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingSpinnerProps {
  $mobileHeight: string;
  $desktopHeight: string;
  $mobileWidth?: string;
  $desktopWidth?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div<LoadingSpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$desktopWidth};
  height: ${(props) => props.$desktopHeight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: ${(props) => props.$mobileWidth};
    height: ${(props) => props.$mobileHeight};
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.green};
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ $mobileWidth = '100%', $desktopWidth = '100%', $mobileHeight, $desktopHeight }) => (
  <SpinnerWrapper $mobileWidth={$mobileWidth} $desktopWidth={$desktopWidth} $mobileHeight={$mobileHeight} $desktopHeight={$desktopHeight}>
    <Spinner />
  </SpinnerWrapper>
);

export default LoadingSpinner;
