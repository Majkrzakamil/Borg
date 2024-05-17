import React from 'react';
import styled from 'styled-components';

interface FlexContainerProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  $justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  $alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

const StyledFlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
  width: 100%;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  direction,
  $justifyContent,
  $alignItems,
}) => {
  return (
    <StyledFlexContainer
      direction={direction}
      $justifyContent={$justifyContent}
      $alignItems={$alignItems}
    >
      {children}
    </StyledFlexContainer>
  );
};

export default FlexContainer;
