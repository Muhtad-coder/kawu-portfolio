import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <header>
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-name">Sen. Kawu Sumaila OFR</span>
          <span className="brand-waraka">Waraka &mdash; Kano South Senatorial District</span>
        </Link>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/achievements" className={location.pathname === '/achievements' ? 'active' : ''}>Achievements</Link>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  )
}
