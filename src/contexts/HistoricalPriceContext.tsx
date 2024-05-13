import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchHistoricalPrice } from '../services';
import { Period, HistoricalPrice, HistoricalPriceContextType } from '../types';

const HistoricalPriceContext = createContext<HistoricalPriceContextType>({
	data: null,
	isLoading: false,
	error: null,
	handlePeriodChange: () => { }
});

interface HistoricalPriceProviderProps {
	children: ReactNode;
}

export const HistoricalPriceProvider: React.FC<HistoricalPriceProviderProps> = ({ children }) => {
	const [period, setPeriod] = useState<Period>('day');
	const [data, setData] = useState<HistoricalPrice[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const fetchedData = await fetchHistoricalPrice(period);
				setData(fetchedData);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('Error fetching data'));
			}
			setIsLoading(false);
		};

		loadData();
	}, [period]);

	const handlePeriodChange = (newPeriod: Period) => {
		setPeriod(newPeriod);
	};

	return (
		<HistoricalPriceContext.Provider value={{ data, isLoading, error, handlePeriodChange }}>
			{children}
		</HistoricalPriceContext.Provider>
	);
};

export const useHistoricalPrice = () => useContext(HistoricalPriceContext);
