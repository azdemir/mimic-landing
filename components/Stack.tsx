import Reveal from "./Reveal";

const CARDS = [
  {
    n: "i.",
    title: "Muse Spark",
    body: "Reads the recorded event stream and authors the spec. Idiomatic Playwright, resilient locator ranking, waits handled — no boilerplate, no cleanup pass.",
  },
  {
    n: "ii.",
    title: "SAM 3.1",
    body: "Visual grounding for the last resort. When the DOM gives up — restyled, restructured, renamed — the mask doesn't. The element is found by sight.",
  },
  {
    n: "iii.",
    title: "The scorer",
    body: "A heuristic engine in the lineage of self-healing research: LCS over structure, Levenshtein over text. Weighted, transparent, and loud when unsure.",
  },
];

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t rule bg-cream/50">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">05 — The stack</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-medium leading-[1.05] md:text-5xl">
            Three instruments, <em className="font-light">one loop.</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="bg-paper">
              <article className="flex h-full flex-col p-8 md:p-10">
                <p className="font-mono text-[12px] text-accentink">{c.n}</p>
                <h3 className="font-display mt-4 text-3xl font-medium">{c.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-ink2">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
