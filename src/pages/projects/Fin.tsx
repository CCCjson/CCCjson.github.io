import { Findings, Fixes, FlowColumn, Grid, Hero, NextNote, ProjectLayout, Section, Strip } from '../../components/ProjectKit';
import '../../styles/pages.css';

const COMMITS: [string, number][] = [['Feb', 19], ['Mar', 4], ['Jun', 2], ['Jul', 187], ['Aug', 36]];
/** Tests passing, by date (day offset from Jul 16). */
const TESTS: [string, number, number][] = [['07-16', 0, 879], ['07-27', 11, 1693], ['07-28', 12, 1863], ['07-30', 14, 1892], ['07-31', 15, 1948], ['08-14', 29, 2318]];
const LABELLED = new Set(['07-16', '07-27', '07-31', '08-14']);

/** R-series: the audit of the live-money path, Aug 7–14. */
const AUDIT: [string, string, string][] = [
  ['R1', 'b17fea8', 'The stop-loss rule blocked the stop-loss order itself'],
  ['R2', '10b9366', 'The "un-bypassable" hard risk gate had loaded zero rules'],
  ['R3', '00bed39', 'The stock scheduler had never actually been started'],
  ['R4', 'c576105', '"Max daily loss" was really measuring cumulative unrealised loss'],
  ['R4b', 'ffac4e9', 'The losing-streak pause never lifted — three losses from six years ago froze the account'],
  ['R5', 'ff9d9d7', 'The paper account reset on restart, so every restart bought the position again'],
  ['R6', '0cc44d2', 'US paper sells were charged China A-share stamp duty — 10× the real cost'],
  ['R7', '1e83af2', "The arena's drawdown threshold was mathematically impossible to pass"],
  ['R8', '556b8a6', 'Two test files collected zero test cases'],
  ['R9', '10c295e', 'Thread pools that leaked on disconnect and could stop the backend from shutting down'],
];

