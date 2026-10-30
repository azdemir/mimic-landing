"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

type Phase = "idle" | "recording" | "generating" | "broken" | "running" | "passed";

const EVENT_LINES = [
  "▸ click   [role=button name=\"Checkout\"]",
  "▸ fill    [label=\"Email\"] ← \"qa@mimic.dev\"",
  "▸ click   [role=link name=\"Pay securely\"]",
  "▸ assert  url → \"/order/8F31K\"",
  "● 4 events · 3 snapshots · 41s",
];

const CODE_LINES = [
  'import { test, expect } from "@playwright/test";',
  "",
  'test("checkout flow", async ({ page }) => {',
  '  await page.goto("https://shop.example/checkout");',
  '  await page.getByLabel("Email").fill("qa@mimic.dev");',
  '  await page.getByRole("button", { name: "Checkout" }).click();',
  "  await expect(page).toHaveURL(/\\/order\\/[A-Z0-9]+/);",
  "});",
];

type Score = { signal: string; detail: string; target: number; verdict: string; accent?: boolean };

const SCORES: Score[] = [
  { signal: "role + accessible name", detail: "button “Pay now →”", target: 0.74, verdict: "stale" },
  { signal: "text similarity", detail: "levenshtein(“Checkout”, “Pay now →”)", target: 0.88, verdict: "supporting" },
  { signal: "structure", detail: "lcs · same subtree, depth 4", target: 0.8, verdict: "supporting" },
  { signal: "visual mask", detail: "SAM 3.1 · mask IoU 0.93", target: 0.93, verdict: "healed", accent: true },
];

const STEP_LABELS: Record<Exclude<Phase, "idle" | "passed">, string> = {
  recording: "01 · Record",
  generating: "02 · Generate",
  broken: "03 · Break the UI",
  running: "04 · Run",
};

const PHASE_ORDER: Phase[] = ["recording", "generating", "broken", "running", "passed"];

