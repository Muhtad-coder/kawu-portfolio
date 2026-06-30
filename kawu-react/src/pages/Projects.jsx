import { projects } from '../data/projects'

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
  return (
    <>
      <section className="projects-hero">
        <div className="container projects-hero-inner">
          <p className="projects-eyebrow">The Record</p>
          <h1>Achievements &amp; legislative work.</h1>
          <p className="projects-lede">
            From the 6th House of Representatives to the 10th Senate — bills
            sponsored, motions moved, and committees led on behalf of the people
            of Kano South.
          </p>
        </div>
        <div className="projects-flag-stripe" />
      </section>

      <section className="container projects-list">
        <div className="projects-articles">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className={`project-article${i % 2 === 1 ? ' project-article--reverse' : ''}`}
            >
              <div className="project-img-wrap">
                <img src={p.image} alt={p.title} loading="lazy" />
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

        <p className="projects-footnote">
          Biographical and legislative details summarised from public records,
          including the Senator's Wikipedia entry. For an official record of
          bills and motions, please contact the office.
        </p>
      </section>
    </>
  )
}
