import { BorgStats } from '../types';
import { handleResponse } from './apiUtils';
import { API_BASE_URL } from '../config';

export const fetchBorgStats = (): Promise<BorgStats> => {
  return fetch(`${API_BASE_URL}/api/borg-stats`).then(response =>
    handleResponse<BorgStats>(response)
  );
};
