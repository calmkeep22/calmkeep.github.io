import { useInView } from '../hooks/useInView'

const PROJECTS = [
  {
    id: '01',
    title: 'DeepGU',
    subtitle: 'VLM 기반 실시간 CCTV 이상행동 분석 플랫폼',
    type: '팀 프로젝트 · 캡스톤 디자인',
    role: '백엔드 · 인프라',
    desc: 'OBS 영상 송출부터 AI 추론, 실시간 알림까지 스트리밍·백엔드 인프라 전 구간을 설계하고 구축했다. 목표는 VLM 연산 비용 절감과 영상·알림의 실시간성 확보였다.',
    problems: [
      {
        title: '높은 VLM 연산 비용',
        problem: '일정 주기로 전 프레임에 VLM을 수행해, CCTV 수가 늘수록 연산 비용과 처리량이 급격히 늘어나는 구조였다.',
        solution: 'Fast Model로 이상행동 후보를 선별하고, Event Builder로 이벤트를 묶은 뒤 Keyframe Selection으로 핵심 프레임만 VLM에 보내는 3단계 필터링 파이프라인을 설계했다.',
      },
      {
        title: '낮은 실시간성',
        problem: 'HLS 기반 스트리밍에서는 수 초 이상의 영상 지연이 발생해 이상행동에 즉각 대응하기 어려웠다.',
        solution: 'MediaMTX를 스트리밍 허브로 두고 WebRTC 저지연 송출로 전환했으며, 이벤트 알림은 asyncio.Queue 기반 SSE broadcaster로 실시간 전달했다.',
      },
    ],
    metrics: [
      { value: '↓ 86%', label: 'VLM 호출량 감소' },
      { value: '~125ms', label: '영상 지연 (WebRTC)' },
      { value: '≤ 50ms', label: '이벤트 알림 지연 (SSE)' },
    ],
    metricsClass: 'metrics--3col',
    github: 'https://github.com/calmkeep22/2026-1-CECD2-1-Deepgu-06',
    tech: ['Python', 'FastAPI', 'MediaMTX', 'WebRTC', 'SSE', 'AWS Bedrock', 'Qwen3-VL', 'asyncio', 'Docker'],
  },
  {
    id: '02',
    title: 'KnowledgeLink',
    subtitle: 'Jira·GitHub 기반 개발 지식 연결 서비스',
    type: '개인 프로젝트 · 진행 중',
    role: '백엔드 · 설계',
    desc: 'Jira 이슈와 GitHub PR에서 비슷한 과거 업무, 해결 방법, 경험 있는 팀원을 근거와 함께 찾아 주는 서비스. 명세·ADR·테스트 기록을 먼저 두고 인증, 접근 모델, 작업 엔진, Jira 동기화를 단계별로 구현하고 있다.',
    problems: [
      {
        title: 'UUIDv7인데도 단편화된 PK 인덱스',
        problem: 'UUIDv7로 PK를 바꿨는데도 100만 행 벤치마크에서 리프 채움률이 UUIDv4와 같은 70%대였다. 같은 밀리초 안의 ID 순서가 무작위였기 때문이다.',
        solution: '생성기를 RFC 9562 monotonic 방식으로 바꿔 같은 밀리초 안에서도 값이 증가하게 했다. 실행마다 흔들리는 시간 지표 대신 채움률·단편화 같은 인덱스 구조 지표로 효과를 검증했다.',
      },
      {
        title: '실행기 장애 시 작업 유실·중복',
        problem: '실행기가 작업 도중 죽으면 작업이 RUNNING에 멈추거나, 복구 후 이전·새 실행기가 같은 결과를 동시에 쓸 수 있었다.',
        solution: '선점과 상태 전환을 한 트랜잭션으로 묶고 lease·heartbeat·run_token으로 소유권을 검증해, lease를 잃은 실행기의 쓰기를 모두 거절했다. 실패한 동기화는 저장된 cursor부터 재개한다.',
      },
    ],
    metrics: [
      { value: '90.0%', label: 'PK 리프 채움률 (기존 70.7%)' },
      { value: '↓ 21%', label: 'PK 인덱스 크기 (100만 행)' },
      { value: '0%', label: '리프 단편화 (기존 49.6%)' },
      { value: '220건', label: '단위·통합 테스트' },
    ],
    metricsClass: 'metrics--4col',
    github: 'https://github.com/calmkeep22/KnowledgeLink',
    tech: ['Java 21', 'Spring Boot 4.1', 'PostgreSQL', 'pgvector', 'Flyway', 'Testcontainers', 'OpenTelemetry', 'AWS Bedrock'],
  },
  {
    id: '03',
    title: 'OpenStock Access',
    subtitle: '시각장애인·저시력 사용자를 위한 접근성 주식 모의투자 앱',
    type: '오픈소스 팀 프로젝트 · 2026 OSS',
    role: '접근성 · 아키텍처 · AI 연동',
    desc: '키보드·스크린리더·음성 명령·청각 차트만으로 주식 정보를 탐색하고 모의주문을 연습하는 JavaFX 앱. 3인 팀에서 커밋의 약 90%를 맡아 멀티모듈 구조, 접근성 UI, 음성 명령, AI 서비스 연동을 구현했다.',
    problems: [
      {
        title: '밀려서 들리는 화면 안내',
        problem: 'TTS가 문장마다 PowerShell을 새로 띄워 한 문장에 0.97초가 걸렸다. 안내가 밀려 이미 지나간 화면의 설명이 들렸다.',
        solution: '낭독 프로세스를 상주시켜 기동 비용을 첫 문장에만 치르게 했다. 새 안내가 오면 낡은 안내를 끊되, 되돌릴 수 없는 주문 안내는 끝까지 읽도록 우선순위를 나눴다.',
      },
      {
        title: '고대비 모드에서 사라지는 글자',
        problem: '기본 테마 규칙이 고대비 모드에 남아 흰 바탕에 흰 글자가 되는 등, 대비가 1.07:1까지 떨어진 화면이 있었다.',
        solution: 'CSS 전체를 파싱해 규칙마다 배경·글자의 휘도 대비를 계산하고, 대응이 빠진 규칙 117개를 찾아 고쳤다. 수정 지점은 접근성 회귀 테스트로 고정했다.',
      },
    ],
    metrics: [
      { value: '1회', label: 'TTS 기동 (기존 문장마다 0.97s)' },
      { value: '117개', label: '고대비 CSS 규칙 자동 검출·수정' },
      { value: '14/14', label: '단축키 지원 화면 (기존 6개)' },
      { value: '150ms', label: '청각 차트 소리 지연 (기존 0.5s+)' },
    ],
    metricsClass: 'metrics--4col',
    github: 'https://github.com/calmkeep22/2026-OSS-PROJECT',
    tech: ['Java 17', 'JavaFX', 'Gradle 멀티모듈', 'Python', 'Whisper', 'SQLite', 'Windows DPAPI', 'WebSocket'],
  },
  {
    id: '04',
    title: 'FinGuard AI',
    subtitle: '금융상품 상담 설명의무 검수 AI',
    type: '개인 프로젝트 · 2026 금융 AI Challenge',
    role: 'AI 파이프라인 · 백엔드',
    desc: '금융상품 설명서와 상담 내용을 비교해 필수 설명 누락을 근거와 함께 탐지하는 검수 서비스. 단계형 LLM 파이프라인과 Rule Engine으로 설계하고, 180개 라벨 평가셋으로 LLM 단독 방식과 비교 측정했다.',
    problems: [
      {
        title: 'LLM이 지어낸 판정 근거',
        problem: 'LLM에 문서와 상담을 통째로 주고 판정시키면, 제시한 근거 문장의 절반 이상이 입력에 없는 문장이었다(근거 정합률 46.3%).',
        solution: '상담사 발화만 원문 그대로 근거로 쓰게 단계를 나누고, 원문에서 확인되지 않는 근거의 판정은 Rule Engine이 MISSING으로 강등해 교정 내역과 함께 보여 줬다.',
      },
      {
        title: '74초 걸리던 분석 시간',
        problem: '카테고리마다 같은 조항 발췌가 프롬프트에 중복으로 들어가고, 형식 오류 재요청으로 LLM 호출이 늘어 한 건에 74초가 걸렸다.',
        solution: '조항을 chunk_id로 참조해 중복 발췌를 없애고, 배열 응답은 자동으로 흡수해 LLM 호출을 3회에서 2회로 줄였다.',
      },
    ],
    metrics: [
      { value: '96~98%', label: '근거 정합률 (LLM 단독 46.3%)' },
      { value: '91~96%', label: 'MISSING 탐지 재현율' },
      { value: '74s → 15s', label: '건당 분석 시간' },
      { value: '180개', label: '평가 라벨 (시나리오 30개)' },
    ],
    metricsClass: 'metrics--4col',
    github: 'https://github.com/calmkeep22/FinGuard',
    tech: ['Python', 'FastAPI', 'Mistral', 'RAG', 'STT', 'Rule Engine', 'Docker', 'Hugging Face Spaces'],
  },
]

