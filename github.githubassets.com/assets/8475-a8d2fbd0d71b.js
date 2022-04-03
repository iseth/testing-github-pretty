"use strict";
(() => {
    var Wt = Object.defineProperty;
    var i = (ct, Q) => Wt(ct, "name", {
        value: Q,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [8475], {
            57260: (ct, Q, z) => {
                z.d(Q, {
                    P: () => M
                });
                class M {
                    constructor(u, y) {
                        this.file = u, this.directory = y, this.state = "pending", this.id = null, this.href = null, this.name = null, this.percent = 0
                    }
                    static traverse(u, y) {
                        return x(u, y)
                    }
                    static from(u) {
                        const y = [];
                        for (const B of u)
                            if (B instanceof File) y.push(new M(B));
                            else if (B instanceof M) y.push(B);
                        else throw new Error("Unexpected type");
                        return y
                    }
                    get fullPath() {
                        return this.directory ? `${this.directory}/${this.file.name}` : this.file.name
                    }
                    isImage() {
                        return ["image/gif", "image/png", "image/jpg", "image/jpeg", "image/svg+xml"].indexOf(this.file.type) > -1
                    }
                    isVideo() {
                        return ["video/mp4", "video/quicktime"].indexOf(this.file.type) > -1
                    }
                    saving(u) {
                        if (this.state !== "pending" && this.state !== "saving") throw new Error(`Unexpected transition from ${this.state} to saving`);
                        this.state = "saving", this.percent = u
                    }
                    saved(u) {
                        var y, B, F;
                        if (this.state !== "pending" && this.state !== "saving") throw new Error(`Unexpected transition from ${this.state} to saved`);
                        this.state = "saved", this.id = (y = u == null ? void 0 : u.id) !== null && y !== void 0 ? y : null, this.href = (B = u == null ? void 0 : u.href) !== null && B !== void 0 ? B : null, this.name = (F = u == null ? void 0 : u.name) !== null && F !== void 0 ? F : null
                    }
                    isPending() {
                        return this.state === "pending"
                    }
                    isSaving() {
                        return this.state === "saving"
                    }
                    isSaved() {
                        return this.state === "saved"
                    }
                }
                i(M, "Attachment");

                function x(c, u) {
                    return u && G(c) ? X("", _(c)) : Promise.resolve(D(Array.from(c.files || [])).map(y => new M(y)))
                }
                i(x, "transferredFiles");

                function j(c) {
                    return c.name.startsWith(".")
                }
                i(j, "hidden");

                function D(c) {
                    return Array.from(c).filter(u => !j(u))
                }
                i(D, "visible");

                function U(c) {
                    return new Promise(function(u, y) {
                        c.file(u, y)
                    })
                }
                i(U, "getFile");

                function K(c) {
                    return new Promise(function(u, y) {
                        const B = [],
                            F = c.createReader(),
                            ut = i(() => {
                                F.readEntries(ot => {
                                    ot.length > 0 ? (B.push(...ot), ut()) : u(B)
                                }, y)
                            }, "read");
                        ut()
                    })
                }
                i(K, "getEntries");
                async function X(c, u) {
                    const y = [];
                    for (const B of D(u))
                        if (B.isDirectory) y.push(...await X(B.fullPath, await K(B)));
                        else {
                            const F = await U(B);
                            y.push(new M(F, c))
                        }
                    return y
                }
                i(X, "traverse");

                function G(c) {
                    return c.items && Array.from(c.items).some(u => {
                        const y = u.webkitGetAsEntry && u.webkitGetAsEntry();
                        return y && y.isDirectory
                    })
                }
                i(G, "isDirectory");

                function _(c) {
                    return Array.from(c.items).map(u => u.webkitGetAsEntry()).filter(u => u != null)
                }
                i(_, "roots");
                class w extends HTMLElement {
                    connectedCallback() {
                        this.addEventListener("dragenter", l), this.addEventListener("dragover", l), this.addEventListener("dragleave", s), this.addEventListener("drop", d), this.addEventListener("paste", W), this.addEventListener("change", h)
                    }
                    disconnectedCallback() {
                        this.removeEventListener("dragenter", l), this.removeEventListener("dragover", l), this.removeEventListener("dragleave", s), this.removeEventListener("drop", d), this.removeEventListener("paste", W), this.removeEventListener("change", h)
                    }
                    get directory() {
                        return this.hasAttribute("directory")
                    }
                    set directory(u) {
                        u ? this.setAttribute("directory", "") : this.removeAttribute("directory")
                    }
                    async attach(u) {
                        const y = u instanceof DataTransfer ? await M.traverse(u, this.directory) : M.from(u);
                        this.dispatchEvent(new CustomEvent("file-attachment-accept", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {
                                attachments: y
                            }
                        })) && y.length && this.dispatchEvent(new CustomEvent("file-attachment-accepted", {
                            bubbles: !0,
                            detail: {
                                attachments: y
                            }
                        }))
                    }
                }
                i(w, "FileAttachmentElement");

                function T(c) {
                    return Array.from(c.types).indexOf("Files") >= 0
                }
                i(T, "hasFile");
                let I = null;

                function l(c) {
                    const u = c.currentTarget;
                    I && clearTimeout(I), I = window.setTimeout(() => u.removeAttribute("hover"), 200);
                    const y = c.dataTransfer;
                    !y || !T(y) || (y.dropEffect = "copy", u.setAttribute("hover", ""), c.preventDefault())
                }
                i(l, "onDragenter");

                function s(c) {
                    c.dataTransfer && (c.dataTransfer.dropEffect = "none"), c.currentTarget.removeAttribute("hover"), c.stopPropagation(), c.preventDefault()
                }
                i(s, "onDragleave");

                function d(c) {
                    const u = c.currentTarget;
                    if (!(u instanceof w)) return;
                    u.removeAttribute("hover");
                    const y = c.dataTransfer;
                    !y || !T(y) || (u.attach(y), c.stopPropagation(), c.preventDefault())
                }
                i(d, "onDrop");
                const v = /^image\/(gif|png|jpeg)$/;

                function L(c) {
                    for (const u of c)
                        if (u.kind === "file" && v.test(u.type)) return u.getAsFile();
                    return null
                }
                i(L, "pastedFile");

                function W(c) {
                    if (!c.clipboardData || !c.clipboardData.items) return;
                    const u = c.currentTarget;
                    if (!(u instanceof w)) return;
                    const y = L(c.clipboardData.items);
                    if (!y) return;
                    const B = [y];
                    u.attach(B), c.preventDefault()
                }
                i(W, "onPaste");

                function h(c) {
                    const u = c.currentTarget;
                    if (!(u instanceof w)) return;
                    const y = c.target;
                    if (!(y instanceof HTMLInputElement)) return;
                    const B = u.getAttribute("input");
                    if (B && y.id !== B) return;
                    const F = y.files;
                    !F || F.length === 0 || (u.attach(F), y.value = "")
                }
                i(h, "onChange"), window.customElements.get("file-attachment") || (window.FileAttachmentElement = w, window.customElements.define("file-attachment", w));
                var f = null
            },
            6071: (ct, Q, z) => {
                var M = z(46481),
                    x = z(76745);
                const j = 2e3;

                function D(n) {
                    n.style.display = "inline-block"
                }
                i(D, "showSVG");

                function U(n) {
                    n.style.display = "none"
                }
                i(U, "hideSVG");

                function K(n) {
                    const [t, e] = n.querySelectorAll(".octicon");
                    !t || !e || (D(t), U(e))
                }
                i(K, "showCopy");

                function X(n) {
                    const [t, e] = n.querySelectorAll(".octicon");
                    !t || !e || (U(t), D(e))
                }
                i(X, "showCheck");
                const G = new WeakMap;
                document.addEventListener("clipboard-copy", function({
                    target: n
                }) {
                    if (!(n instanceof HTMLElement) || !n.hasAttribute("data-view-component")) return;
                    const t = G.get(n);
                    t ? (clearTimeout(t), G.delete(n)) : X(n), G.set(n, setTimeout(() => {
                        K(n), G.delete(n)
                    }, j))
                });
                var _ = z(29501),
                    w = z(75329);
                const T = new WeakMap,
                    I = new WeakMap,
                    l = new WeakMap;

                function s(n) {
                    const t = n.currentTarget;
                    if (!(t instanceof u)) return;
                    const {
                        box: e,
                        image: r
                    } = l.get(t) || {};
                    if (!e || !r) return;
                    let a = 0,
                        g = 0;
                    if (n instanceof KeyboardEvent) n.key === "ArrowUp" ? g = -1 : n.key === "ArrowDown" ? g = 1 : n.key === "ArrowLeft" ? a = -1 : n.key === "ArrowRight" && (a = 1);
                    else if (I.has(t) && n instanceof MouseEvent) {
                        const S = I.get(t);
                        a = n.pageX - S.dragStartX, g = n.pageY - S.dragStartY
                    } else if (I.has(t) && n instanceof TouchEvent) {
                        const {
                            pageX: S,
                            pageY: R
                        } = n.changedTouches[0], {
                            dragStartX: N,
                            dragStartY: q
                        } = I.get(t);
                        a = S - N, g = R - q
                    }
                    if (a !== 0 || g !== 0) {
                        const S = Math.min(Math.max(0, e.offsetLeft + a), r.width - e.offsetWidth),
                            R = Math.min(Math.max(0, e.offsetTop + g), r.height - e.offsetHeight);
                        e.style.left = `${S}px`, e.style.top = `${R}px`, c(t, {
                            x: S,
                            y: R,
                            width: e.offsetWidth,
                            height: e.offsetHeight
                        })
                    }
                    if (n instanceof MouseEvent) I.set(t, {
                        dragStartX: n.pageX,
                        dragStartY: n.pageY
                    });
                    else if (n instanceof TouchEvent) {
                        const {
                            pageX: S,
                            pageY: R
                        } = n.changedTouches[0];
                        I.set(t, {
                            dragStartX: S,
                            dragStartY: R
                        })
                    }
                }
                i(s, "moveCropArea");

                function d(n) {
                    const t = n.target;
                    if (!(t instanceof HTMLElement)) return;
                    const e = v(t);
                    if (!(e instanceof u)) return;
                    const {
                        box: r
                    } = l.get(e) || {};
                    if (!r) return;
                    const a = e.getBoundingClientRect();
                    let g, S, R;
                    if (n instanceof KeyboardEvent) {
                        if (n.key === "Escape") return h(e);
                        if (n.key === "-" && (R = -10), n.key === "=" && (R = 10), !R) return;
                        g = r.offsetWidth + R, S = r.offsetHeight + R, T.set(e, {
                            startX: r.offsetLeft,
                            startY: r.offsetTop
                        })
                    } else if (n instanceof MouseEvent) {
                        const N = T.get(e);
                        if (!N) return;
                        g = n.pageX - N.startX - a.left - window.pageXOffset, S = n.pageY - N.startY - a.top - window.pageYOffset
                    } else if (n instanceof TouchEvent) {
                        const N = T.get(e);
                        if (!N) return;
                        g = n.changedTouches[0].pageX - N.startX - a.left - window.pageXOffset, S = n.changedTouches[0].pageY - N.startY - a.top - window.pageYOffset
                    }
                    g && S && W(e, g, S, !(n instanceof KeyboardEvent))
                }
                i(d, "updateCropArea");

                function v(n) {
                    const t = n.getRootNode();
                    return t instanceof ShadowRoot ? t.host : n
                }
                i(v, "getShadowHost");

                function L(n) {
                    const t = n.currentTarget;
                    if (!(t instanceof HTMLElement)) return;
                    const e = v(t);
                    if (!(e instanceof u)) return;
                    const {
                        box: r
                    } = l.get(e) || {};
                    if (!r) return;
                    const a = n.target;
                    if (a instanceof HTMLElement)
                        if (a.hasAttribute("data-direction")) {
                            const g = a.getAttribute("data-direction") || "";
                            e.addEventListener("mousemove", d), e.addEventListener("touchmove", d, {
                                passive: !0
                            }), ["nw", "se"].indexOf(g) >= 0 && e.classList.add("nwse"), ["ne", "sw"].indexOf(g) >= 0 && e.classList.add("nesw"), T.set(e, {
                                startX: r.offsetLeft + (["se", "ne"].indexOf(g) >= 0 ? 0 : r.offsetWidth),
                                startY: r.offsetTop + (["se", "sw"].indexOf(g) >= 0 ? 0 : r.offsetHeight)
                            }), d(n)
                        } else e.addEventListener("mousemove", s), e.addEventListener("touchmove", s, {
                            passive: !0
                        })
                }
                i(L, "startUpdate");

                function W(n, t, e, r = !0) {
                    let a = Math.max(Math.abs(t), Math.abs(e), 10);
                    const g = T.get(n);
                    if (!g) return;
                    const {
                        box: S,
                        image: R
                    } = l.get(n) || {};
                    if (!S || !R) return;
                    a = Math.min(a, e > 0 ? R.height - g.startY : g.startY, t > 0 ? R.width - g.startX : g.startX);
                    const N = r ? Math.round(Math.max(0, t > 0 ? g.startX : g.startX - a)) : S.offsetLeft,
                        q = r ? Math.round(Math.max(0, e > 0 ? g.startY : g.startY - a)) : S.offsetTop;
                    S.style.left = `${N}px`, S.style.top = `${q}px`, S.style.width = `${a}px`, S.style.height = `${a}px`, c(n, {
                        x: N,
                        y: q,
                        width: a,
                        height: a
                    })
                }
                i(W, "updateDimensions");

                function h(n) {
                    const {
                        image: t
                    } = l.get(n) || {};
                    if (!t) return;
                    const e = Math.round(t.clientWidth > t.clientHeight ? t.clientHeight : t.clientWidth);
                    T.set(n, {
                        startX: (t.clientWidth - e) / 2,
                        startY: (t.clientHeight - e) / 2
                    }), W(n, e, e)
                }
                i(h, "setInitialPosition");

                function f(n) {
                    const t = n.currentTarget;
                    t instanceof u && (I.delete(t), t.classList.remove("nwse", "nesw"), t.removeEventListener("mousemove", d), t.removeEventListener("mousemove", s), t.removeEventListener("touchmove", d), t.removeEventListener("touchmove", s))
                }
                i(f, "stopUpdate");

                function c(n, t) {
                    const {
                        image: e
                    } = l.get(n) || {};
                    if (!e) return;
                    const r = e.naturalWidth / e.width;
                    for (const a in t) {
                        const g = Math.round(t[a] * r);
                        t[a] = g;
                        const S = n.querySelector(`[data-image-crop-input='${a}']`);
                        S instanceof HTMLInputElement && (S.value = g.toString())
                    }
                    n.dispatchEvent(new CustomEvent("image-crop-change", {
                        bubbles: !0,
                        detail: t
                    }))
                }
                i(c, "fireChangeEvent");
                class u extends HTMLElement {
                    connectedCallback() {
                        if (l.has(this)) return;
                        const t = this.attachShadow({
                            mode: "open"
                        });
                        t.innerHTML = `
<style>
  :host { touch-action: none; display: block; }
  :host(.nesw) { cursor: nesw-resize; }
  :host(.nwse) { cursor: nwse-resize; }
  :host(.nesw) .crop-box, :host(.nwse) .crop-box { cursor: inherit; }
  :host([loaded]) .crop-image { display: block; }
  :host([loaded]) ::slotted([data-loading-slot]), .crop-image { display: none; }

  .crop-wrapper {
    position: relative;
    font-size: 0;
  }
  .crop-container {
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    position: absolute;
    overflow: hidden;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100%;
  }

  :host([rounded]) .crop-box {
    border-radius: 50%;
    box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
  }
  .crop-box {
    position: absolute;
    border: 1px dashed #fff;
    box-sizing: border-box;
    cursor: move;
  }

  :host([rounded]) .crop-outline {
    outline: none;
  }
  .crop-outline {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    outline: 4000px solid rgba(0, 0, 0, .3);
  }

  .handle { position: absolute; }
  :host([rounded]) .handle::before { border-radius: 50%; }
  .handle:before {
    position: absolute;
    display: block;
    padding: 4px;
    transform: translate(-50%, -50%);
    content: ' ';
    background: #fff;
    border: 1px solid #767676;
  }
  .ne { top: 0; right: 0; cursor: nesw-resize; }
  .nw { top: 0; left: 0; cursor: nwse-resize; }
  .se { bottom: 0; right: 0; cursor: nwse-resize; }
  .sw { bottom: 0; left: 0; cursor: nesw-resize; }
</style>
<slot></slot>
<div class="crop-wrapper">
  <img width="100%" class="crop-image" alt="">
  <div class="crop-container">
    <div data-crop-box class="crop-box">
      <div class="crop-outline"></div>
      <div data-direction="nw" class="handle nw"></div>
      <div data-direction="ne" class="handle ne"></div>
      <div data-direction="sw" class="handle sw"></div>
      <div data-direction="se" class="handle se"></div>
    </div>
  </div>
</div>
`;
                        const e = t.querySelector("[data-crop-box]");
                        if (!(e instanceof HTMLElement)) return;
                        const r = t.querySelector("img");
                        r instanceof HTMLImageElement && (l.set(this, {
                            box: e,
                            image: r
                        }), r.addEventListener("load", () => {
                            this.loaded = !0, h(this)
                        }), this.addEventListener("mouseleave", f), this.addEventListener("touchend", f), this.addEventListener("mouseup", f), e.addEventListener("mousedown", L), e.addEventListener("touchstart", L, {
                            passive: !0
                        }), this.addEventListener("keydown", s), this.addEventListener("keydown", d), this.src && (r.src = this.src))
                    }
                    static get observedAttributes() {
                        return ["src"]
                    }
                    get src() {
                        return this.getAttribute("src")
                    }
                    set src(t) {
                        t ? this.setAttribute("src", t) : this.removeAttribute("src")
                    }
                    get loaded() {
                        return this.hasAttribute("loaded")
                    }
                    set loaded(t) {
                        t ? this.setAttribute("loaded", "") : this.removeAttribute("loaded")
                    }
                    attributeChangedCallback(t, e, r) {
                        const {
                            image: a
                        } = l.get(this) || {};
                        t === "src" && (this.loaded = !1, a && (a.src = r))
                    }
                }
                i(u, "ImageCropElement");
                const y = null;
                window.customElements.get("image-crop") || (window.ImageCropElement = u, window.customElements.define("image-crop", u));
                class B extends HTMLElement {
                    get preload() {
                        return this.hasAttribute("preload")
                    }
                    set preload(t) {
                        t ? this.setAttribute("preload", "") : this.removeAttribute("preload")
                    }
                    get src() {
                        return this.getAttribute("src") || ""
                    }
                    set src(t) {
                        this.setAttribute("src", t)
                    }
                    connectedCallback() {
                        this.hasAttribute("role") || this.setAttribute("role", "menu");
                        const t = this.parentElement;
                        if (!t) return;
                        const e = t.querySelector("summary");
                        e && (e.setAttribute("aria-haspopup", "menu"), e.hasAttribute("role") || e.setAttribute("role", "button"));
                        const r = [ot(t, "compositionstart", a => $(this, a)), ot(t, "compositionend", a => $(this, a)), ot(t, "click", a => dt(t, a)), ot(t, "change", a => dt(t, a)), ot(t, "keydown", a => o(t, this, a)), ot(t, "toggle", () => pt(t, this), {
                            once: !0
                        }), ot(t, "toggle", () => yt(t)), this.preload ? ot(t, "mouseover", () => pt(t, this), {
                            once: !0
                        }) : ut, ...vt(t)];
                        F.set(this, {
                            subscriptions: r,
                            loaded: !1,
                            isComposing: !1
                        })
                    }
                    disconnectedCallback() {
                        const t = F.get(this);
                        if (!!t) {
                            F.delete(this);
                            for (const e of t.subscriptions) e.unsubscribe()
                        }
                    }
                }
                i(B, "DetailsMenuElement");
                const F = new WeakMap,
                    ut = {
                        unsubscribe() {}
                    };

                function ot(n, t, e, r = !1) {
                    return n.addEventListener(t, e, r), {
                        unsubscribe: () => {
                            n.removeEventListener(t, e, r)
                        }
                    }
                }
                i(ot, "fromEvent");

                function pt(n, t) {
                    const e = t.getAttribute("src");
                    if (!e) return;
                    const r = F.get(t);
                    if (!r || r.loaded) return;
                    r.loaded = !0;
                    const a = t.querySelector("include-fragment");
                    a && !a.hasAttribute("src") && (a.addEventListener("loadend", () => b(n)), a.setAttribute("src", e))
                }
                i(pt, "loadFragment");

                function vt(n) {
                    let t = !1;
                    const e = i(() => t = !0, "onmousedown"),
                        r = i(() => t = !1, "onkeydown"),
                        a = i(() => {
                            !n.hasAttribute("open") || b(n) || t || p(n)
                        }, "ontoggle");
                    return [ot(n, "mousedown", e), ot(n, "keydown", r), ot(n, "toggle", a)]
                }
                i(vt, "focusOnOpen");

                function yt(n) {
                    if (!!n.hasAttribute("open"))
                        for (const t of document.querySelectorAll("details[open] > details-menu")) {
                            const e = t.closest("details");
                            e && e !== n && !e.contains(n) && e.removeAttribute("open")
                        }
                }
                i(yt, "closeCurrentMenu");

                function b(n) {
                    if (!n.hasAttribute("open")) return !1;
                    const t = n.querySelector("details-menu [autofocus]");
                    return t ? (t.focus(), !0) : !1
                }
                i(b, "autofocus");

                function p(n) {
                    const t = document.activeElement;
                    if (t && m(t) && n.contains(t)) return;
                    const e = A(n, !0);
                    e && e.focus()
                }
                i(p, "focusFirstItem");

                function A(n, t) {
                    const e = Array.from(n.querySelectorAll('[role^="menuitem"]:not([hidden]):not([disabled]):not([aria-disabled="true"])')),
                        r = document.activeElement,
                        a = r instanceof HTMLElement ? e.indexOf(r) : -1,
                        g = t ? e[a + 1] : e[a - 1],
                        S = t ? e[0] : e[e.length - 1];
                    return g || S
                }
                i(A, "sibling");
                const P = navigator.userAgent.match(/Macintosh/);

                function dt(n, t) {
                    const e = t.target;
                    if (e instanceof Element && e.closest("details") === n) {
                        if (t.type === "click") {
                            const r = e.closest('[role="menuitem"], [role="menuitemradio"]');
                            if (!r) return;
                            const a = r.querySelector("input");
                            if (r.tagName === "LABEL" && e === a) return;
                            r.tagName === "LABEL" && a && !a.checked || bt(r, n)
                        } else if (t.type === "change") {
                            const r = e.closest('[role="menuitemradio"], [role="menuitemcheckbox"]');
                            r && bt(r, n)
                        }
                    }
                }
                i(dt, "shouldCommit");

                function ft(n, t) {
                    for (const e of t.querySelectorAll('[role="menuitemradio"], [role="menuitemcheckbox"]')) {
                        const r = e.querySelector('input[type="radio"], input[type="checkbox"]');
                        let a = (e === n).toString();
                        r instanceof HTMLInputElement && (a = r.indeterminate ? "mixed" : r.checked.toString()), e.setAttribute("aria-checked", a)
                    }
                }
                i(ft, "updateChecked");

                function bt(n, t) {
                    if (n.hasAttribute("disabled") || n.getAttribute("aria-disabled") === "true") return;
                    const e = n.closest("details-menu");
                    !e || !e.dispatchEvent(new CustomEvent("details-menu-select", {
                        cancelable: !0,
                        detail: {
                            relatedTarget: n
                        }
                    })) || (k(n, t), ft(n, t), n.getAttribute("role") !== "menuitemcheckbox" && E(t), e.dispatchEvent(new CustomEvent("details-menu-selected", {
                        detail: {
                            relatedTarget: n
                        }
                    })))
                }
                i(bt, "commit");

                function o(n, t, e) {
                    if (!(e instanceof KeyboardEvent) || n.querySelector("details[open]")) return;
                    const r = F.get(t);
                    if (!r || r.isComposing) return;
                    const a = e.target instanceof Element && e.target.tagName === "SUMMARY";
                    switch (e.key) {
                        case "Escape":
                            n.hasAttribute("open") && (E(n), e.preventDefault(), e.stopPropagation());
                            break;
                        case "ArrowDown":
                            {
                                a && !n.hasAttribute("open") && n.setAttribute("open", "");
                                const g = A(n, !0);g && g.focus(),
                                e.preventDefault()
                            }
                            break;
                        case "ArrowUp":
                            {
                                a && !n.hasAttribute("open") && n.setAttribute("open", "");
                                const g = A(n, !1);g && g.focus(),
                                e.preventDefault()
                            }
                            break;
                        case "n":
                            if (P && e.ctrlKey) {
                                const g = A(n, !0);
                                g && g.focus(), e.preventDefault()
                            }
                            break;
                        case "p":
                            if (P && e.ctrlKey) {
                                const g = A(n, !1);
                                g && g.focus(), e.preventDefault()
                            }
                            break;
                        case " ":
                        case "Enter":
                            {
                                const g = document.activeElement;g instanceof HTMLElement && m(g) && g.closest("details") === n && (e.preventDefault(), e.stopPropagation(), g.click())
                            }
                            break
                    }
                }
                i(o, "keydown");

                function m(n) {
                    const t = n.getAttribute("role");
                    return t === "menuitem" || t === "menuitemcheckbox" || t === "menuitemradio"
                }
                i(m, "isMenuItem");

                function E(n) {
                    if (!n.hasAttribute("open")) return;
                    n.removeAttribute("open");
                    const e = n.querySelector("summary");
                    e && e.focus()
                }
                i(E, "dist_close");

                function k(n, t) {
                    const e = t.querySelector("[data-menu-button]");
                    if (!e) return;
                    const r = C(n);
                    if (r) e.textContent = r;
                    else {
                        const a = O(n);
                        a && (e.innerHTML = a)
                    }
                }
                i(k, "updateLabel");

                function C(n) {
                    if (!n) return null;
                    const t = n.hasAttribute("data-menu-button-text") ? n : n.querySelector("[data-menu-button-text]");
                    return t ? t.getAttribute("data-menu-button-text") || t.textContent : null
                }
                i(C, "labelText");

                function O(n) {
                    if (!n) return null;
                    const t = n.hasAttribute("data-menu-button-contents") ? n : n.querySelector("[data-menu-button-contents]");
                    return t ? t.innerHTML : null
                }
                i(O, "labelHTML");

                function $(n, t) {
                    const e = F.get(n);
                    !e || (e.isComposing = t.type === "compositionstart")
                }
                i($, "trackComposition");
                const Y = null;
                window.customElements.get("details-menu") || (window.DetailsMenuElement = B, window.customElements.define("details-menu", B));
                const tt = {
                    "outside-top": ["outside-bottom", "outside-right", "outside-left", "outside-bottom"],
                    "outside-bottom": ["outside-top", "outside-right", "outside-left", "outside-bottom"],
                    "outside-left": ["outside-right", "outside-bottom", "outside-top", "outside-bottom"],
                    "outside-right": ["outside-left", "outside-bottom", "outside-top", "outside-bottom"]
                };

                function ht(n, t, e = {}) {
                    const r = et(n),
                        a = mt(r),
                        g = getComputedStyle(r),
                        S = r.getBoundingClientRect(),
                        [R, N] = [g.borderTopWidth, g.borderLeftWidth].map(rt => parseInt(rt, 10) || 0),
                        q = {
                            top: S.top + R,
                            left: S.left + N
                        };
                    return nt(a, q, n.getBoundingClientRect(), t instanceof Element ? t.getBoundingClientRect() : t, wt(e))
                }
                i(ht, "getAnchoredPosition");

                function et(n) {
                    let t = n.parentNode;
                    for (; t !== null;) {
                        if (t instanceof HTMLElement && getComputedStyle(t).position !== "static") return t;
                        t = t.parentNode
                    }
                    return document.body
                }
                i(et, "getPositionedParent");

                function mt(n) {
                    let t = n;
                    for (; t !== null && !(t === document.body || getComputedStyle(t).overflow !== "visible");) t = t.parentNode;
                    const e = t === document.body || !(t instanceof HTMLElement) ? document.body : t,
                        r = e.getBoundingClientRect(),
                        a = getComputedStyle(e),
                        [g, S, R, N] = [a.borderTopWidth, a.borderLeftWidth, a.borderRightWidth, a.borderBottomWidth].map(q => parseInt(q, 10) || 0);
                    return {
                        top: r.top + g,
                        left: r.left + S,
                        width: r.width - R - S,
                        height: Math.max(r.height - g - N, e === document.body ? window.innerHeight : -1 / 0)
                    }
                }
                i(mt, "getClippingRect");
                const lt = {
                    side: "outside-bottom",
                    align: "start",
                    anchorOffset: 4,
                    alignmentOffset: 4,
                    allowOutOfBounds: !1
                };

                function wt(n = {}) {
                    var t, e, r, a, g;
                    const S = (t = n.side) !== null && t !== void 0 ? t : lt.side,
                        R = (e = n.align) !== null && e !== void 0 ? e : lt.align;
                    return {
                        side: S,
                        align: R,
                        anchorOffset: (r = n.anchorOffset) !== null && r !== void 0 ? r : S === "inside-center" ? 0 : lt.anchorOffset,
                        alignmentOffset: (a = n.alignmentOffset) !== null && a !== void 0 ? a : R !== "center" && S.startsWith("inside") ? lt.alignmentOffset : 0,
                        allowOutOfBounds: (g = n.allowOutOfBounds) !== null && g !== void 0 ? g : lt.allowOutOfBounds
                    }
                }
                i(wt, "getDefaultSettings");

                function nt(n, t, e, r, {
                    side: a,
                    align: g,
                    allowOutOfBounds: S,
                    anchorOffset: R,
                    alignmentOffset: N
                }) {
                    const q = {
                        top: n.top - t.top,
                        left: n.left - t.left,
                        width: n.width,
                        height: n.height
                    };
                    let rt = V(e, r, a, g, R, N),
                        Ct = a;
                    if (rt.top -= t.top, rt.left -= t.left, !S) {
                        const kt = tt[a];
                        let At = 0;
                        if (kt) {
                            let It = a;
                            for (; At < kt.length && st(It, rt, q, e);) {
                                const Tt = kt[At++];
                                It = Tt, rt = V(e, r, Tt, g, R, N), rt.top -= t.top, rt.left -= t.left, Ct = Tt
                            }
                        }
                        rt.top < q.top && (rt.top = q.top), rt.left < q.left && (rt.left = q.left), rt.left + e.width > n.width + q.left && (rt.left = n.width + q.left - e.width), kt && At < kt.length && rt.top + e.height > n.height + q.top && (rt.top = n.height + q.top - e.height)
                    }
                    return Object.assign(Object.assign({}, rt), {
                        anchorSide: Ct
                    })
                }
                i(nt, "pureCalculateAnchoredPosition");

                function V(n, t, e, r, a, g) {
                    const S = t.left + t.width,
                        R = t.top + t.height;
                    let N = -1,
                        q = -1;
                    return e === "outside-top" ? N = t.top - a - n.height : e === "outside-bottom" ? N = R + a : e === "outside-left" ? q = t.left - a - n.width : e === "outside-right" && (q = S + a), (e === "outside-top" || e === "outside-bottom") && (r === "start" ? q = t.left + g : r === "center" ? q = t.left - (n.width - t.width) / 2 + g : q = S - n.width - g), (e === "outside-left" || e === "outside-right") && (r === "start" ? N = t.top + g : r === "center" ? N = t.top - (n.height - t.height) / 2 + g : N = R - n.height - g), e === "inside-top" ? N = t.top + a : e === "inside-bottom" ? N = R - a - n.height : e === "inside-left" ? q = t.left + a : e === "inside-right" ? q = S - a - n.width : e === "inside-center" && (q = (S + t.left) / 2 - n.width / 2 + a), e === "inside-top" || e === "inside-bottom" ? r === "start" ? q = t.left + g : r === "center" ? q = t.left - (n.width - t.width) / 2 + g : q = S - n.width - g : (e === "inside-left" || e === "inside-right" || e === "inside-center") && (r === "start" ? N = t.top + g : r === "center" ? N = t.top - (n.height - t.height) / 2 + g : N = R - n.height - g), {
                        top: N,
                        left: q
                    }
                }
                i(V, "calculatePosition");

                function st(n, t, e, r) {
                    return n === "outside-top" || n === "outside-bottom" ? t.top < e.top || t.top + r.height > e.height + e.top : t.left < e.left || t.left + r.width > e.width + e.left
                }
                i(st, "shouldRecalculatePosition");
                var H = function(n, t, e, r, a) {
                        if (r === "m") throw new TypeError("Private method is not writable");
                        if (r === "a" && !a) throw new TypeError("Private accessor was defined without a setter");
                        if (typeof t == "function" ? n !== t || !a : !t.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                        return r === "a" ? a.call(n, e) : a ? a.value = e : t.set(n, e), e
                    },
                    it = function(n, t, e, r) {
                        if (e === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
                        if (typeof t == "function" ? n !== t || !r : !t.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                        return e === "m" ? r : e === "a" ? r.call(n) : r ? r.value : t.get(n)
                    },
                    Et, Z, J, at, gt, St, _t;
                const xt = "tooltip-open",
                    Mt = ["tooltip-n", "tooltip-s", "tooltip-e", "tooltip-w", "tooltip-ne", "tooltip-se", "tooltip-nw", "tooltip-sw"];
                class Lt extends HTMLElement {
                    constructor() {
                        super();
                        Et.add(this), Z.set(this, void 0), J.set(this, "center"), at.set(this, "outside-bottom"), gt.set(this, !1);
                        const t = this.attachShadow({
                            mode: "open"
                        });
                        t.innerHTML = `
      <style>
        ${this.styles()}
      </style>
      <slot></slot>
    `
                    }
                    styles() {
                        return `
      :host {
        position: absolute;
        z-index: 1000000;
        padding: .5em .75em;
        font: normal normal 11px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        -webkit-font-smoothing: subpixel-antialiased;
        color: var(--color-fg-on-emphasis);
        text-align: center;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: break-word;
        white-space: pre;
        background: var(--color-neutral-emphasis-plus);
        border-radius: 6px;
        opacity: 0;
        max-width: 250px;
        word-wrap: break-word;
        white-space: normal
      }
      
      :host:before{
        position: absolute;
        z-index: 1000001;
        color: var(--color-neutral-emphasis-plus);
        content: "";
        border: 6px solid transparent;
        opacity: 0
      }
      
      @keyframes tooltip-appear {
        from {
          opacity: 0
        }
        to {
          opacity: 1
        }
      }
      
      :host:after{
        position: absolute;
        display: block;
        right: 0;
        left: 0;
        height: 12px;
        content: ""
      }
      
      :host(.${xt}),
      :host(.${xt}):before {
        animation-name: tooltip-appear;
        animation-duration: .1s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
        animation-delay: .4s
      }
      
      :host(.tooltip-s):before,
      :host(.tooltip-se):before,
      :host(.tooltip-sw):before {
        right: 50%;
        bottom: 100%;
        margin-right: -6px;
        border-bottom-color: var(--color-neutral-emphasis-plus)
      }
      
      :host(.tooltip-s):after,
      :host(.tooltip-se):after,
      :host(.tooltip-sw):after {
        bottom: 100%
      }
      
      :host(.tooltip-n):before,
      :host(.tooltip-ne):before,
      :host(.tooltip-nw):before {
        top: 100%;
        right: 50%;
        margin-right: -6px;
        border-top-color: var(--color-neutral-emphasis-plus)
      }
      
      :host(.tooltip-n):after,
      :host(.tooltip-ne):after,
      :host(.tooltip-nw):after {
        top: 100%
      }
      
      :host(.tooltip-se):before,
      :host(.tooltip-ne):before {
        right: auto
      }
      
      :host(.tooltip-sw):before,
      :host(.tooltip-nw):before {
        right: 0;
        margin-right: 6px
      }
      
      :host(.tooltip-w):before {
        top: 50%;
        bottom: 50%;
        left: 100%;
        margin-top: -6px;
        border-left-color: var(--color-neutral-emphasis-plus)
      }
      
      :host(.tooltip-e):before {
        top: 50%;
        right: 100%;
        bottom: 50%;
        margin-top: -6px;
        border-right-color: var(--color-neutral-emphasis-plus)
      }
    `
                    }
                    get htmlFor() {
                        return this.getAttribute("for") || ""
                    }
                    set htmlFor(t) {
                        this.setAttribute("for", t)
                    }
                    get type() {
                        return this.getAttribute("data-type") === "label" ? "label" : "description"
                    }
                    set type(t) {
                        this.setAttribute("data-type", t)
                    }
                    get direction() {
                        return this.getAttribute("data-direction") || "s"
                    }
                    set direction(t) {
                        this.setAttribute("data-direction", t)
                    }
                    get control() {
                        return this.ownerDocument.getElementById(this.htmlFor)
                    }
                    connectedCallback() {
                        var t;
                        if (this.hidden = !0, H(this, gt, !0, "f"), this.id || (this.id = `tooltip-${Date.now()}-${(Math.random()*1e4).toFixed(0)}`), !this.control) return;
                        this.setAttribute("role", "tooltip"), (t = it(this, Z, "f")) === null || t === void 0 || t.abort(), H(this, Z, new AbortController, "f");
                        const {
                            signal: e
                        } = it(this, Z, "f");
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
                    disconnectedCallback() {
                        var t;
                        (t = it(this, Z, "f")) === null || t === void 0 || t.abort()
                    }
                    handleEvent(t) {
                        !this.control || ((t.type === "mouseenter" || t.type === "focus") && this.hidden ? this.hidden = !1 : t.type === "blur" ? this.hidden = !0 : t.type === "mouseleave" && t.relatedTarget !== this.control && t.relatedTarget !== this ? this.hidden = !0 : t.type === "keydown" && t.key === "Escape" && !this.hidden && (this.hidden = !0))
                    }
                    attributeChangedCallback(t) {
                        if (t === "id" || t === "data-type") {
                            if (!this.id || !this.control) return;
                            if (this.type === "label") this.control.setAttribute("aria-labelledby", this.id);
                            else {
                                let e = this.control.getAttribute("aria-describedby");
                                e ? e = `${e} ${this.id}` : e = this.id, this.control.setAttribute("aria-describedby", e)
                            }
                        } else if (t === "hidden")
                            if (this.hidden) this.classList.remove(xt, ...Mt);
                            else {
                                this.classList.add(xt);
                                for (const e of this.ownerDocument.querySelectorAll(this.tagName)) e !== this && (e.hidden = !0);
                                it(this, Et, "m", _t).call(this)
                            }
                        else if (t === "data-direction") {
                            this.classList.remove(...Mt);
                            const e = this.direction;
                            e === "n" ? (H(this, J, "center", "f"), H(this, at, "outside-top", "f")) : e === "ne" ? (H(this, J, "start", "f"), H(this, at, "outside-top", "f")) : e === "e" ? (H(this, J, "center", "f"), H(this, at, "outside-right", "f")) : e === "se" ? (H(this, J, "start", "f"), H(this, at, "outside-bottom", "f")) : e === "s" ? (H(this, J, "center", "f"), H(this, at, "outside-bottom", "f")) : e === "sw" ? (H(this, J, "end", "f"), H(this, at, "outside-bottom", "f")) : e === "w" ? (H(this, J, "center", "f"), H(this, at, "outside-left", "f")) : e === "nw" && (H(this, J, "end", "f"), H(this, at, "outside-top", "f"))
                        }
                    }
                }
                i(Lt, "TooltipElement"), Z = new WeakMap, J = new WeakMap, at = new WeakMap, gt = new WeakMap, Et = new WeakSet, St = i(function(t) {
                    if (!this.control) return;
                    const e = this.getBoundingClientRect(),
                        r = this.control.getBoundingClientRect(),
                        a = e.width,
                        g = e.left + a / 2,
                        S = r.x + r.width / 2;
                    return Math.abs(g - S) < 2 || t === "outside-left" || t === "outside-right" ? "center" : e.left === r.left ? "start" : e.right === r.right ? "end" : g < S ? e.left === 0 ? "start" : "end" : e.right === 0 ? "end" : "start"
                }, "_TooltipElement_adjustedAnchorAlignment"), _t = i(function() {
                    if (!this.control || !it(this, gt, "f") || this.hidden) return;
                    const t = 10;
                    this.style.left = "0px";
                    let e = ht(this, this.control, {
                            side: it(this, at, "f"),
                            align: it(this, J, "f"),
                            anchorOffset: t
                        }),
                        r = e.anchorSide;
                    this.style.top = `${e.top}px`, this.style.left = `${e.left}px`;
                    let a = "s";
                    const g = it(this, Et, "m", St).call(this, r);
                    !g || (this.style.left = "0px", e = ht(this, this.control, {
                        side: r,
                        align: g,
                        anchorOffset: t
                    }), r = e.anchorSide, this.style.top = `${e.top}px`, this.style.left = `${e.left}px`, r === "outside-left" ? a = "w" : r === "outside-right" ? a = "e" : r === "outside-top" ? g === "center" ? a = "n" : g === "start" ? a = "ne" : a = "nw" : g === "center" ? a = "s" : g === "start" ? a = "se" : a = "sw", this.classList.add(`tooltip-${a}`))
                }, "_TooltipElement_updatePosition"), Lt.observedAttributes = ["data-type", "data-direction", "id", "hidden"], window.customElements.get("tool-tip") || (window.TooltipElement = Lt, window.customElements.define("tool-tip", Lt))
            },
            38257: () => {
                function ct(_, w = 0, {
                    start: T = !0,
                    middle: I = !0,
                    once: l = !1
                } = {}) {
                    var s = 0,
                        d, v = !1,
                        L = i(function W(...h) {
                            if (!v) {
                                var f = Date.now() - s;
                                s = Date.now(), T ? (T = !1, _(...h), l && W.cancel()) : (I && f < w || !I) && (clearTimeout(d), d = setTimeout(function() {
                                    s = Date.now(), _(...h), l && W.cancel()
                                }, I ? w - f : w))
                            }
                        }, "fn");
                    return L.cancel = function() {
                        clearTimeout(d), v = !0
                    }, L
                }
                i(ct, "throttle");

                function Q(_, w = 0, {
                    start: T = !1,
                    middle: I = !1,
                    once: l = !1
                } = {}) {
                    return ct(_, w, {
                        start: T,
                        middle: I,
                        once: l
                    })
                }
                i(Q, "debounce");
                const z = new WeakMap;
                class M extends HTMLElement {
                    connectedCallback() {
                        const w = this.input;
                        if (!w) return;
                        const T = Q(U.bind(null, this), 300),
                            I = {
                                check: T,
                                controller: null
                            };
                        z.set(this, I), w.addEventListener("input", x), w.addEventListener("input", T), w.autocomplete = "off", w.spellcheck = !1
                    }
                    disconnectedCallback() {
                        const w = this.input;
                        if (!w) return;
                        const T = z.get(this);
                        !T || (z.delete(this), w.removeEventListener("input", x), w.removeEventListener("input", T.check), w.setCustomValidity(""))
                    }
                    attributeChangedCallback(w) {
                        if (w === "required") {
                            const T = this.input;
                            if (!T) return;
                            T.required = this.required
                        }
                    }
                    static get observedAttributes() {
                        return ["required"]
                    }
                    get input() {
                        return this.querySelector("input")
                    }
                    get src() {
                        const w = this.getAttribute("src");
                        if (!w) return "";
                        const T = this.ownerDocument.createElement("a");
                        return T.href = w, T.href
                    }
                    set src(w) {
                        this.setAttribute("src", w)
                    }
                    get csrf() {
                        const w = this.querySelector("[data-csrf]");
                        return this.getAttribute("csrf") || w instanceof HTMLInputElement && w.value || ""
                    }
                    set csrf(w) {
                        this.setAttribute("csrf", w)
                    }
                    get required() {
                        return this.hasAttribute("required")
                    }
                    set required(w) {
                        w ? this.setAttribute("required", "") : this.removeAttribute("required")
                    }
                }
                i(M, "AutoCheckElement");

                function x(_) {
                    const w = _.currentTarget;
                    if (!(w instanceof HTMLInputElement)) return;
                    const T = w.closest("auto-check");
                    if (!(T instanceof M)) return;
                    const I = T.src,
                        l = T.csrf,
                        s = z.get(T);
                    if (!I || !l || !s) return;
                    let d = "Verifying\u2026";
                    const v = i(L => d = L, "setValidity");
                    w.dispatchEvent(new CustomEvent("auto-check-start", {
                        bubbles: !0,
                        detail: {
                            setValidity: v
                        }
                    })), T.required && w.setCustomValidity(d)
                }
                i(x, "setLoadingState");

                function j() {
                    return "AbortController" in window ? new AbortController : {
                        signal: null,
                        abort() {}
                    }
                }
                i(j, "makeAbortController");
                async function D(_, w, T) {
                    try {
                        const I = await fetch(w, T);
                        return _.dispatchEvent(new CustomEvent("load")), _.dispatchEvent(new CustomEvent("loadend")), I
                    } catch (I) {
                        throw I.name !== "AbortError" && (_.dispatchEvent(new CustomEvent("error")), _.dispatchEvent(new CustomEvent("loadend"))), I
                    }
                }
                i(D, "fetchWithNetworkEvents");
                async function U(_) {
                    const w = _.input;
                    if (!w) return;
                    const T = _.src,
                        I = _.csrf,
                        l = z.get(_);
                    if (!T || !I || !l) {
                        _.required && w.setCustomValidity("");
                        return
                    }
                    if (!w.value.trim()) {
                        _.required && w.setCustomValidity("");
                        return
                    }
                    const s = new FormData;
                    s.append("authenticity_token", I), s.append("value", w.value), w.dispatchEvent(new CustomEvent("auto-check-send", {
                        bubbles: !0,
                        detail: {
                            body: s
                        }
                    })), l.controller ? l.controller.abort() : _.dispatchEvent(new CustomEvent("loadstart")), l.controller = j();
                    try {
                        const d = await D(_, T, {
                            credentials: "same-origin",
                            signal: l.controller.signal,
                            method: "POST",
                            body: s
                        });
                        d.ok ? K(d, w, _.required) : X(d, w, _.required), l.controller = null, w.dispatchEvent(new CustomEvent("auto-check-complete", {
                            bubbles: !0
                        }))
                    } catch (d) {
                        d.name !== "AbortError" && (l.controller = null, w.dispatchEvent(new CustomEvent("auto-check-complete", {
                            bubbles: !0
                        })))
                    }
                }
                i(U, "check");

                function K(_, w, T) {
                    T && w.setCustomValidity(""), w.dispatchEvent(new CustomEvent("auto-check-success", {
                        bubbles: !0,
                        detail: {
                            response: _.clone()
                        }
                    }))
                }
                i(K, "processSuccess");

                function X(_, w, T) {
                    let I = "Validation failed";
                    const l = i(s => I = s, "setValidity");
                    w.dispatchEvent(new CustomEvent("auto-check-error", {
                        bubbles: !0,
                        detail: {
                            response: _.clone(),
                            setValidity: l
                        }
                    })), T && w.setCustomValidity(I)
                }
                i(X, "processFailure"), window.customElements.get("auto-check") || (window.AutoCheckElement = M, window.customElements.define("auto-check", M));
                var G = null
            },
            14840: (ct, Q, z) => {
                z.d(Q, {
                    Z: () => W
                });
                const M = "data-close-dialog",
                    x = `[${M}]`;

                function j(h) {
                    let f = Array.from(h.querySelectorAll("[autofocus]")).filter(U)[0];
                    f || (f = h, h.setAttribute("tabindex", "-1")), f.focus()
                }
                i(j, "autofocus");

                function D(h) {
                    const f = h.currentTarget;
                    f instanceof Element && (h.key === "Escape" || h.key === "Esc" ? (I(f, !1), h.stopPropagation()) : h.key === "Tab" && X(h))
                }
                i(D, "keydown");

                function U(h) {
                    return h.tabIndex >= 0 && !h.disabled && K(h)
                }
                i(U, "focusable");

                function K(h) {
                    return !h.hidden && (!h.type || h.type !== "hidden") && (h.offsetWidth > 0 || h.offsetHeight > 0)
                }
                i(K, "visible");

                function X(h) {
                    if (!(h.currentTarget instanceof Element)) return;
                    const f = h.currentTarget.querySelector("details-dialog");
                    if (!f) return;
                    h.preventDefault();
                    const c = Array.from(f.querySelectorAll("*")).filter(U);
                    if (c.length === 0) return;
                    const u = h.shiftKey ? -1 : 1,
                        y = f.getRootNode(),
                        B = f.contains(y.activeElement) ? y.activeElement : null;
                    let F = u === -1 ? -1 : 0;
                    if (B instanceof HTMLElement) {
                        const ut = c.indexOf(B);
                        ut !== -1 && (F = ut + u)
                    }
                    F < 0 ? F = c.length - 1 : F = F % c.length, c[F].focus()
                }
                i(X, "restrictTabBehavior");

                function G(h) {
                    const f = h.querySelector("details-dialog");
                    return f instanceof L ? f.dispatchEvent(new CustomEvent("details-dialog-close", {
                        bubbles: !0,
                        cancelable: !0
                    })) : !0
                }
                i(G, "allowClosingDialog");

                function _(h) {
                    if (!(h.currentTarget instanceof Element)) return;
                    const f = h.currentTarget.closest("details");
                    !f || !f.hasAttribute("open") || G(f) || (h.preventDefault(), h.stopPropagation())
                }
                i(_, "onSummaryClick");

                function w(h) {
                    const f = h.currentTarget;
                    if (!(f instanceof Element)) return;
                    const c = f.querySelector("details-dialog");
                    if (c instanceof L)
                        if (f.hasAttribute("open")) {
                            const u = "getRootNode" in c ? c.getRootNode() : document;
                            u.activeElement instanceof HTMLElement && v.set(c, {
                                details: f,
                                activeElement: u.activeElement
                            }), j(c), f.addEventListener("keydown", D)
                        } else {
                            for (const y of c.querySelectorAll("form")) y.reset();
                            const u = T(f, c);
                            u && u.focus(), f.removeEventListener("keydown", D)
                        }
                }
                i(w, "toggle");

                function T(h, f) {
                    const c = v.get(f);
                    return c && c.activeElement instanceof HTMLElement ? c.activeElement : h.querySelector("summary")
                }
                i(T, "findFocusElement");

                function I(h, f) {
                    f !== h.hasAttribute("open") && (f ? h.setAttribute("open", "") : G(h) && h.removeAttribute("open"))
                }
                i(I, "toggleDetails");

                function l(h) {
                    const f = h.currentTarget;
                    if (!(f instanceof Element)) return;
                    const c = f.querySelector("details-dialog");
                    if (!(c instanceof L)) return;
                    const u = c.querySelector("include-fragment:not([src])");
                    if (!u) return;
                    const y = c.src;
                    y !== null && (u.addEventListener("loadend", () => {
                        f.hasAttribute("open") && j(c)
                    }), u.setAttribute("src", y), d(f))
                }
                i(l, "loadIncludeFragment");

                function s(h, f, c) {
                    d(h), f && h.addEventListener("toggle", l, {
                        once: !0
                    }), f && c && h.addEventListener("mouseover", l, {
                        once: !0
                    })
                }
                i(s, "updateIncludeFragmentEventListeners");

                function d(h) {
                    h.removeEventListener("toggle", l), h.removeEventListener("mouseover", l)
                }
                i(d, "removeIncludeFragmentEventListeners");
                const v = new WeakMap;
                class L extends HTMLElement {
                    static get CLOSE_ATTR() {
                        return M
                    }
                    static get CLOSE_SELECTOR() {
                        return x
                    }
                    constructor() {
                        super();
                        v.set(this, {
                            details: null,
                            activeElement: null
                        }), this.addEventListener("click", function({
                            target: f
                        }) {
                            if (!(f instanceof Element)) return;
                            const c = f.closest("details");
                            c && f.closest(x) && I(c, !1)
                        })
                    }
                    get src() {
                        return this.getAttribute("src")
                    }
                    set src(f) {
                        this.setAttribute("src", f || "")
                    }
                    get preload() {
                        return this.hasAttribute("preload")
                    }
                    set preload(f) {
                        f ? this.setAttribute("preload", "") : this.removeAttribute("preload")
                    }
                    connectedCallback() {
                        this.setAttribute("role", "dialog"), this.setAttribute("aria-modal", "true");
                        const f = v.get(this);
                        if (!f) return;
                        const c = this.parentElement;
                        if (!c) return;
                        const u = c.querySelector("summary");
                        u && (u.hasAttribute("role") || u.setAttribute("role", "button"), u.addEventListener("click", _, {
                            capture: !0
                        })), c.addEventListener("toggle", w), f.details = c, s(c, this.src, this.preload)
                    }
                    disconnectedCallback() {
                        const f = v.get(this);
                        if (!f) return;
                        const {
                            details: c
                        } = f;
                        if (!c) return;
                        c.removeEventListener("toggle", w), d(c);
                        const u = c.querySelector("summary");
                        u && u.removeEventListener("click", _, {
                            capture: !0
                        }), f.details = null
                    }
                    toggle(f) {
                        const c = v.get(this);
                        if (!c) return;
                        const {
                            details: u
                        } = c;
                        !u || I(u, f)
                    }
                    static get observedAttributes() {
                        return ["src", "preload"]
                    }
                    attributeChangedCallback() {
                        const f = v.get(this);
                        if (!f) return;
                        const {
                            details: c
                        } = f;
                        !c || s(c, this.src, this.preload)
                    }
                }
                i(L, "DetailsDialogElement");
                const W = L;
                window.customElements.get("details-dialog") || (window.DetailsDialogElement = L, window.customElements.define("details-dialog", L))
            },
            73921: () => {
                function ct() {
                    const l = /\bWindows NT 6.1\b/.test(navigator.userAgent),
                        s = /\bWindows NT 6.2\b/.test(navigator.userAgent),
                        d = /\bWindows NT 6.3\b/.test(navigator.userAgent),
                        v = /\bFreeBSD\b/.test(navigator.userAgent),
                        L = /\bLinux\b/.test(navigator.userAgent) && !/\bAndroid\b/.test(navigator.userAgent);
                    return !(l || s || d || L || v)
                }
                i(ct, "isEmojiSupported");
                const Q = new Set(["\u{1F44B}", "\u{1F91A}", "\u{1F590}\uFE0F", "\u270B", "\u{1F596}", "\u{1F44C}", "\u{1F90F}", "\u270C\uFE0F", "\u{1F91E}", "\u{1F91F}", "\u{1F918}", "\u{1F919}", "\u{1F448}", "\u{1F449}", "\u{1F446}", "\u{1F595}", "\u{1F447}", "\u261D\uFE0F", "\u{1F44D}", "\u{1F44E}", "\u270A", "\u{1F44A}", "\u{1F91B}", "\u{1F91C}", "\u{1F44F}", "\u{1F64C}", "\u{1F450}", "\u{1F932}", "\u{1F64F}", "\u270D\uFE0F", "\u{1F485}", "\u{1F933}", "\u{1F4AA}", "\u{1F9B5}", "\u{1F9B6}", "\u{1F442}", "\u{1F9BB}", "\u{1F443}", "\u{1F476}", "\u{1F9D2}", "\u{1F466}", "\u{1F467}", "\u{1F9D1}", "\u{1F471}", "\u{1F468}", "\u{1F9D4}", "\u{1F471}\u200D\u2642\uFE0F", "\u{1F468}\u200D\u{1F9B0}", "\u{1F468}\u200D\u{1F9B1}", "\u{1F468}\u200D\u{1F9B3}", "\u{1F468}\u200D\u{1F9B2}", "\u{1F469}", "\u{1F471}\u200D\u2640\uFE0F", "\u{1F469}\u200D\u{1F9B0}", "\u{1F469}\u200D\u{1F9B1}", "\u{1F469}\u200D\u{1F9B3}", "\u{1F469}\u200D\u{1F9B2}", "\u{1F9D3}", "\u{1F474}", "\u{1F475}", "\u{1F64D}", "\u{1F64D}\u200D\u2642\uFE0F", "\u{1F64D}\u200D\u2640\uFE0F", "\u{1F64E}", "\u{1F64E}\u200D\u2642\uFE0F", "\u{1F64E}\u200D\u2640\uFE0F", "\u{1F645}", "\u{1F645}\u200D\u2642\uFE0F", "\u{1F645}\u200D\u2640\uFE0F", "\u{1F646}", "\u{1F646}\u200D\u2642\uFE0F", "\u{1F646}\u200D\u2640\uFE0F", "\u{1F481}", "\u{1F481}\u200D\u2642\uFE0F", "\u{1F481}\u200D\u2640\uFE0F", "\u{1F64B}", "\u{1F64B}\u200D\u2642\uFE0F", "\u{1F64B}\u200D\u2640\uFE0F", "\u{1F9CF}", "\u{1F9CF}\u200D\u2642\uFE0F", "\u{1F9CF}\u200D\u2640\uFE0F", "\u{1F647}", "\u{1F647}\u200D\u2642\uFE0F", "\u{1F647}\u200D\u2640\uFE0F", "\u{1F926}", "\u{1F926}\u200D\u2642\uFE0F", "\u{1F926}\u200D\u2640\uFE0F", "\u{1F937}", "\u{1F937}\u200D\u2642\uFE0F", "\u{1F937}\u200D\u2640\uFE0F", "\u{1F468}\u200D\u2695\uFE0F", "\u{1F469}\u200D\u2695\uFE0F", "\u{1F468}\u200D\u{1F393}", "\u{1F469}\u200D\u{1F393}", "\u{1F468}\u200D\u{1F3EB}", "\u{1F469}\u200D\u{1F3EB}", "\u{1F468}\u200D\u2696\uFE0F", "\u{1F469}\u200D\u2696\uFE0F", "\u{1F468}\u200D\u{1F33E}", "\u{1F469}\u200D\u{1F33E}", "\u{1F468}\u200D\u{1F373}", "\u{1F469}\u200D\u{1F373}", "\u{1F468}\u200D\u{1F527}", "\u{1F469}\u200D\u{1F527}", "\u{1F468}\u200D\u{1F3ED}", "\u{1F469}\u200D\u{1F3ED}", "\u{1F468}\u200D\u{1F4BC}", "\u{1F469}\u200D\u{1F4BC}", "\u{1F468}\u200D\u{1F52C}", "\u{1F469}\u200D\u{1F52C}", "\u{1F468}\u200D\u{1F4BB}", "\u{1F469}\u200D\u{1F4BB}", "\u{1F468}\u200D\u{1F3A4}", "\u{1F469}\u200D\u{1F3A4}", "\u{1F468}\u200D\u{1F3A8}", "\u{1F469}\u200D\u{1F3A8}", "\u{1F468}\u200D\u2708\uFE0F", "\u{1F469}\u200D\u2708\uFE0F", "\u{1F468}\u200D\u{1F680}", "\u{1F469}\u200D\u{1F680}", "\u{1F468}\u200D\u{1F692}", "\u{1F469}\u200D\u{1F692}", "\u{1F46E}", "\u{1F46E}\u200D\u2642\uFE0F", "\u{1F46E}\u200D\u2640\uFE0F", "\u{1F575}\uFE0F", "\u{1F575}\uFE0F\u200D\u2642\uFE0F", "\u{1F575}\uFE0F\u200D\u2640\uFE0F", "\u{1F482}", "\u{1F482}\u200D\u2642\uFE0F", "\u{1F482}\u200D\u2640\uFE0F", "\u{1F477}", "\u{1F477}\u200D\u2642\uFE0F", "\u{1F477}\u200D\u2640\uFE0F", "\u{1F934}", "\u{1F478}", "\u{1F473}", "\u{1F473}\u200D\u2642\uFE0F", "\u{1F473}\u200D\u2640\uFE0F", "\u{1F472}", "\u{1F9D5}", "\u{1F935}", "\u{1F470}", "\u{1F930}", "\u{1F931}", "\u{1F47C}", "\u{1F385}", "\u{1F936}", "\u{1F9B8}", "\u{1F9B8}\u200D\u2642\uFE0F", "\u{1F9B8}\u200D\u2640\uFE0F", "\u{1F9B9}", "\u{1F9B9}\u200D\u2642\uFE0F", "\u{1F9B9}\u200D\u2640\uFE0F", "\u{1F9D9}", "\u{1F9D9}\u200D\u2642\uFE0F", "\u{1F9D9}\u200D\u2640\uFE0F", "\u{1F9DA}", "\u{1F9DA}\u200D\u2642\uFE0F", "\u{1F9DA}\u200D\u2640\uFE0F", "\u{1F9DB}", "\u{1F9DB}\u200D\u2642\uFE0F", "\u{1F9DB}\u200D\u2640\uFE0F", "\u{1F9DC}", "\u{1F9DC}\u200D\u2642\uFE0F", "\u{1F9DC}\u200D\u2640\uFE0F", "\u{1F9DD}", "\u{1F9DD}\u200D\u2642\uFE0F", "\u{1F9DD}\u200D\u2640\uFE0F", "\u{1F486}", "\u{1F486}\u200D\u2642\uFE0F", "\u{1F486}\u200D\u2640\uFE0F", "\u{1F487}", "\u{1F487}\u200D\u2642\uFE0F", "\u{1F487}\u200D\u2640\uFE0F", "\u{1F6B6}", "\u{1F6B6}\u200D\u2642\uFE0F", "\u{1F6B6}\u200D\u2640\uFE0F", "\u{1F9CD}", "\u{1F9CD}\u200D\u2642\uFE0F", "\u{1F9CD}\u200D\u2640\uFE0F", "\u{1F9CE}", "\u{1F9CE}\u200D\u2642\uFE0F", "\u{1F9CE}\u200D\u2640\uFE0F", "\u{1F468}\u200D\u{1F9AF}", "\u{1F469}\u200D\u{1F9AF}", "\u{1F468}\u200D\u{1F9BC}", "\u{1F469}\u200D\u{1F9BC}", "\u{1F468}\u200D\u{1F9BD}", "\u{1F469}\u200D\u{1F9BD}", "\u{1F3C3}", "\u{1F3C3}\u200D\u2642\uFE0F", "\u{1F3C3}\u200D\u2640\uFE0F", "\u{1F483}", "\u{1F57A}", "\u{1F574}\uFE0F", "\u{1F9D6}", "\u{1F9D6}\u200D\u2642\uFE0F", "\u{1F9D6}\u200D\u2640\uFE0F", "\u{1F9D7}", "\u{1F9D7}\u200D\u2642\uFE0F", "\u{1F9D7}\u200D\u2640\uFE0F", "\u{1F3C7}", "\u{1F3C2}", "\u{1F3CC}\uFE0F", "\u{1F3CC}\uFE0F\u200D\u2642\uFE0F", "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F", "\u{1F3C4}", "\u{1F3C4}\u200D\u2642\uFE0F", "\u{1F3C4}\u200D\u2640\uFE0F", "\u{1F6A3}", "\u{1F6A3}\u200D\u2642\uFE0F", "\u{1F6A3}\u200D\u2640\uFE0F", "\u{1F3CA}", "\u{1F3CA}\u200D\u2642\uFE0F", "\u{1F3CA}\u200D\u2640\uFE0F", "\u26F9\uFE0F", "\u26F9\uFE0F\u200D\u2642\uFE0F", "\u26F9\uFE0F\u200D\u2640\uFE0F", "\u{1F3CB}\uFE0F", "\u{1F3CB}\uFE0F\u200D\u2642\uFE0F", "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F", "\u{1F6B4}", "\u{1F6B4}\u200D\u2642\uFE0F", "\u{1F6B4}\u200D\u2640\uFE0F", "\u{1F6B5}", "\u{1F6B5}\u200D\u2642\uFE0F", "\u{1F6B5}\u200D\u2640\uFE0F", "\u{1F938}", "\u{1F938}\u200D\u2642\uFE0F", "\u{1F938}\u200D\u2640\uFE0F", "\u{1F93D}", "\u{1F93D}\u200D\u2642\uFE0F", "\u{1F93D}\u200D\u2640\uFE0F", "\u{1F93E}", "\u{1F93E}\u200D\u2642\uFE0F", "\u{1F93E}\u200D\u2640\uFE0F", "\u{1F939}", "\u{1F939}\u200D\u2642\uFE0F", "\u{1F939}\u200D\u2640\uFE0F", "\u{1F9D8}", "\u{1F9D8}\u200D\u2642\uFE0F", "\u{1F9D8}\u200D\u2640\uFE0F", "\u{1F6C0}", "\u{1F6CC}", "\u{1F9D1}\u200D\u{1F91D}\u200D\u{1F9D1}", "\u{1F46D}", "\u{1F46B}", "\u{1F46C}"]);

                function z(l) {
                    return Q.has(l)
                }
                i(z, "isModifiable");
                const M = "\u200D",
                    x = 65039;

                function j(l, s) {
                    const d = U(l);
                    if (!z(d)) return l;
                    const v = G(s);
                    return v ? d.split(M).map(L => z(L) ? K(L, v) : L).join(M) : l
                }
                i(j, "applyTone");

                function D(l, s) {
                    const d = U(l);
                    if (!z(d)) return l;
                    const v = s.map(L => G(L));
                    return d.split(M).map(L => {
                        if (!z(L)) return L;
                        const W = v.shift();
                        return W ? K(L, W) : L
                    }).join(M)
                }
                i(D, "applyTones");

                function U(l) {
                    return [...l].filter(s => !X(s.codePointAt(0))).join("")
                }
                i(U, "removeTone");

                function K(l, s) {
                    const d = [...l].map(v => v.codePointAt(0));
                    return d[1] && (X(d[1]) || d[1] === x) ? d[1] = s : d.splice(1, 0, s), String.fromCodePoint(...d)
                }
                i(K, "tint");

                function X(l) {
                    return l >= 127995 && l <= 127999
                }
                i(X, "isTone");

                function G(l) {
                    switch (l) {
                        case 1:
                            return 127995;
                        case 2:
                            return 127996;
                        case 3:
                            return 127997;
                        case 4:
                            return 127998;
                        case 5:
                            return 127999;
                        default:
                            return null
                    }
                }
                i(G, "toneModifier");
                class _ extends HTMLElement {
                    get image() {
                        return this.firstElementChild instanceof HTMLImageElement ? this.firstElementChild : null
                    }
                    get tone() {
                        return (this.getAttribute("tone") || "").split(" ").map(s => {
                            const d = parseInt(s, 10);
                            return d >= 0 && d <= 5 ? d : 0
                        }).join(" ")
                    }
                    set tone(s) {
                        this.setAttribute("tone", s)
                    }
                    connectedCallback() {
                        if (this.image === null && !ct()) {
                            const s = this.getAttribute("fallback-src");
                            if (s) {
                                this.textContent = "";
                                const d = T(this);
                                d.src = s, this.appendChild(d)
                            }
                        }
                        this.hasAttribute("tone") && w(this)
                    }
                    static get observedAttributes() {
                        return ["tone"]
                    }
                    attributeChangedCallback(s) {
                        switch (s) {
                            case "tone":
                                w(this);
                                break
                        }
                    }
                }
                i(_, "GEmojiElement");

                function w(l) {
                    if (l.image) return;
                    const s = l.tone.split(" ").map(d => parseInt(d, 10));
                    if (s.length === 0) l.textContent = U(l.textContent || "");
                    else if (s.length === 1) {
                        const d = s[0];
                        l.textContent = d === 0 ? U(l.textContent || "") : j(l.textContent || "", d)
                    } else l.textContent = D(l.textContent || "", s)
                }
                i(w, "updateTone");

                function T(l) {
                    const s = document.createElement("img");
                    return s.className = "emoji", s.alt = l.getAttribute("alias") || "", s.height = 20, s.width = 20, s
                }
                i(T, "emojiImage"), window.customElements.get("g-emoji") || (window.GEmojiElement = _, window.customElements.define("g-emoji", _));
                var I = null
            },
            51941: () => {
                const ct = ["[data-md-button]", "md-header", "md-bold", "md-italic", "md-quote", "md-code", "md-link", "md-image", "md-unordered-list", "md-ordered-list", "md-task-list", "md-mention", "md-ref", "md-strikethrough"];

                function Q(o) {
                    const m = [];
                    for (const E of o.querySelectorAll(ct.join(", "))) E.hidden || E.offsetWidth <= 0 && E.offsetHeight <= 0 || E.closest("markdown-toolbar") === o && m.push(E);
                    return m
                }
                i(Q, "getButtons");

                function z(o) {
                    return function(m) {
                        (m.key === " " || m.key === "Enter") && (m.preventDefault(), o(m))
                    }
                }
                i(z, "keydown");
                const M = new WeakMap;
                class x extends HTMLElement {
                    constructor() {
                        super();
                        const m = i(() => {
                            const E = M.get(this);
                            !E || ft(this, E)
                        }, "apply");
                        this.addEventListener("keydown", z(m)), this.addEventListener("click", m)
                    }
                    connectedCallback() {
                        this.hasAttribute("role") || this.setAttribute("role", "button")
                    }
                    click() {
                        const m = M.get(this);
                        !m || ft(this, m)
                    }
                }
                i(x, "MarkdownButtonElement");
                class j extends x {
                    constructor() {
                        super();
                        const m = parseInt(this.getAttribute("level") || "3", 10);
                        if (m < 1 || m > 6) return;
                        const E = `${"#".repeat(m)} `;
                        M.set(this, {
                            prefix: E
                        })
                    }
                }
                i(j, "MarkdownHeaderButtonElement"), window.customElements.get("md-header") || (window.MarkdownHeaderButtonElement = j, window.customElements.define("md-header", j));
                class D extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "**",
                            suffix: "**",
                            trimFirst: !0
                        })
                    }
                }
                i(D, "MarkdownBoldButtonElement"), window.customElements.get("md-bold") || (window.MarkdownBoldButtonElement = D, window.customElements.define("md-bold", D));
                class U extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "_",
                            suffix: "_",
                            trimFirst: !0
                        })
                    }
                }
                i(U, "MarkdownItalicButtonElement"), window.customElements.get("md-italic") || (window.MarkdownItalicButtonElement = U, window.customElements.define("md-italic", U));
                class K extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "> ",
                            multiline: !0,
                            surroundWithNewlines: !0
                        })
                    }
                }
                i(K, "MarkdownQuoteButtonElement"), window.customElements.get("md-quote") || (window.MarkdownQuoteButtonElement = K, window.customElements.define("md-quote", K));
                class X extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "`",
                            suffix: "`",
                            blockPrefix: "```",
                            blockSuffix: "```"
                        })
                    }
                }
                i(X, "MarkdownCodeButtonElement"), window.customElements.get("md-code") || (window.MarkdownCodeButtonElement = X, window.customElements.define("md-code", X));
                class G extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "[",
                            suffix: "](url)",
                            replaceNext: "url",
                            scanFor: "https?://"
                        })
                    }
                }
                i(G, "MarkdownLinkButtonElement"), window.customElements.get("md-link") || (window.MarkdownLinkButtonElement = G, window.customElements.define("md-link", G));
                class _ extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "![",
                            suffix: "](url)",
                            replaceNext: "url",
                            scanFor: "https?://"
                        })
                    }
                }
                i(_, "MarkdownImageButtonElement"), window.customElements.get("md-image") || (window.MarkdownImageButtonElement = _, window.customElements.define("md-image", _));
                class w extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "- ",
                            multiline: !0,
                            unorderedList: !0
                        })
                    }
                }
                i(w, "MarkdownUnorderedListButtonElement"), window.customElements.get("md-unordered-list") || (window.MarkdownUnorderedListButtonElement = w, window.customElements.define("md-unordered-list", w));
                class T extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "1. ",
                            multiline: !0,
                            orderedList: !0
                        })
                    }
                }
                i(T, "MarkdownOrderedListButtonElement"), window.customElements.get("md-ordered-list") || (window.MarkdownOrderedListButtonElement = T, window.customElements.define("md-ordered-list", T));
                class I extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "- [ ] ",
                            multiline: !0,
                            surroundWithNewlines: !0
                        })
                    }
                }
                i(I, "MarkdownTaskListButtonElement"), window.customElements.get("md-task-list") || (window.MarkdownTaskListButtonElement = I, window.customElements.define("md-task-list", I));
                class l extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "@",
                            prefixSpace: !0
                        })
                    }
                }
                i(l, "MarkdownMentionButtonElement"), window.customElements.get("md-mention") || (window.MarkdownMentionButtonElement = l, window.customElements.define("md-mention", l));
                class s extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "#",
                            prefixSpace: !0
                        })
                    }
                }
                i(s, "MarkdownRefButtonElement"), window.customElements.get("md-ref") || (window.MarkdownRefButtonElement = s, window.customElements.define("md-ref", s));
                class d extends x {
                    constructor() {
                        super();
                        M.set(this, {
                            prefix: "~~",
                            suffix: "~~",
                            trimFirst: !0
                        })
                    }
                }
                i(d, "MarkdownStrikethroughButtonElement"), window.customElements.get("md-strikethrough") || (window.MarkdownStrikethroughButtonElement = d, window.customElements.define("md-strikethrough", d));
                class v extends HTMLElement {
                    constructor() {
                        super()
                    }
                    connectedCallback() {
                        this.hasAttribute("role") || this.setAttribute("role", "toolbar"), this.addEventListener("keydown", W), this.setAttribute("tabindex", "0"), this.addEventListener("focus", L, {
                            once: !0
                        })
                    }
                    disconnectedCallback() {
                        this.removeEventListener("keydown", W)
                    }
                    get field() {
                        const m = this.getAttribute("for");
                        if (!m) return null;
                        const E = "getRootNode" in this ? this.getRootNode() : document;
                        let k;
                        return (E instanceof Document || E instanceof ShadowRoot) && (k = E.getElementById(m)), k instanceof HTMLTextAreaElement ? k : null
                    }
                }
                i(v, "MarkdownToolbarElement");

                function L({
                    target: o
                }) {
                    if (!(o instanceof Element)) return;
                    o.removeAttribute("tabindex");
                    let m = "0";
                    for (const E of Q(o)) E.setAttribute("tabindex", m), m === "0" && (E.focus(), m = "-1")
                }
                i(L, "onToolbarFocus");

                function W(o) {
                    const m = o.key;
                    if (m !== "ArrowRight" && m !== "ArrowLeft" && m !== "Home" && m !== "End") return;
                    const E = o.currentTarget;
                    if (!(E instanceof HTMLElement)) return;
                    const k = Q(E),
                        C = k.indexOf(o.target),
                        O = k.length;
                    if (C === -1) return;
                    let $ = 0;
                    m === "ArrowLeft" && ($ = C - 1), m === "ArrowRight" && ($ = C + 1), m === "End" && ($ = O - 1), $ < 0 && ($ = O - 1), $ > O - 1 && ($ = 0);
                    for (let Y = 0; Y < O; Y += 1) k[Y].setAttribute("tabindex", Y === $ ? "0" : "-1");
                    o.preventDefault(), k[$].focus()
                }
                i(W, "focusKeydown"), window.customElements.get("markdown-toolbar") || (window.MarkdownToolbarElement = v, window.customElements.define("markdown-toolbar", v));

                function h(o) {
                    return o.trim().split(`
`).length > 1
                }
                i(h, "isMultipleLines");

                function f(o, m) {
                    return Array(m + 1).join(o)
                }
                i(f, "repeat");

                function c(o, m) {
                    let E = m;
                    for (; o[E] && o[E - 1] != null && !o[E - 1].match(/\s/);) E--;
                    return E
                }
                i(c, "wordSelectionStart");

                function u(o, m, E) {
                    let k = m;
                    const C = E ? /\n/ : /\s/;
                    for (; o[k] && !o[k].match(C);) k++;
                    return k
                }
                i(u, "wordSelectionEnd");
                let y = null;

                function B(o, {
                    text: m,
                    selectionStart: E,
                    selectionEnd: k
                }) {
                    const C = o.selectionStart,
                        O = o.value.slice(0, C),
                        $ = o.value.slice(o.selectionEnd);
                    if (y === null || y === !0) {
                        o.contentEditable = "true";
                        try {
                            y = document.execCommand("insertText", !1, m)
                        } catch {
                            y = !1
                        }
                        o.contentEditable = "false"
                    }
                    if (y && !o.value.slice(0, o.selectionStart).endsWith(m) && (y = !1), !y) {
                        try {
                            document.execCommand("ms-beginUndoUnit")
                        } catch {}
                        o.value = O + m + $;
                        try {
                            document.execCommand("ms-endUndoUnit")
                        } catch {}
                        o.dispatchEvent(new CustomEvent("input", {
                            bubbles: !0,
                            cancelable: !0
                        }))
                    }
                    E != null && k != null ? o.setSelectionRange(E, k) : o.setSelectionRange(C, o.selectionEnd)
                }
                i(B, "insertText");

                function F(o, m) {
                    const E = o.value.slice(o.selectionStart, o.selectionEnd);
                    let k;
                    m.orderedList || m.unorderedList ? k = dt(o, m) : m.multiline && h(E) ? k = yt(o, m) : k = vt(o, m), B(o, k)
                }
                i(F, "styleSelectedText");

                function ut(o) {
                    const m = o.value.split(`
`);
                    let E = 0;
                    for (let k = 0; k < m.length; k++) {
                        const C = m[k].length + 1;
                        o.selectionStart >= E && o.selectionStart < E + C && (o.selectionStart = E), o.selectionEnd >= E && o.selectionEnd < E + C && (o.selectionEnd = E + C - 1), E += C
                    }
                }
                i(ut, "expandSelectionToLine");

                function ot(o, m, E, k = !1) {
                    if (o.selectionStart === o.selectionEnd) o.selectionStart = c(o.value, o.selectionStart), o.selectionEnd = u(o.value, o.selectionEnd, k);
                    else {
                        const C = o.selectionStart - m.length,
                            O = o.selectionEnd + E.length,
                            $ = o.value.slice(C, o.selectionStart) === m,
                            Y = o.value.slice(o.selectionEnd, O) === E;
                        $ && Y && (o.selectionStart = C, o.selectionEnd = O)
                    }
                    return o.value.slice(o.selectionStart, o.selectionEnd)
                }
                i(ot, "expandSelectedText");

                function pt(o) {
                    const m = o.value.slice(0, o.selectionStart),
                        E = o.value.slice(o.selectionEnd),
                        k = m.match(/\n*$/),
                        C = E.match(/^\n*/),
                        O = k ? k[0].length : 0,
                        $ = C ? C[0].length : 0;
                    let Y, tt;
                    return m.match(/\S/) && O < 2 && (Y = f(`
`, 2 - O)), E.match(/\S/) && $ < 2 && (tt = f(`
`, 2 - $)), Y == null && (Y = ""), tt == null && (tt = ""), {
                        newlinesToAppend: Y,
                        newlinesToPrepend: tt
                    }
                }
                i(pt, "newlinesToSurroundSelectedText");

                function vt(o, m) {
                    let E, k;
                    const {
                        prefix: C,
                        suffix: O,
                        blockPrefix: $,
                        blockSuffix: Y,
                        replaceNext: tt,
                        prefixSpace: ht,
                        scanFor: et,
                        surroundWithNewlines: mt
                    } = m, lt = o.selectionStart, wt = o.selectionEnd;
                    let nt = o.value.slice(o.selectionStart, o.selectionEnd),
                        V = h(nt) && $.length > 0 ? `${$}
` : C,
                        st = h(nt) && Y.length > 0 ? `
${Y}` : O;
                    if (ht) {
                        const Z = o.value[o.selectionStart - 1];
                        o.selectionStart !== 0 && Z != null && !Z.match(/\s/) && (V = ` ${V}`)
                    }
                    nt = ot(o, V, st, m.multiline);
                    let H = o.selectionStart,
                        it = o.selectionEnd;
                    const Et = tt.length > 0 && st.indexOf(tt) > -1 && nt.length > 0;
                    if (mt) {
                        const Z = pt(o);
                        E = Z.newlinesToAppend, k = Z.newlinesToPrepend, V = E + C, st += k
                    }
                    if (nt.startsWith(V) && nt.endsWith(st)) {
                        const Z = nt.slice(V.length, nt.length - st.length);
                        if (lt === wt) {
                            let J = lt - V.length;
                            J = Math.max(J, H), J = Math.min(J, H + Z.length), H = it = J
                        } else it = H + Z.length;
                        return {
                            text: Z,
                            selectionStart: H,
                            selectionEnd: it
                        }
                    } else if (Et)
                        if (et.length > 0 && nt.match(et)) {
                            st = st.replace(tt, nt);
                            const Z = V + st;
                            return H = it = H + V.length, {
                                text: Z,
                                selectionStart: H,
                                selectionEnd: it
                            }
                        } else {
                            const Z = V + nt + st;
                            return H = H + V.length + nt.length + st.indexOf(tt), it = H + tt.length, {
                                text: Z,
                                selectionStart: H,
                                selectionEnd: it
                            }
                        }
                    else {
                        let Z = V + nt + st;
                        H = lt + V.length, it = wt + V.length;
                        const J = nt.match(/^\s*|\s*$/g);
                        if (m.trimFirst && J) {
                            const at = J[0] || "",
                                gt = J[1] || "";
                            Z = at + V + nt.trim() + st + gt, H += at.length, it -= gt.length
                        }
                        return {
                            text: Z,
                            selectionStart: H,
                            selectionEnd: it
                        }
                    }
                }
                i(vt, "blockStyle");

                function yt(o, m) {
                    const {
                        prefix: E,
                        suffix: k,
                        surroundWithNewlines: C
                    } = m;
                    let O = o.value.slice(o.selectionStart, o.selectionEnd),
                        $ = o.selectionStart,
                        Y = o.selectionEnd;
                    const tt = O.split(`
`);
                    if (tt.every(et => et.startsWith(E) && et.endsWith(k))) O = tt.map(et => et.slice(E.length, et.length - k.length)).join(`
`), Y = $ + O.length;
                    else if (O = tt.map(et => E + et + k).join(`
`), C) {
                        const {
                            newlinesToAppend: et,
                            newlinesToPrepend: mt
                        } = pt(o);
                        $ += et.length, Y = $ + O.length, O = et + O + mt
                    }
                    return {
                        text: O,
                        selectionStart: $,
                        selectionEnd: Y
                    }
                }
                i(yt, "multilineStyle");

                function b(o) {
                    const m = o.split(`
`),
                        E = /^\d+\.\s+/,
                        k = m.every(O => E.test(O));
                    let C = m;
                    return k && (C = m.map(O => O.replace(E, ""))), {
                        text: C.join(`
`),
                        processed: k
                    }
                }
                i(b, "undoOrderedListStyle");

                function p(o) {
                    const m = o.split(`
`),
                        E = "- ",
                        k = m.every(O => O.startsWith(E));
                    let C = m;
                    return k && (C = m.map(O => O.slice(E.length, O.length))), {
                        text: C.join(`
`),
                        processed: k
                    }
                }
                i(p, "undoUnorderedListStyle");

                function A(o, m) {
                    return m ? "- " : `${o+1}. `
                }
                i(A, "makePrefix");

                function P(o, m) {
                    let E, k, C;
                    return o.orderedList ? (k = b(m), E = p(k.text), C = E.text) : (k = p(m), E = b(k.text), C = E.text), [k, E, C]
                }
                i(P, "clearExistingListStyle");

                function dt(o, m) {
                    const E = o.selectionStart === o.selectionEnd;
                    let k = o.selectionStart,
                        C = o.selectionEnd;
                    ut(o);
                    const O = o.value.slice(o.selectionStart, o.selectionEnd),
                        [$, Y, tt] = P(m, O),
                        ht = tt.split(`
`).map((V, st) => `${A(st,m.unorderedList)}${V}`),
                        et = ht.reduce((V, st, H) => V + A(H, m.unorderedList).length, 0),
                        mt = ht.reduce((V, st, H) => V + A(H, !m.unorderedList).length, 0);
                    if ($.processed) return E ? (k = Math.max(k - A(0, m.unorderedList).length, 0), C = k) : (k = o.selectionStart, C = o.selectionEnd - et), {
                        text: tt,
                        selectionStart: k,
                        selectionEnd: C
                    };
                    const {
                        newlinesToAppend: lt,
                        newlinesToPrepend: wt
                    } = pt(o), nt = lt + ht.join(`
`) + wt;
                    return E ? (k = Math.max(k + A(0, m.unorderedList).length + lt.length, 0), C = k) : Y.processed ? (k = Math.max(o.selectionStart + lt.length, 0), C = o.selectionEnd + lt.length + et - mt) : (k = Math.max(o.selectionStart + lt.length, 0), C = o.selectionEnd + lt.length + et), {
                        text: nt,
                        selectionStart: k,
                        selectionEnd: C
                    }
                }
                i(dt, "listStyle");

                function ft(o, m) {
                    const E = o.closest("markdown-toolbar");
                    if (!(E instanceof v)) return;
                    const C = Object.assign(Object.assign({}, {
                            prefix: "",
                            suffix: "",
                            blockPrefix: "",
                            blockSuffix: "",
                            multiline: !1,
                            replaceNext: "",
                            prefixSpace: !1,
                            scanFor: "",
                            surroundWithNewlines: !1,
                            orderedList: !1,
                            unorderedList: !1,
                            trimFirst: !1
                        }), m),
                        O = E.field;
                    O && (O.focus(), F(O, C))
                }
                i(ft, "applyStyle");
                var bt = null
            },
            40987: (ct, Q, z) => {
                z.d(Q, {
                    Z: () => l
                });
                const M = new WeakMap;
                let x = null;

                function j() {
                    return !!x
                }
                i(j, "isDragging");

                function D(b, p, A) {
                    M.set(b, {
                        sortStarted: p,
                        sortFinished: A
                    }), b.addEventListener("dragstart", X), b.addEventListener("dragenter", G), b.addEventListener("dragend", w), b.addEventListener("drop", _), b.addEventListener("dragover", T)
                }
                i(D, "sortable");

                function U(b, p) {
                    if (b.parentNode === p.parentNode) {
                        let A = b;
                        for (; A;) {
                            if (A === p) return !0;
                            A = A.previousElementSibling
                        }
                    }
                    return !1
                }
                i(U, "isBefore");

                function K(b, p) {
                    return b.closest("task-lists") === p.closest("task-lists")
                }
                i(K, "isSameContainer");

                function X(b) {
                    if (b.currentTarget !== b.target) return;
                    const p = b.currentTarget;
                    if (!(p instanceof Element)) return;
                    const A = p.closest(".contains-task-list");
                    if (!A || (p.classList.add("is-ghost"), b.dataTransfer && b.dataTransfer.setData("text/plain", (p.textContent || "").trim()), !p.parentElement)) return;
                    const P = Array.from(p.parentElement.children),
                        dt = P.indexOf(p),
                        ft = M.get(p);
                    ft && ft.sortStarted(A), x = {
                        didDrop: !1,
                        dragging: p,
                        dropzone: p,
                        sourceList: A,
                        sourceSibling: P[dt + 1] || null,
                        sourceIndex: dt
                    }
                }
                i(X, "onDragStart");

                function G(b) {
                    if (!x) return;
                    const p = b.currentTarget;
                    if (p instanceof Element) {
                        if (!K(x.dragging, p)) {
                            b.stopPropagation();
                            return
                        }
                        b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), x.dropzone !== p && (x.dragging.classList.add("is-dragging"), x.dropzone = p, U(x.dragging, p) ? p.before(x.dragging) : p.after(x.dragging))
                    }
                }
                i(G, "onDragEnter");

                function _(b) {
                    if (!x) return;
                    b.preventDefault(), b.stopPropagation();
                    const p = b.currentTarget;
                    if (!(p instanceof Element) || (x.didDrop = !0, !x.dragging.parentElement)) return;
                    let A = Array.from(x.dragging.parentElement.children).indexOf(x.dragging);
                    const P = p.closest(".contains-task-list");
                    if (!P || x.sourceIndex === A && x.sourceList === P) return;
                    x.sourceList === P && x.sourceIndex < A && A++;
                    const dt = {
                            list: x.sourceList,
                            index: x.sourceIndex
                        },
                        ft = {
                            list: P,
                            index: A
                        },
                        bt = M.get(x.dragging);
                    bt && bt.sortFinished({
                        src: dt,
                        dst: ft
                    })
                }
                i(_, "onDrop");

                function w() {
                    !x || (x.dragging.classList.remove("is-dragging"), x.dragging.classList.remove("is-ghost"), x.didDrop || x.sourceList.insertBefore(x.dragging, x.sourceSibling), x = null)
                }
                i(w, "onDragEnd");

                function T(b) {
                    if (!x) return;
                    const p = b.currentTarget;
                    if (p instanceof Element) {
                        if (!K(x.dragging, p)) {
                            b.stopPropagation();
                            return
                        }
                        b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move")
                    }
                }
                i(T, "onDragOver");
                const I = new WeakMap;
                class l extends HTMLElement {
                    connectedCallback() {
                        this.addEventListener("change", A => {
                            const P = A.target;
                            P instanceof HTMLInputElement && (!P.classList.contains("task-list-item-checkbox") || this.dispatchEvent(new CustomEvent("task-lists-check", {
                                bubbles: !0,
                                detail: {
                                    position: h(P),
                                    checked: P.checked
                                }
                            })))
                        });
                        const p = new MutationObserver(y.bind(null, this));
                        I.set(this, p), p.observe(this, {
                            childList: !0,
                            subtree: !0
                        }), y(this)
                    }
                    disconnectedCallback() {
                        const p = I.get(this);
                        p && p.disconnect()
                    }
                    get disabled() {
                        return this.hasAttribute("disabled")
                    }
                    set disabled(p) {
                        p ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
                    }
                    get sortable() {
                        return this.hasAttribute("sortable")
                    }
                    set sortable(p) {
                        p ? this.setAttribute("sortable", "") : this.removeAttribute("sortable")
                    }
                    static get observedAttributes() {
                        return ["disabled"]
                    }
                    attributeChangedCallback(p, A, P) {
                        if (A !== P) switch (p) {
                            case "disabled":
                                B(this);
                                break
                        }
                    }
                }
                i(l, "TaskListsElement");
                const s = document.createElement("template");
                s.innerHTML = `
  <span class="handle">
    <svg class="drag-handle" aria-hidden="true" width="16" height="16">
      <path d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"/>
    </svg>
  </span>`;
                const d = new WeakMap;

                function v(b) {
                    if (d.get(b)) return;
                    d.set(b, !0);
                    const p = b.closest("task-lists");
                    if (!(p instanceof l) || p.querySelectorAll(".task-list-item").length <= 1) return;
                    const A = s.content.cloneNode(!0),
                        P = A.querySelector(".handle");
                    if (b.prepend(A), !P) throw new Error("handle not found");
                    P.addEventListener("mouseenter", vt), P.addEventListener("mouseleave", yt), D(b, ot, pt), b.addEventListener("mouseenter", L), b.addEventListener("mouseleave", W)
                }
                i(v, "initItem");

                function L(b) {
                    const p = b.currentTarget;
                    if (!(p instanceof Element)) return;
                    const A = p.closest("task-lists");
                    A instanceof l && A.sortable && !A.disabled && p.classList.add("hovered")
                }
                i(L, "onListItemMouseOver");

                function W(b) {
                    const p = b.currentTarget;
                    p instanceof Element && p.classList.remove("hovered")
                }
                i(W, "onListItemMouseOut");

                function h(b) {
                    const p = f(b);
                    if (!p) throw new Error(".contains-task-list not found");
                    const A = b.closest(".task-list-item"),
                        P = Array.from(p.children).filter(ft => ft.tagName === "LI"),
                        dt = A ? P.indexOf(A) : -1;
                    return [F(p), dt]
                }
                i(h, "position");

                function f(b) {
                    const p = b.parentElement;
                    return p ? p.closest(".contains-task-list") : null
                }
                i(f, "taskList");

                function c(b) {
                    return f(b) === u(b)
                }
                i(c, "isRootTaskList");

                function u(b) {
                    const p = f(b);
                    return p ? u(p) || p : null
                }
                i(u, "rootTaskList");

                function y(b) {
                    const p = b.querySelectorAll(".contains-task-list > .task-list-item");
                    for (const A of p) c(A) && v(A);
                    B(b)
                }
                i(y, "syncState");

                function B(b) {
                    for (const p of b.querySelectorAll(".task-list-item")) p.classList.toggle("enabled", !b.disabled);
                    for (const p of b.querySelectorAll(".task-list-item-checkbox")) p instanceof HTMLInputElement && (p.disabled = b.disabled)
                }
                i(B, "syncDisabled");

                function F(b) {
                    const p = b.closest("task-lists");
                    if (!p) throw new Error("parent not found");
                    return Array.from(p.querySelectorAll("ol, ul")).indexOf(b)
                }
                i(F, "listIndex");
                const ut = new WeakMap;

                function ot(b) {
                    const p = b.closest("task-lists");
                    if (!p) throw new Error("parent not found");
                    ut.set(p, Array.from(p.querySelectorAll("ol, ul")))
                }
                i(ot, "onSortStart");

                function pt({
                    src: b,
                    dst: p
                }) {
                    const A = b.list.closest("task-lists");
                    if (!A) return;
                    const P = ut.get(A);
                    !P || (ut.delete(A), A.dispatchEvent(new CustomEvent("task-lists-move", {
                        bubbles: !0,
                        detail: {
                            src: [P.indexOf(b.list), b.index],
                            dst: [P.indexOf(p.list), p.index]
                        }
                    })))
                }
                i(pt, "onSorted");

                function vt(b) {
                    const p = b.currentTarget;
                    if (!(p instanceof Element)) return;
                    const A = p.closest(".task-list-item");
                    if (!A) return;
                    const P = A.closest("task-lists");
                    P instanceof l && P.sortable && !P.disabled && A.setAttribute("draggable", "true")
                }
                i(vt, "onHandleMouseOver");

                function yt(b) {
                    if (j()) return;
                    const p = b.currentTarget;
                    if (!(p instanceof Element)) return;
                    const A = p.closest(".task-list-item");
                    !A || A.setAttribute("draggable", "false")
                }
                i(yt, "onHandleMouseOut"), window.customElements.get("task-lists") || (window.TaskListsElement = l, window.customElements.define("task-lists", l))
            },
            57852: (ct, Q, z) => {
                var M = z(10160);
                const x = /\s|\(|\[/;

                function j(l, s, d, {
                    multiWord: v,
                    lookBackIndex: L,
                    lastMatchPosition: W
                } = {
                    multiWord: !1,
                    lookBackIndex: 0,
                    lastMatchPosition: null
                }) {
                    let h = l.lastIndexOf(s, d - 1);
                    if (h === -1 || h < L) return;
                    if (v) {
                        if (W != null) {
                            if (W === h) return;
                            h = W - s.length
                        }
                        if (l[h + 1] === " " && d >= h + s.length + 1 || l.lastIndexOf(`
`, d - 1) > h || l.lastIndexOf(".", d - 1) > h) return
                    } else if (l.lastIndexOf(" ", d - 1) > h) return;
                    const f = l[h - 1];
                    return f && !x.test(f) ? void 0 : {
                        text: l.substring(h + s.length, d),
                        position: h + s.length
                    }
                }
                i(j, "query");
                const D = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"],
                    U = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"],
                    K = new WeakMap;

                function X(l, s) {
                    const d = l.nodeName.toLowerCase();
                    if (d !== "textarea" && d !== "input") throw new Error("expected textField to a textarea or input");
                    let v = K.get(l);
                    if (v && v.parentElement === l.parentElement) v.innerHTML = "";
                    else {
                        v = document.createElement("div"), K.set(l, v);
                        const f = window.getComputedStyle(l),
                            c = D.slice(0);
                        d === "textarea" ? c.push("white-space:pre-wrap;") : c.push("white-space:nowrap;");
                        for (let u = 0, y = U.length; u < y; u++) {
                            const B = U[u];
                            c.push(`${B}:${f.getPropertyValue(B)};`)
                        }
                        v.style.cssText = c.join(" ")
                    }
                    const L = document.createElement("span");
                    L.style.cssText = "position: absolute;", L.innerHTML = "&nbsp;";
                    let W, h;
                    if (typeof s == "number") {
                        let f = l.value.substring(0, s);
                        f && (W = document.createTextNode(f)), f = l.value.substring(s), f && (h = document.createTextNode(f))
                    } else {
                        const f = l.value;
                        f && (W = document.createTextNode(f))
                    }
                    if (W && v.appendChild(W), v.appendChild(L), h && v.appendChild(h), !v.parentElement) {
                        if (!l.parentElement) throw new Error("textField must have a parentElement to mirror");
                        l.parentElement.insertBefore(v, l)
                    }
                    return v.scrollTop = l.scrollTop, v.scrollLeft = l.scrollLeft, {
                        mirror: v,
                        marker: L
                    }
                }
                i(X, "textFieldMirror");

                function G(l, s = l.selectionEnd) {
                    const {
                        mirror: d,
                        marker: v
                    } = X(l, s), L = d.getBoundingClientRect(), W = v.getBoundingClientRect();
                    return setTimeout(() => {
                        d.remove()
                    }, 5e3), {
                        top: W.top - L.top,
                        left: W.left - L.left
                    }
                }
                i(G, "textFieldSelectionPosition");
                const _ = new WeakMap;
                class w {
                    constructor(s, d) {
                        this.expander = s, this.input = d, this.combobox = null, this.menu = null, this.match = null, this.justPasted = !1, this.lookBackIndex = 0, this.oninput = this.onInput.bind(this), this.onpaste = this.onPaste.bind(this), this.onkeydown = this.onKeydown.bind(this), this.oncommit = this.onCommit.bind(this), this.onmousedown = this.onMousedown.bind(this), this.onblur = this.onBlur.bind(this), this.interactingWithList = !1, d.addEventListener("paste", this.onpaste), d.addEventListener("input", this.oninput), d.addEventListener("keydown", this.onkeydown), d.addEventListener("blur", this.onblur)
                    }
                    destroy() {
                        this.input.removeEventListener("paste", this.onpaste), this.input.removeEventListener("input", this.oninput), this.input.removeEventListener("keydown", this.onkeydown), this.input.removeEventListener("blur", this.onblur)
                    }
                    dismissMenu() {
                        this.deactivate() && (this.lookBackIndex = this.input.selectionEnd || this.lookBackIndex)
                    }
                    activate(s, d) {
                        var v, L;
                        if (this.input !== document.activeElement && this.input !== ((L = (v = document.activeElement) === null || v === void 0 ? void 0 : v.shadowRoot) === null || L === void 0 ? void 0 : L.activeElement)) return;
                        this.deactivate(), this.menu = d, d.id || (d.id = `text-expander-${Math.floor(Math.random()*1e5).toString()}`), this.expander.append(d), this.combobox = new M.Z(this.input, d);
                        const {
                            top: W,
                            left: h
                        } = G(this.input, s.position);
                        d.style.top = `${W}px`, d.style.left = `${h}px`, this.combobox.start(), d.addEventListener("combobox-commit", this.oncommit), d.addEventListener("mousedown", this.onmousedown), this.combobox.navigate(1)
                    }
                    deactivate() {
                        const s = this.menu;
                        return !s || !this.combobox ? !1 : (this.menu = null, s.removeEventListener("combobox-commit", this.oncommit), s.removeEventListener("mousedown", this.onmousedown), this.combobox.destroy(), this.combobox = null, s.remove(), !0)
                    }
                    onCommit({
                        target: s
                    }) {
                        const d = s;
                        if (!(d instanceof HTMLElement) || !this.combobox) return;
                        const v = this.match;
                        if (!v) return;
                        const L = this.input.value.substring(0, v.position - v.key.length),
                            W = this.input.value.substring(v.position + v.text.length),
                            h = {
                                item: d,
                                key: v.key,
                                value: null
                            };
                        if (!this.expander.dispatchEvent(new CustomEvent("text-expander-value", {
                                cancelable: !0,
                                detail: h
                            })) || !h.value) return;
                        const c = `${h.value} `;
                        this.input.value = L + c + W;
                        const u = L.length + c.length;
                        this.deactivate(), this.input.focus({
                            preventScroll: !0
                        }), this.input.selectionStart = u, this.input.selectionEnd = u, this.lookBackIndex = u, this.match = null
                    }
                    onBlur() {
                        if (this.interactingWithList) {
                            this.interactingWithList = !1;
                            return
                        }
                        this.deactivate()
                    }
                    onPaste() {
                        this.justPasted = !0
                    }
                    async onInput() {
                        if (this.justPasted) {
                            this.justPasted = !1;
                            return
                        }
                        const s = this.findMatch();
                        if (s) {
                            this.match = s;
                            const d = await this.notifyProviders(s);
                            if (!this.match) return;
                            d ? this.activate(s, d) : this.deactivate()
                        } else this.match = null, this.deactivate()
                    }
                    findMatch() {
                        const s = this.input.selectionEnd || 0,
                            d = this.input.value;
                        s <= this.lookBackIndex && (this.lookBackIndex = s - 1);
                        for (const {
                                key: v,
                                multiWord: L
                            } of this.expander.keys) {
                            const W = j(d, v, s, {
                                multiWord: L,
                                lookBackIndex: this.lookBackIndex,
                                lastMatchPosition: this.match ? this.match.position : null
                            });
                            if (W) return {
                                text: W.text,
                                key: v,
                                position: W.position
                            }
                        }
                    }
                    async notifyProviders(s) {
                        const d = [],
                            v = i(f => d.push(f), "provide");
                        return this.expander.dispatchEvent(new CustomEvent("text-expander-change", {
                            cancelable: !0,
                            detail: {
                                provide: v,
                                text: s.text,
                                key: s.key
                            }
                        })) ? (await Promise.all(d)).filter(f => f.matched).map(f => f.fragment)[0] : void 0
                    }
                    onMousedown() {
                        this.interactingWithList = !0
                    }
                    onKeydown(s) {
                        s.key === "Escape" && (this.match = null, this.deactivate() && (this.lookBackIndex = this.input.selectionEnd || this.lookBackIndex, s.stopImmediatePropagation(), s.preventDefault()))
                    }
                }
                i(w, "TextExpander");
                class T extends HTMLElement {
                    get keys() {
                        const s = this.getAttribute("keys"),
                            d = s ? s.split(" ") : [],
                            v = this.getAttribute("multiword"),
                            L = v ? v.split(" ") : [],
                            W = L.length === 0 && this.hasAttribute("multiword");
                        return d.map(h => ({
                            key: h,
                            multiWord: W || L.includes(h)
                        }))
                    }
                    connectedCallback() {
                        const s = this.querySelector('input[type="text"], textarea');
                        if (!(s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement)) return;
                        const d = new w(this, s);
                        _.set(this, d)
                    }
                    disconnectedCallback() {
                        const s = _.get(this);
                        !s || (s.destroy(), _.delete(this))
                    }
                    dismiss() {
                        const s = _.get(this);
                        !s || s.dismissMenu()
                    }
                }
                i(T, "TextExpanderElement"), window.customElements.get("text-expander") || (window.TextExpanderElement = T, window.customElements.define("text-expander", T));
                var I = null
            },
            88823: () => {
                const ct = function() {
                    return document.readyState === "complete" ? Promise.resolve() : new Promise(j => {
                        window.addEventListener("load", j)
                    })
                }();
                class Q extends HTMLElement {
                    async connectedCallback() {
                        await ct, this.content && await M(this.lines, this.content, this.characterDelay, this.lineDelay), this.cursor && (this.cursor.hidden = !0), this.dispatchEvent(new CustomEvent("typing:complete", {
                            bubbles: !0,
                            cancelable: !0
                        }))
                    }
                    get content() {
                        return this.querySelector('[data-target="typing-effect.content"]')
                    }
                    get cursor() {
                        return this.querySelector('[data-target="typing-effect.cursor"]')
                    }
                    get lines() {
                        const D = this.getAttribute("data-lines");
                        try {
                            return D ? JSON.parse(D) : []
                        } catch {
                            return []
                        }
                    }
                    get prefersReducedMotion() {
                        return window.matchMedia("(prefers-reduced-motion)").matches
                    }
                    get characterDelay() {
                        return this.prefersReducedMotion ? 0 : Math.max(0, Math.min(Math.floor(Number(this.getAttribute("data-character-delay"))), 2147483647)) || 40
                    }
                    set characterDelay(D) {
                        if (D > 2147483647 || D < 0) throw new DOMException("Value is negative or greater than the allowed amount");
                        this.setAttribute("data-character-delay", String(D))
                    }
                    get lineDelay() {
                        return this.prefersReducedMotion ? 0 : Math.max(0, Math.min(Math.floor(Number(this.getAttribute("data-line-delay"))), 2147483647)) || 40
                    }
                    set lineDelay(D) {
                        if (D > 2147483647 || D < 0) throw new DOMException("Value is negative or greater than the allowed amount");
                        this.setAttribute("data-line-delay", String(D))
                    }
                }
                i(Q, "TypingEffectElement");
                var z = null;
                window.customElements.get("typing-effect") || (window.TypingEffectElement = Q, window.customElements.define("typing-effect", Q));
                async function M(j, D, U, K) {
                    for (let X = 0; X < j.length; X++) {
                        if (U === 0) D.append(j[X]);
                        else
                            for (const G of j[X].split("")) await x(U), D.innerHTML += G;
                        K !== 0 && await x(K), X < j.length - 1 && D.append(document.createElement("br"))
                    }
                }
                i(M, "typeLines");
                async function x(j) {
                    return new Promise(D => {
                        setTimeout(D, j)
                    })
                }
                i(x, "wait")
            }
        }
    ]);
})();

//# sourceMappingURL=8475-c4c7e186b09c.js.map