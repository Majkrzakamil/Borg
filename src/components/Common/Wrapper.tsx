import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
	children: React.ReactNode;
}

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
