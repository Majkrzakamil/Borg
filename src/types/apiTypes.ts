export interface HistoricalPrice {
	timestamp: string;
	price: number;
}

export interface CurrencyPrice {
	price: number;
	change24h: number;
}

export interface CurrentPriceResponse {
	usd: CurrencyPrice;
	chf: CurrencyPrice;
	eur: CurrencyPrice;
	gbp: CurrencyPrice;
}

export interface BorgStats {
	weeklyVolumeUsd: number;
	premiumUsers: number;
	weeklyPremiumUsers: number;
	stakedBorgTokens: number;
	stakedBorgPercentage: number;
	borgYieldEarnedUsd: number;
	borgPendingBuybackTokens: number;
	borgPendingBurnTokens: number;
	circulatingSupplyTokens: number;
	circulatingSupplyPercentage: number;
	borgInYieldTokens: number;
	borgInYieldPercentage: number;
	borgBurnedTokens: number;
	borgBurnedPercentage: number;
	borgInBubackPoolTokens: number;
	borgInBubackPoolPercentage: number;
	totalBurned?: number;
}


export interface BurnTransaction {
	id: string;
	amount: number;
	timestamp: string;
	chsbAmountTokens: number;
}

export type Period = 'day' | 'month' | 'year' | 'all';

export interface CurrencyPrice {
	price: number;
	change24h: number;
}

export interface CurrentPrice {
	usd: CurrencyPrice;
	chf: CurrencyPrice;
	eur: CurrencyPrice;
	gbp: CurrencyPrice;
}