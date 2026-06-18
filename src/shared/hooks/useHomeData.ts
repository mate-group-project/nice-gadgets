import { useEffect, useState, useSyncExternalStore } from 'react';
import { client } from '@/shared/api/client.ts';

export type TextLang = {
  en: string;
  uk: string;
};

export type CategoryLang = {
  image: string;
  name: string;
  title: TextLang;
};

export type SlideLang = {
  title: TextLang;
  text: TextLang;
  button: TextLang;
  video: string;
};

export type DataLang = {
  slides: SlideLang[];
  categories: CategoryLang[];
};

const subscribe = (callback: () => void) => {
  window.addEventListener('language-updated', callback);

  return () => {
    window.removeEventListener('language-updated', callback);
  };
};

const getSnapshot = () => {
  return localStorage.getItem('language') || 'en';
};

export function useHomeData() {
  const [slides, setSlides] = useState<SlideLang[]>([]);
  const [categories, setCategories] = useState<CategoryLang[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const language = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const res: DataLang = await client.get('/home');

        setSlides(res.slides);
        setCategories(res.categories);
      } catch {
        setError('Unable to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData().then(() => {});
  }, [language]);

  return { slides, categories, language, isLoading, error };
}
