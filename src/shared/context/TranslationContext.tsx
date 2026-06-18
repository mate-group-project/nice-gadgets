import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTranslations } from '@/features/translations/api/translation';

type TranslationContextType = {
  language: string;
  setLanguage: (language: string) => void;
  isLoading: boolean;
  t: (key: string) => string;
};

type Props = {
  children: React.ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
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

        console.log(data);

        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations().then(() => {});
  }, [language]);

  const t = useCallback(
    (key: string) => {
      const value = key.split('.').reduce<unknown>((acc, part) => {
        if (acc && typeof acc === 'object' && part in acc) {
          return (acc as Record<string, unknown>)[part];
        }

        return undefined;
      }, translations);
      return typeof value === 'string' ? value : '';
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
