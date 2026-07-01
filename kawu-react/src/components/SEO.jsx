import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://kawu-portfolio.vercel.app'
const SITE_NAME = 'Sen. Kawu Sumaila OFR'
const DEFAULT_IMAGE = `${SITE_URL}/assets/rally.jpg`

export default function SEO({ title, description, image, path = '' }) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Senator for Kano South`
  const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE
  const canonical = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph (Facebook, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter / X card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
