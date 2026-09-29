export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__noise" aria-hidden="true" />
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__name">장효석 · Hyoseok Jang</p>
        <p className="hero__role">Backend &amp; Infra Engineer</p>

        <h1 className="hero__tagline">
          문제를 정의하고,
          <br />
          <span className="gradient-text">구조로 해결합니다</span>
        </h1>

        <p className="hero__desc">
          스트리밍·AI·비동기 인프라에서 마주친 병목을 직접 측정하고,
          <br />
          파이프라인과 메시지 큐 구조로 비용과 지연을 정량적으로 줄였습니다.
        </p>

        <div className="hero__info">
          <span>Dongguk University · CS&amp;E</span>
          <span className="hero__dot">·</span>
          <span>2021 입학</span>
          <span className="hero__dot">·</span>
          <span>GPA 4.03 / 4.5</span>
        </div>

        <div className="hero__actions">
          <a
            href="https://github.com/calmkeep22"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            <GithubIcon />
            GitHub
          </a>
          <a href="#projects" className="btn btn--ghost">
            프로젝트 보기 ↓
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
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
