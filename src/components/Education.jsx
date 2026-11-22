const AWARDS = [
  {
    year: '2026년 1학기',
    title: 'SMART토너먼트 장려상',
    org: '동국대학교 사물인터넷 혁신융합대학사업단',
  },
  {
    year: '2025년 2학기',
    title: 'SMART토너먼트 우수상',
    org: '동국대학교 사물인터넷 혁신융합대학사업단',
  },
]

export default function Education() {
  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <div className="container">
        <h2 className="section__title" id="education-title">교육 및 수상</h2>

        <div className="education__grid">
          <section className="edu" aria-labelledby="edu-education">
            <h3 className="edu__heading" id="edu-education">학력</h3>
            <p className="edu__school">동국대학교</p>
            <p className="edu__dept">컴퓨터공학부, Computer Science &amp; Engineering</p>
            <dl className="edu__meta">
              <div>
                <dt>입학</dt>
                <dd>2021년</dd>
              </div>
              <div>
                <dt>졸업</dt>
                <dd>2027년 2월 예정</dd>
              </div>
              <div>
                <dt>학점</dt>
                <dd><strong>4.03</strong> / 4.5</dd>
              </div>
              <div>
                <dt>관심</dt>
                <dd>Backend, Infra, AI 파이프라인</dd>
              </div>
            </dl>
          </section>

          <section className="edu" aria-labelledby="edu-awards">
            <h3 className="edu__heading" id="edu-awards">수상</h3>
            <ol className="awards">
              {AWARDS.map((award) => (
                <li className="award" key={award.title}>
                  <p className="award__year">{award.year}</p>
                  <p className="award__title">{award.title}</p>
                  <p className="award__org">{award.org}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  )
}
