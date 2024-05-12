import {
	HistoricalPrice,
	CurrentPrice,
	BorgStats,
	BurnTransaction
} from '../types';

const API_BASE_URL = 'https://borg-api-techchallenge.swissborg-stage.com';

const handleResponse = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	return await response.json();
};

export const fetchDailyHistoricalPrice = (): Promise<HistoricalPrice[]> => {
	return fetch(`${API_BASE_URL}/api/historical-price/day`).then(response => handleResponse<HistoricalPrice[]>(response));
};

export const fetchMonthlyHistoricalPrice = (): Promise<HistoricalPrice[]> => {
	return fetch(`${API_BASE_URL}/api/historical-price/month`).then(response => handleResponse<HistoricalPrice[]>(response));
};

export const fetchYearlyHistoricalPrice = (): Promise<HistoricalPrice[]> => {
	return fetch(`${API_BASE_URL}/api/historical-price/year`).then(response => handleResponse<HistoricalPrice[]>(response));
};

export const fetchAllTimeHistoricalPrice = (): Promise<HistoricalPrice[]> => {
	return fetch(`${API_BASE_URL}/api/historical-price/all`).then(response => handleResponse<HistoricalPrice[]>(response));
};

export const fetchCurrentPrice = (): Promise<CurrentPrice> => {
	return fetch(`${API_BASE_URL}/api/price`).then(response => handleResponse<CurrentPrice>(response));
};

export const fetchBorgStats = (): Promise<BorgStats> => {
	return fetch(`${API_BASE_URL}/api/borg-stats`).then(response => handleResponse<BorgStats>(response));
};

export const fetchBurnTransactions = (): Promise<BurnTransaction[]> => {
	return fetch(`${API_BASE_URL}/api/burn-transactions`).then(response => handleResponse<BurnTransaction[]>(response));
};

export const fetchHistoricalPrice = (period: string): Promise<HistoricalPrice[]> => {
	switch (period) {
		case 'day':
			return fetchDailyHistoricalPrice();
		case 'month':
			return fetchMonthlyHistoricalPrice();
		case 'year':
			return fetchYearlyHistoricalPrice();
		case 'all':
			return fetchAllTimeHistoricalPrice();
		default:
			throw new Error('Invalid period for fetching historical prices');
	}
};
