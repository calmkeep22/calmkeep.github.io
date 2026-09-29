import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Education from './components/Education'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <TechStack />
        <Education />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© 2025 장효석. Dongguk University · CS&amp;E</span>
          <a href="https://github.com/calmkeep22" target="_blank" rel="noopener noreferrer">
            github.com/calmkeep22
          </a>
        </div>
      </footer>
    </>
  )
}
