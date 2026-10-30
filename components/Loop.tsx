import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Record",
    body: "A featherweight recorder captures clicks, types, and navigations with DOM snapshots. No instrumentation, no test IDs required.",
  },
  {
    n: "02",
    title: "Generate",
    body: "Muse Spark reads the event stream and writes a clean, idiomatic Playwright spec — resilient locators ranked, waits handled.",
  },
  {
    n: "03",
    title: "Heal",
    body: "At runtime every locator carries four fallback signals. When one goes stale, the scorer re-resolves instead of failing.",
  },
  {
    n: "04",
    title: "Run",
    body: "Headless, on your schedule. Healed steps are reported, not hidden — you see exactly what changed and why.",
  },
];

export default function Loop() {
  return (
    <section id="loop" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">01 — The loop</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-medium leading-[1.05] md:text-5xl">
            Four moves. <em className="font-light">No maintenance.</em>
          </h2>
        </Reveal>
        <ol className="mt-12 border-t rule">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70}>
              <div className="grid gap-3 border-b rule py-8 md:grid-cols-[80px_220px_1fr] md:gap-8 md:py-10">
                <span className="font-mono text-sm text-accentink">{s.n}</span>
                <h3 className="font-display text-3xl font-medium md:text-4xl">{s.title}</h3>
                <p className="max-w-xl leading-relaxed text-ink2 md:pt-1.5">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
