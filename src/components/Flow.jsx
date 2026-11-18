/*
 * A small processing-flow diagram for a project case.
 * steps: array of { label, note?, main? } or { parallel: [{ label, note? }] }.
 * `main: true` marks the step the case's main result depends on.
 */
export default function Flow({ steps, label }) {
  return (
    <figure className="flow" aria-label={label}>
      <ol className="flow__track">
        {steps.map((step, i) => (
          <li className="flow__step" key={i}>
            {step.parallel ? (
              <ul className="flow__parallel">
                {step.parallel.map((p) => (
                  <li key={p.label}>
                    <Node {...p} />
                  </li>
                ))}
              </ul>
            ) : (
              <Node {...step} />
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

function Node({ label, note, main }) {
  return (
    <span className={`flow__node${main ? ' flow__node--main' : ''}`}>
      <span className="flow__label">{label}</span>
      {note && <span className="flow__note">{note}</span>}
    </span>
  )
}
