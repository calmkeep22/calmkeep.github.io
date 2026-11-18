import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Education from './components/Education'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <TechStack />
        <Education />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© 2026 장효석, 동국대학교 컴퓨터공학부</span>
          <span className="footer__links">
            <a href="https://github.com/calmkeep22" target="_blank" rel="noopener noreferrer">
              github.com/calmkeep22
            </a>
            <a href="https://velog.io/@keepcalm22/posts" target="_blank" rel="noopener noreferrer">
              velog.io/@keepcalm22
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}
