import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const STORAGE_KEY = 'sfa-language';
const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'ar' ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    try {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // Ignore storage failures (private browsing, disabled storage, etc.)
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      const entry = translations[key];
      let text = entry ? entry[language] ?? entry.en ?? key : key;
      if (vars) {
        Object.entries(vars).forEach(([varName, varValue]) => {
          text = text.replace(`{${varName}}`, varValue);
        });
      }
      return text;
    };

    const pick = (field) => {
      if (field && typeof field === 'object') {
        return field[language] ?? field.en ?? '';
      }
      return field;
    };

    return { language, setLanguage, t, pick };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
