import type { ReactNode } from 'react';
import { Bars, Findings, Fixes, FlowRow, Grid, Hero, NextNote, ProjectLayout, Section } from '../../components/ProjectKit';
import '../../styles/pages.css';

const GATE = {
  'buy side · 15': { bg: '#ffffff', fg: '#272822', checks: ['positions reconciled', 'connection live', 'setup tagged', 'stop present', 'per-trade risk', 'daily loss cap', 'cost / R', 'net reward : risk', 'settled cash', 'session hours', 'fresh quote', 'symbol allowed', 'stop placement', 'entry price', 'distance from market'] },
  "today's discipline · 5": { bg: '#e3b341', fg: '#1d1503', checks: ['trades today', 'losing-streak stop', "today's setups", 'plan-only', 'pre-market plan'] },
  'sell side · 1': { bg: '#c9a7ff', fg: '#1a1030', checks: ['sellable quantity'] },
};

/** Oct 6 commits: [hours since midnight, lines added, label]. */
const COMMITS: [number, number, string?][] = [
  [0.6, 3339, 'v0'], [1.03, 1614], [1.27, 12], [1.73, 2848, 'v2'], [3.98, 3228, 'v3'], [4.03, 522], [4.12, 138],
  [4.42, 136], [4.5, 149], [4.67, 96], [4.78, 24], [14.68, 4], [18.73, 724, 'TUI'],
];

/** Measured AI latency in seconds: [call, low, high, colour]. */
const LATENCY: [string, number, number, string][] = [
  ['Command translate', 1.6, 4.3, '#c9a7ff'],
  ['Plan draft', 4.5, 9.5, '#9f6bff'],
  ['Intraday · large', 4.7, 5.8, '#8f4dff'],
  ['Intraday · mini', 5.5, 7.3, '#7a3cf0'],
  ['Macro (web search)', 14.6, 22, '#5000ca'],
];

function Line({ at, children }: { at: number; children: ReactNode }) {
  return <div className="ln" style={{ animationDelay: `${at}s` }}>{children}</div>;
}

function Terminal() {
  return (
    <div className="term rise d3" role="img" aria-label="Illustrative terminal session: a buy command is checked against the gate and blocked because the symbol is not in today's plan">
      <div className="bar"><i /><i /><i /><span>illustrative session</span></div>
      <div className="lines">
        <Line at={0.6}><span className="ps">›</span> b XYZ 30 @ 41.20 stop 40.60</Line>
        <Line at={1.1}><span className="dim">  cost round-trip $4.4 · breakeven +0.15 · cost/R 24%</span></Line>
        <Line at={1.5}><span className="ok">  ✓</span> settled cash   <span className="ok">✓</span> stop placement   <span className="ok">✓</span> session</Line>
        <Line at={1.9}><span className="ok">  ✓</span> per-trade risk <span className="ok">✓</span> daily loss cap   <span className="no">✗</span> plan-only</Line>
        <Line at={2.4}><span className="no">  BLOCKED · XYZ is not in today's locked plan</span></Line>
        <Line at={2.9}><span className="ps">›</span> <span className="cursor" /></Line>
      </div>
    </div>
  );
}

function CommitTimeline() {
  const X = (h: number) => 60 + (h / 19) * 900;
  const H = (lines: number) => (Math.sqrt(lines) / Math.sqrt(3339)) * 260;
  return (
    <div className="panel rv">
      <span className="cap">built in one day · lines added per commit, Oct 6</span>
      <svg className="chart" viewBox="0 0 1000 380" style={{ marginTop: 10 }} role="img" aria-label="Thirteen commits on October 6, from v0 at 00:36 to the terminal UI at 18:44">
        <line x1="60" y1="320" x2="960" y2="320" stroke="#3a4150" />
        {COMMITS.map(([h, lines, label], i) => {
          const height = Math.max(6, H(lines));
          const big = lines > 500;
          return (
            <g key={i}>
              <rect className="grow-y" x={X(h) - (big ? 4.5 : 3.5)} y={320 - height} width={big ? 9 : 7} height={height} fill={big ? '#c9a7ff' : '#7a3cf0'} style={{ animationDelay: `${0.05 * i}s` }} />
              {label && <text className="lbl" x={X(h)} y={320 - height - 12} fill="#fff" fontSize="20" fontWeight="700" textAnchor="middle">{label}</text>}
            </g>
          );
        })}
        <text className="lbl" x="300" y="250" fill="#b9bfcc" fontSize="17" textAnchor="middle">audit fixes</text>
        <text x="60" y="352" fill="#b9bfcc" fontSize="20">00:00</text>
        <text x="500" y="352" fill="#b9bfcc" fontSize="20" textAnchor="middle">09:30</text>
        <text x="960" y="352" fill="#b9bfcc" fontSize="20" textAnchor="end">19:00</text>
      </svg>
    </div>
  );
}

