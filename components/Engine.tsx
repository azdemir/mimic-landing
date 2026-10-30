import Reveal from "./Reveal";

const SIGNALS = [
  {
    signal: "Accessible role + name",
    weight: "0.34",
    note: "First choice. Survives most refactors because intent outlives markup.",
  },
  {
    signal: "Text similarity",
    weight: "0.24",
    note: "Levenshtein over labels — catches relabels like “Checkout” → “Pay now”.",
  },
  {
    signal: "Structure",
    weight: "0.18",
    note: "LCS over the DOM subtree — the tree moved, the intent didn't.",
  },
  {
    signal: "Visual grounding",
    weight: "0.24",
    note: "SAM 3.1 mask match — last resort: find the element by sight.",
  },
];

export default function Engine() {
  return (
    <section id="engine" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">03 — The healing engine</p>
              <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] md:text-5xl">
                Four signals. <em className="font-light">One verdict.</em>
              </h2>
              <p className="mt-5 leading-relaxed text-ink2">
                Every locator carries four fallbacks, weighted and transparent. A candidate heals at
                a combined score of <span className="font-mono text-sm text-ink">≥ 0.80</span> —
                below that, the run fails loudly instead of guessing.
              </p>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-mute">
                Example design values, shown to explain the mechanism — not production tuning.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ol className="border-t rule">
              {SIGNALS.map((s) => (
                <li key={s.signal} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b rule py-6">
                  <h3 className="font-mono text-sm font-medium">{s.signal}</h3>
                  <span className="font-mono text-sm tabular-nums text-accentink">{s.weight}</span>
                  <p className="col-span-2 text-sm leading-relaxed text-ink2">{s.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
