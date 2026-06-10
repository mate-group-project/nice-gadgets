import { useSyncExternalStore } from "react";

type Id = string | number;

type StorageListResult = {
  items: Id[];
  saveItems: (items: Id[]) => void;
};

const createStorageListHook = (key: string) => {
  const subscribe = (callback: () => void) => {
    window.addEventListener(`${key}-updated`, callback);

    return () => {
      window.removeEventListener(`${key}-updated`, callback);
    };
  };

  const getSnapshot = () => {
    return localStorage.getItem(key) || '[]';
  };

  return function useStorageList(): StorageListResult {
    const data = useSyncExternalStore(
      subscribe,
      getSnapshot
    );

    const items: Id[] = JSON.parse(data);

    const saveItems = (updated: Id[]) => {
      localStorage.setItem(
        key,
        JSON.stringify(updated)
      );

      window.dispatchEvent(
        new Event(`${key}-updated`)
      );
    };

    return {
      items,
      saveItems,
    };
  };
};

export const useCart = createStorageListHook('cart');

export const useFavorites = createStorageListHook('favorites');