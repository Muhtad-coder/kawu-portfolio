import { createContext, useContext, useState } from 'react'
import en from '../i18n/en'
import ha from '../i18n/ha'

const translations = { en, ha }

const LanguageContext = createContext({})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  function toggle() {
    const next = lang === 'en' ? 'ha' : 'en'
    localStorage.setItem('lang', next)
    setLang(next)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
