export default function About() {
  return (
    <section className="about-grid container">
      <div className="portrait-frame">
        <img src="/assets/portrait.jpg" alt="Senator Kawu Sumaila in traditional attire" />
      </div>
      <div className="about-content">
        <p className="about-label">About</p>
        <h1 className="about-title">From Sumaila Village to the Senate.</h1>
        <div className="about-body">
          <p>Suleiman Abdurrahman, popularly known as Kawu Sumaila (OFR), was born on 3 March 1968 in Sumaila Village, Kano State, to Alhaji Abdurrahman Tadu and Hajiya Maryam Muhammad. He is a Nigerian politician, businessman and school proprietor.</p>
          <p>He represents Kano South Senatorial District at the 10th Nigerian National Assembly. Before his election to the Senate, he served three consecutive terms in the House of Representatives for Sumaila/Takai Federal Constituency, where he was Deputy Minority Leader of the 6th and 7th Houses.</p>
          <p>Between 2015 and 2019 he served as Senior Special Assistant to President Muhammadu Buhari on House of Representatives Matters. In 2012 he was conferred with the national honour of the Order of the Federal Republic (OFR) by President Goodluck Jonathan, and in 2006 he received the traditional title of <em>Turakin Sumaila</em> from the Kano Emirate.</p>
        </div>

        <div className="info-grid">
          <div className="info-block">
            <p className="info-label">Education</p>
            <ul>
              <li>PhD, Political Science &mdash; Al-Qalam University, Katsina</li>
              <li>MSc, Political Science &mdash; Maryam Abacha American University</li>
              <li>MSc, Developmental Studies &mdash; Bayero University, Kano</li>
              <li>MSc, Leadership Studies &mdash; Nigerian Defence Academy</li>
              <li>BA, Islamic Studies &mdash; National Open University of Nigeria</li>
              <li>Executive certificates from Harvard, Oxford, Cambridge and Bayero University, Kano</li>
            </ul>
          </div>
          <div className="info-block">
            <p className="info-label">Career milestones</p>
            <ul>
              <li>Senator, Kano South (2023 &ndash; present)</li>
              <li>Chairman, Senate Committee on Petroleum (Downstream)</li>
              <li>Chairman, Senate Committee on Sports Development (2023)</li>
              <li>SSA to President Buhari on NASS Matters (2015 &ndash; 2019)</li>
              <li>Deputy Minority Leader, House of Reps (2007 &ndash; 2015)</li>
              <li>Member, House of Reps &middot; Sumaila/Takai (2003 &ndash; 2015)</li>
            </ul>
          </div>
        </div>

        <div className="honours-box">
          <p className="info-label">Honours</p>
          <p className="honours-text">Order of the Federal Republic (OFR), 2012 &middot; Turakin Sumaila (traditional title conferred by the Kano Emirate), 2006.</p>
        </div>
      </div>
    </section>
  )
}
