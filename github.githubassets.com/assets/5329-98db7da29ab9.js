"use strict";
(() => {
    var W = Object.defineProperty;
    var c = (x, F) => W(x, "name", {
        value: F,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [5329], {
            75329: (x, F, _) => {
                _.d(F, {
                    nJ: () => h
                });
                const I = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    R = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                function l(r) {
                    return `0${r}`.slice(-2)
                }
                c(l, "pad");

                function w(r, e) {
                    const t = r.getDay(),
                        n = r.getDate(),
                        s = r.getMonth(),
                        o = r.getFullYear(),
                        i = r.getHours(),
                        u = r.getMinutes(),
                        m = r.getSeconds();
                    return e.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, function(C) {
                        let g;
                        switch (C[1]) {
                            case "%":
                                return "%";
                            case "a":
                                return I[t].slice(0, 3);
                            case "A":
                                return I[t];
                            case "b":
                                return R[s].slice(0, 3);
                            case "B":
                                return R[s];
                            case "c":
                                return r.toString();
                            case "d":
                                return l(n);
                            case "e":
                                return String(n);
                            case "H":
                                return l(i);
                            case "I":
                                return l(w(r, "%l"));
                            case "l":
                                return String(i === 0 || i === 12 ? 12 : (i + 12) % 12);
                            case "m":
                                return l(s + 1);
                            case "M":
                                return l(u);
                            case "p":
                                return i > 11 ? "PM" : "AM";
                            case "P":
                                return i > 11 ? "pm" : "am";
                            case "S":
                                return l(m);
                            case "w":
                                return String(t);
                            case "y":
                                return l(o % 100);
                            case "Y":
                                return String(o);
                            case "Z":
                                return g = r.toString().match(/\((\w+)\)$/), g ? g[1] : "";
                            case "z":
                                return g = r.toString().match(/\w([+-]\d\d\d\d) /), g ? g[1] : ""
                        }
                        return ""
                    })
                }
                c(w, "strftime");

                function y(r) {
                    let e;
                    return function() {
                        if (e) return e;
                        if ("Intl" in window) try {
                            return e = new Intl.DateTimeFormat(void 0, r), e
                        } catch (t) {
                            if (!(t instanceof RangeError)) throw t
                        }
                    }
                }
                c(y, "makeFormatter");
                let b = null;
                const v = y({
                    day: "numeric",
                    month: "short"
                });

                function U() {
                    if (b !== null) return b;
                    const r = v();
                    return r ? (b = !!r.format(new Date(0)).match(/^\d/), b) : !1
                }
                c(U, "isDayFirst");
                let p = null;
                const H = y({
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });

                function z() {
                    if (p !== null) return p;
                    const r = H();
                    return r ? (p = !!r.format(new Date(0)).match(/\d,/), p) : !0
                }
                c(z, "isYearSeparator");

                function q(r) {
                    return new Date().getUTCFullYear() === r.getUTCFullYear()
                }
                c(q, "isThisYear");

                function J(r, e) {
                    if ("Intl" in window && "RelativeTimeFormat" in window.Intl) try {
                        return new Intl.RelativeTimeFormat(r, e)
                    } catch (t) {
                        if (!(t instanceof RangeError)) throw t
                    }
                }
                c(J, "makeRelativeFormat");

                function M(r) {
                    const e = r.closest("[lang]");
                    return e instanceof HTMLElement && e.lang ? e.lang : "default"
                }
                c(M, "localeFromElement");
                const k = new WeakMap;
                class A extends HTMLElement {
                    static get observedAttributes() {
                        return ["datetime", "day", "format", "lang", "hour", "minute", "month", "second", "title", "weekday", "year", "time-zone-name"]
                    }
                    connectedCallback() {
                        const e = this.getFormattedTitle();
                        e && !this.hasAttribute("title") && this.setAttribute("title", e);
                        const t = this.getFormattedDate();
                        t && (this.textContent = t)
                    }
                    attributeChangedCallback(e, t, n) {
                        const s = this.getFormattedTitle();
                        if (e === "datetime") {
                            const m = Date.parse(n);
                            isNaN(m) ? k.delete(this) : k.set(this, new Date(m))
                        }
                        const o = this.getFormattedTitle(),
                            i = this.getAttribute("title");
                        e !== "title" && o && (!i || i === s) && this.setAttribute("title", o);
                        const u = this.getFormattedDate();
                        u && (this.textContent = u)
                    }
                    get date() {
                        return k.get(this)
                    }
                    getFormattedTitle() {
                        const e = this.date;
                        if (!e) return;
                        const t = L();
                        if (t) return t.format(e);
                        try {
                            return e.toLocaleString()
                        } catch (n) {
                            if (n instanceof RangeError) return e.toString();
                            throw n
                        }
                    }
                    getFormattedDate() {}
                }
                c(A, "ExtendedTimeElement");
                const L = y({
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        timeZoneName: "short"
                    }),
                    D = new WeakMap;
                class E extends A {
                    attributeChangedCallback(e, t, n) {
                        (e === "hour" || e === "minute" || e === "second" || e === "time-zone-name") && D.delete(this), super.attributeChangedCallback(e, t, n)
                    }
                    getFormattedDate() {
                        const e = this.date;
                        if (!e) return;
                        const t = P(this, e) || "",
                            n = Z(this, e) || "";
                        return `${t} ${n}`.trim()
                    }
                }
                c(E, "LocalTimeElement");

                function P(r, e) {
                    const t = {
                        weekday: {
                            short: "%a",
                            long: "%A"
                        },
                        day: {
                            numeric: "%e",
                            "2-digit": "%d"
                        },
                        month: {
                            short: "%b",
                            long: "%B"
                        },
                        year: {
                            numeric: "%Y",
                            "2-digit": "%y"
                        }
                    };
                    let n = U() ? "weekday day month year" : "weekday month day, year";
                    for (const s in t) {
                        const o = t[s][r.getAttribute(s) || ""];
                        n = n.replace(s, o || "")
                    }
                    return n = n.replace(/(\s,)|(,\s$)/, ""), w(e, n).replace(/\s+/, " ").trim()
                }
                c(P, "formatDate");

                function Z(r, e) {
                    const t = {},
                        n = r.getAttribute("hour");
                    (n === "numeric" || n === "2-digit") && (t.hour = n);
                    const s = r.getAttribute("minute");
                    (s === "numeric" || s === "2-digit") && (t.minute = s);
                    const o = r.getAttribute("second");
                    (o === "numeric" || o === "2-digit") && (t.second = o);
                    const i = r.getAttribute("time-zone-name");
                    if ((i === "short" || i === "long") && (t.timeZoneName = i), Object.keys(t).length === 0) return;
                    let u = D.get(r);
                    u || (u = y(t), D.set(r, u));
                    const m = u();
                    if (m) return m.format(e); {
                        const C = t.second ? "%H:%M:%S" : "%H:%M";
                        return w(e, C)
                    }
                }
                c(Z, "formatTime"), window.customElements.get("local-time") || (window.LocalTimeElement = E, window.customElements.define("local-time", E));
                class d {
                    constructor(e, t) {
                        this.date = e, this.locale = t
                    }
                    toString() {
                        const e = this.timeElapsed();
                        if (e) return e; {
                            const t = this.timeAhead();
                            return t || `on ${this.formatDate()}`
                        }
                    }
                    timeElapsed() {
                        const e = new Date().getTime() - this.date.getTime(),
                            t = Math.round(e / 1e3),
                            n = Math.round(t / 60),
                            s = Math.round(n / 60),
                            o = Math.round(s / 24);
                        return e >= 0 && o < 30 ? this.timeAgoFromMs(e) : null
                    }
                    timeAhead() {
                        const e = this.date.getTime() - new Date().getTime(),
                            t = Math.round(e / 1e3),
                            n = Math.round(t / 60),
                            s = Math.round(n / 60),
                            o = Math.round(s / 24);
                        return e >= 0 && o < 30 ? this.timeUntil() : null
                    }
                    timeAgo() {
                        const e = new Date().getTime() - this.date.getTime();
                        return this.timeAgoFromMs(e)
                    }
                    timeAgoFromMs(e) {
                        const t = Math.round(e / 1e3),
                            n = Math.round(t / 60),
                            s = Math.round(n / 60),
                            o = Math.round(s / 24),
                            i = Math.round(o / 30),
                            u = Math.round(i / 12);
                        return e < 0 ? a(this.locale, 0, "second") : t < 10 ? a(this.locale, 0, "second") : t < 45 ? a(this.locale, -t, "second") : t < 90 ? a(this.locale, -n, "minute") : n < 45 ? a(this.locale, -n, "minute") : n < 90 ? a(this.locale, -s, "hour") : s < 24 ? a(this.locale, -s, "hour") : s < 36 ? a(this.locale, -o, "day") : o < 30 ? a(this.locale, -o, "day") : i < 18 ? a(this.locale, -i, "month") : a(this.locale, -u, "year")
                    }
                    microTimeAgo() {
                        const e = new Date().getTime() - this.date.getTime(),
                            t = Math.round(e / 1e3),
                            n = Math.round(t / 60),
                            s = Math.round(n / 60),
                            o = Math.round(s / 24),
                            i = Math.round(o / 30),
                            u = Math.round(i / 12);
                        return n < 1 ? "1m" : n < 60 ? `${n}m` : s < 24 ? `${s}h` : o < 365 ? `${o}d` : `${u}y`
                    }
                    timeUntil() {
                        const e = this.date.getTime() - new Date().getTime();
                        return this.timeUntilFromMs(e)
                    }
                    timeUntilFromMs(e) {
                        const t = Math.round(e / 1e3),
                            n = Math.round(t / 60),
                            s = Math.round(n / 60),
                            o = Math.round(s / 24),
                            i = Math.round(o / 30),
                            u = Math.round(i / 12);
                        return i >= 18 ? a(this.locale, u, "year") : i >= 12 ? a(this.locale, u, "year") : o >= 45 ? a(this.locale, i, "month") : o >= 30 ? a(this.locale, i, "month") : s >= 36 ? a(this.locale, o, "day") : s >= 24 ? a(this.locale, o, "day") : n >= 90 ? a(this.locale, s, "hour") : n >= 45 ? a(this.locale, s, "hour") : t >= 90 ? a(this.locale, n, "minute") : t >= 45 ? a(this.locale, n, "minute") : t >= 10 ? a(this.locale, t, "second") : a(this.locale, 0, "second")
                    }
                    microTimeUntil() {
                        const e = this.date.getTime() - new Date().getTime(),
                            t = Math.round(e / 1e3),
                            n = Math.round(t / 60),
                            s = Math.round(n / 60),
                            o = Math.round(s / 24),
                            i = Math.round(o / 30),
                            u = Math.round(i / 12);
                        return o >= 365 ? `${u}y` : s >= 24 ? `${o}d` : n >= 60 ? `${s}h` : n > 1 ? `${n}m` : "1m"
                    }
                    formatDate() {
                        let e = U() ? "%e %b" : "%b %e";
                        return q(this.date) || (e += z() ? ", %Y" : " %Y"), w(this.date, e)
                    }
                    formatTime() {
                        const e = O();
                        return e ? e.format(this.date) : w(this.date, "%l:%M%P")
                    }
                }
                c(d, "RelativeTime");

                function a(r, e, t) {
                    const n = J(r, {
                        numeric: "auto"
                    });
                    return n ? n.format(e, t) : B(e, t)
                }
                c(a, "formatRelativeTime");

                function B(r, e) {
                    if (r === 0) switch (e) {
                        case "year":
                        case "quarter":
                        case "month":
                        case "week":
                            return `this ${e}`;
                        case "day":
                            return "today";
                        case "hour":
                        case "minute":
                            return `in 0 ${e}s`;
                        case "second":
                            return "now"
                    } else if (r === 1) switch (e) {
                        case "year":
                        case "quarter":
                        case "month":
                        case "week":
                            return `next ${e}`;
                        case "day":
                            return "tomorrow";
                        case "hour":
                        case "minute":
                        case "second":
                            return `in 1 ${e}`
                    } else if (r === -1) switch (e) {
                        case "year":
                        case "quarter":
                        case "month":
                        case "week":
                            return `last ${e}`;
                        case "day":
                            return "yesterday";
                        case "hour":
                        case "minute":
                        case "second":
                            return `1 ${e} ago`
                    } else if (r > 1) switch (e) {
                        case "year":
                        case "quarter":
                        case "month":
                        case "week":
                        case "day":
                        case "hour":
                        case "minute":
                        case "second":
                            return `in ${r} ${e}s`
                    } else if (r < -1) switch (e) {
                        case "year":
                        case "quarter":
                        case "month":
                        case "week":
                        case "day":
                        case "hour":
                        case "minute":
                        case "second":
                            return `${-r} ${e}s ago`
                    }
                    throw new RangeError(`Invalid unit argument for format() '${e}'`)
                }
                c(B, "formatEnRelativeTime");
                const O = y({
                    hour: "numeric",
                    minute: "2-digit"
                });
                class h extends A {
                    getFormattedDate() {
                        const e = this.date;
                        if (!!e) return new d(e, M(this)).toString()
                    }
                    connectedCallback() {
                        f.push(this), T || (Y(), T = window.setInterval(Y, 60 * 1e3)), super.connectedCallback()
                    }
                    disconnectedCallback() {
                        const e = f.indexOf(this);
                        e !== -1 && f.splice(e, 1), f.length || T && (clearInterval(T), T = null)
                    }
                }
                c(h, "RelativeTimeElement");
                const f = [];
                let T;

                function Y() {
                    let r, e, t;
                    for (e = 0, t = f.length; e < t; e++) r = f[e], r.textContent = r.getFormattedDate() || ""
                }
                c(Y, "updateNowElements"), window.customElements.get("relative-time") || (window.RelativeTimeElement = h, window.customElements.define("relative-time", h));
                class $ extends h {
                    getFormattedDate() {
                        const e = this.getAttribute("format"),
                            t = this.date;
                        if (!!t) return e === "micro" ? new d(t, M(this)).microTimeAgo() : new d(t, M(this)).timeAgo()
                    }
                }
                c($, "TimeAgoElement"), window.customElements.get("time-ago") || (window.TimeAgoElement = $, window.customElements.define("time-ago", $));
                class S extends h {
                    getFormattedDate() {
                        const e = this.getAttribute("format"),
                            t = this.date;
                        if (!!t) return e === "micro" ? new d(t, M(this)).microTimeUntil() : new d(t, M(this)).timeUntil()
                    }
                }
                c(S, "TimeUntilElement"), window.customElements.get("time-until") || (window.TimeUntilElement = S, window.customElements.define("time-until", S))
            }
        }
    ]);
})();

//# sourceMappingURL=5329-a5df13ab72fa.js.map