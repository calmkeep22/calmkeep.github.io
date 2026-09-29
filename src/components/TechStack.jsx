import { useInView } from '../hooks/useInView'

const CATEGORIES = [
  {
    icon: '🐍',
    name: 'Language',
    pills: ['Python', 'Java'],
  },
  {
    icon: '⚡',
    name: 'Framework',
    pills: ['FastAPI', 'asyncio', 'Spring Boot', 'JavaFX'],
  },
  {
    icon: '🤖',
    name: 'AI / LLM',
    pills: ['RAG', 'LangChain', 'Chroma', 'pgvector', 'Whisper'],
  },
  {
    icon: '📡',
    name: 'Streaming',
    pills: ['MediaMTX', 'WebRTC', 'SSE', 'HLS'],
  },
  {
    icon: '☁️',
    name: 'Cloud / Infra',
    pills: ['AWS Bedrock', 'Amazon MQ', 'CloudFront', 'ALB', 'AWS RDS', 'EC2'],
  },
  {
    icon: '📨',
    name: 'Message Queue',
    pills: ['RabbitMQ'],
  },
  {
    icon: '🗄️',
    name: 'Database',
    pills: ['MySQL', 'PostgreSQL', 'SQLite', 'Redis'],
  },
  {
    icon: '🔧',
    name: 'DevOps',
    pills: ['Docker', 'Docker Compose', 'OBS'],
  },
  {
    icon: '📈',
    name: 'Observability / Test',
    pills: ['OpenTelemetry', 'Grafana', 'Testcontainers'],
  },
]

export default function TechStack() {
  return (
    <section className="section techstack" id="skills">
      <div className="container">
        <RevealBlock className="section__header">
          <p className="section__label">Skills</p>
          <h2 className="section__title">기술 스택</h2>
        </RevealBlock>

        <div className="techstack__grid">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ cat, delay }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={`techstack__category reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="techstack__cat-header">
        <span className="techstack__cat-icon" aria-hidden="true">{cat.icon}</span>
        <span className="techstack__cat-name">{cat.name}</span>
      </div>
      <div className="techstack__pills">
        {cat.pills.map((pill) => (
          <span className="techstack__pill" key={pill}>{pill}</span>
        ))}
      </div>
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
