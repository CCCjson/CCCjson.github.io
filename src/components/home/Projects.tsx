import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, type Category } from '../../data/projects';
import { PointerIcon } from '../Icons';

const FILTERS: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'quant', label: 'Quant' },
  { id: 'systems', label: 'Systems' },
  { id: 'ml', label: 'ML & Agents' },
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | Category>('all');
  const shown = filter === 'all' ? projects : projects.filter((p) => p.cats.includes(filter));

  return (
    <section id="projects" className="h-sec">
      <div className="h-head rv">
        <h2>Projects</h2>
        <div className="chips" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button type="button" key={f.id} className={`pill${filter === f.id ? ' on' : ''}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="proj-grid">
        {shown.map((p) => {
          const to = `/projects/${p.slug}`;
          return (
            <article className="proj rv" key={p.slug}>
              <Link className="thumb" to={to} aria-label={p.name}>
                <div className="shot">
                  <div className="top"><span>{p.kind}</span><span>{p.period}</span></div>
                  <svg className="spark" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true"><path d={p.spark} fill="none" stroke="#8f4dff" strokeWidth="2.5" /></svg>
                  <div className="metric"><b>{p.metric}</b><span>{p.metricLabel}</span></div>
                  <span className="tap-hint" aria-hidden="true"><span className="hand"><PointerIcon /></span>Click to explore</span>
                </div>
              </Link>
              <Link to={to}><h3>{p.name}</h3></Link>
              <p>{p.desc}</p>
              <div className="chips">{p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              <div className="actions">
                <Link className="primary" to={to}>Read the case study →</Link>
                {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
