"use strict";
(() => {
    var j = Object.defineProperty;
    var h = (d, m) => j(d, "name", {
        value: m,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [877], {
            77401: (d, m, n) => {
                const o = new Map;

                function f(l) {
                    for (const s of o.keys())
                        if (customElements.get(s) || l.querySelector(s) || l.matches(s)) {
                            for (const g of o.get(s) || []) g();
                            o.delete(s)
                        }
                }
                h(f, "scan");
                let P = !1;

                function y() {
                    P = !0, f(document.body), new MutationObserver(s => {
                        if (!!o.size)
                            for (const g of s)
                                for (const v of g.addedNodes) v instanceof Element && f(v)
                    }).observe(document, {
                        subtree: !0,
                        childList: !0
                    })
                }
                h(y, "prepare");

                function t(l, s) {
                    o.has(l) || o.set(l, []), o.get(l).push(s), document.readyState === "interactive" || document.readyState === "complete" ? P ? f(document.body) : y() : document.addEventListener("DOMContentLoaded", y, {
                        once: !0
                    })
                }
                h(t, "whenSeen"), t("auto-playable", () => n.e(475).then(n.bind(n, 40475))), t("launch-code", () => n.e(4609).then(n.bind(n, 84609))), t("metric-selection", () => n.e(4340).then(n.bind(n, 34340))), t("severity-calculator", () => Promise.all([n.e(5724), n.e(8628)]).then(n.bind(n, 8628))), t("sku-list", () => n.e(5619).then(n.bind(n, 15619))), t("command-palette-page", () => Promise.all([n.e(6319), n.e(5623), n.e(4656)]).then(n.bind(n, 14656))), t("command-palette-page-stack", () => Promise.all([n.e(6319), n.e(5623), n.e(9039)]).then(n.bind(n, 39039))), t("command-palette-pjax-metadata", () => n.e(280).then(n.bind(n, 80280))), t("readme-toc", () => n.e(1416).then(n.bind(n, 61416))), t("delayed-loading", () => n.e(6970).then(n.bind(n, 6970))), t("feature-callout", () => n.e(7986).then(n.bind(n, 87986))), t("reopen-button", () => n.e(9378).then(n.bind(n, 89378))), t("codespaces-policy-form", () => n.e(1454).then(n.bind(n, 11454))), t("action-list", () => n.e(965).then(n.bind(n, 70965))), t("navigation-list", () => n.e(4182).then(n.bind(n, 14182))), t("action-menu", () => n.e(7028).then(n.bind(n, 67028))), t("iterate-focusable-elements.ts", () => n.e(5163).then(n.bind(n, 55163))), t("modal-dialog", () => n.e(711).then(n.bind(n, 20711))), t("file-filter", () => n.e(4510).then(n.bind(n, 44510))), t("file-tree", () => n.e(7259).then(n.bind(n, 57259))), t("file-tree-toggle", () => n.e(2479).then(n.bind(n, 52479))), t("memex-project-picker", () => n.e(3603).then(n.bind(n, 83603))), t("project-picker", () => Promise.all([n.e(6494), n.e(3682), n.e(7768)]).then(n.bind(n, 17768))), t("monthly-spend-graph", () => Promise.all([n.e(6219), n.e(5375)]).then(n.bind(n, 65375))), t("profile-pins", () => Promise.all([n.e(93), n.e(1330)]).then(n.bind(n, 1330))), t("emoji-picker", () => n.e(6946).then(n.bind(n, 96946))), t("edit-hook-secret", () => n.e(7887).then(n.bind(n, 7887))), t("insights-query", () => n.e(5454).then(n.bind(n, 75454))), t("remote-clipboard-copy", () => Promise.all([n.e(5724), n.e(296)]).then(n.bind(n, 50296))), t("series-table", () => n.e(4922).then(n.bind(n, 14922))), t("line-chart", () => Promise.all([n.e(1439), n.e(4668)]).then(n.bind(n, 94668))), t("bar-chart", () => Promise.all([n.e(8127), n.e(4722)]).then(n.bind(n, 4722))), t("column-chart", () => Promise.all([n.e(3268), n.e(8787)]).then(n.bind(n, 78787))), t("stacked-area-chart", () => Promise.all([n.e(857), n.e(5825)]).then(n.bind(n, 25825))), t("presence-avatars", () => n.e(6427).then(n.bind(n, 66427))), t("pulse-authors-graph", () => Promise.all([n.e(218), n.e(6917)]).then(n.bind(n, 26917))), t("stacks-input-config-view", () => Promise.all([n.e(5724), n.e(93), n.e(7295)]).then(n.bind(n, 57295))), t("community-contributions-graph", () => Promise.all([n.e(218), n.e(3972)]).then(n.bind(n, 13972))), t("discussion-page-views-graph", () => Promise.all([n.e(218), n.e(224)]).then(n.bind(n, 60224))), t("discussions-daily-contributors", () => Promise.all([n.e(218), n.e(1666)]).then(n.bind(n, 71666))), t("discussions-new-contributors", () => Promise.all([n.e(218), n.e(313)]).then(n.bind(n, 20313))), t("code-frequency-graph", () => Promise.all([n.e(218), n.e(4598), n.e(3730)]).then(n.bind(n, 53730))), t("contributors-graph", () => Promise.all([n.e(218), n.e(4598), n.e(7275), n.e(7432), n.e(8562)]).then(n.bind(n, 38562))), t("org-insights-graph", () => Promise.all([n.e(218), n.e(4598), n.e(5670), n.e(6401)]).then(n.bind(n, 36401))), t("traffic-clones-graph", () => Promise.all([n.e(5724), n.e(218), n.e(4598), n.e(1886), n.e(3010)]).then(n.bind(n, 33010))), t("traffic-visitors-graph", () => Promise.all([n.e(5724), n.e(218), n.e(4598), n.e(1886), n.e(5897)]).then(n.bind(n, 15897))), t("commit-activity-graph", () => Promise.all([n.e(218), n.e(4598), n.e(7275), n.e(5883)]).then(n.bind(n, 35883))), t("marketplace-insights-graph", () => Promise.all([n.e(218), n.e(4598), n.e(1886), n.e(6877)]).then(n.bind(n, 36877))), t("user-sessions-map", () => Promise.all([n.e(218), n.e(7275), n.e(6266), n.e(5676)]).then(n.bind(n, 45676))), t("reload-after-polling", () => n.e(33).then(n.bind(n, 33))), t("package-dependencies-security-graph", () => Promise.all([n.e(218), n.e(770)]).then(n.bind(n, 40770))), t(".js-sub-dependencies", () => n.e(8422).then(n.bind(n, 28422))), t("network-graph", () => Promise.all([n.e(4386), n.e(2941)]).then(n.bind(n, 2941))), t("business-audit-log-map", () => Promise.all([n.e(218), n.e(7275), n.e(6266), n.e(3682), n.e(5183)]).then(n.bind(n, 45183))), t("inline-machine-translation", () => n.e(935).then(n.bind(n, 20935)))
            }
        },
        d => {
            var m = h(o => d(d.s = o), "__webpack_exec__"),
                n = m(77401)
        }
    ]);
})();

//# sourceMappingURL=element-registry-378ea84e6f02.js.map