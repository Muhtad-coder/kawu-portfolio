import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const navItems = [
  { path: '/admin/achievements', label: 'Achievements' },
  { path: '/admin/news', label: 'News' },
  { path: '/admin/home', label: 'Home Page' },
  { path: '/admin/about', label: 'About Page' },
  { path: '/admin/messages', label: 'Messages' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <aside style={{ width: '220px', background: '#1a1a1a', color: '#fff', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0 }}>
        <p style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', paddingLeft: '1rem' }}>Admin Panel</p>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: location.pathname === item.path ? '#fff' : '#aaa',
              background: location.pathname === item.path ? '#8b0000' : 'transparent',
              textDecoration: 'none',
              padding: '0.6rem 1rem',
              borderRadius: '4px',
              fontSize: '0.9rem',
            }}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #333', color: '#888', padding: '0.6rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}
        >
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: '2.5rem', background: '#f9f9f9', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
