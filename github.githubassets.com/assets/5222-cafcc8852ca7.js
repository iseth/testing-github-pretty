"use strict";
(() => {
    var O = Object.defineProperty;
    var p = (z, A) => O(z, "name", {
        value: A,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [5222], {
            77546: (z, A, u) => {
                u.d(A, {
                    z: () => j
                });
                var h = u(59753),
                    M = u(51374),
                    C = u(52660),
                    D = u(86404),
                    T = u(78694),
                    _ = u(64463),
                    E = u(65935),
                    v = u(74136);
                let i = [];
                (0, _.N7)(".js-comment-header-actions-deferred-include-fragment", {
                    subscribe: e => (0, D.RB)(e, "loadstart", () => {
                        const t = e.closest(".js-comment");
                        a(t)
                    }, {
                        capture: !1,
                        once: !0
                    })
                }), (0, _.N7)(".js-comment .contains-task-list", {
                    add: e => {
                        const t = e.closest(".js-comment");
                        a(t)
                    }
                }), (0, h.on)("click", ".js-comment-edit-button", function(e) {
                    const t = e.currentTarget.closest(".js-comment");
                    t.classList.add("is-comment-editing");
                    const s = r(t);
                    s ? s.addEventListener("include-fragment-replaced", () => o(t), {
                        once: !0
                    }) : o(t);
                    const n = e.currentTarget.closest(".js-dropdown-details");
                    n && n.removeAttribute("open")
                });

                function o(e) {
                    e.querySelector(".js-write-tab").click();
                    const t = e.querySelector(".js-comment-field");
                    t.focus(), (0, h.f)(t, "change")
                }
                p(o, "focusEditForm");

                function r(e) {
                    return e.querySelector(".js-comment-edit-form-deferred-include-fragment")
                }
                p(r, "findEditFormDeferredIncludeFragment");

                function a(e) {
                    var t;
                    (t = r(e)) == null || t.setAttribute("loading", "eager")
                }
                p(a, "loadEditFormDeferredIncludeFragment"), (0, h.on)("click", ".js-comment-hide-button", function(e) {
                    const t = e.currentTarget.closest(".js-comment");
                    g(t, !1);
                    const s = t.querySelector(".js-minimize-comment");
                    s && s.classList.remove("d-none");
                    const n = e.currentTarget.closest(".js-dropdown-details");
                    n && n.removeAttribute("open")
                }), (0, h.on)("click", ".js-comment-hide-minimize-form", function(e) {
                    e.currentTarget.closest(".js-minimize-comment").classList.add("d-none")
                });

                function j(e) {
                    const t = e.currentTarget.closest("form"),
                        s = e.currentTarget.getAttribute("data-confirm-text");
                    if ((0, T.T)(t) && !confirm(s)) return !1;
                    for (const c of t.querySelectorAll("input, textarea")) {
                        const m = c;
                        m.value = m.defaultValue, m.classList.contains("session-resumable-canceled") && (m.classList.add("js-session-resumable"), m.classList.remove("session-resumable-canceled"))
                    }
                    const n = e.currentTarget.closest(".js-comment");
                    return n && n.classList.remove("is-comment-editing"), !0
                }
                p(j, "handleCommentCancelButtonClick"), (0, h.on)("click", ".js-comment-cancel-button", j), (0, h.on)("click", ".js-cancel-issue-edit", function(e) {
                    const t = e.currentTarget.closest(".js-details-container");
                    t.querySelector(".js-comment-form-error").hidden = !0
                }), (0, E.AC)(".js-comment-delete, .js-comment .js-comment-update, .js-issue-update, .js-comment-minimize, .js-comment-unminimize", function(e, t, s) {
                    const n = e.closest(".js-comment");
                    n.classList.add("is-comment-loading");
                    const c = n.getAttribute("data-body-version");
                    c && s.headers.set("X-Body-Version", c)
                }), (0, E.AC)(".js-comment .js-comment-update", async function(e, t) {
                    let s;
                    const n = e.closest(".js-comment"),
                        c = n.querySelector(".js-comment-update-error"),
                        m = n.querySelector(".js-comment-body-error");
                    c instanceof HTMLElement && (c.hidden = !0), m instanceof HTMLElement && (m.hidden = !0), i = [];
                    try {
                        s = await t.json()
                    } catch (L) {
                        if (L.response.status === 422) {
                            const f = JSON.parse(L.response.text);
                            if (f.errors) {
                                c instanceof HTMLElement && (c.textContent = `There was an error posting your comment: ${f.errors.join(", ")}`, c.hidden = !1);
                                return
                            }
                        } else throw L
                    }
                    if (!s) return;
                    const l = s.json;
                    l.errors && l.errors.length > 0 && (i = l.errors, y(m));
                    const q = n.querySelector(".js-comment-body");
                    q && l.body && (q.innerHTML = l.body), n.setAttribute("data-body-version", l.newBodyVersion);
                    const b = n.querySelector(".js-body-version");
                    b instanceof HTMLInputElement && (b.value = l.newBodyVersion);
                    const d = n.querySelector(".js-discussion-poll");
                    d && l.poll && (d.innerHTML = l.poll);
                    for (const L of n.querySelectorAll("input, textarea")) {
                        const f = L;
                        f.defaultValue = f.value
                    }
                    n.classList.remove("is-comment-stale", "is-comment-editing");
                    const S = n.querySelector(".js-comment-edit-history");
                    if (S) {
                        const L = await (0, C.a)(document, l.editUrl);
                        S.innerHTML = "", S.append(L)
                    }
                }), (0, _.N7)(".js-comment-body-error", {
                    add: e => {
                        i && i.length > 0 && y(e)
                    }
                });

                function y(e) {
                    const t = e.querySelector("ol");
                    if (t) {
                        t.innerHTML = "";
                        const s = i.map(n => {
                            const c = document.createElement("li");
                            return c.textContent = n, c
                        });
                        for (const n of s) t.appendChild(n)
                    }
                    e.hidden = !1
                }
                p(y, "showBodyErrors"), (0, E.AC)(".js-comment .js-comment-delete, .js-comment .js-comment-update, .js-comment-minimize, .js-comment-unminimize", async function(e, t) {
                    const s = e.closest(".js-comment");
                    try {
                        await t.text()
                    } catch (n) {
                        if (n.response.status === 422) {
                            let c;
                            try {
                                c = JSON.parse(n.response.text)
                            } catch {}
                            c && c.stale && s.classList.add("is-comment-stale")
                        } else throw n
                    }
                    s.classList.remove("is-comment-loading")
                });

                function g(e, t) {
                    const s = e.querySelector(".js-comment-show-on-error");
                    s && (s.hidden = !t);
                    const n = e.querySelector(".js-comment-hide-on-error");
                    n && (n.hidden = t)
                }
                p(g, "toggleMinimizeError"), (0, E.AC)(".js-timeline-comment-unminimize, .js-timeline-comment-minimize", async function(e, t) {
                    const s = e.closest(".js-minimize-container");
                    try {
                        const n = await t.html();
                        s.replaceWith(n.html)
                    } catch {
                        g(s, !0)
                    }
                }), (0, E.AC)(".js-discussion-comment-unminimize, .js-discussion-comment-minimize", async function(e, t) {
                    const s = e.closest(".js-discussion-comment"),
                        n = s.querySelector(".js-discussion-comment-error");
                    n && (n.hidden = !0);
                    try {
                        const c = await t.html();
                        s.replaceWith(c.html)
                    } catch (c) {
                        if (c.response.status >= 400 && c.response.status < 500) {
                            if (c.response.html) {
                                const m = c.response.html.querySelector(".js-discussion-comment").getAttribute("data-error");
                                n instanceof HTMLElement && (n.textContent = m, n.hidden = !1)
                            }
                        } else throw c
                    }
                }), (0, E.AC)(".js-comment-delete", async function(e, t) {
                    await t.json();
                    let s = e.closest(".js-comment-delete-container");
                    s || (s = e.closest(".js-comment-container") || e.closest(".js-line-comments"), s && s.querySelectorAll(".js-comment").length !== 1 && (s = e.closest(".js-comment"))), s.remove()
                }), (0, E.AC)(".js-issue-update", async function(e, t) {
                    var s, n, c;
                    const m = e.closest(".js-details-container"),
                        l = m.querySelector(".js-comment-form-error");
                    let q;
                    try {
                        q = await t.json()
                    } catch (d) {
                        l.textContent = ((c = (n = (s = d.response) == null ? void 0 : s.json) == null ? void 0 : n.errors) == null ? void 0 : c[0]) || "Something went wrong. Please try again.", l.hidden = !1
                    }
                    if (!q) return;
                    m.classList.remove("open"), l.hidden = !0;
                    const b = q.json;
                    if (b.issue_title != null) {
                        m.querySelector(".js-issue-title").textContent = b.issue_title;
                        const d = m.closest(".js-issues-results");
                        if (d) {
                            if (d.querySelector(".js-merge-pr.is-merging")) {
                                const f = d.querySelector(".js-merge-pull-request textarea");
                                f instanceof HTMLTextAreaElement && f.value === f.defaultValue && (f.value = f.defaultValue = b.issue_title)
                            } else if (d.querySelector(".js-merge-pr.is-squashing")) {
                                const f = d.querySelector(".js-merge-pull-request .js-merge-title");
                                f instanceof HTMLInputElement && f.value === f.defaultValue && (f.value = f.defaultValue = b.default_squash_commit_title)
                            }
                            const S = d.querySelector("button[value=merge]");
                            S && S.setAttribute("data-input-message-value", b.issue_title);
                            const L = d.querySelector("button[value=squash]");
                            L && L.setAttribute("data-input-title-value", b.default_squash_commit_title)
                        }
                    }
                    document.title = b.page_title;
                    for (const d of e.elements)(d instanceof HTMLInputElement || d instanceof HTMLTextAreaElement) && (d.defaultValue = d.value)
                }), (0, E.AC)(".js-comment-minimize", async function(e, t) {
                    await t.json();
                    const s = e.closest(".js-comment"),
                        n = s.querySelector(".js-minimize-comment");
                    if (n && n.classList.contains("js-update-minimized-content")) {
                        const c = e.querySelector("input[type=submit], button[type=submit]");
                        c && c.classList.add("disabled");
                        const m = s.closest(".js-comment-container");
                        m && await (0, v.x0)(m)
                    } else {
                        n && n.classList.add("d-none");
                        const c = e.closest(".unminimized-comment");
                        c.classList.add("d-none"), c.classList.remove("js-comment");
                        const l = e.closest(".js-minimizable-comment-group").querySelector(".minimized-comment");
                        l && l.classList.remove("d-none"), l && l.classList.add("js-comment")
                    }
                }), (0, E.AC)(".js-comment-unminimize", async function(e, t) {
                    await t.json();
                    const s = e.closest(".js-minimizable-comment-group"),
                        n = s.querySelector(".unminimized-comment"),
                        c = s.querySelector(".minimized-comment");
                    if (n) n.classList.remove("d-none"), n.classList.add("js-comment"), c && c.classList.add("d-none"), c && c.classList.remove("js-comment");
                    else {
                        if (c) {
                            const l = c.querySelector(".timeline-comment-actions");
                            l && l.classList.add("d-none"), c.classList.remove("js-comment")
                        }
                        const m = s.closest(".js-comment-container");
                        await (0, v.x0)(m)
                    }
                }), (0, h.on)("details-menu-select", ".js-comment-edit-history-menu", e => {
                    const t = e.detail.relatedTarget.getAttribute("data-edit-history-url");
                    if (!t) return;
                    e.preventDefault();
                    const s = (0, C.a)(document, t);
                    (0, M.W)({
                        content: s,
                        dialogClass: "Box-overlay--wide"
                    })
                }, {
                    capture: !0
                })
            },
            90087: (z, A, u) => {
                u.d(A, {
                    G: () => v
                });
                var h = u(84570),
                    M = u(64463),
                    C = u(59753);
                const D = ["input[pattern]", "input[required]", "textarea[required]", "input[data-required-change]", "textarea[data-required-change]", "input[data-required-value]", "textarea[data-required-value]"].join(",");

                function T(i) {
                    const o = i.getAttribute("data-required-value"),
                        r = i.getAttribute("data-required-value-prefix");
                    if (i.value === o) i.setCustomValidity("");
                    else {
                        let a = o;
                        r && (a = r + a), i.setCustomValidity(a)
                    }
                }
                p(T, "checkValidityForRequiredValueField"), (0, h.q6)("[data-required-value]", function(i) {
                    const o = i.currentTarget;
                    T(o)
                }), (0, C.on)("change", "[data-required-value]", function(i) {
                    const o = i.currentTarget;
                    T(o), v(o.form)
                }), (0, h.q6)("[data-required-trimmed]", function(i) {
                    const o = i.currentTarget;
                    o.value.trim() === "" ? o.setCustomValidity(o.getAttribute("data-required-trimmed")) : o.setCustomValidity("")
                }), (0, C.on)("change", "[data-required-trimmed]", function(i) {
                    const o = i.currentTarget;
                    o.value.trim() === "" ? o.setCustomValidity(o.getAttribute("data-required-trimmed")) : o.setCustomValidity(""), v(o.form)
                }), (0, h.ZG)(D, i => {
                    let o = i.checkValidity();

                    function r() {
                        const a = i.checkValidity();
                        a !== o && i.form && v(i.form), o = a
                    }
                    p(r, "inputHandler"), i.addEventListener("input", r), i.addEventListener("blur", p(function a() {
                        i.removeEventListener("input", r), i.removeEventListener("blur", a)
                    }, "blurHandler"))
                });
                const _ = new WeakMap;

                function E(i) {
                    _.get(i) || (i.addEventListener("change", () => v(i)), _.set(i, !0))
                }
                p(E, "installHandlers");

                function v(i) {
                    const o = i.checkValidity();
                    for (const r of i.querySelectorAll("button[data-disable-invalid]")) r.disabled = !o
                }
                p(v, "validate"), (0, M.N7)("button[data-disable-invalid]", {
                    constructor: HTMLButtonElement,
                    initialize(i) {
                        const o = i.form;
                        o && (E(o), i.disabled = !o.checkValidity())
                    }
                }), (0, M.N7)("input[data-required-change], textarea[data-required-change]", function(i) {
                    const o = i,
                        r = o.type === "radio" && o.form ? o.form.elements.namedItem(o.name).value : null;

                    function a(j) {
                        const y = o.form;
                        if (j && o.type === "radio" && y && r)
                            for (const g of y.elements.namedItem(o.name)) g instanceof HTMLInputElement && g.setCustomValidity(o.value === r ? "unchanged" : "");
                        else o.setCustomValidity(o.value === (r || o.defaultValue) ? "unchanged" : "")
                    }
                    p(a, "customValidity"), o.addEventListener("input", a), o.addEventListener("change", a), a(), o.form && v(o.form)
                }), document.addEventListener("reset", function(i) {
                    if (i.target instanceof HTMLFormElement) {
                        const o = i.target;
                        setTimeout(() => v(o))
                    }
                })
            },
            74136: (z, A, u) => {
                u.d(A, {
                    Of: () => v,
                    WU: () => _,
                    x0: () => E
                });
                var h = u(78694),
                    M = u(64463),
                    C = u(10900),
                    D = u(96776);
                const T = new WeakMap,
                    _ = {};
                async function E(r) {
                    if (T.get(r)) return;
                    const a = r.hasAttribute("data-retain-focus"),
                        j = r.getAttribute("data-url");
                    if (!j) throw new Error("could not get url");
                    const y = new AbortController;
                    T.set(r, y);
                    try {
                        const g = await fetch(j, {
                            signal: y.signal,
                            headers: {
                                Accept: "text/html",
                                "X-Requested-With": "XMLHttpRequest"
                            }
                        });
                        if (!g.ok) return;
                        const e = await g.text();
                        if ((0, h.M)(r, a)) {
                            console.warn("Failed to update content with interactions", r);
                            return
                        }
                        return _[j] = e, i(r, e, a)
                    } catch {} finally {
                        T.delete(r)
                    }
                }
                p(E, "updateContent");
                async function v(r, a, j = !1) {
                    const y = T.get(r);
                    y == null || y.abort();
                    const g = r.closest(".js-updatable-content[data-url], .js-updatable-content [data-url]");
                    return !j && g && g === r && (_[g.getAttribute("data-url") || ""] = a), i(r, a)
                }
                p(v, "replaceContent");

                function i(r, a, j = !1) {
                    return (0, D._8)(document, () => {
                        const y = (0, C.r)(document, a.trim()),
                            g = j && r.ownerDocument && r === r.ownerDocument.activeElement ? y.querySelector("*") : null,
                            e = Array.from(r.querySelectorAll("details[open][id]")).map(t => t.id);
                        r.tagName === "DETAILS" && r.id && r.hasAttribute("open") && e.push(r.id);
                        for (const t of r.querySelectorAll(".js-updatable-content-preserve-scroll-position")) {
                            const s = t.getAttribute("data-updatable-content-scroll-position-id") || "";
                            o.set(s, t.scrollTop)
                        }
                        for (const t of e) {
                            const s = y.querySelector(`#${t}`);
                            s && s.setAttribute("open", "")
                        }
                        r.replaceWith(y), g instanceof HTMLElement && g.focus()
                    })
                }
                p(i, "replace");
                const o = new Map;
                (0, M.N7)(".js-updatable-content-preserve-scroll-position", {
                    constructor: HTMLElement,
                    add(r) {
                        const a = r.getAttribute("data-updatable-content-scroll-position-id");
                        if (!a) return;
                        const j = o.get(a);
                        j != null && (r.scrollTop = j)
                    }
                })
            }
        }
    ]);
})();

//# sourceMappingURL=5222-462abb3686f1.js.map