import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface TextProps {
	children: React.ReactNode;
	color?: keyof typeof theme.colors;
	fontWeight?: keyof typeof theme.fontWeights;
	fontSize?: keyof typeof theme.fontSizes;
	as?: React.ElementType;
}

const StyledText = styled.span<TextProps>`
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.dark)};
  font-weight: ${({ theme, fontWeight }) => (fontWeight ? theme.fontWeights[fontWeight] : theme.fontWeights.regular)};
  font-size: ${({ theme, fontSize }) => (fontSize ? theme.fontSizes[fontSize] : theme.fontSizes.base)};
`;

const Text: React.FC<TextProps> = ({ children, as = 'span', color = 'white', fontWeight = 'regular', fontSize = 'regular' }) => (
	<StyledText as={as} color={color} fontWeight={fontWeight} fontSize={fontSize}>
		{children}
	</StyledText>
);

export default Text;
