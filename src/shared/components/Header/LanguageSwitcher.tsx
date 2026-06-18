import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import './LanguageSwitcher.scss';
import { useTranslation } from '@/features/translations/hooks/useTranslation'; // Проверь этот путь к хуку
import type { Language } from '@/features/translations/api/translation'; // Импортируем типы 'en' | 'uk'

interface LanguageSwitcherProps {
  onLanguageSelect?: () => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onLanguageSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { language, setLanguage } = useTranslation();
  const currentLang = language as Language;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
    if (onLanguageSelect) {
      onLanguageSelect();
    }
  };

  const languages = {
    en: {
      label: 'English',
      flagUrl: 'https://hatscripts.github.io/circle-flags/flags/gb.svg',
    },
    uk: {
      label: 'Українська',
      flagUrl: 'https://hatscripts.github.io/circle-flags/flags/ua.svg',
    },
  };

  return (
    <div
      className="lang-switcher"
      ref={dropdownRef}
    >
      <button
        type="button"
        className={cn('lang-switcher__trigger', {
          'lang-switcher__trigger--open': isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={languages[currentLang]?.flagUrl || languages.en.flagUrl}
          alt={currentLang}
          className="lang-switcher__current-flag"
        />
        <span className="lang-switcher__arrow">▼</span>
      </button>

      {isOpen && (
        <div className="lang-switcher__dropdown">
          {(Object.keys(languages) as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              className={cn('lang-switcher__option', {
                'lang-switcher__option--active': currentLang === lang,
              })}
              onClick={() => handleLangChange(lang)}
            >
              <img
                src={languages[lang].flagUrl}
                alt={lang}
                className="lang-switcher__dropdown-flag"
              />
              <span className="lang-switcher__option-label">
                {languages[lang].label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
