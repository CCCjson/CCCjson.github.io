import type { CSSProperties } from 'react';
import { Bars, Findings, Fixes, FlowRow, Grid, Hero, NextNote, ProjectLayout, Section, Strip } from '../../components/ProjectKit';
import { PROVISIONAL_FROM, V2_FROM, rounds } from '../../data/numerai';
import '../../styles/pages.css';

const PX_PER_UNIT = 200 / 0.03;

function barStyle(round: number, resolved: boolean, v: number): CSSProperties {
  const tone = round < 1289 ? '#6b7280' : round >= V2_FROM ? '#e3b341' : '#8f4dff';
  const h = Math.max(2, Math.round(Math.abs(v) * PX_PER_UNIT));
  const base: CSSProperties = { height: h, animationDelay: `${((round - 1287) * 0.02).toFixed(2)}s` };
  if (resolved) return { ...base, background: v < 0 ? '#ff8a4c' : tone };
  return { ...base, background: 'rgba(255,255,255,.03)', border: `1.5px solid ${tone}` };
}

function RoundsChart() {
  return (
    <div className="panel rv" style={{ padding: '28px 24px 18px' }}>
      <div className="legend">
        <span><i style={{ background: '#6b7280' }} />v0</span>
        <span><i style={{ background: '#8f4dff' }} />v1 resolved</span>
        <span><i style={{ border: '1.5px solid #8f4dff' }} />v1 provisional</span>
        <span><i style={{ border: '1.5px solid #e3b341' }} />v2 provisional</span>
        <span><i style={{ background: '#ff8a4c' }} />negative (resolved)</span>
      </div>
      <div className="rounds" role="img" aria-label="Per-round BMC for rounds 1287 to 1372. Rounds 1287 to 1342 are resolved and almost all positive, peaking at 0.0282. Rounds 1343 to 1367 are provisional; v2 rounds from 1355 are mixed. Rounds 1368 to 1372 have no score yet.">
        {rounds.map(([round, resolved, v]) => {
          const marker = round === PROVISIONAL_FROM || round === V2_FROM;
          const title = `R${round} · ${v === null ? 'no score yet' : `BMC ${v > 0 ? '+' : ''}${v.toFixed(4)} · ${resolved ? 'resolved' : 'provisional'}`}`;
          return (
            <div className="col" key={round} title={title} style={marker ? { borderLeft: '1px dashed #e3b341' } : undefined}>
              <div className="mark">{round === PROVISIONAL_FROM ? 'provisional →' : round === V2_FROM ? 'v2' : ''}</div>
              <div className="up">
                {v === null ? <div style={{ height: 3, background: '#3a4150', borderRadius: 1 }} /> : v >= 0 && <div className="grow-y" style={{ ...barStyle(round, !!resolved, v), borderRadius: '2px 2px 0 0' }} />}
              </div>
              <div className="zero" />
              <div className="down">{v !== null && v < 0 && <div className="grow-y-down" style={{ ...barStyle(round, !!resolved, v), borderRadius: '0 0 2px 2px' }} />}</div>
            </div>
          );
        })}
      </div>
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
        <span>R1287</span><span>R1308</span><span>R1329</span><span>R1350</span><span>R1372</span>
      </div>
    </div>
  );
}

function UniquenessChart() {
  const pts = rounds.filter((r) => r[3] !== null) as [number, 0 | 1, number | null, number][];
  const X = (r: number) => 60 + (r - 1300) * (880 / 70);
  const Y = (c: number) => 220 - (c - 0.35) * 2000;
  const line = (sel: typeof pts) => sel.map(([r, , , c], i) => `${i ? 'L' : 'M'}${X(r).toFixed(1)} ${Y(c).toFixed(1)}`).join(' ');
  return (
    <div className="panel rv" style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 }}>
        <span className="cap">correlation with the meta model, per round · lower = more unique · not affected by resolution</span>
        <span style={{ fontSize: 14 }}><b style={{ color: '#c9a7ff' }}>v1 0.372</b> · <b style={{ color: '#e3b341' }}>v2 0.429</b></span>
      </div>
      <svg className="chart" viewBox="0 0 1000 280" style={{ marginTop: 10 }} role="img" aria-label="Correlation with the meta model: v1 rounds mostly 0.35 to 0.40; after the switch to v2 it jumps to about 0.43, easing to about 0.42 in the latest rounds">
        {[0.43, 0.39, 0.35].map((c) => (
          <g key={c}>
            <line x1="60" y1={Y(c)} x2="940" y2={Y(c)} stroke="#252b35" />
            <text x="50" y={Y(c) + 4} fill="#9aa3b2" fontSize="13" textAnchor="end">{c.toFixed(2)}</text>
          </g>
        ))}
        <line x1={X(V2_FROM)} y1="16" x2={X(V2_FROM)} y2="262" stroke="#e3b341" strokeDasharray="4 5" />
        <text x={X(V2_FROM) + 8} y="26" fill="#e3b341" fontSize="13">v2 live · R{V2_FROM}</text>
        <path className="draw" d={line(pts.filter((p) => p[0] <= V2_FROM))} fill="none" stroke="#c9a7ff" strokeWidth="2.5" strokeLinejoin="round" />
        <path className="draw l3" d={line(pts.filter((p) => p[0] >= V2_FROM))} fill="none" stroke="#e3b341" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="60" y="276" fill="#b9bfcc" fontSize="13">R1300</text>
        <text x="940" y="276" fill="#b9bfcc" fontSize="13" textAnchor="end">R1370</text>
      </svg>
    </div>
  );
}

