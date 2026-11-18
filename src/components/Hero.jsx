import GithubIcon from './GithubIcon'
import BlogIcon from './BlogIcon'
import SkyDoodles from './SkyDoodles'
import Constellation from './Constellation'

const SKILLS = [
  { area: 'Spring Boot 백엔드', level: '주력', tone: 'main', project: 'MaeumNaru', href: '#maeumnaru' },
  { area: 'FastAPI 백엔드', level: '주력', tone: 'main', project: 'GeoMemo', href: '#geomemo' },
  { area: '실시간 스트리밍', level: '경험', tone: 'exp', project: 'DeepGU', href: '#deepgu' },
  { area: 'LLM 파이프라인', level: '학습 중', tone: 'learn', project: 'RAG Code Reviewer', href: '#rag-reviewer' },
]

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <SkyDoodles />
      <Constellation />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__tagline" id="hero-title">
            <span className="lyric" style={{ '--i': 0 }}>문제를 정의하고</span>
            <br />
            <span className="lyric hero__underlined" style={{ '--i': 1 }}>
              구조로 해결합니다
              <svg className="hero__underline" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 9.5c38-4.6 81-6.4 126-5.2 46 1.2 104 4 168 1.1" pathLength="1" />
              </svg>
            </span>
          </h1>

          <p className="hero__desc">
            <span className="lyric" style={{ '--i': 2 }}>당연한 것을 다시 질문하고, 더 나은 방법을 찾는</span>
            <br />
            <span className="lyric" style={{ '--i': 3 }}><strong>백엔드 엔지니어 장효석입니다.</strong></span>
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              프로젝트 보기
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://github.com/calmkeep22"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <GithubIcon />
              GitHub
            </a>
            <a href="https://velog.io/@keepcalm22/posts" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <BlogIcon />
              Velog
            </a>
          </div>
        </div>

        <aside className="profile" aria-label="프로필">
          <div className="profile__head">
            <img
              className="profile__photo"
              src={`${import.meta.env.BASE_URL}profile.jpg`}
              width="480"
              height="480"
              alt="장효석 프로필 사진"
              decoding="async"
              fetchPriority="high"
            />
            <div>
              <p className="profile__name">장효석</p>
              <p className="profile__role">Backend Engineer</p>
            </div>
          </div>

          <h2 className="profile__heading">기술 역량</h2>
          <ul className="profile__focus">
            {SKILLS.map((f) => (
              <li key={f.area}>
                <a href={f.href}>
                  <span className="profile__text">
                    <span className="profile__area">{f.area}</span>
                    <span className="profile__project">{f.project}</span>
                  </span>
                  <span className={`profile__level profile__level--${f.tone}`}>{f.level}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
