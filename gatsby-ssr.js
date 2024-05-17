import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './src/styles/GlobalStyle';
import { theme } from './src/styles/theme';

export const wrapPageElement = ({ element }) => {
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

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
	setHtmlAttributes({ lang: 'en' });

	setHeadComponents([
		<link
			rel="preload"
			href="/fonts/TTCommons-Regular.woff2"
			as="font"
			type="font/woff2"
			crossOrigin="anonymous"
			key="TTCommonsRegular"
		/>,
		<link
			rel="preload"
			href="/fonts/TTCommons-DemiBold.woff2"
			as="font"
			type="font/woff2"
			crossOrigin="anonymous"
			key="TTCommonsDemiBold"
		/>,
	]);
};
