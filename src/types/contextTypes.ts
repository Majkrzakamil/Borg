import { HistoricalPrice, CurrentPriceResponse, BorgStats, BurnTransaction, Period } from './apiTypes';

export interface HistoricalPriceContextType {
  data: HistoricalPrice[] | null;
  isLoading: boolean;
  error: Error | null;
  handlePeriodChange: (newPeriod: Period) => void;
  period: Period;
}

export interface CurrentPriceContextType {
  price: CurrentPriceResponse | null;
  isLoading: boolean;
}

export interface SupplyStatsContextType {
  supplyData: BorgStats | null;
  burnData: BurnTransaction[] | null;
  isLoading: boolean;
  error: Error | null;
}
