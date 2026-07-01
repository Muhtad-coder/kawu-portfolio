import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import { useLanguage } from '../contexts/LanguageContext'

const DEFAULTS = {
  about_title: 'From Sumaila Village to the Senate.',
  about_portrait: '/assets/portrait.jpg',
  about_bio: 'Suleiman Abdurrahman, popularly known as Kawu Sumaila (OFR), was born on 3 March 1968 in Sumaila Village, Kano State, to Alhaji Abdurrahman Tadu and Hajiya Maryam Muhammad. He is a Nigerian politician, businessman and school proprietor.\n\nHe represents Kano South Senatorial District at the 10th Nigerian National Assembly. Before his election to the Senate, he served three consecutive terms in the House of Representatives for Sumaila/Takai Federal Constituency, where he was Deputy Minority Leader of the 6th and 7th Houses.\n\nBetween 2015 and 2019 he served as Senior Special Assistant to President Muhammadu Buhari on House of Representatives Matters. In 2012 he was conferred with the national honour of the Order of the Federal Republic (OFR) by President Goodluck Jonathan, and in 2006 he received the traditional title of Turakin Sumaila from the Kano Emirate.',
  about_education: 'PhD, Political Science \u2014 Al-Qalam University, Katsina\nMSc, Political Science \u2014 Maryam Abacha American University\nMSc, Developmental Studies \u2014 Bayero University, Kano\nMSc, Leadership Studies \u2014 Nigerian Defence Academy\nBA, Islamic Studies \u2014 National Open University of Nigeria\nExecutive certificates from Harvard, Oxford, Cambridge and Bayero University, Kano',
  about_career: 'Senator, Kano South (2023 \u2013 present)\nChairman, Senate Committee on Petroleum (Downstream)\nChairman, Senate Committee on Sports Development (2023)\nSSA to President Buhari on NASS Matters (2015 \u2013 2019)\nDeputy Minority Leader, House of Reps (2007 \u2013 2015)\nMember, House of Reps \u00b7 Sumaila/Takai (2003 \u2013 2015)',
  about_honours: 'Order of the Federal Republic (OFR), 2012 \u00b7 Turakin Sumaila (traditional title conferred by the Kano Emirate), 2006.',
  about_title_ha: 'Daga \u0266auyen Sumaila zuwa Majalisar Dattawa.',
  about_bio_ha: "An haifi Suleiman Abdurrahman, wanda aka fi sani da Kawu Sumaila (OFR), a ranar 3 ga Maris 1968 a \u0266auyen Sumaila, Jihar Kano, ga Alhaji Abdurrahman Tadu da Hajiya Maryam Muhammad. \u0110an siyasar Najeriya ne, \u0111an kasuwa, kuma mai makaranta.\n\nYana wakiltar Mazabar Kudu Kano a Majalisar \u0266asa ta Najeriya ta 10. Kafin za\u0253ensa a Majalisar Dattawa, ya yi aiki wa\u2019adi uku a jere a Majalisar Wakilai don Mazabar Tarayya ta Sumaila/Takai, inda ya kasance Mataimakin Shugaban \u2018Yan Tsiraru na Majalisun 6 da 7.\n\nTsakanin 2015 da 2019 ya yi aiki a matsayin Babban Mataimakin Musamman na Shugaban \u0266asa Muhammadu Buhari kan Al\u2019amuran Majalisar Wakilai. A shekarar 2012, Shugaban \u0266asa Goodluck Jonathan ya ba shi kyautar \u0266asa ta Order of the Federal Republic (OFR), kuma a shekarar 2006 ya sami la\u0253abin gargajiya na Turakin Sumaila daga Daular Kano.",
  about_education_ha: "PhD, Kimiyyar Siyasa \u2014 Jami\u2019ar Al-Qalam, Katsina\nMSc, Kimiyyar Siyasa \u2014 Jami\u2019ar Maryam Abacha ta Amurka\nMSc, Nazarin Ci Gaba \u2014 Jami\u2019ar Bayero, Kano\nMSc, Nazarin Jagoranci \u2014 Kwalejin Tsaro ta Najeriya\nBA, Nazarin Addinin Musulunci \u2014 Jami\u2019ar Bu\u0257a\u0257\u0257en \u0266asa ta Najeriya\nTastoci daga Harvard, Oxford, Cambridge da Jami\u2019ar Bayero, Kano",
  about_career_ha: "Sanata, Kudu Kano (2023 \u2013 yanzu)\nShugaban Kwamitin Majalisar Dattawa kan Man Fetur (\u0266asa)\nShugaban Kwamitin Majalisar Dattawa kan Wasanni (2023)\nBabban Mataimakin Musamman ga Shugaba Buhari kan NASS (2015 \u2013 2019)\nMataimakin Shugaban \u2018Yan Tsiraru, Majalisar Wakilai (2007 \u2013 2015)\nMember, Majalisar Wakilai \u00b7 Sumaila/Takai (2003 \u2013 2015)",
  about_honours_ha: "Umarnin Jamhuriyar Tarayya (OFR), 2012 \u00b7 Turakin Sumaila (la\u0253abi na gargajiya da Daular Kano ta ba), 2006.",
}

const KEYS = Object.keys(DEFAULTS)

export default function About() {
  const [content, setContent] = useState(DEFAULTS)
  const { lang, t } = useLanguage()

  useEffect(() => {
    supabase.from('site_content').select('key, value').in('key', KEYS).then(({ data }) => {
      if (data?.length) {
        const map = {}
        data.forEach(({ key, value }) => { map[key] = value })
        setContent(c => ({ ...c, ...map }))
      }
    })
  }, [])

  const isHausa = lang === 'ha'
  const title = isHausa ? content.about_title_ha : content.about_title
  const bio = isHausa ? content.about_bio_ha : content.about_bio
  const education_text = isHausa ? content.about_education_ha : content.about_education
  const career_text = isHausa ? content.about_career_ha : content.about_career
  const honours_text = isHausa ? content.about_honours_ha : content.about_honours

  const bioParagraphs = bio.split(/\n\n+/).filter(Boolean)
  const education = education_text.split('\n').filter(Boolean)
  const career = career_text.split('\n').filter(Boolean)

  return (
    <>
    <SEO
      title="About"
      description="Senator Suleiman Abdurrahman Kawu Sumaila OFR — Senator for Kano South, former Deputy Minority Leader of the House of Representatives, and recipient of the Order of the Federal Republic."
      image="/assets/portrait.jpg"
      path="/about"
    />
    <section className="about-grid container">
      <div className="portrait-frame">
        <img src={content.about_portrait} alt="Senator Kawu Sumaila in traditional attire" />
      </div>
      <div className="about-content">
        <p className="about-label">{t.about_page.label}</p>
        <h1 className="about-title">{title}</h1>
        <div className="about-body">
          {bioParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="info-grid">
          <div className="info-block">
            <p className="info-label">{t.about_page.education_label}</p>
            <ul>
              {education.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="info-block">
            <p className="info-label">{t.about_page.career_label}</p>
            <ul>
              {career.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="honours-box">
          <p className="info-label">{t.about_page.honours_label}</p>
          <p className="honours-text">{honours_text}</p>
        </div>
      </div>
    </section>
    </>
  )
}
