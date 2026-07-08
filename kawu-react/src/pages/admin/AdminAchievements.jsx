import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import ImageCropper from '../../components/ImageCropper'

const inputStyle = { width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: 'inherit' }
const btn = (bg) => ({ background: bg, color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' })
const smallBtn = (bg) => ({ ...btn(bg), padding: '0.4rem 0.8rem', fontSize: '0.82rem' })

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.88rem', color: '#444' }}>{label}</label>
      {hint && <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.4rem' }}>{hint}</p>}
      {children}
    </div>
  )
}

const CONTENT_TYPES = ['Bill', 'Motion', 'Petition', 'Constituency Project']

const emptyForm = { slug: '', category: '', title: '', period: '', summary: '', impact: '', image: '', order_index: 0, content_type: '' }

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([])
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
    const { data } = await supabase.from('achievements').select('*').order('order_index')
    setAchievements(data || [])
    setLoading(false)
  }

  async function uploadImage(blob, filename) {
    const path = `achievements/${Date.now()}-${filename}`
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

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    let imageUrl = form.image
    if (croppedBlob) imageUrl = (await uploadImage(croppedBlob, cropSrc?.filename || 'image.jpg')) || imageUrl

    const payload = {
      ...form,
      impact: form.impact.split('\n').map(s => s.trim()).filter(Boolean),
      image: imageUrl,
      order_index: Number(form.order_index),
    }

    const { error: saveError } = editing
      ? await supabase.from('achievements').update(payload).eq('id', editing)
      : await supabase.from('achievements').insert(payload)

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

  function handleEdit(a) {
    setForm({ ...a, impact: a.impact.join('\n'), content_type: a.content_type || '' })
    setEditing(a.id)
    setShowForm(true)
    setError('')
    window.scrollTo(0, 0)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this achievement?')) return
    await supabase.from('achievements').delete().eq('id', id)
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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Achievements</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={btn('#8b0000')}>+ Add Achievement</button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSave} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>{editing ? 'Edit Achievement' : 'New Achievement'}</h2>

          {error && <p style={{ background: '#fdeaea', color: '#c00', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1.25rem', fontSize: '0.88rem' }}>{error}</p>}

          <Field label="Slug (unique ID, no spaces e.g. petroleum-downstream)">
            <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required style={inputStyle} />
          </Field>
          <Field label="Category">
            <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Committee Leadership" style={inputStyle} />
          </Field>
          <Field label="Content type" hint="Used by the filter chips on the public Achievements page">
            <select value={form.content_type} onChange={e => setForm(f => ({ ...f, content_type: e.target.value }))} style={inputStyle}>
              <option value="">— unset —</option>
              {CONTENT_TYPES.map(ct => <option key={ct} value={ct}>{ct}</option>)}
            </select>
          </Field>
          <Field label="Title">
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required style={inputStyle} />
          </Field>
          <Field label="Period">
            <input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="e.g. 10th Assembly · 2023" style={inputStyle} />
          </Field>
          <Field label="Summary">
            <textarea value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} rows={3} style={inputStyle} />
          </Field>
          <Field label="Impact points (one per line)">
            <textarea value={form.impact} onChange={e => setForm(f => ({ ...f, impact: e.target.value }))} rows={4} placeholder="One impact point per line" style={inputStyle} />
          </Field>
          <Field label="Image" hint="Upload and crop, or paste a URL">
            <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="Image URL" style={{ ...inputStyle, marginBottom: '0.5rem' }} />
            <input type="file" accept="image/*" onChange={handleFileSelect} />
            {croppedBlob && <p style={{ fontSize: '0.82rem', color: 'green', marginTop: '0.4rem' }}>Image cropped and ready to upload.</p>}
          </Field>
          <Field label="Order (lower = appears first)">
            <input type="number" value={form.order_index} onChange={e => setForm(f => ({ ...f, order_index: e.target.value }))} style={{ ...inputStyle, width: '120px' }} />
          </Field>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" disabled={saving} style={btn('#8b0000')}>{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={handleCancel} style={btn('#555')}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {achievements.map(a => (
          <div key={a.id} style={{ background: '#fff', padding: '1.25rem 1.5rem', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{a.title}</p>
              <p style={{ color: '#666', fontSize: '0.83rem' }}>{a.category} · {a.content_type || 'No type'} · {a.period} · Order: {a.order_index}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button onClick={() => handleEdit(a)} style={smallBtn('#444')}>Edit</button>
              <button onClick={() => handleDelete(a.id)} style={smallBtn('#c00')}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
