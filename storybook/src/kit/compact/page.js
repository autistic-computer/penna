(() => {
  const INSET = 4;
  const TILE = 48;
  const GAP = 4;
  const TEXT_IN = 44;
  const FACE_TEXT_IN = 50;
  const TEXT_END = 16;
  const NAME_IN = 56;
  const NAME_END = 12;
  const SINGLE_IN = 58;
  const CAPSULE_MIN = 88;
  const CAPSULE_MAX = 180;
  const TEXT_SLACK = 2;
  const TEXT_FADE = 0.45;
  const STRIP_WIDTH = 350;

  const MACHINES = [
    { icon: "laptop", name: "zzios-zebrilus", line: "phone" },
    { icon: "cpu", name: "xps", line: "zz" },
    { icon: "hard-drive", name: "win-desktop", line: "games" },
    { icon: "cpu", name: "alienware", line: "nidus" },
    { icon: "laptop", name: "macbook", line: "zebrilus" },
    { icon: "server", name: "nas", line: "Not connected" },
  ];

  const PANES = [
    { icon: "chat", name: "Pill strip", word: "", line: "Running cargo test", tone: "" },
    { icon: "terminal", name: "bash", word: "", line: "zebrilus · main", tone: "" },
    { icon: "file", name: "tile.rs", word: "", line: "zebrilus · main", tone: "" },
    { icon: "chat", name: "Review", word: "Needs approval", line: "", tone: "warning" },
    { icon: "globe", name: "localhost:8090", word: "", line: "127.0.0.1", tone: "" },
  ];

  const CASES = [
    { label: "one machine", items: [MACHINES[0]], position: 0 },
    { label: "two short names", items: [MACHINES[1], MACHINES[4]], position: 0 },
    { label: "three", items: [MACHINES[0], MACHINES[1], MACHINES[2]], position: 1 },
    { label: "six, scrolled", items: MACHINES, position: 3 },
    { label: "mid-swipe", items: MACHINES, position: 2.45 },
    { label: "not connected", items: [MACHINES[1], MACHINES[5]], position: 1 },
    { label: "panes", items: PANES, face: true, position: 1 },
    { label: "a pane waiting", items: PANES, face: true, position: 3 },
  ];

  const measureCanvas = document.createElement("canvas").getContext("2d");

  function textWidth(text, size, weight) {
    const family = getComputedStyle(document.documentElement).getPropertyValue("--penna-font").trim() || "sans-serif";
    measureCanvas.font = `${weight} ${size}px ${family}`;
    return measureCanvas.measureText(text).width;
  }

  function secondLine(item) {
    return item.word ? `${item.word}${item.line}` : item.line;
  }

  function fit(item, face) {
    const style = getComputedStyle(document.documentElement);
    const nameSize = parseFloat(style.getPropertyValue("--penna-text-touch-small-size")) || 15;
    const lineSize = parseFloat(style.getPropertyValue("--penna-text-small-size")) || 12;
    const name = textWidth(item.name, nameSize, 500) + TEXT_SLACK;
    const line = textWidth(secondLine(item), lineSize, 400) + TEXT_SLACK;
    const textIn = face ? FACE_TEXT_IN : TEXT_IN;
    return {
      capsule: Math.min(CAPSULE_MAX, Math.max(CAPSULE_MIN, textIn + Math.max(name, line) + TEXT_END)),
      named: NAME_IN + name + NAME_END,
    };
  }

  function place(inner, hug, small, active) {
    const count = hug.length;
    const unit = TILE + GAP;
    const half = TILE / 2 + GAP;
    let others = 0;
    for (let i = 0; i < count; i++) if (i !== active) others += small[i] + GAP;
    if (hug[active] + others <= inner) {
      const width = small.slice();
      width[active] = inner - others;
      let at = 0;
      const x = width.map((w) => {
        const start = at;
        at += w + GAP;
        return start;
      });
      return { x, width, fadeStart: false, fadeEnd: false };
    }
    const before = active;
    const after = count - 1 - active;
    const need = (left, right) =>
      hug[active] + unit * (left + right) + (before > left ? half : 0) + (after > right ? half : 0);
    let left = 0;
    let right = 0;
    for (;;) {
      const grewRight = after > right && need(left, right + 1) <= inner;
      if (grewRight) right += 1;
      const grewLeft = before > left && need(left + 1, right) <= inner;
      if (grewLeft) left += 1;
      if (!grewRight && !grewLeft) break;
    }
    const lead = before > left ? half : 0;
    const trail = after > right ? half : 0;
    const capsule = inner - lead - trail - unit * (left + right);
    const start = lead + unit * left;
    const end = start + capsule;
    const x = Array.from({ length: count }, (_, index) =>
      index < active ? start - unit * (active - index) : index === active ? start : end + GAP + unit * (index - active - 1),
    );
    const width = Array(count).fill(TILE);
    width[active] = capsule;
    return { x, width, fadeStart: before > left, fadeEnd: after > right };
  }

  function layoutStrip(inner, hug, small, position) {
    const count = hug.length;
    const clamped = Math.max(0, Math.min(count - 1, position));
    const from = Math.floor(clamped);
    const to = Math.ceil(clamped);
    const at = clamped - from;
    const a = place(inner, hug, small, from);
    const b = place(inner, hug, small, to);
    const mix = (u, v) => u + (v - u) * at;
    return {
      slots: Array.from({ length: count }, (_, index) => ({
        x: mix(a.x[index], b.x[index]),
        width: mix(a.width[index], b.width[index]),
        on: Math.max(0, 1 - Math.abs(index - clamped)),
      })),
      fadeStart: mix(a.fadeStart ? 1 : 0, b.fadeStart ? 1 : 0),
      fadeEnd: mix(a.fadeEnd ? 1 : 0, b.fadeEnd ? 1 : 0),
    };
  }

  function makeMark(icon, face, active) {
    const el = document.createElement("span");
    el.className = face ? "strip-face-box" : "strip-glyph-box";
    if (!face && !active) el.dataset.muted = "";
    const i = document.createElement("i");
    i.dataset.icon = icon;
    el.append(i);
    return el;
  }

  function makeLines(item, left, width, opacity) {
    const box = document.createElement("span");
    box.className = "strip-lines";
    box.style.left = `${left}px`;
    box.style.width = `${Math.max(0, width)}px`;
    if (opacity !== undefined) box.style.opacity = `${opacity}`;
    const name = document.createElement("span");
    name.className = "strip-name";
    name.textContent = item.name;
    const sub = document.createElement("span");
    sub.className = "strip-sub";
    if (item.tone && item.word) {
      const word = document.createElement("span");
      word.className = "strip-word";
      word.dataset.tone = item.tone;
      word.textContent = item.word;
      sub.append(word, document.createTextNode(item.line));
    } else {
      sub.textContent = secondLine(item);
    }
    box.append(name, sub);
    return box;
  }

  function renderStrips() {
    const host = document.querySelector('[data-section="machine-strip"] .story-states');
    if (!host) return;
    host.replaceChildren();
    const inner = STRIP_WIDTH - 2 * INSET;
    for (const entry of CASES) {
      const state = document.createElement("div");
      state.className = "story-state";
      const label = document.createElement("div");
      label.className = "story-label";
      label.textContent = entry.label;
      const phone = document.createElement("div");
      phone.className = "penna-phone";
      const bar = document.createElement("div");
      bar.className = "penna-compact-bar";
      const pill = document.createElement("div");
      pill.className = "strip-pill";
      pill.dataset.penna = "floating";
      const track = document.createElement("div");
      track.className = "strip-track";
      track.style.width = `${inner}px`;
      if (entry.items.length === 1) {
        const item = entry.items[0];
        const textIn = entry.face ? FACE_TEXT_IN : SINGLE_IN;
        track.append(makeMark(item.icon, entry.face, true), makeLines(item, textIn, inner - textIn - NAME_END));
        pill.append(track);
      } else {
        const fits = entry.items.map((item) => fit(item, entry.face));
        const capsules = fits.map((f) => f.capsule);
        const named = fits.map((f) => f.named);
        const roomy =
          entry.items.length === 2 &&
          capsules[0] + GAP + named[1] <= inner &&
          capsules[1] + GAP + named[0] <= inner;
        const small = roomy ? named : entry.items.map(() => TILE);
        const laid = layoutStrip(inner, capsules, small, entry.position);
        entry.items.forEach((item, index) => {
          const slot = laid.slots[index];
          const textAlpha = Math.max(0, Math.min(1, (slot.on - (1 - TEXT_FADE)) / TEXT_FADE));
          const nameAlpha = Math.max(0, Math.min(1, (TEXT_FADE - slot.on) / TEXT_FADE));
          const fillWidth = TILE + (slot.width - TILE) * slot.on;
          const aria = slot.on > 0.5 ? `${item.name}, ${secondLine(item)}` : item.name;
          const btn = document.createElement("div");
          btn.className = "strip-slot";
          btn.setAttribute("role", "button");
          btn.setAttribute("aria-label", aria);
          btn.dataset.id = `button:${aria}`;
          btn.style.left = `${slot.x}px`;
          btn.style.width = `${slot.width}px`;
          if (slot.on > 0) {
            const cap = document.createElement("span");
            cap.className = "strip-capsule";
            cap.dataset.penna = "phone.pill.icon";
            cap.style.width = `${fillWidth}px`;
            cap.style.opacity = `${slot.on}`;
            btn.append(cap);
          }
          btn.append(makeMark(item.icon, entry.face, slot.on > 0.5));
          const textIn = entry.face ? FACE_TEXT_IN : TEXT_IN;
          if (textAlpha > 0) {
            btn.append(makeLines(item, textIn, Math.max(capsules[index], slot.width) - textIn - TEXT_END, textAlpha));
          }
          if (roomy && nameAlpha > 0) {
            const other = document.createElement("span");
            other.className = "strip-other";
            other.style.opacity = `${nameAlpha}`;
            other.textContent = item.name;
            btn.append(other);
          }
          track.append(btn);
        });
        pill.append(track);
        if (laid.fadeStart > 0 || laid.fadeEnd > 0) {
          const fades = document.createElement("div");
          fades.className = "strip-fades";
          fades.style.width = `${inner + 2}px`;
          if (laid.fadeStart > 0) {
            const edge = document.createElement("span");
            edge.className = "strip-fade";
            edge.dataset.side = "start";
            edge.style.opacity = `${laid.fadeStart}`;
            fades.append(edge);
          }
          if (laid.fadeEnd > 0) {
            const edge = document.createElement("span");
            edge.className = "strip-fade";
            edge.dataset.side = "end";
            edge.style.opacity = `${laid.fadeEnd}`;
            fades.append(edge);
          }
          pill.append(fades);
        }
      }
      bar.append(pill);
      phone.append(bar);
      state.append(label, phone);
      host.append(state);
    }
    window.pennaKit?.roundAll?.();
    window.pennaStory?.fit?.();
  }

  renderStrips();
  document.fonts.ready.then(renderStrips);
  document.addEventListener("load", (event) => event.target.id === "penna-tokens" && renderStrips(), true);
})();
