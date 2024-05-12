import { BorgStats } from '../types';
import { handleResponse } from './apiUtils';

const API_BASE_URL = 'https://borg-api-techchallenge.swissborg-stage.com';

export const fetchBorgStats = (): Promise<BorgStats> => {
	return fetch(`${API_BASE_URL}/api/borg-stats`).then(response => handleResponse<BorgStats>(response));
};
