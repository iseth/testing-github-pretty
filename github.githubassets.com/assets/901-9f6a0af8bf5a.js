(() => {
    var oe = Object.defineProperty;
    var l = (H, O) => oe(H, "name", {
        value: O,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [901], {
            52769: (H, O, M) => {
                "use strict";
                M.d(O, {
                    AI: () => T,
                    AL: () => te,
                    CR: () => c,
                    F6: () => D,
                    Hl: () => b,
                    KB: () => W,
                    TR: () => f,
                    XR: () => a,
                    jw: () => C,
                    mK: () => Q
                });

                function v(m, w) {
                    var A, R, $;
                    const K = m.value.slice(0, (A = m.selectionStart) !== null && A !== void 0 ? A : void 0),
                        V = m.value.slice((R = m.selectionEnd) !== null && R !== void 0 ? R : void 0);
                    let G = !0;
                    m.contentEditable = "true";
                    try {
                        G = document.execCommand("insertText", !1, w)
                    } catch {
                        G = !1
                    }
                    if (m.contentEditable = "false", G && !m.value.slice(0, ($ = m.selectionStart) !== null && $ !== void 0 ? $ : void 0).endsWith(w) && (G = !1), !G) {
                        try {
                            document.execCommand("ms-beginUndoUnit")
                        } catch {}
                        m.value = K + w + V;
                        try {
                            document.execCommand("ms-endUndoUnit")
                        } catch {}
                        m.dispatchEvent(new CustomEvent("change", {
                            bubbles: !0,
                            cancelable: !0
                        }))
                    }
                }
                l(v, "insertText");

                function T(m) {
                    m.addEventListener("paste", E)
                }
                l(T, "install$4");

                function f(m) {
                    m.removeEventListener("paste", E)
                }
                l(f, "uninstall$4");

                function E(m) {
                    const w = m.clipboardData;
                    if (!w || !t(w)) return;
                    const A = m.currentTarget;
                    if (!(A instanceof HTMLTextAreaElement)) return;
                    let R = w.getData("text/plain");
                    const $ = w.getData("text/html"),
                        K = $.replace(/\u00A0/g, " ");
                    if (!$ || (R = R.trim(), !R)) return;
                    const Z = new DOMParser().parseFromString(K, "text/html").getElementsByTagName("a"),
                        J = n(Z, R, e);
                    J !== R && (m.stopPropagation(), m.preventDefault(), v(A, J))
                }
                l(E, "onPaste$4");

                function n(m, w, A, ...R) {
                    const $ = [];
                    for (const K of m) {
                        const V = K.textContent || "",
                            {
                                part: G,
                                index: Z
                            } = i(w, V);
                        Z >= 0 && ($.push(G.replace(V, A(K, R))), w = w.slice(Z))
                    }
                    return $.push(w), $.join("")
                }
                l(n, "transform");

                function i(m, w = "") {
                    let A = m.indexOf(w);
                    return A === -1 ? {
                        part: "",
                        index: A
                    } : (A += w.length, {
                        part: m.substring(0, A),
                        index: A
                    })
                }
                l(i, "trimAfter");

                function t(m) {
                    return m.types.includes("text/html")
                }
                l(t, "hasHTML");

                function e(m) {
                    const w = m.textContent || "",
                        A = m.href || "";
                    let R = "";
                    return o(m) ? R = w : r(m) || s(A, w) ? R = A : R = `[${w}](${A})`, R
                }
                l(e, "linkify$2");

                function r(m) {
                    return m.className.indexOf("commit-link") >= 0 || !!m.getAttribute("data-hovercard-type") && m.getAttribute("data-hovercard-type") !== "user"
                }
                l(r, "isSpecialLink");

                function s(m, w) {
                    return m = m.slice(-1) === "/" ? m.slice(0, -1) : m, w = w.slice(-1) === "/" ? w.slice(0, -1) : w, m.toLowerCase() === w.toLowerCase()
                }
                l(s, "areEqualLinks");

                function o(m) {
                    var w;
                    return ((w = m.textContent) === null || w === void 0 ? void 0 : w.slice(0, 1)) === "@" && m.getAttribute("data-hovercard-type") === "user"
                }
                l(o, "isUserMention");

                function c(m) {
                    m.addEventListener("dragover", h), m.addEventListener("drop", u), m.addEventListener("paste", d)
                }
                l(c, "install$3");

                function a(m) {
                    m.removeEventListener("dragover", h), m.removeEventListener("drop", u), m.removeEventListener("paste", d)
                }
                l(a, "uninstall$3");

                function u(m) {
                    const w = m.dataTransfer;
                    if (!w || g(w) || !_(w)) return;
                    const A = k(w);
                    if (!A.some(N)) return;
                    m.stopPropagation(), m.preventDefault();
                    const R = m.currentTarget;
                    R instanceof HTMLTextAreaElement && v(R, A.map(p).join(""))
                }
                l(u, "onDrop$1");

                function h(m) {
                    const w = m.dataTransfer;
                    w && (w.dropEffect = "link")
                }
                l(h, "onDragover$1");

                function d(m) {
                    const w = m.clipboardData;
                    if (!w || !_(w)) return;
                    const A = k(w);
                    if (!A.some(N)) return;
                    m.stopPropagation(), m.preventDefault();
                    const R = m.currentTarget;
                    R instanceof HTMLTextAreaElement && v(R, A.map(p).join(""))
                }
                l(d, "onPaste$3");

                function p(m) {
                    return N(m) ? `
![](${m})
` : m
                }
                l(p, "linkify$1");

                function g(m) {
                    return Array.from(m.types).indexOf("Files") >= 0
                }
                l(g, "hasFile$1");

                function _(m) {
                    return Array.from(m.types).indexOf("text/uri-list") >= 0
                }
                l(_, "hasLink");

                function k(m) {
                    return (m.getData("text/uri-list") || "").split(`\r
`)
                }
                l(k, "extractLinks");
                const L = /\.(gif|png|jpe?g)$/i;

                function N(m) {
                    return L.test(m)
                }
                l(N, "isImageLink");

                function C(m) {
                    m.addEventListener("paste", y)
                }
                l(C, "install$2");

                function b(m) {
                    m.removeEventListener("paste", y)
                }
                l(b, "uninstall$2");

                function y(m) {
                    const w = m.clipboardData;
                    if (!w || !x(w)) return;
                    const A = m.currentTarget;
                    if (!(A instanceof HTMLTextAreaElement)) return;
                    const R = w.getData("text/plain");
                    if (!R || !P(R) || S(A)) return;
                    const $ = A.value.substring(A.selectionStart, A.selectionEnd);
                    !$.length || P($.trim()) || (m.stopPropagation(), m.preventDefault(), v(A, I($, R)))
                }
                l(y, "onPaste$2");

                function x(m) {
                    return Array.from(m.types).includes("text/plain")
                }
                l(x, "hasPlainText");

                function S(m) {
                    const w = m.selectionStart || 0;
                    return w > 1 ? m.value.substring(w - 2, w) === "](" : !1
                }
                l(S, "isWithinLink");

                function I(m, w) {
                    return `[${m}](${w})`
                }
                l(I, "linkify");

                function P(m) {
                    return /^https?:\/\//i.test(m)
                }
                l(P, "isURL");

                function D(m) {
                    m.addEventListener("dragover", j), m.addEventListener("drop", F), m.addEventListener("paste", U)
                }
                l(D, "install$1");

                function W(m) {
                    m.removeEventListener("dragover", j), m.removeEventListener("drop", F), m.removeEventListener("paste", U)
                }
                l(W, "uninstall$1");

                function F(m) {
                    const w = m.dataTransfer;
                    if (!w || B(w)) return;
                    const A = X(w);
                    if (!A) return;
                    m.stopPropagation(), m.preventDefault();
                    const R = m.currentTarget;
                    R instanceof HTMLTextAreaElement && v(R, A)
                }
                l(F, "onDrop");

                function j(m) {
                    const w = m.dataTransfer;
                    w && (w.dropEffect = "copy")
                }
                l(j, "onDragover");

                function U(m) {
                    if (!m.clipboardData) return;
                    const w = X(m.clipboardData);
                    if (!w) return;
                    m.stopPropagation(), m.preventDefault();
                    const A = m.currentTarget;
                    A instanceof HTMLTextAreaElement && v(A, w)
                }
                l(U, "onPaste$1");

                function B(m) {
                    return Array.from(m.types).indexOf("Files") >= 0
                }
                l(B, "hasFile");

                function q(m) {
                    const w = "\xA0";
                    return (m.textContent || "").trim().replace(/\|/g, "\\|").replace(/\n/g, " ") || w
                }
                l(q, "columnText");

                function z(m) {
                    return Array.from(m.querySelectorAll("td, th")).map(q)
                }
                l(z, "tableHeaders");

                function Y(m) {
                    const w = Array.from(m.querySelectorAll("tr")),
                        A = w.shift();
                    if (!A) return "";
                    const R = z(A),
                        $ = R.map(() => "--"),
                        K = `${R.join(" | ")}
${$.join(" | ")}
`,
                        V = w.map(G => Array.from(G.querySelectorAll("td")).map(q).join(" | ")).join(`
`);
                    return `
${K}${V}

`
                }
                l(Y, "tableMarkdown");

                function X(m) {
                    if (Array.from(m.types).indexOf("text/html") === -1) return;
                    const w = m.getData("text/html");
                    if (!/<table/i.test(w)) return;
                    let $ = new DOMParser().parseFromString(w, "text/html").querySelector("table");
                    if ($ = !$ || $.closest("[data-paste-markdown-skip]") ? null : $, !$) return;
                    const K = Y($);
                    return w.replace(/<meta.*?>/, "").replace(/<table[.\S\s]*<\/table>/, `
${K}`)
                }
                l(X, "generateText");

                function te(m) {
                    m.addEventListener("paste", ee)
                }
                l(te, "install");

                function Q(m) {
                    m.removeEventListener("paste", ee)
                }
                l(Q, "uninstall");

                function ee(m) {
                    const w = m.clipboardData;
                    if (!w || !ne(w)) return;
                    const A = m.currentTarget;
                    if (!(A instanceof HTMLTextAreaElement)) return;
                    const R = w.getData("text/x-gfm");
                    !R || (m.stopPropagation(), m.preventDefault(), v(A, R))
                }
                l(ee, "onPaste");

                function ne(m) {
                    return Array.from(m.types).indexOf("text/x-gfm") >= 0
                }
                l(ne, "hasMarkdown");

                function re(m) {
                    return D(m), c(m), C(m), te(m), T(m), {
                        unsubscribe: () => {
                            W(m), f(m), a(m), b(m), Q(m)
                        }
                    }
                }
                l(re, "subscribe")
            },
            55498: (H, O, M) => {
                "use strict";
                M.d(O, {
                    I: () => c,
                    p: () => o
                });

                function v(a) {
                    const u = a.parentNode;
                    if (u === null || !(u instanceof HTMLElement)) throw new Error;
                    let h = 0;
                    u instanceof HTMLOListElement && u.start !== 1 && (h = u.start - 1);
                    const d = u.children;
                    for (let p = 0; p < d.length; ++p)
                        if (d[p] === a) return h + p;
                    return h
                }
                l(v, "indexInList");

                function T(a) {
                    if (a instanceof HTMLAnchorElement && a.childNodes.length === 1) {
                        const u = a.childNodes[0];
                        if (u instanceof HTMLImageElement) return u.src === a.href
                    }
                    return !1
                }
                l(T, "skipNode");

                function f(a) {
                    return a.nodeName === "IMG" || a.firstChild != null
                }
                l(f, "hasContent");

                function E(a) {
                    return a.nodeName === "INPUT" && a instanceof HTMLInputElement && a.type === "checkbox"
                }
                l(E, "isCheckbox");
                let n = 0;

                function i(a) {
                    const u = a.childNodes[0],
                        h = a.childNodes[1];
                    return u && a.childNodes.length < 3 ? (u.nodeName === "OL" || u.nodeName === "UL") && (!h || h.nodeType === Node.TEXT_NODE && !(h.textContent || "").trim()) : !1
                }
                l(i, "nestedListExclusive");

                function t(a) {
                    return a.replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }
                l(t, "escapeAttribute");
                const e = {
                    INPUT(a) {
                        return a instanceof HTMLInputElement && a.checked ? "[x] " : "[ ] "
                    },
                    CODE(a) {
                        const u = a.textContent || "";
                        return a.parentNode && a.parentNode.nodeName === "PRE" ? (a.textContent = `\`\`\`
${u.replace(/\n+$/,"")}
\`\`\`

`, a) : u.indexOf("`") >= 0 ? `\`\` ${u} \`\`` : `\`${u}\``
                    },
                    P(a) {
                        const u = document.createElement("p"),
                            h = a.textContent || "";
                        return u.textContent = h.replace(/<(\/?)(pre|strong|weak|em)>/g, "\\<$1$2\\>"), u
                    },
                    STRONG(a) {
                        return `**${a.textContent||""}**`
                    },
                    EM(a) {
                        return `_${a.textContent||""}_`
                    },
                    DEL(a) {
                        return `~${a.textContent||""}~`
                    },
                    BLOCKQUOTE(a) {
                        const u = (a.textContent || "").trim().replace(/^/gm, "> "),
                            h = document.createElement("pre");
                        return h.textContent = `${u}

`, h
                    },
                    A(a) {
                        const u = a.textContent || "",
                            h = a.getAttribute("href");
                        return /^https?:/.test(u) && u === h ? u : h ? `[${u}](${h})` : u
                    },
                    IMG(a) {
                        const u = a.getAttribute("alt") || "",
                            h = a.getAttribute("src");
                        if (!h) throw new Error;
                        const d = a.hasAttribute("width") ? ` width="${t(a.getAttribute("width")||"")}"` : "",
                            p = a.hasAttribute("height") ? ` height="${t(a.getAttribute("height")||"")}"` : "";
                        return d || p ? `<img alt="${t(u)}"${d}${p} src="${t(h)}">` : `![${u}](${h})`
                    },
                    LI(a) {
                        const u = a.parentNode;
                        if (!u) throw new Error;
                        let h = "";
                        i(a) || (u.nodeName === "OL" ? n > 0 && !u.previousSibling ? h = `${v(a)+n+1}\\. ` : h = `${v(a)+1}. ` : h = "* ");
                        const d = h.replace(/\S/g, " "),
                            p = (a.textContent || "").trim().replace(/^/gm, d),
                            g = document.createElement("pre");
                        return g.textContent = p.replace(d, h), g
                    },
                    OL(a) {
                        const u = document.createElement("li");
                        return u.appendChild(document.createElement("br")), a.append(u), a
                    },
                    H1(a) {
                        const u = parseInt(a.nodeName.slice(1));
                        return a.prepend(`${Array(u+1).join("#")} `), a
                    },
                    UL(a) {
                        return a
                    }
                };
                e.UL = e.OL;
                for (let a = 2; a <= 6; ++a) e[`H${a}`] = e.H1;

                function r(a) {
                    const u = document.createNodeIterator(a, NodeFilter.SHOW_ELEMENT, {
                            acceptNode(p) {
                                return p.nodeName in e && !T(p) && (f(p) || E(p)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                            }
                        }),
                        h = [];
                    let d = u.nextNode();
                    for (; d;) d instanceof HTMLElement && h.push(d), d = u.nextNode();
                    h.reverse();
                    for (const p of h) p.replaceWith(e[p.nodeName](p))
                }
                l(r, "insertMarkdownSyntax");

                function s(a, u) {
                    const h = a.startContainer;
                    if (!h || !h.parentNode || !(h.parentNode instanceof HTMLElement)) throw new Error("the range must start within an HTMLElement");
                    const d = h.parentNode;
                    let p = a.cloneContents();
                    if (u) {
                        const k = p.querySelector(u);
                        k && (p = document.createDocumentFragment(), p.appendChild(k))
                    }
                    n = 0;
                    const g = d.closest("li");
                    if (d.closest("pre")) {
                        const k = document.createElement("pre");
                        k.appendChild(p), p = document.createDocumentFragment(), p.appendChild(k)
                    } else if (g && g.parentNode && (g.parentNode.nodeName === "OL" && (n = v(g)), !p.querySelector("li"))) {
                        const k = document.createElement("li");
                        if (!g.parentNode) throw new Error;
                        const L = document.createElement(g.parentNode.nodeName);
                        k.appendChild(p), L.appendChild(k), p = document.createDocumentFragment(), p.appendChild(L)
                    }
                    return p
                }
                l(s, "extractFragment");
                class o {
                    constructor() {
                        this.selection = window.getSelection()
                    }
                    closest(u) {
                        const h = this.range.startContainer,
                            d = h instanceof Element ? h : h.parentElement;
                        return d ? d.closest(u) : null
                    }
                    get active() {
                        var u;
                        return (((u = this.selection) === null || u === void 0 ? void 0 : u.rangeCount) || 0) > 0
                    }
                    get range() {
                        var u;
                        return ((u = this.selection) === null || u === void 0 ? void 0 : u.rangeCount) ? this.selection.getRangeAt(0) : new Range
                    }
                    set range(u) {
                        var h, d;
                        (h = this.selection) === null || h === void 0 || h.removeAllRanges(), (d = this.selection) === null || d === void 0 || d.addRange(u)
                    }
                    get selectionText() {
                        var u;
                        return ((u = this.selection) === null || u === void 0 ? void 0 : u.toString().trim()) || ""
                    }
                    get quotedText() {
                        return `> ${this.selectionText.replace(/\n/g,`
> `)}

`
                    }
                    select(u) {
                        this.selection && (this.selection.removeAllRanges(), this.selection.selectAllChildren(u))
                    }
                    insert(u) {
                        u.value ? u.value = `${u.value}

${this.quotedText}` : u.value = this.quotedText, u.dispatchEvent(new CustomEvent("change", {
                            bubbles: !0,
                            cancelable: !1
                        })), u.focus(), u.selectionStart = u.value.length, u.scrollTop = u.scrollHeight
                    }
                }
                l(o, "Quote");
                class c extends o {
                    constructor(u = "", h) {
                        super();
                        this.scopeSelector = u, this.callback = h
                    }
                    get selectionText() {
                        var u, h;
                        if (!this.selection) return "";
                        const d = s(this.range, (u = this.scopeSelector) !== null && u !== void 0 ? u : "");
                        (h = this.callback) === null || h === void 0 || h.call(this, d), r(d);
                        const p = document.body;
                        if (!p) return "";
                        const g = document.createElement("div");
                        g.appendChild(d), g.style.cssText = "position:absolute;left:-9999px;", p.appendChild(g);
                        let _ = "";
                        try {
                            const k = document.createRange();
                            k.selectNodeContents(g), this.selection.removeAllRanges(), this.selection.addRange(k), _ = this.selection.toString(), this.selection.removeAllRanges(), k.detach()
                        } finally {
                            p.removeChild(g)
                        }
                        return _.trim()
                    }
                }
                l(c, "MarkdownQuote")
            },
            407: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Xm: () => f,
                    e6: () => E,
                    iO: () => n
                });
                let v = null;

                function T(i) {
                    return !!i.id && i.value !== i.defaultValue && i.form !== v
                }
                l(T, "shouldResumeField");

                function f(i, t) {
                    var e, r;
                    const s = (e = t == null ? void 0 : t.selector) !== null && e !== void 0 ? e : ".js-session-resumable",
                        c = `${(r=t==null?void 0:t.keyPrefix)!==null&&r!==void 0?r:"session-resume:"}${i}`,
                        a = [];
                    for (const h of document.querySelectorAll(s))(h instanceof HTMLInputElement || h instanceof HTMLTextAreaElement) && a.push(h);
                    let u = a.filter(h => T(h)).map(h => [h.id, h.value]);
                    if (u.length) try {
                        const h = sessionStorage.getItem(c);
                        if (h !== null) {
                            const p = JSON.parse(h).filter(function(g) {
                                return !u.some(_ => _[0] === g[0])
                            });
                            u = u.concat(p)
                        }
                        sessionStorage.setItem(c, JSON.stringify(u))
                    } catch {}
                }
                l(f, "persistResumableFields");

                function E(i, t) {
                    var e;
                    const s = `${(e=t==null?void 0:t.keyPrefix)!==null&&e!==void 0?e:"session-resume:"}${i}`;
                    let o;
                    try {
                        o = sessionStorage.getItem(s)
                    } catch {}
                    if (!o) return;
                    const c = [],
                        a = [];
                    for (const [u, h] of JSON.parse(o)) {
                        const d = new CustomEvent("session:resume", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {
                                targetId: u,
                                targetValue: h
                            }
                        });
                        if (document.dispatchEvent(d)) {
                            const p = document.getElementById(u);
                            p && (p instanceof HTMLInputElement || p instanceof HTMLTextAreaElement) ? p.value === p.defaultValue && (p.value = h, c.push(p)) : a.push([u, h])
                        }
                    }
                    if (a.length === 0) try {
                        sessionStorage.removeItem(s)
                    } catch {} else sessionStorage.setItem(s, JSON.stringify(a));
                    setTimeout(function() {
                        for (const u of c) u.dispatchEvent(new CustomEvent("change", {
                            bubbles: !0,
                            cancelable: !0
                        }))
                    }, 0)
                }
                l(E, "restoreResumableFields");

                function n(i) {
                    v = i.target, setTimeout(function() {
                        i.defaultPrevented && (v = null)
                    }, 0)
                }
                l(n, "setForm")
            },
            54430: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Z: () => T
                });

                function v(f) {
                    var E = null,
                        n = !1,
                        i = void 0,
                        t = void 0,
                        e = void 0;

                    function r(d) {
                        if (i !== d.clientX || t !== d.clientY) {
                            var p = f.style.height;
                            e && e !== p && (n = !0, f.style.maxHeight = "", f.removeEventListener("mousemove", r)), e = p
                        }
                        i = d.clientX, t = d.clientY
                    }
                    l(r, "onUserResize");
                    var s = f.ownerDocument,
                        o = s.documentElement;

                    function c() {
                        for (var d = 0, p = f; p !== s.body && p !== null;) d += p.offsetTop || 0, p = p.offsetParent;
                        var g = d - s.defaultView.pageYOffset,
                            _ = o.clientHeight - (g + f.offsetHeight);
                        return {
                            top: g,
                            bottom: _
                        }
                    }
                    l(c, "overflowOffset");

                    function a() {
                        if (!n && f.value !== E && !(f.offsetWidth <= 0 && f.offsetHeight <= 0)) {
                            var d = c(),
                                p = d.top,
                                g = d.bottom;
                            if (!(p < 0 || g < 0)) {
                                var _ = Number(getComputedStyle(f).height.replace(/px/, "")) + g;
                                f.style.maxHeight = _ - 100 + "px";
                                var k = f.parentElement;
                                if (k instanceof HTMLElement) {
                                    var L = k.style.height;
                                    k.style.height = getComputedStyle(k).height, f.style.height = "auto", f.style.height = f.scrollHeight + "px", k.style.height = L, e = f.style.height
                                }
                                E = f.value
                            }
                        }
                    }
                    l(a, "sizeToFit");

                    function u() {
                        n = !1, f.style.height = "", f.style.maxHeight = ""
                    }
                    l(u, "onFormReset"), f.addEventListener("mousemove", r), f.addEventListener("input", a), f.addEventListener("change", a);
                    var h = f.form;
                    return h && h.addEventListener("reset", u), f.value && a(), {
                        unsubscribe: l(function() {
                            f.removeEventListener("mousemove", r), f.removeEventListener("input", a), f.removeEventListener("change", a), h && h.removeEventListener("reset", u)
                        }, "unsubscribe")
                    }
                }
                l(v, "autosize");
                const T = v
            },
            48168: (H, O, M) => {
                const v = M(39092),
                    T = {};
                for (const n of Object.keys(v)) T[v[n]] = n;
                const f = {
                    rgb: {
                        channels: 3,
                        labels: "rgb"
                    },
                    hsl: {
                        channels: 3,
                        labels: "hsl"
                    },
                    hsv: {
                        channels: 3,
                        labels: "hsv"
                    },
                    hwb: {
                        channels: 3,
                        labels: "hwb"
                    },
                    cmyk: {
                        channels: 4,
                        labels: "cmyk"
                    },
                    xyz: {
                        channels: 3,
                        labels: "xyz"
                    },
                    lab: {
                        channels: 3,
                        labels: "lab"
                    },
                    lch: {
                        channels: 3,
                        labels: "lch"
                    },
                    hex: {
                        channels: 1,
                        labels: ["hex"]
                    },
                    keyword: {
                        channels: 1,
                        labels: ["keyword"]
                    },
                    ansi16: {
                        channels: 1,
                        labels: ["ansi16"]
                    },
                    ansi256: {
                        channels: 1,
                        labels: ["ansi256"]
                    },
                    hcg: {
                        channels: 3,
                        labels: ["h", "c", "g"]
                    },
                    apple: {
                        channels: 3,
                        labels: ["r16", "g16", "b16"]
                    },
                    gray: {
                        channels: 1,
                        labels: ["gray"]
                    }
                };
                H.exports = f;
                for (const n of Object.keys(f)) {
                    if (!("channels" in f[n])) throw new Error("missing channels property: " + n);
                    if (!("labels" in f[n])) throw new Error("missing channel labels property: " + n);
                    if (f[n].labels.length !== f[n].channels) throw new Error("channel and label counts mismatch: " + n);
                    const {
                        channels: i,
                        labels: t
                    } = f[n];
                    delete f[n].channels, delete f[n].labels, Object.defineProperty(f[n], "channels", {
                        value: i
                    }), Object.defineProperty(f[n], "labels", {
                        value: t
                    })
                }
                f.rgb.hsl = function(n) {
                    const i = n[0] / 255,
                        t = n[1] / 255,
                        e = n[2] / 255,
                        r = Math.min(i, t, e),
                        s = Math.max(i, t, e),
                        o = s - r;
                    let c, a;
                    s === r ? c = 0 : i === s ? c = (t - e) / o : t === s ? c = 2 + (e - i) / o : e === s && (c = 4 + (i - t) / o), c = Math.min(c * 60, 360), c < 0 && (c += 360);
                    const u = (r + s) / 2;
                    return s === r ? a = 0 : u <= .5 ? a = o / (s + r) : a = o / (2 - s - r), [c, a * 100, u * 100]
                }, f.rgb.hsv = function(n) {
                    let i, t, e, r, s;
                    const o = n[0] / 255,
                        c = n[1] / 255,
                        a = n[2] / 255,
                        u = Math.max(o, c, a),
                        h = u - Math.min(o, c, a),
                        d = l(function(p) {
                            return (u - p) / 6 / h + 1 / 2
                        }, "diffc");
                    return h === 0 ? (r = 0, s = 0) : (s = h / u, i = d(o), t = d(c), e = d(a), o === u ? r = e - t : c === u ? r = 1 / 3 + i - e : a === u && (r = 2 / 3 + t - i), r < 0 ? r += 1 : r > 1 && (r -= 1)), [r * 360, s * 100, u * 100]
                }, f.rgb.hwb = function(n) {
                    const i = n[0],
                        t = n[1];
                    let e = n[2];
                    const r = f.rgb.hsl(n)[0],
                        s = 1 / 255 * Math.min(i, Math.min(t, e));
                    return e = 1 - 1 / 255 * Math.max(i, Math.max(t, e)), [r, s * 100, e * 100]
                }, f.rgb.cmyk = function(n) {
                    const i = n[0] / 255,
                        t = n[1] / 255,
                        e = n[2] / 255,
                        r = Math.min(1 - i, 1 - t, 1 - e),
                        s = (1 - i - r) / (1 - r) || 0,
                        o = (1 - t - r) / (1 - r) || 0,
                        c = (1 - e - r) / (1 - r) || 0;
                    return [s * 100, o * 100, c * 100, r * 100]
                };

                function E(n, i) {
                    return (n[0] - i[0]) ** 2 + (n[1] - i[1]) ** 2 + (n[2] - i[2]) ** 2
                }
                l(E, "comparativeDistance"), f.rgb.keyword = function(n) {
                    const i = T[n];
                    if (i) return i;
                    let t = 1 / 0,
                        e;
                    for (const r of Object.keys(v)) {
                        const s = v[r],
                            o = E(n, s);
                        o < t && (t = o, e = r)
                    }
                    return e
                }, f.keyword.rgb = function(n) {
                    return v[n]
                }, f.rgb.xyz = function(n) {
                    let i = n[0] / 255,
                        t = n[1] / 255,
                        e = n[2] / 255;
                    i = i > .04045 ? ((i + .055) / 1.055) ** 2.4 : i / 12.92, t = t > .04045 ? ((t + .055) / 1.055) ** 2.4 : t / 12.92, e = e > .04045 ? ((e + .055) / 1.055) ** 2.4 : e / 12.92;
                    const r = i * .4124 + t * .3576 + e * .1805,
                        s = i * .2126 + t * .7152 + e * .0722,
                        o = i * .0193 + t * .1192 + e * .9505;
                    return [r * 100, s * 100, o * 100]
                }, f.rgb.lab = function(n) {
                    const i = f.rgb.xyz(n);
                    let t = i[0],
                        e = i[1],
                        r = i[2];
                    t /= 95.047, e /= 100, r /= 108.883, t = t > .008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116, e = e > .008856 ? e ** (1 / 3) : 7.787 * e + 16 / 116, r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116;
                    const s = 116 * e - 16,
                        o = 500 * (t - e),
                        c = 200 * (e - r);
                    return [s, o, c]
                }, f.hsl.rgb = function(n) {
                    const i = n[0] / 360,
                        t = n[1] / 100,
                        e = n[2] / 100;
                    let r, s, o;
                    if (t === 0) return o = e * 255, [o, o, o];
                    e < .5 ? r = e * (1 + t) : r = e + t - e * t;
                    const c = 2 * e - r,
                        a = [0, 0, 0];
                    for (let u = 0; u < 3; u++) s = i + 1 / 3 * -(u - 1), s < 0 && s++, s > 1 && s--, 6 * s < 1 ? o = c + (r - c) * 6 * s : 2 * s < 1 ? o = r : 3 * s < 2 ? o = c + (r - c) * (2 / 3 - s) * 6 : o = c, a[u] = o * 255;
                    return a
                }, f.hsl.hsv = function(n) {
                    const i = n[0];
                    let t = n[1] / 100,
                        e = n[2] / 100,
                        r = t;
                    const s = Math.max(e, .01);
                    e *= 2, t *= e <= 1 ? e : 2 - e, r *= s <= 1 ? s : 2 - s;
                    const o = (e + t) / 2,
                        c = e === 0 ? 2 * r / (s + r) : 2 * t / (e + t);
                    return [i, c * 100, o * 100]
                }, f.hsv.rgb = function(n) {
                    const i = n[0] / 60,
                        t = n[1] / 100;
                    let e = n[2] / 100;
                    const r = Math.floor(i) % 6,
                        s = i - Math.floor(i),
                        o = 255 * e * (1 - t),
                        c = 255 * e * (1 - t * s),
                        a = 255 * e * (1 - t * (1 - s));
                    switch (e *= 255, r) {
                        case 0:
                            return [e, a, o];
                        case 1:
                            return [c, e, o];
                        case 2:
                            return [o, e, a];
                        case 3:
                            return [o, c, e];
                        case 4:
                            return [a, o, e];
                        case 5:
                            return [e, o, c]
                    }
                }, f.hsv.hsl = function(n) {
                    const i = n[0],
                        t = n[1] / 100,
                        e = n[2] / 100,
                        r = Math.max(e, .01);
                    let s, o;
                    o = (2 - t) * e;
                    const c = (2 - t) * r;
                    return s = t * r, s /= c <= 1 ? c : 2 - c, s = s || 0, o /= 2, [i, s * 100, o * 100]
                }, f.hwb.rgb = function(n) {
                    const i = n[0] / 360;
                    let t = n[1] / 100,
                        e = n[2] / 100;
                    const r = t + e;
                    let s;
                    r > 1 && (t /= r, e /= r);
                    const o = Math.floor(6 * i),
                        c = 1 - e;
                    s = 6 * i - o, (o & 1) !== 0 && (s = 1 - s);
                    const a = t + s * (c - t);
                    let u, h, d;
                    switch (o) {
                        default:
                            case 6:
                            case 0:
                            u = c,
                        h = a,
                        d = t;
                        break;
                        case 1:
                                u = a,
                            h = c,
                            d = t;
                            break;
                        case 2:
                                u = t,
                            h = c,
                            d = a;
                            break;
                        case 3:
                                u = t,
                            h = a,
                            d = c;
                            break;
                        case 4:
                                u = a,
                            h = t,
                            d = c;
                            break;
                        case 5:
                                u = c,
                            h = t,
                            d = a;
                            break
                    }
                    return [u * 255, h * 255, d * 255]
                }, f.cmyk.rgb = function(n) {
                    const i = n[0] / 100,
                        t = n[1] / 100,
                        e = n[2] / 100,
                        r = n[3] / 100,
                        s = 1 - Math.min(1, i * (1 - r) + r),
                        o = 1 - Math.min(1, t * (1 - r) + r),
                        c = 1 - Math.min(1, e * (1 - r) + r);
                    return [s * 255, o * 255, c * 255]
                }, f.xyz.rgb = function(n) {
                    const i = n[0] / 100,
                        t = n[1] / 100,
                        e = n[2] / 100;
                    let r, s, o;
                    return r = i * 3.2406 + t * -1.5372 + e * -.4986, s = i * -.9689 + t * 1.8758 + e * .0415, o = i * .0557 + t * -.204 + e * 1.057, r = r > .0031308 ? 1.055 * r ** (1 / 2.4) - .055 : r * 12.92, s = s > .0031308 ? 1.055 * s ** (1 / 2.4) - .055 : s * 12.92, o = o > .0031308 ? 1.055 * o ** (1 / 2.4) - .055 : o * 12.92, r = Math.min(Math.max(0, r), 1), s = Math.min(Math.max(0, s), 1), o = Math.min(Math.max(0, o), 1), [r * 255, s * 255, o * 255]
                }, f.xyz.lab = function(n) {
                    let i = n[0],
                        t = n[1],
                        e = n[2];
                    i /= 95.047, t /= 100, e /= 108.883, i = i > .008856 ? i ** (1 / 3) : 7.787 * i + 16 / 116, t = t > .008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116, e = e > .008856 ? e ** (1 / 3) : 7.787 * e + 16 / 116;
                    const r = 116 * t - 16,
                        s = 500 * (i - t),
                        o = 200 * (t - e);
                    return [r, s, o]
                }, f.lab.xyz = function(n) {
                    const i = n[0],
                        t = n[1],
                        e = n[2];
                    let r, s, o;
                    s = (i + 16) / 116, r = t / 500 + s, o = s - e / 200;
                    const c = s ** 3,
                        a = r ** 3,
                        u = o ** 3;
                    return s = c > .008856 ? c : (s - 16 / 116) / 7.787, r = a > .008856 ? a : (r - 16 / 116) / 7.787, o = u > .008856 ? u : (o - 16 / 116) / 7.787, r *= 95.047, s *= 100, o *= 108.883, [r, s, o]
                }, f.lab.lch = function(n) {
                    const i = n[0],
                        t = n[1],
                        e = n[2];
                    let r;
                    r = Math.atan2(e, t) * 360 / 2 / Math.PI, r < 0 && (r += 360);
                    const o = Math.sqrt(t * t + e * e);
                    return [i, o, r]
                }, f.lch.lab = function(n) {
                    const i = n[0],
                        t = n[1],
                        r = n[2] / 360 * 2 * Math.PI,
                        s = t * Math.cos(r),
                        o = t * Math.sin(r);
                    return [i, s, o]
                }, f.rgb.ansi16 = function(n, i = null) {
                    const [t, e, r] = n;
                    let s = i === null ? f.rgb.hsv(n)[2] : i;
                    if (s = Math.round(s / 50), s === 0) return 30;
                    let o = 30 + (Math.round(r / 255) << 2 | Math.round(e / 255) << 1 | Math.round(t / 255));
                    return s === 2 && (o += 60), o
                }, f.hsv.ansi16 = function(n) {
                    return f.rgb.ansi16(f.hsv.rgb(n), n[2])
                }, f.rgb.ansi256 = function(n) {
                    const i = n[0],
                        t = n[1],
                        e = n[2];
                    return i === t && t === e ? i < 8 ? 16 : i > 248 ? 231 : Math.round((i - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(i / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(e / 255 * 5)
                }, f.ansi16.rgb = function(n) {
                    let i = n % 10;
                    if (i === 0 || i === 7) return n > 50 && (i += 3.5), i = i / 10.5 * 255, [i, i, i];
                    const t = (~~(n > 50) + 1) * .5,
                        e = (i & 1) * t * 255,
                        r = (i >> 1 & 1) * t * 255,
                        s = (i >> 2 & 1) * t * 255;
                    return [e, r, s]
                }, f.ansi256.rgb = function(n) {
                    if (n >= 232) {
                        const s = (n - 232) * 10 + 8;
                        return [s, s, s]
                    }
                    n -= 16;
                    let i;
                    const t = Math.floor(n / 36) / 5 * 255,
                        e = Math.floor((i = n % 36) / 6) / 5 * 255,
                        r = i % 6 / 5 * 255;
                    return [t, e, r]
                }, f.rgb.hex = function(n) {
                    const t = (((Math.round(n[0]) & 255) << 16) + ((Math.round(n[1]) & 255) << 8) + (Math.round(n[2]) & 255)).toString(16).toUpperCase();
                    return "000000".substring(t.length) + t
                }, f.hex.rgb = function(n) {
                    const i = n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                    if (!i) return [0, 0, 0];
                    let t = i[0];
                    i[0].length === 3 && (t = t.split("").map(c => c + c).join(""));
                    const e = parseInt(t, 16),
                        r = e >> 16 & 255,
                        s = e >> 8 & 255,
                        o = e & 255;
                    return [r, s, o]
                }, f.rgb.hcg = function(n) {
                    const i = n[0] / 255,
                        t = n[1] / 255,
                        e = n[2] / 255,
                        r = Math.max(Math.max(i, t), e),
                        s = Math.min(Math.min(i, t), e),
                        o = r - s;
                    let c, a;
                    return o < 1 ? c = s / (1 - o) : c = 0, o <= 0 ? a = 0 : r === i ? a = (t - e) / o % 6 : r === t ? a = 2 + (e - i) / o : a = 4 + (i - t) / o, a /= 6, a %= 1, [a * 360, o * 100, c * 100]
                }, f.hsl.hcg = function(n) {
                    const i = n[1] / 100,
                        t = n[2] / 100,
                        e = t < .5 ? 2 * i * t : 2 * i * (1 - t);
                    let r = 0;
                    return e < 1 && (r = (t - .5 * e) / (1 - e)), [n[0], e * 100, r * 100]
                }, f.hsv.hcg = function(n) {
                    const i = n[1] / 100,
                        t = n[2] / 100,
                        e = i * t;
                    let r = 0;
                    return e < 1 && (r = (t - e) / (1 - e)), [n[0], e * 100, r * 100]
                }, f.hcg.rgb = function(n) {
                    const i = n[0] / 360,
                        t = n[1] / 100,
                        e = n[2] / 100;
                    if (t === 0) return [e * 255, e * 255, e * 255];
                    const r = [0, 0, 0],
                        s = i % 1 * 6,
                        o = s % 1,
                        c = 1 - o;
                    let a = 0;
                    switch (Math.floor(s)) {
                        case 0:
                            r[0] = 1, r[1] = o, r[2] = 0;
                            break;
                        case 1:
                            r[0] = c, r[1] = 1, r[2] = 0;
                            break;
                        case 2:
                            r[0] = 0, r[1] = 1, r[2] = o;
                            break;
                        case 3:
                            r[0] = 0, r[1] = c, r[2] = 1;
                            break;
                        case 4:
                            r[0] = o, r[1] = 0, r[2] = 1;
                            break;
                        default:
                            r[0] = 1, r[1] = 0, r[2] = c
                    }
                    return a = (1 - t) * e, [(t * r[0] + a) * 255, (t * r[1] + a) * 255, (t * r[2] + a) * 255]
                }, f.hcg.hsv = function(n) {
                    const i = n[1] / 100,
                        t = n[2] / 100,
                        e = i + t * (1 - i);
                    let r = 0;
                    return e > 0 && (r = i / e), [n[0], r * 100, e * 100]
                }, f.hcg.hsl = function(n) {
                    const i = n[1] / 100,
                        e = n[2] / 100 * (1 - i) + .5 * i;
                    let r = 0;
                    return e > 0 && e < .5 ? r = i / (2 * e) : e >= .5 && e < 1 && (r = i / (2 * (1 - e))), [n[0], r * 100, e * 100]
                }, f.hcg.hwb = function(n) {
                    const i = n[1] / 100,
                        t = n[2] / 100,
                        e = i + t * (1 - i);
                    return [n[0], (e - i) * 100, (1 - e) * 100]
                }, f.hwb.hcg = function(n) {
                    const i = n[1] / 100,
                        t = n[2] / 100,
                        e = 1 - t,
                        r = e - i;
                    let s = 0;
                    return r < 1 && (s = (e - r) / (1 - r)), [n[0], r * 100, s * 100]
                }, f.apple.rgb = function(n) {
                    return [n[0] / 65535 * 255, n[1] / 65535 * 255, n[2] / 65535 * 255]
                }, f.rgb.apple = function(n) {
                    return [n[0] / 255 * 65535, n[1] / 255 * 65535, n[2] / 255 * 65535]
                }, f.gray.rgb = function(n) {
                    return [n[0] / 100 * 255, n[0] / 100 * 255, n[0] / 100 * 255]
                }, f.gray.hsl = function(n) {
                    return [0, 0, n[0]]
                }, f.gray.hsv = f.gray.hsl, f.gray.hwb = function(n) {
                    return [0, 100, n[0]]
                }, f.gray.cmyk = function(n) {
                    return [0, 0, 0, n[0]]
                }, f.gray.lab = function(n) {
                    return [n[0], 0, 0]
                }, f.gray.hex = function(n) {
                    const i = Math.round(n[0] / 100 * 255) & 255,
                        e = ((i << 16) + (i << 8) + i).toString(16).toUpperCase();
                    return "000000".substring(e.length) + e
                }, f.rgb.gray = function(n) {
                    return [(n[0] + n[1] + n[2]) / 3 / 255 * 100]
                }
            },
            12085: (H, O, M) => {
                const v = M(48168),
                    T = M(4111),
                    f = {},
                    E = Object.keys(v);

                function n(t) {
                    const e = l(function(...r) {
                        const s = r[0];
                        return s == null ? s : (s.length > 1 && (r = s), t(r))
                    }, "wrappedFn");
                    return "conversion" in t && (e.conversion = t.conversion), e
                }
                l(n, "wrapRaw");

                function i(t) {
                    const e = l(function(...r) {
                        const s = r[0];
                        if (s == null) return s;
                        s.length > 1 && (r = s);
                        const o = t(r);
                        if (typeof o == "object")
                            for (let c = o.length, a = 0; a < c; a++) o[a] = Math.round(o[a]);
                        return o
                    }, "wrappedFn");
                    return "conversion" in t && (e.conversion = t.conversion), e
                }
                l(i, "wrapRounded"), E.forEach(t => {
                    f[t] = {}, Object.defineProperty(f[t], "channels", {
                        value: v[t].channels
                    }), Object.defineProperty(f[t], "labels", {
                        value: v[t].labels
                    });
                    const e = T(t);
                    Object.keys(e).forEach(s => {
                        const o = e[s];
                        f[t][s] = i(o), f[t][s].raw = n(o)
                    })
                }), H.exports = f
            },
            39092: H => {
                "use strict";
                H.exports = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                }
            },
            4111: (H, O, M) => {
                const v = M(48168);

                function T() {
                    const i = {},
                        t = Object.keys(v);
                    for (let e = t.length, r = 0; r < e; r++) i[t[r]] = {
                        distance: -1,
                        parent: null
                    };
                    return i
                }
                l(T, "buildGraph");

                function f(i) {
                    const t = T(),
                        e = [i];
                    for (t[i].distance = 0; e.length;) {
                        const r = e.pop(),
                            s = Object.keys(v[r]);
                        for (let o = s.length, c = 0; c < o; c++) {
                            const a = s[c],
                                u = t[a];
                            u.distance === -1 && (u.distance = t[r].distance + 1, u.parent = r, e.unshift(a))
                        }
                    }
                    return t
                }
                l(f, "deriveBFS");

                function E(i, t) {
                    return function(e) {
                        return t(i(e))
                    }
                }
                l(E, "link");

                function n(i, t) {
                    const e = [t[i].parent, i];
                    let r = v[t[i].parent][i],
                        s = t[i].parent;
                    for (; t[s].parent;) e.unshift(t[s].parent), r = E(v[t[s].parent][s], r), s = t[s].parent;
                    return r.conversion = e, r
                }
                l(n, "wrapConversion"), H.exports = function(i) {
                    const t = f(i),
                        e = {},
                        r = Object.keys(t);
                    for (let s = r.length, o = 0; o < s; o++) {
                        const c = r[o];
                        t[c].parent !== null && (e[c] = n(c, t))
                    }
                    return e
                }
            },
            47142: (H, O, M) => {
                "use strict";
                M.d(O, {
                    CD: () => p,
                    Gs: () => h,
                    m7: () => d
                });
                var v = -1 / 0,
                    T = 1 / 0,
                    f = -.005,
                    E = -.005,
                    n = -.01,
                    i = 1,
                    t = .9,
                    e = .8,
                    r = .7,
                    s = .6;

                function o(g) {
                    return g.toLowerCase() === g
                }
                l(o, "islower");

                function c(g) {
                    return g.toUpperCase() === g
                }
                l(c, "isupper");

                function a(g) {
                    for (var _ = g.length, k = new Array(_), L = "/", N = 0; N < _; N++) {
                        var C = g[N];
                        L === "/" ? k[N] = t : L === "-" || L === "_" || L === " " ? k[N] = e : L === "." ? k[N] = s : o(L) && c(C) ? k[N] = r : k[N] = 0, L = C
                    }
                    return k
                }
                l(a, "precompute_bonus");

                function u(g, _, k, L) {
                    for (var N = g.length, C = _.length, b = g.toLowerCase(), y = _.toLowerCase(), x = a(_, x), S = 0; S < N; S++) {
                        k[S] = new Array(C), L[S] = new Array(C);
                        for (var I = v, P = S === N - 1 ? E : n, D = 0; D < C; D++)
                            if (b[S] === y[D]) {
                                var W = v;
                                S ? D && (W = Math.max(L[S - 1][D - 1] + x[D], k[S - 1][D - 1] + i)) : W = D * f + x[D], k[S][D] = W, L[S][D] = I = Math.max(W, I + P)
                            } else k[S][D] = v, L[S][D] = I = I + P
                    }
                }
                l(u, "compute");

                function h(g, _) {
                    var k = g.length,
                        L = _.length;
                    if (!k || !L) return v;
                    if (k === L) return T;
                    if (L > 1024) return v;
                    var N = new Array(k),
                        C = new Array(k);
                    return u(g, _, N, C), C[k - 1][L - 1]
                }
                l(h, "score");

                function d(g, _) {
                    var k = g.length,
                        L = _.length,
                        N = new Array(k);
                    if (!k || !L) return N;
                    if (k === L) {
                        for (var C = 0; C < k; C++) N[C] = C;
                        return N
                    }
                    if (L > 1024) return N;
                    var b = new Array(k),
                        y = new Array(k);
                    u(g, _, b, y);
                    for (var x = !1, C = k - 1, S = L - 1; C >= 0; C--)
                        for (; S >= 0; S--)
                            if (b[C][S] !== v && (x || b[C][S] === y[C][S])) {
                                x = C && S && y[C][S] === b[C - 1][S - 1] + i, N[C] = S--;
                                break
                            }
                    return N
                }
                l(d, "positions");

                function p(g, _) {
                    g = g.toLowerCase(), _ = _.toLowerCase();
                    for (var k = g.length, L = 0, N = 0; L < k; L += 1)
                        if (N = _.indexOf(g[L], N) + 1, N === 0) return !1;
                    return !0
                }
                l(p, "hasMatch")
            },
            28382: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Q: () => T
                });
                var v = "<unknown>";

                function T(h) {
                    var d = h.split(`
`);
                    return d.reduce(function(p, g) {
                        var _ = n(g) || t(g) || s(g) || u(g) || c(g);
                        return _ && p.push(_), p
                    }, [])
                }
                l(T, "parse");
                var f = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
                    E = /\((\S*)(?::(\d+))(?::(\d+))\)/;

                function n(h) {
                    var d = f.exec(h);
                    if (!d) return null;
                    var p = d[2] && d[2].indexOf("native") === 0,
                        g = d[2] && d[2].indexOf("eval") === 0,
                        _ = E.exec(d[2]);
                    return g && _ != null && (d[2] = _[1], d[3] = _[2], d[4] = _[3]), {
                        file: p ? null : d[2],
                        methodName: d[1] || v,
                        arguments: p ? [d[2]] : [],
                        lineNumber: d[3] ? +d[3] : null,
                        column: d[4] ? +d[4] : null
                    }
                }
                l(n, "parseChrome");
                var i = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;

                function t(h) {
                    var d = i.exec(h);
                    return d ? {
                        file: d[2],
                        methodName: d[1] || v,
                        arguments: [],
                        lineNumber: +d[3],
                        column: d[4] ? +d[4] : null
                    } : null
                }
                l(t, "parseWinjs");
                var e = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
                    r = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

                function s(h) {
                    var d = e.exec(h);
                    if (!d) return null;
                    var p = d[3] && d[3].indexOf(" > eval") > -1,
                        g = r.exec(d[3]);
                    return p && g != null && (d[3] = g[1], d[4] = g[2], d[5] = null), {
                        file: d[3],
                        methodName: d[1] || v,
                        arguments: d[2] ? d[2].split(",") : [],
                        lineNumber: d[4] ? +d[4] : null,
                        column: d[5] ? +d[5] : null
                    }
                }
                l(s, "parseGecko");
                var o = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;

                function c(h) {
                    var d = o.exec(h);
                    return d ? {
                        file: d[3],
                        methodName: d[1] || v,
                        arguments: [],
                        lineNumber: +d[4],
                        column: d[5] ? +d[5] : null
                    } : null
                }
                l(c, "parseJSC");
                var a = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;

                function u(h) {
                    var d = a.exec(h);
                    return d ? {
                        file: d[2],
                        methodName: d[1] || v,
                        arguments: [],
                        lineNumber: +d[3],
                        column: d[4] ? +d[4] : null
                    } : null
                }
                l(u, "parseNode")
            },
            82131: (H, O, M) => {
                "use strict";
                M.d(O, {
                    CA: () => S,
                    Tb: () => x,
                    Tx: () => y,
                    Y: () => h,
                    kz: () => g
                });
                var v, T, f, E, n = l(function(I, P) {
                        return {
                            name: I,
                            value: P === void 0 ? -1 : P,
                            delta: 0,
                            entries: [],
                            id: "v2-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
                        }
                    }, "a"),
                    i = l(function(I, P) {
                        try {
                            if (PerformanceObserver.supportedEntryTypes.includes(I)) {
                                if (I === "first-input" && !("PerformanceEventTiming" in self)) return;
                                var D = new PerformanceObserver(function(W) {
                                    return W.getEntries().map(P)
                                });
                                return D.observe({
                                    type: I,
                                    buffered: !0
                                }), D
                            }
                        } catch {}
                    }, "r"),
                    t = l(function(I, P) {
                        var D = l(function W(F) {
                            F.type !== "pagehide" && document.visibilityState !== "hidden" || (I(F), P && (removeEventListener("visibilitychange", W, !0), removeEventListener("pagehide", W, !0)))
                        }, "n");
                        addEventListener("visibilitychange", D, !0), addEventListener("pagehide", D, !0)
                    }, "o"),
                    e = l(function(I) {
                        addEventListener("pageshow", function(P) {
                            P.persisted && I(P)
                        }, !0)
                    }, "u"),
                    r = typeof WeakSet == "function" ? new WeakSet : new Set,
                    s = l(function(I, P, D) {
                        var W;
                        return function() {
                            P.value >= 0 && (D || r.has(P) || document.visibilityState === "hidden") && (P.delta = P.value - (W || 0), (P.delta || W === void 0) && (W = P.value, I(P)))
                        }
                    }, "f"),
                    o = -1,
                    c = l(function() {
                        return document.visibilityState === "hidden" ? 0 : 1 / 0
                    }, "m"),
                    a = l(function() {
                        t(function(I) {
                            var P = I.timeStamp;
                            o = P
                        }, !0)
                    }, "d"),
                    u = l(function() {
                        return o < 0 && (o = c(), a(), e(function() {
                            setTimeout(function() {
                                o = c(), a()
                            }, 0)
                        })), {
                            get firstHiddenTime() {
                                return o
                            }
                        }
                    }, "v"),
                    h = l(function(I, P) {
                        var D, W = u(),
                            F = n("FCP"),
                            j = l(function(q) {
                                q.name === "first-contentful-paint" && (B && B.disconnect(), q.startTime < W.firstHiddenTime && (F.value = q.startTime, F.entries.push(q), r.add(F), D()))
                            }, "s"),
                            U = performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0],
                            B = U ? null : i("paint", j);
                        (U || B) && (D = s(I, F, P), U && j(U), e(function(q) {
                            F = n("FCP"), D = s(I, F, P), requestAnimationFrame(function() {
                                requestAnimationFrame(function() {
                                    F.value = performance.now() - q.timeStamp, r.add(F), D()
                                })
                            })
                        }))
                    }, "p"),
                    d = !1,
                    p = -1,
                    g = l(function(I, P) {
                        d || (h(function(z) {
                            p = z.value
                        }), d = !0);
                        var D, W = l(function(z) {
                                p > -1 && I(z)
                            }, "i"),
                            F = n("CLS", 0),
                            j = 0,
                            U = [],
                            B = l(function(z) {
                                if (!z.hadRecentInput) {
                                    var Y = U[0],
                                        X = U[U.length - 1];
                                    j && z.startTime - X.startTime < 1e3 && z.startTime - Y.startTime < 5e3 ? (j += z.value, U.push(z)) : (j = z.value, U = [z]), j > F.value && (F.value = j, F.entries = U, D())
                                }
                            }, "d"),
                            q = i("layout-shift", B);
                        q && (D = s(W, F, P), t(function() {
                            q.takeRecords().map(B), D()
                        }), e(function() {
                            j = 0, p = -1, F = n("CLS", 0), D = s(W, F, P)
                        }))
                    }, "y"),
                    _ = {
                        passive: !0,
                        capture: !0
                    },
                    k = new Date,
                    L = l(function(I, P) {
                        v || (v = P, T = I, f = new Date, b(removeEventListener), N())
                    }, "E"),
                    N = l(function() {
                        if (T >= 0 && T < f - k) {
                            var I = {
                                entryType: "first-input",
                                name: v.type,
                                target: v.target,
                                cancelable: v.cancelable,
                                startTime: v.timeStamp,
                                processingStart: v.timeStamp + T
                            };
                            E.forEach(function(P) {
                                P(I)
                            }), E = []
                        }
                    }, "S"),
                    C = l(function(I) {
                        if (I.cancelable) {
                            var P = (I.timeStamp > 1e12 ? new Date : performance.now()) - I.timeStamp;
                            I.type == "pointerdown" ? function(D, W) {
                                var F = l(function() {
                                        L(D, W), U()
                                    }, "n"),
                                    j = l(function() {
                                        U()
                                    }, "i"),
                                    U = l(function() {
                                        removeEventListener("pointerup", F, _), removeEventListener("pointercancel", j, _)
                                    }, "a");
                                addEventListener("pointerup", F, _), addEventListener("pointercancel", j, _)
                            }(P, I) : L(P, I)
                        }
                    }, "w"),
                    b = l(function(I) {
                        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(P) {
                            return I(P, C, _)
                        })
                    }, "L"),
                    y = l(function(I, P) {
                        var D, W = u(),
                            F = n("FID"),
                            j = l(function(B) {
                                B.startTime < W.firstHiddenTime && (F.value = B.processingStart - B.startTime, F.entries.push(B), r.add(F), D())
                            }, "l"),
                            U = i("first-input", j);
                        D = s(I, F, P), U && t(function() {
                            U.takeRecords().map(j), U.disconnect()
                        }, !0), U && e(function() {
                            var B;
                            F = n("FID"), D = s(I, F, P), E = [], T = -1, v = null, b(addEventListener), B = j, E.push(B), N()
                        })
                    }, "b"),
                    x = l(function(I, P) {
                        var D, W = u(),
                            F = n("LCP"),
                            j = l(function(q) {
                                var z = q.startTime;
                                z < W.firstHiddenTime && (F.value = z, F.entries.push(q)), D()
                            }, "m"),
                            U = i("largest-contentful-paint", j);
                        if (U) {
                            D = s(I, F, P);
                            var B = l(function() {
                                r.has(F) || (U.takeRecords().map(j), U.disconnect(), r.add(F), D())
                            }, "p");
                            ["keydown", "click"].forEach(function(q) {
                                addEventListener(q, B, {
                                    once: !0,
                                    capture: !0
                                })
                            }), t(B, !0), e(function(q) {
                                F = n("LCP"), D = s(I, F, P), requestAnimationFrame(function() {
                                    requestAnimationFrame(function() {
                                        F.value = performance.now() - q.timeStamp, r.add(F), D()
                                    })
                                })
                            })
                        }
                    }, "F"),
                    S = l(function(I) {
                        var P, D = n("TTFB");
                        P = l(function() {
                            try {
                                var W = performance.getEntriesByType("navigation")[0] || function() {
                                    var F = performance.timing,
                                        j = {
                                            entryType: "navigation",
                                            startTime: 0
                                        };
                                    for (var U in F) U !== "navigationStart" && U !== "toJSON" && (j[U] = Math.max(F[U] - F.navigationStart, 0));
                                    return j
                                }();
                                if (D.value = D.delta = W.responseStart, D.value < 0) return;
                                D.entries = [W], I(D)
                            } catch {}
                        }, "t"), document.readyState === "complete" ? setTimeout(P, 0) : addEventListener("pageshow", P)
                    }, "k")
            },
            27907: (H, O, M) => {
                "use strict";
                M.d(O, {
                    a: () => s
                });
                var v = M(81855),
                    T = M(60835),
                    f = M(16544),
                    E = M(75658),
                    n = M(80955),
                    i = M(29871),
                    t;
                (function(o) {
                    o.Deploy = "Alive Redeploy", o.Reconnect = "Alive Reconnect"
                })(t || (t = {}));

                function e() {
                    return `${Math.round(Math.random()*(Math.pow(2,31)-1))}_${Math.round(Date.now()/1e3)}`
                }
                l(e, "generatePresenceId");

                function r(o) {
                    const c = o.match(/\/u\/(\d+)\/ws/);
                    return c ? +c[1] : 0
                }
                l(r, "getUserIdFromSocketUrl");
                class s {
                    constructor(c, a, u, h) {
                        this.url = c, this.getUrl = a, this.inSharedWorker = u, this.notify = h, this.subscriptions = new E.v, this.state = "online", this.retrying = null, this.connectionCount = 0, this.presence = new v.k2, this.presenceMetadata = new T.a, this.intentionallyDisconnected = !1, this.lastCameOnline = 0, this.userId = r(c), this.presenceId = e(), this.presenceKey = (0, v.Hw)(this.userId, this.presenceId), this.socket = this.connect()
                    }
                    subscribe(c) {
                        const a = this.subscriptions.add(...c);
                        this.sendSubscribe(a);
                        for (const u of c) {
                            const h = u.topic.name;
                            !(0, v.A)(h) || this.notifyCachedPresence(u.subscriber, h)
                        }
                    }
                    unsubscribe(c) {
                        const a = this.subscriptions.delete(...c);
                        this.sendUnsubscribe(a)
                    }
                    unsubscribeAll(...c) {
                        const a = this.subscriptions.drain(...c);
                        this.sendUnsubscribe(a);
                        const u = this.presenceMetadata.removeSubscribers(c);
                        this.sendPresenceMetadataUpdate(u)
                    }
                    requestPresence(c, a) {
                        for (const u of a) this.notifyCachedPresence(c, u)
                    }
                    notifyCachedPresence(c, a) {
                        const u = this.presence.getChannelItems(a);
                        u.length !== 0 && this.notifyPresenceChannel(a, u)
                    }
                    updatePresenceMetadata(c) {
                        const a = new Set;
                        for (const u of c) this.presenceMetadata.setMetadata(u), a.add(u.channelName);
                        this.sendPresenceMetadataUpdate(a)
                    }
                    sendPresenceMetadataUpdate(c) {
                        if (!c.size) return;
                        const a = [];
                        for (const u of c) {
                            const h = this.subscriptions.topic(u);
                            h && a.push(h)
                        }
                        this.sendSubscribe(a)
                    }
                    online() {
                        var c;
                        this.lastCameOnline = Date.now(), this.state = "online", (c = this.retrying) === null || c === void 0 || c.abort(), this.socket.open()
                    }
                    offline() {
                        var c;
                        this.state = "offline", (c = this.retrying) === null || c === void 0 || c.abort(), this.socket.close()
                    }
                    shutdown() {
                        this.inSharedWorker && self.close()
                    }
                    get reconnectWindow() {
                        const c = Date.now() - this.lastCameOnline < 6e4;
                        return this.connectionCount === 0 || this.intentionallyDisconnected || c ? 0 : 10 * 1e3
                    }
                    socketDidOpen() {
                        this.intentionallyDisconnected = !1, this.connectionCount++, this.socket.url = this.getUrlWithPresenceId(), this.sendSubscribe(this.subscriptions.topics())
                    }
                    socketDidClose(c, a, u) {
                        if (this.redeployEarlyReconnectTimeout !== void 0 && clearTimeout(this.redeployEarlyReconnectTimeout), u === "Alive Reconnect") this.intentionallyDisconnected = !0;
                        else if (u === "Alive Redeploy") {
                            this.intentionallyDisconnected = !0;
                            const d = (3 + Math.random() * 22) * 60 * 1e3;
                            this.redeployEarlyReconnectTimeout = setTimeout(() => {
                                this.intentionallyDisconnected = !0, this.socket.close(1e3, "Alive Redeploy Early Client Reconnect")
                            }, d)
                        }
                    }
                    socketDidFinish() {
                        this.state !== "offline" && this.reconnect()
                    }
                    socketDidReceiveMessage(c, a) {
                        const u = JSON.parse(a);
                        switch (u.e) {
                            case "ack":
                                {
                                    this.handleAck(u);
                                    break
                                }
                            case "msg":
                                {
                                    this.handleMessage(u);
                                    break
                                }
                        }
                    }
                    handleAck(c) {
                        for (const a of this.subscriptions.topics()) a.offset = c.off
                    }
                    handleMessage(c) {
                        const a = c.ch,
                            u = this.subscriptions.topic(a);
                        if (!!u) {
                            if (u.offset = c.off, "e" in c.data) {
                                const h = this.presence.handleMessage(a, c.data);
                                this.notifyPresenceChannel(a, h);
                                return
                            }
                            c.data.wait || (c.data.wait = 0), this.notify(this.subscriptions.subscribers(a), {
                                channel: a,
                                type: "message",
                                data: c.data
                            })
                        }
                    }
                    notifyPresenceChannel(c, a) {
                        var u, h;
                        const d = new Map;
                        for (const p of a) {
                            const {
                                userId: g,
                                metadata: _,
                                presenceKey: k
                            } = p, L = d.get(g) || {
                                userId: g,
                                isOwnUser: g === this.userId,
                                metadata: []
                            };
                            if (k !== this.presenceKey) {
                                for (const N of _) {
                                    if (T.Z in N) {
                                        L.isIdle !== !1 && (L.isIdle = Boolean(N[T.Z]));
                                        continue
                                    }
                                    L.metadata.push(N)
                                }
                                d.set(g, L)
                            }
                        }
                        for (const p of this.subscriptions.subscribers(c)) {
                            const g = this.userId,
                                _ = Array.from(d.values()).filter(N => N.userId !== g),
                                k = (h = (u = d.get(this.userId)) === null || u === void 0 ? void 0 : u.metadata) !== null && h !== void 0 ? h : [],
                                L = this.presenceMetadata.getChannelMetadata(c, {
                                    subscriber: p,
                                    markAllAsLocal: !this.inSharedWorker
                                });
                            this.notify([p], {
                                channel: c,
                                type: "presence",
                                data: [{
                                    userId: g,
                                    isOwnUser: !0,
                                    metadata: [...k, ...L]
                                }, ..._]
                            })
                        }
                    }
                    async reconnect() {
                        if (!this.retrying) try {
                            this.retrying = new AbortController;
                            const c = await (0, i.X)(this.getUrl, 1 / 0, 6e4, this.retrying.signal);
                            c ? (this.url = c, this.socket = this.connect()) : this.shutdown()
                        } catch (c) {
                            if (c.name !== "AbortError") throw c
                        } finally {
                            this.retrying = null
                        }
                    }
                    getUrlWithPresenceId() {
                        const c = new URL(this.url, self.location.origin);
                        return c.searchParams.set("shared", this.inSharedWorker.toString()), c.searchParams.set("p", `${this.presenceId}.${this.connectionCount}`), c.toString()
                    }
                    connect() {
                        const c = new f.Oo(this.getUrlWithPresenceId(), this, {
                            timeout: 4e3,
                            attempts: 7
                        });
                        return c.open(), c
                    }
                    sendSubscribe(c) {
                        const a = Array.from(c);
                        for (const u of (0, n.o)(a, 25)) {
                            const h = {};
                            for (const d of u)(0, v.A)(d.name) ? h[d.signed] = JSON.stringify(this.presenceMetadata.getChannelMetadata(d.name)) : h[d.signed] = d.offset;
                            this.socket.send(JSON.stringify({
                                subscribe: h
                            }))
                        }
                    }
                    sendUnsubscribe(c) {
                        const a = Array.from(c, u => u.signed);
                        for (const u of (0, n.o)(a, 25)) this.socket.send(JSON.stringify({
                            unsubscribe: u
                        }));
                        for (const u of c)(0, v.A)(u.name) && this.presence.clearChannel(u.name)
                    }
                }
                l(s, "AliveSession")
            },
            29871: (H, O, M) => {
                "use strict";
                M.d(O, {
                    X: () => E
                });

                function v(n) {
                    return new Promise((i, t) => {
                        const e = new Error("aborted");
                        e.name = "AbortError", n.aborted ? t(e) : n.addEventListener("abort", () => t(e))
                    })
                }
                l(v, "whenAborted");
                async function T(n, i) {
                    let t;
                    const e = new Promise(r => {
                        t = self.setTimeout(r, n)
                    });
                    if (!i) return e;
                    try {
                        await Promise.race([e, v(i)])
                    } catch (r) {
                        throw self.clearTimeout(t), r
                    }
                }
                l(T, "wait");

                function f(n) {
                    return Math.floor(Math.random() * Math.floor(n))
                }
                l(f, "rand");
                async function E(n, i, t = 1 / 0, e) {
                    const r = e ? v(e) : null;
                    for (let s = 0; s < i; s++) try {
                        return await (r ? Promise.race([n(), r]) : n())
                    } catch (o) {
                        if (o.name === "AbortError" || s === i - 1) throw o;
                        const c = Math.pow(2, s) * 1e3,
                            a = f(c * .1);
                        await T(Math.min(t, c + a), e)
                    }
                    throw new Error("retry failed")
                }
                l(E, "retry")
            },
            21461: (H, O, M) => {
                "use strict";
                M.d(O, {
                    A: () => f.A,
                    ZE: () => T.Z,
                    Zf: () => n.Z,
                    a2: () => v.a,
                    ah: () => T.a,
                    vk: () => E.v
                });
                var v = M(27907),
                    T = M(60835),
                    f = M(81855),
                    E = M(75658),
                    n = M(72993)
            },
            80955: (H, O, M) => {
                "use strict";
                M.d(O, {
                    o: () => v
                });

                function* v(T, f) {
                    for (let E = 0; E < T.length; E += f) yield T.slice(E, E + f)
                }
                l(v, "eachSlice")
            },
            60835: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Z: () => v,
                    a: () => E
                });
                const v = "_i";

                function T(n) {
                    return Object.assign(Object.assign({}, n), {
                        isLocal: !0
                    })
                }
                l(T, "markMetadataAsLocal");
                class f {
                    constructor() {
                        this.subscriberMetadata = new Map
                    }
                    setMetadata(i, t) {
                        this.subscriberMetadata.set(i, t)
                    }
                    removeSubscribers(i) {
                        let t = !1;
                        for (const e of i) t = this.subscriberMetadata.delete(e) || t;
                        return t
                    }
                    getMetadata(i) {
                        if (!i) {
                            const s = [];
                            let o;
                            for (const c of this.subscriberMetadata.values())
                                for (const a of c)
                                    if (v in a) {
                                        const u = Boolean(a[v]);
                                        o = o === void 0 ? u : u && o
                                    } else s.push(a);
                            return o !== void 0 && s.push({
                                [v]: o ? 1 : 0
                            }), s
                        }
                        const t = [],
                            {
                                subscriber: e,
                                markAllAsLocal: r
                            } = i;
                        for (const [s, o] of this.subscriberMetadata) {
                            const a = r || s === e ? o.map(T) : o;
                            t.push(...a)
                        }
                        return t
                    }
                    hasSubscribers() {
                        return this.subscriberMetadata.size > 0
                    }
                }
                l(f, "PresenceMetadataForChannel");
                class E {
                    constructor() {
                        this.metadataByChannel = new Map
                    }
                    setMetadata({
                        subscriber: i,
                        channelName: t,
                        metadata: e
                    }) {
                        let r = this.metadataByChannel.get(t);
                        r || (r = new f, this.metadataByChannel.set(t, r)), r.setMetadata(i, e)
                    }
                    removeSubscribers(i) {
                        const t = new Set;
                        for (const [e, r] of this.metadataByChannel) r.removeSubscribers(i) && t.add(e), r.hasSubscribers() || this.metadataByChannel.delete(e);
                        return t
                    }
                    getChannelMetadata(i, t) {
                        const e = this.metadataByChannel.get(i);
                        return (e == null ? void 0 : e.getMetadata(t)) || []
                    }
                }
                l(E, "PresenceMetadataSet")
            },
            81855: (H, O, M) => {
                "use strict";
                M.d(O, {
                    A: () => E,
                    Hw: () => v,
                    k2: () => i
                });

                function v(t, e) {
                    return `${t}:${e}`
                }
                l(v, "getPresenceKey");

                function T(t) {
                    const [e, r] = t.p.split(".");
                    return {
                        userId: t.u,
                        presenceKey: v(t.u, e),
                        connectionCount: Number(r),
                        metadata: t.m || []
                    }
                }
                l(T, "decompressItem");
                const f = "presence-";

                function E(t) {
                    return t.startsWith(f)
                }
                l(E, "isPresenceChannel");
                class n {
                    constructor() {
                        this.presenceItems = new Map
                    }
                    shouldUsePresenceItem(e) {
                        const r = this.presenceItems.get(e.presenceKey);
                        return !r || r.connectionCount <= e.connectionCount
                    }
                    addPresenceItem(e) {
                        !this.shouldUsePresenceItem(e) || this.presenceItems.set(e.presenceKey, e)
                    }
                    removePresenceItem(e) {
                        !this.shouldUsePresenceItem(e) || this.presenceItems.delete(e.presenceKey)
                    }
                    replacePresenceItems(e) {
                        this.presenceItems.clear();
                        for (const r of e) this.addPresenceItem(r)
                    }
                    getPresenceItems() {
                        return Array.from(this.presenceItems.values())
                    }
                }
                l(n, "PresenceChannel");
                class i {
                    constructor() {
                        this.presenceChannels = new Map
                    }
                    getPresenceChannel(e) {
                        const r = this.presenceChannels.get(e) || new n;
                        return this.presenceChannels.set(e, r), r
                    }
                    handleMessage(e, r) {
                        const s = this.getPresenceChannel(e);
                        switch (r.e) {
                            case "pf":
                                s.replacePresenceItems(r.d.map(T));
                                break;
                            case "pa":
                                s.addPresenceItem(T(r.d));
                                break;
                            case "pr":
                                s.removePresenceItem(T(r.d));
                                break
                        }
                        return this.getChannelItems(e)
                    }
                    getChannelItems(e) {
                        return this.getPresenceChannel(e).getPresenceItems()
                    }
                    clearChannel(e) {
                        this.presenceChannels.delete(e)
                    }
                }
                l(i, "AlivePresence")
            },
            75658: (H, O, M) => {
                "use strict";
                M.d(O, {
                    v: () => T
                });
                var v = M(61268);
                class T {
                    constructor() {
                        this.subscriptions = new v.Z, this.signatures = new Map
                    }
                    add(...E) {
                        const n = [];
                        for (const {
                                subscriber: i,
                                topic: t
                            } of E) this.subscriptions.has(t.name) || (n.push(t), this.signatures.set(t.name, t)), this.subscriptions.set(t.name, i);
                        return n
                    }
                    delete(...E) {
                        const n = [];
                        for (const {
                                subscriber: i,
                                topic: t
                            } of E) this.subscriptions.delete(t.name, i) && !this.subscriptions.has(t.name) && (n.push(t), this.signatures.delete(t.name));
                        return n
                    }
                    drain(...E) {
                        const n = [];
                        for (const i of E)
                            for (const t of this.subscriptions.drain(i)) {
                                const e = this.signatures.get(t);
                                this.signatures.delete(t), n.push(e)
                            }
                        return n
                    }
                    topics() {
                        return this.signatures.values()
                    }
                    topic(E) {
                        return this.signatures.get(E) || null
                    }
                    subscribers(E) {
                        return this.subscriptions.get(E).values()
                    }
                }
                l(T, "SubscriptionSet")
            },
            72993: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Z: () => v
                });
                class v {
                    constructor(f, E) {
                        this.name = f, this.signed = E, this.offset = ""
                    }
                    static parse(f) {
                        const [E, n] = f.split("--");
                        if (!E || !n) return null;
                        const i = JSON.parse(atob(E));
                        return !i.c || !i.t ? null : new v(i.c, f)
                    }
                }
                l(v, "Topic")
            },
            50232: (H, O, M) => {
                "use strict";
                M.d(O, {
                    nn: () => m,
                    Gb: () => ne
                });

                function v(w) {
                    const A = new AbortController;
                    return A.abort(w), A.signal
                }
                l(v, "abortsignal_abort_abortSignalAbort");

                function T() {
                    return "abort" in AbortSignal && typeof AbortSignal.abort == "function"
                }
                l(T, "isSupported");

                function f() {
                    return AbortSignal.abort === v
                }
                l(f, "isPolyfilled");

                function E() {
                    T() || (AbortSignal.abort = v)
                }
                l(E, "apply");

                function n(w) {
                    const A = new AbortController;
                    return setTimeout(() => A.abort(new DOMException("TimeoutError")), w), A.signal
                }
                l(n, "abortsignal_timeout_abortSignalTimeout");

                function i() {
                    return "abort" in AbortSignal && typeof AbortSignal.timeout == "function"
                }
                l(i, "abortsignal_timeout_isSupported");

                function t() {
                    return AbortSignal.timeout === n
                }
                l(t, "abortsignal_timeout_isPolyfilled");

                function e() {
                    i() || (AbortSignal.timeout = n)
                }
                l(e, "abortsignal_timeout_apply");
                class r extends Error {
                    constructor(A, R, $ = {}) {
                        super(R);
                        Object.defineProperty(this, "errors", {
                            value: Array.from(A),
                            configurable: !0,
                            writable: !0
                        }), $.cause && Object.defineProperty(this, "cause", {
                            value: $.cause,
                            configurable: !0,
                            writable: !0
                        })
                    }
                }
                l(r, "AggregateError");

                function s() {
                    return typeof globalThis.AggregateError == "function"
                }
                l(s, "aggregateerror_isSupported");

                function o() {
                    return globalThis.AggregateError === r
                }
                l(o, "aggregateerror_isPolyfilled");

                function c() {
                    s() || (globalThis.AggregateError = r)
                }
                l(c, "aggregateerror_apply");
                const a = Reflect.getPrototypeOf(Int8Array) || {};

                function u(w) {
                    const A = this.length;
                    return w = Math.trunc(w) || 0, w < 0 && (w += A), w < 0 || w >= A ? void 0 : this[w]
                }
                l(u, "arrayLikeAt");

                function h() {
                    return "at" in Array.prototype && typeof Array.prototype.at == "function" && "at" in String.prototype && typeof String.prototype.at == "function" && "at" in a && typeof a.at == "function"
                }
                l(h, "arraylike_at_isSupported");

                function d() {
                    return Array.prototype.at === u && String.prototype.at === u && a.at === u
                }
                l(d, "arraylike_at_isPolyfilled");

                function p() {
                    if (!h()) {
                        const w = {
                            value: u,
                            writable: !0,
                            configurable: !0
                        };
                        Object.defineProperty(Array.prototype, "at", w), Object.defineProperty(String.prototype, "at", w), Object.defineProperty(a, "at", w)
                    }
                }
                l(p, "arraylike_at_apply");

                function g() {
                    const w = new Uint32Array(4);
                    crypto.getRandomValues(w);
                    let A = -1;
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(R) {
                        A++;
                        const $ = w[A >> 3] >> A % 8 * 4 & 15;
                        return (R === "x" ? $ : $ & 3 | 8).toString(16)
                    })
                }
                l(g, "randomUUID");

                function _() {
                    return typeof crypto == "object" && "randomUUID" in crypto && typeof crypto.randomUUID == "function"
                }
                l(_, "crypto_randomuuid_isSupported");

                function k() {
                    return _() && crypto.randomUUID === g
                }
                l(k, "crypto_randomuuid_isPolyfilled");

                function L() {
                    _() || (crypto.randomUUID = g)
                }
                l(L, "crypto_randomuuid_apply");
                const N = EventTarget.prototype.addEventListener;

                function C(w, A, R) {
                    if (typeof R == "object" && "signal" in R && R.signal instanceof AbortSignal) {
                        if (R.signal.aborted) return;
                        N.call(R.signal, "abort", () => {
                            this.removeEventListener(w, A, R)
                        })
                    }
                    return N.call(this, w, A, R)
                }
                l(C, "addEventListenerWithAbortSignal");

                function b() {
                    let w = !1;
                    const A = l(() => w = !0, "setSignalSupported");

                    function R() {}
                    l(R, "noop");
                    const $ = Object.create({}, {
                        signal: {
                            get: A
                        }
                    });
                    try {
                        const K = new EventTarget;
                        return K.addEventListener("test", R, $), K.removeEventListener("test", R, $), w
                    } catch {
                        return w
                    }
                }
                l(b, "event_abortsignal_isSupported");

                function y() {
                    return EventTarget.prototype.addEventListener === C
                }
                l(y, "event_abortsignal_isPolyfilled");

                function x() {
                    typeof AbortSignal == "function" && !b() && (EventTarget.prototype.addEventListener = C)
                }
                l(x, "event_abortsignal_apply");
                const S = Object.prototype.hasOwnProperty;

                function I(w, A) {
                    if (w == null) throw new TypeError("Cannot convert undefined or null to object");
                    return S.call(Object(w), A)
                }
                l(I, "object_hasown_objectHasOwn");

                function P() {
                    return "hasOwn" in Object && typeof Object.hasOwn == "function"
                }
                l(P, "object_hasown_isSupported");

                function D() {
                    return Object.hasOwn === I
                }
                l(D, "object_hasown_isPolyfilled");

                function W() {
                    P() || Object.defineProperty(Object, "hasOwn", {
                        value: I,
                        configurable: !0,
                        writable: !0
                    })
                }
                l(W, "object_hasown_apply");

                function F(w) {
                    return new Promise((A, R) => {
                        let $ = !1;
                        const K = Array.from(w),
                            V = [];

                        function G(J) {
                            $ || ($ = !0, A(J))
                        }
                        l(G, "resolveOne");

                        function Z(J) {
                            V.push(J), V.length === K.length && R(new globalThis.AggregateError(V, "All Promises rejected"))
                        }
                        l(Z, "rejectIfDone");
                        for (const J of K) Promise.resolve(J).then(G, Z)
                    })
                }
                l(F, "promise_any_promiseAny");

                function j() {
                    return "any" in Promise && typeof Promise.any == "function"
                }
                l(j, "promise_any_isSupported");

                function U() {
                    return Promise.all === F
                }
                l(U, "promise_any_isPolyfilled");

                function B() {
                    j() || (Promise.any = F)
                }
                l(B, "promise_any_apply");
                const q = 50;

                function z(w, A = {}) {
                    const R = Date.now(),
                        $ = A.timeout || 0,
                        K = Object.defineProperty({
                            didTimeout: !1,
                            timeRemaining() {
                                return Math.max(0, q - (Date.now() - R))
                            }
                        }, "didTimeout", {
                            get() {
                                return Date.now() - R > $
                            }
                        });
                    return window.setTimeout(() => {
                        w(K)
                    })
                }
                l(z, "requestidlecallback_requestIdleCallback");

                function Y(w) {
                    clearTimeout(w)
                }
                l(Y, "cancelIdleCallback");

                function X() {
                    return typeof globalThis.requestIdleCallback == "function"
                }
                l(X, "requestidlecallback_isSupported");

                function te() {
                    return globalThis.requestIdleCallback === z && globalThis.cancelIdleCallback === Y
                }
                l(te, "requestidlecallback_isPolyfilled");

                function Q() {
                    X() || (globalThis.requestIdleCallback = z, globalThis.cancelIdleCallback = Y)
                }
                l(Q, "requestidlecallback_apply");
                const ee = typeof Blob == "function" && typeof PerformanceObserver == "function" && typeof Intl == "object" && typeof MutationObserver == "function" && typeof URLSearchParams == "function" && typeof WebSocket == "function" && typeof IntersectionObserver == "function" && typeof queueMicrotask == "function" && typeof TextEncoder == "function" && typeof TextDecoder == "function" && typeof customElements == "object" && typeof HTMLDetailsElement == "function" && typeof AbortController == "function" && typeof AbortSignal == "function" && "entries" in FormData.prototype && "toggleAttribute" in Element.prototype && "replaceChildren" in Element.prototype && "fromEntries" in Object && "flatMap" in Array.prototype && "trimEnd" in String.prototype && "allSettled" in Promise && "matchAll" in String.prototype && "replaceAll" in String.prototype && !0;

                function ne() {
                    return ee && T() && i() && s() && h() && _() && b() && P() && j() && X()
                }
                l(ne, "lib_isSupported");

                function re() {
                    return abortSignalAbort.isPolyfilled() && abortSignalTimeout.isPolyfilled() && aggregateError.isPolyfilled() && arrayAt.isPolyfilled() && cryptoRandomUUID.isPolyfilled() && eventAbortSignal.isPolyfilled() && objectHasOwn.isPolyfilled() && promiseAny.isPolyfilled() && requestIdleCallback.isPolyfilled()
                }
                l(re, "lib_isPolyfilled");

                function m() {
                    E(), e(), c(), p(), L(), x(), W(), B(), Q()
                }
                l(m, "lib_apply")
            },
            58797: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Z: () => v
                });

                function v(T) {
                    let f = !1,
                        E = null;
                    T.addEventListener("mousedown", e), T.addEventListener("change", i);

                    function n(o, c, a, u = !1) {
                        c instanceof HTMLInputElement && (c.indeterminate = u, c.checked !== a && (c.checked = a, setTimeout(() => {
                            const h = new CustomEvent("change", {
                                bubbles: !0,
                                cancelable: !1,
                                detail: {
                                    relatedTarget: o
                                }
                            });
                            c.dispatchEvent(h)
                        })))
                    }
                    l(n, "setChecked");

                    function i(o) {
                        const c = o.target;
                        c instanceof Element && (c.hasAttribute("data-check-all") ? t(o) : c.hasAttribute("data-check-all-item") && r(o))
                    }
                    l(i, "onChange");

                    function t(o) {
                        if (o instanceof CustomEvent && o.detail) {
                            const {
                                relatedTarget: a
                            } = o.detail;
                            if (a && a.hasAttribute("data-check-all-item")) return
                        }
                        const c = o.target;
                        if (c instanceof HTMLInputElement) {
                            E = null;
                            for (const a of T.querySelectorAll("[data-check-all-item]")) n(c, a, c.checked);
                            c.indeterminate = !1, s()
                        }
                    }
                    l(t, "onCheckAll");

                    function e(o) {
                        if (!(o.target instanceof Element)) return;
                        (o.target instanceof HTMLLabelElement && o.target.control || o.target).hasAttribute("data-check-all-item") && (f = o.shiftKey)
                    }
                    l(e, "onMouseDown");

                    function r(o) {
                        if (o instanceof CustomEvent && o.detail) {
                            const {
                                relatedTarget: h
                            } = o.detail;
                            if (h && (h.hasAttribute("data-check-all") || h.hasAttribute("data-check-all-item"))) return
                        }
                        const c = o.target;
                        if (!(c instanceof HTMLInputElement)) return;
                        const a = Array.from(T.querySelectorAll("[data-check-all-item]"));
                        if (f && E) {
                            const [h, d] = [a.indexOf(E), a.indexOf(c)].sort();
                            for (const p of a.slice(h, +d + 1 || 9e9)) n(c, p, c.checked)
                        }
                        f = !1, E = c;
                        const u = T.querySelector("[data-check-all]");
                        if (u) {
                            const h = a.length,
                                d = a.filter(_ => _ instanceof HTMLInputElement && _.checked).length,
                                p = d === h,
                                g = h > d && d > 0;
                            n(c, u, p, g)
                        }
                        s()
                    }
                    l(r, "onCheckAllItem");

                    function s() {
                        const o = T.querySelector("[data-check-all-count]");
                        if (o) {
                            const c = T.querySelectorAll("[data-check-all-item]:checked").length;
                            o.textContent = c.toString()
                        }
                    }
                    return l(s, "updateCount"), {
                        unsubscribe: () => {
                            T.removeEventListener("mousedown", e), T.removeEventListener("change", i)
                        }
                    }
                }
                l(v, "subscribe")
            },
            86058: (H, O, M) => {
                "use strict";
                M.d(O, {
                    R: () => i
                });

                function v() {
                    let t;
                    try {
                        t = window.top.document.referrer
                    } catch {
                        if (window.parent) try {
                            t = window.parent.document.referrer
                        } catch {}
                    }
                    return t === "" && (t = document.referrer), t
                }
                l(v, "getReferrer");

                function T() {
                    try {
                        return `${screen.width}x${screen.height}`
                    } catch {
                        return "unknown"
                    }
                }
                l(T, "getScreenResolution");

                function f() {
                    let t = 0,
                        e = 0;
                    try {
                        return typeof window.innerWidth == "number" ? (e = window.innerWidth, t = window.innerHeight) : document.documentElement != null && document.documentElement.clientWidth != null ? (e = document.documentElement.clientWidth, t = document.documentElement.clientHeight) : document.body != null && document.body.clientWidth != null && (e = document.body.clientWidth, t = document.body.clientHeight), `${e}x${t}`
                    } catch {
                        return "unknown"
                    }
                }
                l(f, "getBrowserResolution");

                function E() {
                    return {
                        referrer: v(),
                        user_agent: navigator.userAgent,
                        screen_resolution: T(),
                        browser_resolution: f(),
                        pixel_ratio: window.devicePixelRatio,
                        timestamp: Date.now(),
                        tz_seconds: new Date().getTimezoneOffset() * -60
                    }
                }
                l(E, "getRequestContext");
                var n = M(82918);
                class i {
                    constructor(e) {
                        this.options = e
                    }
                    get collectorUrl() {
                        return this.options.collectorUrl
                    }
                    get clientId() {
                        return this.options.clientId ? this.options.clientId : (0, n.b)()
                    }
                    createEvent(e) {
                        return {
                            page: location.href,
                            title: document.title,
                            context: { ...this.options.baseContext,
                                ...e
                            }
                        }
                    }
                    sendPageView(e) {
                        const r = this.createEvent(e);
                        this.send({
                            page_views: [r]
                        })
                    }
                    sendEvent(e, r) {
                        const s = { ...this.createEvent(r),
                            type: e
                        };
                        this.send({
                            events: [s]
                        })
                    }
                    send({
                        page_views: e,
                        events: r
                    }) {
                        const s = {
                                client_id: this.clientId,
                                page_views: e,
                                events: r,
                                request_context: E()
                            },
                            o = JSON.stringify(s);
                        try {
                            if (navigator.sendBeacon) {
                                navigator.sendBeacon(this.collectorUrl, o);
                                return
                            }
                        } catch {}
                        fetch(this.collectorUrl, {
                            method: "POST",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: o,
                            keepalive: !1
                        })
                    }
                }
                l(i, "AnalyticsClient")
            },
            82918: (H, O, M) => {
                "use strict";
                M.d(O, {
                    b: () => n
                });
                let v;

                function T() {
                    return `${Math.round(Math.random()*(Math.pow(2,31)-1))}.${Math.round(Date.now()/1e3)}`
                }
                l(T, "generateClientId");

                function f(i) {
                    const t = `GH1.1.${i}`,
                        e = Date.now(),
                        r = new Date(e + 1 * 365 * 86400 * 1e3).toUTCString();
                    let {
                        domain: s
                    } = document;
                    s.endsWith(".github.com") && (s = "github.com"), document.cookie = `_octo=${t}; expires=${r}; path=/; domain=${s}; secure; samesite=lax`
                }
                l(f, "setClientIdCookie");

                function E() {
                    let i;
                    const e = document.cookie.match(/_octo=([^;]+)/g);
                    if (!e) return;
                    let r = [0, 0];
                    for (const s of e) {
                        const [, o] = s.split("="), [, c, ...a] = o.split("."), u = c.split("-").map(Number);
                        u > r && (r = u, i = a.join("."))
                    }
                    return i
                }
                l(E, "getClientIdFromCookie");

                function n() {
                    try {
                        const i = E();
                        if (i) return i;
                        const t = T();
                        return f(t), t
                    } catch {
                        return v || (v = T()), v
                    }
                }
                l(n, "getOrCreateClientId")
            },
            88149: (H, O, M) => {
                "use strict";
                M.d(O, {
                    n: () => v
                });

                function v(T = "ha") {
                    let f;
                    const E = {},
                        n = document.head.querySelectorAll(`meta[name^="${T}-"]`);
                    for (const i of Array.from(n)) {
                        const {
                            name: t,
                            content: e
                        } = i, r = t.replace(`${T}-`, "").replace(/-/g, "_");
                        r === "url" ? f = e : E[r] = e
                    }
                    if (!f) throw new Error(`AnalyticsClient ${T}-url meta tag not found`);
                    return {
                        collectorUrl: f,
                        ...Object.keys(E).length > 0 ? {
                            baseContext: E
                        } : {}
                    }
                }
                l(v, "getOptionsFromMeta")
            },
            38772: (H, O, M) => {
                "use strict";
                M.d(O, {
                    dy: () => _,
                    sY: () => k,
                    Au: () => C
                });
                var v = M(69567);
                const T = new WeakSet;

                function f(b) {
                    return T.has(b)
                }
                l(f, "isDirective");

                function E(b, y) {
                    return f(y) ? (y(b), !0) : !1
                }
                l(E, "processDirective");

                function n(b) {
                    return (...y) => {
                        const x = b(...y);
                        return T.add(x), x
                    }
                }
                l(n, "directive");
                const i = new WeakMap;
                class t {
                    constructor(y, x) {
                        this.element = y, this.type = x, this.element.addEventListener(this.type, this), i.get(this.element).set(this.type, this)
                    }
                    set(y) {
                        typeof y == "function" ? this.handleEvent = y.bind(this.element) : typeof y == "object" && typeof y.handleEvent == "function" ? this.handleEvent = y.handleEvent.bind(y) : (this.element.removeEventListener(this.type, this), i.get(this.element).delete(this.type))
                    }
                    static
                    for (y) {
                        i.has(y.element) || i.set(y.element, new Map);
                        const x = y.attributeName.slice(2),
                            S = i.get(y.element);
                        return S.has(x) ? S.get(x) : new t(y.element, x)
                    }
                }
                l(t, "EventHandler");

                function e(b, y) {
                    return b instanceof v.sV && b.attributeName.startsWith("on") ? (t.for(b).set(y), b.element.removeAttributeNS(b.attributeNamespace, b.attributeName), !0) : !1
                }
                l(e, "processEvent");

                function r(b, y) {
                    return y instanceof p && b instanceof v.GZ ? (y.renderInto(b), !0) : !1
                }
                l(r, "processSubTemplate");

                function s(b, y) {
                    return y instanceof DocumentFragment && b instanceof v.GZ ? (y.childNodes.length && b.replace(...y.childNodes), !0) : !1
                }
                l(s, "processDocumentFragment");

                function o(b) {
                    return typeof b == "object" && Symbol.iterator in b
                }
                l(o, "isIterable");

                function c(b, y) {
                    if (!o(y)) return !1;
                    if (b instanceof v.GZ) {
                        const x = [];
                        for (const S of y)
                            if (S instanceof p) {
                                const I = document.createDocumentFragment();
                                S.renderInto(I), x.push(...I.childNodes)
                            } else S instanceof DocumentFragment ? x.push(...S.childNodes) : x.push(String(S));
                        return x.length && b.replace(...x), !0
                    } else return b.value = Array.from(y).join(" "), !0
                }
                l(c, "processIterable");

                function a(b, y) {
                    E(b, y) || (0, v.W_)(b, y) || e(b, y) || r(b, y) || s(b, y) || c(b, y) || (0, v.Al)(b, y)
                }
                l(a, "processPart");
                const u = new WeakMap,
                    h = new WeakMap,
                    d = new WeakMap;
                class p {
                    constructor(y, x, S) {
                        this.strings = y, this.values = x, this.processor = S
                    }
                    get template() {
                        if (u.has(this.strings)) return u.get(this.strings); {
                            const y = document.createElement("template"),
                                x = this.strings.length - 1;
                            return y.innerHTML = this.strings.reduce((S, I, P) => S + I + (P < x ? `{{ ${P} }}` : ""), ""), u.set(this.strings, y), y
                        }
                    }
                    renderInto(y) {
                        const x = this.template;
                        if (h.get(y) !== x) {
                            h.set(y, x);
                            const S = new v.R(x, this.values, this.processor);
                            d.set(y, S), y instanceof v.GZ ? y.replace(...S.children) : y.appendChild(S);
                            return
                        }
                        d.get(y).update(this.values)
                    }
                }
                l(p, "TemplateResult");
                const g = (0, v.AQ)(a);

                function _(b, ...y) {
                    return new p(b, y, g)
                }
                l(_, "html");

                function k(b, y) {
                    b.renderInto(y)
                }
                l(k, "render");
                const L = new WeakMap,
                    N = n((...b) => y => {
                        L.has(y) || L.set(y, {
                            i: b.length
                        });
                        const x = L.get(y);
                        for (let S = 0; S < b.length; S += 1) b[S] instanceof Promise ? Promise.resolve(b[S]).then(I => {
                            S < x.i && (x.i = S, a(y, I))
                        }) : S <= x.i && (x.i = S, a(y, b[S]))
                    }),
                    C = n(b => y => {
                        if (!(y instanceof v.GZ)) return;
                        const x = document.createElement("template");
                        x.innerHTML = b;
                        const S = document.importNode(x.content, !0);
                        y.replace(...S.childNodes)
                    })
            },
            4687: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Z: () => T
                });

                function v(...f) {
                    return JSON.stringify(f, (E, n) => typeof n == "object" ? n : String(n))
                }
                l(v, "defaultHash");

                function T(f, E = {}) {
                    const {
                        hash: n = v,
                        cache: i = new Map
                    } = E;
                    return function(...t) {
                        const e = n.apply(this, t);
                        if (i.has(e)) return i.get(e);
                        let r = f.apply(this, t);
                        return r instanceof Promise && (r = r.catch(s => {
                            throw i.delete(e), s
                        })), i.set(e, r), r
                    }
                }
                l(T, "memoize")
            },
            61268: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Z: () => v
                });
                class v {
                    constructor(f) {
                        if (this.map = new Map, f)
                            for (const [E, n] of f) this.set(E, n)
                    }
                    get(f) {
                        const E = this.map.get(f);
                        return E || new Set
                    }
                    set(f, E) {
                        let n = this.map.get(f);
                        return n || (n = new Set, this.map.set(f, n)), n.add(E), this
                    }
                    has(f) {
                        return this.map.has(f)
                    }
                    delete(f, E) {
                        const n = this.map.get(f);
                        if (!n) return !1;
                        if (!E) return this.map.delete(f);
                        const i = n.delete(E);
                        return n.size || this.map.delete(f), i
                    }
                    drain(f) {
                        const E = [];
                        for (const n of this.keys()) this.delete(n, f) && !this.has(n) && E.push(n);
                        return E
                    }
                    keys() {
                        return this.map.keys()
                    }
                    values() {
                        return this.map.values()
                    }
                    entries() {
                        return this.map.entries()
                    }[Symbol.iterator]() {
                        return this.entries()
                    }
                    clear() {
                        this.map.clear()
                    }
                    get size() {
                        return this.map.size
                    }
                }
                l(v, "MultiMap")
            },
            16544: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Oo: () => s
                });
                async function v(d, p) {
                    let g;
                    const _ = new Promise((k, L) => {
                        g = self.setTimeout(() => L(new Error("timeout")), d)
                    });
                    if (!p) return _;
                    try {
                        await Promise.race([_, E(p)])
                    } catch (k) {
                        throw self.clearTimeout(g), k
                    }
                }
                l(v, "timeout");
                async function T(d, p) {
                    let g;
                    const _ = new Promise(k => {
                        g = self.setTimeout(k, d)
                    });
                    if (!p) return _;
                    try {
                        await Promise.race([_, E(p)])
                    } catch (k) {
                        throw self.clearTimeout(g), k
                    }
                }
                l(T, "wait");
                async function f(d, p, g = 1 / 0, _) {
                    const k = _ ? E(_) : null;
                    for (let L = 0; L < p; L++) try {
                        return await (k ? Promise.race([d(), k]) : d())
                    } catch (N) {
                        if (N.name === "AbortError" || L === p - 1) throw N;
                        const C = Math.pow(2, L) * 1e3,
                            b = n(C * .1);
                        await T(Math.min(g, C + b), _)
                    }
                    throw new Error("retry failed")
                }
                l(f, "retry");

                function E(d) {
                    return new Promise((p, g) => {
                        const _ = new Error("aborted");
                        _.name = "AbortError", d.aborted ? g(_) : d.addEventListener("abort", () => g(_))
                    })
                }
                l(E, "whenAborted");

                function n(d) {
                    return Math.floor(Math.random() * Math.floor(d))
                }
                l(n, "rand");
                async function i(d, p, g) {
                    const _ = new WebSocket(d),
                        k = r(_);
                    try {
                        return await Promise.race([k, v(p, g)]), _
                    } catch (L) {
                        throw t(k), L
                    }
                }
                l(i, "connect");
                async function t(d) {
                    try {
                        (await d).close()
                    } catch {}
                }
                l(t, "shutdown");

                function e(d, p) {
                    return f(l(() => i(d, p.timeout, p.signal), "fn"), p.attempts, p.maxDelay, p.signal)
                }
                l(e, "connectWithRetry");

                function r(d) {
                    return new Promise((p, g) => {
                        d.readyState === WebSocket.OPEN ? p(d) : (d.onerror = () => {
                            d.onerror = null, d.onopen = null, g(new Error("connect failed"))
                        }, d.onopen = () => {
                            d.onerror = null, d.onopen = null, p(d)
                        })
                    })
                }
                l(r, "whenOpen");
                class s {
                    constructor(p, g, _) {
                        this.socket = null, this.opening = null, this.url = p, this.delegate = g, this.policy = _
                    }
                    async open() {
                        if (this.opening || this.socket) return;
                        this.opening = new AbortController;
                        const p = Object.assign(Object.assign({}, this.policy), {
                            signal: this.opening.signal
                        });
                        try {
                            this.socket = await e(this.url, p)
                        } catch {
                            this.delegate.socketDidFinish(this);
                            return
                        } finally {
                            this.opening = null
                        }
                        this.socket.onclose = g => {
                            this.socket = null, this.delegate.socketDidClose(this, g.code, g.reason), (this.delegate.socketShouldRetry ? !this.delegate.socketShouldRetry(this, g.code) : c(g.code)) ? this.delegate.socketDidFinish(this) : setTimeout(() => this.open(), o(100, 100 + (this.delegate.reconnectWindow || 50)))
                        }, this.socket.onmessage = g => {
                            this.delegate.socketDidReceiveMessage(this, g.data)
                        }, this.delegate.socketDidOpen(this)
                    }
                    close(p, g) {
                        this.opening ? (this.opening.abort(), this.opening = null) : this.socket && (this.socket.onclose = null, this.socket.close(p, g), this.socket = null, this.delegate.socketDidClose(this, p, g), this.delegate.socketDidFinish(this))
                    }
                    send(p) {
                        this.socket && this.socket.send(p)
                    }
                    isOpen() {
                        return !!this.socket
                    }
                }
                l(s, "StableSocket");

                function o(d, p) {
                    return Math.random() * (p - d) + d
                }
                l(o, "rand$1");

                function c(d) {
                    return d === a || d === u
                }
                l(c, "isFatal");
                const a = 1008,
                    u = 1011;
                class h {
                    constructor(p) {
                        this.buf = [], this.socket = p, this.delegate = p.delegate, p.delegate = this
                    }
                    open() {
                        return this.socket.open()
                    }
                    close(p, g) {
                        this.socket.close(p, g)
                    }
                    send(p) {
                        this.socket.isOpen() ? (this.flush(), this.socket.send(p)) : this.buf.push(p)
                    }
                    isOpen() {
                        return this.socket.isOpen()
                    }
                    flush() {
                        for (const p of this.buf) this.socket.send(p);
                        this.buf.length = 0
                    }
                    socketDidOpen(p) {
                        this.flush(), this.delegate.socketDidOpen(p)
                    }
                    socketDidClose(p, g, _) {
                        this.delegate.socketDidClose(p, g, _)
                    }
                    socketDidFinish(p) {
                        this.delegate.socketDidFinish(p)
                    }
                    socketDidReceiveMessage(p, g) {
                        this.delegate.socketDidReceiveMessage(p, g)
                    }
                    socketShouldRetry(p, g) {
                        return this.delegate.socketShouldRetry ? this.delegate.socketShouldRetry(p, g) : !c(g)
                    }
                }
                l(h, "BufferedSocket")
            },
            69567: (H, O, M) => {
                "use strict";
                M.d(O, {
                    sV: () => i,
                    GZ: () => o,
                    R: () => N,
                    AQ: () => c,
                    W_: () => u,
                    Al: () => a,
                    XK: () => d
                });

                function* v(C) {
                    let b = "",
                        y = 0,
                        x = !1;
                    for (let S = 0; S < C.length; S += 1) C[S] === "{" && C[S + 1] === "{" && C[S - 1] !== "\\" && !x ? (x = !0, b && (yield {
                        type: "string",
                        start: y,
                        end: S,
                        value: b
                    }), b = "{{", y = S, S += 2) : C[S] === "}" && C[S + 1] === "}" && C[S - 1] !== "\\" && x && (x = !1, yield {
                        type: "part",
                        start: y,
                        end: S + 2,
                        value: b.slice(2).trim()
                    }, b = "", S += 2, y = S), b += C[S] || "";
                    b && (yield {
                        type: "string",
                        start: y,
                        end: C.length,
                        value: b
                    })
                }
                l(v, "parse");
                var T = function(C, b, y) {
                        if (!b.has(C)) throw new TypeError("attempted to set private field on non-instance");
                        return b.set(C, y), y
                    },
                    f = function(C, b) {
                        if (!b.has(C)) throw new TypeError("attempted to get private field on non-instance");
                        return b.get(C)
                    },
                    E, n;
                class i {
                    constructor(b, y) {
                        this.expression = y, E.set(this, void 0), n.set(this, ""), T(this, E, b), f(this, E).updateParent("")
                    }
                    get attributeName() {
                        return f(this, E).attr.name
                    }
                    get attributeNamespace() {
                        return f(this, E).attr.namespaceURI
                    }
                    get value() {
                        return f(this, n)
                    }
                    set value(b) {
                        T(this, n, b || ""), f(this, E).updateParent(b)
                    }
                    get element() {
                        return f(this, E).element
                    }
                    get booleanValue() {
                        return f(this, E).booleanValue
                    }
                    set booleanValue(b) {
                        f(this, E).booleanValue = b
                    }
                }
                l(i, "AttributeTemplatePart"), E = new WeakMap, n = new WeakMap;
                class t {
                    constructor(b, y) {
                        this.element = b, this.attr = y, this.partList = []
                    }
                    get booleanValue() {
                        return this.element.hasAttributeNS(this.attr.namespaceURI, this.attr.name)
                    }
                    set booleanValue(b) {
                        if (this.partList.length !== 1) throw new DOMException("Operation not supported", "NotSupportedError");
                        this.partList[0].value = b ? "" : null
                    }
                    append(b) {
                        this.partList.push(b)
                    }
                    updateParent(b) {
                        if (this.partList.length === 1 && b === null) this.element.removeAttributeNS(this.attr.namespaceURI, this.attr.name);
                        else {
                            const y = this.partList.map(x => typeof x == "string" ? x : x.value).join("");
                            this.element.setAttributeNS(this.attr.namespaceURI, this.attr.name, y)
                        }
                    }
                }
                l(t, "AttributeValueSetter");
                var e = function(C, b, y) {
                        if (!b.has(C)) throw new TypeError("attempted to set private field on non-instance");
                        return b.set(C, y), y
                    },
                    r = function(C, b) {
                        if (!b.has(C)) throw new TypeError("attempted to get private field on non-instance");
                        return b.get(C)
                    },
                    s;
                class o {
                    constructor(b, y) {
                        this.expression = y, s.set(this, void 0), e(this, s, [b]), b.textContent = ""
                    }
                    get value() {
                        return r(this, s).map(b => b.textContent).join("")
                    }
                    set value(b) {
                        this.replace(b)
                    }
                    get previousSibling() {
                        return r(this, s)[0].previousSibling
                    }
                    get nextSibling() {
                        return r(this, s)[r(this, s).length - 1].nextSibling
                    }
                    replace(...b) {
                        const y = b.map(x => typeof x == "string" ? new Text(x) : x);
                        y.length || y.push(new Text("")), r(this, s)[0].before(...y);
                        for (const x of r(this, s)) x.remove();
                        e(this, s, y)
                    }
                }
                l(o, "NodeTemplatePart"), s = new WeakMap;

                function c(C) {
                    return {
                        createCallback(b, y, x) {
                            this.processCallback(b, y, x)
                        },
                        processCallback(b, y, x) {
                            var S;
                            if (!(typeof x != "object" || !x)) {
                                for (const I of y)
                                    if (I.expression in x) {
                                        const P = (S = x[I.expression]) !== null && S !== void 0 ? S : "";
                                        C(I, P)
                                    }
                            }
                        }
                    }
                }
                l(c, "createProcessor");

                function a(C, b) {
                    C.value = String(b)
                }
                l(a, "processPropertyIdentity");

                function u(C, b) {
                    return typeof b == "boolean" && C instanceof i && typeof C.element[C.attributeName] == "boolean" ? (C.booleanValue = b, !0) : !1
                }
                l(u, "processBooleanAttribute");
                const h = c(a),
                    d = c((C, b) => {
                        u(C, b) || a(C, b)
                    });
                var p = function(C, b, y) {
                        if (!b.has(C)) throw new TypeError("attempted to set private field on non-instance");
                        return b.set(C, y), y
                    },
                    g = function(C, b) {
                        if (!b.has(C)) throw new TypeError("attempted to get private field on non-instance");
                        return b.get(C)
                    },
                    _, k;

                function* L(C) {
                    const b = C.ownerDocument.createTreeWalker(C, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, !1);
                    let y;
                    for (; y = b.nextNode();)
                        if (y instanceof Element && y.hasAttributes())
                            for (let x = 0; x < y.attributes.length; x += 1) {
                                const S = y.attributes.item(x);
                                if (S && S.value.includes("{{")) {
                                    const I = new t(y, S);
                                    for (const P of v(S.value))
                                        if (P.type === "string") I.append(P.value);
                                        else {
                                            const D = new i(I, P.value);
                                            I.append(D), yield D
                                        }
                                }
                            } else if (y instanceof Text && y.textContent && y.textContent.includes("{{"))
                                for (const x of v(y.textContent)) {
                                    x.end < y.textContent.length && y.splitText(x.end), x.type === "part" && (yield new o(y, x.value));
                                    break
                                }
                }
                l(L, "collectParts");
                class N extends DocumentFragment {
                    constructor(b, y, x = h) {
                        var S, I;
                        super();
                        _.set(this, void 0), k.set(this, void 0), Object.getPrototypeOf(this !== N.prototype) && Object.setPrototypeOf(this, N.prototype), this.appendChild(b.content.cloneNode(!0)), p(this, k, Array.from(L(this))), p(this, _, x), (I = (S = g(this, _)).createCallback) === null || I === void 0 || I.call(S, this, g(this, k), y)
                    }
                    update(b) {
                        g(this, _).processCallback(this, g(this, k), b)
                    }
                }
                l(N, "TemplateInstance"), _ = new WeakMap, k = new WeakMap
            },
            89900: (H, O, M) => {
                "use strict";
                M.d(O, {
                    Z: () => E
                });
                const v = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"],
                    f = typeof window != "undefined" && window.mozInnerScreenX != null;

                function E(n, i, t) {
                    const e = t && t.debug || !1;
                    if (e) {
                        const h = document.querySelector("#input-textarea-caret-position-mirror-div");
                        h && h.parentNode.removeChild(h)
                    }
                    const r = document.createElement("div");
                    r.id = "input-textarea-caret-position-mirror-div", document.body.appendChild(r);
                    const s = r.style,
                        o = window.getComputedStyle ? window.getComputedStyle(n) : n.currentStyle,
                        c = n.nodeName === "INPUT";
                    s.whiteSpace = "pre-wrap", c || (s.wordWrap = "break-word"), s.position = "absolute", e || (s.visibility = "hidden");
                    for (const h of v)
                        if (c && h === "lineHeight")
                            if (o.boxSizing === "border-box") {
                                const d = parseInt(o.height),
                                    p = parseInt(o.paddingTop) + parseInt(o.paddingBottom) + parseInt(o.borderTopWidth) + parseInt(o.borderBottomWidth),
                                    g = p + parseInt(o.lineHeight);
                                d > g ? s.lineHeight = `${d-p}px` : d === g ? s.lineHeight = o.lineHeight : s.lineHeight = 0
                            } else s.lineHeight = o.height;
                    else if (!c && h === "width" && o.boxSizing === "border-box") {
                        let d = parseFloat(o.borderLeftWidth) + parseFloat(o.borderRightWidth),
                            p = f ? parseFloat(o[h]) - d : n.clientWidth + d;
                        s[h] = `${p}px`
                    } else s[h] = o[h];
                    f ? n.scrollHeight > parseInt(o.height) && (s.overflowY = "scroll") : s.overflow = "hidden", r.textContent = n.value.substring(0, i), c && (r.textContent = r.textContent.replace(/\s/g, "\xA0"));
                    const a = document.createElement("span");
                    a.textContent = n.value.substring(i) || ".", r.appendChild(a);
                    const u = {
                        top: a.offsetTop + parseInt(o.borderTopWidth),
                        left: a.offsetLeft + parseInt(o.borderLeftWidth),
                        height: parseInt(o.lineHeight)
                    };
                    return e ? a.style.backgroundColor = "#aaa" : document.body.removeChild(r), u
                }
                l(E, "getCaretCoordinates")
            },
            5826: (H, O, M) => {
                "use strict";
                M.d(O, {
                    N: () => T
                });
                const v = {
                    "outside-top": ["outside-bottom", "outside-right", "outside-left", "outside-bottom"],
                    "outside-bottom": ["outside-top", "outside-right", "outside-left", "outside-bottom"],
                    "outside-left": ["outside-right", "outside-bottom", "outside-top", "outside-bottom"],
                    "outside-right": ["outside-left", "outside-bottom", "outside-top", "outside-bottom"]
                };

                function T(s, o, c = {}) {
                    const a = f(s),
                        u = E(a),
                        h = getComputedStyle(a),
                        d = a.getBoundingClientRect(),
                        [p, g] = [h.borderTopWidth, h.borderLeftWidth].map(k => parseInt(k, 10) || 0),
                        _ = {
                            top: d.top + p,
                            left: d.left + g
                        };
                    return t(u, _, s.getBoundingClientRect(), o instanceof Element ? o.getBoundingClientRect() : o, i(c))
                }
                l(T, "getAnchoredPosition");

                function f(s) {
                    let o = s.parentNode;
                    for (; o !== null;) {
                        if (o instanceof HTMLElement && getComputedStyle(o).position !== "static") return o;
                        o = o.parentNode
                    }
                    return document.body
                }
                l(f, "getPositionedParent");

                function E(s) {
                    let o = s;
                    for (; o !== null && !(o === document.body || getComputedStyle(o).overflow !== "visible");) o = o.parentNode;
                    const c = o === document.body || !(o instanceof HTMLElement) ? document.body : o,
                        a = c.getBoundingClientRect(),
                        u = getComputedStyle(c),
                        [h, d, p, g] = [u.borderTopWidth, u.borderLeftWidth, u.borderRightWidth, u.borderBottomWidth].map(_ => parseInt(_, 10) || 0);
                    return {
                        top: a.top + h,
                        left: a.left + d,
                        width: a.width - p - d,
                        height: Math.max(a.height - h - g, c === document.body ? window.innerHeight : -1 / 0)
                    }
                }
                l(E, "getClippingRect");
                const n = {
                    side: "outside-bottom",
                    align: "start",
                    anchorOffset: 4,
                    alignmentOffset: 4,
                    allowOutOfBounds: !1
                };

                function i(s = {}) {
                    var o, c, a, u, h;
                    const d = (o = s.side) !== null && o !== void 0 ? o : n.side,
                        p = (c = s.align) !== null && c !== void 0 ? c : n.align;
                    return {
                        side: d,
                        align: p,
                        anchorOffset: (a = s.anchorOffset) !== null && a !== void 0 ? a : d === "inside-center" ? 0 : n.anchorOffset,
                        alignmentOffset: (u = s.alignmentOffset) !== null && u !== void 0 ? u : p !== "center" && d.startsWith("inside") ? n.alignmentOffset : 0,
                        allowOutOfBounds: (h = s.allowOutOfBounds) !== null && h !== void 0 ? h : n.allowOutOfBounds
                    }
                }
                l(i, "getDefaultSettings");

                function t(s, o, c, a, {
                    side: u,
                    align: h,
                    allowOutOfBounds: d,
                    anchorOffset: p,
                    alignmentOffset: g
                }) {
                    const _ = {
                        top: s.top - o.top,
                        left: s.left - o.left,
                        width: s.width,
                        height: s.height
                    };
                    let k = e(c, a, u, h, p, g),
                        L = u;
                    if (k.top -= o.top, k.left -= o.left, !d) {
                        const N = v[u];
                        let C = 0;
                        if (N) {
                            let b = u;
                            for (; C < N.length && r(b, k, _, c);) {
                                const y = N[C++];
                                b = y, k = e(c, a, y, h, p, g), k.top -= o.top, k.left -= o.left, L = y
                            }
                        }
                        k.top < _.top && (k.top = _.top), k.left < _.left && (k.left = _.left), k.left + c.width > s.width + _.left && (k.left = s.width + _.left - c.width), N && C < N.length && k.top + c.height > s.height + _.top && (k.top = s.height + _.top - c.height)
                    }
                    return Object.assign(Object.assign({}, k), {
                        anchorSide: L
                    })
                }
                l(t, "pureCalculateAnchoredPosition");

                function e(s, o, c, a, u, h) {
                    const d = o.left + o.width,
                        p = o.top + o.height;
                    let g = -1,
                        _ = -1;
                    return c === "outside-top" ? g = o.top - u - s.height : c === "outside-bottom" ? g = p + u : c === "outside-left" ? _ = o.left - u - s.width : c === "outside-right" && (_ = d + u), (c === "outside-top" || c === "outside-bottom") && (a === "start" ? _ = o.left + h : a === "center" ? _ = o.left - (s.width - o.width) / 2 + h : _ = d - s.width - h), (c === "outside-left" || c === "outside-right") && (a === "start" ? g = o.top + h : a === "center" ? g = o.top - (s.height - o.height) / 2 + h : g = p - s.height - h), c === "inside-top" ? g = o.top + u : c === "inside-bottom" ? g = p - u - s.height : c === "inside-left" ? _ = o.left + u : c === "inside-right" ? _ = d - u - s.width : c === "inside-center" && (_ = (d + o.left) / 2 - s.width / 2 + u), c === "inside-top" || c === "inside-bottom" ? a === "start" ? _ = o.left + h : a === "center" ? _ = o.left - (s.width - o.width) / 2 + h : _ = d - s.width - h : (c === "inside-left" || c === "inside-right" || c === "inside-center") && (a === "start" ? g = o.top + h : a === "center" ? g = o.top - (s.height - o.height) / 2 + h : g = p - s.height - h), {
                        top: g,
                        left: _
                    }
                }
                l(e, "calculatePosition");

                function r(s, o, c, a) {
                    return s === "outside-top" || s === "outside-bottom" ? o.top < c.top || o.top + a.height > c.height + c.top : o.left < c.left || o.left + a.width > c.width + c.left
                }
                l(r, "shouldRecalculatePosition")
            }
        }
    ]);
})();

//# sourceMappingURL=901-ccc20f576697.js.map