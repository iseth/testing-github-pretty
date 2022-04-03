"use strict";
(() => {
    var N = Object.defineProperty;
    var s = (C, _) => N(C, "name", {
        value: _,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [7986], {
            3447: (C, _, w) => {
                w.d(_, {
                    D: () => g,
                    P: () => E
                });
                var d = w(46263);

                function E(h = 0, m = {}) {
                    return (a, b, l) => {
                        if (!l || typeof l.value != "function") throw new Error("debounce can only decorate functions");
                        const n = l.value;
                        l.value = (0, d.P)(n, h, m), Object.defineProperty(a, b, l)
                    }
                }
                s(E, "throttle");

                function g(h = 0, m = {}) {
                    return (a, b, l) => {
                        if (!l || typeof l.value != "function") throw new Error("debounce can only decorate functions");
                        const n = l.value;
                        l.value = (0, d.D)(n, h, m), Object.defineProperty(a, b, l)
                    }
                }
                s(g, "debounce")
            },
            46263: (C, _, w) => {
                w.d(_, {
                    D: () => E,
                    P: () => d
                });

                function d(g, h = 0, {
                    start: m = !0,
                    middle: a = !0,
                    once: b = !1
                } = {}) {
                    let l = 0,
                        n, o = !1;

                    function i(...f) {
                        if (o) return;
                        const y = Date.now() - l;
                        l = Date.now(), m ? (m = !1, g.apply(this, f), b && i.cancel()) : (a && y < h || !a) && (clearTimeout(n), n = setTimeout(() => {
                            l = Date.now(), g.apply(this, f), b && i.cancel()
                        }, a ? h - y : h))
                    }
                    return s(i, "fn"), i.cancel = () => {
                        clearTimeout(n), o = !0
                    }, i
                }
                s(d, "throttle");

                function E(g, h = 0, {
                    start: m = !1,
                    middle: a = !1,
                    once: b = !1
                } = {}) {
                    return d(g, h, {
                        start: m,
                        middle: a,
                        once: b
                    })
                }
                s(E, "debounce")
            },
            60785: (C, _, w) => {
                w.d(_, {
                    Z: () => E
                });
                class d {
                    getItem() {
                        return null
                    }
                    setItem() {}
                    removeItem() {}
                    clear() {}
                    key() {
                        return null
                    }
                    get length() {
                        return 0
                    }
                }
                s(d, "NoOpStorage");

                function E(g, h = {
                    throwQuotaErrorsOnSet: !1
                }, m = window) {
                    let a;
                    try {
                        a = m[g]
                    } catch {
                        a = new d
                    }
                    const {
                        throwQuotaErrorsOnSet: b
                    } = h;

                    function l(i) {
                        try {
                            return a.getItem(i)
                        } catch {
                            return null
                        }
                    }
                    s(l, "getItem");

                    function n(i, f) {
                        try {
                            a.setItem(i, f)
                        } catch (y) {
                            if (b && y.message.toLowerCase().includes("quota")) throw y
                        }
                    }
                    s(n, "setItem");

                    function o(i) {
                        try {
                            a.removeItem(i)
                        } catch {}
                    }
                    return s(o, "removeItem"), {
                        getItem: l,
                        setItem: n,
                        removeItem: o
                    }
                }
                s(E, "safeStorage")
            },
            87986: (C, _, w) => {
                w.r(_);
                var d = w(90420),
                    E = w(60785),
                    g = w(3447),
                    h = Object.defineProperty,
                    m = Object.getOwnPropertyDescriptor,
                    a = s((o, i, f, y) => {
                        for (var v = y > 1 ? void 0 : y ? m(i, f) : i, P = o.length - 1, A; P >= 0; P--)(A = o[P]) && (v = (y ? A(i, f, v) : A(v)) || v);
                        return y && v && h(i, f, v), v
                    }, "__decorateClass");
                const {
                    getItem: b,
                    setItem: l
                } = (0, E.Z)("localStorage");
                let n = s(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.dismissEvent = "click", this.labelClass = "new-feature-label"
                    }
                    async connectedCallback() {
                        this.bootstrapFromLocalStorage() || await this.bootstrapFromServer()
                    }
                    bootstrapFromLocalStorage() {
                        const o = b(this.localStorageKey);
                        return o ? (this.bootstrap(JSON.parse(o)), !0) : !1
                    }
                    get localStorageKey() {
                        return `${n.LocalStoragePrefix}:${this.featureName}`
                    }
                    async bootstrapFromServer() {
                        try {
                            const o = await fetch(this.queryPath, {
                                    method: "GET",
                                    headers: n.FetchHeaders
                                }),
                                i = await o.text();
                            if (!o.ok) throw new Error(`unexpected response status ${o.status}: '${i}'`);
                            const f = JSON.parse(i);
                            return this.bootstrap(f), f.dismissed && l(this.localStorageKey, i), !0
                        } catch (o) {
                            throw new Error(`failed to get feature state from server: ${o}`)
                        }
                        return !1
                    }
                    bootstrap(o) {
                        if (!("dismissed" in o) || o.dismissed === null) throw new Error(`malformed response, likely no notice configured: '${JSON.stringify(o)}'`);
                        o.dismissed || (this.applyTargetDefaults(), this.showCallout(), this.dismisser.addEventListener(this.dismissEvent, this.handleDismissal.bind(this), {
                            once: !0
                        }), this.detectAndBindToTabContainer())
                    }
                    detectAndBindToTabContainer() {
                        const o = this.querySelector("tab-container");
                        o && o.addEventListener("tab-container-changed", i => {
                            const f = i;
                            f.detail && f.detail.relatedTarget && f.detail.relatedTarget.getAttribute("aria-labelledby") === this.dismisser.id && this.handleDismissal()
                        })
                    }
                    applyTargetDefaults() {
                        if (!this.firstElementChild || this.labelee && this.dismisser) return;
                        let o = this.firstElementChild.getAttribute("data-target") || "";
                        this.labelee || (o = o.concat(" feature-callout.labelee")), this.dismisser || (o = o.concat(" feature-callout.dismisser")), this.firstElementChild.setAttribute("data-target", o)
                    }
                    handleDismissal() {
                        this.submitForm(), l(this.localStorageKey, '{"dismissed":true}')
                    }
                    showCallout() {
                        this.labelee.classList.add(this.labelClass)
                    }
                    async submitForm() {
                        const o = this.dismissalForm;
                        if (!!o) try {
                            const i = await fetch(o.action, {
                                method: o.method,
                                body: new FormData(o),
                                headers: n.FetchHeaders
                            });
                            if (!i.ok) throw new Error(`unexpected response status ${i.status}: ${await i.text()}`)
                        } catch (i) {
                            throw new Error(`failed to persist dismissal to server: ${i}`)
                        }
                    }
                }, "FeatureCalloutElement");
                n.LocalStoragePrefix = "feature-callout", n.FetchHeaders = {
                    "X-Requested-With": "XMLHttpRequest"
                }, a([d.fA], n.prototype, "labelee", 2), a([d.fA], n.prototype, "dismisser", 2), a([d.fA], n.prototype, "dismissalForm", 2), a([d.Lj], n.prototype, "queryPath", 2), a([d.Lj], n.prototype, "featureName", 2), a([d.Lj], n.prototype, "dismissEvent", 2), a([d.Lj], n.prototype, "labelClass", 2), a([(0, g.P)(1, {
                    once: !0
                })], n.prototype, "handleDismissal", 1), n = a([d.Ih], n)
            },
            90420: (C, _, w) => {
                w.d(_, {
                    Lj: () => T,
                    Ih: () => F,
                    P4: () => o,
                    fA: () => f,
                    GO: () => y
                });
                const d = new WeakSet;

                function E(t) {
                    d.add(t), t.shadowRoot && g(t.shadowRoot), a(t), m(t.ownerDocument)
                }
                s(E, "bind");

                function g(t) {
                    a(t), m(t)
                }
                s(g, "bindShadow");
                const h = new WeakMap;

                function m(t = document) {
                    if (h.has(t)) return h.get(t);
                    let e = !1;
                    const r = new MutationObserver(c => {
                        for (const p of c)
                            if (p.type === "attributes" && p.target instanceof Element) n(p.target);
                            else if (p.type === "childList" && p.addedNodes.length)
                            for (const S of p.addedNodes) S instanceof Element && a(S)
                    });
                    r.observe(t, {
                        childList: !0,
                        subtree: !0,
                        attributeFilter: ["data-action"]
                    });
                    const u = {
                        get closed() {
                            return e
                        },
                        unsubscribe() {
                            e = !0, h.delete(t), r.disconnect()
                        }
                    };
                    return h.set(t, u), u
                }
                s(m, "listenForBind");

                function a(t) {
                    for (const e of t.querySelectorAll("[data-action]")) n(e);
                    t instanceof Element && t.hasAttribute("data-action") && n(t)
                }
                s(a, "bindElements");

                function b(t) {
                    const e = t.currentTarget;
                    for (const r of l(e))
                        if (t.type === r.type) {
                            const u = e.closest(r.tag);
                            d.has(u) && typeof u[r.method] == "function" && u[r.method](t);
                            const c = e.getRootNode();
                            if (c instanceof ShadowRoot && d.has(c.host) && c.host.matches(r.tag)) {
                                const p = c.host;
                                typeof p[r.method] == "function" && p[r.method](t)
                            }
                        }
                }
                s(b, "handleEvent");

                function* l(t) {
                    for (const e of (t.getAttribute("data-action") || "").trim().split(/\s+/)) {
                        const r = e.lastIndexOf(":"),
                            u = Math.max(0, e.lastIndexOf("#")) || e.length;
                        yield {
                            type: e.slice(0, r),
                            tag: e.slice(r + 1, u),
                            method: e.slice(u + 1) || "handleEvent"
                        }
                    }
                }
                s(l, "bindings");

                function n(t) {
                    for (const e of l(t)) t.addEventListener(e.type, b)
                }
                s(n, "bindActions");

                function o(t, e) {
                    const r = t.tagName.toLowerCase();
                    if (t.shadowRoot) {
                        for (const u of t.shadowRoot.querySelectorAll(`[data-target~="${r}.${e}"]`))
                            if (!u.closest(r)) return u
                    }
                    for (const u of t.querySelectorAll(`[data-target~="${r}.${e}"]`))
                        if (u.closest(r) === t) return u
                }
                s(o, "findTarget");

                function i(t, e) {
                    const r = t.tagName.toLowerCase(),
                        u = [];
                    if (t.shadowRoot)
                        for (const c of t.shadowRoot.querySelectorAll(`[data-targets~="${r}.${e}"]`)) c.closest(r) || u.push(c);
                    for (const c of t.querySelectorAll(`[data-targets~="${r}.${e}"]`)) c.closest(r) === t && u.push(c);
                    return u
                }
                s(i, "findTargets");

                function f(t, e) {
                    return Object.defineProperty(t, e, {
                        configurable: !0,
                        get() {
                            return o(this, e)
                        }
                    })
                }
                s(f, "target");

                function y(t, e) {
                    return Object.defineProperty(t, e, {
                        configurable: !0,
                        get() {
                            return i(this, e)
                        }
                    })
                }
                s(y, "targets");

                function v(t) {
                    const e = t.name.replace(/([A-Z]($|[a-z]))/g, "-$1").replace(/(^-|-Element$)/g, "").toLowerCase();
                    window.customElements.get(e) || (window[t.name] = t, window.customElements.define(e, t))
                }
                s(v, "register");

                function P(t) {
                    for (const e of t.querySelectorAll("template[data-shadowroot]")) e.parentElement === t && t.attachShadow({
                        mode: e.getAttribute("data-shadowroot") === "closed" ? "closed" : "open"
                    }).append(e.content.cloneNode(!0))
                }
                s(P, "autoShadowRoot");
                const A = new WeakMap;

                function T(t, e) {
                    A.has(t) || A.set(t, []), A.get(t).push(e)
                }
                s(T, "attr");

                function $(t, e) {
                    e || (e = L(Object.getPrototypeOf(t)));
                    for (const r of e) {
                        const u = t[r],
                            c = D(r);
                        let p = {
                            configurable: !0,
                            get() {
                                return this.getAttribute(c) || ""
                            },
                            set(S) {
                                this.setAttribute(c, S || "")
                            }
                        };
                        typeof u == "number" ? p = {
                            configurable: !0,
                            get() {
                                return Number(this.getAttribute(c) || 0)
                            },
                            set(S) {
                                this.setAttribute(c, S)
                            }
                        } : typeof u == "boolean" && (p = {
                            configurable: !0,
                            get() {
                                return this.hasAttribute(c)
                            },
                            set(S) {
                                this.toggleAttribute(c, S)
                            }
                        }), Object.defineProperty(t, r, p), r in t && !t.hasAttribute(c) && p.set.call(t, u)
                    }
                }
                s($, "initializeAttrs");

                function L(t) {
                    const e = new Set;
                    let r = t;
                    for (; r && r !== HTMLElement;) {
                        const u = A.get(r) || [];
                        for (const c of u) e.add(c);
                        r = Object.getPrototypeOf(r)
                    }
                    return e
                }
                s(L, "getAttrNames");

                function D(t) {
                    return `data-${t.replace(/([A-Z]($|[a-z]))/g,"-$1")}`.replace(/--/g, "-").toLowerCase()
                }
                s(D, "attrToAttributeName");

                function I(t) {
                    let e = t.observedAttributes || [];
                    Object.defineProperty(t, "observedAttributes", {
                        configurable: !0,
                        get() {
                            return [...L(t.prototype)].map(D).concat(e)
                        },
                        set(r) {
                            e = r
                        }
                    })
                }
                s(I, "defineObservedAttributes");
                const O = new WeakSet;

                function M(t, e) {
                    t.toggleAttribute("data-catalyst", !0), customElements.upgrade(t), O.add(t), P(t), $(t), E(t), e && e.call(t), t.shadowRoot && g(t.shadowRoot)
                }
                s(M, "initializeInstance");

                function R(t) {
                    I(t), v(t)
                }
                s(R, "initializeClass");

                function x(t) {
                    return O.has(t)
                }
                s(x, "initialized");

                function F(t) {
                    const e = t.prototype.connectedCallback;
                    t.prototype.connectedCallback = function() {
                        M(this, e)
                    }, R(t)
                }
                s(F, "controller")
            }
        }
    ]);
})();

//# sourceMappingURL=7986-9dd7b2d1af33.js.map