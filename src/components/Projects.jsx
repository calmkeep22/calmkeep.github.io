import GithubIcon from './GithubIcon'
import Flow from './Flow'

const FEATURED = [
  {
    id: 'deepgu',
    title: 'DeepGU',
    subtitle: 'VLM 기반 실시간 CCTV 이상행동 분석 플랫폼',
    meta: ['팀 프로젝트, 캡스톤 디자인', '백엔드, 인프라'],
    flow: [
      { label: 'CCTV 영상', note: 'OBS, MediaMTX' },
      { label: 'Fast Model', note: '이상행동 후보 선별' },
      { label: 'Event Builder', note: '이벤트 묶기' },
      { label: 'Keyframe Selection', note: '핵심 프레임만' },
      { label: 'VLM 분석', note: '호출량 86% 감소', main: true },
      { label: 'SSE 알림', note: '50ms 이내 전달' },
    ],
    desc: 'OBS 영상 송출부터 AI 추론, 실시간 알림까지 스트리밍과 백엔드 인프라 전 구간을 설계하고 구축했다.',
    problems: [
      {
        title: '높은 VLM 연산 비용',
        text: '전 프레임에 주기적으로 VLM을 돌려, CCTV가 늘수록 비용과 처리량이 급격히 커지는 구조였다. Fast Model로 이상행동 후보를 고르고 Event Builder로 이벤트를 묶은 뒤, Keyframe Selection으로 핵심 프레임만 VLM에 보내는 3단계 필터링을 설계했다.',
      },
      {
        title: '수 초씩 늦는 영상과 알림',
        text: 'HLS 스트리밍은 수 초 이상 지연돼 이상행동에 바로 대응하기 어려웠다. MediaMTX를 스트리밍 허브로 두고 WebRTC로 송출을 바꿨고, 이벤트 알림은 asyncio.Queue 기반 SSE로 실시간 전달했다.',
      },
    ],
    metrics: [
      { value: '86%', label: 'VLM 호출량 감소' },
      { value: '~125ms', label: '영상 지연, WebRTC' },
      { value: '≤ 50ms', label: '이벤트 알림 지연, SSE' },
    ],
    github: 'https://github.com/calmkeep22/2026-1-CECD2-1-Deepgu-06',
    tech: ['Python', 'FastAPI', 'MediaMTX', 'WebRTC', 'SSE', 'AWS Bedrock'],
  },
  {
    id: 'geomemo',
    title: 'GeoMemo',
    subtitle: '위치 기반 감정 기록과 맞춤 장소 추천 플랫폼',
    meta: ['팀 프로젝트, 2025 OSS', '백엔드, AI 파이프라인, 인프라'],
    flow: [
      { label: '기록 API', note: '저장 후 즉시 응답', main: true },
      { label: 'RabbitMQ', note: '영속화, TTL, 수동 ACK' },
      { parallel: [{ label: 'emotion.req' }, { label: 'insight.req' }, { label: 'reco.req/res' }] },
      { label: 'AI 워커', note: '분석과 추천' },
      { label: 'Redis', note: '추천 결과 5분 캐시' },
    ],
    desc: '위치와 함께 기록한 감정을 분석해 주간 인사이트와 맞춤 장소를 추천하는 서비스다.',
    problems: [
      {
        title: '분석을 기다리던 기록 API',
        text: '약 3초가 걸리는 LLM 감정 분석이 기록 API를 막고 있었다. 기록 저장과 분석을 분리하고 분석 요청은 RabbitMQ로 넘겨, 메모를 저장하는 즉시 응답하도록 바꿨다.',
      },
      {
        title: '서로 얽힌 AI 작업',
        text: '감정 분석, 주간 인사이트, 장소 추천을 각각 별도 큐로 나눴다. 메시지 영속화, TTL, 수동 ACK를 적용하고, 추천 결과는 Redis에 5분간 캐시해 correlation ID로 추적했다.',
        links: [
          { label: '구현 코드', href: 'https://github.com/2025-OSS-Project/GeoMemo-Backend/blob/dev/core/mq.py' },
        ],
      },
    ],
    metrics: [
      { value: '150ms', label: '기록 API 응답시간, 기존 3,030ms' },
      { value: '약 95%', label: '응답시간 감소' },
      { value: '3종', label: '분리한 AI 워크플로' },
    ],
    github: 'https://github.com/2025-OSS-Project',
    tech: ['FastAPI', 'RabbitMQ', 'Redis', 'MySQL', 'AWS'],
  },
  {
    id: 'rag-reviewer',
    title: 'RAG Code Reviewer',
    subtitle: '코드베이스와 공식문서를 함께 검색하는 근거 기반 코드 리뷰 시스템',
    meta: ['개인 프로젝트', 'RAG 설계, 백엔드, 검색 품질 평가'],
    flow: [
      { label: '리뷰 질문' },
      { parallel: [{ label: 'Dense 검색', note: '의미 검색' }, { label: 'BM25 검색', note: 'SQLite FTS5' }] },
      { label: 'RRF 병합', note: '파일당 후보 제한', main: true },
      { label: '근거 기반 리뷰', note: '코드 위치와 문서 출처' },
    ],
    desc: '프로젝트 코드와 프레임워크 공식문서를 함께 검색해 리뷰하고, 답변마다 코드 위치와 문서 출처를 붙여 결과를 직접 검증할 수 있게 했다.',
    problems: [
      {
        title: '의미 검색이 놓치는 코드 식별자',
        text: 'Dense 검색만으로는 함수명이나 클래스명처럼 정확한 문자열이 중요한 질문을 놓쳤다. 코드를 AST 기반 함수 단위로 나누고 Dense와 BM25 검색 결과를 RRF로 합쳤으며, 파일당 후보 수를 제한해 한 파일이 결과를 독점하지 않게 했다.',
      },
      {
        title: '품질을 떨어뜨린 reranker',
        text: 'FlashRank reranker를 붙이자 한국어 질문 35개 평가셋에서 MRR이 0.82에서 0.29~0.41로 떨어졌다. 측정 결과를 근거로 reranker를 기본 경로에서 빼고 하이브리드 검색을 최종 구조로 택했다.',
        links: [
          { label: '평가 결과', href: 'https://github.com/calmkeep22/langchain/tree/master/eval' },
        ],
      },
    ],
    metrics: [
      { value: '0.82', label: 'Hybrid 검색 MRR' },
      { value: '35개', label: '평가 질문' },
      { value: '0.29~0.41', label: 'Reranker 적용 후 MRR' },
    ],
    github: 'https://github.com/calmkeep22/langchain',
    tech: ['FastAPI', 'LangChain', 'Chroma', 'SQLite FTS5', 'BM25', 'Mistral'],
  },
]

