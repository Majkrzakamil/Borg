import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface TextProps {
  children: React.ReactNode;
  color?: keyof typeof theme.colors;
  fontWeight?: keyof typeof theme.fontWeights;
  fontSize?: keyof typeof theme.fontSizes;
  as?: React.ElementType;
  $textAlign?: 'left' | 'center' | 'right';
}

const StyledText = styled.span<TextProps>`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.dark};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight ? theme.fontWeights[fontWeight] : theme.fontWeights.regular};
  font-size: ${({ theme, fontSize }) =>
    fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.base};
  text-align: ${({ $textAlign }) => $textAlign};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme, fontSize }) =>
      fontSize ? theme.fontSizes.mobile[fontSize] : '1.125rem'};
  }
`;

const Text: React.FC<TextProps> = ({
  children,
  as = 'span',
  color = 'white',
  fontWeight = 'regular',
  fontSize = 'regular',
  $textAlign,
}) => (
  <StyledText
    as={as}
    color={color}
    fontWeight={fontWeight}
    fontSize={fontSize}
    $textAlign={$textAlign}
  >
    {children}
  </StyledText>
);

export default Text;
