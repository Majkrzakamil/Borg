import { BurnTransaction } from '../types';
import { handleResponse } from './apiUtils';

const API_BASE_URL = 'https://borg-api-techchallenge.swissborg-stage.com';

export const fetchBurnTransactions = (): Promise<BurnTransaction[]> => {
  return fetch(`${API_BASE_URL}/api/burn-transactions`).then(response => handleResponse<BurnTransaction[]>(response));
};
