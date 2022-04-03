"use strict";
(() => {
    var A = Object.defineProperty;
    var g = (D, v) => A(D, "name", {
        value: v,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [5623], {
            23001: (D, v, n) => {
                n.d(v, {
                    i: () => e
                });
                var d = n(90420),
                    m = n(58070),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((o, i, c, a) => {
                        for (var s = a > 1 ? void 0 : a ? l(i, c) : i, h = o.length - 1, f; h >= 0; h--)(f = o[h]) && (s = (a ? f(i, c, s) : f(s)) || s);
                        return a && s && u(i, c, s), s
                    }, "__decorateClass");
                let e = g(class extends m.b {
                    static build(o, i) {
                        const c = new e;
                        return c.providerId = o, c.provider = i, c
                    }
                    connectedCallback() {
                        this.setAttribute("data-targets", "command-palette.clientDefinedProviderElements")
                    }
                }, "ClientDefinedProviderElement");
                r([d.Lj], e.prototype, "providerId", 2), e = r([d.Ih], e)
            },
            1648: (D, v, n) => {
                n.d(v, {
                    Z: () => I,
                    o: () => P
                });
                var d = n(90420),
                    m = n(23001),
                    u = n(65881),
                    l = n(86004),
                    r = n(12374),
                    e = n(26850),
                    o = n(80425),
                    i = n(3447),
                    c = n(30474),
                    a = n(99505),
                    s = Object.defineProperty,
                    h = Object.getOwnPropertyDescriptor,
                    f = g((t, p, E, M) => {
                        for (var b = M > 1 ? void 0 : M ? h(p, E) : p, C = t.length - 1, S; C >= 0; C--)(S = t[C]) && (b = (M ? S(p, E, b) : S(b)) || b);
                        return M && b && s(p, E, b), b
                    }, "__decorateClass");
                const T = g(() => navigator.platform.match(/Mac/), "isMac"),
                    O = T() ? "metaKey" : "ctrlKey",
                    _ = T() ? "Meta" : "Control",
                    P = g(t => t instanceof KeyboardEvent ? t[O] : !1, "isPlatformMetaKey"),
                    y = 450;
                let I = g(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.activated = !1, this.error = !1, this.query = new e.A("", ""), this.octicons = {}, this.requestsInProgress = [], this.setupComplete = !1, this.sessionId = "", this.returnTo = "", this.userId = "", this.multiPageEnabled = !1, this.activationHotkey = "Mod+k,Mod+Alt+k", this.commandModeHotkey = "Mod+Shift+k,Control+K", this.memexActivationHotkey = "Mod+p"
                    }
                    get itemStackElement() {
                        return this.querySelector("command-palette-item-stack")
                    }
                    setup() {
                        this.modes = Array.from(this.querySelectorAll("command-palette-mode")), this.defaultMode = this.querySelector(".js-command-palette-default-mode"), this.commandPaletteInput = this.querySelector("command-palette-input"), this.groups = this.querySelectorAll("command-palette-item-group"), this.multiPageEnabled || (this.itemStackElement.getQuery = () => this.query), document.addEventListener("pjax:end", this.pjaxReset.bind(this)), new ResizeObserver(E => {
                            for (const M of E) this.commandPaletteInput.scopeElement.smallDisplay = M.contentRect.width < y
                        }).observe(this), this.defaultOpen && (this.manualToggle(!0), this.clearReturnToParams()), window.commandPalette = this, this.setupComplete = !0;
                        const p = new Event("command-palette-ready", {
                            bubbles: !0,
                            cancelable: !0
                        });
                        this.dispatchEvent(p)
                    }
                    connectedCallback() {
                        this.setupComplete || this.setup()
                    }
                    clear(t = !0) {
                        var p;
                        return this.clearProviderCaches(), this.multiPageEnabled ? this.pageStack.reset(((p = this.pjaxMeta) == null ? void 0 : p.resetPages) || []) : this.itemStackElement.clear(), t && this.resetInput(), this.activated ? this.prefetchProviderData() : Promise.resolve()
                    }
                    clearCommands(t = !0) {
                        return this.clearCommandProviderCaches(), this.multiPageEnabled || this.itemStackElement.clearItemsFor(u.O.commandGroupIds), t && this.resetInput(), this.activated ? this.prefetchProviderData({
                            providers: this.commandsProviderElements
                        }) : Promise.resolve()
                    }
                    resetInput() {
                        this.commandPaletteInput.value = "", this.commandPaletteInput.resetScopeIfNeeded()
                    }
                    activate() {
                        if (this.sessionId = this.generateSessionId(), this.commandPaletteInput.scopeElement.smallDisplay = this.offsetWidth < y, this.commandPaletteInput.resetScopeIfNeeded(), this.commandPaletteInput.focus(), this.setActiveModeElement(), this.setQuery(), this.toggleTips(), this.multiPageEnabled) this.pageStack.currentPage.hidden = !1, this.pageStack.currentPage.fetch(), this.pageStack.bindListeners();
                        else if (this.prefetchProviderData(), this.updateOverlay(), this.itemStackElement.bindListeners(), this.commandPaletteInput.hasScope()) {
                            const t = new e.A(this.query.queryText, this.query.queryMode, {
                                subjectId: this.query.subjectId,
                                subjectType: this.query.subjectType,
                                returnTo: this.query.returnTo
                            });
                            this.prefetchProviderData({
                                query: t
                            })
                        }
                        this.activated = !0, (0, a.j)("session_initiated")
                    }
                    deactivate() {
                        this.activated = !1, this.multiPageEnabled ? this.pageStack.unbindListeners() : (this.itemStackElement.clearSelection(), this.itemStackElement.unbindListeners()), this.previouslyActiveElement && this.previouslyActiveElement.focus(), (0, a.j)("session_terminated")
                    }
                    generateSessionId() {
                        return (0, o.k)(`${Date.now()}_${this.userId}_${this.query.path}`).toString()
                    }
                    manualToggle(t) {
                        const p = this.closest("details");
                        t ? p.open = !0 : p.removeAttribute("open")
                    }
                    dismiss() {
                        this.manualToggle(!1), this.clear()
                    }
                    get defaultScopeId() {
                        var t;
                        return ((t = this.pjaxMeta) == null ? void 0 : t.defaultScopeId) || ""
                    }
                    get defaultScopeType() {
                        var t;
                        return ((t = this.pjaxMeta) == null ? void 0 : t.defaultScopeType) || ""
                    }
                    get pjaxMeta() {
                        return (0, c.I)()
                    }
                    get secondaryActivationHotkey() {
                        const t = this.activationHotkey.split(",");
                        return t.length > 1 ? t[t.length - 1] : ""
                    }
                    get platformActivationHotkey() {
                        return this.platformHotkey(this.activationHotkey)
                    }
                    get platformSecondardActivationHotkey() {
                        return this.platformHotkey(this.secondaryActivationHotkey)
                    }
                    get platformCommandModeHotkey() {
                        return this.platformHotkey(this.commandModeHotkey)
                    }
                    get platformMemexActivationHotkey() {
                        return this.platformHotkey(this.memexActivationHotkey)
                    }
                    platformHotkey(t) {
                        if (t === "none") return "";
                        let p = t;
                        if (T()) p = p.replace(/Mod\+Alt/g, "Alt+Mod");
                        else if (p.includes("Shift")) {
                            const E = p.charAt(p.length - 1);
                            p += `,${p.replace(`Shift+${E}`,E.toUpperCase())}`
                        }
                        return p.replace(/Mod/g, _)
                    }
                    pjaxReset() {
                        this.activated = !1, this.clear()
                    }
                    onInput() {
                        this.commandPaletteInput.typeahead = "", this.setActiveModeElement(), this.setQuery(), this.activated && this.fetchProviderData(), this.multiPageEnabled || this.itemStackElement.updateSelectedItem(), this.toggleTips(), this.updateOverlay()
                    }
                    updateOverlay() {
                        const t = this.getMode();
                        this.commandPaletteInput.overlay = t;
                        for (const p of this.groups) p.renderElement(t);
                        if (t && this.getTextWithoutMode() === "") {
                            const p = this.getModeElement().placeholder || "";
                            this.commandPaletteInput.showModePlaceholder(p)
                        } else this.commandPaletteInput.showModePlaceholder("")
                    }
                    itemsUpdated(t) {
                        if (!(t instanceof CustomEvent)) return;
                        const E = t.detail.items.filter(S => S.group !== u.O.footerGroupId),
                            M = E.filter(S => !u.O.helpGroupIds.includes(S.group)),
                            b = E.length > M.length,
                            C = this.finishedLoading && M.length === 0 && this.activated;
                        M.length > 0 ? this.toggleEmptyState(!1, b) : C && (this.toggleEmptyState(!0, b), this.toggleTips()), this.toggleErrorTips()
                    }
                    loadingStateChanged(t) {
                        t instanceof CustomEvent && (this.commandPaletteInput.loading = t.detail.loading)
                    }
                    pageFetchError(t) {
                        t instanceof CustomEvent && (this.error = !0, this.toggleErrorTips())
                    }
                    selectedItemChanged(t) {
                        if (!(t instanceof CustomEvent)) return;
                        const p = t.detail.item,
                            E = t.detail.isDefaultSelection;
                        this.updateTypeahead(p, E)
                    }
                    setActiveModeElement() {
                        const t = this.commandPaletteInput.value.substring(0, 1),
                            p = this.modes.filter(E => E.active(this.query.scope, t)).find(E => E.character() === t);
                        this.activeMode = p || this.defaultMode, this.multiPageEnabled && (this.pageStack.currentMode = this.activeMode.character())
                    }
                    setQuery() {
                        this.query = new e.A(this.getTextWithoutMode().trimStart(), this.getMode(), {
                            scope: this.commandPaletteInput.scope,
                            subjectId: this.defaultScopeId,
                            subjectType: this.defaultScopeType,
                            returnTo: this.returnTo
                        }), this.multiPageEnabled && (this.pageStack.currentQueryText = this.getTextWithoutMode().trimStart())
                    }
                    getModeElement() {
                        return this.activeMode
                    }
                    getMode() {
                        var t;
                        return (t = this.getModeElement()) == null ? void 0 : t.character()
                    }
                    getTextWithoutMode() {
                        if (!this.commandPaletteInput) return "";
                        const t = this.commandPaletteInput.value,
                            p = this.getMode();
                        return p && t.startsWith(p) ? t.substring(1) : t
                    }
                    get selectedItem() {
                        return this.multiPageEnabled ? this.pageStack.currentPage.selectedItem : this.itemStackElement.selectedItem
                    }
                    onSelect(t) {
                        this.selectedItem ? this.selectedItem.item.select(this) : t.preventDefault()
                    }
                    autocomplete(t) {
                        const p = this.commandPaletteInput;
                        t.typeahead !== void 0 ? p.value = p.overlay + t.typeahead : p.value = p.overlay + t.title
                    }
                    setScope(t) {
                        if (this.multiPageEnabled) {
                            const p = t || this.commandPaletteInput.scope;
                            for (const E of p.tokens) {
                                const M = E === p.tokens[p.tokens.length - 1],
                                    b = new l.j({
                                        title: E.value,
                                        scopeId: E.id,
                                        scopeType: E.type
                                    });
                                this.pageStack.push(b, !M)
                            }
                            this.commandPaletteInput.value = ""
                        } else this.itemStackElement.clearSelection(), t && (this.commandPaletteInput.scope = t), this.commandPaletteInput.value = "", this.setQueryScope(), this.toggleTips(), this.prefetchProviderData()
                    }
                    onDescope() {
                        if (this.multiPageEnabled) {
                            this.pageStack.pop();
                            return
                        }
                        if (this.commandPaletteInput.hasScope()) {
                            const p = this.commandPaletteInput.value;
                            this.commandPaletteInput.removeToken(), this.setScope(), this.commandPaletteInput.setRemovedTokenAndSelect(p)
                        }
                    }
                    onInputClear() {
                        this.multiPageEnabled ? this.pageStack.clear() : (this.commandPaletteInput.clearScope(), this.setScope())
                    }
                    onKeydown(t) {
                        var p;
                        t.key === "Enter" && this.selectedItem ? ((p = this.selectedItem) == null || p.activate(this, t), t.preventDefault(), t.stopPropagation()) : t.key === "ArrowDown" ? (this.navigateToItem(1), t.preventDefault(), t.stopPropagation()) : t.key === "ArrowUp" ? (this.navigateToItem(-1), t.preventDefault(), t.stopPropagation()) : this.isCopyEvent(t) && this.selectedItem && (this.selectedItem.copy(this), t.preventDefault(), t.stopPropagation())
                    }
                    navigateToItem(t) {
                        this.multiPageEnabled ? this.pageStack.navigate(t) : this.itemStackElement.navigate(t)
                    }
                    toggleTips() {
                        const t = this.modeTips.filter(E => E.available(this.query)),
                            p = t[Math.floor(Math.random() * t.length)];
                        for (const E of this.modeTips) E.hidden = p !== E;
                        this.multiPageEnabled ? (this.pageStack.hasVisibleTip = !!p, this.pageStack.currentPage.recomputeStyles()) : this.finishedLoading && this.itemStackElement.setMaxHeight()
                    }
                    toggleEmptyState(t, p) {
                        for (const E of this.emptyStateElements) E.toggle(this.query, t);
                        if (!p && t) {
                            const E = this.serverDefinedProviderElements.find(M => M.type === "help");
                            E && (this.multiPageEnabled ? this.pageStack.currentPage.fetch([E.provider], {
                                isEmpty: !0
                            }) : this.fetchProviderData([E], {
                                isEmpty: !0
                            }))
                        } else p && !t && !this.multiPageEnabled && this.itemStackElement.clearItemsFor(u.O.helpGroupIds);
                        this.finishedLoading && !this.multiPageEnabled && this.itemStackElement.setMaxHeight()
                    }
                    toggleErrorTips() {
                        for (const t of this.errorStateTips) t.toggle(this.query, !1, this.error)
                    }
                    updateInputScope(t) {
                        t instanceof CustomEvent && (this.commandPaletteInput.scope = this.pageStack.scope)
                    }
                    updateTypeahead(t, p = !1) {
                        var E, M;
                        this.getTextWithoutMode() === "" && (!t || p) ? this.commandPaletteInput.typeahead = "" : t && (this.commandPaletteInput.typeahead = (M = (E = t.typeahead) != null ? E : t.title) != null ? M : "")
                    }
                    isCopyEvent(t) {
                        return this.commandPaletteInput.textSelected() ? !1 : T() ? t.metaKey && t.key === "c" : t.ctrlKey && t.key === "c"
                    }
                    setQueryScope() {
                        this.query.scope = this.commandPaletteInput.scope
                    }
                    async prefetchProviderData(t = {}) {
                        if (this.multiPageEnabled) return;
                        const E = { ...{
                                query: this.query,
                                providers: this.providerElements
                            },
                            ...t
                        };
                        await Promise.all(Array.from(E.providers).map(async M => {
                            const b = M.provider;
                            if (b instanceof r.t) {
                                if (!b.scopeMatch(E.query)) return;
                                await b.prefetch(E.query.immutableCopy()), this.cacheIcons(b.octicons)
                            }
                            await this.fetchProviderData([M], {
                                prefillItemStack: !0
                            })
                        }))
                    }
                    async fetchProviderData(t, p = {}) {
                        if (this.multiPageEnabled) return;
                        const M = { ...{
                                    prefillItemStack: !1,
                                    isEmpty: !1
                                },
                                ...p
                            },
                            b = t != null ? t : this.providerElements;
                        this.error = !1, await this.fetchWithSpinner(b.map(async C => {
                            if (!C.provider.enabledFor(this.query)) return;
                            const S = this.query.immutableCopy(),
                                x = await C.fetchWithDebounce(S, M.isEmpty);
                            x && (x.error && (this.error = !0, this.toggleErrorTips()), x.octicons && this.cacheIcons(x.octicons)), this.multiPageEnabled || this.itemStackElement.addItems(S, x.results, M.prefillItemStack)
                        }))
                    }
                    async fetchWithSpinner(t) {
                        this.requestsInProgress.push(t), this.commandPaletteInput.loading = !0, await Promise.all(t), this.requestsInProgress.splice(this.requestsInProgress.indexOf(t), 1), this.commandPaletteInput.loading = this.requestsInProgress.length > 0
                    }
                    get providerElements() {
                        return [...this.serverDefinedProviderElements, ...this.clientDefinedProviderElements]
                    }
                    get commandsProviderElements() {
                        return this.providerElements.filter(t => t.provider.hasCommands)
                    }
                    clearProviderCaches() {
                        for (const t of this.providerElements) t.provider.clearCache()
                    }
                    clearCommandProviderCaches() {
                        for (const t of this.commandsProviderElements) t.provider.clearCache()
                    }
                    registerProvider(t, p) {
                        const E = this.querySelector(`client-defined-provider[data-provider-id="${t}"]`);
                        E && E.remove();
                        const M = m.i.build(t, p);
                        this.appendChild(M)
                    }
                    pushPage(t) {
                        !this.multiPageEnabled || (this.pageStack.push(t), this.resetInput())
                    }
                    get tipElements() {
                        const t = this.querySelectorAll("command-palette-tip");
                        return Array.from(t)
                    }
                    get modeTips() {
                        return this.tipElements.filter(t => !t.onEmpty && !t.onError)
                    }
                    get emptyStateElements() {
                        return this.tipElements.filter(t => t.onEmpty)
                    }
                    get errorStateTips() {
                        return this.tipElements.filter(t => t.onError)
                    }
                    get finishedLoading() {
                        return this.requestsInProgress.length === 0
                    }
                    get placeholder() {
                        return this.getAttribute("placeholder") || ""
                    }
                    get defaultOpen() {
                        return this.getAttribute("data-default-open") !== null
                    }
                    clearReturnToParams() {
                        const t = new URLSearchParams(location.search);
                        t.delete("command_palette_open"), t.delete("command_query"), t.delete("command_mode"), t.delete("clear_command_scope"), history.replaceState(null, "", `?${t}${location.hash}`)
                    }
                    cacheIcons(t) {
                        if (!this.multiPageEnabled)
                            for (const p of t) this.itemStackElement.octicons[p.id] = p.svg
                    }
                    displayFlash(t, p, E = 5e3) {
                        const M = document.querySelector(".js-command-palette-toasts");
                        if (!M) return;
                        const b = M.querySelectorAll(".Toast");
                        for (const x of b) x.hidden = !0;
                        const C = M.querySelector(`.Toast.Toast--${t}`);
                        if (!C) return;
                        const S = C.querySelector(".Toast-content");
                        S.textContent = p, C.hidden = !1, setTimeout(() => {
                            C.hidden = !0
                        }, E)
                    }
                }, "CommandPalette");
                I.tagName = "command-palette", f([d.Lj], I.prototype, "returnTo", 2), f([d.Lj], I.prototype, "userId", 2), f([d.Lj], I.prototype, "multiPageEnabled", 2), f([d.Lj], I.prototype, "activationHotkey", 2), f([d.Lj], I.prototype, "commandModeHotkey", 2), f([d.Lj], I.prototype, "memexActivationHotkey", 2), f([d.fA], I.prototype, "pageStack", 2), f([d.GO], I.prototype, "clientDefinedProviderElements", 2), f([d.GO], I.prototype, "serverDefinedProviderElements", 2), f([(0, i.D)(250)], I.prototype, "clearCommands", 1), I = f([d.Ih], I)
            },
            55623: (D, v, n) => {
                n.d(v, {
                    F: () => O
                });
                var d = n(38772),
                    m = n(90420),
                    u = n(47142),
                    l = n(74365),
                    r = n(52815),
                    e = n(94634),
                    o = n(32004),
                    i = n(3404),
                    c = n(9731),
                    a = n(76612),
                    s = n(99505),
                    h = Object.defineProperty,
                    f = Object.getOwnPropertyDescriptor,
                    T = g((_, P, y, I) => {
                        for (var t = I > 1 ? void 0 : I ? f(P, y) : P, p = _.length - 1, E; p >= 0; p--)(E = _[p]) && (t = (I ? E(P, y, t) : E(t)) || t);
                        return I && t && h(P, y, t), t
                    }, "__decorateClass");
                let O = g(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.itemId = "", this.itemTitle = "", this.subtitle = "", this.selected = !1, this.score = 0, this.titleNodes = [], this.rendered = !1, this.newTabOpened = !1, this.containerDataTarget = "command-palette-item.containerElement", this.containerClasses = "mx-2 px-2 rounded-2 d-flex flex-items-start no-underline border-0", this.containerStyle = "padding-top: 10px; padding-bottom: 10px; cursor: pointer;"
                    }
                    activate(_, P) {
                        this.item.activate(_, P), (0, s.j)("activate", this.item)
                    }
                    copy(_) {
                        return (0, s.j)("copy", this.item), this.item.copy(_)
                    }
                    select() {}
                    renderOcticon(_) {
                        this.iconElement.innerHTML = _
                    }
                    renderAvatar(_, P) {
                        let y;
                        this.item instanceof e.V ? y = d.dy `<img src="${_}" alt="${P}" class="avatar avatar-1 avatar-small" />` : this.item instanceof o.W ? y = d.dy `<img src="${_}" alt="${P}" class="avatar avatar-1" />` : y = d.dy `<img src="${_}" alt="${P}" class="avatar avatar-1 avatar-small circle" />`, (0, d.sY)(y, this.iconElement)
                    }
                    setItemAttributes(_) {
                        var P;
                        this.item = _, this.itemId = _.id, this.itemTitle = _.title, this.hint = _.hint, this.href = (P = _.path) != null ? P : "", _.subtitle && (this.subtitle = _.subtitle), _ instanceof c.g && (_.element = this)
                    }
                    render(_, P) {
                        if (this.renderBaseElement(), _ && (this.selected = !0), this.item instanceof l.i && this.item.typeahead) this.titleNodes = this.emphasizeTextMatchingQuery(this.item.title, this.item.typeahead);
                        else if (this.item instanceof r.B) {
                            const y = document.createElement("span");
                            y.innerHTML = this.item.title, this.titleNodes = [y], this.item.persistentHint && (this.persistentHint.innerHTML = this.item.persistentHint, this.persistentHint.hidden = !1)
                        } else if (this.item instanceof i.K && P) {
                            const y = [];
                            y.push(document.createTextNode("Search"));
                            const I = document.createElement("strong");
                            I.textContent = ` '${P}' `, y.push(I), y.push(document.createTextNode(this.item.titleScope)), this.titleNodes = y
                        } else P && (this.titleNodes = this.emphasizeTextMatchingQuery(this.item.title, P));
                        return this
                    }
                    connectedCallback() {
                        this.subtitle && this.subtitleElement.removeAttribute("hidden"), this.titleNodes.length > 0 && (this.titleElement.textContent = "", this.titleElement.append(...this.titleNodes))
                    }
                    onClick(_) {
                        this.activate(this.commandPalette, _)
                    }
                    get commandPalette() {
                        return this.closest("command-palette")
                    }
                    attributeChangedCallback(_, P, y) {
                        this.rendered && (_ === "data-selected" ? this.setSelectionAppearance() : _ === "data-item-title" ? this.titleElement.textContent = y : _ === "data-subtitle" && (this.subtitleElement.textContent = y))
                    }
                    setSelectionAppearance() {
                        this.selected ? (this.containerElement.classList.add("color-bg-subtle"), this.hintText.hidden = !1) : (this.containerElement.classList.remove("color-bg-subtle"), this.hintText.hidden = !0)
                    }
                    renderLinkContainer(_) {
                        return d.dy `
      <a
        data-target="${this.containerDataTarget}"
        data-action="click:command-palette-item#onClick"
        href="${this.href}"
        class="${this.containerClasses}"
        data-skip-pjax
        style="${this.containerStyle}"
      >
        ${_}
      </a>
    `
                    }
                    renderSpanContainer(_) {
                        return d.dy `
      <span
        data-target="${this.containerDataTarget}"
        class="${this.containerClasses}"
        style="${this.containerStyle}"
        data-action="click:command-palette-item#onClick"
      >
        ${_}
      </span>
    `
                    }
                    renderElementContent() {
                        return d.dy `
      <div
        data-target="command-palette-item.iconElement"
        class="mr-2 color-fg-muted d-flex flex-items-center"
        style="height: 24px; min-width: 16px;"
      ></div>

      <div class="flex-1 d-flex flex-column" style="line-height: 24px;">
        <span data-target="command-palette-item.titleElement" class="color-fg-default f5">${this.itemTitle}</span>
        <p data-target="command-palette-item.subtitleElement" class="color-fg-muted f6 mb-0" hidden>${this.subtitle}</p>
      </div>

      <div class="color-fg-muted f5" style="line-height: 20px;">
        <span class="hide-sm" data-target="command-palette-item.hintText" style="line-height: 24px;" hidden
          >${this.getHint()}</span
        >
        <span
          class="hide-sm"
          data-target="command-palette-item.persistentHint"
          style="line-height: 24px;"
          hidden
        ></span>
      </div>
    `
                    }
                    renderBaseElement() {
                        const _ = this.renderElementContent(),
                            P = g(() => this.href ? this.renderLinkContainer(_) : this.renderSpanContainer(_), "itemTemplate");
                        (0, d.sY)(P(), this), this.rendered = !0
                    }
                    activateLinkBehavior(_, P, y) {
                        const I = this.containerElement;
                        y && I instanceof HTMLAnchorElement ? (this.newTabOpened = !0, this.openLinkInNewTab(I)) : (this.newTabOpened = !1, this.openLink(I))
                    }
                    openLinkInNewTab(_) {
                        const P = _.getAttribute("target");
                        _.setAttribute("target", "_blank"), _.click(), P ? _.setAttribute("target", P) : _.removeAttribute("target")
                    }
                    openLink(_) {
                        _.click()
                    }
                    copyToClipboardAndAnnounce(_, P) {
                        (0, a.z)(_);
                        const y = this.hintText,
                            I = y.textContent;
                        y.classList.add("color-fg-success"), y.textContent = P != null ? P : "Copied!", setTimeout(() => {
                            y.classList.remove("color-fg-success"), y.textContent = I
                        }, 2e3)
                    }
                    getHint() {
                        return this.item instanceof l.i || this.item instanceof r.B ? d.dy `` : this.hint ? d.dy `<span class="hide-sm">${this.hint}</span>` : this.item instanceof c.g && this.item.scope ? d.dy `<div class="hide-sm">
        <kbd class="hx_kbd">Enter</kbd>
        to jump to
        <kbd class="hx_kbd ml-1">Tab</kbd>
        to search
      </div>` : d.dy `<span class="hide-sm">Jump to</span>`
                    }
                    emphasizeTextMatchingQuery(_, P) {
                        if (!(0, u.CD)(P, _)) return [document.createTextNode(_)];
                        const y = [];
                        let I = 0;
                        for (const p of (0, u.m7)(P, _)) {
                            if (_.slice(I, p) !== "") {
                                const b = document.createTextNode(_.slice(I, p));
                                y.push(b)
                            }
                            I = p + 1;
                            const M = document.createElement("strong");
                            M.textContent = _[p], y.push(M)
                        }
                        const t = document.createTextNode(_.slice(I));
                        return y.push(t), y
                    }
                }, "CommandPaletteItemElement");
                T([m.Lj], O.prototype, "itemId", 2), T([m.Lj], O.prototype, "itemTitle", 2), T([m.Lj], O.prototype, "subtitle", 2), T([m.Lj], O.prototype, "selected", 2), T([m.Lj], O.prototype, "score", 2), T([m.fA], O.prototype, "titleElement", 2), T([m.fA], O.prototype, "iconElement", 2), T([m.fA], O.prototype, "subtitleElement", 2), T([m.fA], O.prototype, "hintText", 2), T([m.fA], O.prototype, "persistentHint", 2), T([m.fA], O.prototype, "containerElement", 2), O = T([m.Ih], O)
            },
            65881: (D, v, n) => {
                n.d(v, {
                    O: () => e
                });
                var d = n(90420),
                    m = n(38772),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((o, i, c, a) => {
                        for (var s = a > 1 ? void 0 : a ? l(i, c) : i, h = o.length - 1, f; h >= 0; h--)(f = o[h]) && (s = (a ? f(i, c, s) : f(s)) || s);
                        return a && s && u(i, c, s), s
                    }, "__decorateClass");
                let e = g(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.groupLimits = "", this.defaultPriority = 0
                    }
                    connectedCallback() {
                        this.classList.add("py-2", "border-top"), this.setAttribute("hidden", "true"), this.renderElement("")
                    }
                    prepareForNewItems() {
                        this.list.innerHTML = "", this.setAttribute("hidden", "true"), this.classList.contains("border-top") || this.classList.add("border-top")
                    }
                    hasItem(o) {
                        return this.list.querySelectorAll(`[data-item-id="${o.id}"]`).length > 0
                    }
                    renderElement(o) {
                        const i = g(() => this.hasTitle ? m.dy `
          <div class="d-flex flex-justify-between my-2 px-3">
            <span data-target="command-palette-item-group.header" class="color-fg-muted text-bold f6 text-normal">
              ${this.groupTitle}
            </span>
            <span data-target="command-palette-item-group.header" class="color-fg-muted f6 text-normal">
              ${o?"":this.groupHint}
            </span>
          </div>
          <div
            role="listbox"
            class="list-style-none"
            data-target="command-palette-item-group.list"
            aria-label="${this.groupTitle} results"
          ></div>
        ` : m.dy `
          <div
            role="listbox"
            class="list-style-none"
            data-target="command-palette-item-group.list"
            aria-label="${this.groupTitle} results"
          ></div>
        `, "groupTemplate");
                        (0, m.sY)(i(), this)
                    }
                    push(o) {
                        this.removeAttribute("hidden"), this.topGroup && this.atLimit ? o.itemId !== this.firstItem.itemId && this.replaceTopGroupItem(o) : this.list.append(o)
                    }
                    replaceTopGroupItem(o) {
                        this.list.replaceChild(o, this.firstItem)
                    }
                    groupLimitForScope() {
                        const o = this.closest("command-palette");
                        if (o) {
                            const i = o.query.scope.type;
                            return JSON.parse(this.groupLimits)[i]
                        }
                    }
                    get limit() {
                        const o = this.groupLimitForScope();
                        return this.topGroup ? 1 : this.isModeActive() ? 50 : o || e.defaultGroupLimit
                    }
                    get atLimit() {
                        return this.list.children.length >= this.limit
                    }
                    parsedGroupLimits() {
                        return this.groupLimits ? JSON.parse(this.groupLimits) : {}
                    }
                    limitForScopeType(o) {
                        const c = this.parsedGroupLimits()[o];
                        return this.topGroup ? 1 : this.isModeActive() ? e.activeModeLimit : c || e.defaultGroupLimit
                    }
                    atLimitForScopeType(o) {
                        return this.list.children.length >= this.limitForScopeType(o)
                    }
                    isModeActive() {
                        const o = this.closest("command-palette");
                        return o ? o.getMode() : !1
                    }
                    get topGroup() {
                        return this.groupId === e.topGroupId
                    }
                    get hasTitle() {
                        return this.groupId !== e.footerGroupId
                    }
                    get itemNodes() {
                        return this.list.querySelectorAll("command-palette-item")
                    }
                    get firstItem() {
                        return this.itemNodes[0]
                    }
                    get lastItem() {
                        return this.itemNodes[this.itemNodes.length - 1]
                    }
                }, "CommandPaletteItemGroupElement");
                e.defaultGroupLimit = 5, e.activeModeLimit = 50, e.topGroupId = "top", e.defaultGroupId = "default", e.footerGroupId = "footer", e.helpGroupIds = ["modes_help", "filters_help"], e.commandGroupIds = ["commands"], e.topGroupScoreThreshold = 9, r([d.Lj], e.prototype, "groupTitle", 2), r([d.Lj], e.prototype, "groupHint", 2), r([d.Lj], e.prototype, "groupId", 2), r([d.Lj], e.prototype, "groupLimits", 2), r([d.Lj], e.prototype, "defaultPriority", 2), r([d.fA], e.prototype, "list", 2), r([d.fA], e.prototype, "header", 2), e = r([d.Ih], e)
            },
            34348: (D, v, n) => {
                n.d(v, {
                    v: () => a
                });
                var d = n(90420),
                    m = n(38772),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((s, h, f, T) => {
                        for (var O = T > 1 ? void 0 : T ? l(h, f) : h, _ = s.length - 1, P; _ >= 0; _--)(P = s[_]) && (O = (T ? P(h, f, O) : P(O)) || O);
                        return T && O && u(h, f, O), O
                    }, "__decorateClass");
                const e = 14,
                    o = 20,
                    i = 20,
                    c = 55;
                let a = g(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.smallDisplay = !1
                    }
                    connectedCallback() {
                        this.classList.add("d-inline-flex")
                    }
                    get lastToken() {
                        return this.tokens[this.tokens.length - 1]
                    }
                    get text() {
                        return this.tokens.map(s => s.text).join("/")
                    }
                    get id() {
                        return this.lastToken ? this.lastToken.id : a.emptyScope.id
                    }
                    get type() {
                        return this.lastToken ? this.lastToken.type : a.emptyScope.type
                    }
                    get scope() {
                        return this.hasScope() ? {
                            text: this.text,
                            type: this.type,
                            id: this.id,
                            tokens: this.tokens
                        } : a.emptyScope
                    }
                    set scope(s) {
                        this.renderTokens(s.tokens)
                    }
                    renderTokens(s) {
                        this.clearScope();
                        let h = 0,
                            f = s.length;
                        const T = this.smallDisplay ? e : i,
                            O = this.smallDisplay ? o : c;
                        for (let y = s.length - 1; y >= 0 && !(h + Math.min(s[y].text.length, T) + 5 > O); y--) h += Math.min(s[y].text.length, T) + 5, f = y;
                        const _ = g(y => m.dy `${y.map(P)}`, "tokensTemplate"),
                            P = g((y, I) => {
                                const t = y.text.length > T ? `${y.text.substring(0,T-3)}...` : y.text;
                                return m.dy `
        <command-palette-token
          data-text="${y.text}"
          data-id="${y.id}"
          data-type="${y.type}"
          data-value="${y.value}"
          data-targets="command-palette-scope.tokens"
          hidden="${I<f}"
          class="color-fg-default text-semibold"
          style="white-space:nowrap;line-height:20px;"
          >${t}<span class="color-fg-subtle text-normal">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        </command-palette-token>
      `
                            }, "tokenTemplate");
                        (0, m.sY)(_(s), this), this.hidden = !this.hasScope(), f !== 0 && (this.placeholder.hidden = !1)
                    }
                    removeToken() {
                        this.lastToken && (this.lastRemovedToken = this.lastToken, this.lastToken.remove(), this.renderTokens(this.tokens))
                    }
                    hasScope() {
                        return this.tokens.length > 0 && this.type && this.id && this.text
                    }
                    clearScope() {
                        for (const s of this.tokens) s.remove();
                        this.placeholder.hidden = !0
                    }
                    attributeChangedCallback(s, h, f) {
                        !this.isConnected || s === "data-small-display" && h !== f && this.renderTokens(this.tokens)
                    }
                }, "CommandPaletteScopeElement");
                a.emptyScope = {
                    type: "",
                    text: "",
                    id: "",
                    tokens: []
                }, r([d.Lj], a.prototype, "smallDisplay", 2), r([d.fA], a.prototype, "placeholder", 2), r([d.GO], a.prototype, "tokens", 2), a = r([d.Ih], a)
            },
            76612: (D, v, n) => {
                n.d(v, {
                    z: () => u
                });

                function d(l) {
                    const r = document.createElement("pre");
                    return r.style.width = "1px", r.style.height = "1px", r.style.position = "fixed", r.style.top = "5px", r.textContent = l, r
                }
                g(d, "createNode");

                function m(l) {
                    if ("clipboard" in navigator) return navigator.clipboard.writeText(l.textContent || "");
                    const r = getSelection();
                    if (r == null) return Promise.reject(new Error);
                    r.removeAllRanges();
                    const e = document.createRange();
                    return e.selectNodeContents(l), r.addRange(e), document.execCommand("copy"), r.removeAllRanges(), Promise.resolve()
                }
                g(m, "copyNode");

                function u(l) {
                    if ("clipboard" in navigator) return navigator.clipboard.writeText(l);
                    const r = document.body;
                    if (!r) return Promise.reject(new Error);
                    const e = d(l);
                    return r.appendChild(e), m(e), r.removeChild(e), Promise.resolve()
                }
                g(u, "copyText")
            },
            74365: (D, v, n) => {
                n.d(v, {
                    i: () => e
                });
                var d = n(1648),
                    m = n(9731),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((o, i, c, a) => {
                        for (var s = a > 1 ? void 0 : a ? l(i, c) : i, h = o.length - 1, f; h >= 0; h--)(f = o[h]) && (s = (a ? f(i, c, s) : f(s)) || s);
                        return a && s && u(i, c, s), s
                    }, "__decorateClass");
                let e = g(class extends m.g {
                    activate(o, i) {
                        i instanceof PointerEvent ? super.activate(o, i) : i instanceof KeyboardEvent && this.activateLinkBehavior(o, i, (0, d.o)(i))
                    }
                    get key() {
                        return this.title
                    }
                }, "AccessPolicyItem");
                e = r([m.O], e)
            },
            16517: (D, v, n) => {
                n.d(v, {
                    d: () => r
                });
                var d = n(9731),
                    m = Object.defineProperty,
                    u = Object.getOwnPropertyDescriptor,
                    l = g((e, o, i, c) => {
                        for (var a = c > 1 ? void 0 : c ? u(o, i) : o, s = e.length - 1, h; s >= 0; s--)(h = e[s]) && (a = (c ? h(o, i, a) : h(a)) || a);
                        return c && a && m(o, i, a), a
                    }, "__decorateClass");
                let r = g(class extends d.g {
                    constructor(e) {
                        super(e);
                        this.typeahead = e.title, this.group = "commands"
                    }
                    get action() {
                        return this._action
                    }
                    async activate(e) {
                        super.activate(e);
                        const o = e.getAttribute("data-commands-path"),
                            i = e.querySelector(".js-commands-csrf").value;
                        if (!o || !i) return;
                        const c = e.query.params();
                        c.set("command", this.action.id), e.commandPaletteInput.loading = !0;
                        const a = await fetch(o, {
                            method: "POST",
                            mode: "same-origin",
                            headers: {
                                Accept: "application/json",
                                "Scoped-CSRF-Token": i,
                                "X-Requested-With": "XMLHttpRequest"
                            },
                            body: c
                        });
                        if (e.commandPaletteInput.loading = !1, a.ok) {
                            const s = await a.json();
                            this.handleResponse(e, s.action, s.arguments)
                        } else e.displayFlash("error", "Failed to run command")
                    }
                    handleResponse(e, o, i) {
                        switch (o) {
                            case "displayFlash":
                                e.displayFlash(i.type, i.message), e.dismiss();
                                break
                        }
                    }
                }, "CommandItem");
                r = l([d.O], r)
            },
            20181: (D, v, n) => {
                n.d(v, {
                    Z: () => e
                });
                var d = n(9731),
                    m = n(76612),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((o, i, c, a) => {
                        for (var s = a > 1 ? void 0 : a ? l(i, c) : i, h = o.length - 1, f; h >= 0; h--)(f = o[h]) && (s = (a ? f(i, c, s) : f(s)) || s);
                        return a && s && u(i, c, s), s
                    }, "__decorateClass");
                let e = g(class extends d.g {
                    constructor(o) {
                        super(o);
                        this.priority = 11, this.score = 1, this.typeahead = o.title, this.group = "commands"
                    }
                    get action() {
                        return this._action
                    }
                    async activate(o) {
                        super.activate(o);
                        try {
                            await (0, m.z)(this.action.text), o.displayFlash("success", this.action.message), o.dismiss()
                        } catch {
                            o.displayFlash("error", "Copy failed")
                        }
                    }
                }, "CopyableItem");
                e = r([d.O], e)
            },
            52815: (D, v, n) => {
                n.d(v, {
                    B: () => r
                });
                var d = n(9731),
                    m = Object.defineProperty,
                    u = Object.getOwnPropertyDescriptor,
                    l = g((e, o, i, c) => {
                        for (var a = c > 1 ? void 0 : c ? u(o, i) : o, s = e.length - 1, h; s >= 0; s--)(h = e[s]) && (a = (c ? h(o, i, a) : h(a)) || a);
                        return c && a && m(o, i, a), a
                    }, "__decorateClass");
                let r = g(class extends d.g {
                    static from(e) {
                        return new r({
                            title: e.title,
                            typeahead: "",
                            priority: -10 - e.index,
                            score: -10,
                            group: e.group,
                            action: {
                                type: "help",
                                description: "",
                                prefix: e.prefix
                            },
                            persistentHint: e.persistentHint
                        })
                    }
                    constructor(e) {
                        super(e);
                        this.persistentHint = e.persistentHint
                    }
                    activate(e, o) {
                        e.commandPaletteInput.value = this.action.prefix + e.getTextWithoutMode()
                    }
                    autocomplete(e) {
                        e.commandPaletteInput.value = this.action.prefix + e.getTextWithoutMode()
                    }
                    calculateScore(e) {
                        return 0
                    }
                    get action() {
                        return this._action
                    }
                }, "HelpItem");
                r = l([d.O], r)
            },
            99780: (D, v, n) => {
                n.d(v, {
                    s: () => e
                });
                var d = n(1648),
                    m = n(9731),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((o, i, c, a) => {
                        for (var s = a > 1 ? void 0 : a ? l(i, c) : i, h = o.length - 1, f; h >= 0; h--)(f = o[h]) && (s = (a ? f(i, c, s) : f(s)) || s);
                        return a && s && u(i, c, s), s
                    }, "__decorateClass");
                let e = g(class extends m.g {
                    static from(o) {
                        return new e({
                            title: o.title,
                            typeahead: o.title,
                            priority: 1,
                            score: 1,
                            group: o.group,
                            action: {
                                type: "jump_to",
                                description: "",
                                path: o.path
                            },
                            icon: {
                                type: "octicon",
                                id: o.icon
                            }
                        })
                    }
                    activate(o, i) {
                        i instanceof PointerEvent ? super.activate(o, i) : i instanceof KeyboardEvent && this.activateLinkBehavior(o, i, (0, d.o)(i))
                    }
                    copy(o) {
                        super.copy(o);
                        const i = new URL(this.action.path, window.location.origin);
                        return this.copyToClipboardAndAnnounce(i.toString()), i.toString()
                    }
                    get key() {
                        return `${super.key}/${this.action.path}`
                    }
                    get action() {
                        return this._action
                    }
                }, "JumpToItem");
                e = r([m.O], e)
            },
            94634: (D, v, n) => {
                n.d(v, {
                    V: () => e
                });
                var d = n(99780),
                    m = n(9731),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((o, i, c, a) => {
                        for (var s = a > 1 ? void 0 : a ? l(i, c) : i, h = o.length - 1, f; h >= 0; h--)(f = o[h]) && (s = (a ? f(i, c, s) : f(s)) || s);
                        return a && s && u(i, c, s), s
                    }, "__decorateClass");
                let e = g(class extends d.s {}, "JumpToOrgItem");
                e = r([m.O], e)
            },
            32004: (D, v, n) => {
                n.d(v, {
                    W: () => e
                });
                var d = n(99780),
                    m = n(9731),
                    u = Object.defineProperty,
                    l = Object.getOwnPropertyDescriptor,
                    r = g((o, i, c, a) => {
                        for (var s = a > 1 ? void 0 : a ? l(i, c) : i, h = o.length - 1, f; h >= 0; h--)(f = o[h]) && (s = (a ? f(i, c, s) : f(s)) || s);
                        return a && s && u(i, c, s), s
                    }, "__decorateClass");
                let e = g(class extends d.s {}, "JumpToTeamItem");
                e = r([m.O], e)
            },
            46635: (D, v, n) => {
                n.d(v, {
                    U: () => m
                });
                var d = n(33241);
                class m extends d.ck {
                    constructor(l, r) {
                        super({
                            title: (e = r.title) != null ? e : l.title,
                            subtitle: (o = r.subtitle) != null ? o : l.subtitle,
                            typeahead: (i = r.title) != null ? i : l.title,
                            priority: (c = r.priority) != null ? c : l.priority,
                            group: (a = r.group) != null ? a : l.group,
                            icon: {
                                type: (s = r.iconType) != null ? s : l.iconType,
                                id: (h = r.icon) != null ? h : l.icon
                            },
                            hint: "Run command"
                        });
                        var e, o, i, c, a, s, h;
                        this.command = l
                    }
                    get path() {}
                    copy(l) {}
                    activate(l) {
                        this.command.run(l), this.command.dismissAfterRun && l.dismiss()
                    }
                    isApplicable(l) {
                        return this.command.isApplicable(l)
                    }
                    select(l) {
                        this.command.select ? this.command.select(l) : l.autocomplete(this)
                    }
                }
                g(m, "MainWindowCommandItem")
            },
            3404: (D, v, n) => {
                n.d(v, {
                    K: () => o
                });
                var d = n(9731),
                    m = n(65881),
                    u = n(99780),
                    l = Object.defineProperty,
                    r = Object.getOwnPropertyDescriptor,
                    e = g((i, c, a, s) => {
                        for (var h = s > 1 ? void 0 : s ? r(c, a) : c, f = i.length - 1, T; f >= 0; f--)(T = i[f]) && (h = (s ? T(c, a, h) : T(h)) || h);
                        return s && h && l(c, a, h), h
                    }, "__decorateClass");
                let o = g(class extends u.s {
                    static create(i) {
                        let c, a;
                        if (i.scope.type === "repository") {
                            const s = i.scope.tokens.map(h => h.text).join("/");
                            c = `in ${s}`, a = `/${s}/search?q=${i.text}`
                        } else if (i.scope.type === "owner") {
                            const s = `org:${i.scope.text} ${i.text}`;
                            c = `in ${i.scope.text}`, a = `/search?q=${s}`
                        } else c = "across all of GitHub", a = `/search?q=${i.text}`;
                        return new o({
                            title: `Search ${i.text}${c}`,
                            typeahead: "",
                            priority: -10,
                            score: -10,
                            group: m.O.footerGroupId,
                            action: {
                                type: "jump_to",
                                description: "",
                                path: a
                            },
                            icon: {
                                type: "octicon",
                                id: "search-color-fg-muted"
                            },
                            titleScope: c
                        })
                    }
                    constructor(i) {
                        super(i);
                        this.titleScope = i.titleScope
                    }
                    autocomplete(i) {}
                    calculateScore(i) {
                        return 0
                    }
                }, "SearchLinkItem");
                o = e([d.O], o)
            },
            9731: (D, v, n) => {
                n.d(v, {
                    O: () => u,
                    g: () => r
                });
                var d = n(33241),
                    m = n(65881);

                function u(e) {
                    r.register(e)
                }
                g(u, "serverDefinedItem");
                const l = g(class extends d.ck {
                    constructor(e) {
                        super(e);
                        this.position = "", this.score = e.score, this.scope = e.scope, this.matchFields = e.match_fields, this._action = e.action
                    }
                    static register(e) {
                        this.itemClasses[e.itemType] = e
                    }
                    static get itemType() {
                        return this.buildItemType(this.name)
                    }
                    static buildItemType(e) {
                        return e.replace(/([A-Z]($|[a-z]))/g, "_$1").replace(/(^_|_Item$)/g, "").toLowerCase()
                    }
                    static build(e) {
                        const o = this.itemClasses[e.action.type];
                        if (o) return new o(e);
                        throw new Error(`No item handler for ${e.action.type}`)
                    }
                    get action() {
                        return this._action
                    }
                    get key() {
                        return `${this.action.type}/${this.title}/${this.group}`
                    }
                    get path() {
                        return this.action.path || ""
                    }
                    get itemType() {
                        return l.buildItemType(this.constructor.name)
                    }
                    select(e) {
                        this.scope ? e.setScope(this.scope) : e.autocomplete(this)
                    }
                    activate(e, o) {}
                    activateLinkBehavior(e, o, i) {
                        var c;
                        (c = this.element) == null || c.activateLinkBehavior(e, o, i)
                    }
                    copy(e) {}
                    copyToClipboardAndAnnounce(e, o) {
                        var i;
                        (i = this.element) == null || i.copyToClipboardAndAnnounce(e, o)
                    }
                }, "_ServerDefinedItem");
                let r = l;
                r.itemClasses = {}, r.defaultData = {
                    title: "",
                    score: 1,
                    priority: 1,
                    action: {
                        type: "",
                        path: ""
                    },
                    icon: {
                        type: "octicon",
                        id: "dash-color-fg-muted"
                    },
                    group: m.O.defaultGroupId
                }
            },
            86004: (D, v, n) => {
                n.d(v, {
                    j: () => d
                });
                class d {
                    constructor(u) {
                        this.title = u.title, this.scopeId = u.scopeId, this.scopeType = u.scopeType
                    }
                    get providers() {
                        return this._providerElements.map(u => u.provider)
                    }
                    get _providerElements() {
                        return [...this.serverDefinedProviderElements, ...this.clientDefinedProviderElements]
                    }
                    get serverDefinedProviderElements() {
                        const u = document.querySelectorAll("server-defined-provider");
                        return Array.from(u)
                    }
                    get clientDefinedProviderElements() {
                        const u = document.querySelectorAll("client-defined-provider");
                        return Array.from(u)
                    }
                }
                g(d, "GlobalProvidersPage")
            },
            30474: (D, v, n) => {
                n.d(v, {
                    I: () => d
                });

                function d() {
                    return document.querySelector(".js-command-palette-pjax-metadata")
                }
                g(d, "getPjaxMetadataElement")
            },
            58070: (D, v, n) => {
                n.d(v, {
                    b: () => d
                });
                class d extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.isSetup = !1
                    }
                    connectedCallback() {
                        this.isSetup = !0
                    }
                    async fetchWithDebounce(u, l) {
                        return this._lastFetchQuery = u, await this.delay(this.provider.debounce), this._lastFetchQuery !== u ? {
                            results: []
                        } : this.provider.fetch(u, l)
                    }
                    delay(u) {
                        return new Promise(l => setTimeout(l, u))
                    }
                }
                g(d, "ProviderElement")
            },
            21314: (D, v, n) => {
                n.d(v, {
                    B: () => d
                });
                class d {
                    fuzzyFilter(u, l, r = 0) {
                        if (l.isBlank()) return u;
                        const e = [];
                        for (const o of u) o.calculateScore(l.text) > r && e.push(o);
                        return e
                    }
                }
                g(d, "ProviderBase")
            },
            12374: (D, v, n) => {
                n.d(v, {
                    t: () => u
                });
                var d = n(26850),
                    m = n(45979);
                class u extends m.x {
                    constructor() {
                        super(...arguments);
                        this.maxItems = 1e3, this.scopedItems = {}, this.cachedOcticons = {}
                    }
                    clearCache() {
                        super.clearCache(), this.scopedItems = {}, this.cachedOcticons = {}
                    }
                    get debounce() {
                        return 0
                    }
                    async prefetch(r) {
                        if (!this.scopeMatch(r) || this.scopedItems[r.scope.id]) return;
                        const e = new d.A("", r.mode, {
                                subjectId: r.subjectId,
                                subjectType: r.subjectType,
                                returnTo: r.returnTo,
                                scope: r.scope
                            }),
                            o = await this.fetchSrc(e, r.mode);
                        this.octicons = o.octicons || [];
                        const i = o.results || [];
                        this.scopedItems[r.scope.id] = i, this.cachedOcticons[r.scope.id] = this.octicons
                    }
                    async fetch(r, e) {
                        const o = this.scopedItems[r.scope.id] || [],
                            i = this.cachedOcticons[r.scope.id] || [];
                        return {
                            results: this.fuzzyFilter(o, r).slice(0, this.maxItems),
                            octicons: i
                        }
                    }
                }
                g(u, "PrefetchedProvider")
            },
            45979: (D, v, n) => {
                n.d(v, {
                    x: () => u
                });
                var d = n(9731),
                    m = n(43832);
                class u extends m.j {
                    fetch(r, e) {
                        return this.fetchSrc(r)
                    }
                    enabledFor(r) {
                        return this.modeMatch(r) && this.scopeMatch(r)
                    }
                    clearCache() {}
                    scopeMatch(r) {
                        return this.scopeTypes.length === 0 || this.scopeTypes.includes(r.scope.type)
                    }
                    modeMatch(r) {
                        return this.modes.includes(r.mode) || this.hasWildCard
                    }
                    async fetchSrc(r, e = "") {
                        var o;
                        if (!this.src) throw new Error("No src defined");
                        const i = new URL(this.src, window.location.origin),
                            c = r.params();
                        e && c.set("mode", e), i.search = c.toString();
                        const a = await fetch(i.toString(), {
                            headers: {
                                Accept: "application/json",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (a.ok) {
                            const s = await a.json();
                            return {
                                results: ((o = s.results) == null ? void 0 : o.map(h => d.g.build(h))) || [],
                                octicons: s.octicons
                            }
                        } else return {
                            error: !0,
                            results: []
                        }
                    }
                }
                g(u, "RemoteProvider")
            },
            43832: (D, v, n) => {
                n.d(v, {
                    j: () => m
                });
                var d = n(21314);
                class m extends d.B {
                    constructor(l) {
                        super();
                        this.element = l
                    }
                    get type() {
                        return this.element.type
                    }
                    get modes() {
                        return this.element.modes
                    }
                    get debounce() {
                        return this.element.debounce
                    }
                    get scopeTypes() {
                        return this.element.scopeTypes
                    }
                    get src() {
                        return this.element.src
                    }
                    get hasWildCard() {
                        return this.element.hasWildCard
                    }
                    get hasCommands() {
                        return this.element.hasCommands
                    }
                    fetch(l, r) {
                        throw new Error("Method not implemented.")
                    }
                    enabledFor(l) {
                        throw new Error("Method not implemented.")
                    }
                    clearCache() {
                        throw new Error("Method not implemented.")
                    }
                }
                g(m, "ServerDefinedProvider")
            },
            26850: (D, v, n) => {
                n.d(v, {
                    A: () => m
                });
                var d = n(34348);
                class m {
                    constructor(l, r, {
                        scope: e,
                        subjectId: o,
                        subjectType: i,
                        returnTo: c
                    } = {}) {
                        this.queryText = l, this.queryMode = r, this.scope = e != null ? e : d.v.emptyScope, this.subjectId = o, this.subjectType = i, this.returnTo = c
                    }
                    get text() {
                        return this.queryText
                    }
                    get mode() {
                        return this.queryMode
                    }
                    get path() {
                        return this.buildPath(this)
                    }
                    buildPath(l, r = l.text) {
                        return `scope:${l.scope.type}-${l.scope.id}/mode:${l.mode}/query:${r}`
                    }
                    clearScope() {
                        this.scope = d.v.emptyScope
                    }
                    hasScope() {
                        return this.scope.id !== d.v.emptyScope.id
                    }
                    isBlank() {
                        return this.text.trim().length === 0
                    }
                    isPresent() {
                        return !this.isBlank()
                    }
                    immutableCopy() {
                        const l = this.text,
                            r = this.mode,
                            e = { ...this.scope
                            };
                        return new m(l, r, {
                            scope: e,
                            subjectId: this.subjectId,
                            subjectType: this.subjectType,
                            returnTo: this.returnTo
                        })
                    }
                    hasSameScope(l) {
                        return this.scope.id === l.scope.id
                    }
                    params() {
                        const l = new URLSearchParams;
                        return this.isPresent() && l.set("q", this.text), this.hasScope() && l.set("scope", this.scope.id), this.mode && l.set("mode", this.mode), this.returnTo && l.set("return_to", this.returnTo), this.subjectId && l.set("subject", this.subjectId), l
                    }
                }
                g(m, "Query")
            },
            99505: (D, v, n) => {
                n.d(v, {
                    j: () => i
                });
                var d = n(74365),
                    m = n(16517),
                    u = n(20181),
                    l = n(99780),
                    r = n(46635),
                    e = n(9731),
                    o = n(95186);

                function i(a, s) {
                    const h = document.querySelector("command-palette");
                    let f = "";
                    s && (s.group === "commands" || s.group === "global_commands") && (f = s.title);
                    const T = {
                        command_palette_session_id: h.sessionId,
                        command_palette_scope: h.query.scope.type,
                        command_palette_mode: h.getMode(),
                        command_palette_title: f,
                        command_palette_position: s == null ? void 0 : s.position,
                        command_palette_score: s == null ? void 0 : s.score,
                        command_palette_group: s == null ? void 0 : s.group,
                        command_palette_item_type: s instanceof e.g ? s == null ? void 0 : s.itemType : s == null ? void 0 : s.constructor.name
                    };
                    let O;
                    a === "activate" ? O = c(s) : O = a, (0, o.q)(`command_palette_${O}`, T)
                }
                g(i, "sendTrackingEvent");

                function c(a) {
                    var s;
                    return a instanceof d.i ? "access_policy_executed" : a instanceof m.d || a instanceof r.U || a instanceof u.Z ? "command_executed" : a instanceof l.s ? ((s = a.element) == null ? void 0 : s.newTabOpened) ? "jump_to_new_tab" : "jump_to" : "activate"
                }
                g(c, "activateTrackingEventType")
            },
            95186: (D, v, n) => {
                n.d(v, {
                    Y: () => e,
                    q: () => o
                });
                var d = n(88149),
                    m = n(86058);
                const u = "dimension_";
                let l;
                try {
                    const i = (0, d.n)("octolytics");
                    delete i.baseContext, l = new m.R(i)
                } catch {}

                function r(i) {
                    const c = (0, d.n)("octolytics").baseContext || {};
                    if (c) {
                        delete c.app_id, delete c.event_url, delete c.host;
                        for (const s in c) s.startsWith(u) && (c[s.replace(u, "")] = c[s], delete c[s])
                    }
                    const a = document.querySelector("meta[name=visitor-payload]");
                    if (a) {
                        const s = JSON.parse(atob(a.content));
                        Object.assign(c, s)
                    }
                    return Object.assign(c, i)
                }
                g(r, "extendBaseContext");

                function e(i) {
                    l == null || l.sendPageView(r(i))
                }
                g(e, "sendPageView");

                function o(i, c) {
                    var a, s;
                    const h = (s = (a = document.head) == null ? void 0 : a.querySelector('meta[name="current-catalog-service"]')) == null ? void 0 : s.content,
                        f = h ? {
                            service: h
                        } : {};
                    for (const [T, O] of Object.entries(c)) O != null && (f[T] = `${O}`);
                    l == null || l.sendEvent(i || "unknown", r(f))
                }
                g(o, "sendEvent")
            }
        }
    ]);
})();

//# sourceMappingURL=5623-b4605be9d413.js.map