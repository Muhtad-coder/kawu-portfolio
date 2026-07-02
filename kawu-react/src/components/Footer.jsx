import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

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
          </div>
          <div className="footer-nav">
            <div>
              <h4>{t.footer.navigate}</h4>
              <ul>
                <li><Link to="/about">{t.nav.about}</Link></li>
                <li><Link to="/achievements">{t.nav.achievements}</Link></li>
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
