"use strict";
(() => {
    var z = Object.defineProperty;
    var s = (q, C) => z(q, "name", {
        value: C,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [3465, 1602, 695], {
            65935: (q, C, k) => {
                k.d(C, {
                    AC: () => S,
                    rK: () => u,
                    uT: () => d
                });

                function m(i, o) {
                    const h = i.createElement("template");
                    return h.innerHTML = o, i.importNode(h.content, !0)
                }
                s(m, "parseHTML");

                function y(i) {
                    const o = new URLSearchParams,
                        h = new FormData(i).entries();
                    for (const [E, _] of [...h]) o.append(E, _.toString());
                    return o.toString()
                }
                s(y, "serialize");
                class L extends Error {
                    constructor(o, h) {
                        super(o);
                        this.response = h
                    }
                }
                s(L, "ErrorWithResponse");

                function x() {
                    let i, o;
                    return [new Promise(function(E, _) {
                        i = E, o = _
                    }), i, o]
                }
                s(x, "makeDeferred");
                let f;
                const j = [],
                    l = [];

                function d(i) {
                    j.push(i)
                }
                s(d, "afterRemote");

                function u(i) {
                    l.push(i)
                }
                s(u, "beforeRemote");

                function S(i, o) {
                    f || (f = new Map, document.addEventListener("submit", M));
                    const h = f.get(i) || [];
                    f.set(i, [...h, o])
                }
                s(S, "remoteForm");

                function T(i, o) {
                    if (f) {
                        const h = f.get(i) || [];
                        f.set(i, h.filter(E => E !== o))
                    }
                }
                s(T, "remoteUninstall");

                function R(i) {
                    const o = [];
                    for (const h of f.keys())
                        if (i.matches(h)) {
                            const E = f.get(h) || [];
                            o.push(...E)
                        }
                    return o
                }
                s(R, "getMatches");

                function M(i) {
                    if (!(i.target instanceof HTMLFormElement)) return;
                    const o = i.target,
                        h = R(o);
                    if (h.length === 0) return;
                    const E = U(o),
                        [_, A, F] = x();
                    i.preventDefault(), O(h, o, E, _).then(async H => {
                        if (H) {
                            for (const D of l) await D(o);
                            W(E).then(A, F).catch(() => {}).then(() => {
                                for (const D of j) D(o)
                            })
                        } else o.submit()
                    }, H => {
                        o.submit(), setTimeout(() => {
                            throw H
                        })
                    })
                }
                s(M, "handleSubmit");
                async function O(i, o, h, E) {
                    let _ = !1;
                    for (const A of i) {
                        const [F, H] = x(), D = s(() => (_ = !0, H(), E), "kick"), X = {
                            text: D,
                            json: () => (h.headers.set("Accept", "application/json"), D()),
                            html: () => (h.headers.set("Accept", "text/html"), D())
                        };
                        await Promise.race([F, A(o, X, h)])
                    }
                    return _
                }
                s(O, "processHandlers");

                function U(i) {
                    const o = {
                        method: i.method || "GET",
                        url: i.action,
                        headers: new Headers({
                            "X-Requested-With": "XMLHttpRequest"
                        }),
                        body: null
                    };
                    if (o.method.toUpperCase() === "GET") {
                        const h = y(i);
                        h && (o.url += (~o.url.indexOf("?") ? "&" : "?") + h)
                    } else o.body = new FormData(i);
                    return o
                }
                s(U, "buildRequest");
                async function W(i) {
                    const o = await window.fetch(i.url, {
                            method: i.method,
                            body: i.body !== null ? i.body : void 0,
                            headers: i.headers,
                            credentials: "same-origin"
                        }),
                        h = {
                            url: o.url,
                            status: o.status,
                            statusText: o.statusText,
                            headers: o.headers,
                            text: "",
                            get json() {
                                const _ = this,
                                    A = JSON.parse(_.text);
                                return delete _.json, _.json = A, _.json
                            },
                            get html() {
                                const _ = this;
                                return delete _.html, _.html = m(document, _.text), _.html
                            }
                        },
                        E = await o.text();
                    if (h.text = E, o.ok) return h;
                    throw new L("request failed", h)
                }
                s(W, "remoteSubmit")
            },
            59753: (q, C, k) => {
                k.d(C, {
                    f: () => B,
                    on: () => X
                });

                function m() {
                    if (!(this instanceof m)) return new m;
                    this.size = 0, this.uid = 0, this.selectors = [], this.selectorObjects = {}, this.indexes = Object.create(this.indexes), this.activeIndexes = []
                }
                s(m, "SelectorSet");
                var y = window.document.documentElement,
                    L = y.matches || y.webkitMatchesSelector || y.mozMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
                m.prototype.matchesSelector = function(e, t) {
                    return L.call(e, t)
                }, m.prototype.querySelectorAll = function(e, t) {
                    return t.querySelectorAll(e)
                }, m.prototype.indexes = [];
                var x = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                m.prototype.indexes.push({
                    name: "ID",
                    selector: s(function(t) {
                        var n;
                        if (n = t.match(x)) return n[0].slice(1)
                    }, "matchIdSelector"),
                    element: s(function(t) {
                        if (t.id) return [t.id]
                    }, "getElementId")
                });
                var f = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                m.prototype.indexes.push({
                    name: "CLASS",
                    selector: s(function(t) {
                        var n;
                        if (n = t.match(f)) return n[0].slice(1)
                    }, "matchClassSelector"),
                    element: s(function(t) {
                        var n = t.className;
                        if (n) {
                            if (typeof n == "string") return n.split(/\s/);
                            if (typeof n == "object" && "baseVal" in n) return n.baseVal.split(/\s/)
                        }
                    }, "getElementClassNames")
                });
                var j = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                m.prototype.indexes.push({
                    name: "TAG",
                    selector: s(function(t) {
                        var n;
                        if (n = t.match(j)) return n[0].toUpperCase()
                    }, "matchTagSelector"),
                    element: s(function(t) {
                        return [t.nodeName.toUpperCase()]
                    }, "getElementTagName")
                }), m.prototype.indexes.default = {
                    name: "UNIVERSAL",
                    selector: function() {
                        return !0
                    },
                    element: function() {
                        return [!0]
                    }
                };
                var l;
                typeof window.Map == "function" ? l = window.Map : l = function() {
                    function e() {
                        this.map = {}
                    }
                    return s(e, "Map"), e.prototype.get = function(t) {
                        return this.map[t + " "]
                    }, e.prototype.set = function(t, n) {
                        this.map[t + " "] = n
                    }, e
                }();
                var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

                function u(e, t) {
                    e = e.slice(0).concat(e.default);
                    var n = e.length,
                        c, r, p, a, g = t,
                        v, b, w = [];
                    do
                        if (d.exec(""), (p = d.exec(g)) && (g = p[3], p[2] || !g)) {
                            for (c = 0; c < n; c++)
                                if (b = e[c], v = b.selector(p[1])) {
                                    for (r = w.length, a = !1; r--;)
                                        if (w[r].index === b && w[r].key === v) {
                                            a = !0;
                                            break
                                        }
                                    a || w.push({
                                        index: b,
                                        key: v
                                    });
                                    break
                                }
                        }
                    while (p);
                    return w
                }
                s(u, "parseSelectorIndexes");

                function S(e, t) {
                    var n, c, r;
                    for (n = 0, c = e.length; n < c; n++)
                        if (r = e[n], t.isPrototypeOf(r)) return r
                }
                s(S, "findByPrototype"), m.prototype.logDefaultIndexUsed = function() {}, m.prototype.add = function(e, t) {
                    var n, c, r, p, a, g, v, b, w = this.activeIndexes,
                        P = this.selectors,
                        I = this.selectorObjects;
                    if (typeof e == "string") {
                        for (n = {
                                id: this.uid++,
                                selector: e,
                                data: t
                            }, I[n.id] = n, v = u(this.indexes, e), c = 0; c < v.length; c++) b = v[c], p = b.key, r = b.index, a = S(w, r), a || (a = Object.create(r), a.map = new l, w.push(a)), r === this.indexes.default && this.logDefaultIndexUsed(n), g = a.map.get(p), g || (g = [], a.map.set(p, g)), g.push(n);
                        this.size++, P.push(e)
                    }
                }, m.prototype.remove = function(e, t) {
                    if (typeof e == "string") {
                        var n, c, r, p, a, g, v, b, w = this.activeIndexes,
                            P = this.selectors = [],
                            I = this.selectorObjects,
                            N = {},
                            $ = arguments.length === 1;
                        for (n = u(this.indexes, e), r = 0; r < n.length; r++)
                            for (c = n[r], p = w.length; p--;)
                                if (g = w[p], c.index.isPrototypeOf(g)) {
                                    if (v = g.map.get(c.key), v)
                                        for (a = v.length; a--;) b = v[a], b.selector === e && ($ || b.data === t) && (v.splice(a, 1), N[b.id] = !0);
                                    break
                                }
                        for (r in N) delete I[r], this.size--;
                        for (r in I) P.push(I[r].selector)
                    }
                };

                function T(e, t) {
                    return e.id - t.id
                }
                s(T, "sortById"), m.prototype.queryAll = function(e) {
                    if (!this.selectors.length) return [];
                    var t = {},
                        n = [],
                        c = this.querySelectorAll(this.selectors.join(", "), e),
                        r, p, a, g, v, b, w, P;
                    for (r = 0, a = c.length; r < a; r++)
                        for (v = c[r], b = this.matches(v), p = 0, g = b.length; p < g; p++) P = b[p], t[P.id] ? w = t[P.id] : (w = {
                            id: P.id,
                            selector: P.selector,
                            data: P.data,
                            elements: []
                        }, t[P.id] = w, n.push(w)), w.elements.push(v);
                    return n.sort(T)
                }, m.prototype.matches = function(e) {
                    if (!e) return [];
                    var t, n, c, r, p, a, g, v, b, w, P, I = this.activeIndexes,
                        N = {},
                        $ = [];
                    for (t = 0, r = I.length; t < r; t++)
                        if (g = I[t], v = g.element(e), v) {
                            for (n = 0, p = v.length; n < p; n++)
                                if (b = g.map.get(v[n]))
                                    for (c = 0, a = b.length; c < a; c++) w = b[c], P = w.id, !N[P] && this.matchesSelector(e, w.selector) && (N[P] = !0, $.push(w))
                        }
                    return $.sort(T)
                };
                var R = {},
                    M = {},
                    O = new WeakMap,
                    U = new WeakMap,
                    W = new WeakMap,
                    i = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");

                function o(e, t, n) {
                    var c = e[t];
                    return e[t] = function() {
                        return n.apply(e, arguments), c.apply(e, arguments)
                    }, e
                }
                s(o, "before");

                function h(e, t, n) {
                    var c = [],
                        r = t;
                    do {
                        if (r.nodeType !== 1) break;
                        var p = e.matches(r);
                        if (p.length) {
                            var a = {
                                node: r,
                                observers: p
                            };
                            n ? c.unshift(a) : c.push(a)
                        }
                    } while (r = r.parentElement);
                    return c
                }
                s(h, "dist_matches");

                function E() {
                    O.set(this, !0)
                }
                s(E, "trackPropagation");

                function _() {
                    O.set(this, !0), U.set(this, !0)
                }
                s(_, "trackImmediate");

                function A() {
                    return W.get(this) || null
                }
                s(A, "getCurrentTarget");

                function F(e, t) {
                    !i || Object.defineProperty(e, "currentTarget", {
                        configurable: !0,
                        enumerable: !0,
                        get: t || i.get
                    })
                }
                s(F, "defineCurrentTarget");

                function H(e) {
                    try {
                        return e.eventPhase, !0
                    } catch {
                        return !1
                    }
                }
                s(H, "canDispatch");

                function D(e) {
                    if (!!H(e)) {
                        var t = e.eventPhase === 1 ? M : R,
                            n = t[e.type];
                        if (!!n) {
                            var c = h(n, e.target, e.eventPhase === 1);
                            if (!!c.length) {
                                o(e, "stopPropagation", E), o(e, "stopImmediatePropagation", _), F(e, A);
                                for (var r = 0, p = c.length; r < p && !O.get(e); r++) {
                                    var a = c[r];
                                    W.set(e, a.node);
                                    for (var g = 0, v = a.observers.length; g < v && !U.get(e); g++) a.observers[g].data.call(a.node, e)
                                }
                                W.delete(e), F(e)
                            }
                        }
                    }
                }
                s(D, "dispatch");

                function X(e, t, n) {
                    var c = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
                        r = !!c.capture,
                        p = r ? M : R,
                        a = p[e];
                    a || (a = new m, p[e] = a, document.addEventListener(e, D, r)), a.add(t, n)
                }
                s(X, "on");

                function K(e, t, n) {
                    var c = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
                        r = !!c.capture,
                        p = r ? M : R,
                        a = p[e];
                    !a || (a.remove(t, n), !a.size && (delete p[e], document.removeEventListener(e, D, r)))
                }
                s(K, "off");

                function B(e, t, n) {
                    return e.dispatchEvent(new CustomEvent(t, {
                        bubbles: !0,
                        cancelable: !0,
                        detail: n
                    }))
                }
                s(B, "fire")
            },
            52660: (q, C, k) => {
                k.d(C, {
                    D: () => x,
                    a: () => L
                });
                var m = k(2699),
                    y = k(10900);
                async function L(f, j, l) {
                    const d = new Request(j, l);
                    d.headers.append("X-Requested-With", "XMLHttpRequest");
                    const u = await self.fetch(d);
                    if (u.status < 200 || u.status >= 300) throw new Error(`HTTP ${u.status}${u.statusText||""}`);
                    return (0, m.t)((0, m.P)(f), u), (0, y.r)(f, await u.text())
                }
                s(L, "fetchSafeDocumentFragment");

                function x(f, j, l = 1e3) {
                    return s(async function d(u) {
                        const S = new Request(f, j);
                        S.headers.append("X-Requested-With", "XMLHttpRequest");
                        const T = await self.fetch(S);
                        if (T.status < 200 || T.status >= 300) throw new Error(`HTTP ${T.status}${T.statusText||""}`);
                        if (T.status === 200) return T;
                        if (T.status === 202) return await new Promise(R => setTimeout(R, u)), d(u * 1.5);
                        throw new Error(`Unexpected ${T.status} response status from poll endpoint`)
                    }, "poll")(l)
                }
                s(x, "fetchPoll")
            },
            2699: (q, C, k) => {
                k.d(C, {
                    P: () => m,
                    t: () => L
                });

                function m(x) {
                    const f = [...x.querySelectorAll("meta[name=html-safe-nonce]")].map(j => j.content);
                    if (f.length < 1) throw new Error("could not find html-safe-nonce on document");
                    return f
                }
                s(m, "getDocumentHtmlSafeNonces");
                class y extends Error {
                    constructor(f, j) {
                        super(`${f} for HTTP ${j.status}`);
                        this.response = j
                    }
                }
                s(y, "ResponseError");

                function L(x, f, j = !1) {
                    const l = f.headers.get("content-type") || "";
                    if (!j && !l.startsWith("text/html")) throw new y(`expected response with text/html, but was ${l}`, f);
                    if (j && !(l.startsWith("text/html") || l.startsWith("application/json"))) throw new y(`expected response with text/html or application/json, but was ${l}`, f);
                    const d = f.headers.get("x-html-safe");
                    if (d) {
                        if (!x.includes(d)) throw new y("response X-HTML-Safe nonce did not match", f)
                    } else throw new y("missing X-HTML-Safe nonce", f)
                }
                s(L, "verifyResponseHtmlSafeNonce")
            },
            10900: (q, C, k) => {
                k.d(C, {
                    r: () => m
                });

                function m(y, L) {
                    const x = y.createElement("template");
                    return x.innerHTML = L, y.importNode(x.content, !0)
                }
                s(m, "parseHTML")
            },
            19089: (q, C, k) => {
                var m = k(52660),
                    y = k(59753),
                    L = k(65935);
                (0, y.on)("click", ".js-accept-topic-button", function(l) {
                    const d = l.currentTarget,
                        u = d.closest(".js-topic-form-area"),
                        S = d.closest(".js-topic-suggestion"),
                        T = u.querySelector(".js-template"),
                        R = u.querySelector(".js-tag-input-selected-tags"),
                        M = T.cloneNode(!0),
                        O = d.getAttribute("data-topic-name") || "";
                    M.querySelector("input").value = O, M.querySelector(".js-placeholder-tag-name").replaceWith(O), M.classList.remove("d-none", "js-template"), R.appendChild(M), S.remove(), x(u)
                }), (0, L.AC)(".js-accept-topic-form", async function(l, d) {
                    await d.html();
                    const u = l.closest(".js-topic-form-area"),
                        S = l.closest(".js-topic-suggestion"),
                        T = u.querySelector(".js-template"),
                        R = u.querySelector(".js-tag-input-selected-tags"),
                        M = T.cloneNode(!0),
                        O = S.querySelector('input[name="input[name]"]').value;
                    M.querySelector("input").value = O, M.querySelector(".js-placeholder-tag-name").replaceWith(O), M.classList.remove("d-none", "js-template"), R.appendChild(M), S.remove(), j(u), x(u), f(l)
                }), (0, y.on)("click", ".js-decline-topic-button", function(l) {
                    const d = l.currentTarget,
                        u = d.closest(".js-topic-form-area"),
                        S = d.closest(".js-topic-suggestion");
                    setTimeout(() => {
                        S.remove(), x(u)
                    }, 0)
                }), (0, L.AC)(".js-decline-topic-form", async function(l, d) {
                    await d.html(), f(l);
                    const u = l.closest(".js-topic-form-area");
                    l.closest(".js-topic-suggestion").remove(), j(u), x(u)
                });

                function x(l) {
                    const d = l.querySelector(".js-topic-suggestions-box");
                    d.querySelector(".js-topic-suggestion") || d.remove()
                }
                s(x, "removeEmptySuggestionList");

                function f(l) {
                    const u = l.closest(".js-topic-save-notice-container").querySelector(".js-repo-topics-save-notice");
                    u.classList.remove("d-none"), u.classList.add("d-inline-block", "anim-fade-in"), setTimeout(() => {
                        u.classList.remove("d-inline-block"), u.classList.add("d-none")
                    }, 1900)
                }
                s(f, "flashNotice");
                async function j(l) {
                    const d = l.querySelector(".js-topic-suggestions-container");
                    if (!d) return;
                    const u = d.getAttribute("data-url");
                    if (!u) throw new Error("could not get url");
                    const S = await (0, m.a)(document, u);
                    d.innerHTML = "", d.appendChild(S)
                }
                s(j, "refreshSuggestions")
            }
        },
        q => {
            var C = s(m => q(q.s = m), "__webpack_exec__"),
                k = C(19089)
        }
    ]);
})();

//# sourceMappingURL=topic-suggestions-f9b6c81c80c7.js.map