export default function Demo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [eventCount, setEventCount] = useState(0);
  const [codeCount, setCodeCount] = useState(0);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [auto, setAuto] = useState(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const intervals = useRef<Array<ReturnType<typeof setInterval>>>([]);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
  }, []);

  useEffect(() => () => clearAll(), [clearAll]);

  const later = useCallback(
    (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, ms));
    },
    []
  );

  const reset = useCallback(() => {
    clearAll();
    setAuto(false);
    setPhase("idle");
    setEventCount(0);
    setCodeCount(0);
    setScores([0, 0, 0, 0]);
  }, [clearAll]);

  const runRecording = useCallback(() => {
    setPhase("recording");
    setEventCount(0);
    EVENT_LINES.forEach((_, i) => later(420 * (i + 1), () => setEventCount(i + 1)));
  }, [later]);

  const runGenerating = useCallback(() => {
    setPhase("generating");
    setCodeCount(0);
    CODE_LINES.forEach((_, i) => later(300 * (i + 1), () => setCodeCount(i + 1)));
  }, [later]);

  const runRunning = useCallback(() => {
    setPhase("running");
    setScores([0, 0, 0, 0]);
    SCORES.forEach((s, i) => {
      later(200 + i * 420, () => {
        const start = Date.now();
        const dur = 750;
        const iv = setInterval(() => {
          const t = Math.min(1, (Date.now() - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setScores((prev) => {
            const next = [...prev];
            next[i] = Math.round(s.target * eased * 100) / 100;
            return next;
          });
          if (t >= 1) clearInterval(iv);
        }, 30);
        intervals.current.push(iv);
      });
    });
  }, [later]);

  const goPhase = useCallback(
    (p: Phase) => {
      clearAll();
      setAuto(false);
      if (p === "recording") {
        setEventCount(0);
        setCodeCount(0);
        setScores([0, 0, 0, 0]);
        runRecording();
      } else if (p === "generating") {
        setEventCount(EVENT_LINES.length);
        setCodeCount(0);
        setScores([0, 0, 0, 0]);
        runGenerating();
      } else if (p === "broken") {
        setEventCount(EVENT_LINES.length);
        setCodeCount(CODE_LINES.length);
        setPhase("broken");
      } else if (p === "running") {
        setEventCount(EVENT_LINES.length);
        setCodeCount(CODE_LINES.length);
        runRunning();
      }
    },
    [clearAll, runRecording, runGenerating, runRunning]
  );

  const runFullLoop = useCallback(() => {
    reset();
    setAuto(true);
    runRecording();
    later(420 * EVENT_LINES.length + 900, runGenerating);
    later(420 * EVENT_LINES.length + 900 + 300 * CODE_LINES.length + 900, () => setPhase("broken"));
    later(420 * EVENT_LINES.length + 900 + 300 * CODE_LINES.length + 900 + 1600, runRunning);
    later(420 * EVENT_LINES.length + 900 + 300 * CODE_LINES.length + 900 + 1600 + 2600, () => {
      setScores(SCORES.map((s) => s.target));
      setPhase("passed");
      setAuto(false);
    });
  }, [reset, runRecording, runGenerating, runRunning, later]);

  const activeIndex = PHASE_ORDER.indexOf(phase);
  const broken = phase === "broken" || phase === "running" || phase === "passed";
  const passed = phase === "passed";

  return (
    <section id="demo" className="scroll-mt-20 bg-cream/50">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">02 — The instrument</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-medium leading-[1.05] md:text-5xl">
            Break it. <em className="font-light">Watch it heal.</em>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-ink2">
            A concept simulation of the full loop — record a checkout pass, generate the spec,
            rename the button mid-flight, and watch the healing engine carry the run anyway.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-xl bg-panel text-[#EDE9DC] shadow-[0_30px_80px_-30px_rgba(22,20,14,0.45)]">
            {/* instrument header */}
            <div className="flex items-center justify-between border-b border-paneline px-5 py-3.5 md:px-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8f8a76]">
                Mimic instrument — concept simulation
              </p>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8f8a76]">
                <span className={`rec-dot h-2 w-2 rounded-full ${phase === "idle" ? "bg-[#5a5646]" : "bg-accent"}`} />
                {phase === "idle" ? "standby" : "rec"}
              </span>
            </div>

            <div className="grid md:grid-cols-[240px_1fr]">
              {/* controls */}
              <div className="border-b border-paneline p-5 md:border-b-0 md:border-r md:p-6">
                <div className="flex flex-col gap-2">
                  {(Object.keys(STEP_LABELS) as Array<keyof typeof STEP_LABELS>).map((key) => {
                    const idx = PHASE_ORDER.indexOf(key);
                    const done = activeIndex > idx || passed;
                    const active = phase === key;
                    return (
                      <button
                        key={key}
                        onClick={() => goPhase(key)}
                        className={`flex items-center justify-between px-4 py-3 text-left font-mono text-[12px] transition-colors ${
                          active
                            ? "bg-accent text-paper"
                            : done
                              ? "bg-panel2 text-[#cfc9b4] hover:bg-[#26231a]"
                              : "bg-panel2/60 text-[#8f8a76] hover:bg-[#26231a] hover:text-[#cfc9b4]"
                        }`}
                      >
                        {STEP_LABELS[key]}
                        <span aria-hidden="true">{done ? "✓" : active ? "●" : "○"}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={runFullLoop}
                    disabled={auto}
                    className="flex-1 bg-[#EDE9DC] px-4 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-accent hover:text-paper disabled:opacity-40"
                  >
                    {auto ? "Running…" : "Full loop"}
                  </button>
                  <button
                    onClick={reset}
                    className="border border-paneline px-4 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-[#8f8a76] transition-colors hover:border-[#8f8a76] hover:text-[#EDE9DC]"
                  >
                    Reset
                  </button>
                </div>
                <p className="mt-4 font-mono text-[10px] leading-relaxed text-[#6b6656]">
                  Illustrative values. Not a live model run.
                </p>
              </div>

              {/* panes */}
              <div className="p-5 md:p-6">
                <div aria-live="polite" className="min-h-[300px] font-mono text-[12.5px] leading-[1.9]">
                  {phase === "idle" && (
                    <p className="text-[#6b6656]">
                      $ mimic awaiting input<span className="caret">_</span>
                    </p>
                  )}
                  {phase === "recording" && <EventLog count={eventCount} />}
                  {(phase === "generating" || phase === "broken" || phase === "running" || phase === "passed") && (
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#6b6656]">
                        {phase === "generating" ? "muse spark — authoring spec" : "checkout.spec.ts"}
                      </p>
                      <pre className="whitespace-pre-wrap text-[#cfc9b4]">
                        {CODE_LINES.slice(0, codeCount).join("\n")}
                        {phase === "generating" && <span className="caret text-accent">▍</span>}
                      </pre>
                      {(phase === "broken" || phase === "running" || phase === "passed") && (
                        <div className="mt-4 border-t border-paneline pt-3 text-[12px]">
                          <p className="text-[#e0655a]">- name: "Checkout"</p>
                          <p className="text-[#7fb069]">+ name: "Pay now →"</p>
                        </div>
                      )}
                      {(phase === "running" || phase === "passed") && (
                        <div className="mt-4 border-t border-paneline pt-4">
                          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#6b6656]">
                            healing — 4 signals
                          </p>
                          {SCORES.map((s, i) => (
                            <div key={s.signal} className="flex items-center gap-3 py-1">
                              <span className="w-40 shrink-0 truncate text-[#a09a86]">{s.signal}</span>
                              <div className="h-1.5 flex-1 bg-paneline">
                                <div
                                  className={`h-full transition-[width] ${s.accent ? "bg-accent" : "bg-[#7a7460]"}`}
                                  style={{ width: `${(scores[i] / 1) * 100}%` }}
                                />
                              </div>
                              <span className="w-12 text-right tabular-nums text-[#cfc9b4]">
                                {scores[i].toFixed(2)}
                              </span>
                              <span
                                className={`w-20 text-right text-[10px] uppercase tracking-[0.14em] ${
                                  s.accent ? "text-accent" : "text-[#6b6656]"
                                }`}
                              >
                                {s.verdict}
                              </span>
                            </div>
                          ))}
                          <p className="mt-2 text-[11px] text-[#6b6656]">{SCORES[3].detail} · combined 0.86 ≥ 0.80</p>
                        </div>
                      )}
                      {passed && (
                        <p className="mt-4 inline-block bg-moss/20 px-3 py-2 text-[12px] text-[#8fd6ab]">
                          ✓ 1 passed — healed via visual mask in 412ms
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* fake browser */}
                <div className="mt-5 overflow-hidden rounded-lg border border-paneline">
                  <div className="flex items-center gap-1.5 bg-panel2 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3a372a]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3a372a]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3a372a]" />
                    <span className="ml-3 font-mono text-[10px] text-[#6b6656]">shop.example/checkout</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#191712] px-5 py-5">
                    <div>
                      <p className="font-mono text-[11px] text-[#a09a86]">Order #8F31K — $184.00</p>
                      <p className="mt-1 font-mono text-[10px] text-[#6b6656]">one step left</p>
                    </div>
                    <span
                      className={`px-5 py-2.5 font-mono text-[12px] transition-all ${
                        passed
                          ? "bg-moss text-paper ring-2 ring-[#8fd6ab]/60"
                          : "bg-accent text-paper"
                      }`}
                    >
                      {broken ? "Pay now →" : "Checkout"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EventLog({ count }: { count: number }) {
  return (
    <div>
      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#6b6656]">recording — shop.example</p>
      {EVENT_LINES.slice(0, count).map((line) => (
        <p key={line} className="text-[#cfc9b4]">
          {line}
        </p>
      ))}
      {count < EVENT_LINES.length && <span className="caret text-accent">▍</span>}
    </div>
  );
}
