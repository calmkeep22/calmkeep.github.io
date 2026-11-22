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
        text: 'AI 워커가 이상행동 이벤트를 백엔드 내부 API로 보내면, 백엔드가 영상과 썸네일을 S3에, 이벤트를 MySQL에 저장한다. 그 뒤 카메라별 asyncio.Queue 구독자에게 SSE로 이벤트를 전달해, 관제 화면이 새로고침 없이 알림을 받도록 했다. 구독 목록을 카메라 ID별로 나눠, 한 카메라의 이벤트는 그 카메라를 보는 화면에만 간다.',
      },
    ],
    metrics: [
      { value: '9개', label: '카메라 관리와 스트림 제어 API' },
      { value: '카메라별', label: '스트림 세션과 SSE 알림 구독 분리' },
    ],
    metricsNote: 'API 수는 저장소 README의 API 목록 기준이며, 헬스 체크 엔드포인트는 뺐다.',
    github: 'https://github.com/calmkeep22/2026-1-CECD2-1-Deepgu-06',
    tech: ['Python', 'FastAPI', 'MediaMTX', 'WebRTC', 'SSE', 'AWS EC2'],
  },
  {
    id: 'geomemo',
    title: 'GeoMemo',
    subtitle: '위치 기반 감정 기록과 맞춤 장소 추천 플랫폼',
    meta: ['팀 프로젝트, 2025 OSS', '백엔드, AI 파이프라인, 인프라'],
    flow: [
      { label: '백엔드 API', note: 'MySQL 저장 후 즉시 응답', main: true },
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
      {
        title: '저장과 발행 사이에서 실패하면',
        text: '메모 저장과 감정 분석 요청을 서로 다른 API로 나눠, 큐 발행이 실패해도 메모는 남고 분석 요청만 오류로 돌아가 다시 보낼 수 있다. 큐는 durable로, 메시지는 영속 전송으로 선언해 브로커가 재시작돼도 남게 했다. 다만 주간 인사이트는 PENDING 레코드를 먼저 커밋한 뒤 발행해서, 발행이 실패하면 PENDING으로 남고 자동 재시도가 없다. 아웃박스 테이블이나 상태 기반 재발행이 다음 개선 과제다.',
      },
    ],
    metrics: [],
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
        title: 'MRR이 내려가도 하이브리드를 택한 이유',
        text: 'Dense 검색은 에러 코드나 함수명이 핵심인 질문을 아예 놓쳤다. BM25를 더해 RRF로 합치자 그 질문을 1위로 찾았고 Recall@5는 0.971로 같았지만, MRR은 0.856에서 0.823으로 내려갔다. 코드 리뷰에서는 정확한 식별자를 못 찾는 실패가 순위가 조금 밀리는 것보다 치명적이라고 보고 하이브리드를 택했다. rrf_k를 30에서 300까지 바꿔도 MRR은 회복되지 않았다.',
      },
      {
        title: '품질을 떨어뜨린 reranker',
        text: '내려간 순위를 되돌리려고 FlashRank reranker를 붙였지만, 한국어 질문과 영어 코드가 섞인 평가셋에서 프롬프트 템플릿 코드가 거의 모든 질문의 상위를 차지해 MRR이 0.29~0.41로 떨어졌다. reranker는 기본 경로에서 빼고 선택 옵션으로만 남겼다.',
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
    metricsNote: '측정 조건: 저장소 app/ 폴더 대상 질문 35개, 파일 단위 정답, search_k=20, eval/run_eval.py 기준. 질문이 35개뿐이라 질문 하나가 Hit@1을 약 0.03씩 움직인다.',
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
    summary: '3인 팀에서 멀티모듈 구조, 접근성 UI, 음성 명령, AI 서비스 연동을 맡았다. 문장마다 0.97초씩 걸리던 TTS 기동을 상주 프로세스로 바꿔 한 번으로 줄였고, CSS 전체의 대비를 자동 계산해 고대비 모드에서 깨지던 규칙 117개를 찾아 고쳤다.',
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

      {project.metrics.length > 0 && (
        <dl className="metrics" style={{ '--cols': project.metrics.length }}>
          {project.metrics.map((m) => (
            <div className="metric" key={m.label}>
              <dt className="metric__label">{m.label}</dt>
              <dd className="metric__value">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

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
