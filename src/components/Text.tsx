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

const getFontSize = (fontSize: keyof typeof theme.fontSizes) => {
  const size = theme.fontSizes[fontSize];
  return typeof size === 'string' ? size : size.desktop;
};

const getMobileFontSize = (fontSize: keyof typeof theme.fontSizes) => {
  const size = theme.fontSizes[fontSize];
  return typeof size === 'string' ? size : size.mobile;
};

const StyledText = styled.span<TextProps>`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.dark};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight ? theme.fontWeights[fontWeight] : theme.fontWeights.regular};
  font-size: ${({ fontSize }) =>
    fontSize ? getFontSize(fontSize) : theme.fontSizes.regular};
  text-align: ${({ $textAlign }) => $textAlign};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ fontSize }) =>
      fontSize ? getMobileFontSize(fontSize) : '1.125rem'};
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
