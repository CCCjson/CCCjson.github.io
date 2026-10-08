import { expertise } from '../../data/profile';

const icons = {
  chart: (
    <>
      <path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" />
    </>
  ),
  chip: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
    </>
  ),
  graph: (
    <>
      <circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="5" r="2.5" /><circle cx="19" cy="19" r="2.5" /><circle cx="12" cy="12" r="2.5" />
      <path d="M7.5 12h2M14.2 10.6l2.8-4M14.2 13.4l2.8 4" />
    </>
  ),
};

export default function Expertise() {
  return (
    <section id="expertise" className="h-sec">
      <h2 className="rv">Expertise</h2>
      <div className="skills">
        {expertise.map((s) => (
          <div className="skill rv" key={s.title}>
            <svg className="icon" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {icons[s.icon]}
            </svg>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <div className="chips">
              <span style={{ paddingRight: 4 }}>Tech stack:</span>
              {s.stack.map((t) => <span className="chip" key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
