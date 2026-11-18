const CATEGORIES = [
  { name: 'Backend', items: ['Python', 'Java', 'FastAPI', 'Spring Boot'] },
  { name: 'Data', items: ['MySQL', 'PostgreSQL', 'Redis', 'RabbitMQ'] },
  { name: 'AI', items: ['RAG', 'LangChain', 'Chroma', 'Whisper'] },
  { name: 'Streaming', items: ['WebRTC', 'SSE', 'MediaMTX'] },
  { name: 'Infra', items: ['AWS', 'Docker', 'GitHub Actions'] },
  { name: 'Testing', items: ['pytest', 'JUnit', 'Testcontainers'] },
]

export default function TechStack() {
  return (
    <section className="section techstack" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <h2 className="section__title" id="skills-title">기술 스택</h2>

        <dl className="stack">
          {CATEGORIES.map((cat) => (
            <div className="stack__row" key={cat.name}>
              <dt className="stack__name">{cat.name}</dt>
              <dd className="stack__items">
                <ul>
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
