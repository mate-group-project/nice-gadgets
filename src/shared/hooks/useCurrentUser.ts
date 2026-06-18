import { useEffect, useState } from 'react';

const STORAGE_KEY = 'currentUser';

type StoredUser = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  id?: string;
  password?: string;
};

const getUserFromStorage = (): StoredUser | null => {
  if (typeof window === 'undefined') return null;

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Invalid currentUser JSON', e);
    return null;
  }
};

export const useCurrentUser = () => {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      const id = window.setTimeout(() => {
        setUser(storedUser);
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, []);

  const customer = user?.customer ?? {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  return {
    user,
    customer,
  };
};
