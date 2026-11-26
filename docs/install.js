(() => {
  const root = document.querySelector("[data-docs-install]");
  if (!root) return;

  const targetSwitch = root.querySelector("[data-install-target]");
  const meta = root.querySelector("[data-install-meta]");
  const panels = [...root.querySelectorAll("[data-install-panel]")];
  const cargoCode = root.querySelector("[data-install-cargo]");
  const htmlCode = root.querySelector("[data-install-html]");

  const WIDGETS = {
    button: { css: "src/components/button/button.css", js: "src/components/button/button.js" },
    input: { css: "src/components/input/input.css", js: "src/components/input/input.js" },
    popover: { css: "src/components/popover/popover.css", js: null },
    switch: { css: "src/components/switch/switch.css", js: "src/components/switch/switch.js" },
    text: { css: "src/components/text/text.css", js: "src/components/text/text.js" },
  };

  function span(cls, text) {
    return `<span class="tk-${cls}">${text}</span>`;
  }

  function renderCargo() {
    if (!cargoCode) return;
    const picked = [...root.querySelectorAll("[data-install-feature]")]
      .filter((el) => el.getAttribute("aria-checked") === "true")
      .map((el) => el.dataset.installFeature);
    const lines = [
      `[${span("type", "dependencies")}]`,
      `${span("property", "ala")} = { ${span("property", "git")} = ${span("string", '"https://github.com/autistic-computer/ala"')} }`,
      `${span("property", "ala-platform")} = { ${span("property", "git")} = ${span("string", '"https://github.com/autistic-computer/ala"')} }`,
    ];
    if (picked.length) {
      lines.push(
        "",
        `[${span("type", "dependencies")}.${span("property", "penna")}]`,
        `${span("property", "git")} = ${span("string", '"https://github.com/autistic-computer/penna"')}`,
        `${span("property", "features")} = [${picked.map((name) => span("string", `"${name}"`)).join(", ")}]`,
      );
    } else {
      lines.push(
        `${span("property", "penna")} = { ${span("property", "git")} = ${span("string", '"https://github.com/autistic-computer/penna"')} }`,
      );
    }
    cargoCode.innerHTML = lines.join("\n");
  }

  function linkLine(href) {
    return `&lt;${span("tag", "link")} ${span("attribute", "rel")}=${span("string", '"stylesheet"')} ${span("attribute", "href")}=${span("string", `"${href}"`)} /&gt;`;
  }

  function scriptLine(src, extra = "") {
    return `&lt;${span("tag", "script")} ${span("attribute", "src")}=${span("string", `"${src}"`)}${extra}&gt;&lt;/${span("tag", "script")}&gt;`;
  }

  function renderHtml() {
    if (!htmlCode) return;
    const picked = [...root.querySelectorAll("[data-install-widget]")]
      .filter((el) => el.getAttribute("aria-checked") === "true")
      .map((el) => el.dataset.installWidget);
    const hideSwitcher = root.querySelector("[data-install-switcher]")?.getAttribute("aria-checked") === "true";
    const lines = [linkLine("web/penna.css")];
    for (const name of picked) {
      if (WIDGETS[name]?.css) lines.push(linkLine(WIDGETS[name].css));
    }
    if (hideSwitcher) {
      lines.push(
        `&lt;${span("tag", "script")} ${span("attribute", "src")}=${span("string", '"web/kit.js"')}\n  ${span("attribute", "data-tokens")}=${span("string", '"web/tokens/"')} ${span("attribute", "data-switcher")}=${span("string", '"off"')}&gt;&lt;/${span("tag", "script")}&gt;`,
      );
    } else {
      lines.push(
        scriptLine("web/kit.js", ` ${span("attribute", "data-tokens")}=${span("string", '"web/tokens/"')}`),
      );
    }
    for (const name of picked) {
      if (WIDGETS[name]?.js) lines.push(scriptLine(WIDGETS[name].js, ` ${span("attribute", "defer")}`));
    }
    htmlCode.innerHTML = lines.join("\n");
  }

  function showTarget(index) {
    const mode = index === 1 ? "html" : "rust";
    panels.forEach((panel) => {
      const open = panel.dataset.installPanel === mode;
      panel.hidden = !open;
      if (open) {
        requestAnimationFrame(() => window.pennaKit?.roundAll?.(panel));
      }
    });
    if (meta) {
      meta.textContent = mode === "html" ? "No build step" : "Rust 1.99 · Edition 2024";
    }
  }

  targetSwitch?.addEventListener("change", (event) => {
    showTarget(event.detail.index);
  });

  root.querySelectorAll("[data-install-feature]").forEach((toggle) => {
    toggle.addEventListener("change", renderCargo);
  });

  root.querySelectorAll("[data-install-widget], [data-install-switcher]").forEach((toggle) => {
    toggle.addEventListener("change", renderHtml);
  });

  renderCargo();
  renderHtml();

  const win = document.querySelector("[data-install-win]");
  if (!win) return;

  const countEl = win.querySelector("[data-hello-count]");
  const incBtn = win.querySelector("[data-hello-inc]");
  const resetBtn = win.querySelector("[data-hello-reset]");
  let count = 0;

  function syncCount() {
    if (countEl) {
      countEl.textContent = count === 1 ? "Clicked 1 time" : `Clicked ${count} times`;
    }
    if (resetBtn) {
      resetBtn.disabled = count === 0;
    }
  }

  incBtn?.addEventListener("click", () => {
    count += 1;
    syncCount();
  });

  resetBtn?.addEventListener("click", () => {
    count = 0;
    syncCount();
  });

  win.addEventListener("pointermove", (event) => {
    const rect = win.getBoundingClientRect();
    win.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    win.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });

  syncCount();
})();
