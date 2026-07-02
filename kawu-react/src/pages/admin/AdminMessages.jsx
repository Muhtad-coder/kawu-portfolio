import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const smallBtn = (bg) => ({ background: bg, color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' })

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    setMessages(data || [])
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    load()
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Contact Messages</h1>

      {messages.length === 0 && (
        <p style={{ color: '#666' }}>No messages yet. Submissions from the contact form will appear here.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map(m => (
          <div key={m.id} style={{ background: '#fff', padding: '1.25rem 1.5rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div>
                <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{m.subject || '(No subject)'}</p>
                <p style={{ color: '#666', fontSize: '0.83rem' }}>
                  {m.name} · <a href={`mailto:${m.email}`} style={{ color: '#8b0000' }}>{m.email}</a> · {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => setExpanded(expanded === m.id ? null : m.id)} style={smallBtn('#444')}>
                  {expanded === m.id ? 'Hide' : 'Read'}
                </button>
                <button onClick={() => handleDelete(m.id)} style={smallBtn('#c00')}>Delete</button>
              </div>
            </div>
            {expanded === m.id && (
              <p style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', fontSize: '0.92rem', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{m.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
