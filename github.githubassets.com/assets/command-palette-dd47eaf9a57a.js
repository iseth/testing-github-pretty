"use strict";
(() => {
    var ht = Object.defineProperty;
    var i = (y, v) => ht(y, "name", {
        value: v,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [9016], {
            79116: (y, v, c) => {
                var l = c(90420),
                    g = Object.defineProperty,
                    T = Object.getOwnPropertyDescriptor,
                    m = i((t, e, s, o) => {
                        for (var r = o > 1 ? void 0 : o ? T(e, s) : e, n = t.length - 1, a; n >= 0; n--)(a = t[n]) && (r = (o ? a(e, s, r) : a(r)) || r);
                        return o && r && g(e, s, r), r
                    }, "__decorateClass");
                const p = "*";
                let h = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.scopeTypes = ""
                    }
                    active(t, e) {
                        return this.scopeTypeMatch(t.type) && this.modeMatch(e)
                    }
                    scopeTypeMatch(t) {
                        return this.scopeTypes ? this.scopeTypes && JSON.parse(this.scopeTypes).includes(t) : !0
                    }
                    modeMatch(t) {
                        return this.char === p || this.char === t
                    }
                    character() {
                        return this.char === p ? "" : this.char
                    }
                }, "CommandPaletteModeElement");
                m([l.Lj], h.prototype, "char", 2), m([l.Lj], h.prototype, "placeholder", 2), m([l.Lj], h.prototype, "scopeTypes", 2), h = m([l.Ih], h);
                var u = Object.defineProperty,
                    b = Object.getOwnPropertyDescriptor,
                    C = i((t, e, s, o) => {
                        for (var r = o > 1 ? void 0 : o ? b(e, s) : e, n = t.length - 1, a; n >= 0; n--)(a = t[n]) && (r = (o ? a(e, s, r) : a(r)) || r);
                        return o && r && u(e, s, r), r
                    }, "command_palette_tip_element_decorateClass");
                const B = "*",
                    R = "";
                let S = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.scopeTypes = R, this.mode = B, this.matchMode = R, this.value = B, this.onEmpty = !1, this.onError = !1
                    }
                    connectedCallback() {
                        this.hidden = !0
                    }
                    available(t, e = !1, s = !1) {
                        return this.valueMatch(t.text) && this.scopeTypeMatch(t.scope.type) && this.modeMatch(t.mode) && this.showOnEmpty(e) && this.showOnError(s)
                    }
                    toggle(t, e = !1, s = !1) {
                        this.hidden = !this.available(t, e, s)
                    }
                    valueMatch(t) {
                        return this.value === B || this.value === t
                    }
                    scopeTypeMatch(t) {
                        return this.scopeTypes !== R && (this.scopeTypes === B || JSON.parse(this.scopeTypes).includes(t))
                    }
                    modeMatch(t) {
                        if (this.matchMode === R) return this.mode === B || this.mode === t; {
                            const e = new RegExp(this.matchMode);
                            return t.match(e) !== null
                        }
                    }
                    showOnEmpty(t) {
                        return this.onEmpty ? t : !0
                    }
                    showOnError(t) {
                        return this.onError ? t : !0
                    }
                }, "CommandPaletteTipElement");
                C([l.Lj], S.prototype, "scopeTypes", 2), C([l.Lj], S.prototype, "mode", 2), C([l.Lj], S.prototype, "matchMode", 2), C([l.Lj], S.prototype, "value", 2), C([l.Lj], S.prototype, "onEmpty", 2), C([l.Lj], S.prototype, "onError", 2), S = C([l.Ih], S);
                var mt = c(34348),
                    je = Object.defineProperty,
                    De = Object.getOwnPropertyDescriptor,
                    H = i((t, e, s, o) => {
                        for (var r = o > 1 ? void 0 : o ? De(e, s) : e, n = t.length - 1, a; n >= 0; n--)(a = t[n]) && (r = (o ? a(e, s, r) : a(r)) || r);
                        return o && r && je(e, s, r), r
                    }, "command_palette_token_element_decorateClass");
                let D = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.type = "", this.id = "", this.text = "", this.value = ""
                    }
                }, "CommandPaletteTokenElement");
                H([l.Lj], D.prototype, "type", 2), H([l.Lj], D.prototype, "id", 2), H([l.Lj], D.prototype, "text", 2), H([l.Lj], D.prototype, "value", 2), D = H([l.Ih], D);
                var k = c(65881),
                    _e = c(55623),
                    te = c(46263),
                    Ae = Object.defineProperty,
                    Me = Object.getOwnPropertyDescriptor,
                    O = i((t, e, s, o) => {
                        for (var r = o > 1 ? void 0 : o ? Me(e, s) : e, n = t.length - 1, a; n >= 0; n--)(a = t[n]) && (r = (o ? a(e, s, r) : a(r)) || r);
                        return o && r && Ae(e, s, r), r
                    }, "command_palette_item_stack_element_decorateClass");
                let _ = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.topGroupThreshold = 6.5, this.maxHeightVh = 65, this.showDebugInfo = !1, this.octicons = {}, this.tryDefaultSelection = !1, this.eventListenersBound = !1, this.currentHeight = 0, this.items = {}, this.history = {}
                    }
                    get commandPalette() {
                        return this.closest("command-palette")
                    }
                    connectedCallback() {
                        if (this.classList.add("rounded-bottom-2"), this.commandPalette && !this.commandPalette.multiPageEnabled) {
                            const t = this.commandPalette.querySelector(".js-command-local-provider-octicons");
                            if (t) {
                                const e = Array.from(t.children).map(s => ({
                                    id: s.getAttribute("data-local-provider-octicon-id"),
                                    svg: s.innerHTML
                                }));
                                this.commandPalette.cacheIcons(e)
                            }
                        }
                    }
                    get selectedItem() {
                        return this.findSelectedElement()
                    }
                    set selectedItem(t) {
                        const e = this.findSelectedElement();
                        e && (e.selected = !1), t && (t.selected = !0, this.selectedItemChanged(t.item))
                    }
                    get selectedItemIsTopResult() {
                        var t;
                        const e = this.findGroup(k.O.topGroupId);
                        return e && e.itemNodes.length > 0 ? e.firstItem.itemId === ((t = this.selectedItem) == null ? void 0 : t.itemId) : !1
                    }
                    findSelectedElement() {
                        return this.querySelector("command-palette-item[data-selected]")
                    }
                    navigate(t) {
                        var e, s;
                        this.tryDefaultSelection = !1;
                        const o = t > 0,
                            r = {
                                behavior: "smooth",
                                block: "nearest"
                            };
                        if (this.selectedItem) {
                            let n;
                            if (o ? n = (e = this.selectedItem) == null ? void 0 : e.nextElementSibling : n = (s = this.selectedItem) == null ? void 0 : s.previousElementSibling, n) this.selectedItem = n, this.selectedItem.scrollIntoView(r);
                            else if (this.selectedItem) {
                                const a = this.visibleGroups[this.calculateIndex(t)];
                                a.scrollIntoView(r), o ? this.selectedItem = a.firstItem : this.selectedItem = a.lastItem
                            }
                        } else this.selectedItem = this.firstItem
                    }
                    calculateIndex(t) {
                        var e;
                        let s = this.visibleGroups.findIndex(n => {
                            var a;
                            return n.groupId === ((a = this.selectedItem) == null ? void 0 : a.item.group)
                        });
                        ((e = this.findGroup(k.O.topGroupId)) == null ? void 0 : e.firstItem) === this.selectedItem && (s = 0);
                        const o = s + t,
                            r = this.visibleGroups.length;
                        return (o % r + r) % r
                    }
                    historyItems(t) {
                        return this.history[t] || (this.history[t] = {}), this.history[t]
                    }
                    addItemToHistory(t, e, s) {
                        const o = this.historyItems(e),
                            r = s.calculateScore(t);
                        o[s.id] = r
                    }
                    addItems(t, e, s = !1) {
                        for (const o of e) this.addItemToHistory(t.text, t.path, o), this.items[o.id] = o, s && this.prefillHistory(o, t);
                        (0, te.D)(this.renderCurrentItems.bind(this), this.debounceWait)()
                    }
                    removeItem(t) {
                        return delete this.items[t.id]
                    }
                    removeItems(t) {
                        const e = t.map(s => ({
                            item: s,
                            removed: this.removeItem(s)
                        }));
                        return (0, te.D)(this.renderCurrentItems.bind(this), this.debounceWait)(), e
                    }
                    prefillHistory(t, e) {
                        for (const s of t.matchingFields) {
                            const r = Math.min(s.length, 15);
                            for (let n = 0; n <= r; n++) {
                                const a = s.slice(0, n);
                                this.addItemToHistory(a, e.buildPath(e, a), t)
                            }
                        }
                    }
                    get debounceWait() {
                        return 16
                    }
                    renderCurrentItems() {
                        const t = this.getQuery().immutableCopy();
                        this.currentPath !== t.path && this.reset();
                        const e = [...this.currentItems];
                        if (t.isPresent() && e.length > 0) {
                            const s = this.findGroup(k.O.topGroupId);
                            for (let o = 0; s && o < s.limit; o++) {
                                const r = e[o],
                                    n = r.calculateScore(t.queryText),
                                    a = r.priority + n;
                                r && a > this.topGroupThreshold && this.renderItem(e.shift(), k.O.topGroupId)
                            }
                        }
                        this.renderItems(e), this.updateSelectedItem(), this.itemsUpdated()
                    }
                    itemsUpdated() {
                        const t = new CustomEvent("itemsUpdated", {
                            cancelable: !0,
                            detail: {
                                items: this.currentItems,
                                queryPath: this.getQuery().immutableCopy().path
                            }
                        });
                        return this.dispatchEvent(t)
                    }
                    selectedItemChanged(t) {
                        const e = new CustomEvent("selectedItemChanged", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {
                                item: t,
                                isDefaultSelection: this.tryDefaultSelection
                            }
                        });
                        return this.dispatchEvent(e)
                    }
                    renderItems(t) {
                        for (const e of t) this.renderItem(e, e.group);
                        this.setGroupBorders(), this.setMaxHeight()
                    }
                    get maximumHeight() {
                        const s = window.innerHeight * .5;
                        return Math.min(s, 475)
                    }
                    get innerContentHeight() {
                        let t = 0;
                        for (const e of this.children) {
                            const s = e,
                                o = getComputedStyle(s),
                                r = parseInt(o.marginTop.replace("px", ""), 10),
                                n = parseInt(o.marginBottom.replace("px", ""), 10),
                                a = s.offsetHeight + r + n;
                            s.offsetHeight > 0 && (t += a)
                        }
                        return t
                    }
                    setMaxHeight() {
                        const e = this.maximumHeight * .6,
                            s = Math.round(Math.min(this.maximumHeight, this.innerContentHeight));
                        Math.abs(this.currentHeight - s) > e ? this.classList.add("no-transition") : this.classList.remove("no-transition"), this.setAttribute("style", `max-height:${s}px; min-height:${s}px;`), this.currentHeight = s
                    }
                    setGroupBorders() {
                        if (this.visibleGroups.length > 0) {
                            this.visibleGroups[0].classList.remove("border-top");
                            for (const t of this.visibleGroups) this.visibleGroups.indexOf(t) === 0 ? (t.classList.remove("border-top"), t.header && (t.classList.remove("py-2"), t.classList.add("mb-2", "mt-3"))) : (t.classList.add("border-top"), t.header && (t.classList.remove("mb-2", "mt-3"), t.classList.add("py-2")))
                        }
                    }
                    createItemElementAndRender(t, e, s) {
                        const o = new _e.F;
                        return o.setItemAttributes(t), o.render(e, s), o
                    }
                    renderItem(t, e) {
                        var s;
                        const o = this.findGroup(e);
                        if (!o || (o.hasItem(t) || o.atLimit || ((s = this.topGroup) == null ? void 0 : s.hasItem(t))) && !(o == null ? void 0 : o.topGroup)) return;
                        const r = this.createItemElementAndRender(t, !1, this.getQuery().immutableCopy().queryText);
                        if (this.showDebugInfo && (r.score = t.score), o.push(r), r.containerElement) {
                            const a = o.list.children.length.toString();
                            t.position = a
                        }
                        if (t.icon)
                            if (t.icon.type === "octicon") {
                                const a = this.octicons[t.icon.id],
                                    j = this.octicons["dash-color-fg-muted"];
                                r.renderOcticon(a || j)
                            } else t.icon.type === "avatar" && r.renderAvatar(t.icon.url, t.icon.alt);
                        else r.iconElement.hidden = !0;
                        r.addEventListener("mousemove", a => {
                            (a.movementX !== 0 || a.movementY !== 0) && this.selectedItem !== r && (this.tryDefaultSelection = !1, this.selectedItem = r)
                        })
                    }
                    findGroup(t) {
                        return this.groups.find(e => e.groupId === t)
                    }
                    get topGroup() {
                        return this.findGroup(k.O.topGroupId)
                    }
                    get groupIds() {
                        return this.groups.map(t => t.groupId)
                    }
                    updateSelectedItem() {
                        this.isSelectedItemInvalid() && this.clearSelection(), this.setDefaultSelection() && (this.selectedItem = this.firstItem)
                    }
                    setDefaultSelection() {
                        const t = this.getQuery().hasScope() || this.getQuery().isPresent();
                        return this.tryDefaultSelection && t
                    }
                    noItemSelected() {
                        return !this.selectedItem || this.isSelectedItemInvalid()
                    }
                    isSelectedItemInvalid() {
                        return !this.currentItems.some(t => {
                            var e;
                            return t.id === ((e = this.selectedItem) == null ? void 0 : e.itemId)
                        })
                    }
                    isEmpty() {
                        return !this.currentItems || this.currentItems.length === 0
                    }
                    clearSelection() {
                        this.selectedItem = void 0
                    }
                    clear() {
                        this.history = {}, this.items = {}, this.reset()
                    }
                    reset() {
                        this.tryDefaultSelection = !0, this.currentPath = this.getQuery().immutableCopy().path;
                        for (const t of this.groups) t.prepareForNewItems()
                    }
                    clearItemsFor(t) {
                        const e = this.groups.filter(o => t.includes(o.groupId));
                        for (const o of e) o.prepareForNewItems();
                        const s = Object.values(this.items).filter(o => t.includes(o.group));
                        this.removeItems(s)
                    }
                    get visibleGroups() {
                        return this.groups.filter(t => !t.hidden)
                    }
                    get firstItem() {
                        const t = this.visibleGroups;
                        if (t.length > 0) return t[0].querySelector("command-palette-item")
                    }
                    get currentItems() {
                        const t = this.getQuery().immutableCopy(),
                            e = this.historyItems(t.path),
                            s = Object.entries(e).map(([o, r]) => {
                                const n = this.items[o];
                                return n ? (n.score = r, n) : (delete e[o], null)
                            }).filter(o => o !== null);
                        return s ? t.isBlank() ? s.sort((o, r) => r.priority - o.priority) : s.sort((o, r) => r.score - o.score || r.priority - o.priority) : []
                    }
                    disconnectedCallback() {
                        this.unbindListeners()
                    }
                    bindListeners() {
                        this.eventListenersBound || (window.addEventListener("resize", this.setMaxHeight.bind(this)), this.eventListenersBound = !0)
                    }
                    unbindListeners() {
                        window.removeEventListener("resize", this.setMaxHeight.bind(this)), this.eventListenersBound = !1
                    }
                }, "CommandPaletteItemStackElement");
                O([l.Lj], _.prototype, "topGroupThreshold", 2), O([l.Lj], _.prototype, "maxHeightVh", 2), O([l.Lj], _.prototype, "showDebugInfo", 2), O([l.GO], _.prototype, "groups", 2), _ = O([l.Ih], _);
                var Be = c(58070),
                    pt = c(23001),
                    He = c(74365),
                    $ = c(99780),
                    se = c(12374),
                    ke = c(26850);
                class oe extends se.t {
                    async fetchSrc(e) {
                        if (!this.src) throw new Error("No src provided");
                        const s = new URL(this.src, window.location.origin);
                        s.search = e.params().toString();
                        const r = await (await fetch(s.toString(), {
                                headers: {
                                    Accept: "application/json",
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            })).json(),
                            n = r.results[0];
                        if (n.base_file_path) {
                            const a = n.base_file_path,
                                j = n.paths;
                            r.results = j.map(f => $.s.from({
                                title: f,
                                path: `${a}/${f}`,
                                icon: "file-color-fg-muted",
                                group: "files"
                            }))
                        } else n.action && n.action.type === "access_policy" ? r.results = [new He.i(n)] : r.results = [];
                        return r
                    }
                    async fetch(e, s = !1) {
                        const o = e.text.match(/(.+):(\d*)\s*$/);
                        return o ? this.fetchWithLineNumbers(e, o) : super.fetch(e, s)
                    }
                    async fetchWithLineNumbers(e, s) {
                        const o = s[1],
                            r = s[2],
                            n = new ke.A(o, e.mode, {
                                scope: e.scope
                            }),
                            a = [],
                            j = (await super.fetch(n, !1)).results;
                        for (const f of j) f instanceof $.s && a.push(this.convert(f, r));
                        return {
                            results: a
                        }
                    }
                    convert(e, s) {
                        return s === "" || !(e instanceof $.s) || (e.title = `${e.title}:${s}`, e.action.path = `${e.action.path}#L${s}`), e
                    }
                }
                i(oe, "FilesProvider");
                var U = c(43832);
                class re extends U.j {
                    enabledFor(e) {
                        return !0
                    }
                    clearCache() {}
                    get hasCommands() {
                        return !1
                    }
                    get debounce() {
                        return 0
                    }
                    async fetch(e, s = !1) {
                        return e.mode === "?" || s ? {
                            results: Array.from(this.element.querySelectorAll("command-palette-help")).filter(n => n.show(e)).map((n, a) => n.toItem(a))
                        } : {
                            results: []
                        }
                    }
                }
                i(re, "HelpProvider");
                var w = c(74030),
                    Oe = c(33241),
                    qe = c(46635);
                class d {
                    constructor() {
                        this.iconType = "octicon", this.group = "commands", this.priority = 0, this.dismissAfterRun = !0
                    }
                    static item(e = {}) {
                        return new qe.U(new this, e)
                    }
                    run(e) {
                        new Error("Not implemented")
                    }
                    isApplicable(e) {
                        return !0
                    }
                }
                i(d, "MainWindowCommand");
                class N extends d {
                    constructor() {
                        super(...arguments);
                        this.group = "global_commands"
                    }
                }
                i(N, "MainWindowGlobalCommand");
                class ie extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Open in github.dev editor", this.icon = "codespaces-color-fg-muted", this.priority = 10
                    }
                    isApplicable() {
                        return this.fetchLink() instanceof HTMLAnchorElement
                    }
                    fetchLink() {
                        return document.querySelector(".js-github-dev-shortcut")
                    }
                    run() {
                        var e;
                        (e = this.fetchLink()) == null || e.click()
                    }
                }
                i(ie, "OpenInDotDev");
                class ne extends N {
                    constructor() {
                        super(...arguments);
                        this.title = "Switch theme", this.icon = "paintbrush-color-fg-muted", this.priority = 9, this.dismissAfterRun = !1
                    }
                    run(e) {
                        e.pushPage(new Oe.Z4(this.title, "switch-theme-page-1", this.pageItems))
                    }
                    get pageItems() {
                        return [x.item({
                            group: "commands",
                            title: "Default dark"
                        }), z.item({
                            group: "commands",
                            title: "Default light"
                        }), Z.item({
                            group: "commands",
                            title: "Dark dimmed"
                        }), W.item({
                            group: "commands",
                            title: "Dark high contrast"
                        }), V.item({
                            group: "commands",
                            title: "Sync with system settings"
                        })]
                    }
                    select(e) {
                        this.run(e)
                    }
                }
                i(ne, "SwitchTheme");
                class x extends N {
                    constructor() {
                        super(...arguments);
                        this.title = "Switch theme to default dark", this.icon = "moon-color-fg-muted", this.mode = "dark", this.theme = "dark"
                    }
                    applyTheme() {
                        this.loadStyles(this.theme), this.mode !== "auto" && (0, w.on)(this.theme, this.mode), (0, w.h5)(this.mode)
                    }
                    async run() {
                        this.applyTheme(), this.saveSettings(this.mode, this.lightTheme, this.darkTheme)
                    }
                    async saveSettings(e = this.mode, s, o) {
                        const r = document.querySelector(".js-color-mode-csrf").value,
                            n = document.querySelector(".js-color-mode-path").value,
                            a = new FormData;
                        a.set("color_mode", e), s && a.set("light_theme", s), o && a.set("dark_theme", o);
                        const f = await (await fetch(n, {
                            method: "PUT",
                            body: a,
                            mode: "same-origin",
                            headers: {
                                "Scoped-CSRF-Token": r,
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        })).json();
                        this.loadStyles(f.light_theme), this.loadStyles(f.dark_theme), (0, w.on)(f.light_theme, "light"), (0, w.on)(f.dark_theme, "dark"), (0, w.h5)(f.color_mode)
                    }
                    loadStyles(e) {
                        const s = document.querySelector(`link[data-color-theme='${e}']`);
                        s && !s.hasAttribute("href") && s.hasAttribute("data-href") && s.setAttribute("href", s.getAttribute("data-href"))
                    }
                    get darkTheme() {
                        return this.mode === "dark" ? this.theme : (0, w.yn)("dark")
                    }
                    get lightTheme() {
                        return this.mode === "light" ? this.theme : (0, w.yn)("light")
                    }
                }
                i(x, "SwitchToDark");
                class W extends x {
                    constructor() {
                        super(...arguments);
                        this.title = "Switch theme to dark high contrast", this.theme = "dark_high_contrast"
                    }
                }
                i(W, "SwitchToDarkHighContrast");
                class Z extends x {
                    constructor() {
                        super(...arguments);
                        this.title = "Switch theme to dark dimmed", this.theme = "dark_dimmed"
                    }
                }
                i(Z, "SwitchToDarkDimmed");
                class z extends x {
                    constructor() {
                        super(...arguments);
                        this.title = "Switch theme to default light", this.icon = "sun-color-fg-muted", this.mode = "light", this.theme = "light"
                    }
                }
                i(z, "SwitchToLight");
                class V extends x {
                    constructor() {
                        super(...arguments);
                        this.title = "Switch theme settings to sync with system", this.icon = "sun-color-fg-muted", this.mode = "auto"
                    }
                    get darkTheme() {}
                    get lightTheme() {}
                }
                i(V, "SwitchToAuto");
                class ae extends d {
                    constructor() {
                        super();
                        const e = this.isSubscribe();
                        this.title = `${e?"Subscribe":"Unsubscribe"}`, this.icon = `${e?"bell":"bell-slash"}-color-fg-muted`
                    }
                    isApplicable() {
                        var e;
                        return this.fetchButton() instanceof HTMLButtonElement && ((e = this.fetchButton()) == null ? void 0 : e.disabled) === !1
                    }
                    isSubscribe() {
                        var e, s;
                        return ((s = (e = this.fetchButton()) == null ? void 0 : e.textContent) == null ? void 0 : s.trim()) === "Subscribe"
                    }
                    fetchButton() {
                        return document.querySelector(".thread-subscribe-button")
                    }
                    run() {
                        var e;
                        (e = this.fetchButton()) == null || e.click()
                    }
                }
                i(ae, "UpdateSubscription");
                const Ge = [ie, z, x, Z, W, V, ae];
                class le extends U.j {
                    enabledFor(e) {
                        return e.mode === ">"
                    }
                    async fetch(e) {
                        return {
                            results: this.fuzzyFilter(this.items, e)
                        }
                    }
                    get items() {
                        return [ne.item()]
                    }
                    clearCache() {}
                }
                i(le, "MultiPageCommandsProvider");
                var Re = c(45979),
                    Fe = c(3404);
                class ce extends U.j {
                    enabledFor(e) {
                        return !(e.isBlank() || e.mode === "?" || e.mode === ">")
                    }
                    clearCache() {}
                    get hasCommands() {
                        return !1
                    }
                    async fetch(e, s = !1) {
                        return {
                            results: [Fe.K.create(e)]
                        }
                    }
                }
                i(ce, "SearchLinksProvider");
                class K {
                    static create(e) {
                        const s = this.providers[e.type];
                        if (!s) throw new Error(`Unknown provider type: ${e.type}`);
                        return new s(e)
                    }
                }
                i(K, "ServerDefinedProviderFactory"), K.providers = {
                    remote: Re.x,
                    prefetched: se.t,
                    files: oe,
                    help: re,
                    "search-links": ce,
                    "multi-page-commands": le
                };
                var $e = Object.defineProperty,
                    Ue = Object.getOwnPropertyDescriptor,
                    P = i((t, e, s, o) => {
                        for (var r = o > 1 ? void 0 : o ? Ue(e, s) : e, n = t.length - 1, a; n >= 0; n--)(a = t[n]) && (r = (o ? a(e, s, r) : a(r)) || r);
                        return o && r && $e(e, s, r), r
                    }, "server_defined_provider_element_decorateClass");
                let E = i(class extends Be.b {
                    constructor() {
                        super(...arguments);
                        this._wildcard = "*"
                    }
                    get debounce() {
                        return parseInt(this.fetchDebounce, 10)
                    }
                    get hasCommands() {
                        return this.supportsCommands
                    }
                    get hasWildCard() {
                        return this.modes.includes(this._wildcard)
                    }
                    get modes() {
                        return this.supportedModes === "" && (this._modes = [""]), this._modes || (this._modes = JSON.parse(this.supportedModes)), this._modes
                    }
                    get scopeTypes() {
                        return this.supportedScopeTypes === "" ? [] : (this._scopeTypes || (this._scopeTypes = JSON.parse(this.supportedScopeTypes)), this._scopeTypes)
                    }
                    connectedCallback() {
                        this.provider = K.create(this)
                    }
                }, "ServerDefinedProviderElement");
                P([l.Lj], E.prototype, "type", 2), P([l.Lj], E.prototype, "supportedModes", 2), P([l.Lj], E.prototype, "fetchDebounce", 2), P([l.Lj], E.prototype, "supportedScopeTypes", 2), P([l.Lj], E.prototype, "src", 2), P([l.Lj], E.prototype, "supportsCommands", 2), E = P([l.Ih], E);
                var Ne = c(52815),
                    We = Object.defineProperty,
                    Ze = Object.getOwnPropertyDescriptor,
                    A = i((t, e, s, o) => {
                        for (var r = o > 1 ? void 0 : o ? Ze(e, s) : e, n = t.length - 1, a; n >= 0; n--)(a = t[n]) && (r = (o ? a(e, s, r) : a(r)) || r);
                        return o && r && We(e, s, r), r
                    }, "command_palette_help_element_decorateClass");
                let L = i(class extends HTMLElement {
                    connectedCallback() {
                        this.hidden = !0
                    }
                    show(t) {
                        return this.isEnabledScopeType(t)
                    }
                    isEnabledScopeType(t) {
                        return this.scopeTypes ? this.scopeTypes && JSON.parse(this.scopeTypes).includes(t.scope.type) : !0
                    }
                    toItem(t) {
                        const e = {
                            group: this.group,
                            title: this.titleElement.innerHTML,
                            index: t
                        };
                        return this.prefix && (e.prefix = this.prefix), this.hintElement.textContent && (e.persistentHint = this.hintElement.innerHTML), Ne.B.from(e)
                    }
                }, "CommandPaletteHelpElement");
                A([l.Lj], L.prototype, "group", 2), A([l.Lj], L.prototype, "prefix", 2), A([l.Lj], L.prototype, "scopeTypes", 2), A([l.fA], L.prototype, "titleElement", 2), A([l.fA], L.prototype, "hintElement", 2), L = A([l.Ih], L);
                var ft = c(9731),
                    yt = c(16517),
                    vt = c(20181),
                    gt = c(94634),
                    bt = c(32004);
                class ue extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Delete discussion\u2026", this.icon = "trash-color-fg-muted"
                    }
                    get deleteButton() {
                        return document.querySelector("button#dialog-show-delete-discussion")
                    }
                    get dialogElement() {
                        return document.querySelector("#delete-discussion")
                    }
                    fetchDetails() {
                        return document.querySelector("details.js-delete-discussion-details")
                    }
                    isApplicable() {
                        return this.deleteButton != null || this.fetchDetails() instanceof HTMLDetailsElement
                    }
                    run() {
                        const e = this.deleteButton;
                        if (e) {
                            e.click(), setTimeout(() => {
                                var o, r;
                                (r = (o = this.dialogElement) == null ? void 0 : o.querySelector('button[type="submit"]')) == null || r.focus()
                            }, 0);
                            return
                        }
                        const s = this.fetchDetails();
                        s && (s.open = !0, setTimeout(() => {
                            var o;
                            (o = s == null ? void 0 : s.querySelector('button[type="submit"]')) == null || o.focus()
                        }, 0))
                    }
                }
                i(ue, "DeleteDiscussion");
                class de extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Edit discussion body", this.icon = "pencil-color-fg-muted"
                    }
                    get editButton() {
                        return document.querySelector(".js-discussions-comment-edit-button")
                    }
                    isApplicable() {
                        return this.editButton != null
                    }
                    run() {
                        var e;
                        (e = this.editButton) == null || e.click()
                    }
                }
                i(de, "EditDiscussion");
                class he extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Transfer discussion\u2026", this.icon = "arrow-right-color-fg-muted"
                    }
                    fetchDetails() {
                        return document.querySelector("details.js-transfer-discussion-details")
                    }
                    isApplicable() {
                        return this.fetchDetails() instanceof HTMLDetailsElement
                    }
                    run() {
                        var e;
                        const s = this.fetchDetails();
                        if (s) {
                            const o = i(() => {
                                setTimeout(() => {
                                    var r;
                                    (r = s == null ? void 0 : s.querySelector("[data-menu-button]")) == null || r.focus()
                                }, 0)
                            }, "focusMenu");
                            (e = s.querySelector("include-fragment")) == null || e.addEventListener("load", o), s.open = !0, o()
                        }
                    }
                }
                i(he, "TransferDiscussion");
                const ze = [ue, he, de];

                function me(t) {
                    t.focus(), t.selectionStart = t.selectionEnd = t.value.length
                }
                i(me, "moveCursorToEnd");
                class Q extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Edit issue body", this.icon = "pencil-color-fg-muted"
                    }
                    issueBody() {
                        return document.querySelector(".js-command-palette-issue-body")
                    }
                    isIssue() {
                        return !!this.issueBody()
                    }
                    isApplicable() {
                        return this.isIssue()
                    }
                    run() {
                        const e = document.createElement("button");
                        e.hidden = !0, e.classList.add("js-comment-edit-button");
                        const s = document.querySelector("div.js-comment");
                        s == null || s.appendChild(e), e.click(), e.remove(), setTimeout(() => {
                            var o;
                            const r = (o = s == null ? void 0 : s.parentElement) == null ? void 0 : o.querySelector("textarea.js-comment-field");
                            r && me(r)
                        }, 0)
                    }
                }
                i(Q, "EditIssueBody");
                class J extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Edit issue title", this.icon = "pencil-color-fg-muted"
                    }
                    issueBody() {
                        return document.querySelector(".js-command-palette-issue-body")
                    }
                    isIssue() {
                        return !!this.issueBody()
                    }
                    isApplicable() {
                        return this.fetchButton() instanceof HTMLButtonElement && this.isIssue()
                    }
                    fetchButton() {
                        return document.querySelector(".js-title-edit-button")
                    }
                    run() {
                        var e;
                        (e = this.fetchButton()) == null || e.click(), setTimeout(() => {
                            const s = document.querySelector("input#issue_title[autofocus]");
                            s && me(s)
                        }, 0)
                    }
                }
                i(J, "EditIssueTitle");
                class pe extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Transfer issue\u2026", this.icon = "arrow-right-color-fg-muted"
                    }
                    isApplicable() {
                        return this.fetchDetails() instanceof HTMLDetailsElement
                    }
                    fetchDetails() {
                        return document.querySelector("details.js-transfer-issue")
                    }
                    run() {
                        var e;
                        const s = this.fetchDetails();
                        if (s) {
                            const o = i(() => {
                                setTimeout(() => {
                                    var r;
                                    (r = s.querySelector("[data-menu-button]")) == null || r.focus()
                                }, 0)
                            }, "focusMenu");
                            (e = s.querySelector("include-fragment")) == null || e.addEventListener("load", o), s.open = !0, o()
                        }
                    }
                }
                i(pe, "TransferIssue");
                class fe extends d {
                    constructor() {
                        super();
                        const e = this.isLock();
                        this.title = `${e?"Lock":"Unlock"} conversation`, this.icon = `${e?"lock":"key"}-color-fg-muted`
                    }
                    isApplicable() {
                        return this.fetchDetails() instanceof HTMLDetailsElement
                    }
                    isLock() {
                        var e, s;
                        return ((s = (e = document.querySelector("summary.lock-toggle-link")) == null ? void 0 : e.textContent) == null ? void 0 : s.trim()) === "Lock conversation"
                    }
                    fetchDetails() {
                        return document.querySelector("details.js-lock-issue")
                    }
                    run() {
                        const e = this.fetchDetails();
                        e && (e.open = !0, setTimeout(() => {
                            var s;
                            (s = document.querySelector("#unlock-reason")) == null || s.focus()
                        }, 0))
                    }
                }
                i(fe, "LockIssue");
                class ye extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Delete issue\u2026", this.icon = "trash-color-fg-muted"
                    }
                    isApplicable() {
                        return this.fetchDetails() instanceof HTMLDetailsElement
                    }
                    fetchDetails() {
                        return document.querySelector("details.js-delete-issue")
                    }
                    run() {
                        const e = this.fetchDetails();
                        e && (e.open = !0, setTimeout(() => {
                            var s;
                            (s = e.querySelector('button[type="submit"]')) == null || s.focus()
                        }, 0))
                    }
                }
                i(ye, "DeleteIssue");
                class ve extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Convert issue to discussion\u2026", this.icon = "comment-discussion-color-fg-muted"
                    }
                    isApplicable() {
                        return this.fetchDetails() instanceof HTMLDetailsElement
                    }
                    fetchDetails() {
                        return document.querySelector("details.js-convert-to-discussion")
                    }
                    run() {
                        var e;
                        const s = this.fetchDetails();
                        if (s) {
                            const o = i(() => {
                                setTimeout(() => {
                                    var r;
                                    (r = s.querySelector("[data-menu-button]")) == null || r.focus()
                                }, 0)
                            }, "focusMenu");
                            (e = s.querySelector("include-fragment")) == null || e.addEventListener("load", o), s.open = !0, o()
                        }
                    }
                }
                i(ve, "ConvertToDiscussion");
                const Ve = [J, Q, fe, pe, ye, ve];
                var Ke = c(21314),
                    I = c(76745);
                class X extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Open in new codespace", this.icon = "codespaces-color-fg-muted", this.priority = 11
                    }
                    isApplicable() {
                        const e = this.fetchElements();
                        return !!(e.codeModal && e.codespacesForm && e.newCodespacesButton && e.codespacesTab)
                    }
                    run() {
                        const {
                            codeModal: e,
                            codespacesTab: s,
                            newCodespacesButton: o
                        } = this.fetchElements();
                        !(e && s && o) || (e.open = !0, s.click(), o instanceof HTMLButtonElement ? o.click() : (o.parentElement.open = !0, setTimeout(() => {
                            var r;
                            (r = document.querySelector(".js-create-codespace-with-sku-button")) == null || r.focus()
                        }, 0)))
                    }
                    fetchElements() {
                        const e = document.querySelector(".js-create-codespaces-form-command"),
                            s = (e == null ? void 0 : e.closest("details")) || null,
                            o = (s == null ? void 0 : s.querySelector('[data-tab="cloud"]')) || null,
                            r = (e == null ? void 0 : e.querySelector('summary[role="button"], button[type="submit"]')) || null;
                        return {
                            codespacesForm: e,
                            codeModal: s,
                            codespacesTab: o,
                            newCodespacesButton: r
                        }
                    }
                }
                i(X, "OpenCodespace");
                var q = c(76612);
                class ge extends Q {
                    constructor() {
                        super(...arguments);
                        this.title = "Edit pull request body"
                    }
                    pullRequestBody() {
                        return document.querySelector(".js-command-palette-pull-body")
                    }
                    isPullRequest() {
                        return !!this.pullRequestBody()
                    }
                    isApplicable() {
                        return this.isPullRequest()
                    }
                }
                i(ge, "EditPullRequestBody");
                class be extends J {
                    constructor() {
                        super(...arguments);
                        this.title = "Edit pull request title"
                    }
                    pullRequestBody() {
                        return document.querySelector(".js-command-palette-pull-body")
                    }
                    isPullRequest() {
                        return !!this.pullRequestBody()
                    }
                    isApplicable() {
                        return this.fetchButton() instanceof HTMLButtonElement && this.isPullRequest()
                    }
                }
                i(be, "EditPullRequestTitle");
                class Ce extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Update current branch", this.icon = "sync-color-fg-muted"
                    }
                    isApplicable() {
                        return this.fetchButton() instanceof HTMLButtonElement
                    }
                    fetchButton() {
                        return document.querySelector(".js-update-branch-form button")
                    }
                    run() {
                        const e = this.fetchButton();
                        e && (e.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        }), e.click())
                    }
                }
                i(Ce, "UpdateBranch");
                class Se extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Convert to draft", this.icon = "git-pull-request-draft-color-fg-muted"
                    }
                    isApplicable() {
                        return this.fetchButton() instanceof HTMLButtonElement
                    }
                    fetchButton() {
                        return document.querySelector(".js-convert-to-draft")
                    }
                    run() {
                        var e;
                        const s = (e = this.fetchButton()) == null ? void 0 : e.closest("details");
                        s && (s.open = !0, setTimeout(() => {
                            var o;
                            (o = s.querySelector(".js-convert-to-draft")) == null || o.focus()
                        }, 0))
                    }
                }
                i(Se, "ConvertToDraft");
                class Ee extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Copy current branch name", this.icon = "copy-color-fg-muted"
                    }
                    isApplicable() {
                        return this.fetchClipboardCopy() instanceof I.Z
                    }
                    fetchClipboardCopy() {
                        return document.querySelector(".js-copy-branch")
                    }
                    async run(e) {
                        const s = this.fetchClipboardCopy();
                        if (s instanceof I.Z) {
                            const o = s.value;
                            try {
                                await (0, q.z)(o), e.displayFlash("success", "Branch name copied to clipboard!")
                            } catch {
                                e.displayFlash("error", "Unable to copy branch name to clipboard!")
                            }
                        }
                    }
                }
                i(Ee, "CopyBranchName");
                const Qe = [Ee, be, ge, Ce, Se, X];
                class Ie extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Copy file permalink", this.icon = "copy-color-fg-muted"
                    }
                    isApplicable() {
                        return this.fetchPermalinkContainer() instanceof HTMLAnchorElement
                    }
                    fetchPermalinkContainer() {
                        return document.querySelector(".js-permalink-shortcut")
                    }
                    async run(e) {
                        const s = this.fetchPermalinkContainer();
                        if (s) {
                            const o = `${s.href}${window.location.hash}`;
                            try {
                                await (0, q.z)(o), e.displayFlash("success", "Copied permalink!")
                            } catch {
                                e.displayFlash("error", "Failed to copy permalink!")
                            }
                        }
                    }
                }
                i(Ie, "CopyPermalink");
                class Te extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Clone repository: Copy HTTPS", this.icon = "copy-color-fg-muted", this.priority = 4
                    }
                    isApplicable() {
                        return this.backendCommandsDisabled() && this.fetchClipboardCopy() instanceof I.Z
                    }
                    fetchClipboardCopy() {
                        return document.querySelector(".js-clone-url-http")
                    }
                    backendCommandsDisabled() {
                        return !!window.commandPalette && !window.commandPalette.hasAttribute("data-commands-path")
                    }
                    async run(e) {
                        const s = this.fetchClipboardCopy();
                        if (s instanceof I.Z) {
                            const o = s.value;
                            try {
                                await (0, q.z)(o), e.displayFlash("success", "Clone URL copied!")
                            } catch {
                                e.displayFlash("error", "Clone URL couldn't be copied")
                            }
                        }
                    }
                }
                i(Te, "CloneCopyHttps");
                class we extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Clone repository: Copy SSH", this.icon = "copy-color-fg-muted", this.priority = 3
                    }
                    isApplicable() {
                        return this.backendCommandsDisabled() && this.fetchClipboardCopy() instanceof I.Z
                    }
                    fetchClipboardCopy() {
                        return document.querySelector(".js-clone-url-ssh")
                    }
                    backendCommandsDisabled() {
                        return !!window.commandPalette && !window.commandPalette.hasAttribute("data-commands-path")
                    }
                    async run(e) {
                        const s = this.fetchClipboardCopy();
                        if (s instanceof I.Z) {
                            const o = s.value;
                            try {
                                await (0, q.z)(o), e.displayFlash("success", "Clone URL copied!")
                            } catch {
                                e.displayFlash("error", "Clone URL couldn't be copied")
                            }
                        }
                    }
                }
                i(we, "CloneCopySsh");
                class xe extends d {
                    constructor() {
                        super(...arguments);
                        this.title = "Clone repository: Copy GitHub CLI", this.icon = "copy-color-fg-muted", this.priority = 2
                    }
                    isApplicable() {
                        return this.backendCommandsDisabled() && this.fetchClipboardCopy() instanceof I.Z
                    }
                    fetchClipboardCopy() {
                        return document.querySelector(".js-clone-url-gh-cli")
                    }
                    backendCommandsDisabled() {
                        return !!window.commandPalette && !window.commandPalette.hasAttribute("data-commands-path")
                    }
                    async run(e) {
                        const s = this.fetchClipboardCopy();
                        if (s instanceof I.Z) {
                            const o = s.value;
                            try {
                                await (0, q.z)(o), e.displayFlash("success", "Clone URL copied!")
                            } catch {
                                e.displayFlash("error", "Clone URL couldn't be copied")
                            }
                        }
                    }
                }
                i(xe, "CloneCopyCli");
                const Je = [Te, we, xe, Ie, X];
                class Y extends Ke.B {
                    constructor() {
                        super(...arguments);
                        this.itemsByType = {}, this.items = [], this.needsFetch = !0
                    }
                    enabledFor(e) {
                        return e.mode === ">"
                    }
                    get hasCommands() {
                        return !0
                    }
                    async fetch(e, s = !1) {
                        return this.loadCommandItems(e), {
                            results: e.isBlank() ? this.items : this.fuzzyFilter(this.items, e)
                        }
                    }
                    get debounce() {
                        return 0
                    }
                    loadCommandItems(e) {
                        this.needsFetch && (this.items = [...Ve.map(s => s.item()), ...Qe.map(s => s.item()), ...Je.map(s => s.item()), ...ze.map(s => s.item()), ...Ge.map(s => s.item())].filter(s => s.isApplicable(e)), this.needsFetch = !1)
                    }
                    clearCache() {
                        this.needsFetch = !0
                    }
                }
                i(Y, "MainWindowCommandsProvider"), window.commandPalette ? window.commandPalette.registerProvider("main-window-commands-provider", new Y) : window.addEventListener("command-palette-ready", () => {
                    var t;
                    (t = window.commandPalette) == null || t.registerProvider("main-window-commands-provider", new Y)
                });
                var M = c(1648),
                    Xe = Object.defineProperty,
                    Ye = Object.getOwnPropertyDescriptor,
                    Pe = i((t, e, s, o) => {
                        for (var r = o > 1 ? void 0 : o ? Ye(e, s) : e, n = t.length - 1, a; n >= 0; n--)(a = t[n]) && (r = (o ? a(e, s, r) : a(r)) || r);
                        return o && r && Xe(e, s, r), r
                    }, "command_palette_input_element_decorateClass");
                let G = i(class extends HTMLElement {
                    constructor() {
                        super(...arguments);
                        this.setupComplete = !1, this.connected = !1, this.multiPageEnabled = !1
                    }
                    static get observedAttributes() {
                        return ["value", "typeahead", "scope"]
                    }
                    setup() {
                        this.classList.add("d-flex", "flex-items-center", "flex-nowrap", "py-1", "pl-3", "pr-2", "border-bottom"), this.input = this.querySelector("input.js-input"), this.overlayInput = this.querySelector("input.js-overlay-input"), this.clearButton = this.querySelector(".js-clear"), this.scopeElement = this.querySelector("command-palette-scope"), this.searchIcon = this.querySelector(".js-search-icon"), this.spinner = this.querySelector(".js-spinner"), this.defaultScope = this.scope, this.hasAttribute("autofocus") && this.input.focus(), this.clearButton.hidden = !0, this.value.length !== 0 && this._dispatchEvent("command-palette-input"), this.setupComplete = !0
                    }
                    connectedCallback() {
                        this.setupComplete || this.setup(), this.value = this.getAttribute("value") || "", this.typeahead = this.getAttribute("typeahead") || "", this.placeholder = this.getAttribute("placeholder") || "", this.connected = !0
                    }
                    attributeChangedCallback(t, e, s) {
                        !this.input || (t === "typeahead" ? this.typeahead = s : t === "value" && (this.value = s, this._dispatchEvent("command-palette-input")))
                    }
                    focus() {
                        this.input.focus()
                    }
                    setRemovedTokenAndSelect(t) {
                        t && (this.value = t), this.focus(), this.input.select()
                    }
                    get scope() {
                        return this.scopeElement.scope
                    }
                    set scope(t) {
                        this.scopeElement.scope = t, this.clearButton.hidden = !this.hasSomethingToClear()
                    }
                    hasScope() {
                        return this.scopeElement.hasScope()
                    }
                    clearScope() {
                        return this.scopeElement.clearScope()
                    }
                    removeToken() {
                        return this.scopeElement.removeToken()
                    }
                    get placeholder() {
                        return this.input.getAttribute("placeholder") || ""
                    }
                    set placeholder(t) {
                        this.input.setAttribute("placeholder", t)
                    }
                    get typeaheadPlaceholder() {
                        var t;
                        return ((t = (0, l.P4)(this, "typeaheadPlaceholder")) == null ? void 0 : t.textContent) || ""
                    }
                    set typeaheadPlaceholder(t) {
                        const e = (0, l.P4)(this, "typeaheadPlaceholder");
                        e.textContent = t
                    }
                    get value() {
                        var t;
                        return ((t = this.input) == null ? void 0 : t.value) || ""
                    }
                    set value(t) {
                        this.input.value = t, this.typeahead = t, this.resetPlaceholder(), this.onInput()
                    }
                    get overlay() {
                        return this.overlayInput.value
                    }
                    set overlay(t) {
                        this.overlayInput.value = t
                    }
                    set mirror(t) {
                        const e = (0, l.P4)(this, "mirror");
                        e.textContent = t
                    }
                    get typeaheadText() {
                        return (0, l.P4)(this, "typeaheadText").textContent || ""
                    }
                    set typeaheadText(t) {
                        const e = (0, l.P4)(this, "typeaheadText");
                        e.textContent = t
                    }
                    get typeahead() {
                        return this.typeaheadValue
                    }
                    set typeahead(t) {
                        if (this.typeaheadValue = this.overlay + t, this.mirror = this.value, t === "") this.typeaheadText = "";
                        else if (this.placeholder = "", this.typeaheadPlaceholder = "", this.valueStartsWithTypeahead) {
                            const e = this.value.length - (this.overlay ? 1 : 0);
                            this.typeaheadText = t.substring(e)
                        } else this.typeaheadText = ` \u2013 ${t}`
                    }
                    showModePlaceholder(t = "") {
                        this.typeaheadPlaceholder = t
                    }
                    get valueStartsWithTypeahead() {
                        return this.typeaheadValue.toLowerCase().startsWith(this.value.toLowerCase())
                    }
                    get isCursorAtEnd() {
                        return this.value.length === this.input.selectionStart
                    }
                    set loading(t) {
                        this.spinner.hidden = !t, this.searchIcon.hidden = t
                    }
                    resetScopeIfNeeded() {
                        !this.multiPageEnabled && this.value === "" && this.scope.id !== this.defaultScope.id && (this.scope = this.defaultScope)
                    }
                    resetPlaceholder() {
                        this.value.replace(this.overlay, "") && this.overlay && (this.typeaheadPlaceholder = ""), this.placeholder = this.getAttribute("placeholder") || ""
                    }
                    onInput() {
                        this.resetPlaceholder(), this.clearButton.hidden = !this.hasSomethingToClear(), !!this.connected && this._dispatchEvent("command-palette-input")
                    }
                    onClear(t) {
                        t instanceof KeyboardEvent && t.key !== "Escape" || (this.value = "", this.input.focus(), this._dispatchEvent("command-palette-cleared"))
                    }
                    onKeydown(t) {
                        if (this.isSelectKeystroke(t.key) && (this._dispatchEvent("command-palette-select"), t.stopImmediatePropagation(), t.preventDefault()), this.hasSomethingToClear() && (0, M.o)(t) && t.key === "Backspace") {
                            this.onClear();
                            return
                        }
                        if (this.input.selectionStart === 0 && this.input.selectionEnd === 0 && (this.hasScope() || this.multiPageEnabled) && t.key === "Backspace") {
                            this._dispatchEvent("command-palette-descope"), t.stopImmediatePropagation(), t.preventDefault();
                            return
                        }
                    }
                    hasSomethingToClear() {
                        return this.scopeElement.hasScope() || this.value.length > 0
                    }
                    isSelectKeystroke(t) {
                        return t === "Tab" || t === "ArrowRight" && this.isCursorAtEnd
                    }
                    textSelected() {
                        return this.input.selectionStart !== this.input.selectionEnd
                    }
                    _dispatchEvent(t) {
                        const e = new CustomEvent(t, {
                            cancelable: !0,
                            detail: {
                                typeahead: this.typeahead,
                                value: this.value
                            }
                        });
                        return this.dispatchEvent(e)
                    }
                }, "CommandPaletteInputElement");
                G.tagName = "command-palette-input", Pe([l.Lj], G.prototype, "multiPageEnabled", 2), G = Pe([l.Ih], G);
                var et = c(11793),
                    tt = c(86404),
                    st = c(34078),
                    Le = c(64463);
                window.customElements.get(M.Z.tagName) || window.customElements.define(M.Z.tagName, M.Z);

                function ot(t) {
                    t.clearCommands(!1)
                }
                i(ot, "clearCommandCaches");

                function rt() {
                    document.addEventListener("keydown", it), (0, Le.N7)(".js-command-palette-dialog", t => {
                        if (!t) return;
                        const e = ee();
                        !e || t.addEventListener("toggle", () => {
                            t.open ? e.activate() : e.deactivate()
                        })
                    }), (0, Le.N7)(".js-socket-channel.js-updatable-content", {
                        subscribe: t => (0, tt.RB)(t, "socket:message", () => {
                            const e = ee();
                            !e || ot(e)
                        })
                    })
                }
                i(rt, "observeCommandPalette");

                function ee() {
                    return document.querySelector(M.Z.tagName)
                }
                i(ee, "findCommandPalette");

                function it(t) {
                    if (!t.code) return;
                    const e = ee();
                    if (!e) return;
                    const s = ct(),
                        o = F(e.platformCommandModeHotkey, t),
                        r = !nt(t) && !s && (F(e.platformActivationHotkey, t) || o),
                        n = !s && (F(e.platformSecondardActivationHotkey, t) || o),
                        a = e.hasAttribute("data-memex-hotkey-enabled") && s && F(e.platformMemexActivationHotkey, t);
                    (r || n || a) && (ut(o), t.preventDefault(), t.stopPropagation())
                }
                i(it, "handleKeyDown");

                function F(t, e) {
                    let s = (0, et.EL)(e);
                    return s = s.replace("\u02DA", "k"), t.split(",").some(o => s === o)
                }
                i(F, "hotkeyMatchesEvent");

                function nt(t) {
                    return at(t) || lt(t)
                }
                i(nt, "shouldIgnoreActivation");

                function at(t) {
                    const e = t.target;
                    return e ? e.closest(".js-previewable-comment-form") !== null : !1
                }
                i(at, "triggeredInsideAPreviewableCommentForm");

                function lt(t) {
                    const e = t.target;
                    if (!e) return !1;
                    const s = e.closest(".js-code-editor");
                    if (!s) return !1;
                    const o = (0, st.P)(s);
                    if (!o) return !1;
                    const r = o.editor;
                    if (!r) return !1;
                    const n = r.getMode().name;
                    return n === "gfm" || n === "markdown"
                }
                i(lt, "triggeredInsideAMarkdownCodeEditor");

                function ct() {
                    return !!document.querySelector("#memex-root")
                }
                i(ct, "triggeredInsideMemex");

                function ut(t) {
                    for (const e of document.querySelectorAll(".js-command-palette-dialog")) {
                        const s = e.querySelector(G.tagName);
                        if (!s) return;
                        if (e.open) e.open = !1;
                        else {
                            dt(s, t);
                            const o = e.querySelector(M.Z.tagName);
                            o && (o.previouslyActiveElement = document.activeElement), e.open = !0
                        }
                    }
                }
                i(ut, "toggleCommandPalette");

                function dt(t, e) {
                    const s = t.value.startsWith(">");
                    return e && !s ? (t.value = `>${t.value}`, !0) : !e && s ? (t.value = t.value.substring(1), !0) : !1
                }
                i(dt, "toggleCommandMode"), rt()
            },
            34078: (y, v, c) => {
                c.d(v, {
                    P: () => T,
                    g: () => m
                });
                var l = c(59753);
                const g = new WeakMap;

                function T(u) {
                    return g.get(u)
                }
                i(T, "getCodeEditor");
                async function m(u) {
                    return g.get(u) || p(await h(u, "codeEditor:ready"))
                }
                i(m, "getAsyncCodeEditor");

                function p(u) {
                    if (!(u instanceof CustomEvent)) throw new Error("assert: event is not a CustomEvent");
                    const b = u.detail.editor;
                    if (!u.target) throw new Error("assert: event.target is null");
                    return g.set(u.target, b), b
                }
                i(p, "onEditorFromEvent"), (0, l.on)("codeEditor:ready", ".js-code-editor", p);

                function h(u, b) {
                    return new Promise(C => {
                        u.addEventListener(b, C, {
                            once: !0
                        })
                    })
                }
                i(h, "nextEvent")
            },
            74030: (y, v, c) => {
                c.d(v, {
                    I3: () => l,
                    h5: () => T,
                    on: () => m,
                    yn: () => p
                });

                function l() {
                    if (g("dark")) return "dark";
                    if (g("light")) return "light"
                }
                i(l, "getPreferredColorMode");

                function g(h) {
                    return window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${h})`).matches
                }
                i(g, "prefersColorScheme");

                function T(h) {
                    const u = document.querySelector("html[data-color-mode]");
                    !u || u.setAttribute("data-color-mode", h)
                }
                i(T, "setClientMode");

                function m(h, u) {
                    const b = document.querySelector("html[data-color-mode]");
                    !b || b.setAttribute(`data-${u}-theme`, h)
                }
                i(m, "setClientTheme");

                function p(h) {
                    const u = document.querySelector("html[data-color-mode]");
                    if (!!u) return u.getAttribute(`data-${h}-theme`)
                }
                i(p, "getClientTheme")
            },
            86404: (y, v, c) => {
                c.d(v, {
                    RB: () => g,
                    qC: () => T,
                    w0: () => l
                });
                class l {
                    constructor(p) {
                        this.closed = !1, this.unsubscribe = () => {
                            p(), this.closed = !0
                        }
                    }
                }
                i(l, "Subscription");

                function g(m, p, h, u = {
                    capture: !1
                }) {
                    return m.addEventListener(p, h, u), new l(() => {
                        m.removeEventListener(p, h, u)
                    })
                }
                i(g, "fromEvent");

                function T(...m) {
                    return new l(() => {
                        for (const p of m) p.unsubscribe()
                    })
                }
                i(T, "compose")
            }
        },
        y => {
            var v = i(l => y(y.s = l), "__webpack_exec__");
            y.O(0, [5724, 6319, 9255, 5623], () => v(79116));
            var c = y.O()
        }
    ]);
})();

//# sourceMappingURL=command-palette-d02c2b9d825a.js.map