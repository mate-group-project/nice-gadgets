import { useEffect, useState } from 'react';

export function useHomeData() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');
    };

    loadData().then(() => {});
  }, []);
}
