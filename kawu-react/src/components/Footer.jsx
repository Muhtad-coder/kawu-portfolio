import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="brand-name">Sen. Kawu Sumaila OFR</p>
            <p className="brand-waraka">Waraka</p>
            <p className="tag">Turakin Sumaila &middot; Senator for Kano South Senatorial District, Federal Republic of Nigeria.</p>
          </div>
          <div className="footer-nav">
            <div>
              <h4>Navigate</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/achievements">Achievements</Link></li>
                <li><a href="#">Contact the Office</a></li>
              </ul>
            </div>
            <div>
              <h4>Constituency office</h4>
              <ul>
                <li>Sumaila Town, Sumaila LGA</li>
                <li>Kano State, Nigeria</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Office of Sen. Kawu Sumaila. All rights reserved.</span>
          <span>Kano South &middot; National Assembly Complex, Abuja.</span>
        </div>
      </div>
    </footer>
  )
}
