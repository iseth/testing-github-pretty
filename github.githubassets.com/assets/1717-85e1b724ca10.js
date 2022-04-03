"use strict";
(() => {
    var K = Object.defineProperty;
    var i = (z, D) => K(z, "name", {
        value: D,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [1717], {
            46263: (z, D, O) => {
                O.d(D, {
                    D: () => a,
                    P: () => L
                });

                function L(T, x = 0, {
                    start: m = !0,
                    middle: g = !0,
                    once: p = !1
                } = {}) {
                    let E = 0,
                        k, A = !1;

                    function w(...h) {
                        if (A) return;
                        const c = Date.now() - E;
                        E = Date.now(), m ? (m = !1, T.apply(this, h), p && w.cancel()) : (g && c < x || !g) && (clearTimeout(k), k = setTimeout(() => {
                            E = Date.now(), T.apply(this, h), p && w.cancel()
                        }, g ? x - c : x))
                    }
                    return i(w, "fn"), w.cancel = () => {
                        clearTimeout(k), A = !0
                    }, w
                }
                i(L, "throttle");

                function a(T, x = 0, {
                    start: m = !1,
                    middle: g = !1,
                    once: p = !1
                } = {}) {
                    return L(T, x, {
                        start: m,
                        middle: g,
                        once: p
                    })
                }
                i(a, "debounce")
            },
            96776: (z, D, O) => {
                O.d(D, {
                    _8: () => L,
                    uQ: () => a
                });

                function L(m, g) {
                    return a(T(m), g)
                }
                i(L, "preserveAnchorNodePosition");

                function a(m, g) {
                    var p = m;
                    if (!p) return Promise.resolve(g());
                    var E = p.ownerDocument.documentElement;

                    function k(h) {
                        for (var c = []; h;) {
                            var v = h.getBoundingClientRect(),
                                y = v.top,
                                S = v.left;
                            c.push({
                                element: h,
                                top: y,
                                left: S
                            }), h = h.parentElement
                        }
                        return c
                    }
                    i(k, "computeAncestorBoundingRects");

                    function A(h) {
                        for (var c = 0; c < h.length; c++) {
                            var v = h[c];
                            if (E.contains(v.element)) return v
                        }
                    }
                    i(A, "firstAttachedBoundingRect");
                    var w = k(p);
                    return Promise.resolve(g()).then(function(h) {
                        var c = A(w);
                        if (c) {
                            p = c.element;
                            var v = c.top,
                                y = c.left,
                                S = p.getBoundingClientRect(),
                                b = S.top,
                                r = S.left;
                            x(p, r - y, b - v)
                        }
                        return h
                    })
                }
                i(a, "preservePosition");

                function T(m) {
                    if (m.activeElement !== m.body) return m.activeElement;
                    var g = m.querySelectorAll(":hover"),
                        p = g.length;
                    if (p) return g[p - 1]
                }
                i(T, "findAnchorNode");

                function x(m, g, p) {
                    var E = m.ownerDocument,
                        k = E.defaultView;

                    function A(b) {
                        return b.offsetParent ? {
                            top: b.scrollTop,
                            left: b.scrollLeft
                        } : {
                            top: k.pageYOffset,
                            left: k.pageXOffset
                        }
                    }
                    i(A, "scrollOffsets");

                    function w(b, r, s) {
                        if (r === 0 && s === 0) return [0, 0];
                        var n = A(b),
                            u = n.top + s,
                            l = n.left + r;
                        b === E || b === k || b === E.documentElement || b === E.body ? E.defaultView.scrollTo(l, u) : (b.scrollTop = u, b.scrollLeft = l);
                        var f = A(b);
                        return [f.left - n.left, f.top - n.top]
                    }
                    i(w, "scrollBy");

                    function h(b) {
                        var r = b;
                        if (!(!r.offsetParent || r === E.body)) {
                            for (; r !== E.body;) {
                                if (r.parentElement) r = r.parentElement;
                                else return;
                                var s = k.getComputedStyle(r),
                                    n = s.position,
                                    u = s.overflowY,
                                    l = s.overflowX;
                                if (n === "fixed" || u === "auto" || l === "auto" || u === "scroll" || l === "scroll") break
                            }
                            return r
                        }
                    }
                    i(h, "overflowParent");
                    for (var c = h(m), v = 0, y = 0; c;) {
                        var S = w(c, g - v, p - y);
                        if (v += S[0], y += S[1], v === g && y === p) break;
                        c = h(c)
                    }
                }
                i(x, "cumulativeScrollBy")
            },
            11793: (z, D, O) => {
                O.d(D, {
                    EL: () => g,
                    N9: () => S,
                    Tz: () => b
                });
                class L {
                    constructor(s) {
                        this.children = [], this.parent = s
                    }
                    delete(s) {
                        const n = this.children.indexOf(s);
                        return n === -1 ? !1 : (this.children = this.children.slice(0, n).concat(this.children.slice(n + 1)), this.children.length === 0 && this.parent.delete(this), !0)
                    }
                    add(s) {
                        return this.children.push(s), this
                    }
                }
                i(L, "Leaf");
                class a {
                    constructor(s) {
                        this.parent = null, this.children = {}, this.parent = s || null
                    }
                    get(s) {
                        return this.children[s]
                    }
                    insert(s) {
                        let n = this;
                        for (let u = 0; u < s.length; u += 1) {
                            const l = s[u];
                            let f = n.get(l);
                            if (u === s.length - 1) return f instanceof a && (n.delete(f), f = null), f || (f = new L(n), n.children[l] = f), f;
                            f instanceof L && (f = null), f || (f = new a(n), n.children[l] = f), n = f
                        }
                        return n
                    }
                    delete(s) {
                        for (const n in this.children)
                            if (this.children[n] === s) {
                                const l = delete this.children[n];
                                return Object.keys(this.children).length === 0 && this.parent && this.parent.delete(this), l
                            }
                        return !1
                    }
                }
                i(a, "RadixTrie");

                function T(r) {
                    if (!(r instanceof HTMLElement)) return !1;
                    const s = r.nodeName.toLowerCase(),
                        n = (r.getAttribute("type") || "").toLowerCase();
                    return s === "select" || s === "textarea" || s === "input" && n !== "submit" && n !== "reset" && n !== "checkbox" && n !== "radio" || r.isContentEditable
                }
                i(T, "isFormField");

                function x(r, s) {
                    const n = new CustomEvent("hotkey-fire", {
                        cancelable: !0,
                        detail: {
                            path: s
                        }
                    });
                    !r.dispatchEvent(n) || (T(r) ? r.focus() : r.click())
                }
                i(x, "fireDeterminedAction");

                function m(r) {
                    const s = [];
                    let n = [""],
                        u = !1;
                    for (let l = 0; l < r.length; l++) {
                        if (u && r[l] === ",") {
                            s.push(n), n = [""], u = !1;
                            continue
                        }
                        if (r[l] === " ") {
                            n.push(""), u = !1;
                            continue
                        } else r[l] === "+" ? u = !1 : u = !0;
                        n[n.length - 1] += r[l]
                    }
                    return s.push(n), s.map(l => l.filter(f => f !== "")).filter(l => l.length > 0)
                }
                i(m, "expandHotkeyToEdges");

                function g(r) {
                    const {
                        ctrlKey: s,
                        altKey: n,
                        metaKey: u,
                        key: l
                    } = r, f = [], _ = [s, n, u, E(r)];
                    for (const [M, I] of _.entries()) I && f.push(p[M]);
                    return p.includes(l) || f.push(l), f.join("+")
                }
                i(g, "hotkey");
                const p = ["Control", "Alt", "Meta", "Shift"];

                function E(r) {
                    const {
                        shiftKey: s,
                        code: n,
                        key: u
                    } = r;
                    return s && !(n.startsWith("Key") && u.toUpperCase() === u)
                }
                i(E, "showShift");
                const k = new a,
                    A = new WeakMap;
                let w = k,
                    h = null,
                    c = [];

                function v() {
                    c = [], h = null, w = k
                }
                i(v, "resetTriePosition");

                function y(r) {
                    if (r.defaultPrevented || !(r.target instanceof Node)) return;
                    if (T(r.target)) {
                        const n = r.target;
                        if (!n.id || !n.ownerDocument.querySelector(`[data-hotkey-scope="${n.id}"]`)) return
                    }
                    h != null && window.clearTimeout(h), h = window.setTimeout(v, 1500);
                    const s = w.get(g(r));
                    if (!s) {
                        v();
                        return
                    }
                    if (c.push(g(r)), w = s, s instanceof L) {
                        const n = r.target;
                        let u = !1,
                            l;
                        const f = T(n);
                        for (let _ = s.children.length - 1; _ >= 0; _ -= 1) {
                            l = s.children[_];
                            const M = l.getAttribute("data-hotkey-scope");
                            if (!f && !M || f && n.id === M) {
                                u = !0;
                                break
                            }
                        }
                        l && u && (x(l, c), r.preventDefault()), v()
                    }
                }
                i(y, "keyDownHandler");

                function S(r, s) {
                    Object.keys(k.children).length === 0 && document.addEventListener("keydown", y);
                    const u = m(s || r.getAttribute("data-hotkey") || "").map(l => k.insert(l).add(r));
                    A.set(r, u)
                }
                i(S, "install");

                function b(r) {
                    const s = A.get(r);
                    if (s && s.length)
                        for (const n of s) n && n.delete(r);
                    Object.keys(k.children).length === 0 && document.removeEventListener("keydown", y)
                }
                i(b, "uninstall")
            },
            40987: (z, D, O) => {
                O.d(D, {
                    Z: () => c
                });
                const L = new WeakMap;
                let a = null;

                function T() {
                    return !!a
                }
                i(T, "isDragging");

                function x(e, t, o) {
                    L.set(e, {
                        sortStarted: t,
                        sortFinished: o
                    }), e.addEventListener("dragstart", p), e.addEventListener("dragenter", E), e.addEventListener("dragend", A), e.addEventListener("drop", k), e.addEventListener("dragover", w)
                }
                i(x, "sortable");

                function m(e, t) {
                    if (e.parentNode === t.parentNode) {
                        let o = e;
                        for (; o;) {
                            if (o === t) return !0;
                            o = o.previousElementSibling
                        }
                    }
                    return !1
                }
                i(m, "isBefore");

                function g(e, t) {
                    return e.closest("task-lists") === t.closest("task-lists")
                }
                i(g, "isSameContainer");

                function p(e) {
                    if (e.currentTarget !== e.target) return;
                    const t = e.currentTarget;
                    if (!(t instanceof Element)) return;
                    const o = t.closest(".contains-task-list");
                    if (!o || (t.classList.add("is-ghost"), e.dataTransfer && e.dataTransfer.setData("text/plain", (t.textContent || "").trim()), !t.parentElement)) return;
                    const d = Array.from(t.parentElement.children),
                        P = d.indexOf(t),
                        C = L.get(t);
                    C && C.sortStarted(o), a = {
                        didDrop: !1,
                        dragging: t,
                        dropzone: t,
                        sourceList: o,
                        sourceSibling: d[P + 1] || null,
                        sourceIndex: P
                    }
                }
                i(p, "onDragStart");

                function E(e) {
                    if (!a) return;
                    const t = e.currentTarget;
                    if (t instanceof Element) {
                        if (!g(a.dragging, t)) {
                            e.stopPropagation();
                            return
                        }
                        e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"), a.dropzone !== t && (a.dragging.classList.add("is-dragging"), a.dropzone = t, m(a.dragging, t) ? t.before(a.dragging) : t.after(a.dragging))
                    }
                }
                i(E, "onDragEnter");

                function k(e) {
                    if (!a) return;
                    e.preventDefault(), e.stopPropagation();
                    const t = e.currentTarget;
                    if (!(t instanceof Element) || (a.didDrop = !0, !a.dragging.parentElement)) return;
                    let o = Array.from(a.dragging.parentElement.children).indexOf(a.dragging);
                    const d = t.closest(".contains-task-list");
                    if (!d || a.sourceIndex === o && a.sourceList === d) return;
                    a.sourceList === d && a.sourceIndex < o && o++;
                    const P = {
                            list: a.sourceList,
                            index: a.sourceIndex
                        },
                        C = {
                            list: d,
                            index: o
                        },
                        N = L.get(a.dragging);
                    N && N.sortFinished({
                        src: P,
                        dst: C
                    })
                }
                i(k, "onDrop");

                function A() {
                    !a || (a.dragging.classList.remove("is-dragging"), a.dragging.classList.remove("is-ghost"), a.didDrop || a.sourceList.insertBefore(a.dragging, a.sourceSibling), a = null)
                }
                i(A, "onDragEnd");

                function w(e) {
                    if (!a) return;
                    const t = e.currentTarget;
                    if (t instanceof Element) {
                        if (!g(a.dragging, t)) {
                            e.stopPropagation();
                            return
                        }
                        e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move")
                    }
                }
                i(w, "onDragOver");
                const h = new WeakMap;
                class c extends HTMLElement {
                    connectedCallback() {
                        this.addEventListener("change", o => {
                            const d = o.target;
                            d instanceof HTMLInputElement && (!d.classList.contains("task-list-item-checkbox") || this.dispatchEvent(new CustomEvent("task-lists-check", {
                                bubbles: !0,
                                detail: {
                                    position: s(d),
                                    checked: d.checked
                                }
                            })))
                        });
                        const t = new MutationObserver(f.bind(null, this));
                        h.set(this, t), t.observe(this, {
                            childList: !0,
                            subtree: !0
                        }), f(this)
                    }
                    disconnectedCallback() {
                        const t = h.get(this);
                        t && t.disconnect()
                    }
                    get disabled() {
                        return this.hasAttribute("disabled")
                    }
                    set disabled(t) {
                        t ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
                    }
                    get sortable() {
                        return this.hasAttribute("sortable")
                    }
                    set sortable(t) {
                        t ? this.setAttribute("sortable", "") : this.removeAttribute("sortable")
                    }
                    static get observedAttributes() {
                        return ["disabled"]
                    }
                    attributeChangedCallback(t, o, d) {
                        if (o !== d) switch (t) {
                            case "disabled":
                                _(this);
                                break
                        }
                    }
                }
                i(c, "TaskListsElement");
                const v = document.createElement("template");
                v.innerHTML = `
  <span class="handle">
    <svg class="drag-handle" aria-hidden="true" width="16" height="16">
      <path d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"/>
    </svg>
  </span>`;
                const y = new WeakMap;

                function S(e) {
                    if (y.get(e)) return;
                    y.set(e, !0);
                    const t = e.closest("task-lists");
                    if (!(t instanceof c) || t.querySelectorAll(".task-list-item").length <= 1) return;
                    const o = v.content.cloneNode(!0),
                        d = o.querySelector(".handle");
                    if (e.prepend(o), !d) throw new Error("handle not found");
                    d.addEventListener("mouseenter", B), d.addEventListener("mouseleave", F), x(e, H, q), e.addEventListener("mouseenter", b), e.addEventListener("mouseleave", r)
                }
                i(S, "initItem");

                function b(e) {
                    const t = e.currentTarget;
                    if (!(t instanceof Element)) return;
                    const o = t.closest("task-lists");
                    o instanceof c && o.sortable && !o.disabled && t.classList.add("hovered")
                }
                i(b, "onListItemMouseOver");

                function r(e) {
                    const t = e.currentTarget;
                    t instanceof Element && t.classList.remove("hovered")
                }
                i(r, "onListItemMouseOut");

                function s(e) {
                    const t = n(e);
                    if (!t) throw new Error(".contains-task-list not found");
                    const o = e.closest(".task-list-item"),
                        d = Array.from(t.children).filter(C => C.tagName === "LI"),
                        P = o ? d.indexOf(o) : -1;
                    return [M(t), P]
                }
                i(s, "position");

                function n(e) {
                    const t = e.parentElement;
                    return t ? t.closest(".contains-task-list") : null
                }
                i(n, "taskList");

                function u(e) {
                    return n(e) === l(e)
                }
                i(u, "isRootTaskList");

                function l(e) {
                    const t = n(e);
                    return t ? l(t) || t : null
                }
                i(l, "rootTaskList");

                function f(e) {
                    const t = e.querySelectorAll(".contains-task-list > .task-list-item");
                    for (const o of t) u(o) && S(o);
                    _(e)
                }
                i(f, "syncState");

                function _(e) {
                    for (const t of e.querySelectorAll(".task-list-item")) t.classList.toggle("enabled", !e.disabled);
                    for (const t of e.querySelectorAll(".task-list-item-checkbox")) t instanceof HTMLInputElement && (t.disabled = e.disabled)
                }
                i(_, "syncDisabled");

                function M(e) {
                    const t = e.closest("task-lists");
                    if (!t) throw new Error("parent not found");
                    return Array.from(t.querySelectorAll("ol, ul")).indexOf(e)
                }
                i(M, "listIndex");
                const I = new WeakMap;

                function H(e) {
                    const t = e.closest("task-lists");
                    if (!t) throw new Error("parent not found");
                    I.set(t, Array.from(t.querySelectorAll("ol, ul")))
                }
                i(H, "onSortStart");

                function q({
                    src: e,
                    dst: t
                }) {
                    const o = e.list.closest("task-lists");
                    if (!o) return;
                    const d = I.get(o);
                    !d || (I.delete(o), o.dispatchEvent(new CustomEvent("task-lists-move", {
                        bubbles: !0,
                        detail: {
                            src: [d.indexOf(e.list), e.index],
                            dst: [d.indexOf(t.list), t.index]
                        }
                    })))
                }
                i(q, "onSorted");

                function B(e) {
                    const t = e.currentTarget;
                    if (!(t instanceof Element)) return;
                    const o = t.closest(".task-list-item");
                    if (!o) return;
                    const d = o.closest("task-lists");
                    d instanceof c && d.sortable && !d.disabled && o.setAttribute("draggable", "true")
                }
                i(B, "onHandleMouseOver");

                function F(e) {
                    if (T()) return;
                    const t = e.currentTarget;
                    if (!(t instanceof Element)) return;
                    const o = t.closest(".task-list-item");
                    !o || o.setAttribute("draggable", "false")
                }
                i(F, "onHandleMouseOut"), window.customElements.get("task-lists") || (window.TaskListsElement = c, window.customElements.define("task-lists", c))
            }
        }
    ]);
})();

//# sourceMappingURL=1717-1b0577469fef.js.map