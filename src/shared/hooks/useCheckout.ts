import { useState } from 'react';
import { createOrder, type Order } from '@/shared/api/orders';

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (payload: Order) => {
    try {
      setLoading(true);
      setError(null);

      const res = await createOrder(payload);

      return res;
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    submitOrder,
    loading,
    error,
  };
};