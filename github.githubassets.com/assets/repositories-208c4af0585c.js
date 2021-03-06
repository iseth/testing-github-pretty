"use strict";
(() => {
    var Pt = Object.defineProperty;
    var i = (L, C) => Pt(L, "name", {
        value: C,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [2113], {
            20963: (L, C, u) => {
                u.d(C, {
                    X: () => T
                });
                var m = u(64463);

                function T() {
                    return /Windows/.test(navigator.userAgent) ? "windows" : /Macintosh/.test(navigator.userAgent) ? "mac" : null
                }
                i(T, "getPlatform");

                function P(v) {
                    const c = (v.getAttribute("data-platforms") || "").split(","),
                        j = T();
                    return Boolean(j && c.includes(j))
                }
                i(P, "runningOnPlatform"), (0, m.N7)(".js-remove-unless-platform", function(v) {
                    P(v) || v.remove()
                })
            },
            27925: (L, C, u) => {
                u.d(C, {
                    b: () => p
                });
                var m = u(90420),
                    T = u(20963),
                    P = u(60785),
                    v = Object.defineProperty,
                    c = Object.getOwnPropertyDescriptor,
                    j = i((y, f, M, E) => {
                        for (var k = E > 1 ? void 0 : E ? c(f, M) : f, b = y.length - 1, O; b >= 0; b--)(O = y[b]) && (k = (E ? O(f, M, k) : O(k)) || k);
                        return E && k && v(f, M, k), k
                    }, "__decorateClass");
                const {
                    getItem: q,
                    setItem: I
                } = (0, P.Z)("localStorage"), w = "code-button-default-tab";
                let p = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.shouldRefreshList = !1
                    }
                    showDownloadMessage(y) {
                        const f = this.findPlatform(y);
                        !f || this.showPlatform(f)
                    }
                    showCodespaces(y) {
                        const f = this.findPlatform(y);
                        !f || (this.showPlatform(f), this.loadAndUpdateContent())
                    }
                    showCodespaceSelector(y) {
                        const f = this.findPlatform(y);
                        !f || (this.showPlatform(f), this.codespaceSelector && (this.codespaceSelector.hidden = !1))
                    }
                    showOpenOrCreateInCodespace() {
                        this.openOrCreateInCodespace && (this.openOrCreateInCodespace.hidden = !1)
                    }
                    removeOpenOrCreateInCodespace() {
                        this.openOrCreateInCodespace && this.openOrCreateInCodespace.remove()
                    }
                    refreshList() {
                        this.shouldRefreshList && (this.shouldRefreshList = !1, this.loadAndUpdateContent())
                    }
                    trackDelete() {
                        this.shouldRefreshList = !0
                    }
                    hideSpinner() {
                        this.codespaceLoadingMenu && (this.codespaceLoadingMenu.hidden = !0), this.codespaceList && (this.codespaceList.hidden = !1)
                    }
                    showSpinner() {
                        this.codespaceLoadingMenu && (this.codespaceLoadingMenu.hidden = !1), this.codespaceList && (this.codespaceList.hidden = !0)
                    }
                    onDetailsToggle(y) {
                        this.modal.hidden = !1;
                        for (const M of this.platforms) M.hidden = !0;
                        const f = y.target;
                        f && f.open && this.selectDefaultTab()
                    }
                    showPlatform(y) {
                        this.modal.hidden = !0;
                        for (const f of this.platforms) f.hidden = f.getAttribute("data-platform") !== y
                    }
                    findPlatform(y) {
                        return y.currentTarget.getAttribute("data-open-app") || (0, T.X)()
                    }
                    refreshOnError() {
                        window.location.reload()
                    }
                    pollForVscode(y) {
                        this.showPlatform("vscode");
                        const f = y.currentTarget.getAttribute("data-src");
                        f && this.vscodePoller.setAttribute("src", f)
                    }
                    backToCodespacesFromVscodePolling() {
                        this.loadAndUpdateContent(), this.showPlatform("codespaces")
                    }
                    localTabSelected() {
                        I(w, "local")
                    }
                    cloudTabSelected() {
                        I(w, "cloud")
                    }
                    selectDefaultTab() {
                        const y = q(w);
                        if (!y) return;
                        const f = this.querySelector(`button[data-tab="${y}"`);
                        f && f.click()
                    }
                    loadAndUpdateContent() {
                        this.codespaceList.setAttribute("src", this.codespaceList.getAttribute("data-src"))
                    }
                }, "GetRepoElement");
                j([m.fA], p.prototype, "modal", 2), j([m.fA], p.prototype, "codespaceForm", 2), j([m.fA], p.prototype, "codespaceLoadingMenu", 2), j([m.fA], p.prototype, "codespaceList", 2), j([m.fA], p.prototype, "codespaceSelector", 2), j([m.fA], p.prototype, "openOrCreateInCodespace", 2), j([m.fA], p.prototype, "vscodePoller", 2), j([m.GO], p.prototype, "platforms", 2), p = j([m.Ih], p)
            },
            5909: (L, C, u) => {
                var m = u(13002),
                    T = u(88309),
                    P = u(59753);
                (0, P.on)("tab-container-changed", ".js-branches-tags-tabs", async function(v) {
                    const c = v.detail.relatedTarget,
                        j = v.currentTarget;
                    if (!j) return;
                    let q, I;
                    for (const p of j.querySelectorAll("[data-controls-ref-menu-id]")) {
                        if (!(p instanceof m.Z || p instanceof T.Z)) return;
                        const y = p.getAttribute("data-controls-ref-menu-id"),
                            f = c.id === y;
                        p.hidden = !f, f ? I = p : q || (q = p.input ? p.input.value : "")
                    }
                    const w = I && I.input;
                    w && (I && q !== void 0 && (w.value = q), w.focus())
                }), (0, P.on)("click", ".js-onboarding-list-all", function(v) {
                    v.preventDefault();
                    const c = document.querySelectorAll(".js-task-list-hide-on-breadcrumb"),
                        j = document.querySelectorAll(".js-task-list-show-on-breadcrumb");
                    for (const q of c) q.hidden = !0;
                    for (const q of j) q.hidden = !1
                })
            },
            15820: (L, C, u) => {
                var m = u(90420),
                    T = u(3447),
                    P = u(11793),
                    v = u(52660),
                    c = u(59753),
                    j = u(40728),
                    q = Object.defineProperty,
                    I = Object.getOwnPropertyDescriptor,
                    w = i((e, t, n, o) => {
                        for (var r = o > 1 ? void 0 : o ? I(t, n) : t, s = e.length - 1, a; s >= 0; s--)(a = e[s]) && (r = (o ? a(t, n, r) : a(r)) || r);
                        return o && r && q(t, n, r), r
                    }, "__decorateClass");
                let p = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.abortSearch = null, this.originalSelectedItem = null
                    }
                    submit(e) {
                        e.preventDefault()
                    }
                    resetField(e) {
                        if ((0, P.EL)(e) !== "Escape") return;
                        const t = this.field.value.trim();
                        this.field.value = "", t && this.search()
                    }
                    reset() {
                        this.field.focus(), this.field.value = "", (0, c.f)(this.field, "input")
                    }
                    get activeFilter() {
                        var e;
                        return (e = this.filters.find(t => t.classList.contains("selected"))) != null ? e : null
                    }
                    async search() {
                        var e;
                        this.originalSelectedItem || (this.originalSelectedItem = this.activeFilter);
                        const t = this.field.value.trim().length > 0,
                            n = y(this.field);
                        this.classList.toggle("is-search-mode", t), this.classList.add("is-loading");
                        for (const r of this.filters) r.classList.remove("selected");
                        t ? this.allFilter.classList.add("selected") : this.originalSelectedItem && (this.originalSelectedItem.classList.add("selected"), this.originalSelectedItem = null), (e = this.abortSearch) == null || e.abort();
                        const {
                            signal: o
                        } = this.abortSearch = new AbortController;
                        try {
                            const r = await (0, v.a)(document, n, {
                                signal: o
                            });
                            (0, j.lO)(null, "", n), this.result.innerHTML = "", this.result.appendChild(r)
                        } catch {}
                        o.aborted || this.classList.remove("is-loading")
                    }
                }, "BranchFilterElement");
                w([m.fA], p.prototype, "field", 2), w([m.fA], p.prototype, "result", 2), w([m.fA], p.prototype, "allFilter", 2), w([m.GO], p.prototype, "filters", 2), w([(0, T.D)(100)], p.prototype, "search", 1), p = w([m.Ih], p);

                function y(e) {
                    const t = e.form;
                    if (e.value.trim()) {
                        const n = new URL(t.action, window.location.origin),
                            o = new URLSearchParams(n.search.slice(1)),
                            r = t.elements.namedItem("utf8");
                        return r instanceof HTMLInputElement && o.append("utf8", r.value), o.append("query", e.value), n.search = o.toString(), n.toString()
                    }
                    return t.getAttribute("data-reset-url")
                }
                i(y, "queryUrl");
                var f = Object.defineProperty,
                    M = Object.getOwnPropertyDescriptor,
                    E = i((e, t, n, o) => {
                        for (var r = o > 1 ? void 0 : o ? M(t, n) : t, s = e.length - 1, a; s >= 0; s--)(a = e[s]) && (r = (o ? a(t, n, r) : a(r)) || r);
                        return o && r && f(t, n, r), r
                    }, "branch_filter_item_element_decorateClass");
                let k = i(class extends HTMLElement {
                    get branch() {
                        return this.getAttribute("branch")
                    }
                    get branches() {
                        const t = this.closest("branch-filter").querySelectorAll("branch-filter-item");
                        return Array.from(t).filter(n => n.branch === this.branch)
                    }
                    loading(e) {
                        for (const t of this.branches) t.spinner.hidden = !e, t.destroyButton && (t.destroyButton.hidden = e)
                    }
                    set mode(e) {
                        for (const t of this.branches) t.classList.toggle("Details--on", e === "restore")
                    }
                    async restore(e) {
                        e.preventDefault(), this.loading(!0);
                        const t = e.target;
                        let n;
                        try {
                            n = await fetch(t.action, {
                                method: t.method,
                                body: new FormData(t),
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            })
                        } catch {} finally {
                            (!n || !n.ok) && location.reload(), this.loading(!1)
                        }
                        this.mode = "destroy"
                    }
                    async destroy(e) {
                        e.preventDefault(), this.loading(!0);
                        const t = e.target;
                        let n;
                        try {
                            n = await fetch(t.action, {
                                method: t.method,
                                body: new FormData(t),
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            })
                        } catch {} finally {
                            (!n || !n.ok) && location.reload(), this.loading(!1)
                        }
                        this.mode = "restore"
                    }
                }, "BranchFilterItemElement");
                E([m.fA], k.prototype, "destroyButton", 2), E([m.fA], k.prototype, "spinner", 2), k = E([m.Ih], k);
                var b = u(64463);
                (0, b.N7)(".js-new-badge-autodismiss", {
                    constructor: HTMLFormElement,
                    add: e => {
                        const t = e.closest("details");
                        t.addEventListener("toggle", () => {
                            t.hasAttribute("open") && fetch(e.action, {
                                method: e.method,
                                body: new FormData(e),
                                headers: {
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            })
                        })
                    }
                }), (0, b.N7)(".js-fetch-upstream-details-content", {
                    constructor: HTMLElement,
                    initialize(e) {
                        e.hidden = !0
                    }
                }), (0, c.on)("click", ".js-fetch-upstream-summary", async function() {
                    const e = document.querySelector("details.js-fetch-upstream-details"),
                        t = e.querySelector(".js-fetch-upstream-details-spinner");
                    if (e.open) {
                        t.hidden = !1;
                        return
                    }
                    if (t.hidden) return;
                    const n = e.querySelector(".js-fetch-upstream-details-content"),
                        o = n.querySelector(".js-fetch-upstream-conflicts-ui"),
                        r = n.querySelector(".js-fetch-upstream-no-conflicts-ui"),
                        s = n.querySelector(".js-fetch-upstream-conflicts-error-message"),
                        a = n.querySelector(".js-fetch-upstream-conflicts-no-error-message");
                    if (parseInt(n.getAttribute("data-behind")) === 0) {
                        o.hidden = !0, r.hidden = !1, n.hidden = !1, t.hidden = !0;
                        return
                    }
                    const d = n.getAttribute("data-mergeability-check-url"),
                        h = await fetch(d, {
                            headers: {
                                Accept: "application/json"
                            }
                        });
                    n.hidden = !1, t.hidden = !0, h.ok ? (await h.json()).state === "clean" ? r.hidden = !1 : o.hidden = !1 : (o.hidden = !1, s.hidden = !1, a.hidden = !0)
                });
                var O = u(86404),
                    pe = u(65935),
                    Xe = u(82036);
                (0, b.N7)(".repository-import", {
                    subscribe: e => (0, O.RB)(e, "socket:message", function(t) {
                        const n = t.detail.data;
                        n.redirect_to && (document.location.href = n.redirect_to, t.stopImmediatePropagation())
                    })
                }), (0, c.on)("change", "input.js-repository-import-lfs-opt", function({
                    currentTarget: e
                }) {
                    const t = parseInt(e.getAttribute("data-percent-used") || ""),
                        n = e.closest(".js-repository-import-lfs-container"),
                        o = e.getAttribute("data-used") || "";
                    n.querySelector(".js-repository-import-lfs-warn").classList.toggle("d-none", !(t > 100)), n.querySelector(".js-usage-bar").classList.toggle("exceeded", t >= 100), n.querySelector(".js-usage-bar").setAttribute("aria-label", `${t}%`), n.querySelector(".js-repository-import-lfs-progress").style.width = `${t}%`, n.querySelector("span.js-usage-text").textContent = o
                }), (0, pe.AC)(".js-repository-import-author-form", async function(e, t) {
                    const n = await t.html();
                    e.closest(".js-repository-import-author").replaceWith(n.html)
                }), (0, c.on)("click", ".js-repository-import-projects-cancel-button", function() {
                    const e = document.querySelector(".js-repository-import-projects-cancel-form");
                    (0, Xe.Bt)(e)
                }), (0, b.N7)(".js-branch-merge-queue-link", {
                    subscribe: e => (0, O.RB)(e, "socket:message", async function(t) {
                        const n = t.detail.data.queue_entries_count,
                            o = e.getAttribute("data-singular-message"),
                            r = e.getAttribute("data-plural-message");
                        n === "1" ? e.textContent = `${n} ${o}` : e.textContent = `${n} ${r}`
                    })
                });
                var W = u(84570);
                let me = !1;

                function Ge() {
                    const e = document.querySelector(".js-privacy-toggle:checked");
                    if (!!e) return e.value === "private"
                }
                i(Ge, "privateRepoSelected");

                function he() {
                    const e = document.querySelector(".js-repo-name");
                    (0, c.f)(e, "input");
                    const t = document.querySelector('.js-owner-container [aria-checked="true"]'),
                        n = t.getAttribute("data-org-allow-public-repos") !== "false",
                        o = document.querySelector(".js-privacy-toggle[value=public]"),
                        r = document.querySelector(".js-privacy-toggle-label-public"),
                        s = document.querySelector(".js-public-description"),
                        a = document.querySelector(".js-public-restricted-by-policy-description");
                    ye(n, o, r, s, a);
                    const l = t.getAttribute("data-business-id"),
                        d = Je(l, t),
                        h = t.getAttribute("data-org-allow-private-repos") !== "false",
                        g = document.querySelector(".js-privacy-toggle[value=private]"),
                        S = document.querySelector(".js-privacy-toggle-label-private"),
                        N = document.querySelector(".js-private-description"),
                        _ = document.querySelector(".js-private-restricted-by-policy-description");
                    ye(h, g, S, N, _), Ze();
                    const Ne = t.getAttribute("data-org-private-restricted-by-plan") !== "false",
                        R = document.querySelector(".js-upgrade-private-description"),
                        Re = t.getAttribute("data-org-show-upgrade") !== "false",
                        Ue = t.getAttribute("data-org-name"),
                        U = Ue ? document.querySelector(`a[data-upgrade-link="${Ue}"]`) : null,
                        B = document.querySelector(".js-ask-owner-message");
                    h || !Ne ? (R && (R.hidden = !0), U && (U.hidden = !0), B && (B.hidden = !0)) : (_ && (_.hidden = Ne), R && (R.hidden = !1), U && (U.hidden = !Re), B && (B.hidden = Re)), Ve(t);
                    const Ct = t.getAttribute("data-default-new-repo-branch"),
                        Be = document.querySelector(".js-new-repo-owner-default-branch");
                    Be && (Be.textContent = Ct);
                    const It = t.getAttribute("data-owner-settings-link-prefix"),
                        Fe = document.querySelector(".js-new-repo-owner-settings-link-prefix");
                    Fe && (Fe.textContent = It);
                    const He = t.getAttribute("data-owner-settings-url"),
                        Y = document.querySelector(".js-repo-owner-default-branch-settings-link-container"),
                        J = document.querySelector(".js-org-repo-owner-default-branch-settings-info");
                    if (He) {
                        const x = document.querySelector(".js-new-repo-owner-settings-link");
                        x && (x.href = He, Y && (Y.hidden = !1)), J && (J.hidden = !0)
                    } else if (Y && (Y.hidden = !0, J)) {
                        const x = t.hasAttribute("data-viewer-is-org-admin");
                        J.hidden = !x
                    }
                    const Tt = t.getAttribute("data-org-show-trade-controls") === "true",
                        $e = t.getAttribute("data-viewer-is-org-admin") === "true",
                        le = t.getAttribute("data-user-show-trade-controls") === "true",
                        de = Tt && !h,
                        D = document.querySelector(".js-trade-controls-description"),
                        Q = document.querySelector(".js-individual-trade-controls-description");
                    le || de ? (_ && (!le && !$e && de ? _.hidden = !1 : _.hidden = !0), g.disabled = !0, N && (N.hidden = !0), R && (R.hidden = !0), U && (U.hidden = !0), B && (B.hidden = !0)) : (D && (D.hidden = !0), Q && (Q.hidden = !0)), le ? (D && (D.hidden = !0), Q && (Q.hidden = !1)) : de && D && ($e ? D.hidden = !1 : D.hidden = !0), Ye(t, o, d, g), Qe(t.getAttribute("data-permission") === "yes"), et(), je();
                    const ue = document.querySelector(".js-quick-install-container");
                    if (ue) {
                        const x = ue.querySelector(".js-quick-install-divider");
                        x.hidden = !0;
                        const We = document.querySelector("input[name=owner]:checked").parentElement;
                        if (We) {
                            const fe = We.querySelector(".js-quick-install-list-template");
                            if (fe instanceof HTMLTemplateElement) {
                                const ze = ue.querySelector(".js-account-apps");
                                ze.innerHTML = "", ze.append(fe.content.cloneNode(!0)), fe.children.length > 0 && (x.hidden = !1)
                            }
                        }
                    }
                }
                i(he, "handleOwnerChange");

                function ge(e, t) {
                    const n = t.getAttribute("data-org-name"),
                        o = t.getAttribute("data-business-name"),
                        r = i(() => `You are creating a${e==="internal"?"n internal":` ${e}`} repository`, "creatingRepoMessage"),
                        s = i(() => n ? `the ${n} organization` : "your personal account", "creatingOrgMessage"),
                        a = i(() => o ? ` (${o})` : "", "creatingEnterpriseMessage"),
                        l = i(() => `${r()} in ${s()}${a()}.`, "repoDestinationMessage"),
                        d = document.querySelector(".js-new-repo-destination-message");
                    d && (d.textContent = l())
                }
                i(ge, "updateRepoDestinationMessage");

                function Ke(e) {
                    const t = document.querySelector('.js-owner-container [aria-checked="true"]');
                    ge(e, t)
                }
                i(Ke, "updateRepoDestinationMessageFromVisibility");

                function Ve(e) {
                    const t = document.querySelector(".js-privacy-toggle:checked");
                    !t || ge(t.value, e)
                }
                i(Ve, "updateRepoDestinationMessageFromSelectedOwner");

                function ye(e, t, n, o, r) {
                    e ? (t && (t.disabled = !1), n && n.classList.remove("color-fg-muted"), o && (o.hidden = !1), r && (r.hidden = !0)) : (t && (t.disabled = !0), n && n.classList.add("color-fg-muted"), o && (o.hidden = !0), r && (r.hidden = !1))
                }
                i(ye, "enableDisableRepoType");

                function Ze() {
                    const e = document.querySelectorAll('.js-org-upgrade-link:not([hidden=""]');
                    for (const t of e) t.hidden = !0
                }
                i(Ze, "hideOrgUpgradeLinks");

                function Ye(e, t, n, o) {
                    let r = null;
                    if (e.getAttribute("data-default") === "private" && o && !o.disabled ? r = o : e.getAttribute("data-default") === "internal" && n && !n.disabled ? r = n : t && !t.disabled ? r = t : n && !n.disabled && (r = n), !r) return;
                    const s = t && t.disabled && t.checked || o.disabled && o.checked || n && n.disabled && n.checked,
                        a = (!t || !t.checked) && (!n || !n.checked) && !o.checked;
                    (me === !1 || s === !0 || a === !0) && (r.checked = !0, (0, c.f)(r, "change"))
                }
                i(Ye, "ensureOneRadioIsSelected");

                function Je(e, t) {
                    let n = !1;
                    const o = document.querySelectorAll(".js-new-repo-internal-visibility");
                    for (const r of o) {
                        r.hidden = !0;
                        const s = r.querySelector(".js-privacy-toggle[value=internal]");
                        s instanceof HTMLInputElement && s.checked && (n = !0)
                    }
                    if (e) {
                        const r = document.querySelector(`#new-repo-internal-visibility-${e}`);
                        if (r) {
                            r.hidden = !1;
                            const s = r.querySelector(".js-privacy-toggle-label-internal"),
                                a = r.querySelector(".js-internal-description"),
                                l = r.querySelector(".js-internal-restricted-by-policy-description"),
                                d = r.querySelector(".js-privacy-toggle[value=internal]");
                            if (d instanceof HTMLInputElement) return t.getAttribute("data-org-allow-internal-repos") === "false" ? (d.disabled = !0, s && s.classList.add("color-fg-muted"), a && (a.hidden = !0), l && (l.hidden = !1)) : (n && (d.checked = !0, (0, c.f)(d, "change")), d.disabled = !1, s && s.classList.remove("color-fg-muted"), a && (a.hidden = !1), l && (l.hidden = !0)), d
                        }
                    }
                    return null
                }
                i(Je, "updateInternalDiv");

                function Qe(e) {
                    for (const o of document.querySelectorAll(".js-with-permission-fields")) o.hidden = !e;
                    for (const o of document.querySelectorAll(".js-without-permission-fields")) o.hidden = e;
                    const t = document.querySelector(".errored"),
                        n = document.querySelector("dl.warn");
                    t && (t.hidden = !e), n && (n.hidden = !e)
                }
                i(Qe, "togglePermissionFields");

                function je(e) {
                    const t = document.querySelector("#js-upgrade-container");
                    if (!t) return;
                    const n = t.querySelector(".js-billing-section"),
                        o = t.querySelector(".js-confirm-upgrade-checkbox");
                    let r = e ? e.target : null;
                    r || (r = document.querySelector(".js-privacy-toggle:checked")), r.value === "false" ? (t.hidden = !1, n && n.classList.remove("has-removed-contents"), o && (o.checked = !0)) : (t.hidden = !0, n && n.classList.add("has-removed-contents"), o && (o.checked = !1)), Ke(r.value), A()
                }
                i(je, "handlePrivacyChange");

                function et() {
                    const e = document.querySelector("#js-upgrade-container");
                    if (!e) return;
                    const t = document.querySelector("#js-payment-methods-form");
                    e.firstElementChild && t.appendChild(e.firstElementChild);
                    const n = document.querySelector("input[name=owner]:checked").value,
                        o = t.querySelector(`.js-upgrade[data-login="${n}"]`);
                    o && e.appendChild(o)
                }
                i(et, "updateUpsell");

                function A() {
                    const e = document.querySelector(".js-repo-form"),
                        t = e.querySelector(".js-repository-owner-choice:checked"),
                        n = e.querySelector(".js-repo-name"),
                        o = e.querySelector(".js-repo-url"),
                        r = e.querySelector(".js-repo-gitignore"),
                        s = e.querySelector(".js-repo-license");
                    let a = o ? !o.classList.contains("is-autocheck-errored") : !0;
                    if (a = a && !!t, a && n && (a = n.classList.contains("is-autocheck-successful"), Ge() && (a = a && tt())), r && r.checked) {
                        const d = e.querySelector('input[name="repository[gitignore_template]"]:checked');
                        a = a && d.value !== ""
                    }
                    if (s && s.checked) {
                        const d = e.querySelector('input[name="repository[license_template]"]:checked');
                        a = a && d.value !== ""
                    }
                    const l = e.querySelector("button[type=submit]");
                    l.disabled = !a
                }
                i(A, "validate");

                function tt() {
                    const e = document.querySelector("#js-upgrade-container");
                    if (!e) return !0;
                    if (e.querySelector(".js-ofac-sanction-notice")) return !1;
                    const n = e.querySelector(".js-confirm-upgrade-checkbox");
                    if (n instanceof HTMLInputElement && !n.checked) return !1;
                    const o = e.querySelector(".js-zuora-billing-info");
                    return !(o && o.classList.contains("d-none"))
                }
                i(tt, "validBillingInfo");

                function nt(e) {
                    const t = e.closest(".js-repo-init-setting-container");
                    if (!t) return;
                    const n = t.querySelector(".js-repo-init-setting-unchecked-menu-option");
                    n && !n.checked && (n.checked = !0, (0, c.f)(n, "change"))
                }
                i(nt, "onRepoInitSettingUnchecked");

                function ot(e) {
                    const t = e.closest(".js-repo-init-setting-container");
                    if (!t) return;
                    const n = t.querySelector(".js-toggle-repo-init-setting");
                    (n == null ? void 0 : n.checked) && (n.checked = !1, (0, c.f)(n, "change"))
                }
                i(ot, "onRepoInitNoneMenuOptionSelected");

                function rt(e) {
                    const t = e.closest("form"),
                        n = t.querySelector(".js-new-repo-default-branch-info");
                    if (!n) return;
                    const r = t.querySelectorAll(".js-toggle-new-repo-default-branch-info:checked").length > 0;
                    n.hidden = !r
                }
                i(rt, "toggleDefaultBranchInfo"), (0, b.N7)("#js-upgrade-container .js-zuora-billing-info:not(.d-none)", A), (0, b.N7)(".js-page-new-repo", function() {
                    const e = document.querySelector("#js-upgrade-container");
                    e && (e.hidden = !0), he();
                    const t = document.querySelector(".js-repo-form"),
                        n = t.querySelector(".js-repo-url");
                    if (n) {
                        n.focus();
                        return
                    }
                    const o = t.querySelector(".js-template-repository-select");
                    if (o) {
                        o.focus();
                        return
                    }
                    const r = t.querySelector(".js-owner-select");
                    r && r.focus()
                }), (0, c.on)("click", ".js-reponame-suggestion", function(e) {
                    const t = document.querySelector(".js-repo-name");
                    t.value = e.currentTarget.textContent, (0, c.f)(t, "input", !1)
                }), (0, c.on)("click", ".js-privacy-toggle", function() {
                    me = !0
                }), (0, c.on)("change", ".js-privacy-toggle", je), (0, c.on)("details-menu-selected", ".js-owner-container", he, {
                    capture: !0
                }), (0, c.on)("change", "#js-upgrade-container input", A), (0, W.q6)("#js-upgrade-container input", A);
                const st = i(e => {
                        const t = document.querySelector(".js-org-profile");
                        if (t) {
                            const n = document.querySelector(".js-owner-container input.js-repository-owner-is-org:checked"),
                                o = e.target,
                                r = !(n && o.value.toLowerCase() === ".github");
                            t.hidden = r;
                            const s = document.querySelector("#repo-name-suggestion");
                            s.hidden = !r
                        }
                    }, "renderOrgProfileHint"),
                    at = i(e => {
                        const t = document.querySelector(".js-org-private-profile");
                        if (t) {
                            const n = document.querySelector(".js-owner-container input.js-repository-owner-is-org:checked"),
                                o = e.target,
                                r = !(n && o.value.toLowerCase() === ".github-private");
                            t.hidden = r;
                            const s = document.querySelector("#repo-name-suggestion");
                            s.hidden = !r
                        }
                    }, "renderOrgPrivateProfileHint"),
                    it = i(e => {
                        const t = document.querySelector(".js-personal");
                        if (t) {
                            const n = document.querySelector(".js-owner-container input.js-repository-owner-is-viewer"),
                                o = e.target,
                                r = !(n && n.checked && n.defaultValue.toLowerCase() === o.value.toLowerCase());
                            t.hidden = r;
                            const s = document.querySelector("#repo-name-suggestion");
                            s.hidden = !r
                        }
                    }, "renderPersonalProfileHint");
                (0, W.q6)(".js-owner-reponame .js-repo-name", function(e) {
                    it(e), st(e), at(e), A()
                }), (0, c.on)("auto-check-send", ".js-repo-name-auto-check", function(e) {
                    const o = e.currentTarget.form.querySelector("input[name=owner]:checked").value;
                    e.detail.body.append("owner", o)
                }), (0, c.on)("auto-check-complete", ".js-repo-name-auto-check", A), (0, W.q6)(".js-repo-url", function(e) {
                    const t = e.target;
                    if (!(t instanceof HTMLInputElement)) return;
                    const n = t.closest(".form-group");
                    if (!(n instanceof HTMLDListElement)) return;
                    const o = document.querySelector(".js-insecure-url-warning"),
                        r = document.querySelector(".js-svn-url-error"),
                        s = document.querySelector(".js-git-url-error"),
                        a = t.value.toLowerCase();
                    o.hidden = !a.startsWith("http://"), r.hidden = !a.startsWith("svn://"), s.hidden = !a.startsWith("git://"), a.startsWith("svn://") || a.startsWith("git://") ? (t.classList.add("is-autocheck-errored"), n.classList.add("errored")) : (t.classList.remove("is-autocheck-errored"), n.classList.remove("errored")), A()
                }), (0, c.on)("change", ".js-toggle-repo-init-setting", e => {
                    const t = e.currentTarget;
                    t.checked || nt(t), A()
                }), (0, c.on)("change", ".js-repo-init-setting-unchecked-menu-option", e => {
                    const t = e.currentTarget;
                    t.checked && ot(t), A()
                }), (0, c.on)("change", ".js-repo-init-setting-menu-option", A), (0, c.on)("change", ".js-repo-readme", A), (0, c.on)("change", ".js-toggle-new-repo-default-branch-info", e => {
                    const t = e.currentTarget;
                    rt(t)
                });
                var Et = u(5909);
                (0, b.N7)(".js-pulse-contribution-data", e => {
                    lt(e)
                });
                async function ct(e) {
                    return (0, v.a)(document, e)
                }
                i(ct, "diffstatCall");
                async function lt(e) {
                    const t = e.getAttribute("data-pulse-diffstat-summary-url");
                    let n;
                    try {
                        t && (n = await ct(t), dt(n, e))
                    } catch {
                        const r = e.querySelector(".js-blankslate-loading"),
                            s = e.querySelector(".js-blankslate-error");
                        r.classList.add("d-none"), s.classList.remove("d-none")
                    }
                }
                i(lt, "loadContributionData");

                function dt(e, t) {
                    t.innerHTML = "", t.appendChild(e)
                }
                i(dt, "showContributionData");
                var be = u(43682);
                async function Se(e) {
                    const t = e.form,
                        n = t.querySelector("#release_draft");
                    n.value = "1", z(e, "saving");
                    const o = await fetch(t.action, {
                        method: t.method,
                        body: new FormData(t),
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    if (!o.ok) {
                        z(e, "failed");
                        return
                    }
                    const r = await o.json();
                    return z(e, "saved"), setTimeout(z, 5e3, e, "default"), (0, c.f)(t, "release:saved", {
                        release: r
                    }), r
                }
                i(Se, "saveDraft"), (0, c.on)("change", ".js-releases-marketplace-publish-field", function(e) {
                    ve(e.currentTarget)
                }), (0, b.N7)(".js-releases-marketplace-publish-field", function(e) {
                    ve(e)
                });

                function ve(e) {
                    const n = e.closest(".js-releases-marketplace-publish-container").querySelector(".js-releases-marketplace-publish-preview");
                    e.checked ? n.classList.remove("d-none") : n.classList.add("d-none")
                }
                i(ve, "processMarketplacePublishCheckbox"), (0, c.on)("click", ".js-save-draft", function(e) {
                    const t = e.currentTarget;
                    Se(t), e.preventDefault()
                });

                function z(e, t) {
                    for (const n of e.querySelectorAll(".js-save-draft-button-state")) n.hidden = n.getAttribute("data-state") !== t;
                    e.disabled = t === "saving"
                }
                i(z, "setState"), (0, c.on)("release:saved", ".js-release-form", function(e) {
                    const t = e.detail.release,
                        n = e.currentTarget;
                    if (n.setAttribute("action", t.update_url), t.update_authenticity_token) {
                        const r = n.querySelector("input[name=authenticity_token]");
                        r.value = t.update_authenticity_token
                    }(0, j.lO)((0, be.y0)(), document.title, t.edit_url);
                    const o = n.querySelector("#release_id");
                    if (!o.value) {
                        o.value = t.id;
                        const r = document.createElement("input");
                        r.type = "hidden", r.name = "_method", r.value = "put", n.appendChild(r)
                    }
                }), (0, c.on)("click", ".js-publish-release", function() {
                    document.querySelector("#release_draft").value = "0"
                });

                function F(e) {
                    const t = document.querySelector(".js-release-target-wrapper");
                    if (t != null) {
                        switch (ut(e), e) {
                            case "valid":
                            case "invalid":
                            case "duplicate":
                                t.hidden = !0;
                                break;
                            case "loading":
                                break;
                            default:
                                t.hidden = !1
                        }
                        for (const n of document.querySelectorAll(".js-tag-status-message")) n.hidden = n.getAttribute("data-state") !== e;
                        ne(), H("pending")
                    }
                }
                i(F, "setTagWrapperState");

                function we() {
                    return document.querySelector(".js-release-tag").getAttribute("data-state")
                }
                i(we, "getTagState");

                function ut(e) {
                    document.querySelector(".js-release-tag").setAttribute("data-state", e)
                }
                i(ut, "setTagState");
                const qe = new WeakMap;

                function ee(e) {
                    const t = e.querySelector('input[name="release[tag_name]"]:checked');
                    return t == null ? void 0 : t.value
                }
                i(ee, "getTagName");
                async function ke(e) {
                    const t = ee(e);
                    if (!t) {
                        F("empty");
                        return
                    }
                    if (t === qe.get(e)) return;
                    F("loading"), qe.set(e, t);
                    const n = e.getAttribute("data-url"),
                        o = new URL(n, window.location.origin),
                        r = new URLSearchParams(o.search.slice(1));
                    r.append("tag_name", t), o.search = r.toString();
                    const s = await fetch(o.toString(), {
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    if (!s.ok) {
                        F("invalid");
                        return
                    }
                    const a = await s.json();
                    a.status === "duplicate" && parseInt(e.getAttribute("data-existing-id")) === parseInt(a.release_id) ? F("valid") : (document.querySelector(".js-release-tag .js-edit-release-link").setAttribute("href", a.url), F(a.status)), Ce(e)
                }
                i(ke, "checkTag"), (0, c.on)("click", ".js-generate-release-notes", function(e) {
                    const t = e.currentTarget;
                    t.disabled || ft(t)
                });
                async function ft(e) {
                    H("loading"), e.disabled = !0;
                    const n = `${e.getAttribute("data-repo-url")}/releases/notes`,
                        o = new URL(n, window.location.origin),
                        r = new URLSearchParams(o.search.slice(1));
                    r.append("commitish", Le()), r.append("tag_name", ee(document) || ""), o.search = r.toString();
                    const s = await fetch(o.toString(), {
                        headers: {
                            Accept: "application/json"
                        }
                    });
                    if (s.ok) {
                        const a = await s.json();
                        if (a.commitish === Le()) {
                            const l = document.getElementById("release_body"),
                                d = Ae() === "generated" ? "" : l.value.trim();
                            d ? l.value = d.concat(`

`, a.body) : l.value = a.body;
                            const h = document.getElementById("release_name");
                            h.value || (h.value = a.title), H("succeed"), te(d ? "generated-and-edited" : "generated");
                            const g = document.querySelector(".js-release-body-warning");
                            g.textContent = a.warning_message, g.hidden = !a.warning_message
                        }
                    } else {
                        H("failed"), e.disabled = !1;
                        const a = await s.json();
                        if (a && a.error) {
                            const l = document.querySelector(".js-comment-form-error");
                            l.textContent = a.error, l.hidden = !1
                        }
                    }
                }
                i(ft, "generateNotes");
                const pt = ["pending", "loading", "succeed", "failed"];

                function H(e) {
                    if (pt.map(t => {
                            const n = document.getElementById(`generate-icon-${t}`);
                            n && (t === e ? n.removeAttribute("hidden") : n.setAttribute("hidden", "true"))
                        }), e !== "failed") {
                        const t = document.querySelector(".js-comment-form-error");
                        t.textContent = "", t.hidden = !0
                    }
                }
                i(H, "setGeneratedNotesFetchState");

                function te(e) {
                    const t = document.getElementById("generated_notes_state");
                    t.value = e
                }
                i(te, "setNotesTrackingState");

                function Ae() {
                    return document.getElementById("generated_notes_state").value
                }
                i(Ae, "getNotesTrackingState");

                function Le() {
                    var e;
                    return we() === "valid" ? ee(document) || "" : ((e = document.querySelector('input[name="release[target_commitish]"]:checked')) == null ? void 0 : e.value) || ""
                }
                i(Le, "getCommitish"), (0, b.N7)(".js-release-tag", i(function(t) {
                    ke(t)
                }, "initialize"));

                function Ce(e) {
                    const n = e.closest("form").querySelector(".js-previewable-comment-form");
                    if (!n) return;
                    let o = n.getAttribute("data-base-preview-url");
                    o || (o = String(n.getAttribute("data-preview-url")), n.setAttribute("data-base-preview-url", o));
                    const r = e.querySelectorAll('input[name="release[tag_name]"], input[name="release[target_commitish]"]:checked'),
                        s = new URL(o, window.location.origin),
                        a = new URLSearchParams(s.search.slice(1));
                    for (const l of r) l.value && a.append(l.name, l.value);
                    s.search = a.toString(), n.setAttribute("data-preview-url", s.toString())
                }
                i(Ce, "processChangedTag");

                function ne(e = !1) {
                    const t = document.querySelector(".js-generate-release-notes");
                    if (t) {
                        const n = we(),
                            o = n !== "valid" && n !== "pending";
                        t.disabled = e || o, t.ariaLabel = `${t.disabled?"Select a valid tag to a":"A"}utomatically add the markdown for all the merged pull requests from this diff and contributors of this release`
                    }
                }
                i(ne, "refreshGenerateNotesButton");

                function Ie(e) {
                    if (e.value === "") ne(), H("pending"), te("initial");
                    else {
                        const t = Ae();
                        ne(t !== "initial"), t === "generated" && te("generated-and-edited")
                    }
                }
                i(Ie, "processChangedBody"), (0, c.on)("click", ".js-release-expand-btn", async function(e) {
                    const t = e.currentTarget.closest(".js-release-expandable"),
                        n = t.getAttribute("data-expand-url"),
                        o = await (0, v.a)(document, n);
                    t == null || t.replaceWith(o)
                }), (0, b.N7)("#release_body", function(e) {
                    const t = e;
                    t.addEventListener("input", function() {
                        Ie(t)
                    }), Ie(t)
                }), (0, c.on)("change", ".js-release-tag", function(e) {
                    ke(e.currentTarget)
                }), (0, b.N7)(".js-release-form .js-previewable-comment-form", function(e) {
                    const t = e.closest("form").querySelector(".js-release-tag");
                    Ce(t)
                });
                let X, oe;
                async function G(e) {
                    const t = document.querySelector(".js-release-stack").getAttribute("data-stack-url"),
                        n = new URL(t, window.location.origin);
                    let o;
                    switch (V({
                        target_found: !0,
                        template_found: !0,
                        loading: !0
                    }, "tag"), e.id) {
                        case "tag-list":
                            {
                                const r = e.querySelector('input[name="release[tag_name]"]:checked');
                                if (!r) return;o = await K(n, "ref", r),
                                !o.target_found && !!X && (o = await K(n, oe, X)),
                                V(o, "tag");
                                break
                            }
                        case "filter-list-branches":
                            {
                                const r = e.querySelector('input[name="release[target_commitish]"]:checked');
                                if (!r) return;X = r,
                                oe = "ref",
                                o = await K(n, "ref", r),
                                V(o, "branch");
                                break
                            }
                        case "filter-list-tags":
                            {
                                const r = e.querySelector('input[name="release[target_commitish]"]:checked');
                                if (!r) return;X = r,
                                oe = "oid",
                                o = await K(n, "oid", r),
                                V(o, "commit");
                                break
                            }
                    }
                }
                i(G, "validateStack");
                const re = new WeakMap;
                async function K(e, t, n) {
                    if (re.has(n)) return re.get(n);
                    const o = new URLSearchParams(e.search.slice(1));
                    o.append(t, n.value), e.search = o.toString();
                    const r = await fetch(e.toString(), {
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    let s = {
                        target_found: !1
                    };
                    return r.ok && (s = await r.json(), s.target_found = !0), re.set(n, s), s
                }
                i(K, "getStackStatus");
                const mt = {
                    branding: "Icon and color found in stack template.",
                    template: "Contains all the required information.",
                    readme: "File exists."
                };

                function V(e, t) {
                    if (!e.target_found) return;
                    const n = document.querySelector(".js-releases-marketplace-banner-container"),
                        o = document.querySelector(".js-releases-marketplace-publish-heading"),
                        r = document.querySelector(".js-publish-release");
                    let s = !1;
                    if (r.disabled = o.hidden = n.hidden = !e.template_found, !e.template_found) return;
                    const a = ["branding", "template", "readme"];
                    for (const l of a) {
                        let d;
                        e.loading ? d = "loading" : d = e[l] ? "failure" : "success", d === "failure" && (s = !0);
                        const h = n.querySelector(`#${l}-row`);
                        for (const S of h.querySelectorAll(".status-icon")) S.hidden = S.getAttribute("data-state") !== d;
                        const g = h.querySelector(".js-status-text");
                        for (const S of ["color-fg-attention", "color-fg-danger", "color-fg-muted"]) g.classList.remove(S);
                        switch (d) {
                            case "success":
                                g.textContent = mt[l], g.classList.add("color-fg-muted");
                                break;
                            case "failure":
                                g.textContent = e[l], g.classList.add("color-fg-danger");
                                break;
                            case "loading":
                                g.textContent = "Loading...", g.classList.add("color-fg-attention")
                        }
                        for (const S of h.querySelectorAll(".js-modify-button")) {
                            const N = `${l}_path`;
                            S.setAttribute("href", e[N]), t === "branch" && d !== "loading" ? S.hidden = S.getAttribute("data-state") !== d : S.hidden = !0
                        }
                    }
                    r.disabled = s
                }
                i(V, "updateStackChecks"), (0, c.on)("change", ".js-release-stack #filter-list-branches", e => G(e.currentTarget)), (0, c.on)("change", ".js-release-stack #filter-list-tags", e => G(e.currentTarget)), (0, c.on)("change", ".js-release-stack #tag-list", e => G(e.currentTarget)), (0, b.N7)(".js-release-stack #filter-list-branches", function(e) {
                    G(e)
                });
                const Te = "<BRANCH>";

                function ht(e) {
                    const t = e.closest(".js-rename-branch-form");
                    let n = e.value;
                    const o = n !== e.defaultValue && n !== "",
                        r = t.querySelector(".js-rename-branch-autocheck-message");
                    if (r && o) {
                        let s = !1;
                        n = r.getAttribute("data-shell-safe-name") || Te, n.includes("<") && (s = !0);
                        for (const l of t.querySelectorAll(".js-rename-branch-new-name")) l.textContent = n;
                        n = r.getAttribute("data-shell-safe-name-with-remote") || `origin/${Te}`, n.includes("<") && (s = !0);
                        for (const l of t.querySelectorAll(".js-rename-branch-new-name-with-remote")) l.textContent = n;
                        const a = t.querySelector(".js-rename-branch-special-characters-documentation");
                        a && s && (a.hidden = !1, a.removeAttribute("aria-hidden"))
                    }
                }
                i(ht, "updateRenameInstructions"), (0, c.on)("auto-check-message-updated", ".js-rename-branch-input", function(e) {
                    const t = e.currentTarget;
                    ht(t)
                });
                const Pe = i(e => {
                        const t = document.querySelector(Ee);
                        if (t) {
                            const n = e.value.length === 0;
                            t.disabled = n
                        }
                    }, "toggleSubmit"),
                    Ee = 'form.js-protected-branch-settings button[type="submit"]';
                (0, b.N7)(Ee, {
                    add() {
                        const e = document.getElementById("rule_field");
                        e && (Pe(e), e.addEventListener("input", () => Pe(e)))
                    }
                }), (0, c.on)("change", ".js-template-repository-choice", function(e) {
                    const t = e.target,
                        n = t.checked && t.value !== "",
                        o = t.form;
                    o.querySelector(".js-repository-auto-init-options").classList.toggle("has-removed-contents", n);
                    const s = o.querySelectorAll(".js-template-repository-setting"),
                        a = o.querySelectorAll(".js-template-repository-name-display");
                    if (n) {
                        const d = t.closest(".js-template-repository-choice-container").querySelector(".js-template-repository-name"),
                            h = t.getAttribute("data-owner"),
                            g = o.querySelector(`.js-repository-owner-choice[value="${h}"]`);
                        if (g instanceof HTMLInputElement) g.checked = !0, (0, c.f)(g, "change");
                        else {
                            const S = o.querySelector(".js-repository-owner-choice.js-repository-owner-is-viewer");
                            S.checked = !0, (0, c.f)(S, "change")
                        }
                        for (const S of a) S.textContent = d.textContent
                    } else
                        for (const l of a) l.textContent = "";
                    for (const l of s) l.hidden = !n
                });
                var se = u(47142),
                    gt = u(10160),
                    yt = u(69567),
                    jt = u(4687);
                const ae = (0, jt.Z)(se.Gs);

                function bt(e) {
                    return encodeURIComponent(e).replaceAll("%2F", "/")
                }
                i(bt, "urlEncodeItem"), (0, W.w4)("keydown", ".js-tree-finder-field", e => {
                    e.key === "Escape" && (e.preventDefault(), history.back())
                }), (0, b.N7)(".js-tree-finder", e => {
                    const t = e.querySelector(".js-tree-finder-field"),
                        n = e.querySelector(".js-tree-finder-virtual-filter"),
                        o = e.querySelector(".js-tree-browser"),
                        r = e.querySelector(".js-tree-browser-results"),
                        s = e.querySelector(".js-tree-browser-result-template"),
                        a = new gt.Z(t, r);
                    n.filter = (l, d) => d === "" || (0, se.CD)(d, l) && ae(d, l) > 0, n.addEventListener("virtual-filter-input-filter", () => {
                        o.updating = "lazy"
                    }), n.addEventListener("virtual-filter-input-filtered", () => {
                        o.updating = "eager"
                    }), o.addEventListener("virtual-list-sort", l => {
                        l.preventDefault();
                        const d = t.value;
                        o.sort((h, g) => ae(d, g) - ae(d, h))
                    }), o.addEventListener("virtual-list-update", () => {
                        a.stop()
                    }), o.addEventListener("virtual-list-updated", () => {
                        a.start(), a.navigate()
                    }), o.addEventListener("virtual-list-render-item", l => {
                        if (!(l instanceof CustomEvent)) return;
                        const d = new yt.R(s, {
                                item: l.detail.item,
                                id: `entry-${Math.random().toString().substr(2,5)}`,
                                urlEncodedItem: bt(l.detail.item)
                            }),
                            h = d.querySelector("marked-text");
                        h && (h.positions = se.m7), l.detail.fragment.append(d)
                    }), o.querySelector("ul").hidden = !1, t.focus(), a.start()
                });
                var St = u(57260);
                let $ = null;
                const ie = new WeakMap;

                function vt(e, t) {
                    const o = e.closest(".js-upload-manifest-file-container").querySelector(".js-upload-progress");
                    o.hidden = !1, e.classList.add("is-progress-bar");
                    const r = o.querySelector(".js-upload-meter-text"),
                        s = r.querySelector(".js-upload-meter-range-start");
                    s.textContent = String(t.uploaded() + 1);
                    const a = r.querySelector(".js-upload-meter-range-end");
                    a.textContent = String(t.size)
                }
                i(vt, "showProgress");

                function _e(e) {
                    e.classList.remove("is-progress-bar");
                    const t = e.closest(".js-upload-manifest-file-container"),
                        n = t.querySelector(".js-upload-progress");
                    n.hidden = !0;
                    const o = t.querySelector(".js-upload-meter-text .js-upload-meter-filename");
                    o.textContent = ""
                }
                i(_e, "hideProgress"), (0, c.on)("file-attachment-accept", ".js-upload-manifest-file", function(e) {
                    const {
                        attachments: t
                    } = e.detail, n = parseInt(e.currentTarget.getAttribute("data-directory-upload-max-files") || "", 10);
                    t.length > n && (e.preventDefault(), e.currentTarget.classList.add("is-too-many"))
                }), (0, c.on)("document:drop", ".js-upload-manifest-tree-view", async function(e) {
                    const {
                        transfer: t
                    } = e.detail, n = e.currentTarget, o = await St.P.traverse(t, !0), r = document.querySelector("#js-repo-pjax-container");
                    r.addEventListener("pjax:success", () => {
                        r.querySelector(".js-upload-manifest-file").attach(o)
                    }, {
                        once: !0
                    });
                    const s = n.getAttribute("data-drop-url");
                    (0, be.ZP)({
                        url: s,
                        container: r
                    })
                }), (0, c.on)("upload:setup", ".js-upload-manifest-file", async function(e) {
                    const {
                        batch: t,
                        form: n,
                        preprocess: o
                    } = e.detail, r = e.currentTarget;
                    vt(r, t);

                    function s() {
                        n.append("upload_manifest_id", ie.get(r))
                    }
                    if (i(s, "addInfo"), ie.get(r)) {
                        s();
                        return
                    }
                    if ($) {
                        o.push($.then(s));
                        return
                    }
                    const l = r.closest(".js-upload-manifest-file-container").querySelector(".js-upload-manifest-form");
                    $ = fetch(l.action, {
                        method: l.method,
                        body: new FormData(l),
                        headers: {
                            Accept: "application/json"
                        }
                    });
                    const [d, h] = wt();
                    o.push(d.then(s));
                    const g = await $;
                    if (!g.ok) return;
                    const S = await g.json(),
                        _ = document.querySelector(".js-manifest-commit-form").elements.namedItem("manifest_id");
                    _.value = S.upload_manifest.id, ie.set(r, S.upload_manifest.id), $ = null, h()
                });

                function wt() {
                    let e;
                    return [new Promise(n => {
                        e = n
                    }), e]
                }
                i(wt, "makeDeferred"), (0, c.on)("upload:start", ".js-upload-manifest-file", function(e) {
                    const {
                        attachment: t,
                        batch: n
                    } = e.detail, s = e.currentTarget.closest(".js-upload-manifest-file-container").querySelector(".js-upload-progress").querySelector(".js-upload-meter-text"), a = s.querySelector(".js-upload-meter-range-start");
                    a.textContent = n.uploaded() + 1;
                    const l = s.querySelector(".js-upload-meter-filename");
                    l.textContent = t.fullPath
                }), (0, c.on)("upload:complete", ".js-upload-manifest-file", function(e) {
                    const {
                        attachment: t,
                        batch: n
                    } = e.detail, r = document.querySelector(".js-manifest-commit-file-template").querySelector(".js-manifest-file-entry").cloneNode(!0), s = r.querySelector(".js-filename");
                    s.textContent = t.fullPath;
                    const a = t.id,
                        d = r.querySelector(".js-remove-manifest-file-form").elements.namedItem("file_id");
                    d.value = a;
                    const h = document.querySelector(".js-manifest-file-list");
                    h.hidden = !1, e.currentTarget.classList.add("is-file-list"), h.querySelector(".js-manifest-file-list-root").appendChild(r), n.isFinished() && _e(e.currentTarget)
                }), (0, c.on)("upload:progress", ".js-upload-manifest-file", function(e) {
                    const {
                        batch: t
                    } = e.detail, o = e.currentTarget.closest(".js-upload-manifest-file-container").querySelector(".js-upload-meter");
                    o.style.width = `${t.percent()}%`
                });

                function xe(e) {
                    _e(e.currentTarget)
                }
                i(xe, "upload_manifest_file_onerror"), (0, c.on)("upload:error", ".js-upload-manifest-file", xe), (0, c.on)("upload:invalid", ".js-upload-manifest-file", xe), (0, pe.AC)(".js-remove-manifest-file-form", async function(e, t) {
                    await t.html();
                    const n = e.closest(".js-manifest-file-list-root");
                    if (e.closest(".js-manifest-file-entry").remove(), !n.hasChildNodes()) {
                        const r = n.closest(".js-manifest-file-list");
                        r.hidden = !0, document.querySelector(".js-upload-manifest-file").classList.remove("is-file-list")
                    }
                });
                async function qt(e) {
                    const t = e.getAttribute("data-redirect-url");
                    try {
                        await (0, v.D)(e.getAttribute("data-poll-url")), window.location.href = t
                    } catch {
                        document.querySelector(".js-manifest-ready-check").hidden = !0, document.querySelector(".js-manifest-ready-check-failed").hidden = !1
                    }
                }
                i(qt, "manifestReadyCheck"), (0, b.N7)(".js-manifest-ready-check", {
                    initialize(e) {
                        qt(e)
                    }
                }), (0, c.on)("click", ".js-release-remove-file", function(e) {
                    const t = e.currentTarget.closest(".js-release-file");
                    t.classList.add("delete"), t.querySelector("input.destroy").value = "true"
                }), (0, c.on)("click", ".js-release-undo-remove-file", function(e) {
                    const t = e.currentTarget.closest(".js-release-file");
                    t.classList.remove("delete"), t.querySelector("input.destroy").value = ""
                });

                function Me(e) {
                    return e.closest("form").querySelector("#release_id").value
                }
                i(Me, "getReleaseId");
                let Z = null;
                (0, c.on)("release:saved", ".js-release-form", function(e) {
                    const t = e.currentTarget;
                    Z = null;
                    let n = !1;
                    for (const r of t.querySelectorAll(".js-releases-field .js-release-file")) r.classList.contains("delete") ? r.remove() : r.classList.contains("js-template") || (n = !0);
                    const o = t.querySelector(".js-releases-field");
                    o.classList.toggle("not-populated", !n), o.classList.toggle("is-populated", n)
                });

                function De(e, t) {
                    t.append("release_id", Me(e));
                    const n = Array.from(document.querySelectorAll(".js-releases-field .js-release-file.delete .id"));
                    if (n.length) {
                        const o = n.map(r => r.value);
                        t.append("deletion_candidates", o.join(","))
                    }
                }
                i(De, "addInfo"), (0, c.on)("upload:setup", ".js-upload-release-file", function(e) {
                    const {
                        form: t,
                        preprocess: n
                    } = e.detail, o = e.currentTarget;
                    if (Me(o)) {
                        De(o, t);
                        return
                    }
                    if (!Z) {
                        const s = document.querySelector(".js-save-draft");
                        Z = Se(s)
                    }
                    const r = De.bind(null, o, t);
                    n.push(Z.then(r))
                }), (0, c.on)("upload:start", ".js-upload-release-file", function(e) {
                    const t = e.detail.policy;
                    e.currentTarget.querySelector(".js-upload-meter").classList.remove("d-none");
                    const o = t.asset.replaced_asset;
                    if (!!o)
                        for (const r of document.querySelectorAll(".js-releases-field .js-release-file .id")) Number(r.value) === o && r.closest(".js-release-file").remove()
                }), (0, c.on)("upload:complete", ".js-upload-release-file", function(e) {
                    var t;
                    const {
                        attachment: n
                    } = e.detail, o = document.querySelector(".js-releases-field"), r = o.querySelector(".js-template").cloneNode(!0);
                    r.classList.remove("d-none", "js-template"), r.querySelector("input.id").value = n.id;
                    const s = n.name || n.href.split("/").pop();
                    for (const d of o.querySelectorAll(".js-release-file"))((t = d.querySelector(".js-release-asset-filename")) == null ? void 0 : t.value) === s && d.getAttribute("data-state") === "starter" && d.remove();
                    for (const d of r.querySelectorAll(".js-release-asset-filename")) d instanceof HTMLInputElement ? d.value = s : d.textContent = s;
                    const a = `(${(n.file.size/(1024*1024)).toFixed(2)} MB)`;
                    r.querySelector(".js-release-asset-filesize").textContent = a, r.setAttribute("data-state", "uploaded"), o.appendChild(r), o.classList.remove("not-populated"), o.classList.add("is-populated"), e.currentTarget.querySelector(".js-upload-meter").classList.add("d-none")
                }), (0, c.on)("upload:progress", ".js-upload-release-file", function(e) {
                    const {
                        attachment: t
                    } = e.detail, n = e.currentTarget.querySelector(".js-upload-meter");
                    n.style.width = `${t.percent}%`
                });
                var kt = u(27925),
                    At = Object.defineProperty,
                    Lt = Object.getOwnPropertyDescriptor,
                    Oe = i((e, t, n, o) => {
                        for (var r = o > 1 ? void 0 : o ? Lt(t, n) : t, s = e.length - 1, a; s >= 0; s--)(a = e[s]) && (r = (o ? a(t, n, r) : a(r)) || r);
                        return o && r && At(t, n, r), r
                    }, "repo_codespaces_count_element_decorateClass");
                let ce = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.count = 0
                    }
                    connectedCallback() {
                        (0, b.N7)("get-repo", {
                            constructor: kt.b,
                            add: e => {
                                this.handleGetRepoElement(e)
                            }
                        })
                    }
                    handleGetRepoElement(e) {
                        !e.openOrCreateInCodespace || (this.count === 0 ? e.showOpenOrCreateInCodespace() : e.removeOpenOrCreateInCodespace())
                    }
                }, "RepoCodespacesCountElement");
                Oe([m.Lj], ce.prototype, "count", 2), ce = Oe([m.Ih], ce);
                var _t = u(9115),
                    xt = u(68906),
                    Mt = u(63355)
            }
        },
        L => {
            var C = i(m => L(L.s = m), "__webpack_exec__");
            L.O(0, [5724, 90, 6813, 6637, 3682, 6791], () => C(15820));
            var u = L.O()
        }
    ]);
})();

//# sourceMappingURL=repositories-6a2fce135eb0.js.map