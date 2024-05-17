import { handleResponse } from './apiUtils';
import { API_BASE_URL } from '../config';
import { CurrentPriceResponse, HistoricalPrice, Period } from '../types';

export const fetchCurrentPrice = (): Promise<CurrentPriceResponse> => {
  return fetch(`${API_BASE_URL}/api/price`).then(response =>
    handleResponse<CurrentPriceResponse>(response)
  );
};

export const fetchHistoricalPrice = (
  period: Period
): Promise<HistoricalPrice[]> => {
  const urlMap = {
    day: `${API_BASE_URL}/api/historical-price/day`,
    month: `${API_BASE_URL}/api/historical-price/month`,
    year: `${API_BASE_URL}/api/historical-price/year`,
    all: `${API_BASE_URL}/api/historical-price/all`,
  };

  const url = urlMap[period] || urlMap.day;

  return fetch(url).then(response =>
    handleResponse<HistoricalPrice[]>(response)
  );
};
