import { useSyncExternalStore } from 'react';
import type { ProductCart } from '@/features/cart/types.ts';

type StorageListResult<T> = {
  items: T[];
  saveItems: (items: T[]) => void;
};

const createStorageListHook = <T>(key: string) => {
  const subscribe = (callback: () => void) => {
    window.addEventListener(`${key}-updated`, callback);

    return () => {
      window.removeEventListener(`${key}-updated`, callback);
    };
  };

  const getSnapshot = () => {
    return localStorage.getItem(key) || '[]';
  };

  return function useStorageList(): StorageListResult<T> {
    const data = useSyncExternalStore(subscribe, getSnapshot);

    const items: T[] = JSON.parse(data);

    const saveItems = (updated: T[]) => {
      localStorage.setItem(key, JSON.stringify(updated));

      window.dispatchEvent(new Event(`${key}-updated`));
    };

    return {
      items,
      saveItems,
    };
  };
};

type FavoriteItem = string | number;

export const useCart = createStorageListHook<ProductCart>('cartStore');

export const useFavorites = createStorageListHook<FavoriteItem>('favorites');
