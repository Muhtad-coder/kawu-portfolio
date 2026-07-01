import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 5 * 60 * 1000 // 5 minutes

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState(null)
  const [countdown, setCountdown] = useState(0)
  const navigate = useNavigate()
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!lockedUntil) return
    intervalRef.current = setInterval(() => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000)
      if (remaining <= 0) {
        setLockedUntil(null)
        setAttempts(0)
        setCountdown(0)
        clearInterval(intervalRef.current)
      } else {
        setCountdown(remaining)
      }
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [lockedUntil])

  async function handleSubmit(e) {
    e.preventDefault()
    if (lockedUntil) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      const newAttempts = attempts + 1
      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_MS
        setLockedUntil(until)
        setCountdown(LOCKOUT_MS / 1000)
        setError(`Too many failed attempts. Locked for 5 minutes.`)
      } else {
        setAttempts(newAttempts)
        setError(`${error.message} (${MAX_ATTEMPTS - newAttempts} attempt${MAX_ATTEMPTS - newAttempts === 1 ? '' : 's'} remaining)`)
      }
      setLoading(false)
    } else {
      navigate('/admin/achievements')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', fontFamily: 'system-ui, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 2px 16px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.4rem', fontWeight: 700 }}>Admin Login</h1>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>Kawu Sumaila Portfolio</p>
        {error && <p style={{ color: '#c00', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.9rem' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.9rem' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !!lockedUntil}
          style={{ width: '100%', padding: '0.75rem', background: lockedUntil ? '#999' : '#8b0000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: lockedUntil ? 'not-allowed' : 'pointer', fontWeight: 600 }}
        >
          {loading ? 'Logging in...' : lockedUntil ? `Locked (${countdown}s)` : 'Login'}
        </button>
      </form>
    </div>
  )
}
