import { useState } from 'react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import { useLanguage } from '../contexts/LanguageContext'

const emptyForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle')

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    })
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm(emptyForm)
    }
  }

  return (
    <>
      <SEO
        title={t.nav.contact}
        description="Contact the office of Sen. Kawu Sumaila, Senator for Kano South Senatorial District."
        path="/contact"
      />
      <section className="container contact-page">
        <div className="contact-info">
          <p className="about-label">{t.contact_page.eyebrow}</p>
          <h1 className="contact-title">{t.contact_page.heading}</h1>
          <p className="contact-lede">{t.contact_page.lede}</p>
          <div className="info-grid contact-offices">
            <div className="info-block">
              <p className="info-label">{t.footer.constituency}</p>
              <ul>
                <li>{t.footer.location1}</li>
                <li>{t.footer.location2}</li>
              </ul>
            </div>
            <div className="info-block">
              <p className="info-label">{t.contact_page.abuja_office}</p>
              <ul>
                <li>{t.footer.abuja}</li>
              </ul>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="contact-name">{t.contact_page.name}</label>
            <input id="contact-name" type="text" value={form.name} onChange={set('name')} required maxLength={120} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">{t.contact_page.email}</label>
            <input id="contact-email" type="email" value={form.email} onChange={set('email')} required maxLength={200} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-subject">{t.contact_page.subject}</label>
            <input id="contact-subject" type="text" value={form.subject} onChange={set('subject')} placeholder={t.contact_page.subject_placeholder} maxLength={200} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">{t.contact_page.message}</label>
            <textarea id="contact-message" value={form.message} onChange={set('message')} required rows={7} maxLength={4000} />
          </div>
          <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'sending'}>
            {status === 'sending' ? t.contact_page.sending : t.contact_page.send}
          </button>
          {status === 'success' && <p className="form-status form-status--success" role="status">{t.contact_page.success}</p>}
          {status === 'error' && <p className="form-status form-status--error" role="alert">{t.contact_page.error}</p>}
        </form>
      </section>
    </>
  )
}
