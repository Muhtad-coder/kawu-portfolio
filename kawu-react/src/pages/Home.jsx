import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'

const DEFAULTS = {
  home_eyebrow: 'Office of Senator Kawu Sumaila \u00b7 OFR',
  home_title: 'Service to Kano South,\nfrom Sumaila to Abuja.',
  home_lede: 'Three terms in the House of Representatives. Deputy Minority Leader of the 6th and 7th Assemblies. Today, Senator for the people of Kano South.',
  home_hero_image: '/assets/rally.jpg',
  home_letter_title: 'The mandate of Kano South is sacred.',
  home_letter_body: 'From Sumaila Gabas Primary School to the floor of the Senate, my journey has been shaped by the people of Kano South \u2014 by their patience, their resilience and their unshakeable belief in a better future.\n\nAcross three terms in the House of Representatives, and now in the Senate of the 10th National Assembly, the work has remained the same: bring our share of national development home, and represent our values honestly in Abuja.\n\nThis site is a record of that work, and an open door to my office.',
}

const KEYS = Object.keys(DEFAULTS)

export default function Home() {
  const [content, setContent] = useState(DEFAULTS)

  useEffect(() => {
    supabase.from('site_content').select('key, value').in('key', KEYS).then(({ data }) => {
      if (data?.length) {
        const map = {}
        data.forEach(({ key, value }) => { map[key] = value })
        setContent(c => ({ ...c, ...map }))
      }
    })
  }, [])

  const letterParagraphs = content.home_letter_body.split(/\n\n+/).filter(Boolean)

  return (
    <>
      <SEO
        description="Three terms in the House of Representatives. Deputy Minority Leader of the 6th and 7th Assemblies. Today, Senator for the people of Kano South."
        image="/assets/rally.jpg"
        path="/"
      />
      <section className="hero">
        <div className="hero-photo-bg">
          <img src={content.home_hero_image} alt="Senator Kawu Sumaila greeting supporters at a Waraka rally" />
        </div>
        <div className="hero-bg"></div>
        <div className="hero-bg-bottom"></div>
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">{content.home_eyebrow}</p>
            <h1>{content.home_title}</h1>
            <p className="lede">{content.home_lede}</p>
            <div className="waraka-seal">WARAKA</div>
            <div className="hero-cta">
              <Link to="/about" className="btn btn-primary">See the record &rarr;</Link>
              <a href="#" className="btn btn-outline">Contact the office</a>
            </div>
          </div>
        </div>
      </section>

      <section className="container letter">
        <div>
          <p className="label">A note from the Senator</p>
          <h2>{content.home_letter_title}</h2>
        </div>
        <div className="letter-body">
          {letterParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="signature">&mdash; Sen. Suleiman Abdurrahman Kawu Sumaila, OFR</p>
        </div>
      </section>

      <section className="achievements">
        <div className="container">
          <div className="ach-head">
            <div>
              <p className="label" style={{ color: '#8b0000' }}>Selected achievements</p>
              <h2>Leadership in the National Assembly.</h2>
            </div>
            <Link to="/achievements" className="ach-link">View all &rarr;</Link>
          </div>
          <div className="ach-grid">
            <article className="ach-card">
              <div className="ach-img"></div>
              <div className="ach-content">
                <p className="ach-cat">Committee Leadership</p>
                <h3>Senate Committee on Petroleum (Downstream)</h3>
                <p className="summary">Chairs the Senate Committee on Petroleum (Downstream), with oversight of refining, distribution and the policy direction of Nigeria's downstream oil and gas sector.</p>
                <p className="ach-period">10th Assembly &middot; 2023 &ndash; present</p>
              </div>
            </article>
            <article className="ach-card">
              <div className="ach-img"></div>
              <div className="ach-content">
                <p className="ach-cat">Constitutional Reform</p>
                <h3>Amendment of Section 145 of the Constitution</h3>
                <p className="summary">Sponsored legislative work on the amendment of Section 145 of the 1999 Constitution to provide for orderly transfer of power in the event of incapacity of the principal.</p>
                <p className="ach-period">House of Representatives &middot; 2007 &ndash; 2015</p>
              </div>
            </article>
            <article className="ach-card">
              <div className="ach-img"></div>
              <div className="ach-content">
                <p className="ach-cat">Legislative Reform</p>
                <h3>Financial Autonomy for State Houses of Assembly</h3>
                <p className="summary">Backed reforms granting State Houses of Assembly financial autonomy, separating their funding from the discretion of state executives.</p>
                <p className="ach-period">House of Representatives</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-bg"></div>
        <div className="container stats-grid">
          <div className="stat">
            <div className="n">3</div>
            <div className="l">Terms in the House of Representatives</div>
          </div>
          <div className="stat">
            <div className="n">2&times;</div>
            <div className="l">Deputy Minority Leader (6th &amp; 7th)</div>
          </div>
          <div className="stat">
            <div className="n">10th</div>
            <div className="l">Assembly &middot; Senator, Kano South</div>
          </div>
          <div className="stat">
            <div className="n">OFR</div>
            <div className="l">Order of the Federal Republic, 2012</div>
          </div>
        </div>
      </section>
    </>
  )
}
