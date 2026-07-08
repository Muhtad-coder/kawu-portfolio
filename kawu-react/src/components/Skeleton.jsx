export default function Skeleton({ width = '100%', height = '1rem', style = {} }) {
  return <div className="skel" style={{ width, height, ...style }} />
}

export function NewsCardSkeleton() {
  return (
    <div className="news-card">
      <div className="news-card-img">
        <div className="skel" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="news-card-content">
        <Skeleton width="5rem" height="0.65rem" style={{ marginBottom: '0.75rem' }} />
        <Skeleton width="90%" height="1.1rem" style={{ marginBottom: '0.4rem' }} />
        <Skeleton width="70%" height="1.1rem" style={{ marginBottom: '0.75rem' }} />
        <Skeleton width="4rem" height="0.6rem" style={{ marginBottom: '0.75rem' }} />
        <Skeleton width="100%" height="0.75rem" style={{ marginBottom: '0.35rem' }} />
        <Skeleton width="85%" height="0.75rem" style={{ marginBottom: '0.35rem' }} />
        <Skeleton width="60%" height="0.75rem" />
      </div>
    </div>
  )
}

export function ProjectArticleSkeleton({ reverse }) {
  return (
    <div className={`project-article${reverse ? ' project-article--reverse' : ''}`}>
      <div className="project-img-wrap">
        <div className="skel" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="project-body">
        <Skeleton width="5rem" height="0.65rem" style={{ marginBottom: '0.75rem' }} />
        <Skeleton width="85%" height="1.6rem" style={{ marginBottom: '0.4rem' }} />
        <Skeleton width="55%" height="1.6rem" style={{ marginBottom: '0.75rem' }} />
        <Skeleton width="4rem" height="0.6rem" style={{ marginBottom: '1.25rem' }} />
        <Skeleton width="100%" height="0.8rem" style={{ marginBottom: '0.4rem' }} />
        <Skeleton width="95%" height="0.8rem" style={{ marginBottom: '0.4rem' }} />
        <Skeleton width="80%" height="0.8rem" style={{ marginBottom: '1.5rem' }} />
        <Skeleton width="100%" height="0.75rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="90%" height="0.75rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="75%" height="0.75rem" />
      </div>
    </div>
  )
}

export function NewsDetailSkeleton() {
  return (
    <section className="container news-detail">
      <Skeleton width="8rem" height="0.8rem" style={{ marginBottom: '2rem' }} />
      <Skeleton width="4rem" height="0.65rem" style={{ marginBottom: '0.6rem' }} />
      <Skeleton width="80%" height="2rem" style={{ marginBottom: '0.4rem' }} />
      <Skeleton width="60%" height="2rem" style={{ marginBottom: '0.75rem' }} />
      <Skeleton width="6rem" height="0.6rem" style={{ marginBottom: '2rem' }} />
      <div className="news-detail-img">
        <div className="skel" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="news-detail-body" style={{ marginTop: '2rem' }}>
        {[100, 95, 88, 100, 92, 70].map((w, i) => (
          <Skeleton key={i} width={`${w}%`} height="0.85rem" style={{ marginBottom: '0.6rem' }} />
        ))}
      </div>
    </section>
  )
}
