import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchBorgStats, fetchBurnTransactions } from '../services';
import { BorgStats, BurnTransaction, SupplyStatsContextType } from '../types';

const SupplyStatsContext = createContext<SupplyStatsContextType>({
  supplyData: null,
  burnData: null,
  isLoading: false,
  error: null,
});

interface SupplyStatsProviderProps {
  children: ReactNode;
  initialData: BorgStats;
}

export const SupplyStatsProvider: React.FC<SupplyStatsProviderProps> = ({
  children,
  initialData,
}) => {
  const [supplyData, setSupplyData] = useState<BorgStats | null>(initialData);
  const [burnData, setBurnData] = useState<BurnTransaction[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const statsData = await fetchBorgStats();
        const burnTransactionData = await fetchBurnTransactions();
        const totalBurned = burnTransactionData.reduce(
          (acc, item) => acc + item.chsbAmountTokens,
          0
        );
        setSupplyData({ ...statsData, totalBurned });
        setBurnData(burnTransactionData);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error('Failed to fetch data')
        );
      }
      setIsLoading(false);
    };

    if (!initialData) {
      loadData();
    }
  }, [initialData]);

  return (
    <SupplyStatsContext.Provider
      value={{ supplyData, burnData, isLoading, error }}
    >
      {children}
    </SupplyStatsContext.Provider>
  );
};

export const useSupplyStats = () => useContext(SupplyStatsContext);
