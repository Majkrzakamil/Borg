export interface HistoricalPrice {
	timestamp: string;
	price: number;
}

export interface CurrentPrice {
	price: number;
	timestamp: string;
}

export interface BorgStats {
	circulatingSupply: number;
	totalSupply: number;
}

export interface BurnTransaction {
	id: string;
	amount: number;
	timestamp: string;
}

export type Period = 'day' | 'month' | 'year' | 'all';