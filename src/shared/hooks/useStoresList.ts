import { useEffect, useState } from 'react';
import { getStores, type Store } from '../api/stores';


export const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStores = async () => {
      setIsLoading(true);
      setError('');

      try {
        const res = await getStores();

        setStores(res.data);
      } catch {
        setError('Unable to load stores');
      } finally {
        setIsLoading(false);
      }
    };

    loadStores();
  }, []);

  return { stores, isLoading, error };
};