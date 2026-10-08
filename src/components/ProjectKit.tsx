import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BackIcon } from './Icons';
import { neighbours } from '../data/projects';
import '../styles/project.css';

type Anchor = { href: string; label: string };

export function ProjectLayout({ slug, anchors, github, children }: { slug: string; anchors: Anchor[]; github?: string; children: ReactNode }) {
  const { prev, next } = neighbours(slug);
  return (
    <div className="page">
      <header className="p-nav">
        <nav>
          <Link to="/#projects" className="back"><BackIcon />All projects</Link>
          <div className="links">
            {anchors.map((a) => <a key={a.href} href={a.href}>{a.label}</a>)}
            {github && <a className="gh" href={github} target="_blank" rel="noreferrer">GitHub ↗</a>}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="p-foot">
        {prev ? <Link to={`/projects/${prev.slug}`}>← {prev.name}</Link> : <Link to="/#projects">← All projects</Link>}
        {next ? <Link className="next" to={`/projects/${next.slug}`}>Next: {next.name} →</Link> : <Link className="next" to="/#projects">Back to all projects →</Link>}
      </footer>
    </div>
  );
}

export type StatItem = { value: ReactNode; label: string; color?: string };

export function Stats({ items, two }: { items: StatItem[]; two?: boolean }) {
  return (
    <div className={`stats rise d3${two ? ' two' : ''}`}>
      {items.map((s, i) => (
        <div className="stat" key={i}>
          <b style={s.color ? { color: s.color } : undefined}>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Hero({ meta, title, lead, stats, aside, twoStats }: { meta: string; title: ReactNode; lead: string; stats: StatItem[]; aside?: ReactNode; twoStats?: boolean }) {
  const body = (
    <>
      <p className="meta rise">{meta}</p>
      <h1 className="rise d1">{title}</h1>
      <p className="lead rise d2">{lead}</p>
      <Stats items={stats} two={twoStats} />
    </>
  );
  if (!aside) return <section className="p-hero">{body}</section>;
  return (
    <section className="p-hero split">
      <div className="col">{body}</div>
      {aside}
    </section>
  );
}

export function Section({ id, num, kicker, title, lead, note, first, children }: { id?: string; num: string; kicker: string; title: ReactNode; lead?: ReactNode; note?: string; first?: boolean; children?: ReactNode }) {
  return (
    <section id={id} className={`p-sec${first ? ' first' : ''}`}>
      <div className="p-head rv">
        <span className="kicker">{num} // {kicker}</span>
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
        {note && <p className="note">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export function Grid({ min = 340, gap = 24, align, className = '', children }: { min?: number; gap?: number; align?: string; className?: string; children: ReactNode }) {
  const style = { '--min': `${min}px`, '--gap': `${gap}px`, ...(align ? { '--align': align } : {}) } as CSSProperties;
  return <div className={`grid-auto ${className}`} style={style}>{children}</div>;
}

export type Finding = { big?: ReactNode; title?: string; text: ReactNode; color?: string };

export function Findings({ items, min = 340 }: { items: Finding[]; min?: number }) {
  return (
    <Grid min={min}>
      {items.map((f, i) => (
        <article className="card rv" key={i}>
          {f.big && <span className="big" style={f.color ? { color: f.color } : undefined}>{f.big}</span>}
          {f.title && <h3>{f.title}</h3>}
          <p>{f.text}</p>
        </article>
      ))}
    </Grid>
  );
}

export type Fix = [problem: ReactNode, fix: ReactNode];

export function Fixes({ items, min = 460 }: { items: Fix[]; min?: number }) {
  return (
    <Grid min={min} gap={20}>
      {items.map(([problem, fix], i) => (
        <div className="fix rv" key={i}>
          <span>{problem}</span>
          <span className="arrow" aria-hidden="true">→</span>
          <span>{fix}</span>
        </div>
      ))}
    </Grid>
  );
}

export type Bar = { label: ReactNode; pct: number; value: ReactNode; color: string; muted?: boolean };

export function Bars({ items, small, label, value }: { items: Bar[]; small?: boolean; label?: number; value?: number }) {
  const style = { ...(label ? { '--label': `${label}px` } : {}), ...(value ? { '--value': `${value}px` } : {}) } as CSSProperties;
  return (
    <div className={`bars rv${small ? ' sm' : ''}`} style={style}>
      {items.map((b, i) => (
        <div className="bar-row" key={i} style={b.muted ? { color: 'var(--dim)' } : undefined}>
          <span>{b.label}</span>
          <div className="track"><div className="fill grow-x" style={{ width: `${b.pct}%`, background: b.color, animationDelay: `${i * 0.08}s` }} /></div>
          <span className="val">{b.value}</span>
        </div>
      ))}
    </div>
  );
}

export type StripItem = { k: string; v: string; s: string };

export function Strip({ items }: { items: StripItem[] }) {
  return (
    <div className="strip rv">
      {items.map((it) => (
        <div key={it.k}><span className="k">{it.k}</span><span className="v">{it.v}</span><span className="s">{it.s}</span></div>
      ))}
    </div>
  );
}

export type FlowNode = { title: ReactNode; sub?: ReactNode; tone?: 'accent' | 'gold' };

export function FlowColumn({ caption, nodes, footer }: { caption: string; nodes: FlowNode[]; footer?: ReactNode }) {
  return (
    <div className="flow-col">
      <span className="cap">{caption}</span>
      {nodes.map((n, i) => (
        <div key={i}>
          {i > 0 && <div className="flow-v" />}
          <div className={`node${n.tone ? ' ' + n.tone : ''}`}><b>{n.title}</b>{n.sub && <small>{n.sub}</small>}</div>
        </div>
      ))}
      {footer}
    </div>
  );
}

export function FlowRow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="flow-row rv">
      {nodes.map((n, i) => (
        <div key={i} style={{ display: 'contents' }}>
          {i > 0 && <div className="flow-h" />}
          <div className={`node${n.tone ? ' ' + n.tone : ''}`}><b>{n.title}</b>{n.sub && <small>{n.sub}</small>}</div>
        </div>
      ))}
    </div>
  );
}

export function NextNote({ num, kicker = 'next', children }: { num: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="p-sec" style={{ paddingBottom: 56 }}>
      <div className="next-note rv">
        <span className="kicker">{num} // {kicker}</span>
        {children}
      </div>
    </section>
  );
}
