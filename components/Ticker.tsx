const ITEMS = [
  "page.getByRole('button', { name: 'Checkout' })",
  "page.getByTestId('pay-cta')",
  "page.getByLabel('Email')",
  "page.locator('form >> nth=2')",
  "maskIoU 0.93 — SAM 3.1",
  "levenshtein('Checkout', 'Pay now →')",
  "lcs(depth 4, subtree 11)",
  "healed ≥ 0.80 — else fail loud",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-mono text-[12px] text-ink2">{item}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="ticker-mask overflow-hidden border-y rule bg-cream/60" aria-hidden="true">
      <div className="ticker-track flex w-max py-3.5">
        <Row />
        <Row />
      </div>
    </div>
  );
}