const versions = [
  { tag: 'v0 · Jun 12 · R1287', text: 'Single LightGBM on the small feature set — get the plumbing working.', border: 'var(--line)', color: 'var(--dim)' },
  { tag: 'v1 · Jun 14 · R1289', text: 'Residualised LightGBM + shallow XGBoost + ElasticNet, rank-averaged across families. The live record above.', border: 'var(--accent)', color: 'var(--accent-soft)' },
  { tag: 'v2 · Sep 13 · R1355', text: 'LightGBM + XGBoost on 780 features, 2:1. Better offline (BMC +0.0014, p = 0.015) — but live correlation with the meta model rose to 0.429. First round resolves Dec 11.', border: 'var(--line)', color: 'var(--dim)' },
];

const para = { margin: 0, color: 'var(--sub)', lineHeight: 1.6, fontSize: 16 };

export default function Numerai() {
  return (
    <ProjectLayout slug="numerai" anchors={[{ href: '#live', label: 'Live results' }, { href: '#pipeline', label: 'Pipeline' }, { href: '#findings', label: 'Findings' }]}>
      <Hero
        meta="ML · live tournament · Python · Jun 2026 – now"
        title="Numerai pipeline"
        lead="Gradient-boosted ensembles for the Numerai Classic tournament, chosen by an era-split holdout and shipped as self-contained hosted models that predict and submit every round without me. The target isn't raw accuracy but BMC — being right in ways the crowd isn't."
        stats={[
          { value: '86', label: 'consecutive rounds, R1287–1372, none missed', color: '#c9a7ff' },
          { value: '1.64', label: 'BMC Sharpe, v1 over 56 resolved live rounds' },
          { value: '96%', label: 'of resolved rounds with positive BMC' },
          { value: '0 NMR', label: 'staked — locked at the API-key level by design' },
        ]}
      />

      <Section id="live" first num="01" kicker="live results" title="BMC, round by round" lead={'All 86 rounds since the first submission. Solid bars are resolved; outlined bars are provisional and will move — provisional scores have run systematically low and once sent me chasing a "decay" that wasn\'t there. From R1343 the platform stretched resolution from ~33 to ~90 days, so v2\'s first round only resolves on Dec 11.'}>
        <RoundsChart />
        <UniquenessChart />
        <div style={{ marginTop: 24 }}>
          <Strip items={[
            { k: 'BMC', v: '+0.0115', s: 'Sharpe 1.64 · 96% positive' },
            { k: 'CORR', v: '+0.0177', s: 'Sharpe 1.37' },
            { k: 'MMC', v: '+0.0060', s: 'Sharpe 0.72 · 71% positive' },
            { k: 'FNCv3', v: '+0.0143', s: 'v1 · 56 resolved rounds' },
          ]} />
        </div>
      </Section>

      <Section id="pipeline" num="02" kicker="pipeline" title="Research offline, ship a pickle, let it run">
        <FlowRow nodes={[
          { title: 'Downsample', sub: '1.69M rows · 305 eras — full build OOMs at 16 GB' },
          { title: 'Era split', sub: 'SELECT 80% · HOLDOUT 20% · 13-era embargo' },
          { title: 'Autoresearch ladder', sub: 'target → transform → capacity → XGBoost → linear → ensemble', tone: 'accent' },
          { title: 'Package', sub: 'cloudpickle closure, native models only, Python 3.12 pinned' },
          { title: 'Deploy', sub: 'upload → validate (~45 min) → assign to model slot' },
          { title: 'Every round', sub: "Numerai's hosted compute predicts and submits", tone: 'gold' },
        ]} />
        <Grid min={300} gap={20} className="rv">
          {versions.map((v) => (
            <div key={v.tag} style={{ marginTop: 40, border: `1px solid ${v.border}`, borderRadius: 12, padding: 20, background: 'var(--surface-2)' }}>
              <span className="mono" style={{ color: v.color }}>{v.tag}</span>
              <p style={{ ...para, marginTop: 8 }}>{v.text}</p>
            </div>
          ))}
        </Grid>
      </Section>

      <Section num="03" kicker="the holdout decides" title="Pick on SELECT, prove on HOLDOUT">
        <Grid min={460} gap={40}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 className="rv" style={{ margin: 0, fontSize: 24 }}>HOLDOUT BMC by candidate</h3>
            <Bars small label={170} value={70} items={[
              { label: <b>Cross-family ensemble</b>, pct: 100, value: '.00394', color: '#c9a7ff' },
              { label: 'Residualised LGBM', pct: 84.5, value: '.00333', color: '#8f4dff' },
              { label: 'Same-family ensemble', pct: 69.3, value: '.00273', color: '#ff8a4c' },
              { label: 'ElasticNet', pct: 62.2, value: '.00245', color: '#7a3cf0' },
              { label: 'LGBM, medium features', pct: 53, value: '.00209', color: '#7a3cf0' },
              { label: 'Shallow XGBoost', pct: 45.2, value: '.00178', color: '#7a3cf0' },
              { label: 'Baseline', pct: 37.1, value: '.00146', color: '#4b5563', muted: true },
            ]} />
            <p className="rv" style={para}>The same-family ensemble (orange) had the <b>highest SELECT score of all</b>, +0.0114 — and collapsed to +0.0027 on HOLDOUT. The guard caught the overfit before it went live.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 className="rv" style={{ margin: 0, fontSize: 24 }}>Correlation with the meta model</h3>
            <Bars small label={170} value={70} items={[
              { label: 'LGBM, small features', pct: 41, value: '.205', color: '#c9a7ff' },
              { label: 'ElasticNet', pct: 58.7, value: '.293', color: '#9f6bff' },
              { label: 'LGBM, medium', pct: 73.2, value: '.366', color: '#7a3cf0' },
              { label: 'XGBoost, medium', pct: 74.7, value: '.373', color: '#7a3cf0' },
              { label: <b>Live v1</b>, pct: 74.4, value: '.372', color: '#8f4dff' },
              { label: <b style={{ color: '#e3b341' }}>Live v2</b>, pct: 85.8, value: '.429', color: '#e3b341' },
            ]} />
            <p className="rv" style={para}>Weak members earn their place by being different. v2 dropped the two least-correlated members (small-feature LightGBM and ElasticNet) and its uniqueness regressed — so correlation with the meta model is now a first-class metric, not an afterthought.</p>
          </div>
        </Grid>
      </Section>

      <Section id="findings" num="04" kicker="findings" title="What the data said">
        <Findings items={[
          { big: 'accurate ≠ valuable', text: 'The starter model scored CORR +0.0128 but BMC −0.0009: right, but right like everyone else. BMC/MMC became the target metric from day one.' },
          { big: '~9×', text: 'Platform diagnostics are in-sample and inflated BMC about nine-fold (+0.031 vs +0.0034 honest). I wrote a train-only diagnostics script instead.' },
          { big: '.0076 → .0018', text: 'The bottleneck was evaluation resolution. Full-density eras, paired t-tests and split-half checks shrank the smallest detectable difference 4× — and rescued a model the old method had wrongly discarded.' },
          { big: '+30%', text: 'Residualising the target against the benchmark was the main BMC lever: SELECT +0.0075 → +0.0098.' },
          { big: '780 > 2,748', text: 'The medium feature set is the sweet spot; using all features made BMC worse (+0.0094 → +0.0080).' },
          { big: 'refuted', text: '"Retrain more often" doesn\'t pay: dropping the latest 120 eras cost only ~0.001 BMC. Not worth the deployment risk.' },
        ]} />
      </Section>

      <Section num="05" kicker="bugs worth telling" title="Problem → fix">
        <Fixes items={[
          ["The model pickle imported a local package missing in Numerai's container", 'Closure references only native models; verified in a clean env'],
          ['cloudpickle bytecode breaks across Python minor versions', 'Package under 3.12 to match the container; versions passed explicitly'],
          ['The training environment was wiped during a machine cleanup', 'Recovered dependency versions from the live pickle; added a lock file'],
          ['Provisional scores read as model decay — and a "data by Oct 3" plan missed that resolution had stretched to ~90 days', 'Only resolved rounds decide; meanwhile judge on correlation with the meta model'],
        ]} />
      </Section>

      <NextNote num="06">
        <p>v2's first round resolves on Dec 11. Until then the only hard signal is uniqueness: its correlation with the meta model has eased from 0.435 to 0.418 over R1365–1370 but is still above v1's 0.372. Next: add back a de-correlating small-feature member, keep v1 one assignment away as a rollback, and track meta-model correlation alongside BMC.</p>
      </NextNote>
    </ProjectLayout>
  );
}
