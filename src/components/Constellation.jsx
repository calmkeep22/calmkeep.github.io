/*
 * The request path drawn as a constellation along the bottom of the hero:
 * Client, API, Queue, Worker and DB are stars joined by a dashed chalk line.
 * x and y are percentages of the strip.
 */
const NODES = [
  { label: 'Client', x: 5, y: 64 },
  { label: 'API', x: 27, y: 28 },
  { label: 'Queue', x: 50, y: 60 },
  { label: 'Worker', x: 73, y: 24 },
  { label: 'DB', x: 95, y: 56 },
]

export default function Constellation() {
  const points = NODES.map((n) => `${n.x},${n.y}`).join(' ')
  return (
    <div className="constellation" aria-hidden="true">
      <svg className="constellation__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={points} vectorEffect="non-scaling-stroke" />
      </svg>
      {NODES.map((n) => (
        <span className="constellation__node" key={n.label} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2.5c.6 4.3 2.6 6.6 7.1 7.4-4.4.9-6.4 3.2-7.2 7.6-.7-4.4-2.8-6.6-7.3-7.5 4.5-.8 6.7-3.2 7.4-7.5Z" />
          </svg>
          <span className="constellation__label">{n.label}</span>
        </span>
      ))}
    </div>
  )
}
