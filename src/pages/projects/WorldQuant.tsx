import Picture from '../../components/Picture';
import { Bars, Findings, Fixes, FlowColumn, Grid, Hero, NextNote, ProjectLayout, Section, Strip } from '../../components/ProjectKit';
import '../../styles/pages.css';

/** Scoring days: [date, submissions, day points, cumulative]. */
const DAYS: [string, number, number, number][] = [
  ['09-13', 1, 1398, 1398],
  ['09-14', 2, 1796, 3194],
  ['09-15', 2, 1761, 4955],
  ['09-16', 2, 1956, 6911],
  ['09-17', 2, 1848, 8759],
  ['09-18', 1, 1402, 10161],
];
const LEVEL = (pts: number) => (pts >= 10000 ? '#e3b341' : pts >= 5000 ? '#c3cad6' : '#c08457');
const X = (i: number) => 100 + i * 160;
const Y = (pts: number) => 360 - (pts / 11000) * 320;

function ScoreChart() {
  const line = DAYS.map(([, , , cum], i) => `${i ? 'L' : 'M'}${X(i)} ${Y(cum).toFixed(1)}`).join(' ');
  return (
    <div className="panel rv" style={{ paddingBottom: 12 }}>
      <svg className="chart" viewBox="0 0 1000 420" role="img" aria-label="Cumulative Challenge points by scoring day, from 1,398 on Sep 13 to 10,161 on Sep 18">
        <line x1="60" y1="360" x2="980" y2="360" stroke="#3a4150" />
        <line x1="60" y1={Y(5000)} x2="980" y2={Y(5000)} stroke="#9aa3b2" strokeDasharray="6 6" />
        <text x="64" y={Y(5000) - 8} fill="#b9bfcc" fontSize="14">SILVER · 5,000</text>
        <line x1="60" y1={Y(10000)} x2="980" y2={Y(10000)} stroke="#e3b341" strokeDasharray="6 6" />
        <text x="64" y={Y(10000) - 8} fill="#e3b341" fontSize="14">GOLD · 10,000</text>
        {DAYS.map(([date, subs, day, cum], i) => {
          const h = (day / 11000) * 320;
          const gold = cum >= 10000;
          return (
            <g key={date}>
              <rect className="grow-y" x={X(i) - 20} y={360 - h} width="40" height={h} rx="3" fill="#5000ca" style={{ animationDelay: `${0.1 * i}s` }} />
              {gold && <circle className="gold-pulse" cx={X(i)} cy={Y(cum)} r="8" fill="none" stroke="#e3b341" strokeWidth="2" />}
              <circle className="pop" cx={X(i)} cy={Y(cum)} r={gold ? 8 : 6} fill={LEVEL(cum)} style={{ animationDelay: `${0.6 + 0.3 * i}s` }} />
              <text className="lbl" x={X(i)} y={Y(cum) - (gold ? 24 : 16)} fill={gold ? '#e3b341' : '#fff'} fontSize={gold ? 17 : 15} fontWeight={gold ? 900 : 700} textAnchor="middle">{cum.toLocaleString('en-US')}</text>
              <text x={X(i)} y="386" fill="#b9bfcc" fontSize="14" textAnchor="middle">{date}</text>
              <text x={X(i)} y="408" fill="#7d8594" fontSize="12" textAnchor="middle">{subs} sub{subs > 1 ? 's' : ''} · +{day.toLocaleString('en-US')}</text>
            </g>
          );
        })}
        <path className="draw" d={line} fill="none" stroke="#c9a7ff" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const MAILS = [
  { name: 'wq-bronze', tier: 'BRONZE', bg: '#c08457', fg: '#1b1208', date: 'Sep 14', alt: 'WorldQuant BRAIN email: congratulations on reaching the Bronze level' },
  { name: 'wq-silver', tier: 'SILVER', bg: '#c3cad6', fg: '#14171c', date: 'Sep 17', alt: 'WorldQuant BRAIN email: congratulations on reaching the Silver level' },
  { name: 'wq-gold', tier: 'GOLD', bg: '#e3b341', fg: '#1d1503', date: 'Sep 19', alt: 'WorldQuant BRAIN email: Gold level reached, eligible for research consultant' },
  { name: 'wq-consultant', tier: 'CONSULTANT', bg: '#5000ca', fg: '#fff', date: 'Sep 20', alt: 'WorldQuant BRAIN Singapore email: first step in becoming a consultant' },
];

function PaperTrail() {
  return (
    <>
      <div className="p-head rv" style={{ marginTop: 72, alignItems: 'center', textAlign: 'center' }}>
        <span className="kicker">the paper trail</span>
        <h2 style={{ fontSize: 28 }}>Every level, confirmed by WorldQuant</h2>
        <p className="note">Hover a card to read it.</p>
      </div>
      <div className="fan rv">
        {MAILS.map((m, i) => (
          <figure className={`mail m${i + 1}`} key={m.name} style={{ transitionDelay: `${i * 0.08}s` }}>
            <Picture name={m.name} widths={[600, 1200]} fallback="png" sizes="(min-width: 900px) 360px, 90vw" alt={m.alt} />
            <figcaption><span className="tier" style={{ background: m.bg, color: m.fg }}>{m.tier}</span>{m.date}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export default function WorldQuant() {
  return (
    <ProjectLayout slug="worldquant-brain-miner" anchors={[{ href: '#result', label: 'Result' }, { href: '#system', label: 'System' }, { href: '#findings', label: 'Findings' }, { href: '#fixes', label: 'Fixes' }]}>
      <Hero
        meta="Quant research · Python · SQLite · Sep 2026"
        title="WorldQuant BRAIN Miner"
        lead="A fully automated alpha-research system: it harvests factor ideas, simulates them under a hard API quota, hill-climbs the settings that actually decide pass or fail, and submits on schedule. Goal: Gold in the WorldQuant Challenge as fast as possible."
        stats={[
          { value: 'GOLD', label: 'reached on scoring day 6 (Sep 18)', color: '#e3b341' },
          { value: '10,161', label: 'Challenge points · ~1,840 per day at 2 submissions' },
          { value: '12', label: 'alphas submitted · 1 Spectacular (fitness 3.06), 3 Good' },
          { value: '640', label: 'tests, fully offline · zero simulation quota spent' },
        ]}
      />

      <Section id="result" first num="01" kicker="result" title="Bronze to Gold in six scoring days" lead="Each bar is one day's score; the line is the running total against the Silver (5,000) and Gold (10,000) thresholds. Two submissions a day averaged ~440 points more than one.">
        <ScoreChart />
        <PaperTrail />
      </Section>

      <Section num="02" kicker="engineering" title="Twelve days, built test-first">
        <Strip items={[
          { k: 'timeline', v: 'Sep 12 → 23', s: '67 commits' },
          { k: 'code', v: '18,752 lines', s: '10,473 app · 8,279 tests' },
          { k: 'tests', v: '640 passing', s: 'offline, no quota used' },
          { k: 'docs', v: '88 KB design doc', s: '+ fix log · open-items plan' },
        ]} />
      </Section>

      <Section id="system" num="03" kicker="system" title="Two pipelines, one database" lead="Discovery finds candidate expressions; mining simulates, tunes and submits them. Both share a SQLite (WAL) store, and three read-only terminal screens watch the funnel.">
        <Grid min={420} gap={28} className="rv">
          <FlowColumn caption="discovery/ · find expressions" nodes={[
            { title: 'Harvest 4 sources', sub: 'GitHub code & repos, formula sets, BRAIN-native · 18,520 raw items' },
            { title: 'Extract → translate dialect', sub: 'lookup tables, no LLM' },
            { title: 'Five validation gates' },
            { title: 'Field semantic match', sub: 'the only LLM call in the system → 13,006 seeds' },
          ]} />
          <FlowColumn caption="brain/ · simulate, tune, submit" nodes={[
            { title: 'Quota gate', sub: "trusts only the server's x-ratelimit-remaining — failed requests still cost quota" },
            { title: 'Rank 4,367 fields → hill-climb on field × settings', sub: 'lineage table + measured gain per operator decide what to tune next' },
            { title: 'Self-check · self-correlation · triple validation' },
            { title: 'Scheduled submit (SGT) with three brakes', sub: 'daily cap · stop file · one-key halt in the UI' },
          ]} />
        </Grid>
        <div className="rv" style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--muted)' }}>
          <span style={{ border: '1px dashed var(--accent)', borderRadius: 8, padding: '10px 16px', color: '#fff' }}>SQLite · WAL · shared by both</span>
          <span style={{ border: '1px dashed #3a4150', borderRadius: 8, padding: '10px 16px' }}>ui/ · 3 read-only terminal screens</span>
          <span style={{ border: '1px dashed #3a4150', borderRadius: 8, padding: '10px 16px' }}>cadence fitted from 450 day-0 runs</span>
        </div>
      </Section>

      <Section num="04" kicker="the funnel" title="35,272 simulations for 12 submissions" note="Bar length on a log scale.">
        <Bars items={[
          { label: 'Raw items harvested', pct: 93.8, value: '18,520', color: '#3a2a6b' },
          { label: 'Seeds', pct: 90.3, value: '13,006', color: '#45308a' },
          { label: 'Variants simulated', pct: 100, value: '35,272', color: '#5000ca' },
          { label: 'Passed IS checks', pct: 68.6, value: '1,314', color: '#7a3cf0' },
          { label: 'Ready, held in reserve', pct: 54.2, value: '294', color: '#9f6bff' },
          { label: <b style={{ color: '#e3b341' }}>Submitted</b>, pct: 23.7, value: <span style={{ color: '#e3b341' }}>12</span>, color: '#e3b341' },
        ]} />
      </Section>

      <Section id="findings" num="05" kicker="findings" title="What the live platform taught me" lead="Every claim below was measured against the real platform, not taken from documentation.">
        <Findings items={[
          { big: '48 / 50', title: 'Settings decide, not complexity', text: 'Of 50 passing alphas, 48 had a single level of nesting and 39 used truncation 0.01. So the search space became field × settings grid, with only 7 simple wrapper forms.' },
          { big: '−1.09 → −0.06', title: 'Big |Sharpe| ≠ strong signal', text: 'On a one-sided book, Sharpe measures market exposure. One alpha collapsed under neutralisation, so directional families are never expanded and un-neutralised ones are re-tested neutralised first.' },
          { big: '5 shapes', title: 'Shape matters too', text: 'Fundamentals update quarterly, so windows come in two tiers by dataset. Each field yields a rank baseline, three change detectors (z-score, ts-rank, delta) and an industry-neutralised form.' },
          { big: '0 quota', title: 'Reverse-engineered the platform', text: '~103 s per simulation; failed requests still consume quota; sub-universe sizes (TOP3000 → 1,004, TOP1000 → 502, TOP500 → 188) recovered from existing check thresholds without spending a single simulation.' },
          { big: '+440 / day', title: 'Cadence is a parameter', text: 'Two submissions a day averaged ~1,840 points versus ~1,400 for one. After Gold the system dropped to one a day to conserve the candidate pool.' },
        ]} />
      </Section>

      <Section id="fixes" num="06" kicker="bugs worth telling" title="Problem → fix">
        <Fixes items={[
          [<>Field-name case mismatch silently dropped <b>185 seeds</b></>, 'Normalised names, re-queued the lost seeds'],
          ['Quota burned tuning a handful of factors', 'Stop-at-target, plus re-validation before submit'],
          ['Candidate pool clogged with dozens of parameter clones of one factor', 'De-duplicate by family, rank by estimated quality'],
          ['Self-correlation read while the platform was still recomputing it', 'Never judge until the platform reports it finished'],
          ['Timed-out simulations held concurrency slots', 'Recover late results, cancel stuck ones server-side'],
          [<>"Score unavailable" logged as 0, dragging the 1-a-day average from ~1,400 to <b>933</b></>, 'Unknown is never written as zero; bad rows removed'],
        ]} />
      </Section>

      <NextNote num="07">
        <h2 style={{ margin: 0, fontSize: 32 }}>Probe before you spread</h2>
        <p>About 29% of families climb past |Sharpe| 1.0 after tuning, so weak first probes shouldn't kill a family. Planned: 3 probe runs per new seed, then narrow the sweep from 17 variants to 4–5 instead of dropping it.</p>
        <p>Submission has been paused since becoming a Consultant; the miner keeps backtesting (~21K more alphas since), with 294 ready candidates in reserve for the next round.</p>
        <p className="mono" style={{ fontSize: 14, color: 'var(--dim)' }}>Alpha expressions and IDs are withheld under WorldQuant BRAIN confidentiality.</p>
      </NextNote>
    </ProjectLayout>
  );
}
