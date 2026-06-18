import { useEffect, useState } from 'react';

export const useAuthUser = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const update = () => {
      const stored = localStorage.getItem('currentUser');
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener('authChange', update);
    return () => window.removeEventListener('authChange', update);
  }, []);

  return user;
};
