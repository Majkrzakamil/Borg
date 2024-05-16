import React from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';

interface SectionProps {
	$variant?: 'dark' | 'light';
	children: React.ReactNode;
}

const StyledSection = styled.section<SectionProps>`
  padding: 20px;
  min-height: 100vh;
  background: ${({ theme, $variant }) => $variant === 'dark' ? theme.colors.backgroundDark : theme.colors.white};
  color: ${({ theme, $variant }) => $variant === 'dark' ? theme.colors.white : theme.colors.primary};
`;

const Section: React.FC<SectionProps> = ({ $variant = 'light', children }) => {
	return (
		<StyledSection $variant={$variant}>
			<Wrapper>
				{children}
			</Wrapper>
		</StyledSection>
	);
};

export default Section;
