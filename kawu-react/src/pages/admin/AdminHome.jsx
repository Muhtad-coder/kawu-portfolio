import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import ImageCropper from '../../components/ImageCropper'

const inputStyle = { width: '100%', padding: '0.65rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: 'inherit' }
const btn = (bg) => ({ background: bg, color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' })

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500, fontSize: '0.88rem', color: '#444' }}>{label}</label>
      {hint && <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.4rem' }}>{hint}</p>}
      {children}
    </div>
  )
}

const KEYS = ['home_eyebrow', 'home_title', 'home_lede', 'home_hero_image', 'home_letter_title', 'home_letter_body']

export default function AdminHome() {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [cropSrc, setCropSrc] = useState(null)
  const [croppedBlob, setCroppedBlob] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('site_content').select('key, value').in('key', KEYS)
    const map = {}
    data?.forEach(({ key, value }) => { map[key] = value })
    setContent(map)
    setLoading(false)
  }

  function set(key, value) {
    setContent(c => ({ ...c, [key]: value }))
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

  async function uploadImage(blob, filename) {
    const path = `home/${Date.now()}-${filename}`
    const { error } = await supabase.storage.from('site-images').upload(path, blob, { contentType: 'image/jpeg' })
    if (error) return null
    const { data } = supabase.storage.from('site-images').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)

    let heroImage = content.home_hero_image
    if (croppedBlob) heroImage = (await uploadImage(croppedBlob, cropSrc?.filename || 'hero.jpg')) || heroImage

    const updates = { ...content, home_hero_image: heroImage }
    const upserts = Object.entries(updates).map(([key, value]) => ({ key, value }))
    await supabase.from('site_content').upsert(upserts, { onConflict: 'key' })

    setSaving(false)
    setSaved(true)
    setCroppedBlob(null)
    setTimeout(() => setSaved(false), 3000)
    load()
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

      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Home Page</h1>
      <form onSubmit={handleSave}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#8b0000' }}>Hero Section</h2>
          <Field label="Eyebrow text">
            <input value={content.home_eyebrow || ''} onChange={e => set('home_eyebrow', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Main heading">
            <input value={content.home_title || ''} onChange={e => set('home_title', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Lede paragraph">
            <textarea value={content.home_lede || ''} onChange={e => set('home_lede', e.target.value)} rows={3} style={inputStyle} />
          </Field>
          <Field label="Hero image" hint="Upload and crop, or paste a URL">
            {content.home_hero_image && !croppedBlob && (
              <img src={content.home_hero_image} alt="Current hero" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.75rem' }} />
            )}
            {croppedBlob && <p style={{ fontSize: '0.82rem', color: 'green', marginBottom: '0.5rem' }}>Image cropped and ready to upload.</p>}
            <input value={content.home_hero_image || ''} onChange={e => set('home_hero_image', e.target.value)} placeholder="Image URL" style={{ ...inputStyle, marginBottom: '0.5rem' }} />
            <input type="file" accept="image/*" onChange={handleFileSelect} />
          </Field>
        </div>

        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#8b0000' }}>Letter Section</h2>
          <Field label="Letter title">
            <input value={content.home_letter_title || ''} onChange={e => set('home_letter_title', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Letter body" hint="Separate paragraphs with a blank line">
            <textarea value={content.home_letter_body || ''} onChange={e => set('home_letter_body', e.target.value)} rows={8} style={inputStyle} />
          </Field>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" disabled={saving} style={btn('#8b0000')}>{saving ? 'Saving...' : 'Save Changes'}</button>
          {saved && <p style={{ color: 'green', fontSize: '0.9rem' }}>Saved successfully.</p>}
        </div>
      </form>
    </div>
  )
}
