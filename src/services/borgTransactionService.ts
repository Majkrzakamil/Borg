import { BurnTransaction } from '../types';
import { handleResponse } from './apiUtils';
import { API_BASE_URL } from '../config';

export const fetchBurnTransactions = (): Promise<BurnTransaction[]> => {
  return fetch(`${API_BASE_URL}/api/burn-transactions`).then(response =>
    handleResponse<BurnTransaction[]>(response)
  );
};
