import { Findings, FlowColumn, Grid, Hero, NextNote, ProjectLayout, Section } from '../../components/ProjectKit';
import '../../styles/pages.css';

const MONTHLY: [string, number][] = [['Feb', 20], ['Mar', 23], ['Apr', 6], ['May', 5]];
const SUMMARY = ['overview', 'highlights', 'risks', 'gaps', 'follow-ups'];

function Contribution() {
  return (
    <div className="rv" style={{ display: 'flex', flexWrap: 'wrap', gap: 36, alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 120 120" width="220" height="220" role="img" aria-label="About 85 percent of the current Python code was written by me">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#1e232c" strokeWidth="14" />
        <circle className="ring-draw" cx="60" cy="60" r="50" fill="none" stroke="#8f4dff" strokeWidth="14" strokeLinecap="round" transform="rotate(-90 60 60)" />
        <text x="60" y="60" fill="#fff" fontSize="22" fontWeight="900" textAnchor="middle">85%</text>
        <text x="60" y="76" fill="#b9bfcc" fontSize="8" textAnchor="middle" fontFamily="var(--mono)">of current code</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 240 }}>
        <span className="mono" style={{ color: 'var(--muted)', fontSize: 14 }}>my commits per month</span>
        {MONTHLY.map(([m, n], i) => (
          <div key={m} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0, 1fr) 30px', gap: 10, alignItems: 'center' }}>
            <span>{m}</span>
            <div style={{ height: 18, background: 'var(--track)', borderRadius: 4, overflow: 'hidden' }}>
              <div className="grow-x" style={{ height: '100%', width: `${(n / 23) * 100}%`, background: n === 23 ? '#c9a7ff' : '#8f4dff', animationDelay: `${i * 0.1}s` }} />
            </div>
            <b>{n}</b>
          </div>
        ))}
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>54 of 62 non-merge commits</span>
      </div>
    </div>
  );
}

function ReportPhases() {
  return (
    <div className="flow-col" style={{ gap: 14 }}>
      <span className="cap" style={{ marginBottom: 0 }}>due-diligence agent</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <b>Phase 1 · 11 sections in parallel <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: 14 }}>(concurrency 5)</span></b>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {Array.from({ length: 11 }, (_, i) => <span className="sec-chip" key={i} style={{ background: '#fff', color: 'var(--ink)', animationDelay: `${i * 0.05}s` }}>§{i + 1}</span>)}
        </div>
      </div>
      <div className="flow-v" />
      <div className="node"><b>Merge &amp; de-duplicate citations</b></div>
      <div className="flow-v" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <b>Phase 2 · 5 summary sections</b>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SUMMARY.map((s, i) => <span className="sec-chip" key={s} style={{ background: '#c9a7ff', color: '#1a1030', animationDelay: `${0.6 + i * 0.05}s` }}>{s}</span>)}
        </div>
      </div>
      <div className="mono" style={{ borderTop: '1px solid var(--line)', paddingTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
        {['comps valuation agent', 'report Q&A bot', 'literature RAG bot'].map((a) => <span key={a} style={{ border: '1px dashed #3a4150', borderRadius: 6, padding: '6px 10px' }}>{a}</span>)}
      </div>
    </div>
  );
}

export default function MiningAgents() {
  return (
    <ProjectLayout slug="mining-agents" anchors={[{ href: '#role', label: 'My role' }, { href: '#system', label: 'System' }, { href: '#decisions', label: 'Decisions' }]}>
      <Hero
        meta="Work · Deep-Optica · AI & Data Pipeline Engineer · Feb – May 2026"
        title="MiningAgents"
        lead="A multi-agent system for mining-asset due diligence: it finds and parses technical and annual reports, retrieves evidence, and writes structured due-diligence and comparable-valuation reports. I rebuilt it from a legacy codebase into a single installable package and wrote most of it."
        stats={[
          { value: '~85%', label: 'of the current codebase authored by me', color: '#c9a7ff' },
          { value: '4', label: 'agents in one package' },
          { value: '16', label: 'report sections, two-phase generation' },
          { value: '6', label: 'output languages' },
        ]}
      />

      <Section id="role" first num="01" kicker="my role" title="From two legacy services to one package">
        <Grid min={440} gap={48} align="center">
          <div className="rv" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ margin: 0, color: 'var(--sub)', lineHeight: 1.65 }}>I migrated ~16,300 lines across two separate services into a single installable Python package with per-agent optional dependencies, CI (Black, Ruff, mypy, pytest) and PR review — then built most of what runs on top of it:</p>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--sub)', lineHeight: 1.8 }}>
              <li>The due-diligence agent and its 16 report sections</li>
              <li>RAG engine, vector store and PDF parsing (text + tables)</li>
              <li>Report finder, comparable-valuation agent, literature Q&amp;A bot</li>
              <li>Structured-database integration and an embedding migration</li>
            </ul>
          </div>
          <Contribution />
        </Grid>
      </Section>

      <Section id="system" num="02" kicker="system" title="Evidence first, then two waves of writing" lead="Agents → tools → data. Structured records are preferred over retrieved text whenever both exist, and summary sections are written only after the sections they summarise.">
        <Grid min={420} gap={28} className="rv">
          <FlowColumn caption="evidence" nodes={[
            { title: 'Report finder', sub: 'web search → de-dup → LLM filter → newest technical and annual reports' },
            { title: 'PDF parser', sub: 'section / text / table tree → Markdown; key-table and all-table modes' },
            { title: 'Index', sub: 'sentence-bounded token windows · LLM-written table summaries · incremental ingest' },
            { title: 'Hybrid retrieval', sub: 'vector recall re-ranked with BM25 · structured DB checked first', tone: 'accent' },
          ]} />
          <ReportPhases />
        </Grid>
      </Section>

      <Section id="decisions" num="03" kicker="engineering decisions" title="Making retrieval and tables trustworthy">
        <Findings items={[
          { title: "The chunk size that wasn't applied", text: 'The configured chunk size was never actually used: one path cut 3,000-character blocks, another split only on blank lines. I unified both into sentence-bounded token windows, and measured the paragraph-length distribution before choosing the size.' },
          { title: 'Resource tables, guarded', text: 'Structured records first, retrieved tables second. Two guards on LLM output (a table must exist; the result must parse as one), unit normalisation (t → kt, oz → koz, lb → Mlb), outlier grades rejected, and missing Measured + Indicated rebuilt as Total − Inferred with tonnage-weighted grades.' },
          { title: 'Two-phase orchestration', text: 'Summary sections depend on finished body text, so the report runs as a parallel first wave, a citation merge, then a second wave — instead of one long sequential chain.' },
          { title: 'Embedding migration', text: 'Moved from a local embedding model to a hosted 1536-dimension one, re-encoding the full text and table index in one pass with a migration log.' },
          { title: 'Ingest without wiping', text: 'Adding documents used to clear the existing index. Switched to incremental document management with a separate index rebuild.' },
          { title: 'Nested event loops', text: 'RAG initialisation called asyncio.run() for downloads inside an already-running loop. Moved initialisation ahead of the main loop.' },
        ]} />
      </Section>

      <NextNote num="04" kicker="note">
        <p>This was company work for Deep-Optica. Datasets, prompts, clients and evaluation results are confidential and not shown; the code is private.</p>
      </NextNote>
    </ProjectLayout>
  );
}
