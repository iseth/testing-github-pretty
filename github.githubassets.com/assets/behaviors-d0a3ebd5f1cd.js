(() => {
    var rf = Object.defineProperty;
    var r = (_, M) => rf(_, "name", {
        value: M,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [1436], {
            4039: (_, M, u) => {
                "use strict";
                var w = u(47142);
                const A = r((t, e, n) => {
                        if (!(0, w.CD)(t, e)) return -1 / 0;
                        const o = (0, w.Gs)(t, e);
                        return o < n ? -1 / 0 : o
                    }, "getScore"),
                    P = r((t, e, n) => {
                        t.innerHTML = "";
                        let o = 0;
                        for (const s of (0, w.m7)(e, n)) {
                            n.slice(o, s) !== "" && t.appendChild(document.createTextNode(n.slice(o, s))), o = s + 1;
                            const a = document.createElement("mark");
                            a.textContent = n[s], t.appendChild(a)
                        }
                        t.appendChild(document.createTextNode(n.slice(o)))
                    }, "highlightElement"),
                    q = new WeakMap,
                    y = new WeakMap,
                    m = new WeakMap,
                    g = r(t => {
                        if (!m.has(t) && t instanceof HTMLElement) {
                            const e = (t.getAttribute("data-value") || t.textContent || "").trim();
                            return m.set(t, e), e
                        }
                        return m.get(t) || ""
                    }, "getTextCache");
                class p extends HTMLElement {
                    connectedCallback() {
                        const e = this.querySelector("ul");
                        if (!e) return;
                        const n = new Set(e.querySelectorAll("li")),
                            o = this.querySelector("input");
                        o instanceof HTMLInputElement && o.addEventListener("input", () => {
                            this.value = o.value
                        });
                        const s = new MutationObserver(a => {
                            let c = !1;
                            for (const l of a)
                                if (l.type === "childList" && l.addedNodes.length) {
                                    for (const d of l.addedNodes)
                                        if (d instanceof HTMLLIElement && !n.has(d)) {
                                            const h = g(d);
                                            c = c || (0, w.CD)(this.value, h), n.add(d)
                                        }
                                }
                            c && this.sort()
                        });
                        s.observe(e, {
                            childList: !0
                        });
                        const i = {
                            handler: s,
                            items: n,
                            lazyItems: new Map,
                            timer: null
                        };
                        y.set(this, i)
                    }
                    disconnectedCallback() {
                        const e = y.get(this);
                        e && (e.handler.disconnect(), y.delete(this))
                    }
                    addLazyItems(e, n) {
                        const o = y.get(this);
                        if (!o) return;
                        const {
                            lazyItems: s
                        } = o, {
                            value: i
                        } = this;
                        let a = !1;
                        for (const c of e) s.set(c, n), a = a || Boolean(i) && (0, w.CD)(i, c);
                        a && this.sort()
                    }
                    sort() {
                        const e = q.get(this);
                        e && (e.aborted = !0);
                        const n = {
                            aborted: !1
                        };
                        q.set(this, n);
                        const {
                            minScore: o,
                            markSelector: s,
                            maxMatches: i,
                            value: a
                        } = this, c = y.get(this);
                        if (!c || !this.dispatchEvent(new CustomEvent("fuzzy-list-will-sort", {
                                cancelable: !0,
                                detail: a
                            }))) return;
                        const {
                            items: l,
                            lazyItems: d
                        } = c, h = this.hasAttribute("mark-selector"), j = this.querySelector("ul");
                        if (!j) return;
                        const T = [];
                        if (a) {
                            for (const k of l) {
                                const O = g(k),
                                    B = A(a, O, o);
                                B !== -1 / 0 && T.push({
                                    item: k,
                                    score: B
                                })
                            }
                            for (const [k, O] of d) {
                                const B = A(a, k, o);
                                B !== -1 / 0 && T.push({
                                    text: k,
                                    render: O,
                                    score: B
                                })
                            }
                            T.sort((k, O) => O.score - k.score).splice(i)
                        } else {
                            let k = T.length;
                            for (const O of l) {
                                if (k >= i) break;
                                T.push({
                                    item: O,
                                    score: 1
                                }), k += 1
                            }
                            for (const [O, B] of d) {
                                if (k >= i) break;
                                T.push({
                                    text: O,
                                    render: B,
                                    score: 1
                                }), k += 1
                            }
                        }
                        requestAnimationFrame(() => {
                            if (n.aborted) return;
                            const k = j.querySelector('input[type="radio"]:checked');
                            j.innerHTML = "";
                            let O = 0;
                            const B = r(() => {
                                if (n.aborted) return;
                                const G = Math.min(T.length, O + 100),
                                    tt = document.createDocumentFragment();
                                for (let U = O; U < G; U += 1) {
                                    const F = T[U];
                                    let nt = null;
                                    if ("render" in F && "text" in F) {
                                        const {
                                            render: vt,
                                            text: Bt
                                        } = F;
                                        nt = vt(Bt), l.add(nt), m.set(nt, Bt), d.delete(Bt)
                                    } else "item" in F && (nt = F.item);
                                    nt instanceof HTMLElement && (h && P(s && nt.querySelector(s) || nt, h ? a : "", g(nt)), tt.appendChild(nt))
                                }
                                O = G;
                                let V = !1;
                                if (k instanceof HTMLInputElement)
                                    for (const U of tt.querySelectorAll('input[type="radio"]:checked')) U instanceof HTMLInputElement && U.value !== k.value && (U.checked = !1, V = !0);
                                if (j.appendChild(tt), k && V && k.dispatchEvent(new Event("change", {
                                        bubbles: !0
                                    })), G < T.length) requestAnimationFrame(B);
                                else {
                                    j.hidden = T.length === 0;
                                    const U = this.querySelector("[data-fuzzy-list-show-on-empty]");
                                    U && (U.hidden = T.length > 0), this.dispatchEvent(new CustomEvent("fuzzy-list-sorted", {
                                        detail: T.length
                                    }))
                                }
                            }, "nextBatch");
                            B()
                        })
                    }
                    get value() {
                        return this.getAttribute("value") || ""
                    }
                    set value(e) {
                        this.setAttribute("value", e)
                    }
                    get markSelector() {
                        return this.getAttribute("mark-selector") || ""
                    }
                    set markSelector(e) {
                        e ? this.setAttribute("mark-selector", e) : this.removeAttribute("mark-selector")
                    }
                    get minScore() {
                        return Number(this.getAttribute("min-score") || 0)
                    }
                    set minScore(e) {
                        Number.isNaN(e) || this.setAttribute("min-score", String(e))
                    }
                    get maxMatches() {
                        return Number(this.getAttribute("max-matches") || 1 / 0)
                    }
                    set maxMatches(e) {
                        Number.isNaN(e) || this.setAttribute("max-matches", String(e))
                    }
                    static get observedAttributes() {
                        return ["value", "mark-selector", "min-score", "max-matches"]
                    }
                    attributeChangedCallback(e, n, o) {
                        if (n === o) return;
                        const s = y.get(this);
                        !s || (s.timer && window.clearTimeout(s.timer), s.timer = window.setTimeout(() => this.sort(), 100))
                    }
                }
                r(p, "FuzzyListElement");
                const L = p;
                window.customElements.get("fuzzy-list") || (window.FuzzyListElement = p, window.customElements.define("fuzzy-list", p));
                var E = r((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "__accessCheck"),
                    b = r((t, e, n) => (E(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "__privateGet"),
                    C = r((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "__privateAdd"),
                    x = r((t, e, n, o) => (E(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "__privateSet"),
                    $, H, J, Y, dt, wt, it;
                class kt extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        C(this, $, !1), C(this, H, new Set), C(this, J, new Map), C(this, Y, 1 / 0), C(this, dt, new Map), C(this, wt, new Map), C(this, it, 0)
                    }
                    static get observedAttributes() {
                        return ["data-updating"]
                    }
                    get updating() {
                        return this.getAttribute("data-updating") === "lazy" ? "lazy" : "eager"
                    }
                    set updating(e) {
                        this.setAttribute("data-updating", e)
                    }
                    get size() {
                        return b(this, H).size
                    }
                    get range() {
                        const e = this.getBoundingClientRect().height,
                            {
                                scrollTop: n
                            } = this,
                            o = `${n}-${e}`;
                        if (b(this, dt).has(o)) return b(this, dt).get(o);
                        let s = 0,
                            i = 0,
                            a = 0,
                            c = 0;
                        const l = b(this, J);
                        for (const d of b(this, H)) {
                            const h = l.get(d) || b(this, Y);
                            if (a + h < n) a += h, s += 1, i += 1;
                            else if (c - h < e) c += h, i += 1;
                            else if (c >= e) break
                        }
                        return [s, i]
                    }
                    attributeChangedCallback(e, n, o) {
                        if (n === o || !this.isConnected) return;
                        const s = e === "data-updating" && o === "eager",
                            i = e === "data-sorted" && this.hasAttribute("data-sorted");
                        (s || i) && this.update()
                    }
                    connectedCallback() {
                        this.addEventListener("scroll", () => this.update()), this.updateSync = this.updateSync.bind(this)
                    }
                    update() {
                        b(this, it) && cancelAnimationFrame(b(this, it)), !b(this, $) && this.hasAttribute("data-sorted") ? x(this, it, requestAnimationFrame(() => {
                            this.dispatchEvent(new CustomEvent("virtual-list-sort", {
                                cancelable: !0
                            })) && this.sort()
                        })) : x(this, it, requestAnimationFrame(this.updateSync))
                    }
                    renderItem(e) {
                        const n = {
                            item: e,
                            fragment: document.createDocumentFragment()
                        };
                        return this.dispatchEvent(new CustomEvent("virtual-list-render-item", {
                            detail: n
                        })), n.fragment.children[0]
                    }
                    recalculateHeights(e) {
                        const n = this.querySelector("ul, ol, tbody");
                        n && (n.append(this.renderItem(e)), x(this, Y, n.children[0].getBoundingClientRect().height), b(this, J).set(e, b(this, Y)), n.replaceChildren())
                    }
                    updateSync() {
                        const e = this.querySelector("ul, ol");
                        if (!e) return;
                        const [n, o] = this.range;
                        if (o < n || !this.dispatchEvent(new CustomEvent("virtual-list-update", {
                                cancelable: !0
                            }))) return;
                        const i = new Map,
                            a = b(this, wt);
                        let c = -1,
                            l = !0,
                            d = 0;
                        for (const O of b(this, H)) {
                            if (c === -1 && (!Number.isFinite(b(this, Y)) || b(this, Y) === 0) && this.recalculateHeights(O), c += 1, c < n) {
                                d += b(this, J).get(O) || b(this, Y);
                                continue
                            }
                            if (c > o) {
                                l = !1;
                                break
                            }
                            let B = null;
                            if (a.has(O)) B = a.get(O);
                            else {
                                if (B = this.renderItem(O), !B) continue;
                                a.set(O, B)
                            }
                            i.set(O, B)
                        }
                        e.replaceChildren(...i.values()), e.style.paddingTop = `${d}px`;
                        const h = this.size * b(this, Y);
                        e.style.height = `${h||0}px`;
                        let j = !1;
                        const T = this.getBoundingClientRect().bottom;
                        for (const [O, B] of i) {
                            const {
                                height: G,
                                bottom: tt
                            } = B.getBoundingClientRect();
                            j = j || tt >= T, b(this, J).set(O, G)
                        }
                        if (!l && this.size > i.size && !j) return b(this, dt).delete(`${this.scrollTop}-${this.getBoundingClientRect().height}`), this.update();
                        this.dispatchEvent(new CustomEvent("virtual-list-updated"))
                    }
                    has(e) {
                        return b(this, H).has(e)
                    }
                    add(e) {
                        return b(this, H).add(e), x(this, $, !1), Number.isFinite(b(this, Y)) || this.recalculateHeights(e), this.updating === "eager" && this.update(), this
                    }
                    delete(e) {
                        const n = b(this, H).delete(e);
                        return x(this, $, !1), b(this, J).delete(e), this.updating === "eager" && this.update(), n
                    }
                    clear() {
                        b(this, H).clear(), b(this, J).clear(), x(this, Y, 1 / 0), x(this, $, !0), this.updating === "eager" && this.update()
                    }
                    forEach(e, n) {
                        for (const o of this) e.call(n, o, o, this)
                    }
                    entries() {
                        return b(this, H).entries()
                    }
                    values() {
                        return b(this, H).values()
                    }
                    keys() {
                        return b(this, H).keys()
                    }[Symbol.iterator]() {
                        return b(this, H)[Symbol.iterator]()
                    }
                    sort(e) {
                        return x(this, H, new Set(Array.from(this).sort(e))), x(this, $, !0), this.updating === "eager" && this.update(), this
                    }
                }
                r(kt, "VirtualListElement"), $ = new WeakMap, H = new WeakMap, J = new WeakMap, Y = new WeakMap, dt = new WeakMap, wt = new WeakMap, it = new WeakMap;
                const Ie = null;
                window.customElements.get("virtual-list") || (window.VirtualListElement = kt, window.customElements.define("virtual-list", kt));
                var W = r((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "virtual_filter_input_element_accessCheck"),
                    S = r((t, e, n) => (W(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "virtual_filter_input_element_privateGet"),
                    R = r((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "virtual_filter_input_element_privateAdd"),
                    D = r((t, e, n, o) => (W(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "virtual_filter_input_element_privateSet"),
                    z, Q, ct, Et, Ft, rt;

                function Zt(t) {
                    return Boolean(t instanceof Set || t && typeof t == "object" && "size" in t && "add" in t && "delete" in t && "clear" in t)
                }
                r(Zt, "isSetAlike");
                class kn extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        R(this, z, void 0), R(this, Q, 0), R(this, ct, null), R(this, Et, void 0), R(this, Ft, new Set), R(this, rt, null), this.filter = (e, n) => String(e).includes(n)
                    }
                    static get observedAttributes() {
                        return ["src", "loading", "data-property", "aria-owns"]
                    }
                    get filtered() {
                        if (S(this, rt)) return S(this, rt);
                        if (this.hasAttribute("aria-owns")) {
                            const e = this.ownerDocument.getElementById(this.getAttribute("aria-owns") || "");
                            e && Zt(e) && D(this, rt, e)
                        }
                        return S(this, rt) || D(this, rt, new Set)
                    }
                    set filtered(e) {
                        D(this, rt, e)
                    }
                    get input() {
                        return this.querySelector("input, textarea")
                    }
                    get src() {
                        return this.getAttribute("src") || ""
                    }
                    set src(e) {
                        this.setAttribute("src", e)
                    }
                    get loading() {
                        return this.getAttribute("loading") === "lazy" ? "lazy" : "eager"
                    }
                    set loading(e) {
                        this.setAttribute("loading", e)
                    }
                    get accept() {
                        return this.getAttribute("accept") || ""
                    }
                    set accept(e) {
                        this.setAttribute("accept", e)
                    }
                    get property() {
                        return this.getAttribute("data-property") || ""
                    }
                    set property(e) {
                        this.setAttribute("data-property", e)
                    }
                    reset() {
                        this.filtered.clear(), D(this, Ft, new Set)
                    }
                    clear() {
                        !this.input || (this.input.value = "", this.input.dispatchEvent(new Event("input")))
                    }
                    attributeChangedCallback(e, n, o) {
                        const s = this.isConnected && this.src,
                            i = this.loading === "eager",
                            a = e === "src" || e === "loading" || e === "accept" || e === "data-property",
                            c = e === "src" || e === "data-property",
                            l = n !== o;
                        c && l && (D(this, ct, null), S(this, Et) && clearTimeout(S(this, Et))), s && i && a && l ? (cancelAnimationFrame(S(this, Q)), D(this, Q, requestAnimationFrame(() => this.load()))) : e === "aria-owns" && D(this, rt, null)
                    }
                    connectedCallback() {
                        this.src && this.loading === "eager" && (cancelAnimationFrame(S(this, Q)), D(this, Q, requestAnimationFrame(() => this.load())));
                        const e = this.input;
                        if (!e) return;
                        const n = this.getAttribute("aria-owns");
                        n !== null && this.attributeChangedCallback("aria-owns", "", n), e.setAttribute("autocomplete", "off"), e.setAttribute("spellcheck", "false"), this.src && this.loading === "lazy" && (document.activeElement === e ? this.load() : e.addEventListener("focus", () => {
                            this.load()
                        }, {
                            once: !0
                        })), e.addEventListener("input", this)
                    }
                    disconnectedCallback() {
                        var e;
                        (e = this.input) == null || e.removeEventListener("input", this)
                    }
                    handleEvent(e) {
                        var n, o;
                        e.type === "input" && (S(this, Et) && clearTimeout(S(this, Et)), D(this, Et, window.setTimeout(() => this.filterItems(), ((o = (n = this.input) == null ? void 0 : n.value) == null ? void 0 : o.length) || 0 < 3 ? 300 : 0)))
                    }
                    async load() {
                        var e;
                        (e = S(this, z)) == null || e.abort(), D(this, z, new AbortController);
                        const {
                            signal: n
                        } = S(this, z);
                        if (!this.src) throw new Error("missing src");
                        if (await new Promise(o => setTimeout(o, 0)), !n.aborted) {
                            this.dispatchEvent(new Event("loadstart"));
                            try {
                                const o = await this.fetch(this.request(), {
                                    signal: n
                                });
                                if (location.origin + this.src !== o.url) return;
                                if (!o.ok) throw new Error(`Failed to load resource: the server responded with a status of ${o.status}`);
                                D(this, Ft, new Set((await o.json())[this.property])), D(this, ct, null), this.dispatchEvent(new Event("loadend"))
                            } catch (o) {
                                if (n.aborted) {
                                    this.dispatchEvent(new Event("loadend"));
                                    return
                                }
                                throw (async () => (this.dispatchEvent(new Event("error")), this.dispatchEvent(new Event("loadend"))))(), o
                            }
                            this.filtered.clear(), this.filterItems()
                        }
                    }
                    request() {
                        return new Request(this.src, {
                            method: "GET",
                            credentials: "same-origin",
                            headers: {
                                Accept: this.accept || "application/json"
                            }
                        })
                    }
                    fetch(e, n) {
                        return fetch(e, n)
                    }
                    filterItems() {
                        var e, n;
                        const o = (n = (e = this.input) == null ? void 0 : e.value.trim()) != null ? n : "",
                            s = S(this, ct);
                        if (D(this, ct, o), o === s) return;
                        this.dispatchEvent(new CustomEvent("virtual-filter-input-filter"));
                        let i;
                        s && o.includes(s) ? i = this.filtered : (i = S(this, Ft), this.filtered.clear());
                        for (const a of i) this.filter(a, o) ? this.filtered.add(a) : this.filtered.delete(a);
                        this.dispatchEvent(new CustomEvent("virtual-filter-input-filtered"))
                    }
                }
                r(kn, "VirtualFilterInputElement"), z = new WeakMap, Q = new WeakMap, ct = new WeakMap, Et = new WeakMap, Ft = new WeakMap, rt = new WeakMap;
                const af = null;
                window.customElements.get("virtual-filter-input") || (window.VirtualFilterInputElement = kn, window.customElements.define("virtual-filter-input", kn));
                var Ho = r((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "marked_text_element_accessCheck"),
                    Ut = r((t, e, n) => (Ho(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "marked_text_element_privateGet"),
                    Re = r((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "marked_text_element_privateAdd"),
                    De = r((t, e, n, o) => (Ho(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "marked_text_element_privateSet"),
                    Ne, _e, Jt, ue;

                function Ei(t, e) {
                    const n = [];
                    let o = 0;
                    for (let s = 0; s < t.length; s++) {
                        const i = t[s],
                            a = e.indexOf(i, o);
                        if (a === -1) return n;
                        o = a + 1, n.push(a)
                    }
                    return n
                }
                r(Ei, "defaultPositions");
                class He extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        Re(this, Ne, ""), Re(this, _e, ""), Re(this, Jt, void 0), Re(this, ue, void 0)
                    }
                    get query() {
                        return this.ownerInput ? this.ownerInput.value : this.getAttribute("query") || ""
                    }
                    set query(e) {
                        this.setAttribute("query", e)
                    }
                    get ownerInput() {
                        const e = this.ownerDocument.getElementById(this.getAttribute("data-owner-input") || "");
                        return e instanceof HTMLInputElement ? e : null
                    }
                    connectedCallback() {
                        var e;
                        this.handleEvent(), (e = this.ownerInput) == null || e.addEventListener("input", this), De(this, Jt, new MutationObserver(() => this.handleEvent()))
                    }
                    handleEvent() {
                        Ut(this, ue) && cancelAnimationFrame(Ut(this, ue)), De(this, ue, requestAnimationFrame(() => this.mark()))
                    }
                    disconnectedCallback() {
                        var e;
                        (e = this.ownerInput) == null || e.removeEventListener("input", this), Ut(this, Jt).disconnect()
                    }
                    mark() {
                        const e = this.textContent || "",
                            n = this.query;
                        if (e === Ut(this, Ne) && n === Ut(this, _e)) return;
                        De(this, Ne, e), De(this, _e, n), Ut(this, Jt).disconnect();
                        let o = 0;
                        const s = document.createDocumentFragment();
                        for (const i of (this.positions || Ei)(n, e)) {
                            if (Number(i) !== i || i < o || i > e.length) continue;
                            e.slice(o, i) !== "" && s.appendChild(document.createTextNode(e.slice(o, i))), o = i + 1;
                            const c = document.createElement("mark");
                            c.textContent = e[i], s.appendChild(c)
                        }
                        s.appendChild(document.createTextNode(e.slice(o))), this.replaceChildren(s), Ut(this, Jt).observe(this, {
                            attributes: !0,
                            childList: !0,
                            subtree: !0
                        })
                    }
                }
                r(He, "MarkedTextElement"), Ne = new WeakMap, _e = new WeakMap, Jt = new WeakMap, ue = new WeakMap, He.observedAttributes = ["query", "data-owner-input"];
                const cf = null;
                window.customElements.get("marked-text") || (window.MarkedTextElement = He, window.customElements.define("marked-text", He));
                var I = u(90420),
                    Li = Object.defineProperty,
                    Si = Object.getOwnPropertyDescriptor,
                    Oe = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Si(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Li(e, n, s), s
                    }, "__decorateClass");
                let de = r(class extends HTMLElement {
                    updateURL(t) {
                        const e = t.currentTarget,
                            n = e.getAttribute("data-url") || "";
                        if (this.helpField.value = n, e.matches(".js-git-protocol-clone-url"))
                            for (const o of this.helpTexts) o.textContent = n;
                        for (const o of this.cloneURLButtons) o.classList.remove("selected");
                        e.classList.add("selected")
                    }
                }, "GitCloneHelpElement");
                Oe([I.fA], de.prototype, "helpField", 2), Oe([I.GO], de.prototype, "helpTexts", 2), Oe([I.GO], de.prototype, "cloneURLButtons", 2), de = Oe([I.Ih], de);
                var Be = u(90087);
                class $e extends HTMLElement {
                    connectedCallback() {
                        this.addEventListener("input", Oo)
                    }
                    disconnectedCallback() {
                        this.removeEventListener("input", Oo)
                    }
                }
                r($e, "PasswordStrengthElement"), window.customElements.get("password-strength") || (window.PasswordStrengthElement = $e, window.customElements.define("password-strength", $e));

                function Oo(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof $e)) return;
                    const n = t.target;
                    if (!(n instanceof HTMLInputElement)) return;
                    const o = n.form;
                    if (!(o instanceof HTMLFormElement)) return;
                    const s = ji(n.value, {
                        minimumCharacterCount: Number(e.getAttribute("minimum-character-count")),
                        passphraseLength: Number(e.getAttribute("passphrase-length"))
                    });
                    if (s.valid) {
                        n.setCustomValidity("");
                        const i = e.querySelector("dl.form-group");
                        i && (i.classList.remove("errored"), i.classList.add("successed"))
                    } else n.setCustomValidity(e.getAttribute("invalid-message") || "Invalid");
                    Ti(e, s), (0, Be.G)(o)
                }
                r(Oo, "onInput");

                function ji(t, e) {
                    const n = {
                        valid: !1,
                        hasMinimumCharacterCount: t.length >= e.minimumCharacterCount,
                        hasMinimumPassphraseLength: e.passphraseLength !== 0 && t.length >= e.passphraseLength,
                        hasLowerCase: /[a-z]/.test(t),
                        hasNumber: /\d/.test(t)
                    };
                    return n.valid = n.hasMinimumPassphraseLength || n.hasMinimumCharacterCount && n.hasLowerCase && n.hasNumber, n
                }
                r(ji, "validatePassword");

                function Ti(t, e) {
                    var n, o;
                    const s = t.querySelector("[data-more-than-n-chars]"),
                        i = t.querySelector("[data-min-chars]"),
                        a = t.querySelector("[data-number-requirement]"),
                        c = t.querySelector("[data-letter-requirement]"),
                        l = ((n = t.getAttribute("error-class")) == null ? void 0 : n.split(" ").filter(h => h.length > 0)) || [],
                        d = ((o = t.getAttribute("pass-class")) == null ? void 0 : o.split(" ").filter(h => h.length > 0)) || [];
                    for (const h of [s, i, a, c]) h == null || h.classList.remove(...l, ...d);
                    if (e.hasMinimumPassphraseLength && s) s.classList.add(...d);
                    else if (e.valid) i.classList.add(...d), a.classList.add(...d), c.classList.add(...d);
                    else {
                        const h = e.hasMinimumCharacterCount ? d : l,
                            j = e.hasNumber ? d : l,
                            T = e.hasLowerCase ? d : l;
                        s == null || s.classList.add(...l), i.classList.add(...h), a.classList.add(...j), c.classList.add(...T)
                    }
                }
                r(Ti, "highlightPasswordStrengthExplainer");
                var lf = u(20963),
                    uf = u(19935),
                    Bo = u(27034);
                class xn extends Bo.Z {
                    async fetch(e, n = 1e3) {
                        const o = await super.fetch(e);
                        return o.status === 202 ? (await new Promise(s => setTimeout(s, n)), this.fetch(e, n * 1.5)) : o
                    }
                }
                r(xn, "PollIncludeFragmentElement"), window.customElements.get("poll-include-fragment") || (window.PollIncludeFragmentElement = xn, window.customElements.define("poll-include-fragment", xn));
                var Ai = u(75329);
                class Mn extends Ai.nJ {
                    connectedCallback() {
                        fe.push(this), Fe || ($o(), Fe = window.setInterval($o, 1e3))
                    }
                    disconnectedCallback() {
                        const e = fe.indexOf(this);
                        e !== -1 && fe.splice(e, 1), fe.length || (window.clearInterval(Fe), Fe = void 0)
                    }
                    getFormattedDate() {
                        const e = this.date;
                        if (!e) return;
                        const n = new Date().getTime() - e.getTime(),
                            o = Math.floor(n / 1e3),
                            s = Math.floor(o / 60),
                            i = Math.floor(s / 60),
                            a = Math.floor(i / 24),
                            c = o - s * 60,
                            l = s - i * 60,
                            d = i - a * 24;
                        return s < 1 ? this.applyPrecision([`${o}s`]) : i < 1 ? this.applyPrecision([`${s}m`, `${c}s`]) : a < 1 ? this.applyPrecision([`${i}h`, `${l}m`, `${c}s`]) : this.applyPrecision([`${a}d`, `${d}h`, `${l}m`, `${c}s`])
                    }
                    applyPrecision(e) {
                        const n = Number(this.getAttribute("data-precision") || e.length);
                        return e.slice(0, n).join(" ")
                    }
                }
                r(Mn, "PreciseTimeAgoElement");
                const fe = [];
                let Fe;

                function $o() {
                    for (const t of fe) t.textContent = t.getFormattedDate() || ""
                }
                r($o, "updateNowElements"), window.customElements.get("precise-time-ago") || (window.PreciseTimeAgoElement = Mn, window.customElements.define("precise-time-ago", Mn));
                var Fo = u(10160);
                const Ci = /\s|\(|\[/;

                function ki(t, e, n) {
                    const o = t.lastIndexOf(e, n - 1);
                    if (o === -1 || t.lastIndexOf(" ", n - 1) > o) return;
                    const i = t[o - 1];
                    return i && !Ci.test(i) ? void 0 : {
                        word: t.substring(o + e.length, n),
                        position: o + e.length,
                        beginningOfLine: xi(i)
                    }
                }
                r(ki, "keyword");
                const xi = r(t => t === void 0 || /\n/.test(t), "isBeginningOfLine"),
                    Mi = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"],
                    Uo = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"],
                    Wo = new WeakMap;

                function qi(t, e) {
                    const n = t.nodeName.toLowerCase();
                    if (n !== "textarea" && n !== "input") throw new Error("expected textField to a textarea or input");
                    let o = Wo.get(t);
                    if (o && o.parentElement === t.parentElement) o.innerHTML = "";
                    else {
                        o = document.createElement("div"), Wo.set(t, o);
                        const c = window.getComputedStyle(t),
                            l = Mi.slice(0);
                        n === "textarea" ? l.push("white-space:pre-wrap;") : l.push("white-space:nowrap;");
                        for (let d = 0, h = Uo.length; d < h; d++) {
                            const j = Uo[d];
                            l.push(`${j}:${c.getPropertyValue(j)};`)
                        }
                        o.style.cssText = l.join(" ")
                    }
                    const s = document.createElement("span");
                    s.style.cssText = "position: absolute;", s.innerHTML = "&nbsp;";
                    let i, a;
                    if (typeof e == "number") {
                        let c = t.value.substring(0, e);
                        c && (i = document.createTextNode(c)), c = t.value.substring(e), c && (a = document.createTextNode(c))
                    } else {
                        const c = t.value;
                        c && (i = document.createTextNode(c))
                    }
                    if (i && o.appendChild(i), o.appendChild(s), a && o.appendChild(a), !o.parentElement) {
                        if (!t.parentElement) throw new Error("textField must have a parentElement to mirror");
                        t.parentElement.insertBefore(o, t)
                    }
                    return o.scrollTop = t.scrollTop, o.scrollLeft = t.scrollLeft, {
                        mirror: o,
                        marker: s
                    }
                }
                r(qi, "textFieldMirror");

                function Pi(t, e = t.selectionEnd) {
                    const {
                        mirror: n,
                        marker: o
                    } = qi(t, e), s = n.getBoundingClientRect(), i = o.getBoundingClientRect();
                    return setTimeout(() => {
                        n.remove()
                    }, 5e3), {
                        top: i.top - s.top,
                        left: i.left - s.left
                    }
                }
                r(Pi, "textFieldSelectionPosition");
                const Yt = new WeakMap;
                class zo {
                    constructor(e, n) {
                        this.expander = e, this.input = n, this.combobox = null, this.menu = null, this.match = null, this.justPasted = !1, this.oninput = this.onInput.bind(this), this.onpaste = this.onPaste.bind(this), this.onkeydown = this.onKeydown.bind(this), this.oncommit = this.onCommit.bind(this), this.onmousedown = this.onMousedown.bind(this), this.onblur = this.onBlur.bind(this), this.interactingWithMenu = !1, n.addEventListener("paste", this.onpaste), n.addEventListener("input", this.oninput), n.addEventListener("keydown", this.onkeydown), n.addEventListener("blur", this.onblur)
                    }
                    destroy() {
                        this.input.removeEventListener("paste", this.onpaste), this.input.removeEventListener("input", this.oninput), this.input.removeEventListener("keydown", this.onkeydown), this.input.removeEventListener("blur", this.onblur)
                    }
                    activate(e, n) {
                        this.input === document.activeElement && this.setMenu(e, n)
                    }
                    deactivate() {
                        const e = this.menu,
                            n = this.combobox;
                        return !e || !n ? !1 : (this.menu = null, this.combobox = null, e.removeEventListener("combobox-commit", this.oncommit), e.removeEventListener("mousedown", this.onmousedown), n.destroy(), e.remove(), !0)
                    }
                    setMenu(e, n) {
                        this.deactivate(), this.menu = n, n.id || (n.id = `text-expander-${Math.floor(Math.random()*1e5).toString()}`), this.expander.append(n);
                        const o = n.querySelector(".js-slash-command-menu-items");
                        o ? this.combobox = new Fo.Z(this.input, o) : this.combobox = new Fo.Z(this.input, n);
                        const {
                            top: s,
                            left: i
                        } = Pi(this.input, e.position), a = parseInt(window.getComputedStyle(this.input).fontSize);
                        n.style.top = `${s+a}px`, n.style.left = `${i}px`, this.combobox.start(), n.addEventListener("combobox-commit", this.oncommit), n.addEventListener("mousedown", this.onmousedown), this.combobox.navigate(1)
                    }
                    setValue(e) {
                        if (e == null) return;
                        const n = this.match;
                        if (!n) return;
                        const o = this.input.value.substring(0, n.position - n.key.length),
                            s = this.input.value.substring(n.position + n.text.length);
                        let {
                            cursor: i,
                            value: a
                        } = this.replaceCursorMark(e);
                        a = (a == null ? void 0 : a.length) === 0 ? a : `${a} `, this.input.value = o + a + s, this.deactivate(), this.input.focus(), i = o.length + (i || a.length), this.input.selectionStart = i, this.input.selectionEnd = i
                    }
                    replaceCursorMark(e) {
                        const n = /%cursor%/gm,
                            o = n.exec(e);
                        return o ? {
                            cursor: o.index,
                            value: e.replace(n, "")
                        } : {
                            cursor: null,
                            value: e
                        }
                    }
                    onCommit({
                        target: e
                    }) {
                        const n = e;
                        if (!(n instanceof HTMLElement) || !this.combobox) return;
                        const o = this.match;
                        if (!o) return;
                        const s = {
                            item: n,
                            key: o.key,
                            value: null
                        };
                        !this.expander.dispatchEvent(new CustomEvent("text-expander-value", {
                            cancelable: !0,
                            detail: s
                        })) || s.value && this.setValue(s.value)
                    }
                    onBlur() {
                        if (this.interactingWithMenu) {
                            this.interactingWithMenu = !1;
                            return
                        }
                        this.deactivate()
                    }
                    onPaste() {
                        this.justPasted = !0
                    }
                    async delay(e) {
                        return new Promise(n => setTimeout(n, e))
                    }
                    async onInput() {
                        if (this.justPasted) {
                            this.justPasted = !1;
                            return
                        }
                        const e = this.findMatch();
                        if (e) {
                            if (this.match = e, await this.delay(this.appropriateDelay(this.match)), this.match !== e) return;
                            const n = await this.notifyProviders(e);
                            if (!this.match) return;
                            n ? this.activate(e, n) : this.deactivate()
                        } else this.match = null, this.deactivate()
                    }
                    appropriateDelay(e) {
                        return e.beginningOfLine || e.text !== "" ? 0 : 250
                    }
                    findMatch() {
                        const e = this.input.selectionEnd,
                            n = this.input.value;
                        for (const o of this.expander.keys) {
                            const s = ki(n, o, e);
                            if (s) return {
                                text: s.word,
                                key: o,
                                position: s.position,
                                beginningOfLine: s.beginningOfLine
                            }
                        }
                    }
                    async notifyProviders(e) {
                        const n = [],
                            o = r(c => n.push(c), "provide");
                        return this.expander.dispatchEvent(new CustomEvent("text-expander-change", {
                            cancelable: !0,
                            detail: {
                                provide: o,
                                text: e.text,
                                key: e.key
                            }
                        })) ? (await Promise.all(n)).filter(c => c.matched).map(c => c.fragment)[0] : void 0
                    }
                    onMousedown() {
                        this.interactingWithMenu = !0
                    }
                    onKeydown(e) {
                        e.key === "Escape" && this.deactivate() && (e.stopImmediatePropagation(), e.preventDefault())
                    }
                }
                r(zo, "SlashCommandExpander");
                class qn extends HTMLElement {
                    get keys() {
                        const e = this.getAttribute("keys");
                        return e ? e.split(" ") : []
                    }
                    connectedCallback() {
                        const e = this.querySelector('input[type="text"], textarea');
                        if (!(e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement)) return;
                        const n = new zo(this, e);
                        Yt.set(this, n)
                    }
                    disconnectedCallback() {
                        const e = Yt.get(this);
                        !e || (e.destroy(), Yt.delete(this))
                    }
                    setValue(e) {
                        const n = Yt.get(this);
                        !n || n.setValue(e)
                    }
                    setMenu(e, n = !1) {
                        const o = Yt.get(this);
                        !o || !o.match || (n && (o.interactingWithMenu = !0), o.setMenu(o.match, e))
                    }
                    closeMenu() {
                        const e = Yt.get(this);
                        !e || e.setValue("")
                    }
                    isLoading() {
                        const e = this.getElementsByClassName("js-slash-command-expander-loading")[0];
                        if (e) {
                            const n = e.cloneNode(!0);
                            n.classList.remove("d-none"), this.setMenu(n)
                        }
                    }
                    showError() {
                        const e = this.getElementsByClassName("js-slash-command-expander-error")[0];
                        if (e) {
                            const n = e.cloneNode(!0);
                            n.classList.remove("d-none"), this.setMenu(n)
                        }
                    }
                }
                r(qn, "SlashCommandExpanderElement"), window.customElements.get("slash-command-expander") || (window.SlashCommandExpanderElement = qn, window.customElements.define("slash-command-expander", qn));
                var me = u(52134),
                    f = u(59753);
                (0, f.on)("deprecatedAjaxSend", "[data-remote]", function(t) {
                    t.currentTarget === t.target && (t.defaultPrevented || t.currentTarget.classList.add("loading"))
                }), (0, f.on)("deprecatedAjaxComplete", "[data-remote]", function(t) {
                    t.currentTarget === t.target && t.currentTarget.classList.remove("loading")
                });
                var K = u(65935);
                (0, K.AC)("form.js-ajax-pagination, .js-ajax-pagination form", async function(t, e) {
                    const n = t.closest(".js-ajax-pagination");
                    let o;
                    try {
                        o = await e.html()
                    } catch (s) {
                        if (s.response && s.response.status === 404) {
                            n.remove();
                            return
                        } else throw s
                    }
                    n.replaceWith(o.html), (0, f.f)(t, "page:loaded")
                });
                var Qt = u(95186);
                const Ii = "analytics.click";
                (0, f.on)("click", "[data-analytics-event]", t => {
                    const n = t.currentTarget.getAttribute("data-analytics-event");
                    if (!n) return;
                    const o = JSON.parse(n);
                    (0, Qt.q)(Ii, o)
                });
                var ft = u(1314);
                document.addEventListener("pjax:start", function() {
                    (0, ft.x)("Loading page")
                }), document.addEventListener("pjax:error", function() {
                    (0, ft.x)("Loading failed")
                }), document.addEventListener("pjax:end", function() {
                    (0, ft.x)("Loading complete")
                });
                var v = u(64463);
                const Vo = new WeakMap;
                (0, v.N7)("auto-check", function(t) {
                    if (t.classList.contains("js-prevent-default-behavior")) return;
                    const e = t.querySelector("input");
                    if (!e) return;
                    const n = e.closest(".form-group") || t,
                        o = e.form;
                    let s;

                    function i() {
                        return s || (s = `input-check-${(Math.random()*1e4).toFixed(0)}`), s
                    }
                    r(i, "generateId");
                    const a = e.getAttribute("aria-describedby");
                    e.addEventListener("focusout:delay", () => {
                        e.setAttribute("aria-describedby", [s, a].join(" "))
                    });
                    const c = n.querySelector("p.note");
                    c && (c.id || (c.id = i()), Vo.set(c, c.innerHTML)), t.addEventListener("loadstart", () => {
                        Pn(e, n), n.classList.add("is-loading"), e.classList.add("is-autocheck-loading"), (0, Be.G)(o)
                    }), t.addEventListener("loadend", () => {
                        n.classList.remove("is-loading"), e.classList.remove("is-autocheck-loading")
                    }), e.addEventListener("auto-check-success", async l => {
                        e.classList.add("is-autocheck-successful"), n.classList.add("successed"), (0, Be.G)(o);
                        const {
                            response: d
                        } = l.detail;
                        if (!d) return;
                        const h = await d.text();
                        if (!!h) {
                            if (c instanceof HTMLElement) c.innerHTML = h, (0, ft.N)(c);
                            else {
                                const j = d.status === 200,
                                    T = n.tagName === "DL" ? "dd" : "div",
                                    k = document.createElement(T);
                                k.id = i(), k.classList.add(j ? "success" : "warning"), k.innerHTML = h, n.append(k), n.classList.add(j ? "successed" : "warn"), (0, ft.N)(k), j && (k.hidden = document.activeElement !== e)
                            }(0, f.f)(e, "auto-check-message-updated")
                        }
                    }), e.addEventListener("auto-check-error", async l => {
                        e.classList.add("is-autocheck-errored"), n.classList.add("errored"), (0, Be.G)(o);
                        const {
                            response: d
                        } = l.detail;
                        if (!d) return;
                        const h = await d.text();
                        if (c instanceof HTMLElement) c.innerHTML = h || "Something went wrong", (0, ft.N)(c);
                        else {
                            const j = n.tagName === "DL" ? "dd" : "div",
                                T = document.createElement(j);
                            T.id = i(), T.classList.add("error"), T.innerHTML = h || "Something went wrong", n.append(T), (0, ft.N)(T)
                        }
                    }), e.addEventListener("input", () => {
                        e.removeAttribute("aria-describedby"), e.value || Pn(e, n)
                    }), e.addEventListener("blur", () => {
                        const l = n.querySelector(".success");
                        l && (l.hidden = !0)
                    }), e.addEventListener("focus", () => {
                        const l = n.querySelector(".success");
                        l && (l.hidden = !1)
                    }), o.addEventListener("reset", () => {
                        Pn(e, n)
                    })
                });

                function Pn(t, e) {
                    var n, o, s, i, a, c;
                    e.classList.remove("is-loading", "successed", "errored", "warn"), t.classList.remove("is-autocheck-loading", "is-autocheck-successful", "is-autocheck-errored");
                    const l = e.querySelector("p.note");
                    if (l) {
                        const d = Vo.get(l);
                        d && (l.innerHTML = d)
                    }
                    e.tagName === "DL" ? ((n = e.querySelector("dd.error")) == null || n.remove(), (o = e.querySelector("dd.warning")) == null || o.remove(), (s = e.querySelector("dd.success")) == null || s.remove()) : ((i = e.querySelector("div.error")) == null || i.remove(), (a = e.querySelector("div.warning")) == null || a.remove(), (c = e.querySelector("div.success")) == null || c.remove())
                }
                r(Pn, "autocheck_reset");
                var Ri = u(46481);
                (0, v.N7)("auto-complete", function(t) {
                    t.addEventListener("loadstart", () => t.classList.add("is-auto-complete-loading")), t.addEventListener("loadend", () => t.classList.remove("is-auto-complete-loading"))
                }), (0, v.N7)("auto-complete", {
                    constructor: Ri.Z,
                    initialize: Ko
                }), (0, f.on)("auto-complete-change", "auto-complete", function(t) {
                    Ko(t.currentTarget)
                });

                function Ko(t) {
                    const e = t.closest("form");
                    if (!e) return;
                    const n = e.querySelector(".js-auto-complete-button");
                    n instanceof HTMLButtonElement && (n.disabled = !t.value)
                }
                r(Ko, "toggleSubmitButton");
                var Z = u(82036),
                    Lt = u(10900),
                    te = u(40728);
                let In = null;
                (0, f.on)("submit", "[data-autosearch-results-container]", async function(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLFormElement)) return;
                    t.preventDefault(), In == null || In.abort(), e.classList.add("is-sending");
                    const n = new URL(e.action, window.location.origin),
                        o = e.method,
                        s = new FormData(e),
                        i = (0, Z.KL)(n, s);
                    let a = null;
                    o === "get" ? n.search = i : a = s;
                    const {
                        signal: c
                    } = In = new AbortController, l = new Request(n.toString(), {
                        method: o,
                        body: a,
                        signal: c,
                        headers: {
                            Accept: "text/html",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    let d;
                    try {
                        d = await fetch(l)
                    } catch {}
                    if (e.classList.remove("is-sending"), !d || !d.ok || c.aborted) return;
                    const h = e.getAttribute("data-autosearch-results-container"),
                        j = h ? document.getElementById(h) : null;
                    j && (j.innerHTML = "", j.appendChild((0, Lt.r)(document, await d.text()))), (0, te.lO)(null, "", `?${i}`)
                });
                var xt = u(12020),
                    X = u(84570);
                (0, X.ZG)("input[data-autoselect], textarea[data-autoselect]", async function(t) {
                    await (0, xt.gJ)(), t.select()
                });
                var ee = u(46263),
                    N = u(86404);
                (0, f.on)("change", "form[data-autosubmit]", function(t) {
                    const e = t.currentTarget;
                    (0, Z.Bt)(e)
                }), (0, f.on)("change", "input[data-autosubmit], select[data-autosubmit]", Xo);

                function Xo(t) {
                    const e = t.target;
                    if (!(e instanceof HTMLInputElement) && !(e instanceof HTMLSelectElement)) return;
                    const n = e.form;
                    (0, Z.Bt)(n)
                }
                r(Xo, "autosubmit_submit");
                const Di = (0, ee.D)(Xo, 300);
                (0, v.N7)("input[data-throttled-autosubmit]", {
                    subscribe: t => (0, N.RB)(t, "input", Di)
                });
                async function Ni(t) {
                    const e = t.getAttribute("data-url") || "";
                    if (await _i(e)) {
                        const o = t.getAttribute("data-gravatar-text");
                        o != null && (t.textContent = o)
                    }
                }
                r(Ni, "detectGravatar"), (0, v.N7)(".js-detect-gravatar", function(t) {
                    Ni(t)
                });
                async function _i(t) {
                    const e = t;
                    if (!e) return !1;
                    try {
                        const n = await fetch(e, {
                            headers: {
                                Accept: "application/json"
                            }
                        });
                        return n.ok ? (await n.json()).has_gravatar : !1
                    } catch {
                        return !1
                    }
                }
                r(_i, "fetchGravatarInfo");
                var Hi = Object.defineProperty,
                    Oi = Object.getOwnPropertyDescriptor,
                    Rn = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Oi(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Hi(e, n, s), s
                    }, "batch_deferred_content_decorateClass");
                class Go {
                    constructor(e = 50, n = 30) {
                        this.elements = [], this.timer = null, this.callbacks = [], this.csrf = null, this.timeout = e, this.limit = n
                    }
                    push(e) {
                        if (this.timer && (window.clearTimeout(this.timer), this.timer = null), e instanceof HTMLElement) {
                            const n = e.querySelector("[data-csrf]");
                            n !== null && (this.csrf = n.value)
                        }
                        this.elements.length >= this.limit && this.flush(), this.elements.push(e), this.timer = window.setTimeout(() => {
                            this.flush()
                        }, this.timeout)
                    }
                    onFlush(e) {
                        this.callbacks.push(e)
                    }
                    async flush() {
                        const e = this.elements.splice(0, this.limit);
                        e.length !== 0 && await Promise.all(this.callbacks.map(n => n(e)))
                    }
                }
                r(Go, "AutoFlushingQueue");
                async function Bi(t, e) {
                    const n = await fetch(t, {
                        method: "POST",
                        body: e,
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    if (n.ok) {
                        const o = await n.json(),
                            s = new Map;
                        for (const i in o) s.set(i, o[i]);
                        return s
                    } else return new Map
                }
                r(Bi, "fetchContents");
                const Zo = new Map;
                let Ue = r(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.url = ""
                    }
                    connectedCallback() {
                        this.queue.push(this)
                    }
                    get queue() {
                        let t = Zo.get(this.url);
                        return t || (t = this.buildAutoFlushingQueue(), Zo.set(this.url, t), t)
                    }
                    buildAutoFlushingQueue() {
                        const t = new Go;
                        return t.onFlush(async e => {
                            const n = new Map,
                                o = new FormData;
                            t.csrf !== null && o.set("authenticity_token", t.csrf);
                            let s = !1;
                            for (const a in e) {
                                const c = e[a],
                                    l = `item-${a}`;
                                n.set(l, c);
                                for (const d of c.inputs) o.append(`items[${l}][${d.name}]`, d.value);
                                e[a].getAttribute("data-use-get") === "1" && (s = !0)
                            }
                            s && o.set("_method", "GET");
                            const i = await Bi(this.url, o);
                            for (const [a, c] of i.entries()) n.get(a).replaceWith((0, Lt.r)(document, c))
                        }), t
                    }
                }, "BatchDeferredContentElement");
                Rn([I.Lj], Ue.prototype, "url", 2), Rn([I.GO], Ue.prototype, "inputs", 2), Ue = Rn([I.Ih], Ue);
                var he = u(43682),
                    Jo = u(57443),
                    We = u(12585);
                let Dn = null;
                (0, f.on)("click", ".js-org-signup-duration-change", t => {
                    t.preventDefault();
                    const n = t.currentTarget.getAttribute("data-plan-duration");
                    Fi(n), Wi(n);
                    for (const o of document.querySelectorAll(".js-seat-field")) ne(o);
                    $i()
                }), (0, f.on)("change", ".js-org-signup-duration-toggle", function({
                    currentTarget: t
                }) {
                    const e = document.getElementById("js-pjax-container"),
                        n = new URL(t.getAttribute("data-url"), window.location.origin);
                    (0, he.ZP)({
                        url: n.toString(),
                        container: e
                    })
                });
                async function ne(t) {
                    const e = t.getAttribute("data-item-name") || "items",
                        n = t.value,
                        o = new URL(t.getAttribute("data-url"), window.location.origin),
                        s = new URLSearchParams(o.search.slice(1)),
                        i = s.get("plan_duration") || t.getAttribute("data-plan-duration"),
                        a = parseInt(t.getAttribute("data-item-minimum")) || 0,
                        c = parseInt(t.getAttribute("data-item-maximum")) || i === "year" ? 100 : 300,
                        l = parseInt(t.getAttribute("data-item-count")) || 0,
                        d = Math.max(a, parseInt(n) || 0),
                        h = d > c,
                        j = document.querySelector(".js-downgrade-button"),
                        T = document.getElementById("downgrade-disabled-message");
                    j instanceof HTMLButtonElement && (j.disabled = d === l), T instanceof HTMLElement && j instanceof HTMLButtonElement && (T.hidden = !j.disabled), s.append(e, d.toString()), document.querySelector(".js-transform-user") && s.append("transform_user", "1"), o.search = s.toString(), Dn == null || Dn.abort();
                    const {
                        signal: O
                    } = Dn = new AbortController;
                    let B = null;
                    try {
                        const Gt = await fetch(o.toString(), {
                            signal: O,
                            headers: {
                                Accept: "application/json"
                            }
                        });
                        if (!Gt.ok) return;
                        B = await Gt.json()
                    } catch {}
                    if (O.aborted || !B) return;
                    const G = document.querySelector(".js-contact-us");
                    G && G.classList.toggle("d-none", !h);
                    const tt = document.querySelector(".js-payment-summary");
                    tt && tt.classList.toggle("d-none", h);
                    const V = document.querySelector(".js-submit-billing");
                    V instanceof HTMLElement && (V.hidden = h);
                    const U = document.querySelector(".js-billing-section");
                    U && U.classList.toggle("has-removed-contents", B.free || B.is_enterprise_cloud_trial);
                    const F = document.querySelector(".js-upgrade-info");
                    F && F.classList.toggle("d-none", d <= 0);
                    const nt = document.querySelector(".js-downgrade-info");
                    nt && nt.classList.toggle("d-none", d >= 0);
                    const vt = document.querySelector(".js-extra-seats-line-item");
                    vt && vt.classList.toggle("d-none", B.no_additional_seats), document.querySelector(".js-seat-field") && Ui(n);
                    const qe = document.querySelector(".js-minimum-seats-disclaimer");
                    qe && (qe.classList.toggle("tooltipped", B.seats === 5), qe.classList.toggle("tooltipped-nw", B.seats === 5));
                    const $t = B.selectors;
                    for (const Gt in $t)
                        for (const Pe of document.querySelectorAll(Gt)) Pe.innerHTML = $t[Gt];
                    (0, te.lO)((0, he.y0)(), "", B.url)
                }
                r(ne, "updateTotals");

                function $i() {
                    for (const t of document.querySelectorAll(".js-unit-price")) t.hidden = !t.hidden
                }
                r($i, "toggleDurationUnitPrices");

                function Fi(t) {
                    const e = t === "year" ? "month" : "year";
                    for (const o of document.querySelectorAll(".js-plan-duration-text")) o.innerHTML = t;
                    for (const o of document.querySelectorAll(".unstyled-available-plan-duration-adjective")) o.innerHTML = `${t}ly`;
                    for (const o of document.querySelectorAll(".js-org-signup-duration-change")) o.setAttribute("data-plan-duration", e);
                    const n = document.getElementById("signup-plan-duration");
                    n && (n.value = t)
                }
                r(Fi, "updateDurationFields");

                function Ui(t) {
                    var e;
                    for (const n of document.querySelectorAll(".js-seat-field")) {
                        const o = n.getAttribute("data-item-max-seats"),
                            s = (e = n == null ? void 0 : n.parentNode) == null ? void 0 : e.querySelector(".Popover");
                        o && o.length ? parseInt(t, 10) > parseInt(o, 10) ? (n.classList.add("color-border-danger-emphasis"), s == null || s.removeAttribute("hidden")) : (n.classList.remove("color-border-danger-emphasis"), s == null || s.setAttribute("hidden", "true"), n.value = t) : n.value = t
                    }
                }
                r(Ui, "updateSeatFields");

                function Wi(t) {
                    for (const e of document.querySelectorAll(".js-seat-field")) {
                        const n = new URL(e.getAttribute("data-url"), window.location.origin),
                            o = new URLSearchParams(n.search.slice(1));
                        o.delete("plan_duration"), o.append("plan_duration", t), n.search = o.toString(), e.setAttribute("data-url", n.toString())
                    }
                }
                r(Wi, "updateSeatFieldURLs"), (0, v.N7)(".js-addon-purchase-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        (0, We.Z)(t) && ne(t), (0, Jo.oq)(t, function() {
                            ne(t)
                        })
                    }
                }), (0, v.N7)(".js-addon-downgrade-field", {
                    constructor: HTMLSelectElement,
                    add(t) {
                        (0, We.Z)(t) && ne(t), t.addEventListener("change", function() {
                            ne(t)
                        })
                    }
                });

                function zi(t) {
                    const e = document.querySelector(".js-addon-purchase-field"),
                        n = t.target.querySelector("input:checked");
                    if (e instanceof HTMLInputElement && n instanceof HTMLInputElement) {
                        const o = n.getAttribute("data-upgrade-url");
                        o && (e.setAttribute("data-url", o), e.value = "0", ne(e))
                    }
                }
                r(zi, "handleOrgChange"), (0, f.on)("details-menu-selected", ".js-organization-container", zi, {
                    capture: !0
                }), (0, X.q6)(".js-csv-filter-field", function(t) {
                    const e = t.target.value.toLowerCase();
                    for (const n of document.querySelectorAll(".js-csv-data tbody tr")) n instanceof HTMLElement && (!n.textContent || (n.hidden = !!e && !n.textContent.toLowerCase().includes(e)))
                }), (0, v.N7)(".js-blob-header.is-stuck", {
                    add(t) {
                        Yo(t)
                    },
                    remove(t) {
                        Yo(t, !0)
                    }
                });

                function Yo(t, e = !1) {
                    const n = {
                        "tooltipped-nw": "tooltipped-sw",
                        "tooltipped-n": "tooltipped-s",
                        "tooltipped-ne": "tooltipped-se"
                    };
                    for (const [o, s] of Object.entries(n)) {
                        const i = e ? s : o,
                            a = e ? o : s;
                        for (const c of t.querySelectorAll(`.${i}`)) c.classList.replace(i, a)
                    }
                }
                r(Yo, "flipTooltip");

                function Qo(t) {
                    const e = t.match(/#?(?:L)(\d+)((?:C)(\d+))?/g);
                    if (e)
                        if (e.length === 1) {
                            const n = Nn(e[0]);
                            return n ? Object.freeze({
                                start: n,
                                end: n
                            }) : void 0
                        } else if (e.length === 2) {
                        const n = Nn(e[0]),
                            o = Nn(e[1]);
                        return !n || !o ? void 0 : ss(Object.freeze({
                            start: n,
                            end: o
                        }))
                    } else return;
                    else return
                }
                r(Qo, "parseBlobRange");

                function Vi(t) {
                    const {
                        start: e,
                        end: n
                    } = ss(t);
                    return e.column != null && n.column != null ? `L${e.line}C${e.column}-L${n.line}C${n.column}` : e.line === n.line ? `L${e.line}` : `L${e.line}-L${n.line}`
                }
                r(Vi, "formatBlobRange");

                function Ki(t) {
                    const e = t.match(/(file-.+?-)L\d+?/i);
                    return e ? e[1] : ""
                }
                r(Ki, "parseAnchorPrefix");

                function ts(t) {
                    const e = Qo(t),
                        n = Ki(t);
                    return {
                        blobRange: e,
                        anchorPrefix: n
                    }
                }
                r(ts, "parseFileAnchor");

                function Xi({
                    anchorPrefix: t,
                    blobRange: e
                }) {
                    return e ? `#${t}${Vi(e)}` : "#"
                }
                r(Xi, "formatBlobRangeAnchor");

                function Nn(t) {
                    const e = t.match(/L(\d+)/),
                        n = t.match(/C(\d+)/);
                    return e ? Object.freeze({
                        line: parseInt(e[1]),
                        column: n ? parseInt(n[1]) : null
                    }) : null
                }
                r(Nn, "parseBlobOffset");

                function es(t, e) {
                    const [n, o] = ns(t.start, !0, e), [s, i] = ns(t.end, !1, e);
                    if (!n || !s) return;
                    let a = o,
                        c = i;
                    if (a === -1 && (a = 0), c === -1 && (c = s.childNodes.length), !n.ownerDocument) throw new Error("DOMRange needs to be inside document");
                    const l = n.ownerDocument.createRange();
                    return l.setStart(n, a), l.setEnd(s, c), l
                }
                r(es, "DOMRangeFromBlob");

                function ns(t, e, n) {
                    const o = [null, 0],
                        s = n(t.line);
                    if (!s) return o;
                    if (t.column == null) return [s, -1];
                    let i = t.column - 1;
                    const a = os(s);
                    for (let c = 0; c < a.length; c++) {
                        const l = a[c],
                            d = i - (l.textContent || "").length;
                        if (d === 0) {
                            const h = a[c + 1];
                            return e && h ? [h, 0] : [l, i]
                        } else if (d < 0) return [l, i];
                        i = d
                    }
                    return o
                }
                r(ns, "findRangeOffset");

                function os(t) {
                    if (t.nodeType === Node.TEXT_NODE) return [t];
                    if (!t.childNodes || !t.childNodes.length) return [];
                    let e = [];
                    for (const n of t.childNodes) e = e.concat(os(n));
                    return e
                }
                r(os, "getAllTextNodes");

                function ss(t) {
                    const e = [t.start, t.end];
                    return e.sort(Gi), e[0] === t.start && e[1] === t.end ? t : Object.freeze({
                        start: e[0],
                        end: e[1]
                    })
                }
                r(ss, "ascendingBlobRange");

                function Gi(t, e) {
                    return t.line === e.line && t.column === e.column ? 0 : t.line === e.line && typeof t.column == "number" && typeof e.column == "number" ? t.column - e.column : t.line - e.line
                }
                r(Gi, "compareBlobOffsets");
                var rs = u(76745),
                    St = u(69567),
                    ze = u(70130);

                function is(t, e) {
                    e.appendChild(t.extractContents()), t.insertNode(e)
                }
                r(is, "surroundContents");
                let _n = !1;

                function Hn(t, e) {
                    return document.querySelector(`#${t}LC${e}`)
                }
                r(Hn, "queryLineElement");

                function Zi({
                    blobRange: t,
                    anchorPrefix: e
                }) {
                    if (document.querySelectorAll(".js-file-line").length !== 0 && (Ji(), !!t)) {
                        if (t.start.column === null || t.end.column === null)
                            for (let o = t.start.line; o <= t.end.line; o += 1) {
                                const s = Hn(e, o);
                                s && s.classList.add("highlighted")
                            } else if (t.start.line === t.end.line && t.start.column != null && t.end.column != null) {
                                const o = es(t, s => Hn(e, s));
                                if (o) {
                                    const s = document.createElement("span");
                                    s.classList.add("highlighted"), is(o, s)
                                }
                            }
                    }
                }
                r(Zi, "highlightLines");

                function Ji() {
                    for (const t of document.querySelectorAll(".js-file-line.highlighted")) t.classList.remove("highlighted");
                    for (const t of document.querySelectorAll(".js-file-line .highlighted")) {
                        const e = t.closest(".js-file-line");
                        t.replaceWith(...t.childNodes), e.normalize()
                    }
                }
                r(Ji, "clearHighlights");

                function Yi() {
                    const t = ts(window.location.hash);
                    Zi(t), sa();
                    const {
                        blobRange: e,
                        anchorPrefix: n
                    } = t, o = e && Hn(n, e.start.line);
                    if (!_n && o) {
                        o.scrollIntoView();
                        const s = o.closest(".blob-wrapper, .js-blob-wrapper");
                        s.scrollLeft = 0
                    }
                    _n = !1
                }
                r(Yi, "scrollLinesIntoView"), (0, ze.Z)(function() {
                    if (document.querySelector(".js-file-line-container")) {
                        setTimeout(Yi, 0);
                        const t = window.location.hash;
                        for (const e of document.querySelectorAll(".js-update-url-with-hash"))
                            if (e instanceof HTMLAnchorElement) e.hash = t;
                            else if (e instanceof HTMLFormElement) {
                            const n = new URL(e.action, window.location.origin);
                            n.hash = t, e.action = n.toString()
                        }
                    }
                });

                function Qi(t) {
                    const e = [];
                    for (const o of t) e.push(o.textContent);
                    const n = document.getElementById("js-copy-lines");
                    if (n instanceof rs.Z) {
                        n.textContent = `Copy ${t.length===1?"line":"lines"}`, n.value = e.join(`
`);
                        const o = `Blob, copyLines, numLines:${t.length.toString()}`;
                        n.setAttribute("data-ga-click", o)
                    }
                }
                r(Qi, "setCopyLines");

                function ta(t) {
                    const e = document.querySelector(".js-permalink-shortcut");
                    if (e instanceof HTMLAnchorElement) {
                        const n = `${e.href}${window.location.hash}`,
                            o = document.getElementById("js-copy-permalink");
                        if (o instanceof rs.Z) {
                            o.value = n;
                            const s = `Blob, copyPermalink, numLines:${t.toString()}`;
                            o.setAttribute("data-ga-click", s)
                        }
                        return n
                    }
                }
                r(ta, "setPermalink");

                function ea(t, e) {
                    const n = document.getElementById("js-new-issue");
                    if (n instanceof HTMLAnchorElement) {
                        if (!n.href) return;
                        const o = new URL(n.href, window.location.origin),
                            s = new URLSearchParams(o.search);
                        s.set("permalink", t), o.search = s.toString(), n.href = o.toString(), n.setAttribute("data-ga-click", `Blob, newIssue, numLines:${e.toString()}`)
                    }
                }
                r(ea, "setOpenIssueLink");

                function na(t, e) {
                    const n = document.getElementById("js-new-discussion");
                    if (!(n instanceof HTMLAnchorElement) || !(n == null ? void 0 : n.href)) return;
                    const o = new URL(n.href, window.location.origin),
                        s = new URLSearchParams(o.search);
                    s.set("permalink", t), o.search = s.toString(), n.href = o.toString(), n.setAttribute("data-ga-click", `Blob, newDiscussion, numLines:${e.toString()}`)
                }
                r(na, "setOpenDiscussionLink");

                function oa(t) {
                    const e = document.getElementById("js-view-git-blame");
                    !e || e.setAttribute("data-ga-click", `Blob, viewGitBlame, numLines:${t.toString()}`)
                }
                r(oa, "setViewGitBlame");

                function sa() {
                    const t = document.querySelector(".js-file-line-actions");
                    if (!t) return;
                    const e = document.querySelectorAll(".js-file-line.highlighted"),
                        n = e[0];
                    if (n) {
                        Qi(e), oa(e.length);
                        const o = ta(e.length);
                        o && ea(o, e.length), o && na(o, e.length), t.style.top = `${n.offsetTop-2}px`, t.classList.remove("d-none")
                    } else t.classList.add("d-none")
                }
                r(sa, "showOrHideLineActions");

                function ra(t) {
                    const e = window.scrollY;
                    _n = !0, t(), window.scrollTo(0, e)
                }
                r(ra, "preserveLineNumberScrollPosition"), (0, f.on)("click", ".js-line-number", function(t) {
                    const e = ts(t.currentTarget.id),
                        {
                            blobRange: n
                        } = e,
                        o = Qo(window.location.hash);
                    o && t.shiftKey && (e.blobRange = {
                        start: o.start,
                        end: n.end
                    }), ra(() => {
                        window.location.hash = Xi(e)
                    })
                }), (0, f.on)("submit", ".js-jump-to-line-form", function(t) {
                    const o = t.currentTarget.querySelector(".js-jump-to-line-field").value.replace(/[^\d-]/g, "").split("-").map(s => parseInt(s, 10)).filter(s => s > 0).sort((s, i) => s - i);
                    o.length && (window.location.hash = `L${o.join("-L")}`), t.preventDefault()
                }), (0, v.N7)(".js-check-bidi", ca);
                const ia = /[\u202A-\u202E]|[\u2066-\u2069]/,
                    as = {
                        "\u202A": "U+202A",
                        "\u202B": "U+202B",
                        "\u202C": "U+202C",
                        "\u202D": "U+202D",
                        "\u202E": "U+202E",
                        "\u2066": "U+2066",
                        "\u2067": "U+2067",
                        "\u2068": "U+2068",
                        "\u2069": "U+2069"
                    };

                function cs(t, e) {
                    if (t.nodeType === Node.TEXT_NODE) return aa(t, e);
                    if (!t.childNodes || !t.childNodes.length) return !1;
                    let n = !1;
                    for (const o of t.childNodes)
                        if (n || (n = cs(o, e)), n && !e) break;
                    return n
                }
                r(cs, "checkNodeForBidiCharacters");

                function aa(t, e) {
                    let n = !1;
                    if (t.nodeValue)
                        for (let o = t.nodeValue.length - 1; o >= 0; o--) {
                            const s = t.nodeValue.charAt(o);
                            if (as[s]) {
                                if (n = !0, !e) break;
                                const i = new St.R(e, {
                                        revealedCharacter: as[s]
                                    }),
                                    a = new Range;
                                a.setStart(t, o), a.setEnd(t, o + 1), a.deleteContents(), a.insertNode(i)
                            }
                        }
                    return n
                }
                r(aa, "checkTextNodeForBidiCharacters");

                function ca(t) {
                    let e = !1;
                    const n = performance.now(),
                        o = t.textContent || "";
                    if (ia.test(o)) {
                        const a = t.querySelectorAll(".diff-table .blob-code-inner, .js-file-line-container .js-file-line, .js-suggested-changes-blob .blob-code-inner"),
                            c = document.querySelector(".js-line-alert-template"),
                            l = document.querySelector(".js-revealed-character-template");
                        for (const d of a)
                            if (cs(d, l) && (e = !0, c)) {
                                const h = new St.R(c, {});
                                t.getAttribute("data-line-alert") === "before" ? d.before(h) : d.after(h)
                            }
                    }
                    const i = {
                        durationMs: (performance.now() - n).toString(),
                        result: e.toString()
                    };
                    if ((0, Qt.q)("blob_js_check_bidi_character", i), e) {
                        const a = document.querySelector(".js-file-alert-template");
                        if (a) {
                            const c = new URL(window.location.href, window.location.origin);
                            c.searchParams.get("h") === "1" ? c.searchParams.delete("h") : c.searchParams.set("h", "1");
                            const l = new St.R(a, {
                                revealButtonHref: c.href
                            });
                            t.prepend(l)
                        }
                    }
                    t.classList.remove("js-check-bidi")
                }
                r(ca, "alertOnBidiCharacter");
                class ls {
                    constructor(e, n) {
                        this.lineElement = e, this.numberElement = n
                    }
                    range(e, n) {
                        e = isNaN(e) ? 0 : e, n = isNaN(n) ? 0 : n;
                        let o = null,
                            s = 0,
                            i = 0;
                        for (const [c, l] of this.lineElement.childNodes.entries()) {
                            const d = (l.textContent || "").length;
                            if (d > e && !o && (o = l, s = c), d >= n) {
                                i = c;
                                break
                            }
                            e -= d, n -= d
                        }
                        const a = document.createRange();
                        if (s === i) {
                            for (; o && o.nodeName !== "#text";) o = o.childNodes[0];
                            if (!o) return null;
                            a.setStart(o, e), a.setEnd(o, n)
                        } else a.setStart(this.lineElement, s), a.setEnd(this.lineElement, i + 1);
                        return a
                    }
                }
                r(ls, "CodeListingLine");
                class us {
                    constructor(e) {
                        this.container = e
                    }
                    findLine(e) {
                        if (!e) return null;
                        const n = this.container.querySelector(`.js-blob-rnum[data-line-number='${e}']`);
                        if (!n) return null;
                        let o = n.nextElementSibling;
                        return !o || !o.classList.contains("js-file-line") ? null : (o = o.querySelector(".js-code-nav-pass") || o, new ls(o, n))
                    }
                }
                r(us, "CodeListing");
                const ds = new WeakMap;

                function fs(t) {
                    const e = t.closest(".js-blob-code-container, .js-file-content"),
                        n = t.querySelector(".js-codeowners-error-tooltip-template"),
                        o = t.querySelector(".js-codeowners-error-line-alert-template");
                    if (!e || !n || !o) return;
                    const s = t.querySelectorAll(".js-codeowners-error"),
                        i = new us(e);
                    for (const a of s) {
                        if (ds.get(a)) continue;
                        const c = a.getAttribute("data-line"),
                            l = a.getAttribute("data-kind"),
                            d = a.getAttribute("data-suggestion"),
                            h = parseInt(a.getAttribute("data-start-offset") || "", 10),
                            j = parseInt(a.getAttribute("data-end-offset") || "", 10),
                            T = i.findLine(c),
                            k = T == null ? void 0 : T.range(h, j);
                        if (!T || !k) continue;
                        let O = l;
                        d && (O += `: ${d}`);
                        const B = document.createElement("SPAN");
                        B.className = "error-highlight", k.surroundContents(B);
                        const G = new St.R(n, {
                            message: O
                        }).firstElementChild;
                        k.surroundContents(G);
                        const tt = new St.R(o, {});
                        T.numberElement.appendChild(tt), ds.set(a, !0)
                    }
                }
                r(fs, "annotateCodeownersErrors"), (0, v.N7)(".js-codeowners-errors", fs), (0, f.on)("expander:expanded", ".js-file", function(t) {
                    if (!t.target || !(t.target instanceof HTMLElement)) return;
                    const e = t.target.querySelector(".js-codeowners-errors");
                    !e || fs(e)
                });

                function la(t) {
                    const e = t.target,
                        n = e == null ? void 0 : e.closest(".js-branch-protection-integration-select"),
                        o = n == null ? void 0 : n.querySelector(".js-branch-protection-integration-select-current"),
                        s = e == null ? void 0 : e.closest(".js-branch-protection-integration-select-item"),
                        i = s == null ? void 0 : s.querySelector(".js-branch-protection-integration-select-label");
                    o && i && n && (o.innerHTML = i.innerHTML, n.open = !1)
                }
                r(la, "changeSelection"), (0, f.on)("change", ".js-branch-protection-integration-select-input", la);

                function ua(t) {
                    const e = new URL(t.getAttribute("data-bulk-actions-url"), window.location.origin),
                        n = new URLSearchParams(e.search.slice(1)),
                        o = t.getAttribute("data-bulk-actions-parameter"),
                        s = Array.from(t.querySelectorAll(".js-bulk-actions-toggle:checked"));
                    if (o) {
                        const i = s.map(a => a.closest(".js-bulk-actions-item").getAttribute("data-bulk-actions-id")).sort();
                        for (const a of i) n.append(`${o}[]`, a)
                    } else
                        for (const i of s.sort((a, c) => a.value > c.value ? 1 : -1)) n.append(i.name, i.value);
                    return e.search = n.toString(), e.toString()
                }
                r(ua, "bulkUrl");
                let On = null;
                async function da(t) {
                    const e = t.target;
                    if (!(e instanceof HTMLElement)) return;
                    const n = e.querySelector(".js-bulk-actions"),
                        o = !!e.querySelector(".js-bulk-actions-toggle:checked");
                    On == null || On.abort();
                    const {
                        signal: s
                    } = On = new AbortController;
                    let i = "";
                    try {
                        const a = await fetch(ua(e), {
                            signal: s,
                            headers: {
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (!a.ok) return;
                        i = await a.text()
                    } catch {}
                    s.aborted || !i || (o ? (ms(e), n.innerHTML = i) : (n.innerHTML = i, ms(e)), (0, f.f)(e, "bulk-actions:updated"))
                }
                r(da, "updateBulkActions");

                function ms(t) {
                    const e = document.querySelector(".js-membership-tabs");
                    if (e) {
                        const n = t.querySelectorAll(".js-bulk-actions-toggle:checked");
                        e.classList.toggle("d-none", n.length > 0)
                    }
                }
                r(ms, "toggleMembershipTabs"), (0, f.on)("change", ".js-bulk-actions-toggle", function(t) {
                    const n = t.currentTarget.closest(".js-bulk-actions-container");
                    (0, f.f)(n, "bulk-actions:update")
                }), (0, f.on)("bulk-actions:update", ".js-bulk-actions-container", (0, ee.D)(da, 100));
                var Mt = u(34782),
                    jt = u(83476);

                function fa(t) {
                    try {
                        const e = window.localStorage.getItem(t);
                        return {
                            kind: "ok",
                            value: e ? JSON.parse(e) : null
                        }
                    } catch (e) {
                        return {
                            kind: "err",
                            value: e
                        }
                    }
                }
                r(fa, "getLocalJSON");

                function hs(t, e) {
                    try {
                        return window.localStorage.setItem(t, JSON.stringify(e)), {
                            kind: "ok",
                            value: null
                        }
                    } catch (n) {
                        return {
                            kind: "err",
                            value: n
                        }
                    }
                }
                r(hs, "setLocalJSON");

                function ma() {
                    const t = {};
                    for (const e of document.getElementsByTagName("script")) {
                        const n = e.src.match(/\/([\w-]+)-[0-9a-f]{8,}\.js$/);
                        n && (t[`${n[1]}.js`] = e.src)
                    }
                    for (const e of document.getElementsByTagName("link")) {
                        const n = e.href.match(/\/([\w-]+)-[0-9a-f]{8,}\.css$/);
                        n && (t[`${n[1]}.css`] = e.href)
                    }
                    return t
                }
                r(ma, "gatherBundleURLs");

                function ha() {
                    const t = ma(),
                        e = fa("bundle-urls");
                    if (e.kind === "err") {
                        hs("bundle-urls", t);
                        return
                    }
                    const n = e.value || {},
                        o = Object.keys(t).filter(s => n[s] !== t[s]);
                    o.length && hs("bundle-urls", { ...n,
                        ...t
                    }).kind === "ok" && (0, jt.b)({
                        downloadedBundles: o
                    })
                }
                r(ha, "report"), (async () => (await Mt.C, window.requestIdleCallback(ha)))();
                var df = u(49908);

                function pa(t) {
                    t.preventDefault(), t.stopPropagation()
                }
                r(pa, "cancelEvent"), (0, v.N7)("a.btn.disabled", {
                    subscribe: t => (0, N.RB)(t, "click", pa)
                });
                var Bn = u(81266),
                    ff = u(83954),
                    pe = u(81503);
                const ps = "logout-was-successful";

                function ga() {
                    for (const t of [sessionStorage, localStorage]) try {
                        t.clear()
                    } catch {}
                }
                r(ga, "clearData");

                function ba() {
                    (0, pe.$1)(ps).length > 0 && (ga(), (0, pe.kT)(ps))
                }
                r(ba, "clearDataIfJustLoggedOut"), ba();
                const gs = 2e3;
                (0, f.on)("clipboard-copy", "[data-copy-feedback]", t => {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-copy-feedback"),
                        o = e.getAttribute("aria-label"),
                        s = e.getAttribute("data-tooltip-direction") || "s";
                    e.setAttribute("aria-label", n), e.classList.add("tooltipped", `tooltipped-${s}`), e instanceof HTMLElement && ((0, ft.N)(e), setTimeout(() => {
                        o ? e.setAttribute("aria-label", o) : e.removeAttribute("aria-label"), e.classList.remove("tooltipped", `tooltipped-${s}`)
                    }, gs))
                });

                function ya(t) {
                    $n.delete(t), bs(t)
                }
                r(ya, "timerCallback");

                function bs(t) {
                    const e = t.querySelector(".js-clipboard-copy-icon"),
                        n = t.querySelector(".js-clipboard-check-icon");
                    t.classList.toggle("ClipboardButton--success"), e && e.classList.toggle("d-none"), n && (n.classList.contains("d-sm-none") ? n.classList.toggle("d-sm-none") : n.classList.toggle("d-none"))
                }
                r(bs, "toggleCopyButton");
                const $n = new WeakMap;
                (0, f.on)("clipboard-copy", ".js-clipboard-copy:not([data-view-component])", function({
                    currentTarget: t
                }) {
                    if (!(t instanceof HTMLElement)) return;
                    const e = $n.get(t);
                    e ? clearTimeout(e) : bs(t), $n.set(t, window.setTimeout(ya, gs, t))
                }), (0, f.on)("click", ".js-code-nav-retry", async function(t) {
                    if (t.altKey || t.ctrlKey || t.metaKey || t.shiftKey) return;
                    const e = document.querySelector(".js-tagsearch-popover");
                    if (!e) return;
                    const n = e.querySelector(".js-tagsearch-popover-content");
                    if (!n) return;
                    let o;
                    const s = t.currentTarget;
                    if (s.getAttribute("data-code-nav-kind") === "definitions" ? o = e.querySelector(".js-tagsearch-popover-content") : o = e.querySelector(".js-code-nav-references"), !o) return;
                    const a = s.getAttribute("data-code-nav-url");
                    if (!a) return;
                    const c = new URL(a, window.location.origin);
                    try {
                        const l = await fetch(c.toString(), {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (!l.ok) return;
                        const d = await l.text();
                        if (!d) return;
                        o.innerHTML = d
                    } catch {
                        return
                    }
                    n.scrollTop = 0
                }), (0, v.N7)(".js-code-nav-container", {
                    constructor: HTMLElement,
                    subscribe(t) {
                        const e = t,
                            n = document.querySelector(".js-tagsearch-popover");
                        if (!(n instanceof HTMLElement)) return {
                            unsubscribe() {}
                        };
                        const o = n.querySelector(".js-tagsearch-popover-content"),
                            s = new WeakMap,
                            i = new WeakMap;
                        let a;
                        c();

                        function c() {
                            O();
                            for (const V of document.getElementsByClassName("pl-token")) V.classList.remove("pl-token", "active")
                        }
                        r(c, "initialize");
                        async function l(V) {
                            const U = wa(/\w+[!?]?/g, V.clientX, V.clientY);
                            if (!U) return;
                            const F = U.commonAncestorContainer.parentElement;
                            for (const sf of F.classList)
                                if (["pl-token", "pl-c", "pl-s", "pl-k"].includes(sf)) return;
                            if (F.closest(".js-skip-tagsearch")) return;
                            const nt = U.toString();
                            if (!nt || nt.match(/\n|\s|[();&.=",]/)) return;
                            let vt = i.get(F);
                            if (vt || (vt = new Set, i.set(F, vt)), vt.has(nt)) return;
                            vt.add(nt);
                            const Bt = F.closest(".js-tagsearch-file");
                            if (!Bt) return;
                            const qe = Bt.getAttribute("data-tagsearch-path") || "";
                            let $t = Bt.getAttribute("data-tagsearch-lang") || "";
                            if ($t === "HTML+ERB")
                                if (F.closest(".pl-sre")) $t = "Ruby";
                                else return;
                            if (t.classList.contains("js-code-block-container") && ($t = La(F) || "", !$t)) return;
                            const Gt = Sa(U),
                                Pe = await va(n, nt, $t, Gt, qe);
                            if (!Pe) return;
                            const le = document.createElement("span");
                            le.classList.add("pl-token"), le.addEventListener("click", h);
                            const yi = document.createElement("span");
                            yi.innerHTML = Pe;
                            const _o = yi.firstElementChild;
                            if (!_o) return;
                            const vi = _o.getAttribute("data-hydro-click"),
                                wi = _o.getAttribute("data-hydro-click-hmac");
                            wi && vi && (le.setAttribute("data-hydro-click", vi), le.setAttribute("data-hydro-click-hmac", wi)), s.set(le, Pe), U.surroundContents(le)
                        }
                        r(l, "onMouseMove");

                        function d() {
                            o.scrollTop = 0
                        }
                        r(d, "resetScrollTop");

                        function h(V) {
                            if (V.altKey || V.ctrlKey || V.metaKey || V.shiftKey) return;
                            const U = V.currentTarget;
                            U === a ? O() : (j(U), k()), V.preventDefault()
                        }
                        r(h, "onClick");

                        function j(V) {
                            a && a.classList.remove("active"), a = V, a.classList.add("active"), o.innerHTML = s.get(V) || "", T(V)
                        }
                        r(j, "populatePopover");

                        function T(V) {
                            const U = e.getClientRects()[0],
                                F = V.getClientRects()[0];
                            n.style.position = "absolute", n.style.zIndex = "2", e.classList.contains("position-relative") ? (n.style.top = `${F.bottom-U.top+7}px`, n.style.left = `${F.left-U.left-10}px`) : (n.style.top = `${window.scrollY+F.bottom}px`, n.style.left = `${window.scrollX+F.left}px`)
                        }
                        r(T, "positionPopover");

                        function k() {
                            if (!n.hidden) {
                                d();
                                return
                            }
                            n.hidden = !1, d(), document.addEventListener("click", G), document.addEventListener("keyup", tt), window.addEventListener("resize", B)
                        }
                        r(k, "showPopover");

                        function O() {
                            n.hidden || (n.hidden = !0, a && a.classList.remove("active"), a = void 0, document.removeEventListener("click", G), document.removeEventListener("keyup", tt), window.removeEventListener("resize", B))
                        }
                        r(O, "hidePopover");

                        function B() {
                            a instanceof HTMLElement && T(a)
                        }
                        r(B, "onResize");

                        function G(V) {
                            const {
                                target: U
                            } = V;
                            U instanceof Node && !n.contains(U) && !a.contains(U) && O()
                        }
                        r(G, "onDocumentClick");

                        function tt(V) {
                            switch (V.key) {
                                case "Escape":
                                    O();
                                    break
                            }
                        }
                        return r(tt, "onKeyup"), t.addEventListener("mousemove", l), {
                            unsubscribe() {
                                t.removeEventListener("mousemove", l)
                            }
                        }
                    }
                });
                async function va(t, e, n, o, s) {
                    const i = t.getAttribute("data-tagsearch-url");
                    if (!i) return "";
                    const a = t.getAttribute("data-tagsearch-ref");
                    if (!a) return "";
                    let c = t.getAttribute("data-tagsearch-code-nav-context");
                    c || (c = "UNKNOWN_VIEW");
                    const l = new URL(i, window.location.origin),
                        d = new URLSearchParams;
                    d.set("q", e), d.set("blob_path", s), d.set("ref", a), d.set("language", n), d.set("row", o[0].toString()), d.set("col", o[1].toString()), d.set("code_nav_context", c), l.search = d.toString();
                    try {
                        const h = await fetch(l.toString(), {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (!h.ok) return "";
                        const j = await h.text();
                        return /js-tagsearch-no-definitions/.test(j) ? "" : j
                    } catch {
                        return ""
                    }
                }
                r(va, "fetchPopoverContents");

                function wa(t, e, n) {
                    let o, s;
                    if (document.caretPositionFromPoint) {
                        const l = document.caretPositionFromPoint(e, n);
                        l && (o = l.offsetNode, s = l.offset)
                    } else if (document.caretRangeFromPoint) {
                        const l = document.caretRangeFromPoint(e, n);
                        l && (o = l.startContainer, s = l.startOffset)
                    }
                    if (!o || typeof s != "number" || o.nodeType !== Node.TEXT_NODE) return;
                    const i = o.textContent;
                    if (!i) return null;
                    const a = Ea(i, t, s);
                    if (!a) return null;
                    const c = document.createRange();
                    return c.setStart(o, a[1]), c.setEnd(o, a[2]), c
                }
                r(wa, "matchFromPoint");

                function Ea(t, e, n) {
                    let o;
                    for (; o = e.exec(t);) {
                        const s = o.index + o[0].length;
                        if (o.index <= n && n < s) return [o[0], o.index, s]
                    }
                    return null
                }
                r(Ea, "findNearestMatch");

                function La(t) {
                    const e = t.closest(".highlight");
                    if (e)
                        for (const n of e.classList) switch (n) {
                            case "highlight-source-go":
                                return "Go";
                            case "highlight-source-js":
                                return "JavaScript";
                            case "highlight-source-python":
                                return "Python";
                            case "highlight-source-ruby":
                                return "Ruby";
                            case "highlight-source-ts":
                                return "TypeScript"
                        }
                    return null
                }
                r(La, "getCodeBlockLanguage");

                function Sa(t) {
                    let e = t.startContainer,
                        n = t.startOffset,
                        o = !1;
                    for (;;) {
                        let s = e.previousSibling;
                        for (; !o && s;)["#comment", "BUTTON"].includes(s.nodeName) || (n += (s.textContent || "").length), s = s.previousSibling;
                        const i = e.parentElement;
                        if (i) {
                            if (i.classList.contains("js-code-nav-pass")) o = !0;
                            else if (i.classList.contains("js-file-line")) {
                                const a = i.previousElementSibling;
                                if (!a.classList.contains("js-code-nav-line-number")) throw new Error("invariant");
                                return [parseInt(a.getAttribute("data-line-number") || "1", 10) - 1, n]
                            }
                            e = i
                        } else return [0, 0]
                    }
                }
                r(Sa, "getRowAndColumn");
                var qt = u(74136);

                function ja(t) {
                    const e = t.querySelector(".js-comment-form-error");
                    e instanceof HTMLElement && (e.hidden = !0)
                }
                r(ja, "clearFormError"), (0, f.on)("click", ".errored.js-remove-error-state-on-click", function({
                    currentTarget: t
                }) {
                    t.classList.remove("errored")
                }), (0, K.AC)(".js-new-comment-form", async function(t, e) {
                    let n;
                    ja(t);
                    try {
                        n = await e.json()
                    } catch (i) {
                        Ta(t, i)
                    }
                    if (!n) return;
                    t.reset();
                    for (const i of t.querySelectorAll(".js-resettable-field"))(0, Z.Se)(i, i.getAttribute("data-reset-value") || "");
                    const o = t.querySelector(".js-write-tab");
                    o instanceof HTMLElement && o.click();
                    const s = n.json.updateContent;
                    for (const i in s) {
                        const a = s[i],
                            c = document.querySelector(i);
                        c instanceof HTMLElement ? (0, qt.Of)(c, a) : console.warn(`couldn't find ${i} for immediate update`)
                    }(0, f.f)(t, "comment:success")
                });

                function Ta(t, e) {
                    let n = "You can't comment at this time";
                    if (e.response && e.response.status === 422) {
                        const s = e.response.json;
                        s.errors && (Array.isArray(s.errors) ? n += ` \u2014 your comment ${s.errors.join(", ")}` : n = s.errors)
                    }
                    n += ". ";
                    const o = t.querySelector(".js-comment-form-error");
                    if (o instanceof HTMLElement) {
                        o.textContent = n, o.hidden = !1;
                        const s = o.closest("div.form-group.js-remove-error-state-on-click");
                        s && s.classList.add("errored")
                    }
                }
                r(Ta, "handleFormError");
                const Aa = r((t, e) => {
                        const n = t.querySelector(".js-form-action-text"),
                            o = n || t;
                        o.textContent = e ? t.getAttribute("data-comment-text") : o.getAttribute("data-default-action-text")
                    }, "setButtonText"),
                    Ca = r(t => {
                        let e;
                        return n => {
                            const s = n.currentTarget.value.trim();
                            s !== e && (e = s, Aa(t, Boolean(s)))
                        }
                    }, "createInputHandler");
                (0, v.N7)(".js-comment-and-button", {
                    constructor: HTMLButtonElement,
                    initialize(t) {
                        const e = t.form.querySelector(".js-comment-field"),
                            n = Ca(t);
                        return {
                            add() {
                                e.addEventListener("input", n), e.addEventListener("change", n)
                            },
                            remove() {
                                e.removeEventListener("input", n), e.removeEventListener("change", n)
                            }
                        }
                    }
                });
                var mf = u(77546);

                function ys(t, e) {
                    const n = t.closest(".js-write-bucket");
                    n && n.classList.toggle("focused", e)
                }
                r(ys, "toggleFocus");

                function ka(t) {
                    const e = t.currentTarget;
                    e instanceof Element && ys(e, !1)
                }
                r(ka, "blurred"), (0, X.ZG)(".js-comment-field", function(t) {
                    ys(t, !0), t.addEventListener("blur", ka, {
                        once: !0
                    })
                });
                var oe = u(77434),
                    pt = u(52769),
                    Fn = u(34078);
                const xa = 2303741511,
                    Ma = 4;
                class Ve {
                    static fromFile(e) {
                        return new Promise(function(n, o) {
                            const s = new FileReader;
                            s.onload = function() {
                                n(new Ve(s.result))
                            }, s.onerror = function() {
                                o(s.error)
                            }, s.readAsArrayBuffer(e)
                        })
                    }
                    constructor(e) {
                        this.dataview = new DataView(e), this.pos = 0
                    }
                    advance(e) {
                        this.pos += e
                    }
                    readInt(e) {
                        const n = this,
                            o = function() {
                                switch (e) {
                                    case 1:
                                        return n.dataview.getUint8(n.pos);
                                    case 2:
                                        return n.dataview.getUint16(n.pos);
                                    case 4:
                                        return n.dataview.getUint32(n.pos);
                                    default:
                                        throw new Error("bytes parameter must be 1, 2 or 4")
                                }
                            }();
                        return this.advance(e), o
                    }
                    readChar() {
                        return this.readInt(1)
                    }
                    readShort() {
                        return this.readInt(2)
                    }
                    readLong() {
                        return this.readInt(4)
                    }
                    readString(e) {
                        const n = [];
                        for (let o = 0; o < e; o++) n.push(String.fromCharCode(this.readChar()));
                        return n.join("")
                    }
                    scan(e) {
                        if (this.readLong() !== xa) throw new Error("invalid PNG");
                        for (this.advance(4);;) {
                            const n = this.readLong(),
                                o = this.readString(4),
                                s = this.pos + n + Ma;
                            if (e.call(this, o, n) === !1 || o === "IEND") break;
                            this.pos = s
                        }
                    }
                }
                r(Ve, "PNGScanner");
                const qa = .0254;
                async function Pa(t) {
                    if (t.type !== "image/png") return null;
                    const e = t.slice(0, 10240, t.type),
                        n = await Ve.fromFile(e),
                        o = {
                            width: 0,
                            height: 0,
                            ppi: 1
                        };
                    return n.scan(function(s) {
                        switch (s) {
                            case "IHDR":
                                return o.width = this.readLong(), o.height = this.readLong(), !0;
                            case "pHYs":
                                {
                                    const i = this.readLong(),
                                        a = this.readLong(),
                                        c = this.readChar();
                                    let l;
                                    return c === 1 && (l = qa),
                                    l && (o.ppi = Math.round((i + a) / 2 * l)),
                                    !1
                                }
                            case "IDAT":
                                return !1
                        }
                        return !0
                    }), o
                }
                r(Pa, "imageDimensions");
                var Ia = u(89900);
                const Ke = new WeakMap;
                class vs {
                    constructor(e, n, o) {
                        this.index = e, this.coords = n, this.textArea = o
                    }
                    get top() {
                        return this.coords.top
                    }
                    get left() {
                        return this.coords.left
                    }
                    get height() {
                        return this.coords.height
                    }
                    currentChar(e = 1) {
                        return this.textArea.value.substring(this.index - e, this.index)
                    }
                    checkLine(e) {
                        return e < this.coords.top ? -1 : e > this.coords.top + this.coords.height ? 1 : 0
                    }
                    xDistance(e) {
                        return Math.abs(this.left - e)
                    }
                }
                r(vs, "CaretPosition");

                function Pt(t, e) {
                    let n;
                    if (Ke.has(t) ? n = Ke.get(t) : (n = new Map, Ke.set(t, n)), n.has(e)) return n.get(e); {
                        const o = new vs(e, (0, Ia.Z)(t, e), t);
                        return n.set(e, o), o
                    }
                }
                r(Pt, "fetchCaretCoords");
                const ge = r((t, e, n, o, s, i) => {
                        if (n === e) return n;
                        const a = r(h => {
                            const j = h.filter(T => T.checkLine(s) === 0).sort((T, k) => T.xDistance(o) > k.xDistance(o) ? 1 : -1);
                            return j.length === 0 ? n : j[0].index
                        }, "bestPosition");
                        if (n - e === 1) {
                            const h = Pt(t, e),
                                j = Pt(t, n);
                            return a([h, j])
                        }
                        if (n - e === 2) {
                            const h = Pt(t, e),
                                j = Pt(t, n - 1),
                                T = Pt(t, n);
                            return a([h, j, T])
                        }
                        const c = Math.floor((n + e) / 2);
                        if (c === e || c === n) return c;
                        const l = Pt(t, c);
                        if (s > l.top + l.height) return ge(t, c + 1, n, o, s, i + 1);
                        if (s < l.top) return ge(t, e, c - 1, o, s, i + 1);
                        const d = 3;
                        return l.xDistance(o) < d ? c : l.left < o ? Pt(t, c + 1).checkLine(s) !== 0 ? c : ge(t, c + 1, n, o, s, i + 1) : l.left > o ? Pt(t, c - 1).checkLine(s) !== 0 ? c : ge(t, e, c - 1, o, s, i + 1) : c
                    }, "binaryCursorSearch"),
                    Ra = r((t, e, n) => {
                        const s = t.value.length - 1;
                        return ge(t, 0, s, e, n, 0)
                    }, "findCursorPosition");

                function Da(t, e, n) {
                    const o = Ra(t, e, n);
                    t.setSelectionRange(o, o)
                }
                r(Da, "setCursorPosition");

                function Na(t, e) {
                    const n = t.getBoundingClientRect();
                    e.type === "dragenter" && Ke.delete(t);
                    const o = e.clientX - n.left,
                        s = e.clientY - n.top + t.scrollTop;
                    Da(t, o, s)
                }
                r(Na, "caret_placement_updateCaret"), (0, v.N7)(".js-paste-markdown", {
                    constructor: HTMLElement,
                    add(t) {
                        (0, pt.F6)(t), (0, pt.CR)(t), (0, pt.jw)(t), (0, pt.AL)(t), (0, pt.AI)(t)
                    },
                    remove(t) {
                        (0, pt.KB)(t), (0, pt.XR)(t), (0, pt.Hl)(t), (0, pt.mK)(t), (0, pt.TR)(t)
                    }
                });
                const Un = new WeakMap;

                function hf(t, e) {
                    Un.set(t, e)
                }
                r(hf, "cachePlaceholder");

                function _a(t) {
                    return Un.get(t) || Es(t)
                }
                r(_a, "getPlaceholder");

                function Wn(t) {
                    return ["video/mp4", "video/quicktime"].includes(t.file.type)
                }
                r(Wn, "isVideo");

                function Ha(t) {
                    return t.replace(/[[\]\\"<>&]/g, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
                }
                r(Ha, "parameterizeName");

                function ws(t) {
                    return Wn(t) ? `
Uploading ${t.file.name}\u2026
` : `${t.isImage()?"!":""}[Uploading ${t.file.name}\u2026]()`
                }
                r(ws, "placeholderText");

                function Oa(t) {
                    return Ha(t).replace(/\.[^.]+$/, "").replace(/\./g, " ")
                }
                r(Oa, "altText");
                const Ba = 72 * 2;

                function Xe(t) {
                    const n = t.target.closest("form").querySelector(".btn-primary");
                    n.disabled = !0
                }
                r(Xe, "disableSubmit");

                function Ge(t) {
                    const n = t.target.closest("form").querySelector(".btn-primary");
                    n.disabled = !1
                }
                r(Ge, "enableSubmit");
                async function $a(t) {
                    const {
                        attachment: e
                    } = t.detail, n = t.currentTarget;
                    let o;
                    e.isImage() ? o = await Wa(e) : Wn(e) ? o = Ua(e) : o = Fa(e), Ss("", o, t, n)
                }
                r($a, "onUploadCompleted");

                function Fa(t) {
                    return `[${t.file.name}](${t.href})`
                }
                r(Fa, "mdLink");

                function Ua(t) {
                    return `
${t.href}
`
                }
                r(Ua, "videoMarkdown");
                async function Wa(t) {
                    const e = await za(t.file),
                        n = Oa(t.file.name),
                        o = t.href;
                    return e.ppi === Ba ? `<img width="${Math.round(e.width/2)}" alt="${n}" src="${o}">` : `![${n}](${o})`
                }
                r(Wa, "imageTag");
                async function za(t) {
                    var e;
                    const n = {
                        width: 0,
                        height: 0,
                        ppi: 0
                    };
                    try {
                        return (e = await Pa(t)) != null ? e : n
                    } catch {
                        return n
                    }
                }
                r(za, "imageSize");

                function Es(t) {
                    const e = ws(t);
                    return Wn(t) ? `
${e}
` : `${e}
`
                }
                r(Es, "replacementText");

                function Ls(t) {
                    const e = t.currentTarget.querySelector(".js-comment-field"),
                        n = _a(t.detail.attachment);
                    if (e) e.setCustomValidity(""), (0, oe.lp)(e, n, "");
                    else {
                        const s = (0, Fn.P)(t.currentTarget.querySelector(".js-code-editor")).editor.getSearchCursor(n);
                        s.findNext(), s.replace("")
                    }
                }
                r(Ls, "removeFailedUpload");

                function Ss(t, e, n, o) {
                    const s = (o || n.currentTarget).querySelector(".js-comment-field"),
                        i = (o || n.currentTarget).querySelector(".js-file-upload-loading-text"),
                        a = ws(n.detail.attachment),
                        {
                            batch: c
                        } = n.detail;
                    if (s) {
                        const l = s.value.substring(s.selectionStart, s.selectionEnd);
                        if (t === "uploading") {
                            let d;
                            l.length ? d = (0, oe.t4)(s, l, a) : d = (0, oe.Om)(s, a, {
                                appendNewline: !0
                            }), Un.set(n.detail.attachment, d)
                        } else(0, oe.lp)(s, a, e);
                        c.isFinished() ? Ge(n) : Xe(n)
                    } else {
                        const l = (0, Fn.P)((o || n.currentTarget).querySelector(".js-code-editor")).editor;
                        if (t === "uploading")
                            if (l.getSelection().length) l.replaceSelection(a);
                            else {
                                const d = l.getCursor(),
                                    h = Es(n.detail.attachment);
                                l.replaceRange(h, d)
                            }
                        else {
                            const d = l.getSearchCursor(a);
                            d.findNext(), d.replace(e)
                        }
                        c.isFinished() ? Ge(n) : Xe(n)
                    }
                    if (i) {
                        const l = i.getAttribute("data-file-upload-message");
                        i.textContent = `${l} (${c.uploaded()+1}/${c.size})`
                    }
                }
                r(Ss, "setValidityAndLinkText"), (0, f.on)("upload:setup", ".js-upload-markdown-image", function(t) {
                    Ss("uploading", "", t)
                }), (0, f.on)("upload:complete", ".js-upload-markdown-image", $a), (0, f.on)("upload:error", ".js-upload-markdown-image", function(t) {
                    Ls(t);
                    const {
                        batch: e
                    } = t.detail;
                    e.isFinished() ? Ge(t) : Xe(t)
                });

                function js(t) {
                    var e;
                    t.stopPropagation();
                    const n = t.currentTarget;
                    if (!n) return;
                    const o = n.querySelector(".js-comment-field");
                    if (o) Na(o, t);
                    else {
                        const s = (e = (0, Fn.P)(n.querySelector(".js-code-editor"))) == null ? void 0 : e.editor;
                        if (s) {
                            const i = s.coordsChar({
                                left: t.pageX,
                                top: t.pageY
                            });
                            s.setCursor(i)
                        }
                    }
                }
                r(js, "updateCursor");
                const pf = r(t => {
                    const e = t.currentTarget,
                        n = e.getBoundingClientRect(),
                        o = t.clientX - n.left,
                        s = t.clientY - n.top + e.scrollTop;
                    console.log({
                        x: o,
                        y: s,
                        cursor: e.selectionStart,
                        t: e.value.substring(e.selectionStart - 10, e.selectionStart)
                    });
                    const i = new DragEvent("dragenter", {
                        clientX: t.clientX,
                        clientY: t.clientY
                    });
                    updateCaret(e, i)
                }, "debugUpdateCaret");
                (0, f.on)("dragenter", "file-attachment", js), (0, f.on)("dragover", "file-attachment", js), (0, f.on)("upload:invalid", ".js-upload-markdown-image", function(t) {
                    Ls(t);
                    const {
                        batch: e
                    } = t.detail;
                    e.isFinished() ? Ge(t) : Xe(t)
                });
                var zn = u(29501),
                    Tt = u(4687);

                function Va(t) {
                    const e = t.querySelector(".js-data-preview-url-csrf"),
                        n = t.closest("form").elements.namedItem("authenticity_token");
                    if (e instanceof HTMLInputElement) return e.value;
                    if (n instanceof HTMLInputElement) return n.value;
                    throw new Error("Comment preview authenticity token not found")
                }
                r(Va, "token");

                function Vn(t) {
                    const e = t.closest(".js-previewable-comment-form"),
                        n = t.classList.contains("js-preview-tab");
                    if (n) {
                        const i = e.querySelector(".js-write-bucket"),
                            a = e.querySelector(".js-preview-body");
                        i.clientHeight > 0 && (a.style.minHeight = `${i.clientHeight}px`)
                    }
                    e.classList.toggle("preview-selected", n), e.classList.toggle("write-selected", !n);
                    const o = e.querySelector('.tabnav-tab.selected, .tabnav-tab[aria-selected="true"]');
                    o.setAttribute("aria-selected", "false"), o.classList.remove("selected"), t.classList.add("selected"), t.setAttribute("aria-selected", "true");
                    const s = e.querySelector(".js-write-tab");
                    return n ? s.setAttribute("data-hotkey", "Control+P,Meta+Shift+p") : s.removeAttribute("data-hotkey"), e
                }
                r(Vn, "activateTab"), (0, f.on)("click", ".js-write-tab", function(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-previewable-comment-form");
                    if (n instanceof zn.Z) {
                        setTimeout(() => {
                            n.querySelector(".js-comment-field").focus()
                        });
                        return
                    }
                    const o = Vn(e);
                    (0, f.f)(n, "preview:toggle:off");
                    const s = n.querySelector(".js-discussion-poll-form-component");
                    s && (0, f.f)(s, "poll-preview:toggle:off"), setTimeout(() => {
                        o.querySelector(".js-comment-field").focus()
                    });
                    const i = n.querySelector("markdown-toolbar");
                    i instanceof HTMLElement && (i.hidden = !1)
                }), (0, f.on)("click", ".js-preview-tab", function(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-previewable-comment-form");
                    if (n instanceof zn.Z) return;
                    const o = Vn(e);
                    (0, f.f)(n, "preview:toggle:on"), setTimeout(() => {
                        Xn(o)
                    });
                    const s = n.querySelector("markdown-toolbar");
                    s instanceof HTMLElement && (s.hidden = !0), t.stopPropagation(), t.preventDefault()
                }), (0, f.on)("tab-container-change", ".js-previewable-comment-form", function(t) {
                    const e = t.detail.relatedTarget,
                        n = e && e.classList.contains("js-preview-panel"),
                        o = t.currentTarget,
                        s = o.querySelector(".js-write-tab");
                    if (n) {
                        const i = o.querySelector(".js-write-bucket"),
                            a = o.querySelector(".js-preview-body");
                        !a.hasAttribute("data-skip-sizing") && i.clientHeight > 0 && (a.style.minHeight = `${i.clientHeight}px`), s.setAttribute("data-hotkey", "Control+P,Meta+Shift+p"), Xn(o);
                        const l = o.querySelector("markdown-toolbar");
                        l instanceof HTMLElement && (l.hidden = !0)
                    } else {
                        s.removeAttribute("data-hotkey");
                        const i = o.querySelector("markdown-toolbar");
                        i instanceof HTMLElement && (i.hidden = !1);
                        const a = document.querySelector(".js-discussion-poll-form-component");
                        a && (0, f.f)(a, "poll-preview:toggle:off")
                    }
                    o.classList.toggle("preview-selected", n), o.classList.toggle("write-selected", !n)
                }), (0, f.on)("preview:render", ".js-previewable-comment-form", function(t) {
                    const e = t.target.querySelector(".js-preview-tab"),
                        n = Vn(e);
                    setTimeout(() => {
                        Xn(n);
                        const o = n.querySelector("markdown-toolbar");
                        o instanceof HTMLElement && (o.hidden = !0)
                    })
                });

                function Ka(t) {
                    var e, n, o, s, i, a, c, l, d;
                    const h = t.querySelector(".js-comment-field").value,
                        j = (e = t.querySelector(".js-path")) == null ? void 0 : e.value,
                        T = (n = t.querySelector(".js-line-number")) == null ? void 0 : n.value,
                        k = (o = t.querySelector(".js-start-line-number")) == null ? void 0 : o.value,
                        O = (s = t.querySelector(".js-side")) == null ? void 0 : s.value,
                        B = (i = t.querySelector(".js-start-side")) == null ? void 0 : i.value,
                        G = (a = t.querySelector(".js-start-commit-oid")) == null ? void 0 : a.value,
                        tt = (c = t.querySelector(".js-end-commit-oid")) == null ? void 0 : c.value,
                        V = (l = t.querySelector(".js-base-commit-oid")) == null ? void 0 : l.value,
                        U = (d = t.querySelector(".js-comment-id")) == null ? void 0 : d.value,
                        F = new FormData;
                    return F.append("text", h), F.append("authenticity_token", Va(t)), j && F.append("path", j), T && F.append("line_number", T), k && F.append("start_line_number", k), O && F.append("side", O), B && F.append("start_side", B), G && F.append("start_commit_oid", G), tt && F.append("end_commit_oid", tt), V && F.append("base_commit_oid", V), U && F.append("comment_id", U), F
                }
                r(Ka, "previewForm");

                function Ts(t) {
                    const e = t.getAttribute("data-preview-url"),
                        n = Ka(t);
                    return (0, f.f)(t, "preview:setup", {
                        data: n
                    }), Xa(e, n)
                }
                r(Ts, "fetchPreview");
                const Xa = (0, Tt.Z)(Ga, {
                    hash: Za
                });
                let Kn = null;
                async function Ga(t, e) {
                    Kn == null || Kn.abort();
                    const {
                        signal: n
                    } = Kn = new AbortController, o = await fetch(t, {
                        method: "post",
                        body: e,
                        signal: n
                    });
                    if (!o.ok) throw new Error("something went wrong");
                    return o.text()
                }
                r(Ga, "uncachedFetch");

                function Za(t, e) {
                    const n = [...e.entries()].toString();
                    return `${t}:${n}`
                }
                r(Za, "hash");
                async function Xn(t) {
                    const e = t.querySelector(".comment-body");
                    e.innerHTML = "<p>Loading preview&hellip;</p>";
                    try {
                        const n = await Ts(t);
                        e.innerHTML = n || "<p>Nothing to preview</p>", (0, f.f)(t, "preview:rendered")
                    } catch (n) {
                        n.name !== "AbortError" && (e.innerHTML = "<p>Error rendering preview</p>")
                    }
                }
                r(Xn, "renderPreview"), (0, v.N7)(".js-preview-tab", function(t) {
                    t.addEventListener("mouseenter", async () => {
                        const e = t.closest(".js-previewable-comment-form");
                        try {
                            await Ts(e)
                        } catch {}
                    })
                }), (0, X.w4)("keydown", ".js-comment-field", function(t) {
                    const e = t.target;
                    if ((t.ctrlKey || t.metaKey) && t.shiftKey && t.key.toUpperCase() === "P") {
                        const n = e.closest(".js-previewable-comment-form");
                        n.classList.contains("write-selected") && (n instanceof zn.Z ? n.querySelector(".js-preview-tab").click() : (e.blur(), n.dispatchEvent(new CustomEvent("preview:render", {
                            bubbles: !0,
                            cancelable: !1
                        }))), t.preventDefault(), t.stopImmediatePropagation())
                    }
                });
                const As = /^(\+1|-1|:\+1?|:-1?)$/,
                    Ja = r(t => {
                        let e = !1;
                        for (const n of t.split(`
`)) {
                            const o = n.trim();
                            if (!(!o || o.startsWith(">"))) {
                                if (e && As.test(o) === !1) return !1;
                                !e && As.test(o) && (e = !0)
                            }
                        }
                        return e
                    }, "isReactionLikeComment");
                (0, f.on)("focusout", "#new_comment_field", function(t) {
                    const n = t.currentTarget.closest(".js-reaction-suggestion");
                    n && ks(n)
                }), (0, f.on)("focusin", "#new_comment_field", function(t) {
                    Cs(t)
                }), (0, X.w4)("keyup", "#new_comment_field", function(t) {
                    Cs(t)
                });

                function Cs(t) {
                    const e = t.target,
                        n = e.value,
                        o = e.closest(".js-reaction-suggestion");
                    if (!!o)
                        if (Ja(n)) {
                            o.classList.remove("hide-reaction-suggestion"), o.classList.add("reaction-suggestion");
                            const s = o.getAttribute("data-reaction-markup");
                            o.setAttribute("data-reaction-suggestion-message", s)
                        } else ks(o)
                }
                r(Cs, "toggleReactionSuggestion");

                function ks(t) {
                    t.classList.remove("reaction-suggestion"), t.classList.add("hide-reaction-suggestion"), t.removeAttribute("data-reaction-suggestion-message")
                }
                r(ks, "clearReactionSuggestion");
                var xs = u(82453);
                (0, f.on)("navigation:keydown", ".js-commits-list-item", function(t) {
                    !(0, xs.Zf)(t.detail.originalEvent) || t.target instanceof Element && t.detail.hotkey === "c" && t.target.querySelector(".js-navigation-open").click()
                });
                var gf = u(24473);
                (0, X.q6)(".js-company-name-input", function(t) {
                    const e = t.target,
                        n = e.form,
                        o = n.querySelector(".js-corp-tos-link"),
                        s = n.querySelector(".js-tos-link");
                    s && (s.classList.add("d-none"), s.setAttribute("aria-hidden", "true"), o && (o.classList.remove("d-none"), o.setAttribute("aria-hidden", "false")));
                    const i = n.querySelectorAll(".js-company-name-text");
                    if (i.length !== 0)
                        for (const a of i)
                            if (e.value)
                                if (a.hasAttribute("data-wording")) {
                                    const l = a.getAttribute("data-wording");
                                    a.textContent = ` ${l} ${e.value}`
                                } else a.textContent = e.value;
                    else a.textContent = ""
                }), (0, v.N7)(".js-company-owned:not(:checked)", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const n = t.form.querySelector(".js-company-name-input"),
                            o = document.querySelector(".js-company-name-text"),
                            s = document.querySelector(".js-corp-tos-link"),
                            i = document.querySelector(".js-tos-link");
                        n && (t.getAttribute("data-optional") && n.removeAttribute("required"), (0, Z.Se)(n, "")), i.classList.remove("d-none"), i.setAttribute("aria-hidden", "false"), s.classList.add("d-none"), s.setAttribute("aria-hidden", "true"), o && (o.textContent = "")
                    }
                }), (0, v.N7)(".js-company-owned:checked", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const n = t.form.querySelector(".js-company-name-input");
                        n && (n.setAttribute("required", ""), (0, f.f)(n, "focus"), (0, f.f)(n, "input"))
                    }
                }), (0, v.N7)(".js-company-owned-autoselect", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const e = t;

                        function n() {
                            if (e.checked && e.form) {
                                const o = e.form.querySelector(".js-company-owned");
                                (0, Z.Se)(o, !0)
                            }
                        }
                        r(n, "autoselect"), e.addEventListener("change", n), n()
                    }
                });
                var Gn = u(79046),
                    Zn = u(17364);
                let It = null;
                document.addEventListener("keydown", function(t) {
                    !t.defaultPrevented && t.key === "Escape" && It && It.removeAttribute("open")
                }), (0, v.N7)(".js-dropdown-details", {
                    subscribe: t => (0, N.qC)((0, N.RB)(t, "toggle", Qa), (0, N.RB)(t, "toggle", Ya))
                });

                function Ya({
                    currentTarget: t
                }) {
                    const e = t;
                    if (e.hasAttribute("open")) {
                        const n = e.querySelector("[autofocus]");
                        n && n.focus()
                    } else {
                        const n = e.querySelector("summary");
                        n && n.focus()
                    }
                }
                r(Ya, "autofocus");

                function Qa({
                    currentTarget: t
                }) {
                    const e = t;
                    e.hasAttribute("open") ? (It && It !== e && It.removeAttribute("open"), It = e) : e === It && (It = null)
                }
                r(Qa, "closeCurrentDetailsDropdown"), (0, v.N7)("[data-deferred-details-content-url]:not([data-details-no-preload-on-hover])", {
                    subscribe: t => {
                        const e = t.querySelector("summary");
                        return (0, N.RB)(e, "mouseenter", Zn.G)
                    }
                }), (0, v.N7)("[data-deferred-details-content-url]", {
                    subscribe: t => (0, N.RB)(t, "toggle", Zn.G)
                }), (0, f.on)("click", "[data-toggle-for]", function(t) {
                    const e = t.currentTarget.getAttribute("data-toggle-for") || "",
                        n = document.getElementById(e);
                    !n || (n.hasAttribute("open") ? n.removeAttribute("open") : n.setAttribute("open", "open"))
                }), (0, ze.Z)(function({
                    target: t
                }) {
                    if (!t || t.closest("summary")) return;
                    let e = t.parentElement;
                    for (; e;) e = e.closest("details"), e && (e.hasAttribute("open") || e.setAttribute("open", ""), e = e.parentElement)
                }), (0, f.on)("details-dialog-close", "[data-disable-dialog-dismiss]", function(t) {
                    t.preventDefault()
                });
                var tc = u(88309);
                (0, v.N7)("details.select-menu details-menu include-fragment", function(t) {
                    const e = t.closest("details");
                    !e || (t.addEventListener("loadstart", function() {
                        e.classList.add("is-loading"), e.classList.remove("has-error")
                    }), t.addEventListener("error", function() {
                        e.classList.add("has-error")
                    }), t.addEventListener("loadend", function() {
                        e.classList.remove("is-loading");
                        const n = e.querySelector(".js-filterable-field");
                        n && (0, f.f)(n, "filterable:change")
                    }))
                }), (0, v.N7)("details details-menu .js-filterable-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const e = t.closest("details");
                        e.addEventListener("toggle", function() {
                            e.hasAttribute("open") || (t.value = "", (0, f.f)(t, "filterable:change"))
                        })
                    }
                }), (0, v.N7)("details-menu[role=menu] [role=menu]", t => {
                    const e = t.closest("details-menu[role]");
                    e && e !== t && e.removeAttribute("role")
                }), (0, v.N7)("details details-menu remote-input input", {
                    constructor: HTMLInputElement,
                    add(t) {
                        const e = t.closest("details");
                        e.addEventListener("toggle", function() {
                            e.hasAttribute("open") || (t.value = "")
                        })
                    }
                }), (0, v.N7)("form details-menu", t => {
                    const e = t.closest("form");
                    e.addEventListener("reset", () => {
                        setTimeout(() => ec(e), 0)
                    })
                });

                function ec(t) {
                    const e = t.querySelectorAll("details-menu [role=menuitemradio] input[type=radio]:checked");
                    for (const n of e)(0, f.f)(n, "change")
                }
                r(ec, "resetMenus"), (0, X.w4)("keypress", "details-menu .js-filterable-field, details-menu filter-input input", t => {
                    if (t.key === "Enter") {
                        const o = t.currentTarget.closest("details-menu").querySelector('[role^="menuitem"]:not([hidden])');
                        o instanceof HTMLElement && o.click(), t.preventDefault()
                    }
                }), (0, f.on)("details-menu-selected", "details-menu", t => {
                    const n = t.currentTarget.querySelector(".js-filterable-field");
                    n instanceof HTMLInputElement && n.value && n.focus()
                }, {
                    capture: !0
                }), (0, f.on)("details-menu-selected", "[data-menu-input]", t => {
                    if (!(t.target instanceof Element)) return;
                    const e = t.target.getAttribute("data-menu-input"),
                        n = document.getElementById(e);
                    (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) && (n.value = t.detail.relatedTarget.value)
                }, {
                    capture: !0
                }), (0, v.N7)("details-menu remote-input", {
                    constructor: tc.Z,
                    initialize(t) {
                        const e = document.getElementById(t.getAttribute("aria-owns") || "");
                        if (!e) return;
                        let n = null;
                        t.addEventListener("load", () => {
                            document.activeElement && e.contains(document.activeElement) && document.activeElement.id ? n = document.activeElement.id : n = null
                        }), t.addEventListener("loadend", () => {
                            if (n) {
                                const o = e.querySelector(`#${n}`) || e.querySelector('[role^="menu"]');
                                o instanceof HTMLElement ? o.focus() : t.input && t.input.focus()
                            }
                        })
                    }
                }), (0, f.on)("details-menu-selected", "details-menu[data-menu-max-options]", t => {
                    const e = +t.currentTarget.getAttribute("data-menu-max-options"),
                        n = t.currentTarget.querySelectorAll('[role="menuitemcheckbox"][aria-checked="true"]'),
                        o = e === n.length;
                    t.currentTarget.querySelector("[data-menu-max-options-warning]").hidden = !o;
                    for (const s of t.currentTarget.querySelectorAll('[role="menuitemcheckbox"] input')) s.disabled = o && !s.checked
                }, {
                    capture: !0
                }), (0, v.N7)("details > details-menu", {
                    subscribe(t) {
                        const e = t.closest("details");
                        return (0, N.RB)(e, "toggle", nc)
                    }
                });
                async function nc({
                    currentTarget: t
                }) {
                    const e = t,
                        n = e.hasAttribute("open");
                    (0, f.f)(e, n ? "menu:activate" : "menu:deactivate"), await (0, xt.gJ)(), (0, f.f)(e, n ? "menu:activated" : "menu:deactivated")
                }
                r(nc, "fireMenuToggleEvent"), (0, v.N7)("details > details-menu[preload]:not([src])", {
                    subscribe(t) {
                        return (0, N.RB)(t.parentElement, "mouseover", function(e) {
                            const o = e.currentTarget.querySelector("include-fragment[src]");
                            o == null || o.load()
                        })
                    }
                });
                const Jn = new WeakMap,
                    Ms = ["input[type=submit][data-disable-with]", "button[data-disable-with]"].join(", ");

                function oc(t) {
                    return t instanceof HTMLInputElement ? t.value || "Submit" : t.innerHTML || ""
                }
                r(oc, "getButtonText");

                function qs(t, e) {
                    t instanceof HTMLInputElement ? t.value = e : t.innerHTML = e
                }
                r(qs, "disable_with_setButtonText"), (0, f.on)("submit", "form", function(t) {
                    for (const e of t.currentTarget.querySelectorAll(Ms)) {
                        Jn.set(e, oc(e));
                        const n = e.getAttribute("data-disable-with");
                        n && qs(e, n), e.disabled = !0
                    }
                }, {
                    capture: !0
                });

                function Ps(t) {
                    for (const e of t.querySelectorAll(Ms)) {
                        const n = Jn.get(e);
                        n != null && (qs(e, n), (!e.hasAttribute("data-disable-invalid") || t.checkValidity()) && (e.disabled = !1), Jn.delete(e))
                    }
                }
                r(Ps, "revert"), (0, f.on)("deprecatedAjaxComplete", "form", function({
                    currentTarget: t,
                    target: e
                }) {
                    t === e && Ps(t)
                }), (0, K.uT)(Ps), (0, v.N7)(".js-document-dropzone", {
                    constructor: HTMLElement,
                    add(t) {
                        document.body.addEventListener("dragstart", Ns), document.body.addEventListener("dragend", _s), document.body.addEventListener("dragenter", Ze), document.body.addEventListener("dragover", Ze), document.body.addEventListener("dragleave", Rs), t.addEventListener("drop", Ds)
                    },
                    remove(t) {
                        document.body.removeEventListener("dragstart", Ns), document.body.removeEventListener("dragend", _s), document.body.removeEventListener("dragenter", Ze), document.body.removeEventListener("dragover", Ze), document.body.removeEventListener("dragleave", Rs), t.removeEventListener("drop", Ds)
                    }
                });

                function Is(t) {
                    return Array.from(t.types).indexOf("Files") >= 0
                }
                r(Is, "hasFile");
                let Yn = null;

                function Ze(t) {
                    if (Qn) return;
                    const e = t.currentTarget;
                    Yn && window.clearTimeout(Yn), Yn = window.setTimeout(() => e.classList.remove("dragover"), 200);
                    const n = t.dataTransfer;
                    !n || !Is(n) || (n.dropEffect = "copy", e.classList.add("dragover"), t.stopPropagation(), t.preventDefault())
                }
                r(Ze, "onDragenter");

                function Rs(t) {
                    t.target instanceof Element && t.target.classList.contains("js-document-dropzone") && t.currentTarget.classList.remove("dragover")
                }
                r(Rs, "onBodyDragleave");

                function Ds(t) {
                    const e = t.currentTarget;
                    e.classList.remove("dragover"), document.body.classList.remove("dragover");
                    const n = t.dataTransfer;
                    !n || !Is(n) || ((0, f.f)(e, "document:drop", {
                        transfer: n
                    }), t.stopPropagation(), t.preventDefault())
                }
                r(Ds, "onDrop");
                let Qn = !1;

                function Ns() {
                    Qn = !0
                }
                r(Ns, "onDragstart");

                function _s() {
                    Qn = !1
                }
                r(_s, "onDragend");
                async function Hs(t, e) {
                    const o = new TextEncoder().encode(e),
                        {
                            seal: s
                        } = await Promise.all([u.e(9833), u.e(7178)]).then(u.bind(u, 86556));
                    return s(o, t)
                }
                r(Hs, "encrypt");

                function Os(t) {
                    const e = atob(t).split("").map(n => n.charCodeAt(0));
                    return Uint8Array.from(e)
                }
                r(Os, "decode");

                function Bs(t) {
                    let e = "";
                    for (const n of t) e += String.fromCharCode(n);
                    return btoa(e)
                }
                r(Bs, "encode"), (0, f.on)("submit", "form.js-encrypt-submit", async function(t) {
                    const e = t.currentTarget;
                    if (t.defaultPrevented || !e.checkValidity()) return;
                    const n = e.elements.namedItem("secret_value");
                    if (n.disabled = !0, !n.value) return;
                    t.preventDefault();
                    const o = Os(e.getAttribute("data-public-key"));
                    e.elements.namedItem("encrypted_value").value = Bs(await Hs(o, n.value)), e.submit()
                }), (0, f.on)("submit", "form.js-encrypt-bulk-submit", $s(!0)), (0, f.on)("submit", "form.js-encrypt-bulk-submit-enable-empty", $s(!1));

                function $s(t) {
                    return async function(e) {
                        const n = e.currentTarget;
                        if (e.defaultPrevented || !n.checkValidity()) return;
                        const o = Os(n.getAttribute("data-public-key"));
                        e.preventDefault();
                        for (const s of n.elements) {
                            const i = s;
                            if (i.id.endsWith("secret")) {
                                if (i.disabled = !0, i.required && !i.value) {
                                    const c = `${i.name} is invalid!`,
                                        l = document.querySelector("template.js-flash-template");
                                    l.after(new St.R(l, {
                                        className: "flash-error",
                                        message: c
                                    }));
                                    return
                                }
                                const a = `${i.name}_encrypted_value`;
                                if (!i.value) {
                                    n.elements.namedItem(a).disabled = t;
                                    continue
                                }
                                n.elements.namedItem(a).value = Bs(await Hs(o, i.value))
                            }
                        }
                        n.submit()
                    }
                }
                r($s, "submitBulk");
                let Je;

                function Ye(t, e) {
                    const n = document.querySelector('.js-site-favicon[type="image/svg+xml"]'),
                        o = document.querySelector('.js-site-favicon[type="image/png"]');
                    e || (e = "light");
                    const s = e === "light" ? "" : "-dark";
                    if (n && o)
                        if (Je == null && (Je = n.href), t) {
                            t = t.substr(0, t.lastIndexOf(".")), t = `${t}${s}.svg`, n.href = t;
                            const i = n.href.substr(0, n.href.lastIndexOf("."));
                            o.href = `${i}.png`
                        } else {
                            const i = n.href.indexOf("-dark.svg"),
                                a = n.href.substr(0, i !== -1 ? i : n.href.lastIndexOf("."));
                            n.href = `${a}${s}.svg`, o.href = `${a}${s}.png`
                        }
                }
                r(Ye, "updateFavicon");

                function Qe() {
                    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                }
                r(Qe, "prefersDarkColorScheme");

                function sc() {
                    Je != null && Ye(Je, Qe() ? "dark" : "light")
                }
                r(sc, "resetIcon"), (0, v.N7)("[data-favicon-override]", {
                    add(t) {
                        const e = t.getAttribute("data-favicon-override");
                        setTimeout(() => Ye(e, Qe() ? "dark" : "light"))
                    },
                    remove() {
                        sc()
                    }
                }), Qe() && Ye(void 0, "dark"), window.matchMedia("(prefers-color-scheme: dark)").addListener(() => {
                    Ye(void 0, Qe() ? "dark" : "light")
                }), (0, v.N7)(".js-feature-preview-indicator-container", t => {
                    rc(t)
                });
                async function rc(t) {
                    const e = t.getAttribute("data-feature-preview-indicator-src"),
                        n = await ic(e),
                        o = t.querySelectorAll(".js-feature-preview-indicator");
                    for (const s of o) s.hidden = !n
                }
                r(rc, "fetchFeaturePreviewIndicator");
                async function ic(t) {
                    try {
                        const e = await fetch(t, {
                            headers: {
                                Accept: "application/json"
                            }
                        });
                        return e.ok ? (await e.json()).show_indicator : !1
                    } catch {
                        return !1
                    }
                }
                r(ic, "fetchIndicator");
                var Rt = u(51374),
                    at = u(52660);
                (0, f.on)("click", "[data-feature-preview-trigger-url]", async t => {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-feature-preview-trigger-url"),
                        o = await (0, Rt.W)({
                            content: (0, at.a)(document, n),
                            dialogClass: "feature-preview-dialog"
                        }),
                        s = e.getAttribute("data-feature-preview-close-details"),
                        i = e.getAttribute("data-feature-preview-close-hmac");
                    o.addEventListener("dialog:remove", () => {
                        (0, jt.b)({
                            hydroEventPayload: s,
                            hydroEventHmac: i
                        }, !0)
                    });
                    const a = document.querySelectorAll(".js-feature-preview-indicator");
                    for (const c of a) c.hidden = !0
                }), (0, K.AC)(".js-feature-preview-unenroll", async (t, e) => {
                    await e.text();
                    const n = t.querySelector(".js-feature-preview-slug").value;
                    (0, f.f)(t, `feature-preview-unenroll:${n}`)
                }), (0, K.AC)(".js-feature-preview-enroll", async (t, e) => {
                    await e.text();
                    const n = t.querySelector(".js-feature-preview-slug").value;
                    (0, f.f)(t, `feature-preview-enroll:${n}`)
                });
                class Fs {
                    constructor(e, n) {
                        this.attachment = e, this.policy = n
                    }
                    async process(e) {
                        var n, o, s, i;
                        const a = window.performance.now(),
                            c = new Headers(this.policy.header || {}),
                            l = new XMLHttpRequest;
                        l.open("POST", this.policy.upload_url, !0);
                        for (const [T, k] of c) l.setRequestHeader(T, k);
                        l.onloadstart = () => {
                            e.attachmentUploadDidStart(this.attachment, this.policy)
                        }, l.upload.onprogress = T => {
                            if (T.lengthComputable) {
                                const k = Math.round(T.loaded / T.total * 100);
                                e.attachmentUploadDidProgress(this.attachment, k)
                            }
                        }, await ac(l, cc(this.attachment, this.policy)), l.status === 204 ? (Us(this.policy), e.attachmentUploadDidComplete(this.attachment, this.policy, {})) : l.status === 201 ? (Us(this.policy), e.attachmentUploadDidComplete(this.attachment, this.policy, JSON.parse(l.responseText))) : e.attachmentUploadDidError(this.attachment, {
                            status: l.status,
                            body: l.responseText
                        });
                        const j = {
                            duration: window.performance.now() - a,
                            size: (o = (n = this.attachment) == null ? void 0 : n.file) == null ? void 0 : o.size,
                            fileType: (i = (s = this.attachment) == null ? void 0 : s.file) == null ? void 0 : i.type,
                            success: l.status === 204 || l.status === 201
                        };
                        (0, jt.b)({
                            uploadTiming: j
                        }, !0)
                    }
                }
                r(Fs, "AttachmentUpload");

                function ac(t, e) {
                    return new Promise((n, o) => {
                        t.onload = () => n(t), t.onerror = o, t.send(e)
                    })
                }
                r(ac, "send");

                function cc(t, e) {
                    const n = new FormData;
                    e.same_origin && n.append("authenticity_token", e.upload_authenticity_token);
                    for (const o in e.form) n.append(o, e.form[o]);
                    return n.append("file", t.file), n
                }
                r(cc, "uploadForm");

                function Us(t) {
                    const e = typeof t.asset_upload_url == "string" ? t.asset_upload_url : null,
                        n = typeof t.asset_upload_authenticity_token == "string" ? t.asset_upload_authenticity_token : null;
                    if (!(e && n)) return;
                    const o = new FormData;
                    o.append("authenticity_token", n), fetch(e, {
                        method: "PUT",
                        body: o,
                        credentials: "same-origin",
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    })
                }
                r(Us, "markComplete");
                async function lc(t, e) {
                    const n = mc(t, e);
                    for (const o of t.attachments) {
                        const s = await uc(t, o, e);
                        if (!s) return;
                        try {
                            await new Fs(o, s).process(n)
                        } catch {
                            (0, f.f)(e, "upload:error", {
                                batch: t,
                                attachment: o
                            }), Dt(e, "is-failed");
                            return
                        }
                    }
                }
                r(lc, "upload");
                async function uc(t, e, n) {
                    const o = dc(e, n),
                        s = [];
                    (0, f.f)(n, "upload:setup", {
                        batch: t,
                        attachment: e,
                        form: o,
                        preprocess: s
                    });
                    try {
                        await Promise.all(s);
                        const i = await fetch(fc(o, n));
                        if (i.ok) return await i.json();
                        (0, f.f)(n, "upload:invalid", {
                            batch: t,
                            attachment: e
                        });
                        const a = await i.text(),
                            c = i.status,
                            {
                                state: l,
                                messaging: d
                            } = Ws({
                                status: c,
                                body: a
                            }, e.file);
                        Dt(n, l, d)
                    } catch {
                        (0, f.f)(n, "upload:invalid", {
                            batch: t,
                            attachment: e
                        }), Dt(n, "is-failed")
                    }
                    return null
                }
                r(uc, "validate");

                function dc(t, e) {
                    const n = e.querySelector(".js-data-upload-policy-url-csrf").value,
                        o = e.getAttribute("data-upload-repository-id"),
                        s = e.getAttribute("data-subject-type"),
                        i = e.getAttribute("data-subject-param"),
                        a = t.file,
                        c = new FormData;
                    return c.append("name", a.name), c.append("size", String(a.size)), c.append("content_type", a.type), c.append("authenticity_token", n), s && c.append("subject_type", s), i && c.append("subject", i), o && c.append("repository_id", o), t.directory && c.append("directory", t.directory), c
                }
                r(dc, "policyForm");

                function fc(t, e) {
                    return new Request(e.getAttribute("data-upload-policy-url"), {
                        method: "POST",
                        body: t,
                        credentials: "same-origin",
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    })
                }
                r(fc, "policyRequest");

                function mc(t, e) {
                    return {
                        attachmentUploadDidStart(n, o) {
                            n.saving(0), Dt(e, "is-uploading"), (0, f.f)(e, "upload:start", {
                                batch: t,
                                attachment: n,
                                policy: o
                            })
                        },
                        attachmentUploadDidProgress(n, o) {
                            n.saving(o), (0, f.f)(e, "upload:progress", {
                                batch: t,
                                attachment: n
                            })
                        },
                        attachmentUploadDidComplete(n, o, s) {
                            n.saved(hc(s, o)), (0, f.f)(e, "upload:complete", {
                                batch: t,
                                attachment: n
                            }), t.isFinished() && Dt(e, "is-default")
                        },
                        attachmentUploadDidError(n, o) {
                            (0, f.f)(e, "upload:error", {
                                batch: t,
                                attachment: n
                            });
                            const {
                                state: s
                            } = Ws(o);
                            Dt(e, s)
                        }
                    }
                }
                r(mc, "createDelegate");

                function hc(t, e) {
                    const n = (t.id == null ? null : String(t.id)) || (e.asset.id == null ? null : String(e.asset.id)),
                        o = (typeof t.href == "string" ? t.href : null) || (typeof e.asset.href == "string" ? e.asset.href : null);
                    return {
                        id: n,
                        href: o,
                        name: e.asset.name
                    }
                }
                r(hc, "savedAttributes");

                function Ws(t, e) {
                    if (t.status === 400) return {
                        state: "is-bad-file"
                    };
                    if (t.status !== 422) return {
                        state: "is-failed"
                    };
                    const n = JSON.parse(t.body);
                    if (!n || !n.errors) return {
                        state: "is-failed"
                    };
                    for (const o of n.errors) switch (o.field) {
                        case "size":
                            {
                                const s = e ? e.size : null;
                                return s != null && s === 0 ? {
                                    state: "is-empty"
                                } : {
                                    state: "is-too-big",
                                    messaging: {
                                        message: pc(o.message),
                                        target: ".js-upload-too-big"
                                    }
                                }
                            }
                        case "file_count":
                            return {
                                state: "is-too-many"
                            };
                        case "width":
                        case "height":
                            return {
                                state: "is-bad-dimensions"
                            };
                        case "name":
                            return o.code === "already_exists" ? {
                                state: "is-duplicate-filename"
                            } : {
                                state: "is-bad-file"
                            };
                        case "content_type":
                            return {
                                state: "is-bad-file"
                            };
                        case "uploader_id":
                            return {
                                state: "is-bad-permissions"
                            };
                        case "repository_id":
                            return {
                                state: "is-repository-required"
                            };
                        case "format":
                            return {
                                state: "is-bad-format"
                            }
                    }
                    return {
                        state: "is-failed"
                    }
                }
                r(Ws, "policyErrorState");
                const pc = r(t => t.startsWith("size") ? t.substring(5) : t, "trimSizeErrorMessage"),
                    gc = ["is-default", "is-uploading", "is-bad-file", "is-duplicate-filename", "is-too-big", "is-too-many", "is-hidden-file", "is-failed", "is-bad-dimensions", "is-empty", "is-bad-permissions", "is-repository-required", "is-bad-format"];

                function Dt(t, e, n) {
                    if (n) {
                        const {
                            message: o,
                            target: s
                        } = n, i = t.querySelector(s);
                        i && (i.innerHTML = o)
                    }
                    t.classList.remove(...gc), t.classList.add(e)
                }
                r(Dt, "resetState");
                class zs {
                    constructor(e) {
                        this.attachments = e, this.size = this.attachments.length, this.total = to(this.attachments, n => n.file.size)
                    }
                    percent() {
                        const e = r(o => o.file.size * o.percent / 100, "bytes"),
                            n = to(this.attachments, e);
                        return Math.round(n / this.total * 100)
                    }
                    uploaded() {
                        const e = r(n => n.isSaved() ? 1 : 0, "value");
                        return to(this.attachments, e)
                    }
                    isFinished() {
                        return this.attachments.every(e => e.isSaved())
                    }
                }
                r(zs, "Batch");

                function to(t, e) {
                    return t.reduce((n, o) => n + e(o), 0)
                }
                r(to, "sum"), (0, v.N7)("file-attachment[hover]", {
                    add(t) {
                        t.classList.add("dragover")
                    },
                    remove(t) {
                        t.classList.remove("dragover")
                    }
                }), (0, f.on)("file-attachment-accept", "file-attachment", function(t) {
                    const {
                        attachments: e
                    } = t.detail;
                    e.length === 0 && (Dt(t.currentTarget, "is-hidden-file"), t.preventDefault())
                }), (0, f.on)("file-attachment-accepted", "file-attachment", function(t) {
                    const e = t.currentTarget.querySelector(".drag-and-drop");
                    if (e && e.hidden) return;
                    const {
                        attachments: n
                    } = t.detail;
                    lc(new zs(n), t.currentTarget)
                });
                let Vs = 0;
                (0, v.N7)("file-attachment", {
                    add(t) {
                        Vs++ === 0 && (document.addEventListener("drop", Xs), document.addEventListener("dragover", Gs));
                        const e = t.closest("form");
                        e && e.addEventListener("reset", Zs)
                    },
                    remove(t) {
                        --Vs === 0 && (document.removeEventListener("drop", Xs), document.removeEventListener("dragover", Gs));
                        const e = t.closest("form");
                        e && e.removeEventListener("reset", Zs)
                    }
                });

                function Ks(t) {
                    return Array.from(t.types).indexOf("Files") >= 0
                }
                r(Ks, "file_attachment_hasFile");

                function Xs(t) {
                    const e = t.dataTransfer;
                    e && Ks(e) && t.preventDefault()
                }
                r(Xs, "onDocumentDrop");

                function Gs(t) {
                    const e = t.dataTransfer;
                    e && Ks(e) && t.preventDefault()
                }
                r(Gs, "onDocumentDragover");

                function Zs({
                    currentTarget: t
                }) {
                    const e = t.querySelector("file-attachment");
                    Dt(e, "is-default")
                }
                r(Zs, "onFormReset");
                var bc = u(13002);
                (0, f.on)("filter-input-updated", "filter-input", t => {
                    const e = t.currentTarget.input;
                    if (!(document.activeElement && document.activeElement === e)) return;
                    const {
                        count: n,
                        total: o
                    } = t.detail;
                    (0, ft.x)(`Found ${n} out of ${o} ${o===1?"item":"items"}`)
                }), (0, f.on)("toggle", "details", t => {
                    setTimeout(() => yc(t.target), 0)
                }, {
                    capture: !0
                }), (0, f.on)("tab-container-changed", "tab-container", t => {
                    if (!(t.target instanceof HTMLElement)) return;
                    const {
                        relatedTarget: e
                    } = t.detail, n = t.target.querySelector("filter-input");
                    n instanceof bc.Z && n.setAttribute("aria-owns", e.id)
                }, {
                    capture: !0
                });

                function yc(t) {
                    const e = t.querySelector("filter-input");
                    e && !t.hasAttribute("open") && e.reset()
                }
                r(yc, "resetFilter");
                var bf = u(64909);
                const Js = navigator.userAgent.match(/Firefox\/(\d+)/);
                Js && Number(Js[1]) < 76 && ((0, v.N7)('details-menu label[tabindex][role^="menuitem"]', t => {
                    const e = t.querySelector("input");
                    if (!e) return;
                    const n = t.classList.contains("select-menu-item"),
                        o = e.classList.contains("d-none"),
                        s = n || o || e.hidden;
                    n && e.classList.add("d-block"), o && e.classList.remove("d-none"), s && (e.classList.add("sr-only"), e.hidden = !1), t.removeAttribute("tabindex")
                }), (0, f.on)("focus", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', t => {
                    const e = t.currentTarget.closest("label");
                    e.classList.contains("select-menu-item") && e.classList.add("navigation-focus"), e.classList.contains("SelectMenu-item") && e.classList.add("hx_menuitem--focus"), e.classList.contains("dropdown-item") && e.classList.add("hx_menuitem--focus"), t.currentTarget.addEventListener("blur", () => {
                        e.classList.contains("select-menu-item") && e.classList.remove("navigation-focus"), e.classList.contains("SelectMenu-item") && e.classList.remove("hx_menuitem--focus"), e.classList.contains("dropdown-item") && e.classList.remove("hx_menuitem--focus")
                    }, {
                        once: !0
                    })
                }, {
                    capture: !0
                }), (0, X.w4)("keydown", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', async function(t) {
                    if (Ys(t)) t.currentTarget instanceof Element && vc(t.currentTarget);
                    else if (t.key === "Enter") {
                        const e = t.currentTarget;
                        t.preventDefault(), await (0, xt.gJ)(), e instanceof HTMLInputElement && e.click()
                    }
                }), (0, f.on)("blur", 'details-menu label input[role="menuitemradio"], details-menu label input[role="menuitemcheckbox"]', t => {
                    Qs(t.currentTarget)
                }, {
                    capture: !0
                }), (0, X.w4)("keyup", 'details-menu label[role="menuitemradio"] input, details-menu label[role="menuitemcheckbox"] input', t => {
                    !Ys(t) || t.currentTarget instanceof Element && Qs(t.currentTarget)
                }));

                function Ys(t) {
                    return t.key === "ArrowDown" || t.key === "ArrowUp"
                }
                r(Ys, "isArrowKeys");

                function vc(t) {
                    const e = t.closest("label");
                    e.hasAttribute("data-role") || e.setAttribute("data-role", e.getAttribute("role")), t.setAttribute("role", e.getAttribute("data-role")), e.removeAttribute("role")
                }
                r(vc, "switchRoleToInputForNavigation");

                function Qs(t) {
                    const e = t.closest("label");
                    e.hasAttribute("data-role") || e.setAttribute("data-role", e.getAttribute("role")), e.setAttribute("role", e.getAttribute("data-role")), t.removeAttribute("role")
                }
                r(Qs, "switchRoleBackToOriginalState");
                var eo = u(37713);

                function tr() {
                    (0, eo.lA)(document) && (0, eo.kc)(document)
                }
                r(tr, "scrollTargetIntoViewIfNeeded"), (0, ze.Z)(tr), (0, f.on)("click", 'a[href^="#"]', function(t) {
                    const {
                        currentTarget: e
                    } = t;
                    e instanceof HTMLAnchorElement && setTimeout(tr, 0)
                });
                var yf = u(11997);
                const wc = ["flash-notice", "flash-error", "flash-message", "flash-warn"];

                function Ec(t) {
                    for (const {
                            key: e,
                            value: n
                        } of wc.flatMap(pe.$1)) {
                        (0, pe.kT)(e);
                        let o;
                        try {
                            o = atob(decodeURIComponent(n))
                        } catch {
                            continue
                        }
                        t.after(new St.R(t, {
                            className: e,
                            message: o
                        }))
                    }
                }
                r(Ec, "displayFlash"), (0, v.N7)("template.js-flash-template", {
                    constructor: HTMLTemplateElement,
                    add(t) {
                        Ec(t)
                    }
                });
                const no = new WeakMap;
                document.addEventListener("focus", function(t) {
                    const e = t.target;
                    e instanceof Element && !no.get(e) && ((0, f.f)(e, "focusin:delay"), no.set(e, !0))
                }, {
                    capture: !0
                }), document.addEventListener("blur", function(t) {
                    setTimeout(function() {
                        const e = t.target;
                        e instanceof Element && e !== document.activeElement && ((0, f.f)(e, "focusout:delay"), no.delete(e))
                    }, 200)
                }, {
                    capture: !0
                }), (0, K.AC)(".js-form-toggle-target", async function(t, e) {
                    try {
                        await e.text()
                    } catch {
                        return
                    }
                    const n = t.closest(".js-form-toggle-container");
                    n.querySelector(".js-form-toggle-target[hidden]").hidden = !1, t.hidden = !0
                });

                function Lc(t) {
                    t instanceof CustomEvent && (0, ft.x)(`${t.detail} results found.`)
                }
                r(Lc, "noticeHandler"), (0, v.N7)("fuzzy-list", {
                    constructor: L,
                    subscribe: t => (0, N.RB)(t, "fuzzy-list-sorted", Lc)
                }), (0, f.on)("click", ".email-hidden-toggle", function(t) {
                    const e = t.currentTarget.nextElementSibling;
                    e instanceof HTMLElement && (e.style.display = "", e.classList.toggle("expanded"), t.preventDefault())
                });
                var vf = u(42474);
                (0, v.N7)(".js-hook-url-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        function e() {
                            const n = t.form;
                            if (!n) return;
                            let o;
                            try {
                                o = new URL(t.value)
                            } catch {}
                            const s = n.querySelector(".js-invalid-url-notice");
                            s instanceof HTMLElement && (s.hidden = !!(t.value === "" || o && /^https?:/.test(o.protocol)));
                            const i = n.querySelector(".js-insecure-url-notice");
                            i instanceof HTMLElement && o && t.value && (i.hidden = /^https:$/.test(o.protocol));
                            const a = n.querySelector(".js-ssl-hook-fields");
                            a instanceof HTMLElement && (a.hidden = !(o && o.protocol === "https:"))
                        }
                        r(e, "checkUrl"), (0, Jo.oq)(t, e), e()
                    }
                });

                function er(t) {
                    const e = document.querySelectorAll(".js-hook-event-checkbox");
                    for (const n of e) n.checked = n.matches(t)
                }
                r(er, "chooseEvents"), (0, f.on)("change", ".js-hook-event-choice", function(t) {
                    const e = t.currentTarget,
                        n = e.checked && e.value === "custom",
                        o = e.closest(".js-hook-events-field");
                    if (o && o.classList.toggle("is-custom", n), e.checked)
                        if (n) {
                            const s = document.querySelector(".js-hook-wildcard-event");
                            s.checked = !1
                        } else e.value === "push" ? er('[value="push"]') : e.value === "all" && er(".js-hook-wildcard-event")
                }), (0, f.on)("click", ".js-hook-deliveries-pagination-button", async function(t) {
                    const e = t.currentTarget;
                    e.disabled = !0;
                    const n = e.parentElement,
                        o = e.getAttribute("data-url");
                    n.before(await (0, at.a)(document, o)), n.remove()
                }), (0, K.AC)(".js-redeliver-hook-form", async function(t, e) {
                    let n;
                    try {
                        n = await e.html()
                    } catch {
                        t.classList.add("failed");
                        return
                    }
                    document.querySelector(".js-hook-deliveries-container").replaceWith(n.html)
                });
                var wf = u(25522),
                    oo = u(81654);
                let ot = document.querySelector(".js-hovercard-content");
                (0, v.N7)(".js-hovercard-content", t => {
                    ot = t
                });
                const Sc = (0, Tt.Z)(at.a);
                let Nt, tn = null,
                    so, ro = 0;
                const io = 12,
                    ao = 24,
                    nr = ao - 7,
                    or = 16,
                    jc = 100,
                    Tc = 250;

                function Wt(t) {
                    return "Popover-message--" + t
                }
                r(Wt, "contentClass");

                function Ac(t) {
                    setTimeout(() => {
                        if (document.body && document.body.contains(t)) {
                            const e = t.querySelector("[data-hovercard-tracking]");
                            if (e) {
                                const o = e.getAttribute("data-hovercard-tracking");
                                o && (0, Qt.q)("user-hovercard-load", JSON.parse(o))
                            }
                            const n = t.querySelector("[data-hydro-view]");
                            n instanceof HTMLElement && (0, oo.Fk)(n)
                        }
                    }, 500)
                }
                r(Ac, "trackLoad");

                function be() {
                    ot instanceof HTMLElement && (ot.style.display = "none", ot.children[0].innerHTML = "", tn = null, Nt = null)
                }
                r(be, "hideCard");

                function Cc(t) {
                    const e = t.getClientRects();
                    let n = e[0] || t.getBoundingClientRect() || {
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0
                    };
                    if (e.length > 0) {
                        for (const o of e)
                            if (o.left < ro && o.right > ro) {
                                n = o;
                                break
                            }
                    }
                    return n
                }
                r(Cc, "selectRectNearestMouse");

                function kc(t) {
                    const {
                        width: e,
                        height: n
                    } = ot.getBoundingClientRect(), {
                        left: o,
                        top: s,
                        height: i,
                        width: a
                    } = Cc(t), c = s > n;
                    if (t.classList.contains("js-hovercard-left")) {
                        const d = o - e - io,
                            h = s + i / 2;
                        return {
                            containerTop: c ? h - n + nr + or / 2 : h - nr - or / 2,
                            containerLeft: d,
                            contentClassSuffix: c ? "right-bottom" : "right-top"
                        }
                    } else {
                        const d = window.innerWidth - o > e,
                            h = o + a / 2,
                            j = d ? h - ao : h - e + ao;
                        return {
                            containerTop: c ? s - n - io : s + i + io,
                            containerLeft: j,
                            contentClassSuffix: c ? d ? "bottom-left" : "bottom-right" : d ? "top-left" : "top-right"
                        }
                    }
                }
                r(kc, "calculatePositions");

                function xc(t, e) {
                    if (!(ot instanceof HTMLElement)) return;
                    ot.style.visibility = "hidden", ot.style.display = "block", e.classList.remove(Wt("bottom-left"), Wt("bottom-right"), Wt("right-top"), Wt("right-bottom"), Wt("top-left"), Wt("top-right"));
                    const {
                        containerTop: n,
                        containerLeft: o,
                        contentClassSuffix: s
                    } = kc(t);
                    e.classList.add(Wt(s)), ot.style.top = `${n+window.pageYOffset}px`, ot.style.left = `${o+window.pageXOffset}px`, Hc(t, ot), ot.style.visibility = ""
                }
                r(xc, "positionCard");

                function Mc(t, e) {
                    if (!(ot instanceof HTMLElement)) return;
                    const n = ot.children[0];
                    n.innerHTML = "";
                    const o = document.createElement("div");
                    for (const s of t.children) o.appendChild(s.cloneNode(!0));
                    n.appendChild(o), xc(e, n), Ac(o), ot.style.display = "block"
                }
                r(Mc, "showCard");

                function qc(t) {
                    const e = t.closest("[data-hovercard-subject-tag]");
                    if (e) return e.getAttribute("data-hovercard-subject-tag");
                    const n = document.head && document.head.querySelector('meta[name="hovercard-subject-tag"]');
                    return n ? n.getAttribute("content") : null
                }
                r(qc, "determineEnclosingSubject");

                function Pc(t) {
                    const e = t.getAttribute("data-hovercard-url");
                    if (e) {
                        const n = qc(t);
                        if (n) {
                            const o = new URL(e, window.location.origin),
                                s = new URLSearchParams(o.search.slice(1));
                            return s.append("subject", n), s.append("current_path", window.location.pathname + window.location.search), o.search = s.toString(), o.toString()
                        }
                        return e
                    }
                    return ""
                }
                r(Pc, "hovercardUrlFromTarget");

                function Ic(t) {
                    const e = t.getAttribute("data-hovercard-type");
                    return e === "pull_request" || e === "issue" ? !!t.closest("[data-issue-and-pr-hovercards-enabled]") : e === "team" ? !!t.closest("[data-team-hovercards-enabled]") : e === "repository" ? !!t.closest("[data-repository-hovercards-enabled]") : e === "commit" ? !!t.closest("[data-commit-hovercards-enabled]") : e === "project" ? !!t.closest("[data-project-hovercards-enabled]") : e === "discussion" ? !!t.closest("[data-discussion-hovercards-enabled]") : e === "acv_badge" ? !!t.closest("[data-acv-badge-hovercards-enabled]") : e === "sponsors_listing" ? !!t.closest("[data-sponsors-listing-hovercards-enabled]") : !0
                }
                r(Ic, "hovercardsAreEnabledForType");
                async function Rc(t, e) {
                    if ("ontouchstart" in document) return;
                    const o = t.currentTarget;
                    if (t instanceof MouseEvent && (ro = t.clientX), !(o instanceof Element) || Nt === o || o.closest(".js-hovercard-content") || !Ic(o)) return;
                    be(), Nt = o, tn = document.activeElement;
                    const s = Pc(o);
                    let i;
                    try {
                        const a = new Promise(c => window.setTimeout(c, e, 0));
                        i = await Sc(document, s), await a
                    } catch (a) {
                        const c = a.response;
                        if (c && c.status === 404) {
                            const l = "Hovercard is unavailable";
                            o.setAttribute("aria-label", l), o.classList.add("tooltipped", "tooltipped-ne")
                        } else if (c && c.status === 410) {
                            const l = await c.clone().json();
                            o.setAttribute("aria-label", l.message), o.classList.add("tooltipped", "tooltipped-ne")
                        }
                        return
                    }
                    o === Nt && (Mc(i, o), t instanceof KeyboardEvent && ot instanceof HTMLElement && ot.focus())
                }
                r(Rc, "activateFn");

                function Dc(t) {
                    Rc(t, Tc)
                }
                r(Dc, "activateWithTimeoutFn");

                function co(t) {
                    if (!!Nt) {
                        if (t instanceof MouseEvent && t.relatedTarget instanceof HTMLElement) {
                            const e = t.relatedTarget;
                            if (e.closest(".js-hovercard-content") || e.closest("[data-hovercard-url]")) return
                        } else t instanceof KeyboardEvent && tn instanceof HTMLElement && tn.focus();
                        be()
                    }
                }
                r(co, "deactivateFn");

                function Nc(t) {
                    const e = Nt;
                    so = window.setTimeout(() => {
                        Nt === e && co(t)
                    }, jc)
                }
                r(Nc, "deactivateWithTimeoutFn");

                function sr(t) {
                    if (t instanceof KeyboardEvent) switch (t.key) {
                        case "Escape":
                            co(t)
                    }
                }
                r(sr, "keyupFn");

                function _c() {
                    so && clearTimeout(so)
                }
                r(_c, "cancelDeactivation"), ot && ((0, v.N7)("[data-hovercard-url]", {
                    subscribe: t => (0, N.qC)((0, N.RB)(t, "mouseover", Dc), (0, N.RB)(t, "mouseleave", Nc), (0, N.RB)(t, "keyup", sr))
                }), (0, v.N7)("[data-hovercard-url]", {
                    remove(t) {
                        Nt === t && be()
                    }
                }), (0, v.N7)(".js-hovercard-content", {
                    subscribe: t => (0, N.qC)((0, N.RB)(t, "mouseover", _c), (0, N.RB)(t, "mouseleave", co), (0, N.RB)(t, "keyup", sr))
                }), (0, f.on)("menu:activated", "details", be), window.addEventListener("statechange", be));

                function Hc(t, e) {
                    const n = t.getAttribute("data-hovercard-z-index-override");
                    n ? e.style.zIndex = n : e.style.zIndex = "100"
                }
                r(Hc, "setZIndexOverride"), async function() {
                    document.addEventListener("pjax:complete", () => (0, Qt.Y)({
                        pjax: "true"
                    })), await Mt.C, (0, Qt.Y)()
                }(), (0, f.on)("click", "[data-octo-click]", function(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLElement)) return;
                    const n = e.getAttribute("data-octo-click") || "",
                        o = {};
                    if (e.hasAttribute("data-ga-click")) {
                        const i = e.getAttribute("data-ga-click").split(",");
                        o.category = i[0].trim(), o.action = i[1].trim()
                    }
                    if (e.hasAttribute("data-octo-dimensions")) {
                        const s = e.getAttribute("data-octo-dimensions").split(",");
                        for (const i of s) {
                            const [a, c] = i.split(/:(.+)/);
                            a && (o[a] = c || "")
                        }
                    }(0, Qt.q)(n, o)
                }), (0, f.on)("click", "[data-hydro-click]", function(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-hydro-click") || "",
                        o = e.getAttribute("data-hydro-click-hmac") || "",
                        s = e.getAttribute("data-hydro-client-context") || "";
                    (0, oo.$S)(n, o, s)
                }), (0, f.on)("click", "[data-optimizely-hydro-click]", function(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-optimizely-hydro-click") || "",
                        o = e.getAttribute("data-optimizely-hydro-click-hmac") || "";
                    (0, oo.$S)(n, o, "")
                }), (0, K.AC)(".js-immediate-updates", async function(t, e) {
                    let n;
                    try {
                        n = (await e.json()).json.updateContent
                    } catch (o) {
                        o.response.json && (n = o.response.json.updateContent)
                    }
                    if (n)
                        for (const o in n) {
                            const s = n[o],
                                i = document.querySelector(o);
                            i instanceof HTMLElement && (0, qt.Of)(i, s)
                        }
                }), (0, v.N7)("[data-indeterminate]", {
                    constructor: HTMLInputElement,
                    initialize(t) {
                        t.indeterminate = !0
                    }
                });
                var Oc = u(75552);

                function Bc() {
                    u.e(3754).then(u.bind(u, 23754))
                }
                r(Bc, "load"), (0, v.N7)(".js-jump-to-field", {
                    constructor: HTMLInputElement,
                    add(t) {
                        t.addEventListener("focusin", Bc, {
                            once: !0
                        }), (0, Oc.Nc)(window.location.pathname)
                    }
                });
                var lo = u(11793);
                let uo = !1;
                async function rr() {
                    if (uo) return;
                    uo = !0;
                    const e = {
                            contexts: document.querySelector("meta[name=github-keyboard-shortcuts]").content
                        },
                        n = `/site/keyboard_shortcuts?${new URLSearchParams(e).toString()}`,
                        o = await (0, Rt.W)({
                            content: (0, at.a)(document, n),
                            labelledBy: "keyboard-shortcuts-heading"
                        });
                    o.style.width = "800px", o.addEventListener("dialog:remove", function() {
                        uo = !1
                    }, {
                        once: !0
                    })
                }
                r(rr, "showKeyboardShortcuts"), (0, f.on)("click", ".js-keyboard-shortcuts", rr), document.addEventListener("keydown", t => {
                    t instanceof KeyboardEvent && (!(0, xs.Zf)(t) || t.target instanceof Node && (0, Z.sw)(t.target) || (0, lo.EL)(t) === "Shift+?" && rr())
                }), (0, v.N7)(".js-modifier-key", {
                    constructor: HTMLElement,
                    add(t) {
                        if (/Macintosh/.test(navigator.userAgent)) {
                            let e = t.textContent;
                            e && (e = e.replace(/ctrl/, "\u2318"), e = e.replace(/alt/, "\u2325"), t.textContent = e)
                        }
                    }
                }), (0, v.N7)(".js-modifier-label-key", {
                    add(t) {
                        var e;
                        let n = (e = t.textContent) == null ? void 0 : e.replace(/ctrl/i, "Ctrl");
                        !n || (/Macintosh/.test(navigator.userAgent) && (n = n.replace(/ctrl/i, "Cmd"), n = n.replace(/alt/i, "Option")), t.textContent = n)
                    }
                });

                function en(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement)) return;
                    const n = parseInt(e.getAttribute("data-input-max-length") || "", 10),
                        o = parseInt(e.getAttribute("data-warning-length") || "", 10) || 5,
                        i = e.value.replace(/(\r\n|\n|\r)/g, `\r
`);
                    let a = n - i.length;
                    if (a <= 0) {
                        let h = i.substr(0, n);
                        h.endsWith("\r") ? (h = h.substr(0, n - 1), a = 1) : a = 0, e.value = h
                    }
                    const c = e.getAttribute("data-warning-text"),
                        d = e.closest(".js-length-limited-input-container").querySelector(".js-length-limited-input-warning");
                    a <= o ? (d.textContent = c.replace(new RegExp("{{remaining}}", "g"), `${a}`), d.classList.remove("d-none")) : (d.textContent = "", d.classList.add("d-none"))
                }
                r(en, "displayLengthWarning"), (0, v.N7)(".js-length-limited-input", {
                    add(t) {
                        t.addEventListener("input", en), t.addEventListener("change", en)
                    },
                    remove(t) {
                        t.removeEventListener("input", en), t.removeEventListener("change", en)
                    }
                }), (0, v.N7)("link[rel=prefetch-viewed]", {
                    initialize() {
                        window.requestIdleCallback(() => {
                            fetch(location.href, {
                                method: "HEAD",
                                credentials: "same-origin",
                                headers: {
                                    Purpose: "prefetch-viewed"
                                }
                            })
                        })
                    }
                }), (0, f.on)("click", ".js-member-search-filter", function(t) {
                    t.preventDefault();
                    const e = t.currentTarget.getAttribute("data-filter"),
                        o = t.currentTarget.closest("[data-filter-on]").getAttribute("data-filter-on"),
                        s = document.querySelector(".js-member-filter-field"),
                        i = s.value,
                        a = new RegExp(`${o}:(?:[a-z]|_|((').*(')))+`),
                        c = i.toString().trim().replace(a, "");
                    s.value = `${c} ${e}`.replace(/\s\s/, " ").trim(), s.focus(), (0, f.f)(s, "input")
                }), (0, f.on)("auto-check-success", ".js-new-organization-name", function(t) {
                    const e = t.target,
                        o = e.closest("dd").querySelector(".js-field-hint-name");
                    !o || (o.textContent = e.value)
                }), (0, K.AC)(".js-notice-dismiss", async function(t, e) {
                    await e.text(), t.closest(".js-notice").remove()
                }), (0, f.on)("submit", ".js-notice-dismiss-remote", async function(t) {
                    const e = t.currentTarget;
                    t.preventDefault();
                    let n;
                    try {
                        n = await fetch(e.action, {
                            method: e.method,
                            body: new FormData(e),
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })
                    } catch {
                        (0, me.v)();
                        return
                    }
                    n && !n.ok ? (0, me.v)() : e.closest(".js-notice").remove()
                });

                function $c(t) {
                    try {
                        const e = t.getBoundingClientRect();
                        if (e.height === 0 && e.width === 0 || t.style.opacity === "0" || t.style.visibility === "hidden") return !1
                    } catch {}
                    return !0
                }
                r($c, "isVisible"), (0, f.on)("click", ".js-github-dev-shortcut", function(t) {
                    t.preventDefault();
                    for (const n of document.querySelectorAll("textarea.js-comment-field"))
                        if (n.value && $c(n) && !confirm("Are you sure you want to open github.dev?")) return;
                    const e = t.currentTarget;
                    e.pathname = window.location.pathname, e.hash = window.location.hash, window.location.href = e.href
                }), (0, f.on)("click", ".js-github-dev-new-tab-shortcut", function(t) {
                    const e = t.currentTarget;
                    e.pathname = window.location.pathname, e.hash = window.location.hash
                });

                function Fc(t, e, n) {
                    const o = new URL("", window.location.origin),
                        s = e.pathname.split("/");
                    o.pathname = s.slice(1, 3).join("/"), o.hash = e.hash, n && (o.search = `?q=${encodeURIComponent(n)}`);
                    const a = new URLSearchParams(e.search).get("q");
                    return a ? o.search = `?q=${encodeURIComponent(a)}` : s.length >= 6 && (s[3] === "blob" || s[3] === "tree") && (o.pathname = e.pathname), o.host = t.host, o.protocol = t.protocol, o.port = t.port, o
                }
                r(Fc, "getBlackbirdURL"), (0, f.on)("click", ".js-blackbird-shortcut", function(t) {
                    var e;
                    const n = t.currentTarget,
                        o = Fc(n, new URL(window.location.href, window.location.origin), (e = window.getSelection()) == null ? void 0 : e.toString());
                    n.href = o.href
                }), (0, f.on)("click", ".js-permalink-shortcut", function(t) {
                    const e = t.currentTarget;
                    try {
                        (0, te.lO)(null, "", e.href + window.location.hash)
                    } catch {
                        window.location.href = e.href + window.location.hash
                    }
                    for (const n of document.querySelectorAll(".js-permalink-replaceable-link")) n instanceof HTMLAnchorElement && (n.href = n.getAttribute("data-permalink-href"));
                    t.preventDefault()
                }), (0, K.AC)(".js-permission-menu-form", async function(t, e) {
                    const n = t.querySelector(".js-permission-success"),
                        o = t.querySelector(".js-permission-error");
                    n.hidden = !0, o.hidden = !0, t.classList.add("is-loading");
                    let s;
                    try {
                        s = await e.json()
                    } catch {
                        t.classList.remove("is-loading"), o.hidden = !1;
                        return
                    }
                    t.classList.remove("is-loading"), n.hidden = !1;
                    const i = t.closest(".js-org-repo");
                    if (i) {
                        const a = s.json;
                        i.classList.toggle("with-higher-access", a.members_with_higher_access)
                    }
                }), async function() {
                    await Mt.x;
                    const t = document.querySelector(".js-pjax-loader-bar");
                    if (!t) return;
                    const e = t.firstElementChild;
                    if (!(e instanceof HTMLElement)) return;
                    let n = 0,
                        o = null,
                        s = null;

                    function i() {
                        a(0), t && t.classList.add("is-loading"), o = window.setTimeout(c, 0)
                    }
                    r(i, "initiateLoader");

                    function a(d) {
                        e instanceof HTMLElement && (d === 0 && (s == null && (s = getComputedStyle(e).transition), e.style.transition = "none"), n = d, e.style.width = `${n}%`, d === 0 && (e.clientWidth, e.style.transition = s || ""))
                    }
                    r(a, "setWidth");

                    function c() {
                        n === 0 && (n = 12), a(Math.min(n + 3, 95)), o = window.setTimeout(c, 500)
                    }
                    r(c, "increment");

                    function l() {
                        o && clearTimeout(o), a(100), t && t.classList.remove("is-loading")
                    }
                    r(l, "finishLoader"), document.addEventListener("pjax:start", i), document.addEventListener("pjax:end", l)
                }();
                let fo = null;
                const mo = "last_pjax_request",
                    nn = "pjax_start",
                    ho = "pjax_end";

                function Uc(t) {
                    t instanceof CustomEvent && t.detail && t.detail.url && (window.performance.mark(nn), fo = t.detail.url)
                }
                r(Uc, "markPjaxStart");
                async function Wc() {
                    if (await (0, xt.gJ)(), !window.performance.getEntriesByName(nn).length) return;
                    window.performance.mark(ho), window.performance.measure(mo, nn, ho);
                    const e = window.performance.getEntriesByName(mo).pop(),
                        n = e ? e.duration : null;
                    !n || (fo && (0, jt.b)({
                        requestUrl: fo,
                        pjaxDuration: Math.round(n)
                    }), zc())
                }
                r(Wc, "trackPjaxTiming");

                function zc() {
                    window.performance.clearMarks(nn), window.performance.clearMarks(ho), window.performance.clearMeasures(mo)
                }
                r(zc, "clearPjaxMarks"), "getEntriesByName" in window.performance && (document.addEventListener("pjax:start", Uc), document.addEventListener("pjax:end", Wc));
                let po = null;
                const go = "last_turbo_request",
                    on = "turbo_start",
                    bo = "turbo_end";

                function Vc(t) {
                    var e;
                    t instanceof CustomEvent && (!((e = t.detail) == null ? void 0 : e.url) || (window.performance.mark(on), po = t.detail.url))
                }
                r(Vc, "markTurboStart");
                async function Kc() {
                    if (await (0, xt.gJ)(), !window.performance.getEntriesByName(on).length) return;
                    window.performance.mark(bo), window.performance.measure(go, on, bo);
                    const e = window.performance.getEntriesByName(go).pop(),
                        n = e ? e.duration : null;
                    !n || (po && (0, jt.b)({
                        requestUrl: po,
                        turboDuration: Math.round(n)
                    }), Xc())
                }
                r(Kc, "trackTurboTiming");

                function Xc() {
                    window.performance.clearMarks(on), window.performance.clearMarks(bo), window.performance.clearMeasures(go)
                }
                r(Xc, "clearTurboMarks"), "getEntriesByName" in window.performance && (document.addEventListener("turbo:before-fetch-request", Vc), document.addEventListener("turbo:render", Kc));
                var Lf = u(13728),
                    Sf = u(76006);

                function Gc(t, e) {
                    const n = t.split("/", 3).join("/"),
                        o = e.split("/", 3).join("/");
                    return n === o
                }
                r(Gc, "isSameRepo"), (0, f.on)("pjax:click", "#js-repo-pjax-container a[href]", function(t) {
                    const e = t.currentTarget.pathname;
                    Gc(e, location.pathname) || t.preventDefault()
                }), (0, f.on)("pjax:click", ".js-comment-body", function(t) {
                    const e = t.target;
                    e instanceof HTMLAnchorElement && e.pathname.split("/")[3] === "files" && t.preventDefault()
                });
                var jf = u(7143),
                    Tf = u(7796),
                    Af = u(15528),
                    ye = u(82762),
                    _t = u(31756);
                (0, f.on)("click", "[data-pjax] a, a[data-pjax]", function(t) {
                    const e = t.currentTarget;
                    if (e instanceof HTMLAnchorElement) {
                        if (e.getAttribute("data-skip-pjax") != null || e.getAttribute("data-remote") != null) return;
                        const n = (0, ye.W)(e);
                        n && Zc(t, {
                            container: n,
                            scrollTo: (0, ye.r)(e)
                        })
                    }
                }), (0, f.on)("change", "select[data-pjax]", function(t) {
                    if ((0, _t.c)("PJAX_DISABLED") || (0, _t.c)("TURBO")) return;
                    const e = t.currentTarget,
                        n = (0, ye.W)(e);
                    n && (0, he.ZP)({
                        url: e.value,
                        container: n
                    })
                });

                function Zc(t, e) {
                    if ((0, _t.c)("PJAX_DISABLED") || (0, _t.c)("TURBO")) return;
                    const n = t.currentTarget;
                    if (t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || location.protocol !== n.protocol || location.hostname !== n.hostname || n.href.indexOf("#") > -1 && ir(n) === ir(location) || t.defaultPrevented) return;
                    const o = {
                            url: n.href,
                            target: n,
                            ...e
                        },
                        s = new CustomEvent("pjax:click", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {
                                options: o,
                                relatedEvent: t
                            }
                        });
                    n.dispatchEvent(s) && ((0, he.ZP)(o), t.preventDefault(), n.dispatchEvent(new CustomEvent("pjax:clicked", {
                        bubbles: !0,
                        cancelable: !0,
                        detail: {
                            options: o
                        }
                    })))
                }
                r(Zc, "click");

                function ir(t) {
                    return t.href.replace(/#.*/, "")
                }
                r(ir, "stripHash"), (0, f.on)("submit", "form[data-pjax]", function(t) {
                    if ((0, _t.c)("PJAX_DISABLED") || (0, _t.c)("TURBO")) return;
                    const e = t.currentTarget,
                        n = (0, ye.W)(e);
                    if (!n) return;
                    const o = (0, ye.r)(e),
                        s = {
                            type: (e.method || "GET").toUpperCase(),
                            url: e.action,
                            target: e,
                            scrollTo: o,
                            container: n
                        };
                    if (s.type === "GET") {
                        if (e.querySelector("input[type=file]")) return;
                        const i = Jc(s.url);
                        i.search += (i.search ? "&" : "") + (0, Z.qC)(e), s.url = i.toString()
                    } else s.data = new FormData(e);
                    (0, he.ZP)(s), t.preventDefault()
                });

                function Jc(t) {
                    const e = document.createElement("a");
                    return e.href = t, e
                }
                r(Jc, "parseURL"), (0, v.N7)("body.js-print-popup", () => {
                    window.print(), setTimeout(window.close, 1e3)
                }), (0, v.N7)("poll-include-fragment[data-redirect-url]", function(t) {
                    const e = t.getAttribute("data-redirect-url");
                    t.addEventListener("load", function() {
                        window.location.href = e
                    })
                }), (0, v.N7)("poll-include-fragment[data-reload]", function(t) {
                    t.addEventListener("load", function() {
                        window.location.reload()
                    })
                });
                var Yc = u(43452),
                    Qc = u(26360);
                const tl = "$__",
                    ar = document.querySelector("meta[name=js-proxy-site-detection-payload]"),
                    cr = document.querySelector("meta[name=expected-hostname]");
                if (ar instanceof HTMLMetaElement && cr instanceof HTMLMetaElement && (0, Yc.Z)(document)) {
                    const t = {
                            url: window.location.href,
                            expectedHostname: cr.content,
                            documentHostname: document.location.hostname,
                            proxyPayload: ar.content
                        },
                        e = new Error,
                        n = {};
                    n[`${tl}`] = btoa(JSON.stringify(t)), (0, Qc.eK)(e, n)
                }(0, X.w4)("keydown", ".js-quick-submit", function(t) {
                    el(t)
                });

                function el(t) {
                    const e = t.target;
                    if ((t.ctrlKey || t.metaKey) && t.key === "Enter") {
                        const n = e.form,
                            o = n.querySelector("input[type=submit], button[type=submit]");
                        if (t.shiftKey) {
                            const s = n.querySelector(".js-quick-submit-alternative");
                            (s instanceof HTMLInputElement || s instanceof HTMLButtonElement) && !s.disabled && (0, Z.Bt)(n, s)
                        } else(o instanceof HTMLInputElement || o instanceof HTMLButtonElement) && o.disabled || (0, Z.Bt)(n);
                        t.preventDefault()
                    }
                }
                r(el, "quickSubmit");
                var lr = u(55498);
                let sn;
                (0, v.N7)(".js-comment-quote-reply", function(t) {
                    var e;
                    t.hidden = ((e = t.closest(".js-quote-selection-container")) == null ? void 0 : e.querySelector(".js-inline-comment-form-container textarea, .js-new-comment-form textarea")) == null
                });

                function ur(t) {
                    return t.nodeName === "DIV" && t.classList.contains("highlight")
                }
                r(ur, "isHighlightContainer");

                function nl(t) {
                    return t.nodeName === "IMG" || t.firstChild != null
                }
                r(nl, "hasContent");
                const dr = {
                    PRE(t) {
                        const e = t.parentElement;
                        if (e && ur(e)) {
                            const n = e.className.match(/highlight-source-(\S+)/),
                                o = n ? n[1] : "",
                                s = (t.textContent || "").replace(/\n+$/, "");
                            t.textContent = `\`\`\`${o}
${s}
\`\`\``, t.append(`

`)
                        }
                        return t
                    },
                    A(t) {
                        const e = t.textContent || "";
                        return t.classList.contains("user-mention") || t.classList.contains("team-mention") || t.classList.contains("issue-link") && /^#\d+$/.test(e) ? e : t
                    },
                    IMG(t) {
                        const e = t.getAttribute("alt");
                        return e && t.classList.contains("emoji") ? e : t
                    },
                    DIV(t) {
                        if (t.classList.contains("js-suggested-changes-blob")) t.remove();
                        else if (t.classList.contains("blob-wrapper-embedded")) {
                            const e = t.parentElement,
                                n = e.querySelector("a[href]"),
                                o = document.createElement("p");
                            o.textContent = n.href, e.replaceWith(o)
                        }
                        return t
                    }
                };

                function ol(t) {
                    const e = document.createNodeIterator(t, NodeFilter.SHOW_ELEMENT, {
                            acceptNode(s) {
                                return s.nodeName in dr && nl(s) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                            }
                        }),
                        n = [];
                    let o = e.nextNode();
                    for (; o;) o instanceof HTMLElement && n.push(o), o = e.nextNode();
                    n.reverse();
                    for (const s of n) s.replaceWith(dr[s.nodeName](s))
                }
                r(ol, "insertMarkdownSyntax"), (0, f.on)("click", ".js-comment-quote-reply", function({
                    isTrusted: t,
                    currentTarget: e
                }) {
                    const n = e.closest(".js-comment"),
                        o = n.querySelector(".js-comment-body"),
                        s = n.querySelector(".js-comment-body").cloneNode(!0),
                        i = n.closest(".js-quote-selection-container"),
                        a = o.querySelectorAll("button.js-convert-to-issue-button, span.js-clear");
                    for (const d of a) d.remove();
                    let c = new lr.p;
                    if (!t && c.range.collapsed || (i.hasAttribute("data-quote-markdown") && (c = new lr.I(i.getAttribute("data-quote-markdown") || "", d => {
                            const h = c.range.startContainer.parentElement,
                                j = h && h.closest("pre");
                            if (j instanceof HTMLElement) {
                                const T = j.parentElement;
                                if (T && ur(T)) {
                                    const k = document.createElement("div");
                                    k.className = T.className, k.appendChild(d), d.appendChild(k)
                                }
                            }
                            ol(d)
                        })), sn && o.contains(sn.anchorNode) ? c.range = sn.range : c.range.collapsed && c.select(o), c.closest(".js-quote-selection-container") !== i)) return;
                    const l = c.range;
                    i.dispatchEvent(new CustomEvent("quote-selection", {
                        bubbles: !0,
                        detail: c
                    })), c.range = l;
                    for (const d of i.querySelectorAll("textarea"))
                        if ((0, We.Z)(d)) {
                            c.insert(d);
                            break
                        }
                    n.querySelector(".js-comment-body").replaceWith(s)
                });
                let yo;
                document.addEventListener("selectionchange", (0, ee.D)(function() {
                    const t = window.getSelection();
                    let e;
                    try {
                        e = t.getRangeAt(0)
                    } catch {
                        yo = null;
                        return
                    }
                    yo = {
                        anchorNode: t.anchorNode,
                        range: e
                    }
                }, 100)), document.addEventListener("toggle", () => {
                    sn = yo
                }, {
                    capture: !0
                }), (0, K.AC)(".js-pick-reaction", async function(t, e) {
                    const n = await e.json(),
                        o = t.closest(".js-comment"),
                        s = o.querySelector(".js-reactions-container"),
                        i = o.querySelector(".js-comment-header-reaction-button"),
                        a = (0, Lt.r)(document, n.json.reactions_container.trim()),
                        c = (0, Lt.r)(document, n.json.comment_header_reaction_button.trim());
                    s.replaceWith(a), i.replaceWith(c)
                });

                function fr(t) {
                    const e = t.target,
                        n = e.getAttribute("data-reaction-label"),
                        s = e.closest(".js-add-reaction-popover").querySelector(".js-reaction-description");
                    s.hasAttribute("data-default-text") || s.setAttribute("data-default-text", s.textContent || ""), s.textContent = n
                }
                r(fr, "showReactionContent");

                function mr(t) {
                    const n = t.target.closest(".js-add-reaction-popover").querySelector(".js-reaction-description"),
                        o = n.getAttribute("data-default-text");
                    o && (n.textContent = o)
                }
                r(mr, "hideReactionContent"), (0, f.on)("toggle", ".js-reaction-popover-container", function(t) {
                    const e = t.currentTarget.hasAttribute("open");
                    for (const n of t.target.querySelectorAll(".js-reaction-option-item")) e ? (n.addEventListener("mouseenter", fr), n.addEventListener("mouseleave", mr)) : (n.removeEventListener("mouseenter", fr), n.removeEventListener("mouseleave", mr))
                }, {
                    capture: !0
                });
                var vo = u(90137),
                    hr = u(85830);

                function sl(t, e, n) {
                    t.getAttribute("data-type") === "json" && n.headers.set("Accept", "application/json"), (0, f.f)(t, "deprecatedAjaxSend", {
                        request: n
                    }), e.text().catch(s => {
                        if (s.response) return s.response;
                        throw s
                    }).then(s => {
                        s.status < 300 ? (0, f.f)(t, "deprecatedAjaxSuccess") : (0, f.f)(t, "deprecatedAjaxError", {
                            error: s.statusText,
                            status: s.status,
                            text: s.text
                        })
                    }, s => {
                        (0, f.f)(t, "deprecatedAjaxError", {
                            error: s.message,
                            status: 0,
                            text: null
                        })
                    }).then(() => {
                        (0, f.f)(t, "deprecatedAjaxComplete")
                    })
                }
                r(sl, "submitWithLegacyEvents"), (0, f.on)("click", ["form button:not([type])", "form button[type=submit]", "form input[type=submit]"].join(", "), function(t) {
                    const e = t.currentTarget;
                    e.form && !t.defaultPrevented && (0, vo.j)(e)
                }), (0, K.AC)("form[data-remote]", sl), (0, f.on)("deprecatedAjaxComplete", "form", function({
                    currentTarget: t
                }) {
                    const e = (0, vo.u)(t);
                    e && e.remove()
                }), (0, K.uT)(t => {
                    const e = (0, vo.u)(t);
                    e && e.remove()
                }), (0, K.rK)(hr.Z);
                var rl = Object.defineProperty,
                    il = Object.getOwnPropertyDescriptor,
                    ve = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? il(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && rl(e, n, s), s
                    }, "remote_pagination_element_decorateClass");
                let se = r(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.loaderWasFocused = !1
                    }
                    connectedCallback() {
                        this.setPaginationUrl(this.list)
                    }
                    get hasNextPage() {
                        return !this.form.hidden
                    }
                    loadNextPage() {
                        !this.hasNextPage || (0, Z.Bt)(this.form)
                    }
                    get disabled() {
                        return this.submitButton.hasAttribute("aria-disabled")
                    }
                    set disabled(t) {
                        t ? this.submitButton.setAttribute("aria-disabled", "true") : this.submitButton.removeAttribute("aria-disabled"), this.submitButton.classList.toggle("disabled", t)
                    }
                    loadstart(t) {
                        t.target.addEventListener("focus", () => {
                            this.loaderWasFocused = !0
                        }, {
                            once: !0
                        }), t.target.addEventListener("include-fragment-replaced", () => {
                            var e;
                            this.setPaginationUrl(this.list), this.loaderWasFocused && ((e = this.focusMarkers.pop()) == null || e.focus()), this.loaderWasFocused = !1
                        }, {
                            once: !0
                        })
                    }
                    async submit(t) {
                        var e;
                        if (t.preventDefault(), this.disabled) return;
                        this.disabled = !0;
                        let n;
                        try {
                            const s = await fetch(this.form.action);
                            if (!s.ok) return;
                            n = await s.text()
                        } catch {
                            return
                        }
                        const o = (0, Lt.r)(document, n);
                        this.setPaginationUrl(o), this.list.append(o), (e = this.focusMarkers.pop()) == null || e.focus(), this.disabled = !1, this.dispatchEvent(new CustomEvent("remote-pagination-load"))
                    }
                    setPaginationUrl(t) {
                        const e = t.querySelector("[data-pagination-src]");
                        if (!e) return;
                        const n = e.getAttribute("data-pagination-src");
                        n ? (this.form.action = n, this.form.hidden = !1) : this.form.hidden = !0
                    }
                }, "RemotePaginationElement");
                ve([I.fA], se.prototype, "form", 2), ve([I.fA], se.prototype, "list", 2), ve([I.GO], se.prototype, "focusMarkers", 2), ve([I.fA], se.prototype, "submitButton", 2), se = ve([I.Ih], se), (0, v.N7)(".has-removed-contents", function() {
                    let t;
                    return {
                        add(e) {
                            t = Array.from(e.childNodes);
                            for (const o of t) e.removeChild(o);
                            const n = e.closest("form");
                            n && (0, f.f)(n, "change")
                        },
                        remove(e) {
                            for (const o of t) e.appendChild(o);
                            const n = e.closest("form");
                            n && (0, f.f)(n, "change")
                        }
                    }
                });
                var mt = u(36162),
                    al = (t => (t.Auto = "auto", t.Light = "light", t.Dark = "dark", t))(al || {});

                function cl() {
                    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
                }
                r(cl, "getUserSystemColorMode");
                const wo = ".js-render-plaintext";

                function ll(t) {
                    const e = t.closest(".js-render-needs-enrichment");
                    if (!e) return;
                    e.querySelector(wo) && Eo(e, !1)
                }
                r(ll, "markdownEnrichmentSuccess");

                function ul(t, e) {
                    Eo(t, !1), pr(t, !0), t.classList.add("render-error");
                    const n = t.querySelector(wo);
                    if (!n) return;
                    n.classList.remove("render-plaintext-hidden");
                    const o = n.querySelector("pre");
                    (0, mt.sY)(mt.dy `${e} ${o}`, n)
                }
                r(ul, "showMarkdownRenderError");

                function Eo(t, e) {
                    const n = t.getElementsByClassName("js-render-enrichment-loader")[0],
                        o = t.getElementsByClassName("render-expand")[0];
                    n && (n.hidden = !e), o && (o.hidden = e)
                }
                r(Eo, "setCodeBlockLoaderVisibility");

                function pr(t, e) {
                    const n = t.querySelector(wo);
                    e ? n.classList.remove("render-plaintext-hidden") : n.classList.add("render-plaintext-hidden")
                }
                r(pr, "setRawCodeBlockVisibility");
                class gr {
                    constructor(e) {
                        this.el = e, this.enrichmentTarget = e.getElementsByClassName("js-render-enrichment-target")[0], this.iframeUrl = this.getIframeUrl(), this.identifier = this.el.getAttribute("data-identity"), this.iframeContentType = this.el.getAttribute("data-type"), this.iframeOrigin = new URL(this.iframeUrl, window.location.origin).origin, this.iframeContent = this.el.getAttribute("data-content"), Eo(this.el, !0)
                    }
                    enrich() {
                        const e = this.createDialog();
                        (0, mt.sY)(e, this.enrichmentTarget), this.setupModal()
                    }
                    getIframeUrl() {
                        const e = this.el.getAttribute("data-src"),
                            n = { ...this.colorMode()
                            },
                            o = Object.entries(n).map(([s, i]) => `${s}=${i}`).join("&");
                        return `${e}?${o}`
                    }
                    colorMode() {
                        var e;
                        let n = (e = document.querySelector("html")) == null ? void 0 : e.getAttribute("data-color-mode");
                        return (n === "auto" || !n) && (n = cl()), {
                            color_mode: n
                        }
                    }
                    setupModal() {
                        const e = this.generateIframeCode("-fullscreen"),
                            n = this.el.querySelector(".Box-body");
                        this.el.querySelector(".js-full-screen-render").addEventListener("click", () => {
                            (0, mt.sY)(e, n)
                        })
                    }
                    createDialog() {
                        const e = this.generateIframeCode();
                        return mt.dy ` <div class="d-flex flex-column flex-auto js-render-box">
      <details class="details-reset details-overlay details-overlay-dark">
        <summary class="btn-sm btn position-absolute js-full-screen-render render-expand" aria-haspopup="dialog" hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="octicon"
            style="display:inline-block;vertical-align:text-bottom"
          >
            <path
              fill-rule="evenodd"
              d="M3.72 3.72a.75.75 0 011.06 1.06L2.56 7h10.88l-2.22-2.22a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.22-2.22H2.56l2.22 2.22a.75.75 0 11-1.06 1.06l-3.5-3.5a.75.75 0 010-1.06l3.5-3.5z"
            ></path>
          </svg>
        </summary>
        <details-dialog class="Box Box--overlay render-full-screen d-flex flex-column anim-fade-in fast">
          <div>
            <button
              aria-label="Close dialog"
              data-close-dialog=""
              type="button"
              data-view-component="true"
              class="Link--muted btn-link position-absolute render-full-screen-close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="display:inline-block;vertical-align:text-bottom"
                class="octicon octicon-x"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </button>
            <div class="Box-body"></div>
          </div>
        </details-dialog>
      </details>
      ${e}
    </div>`
                    }
                    generateIframeCode(e = "") {
                        const n = this.identifier + e,
                            o = `${this.iframeUrl}#${n}`;
                        return mt.dy `
      <div
        class="render-container js-render-target p-0"
        data-identity="${n}"
        data-host="${this.iframeOrigin}"
        data-type="${this.iframeContentType}"
      >
        <iframe
          class="render-viewer"
          src="${o}"
          name="${n}"
          data-content="${this.iframeContent}"
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
        >
        </iframe>
      </div>
    `
                    }
                }
                r(gr, "EnrichableMarkdownRenderer"), (0, v.N7)(".js-render-needs-enrichment", function(t) {
                    const e = t;
                    new gr(e).enrich()
                }), (0, f.on)("preview:toggle:off", ".js-previewable-comment-form", function(t) {
                    const n = t.currentTarget.querySelector(".js-render-needs-enrichment"),
                        o = n == null ? void 0 : n.querySelector(".js-render-enrichment-target");
                    !o || (o.innerHTML = "")
                }), (0, f.on)("preview:rendered", ".js-previewable-comment-form", function(t) {
                    const n = t.currentTarget.querySelector(".js-render-needs-enrichment");
                    n && pr(n, !1)
                });
                const Cf = null,
                    rn = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"],
                    dl = ["is-render-ready", "is-render-loading", "is-render-loaded", "is-render-failed", "is-render-failed-fatally"],
                    re = new WeakMap;

                function br(t) {
                    const e = re.get(t);
                    e != null && (e.load = e.hello = null, e.helloTimer && (clearTimeout(e.helloTimer), e.helloTimer = null), e.loadTimer && (clearTimeout(e.loadTimer), e.loadTimer = null))
                }
                r(br, "resetTiming");

                function we(t, e = "") {
                    var n;
                    t.classList.remove(...rn), t.classList.add("is-render-failed");
                    const o = ml(e),
                        s = (n = t.parentElement) == null ? void 0 : n.closest(".js-render-needs-enrichment");
                    s ? ul(s, o) : fl(t, o), br(t)
                }
                r(we, "renderFailed");

                function fl(t, e) {
                    const n = t.querySelector(".render-viewer-error");
                    n && (n.remove(), t.classList.remove("render-container"), (0, mt.sY)(e, t))
                }
                r(fl, "fileRenderError");

                function ml(t) {
                    let e = mt.dy `<p>Unable to render code block</p>`;
                    if (t !== "") {
                        const n = t.split(`
`);
                        e = mt.dy `<p><b>Error rendering embedded code</b></p>
      <p>${n.map(o=>mt.dy`${o}<br />`)}</p>`
                    }
                    return mt.dy `<div class="flash flash-error">${e}</div>`
                }
                r(ml, "renderError");

                function yr(t, e = !1) {
                    var n;
                    !(0, We.Z)(t) || t.classList.contains("is-render-ready") || t.classList.contains("is-render-failed") || t.classList.contains("is-render-failed-fatally") || e && !((n = re.get(t)) == null ? void 0 : n.hello) || we(t)
                }
                r(yr, "timeoutWatchdog"), (0, v.N7)(".js-render-target", function(t) {
                    var e;
                    const n = t;
                    n.classList.remove(...dl), n.style.height = "auto", !((e = re.get(t)) == null ? void 0 : e.load) && (br(t), !re.get(t) && (re.set(t, {
                        load: Date.now(),
                        hello: null,
                        helloTimer: window.setTimeout(yr, 1e4, t, !0),
                        loadTimer: window.setTimeout(yr, 45e3, t)
                    }), t.classList.add("is-render-automatic", "is-render-requested")))
                });

                function an(t, e) {
                    t && t.postMessage && t.postMessage(JSON.stringify(e), "*")
                }
                r(an, "postAsJson");

                function hl(t) {
                    let e = t.data;
                    if (!e) return;
                    if (typeof e == "string") try {
                        e = JSON.parse(e)
                    } catch {
                        return
                    }
                    if (e.type !== "render" || typeof e.identity != "string") return;
                    const n = e.identity;
                    if (typeof e.body != "string") return;
                    const o = e.body;
                    let s = null;
                    for (const d of document.querySelectorAll(".js-render-target"))
                        if (d.getAttribute("data-identity") === n) {
                            s = d;
                            break
                        }
                    if (!s || t.origin !== s.getAttribute("data-host")) return;
                    const i = e.payload != null ? e.payload : void 0,
                        a = s.querySelector("iframe"),
                        c = a == null ? void 0 : a.contentWindow;

                    function l() {
                        const d = a == null ? void 0 : a.getAttribute("data-content");
                        if (!d) return;
                        const h = {
                            type: "render:cmd",
                            body: {
                                cmd: "code_rendering_service:data:ready",
                                "code_rendering_service:data:ready": {
                                    data: JSON.parse(d).data,
                                    width: s == null ? void 0 : s.getBoundingClientRect().width
                                }
                            }
                        };
                        an(c, h)
                    }
                    switch (r(l, "postData"), o) {
                        case "hello":
                            {
                                const d = re.get(s) || {
                                    untimed: !0
                                };d.hello = Date.now();
                                const h = {
                                        type: "render:cmd",
                                        body: {
                                            cmd: "ack",
                                            ack: !0
                                        }
                                    },
                                    j = {
                                        type: "render:cmd",
                                        body: {
                                            cmd: "branding",
                                            branding: !1
                                        }
                                    };
                                if (!c) return;an(c, h),
                                an(c, j)
                            }
                            break;
                        case "error":
                            i ? we(s, i.error) : we(s);
                            break;
                        case "error:fatal":
                            {
                                we(s),
                                s.classList.add("is-render-failed-fatal");
                                break
                            }
                        case "error:invalid":
                            we(s), s.classList.add("is-render-failed-invalid");
                            break;
                        case "loading":
                            s.classList.remove(...rn), s.classList.add("is-render-loading");
                            break;
                        case "loaded":
                            s.classList.remove(...rn), s.classList.add("is-render-loaded");
                            break;
                        case "ready":
                            ll(s), s.classList.remove(...rn), s.classList.add("is-render-ready"), i && typeof i.height == "number" && (s.style.height = `${i.height}px`);
                            break;
                        case "resize":
                            i && typeof i.height == "number" && (s.style.height = `${i.height}px`);
                            break;
                        case "code_rendering_service:container:get_size":
                            an(c, {
                                type: "render:cmd",
                                body: {
                                    cmd: "code_rendering_service:container:size",
                                    "code_rendering_service:container:size": {
                                        width: s == null ? void 0 : s.getBoundingClientRect().width
                                    }
                                }
                            });
                            break;
                        case "code_rendering_service:markdown:get_data":
                            if (!c) return;
                            l();
                            break;
                        default:
                            break
                    }
                }
                r(hl, "handleMessage"), window.addEventListener("message", hl), (0, K.AC)("form[data-replace-remote-form]", async function(t, e) {
                    t.classList.remove("is-error"), t.classList.add("is-loading");
                    try {
                        let n = t;
                        const o = await e.html(),
                            s = t.closest("[data-replace-remote-form-target]");
                        if (s) {
                            const i = s.getAttribute("data-replace-remote-form-target");
                            n = i ? document.getElementById(i) : s
                        }
                        n.replaceWith(o.html)
                    } catch {
                        t.classList.remove("is-loading"), t.classList.add("is-error")
                    }
                }), PerformanceObserver && (PerformanceObserver.supportedEntryTypes || []).includes("longtask") && new PerformanceObserver(function(e) {
                    const n = e.getEntries().map(({
                        name: o,
                        duration: s
                    }) => ({
                        name: o,
                        duration: s,
                        url: window.location.href
                    }));
                    (0, jt.b)({
                        longTasks: n
                    })
                }).observe({
                    entryTypes: ["longtask"]
                });
                const vr = new WeakMap;

                function pl(t) {
                    return t.closest("markdown-toolbar").field
                }
                r(pl, "getTextarea"), (0, f.on)("click", ".js-markdown-link-button", async function({
                    currentTarget: t
                }) {
                    const n = document.querySelector(".js-markdown-link-dialog").content.cloneNode(!0);
                    if (!(n instanceof DocumentFragment)) return;
                    const o = await (0, Rt.W)({
                        content: n,
                        labelledBy: "box-title"
                    });
                    t instanceof HTMLElement && vr.set(o, pl(t).selectionEnd)
                }), (0, f.on)("click", ".js-markdown-link-insert", ({
                    currentTarget: t
                }) => {
                    const e = t.closest("details-dialog"),
                        n = document.querySelector(`#${t.getAttribute("data-for-textarea")}`),
                        o = vr.get(e) || 0,
                        s = e.querySelector("#js-dialog-link-href").value,
                        a = `[${e.querySelector("#js-dialog-link-text").value}](${s}) `,
                        c = n.value.slice(0, o),
                        l = n.value.slice(o);
                    n.value = c + a + l, n.focus(), n.selectionStart = n.selectionEnd = o + a.length
                });
                var kf = u(23651);
                (0, f.on)("details-menu-select", ".js-saved-reply-menu", function(t) {
                    if (!(t.target instanceof Element)) return;
                    const e = t.detail.relatedTarget.querySelector(".js-saved-reply-body");
                    if (!e) return;
                    const n = (e.textContent || "").trim(),
                        s = t.target.closest(".js-previewable-comment-form").querySelector("textarea.js-comment-field");
                    (0, oe.Om)(s, n), setTimeout(() => s.focus(), 0)
                }, {
                    capture: !0
                }), (0, X.w4)("keydown", ".js-saved-reply-shortcut-comment-field", function(t) {
                    (0, lo.EL)(t) === "Control+." && (t.target.closest(".js-previewable-comment-form").querySelector(".js-saved-reply-container").setAttribute("open", ""), t.preventDefault())
                }), (0, X.w4)("keydown", ".js-saved-reply-filter-input", function(t) {
                    if (/^Control\+[1-9]$/.test((0, lo.EL)(t))) {
                        const n = t.target.closest(".js-saved-reply-container").querySelectorAll('[role="menuitem"]'),
                            o = Number(t.key),
                            s = n[o - 1];
                        s instanceof HTMLElement && (s.click(), t.preventDefault())
                    } else if (t.key === "Enter") {
                        const n = t.target.closest(".js-saved-reply-container").querySelectorAll('[role="menuitem"]');
                        n.length > 0 && n[0] instanceof HTMLButtonElement && n[0].click(), t.preventDefault()
                    }
                });

                function gl(t, e) {
                    return t.querySelector(`#LC${e}`)
                }
                r(gl, "scanning_queryLineElement");

                function bl(t, e) {
                    const n = es(t, o => gl(e, o));
                    if (n) {
                        const o = document.createElement("span"),
                            s = ["text-bold", "hx_keyword-hl", "rounded-2", "d-inline-block"];
                        o.classList.add(...s), is(n, o)
                    }
                }
                r(bl, "highlightColumns");

                function yl(t) {
                    const e = parseInt(t.getAttribute("data-start-line")),
                        n = parseInt(t.getAttribute("data-end-line")),
                        o = parseInt(t.getAttribute("data-start-column")),
                        s = parseInt(t.getAttribute("data-end-column"));
                    return e !== n || e === n && o === s ? null : {
                        start: {
                            line: e,
                            column: o
                        },
                        end: {
                            line: n,
                            column: s !== 0 ? s : null
                        }
                    }
                }
                r(yl, "parseColumnHighlightRange"), (0, v.N7)(".js-highlight-code-snippet-columns", function(t) {
                    const e = yl(t);
                    e !== null && bl(e, t)
                }), (0, f.on)("click", ".js-segmented-nav-button", function(t) {
                    t.preventDefault();
                    const e = t.currentTarget,
                        n = e.getAttribute("data-selected-tab"),
                        o = e.closest(".js-segmented-nav"),
                        s = o.parentElement;
                    for (const i of o.querySelectorAll(".js-segmented-nav-button")) i.classList.remove("selected");
                    e.classList.add("selected");
                    for (const i of s.querySelectorAll(".js-selected-nav-tab")) i.parentElement === s && i.classList.remove("active");
                    document.querySelector(`.${n}`).classList.add("active")
                });
                var ht = u(407);

                function gt(t) {
                    const e = t || window.location,
                        n = document.head && document.head.querySelector("meta[name=session-resume-id]");
                    return n instanceof HTMLMetaElement && n.content || e.pathname
                }
                r(gt, "getPageID");
                const vl = (0, ee.D)(function() {
                    (0, ht.e6)(gt())
                }, 50);

                function wl() {
                    var t, e;
                    return (e = (t = document.querySelector("html")) == null ? void 0 : t.hasAttribute("data-turbo-preview")) != null ? e : !1
                }
                r(wl, "isTurboRenderingCachePreview"), window.addEventListener("submit", ht.iO, {
                    capture: !0
                }), window.addEventListener("pageshow", function() {
                    (0, ht.e6)(gt())
                }), window.addEventListener("pjax:end", function() {
                    (0, ht.e6)(gt())
                }), (0, v.N7)(".js-session-resumable", function() {
                    wl() || vl()
                }), window.addEventListener("pagehide", function() {
                    (0, ht.Xm)(gt(), {
                        selector: ".js-session-resumable"
                    })
                }), window.addEventListener("pjax:beforeReplace", function(t) {
                    const e = t.detail.previousState,
                        n = e ? e.url : null;
                    if (n)(0, ht.Xm)(gt(new URL(n, window.location.origin)), {
                        selector: ".js-session-resumable"
                    });
                    else {
                        const o = new Error("pjax:beforeReplace event.detail.previousState.url is undefined");
                        setTimeout(function() {
                            throw o
                        })
                    }
                }), window.addEventListener("turbo:before-visit", function() {
                    (0, ht.Xm)(gt(), {
                        selector: ".js-session-resumable"
                    })
                }), window.addEventListener("turbo:load", function() {
                    (0, ht.e6)(gt())
                });
                var xf = u(74675),
                    cn = u(46836);
                const Lo = ["notification_referrer_id", "notifications_before", "notifications_after", "notifications_query"],
                    ln = "notification_shelf";

                function El(t, e = null) {
                    return t.has("notification_referrer_id") ? (Sl(t, e), jl(t)) : null
                }
                r(El, "storeAndStripShelfParams");

                function Ll(t = null) {
                    const e = wr(t);
                    if (!e) return (0, cn.cl)(ln), null;
                    try {
                        const n = (0, cn.rV)(ln);
                        if (!n) return null;
                        const o = JSON.parse(n);
                        if (!o || !o.pathname) throw new Error("Must have a pathname");
                        if (o.pathname !== e) throw new Error("Stored pathname does not match current pathname.");
                        const s = {};
                        for (const i of Lo) s[i] = o[i];
                        return s
                    } catch {
                        return (0, cn.cl)(ln), null
                    }
                }
                r(Ll, "getStoredShelfParamsForCurrentPage");

                function Sl(t, e) {
                    const n = wr(e);
                    if (!n) return;
                    const o = {
                        pathname: n
                    };
                    for (const s of Lo) {
                        const i = t.get(s);
                        i && (o[s] = i)
                    }(0, cn.LS)(ln, JSON.stringify(o))
                }
                r(Sl, "storeShelfParams");

                function jl(t) {
                    for (const e of Lo) t.delete(e);
                    return t
                }
                r(jl, "deleteShelfParams");

                function wr(t) {
                    t = t || window.location.pathname;
                    const e = /^(\/[^/]+\/[^/]+\/pull\/[^/]+)/,
                        n = t.match(e);
                    return n ? n[0] : null
                }
                r(wr, "getCurrentPullRequestPathname");
                var Tl = u(75509);
                async function Al() {
                    return (0, K.AC)(".js-notification-shelf .js-notification-action form", async function(t, e) {
                        if (t.hasAttribute("data-redirect-to-inbox-on-submit")) {
                            await Er(e);
                            const o = document.querySelector(".js-notifications-back-to-inbox");
                            o && o.click();
                            return
                        }(0, Tl.a)(t, t), await Er(e)
                    })
                }
                r(Al, "remoteShelfActionForm");

                function Cl() {
                    const t = new URLSearchParams(window.location.search),
                        e = El(t);
                    if (e) {
                        const n = new URL(window.location.href, window.location.origin);
                        return n.search = e.toString(), n.toString()
                    }
                }
                r(Cl, "urlWithoutNotificationParameters");

                function kl(t) {
                    if (!(t instanceof Bo.Z)) return;
                    const e = Ll();
                    if (!e) return;
                    const n = t.getAttribute("data-base-src");
                    if (!n) return;
                    const o = new URL(n, window.location.origin),
                        s = new URLSearchParams(o.search);
                    for (const [i, a] of Object.entries(e)) typeof a == "string" && s.set(i, a);
                    o.search = s.toString(), t.setAttribute("src", o.toString())
                }
                r(kl, "loadShelfFromStoredParams");
                async function Er(t) {
                    try {
                        await t.text()
                    } catch {}
                }
                r(Er, "performRequest"), Al();

                function xl() {
                    const t = Cl();
                    t && (0, te.lO)(null, "", t)
                }
                r(xl, "removeNotificationParams"), xl(), (0, v.N7)(".js-notification-shelf-include-fragment", kl), (0, f.on)("submit", ".js-mark-notification-form", async function(t) {
                    const e = t.currentTarget;
                    t.preventDefault();
                    try {
                        await fetch(e.action, {
                            method: e.method,
                            body: new FormData(e),
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })
                    } catch {}
                });
                async function Ml() {
                    await Mt.C;
                    const t = document.querySelector(".js-mark-notification-form");
                    t instanceof HTMLFormElement && (0, Z.Bt)(t)
                }
                r(Ml, "markNotificationAsRead"), Ml();

                function ql(t) {
                    return !!t.closest(".js-jump-to-field")
                }
                r(ql, "isJumpToAvailable");

                function So(t, e) {
                    if (ql(t)) return;
                    const n = document.querySelector(".js-site-search-form");
                    document.querySelector(".js-site-search").classList.toggle("scoped-search", e);
                    let o, s;
                    e ? (o = n.getAttribute("data-scoped-search-url"), s = t.getAttribute("data-scoped-placeholder")) : (o = n.getAttribute("data-unscoped-search-url"), s = t.getAttribute("data-unscoped-placeholder")), n.setAttribute("action", o), t.setAttribute("placeholder", s)
                }
                r(So, "toggleSearchScope"), (0, X.w4)("keyup", ".js-site-search-field", function(t) {
                    const e = t.target,
                        n = e.value.length === 0;
                    n && t.key === "Backspace" && e.classList.contains("is-clearable") && So(e, !1), n && t.key === "Escape" && So(e, !0), e.classList.toggle("is-clearable", n)
                }), (0, X.ZG)(".js-site-search-focus", function(t) {
                    const e = t.closest(".js-chromeless-input-container");
                    e.classList.add("focus");

                    function n() {
                        e.classList.remove("focus"), t.value.length === 0 && t.classList.contains("js-site-search-field") && So(t, !0), t.removeEventListener("blur", n)
                    }
                    r(n, "blurHandler"), t.addEventListener("blur", n)
                }), (0, f.on)("submit", ".js-site-search-form", function(t) {
                    if (!(t.target instanceof Element)) return;
                    const e = t.target.querySelector(".js-site-search-type-field");
                    e.value = new URLSearchParams(window.location.search).get("type") || ""
                });
                var Pl = u(54430);
                (0, v.N7)("textarea.js-size-to-fit", {
                    constructor: HTMLTextAreaElement,
                    subscribe: Pl.Z
                });
                var Mf = u(53488);
                const Il = 1e3,
                    Lr = new WeakMap,
                    Sr = document.querySelector("#snippet-clipboard-copy-button");
                async function Rl(t, e) {
                    const n = t.getAttribute("data-snippet-clipboard-copy-content");
                    if (n === null || (t.removeAttribute("data-snippet-clipboard-copy-content"), !(Sr instanceof HTMLTemplateElement))) return;
                    const s = Sr.content.cloneNode(!0).children[0];
                    if (!(s instanceof HTMLElement)) return;
                    const i = s.children[0];
                    if (!(i instanceof HTMLElement)) return;
                    i.setAttribute("value", n), document.addEventListener("selectionchange", () => {
                        const c = document.getSelection();
                        if (c && t.contains(c.anchorNode)) {
                            const l = c == null ? void 0 : c.toString();
                            i.style.display = l.trim() === "" ? "inherit" : "none"
                        }
                    }, {
                        signal: e
                    });
                    const a = t.querySelector("pre");
                    if (a !== null) {
                        let c;
                        a.addEventListener("scroll", () => {
                            c && clearTimeout(c), i.style.display = "none", c = setTimeout(() => {
                                i.style.display = "inherit"
                            }, Il)
                        }, {
                            signal: e
                        })
                    }
                    t.appendChild(s)
                }
                r(Rl, "insertSnippetClipboardCopyButton"), (0, v.N7)("[data-snippet-clipboard-copy-content]", {
                    constructor: HTMLElement,
                    add(t) {
                        const e = new AbortController;
                        Lr.set(t, e), Rl(t, e.signal)
                    }
                }), (0, v.N7)(".snippet-clipboard-content clipboard-copy", {
                    constructor: HTMLElement,
                    remove(t) {
                        const e = Lr.get(t);
                        e && e.abort()
                    }
                });

                function jr(t, e, n) {
                    Tr(t, e), n && t.classList.toggle("on");
                    const o = Array.from(t.querySelectorAll(".js-social-updatable"), qt.x0);
                    return Promise.all(o)
                }
                r(jr, "handleSocialResponse"), (0, K.AC)(".js-social-form", async function(t, e) {
                    var n, o;
                    let s;
                    const i = t.closest(".js-social-container"),
                        a = t.classList.contains("js-deferred-toggler-target");
                    try {
                        s = await e.json(), i && await jr(i, s.json.count, a)
                    } catch (c) {
                        if (((n = c.response) == null ? void 0 : n.status) === 409 && c.response.json.confirmationDialog) {
                            const l = c.response.json.confirmationDialog,
                                d = document.querySelector(l.templateSelector),
                                h = (o = t.querySelector(".js-confirm-csrf-token")) == null ? void 0 : o.value;
                            if (d instanceof HTMLTemplateElement && h) {
                                const j = new St.R(d, {
                                        confirmUrl: t.action,
                                        confirmCsrfToken: h,
                                        ...l.inputs || {}
                                    }),
                                    T = await (0, Rt.W)({
                                        content: j
                                    });
                                T.addEventListener("social-confirmation-form:success", async k => {
                                    k instanceof CustomEvent && i && await jr(i, k.detail.count, a)
                                }), T.addEventListener("social-confirmation-form:error", () => {
                                    (0, me.v)()
                                })
                            }
                        } else i && !a && i.classList.toggle("on"), (0, me.v)()
                    }
                }), (0, K.AC)(".js-social-confirmation-form", async function(t, e) {
                    try {
                        const n = await e.json();
                        (0, f.f)(t, "social-confirmation-form:success", n.json)
                    } catch {
                        (0, f.f)(t, "social-confirmation-form:error")
                    }
                });

                function Tr(t, e) {
                    for (const n of t.querySelectorAll(".js-social-count")) {
                        n.textContent = e;
                        const o = n.getAttribute("data-singular-suffix"),
                            s = n.getAttribute("data-plural-suffix"),
                            i = e === "1" ? o : s;
                        i && n.setAttribute("aria-label", `${e} ${i}`)
                    }
                }
                r(Tr, "updateSocialCounts");
                var zt = u(21461);
                class Ar extends zt.a2 {
                    constructor(e, n, o, s) {
                        super(e, () => this.getUrlFromRefreshUrl(), o, s);
                        this.refreshUrl = n
                    }
                    getUrlFromRefreshUrl() {
                        return Dl(this.refreshUrl)
                    }
                }
                r(Ar, "AliveSession");
                async function Dl(t) {
                    const e = await Nl(t);
                    return e && e.url && e.token ? _l(e.url, e.token) : null
                }
                r(Dl, "fetchRefreshUrl");
                async function Nl(t) {
                    const e = await fetch(t, {
                        headers: {
                            Accept: "application/json"
                        }
                    });
                    if (e.ok) return e.json();
                    if (e.status === 404) return null;
                    throw new Error("fetch error")
                }
                r(Nl, "fetchJSON");
                async function _l(t, e) {
                    const n = await fetch(t, {
                        method: "POST",
                        mode: "same-origin",
                        headers: {
                            "Scoped-CSRF-Token": e
                        }
                    });
                    if (n.ok) return n.text();
                    throw new Error("fetch error")
                }
                r(_l, "post");
                const un = [],
                    Hl = 3e4,
                    Ol = 0;
                let dn = document.hidden,
                    fn;

                function Bl(t) {
                    return t(dn), un.push(t), new N.w0(() => {
                        const e = un.indexOf(t);
                        e !== -1 && un.splice(e, 1)
                    })
                }
                r(Bl, "addIdleStateListener"), document.addEventListener("visibilitychange", () => {
                    const t = document.hidden;
                    fn !== void 0 && clearTimeout(fn), fn = setTimeout(() => {
                        if (t !== dn) {
                            dn = t, fn = void 0;
                            for (const n of un) n(dn)
                        }
                    }, t ? Hl : Ol)
                });
                var $l = u(60785);

                function Fl() {
                    return "SharedWorker" in window && (0, $l.Z)("localStorage").getItem("bypassSharedWorker") !== "true"
                }
                r(Fl, "isSharedWorkerSupported");

                function Ul() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket-src]")) == null ? void 0 : t.href) != null ? e : null
                }
                r(Ul, "workerSrc");

                function Wl() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : t.href) != null ? e : null
                }
                r(Wl, "socketUrl");

                function zl() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : t.getAttribute("data-refresh-url")) != null ? e : null
                }
                r(zl, "socketRefreshUrl");

                function Vl() {
                    var t, e;
                    return (e = (t = document.head.querySelector("link[rel=shared-web-socket]")) == null ? void 0 : t.getAttribute("data-session-id")) != null ? e : null
                }
                r(Vl, "sessionIdentifier");

                function Kl(t) {
                    return Cr(t).map(e => ({
                        subscriber: t,
                        topic: e
                    }))
                }
                r(Kl, "subscriptions");

                function Cr(t) {
                    return (t.getAttribute("data-channel") || "").trim().split(/\s+/).map(zt.Zf.parse).filter(Xl)
                }
                r(Cr, "channels");

                function Xl(t) {
                    return t != null
                }
                r(Xl, "isPresent");

                function kr(t, {
                    channel: e,
                    type: n,
                    data: o
                }) {
                    for (const s of t) s.dispatchEvent(new CustomEvent(`socket:${n}`, {
                        bubbles: !1,
                        cancelable: !1,
                        detail: {
                            name: e,
                            data: o
                        }
                    }))
                }
                r(kr, "notify");
                class xr {
                    constructor(e, n, o, s, i) {
                        this.subscriptions = new zt.vk, this.presenceMetadata = new zt.ah, this.notifyPresenceDebouncedByChannel = new Map, this.notify = i, this.worker = new SharedWorker(e, `github-socket-worker-v2-${s}`), this.worker.port.onmessage = ({
                            data: a
                        }) => this.receive(a), this.worker.port.postMessage({
                            connect: {
                                url: n,
                                refreshUrl: o
                            }
                        })
                    }
                    subscribe(e) {
                        const n = this.subscriptions.add(...e);
                        n.length && this.worker.port.postMessage({
                            subscribe: n
                        });
                        const o = new Set(n.map(i => i.name)),
                            s = e.reduce((i, a) => {
                                const c = a.topic.name;
                                return (0, zt.A)(c) && !o.has(c) && i.add(c), i
                            }, new Set);
                        s.size && this.worker.port.postMessage({
                            requestPresence: Array.from(s)
                        })
                    }
                    unsubscribeAll(...e) {
                        const n = this.subscriptions.drain(...e);
                        n.length && this.worker.port.postMessage({
                            unsubscribe: n
                        });
                        const o = this.presenceMetadata.removeSubscribers(e);
                        this.sendPresenceMetadataUpdate(o)
                    }
                    updatePresenceMetadata(e) {
                        const n = new Set;
                        for (const o of e) this.presenceMetadata.setMetadata(o), n.add(o.channelName);
                        this.sendPresenceMetadataUpdate(n)
                    }
                    sendPresenceMetadataUpdate(e) {
                        if (!e.size) return;
                        const n = [];
                        for (const o of e) n.push({
                            channelName: o,
                            metadata: this.presenceMetadata.getChannelMetadata(o)
                        });
                        this.worker.port.postMessage({
                            updatePresenceMetadata: n
                        })
                    }
                    online() {
                        this.worker.port.postMessage({
                            online: !0
                        })
                    }
                    offline() {
                        this.worker.port.postMessage({
                            online: !1
                        })
                    }
                    hangup() {
                        this.worker.port.postMessage({
                            hangup: !0
                        })
                    }
                    receive(e) {
                        const {
                            channel: n
                        } = e;
                        if (e.type === "presence") {
                            let o = this.notifyPresenceDebouncedByChannel.get(n);
                            o || (o = (0, ee.D)((s, i) => {
                                this.notify(s, i), this.notifyPresenceDebouncedByChannel.delete(n)
                            }, 100), this.notifyPresenceDebouncedByChannel.set(n, o)), o(this.subscriptions.subscribers(n), e);
                            return
                        }
                        this.notify(this.subscriptions.subscribers(n), e)
                    }
                }
                r(xr, "AliveSessionProxy");

                function Gl() {
                    const t = Ul();
                    if (!t) return;
                    const e = Wl();
                    if (!e) return;
                    const n = zl();
                    if (!n) return;
                    const o = Vl();
                    if (!o) return;
                    const i = r(() => {
                            if (Fl()) try {
                                return new xr(t, e, n, o, kr)
                            } catch {}
                            return new Ar(e, n, !1, kr)
                        }, "createSession")(),
                        a = (0, xt.g)(d => i.subscribe(d.flat())),
                        c = (0, xt.g)(d => i.unsubscribeAll(...d)),
                        l = (0, xt.g)(d => i.updatePresenceMetadata(d));
                    (0, v.N7)(".js-socket-channel[data-channel]", {
                        subscribe: d => {
                            const h = Kl(d),
                                j = h.map(k => k.topic.name).filter(k => (0, zt.A)(k));
                            let T = {
                                unsubscribe() {}
                            };
                            if (j.length) {
                                let k, O;
                                const B = r(() => {
                                    const G = [];
                                    k && G.push(k), O !== void 0 && G.push({
                                        [zt.ZE]: O ? 1 : 0
                                    });
                                    for (const tt of j) l({
                                        subscriber: d,
                                        channelName: tt,
                                        metadata: G
                                    })
                                }, "queueMetadataOrIdleChange");
                                T = (0, N.qC)((0, N.RB)(d, "socket:set-presence-metadata", G => {
                                    const {
                                        detail: tt
                                    } = G;
                                    k = tt, B()
                                }), Bl(G => {
                                    !(0, _t.c)("PRESENCE_IDLE") || (O = G, B())
                                }))
                            }
                            return a(h), T
                        },
                        remove: d => c(d)
                    }), window.addEventListener("online", () => i.online()), window.addEventListener("offline", () => i.offline()), window.addEventListener("pagehide", () => {
                        "hangup" in i && i.hangup()
                    })
                }
                r(Gl, "connect"), (async () => (await Mt.x, Gl()))();
                const Mr = new Map;

                function Zl(t, e) {
                    const n = [];
                    for (const o of t) {
                        const s = Mr.get(o.name);
                        s && s.arrived > e && n.push(s)
                    }
                    return n
                }
                r(Zl, "stale");

                function Jl(t, e) {
                    for (const n of t.querySelectorAll(".js-socket-channel[data-channel]"))
                        for (const o of Zl(Cr(n), e)) n.dispatchEvent(new CustomEvent("socket:message", {
                            bubbles: !1,
                            cancelable: !1,
                            detail: {
                                name: o.name,
                                data: o.data,
                                cached: !0
                            }
                        }))
                }
                r(Jl, "dispatch");

                function Yl(t) {
                    const {
                        name: e,
                        data: n,
                        cached: o
                    } = t.detail;
                    if (o) return;
                    const s = {
                        name: e,
                        data: { ...n
                        },
                        arrived: Date.now()
                    };
                    s.data.wait = 0, Mr.set(e, s)
                }
                r(Yl, "store"), document.addEventListener("socket:message", Yl, {
                    capture: !0
                }), document.addEventListener("pjax:popstate", function(t) {
                    const e = t.target,
                        n = t.detail.cachedAt;
                    n && setTimeout(() => Jl(e, n))
                }), (0, v.N7)("form.js-auto-replay-enforced-sso-request", {
                    constructor: HTMLFormElement,
                    initialize(t) {
                        (0, Z.Bt)(t)
                    }
                });
                var qf = u(59371);

                function qr(t, e, n) {
                    const o = t.getBoundingClientRect().height,
                        s = e.getBoundingClientRect(),
                        i = n.getBoundingClientRect();
                    let a = i.top;
                    a + s.height + 10 >= o && (a = Math.max(o - s.height - 10, 0));
                    let c = i.right;
                    n.closest(".js-build-status-to-the-left") != null && (c = Math.max(i.left - s.width - 10, 0)), e.style.top = `${a}px`, e.style.left = `${c}px`, e.style.right = "auto"
                }
                r(qr, "updateStatusPosition"), (0, f.on)("toggle", ".js-build-status .js-dropdown-details", function(t) {
                    const e = t.currentTarget,
                        n = e.querySelector(".js-status-dropdown-menu");
                    if (!n) return;

                    function o() {
                        e.hasAttribute("open") || i()
                    }
                    r(o, "closeOnToggle");

                    function s(a) {
                        n.contains(a.target) || i()
                    }
                    r(s, "closeOnScroll");

                    function i() {
                        e.removeAttribute("open"), n.classList.add("d-none"), e.appendChild(n), e.removeEventListener("toggle", o), window.removeEventListener("scroll", s)
                    }
                    r(i, "closeStatusPopover"), e.addEventListener("toggle", o), n.classList.contains("js-close-menu-on-scroll") && window.addEventListener("scroll", s, {
                        capture: !0
                    }), n.classList.remove("d-none"), n.querySelector(".js-details-container").classList.add("open"), n.classList.contains("js-append-menu-to-body") && (document.body.appendChild(n), qr(document.body, n, e))
                }, {
                    capture: !0
                });
                async function Pr(t) {
                    const e = t.querySelector(".js-dropdown-details"),
                        n = t.querySelector(".js-status-dropdown-menu") || t.closest(".js-status-dropdown-menu");
                    if (!(n instanceof HTMLElement)) return;
                    const o = n.querySelector(".js-status-loader");
                    if (!o) return;
                    const s = n.querySelector(".js-status-loading"),
                        i = n.querySelector(".js-status-error"),
                        a = o.getAttribute("data-contents-url");
                    s.classList.remove("d-none"), i.classList.add("d-none");
                    let c;
                    try {
                        await (0, hr.Z)(), c = await (0, at.a)(document, a)
                    } catch {
                        s.classList.add("d-none"), i.classList.remove("d-none")
                    }
                    c && (o.replaceWith(c), n.querySelector(".js-details-container").classList.add("open"), e && n.classList.contains("js-append-menu-to-body") && qr(document.body, n, e))
                }
                r(Pr, "loadStatus"), (0, f.on)("click", ".js-status-retry", ({
                    currentTarget: t
                }) => {
                    Pr(t)
                });

                function Ir(t) {
                    const e = t.currentTarget;
                    Pr(e)
                }
                r(Ir, "onMouseEnter"), (0, v.N7)(".js-build-status", {
                    add(t) {
                        t.addEventListener("mouseenter", Ir, {
                            once: !0
                        })
                    },
                    remove(t) {
                        t.removeEventListener("mouseenter", Ir)
                    }
                });
                var Pf = u(54235),
                    Ql = u(24519);
                (0, f.on)("click", "button[data-sudo-required], summary[data-sudo-required]", Rr), (0, v.N7)("form[data-sudo-required]", {
                    constructor: HTMLFormElement,
                    subscribe: t => (0, N.RB)(t, "submit", Rr)
                });
                async function Rr(t) {
                    const e = t.currentTarget;
                    if (!(e instanceof HTMLElement)) return;
                    t.stopPropagation(), t.preventDefault(), await (0, Ql.Z)() && (e.removeAttribute("data-sudo-required"), e instanceof HTMLFormElement ? (0, Z.Bt)(e) : e.click())
                }
                r(Rr, "checkSudo");
                var Ht = u(34821),
                    Ee = u(71900);
                const Dr = {
                    "actor:": "ul.js-user-suggestions",
                    "user:": "ul.js-user-suggestions",
                    "operation:": "ul.js-operation-suggestions",
                    "org:": "ul.js-org-suggestions",
                    "action:": "ul.js-action-suggestions",
                    "repo:": "ul.js-repo-suggestions",
                    "country:": "ul.js-country-suggestions"
                };
                (0, v.N7)("text-expander[data-audit-url]", {
                    subscribe: t => (0, N.qC)((0, N.RB)(t, "text-expander-change", eu), (0, N.RB)(t, "text-expander-value", tu))
                });

                function tu(t) {
                    const e = t.detail;
                    if (!Nr(e.key)) return;
                    const n = e.item.getAttribute("data-value");
                    e.value = `${e.key}${n}`
                }
                r(tu, "onvalue");

                function eu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (!Nr(e)) return;
                    const i = t.target.getAttribute("data-audit-url");
                    n(su(i, e, o))
                }
                r(eu, "onchange");

                function nu(t, e) {
                    const n = e.toLowerCase(),
                        o = r(s => {
                            const i = s.textContent.toLowerCase().trim(),
                                a = (0, Ht.EW)(i, n);
                            return a > 0 ? {
                                score: a,
                                text: i
                            } : null
                        }, "key");
                    return n ? (0, Ee.W)(t, o, Ht.qu) : t
                }
                r(nu, "search");
                const ou = (0, Tt.Z)(t => [...t.children], {
                    hash: t => t.className
                });
                async function su(t, e, n) {
                    const s = (await au(t)).querySelector(ru(e));
                    if (!s) return {
                        matched: !1
                    };
                    const i = nu(ou(s), n).slice(0, 5),
                        a = s.cloneNode(!1);
                    a.innerHTML = "";
                    for (const c of i) a.append(c);
                    return {
                        fragment: a,
                        matched: i.length > 0
                    }
                }
                r(su, "auditMenu");

                function Nr(t) {
                    return Object.getOwnPropertyNames(Dr).includes(t)
                }
                r(Nr, "isActivationKey");

                function ru(t) {
                    const e = Dr[t];
                    if (!e) throw new Error(`Unknown audit log expander key: ${t}`);
                    return e
                }
                r(ru, "audit_log_suggester_selector");
                async function iu(t) {
                    const e = await (0, at.a)(document, t),
                        n = document.createElement("div");
                    return n.append(e), n
                }
                r(iu, "fetchMenu");
                const au = (0, Tt.Z)(iu);

                function cu(t) {
                    if (t.hasAttribute("data-use-colon-emoji")) return t.getAttribute("data-value");
                    const e = t.firstElementChild;
                    return e && e.tagName === "G-EMOJI" && !e.firstElementChild ? e.textContent : t.getAttribute("data-value")
                }
                r(cu, "getValue");

                function lu(t, e) {
                    const n = ` ${e.toLowerCase().replace(/_/g," ")}`,
                        o = r(s => {
                            const i = s.getAttribute("data-emoji-name"),
                                a = du(uu(s), n);
                            return a > 0 ? {
                                score: a,
                                text: i
                            } : null
                        }, "key");
                    return (0, Ee.W)(t, o, Ht.qu)
                }
                r(lu, "emoji_suggester_search");

                function uu(t) {
                    return ` ${t.getAttribute("data-text").trim().toLowerCase().replace(/_/g," ")}`
                }
                r(uu, "emojiText");

                function du(t, e) {
                    const n = t.indexOf(e);
                    return n > -1 ? 1e3 - n : 0
                }
                r(du, "emojiScore"), (0, v.N7)("text-expander[data-emoji-url]", {
                    subscribe: t => (0, N.qC)((0, N.RB)(t, "text-expander-change", mu), (0, N.RB)(t, "text-expander-value", fu))
                });

                function fu(t) {
                    const e = t.detail;
                    e.key === ":" && (e.value = cu(e.item))
                }
                r(fu, "emoji_suggester_onvalue");

                function mu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== ":") return;
                    const i = t.target.getAttribute("data-emoji-url");
                    n(hu(i, o))
                }
                r(mu, "emoji_suggester_onchange");
                async function hu(t, e) {
                    const [n, o] = await gu(t), s = lu(o, e).slice(0, 5);
                    n.innerHTML = "";
                    for (const i of s) n.append(i);
                    return {
                        fragment: n,
                        matched: s.length > 0
                    }
                }
                r(hu, "emojiMenu");
                async function pu(t) {
                    const n = (await (0, at.a)(document, t)).firstElementChild;
                    return [n, [...n.children]]
                }
                r(pu, "fetchEmoji");
                const gu = (0, Tt.Z)(pu);
                var Vt = u(38772);

                function bu(t) {
                    return `${t.number} ${t.title.trim().toLowerCase()}`
                }
                r(bu, "asText");

                function yu(t, e) {
                    if (!e) return t;
                    const n = new RegExp(`\\b${vu(e)}`),
                        o = /^\d+$/.test(e) ? i => wu(i, n) : i => (0, Ht.EW)(i, e),
                        s = r(i => {
                            const a = bu(i),
                                c = o(a);
                            return c > 0 ? {
                                score: c,
                                text: a
                            } : null
                        }, "key");
                    return (0, Ee.W)(t, s, Ht.qu)
                }
                r(yu, "issue_suggester_search");

                function vu(t) {
                    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }
                r(vu, "escapeRegExp");

                function wu(t, e) {
                    const n = t.search(e);
                    return n > -1 ? 1e3 - n : 0
                }
                r(wu, "issueNumberScore");

                function Eu(t, e, n) {
                    const o = r(i => Vt.dy `
    <ul role="listbox" class="suggester-container suggester suggestions list-style-none position-absolute">
      ${i.map(s)}
    </ul>
  `, "itemsTemplate"),
                        s = r(i => {
                            const a = i.type in n ? (0, Lt.r)(document, n[i.type]) : "";
                            return Vt.dy `
      <li class="markdown-title" role="option" id="suggester-issue-${i.id}" data-value="${i.number}">
        <span class="d-inline-block mr-1">${a}</span>
        <small>#${i.number}</small> ${(0,Vt.Au)(i.title)}
      </li>
    `
                        }, "itemTemplate");
                    (0, Vt.sY)(o(t), e)
                }
                r(Eu, "renderResults"), (0, v.N7)("text-expander[data-issue-url]", {
                    subscribe: t => {
                        const e = [(0, N.RB)(t, "text-expander-change", Su), (0, N.RB)(t, "text-expander-value", Lu), (0, N.RB)(t, "keydown", Tu), (0, N.RB)(t, "click", ju)];
                        return (0, N.qC)(...e)
                    }
                });

                function Lu(t) {
                    const e = t.detail;
                    if (e.key !== "#") return;
                    const n = e.item.getAttribute("data-value");
                    e.value = `#${n}`
                }
                r(Lu, "issue_suggester_onvalue");

                function Su(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== "#") return;
                    if (o === "#") {
                        jo(t.target);
                        return
                    }
                    const i = t.target.getAttribute("data-issue-url");
                    n(Au(i, o))
                }
                r(Su, "issue_suggester_onchange");

                function jo(t) {
                    if (!t) return;
                    const e = t.closest("text-expander");
                    e && e.dismiss()
                }
                r(jo, "hideSuggestions");

                function ju(t) {
                    jo(t.target)
                }
                r(ju, "issue_suggester_onclick");

                function Tu(t) {
                    const e = ["ArrowRight", "ArrowLeft"],
                        {
                            key: n
                        } = t;
                    e.indexOf(n) < 0 || jo(t.target)
                }
                r(Tu, "issue_suggester_onkeydown");
                async function Au(t, e) {
                    const n = await Cu(t),
                        o = document.createElement("div"),
                        s = yu(n.suggestions, e).slice(0, 5);
                    return Eu(s, o, n.icons), {
                        fragment: o.firstElementChild,
                        matched: s.length > 0
                    }
                }
                r(Au, "issueMenu");
                const Cu = (0, Tt.Z)(async function(t) {
                    const e = await self.fetch(t, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            Accept: "application/json"
                        }
                    });
                    if (!e.ok) {
                        const n = new Error,
                            o = e.statusText ? ` ${e.statusText}` : "";
                        throw n.message = `HTTP ${e.status}${o}`, n
                    }
                    return e.json()
                });

                function ku(t) {
                    return t.description ? `${t.name} ${t.description}`.trim().toLowerCase() : `${t.login} ${t.name}`.trim().toLowerCase()
                }
                r(ku, "mention_suggester_asText");

                function xu(t, e) {
                    if (!e) return t;
                    const n = qu(e),
                        o = r(s => {
                            const i = ku(s),
                                a = n(i, s.participant);
                            return a > 0 ? {
                                score: a,
                                text: i
                            } : null
                        }, "key");
                    return (0, Ee.W)(t, o, Ht.qu)
                }
                r(xu, "mention_suggester_search");

                function Mu(t, e) {
                    const n = r(s => Vt.dy `
    <ul role="listbox" class="suggester-container suggester suggestions list-style-none position-absolute">
      ${s.map(o)}
    </ul>
  `, "itemsTemplate"),
                        o = r(s => {
                            const i = s.type === "user" ? s.login : s.name,
                                a = s.type === "user" ? s.name : s.description;
                            return Vt.dy `
      <li role="option" id="suggester-${s.id}-${s.type}-${i}" data-value="${i}">
        <span>${i}</span>
        <small>${a}</small>
      </li>
    `
                        }, "itemTemplate");
                    (0, Vt.sY)(n(t), e)
                }
                r(Mu, "mention_suggester_renderResults");

                function qu(t) {
                    if (!t) return () => 2;
                    const e = t.toLowerCase().split("");
                    return (n, o) => {
                        if (!n) return 0;
                        const s = Pu(n, e);
                        if (!s) return 0;
                        const a = t.length / s[1] / (s[0] / 2 + 1);
                        return o ? a + 1 : a
                    }
                }
                r(qu, "fuzzyScorer");

                function Pu(t, e) {
                    let n, o, s, i;
                    const a = Iu(t, e[0]);
                    if (a.length === 0) return null;
                    if (e.length === 1) return [a[0], 1, []];
                    for (i = null, o = 0, s = a.length; o < s; o++) {
                        const c = a[o];
                        if (!(n = Ru(t, e, c + 1))) continue;
                        const l = n[n.length - 1] - c;
                        (!i || l < i[1]) && (i = [c, l, n])
                    }
                    return i
                }
                r(Pu, "shortestMatch");

                function Iu(t, e) {
                    let n = 0;
                    const o = [];
                    for (;
                        (n = t.indexOf(e, n)) > -1;) o.push(n++);
                    return o
                }
                r(Iu, "allIndexesOf");

                function Ru(t, e, n) {
                    let o = n;
                    const s = [];
                    for (let i = 1; i < e.length; i += 1) {
                        if (o = t.indexOf(e[i], o), o === -1) return;
                        s.push(o++)
                    }
                    return s
                }
                r(Ru, "indexesOfChars"), (0, v.N7)("text-expander[data-mention-url]", {
                    subscribe: t => (0, N.qC)((0, N.RB)(t, "text-expander-change", Nu), (0, N.RB)(t, "text-expander-value", Du))
                });

                function Du(t) {
                    const e = t.detail;
                    if (e.key !== "@") return;
                    const n = e.item.getAttribute("data-value");
                    e.value = `@${n}`
                }
                r(Du, "mention_suggester_onvalue");

                function Nu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== "@" || (o == null ? void 0 : o.split(" ").length) > 1) return;
                    const i = t.target.getAttribute("data-mention-url");
                    n(_u(i, o))
                }
                r(Nu, "mention_suggester_onchange");
                async function _u(t, e) {
                    const n = await Hu(t),
                        o = document.createElement("div"),
                        s = xu(n, e).slice(0, 5);
                    return Mu(s, o), {
                        fragment: o.firstElementChild,
                        matched: s.length > 0
                    }
                }
                r(_u, "mentionMenu");
                const Hu = (0, Tt.Z)(async function(t) {
                        const e = await self.fetch(t, {
                            headers: {
                                "X-Requested-With": "XMLHttpRequest",
                                Accept: "application/json"
                            }
                        });
                        if (!e.ok) {
                            const n = new Error,
                                o = e.statusText ? ` ${e.statusText}` : "";
                            throw n.message = `HTTP ${e.status}${o}`, n
                        }
                        return e.json()
                    }),
                    To = "/";

                function Ou(t, e) {
                    const n = e.toLowerCase().trim(),
                        o = r(s => {
                            const i = (s.getAttribute("data-text") || "").trim().toLowerCase(),
                                a = (0, Ht.EW)(i, n);
                            return a > 0 ? {
                                score: a,
                                text: i
                            } : null
                        }, "key");
                    return n ? (0, Ee.W)(t, o, Ht.qu) : t
                }
                r(Ou, "slash_command_suggester_search"), (0, v.N7)("slash-command-expander[data-slash-command-url]", {
                    subscribe: t => (0, N.qC)((0, N.RB)(t, "text-expander-change", Xu), (0, N.RB)(t, "text-expander-value", Bu))
                }), (0, f.on)("click", ".js-slash-command-toolbar-button", async t => {
                    if (!(t.target instanceof Element)) return;
                    const e = t.target.closest(".js-previewable-comment-form");
                    if (!e) return;
                    const n = e.querySelector("textarea.js-comment-field");
                    if (!n) return;
                    const o = To,
                        s = n.selectionEnd || 0,
                        i = n.value.substring(0, s),
                        a = n.value.substring(s),
                        c = n.value === "" || i.match(/\s$/) ? "" : " ",
                        l = s + o.length + 1;
                    n.value = i + c + o + a, n.selectionStart = l, n.selectionEnd = l, n.focus(), (0, f.f)(n, "input")
                });
                async function Bu(t) {
                    const e = t.detail,
                        {
                            key: n,
                            item: o
                        } = e;
                    if (n !== To) return;
                    const s = o.getAttribute("data-url");
                    if (!s) return;
                    const i = t.currentTarget,
                        a = o.querySelector(".js-slash-command-suggestion-form");
                    if (!a) return;
                    const c = a.querySelector(".js-data-url-csrf");
                    if (!c) return;
                    const l = new FormData(a);
                    i.isLoading();
                    try {
                        const d = await (0, at.a)(document, s, {
                            method: "PATCH",
                            body: l,
                            headers: {
                                Accept: "text/html",
                                "Scoped-CSRF-Token": c.value
                            }
                        });
                        if (!d) return;
                        _r(i, d)
                    } catch {
                        i.showError()
                    }
                }
                r(Bu, "onValue");

                function _r(t, e) {
                    var n;
                    const o = e.firstElementChild;
                    if (!o) return;
                    e.children.length > 1 && Ku(e.lastElementChild, t), o.hasAttribute("data-reload-suggestions") && (Br = (0, Tt.Z)(Or));
                    const s = o.getAttribute("data-component-type");
                    s === "fill" ? /<\/?[a-z][\s\S]*>/i.test(o.innerHTML) ? t.setValue(o.innerHTML.trim()) : t.setValue(((n = o.textContent) == null ? void 0 : n.trim()) || "") : s === "menu" || s === "error" ? t.setMenu(o.querySelector(".js-slash-command-menu")) : s === "action" ? t.closeMenu() : s === "embedded_form" ? zu(t, o) : s === "dialog_form" ? Uu(t, o) : s === "modal_form" && Wu(t, o), (0, ht.e6)(gt())
                }
                r(_r, "handleResponse");

                function $u(t) {
                    if (!(t.metaKey && t.key === "Enter")) return;
                    t.preventDefault(), t.stopPropagation();
                    const e = t.target,
                        n = e == null ? void 0 : e.form;
                    if (!!n)
                        if (n.requestSubmit) n.requestSubmit();
                        else {
                            const o = n.querySelector("[type='submit']");
                            o == null || o.click()
                        }
                }
                r($u, "submitOnCommandEnter");

                function Hr(t) {
                    const e = new FormData(t);
                    let n = "";
                    for (const o of e) n = n + o[0], n = n + o[1].toString();
                    return n
                }
                r(Hr, "getFormContents");

                function Ao(t) {
                    let e = !1;
                    for (const n of t.querySelectorAll("select,input,textarea")) {
                        const o = n;
                        o.type !== "hidden" && (e || (o.focus(), e = !0), o.addEventListener("keydown", $u))
                    }
                }
                r(Ao, "focusFirstFormInput");

                function Co(t, e) {
                    const n = t.querySelectorAll("[data-close-dialog]");
                    for (const o of n) o.addEventListener("click", s => {
                        s.preventDefault(), (0, ht.Xm)(gt(), {
                            selector: ".js-session-resumable"
                        }), e()
                    })
                }
                r(Co, "hookUpCancelActionListeners");

                function ko(t, e, n, o) {
                    const s = Hr(t);
                    e.addEventListener("keydown", i => {
                        if (i.key === "Escape") {
                            const a = "Are you sure you want to dismiss the form?",
                                c = Hr(t);
                            (s === c || confirm(a)) && ((0, ht.Xm)(gt(), {
                                selector: ".js-session-resumable"
                            }), o(), n && n.focus())
                        }
                    })
                }
                r(ko, "addDismissAlertListener");

                function xo(t, e, n) {
                    t.addEventListener("submit", async o => {
                        o.preventDefault();
                        const s = o.target,
                            i = s.querySelector(".js-data-url-csrf");
                        if (!i) return;
                        const a = s.getAttribute("action");
                        if (!a) return;
                        Fu(e);
                        const c = new FormData(s),
                            l = await (0, at.a)(document, a, {
                                method: "PATCH",
                                body: c,
                                headers: {
                                    Accept: "text/html",
                                    "Scoped-CSRF-Token": i.value
                                }
                            });
                        n(), !!l && _r(e, l)
                    })
                }
                r(xo, "addSubmitButtonListener");

                function Fu(t) {
                    const e = t.closest(".js-slash-command-surface"),
                        n = t.closest("form"),
                        o = e || n;
                    if (o)
                        for (const s of o.querySelectorAll("[data-disable-with][disabled]")) s.disabled = !1
                }
                r(Fu, "reenableParentFormButtons");

                function Uu(t, e) {
                    const n = e.querySelector(".js-slash-command-menu");
                    t.setMenu(n, !0);
                    const o = n.querySelector("form"),
                        s = document.activeElement;
                    Ao(o);
                    const i = r(() => {
                        t.closeMenu()
                    }, "closeForm");
                    ko(o, o, s, i), Co(o, i), xo(o, t, i)
                }
                r(Uu, "handleDialogForm");

                function Wu(t, e) {
                    const n = t.closest("form");
                    if (!n) return;
                    const o = e.querySelector('[data-component="form"]');
                    n.insertAdjacentElement("afterend", o);
                    const s = document.activeElement;
                    Ao(o);
                    const i = r(() => {
                        n.hidden = !1, o.remove()
                    }, "closeForm");
                    Co(o, i);
                    const a = o.getElementsByTagName("form")[0];
                    ko(a, o, s, i), xo(o, t, i)
                }
                r(Wu, "handleModalForm");

                function zu(t, e) {
                    const n = t.closest(".js-slash-command-surface"),
                        o = t.closest("form"),
                        s = n || o;
                    if (!s) return;
                    s.hidden = !0;
                    const i = e.querySelector('[data-component="form"]');
                    s.insertAdjacentElement("afterend", i);
                    const a = document.activeElement;
                    Ao(i);
                    const c = r(() => {
                        s.hidden = !1, i.remove()
                    }, "closeForm");
                    Co(i, c);
                    const l = i.getElementsByTagName("form")[0];
                    ko(l, i, a, c), xo(i, t, c)
                }
                r(zu, "handleEmbeddedForm");
                const Vu = 5e3;

                function Ku(t, e) {
                    var n, o;
                    const s = (n = e.parentElement) == null ? void 0 : n.parentElement;
                    if (!s) return;
                    const i = s.querySelector(".drag-and-drop .default");
                    let a = !1;
                    i && (a = i.hidden, i.hidden = !0), (o = i == null ? void 0 : i.parentElement) == null || o.prepend(t), setTimeout(() => {
                        i && (i.hidden = a), t.remove()
                    }, Vu)
                }
                r(Ku, "showFooter");

                function Xu(t) {
                    const {
                        key: e,
                        provide: n,
                        text: o
                    } = t.detail;
                    if (e !== To) return;
                    const s = t.target;
                    s.isLoading();
                    const i = s.getAttribute("data-slash-command-url");
                    n(Gu(i, o, s))
                }
                r(Xu, "onChange");
                async function Gu(t, e, n) {
                    try {
                        const [o, s] = await Br(t), i = o.querySelector(".js-slash-command-menu-items"), a = Ou(s, e);
                        if (i) {
                            i.innerHTML = "";
                            for (const c of s)
                                if (c.classList.contains("js-group-divider")) {
                                    const l = c.getAttribute("data-group-id");
                                    a.filter(h => h.getAttribute("data-group-id") === l).length > 0 && i.append(c)
                                } else a.includes(c) && i.append(c)
                        }
                        return {
                            fragment: o,
                            matched: a.length > 0
                        }
                    } catch (o) {
                        throw n.showError(), new Error(o)
                    }
                }
                r(Gu, "slashCommandMenu");
                async function Or(t) {
                    const n = (await (0, at.a)(document, t)).firstElementChild,
                        o = n.querySelectorAll(".js-slash-command-menu-items li");
                    return [n, [...o]]
                }
                r(Or, "fetchSlashCommands");
                let Br = (0, Tt.Z)(Or);

                function Zu(t, e) {
                    const n = t.closest(".js-survey-question-form"),
                        o = n.querySelector("input.js-survey-other-text"),
                        s = e && !n.classList.contains("is-other-selected");
                    n.classList.toggle("is-other-selected", s), o.hidden = !e, s ? (o.required = !0, o.focus()) : o.required = !1, (0, f.f)(o, "change")
                }
                r(Zu, "handleOther"), (0, f.on)("change", "input.js-survey-radio", function({
                    currentTarget: t
                }) {
                    Zu(t, t.classList.contains("js-survey-radio-other"))
                }), (0, f.on)("change", "input.js-survey-checkbox-enable-submit", function({
                    currentTarget: t
                }) {
                    var e;
                    const n = t.checked,
                        o = (e = t.closest("form")) == null ? void 0 : e.querySelector("button[type=submit]");
                    o.disabled = !n
                }), (0, f.on)("change", "input.js-survey-contact-checkbox", function(t) {
                    const e = t.currentTarget,
                        o = e.closest(".js-survey-question-form").querySelector(".js-survey-contact-checkbox-hidden");
                    e.checked ? o.setAttribute("disabled", "true") : o.removeAttribute("disabled")
                }), (0, f.on)("details-menu-selected", ".js-sync-select-menu-text", function(t) {
                    const e = document.querySelector(".js-sync-select-menu-button"),
                        n = t.detail.relatedTarget.querySelector("span[data-menu-button-text]").textContent;
                    e.textContent = n, e.focus()
                }, {
                    capture: !0
                }), (0, f.on)("click", 'tab-container [role="tab"]', function(t) {
                    const {
                        currentTarget: e
                    } = t, o = e.closest("tab-container").querySelector(".js-filterable-field, [data-filter-placeholder-input]");
                    if (o instanceof HTMLInputElement) {
                        const s = e.getAttribute("data-filter-placeholder");
                        s && o.setAttribute("placeholder", s), o.focus()
                    }
                }), (0, f.on)("tab-container-changed", "tab-container", function(t) {
                    const e = t.detail.relatedTarget,
                        n = e.getAttribute("data-fragment-url"),
                        o = e.querySelector("include-fragment");
                    n && o && !o.hasAttribute("src") && (o.src = n)
                });
                var If = u(64048),
                    $r = u(96776);
                document.addEventListener("keydown", t => {
                    if (t.key !== "Escape" || t.target !== document.body) return;
                    const e = document.querySelector(".js-targetable-element:target");
                    !e || (0, $r.uQ)(e, () => {
                        window.location.hash = "", window.history.replaceState(null, "", window.location.pathname + window.location.search)
                    })
                }), document.addEventListener("click", t => {
                    const e = document.querySelector(".js-targetable-element:target");
                    !e || t.target instanceof HTMLAnchorElement || t.target instanceof HTMLElement && (e.contains(t.target) || (0, $r.uQ)(e, () => {
                        window.location.hash = "", window.history.replaceState(null, "", window.location.pathname + window.location.search)
                    }))
                });
                var Rf = u(36099);
                async function Ju(t) {
                    const e = t.currentTarget;
                    if (Qu(e)) {
                        e.classList.remove("tooltipped");
                        return
                    }
                    const n = e.getAttribute("data-url");
                    if (!n) return;
                    const o = await fetch(n, {
                        headers: {
                            Accept: "application/json"
                        }
                    });
                    if (!o.ok) return;
                    const s = await o.json(),
                        i = e.getAttribute("data-id"),
                        a = document.querySelectorAll(`.js-team-mention[data-id='${i}']`);
                    for (const c of a) c.removeAttribute("data-url");
                    try {
                        s.total === 0 ? s.members.push("This team has no members") : s.total > s.members.length && s.members.push(`${s.total-s.members.length} more`), Fr(a, Yu(s.members))
                    } catch (c) {
                        const l = c.response ? c.response.status : 500,
                            d = e.getAttribute(l === 404 ? "data-permission-text" : "data-error-text");
                        Fr(a, d)
                    }
                }
                r(Ju, "members");

                function Fr(t, e) {
                    for (const n of t) n instanceof HTMLElement && (n.setAttribute("aria-label", e), n.classList.add("tooltipped", "tooltipped-s", "tooltipped-multiline"))
                }
                r(Fr, "tip");

                function Yu(t) {
                    if ("ListFormat" in Intl) return new Intl.ListFormat().format(t);
                    if (t.length === 0) return "";
                    if (t.length === 1) return t[0];
                    if (t.length === 2) return t.join(" and "); {
                        const e = t[t.length - 1];
                        return t.slice(0, -1).concat(`and ${e}`).join(", ")
                    }
                }
                r(Yu, "sentence");

                function Qu(t) {
                    return !!t.getAttribute("data-hovercard-url") && !!t.closest("[data-team-hovercards-enabled]")
                }
                r(Qu, "teamHovercardEnabled"), (0, v.N7)(".js-team-mention", function(t) {
                    t.addEventListener("mouseenter", Ju)
                });
                var td = Object.defineProperty,
                    ed = Object.getOwnPropertyDescriptor,
                    mn = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? ed(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && td(e, n, s), s
                    }, "text_suggester_element_decorateClass");
                let Le = r(class extends HTMLElement {
                    acceptSuggestion() {
                        var t;
                        ((t = this.suggestion) == null ? void 0 : t.textContent) && (this.input.value = this.suggestion.textContent, this.input.dispatchEvent(new Event("input")), this.suggestionContainer && (this.suggestionContainer.hidden = !0), this.input.focus())
                    }
                }, "TextSuggesterElement");
                mn([I.fA], Le.prototype, "input", 2), mn([I.fA], Le.prototype, "suggestionContainer", 2), mn([I.fA], Le.prototype, "suggestion", 2), Le = mn([I.Ih], Le);

                function nd() {
                    const t = document.querySelector(".js-timeline-marker");
                    return t != null ? t.getAttribute("data-last-modified") : null
                }
                r(nd, "getTimelineLastModified");

                function Ur(t) {
                    if (sd(t) || od(t)) return;
                    const e = nd();
                    e && t.headers.set("X-Timeline-Last-Modified", e)
                }
                r(Ur, "addTimelineLastModifiedHeader");

                function od(t) {
                    return t.headers.get("X-PJAX") === "true"
                }
                r(od, "isPjax");

                function sd(t) {
                    let e;
                    try {
                        e = new URL(t.url)
                    } catch {
                        return !0
                    }
                    return e.host !== window.location.host
                }
                r(sd, "isCrossDomain"), (0, K.AC)(".js-needs-timeline-marker-header", function(t, e, n) {
                    Ur(n)
                }), (0, f.on)("deprecatedAjaxSend", "[data-remote]", function(t) {
                    const {
                        request: e
                    } = t.detail;
                    Ur(e)
                });
                const Wr = 5e3,
                    rd = ".js-comment-body img",
                    id = ".js-comment-body video";
                (0, ze.Z)(function() {
                    hn()
                }), (0, v.N7)(".js-timeline-progressive-focus-container", function(t) {
                    const e = pn();
                    if (!e || document.querySelector(".js-pull-discussion-timeline")) return;
                    const o = document.getElementById(e);
                    o && t.contains(o) && Mo(o)
                });

                function hn(t = !0) {
                    const e = pn();
                    if (!e) return;
                    const n = document.getElementById(e);
                    if (n) Mo(n);
                    else {
                        if (ad(e)) return;
                        const o = document.querySelector("#js-timeline-progressive-loader");
                        o && t && Kr(e, o)
                    }
                }
                r(hn, "focusOrLoadElement");

                function ad(t) {
                    return cd(t) || zr(t, ".js-thread-hidden-comment-ids") || zr(t, ".js-review-hidden-comment-ids")
                }
                r(ad, "loadComments");

                function cd(t) {
                    const e = Vr(t, ".js-comment-container");
                    return e ? ((0, Zn.$)(e), !0) : !1
                }
                r(cd, "loadResolvedComments");

                function zr(t, e) {
                    const n = Vr(t, e);
                    return n ? (n.addEventListener("page:loaded", function() {
                        hn()
                    }), n.querySelector("button[type=submit]").click(), !0) : !1
                }
                r(zr, "loadHiddenComments");

                function Vr(t, e) {
                    var n;
                    const o = document.querySelectorAll(e);
                    for (const s of o) {
                        const i = s.getAttribute("data-hidden-comment-ids");
                        if (i) {
                            const a = i.split(","),
                                c = (n = t.match(/\d+/g)) == null ? void 0 : n[0];
                            if (c && a.includes(c)) return s
                        }
                    }
                    return null
                }
                r(Vr, "findCommentContainer"), (0, v.N7)(".js-inline-comments-container", function(t) {
                    const e = pn();
                    if (!e) return;
                    const n = document.getElementById(e);
                    n && t.contains(n) && Mo(n)
                }), (0, v.N7)("#js-discussions-timeline-anchor-loader", {
                    constructor: HTMLElement,
                    add: t => {
                        if (document.querySelector("#js-timeline-progressive-loader")) return;
                        const n = pn();
                        if (!n) return;
                        document.getElementById(n) || Kr(n, t)
                    }
                });
                async function ld() {
                    const t = document.querySelectorAll(id),
                        e = Array.from(t).map(n => new Promise(o => {
                            if (n.readyState >= n.HAVE_METADATA) o(n);
                            else {
                                const s = setTimeout(() => o(n), Wr),
                                    i = r(() => {
                                        clearTimeout(s), o(n)
                                    }, "done");
                                n.addEventListener("loadeddata", () => {
                                    n.readyState >= n.HAVE_METADATA && i()
                                }), n.addEventListener("error", () => i())
                            }
                        }));
                    return Promise.all(e)
                }
                r(ld, "videosReady");
                async function ud() {
                    const t = document.querySelectorAll(rd),
                        e = Array.from(t).map(n => {
                            new Promise(o => {
                                if (n.complete) o(n);
                                else {
                                    const s = setTimeout(() => o(n), Wr),
                                        i = r(() => {
                                            clearTimeout(s), o(n)
                                        }, "done");
                                    n.addEventListener("load", () => i()), n.addEventListener("error", () => i())
                                }
                            })
                        });
                    return Promise.all(e)
                }
                r(ud, "imagesReady");
                async function dd() {
                    return Promise.all([ld(), ud()])
                }
                r(dd, "mediaLoaded");
                async function Mo(t) {
                    await dd(), fd(t);
                    const e = t.querySelector(`[href='#${t.id}']`);
                    if (e) {
                        const n = e.getAttribute("data-turbo");
                        e.setAttribute("data-turbo", "false"), e.click(), n === null ? e.removeAttribute("data-turbo") : e.setAttribute("data-turbo", n)
                    }
                }
                r(Mo, "focusElement");
                async function Kr(t, e) {
                    if (!e) return;
                    const n = e.getAttribute("data-timeline-item-src");
                    if (!n) return;
                    const o = new URL(n, window.location.origin),
                        s = new URLSearchParams(o.search.slice(1));
                    s.append("anchor", t), o.search = s.toString();
                    let i;
                    try {
                        i = await (0, at.a)(document, o.toString())
                    } catch {
                        return
                    }
                    const a = i.querySelector(".js-timeline-item");
                    if (!a) return;
                    const c = a.getAttribute("data-gid");
                    if (!c) return;
                    const l = document.querySelector(`.js-timeline-item[data-gid='${c}']`);
                    if (l) l.replaceWith(a), hn(!1);
                    else {
                        const d = document.getElementById("js-progressive-timeline-item-container");
                        d && d.replaceWith(i), hn(!1)
                    }
                }
                r(Kr, "loadElement");

                function fd(t) {
                    const e = t.closest("details, .js-details-container");
                    !e || (e.nodeName === "DETAILS" ? e.setAttribute("open", "open") : (0, Gn.jo)(e) || (0, Gn.Qp)(e))
                }
                r(fd, "expandDetailsIfPresent");

                function pn() {
                    return window.location.hash.slice(1)
                }
                r(pn, "urlAnchor"), (0, v.N7)(".js-discussion", md);

                function md() {
                    let t = new WeakSet;
                    e(), document.addEventListener("pjax:end", e), (0, v.N7)(".js-timeline-item", n => {
                        n instanceof HTMLElement && (t.has(n) || (0, ft.N)(n))
                    });

                    function e() {
                        t = new WeakSet(document.querySelectorAll(".js-timeline-item"))
                    }
                    r(e, "setExistingTimelineItems")
                }
                r(md, "announceTimelineEvents");
                var Se = u(82131);

                function je(t) {
                    const {
                        name: e,
                        value: n
                    } = t, o = {
                        name: window.location.href
                    };
                    switch (e) {
                        case "CLS":
                            o.cls = n;
                            break;
                        case "FCP":
                            o.fcp = n;
                            break;
                        case "FID":
                            o.fid = n;
                            break;
                        case "LCP":
                            o.lcp = n;
                            break;
                        case "TTFB":
                            o.ttfb = n;
                            break
                    }(0, jt.b)({
                        webVitalTimings: [o]
                    }), hd(e, n)
                }
                r(je, "sendVitals");

                function hd(t, e) {
                    const n = document.querySelector("#staff-bar-web-vitals"),
                        o = n == null ? void 0 : n.querySelector(`[data-metric=${t.toLowerCase()}]`);
                    !o || (o.textContent = e.toPrecision(6))
                }
                r(hd, "updateStaffBar");

                function pd() {
                    return !!(window.performance && window.performance.timing && window.performance.getEntriesByType)
                }
                r(pd, "isTimingSuppported");
                async function gd() {
                    if (!pd()) return;
                    await Mt.C, await new Promise(n => setTimeout(n));
                    const t = window.performance.getEntriesByType("resource");
                    t.length && (0, jt.b)({
                        resourceTimings: t
                    });
                    const e = window.performance.getEntriesByType("navigation");
                    e.length && (0, jt.b)({
                        navigationTimings: e
                    })
                }
                r(gd, "sendTimingResults"), gd(), (0, Se.kz)(je), (0, Se.Y)(je), (0, Se.Tx)(je), (0, Se.Tb)(je), (0, Se.CA)(je), (0, f.on)("click", ".js-toggler-container .js-toggler-target", function(t) {
                    if (t.button !== 0) return;
                    const e = t.currentTarget.closest(".js-toggler-container");
                    e && e.classList.toggle("on")
                }), (0, K.AC)(".js-toggler-container", async (t, e) => {
                    t.classList.remove("success", "error"), t.classList.add("loading");
                    try {
                        await e.text(), t.classList.add("success")
                    } catch {
                        t.classList.add("error")
                    } finally {
                        t.classList.remove("loading")
                    }
                });
                var Xr = u(5826),
                    Gr = r((t, e, n) => {
                        if (!e.has(t)) throw TypeError("Cannot " + n)
                    }, "primer_tooltip_element_accessCheck"),
                    Ot = r((t, e, n) => (Gr(t, e, "read from private field"), n ? n.call(t) : e.get(t)), "primer_tooltip_element_privateGet"),
                    Te = r((t, e, n) => {
                        if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
                        e instanceof WeakSet ? e.add(t) : e.set(t, n)
                    }, "primer_tooltip_element_privateAdd"),
                    et = r((t, e, n, o) => (Gr(t, e, "write to private field"), o ? o.call(t, n) : e.set(t, n), n), "primer_tooltip_element_privateSet"),
                    Ae, gn, lt, ut, bn;
                const Zr = "hx_tooltip-open",
                    Jr = "hx_tooltip",
                    Yr = 10,
                    Qr = ["hx_tooltip-n", "hx_tooltip-s", "hx_tooltip-e", "hx_tooltip-w", "hx_tooltip-ne", "hx_tooltip-se", "hx_tooltip-nw", "hx_tooltip-sw"],
                    bd = {
                        n: "hx_tooltip-n",
                        s: "hx_tooltip-s",
                        e: "hx_tooltip-e",
                        w: "hx_tooltip-w",
                        ne: "hx_tooltip-ne",
                        se: "hx_tooltip-se",
                        nw: "hx_tooltip-nw",
                        sw: "hx_tooltip-sw"
                    };
                class yn extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        Te(this, Ae, void 0), Te(this, gn, "s"), Te(this, lt, "center"), Te(this, ut, "outside-bottom"), Te(this, bn, !1)
                    }
                    get htmlFor() {
                        return this.getAttribute("for") || ""
                    }
                    set htmlFor(e) {
                        this.setAttribute("for", e)
                    }
                    get control() {
                        return this.ownerDocument.getElementById(this.htmlFor)
                    }
                    get type() {
                        return this.getAttribute("data-type") === "label" ? "label" : "description"
                    }
                    set type(e) {
                        this.setAttribute("data-type", e)
                    }
                    get direction() {
                        return Ot(this, gn)
                    }
                    set direction(e) {
                        this.setAttribute("data-direction", e)
                    }
                    get align() {
                        return Ot(this, lt)
                    }
                    get side() {
                        return Ot(this, ut)
                    }
                    connectedCallback() {
                        this.hidden = !0, et(this, bn, !0), this.id || (this.id = `tooltip-${Date.now()}-${(Math.random()*1e4).toFixed(0)}`), !!this.control && (this.classList.add(Jr), this.setAttribute("role", "tooltip"), this.addEvents())
                    }
                    attributeChangedCallback(e, n, o) {
                        if (e === "id" || e === "data-type") {
                            if (!this.id || !this.control) return;
                            if (this.type === "label") this.control.setAttribute("aria-labelledby", this.id);
                            else {
                                let s = this.control.getAttribute("aria-describedby");
                                s ? s = `${s} ${this.id}` : s = this.id, this.control.setAttribute("aria-describedby", s)
                            }
                        } else if (e === "hidden")
                            if (this.hidden) this.classList.remove(Zr, ...Qr);
                            else {
                                this.classList.add(Zr, Jr);
                                for (const s of this.ownerDocument.querySelectorAll(this.tagName)) s !== this && (s.hidden = !0);
                                this.updatePosition()
                            }
                        else if (e === "data-direction") {
                            this.classList.remove(...Qr);
                            const s = et(this, gn, o || "s");
                            s === "n" ? (et(this, lt, "center"), et(this, ut, "outside-top")) : s === "ne" ? (et(this, lt, "start"), et(this, ut, "outside-top")) : s === "e" ? (et(this, lt, "center"), et(this, ut, "outside-right")) : s === "se" ? (et(this, lt, "start"), et(this, ut, "outside-bottom")) : s === "s" ? (et(this, lt, "center"), et(this, ut, "outside-bottom")) : s === "sw" ? (et(this, lt, "end"), et(this, ut, "outside-bottom")) : s === "w" ? (et(this, lt, "center"), et(this, ut, "outside-left")) : s === "nw" && (et(this, lt, "end"), et(this, ut, "outside-top"))
                        }
                    }
                    disconnectedCallback() {
                        Ot(this, Ae).abort()
                    }
                    addEvents() {
                        if (!this.control) return;
                        et(this, Ae, new AbortController);
                        const {
                            signal: e
                        } = Ot(this, Ae);
                        this.addEventListener("mouseleave", this, {
                            signal: e
                        }), this.control.addEventListener("mouseenter", this, {
                            signal: e
                        }), this.control.addEventListener("mouseleave", this, {
                            signal: e
                        }), this.control.addEventListener("focus", this, {
                            signal: e
                        }), this.control.addEventListener("blur", this, {
                            signal: e
                        }), this.ownerDocument.addEventListener("keydown", this, {
                            signal: e
                        })
                    }
                    handleEvent(e) {
                        !this.control || ((e.type === "mouseenter" || e.type === "focus") && this.hidden ? this.hidden = !1 : e.type === "blur" ? this.hidden = !0 : e.type === "mouseleave" && e.relatedTarget !== this.control && e.relatedTarget !== this ? this.hidden = !0 : e.type === "keydown" && e.key === "Escape" && !this.hidden && (this.hidden = !0))
                    }
                    adjustedAnchorAlignment(e) {
                        if (!this.control) return;
                        const n = this.getBoundingClientRect(),
                            o = this.control.getBoundingClientRect(),
                            s = n.width,
                            i = n.left + s / 2,
                            a = o.x + o.width / 2;
                        return Math.abs(i - a) < 2 || e === "outside-left" || e === "outside-right" ? "center" : n.left === o.left ? "start" : n.right === o.right ? "end" : i < a ? n.left === 0 ? "start" : "end" : n.right === 0 ? "end" : "start"
                    }
                    updatePosition() {
                        if (!this.control || !Ot(this, bn) || this.hidden) return;
                        this.style.left = "0px";
                        let e = (0, Xr.N)(this, this.control, {
                                side: Ot(this, ut),
                                align: Ot(this, lt),
                                anchorOffset: Yr
                            }),
                            n = e.anchorSide;
                        this.style.top = `${e.top}px`, this.style.left = `${e.left}px`;
                        let o = "s";
                        const s = this.adjustedAnchorAlignment(n);
                        !s || (this.style.left = "0px", e = (0, Xr.N)(this, this.control, {
                            side: n,
                            align: s,
                            anchorOffset: Yr
                        }), n = e.anchorSide, this.style.top = `${e.top}px`, this.style.left = `${e.left}px`, n === "outside-left" ? o = "w" : n === "outside-right" ? o = "e" : n === "outside-top" ? s === "center" ? o = "n" : s === "start" ? o = "ne" : o = "nw" : s === "center" ? o = "s" : s === "start" ? o = "se" : o = "sw", this.classList.add(bd[o]))
                    }
                }
                r(yn, "PrimerTooltipElement"), Ae = new WeakMap, gn = new WeakMap, lt = new WeakMap, ut = new WeakMap, bn = new WeakMap, yn.observedAttributes = ["data-type", "data-direction", "id", "hidden"], window.customElements.get("primer-tooltip") || (window.PrimerTooltipElement = yn, window.customElements.define("primer-tooltip", yn));
                var At = u(79785);
                if ((0, _t.c)("TURBO")) {
                    (async () => {
                        const {
                            PageRenderer: e,
                            session: n
                        } = await u.e(6184).then(u.bind(u, 36184)), o = n.adapter;
                        document.addEventListener("turbo:before-fetch-request", c => {
                            const l = c.target;
                            (l == null ? void 0 : l.tagName) === "TURBO-FRAME" && (o.progressBar.setValue(0), o.progressBar.show())
                        }), document.addEventListener("turbo:frame-render", c => {
                            const l = c.target;
                            (l == null ? void 0 : l.tagName) === "TURBO-FRAME" && (o.progressBar.setValue(100), o.progressBar.hide())
                        });
                        const s = Object.getOwnPropertyDescriptor(e.prototype, "trackedElementsAreIdentical").get;
                        Object.defineProperty(e.prototype, "trackedElementsAreIdentical", {
                            get() {
                                const c = s.call(this);
                                return c || i(this.currentHeadSnapshot, this.newHeadSnapshot), c
                            }
                        });

                        function i(c, l) {
                            const d = Object.fromEntries(a(c));
                            for (const [h, j] of a(l))
                                if (d[h] !== j) {
                                    (0, At.Ak)(`${h.replace(/^x-/,"")} changed`);
                                    break
                                }
                        }
                        r(i, "setReasonForTurboFail");

                        function* a(c) {
                            for (const l of Object.values(c.detailsByOuterHTML))
                                if (l.tracked)
                                    for (const d of l.elements) d instanceof HTMLMetaElement && d.getAttribute("http-equiv") && (yield [d.getAttribute("http-equiv") || "", d.getAttribute("content") || ""])
                        }
                        r(a, "getSnapshotSignatures")
                    })();
                    const t = r((e, n) => {
                        const o = new URL(e, window.location.origin),
                            s = new URL(n, window.location.origin);
                        return o.host === s.host && o.pathname === s.pathname
                    }, "isIntraPageNavigation");
                    document.addEventListener("turbo:click", function(e) {
                        if (!(e.target instanceof HTMLElement)) return;
                        const n = e.target.closest("[data-turbo-frame]");
                        n instanceof HTMLElement && e.target.setAttribute("data-turbo-frame", n.getAttribute("data-turbo-frame") || ""), e instanceof CustomEvent && t(location.href, e.detail.url) && e.preventDefault()
                    }), document.addEventListener("turbo:before-render", e => {
                        if (!(e instanceof CustomEvent)) return;
                        const n = e.detail.newBody.ownerDocument.documentElement,
                            o = document.documentElement;
                        for (const s of o.attributes) !n.hasAttribute(s.nodeName) && s.nodeName !== "aria-busy" && o.removeAttribute(s.nodeName);
                        for (const s of n.attributes) o.getAttribute(s.nodeName) !== s.nodeValue && o.setAttribute(s.nodeName, s.nodeValue)
                    }), document.addEventListener("turbo:visit", At.LD), document.addEventListener("turbo:render", At.FP), document.addEventListener("beforeunload", At.FP), document.addEventListener("turbo:load", e => {
                        Object.keys(e.detail.timing).length === 0 ? (0, At.OE)() || (0, At.Po)() ? (0, At.Ys)() : (0, At.F6)() : (0, At.Xk)()
                    })
                }

                function yd() {
                    if ("Intl" in window) try {
                        return new window.Intl.DateTimeFormat().resolvedOptions().timeZone
                    } catch {}
                }
                r(yd, "timezone"), window.requestIdleCallback(() => {
                    const t = yd();
                    t && (0, pe.d8)("tz", encodeURIComponent(t))
                });
                var ti = u(70112),
                    vd = Object.defineProperty,
                    wd = Object.getOwnPropertyDescriptor,
                    st = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? wd(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && vd(e, n, s), s
                    }, "webauthn_get_decorateClass"),
                    Ed = (t => (t.Initializing = "initializing", t.Unsupported = "unsupported", t.Ready = "ready", t.Waiting = "waiting", t.Error = "error", t.Submitting = "submitting", t))(Ed || {});
                let bt = r(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.state = "initializing", this.json = "", this.autofocusWhenReady = !1, this.autoPrompt = !1, this.hasErrored = !1
                    }
                    connectedCallback() {
                        this.originalButtonText = this.button.textContent, this.setState((0, ti.Zh)() ? "ready" : "unsupported"), this.autoPrompt && this.prompt(void 0, !0)
                    }
                    setState(t) {
                        this.button.textContent = this.hasErrored ? this.button.getAttribute("data-retry-message") : this.originalButtonText, this.button.disabled = !1, this.button.hidden = !1;
                        for (const e of this.messages) e.hidden = !0;
                        switch (t) {
                            case "initializing":
                                this.button.disabled = !0;
                                break;
                            case "unsupported":
                                this.button.disabled = !0, this.unsupportedMessage.hidden = !1;
                                break;
                            case "ready":
                                this.autofocusWhenReady && this.button.focus();
                                break;
                            case "waiting":
                                this.waitingMessage.hidden = !1, this.button.hidden = !0;
                                break;
                            case "error":
                                this.errorMessage.hidden = !1;
                                break;
                            case "submitting":
                                this.button.textContent = "Verifying\u2026", this.button.disabled = !0;
                                break;
                            default:
                                throw new Error("invalid state")
                        }
                        this.state = t
                    }
                    async prompt(t, e) {
                        t == null || t.preventDefault(), this.dispatchEvent(new CustomEvent("webauthn-get-prompt"));
                        try {
                            e || this.setState("waiting");
                            const n = JSON.parse(this.json),
                                o = await (0, ti.U2)(n);
                            this.setState("submitting");
                            const s = this.closest(".js-webauthn-form"),
                                i = s.querySelector(".js-webauthn-response");
                            i.value = JSON.stringify(o), (0, Z.Bt)(s)
                        } catch (n) {
                            if (!e) throw this.hasErrored = !0, this.setState("error"), n
                        }
                    }
                }, "WebauthnGetElement");
                st([I.fA], bt.prototype, "button", 2), st([I.GO], bt.prototype, "messages", 2), st([I.fA], bt.prototype, "unsupportedMessage", 2), st([I.fA], bt.prototype, "waitingMessage", 2), st([I.fA], bt.prototype, "errorMessage", 2), st([I.Lj], bt.prototype, "json", 2), st([I.Lj], bt.prototype, "autofocusWhenReady", 2), st([I.Lj], bt.prototype, "autoPrompt", 2), bt = st([I.Ih], bt);
                var Ld = (t => (t.Initializing = "initializing", t.ShowingForm = "showing-form", t.ShowingRevealer = "showing-revealer", t))(Ld || {});
                let ie = r(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.state = "showing-form"
                    }
                    connectedCallback() {
                        this.setState(this.state)
                    }
                    setState(t) {
                        switch (this.revealer.hidden = !0, this.form.hidden = !1, t) {
                            case "initializing":
                                break;
                            case "showing-form":
                                this.passwordField.focus(), this.dispatchEvent(new CustomEvent("sudo-password-showing-form"));
                                break;
                            case "showing-revealer":
                                this.revealer.hidden = !1, this.form.hidden = !0;
                                break;
                            default:
                                throw new Error("invalid state")
                        }
                        this.state = t
                    }
                    reveal() {
                        this.setState("showing-form")
                    }
                }, "SudoPasswordElement");
                st([I.Lj], ie.prototype, "state", 2), st([I.fA], ie.prototype, "revealer", 2), st([I.fA], ie.prototype, "form", 2), st([I.fA], ie.prototype, "passwordField", 2), ie = st([I.Ih], ie);
                let vn = r(class extends HTMLElement {
                    connectedCallback() {
                        var t;
                        (t = this.webauthnGet) == null || t.addEventListener("webauthn-get-prompt", () => {
                            this.sudoPassword.setState("showing-revealer")
                        }), this.sudoPassword.addEventListener("sudo-password-showing-form", () => {
                            var e;
                            (e = this.webauthnGet) == null || e.setState("ready")
                        })
                    }
                }, "SudoAuthElement");
                st([I.fA], vn.prototype, "webauthnGet", 2), st([I.fA], vn.prototype, "sudoPassword", 2), vn = st([I.Ih], vn);
                let qo = 0;

                function Sd() {
                    if (!document.hasFocus()) return;
                    const t = document.querySelector(".js-timeline-marker-form");
                    t && t instanceof HTMLFormElement && (0, Z.Bt)(t)
                }
                r(Sd, "markThreadAsRead");
                const wn = "IntersectionObserver" in window ? new IntersectionObserver(function(t) {
                    for (const e of t) e.isIntersecting && ei(e.target)
                }, {
                    root: null,
                    rootMargin: "0px",
                    threshold: 1
                }) : null;
                (0, v.N7)(".js-unread-item", {
                    constructor: HTMLElement,
                    add(t) {
                        qo++, wn && wn.observe(t)
                    },
                    remove(t) {
                        qo--, wn && wn.unobserve(t), qo === 0 && Sd()
                    }
                });

                function ei(t) {
                    t.classList.remove("js-unread-item", "unread-item")
                }
                r(ei, "clearUnread"), (0, v.N7)(".js-discussion[data-channel-target]", {
                    subscribe: t => (0, N.RB)(t, "socket:message", function(e) {
                        const n = e.target,
                            o = e.detail.data;
                        if (n.getAttribute("data-channel-target") === o.gid)
                            for (const s of document.querySelectorAll(".js-unread-item")) ei(s)
                    })
                });
                let En = 0;
                const ni = /^\(\d+\)\s+/;

                function oi() {
                    const t = En ? `(${En}) ` : "";
                    document.title.match(ni) ? document.title = document.title.replace(ni, t) : document.title = `${t}${document.title}`
                }
                r(oi, "updateTitle"), (0, v.N7)(".js-unread-item", {
                    add() {
                        En++, oi()
                    },
                    remove() {
                        En--, oi()
                    }
                }), (0, v.N7)(".js-socket-channel.js-updatable-content", {
                    subscribe: t => (0, N.RB)(t, "socket:message", function(e) {
                        const {
                            gid: n,
                            wait: o
                        } = e.detail.data, s = e.target, i = n ? jd(s, n) : s;
                        i && setTimeout(qt.x0, o || 0, i)
                    })
                });

                function jd(t, e) {
                    if (t.getAttribute("data-gid") === e) return t;
                    for (const n of t.querySelectorAll("[data-url][data-gid]"))
                        if (n.getAttribute("data-gid") === e) return n;
                    return null
                }
                r(jd, "findByGid");
                async function Td() {
                    if (!(!history.state || !history.state.staleRecords)) {
                        await Mt.x;
                        for (const t in history.state.staleRecords)
                            for (const e of document.querySelectorAll(`.js-updatable-content [data-url='${t}'], .js-updatable-content[data-url='${t}']`)) {
                                const n = history.state.staleRecords[t];
                                e instanceof HTMLElement && (0, qt.Of)(e, n, !0)
                            }(0, te.lO)(null, "", location.href)
                    }
                }
                r(Td, "reapplyPreviouslyUpdatedContent"), window.addEventListener("beforeunload", function() {
                    if (Object.keys(qt.WU).length > 0) {
                        const t = history.state || {};
                        t.staleRecords = qt.WU, (0, te.lO)(t, "", location.href)
                    }
                });
                try {
                    Td()
                } catch {}(0, f.on)("upload:setup", ".js-upload-avatar-image", function(t) {
                    const {
                        form: e
                    } = t.detail, n = t.currentTarget.getAttribute("data-alambic-organization"), o = t.currentTarget.getAttribute("data-alambic-owner-type"), s = t.currentTarget.getAttribute("data-alambic-owner-id");
                    n && e.append("organization_id", n), o && e.append("owner_type", o), s && e.append("owner_id", s)
                }), (0, f.on)("upload:complete", ".js-upload-avatar-image", function(t) {
                    const {
                        attachment: e
                    } = t.detail, n = `/settings/avatars/${e.id}`;
                    (0, Rt.W)({
                        content: (0, at.a)(document, n)
                    })
                });
                var si = u(14037);

                function Ln() {
                    if (document.querySelector(":target")) return;
                    const t = (0, si.$z)(location.hash).toLowerCase(),
                        e = (0, si.Q)(document, `user-content-${t}`);
                    e && (0, eo.zT)(e)
                }
                r(Ln, "hashchange"), window.addEventListener("hashchange", Ln), document.addEventListener("pjax:success", Ln), async function() {
                    await Mt.x, Ln()
                }(), (0, f.on)("click", "a[href]", function(t) {
                    const {
                        currentTarget: e
                    } = t;
                    e instanceof HTMLAnchorElement && e.href === location.href && location.hash.length > 1 && setTimeout(function() {
                        t.defaultPrevented || Ln()
                    })
                });
                async function Ad(t) {
                    const e = t.currentTarget,
                        {
                            init: n
                        } = await u.e(5691).then(u.bind(u, 35691));
                    n(e)
                }
                r(Ad, "user_status_loader_load"), (0, v.N7)(".js-user-status-container", {
                    subscribe: t => (0, N.RB)(t, "click", Ad, {
                        once: !0
                    })
                });
                var Sn = u(78694);

                function Cd(t, e) {
                    const n = t.querySelector(".js-user-list-base");
                    n && (n.textContent = e || n.getAttribute("data-generic-message"), n.hidden = !1)
                }
                r(Cd, "setFlashError");

                function ri(t, e) {
                    const o = (e || t).querySelectorAll(".js-user-list-error");
                    for (const a of o) a.hidden = !0;
                    const s = e ? [e] : t.querySelectorAll(".errored.js-user-list-input-container");
                    for (const a of s) a.classList.remove("errored");
                    const i = t.querySelector(".js-user-list-base");
                    i && (i.hidden = !0)
                }
                r(ri, "resetValidation"), (0, K.AC)(".js-user-list-form", async function(t, e) {
                    var n;
                    ri(t);
                    const o = t.querySelector("[data-submitting-message]"),
                        s = o == null ? void 0 : o.textContent;
                    o && (o.textContent = o.getAttribute("data-submitting-message"), o.disabled = !0);
                    for (const i of t.querySelectorAll(".js-user-list-input")) i.disabled = !0;
                    try {
                        const i = await e.html();
                        (0, f.f)(t, "user-list-form:success", i.html)
                    } catch (i) {
                        if (((n = i.response) == null ? void 0 : n.status) === 422) t.replaceWith(i.response.html);
                        else {
                            Cd(t), o && (s && (o.textContent = s), o.disabled = !1);
                            for (const a of t.querySelectorAll(".js-user-list-input")) a.disabled = !1
                        }
                    }
                }), (0, f.on)("user-list-form:success", ".js-follow-list", t => {
                    const e = t.detail,
                        n = e instanceof DocumentFragment ? e.querySelector(".js-target-url") : null;
                    (n == null ? void 0 : n.textContent) ? location.href = n.textContent: location.reload()
                });

                function ii(t) {
                    if (!(t.currentTarget instanceof HTMLElement)) return;
                    const e = t.currentTarget.closest(".js-user-list-form"),
                        n = t.currentTarget.closest(".js-user-list-input-container");
                    e && n && ri(e, n)
                }
                r(ii, "clearErrorsFromInput"), (0, X.q6)(".js-user-list-form input", ii), (0, X.q6)(".js-user-list-form textarea", ii), (0, f.on)("auto-check-error", ".js-user-list-form input", function(t) {
                    const e = t.currentTarget.closest(".js-user-list-input-container"),
                        n = e == null ? void 0 : e.querySelector(".js-user-list-error");
                    n && (n.hidden = !1)
                });

                function kd(t) {
                    var e;
                    const n = new Map;
                    for (const o of t) {
                        const s = (e = o.querySelector(".js-user-lists-create-trigger")) == null ? void 0 : e.getAttribute("data-repository-id");
                        if (s) {
                            const i = n.get(s);
                            i ? i.push(o) : n.set(s, [o])
                        }
                    }
                    return n
                }
                r(kd, "groupRootsByRepositoryId");
                async function xd(t, e, n) {
                    const o = new FormData;
                    o.set("authenticity_token", e);
                    for (const a of n) o.append("repository_ids[]", a);
                    const s = await fetch(t, {
                            method: "POST",
                            body: o,
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        }),
                        i = new Map;
                    if (s.ok) {
                        const a = await s.json();
                        for (const c in a) i.set(c, (0, Lt.r)(document, a[c]))
                    }
                    return i
                }
                r(xd, "requestMenuBatchRender");

                function Md(t, e) {
                    for (const [n, o] of t.entries()) {
                        const s = e.get(n) || [];
                        for (const i of s) i.replaceWith(s.length === 1 ? o : o.cloneNode(!0))
                    }
                }
                r(Md, "replaceUserListMenuRoots");
                async function ai() {
                    var t;
                    const e = document.querySelectorAll(".js-user-list-menu-content-root");
                    if (e.length === 0) return;
                    const n = e[0].getAttribute("data-batch-update-url");
                    if (!n) return;
                    const o = (t = e[0].querySelector(".js-user-list-batch-update-csrf")) == null ? void 0 : t.value;
                    if (!o) return;
                    const s = kd(e),
                        i = s.keys(),
                        a = await xd(n, o, i);
                    a.size > 0 && Md(a, s)
                }
                r(ai, "updateAllUserListMenus");

                function qd(t) {
                    const e = new Promise((n, o) => {
                        t.addEventListener("user-list-menu-form:success", () => n()), t.addEventListener("user-list-menu-form:error", s => o(s))
                    });
                    return (0, Z.Bt)(t), e
                }
                r(qd, "requestUserListMenuFormSubmit");

                function Pd(t) {
                    const e = t.target;
                    if (!(e instanceof HTMLDetailsElement) || e.hasAttribute("open")) return;
                    const n = e.querySelector(".js-user-list-menu-form");
                    n && (0, Sn.T)(n) && (0, Z.Bt)(n);
                    const o = e.querySelector(".js-user-list-create-trigger-text");
                    o && (o.textContent = "")
                }
                r(Pd, "submitUserListFormOnToggle"), (0, f.on)("toggle", ".js-user-list-menu", Pd, {
                    capture: !0
                }), (0, X.q6)(".js-user-lists-menu-filter", t => {
                    const e = t.currentTarget,
                        n = e.value.trim(),
                        o = e.closest(".js-user-list-menu-content-root"),
                        s = o == null ? void 0 : o.querySelector(".js-user-list-create-trigger-text");
                    !s || (s.textContent = n ? `"${n}"` : "")
                }), (0, K.AC)(".js-user-list-menu-form", async function(t, e) {
                    let n;
                    try {
                        n = await e.json()
                    } catch (s) {
                        (0, me.v)(), (0, f.f)(t, "user-list-menu-form:error", s);
                        return
                    }
                    if (n.json.didStar) {
                        const s = t.closest(".js-toggler-container");
                        s && s.classList.add("on");
                        const i = n.json.starCount;
                        if (i) {
                            const a = t.closest(".js-social-container");
                            a && Tr(a, i)
                        }
                    }
                    const o = t.closest(".js-user-list-menu-content-root[data-update-after-submit]");
                    if (o)
                        for (const s of t.querySelectorAll(".js-user-list-menu-item")) s.checked = s.defaultChecked;
                    n.json.didCreate ? await ai() : o && await (0, qt.x0)(o), (0, f.f)(t, "user-list-menu-form:success")
                }), (0, f.on)("click", ".js-user-list-delete-confirmation-trigger", t => {
                    const {
                        currentTarget: e
                    } = t, n = e.getAttribute("data-template-id");
                    if (!n) return;
                    const o = document.getElementById(n);
                    if (!o || !(o instanceof HTMLTemplateElement)) return;
                    const s = e.closest(".js-edit-user-list-dialog");
                    s && (s.open = !1);
                    const i = o.content.cloneNode(!0),
                        a = o.getAttribute("data-labelledby");
                    (0, Rt.W)({
                        content: i,
                        labelledBy: a
                    })
                }), (0, f.on)("click", ".js-user-lists-create-trigger", async function(t) {
                    const {
                        currentTarget: e
                    } = t, n = document.querySelector(".js-user-list-create-dialog-template"), o = t.currentTarget.getAttribute("data-repository-id"), s = e.closest(".js-user-list-menu-content-root"), i = s == null ? void 0 : s.querySelector(".js-user-lists-menu-filter"), a = i == null ? void 0 : i.value.trim();
                    if (!n || !(n instanceof HTMLTemplateElement) || !o) {
                        e instanceof HTMLButtonElement && (e.disabled = !0);
                        return
                    }
                    const c = n.getAttribute("data-label");
                    if (s && (0, Sn.T)(s)) {
                        const h = s.querySelector(".js-user-list-menu-form");
                        h && await qd(h)
                    }
                    const l = new St.R(n, {
                            repositoryId: o,
                            placeholderName: a
                        }),
                        d = await (0, Rt.W)({
                            content: l,
                            label: c
                        });
                    d.addEventListener("user-list-form:success", async () => {
                        await ai();
                        const h = d.closest("details");
                        h && (h.open = !1)
                    })
                });
                var Id = Object.defineProperty,
                    Rd = Object.getOwnPropertyDescriptor,
                    jn = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Rd(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Id(e, n, s), s
                    }, "visible_password_element_decorateClass");
                let Ce = r(class extends HTMLElement {
                    show() {
                        this.input.type = "text", this.input.focus(), this.showButton.hidden = !0, this.hideButton.hidden = !1
                    }
                    hide() {
                        this.input.type = "password", this.input.focus(), this.hideButton.hidden = !0, this.showButton.hidden = !1
                    }
                }, "VisiblePasswordElement");
                jn([I.fA], Ce.prototype, "input", 2), jn([I.fA], Ce.prototype, "showButton", 2), jn([I.fA], Ce.prototype, "hideButton", 2), Ce = jn([I.Ih], Ce), (0, v.N7)("[data-warn-unsaved-changes]", {
                    add(t) {
                        t.addEventListener("input", Tn), t.addEventListener("change", Tn), t.addEventListener("submit", ke);
                        const e = t.closest("details-dialog");
                        e && (e.closest("details").addEventListener("toggle", ci), e.addEventListener("details-dialog-close", li))
                    },
                    remove(t) {
                        t.removeEventListener("input", Tn), t.removeEventListener("change", Tn), t.removeEventListener("submit", ke);
                        const e = t.closest("details-dialog");
                        e && (e.closest("details").removeEventListener("toggle", ci), e.removeEventListener("details-dialog-close", li), ke())
                    }
                });

                function Tn(t) {
                    const e = t.currentTarget;
                    (0, Sn.T)(e) ? Dd(e): ke()
                }
                r(Tn, "prepareUnsavedChangesWarning");

                function Dd(t) {
                    const e = t.getAttribute("data-warn-unsaved-changes") || "Changes you made may not be saved.";
                    window.onbeforeunload = function(n) {
                        return n.returnValue = e, e
                    }
                }
                r(Dd, "enableSaveChangesReminder");

                function ke() {
                    window.onbeforeunload = null
                }
                r(ke, "disableSaveChangesReminder");

                function ci({
                    currentTarget: t
                }) {
                    t.hasAttribute("open") || ke()
                }
                r(ci, "disableSaveChangesReminderOnClosedDialogs");

                function li(t) {
                    const e = t.currentTarget;
                    if (!e.closest("details[open]")) return;
                    let o = !0;
                    const s = e.querySelectorAll("form[data-warn-unsaved-changes]");
                    for (const i of s)
                        if ((0, Sn.T)(i)) {
                            const a = i.getAttribute("data-warn-unsaved-changes");
                            o = confirm(a);
                            break
                        }
                    o || t.preventDefault()
                }
                r(li, "promptOnDialogClosing"), (0, v.N7)(".will-transition-once", {
                    constructor: HTMLElement,
                    subscribe: t => (0, N.RB)(t, "transitionend", Nd)
                });

                function Nd(t) {
                    t.target.classList.remove("will-transition-once")
                }
                r(Nd, "onTransitionEnd");

                function _d(t, e = 0) {
                    const n = t.getBoundingClientRect(),
                        o = n.top - e,
                        s = n.bottom - window.innerHeight + e;
                    o < 0 ? window.scrollBy(0, o) : s > 0 && window.scrollBy(0, s)
                }
                r(_d, "adjustViewport"), (0, f.on)("click", ".js-video-play, .js-video-close", function(t) {
                    const n = t.currentTarget.closest(".js-video-container"),
                        o = n.querySelector(".js-video-iframe");
                    n.tagName.toLowerCase() === "details" && n.addEventListener("details-dialog-close", function() {
                        o.removeAttribute("src"), window.setTimeout(function() {
                            n.classList.remove("is-expanded")
                        }, 10)
                    }), n.classList.contains("is-expanded") ? (o.removeAttribute("src"), n.classList.remove("is-expanded")) : (o.src = o.getAttribute("data-src") || "", n.classList.add("is-expanded")), _d(o, 20)
                });
                async function Hd(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-url");
                    if (!n || Od(e)) return;
                    const o = e.getAttribute("data-id") || "",
                        s = e.textContent,
                        i = document.querySelectorAll(`.js-issue-link[data-id='${o}']`);
                    for (const a of i) a.removeAttribute("data-url");
                    try {
                        const a = `${n}/title`,
                            c = await fetch(a, {
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest",
                                    Accept: "application/json"
                                }
                            });
                        if (!c.ok) {
                            const d = new Error,
                                h = c.statusText ? ` ${c.statusText}` : "";
                            throw d.message = `HTTP ${c.status}${h}`, d
                        }
                        const l = await c.json();
                        ui(i, `${s}, ${l.title}`)
                    } catch (a) {
                        const c = (a.response != null ? a.response.status : void 0) || 500,
                            l = (() => {
                                switch (c) {
                                    case 404:
                                        return e.getAttribute("data-permission-text");
                                    default:
                                        return e.getAttribute("data-error-text")
                                }
                            })();
                        ui(i, l || "")
                    }
                }
                r(Hd, "issueLabel");

                function ui(t, e) {
                    for (const n of t) n instanceof HTMLElement && (n.classList.add("tooltipped", "tooltipped-ne"), n.setAttribute("aria-label", e))
                }
                r(ui, "setLabel");

                function Od(t) {
                    switch (t.getAttribute("data-hovercard-type")) {
                        case "issue":
                        case "pull_request":
                            return !!t.closest("[data-issue-and-pr-hovercards-enabled]");
                        case "discussion":
                            return !!t.closest("[data-discussion-hovercards-enabled]");
                        default:
                            return !1
                    }
                }
                r(Od, "isHovercardEnabled"), (0, v.N7)(".js-issue-link", {
                    subscribe: t => (0, N.RB)(t, "mouseenter", Hd)
                });
                var Bd = u(12085),
                    Kt = u.n(Bd);

                function Po() {
                    return [Math.floor(Math.random() * (255 - 0) + 0), Math.floor(Math.random() * (255 - 0) + 0), Math.floor(Math.random() * (255 - 0) + 0)]
                }
                r(Po, "randomRGBColor");

                function xe(t, e) {
                    const n = Kt().rgb.hsl(e);
                    t.style.setProperty("--label-r", e[0].toString()), t.style.setProperty("--label-g", e[1].toString()), t.style.setProperty("--label-b", e[2].toString()), t.style.setProperty("--label-h", n[0].toString()), t.style.setProperty("--label-s", n[1].toString()), t.style.setProperty("--label-l", n[2].toString())
                }
                r(xe, "setColorSwatch");

                function Io(t, e) {
                    t.blur();
                    const n = t.closest("form"),
                        o = n.querySelector(".js-new-label-color-input");
                    (0, Z.Se)(o, `#${Kt().rgb.hex(e)}`);
                    const s = n.querySelector(".js-new-label-color");
                    xe(s, e)
                }
                r(Io, "setInputColorFromButton");

                function $d(t, e) {
                    t.closest(".js-label-error-container").classList.add("errored"), t.textContent = e, t.hidden = !1
                }
                r($d, "addErrorToField");

                function Fd(t) {
                    t.closest(".js-label-error-container").classList.remove("errored"), t.hidden = !0
                }
                r(Fd, "removeErrorFromField");

                function ae(t, e, n) {
                    const o = e.querySelector(t);
                    !o || (n ? $d(o, n[0]) : Fd(o))
                }
                r(ae, "showOrHideLabelError");

                function Ro(t, e) {
                    ae(".js-label-name-error", t, e.name), ae(".js-label-description-error", t, e.description), ae(".js-label-color-error", t, e.color)
                }
                r(Ro, "showLabelErrors");

                function Xt(t) {
                    ae(".js-label-name-error", t, null), ae(".js-label-description-error", t, null), ae(".js-label-color-error", t, null)
                }
                r(Xt, "hideLabelErrors");

                function Ud(t, e, n, o, s) {
                    const i = new URL(`${t}${encodeURIComponent(e)}`, window.location.origin),
                        a = new URLSearchParams(i.search.slice(1));
                    return a.append("color", n), o && a.append("description", o), s && a.append("id", s), i.search = a.toString(), i.toString()
                }
                r(Ud, "labelPreviewUrl");

                function Wd(t) {
                    let e = null;
                    const n = t.querySelector(".js-new-label-description-input");
                    return n instanceof HTMLInputElement && n.value.trim().length > 0 && (e = n.value.trim()), e
                }
                r(Wd, "labelDescriptionFrom");

                function zd(t) {
                    const e = t.querySelector(".js-new-label-color-input");
                    return e.checkValidity() ? e.value.trim().replace(/^#/, "") : "ededed"
                }
                r(zd, "labelColorFrom");

                function Vd(t, e) {
                    let o = t.querySelector(".js-new-label-name-input").value.trim();
                    return o.length < 1 && (o = e.getAttribute("data-default-name")), o
                }
                r(Vd, "labelNameFrom");
                async function ce(t) {
                    const e = t.closest(".js-label-preview-container");
                    if (!e) return;
                    const n = t.closest(".js-label-form"),
                        o = n.querySelector(".js-new-label-error"),
                        s = n.getAttribute("data-label-id"),
                        i = e.querySelector(".js-label-preview"),
                        a = Vd(n, i);
                    if (!n.checkValidity() && a !== "Label preview") return;
                    const c = zd(n),
                        l = Wd(n),
                        d = i.getAttribute("data-url-template"),
                        h = Ud(d, a, c, l, s);
                    if (e.hasAttribute("data-last-preview-url")) {
                        const T = e.getAttribute("data-last-preview-url");
                        if (h === T) return
                    }
                    let j;
                    try {
                        j = await (0, at.a)(document, h)
                    } catch (T) {
                        const k = await T.response.json();
                        Ro(n, k), o && (o.textContent = k.message, o.hidden = !1);
                        return
                    }
                    o && (o.textContent = "", o.hidden = !0), Xt(n), i.innerHTML = "", i.appendChild(j), e.setAttribute("data-last-preview-url", h)
                }
                r(ce, "updateLabelPreview");

                function Kd(t) {
                    ce(t.target)
                }
                r(Kd, "onLabelFormInputChange");

                function di(t, e) {
                    t.closest(".js-details-container").classList.toggle("is-empty", e)
                }
                r(di, "toggleBlankSlate");

                function fi(t) {
                    const e = document.querySelector(".js-labels-count"),
                        o = Number(e.textContent) + t;
                    e.textContent = o.toString();
                    const s = document.querySelector(".js-labels-label");
                    return s.textContent = s.getAttribute(o === 1 ? "data-singular-string" : "data-plural-string"), o
                }
                r(fi, "updateCount"), (0, X.q6)(".js-label-filter-field", function(t) {
                    const e = t.target,
                        o = e.closest("details-menu").querySelector(".js-new-label-name");
                    if (!o) return;
                    const s = e.value.trim();
                    o.textContent = s
                }), (0, f.on)("filterable:change", ".js-filterable-issue-labels", function(t) {
                    const e = t.currentTarget.closest("details-menu"),
                        n = e.querySelector(".js-add-label-button");
                    if (!n) return;
                    const s = t.detail.inputField.value.trim().toLowerCase();
                    let i = !1;
                    for (const a of e.querySelectorAll("input[data-label-name]"))
                        if ((a.getAttribute("data-label-name") || "").toLowerCase() === s) {
                            i = !0;
                            break
                        }
                    n.hidden = s.length === 0 || i
                }), (0, X.ZG)(".js-new-label-color-input", function(t) {
                    const n = t.closest("form").querySelector(".js-new-label-swatches");
                    n.hidden = !1, t.addEventListener("blur", function() {
                        n.hidden = !0
                    }, {
                        once: !0
                    })
                }), (0, X.q6)(".js-new-label-color-input", function(t) {
                    const e = t.target;
                    let n = e.value.trim();
                    if (!(n.length < 1))
                        if (n.indexOf("#") !== 0 && (n = `#${n}`, e.value = n), e.checkValidity()) {
                            e.classList.remove("color-fg-danger");
                            const s = e.closest("form").querySelector(".js-new-label-color");
                            xe(s, Kt().hex.rgb(n))
                        } else e.classList.add("color-fg-danger")
                }), (0, X.w4)("keyup", ".js-new-label-color-input", function(t) {
                    const e = t.target;
                    let n = e.value.trim();
                    if (n.indexOf("#") !== 0 && (n = `#${n}`, e.value = n), e.checkValidity()) {
                        const i = e.closest("form").querySelector(".js-new-label-color");
                        xe(i, Kt().hex.rgb(n))
                    }(0, f.f)(e, "change", !1);
                    const o = e.closest("form");
                    Xt(o)
                }), (0, X.w4)("keyup", ".js-new-label-description-input", function(t) {
                    const n = t.target.form;
                    Xt(n)
                }), (0, X.w4)("keyup", ".js-new-label-color-input", function(t) {
                    const n = t.target.form;
                    Xt(n)
                }), (0, f.on)("click", ".js-new-label-color", async function(t) {
                    const e = t.currentTarget,
                        n = Po();
                    Io(e, n), ce(e)
                }), (0, f.on)("mousedown", ".js-new-label-color-swatch", function(t) {
                    const e = t.currentTarget,
                        n = e.getAttribute("data-color");
                    Io(e, Kt().hex.rgb(n)), ce(e);
                    const o = e.closest(".js-new-label-swatches");
                    o.hidden = !0
                }), (0, f.on)("toggle", ".js-new-label-modal", function(t) {
                    t.target.hasAttribute("open") && mi(t.target)
                }, {
                    capture: !0
                });
                async function mi(t) {
                    const e = t.querySelector(".js-new-label-name-input");
                    if (!e) return;
                    const n = t.querySelector(".js-new-label-color-input"),
                        o = Po(),
                        s = `#${Kt().rgb.hex(o)}`;
                    n.value = s;
                    const i = t.querySelector(".js-new-label-color");
                    xe(i, o);
                    const c = document.querySelector(".js-new-label-name").textContent;
                    (0, Z.Se)(e, c), (0, Bn.OD)(e), ce(i)
                }
                r(mi, "initLabelModal"), (0, K.AC)(".js-new-label-modal-form", async function(t, e) {
                    const n = t.querySelector(".js-new-label-error");
                    let o;
                    try {
                        o = await e.html()
                    } catch (c) {
                        const l = c.response.json;
                        n.textContent = l.message, n.hidden = !1
                    }
                    if (!o) return;
                    n.hidden = !0, document.querySelector(".js-new-label-modal").removeAttribute("open");
                    const s = document.querySelector(".js-filterable-issue-labels"),
                        i = o.html.querySelector("input");
                    s.prepend(o.html), i && i.dispatchEvent(new Event("change", {
                        bubbles: !0
                    }));
                    const a = document.querySelector(".js-label-filter-field");
                    a.value = a.defaultValue, a.focus()
                }), (0, f.on)("click", ".js-edit-label-cancel", function(t) {
                    const e = t.target.closest("form");
                    Xt(e), e.reset();
                    const n = e.querySelector(".js-new-label-color-input"),
                        o = n.value,
                        s = e.querySelector(".js-new-label-color");
                    xe(s, Kt().hex.rgb(o)), (0, Bn.Qc)(e), ce(n);
                    const i = t.currentTarget.closest(".js-labels-list-item");
                    if (i) {
                        i.querySelector(".js-update-label").classList.add("d-none");
                        const c = i.querySelector(".js-label-preview");
                        c && (c.classList.add("d-none"), i.querySelector(".js-label-link").classList.remove("d-none"));
                        const l = i.querySelectorAll(".js-hide-on-label-edit");
                        for (const d of l) d.hidden = !d.hidden
                    }
                }), (0, K.AC)(".js-update-label", async function(t, e) {
                    let n;
                    try {
                        n = await e.html()
                    } catch (s) {
                        const i = s.response.json;
                        Ro(t, i);
                        return
                    }
                    Xt(t), t.closest(".js-labels-list-item").replaceWith(n.html)
                }), (0, K.AC)(".js-create-label", async function(t, e) {
                    let n;
                    try {
                        n = await e.html()
                    } catch (a) {
                        const c = a.response.json;
                        Ro(t, c);
                        return
                    }
                    t.reset(), Xt(t), document.querySelector(".js-label-list").prepend(n.html), fi(1), di(t, !1);
                    const o = t.querySelector(".js-new-label-color"),
                        s = Po();
                    Io(o, s), ce(t.querySelector(".js-new-label-name-input")), (0, Bn.Qc)(t);
                    const i = t.closest(".js-details-container");
                    i instanceof HTMLElement && (0, Gn.Qp)(i)
                }), (0, f.on)("click", ".js-details-target-new-label", function() {
                    document.querySelector(".js-create-label").querySelector(".js-new-label-name-input").focus()
                }), (0, f.on)("click", ".js-edit-label", function(t) {
                    const e = t.currentTarget.closest(".js-labels-list-item"),
                        n = e.querySelector(".js-update-label");
                    n.classList.remove("d-none"), n.querySelector(".js-new-label-name-input").focus();
                    const s = e.querySelector(".js-label-preview");
                    s && (s.classList.remove("d-none"), e.querySelector(".js-label-link").classList.add("d-none"));
                    const i = e.querySelectorAll(".js-hide-on-label-edit");
                    for (const a of i) a.hidden = !a.hidden
                }), (0, K.AC)(".js-delete-label", async function(t, e) {
                    const n = t.closest(".js-labels-list-item");
                    n.querySelector(".js-label-delete-spinner").hidden = !1, await e.text();
                    const o = fi(-1);
                    di(t, o === 0), n.remove()
                });
                const An = (0, ee.D)(Kd, 500);
                (0, f.on)("suggester:complete", ".js-new-label-name-input", An), (0, X.q6)(".js-new-label-name-input", An), (0, X.q6)(".js-new-label-description-input", An), (0, X.q6)(".js-new-label-color-input", An), (0, X.w4)("keypress", ".js-new-label-name-input", function(t) {
                    const e = t.target,
                        n = parseInt(e.getAttribute("data-maxlength"));
                    (0, oe.rq)(e.value) >= n && t.preventDefault()
                }), (0, f.on)("click", ".js-issues-label-select-menu-item", function(t) {
                    !t.altKey && !t.shiftKey || (t.preventDefault(), t.stopPropagation(), t.altKey && (window.location.href = t.currentTarget.getAttribute("data-excluded-url")), t.shiftKey && (window.location.href = t.currentTarget.getAttribute("data-included-url")))
                }), (0, X.w4)("keydown", ".js-issues-label-select-menu-item", function(t) {
                    if (t.key !== "Enter" || !t.altKey && !t.shiftKey) return;
                    const e = t.currentTarget;
                    t.preventDefault(), t.stopPropagation(), e instanceof HTMLAnchorElement && (t.altKey && (window.location.href = e.getAttribute("data-excluded-url")), t.shiftKey && (window.location.href = e.getAttribute("data-included-url")))
                }), (0, f.on)("click", ".js-open-label-creation-modal", async function(t) {
                    t.stopImmediatePropagation();
                    const e = await (0, Rt.W)({
                        content: document.querySelector(".js-label-creation-template").content.cloneNode(!0),
                        detailsClass: "js-new-label-modal"
                    });
                    mi(e)
                }, {
                    capture: !0
                }), (0, f.on)("change", ".js-thread-notification-setting", Do), (0, f.on)("change", ".js-custom-thread-notification-option", Do), (0, f.on)("reset", ".js-custom-thread-settings-form", Do);

                function Do() {
                    const t = document.querySelector(".js-reveal-custom-thread-settings").checked,
                        e = !document.querySelector(".js-custom-thread-notification-option:checked"),
                        n = document.querySelector(".js-custom-thread-settings"),
                        o = document.querySelector("[data-custom-option-required-text]"),
                        s = t && e ? o.getAttribute("data-custom-option-required-text") : "";
                    o.setCustomValidity(s), n.hidden = !t
                }
                r(Do, "toggleEventSettings");
                var Xd = Object.defineProperty,
                    Gd = Object.getOwnPropertyDescriptor,
                    hi = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Gd(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Xd(e, n, s), s
                    }, "sidebar_widget_decorateClass");
                let No = r(class extends HTMLElement {
                    get activeClass() {
                        return this.getAttribute("active-class") || "collapsible-sidebar-widget-active"
                    }
                    get loadingClass() {
                        return this.getAttribute("loading-class") || "collapsible-sidebar-widget-loading"
                    }
                    get url() {
                        return this.getAttribute("url") || ""
                    }
                    get isOpen() {
                        return this.hasAttribute("open")
                    }
                    set isOpen(t) {
                        t ? this.setAttribute("open", "") : this.removeAttribute("open")
                    }
                    onKeyDown(t) {
                        if (t.code === "Enter" || t.code === "Space") return t.preventDefault(), this.load()
                    }
                    onMouseDown(t) {
                        return t.preventDefault(), this.load()
                    }
                    load() {
                        return this.pendingRequest ? this.pendingRequest.abort() : this.collapsible.hasAttribute("loaded") ? this.isOpen ? this.setClose() : this.setOpen() : (this.setLoading(), this.updateCollapsible())
                    }
                    setLoading() {
                        this.classList.add(this.loadingClass), this.classList.remove(this.activeClass)
                    }
                    setOpen() {
                        this.classList.add(this.activeClass), this.classList.remove(this.loadingClass), this.isOpen = !0
                    }
                    setClose() {
                        this.classList.remove(this.activeClass), this.classList.remove(this.loadingClass), this.isOpen = !1
                    }
                    handleAbort() {
                        this.pendingRequest = null, this.setClose()
                    }
                    async updateCollapsible() {
                        var t;
                        try {
                            this.pendingRequest = new AbortController, this.pendingRequest.signal.addEventListener("abort", () => this.handleAbort());
                            const e = await fetch(this.url, {
                                signal: (t = this.pendingRequest) == null ? void 0 : t.signal,
                                headers: {
                                    Accept: "text/html",
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            });
                            if (this.pendingRequest = null, !e.ok) return this.setClose();
                            const n = await e.text();
                            this.collapsible.innerHTML = n, this.collapsible.setAttribute("loaded", ""), this.setOpen()
                        } catch {
                            return this.pendingRequest = null, this.setClose()
                        }
                    }
                }, "CollapsibleSidebarWidgetElement");
                hi([I.fA], No.prototype, "collapsible", 2), No = hi([I.Ih], No);
                var Zd = Object.defineProperty,
                    Jd = Object.getOwnPropertyDescriptor,
                    Ct = r((t, e, n, o) => {
                        for (var s = o > 1 ? void 0 : o ? Jd(e, n) : e, i = t.length - 1, a; i >= 0; i--)(a = t[i]) && (s = (o ? a(e, n, s) : a(s)) || s);
                        return o && s && Zd(e, n, s), s
                    }, "sidebar_memex_input_decorateClass");
                let yt = r(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.url = "", this.csrf = "", this.instrument = "", this.column = 1
                    }
                    get isDisabled() {
                        var t;
                        return (t = this.read) == null ? void 0 : t.hasAttribute("disabled")
                    }
                    set hasErrored(t) {
                        t ? this.setAttribute("errored", "") : this.removeAttribute("errored")
                    }
                    set disabled(t) {
                        t ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
                    }
                    get hasExpanded() {
                        return this.read.getAttribute("aria-expanded") === "true"
                    }
                    connectedCallback() {
                        var t, e;
                        this.disabled = (e = (t = this.read) == null ? void 0 : t.disabled) != null ? e : !0, this.querySelector("details") !== null && this.classList.toggle("no-pointer")
                    }
                    handleDetailsSelect(t) {
                        var e;
                        const n = t,
                            o = t.target,
                            s = (e = n.detail) == null ? void 0 : e.relatedTarget,
                            i = o.closest("details"),
                            a = i == null ? void 0 : i.querySelector("[data-menu-button]");
                        if (s.getAttribute("aria-checked") === "true") {
                            s.setAttribute("aria-checked", "false"), t.preventDefault();
                            for (const c of this.inputs)
                                if (s.contains(c)) {
                                    this.updateCell(c.name, ""), (a == null ? void 0 : a.innerHTML) && (a.innerHTML = c.placeholder);
                                    break
                                }
                            i == null || i.removeAttribute("open")
                        }
                    }
                    handleDetailsSelected(t) {
                        var e;
                        const o = (e = t.detail) == null ? void 0 : e.relatedTarget;
                        for (const s of this.inputs)
                            if (o.contains(s)) {
                                this.updateCell(s.name, s.value);
                                break
                            }
                    }
                    mouseDownFocus(t) {
                        !this.isDisabled || this.onFocus(t)
                    }
                    keyDownFocus(t) {
                        (t.code === "Enter" || t.code === "Space") && this.read !== document.activeElement && this.onFocus(t)
                    }
                    onChange(t) {
                        var e, n;
                        t.target.getAttribute("type") !== "date" && this.updateCell((e = this.read) == null ? void 0 : e.name, (n = this.read) == null ? void 0 : n.value)
                    }
                    onFocus(t) {
                        t.preventDefault(), this.disabled = !1, this.read.disabled = !1, this.read.focus()
                    }
                    onBlur(t) {
                        var e, n;
                        if (this.hasExpanded) {
                            t.preventDefault();
                            return
                        }
                        t.target.getAttribute("type") === "date" && this.updateCell((e = this.read) == null ? void 0 : e.name, (n = this.read) == null ? void 0 : n.value), this.read.disabled = !0, this.disabled = !0
                    }
                    onKeyDown(t) {
                        if (t.code === "Enter" || t.code === "Tab") {
                            if (t.preventDefault(), t.stopPropagation(), this.hasExpanded) return;
                            this.read.blur()
                        }
                    }
                    async updateCell(t = "", e = "") {
                        const n = new FormData;
                        n.set(t, e), n.set("ui", this.instrument);
                        for (const s of this.parameters) n.set(s.name, s.value);
                        const o = Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            timeZone: "UTC"
                        });
                        try {
                            if (this.write) {
                                const h = this.read.value,
                                    j = this.read.type === "date" && h ? o.format(Date.parse(h)) : h;
                                this.write.textContent = h ? j : this.read.placeholder
                            }
                            const s = await fetch(this.url, {
                                method: "PUT",
                                body: n,
                                headers: {
                                    Accept: "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Scoped-CSRF-Token": `${this.csrf}`
                                }
                            });
                            if (!s.ok) throw new Error("connection error");
                            if (!this.write) return;
                            const c = (await s.json()).memexProjectItem.memexProjectColumnValues.find(h => h.memexProjectColumnId === Number(this.column)).value,
                                l = this.read.type === "date" ? Date.parse(c.value) : c.html,
                                d = this.read.type === "date" && l ? o.format(l) : l;
                            this.write.innerHTML = e ? d : this.read.placeholder
                        } catch {
                            this.hasErrored = !0
                        }
                    }
                }, "SidebarMemexInputElement");
                Ct([I.Lj], yt.prototype, "url", 2), Ct([I.Lj], yt.prototype, "csrf", 2), Ct([I.Lj], yt.prototype, "instrument", 2), Ct([I.Lj], yt.prototype, "column", 2), Ct([I.GO], yt.prototype, "inputs", 2), Ct([I.fA], yt.prototype, "read", 2), Ct([I.fA], yt.prototype, "write", 2), Ct([I.GO], yt.prototype, "parameters", 2), yt = Ct([I.Ih], yt);

                function Me(t, e = !1) {
                    (e || !Qd(t)) && (t instanceof HTMLFormElement ? (0, Z.Bt)(t) : Cn(t))
                }
                r(Me, "submitForm");

                function pi(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-issue-sidebar-form") || e.querySelector(".js-issue-sidebar-form");
                    Me(n)
                }
                r(pi, "submitOnMenuClose"), (0, f.on)("details-menu-selected", ".js-discussion-sidebar-menu", function(t) {
                    const e = t.detail.relatedTarget,
                        n = t.currentTarget,
                        o = e.closest(".js-issue-sidebar-form"),
                        s = n.hasAttribute("data-multiple");
                    if (e.hasAttribute("data-clear-assignees")) {
                        const i = n.querySelectorAll('input[name="issue[user_assignee_ids][]"]:checked');
                        for (const a of i) a.disabled = !1, a.checked = !1;
                        Me(o)
                    } else s ? n.closest("details").addEventListener("toggle", pi, {
                        once: !0
                    }) : Me(o)
                }, {
                    capture: !0
                });

                function Yd(t, e) {
                    t.replaceWith((0, Lt.r)(document, e))
                }
                r(Yd, "updateSidebar");

                function gi(t) {
                    const e = document.querySelector(`[data-menu-trigger="${t}"]`);
                    e == null || e.focus()
                }
                r(gi, "returnFocusToTrigger"), (0, K.AC)(".js-issue-sidebar-form", async function(t, e) {
                    var n;
                    const o = await e.html(),
                        s = t.closest(".js-discussion-sidebar-item"),
                        i = (n = s == null ? void 0 : s.querySelector(".select-menu")) == null ? void 0 : n.getAttribute("id");
                    s.replaceWith(o.html), i && gi(i)
                }), (0, f.on)("click", "div.js-issue-sidebar-form .js-suggested-reviewer", function(t) {
                    const e = t.currentTarget,
                        n = e.closest(".js-issue-sidebar-form");
                    Cn(n, "post", {
                        name: e.name,
                        value: e.value
                    }), t.preventDefault()
                }), (0, f.on)("click", "div.js-issue-sidebar-form .js-issue-assign-self", function(t) {
                    var e;
                    const n = t.currentTarget,
                        o = n.closest(".js-issue-sidebar-form");
                    Cn(o, "post", {
                        name: n.name,
                        value: n.value
                    }), n.remove(), (e = document.querySelector("form#new_issue .is-submit-button-value")) == null || e.remove(), t.preventDefault()
                }), (0, f.on)("click", ".js-issue-unassign-self", function(t) {
                    const e = t.currentTarget.closest(".js-issue-sidebar-form");
                    Cn(e, "delete"), t.preventDefault()
                }), (0, K.AC)(".js-pages-preview-toggle-form", async function(t, e) {
                    const n = await e.json();
                    t.querySelector("button.btn").textContent = n.json.new_button_value
                });
                async function Cn(t, e = "post", n) {
                    var o;
                    const s = bi(t);
                    n && s.append(n.name, n.value);
                    const i = t.getAttribute("data-url");
                    if (!i) return;
                    const a = t.querySelector(".js-data-url-csrf"),
                        c = await fetch(i, {
                            method: e,
                            body: e === "delete" ? "" : s,
                            mode: "same-origin",
                            headers: {
                                "Scoped-CSRF-Token": a.value,
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                    if (!c.ok) return;
                    const l = await c.text();
                    Yd(t.closest(".js-discussion-sidebar-item"), l);
                    const d = t.closest(".js-discussion-sidebar-item"),
                        h = (o = d == null ? void 0 : d.querySelector(".select-menu")) == null ? void 0 : o.getAttribute("id");
                    h && gi(h)
                }
                r(Cn, "previewSubmit");

                function Qd(t) {
                    const e = t.getAttribute("data-reviewers-team-size-check-url");
                    if (!e) return !1;
                    const n = [...document.querySelectorAll(".js-reviewer-team")].map(c => c.getAttribute("data-id")),
                        o = t instanceof HTMLFormElement ? new FormData(t) : bi(t),
                        i = new URLSearchParams(o).getAll("reviewer_team_ids[]").filter(c => !n.includes(c));
                    if (i.length === 0) return !1;
                    const a = new URLSearchParams(i.map(c => ["reviewer_team_ids[]", c]));
                    return tf(t, `${e}?${a}`), !0
                }
                r(Qd, "reviewerTeamsCheckRequired");
                async function tf(t, e) {
                    const n = await fetch(e);
                    if (!n.ok) return;
                    const o = await n.text();
                    if (o.match(/[^\w-]js-large-team[^\w-]/)) ef(t, o);
                    else {
                        Me(t, !0);
                        return
                    }
                }
                r(tf, "triggerTeamReviewerCheck");

                function ef(t, e) {
                    const n = t.querySelector(".js-large-teams-check-warning-container");
                    for (; n.firstChild;) n.removeChild(n.firstChild);
                    n.appendChild((0, Lt.r)(document, e));
                    const o = n.querySelector("details");

                    function s(i) {
                        if (i.target instanceof Element) {
                            if (o.open = !1, !i.target.classList.contains("js-large-teams-request-button")) {
                                const a = t.querySelectorAll("input[name='reviewer_team_ids[]']");
                                for (const c of a) n.querySelector(`.js-large-team[data-id='${c.value}']`) && (c.checked = !1)
                            }
                            Me(t, !0), i.preventDefault()
                        }
                    }
                    r(s, "dialogAction"), n.querySelector(".js-large-teams-request-button").addEventListener("click", s, {
                        once: !0
                    }), n.querySelector(".js-large-teams-do-not-request-button").addEventListener("click", s, {
                        once: !0
                    }), o.addEventListener("details-dialog-close", s, {
                        once: !0
                    }), o.open = !0
                }
                r(ef, "showTeamReviewerConfirmationDialog"), (0, f.on)("click", "div.js-project-column-menu-container .js-project-column-menu-item button", async function(t) {
                    const e = t.currentTarget;
                    nf(e);
                    const n = e.getAttribute("data-url"),
                        o = e.parentElement.querySelector(".js-data-url-csrf"),
                        s = e.getAttribute("data-card-id"),
                        i = new FormData;
                    if (i.append("card_id", s), i.append("use_automation_prioritization", "true"), t.preventDefault(), !(await fetch(n, {
                            method: "PUT",
                            mode: "same-origin",
                            body: i,
                            headers: {
                                "Scoped-CSRF-Token": o.value,
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })).ok) return;
                    const c = document.activeElement,
                        l = e.closest(".js-project-column-menu-dropdown");
                    if (c && l.contains(c)) try {
                        c.blur()
                    } catch {}
                });

                function nf(t) {
                    const n = t.closest(".js-project-column-menu-dropdown").querySelector(".js-project-column-menu-summary"),
                        o = t.getAttribute("data-column-name");
                    n.textContent = o
                }
                r(nf, "updateProjectColumnMenuSummary"), (0, f.on)("click", ".js-prompt-dismiss", function(t) {
                    t.currentTarget.closest(".js-prompt").remove()
                });

                function bi(t) {
                    const e = t.closest("form"),
                        o = new FormData(e).entries(),
                        s = new FormData;
                    for (const [i, a] of o) e.contains( of (e, i, a.toString())) && s.append(i, a);
                    return s
                }
                r(bi, "scopedFormData");

                function of (t, e, n) {
                    for (const o of t.elements)
                        if ((o instanceof HTMLInputElement || o instanceof HTMLTextAreaElement || o instanceof HTMLButtonElement) && o.name === e && o.value === n) return o;
                    return null
                }
                r( of , "findParam"), (0, f.on)("click", ".js-convert-to-draft", function(t) {
                    const e = t.currentTarget.getAttribute("data-url"),
                        n = t.currentTarget.parentElement.querySelector(".js-data-url-csrf");
                    fetch(e, {
                        method: "POST",
                        mode: "same-origin",
                        headers: {
                            "Scoped-CSRF-Token": n.value,
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    })
                }), (0, f.on)("click", "div.js-restore-item", async function(t) {
                    const e = t.currentTarget.getAttribute("data-url"),
                        n = t.currentTarget.getAttribute("data-column"),
                        o = t.currentTarget.querySelector(".js-data-url-csrf"),
                        s = new FormData;
                    if (s.set("memexProjectItemIds[]", n), !(await fetch(e, {
                            method: "PUT",
                            mode: "same-origin",
                            body: s,
                            headers: {
                                "Scoped-CSRF-Token": o.value,
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })).ok) throw new Error("connection error");
                    pi(t)
                })
            },
            2235: (_, M, u) => {
                "use strict";
                u.d(M, {
                    S: () => q
                });

                function w(y) {
                    const m = document.querySelectorAll(y);
                    if (m.length > 0) return m[m.length - 1]
                }
                r(w, "queryLast");

                function A() {
                    const y = w("meta[name=analytics-location]");
                    return y ? y.content : window.location.pathname
                }
                r(A, "pagePathname");

                function P() {
                    const y = w("meta[name=analytics-location-query-strip]");
                    let m = "";
                    y || (m = window.location.search);
                    const g = w("meta[name=analytics-location-params]");
                    g && (m += (m ? "&" : "?") + g.content);
                    for (const p of document.querySelectorAll("meta[name=analytics-param-rename]")) {
                        const L = p.content.split(":", 2);
                        m = m.replace(new RegExp(`(^|[?&])${L[0]}($|=)`, "g"), `$1${L[1]}$2`)
                    }
                    return m
                }
                r(P, "pageQuery");

                function q() {
                    return `${window.location.protocol}//${window.location.host}${A()+P()}`
                }
                r(q, "requestUri")
            },
            49908: () => {
                let _, M = !1;

                function u() {
                    _ = document.activeElement, document.body && document.body.classList.toggle("intent-mouse", M)
                }
                r(u, "setClass"), document.addEventListener("mousedown", function() {
                    M = !0, _ === document.activeElement && u()
                }, {
                    capture: !0
                }), document.addEventListener("keydown", function() {
                    M = !1
                }, {
                    capture: !0
                }), document.addEventListener("focusin", u, {
                    capture: !0
                })
            },
            81266: (_, M, u) => {
                "use strict";
                u.d(M, {
                    OD: () => m,
                    Qc: () => g,
                    nz: () => y
                });
                var w = u(77434),
                    A = u(84570);

                function P(p, L, E) {
                    const b = E.closest(".js-characters-remaining-container");
                    if (!b) return;
                    const C = b.querySelector(".js-characters-remaining"),
                        x = String(C.getAttribute("data-suffix")),
                        $ = (0, w.rq)(p),
                        H = L - $;
                    H <= 20 ? (C.textContent = `${H} ${x}`, C.classList.toggle("color-fg-danger", H <= 5), C.hidden = !1) : C.hidden = !0
                }
                r(P, "showRemainingCharacterCount");

                function q(p) {
                    return p.hasAttribute("data-maxlength") ? parseInt(p.getAttribute("data-maxlength") || "") : p.maxLength
                }
                r(q, "getFieldLimit");

                function y(p) {
                    const L = q(p),
                        E = (0, w.rq)(p.value);
                    return L - E < 0
                }
                r(y, "hasExceededCharacterLimit");

                function m(p) {
                    const L = q(p);
                    P(p.value, L, p)
                }
                r(m, "updateInputRemainingCharacters");

                function g(p) {
                    const L = p.querySelectorAll(".js-characters-remaining-container");
                    for (const E of L) {
                        const b = E.querySelector(".js-characters-remaining-field");
                        m(b)
                    }
                }
                r(g, "resetCharactersRemainingCounts"), (0, A.ZG)(".js-characters-remaining-field", function(p) {
                    function L() {
                        (p instanceof HTMLInputElement || p instanceof HTMLTextAreaElement) && m(p)
                    }
                    r(L, "onInput"), L(), p.addEventListener("input", L), p.addEventListener("blur", () => {
                        p.removeEventListener("input", L)
                    }, {
                        once: !0
                    })
                })
            },
            24473: () => {
                document.addEventListener("click", function(_) {
                    if (!(_.target instanceof Element)) return;
                    const M = "a[data-confirm], input[type=submit][data-confirm], input[type=checkbox][data-confirm], button[data-confirm]",
                        u = _.target.closest(M);
                    if (!u) return;
                    const w = u.getAttribute("data-confirm");
                    !w || u instanceof HTMLInputElement && u.hasAttribute("data-confirm-checked") && !u.checked || confirm(w) || (_.stopImmediatePropagation(), _.preventDefault())
                }, !0)
            },
            17364: (_, M, u) => {
                "use strict";
                u.d(M, {
                    $: () => p,
                    G: () => g
                });
                var w = u(86404),
                    A = u(64463),
                    P = u(59753);
                (0, A.N7)("include-fragment, poll-include-fragment", {
                    subscribe: E => (0, w.qC)((0, w.RB)(E, "error", m), (0, w.RB)(E, "loadstart", y))
                }), (0, P.on)("click", "include-fragment button[data-retry-button]", ({
                    currentTarget: E
                }) => {
                    const b = E.closest("include-fragment"),
                        C = b.src;
                    b.src = "", b.src = C
                });

                function q(E, b) {
                    const C = E.currentTarget;
                    if (C instanceof Element) {
                        for (const x of C.querySelectorAll("[data-show-on-error]")) x instanceof HTMLElement && (x.hidden = !b);
                        for (const x of C.querySelectorAll("[data-hide-on-error]")) x instanceof HTMLElement && (x.hidden = b)
                    }
                }
                r(q, "toggleElements");

                function y(E) {
                    q(E, !1)
                }
                r(y, "onLoad");

                function m(E) {
                    q(E, !0)
                }
                r(m, "onError");

                function g({
                    currentTarget: E
                }) {
                    E instanceof Element && p(E)
                }
                r(g, "loadDeferredContentByEvent");

                function p(E) {
                    const b = E.closest("details");
                    b && L(b)
                }
                r(p, "loadDeferredContent");

                function L(E) {
                    const b = E.getAttribute("data-deferred-details-content-url");
                    if (b) {
                        E.removeAttribute("data-deferred-details-content-url");
                        const C = E.querySelector("include-fragment, poll-include-fragment");
                        C && (C.src = b)
                    }
                }
                r(L, "setIncludeFragmentSrc")
            },
            13728: () => {
                document.addEventListener("pjax:click", function(_) {
                    if (window.onbeforeunload) return _.preventDefault()
                })
            },
            23651: (_, M, u) => {
                "use strict";
                u.d(M, {
                    k: () => y
                });
                var w = u(86404),
                    A = u(34782),
                    P = u(64463),
                    q = u(86276);
                (0, P.N7)(".js-responsive-underlinenav", {
                    constructor: HTMLElement,
                    subscribe: p => (y(p), (0, w.RB)(window, "resize", () => g(p)))
                });
                async function y(p) {
                    await A.C, g(p)
                }
                r(y, "asyncCalculateVisibility");

                function m(p, L) {
                    p.style.visibility = L ? "hidden" : "";
                    const E = p.getAttribute("data-tab-item");
                    if (E) {
                        const b = document.querySelector(`[data-menu-item=${E}]`);
                        b instanceof HTMLElement && (b.hidden = !L)
                    }
                }
                r(m, "toggleItem");

                function g(p) {
                    const L = p.querySelectorAll(".js-responsive-underlinenav-item"),
                        E = p.querySelector(".js-responsive-underlinenav-overflow"),
                        b = (0, q.oE)(E, p);
                    if (!b) return;
                    let C = !1;
                    for (const x of L) {
                        const $ = (0, q.oE)(x, p);
                        if ($) {
                            const H = $.left + x.offsetWidth >= b.left;
                            m(x, H), C = C || H
                        }
                    }
                    E.style.visibility = C ? "" : "hidden"
                }
                r(g, "calculateVisibility")
            },
            74675: () => {
                document.addEventListener("pjax:end", function() {
                    const _ = document.querySelector('meta[name="selected-link"]'),
                        M = _ && _.getAttribute("value");
                    if (!!M)
                        for (const u of document.querySelectorAll(".js-sidenav-container-pjax .js-selected-navigation-item")) {
                            const w = (u.getAttribute("data-selected-links") || "").split(" ").indexOf(M) >= 0;
                            w ? u.setAttribute("aria-current", "page") : u.removeAttribute("aria-current"), u.classList.toggle("selected", w)
                        }
                })
            },
            59371: () => {
                function _(w) {
                    const A = document.querySelector(".js-stale-session-flash"),
                        P = A.querySelector(".js-stale-session-flash-signed-in"),
                        q = A.querySelector(".js-stale-session-flash-signed-out");
                    A.hidden = !1, P.hidden = w === "false", q.hidden = w === "true", window.addEventListener("popstate", function(y) {
                        y.state && y.state.container != null && location.reload()
                    }), document.addEventListener("submit", function(y) {
                        y.preventDefault()
                    })
                }
                r(_, "sessionChanged");
                let M;
                if (typeof BroadcastChannel == "function") try {
                    M = new BroadcastChannel("stale-session"), M.onmessage = w => {
                        typeof w.data == "string" && _(w.data)
                    }
                } catch {}
                if (!M) {
                    let w = !1;
                    M = {
                        postMessage(A) {
                            w = !0;
                            try {
                                window.localStorage.setItem("logged-in", A)
                            } finally {
                                w = !1
                            }
                        }
                    }, window.addEventListener("storage", function(A) {
                        if (!w && A.storageArea === window.localStorage && A.key === "logged-in") try {
                            (A.newValue === "true" || A.newValue === "false") && _(A.newValue)
                        } finally {
                            window.localStorage.removeItem(A.key)
                        }
                    })
                }
                const u = document.querySelector(".js-stale-session-flash[data-signedin]");
                if (u) {
                    const w = u.getAttribute("data-signedin") || "";
                    M.postMessage(w)
                }
            },
            64048: (_, M, u) => {
                "use strict";
                var w = u(11793),
                    A = u(59753),
                    P = u(64463);
                class q {
                    constructor(m) {
                        this.container = m.container, this.selections = m.selections, this.inputWrap = m.inputWrap, this.input = m.input, this.tagTemplate = m.tagTemplate, this.form = this.input.form, this.autoComplete = m.autoComplete, this.multiTagInput = m.multiTagInput
                    }
                    setup() {
                        this.container.addEventListener("click", m => {
                            m.target.closest(".js-remove") ? this.removeTag(m) : this.onFocus()
                        }), this.input.addEventListener("focus", this.onFocus.bind(this)), this.input.addEventListener("blur", this.onBlur.bind(this)), this.input.addEventListener("keydown", this.onKeyDown.bind(this)), this.form.addEventListener("submit", this.onSubmit.bind(this)), this.autoComplete.addEventListener("auto-complete-change", () => {
                            this.selectTag(this.autoComplete.value)
                        })
                    }
                    onFocus() {
                        this.inputWrap.classList.add("focus"), this.input !== document.activeElement && this.input.focus()
                    }
                    onBlur() {
                        this.inputWrap.classList.remove("focus"), this.autoComplete.open || this.onSubmit()
                    }
                    onSubmit() {
                        this.input.value && (this.selectTag(this.input.value), this.autoComplete.open = !1)
                    }
                    onKeyDown(m) {
                        switch ((0, w.EL)(m)) {
                            case "Backspace":
                                this.onBackspace();
                                break;
                            case "Enter":
                            case "Tab":
                                this.taggifyValueWhenSuggesterHidden(m);
                                break;
                            case ",":
                            case " ":
                                this.taggifyValue(m);
                                break
                        }
                    }
                    taggifyValueWhenSuggesterHidden(m) {
                        !this.autoComplete.open && this.input.value && (m.preventDefault(), this.selectTag(this.input.value))
                    }
                    taggifyValue(m) {
                        this.input.value && (m.preventDefault(), this.selectTag(this.input.value), this.autoComplete.open = !1)
                    }
                    selectTag(m) {
                        const g = this.normalizeTag(m),
                            p = this.selectedTags();
                        let L = !1;
                        for (let E = 0; E < g.length; E++) {
                            const b = g[E];
                            p.indexOf(b) < 0 && (this.selections.appendChild(this.templateTag(b)), L = !0)
                        }
                        L && (this.input.value = "", (0, A.f)(this.form, "tags:changed"))
                    }
                    removeTag(m) {
                        const g = m.target;
                        m.preventDefault(), g.closest(".js-tag-input-tag").remove(), (0, A.f)(this.form, "tags:changed")
                    }
                    templateTag(m) {
                        const g = this.tagTemplate.cloneNode(!0);
                        return g.querySelector("input").value = m, g.querySelector(".js-placeholder-tag-name").replaceWith(m), g.classList.remove("d-none", "js-template"), g
                    }
                    normalizeTag(m) {
                        const g = m.toLowerCase().trim();
                        return g ? this.multiTagInput ? g.split(/[\s,']+/) : [g.replace(/[\s,']+/g, "-")] : []
                    }
                    onBackspace() {
                        if (!this.input.value) {
                            const m = this.selections.querySelector("li:last-child .js-remove");
                            m instanceof HTMLElement && m.click()
                        }
                    }
                    selectedTags() {
                        const m = this.selections.querySelectorAll("input");
                        return Array.from(m).map(g => g.value).filter(g => g.length > 0)
                    }
                }
                r(q, "TagInput"), (0, P.N7)(".js-tag-input-container", {
                    constructor: HTMLElement,
                    initialize(y) {
                        new q({
                            container: y,
                            inputWrap: y.querySelector(".js-tag-input-wrapper"),
                            input: y.querySelector('input[type="text"], input:not([type])'),
                            selections: y.querySelector(".js-tag-input-selected-tags"),
                            tagTemplate: y.querySelector(".js-template"),
                            autoComplete: y.querySelector("auto-complete"),
                            multiTagInput: !1
                        }).setup()
                    }
                }), (0, P.N7)(".js-multi-tag-input-container", {
                    constructor: HTMLElement,
                    initialize(y) {
                        new q({
                            container: y,
                            inputWrap: y.querySelector(".js-tag-input-wrapper"),
                            input: y.querySelector('input[type="text"], input:not([type])'),
                            selections: y.querySelector(".js-tag-input-selected-tags"),
                            tagTemplate: y.querySelector(".js-template"),
                            autoComplete: y.querySelector("auto-complete"),
                            multiTagInput: !0
                        }).setup()
                    }
                })
            },
            34078: (_, M, u) => {
                "use strict";
                u.d(M, {
                    P: () => P,
                    g: () => q
                });
                var w = u(59753);
                const A = new WeakMap;

                function P(g) {
                    return A.get(g)
                }
                r(P, "getCodeEditor");
                async function q(g) {
                    return A.get(g) || y(await m(g, "codeEditor:ready"))
                }
                r(q, "getAsyncCodeEditor");

                function y(g) {
                    if (!(g instanceof CustomEvent)) throw new Error("assert: event is not a CustomEvent");
                    const p = g.detail.editor;
                    if (!g.target) throw new Error("assert: event.target is null");
                    return A.set(g.target, p), p
                }
                r(y, "onEditorFromEvent"), (0, w.on)("codeEditor:ready", ".js-code-editor", y);

                function m(g, p) {
                    return new Promise(L => {
                        g.addEventListener(p, L, {
                            once: !0
                        })
                    })
                }
                r(m, "nextEvent")
            },
            81503: (_, M, u) => {
                "use strict";
                u.d(M, {
                    $1: () => w,
                    d8: () => P,
                    kT: () => q
                });

                function w(y) {
                    const m = [];
                    for (const g of A()) {
                        const [p, L] = g.trim().split("=");
                        y === p && typeof L != "undefined" && m.push({
                            key: p,
                            value: L
                        })
                    }
                    return m
                }
                r(w, "getCookies");

                function A() {
                    try {
                        return document.cookie.split(";")
                    } catch {
                        return []
                    }
                }
                r(A, "readCookies");

                function P(y, m, g = null, p = !1, L = "lax") {
                    let E = document.domain;
                    if (E == null) throw new Error("Unable to get document domain");
                    E.endsWith(".github.com") && (E = "github.com");
                    const b = location.protocol === "https:" ? "; secure" : "",
                        C = g ? `; expires=${g}` : "";
                    p === !1 && (E = `.${E}`);
                    try {
                        document.cookie = `${y}=${m}; path=/; domain=${E}${C}${b}; samesite=${L}`
                    } catch {}
                }
                r(P, "setCookie");

                function q(y, m = !1) {
                    let g = document.domain;
                    if (g == null) throw new Error("Unable to get document domain");
                    g.endsWith(".github.com") && (g = "github.com");
                    const p = new Date().getTime(),
                        L = new Date(p - 1).toUTCString(),
                        E = location.protocol === "https:" ? "; secure" : "",
                        b = `; expires=${L}`;
                    m === !1 && (g = `.${g}`);
                    try {
                        document.cookie = `${y}=''; path=/; domain=${g}${b}${E}`
                    } catch {}
                }
                r(q, "deleteCookie")
            },
            26360: (_, M, u) => {
                "use strict";
                u.d(M, {
                    LN: () => E,
                    aJ: () => wt,
                    cI: () => J,
                    eK: () => C,
                    mT: () => b
                });
                var w = u(79785),
                    A = u(43452),
                    P = u(82918),
                    q = u(50232),
                    y = u(28382),
                    m = u(2235);
                let g = !1,
                    p = 0;
                const L = Date.now();

                function E(W) {
                    W.error && x(H($(W.error)))
                }
                r(E, "reportEvent");
                async function b(W) {
                    if (!!W.promise) try {
                        await W.promise
                    } catch (S) {
                        x(H($(S)))
                    }
                }
                r(b, "reportPromiseRejectionEvent");

                function C(W, S = {}) {
                    W && W.name !== "AbortError" && x(H($(W), S))
                }
                r(C, "reportError");
                async function x(W) {
                    var S, R;
                    if (!kt()) return;
                    const D = (R = (S = document.head) == null ? void 0 : S.querySelector('meta[name="browser-errors-url"]')) == null ? void 0 : R.content;
                    if (!!D) {
                        if (dt(W.error.stacktrace)) {
                            g = !0;
                            return
                        }
                        p++;
                        try {
                            await fetch(D, {
                                method: "post",
                                body: JSON.stringify(W)
                            })
                        } catch {}
                    }
                }
                r(x, "report");

                function $(W) {
                    return {
                        type: W.name,
                        value: W.message,
                        stacktrace: J(W)
                    }
                }
                r($, "formatError");

                function H(W, S = {}) {
                    return Object.assign({
                        error: W,
                        sanitizedUrl: (0, m.S)() || window.location.href,
                        readyState: document.readyState,
                        referrer: (0, w.wP)(),
                        timeSinceLoad: Math.round(Date.now() - L),
                        user: wt() || void 0,
                        bundler: Ie()
                    }, S)
                }
                r(H, "errorContext");

                function J(W) {
                    return (0, y.Q)(W.stack || "").map(S => ({
                        filename: S.file || "",
                        function: String(S.methodName),
                        lineno: (S.lineNumber || 0).toString(),
                        colno: (S.column || 0).toString()
                    }))
                }
                r(J, "stacktrace");
                const Y = /(chrome|moz|safari)-extension:\/\//;

                function dt(W) {
                    return W.some(S => Y.test(S.filename) || Y.test(S.function))
                }
                r(dt, "isExtensionError");

                function wt() {
                    var W, S;
                    const R = (S = (W = document.head) == null ? void 0 : W.querySelector('meta[name="user-login"]')) == null ? void 0 : S.content;
                    return R || `anonymous-${(0,P.b)()}`
                }
                r(wt, "pageUser");
                let it = !1;
                window.addEventListener("pageshow", () => it = !1), window.addEventListener("pagehide", () => it = !0), document.addEventListener("soft-nav:error", () => {
                    x(H({
                        type: "SoftNavError",
                        value: (0, w.Wl)() || "reload",
                        stacktrace: J(new Error)
                    }))
                });

                function kt() {
                    return !it && !g && p < 10 && (0, q.Gb)() && !(0, A.Z)(document)
                }
                r(kt, "reportable");

                function Ie() {
                    return "webpack"
                }
                r(Ie, "bundlerName"), typeof BroadcastChannel == "function" && new BroadcastChannel("shared-worker-error").addEventListener("message", S => {
                    C(S.data.error)
                })
            },
            95186: (_, M, u) => {
                "use strict";
                u.d(M, {
                    Y: () => m,
                    q: () => g
                });
                var w = u(88149),
                    A = u(86058);
                const P = "dimension_";
                let q;
                try {
                    const p = (0, w.n)("octolytics");
                    delete p.baseContext, q = new A.R(p)
                } catch {}

                function y(p) {
                    const L = (0, w.n)("octolytics").baseContext || {};
                    if (L) {
                        delete L.app_id, delete L.event_url, delete L.host;
                        for (const b in L) b.startsWith(P) && (L[b.replace(P, "")] = L[b], delete L[b])
                    }
                    const E = document.querySelector("meta[name=visitor-payload]");
                    if (E) {
                        const b = JSON.parse(atob(E.content));
                        Object.assign(L, b)
                    }
                    return Object.assign(L, p)
                }
                r(y, "extendBaseContext");

                function m(p) {
                    q == null || q.sendPageView(y(p))
                }
                r(m, "sendPageView");

                function g(p, L) {
                    var E, b;
                    const C = (b = (E = document.head) == null ? void 0 : E.querySelector('meta[name="current-catalog-service"]')) == null ? void 0 : b.content,
                        x = C ? {
                            service: C
                        } : {};
                    for (const [$, H] of Object.entries(L)) H != null && (x[$] = `${H}`);
                    q == null || q.sendEvent(p || "unknown", y(x))
                }
                r(g, "sendEvent")
            },
            81654: (_, M, u) => {
                "use strict";
                u.d(M, {
                    $S: () => A,
                    Fk: () => P,
                    sz: () => q
                });
                var w = u(83476);

                function A(y, m, g) {
                    const p = {
                            hydroEventPayload: y,
                            hydroEventHmac: m,
                            visitorPayload: "",
                            visitorHmac: "",
                            hydroClientContext: g
                        },
                        L = document.querySelector("meta[name=visitor-payload]");
                    L instanceof HTMLMetaElement && (p.visitorPayload = L.content);
                    const E = document.querySelector("meta[name=visitor-hmac]") || "";
                    E instanceof HTMLMetaElement && (p.visitorHmac = E.content), (0, w.b)(p, !0)
                }
                r(A, "sendData");

                function P(y) {
                    const m = y.getAttribute("data-hydro-view") || "",
                        g = y.getAttribute("data-hydro-view-hmac") || "",
                        p = y.getAttribute("data-hydro-client-context") || "";
                    A(m, g, p)
                }
                r(P, "trackView");

                function q(y) {
                    const m = y.getAttribute("data-hydro-click-payload") || "",
                        g = y.getAttribute("data-hydro-click-hmac") || "",
                        p = y.getAttribute("data-hydro-client-context") || "";
                    A(m, g, p)
                }
                r(q, "sendHydroEvent")
            },
            19935: (_, M, u) => {
                "use strict";
                var w = u(27034);
                window.IncludeFragmentElement.prototype.fetch = A => (A.headers.append("X-Requested-With", "XMLHttpRequest"), window.fetch(A))
            },
            75552: (_, M, u) => {
                "use strict";
                u.d(M, {
                    vt: () => Y,
                    WF: () => J,
                    DV: () => H,
                    jW: () => kt,
                    Nc: () => b,
                    $t: () => P
                });
                const w = {
                    frequency: .6,
                    recency: .4
                };

                function A(S, R) {
                    return S.sort((D, z) => R(D) - R(z))
                }
                r(A, "sortBy");

                function P(S) {
                    const R = y(S),
                        D = m(S);
                    return function(z) {
                        return q(R.get(z) || 0, D.get(z) || 0)
                    }
                }
                r(P, "scorer");

                function q(S, R) {
                    return S * w.frequency + R * w.recency
                }
                r(q, "score");

                function y(S) {
                    const R = [...Object.values(S)].reduce((D, z) => D + z.visitCount, 0);
                    return new Map(Object.keys(S).map(D => [D, S[D].visitCount / R]))
                }
                r(y, "frequencyMap");

                function m(S) {
                    const R = A([...Object.keys(S)], z => S[z].lastVisitedAt),
                        D = R.length;
                    return new Map(R.map((z, Q) => [z, (Q + 1) / D]))
                }
                r(m, "recencyMap");
                const g = /^\/orgs\/([a-z0-9-]+)\/teams\/([\w-]+)/,
                    p = [/^\/([^/]+)\/([^/]+)\/?$/, /^\/([^/]+)\/([^/]+)\/blob/, /^\/([^/]+)\/([^/]+)\/tree/, /^\/([^/]+)\/([^/]+)\/issues/, /^\/([^/]+)\/([^/]+)\/pulls?/, /^\/([^/]+)\/([^/]+)\/pulse/],
                    L = [
                        ["organization", /^\/orgs\/([a-z0-9-]+)\/projects\/([0-9-]+)/],
                        ["repository", /^\/([^/]+)\/([^/]+)\/projects\/([0-9-]+)/]
                    ],
                    E = 100;

                function b(S) {
                    const R = S.match(g);
                    if (R) {
                        x(H(R[1], R[2]));
                        return
                    }
                    let D;
                    for (let Q = 0, ct = L.length; Q < ct; Q++) {
                        const [Et, Ft] = L[Q];
                        if (D = S.match(Ft), D) {
                            let rt = null,
                                Zt = null;
                            switch (Et) {
                                case "organization":
                                    rt = D[1], Zt = D[2];
                                    break;
                                case "repository":
                                    rt = `${D[1]}/${D[2]}`, Zt = D[3];
                                    break;
                                default:
                            }
                            rt && Zt && x(Y(rt, Zt));
                            return
                        }
                    }
                    let z;
                    for (let Q = 0, ct = p.length; Q < ct; Q++)
                        if (z = S.match(p[Q]), z) {
                            x(J(z[1], z[2]));
                            return
                        }
                }
                r(b, "logPageView");

                function C(S) {
                    const R = Object.keys(S);
                    if (R.length <= E) return S;
                    const D = P(S),
                        z = R.sort((Q, ct) => D(ct) - D(Q)).slice(0, E / 2);
                    return Object.fromEntries(z.map(Q => [Q, S[Q]]))
                }
                r(C, "limitedPageViews");

                function x(S) {
                    const R = kt(),
                        D = $(),
                        z = R[S] || {
                            lastVisitedAt: D,
                            visitCount: 0
                        };
                    z.visitCount += 1, z.lastVisitedAt = D, R[S] = z, it(C(R))
                }
                r(x, "logPageViewByKey");

                function $() {
                    return Math.floor(Date.now() / 1e3)
                }
                r($, "currentEpochTimeInSeconds");

                function H(S, R) {
                    return `team:${S}/${R}`
                }
                r(H, "buildTeamKey");

                function J(S, R) {
                    return `repository:${S}/${R}`
                }
                r(J, "buildRepositoryKey");

                function Y(S, R) {
                    return `project:${S}/${R}`
                }
                r(Y, "buildProjectKey");
                const dt = /^(team|repository|project):[^/]+\/[^/]+(\/([^/]+))?$/,
                    wt = "jump_to:page_views";

                function it(S) {
                    Ie(wt, JSON.stringify(S))
                }
                r(it, "setPageViewsMap");

                function kt() {
                    const S = W(wt);
                    if (!S) return {};
                    let R;
                    try {
                        R = JSON.parse(S)
                    } catch {
                        return it({}), {}
                    }
                    const D = {};
                    for (const z in R) z.match(dt) && (D[z] = R[z]);
                    return D
                }
                r(kt, "getPageViewsMap");

                function Ie(S, R) {
                    try {
                        window.localStorage.setItem(S, R)
                    } catch {}
                }
                r(Ie, "setItem");

                function W(S) {
                    try {
                        return window.localStorage.getItem(S)
                    } catch {
                        return null
                    }
                }
                r(W, "getItem")
            },
            75509: (_, M, u) => {
                "use strict";
                u.d(M, {
                    a: () => w
                });

                function w(y, m) {
                    const g = y.closest("[data-notification-id]");
                    m.hasAttribute("data-status") && A(g, m.getAttribute("data-status")), m.hasAttribute("data-subscription-status") && P(g, m.getAttribute("data-subscription-status")), m.hasAttribute("data-starred-status") && q(g, m.getAttribute("data-starred-status"))
                }
                r(w, "updateNotificationStates");

                function A(y, m) {
                    y.classList.toggle("notification-archived", m === "archived"), y.classList.toggle("notification-unread", m === "unread"), y.classList.toggle("notification-read", m === "read")
                }
                r(A, "toggleNotificationStatus");

                function P(y, m) {
                    y.classList.toggle("notification-unsubscribed", m === "unsubscribed")
                }
                r(P, "toggleNotificationSubscriptionStatus");

                function q(y, m) {
                    y.classList.toggle("notification-starred", m === "starred")
                }
                r(q, "toggleNotificationStarredStatus")
            },
            20963: (_, M, u) => {
                "use strict";
                u.d(M, {
                    X: () => A
                });
                var w = u(64463);

                function A() {
                    return /Windows/.test(navigator.userAgent) ? "windows" : /Macintosh/.test(navigator.userAgent) ? "mac" : null
                }
                r(A, "getPlatform");

                function P(q) {
                    const y = (q.getAttribute("data-platforms") || "").split(","),
                        m = A();
                    return Boolean(m && y.includes(m))
                }
                r(P, "runningOnPlatform"), (0, w.N7)(".js-remove-unless-platform", function(q) {
                    P(q) || q.remove()
                })
            },
            46836: (_, M, u) => {
                "use strict";
                u.d(M, {
                    LS: () => P,
                    cl: () => q,
                    rV: () => A
                });
                var w = u(60785);
                const {
                    getItem: A,
                    setItem: P,
                    removeItem: q
                } = (0, w.Z)("sessionStorage")
            },
            79785: (_, M, u) => {
                "use strict";
                u.d(M, {
                    Ak: () => b,
                    F6: () => J,
                    FP: () => L,
                    LD: () => p,
                    OE: () => g,
                    Po: () => m,
                    Wl: () => C,
                    Xk: () => $,
                    Ys: () => H,
                    wP: () => Y
                });
                var w = u(46836),
                    A = u(2235);
                const P = "soft-navigation-fail",
                    q = "soft-navigation-referrer",
                    y = "soft-navigation-marker";

                function m() {
                    return (0, w.rV)(y) === "1"
                }
                r(m, "inSoftNavigation");

                function g() {
                    return Boolean((0, w.rV)(P))
                }
                r(g, "hasSoftNavFailure");

                function p() {
                    (0, w.LS)(y, "1"), (0, w.LS)(q, (0, A.S)() || window.location.href)
                }
                r(p, "startSoftNav");

                function L() {
                    (0, w.LS)(y, "0")
                }
                r(L, "endSoftNav");

                function E() {
                    (0, w.LS)(y, "0"), (0, w.cl)(q), (0, w.cl)(P)
                }
                r(E, "clearSoftNav");

                function b(dt) {
                    (0, w.LS)(P, dt || "reload")
                }
                r(b, "setSoftNavFailReason");

                function C() {
                    return (0, w.rV)(P)
                }
                r(C, "getSoftNavFailReason");
                let x = 0;

                function $() {
                    x += 1, document.dispatchEvent(new CustomEvent("soft-nav", {
                        detail: x
                    }))
                }
                r($, "softNavSucceeded");

                function H() {
                    document.dispatchEvent(new CustomEvent("soft-nav:error", {
                        detail: (0, w.rV)(P) || "reload"
                    })), x = 0, E()
                }
                r(H, "softNavFailed");

                function J() {
                    document.dispatchEvent(new CustomEvent("soft-nav:initial-load")), x = 0, E()
                }
                r(J, "softNavInitial");

                function Y() {
                    return (0, w.rV)(q) || document.referrer
                }
                r(Y, "getSoftNavReferrer")
            },
            37713: (_, M, u) => {
                "use strict";
                u.d(M, {
                    kc: () => q,
                    lA: () => y,
                    zT: () => P
                });
                var w = u(14037),
                    A = u(54235);

                function P(m) {
                    const g = m.ownerDocument;
                    setTimeout(() => {
                        g && g.defaultView && (m.scrollIntoView(), g.defaultView.scrollBy(0, -y(g)))
                    }, 0)
                }
                r(P, "scrollIntoView");

                function q(m) {
                    const g = (0, w.Kt)(m);
                    g && P(g)
                }
                r(q, "scrollToFragmentTarget");

                function y(m) {
                    (0, A.H)();
                    const g = m.querySelectorAll(".js-sticky-offset-scroll"),
                        p = m.querySelectorAll(".js-position-sticky"),
                        L = Math.max(0, ...Array.from(g).map(C => {
                            const {
                                top: x,
                                height: $
                            } = C.getBoundingClientRect();
                            return x === 0 ? $ : 0
                        })) + Math.max(0, ...Array.from(p).map(C => {
                            const {
                                top: x,
                                height: $
                            } = C.getBoundingClientRect(), H = parseInt(getComputedStyle(C).top);
                            if (!C.parentElement) return 0;
                            const J = C.parentElement.getBoundingClientRect().top;
                            return x === H && J < 0 ? $ : 0
                        })),
                        E = m.querySelectorAll(".js-position-sticky-stacked"),
                        b = Array.from(E).reduce((C, x) => {
                            const {
                                height: $,
                                top: H
                            } = x.getBoundingClientRect(), J = H < 0, Y = x.classList.contains("is-stuck");
                            return C + (!J && Y ? $ : 0)
                        }, 0);
                    return L + b
                }
                r(y, "computeFixedYOffset")
            },
            24519: (_, M, u) => {
                "use strict";
                u.d(M, {
                    Z: () => E
                });
                var w = u(51374),
                    A = u(52660),
                    P = u(65935),
                    q = u(85806);
                let y = !1;

                function m(b) {
                    const C = new URL(b, window.location.origin),
                        x = new URLSearchParams(C.search.slice(1));
                    return x.set("webauthn-support", (0, q.T)()), C.search = x.toString(), C.toString()
                }
                r(m, "urlWithParams");
                async function g() {
                    const b = document.querySelector("link[rel=sudo-modal]"),
                        C = document.querySelector(".js-sudo-prompt");
                    if (C instanceof HTMLTemplateElement) return C;
                    if (b) {
                        const x = await (0, A.a)(document, m(b.href));
                        return document.body.appendChild(x), document.querySelector(".js-sudo-prompt")
                    } else throw new Error("couldn't load sudo prompt")
                }
                r(g, "loadPromptTemplate");
                let p = !1;
                async function L() {
                    if (y) return !1;
                    y = !0, p = !1;
                    const C = (await g()).content.cloneNode(!0),
                        x = await (0, w.W)({
                            content: C
                        });
                    return await new Promise($ => {
                        x.addEventListener("dialog:remove", function() {
                            y = !1, $()
                        }, {
                            once: !0
                        })
                    }), p
                }
                r(L, "sudoPrompt"), (0, P.AC)(".js-sudo-form", async function(b, C) {
                    try {
                        await C.text()
                    } catch (x) {
                        if (!x.response) throw x;
                        let $;
                        switch (x.response.status) {
                            case 401:
                                $ = "Incorrect password.";
                                break;
                            case 429:
                                $ = "Too many password attempts. Please wait and try again later.";
                                break;
                            default:
                                $ = "Failed to receive a response. Please try again later."
                        }
                        b.querySelector(".js-sudo-error").textContent = $, b.querySelector(".js-sudo-error").hidden = !1, b.querySelector(".js-sudo-password").value = "";
                        return
                    }
                    p = !0, b.closest("details").removeAttribute("open")
                });
                async function E() {
                    const b = await fetch("/sessions/in_sudo", {
                        headers: {
                            accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    return b.ok && await b.text() === "true" ? !0 : L()
                }
                r(E, "triggerSudoPrompt")
            },
            77434: (_, M, u) => {
                "use strict";
                u.d(M, {
                    Om: () => q,
                    lp: () => A,
                    rq: () => w,
                    t4: () => P
                });

                function w(m) {
                    const g = "\u200D",
                        p = m.split(g);
                    let L = 0;
                    for (const E of p) L += Array.from(E.split(/[\ufe00-\ufe0f]/).join("")).length;
                    return L / p.length
                }
                r(w, "getUtf8StringLength");

                function A(m, g, p) {
                    let L = m.value.substring(0, m.selectionEnd || 0),
                        E = m.value.substring(m.selectionEnd || 0);
                    return L = L.replace(g, p), E = E.replace(g, p), y(m, L + E, L.length), p
                }
                r(A, "replaceText");

                function P(m, g, p) {
                    if (m.selectionStart === null || m.selectionEnd === null) return A(m, g, p);
                    const L = m.value.substring(0, m.selectionStart),
                        E = m.value.substring(m.selectionEnd);
                    return y(m, L + p + E, L.length), p
                }
                r(P, "replaceSelection");

                function q(m, g, p = {}) {
                    const L = m.selectionEnd || 0,
                        E = m.value.substring(0, L),
                        b = m.value.substring(L),
                        C = m.value === "" || E.match(/\n$/) ? "" : `
`,
                        x = p.appendNewline ? `
` : "",
                        $ = C + g + x;
                    m.value = E + $ + b;
                    const H = L + $.length;
                    return m.selectionStart = H, m.selectionEnd = H, m.dispatchEvent(new CustomEvent("change", {
                        bubbles: !0,
                        cancelable: !1
                    })), m.focus(), $
                }
                r(q, "insertText");

                function y(m, g, p) {
                    m.value = g, m.selectionStart = p, m.selectionEnd = p, m.dispatchEvent(new CustomEvent("change", {
                        bubbles: !0,
                        cancelable: !1
                    }))
                }
                r(y, "setTextareaValueAndCursor")
            },
            85806: (_, M, u) => {
                "use strict";
                u.d(M, {
                    T: () => A,
                    k: () => P
                });
                var w = u(70112);

                function A() {
                    return (0, w.Zh)() ? "supported" : "unsupported"
                }
                r(A, "webauthnSupportLevel");
                async function P() {
                    var q;
                    return await ((q = window.PublicKeyCredential) == null ? void 0 : q.isUserVerifyingPlatformAuthenticatorAvailable()) ? "supported" : "unsupported"
                }
                r(P, "iuvpaaSupportLevel")
            }
        },
        _ => {
            var M = r(w => _(_.s = w), "__webpack_exec__");
            _.O(0, [5724, 5388, 93, 8932, 1717, 5329, 2486, 901, 3682, 3932, 3826, 5222], () => M(4039));
            var u = _.O()
        }
    ]);
})();

//# sourceMappingURL=behaviors-ae9306d77af5.js.map