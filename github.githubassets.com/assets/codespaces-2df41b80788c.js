"use strict";
(() => {
    var re = Object.defineProperty;
    var l = (x, L) => re(x, "name", {
        value: L,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [7807], {
            67666: (x, L, h) => {
                var v = h(64463),
                    p = h(59753),
                    f = h(65935),
                    d = h(82036);
                (0, p.on)("click", ".js-codespaces-update-skus-url", e => {
                    const t = e.currentTarget;
                    if (!t) return;
                    const n = t.getAttribute("data-refname");
                    if (document.querySelector("form.js-prefetch-codespace-location") && n) {
                        const c = document.querySelector("[data-codespace-skus-url]"),
                            _ = c ? c.getAttribute("data-codespace-skus-url") : "";
                        if (_) {
                            const k = new URL(_, window.location.origin);
                            k.searchParams.set("ref_name", n), c && c.setAttribute("data-codespace-skus-url", k.toString()), c && c.setAttribute("data-branch-has-changed", "true")
                        }
                    }
                }), (0, p.on)("remote-input-error", "#js-codespaces-repository-select", () => {
                    const e = document.querySelector("#js-codespaces-unable-load-repositories-warning");
                    e.hidden = !1
                }), (0, f.AC)(".js-new-codespace-form", async function(e, t) {
                    const n = e.closest("[data-replace-remote-form-target]"),
                        i = n.querySelector(".js-new-codespace-submit-button");
                    i instanceof HTMLInputElement && (i.disabled = !0), e.classList.remove("is-error"), e.classList.add("is-loading");
                    try {
                        const c = await t.html();
                        n.replaceWith(c.html)
                    } catch {
                        e.classList.remove("is-loading"), e.classList.add("is-error")
                    }
                });
                let a = null;

                function o(e) {
                    a = e, e !== null && document.querySelector(".js-codespace-loading-steps").setAttribute("data-current-state", a)
                }
                l(o, "advanceLoadingState"), (0, v.N7)(".js-codespace-loading-steps", {
                    constructor: HTMLElement,
                    add: e => {
                        const t = e.getAttribute("data-current-state");
                        t && o(t)
                    }
                }), (0, v.N7)(".js-codespace-advance-state", {
                    constructor: HTMLElement,
                    add: e => {
                        const t = e.getAttribute("data-state");
                        t && o(t)
                    }
                });
                let u = null;

                function E(e) {
                    (0, f.AC)(".js-fetch-cascade-token", async function(t, n) {
                        try {
                            u = (await n.json()).json.token
                        } catch {}
                    }), (0, d.Bt)(e)
                }
                l(E, "fetchCascadeToken");

                function b(e, t, n) {
                    if (document.querySelector(e)) {
                        const c = Date.now(),
                            k = setInterval(l(() => {
                                const W = Date.now() - c;
                                if (u || W >= n) {
                                    clearInterval(k), t(u || void 0);
                                    return
                                }
                            }, "checkToken"), 50)
                    }
                }
                l(b, "waitForCascadeTokenWithTimeout"), (0, v.N7)(".js-auto-submit-form", {
                    constructor: HTMLFormElement,
                    initialize: d.Bt
                }), (0, v.N7)(".js-workbench-form-container", {
                    constructor: HTMLElement,
                    add: e => {
                        const t = e.querySelector(".js-cascade-token");
                        w(e, t)
                    }
                });

                function w(e, t) {
                    if (t.value !== "") {
                        const n = e.querySelector("form");
                        (0, d.Bt)(n)
                    } else {
                        const n = document.querySelector(".js-fetch-cascade-token");
                        E(n), b(".js-workbench-form-container", A, 1e4)
                    }
                }
                l(w, "resolveCascadeToken");

                function A(e) {
                    const t = document.querySelector(".js-workbench-form-container form");
                    t && e ? (I(t, e), y(t, e), (0, d.Bt)(t)) : o("failed")
                }
                l(A, "insertCodespaceTokenIntoShowAuthForm");

                function I(e, t) {
                    const n = e.querySelector(".js-cascade-token");
                    n && n.setAttribute("value", t)
                }
                l(I, "insertCodespaceTokenIntoCascadeField");

                function y(e, t) {
                    const n = e.querySelector(".js-partner-info");
                    if (n) {
                        let i = n.getAttribute("value");
                        i && (i = i.replace("%CASCADE_TOKEN_PLACEHOLDER%", t), n.setAttribute("value", i))
                    }
                }
                l(y, "insertCodespaceTokenIntoPartnerInfo");
                var r = h(90420),
                    C = h(83956),
                    s = Object.defineProperty,
                    m = Object.getOwnPropertyDescriptor,
                    g = l((e, t, n, i) => {
                        for (var c = i > 1 ? void 0 : i ? m(t, n) : t, _ = e.length - 1, k; _ >= 0; _--)(k = e[_]) && (c = (i ? k(t, n, c) : k(c)) || c);
                        return i && c && s(t, n, c), c
                    }, "__decorateClass");
                let S = l(class extends HTMLElement {
                    async connectedCallback() {
                        const e = this.formForLocations();
                        if (e) {
                            const t = await (0, C.M)(e, !this.vscsLocationList);
                            this.updatePickableLocations(t)
                        }
                    }
                    formForLocations() {
                        return this.advancedOptionsForm || this.createCodespaceForm
                    }
                    toggleLoadingVscode() {
                        const e = this.loadingVscode.hidden,
                            t = this.children;
                        for (let n = 0; n < t.length; n++) t[n].hidden = e;
                        this.loadingVscode.hidden = !e
                    }
                    machineTypeSelected(e) {
                        const n = e.currentTarget.getAttribute("data-sku-name");
                        this.skuNameInput && n && (this.skuNameInput.value = n), this.advancedOptionsForm && this.advancedOptionsForm.requestSubmit()
                    }
                    pollForVscode(e) {
                        this.toggleLoadingVscode();
                        const t = e.currentTarget.getAttribute("data-src");
                        t && this.vscodePoller.setAttribute("src", t)
                    }
                    async updatePickableLocations(e) {
                        const t = this.formForLocations();
                        if (!e && t) {
                            const c = t.getAttribute("data-codespace-locations-url");
                            if (!c) return;
                            e = await (0, C.W)(c)
                        }
                        const n = e.current,
                            i = e.available;
                        this.hideUnavailableLocations(i), this.preventSubmissionOfUnavailableLocation(i, n)
                    }
                    hideUnavailableLocations(e) {
                        if (!!this.vscsLocationList)
                            if (this.advancedOptionsForm) {
                                const t = this.vscsLocationList.querySelectorAll(".select-menu-item");
                                for (const n of t) {
                                    const i = n.querySelector("input");
                                    if (i && e.includes(i.getAttribute("data-location"))) {
                                        n.removeAttribute("hidden");
                                        continue
                                    }
                                    i && (i.removeAttribute("checked"), i.setAttribute("aria-checked", "false")), n.setAttribute("hidden", "hidden")
                                }
                            } else {
                                const t = this.vscsLocationList.querySelectorAll(".SelectMenu-item");
                                for (const n of t) e.includes(n.getAttribute("data-location")) ? n.removeAttribute("hidden") : n.setAttribute("hidden", "hidden")
                            }
                    }
                    preventSubmissionOfUnavailableLocation(e, t) {
                        if (this.createCodespaceForm) {
                            const n = this.createCodespaceForm.querySelector('[name="codespace[location]"]');
                            n && !e.includes(n.value) && (n.value = t, this.vscsLocationSummary && (this.vscsLocationSummary.textContent = this.vscsLocationSummary.getAttribute("data-blank-title")))
                        }
                        if (this.advancedOptionsForm) {
                            const n = this.advancedOptionsForm.querySelector('[name="location"]');
                            n && !e.includes(n.value) && (n.value = t), !this.advancedOptionsForm.querySelector('[name="location"]:checked') && this.autoSelectLocation && this.autoSelectLocation.hidden && (this.selectedLocation && this.selectedLocation.setAttribute("hidden", "hidden"), this.needsSelectedLocation && this.needsSelectedLocation.removeAttribute("hidden"))
                        }
                    }
                    vscsTargetUrlUpdated(e) {
                        const t = e.currentTarget;
                        this.vscsTargetUrl.value = t.value
                    }
                }, "NewCodespaceElement");
                g([r.fA], S.prototype, "form", 2), g([r.fA], S.prototype, "createCodespaceForm", 2), g([r.fA], S.prototype, "createCodespaceWithSkuSelectForm", 2), g([r.fA], S.prototype, "vscsTargetUrl", 2), g([r.fA], S.prototype, "vscsLocationList", 2), g([r.fA], S.prototype, "vscsLocationSummary", 2), g([r.fA], S.prototype, "loadingVscode", 2), g([r.fA], S.prototype, "vscodePoller", 2), g([r.fA], S.prototype, "advancedOptionsForm", 2), g([r.fA], S.prototype, "locationResubmitParam", 2), g([r.fA], S.prototype, "skuNameInput", 2), g([r.fA], S.prototype, "selectedLocation", 2), g([r.fA], S.prototype, "autoSelectLocation", 2), g([r.fA], S.prototype, "needsSelectedLocation", 2), S = g([r.Ih], S);
                var T = h(69567),
                    M = h(51374),
                    O = h(10900);
                (0, p.on)("submit", ".js-toggle-hidden-codespace-form", function(e) {
                    const t = e.currentTarget;
                    R(t)
                }), (0, p.on)("click", ".js-create-codespace-with-sku-button", async function(e) {
                    const t = e.currentTarget,
                        n = t.closest("[data-target*='new-codespace.createCodespaceForm']") || t.closest("[data-target*='new-codespace.createCodespaceWithSkuSelectForm']");
                    await (0, C.M)(n), n.classList.contains("js-open-in-vscode-form") ? (R(n), H(n)) : (n.submit(), B())
                });

                function R(e) {
                    const t = e.querySelectorAll(".js-toggle-hidden");
                    for (const i of t) i.hidden = !i.hidden;
                    const n = e.querySelectorAll(".js-toggle-disabled");
                    for (const i of n) i.getAttribute("aria-disabled") ? i.removeAttribute("aria-disabled") : i.setAttribute("aria-disabled", "true")
                }
                l(R, "toggleFormSubmissionInFlight");

                function N(e) {
                    return e.closest("[data-replace-remote-form-target]")
                }
                l(N, "getFormTarget");
                async function B() {
                    const e = document.querySelector(".js-codespaces-details-container");
                    e && (e.open = !1);
                    const t = document.querySelector("new-codespace");
                    if (t && !t.getAttribute("data-no-submit-on-create")) try {
                        const n = await fetch("/codespaces/new");
                        if (n && n.ok) {
                            const i = (0, O.r)(document, await n.text());
                            t.replaceWith(i)
                        }
                    } catch {}
                }
                l(B, "createFormSubmitted"), (0, p.on)("submit", ".js-create-codespaces-form-command", function(e) {
                    const t = e.currentTarget;
                    t.classList.contains("js-open-in-vscode-form") || (B(), R(t), z())
                }), (0, p.on)("submit", "form.js-codespaces-delete-form", async function(e) {
                    e.preventDefault();
                    const t = e.currentTarget;
                    try {
                        const n = await fetch(t.action, {
                            method: t.method,
                            body: new FormData(t),
                            headers: {
                                Accept: "text/fragment+html",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (n.ok) {
                            const i = (0, O.r)(document, await n.text());
                            N(t).replaceWith(i)
                        } else if (n.status === 401) t.submit();
                        else throw new Error(`Unexpected response: ${n.statusText}`)
                    } finally {
                        R(t)
                    }
                }), (0, p.on)("submit", "form.js-open-in-vscode-form", async function(e) {
                    e.preventDefault();
                    const t = e.currentTarget;
                    await H(t)
                });
                async function V(e, t) {
                    const n = document.querySelector(`#${e}`),
                        i = await (0, M.W)({
                            content: n.content.cloneNode(!0),
                            dialogClass: "project-dialog"
                        });
                    return t && t.setAttribute("aria-expanded", "true"), i.addEventListener("dialog:remove", function() {
                        t && R(t)
                    }, {
                        once: !0
                    }), i
                }
                l(V, "openDialog");
                async function H(e) {
                    const t = await fetch(e.action, {
                        method: e.method,
                        body: new FormData(e),
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    if (t.ok) {
                        const n = await t.json();
                        n.codespace_url ? (window.location.href = n.codespace_url, R(e), B(), z()) : (e.closest("get-repo") || e.closest("new-codespace") ? (e.setAttribute("data-src", n.loading_url), e.dispatchEvent(new CustomEvent("pollvscode"))) : e.closest("prefetch-pane") && (e.setAttribute("data-src", n.loading_url), e.dispatchEvent(new CustomEvent("prpollvscode"))), R(e))
                    } else if (t.status === 422) {
                        const n = await t.json();
                        if (n.error_type === "concurrency_limit_error") await V("concurrency-error", e);
                        else {
                            const i = document.querySelector("template.js-flash-template"),
                                c = n.error;
                            i.after(new T.R(i, {
                                className: "flash-error",
                                message: c
                            })), R(e)
                        }
                    }
                }
                l(H, "createCodespaceIntoVscode");
                async function z() {
                    const e = document.querySelector(".js-codespaces-completable"),
                        t = e && e.getAttribute("data-src");
                    if (!t) return;
                    const n = await fetch(t, {
                        method: "GET",
                        headers: {
                            Accept: "text/fragment+html",
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    });
                    if (n.ok) {
                        const i = (0, O.r)(document, await n.text());
                        e.replaceWith(i)
                    } else throw new Error(`Unexpected response: ${n.statusText}`)
                }
                l(z, "renderAllDone");
                var Z = Object.defineProperty,
                    Q = Object.getOwnPropertyDescriptor,
                    U = l((e, t, n, i) => {
                        for (var c = i > 1 ? void 0 : i ? Q(t, n) : t, _ = e.length - 1, k; _ >= 0; _--)(k = e[_]) && (c = (i ? k(t, n, c) : k(c)) || c);
                        return i && c && Z(t, n, c), c
                    }, "export_branch_element_decorateClass");
                let q = l(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.abortPoll = null
                    }
                    connectedCallback() {
                        this.abortPoll = new AbortController, this.loadingIndicator.hidden || this.startPoll()
                    }
                    disconnectedCallback() {
                        var e;
                        (e = this.abortPoll) == null || e.abort()
                    }
                    async exportBranch(e) {
                        e.preventDefault(), this.form.hidden = !0, this.loadingIndicator.hidden = !1, (await fetch(this.form.action, {
                            method: this.form.method,
                            body: new FormData(this.form),
                            headers: {
                                Accept: "text/fragment+html",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })).ok ? this.startPoll() : (this.form.hidden = !1, this.loadingIndicator.hidden = !0)
                    }
                    async startPoll() {
                        const e = this.getAttribute("data-exported-codespace-url") || "",
                            t = await this.poll(e);
                        if (t)
                            if (t.ok) this.loadingIndicator.hidden = !0, this.viewBranchLink.hidden = !1;
                            else {
                                const n = this.getAttribute("data-export-error-redirect-url") || "";
                                window.location.href = n
                            }
                    }
                    async poll(e, t = 1e3) {
                        var n, i;
                        if ((n = this.abortPoll) == null ? void 0 : n.signal.aborted) return;
                        const c = await fetch(e, {
                            signal: (i = this.abortPoll) == null ? void 0 : i.signal
                        });
                        return c.status === 202 ? (await new Promise(_ => setTimeout(_, t)), this.poll(e, t * 1.5)) : c
                    }
                }, "ExportBranchElement");
                U([r.fA], q.prototype, "form", 2), U([r.fA], q.prototype, "loadingIndicator", 2), U([r.fA], q.prototype, "viewBranchLink", 2), q = U([r.Ih], q);
                var J = h(52660),
                    Y = Object.defineProperty,
                    ee = Object.getOwnPropertyDescriptor,
                    j = l((e, t, n, i) => {
                        for (var c = i > 1 ? void 0 : i ? ee(t, n) : t, _ = e.length - 1, k; _ >= 0; _--)(k = e[_]) && (c = (i ? k(t, n, c) : k(c)) || c);
                        return i && c && Y(t, n, c), c
                    }, "options_popover_element_decorateClass");
                let F = l(class extends HTMLElement {
                    reset(e) {
                        for (e.preventDefault(), this.dropdownDetails.hidden = !1, this.modalDetails.hidden = !0, this.exportDetails.hidden = !0, this.skuForm.hidden = !1; this.resultMessage.firstChild;) this.resultMessage.removeChild(this.resultMessage.firstChild);
                        this.resultMessage.hidden = !0, this.errorMessage.hidden = !0
                    }
                    showSettingsModal() {
                        this.dropdownDetails.hidden = !0, this.modalDetails.open = !0, this.modalDetails.hidden = !1
                    }
                    showExportModal() {
                        this.dropdownDetails.hidden = !0, this.exportDetails.open = !0, this.exportDetails.hidden = !1, this.insertBranchExportComponent()
                    }
                    async insertBranchExportComponent() {
                        const e = this.querySelector("[data-branch-export-url]");
                        if (!e) return;
                        const t = e.getAttribute("data-branch-export-url");
                        if (!t) return;
                        const n = await (0, J.a)(document, t);
                        !n || (e.innerHTML = "", e.appendChild(n))
                    }
                }, "OptionsPopoverElement");
                j([r.fA], F.prototype, "dropdownDetails", 2), j([r.fA], F.prototype, "modalDetails", 2), j([r.fA], F.prototype, "settingsModal", 2), j([r.fA], F.prototype, "skuForm", 2), j([r.fA], F.prototype, "resultMessage", 2), j([r.fA], F.prototype, "errorMessage", 2), j([r.fA], F.prototype, "exportDetails", 2), F = j([r.Ih], F);
                var te = Object.defineProperty,
                    ne = Object.getOwnPropertyDescriptor,
                    D = l((e, t, n, i) => {
                        for (var c = i > 1 ? void 0 : i ? ne(t, n) : t, _ = e.length - 1, k; _ >= 0; _--)(k = e[_]) && (c = (i ? k(t, n, c) : k(c)) || c);
                        return i && c && te(t, n, c), c
                    }, "prefetch_pane_element_decorateClass");
                let P = l(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.prefetching = !1, this.remainingRetries = 3
                    }
                    async connectedCallback() {
                        this.openSkuButton && this.skipSkuButton ? (await this.prefetchLocationAndSkus(), this.hideSpinner(), this.hidden = !1) : this.showOpenSkuButton()
                    }
                    async prefetchLocationAndSkus() {
                        const e = this.getAttribute("data-branch-has-changed") === "true";
                        if (this.prefetching && !e) return;
                        const t = document.querySelector("form.js-prefetch-codespace-location") || document.querySelector("form.js-open-in-vscode-form");
                        if (t) {
                            this.prefetching = !0;
                            const n = await (0, C.M)(t);
                            if (n && (this.currentLocation = n.current), !this.skuSelect) return;
                            const i = this.getAttribute("data-codespace-skus-url");
                            if (this.currentLocation && i) {
                                const c = await fetch(`${i}&location=${this.currentLocation}`, {
                                    headers: {
                                        "X-Requested-With": "XMLHttpRequest",
                                        Accept: "text/html_fragment"
                                    }
                                });
                                if (c.ok) {
                                    this.setAttribute("data-branch-has-changed", "false");
                                    const _ = (0, O.r)(document, await c.text()),
                                        W = Array.from(_.querySelectorAll("input[name='codespace[sku_name]']")).filter(K => !K.disabled),
                                        X = W.find(K => K.checked);
                                    X && this.defaultSkuPreview ? (this.defaultSkuPreview.innerHTML = X.getAttribute("data-preview") || "", this.showSkipSkuButton()) : W.length === 1 ? (X || W[0].select(), this.showSkipSkuButton()) : this.disableDropDownButton(), this.skuSelect.replaceWith(_), this.skuSelect.hidden = !1, this.skuError && (this.skuError.hidden = !0)
                                } else this.showOpenSkuButton(), this.remainingRetries -= 1, this.remainingRetries > 0 && (this.prefetching = !1), this.skuSelect.hidden = !0, this.skuError && (this.skuError.hidden = !1)
                            }
                        }
                    }
                    showOpenSkuButton() {
                        var e;
                        this.shownButton === void 0 && this.openSkuButton && (this.shownButton = this.openSkuButton, this.shownButton.hidden = !1, (e = this.skipSkuButton) == null || e.remove())
                    }
                    hideSpinner() {
                        const e = document.querySelector("[data-target='codespacesCreateButtonSpinner']");
                        e && (e.hidden = !0)
                    }
                    disableDropDownButton() {
                        this.dropdownButton && (this.useAdvancedCreation(), this.dropdownButton.style.pointerEvents = "none", this.dropdownButton.classList.add("color-fg-muted"))
                    }
                    showSkipSkuButton() {
                        var e, t;
                        if (this.shownButton === void 0 && this.skipSkuButton) {
                            this.shownButton = this.skipSkuButton, this.shownButton.hidden = !1;
                            const n = (e = this.openSkuButton) == null ? void 0 : e.parentElement;
                            n && n instanceof HTMLDetailsElement && (n.hidden = !0), (t = this.openSkuButton) == null || t.remove()
                        }
                    }
                    toggleLoadingVscode() {
                        if (this.loadingVscode) {
                            const e = this.loadingVscode.hidden,
                                t = this.children;
                            for (let n = 0; n < t.length; n++) t[n].hidden = e;
                            this.loadingVscode.hidden = !e
                        }
                    }
                    pollForVscode(e) {
                        if (this.vscodePoller) {
                            this.toggleLoadingVscode();
                            const t = e.currentTarget.getAttribute("data-src");
                            t && this.vscodePoller.setAttribute("src", t)
                        }
                    }
                    useBasicCreation() {
                        this.advancedOptionsLink && (this.openSkuButton && (this.openSkuButton.hidden = !1), this.skipSkuButton && (this.skipSkuButton.hidden = !1), this.advancedOptionsLink && (this.advancedOptionsLink.hidden = !0)), this.basicOptionsCheck && this.basicOptionsCheck.classList.remove("v-hidden"), this.advancedOptionsCheck && this.advancedOptionsCheck.classList.add("v-hidden"), this.selectionDetails.open = !1
                    }
                    useAdvancedCreation() {
                        this.advancedOptionsLink && (this.openSkuButton && (this.openSkuButton.hidden = !0), this.skipSkuButton && (this.skipSkuButton.hidden = !0), this.advancedOptionsLink.hidden = !1), this.basicOptionsCheck && this.basicOptionsCheck.classList.add("v-hidden"), this.advancedOptionsCheck && this.advancedOptionsCheck.classList.remove("v-hidden"), this.selectionDetails.open = !1
                    }
                }, "PrefetchPaneElement");
                D([r.fA], P.prototype, "skuSelect", 2), D([r.fA], P.prototype, "skuError", 2), D([r.fA], P.prototype, "selectionDetails", 2), D([r.fA], P.prototype, "loadingVscode", 2), D([r.fA], P.prototype, "vscodePoller", 2), D([r.fA], P.prototype, "openSkuButton", 2), D([r.fA], P.prototype, "skipSkuButton", 2), D([r.fA], P.prototype, "defaultSkuPreview", 2), D([r.fA], P.prototype, "dropdownButton", 2), D([r.fA], P.prototype, "advancedOptionsLink", 2), D([r.fA], P.prototype, "basicOptionsCheck", 2), D([r.fA], P.prototype, "advancedOptionsCheck", 2), P = D([r.Ih], P);
                var se = Object.defineProperty,
                    oe = Object.getOwnPropertyDescriptor,
                    G = l((e, t, n, i) => {
                        for (var c = i > 1 ? void 0 : i ? oe(t, n) : t, _ = e.length - 1, k; _ >= 0; _--)(k = e[_]) && (c = (i ? k(t, n, c) : k(c)) || c);
                        return i && c && se(t, n, c), c
                    }, "vscode_forwarder_element_decorateClass");
                let $ = l(class extends HTMLElement {
                    async connectedCallback() {
                        this.closeDetailsPopover();
                        const e = this.getAttribute("data-codespace-url");
                        e && (window.location.href = e)
                    }
                    closeDetailsPopover() {
                        const e = document.querySelector(".js-codespaces-details-container");
                        e && (e.open = !1)
                    }
                }, "VscodeForwarderElement");
                G([r.fA], $.prototype, "vscodeLink", 2), $ = G([r.Ih], $);
                var ie = h(9115),
                    ae = h(68906)
            },
            52134: (x, L, h) => {
                h.d(L, {
                    H: () => f,
                    v: () => p
                });
                var v = h(59753);

                function p() {
                    const d = document.getElementById("ajax-error-message");
                    d && (d.hidden = !1)
                }
                l(p, "showGlobalError");

                function f() {
                    const d = document.getElementById("ajax-error-message");
                    d && (d.hidden = !0)
                }
                l(f, "hideGlobalError"), (0, v.on)("deprecatedAjaxError", "[data-remote]", function(d) {
                    const a = d.detail,
                        {
                            error: o,
                            text: u
                        } = a;
                    d.currentTarget === d.target && (o === "abort" || o === "canceled" || (/<html/.test(u) ? (p(), d.stopImmediatePropagation()) : setTimeout(function() {
                        d.defaultPrevented || p()
                    }, 0)))
                }), (0, v.on)("deprecatedAjaxSend", "[data-remote]", function() {
                    f()
                }), (0, v.on)("click", ".js-ajax-error-dismiss", function() {
                    f()
                })
            },
            51374: (x, L, h) => {
                h.d(L, {
                    W: () => p
                });
                var v = h(59753);
                async function p(f) {
                    const a = document.querySelector("#site-details-dialog").content.cloneNode(!0),
                        o = a.querySelector("details"),
                        u = o.querySelector("details-dialog"),
                        E = o.querySelector(".js-details-dialog-spinner");
                    f.detailsClass && o.classList.add(...f.detailsClass.split(" ")), f.dialogClass && u.classList.add(...f.dialogClass.split(" ")), f.label ? u.setAttribute("aria-label", f.label) : f.labelledBy && u.setAttribute("aria-labelledby", f.labelledBy), document.body.append(a);
                    const b = await f.content;
                    return E.remove(), u.prepend(b), o.addEventListener("toggle", () => {
                        o.hasAttribute("open") || ((0, v.f)(u, "dialog:remove"), o.remove())
                    }), u
                }
                l(p, "dialog")
            },
            34782: (x, L, h) => {
                h.d(L, {
                    C: () => p,
                    x: () => v
                });
                const v = function() {
                        return document.readyState === "interactive" || document.readyState === "complete" ? Promise.resolve() : new Promise(f => {
                            document.addEventListener("DOMContentLoaded", () => {
                                f()
                            })
                        })
                    }(),
                    p = function() {
                        return document.readyState === "complete" ? Promise.resolve() : new Promise(f => {
                            window.addEventListener("load", f)
                        })
                    }()
            },
            52660: (x, L, h) => {
                h.d(L, {
                    D: () => d,
                    a: () => f
                });
                var v = h(2699),
                    p = h(10900);
                async function f(a, o, u) {
                    const E = new Request(o, u);
                    E.headers.append("X-Requested-With", "XMLHttpRequest");
                    const b = await self.fetch(E);
                    if (b.status < 200 || b.status >= 300) throw new Error(`HTTP ${b.status}${b.statusText||""}`);
                    return (0, v.t)((0, v.P)(a), b), (0, p.r)(a, await b.text())
                }
                l(f, "fetchSafeDocumentFragment");

                function d(a, o, u = 1e3) {
                    return l(async function E(b) {
                        const w = new Request(a, o);
                        w.headers.append("X-Requested-With", "XMLHttpRequest");
                        const A = await self.fetch(w);
                        if (A.status < 200 || A.status >= 300) throw new Error(`HTTP ${A.status}${A.statusText||""}`);
                        if (A.status === 200) return A;
                        if (A.status === 202) return await new Promise(I => setTimeout(I, b)), E(b * 1.5);
                        throw new Error(`Unexpected ${A.status} response status from poll endpoint`)
                    }, "poll")(u)
                }
                l(d, "fetchPoll")
            },
            82036: (x, L, h) => {
                h.d(L, {
                    Bt: () => a,
                    DN: () => E,
                    KL: () => A,
                    Se: () => u,
                    qC: () => I,
                    sw: () => b
                });
                var v = h(59753),
                    p = h(90137),
                    f = h(52134);
                (0, v.on)("click", ".js-remote-submit-button", async function(y) {
                    const C = y.currentTarget.form;
                    y.preventDefault();
                    let s;
                    try {
                        s = await fetch(C.action, {
                            method: C.method,
                            body: new FormData(C),
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })
                    } catch {}
                    s && !s.ok && (0, f.v)()
                });

                function d(y, r, C) {
                    return y.dispatchEvent(new CustomEvent(r, {
                        bubbles: !0,
                        cancelable: C
                    }))
                }
                l(d, "fire");

                function a(y, r) {
                    r && (o(y, r), (0, p.j)(r)), d(y, "submit", !0) && y.submit()
                }
                l(a, "requestSubmit");

                function o(y, r) {
                    if (!(y instanceof HTMLFormElement)) throw new TypeError("The specified element is not of type HTMLFormElement.");
                    if (!(r instanceof HTMLElement)) throw new TypeError("The specified element is not of type HTMLElement.");
                    if (r.type !== "submit") throw new TypeError("The specified element is not a submit button.");
                    if (!y || y !== r.form) throw new Error("The specified element is not owned by the form element.")
                }
                l(o, "checkButtonValidity");

                function u(y, r) {
                    if (typeof r == "boolean")
                        if (y instanceof HTMLInputElement) y.checked = r;
                        else throw new TypeError("only checkboxes can be set to boolean value");
                    else {
                        if (y.type === "checkbox") throw new TypeError("checkbox can't be set to string value");
                        y.value = r
                    }
                    d(y, "change", !1)
                }
                l(u, "changeValue");

                function E(y, r) {
                    for (const C in r) {
                        const s = r[C],
                            m = y.elements.namedItem(C);
                        (m instanceof HTMLInputElement || m instanceof HTMLTextAreaElement) && (m.value = s)
                    }
                }
                l(E, "fillFormValues");

                function b(y) {
                    if (!(y instanceof HTMLElement)) return !1;
                    const r = y.nodeName.toLowerCase(),
                        C = (y.getAttribute("type") || "").toLowerCase();
                    return r === "select" || r === "textarea" || r === "input" && C !== "submit" && C !== "reset" || y.isContentEditable
                }
                l(b, "isFormField");

                function w(y) {
                    return new URLSearchParams(y)
                }
                l(w, "searchParamsFromFormData");

                function A(y, r) {
                    const C = new URLSearchParams(y.search),
                        s = w(r);
                    for (const [m, g] of s) C.append(m, g);
                    return C.toString()
                }
                l(A, "combineGetFormSearchParams");

                function I(y) {
                    return w(new FormData(y)).toString()
                }
                l(I, "serialize")
            },
            2699: (x, L, h) => {
                h.d(L, {
                    P: () => v,
                    t: () => f
                });

                function v(d) {
                    const a = [...d.querySelectorAll("meta[name=html-safe-nonce]")].map(o => o.content);
                    if (a.length < 1) throw new Error("could not find html-safe-nonce on document");
                    return a
                }
                l(v, "getDocumentHtmlSafeNonces");
                class p extends Error {
                    constructor(a, o) {
                        super(`${a} for HTTP ${o.status}`);
                        this.response = o
                    }
                }
                l(p, "ResponseError");

                function f(d, a, o = !1) {
                    const u = a.headers.get("content-type") || "";
                    if (!o && !u.startsWith("text/html")) throw new p(`expected response with text/html, but was ${u}`, a);
                    if (o && !(u.startsWith("text/html") || u.startsWith("application/json"))) throw new p(`expected response with text/html or application/json, but was ${u}`, a);
                    const E = a.headers.get("x-html-safe");
                    if (E) {
                        if (!d.includes(E)) throw new p("response X-HTML-Safe nonce did not match", a)
                    } else throw new p("missing X-HTML-Safe nonce", a)
                }
                l(f, "verifyResponseHtmlSafeNonce")
            },
            9115: (x, L, h) => {
                var v = h(90420),
                    p = Object.defineProperty,
                    f = Object.getOwnPropertyDescriptor,
                    d = l((o, u, E, b) => {
                        for (var w = b > 1 ? void 0 : b ? f(u, E) : u, A = o.length - 1, I; A >= 0; A--)(I = o[A]) && (w = (b ? I(u, E, w) : I(w)) || w);
                        return b && w && p(u, E, w), w
                    }, "__decorateClass");
                let a = l(class extends HTMLElement {
                    connectedCallback() {
                        this.control && (this.storedInput = Array(this.control.children.length).fill("")), this.addEventListener("input", this.relayInput.bind(this)), this.addEventListener("keydown", this.relayKeydown.bind(this));
                        const o = this.closest("details");
                        o && o.addEventListener("toggle", () => {
                            o.open && this.source.focus()
                        })
                    }
                    relayKeydown(o) {
                        if ((this.isControlTab(o.target) || o.target === this.source) && (o.key === "ArrowDown" || o.key === "Tab")) o.preventDefault(), o.stopPropagation(), this.routeCustomEvent(new CustomEvent("focus-list"));
                        else if (o.key === "Escape") {
                            const u = this.closest("details");
                            u && u.removeAttribute("open")
                        }
                    }
                    isControlTab(o) {
                        return !o || !this.control ? !1 : Array.from(this.control.children).includes(o)
                    }
                    relayInput(o) {
                        if (!o.target) return;
                        const E = o.target.value;
                        this.routeCustomEvent(new CustomEvent("input-entered", {
                            detail: E
                        }))
                    }
                    routeCustomEvent(o) {
                        this.sinks[this.selectedIndex].dispatchEvent(o)
                    }
                    get selectedIndex() {
                        if (!this.control) return 0;
                        const o = this.control.querySelector('[aria-selected="true"]');
                        return o ? Array.from(this.control.children).indexOf(o) : 0
                    }
                    storeInput() {
                        this.storedInput[this.selectedIndex] = this.source.value
                    }
                    updateInput(o) {
                        this.source.value = this.storedInput[this.selectedIndex];
                        const u = o.detail.relatedTarget.getAttribute("data-filter-placeholder");
                        this.source.placeholder = u, this.source.setAttribute("aria-label", u), this.notifySelected()
                    }
                    notifySelected() {
                        const o = this.sinks[this.selectedIndex],
                            u = new CustomEvent("tab-selected");
                        o.dispatchEvent(u)
                    }
                }, "InputDemuxElement");
                d([v.fA], a.prototype, "source", 2), d([v.GO], a.prototype, "sinks", 2), d([v.fA], a.prototype, "control", 2), a = d([v.Ih], a)
            },
            10900: (x, L, h) => {
                h.d(L, {
                    r: () => v
                });

                function v(p, f) {
                    const d = p.createElement("template");
                    return d.innerHTML = f, p.importNode(d.content, !0)
                }
                l(v, "parseHTML")
            },
            83956: (x, L, h) => {
                h.d(L, {
                    M: () => p,
                    W: () => f
                });
                var v = h(59753);
                async function p(d, a = !0) {
                    const o = d.querySelectorAll('[name="codespace[location]"], [name="location"]');
                    if (o.length === 0) return;
                    for (const w of o)
                        if (w.value) return;
                    const u = d.querySelector("button[type=submit]");
                    u instanceof HTMLInputElement && (u.disabled = !0);
                    const E = d.getAttribute("data-codespace-locations-url");
                    if (!E) return;
                    const b = await f(E);
                    if (a && b)
                        for (const w of o) w.value = b.current;
                    return b
                }
                l(p, "prefetchCodespaceLocation");
                async function f(d) {
                    const a = await fetch(d, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            Accept: "application/json"
                        }
                    });
                    if (!a.ok) {
                        const o = new Error,
                            u = a.statusText ? ` ${a.statusText}` : "";
                        throw o.message = `HTTP ${a.status}${u}`, o
                    }
                    return a.json()
                }
                l(f, "fetchLocationValues"), (0, v.on)("submit", ".js-prefetch-codespace-location", async function(d) {
                    const a = d.currentTarget;
                    d.preventDefault(), await p(a), a.submit()
                })
            },
            43452: (x, L, h) => {
                h.d(L, {
                    Z: () => v
                });

                function v(p) {
                    var f, d;
                    const a = (d = (f = p.head) == null ? void 0 : f.querySelector('meta[name="expected-hostname"]')) == null ? void 0 : d.content;
                    if (!a) return !1;
                    const o = a.replace(/\.$/, "").split(".").slice(-2).join("."),
                        u = p.location.hostname.replace(/\.$/, "").split(".").slice(-2).join(".");
                    return o !== u
                }
                l(v, "detectProxySite")
            },
            68906: (x, L, h) => {
                var v = h(60785),
                    p = h(83476);
                const {
                    getItem: f,
                    setItem: d,
                    removeItem: a
                } = (0, v.Z)("localStorage", {
                    throwQuotaErrorsOnSet: !0
                });
                var o = (s => (s.Branch = "branch", s.Tag = "tag", s))(o || {});
                const u = l(class {
                    constructor(s, m, g, S, T) {
                        this.knownItems = [], this.currentSearchResult = [], this.exactMatchFound = !1, this.isLoading = !0, this.fetchInProgress = !1, this.fetchFailed = !1, this.refType = s, this.selector = m, this.refEndpoint = g, this.cacheKey = S, this.nameWithOwner = T
                    }
                    render() {
                        this.selector.render()
                    }
                    async fetchData() {
                        try {
                            if (!this.isLoading || this.fetchInProgress) return;
                            if (!this.bootstrapFromLocalStorage()) {
                                this.fetchInProgress = !0, this.fetchFailed = !1;
                                const s = await fetch(`${this.refEndpoint}?type=${this.refType}`, {
                                    headers: {
                                        Accept: "application/json"
                                    }
                                });
                                await this.processResponse(s)
                            }
                            this.isLoading = !1, this.fetchInProgress = !1, this.render()
                        } catch {
                            this.fetchInProgress = !1, this.fetchFailed = !0
                        }
                    }
                    async processResponse(s) {
                        if (this.emitStats(s), !s.ok) {
                            this.fetchFailed = !0;
                            return
                        }
                        const m = s.clone(),
                            g = await s.json();
                        this.knownItems = g.refs, this.cacheKey = g.cacheKey, this.flushToLocalStorage(await m.text())
                    }
                    emitStats(s) {
                        if (!s.ok) {
                            (0, p.b)({
                                incrementKey: "REF_SELECTOR_BOOT_FAILED"
                            }, !0);
                            return
                        }
                        switch (s.status) {
                            case 200:
                                {
                                    (0, p.b)({
                                        incrementKey: "REF_SELECTOR_BOOTED_FROM_UNCACHED_HTTP"
                                    });
                                    break
                                }
                            case 304:
                                {
                                    (0, p.b)({
                                        incrementKey: "REF_SELECTOR_BOOTED_FROM_HTTP_CACHE"
                                    });
                                    break
                                }
                            default:
                                (0, p.b)({
                                    incrementKey: "REF_SELECTOR_UNEXPECTED_RESPONSE"
                                })
                        }
                    }
                    search(s) {
                        if (s === "") {
                            this.currentSearchResult = this.knownItems;
                            return
                        }
                        const m = [],
                            g = [];
                        this.exactMatchFound = !1;
                        let S;
                        for (const T of this.knownItems)
                            if (S = T.indexOf(s), !(S < 0)) {
                                if (S === 0) {
                                    s === T ? (g.unshift(T), this.exactMatchFound = !0) : g.push(T);
                                    continue
                                }
                                m.push(T)
                            }
                        this.currentSearchResult = [...g, ...m]
                    }
                    bootstrapFromLocalStorage() {
                        const s = f(this.localStorageKey);
                        if (!s) return !1;
                        const m = JSON.parse(s);
                        return m.cacheKey !== this.cacheKey || !("refs" in m) ? (a(this.localStorageKey), !1) : (this.knownItems = m.refs, this.isLoading = !1, (0, p.b)({
                            incrementKey: "REF_SELECTOR_BOOTED_FROM_LOCALSTORAGE"
                        }), !0)
                    }
                    async flushToLocalStorage(s) {
                        try {
                            d(this.localStorageKey, s)
                        } catch (m) {
                            if (m.message.toLowerCase().includes("quota")) {
                                this.clearSiblingLocalStorage(), (0, p.b)({
                                    incrementKey: "REF_SELECTOR_LOCALSTORAGE_OVERFLOWED"
                                });
                                try {
                                    d(this.localStorageKey, s)
                                } catch (g) {
                                    g.message.toLowerCase().includes("quota") && (0, p.b)({
                                        incrementKey: "REF_SELECTOR_LOCALSTORAGE_GAVE_UP"
                                    })
                                }
                            } else throw m
                        }
                    }
                    clearSiblingLocalStorage() {
                        for (const s of Object.keys(localStorage)) s.startsWith(u.LocalStoragePrefix) && a(s)
                    }
                    get localStorageKey() {
                        return `${u.LocalStoragePrefix}:${this.nameWithOwner}:${this.refType}`
                    }
                }, "_SearchIndex");
                let E = u;
                E.LocalStoragePrefix = "ref-selector";
                var b = h(69567),
                    w = h(90420),
                    A = h(17945),
                    I = Object.defineProperty,
                    y = Object.getOwnPropertyDescriptor,
                    r = l((s, m, g, S) => {
                        for (var T = S > 1 ? void 0 : S ? y(m, g) : m, M = s.length - 1, O; M >= 0; M--)(O = s[M]) && (T = (S ? O(m, g, T) : O(T)) || T);
                        return S && T && I(m, g, T), T
                    }, "__decorateClass");
                let C = l(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.isCurrentVisible = !1, this.currentSelectionIndex = null
                    }
                    connectedCallback() {
                        this.refType = this.getRequiredAttr("type") === "branch" ? o.Branch : o.Tag;
                        const s = this.getAttribute("current-committish");
                        this.currentCommittish = s ? atob(s) : null, this.input = this.hasAttribute("initial-filter") && this.currentCommittish || "", this.defaultBranch = atob(this.getRequiredAttr("default-branch")), this.nameWithOwner = atob(this.getRequiredAttr("name-with-owner")), this.canCreate = this.hasAttribute("can-create"), this.prefetchOnMouseover = this.hasAttribute("prefetch-on-mouseover");
                        const m = this.getRequiredAttr("query-endpoint"),
                            g = this.getRequiredAttr("cache-key");
                        this.index = new E(this.refType, this, m, g, this.nameWithOwner), this.setupFetchListeners()
                    }
                    inputEntered(s) {
                        this.input = s.detail, this.render()
                    }
                    tabSelected() {
                        this.index.fetchData()
                    }
                    renderTemplate(s, m) {
                        return new b.R(s, m, b.XK)
                    }
                    renderRow(s) {
                        const m = this.index.currentSearchResult[s];
                        if (!m && s >= this.listLength) return document.createElement("span");
                        if (this.index.fetchFailed) return this.renderTemplate(this.fetchFailedTemplate, {
                            index: s,
                            refName: this.input
                        });
                        if (!m) {
                            const O = this.input === this.currentCommittish;
                            return this.isCurrentVisible || (this.isCurrentVisible = O), this.renderTemplate(this.noMatchTemplate, {
                                index: s,
                                isCurrent: O,
                                refName: this.input
                            })
                        }
                        const g = this.input.length > 0,
                            S = g ? "is-filtering" : "",
                            T = m === this.currentCommittish;
                        this.isCurrentVisible || (this.isCurrentVisible = T);
                        const M = this.renderTemplate(this.itemTemplate, {
                            refName: m,
                            index: s,
                            isFilteringClass: S,
                            urlEncodedRefName: this.urlEncodeRef(m),
                            isCurrent: T,
                            isNotDefault: m !== this.defaultBranch
                        });
                        if (g) {
                            const O = M.querySelector("span");
                            O.textContent = "";
                            const R = m.split(this.input),
                                N = R.length - 1;
                            for (let B = 0; B < R.length; B++) {
                                const V = R[B];
                                if (O.appendChild(document.createTextNode(V)), B < N) {
                                    const H = document.createElement("b");
                                    H.textContent = this.input, O.appendChild(H)
                                }
                            }
                        }
                        return M
                    }
                    urlEncodeRef(s) {
                        return encodeURIComponent(s).replaceAll("%2F", "/").replaceAll("%3A", ":").replaceAll("%2B", "+")
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
                        const s = this.index.currentSearchResult.length;
                        return this.showCreateRow ? s + 1 : s || 1
                    }
                    get showCreateRow() {
                        return !this.index.fetchFailed && !this.index.exactMatchFound && this.input !== "" && this.canCreate
                    }
                    getRequiredAttr(s, m = this) {
                        const g = m.getAttribute(s);
                        if (!g) throw new Error(`Missing attribute for ${m}: ${s}`);
                        return g
                    }
                    setupFetchListeners() {
                        const s = this.closest("details");
                        let m = !1;
                        const g = l(() => {
                            m || (this.index.fetchData(), m = !0)
                        }, "fetch");
                        if (!s || s.open) {
                            g();
                            return
                        }
                        this.prefetchOnMouseover && s.addEventListener("mouseover", g, {
                            once: !0
                        }), this.addEventListener("keydown", this.keydown), this.addEventListener("change", this.updateCurrent);
                        const S = s.querySelector("input[data-ref-filter]");
                        S && (S.addEventListener("input", () => {
                            this.input = S.value, this.render()
                        }), S.addEventListener("keydown", T => {
                            if (T.key === "ArrowDown" || T.key === "Tab") T.preventDefault(), T.stopPropagation(), this.focusFirstListMember();
                            else if (T.key === "Enter") {
                                let M = this.index.currentSearchResult.indexOf(this.input);
                                if (M === -1)
                                    if (this.showCreateRow) M = this.listLength - 1;
                                    else return;
                                s.querySelector(`[data-index="${M}"]`).click(), T.preventDefault()
                            }
                        }))
                    }
                    focusFirstListMember() {
                        !this.virtualizedList || (this.currentSelectionIndex = 0, this.focusItemAtIndex(this.currentSelectionIndex))
                    }
                    updateCurrent(s) {
                        s.target instanceof HTMLInputElement && s.target.checked && s.target.value && (this.currentCommittish = s.target.value)
                    }
                    keydown(s) {
                        if (this.currentSelectionIndex !== null) {
                            if (s.key === "Enter") {
                                const m = document.activeElement;
                                if (!m) return;
                                m.click(), s.preventDefault();
                                return
                            }
                            if (!(s.key === "Tab" && s.shiftKey) && s.key !== "Escape") switch (s.preventDefault(), s.stopPropagation(), s.key) {
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
                    focusItemAtIndex(s) {
                        this.virtualizedList.scrollToIndex(s, "center"), setTimeout(() => {
                            const m = this.listContainer.querySelector(`[data-index="${s}"]`);
                            m && m.focus()
                        }, 20)
                    }
                    setupVirtualizedList() {
                        this.listContainer.innerHTML = "", this.virtualizedList = new A.Z(this.listContainer, {
                            height: 330,
                            rowCount: this.listLength,
                            renderRow: this.renderRow.bind(this),
                            rowHeight: s => this.showCreateRow && s === this.listLength - 1 ? 51 : 33,
                            onRowsRendered: () => {
                                var s;
                                this.hiddenCurrentElement && (this.listContainer.removeChild(this.hiddenCurrentElement), delete this.hiddenCurrentElement), this.isCurrentVisible ? this.isCurrentVisible = !1 : this.hiddenCurrentItemTemplate && (this.hiddenCurrentElement = document.createElement("div"), (s = this.hiddenCurrentElement) == null || s.appendChild(this.renderTemplate(this.hiddenCurrentItemTemplate, {
                                    refName: this.currentCommittish
                                })), this.listContainer.appendChild(this.hiddenCurrentElement))
                            },
                            initialIndex: 0,
                            overscanCount: 6
                        })
                    }
                }, "RefSelectorElement");
                r([w.fA], C.prototype, "listContainer", 2), r([w.fA], C.prototype, "itemTemplate", 2), r([w.fA], C.prototype, "noMatchTemplate", 2), r([w.fA], C.prototype, "fetchFailedTemplate", 2), r([w.fA], C.prototype, "hiddenCurrentItemTemplate", 2), C = r([w.Ih], C)
            },
            90137: (x, L, h) => {
                h.d(L, {
                    j: () => v,
                    u: () => p
                });

                function v(f) {
                    const d = f.closest("form");
                    if (!(d instanceof HTMLFormElement)) return;
                    let a = p(d);
                    if (f.name) {
                        const o = f.matches("input[type=submit]") ? "Submit" : "",
                            u = f.value || o;
                        a || (a = document.createElement("input"), a.type = "hidden", a.classList.add("is-submit-button-value"), d.prepend(a)), a.name = f.name, a.value = u
                    } else a && a.remove()
                }
                l(v, "persistSubmitButtonValue");

                function p(f) {
                    const d = f.querySelector("input.is-submit-button-value");
                    return d instanceof HTMLInputElement ? d : null
                }
                l(p, "findPersistedSubmitButtonValue")
            },
            60785: (x, L, h) => {
                h.d(L, {
                    Z: () => p
                });
                class v {
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
                l(v, "NoOpStorage");

                function p(f, d = {
                    throwQuotaErrorsOnSet: !1
                }, a = window) {
                    let o;
                    try {
                        o = a[f]
                    } catch {
                        o = new v
                    }
                    const {
                        throwQuotaErrorsOnSet: u
                    } = d;

                    function E(A) {
                        try {
                            return o.getItem(A)
                        } catch {
                            return null
                        }
                    }
                    l(E, "getItem");

                    function b(A, I) {
                        try {
                            o.setItem(A, I)
                        } catch (y) {
                            if (u && y.message.toLowerCase().includes("quota")) throw y
                        }
                    }
                    l(b, "setItem");

                    function w(A) {
                        try {
                            o.removeItem(A)
                        } catch {}
                    }
                    return l(w, "removeItem"), {
                        getItem: E,
                        setItem: b,
                        removeItem: w
                    }
                }
                l(p, "safeStorage")
            },
            83476: (x, L, h) => {
                h.d(L, {
                    b: () => d
                });
                var v = h(43452),
                    p = h(34782);
                let f = [];

                function d(b, w = !1) {
                    b.timestamp === void 0 && (b.timestamp = new Date().getTime()), b.loggedIn = E(), b.bundler = "webpack", f.push(b), w ? u() : o()
                }
                l(d, "sendStats");
                let a = null;
                async function o() {
                    await p.C, a == null && (a = window.requestIdleCallback(u))
                }
                l(o, "scheduleSendStats");

                function u() {
                    var b, w;
                    if (a = null, (0, v.Z)(document)) return;
                    const A = (w = (b = document.head) == null ? void 0 : b.querySelector('meta[name="browser-stats-url"]')) == null ? void 0 : w.content;
                    if (!A) return;
                    const I = JSON.stringify({
                        stats: f
                    });
                    try {
                        navigator.sendBeacon && navigator.sendBeacon(A, I)
                    } catch {}
                    f = []
                }
                l(u, "flushStats");

                function E() {
                    var b, w;
                    return !!((w = (b = document.head) == null ? void 0 : b.querySelector('meta[name="user-login"]')) == null ? void 0 : w.content)
                }
                l(E, "isLoggedIn")
            }
        },
        x => {
            var L = l(v => x(x.s = v), "__webpack_exec__");
            x.O(0, [5724, 90, 3878], () => L(67666));
            var h = x.O()
        }
    ]);
})();

//# sourceMappingURL=codespaces-3668c45d6aeb.js.map