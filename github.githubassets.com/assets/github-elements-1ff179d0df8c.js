"use strict";
(() => {
    var O = Object.defineProperty;
    var l = (t, e) => O(t, "name", {
        value: e,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [7139], {
            12070: (t, e, _) => {
                var E = _(6071),
                    n = _(38257),
                    a = _(14840),
                    M = _(57260),
                    D = _(13002),
                    P = _(73921),
                    m = _(27034),
                    h = _(51941),
                    g = _(88309),
                    s = _(40987),
                    u = _(57852),
                    o = _(88823),
                    d = _(19935)
            },
            19935: (t, e, _) => {
                var E = _(27034);
                window.IncludeFragmentElement.prototype.fetch = n => (n.headers.append("X-Requested-With", "XMLHttpRequest"), window.fetch(n))
            }
        },
        t => {
            var e = l(E => t(t.s = E), "__webpack_exec__");
            t.O(0, [5329, 2486, 8475], () => e(12070));
            var _ = t.O()
        }
    ]);
})();

//# sourceMappingURL=github-elements-5e21fef1720a.js.map