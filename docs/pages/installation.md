# Installation

penna builds for native `ala` windows in Rust and for the web in plain HTML and CSS. Pick a target below to configure the minimal setup.

## Setup

```figure uses=notice,settings,menu,chip
<div class="docs-install" data-docs-install>
  <div class="docs-install-bar">
    <div class="penna-segmented" data-penna="field" data-value="0" data-install-target role="radiogroup" aria-label="Target">
      <div class="penna-segments" data-penna="button.quiet" data-state="current">
        <span class="penna-segment-pill"></span>
        <span class="penna-segment" role="radio" aria-checked="true"><span class="penna-label" data-penna-text>Rust (ala)</span></span>
        <span class="penna-segment" role="radio" aria-checked="false"><span class="penna-label" data-penna-text>HTML / CSS</span></span>
      </div>
    </div>
    <span class="docs-install-meta" data-install-meta>Rust 1.99 · Edition 2024</span>
  </div>

  <div class="docs-install-panel" data-install-panel="rust">
    <div class="docs-install-flow">
      <div class="docs-install-stage" data-penna="card" data-ground>
        <div class="docs-install-stage-top">
          <span class="docs-install-stage-num">01</span>
          <i class="docs-install-stage-icon" data-icon="palette" aria-hidden="true"></i>
        </div>
        <div class="docs-install-stage-name">penna::Assets</div>
        <p class="docs-install-stage-copy">Registers built-in icons on the application.</p>
      </div>
      <div class="docs-install-stage" data-penna="card" data-ground>
        <div class="docs-install-stage-top">
          <span class="docs-install-stage-num">02</span>
          <i class="docs-install-stage-icon" data-icon="sliders" aria-hidden="true"></i>
        </div>
        <div class="docs-install-stage-name">penna::init(cx)</div>
        <p class="docs-install-stage-copy">Loads tokens, keymaps and the platform look.</p>
      </div>
      <div class="docs-install-stage" data-penna="card" data-ground>
        <div class="docs-install-stage-top">
          <span class="docs-install-stage-num">03</span>
          <i class="docs-install-stage-icon" data-icon="app-window" aria-hidden="true"></i>
        </div>
        <div class="docs-install-stage-name">Root::new</div>
        <p class="docs-install-stage-copy">Hosts popovers, dialogs and base 13/18 type.</p>
      </div>
    </div>

    <div class="docs-install-card" data-penna="settings.card" data-ground>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title"><code>tree-sitter</code></span>
          <span class="docs-install-row-desc">Syntax highlighting for markdown and code blocks</span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="false" aria-label="tree-sitter feature" data-install-feature="tree-sitter"></button>
      </div>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title"><code>editor</code></span>
          <span class="docs-install-row-desc">Multi-line code editor block with gutters and selection</span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="false" aria-label="editor feature" data-install-feature="editor"></button>
      </div>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title"><code>tray</code></span>
          <span class="docs-install-row-desc">Native menu bar and system tray host</span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="false" aria-label="tray feature" data-install-feature="tray"></button>
      </div>
    </div>

    <div class="penna-md">
      <div class="md-code">
        <pre data-penna="card.code" data-ground data-actions><code data-install-cargo></code><div class="md-actions"><span class="md-lang" data-penna-text>Cargo.toml</span><div><button class="penna-button" data-penna="button.quiet" data-shape="icon" data-size="small" aria-label="Copy" data-tooltip="Copy" data-copy><i data-icon="copy"></i></button></div></div></pre>
      </div>
      <div class="md-code">
        <pre data-penna="card.code" data-ground data-actions><code><span class="tk-keyword">fn</span> <span class="tk-function">main</span>() {
    ala_platform::<span class="tk-function">application</span>()
        .<span class="tk-function">with_assets</span>(penna::<span class="tk-type">Assets</span>)
        .<span class="tk-function">run</span>(|cx| {
            penna::<span class="tk-function">init</span>(cx);
            cx.<span class="tk-function">open_window</span>(<span class="tk-type">WindowOptions</span>::<span class="tk-function">default</span>(), |window, cx| {
                <span class="tk-keyword">let</span> view = cx.<span class="tk-function">new</span>(|_| <span class="tk-type">AppView</span>);
                cx.<span class="tk-function">new</span>(|cx| penna::<span class="tk-type">Root</span>::<span class="tk-function">new</span>(view, window, cx))
            }).<span class="tk-function">ok</span>();
        });
}</code><div class="md-actions"><span class="md-lang" data-penna-text>src/main.rs</span><div><button class="penna-button" data-penna="button.quiet" data-shape="icon" data-size="small" aria-label="Copy" data-tooltip="Copy" data-copy><i data-icon="copy"></i></button></div></div></pre>
      </div>
    </div>
  </div>

  <div class="docs-install-panel" data-install-panel="html" hidden>
    <div class="docs-install-flow">
      <div class="docs-install-stage" data-penna="card" data-ground>
        <div class="docs-install-stage-top">
          <span class="docs-install-stage-num">01</span>
          <i class="docs-install-stage-icon" data-icon="terminal" aria-hidden="true"></i>
        </div>
        <div class="docs-install-stage-name">theme_css</div>
        <p class="docs-install-stage-copy">Generates light, dark and icon stylesheets into web/tokens.</p>
      </div>
      <div class="docs-install-stage" data-penna="card" data-ground>
        <div class="docs-install-stage-top">
          <span class="docs-install-stage-num">02</span>
          <i class="docs-install-stage-icon" data-icon="layers" aria-hidden="true"></i>
        </div>
        <div class="docs-install-stage-name">penna.css + kit.js</div>
        <p class="docs-install-stage-copy">Wires surfaces, superellipse corners, focus rings and glass.</p>
      </div>
      <div class="docs-install-stage" data-penna="card" data-ground>
        <div class="docs-install-stage-top">
          <span class="docs-install-stage-num">03</span>
          <i class="docs-install-stage-icon" data-icon="file" aria-hidden="true"></i>
        </div>
        <div class="docs-install-stage-name">Widget files</div>
        <p class="docs-install-stage-copy">Import only the CSS and JS for components you render.</p>
      </div>
    </div>

    <div class="docs-install-card" data-penna="settings.card" data-ground>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title"><code>button</code></span>
          <span class="docs-install-row-desc">Buttons, icon buttons and loading states</span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="true" aria-label="Include button" data-install-widget="button"></button>
      </div>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title"><code>input</code></span>
          <span class="docs-install-row-desc">Single and multi-line text fields</span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="false" aria-label="Include input" data-install-widget="input"></button>
      </div>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title"><code>popover</code></span>
          <span class="docs-install-row-desc">Floating panels and liquid glass surfaces</span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="false" aria-label="Include popover" data-install-widget="popover"></button>
      </div>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title"><code>switch</code></span>
          <span class="docs-install-row-desc">Boolean toggle switches</span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="false" aria-label="Include switch" data-install-widget="switch"></button>
      </div>
      <div class="docs-install-row">
        <div class="docs-install-row-copy">
          <span class="docs-install-row-title">Hide built-in debug switcher</span>
          <span class="docs-install-row-desc">Adds <code>data-switcher="off"</code> to <code>kit.js</code></span>
        </div>
        <button class="penna-toggle" role="switch" aria-checked="true" aria-label="Hide debug switcher" data-install-switcher></button>
      </div>
    </div>

    <div class="penna-md">
      <div class="md-code">
        <pre data-penna="card.code" data-ground data-actions><code>cargo run --example theme_css</code><div class="md-actions"><span class="md-lang" data-penna-text>bash</span><div><button class="penna-button" data-penna="button.quiet" data-shape="icon" data-size="small" aria-label="Copy" data-tooltip="Copy" data-copy><i data-icon="copy"></i></button></div></div></pre>
      </div>
      <div class="md-code">
        <pre data-penna="card.code" data-ground data-actions><code data-install-html></code><div class="md-actions"><span class="md-lang" data-penna-text>index.html</span><div><button class="penna-button" data-penna="button.quiet" data-shape="icon" data-size="small" aria-label="Copy" data-tooltip="Copy" data-copy><i data-icon="copy"></i></button></div></div></pre>
      </div>
    </div>
  </div>
</div>
```

