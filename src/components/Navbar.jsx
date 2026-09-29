import { useState, useEffect } from 'react'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar__inner">
        <ul className={`navbar__links${open ? ' open' : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>

        <button
          className="navbar__hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label="메뉴 열기"
        >
          <span style={open ? { transform: 'rotate(45deg) translateY(7px)' } : {}} />
          <span style={open ? { opacity: 0 } : {}} />
          <span style={open ? { transform: 'rotate(-45deg) translateY(-7px)' } : {}} />
        </button>
      </div>
    </nav>
  )
}
