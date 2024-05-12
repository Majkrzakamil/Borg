import { CurrentPrice, HistoricalPrice, Period } from '../types';
import { handleResponse } from './apiUtils';
import { API_BASE_URL } from '../config';

export const fetchCurrentPrice = (): Promise<CurrentPrice> => {
  return fetch(`${API_BASE_URL}/api/price`).then(response => handleResponse<CurrentPrice>(response));
};

export const fetchHistoricalPrice = (period: Period): Promise<HistoricalPrice[]> => {
  const urlMap = {
    day: `${API_BASE_URL}/api/historical-price/day`,
    month: `${API_BASE_URL}/api/historical-price/month`,
    year: `${API_BASE_URL}/api/historical-price/year`,
    all: `${API_BASE_URL}/api/historical-price/all`
  };
  
  const url = urlMap[period] || urlMap.day;
	
  return fetch(url).then(response => handleResponse<HistoricalPrice[]>(response));
};