const ADDITIONAL = [
  {
    id: 'openstock',
    title: 'OpenStock Access',
    subtitle: '시각장애인과 저시력 사용자를 위한 접근성 주식 모의투자 앱',
    meta: ['오픈소스 팀 프로젝트, 2026 OSS', '접근성, 아키텍처, AI 연동'],
    summary: '3인 팀에서 커밋의 약 90%를 맡았다. 문장마다 0.97초씩 걸리던 TTS 기동을 상주 프로세스로 바꿔 한 번으로 줄였고, CSS 전체의 대비를 자동 계산해 고대비 모드에서 깨지던 규칙 117개를 찾아 고쳤다.',
    github: 'https://github.com/calmkeep22/2026-OSS-PROJECT',
    tech: ['Java 17', 'JavaFX', 'Python', 'Whisper', 'SQLite'],
  },
  {
    id: 'maeumnaru',
    title: 'MaeumNaru',
    subtitle: '감정 일기와 마음 건강 관리를 위한 웹 플랫폼',
    meta: ['팀 프로젝트', '백엔드, 인증, 스토리지, AI 연동'],
    summary: 'KoBERT 감정 분류 서버를 Spring Boot 백엔드에서 분리해 REST로 연동했다. Refresh Token을 Redis에 두고 재발급과 로그아웃을 서버에서 통제했으며, 일기와 그림 파일은 S3에 저장하고 DB에는 경로만 남겼다.',
    github: 'https://github.com/calmkeep22/2025-1-CSC4004-1-7-aco',
    tech: ['Spring Boot', 'KoBERT', 'Redis', 'AWS S3', 'MySQL'],
  },
]

export default function Projects() {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <h2 className="section__title" id="projects-title">프로젝트</h2>

        <div className="project-list">
          {FEATURED.map((project) => (
            <ProjectCase key={project.id} project={project} />
          ))}
        </div>

        <h3 className="more__title">추가 프로젝트</h3>
        <ul className="more">
          {ADDITIONAL.map((project) => (
            <MoreProject key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function MetaLine({ items }) {
  return (
    <p className="meta-line">
      <span className="meta-line__row">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </span>
    </p>
  )
}

function RepoLink({ href, title }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-github">
      <GithubIcon size={15} />
      <span>GitHub<span className="sr-only">: {title} 저장소</span></span>
    </a>
  )
}

function TechList({ items, title }) {
  return (
    <ul className="tech-list" aria-label={`${title} 사용 기술`}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function ProjectCase({ project }) {
  const titleId = `${project.id}-title`
  return (
    <article className="case" id={project.id} aria-labelledby={titleId}>
      <header className="case__head">
        <div>
          <h3 className="case__title" id={titleId}>{project.title}</h3>
          <p className="case__subtitle">{project.subtitle}</p>
          <MetaLine items={project.meta} />
        </div>
        <RepoLink href={project.github} title={project.title} />
      </header>

      <p className="case__desc">{project.desc}</p>

      <Flow steps={project.flow} label={`${project.title} 처리 흐름`} />

      <div className="problems">
        {project.problems.map((p) => (
          <section className="problem" key={p.title}>
            <h4 className="problem__title">{p.title}</h4>
            <p className="problem__text">{p.text}</p>
            {p.links && (
              <ul className="problem__links">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                      <span className="sr-only">: {project.title}, 새 창에서 열림</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M4 2.5h5.5V8M9.5 2.5 3 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <dl className="metrics" style={{ '--cols': project.metrics.length }}>
        {project.metrics.map((m) => (
          <div className="metric" key={m.label}>
            <dt className="metric__label">{m.label}</dt>
            <dd className="metric__value">{m.value}</dd>
          </div>
        ))}
      </dl>

      <TechList items={project.tech} title={project.title} />
    </article>
  )
}

function MoreProject({ project }) {
  const titleId = `${project.id}-title`
  return (
    <li className="more__item">
      <article id={project.id} aria-labelledby={titleId}>
        <h4 className="more__name" id={titleId}>{project.title}</h4>
        <p className="more__subtitle">{project.subtitle}</p>
        <MetaLine items={project.meta} />
        <p className="more__summary">{project.summary}</p>
        <TechList items={project.tech} title={project.title} />
        <RepoLink href={project.github} title={project.title} />
      </article>
    </li>
  )
}
