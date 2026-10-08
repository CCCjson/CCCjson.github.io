export type Kind = 'Education' | 'Work' | 'Research';

export type HistoryEntry = {
  id: string;
  lane: 'edu' | 'work';
  /** fractional years, e.g. 2020.67 ≈ Sep 2020 */
  start: number;
  end: number;
  label: string;
  kind: Kind;
  role: string;
  org: string;
  dates: string;
  image: { name: string; widths: number[]; caption: string };
  short: string;
  bullets: string[];
  tags: string[];
  link?: { to: string; label: string };
};

export const kindColor: Record<Kind, { c: string; on: string }> = {
  Education: { c: '#8f4dff', on: '#ffffff' },
  Work: { c: '#e3b341', on: '#0d1116' },
  Research: { c: '#5ab0ff', on: '#0d1116' },
};

/** Axis covers mid-2020 to early 2028. */
export const AXIS = { start: 2020.5, span: 7.7, now: 2026.77 };

/** Chronological — the panel's ←/→ buttons follow this order. */
export const history: HistoryEntry[] = [
  {
    id: 'usst', lane: 'edu', start: 2020.67, end: 2024.5, label: 'B.Eng. Automation · USST', kind: 'Education',
    role: 'B.Eng. Automation', org: 'University of Shanghai for Science and Technology · Shanghai', dates: 'Sep 2020 – Jul 2024',
    image: { name: 'history-usst', widths: [720, 1200], caption: 'USST main gate · Shanghai' },
    short: 'GPA 3.5 / 4.0 · rank 15 / 100.',
    bullets: [
      'Mathematics core average 85/100 (probability & statistics, calculus, linear algebra, complex analysis); Data Structures 93/100',
      'Municipal First Prize, Shanghai Innovation and Entrepreneurship Competition (2023)',
    ],
    tags: ['Automation', 'Mathematics', 'Data structures'],
  },
  {
    id: 'pushi', lane: 'work', start: 2022.33, end: 2022.67, label: 'Intern', kind: 'Work',
    role: 'Crawler Development Intern', org: 'Hainan Universal Intelligent Technology (Pushi AI)', dates: 'May – Sep 2022',
    image: { name: 'history-pushi', widths: [720, 1166], caption: 'Pushi AI · Hainan' },
    short: 'Industry-scale data collection.',
    bullets: [
      'Python crawlers collecting 10 years of indicator data across 500 industries',
      'Shipped a sentiment classifier as a FastAPI microservice',
    ],
    tags: ['Python', 'Scraping', 'FastAPI'],
  },
  {
    id: 'research', lane: 'work', start: 2024.67, end: 2025.33, label: 'Research', kind: 'Research',
    role: 'Research Assistant to Academician GU Min', org: 'USST School of AI Science & Technology · Shanghai', dates: 'Sep 2024 – May 2025',
    image: { name: 'history-icnp24', widths: [800, 1600], caption: 'ICNP24 · International Conference on Neuromorphic Photonics · Shanghai' },
    short: 'Attention-augmented CNNs for fine-grained recognition.',
    bullets: [
      'Designed and ablated CNN architectures with attention modules in PyTorch; owned training, evaluation and experiment logging',
      'Co-organised the International Conference on Neuromorphic Photonics 2024 (ICNP24), leading 35 volunteers; Academician Award',
    ],
    tags: ['PyTorch', 'CNN / attention', 'Ablation'],
  },
  {
    id: 'deepoptica', lane: 'work', start: 2025.67, end: 2026.5, label: 'Deep-Optica', kind: 'Work',
    role: 'AI & Data Pipeline Engineer', org: 'Deep-Optica Geographic Technology', dates: 'Sep 2025 – Jul 2026',
    image: { name: 'history-deepoptica', widths: [720, 1331], caption: 'DeepOptica · modelling the mining world' },
    short: "Built the company's first LLM systems.",
    bullets: [
      'Scheduled ingestion pipelines with a RAG layer on ChromaDB, served over FastAPI',
      'MiningAgents: rebuilt a multi-agent due-diligence and valuation system into one package, authoring ~85% of the code',
    ],
    tags: ['RAG', 'ChromaDB', 'FastAPI', 'asyncio'],
    link: { to: '/projects/mining-agents', label: 'MiningAgents case study' },
  },
  {
    id: 'ntu', lane: 'edu', start: 2026.58, end: 2028.0, label: 'M.Sc. · NTU', kind: 'Education',
    role: 'M.Sc. Computer Control & Automation', org: 'Nanyang Technological University · Singapore', dates: 'Aug 2026 – Jan 2028',
    image: { name: 'history-ntu', widths: [720, 1440], caption: 'The Hive · NTU Singapore' },
    short: 'Distributed algorithms for generalised Nash equilibrium problems.',
    bullets: [
      'Dissertation with Prof. HU Guoqiang — game theory, convex optimisation, convergence under partial decision information',
      'Coursework: Probability & Random Processes · System Analysis · Genetic Algorithms & ML · Machine Vision',
    ],
    tags: ['Game theory', 'Convex optimisation', 'Probability'],
  },
];
