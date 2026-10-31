# Mimic — landing page

**Show it once. It tests forever.**

Landing page for Mimic, a self-healing regression-testing concept: record one manual
QA pass, get a runnable Playwright test, and let the healing engine re-resolve
locators when the UI changes instead of flaking.

Built with Next.js 16, React 19, TypeScript (strict), and Tailwind CSS v4.
Light editorial design — warm paper, Fraunces serif display, Inter body,
JetBrains Mono instrumentation, signal-orange accent.

Entry for the Meta Global AI Developer Hackathon — Indie developer track.

## Run it

```bash
./run.sh
# → http://localhost:3000
```

Or manually:

```bash
npm install
npm run dev -- --port 3000
```

## Build

```bash
npm run build   # tsc --noEmit + production build
npm run start
```

## What's on the page

- **Hero** — the one-line pitch, input/output/healing meta strip
- **Selector ticker** — scrolling Playwright locators and healing signals
- **01 · The loop** — Record → Generate → Heal → Run
- **02 · The instrument** — interactive concept simulation: record a checkout pass,
  watch the spec generate, break the UI mid-flight, watch four healing signals
  score candidates and carry the run
- **03 · The healing engine** — the four weighted fallback signals
- **04 · Against the classics** — classical recorders vs. Mimic
- **05 · The stack** — Muse Spark, SAM 3.1, the scorer
- **06 · The entry** — hackathon CTA (submissions close Nov 4, 9:00 PM ET)

The demo is a concept simulation with illustrative values, honestly labeled
as such on the page — not a live model run.

## Achievements

[![Quickdraw + YOLO run](https://img.shields.io/badge/badges-quickdraw
## Achievements

[![Quickdraw + YOLO run](https://img.shields.io/badge/badges-quickdraw%20%2B%20yolo-blue)](https://github.com/azdemir/mimic-landing/issues/1)
