"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageContextType {
  language: 'de' | 'en';
  setLanguage: (lang: 'de' | 'en') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const locale = useLocale() as 'de' | 'en';
  const router = useRouter();
  const pathname = usePathname();
  
  const [language, setLanguageState] = useState(locale);

  const handleSetLanguage = (lang: 'de' | 'en') => {
    setLanguageState(lang);
    const newPathname = pathname.replace(`/${locale}`, '');
    router.replace(`/${lang}${newPathname || '/'}`);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