const OTHER_PROJECTS = [
  {
    title: 'GeoMemo',
    subtitle: '위치 기반 감정 기록 & 인사이트 플랫폼',
    meta: '2025 OSS 팀 프로젝트 · 백엔드 · AI 연동',
    desc: '약 3초 걸리는 LLM 감정 분석을 RabbitMQ 큐로 분리해, 기록 API가 분석을 기다리지 않고 바로 응답하도록 바꿨다.',
    highlight: { value: '3,030 → 150ms', label: '기록 API 응답시간' },
    github: 'https://github.com/2025-OSS-Project',
    tech: ['FastAPI', 'RabbitMQ', 'Amazon MQ', 'MySQL', 'AWS'],
  },
  {
    title: 'RAG Code Reviewer',
    subtitle: '코드베이스 + 공식문서 RAG 기반 코드 리뷰 시스템',
    meta: '개인 프로젝트 · 백엔드 · AI 연동',
    desc: 'AST 기반 함수 단위 chunking과 BM25 + Dense 하이브리드 검색(RRF)으로 근거를 찾아 리뷰를 생성한다. 리랭커는 eval에서 오히려 성능이 떨어져 기본값에서 뺐다.',
    highlight: { value: '0.82', label: 'Hybrid 검색 MRR (질문 35개)' },
    github: 'https://github.com/calmkeep22/langchain',
    tech: ['FastAPI', 'LangChain', 'Chroma', 'SQLite FTS5', 'BM25'],
  },
  {
    title: 'MaeumNaru',
    subtitle: '감정 일기 & 마음 건강 플랫폼',
    meta: '팀 프로젝트 · 백엔드 · AI 연동 · 인프라',
    desc: 'Spring Boot 백엔드와 KoBERT 감정 분류 서버를 분리해 REST로 연동하고, JWT 인증, S3 파일 저장, WebSocket 채팅, Redis 세션 캐시를 구현했다.',
    highlight: null,
    github: 'https://github.com/calmkeep22/2025-1-CSC4004-1-7-aco',
    tech: ['Spring Boot', 'KoBERT', 'JWT', 'AWS S3', 'WebSocket', 'Redis'],
  },
]

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <RevealBlock className="section__header">
          <p className="section__label">Projects</p>
          <h2 className="section__title">직접 측정하고, 구조로 해결한 프로젝트</h2>
        </RevealBlock>

        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 100} />
        ))}

        <RevealBlock className="other-projects__header">
          <p className="section__label">Other Projects</p>
        </RevealBlock>

        <div className="other-projects">
          {OTHER_PROJECTS.map((project, i) => (
            <OtherProjectCard key={project.title} project={project} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, delay }) {
  const { ref, visible } = useInView()

  return (
    <div
      ref={ref}
      className={`project-card reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="project-card__top">
        <div>
          <p className="project-card__num">{project.id}</p>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__subtitle">{project.subtitle}</p>
          <div className="project-card__tags">
            {project.type && <span className="tag tag--type">{project.type}</span>}
            <span className="tag tag--role">{project.role}</span>
          </div>
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__github"
          >
            <GithubIcon />
            GitHub
          </a>
        )}
      </div>

      <p className="project-card__desc">{project.desc}</p>

      <div className={`problems${project.problems.length > 1 ? ' problems--2col' : ''}`}>
        {project.problems.map((p) => (
          <div className="problem-card" key={p.title}>
            <h4 className="problem-card__title">{p.title}</h4>
            <div className="problem-step">
              <p className="problem-step__label problem-step__label--problem">문제 확인</p>
              <p className="problem-step__text">{p.problem}</p>
            </div>
            <div className="problem-step">
              <p className="problem-step__label problem-step__label--solution">해결 과정</p>
              <p className="problem-step__text">{p.solution}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`metrics ${project.metricsClass}`}>
        {project.metrics.map((m) => (
          <MetricCard key={m.label} value={m.value} label={m.label} />
        ))}
      </div>

      <div className="tech-tags">
        {project.tech.map((t) => (
          <span className="tech-tag" key={t}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function OtherProjectCard({ project, delay }) {
  const { ref, visible } = useInView()

  return (
    <div
      ref={ref}
      className={`other-card reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="other-card__meta">{project.meta}</p>
      <h3 className="other-card__title">{project.title}</h3>
      <p className="other-card__subtitle">{project.subtitle}</p>
      <p className="other-card__desc">{project.desc}</p>

      {project.highlight && (
        <div className="other-card__highlight">
          <span className="other-card__highlight-value">{project.highlight.value}</span>
          <span className="other-card__highlight-label">{project.highlight.label}</span>
        </div>
      )}

      <div className="tech-tags other-card__tech">
        {project.tech.map((t) => (
          <span className="tech-tag" key={t}>{t}</span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="other-card__github"
      >
        <GithubIcon />
        GitHub
      </a>
    </div>
  )
}

function MetricCard({ value, label }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={`metric-card reveal${visible ? ' visible' : ''}`}
    >
      <div className="metric-card__value">{value}</div>
      <div className="metric-card__label">{label}</div>
    </div>
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

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
