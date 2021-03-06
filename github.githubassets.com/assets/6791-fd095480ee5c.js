"use strict";
(() => {
    var A = Object.defineProperty;
    var o = (L, y) => A(L, "name", {
        value: y,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [6791], {
            52134: (L, y, h) => {
                h.d(y, {
                    H: () => l,
                    v: () => c
                });
                var d = h(59753);

                function c() {
                    const r = document.getElementById("ajax-error-message");
                    r && (r.hidden = !1)
                }
                o(c, "showGlobalError");

                function l() {
                    const r = document.getElementById("ajax-error-message");
                    r && (r.hidden = !0)
                }
                o(l, "hideGlobalError"), (0, d.on)("deprecatedAjaxError", "[data-remote]", function(r) {
                    const n = r.detail,
                        {
                            error: t,
                            text: i
                        } = n;
                    r.currentTarget === r.target && (t === "abort" || t === "canceled" || (/<html/.test(i) ? (c(), r.stopImmediatePropagation()) : setTimeout(function() {
                        r.defaultPrevented || c()
                    }, 0)))
                }), (0, d.on)("deprecatedAjaxSend", "[data-remote]", function() {
                    l()
                }), (0, d.on)("click", ".js-ajax-error-dismiss", function() {
                    l()
                })
            },
            52660: (L, y, h) => {
                h.d(y, {
                    D: () => r,
                    a: () => l
                });
                var d = h(2699),
                    c = h(10900);
                async function l(n, t, i) {
                    const f = new Request(t, i);
                    f.headers.append("X-Requested-With", "XMLHttpRequest");
                    const u = await self.fetch(f);
                    if (u.status < 200 || u.status >= 300) throw new Error(`HTTP ${u.status}${u.statusText||""}`);
                    return (0, d.t)((0, d.P)(n), u), (0, c.r)(n, await u.text())
                }
                o(l, "fetchSafeDocumentFragment");

                function r(n, t, i = 1e3) {
                    return o(async function f(u) {
                        const m = new Request(n, t);
                        m.headers.append("X-Requested-With", "XMLHttpRequest");
                        const p = await self.fetch(m);
                        if (p.status < 200 || p.status >= 300) throw new Error(`HTTP ${p.status}${p.statusText||""}`);
                        if (p.status === 200) return p;
                        if (p.status === 202) return await new Promise(g => setTimeout(g, u)), f(u * 1.5);
                        throw new Error(`Unexpected ${p.status} response status from poll endpoint`)
                    }, "poll")(i)
                }
                o(r, "fetchPoll")
            },
            82036: (L, y, h) => {
                h.d(y, {
                    Bt: () => n,
                    DN: () => f,
                    KL: () => p,
                    Se: () => i,
                    qC: () => g,
                    sw: () => u
                });
                var d = h(59753),
                    c = h(90137),
                    l = h(52134);
                (0, d.on)("click", ".js-remote-submit-button", async function(a) {
                    const b = a.currentTarget.form;
                    a.preventDefault();
                    let e;
                    try {
                        e = await fetch(b.action, {
                            method: b.method,
                            body: new FormData(b),
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })
                    } catch {}
                    e && !e.ok && (0, l.v)()
                });

                function r(a, E, b) {
                    return a.dispatchEvent(new CustomEvent(E, {
                        bubbles: !0,
                        cancelable: b
                    }))
                }
                o(r, "fire");

                function n(a, E) {
                    E && (t(a, E), (0, c.j)(E)), r(a, "submit", !0) && a.submit()
                }
                o(n, "requestSubmit");

                function t(a, E) {
                    if (!(a instanceof HTMLFormElement)) throw new TypeError("The specified element is not of type HTMLFormElement.");
                    if (!(E instanceof HTMLElement)) throw new TypeError("The specified element is not of type HTMLElement.");
                    if (E.type !== "submit") throw new TypeError("The specified element is not a submit button.");
                    if (!a || a !== E.form) throw new Error("The specified element is not owned by the form element.")
                }
                o(t, "checkButtonValidity");

                function i(a, E) {
                    if (typeof E == "boolean")
                        if (a instanceof HTMLInputElement) a.checked = E;
                        else throw new TypeError("only checkboxes can be set to boolean value");
                    else {
                        if (a.type === "checkbox") throw new TypeError("checkbox can't be set to string value");
                        a.value = E
                    }
                    r(a, "change", !1)
                }
                o(i, "changeValue");

                function f(a, E) {
                    for (const b in E) {
                        const e = E[b],
                            s = a.elements.namedItem(b);
                        (s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement) && (s.value = e)
                    }
                }
                o(f, "fillFormValues");

                function u(a) {
                    if (!(a instanceof HTMLElement)) return !1;
                    const E = a.nodeName.toLowerCase(),
                        b = (a.getAttribute("type") || "").toLowerCase();
                    return E === "select" || E === "textarea" || E === "input" && b !== "submit" && b !== "reset" || a.isContentEditable
                }
                o(u, "isFormField");

                function m(a) {
                    return new URLSearchParams(a)
                }
                o(m, "searchParamsFromFormData");

                function p(a, E) {
                    const b = new URLSearchParams(a.search),
                        e = m(E);
                    for (const [s, _] of e) b.append(s, _);
                    return b.toString()
                }
                o(p, "combineGetFormSearchParams");

                function g(a) {
                    return m(new FormData(a)).toString()
                }
                o(g, "serialize")
            },
            2699: (L, y, h) => {
                h.d(y, {
                    P: () => d,
                    t: () => l
                });

                function d(r) {
                    const n = [...r.querySelectorAll("meta[name=html-safe-nonce]")].map(t => t.content);
                    if (n.length < 1) throw new Error("could not find html-safe-nonce on document");
                    return n
                }
                o(d, "getDocumentHtmlSafeNonces");
                class c extends Error {
                    constructor(n, t) {
                        super(`${n} for HTTP ${t.status}`);
                        this.response = t
                    }
                }
                o(c, "ResponseError");

                function l(r, n, t = !1) {
                    const i = n.headers.get("content-type") || "";
                    if (!t && !i.startsWith("text/html")) throw new c(`expected response with text/html, but was ${i}`, n);
                    if (t && !(i.startsWith("text/html") || i.startsWith("application/json"))) throw new c(`expected response with text/html or application/json, but was ${i}`, n);
                    const f = n.headers.get("x-html-safe");
                    if (f) {
                        if (!r.includes(f)) throw new c("response X-HTML-Safe nonce did not match", n)
                    } else throw new c("missing X-HTML-Safe nonce", n)
                }
                o(l, "verifyResponseHtmlSafeNonce")
            },
            9115: (L, y, h) => {
                var d = h(90420),
                    c = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = o((t, i, f, u) => {
                        for (var m = u > 1 ? void 0 : u ? l(i, f) : i, p = t.length - 1, g; p >= 0; p--)(g = t[p]) && (m = (u ? g(i, f, m) : g(m)) || m);
                        return u && m && c(i, f, m), m
                    }, "__decorateClass");
                let n = o(class extends HTMLElement {
                    connectedCallback() {
                        this.control && (this.storedInput = Array(this.control.children.length).fill("")), this.addEventListener("input", this.relayInput.bind(this)), this.addEventListener("keydown", this.relayKeydown.bind(this));
                        const t = this.closest("details");
                        t && t.addEventListener("toggle", () => {
                            t.open && this.source.focus()
                        })
                    }
                    relayKeydown(t) {
                        if ((this.isControlTab(t.target) || t.target === this.source) && (t.key === "ArrowDown" || t.key === "Tab")) t.preventDefault(), t.stopPropagation(), this.routeCustomEvent(new CustomEvent("focus-list"));
                        else if (t.key === "Escape") {
                            const i = this.closest("details");
                            i && i.removeAttribute("open")
                        }
                    }
                    isControlTab(t) {
                        return !t || !this.control ? !1 : Array.from(this.control.children).includes(t)
                    }
                    relayInput(t) {
                        if (!t.target) return;
                        const f = t.target.value;
                        this.routeCustomEvent(new CustomEvent("input-entered", {
                            detail: f
                        }))
                    }
                    routeCustomEvent(t) {
                        this.sinks[this.selectedIndex].dispatchEvent(t)
                    }
                    get selectedIndex() {
                        if (!this.control) return 0;
                        const t = this.control.querySelector('[aria-selected="true"]');
                        return t ? Array.from(this.control.children).indexOf(t) : 0
                    }
                    storeInput() {
                        this.storedInput[this.selectedIndex] = this.source.value
                    }
                    updateInput(t) {
                        this.source.value = this.storedInput[this.selectedIndex];
                        const i = t.detail.relatedTarget.getAttribute("data-filter-placeholder");
                        this.source.placeholder = i, this.source.setAttribute("aria-label", i), this.notifySelected()
                    }
                    notifySelected() {
                        const t = this.sinks[this.selectedIndex],
                            i = new CustomEvent("tab-selected");
                        t.dispatchEvent(i)
                    }
                }, "InputDemuxElement");
                r([d.fA], n.prototype, "source", 2), r([d.GO], n.prototype, "sinks", 2), r([d.fA], n.prototype, "control", 2), n = r([d.Ih], n)
            },
            84570: (L, y, h) => {
                h.d(y, {
                    ZG: () => n,
                    q6: () => i,
                    w4: () => t
                });
                var d = h(8439);
                let c = !1;
                const l = new d.Z;

                function r(f) {
                    const u = f.target;
                    if (u instanceof HTMLElement && u.nodeType !== Node.DOCUMENT_NODE)
                        for (const m of l.matches(u)) m.data.call(null, u)
                }
                o(r, "handleFocus");

                function n(f, u) {
                    c || (c = !0, document.addEventListener("focus", r, !0)), l.add(f, u), document.activeElement instanceof HTMLElement && document.activeElement.matches(f) && u(document.activeElement)
                }
                o(n, "onFocus");

                function t(f, u, m) {
                    function p(g) {
                        const a = g.currentTarget;
                        !a || (a.removeEventListener(f, m), a.removeEventListener("blur", p))
                    }
                    o(p, "blurHandler"), n(u, function(g) {
                        g.addEventListener(f, m), g.addEventListener("blur", p)
                    })
                }
                o(t, "onKey");

                function i(f, u) {
                    function m(p) {
                        const {
                            currentTarget: g
                        } = p;
                        !g || (g.removeEventListener("input", u), g.removeEventListener("blur", m))
                    }
                    o(m, "blurHandler"), n(f, function(p) {
                        p.addEventListener("input", u), p.addEventListener("blur", m)
                    })
                }
                o(i, "onInput")
            },
            68906: (L, y, h) => {
                var d = h(60785),
                    c = h(83476);
                const {
                    getItem: l,
                    setItem: r,
                    removeItem: n
                } = (0, d.Z)("localStorage", {
                    throwQuotaErrorsOnSet: !0
                });
                var t = (e => (e.Branch = "branch", e.Tag = "tag", e))(t || {});
                const i = o(class {
                    constructor(e, s, _, T, w) {
                        this.knownItems = [], this.currentSearchResult = [], this.exactMatchFound = !1, this.isLoading = !0, this.fetchInProgress = !1, this.fetchFailed = !1, this.refType = e, this.selector = s, this.refEndpoint = _, this.cacheKey = T, this.nameWithOwner = w
                    }
                    render() {
                        this.selector.render()
                    }
                    async fetchData() {
                        try {
                            if (!this.isLoading || this.fetchInProgress) return;
                            if (!this.bootstrapFromLocalStorage()) {
                                this.fetchInProgress = !0, this.fetchFailed = !1;
                                const e = await fetch(`${this.refEndpoint}?type=${this.refType}`, {
                                    headers: {
                                        Accept: "application/json"
                                    }
                                });
                                await this.processResponse(e)
                            }
                            this.isLoading = !1, this.fetchInProgress = !1, this.render()
                        } catch {
                            this.fetchInProgress = !1, this.fetchFailed = !0
                        }
                    }
                    async processResponse(e) {
                        if (this.emitStats(e), !e.ok) {
                            this.fetchFailed = !0;
                            return
                        }
                        const s = e.clone(),
                            _ = await e.json();
                        this.knownItems = _.refs, this.cacheKey = _.cacheKey, this.flushToLocalStorage(await s.text())
                    }
                    emitStats(e) {
                        if (!e.ok) {
                            (0, c.b)({
                                incrementKey: "REF_SELECTOR_BOOT_FAILED"
                            }, !0);
                            return
                        }
                        switch (e.status) {
                            case 200:
                                {
                                    (0, c.b)({
                                        incrementKey: "REF_SELECTOR_BOOTED_FROM_UNCACHED_HTTP"
                                    });
                                    break
                                }
                            case 304:
                                {
                                    (0, c.b)({
                                        incrementKey: "REF_SELECTOR_BOOTED_FROM_HTTP_CACHE"
                                    });
                                    break
                                }
                            default:
                                (0, c.b)({
                                    incrementKey: "REF_SELECTOR_UNEXPECTED_RESPONSE"
                                })
                        }
                    }
                    search(e) {
                        if (e === "") {
                            this.currentSearchResult = this.knownItems;
                            return
                        }
                        const s = [],
                            _ = [];
                        this.exactMatchFound = !1;
                        let T;
                        for (const w of this.knownItems)
                            if (T = w.indexOf(e), !(T < 0)) {
                                if (T === 0) {
                                    e === w ? (_.unshift(w), this.exactMatchFound = !0) : _.push(w);
                                    continue
                                }
                                s.push(w)
                            }
                        this.currentSearchResult = [..._, ...s]
                    }
                    bootstrapFromLocalStorage() {
                        const e = l(this.localStorageKey);
                        if (!e) return !1;
                        const s = JSON.parse(e);
                        return s.cacheKey !== this.cacheKey || !("refs" in s) ? (n(this.localStorageKey), !1) : (this.knownItems = s.refs, this.isLoading = !1, (0, c.b)({
                            incrementKey: "REF_SELECTOR_BOOTED_FROM_LOCALSTORAGE"
                        }), !0)
                    }
                    async flushToLocalStorage(e) {
                        try {
                            r(this.localStorageKey, e)
                        } catch (s) {
                            if (s.message.toLowerCase().includes("quota")) {
                                this.clearSiblingLocalStorage(), (0, c.b)({
                                    incrementKey: "REF_SELECTOR_LOCALSTORAGE_OVERFLOWED"
                                });
                                try {
                                    r(this.localStorageKey, e)
                                } catch (_) {
                                    _.message.toLowerCase().includes("quota") && (0, c.b)({
                                        incrementKey: "REF_SELECTOR_LOCALSTORAGE_GAVE_UP"
                                    })
                                }
                            } else throw s
                        }
                    }
                    clearSiblingLocalStorage() {
                        for (const e of Object.keys(localStorage)) e.startsWith(i.LocalStoragePrefix) && n(e)
                    }
                    get localStorageKey() {
                        return `${i.LocalStoragePrefix}:${this.nameWithOwner}:${this.refType}`
                    }
                }, "_SearchIndex");
                let f = i;
                f.LocalStoragePrefix = "ref-selector";
                var u = h(69567),
                    m = h(90420),
                    p = h(17945),
                    g = Object.defineProperty,
                    a = Object.getOwnPropertyDescriptor,
                    E = o((e, s, _, T) => {
                        for (var w = T > 1 ? void 0 : T ? a(s, _) : s, C = e.length - 1, v; C >= 0; C--)(v = e[C]) && (w = (T ? v(s, _, w) : v(w)) || w);
                        return T && w && g(s, _, w), w
                    }, "__decorateClass");
                let b = o(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.isCurrentVisible = !1, this.currentSelectionIndex = null
                    }
                    connectedCallback() {
                        this.refType = this.getRequiredAttr("type") === "branch" ? t.Branch : t.Tag;
                        const e = this.getAttribute("current-committish");
                        this.currentCommittish = e ? atob(e) : null, this.input = this.hasAttribute("initial-filter") && this.currentCommittish || "", this.defaultBranch = atob(this.getRequiredAttr("default-branch")), this.nameWithOwner = atob(this.getRequiredAttr("name-with-owner")), this.canCreate = this.hasAttribute("can-create"), this.prefetchOnMouseover = this.hasAttribute("prefetch-on-mouseover");
                        const s = this.getRequiredAttr("query-endpoint"),
                            _ = this.getRequiredAttr("cache-key");
                        this.index = new f(this.refType, this, s, _, this.nameWithOwner), this.setupFetchListeners()
                    }
                    inputEntered(e) {
                        this.input = e.detail, this.render()
                    }
                    tabSelected() {
                        this.index.fetchData()
                    }
                    renderTemplate(e, s) {
                        return new u.R(e, s, u.XK)
                    }
                    renderRow(e) {
                        const s = this.index.currentSearchResult[e];
                        if (!s && e >= this.listLength) return document.createElement("span");
                        if (this.index.fetchFailed) return this.renderTemplate(this.fetchFailedTemplate, {
                            index: e,
                            refName: this.input
                        });
                        if (!s) {
                            const v = this.input === this.currentCommittish;
                            return this.isCurrentVisible || (this.isCurrentVisible = v), this.renderTemplate(this.noMatchTemplate, {
                                index: e,
                                isCurrent: v,
                                refName: this.input
                            })
                        }
                        const _ = this.input.length > 0,
                            T = _ ? "is-filtering" : "",
                            w = s === this.currentCommittish;
                        this.isCurrentVisible || (this.isCurrentVisible = w);
                        const C = this.renderTemplate(this.itemTemplate, {
                            refName: s,
                            index: e,
                            isFilteringClass: T,
                            urlEncodedRefName: this.urlEncodeRef(s),
                            isCurrent: w,
                            isNotDefault: s !== this.defaultBranch
                        });
                        if (_) {
                            const v = C.querySelector("span");
                            v.textContent = "";
                            const S = s.split(this.input),
                                R = S.length - 1;
                            for (let I = 0; I < S.length; I++) {
                                const O = S[I];
                                if (v.appendChild(document.createTextNode(O)), I < R) {
                                    const x = document.createElement("b");
                                    x.textContent = this.input, v.appendChild(x)
                                }
                            }
                        }
                        return C
                    }
                    urlEncodeRef(e) {
                        return encodeURIComponent(e).replaceAll("%2F", "/").replaceAll("%3A", ":").replaceAll("%2B", "+")
                    }
                    render() {
                        if (this.currentSelectionIndex = null, !this.index.isLoading) {
                            if (!this.virtualizedList) {
                                this.index.search(this.input), this.setupVirtualizedList();
                                return
                            }
                            this.listContainer.scrollTop = 0, this.index.search(this.input), this.virtualizedList.setRowCount(this.listLength)
                        }
                    }
                    get listLength() {
                        const e = this.index.currentSearchResult.length;
                        return this.showCreateRow ? e + 1 : e || 1
                    }
                    get showCreateRow() {
                        return !this.index.fetchFailed && !this.index.exactMatchFound && this.input !== "" && this.canCreate
                    }
                    getRequiredAttr(e, s = this) {
                        const _ = s.getAttribute(e);
                        if (!_) throw new Error(`Missing attribute for ${s}: ${e}`);
                        return _
                    }
                    setupFetchListeners() {
                        const e = this.closest("details");
                        let s = !1;
                        const _ = o(() => {
                            s || (this.index.fetchData(), s = !0)
                        }, "fetch");
                        if (!e || e.open) {
                            _();
                            return
                        }
                        this.prefetchOnMouseover && e.addEventListener("mouseover", _, {
                            once: !0
                        }), this.addEventListener("keydown", this.keydown), this.addEventListener("change", this.updateCurrent);
                        const T = e.querySelector("input[data-ref-filter]");
                        T && (T.addEventListener("input", () => {
                            this.input = T.value, this.render()
                        }), T.addEventListener("keydown", w => {
                            if (w.key === "ArrowDown" || w.key === "Tab") w.preventDefault(), w.stopPropagation(), this.focusFirstListMember();
                            else if (w.key === "Enter") {
                                let C = this.index.currentSearchResult.indexOf(this.input);
                                if (C === -1)
                                    if (this.showCreateRow) C = this.listLength - 1;
                                    else return;
                                e.querySelector(`[data-index="${C}"]`).click(), w.preventDefault()
                            }
                        }))
                    }
                    focusFirstListMember() {
                        !this.virtualizedList || (this.currentSelectionIndex = 0, this.focusItemAtIndex(this.currentSelectionIndex))
                    }
                    updateCurrent(e) {
                        e.target instanceof HTMLInputElement && e.target.checked && e.target.value && (this.currentCommittish = e.target.value)
                    }
                    keydown(e) {
                        if (this.currentSelectionIndex !== null) {
                            if (e.key === "Enter") {
                                const s = document.activeElement;
                                if (!s) return;
                                s.click(), e.preventDefault();
                                return
                            }
                            if (!(e.key === "Tab" && e.shiftKey) && e.key !== "Escape") switch (e.preventDefault(), e.stopPropagation(), e.key) {
                                case "ArrowUp":
                                    {
                                        this.currentSelectionIndex--,
                                        this.currentSelectionIndex < 0 && (this.currentSelectionIndex = this.listLength - 1),
                                        this.focusItemAtIndex(this.currentSelectionIndex);
                                        break
                                    }
                                case "Home":
                                    {
                                        this.currentSelectionIndex = 0,
                                        this.focusItemAtIndex(this.currentSelectionIndex);
                                        break
                                    }
                                case "End":
                                    {
                                        this.currentSelectionIndex = this.listLength - 1,
                                        this.focusItemAtIndex(this.currentSelectionIndex);
                                        break
                                    }
                                case "Tab":
                                case "ArrowDown":
                                    {
                                        this.currentSelectionIndex++,
                                        this.currentSelectionIndex > this.listLength - 1 && (this.currentSelectionIndex = 0),
                                        this.focusItemAtIndex(this.currentSelectionIndex);
                                        break
                                    }
                            }
                        }
                    }
                    focusItemAtIndex(e) {
                        this.virtualizedList.scrollToIndex(e, "center"), setTimeout(() => {
                            const s = this.listContainer.querySelector(`[data-index="${e}"]`);
                            s && s.focus()
                        }, 20)
                    }
                    setupVirtualizedList() {
                        this.listContainer.innerHTML = "", this.virtualizedList = new p.Z(this.listContainer, {
                            height: 330,
                            rowCount: this.listLength,
                            renderRow: this.renderRow.bind(this),
                            rowHeight: e => this.showCreateRow && e === this.listLength - 1 ? 51 : 33,
                            onRowsRendered: () => {
                                var e;
                                this.hiddenCurrentElement && (this.listContainer.removeChild(this.hiddenCurrentElement), delete this.hiddenCurrentElement), this.isCurrentVisible ? this.isCurrentVisible = !1 : this.hiddenCurrentItemTemplate && (this.hiddenCurrentElement = document.createElement("div"), (e = this.hiddenCurrentElement) == null || e.appendChild(this.renderTemplate(this.hiddenCurrentItemTemplate, {
                                    refName: this.currentCommittish
                                })), this.listContainer.appendChild(this.hiddenCurrentElement))
                            },
                            initialIndex: 0,
                            overscanCount: 6
                        })
                    }
                }, "RefSelectorElement");
                E([m.fA], b.prototype, "listContainer", 2), E([m.fA], b.prototype, "itemTemplate", 2), E([m.fA], b.prototype, "noMatchTemplate", 2), E([m.fA], b.prototype, "fetchFailedTemplate", 2), E([m.fA], b.prototype, "hiddenCurrentItemTemplate", 2), b = E([m.Ih], b)
            },
            90137: (L, y, h) => {
                h.d(y, {
                    j: () => d,
                    u: () => c
                });

                function d(l) {
                    const r = l.closest("form");
                    if (!(r instanceof HTMLFormElement)) return;
                    let n = c(r);
                    if (l.name) {
                        const t = l.matches("input[type=submit]") ? "Submit" : "",
                            i = l.value || t;
                        n || (n = document.createElement("input"), n.type = "hidden", n.classList.add("is-submit-button-value"), r.prepend(n)), n.name = l.name, n.value = i
                    } else n && n.remove()
                }
                o(d, "persistSubmitButtonValue");

                function c(l) {
                    const r = l.querySelector("input.is-submit-button-value");
                    return r instanceof HTMLInputElement ? r : null
                }
                o(c, "findPersistedSubmitButtonValue")
            },
            60785: (L, y, h) => {
                h.d(y, {
                    Z: () => c
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
                o(d, "NoOpStorage");

                function c(l, r = {
                    throwQuotaErrorsOnSet: !1
                }, n = window) {
                    let t;
                    try {
                        t = n[l]
                    } catch {
                        t = new d
                    }
                    const {
                        throwQuotaErrorsOnSet: i
                    } = r;

                    function f(p) {
                        try {
                            return t.getItem(p)
                        } catch {
                            return null
                        }
                    }
                    o(f, "getItem");

                    function u(p, g) {
                        try {
                            t.setItem(p, g)
                        } catch (a) {
                            if (i && a.message.toLowerCase().includes("quota")) throw a
                        }
                    }
                    o(u, "setItem");

                    function m(p) {
                        try {
                            t.removeItem(p)
                        } catch {}
                    }
                    return o(m, "removeItem"), {
                        getItem: f,
                        setItem: u,
                        removeItem: m
                    }
                }
                o(c, "safeStorage")
            },
            63355: (L, y, h) => {
                var d = h(64463);
                const c = o(() => {
                    const l = document.getElementById("spoof-warning");
                    if (!l) return;
                    const r = document.querySelector(".commit-title");
                    r && r.classList.add("pb-1"), l.hidden = !1, l.removeAttribute("aria-hidden")
                }, "showSpoofCommitBanner");
                (0, d.N7)("#js-spoofed-commit-warning-trigger", {
                    add: c
                })
            },
            86404: (L, y, h) => {
                h.d(y, {
                    RB: () => c,
                    qC: () => l,
                    w0: () => d
                });
                class d {
                    constructor(n) {
                        this.closed = !1, this.unsubscribe = () => {
                            n(), this.closed = !0
                        }
                    }
                }
                o(d, "Subscription");

                function c(r, n, t, i = {
                    capture: !1
                }) {
                    return r.addEventListener(n, t, i), new d(() => {
                        r.removeEventListener(n, t, i)
                    })
                }
                o(c, "fromEvent");

                function l(...r) {
                    return new d(() => {
                        for (const n of r) n.unsubscribe()
                    })
                }
                o(l, "compose")
            }
        }
    ]);
})();

//# sourceMappingURL=6791-9e7be1def367.js.map