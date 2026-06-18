export type Language = 'en' | 'uk';

export type TranslationData = Record<string, string>;

type TranslationResponse = {
  id: string;
  data: TranslationData;
};

export const getTranslations = async (
  language: Language | string,
): Promise<TranslationData> => {
  const response = await fetch(
    'https://nice-gadgets-api-jj1e.onrender.com/translations',
  );

  if (!response.ok) {
    throw new Error('Failed to load translations');
  }

  const data: TranslationResponse[] = await response.json();

  const backendLangId = language === 'uk' ? 'ua' : language;

  const selectedTranslations = data.find((item) => item.id === backendLangId);

  return selectedTranslations?.data ?? {};
};
