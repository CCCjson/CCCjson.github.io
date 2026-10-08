import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Picture from '../Picture';
import { AXIS, history, kindColor, type HistoryEntry } from '../../data/history';

const pct = (year: number) => ((year - AXIS.start) / AXIS.span) * 100;
const TICKS = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];

function colorVars(e: HistoryEntry) {
  const { c, on } = kindColor[e.kind];
  return { '--c': c, '--on': on } as CSSProperties;
}

function Lane({ name, color, entries, selected, onPick }: { name: string; color: string; entries: HistoryEntry[]; selected: string; onPick: (id: string) => void }) {
  return (
    <>
      <span className="lane-name" style={{ color }}>{name}</span>
      <div className="lane">
        {entries.map((e) => (
          <button
            type="button"
            key={e.id}
            className={`hbar${e.id === selected ? ' on' : ''}`}
            aria-label={`${e.role}, ${e.dates}`}
            aria-pressed={e.id === selected}
            onClick={() => onPick(e.id)}
            style={{ ...colorVars(e), left: `${pct(e.start)}%`, width: `${pct(e.end) - pct(e.start)}%`, animationDelay: `${0.15 * history.indexOf(e)}s` }}
          >
            {e.end - e.start > 0.6 ? e.label : ''}
          </button>
        ))}
      </div>
    </>
  );
}

function Panel({ e, onStep }: { e: HistoryEntry; onStep: (dir: -1 | 1) => void }) {
  return (
    // keyed by id in the parent so the entry animation replays on every switch
    <div className="hpanel" style={colorVars(e)}>
      <div className="photo">
        <Picture name={e.image.name} widths={e.image.widths} sizes="(min-width: 900px) 45vw, 100vw" alt={e.image.caption} />
        <div className="scrim" />
        <span className="photo-cap">{e.image.caption}</span>
        <span className="badge">{e.kind}</span>
      </div>
      <div className="body">
        <div className="fade" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className="dates">{e.dates}</span>
          <h3>{e.role}</h3>
          <span className="org">{e.org}</span>
        </div>
        <p className="short fade f1">{e.short}</p>
        <ul className="fade f2">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        <div className="chips fade f3">{e.tags.map((t) => <span className="chip flat" key={t}>{t}</span>)}</div>
        <div className="foot">
          {e.link && <Link to={e.link.to}>{e.link.label} →</Link>}
          <span style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <button type="button" className="hnav" onClick={() => onStep(-1)} aria-label="Previous (earlier)">←</button>
            <button type="button" className="hnav" onClick={() => onStep(1)} aria-label="Next (later)">→</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const [selected, setSelected] = useState('ntu');
  const index = history.findIndex((e) => e.id === selected);
  const step = (dir: -1 | 1) => setSelected(history[(index + dir + history.length) % history.length].id);

  return (
    <section id="history" className="h-sec">
      <div className="h-head rv">
        <h2>Career History</h2>
        <span className="hint">click a bar to open it</span>
      </div>
      <div className="lanes rv">
        <Lane name="Education" color="#8f4dff" entries={history.filter((e) => e.lane === 'edu')} selected={selected} onPick={setSelected} />
        <Lane name="Work & research" color="#c99a1e" entries={history.filter((e) => e.lane === 'work')} selected={selected} onPick={setSelected} />
        <span />
        <div className="axis" aria-hidden="true">
          {TICKS.map((y) => <span className="tick" key={y} style={{ left: `${pct(y)}%` }}>{y}</span>)}
          <span className="now-dot" style={{ left: `${pct(AXIS.now)}%` }} />
          <span className="now-lbl" style={{ left: `${pct(AXIS.now)}%` }}>now</span>
        </div>
      </div>
      <Panel key={selected} e={history[index]} onStep={step} />
    </section>
  );
}
