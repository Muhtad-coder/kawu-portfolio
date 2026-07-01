import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header>
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-name">Sen. Kawu Sumaila OFR</span>
          <span className="brand-waraka">Waraka &mdash; Kano South Senatorial District</span>
        </Link>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/achievements" className={location.pathname === '/achievements' ? 'active' : ''}>Achievements</Link>
          <a href="#">Contact</a>
        </nav>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>About</Link>
          <Link to="/achievements" className={location.pathname === '/achievements' ? 'active' : ''} onClick={closeMenu}>Achievements</Link>
          <a href="#" onClick={closeMenu}>Contact</a>
        </nav>
      )}
    </header>
  )
}
