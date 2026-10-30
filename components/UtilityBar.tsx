export default function UtilityBar() {
  return (
    <div className="border-b rule bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] md:px-8">
        <span className="text-paper/80">Self-healing regression testing</span>
        <span className="hidden text-paper/50 sm:inline">Meta Global AI Developer Hackathon — Indie track</span>
        <span className="text-accent">Nov 4 · 9PM ET</span>
      </div>
    </div>
  );
}
