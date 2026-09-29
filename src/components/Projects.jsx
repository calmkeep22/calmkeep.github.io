import { useInView } from '../hooks/useInView'

const PROJECTS = [
  {
    id: '01',
    title: 'DeepGU',
    subtitle: 'VLM 기반 실시간 CCTV 이상행동 분석 플랫폼',
    type: '팀 프로젝트 · 캡스톤 디자인',
    role: '백엔드 · 인프라',
    desc: 'OBS 영상 송출부터 AI 추론, 실시간 알림까지 전 구간 스트리밍·백엔드 인프라를 설계하고 구축했다. 핵심 목표는 두 가지였다 — VLM 연산 비용을 낮추는 것과 영상·알림의 실시간성을 확보하는 것.',
    problems: [
      {
        title: '높은 VLM 연산 비용',
        problem: '일정 주기로 전 프레임에 VLM을 수행해 연산 비용이 높았고, CCTV 수가 증가할수록 처리량이 급격히 늘어나는 구조였다.',
        solution: 'Fast Model로 이상행동 후보를 1차 선별하고, Event Builder로 의미 단위 이벤트를 구성한 뒤, Keyframe Selection으로 이벤트 내 핵심 프레임만 추출하는 3단계 필터링 파이프라인을 설계했다.',
      },
      {
        title: '낮은 실시간성',
        problem: 'HLS 기반 스트리밍 구조에서는 수 초 이상의 영상 지연이 발생해 이상행동 발생 시 즉각적인 대응이 어려웠다.',
        solution: 'MediaMTX를 중앙 스트리밍 허브로 두고 WebRTC 기반 저지연 송출로 전환했으며, 이벤트 알림은 SSE(asyncio.Queue 기반 broadcaster)로 실시간 전달했다.',
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
    desc: '"이 문제, 우리 회사에서 이미 누가 풀지 않았을까?"에서 출발해, 흩어진 Jira 이슈와 GitHub PR에서 비슷한 과거 업무와 해결 방법, 경험 있는 팀원을 근거와 함께 찾아 주는 서비스. 명세·ADR·테스트 기록을 먼저 두고 인증, scope·grant 접근 모델, 작업 엔진, Jira 증분 동기화를 단계별로 구현했다. 데모에서는 검색 결과를 먼저 돌려주고 AI 설명은 두 번째 요청으로 채우는 두 단계 검색을 적용했다.',
    problems: [
      {
        title: 'UUIDv7을 써도 줄지 않던 PK 인덱스 단편화',
        problem: '정렬 가능한 UUIDv7로 PK를 바꿨는데도 100만 행 벤치마크에서 리프 채움률이 UUIDv4와 같은 70%대였다. 배치 INSERT 시 같은 밀리초에 수백 개 ID가 생기고, 그 안의 하위 비트가 무작위라 최신 리프 안에서 중간 분할이 반복되고 있었다.',
        solution: '생성기를 RFC 9562 Method 2(monotonic random)로 바꿔 같은 밀리초 안에서도 값이 증가하도록 했다. 측정 과정에서 Docker 왕복 지연(약 10ms)이 인덱스 탐색 비용(µs)을 가리는 것을 확인하고 EXPLAIN ANALYZE 기반으로 측정 방식을 바꿨으며, 실행마다 흔들리는 시간 지표 대신 인덱스 구조 지표로 결론을 냈다.',
      },
      {
        title: '실행기 장애 시 작업 유실·중복 실행',
        problem: '외부 API 동기화와 AI 작업은 오래 걸리고 요청 제한·일시 오류가 잦다. 실행기가 도중에 죽으면 작업이 RUNNING에 멈추거나, 복구 후 이전 실행기와 새 실행기가 같은 작업의 결과를 동시에 쓸 수 있었다.',
        solution: '슬롯 확보와 QUEUED→RUNNING 전환을 한 트랜잭션으로 묶고, lease(120초)·heartbeat(30초)와 run_token으로 소유권을 검증해 lease를 잃은 실행기의 결과·완료 요청은 모두 거절했다. 재시도는 exponential backoff + jitter에 Retry-After를 존중하고, Jira 동기화는 페이지와 cursor를 한 트랜잭션에 저장해 실패 지점부터 누락·중복 없이 재개한다.',
      },
    ],
    metrics: [
      { value: '90.0%', label: 'PK 리프 채움률 (기존 70.7%)' },
      { value: '↓ 21%', label: 'PK 인덱스 크기 (100만 행)' },
      { value: '0%', label: '리프 단편화 (기존 49.6%)' },
      { value: '220건', label: '테스트 (단위 153 · 통합 67)' },
    ],
    metricsClass: 'metrics--4col',
    github: 'https://github.com/calmkeep22/KnowledgeLink',
    tech: ['Java 21', 'Spring Boot 4.1', 'PostgreSQL', 'pgvector', 'Flyway', 'Testcontainers', 'OpenTelemetry', 'Grafana', 'AWS Bedrock', 'Docker Compose'],
  },
  {
    id: '03',
    title: 'OpenStock Access',
    subtitle: '시각장애인·저시력 사용자를 위한 접근성 주식 모의투자 앱',
    type: '오픈소스 팀 프로젝트 · 2026 OSS',
    role: '접근성 · 아키텍처 · AI 연동',
    desc: '키보드·스크린리더·음성 명령·청각 차트만으로 주식 정보를 탐색하고 모의주문을 연습할 수 있는 JavaFX 데스크톱 앱. 3인 팀에서 커밋의 약 90%를 맡아 멀티모듈 헥사고날 구조, 접근성 UI, TTS 큐와 청각 차트, 음성 명령, Python AI 서비스 연동을 구현했다. 음성으로는 주문을 확정하지 않고 재확인 창을 거치게 하는 등, 화면을 볼 수 없는 사용자에게 되돌릴 수 없는 일이 일어나지 않도록 설계했다.',
    problems: [
      {
        title: '밀려서 들리는 화면 안내',
        problem: 'TTS가 문장마다 PowerShell 프로세스를 새로 띄워, 실측 결과 한 문장에 0.97초(프로세스 기동 0.45초 + System.Speech 적재)가 들었다. 안내가 연달아 나오면 그만큼 밀려 사용자는 이미 지나간 화면의 설명을 듣게 됐다.',
        solution: '낭독 프로세스를 한 번만 띄워 상주시키고 한 줄씩 주고받아 기동 비용을 첫 문장에만 치르게 했다. 같은 종류의 새 안내가 오면 읽던 낡은 안내를 끊되 주문 안내는 끝까지 읽도록 우선순위를 나눴고, 종목명의 공백·따옴표로 명령이 쪼개지지 않게 값을 Base64로 감쌌다.',
      },
      {
        title: '고대비 모드에서 사라지는 글자',
        problem: '기본 테마의 밝은 배경·짙은 글자 규칙이 고대비 모드에서도 살아남아, 표·목록 줄이 흰 바탕에 흰 글자가 되는 등 대비가 1.07:1까지 떨어진 곳이 있었다. 청각 차트는 Java Sound 기본 버퍼(0.5초 이상)만큼 소리가 화면 강조보다 늦게 나갔다.',
        solution: '눈으로 화면을 도는 대신 CSS 전체를 파싱해 규칙마다 배경·글자의 상대 휘도를 계산하고, 고대비 대응이 빠진 규칙 117개를 찾아 고쳤다. 청각 차트는 출력 버퍼를 150ms로 고정하고 그 지연값을 Port로 흘려 화면 강조가 같은 만큼 기다리게 맞췄으며, 수정한 지점은 헤드리스 JavaFX 접근성 회귀 테스트로 고정했다.',
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
    tech: ['Java 17', 'JavaFX', 'Gradle 멀티모듈', 'Hexagonal', 'Python', 'Whisper', 'SQLite', 'Windows DPAPI', 'WebSocket', 'Java Sound'],
  },
  {
    id: '04',
    title: 'FinGuard AI',
    subtitle: '금융상품 상담 설명의무 검수 AI',
    type: '개인 프로젝트 · 2026 금융 AI Challenge',
    role: 'AI 파이프라인 · 백엔드',
    desc: '금융상품 설명서와 실제 상담 내용을 비교해 필수 설명 누락과 불충분한 설명을 근거와 함께 탐지하는 검수 서비스. 단일 프롬프트 대신 요구사항 추출 → 조항 검색 → 상담 근거 추출 → COVERED/PARTIAL/MISSING 판정 → Rule Engine 교정의 단계형 파이프라인으로 설계하고, 30개 상담 시나리오·180개 라벨의 평가셋으로 LLM 단독 Baseline과 비교 측정했다.',
    problems: [
      {
        title: 'LLM이 지어낸 판정 근거',
        problem: 'LLM에 문서와 상담을 통째로 주고 판단시키는 Baseline은 판정 근거로 제시한 문장의 절반 이상이 입력 문서·상담에 실제로 없는 문장이었다(근거 정합률 46.3%). 고객의 질문을 상담사의 설명으로 인정하는 오류도 있었다.',
        solution: '상담사 발화만 근거로 인정하고 글자 그대로 복사하도록 단계를 나눴다. LLM이 요약하거나 이어 붙인 근거는 원문 문장으로 복원하고, 복원되지 않는 근거의 COVERED/PARTIAL 판정은 Rule Engine이 MISSING으로 강등한 뒤 교정 내역을 화면에 그대로 노출했다. Rule Engine은 LLM 없이 도는 48개 단위 검사로 검증했다.',
      },
      {
        title: '74초 걸리던 분석 시간',
        problem: '카테고리별로 검색한 조항 발췌가 프롬프트에 중복으로 들어가고, 단일 필드 스키마에 배열이 오면 재요청하느라 LLM 호출이 늘어 한 건 분석에 74초가 걸렸다.',
        solution: '조항을 chunk_id로 참조하게 바꿔 중복 발췌를 없애고, 배열 응답은 자동으로 감싸 흡수해 LLM 호출을 3회에서 2회로 줄였다. temperature=0에서도 PARTIAL F1이 실행마다 7%p 흔들리는 것을 확인해, 모든 지표를 단일 수치가 아닌 3회 실행 범위로 보고했다.',
      },
    ],
    metrics: [
      { value: '96~98%', label: '근거 정합률 (Baseline 46.3%)' },
      { value: '91~96%', label: 'MISSING Recall' },
      { value: '74s → 15s', label: '건당 분석 시간' },
      { value: '180개', label: '평가 라벨 (시나리오 30개)' },
    ],
    metricsClass: 'metrics--4col',
    github: 'https://github.com/calmkeep22/FinGuard',
    tech: ['Python', 'FastAPI', 'Mistral', 'RAG', 'Embedding', 'STT', 'Rule Engine', 'Docker', 'Hugging Face Spaces'],
  },
  {
    id: '05',
    title: 'GeoMemo',
    subtitle: '위치 기반 감정 기록 & 인사이트 플랫폼',
    type: '오픈소스 팀 프로젝트 · 2025 OSS',
    role: '백엔드 · AI 연동',
    desc: '장소·시간과 연결된 감정 기록을 시각화하고 인사이트를 제공하는 플랫폼. FastAPI 백엔드에 LLM 기반 감정 분석을 연동하고 RabbitMQ로 비동기 처리 구조를 적용했다.',
    problems: [
      {
        title: 'LLM 분석 지연으로 인한 API 블로킹',
        problem: '감정 분석에 사용하는 LLM 호출이 약 3초 소요되어, 동기 처리 시 기록 API 응답시간도 그만큼 늘어나 사용자가 그대로 대기해야 했다.',
        solution: 'RabbitMQ(Amazon MQ)로 분석 작업을 큐에 분리했다. 기록 API는 메시지를 publish한 뒤 즉시 응답하고, AI Worker가 별도로 큐를 consume하여 LLM 호출과 DB 저장을 처리한다.',
      },
    ],
    metrics: [
      { value: '3,030ms', label: '동기 응답시간 (Before)' },
      { value: '~150ms', label: '비동기 응답시간 (After)' },
      { value: '~20×', label: '응답 개선율 (95% 단축)' },
      { value: '~20건/분', label: '워커 처리량 (prefetch=1)' },
    ],
    metricsClass: 'metrics--4col',
    github: 'https://github.com/2025-OSS-Project',
    tech: ['Python', 'FastAPI', 'RabbitMQ', 'Amazon MQ', 'MySQL', 'AWS RDS', 'CloudFront', 'ALB', 'Docker'],
  },
  {
    id: '06',
    title: 'MaeumNaru',
    subtitle: '감정 일기 & 마음 건강 플랫폼',
    type: null,
    role: '백엔드 · AI 연동 · 인프라',
    desc: '감정 일기 작성, KoBERT 기반 감정 분류, 명상 음원, 그림 치료, 실시간 채팅을 제공하는 웹 서비스. Spring Boot 백엔드에서 JWT 인증, 감정 일기 CRUD, KoBERT 감정 분석 서버 연동, S3 파일 저장, WebSocket 채팅, Redis 세션 캐시, AWS 기반 배포 환경을 구현했다.',
    problems: [
      {
        title: 'AI 감정 분석 서버와 서비스 백엔드 분리',
        problem: '감정 일기 작성 후 KoBERT 모델을 통해 감정을 분류해야 했지만, 모델 서버와 서비스 백엔드가 강하게 결합되면 배포와 장애 대응이 어려워질 수 있었다.',
        solution: 'Spring Boot 백엔드와 KoBERT 감정 분류 서버를 분리하고, 백엔드에서 REST API로 모델 서버를 호출하는 구조를 적용했다. 사용자가 일기를 작성하면 백엔드는 일기 데이터를 저장하고, KoBERT 서버에 분석 요청을 보내 감정 분류 결과를 함께 관리하도록 설계했다.',
      },
    ],
    metrics: [
      { value: 'Spring Boot 3.x', label: '백엔드 API' },
      { value: 'KoBERT', label: '감정 분석 연동' },
      { value: 'AWS S3/RDS', label: '파일·데이터 관리' },
      { value: 'WebSocket', label: '실시간 채팅' },
    ],
    metricsClass: 'metrics--4col',
    github: 'https://github.com/calmkeep22/2025-1-CSC4004-1-7-aco',
    tech: ['Spring Boot 3.x', 'Java', 'KoBERT', 'JWT', 'AWS S3', 'AWS RDS', 'WebSocket', 'Redis', 'REST API'],
  },
  {
    id: '07',
    title: 'RAG Code Reviewer',
    subtitle: 'Codebase + 공식문서 RAG 기반 코드 리뷰 시스템',
    type: '개인 프로젝트',
    role: '백엔드 · AI 연동',
    desc: '일반 LLM은 프로젝트 내부 코드를 모른 채 답하고, 공식문서 기준으로 코드가 적절한지도 판단하기 어렵다는 문제에서 출발했다. FastAPI 기반으로 코드베이스와 공식문서를 각각 인덱싱한 뒤, 질문마다 관련 코드·문서 chunk를 검색해 근거와 함께 리뷰를 생성하는 RAG 파이프라인을 설계했다.',
    problems: [
      {
        title: '파일 단위 chunking의 낮은 검색 정확도',
        problem: '코드와 문서를 파일 단위로만 분할하면 질문과 무관한 내용까지 함께 검색되어 관련성이 떨어지고, 어떤 근거로 답했는지 추적하기도 어려웠다.',
        solution: 'Python AST로 함수/메서드 단위 chunk를 만들어 검색은 작은 단위로 정밀하게 하되, 리뷰 생성 시엔 parent_start_line/end_line으로 클래스 전체를 다시 읽어오는 Small-to-Big 전략을 적용했다. 공식문서는 Markdown 헤더(h1~h3) 기준으로 분할해 문서 구조를 보존했다.',
      },
      {
        title: '벡터 검색만으로 약한 키워드/식별자 매칭',
        problem: 'dense vector 유사도 검색만으로는 함수명, 에러 코드처럼 정확한 키워드 매칭이 필요한 질문에서 관련 chunk를 놓치는 경우가 있었다.',
        solution: 'SQLite FTS5 기반 BM25 키워드 검색을 dense 검색과 병행하고 RRF(Reciprocal Rank Fusion, k=60)로 결합하는 하이브리드 검색을 구현했다. 리랭커 도입도 시도했으나 한국어 질문·영어 코드 혼합 환경에서 오히려 MRR이 하락하는 것을 eval로 확인하고, 실측 결과에 따라 opt-in으로만 남겼다.',
      },
    ],
    metrics: [
      { value: '0.82', label: 'Hybrid 검색 MRR' },
      { value: '35개', label: 'Eval 질문 데이터셋' },
      { value: 'opt-in', label: '리랭커 (실측 후 기본값 제외)' },
    ],
    metricsClass: 'metrics--3col',
    github: 'https://github.com/calmkeep22/langchain',
    tech: ['Python', 'FastAPI', 'LangChain', 'Chroma', 'SQLite FTS5', 'BM25', 'RRF'],
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
