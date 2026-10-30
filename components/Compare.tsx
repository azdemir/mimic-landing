import Reveal from "./Reveal";

const ROWS: Array<[string, string, string]> = [
  ["Locator strategy", "Frozen XPath — first match wins", "Ranked signals, re-resolved at runtime"],
  ["One relabeled button", "The suite goes red", "Heals, then tells you what changed"],
  ["Screenshots", "Failure artifacts", "Locators — SAM 3.1 finds it by sight"],
  ["Maintenance", "You babysit the suite", "The suite files its own incident report"],
];

export default function Compare() {
  return (
    <section className="border-t rule">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">04 — Against the classics</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-medium leading-[1.05] md:text-5xl">
            Recorders failed you <em className="font-light">politely.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b rule font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                  <th className="py-4 pr-6 font-medium"> </th>
                  <th className="py-4 pr-6 font-medium">Classical recorders</th>
                  <th className="py-4 font-medium text-ink">Mimic</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, classic, mimic]) => (
                  <tr key={label} className="border-b rule align-top">
                    <th className="py-5 pr-6 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-mute">
                      {label}
                    </th>
                    <td className="py-5 pr-6 text-[15px] leading-relaxed text-ink2">{classic}</td>
                    <td className="py-5 text-[15px] font-medium leading-relaxed text-ink">
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
                      {mimic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
