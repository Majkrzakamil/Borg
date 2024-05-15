import React from 'react';
import styled from 'styled-components';

interface FlexContainerProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  justifycontent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignitems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

const StyledFlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justifycontent }) => justifycontent || 'flex-start'};
  align-items: ${({ alignitems }) => alignitems || 'stretch'};
  width: 100%;
  gap: 2rem;
`;

const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  direction,
  justifycontent,
  alignitems
}) => {
  return (
    <StyledFlexContainer direction={direction} justifycontent={justifycontent} alignitems={alignitems}>
      {children}
    </StyledFlexContainer>
  );
};

export default FlexContainer;
