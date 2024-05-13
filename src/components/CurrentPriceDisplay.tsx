import React from 'react';
import { useCurrentPrice } from '../contexts/CurrentPriceContext';

const CurrentPriceDisplay: React.FC = () => {
	const { price, isLoading } = useCurrentPrice();

	if (isLoading) return <p>Loading current price...</p>;
	if (!price) return <p>No current price data available.</p>;

	return (
		<div>
			<h2>Current Price</h2>
			<div>
				<h4>USD: ${price.usd.price} (Change: {price.usd.change24h}%)</h4>
				<h4>EUR: €{price.eur.price} (Change: {price.eur.change24h}%)</h4>
				<h4>CHF: CHF{price.chf.price} (Change: {price.chf.change24h}%)</h4>
				<h4>GBP: £{price.gbp.price} (Change: {price.gbp.change24h}%)</h4>
			</div>
		</div>
	);
};

export default CurrentPriceDisplay;
