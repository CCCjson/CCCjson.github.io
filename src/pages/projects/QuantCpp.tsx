import { useState } from 'react';
import { Bars, Findings, Fixes, FlowRow, Grid, Hero, NextNote, ProjectLayout, Section, Strip } from '../../components/ProjectKit';
import '../../styles/pages.css';

const BARS = [250, 1000, 2500, 10000, 25000];
/** Pre-fix speed-up of C++ over the Python engine, by bar count. */
const SPEEDUP = {
  MA_CROSS: [318.3, 293.1, 267.5, 256.1, 241.6],
  MACD: [72.0, 21.7, 8.7, 2.0, 0.9],
  RSI: [88.2, 28.4, 11.4, 2.6, 1.1],
};
/** MACD wall time (ms) before and after replacing O(N²) recomputation with incremental state. */
const MACD_MS = { before: [0.381, 2.308, 14.604, 240.105, 1468.161], after: [0.099, 0.202, 0.503, 2.29, 6.127] };

const X = (bars: number) => 80 + ((Math.log10(bars) - Math.log10(250)) / 2) * 840;
const ySpeed = (v: number) => 360 - ((Math.log10(v) + 0.301) / 3) * 320;
const yMs = (v: number) => 360 - ((Math.log10(v) + 1.301) / 4.602) * 320;
const path = (ys: number[], y: (v: number) => number) => ys.map((v, i) => `${i ? 'L' : 'M'}${X(BARS[i]).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');

function XAxis({ unit = 'bars' }: { unit?: string }) {
  return (
    <>
      {BARS.map((b, i) => (
        <text key={b} x={X(b)} y="390" fill="#b9bfcc" fontSize="13" textAnchor="middle">{b.toLocaleString('en-US')}{i === BARS.length - 1 ? ` ${unit}` : ''}</text>
      ))}
    </>
  );
}

function SpeedChart() {
  return (
    <svg className="chart" viewBox="0 0 1000 420" role="img" aria-label="C++ speed-up over Python by number of bars: MA_CROSS stays between 240 and 318 times, MACD falls from 72 times to 0.9 times, RSI from 88 to 1.1 times">
      <line x1="80" y1="360" x2="940" y2="360" stroke="#3a4150" />
      {[100, 10].map((v) => (
        <g key={v}>
          <line x1="80" y1={ySpeed(v)} x2="940" y2={ySpeed(v)} stroke="#252b35" />
          <text x="70" y={ySpeed(v) + 4} fill="#9aa3b2" fontSize="13" textAnchor="end">{v}×</text>
        </g>
      ))}
      <line x1="80" y1={ySpeed(1)} x2="940" y2={ySpeed(1)} stroke="#ff8a4c" strokeDasharray="6 6" />
      <text x="70" y={ySpeed(1) + 4} fill="#ff8a4c" fontSize="13" textAnchor="end">1×</text>
      <text x="90" y={ySpeed(1) + 20} fill="#ff8a4c" fontSize="13">below this line Python wins</text>
      <path className="draw" d={path(SPEEDUP.MA_CROSS, ySpeed)} fill="none" stroke="#c9a7ff" strokeWidth="3" />
      <path className="draw l2" d={path(SPEEDUP.MACD, ySpeed)} fill="none" stroke="#ff8a4c" strokeWidth="3" />
      <path className="draw l3" d={path(SPEEDUP.RSI, ySpeed)} fill="none" stroke="#5ab0ff" strokeWidth="2.5" />
      <text className="lbl" x="905" y="52" fill="#c9a7ff" fontSize="15" fontWeight="700" textAnchor="end">MA_CROSS 241.6×</text>
      <text className="lbl" x="905" y="352" fill="#ff8a4c" fontSize="15" fontWeight="700" textAnchor="end">MACD 0.9×</text>
      <text className="lbl" x="300" y="160" fill="#5ab0ff" fontSize="14" fontWeight="700">RSI</text>
      <XAxis />
      <text x="500" y="414" fill="#7d8594" fontSize="12" textAnchor="middle">log–log · pre-fix snapshot · Apple M5, clang -O3 vs Python 3.10</text>
    </svg>
  );
}

function FixChart() {
  const end = BARS.length - 1;
  return (
    <svg className="chart" viewBox="0 0 1000 420" role="img" aria-label="MACD backtest time: before the fix it grows from 0.381 to 1,468 ms with slope 1.97; after, from 0.099 to 6.1 ms with slope 1.06">
      <line x1="80" y1="360" x2="940" y2="360" stroke="#3a4150" />
      {[0.5, 5, 50, 500].map((v) => (
        <g key={v}>
          <line x1="80" y1={yMs(v)} x2="940" y2={yMs(v)} stroke="#252b35" />
          <text x="70" y={yMs(v) + 4} fill="#9aa3b2" fontSize="13" textAnchor="end">{v}{v === 500 ? ' ms' : ''}</text>
        </g>
      ))}
      <path className="draw" d={path(MACD_MS.before, yMs)} fill="none" stroke="#ff8a4c" strokeWidth="3" />
      <path className="draw l2" d={path(MACD_MS.after, yMs)} fill="none" stroke="#c9a7ff" strokeWidth="3" />
      <text className="lbl" x="905" y="36" fill="#ff8a4c" fontSize="15" fontWeight="700" textAnchor="end">before · O(N²) · k = 1.97 · 1,468 ms</text>
      <text className="lbl" x="905" y="200" fill="#c9a7ff" fontSize="15" fontWeight="700" textAnchor="end">after · O(N) · k = 1.06 · 6.1 ms</text>
      <line x1={X(BARS[end])} y1={yMs(MACD_MS.before[end]) + 9} x2={X(BARS[end])} y2={yMs(MACD_MS.after[end]) - 9} stroke="#fff" strokeWidth="1.5" strokeDasharray="3 4" />
      <text className="lbl" x="930" y="135" fill="#fff" fontSize="18" fontWeight="900">240×</text>
      <XAxis />
      <text x="500" y="414" fill="#7d8594" fontSize="12" textAnchor="middle">log–log · slope k from complexity fit · economic results bit-identical before and after</text>
    </svg>
  );
}

function Benchmark() {
  const [chart, setChart] = useState<'speed' | 'fix'>('speed');
  return (
    <>
      <div className="tab-row rv" role="group" aria-label="Choose chart">
        <button type="button" className={`pill${chart === 'speed' ? ' on' : ''}`} aria-pressed={chart === 'speed'} onClick={() => setChart('speed')}>Speed-up vs Python</button>
        <button type="button" className={`pill${chart === 'fix' ? ' on' : ''}`} aria-pressed={chart === 'fix'} onClick={() => setChart('fix')}>MACD before vs after the fix</button>
      </div>
      {/* keyed wrapper re-enters the DOM on switch so the lines redraw */}
      <div key={chart} className="panel rv" style={{ paddingBottom: 12 }}>{chart === 'speed' ? <SpeedChart /> : <FixChart />}</div>
    </>
  );
}

const quote = { borderLeft: '3px solid var(--accent)', padding: '4px 0 4px 16px', color: 'var(--sub)', lineHeight: 1.55, fontSize: 16 };

export default function QuantCpp() {
  return (
    <ProjectLayout slug="quant-cpp-engines" github="https://github.com/CCCjson/quant-cpp-engines" anchors={[{ href: '#benchmark', label: 'Benchmark' }, { href: '#orderbook', label: 'Order book' }, { href: '#verification', label: 'Verification' }]}>
      <Hero
        meta="Systems · C++17 · Python · Aug – Sep 2026"
        title="quant-cpp-engines"
        lead={'Two trading engines written from scratch in C++17 — an event-driven backtester and a limit-order-book matching simulator — plus a controlled benchmark against the production Python engine they replace. The starting assumption, "C++ is much faster", was falsified by my own data.'}
        stats={[
          { value: '0.9× → 240×', label: 'C++ MACD vs Python at 25k bars, before and after the fix', color: '#c9a7ff' },
          { value: '1.30M', label: 'orders per second · p50 626 ns' },
          { value: '162', label: 'GoogleTest cases · ASan, UBSan, TSan clean' },
          { value: '0.00e+00', label: 'diff on 7 economic metrics vs Python, gated in CI' },
        ]}
      />

      <Section id="benchmark" first num="01" kicker="the hypothesis that failed" title="Same engine, opposite conclusions" lead="On a simple moving-average strategy C++ was ~240× faster. On MACD the advantage shrank as data grew, until C++ lost at 25,000 bars. Language wasn't the variable — algorithmic order was: the C++ indicators recomputed from bar 0 on every bar.">
        <Benchmark />
        <div className="p-head rv" style={{ marginTop: 56, marginBottom: 20 }}>
          <h2 style={{ fontSize: 26 }}>Where the time actually goes</h2>
          <p className="note">Each factor isolated in its own controlled experiment · log scale</p>
        </div>
        <Bars label={240} value={120} items={[
          { label: 'Algorithmic order', pct: 96, value: 'up to 253×', color: '#c9a7ff' },
          { label: 'Language / runtime', pct: 95, value: '176–242×', color: '#5000ca' },
          { label: 'pandas scalar indexing', pct: 16, value: '≈2.5×', color: '#7a3cf0' },
          { label: 'Heap allocation', pct: 10, value: '1.8×', color: '#9f6bff' },
        ]} />
        <Grid min={280} gap={18} className="rv">
          <div style={{ ...quote, marginTop: 28 }}>Order effects grow with N; language is a constant — and drifted 37% just by switching Python 3.10 → 3.13.</div>
          <div style={{ ...quote, marginTop: 28 }}>61% of Python's per-bar cost was DataFrame scalar access; <code>df.iloc[i]['close']</code> is 314× slower than numpy.</div>
          <div style={{ ...quote, marginTop: 28 }}>On small jobs over HTTP, 91% of the time is JSON and round-trips; <code>import pandas</code> alone costs 386 ms.</div>
        </Grid>
      </Section>

      <Section id="orderbook" num="02" kicker="the order book" title="Price–time priority, measured in nanoseconds" lead="MARKET, LIMIT, IOC and FOK orders (FOK pre-checked, never rolled back), FIFO queues per price level, an order-id index for O(1) cancel, and per-session locks behind a REST server.">
        <FlowRow nodes={[
          { title: 'REST server', sub: ':8001 · session manager' },
          { title: 'Matching engine', sub: 'price, then time' },
          { title: 'Limit order book', sub: 'std::map<Price> + id index', tone: 'accent' },
          { title: 'Price levels', sub: 'FIFO · O(1) totals' },
          { title: 'Stats & impact', sub: 'spread, depth, VWAP, √-impact' },
        ]} />
        <Grid min={420} className="rv">
          <div className="panel" style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="cap">insert latency · 200,000 mixed orders</span>
            <Bars small label={60} value={90} items={[
              { label: 'p50', pct: 31, value: '626 ns', color: '#c9a7ff' },
              { label: 'p90', pct: 42, value: '834 ns', color: '#9f6bff' },
              { label: 'p99', pct: 63, value: '1,251 ns', color: '#7a3cf0' },
              { label: 'p99.9', pct: 100, value: '2,000 ns', color: '#5000ca' },
            ]} />
            <span style={{ fontSize: 15, color: 'var(--sub)' }}>Throughput <b style={{ color: '#fff' }}>1,297,401 orders/s</b></span>
          </div>
          <div className="panel" style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="cap">cancel, before vs after the order-id index</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 30, color: 'var(--orange)' }}>44,389 ns</b><span style={{ color: 'var(--muted)' }}>→</span>
              <b style={{ fontSize: 30, color: 'var(--accent-soft)' }}>142 ns</b>
              <span className="tier" style={{ background: 'var(--accent-deep)', color: '#fff', fontSize: 16 }}>312× amortised</span>
            </div>
            <p style={{ margin: 0, color: 'var(--sub)', lineHeight: 1.6, fontSize: 16 }}>I first published <s>502×</s>. Then I measured the clock: the new p50 was only two 41 ns ticks (±24%), and the before/after runs used different harnesses. Re-measured on the old commit with the same harness, the honest figure is 312×.</p>
          </div>
        </Grid>
      </Section>

      <Section id="verification" num="03" kicker="verification" title="No number is quoted until the economics match">
        <Grid min={440} gap={28} align="start" className="rv">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 24 }}>The bug differential testing found</h3>
            <p style={{ margin: 0, color: 'var(--sub)', lineHeight: 1.65 }}>Randomised testing against a slow reference model — 200 seeds × 300 steps, 60,000 operations — caught a later order filling before an earlier one. Seed 12648430 shrank automatically from 300 steps to 3. Two algebraically equal prices had landed on different <code>std::map&lt;double&gt;</code> keys.</p>
            <p style={{ margin: 0, color: 'var(--sub)', lineHeight: 1.65 }}>Fix: a strongly-typed <code>int64</code> fixed-point <code>Price</code> (1e-4 ticks); floats exist only at the JSON boundary.</p>
          </div>
          <div className="code">
            <div className="file">limit_order_book.h</div>
            <pre>
              <span className="del">- std::map&lt;double, PriceLevel&gt; asks_;</span>{'\n'}
              <span className="del">-   // 100.06999999999999 ≠ 100.07000000000001</span>{'\n'}
              <span className="add">+ struct Price {'{'} int64_t ticks; {'}'};  // 1e-4</span>{'\n'}
              <span className="add">+ std::map&lt;Price, PriceLevel&gt; asks_;</span>{'\n'}
              <span className="com">  // double ↔ Price only at the JSON boundary</span>
            </pre>
          </div>
        </Grid>
        <div style={{ marginTop: 40 }}>
          <Findings min={240} items={[
            { big: '7 × 3', title: 'Parity gate in CI', text: 'Seven economic metrics on three strategies must equal the frozen Python engine bit for bit.' },
            { big: '182 → 0', title: 'Data races', text: 'TSan verified both ways: locks removed, 182 races; locks in, zero.' },
            { big: '9 / 11', title: 'Pre-registered predictions', text: 'Written before the run: 9 hit, 1 missed, 1 not applicable. The miss exposed a ~1.05 slope floor.' },
            { big: '4 jobs', title: 'CI matrix', text: 'gcc/clang × Release/Debug + macOS, ASan+UBSan, TSan, parity gate; -Werror, -ffp-contract=off.' },
          ]} />
        </div>
      </Section>

      <Section num="04" kicker="bugs worth telling" title="Problem → fix">
        <Fixes items={[
          ['A LIMIT order missing its price swept the whole book — 0 doubled as a "no limit" sentinel', <><code>std::optional&lt;Price&gt;</code>; REST returns 400</>],
          [<>KDJ overbought/oversold thresholds inverted: <b>53–131×</b> more trades than Python</>, 'Swapped back, 5 tests (3 proven red first); trade counts now match'],
          ['Strategy state leaked across reruns and symbols', 'Failing test first, then reset in on_init() and per-symbol state slots'],
          ["Parity gate only ran MA_CROSS — the code I changed wasn't covered", "Extended to MACD/KDJ; RSI's seeding difference logged, tolerance not loosened"],
          ['Multithreaded REST: map rehash, use-after-free, non-atomic IDs', 'Per-session mutex, shared_mutex table, shared_ptr, atomic IDs'],
          ['Docs claimed "zero warnings" with warnings switched off, and -O2 while building -O3', '-Werror on; environment table corrected'],
        ]} />
      </Section>

      <section className="p-sec">
        <Strip items={[
          { k: 'timeline', v: 'Aug 24 → Sep 16', s: '28 commits, solo' },
          { k: 'C++', v: '15,384 lines', s: '5,333 of them tests' },
          { k: 'backtester', v: '10 strategies', s: '19 metrics · T+1 · no look-ahead' },
          { k: 'write-up', v: '67 KB report', s: '14 result files, EN + 中文' },
        ]} />
      </section>

      <NextNote num="05">
        <p>Run a controlled experiment on the ~1.05–1.08 slope floor (cache hypothesis, untested); settle RSI's seeding convention so it can join the parity gate; benchmark concurrency; move toward a hybrid — vectorised indicator precompute with the serial loop in C++.</p>
      </NextNote>
    </ProjectLayout>
  );
}
