import GithubIcon from './GithubIcon'
import Flow from './Flow'

const FEATURED = [
  {
    id: 'deepgu',
    title: 'DeepGU',
    subtitle: 'VLM 기반 실시간 CCTV 이상행동 분석 플랫폼',
    meta: ['팀 프로젝트, 캡스톤 디자인', '백엔드, 미디어 서버, 실시간 알림'],
    flow: [
      { label: 'CCTV 영상', note: 'OBS에서 RTMP 송출' },
      { label: '미디어 서버', note: 'MediaMTX, FastAPI, EC2' },
      { label: 'AI 워커', note: '이상행동 판정, AI 팀원 담당' },
      { label: '백엔드', note: '이벤트 저장, MySQL, S3' },
      { label: 'SSE 알림', note: '카메라별 구독', main: true },
      { label: '관제 화면', note: 'WebRTC 영상과 알림' },
    ],
    desc: 'CCTV 영상을 실시간으로 받아 AI가 이상행동을 판정하고 관제 화면에 알리는 플랫폼이다. 백엔드, 미디어 서버, 실시간 알림을 맡았고, 이상행동을 판정하는 AI 파이프라인은 AI 팀원이 담당했다.',
    problems: [
      {
        title: '수 초씩 늦는 HLS 영상',
        text: 'HLS는 세그먼트 단위로 재생돼 수 초 이상 늦게 보였다. MediaMTX가 RTMP 입력을 받고, 관제 화면이 WHEP으로 WebRTC 스트림을 바로 재생하도록 바꿨다. WebRTC 주소가 없는 환경에서는 기존 HLS 플레이어로 재생한다.',
      },
      {
        title: '분석 결과를 관제 화면에 바로 알리기',
        text: 'AI 워커가 이상행동 이벤트를 백엔드 내부 API로 보내면, 백엔드가 영상과 썸네일을 S3에, 이벤트를 MySQL에 저장한다. 그 뒤 카메라별 asyncio.Queue 구독자에게 SSE로 이벤트를 전달해, 관제 화면이 새로고침 없이 알림을 받도록 했다.',
      },
    ],
    metrics: [
      { value: '118개', label: '팀 저장소 본인 커밋, 2026년 4월~7월' },
      { value: '2대', label: 'EC2 분리 배포, 백엔드와 미디어 서버' },
    ],
    metricsNote: '커밋 수는 CSID-DGU/2026-1-CECD2-1-Deepgu-06 저장소의 작성자 기준이다.',
    github: 'https://github.com/calmkeep22/2026-1-CECD2-1-Deepgu-06',
    tech: ['Python', 'FastAPI', 'MediaMTX', 'WebRTC', 'SSE', 'AWS EC2'],
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
        text: '기록 API가 LLM 감정 분석이 끝날 때까지 응답을 기다리고 있었다. 기록 저장과 분석을 분리하고 분석 요청은 RabbitMQ로 넘겨, 메모를 저장하는 즉시 응답하도록 바꿨다.',
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
      { value: '57개', label: '본인 커밋, 팀 저장소 최다' },
      { value: '4개', label: 'emotion, insight, reco 요청과 응답 큐' },
    ],
    metricsNote: '커밋 수는 2025-OSS-Project/GeoMemo-Backend 저장소의 작성자 기준이다.',
    github: 'https://github.com/2025-OSS-Project/GeoMemo-Backend',
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
      { label: 'RRF 병합', note: '파일당 후보 2개 제한', main: true },
      { label: '근거 기반 리뷰', note: '코드 위치와 문서 출처' },
    ],
    desc: '프로젝트 코드와 프레임워크 공식문서를 함께 검색해 리뷰하고, 답변마다 코드 위치와 문서 출처를 붙인다. 검색 구조를 바꿀 때마다 같은 평가셋으로 다시 재고, 결과를 저장소의 평가 기록에 남겼다.',
    problems: [
      {
        title: '공정하지 않았던 첫 비교',
        text: 'AST 기반 함수 단위 청킹을 적용하고 처음 비교했을 때는 MRR이 0.886에서 0.833으로 떨어진 것처럼 보였다. 기준값은 코드베이스가 훨씬 작을 때 잰 수치였고, search_k=5에서는 한 파일의 조각들이 후보를 나눠 차지했다. 같은 코드베이스와 search_k=20으로 다시 재니 AST 청킹이 모든 지표에서 같거나 더 좋았다.',
      },
      {
        title: '식별자 질문과 reranker',
        text: 'Dense 검색이 놓친 에러 코드 질문을 잡으려고 BM25를 더해 RRF로 합쳤다. 해당 질문을 1위로 찾았고 Recall@5는 0.971을 유지했지만, MRR은 0.856에서 0.823으로 내려갔다. 이를 회복하려고 붙인 FlashRank reranker는 MRR을 0.29~0.41로 떨어뜨려 기본 경로에서 뺐다.',
        links: [
          { label: '평가 기록', href: 'https://github.com/calmkeep22/langchain/blob/master/eval/results.md' },
        ],
      },
    ],
    metrics: [
      { value: '0.971', label: 'Recall@5, 하이브리드 검색' },
      { value: '0.823', label: 'MRR, Dense만 쓰면 0.856' },
      { value: '0.29~0.41', label: 'reranker 적용 시 MRR, 채택 안 함' },
    ],
    metricsNote: '측정 조건: 저장소 app/ 폴더 대상 질문 35개, 파일 단위 정답, search_k=20, eval/run_eval.py 기준.',
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

      {project.metricsNote && <p className="metrics-note">{project.metricsNote}</p>}

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
