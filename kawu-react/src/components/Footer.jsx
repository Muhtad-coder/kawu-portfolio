import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.14 0 3.5.01 4.73.07 1.03.05 1.6.22 1.97.36.5.19.85.42 1.22.79.37.37.6.72.79 1.22.14.37.31.94.36 1.97.06 1.23.07 1.59.07 4.73s-.01 3.5-.07 4.73c-.05 1.03-.22 1.6-.36 1.97-.19.5-.42.85-.79 1.22-.37.37-.72.6-1.22.79-.37.14-.94.31-1.97.36-1.23.06-1.59.07-4.73.07s-3.5-.01-4.73-.07c-1.03-.05-1.6-.22-1.97-.36a3.3 3.3 0 0 1-1.22-.79 3.3 3.3 0 0 1-.79-1.22c-.14-.37-.31-.94-.36-1.97-.06-1.23-.07-1.59-.07-4.73s.01-3.5.07-4.73c.05-1.03.22-1.6.36-1.97.19-.5.42-.85.79-1.22.37-.37.72-.6 1.22-.79.37-.14.94-.31 1.97-.36C8.5 2.21 8.86 2.2 12 2.2Zm0 1.8c-3.09 0-3.43.01-4.64.07-.85.04-1.31.18-1.62.3-.4.16-.7.34-1 .64-.3.3-.48.6-.64 1-.12.31-.26.77-.3 1.62-.06 1.21-.07 1.55-.07 4.64s.01 3.43.07 4.64c.04.85.18 1.31.3 1.62.16.4.34.7.64 1 .3.3.6.48 1 .64.31.12.77.26 1.62.3 1.21.06 1.55.07 4.64.07s3.43-.01 4.64-.07c.85-.04 1.31-.18 1.62-.3.4-.16.7-.34 1-.64.3-.3.48-.6.64-1 .12-.31.26-.77.3-1.62.06-1.21.07-1.55.07-4.64s-.01-3.43-.07-4.64c-.04-.85-.18-1.31-.3-1.62a2.6 2.6 0 0 0-.64-1 2.6 2.6 0 0 0-1-.64c-.31-.12-.77-.26-1.62-.3-1.21-.06-1.55-.07-4.64-.07Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm4.8-2.75a1.08 1.08 0 1 1 0 2.15 1.08 1.08 0 0 1 0-2.15Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2h3.3l-7.2 8.2L23.4 22h-6.9l-5.4-7.1L4.9 22H1.6l7.7-8.8L1 2h7.1l4.9 6.5L18.9 2Zm-1.2 18h1.8L6.4 4H4.6l13.1 16Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="brand-name">Sen. Kawu Sumaila OFR</p>
            <p className="brand-waraka">Waraka</p>
            <p className="tag">{t.footer.tag}</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="X (Twitter)"><XIcon /></a>
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            </div>
          </div>
          <div className="footer-nav">
            <div>
              <h4>{t.footer.navigate}</h4>
              <ul>
                <li><Link to="/about">{t.nav.about}</Link></li>
                <li><Link to="/achievements">{t.nav.achievements}</Link></li>
                <li><Link to="/news">{t.nav.news}</Link></li>
                <li><Link to="/contact">{t.nav.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t.footer.constituency}</h4>
              <ul>
                <li>{t.footer.location1}</li>
                <li>{t.footer.location2}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.created_by} <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Swift Limited</a></span>
          <span>{t.footer.abuja}</span>
        </div>
      </div>
    </footer>
  )
}
