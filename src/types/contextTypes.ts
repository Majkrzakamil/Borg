import { HistoricalPrice, CurrentPrice, BorgStats, BurnTransaction, Period } from './apiTypes';

export interface HistoricalPriceContextType {
  data: HistoricalPrice[] | null;
  isLoading: boolean;
  error: Error | null;
  handlePeriodChange: (period: Period) => void;
}

export interface CurrentPriceContextType {
  price: CurrentPrice | null;
  isLoading: boolean;
}

export interface SupplyStatsContextType {
  supplyData: BorgStats | null;
  burnData: BurnTransaction[] | null;
  isLoading: boolean;
}
