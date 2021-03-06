"use strict";
(() => {
    var V = Object.defineProperty;
    var o = (U, I) => V(U, "name", {
        value: I,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [9255], {
            76745: (U, I, H) => {
                H.d(I, {
                    Z: () => P
                });

                function v(c) {
                    const d = document.createElement("pre");
                    return d.style.width = "1px", d.style.height = "1px", d.style.position = "fixed", d.style.top = "5px", d.textContent = c, d
                }
                o(v, "createNode");

                function E(c) {
                    if ("clipboard" in navigator) return navigator.clipboard.writeText(c.textContent);
                    const d = getSelection();
                    if (d == null) return Promise.reject(new Error);
                    d.removeAllRanges();
                    const k = document.createRange();
                    return k.selectNodeContents(c), d.addRange(k), document.execCommand("copy"), d.removeAllRanges(), Promise.resolve()
                }
                o(E, "copyNode");

                function A(c) {
                    if ("clipboard" in navigator) return navigator.clipboard.writeText(c);
                    const d = document.body;
                    if (!d) return Promise.reject(new Error);
                    const k = v(c);
                    return d.appendChild(k), E(k), d.removeChild(k), Promise.resolve()
                }
                o(A, "copyText");

                function D(c) {
                    const d = c.getAttribute("for"),
                        k = c.getAttribute("value");

                    function j() {
                        c.dispatchEvent(new CustomEvent("clipboard-copy", {
                            bubbles: !0
                        }))
                    }
                    if (o(j, "trigger"), k) A(k).then(j);
                    else if (d) {
                        const L = "getRootNode" in Element.prototype ? c.getRootNode() : c.ownerDocument;
                        if (!(L instanceof Document || "ShadowRoot" in window && L instanceof ShadowRoot)) return;
                        const N = L.getElementById(d);
                        N && q(N).then(j)
                    }
                }
                o(D, "copy");

                function q(c) {
                    return c instanceof HTMLInputElement || c instanceof HTMLTextAreaElement ? A(c.value) : c instanceof HTMLAnchorElement && c.hasAttribute("href") ? A(c.href) : E(c)
                }
                o(q, "copyTarget");

                function M(c) {
                    const d = c.currentTarget;
                    d instanceof HTMLElement && D(d)
                }
                o(M, "clicked");

                function S(c) {
                    if (c.key === " " || c.key === "Enter") {
                        const d = c.currentTarget;
                        d instanceof HTMLElement && (c.preventDefault(), D(d))
                    }
                }
                o(S, "keydown");

                function R(c) {
                    c.currentTarget.addEventListener("keydown", S)
                }
                o(R, "focused");

                function T(c) {
                    c.currentTarget.removeEventListener("keydown", S)
                }
                o(T, "blurred");
                class C extends HTMLElement {
                    constructor() {
                        super();
                        this.addEventListener("click", M), this.addEventListener("focus", R), this.addEventListener("blur", T)
                    }
                    connectedCallback() {
                        this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0"), this.hasAttribute("role") || this.setAttribute("role", "button")
                    }
                    get value() {
                        return this.getAttribute("value") || ""
                    }
                    set value(d) {
                        this.setAttribute("value", d)
                    }
                }
                o(C, "ClipboardCopyElement"), window.customElements.get("clipboard-copy") || (window.ClipboardCopyElement = C, window.customElements.define("clipboard-copy", C));
                const P = C
            },
            59753: (U, I, H) => {
                H.d(I, {
                    f: () => B,
                    on: () => W
                });

                function v() {
                    if (!(this instanceof v)) return new v;
                    this.size = 0, this.uid = 0, this.selectors = [], this.selectorObjects = {}, this.indexes = Object.create(this.indexes), this.activeIndexes = []
                }
                o(v, "SelectorSet");
                var E = window.document.documentElement,
                    A = E.matches || E.webkitMatchesSelector || E.mozMatchesSelector || E.oMatchesSelector || E.msMatchesSelector;
                v.prototype.matchesSelector = function(e, t) {
                    return A.call(e, t)
                }, v.prototype.querySelectorAll = function(e, t) {
                    return t.querySelectorAll(e)
                }, v.prototype.indexes = [];
                var D = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                v.prototype.indexes.push({
                    name: "ID",
                    selector: o(function(t) {
                        var n;
                        if (n = t.match(D)) return n[0].slice(1)
                    }, "matchIdSelector"),
                    element: o(function(t) {
                        if (t.id) return [t.id]
                    }, "getElementId")
                });
                var q = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                v.prototype.indexes.push({
                    name: "CLASS",
                    selector: o(function(t) {
                        var n;
                        if (n = t.match(q)) return n[0].slice(1)
                    }, "matchClassSelector"),
                    element: o(function(t) {
                        var n = t.className;
                        if (n) {
                            if (typeof n == "string") return n.split(/\s/);
                            if (typeof n == "object" && "baseVal" in n) return n.baseVal.split(/\s/)
                        }
                    }, "getElementClassNames")
                });
                var M = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                v.prototype.indexes.push({
                    name: "TAG",
                    selector: o(function(t) {
                        var n;
                        if (n = t.match(M)) return n[0].toUpperCase()
                    }, "matchTagSelector"),
                    element: o(function(t) {
                        return [t.nodeName.toUpperCase()]
                    }, "getElementTagName")
                }), v.prototype.indexes.default = {
                    name: "UNIVERSAL",
                    selector: function() {
                        return !0
                    },
                    element: function() {
                        return [!0]
                    }
                };
                var S;
                typeof window.Map == "function" ? S = window.Map : S = function() {
                    function e() {
                        this.map = {}
                    }
                    return o(e, "Map"), e.prototype.get = function(t) {
                        return this.map[t + " "]
                    }, e.prototype.set = function(t, n) {
                        this.map[t + " "] = n
                    }, e
                }();
                var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

                function T(e, t) {
                    e = e.slice(0).concat(e.default);
                    var n = e.length,
                        u, i, f, l, g = t,
                        y, w, b = [];
                    do
                        if (R.exec(""), (f = R.exec(g)) && (g = f[3], f[2] || !g)) {
                            for (u = 0; u < n; u++)
                                if (w = e[u], y = w.selector(f[1])) {
                                    for (i = b.length, l = !1; i--;)
                                        if (b[i].index === w && b[i].key === y) {
                                            l = !0;
                                            break
                                        }
                                    l || b.push({
                                        index: w,
                                        key: y
                                    });
                                    break
                                }
                        }
                    while (f);
                    return b
                }
                o(T, "parseSelectorIndexes");

                function C(e, t) {
                    var n, u, i;
                    for (n = 0, u = e.length; n < u; n++)
                        if (i = e[n], t.isPrototypeOf(i)) return i
                }
                o(C, "findByPrototype"), v.prototype.logDefaultIndexUsed = function() {}, v.prototype.add = function(e, t) {
                    var n, u, i, f, l, g, y, w, b = this.activeIndexes,
                        x = this.selectors,
                        _ = this.selectorObjects;
                    if (typeof e == "string") {
                        for (n = {
                                id: this.uid++,
                                selector: e,
                                data: t
                            }, _[n.id] = n, y = T(this.indexes, e), u = 0; u < y.length; u++) w = y[u], f = w.key, i = w.index, l = C(b, i), l || (l = Object.create(i), l.map = new S, b.push(l)), i === this.indexes.default && this.logDefaultIndexUsed(n), g = l.map.get(f), g || (g = [], l.map.set(f, g)), g.push(n);
                        this.size++, x.push(e)
                    }
                }, v.prototype.remove = function(e, t) {
                    if (typeof e == "string") {
                        var n, u, i, f, l, g, y, w, b = this.activeIndexes,
                            x = this.selectors = [],
                            _ = this.selectorObjects,
                            K = {},
                            z = arguments.length === 1;
                        for (n = T(this.indexes, e), i = 0; i < n.length; i++)
                            for (u = n[i], f = b.length; f--;)
                                if (g = b[f], u.index.isPrototypeOf(g)) {
                                    if (y = g.map.get(u.key), y)
                                        for (l = y.length; l--;) w = y[l], w.selector === e && (z || w.data === t) && (y.splice(l, 1), K[w.id] = !0);
                                    break
                                }
                        for (i in K) delete _[i], this.size--;
                        for (i in _) x.push(_[i].selector)
                    }
                };

                function P(e, t) {
                    return e.id - t.id
                }
                o(P, "sortById"), v.prototype.queryAll = function(e) {
                    if (!this.selectors.length) return [];
                    var t = {},
                        n = [],
                        u = this.querySelectorAll(this.selectors.join(", "), e),
                        i, f, l, g, y, w, b, x;
                    for (i = 0, l = u.length; i < l; i++)
                        for (y = u[i], w = this.matches(y), f = 0, g = w.length; f < g; f++) x = w[f], t[x.id] ? b = t[x.id] : (b = {
                            id: x.id,
                            selector: x.selector,
                            data: x.data,
                            elements: []
                        }, t[x.id] = b, n.push(b)), b.elements.push(y);
                    return n.sort(P)
                }, v.prototype.matches = function(e) {
                    if (!e) return [];
                    var t, n, u, i, f, l, g, y, w, b, x, _ = this.activeIndexes,
                        K = {},
                        z = [];
                    for (t = 0, i = _.length; t < i; t++)
                        if (g = _[t], y = g.element(e), y) {
                            for (n = 0, f = y.length; n < f; n++)
                                if (w = g.map.get(y[n]))
                                    for (u = 0, l = w.length; u < l; u++) b = w[u], x = b.id, !K[x] && this.matchesSelector(e, b.selector) && (K[x] = !0, z.push(b))
                        }
                    return z.sort(P)
                };
                var c = {},
                    d = {},
                    k = new WeakMap,
                    j = new WeakMap,
                    L = new WeakMap,
                    N = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");

                function a(e, t, n) {
                    var u = e[t];
                    return e[t] = function() {
                        return n.apply(e, arguments), u.apply(e, arguments)
                    }, e
                }
                o(a, "before");

                function s(e, t, n) {
                    var u = [],
                        i = t;
                    do {
                        if (i.nodeType !== 1) break;
                        var f = e.matches(i);
                        if (f.length) {
                            var l = {
                                node: i,
                                observers: f
                            };
                            n ? u.unshift(l) : u.push(l)
                        }
                    } while (i = i.parentElement);
                    return u
                }
                o(s, "dist_matches");

                function r() {
                    k.set(this, !0)
                }
                o(r, "trackPropagation");

                function m() {
                    k.set(this, !0), j.set(this, !0)
                }
                o(m, "trackImmediate");

                function h() {
                    return L.get(this) || null
                }
                o(h, "getCurrentTarget");

                function p(e, t) {
                    !N || Object.defineProperty(e, "currentTarget", {
                        configurable: !0,
                        enumerable: !0,
                        get: t || N.get
                    })
                }
                o(p, "defineCurrentTarget");

                function F(e) {
                    try {
                        return e.eventPhase, !0
                    } catch {
                        return !1
                    }
                }
                o(F, "canDispatch");

                function O(e) {
                    if (!!F(e)) {
                        var t = e.eventPhase === 1 ? d : c,
                            n = t[e.type];
                        if (!!n) {
                            var u = s(n, e.target, e.eventPhase === 1);
                            if (!!u.length) {
                                a(e, "stopPropagation", r), a(e, "stopImmediatePropagation", m), p(e, h);
                                for (var i = 0, f = u.length; i < f && !k.get(e); i++) {
                                    var l = u[i];
                                    L.set(e, l.node);
                                    for (var g = 0, y = l.observers.length; g < y && !j.get(e); g++) l.observers[g].data.call(l.node, e)
                                }
                                L.delete(e), p(e)
                            }
                        }
                    }
                }
                o(O, "dispatch");

                function W(e, t, n) {
                    var u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
                        i = !!u.capture,
                        f = i ? d : c,
                        l = f[e];
                    l || (l = new v, f[e] = l, document.addEventListener(e, O, i)), l.add(t, n)
                }
                o(W, "on");

                function G(e, t, n) {
                    var u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
                        i = !!u.capture,
                        f = i ? d : c,
                        l = f[e];
                    !l || (l.remove(t, n), !l.size && (delete f[e], document.removeEventListener(e, O, i)))
                }
                o(G, "off");

                function B(e, t, n) {
                    return e.dispatchEvent(new CustomEvent(t, {
                        bubbles: !0,
                        cancelable: !0,
                        detail: n
                    }))
                }
                o(B, "fire")
            },
            11793: (U, I, H) => {
                H.d(I, {
                    EL: () => M,
                    N9: () => L,
                    Tz: () => N
                });
                class v {
                    constructor(s) {
                        this.children = [], this.parent = s
                    }
                    delete(s) {
                        const r = this.children.indexOf(s);
                        return r === -1 ? !1 : (this.children = this.children.slice(0, r).concat(this.children.slice(r + 1)), this.children.length === 0 && this.parent.delete(this), !0)
                    }
                    add(s) {
                        return this.children.push(s), this
                    }
                }
                o(v, "Leaf");
                class E {
                    constructor(s) {
                        this.parent = null, this.children = {}, this.parent = s || null
                    }
                    get(s) {
                        return this.children[s]
                    }
                    insert(s) {
                        let r = this;
                        for (let m = 0; m < s.length; m += 1) {
                            const h = s[m];
                            let p = r.get(h);
                            if (m === s.length - 1) return p instanceof E && (r.delete(p), p = null), p || (p = new v(r), r.children[h] = p), p;
                            p instanceof v && (p = null), p || (p = new E(r), r.children[h] = p), r = p
                        }
                        return r
                    }
                    delete(s) {
                        for (const r in this.children)
                            if (this.children[r] === s) {
                                const h = delete this.children[r];
                                return Object.keys(this.children).length === 0 && this.parent && this.parent.delete(this), h
                            }
                        return !1
                    }
                }
                o(E, "RadixTrie");

                function A(a) {
                    if (!(a instanceof HTMLElement)) return !1;
                    const s = a.nodeName.toLowerCase(),
                        r = (a.getAttribute("type") || "").toLowerCase();
                    return s === "select" || s === "textarea" || s === "input" && r !== "submit" && r !== "reset" && r !== "checkbox" && r !== "radio" || a.isContentEditable
                }
                o(A, "isFormField");

                function D(a, s) {
                    const r = new CustomEvent("hotkey-fire", {
                        cancelable: !0,
                        detail: {
                            path: s
                        }
                    });
                    !a.dispatchEvent(r) || (A(a) ? a.focus() : a.click())
                }
                o(D, "fireDeterminedAction");

                function q(a) {
                    const s = [];
                    let r = [""],
                        m = !1;
                    for (let h = 0; h < a.length; h++) {
                        if (m && a[h] === ",") {
                            s.push(r), r = [""], m = !1;
                            continue
                        }
                        if (a[h] === " ") {
                            r.push(""), m = !1;
                            continue
                        } else a[h] === "+" ? m = !1 : m = !0;
                        r[r.length - 1] += a[h]
                    }
                    return s.push(r), s.map(h => h.filter(p => p !== "")).filter(h => h.length > 0)
                }
                o(q, "expandHotkeyToEdges");

                function M(a) {
                    const {
                        ctrlKey: s,
                        altKey: r,
                        metaKey: m,
                        key: h
                    } = a, p = [], F = [s, r, m, R(a)];
                    for (const [O, W] of F.entries()) W && p.push(S[O]);
                    return S.includes(h) || p.push(h), p.join("+")
                }
                o(M, "hotkey");
                const S = ["Control", "Alt", "Meta", "Shift"];

                function R(a) {
                    const {
                        shiftKey: s,
                        code: r,
                        key: m
                    } = a;
                    return s && !(r.startsWith("Key") && m.toUpperCase() === m)
                }
                o(R, "showShift");
                const T = new E,
                    C = new WeakMap;
                let P = T,
                    c = null,
                    d = [];

                function k() {
                    d = [], c = null, P = T
                }
                o(k, "resetTriePosition");

                function j(a) {
                    if (a.defaultPrevented || !(a.target instanceof Node)) return;
                    if (A(a.target)) {
                        const r = a.target;
                        if (!r.id || !r.ownerDocument.querySelector(`[data-hotkey-scope="${r.id}"]`)) return
                    }
                    c != null && window.clearTimeout(c), c = window.setTimeout(k, 1500);
                    const s = P.get(M(a));
                    if (!s) {
                        k();
                        return
                    }
                    if (d.push(M(a)), P = s, s instanceof v) {
                        const r = a.target;
                        let m = !1,
                            h;
                        const p = A(r);
                        for (let F = s.children.length - 1; F >= 0; F -= 1) {
                            h = s.children[F];
                            const O = h.getAttribute("data-hotkey-scope");
                            if (!p && !O || p && r.id === O) {
                                m = !0;
                                break
                            }
                        }
                        h && m && (D(h, d), a.preventDefault()), k()
                    }
                }
                o(j, "keyDownHandler");

                function L(a, s) {
                    Object.keys(T.children).length === 0 && document.addEventListener("keydown", j);
                    const m = q(s || a.getAttribute("data-hotkey") || "").map(h => T.insert(h).add(a));
                    C.set(a, m)
                }
                o(L, "install");

                function N(a) {
                    const s = C.get(a);
                    if (s && s.length)
                        for (const r of s) r && r.delete(a);
                    Object.keys(T.children).length === 0 && document.removeEventListener("keydown", j)
                }
                o(N, "uninstall")
            }
        }
    ]);
})();

//# sourceMappingURL=9255-70889d35f744.js.map