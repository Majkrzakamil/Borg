import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './src/styles/GlobalStyle';
import { theme } from './src/styles/theme';

export const wrapRootElement = ({ element }) => {
	const sheet = new ServerStyleSheet();
	const styledElement = sheet.collectStyles(
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{element}
		</ThemeProvider>
	);
	const styleTags = sheet.getStyleElement();

	return (
		<>
			{styleTags}
			{styledElement}
		</>
	);
};
