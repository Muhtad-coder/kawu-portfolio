import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import { useLanguage } from '../contexts/LanguageContext'
import { getYouTubeId } from '../lib/youtube'

export default function NewsDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

      if (!error) setPost(data)
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <section className="container news-detail">
        <p>{t.news_page.loading}</p>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="container news-detail">
        <p className="news-empty">{t.news_page.not_found}</p>
        <Link to="/news" className="news-back-link">&larr; {t.news_page.back_to_news}</Link>
      </section>
    )
  }

  const videoId = getYouTubeId(post.youtube_url)
  const paragraphs = post.body.split(/\n\n+/).filter(Boolean)

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || post.body.slice(0, 160)}
        image={post.featured_image}
        path={`/news/${post.slug}`}
      />
      <section className="container news-detail">
        <Link to="/news" className="news-back-link">&larr; {t.news_page.back_to_news}</Link>

        {post.category && <p className="news-cat news-detail-cat">{post.category}</p>}
        <h1 className="news-detail-title">{post.title}</h1>
        <p className="news-date">
          {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {post.featured_image && (
          <div className="news-detail-img">
            <img src={post.featured_image} alt={post.title} />
          </div>
        )}

        <div className="news-detail-body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {videoId && (
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </section>
    </>
  )
}
