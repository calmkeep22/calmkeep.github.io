/*
 * Hand-drawn night-sky marks scattered behind the hero.
 * Strokes are slightly uneven on purpose so they read as chalk doodles, not icons.
 * Positions are percentages of the hero; `wide` marks hide on narrow screens
 * where they would sit under the text.
 */

const Star = () => (
  <path
    d="M12 2.5c.6 4.3 2.6 6.6 7.1 7.4-4.4.9-6.4 3.2-7.2 7.6-.7-4.4-2.8-6.6-7.3-7.5 4.5-.8 6.7-3.2 7.4-7.5Z"
    strokeLinejoin="round"
  />
)

const Cross = () => (
  <>
    <path d="M12 5.5v13" />
    <path d="M5.6 12.2h12.8" />
  </>
)

const Dot = () => <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />

const Planet = () => (
  <>
    <path d="M32.5 13.2c6.8.3 11.6 6 11.3 12.6-.4 6.9-6.1 11.8-12.9 11.4-6.6-.4-11.3-6.1-11-12.6.4-6.7 6-11.7 12.6-11.4Z" />
    <path d="M18.6 31.4c-6.9 3.5-10.6 6.8-9.3 8.6 2 2.7 13.9-.9 26.6-8.1 12.6-7.1 21.3-15.6 19.3-18.4-1.2-1.7-6.3-.9-12.9 1.7" />
    <path d="M27 20.5c1.6-1.3 3.6-1.8 5.6-1.5" />
  </>
)

const Rocket = () => (
  <>
    <path d="M30.6 6.4c-7.4 2.3-12.8 8.9-15 17.2l6.6 6.5c8.4-2.2 15-7.6 17.2-15 .9-3.1.7-6.1-.2-8.6-2.5-.9-5.5-1.1-8.6-.1Z" />
    <circle cx="28.3" cy="17.6" r="3.1" />
    <path d="M15.8 23.4 9.4 22.6l4.8-7.1 6.6-.6" />
    <path d="M22.4 30.2l.8 6.4 7.1-4.8.6-6.6" />
    <path d="M14.1 29.8c-2.6 1.1-4.2 3.6-4.6 7.9 4.3-.4 6.8-2 7.9-4.6" />
  </>
)

const ShootingStar = () => (
  <>
    <path d="M47.5 9.8c.4 2.8 1.7 4.3 4.6 4.8-2.9.6-4.2 2.1-4.7 5-.5-2.9-1.8-4.3-4.8-4.9 2.9-.5 4.4-2.1 4.9-4.9Z" strokeLinejoin="round" />
    <path d="M40.6 18.4 6.5 34.2" />
    <path d="M41.5 23.1 17.8 34.6" />
  </>
)

const SHAPES = {
  star: { el: Star, box: 24 },
  cross: { el: Cross, box: 24 },
  dot: { el: Dot, box: 24 },
  planet: { el: Planet, box: 58 },
  rocket: { el: Rocket, box: 44 },
  shooting: { el: ShootingStar, box: 56 },
}

const MARKS = [
  { shape: 'rocket', top: '24%', left: '2.5%', size: 56, tone: 'sky', rotate: -8, wide: true },
  { shape: 'planet', top: '4%', right: '2%', size: 92, tone: 'peach', rotate: -6, wide: true },
  { shape: 'shooting', top: '11%', left: '51%', size: 84, tone: 'cream', rotate: 0, wide: true },
  { shape: 'star', top: '10%', left: '20%', size: 22, tone: 'yellow', twinkle: 0 },
  { shape: 'star', top: '86%', right: '9%', size: 22, tone: 'yellow', twinkle: 1.6, wide: true },
  { shape: 'star', top: '27%', left: '57%', size: 16, tone: 'cream' },
  { shape: 'cross', top: '13%', left: '58%', size: 14, tone: 'yellow' },
  { shape: 'dot', top: '46%', left: '4%', size: 10, tone: 'cream', wide: true },
]

export default function SkyDoodles() {
  return (
    <div className="sky" aria-hidden="true">
      {MARKS.map((m, i) => {
        const { el: Shape, box } = SHAPES[m.shape]
        return (
          <svg
            key={i}
            className={`sky__mark sky__mark--${m.tone}${m.wide ? ' sky__mark--wide' : ''}${
              m.twinkle !== undefined ? ' sky__mark--twinkle' : ''
            }`}
            style={{
              top: m.top,
              left: m.left,
              right: m.right,
              width: m.size,
              height: m.size,
              '--rot': `${m.rotate || 0}deg`,
              '--delay': `${m.twinkle || 0}s`,
            }}
            viewBox={`0 0 ${box} ${box}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={box > 30 ? 1.8 : 1.5}
            strokeLinecap="round"
          >
            <Shape />
          </svg>
        )
      })}
    </div>
  )
}
