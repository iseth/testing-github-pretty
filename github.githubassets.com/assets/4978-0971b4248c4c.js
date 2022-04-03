(() => {
    var Vt = Object.defineProperty;
    var l = (W, g) => Vt(W, "name", {
        value: g,
        configurable: !0
    });
    (globalThis.webpackChunk = globalThis.webpackChunk || []).push([
        [4978], {
            53949: (W, g, L) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var v = L(13196);

                function V() {
                    return Math.round(Math.random() * 1e3)
                }
                l(V, "randomMilliseconds");
                var C = function() {
                    function N() {
                        this.errorCount = 0
                    }
                    return l(N, "BackoffController"), N.prototype.getDelay = function() {
                        if (this.errorCount === 0) return 0;
                        var y = v.BACKOFF_BASE_WAIT_SECONDS_BY_ERROR_COUNT[Math.min(v.BACKOFF_BASE_WAIT_SECONDS_BY_ERROR_COUNT.length - 1, this.errorCount)];
                        return y * 1e3 + V()
                    }, N.prototype.countError = function() {
                        this.errorCount < v.BACKOFF_BASE_WAIT_SECONDS_BY_ERROR_COUNT.length - 1 && this.errorCount++
                    }, N.prototype.reset = function() {
                        this.errorCount = 0
                    }, N
                }();
                g.default = C
            },
            20731: function(W, g, L) {
                "use strict";
                var v = this && this.__extends || function() {
                        var O = l(function(A, R) {
                            return O = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function(I, P) {
                                I.__proto__ = P
                            } || function(I, P) {
                                for (var a in P) P.hasOwnProperty(a) && (I[a] = P[a])
                            }, O(A, R)
                        }, "extendStatics");
                        return function(A, R) {
                            O(A, R);

                            function I() {
                                this.constructor = A
                            }
                            l(I, "__"), A.prototype = R === null ? Object.create(R) : (I.prototype = R.prototype, new I)
                        }
                    }(),
                    V = this && this.__importDefault || function(O) {
                        return O && O.__esModule ? O : {
                            default: O
                        }
                    };
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var C = L(80064),
                    N = V(L(20377)),
                    y = function(O) {
                        v(A, O);

                        function A() {
                            return O !== null && O.apply(this, arguments) || this
                        }
                        return l(A, "BrowserDatafileManager"), A.prototype.makeGetRequest = function(R, I) {
                            return C.makeGetRequest(R, I)
                        }, A.prototype.getConfigDefaults = function() {
                            return {
                                autoUpdate: !1
                            }
                        }, A
                    }(N.default);
                g.default = y
            },
            80064: (W, g, L) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var v = L(13196),
                    V = L(98125),
                    C = V.getLogger("DatafileManager"),
                    N = "GET",
                    y = 4;

                function O(I) {
                    var P = I.getAllResponseHeaders();
                    if (P === null) return {};
                    var a = P.split(`\r
`),
                        E = {};
                    return a.forEach(function(u) {
                        var h = u.indexOf(": ");
                        if (h > -1) {
                            var _ = u.slice(0, h),
                                d = u.slice(h + 2);
                            d.length > 0 && (E[_] = d)
                        }
                    }), E
                }
                l(O, "parseHeadersFromXhr");

                function A(I, P) {
                    Object.keys(I).forEach(function(a) {
                        var E = I[a];
                        P.setRequestHeader(a, E)
                    })
                }
                l(A, "setHeadersInXhr");

                function R(I, P) {
                    var a = new XMLHttpRequest,
                        E = new Promise(function(u, h) {
                            a.open(N, I, !0), A(P, a), a.onreadystatechange = function() {
                                if (a.readyState === y) {
                                    var _ = a.status;
                                    if (_ === 0) {
                                        h(new Error("Request error"));
                                        return
                                    }
                                    var d = O(a),
                                        M = {
                                            statusCode: a.status,
                                            body: a.responseText,
                                            headers: d
                                        };
                                    u(M)
                                }
                            }, a.timeout = v.REQUEST_TIMEOUT_MS, a.ontimeout = function() {
                                C.error("Request timed out")
                            }, a.send()
                        });
                    return {
                        responsePromise: E,
                        abort: function() {
                            a.abort()
                        }
                    }
                }
                l(R, "makeGetRequest"), g.makeGetRequest = R
            },
            13196: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.DEFAULT_UPDATE_INTERVAL = 5 * 60 * 1e3, g.MIN_UPDATE_INTERVAL = 1e3, g.DEFAULT_URL_TEMPLATE = "https://cdn.optimizely.com/datafiles/%s.json", g.DEFAULT_AUTHENTICATED_URL_TEMPLATE = "https://config.optimizely.com/datafiles/auth/%s.json", g.BACKOFF_BASE_WAIT_SECONDS_BY_ERROR_COUNT = [0, 8, 16, 32, 64, 128, 256, 512], g.REQUEST_TIMEOUT_MS = 60 * 1e3
            },
            10181: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var L = function() {
                    function v() {
                        this.listeners = {}, this.listenerId = 1
                    }
                    return l(v, "EventEmitter"), v.prototype.on = function(V, C) {
                        var N = this;
                        this.listeners[V] || (this.listeners[V] = {});
                        var y = String(this.listenerId);
                        return this.listenerId++, this.listeners[V][y] = C,
                            function() {
                                N.listeners[V] && delete N.listeners[V][y]
                            }
                    }, v.prototype.emit = function(V, C) {
                        var N = this.listeners[V];
                        N && Object.keys(N).forEach(function(y) {
                            var O = N[y];
                            O(C)
                        })
                    }, v.prototype.removeAllListeners = function() {
                        this.listeners = {}
                    }, v
                }();
                g.default = L
            },
            20377: function(W, g, L) {
                "use strict";
                var v = this && this.__assign || function() {
                        return v = Object.assign || function(h) {
                            for (var _, d = 1, M = arguments.length; d < M; d++) {
                                _ = arguments[d];
                                for (var U in _) Object.prototype.hasOwnProperty.call(_, U) && (h[U] = _[U])
                            }
                            return h
                        }, v.apply(this, arguments)
                    },
                    V = this && this.__importDefault || function(h) {
                        return h && h.__esModule ? h : {
                            default: h
                        }
                    };
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var C = L(98125),
                    N = L(27378),
                    y = V(L(10181)),
                    O = L(13196),
                    A = V(L(53949)),
                    R = C.getLogger("DatafileManager"),
                    I = "update";

                function P(h) {
                    return h >= O.MIN_UPDATE_INTERVAL
                }
                l(P, "isValidUpdateInterval");

                function a(h) {
                    return h >= 200 && h < 400
                }
                l(a, "isSuccessStatusCode");
                var E = {
                        get: function() {
                            return Promise.resolve("")
                        },
                        set: function() {
                            return Promise.resolve()
                        },
                        contains: function() {
                            return Promise.resolve(!1)
                        },
                        remove: function() {
                            return Promise.resolve()
                        }
                    },
                    u = function() {
                        function h(_) {
                            var d = this,
                                M = v(v({}, this.getConfigDefaults()), _),
                                U = M.datafile,
                                m = M.autoUpdate,
                                D = m === void 0 ? !1 : m,
                                k = M.sdkKey,
                                q = M.updateInterval,
                                te = q === void 0 ? O.DEFAULT_UPDATE_INTERVAL : q,
                                fe = M.urlTemplate,
                                ve = fe === void 0 ? O.DEFAULT_URL_TEMPLATE : fe,
                                ye = M.cache,
                                Le = ye === void 0 ? E : ye;
                            this.cache = Le, this.cacheKey = "opt-datafile-" + k, this.isReadyPromiseSettled = !1, this.readyPromiseResolver = function() {}, this.readyPromiseRejecter = function() {}, this.readyPromise = new Promise(function(Oe, b) {
                                d.readyPromiseResolver = Oe, d.readyPromiseRejecter = b
                            }), U ? (this.currentDatafile = U, k || this.resolveReadyPromise()) : this.currentDatafile = "", this.isStarted = !1, this.datafileUrl = N.sprintf(ve, k), this.emitter = new y.default, this.autoUpdate = D, P(te) ? this.updateInterval = te : (R.warn("Invalid updateInterval %s, defaulting to %s", te, O.DEFAULT_UPDATE_INTERVAL), this.updateInterval = O.DEFAULT_UPDATE_INTERVAL), this.currentTimeout = null, this.currentRequest = null, this.backoffController = new A.default, this.syncOnCurrentRequestComplete = !1
                        }
                        return l(h, "HttpPollingDatafileManager"), h.prototype.get = function() {
                            return this.currentDatafile
                        }, h.prototype.start = function() {
                            this.isStarted || (R.debug("Datafile manager started"), this.isStarted = !0, this.backoffController.reset(), this.setDatafileFromCacheIfAvailable(), this.syncDatafile())
                        }, h.prototype.stop = function() {
                            return R.debug("Datafile manager stopped"), this.isStarted = !1, this.currentTimeout && (clearTimeout(this.currentTimeout), this.currentTimeout = null), this.emitter.removeAllListeners(), this.currentRequest && (this.currentRequest.abort(), this.currentRequest = null), Promise.resolve()
                        }, h.prototype.onReady = function() {
                            return this.readyPromise
                        }, h.prototype.on = function(_, d) {
                            return this.emitter.on(_, d)
                        }, h.prototype.onRequestRejected = function(_) {
                            !this.isStarted || (this.backoffController.countError(), _ instanceof Error ? R.error("Error fetching datafile: %s", _.message, _) : typeof _ == "string" ? R.error("Error fetching datafile: %s", _) : R.error("Error fetching datafile"))
                        }, h.prototype.onRequestResolved = function(_) {
                            if (!!this.isStarted) {
                                typeof _.statusCode != "undefined" && a(_.statusCode) ? this.backoffController.reset() : this.backoffController.countError(), this.trySavingLastModified(_.headers);
                                var d = this.getNextDatafileFromResponse(_);
                                if (d !== "")
                                    if (R.info("Updating datafile from response"), this.currentDatafile = d, this.cache.set(this.cacheKey, d), !this.isReadyPromiseSettled) this.resolveReadyPromise();
                                    else {
                                        var M = {
                                            datafile: d
                                        };
                                        this.emitter.emit(I, M)
                                    }
                            }
                        }, h.prototype.onRequestComplete = function() {
                            !this.isStarted || (this.currentRequest = null, !this.isReadyPromiseSettled && !this.autoUpdate && this.rejectReadyPromise(new Error("Failed to become ready")), this.autoUpdate && this.syncOnCurrentRequestComplete && this.syncDatafile(), this.syncOnCurrentRequestComplete = !1)
                        }, h.prototype.syncDatafile = function() {
                            var _ = this,
                                d = {};
                            this.lastResponseLastModified && (d["if-modified-since"] = this.lastResponseLastModified), R.debug("Making datafile request to url %s with headers: %s", this.datafileUrl, function() {
                                return JSON.stringify(d)
                            }), this.currentRequest = this.makeGetRequest(this.datafileUrl, d);
                            var M = l(function() {
                                    _.onRequestComplete()
                                }, "onRequestComplete"),
                                U = l(function(D) {
                                    _.onRequestResolved(D)
                                }, "onRequestResolved"),
                                m = l(function(D) {
                                    _.onRequestRejected(D)
                                }, "onRequestRejected");
                            this.currentRequest.responsePromise.then(U, m).then(M, M), this.autoUpdate && this.scheduleNextUpdate()
                        }, h.prototype.resolveReadyPromise = function() {
                            this.readyPromiseResolver(), this.isReadyPromiseSettled = !0
                        }, h.prototype.rejectReadyPromise = function(_) {
                            this.readyPromiseRejecter(_), this.isReadyPromiseSettled = !0
                        }, h.prototype.scheduleNextUpdate = function() {
                            var _ = this,
                                d = this.backoffController.getDelay(),
                                M = Math.max(d, this.updateInterval);
                            R.debug("Scheduling sync in %s ms", M), this.currentTimeout = setTimeout(function() {
                                _.currentRequest ? _.syncOnCurrentRequestComplete = !0 : _.syncDatafile()
                            }, M)
                        }, h.prototype.getNextDatafileFromResponse = function(_) {
                            return R.debug("Response status code: %s", _.statusCode), typeof _.statusCode == "undefined" || _.statusCode === 304 ? "" : a(_.statusCode) ? _.body : ""
                        }, h.prototype.trySavingLastModified = function(_) {
                            var d = _["last-modified"] || _["Last-Modified"];
                            typeof d != "undefined" && (this.lastResponseLastModified = d, R.debug("Saved last modified header value from response: %s", this.lastResponseLastModified))
                        }, h.prototype.setDatafileFromCacheIfAvailable = function() {
                            var _ = this;
                            this.cache.get(this.cacheKey).then(function(d) {
                                _.isStarted && !_.isReadyPromiseSettled && d !== "" && (R.debug("Using datafile from cache"), _.currentDatafile = d, _.resolveReadyPromise())
                            })
                        }, h
                    }();
                g.default = u
            },
            62002: (W, g, L) => {
                "use strict";
                var v;
                v = {
                    value: !0
                };
                var V = L(20731);
                g.z = V.default
            },
            67473: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                })
            },
            24909: (W, g, L) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.sendEventNotification = g.getQueue = g.validateAndGetBatchSize = g.validateAndGetFlushInterval = g.DEFAULT_BATCH_SIZE = g.DEFAULT_FLUSH_INTERVAL = void 0;
                var v = L(31459),
                    V = L(98125),
                    C = L(27378);
                g.DEFAULT_FLUSH_INTERVAL = 3e4, g.DEFAULT_BATCH_SIZE = 10;
                var N = V.getLogger("EventProcessor");

                function y(I) {
                    return I <= 0 && (N.warn("Invalid flushInterval " + I + ", defaulting to " + g.DEFAULT_FLUSH_INTERVAL), I = g.DEFAULT_FLUSH_INTERVAL), I
                }
                l(y, "validateAndGetFlushInterval"), g.validateAndGetFlushInterval = y;

                function O(I) {
                    return I = Math.floor(I), I < 1 && (N.warn("Invalid batchSize " + I + ", defaulting to " + g.DEFAULT_BATCH_SIZE), I = g.DEFAULT_BATCH_SIZE), I = Math.max(1, I), I
                }
                l(O, "validateAndGetBatchSize"), g.validateAndGetBatchSize = O;

                function A(I, P, a, E) {
                    var u;
                    return I > 1 ? u = new v.DefaultEventQueue({
                        flushInterval: P,
                        maxQueueSize: I,
                        sink: a,
                        batchComparator: E
                    }) : u = new v.SingleEventQueue({
                        sink: a
                    }), u
                }
                l(A, "getQueue"), g.getQueue = A;

                function R(I, P) {
                    I && I.sendNotifications(C.NOTIFICATION_TYPES.LOG_EVENT, P)
                }
                l(R, "sendEventNotification"), g.sendEventNotification = R
            },
            31459: (W, g, L) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.DefaultEventQueue = g.SingleEventQueue = void 0;
                var v = L(98125),
                    V = v.getLogger("EventProcessor"),
                    C = function() {
                        function O(A) {
                            var R = A.timeout,
                                I = A.callback;
                            this.timeout = Math.max(R, 0), this.callback = I
                        }
                        return l(O, "Timer"), O.prototype.start = function() {
                            this.timeoutId = setTimeout(this.callback, this.timeout)
                        }, O.prototype.refresh = function() {
                            this.stop(), this.start()
                        }, O.prototype.stop = function() {
                            this.timeoutId && clearTimeout(this.timeoutId)
                        }, O
                    }(),
                    N = function() {
                        function O(A) {
                            var R = A.sink;
                            this.sink = R
                        }
                        return l(O, "SingleEventQueue"), O.prototype.start = function() {}, O.prototype.stop = function() {
                            return Promise.resolve()
                        }, O.prototype.enqueue = function(A) {
                            this.sink([A])
                        }, O
                    }();
                g.SingleEventQueue = N;
                var y = function() {
                    function O(A) {
                        var R = A.flushInterval,
                            I = A.maxQueueSize,
                            P = A.sink,
                            a = A.batchComparator;
                        this.buffer = [], this.maxQueueSize = Math.max(I, 1), this.sink = P, this.batchComparator = a, this.timer = new C({
                            callback: this.flush.bind(this),
                            timeout: R
                        }), this.started = !1
                    }
                    return l(O, "DefaultEventQueue"), O.prototype.start = function() {
                        this.started = !0
                    }, O.prototype.stop = function() {
                        this.started = !1;
                        var A = this.sink(this.buffer);
                        return this.buffer = [], this.timer.stop(), A
                    }, O.prototype.enqueue = function(A) {
                        if (!this.started) {
                            V.warn("Queue is stopped, not accepting event");
                            return
                        }
                        var R = this.buffer[0];
                        R && !this.batchComparator(R, A) && this.flush(), this.buffer.length === 0 && this.timer.refresh(), this.buffer.push(A), this.buffer.length >= this.maxQueueSize && this.flush()
                    }, O.prototype.flush = function() {
                        this.sink(this.buffer), this.buffer = [], this.timer.stop()
                    }, O
                }();
                g.DefaultEventQueue = y
            },
            51074: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.areEventContextsEqual = void 0;

                function L(v, V) {
                    var C = v.context,
                        N = V.context;
                    return C.accountId === N.accountId && C.projectId === N.projectId && C.clientName === N.clientName && C.clientVersion === N.clientVersion && C.revision === N.revision && C.anonymizeIP === N.anonymizeIP && C.botFiltering === N.botFiltering
                }
                l(L, "areEventContextsEqual"), g.areEventContextsEqual = L
            },
            65001: function(W, g, L) {
                "use strict";
                var v = this && this.__createBinding || (Object.create ? function(C, N, y, O) {
                        O === void 0 && (O = y), Object.defineProperty(C, O, {
                            enumerable: !0,
                            get: function() {
                                return N[y]
                            }
                        })
                    } : function(C, N, y, O) {
                        O === void 0 && (O = y), C[O] = N[y]
                    }),
                    V = this && this.__exportStar || function(C, N) {
                        for (var y in C) y !== "default" && !Object.prototype.hasOwnProperty.call(N, y) && v(N, C, y)
                    };
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), V(L(51074), g), V(L(24909), g), V(L(67473), g), V(L(21310), g), V(L(36896), g), V(L(97168), g), V(L(18994), g)
            },
            21310: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                })
            },
            36896: function(W, g, L) {
                "use strict";
                var v = this && this.__extends || function() {
                    var R = l(function(I, P) {
                        return R = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(a, E) {
                            a.__proto__ = E
                        } || function(a, E) {
                            for (var u in E) Object.prototype.hasOwnProperty.call(E, u) && (a[u] = E[u])
                        }, R(I, P)
                    }, "extendStatics");
                    return function(I, P) {
                        R(I, P);

                        function a() {
                            this.constructor = I
                        }
                        l(a, "__"), I.prototype = P === null ? Object.create(P) : (a.prototype = P.prototype, new a)
                    }
                }();
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.LocalStoragePendingEventsDispatcher = g.PendingEventsDispatcher = void 0;
                var V = L(98125),
                    C = L(36587),
                    N = L(27378),
                    y = V.getLogger("EventProcessor"),
                    O = function() {
                        function R(I) {
                            var P = I.eventDispatcher,
                                a = I.store;
                            this.dispatcher = P, this.store = a
                        }
                        return l(R, "PendingEventsDispatcher"), R.prototype.dispatchEvent = function(I, P) {
                            this.send({
                                uuid: N.generateUUID(),
                                timestamp: N.getTimestamp(),
                                request: I
                            }, P)
                        }, R.prototype.sendPendingEvents = function() {
                            var I = this,
                                P = this.store.values();
                            y.debug("Sending %s pending events from previous page", P.length), P.forEach(function(a) {
                                try {
                                    I.send(a, function() {})
                                } catch {}
                            })
                        }, R.prototype.send = function(I, P) {
                            var a = this;
                            this.store.set(I.uuid, I), this.dispatcher.dispatchEvent(I.request, function(E) {
                                a.store.remove(I.uuid), P(E)
                            })
                        }, R
                    }();
                g.PendingEventsDispatcher = O;
                var A = function(R) {
                    v(I, R);

                    function I(P) {
                        var a = P.eventDispatcher;
                        return R.call(this, {
                            eventDispatcher: a,
                            store: new C.LocalStorageStore({
                                maxValues: 100,
                                key: "fs_optly_pending_events"
                            })
                        }) || this
                    }
                    return l(I, "LocalStoragePendingEventsDispatcher"), I
                }(O);
                g.LocalStoragePendingEventsDispatcher = A
            },
            36587: (W, g, L) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.LocalStorageStore = void 0;
                var v = L(27378),
                    V = L(98125),
                    C = V.getLogger("EventProcessor"),
                    N = function() {
                        function y(O) {
                            var A = O.key,
                                R = O.maxValues,
                                I = R === void 0 ? 1e3 : R;
                            this.LS_KEY = A, this.maxValues = I
                        }
                        return l(y, "LocalStorageStore"), y.prototype.get = function(O) {
                            return this.getMap()[O] || null
                        }, y.prototype.set = function(O, A) {
                            var R = this.getMap();
                            R[O] = A, this.replace(R)
                        }, y.prototype.remove = function(O) {
                            var A = this.getMap();
                            delete A[O], this.replace(A)
                        }, y.prototype.values = function() {
                            return v.objectValues(this.getMap())
                        }, y.prototype.clear = function() {
                            this.replace({})
                        }, y.prototype.replace = function(O) {
                            try {
                                window.localStorage && localStorage.setItem(this.LS_KEY, JSON.stringify(O)), this.clean()
                            } catch (A) {
                                C.error(A)
                            }
                        }, y.prototype.clean = function() {
                            var O = this.getMap(),
                                A = Object.keys(O),
                                R = A.length - this.maxValues;
                            if (!(R < 1)) {
                                var I = A.map(function(a) {
                                    return {
                                        key: a,
                                        value: O[a]
                                    }
                                });
                                I.sort(function(a, E) {
                                    return a.value.timestamp - E.value.timestamp
                                });
                                for (var P = 0; P < R; P++) delete O[I[P].key];
                                this.replace(O)
                            }
                        }, y.prototype.getMap = function() {
                            try {
                                var O = window.localStorage && localStorage.getItem(this.LS_KEY);
                                if (O) return JSON.parse(O) || {}
                            } catch (A) {
                                C.error(A)
                            }
                            return {}
                        }, y
                    }();
                g.LocalStorageStore = N
            },
            90522: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var L = function() {
                    function v() {
                        this.reqsInFlightCount = 0, this.reqsCompleteResolvers = []
                    }
                    return l(v, "RequestTracker"), v.prototype.trackRequest = function(V) {
                        var C = this;
                        this.reqsInFlightCount++;
                        var N = l(function() {
                            C.reqsInFlightCount--, C.reqsInFlightCount === 0 && (C.reqsCompleteResolvers.forEach(function(y) {
                                return y()
                            }), C.reqsCompleteResolvers = [])
                        }, "onReqComplete");
                        V.then(N, N)
                    }, v.prototype.onRequestsComplete = function() {
                        var V = this;
                        return new Promise(function(C) {
                            V.reqsInFlightCount === 0 ? C() : V.reqsCompleteResolvers.push(C)
                        })
                    }, v
                }();
                g.default = L
            },
            97168: function(W, g) {
                "use strict";
                var L = this && this.__assign || function() {
                    return L = Object.assign || function(a) {
                        for (var E, u = 1, h = arguments.length; u < h; u++) {
                            E = arguments[u];
                            for (var _ in E) Object.prototype.hasOwnProperty.call(E, _) && (a[_] = E[_])
                        }
                        return a
                    }, L.apply(this, arguments)
                };
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.formatEvents = g.buildConversionEventV1 = g.buildImpressionEventV1 = g.makeBatchedEventV1 = void 0;
                var v = "campaign_activated",
                    V = "custom",
                    C = "$opt_bot_filtering";

                function N(a) {
                    var E = [],
                        u = a[0];
                    return a.forEach(function(h) {
                        if (h.type === "conversion" || h.type === "impression") {
                            var _ = A(h);
                            h.type === "impression" ? _.snapshots.push(O(h)) : h.type === "conversion" && _.snapshots.push(y(h)), E.push(_)
                        }
                    }), {
                        client_name: u.context.clientName,
                        client_version: u.context.clientVersion,
                        account_id: u.context.accountId,
                        project_id: u.context.projectId,
                        revision: u.context.revision,
                        anonymize_ip: u.context.anonymizeIP,
                        enrich_decisions: !0,
                        visitors: E
                    }
                }
                l(N, "makeBatchedEventV1"), g.makeBatchedEventV1 = N;

                function y(a) {
                    var E = L({}, a.tags);
                    delete E.revenue, delete E.value;
                    var u = {
                        entity_id: a.event.id,
                        key: a.event.key,
                        timestamp: a.timestamp,
                        uuid: a.uuid
                    };
                    return a.tags && (u.tags = a.tags), a.value != null && (u.value = a.value), a.revenue != null && (u.revenue = a.revenue), {
                        events: [u]
                    }
                }
                l(y, "makeConversionSnapshot");

                function O(a) {
                    var E, u, h = a.layer,
                        _ = a.experiment,
                        d = a.variation,
                        M = a.ruleKey,
                        U = a.flagKey,
                        m = a.ruleType,
                        D = a.enabled,
                        k = h ? h.id : null,
                        q = (E = _ == null ? void 0 : _.id) !== null && E !== void 0 ? E : "",
                        te = (u = d == null ? void 0 : d.id) !== null && u !== void 0 ? u : "",
                        fe = d ? d.key : "";
                    return {
                        decisions: [{
                            campaign_id: k,
                            experiment_id: q,
                            variation_id: te,
                            metadata: {
                                flag_key: U,
                                rule_key: M,
                                rule_type: m,
                                variation_key: fe,
                                enabled: D
                            }
                        }],
                        events: [{
                            entity_id: k,
                            timestamp: a.timestamp,
                            key: v,
                            uuid: a.uuid
                        }]
                    }
                }
                l(O, "makeDecisionSnapshot");

                function A(a) {
                    var E = {
                        snapshots: [],
                        visitor_id: a.user.id,
                        attributes: []
                    };
                    return a.user.attributes.forEach(function(u) {
                        E.attributes.push({
                            entity_id: u.entityId,
                            key: u.key,
                            type: "custom",
                            value: u.value
                        })
                    }), typeof a.context.botFiltering == "boolean" && E.attributes.push({
                        entity_id: C,
                        key: C,
                        type: V,
                        value: a.context.botFiltering
                    }), E
                }
                l(A, "makeVisitor");

                function R(a) {
                    var E = A(a);
                    return E.snapshots.push(O(a)), {
                        client_name: a.context.clientName,
                        client_version: a.context.clientVersion,
                        account_id: a.context.accountId,
                        project_id: a.context.projectId,
                        revision: a.context.revision,
                        anonymize_ip: a.context.anonymizeIP,
                        enrich_decisions: !0,
                        visitors: [E]
                    }
                }
                l(R, "buildImpressionEventV1"), g.buildImpressionEventV1 = R;

                function I(a) {
                    var E = A(a);
                    return E.snapshots.push(y(a)), {
                        client_name: a.context.clientName,
                        client_version: a.context.clientVersion,
                        account_id: a.context.accountId,
                        project_id: a.context.projectId,
                        revision: a.context.revision,
                        anonymize_ip: a.context.anonymizeIP,
                        enrich_decisions: !0,
                        visitors: [E]
                    }
                }
                l(I, "buildConversionEventV1"), g.buildConversionEventV1 = I;

                function P(a) {
                    return {
                        url: "https://logx.optimizely.com/v1/events",
                        httpVerb: "POST",
                        params: N(a)
                    }
                }
                l(P, "formatEvents"), g.formatEvents = P
            },
            18994: function(W, g, L) {
                "use strict";
                var v = this && this.__awaiter || function(a, E, u, h) {
                        function _(d) {
                            return d instanceof u ? d : new u(function(M) {
                                M(d)
                            })
                        }
                        return l(_, "adopt"), new(u || (u = Promise))(function(d, M) {
                            function U(k) {
                                try {
                                    D(h.next(k))
                                } catch (q) {
                                    M(q)
                                }
                            }
                            l(U, "fulfilled");

                            function m(k) {
                                try {
                                    D(h.throw(k))
                                } catch (q) {
                                    M(q)
                                }
                            }
                            l(m, "rejected");

                            function D(k) {
                                k.done ? d(k.value) : _(k.value).then(U, m)
                            }
                            l(D, "step"), D((h = h.apply(a, E || [])).next())
                        })
                    },
                    V = this && this.__generator || function(a, E) {
                        var u = {
                                label: 0,
                                sent: function() {
                                    if (d[0] & 1) throw d[1];
                                    return d[1]
                                },
                                trys: [],
                                ops: []
                            },
                            h, _, d, M;
                        return M = {
                            next: U(0),
                            throw: U(1),
                            return: U(2)
                        }, typeof Symbol == "function" && (M[Symbol.iterator] = function() {
                            return this
                        }), M;

                        function U(D) {
                            return function(k) {
                                return m([D, k])
                            }
                        }

                        function m(D) {
                            if (h) throw new TypeError("Generator is already executing.");
                            for (; u;) try {
                                if (h = 1, _ && (d = D[0] & 2 ? _.return : D[0] ? _.throw || ((d = _.return) && d.call(_), 0) : _.next) && !(d = d.call(_, D[1])).done) return d;
                                switch (_ = 0, d && (D = [D[0] & 2, d.value]), D[0]) {
                                    case 0:
                                    case 1:
                                        d = D;
                                        break;
                                    case 4:
                                        return u.label++, {
                                            value: D[1],
                                            done: !1
                                        };
                                    case 5:
                                        u.label++, _ = D[1], D = [0];
                                        continue;
                                    case 7:
                                        D = u.ops.pop(), u.trys.pop();
                                        continue;
                                    default:
                                        if (d = u.trys, !(d = d.length > 0 && d[d.length - 1]) && (D[0] === 6 || D[0] === 2)) {
                                            u = 0;
                                            continue
                                        }
                                        if (D[0] === 3 && (!d || D[1] > d[0] && D[1] < d[3])) {
                                            u.label = D[1];
                                            break
                                        }
                                        if (D[0] === 6 && u.label < d[1]) {
                                            u.label = d[1], d = D;
                                            break
                                        }
                                        if (d && u.label < d[2]) {
                                            u.label = d[2], u.ops.push(D);
                                            break
                                        }
                                        d[2] && u.ops.pop(), u.trys.pop();
                                        continue
                                }
                                D = E.call(a, u)
                            } catch (k) {
                                D = [6, k], _ = 0
                            } finally {
                                h = d = 0
                            }
                            if (D[0] & 5) throw D[1];
                            return {
                                value: D[0] ? D[1] : void 0,
                                done: !0
                            }
                        }
                    },
                    C = this && this.__importDefault || function(a) {
                        return a && a.__esModule ? a : {
                            default: a
                        }
                    };
                Object.defineProperty(g, "__esModule", {
                    value: !0
                }), g.LogTierV1EventProcessor = void 0;
                var N = L(98125),
                    y = L(24909),
                    O = C(L(90522)),
                    A = L(51074),
                    R = L(97168),
                    I = N.getLogger("LogTierV1EventProcessor"),
                    P = function() {
                        function a(E) {
                            var u = E.dispatcher,
                                h = E.flushInterval,
                                _ = h === void 0 ? y.DEFAULT_FLUSH_INTERVAL : h,
                                d = E.batchSize,
                                M = d === void 0 ? y.DEFAULT_BATCH_SIZE : d,
                                U = E.notificationCenter;
                            this.dispatcher = u, this.notificationCenter = U, this.requestTracker = new O.default, _ = y.validateAndGetFlushInterval(_), M = y.validateAndGetBatchSize(M), this.queue = y.getQueue(M, _, this.drainQueue.bind(this), A.areEventContextsEqual)
                        }
                        return l(a, "LogTierV1EventProcessor"), a.prototype.drainQueue = function(E) {
                            var u = this,
                                h = new Promise(function(_) {
                                    if (I.debug("draining queue with %s events", E.length), E.length === 0) {
                                        _();
                                        return
                                    }
                                    var d = R.formatEvents(E);
                                    u.dispatcher.dispatchEvent(d, function() {
                                        _()
                                    }), y.sendEventNotification(u.notificationCenter, d)
                                });
                            return this.requestTracker.trackRequest(h), h
                        }, a.prototype.process = function(E) {
                            this.queue.enqueue(E)
                        }, a.prototype.stop = function() {
                            try {
                                return this.queue.stop(), this.requestTracker.onRequestsComplete()
                            } catch (E) {
                                I.error('Error stopping EventProcessor: "%s"', E.message, E)
                            }
                            return Promise.resolve()
                        }, a.prototype.start = function() {
                            return v(this, void 0, void 0, function() {
                                return V(this, function(E) {
                                    return this.queue.start(), [2]
                                })
                            })
                        }, a
                    }();
                g.LogTierV1EventProcessor = P
            },
            27987: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var L = function() {
                    function y() {}
                    return l(y, "NoopErrorHandler"), y.prototype.handleError = function(O) {}, y
                }();
                g.NoopErrorHandler = L;
                var v = new L;

                function V(y) {
                    v = y
                }
                l(V, "setErrorHandler"), g.setErrorHandler = V;

                function C() {
                    return v
                }
                l(C, "getErrorHandler"), g.getErrorHandler = C;

                function N() {
                    v = new L
                }
                l(N, "resetErrorHandler"), g.resetErrorHandler = N
            },
            98125: (W, g, L) => {
                "use strict";

                function v(V) {
                    for (var C in V) g.hasOwnProperty(C) || (g[C] = V[C])
                }
                l(v, "__export"), Object.defineProperty(g, "__esModule", {
                    value: !0
                }), v(L(27987)), v(L(99623)), v(L(46773))
            },
            46773: function(W, g, L) {
                "use strict";
                var v = this && this.__spreadArrays || function() {
                    for (var U = 0, m = 0, D = arguments.length; m < D; m++) U += arguments[m].length;
                    for (var k = Array(U), q = 0, m = 0; m < D; m++)
                        for (var te = arguments[m], fe = 0, ve = te.length; fe < ve; fe++, q++) k[q] = te[fe];
                    return k
                };
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var V = L(27987),
                    C = L(27378),
                    N = L(99623),
                    y = {
                        NOTSET: 0,
                        DEBUG: 1,
                        INFO: 2,
                        WARNING: 3,
                        ERROR: 4
                    };

                function O(U) {
                    return typeof U != "string" || (U = U.toUpperCase(), U === "WARN" && (U = "WARNING"), !y[U]) ? U : y[U]
                }
                l(O, "coerceLogLevel");
                var A = function() {
                        function U() {
                            this.defaultLoggerFacade = new a, this.loggers = {}
                        }
                        return l(U, "DefaultLogManager"), U.prototype.getLogger = function(m) {
                            return m ? (this.loggers[m] || (this.loggers[m] = new a({
                                messagePrefix: m
                            })), this.loggers[m]) : this.defaultLoggerFacade
                        }, U
                    }(),
                    R = function() {
                        function U(m) {
                            m === void 0 && (m = {}), this.logLevel = N.LogLevel.NOTSET, m.logLevel !== void 0 && C.isValidEnum(N.LogLevel, m.logLevel) && this.setLogLevel(m.logLevel), this.logToConsole = m.logToConsole !== void 0 ? !!m.logToConsole : !0, this.prefix = m.prefix !== void 0 ? m.prefix : "[OPTIMIZELY]"
                        }
                        return l(U, "ConsoleLogHandler"), U.prototype.log = function(m, D) {
                            if (!(!this.shouldLog(m) || !this.logToConsole)) {
                                var k = this.prefix + " - " + this.getLogLevelName(m) + " " + this.getTime() + " " + D;
                                this.consoleLog(m, [k])
                            }
                        }, U.prototype.setLogLevel = function(m) {
                            m = O(m), !C.isValidEnum(N.LogLevel, m) || m === void 0 ? this.logLevel = N.LogLevel.ERROR : this.logLevel = m
                        }, U.prototype.getTime = function() {
                            return new Date().toISOString()
                        }, U.prototype.shouldLog = function(m) {
                            return m >= this.logLevel
                        }, U.prototype.getLogLevelName = function(m) {
                            switch (m) {
                                case N.LogLevel.DEBUG:
                                    return "DEBUG";
                                case N.LogLevel.INFO:
                                    return "INFO ";
                                case N.LogLevel.WARNING:
                                    return "WARN ";
                                case N.LogLevel.ERROR:
                                    return "ERROR";
                                default:
                                    return "NOTSET"
                            }
                        }, U.prototype.consoleLog = function(m, D) {
                            switch (m) {
                                case N.LogLevel.DEBUG:
                                    console.log.apply(console, D);
                                    break;
                                case N.LogLevel.INFO:
                                    console.info.apply(console, D);
                                    break;
                                case N.LogLevel.WARNING:
                                    console.warn.apply(console, D);
                                    break;
                                case N.LogLevel.ERROR:
                                    console.error.apply(console, D);
                                    break;
                                default:
                                    console.log.apply(console, D)
                            }
                        }, U
                    }();
                g.ConsoleLogHandler = R;
                var I = N.LogLevel.NOTSET,
                    P = null,
                    a = function() {
                        function U(m) {
                            m === void 0 && (m = {}), this.messagePrefix = "", m.messagePrefix && (this.messagePrefix = m.messagePrefix)
                        }
                        return l(U, "OptimizelyLogger"), U.prototype.log = function(m, D) {
                            for (var k = [], q = 2; q < arguments.length; q++) k[q - 2] = arguments[q];
                            this.internalLog(O(m), {
                                message: D,
                                splat: k
                            })
                        }, U.prototype.info = function(m) {
                            for (var D = [], k = 1; k < arguments.length; k++) D[k - 1] = arguments[k];
                            this.namedLog(N.LogLevel.INFO, m, D)
                        }, U.prototype.debug = function(m) {
                            for (var D = [], k = 1; k < arguments.length; k++) D[k - 1] = arguments[k];
                            this.namedLog(N.LogLevel.DEBUG, m, D)
                        }, U.prototype.warn = function(m) {
                            for (var D = [], k = 1; k < arguments.length; k++) D[k - 1] = arguments[k];
                            this.namedLog(N.LogLevel.WARNING, m, D)
                        }, U.prototype.error = function(m) {
                            for (var D = [], k = 1; k < arguments.length; k++) D[k - 1] = arguments[k];
                            this.namedLog(N.LogLevel.ERROR, m, D)
                        }, U.prototype.format = function(m) {
                            return (this.messagePrefix ? this.messagePrefix + ": " : "") + C.sprintf.apply(void 0, v([m.message], m.splat))
                        }, U.prototype.internalLog = function(m, D) {
                            !P || m < I || (P.log(m, this.format(D)), D.error && D.error instanceof Error && V.getErrorHandler().handleError(D.error))
                        }, U.prototype.namedLog = function(m, D, k) {
                            var q;
                            if (D instanceof Error) {
                                q = D, D = q.message, this.internalLog(m, {
                                    error: q,
                                    message: D,
                                    splat: k
                                });
                                return
                            }
                            if (k.length === 0) {
                                this.internalLog(m, {
                                    message: D,
                                    splat: k
                                });
                                return
                            }
                            var te = k[k.length - 1];
                            te instanceof Error && (q = te, k.splice(-1)), this.internalLog(m, {
                                message: D,
                                error: q,
                                splat: k
                            })
                        }, U
                    }(),
                    E = new A;

                function u(U) {
                    return E.getLogger(U)
                }
                l(u, "getLogger"), g.getLogger = u;

                function h(U) {
                    P = U
                }
                l(h, "setLogHandler"), g.setLogHandler = h;

                function _(U) {
                    U = O(U), !C.isValidEnum(N.LogLevel, U) || U === void 0 ? I = N.LogLevel.ERROR : I = U
                }
                l(_, "setLogLevel"), g.setLogLevel = _;

                function d() {
                    return I
                }
                l(d, "getLogLevel"), g.getLogLevel = d;

                function M() {
                    E = new A, I = N.LogLevel.NOTSET
                }
                l(M, "resetLogger"), g.resetLogger = M
            },
            99623: (W, g) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var L;
                (function(v) {
                    v[v.NOTSET = 0] = "NOTSET", v[v.DEBUG = 1] = "DEBUG", v[v.INFO = 2] = "INFO", v[v.WARNING = 3] = "WARNING", v[v.ERROR = 4] = "ERROR"
                })(L = g.LogLevel || (g.LogLevel = {}))
            },
            27378: (W, g, L) => {
                "use strict";
                Object.defineProperty(g, "__esModule", {
                    value: !0
                });
                var v = L(55830);

                function V() {
                    return v.v4()
                }
                l(V, "generateUUID"), g.generateUUID = V;

                function C() {
                    return new Date().getTime()
                }
                l(C, "getTimestamp"), g.getTimestamp = C;

                function N(E, u) {
                    for (var h = !1, _ = Object.keys(E), d = 0; d < _.length; d++)
                        if (u === E[_[d]]) {
                            h = !0;
                            break
                        }
                    return h
                }
                l(N, "isValidEnum"), g.isValidEnum = N;

                function y(E, u) {
                    var h = {};
                    return E.forEach(function(_) {
                        var d = u(_);
                        h[d] = h[d] || [], h[d].push(_)
                    }), O(h)
                }
                l(y, "groupBy"), g.groupBy = y;

                function O(E) {
                    return Object.keys(E).map(function(u) {
                        return E[u]
                    })
                }
                l(O, "objectValues"), g.objectValues = O;

                function A(E) {
                    return Object.keys(E).map(function(u) {
                        return [u, E[u]]
                    })
                }
                l(A, "objectEntries"), g.objectEntries = A;

                function R(E, u) {
                    for (var h, _ = 0, d = E; _ < d.length; _++) {
                        var M = d[_];
                        if (u(M)) {
                            h = M;
                            break
                        }
                    }
                    return h
                }
                l(R, "find"), g.find = R;

                function I(E, u) {
                    var h = {};
                    return E.forEach(function(_) {
                        var d = u(_);
                        h[d] = _
                    }), h
                }
                l(I, "keyBy"), g.keyBy = I;

                function P(E) {
                    for (var u = [], h = 1; h < arguments.length; h++) u[h - 1] = arguments[h];
                    var _ = 0;
                    return E.replace(/%s/g, function() {
                        var d = u[_++],
                            M = typeof d;
                        return M === "function" ? d() : M === "string" ? d : String(d)
                    })
                }
                l(P, "sprintf"), g.sprintf = P;
                var a;
                (function(E) {
                    E.ACTIVATE = "ACTIVATE:experiment, user_id,attributes, variation, event", E.DECISION = "DECISION:type, userId, attributes, decisionInfo", E.LOG_EVENT = "LOG_EVENT:logEvent", E.OPTIMIZELY_CONFIG_UPDATE = "OPTIMIZELY_CONFIG_UPDATE", E.TRACK = "TRACK:event_key, user_id, attributes, event_tags, event"
                })(a = g.NOTIFICATION_TYPES || (g.NOTIFICATION_TYPES = {}))
            },
            48266: (W, g, L) => {
                "use strict";
                L.d(g, {
                    ZP: () => Ct
                });
                var v = L(98125),
                    V = L.n(v),
                    C = L(65001),
                    N = L.n(C),
                    y = L(27378),
                    O = L(58053),
                    A = L.n(O),
                    R = L(62002);
                /*! *****************************************************************************
                Copyright (c) Microsoft Corporation.

                Permission to use, copy, modify, and/or distribute this software for any
                purpose with or without fee is hereby granted.

                THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
                REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
                AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
                INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
                LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
                OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
                PERFORMANCE OF THIS SOFTWARE.
                ***************************************************************************** */
                var I = l(function() {
                    return (I = Object.assign || function(r) {
                        for (var e, t = 1, n = arguments.length; t < n; t++)
                            for (var i in e = arguments[t]) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
                        return r
                    }).apply(this, arguments)
                }, "N");

                function P() {
                    for (var r = 0, e = 0, t = arguments.length; e < t; e++) r += arguments[e].length;
                    var n = Array(r),
                        i = 0;
                    for (e = 0; e < t; e++)
                        for (var o = arguments[e], s = 0, f = o.length; s < f; s++, i++) n[i] = o[s];
                    return n
                }
                l(P, "R");
                var a = {
                        NOTSET: 0,
                        DEBUG: 1,
                        INFO: 2,
                        WARNING: 3,
                        ERROR: 4
                    },
                    E = {
                        CONDITION_EVALUATOR_ERROR: "%s: Error evaluating audience condition of type %s: %s",
                        DATAFILE_AND_SDK_KEY_MISSING: "%s: You must provide at least one of sdkKey or datafile. Cannot start Optimizely",
                        EXPERIMENT_KEY_NOT_IN_DATAFILE: "%s: Experiment key %s is not in datafile.",
                        FEATURE_NOT_IN_DATAFILE: "%s: Feature key %s is not in datafile.",
                        IMPROPERLY_FORMATTED_EXPERIMENT: "%s: Experiment key %s is improperly formatted.",
                        INVALID_ATTRIBUTES: "%s: Provided attributes are in an invalid format.",
                        INVALID_BUCKETING_ID: "%s: Unable to generate hash for bucketing ID %s: %s",
                        INVALID_DATAFILE: "%s: Datafile is invalid - property %s: %s",
                        INVALID_DATAFILE_MALFORMED: "%s: Datafile is invalid because it is malformed.",
                        INVALID_CONFIG: "%s: Provided Optimizely config is in an invalid format.",
                        INVALID_JSON: "%s: JSON object is not valid.",
                        INVALID_ERROR_HANDLER: '%s: Provided "errorHandler" is in an invalid format.',
                        INVALID_EVENT_DISPATCHER: '%s: Provided "eventDispatcher" is in an invalid format.',
                        INVALID_EVENT_TAGS: "%s: Provided event tags are in an invalid format.",
                        INVALID_EXPERIMENT_KEY: "%s: Experiment key %s is not in datafile. It is either invalid, paused, or archived.",
                        INVALID_EXPERIMENT_ID: "%s: Experiment ID %s is not in datafile.",
                        INVALID_GROUP_ID: "%s: Group ID %s is not in datafile.",
                        INVALID_LOGGER: '%s: Provided "logger" is in an invalid format.',
                        INVALID_ROLLOUT_ID: "%s: Invalid rollout ID %s attached to feature %s",
                        INVALID_USER_ID: "%s: Provided user ID is in an invalid format.",
                        INVALID_USER_PROFILE_SERVICE: "%s: Provided user profile service instance is in an invalid format: %s.",
                        NO_DATAFILE_SPECIFIED: "%s: No datafile specified. Cannot start optimizely.",
                        NO_JSON_PROVIDED: "%s: No JSON object to validate against schema.",
                        NO_VARIATION_FOR_EXPERIMENT_KEY: "%s: No variation key %s defined in datafile for experiment %s.",
                        UNDEFINED_ATTRIBUTE: "%s: Provided attribute: %s has an undefined value.",
                        UNRECOGNIZED_ATTRIBUTE: "%s: Unrecognized attribute %s provided. Pruning before sending event to Optimizely.",
                        UNABLE_TO_CAST_VALUE: "%s: Unable to cast value %s to type %s, returning null.",
                        USER_NOT_IN_FORCED_VARIATION: "%s: User %s is not in the forced variation map. Cannot remove their forced variation.",
                        USER_PROFILE_LOOKUP_ERROR: '%s: Error while looking up user profile for user ID "%s": %s.',
                        USER_PROFILE_SAVE_ERROR: '%s: Error while saving user profile for user ID "%s": %s.',
                        VARIABLE_KEY_NOT_IN_DATAFILE: '%s: Variable with key "%s" associated with feature with key "%s" is not in datafile.',
                        VARIATION_ID_NOT_IN_DATAFILE: "%s: No variation ID %s defined in datafile for experiment %s.",
                        VARIATION_ID_NOT_IN_DATAFILE_NO_EXPERIMENT: "%s: Variation ID %s is not in the datafile.",
                        INVALID_INPUT_FORMAT: "%s: Provided %s is in an invalid format.",
                        INVALID_DATAFILE_VERSION: "%s: This version of the JavaScript SDK does not support the given datafile version: %s",
                        INVALID_VARIATION_KEY: "%s: Provided variation key is in an invalid format."
                    },
                    u = {
                        ACTIVATE_USER: "%s: Activating user %s in experiment %s.",
                        DISPATCH_CONVERSION_EVENT: "%s: Dispatching conversion event to URL %s with params %s.",
                        DISPATCH_IMPRESSION_EVENT: "%s: Dispatching impression event to URL %s with params %s.",
                        DEPRECATED_EVENT_VALUE: "%s: Event value is deprecated in %s call.",
                        EVENT_KEY_NOT_FOUND: "%s: Event key %s is not in datafile.",
                        EXPERIMENT_NOT_RUNNING: "%s: Experiment %s is not running.",
                        FEATURE_ENABLED_FOR_USER: "%s: Feature %s is enabled for user %s.",
                        FEATURE_NOT_ENABLED_FOR_USER: "%s: Feature %s is not enabled for user %s.",
                        FEATURE_HAS_NO_EXPERIMENTS: "%s: Feature %s is not attached to any experiments.",
                        FAILED_TO_PARSE_VALUE: '%s: Failed to parse event value "%s" from event tags.',
                        FAILED_TO_PARSE_REVENUE: '%s: Failed to parse revenue value "%s" from event tags.',
                        FORCED_BUCKETING_FAILED: "%s: Variation key %s is not in datafile. Not activating user %s.",
                        INVALID_OBJECT: "%s: Optimizely object is not valid. Failing %s.",
                        INVALID_CLIENT_ENGINE: "%s: Invalid client engine passed: %s. Defaulting to node-sdk.",
                        INVALID_DEFAULT_DECIDE_OPTIONS: "%s: Provided default decide options is not an array.",
                        INVALID_DECIDE_OPTIONS: "%s: Provided decide options is not an array. Using default decide options.",
                        INVALID_VARIATION_ID: "%s: Bucketed into an invalid variation ID. Returning null.",
                        NOTIFICATION_LISTENER_EXCEPTION: "%s: Notification listener for (%s) threw exception: %s",
                        NO_ROLLOUT_EXISTS: "%s: There is no rollout of feature %s.",
                        NOT_ACTIVATING_USER: "%s: Not activating user %s for experiment %s.",
                        NOT_TRACKING_USER: "%s: Not tracking user %s.",
                        PARSED_REVENUE_VALUE: '%s: Parsed revenue value "%s" from event tags.',
                        PARSED_NUMERIC_VALUE: '%s: Parsed event value "%s" from event tags.',
                        RETURNING_STORED_VARIATION: '%s: Returning previously activated variation "%s" of experiment "%s" for user "%s" from user profile.',
                        ROLLOUT_HAS_NO_EXPERIMENTS: "%s: Rollout of feature %s has no experiments",
                        SAVED_VARIATION: '%s: Saved variation "%s" of experiment "%s" for user "%s".',
                        SAVED_VARIATION_NOT_FOUND: "%s: User %s was previously bucketed into variation with ID %s for experiment %s, but no matching variation was found.",
                        SHOULD_NOT_DISPATCH_ACTIVATE: '%s: Experiment %s is not in "Running" state. Not activating user.',
                        SKIPPING_JSON_VALIDATION: "%s: Skipping JSON schema validation.",
                        TRACK_EVENT: "%s: Tracking event %s for user %s.",
                        UNRECOGNIZED_DECIDE_OPTION: "%s: Unrecognized decide option %s provided.",
                        USER_ASSIGNED_TO_EXPERIMENT_BUCKET: "%s: Assigned bucket %s to user with bucketing ID %s.",
                        USER_BUCKETED_INTO_EXPERIMENT_IN_GROUP: "%s: User %s is in experiment %s of group %s.",
                        USER_BUCKETED_INTO_TARGETING_RULE: "%s: User %s bucketed into targeting rule %s.",
                        USER_IN_FEATURE_EXPERIMENT: "%s: User %s is in variation %s of experiment %s on the feature %s.",
                        USER_IN_ROLLOUT: "%s: User %s is in rollout of feature %s.",
                        USER_NOT_BUCKETED_INTO_EVERYONE_TARGETING_RULE: "%s: User %s not bucketed into everyone targeting rule due to traffic allocation.",
                        USER_NOT_BUCKETED_INTO_EXPERIMENT_IN_GROUP: "%s: User %s is not in experiment %s of group %s.",
                        USER_NOT_BUCKETED_INTO_ANY_EXPERIMENT_IN_GROUP: "%s: User %s is not in any experiment of group %s.",
                        USER_NOT_BUCKETED_INTO_TARGETING_RULE: "%s User %s not bucketed into targeting rule %s due to traffic allocation. Trying everyone rule.",
                        USER_NOT_IN_FEATURE_EXPERIMENT: "%s: User %s is not in any experiment on the feature %s.",
                        USER_NOT_IN_ROLLOUT: "%s: User %s is not in rollout of feature %s.",
                        USER_FORCED_IN_VARIATION: "%s: User %s is forced in variation %s.",
                        USER_MAPPED_TO_FORCED_VARIATION: "%s: Set variation %s for experiment %s and user %s in the forced variation map.",
                        USER_DOESNT_MEET_CONDITIONS_FOR_TARGETING_RULE: "%s: User %s does not meet conditions for targeting rule %s.",
                        USER_MEETS_CONDITIONS_FOR_TARGETING_RULE: "%s: User %s meets conditions for targeting rule %s.",
                        USER_HAS_VARIATION: "%s: User %s is in variation %s of experiment %s.",
                        USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED: "Variation (%s) is mapped to flag (%s), rule (%s) and user (%s) in the forced decision map.",
                        USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED: "Variation (%s) is mapped to flag (%s) and user (%s) in the forced decision map.",
                        USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED_BUT_INVALID: "Invalid variation is mapped to flag (%s), rule (%s) and user (%s) in the forced decision map.",
                        USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED_BUT_INVALID: "Invalid variation is mapped to flag (%s) and user (%s) in the forced decision map.",
                        USER_HAS_FORCED_VARIATION: "%s: Variation %s is mapped to experiment %s and user %s in the forced variation map.",
                        USER_HAS_NO_VARIATION: "%s: User %s is in no variation of experiment %s.",
                        USER_HAS_NO_FORCED_VARIATION: "%s: User %s is not in the forced variation map.",
                        USER_HAS_NO_FORCED_VARIATION_FOR_EXPERIMENT: "%s: No experiment %s mapped to user %s in the forced variation map.",
                        USER_NOT_IN_ANY_EXPERIMENT: "%s: User %s is not in any experiment of group %s.",
                        USER_NOT_IN_EXPERIMENT: "%s: User %s does not meet conditions to be in experiment %s.",
                        USER_RECEIVED_DEFAULT_VARIABLE_VALUE: '%s: User "%s" is not in any variation or rollout rule. Returning default value for variable "%s" of feature flag "%s".',
                        FEATURE_NOT_ENABLED_RETURN_DEFAULT_VARIABLE_VALUE: '%s: Feature "%s" is not enabled for user %s. Returning the default variable value "%s".',
                        VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE: '%s: Variable "%s" is not used in variation "%s". Returning default value.',
                        USER_RECEIVED_VARIABLE_VALUE: '%s: Got variable value "%s" for variable "%s" of feature flag "%s"',
                        VALID_DATAFILE: "%s: Datafile is valid.",
                        VALID_USER_PROFILE_SERVICE: "%s: Valid user profile service provided.",
                        VARIATION_REMOVED_FOR_USER: "%s: Variation mapped to experiment %s has been removed for user %s.",
                        VARIABLE_REQUESTED_WITH_WRONG_TYPE: '%s: Requested variable type "%s", but variable is of type "%s". Use correct API to retrieve value. Returning None.',
                        VALID_BUCKETING_ID: '%s: BucketingId is valid: "%s"',
                        BUCKETING_ID_NOT_STRING: "%s: BucketingID attribute is not a string. Defaulted to userId",
                        EVALUATING_AUDIENCE: '%s: Starting to evaluate audience "%s" with conditions: %s.',
                        EVALUATING_AUDIENCES_COMBINED: '%s: Evaluating audiences for %s "%s": %s.',
                        AUDIENCE_EVALUATION_RESULT: '%s: Audience "%s" evaluated to %s.',
                        AUDIENCE_EVALUATION_RESULT_COMBINED: "%s: Audiences for %s %s collectively evaluated to %s.",
                        MISSING_ATTRIBUTE_VALUE: '%s: Audience condition %s evaluated to UNKNOWN because no value was passed for user attribute "%s".',
                        UNEXPECTED_CONDITION_VALUE: "%s: Audience condition %s evaluated to UNKNOWN because the condition value is not supported.",
                        UNEXPECTED_TYPE: '%s: Audience condition %s evaluated to UNKNOWN because a value of type "%s" was passed for user attribute "%s".',
                        UNEXPECTED_TYPE_NULL: '%s: Audience condition %s evaluated to UNKNOWN because a null value was passed for user attribute "%s".',
                        UNKNOWN_CONDITION_TYPE: "%s: Audience condition %s has an unknown condition type. You may need to upgrade to a newer release of the Optimizely SDK.",
                        UNKNOWN_MATCH_TYPE: "%s: Audience condition %s uses an unknown match type. You may need to upgrade to a newer release of the Optimizely SDK.",
                        UPDATED_OPTIMIZELY_CONFIG: "%s: Updated Optimizely config to revision %s (project id %s)",
                        OUT_OF_BOUNDS: '%s: Audience condition %s evaluated to UNKNOWN because the number value for user attribute "%s" is not in the range [-2^53, +2^53].',
                        UNABLE_TO_ATTACH_UNLOAD: '%s: unable to bind optimizely.close() to page unload event: "%s"'
                    },
                    h = {
                        BOT_FILTERING: "$opt_bot_filtering",
                        BUCKETING_ID: "$opt_bucketing_id",
                        STICKY_BUCKETING_KEY: "$opt_experiment_bucket_map",
                        USER_AGENT: "$opt_user_agent",
                        FORCED_DECISION_NULL_RULE_KEY: "$opt_null_rule_key"
                    },
                    _ = y.NOTIFICATION_TYPES,
                    d = {
                        AB_TEST: "ab-test",
                        FEATURE: "feature",
                        FEATURE_TEST: "feature-test",
                        FEATURE_VARIABLE: "feature-variable",
                        ALL_FEATURE_VARIABLES: "all-feature-variables",
                        FLAG: "flag"
                    },
                    M = {
                        FEATURE_TEST: "feature-test",
                        ROLLOUT: "rollout",
                        EXPERIMENT: "experiment"
                    },
                    U = {
                        RULE: "rule",
                        EXPERIMENT: "experiment"
                    },
                    m = {
                        BOOLEAN: "boolean",
                        DOUBLE: "double",
                        INTEGER: "integer",
                        STRING: "string",
                        JSON: "json"
                    },
                    D = {
                        V2: "2",
                        V3: "3",
                        V4: "4"
                    },
                    k = {
                        SDK_NOT_READY: "Optimizely SDK not configured properly yet.",
                        FLAG_KEY_INVALID: 'No flag was found for key "%s".',
                        VARIABLE_VALUE_INVALID: 'Variable value for key "%s" is invalid or wrong type.'
                    },
                    q = Object.freeze({
                        __proto__: null,
                        LOG_LEVEL: a,
                        ERROR_MESSAGES: E,
                        LOG_MESSAGES: u,
                        CONTROL_ATTRIBUTES: h,
                        JAVASCRIPT_CLIENT_ENGINE: "javascript-sdk",
                        NODE_CLIENT_ENGINE: "node-sdk",
                        REACT_CLIENT_ENGINE: "react-sdk",
                        REACT_NATIVE_CLIENT_ENGINE: "react-native-sdk",
                        REACT_NATIVE_JS_CLIENT_ENGINE: "react-native-js-sdk",
                        NODE_CLIENT_VERSION: "4.9.1",
                        NOTIFICATION_TYPES: _,
                        DECISION_NOTIFICATION_TYPES: d,
                        DECISION_SOURCES: M,
                        AUDIENCE_EVALUATION_TYPES: U,
                        FEATURE_VARIABLE_TYPES: m,
                        DATAFILE_VERSIONS: D,
                        DECISION_MESSAGES: k
                    }),
                    te = "CONFIG_VALIDATOR",
                    fe = [D.V2, D.V3, D.V4],
                    ve = l(function(r) {
                        if (typeof r == "object" && r !== null) {
                            var e = r,
                                t = e.errorHandler,
                                n = e.eventDispatcher,
                                i = e.logger;
                            if (t && typeof t.handleError != "function") throw new Error((0, y.sprintf)(E.INVALID_ERROR_HANDLER, te));
                            if (n && typeof n.dispatchEvent != "function") throw new Error((0, y.sprintf)(E.INVALID_EVENT_DISPATCHER, te));
                            if (i && typeof i.log != "function") throw new Error((0, y.sprintf)(E.INVALID_LOGGER, te));
                            return !0
                        }
                        throw new Error((0, y.sprintf)(E.INVALID_CONFIG, te))
                    }, "M"),
                    ye = l(function(r) {
                        if (!r) throw new Error((0, y.sprintf)(E.NO_DATAFILE_SPECIFIED, te));
                        if (typeof r == "string") try {
                            r = JSON.parse(r)
                        } catch {
                            throw new Error((0, y.sprintf)(E.INVALID_DATAFILE_MALFORMED, te))
                        }
                        if (typeof r == "object" && !Array.isArray(r) && r !== null && fe.indexOf(r.version) === -1) throw new Error((0, y.sprintf)(E.INVALID_DATAFILE_VERSION, te, r.version));
                        return r
                    }, "P"),
                    Le = {
                        handleError: function() {}
                    },
                    Oe = l(function(r) {
                        return Object.keys(r).map(function(e) {
                            return encodeURIComponent(e) + "=" + encodeURIComponent(r[e])
                        }).join("&")
                    }, "k"),
                    b = {
                        dispatchEvent: function(r, e) {
                            var t, n = r.params,
                                i = r.url;
                            r.httpVerb === "POST" ? ((t = new XMLHttpRequest).open("POST", i, !0), t.setRequestHeader("Content-Type", "application/json"), t.onreadystatechange = function() {
                                if (t.readyState === 4 && e && typeof e == "function") try {
                                    e({
                                        statusCode: t.status
                                    })
                                } catch {}
                            }, t.send(JSON.stringify(n))) : (i += "?wxhr=true", n && (i += "&" + Oe(n)), (t = new XMLHttpRequest).open("GET", i, !0), t.onreadystatechange = function() {
                                if (t.readyState === 4 && e && typeof e == "function") try {
                                    e({
                                        statusCode: t.status
                                    })
                                } catch {}
                            }, t.send())
                        }
                    },
                    j = function() {
                        function r() {}
                        return l(r, "e"), r.prototype.log = function() {}, r
                    }();

                function x(r) {
                    return new v.ConsoleLogHandler(r)
                }
                l(x, "x");
                var G, w, X = Object.freeze({
                    __proto__: null,
                    NoOpLogger: j,
                    createLogger: x,
                    createNoOpLogger: function() {
                        return new j
                    }
                });

                function H(r, e, t) {
                    return {
                        variationKey: null,
                        enabled: !1,
                        variables: {},
                        ruleKey: null,
                        flagKey: r,
                        userContext: e,
                        reasons: t
                    }
                }
                l(H, "Y"),
                    function(r) {
                        r.BOOLEAN = "boolean", r.DOUBLE = "double", r.INTEGER = "integer", r.STRING = "string", r.JSON = "json"
                    }(G || (G = {})),
                    function(r) {
                        r.DISABLE_DECISION_EVENT = "DISABLE_DECISION_EVENT", r.ENABLED_FLAGS_ONLY = "ENABLED_FLAGS_ONLY", r.IGNORE_USER_PROFILE_SERVICE = "IGNORE_USER_PROFILE_SERVICE", r.INCLUDE_REASONS = "INCLUDE_REASONS", r.EXCLUDE_VARIABLES = "EXCLUDE_VARIABLES"
                    }(w || (w = {}));
                var Q = function() {
                        function r(e) {
                            var t, n = e.optimizely,
                                i = e.userId,
                                o = e.attributes;
                            this.optimizely = n, this.userId = i, this.attributes = (t = I({}, o)) !== null && t !== void 0 ? t : {}, this.forcedDecisionsMap = {}
                        }
                        return l(r, "e"), r.prototype.setAttribute = function(e, t) {
                            this.attributes[e] = t
                        }, r.prototype.getUserId = function() {
                            return this.userId
                        }, r.prototype.getAttributes = function() {
                            return I({}, this.attributes)
                        }, r.prototype.getOptimizely = function() {
                            return this.optimizely
                        }, r.prototype.decide = function(e, t) {
                            return t === void 0 && (t = []), this.optimizely.decide(this.cloneUserContext(), e, t)
                        }, r.prototype.decideForKeys = function(e, t) {
                            return t === void 0 && (t = []), this.optimizely.decideForKeys(this.cloneUserContext(), e, t)
                        }, r.prototype.decideAll = function(e) {
                            return e === void 0 && (e = []), this.optimizely.decideAll(this.cloneUserContext(), e)
                        }, r.prototype.trackEvent = function(e, t) {
                            this.optimizely.track(e, this.userId, this.attributes, t)
                        }, r.prototype.setForcedDecision = function(e, t) {
                            var n, i = e.flagKey,
                                o = (n = e.ruleKey) !== null && n !== void 0 ? n : h.FORCED_DECISION_NULL_RULE_KEY,
                                s = {
                                    variationKey: t.variationKey
                                };
                            return this.forcedDecisionsMap[i] || (this.forcedDecisionsMap[i] = {}), this.forcedDecisionsMap[i][o] = s, !0
                        }, r.prototype.getForcedDecision = function(e) {
                            return this.findForcedDecision(e)
                        }, r.prototype.removeForcedDecision = function(e) {
                            var t, n = (t = e.ruleKey) !== null && t !== void 0 ? t : h.FORCED_DECISION_NULL_RULE_KEY,
                                i = e.flagKey,
                                o = !1;
                            return this.forcedDecisionsMap.hasOwnProperty(i) && (this.forcedDecisionsMap[i].hasOwnProperty(n) && (delete this.forcedDecisionsMap[i][n], o = !0), Object.keys(this.forcedDecisionsMap[i]).length === 0 && delete this.forcedDecisionsMap[i]), o
                        }, r.prototype.removeAllForcedDecisions = function() {
                            return this.forcedDecisionsMap = {}, !0
                        }, r.prototype.findForcedDecision = function(e) {
                            var t, n = (t = e.ruleKey) !== null && t !== void 0 ? t : h.FORCED_DECISION_NULL_RULE_KEY,
                                i = e.flagKey;
                            if (this.forcedDecisionsMap.hasOwnProperty(e.flagKey)) {
                                var o = this.forcedDecisionsMap[i];
                                if (o.hasOwnProperty(n)) return {
                                    variationKey: o[n].variationKey
                                }
                            }
                            return null
                        }, r.prototype.cloneUserContext = function() {
                            var e = new r({
                                optimizely: this.getOptimizely(),
                                userId: this.getUserId(),
                                attributes: this.getAttributes()
                            });
                            return Object.keys(this.forcedDecisionsMap).length > 0 && (e.forcedDecisionsMap = I({}, this.forcedDecisionsMap)), e
                        }, r
                    }(),
                    J = ["and", "or", "not"];

                function Z(r, e) {
                    if (Array.isArray(r)) {
                        var t = r[0],
                            n = r.slice(1);
                        switch (typeof t == "string" && J.indexOf(t) === -1 && (t = "or", n = r), t) {
                            case "and":
                                return function(i, o) {
                                    var s = !1;
                                    if (Array.isArray(i)) {
                                        for (var f = 0; f < i.length; f++) {
                                            var c = Z(i[f], o);
                                            if (c === !1) return !1;
                                            c === null && (s = !0)
                                        }
                                        return !s || null
                                    }
                                    return null
                                }(n, e);
                            case "not":
                                return function(i, o) {
                                    if (Array.isArray(i) && i.length > 0) {
                                        var s = Z(i[0], o);
                                        return s === null ? null : !s
                                    }
                                    return null
                                }(n, e);
                            default:
                                return function(i, o) {
                                    var s = !1;
                                    if (Array.isArray(i)) {
                                        for (var f = 0; f < i.length; f++) {
                                            var c = Z(i[f], o);
                                            if (c === !0) return !0;
                                            c === null && (s = !0)
                                        }
                                        return !!s && null
                                    }
                                    return null
                                }(n, e)
                        }
                    }
                    return e(r)
                }
                l(Z, "J");
                var ee = function() {
                        function r(e, t) {
                            var n, i;
                            this.sdkKey = (n = e.sdkKey) !== null && n !== void 0 ? n : "", this.environmentKey = (i = e.environmentKey) !== null && i !== void 0 ? i : "", this.attributes = e.attributes, this.audiences = r.getAudiences(e), this.events = e.events, this.revision = e.revision;
                            var o = (e.featureFlags || []).reduce(function(f, c) {
                                    return f[c.id] = c.variables, f
                                }, {}),
                                s = r.getExperimentsMapById(e, o);
                            this.experimentsMap = r.getExperimentsKeyMap(s), this.featuresMap = r.getFeaturesMap(e, o, s), this.datafile = t
                        }
                        return l(r, "e"), r.prototype.getDatafile = function() {
                            return this.datafile
                        }, r.getAudiences = function(e) {
                            var t = [],
                                n = [];
                            return (e.typedAudiences || []).forEach(function(i) {
                                t.push({
                                    id: i.id,
                                    conditions: JSON.stringify(i.conditions),
                                    name: i.name
                                }), n.push(i.id)
                            }), (e.audiences || []).forEach(function(i) {
                                n.indexOf(i.id) === -1 && i.id != "$opt_dummy_audience" && t.push({
                                    id: i.id,
                                    conditions: JSON.stringify(i.conditions),
                                    name: i.name
                                })
                            }), t
                        }, r.getSerializedAudiences = function(e, t) {
                            var n = "";
                            if (e) {
                                var i = "";
                                e.forEach(function(o) {
                                    var s = "";
                                    if (o instanceof Array) s = "(" + (s = r.getSerializedAudiences(o, t)) + ")";
                                    else if (J.indexOf(o) > -1) i = o.toUpperCase();
                                    else {
                                        var f = t[o] ? t[o].name : o;
                                        n || i === "NOT" ? (i = i === "" ? "OR" : i, n = n === "" ? i + ' "' + t[o].name + '"' : n.concat(" " + i + ' "' + f + '"')) : n = '"' + f + '"'
                                    }
                                    s !== "" && (n !== "" || i === "NOT" ? (i = i === "" ? "OR" : i, n = n === "" ? i + " " + s : n.concat(" " + i + " " + s)) : n = n.concat(s))
                                })
                            }
                            return n
                        }, r.getExperimentAudiences = function(e, t) {
                            return e.audienceConditions ? r.getSerializedAudiences(e.audienceConditions, t.audiencesById) : ""
                        }, r.mergeFeatureVariables = function(e, t, n, i, o) {
                            var s = (e[n] || []).reduce(function(f, c) {
                                return f[c.key] = {
                                    id: c.id,
                                    key: c.key,
                                    type: c.type,
                                    value: c.defaultValue
                                }, f
                            }, {});
                            return (i || []).forEach(function(f) {
                                var c = t[f.id],
                                    p = {
                                        id: f.id,
                                        key: c.key,
                                        type: c.type,
                                        value: o ? f.value : c.defaultValue
                                    };
                                s[c.key] = p
                            }), s
                        }, r.getVariationsMap = function(e, t, n, i) {
                            return e.reduce(function(o, s) {
                                var f = r.mergeFeatureVariables(t, n, i, s.variables, s.featureEnabled);
                                return o[s.key] = {
                                    id: s.id,
                                    key: s.key,
                                    featureEnabled: s.featureEnabled,
                                    variablesMap: f
                                }, o
                            }, {})
                        }, r.getVariableIdMap = function(e) {
                            return (e.featureFlags || []).reduce(function(t, n) {
                                return n.variables.forEach(function(i) {
                                    t[i.id] = i
                                }), t
                            }, {})
                        }, r.getDeliveryRules = function(e, t, n, i) {
                            var o = r.getVariableIdMap(e);
                            return i.map(function(s) {
                                return {
                                    id: s.id,
                                    key: s.key,
                                    audiences: r.getExperimentAudiences(s, e),
                                    variationsMap: r.getVariationsMap(s.variations, t, o, n)
                                }
                            })
                        }, r.getRolloutExperimentIds = function(e) {
                            var t = [];
                            return (e || []).forEach(function(n) {
                                n.experiments.forEach(function(i) {
                                    t.push(i.id)
                                })
                            }), t
                        }, r.getExperimentsMapById = function(e, t) {
                            var n = r.getVariableIdMap(e),
                                i = this.getRolloutExperimentIds(e.rollouts);
                            return (e.experiments || []).reduce(function(o, s) {
                                if (i.indexOf(s.id) === -1) {
                                    var f = e.experimentFeatureMap[s.id],
                                        c = "";
                                    f && f.length > 0 && (c = f[0]);
                                    var p = r.getVariationsMap(s.variations, t, n, c.toString());
                                    o[s.id] = {
                                        id: s.id,
                                        key: s.key,
                                        audiences: r.getExperimentAudiences(s, e),
                                        variationsMap: p
                                    }
                                }
                                return o
                            }, {})
                        }, r.getExperimentsKeyMap = function(e) {
                            var t = {};
                            for (var n in e) {
                                var i = e[n];
                                t[i.key] = i
                            }
                            return t
                        }, r.getFeaturesMap = function(e, t, n) {
                            var i = {};
                            return e.featureFlags.forEach(function(o) {
                                var s = {},
                                    f = [];
                                o.experimentIds.forEach(function(S) {
                                    var F = n[S];
                                    F && (s[F.key] = F), f.push(n[S])
                                });
                                var c = (o.variables || []).reduce(function(S, F) {
                                        return S[F.key] = {
                                            id: F.id,
                                            key: F.key,
                                            type: F.type,
                                            value: F.defaultValue
                                        }, S
                                    }, {}),
                                    p = [],
                                    T = e.rolloutIdMap[o.rolloutId];
                                T && (p = r.getDeliveryRules(e, t, o.id, T.experiments)), i[o.key] = {
                                    id: o.id,
                                    key: o.key,
                                    experimentRules: f,
                                    deliveryRules: p,
                                    experimentsMap: s,
                                    variablesMap: c
                                }
                            }), i
                        }, r
                    }(),
                    se = Math.pow(2, 53),
                    B = {
                        assign: function(r) {
                            for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
                            if (!r) return {};
                            if (typeof Object.assign == "function") return Object.assign.apply(Object, P([r], e));
                            for (var n = Object(r), i = 0; i < e.length; i++) {
                                var o = e[i];
                                if (o != null)
                                    for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (n[s] = o[s])
                            }
                            return n
                        },
                        currentTimestamp: function() {
                            return Math.round(new Date().getTime())
                        },
                        isSafeInteger: function(r) {
                            return typeof r == "number" && Math.abs(r) <= se
                        },
                        keyBy: function(r, e) {
                            return r ? (0, y.keyBy)(r, function(t) {
                                return t[e]
                            }) : {}
                        },
                        uuid: y.generateUUID,
                        isNumber: function(r) {
                            return typeof r == "number"
                        }
                    },
                    re = "PROJECT_CONFIG",
                    Re = l(function(r, e) {
                        e === void 0 && (e = null);
                        var t, n, i, o, s = (t = r, (o = B.assign({}, t)).audiences = (t.audiences || []).map(function(f) {
                            return B.assign({}, f)
                        }), o.experiments = (t.experiments || []).map(function(f) {
                            return B.assign({}, f)
                        }), o.featureFlags = (t.featureFlags || []).map(function(f) {
                            return B.assign({}, f)
                        }), o.groups = (t.groups || []).map(function(f) {
                            var c = B.assign({}, f);
                            return c.experiments = (f.experiments || []).map(function(p) {
                                return B.assign({}, p)
                            }), c
                        }), o.rollouts = (t.rollouts || []).map(function(f) {
                            var c = B.assign({}, f);
                            return c.experiments = (f.experiments || []).map(function(p) {
                                return B.assign({}, p)
                            }), c
                        }), o.environmentKey = (n = t.environmentKey) !== null && n !== void 0 ? n : "", o.sdkKey = (i = t.sdkKey) !== null && i !== void 0 ? i : "", o);
                        return s.__datafileStr = e === null ? JSON.stringify(r) : e, (s.audiences || []).forEach(function(f) {
                            f.conditions = JSON.parse(f.conditions)
                        }), s.audiencesById = B.keyBy(s.audiences, "id"), B.assign(s.audiencesById, B.keyBy(s.typedAudiences, "id")), s.attributeKeyMap = B.keyBy(s.attributes, "key"), s.eventKeyMap = B.keyBy(s.events, "key"), s.groupIdMap = B.keyBy(s.groups, "id"), Object.keys(s.groupIdMap || {}).forEach(function(f) {
                            (s.groupIdMap[f].experiments || []).forEach(function(c) {
                                s.experiments.push(B.assign(c, {
                                    groupId: f
                                }))
                            })
                        }), s.rolloutIdMap = B.keyBy(s.rollouts || [], "id"), (0, y.objectValues)(s.rolloutIdMap || {}).forEach(function(f) {
                            (f.experiments || []).forEach(function(c) {
                                s.experiments.push(c), c.variationKeyMap = B.keyBy(c.variations, "key")
                            })
                        }), s.experimentKeyMap = B.keyBy(s.experiments, "key"), s.experimentIdMap = B.keyBy(s.experiments, "id"), s.variationIdMap = {}, s.variationVariableUsageMap = {}, (s.experiments || []).forEach(function(f) {
                            f.variationKeyMap = B.keyBy(f.variations, "key"), B.assign(s.variationIdMap, B.keyBy(f.variations, "id")), (0, y.objectValues)(f.variationKeyMap || {}).forEach(function(c) {
                                c.variables && (s.variationVariableUsageMap[c.id] = B.keyBy(c.variables, "id"))
                            })
                        }), s.experimentFeatureMap = {}, s.featureKeyMap = B.keyBy(s.featureFlags || [], "key"), (0, y.objectValues)(s.featureKeyMap || {}).forEach(function(f) {
                            f.variables.forEach(function(c) {
                                c.type === m.STRING && c.subType === m.JSON && (c.type = m.JSON, delete c.subType)
                            }), f.variableKeyMap = B.keyBy(f.variables, "key"), (f.experimentIds || []).forEach(function(c) {
                                s.experimentFeatureMap[c] ? s.experimentFeatureMap[c].push(f.id) : s.experimentFeatureMap[c] = [f.id]
                            })
                        }), s.flagRulesMap = {}, (s.featureFlags || []).forEach(function(f) {
                            var c = [];
                            f.experimentIds.forEach(function(T) {
                                var S = s.experimentIdMap[T];
                                S && c.push(S)
                            });
                            var p = s.rolloutIdMap[f.rolloutId];
                            p && c.push.apply(c, p.experiments), s.flagRulesMap[f.key] = c
                        }), s.flagVariationsMap = {}, (0, y.objectEntries)(s.flagRulesMap || {}).forEach(function(f) {
                            var c = f[0],
                                p = f[1],
                                T = [];
                            p.forEach(function(S) {
                                S.variations.forEach(function(F) {
                                    (0, y.find)(T, function(Y) {
                                        return Y.id === F.id
                                    }) || T.push(F)
                                })
                            }), s.flagVariationsMap[c] = T
                        }), s
                    }, "q"),
                    Be = l(function(r, e) {
                        var t = r.experimentIdMap[e];
                        if (!t) throw new Error((0, y.sprintf)(E.INVALID_EXPERIMENT_ID, re, e));
                        return t.layerId
                    }, "Q"),
                    Pe = l(function(r, e, t) {
                        var n = r.attributeKeyMap[e],
                            i = e.indexOf("$opt_") === 0;
                        return n ? (i && t.log(a.WARNING, "Attribute %s unexpectedly has reserved prefix %s; using attribute ID instead of reserved attribute name.", e, "$opt_"), n.id) : i ? e : (t.log(a.DEBUG, E.UNRECOGNIZED_ATTRIBUTE, re, e), null)
                    }, "ee"),
                    z = l(function(r, e) {
                        var t = r.eventKeyMap[e];
                        return t ? t.id : null
                    }, "te"),
                    $ = l(function(r, e) {
                        var t = r.experimentKeyMap[e];
                        if (!t) throw new Error((0, y.sprintf)(E.INVALID_EXPERIMENT_KEY, re, e));
                        return t.status
                    }, "re"),
                    oe = l(function(r, e) {
                        return r.variationIdMap.hasOwnProperty(e) ? r.variationIdMap[e].key : null
                    }, "ie"),
                    ue = l(function(r, e) {
                        if (r.experimentKeyMap.hasOwnProperty(e)) {
                            var t = r.experimentKeyMap[e];
                            if (t) return t
                        }
                        throw new Error((0, y.sprintf)(E.EXPERIMENT_KEY_NOT_IN_DATAFILE, re, e))
                    }, "ne"),
                    he = l(function(r, e) {
                        var t = r.experimentIdMap[e];
                        if (!t) throw new Error((0, y.sprintf)(E.INVALID_EXPERIMENT_ID, re, e));
                        return t.trafficAllocation
                    }, "oe"),
                    De = l(function(r, e, t) {
                        if (r.experimentIdMap.hasOwnProperty(e)) {
                            var n = r.experimentIdMap[e];
                            if (n) return n
                        }
                        return t.log(a.ERROR, E.INVALID_EXPERIMENT_ID, re, e), null
                    }, "ae"),
                    Ve = l(function(r, e, t) {
                        if (!r) return null;
                        var n = r.flagVariationsMap[e],
                            i = (0, y.find)(n, function(o) {
                                return o.key === t
                            });
                        return i || null
                    }, "se"),
                    Ue = l(function(r, e, t) {
                        if (r.featureKeyMap.hasOwnProperty(e)) {
                            var n = r.featureKeyMap[e];
                            if (n) return n
                        }
                        return t.log(a.ERROR, E.FEATURE_NOT_IN_DATAFILE, re, e), null
                    }, "ue"),
                    Te = l(function(r) {
                        return r.__datafileStr
                    }, "le"),
                    We = l(function(r) {
                        var e;
                        try {
                            e = ye(r.datafile)
                        } catch (n) {
                            return {
                                configObj: null,
                                error: n
                            }
                        }
                        if (r.jsonSchemaValidator) try {
                            r.jsonSchemaValidator.validate(e), r.logger.log(a.INFO, u.VALID_DATAFILE, re)
                        } catch (n) {
                            return {
                                configObj: null,
                                error: n
                            }
                        } else r.logger.log(a.INFO, u.SKIPPING_JSON_VALIDATION, re);
                        var t = [e];
                        return typeof r.datafile == "string" && t.push(r.datafile), {
                            configObj: Re.apply(void 0, t),
                            error: null
                        }
                    }, "Ee"),
                    Je = l(function(r) {
                        return !!r.sendFlagDecisions
                    }, "Ie"),
                    Me = (0, v.getLogger)();

                function Se(r, e) {
                    return r instanceof Error ? r.message : e || "Unknown error"
                }
                l(Se, "_e");
                var gt = function() {
                        function r(e) {
                            this.updateListeners = [], this.configObj = null, this.optimizelyConfigObj = null, this.datafileManager = null;
                            try {
                                if (this.jsonSchemaValidator = e.jsonSchemaValidator, !e.datafile && !e.sdkKey) {
                                    var t = new Error((0, y.sprintf)(E.DATAFILE_AND_SDK_KEY_MISSING, "PROJECT_CONFIG_MANAGER"));
                                    return this.readyPromise = Promise.resolve({
                                        success: !1,
                                        reason: Se(t)
                                    }), void Me.error(t)
                                }
                                var n = null;
                                e.datafile && (n = this.handleNewDatafile(e.datafile)), e.sdkKey && e.datafileManager ? (this.datafileManager = e.datafileManager, this.datafileManager.start(), this.readyPromise = this.datafileManager.onReady().then(this.onDatafileManagerReadyFulfill.bind(this), this.onDatafileManagerReadyReject.bind(this)), this.datafileManager.on("update", this.onDatafileManagerUpdate.bind(this))) : this.configObj ? this.readyPromise = Promise.resolve({
                                    success: !0
                                }) : this.readyPromise = Promise.resolve({
                                    success: !1,
                                    reason: Se(n, "Invalid datafile")
                                })
                            } catch (i) {
                                Me.error(i), this.readyPromise = Promise.resolve({
                                    success: !1,
                                    reason: Se(i, "Error in initialize")
                                })
                            }
                        }
                        return l(r, "e"), r.prototype.onDatafileManagerReadyFulfill = function() {
                            if (this.datafileManager) {
                                var e = this.handleNewDatafile(this.datafileManager.get());
                                return e ? {
                                    success: !1,
                                    reason: Se(e)
                                } : {
                                    success: !0
                                }
                            }
                            return {
                                success: !1,
                                reason: Se(null, "Datafile manager is not provided")
                            }
                        }, r.prototype.onDatafileManagerReadyReject = function(e) {
                            return {
                                success: !1,
                                reason: Se(e, "Failed to become ready")
                            }
                        }, r.prototype.onDatafileManagerUpdate = function() {
                            this.datafileManager && this.handleNewDatafile(this.datafileManager.get())
                        }, r.prototype.handleNewDatafile = function(e) {
                            var t = We({
                                    datafile: e,
                                    jsonSchemaValidator: this.jsonSchemaValidator,
                                    logger: Me
                                }),
                                n = t.configObj,
                                i = t.error;
                            if (i) Me.error(i);
                            else {
                                var o = this.configObj ? this.configObj.revision : "null";
                                n && o !== n.revision && (this.configObj = n, this.optimizelyConfigObj = null, this.updateListeners.forEach(function(s) {
                                    return s(n)
                                }))
                            }
                            return i
                        }, r.prototype.getConfig = function() {
                            return this.configObj
                        }, r.prototype.getOptimizelyConfig = function() {
                            var e, t;
                            return !this.optimizelyConfigObj && this.configObj && (this.optimizelyConfigObj = (e = this.configObj, t = Te(this.configObj), new ee(e, t))), this.optimizelyConfigObj
                        }, r.prototype.onReady = function() {
                            return this.readyPromise
                        }, r.prototype.onUpdate = function(e) {
                            var t = this;
                            return this.updateListeners.push(e),
                                function() {
                                    var n = t.updateListeners.indexOf(e);
                                    n > -1 && t.updateListeners.splice(n, 1)
                                }
                        }, r.prototype.stop = function() {
                            this.datafileManager && this.datafileManager.stop(), this.updateListeners = []
                        }, r
                    }(),
                    pt = Math.pow(2, 32),
                    Ze = l(function(r) {
                        var e = [],
                            t = r.experimentIdMap[r.experimentId].groupId;
                        if (t) {
                            var n = r.groupIdMap[t];
                            if (!n) throw new Error((0, y.sprintf)(E.INVALID_GROUP_ID, "BUCKETER", t));
                            if (n.policy === "random") {
                                var i = _t(n, r.bucketingId, r.userId, r.logger);
                                if (i === null) return r.logger.log(a.INFO, u.USER_NOT_IN_ANY_EXPERIMENT, "BUCKETER", r.userId, t), e.push([u.USER_NOT_IN_ANY_EXPERIMENT, "BUCKETER", r.userId, t]), {
                                    result: null,
                                    reasons: e
                                };
                                if (i !== r.experimentId) return r.logger.log(a.INFO, u.USER_NOT_BUCKETED_INTO_EXPERIMENT_IN_GROUP, "BUCKETER", r.userId, r.experimentKey, t), e.push([u.USER_NOT_BUCKETED_INTO_EXPERIMENT_IN_GROUP, "BUCKETER", r.userId, r.experimentKey, t]), {
                                    result: null,
                                    reasons: e
                                };
                                r.logger.log(a.INFO, u.USER_BUCKETED_INTO_EXPERIMENT_IN_GROUP, "BUCKETER", r.userId, r.experimentKey, t), e.push([u.USER_BUCKETED_INTO_EXPERIMENT_IN_GROUP, "BUCKETER", r.userId, r.experimentKey, t])
                            }
                        }
                        var o = "" + r.bucketingId + r.experimentId,
                            s = Qe(o);
                        r.logger.log(a.DEBUG, u.USER_ASSIGNED_TO_EXPERIMENT_BUCKET, "BUCKETER", s, r.userId), e.push([u.USER_ASSIGNED_TO_EXPERIMENT_BUCKET, "BUCKETER", s, r.userId]);
                        var f = qe(s, r.trafficAllocationConfig);
                        return f === null || r.variationIdMap[f] ? {
                            result: f,
                            reasons: e
                        } : (f && (r.logger.log(a.WARNING, u.INVALID_VARIATION_ID, "BUCKETER"), e.push([u.INVALID_VARIATION_ID, "BUCKETER"])), {
                            result: null,
                            reasons: e
                        })
                    }, "ge"),
                    _t = l(function(r, e, t, n) {
                        var i = "" + e + r.id,
                            o = Qe(i);
                        n.log(a.DEBUG, u.USER_ASSIGNED_TO_EXPERIMENT_BUCKET, "BUCKETER", o, t);
                        var s = r.trafficAllocation;
                        return qe(o, s)
                    }, "pe"),
                    qe = l(function(r, e) {
                        for (var t = 0; t < e.length; t++)
                            if (r < e[t].endOfRange) return e[t].entityId;
                        return null
                    }, "Ne"),
                    Qe = l(function(r) {
                        try {
                            var e = A().v3(r, 1) / pt;
                            return Math.floor(1e4 * e)
                        } catch (t) {
                            throw new Error((0, y.sprintf)(E.INVALID_BUCKETING_ID, "BUCKETER", r, t.message))
                        }
                    }, "Re"),
                    Fe = (0, v.getLogger)();

                function $e(r) {
                    return /^\d+$/.test(r)
                }
                l($e, "Te");

                function Ne(r) {
                    var e = r.indexOf("-"),
                        t = r.indexOf("+");
                    return !(e < 0) && (t < 0 || e < t)
                }
                l(Ne, "ve");

                function et(r) {
                    var e = r.indexOf("-"),
                        t = r.indexOf("+");
                    return !(t < 0) && (e < 0 || t < e)
                }
                l(et, "he");

                function tt(r) {
                    var e = r,
                        t = "";
                    if (function(f) {
                            return /\s/.test(f)
                        }(r)) return Fe.warn(u.UNKNOWN_MATCH_TYPE, "SEMANTIC VERSION", r), null;
                    if (Ne(r) ? (e = r.substring(0, r.indexOf("-")), t = r.substring(r.indexOf("-") + 1)) : et(r) && (e = r.substring(0, r.indexOf("+")), t = r.substring(r.indexOf("+") + 1)), typeof e != "string" || typeof t != "string") return null;
                    var n = e.split(".").length - 1;
                    if (n > 2) return Fe.warn(u.UNKNOWN_MATCH_TYPE, "SEMANTIC VERSION", r), null;
                    var i = e.split(".");
                    if (i.length != n + 1) return Fe.warn(u.UNKNOWN_MATCH_TYPE, "SEMANTIC VERSION", r), null;
                    for (var o = 0, s = i; o < s.length; o++)
                        if (!$e(s[o])) return Fe.warn(u.UNKNOWN_MATCH_TYPE, "SEMANTIC VERSION", r), null;
                    return t && i.push(t), i
                }
                l(tt, "ye");
                var le = "CUSTOM_ATTRIBUTE_CONDITION_EVALUATOR",
                    ce = (0, v.getLogger)(),
                    ht = ["exact", "exists", "gt", "ge", "lt", "le", "substring", "semver_eq", "semver_lt", "semver_le", "semver_gt", "semver_ge"],
                    pe = {};

                function rt(r) {
                    return typeof r == "string" || typeof r == "boolean" || B.isNumber(r)
                }
                l(rt, "Le");

                function nt(r, e) {
                    var t = r.value,
                        n = typeof t,
                        i = r.name,
                        o = e[i],
                        s = typeof o;
                    return !rt(t) || B.isNumber(t) && !B.isSafeInteger(t) ? (ce.warn(u.UNEXPECTED_CONDITION_VALUE, le, JSON.stringify(r)), null) : o === null ? (ce.debug(u.UNEXPECTED_TYPE_NULL, le, JSON.stringify(r), i), null) : rt(o) && n === s ? B.isNumber(o) && !B.isSafeInteger(o) ? (ce.warn(u.OUT_OF_BOUNDS, le, JSON.stringify(r), i), null) : t === o : (ce.warn(u.UNEXPECTED_TYPE, le, JSON.stringify(r), s, i), null)
                }
                l(nt, "me");

                function ke(r, e) {
                    var t = r.name,
                        n = e[t],
                        i = typeof n,
                        o = r.value;
                    return o !== null && B.isSafeInteger(o) ? n === null ? (ce.debug(u.UNEXPECTED_TYPE_NULL, le, JSON.stringify(r), t), !1) : B.isNumber(n) ? !!B.isSafeInteger(n) || (ce.warn(u.OUT_OF_BOUNDS, le, JSON.stringify(r), t), !1) : (ce.warn(u.UNEXPECTED_TYPE, le, JSON.stringify(r), i, t), !1) : (ce.warn(u.UNEXPECTED_CONDITION_VALUE, le, JSON.stringify(r)), !1)
                }
                l(ke, "Ve");

                function be(r, e) {
                    var t = r.name,
                        n = e[t],
                        i = typeof n,
                        o = r.value;
                    return typeof o != "string" ? (ce.warn(u.UNEXPECTED_CONDITION_VALUE, le, JSON.stringify(r)), null) : n === null ? (ce.debug(u.UNEXPECTED_TYPE_NULL, le, JSON.stringify(r), t), null) : typeof n != "string" ? (ce.warn(u.UNEXPECTED_TYPE, le, JSON.stringify(r), i, t), null) : function(s, f) {
                        var c = tt(f),
                            p = tt(s);
                        if (!c || !p) return null;
                        for (var T = c.length, S = 0; S < p.length; S++) {
                            if (T <= S) return Ne(s) || et(s) ? 1 : -1;
                            if ($e(c[S])) {
                                var F = parseInt(c[S]),
                                    Y = parseInt(p[S]);
                                if (F > Y) return 1;
                                if (F < Y) return -1
                            } else {
                                if (c[S] < p[S]) return Ne(s) && !Ne(f) ? 1 : -1;
                                if (c[S] > p[S]) return !Ne(s) && Ne(f) ? -1 : 1
                            }
                        }
                        return Ne(f) && !Ne(s) ? -1 : 0
                    }(o, n)
                }
                l(be, "Ce"), pe.exact = nt, pe.exists = function(r, e) {
                    var t = e[r.name];
                    return t != null
                }, pe.gt = function(r, e) {
                    var t = e[r.name],
                        n = r.value;
                    return !ke(r, e) || n === null ? null : t > n
                }, pe.ge = function(r, e) {
                    var t = e[r.name],
                        n = r.value;
                    return !ke(r, e) || n === null ? null : t >= n
                }, pe.lt = function(r, e) {
                    var t = e[r.name],
                        n = r.value;
                    return !ke(r, e) || n === null ? null : t < n
                }, pe.le = function(r, e) {
                    var t = e[r.name],
                        n = r.value;
                    return !ke(r, e) || n === null ? null : t <= n
                }, pe.substring = function(r, e) {
                    var t = r.name,
                        n = e[r.name],
                        i = typeof n,
                        o = r.value;
                    return typeof o != "string" ? (ce.warn(u.UNEXPECTED_CONDITION_VALUE, le, JSON.stringify(r)), null) : n === null ? (ce.debug(u.UNEXPECTED_TYPE_NULL, le, JSON.stringify(r), t), null) : typeof n != "string" ? (ce.warn(u.UNEXPECTED_TYPE, le, JSON.stringify(r), i, t), null) : n.indexOf(o) !== -1
                }, pe.semver_eq = function(r, e) {
                    var t = be(r, e);
                    return t === null ? null : t === 0
                }, pe.semver_gt = function(r, e) {
                    var t = be(r, e);
                    return t === null ? null : t > 0
                }, pe.semver_ge = function(r, e) {
                    var t = be(r, e);
                    return t === null ? null : t >= 0
                }, pe.semver_lt = function(r, e) {
                    var t = be(r, e);
                    return t === null ? null : t < 0
                }, pe.semver_le = function(r, e) {
                    var t = be(r, e);
                    return t === null ? null : t <= 0
                };
                var It = Object.freeze({
                        __proto__: null,
                        evaluate: function(r, e) {
                            var t = r.match;
                            if (t !== void 0 && ht.indexOf(t) === -1) return ce.warn(u.UNKNOWN_MATCH_TYPE, le, JSON.stringify(r)), null;
                            var n = r.name;
                            return e.hasOwnProperty(n) || t == "exists" ? (t && pe[t] || nt)(r, e) : (ce.debug(u.MISSING_ATTRIBUTE_VALUE, le, JSON.stringify(r), n), null)
                        }
                    }),
                    xe = (0, v.getLogger)(),
                    vt = function() {
                        function r(e) {
                            this.typeToEvaluatorMap = B.assign({}, e, {
                                custom_attribute: It
                            })
                        }
                        return l(r, "e"), r.prototype.evaluate = function(e, t, n) {
                            var i = this;
                            return n === void 0 && (n = {}), !e || e.length === 0 ? !0 : !!Z(e, function(o) {
                                var s = t[o];
                                if (s) {
                                    xe.log(a.DEBUG, u.EVALUATING_AUDIENCE, "AUDIENCE_EVALUATOR", o, JSON.stringify(s.conditions));
                                    var f = Z(s.conditions, i.evaluateConditionWithUserAttributes.bind(i, n)),
                                        c = f === null ? "UNKNOWN" : f.toString().toUpperCase();
                                    return xe.log(a.DEBUG, u.AUDIENCE_EVALUATION_RESULT, "AUDIENCE_EVALUATOR", o, c), f
                                }
                                return null
                            })
                        }, r.prototype.evaluateConditionWithUserAttributes = function(e, t) {
                            var n = this.typeToEvaluatorMap[t.type];
                            if (!n) return xe.log(a.WARNING, u.UNKNOWN_CONDITION_TYPE, "AUDIENCE_EVALUATOR", JSON.stringify(t)), null;
                            try {
                                return n.evaluate(t, e)
                            } catch (i) {
                                xe.log(a.ERROR, E.CONDITION_EVALUATOR_ERROR, "AUDIENCE_EVALUATOR", t.type, i.message)
                            }
                            return null
                        }, r
                    }();

                function it(r) {
                    return typeof r == "string" && r !== ""
                }
                l(it, "be");
                var K = "DECISION_SERVICE",
                    yt = function() {
                        function r(e) {
                            var t;
                            this.audienceEvaluator = (t = e.UNSTABLE_conditionEvaluators, new vt(t)), this.forcedVariationMap = {}, this.logger = e.logger, this.userProfileService = e.userProfileService || null
                        }
                        return l(r, "e"), r.prototype.getVariation = function(e, t, n, i) {
                            i === void 0 && (i = {});
                            var o = n.getUserId(),
                                s = n.getAttributes(),
                                f = this.getBucketingId(o, s),
                                c = [],
                                p = t.key;
                            if (!this.checkIfExperimentIsActive(e, p)) return this.logger.log(a.INFO, u.EXPERIMENT_NOT_RUNNING, K, p), c.push([u.EXPERIMENT_NOT_RUNNING, K, p]), {
                                result: null,
                                reasons: c
                            };
                            var T = this.getForcedVariation(e, p, o);
                            c.push.apply(c, T.reasons);
                            var S = T.result;
                            if (S) return {
                                result: S,
                                reasons: c
                            };
                            var F = this.getWhitelistedVariation(t, o);
                            c.push.apply(c, F.reasons);
                            var Y = F.result;
                            if (Y) return {
                                result: Y.key,
                                reasons: c
                            };
                            var ne = i[w.IGNORE_USER_PROFILE_SERVICE],
                                ae = this.resolveExperimentBucketMap(o, s);
                            if (!ne && (Y = this.getStoredVariation(e, t, o, ae))) return this.logger.log(a.INFO, u.RETURNING_STORED_VARIATION, K, Y.key, p, o), c.push([u.RETURNING_STORED_VARIATION, K, Y.key, p, o]), {
                                result: Y.key,
                                reasons: c
                            };
                            var ie = this.checkIfUserIsInAudience(e, t, U.EXPERIMENT, s, "");
                            if (c.push.apply(c, ie.reasons), !ie.result) return this.logger.log(a.INFO, u.USER_NOT_IN_EXPERIMENT, K, o, p), c.push([u.USER_NOT_IN_EXPERIMENT, K, o, p]), {
                                result: null,
                                reasons: c
                            };
                            var de = this.buildBucketerParams(e, t, f, o),
                                _e = Ze(de);
                            c.push.apply(c, _e.reasons);
                            var Ee = _e.result;
                            return Ee && (Y = e.variationIdMap[Ee]), Y ? (this.logger.log(a.INFO, u.USER_HAS_VARIATION, K, o, Y.key, p), c.push([u.USER_HAS_VARIATION, K, o, Y.key, p]), ne || this.saveUserProfile(t, Y, o, ae), {
                                result: Y.key,
                                reasons: c
                            }) : (this.logger.log(a.DEBUG, u.USER_HAS_NO_VARIATION, K, o, p), c.push([u.USER_HAS_NO_VARIATION, K, o, p]), {
                                result: null,
                                reasons: c
                            })
                        }, r.prototype.resolveExperimentBucketMap = function(e, t) {
                            t = t || {};
                            var n = this.getUserProfile(e) || {},
                                i = t[h.STICKY_BUCKETING_KEY];
                            return B.assign({}, n.experiment_bucket_map, i)
                        }, r.prototype.checkIfExperimentIsActive = function(e, t) {
                            return function(n, i) {
                                return $(n, i) === "Running"
                            }(e, t)
                        }, r.prototype.getWhitelistedVariation = function(e, t) {
                            var n = [];
                            if (e.forcedVariations && e.forcedVariations.hasOwnProperty(t)) {
                                var i = e.forcedVariations[t];
                                return e.variationKeyMap.hasOwnProperty(i) ? (this.logger.log(a.INFO, u.USER_FORCED_IN_VARIATION, K, t, i), n.push([u.USER_FORCED_IN_VARIATION, K, t, i]), {
                                    result: e.variationKeyMap[i],
                                    reasons: n
                                }) : (this.logger.log(a.ERROR, u.FORCED_BUCKETING_FAILED, K, i, t), n.push([u.FORCED_BUCKETING_FAILED, K, i, t]), {
                                    result: null,
                                    reasons: n
                                })
                            }
                            return {
                                result: null,
                                reasons: n
                            }
                        }, r.prototype.checkIfUserIsInAudience = function(e, t, n, i, o) {
                            var s = [],
                                f = function(T, S) {
                                    var F = T.experimentIdMap[S];
                                    if (!F) throw new Error((0, y.sprintf)(E.INVALID_EXPERIMENT_ID, re, S));
                                    return F.audienceConditions || F.audienceIds
                                }(e, t.id),
                                c = e.audiencesById;
                            this.logger.log(a.DEBUG, u.EVALUATING_AUDIENCES_COMBINED, K, n, o || t.key, JSON.stringify(f)), s.push([u.EVALUATING_AUDIENCES_COMBINED, K, n, o || t.key, JSON.stringify(f)]);
                            var p = this.audienceEvaluator.evaluate(f, c, i);
                            return this.logger.log(a.INFO, u.AUDIENCE_EVALUATION_RESULT_COMBINED, K, n, o || t.key, p.toString().toUpperCase()), s.push([u.AUDIENCE_EVALUATION_RESULT_COMBINED, K, n, o || t.key, p.toString().toUpperCase()]), {
                                result: p,
                                reasons: s
                            }
                        }, r.prototype.buildBucketerParams = function(e, t, n, i) {
                            return {
                                bucketingId: n,
                                experimentId: t.id,
                                experimentKey: t.key,
                                experimentIdMap: e.experimentIdMap,
                                experimentKeyMap: e.experimentKeyMap,
                                groupIdMap: e.groupIdMap,
                                logger: this.logger,
                                trafficAllocationConfig: he(e, t.id),
                                userId: i,
                                variationIdMap: e.variationIdMap
                            }
                        }, r.prototype.getStoredVariation = function(e, t, n, i) {
                            if (i.hasOwnProperty(t.id)) {
                                var o = i[t.id],
                                    s = o.variation_id;
                                if (e.variationIdMap.hasOwnProperty(s)) return e.variationIdMap[o.variation_id];
                                this.logger.log(a.INFO, u.SAVED_VARIATION_NOT_FOUND, K, n, s, t.key)
                            }
                            return null
                        }, r.prototype.getUserProfile = function(e) {
                            var t = {
                                user_id: e,
                                experiment_bucket_map: {}
                            };
                            if (!this.userProfileService) return t;
                            try {
                                return this.userProfileService.lookup(e)
                            } catch (n) {
                                this.logger.log(a.ERROR, E.USER_PROFILE_LOOKUP_ERROR, K, e, n.message)
                            }
                            return null
                        }, r.prototype.saveUserProfile = function(e, t, n, i) {
                            if (this.userProfileService) try {
                                i[e.id] = {
                                    variation_id: t.id
                                }, this.userProfileService.save({
                                    user_id: n,
                                    experiment_bucket_map: i
                                }), this.logger.log(a.INFO, u.SAVED_VARIATION, K, t.key, e.key, n)
                            } catch (o) {
                                this.logger.log(a.ERROR, E.USER_PROFILE_SAVE_ERROR, K, n, o.message)
                            }
                        }, r.prototype.getVariationForFeature = function(e, t, n, i) {
                            i === void 0 && (i = {});
                            var o = [],
                                s = this.getVariationForFeatureExperiment(e, t, n, i);
                            o.push.apply(o, s.reasons);
                            var f = s.result;
                            if (f.variation !== null) return {
                                result: f,
                                reasons: o
                            };
                            var c = this.getVariationForRollout(e, t, n);
                            o.push.apply(o, c.reasons);
                            var p = c.result,
                                T = n.getUserId();
                            return p.variation ? (this.logger.log(a.DEBUG, u.USER_IN_ROLLOUT, K, T, t.key), o.push([u.USER_IN_ROLLOUT, K, T, t.key]), {
                                result: p,
                                reasons: o
                            }) : (this.logger.log(a.DEBUG, u.USER_NOT_IN_ROLLOUT, K, T, t.key), o.push([u.USER_NOT_IN_ROLLOUT, K, T, t.key]), {
                                result: p,
                                reasons: o
                            })
                        }, r.prototype.getVariationForFeatureExperiment = function(e, t, n, i) {
                            i === void 0 && (i = {});
                            var o, s, f = [],
                                c = null;
                            if (t.experimentIds.length > 0)
                                for (s = 0; s < t.experimentIds.length; s++) {
                                    var p = De(e, t.experimentIds[s], this.logger);
                                    if (p && (o = this.getVariationFromExperimentRule(e, t.key, p, n, i), f.push.apply(f, o.reasons), c = o.result)) {
                                        var T = null;
                                        return (T = p.variationKeyMap[c]) || (T = Ve(e, t.key, c)), {
                                            result: {
                                                experiment: p,
                                                variation: T,
                                                decisionSource: M.FEATURE_TEST
                                            },
                                            reasons: f
                                        }
                                    }
                                } else this.logger.log(a.DEBUG, u.FEATURE_HAS_NO_EXPERIMENTS, K, t.key), f.push([u.FEATURE_HAS_NO_EXPERIMENTS, K, t.key]);
                            return {
                                result: {
                                    experiment: null,
                                    variation: null,
                                    decisionSource: M.FEATURE_TEST
                                },
                                reasons: f
                            }
                        }, r.prototype.getVariationForRollout = function(e, t, n) {
                            var i = [];
                            if (!t.rolloutId) return this.logger.log(a.DEBUG, u.NO_ROLLOUT_EXISTS, K, t.key), i.push([u.NO_ROLLOUT_EXISTS, K, t.key]), {
                                result: {
                                    experiment: null,
                                    variation: null,
                                    decisionSource: M.ROLLOUT
                                },
                                reasons: i
                            };
                            var o = e.rolloutIdMap[t.rolloutId];
                            if (!o) return this.logger.log(a.ERROR, E.INVALID_ROLLOUT_ID, K, t.rolloutId, t.key), i.push([E.INVALID_ROLLOUT_ID, K, t.rolloutId, t.key]), {
                                result: {
                                    experiment: null,
                                    variation: null,
                                    decisionSource: M.ROLLOUT
                                },
                                reasons: i
                            };
                            var s, f, c, p = o.experiments;
                            if (p.length === 0) return this.logger.log(a.ERROR, u.ROLLOUT_HAS_NO_EXPERIMENTS, K, t.rolloutId), i.push([u.ROLLOUT_HAS_NO_EXPERIMENTS, K, t.rolloutId]), {
                                result: {
                                    experiment: null,
                                    variation: null,
                                    decisionSource: M.ROLLOUT
                                },
                                reasons: i
                            };
                            for (var T = 0; T < p.length;) {
                                if (s = this.getVariationFromDeliveryRule(e, t.key, p, T, n), i.push.apply(i, s.reasons), c = s.result, f = s.skipToEveryoneElse, c) return {
                                    result: {
                                        experiment: e.experimentIdMap[p[T].id],
                                        variation: c,
                                        decisionSource: M.ROLLOUT
                                    },
                                    reasons: i
                                };
                                T = f ? p.length - 1 : T + 1
                            }
                            return {
                                result: {
                                    experiment: null,
                                    variation: null,
                                    decisionSource: M.ROLLOUT
                                },
                                reasons: i
                            }
                        }, r.prototype.getBucketingId = function(e, t) {
                            var n = e;
                            return t != null && typeof t == "object" && t.hasOwnProperty(h.BUCKETING_ID) && (typeof t[h.BUCKETING_ID] == "string" ? (n = t[h.BUCKETING_ID], this.logger.log(a.DEBUG, u.VALID_BUCKETING_ID, K, n)) : this.logger.log(a.WARNING, u.BUCKETING_ID_NOT_STRING, K)), n
                        }, r.prototype.findValidatedForcedDecision = function(e, t, n, i) {
                            var o, s = [],
                                f = t.getForcedDecision({
                                    flagKey: n,
                                    ruleKey: i
                                }),
                                c = null,
                                p = t.getUserId();
                            return e && f && (o = f.variationKey, (c = Ve(e, n, o)) ? i ? (this.logger.log(a.INFO, u.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED, o, n, i, p), s.push([u.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED, o, n, i, p])) : (this.logger.log(a.INFO, u.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED, o, n, p), s.push([u.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED, o, n, p])) : i ? (this.logger.log(a.INFO, u.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED_BUT_INVALID, n, i, p), s.push([u.USER_HAS_FORCED_DECISION_WITH_RULE_SPECIFIED_BUT_INVALID, n, i, p])) : (this.logger.log(a.INFO, u.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED_BUT_INVALID, n, p), s.push([u.USER_HAS_FORCED_DECISION_WITH_NO_RULE_SPECIFIED_BUT_INVALID, n, p]))), {
                                result: c,
                                reasons: s
                            }
                        }, r.prototype.removeForcedVariation = function(e, t, n) {
                            if (!e) throw new Error((0, y.sprintf)(E.INVALID_USER_ID, K));
                            if (!this.forcedVariationMap.hasOwnProperty(e)) throw new Error((0, y.sprintf)(E.USER_NOT_IN_FORCED_VARIATION, K, e));
                            delete this.forcedVariationMap[e][t], this.logger.log(a.DEBUG, u.VARIATION_REMOVED_FOR_USER, K, n, e)
                        }, r.prototype.setInForcedVariationMap = function(e, t, n) {
                            this.forcedVariationMap.hasOwnProperty(e) || (this.forcedVariationMap[e] = {}), this.forcedVariationMap[e][t] = n, this.logger.log(a.DEBUG, u.USER_MAPPED_TO_FORCED_VARIATION, K, n, t, e)
                        }, r.prototype.getForcedVariation = function(e, t, n) {
                            var i, o = [],
                                s = this.forcedVariationMap[n];
                            if (!s) return this.logger.log(a.DEBUG, u.USER_HAS_NO_FORCED_VARIATION, K, n), {
                                result: null,
                                reasons: o
                            };
                            try {
                                var f = ue(e, t);
                                if (!f.hasOwnProperty("id")) return this.logger.log(a.ERROR, E.IMPROPERLY_FORMATTED_EXPERIMENT, K, t), o.push([E.IMPROPERLY_FORMATTED_EXPERIMENT, K, t]), {
                                    result: null,
                                    reasons: o
                                };
                                i = f.id
                            } catch (T) {
                                return this.logger.log(a.ERROR, T.message), o.push(T.message), {
                                    result: null,
                                    reasons: o
                                }
                            }
                            var c = s[i];
                            if (!c) return this.logger.log(a.DEBUG, u.USER_HAS_NO_FORCED_VARIATION_FOR_EXPERIMENT, K, t, n), {
                                result: null,
                                reasons: o
                            };
                            var p = oe(e, c);
                            return p ? (this.logger.log(a.DEBUG, u.USER_HAS_FORCED_VARIATION, K, p, t, n), o.push([u.USER_HAS_FORCED_VARIATION, K, p, t, n])) : this.logger.log(a.DEBUG, u.USER_HAS_NO_FORCED_VARIATION_FOR_EXPERIMENT, K, t, n), {
                                result: p,
                                reasons: o
                            }
                        }, r.prototype.setForcedVariation = function(e, t, n, i) {
                            if (i != null && !it(i)) return this.logger.log(a.ERROR, E.INVALID_VARIATION_KEY, K), !1;
                            var o;
                            try {
                                var s = ue(e, t);
                                if (!s.hasOwnProperty("id")) return this.logger.log(a.ERROR, E.IMPROPERLY_FORMATTED_EXPERIMENT, K, t), !1;
                                o = s.id
                            } catch (c) {
                                return this.logger.log(a.ERROR, c.message), !1
                            }
                            if (i == null) try {
                                return this.removeForcedVariation(n, o, t), !0
                            } catch (c) {
                                return this.logger.log(a.ERROR, c.message), !1
                            }
                            var f = function(c, p, T) {
                                var S = c.experimentKeyMap[p];
                                return S.variationKeyMap.hasOwnProperty(T) ? S.variationKeyMap[T].id : null
                            }(e, t, i);
                            if (!f) return this.logger.log(a.ERROR, E.NO_VARIATION_FOR_EXPERIMENT_KEY, K, i, t), !1;
                            try {
                                return this.setInForcedVariationMap(n, o, f), !0
                            } catch (c) {
                                return this.logger.log(a.ERROR, c.message), !1
                            }
                        }, r.prototype.getVariationFromExperimentRule = function(e, t, n, i, o) {
                            o === void 0 && (o = {});
                            var s = [],
                                f = this.findValidatedForcedDecision(e, i, t, n.key);
                            s.push.apply(s, f.reasons);
                            var c = f.result;
                            if (c) return {
                                result: c.key,
                                reasons: s
                            };
                            var p = this.getVariation(e, n, i, o);
                            return s.push.apply(s, p.reasons), {
                                result: p.result,
                                reasons: s
                            }
                        }, r.prototype.getVariationFromDeliveryRule = function(e, t, n, i, o) {
                            var s = [],
                                f = !1,
                                c = n[i],
                                p = this.findValidatedForcedDecision(e, o, t, c.key);
                            s.push.apply(s, p.reasons);
                            var T = p.result;
                            if (T) return {
                                result: T,
                                reasons: s,
                                skipToEveryoneElse: f
                            };
                            var S, F, Y, ne, ae, ie = o.getUserId(),
                                de = o.getAttributes(),
                                _e = this.getBucketingId(ie, de),
                                Ee = i === n.length - 1,
                                ge = Ee ? "Everyone Else" : i + 1,
                                Ae = null,
                                Ie = this.checkIfUserIsInAudience(e, c, U.RULE, de, ge);
                            return s.push.apply(s, Ie.reasons), Ie.result ? (this.logger.log(a.DEBUG, u.USER_MEETS_CONDITIONS_FOR_TARGETING_RULE, K, ie, ge), s.push([u.USER_MEETS_CONDITIONS_FOR_TARGETING_RULE, K, ie, ge]), F = this.buildBucketerParams(e, c, _e, ie), Y = Ze(F), s.push.apply(s, Y.reasons), (S = Y.result) && (ae = S, Ae = (ne = e).variationIdMap.hasOwnProperty(ae) ? ne.variationIdMap[ae] : null), Ae ? (this.logger.log(a.DEBUG, u.USER_BUCKETED_INTO_TARGETING_RULE, K, ie, ge), s.push([u.USER_BUCKETED_INTO_TARGETING_RULE, K, ie, ge])) : Ee || (this.logger.log(a.DEBUG, u.USER_NOT_BUCKETED_INTO_TARGETING_RULE, K, ie, ge), s.push([u.USER_NOT_BUCKETED_INTO_TARGETING_RULE, K, ie, ge]), f = !0)) : (this.logger.log(a.DEBUG, u.USER_DOESNT_MEET_CONDITIONS_FOR_TARGETING_RULE, K, ie, ge), s.push([u.USER_DOESNT_MEET_CONDITIONS_FOR_TARGETING_RULE, K, ie, ge])), {
                                result: Ae,
                                reasons: s,
                                skipToEveryoneElse: f
                            }
                        }, r
                    }();

                function ot(r, e) {
                    if (r.hasOwnProperty("revenue")) {
                        var t = r.revenue,
                            n = void 0;
                        return typeof t == "string" ? (n = parseInt(t), isNaN(n) ? (e.log(a.INFO, u.FAILED_TO_PARSE_REVENUE, "EVENT_TAG_UTILS", t), null) : (e.log(a.INFO, u.PARSED_REVENUE_VALUE, "EVENT_TAG_UTILS", n), n)) : typeof t == "number" ? (n = t, e.log(a.INFO, u.PARSED_REVENUE_VALUE, "EVENT_TAG_UTILS", n), n) : null
                    }
                    return null
                }
                l(ot, "Ke");

                function at(r, e) {
                    if (r.hasOwnProperty("value")) {
                        var t = r.value,
                            n = void 0;
                        return typeof t == "string" ? (n = parseFloat(t), isNaN(n) ? (e.log(a.INFO, u.FAILED_TO_PARSE_VALUE, "EVENT_TAG_UTILS", t), null) : (e.log(a.INFO, u.PARSED_NUMERIC_VALUE, "EVENT_TAG_UTILS", n), n)) : typeof t == "number" ? (n = t, e.log(a.INFO, u.PARSED_NUMERIC_VALUE, "EVENT_TAG_UTILS", n), n) : null
                    }
                    return null
                }
                l(at, "xe");

                function st(r, e) {
                    return typeof r == "string" && (typeof e == "string" || typeof e == "boolean" || B.isNumber(e) && B.isSafeInteger(e))
                }
                l(st, "Ge");
                var ut = "https://logx.optimizely.com/v1/events";

                function lt(r) {
                    var e = r.attributes,
                        t = r.userId,
                        n = r.clientEngine,
                        i = r.clientVersion,
                        o = r.configObj,
                        s = r.logger,
                        f = !!o.anonymizeIP && o.anonymizeIP,
                        c = o.botFiltering,
                        p = {
                            snapshots: [],
                            visitor_id: t,
                            attributes: []
                        },
                        T = {
                            account_id: o.accountId,
                            project_id: o.projectId,
                            visitors: [p],
                            revision: o.revision,
                            client_name: n,
                            client_version: i,
                            anonymize_ip: f,
                            enrich_decisions: !0
                        };
                    return e && Object.keys(e || {}).forEach(function(S) {
                        if (st(S, e[S])) {
                            var F = Pe(o, S, s);
                            F && T.visitors[0].attributes.push({
                                entity_id: F,
                                key: S,
                                type: "custom",
                                value: e[S]
                            })
                        }
                    }), typeof c == "boolean" && T.visitors[0].attributes.push({
                        entity_id: h.BOT_FILTERING,
                        key: h.BOT_FILTERING,
                        type: "custom",
                        value: c
                    }), T
                }
                l(lt, "je");

                function Ot(r) {
                    var e, t, n, i, o, s, f, c, p, T = lt(r),
                        S = (e = r.configObj, t = r.experimentId, n = r.variationId, i = r.ruleKey, o = r.ruleType, s = r.flagKey, f = r.enabled, c = t ? Be(e, t) : null, p = n ? oe(e, n) : null, {
                            decisions: [{
                                campaign_id: c,
                                experiment_id: t,
                                variation_id: n,
                                metadata: {
                                    flag_key: s,
                                    rule_key: i,
                                    rule_type: o,
                                    variation_key: p = p || "",
                                    enabled: f
                                }
                            }],
                            events: [{
                                entity_id: c,
                                timestamp: B.currentTimestamp(),
                                key: "campaign_activated",
                                uuid: B.uuid()
                            }]
                        });
                    return T.visitors[0].snapshots.push(S), {
                        httpVerb: "POST",
                        url: ut,
                        params: T
                    }
                }
                l(Ot, "Ye");

                function Rt(r) {
                    var e = lt(r),
                        t = function(n, i, o, s) {
                            var f = {
                                    events: []
                                },
                                c = {
                                    entity_id: z(n, i),
                                    timestamp: B.currentTimestamp(),
                                    uuid: B.uuid(),
                                    key: i
                                };
                            if (s) {
                                var p = ot(s, o);
                                p !== null && (c.revenue = p);
                                var T = at(s, o);
                                T !== null && (c.value = T), c.tags = s
                            }
                            return f.events.push(c), f
                        }(r.configObj, r.eventKey, r.logger, r.eventTags);
                    return e.visitors[0].snapshots = [t], {
                        httpVerb: "POST",
                        url: ut,
                        params: e
                    }
                }
                l(Rt, "He");

                function je(r) {
                    var e, t;
                    return (t = (e = r.experiment) === null || e === void 0 ? void 0 : e.key) !== null && t !== void 0 ? t : ""
                }
                l(je, "Xe");

                function Ke(r) {
                    var e, t;
                    return (t = (e = r.variation) === null || e === void 0 ? void 0 : e.key) !== null && t !== void 0 ? t : ""
                }
                l(Ke, "Je");

                function we(r) {
                    var e, t;
                    return (t = (e = r.variation) === null || e === void 0 ? void 0 : e.featureEnabled) !== null && t !== void 0 && t
                }
                l(we, "ze");

                function ct(r) {
                    var e, t;
                    return (t = (e = r.experiment) === null || e === void 0 ? void 0 : e.id) !== null && t !== void 0 ? t : null
                }
                l(ct, "Ze");

                function ft(r) {
                    var e, t;
                    return (t = (e = r.variation) === null || e === void 0 ? void 0 : e.id) !== null && t !== void 0 ? t : null
                }
                l(ft, "We");
                var Ge = (0, v.getLogger)("EVENT_BUILDER");

                function dt(r, e) {
                    var t = [];
                    return e && Object.keys(e || {}).forEach(function(n) {
                        if (st(n, e[n])) {
                            var i = Pe(r, n, Ge);
                            i && t.push({
                                entityId: i,
                                key: n,
                                value: e[n]
                            })
                        }
                    }), t
                }
                l(dt, "qe");
                var He = "USER_PROFILE_SERVICE_VALIDATOR",
                    Tt = function() {
                        function r(e) {
                            var t, n = this,
                                i = e.clientEngine;
                            i || (e.logger.log(a.INFO, u.INVALID_CLIENT_ENGINE, "OPTIMIZELY", i), i = "node-sdk"), this.clientEngine = i, this.clientVersion = e.clientVersion || "4.9.1", this.errorHandler = e.errorHandler, this.isOptimizelyConfigValid = e.isValidInstance, this.logger = e.logger;
                            var o = (t = e.defaultDecideOptions) !== null && t !== void 0 ? t : [];
                            Array.isArray(o) || (this.logger.log(a.DEBUG, u.INVALID_DEFAULT_DECIDE_OPTIONS, "OPTIMIZELY"), o = []);
                            var s = {};
                            o.forEach(function(S) {
                                w[S] ? s[S] = !0 : n.logger.log(a.WARNING, u.UNRECOGNIZED_DECIDE_OPTION, "OPTIMIZELY", S)
                            }), this.defaultDecideOptions = s, this.projectConfigManager = function(S) {
                                return new gt(S)
                            }({
                                datafile: e.datafile,
                                jsonSchemaValidator: e.jsonSchemaValidator,
                                sdkKey: e.sdkKey,
                                datafileManager: e.datafileManager
                            }), this.disposeOnUpdate = this.projectConfigManager.onUpdate(function(S) {
                                n.logger.log(a.INFO, u.UPDATED_OPTIMIZELY_CONFIG, "OPTIMIZELY", S.revision, S.projectId), n.notificationCenter.sendNotifications(_.OPTIMIZELY_CONFIG_UPDATE)
                            });
                            var f, c = this.projectConfigManager.onReady(),
                                p = null;
                            if (e.userProfileService) try {
                                (function(S) {
                                    if (typeof S == "object" && S !== null) {
                                        if (typeof S.lookup != "function") throw new Error((0, y.sprintf)(E.INVALID_USER_PROFILE_SERVICE, He, "Missing function 'lookup'"));
                                        if (typeof S.save != "function") throw new Error((0, y.sprintf)(E.INVALID_USER_PROFILE_SERVICE, He, "Missing function 'save'"));
                                        return !0
                                    }
                                    throw new Error((0, y.sprintf)(E.INVALID_USER_PROFILE_SERVICE, He))
                                })(e.userProfileService) && (p = e.userProfileService, this.logger.log(a.INFO, u.VALID_USER_PROFILE_SERVICE, "OPTIMIZELY"))
                            } catch (S) {
                                this.logger.log(a.WARNING, S.message)
                            }
                            this.decisionService = (f = {
                                userProfileService: p,
                                logger: this.logger,
                                UNSTABLE_conditionEvaluators: e.UNSTABLE_conditionEvaluators
                            }, new yt(f)), this.notificationCenter = e.notificationCenter, this.eventProcessor = e.eventProcessor;
                            var T = this.eventProcessor.start();
                            this.readyPromise = Promise.all([c, T]).then(function(S) {
                                return S[0]
                            }), this.readyTimeouts = {}, this.nextReadyTimeoutId = 0
                        }
                        return l(r, "e"), r.prototype.isValidInstance = function() {
                            return this.isOptimizelyConfigValid && !!this.projectConfigManager.getConfig()
                        }, r.prototype.activate = function(e, t, n) {
                            try {
                                if (!this.isValidInstance()) return this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "activate"), null;
                                if (!this.validateInputs({
                                        experiment_key: e,
                                        user_id: t
                                    }, n)) return this.notActivatingExperiment(e, t);
                                var i = this.projectConfigManager.getConfig();
                                if (!i) return null;
                                try {
                                    var o = this.getVariation(e, t, n);
                                    if (o === null) return this.notActivatingExperiment(e, t);
                                    if (! function(c, p) {
                                            return $(c, p) === "Running"
                                        }(i, e)) return this.logger.log(a.DEBUG, u.SHOULD_NOT_DISPATCH_ACTIVATE, "OPTIMIZELY", e), o;
                                    var s = ue(i, e),
                                        f = {
                                            experiment: s,
                                            variation: s.variationKeyMap[o],
                                            decisionSource: M.EXPERIMENT
                                        };
                                    return this.sendImpressionEvent(f, "", t, !0, n), o
                                } catch (c) {
                                    return this.logger.log(a.ERROR, c.message), this.logger.log(a.INFO, u.NOT_ACTIVATING_USER, "OPTIMIZELY", t, e), this.errorHandler.handleError(c), null
                                }
                            } catch (c) {
                                return this.logger.log(a.ERROR, c.message), this.errorHandler.handleError(c), null
                            }
                        }, r.prototype.sendImpressionEvent = function(e, t, n, i, o) {
                            var s = this.projectConfigManager.getConfig();
                            if (s) {
                                var f = function(c) {
                                    var p = c.configObj,
                                        T = c.decisionObj,
                                        S = c.userId,
                                        F = c.flagKey,
                                        Y = c.enabled,
                                        ne = c.userAttributes,
                                        ae = c.clientEngine,
                                        ie = c.clientVersion,
                                        de = T.decisionSource,
                                        _e = je(T),
                                        Ee = ct(T),
                                        ge = Ke(T),
                                        Ae = ft(T),
                                        Ie = Ee !== null ? Be(p, Ee) : null;
                                    return {
                                        type: "impression",
                                        timestamp: B.currentTimestamp(),
                                        uuid: B.uuid(),
                                        user: {
                                            id: S,
                                            attributes: dt(p, ne)
                                        },
                                        context: {
                                            accountId: p.accountId,
                                            projectId: p.projectId,
                                            revision: p.revision,
                                            clientName: ae,
                                            clientVersion: ie,
                                            anonymizeIP: p.anonymizeIP || !1,
                                            botFiltering: p.botFiltering
                                        },
                                        layer: {
                                            id: Ie
                                        },
                                        experiment: {
                                            id: Ee,
                                            key: _e
                                        },
                                        variation: {
                                            id: Ae,
                                            key: ge
                                        },
                                        ruleKey: _e,
                                        flagKey: F,
                                        ruleType: de,
                                        enabled: Y
                                    }
                                }({
                                    decisionObj: e,
                                    flagKey: t,
                                    enabled: i,
                                    userId: n,
                                    userAttributes: o,
                                    clientEngine: this.clientEngine,
                                    clientVersion: this.clientVersion,
                                    configObj: s
                                });
                                this.eventProcessor.process(f), this.emitNotificationCenterActivate(e, t, n, i, o)
                            }
                        }, r.prototype.emitNotificationCenterActivate = function(e, t, n, i, o) {
                            var s = this.projectConfigManager.getConfig();
                            if (s) {
                                var f, c = e.decisionSource,
                                    p = je(e),
                                    T = ct(e),
                                    S = Ke(e),
                                    F = ft(e);
                                T !== null && S !== "" && (f = s.experimentIdMap[T]);
                                var Y, ne = Ot({
                                    attributes: o,
                                    clientEngine: this.clientEngine,
                                    clientVersion: this.clientVersion,
                                    configObj: s,
                                    experimentId: T,
                                    ruleKey: p,
                                    flagKey: t,
                                    ruleType: c,
                                    userId: n,
                                    enabled: i,
                                    variationId: F,
                                    logger: this.logger
                                });
                                f && f.variationKeyMap && S !== "" && (Y = f.variationKeyMap[S]), this.notificationCenter.sendNotifications(_.ACTIVATE, {
                                    experiment: f,
                                    userId: n,
                                    attributes: o,
                                    variation: Y,
                                    logEvent: ne
                                })
                            }
                        }, r.prototype.track = function(e, t, n, i) {
                            try {
                                if (!this.isValidInstance()) return void this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "track");
                                if (!this.validateInputs({
                                        user_id: t,
                                        event_key: e
                                    }, n, i)) return;
                                var o = this.projectConfigManager.getConfig();
                                if (!o) return;
                                if (! function(f, c) {
                                        return f.eventKeyMap.hasOwnProperty(c)
                                    }(o, e)) return this.logger.log(a.WARNING, u.EVENT_KEY_NOT_FOUND, "OPTIMIZELY", e), void this.logger.log(a.WARNING, u.NOT_TRACKING_USER, "OPTIMIZELY", t);
                                var s = function(f) {
                                    var c = f.configObj,
                                        p = f.userId,
                                        T = f.userAttributes,
                                        S = f.clientEngine,
                                        F = f.clientVersion,
                                        Y = f.eventKey,
                                        ne = f.eventTags,
                                        ae = z(c, Y),
                                        ie = ne ? ot(ne, Ge) : null,
                                        de = ne ? at(ne, Ge) : null;
                                    return {
                                        type: "conversion",
                                        timestamp: B.currentTimestamp(),
                                        uuid: B.uuid(),
                                        user: {
                                            id: p,
                                            attributes: dt(c, T)
                                        },
                                        context: {
                                            accountId: c.accountId,
                                            projectId: c.projectId,
                                            revision: c.revision,
                                            clientName: S,
                                            clientVersion: F,
                                            anonymizeIP: c.anonymizeIP || !1,
                                            botFiltering: c.botFiltering
                                        },
                                        event: {
                                            id: ae,
                                            key: Y
                                        },
                                        revenue: ie,
                                        value: de,
                                        tags: ne
                                    }
                                }({
                                    eventKey: e,
                                    eventTags: i = this.filterEmptyValues(i),
                                    userId: t,
                                    userAttributes: n,
                                    clientEngine: this.clientEngine,
                                    clientVersion: this.clientVersion,
                                    configObj: o
                                });
                                this.logger.log(a.INFO, u.TRACK_EVENT, "OPTIMIZELY", e, t), this.eventProcessor.process(s), this.emitNotificationCenterTrack(e, t, n, i)
                            } catch (f) {
                                this.logger.log(a.ERROR, f.message), this.errorHandler.handleError(f), this.logger.log(a.ERROR, u.NOT_TRACKING_USER, "OPTIMIZELY", t)
                            }
                        }, r.prototype.emitNotificationCenterTrack = function(e, t, n, i) {
                            try {
                                var o = this.projectConfigManager.getConfig();
                                if (!o) return;
                                var s = Rt({
                                    attributes: n,
                                    clientEngine: this.clientEngine,
                                    clientVersion: this.clientVersion,
                                    configObj: o,
                                    eventKey: e,
                                    eventTags: i,
                                    logger: this.logger,
                                    userId: t
                                });
                                this.notificationCenter.sendNotifications(_.TRACK, {
                                    eventKey: e,
                                    userId: t,
                                    attributes: n,
                                    eventTags: i,
                                    logEvent: s
                                })
                            } catch (f) {
                                this.logger.log(a.ERROR, f.message), this.errorHandler.handleError(f)
                            }
                        }, r.prototype.getVariation = function(e, t, n) {
                            try {
                                if (!this.isValidInstance()) return this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getVariation"), null;
                                try {
                                    if (!this.validateInputs({
                                            experiment_key: e,
                                            user_id: t
                                        }, n)) return null;
                                    var i = this.projectConfigManager.getConfig();
                                    if (!i) return null;
                                    var o = i.experimentKeyMap[e];
                                    if (!o) return this.logger.log(a.DEBUG, E.INVALID_EXPERIMENT_KEY, "OPTIMIZELY", e), null;
                                    var s = this.decisionService.getVariation(i, o, this.createUserContext(t, n)).result,
                                        f = (c = i, p = o.id, c.experimentFeatureMap.hasOwnProperty(p) ? d.FEATURE_TEST : d.AB_TEST);
                                    return this.notificationCenter.sendNotifications(_.DECISION, {
                                        type: f,
                                        userId: t,
                                        attributes: n || {},
                                        decisionInfo: {
                                            experimentKey: e,
                                            variationKey: s
                                        }
                                    }), s
                                } catch (T) {
                                    return this.logger.log(a.ERROR, T.message), this.errorHandler.handleError(T), null
                                }
                            } catch (T) {
                                return this.logger.log(a.ERROR, T.message), this.errorHandler.handleError(T), null
                            }
                            var c, p
                        }, r.prototype.setForcedVariation = function(e, t, n) {
                            if (!this.validateInputs({
                                    experiment_key: e,
                                    user_id: t
                                })) return !1;
                            var i = this.projectConfigManager.getConfig();
                            if (!i) return !1;
                            try {
                                return this.decisionService.setForcedVariation(i, e, t, n)
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), !1
                            }
                        }, r.prototype.getForcedVariation = function(e, t) {
                            if (!this.validateInputs({
                                    experiment_key: e,
                                    user_id: t
                                })) return null;
                            var n = this.projectConfigManager.getConfig();
                            if (!n) return null;
                            try {
                                return this.decisionService.getForcedVariation(n, e, t).result
                            } catch (i) {
                                return this.logger.log(a.ERROR, i.message), this.errorHandler.handleError(i), null
                            }
                        }, r.prototype.validateInputs = function(e, t, n) {
                            try {
                                if (e.hasOwnProperty("user_id")) {
                                    var i = e.user_id;
                                    if (typeof i != "string" || i === null || i === "undefined") throw new Error((0, y.sprintf)(E.INVALID_INPUT_FORMAT, "OPTIMIZELY", "user_id"));
                                    delete e.user_id
                                }
                                return Object.keys(e).forEach(function(o) {
                                    if (!it(e[o])) throw new Error((0, y.sprintf)(E.INVALID_INPUT_FORMAT, "OPTIMIZELY", o))
                                }), t && function(o) {
                                    if (typeof o != "object" || Array.isArray(o) || o === null) throw new Error((0, y.sprintf)(E.INVALID_ATTRIBUTES, "ATTRIBUTES_VALIDATOR"));
                                    Object.keys(o).forEach(function(s) {
                                        if (o[s] === void 0) throw new Error((0, y.sprintf)(E.UNDEFINED_ATTRIBUTE, "ATTRIBUTES_VALIDATOR", s))
                                    })
                                }(t), n && function(o) {
                                    if (typeof o != "object" || Array.isArray(o) || o === null) throw new Error((0, y.sprintf)(E.INVALID_EVENT_TAGS, "EVENT_TAGS_VALIDATOR"))
                                }(n), !0
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), !1
                            }
                        }, r.prototype.notActivatingExperiment = function(e, t) {
                            return this.logger.log(a.INFO, u.NOT_ACTIVATING_USER, "OPTIMIZELY", t, e), null
                        }, r.prototype.filterEmptyValues = function(e) {
                            for (var t in e) !e.hasOwnProperty(t) || e[t] !== null && e[t] !== void 0 || delete e[t];
                            return e
                        }, r.prototype.isFeatureEnabled = function(e, t, n) {
                            try {
                                if (!this.isValidInstance()) return this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "isFeatureEnabled"), !1;
                                if (!this.validateInputs({
                                        feature_key: e,
                                        user_id: t
                                    }, n)) return !1;
                                var i = this.projectConfigManager.getConfig();
                                if (!i) return !1;
                                var o = Ue(i, e, this.logger);
                                if (!o) return !1;
                                var s = {},
                                    f = this.createUserContext(t, n),
                                    c = this.decisionService.getVariationForFeature(i, o, f).result,
                                    p = c.decisionSource,
                                    T = je(c),
                                    S = Ke(c),
                                    F = we(c);
                                p === M.FEATURE_TEST && (s = {
                                    experimentKey: T,
                                    variationKey: S
                                }), (p === M.FEATURE_TEST || p === M.ROLLOUT && Je(i)) && this.sendImpressionEvent(c, o.key, t, F, n), F === !0 ? this.logger.log(a.INFO, u.FEATURE_ENABLED_FOR_USER, "OPTIMIZELY", e, t) : (this.logger.log(a.INFO, u.FEATURE_NOT_ENABLED_FOR_USER, "OPTIMIZELY", e, t), F = !1);
                                var Y = {
                                    featureKey: e,
                                    featureEnabled: F,
                                    source: c.decisionSource,
                                    sourceInfo: s
                                };
                                return this.notificationCenter.sendNotifications(_.DECISION, {
                                    type: d.FEATURE,
                                    userId: t,
                                    attributes: n || {},
                                    decisionInfo: Y
                                }), F
                            } catch (ne) {
                                return this.logger.log(a.ERROR, ne.message), this.errorHandler.handleError(ne), !1
                            }
                        }, r.prototype.getEnabledFeatures = function(e, t) {
                            var n = this;
                            try {
                                var i = [];
                                if (!this.isValidInstance()) return this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getEnabledFeatures"), i;
                                if (!this.validateInputs({
                                        user_id: e
                                    })) return i;
                                var o = this.projectConfigManager.getConfig();
                                return o && (0, y.objectValues)(o.featureKeyMap).forEach(function(s) {
                                    n.isFeatureEnabled(s.key, e, t) && i.push(s.key)
                                }), i
                            } catch (s) {
                                return this.logger.log(a.ERROR, s.message), this.errorHandler.handleError(s), []
                            }
                        }, r.prototype.getFeatureVariable = function(e, t, n, i) {
                            try {
                                return this.isValidInstance() ? this.getFeatureVariableForType(e, t, null, n, i) : (this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getFeatureVariable"), null)
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), null
                            }
                        }, r.prototype.getFeatureVariableForType = function(e, t, n, i, o) {
                            if (!this.validateInputs({
                                    feature_key: e,
                                    variable_key: t,
                                    user_id: i
                                }, o)) return null;
                            var s = this.projectConfigManager.getConfig();
                            if (!s) return null;
                            var f = Ue(s, e, this.logger);
                            if (!f) return null;
                            var c = function(ne, ae, ie, de) {
                                var _e = ne.featureKeyMap[ae];
                                if (!_e) return de.log(a.ERROR, E.FEATURE_NOT_IN_DATAFILE, re, ae), null;
                                var Ee = _e.variableKeyMap[ie];
                                return Ee || (de.log(a.ERROR, E.VARIABLE_KEY_NOT_IN_DATAFILE, re, ie, ae), null)
                            }(s, e, t, this.logger);
                            if (!c) return null;
                            if (n && c.type !== n) return this.logger.log(a.WARNING, u.VARIABLE_REQUESTED_WITH_WRONG_TYPE, "OPTIMIZELY", n, c.type), null;
                            var p = this.createUserContext(i, o),
                                T = this.decisionService.getVariationForFeature(s, f, p).result,
                                S = we(T),
                                F = this.getFeatureVariableValueFromVariation(e, S, T.variation, c, i),
                                Y = {};
                            return T.decisionSource === M.FEATURE_TEST && T.experiment !== null && T.variation !== null && (Y = {
                                experimentKey: T.experiment.key,
                                variationKey: T.variation.key
                            }), this.notificationCenter.sendNotifications(_.DECISION, {
                                type: d.FEATURE_VARIABLE,
                                userId: i,
                                attributes: o || {},
                                decisionInfo: {
                                    featureKey: e,
                                    featureEnabled: S,
                                    source: T.decisionSource,
                                    variableKey: t,
                                    variableValue: F,
                                    variableType: c.type,
                                    sourceInfo: Y
                                }
                            }), F
                        }, r.prototype.getFeatureVariableValueFromVariation = function(e, t, n, i, o) {
                            var s = this.projectConfigManager.getConfig();
                            if (!s) return null;
                            var f = i.defaultValue;
                            if (n !== null) {
                                var c = function(p, T, S, F) {
                                    if (!T || !S) return null;
                                    if (!p.variationVariableUsageMap.hasOwnProperty(S.id)) return F.log(a.ERROR, E.VARIATION_ID_NOT_IN_DATAFILE_NO_EXPERIMENT, re, S.id), null;
                                    var Y = p.variationVariableUsageMap[S.id][T.id];
                                    return Y ? Y.value : null
                                }(s, i, n, this.logger);
                                c !== null ? t ? (f = c, this.logger.log(a.INFO, u.USER_RECEIVED_VARIABLE_VALUE, "OPTIMIZELY", f, i.key, e)) : this.logger.log(a.INFO, u.FEATURE_NOT_ENABLED_RETURN_DEFAULT_VARIABLE_VALUE, "OPTIMIZELY", e, o, f) : this.logger.log(a.INFO, u.VARIABLE_NOT_USED_RETURN_DEFAULT_VARIABLE_VALUE, "OPTIMIZELY", i.key, n.key)
                            } else this.logger.log(a.INFO, u.USER_RECEIVED_DEFAULT_VARIABLE_VALUE, "OPTIMIZELY", o, i.key, e);
                            return function(p, T, S) {
                                var F;
                                switch (T) {
                                    case m.BOOLEAN:
                                        p !== "true" && p !== "false" ? (S.log(a.ERROR, E.UNABLE_TO_CAST_VALUE, re, p, T), F = null) : F = p === "true";
                                        break;
                                    case m.INTEGER:
                                        F = parseInt(p, 10), isNaN(F) && (S.log(a.ERROR, E.UNABLE_TO_CAST_VALUE, re, p, T), F = null);
                                        break;
                                    case m.DOUBLE:
                                        F = parseFloat(p), isNaN(F) && (S.log(a.ERROR, E.UNABLE_TO_CAST_VALUE, re, p, T), F = null);
                                        break;
                                    case m.JSON:
                                        try {
                                            F = JSON.parse(p)
                                        } catch {
                                            S.log(a.ERROR, E.UNABLE_TO_CAST_VALUE, re, p, T), F = null
                                        }
                                        break;
                                    default:
                                        F = p
                                }
                                return F
                            }(f, i.type, this.logger)
                        }, r.prototype.getFeatureVariableBoolean = function(e, t, n, i) {
                            try {
                                return this.isValidInstance() ? this.getFeatureVariableForType(e, t, m.BOOLEAN, n, i) : (this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getFeatureVariableBoolean"), null)
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), null
                            }
                        }, r.prototype.getFeatureVariableDouble = function(e, t, n, i) {
                            try {
                                return this.isValidInstance() ? this.getFeatureVariableForType(e, t, m.DOUBLE, n, i) : (this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getFeatureVariableDouble"), null)
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), null
                            }
                        }, r.prototype.getFeatureVariableInteger = function(e, t, n, i) {
                            try {
                                return this.isValidInstance() ? this.getFeatureVariableForType(e, t, m.INTEGER, n, i) : (this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getFeatureVariableInteger"), null)
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), null
                            }
                        }, r.prototype.getFeatureVariableString = function(e, t, n, i) {
                            try {
                                return this.isValidInstance() ? this.getFeatureVariableForType(e, t, m.STRING, n, i) : (this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getFeatureVariableString"), null)
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), null
                            }
                        }, r.prototype.getFeatureVariableJSON = function(e, t, n, i) {
                            try {
                                return this.isValidInstance() ? this.getFeatureVariableForType(e, t, m.JSON, n, i) : (this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getFeatureVariableJSON"), null)
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), null
                            }
                        }, r.prototype.getAllFeatureVariables = function(e, t, n) {
                            var i = this;
                            try {
                                if (!this.isValidInstance()) return this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "getAllFeatureVariables"), null;
                                if (!this.validateInputs({
                                        feature_key: e,
                                        user_id: t
                                    }, n)) return null;
                                var o = this.projectConfigManager.getConfig();
                                if (!o) return null;
                                var s = Ue(o, e, this.logger);
                                if (!s) return null;
                                var f = this.createUserContext(t, n),
                                    c = this.decisionService.getVariationForFeature(o, s, f).result,
                                    p = we(c),
                                    T = {};
                                s.variables.forEach(function(F) {
                                    T[F.key] = i.getFeatureVariableValueFromVariation(e, p, c.variation, F, t)
                                });
                                var S = {};
                                return c.decisionSource === M.FEATURE_TEST && c.experiment !== null && c.variation !== null && (S = {
                                    experimentKey: c.experiment.key,
                                    variationKey: c.variation.key
                                }), this.notificationCenter.sendNotifications(_.DECISION, {
                                    type: d.ALL_FEATURE_VARIABLES,
                                    userId: t,
                                    attributes: n || {},
                                    decisionInfo: {
                                        featureKey: e,
                                        featureEnabled: p,
                                        source: c.decisionSource,
                                        variableValues: T,
                                        sourceInfo: S
                                    }
                                }), T
                            } catch (F) {
                                return this.logger.log(a.ERROR, F.message), this.errorHandler.handleError(F), null
                            }
                        }, r.prototype.getOptimizelyConfig = function() {
                            try {
                                return this.projectConfigManager.getConfig() ? this.projectConfigManager.getOptimizelyConfig() : null
                            } catch (e) {
                                return this.logger.log(a.ERROR, e.message), this.errorHandler.handleError(e), null
                            }
                        }, r.prototype.close = function() {
                            var e = this;
                            try {
                                var t = this.eventProcessor.stop();
                                return this.disposeOnUpdate && (this.disposeOnUpdate(), this.disposeOnUpdate = null), this.projectConfigManager && this.projectConfigManager.stop(), Object.keys(this.readyTimeouts).forEach(function(n) {
                                    var i = e.readyTimeouts[n];
                                    clearTimeout(i.readyTimeout), i.onClose()
                                }), this.readyTimeouts = {}, t.then(function() {
                                    return {
                                        success: !0
                                    }
                                }, function(n) {
                                    return {
                                        success: !1,
                                        reason: String(n)
                                    }
                                })
                            } catch (n) {
                                return this.logger.log(a.ERROR, n.message), this.errorHandler.handleError(n), Promise.resolve({
                                    success: !1,
                                    reason: String(n)
                                })
                            }
                        }, r.prototype.onReady = function(e) {
                            var t, n, i = this;
                            typeof e == "object" && e !== null && e.timeout !== void 0 && (t = e.timeout), B.isSafeInteger(t) || (t = 3e4);
                            var o = new Promise(function(c) {
                                    n = c
                                }),
                                s = this.nextReadyTimeoutId;
                            this.nextReadyTimeoutId++;
                            var f = setTimeout(function() {
                                delete i.readyTimeouts[s], n({
                                    success: !1,
                                    reason: (0, y.sprintf)("onReady timeout expired after %s ms", t)
                                })
                            }, t);
                            return this.readyTimeouts[s] = {
                                readyTimeout: f,
                                onClose: function() {
                                    n({
                                        success: !1,
                                        reason: "Instance closed"
                                    })
                                }
                            }, this.readyPromise.then(function() {
                                clearTimeout(f), delete i.readyTimeouts[s], n({
                                    success: !0
                                })
                            }), Promise.race([this.readyPromise, o])
                        }, r.prototype.createUserContext = function(e, t) {
                            return this.validateInputs({
                                user_id: e
                            }, t) ? new Q({
                                optimizely: this,
                                userId: e,
                                attributes: t
                            }) : null
                        }, r.prototype.decide = function(e, t, n) {
                            var i, o, s, f, c = this;
                            n === void 0 && (n = []);
                            var p, T = e.getUserId(),
                                S = e.getAttributes(),
                                F = this.projectConfigManager.getConfig(),
                                Y = [];
                            if (!this.isValidInstance() || !F) return this.logger.log(a.INFO, u.INVALID_OBJECT, "OPTIMIZELY", "decide"), H(t, e, [k.SDK_NOT_READY]);
                            var ne = F.featureKeyMap[t];
                            if (!ne) return this.logger.log(a.ERROR, E.FEATURE_NOT_IN_DATAFILE, "OPTIMIZELY", t), H(t, e, [(0, y.sprintf)(k.FLAG_KEY_INVALID, t)]);
                            var ae = this.getAllDecideOptions(n),
                                ie = this.decisionService.findValidatedForcedDecision(F, e, t);
                            Y.push.apply(Y, ie.reasons);
                            var de = ie.result;
                            if (de) p = {
                                experiment: null,
                                variation: de,
                                decisionSource: M.FEATURE_TEST
                            };
                            else {
                                var _e = this.decisionService.getVariationForFeature(F, ne, e, ae);
                                Y.push.apply(Y, _e.reasons), p = _e.result
                            }
                            var Ee = p.decisionSource,
                                ge = (o = (i = p.experiment) === null || i === void 0 ? void 0 : i.key) !== null && o !== void 0 ? o : null,
                                Ae = (f = (s = p.variation) === null || s === void 0 ? void 0 : s.key) !== null && f !== void 0 ? f : null,
                                Ie = we(p);
                            Ie === !0 ? this.logger.log(a.INFO, u.FEATURE_ENABLED_FOR_USER, "OPTIMIZELY", t, T) : this.logger.log(a.INFO, u.FEATURE_NOT_ENABLED_FOR_USER, "OPTIMIZELY", t, T);
                            var ze = {},
                                Et = !1;
                            ae[w.EXCLUDE_VARIABLES] || ne.variables.forEach(function(Ce) {
                                ze[Ce.key] = c.getFeatureVariableValueFromVariation(t, Ie, p.variation, Ce, T)
                            }), !ae[w.DISABLE_DECISION_EVENT] && (Ee === M.FEATURE_TEST || Ee === M.ROLLOUT && Je(F)) && (this.sendImpressionEvent(p, t, T, Ie, S), Et = !0);
                            var Xe = [];
                            ae[w.INCLUDE_REASONS] && (Xe = Y.map(function(Ce) {
                                return y.sprintf.apply(void 0, P([Ce[0]], Ce.slice(1)))
                            }));
                            var Pt = {
                                flagKey: t,
                                enabled: Ie,
                                variationKey: Ae,
                                ruleKey: ge,
                                variables: ze,
                                reasons: Xe,
                                decisionEventDispatched: Et
                            };
                            return this.notificationCenter.sendNotifications(_.DECISION, {
                                type: d.FLAG,
                                userId: T,
                                attributes: S,
                                decisionInfo: Pt
                            }), {
                                variationKey: Ae,
                                enabled: Ie,
                                variables: ze,
                                ruleKey: ge,
                                flagKey: t,
                                userContext: e,
                                reasons: Xe
                            }
                        }, r.prototype.getAllDecideOptions = function(e) {
                            var t = this,
                                n = I({}, this.defaultDecideOptions);
                            return Array.isArray(e) ? e.forEach(function(i) {
                                w[i] ? n[i] = !0 : t.logger.log(a.WARNING, u.UNRECOGNIZED_DECIDE_OPTION, "OPTIMIZELY", i)
                            }) : this.logger.log(a.DEBUG, u.INVALID_DECIDE_OPTIONS, "OPTIMIZELY"), n
                        }, r.prototype.decideForKeys = function(e, t, n) {
                            var i = this;
                            n === void 0 && (n = []);
                            var o = {};
                            if (!this.isValidInstance()) return this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "decideForKeys"), o;
                            if (t.length === 0) return o;
                            var s = this.getAllDecideOptions(n);
                            return t.forEach(function(f) {
                                var c = i.decide(e, f, n);
                                s[w.ENABLED_FLAGS_ONLY] && !c.enabled || (o[f] = c)
                            }), o
                        }, r.prototype.decideAll = function(e, t) {
                            t === void 0 && (t = []);
                            var n = this.projectConfigManager.getConfig();
                            if (!this.isValidInstance() || !n) return this.logger.log(a.ERROR, u.INVALID_OBJECT, "OPTIMIZELY", "decideAll"), {};
                            var i = Object.keys(n.featureKeyMap);
                            return this.decideForKeys(e, i, t)
                        }, r
                    }(),
                    Nt = l(function(r) {
                        return !(typeof r != "number" || !B.isSafeInteger(r)) && r >= 1
                    }, "tt"),
                    mt = l(function(r) {
                        return !(typeof r != "number" || !B.isSafeInteger(r)) && r > 0
                    }, "rt"),
                    At = function() {
                        function r(e) {
                            var t = this;
                            this.logger = e.logger, this.errorHandler = e.errorHandler, this.notificationListeners = {}, (0, y.objectValues)(_).forEach(function(n) {
                                t.notificationListeners[n] = []
                            }), this.listenerId = 1
                        }
                        return l(r, "e"), r.prototype.addNotificationListener = function(e, t) {
                            try {
                                if (!((0, y.objectValues)(_).indexOf(e) > -1)) return -1;
                                this.notificationListeners[e] || (this.notificationListeners[e] = []);
                                var n = !1;
                                if ((this.notificationListeners[e] || []).forEach(function(o) {
                                        o.callback !== t || (n = !0)
                                    }), n) return -1;
                                this.notificationListeners[e].push({
                                    id: this.listenerId,
                                    callback: t
                                });
                                var i = this.listenerId;
                                return this.listenerId += 1, i
                            } catch (o) {
                                return this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o), -1
                            }
                        }, r.prototype.removeNotificationListener = function(e) {
                            var t = this;
                            try {
                                var n, i;
                                if (Object.keys(this.notificationListeners).some(function(o) {
                                        return (t.notificationListeners[o] || []).every(function(s, f) {
                                            return s.id !== e || (n = f, i = o, !1)
                                        }), n !== void 0 && i !== void 0
                                    }), n !== void 0 && i !== void 0) return this.notificationListeners[i].splice(n, 1), !0
                            } catch (o) {
                                this.logger.log(a.ERROR, o.message), this.errorHandler.handleError(o)
                            }
                            return !1
                        }, r.prototype.clearAllNotificationListeners = function() {
                            var e = this;
                            try {
                                (0, y.objectValues)(_).forEach(function(t) {
                                    e.notificationListeners[t] = []
                                })
                            } catch (t) {
                                this.logger.log(a.ERROR, t.message), this.errorHandler.handleError(t)
                            }
                        }, r.prototype.clearNotificationListeners = function(e) {
                            try {
                                this.notificationListeners[e] = []
                            } catch (t) {
                                this.logger.log(a.ERROR, t.message), this.errorHandler.handleError(t)
                            }
                        }, r.prototype.sendNotifications = function(e, t) {
                            var n = this;
                            try {
                                (this.notificationListeners[e] || []).forEach(function(i) {
                                    var o = i.callback;
                                    try {
                                        o(t)
                                    } catch (s) {
                                        n.logger.log(a.ERROR, u.NOTIFICATION_LISTENER_EXCEPTION, "NOTIFICATION_CENTER", e, s.message)
                                    }
                                })
                            } catch (i) {
                                this.logger.log(a.ERROR, i.message), this.errorHandler.handleError(i)
                            }
                        }, r
                    }(),
                    Lt = {
                        createEventProcessor: function() {
                            for (var r = [], e = 0; e < arguments.length; e++) r[e] = arguments[e];
                            return new(C.LogTierV1EventProcessor.bind.apply(C.LogTierV1EventProcessor, P([void 0], r)))
                        },
                        LocalStoragePendingEventsDispatcher: C.LocalStoragePendingEventsDispatcher
                    };

                function St(r, e, t, n) {
                    var i = {
                        sdkKey: r
                    };
                    if ((n === void 0 || typeof n == "object" && n !== null) && B.assign(i, n), t) {
                        var o = We({
                                datafile: t,
                                jsonSchemaValidator: void 0,
                                logger: e
                            }),
                            s = o.configObj,
                            f = o.error;
                        f && e.error(f), s && (i.datafile = Te(s))
                    }
                    return new R.z(i)
                }
                l(St, "ot");
                var me = (0, v.getLogger)();
                (0, v.setLogHandler)(x()), (0, v.setLogLevel)(v.LogLevel.INFO);
                var Ye = !1,
                    Dt = l(function(r) {
                        try {
                            r.errorHandler && (0, v.setErrorHandler)(r.errorHandler), r.logger && ((0, v.setLogHandler)(r.logger), (0, v.setLogLevel)(v.LogLevel.NOTSET)), r.logLevel !== void 0 && (0, v.setLogLevel)(r.logLevel);
                            try {
                                ve(r), r.isValidInstance = !0
                            } catch (T) {
                                me.error(T), r.isValidInstance = !1
                            }
                            var e = void 0;
                            r.eventDispatcher == null ? (e = new C.LocalStoragePendingEventsDispatcher({
                                eventDispatcher: b
                            }), Ye || (e.sendPendingEvents(), Ye = !0)) : e = r.eventDispatcher;
                            var t = r.eventBatchSize,
                                n = r.eventFlushInterval;
                            Nt(r.eventBatchSize) || (me.warn("Invalid eventBatchSize %s, defaulting to %s", r.eventBatchSize, 10), t = 10), mt(r.eventFlushInterval) || (me.warn("Invalid eventFlushInterval %s, defaulting to %s", r.eventFlushInterval, 1e3), n = 1e3);
                            var i = (0, v.getErrorHandler)(),
                                o = new At({
                                    logger: me,
                                    errorHandler: i
                                }),
                                s = {
                                    dispatcher: e,
                                    flushInterval: n,
                                    batchSize: t,
                                    maxQueueSize: r.eventMaxQueueSize || 1e4,
                                    notificationCenter: o
                                },
                                f = I(I({
                                    clientEngine: "javascript-sdk"
                                }, r), {
                                    eventProcessor: Lt.createEventProcessor(s),
                                    logger: me,
                                    errorHandler: i,
                                    datafileManager: r.sdkKey ? St(r.sdkKey, me, r.datafile, r.datafileOptions) : void 0,
                                    notificationCenter: o
                                }),
                                c = new Tt(f);
                            try {
                                if (typeof window.addEventListener == "function") {
                                    var p = "onpagehide" in window ? "pagehide" : "unload";
                                    window.addEventListener(p, function() {
                                        c.close()
                                    }, !1)
                                }
                            } catch (T) {
                                me.error(u.UNABLE_TO_ATTACH_UNLOAD, "INDEX_BROWSER", T.message)
                            }
                            return c
                        } catch (T) {
                            return me.error(T), null
                        }
                    }, "ut"),
                    Ut = l(function() {
                        Ye = !1
                    }, "lt"),
                    bt = {
                        logging: X,
                        errorHandler: Le,
                        eventDispatcher: b,
                        enums: q,
                        setLogger: v.setLogHandler,
                        setLogLevel: v.setLogLevel,
                        createInstance: Dt,
                        __internalResetRetryState: Ut,
                        OptimizelyDecideOption: w
                    };
                const Ct = bt
            },
            59753: (W, g, L) => {
                "use strict";
                L.d(g, {
                    f: () => Oe,
                    on: () => ye
                });

                function v() {
                    if (!(this instanceof v)) return new v;
                    this.size = 0, this.uid = 0, this.selectors = [], this.selectorObjects = {}, this.indexes = Object.create(this.indexes), this.activeIndexes = []
                }
                l(v, "SelectorSet");
                var V = window.document.documentElement,
                    C = V.matches || V.webkitMatchesSelector || V.mozMatchesSelector || V.oMatchesSelector || V.msMatchesSelector;
                v.prototype.matchesSelector = function(b, j) {
                    return C.call(b, j)
                }, v.prototype.querySelectorAll = function(b, j) {
                    return j.querySelectorAll(b)
                }, v.prototype.indexes = [];
                var N = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                v.prototype.indexes.push({
                    name: "ID",
                    selector: l(function(j) {
                        var x;
                        if (x = j.match(N)) return x[0].slice(1)
                    }, "matchIdSelector"),
                    element: l(function(j) {
                        if (j.id) return [j.id]
                    }, "getElementId")
                });
                var y = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                v.prototype.indexes.push({
                    name: "CLASS",
                    selector: l(function(j) {
                        var x;
                        if (x = j.match(y)) return x[0].slice(1)
                    }, "matchClassSelector"),
                    element: l(function(j) {
                        var x = j.className;
                        if (x) {
                            if (typeof x == "string") return x.split(/\s/);
                            if (typeof x == "object" && "baseVal" in x) return x.baseVal.split(/\s/)
                        }
                    }, "getElementClassNames")
                });
                var O = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
                v.prototype.indexes.push({
                    name: "TAG",
                    selector: l(function(j) {
                        var x;
                        if (x = j.match(O)) return x[0].toUpperCase()
                    }, "matchTagSelector"),
                    element: l(function(j) {
                        return [j.nodeName.toUpperCase()]
                    }, "getElementTagName")
                }), v.prototype.indexes.default = {
                    name: "UNIVERSAL",
                    selector: function() {
                        return !0
                    },
                    element: function() {
                        return [!0]
                    }
                };
                var A;
                typeof window.Map == "function" ? A = window.Map : A = function() {
                    function b() {
                        this.map = {}
                    }
                    return l(b, "Map"), b.prototype.get = function(j) {
                        return this.map[j + " "]
                    }, b.prototype.set = function(j, x) {
                        this.map[j + " "] = x
                    }, b
                }();
                var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

                function I(b, j) {
                    b = b.slice(0).concat(b.default);
                    var x = b.length,
                        G, w, X, H, Q = j,
                        J, Z, ee = [];
                    do
                        if (R.exec(""), (X = R.exec(Q)) && (Q = X[3], X[2] || !Q)) {
                            for (G = 0; G < x; G++)
                                if (Z = b[G], J = Z.selector(X[1])) {
                                    for (w = ee.length, H = !1; w--;)
                                        if (ee[w].index === Z && ee[w].key === J) {
                                            H = !0;
                                            break
                                        }
                                    H || ee.push({
                                        index: Z,
                                        key: J
                                    });
                                    break
                                }
                        }
                    while (X);
                    return ee
                }
                l(I, "parseSelectorIndexes");

                function P(b, j) {
                    var x, G, w;
                    for (x = 0, G = b.length; x < G; x++)
                        if (w = b[x], j.isPrototypeOf(w)) return w
                }
                l(P, "findByPrototype"), v.prototype.logDefaultIndexUsed = function() {}, v.prototype.add = function(b, j) {
                    var x, G, w, X, H, Q, J, Z, ee = this.activeIndexes,
                        se = this.selectors,
                        B = this.selectorObjects;
                    if (typeof b == "string") {
                        for (x = {
                                id: this.uid++,
                                selector: b,
                                data: j
                            }, B[x.id] = x, J = I(this.indexes, b), G = 0; G < J.length; G++) Z = J[G], X = Z.key, w = Z.index, H = P(ee, w), H || (H = Object.create(w), H.map = new A, ee.push(H)), w === this.indexes.default && this.logDefaultIndexUsed(x), Q = H.map.get(X), Q || (Q = [], H.map.set(X, Q)), Q.push(x);
                        this.size++, se.push(b)
                    }
                }, v.prototype.remove = function(b, j) {
                    if (typeof b == "string") {
                        var x, G, w, X, H, Q, J, Z, ee = this.activeIndexes,
                            se = this.selectors = [],
                            B = this.selectorObjects,
                            re = {},
                            Re = arguments.length === 1;
                        for (x = I(this.indexes, b), w = 0; w < x.length; w++)
                            for (G = x[w], X = ee.length; X--;)
                                if (Q = ee[X], G.index.isPrototypeOf(Q)) {
                                    if (J = Q.map.get(G.key), J)
                                        for (H = J.length; H--;) Z = J[H], Z.selector === b && (Re || Z.data === j) && (J.splice(H, 1), re[Z.id] = !0);
                                    break
                                }
                        for (w in re) delete B[w], this.size--;
                        for (w in B) se.push(B[w].selector)
                    }
                };

                function a(b, j) {
                    return b.id - j.id
                }
                l(a, "sortById"), v.prototype.queryAll = function(b) {
                    if (!this.selectors.length) return [];
                    var j = {},
                        x = [],
                        G = this.querySelectorAll(this.selectors.join(", "), b),
                        w, X, H, Q, J, Z, ee, se;
                    for (w = 0, H = G.length; w < H; w++)
                        for (J = G[w], Z = this.matches(J), X = 0, Q = Z.length; X < Q; X++) se = Z[X], j[se.id] ? ee = j[se.id] : (ee = {
                            id: se.id,
                            selector: se.selector,
                            data: se.data,
                            elements: []
                        }, j[se.id] = ee, x.push(ee)), ee.elements.push(J);
                    return x.sort(a)
                }, v.prototype.matches = function(b) {
                    if (!b) return [];
                    var j, x, G, w, X, H, Q, J, Z, ee, se, B = this.activeIndexes,
                        re = {},
                        Re = [];
                    for (j = 0, w = B.length; j < w; j++)
                        if (Q = B[j], J = Q.element(b), J) {
                            for (x = 0, X = J.length; x < X; x++)
                                if (Z = Q.map.get(J[x]))
                                    for (G = 0, H = Z.length; G < H; G++) ee = Z[G], se = ee.id, !re[se] && this.matchesSelector(b, ee.selector) && (re[se] = !0, Re.push(ee))
                        }
                    return Re.sort(a)
                };
                var E = {},
                    u = {},
                    h = new WeakMap,
                    _ = new WeakMap,
                    d = new WeakMap,
                    M = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");

                function U(b, j, x) {
                    var G = b[j];
                    return b[j] = function() {
                        return x.apply(b, arguments), G.apply(b, arguments)
                    }, b
                }
                l(U, "before");

                function m(b, j, x) {
                    var G = [],
                        w = j;
                    do {
                        if (w.nodeType !== 1) break;
                        var X = b.matches(w);
                        if (X.length) {
                            var H = {
                                node: w,
                                observers: X
                            };
                            x ? G.unshift(H) : G.push(H)
                        }
                    } while (w = w.parentElement);
                    return G
                }
                l(m, "dist_matches");

                function D() {
                    h.set(this, !0)
                }
                l(D, "trackPropagation");

                function k() {
                    h.set(this, !0), _.set(this, !0)
                }
                l(k, "trackImmediate");

                function q() {
                    return d.get(this) || null
                }
                l(q, "getCurrentTarget");

                function te(b, j) {
                    !M || Object.defineProperty(b, "currentTarget", {
                        configurable: !0,
                        enumerable: !0,
                        get: j || M.get
                    })
                }
                l(te, "defineCurrentTarget");

                function fe(b) {
                    try {
                        return b.eventPhase, !0
                    } catch {
                        return !1
                    }
                }
                l(fe, "canDispatch");

                function ve(b) {
                    if (!!fe(b)) {
                        var j = b.eventPhase === 1 ? u : E,
                            x = j[b.type];
                        if (!!x) {
                            var G = m(x, b.target, b.eventPhase === 1);
                            if (!!G.length) {
                                U(b, "stopPropagation", D), U(b, "stopImmediatePropagation", k), te(b, q);
                                for (var w = 0, X = G.length; w < X && !h.get(b); w++) {
                                    var H = G[w];
                                    d.set(b, H.node);
                                    for (var Q = 0, J = H.observers.length; Q < J && !_.get(b); Q++) H.observers[Q].data.call(H.node, b)
                                }
                                d.delete(b), te(b)
                            }
                        }
                    }
                }
                l(ve, "dispatch");

                function ye(b, j, x) {
                    var G = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
                        w = !!G.capture,
                        X = w ? u : E,
                        H = X[b];
                    H || (H = new v, X[b] = H, document.addEventListener(b, ve, w)), H.add(j, x)
                }
                l(ye, "on");

                function Le(b, j, x) {
                    var G = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
                        w = !!G.capture,
                        X = w ? u : E,
                        H = X[b];
                    !H || (H.remove(j, x), !H.size && (delete X[b], document.removeEventListener(b, ve, w)))
                }
                l(Le, "off");

                function Oe(b, j, x) {
                    return b.dispatchEvent(new CustomEvent(j, {
                        bubbles: !0,
                        cancelable: !0,
                        detail: x
                    }))
                }
                l(Oe, "fire")
            },
            58053: W => {
                (function() {
                    var g = this;

                    function L(N, y) {
                        for (var O = N.length, A = y ^ O, R = 0, I; O >= 4;) I = N.charCodeAt(R) & 255 | (N.charCodeAt(++R) & 255) << 8 | (N.charCodeAt(++R) & 255) << 16 | (N.charCodeAt(++R) & 255) << 24, I = (I & 65535) * 1540483477 + (((I >>> 16) * 1540483477 & 65535) << 16), I ^= I >>> 24, I = (I & 65535) * 1540483477 + (((I >>> 16) * 1540483477 & 65535) << 16), A = (A & 65535) * 1540483477 + (((A >>> 16) * 1540483477 & 65535) << 16) ^ I, O -= 4, ++R;
                        switch (O) {
                            case 3:
                                A ^= (N.charCodeAt(R + 2) & 255) << 16;
                            case 2:
                                A ^= (N.charCodeAt(R + 1) & 255) << 8;
                            case 1:
                                A ^= N.charCodeAt(R) & 255, A = (A & 65535) * 1540483477 + (((A >>> 16) * 1540483477 & 65535) << 16)
                        }
                        return A ^= A >>> 13, A = (A & 65535) * 1540483477 + (((A >>> 16) * 1540483477 & 65535) << 16), A ^= A >>> 15, A >>> 0
                    }
                    l(L, "MurmurHashV2");

                    function v(N, y) {
                        var O, A, R, I, P, a, E, u, h, _;
                        for (O = N.length & 3, A = N.length - O, R = y, P = 3432918353, E = 461845907, _ = 0; _ < A;) h = N.charCodeAt(_) & 255 | (N.charCodeAt(++_) & 255) << 8 | (N.charCodeAt(++_) & 255) << 16 | (N.charCodeAt(++_) & 255) << 24, ++_, h = (h & 65535) * P + (((h >>> 16) * P & 65535) << 16) & 4294967295, h = h << 15 | h >>> 17, h = (h & 65535) * E + (((h >>> 16) * E & 65535) << 16) & 4294967295, R ^= h, R = R << 13 | R >>> 19, I = (R & 65535) * 5 + (((R >>> 16) * 5 & 65535) << 16) & 4294967295, R = (I & 65535) + 27492 + (((I >>> 16) + 58964 & 65535) << 16);
                        switch (h = 0, O) {
                            case 3:
                                h ^= (N.charCodeAt(_ + 2) & 255) << 16;
                            case 2:
                                h ^= (N.charCodeAt(_ + 1) & 255) << 8;
                            case 1:
                                h ^= N.charCodeAt(_) & 255, h = (h & 65535) * P + (((h >>> 16) * P & 65535) << 16) & 4294967295, h = h << 15 | h >>> 17, h = (h & 65535) * E + (((h >>> 16) * E & 65535) << 16) & 4294967295, R ^= h
                        }
                        return R ^= N.length, R ^= R >>> 16, R = (R & 65535) * 2246822507 + (((R >>> 16) * 2246822507 & 65535) << 16) & 4294967295, R ^= R >>> 13, R = (R & 65535) * 3266489909 + (((R >>> 16) * 3266489909 & 65535) << 16) & 4294967295, R ^= R >>> 16, R >>> 0
                    }
                    l(v, "MurmurHashV3");
                    var V = v;
                    if (V.v2 = L, V.v3 = v, !0) W.exports = V;
                    else var C
                })()
            },
            28382: (W, g, L) => {
                "use strict";
                L.d(g, {
                    Q: () => V
                });
                var v = "<unknown>";

                function V(_) {
                    var d = _.split(`
`);
                    return d.reduce(function(M, U) {
                        var m = y(U) || A(U) || P(U) || h(U) || E(U);
                        return m && M.push(m), M
                    }, [])
                }
                l(V, "parse");
                var C = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
                    N = /\((\S*)(?::(\d+))(?::(\d+))\)/;

                function y(_) {
                    var d = C.exec(_);
                    if (!d) return null;
                    var M = d[2] && d[2].indexOf("native") === 0,
                        U = d[2] && d[2].indexOf("eval") === 0,
                        m = N.exec(d[2]);
                    return U && m != null && (d[2] = m[1], d[3] = m[2], d[4] = m[3]), {
                        file: M ? null : d[2],
                        methodName: d[1] || v,
                        arguments: M ? [d[2]] : [],
                        lineNumber: d[3] ? +d[3] : null,
                        column: d[4] ? +d[4] : null
                    }
                }
                l(y, "parseChrome");
                var O = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;

                function A(_) {
                    var d = O.exec(_);
                    return d ? {
                        file: d[2],
                        methodName: d[1] || v,
                        arguments: [],
                        lineNumber: +d[3],
                        column: d[4] ? +d[4] : null
                    } : null
                }
                l(A, "parseWinjs");
                var R = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
                    I = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

                function P(_) {
                    var d = R.exec(_);
                    if (!d) return null;
                    var M = d[3] && d[3].indexOf(" > eval") > -1,
                        U = I.exec(d[3]);
                    return M && U != null && (d[3] = U[1], d[4] = U[2], d[5] = null), {
                        file: d[3],
                        methodName: d[1] || v,
                        arguments: d[2] ? d[2].split(",") : [],
                        lineNumber: d[4] ? +d[4] : null,
                        column: d[5] ? +d[5] : null
                    }
                }
                l(P, "parseGecko");
                var a = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;

                function E(_) {
                    var d = a.exec(_);
                    return d ? {
                        file: d[3],
                        methodName: d[1] || v,
                        arguments: [],
                        lineNumber: +d[4],
                        column: d[5] ? +d[5] : null
                    } : null
                }
                l(E, "parseJSC");
                var u = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;

                function h(_) {
                    var d = u.exec(_);
                    return d ? {
                        file: d[2],
                        methodName: d[1] || v,
                        arguments: [],
                        lineNumber: +d[3],
                        column: d[4] ? +d[4] : null
                    } : null
                }
                l(h, "parseNode")
            },
            50232: (W, g, L) => {
                "use strict";
                L.d(g, {
                    nn: () => Pe,
                    Gb: () => Re
                });

                function v(z) {
                    const $ = new AbortController;
                    return $.abort(z), $.signal
                }
                l(v, "abortsignal_abort_abortSignalAbort");

                function V() {
                    return "abort" in AbortSignal && typeof AbortSignal.abort == "function"
                }
                l(V, "isSupported");

                function C() {
                    return AbortSignal.abort === v
                }
                l(C, "isPolyfilled");

                function N() {
                    V() || (AbortSignal.abort = v)
                }
                l(N, "apply");

                function y(z) {
                    const $ = new AbortController;
                    return setTimeout(() => $.abort(new DOMException("TimeoutError")), z), $.signal
                }
                l(y, "abortsignal_timeout_abortSignalTimeout");

                function O() {
                    return "abort" in AbortSignal && typeof AbortSignal.timeout == "function"
                }
                l(O, "abortsignal_timeout_isSupported");

                function A() {
                    return AbortSignal.timeout === y
                }
                l(A, "abortsignal_timeout_isPolyfilled");

                function R() {
                    O() || (AbortSignal.timeout = y)
                }
                l(R, "abortsignal_timeout_apply");
                class I extends Error {
                    constructor($, oe, ue = {}) {
                        super(oe);
                        Object.defineProperty(this, "errors", {
                            value: Array.from($),
                            configurable: !0,
                            writable: !0
                        }), ue.cause && Object.defineProperty(this, "cause", {
                            value: ue.cause,
                            configurable: !0,
                            writable: !0
                        })
                    }
                }
                l(I, "AggregateError");

                function P() {
                    return typeof globalThis.AggregateError == "function"
                }
                l(P, "aggregateerror_isSupported");

                function a() {
                    return globalThis.AggregateError === I
                }
                l(a, "aggregateerror_isPolyfilled");

                function E() {
                    P() || (globalThis.AggregateError = I)
                }
                l(E, "aggregateerror_apply");
                const u = Reflect.getPrototypeOf(Int8Array) || {};

                function h(z) {
                    const $ = this.length;
                    return z = Math.trunc(z) || 0, z < 0 && (z += $), z < 0 || z >= $ ? void 0 : this[z]
                }
                l(h, "arrayLikeAt");

                function _() {
                    return "at" in Array.prototype && typeof Array.prototype.at == "function" && "at" in String.prototype && typeof String.prototype.at == "function" && "at" in u && typeof u.at == "function"
                }
                l(_, "arraylike_at_isSupported");

                function d() {
                    return Array.prototype.at === h && String.prototype.at === h && u.at === h
                }
                l(d, "arraylike_at_isPolyfilled");

                function M() {
                    if (!_()) {
                        const z = {
                            value: h,
                            writable: !0,
                            configurable: !0
                        };
                        Object.defineProperty(Array.prototype, "at", z), Object.defineProperty(String.prototype, "at", z), Object.defineProperty(u, "at", z)
                    }
                }
                l(M, "arraylike_at_apply");

                function U() {
                    const z = new Uint32Array(4);
                    crypto.getRandomValues(z);
                    let $ = -1;
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(oe) {
                        $++;
                        const ue = z[$ >> 3] >> $ % 8 * 4 & 15;
                        return (oe === "x" ? ue : ue & 3 | 8).toString(16)
                    })
                }
                l(U, "randomUUID");

                function m() {
                    return typeof crypto == "object" && "randomUUID" in crypto && typeof crypto.randomUUID == "function"
                }
                l(m, "crypto_randomuuid_isSupported");

                function D() {
                    return m() && crypto.randomUUID === U
                }
                l(D, "crypto_randomuuid_isPolyfilled");

                function k() {
                    m() || (crypto.randomUUID = U)
                }
                l(k, "crypto_randomuuid_apply");
                const q = EventTarget.prototype.addEventListener;

                function te(z, $, oe) {
                    if (typeof oe == "object" && "signal" in oe && oe.signal instanceof AbortSignal) {
                        if (oe.signal.aborted) return;
                        q.call(oe.signal, "abort", () => {
                            this.removeEventListener(z, $, oe)
                        })
                    }
                    return q.call(this, z, $, oe)
                }
                l(te, "addEventListenerWithAbortSignal");

                function fe() {
                    let z = !1;
                    const $ = l(() => z = !0, "setSignalSupported");

                    function oe() {}
                    l(oe, "noop");
                    const ue = Object.create({}, {
                        signal: {
                            get: $
                        }
                    });
                    try {
                        const he = new EventTarget;
                        return he.addEventListener("test", oe, ue), he.removeEventListener("test", oe, ue), z
                    } catch {
                        return z
                    }
                }
                l(fe, "event_abortsignal_isSupported");

                function ve() {
                    return EventTarget.prototype.addEventListener === te
                }
                l(ve, "event_abortsignal_isPolyfilled");

                function ye() {
                    typeof AbortSignal == "function" && !fe() && (EventTarget.prototype.addEventListener = te)
                }
                l(ye, "event_abortsignal_apply");
                const Le = Object.prototype.hasOwnProperty;

                function Oe(z, $) {
                    if (z == null) throw new TypeError("Cannot convert undefined or null to object");
                    return Le.call(Object(z), $)
                }
                l(Oe, "object_hasown_objectHasOwn");

                function b() {
                    return "hasOwn" in Object && typeof Object.hasOwn == "function"
                }
                l(b, "object_hasown_isSupported");

                function j() {
                    return Object.hasOwn === Oe
                }
                l(j, "object_hasown_isPolyfilled");

                function x() {
                    b() || Object.defineProperty(Object, "hasOwn", {
                        value: Oe,
                        configurable: !0,
                        writable: !0
                    })
                }
                l(x, "object_hasown_apply");

                function G(z) {
                    return new Promise(($, oe) => {
                        let ue = !1;
                        const he = Array.from(z),
                            De = [];

                        function Ve(Te) {
                            ue || (ue = !0, $(Te))
                        }
                        l(Ve, "resolveOne");

                        function Ue(Te) {
                            De.push(Te), De.length === he.length && oe(new globalThis.AggregateError(De, "All Promises rejected"))
                        }
                        l(Ue, "rejectIfDone");
                        for (const Te of he) Promise.resolve(Te).then(Ve, Ue)
                    })
                }
                l(G, "promise_any_promiseAny");

                function w() {
                    return "any" in Promise && typeof Promise.any == "function"
                }
                l(w, "promise_any_isSupported");

                function X() {
                    return Promise.all === G
                }
                l(X, "promise_any_isPolyfilled");

                function H() {
                    w() || (Promise.any = G)
                }
                l(H, "promise_any_apply");
                const Q = 50;

                function J(z, $ = {}) {
                    const oe = Date.now(),
                        ue = $.timeout || 0,
                        he = Object.defineProperty({
                            didTimeout: !1,
                            timeRemaining() {
                                return Math.max(0, Q - (Date.now() - oe))
                            }
                        }, "didTimeout", {
                            get() {
                                return Date.now() - oe > ue
                            }
                        });
                    return window.setTimeout(() => {
                        z(he)
                    })
                }
                l(J, "requestidlecallback_requestIdleCallback");

                function Z(z) {
                    clearTimeout(z)
                }
                l(Z, "cancelIdleCallback");

                function ee() {
                    return typeof globalThis.requestIdleCallback == "function"
                }
                l(ee, "requestidlecallback_isSupported");

                function se() {
                    return globalThis.requestIdleCallback === J && globalThis.cancelIdleCallback === Z
                }
                l(se, "requestidlecallback_isPolyfilled");

                function B() {
                    ee() || (globalThis.requestIdleCallback = J, globalThis.cancelIdleCallback = Z)
                }
                l(B, "requestidlecallback_apply");
                const re = typeof Blob == "function" && typeof PerformanceObserver == "function" && typeof Intl == "object" && typeof MutationObserver == "function" && typeof URLSearchParams == "function" && typeof WebSocket == "function" && typeof IntersectionObserver == "function" && typeof queueMicrotask == "function" && typeof TextEncoder == "function" && typeof TextDecoder == "function" && typeof customElements == "object" && typeof HTMLDetailsElement == "function" && typeof AbortController == "function" && typeof AbortSignal == "function" && "entries" in FormData.prototype && "toggleAttribute" in Element.prototype && "replaceChildren" in Element.prototype && "fromEntries" in Object && "flatMap" in Array.prototype && "trimEnd" in String.prototype && "allSettled" in Promise && "matchAll" in String.prototype && "replaceAll" in String.prototype && !0;

                function Re() {
                    return re && V() && O() && P() && _() && m() && fe() && b() && w() && ee()
                }
                l(Re, "lib_isSupported");

                function Be() {
                    return abortSignalAbort.isPolyfilled() && abortSignalTimeout.isPolyfilled() && aggregateError.isPolyfilled() && arrayAt.isPolyfilled() && cryptoRandomUUID.isPolyfilled() && eventAbortSignal.isPolyfilled() && objectHasOwn.isPolyfilled() && promiseAny.isPolyfilled() && requestIdleCallback.isPolyfilled()
                }
                l(Be, "lib_isPolyfilled");

                function Pe() {
                    N(), R(), E(), M(), k(), ye(), x(), H(), B()
                }
                l(Pe, "lib_apply")
            },
            82918: (W, g, L) => {
                "use strict";
                L.d(g, {
                    b: () => y
                });
                let v;

                function V() {
                    return `${Math.round(Math.random()*(Math.pow(2,31)-1))}.${Math.round(Date.now()/1e3)}`
                }
                l(V, "generateClientId");

                function C(O) {
                    const A = `GH1.1.${O}`,
                        R = Date.now(),
                        I = new Date(R + 1 * 365 * 86400 * 1e3).toUTCString();
                    let {
                        domain: P
                    } = document;
                    P.endsWith(".github.com") && (P = "github.com"), document.cookie = `_octo=${A}; expires=${I}; path=/; domain=${P}; secure; samesite=lax`
                }
                l(C, "setClientIdCookie");

                function N() {
                    let O;
                    const R = document.cookie.match(/_octo=([^;]+)/g);
                    if (!R) return;
                    let I = [0, 0];
                    for (const P of R) {
                        const [, a] = P.split("="), [, E, ...u] = a.split("."), h = E.split("-").map(Number);
                        h > I && (I = h, O = u.join("."))
                    }
                    return O
                }
                l(N, "getClientIdFromCookie");

                function y() {
                    try {
                        const O = N();
                        if (O) return O;
                        const A = V();
                        return C(A), A
                    } catch {
                        return v || (v = V()), v
                    }
                }
                l(y, "getOrCreateClientId")
            }
        }
    ]);
})();

//# sourceMappingURL=4978-2494f9dc6f3c.js.map