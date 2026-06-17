import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTranslations } from '@/features/translations/api/translations'

type TranslationContextType = {
  language: string;
  setLanguage: (language: string) => void;
  isLoading: boolean;
  t: (key: string) => string;
};

type Props = {
  children: React.ReactNode;
};

export const TranslationContext = createContext<
  TranslationContextType | undefined
>(undefined);

export const TranslationProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'en',
  );

  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('language', language);

    const loadTranslations = async () => {
      try {
        setIsLoading(true);

        const data = await getTranslations(language);

        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const t = useCallback(
    (key: string) => {
      return translations[key] ?? key;
    },
    [translations],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isLoading,
      t,
    }),
    [language, isLoading, t],
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};