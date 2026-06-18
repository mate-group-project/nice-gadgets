import { useEffect, useState } from 'react';
import {
  getOrdersByEmail,
  updateUserPassword,
  type StoredUser,
} from '@/features/auth/api/account';
import { getProductsList } from '@/features/products/api/products';
import type { Product } from '@/features/products/types/Product';

export const useAccount = () => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    const currentUser: StoredUser | null = stored ? JSON.parse(stored) : null;

    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    setUser(currentUser);

    getOrdersByEmail(currentUser.customer.email)
      .then((orders) => {
        const productIds = new Set(
          orders.flatMap((order) => order.items.map((item) => item.productId)),
        );

        return getProductsList({ perPage: '1000' }).then((allProducts) => {
          const data =
            Array.isArray(allProducts) ? allProducts : allProducts.data;
          setProducts(data.filter((product) => productIds.has(product.id)));
        });
      })
      .catch((err) => {
        console.log('Error:', err);
        setError('Unable to load account data');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const changePassword = (newPassword: string) => {
    if (!user) return;

    setIsLoading(true);
    setError('');

    updateUserPassword(user.id, newPassword, user)
      .then(() => {
        const updated = {
          ...user,
          customer: { ...user.customer, password: newPassword },
        };
        setUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
      })
      .catch(() => setError('Unable to change password'))
      .finally(() => setIsLoading(false));
  };

  return { user, products, isLoading, error, changePassword };
};
