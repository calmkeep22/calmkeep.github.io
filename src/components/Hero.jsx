const HIGHLIGHTS = [
  { value: '↓ 86%', label: 'VLM 호출량 감소', project: 'DeepGU' },
  { value: '96~98%', label: 'LLM 판정 근거 정합률 (기존 46.3%)', project: 'FinGuard AI' },
  { value: '~20×', label: 'API 응답 개선 (3,030 → 150ms)', project: 'GeoMemo' },
  { value: '↓ 21%', label: 'PK 인덱스 크기 (100만 행)', project: 'KnowledgeLink' },
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__noise" aria-hidden="true" />
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            장효석 · Backend Engineer
          </p>

          <h1 className="hero__tagline">
            문제를 정의하고,
            <br />
            <span className="gradient-text">구조로 해결합니다</span>
          </h1>

          <p className="hero__desc">
            스트리밍 인프라부터 LLM 파이프라인, 데이터베이스까지{' '}
            <br />
            병목과 오류를 직접 측정하고, 구조를 바꿔 수치로 증명합니다.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              프로젝트 보기 ↓
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
          </div>

          <div className="hero__info">
            <span>Dongguk University · CS&amp;E</span>
            <span className="hero__dot">·</span>
            <span>2021 입학</span>
            <span className="hero__dot">·</span>
            <span>GPA 4.03 / 4.5</span>
          </div>
        </div>

        <aside className="hero__highlights" aria-label="대표 성과">
          <p className="hero__highlights-label">Measured Results</p>
          <ul className="hero__highlights-list">
            {HIGHLIGHTS.map((h) => (
              <li className="hero__highlight" key={h.project}>
                <span className="hero__highlight-value">{h.value}</span>
                <span className="hero__highlight-text">
                  <span className="hero__highlight-label">{h.label}</span>
                  <span className="hero__highlight-project">{h.project}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
