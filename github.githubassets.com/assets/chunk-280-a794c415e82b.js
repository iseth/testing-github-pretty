"use strict";
(() => {
    var z = Object.defineProperty;
    var a = (E, b) => z(E, "name", {
        value: b,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [280], {
            80280: (E, b, m) => {
                m.r(b), m.d(b, {
                    CommandPalettePjaxMetadataElement: () => f
                });
                var l = m(90420),
                    v = Object.defineProperty,
                    A = Object.getOwnPropertyDescriptor,
                    d = a((c, g, h, u) => {
                        for (var s = u > 1 ? void 0 : u ? A(g, h) : g, w = c.length - 1, y; w >= 0; w--)(y = c[w]) && (s = (u ? y(g, h, s) : y(s)) || s);
                        return u && s && v(g, h, s), s
                    }, "__decorateClass");
                let f = a(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.defaultScopeId = "", this.defaultScopeType = ""
                    }
                    get resetPages() {
                        const c = this.defaultPages,
                            g = c.length - 1;
                        return c.map((h, u) => {
                            const s = h.cloneNode();
                            return s.hidden = u !== g, s.removeAttribute("data-targets"), s
                        })
                    }
                }, "CommandPalettePjaxMetadataElement");
                d([l.Lj], f.prototype, "defaultScopeId", 2), d([l.Lj], f.prototype, "defaultScopeType", 2), d([l.GO], f.prototype, "defaultPages", 2), f = d([l.Ih], f)
            },
            90420: (E, b, m) => {
                m.d(b, {
                    Lj: () => O,
                    Ih: () => x,
                    P4: () => s,
                    fA: () => y,
                    GO: () => L
                });
                const l = new WeakSet;

                function v(t) {
                    l.add(t), t.shadowRoot && A(t.shadowRoot), c(t), f(t.ownerDocument)
                }
                a(v, "bind");

                function A(t) {
                    c(t), f(t)
                }
                a(A, "bindShadow");
                const d = new WeakMap;

                function f(t = document) {
                    if (d.has(t)) return d.get(t);
                    let e = !1;
                    const o = new MutationObserver(r => {
                        for (const i of r)
                            if (i.type === "attributes" && i.target instanceof Element) u(i.target);
                            else if (i.type === "childList" && i.addedNodes.length)
                            for (const p of i.addedNodes) p instanceof Element && c(p)
                    });
                    o.observe(t, {
                        childList: !0,
                        subtree: !0,
                        attributeFilter: ["data-action"]
                    });
                    const n = {
                        get closed() {
                            return e
                        },
                        unsubscribe() {
                            e = !0, d.delete(t), o.disconnect()
                        }
                    };
                    return d.set(t, n), n
                }
                a(f, "listenForBind");

                function c(t) {
                    for (const e of t.querySelectorAll("[data-action]")) u(e);
                    t instanceof Element && t.hasAttribute("data-action") && u(t)
                }
                a(c, "bindElements");

                function g(t) {
                    const e = t.currentTarget;
                    for (const o of h(e))
                        if (t.type === o.type) {
                            const n = e.closest(o.tag);
                            l.has(n) && typeof n[o.method] == "function" && n[o.method](t);
                            const r = e.getRootNode();
                            if (r instanceof ShadowRoot && l.has(r.host) && r.host.matches(o.tag)) {
                                const i = r.host;
                                typeof i[o.method] == "function" && i[o.method](t)
                            }
                        }
                }
                a(g, "handleEvent");

                function* h(t) {
                    for (const e of (t.getAttribute("data-action") || "").trim().split(/\s+/)) {
                        const o = e.lastIndexOf(":"),
                            n = Math.max(0, e.lastIndexOf("#")) || e.length;
                        yield {
                            type: e.slice(0, o),
                            tag: e.slice(o + 1, n),
                            method: e.slice(n + 1) || "handleEvent"
                        }
                    }
                }
                a(h, "bindings");

                function u(t) {
                    for (const e of h(t)) t.addEventListener(e.type, g)
                }
                a(u, "bindActions");

                function s(t, e) {
                    const o = t.tagName.toLowerCase();
                    if (t.shadowRoot) {
                        for (const n of t.shadowRoot.querySelectorAll(`[data-target~="${o}.${e}"]`))
                            if (!n.closest(o)) return n
                    }
                    for (const n of t.querySelectorAll(`[data-target~="${o}.${e}"]`))
                        if (n.closest(o) === t) return n
                }
                a(s, "findTarget");

                function w(t, e) {
                    const o = t.tagName.toLowerCase(),
                        n = [];
                    if (t.shadowRoot)
                        for (const r of t.shadowRoot.querySelectorAll(`[data-targets~="${o}.${e}"]`)) r.closest(o) || n.push(r);
                    for (const r of t.querySelectorAll(`[data-targets~="${o}.${e}"]`)) r.closest(o) === t && n.push(r);
                    return n
                }
                a(w, "findTargets");

                function y(t, e) {
                    return Object.defineProperty(t, e, {
                        configurable: !0,
                        get() {
                            return s(this, e)
                        }
                    })
                }
                a(y, "target");

                function L(t, e) {
                    return Object.defineProperty(t, e, {
                        configurable: !0,
                        get() {
                            return w(this, e)
                        }
                    })
                }
                a(L, "targets");

                function _(t) {
                    const e = t.name.replace(/([A-Z]($|[a-z]))/g, "-$1").replace(/(^-|-Element$)/g, "").toLowerCase();
                    window.customElements.get(e) || (window[t.name] = t, window.customElements.define(e, t))
                }
                a(_, "register");

                function M(t) {
                    for (const e of t.querySelectorAll("template[data-shadowroot]")) e.parentElement === t && t.attachShadow({
                        mode: e.getAttribute("data-shadowroot") === "closed" ? "closed" : "open"
                    }).append(e.content.cloneNode(!0))
                }
                a(M, "autoShadowRoot");
                const P = new WeakMap;

                function O(t, e) {
                    P.has(t) || P.set(t, []), P.get(t).push(e)
                }
                a(O, "attr");

                function R(t, e) {
                    e || (e = S(Object.getPrototypeOf(t)));
                    for (const o of e) {
                        const n = t[o],
                            r = C(o);
                        let i = {
                            configurable: !0,
                            get() {
                                return this.getAttribute(r) || ""
                            },
                            set(p) {
                                this.setAttribute(r, p || "")
                            }
                        };
                        typeof n == "number" ? i = {
                            configurable: !0,
                            get() {
                                return Number(this.getAttribute(r) || 0)
                            },
                            set(p) {
                                this.setAttribute(r, p)
                            }
                        } : typeof n == "boolean" && (i = {
                            configurable: !0,
                            get() {
                                return this.hasAttribute(r)
                            },
                            set(p) {
                                this.toggleAttribute(r, p)
                            }
                        }), Object.defineProperty(t, o, i), o in t && !t.hasAttribute(r) && i.set.call(t, n)
                    }
                }
                a(R, "initializeAttrs");

                function S(t) {
                    const e = new Set;
                    let o = t;
                    for (; o && o !== HTMLElement;) {
                        const n = P.get(o) || [];
                        for (const r of n) e.add(r);
                        o = Object.getPrototypeOf(o)
                    }
                    return e
                }
                a(S, "getAttrNames");

                function C(t) {
                    return `data-${t.replace(/([A-Z]($|[a-z]))/g,"-$1")}`.replace(/--/g, "-").toLowerCase()
                }
                a(C, "attrToAttributeName");

                function N(t) {
                    let e = t.observedAttributes || [];
                    Object.defineProperty(t, "observedAttributes", {
                        configurable: !0,
                        get() {
                            return [...S(t.prototype)].map(C).concat(e)
                        },
                        set(o) {
                            e = o
                        }
                    })
                }
                a(N, "defineObservedAttributes");
                const $ = new WeakSet;

                function T(t, e) {
                    t.toggleAttribute("data-catalyst", !0), customElements.upgrade(t), $.add(t), M(t), R(t), v(t), e && e.call(t), t.shadowRoot && A(t.shadowRoot)
                }
                a(T, "initializeInstance");

                function I(t) {
                    N(t), _(t)
                }
                a(I, "initializeClass");

                function j(t) {
                    return $.has(t)
                }
                a(j, "initialized");

                function x(t) {
                    const e = t.prototype.connectedCallback;
                    t.prototype.connectedCallback = function() {
                        T(this, e)
                    }, I(t)
                }
                a(x, "controller")
            }
        }
    ]);
})();

//# sourceMappingURL=280-27b21b0fd09d.js.map