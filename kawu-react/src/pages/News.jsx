import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import { useLanguage } from '../contexts/LanguageContext'
import { NewsCardSkeleton } from '../components/Skeleton'

export default function News() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('status', 'published')
        .order('date', { ascending: false })

      if (!error) setPosts(data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <>
      <SEO
        title={t.news_page.eyebrow}
        description="Official updates, press releases, statements and media coverage from the office of Sen. Kawu Sumaila."
        path="/news"
      />
      <section className="projects-hero">
        <div className="container projects-hero-inner">
          <p className="projects-eyebrow">{t.news_page.eyebrow}</p>
          <h1>{t.news_page.heading}</h1>
          <p className="projects-lede">{t.news_page.lede}</p>
        </div>
        <div className="projects-flag-stripe" />
      </section>

      <section className="container news-list">
        {loading ? (
          <div className="news-grid">
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </div>
        ) : posts.length === 0 ? (
          <p className="news-empty">{t.news_page.empty}</p>
        ) : (
          <div className="news-grid">
            {posts.map((post) => (
              <article key={post.slug} className="news-card">
                <Link to={`/news/${post.slug}`} className="news-card-img">
                  {post.featured_image ? (
                    <img src={post.featured_image} alt={post.title} loading="lazy" />
                  ) : (
                    <div className="news-card-img-fallback" />
                  )}
                </Link>
                <div className="news-card-content">
                  {post.category && <p className="news-cat">{post.category}</p>}
                  <h2 className="news-card-title">
                    <Link to={`/news/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="news-date">
                    {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  {post.excerpt && <p className="news-excerpt">{post.excerpt}</p>}
                  <Link to={`/news/${post.slug}`} className="news-read-more">{t.news_page.read_more} &rarr;</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
