import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import ImageCropper from '../../components/ImageCropper'
import { isValidYouTubeUrl } from '../../lib/youtube'

const inputStyle = { width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: 'inherit' }
const btn = (bg) => ({ background: bg, color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' })
const smallBtn = (bg) => ({ ...btn(bg), padding: '0.4rem 0.8rem', fontSize: '0.82rem' })

const CATEGORIES = ['Update', 'Press Release', 'Statement', 'Announcement', 'Media Coverage']

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.88rem', color: '#444' }}>{label}</label>
      {hint && <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.4rem' }}>{hint}</p>}
      {children}
    </div>
  )
}

const todayIso = () => new Date().toISOString().slice(0, 10)

const emptyForm = { slug: '', title: '', date: todayIso(), excerpt: '', body: '', featured_image: '', youtube_url: '', category: CATEGORIES[0], status: 'draft' }

export default function AdminNews() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [cropSrc, setCropSrc] = useState(null)
  const [croppedBlob, setCroppedBlob] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('news_posts').select('*').order('date', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  async function uploadImage(blob, filename) {
    const path = `news/${Date.now()}-${filename}`
    const { error } = await supabase.storage.from('site-images').upload(path, blob, { contentType: 'image/jpeg' })
    if (error) return null
    const { data } = supabase.storage.from('site-images').getPublicUrl(path)
    return data.publicUrl
  }

  function handleFileSelect(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCropSrc({ src: reader.result, filename: file.name })
    reader.readAsDataURL(file)
  }

  function handleCropConfirm(blob) {
    setCroppedBlob(blob)
    setCropSrc(null)
  }

  async function handleSave(e, statusOverride) {
    e.preventDefault()
    setError('')

    if (!form.title.trim() || !form.date || !form.body.trim()) {
      setError('Title, date and body are required.')
      return
    }
    if (form.youtube_url && !isValidYouTubeUrl(form.youtube_url)) {
      setError('That YouTube link doesn’t look valid. Use a youtube.com/watch, youtu.be, or youtube.com/shorts link.')
      return
    }

    setSaving(true)
    let imageUrl = form.featured_image
    if (croppedBlob) imageUrl = (await uploadImage(croppedBlob, cropSrc?.filename || 'news.jpg')) || imageUrl

    const payload = {
      ...form,
      featured_image: imageUrl,
      status: statusOverride || form.status,
    }

    const { error: saveError } = editing
      ? await supabase.from('news_posts').update(payload).eq('id', editing)
      : await supabase.from('news_posts').insert(payload)

    if (saveError) {
      setError(saveError.message.includes('duplicate') ? 'That slug is already in use — please choose a unique one.' : saveError.message)
      setSaving(false)
      return
    }

    setForm(emptyForm)
    setEditing(null)
    setShowForm(false)
    setCroppedBlob(null)
    setSaving(false)
    load()
  }

  function handleEdit(p) {
    setForm({ ...emptyForm, ...p, date: p.date?.slice(0, 10) || todayIso() })
    setEditing(p.id)
    setShowForm(true)
    setError('')
    window.scrollTo(0, 0)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this news post?')) return
    await supabase.from('news_posts').delete().eq('id', id)
    load()
  }

  async function handleToggleStatus(p) {
    await supabase.from('news_posts').update({ status: p.status === 'published' ? 'draft' : 'published' }).eq('id', p.id)
    load()
  }

  function handleCancel() {
    setForm(emptyForm)
    setEditing(null)
    setShowForm(false)
    setCroppedBlob(null)
    setError('')
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      {cropSrc && (
        <ImageCropper
          imageSrc={cropSrc.src}
          aspect={16 / 9}
          onConfirm={handleCropConfirm}
          onCancel={() => setCropSrc(null)}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>News</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={btn('#8b0000')}>+ Add News Post</button>
        )}
      </div>

      {showForm && (
        <form onSubmit={(e) => handleSave(e)} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>{editing ? 'Edit News Post' : 'New News Post'}</h2>

          {error && <p style={{ background: '#fdeaea', color: '#c00', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1.25rem', fontSize: '0.88rem' }}>{error}</p>}

          <Field label="Slug (unique URL path, no spaces e.g. petroleum-price-statement)">
            <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required style={inputStyle} />
          </Field>
          <Field label="Title">
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required style={inputStyle} />
          </Field>
          <Field label="Date">
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required style={{ ...inputStyle, width: '220px' }} />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Excerpt / summary" hint="Shown on the news listing card and used for search previews">
            <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} style={inputStyle} />
          </Field>
          <Field label="Body" hint="Separate paragraphs with a blank line">
            <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={8} required style={inputStyle} />
          </Field>
          <Field label="Featured image" hint="Optional. Upload and crop, or paste a URL">
            <input value={form.featured_image} onChange={e => setForm(f => ({ ...f, featured_image: e.target.value }))} placeholder="Image URL" style={{ ...inputStyle, marginBottom: '0.5rem' }} />
            <input type="file" accept="image/*" onChange={handleFileSelect} />
            {croppedBlob && <p style={{ fontSize: '0.82rem', color: 'green', marginTop: '0.4rem' }}>Image cropped and ready to upload.</p>}
          </Field>
          <Field label="YouTube link" hint="Optional. e.g. https://youtube.com/watch?v=... or https://youtu.be/...">
            <input value={form.youtube_url} onChange={e => setForm(f => ({ ...f, youtube_url: e.target.value }))} placeholder="https://youtube.com/watch?v=..." style={inputStyle} />
          </Field>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button type="submit" disabled={saving} style={btn('#555')}>{saving ? 'Saving...' : 'Save as Draft'}</button>
            <button type="button" disabled={saving} onClick={(e) => handleSave(e, 'published')} style={btn('#8b0000')}>{saving ? 'Saving...' : 'Publish'}</button>
            <button type="button" onClick={handleCancel} style={btn('#999')}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {posts.length === 0 && <p style={{ color: '#666' }}>No news posts yet.</p>}
        {posts.map(p => (
          <div key={p.id} style={{ background: '#fff', padding: '1.25rem 1.5rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{p.title}</p>
              <p style={{ color: '#666', fontSize: '0.83rem' }}>
                {p.date?.slice(0, 10)} · {p.category || 'Uncategorised'} ·{' '}
                <span style={{ fontWeight: 600, color: p.status === 'published' ? '#0a7a3d' : '#a06a00' }}>
                  {p.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button onClick={() => handleToggleStatus(p)} style={smallBtn(p.status === 'published' ? '#a06a00' : '#0a7a3d')}>
                {p.status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button onClick={() => handleEdit(p)} style={smallBtn('#444')}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={smallBtn('#c00')}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
