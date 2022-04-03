"use strict";
(() => {
    var ie = Object.defineProperty;
    var o = (O, x) => ie(O, "name", {
        value: x,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [3826], {
            1314: (O, x, l) => {
                l.d(x, {
                    N: () => p,
                    x: () => _
                });
                var y = l(34782);
                let h = null;
                (async function() {
                    await y.x, c()
                })();

                function p(i) {
                    _(a(i))
                }
                o(p, "announceFromElement");

                function _(i) {
                    !h || (h.textContent = "", h.textContent = i)
                }
                o(_, "announce");

                function c() {
                    h = document.createElement("div"), h.setAttribute("aria-live", "polite"), h.classList.add("sr-only"), document.body.append(h)
                }
                o(c, "createNoticeContainer");

                function a(i) {
                    return (i.getAttribute("aria-label") || i.innerText || "").trim()
                }
                o(a, "getTextContent")
            },
            83954: (O, x, l) => {
                var y = l(64463),
                    h = l(58797);
                (0, y.N7)(".js-check-all-container", {
                    constructor: HTMLElement,
                    subscribe: h.Z
                })
            },
            79046: (O, x, l) => {
                l.d(x, {
                    O4: () => R,
                    jo: () => D,
                    Qp: () => P
                });
                var y = l(70130),
                    h = l(59753);
                const p = "ontransitionend" in window;

                function _(f, b) {
                    if (!p) {
                        b();
                        return
                    }
                    const T = Array.from(f.querySelectorAll(".js-transitionable"));
                    f.classList.contains("js-transitionable") && T.push(f);
                    for (const L of T) {
                        const I = c(L);
                        L instanceof HTMLElement && (L.addEventListener("transitionend", () => {
                            L.style.display = "", L.style.visibility = "", I && a(L, function() {
                                L.style.height = ""
                            })
                        }, {
                            once: !0
                        }), L.style.boxSizing = "content-box", L.style.display = "block", L.style.visibility = "visible", I && a(L, function() {
                            L.style.height = getComputedStyle(L).height
                        }), L.offsetHeight)
                    }
                    b();
                    for (const L of T)
                        if (L instanceof HTMLElement && c(L)) {
                            const I = getComputedStyle(L).height;
                            L.style.boxSizing = "", I === "0px" ? L.style.height = `${L.scrollHeight}px` : L.style.height = "0px"
                        }
                }
                o(_, "performTransition");

                function c(f) {
                    return getComputedStyle(f).transitionProperty === "height"
                }
                o(c, "isTransitioningHeight");

                function a(f, b) {
                    f.style.transition = "none", b(), f.offsetHeight, f.style.transition = ""
                }
                o(a, "withoutTransition");
                var i = l(96776);

                function n(f, b) {
                    b.find(T => {
                        const L = f.querySelectorAll(T),
                            I = L[L.length - 1];
                        if (I && document.activeElement !== I) return I.focus(), !0
                    })
                }
                o(n, "findAndFocusByQuerySelector");

                function t(f) {
                    n(f, [".js-focus-on-dismiss", "input[autofocus], textarea[autofocus]"])
                }
                o(t, "restoreAutofocus");

                function s(f) {
                    !f.classList.contains("tooltipped") || (f.classList.remove("tooltipped"), f.addEventListener("mouseleave", () => {
                        f.classList.add("tooltipped"), f.blur()
                    }, {
                        once: !0
                    }))
                }
                o(s, "hideTooltip");

                function u(f) {
                    return [...document.querySelectorAll(".js-details-container")].filter(b => b.getAttribute("data-details-container-group") === f)
                }
                o(u, "groupMembers");

                function C(f) {
                    return [...f.querySelectorAll(".js-details-target")].filter(b => b.closest(".js-details-container") === f)
                }
                o(C, "containerTargets");

                function S(f, b) {
                    const T = f.getAttribute("data-details-container-group");
                    return T ? ((0, i.uQ)(f, () => {
                        for (const L of u(T)) L !== f && M(L, b)
                    }), T) : null
                }
                o(S, "toggleGroup");

                function M(f, b) {
                    f.classList.toggle("open", b), f.classList.toggle("Details--on", b);
                    for (const T of C(f)) T.setAttribute("aria-expanded", b.toString())
                }
                o(M, "updateOpenState");

                function P(f, b) {
                    var T, L;
                    const I = f.getAttribute("data-details-container") || ".js-details-container",
                        $ = f.closest(I),
                        z = (T = b == null ? void 0 : b.force) != null ? T : !$.classList.contains("open"),
                        V = (L = b == null ? void 0 : b.withGroup) != null ? L : !1;
                    _($, () => {
                        M($, z);
                        const r = V ? S($, z) : null;
                        Promise.resolve().then(() => {
                            t($), s(f), $.dispatchEvent(new CustomEvent("details:toggled", {
                                bubbles: !0,
                                cancelable: !1,
                                detail: {
                                    open: z
                                }
                            })), r && $.dispatchEvent(new CustomEvent("details:toggled-group", {
                                bubbles: !0,
                                cancelable: !1,
                                detail: {
                                    open: z,
                                    group: r
                                }
                            }))
                        })
                    })
                }
                o(P, "toggleDetailsTarget");

                function D(f) {
                    const b = f.getAttribute("data-details-container") || ".js-details-container",
                        L = f.closest(b).classList;
                    return L.contains("Details--on") || L.contains("open")
                }
                o(D, "isDetailsTargetExpanded");

                function H(f) {
                    const b = f.altKey,
                        T = f.currentTarget;
                    P(T, {
                        withGroup: b
                    }), f.preventDefault()
                }
                o(H, "handleDetailsTargetClick"), (0, h.on)("click", ".js-details-target", H), (0, y.Z)(function({
                    target: f
                }) {
                    f && R(f)
                });

                function R(f) {
                    let b = !1,
                        T = f.parentElement;
                    for (; T;) T.classList.contains("Details-content--shown") && (b = !0), T.classList.contains("js-details-container") && (T.classList.toggle("open", !b), T.classList.toggle("Details--on", !b), b = !1), T = T.parentElement
                }
                o(R, "ensureExpanded")
            },
            64909: (O, x, l) => {
                var y = l(57443),
                    h = l(59753),
                    p = l(1314);

                function _(e, d, g, v = {}) {
                    var m;
                    const E = (m = v.limit) != null ? m : 1 / 0;
                    let k = 0;
                    for (const W of e.children) {
                        const A = g(W, d);
                        A == null || (A && k < E ? (k++, c(W, !0)) : c(W, !1))
                    }
                    return k
                }
                o(_, "filterList");

                function c(e, d) {
                    e.style.display = d ? "" : "none", e.hidden = !d
                }
                o(c, "toggle");
                var a = l(34821),
                    i = l(71900);
                const n = new WeakMap;

                function t(e, d, g) {
                    const v = d.toLowerCase(),
                        m = g.limit;
                    let E = n.get(e);
                    const k = e.querySelector('input[type="radio"]:checked'),
                        W = Array.from(e.children);
                    E || (E = Array.from(e.children), n.set(e, E));
                    for (const U of W) e.removeChild(U), U instanceof HTMLElement && (U.style.display = "");
                    const A = v ? (0, i.W)(E, g.sortKey, a.qu) : E,
                        K = m == null ? A : A.slice(0, m),
                        F = K.length,
                        B = document.createDocumentFragment();
                    for (const U of K) B.appendChild(U);
                    let N = !1;
                    if (k instanceof HTMLInputElement)
                        for (const U of B.querySelectorAll('input[type="radio"]:checked')) U instanceof HTMLInputElement && U.value !== k.value && (U.checked = !1, N = !0);
                    e.appendChild(B), k && N && k.dispatchEvent(new Event("change", {
                        bubbles: !0
                    }));
                    const X = e.querySelectorAll(".js-divider");
                    for (const U of X) U.classList.toggle("d-none", Boolean(v && v.trim().length > 0));
                    return F
                }
                o(t, "filterSortList");
                var s = l(12020),
                    u = l(64463),
                    C = l(85830);
                let S = new AbortController;
                const M = new WeakMap,
                    P = new WeakMap,
                    D = new WeakMap;
                async function H(e, d, g, v) {
                    g && !M.has(e) && b(e);
                    const m = await R(e, d, g, v);
                    return e.hasAttribute("data-filterable-data-pre-rendered") && (m.suggestions = f(e, g)), m
                }
                o(H, "getData");
                async function R(e, d, g, v) {
                    const m = new URL(e.getAttribute("data-filterable-src") || "", window.location.origin);
                    if (m.pathname === "/") throw new Error("could not get data-filterable-src");
                    if (g) {
                        const E = M.get(e),
                            k = d.trim();
                        if (E.lastSearchText === k) return E.lastSearchResult;
                        const W = E.lastSearchText === void 0;
                        E.lastSearchText = k;
                        const A = e.getAttribute("data-filterable-for") || "",
                            K = document.getElementById(A);
                        if (S.abort(), k === "" && !v) E.lastSearchResult = {
                            suggestions: [],
                            users: []
                        };
                        else {
                            S = new AbortController;
                            const F = {
                                    headers: {
                                        Accept: "application/json",
                                        "X-Requested-With": "XMLHttpRequest"
                                    },
                                    signal: S.signal
                                },
                                B = m.searchParams || new URLSearchParams;
                            B.set("q", d), B.set("typeAhead", "true"), m.search = B.toString(), W || K == null || K.classList.add("is-loading");
                            const N = await fetch(m.toString(), F);
                            E.lastSearchResult = await N.json()
                        }
                        return K == null || K.classList.remove("is-loading"), E.lastSearchResult
                    } else {
                        const E = {
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        };
                        return await (await fetch(m.toString(), E)).json()
                    }
                }
                o(R, "fetchQueryIfNeeded");

                function f(e, d) {
                    const g = [],
                        v = e.querySelectorAll(".js-filterable-suggested-user");
                    if (v.length > 0)
                        for (const m of e.querySelectorAll(".js-filterable-suggested-user")) m.classList.remove("js-filterable-suggested-user"), g.push({
                            name: m.querySelector(".js-description").textContent,
                            login: m.querySelector(".js-username").textContent,
                            selected: m.getAttribute("aria-checked") === "true",
                            element: m,
                            suggestion: !0
                        });
                    if (d) {
                        const m = M.get(e);
                        return v.length > 0 && (m.cachedSuggestions = g, m.userResultCache.clear()), m.cachedSuggestions
                    }
                    return g
                }
                o(f, "getPreRenderedUsers");

                function b(e) {
                    M.set(e, {
                        lastSearchResult: {
                            suggestions: [],
                            users: []
                        },
                        cachedSuggestions: [],
                        userResultCache: new Map
                    })
                }
                o(b, "initializeTypeAheadCache");
                async function T(e, d, g) {
                    var v, m;
                    D.set(e, d), await (0, C.Z)();
                    const E = e.hasAttribute("data-filterable-show-suggestion-header"),
                        k = e.hasAttribute("data-filterable-type-ahead"),
                        W = e.hasAttribute("data-filterable-type-ahead-query-on-empty");
                    let A = P.get(e);
                    if (!A) try {
                        A = await H(e, d, k, W), k || P.set(e, A)
                    } catch (j) {
                        if (j.name === "AbortError") return -1;
                        throw j
                    }
                    if (!k && D.get(e) !== d) return -1;
                    const K = g.limit,
                        F = e.querySelector("template"),
                        B = {};
                    for (const j of e.querySelectorAll("input[type=hidden]")) B[`${j.name}${j.value}`] = j;
                    let N = F.nextElementSibling;
                    for (; N;) {
                        const j = N;
                        N = j.nextElementSibling, j instanceof HTMLElement && (k || j.getAttribute("aria-checked") === "true" || j.classList.contains("select-menu-divider")) ? j.hidden = !0 : j.remove()
                    }
                    let X = 0;
                    const U = d.trim() === "",
                        G = document.createDocumentFragment(),
                        Z = e.querySelector(".js-divider-suggestions"),
                        J = e.querySelector(".js-divider-rest"),
                        oe = M.get(e);

                    function Y(j) {
                        const te = `${j.login} ${j.name}`.toLowerCase().trim().includes(d),
                            Q = !(K != null && X >= K) && te;
                        if (Q || j.selected || j.suggestion) {
                            const q = L(j, F, B, oe);
                            q.hidden = !Q, Q && X++, G.appendChild(q)
                        }
                    }
                    o(Y, "addItem");
                    let ee = !1;
                    if (Z && (((v = A.suggestions) == null ? void 0 : v.length) > 0 || E && A.users.length > 0)) {
                        const j = (m = A.suggestions) != null ? m : [],
                            te = j.filter(q => q.selected),
                            Q = j.filter(q => !q.selected);
                        for (const q of te) Y(q);
                        G.appendChild(Z);
                        const ne = X;
                        for (const q of Q) Y(q);
                        ee = X > ne, Z.hidden = !ee || k && !U, E && A.users.length > 0 && (Z.hidden = !U)
                    }
                    J && G.appendChild(J);
                    const se = X;
                    for (const j of A.users) Y(j);
                    return J && (J.hidden = se === X || !ee), e.append(G), X
                }
                o(T, "substringMemoryFilterList");

                function L(e, d, g, v) {
                    if (e.element != null) return e.element;
                    if (v == null ? void 0 : v.userResultCache.has(e.id)) return v.userResultCache.get(e.id);
                    const m = d.content.cloneNode(!0),
                        E = m.querySelector("input[type=checkbox], input[type=radio]");
                    e.type && (E.name = `reviewer_${e.type}_ids[]`), E.value = e.id;
                    const k = `${E.name}${e.id}`;
                    let W = e.selected;
                    g[k] && (W = !0, g[k].remove(), delete g[k]);
                    const A = m.querySelector("[role^=menuitem]");
                    W && (A.setAttribute("aria-checked", "true"), E.checked = !0), e.disabled && A.setAttribute("aria-disabled", "true");
                    const K = m.querySelector(".js-username");
                    K && (K.textContent = e.login);
                    const F = m.querySelector(".js-description");
                    F && (F.textContent = e.name);
                    const B = m.querySelector(".js-extended-description");
                    B && (e.description ? B.textContent = e.description : B.remove());
                    const N = m.querySelector(".js-avatar");
                    return N.className = `${N.className} ${e.class}`, N.src = e.avatar, e.element = A, v == null || v.userResultCache.set(e.id, A), e.element
                }
                o(L, "createReviewerItem"), (0, u.N7)(".js-filterable-field", {
                    constructor: HTMLInputElement,
                    initialize(e) {
                        e.autocomplete || (e.autocomplete = "off");
                        const d = e.hasAttribute("type-ahead") ? 200 : null;
                        let g = e.value;
                        async function v(E) {
                            g !== E.value && (g = E.value, await (0, s.gJ)(), (0, h.f)(E, "filterable:change"))
                        }
                        o(v, "onInputChange");
                        async function m() {
                            g = e.value, await (0, s.gJ)(), (0, h.f)(e, "filterable:change")
                        }
                        return o(m, "onFocus"), {
                            add(E) {
                                E.addEventListener("focus", m), (0, y.oq)(E, v, {
                                    wait: d
                                }), document.activeElement === E && m()
                            },
                            remove(E) {
                                E.removeEventListener("focus", m), (0, y.iU)(E, v)
                            }
                        }
                    }
                }), (0, h.on)("filterable:change", ".js-filterable-field", async function(e) {
                    const d = e.currentTarget,
                        g = d.value.trim().toLowerCase(),
                        v = document.querySelectorAll(`[data-filterable-for="${d.id}"]`);
                    for (const m of v) {
                        const E = await $(m, g);
                        if (E === -1) return;
                        document.activeElement && d === document.activeElement && (0, p.x)(`${E} results found.`), m.dispatchEvent(new CustomEvent("filterable:change", {
                            bubbles: !0,
                            cancelable: !1,
                            detail: {
                                inputField: d
                            }
                        }))
                    }
                });

                function I(e) {
                    return e.hasAttribute("data-filter-value") ? e.getAttribute("data-filter-value").toLowerCase().trim() : e.textContent.toLowerCase().trim()
                }
                o(I, "defaultText");
                async function $(e, d) {
                    const g = parseInt(e.getAttribute("data-filterable-limit"), 10) || null;
                    let v = 0;
                    switch (e.getAttribute("data-filterable-type")) {
                        case "fuzzy":
                            {
                                const m = d.toLowerCase();v = t(e, d, {
                                    limit: g,
                                    sortKey: o(k => {
                                        const W = I(k),
                                            A = (0, a.EW)(W, m);
                                        return A > 0 ? {
                                            score: A,
                                            text: W
                                        } : null
                                    }, "sortKey")
                                });
                                break
                            }
                        case "substring":
                            v = _(e, d.toLowerCase(), V, {
                                limit: g
                            });
                            break;
                        case "substring-memory":
                            v = await T(e, d, {
                                limit: g
                            });
                            break;
                        default:
                            v = _(e, d.toLowerCase(), z, {
                                limit: g
                            });
                            break
                    }
                    return e.classList.toggle("filterable-active", d.length > 0), e.classList.toggle("filterable-empty", v === 0), v
                }
                o($, "filter");

                function z(e, d) {
                    return e.textContent.toLowerCase().trim().startsWith(d)
                }
                o(z, "prefix");

                function V(e, d) {
                    return e.hasAttribute("data-skip-substring-filter") || e.classList.contains("select-menu-no-results") ? null : (e.querySelector("[data-filterable-item-text]") || e).textContent.toLowerCase().trim().includes(d)
                }
                o(V, "substring"), (0, h.on)("filterable:change", "details-menu .select-menu-list", function(e) {
                    const d = e.currentTarget,
                        g = d.querySelector(".js-new-item-form");
                    g && r(d, g, e.detail.inputField.value)
                });

                function r(e, d, g) {
                    const v = g.length > 0 && !w(e, g);
                    if (e.classList.toggle("is-showing-new-item-form", v), !v) return;
                    d.querySelector(".js-new-item-name").textContent = g;
                    const m = d.querySelector(".js-new-item-value");
                    (m instanceof HTMLInputElement || m instanceof HTMLButtonElement) && (m.value = g)
                }
                o(r, "toggleForm");

                function w(e, d) {
                    for (const g of e.querySelectorAll("[data-menu-button-text]"))
                        if (g.textContent.toLowerCase().trim() === d.toLowerCase()) return !0;
                    return !1
                }
                o(w, "itemExists"), (0, u.N7)("tab-container .select-menu-list .filterable-empty, details-menu .select-menu-list .filterable-empty", {
                    add(e) {
                        e.closest(".select-menu-list").classList.add("filterable-empty")
                    },
                    remove(e) {
                        e.closest(".select-menu-list").classList.remove("filterable-empty")
                    }
                })
            },
            11997: (O, x, l) => {
                var y = l(59753);
                (0, y.on)("click", ".js-flash-close", function(h) {
                    const p = h.currentTarget.closest(".flash-messages");
                    h.currentTarget.closest(".flash").remove(), p && !p.querySelector(".flash") && p.remove()
                })
            },
            70130: (O, x, l) => {
                l.d(x, {
                    Z: () => _
                });
                var y = l(34782);
                const h = [];
                let p = 0;

                function _(t) {
                    (async function() {
                        h.push(t), await y.x, c()
                    })()
                }
                o(_, "hashChange"), _.clear = () => {
                    h.length = p = 0
                };

                function c() {
                    const t = p;
                    p = h.length, a(h.slice(t), null, window.location.href)
                }
                o(c, "runRemainingHandlers");

                function a(t, s, u) {
                    const C = window.location.hash.slice(1),
                        S = C ? document.getElementById(C) : null,
                        M = {
                            oldURL: s,
                            newURL: u,
                            target: S
                        };
                    for (const P of t) P.call(null, M)
                }
                o(a, "runHandlers");
                let i = window.location.href;
                window.addEventListener("popstate", function() {
                    i = window.location.href
                }), window.addEventListener("hashchange", function(t) {
                    const s = window.location.href;
                    try {
                        a(h, t.oldURL || i, s)
                    } finally {
                        i = s
                    }
                });
                let n = null;
                document.addEventListener("pjax:start", function() {
                    n = window.location.href
                }), document.addEventListener("pjax:end", function() {
                    a(h, n, window.location.href)
                })
            },
            42474: (O, x, l) => {
                l.d(x, {
                    h: () => h
                });
                var y = l(59753);
                (0, y.on)("click", ".js-skip-to-content", function(n) {
                    const t = document.getElementById("start-of-content");
                    if (t) {
                        const s = t.nextElementSibling;
                        s instanceof HTMLElement && (s.setAttribute("tabindex", "-1"), s.setAttribute("data-skipped-to-content", "1"), s.focus())
                    }
                    n.preventDefault()
                });

                function h() {
                    let n = !1;
                    const t = document.getElementById("start-of-content");
                    if (t) {
                        const s = t.nextElementSibling;
                        if (s instanceof HTMLElement) return n = s.getAttribute("data-skipped-to-content") === "1", n && s.removeAttribute("data-skipped-to-content"), n
                    }
                }
                o(h, "hasSkippedToContent");
                const p = "ontouchstart" in document;

                function _() {
                    return window.innerWidth > 1012
                }
                o(_, "compatibleDesktop");
                for (const n of document.querySelectorAll(".HeaderMenu-details")) n.addEventListener("toggle", a), p || (n.addEventListener("mouseover", i), n.addEventListener("mouseleave", i));
                let c = !1;

                function a(n) {
                    if (!c) {
                        c = !0;
                        for (const t of document.querySelectorAll(".HeaderMenu-details")) t !== n.currentTarget && t.removeAttribute("open");
                        setTimeout(() => c = !1)
                    }
                }
                o(a, "onMenuToggle");

                function i(n) {
                    const {
                        currentTarget: t
                    } = n;
                    !(t instanceof HTMLElement) || !_() || (n.type === "mouseover" && n instanceof MouseEvent ? n.target instanceof Node && n.relatedTarget instanceof Node && t.contains(n.target) && !t.contains(n.relatedTarget) && t.setAttribute("open", "") : t.removeAttribute("open"))
                }
                o(i, "onMenuHover")
            },
            25522: (O, x, l) => {
                var y = l(82453),
                    h = l(11793),
                    p = l(64463);
                (0, p.N7)("[data-hotkey]", {
                    constructor: HTMLElement,
                    add(c) {
                        if ((0, y.Ty)())(0, h.N9)(c);
                        else {
                            const a = c.getAttribute("data-hotkey");
                            if (a) {
                                const i = _(a);
                                i.length > 0 && (c.setAttribute("data-hotkey", i), (0, h.N9)(c))
                            }
                        }
                    },
                    remove(c) {
                        (0, h.Tz)(c)
                    }
                });

                function _(c) {
                    return c.split(",").filter(i => (0, y.YE)(i)).join(",")
                }
                o(_, "filterOutCharacterKeyShortcuts")
            },
            76006: (O, x, l) => {
                function y(c) {
                    const a = c.createElement("textarea");
                    return a.style.position = "fixed", a.style.top = "0", a.style.left = "0", a.style.opacity = "0", c.body.appendChild(a), a.focus(), () => (a.blur(), a.remove(), a.value)
                }
                o(y, "captureKeypresses");
                var h = l(82036),
                    p = l(59753);
                let _ = null;
                (0, p.on)("pjax:click", ".js-pjax-capture-input", function() {
                    _ = y(document)
                }), (0, p.on)("pjax:end", "#js-repo-pjax-container", function() {
                    if (_) {
                        const c = _(),
                            a = document.querySelector(".js-pjax-restore-captured-input");
                        a instanceof HTMLInputElement && c && (0, h.Se)(a, c), _ = null
                    }
                })
            },
            7796: (O, x, l) => {
                var y = l(40728),
                    h = l(59753);
                (0, h.on)("pjax:click", ".js-pjax-history-navigate", function(p) {
                    p.currentTarget instanceof HTMLAnchorElement && (p.currentTarget.href === (0, y._C)() ? (history.back(), p.detail.relatedEvent.preventDefault(), p.preventDefault()) : p.currentTarget.href === (0, y.Mw)() && (history.forward(), p.detail.relatedEvent.preventDefault(), p.preventDefault()))
                })
            },
            15528: (O, x, l) => {
                var y = l(82762),
                    h = l(64463);

                function p(c) {
                    if (c.id) return `#${c.id}`;
                    throw new Error("pjax container has no id")
                }
                o(p, "getContainerSelector");

                function _(c, a) {
                    const i = (0, y.W)(c),
                        n = p(i),
                        t = new URL(c.href, window.location.origin),
                        s = new URLSearchParams(t.search.slice(1));
                    return t.search = s.toString(), fetch(t.href, {
                        headers: Object.assign({
                            Accept: "text/html",
                            "X-PJAX": "true",
                            "X-PJAX-Container": n,
                            "X-Requested-With": "XMLHttpRequest"
                        }, a && a.headers)
                    })
                }
                o(_, "pjaxFetch"), (0, h.N7)("[data-pjax-container] link[rel=pjax-prefetch]", {
                    constructor: HTMLLinkElement,
                    initialize(c) {
                        _(c, {
                            headers: {
                                Purpose: "prefetch"
                            }
                        })
                    }
                })
            },
            82762: (O, x, l) => {
                l.d(x, {
                    W: () => h,
                    r: () => y
                });

                function y(p) {
                    return p.getAttribute("data-pjax-preserve-scroll") != null ? !1 : 0
                }
                o(y, "preserveScrollTo");

                function h(p) {
                    let _ = p;
                    for (; _;) {
                        const c = _.getAttribute("data-pjax");
                        if (c && c !== "true") return document.querySelector(c);
                        _ = _.parentElement && _.parentElement.closest("[data-pjax]")
                    }
                    return p.closest("[data-pjax-container]")
                }
                o(h, "detectContainer")
            },
            53488: (O, x, l) => {
                var y = l(14037),
                    h = l(59753);
                (0, h.on)("click", ".js-smoothscroll-anchor", function(p) {
                    const _ = p.currentTarget;
                    if (!(_ instanceof HTMLAnchorElement)) return;
                    const c = (0, y.Kt)(document, _.hash);
                    !c || (c.scrollIntoView({
                        behavior: "smooth"
                    }), p.preventDefault())
                })
            },
            54235: (O, x, l) => {
                l.d(x, {
                    H: () => s
                });
                var y = l(42474),
                    h = l(34782),
                    p = l(64463);
                let _ = !1,
                    c = 0;
                const a = [];

                function i() {
                    a.length ? n() : t()
                }
                o(i, "manageObservers");

                function n() {
                    _ || (window.addEventListener("resize", u), document.addEventListener("scroll", u), _ = !0)
                }
                o(n, "addObservers");

                function t() {
                    window.removeEventListener("resize", u), document.removeEventListener("scroll", u), _ = !1
                }
                o(t, "removeObservers");

                function s() {
                    C(!0)
                }
                o(s, "forceStickyRelayout");

                function u() {
                    C()
                }
                o(u, "checkElementsForStickingHandler");

                function C(r = !1) {
                    for (const w of a)
                        if (w.element.offsetHeight > 0) {
                            const {
                                element: e,
                                placeholder: d,
                                top: g
                            } = w, v = e.getBoundingClientRect();
                            if (d) {
                                const m = d.getBoundingClientRect();
                                e.classList.contains("is-stuck") ? m.top > z(e, g) ? P(w) : D(w) : v.top <= z(e, g) ? M(w) : r && D(w)
                            } else v.top - z(e, g) < .1 ? M(w) : P(w)
                        }
                }
                o(C, "checkElementsForSticking");

                function S(r) {
                    const {
                        position: w
                    } = window.getComputedStyle(r);
                    return /sticky/.test(w)
                }
                o(S, "browserHasSticky");

                function M({
                    element: r,
                    placeholder: w,
                    top: e
                }) {
                    if (w) {
                        const d = r.getBoundingClientRect();
                        V(r, z(r, e)), r.style.left = `${d.left}px`, r.style.width = `${d.width}px`, r.style.marginTop = "0", r.style.position = "fixed", w.style.display = "block"
                    }
                    r.classList.add("is-stuck")
                }
                o(M, "pinSet");

                function P({
                    element: r,
                    placeholder: w
                }) {
                    w && (r.style.position = "static", r.style.marginTop = w.style.marginTop, w.style.display = "none"), r.classList.remove("is-stuck")
                }
                o(P, "unpinSet");

                function D({
                    element: r,
                    placeholder: w,
                    offsetParent: e,
                    top: d
                }) {
                    if (w && !(0, y.h)()) {
                        const g = r.getBoundingClientRect(),
                            v = w.getBoundingClientRect();
                        if (V(r, z(r, d)), r.style.left = `${v.left}px`, r.style.width = `${v.width}px`, e) {
                            const m = e.getBoundingClientRect();
                            m.bottom < g.height + parseInt(String(d)) && (r.style.top = `${m.bottom-g.height}px`)
                        }
                    }
                }
                o(D, "updatePinnedSet");

                function H(r) {
                    if (S(r)) return null;
                    const w = r.previousElementSibling;
                    if (w && w.classList.contains("is-placeholder")) return w;
                    const e = document.createElement("div");
                    return e.style.visibility = "hidden", e.style.display = "none", e.style.height = window.getComputedStyle(r).height, e.className = r.className, e.classList.remove("js-sticky"), e.classList.add("is-placeholder"), r.parentNode.insertBefore(e, r)
                }
                o(H, "findOrCreatePlaceholder");

                function R(r) {
                    const w = H(r),
                        e = window.getComputedStyle(r).position;
                    r.style.position = "static";
                    const d = r.offsetParent;
                    r.style.position = "fixed";
                    const g = $(r),
                        v = {
                            element: r,
                            placeholder: w,
                            offsetParent: d,
                            top: g === "auto" ? 0 : parseInt(g || "0")
                        };
                    r.style.position = e, a.push(v)
                }
                o(R, "createSet");

                function f(r) {
                    const w = a.map(e => e.element).indexOf(r);
                    a.splice(w, 1)
                }
                o(f, "removeSet");
                async function b(r) {
                    await h.C, R(r), C(), i()
                }
                o(b, "initializeSet"), (0, p.N7)(".js-sticky", {
                    constructor: HTMLElement,
                    add(r) {
                        b(r)
                    },
                    remove(r) {
                        f(r), i()
                    }
                }), (0, p.N7)(".js-notification-top-shelf", {
                    constructor: HTMLElement,
                    add(r) {
                        T(r)
                    },
                    remove() {
                        for (const r of document.querySelectorAll(".js-notification-top-shelf")) r.remove();
                        c > 0 && (c = 0, L(), s())
                    }
                }), (0, p.N7)(".js-notification-shelf-offset-top, .js-position-sticky", {
                    constructor: HTMLElement,
                    add: I
                });
                async function T(r) {
                    if (r.offsetParent === null) return;
                    await h.C;
                    const w = Math.floor(r.getBoundingClientRect().height);
                    w > 0 && (c = w, L(), s())
                }
                o(T, "initializeNotificationShelf");

                function L() {
                    for (const r of document.querySelectorAll(".js-position-sticky, .js-notification-shelf-offset-top")) I(r)
                }
                o(L, "updateTopOffsets");

                function I(r) {
                    if (r.classList.contains("js-notification-top-shelf")) return;
                    const w = parseInt($(r)) || 0;
                    V(r, w + c)
                }
                o(I, "updateTopOffset");

                function $(r) {
                    const w = r.getAttribute("data-original-top");
                    if (w != null) return w;
                    const e = window.getComputedStyle(r).top;
                    return r.setAttribute("data-original-top", e), e
                }
                o($, "getOriginalTop");

                function z(r, w) {
                    return r.classList.contains("js-notification-top-shelf") ? w : w + c
                }
                o(z, "withShelfOffset");

                function V(r, w) {
                    r.style.setProperty("top", `${w}px`, "important")
                }
                o(V, "setTopImportant")
            },
            86276: (O, x, l) => {
                l.d(x, {
                    VZ: () => h,
                    _C: () => p,
                    cv: () => y,
                    oE: () => _
                });

                function y(i) {
                    const n = i.getBoundingClientRect();
                    return {
                        top: n.top + window.pageYOffset,
                        left: n.left + window.pageXOffset
                    }
                }
                o(y, "offset");

                function h(i) {
                    let n = i;
                    const t = n.ownerDocument;
                    if (!t || !n.offsetParent) return;
                    const s = t.defaultView.HTMLElement;
                    if (n !== t.body) {
                        for (; n !== t.body;) {
                            if (n.parentElement instanceof s) n = n.parentElement;
                            else return;
                            const {
                                position: u,
                                overflowY: C,
                                overflowX: S
                            } = getComputedStyle(n);
                            if (u === "fixed" || C === "auto" || S === "auto" || C === "scroll" || S === "scroll") break
                        }
                        return n instanceof Document ? null : n
                    }
                }
                o(h, "overflowParent");

                function p(i, n) {
                    let t = n;
                    const s = i.ownerDocument;
                    if (!s) return;
                    const u = s.documentElement;
                    if (!u || i === u) return;
                    const C = _(i, t);
                    if (!C) return;
                    t = C._container;
                    const S = t === s.documentElement && s.defaultView ? {
                            top: s.defaultView.pageYOffset,
                            left: s.defaultView.pageXOffset
                        } : {
                            top: t.scrollTop,
                            left: t.scrollLeft
                        },
                        M = C.top - S.top,
                        P = C.left - S.left,
                        D = t.clientHeight,
                        H = t.clientWidth,
                        R = D - (M + i.offsetHeight),
                        f = H - (P + i.offsetWidth);
                    return {
                        top: M,
                        left: P,
                        bottom: R,
                        right: f,
                        height: D,
                        width: H
                    }
                }
                o(p, "overflowOffset");

                function _(i, n) {
                    let t = i;
                    const s = t.ownerDocument;
                    if (!s) return;
                    const u = s.documentElement;
                    if (!u) return;
                    const C = s.defaultView.HTMLElement;
                    let S = 0,
                        M = 0;
                    const P = t.offsetHeight,
                        D = t.offsetWidth;
                    for (; !(t === s.body || t === n);)
                        if (S += t.offsetTop || 0, M += t.offsetLeft || 0, t.offsetParent instanceof C) t = t.offsetParent;
                        else return;
                    let H, R, f;
                    if (!n || n === s || n === s.defaultView || n === s.documentElement || n === s.body) f = u, H = c(s.body, u), R = a(s.body, u);
                    else if (n instanceof C) f = n, H = n.scrollHeight, R = n.scrollWidth;
                    else return;
                    const b = H - (S + P),
                        T = R - (M + D);
                    return {
                        top: S,
                        left: M,
                        bottom: b,
                        right: T,
                        _container: f
                    }
                }
                o(_, "positionedOffset");

                function c(i, n) {
                    return Math.max(i.scrollHeight, n.scrollHeight, i.offsetHeight, n.offsetHeight, n.clientHeight)
                }
                o(c, "getDocumentHeight");

                function a(i, n) {
                    return Math.max(i.scrollWidth, n.scrollWidth, i.offsetWidth, n.offsetWidth, n.clientWidth)
                }
                o(a, "getDocumentWidth")
            },
            12020: (O, x, l) => {
                l.d(x, {
                    Dc: () => _,
                    g: () => a,
                    gJ: () => y,
                    rs: () => h
                });

                function y() {
                    return Promise.resolve()
                }
                o(y, "microtask");

                function h() {
                    return new Promise(window.requestAnimationFrame)
                }
                o(h, "animationFrame");
                async function p(i, n) {
                    let t;
                    const s = new Promise((u, C) => {
                        t = self.setTimeout(() => C(new Error("timeout")), i)
                    });
                    if (!n) return s;
                    try {
                        await Promise.race([s, c(n)])
                    } catch (u) {
                        throw self.clearTimeout(t), u
                    }
                }
                o(p, "timeout");
                async function _(i, n) {
                    let t;
                    const s = new Promise(u => {
                        t = self.setTimeout(u, i)
                    });
                    if (!n) return s;
                    try {
                        await Promise.race([s, c(n)])
                    } catch (u) {
                        throw self.clearTimeout(t), u
                    }
                }
                o(_, "wait");

                function c(i) {
                    return new Promise((n, t) => {
                        const s = new Error("aborted");
                        s.name = "AbortError", i.aborted ? t(s) : i.addEventListener("abort", () => t(s))
                    })
                }
                o(c, "whenAborted");

                function a(i) {
                    const n = [];
                    return function(t) {
                        n.push(t), n.length === 1 && queueMicrotask(() => {
                            const s = [...n];
                            n.length = 0, i(s)
                        })
                    }
                }
                o(a, "taskQueue")
            },
            71900: (O, x, l) => {
                l.d(x, {
                    W: () => h
                });

                function* y(p, _) {
                    for (const c of p) {
                        const a = _(c);
                        a != null && (yield a)
                    }
                }
                o(y, "filterMap");

                function h(p, _, c) {
                    return [...y(p, o(i => {
                        const n = _(i);
                        return n != null ? [i, n] : null
                    }, "sortKey"))].sort((i, n) => c(i[1], n[1])).map(([i]) => i)
                }
                o(h, "filterSort")
            },
            34821: (O, x, l) => {
                l.d(x, {
                    EW: () => y,
                    Qw: () => p,
                    qu: () => c
                });

                function y(a, i) {
                    let n = _(a, i);
                    if (n && i.indexOf("/") === -1) {
                        const t = a.substring(a.lastIndexOf("/") + 1);
                        n += _(t, i)
                    }
                    return n
                }
                o(y, "fuzzyScore");

                function h(a) {
                    const i = a.toLowerCase().split("");
                    let n = "";
                    for (let t = 0; t < i.length; t++) {
                        const u = i[t].replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
                        t === 0 ? n += `(.*)(${u})` : n += `([^${u}]*?)(${u})`
                    }
                    return new RegExp(`${n}(.*?)$`, "i")
                }
                o(h, "fuzzyRegexp");

                function p(a, i, n) {
                    if (i) {
                        const t = a.innerHTML.trim().match(n || h(i));
                        if (!t) return;
                        let s = !1;
                        const u = [];
                        for (let C = 1; C < t.length; ++C) {
                            const S = t[C];
                            !S || (C % 2 === 0 ? s || (u.push("<mark>"), s = !0) : s && (u.push("</mark>"), s = !1), u.push(S))
                        }
                        a.innerHTML = u.join("")
                    } else {
                        const t = a.innerHTML.trim(),
                            s = t.replace(/<\/?mark>/g, "");
                        t !== s && (a.innerHTML = s)
                    }
                }
                o(p, "fuzzyHighlightElement");

                function _(a, i) {
                    let n = a;
                    if (n === i) return 1;
                    const t = n.length;
                    let s = 0,
                        u = 0;
                    for (let P = 0; P < i.length; P++) {
                        const D = i[P],
                            H = n.indexOf(D.toLowerCase()),
                            R = n.indexOf(D.toUpperCase()),
                            f = Math.min(H, R),
                            b = f > -1 ? f : Math.max(H, R);
                        if (b === -1) return 0;
                        s += .1, n[b] === D && (s += .1), b === 0 && (s += .8, P === 0 && (u = 1)), n.charAt(b - 1) === " " && (s += .8), n = n.substring(b + 1, t)
                    }
                    const C = i.length,
                        S = s / C;
                    let M = (S * (C / t) + S) / 2;
                    return u && M + .1 < 1 && (M += .1), M
                }
                o(_, "stringScore");

                function c(a, i) {
                    return a.score > i.score ? -1 : a.score < i.score ? 1 : a.text < i.text ? -1 : a.text > i.text ? 1 : 0
                }
                o(c, "compare")
            },
            57443: (O, x, l) => {
                l.d(x, {
                    dY: () => n,
                    iU: () => i,
                    oq: () => a
                });
                const y = new WeakMap;

                function h(t) {
                    const s = y.get(t);
                    !s || (s.timer != null && clearTimeout(s.timer), s.timer = window.setTimeout(() => {
                        s.timer != null && (s.timer = null), s.inputed = !1, s.listener.call(null, t)
                    }, s.wait))
                }
                o(h, "schedule");

                function p(t) {
                    const s = t.currentTarget,
                        u = y.get(s);
                    !u || (u.keypressed = !0, u.timer != null && clearTimeout(u.timer))
                }
                o(p, "onKeydownInput");

                function _(t) {
                    const s = t.currentTarget,
                        u = y.get(s);
                    !u || (u.keypressed = !1, u.inputed && h(s))
                }
                o(_, "onKeyupInput");

                function c(t) {
                    const s = t.currentTarget,
                        u = y.get(s);
                    !u || (u.inputed = !0, u.keypressed || h(s))
                }
                o(c, "onInputInput");

                function a(t, s, u = {
                    wait: null
                }) {
                    y.set(t, {
                        keypressed: !1,
                        inputed: !1,
                        timer: void 0,
                        listener: s,
                        wait: u.wait != null ? u.wait : 100
                    }), t.addEventListener("keydown", p), t.addEventListener("keyup", _), t.addEventListener("input", c)
                }
                o(a, "addThrottledInputEventListener");

                function i(t, s) {
                    t.removeEventListener("keydown", p), t.removeEventListener("keyup", _), t.removeEventListener("input", c);
                    const u = y.get(t);
                    u && (u.timer != null && u.listener === s && clearTimeout(u.timer), y.delete(t))
                }
                o(i, "removeThrottledInputEventListener");

                function n(t) {
                    const s = y.get(t);
                    s && s.listener.call(null, t)
                }
                o(n, "dispatchThrottledInputEvent")
            },
            12585: (O, x, l) => {
                l.d(x, {
                    Z: () => h
                });

                function y(p) {
                    return p.offsetWidth <= 0 && p.offsetHeight <= 0
                }
                o(y, "hidden");

                function h(p) {
                    return !y(p)
                }
                o(h, "visible")
            }
        }
    ]);
})();

//# sourceMappingURL=3826-814429075e49.js.map