import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  children: React.ReactNode;
}

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
`;

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
