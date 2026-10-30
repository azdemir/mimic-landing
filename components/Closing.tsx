import Reveal from "./Reveal";

export default function Closing() {
  return (
    <section id="closing" className="scroll-mt-20 border-t rule">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">06 — The entry</p>
          <h2 className="font-display mt-6 max-w-3xl text-5xl font-medium leading-[1.02] md:text-7xl">
            Enter the <em className="font-light">Indie track.</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink2">
            Mimic is our entry to the Meta Global AI Developer Hackathon — judged on creativity,
            technical ambition, and whether it works. This page is the first artifact. The recorder
            is next.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#top"
              className="bg-accent px-7 py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink"
            >
              Follow the build
            </a>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
              Submissions close — Nov 4, 9:00 PM ET
            </p>
          </div>
        </Reveal>
      </div>
      <footer className="border-t rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 font-mono text-[11px] uppercase tracking-[0.16em] text-mute md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            <span className="font-display normal-case italic tracking-tight text-ink">mimic</span>
            <span className="ml-3">— show it once.</span>
          </p>
          <p>Concept project · Meta Global AI Developer Hackathon</p>
          <p>© 2026</p>
        </div>
      </footer>
    </section>
  );
}
