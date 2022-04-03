"use strict";
(() => {
    var x = Object.defineProperty;
    var o = (A, E) => x(A, "name", {
        value: E,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [2486], {
            76745: (A, E, v) => {
                v.d(E, {
                    Z: () => i
                });

                function f(t) {
                    const s = document.createElement("pre");
                    return s.style.width = "1px", s.style.height = "1px", s.style.position = "fixed", s.style.top = "5px", s.textContent = t, s
                }
                o(f, "createNode");

                function d(t) {
                    if ("clipboard" in navigator) return navigator.clipboard.writeText(t.textContent);
                    const s = getSelection();
                    if (s == null) return Promise.reject(new Error);
                    s.removeAllRanges();
                    const r = document.createRange();
                    return r.selectNodeContents(t), s.addRange(r), document.execCommand("copy"), s.removeAllRanges(), Promise.resolve()
                }
                o(d, "copyNode");

                function m(t) {
                    if ("clipboard" in navigator) return navigator.clipboard.writeText(t);
                    const s = document.body;
                    if (!s) return Promise.reject(new Error);
                    const r = f(t);
                    return s.appendChild(r), d(r), s.removeChild(r), Promise.resolve()
                }
                o(m, "copyText");

                function l(t) {
                    const s = t.getAttribute("for"),
                        r = t.getAttribute("value");

                    function c() {
                        t.dispatchEvent(new CustomEvent("clipboard-copy", {
                            bubbles: !0
                        }))
                    }
                    if (o(c, "trigger"), r) m(r).then(c);
                    else if (s) {
                        const p = "getRootNode" in Element.prototype ? t.getRootNode() : t.ownerDocument;
                        if (!(p instanceof Document || "ShadowRoot" in window && p instanceof ShadowRoot)) return;
                        const g = p.getElementById(s);
                        g && u(g).then(c)
                    }
                }
                o(l, "copy");

                function u(t) {
                    return t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement ? m(t.value) : t instanceof HTMLAnchorElement && t.hasAttribute("href") ? m(t.href) : d(t)
                }
                o(u, "copyTarget");

                function b(t) {
                    const s = t.currentTarget;
                    s instanceof HTMLElement && l(s)
                }
                o(b, "clicked");

                function h(t) {
                    if (t.key === " " || t.key === "Enter") {
                        const s = t.currentTarget;
                        s instanceof HTMLElement && (t.preventDefault(), l(s))
                    }
                }
                o(h, "keydown");

                function a(t) {
                    t.currentTarget.addEventListener("keydown", h)
                }
                o(a, "focused");

                function e(t) {
                    t.currentTarget.removeEventListener("keydown", h)
                }
                o(e, "blurred");
                class n extends HTMLElement {
                    constructor() {
                        super();
                        this.addEventListener("click", b), this.addEventListener("focus", a), this.addEventListener("blur", e)
                    }
                    connectedCallback() {
                        this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0"), this.hasAttribute("role") || this.setAttribute("role", "button")
                    }
                    get value() {
                        return this.getAttribute("value") || ""
                    }
                    set value(s) {
                        this.setAttribute("value", s)
                    }
                }
                o(n, "ClipboardCopyElement"), window.customElements.get("clipboard-copy") || (window.ClipboardCopyElement = n, window.customElements.define("clipboard-copy", n));
                const i = n
            },
            13002: (A, E, v) => {
                v.d(E, {
                    Z: () => a
                });
                class f extends HTMLElement {
                    constructor() {
                        super();
                        this.currentQuery = null, this.filter = null, this.debounceInputChange = h(() => d(this, !0)), this.boundFilterResults = () => {
                            d(this, !1)
                        }
                    }
                    static get observedAttributes() {
                        return ["aria-owns"]
                    }
                    attributeChangedCallback(n, i) {
                        i && n === "aria-owns" && d(this, !1)
                    }
                    connectedCallback() {
                        const n = this.input;
                        !n || (n.setAttribute("autocomplete", "off"), n.setAttribute("spellcheck", "false"), n.addEventListener("focus", this.boundFilterResults), n.addEventListener("change", this.boundFilterResults), n.addEventListener("input", this.debounceInputChange))
                    }
                    disconnectedCallback() {
                        const n = this.input;
                        !n || (n.removeEventListener("focus", this.boundFilterResults), n.removeEventListener("change", this.boundFilterResults), n.removeEventListener("input", this.debounceInputChange))
                    }
                    get input() {
                        const n = this.querySelector("input");
                        return n instanceof HTMLInputElement ? n : null
                    }
                    reset() {
                        const n = this.input;
                        n && (n.value = "", n.dispatchEvent(new Event("change", {
                            bubbles: !0
                        })))
                    }
                }
                o(f, "FilterInputElement");
                async function d(e, n = !1) {
                    const i = e.input;
                    if (!i) return;
                    const t = i.value.trim(),
                        s = e.getAttribute("aria-owns");
                    if (!s) return;
                    const r = document.getElementById(s);
                    if (!r) return;
                    const c = r.hasAttribute("data-filter-list") ? r : r.querySelector("[data-filter-list]");
                    if (!c || (e.dispatchEvent(new CustomEvent("filter-input-start", {
                            bubbles: !0
                        })), n && e.currentQuery === t)) return;
                    e.currentQuery = t;
                    const p = e.filter || m,
                        g = c.childElementCount;
                    let w = 0,
                        y = !1;
                    for (const T of Array.from(c.children)) {
                        if (!(T instanceof HTMLElement)) continue;
                        const _ = l(T),
                            C = p(T, _, t);
                        C.hideNew === !0 && (y = C.hideNew), T.hidden = !C.match, C.match && w++
                    }
                    const L = r.querySelector("[data-filter-new-item]"),
                        k = !!L && t.length > 0 && !y;
                    L instanceof HTMLElement && (L.hidden = !k, k && u(L, t)), b(r, w > 0 || k), e.dispatchEvent(new CustomEvent("filter-input-updated", {
                        bubbles: !0,
                        detail: {
                            count: w,
                            total: g
                        }
                    }))
                }
                o(d, "filterResults");

                function m(e, n, i) {
                    return {
                        match: n.toLowerCase().indexOf(i.toLowerCase()) !== -1,
                        hideNew: n === i
                    }
                }
                o(m, "matchSubstring");

                function l(e) {
                    return ((e.querySelector("[data-filter-item-text]") || e).textContent || "").trim()
                }
                o(l, "getText");

                function u(e, n) {
                    const i = e.querySelector("[data-filter-new-item-text]");
                    i && (i.textContent = n);
                    const t = e.querySelector("[data-filter-new-item-value]");
                    (t instanceof HTMLInputElement || t instanceof HTMLButtonElement) && (t.value = n)
                }
                o(u, "updateNewItem");

                function b(e, n) {
                    const i = e.querySelector("[data-filter-empty-state]");
                    i instanceof HTMLElement && (i.hidden = n)
                }
                o(b, "toggleBlankslate");

                function h(e) {
                    let n;
                    return function() {
                        clearTimeout(n), n = setTimeout(() => {
                            clearTimeout(n), e()
                        }, 300)
                    }
                }
                o(h, "debounce");
                const a = f;
                window.customElements.get("filter-input") || (window.FilterInputElement = f, window.customElements.define("filter-input", f))
            },
            88309: (A, E, v) => {
                v.d(E, {
                    Z: () => h
                });
                const f = new WeakMap;
                class d extends HTMLElement {
                    constructor() {
                        super();
                        const e = l.bind(null, this, !0),
                            n = {
                                currentQuery: null,
                                oninput: b(e),
                                fetch: e,
                                controller: null
                            };
                        f.set(this, n)
                    }
                    static get observedAttributes() {
                        return ["src"]
                    }
                    attributeChangedCallback(e, n) {
                        n && e === "src" && l(this, !1)
                    }
                    connectedCallback() {
                        const e = this.input;
                        if (!e) return;
                        e.setAttribute("autocomplete", "off"), e.setAttribute("spellcheck", "false");
                        const n = f.get(this);
                        !n || (e.addEventListener("focus", n.fetch), e.addEventListener("change", n.fetch), e.addEventListener("input", n.oninput))
                    }
                    disconnectedCallback() {
                        const e = this.input;
                        if (!e) return;
                        const n = f.get(this);
                        !n || (e.removeEventListener("focus", n.fetch), e.removeEventListener("change", n.fetch), e.removeEventListener("input", n.oninput))
                    }
                    get input() {
                        const e = this.querySelector("input, textarea");
                        return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement ? e : null
                    }
                    get src() {
                        return this.getAttribute("src") || ""
                    }
                    set src(e) {
                        this.setAttribute("src", e)
                    }
                }
                o(d, "RemoteInputElement");

                function m() {
                    return "AbortController" in window ? new AbortController : {
                        signal: null,
                        abort() {}
                    }
                }
                o(m, "makeAbortController");
                async function l(a, e) {
                    const n = a.input;
                    if (!n) return;
                    const i = f.get(a);
                    if (!i) return;
                    const t = n.value;
                    if (e && i.currentQuery === t) return;
                    i.currentQuery = t;
                    const s = a.src;
                    if (!s) return;
                    const r = document.getElementById(a.getAttribute("aria-owns") || "");
                    if (!r) return;
                    const c = new URL(s, window.location.href),
                        p = new URLSearchParams(c.search);
                    p.append(a.getAttribute("param") || "q", t), c.search = p.toString(), i.controller ? i.controller.abort() : (a.dispatchEvent(new CustomEvent("loadstart")), a.setAttribute("loading", "")), i.controller = m();
                    let g, w = "";
                    try {
                        g = await u(a, c.toString(), {
                            signal: i.controller.signal,
                            credentials: "same-origin",
                            headers: {
                                accept: "text/fragment+html"
                            }
                        }), w = await g.text(), a.removeAttribute("loading"), i.controller = null
                    } catch (y) {
                        y.name !== "AbortError" && (a.removeAttribute("loading"), i.controller = null);
                        return
                    }
                    g && g.ok ? (r.innerHTML = w, a.dispatchEvent(new CustomEvent("remote-input-success", {
                        bubbles: !0
                    }))) : a.dispatchEvent(new CustomEvent("remote-input-error", {
                        bubbles: !0
                    }))
                }
                o(l, "fetchResults");
                async function u(a, e, n) {
                    try {
                        const i = await fetch(e, n);
                        return a.dispatchEvent(new CustomEvent("load")), a.dispatchEvent(new CustomEvent("loadend")), i
                    } catch (i) {
                        throw i.name !== "AbortError" && (a.dispatchEvent(new CustomEvent("error")), a.dispatchEvent(new CustomEvent("loadend"))), i
                    }
                }
                o(u, "fetchWithNetworkEvents");

                function b(a) {
                    let e;
                    return function() {
                        clearTimeout(e), e = setTimeout(() => {
                            clearTimeout(e), a()
                        }, 300)
                    }
                }
                o(b, "debounce");
                const h = d;
                window.customElements.get("remote-input") || (window.RemoteInputElement = d, window.customElements.define("remote-input", d))
            },
            29501: (A, E, v) => {
                v.d(E, {
                    Z: () => d
                });

                function f(l) {
                    return Array.from(l.querySelectorAll('[role="tablist"] [role="tab"]')).filter(u => u instanceof HTMLElement && u.closest(l.tagName) === l)
                }
                o(f, "getTabs");
                class d extends HTMLElement {
                    constructor() {
                        super();
                        this.addEventListener("keydown", u => {
                            const b = u.target;
                            if (!(b instanceof HTMLElement) || b.closest(this.tagName) !== this || b.getAttribute("role") !== "tab" && !b.closest('[role="tablist"]')) return;
                            const h = f(this),
                                a = h.indexOf(h.find(e => e.matches('[aria-selected="true"]')));
                            if (u.code === "ArrowRight") {
                                let e = a + 1;
                                e >= h.length && (e = 0), m(this, e)
                            } else if (u.code === "ArrowLeft") {
                                let e = a - 1;
                                e < 0 && (e = h.length - 1), m(this, e)
                            } else u.code === "Home" ? (m(this, 0), u.preventDefault()) : u.code === "End" && (m(this, h.length - 1), u.preventDefault())
                        }), this.addEventListener("click", u => {
                            const b = f(this);
                            if (!(u.target instanceof Element) || u.target.closest(this.tagName) !== this) return;
                            const h = u.target.closest('[role="tab"]');
                            if (!(h instanceof HTMLElement) || !h.closest('[role="tablist"]')) return;
                            const a = b.indexOf(h);
                            m(this, a)
                        })
                    }
                    connectedCallback() {
                        for (const u of f(this)) u.hasAttribute("aria-selected") || u.setAttribute("aria-selected", "false"), u.hasAttribute("tabindex") || (u.getAttribute("aria-selected") === "true" ? u.setAttribute("tabindex", "0") : u.setAttribute("tabindex", "-1"))
                    }
                }
                o(d, "TabContainerElement");

                function m(l, u) {
                    const b = f(l),
                        h = Array.from(l.querySelectorAll('[role="tabpanel"]')).filter(i => i.closest(l.tagName) === l),
                        a = b[u],
                        e = h[u];
                    if (!!l.dispatchEvent(new CustomEvent("tab-container-change", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {
                                relatedTarget: e
                            }
                        }))) {
                        for (const i of b) i.setAttribute("aria-selected", "false"), i.setAttribute("tabindex", "-1");
                        for (const i of h) i.hidden = !0, !i.hasAttribute("tabindex") && !i.hasAttribute("data-tab-container-no-tabstop") && i.setAttribute("tabindex", "0");
                        a.setAttribute("aria-selected", "true"), a.setAttribute("tabindex", "0"), a.focus(), e.hidden = !1, l.dispatchEvent(new CustomEvent("tab-container-changed", {
                            bubbles: !0,
                            detail: {
                                relatedTarget: e
                            }
                        }))
                    }
                }
                o(m, "selectTab"), window.customElements.get("tab-container") || (window.TabContainerElement = d, window.customElements.define("tab-container", d))
            },
            46481: (A, E, v) => {
                v.d(E, {
                    Z: () => i
                });
                var f = v(10160);
                class d extends CustomEvent {
                    constructor(s, r) {
                        super(s, r);
                        this.relatedTarget = r.relatedTarget
                    }
                }
                o(d, "AutocompleteEvent");

                function m(t, s = 0) {
                    let r;
                    return function(...c) {
                        clearTimeout(r), r = window.setTimeout(() => {
                            clearTimeout(r), t(...c)
                        }, s)
                    }
                }
                o(m, "debounce");
                const l = new WeakMap;

                function u(t, s) {
                    const r = new XMLHttpRequest;
                    return r.open("GET", s, !0), r.setRequestHeader("Accept", "text/fragment+html"), b(t, r)
                }
                o(u, "fragment");

                function b(t, s) {
                    const r = l.get(t);
                    r && r.abort(), l.set(t, s);
                    const c = o(() => l.delete(t), "clear"),
                        p = h(s);
                    return p.then(c, c), p
                }
                o(b, "request");

                function h(t) {
                    return new Promise((s, r) => {
                        t.onload = function() {
                            t.status >= 200 && t.status < 300 ? s(t.responseText) : r(new Error(t.responseText))
                        }, t.onerror = r, t.send()
                    })
                }
                o(h, "send");
                class a {
                    constructor(s, r, c) {
                        this.container = s, this.input = r, this.results = c, this.combobox = new f.Z(r, c), this.results.hidden = !0, this.input.setAttribute("autocomplete", "off"), this.input.setAttribute("spellcheck", "false"), this.interactingWithList = !1, this.onInputChange = m(this.onInputChange.bind(this), 300), this.onResultsMouseDown = this.onResultsMouseDown.bind(this), this.onInputBlur = this.onInputBlur.bind(this), this.onInputFocus = this.onInputFocus.bind(this), this.onKeydown = this.onKeydown.bind(this), this.onCommit = this.onCommit.bind(this), this.input.addEventListener("keydown", this.onKeydown), this.input.addEventListener("focus", this.onInputFocus), this.input.addEventListener("blur", this.onInputBlur), this.input.addEventListener("input", this.onInputChange), this.results.addEventListener("mousedown", this.onResultsMouseDown), this.results.addEventListener("combobox-commit", this.onCommit)
                    }
                    destroy() {
                        this.input.removeEventListener("keydown", this.onKeydown), this.input.removeEventListener("focus", this.onInputFocus), this.input.removeEventListener("blur", this.onInputBlur), this.input.removeEventListener("input", this.onInputChange), this.results.removeEventListener("mousedown", this.onResultsMouseDown), this.results.removeEventListener("combobox-commit", this.onCommit)
                    }
                    onKeydown(s) {
                        if (s.key === "Escape" && this.container.open) this.container.open = !1, s.stopPropagation(), s.preventDefault();
                        else if (s.altKey && s.key === "ArrowUp" && this.container.open) this.container.open = !1, s.stopPropagation(), s.preventDefault();
                        else if (s.altKey && s.key === "ArrowDown" && !this.container.open) {
                            if (!this.input.value.trim()) return;
                            this.container.open = !0, s.stopPropagation(), s.preventDefault()
                        }
                    }
                    onInputFocus() {
                        this.fetchResults()
                    }
                    onInputBlur() {
                        if (this.interactingWithList) {
                            this.interactingWithList = !1;
                            return
                        }
                        this.container.open = !1
                    }
                    onCommit({
                        target: s
                    }) {
                        const r = s;
                        if (!(r instanceof HTMLElement) || (this.container.open = !1, r instanceof HTMLAnchorElement)) return;
                        const c = r.getAttribute("data-autocomplete-value") || r.textContent;
                        this.container.value = c
                    }
                    onResultsMouseDown() {
                        this.interactingWithList = !0
                    }
                    onInputChange() {
                        this.container.removeAttribute("value"), this.fetchResults()
                    }
                    identifyOptions() {
                        let s = 0;
                        for (const r of this.results.querySelectorAll('[role="option"]:not([id])')) r.id = `${this.results.id}-option-${s++}`
                    }
                    fetchResults() {
                        const s = this.input.value.trim();
                        if (!s) {
                            this.container.open = !1;
                            return
                        }
                        const r = this.container.src;
                        if (!r) return;
                        const c = new URL(r, window.location.href),
                            p = new URLSearchParams(c.search.slice(1));
                        p.append("q", s), c.search = p.toString(), this.container.dispatchEvent(new CustomEvent("loadstart")), u(this.input, c.toString()).then(g => {
                            this.results.innerHTML = g, this.identifyOptions();
                            const w = !!this.results.querySelector('[role="option"]');
                            this.container.open = w, this.container.dispatchEvent(new CustomEvent("load")), this.container.dispatchEvent(new CustomEvent("loadend"))
                        }).catch(() => {
                            this.container.dispatchEvent(new CustomEvent("error")), this.container.dispatchEvent(new CustomEvent("loadend"))
                        })
                    }
                    open() {
                        !this.results.hidden || (this.combobox.start(), this.results.hidden = !1)
                    }
                    close() {
                        this.results.hidden || (this.combobox.stop(), this.results.hidden = !0)
                    }
                }
                o(a, "Autocomplete");
                const e = new WeakMap;
                class n extends HTMLElement {
                    constructor() {
                        super()
                    }
                    connectedCallback() {
                        const s = this.getAttribute("for");
                        if (!s) return;
                        const r = this.querySelector("input"),
                            c = document.getElementById(s);
                        !(r instanceof HTMLInputElement) || !c || (e.set(this, new a(this, r, c)), c.setAttribute("role", "listbox"))
                    }
                    disconnectedCallback() {
                        const s = e.get(this);
                        s && (s.destroy(), e.delete(this))
                    }
                    get src() {
                        return this.getAttribute("src") || ""
                    }
                    set src(s) {
                        this.setAttribute("src", s)
                    }
                    get value() {
                        return this.getAttribute("value") || ""
                    }
                    set value(s) {
                        this.setAttribute("value", s)
                    }
                    get open() {
                        return this.hasAttribute("open")
                    }
                    set open(s) {
                        s ? this.setAttribute("open", "") : this.removeAttribute("open")
                    }
                    static get observedAttributes() {
                        return ["open", "value"]
                    }
                    attributeChangedCallback(s, r, c) {
                        if (r === c) return;
                        const p = e.get(this);
                        if (!!p) switch (s) {
                            case "open":
                                c === null ? p.close() : p.open();
                                break;
                            case "value":
                                c !== null && (p.input.value = c), this.dispatchEvent(new d("auto-complete-change", {
                                    bubbles: !0,
                                    relatedTarget: p.input
                                }));
                                break
                        }
                    }
                }
                o(n, "AutocompleteElement"), window.customElements.get("auto-complete") || (window.AutocompleteElement = n, window.customElements.define("auto-complete", n));
                const i = n
            },
            10160: (A, E, v) => {
                v.d(E, {
                    Z: () => d
                });
                const f = !!navigator.userAgent.match(/Macintosh/);
                class d {
                    constructor(t, s) {
                        this.input = t, this.list = s, this.isComposing = !1, s.id || (s.id = `combobox-${Math.random().toString().slice(2,6)}`), this.keyboardEventHandler = r => m(r, this), this.compositionEventHandler = r => a(r, this), this.inputHandler = this.clearSelection.bind(this), t.setAttribute("role", "combobox"), t.setAttribute("aria-controls", s.id), t.setAttribute("aria-expanded", "false"), t.setAttribute("aria-autocomplete", "list"), t.setAttribute("aria-haspopup", "listbox")
                    }
                    destroy() {
                        this.clearSelection(), this.stop(), this.input.removeAttribute("role"), this.input.removeAttribute("aria-controls"), this.input.removeAttribute("aria-expanded"), this.input.removeAttribute("aria-autocomplete"), this.input.removeAttribute("aria-haspopup")
                    }
                    start() {
                        this.input.setAttribute("aria-expanded", "true"), this.input.addEventListener("compositionstart", this.compositionEventHandler), this.input.addEventListener("compositionend", this.compositionEventHandler), this.input.addEventListener("input", this.inputHandler), this.input.addEventListener("keydown", this.keyboardEventHandler), this.list.addEventListener("click", l)
                    }
                    stop() {
                        this.clearSelection(), this.input.setAttribute("aria-expanded", "false"), this.input.removeEventListener("compositionstart", this.compositionEventHandler), this.input.removeEventListener("compositionend", this.compositionEventHandler), this.input.removeEventListener("input", this.inputHandler), this.input.removeEventListener("keydown", this.keyboardEventHandler), this.list.removeEventListener("click", l)
                    }
                    navigate(t = 1) {
                        const s = Array.from(this.list.querySelectorAll('[aria-selected="true"]')).filter(h)[0],
                            r = Array.from(this.list.querySelectorAll('[role="option"]')).filter(h),
                            c = r.indexOf(s);
                        if (c === r.length - 1 && t === 1 || c === 0 && t === -1) {
                            this.clearSelection(), this.input.focus();
                            return
                        }
                        let p = t === 1 ? 0 : r.length - 1;
                        if (s && c >= 0) {
                            const w = c + t;
                            w >= 0 && w < r.length && (p = w)
                        }
                        const g = r[p];
                        if (!!g)
                            for (const w of r) g === w ? (this.input.setAttribute("aria-activedescendant", g.id), g.setAttribute("aria-selected", "true"), e(this.list, g)) : w.setAttribute("aria-selected", "false")
                    }
                    clearSelection() {
                        this.input.removeAttribute("aria-activedescendant");
                        for (const t of this.list.querySelectorAll('[aria-selected="true"]')) t.setAttribute("aria-selected", "false")
                    }
                }
                o(d, "Combobox");

                function m(i, t) {
                    if (!(i.shiftKey || i.metaKey || i.altKey) && !(!f && i.ctrlKey) && !t.isComposing) switch (i.key) {
                        case "Enter":
                        case "Tab":
                            u(t.input, t.list) && i.preventDefault();
                            break;
                        case "Escape":
                            t.clearSelection();
                            break;
                        case "ArrowDown":
                            t.navigate(1), i.preventDefault();
                            break;
                        case "ArrowUp":
                            t.navigate(-1), i.preventDefault();
                            break;
                        case "n":
                            f && i.ctrlKey && (t.navigate(1), i.preventDefault());
                            break;
                        case "p":
                            f && i.ctrlKey && (t.navigate(-1), i.preventDefault());
                            break;
                        default:
                            if (i.ctrlKey) break;
                            t.clearSelection()
                    }
                }
                o(m, "keyboardBindings");

                function l(i) {
                    if (!(i.target instanceof Element)) return;
                    const t = i.target.closest('[role="option"]');
                    !t || t.getAttribute("aria-disabled") !== "true" && b(t)
                }
                o(l, "commitWithElement");

                function u(i, t) {
                    const s = t.querySelector('[aria-selected="true"]');
                    return s ? (s.getAttribute("aria-disabled") === "true" || s.click(), !0) : !1
                }
                o(u, "commit");

                function b(i) {
                    i.dispatchEvent(new CustomEvent("combobox-commit", {
                        bubbles: !0
                    }))
                }
                o(b, "fireCommitEvent");

                function h(i) {
                    return !i.hidden && !(i instanceof HTMLInputElement && i.type === "hidden") && (i.offsetWidth > 0 || i.offsetHeight > 0)
                }
                o(h, "visible");

                function a(i, t) {
                    t.isComposing = i.type === "compositionstart", !!document.getElementById(t.input.getAttribute("aria-controls") || "") && t.clearSelection()
                }
                o(a, "trackComposition");

                function e(i, t) {
                    n(i, t) || (i.scrollTop = t.offsetTop)
                }
                o(e, "scrollTo");

                function n(i, t) {
                    const s = i.scrollTop,
                        r = s + i.clientHeight,
                        c = t.offsetTop,
                        p = c + t.clientHeight;
                    return c >= s && p <= r
                }
                o(n, "inViewport")
            },
            27034: (A, E, v) => {
                v.d(E, {
                    Z: () => a
                });
                const f = new WeakMap,
                    d = new IntersectionObserver(e => {
                        for (const n of e)
                            if (n.isIntersecting) {
                                const {
                                    target: i
                                } = n;
                                if (d.unobserve(i), !(i instanceof a)) return;
                                i.loading === "lazy" && l(i)
                            }
                    }, {
                        rootMargin: "0px 0px 256px 0px",
                        threshold: .01
                    });

                function m() {
                    return new Promise(e => setTimeout(e, 0))
                }
                o(m, "task");
                async function l(e) {
                    return d.unobserve(e), u(e).then(function(n) {
                        const i = document.createElement("template");
                        i.innerHTML = n;
                        const t = document.importNode(i.content, !0);
                        !e.dispatchEvent(new CustomEvent("include-fragment-replace", {
                            cancelable: !0,
                            detail: {
                                fragment: t
                            }
                        })) || (e.replaceWith(t), e.dispatchEvent(new CustomEvent("include-fragment-replaced")))
                    }, function() {
                        e.classList.add("is-error")
                    })
                }
                o(l, "handleData");

                function u(e) {
                    const n = e.src;
                    let i = f.get(e);
                    return i && i.src === n ? i.data : (n ? i = b(e) : i = Promise.reject(new Error("missing src")), f.set(e, {
                        src: n,
                        data: i
                    }), i)
                }
                o(u, "getData");

                function b(e) {
                    return m().then(() => (e.dispatchEvent(new Event("loadstart")), e.fetch(e.request()))).then(n => {
                        if (n.status !== 200) throw new Error(`Failed to load resource: the server responded with a status of ${n.status}`);
                        const i = n.headers.get("Content-Type");
                        if (!h(e.accept) && (!i || !i.includes(e.accept ? e.accept : "text/html"))) throw new Error(`Failed to load resource: expected ${e.accept||"text/html"} but was ${i}`);
                        return n.text()
                    }).then(n => (m().then(() => {
                        e.dispatchEvent(new Event("load")), e.dispatchEvent(new Event("loadend"))
                    }), n), n => {
                        throw m().then(() => {
                            e.dispatchEvent(new Event("error")), e.dispatchEvent(new Event("loadend"))
                        }), n
                    })
                }
                o(b, "fetchDataWithEvents");

                function h(e) {
                    return e && !!e.split(",").find(n => n.match(/^\s*\*\/\*/))
                }
                o(h, "isWildcard");
                class a extends HTMLElement {
                    static get observedAttributes() {
                        return ["src", "loading"]
                    }
                    get src() {
                        const n = this.getAttribute("src");
                        if (n) {
                            const i = this.ownerDocument.createElement("a");
                            return i.href = n, i.href
                        } else return ""
                    }
                    set src(n) {
                        this.setAttribute("src", n)
                    }
                    get loading() {
                        return this.getAttribute("loading") === "lazy" ? "lazy" : "eager"
                    }
                    set loading(n) {
                        this.setAttribute("loading", n)
                    }
                    get accept() {
                        return this.getAttribute("accept") || ""
                    }
                    set accept(n) {
                        this.setAttribute("accept", n)
                    }
                    get data() {
                        return u(this)
                    }
                    attributeChangedCallback(n, i) {
                        n === "src" ? this.isConnected && this.loading === "eager" && l(this) : n === "loading" && this.isConnected && i !== "eager" && this.loading === "eager" && l(this)
                    }
                    constructor() {
                        super();
                        this.attachShadow({
                            mode: "open"
                        }).innerHTML = `
      <style> 
        :host {
          display: block;
        }
      </style>
      <slot></slot>`
                    }
                    connectedCallback() {
                        this.src && this.loading === "eager" && l(this), this.loading === "lazy" && d.observe(this)
                    }
                    request() {
                        const n = this.src;
                        if (!n) throw new Error("missing src");
                        return new Request(n, {
                            method: "GET",
                            credentials: "same-origin",
                            headers: {
                                Accept: this.accept || "text/html"
                            }
                        })
                    }
                    load() {
                        return u(this)
                    }
                    fetch(n) {
                        return fetch(n)
                    }
                }
                o(a, "IncludeFragmentElement"), window.customElements.get("include-fragment") || (window.IncludeFragmentElement = a, window.customElements.define("include-fragment", a))
            }
        }
    ]);
})();

//# sourceMappingURL=2486-e80acbcb9a3e.js.map