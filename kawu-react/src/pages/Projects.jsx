import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import { useLanguage } from '../contexts/LanguageContext'

function CheckIcon() {
  return (
    <svg
      className="check-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

export default function Projects() {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchAchievements() {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('order_index', { ascending: true })

      if (!error) setAchievements(data)
      setLoading(false)
    }

    fetchAchievements()
  }, [])

  return (
    <>
      <SEO
        title="Achievements"
        description="From the 6th House of Representatives to the 10th Senate — bills sponsored, motions moved, and committees led on behalf of the people of Kano South."
        path="/achievements"
      />
      <section className="projects-hero">
        <div className="container projects-hero-inner">
          <p className="projects-eyebrow">{t.projects_page.eyebrow}</p>
          <h1>{t.projects_page.heading}</h1>
          <p className="projects-lede">{t.projects_page.lede}</p>
        </div>
        <div className="projects-flag-stripe" />
      </section>

      <section className="container projects-list">
        {loading ? (
          <p>{t.projects_page.loading}</p>
        ) : (
          <div className="projects-articles">
            {achievements.map((p, i) => (
              <article
                key={p.slug}
                className={`project-article${i % 2 === 1 ? ' project-article--reverse' : ''}`}
              >
                <div className="project-img-wrap">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" />
                  ) : (
                    <div className="project-img-fallback" />
                  )}
                </div>
                <div className="project-body">
                  <p className="project-cat">{p.category}</p>
                  <h2 className="project-title">{p.title}</h2>
                  <p className="project-period">{p.period}</p>
                  <p className="project-summary">{p.summary}</p>
                  <ul className="project-impact">
                    {p.impact.map((line) => (
                      <li key={line}>
                        <CheckIcon />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="projects-footnote">{t.projects_page.footnote}</p>
      </section>
    </>
  )
}
