import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { fetchCurrentPrice } from '../services';
import { CurrentPriceContextType, CurrentPriceResponse } from '../types';

const CurrentPriceContext = createContext<CurrentPriceContextType>({
  price: null,
  isLoading: false,
});

interface CurrentPriceProviderProps {
  children: ReactNode;
}

export const CurrentPriceProvider: React.FC<CurrentPriceProviderProps> = ({
  children,
}) => {
  const [price, setPrice] = useState<CurrentPriceResponse | null>(null);
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

    fetchPrice();
  }, []);

  return (
    <CurrentPriceContext.Provider value={{ price, isLoading }}>
      {children}
    </CurrentPriceContext.Provider>
  );
};

export const useCurrentPrice = () => useContext(CurrentPriceContext);
