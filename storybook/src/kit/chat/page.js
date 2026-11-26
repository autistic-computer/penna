(() => {
  const LABELS = ["Thinking", "Reading agent/view.rs", "Searching for popover"];
  const EVERY = 2400;

  function resolve(label, text) {
    const shown = [...`${text}…`];
    label.style.removeProperty("width");
    label.style.setProperty("--penna-chat-stagger", `${Math.min(18, 400 / shown.length)}ms`);
    label.replaceChildren(
      ...shown.map((character, index) => {
        const glyph = document.createElement("i");
        glyph.style.setProperty("--i", index);
        glyph.textContent = character;
        return glyph;
      }),
    );
  }

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const frozen = new URLSearchParams(location.search).get("motion") === "0";
  const still = () => frozen || reduced?.matches;

  for (const label of document.querySelectorAll('[data-row="activity-live"] .penna-chat-resolve')) {
    let at = 0;
    if (still()) {
      label.textContent = `${LABELS[at]}…`;
      continue;
    }
    resolve(label, LABELS[at]);
    setInterval(() => {
      if (still()) return;
      at = (at + 1) % LABELS.length;
      resolve(label, LABELS[at]);
    }, EVERY);
  }
})();
