import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCurrentPrice } from '../services';
import { CurrentPriceContextType, CurrentPriceResponse } from '../types';

interface CurrentPriceProviderProps {
  children: ReactNode;
  initialData: CurrentPriceResponse;
}

const CurrentPriceContext = createContext<CurrentPriceContextType>({
  price: null,
  isLoading: false,
});

export const CurrentPriceProvider: React.FC<CurrentPriceProviderProps> = ({
  children,
  initialData,
}) => {
  const [price, setPrice] = useState<CurrentPriceResponse | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrice = async () => {
      setIsLoading(true);
      try {
        const currentPrice = await fetchCurrentPrice();
        setPrice(currentPrice);
      } catch (error) {
        console.error('Failed to fetch current price:', error);
      }
      setIsLoading(false);
    };

    if (!initialData) {
      fetchPrice();
    }
  }, [initialData]);

  return (
    <CurrentPriceContext.Provider value={{ price, isLoading }}>
      {children}
    </CurrentPriceContext.Provider>
  );
};

export const useCurrentPrice = () => useContext(CurrentPriceContext);
