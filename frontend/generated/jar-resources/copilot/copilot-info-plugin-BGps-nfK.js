import { a as D, I as $, e as p, x as i, D as k, T as u, M as P, b as E, t as C, J, V as S, K as H } from "./copilot-CWBYQNkW.js";
import { r as I } from "./state-Diewpmn9.js";
import { B as R } from "./base-panel-zZqsH7AX.js";
import { showNotification as V } from "./copilot-notification-DKtUODH9.js";
import { i as _ } from "./icons-CyQAHW4y.js";
const O = "copilot-info-panel{--dev-tools-red-color: red;--dev-tools-grey-color: gray;--dev-tools-green-color: green;position:relative}copilot-info-panel div.info-tray{display:flex;flex-direction:column;gap:10px}copilot-info-panel dl{display:grid;grid-template-columns:auto auto;gap:0;margin:var(--space-100) var(--space-50);font:var(--font-xsmall)}copilot-info-panel dl>dt,copilot-info-panel dl>dd{padding:3px 10px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}copilot-info-panel dd.live-reload-status>span{overflow:hidden;text-overflow:ellipsis;display:block;color:var(--status-color)}copilot-info-panel dd span.hidden{display:none}copilot-info-panel dd span.true{color:var(--dev-tools-green-color);font-size:large}copilot-info-panel dd span.false{color:var(--dev-tools-red-color);font-size:large}copilot-info-panel li{list-style:none}";
var U = function() {
  var e = document.getSelection();
  if (!e.rangeCount)
    return function() {
    };
  for (var t = document.activeElement, a = [], s = 0; s < e.rangeCount; s++)
    a.push(e.getRangeAt(s));
  switch (t.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      t.blur();
      break;
    default:
      t = null;
      break;
  }
  return e.removeAllRanges(), function() {
    e.type === "Caret" && e.removeAllRanges(), e.rangeCount || a.forEach(function(r) {
      e.addRange(r);
    }), t && t.focus();
  };
}, j = U, v = {
  "text/plain": "Text",
  "text/html": "Url",
  default: "Text"
}, T = "Copy to clipboard: #{key}, Enter";
function F(e) {
  var t = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return e.replace(/#{\s*key\s*}/g, t);
}
function B(e, t) {
  var a, s, r, o, l, n, m = !1;
  t || (t = {}), a = t.debug || !1;
  try {
    r = j(), o = document.createRange(), l = document.getSelection(), n = document.createElement("span"), n.textContent = e, n.ariaHidden = "true", n.style.all = "unset", n.style.position = "fixed", n.style.top = 0, n.style.clip = "rect(0, 0, 0, 0)", n.style.whiteSpace = "pre", n.style.webkitUserSelect = "text", n.style.MozUserSelect = "text", n.style.msUserSelect = "text", n.style.userSelect = "text", n.addEventListener("copy", function(d) {
      if (d.stopPropagation(), t.format)
        if (d.preventDefault(), typeof d.clipboardData > "u") {
          a && console.warn("unable to use e.clipboardData"), a && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
          var h = v[t.format] || v.default;
          window.clipboardData.setData(h, e);
        } else
          d.clipboardData.clearData(), d.clipboardData.setData(t.format, e);
      t.onCopy && (d.preventDefault(), t.onCopy(d.clipboardData));
    }), document.body.appendChild(n), o.selectNodeContents(n), l.addRange(o);
    var A = document.execCommand("copy");
    if (!A)
      throw new Error("copy command was unsuccessful");
    m = !0;
  } catch (d) {
    a && console.error("unable to copy using execCommand: ", d), a && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), m = !0;
    } catch (h) {
      a && console.error("unable to copy using clipboardData: ", h), a && console.error("falling back to prompt"), s = F("message" in t ? t.message : T), window.prompt(s, e);
    }
  } finally {
    l && (typeof l.removeRange == "function" ? l.removeRange(o) : l.removeAllRanges()), n && document.body.removeChild(n), r();
  }
  return m;
}
var N = B;
const L = /* @__PURE__ */ D(N);
var M = Object.defineProperty, W = Object.getOwnPropertyDescriptor, g = (e, t, a, s) => {
  for (var r = s > 1 ? void 0 : s ? W(t, a) : t, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (r = (s ? l(t, a, r) : l(r)) || r);
  return s && r && M(t, a, r), r;
};
const w = i`<a
  href="${J}"
  target="_blank"
  @click="${() => x("idea")}"
  title="Get IntelliJ plugin"
  >Get IntelliJ plugin</a
>`, y = i`<a
  href="${S}"
  target="_blank"
  @click="${() => x("vscode")}"
  title="Get VS Code plugin"
  >Get VS Code plugin</a
>`;
function x(e) {
  return H("get-plugin", e), !1;
}
let f = class extends R {
  constructor() {
    super(...arguments), this.serverInfo = [], this.clientInfo = [{ name: "Browser", version: navigator.userAgent }], this.handleServerInfoEvent = (e) => {
      const t = JSON.parse(e.data.info);
      this.serverInfo = t.versions, this.updateJdkInfo(t.jdkInfo), this.updateIdePluginInfo(), $().then((a) => {
        a && (this.clientInfo.unshift({ name: "Vaadin Employee", version: "true", more: void 0 }), this.requestUpdate("clientInfo"));
      });
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.onCommand("copilot-info", this.handleServerInfoEvent), this.onEventBus("system-info-with-callback", (e) => {
      e.detail.callback(this.getInfoForClipboard(e.detail.notify));
    }), this.reaction(
      () => p.idePluginState,
      () => {
        this.updateIdePluginInfo(), this.requestUpdate("serverInfo");
      }
    );
  }
  updateJdkInfo(e) {
    const t = e.extendedClassDefCapable && e.runningWithExtendClassDef && e.hotswapAgentFound && e.runningWitHotswap && e.hotswapAgentPluginsFound, a = e.jrebel;
    p.jdkInfo = {
      ...e,
      activeHotswap: a ? "jrebel" : t ? "hotswapagent" : void 0
    };
  }
  updateIdePluginInfo() {
    const e = this.getIndex("Copilot IDE Plugin");
    let t = "false", a;
    p.idePluginState?.active ? t = `${p.idePluginState.version}-${p.idePluginState.ide}` : p.idePluginState?.ide === "vscode" ? a = y : p.idePluginState?.ide === "idea" ? a = w : a = i`${w} or ${y}`, this.serverInfo[e].version = t, this.serverInfo[e].more = a;
  }
  getIndex(e) {
    return this.serverInfo.findIndex((t) => t.name === e);
  }
  render() {
    return i`<style>
        ${O}
      </style>
      <div class="info-tray">
        <dl>
          ${[...this.serverInfo, ...this.clientInfo].map(
      (e) => i`
              <dt>${e.name}</dt>
              <dd title="${e.version}" style="${e.name === "Java Hotswap" ? "white-space: normal" : ""}">
                ${this.renderVersion(e)} ${e.more}
              </dd>
            `
    )}
        </dl>
      </div>`;
  }
  renderVersion(e) {
    return e.name === "Java Hotswap" ? this.renderJavaHotswap() : this.renderValue(e.version);
  }
  renderValue(e) {
    return e === "false" ? c(!1) : e === "true" ? c(!0) : e;
  }
  getInfoForClipboard(e) {
    const t = this.renderRoot.querySelectorAll(".info-tray dt"), r = Array.from(t).map((o) => ({
      key: o.textContent.trim(),
      value: o.nextElementSibling.textContent.trim()
    })).filter((o) => o.key !== "Live reload").filter((o) => !o.key.startsWith("Vaadin Emplo")).map((o) => {
      const { key: l } = o;
      let { value: n } = o;
      return l === "Copilot IDE Plugin" && !p.idePluginState?.active ? n = "false" : l === "Java Hotswap" && (n = String(n.includes("JRebel is in use") || n.includes("HotswapAgent is in use"))), `${l}: ${n}`;
    }).join(`
`);
    return e && V({
      type: k.INFORMATION,
      message: "Environment information copied to clipboard",
      dismissId: "versionInfoCopied"
    }), r.trim();
  }
  renderJavaHotswap() {
    const e = p.jdkInfo;
    if (!e)
      return u;
    const t = e.activeHotswap === "jrebel";
    return !e.extendedClassDefCapable && !t ? i`<details>
        <summary>${c(!1)} No Hotswap solution in use</summary>
        <p>To enable hotswap for Java, you can either use HotswapAgent or JRebel.</p>
        <p>HotswapAgent is an open source project that utilizes the JetBrains Runtime (JDK).</p>
        <ul>
          <li>If you are running IntelliJ, edit the launch configuration to use the bundled JDK.</li>
          <li>
            Otherwise, download it from
            <a target="_blank" href="https://github.com/JetBrains/JetBrainsRuntime/releases"
              >the JetBrains release page</a
            >
            to get started.
          </li>
        </ul>
        <p>
          JRebel is a commercial solution available from
          <a target="_blank" href="https://www.jrebel.com/">jrebel.com</a>
        </p>
      </details>` : t ? i`${c(!0)} JRebel is in use` : e.activeHotswap === "hotswapagent" ? i`${c(!0)} HotswapAgent is in use` : i`<details>
      <summary>${c(!1)} HotswapAgent is partially enabled</summary>
      <ul style="margin:0;padding:0">
        <li>${c(e.extendedClassDefCapable)} JDK supports hotswapping</li>
        <li>
          ${c(e.runningWithExtendClassDef)} JDK hotswapping
          enabled${e.runningWithExtendClassDef ? u : i`<br />Add the <code>-XX:+AllowEnhancedClassRedefinition</code> JVM argument when launching the
                application`}
        </li>
        <li>
          ${c(e.hotswapAgentFound)} HotswapAgent
          installed${e.hotswapAgentFound ? u : i`<br /><a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
                  >Download the latest HotswapAgent</a
                >
                and place it in <code>${e.hotswapAgentLocation}</code>`}
        </li>
        <li>
          ${c(e.runningWitHotswap)} HotswapAgent configured
          ${e.runningWitHotswap ? u : i`<br />Add the <code>-XX:HotswapAgent=fatjar</code> JVM argument when launching the application`}
        </li>
        <li>
          ${c(e.hotswapAgentPluginsFound)} Vaadin HotswapAgent plugin available
          ${e.hotswapAgentPluginsFound ? u : i`<div>
                Add src/main/resources/hotswap-agent.properties containing
                <!-- prettier-ignore -->
                <code class="codeblock"><copilot-copy></copilot-copy>pluginPackages=com.vaadin.hilla.devmode.hotswapagent</code>
                and restart the application
              </div>`}
        </li>
      </ul>
    </details> `;
  }
};
g([
  I()
], f.prototype, "serverInfo", 2);
g([
  I()
], f.prototype, "clientInfo", 2);
f = g([
  C("copilot-info-panel")
], f);
let b = class extends P {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "flex";
  }
  render() {
    return i`<button title="Copy to clipboard" aria-label="Copy to clipboard" theme="icon tertiary">
      <span
        @click=${() => {
      E.emit("system-info-with-callback", {
        callback: L,
        notify: !0
      });
    }}
        >${_.copy}</span
      >
    </button>`;
  }
};
b = g([
  C("copilot-info-actions")
], b);
const G = {
  header: "Info",
  expanded: !0,
  draggable: !0,
  panelOrder: 15,
  panel: "right",
  floating: !1,
  tag: "copilot-info-panel",
  actionsTag: "copilot-info-actions"
}, K = {
  init(e) {
    e.addPanel(G);
  }
};
window.Vaadin.copilot.plugins.push(K);
function c(e) {
  return e ? i`<span class="true">☑</span>` : i`<span class="false">☒</span>`;
}
export {
  b as Actions,
  f as CopilotInfoPanel
};
