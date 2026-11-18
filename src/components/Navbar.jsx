import { useState, useEffect } from 'react'

const links = [
  { id: 'projects', label: '프로젝트' },
  { id: 'skills', label: '기술 스택' },
  { id: 'education', label: '교육 및 수상' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        const current = links.find(({ id }) => visible.get(id))
        setActive(current ? current.id : null)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`navbar${scrolled || open ? ' scrolled' : ''}`}>
      <a href="#main" className="skip-link">본문으로 건너뛰기</a>
      <nav className="container navbar__inner" aria-label="주요 메뉴">
        <a href="#home" className="navbar__logo" aria-label="장효석, 맨 위로">
          JHS<span className="navbar__logo-dot">.</span>
        </a>
        <ul id="nav-links" className={`navbar__links${open ? ' open' : ''}`}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/calmkeep22"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__github"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="https://velog.io/@keepcalm22/posts" target="_blank" rel="noopener noreferrer" className="navbar__github">
              Velog
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={`navbar__toggle${open ? ' open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>
    </header>
  )
}
