import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<{ $isActive: string }>`
  padding: 0.4325rem;
  background-color: ${({ $isActive, theme }) =>
    $isActive === 'true' ? theme.colors.greyLight : theme.colors.dark};
  color: ${({ $isActive, theme }) =>
    $isActive === 'true' ? theme.colors.green : theme.colors.white};
  border: none;
  cursor: pointer;
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: ${({ theme }) => theme.fontWeights.demiBold};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyLight};
  }
`;

const Button: React.FC<ButtonProps> = ({ active, children, onClick }) => (
  <StyledButton $isActive={active.toString()} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
