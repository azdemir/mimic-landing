import Reveal from "./Reveal";

const META: Array<[string, string]> = [
  ["Input", "1 manual pass"],
  ["Output", "runnable .spec.ts"],
  ["Healing", "4 signals"],
  ["Target", "zero-flake runs"],
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="pt-16 md:pt-24 pb-10 md:pb-14">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accentink">
              Mimic — record once, test forever
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="font-display mt-6 text-[15vw] leading-[0.92] sm:text-7xl md:text-[6.5rem] font-medium">
              Show it once.
              <br />
              It tests <em className="font-light">forever.</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink2">
              Mimic watches a single manual QA pass and writes the Playwright test for you —
              then keeps it green when the UI changes, healing its own locators instead of flaking.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#demo"
                className="bg-ink px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent"
              >
                Run the loop
              </a>
              <a
                href="#engine"
                className="border rule px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
              >
                How it heals
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <dl className="grid grid-cols-2 border-t rule md:grid-cols-4">
            {META.map(([k, v]) => (
              <div key={k} className="border-b rule px-1 py-5 md:border-b-0 md:py-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{k}</dt>
                <dd className="mt-2 font-mono text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
