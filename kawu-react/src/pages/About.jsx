import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const DEFAULTS = {
  about_title: 'From Sumaila Village to the Senate.',
  about_portrait: '/assets/portrait.jpg',
  about_bio: 'Suleiman Abdurrahman, popularly known as Kawu Sumaila (OFR), was born on 3 March 1968 in Sumaila Village, Kano State, to Alhaji Abdurrahman Tadu and Hajiya Maryam Muhammad. He is a Nigerian politician, businessman and school proprietor.\n\nHe represents Kano South Senatorial District at the 10th Nigerian National Assembly. Before his election to the Senate, he served three consecutive terms in the House of Representatives for Sumaila/Takai Federal Constituency, where he was Deputy Minority Leader of the 6th and 7th Houses.\n\nBetween 2015 and 2019 he served as Senior Special Assistant to President Muhammadu Buhari on House of Representatives Matters. In 2012 he was conferred with the national honour of the Order of the Federal Republic (OFR) by President Goodluck Jonathan, and in 2006 he received the traditional title of Turakin Sumaila from the Kano Emirate.',
  about_education: 'PhD, Political Science — Al-Qalam University, Katsina\nMSc, Political Science — Maryam Abacha American University\nMSc, Developmental Studies — Bayero University, Kano\nMSc, Leadership Studies — Nigerian Defence Academy\nBA, Islamic Studies — National Open University of Nigeria\nExecutive certificates from Harvard, Oxford, Cambridge and Bayero University, Kano',
  about_career: 'Senator, Kano South (2023 – present)\nChairman, Senate Committee on Petroleum (Downstream)\nChairman, Senate Committee on Sports Development (2023)\nSSA to President Buhari on NASS Matters (2015 – 2019)\nDeputy Minority Leader, House of Reps (2007 – 2015)\nMember, House of Reps · Sumaila/Takai (2003 – 2015)',
  about_honours: 'Order of the Federal Republic (OFR), 2012 · Turakin Sumaila (traditional title conferred by the Kano Emirate), 2006.',
}

const KEYS = Object.keys(DEFAULTS)

export default function About() {
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

  const bioParagraphs = content.about_bio.split(/\n\n+/).filter(Boolean)
  const education = content.about_education.split('\n').filter(Boolean)
  const career = content.about_career.split('\n').filter(Boolean)

  return (
    <section className="about-grid container">
      <div className="portrait-frame">
        <img src={content.about_portrait} alt="Senator Kawu Sumaila in traditional attire" />
      </div>
      <div className="about-content">
        <p className="about-label">About</p>
        <h1 className="about-title">{content.about_title}</h1>
        <div className="about-body">
          {bioParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="info-grid">
          <div className="info-block">
            <p className="info-label">Education</p>
            <ul>
              {education.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="info-block">
            <p className="info-label">Career milestones</p>
            <ul>
              {career.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="honours-box">
          <p className="info-label">Honours</p>
          <p className="honours-text">{content.about_honours}</p>
        </div>
      </div>
    </section>
  )
}