function CommitChart() {
  const max = 187;
  return (
    <div className="panel rv">
      <span className="cap">commits per month</span>
      <svg className="chart" viewBox="0 0 500 260" style={{ marginTop: 10 }} role="img" aria-label="Commits per month: February 19, March 4, June 2, July 187, August 36">
        <line x1="30" y1="220" x2="480" y2="220" stroke="#3a4150" />
        {COMMITS.map(([m, n], i) => {
          const h = Math.max(2, (n / max) * 200);
          const x = 50 + i * 86;
          return (
            <g key={m}>
              <rect className="grow-y" x={x} y={220 - h} width="56" height={h} rx="3" fill={n === max ? '#8f4dff' : n > 30 ? '#5000ca' : '#45308a'} style={{ animationDelay: `${0.05 * i}s` }} />
              <text className="lbl" x={x + 28} y={220 - h - 8} fill="#fff" fontSize={n === max ? 15 : 14} fontWeight={n === max ? 900 : 700} textAnchor="middle">{n}</text>
              <text x={x + 28} y="244" fill="#b9bfcc" fontSize="13" textAnchor="middle">{m}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TestsChart() {
  const X = (d: number) => 80 + (d / 29) * 840;
  const Y = (v: number) => 360 - (v / 2500) * 320;
  const d = TESTS.map(([, day, v], i) => `${i ? 'L' : 'M'}${X(day).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  return (
    <div className="panel rv">
      <span className="cap">tests passing</span>
      <svg className="chart" viewBox="0 0 1000 420" style={{ marginTop: 10 }} role="img" aria-label="Tests passing grew from 879 on July 16 to 2,318 on August 14">
        <line x1="80" y1="360" x2="940" y2="360" stroke="#3a4150" />
        <path className="draw" d={d} fill="none" stroke="#c9a7ff" strokeWidth="4" />
        {TESTS.filter(([date]) => LABELLED.has(date)).map(([date, day, v], i, arr) => {
          const last = i === arr.length - 1;
          return (
            <g key={date}>
              <circle className="pop" cx={X(day)} cy={Y(v)} r={last ? 10 : 8} fill={last ? '#fff' : '#c9a7ff'} style={{ animationDelay: `${0.4 + i * 0.3}s` }} />
              <text className="lbl" x={last ? X(day) - 15 : X(day)} y={Y(v) - (last ? 23 : 27)} fill="#fff" fontSize={last ? 30 : 26} fontWeight={last ? 900 : 700} textAnchor={last ? 'end' : 'middle'}>{v.toLocaleString('en-US')}</text>
              <text x={X(day)} y="396" fill="#b9bfcc" fontSize="24" textAnchor="middle">{date}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Fin() {
  return (
    <ProjectLayout slug="fin" github="https://github.com/CCCjson/Fin" anchors={[{ href: '#flow', label: 'How it works' }, { href: '#principles', label: 'Principles' }, { href: '#rseries', label: 'R-series' }]}>
      <Hero
        meta="Multi-agent · Python · TypeScript · C++ · Feb – Aug 2026"
        title={<>Fin <small>(MoneyBill)</small></>}
        lead="A personal research desk for A-shares, Hong Kong, US equities and crypto, driven entirely through conversation. The AI fetches data, analyses, backtests, screens and drafts orders — and a human presses every trade button."
        twoStats
        stats={[
          { value: '2,318', label: 'tests passing', color: '#c9a7ff' },
          { value: '68 · 8', label: 'agent tools · subagents' },
          { value: '4', label: 'markets in one desk' },
          { value: '248', label: 'commits, solo' },
        ]}
        aside={
          <figure className="rise d4" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <img className="window" src={`${import.meta.env.BASE_URL}images/fin-demo.gif`} alt="Demo: asking MoneyBill whether to trim a SOL position; it researches, recommends selling 12 SOL, and shows an order card awaiting confirmation" width="660" height="455" />
            <figcaption className="mono" style={{ fontSize: 13, color: 'var(--dim)', textAlign: 'center' }}>Question → research → recommendation → confirm card. Demo data, fictional.</figcaption>
          </figure>
        }
      />

      <Section id="flow" first num="01" kicker="how a question flows" title="One chat box over the whole system" lead="A function-calling ReAct loop picks tools and subagents; every result comes back wrapped with data-quality metadata, so the model knows when numbers are stale or partial. Anything that touches money detours through a confirmation gate.">
        <Grid min={420} gap={28} className="rv">
          <FlowColumn caption="research path" nodes={[
            { title: 'Question', sub: 'in the Tauri desktop app' },
            { title: 'MoneyBill orchestrator', sub: 'ReAct loop · core tools resident, 13 tool groups loaded on demand · turn monitor stops loops', tone: 'accent' },
            { title: '68 tools · 8 subagents', sub: 'deep stock dive, news, alpha lab (LangGraph), five report-section writers' },
            { title: 'Engines', sub: '29 data adapters, screener, 5-factor cockpit score, RAG, ML forecasts, C++ backtester' },
            { title: 'Answer as cards', sub: '10 widget types, quality-flagged' },
          ]} />
          <div className="flow-col">
            <span className="cap">order path</span>
            <div className="node"><b>Order-type tool called</b><small>12 tools marked requires_confirmation</small></div>
            <div className="flow-v" />
            <div className="node"><b>Risk pre-check</b><small>≤20% per stock · −5% stop · pause after 3 losses · daily loss cap</small></div>
            <div className="flow-v" />
            <div className="node gold gate-glow"><b>Human confirms</b><small>bound to the exact tool_call_id · replay-proof · unanswered prompts expire</small></div>
            <div className="flow-v" />
            <div className="node"><b>BaseBroker</b><small>Paper · Binance spot (live) · Tiger (paper-verified, in progress)</small></div>
            <div className="flow-v" />
            <div className="node"><b>Ledger + decision log</b></div>
          </div>
        </Grid>
      </Section>

      <Section num="02" kicker="engineering" title="A rebuild in July, tested as it grew">
        <Grid min={440}>
          <CommitChart />
          <TestsChart />
        </Grid>
        <div style={{ marginTop: 24 }}>
          <Strip items={[
            { k: 'Python', v: '122K lines', s: '35K of them tests' },
            { k: 'TypeScript', v: '20K lines', s: 'React 19 · Vite · Tauri' },
            { k: 'C++', v: '10.6K lines', s: 'backtest + order-book services' },
            { k: 'gates', v: 'ruff · mypy · AST', s: 'e.g. no assertion-less test files' },
          ]} />
        </div>
      </Section>

      <Section id="principles" num="03" kicker="design principles" title="Rules the code enforces">
        <Findings items={[
          { big: 'every order', color: '#e3b341', title: 'A human presses the button', text: "A permanent red line, even with live APIs connected: all order tools require confirmation, and the gate binds to the exact call so it can't be replayed." },
          { big: 'unknown ≠ 0', title: 'Missing data refuses, never guesses', text: "Binance gives no cost basis, so it's rebuilt by replaying fills with three-state coverage. Tiger's SDK uses inf for missing fields; they become None, and the order is refused." },
          { big: 'ask the server', title: "Never trust which account you're on", text: 'Paper and live share one gateway. The account type is checked against the server at startup; a mismatch raises instead of trading.' },
          { big: '2-phase', title: 'Idempotent orders', text: "Reserve an order id, then place. On timeout, look it up by that id; if it can't be found it's UNKNOWN — never resubmitted." },
          { big: '23 → 7', title: 'Subtraction as a feature', text: 'Pages 23 → 7 workbenches; routes 30+ → 20 (12 became agent tools); first-turn tool schema 9.7K → 4.4K tokens; the Python backtester deleted in favour of C++.' },
          { big: 'UTC', title: 'One source of time', text: 'A single market-time module, everything stored in UTC — closing an 8-hour daily blind spot in the risk guards.' },
        ]} />
      </Section>

      <Section id="rseries" num="04" kicker="the R-series audit" title="Three of four hard risk limits didn't do what their names said" lead="Before opening the live-money path I audited it end to end: twelve rounds of fixes in one week (Aug 7–14). The root cause was test files with zero assertions — they passed while proving nothing. An AST gate now rejects them.">
        <div className="audit rv">
          {AUDIT.map(([id, sha, text]) => (
            <div key={id}><b>{id}</b><code>{sha}</code><span>{text}</span></div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <Fixes min={300} items={[
            [<>Data feed silently dropped for <b>6 trading days</b></>, 'Scheduler moved out of the app process; staleness surfaced'],
            [<>Backend memory peaked at <b>22 GB</b></>, 'Response reads capped at 50 MB; flat over 16 hours'],
            ['Assistant replayed the pre-trade balance after an order', 'Fresh account reads; unreadable state reported, not zeroed'],
          ]} />
        </div>
      </Section>

      <NextNote num="05">
        <p>Finish the Tiger live path: one real fill end to end, reconciliation against the local ledger, then open the live gate at minimal size. Per-market cash floors in risk control, and a full in-app acceptance pass of the twelve R-series fixes.</p>
      </NextNote>
    </ProjectLayout>
  );
}
