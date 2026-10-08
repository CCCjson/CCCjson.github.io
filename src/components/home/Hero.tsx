import { useMemo, useState } from 'react';
import Picture from '../Picture';
import { ChevronDown, ExpandIcon, GitHubIcon, LinkedInIcon } from '../Icons';
import { links } from '../../data/profile';

/** Spine of the silk ribbon as cubic segments; each point carries its own half-width so the band twists. */
const SPINE = [[0, 870], [200, 700], [300, 640], [420, 690], [600, 760], [950, 820], [1100, 560], [1200, 400], [1300, 130], [1600, 120], [1800, 115], [1900, 260], [2000, 330]];
const WIDTH = [60, 40, 0, -14, 80, 190, 40, -30, 0, 24, 30, 70, 130];

function ribbon(lines: number, twist: number, lift: number) {
  const out: string[] = [];
  for (let i = 0; i < lines; i++) {
    const k = (i / (lines - 1) - 0.5) * twist;
    const q = SPINE.map(([x, y], j) => `${x} ${Math.round((y + WIDTH[j] * k + lift) * 10) / 10}`);
    let d = `M${q[0]}`;
    for (let s = 1; s < q.length; s += 3) d += ` C${q[s]} ${q[s + 1]} ${q[s + 2]}`;
    out.push(d);
  }
  return out.join(' ');
}

function SilkWave() {
  const [front, back] = useMemo(() => [ribbon(44, 1, 0), ribbon(28, -1.4, 18)], []);
  return (
    <svg className="silk" viewBox="0 0 2000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="silk" x1="0" y1="0" x2="2000" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e100ff" />
          <stop offset=".55" stopColor="#8a1fd0" />
          <stop offset="1" stopColor="#4b2cb8" />
        </linearGradient>
      </defs>
      <g className="sway2" opacity=".35"><path className="wave" d={back} fill="none" stroke="url(#silk)" strokeWidth="1.2" /></g>
      <g className="sway"><path className="wave" d={front} fill="none" stroke="url(#silk)" strokeWidth="1.6" /></g>
    </svg>
  );
}

function Avatar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="ava-slot">
      <button type="button" className={`ava${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Show full photo" aria-pressed={open}>
        <Picture name="avatar" widths={[450, 900]} sizes="280px" loading="eager" alt="Chen Jinsheng (Jason), smiling, on a rooftop at night with city lights behind" />
        <span className="ava-cap">Off the clock.</span>
      </button>
      <span className="ava-badge" aria-hidden="true"><ExpandIcon /></span>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <SilkWave />
      <div className="inner">
        <Avatar />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div className="socials rise d1">
            <a className="icon-btn" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon size={32} /></a>
            <a className="icon-btn" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon size={30} /></a>
          </div>
          <h1 className="rise d2">Chen Jinsheng</h1>
          <p className="title rise d3">Quant Research &amp; ML Engineer</p>
          <p className="typed-line rise d4"><span className="typed">M.Sc. @ NTU · alpha research · C++17 engines</span><span className="caret" /></p>
        </div>
      </div>
      <a href="#expertise" className="scroll-cue" aria-label="Scroll to Expertise"><ChevronDown /></a>
    </section>
  );
}
