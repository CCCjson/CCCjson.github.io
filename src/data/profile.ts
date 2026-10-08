export const links = {
  github: 'https://github.com/CCCjson',
  linkedin: 'https://www.linkedin.com/in/jinshengchen0828',
  email: 'cccjson0828@gmail.com',
};

export const expertise = [
  {
    icon: 'chart',
    title: 'Quantitative Research',
    text: 'Systematic alpha research with guards against spurious, exposure-driven Sharpe. Reached Gold on WorldQuant BRAIN in six scoring days; 86 consecutive live rounds on Numerai.',
    stack: ['Python', 'NumPy', 'Pandas', 'SQLite', 'alpha research', 'neutralisation', 'LightGBM'],
  },
  {
    icon: 'chip',
    title: 'Trading Systems & C++',
    text: 'Limit-order-book matching, event-driven backtesting and differential testing against reference models, with sanitizers and CI gates on every change.',
    stack: ['C++17', 'CMake', 'GoogleTest', 'ASan/UBSan/TSan', 'GitHub Actions', 'Linux', 'Docker'],
  },
  {
    icon: 'graph',
    title: 'ML, Data & Agents',
    text: 'Production data pipelines and LLM systems: scheduled ingestion, hybrid RAG retrieval, multi-agent research tools, and gradient-boosted models in a live tournament.',
    stack: ['PyTorch', 'XGBoost', 'FastAPI', 'ChromaDB', 'LangGraph', 'PostgreSQL', 'Redis'],
  },
] as const;
