export type Category = 'quant' | 'systems' | 'ml';

export type ProjectCard = {
  slug: string;
  name: string;
  kind: string;
  period: string;
  cats: Category[];
  metric: string;
  metricLabel: string;
  desc: string;
  tags: string[];
  github?: string;
  /** sparkline path in a 400×120 box */
  spark: string;
};

/** Order here is the order on the home page and the prev/next chain on project pages. */
export const projects: ProjectCard[] = [
  {
    slug: 'worldquant-brain-miner',
    name: 'WorldQuant BRAIN Miner',
    kind: 'Quant research',
    period: 'Sep 2026',
    cats: ['quant'],
    metric: 'GOLD',
    metricLabel: 'in 6 scoring days · 10,161 points',
    desc: 'Fully automated alpha research: harvest ideas, simulate under a hard quota, hill-climb the settings that decide pass or fail, and submit on schedule. 35,272 simulations, 12 submissions.',
    tags: ['Python', 'SQLite', '640 tests'],
    spark: 'M0 108 L80 94 L160 80 L240 62 L320 44 L400 30',
  },
  {
    slug: 'quant-cpp-engines',
    name: 'quant-cpp-engines',
    kind: 'Exchange sim · backtester',
    period: 'Aug – Sep 2026',
    cats: ['quant', 'systems'],
    metric: '0.9× → 240×',
    metricLabel: 'C++ vs Python on MACD, before and after an O(N²) fix',
    desc: 'Two C++17 engines — a limit order book (1.3M orders/s) and an event-driven backtester — plus a benchmark study showing algorithmic complexity, not language, decided the speed.',
    tags: ['C++17', 'GoogleTest', 'CMake', 'Python'],
    github: 'https://github.com/CCCjson/quant-cpp-engines',
    spark: 'M0 60 L20 58 L40 66 L60 50 L80 62 L100 44 L120 70 L140 40 L160 64 L180 48 L200 58 L220 36 L240 66 L260 42 L280 56 L300 30 L320 60 L340 38 L360 52 L380 34 L400 46',
  },
  {
    slug: 'fin',
    name: 'Fin (MoneyBill)',
    kind: 'Multi-agent research desk',
    period: 'Feb – Aug 2026',
    cats: ['quant', 'ml'],
    metric: '2,318',
    metricLabel: 'automated tests passing',
    desc: 'Conversational trading research desk: a ReAct orchestrator over 68 tools and 8 subagents across four markets, where a human confirms every live order.',
    tags: ['Python', 'TypeScript', 'FastAPI', 'Tauri'],
    github: 'https://github.com/CCCjson/Fin',
    spark: 'M0 100 C60 100 80 40 140 50 S220 100 270 70 S350 20 400 30',
  },
  {
    slug: 'numerai',
    name: 'Numerai pipeline',
    kind: 'ML · live tournament',
    period: 'Jun 2026 – now',
    cats: ['ml', 'quant'],
    metric: '86',
    metricLabel: 'consecutive rounds submitted, hands-off',
    desc: 'LightGBM/XGBoost ensembles deployed as hosted models, chosen through an era-split holdout. Live v1: BMC Sharpe 1.64, positive in 96% of resolved rounds.',
    tags: ['Python', 'LightGBM', 'XGBoost'],
    spark: 'M0 90 L50 90 L50 70 L100 70 L100 80 L150 80 L150 60 L200 60 L200 66 L250 66 L250 44 L300 44 L300 52 L350 52 L350 34 L400 34',
  },
  {
    slug: 'day-trade-assistant',
    name: 'Day-trade assistant',
    kind: 'Trading tooling',
    period: 'Oct 2026',
    cats: ['quant', 'systems'],
    metric: '21',
    metricLabel: 'pre-trade checks before any order',
    desc: 'Terminal assistant for a live cash account: a fee-aware cost engine, settled-cash model and rule gate. AI suggests and translates, but never sits in the order path.',
    tags: ['Python', 'asyncio', 'Textual', '214 tests'],
    spark: 'M0 80 L40 70 L80 86 L120 60 L160 74 L200 50 L240 66 L280 44 L320 58 L360 40 L400 48',
  },
  {
    slug: 'mining-agents',
    name: 'MiningAgents',
    kind: 'Work · Deep-Optica',
    period: 'Feb – May 2026',
    cats: ['ml'],
    metric: '16',
    metricLabel: 'section due-diligence reports, in 6 languages',
    desc: 'Rebuilt a multi-agent mining due-diligence system into one package: hybrid vector + BM25 retrieval and two-phase parallel report generation. Authored ~85% of the code.',
    tags: ['RAG', 'ChromaDB', 'asyncio', 'Python'],
    spark: 'M0 110 L60 100 L120 84 L180 70 L240 52 L300 40 L360 30 L400 26',
  },
];

export function neighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return { prev: i > 0 ? projects[i - 1] : undefined, next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : undefined };
}
