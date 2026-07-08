import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import CountUp from '../components/CountUp'
import { useLanguage } from '../contexts/LanguageContext'

const DEFAULTS = {
  home_eyebrow: 'Office of Senator Kawu Sumaila \u00b7 OFR',
  home_title: 'Service to Kano South,\nfrom Sumaila to Abuja.',
  home_lede: 'Three terms in the House of Representatives. Deputy Minority Leader of the 6th and 7th Assemblies. Today, Senator for the people of Kano South.',
  home_hero_image: '/assets/rally.jpg',
  home_constituency_projects: '0',
  home_letter_title: 'The mandate of Kano South is sacred.',
  home_letter_body: 'From Sumaila Gabas Primary School to the floor of the Senate, my journey has been shaped by the people of Kano South \u2014 by their patience, their resilience and their unshakeable belief in a better future.\n\nAcross three terms in the House of Representatives, and now in the Senate of the 10th National Assembly, the work has remained the same: bring our share of national development home, and represent our values honestly in Abuja.\n\nThis site is a record of that work, and an open door to my office.',
  home_eyebrow_ha: 'Ofishin Sanata Kawu Sumaila \u00b7 OFR',
  home_title_ha: 'Hidima ga Kudu Kano,\ndaga Sumaila zuwa Abuja.',
  home_lede_ha: "Wa\u2019adi uku a Majalisar Wakilai. Mataimakin Shugaban \u2018Yan Tsiraru na Majalisun 6 da 7. A yau, Sanata don mutanen Kudu Kano.",
  home_letter_title_ha: 'Aikin da mutanen Kudu Kano suka ba ni mai tsarki ne.',
  home_letter_body_ha: "Daga Makarantar Firamare ta Sumaila Gabas zuwa dandamalin Majalisar Dattawa, mutanen Kudu Kano ne suka tsara tafiyata \u2014 ta hanyar ha\u0253urinsu, \u0263arfinsu, da imanansu mar\u0323ar girg\u0323iza ga makomar da ta fi kyau.\n\nA cikin wa\u2019adi uku a Majalisar Wakilai, kuma yanzu a Majalisar Dattawa ta Majalisar \u0266asa ta 10, aikin ya kasance \u0257aya: kawo rabonmu na ci gaban \u0266asa gida, kuma mu wakilci \u0266imominmu da gaskiya a Abuja.\n\nWannan shafin tarihin wannan aiki ne, kuma \u0253ofa ce bu\u0257a\u0257\u0257iya zuwa ofishina.",
}

const KEYS = Object.keys(DEFAULTS)

export default function Home() {
  const [content, setContent] = useState(DEFAULTS)
  const [heroImageReady, setHeroImageReady] = useState(false)
  const [featuredAchievements, setFeaturedAchievements] = useState([])
  const [billCount, setBillCount] = useState(0)
  const [motionCount, setMotionCount] = useState(0)
  const { lang, t } = useLanguage()

  useEffect(() => {
    supabase.from('site_content').select('key, value').in('key', KEYS).then(({ data }) => {
      if (data?.length) {
        const map = {}
        data.forEach(({ key, value }) => { map[key] = value })
        setContent(c => ({ ...c, ...map }))
      }
      setHeroImageReady(true)
    })

    supabase.from('achievements').select('*').order('order_index', { ascending: true }).limit(3).then(({ data }) => {
      setFeaturedAchievements(data || [])
    })

    supabase.from('achievements').select('id').eq('content_type', 'Bill').then(({ data }) => {
      setBillCount(data?.length || 0)
    })

    supabase.from('achievements').select('id').eq('content_type', 'Motion').then(({ data }) => {
      setMotionCount(data?.length || 0)
    })
  }, [])

  const isHausa = lang === 'ha'
  const eyebrow = isHausa ? content.home_eyebrow_ha : content.home_eyebrow
  const title = isHausa ? content.home_title_ha : content.home_title
  const lede = isHausa ? content.home_lede_ha : content.home_lede
  const letterTitle = isHausa ? content.home_letter_title_ha : content.home_letter_title
  const letterBody = isHausa ? content.home_letter_body_ha : content.home_letter_body

  const letterParagraphs = letterBody.split(/\n\n+/).filter(Boolean)

  return (
    <>
      <SEO
        description="Three terms in the House of Representatives. Deputy Minority Leader of the 6th and 7th Assemblies. Today, Senator for the people of Kano South."
        image="/assets/rally.jpg"
        path="/"
      />
      <section className="hero">
        <div className="hero-photo-bg">
          {heroImageReady && (
            <img src={content.home_hero_image} alt="Senator Kawu Sumaila greeting supporters at a Waraka rally" />
          )}
        </div>
        <div className="hero-bg"></div>
        <div className="hero-bg-bottom"></div>
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="lede">{lede}</p>
            <div className="waraka-seal">WARAKA</div>
            <div className="hero-cta">
              <Link to="/about" className="btn btn-primary">{t.hero.cta_record}</Link>
              <Link to="/contact" className="btn btn-outline">{t.hero.cta_contact}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container letter">
        <div>
          <p className="label">{t.letter.label}</p>
          <h2>{letterTitle}</h2>
        </div>
        <div className="letter-body">
          {letterParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="signature">{t.letter.signature}</p>
        </div>
      </section>

      <section className="achievements">
        <div className="container">
          <div className="ach-head">
            <div>
              <p className="label" style={{ color: '#8b0000' }}>{t.home_achievements.label}</p>
              <h2>{t.home_achievements.heading}</h2>
            </div>
            <Link to="/achievements" className="ach-link">{t.home_achievements.view_all}</Link>
          </div>
          <div className="ach-grid">
            {featuredAchievements.map((a) => (
              <article className="ach-card" key={a.slug}>
                <div className="ach-img">
                  {a.image && <img src={a.image} alt={a.title} loading="lazy" />}
                </div>
                <div className="ach-content">
                  <p className="ach-cat">{a.category}</p>
                  <h3>{a.title}</h3>
                  <p className="summary">{a.summary}</p>
                  <p className="ach-period">{a.period}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-bg"></div>
        <div className="container stats-grid">
          <div className="stat">
            <div className="n">3</div>
            <div className="l">{t.stats.terms}</div>
          </div>
          <div className="stat">
            <div className="n">2&times;</div>
            <div className="l">{t.stats.deputy}</div>
          </div>
          <div className="stat">
            <div className="n">10th</div>
            <div className="l">{t.stats.assembly}</div>
          </div>
          <div className="stat">
            <div className="n">OFR</div>
            <div className="l">{t.stats.honour}</div>
          </div>
        </div>
      </section>

      <section className="legislative-record">
        <div className="container">
          <p className="label" style={{ color: '#8b0000' }}>{t.legislative_record.label}</p>
          <h2>{t.legislative_record.heading}</h2>
          <div className="record-grid">
            <div className="record-stat">
              <div className="n"><CountUp end={billCount} /></div>
              <div className="l">{t.legislative_record.bills}</div>
            </div>
            <div className="record-stat">
              <div className="n"><CountUp end={motionCount} /></div>
              <div className="l">{t.legislative_record.motions}</div>
            </div>
            <div className="record-stat">
              <div className="n"><CountUp end={Number(content.home_constituency_projects) || 0} /></div>
              <div className="l">{t.legislative_record.projects}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
