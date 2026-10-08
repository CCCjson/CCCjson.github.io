import { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import Expertise from '../components/home/Expertise';
import History from '../components/home/History';
import Projects from '../components/home/Projects';
import Contact from '../components/home/Contact';
import { GitHubIcon, LinkedInIcon, MoonIcon, SunIcon } from '../components/Icons';
import { links } from '../data/profile';
import '../styles/home.css';

type Theme = 'dark' | 'light';

function readTheme(): Theme {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch { /* private mode: keep it in memory */ }
  }, [theme]);

  return (
    <div className={`page${theme === 'light' ? ' theme-light' : ''}`}>
      <header className="h-nav">
        <nav>
          <button type="button" className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle light and dark mode">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <div className="links">
            <a href="#expertise">Expertise</a>
            <a href="#history">History</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>
      <main>
        <Hero />
        <Expertise />
        <History />
        <Projects />
        <Contact />
      </main>
      <footer className="h-foot">
        <div style={{ display: 'flex', gap: 6 }}>
          <a className="icon-btn" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon size={26} /></a>
          <a className="icon-btn" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon size={24} /></a>
        </div>
        <p>Designed &amp; built by Chen Jinsheng · based on <a href="https://github.com/yujisatojr/react-portfolio-template" target="_blank" rel="noreferrer">react-portfolio-template</a></p>
      </footer>
    </div>
  );
}
