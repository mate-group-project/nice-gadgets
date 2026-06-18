import { useEffect, useState } from 'react';
import { client } from '@/shared/api/client.ts';

export function useHomeData() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const res = await client.get('home')

        console.log(res)
      }
    };

    loadData().then(() => {});
  }, []);

  return { isLoading, error };
}
