"use strict";
(() => {
    var D = Object.defineProperty;
    var s = (O, P) => D(O, "name", {
        value: P,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [6319], {
            80425: (O, P, E) => {
                E.d(P, {
                    k: () => b
                });
                var h = function() {
                        for (var f = new Uint32Array(256), _ = 256; _--;) {
                            for (var u = _, a = 8; a--;) u = u & 1 ? 3988292384 ^ u >>> 1 : u >>> 1;
                            f[_] = u
                        }
                        return function(c) {
                            var l = -1;
                            typeof c == "string" && (c = function(T) {
                                for (var F = T.length, I = new Array(F), R = -1; ++R < F;) I[R] = T.charCodeAt(R);
                                return I
                            }(c));
                            for (var m = 0, k = c.length; m < k; m++) l = l >>> 8 ^ f[l & 255 ^ c[m]];
                            return (l ^ -1) >>> 0
                        }
                    }(),
                    S = s(function(f) {
                        return f < 0 && (f = 4294967295 + f + 1), ("0000000" + f.toString(16)).slice(-8)
                    }, "hex"),
                    b = s(function(f, _) {
                        var u = h(f);
                        return _ ? S(u) : u
                    }, "crc32")
            },
            3447: (O, P, E) => {
                E.d(P, {
                    D: () => b,
                    P: () => S
                });
                var h = E(46263);

                function S(f = 0, _ = {}) {
                    return (u, a, c) => {
                        if (!c || typeof c.value != "function") throw new Error("debounce can only decorate functions");
                        const l = c.value;
                        c.value = (0, h.P)(l, f, _), Object.defineProperty(u, a, c)
                    }
                }
                s(S, "throttle");

                function b(f = 0, _ = {}) {
                    return (u, a, c) => {
                        if (!c || typeof c.value != "function") throw new Error("debounce can only decorate functions");
                        const l = c.value;
                        c.value = (0, h.D)(l, f, _), Object.defineProperty(u, a, c)
                    }
                }
                s(b, "debounce")
            },
            46263: (O, P, E) => {
                E.d(P, {
                    D: () => S,
                    P: () => h
                });

                function h(b, f = 0, {
                    start: _ = !0,
                    middle: u = !0,
                    once: a = !1
                } = {}) {
                    let c = 0,
                        l, m = !1;

                    function k(...T) {
                        if (m) return;
                        const F = Date.now() - c;
                        c = Date.now(), _ ? (_ = !1, b.apply(this, T), a && k.cancel()) : (u && F < f || !u) && (clearTimeout(l), l = setTimeout(() => {
                            c = Date.now(), b.apply(this, T), a && k.cancel()
                        }, u ? f - F : f))
                    }
                    return s(k, "fn"), k.cancel = () => {
                        clearTimeout(l), m = !0
                    }, k
                }
                s(h, "throttle");

                function S(b, f = 0, {
                    start: _ = !1,
                    middle: u = !1,
                    once: a = !1
                } = {}) {
                    return h(b, f, {
                        start: _,
                        middle: u,
                        once: a
                    })
                }
                s(S, "debounce")
            },
            47142: (O, P, E) => {
                E.d(P, {
                    CD: () => x,
                    Gs: () => R,
                    m7: () => M
                });
                var h = -1 / 0,
                    S = 1 / 0,
                    b = -.005,
                    f = -.005,
                    _ = -.01,
                    u = 1,
                    a = .9,
                    c = .8,
                    l = .7,
                    m = .6;

                function k(y) {
                    return y.toLowerCase() === y
                }
                s(k, "islower");

                function T(y) {
                    return y.toUpperCase() === y
                }
                s(T, "isupper");

                function F(y) {
                    for (var A = y.length, g = new Array(A), w = "/", v = 0; v < A; v++) {
                        var o = y[v];
                        w === "/" ? g[v] = a : w === "-" || w === "_" || w === " " ? g[v] = c : w === "." ? g[v] = m : k(w) && T(o) ? g[v] = l : g[v] = 0, w = o
                    }
                    return g
                }
                s(F, "precompute_bonus");

                function I(y, A, g, w) {
                    for (var v = y.length, o = A.length, e = y.toLowerCase(), n = A.toLowerCase(), i = F(A, i), t = 0; t < v; t++) {
                        g[t] = new Array(o), w[t] = new Array(o);
                        for (var r = h, d = t === v - 1 ? f : _, p = 0; p < o; p++)
                            if (e[t] === n[p]) {
                                var C = h;
                                t ? p && (C = Math.max(w[t - 1][p - 1] + i[p], g[t - 1][p - 1] + u)) : C = p * b + i[p], g[t][p] = C, w[t][p] = r = Math.max(C, r + d)
                            } else g[t][p] = h, w[t][p] = r = r + d
                    }
                }
                s(I, "compute");

                function R(y, A) {
                    var g = y.length,
                        w = A.length;
                    if (!g || !w) return h;
                    if (g === w) return S;
                    if (w > 1024) return h;
                    var v = new Array(g),
                        o = new Array(g);
                    return I(y, A, v, o), o[g - 1][w - 1]
                }
                s(R, "score");

                function M(y, A) {
                    var g = y.length,
                        w = A.length,
                        v = new Array(g);
                    if (!g || !w) return v;
                    if (g === w) {
                        for (var o = 0; o < g; o++) v[o] = o;
                        return v
                    }
                    if (w > 1024) return v;
                    var e = new Array(g),
                        n = new Array(g);
                    I(y, A, e, n);
                    for (var i = !1, o = g - 1, t = w - 1; o >= 0; o--)
                        for (; t >= 0; t--)
                            if (e[o][t] !== h && (i || e[o][t] === n[o][t])) {
                                i = o && t && n[o][t] === e[o - 1][t - 1] + u, v[o] = t--;
                                break
                            }
                    return v
                }
                s(M, "positions");

                function x(y, A) {
                    y = y.toLowerCase(), A = A.toLowerCase();
                    for (var g = y.length, w = 0, v = 0; w < g; w += 1)
                        if (v = A.indexOf(y[w], v) + 1, v === 0) return !1;
                    return !0
                }
                s(x, "hasMatch")
            },
            90420: (O, P, E) => {
                E.d(P, {
                    Lj: () => x,
                    Ih: () => i,
                    P4: () => m,
                    fA: () => T,
                    GO: () => F
                });
                const h = new WeakSet;

                function S(t) {
                    h.add(t), t.shadowRoot && b(t.shadowRoot), u(t), _(t.ownerDocument)
                }
                s(S, "bind");

                function b(t) {
                    u(t), _(t)
                }
                s(b, "bindShadow");
                const f = new WeakMap;

                function _(t = document) {
                    if (f.has(t)) return f.get(t);
                    let r = !1;
                    const d = new MutationObserver(C => {
                        for (const N of C)
                            if (N.type === "attributes" && N.target instanceof Element) l(N.target);
                            else if (N.type === "childList" && N.addedNodes.length)
                            for (const L of N.addedNodes) L instanceof Element && u(L)
                    });
                    d.observe(t, {
                        childList: !0,
                        subtree: !0,
                        attributeFilter: ["data-action"]
                    });
                    const p = {
                        get closed() {
                            return r
                        },
                        unsubscribe() {
                            r = !0, f.delete(t), d.disconnect()
                        }
                    };
                    return f.set(t, p), p
                }
                s(_, "listenForBind");

                function u(t) {
                    for (const r of t.querySelectorAll("[data-action]")) l(r);
                    t instanceof Element && t.hasAttribute("data-action") && l(t)
                }
                s(u, "bindElements");

                function a(t) {
                    const r = t.currentTarget;
                    for (const d of c(r))
                        if (t.type === d.type) {
                            const p = r.closest(d.tag);
                            h.has(p) && typeof p[d.method] == "function" && p[d.method](t);
                            const C = r.getRootNode();
                            if (C instanceof ShadowRoot && h.has(C.host) && C.host.matches(d.tag)) {
                                const N = C.host;
                                typeof N[d.method] == "function" && N[d.method](t)
                            }
                        }
                }
                s(a, "handleEvent");

                function* c(t) {
                    for (const r of (t.getAttribute("data-action") || "").trim().split(/\s+/)) {
                        const d = r.lastIndexOf(":"),
                            p = Math.max(0, r.lastIndexOf("#")) || r.length;
                        yield {
                            type: r.slice(0, d),
                            tag: r.slice(d + 1, p),
                            method: r.slice(p + 1) || "handleEvent"
                        }
                    }
                }
                s(c, "bindings");

                function l(t) {
                    for (const r of c(t)) t.addEventListener(r.type, a)
                }
                s(l, "bindActions");

                function m(t, r) {
                    const d = t.tagName.toLowerCase();
                    if (t.shadowRoot) {
                        for (const p of t.shadowRoot.querySelectorAll(`[data-target~="${d}.${r}"]`))
                            if (!p.closest(d)) return p
                    }
                    for (const p of t.querySelectorAll(`[data-target~="${d}.${r}"]`))
                        if (p.closest(d) === t) return p
                }
                s(m, "findTarget");

                function k(t, r) {
                    const d = t.tagName.toLowerCase(),
                        p = [];
                    if (t.shadowRoot)
                        for (const C of t.shadowRoot.querySelectorAll(`[data-targets~="${d}.${r}"]`)) C.closest(d) || p.push(C);
                    for (const C of t.querySelectorAll(`[data-targets~="${d}.${r}"]`)) C.closest(d) === t && p.push(C);
                    return p
                }
                s(k, "findTargets");

                function T(t, r) {
                    return Object.defineProperty(t, r, {
                        configurable: !0,
                        get() {
                            return m(this, r)
                        }
                    })
                }
                s(T, "target");

                function F(t, r) {
                    return Object.defineProperty(t, r, {
                        configurable: !0,
                        get() {
                            return k(this, r)
                        }
                    })
                }
                s(F, "targets");

                function I(t) {
                    const r = t.name.replace(/([A-Z]($|[a-z]))/g, "-$1").replace(/(^-|-Element$)/g, "").toLowerCase();
                    window.customElements.get(r) || (window[t.name] = t, window.customElements.define(r, t))
                }
                s(I, "register");

                function R(t) {
                    for (const r of t.querySelectorAll("template[data-shadowroot]")) r.parentElement === t && t.attachShadow({
                        mode: r.getAttribute("data-shadowroot") === "closed" ? "closed" : "open"
                    }).append(r.content.cloneNode(!0))
                }
                s(R, "autoShadowRoot");
                const M = new WeakMap;

                function x(t, r) {
                    M.has(t) || M.set(t, []), M.get(t).push(r)
                }
                s(x, "attr");

                function y(t, r) {
                    r || (r = A(Object.getPrototypeOf(t)));
                    for (const d of r) {
                        const p = t[d],
                            C = g(d);
                        let N = {
                            configurable: !0,
                            get() {
                                return this.getAttribute(C) || ""
                            },
                            set(L) {
                                this.setAttribute(C, L || "")
                            }
                        };
                        typeof p == "number" ? N = {
                            configurable: !0,
                            get() {
                                return Number(this.getAttribute(C) || 0)
                            },
                            set(L) {
                                this.setAttribute(C, L)
                            }
                        } : typeof p == "boolean" && (N = {
                            configurable: !0,
                            get() {
                                return this.hasAttribute(C)
                            },
                            set(L) {
                                this.toggleAttribute(C, L)
                            }
                        }), Object.defineProperty(t, d, N), d in t && !t.hasAttribute(C) && N.set.call(t, p)
                    }
                }
                s(y, "initializeAttrs");

                function A(t) {
                    const r = new Set;
                    let d = t;
                    for (; d && d !== HTMLElement;) {
                        const p = M.get(d) || [];
                        for (const C of p) r.add(C);
                        d = Object.getPrototypeOf(d)
                    }
                    return r
                }
                s(A, "getAttrNames");

                function g(t) {
                    return `data-${t.replace(/([A-Z]($|[a-z]))/g,"-$1")}`.replace(/--/g, "-").toLowerCase()
                }
                s(g, "attrToAttributeName");

                function w(t) {
                    let r = t.observedAttributes || [];
                    Object.defineProperty(t, "observedAttributes", {
                        configurable: !0,
                        get() {
                            return [...A(t.prototype)].map(g).concat(r)
                        },
                        set(d) {
                            r = d
                        }
                    })
                }
                s(w, "defineObservedAttributes");
                const v = new WeakSet;

                function o(t, r) {
                    t.toggleAttribute("data-catalyst", !0), customElements.upgrade(t), v.add(t), R(t), y(t), S(t), r && r.call(t), t.shadowRoot && b(t.shadowRoot)
                }
                s(o, "initializeInstance");

                function e(t) {
                    w(t), I(t)
                }
                s(e, "initializeClass");

                function n(t) {
                    return v.has(t)
                }
                s(n, "initialized");

                function i(t) {
                    const r = t.prototype.connectedCallback;
                    t.prototype.connectedCallback = function() {
                        o(this, r)
                    }, e(t)
                }
                s(i, "controller")
            },
            33241: (O, P, E) => {
                E.d(P, {
                    Z4: () => b,
                    ck: () => _
                });
                var h = E(47142),
                    S = E(80425);
                class b {
                    constructor(a, c, l) {
                        this.providers = [], this.scopeType = "static_items_page", this.title = a, this.scopeId = c, this.providers = [new f(l)]
                    }
                }
                s(b, "StaticItemsPage");
                class f {
                    constructor(a) {
                        this.hasCommands = !0, this.debounce = 0;
                        const c = a.length;
                        this.items = a.map((l, m) => (l.priority = c - m, l))
                    }
                    async fetch(a) {
                        return {
                            results: this.fuzzyFilter(this.items, a)
                        }
                    }
                    enabledFor() {
                        return !0
                    }
                    clearCache() {}
                    fuzzyFilter(a, c, l = 0) {
                        if (c.isBlank()) return a;
                        const m = [];
                        for (const k of a) k.calculateScore(c.text) > l && m.push(k);
                        return m
                    }
                }
                s(f, "StaticItemsProvider");
                class _ {
                    constructor(a) {
                        this.score = 0, this.position = "", this.title = a.title, this.priority = a.priority, this.group = a.group, this.subtitle = a.subtitle, this.matchFields = a.matchFields, this.typeahead = a.typeahead, this.hint = a.hint, this.icon = a.icon
                    }
                    get matchingFields() {
                        return this.matchFields ? this.matchFields : [this.title]
                    }
                    get key() {
                        var a;
                        return `${this.title}-${this.group}-${this.subtitle}-${(a=this.matchFields)==null?void 0:a.join("-")}`
                    }
                    get id() {
                        return this._id || (this._id = (0, S.k)(this.key).toString()), this._id
                    }
                    calculateScore(a) {
                        const c = this.matchingFields.map(l => this.calculateScoreForField({
                            field: l,
                            queryText: a
                        }));
                        return Math.max(...c)
                    }
                    calculateScoreForField({
                        field: a,
                        queryText: c
                    }) {
                        return (0, h.CD)(c, a) ? (0, h.Gs)(c, a) : -1 / 0
                    }
                }
                s(_, "Item")
            },
            86058: (O, P, E) => {
                E.d(P, {
                    R: () => u
                });

                function h() {
                    let a;
                    try {
                        a = window.top.document.referrer
                    } catch {
                        if (window.parent) try {
                            a = window.parent.document.referrer
                        } catch {}
                    }
                    return a === "" && (a = document.referrer), a
                }
                s(h, "getReferrer");

                function S() {
                    try {
                        return `${screen.width}x${screen.height}`
                    } catch {
                        return "unknown"
                    }
                }
                s(S, "getScreenResolution");

                function b() {
                    let a = 0,
                        c = 0;
                    try {
                        return typeof window.innerWidth == "number" ? (c = window.innerWidth, a = window.innerHeight) : document.documentElement != null && document.documentElement.clientWidth != null ? (c = document.documentElement.clientWidth, a = document.documentElement.clientHeight) : document.body != null && document.body.clientWidth != null && (c = document.body.clientWidth, a = document.body.clientHeight), `${c}x${a}`
                    } catch {
                        return "unknown"
                    }
                }
                s(b, "getBrowserResolution");

                function f() {
                    return {
                        referrer: h(),
                        user_agent: navigator.userAgent,
                        screen_resolution: S(),
                        browser_resolution: b(),
                        pixel_ratio: window.devicePixelRatio,
                        timestamp: Date.now(),
                        tz_seconds: new Date().getTimezoneOffset() * -60
                    }
                }
                s(f, "getRequestContext");
                var _ = E(82918);
                class u {
                    constructor(c) {
                        this.options = c
                    }
                    get collectorUrl() {
                        return this.options.collectorUrl
                    }
                    get clientId() {
                        return this.options.clientId ? this.options.clientId : (0, _.b)()
                    }
                    createEvent(c) {
                        return {
                            page: location.href,
                            title: document.title,
                            context: { ...this.options.baseContext,
                                ...c
                            }
                        }
                    }
                    sendPageView(c) {
                        const l = this.createEvent(c);
                        this.send({
                            page_views: [l]
                        })
                    }
                    sendEvent(c, l) {
                        const m = { ...this.createEvent(l),
                            type: c
                        };
                        this.send({
                            events: [m]
                        })
                    }
                    send({
                        page_views: c,
                        events: l
                    }) {
                        const m = {
                                client_id: this.clientId,
                                page_views: c,
                                events: l,
                                request_context: f()
                            },
                            k = JSON.stringify(m);
                        try {
                            if (navigator.sendBeacon) {
                                navigator.sendBeacon(this.collectorUrl, k);
                                return
                            }
                        } catch {}
                        fetch(this.collectorUrl, {
                            method: "POST",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: k,
                            keepalive: !1
                        })
                    }
                }
                s(u, "AnalyticsClient")
            },
            82918: (O, P, E) => {
                E.d(P, {
                    b: () => _
                });
                let h;

                function S() {
                    return `${Math.round(Math.random()*(Math.pow(2,31)-1))}.${Math.round(Date.now()/1e3)}`
                }
                s(S, "generateClientId");

                function b(u) {
                    const a = `GH1.1.${u}`,
                        c = Date.now(),
                        l = new Date(c + 1 * 365 * 86400 * 1e3).toUTCString();
                    let {
                        domain: m
                    } = document;
                    m.endsWith(".github.com") && (m = "github.com"), document.cookie = `_octo=${a}; expires=${l}; path=/; domain=${m}; secure; samesite=lax`
                }
                s(b, "setClientIdCookie");

                function f() {
                    let u;
                    const c = document.cookie.match(/_octo=([^;]+)/g);
                    if (!c) return;
                    let l = [0, 0];
                    for (const m of c) {
                        const [, k] = m.split("="), [, T, ...F] = k.split("."), I = T.split("-").map(Number);
                        I > l && (l = I, u = F.join("."))
                    }
                    return u
                }
                s(f, "getClientIdFromCookie");

                function _() {
                    try {
                        const u = f();
                        if (u) return u;
                        const a = S();
                        return b(a), a
                    } catch {
                        return h || (h = S()), h
                    }
                }
                s(_, "getOrCreateClientId")
            },
            88149: (O, P, E) => {
                E.d(P, {
                    n: () => h
                });

                function h(S = "ha") {
                    let b;
                    const f = {},
                        _ = document.head.querySelectorAll(`meta[name^="${S}-"]`);
                    for (const u of Array.from(_)) {
                        const {
                            name: a,
                            content: c
                        } = u, l = a.replace(`${S}-`, "").replace(/-/g, "_");
                        l === "url" ? b = c : f[l] = c
                    }
                    if (!b) throw new Error(`AnalyticsClient ${S}-url meta tag not found`);
                    return {
                        collectorUrl: b,
                        ...Object.keys(f).length > 0 ? {
                            baseContext: f
                        } : {}
                    }
                }
                s(h, "getOptionsFromMeta")
            },
            38772: (O, P, E) => {
                E.d(P, {
                    dy: () => A,
                    sY: () => g,
                    Au: () => o
                });
                var h = E(69567);
                const S = new WeakSet;

                function b(e) {
                    return S.has(e)
                }
                s(b, "isDirective");

                function f(e, n) {
                    return b(n) ? (n(e), !0) : !1
                }
                s(f, "processDirective");

                function _(e) {
                    return (...n) => {
                        const i = e(...n);
                        return S.add(i), i
                    }
                }
                s(_, "directive");
                const u = new WeakMap;
                class a {
                    constructor(n, i) {
                        this.element = n, this.type = i, this.element.addEventListener(this.type, this), u.get(this.element).set(this.type, this)
                    }
                    set(n) {
                        typeof n == "function" ? this.handleEvent = n.bind(this.element) : typeof n == "object" && typeof n.handleEvent == "function" ? this.handleEvent = n.handleEvent.bind(n) : (this.element.removeEventListener(this.type, this), u.get(this.element).delete(this.type))
                    }
                    static
                    for (n) {
                        u.has(n.element) || u.set(n.element, new Map);
                        const i = n.attributeName.slice(2),
                            t = u.get(n.element);
                        return t.has(i) ? t.get(i) : new a(n.element, i)
                    }
                }
                s(a, "EventHandler");

                function c(e, n) {
                    return e instanceof h.sV && e.attributeName.startsWith("on") ? (a.for(e).set(n), e.element.removeAttributeNS(e.attributeNamespace, e.attributeName), !0) : !1
                }
                s(c, "processEvent");

                function l(e, n) {
                    return n instanceof x && e instanceof h.GZ ? (n.renderInto(e), !0) : !1
                }
                s(l, "processSubTemplate");

                function m(e, n) {
                    return n instanceof DocumentFragment && e instanceof h.GZ ? (n.childNodes.length && e.replace(...n.childNodes), !0) : !1
                }
                s(m, "processDocumentFragment");

                function k(e) {
                    return typeof e == "object" && Symbol.iterator in e
                }
                s(k, "isIterable");

                function T(e, n) {
                    if (!k(n)) return !1;
                    if (e instanceof h.GZ) {
                        const i = [];
                        for (const t of n)
                            if (t instanceof x) {
                                const r = document.createDocumentFragment();
                                t.renderInto(r), i.push(...r.childNodes)
                            } else t instanceof DocumentFragment ? i.push(...t.childNodes) : i.push(String(t));
                        return i.length && e.replace(...i), !0
                    } else return e.value = Array.from(n).join(" "), !0
                }
                s(T, "processIterable");

                function F(e, n) {
                    f(e, n) || (0, h.W_)(e, n) || c(e, n) || l(e, n) || m(e, n) || T(e, n) || (0, h.Al)(e, n)
                }
                s(F, "processPart");
                const I = new WeakMap,
                    R = new WeakMap,
                    M = new WeakMap;
                class x {
                    constructor(n, i, t) {
                        this.strings = n, this.values = i, this.processor = t
                    }
                    get template() {
                        if (I.has(this.strings)) return I.get(this.strings); {
                            const n = document.createElement("template"),
                                i = this.strings.length - 1;
                            return n.innerHTML = this.strings.reduce((t, r, d) => t + r + (d < i ? `{{ ${d} }}` : ""), ""), I.set(this.strings, n), n
                        }
                    }
                    renderInto(n) {
                        const i = this.template;
                        if (R.get(n) !== i) {
                            R.set(n, i);
                            const t = new h.R(i, this.values, this.processor);
                            M.set(n, t), n instanceof h.GZ ? n.replace(...t.children) : n.appendChild(t);
                            return
                        }
                        M.get(n).update(this.values)
                    }
                }
                s(x, "TemplateResult");
                const y = (0, h.AQ)(F);

                function A(e, ...n) {
                    return new x(e, n, y)
                }
                s(A, "html");

                function g(e, n) {
                    e.renderInto(n)
                }
                s(g, "render");
                const w = new WeakMap,
                    v = _((...e) => n => {
                        w.has(n) || w.set(n, {
                            i: e.length
                        });
                        const i = w.get(n);
                        for (let t = 0; t < e.length; t += 1) e[t] instanceof Promise ? Promise.resolve(e[t]).then(r => {
                            t < i.i && (i.i = t, F(n, r))
                        }) : t <= i.i && (i.i = t, F(n, e[t]))
                    }),
                    o = _(e => n => {
                        if (!(n instanceof h.GZ)) return;
                        const i = document.createElement("template");
                        i.innerHTML = e;
                        const t = document.importNode(i.content, !0);
                        n.replace(...t.childNodes)
                    })
            },
            69567: (O, P, E) => {
                E.d(P, {
                    sV: () => u,
                    GZ: () => k,
                    R: () => v,
                    AQ: () => T,
                    W_: () => I,
                    Al: () => F,
                    XK: () => M
                });

                function* h(o) {
                    let e = "",
                        n = 0,
                        i = !1;
                    for (let t = 0; t < o.length; t += 1) o[t] === "{" && o[t + 1] === "{" && o[t - 1] !== "\\" && !i ? (i = !0, e && (yield {
                        type: "string",
                        start: n,
                        end: t,
                        value: e
                    }), e = "{{", n = t, t += 2) : o[t] === "}" && o[t + 1] === "}" && o[t - 1] !== "\\" && i && (i = !1, yield {
                        type: "part",
                        start: n,
                        end: t + 2,
                        value: e.slice(2).trim()
                    }, e = "", t += 2, n = t), e += o[t] || "";
                    e && (yield {
                        type: "string",
                        start: n,
                        end: o.length,
                        value: e
                    })
                }
                s(h, "parse");
                var S = function(o, e, n) {
                        if (!e.has(o)) throw new TypeError("attempted to set private field on non-instance");
                        return e.set(o, n), n
                    },
                    b = function(o, e) {
                        if (!e.has(o)) throw new TypeError("attempted to get private field on non-instance");
                        return e.get(o)
                    },
                    f, _;
                class u {
                    constructor(e, n) {
                        this.expression = n, f.set(this, void 0), _.set(this, ""), S(this, f, e), b(this, f).updateParent("")
                    }
                    get attributeName() {
                        return b(this, f).attr.name
                    }
                    get attributeNamespace() {
                        return b(this, f).attr.namespaceURI
                    }
                    get value() {
                        return b(this, _)
                    }
                    set value(e) {
                        S(this, _, e || ""), b(this, f).updateParent(e)
                    }
                    get element() {
                        return b(this, f).element
                    }
                    get booleanValue() {
                        return b(this, f).booleanValue
                    }
                    set booleanValue(e) {
                        b(this, f).booleanValue = e
                    }
                }
                s(u, "AttributeTemplatePart"), f = new WeakMap, _ = new WeakMap;
                class a {
                    constructor(e, n) {
                        this.element = e, this.attr = n, this.partList = []
                    }
                    get booleanValue() {
                        return this.element.hasAttributeNS(this.attr.namespaceURI, this.attr.name)
                    }
                    set booleanValue(e) {
                        if (this.partList.length !== 1) throw new DOMException("Operation not supported", "NotSupportedError");
                        this.partList[0].value = e ? "" : null
                    }
                    append(e) {
                        this.partList.push(e)
                    }
                    updateParent(e) {
                        if (this.partList.length === 1 && e === null) this.element.removeAttributeNS(this.attr.namespaceURI, this.attr.name);
                        else {
                            const n = this.partList.map(i => typeof i == "string" ? i : i.value).join("");
                            this.element.setAttributeNS(this.attr.namespaceURI, this.attr.name, n)
                        }
                    }
                }
                s(a, "AttributeValueSetter");
                var c = function(o, e, n) {
                        if (!e.has(o)) throw new TypeError("attempted to set private field on non-instance");
                        return e.set(o, n), n
                    },
                    l = function(o, e) {
                        if (!e.has(o)) throw new TypeError("attempted to get private field on non-instance");
                        return e.get(o)
                    },
                    m;
                class k {
                    constructor(e, n) {
                        this.expression = n, m.set(this, void 0), c(this, m, [e]), e.textContent = ""
                    }
                    get value() {
                        return l(this, m).map(e => e.textContent).join("")
                    }
                    set value(e) {
                        this.replace(e)
                    }
                    get previousSibling() {
                        return l(this, m)[0].previousSibling
                    }
                    get nextSibling() {
                        return l(this, m)[l(this, m).length - 1].nextSibling
                    }
                    replace(...e) {
                        const n = e.map(i => typeof i == "string" ? new Text(i) : i);
                        n.length || n.push(new Text("")), l(this, m)[0].before(...n);
                        for (const i of l(this, m)) i.remove();
                        c(this, m, n)
                    }
                }
                s(k, "NodeTemplatePart"), m = new WeakMap;

                function T(o) {
                    return {
                        createCallback(e, n, i) {
                            this.processCallback(e, n, i)
                        },
                        processCallback(e, n, i) {
                            var t;
                            if (!(typeof i != "object" || !i)) {
                                for (const r of n)
                                    if (r.expression in i) {
                                        const d = (t = i[r.expression]) !== null && t !== void 0 ? t : "";
                                        o(r, d)
                                    }
                            }
                        }
                    }
                }
                s(T, "createProcessor");

                function F(o, e) {
                    o.value = String(e)
                }
                s(F, "processPropertyIdentity");

                function I(o, e) {
                    return typeof e == "boolean" && o instanceof u && typeof o.element[o.attributeName] == "boolean" ? (o.booleanValue = e, !0) : !1
                }
                s(I, "processBooleanAttribute");
                const R = T(F),
                    M = T((o, e) => {
                        I(o, e) || F(o, e)
                    });
                var x = function(o, e, n) {
                        if (!e.has(o)) throw new TypeError("attempted to set private field on non-instance");
                        return e.set(o, n), n
                    },
                    y = function(o, e) {
                        if (!e.has(o)) throw new TypeError("attempted to get private field on non-instance");
                        return e.get(o)
                    },
                    A, g;

                function* w(o) {
                    const e = o.ownerDocument.createTreeWalker(o, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, !1);
                    let n;
                    for (; n = e.nextNode();)
                        if (n instanceof Element && n.hasAttributes())
                            for (let i = 0; i < n.attributes.length; i += 1) {
                                const t = n.attributes.item(i);
                                if (t && t.value.includes("{{")) {
                                    const r = new a(n, t);
                                    for (const d of h(t.value))
                                        if (d.type === "string") r.append(d.value);
                                        else {
                                            const p = new u(r, d.value);
                                            r.append(p), yield p
                                        }
                                }
                            } else if (n instanceof Text && n.textContent && n.textContent.includes("{{"))
                                for (const i of h(n.textContent)) {
                                    i.end < n.textContent.length && n.splitText(i.end), i.type === "part" && (yield new k(n, i.value));
                                    break
                                }
                }
                s(w, "collectParts");
                class v extends DocumentFragment {
                    constructor(e, n, i = R) {
                        var t, r;
                        super();
                        A.set(this, void 0), g.set(this, void 0), Object.getPrototypeOf(this !== v.prototype) && Object.setPrototypeOf(this, v.prototype), this.appendChild(e.content.cloneNode(!0)), x(this, g, Array.from(w(this))), x(this, A, i), (r = (t = y(this, A)).createCallback) === null || r === void 0 || r.call(t, this, y(this, g), n)
                    }
                    update(e) {
                        y(this, A).processCallback(this, y(this, g), e)
                    }
                }
                s(v, "TemplateInstance"), A = new WeakMap, g = new WeakMap
            }
        }
    ]);
})();

//# sourceMappingURL=6319-bf8a13d4baec.js.map