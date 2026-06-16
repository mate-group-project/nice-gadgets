import { useEffect, useState } from 'react';
import { getCategoryList } from './categories';
import type { Category } from '../types/Category';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategoryList()
      .then(setCategories)
      .catch(() => setError('Failed to load categories'))
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, error, isLoading };
};