## Hello, world

A minimal counter built with `TitleBar`, `Label` and `Button` inside `Root`.

```figure uses=label,title_bar
<div class="penna-window docs-install-win" data-install-win>
  <div class="docs-install-win-spec" aria-hidden="true"></div>
  <header class="docs-install-titlebar" data-penna="titlebar" data-ground>
    <div class="docs-install-lights" aria-hidden="true"><i></i><i></i><i></i></div>
    <span class="penna-type docs-install-win-title" data-type="small" data-muted>hello</span>
  </header>
  <div class="docs-install-win-pane" data-penna="pane" data-ground>
    <span class="penna-type" data-type="title" data-penna-text>Hello, penna</span>
    <span class="penna-type" data-type="body" data-muted data-penna-text data-hello-count>Clicked 0 times</span>
    <div class="docs-install-hello-actions">
      <button class="penna-button" data-penna="button" data-tone="primary" data-prominent type="button" data-hello-inc><span class="penna-label" data-penna-text>Count</span></button>
      <button class="penna-button" data-penna="button.quiet" type="button" data-hello-reset disabled><span class="penna-label" data-penna-text>Reset</span></button>
    </div>
  </div>
</div>
```

```rust
use ala::{
    Context, IntoElement, ParentElement as _, Render,
    Styled as _, Window, WindowOptions, div,
};
use penna::components::button::{Button, ButtonVariants as _};
use penna::{
    Disableable as _, Label, Root, Space, TITLE_BAR_HEIGHT,
    TextStyle, TitleBar, inline, stack,
};

struct Hello {
    count: usize,
}

impl Render for Hello {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let subtitle = match self.count {
            1 => "Clicked 1 time".to_string(),
            n => format!("Clicked {n} times"),
        };

        div()
            .size_full()
            .flex()
            .flex_col()
            .child(TitleBar::new().child(Label::new(TextStyle::Small, "hello").muted()))
            .child(
                stack(Space::GAP_RELATED)
                    .flex_1()
                    .items_center()
                    .justify_center()
                    .child(Label::new(TextStyle::Title, "Hello, penna"))
                    .child(Label::new(TextStyle::Body, subtitle).muted())
                    .child(
                        inline(Space::GAP_RELATED)
                            .pt(Space::S8)
                            .child(
                                Button::new("inc")
                                    .label("Count")
                                    .primary()
                                    .on_click(cx.listener(|this, _, _, cx| {
                                        this.count += 1;
                                        cx.notify();
                                    })),
                            )
                            .child(
                                Button::new("reset")
                                    .label("Reset")
                                    .ghost()
                                    .disabled(self.count == 0)
                                    .on_click(cx.listener(|this, _, _, cx| {
                                        this.count = 0;
                                        cx.notify();
                                    })),
                            ),
                    ),
            )
    }
}

fn main() {
    ala_platform::application()
        .with_assets(penna::Assets)
        .run(|cx| {
            penna::init(cx);
            let options = WindowOptions {
                titlebar: Some(TitleBar::title_bar_options(TITLE_BAR_HEIGHT)),
                ..WindowOptions::default()
            };
            cx.open_window(options, |window, cx| {
                let view = cx.new(|_| Hello { count: 0 });
                cx.new(|cx| Root::new(view, window, cx))
            })
            .ok();
        });
}
```

```figure uses=notice
<div class="penna-notice" data-penna="notice" data-tone="neutral">
  <div class="penna-notice-tone" data-penna="chip">
    <span class="penna-notice-lead"><i data-icon="info"></i></span>
    <div class="penna-notice-body">
      <span class="penna-text penna-notice-title" data-penna-text>Tokens stay in sync from Rust</span>
      <span class="penna-notice-detail">HTML builds read CSS generated from the Rust token engine. Re-run theme_css after updating penna so web surfaces match native windows.</span>
    </div>
  </div>
</div>
```