function LatencyRanges() {
  const MAX = 25;
  return (
    <div className="panel rv" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span className="cap">measured AI latency (seconds) · scale 0–25 s</span>
      {LATENCY.map(([name, lo, hi, color]) => (
        <div className="bar-row" key={name} style={{ gridTemplateColumns: '150px minmax(0, 1fr) 72px', fontSize: 15, gap: 12 }}>
          <span>{name}</span>
          <div className="range"><div className="grow-x" style={{ left: `${(lo / MAX) * 100}%`, width: `${((hi - lo) / MAX) * 100}%`, background: color }} /></div>
          <span style={{ textAlign: 'right' }}>{lo}–{hi}</span>
        </div>
      ))}
      <p style={{ margin: '6px 0 0', color: 'var(--sub)', fontSize: 15, lineHeight: 1.55 }}>The larger model was no slower than the mini one — and it's the only call that names prices intraday — so it got the job. All AI runs in background tasks; the command line never waits.</p>
    </div>
  );
}

export default function DayTrade() {
  return (
    <ProjectLayout slug="day-trade-assistant" anchors={[{ href: '#gate', label: 'The gate' }, { href: '#cost', label: 'Cost engine' }, { href: '#decisions', label: 'Decisions' }]}>
      <Hero
        meta="Trading tooling · Python · asyncio · Oct 2026"
        title="Day-trade assistant"
        lead="A terminal co-pilot for intraday trading on a live US-equity cash account. Every cost is visible before the click, every order passes a rule gate, and the AI drafts plans and translates commands — but never sits in the order path."
        twoStats
        stats={[
          { value: '21', label: 'pre-trade checks', color: '#c9a7ff' },
          { value: '214', label: 'tests' },
          { value: '18 h', label: 'v0 → v3 + TUI, 13 commits' },
          { value: '0', label: 'orders the AI can place' },
        ]}
        aside={<Terminal />}
      />

      <Section first num="01" kicker="architecture" title="One process, one order path, AI off to the side">
        <FlowRow nodes={[
          { title: 'Broker adapter', sub: 'server-checked cash account · idempotent orders · reconnect watchdog' },
          { title: 'Feed', sub: '1-min bars, VWAP, opening range, ATR, relative volume' },
          { title: 'Plan', sub: 'levels as key + offset, computed by code' },
          { title: 'Cost engine', sub: 'fees, GST, TAF, SEC, settlement' },
          { title: 'Gate', sub: '21 pure-function checks', tone: 'accent' },
          { title: 'You confirm', sub: '→ order → journal', tone: 'gold' },
        ]} />
        <div className="rv" style={{ marginTop: 22, border: '1px dashed var(--accent)', borderRadius: 12, padding: '18px 22px', display: 'flex', flexWrap: 'wrap', gap: '14px 28px', alignItems: 'center' }}>
          <b style={{ color: 'var(--accent-soft)' }}>AI side-car</b>
          <span style={{ color: 'var(--sub)', fontSize: 16 }}>pre-market picks (only from rule-filtered names) · intraday opinions · plan drafting · post-market review · Chinese → command translation</span>
          <span className="mono" style={{ fontSize: 14, color: 'var(--dim)' }}>fails silently · never blocks trading · never emits a price the user didn't type</span>
        </div>
      </Section>

      <Section id="gate" num="02" kicker="the gate" title="21 checks between an idea and an order" lead="All rules live in config, every check is a pure function, and discipline settings can only be tightened once locked — even across restarts.">
        <Grid min={320} className="rv">
          {Object.entries(GATE).map(([group, g]) => (
            <div key={group} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="mono" style={{ color: 'var(--muted)', fontSize: 14 }}>{group}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {g.checks.map((c) => <span className="check" key={c} style={{ background: g.bg, color: g.fg }}>{c}</span>)}
              </div>
            </div>
          ))}
        </Grid>
        <div className="formula rv" style={{ marginTop: 36 }}>
          <span className="mono" style={{ color: 'var(--muted)', fontSize: 14 }}>the whole cash model, in one line — avoids good-faith violations without simulating T+1</span>
          <code>today_budget = settled_cash_at_open − reserve − bought_today</code>
        </div>
      </Section>

      <Section id="cost" num="03" kicker="cost engine" title="Fees decide how many trades a day make sense">
        <Grid min={440} gap={28}>
          <div className="panel rv" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="cap">round-trip cost as % of a ~$4,000 ticket</span>
            <Bars label={80} value={70} items={[
              { label: '~$5', pct: 100, value: '0.44%', color: '#ff8a4c' },
              { label: '~$20', pct: 25, value: '0.11%', color: '#c9a7ff' },
              { label: '~$100', pct: 25, value: '0.11%', color: '#c9a7ff' },
            ]} />
            <p style={{ margin: '4px 0 0', color: 'var(--sub)', fontSize: 15, lineHeight: 1.55 }}>Up to ~199 shares only the minimum fee applies; at 1% risk the minimum round trip already eats ~6.5% of R.</p>
          </div>
          <Findings min={300} items={[
            { big: '38–51%', color: '#ff8a4c', text: 'Split into 3+ trades a day, each has only 16–22 shares and costs eat 38–51% of R — above the 35% gate. So the daily maximum went from 4 to 2.' },
            { big: '1.16–1.28', text: 'Net reward-to-risk of the AI\'s "chase" entries after fees. Measured, then gated: AI suggestions go through the same checks as mine.' },
          ]} />
        </Grid>
      </Section>

      <section className="p-sec">
        <Grid min={460} gap={28}>
          <CommitTimeline />
          <LatencyRanges />
        </Grid>
      </section>

      <Section id="decisions" num="04" kicker="decisions" title="Real money changes the defaults">
        <Findings items={[
          { big: 'inf > 0', title: 'inf is more dangerous than zero', text: 'The broker SDK reports some missing fields as infinity, and any risk comparison against inf silently passes. Every number goes through a finite check; unknown becomes None and the order is refused.' },
          { big: 'no paper', title: 'Dry-run plus one-share live tests', text: 'Paper and live run through the same gateway, and credential files had once been swapped in an earlier project. So: a dry-run mode, real one-share orders, and a server-side check that the account is a cash account.' },
          { big: 'key + offset', title: 'AI translates, code computes', text: 'Plans reference levels like "VWAP − 0.10" and the program resolves the number. A translated command containing a price the user never typed is rejected.' },
          { big: '5,600 → 60 s', title: 'Quiet when the market is', text: 'Overnight polling made 5,600+ API calls a night. Off-hours sync dropped to once a minute, and every new day forces a fresh position reconciliation.' },
        ]} />
      </Section>

      <Section num="05" kicker="bugs worth telling" title="Problem → fix">
        <Fixes items={[
          ['While a translated command waited for y/n, a plan trigger fired — and the "y" confirmed a buy', 'Keys typed before a prompt never count; Ctrl-C / Ctrl-D mean no'],
          ['The minimum fee and the 0.5% cap were applied in the wrong order — caught on a real one-share fill', "Cap applies only to the per-share part; test pinned to the broker's actual charge"],
          ["Orders edited in the broker's app were misreported after my own price changes", '30-second pending window, aligned price precision, stop orders compared by trigger'],
          ['Fills synced after a restart were booked on the wrong day; one API error could skip the daily reconcile', "Dates from the broker's trade time; reconcile can't be skipped"],
        ]} />
      </Section>

      <NextNote num="06" kicker="status">
        <p>This is an engineering showcase, not a strategy one: the tool has only just gone live, so there's no performance to report yet. Next is the first full live pre-market run (brief → pick → plan → lock), then an opt-in "locked plan = authorisation" mode limited to the first two hours of the session.</p>
      </NextNote>
    </ProjectLayout>
  );
}
