import { useInView } from '../hooks/useInView'

const AWARDS = [
  {
    year: '2026 · 1학기',
    title: 'SMART토너먼트 장려상',
    org: '동국대학교 사물인터넷 혁신융합대학사업단',
  },
  {
    year: '2025 · 2학기',
    title: 'SMART토너먼트 우수상',
    org: '동국대학교 사물인터넷 혁신융합대학사업단',
  },
]

export default function Education() {
  const { ref: ref1, visible: v1 } = useInView()
  const { ref: ref2, visible: v2 } = useInView()

  return (
    <section className="section education" id="education">
      <div className="container">
        <RevealBlock className="section__header">
          <p className="section__label">Education &amp; Awards</p>
          <h2 className="section__title">교육 및 수상</h2>
        </RevealBlock>

        <div className="education__grid">
          <div
            ref={ref1}
            className={`edu-card reveal${v1 ? ' visible' : ''}`}
          >
            <div className="edu-card__icon" aria-hidden="true">🎓</div>
            <p className="edu-card__label">Education</p>
            <h3 className="edu-card__school">동국대학교</h3>
            <p className="edu-card__dept">컴퓨터공학부 · Computer Science &amp; Engineering</p>
            <div className="edu-card__meta">
              <div className="edu-meta-item">
                <span className="edu-meta-item__label">입학</span>
                <span className="edu-meta-item__value">2021년</span>
              </div>
              <div className="edu-meta-item">
                <span className="edu-meta-item__label">학점</span>
                <span className="edu-meta-item__value">
                  <strong>4.03</strong> / 4.5
                </span>
              </div>
              <div className="edu-meta-item">
                <span className="edu-meta-item__label">관심</span>
                <span className="edu-meta-item__value">Backend · Infra · AI 연동</span>
              </div>
            </div>
          </div>

          <div
            ref={ref2}
            className={`awards-card reveal reveal-delay-2${v2 ? ' visible' : ''}`}
          >
            <div className="awards-card__icon" aria-hidden="true">🏆</div>
            <p className="awards-card__label">Awards</p>
            {AWARDS.map((award) => (
              <div className="award-item" key={award.title}>
                <p className="award-item__year">{award.year}</p>
                <p className="award-item__title">{award.title}</p>
                <p className="award-item__org">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RevealBlock({ children, className }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={`reveal${visible ? ' visible' : ''}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}
