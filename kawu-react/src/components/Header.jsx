import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle, t } = useLanguage()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header>
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-name">Sen. Kawu Sumaila OFR</span>
          <span className="brand-waraka">Waraka &mdash; Kano South Senatorial District</span>
        </Link>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>{t.nav.home}</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{t.nav.about}</Link>
          <Link to="/achievements" className={location.pathname === '/achievements' ? 'active' : ''}>{t.nav.achievements}</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{t.nav.contact}</Link>
          <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
            {lang === 'en' ? 'HA' : 'EN'}
          </button>
        </nav>
        <div className="header-right">
          <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
            {lang === 'en' ? 'HA' : 'EN'}
          </button>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>{t.nav.home}</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>{t.nav.about}</Link>
          <Link to="/achievements" className={location.pathname === '/achievements' ? 'active' : ''} onClick={closeMenu}>{t.nav.achievements}</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>{t.nav.contact}</Link>
        </nav>
      )}
    </header>
  )
}
