window.spb = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return {}.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 26);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function utils_isPromise(item) {
        try {
            if (!item) return !1;
            if ("undefined" != typeof Promise && item instanceof Promise) return !0;
            if ("undefined" != typeof window && window.Window && item instanceof window.Window) return !1;
            if ("undefined" != typeof window && window.constructor && item instanceof window.constructor) return !1;
            var _toString = {}.toString;
            if (_toString) {
                var name = _toString.call(item);
                if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
            }
            if ("function" == typeof item.then) return !0;
        } catch (err) {
            return !1;
        }
        return !1;
    }
    var flushPromise, dispatchedErrors = [], possiblyUnhandledPromiseHandlers = [], activeCount = 0;
    function flushActive() {
        if (!activeCount && flushPromise) {
            var promise = flushPromise;
            flushPromise = null, promise.resolve();
        }
    }
    function startActive() {
        activeCount += 1;
    }
    function endActive() {
        activeCount -= 1, flushActive();
    }
    var promise_ZalgoPromise = function() {
        function ZalgoPromise(handler) {
            var _this = this;
            if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, 
            this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, 
            this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, 
            this.handlers = [], handler) {
                var _result, _error, resolved = !1, rejected = !1, isAsync = !1;
                startActive();
                try {
                    handler(function(res) {
                        isAsync ? _this.resolve(res) : (resolved = !0, _result = res);
                    }, function(err) {
                        isAsync ? _this.reject(err) : (rejected = !0, _error = err);
                    });
                } catch (err) {
                    return endActive(), void this.reject(err);
                }
                endActive(), isAsync = !0, resolved ? this.resolve(_result) : rejected && this.reject(_error);
            }
        }
        var _proto = ZalgoPromise.prototype;
        return _proto.resolve = function(result) {
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
            return this.resolved = !0, this.value = result, this.dispatch(), this;
        }, _proto.reject = function(error) {
            var _this2 = this;
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
            if (!error) {
                var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                error = new Error("Expected reject to be called with Error, got " + _err);
            }
            return this.rejected = !0, this.error = error, this.errorHandled || setTimeout(function() {
                _this2.errorHandled || function(err, promise) {
                    if (-1 === dispatchedErrors.indexOf(err)) {
                        dispatchedErrors.push(err), setTimeout(function() {
                            throw err;
                        }, 1);
                        for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                    }
                }(error, _this2);
            }, 1), this.dispatch(), this;
        }, _proto.asyncReject = function(error) {
            return this.errorHandled = !0, this.reject(error), this;
        }, _proto.dispatch = function() {
            var _this3 = this, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
            if (!this.dispatching && (resolved || rejected)) {
                this.dispatching = !0, startActive();
                for (var _loop = function(i) {
                    var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                    if (resolved) try {
                        result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                    } catch (err) {
                        return promise.reject(err), "continue";
                    } else if (rejected) {
                        if (!onError) return promise.reject(_this3.error), "continue";
                        try {
                            result = onError(_this3.error);
                        } catch (err) {
                            return promise.reject(err), "continue";
                        }
                    }
                    result instanceof ZalgoPromise && (result.resolved || result.rejected) ? (result.resolved ? promise.resolve(result.value) : promise.reject(result.error), 
                    result.errorHandled = !0) : utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function(res) {
                        promise.resolve(res);
                    }, function(err) {
                        promise.reject(err);
                    }) : promise.resolve(result);
                }, i = 0; i < handlers.length; i++) _loop(i);
                handlers.length = 0, this.dispatching = !1, endActive();
            }
        }, _proto.then = function(onSuccess, onError) {
            if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
            if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
            var promise = new ZalgoPromise();
            return this.handlers.push({
                promise: promise,
                onSuccess: onSuccess,
                onError: onError
            }), this.errorHandled = !0, this.dispatch(), promise;
        }, _proto.catch = function(onError) {
            return this.then(void 0, onError);
        }, _proto.finally = function(onFinally) {
            if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
            return this.then(function(result) {
                return ZalgoPromise.try(onFinally).then(function() {
                    return result;
                });
            }, function(err) {
                return ZalgoPromise.try(onFinally).then(function() {
                    throw err;
                });
            });
        }, _proto.timeout = function(time, err) {
            var _this4 = this;
            if (this.resolved || this.rejected) return this;
            var timeout = setTimeout(function() {
                _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
            }, time);
            return this.then(function(result) {
                return clearTimeout(timeout), result;
            });
        }, _proto.toPromise = function() {
            if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
            return Promise.resolve(this);
        }, ZalgoPromise.resolve = function(value) {
            return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                return value.then(resolve, reject);
            }) : new ZalgoPromise().resolve(value);
        }, ZalgoPromise.reject = function(error) {
            return new ZalgoPromise().reject(error);
        }, ZalgoPromise.asyncReject = function(error) {
            return new ZalgoPromise().asyncReject(error);
        }, ZalgoPromise.all = function(promises) {
            var promise = new ZalgoPromise(), count = promises.length, results = [];
            if (!count) return promise.resolve(results), promise;
            for (var _loop2 = function(i) {
                var prom = promises[i];
                if (prom instanceof ZalgoPromise) {
                    if (prom.resolved) return results[i] = prom.value, count -= 1, "continue";
                } else if (!utils_isPromise(prom)) return results[i] = prom, count -= 1, "continue";
                ZalgoPromise.resolve(prom).then(function(result) {
                    results[i] = result, 0 == (count -= 1) && promise.resolve(results);
                }, function(err) {
                    promise.reject(err);
                });
            }, i = 0; i < promises.length; i++) _loop2(i);
            return 0 === count && promise.resolve(results), promise;
        }, ZalgoPromise.hash = function(promises) {
            var result = {};
            return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                return ZalgoPromise.resolve(promises[key]).then(function(value) {
                    result[key] = value;
                });
            })).then(function() {
                return result;
            });
        }, ZalgoPromise.map = function(items, method) {
            return ZalgoPromise.all(items.map(method));
        }, ZalgoPromise.onPossiblyUnhandledException = function(handler) {
            return function(handler) {
                return possiblyUnhandledPromiseHandlers.push(handler), {
                    cancel: function() {
                        possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            }(handler);
        }, ZalgoPromise.try = function(method, context, args) {
            if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
            var result;
            startActive();
            try {
                result = method.apply(context, args || []);
            } catch (err) {
                return endActive(), ZalgoPromise.reject(err);
            }
            return endActive(), ZalgoPromise.resolve(result);
        }, ZalgoPromise.delay = function(_delay) {
            return new ZalgoPromise(function(resolve) {
                setTimeout(resolve, _delay);
            });
        }, ZalgoPromise.isPromise = function(value) {
            return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
        }, ZalgoPromise.flush = function() {
            return promise = flushPromise = flushPromise || new ZalgoPromise(), flushActive(), 
            promise;
            var promise;
        }, ZalgoPromise;
    }();
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return promise_ZalgoPromise;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var interface_namespaceObject = {};
    function getUserAgent() {
        return window.navigator.mockUserAgent || window.navigator.userAgent;
    }
    function isOperaMini(ua) {
        return void 0 === ua && (ua = getUserAgent()), ua.indexOf("Opera Mini") > -1;
    }
    function isIEIntranet() {
        if (window.document.documentMode) try {
            var status = window.status;
            return window.status = "testIntranetMode", "testIntranetMode" === window.status && (window.status = status, 
            !0);
        } catch (err) {
            return !1;
        }
        return !1;
    }
    function supportsPopups(ua) {
        return void 0 === ua && (ua = getUserAgent()), !(function(ua) {
            return void 0 === ua && (ua = getUserAgent()), !!function(ua) {
                return void 0 === ua && (ua = getUserAgent()), /iPhone|iPod|iPad/.test(ua);
            }(ua) && (!!function(ua) {
                return void 0 === ua && (ua = getUserAgent()), /\bGSA\b/.test(ua);
            }(ua) || /.+AppleWebKit(?!.*Safari)/.test(ua));
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), !!function(ua) {
                return void 0 === ua && (ua = getUserAgent()), /Android/.test(ua);
            }(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
        }(ua) || isOperaMini(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), /FxiOS/i.test(ua);
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), /EdgiOS/i.test(ua);
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), -1 !== ua.indexOf("FBAN") || -1 !== ua.indexOf("FBAV");
        }(ua) || function(ua) {
            return void 0 === ua && (ua = getUserAgent()), /QQBrowser/.test(ua);
        }(ua) || "undefined" != typeof process && process.versions && process.versions.electron || (userAgent = getUserAgent(), 
        /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)) || !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches);
        var userAgent;
    }
    __webpack_require__.r(interface_namespaceObject), __webpack_require__.d(interface_namespaceObject, "WeakMap", function() {
        return weakmap_CrossDomainSafeWeakMap;
    });
    var esm_extends = __webpack_require__(4), src = __webpack_require__(0), cross_domain_utils_src = __webpack_require__(8);
    function safeIndexOf(collection, item) {
        for (var i = 0; i < collection.length; i++) try {
            if (collection[i] === item) return i;
        } catch (err) {}
        return -1;
    }
    var objectIDs, defineProperty = Object.defineProperty, counter = Date.now() % 1e9, weakmap_CrossDomainSafeWeakMap = function() {
        function CrossDomainSafeWeakMap() {
            if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, 
            counter += 1, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter, 
            function() {
                if ("undefined" == typeof WeakMap) return !1;
                if (void 0 === Object.freeze) return !1;
                try {
                    var testWeakMap = new WeakMap(), testKey = {};
                    return Object.freeze(testKey), testWeakMap.set(testKey, "__testvalue__"), "__testvalue__" === testWeakMap.get(testKey);
                } catch (err) {
                    return !1;
                }
            }()) try {
                this.weakmap = new WeakMap();
            } catch (err) {}
            this.keys = [], this.values = [];
        }
        var _proto = CrossDomainSafeWeakMap.prototype;
        return _proto._cleanupClosedWindows = function() {
            for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                var value = keys[i];
                if (Object(cross_domain_utils_src.d)(value) && Object(cross_domain_utils_src.e)(value)) {
                    if (weakmap) try {
                        weakmap.delete(value);
                    } catch (err) {}
                    keys.splice(i, 1), this.values.splice(i, 1), i -= 1;
                }
            }
        }, _proto.isSafeToReadWrite = function(key) {
            return !Object(cross_domain_utils_src.d)(key);
        }, _proto.set = function(key, value) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) {
                var name = this.name, entry = key[name];
                entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                    value: [ key, value ],
                    writable: !0
                });
            } else {
                this._cleanupClosedWindows();
                var keys = this.keys, values = this.values, index = safeIndexOf(keys, key);
                -1 === index ? (keys.push(key), values.push(value)) : values[index] = value;
            }
        }, _proto.get = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                if (weakmap.has(key)) return weakmap.get(key);
            } catch (err) {
                delete this.weakmap;
            }
            if (!this.isSafeToReadWrite(key)) {
                this._cleanupClosedWindows();
                var index = safeIndexOf(this.keys, key);
                if (-1 === index) return;
                return this.values[index];
            }
            var entry = key[this.name];
            if (entry && entry[0] === key) return entry[1];
        }, _proto.delete = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                weakmap.delete(key);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) {
                var entry = key[this.name];
                entry && entry[0] === key && (entry[0] = entry[1] = void 0);
            } else {
                this._cleanupClosedWindows();
                var keys = this.keys, index = safeIndexOf(keys, key);
                -1 !== index && (keys.splice(index, 1), this.values.splice(index, 1));
            }
        }, _proto.has = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                if (weakmap.has(key)) return !0;
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) {
                var entry = key[this.name];
                return !(!entry || entry[0] !== key);
            }
            return this._cleanupClosedWindows(), -1 !== safeIndexOf(this.keys, key);
        }, _proto.getOrSet = function(key, getter) {
            if (this.has(key)) return this.get(key);
            var value = getter();
            return this.set(key, value), value;
        }, CrossDomainSafeWeakMap;
    }();
    function base64encode(str) {
        if ("function" == typeof btoa) return btoa(str);
        if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64");
        throw new Error("Can not find window.btoa or Buffer");
    }
    function serializeArgs(args) {
        try {
            return JSON.stringify([].slice.call(args), function(subkey, val) {
                return "function" == typeof val ? "memoize[" + function(obj) {
                    if (objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap(), null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                    var chars, uid = objectIDs.get(obj);
                    return uid || (uid = typeof obj + ":" + (chars = "0123456789abcdef", "xxxxxxxxxx".replace(/./g, function() {
                        return chars.charAt(Math.floor(Math.random() * chars.length));
                    }) + "_" + base64encode(new Date().toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase()), 
                    objectIDs.set(obj, uid)), uid;
                }(val) + "]" : val;
            });
        } catch (err) {
            throw new Error("Arguments not serializable -- can not be used to memoize");
        }
    }
    function memoize(method, options) {
        var _this = this;
        void 0 === options && (options = {});
        var cacheMap = new weakmap_CrossDomainSafeWeakMap();
        function memoizedFunction() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, function() {
                return {};
            }), key = serializeArgs(args), cacheTime = options.time;
            if (cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime && delete cache[key], 
            cache[key]) return cache[key].value;
            var time = Date.now(), value = method.apply(this, arguments);
            return cache[key] = {
                time: time,
                value: value
            }, cache[key].value;
        }
        return memoizedFunction.reset = function() {
            cacheMap.delete(options.thisNamespace ? _this : method);
        }, options.name && (memoizedFunction.displayName = options.name + ":memoized"), 
        memoizedFunction;
    }
    function inlineMemoize(method, logic, args) {
        void 0 === args && (args = []);
        var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {}, key = serializeArgs(args);
        return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
    }
    function util_noop() {}
    function stringifyError(err, level) {
        if (void 0 === level && (level = 1), level >= 3) return "stringifyError stack overflow";
        try {
            if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
            if ("string" == typeof err) return err;
            if (err instanceof Error) {
                var stack = err && err.stack, message = err && err.message;
                if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                if (stack) return stack;
                if (message) return message;
            }
            return "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
        } catch (newErr) {
            return "Error while stringifying error: " + stringifyError(newErr, level + 1);
        }
    }
    function stringifyErrorMessage(err) {
        var defaultMessage = "<unknown error: " + {}.toString.call(err) + ">";
        return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
    }
    function objFilter(obj, filter) {
        void 0 === filter && (filter = Boolean);
        var result = {};
        for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
        return result;
    }
    function promiseDebounce(method, delay) {
        var promise, timeout;
        return void 0 === delay && (delay = 50), function() {
            timeout && clearTimeout(timeout);
            var localPromise = promise = promise || new src.a();
            return timeout = setTimeout(function() {
                promise = null, timeout = null, src.a.try(method).then(function(result) {
                    localPromise.resolve(result);
                }, function(err) {
                    localPromise.reject(err);
                });
            }, delay), localPromise;
        };
    }
    function safeInterval(method, time) {
        var timeout;
        return function loop() {
            timeout = setTimeout(function() {
                method(), loop();
            }, time);
        }(), {
            cancel: function() {
                clearTimeout(timeout);
            }
        };
    }
    var KEY_CODES = {
        ENTER: 13
    };
    function isDocumentReady() {
        return Boolean(document.body) && "complete" === document.readyState;
    }
    function urlEncode(str) {
        return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
    }
    function waitForDocumentReady() {
        return inlineMemoize(waitForDocumentReady, function() {
            return new src.a(function(resolve) {
                if (isDocumentReady()) return resolve();
                var interval = setInterval(function() {
                    if (isDocumentReady()) return clearInterval(interval), resolve();
                }, 10);
            });
        });
    }
    function parseQuery(queryString) {
        return inlineMemoize(parseQuery, function() {
            var params = {};
            if (!queryString) return params;
            if (-1 === queryString.indexOf("=")) return params;
            for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                var pair = _queryString$split2[_i2];
                (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        }, [ queryString ]);
    }
    function extendQuery(originalQuery, props) {
        return void 0 === props && (props = {}), props && Object.keys(props).length ? (void 0 === (obj = Object(esm_extends.a)({}, parseQuery(originalQuery), props)) && (obj = {}), 
        Object.keys(obj).filter(function(key) {
            return "string" == typeof obj[key];
        }).map(function(key) {
            return urlEncode(key) + "=" + urlEncode(obj[key]);
        }).join("&")) : originalQuery;
        var obj;
    }
    function extendUrl(url, options) {
        void 0 === options && (options = {});
        var originalUrl, originalHash, query = options.query || {}, hash = options.hash || {}, _url$split = url.split("#");
        originalHash = _url$split[1];
        var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
        originalUrl = _originalUrl$split[0];
        var queryString = extendQuery(_originalUrl$split[1], query), hashString = extendQuery(originalHash, hash);
        return queryString && (originalUrl = originalUrl + "?" + queryString), hashString && (originalUrl = originalUrl + "#" + hashString), 
        originalUrl;
    }
    function enablePerformance() {
        return inlineMemoize(enablePerformance, function() {
            return Boolean(window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0);
        });
    }
    function getPageRenderTime() {
        return waitForDocumentReady().then(function() {
            if (enablePerformance()) {
                var timing = window.performance.timing;
                return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
            }
        });
    }
    function isBrowser() {
        return "undefined" != typeof window;
    }
    function querySelectorAll(selector, doc) {
        return void 0 === doc && (doc = window.document), [].slice.call(doc.querySelectorAll(selector));
    }
    function onClick(element, handler) {
        element.addEventListener("touchstart", util_noop), element.addEventListener("click", handler), 
        element.addEventListener("keypress", function(event) {
            if (event.keyCode === KEY_CODES.ENTER) return handler(event);
        });
    }
    Object.create(Error.prototype);
    var HEADERS = {
        CONTENT_TYPE: "content-type",
        ACCEPT: "accept"
    }, headerBuilders = [];
    function request(_ref) {
        var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
        return new src.a(function(resolve, reject) {
            if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
            for (var normalizedHeaders = {}, _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                var _key2 = _Object$keys2[_i4];
                normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
            }
            json ? normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/json" : (data || body) && (normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || "application/x-www-form-urlencoded; charset=utf-8"), 
            normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || "application/json";
            for (var _i6 = 0; _i6 < headerBuilders.length; _i6++) for (var builtHeaders = (0, 
            headerBuilders[_i6])(), _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                var _key3 = _Object$keys4[_i8];
                normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
            }
            var xhr = new win.XMLHttpRequest();
            for (var _key4 in xhr.addEventListener("load", function() {
                var responseHeaders = function(rawHeaders) {
                    void 0 === rawHeaders && (rawHeaders = "");
                    for (var result = {}, _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                        var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                        result[_key.toLowerCase()] = values.join(":").trim();
                    }
                    return result;
                }(this.getAllResponseHeaders());
                if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                var contentType = responseHeaders["content-type"], isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json")), responseBody = this.responseText;
                try {
                    responseBody = JSON.parse(responseBody);
                } catch (err) {
                    if (isJSON) return reject(new Error("Invalid json: " + this.responseText + "."));
                }
                return resolve({
                    status: this.status,
                    headers: responseHeaders,
                    body: responseBody
                });
            }, !1), xhr.addEventListener("error", function(evt) {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
            }, !1), xhr.open(method, url, !0), normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
            json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map(function(key) {
                return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
            }).join("&")), xhr.timeout = timeout, xhr.ontimeout = function() {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
            }, xhr.send(body);
        });
    }
    __webpack_require__.d(__webpack_exports__, "f", function() {
        return isIEIntranet;
    }), __webpack_require__.d(__webpack_exports__, "q", function() {
        return supportsPopups;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return extendUrl;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getPageRenderTime;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return isBrowser;
    }), __webpack_require__.d(__webpack_exports__, "l", function() {
        return querySelectorAll;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return onClick;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return base64encode;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return memoize;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return inlineMemoize;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return util_noop;
    }), __webpack_require__.d(__webpack_exports__, "o", function() {
        return stringifyError;
    }), __webpack_require__.d(__webpack_exports__, "p", function() {
        return stringifyErrorMessage;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return objFilter;
    }), __webpack_require__.d(__webpack_exports__, "k", function() {
        return promiseDebounce;
    }), __webpack_require__.d(__webpack_exports__, "n", function() {
        return safeInterval;
    }), __webpack_require__.d(__webpack_exports__, "m", function() {
        return request;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _COUNTRY_LANGS, COUNTRY = {
        AD: "AD",
        AE: "AE",
        AG: "AG",
        AI: "AI",
        AL: "AL",
        AM: "AM",
        AN: "AN",
        AO: "AO",
        AR: "AR",
        AT: "AT",
        AU: "AU",
        AW: "AW",
        AZ: "AZ",
        BA: "BA",
        BB: "BB",
        BE: "BE",
        BF: "BF",
        BG: "BG",
        BH: "BH",
        BI: "BI",
        BJ: "BJ",
        BM: "BM",
        BN: "BN",
        BO: "BO",
        BR: "BR",
        BS: "BS",
        BT: "BT",
        BW: "BW",
        BY: "BY",
        BZ: "BZ",
        CA: "CA",
        CD: "CD",
        CG: "CG",
        CH: "CH",
        CI: "CI",
        CK: "CK",
        CL: "CL",
        CM: "CM",
        CN: "CN",
        CO: "CO",
        CR: "CR",
        CV: "CV",
        CY: "CY",
        CZ: "CZ",
        DE: "DE",
        DJ: "DJ",
        DK: "DK",
        DM: "DM",
        DO: "DO",
        DZ: "DZ",
        EC: "EC",
        EE: "EE",
        EG: "EG",
        ER: "ER",
        ES: "ES",
        ET: "ET",
        FI: "FI",
        FJ: "FJ",
        FK: "FK",
        FM: "FM",
        FO: "FO",
        FR: "FR",
        GA: "GA",
        GB: "GB",
        GD: "GD",
        GE: "GE",
        GF: "GF",
        GI: "GI",
        GL: "GL",
        GM: "GM",
        GN: "GN",
        GP: "GP",
        GR: "GR",
        GT: "GT",
        GW: "GW",
        GY: "GY",
        HK: "HK",
        HN: "HN",
        HR: "HR",
        HU: "HU",
        ID: "ID",
        IE: "IE",
        IL: "IL",
        IN: "IN",
        IS: "IS",
        IT: "IT",
        JM: "JM",
        JO: "JO",
        JP: "JP",
        KE: "KE",
        KG: "KG",
        KH: "KH",
        KI: "KI",
        KM: "KM",
        KN: "KN",
        KR: "KR",
        KW: "KW",
        KY: "KY",
        KZ: "KZ",
        LA: "LA",
        LC: "LC",
        LI: "LI",
        LK: "LK",
        LS: "LS",
        LT: "LT",
        LU: "LU",
        LV: "LV",
        MA: "MA",
        MC: "MC",
        MD: "MD",
        ME: "ME",
        MG: "MG",
        MH: "MH",
        MK: "MK",
        ML: "ML",
        MN: "MN",
        MQ: "MQ",
        MR: "MR",
        MS: "MS",
        MT: "MT",
        MU: "MU",
        MV: "MV",
        MW: "MW",
        MX: "MX",
        MY: "MY",
        MZ: "MZ",
        NA: "NA",
        NC: "NC",
        NE: "NE",
        NF: "NF",
        NG: "NG",
        NI: "NI",
        NL: "NL",
        NO: "NO",
        NP: "NP",
        NR: "NR",
        NU: "NU",
        NZ: "NZ",
        OM: "OM",
        PA: "PA",
        PE: "PE",
        PF: "PF",
        PG: "PG",
        PH: "PH",
        PL: "PL",
        PM: "PM",
        PN: "PN",
        PT: "PT",
        PW: "PW",
        PY: "PY",
        QA: "QA",
        RE: "RE",
        RO: "RO",
        RS: "RS",
        RU: "RU",
        RW: "RW",
        SA: "SA",
        SB: "SB",
        SC: "SC",
        SE: "SE",
        SG: "SG",
        SH: "SH",
        SI: "SI",
        SJ: "SJ",
        SK: "SK",
        SL: "SL",
        SM: "SM",
        SN: "SN",
        SO: "SO",
        SR: "SR",
        ST: "ST",
        SV: "SV",
        SZ: "SZ",
        TC: "TC",
        TD: "TD",
        TG: "TG",
        TH: "TH",
        TJ: "TJ",
        TM: "TM",
        TN: "TN",
        TO: "TO",
        TR: "TR",
        TT: "TT",
        TV: "TV",
        TW: "TW",
        TZ: "TZ",
        UA: "UA",
        UG: "UG",
        US: "US",
        UY: "UY",
        VA: "VA",
        VC: "VC",
        VE: "VE",
        VG: "VG",
        VN: "VN",
        VU: "VU",
        WF: "WF",
        WS: "WS",
        YE: "YE",
        YT: "YT",
        ZA: "ZA",
        ZM: "ZM",
        ZW: "ZW"
    }, SDK_QUERY_KEYS = ((_COUNTRY_LANGS = {})[COUNTRY.AD] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.AE] = [ "en", "fr", "es", "zh", "ar" ], _COUNTRY_LANGS[COUNTRY.AG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.AI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AL] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.AM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AN] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.AO] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AR] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.AT] = [ "de", "en" ], _COUNTRY_LANGS[COUNTRY.AU] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.AW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.AZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BA] = [ "en" ], _COUNTRY_LANGS[COUNTRY.BB] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BE] = [ "en", "nl", "fr" ], _COUNTRY_LANGS[COUNTRY.BF] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BG] = [ "en" ], _COUNTRY_LANGS[COUNTRY.BH] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BI] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BJ] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.BM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BN] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.BO] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.BR] = [ "pt", "en" ], 
    _COUNTRY_LANGS[COUNTRY.BS] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BT] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.BW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.BY] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.BZ] = [ "en", "es", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.CA] = [ "en", "fr" ], 
    _COUNTRY_LANGS[COUNTRY.CD] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.CG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CH] = [ "de", "fr", "en" ], _COUNTRY_LANGS[COUNTRY.CI] = [ "fr", "en" ], 
    _COUNTRY_LANGS[COUNTRY.CK] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.CL] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CM] = [ "fr", "en" ], _COUNTRY_LANGS[COUNTRY.CN] = [ "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CO] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.CR] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.CV] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.CY] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.CZ] = [ "cs", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.DE] = [ "de", "en" ], 
    _COUNTRY_LANGS[COUNTRY.DJ] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.DK] = [ "da", "en" ], 
    _COUNTRY_LANGS[COUNTRY.DM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.DO] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.DZ] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.EC] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.EE] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.EG] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ER] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.ES] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.ET] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.FI] = [ "fi", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.FJ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.FK] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.FM] = [ "en" ], _COUNTRY_LANGS[COUNTRY.FO] = [ "da", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.FR] = [ "fr", "en" ], _COUNTRY_LANGS[COUNTRY.GA] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GB] = [ "en" ], _COUNTRY_LANGS[COUNTRY.GD] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GE] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GF] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GL] = [ "da", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GN] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GP] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.GR] = [ "el", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GT] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.GW] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.GY] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.HK] = [ "en", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.HN] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.HR] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.HU] = [ "hu", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.ID] = [ "id", "en" ], 
    _COUNTRY_LANGS[COUNTRY.IE] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.IL] = [ "he", "en" ], 
    _COUNTRY_LANGS[COUNTRY.IN] = [ "en" ], _COUNTRY_LANGS[COUNTRY.IS] = [ "en" ], _COUNTRY_LANGS[COUNTRY.IT] = [ "it", "en" ], 
    _COUNTRY_LANGS[COUNTRY.JM] = [ "en", "es", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.JO] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.JP] = [ "ja", "en" ], _COUNTRY_LANGS[COUNTRY.KE] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.KG] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KH] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.KI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KM] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.KN] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KR] = [ "ko", "en" ], 
    _COUNTRY_LANGS[COUNTRY.KW] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.KY] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.KZ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.LA] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.LC] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.LI] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.LK] = [ "en" ], _COUNTRY_LANGS[COUNTRY.LS] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.LT] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.LU] = [ "en", "de", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.LV] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MA] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.MC] = [ "fr", "en" ], _COUNTRY_LANGS[COUNTRY.MD] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.ME] = [ "en" ], _COUNTRY_LANGS[COUNTRY.MG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.MH] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MK] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.ML] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MN] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.MQ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MR] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.MS] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MT] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.MU] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MV] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.MW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.MX] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.MY] = [ "en" ], _COUNTRY_LANGS[COUNTRY.MZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NA] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.NC] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NE] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.NF] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NG] = [ "en" ], _COUNTRY_LANGS[COUNTRY.NI] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NL] = [ "nl", "en" ], _COUNTRY_LANGS[COUNTRY.NO] = [ "no", "en" ], 
    _COUNTRY_LANGS[COUNTRY.NP] = [ "en" ], _COUNTRY_LANGS[COUNTRY.NR] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.NU] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.NZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.OM] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PA] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.PE] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.PF] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.PG] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PH] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.PL] = [ "pl", "en" ], _COUNTRY_LANGS[COUNTRY.PM] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.PN] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PT] = [ "pt", "en" ], 
    _COUNTRY_LANGS[COUNTRY.PW] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.PY] = [ "es", "en" ], 
    _COUNTRY_LANGS[COUNTRY.QA] = [ "en", "fr", "es", "zh", "ar" ], _COUNTRY_LANGS[COUNTRY.RE] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.RO] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.RS] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.RU] = [ "ru", "en" ], _COUNTRY_LANGS[COUNTRY.RW] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SA] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SB] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SC] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SE] = [ "sv", "en" ], 
    _COUNTRY_LANGS[COUNTRY.SG] = [ "en" ], _COUNTRY_LANGS[COUNTRY.SH] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SI] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SJ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SK] = [ "sk", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SL] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SN] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SO] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SR] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ST] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.SV] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.SZ] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TC] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TD] = [ "fr", "en", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TG] = [ "fr", "en", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TH] = [ "th", "en" ], _COUNTRY_LANGS[COUNTRY.TJ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TM] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TN] = [ "ar", "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TO] = [ "en" ], _COUNTRY_LANGS[COUNTRY.TR] = [ "tr", "en" ], 
    _COUNTRY_LANGS[COUNTRY.TT] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.TV] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.TW] = [ "zh", "en" ], _COUNTRY_LANGS[COUNTRY.TZ] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.UA] = [ "en", "ru", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.UG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.US] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.UY] = [ "es", "en", "fr", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.VA] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.VC] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.VE] = [ "es", "en", "fr", "zh" ], _COUNTRY_LANGS[COUNTRY.VG] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.VN] = [ "en" ], _COUNTRY_LANGS[COUNTRY.VU] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.WF] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.WS] = [ "en" ], 
    _COUNTRY_LANGS[COUNTRY.YE] = [ "ar", "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.YT] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ZA] = [ "en", "fr", "es", "zh" ], _COUNTRY_LANGS[COUNTRY.ZM] = [ "en", "fr", "es", "zh" ], 
    _COUNTRY_LANGS[COUNTRY.ZW] = [ "en" ], {
        COMPONENTS: "components",
        ENV: "env",
        DEBUG: "debug",
        CACHEBUST: "cachebust",
        CLIENT_ID: "client-id",
        MERCHANT_ID: "merchant-id",
        LOCALE: "locale",
        CURRENCY: "currency",
        INTENT: "intent",
        COMMIT: "commit",
        VAULT: "vault",
        BUYER_COUNTRY: "buyer-country",
        DISABLE_FUNDING: "disable-funding",
        DISABLE_CARD: "disable-card",
        LOCALE_COUNTRY: "locale-country",
        LOCALE_LANG: "locale-lang",
        FRAMEWORK: "framework",
        INTEGRATION_DATE: "integration-date",
        ORDER_CURRENCY: "order-currency",
        ORDER_INTENT: "order-intent",
        ORDER_COMMIT: "order-commit",
        ORDER_VAULT: "order-vault"
    }), FPTI_KEY = {
        FEED: "feed_name",
        STATE: "state_name",
        TRANSITION: "transition_name",
        BUTTON_TYPE: "button_type",
        SESSION_UID: "page_session_id",
        BUTTON_SESSION_UID: "button_session_id",
        TOKEN: "token",
        CONTEXT_ID: "context_id",
        CONTEXT_TYPE: "context_type",
        REFERER: "referer_url",
        PAY_ID: "pay_id",
        SELLER_ID: "seller_id",
        CLIENT_ID: "client_id",
        DATA_SOURCE: "serverside_data_source",
        BUTTON_SOURCE: "button_source",
        ERROR_CODE: "ext_error_code",
        ERROR_DESC: "ext_error_desc",
        PAGE_LOAD_TIME: "page_load_time",
        EXPERIMENT_NAME: "pxp_exp_id",
        TREATMENT_NAME: "pxp_trtmnt_id",
        TRANSITION_TIME: "transition_time",
        FUNDING_LIST: "eligible_payment_methods",
        FUNDING_COUNT: "eligible_payment_count",
        CHOSEN_FUNDING: "selected_payment_method",
        BUTTON_LAYOUT: "button_layout",
        VERSION: "checkoutjs_version",
        LOCALE: "locale",
        BUYER_COUNTRY: "buyer_cntry",
        INTEGRATION_IDENTIFIER: "integration_identifier",
        PARTNER_ATTRIBUTION_ID: "bn_code",
        SDK_NAME: "sdk_name",
        SDK_VERSION: "sdk_version",
        USER_AGENT: "user_agent",
        USER_ACTION: "user_action",
        CONTEXT_CORRID: "context_correlation_id"
    }, FPTI_USER_ACTION = {
        COMMIT: "commit",
        CONTINUE: "continue"
    }, FPTI_DATA_SOURCE = {
        PAYMENTS_SDK: "checkout"
    }, FPTI_FEED = {
        PAYMENTS_SDK: "payments_sdk"
    }, FPTI_SDK_NAME = {
        PAYMENTS_SDK: "payments_sdk"
    }, INTENT = {
        CAPTURE: "capture",
        AUTHORIZE: "authorize",
        ORDER: "order"
    }, FUNDING = {
        PAYPAL: "paypal",
        VENMO: "venmo",
        CREDIT: "credit",
        CARD: "card",
        IDEAL: "ideal",
        SEPA: "sepa",
        BANCONTACT: "bancontact",
        GIROPAY: "giropay",
        SOFORT: "sofort",
        EPS: "eps",
        MYBANK: "mybank",
        P24: "p24",
        ZIMPLER: "zimpler",
        WECHATPAY: "wechatpay"
    };
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return COUNTRY;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return SDK_QUERY_KEYS;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return "unknown";
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return FPTI_KEY;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return FPTI_USER_ACTION;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return FPTI_DATA_SOURCE;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return FPTI_FEED;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return FPTI_SDK_NAME;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return INTENT;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return FUNDING;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "n", function() {
        return SMART_BUTTONS;
    }), __webpack_require__.d(__webpack_exports__, "o", function() {
        return SMART_PAYMENT_BUTTONS;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return ACCESS_TOKEN_HEADER;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return HEADERS;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return DATA_ATTRIBUTES;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return CLASS;
    }), __webpack_require__.d(__webpack_exports__, "k", function() {
        return ORDER_API_ERROR;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return CONTEXT;
    }), __webpack_require__.d(__webpack_exports__, "p", function() {
        return TARGET_ELEMENT;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return ERROR_URL;
    }), __webpack_require__.d(__webpack_exports__, "l", function() {
        return ORDER_ID_PATTERN;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return INTEGRATION_ARTIFACT;
    }), __webpack_require__.d(__webpack_exports__, "q", function() {
        return USER_EXPERIENCE_FLOW;
    }), __webpack_require__.d(__webpack_exports__, "m", function() {
        return PRODUCT_FLOW;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return FPTI_CONTEXT_TYPE;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return FPTI_STATE;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return FPTI_TRANSITION;
    });
    var SMART_BUTTONS = "smart_buttons", SMART_PAYMENT_BUTTONS = "smart-payment-buttons", ACCESS_TOKEN_HEADER = "x-paypal-internal-euat", HEADERS = {
        AUTHORIZATION: "authorization",
        CSRF_TOKEN: "x-csrf-jwt",
        SOURCE: "x-source",
        REQUESTED_BY: "x-requested-by",
        ACCESS_TOKEN: "x-paypal-internal-euat",
        PARTNER_ATTRIBUTION_ID: "paypal-partner-attribution-id",
        CLIENT_METADATA_ID: "paypal-client-metadata-id"
    }, DATA_ATTRIBUTES = {
        FUNDING_SOURCE: "data-funding-source",
        CARD: "data-card",
        PAYMENT_METHOD_ID: "data-payment-method-id"
    }, CLASS = {
        LOADING: "paypal-button-loading"
    }, ORDER_API_ERROR = {
        INSTRUMENT_DECLINED: "INSTRUMENT_DECLINED",
        PAYER_ACTION_REQUIRED: "PAYER_ACTION_REQUIRED"
    }, CONTEXT = {
        IFRAME: "iframe",
        POPUP: "popup"
    }, TARGET_ELEMENT = {
        BODY: "body"
    }, ERROR_URL = "https://www.paypal.com/checkoutnow/error", ORDER_ID_PATTERN = /^(EC-)?[A-Z0-9]+$/, INTEGRATION_ARTIFACT = {
        PAYPAL_JS_SDK: "PAYPAL_JS_SDK"
    }, USER_EXPERIENCE_FLOW = {
        INCONTEXT: "INCONTEXT",
        INLINE: "INLINE"
    }, PRODUCT_FLOW = {
        SMART_PAYMENT_BUTTONS: "SMART_PAYMENT_BUTTONS"
    }, FPTI_CONTEXT_TYPE = {
        BUTTON_SESSION_ID: "button_session_id",
        ORDER_ID: "EC-Token"
    }, FPTI_STATE = {
        BUTTON: "smart_button"
    }, FPTI_TRANSITION = {
        BUTTON_LOAD: "process_button_load",
        CREATE_ORDER: "process_create_order"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function _extends() {
        return (_extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }).apply(this, arguments);
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return _extends;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var src = __webpack_require__(0), belter_src = __webpack_require__(1);
    function unresolvedPromise() {
        return new src.a(belter_src.h);
    }
    function promiseNoop() {
        return src.a.resolve();
    }
    var esm_extends = __webpack_require__(4), LOG_LEVEL = {
        DEBUG: "debug",
        INFO: "info",
        WARN: "warn",
        ERROR: "error"
    }, PROTOCOL = {
        FILE: "file:"
    }, AUTO_FLUSH_LEVEL = [ LOG_LEVEL.WARN, LOG_LEVEL.ERROR ], LOG_LEVEL_PRIORITY = [ LOG_LEVEL.ERROR, LOG_LEVEL.WARN, LOG_LEVEL.INFO, LOG_LEVEL.DEBUG ], FLUSH_INTERVAL = 6e4, DEFAULT_LOG_LEVEL = LOG_LEVEL.WARN;
    function httpTransport(_ref) {
        var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json;
        return Object(belter_src.m)({
            url: url,
            method: method,
            headers: headers,
            json: json
        }).then(belter_src.h);
    }
    function extendIfDefined(target, source) {
        for (var key in source) source.hasOwnProperty(key) && source[key] && (target[key] = source[key]);
    }
    var sdk_constants_src = __webpack_require__(2), config = __webpack_require__(7), constants = __webpack_require__(3);
    function getLogger() {
        return Object(belter_src.d)(getLogger, function() {
            return function(_ref2) {
                var url = _ref2.url, prefix = _ref2.prefix, _ref2$logLevel = _ref2.logLevel, logLevel = void 0 === _ref2$logLevel ? DEFAULT_LOG_LEVEL : _ref2$logLevel, _ref2$transport = _ref2.transport, transport = void 0 === _ref2$transport ? httpTransport : _ref2$transport, _ref2$flushInterval = _ref2.flushInterval, flushInterval = void 0 === _ref2$flushInterval ? FLUSH_INTERVAL : _ref2$flushInterval, events = [], tracking = [], payloadBuilders = [], metaBuilders = [], trackingBuilders = [], headerBuilders = [];
                function print(level, event, payload) {
                    if (Object(belter_src.e)() && window.console && window.console.log) {
                        var consoleLogLevel = logLevel;
                        if (window.LOG_LEVEL && -1 !== LOG_LEVEL_PRIORITY.indexOf(window.LOG_LEVEL) && (consoleLogLevel = window.LOG_LEVEL), 
                        !(LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(consoleLogLevel))) {
                            var args = [ event ];
                            args.push(payload), (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                            try {
                                window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                            } catch (err) {}
                        }
                    }
                }
                function immediateFlush() {
                    return src.a.try(function() {
                        if (Object(belter_src.e)() && window.location.protocol !== PROTOCOL.FILE && (events.length || tracking.length)) {
                            for (var meta = {}, _i2 = 0; _i2 < metaBuilders.length; _i2++) extendIfDefined(meta, (0, 
                            metaBuilders[_i2])(meta));
                            for (var headers = {}, _i4 = 0; _i4 < headerBuilders.length; _i4++) extendIfDefined(headers, (0, 
                            headerBuilders[_i4])(headers));
                            var req = transport({
                                method: "POST",
                                url: url,
                                headers: headers,
                                json: {
                                    events: events,
                                    meta: meta,
                                    tracking: tracking
                                }
                            });
                            return events = [], tracking = [], req.then(belter_src.h);
                        }
                    });
                }
                var flush = Object(belter_src.k)(immediateFlush);
                function log(level, event, payload) {
                    if (void 0 === payload && (payload = {}), !Object(belter_src.e)()) return logger;
                    prefix && (event = prefix + "_" + event);
                    for (var logPayload = Object(esm_extends.a)({}, Object(belter_src.i)(payload), {
                        timestamp: Date.now().toString()
                    }), _i6 = 0; _i6 < payloadBuilders.length; _i6++) extendIfDefined(logPayload, (0, 
                    payloadBuilders[_i6])(logPayload));
                    return function(level, event, payload) {
                        events.push({
                            level: level,
                            event: event,
                            payload: logPayload
                        }), -1 !== AUTO_FLUSH_LEVEL.indexOf(level) && flush();
                    }(level, event), print(level, event, logPayload), logger;
                }
                function addBuilder(builders, builder) {
                    return builders.push(builder), logger;
                }
                Object(belter_src.e)() && Object(belter_src.n)(flush, flushInterval);
                var logger = {
                    debug: function(event, payload) {
                        return log(LOG_LEVEL.DEBUG, event, payload);
                    },
                    info: function(event, payload) {
                        return log(LOG_LEVEL.INFO, event, payload);
                    },
                    warn: function(event, payload) {
                        return log(LOG_LEVEL.WARN, event, payload);
                    },
                    error: function(event, payload) {
                        return log(LOG_LEVEL.ERROR, event, payload);
                    },
                    track: function(payload) {
                        if (void 0 === payload && (payload = {}), !Object(belter_src.e)()) return logger;
                        for (var trackingPayload = Object(belter_src.i)(payload), _i8 = 0; _i8 < trackingBuilders.length; _i8++) extendIfDefined(trackingPayload, (0, 
                        trackingBuilders[_i8])(trackingPayload));
                        return print(LOG_LEVEL.DEBUG, "track", trackingPayload), tracking.push(trackingPayload), 
                        logger;
                    },
                    flush: flush,
                    immediateFlush: immediateFlush,
                    addPayloadBuilder: function(builder) {
                        return addBuilder(payloadBuilders, builder);
                    },
                    addMetaBuilder: function(builder) {
                        return addBuilder(metaBuilders, builder);
                    },
                    addTrackingBuilder: function(builder) {
                        return addBuilder(trackingBuilders, builder);
                    },
                    addHeaderBuilder: function(builder) {
                        return addBuilder(headerBuilders, builder);
                    },
                    setTransport: function(newTransport) {
                        return transport = newTransport, logger;
                    }
                };
                return logger;
            }({
                url: config.d
            });
        });
    }
    function setupLogger(_ref) {
        var env = _ref.env, sessionID = _ref.sessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, correlationID = _ref.correlationID, locale = _ref.locale, merchantID = _ref.merchantID, logger = getLogger();
        logger.addPayloadBuilder(function() {
            return {
                referer: window.location.host,
                uid: sessionID,
                env: env
            };
        }), logger.addTrackingBuilder(function() {
            var _ref2, lang = locale.lang, country = locale.country, mID = merchantID;
            return (_ref2 = {})[sdk_constants_src.d.STATE] = constants.g.BUTTON, _ref2[sdk_constants_src.d.FEED] = sdk_constants_src.c.PAYMENTS_SDK, 
            _ref2[sdk_constants_src.d.DATA_SOURCE] = sdk_constants_src.b.PAYMENTS_SDK, _ref2[sdk_constants_src.d.CLIENT_ID] = clientID, 
            _ref2[sdk_constants_src.d.SELLER_ID] = mID && mID[0], _ref2[sdk_constants_src.d.SESSION_UID] = sessionID, 
            _ref2[sdk_constants_src.d.REFERER] = window.location.host, _ref2[sdk_constants_src.d.LOCALE] = lang + "_" + country, 
            _ref2[sdk_constants_src.d.INTEGRATION_IDENTIFIER] = clientID, _ref2[sdk_constants_src.d.PARTNER_ATTRIBUTION_ID] = partnerAttributionID, 
            _ref2[sdk_constants_src.d.SDK_NAME] = sdk_constants_src.e.PAYMENTS_SDK, _ref2[sdk_constants_src.d.SDK_VERSION] = window.paypal.version, 
            _ref2[sdk_constants_src.d.USER_AGENT] = window.navigator && window.navigator.userAgent, 
            _ref2[sdk_constants_src.d.USER_ACTION] = commit ? sdk_constants_src.f.COMMIT : sdk_constants_src.f.CONTINUE, 
            _ref2[sdk_constants_src.d.CONTEXT_CORRID] = correlationID, _ref2;
        }), src.a.onPossiblyUnhandledException(function(err) {
            var _logger$track;
            logger.track(((_logger$track = {})[sdk_constants_src.d.ERROR_CODE] = "payments_sdk_error", 
            _logger$track[sdk_constants_src.d.ERROR_DESC] = Object(belter_src.p)(err), _logger$track)), 
            logger.error("unhandled_error", {
                err: Object(belter_src.o)(err)
            }), logger.flush().catch(belter_src.h);
        });
    }
    __webpack_require__.d(__webpack_exports__, "d", function() {
        return unresolvedPromise;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return promiseNoop;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return getLogger;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return setupLogger;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var persistedAccessToken, src = __webpack_require__(0), belter_src = __webpack_require__(1), config = __webpack_require__(7), lib = __webpack_require__(5), constants = __webpack_require__(3), api = __webpack_require__(9);
    function createAccessToken(clientID) {
        return Object(belter_src.d)(createAccessToken, function() {
            Object(lib.a)().info("rest_api_create_access_token");
            var basicAuth = Object(belter_src.a)(clientID + ":");
            return Object(belter_src.m)({
                method: "post",
                url: config.b,
                headers: {
                    Authorization: "Basic " + basicAuth
                },
                data: {
                    grant_type: "client_credentials"
                }
            }).then(function(_ref) {
                var body = _ref.body;
                if (body && "invalid_client" === body.error) throw new Error("Auth Api invalid client id: " + clientID + ":\n\n" + JSON.stringify(body, null, 4));
                if (!body || !body.access_token) throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
                return body.access_token;
            });
        }, [ clientID ]);
    }
    Object(api.a)(function() {
        var _ref2;
        return (_ref2 = {})[constants.a] = persistedAccessToken, _ref2;
    });
    var persistAccessToken = Object(belter_src.g)(function(accessToken) {
        return src.a.try(function() {
            accessToken && (persistedAccessToken = accessToken);
        });
    }), esm_extends = __webpack_require__(4), sdk_constants_src = __webpack_require__(2);
    function createOrderID(accessToken, order) {
        if (Object(lib.a)().info("rest_api_create_order_token"), !accessToken) throw new Error("Access token not passed");
        if (!order) throw new Error("Expected order details to be passed");
        var currency = window.xprops.currency, intent = window.xprops.intent, merchantID = window.xprops.merchantID;
        if ((order = Object(esm_extends.a)({}, order)).intent && order.intent.toLowerCase() !== intent) throw new Error("Unexpected intent: " + order.intent + " passed to order.create. Please ensure you are passing /sdk/js?" + sdk_constants_src.i.INTENT + "=" + order.intent.toLowerCase() + " in the paypal script tag.");
        (order = Object(esm_extends.a)({}, order, {
            intent: intent.toUpperCase()
        })).purchase_units = order.purchase_units.map(function(unit) {
            if (unit.amount.currency_code && unit.amount.currency_code !== currency) throw new Error("Unexpected currency: " + unit.amount.currency_code + " passed to order.create. Please ensure you are passing /sdk/js?" + sdk_constants_src.i.CURRENCY + "=" + unit.amount.currency_code + " in the paypal script tag.");
            var payee = unit.payee;
            if (payee) {
                if (!merchantID) throw new Error("Pass " + sdk_constants_src.i.MERCHANT_ID + "=XYZ in the paypal script tag. Pass " + sdk_constants_src.i.MERCHANT_ID + "=" + sdk_constants_src.j + " if you do not have access to the merchant id");
                if (payee.merchant_id && merchantID[0] !== sdk_constants_src.j && payee.merchant_id !== merchantID) throw new Error('Expected payee.merchant_id to be "' + merchantID[0] + '"');
            }
            return merchantID && merchantID[0] !== sdk_constants_src.j && (payee = Object(esm_extends.a)({}, payee, {
                merchant_id: merchantID[0]
            })), Object(esm_extends.a)({}, unit, {
                payee: payee,
                amount: Object(esm_extends.a)({}, unit.amount, {
                    currency_code: currency
                })
            });
        }), order.application_context = order.application_context || {};
        var headers = {
            Authorization: "Bearer " + accessToken,
            "PayPal-Partner-Attribution-Id": window.xprops.partnerAttributionID
        };
        return Object(belter_src.m)({
            method: "post",
            url: config.e,
            headers: headers,
            json: order
        }).then(function(_ref) {
            var _getLogger$track, body = _ref.body;
            if (!body || !body.id) throw new Error("Order Api response error:\n\n" + JSON.stringify(body, null, 4));
            return Object(lib.a)().track(((_getLogger$track = {})[sdk_constants_src.d.STATE] = constants.g.BUTTON, 
            _getLogger$track[sdk_constants_src.d.TRANSITION] = constants.h.CREATE_ORDER, _getLogger$track[sdk_constants_src.d.CONTEXT_TYPE] = constants.f.ORDER_ID, 
            _getLogger$track[sdk_constants_src.d.TOKEN] = body.id, _getLogger$track[sdk_constants_src.d.CONTEXT_ID] = body.id, 
            _getLogger$track)), body.id;
        });
    }
    function getOrder(orderID) {
        return Object(api.c)({
            url: config.a.ORDER + "/" + orderID
        });
    }
    function captureOrder(orderID) {
        return Object(api.c)({
            method: "post",
            url: config.a.ORDER + "/" + orderID + "/capture"
        });
    }
    function authorizeOrder(orderID) {
        return Object(api.c)({
            method: "post",
            url: config.a.ORDER + "/" + orderID + "/authorize"
        });
    }
    function patchOrder(orderID, patch) {
        return Object(api.c)({
            method: "post",
            url: config.a.ORDER + "/" + orderID + "/patch",
            json: {
                data: {
                    patch: patch
                }
            }
        });
    }
    function validatePaymentMethod(_ref2) {
        var _headers, clientAccessToken = _ref2.clientAccessToken, orderID = _ref2.orderID, paymentMethodID = _ref2.paymentMethodID;
        Object(lib.a)().info("rest_api_create_order_token");
        var headers = ((_headers = {})[constants.i.AUTHORIZATION] = "Bearer " + clientAccessToken, 
        _headers[constants.i.PARTNER_ATTRIBUTION_ID] = window.xprops.partnerAttributionID, 
        _headers[constants.i.CLIENT_METADATA_ID] = window.xprops.buttonSessionID, _headers), json = {
            payment_source: {
                token: {
                    id: paymentMethodID,
                    type: "NONCE"
                }
            }
        };
        return Object(belter_src.m)({
            method: "post",
            url: config.e + "/" + orderID + "/" + config.f,
            headers: headers,
            json: json
        }).then(function(_ref3) {
            var status = _ref3.status;
            if (200 !== status) throw new Error("Validate payment failed with status: " + status);
        });
    }
    function billingTokenToOrderID(billingToken) {
        return Object(api.c)({
            method: "post",
            url: config.a.PAYMENT + "/" + billingToken + "/ectoken"
        }).then(function(data) {
            return data.token;
        });
    }
    function enableVault(_ref4) {
        var _headers2, orderID = _ref4.orderID, clientAccessToken = _ref4.clientAccessToken;
        return Object(api.b)({
            query: "\n            mutation EnableVault(\n                $orderID : String!\n            ) {\n                enableVault(\n                    token: $orderID\n                )\n            }\n        ",
            variables: {
                orderID: orderID
            },
            headers: (_headers2 = {}, _headers2[constants.i.ACCESS_TOKEN] = clientAccessToken, 
            _headers2)
        });
    }
    function updateClientConfig(_ref5) {
        var orderID = _ref5.orderID, fundingSource = _ref5.fundingSource, integrationArtifact = _ref5.integrationArtifact, userExperienceFlow = _ref5.userExperienceFlow, productFlow = _ref5.productFlow;
        return Object(api.b)({
            query: "\n            mutation UpdateClientConfig(\n                $orderID : String!,\n                $fundingSource : ButtonFundingSourceType!,\n                $integrationArtifact : IntegrationArtifactType!,\n                $userExperienceFlow : UserExperienceFlowType!,\n                $productFlow : ProductFlowType!\n            ) {\n                updateClientConfig(\n                    token: $orderID,\n                    fundingSource: $fundingSource,\n                    integrationArtifact: $integrationArtifact,\n                    userExperienceFlow: $userExperienceFlow,\n                    productFlow: $productFlow\n                )\n            }\n        ",
            variables: {
                orderID: orderID,
                fundingSource: fundingSource,
                integrationArtifact: integrationArtifact,
                userExperienceFlow: userExperienceFlow,
                productFlow: productFlow
            }
        }).then(belter_src.h);
    }
    __webpack_require__.d(__webpack_exports__, "d", function() {
        return createAccessToken;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return persistAccessToken;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return createOrderID;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return getOrder;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return captureOrder;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return authorizeOrder;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return patchOrder;
    }), __webpack_require__.d(__webpack_exports__, "k", function() {
        return validatePaymentMethod;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return billingTokenToOrderID;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return enableVault;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return updateClientConfig;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "d", function() {
        return LOGGER_URL;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return AUTH_API_URL;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return ORDERS_API_URL;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return VALIDATE_PAYMENT_METHOD_API;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return API_URI;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return EXPERIENCE_URI;
    });
    var LOGGER_URL = "/xoplatform/logger/api/logger", AUTH_API_URL = "/v1/oauth2/token", ORDERS_API_URL = "/v2/checkout/orders", VALIDATE_PAYMENT_METHOD_API = "validate-payment-method", API_URI = {
        AUTH: "/smart/api/auth",
        CHECKOUT: "/smart/api/checkout",
        ORDER: "/smart/api/order",
        PAYMENT: "/smart/api/payment",
        GRAPHQL: "/graphql"
    }, EXPERIENCE_URI = {
        CHECKOUT: "/checkoutnow"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var PROTOCOL = {
        MOCK: "mock:",
        FILE: "file:",
        ABOUT: "about:"
    }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
    function isAboutProtocol(win) {
        return void 0 === win && (win = window), win.location.protocol === PROTOCOL.ABOUT;
    }
    function getParent(win) {
        if (win) try {
            if (win.parent && win.parent !== win) return win.parent;
        } catch (err) {}
    }
    function canReadFromWindow(win) {
        try {
            return !0;
        } catch (err) {}
        return !1;
    }
    function getActualDomain(win) {
        var location = (win = win || window).location;
        if (!location) throw new Error("Can not read window location");
        var protocol = location.protocol;
        if (!protocol) throw new Error("Can not read window protocol");
        if (protocol === PROTOCOL.FILE) return PROTOCOL.FILE + "//";
        if (protocol === PROTOCOL.ABOUT) {
            var parent = getParent(win);
            return parent && canReadFromWindow() ? getActualDomain(parent) : PROTOCOL.ABOUT + "//";
        }
        var host = location.host;
        if (!host) throw new Error("Can not read window host");
        return protocol + "//" + host;
    }
    function getDomain(win) {
        var domain = getActualDomain(win = win || window);
        return domain && win.mockDomain && 0 === win.mockDomain.indexOf(PROTOCOL.MOCK) ? win.mockDomain : domain;
    }
    function isAncestorParent(parent, child) {
        if (!parent || !child) return !1;
        var childParent = getParent(child);
        return childParent ? childParent === parent : -1 !== function(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) result.push(win.parent), win = win.parent;
            } catch (err) {}
            return result;
        }(child).indexOf(parent);
    }
    function getTop(win) {
        if (win) {
            try {
                if (win.top) return win.top;
            } catch (err) {}
            if (getParent(win) === win) return win;
            try {
                if (isAncestorParent(window, win) && window.top) return window.top;
            } catch (err) {}
            try {
                if (isAncestorParent(win, window) && window.top) return window.top;
            } catch (err) {}
            for (var _i7 = 0, _getAllChildFrames4 = function getAllChildFrames(win) {
                for (var result = [], _i3 = 0, _getFrames2 = function(win) {
                    var frames, len, result = [];
                    try {
                        frames = win.frames;
                    } catch (err) {
                        frames = win;
                    }
                    try {
                        len = frames.length;
                    } catch (err) {}
                    if (0 === len) return result;
                    if (len) {
                        for (var i = 0; i < len; i++) {
                            var frame = void 0;
                            try {
                                frame = frames[i];
                            } catch (err) {
                                continue;
                            }
                            result.push(frame);
                        }
                        return result;
                    }
                    for (var _i = 0; _i < 100; _i++) {
                        var _frame = void 0;
                        try {
                            _frame = frames[_i];
                        } catch (err) {
                            return result;
                        }
                        if (!_frame) return result;
                        result.push(_frame);
                    }
                    return result;
                }(win); _i3 < _getFrames2.length; _i3++) {
                    var frame = _getFrames2[_i3];
                    result.push(frame);
                    for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
                }
                return result;
            }(win); _i7 < _getAllChildFrames4.length; _i7++) {
                var frame = _getAllChildFrames4[_i7];
                try {
                    if (frame.top) return frame.top;
                } catch (err) {}
                if (getParent(frame) === frame) return frame;
            }
        }
    }
    var iframeWindows = [], iframeFrames = [];
    function isWindowClosed(win, allowMock) {
        void 0 === allowMock && (allowMock = !0);
        try {
            if (win === window) return !1;
        } catch (err) {
            return !0;
        }
        try {
            if (!win) return !0;
        } catch (err) {
            return !0;
        }
        try {
            if (win.closed) return !0;
        } catch (err) {
            return !err || err.message !== IE_WIN_ACCESS_ERROR;
        }
        if (allowMock && function(win) {
            if (!function(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }(win)) return !1;
            try {
                if (win === window) return !0;
                if (isAboutProtocol(win) && canReadFromWindow()) return !0;
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }(win)) try {
            if (win.mockclosed) return !0;
        } catch (err) {}
        try {
            if (!win.parent || !win.top) return !0;
        } catch (err) {}
        var iframeIndex = function(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }(iframeWindows, win);
        if (-1 !== iframeIndex) {
            var frame = iframeFrames[iframeIndex];
            if (frame && function(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
            }(frame)) return !0;
        }
        return !1;
    }
    function linkFrameWindow(frame) {
        if (function() {
            for (var i = 0; i < iframeWindows.length; i++) {
                var closed = !1;
                try {
                    closed = iframeWindows[i].closed;
                } catch (err) {}
                closed && (iframeFrames.splice(i, 1), iframeWindows.splice(i, 1));
            }
        }(), frame && frame.contentWindow) try {
            iframeWindows.push(frame.contentWindow), iframeFrames.push(frame);
        } catch (err) {}
    }
    function isWindow(obj) {
        try {
            if (obj === window) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if ("[object Window]" === {}.toString.call(obj)) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (window.Window && obj instanceof window.Window) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (obj && obj.self === obj) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (obj && obj.parent === obj) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (obj && obj.top === obj) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        return !1;
    }
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return getParent;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return getDomain;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getTop;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return isWindowClosed;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return linkFrameWindow;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return isWindow;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return addHeaderBuilder;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return callSmartAPI;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return callGraphQL;
    });
    var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4), belter_src__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_require__(0), 
    __webpack_require__(1)), _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7), _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3), headerBuilders = [];
    function addHeaderBuilder(builder) {
        headerBuilders.push(builder);
    }
    function callSmartAPI(_ref) {
        for (var _reqHeaders, url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, json = _ref.json, reqHeaders = ((_reqHeaders = {})[_constants__WEBPACK_IMPORTED_MODULE_4__.i.SOURCE] = _constants__WEBPACK_IMPORTED_MODULE_4__.n, 
        _reqHeaders[_constants__WEBPACK_IMPORTED_MODULE_4__.i.REQUESTED_BY] = _constants__WEBPACK_IMPORTED_MODULE_4__.o, 
        _reqHeaders), _i2 = 0; _i2 < headerBuilders.length; _i2++) {
            var headerBuilder = headerBuilders[_i2];
            reqHeaders = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, reqHeaders, headerBuilder());
        }
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_2__.m)({
            url: url,
            method: method,
            headers: reqHeaders,
            json: json
        }).then(function(_ref2) {
            var status = _ref2.status, body = _ref2.body;
            if ("contingency" === body.ack) {
                var err = new Error(body.contingency);
                throw err.data = body.data, err;
            }
            if (status > 400) throw new Error("Api: " + url + " returned status code: " + status);
            if ("success" !== body.ack) throw new Error("Api: " + url + " returned ack: " + body.ack);
            return body.data;
        });
    }
    function callGraphQL(_ref3) {
        var query = _ref3.query, _ref3$variables = _ref3.variables, variables = void 0 === _ref3$variables ? {} : _ref3$variables, _ref3$headers = _ref3.headers, headers = void 0 === _ref3$headers ? {} : _ref3$headers;
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_2__.m)({
            url: _config__WEBPACK_IMPORTED_MODULE_3__.a.GRAPHQL,
            method: "POST",
            json: {
                query: query,
                variables: variables
            },
            headers: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, headers)
        }).then(function(_ref4) {
            var status = _ref4.status, body = _ref4.body, errors = body.errors || [];
            if (errors.length) {
                var message = errors[0].message || JSON.stringify(errors[0]);
                throw new Error(message);
            }
            if (200 !== status) throw new Error(_config__WEBPACK_IMPORTED_MODULE_3__.a.GRAPHQL + " returned status " + status);
            return body;
        });
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", function() {
        return getButtons;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return getSelectedFunding;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return enableLoadingSpinner;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return disableLoadingSpinner;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return getNonce;
    }), __webpack_require__(2);
    var belter_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1), _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
    function getButtons() {
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_1__.l)("[ " + _constants__WEBPACK_IMPORTED_MODULE_2__.d.FUNDING_SOURCE + " ]");
    }
    function getSelectedFunding(button) {
        var fundingSource = button.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.d.FUNDING_SOURCE), paymentMethodID = button.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.d.PAYMENT_METHOD_ID);
        return {
            fundingSource: fundingSource,
            card: button.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__.d.CARD),
            paymentMethodID: paymentMethodID
        };
    }
    function enableLoadingSpinner(button) {
        button.classList.add(_constants__WEBPACK_IMPORTED_MODULE_2__.b.LOADING);
    }
    function disableLoadingSpinner(button) {
        button.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_2__.b.LOADING);
    }
    function getNonce() {
        var nonce = "";
        return document.body && (nonce = document.body.getAttribute("data-nonce") || ""), 
        nonce;
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return POPUP_BRIDGE_OPTYPE;
    }), __webpack_require__(0);
    var POPUP_BRIDGE_OPTYPE = {
        PAYMENT: "payment",
        CANCEL: "cancel"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__(22);
    var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
    __webpack_require__.d(__webpack_exports__, "getGlobalProps", function() {
        return _props__WEBPACK_IMPORTED_MODULE_1__.b;
    }), __webpack_require__.d(__webpack_exports__, "getButtonCallbackProps", function() {
        return _props__WEBPACK_IMPORTED_MODULE_1__.a;
    });
    var _createOrder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
    __webpack_require__.d(__webpack_exports__, "buildXCreateOrderData", function() {
        return _createOrder__WEBPACK_IMPORTED_MODULE_2__.b;
    }), __webpack_require__.d(__webpack_exports__, "buildXCreateOrderActions", function() {
        return _createOrder__WEBPACK_IMPORTED_MODULE_2__.a;
    }), __webpack_require__.d(__webpack_exports__, "getCreateOrder", function() {
        return _createOrder__WEBPACK_IMPORTED_MODULE_2__.c;
    });
    var _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
    __webpack_require__.d(__webpack_exports__, "buildXCreateBillingAgreementData", function() {
        return _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__.b;
    }), __webpack_require__.d(__webpack_exports__, "buildXCreateBillingAgreementActions", function() {
        return _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__.a;
    }), __webpack_require__.d(__webpack_exports__, "getCreateBillingAgreement", function() {
        return _createBillingAgreement__WEBPACK_IMPORTED_MODULE_3__.c;
    });
    var _onApprove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
    __webpack_require__.d(__webpack_exports__, "getOnApprove", function() {
        return _onApprove__WEBPACK_IMPORTED_MODULE_4__.a;
    });
    var _onInit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
    __webpack_require__.d(__webpack_exports__, "buildXOnInitData", function() {
        return _onInit__WEBPACK_IMPORTED_MODULE_5__.b;
    }), __webpack_require__.d(__webpack_exports__, "buildXOnInitActions", function() {
        return _onInit__WEBPACK_IMPORTED_MODULE_5__.a;
    }), __webpack_require__.d(__webpack_exports__, "getOnInit", function() {
        return _onInit__WEBPACK_IMPORTED_MODULE_5__.c;
    });
    var _onCancel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
    __webpack_require__.d(__webpack_exports__, "buildXOnCancelData", function() {
        return _onCancel__WEBPACK_IMPORTED_MODULE_6__.b;
    }), __webpack_require__.d(__webpack_exports__, "buildXOnCancelActions", function() {
        return _onCancel__WEBPACK_IMPORTED_MODULE_6__.a;
    }), __webpack_require__.d(__webpack_exports__, "getOnCancel", function() {
        return _onCancel__WEBPACK_IMPORTED_MODULE_6__.c;
    });
    var _onShippingChange__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
    __webpack_require__.d(__webpack_exports__, "buildXOnShippingChangeData", function() {
        return _onShippingChange__WEBPACK_IMPORTED_MODULE_7__.a;
    }), __webpack_require__.d(__webpack_exports__, "buildXShippingChangeActions", function() {
        return _onShippingChange__WEBPACK_IMPORTED_MODULE_7__.b;
    }), __webpack_require__.d(__webpack_exports__, "getOnShippingChange", function() {
        return _onShippingChange__WEBPACK_IMPORTED_MODULE_7__.c;
    });
    var _onClick__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
    __webpack_require__.d(__webpack_exports__, "buildXOnClickData", function() {
        return _onClick__WEBPACK_IMPORTED_MODULE_8__.b;
    }), __webpack_require__.d(__webpack_exports__, "buildXOnClickActions", function() {
        return _onClick__WEBPACK_IMPORTED_MODULE_8__.a;
    }), __webpack_require__.d(__webpack_exports__, "getOnClick", function() {
        return _onClick__WEBPACK_IMPORTED_MODULE_8__.c;
    });
    var _onAuth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
    __webpack_require__.d(__webpack_exports__, "getOnAuth", function() {
        return _onAuth__WEBPACK_IMPORTED_MODULE_9__.a;
    });
    var _onError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24);
    for (var __WEBPACK_IMPORT_KEY__ in _onError__WEBPACK_IMPORTED_MODULE_10__) [ "getGlobalProps", "getButtonCallbackProps", "buildXCreateOrderData", "buildXCreateOrderActions", "getCreateOrder", "buildXCreateBillingAgreementData", "buildXCreateBillingAgreementActions", "getCreateBillingAgreement", "getOnApprove", "buildXOnInitData", "buildXOnInitActions", "getOnInit", "buildXOnCancelData", "buildXOnCancelActions", "getOnCancel", "buildXOnShippingChangeData", "buildXShippingChangeActions", "getOnShippingChange", "buildXOnClickData", "buildXOnClickActions", "getOnClick", "getOnAuth", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
        __webpack_require__.d(__webpack_exports__, key, function() {
            return _onError__WEBPACK_IMPORTED_MODULE_10__[key];
        });
    }(__WEBPACK_IMPORT_KEY__);
    var _getPopupBridge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(11);
    __webpack_require__.d(__webpack_exports__, "POPUP_BRIDGE_OPTYPE", function() {
        return _getPopupBridge__WEBPACK_IMPORTED_MODULE_11__.a;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return buildXOnInitData;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return buildXOnInitActions;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getOnInit;
    });
    var zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
    function buildXOnInitData() {
        return {};
    }
    function buildXOnInitActions(set) {
        return {
            enable: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try(function() {
                    return set(!0);
                });
            },
            disable: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try(function() {
                    return set(!1);
                });
            }
        };
    }
    function getOnInit(xprops) {
        var onInit = xprops.onInit;
        return function() {
            var enabled = !0;
            return {
                promise: zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try(function() {
                    if (onInit) return onInit({}, buildXOnInitActions(function(val) {
                        enabled = val;
                    }));
                }),
                isEnabled: function() {
                    return enabled;
                }
            };
        };
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return buildXCreateOrderData;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return buildXCreateOrderActions;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getCreateOrder;
    });
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
    function buildXCreateOrderData() {
        return {};
    }
    function buildXCreateOrderActions(_ref) {
        var clientID = _ref.clientID;
        return {
            order: {
                create: function(data) {
                    return Object(_api__WEBPACK_IMPORTED_MODULE_1__.d)(clientID).then(function(accessToken) {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_1__.e)(accessToken, data);
                    });
                }
            }
        };
    }
    function getCreateOrder(xprops, _ref2) {
        var createBillingAgreement = _ref2.createBillingAgreement, createOrder = xprops.createOrder, clientID = xprops.clientID;
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.g)(function() {
            if (createBillingAgreement) return createBillingAgreement().then(_api__WEBPACK_IMPORTED_MODULE_1__.b);
            if (createOrder) return createOrder({}, buildXCreateOrderActions({
                clientID: clientID
            }));
            throw new Error("No mechanism to create order");
        });
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return getOnApprove;
    });
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2), _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6), _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3), _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
    function getOnApprove(xprops, _ref2) {
        var createOrder = _ref2.createOrder, onApprove = xprops.onApprove, onError = xprops.onError, intent = xprops.intent;
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.g)(function(_ref3, _ref4) {
            var payerID = _ref3.payerID, paymentID = _ref3.paymentID, billingToken = _ref3.billingToken, restart = _ref4.restart;
            return createOrder().then(function(orderID) {
                return onApprove({
                    orderID: orderID,
                    payerID: payerID,
                    paymentID: paymentID,
                    billingToken: billingToken
                }, function(_ref) {
                    var intent = _ref.intent, orderID = _ref.orderID, restart = _ref.restart, handleProcessorError = function(err) {
                        if (err && err.data && err.data.details && err.data.details.some(function(detail) {
                            return detail.issue === _constants__WEBPACK_IMPORTED_MODULE_3__.k.INSTRUMENT_DECLINED || detail.issue === _constants__WEBPACK_IMPORTED_MODULE_3__.k.PAYER_ACTION_REQUIRED;
                        })) return restart().then(_lib__WEBPACK_IMPORTED_MODULE_4__.d);
                        throw new Error("Order could not be captured");
                    }, get = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.g)(function() {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.g)(orderID);
                    }), capture = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.g)(function() {
                        if (intent !== _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.CAPTURE) throw new Error("Use " + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.i.INTENT + "=" + _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_1__.h.CAPTURE + " to use client-side capture");
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.c)(orderID).finally(get.reset).finally(capture.reset).catch(handleProcessorError);
                    }), authorize = Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.g)(function() {
                        return Object(_api__WEBPACK_IMPORTED_MODULE_2__.a)(orderID).finally(get.reset).finally(authorize.reset).catch(handleProcessorError);
                    });
                    return {
                        order: {
                            capture: capture,
                            authorize: authorize,
                            patch: function(data) {
                                return void 0 === data && (data = []), Object(_api__WEBPACK_IMPORTED_MODULE_2__.h)(orderID, data).catch(function() {
                                    throw new Error("Order could not be patched");
                                });
                            },
                            get: get
                        },
                        restart: restart
                    };
                }({
                    orderID: orderID,
                    intent: intent,
                    restart: restart
                })).catch(function(err) {
                    return onError(err);
                });
            });
        });
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return buildXOnCancelData;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return buildXOnCancelActions;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getOnCancel;
    });
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
    function buildXOnCancelData(_ref) {
        return {
            orderID: _ref.orderID
        };
    }
    function buildXOnCancelActions() {
        return {};
    }
    function getOnCancel(xprops, _ref2) {
        var createOrder = _ref2.createOrder, onCancel = xprops.onCancel, onError = xprops.onError;
        return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.g)(function() {
            return createOrder().then(function(orderID) {
                return onCancel(buildXOnCancelData({
                    orderID: orderID
                }), {});
            }).catch(function(err) {
                return onError(err);
            });
        });
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return buildXOnShippingChangeData;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return buildXShippingChangeActions;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getOnShippingChange;
    });
    var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4), _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
    function buildXOnShippingChangeData(data) {
        return data;
    }
    function buildXShippingChangeActions(_ref) {
        var orderID = _ref.orderID, actions = _ref.actions;
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.a)({}, actions, {
            order: {
                patch: function(data) {
                    return void 0 === data && (data = []), Object(_api__WEBPACK_IMPORTED_MODULE_1__.h)(orderID, data).catch(function() {
                        throw new Error("Order could not be patched");
                    });
                }
            }
        });
    }
    function getOnShippingChange(xprops, _ref2) {
        var createOrder = _ref2.createOrder, onShippingChange = xprops.onShippingChange;
        if (onShippingChange) return function(data, actions) {
            return createOrder().then(function(orderID) {
                return onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({
                    orderID: orderID,
                    actions: actions
                }));
            });
        };
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return buildXOnClickData;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return buildXOnClickActions;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getOnClick;
    });
    var zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
    function buildXOnClickData() {
        return {};
    }
    function buildXOnClickActions() {
        return {
            resolve: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try(function() {
                    return !0;
                });
            },
            reject: function() {
                return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try(function() {
                    return !1;
                });
            }
        };
    }
    function getOnClick(xprops) {
        var _xprops$onClick = xprops.onClick, onClick = void 0 === _xprops$onClick ? _lib__WEBPACK_IMPORTED_MODULE_1__.b : _xprops$onClick;
        return function() {
            return onClick({}, buildXOnClickActions()).then(function(valid) {
                return !1 !== valid;
            });
        };
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return getOnAuth;
    });
    var zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
    function getOnAuth() {
        return function(_ref) {
            var accessToken = _ref.accessToken;
            return zalgo_promise_src__WEBPACK_IMPORTED_MODULE_0__.a.try(function() {
                return Object(_api__WEBPACK_IMPORTED_MODULE_1__.i)(accessToken);
            });
        };
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return buildXCreateBillingAgreementData;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return buildXCreateBillingAgreementActions;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getCreateBillingAgreement;
    });
    var belter_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
    function buildXCreateBillingAgreementData() {
        return {};
    }
    function buildXCreateBillingAgreementActions() {
        return {};
    }
    function getCreateBillingAgreement(xprops) {
        var createBillingAgreement = xprops.createBillingAgreement;
        if (createBillingAgreement) return Object(belter_src__WEBPACK_IMPORTED_MODULE_0__.g)(function() {
            return createBillingAgreement({}, {});
        });
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
    __webpack_require__.d(__webpack_exports__, "setupButton", function() {
        return _button__WEBPACK_IMPORTED_MODULE_0__.a;
    });
    var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
    for (var __WEBPACK_IMPORT_KEY__ in _props__WEBPACK_IMPORTED_MODULE_1__) [ "setupButton", "default" ].indexOf(__WEBPACK_IMPORT_KEY__) < 0 && function(key) {
        __webpack_require__.d(__webpack_exports__, key, function() {
            return _props__WEBPACK_IMPORTED_MODULE_1__[key];
        });
    }(__WEBPACK_IMPORT_KEY__);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__(2);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return getGlobalProps;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return getButtonCallbackProps;
    });
    var _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10), _onInit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13), _createOrder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14), _onApprove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15), _onCancel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16), _onShippingChange__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17), _onClick__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18), _onAuth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19), _createBillingAgreement__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(20);
    function getGlobalProps(_ref) {
        var xprops = _ref.xprops, cspNonce = _ref.cspNonce, sessionID = xprops.sessionID, buttonSessionID = xprops.buttonSessionID, clientID = xprops.clientID, merchantID = xprops.merchantID, partnerAttributionID = xprops.partnerAttributionID, correlationID = xprops.correlationID, _xprops$buyerCountry = xprops.buyerCountry, getPopupBridge = xprops.getPopupBridge, getPrerenderDetails = xprops.getPrerenderDetails, rememberFunding = xprops.remember, onError = xprops.onError;
        return {
            env: xprops.env,
            vault: xprops.vault,
            commit: xprops.commit,
            clientAccessToken: xprops.clientAccessToken,
            buyerCountry: void 0 === _xprops$buyerCountry ? _ref.buyerGeoCountry || _paypal_sdk_constants_src__WEBPACK_IMPORTED_MODULE_0__.a.US : _xprops$buyerCountry,
            locale: xprops.locale,
            cspNonce: cspNonce = cspNonce || Object(_dom__WEBPACK_IMPORTED_MODULE_1__.d)(),
            sessionID: sessionID,
            buttonSessionID: buttonSessionID,
            clientID: clientID,
            merchantID: merchantID,
            partnerAttributionID: partnerAttributionID,
            correlationID: correlationID,
            getPopupBridge: getPopupBridge,
            getPrerenderDetails: getPrerenderDetails,
            rememberFunding: rememberFunding,
            onInit: Object(_onInit__WEBPACK_IMPORTED_MODULE_2__.c)(xprops),
            onError: onError
        };
    }
    function getButtonCallbackProps(_ref2) {
        var xprops = _ref2.xprops, createBillingAgreement = Object(_createBillingAgreement__WEBPACK_IMPORTED_MODULE_9__.c)(xprops), createOrder = Object(_createOrder__WEBPACK_IMPORTED_MODULE_3__.c)(xprops, {
            createBillingAgreement: createBillingAgreement
        }), onApprove = Object(_onApprove__WEBPACK_IMPORTED_MODULE_4__.a)(xprops, {
            createOrder: createOrder
        }), onCancel = Object(_onCancel__WEBPACK_IMPORTED_MODULE_5__.c)(xprops, {
            createOrder: createOrder
        }), onShippingChange = Object(_onShippingChange__WEBPACK_IMPORTED_MODULE_6__.c)(xprops, {
            createOrder: createOrder
        });
        return {
            createOrder: createOrder,
            createBillingAgreement: createBillingAgreement,
            onApprove: onApprove,
            onCancel: onCancel,
            onClick: Object(_onClick__WEBPACK_IMPORTED_MODULE_7__.c)(xprops),
            onAuth: Object(_onAuth__WEBPACK_IMPORTED_MODULE_8__.a)(),
            onShippingChange: onShippingChange
        };
    }
}, function(module, exports) {}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var src = __webpack_require__(1), sdk_constants_src = __webpack_require__(2), zalgo_promise_src = __webpack_require__(0), lib = __webpack_require__(5), esm_extends = __webpack_require__(4), cross_domain_utils_src = __webpack_require__(8), api = __webpack_require__(6), constants = __webpack_require__(3), checkoutOpen = !1, canRenderTop = !1;
    function initCheckout(props) {
        var win = props.win, fundingSource = props.fundingSource, card = props.card, buyerCountry = props.buyerCountry, _createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, onAuth = props.onAuth, onShippingChange = props.onShippingChange, cspNonce = props.cspNonce, context = props.context, locale = props.locale, commit = props.commit, onError = props.onError, vault = props.vault, clientAccessToken = props.clientAccessToken, fundingEligibility = props.fundingEligibility, createBillingAgreement = props.createBillingAgreement, _props$validationProm = props.validationPromise, validationPromise = void 0 === _props$validationProm ? zalgo_promise_src.a.resolve(!0) : _props$validationProm;
        if (checkoutOpen) throw new Error("Checkout already rendered");
        var approved = !1, restart = Object(src.g)(function() {
            return initCheckout(Object(esm_extends.a)({}, props, {
                context: constants.c.IFRAME
            })).start().finally(lib.d);
        }), _window$paypal$Checko = window.paypal.Checkout({
            window: win,
            createOrder: function() {
                return validationPromise.then(function(valid) {
                    return valid ? _createOrder().then(function(orderID) {
                        return function(_ref3) {
                            var orderID = _ref3.orderID, vault = _ref3.vault, clientAccessToken = _ref3.clientAccessToken, fundingEligibility = _ref3.fundingEligibility, fundingSource = _ref3.fundingSource, createBillingAgreement = _ref3.createBillingAgreement;
                            return zalgo_promise_src.a.try(function() {
                                if (clientAccessToken && function(_ref2) {
                                    if (!window.xprops.enableVault) return !1;
                                    if (!_ref2.clientAccessToken) return !1;
                                    if (_ref2.createBillingAgreement) return !1;
                                    if (_ref2.vault) return !0;
                                    var fundingConfig = _ref2.fundingEligibility[_ref2.fundingSource];
                                    return !(!fundingConfig.eligible || !fundingConfig.vaultable);
                                }({
                                    vault: vault,
                                    clientAccessToken: clientAccessToken,
                                    fundingEligibility: fundingEligibility,
                                    fundingSource: fundingSource,
                                    createBillingAgreement: createBillingAgreement
                                })) return Object(api.f)({
                                    orderID: orderID,
                                    clientAccessToken: clientAccessToken
                                }).catch(function(err) {
                                    if (vault) throw err;
                                });
                            });
                        }({
                            orderID: orderID,
                            vault: vault,
                            clientAccessToken: clientAccessToken,
                            fundingEligibility: fundingEligibility,
                            fundingSource: fundingSource,
                            createBillingAgreement: createBillingAgreement
                        }).then(function() {
                            return orderID;
                        });
                    }) : Object(lib.d)();
                });
            },
            onApprove: function(_ref4) {
                var payerID = _ref4.payerID, paymentID = _ref4.paymentID, billingToken = _ref4.billingToken;
                return approved = !0, closeCheckout().then(function() {
                    return _onApprove({
                        payerID: payerID,
                        paymentID: paymentID,
                        billingToken: billingToken
                    }, {
                        restart: restart
                    });
                });
            },
            onCancel: function() {
                return validationPromise.then(function(valid) {
                    if (valid) return closeCheckout().then(function() {
                        return _onCancel();
                    });
                });
            },
            onError: onError,
            onAuth: onAuth,
            onClose: function() {
                return checkoutOpen = !1, validationPromise.then(function(valid) {
                    if (valid && !approved) return _onCancel();
                });
            },
            onShippingChange: onShippingChange,
            fundingSource: fundingSource,
            card: card,
            buyerCountry: buyerCountry,
            locale: locale,
            commit: commit,
            cspNonce: cspNonce
        }), closeCheckout = _window$paypal$Checko.close, triggerError = _window$paypal$Checko.onError;
        checkoutOpen = !0;
        var top, renderPromise = (0, _window$paypal$Checko.renderTo)((top = Object(cross_domain_utils_src.c)(window), 
        canRenderTop && top ? top : window.xprops.getParent()), constants.p.BODY, context), close = function() {
            return checkoutOpen = !1, closeCheckout();
        };
        return {
            start: function() {
                return validationPromise.then(function(valid) {
                    return valid ? renderPromise : close();
                }).then(src.h);
            },
            close: close,
            triggerError: triggerError
        };
    }
    var cardFieldsOpen = !1, card_fields_openCardFields = function() {
        var buttonsContainer = document.querySelector("#buttons-container"), cardButtonsContainer = document.querySelector('[data-funding-source="' + sdk_constants_src.g.CARD + '"]'), cardFieldsContainer = document.querySelector("#card-fields-container");
        if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) throw new Error("Required elements not found");
        cardFieldsContainer.style.display = "block";
        var recalculateMargin = function() {
            buttonsContainer.style.marginTop = -(buttonsContainer.offsetHeight - cardButtonsContainer.offsetHeight) + "px";
        };
        window.addEventListener("resize", function() {
            buttonsContainer.style.transitionDuration = "0s", recalculateMargin();
        }), recalculateMargin();
    }, config = __webpack_require__(7), props_getPopupBridge = __webpack_require__(11), button_props = __webpack_require__(12), dom = __webpack_require__(10), api_api = __webpack_require__(9);
    function setupButton(opts) {
        opts.paypal && (opts = {
            fundingEligibility: opts
        });
        var fundingEligibility = opts.fundingEligibility, buyerGeoCountry = opts.buyerCountry, serverCSPNonce = opts.cspNonce;
        if (!window.paypal) throw new Error("PayPal library not loaded");
        var init, _getGlobalProps = Object(button_props.getGlobalProps)({
            xprops: window.xprops,
            buyerGeoCountry: buyerGeoCountry,
            cspNonce: serverCSPNonce
        }), env = _getGlobalProps.env, vault = _getGlobalProps.vault, commit = _getGlobalProps.commit, clientAccessToken = _getGlobalProps.clientAccessToken, buyerCountry = _getGlobalProps.buyerCountry, locale = _getGlobalProps.locale, cspNonce = _getGlobalProps.cspNonce, sessionID = _getGlobalProps.sessionID, clientID = _getGlobalProps.clientID, merchantID = _getGlobalProps.merchantID, partnerAttributionID = _getGlobalProps.partnerAttributionID, correlationID = _getGlobalProps.correlationID, getPopupBridge = _getGlobalProps.getPopupBridge, getPrerenderDetails = _getGlobalProps.getPrerenderDetails, rememberFunding = _getGlobalProps.rememberFunding, onError = _getGlobalProps.onError, onInit = _getGlobalProps.onInit;
        Object(lib.c)({
            env: env,
            sessionID: sessionID,
            clientID: clientID,
            partnerAttributionID: partnerAttributionID,
            commit: commit,
            correlationID: correlationID,
            locale: locale,
            merchantID: merchantID
        });
        var popupBridge, buttonProcessing = !1, pay = function(_ref) {
            var button = _ref.button, win = _ref.win, fundingSource = _ref.fundingSource, card = _ref.card, paymentMethodID = _ref.paymentMethodID;
            return zalgo_promise_src.a.try(function() {
                if (!buttonProcessing) {
                    buttonProcessing = !0;
                    var _getButtonCallbackPro = Object(button_props.getButtonCallbackProps)({
                        xprops: window.xprops
                    }), createOrder = _getButtonCallbackPro.createOrder, createBillingAgreement = _getButtonCallbackPro.createBillingAgreement, onApprove = _getButtonCallbackPro.onApprove, onCancel = _getButtonCallbackPro.onCancel, onAuth = _getButtonCallbackPro.onAuth, onShippingChange = _getButtonCallbackPro.onShippingChange, validationPromise = (0, 
                    _getButtonCallbackPro.onClick)();
                    if (!init || !init.isEnabled()) return win ? win.close() : null;
                    var _ref, isCardFields = (_ref = {
                        vault: vault,
                        onShippingChange: onShippingChange,
                        fundingSource: fundingSource
                    }, !!window.xprops.enableInlineGuest && _ref.fundingSource === sdk_constants_src.g.CARD && !_ref.vault && !_ref.onShippingChange), isVaultCapture = function(_ref) {
                        return !!_ref.paymentMethodID && !_ref.onShippingChange;
                    }({
                        paymentMethodID: paymentMethodID,
                        onShippingChange: onShippingChange
                    }), isPopupBridge = function(_ref) {
                        return !!_ref.popupBridge && !_ref.onShippingChange;
                    }({
                        popupBridge: popupBridge,
                        onShippingChange: onShippingChange
                    });
                    (isVaultCapture || isPopupBridge) && Object(dom.b)(button);
                    var _ref2 = isVaultCapture ? function(props) {
                        var createOrder = props.createOrder, paymentMethodID = props.paymentMethodID, onApprove = props.onApprove, clientAccessToken = props.clientAccessToken;
                        if (!paymentMethodID) throw new Error("Payment method id required for vault capture");
                        if (!clientAccessToken) throw new Error("Client access token required for vault capture");
                        var restart = function() {
                            return zalgo_promise_src.a.try(function() {
                                throw new Error("Vault capture restart not implemented");
                            });
                        };
                        return {
                            start: function() {
                                return createOrder().then(function(orderID) {
                                    return Object(api.k)({
                                        clientAccessToken: clientAccessToken,
                                        orderID: orderID,
                                        paymentMethodID: paymentMethodID
                                    }).then(function() {
                                        return onApprove({}, {
                                            restart: restart
                                        });
                                    });
                                });
                            },
                            close: function() {
                                return zalgo_promise_src.a.resolve();
                            },
                            triggerError: function(err) {
                                throw err;
                            }
                        };
                    }({
                        createOrder: createOrder,
                        paymentMethodID: paymentMethodID,
                        onApprove: onApprove,
                        clientAccessToken: clientAccessToken
                    }) : isCardFields ? function(props) {
                        var fundingSource = props.fundingSource, card = props.card, buyerCountry = props.buyerCountry, createOrder = props.createOrder, _onApprove = props.onApprove, onCancel = props.onCancel, onAuth = props.onAuth, onShippingChange = props.onShippingChange, cspNonce = props.cspNonce, locale = props.locale, commit = props.commit, onError = props.onError;
                        if (!card) throw new Error("Card required to render card fields");
                        if (cardFieldsOpen) throw new Error("Card fields already rendered");
                        var restart = Object(src.g)(function() {
                            return initCheckout(Object(esm_extends.a)({}, props, {
                                context: constants.c.IFRAME
                            })).start().finally(lib.d);
                        }), _window$paypal$CardFi = window.paypal.CardFields({
                            createOrder: createOrder,
                            fundingSource: fundingSource,
                            card: card,
                            onApprove: function(_ref2) {
                                var payerID = _ref2.payerID, paymentID = _ref2.paymentID, billingToken = _ref2.billingToken;
                                return close().then(function() {
                                    return _onApprove({
                                        payerID: payerID,
                                        paymentID: paymentID,
                                        billingToken: billingToken
                                    }, {
                                        restart: restart
                                    });
                                });
                            },
                            onCancel: onCancel,
                            onError: onError,
                            onAuth: onAuth,
                            onClose: function() {
                                return cardFieldsOpen = !1, onCancel();
                            },
                            onShippingChange: onShippingChange,
                            buyerCountry: buyerCountry,
                            locale: locale,
                            commit: commit,
                            cspNonce: cspNonce
                        }), render = _window$paypal$CardFi.render, close = _window$paypal$CardFi.close;
                        return cardFieldsOpen = !0, {
                            start: function() {
                                cardFieldsOpen = !0;
                                var renderPromise = render("#card-fields-container");
                                return card_fields_openCardFields(), renderPromise;
                            },
                            close: close,
                            triggerError: _window$paypal$CardFi.onError
                        };
                    }({
                        fundingSource: fundingSource,
                        card: card,
                        buyerCountry: buyerCountry,
                        createOrder: createOrder,
                        onApprove: onApprove,
                        onCancel: onCancel,
                        onAuth: onAuth,
                        onShippingChange: onShippingChange,
                        cspNonce: cspNonce,
                        locale: locale,
                        commit: commit,
                        onError: onError,
                        vault: vault,
                        clientAccessToken: clientAccessToken,
                        fundingEligibility: fundingEligibility,
                        createBillingAgreement: createBillingAgreement
                    }) : isPopupBridge ? function(props) {
                        var popupBridge = props.popupBridge, createOrder = props.createOrder, onApprove = props.onApprove, onCancel = props.onCancel;
                        if (!popupBridge) throw new Error("Popup bridge required");
                        return {
                            start: function start() {
                                return createOrder().then(function(orderID) {
                                    var url = Object(src.b)("" + Object(cross_domain_utils_src.a)() + config.c.CHECKOUT, {
                                        query: {
                                            token: orderID,
                                            redirect_uri: popupBridge.nativeUrl
                                        }
                                    });
                                    return popupBridge.start(url);
                                }).then(function(_ref2) {
                                    var opType = _ref2.opType;
                                    if (opType === props_getPopupBridge.a.PAYMENT) return onApprove({
                                        payerID: _ref2.PayerID,
                                        paymentID: _ref2.paymentId,
                                        billingToken: _ref2.ba_token
                                    }, {
                                        restart: start
                                    });
                                    if (opType === props_getPopupBridge.a.CANCEL) return onCancel();
                                    throw new Error("Unhandleable opType: " + opType);
                                });
                            },
                            close: lib.b,
                            triggerError: function(err) {
                                throw err;
                            }
                        };
                    }({
                        popupBridge: popupBridge,
                        createOrder: createOrder,
                        onApprove: onApprove,
                        onCancel: onCancel
                    }) : initCheckout({
                        win: win,
                        fundingSource: fundingSource,
                        card: card,
                        buyerCountry: buyerCountry,
                        createOrder: createOrder,
                        onApprove: onApprove,
                        onCancel: onCancel,
                        onAuth: onAuth,
                        onShippingChange: onShippingChange,
                        cspNonce: cspNonce,
                        locale: locale,
                        commit: commit,
                        onError: onError,
                        vault: vault,
                        clientAccessToken: clientAccessToken,
                        fundingEligibility: fundingEligibility,
                        validationPromise: validationPromise,
                        createBillingAgreement: createBillingAgreement
                    }), start = _ref2.start, close = _ref2.close, triggerError = _ref2.triggerError;
                    return validationPromise.then(function(valid) {
                        return valid ? (createOrder().then(function(orderID) {
                            return function(_ref) {
                                var orderID = _ref.orderID, fundingSource = _ref.fundingSource, isCardFields = _ref.isCardFields;
                                return zalgo_promise_src.a.try(function() {
                                    if (window.xprops.updateClientConfiguration) return Object(api.j)({
                                        orderID: orderID,
                                        fundingSource: fundingSource,
                                        integrationArtifact: constants.j.PAYPAL_JS_SDK,
                                        userExperienceFlow: isCardFields ? constants.q.INLINE : constants.q.INCONTEXT,
                                        productFlow: constants.m.SMART_PAYMENT_BUTTONS
                                    });
                                });
                            }({
                                orderID: orderID,
                                fundingSource: fundingSource,
                                isCardFields: isCardFields
                            });
                        }), start().then(function() {
                            return createOrder();
                        }).then(function(orderID) {
                            return function(orderID) {
                                if (!orderID.match(constants.l)) throw new Error(orderID + " does not match pattern for order-id, ec-token or cart-id");
                                return Object(api_api.b)({
                                    query: "\n            query GetCheckoutDetails($orderID: String!) {\n                checkoutSession(token: $orderID) {\n                    cart {\n                        intent\n                        returnUrl {\n                            href\n                        }\n                        cancelUrl {\n                            href\n                        }\n                        amounts {\n                            total {\n                                currencyCode\n                            }\n                        }\n                    }\n                }\n            }\n        ",
                                    variables: {
                                        orderID: orderID
                                    }
                                }).then(function(res) {
                                    var cart = res.data.checkoutSession.cart, intent = "sale" === cart.intent.toLowerCase() ? sdk_constants_src.h.CAPTURE : cart.intent.toLowerCase(), currency = cart.amounts && cart.amounts.total.currencyCode, returnUrl = cart.returnUrl && cart.returnUrl.href, cancelUrl = cart.cancelUrl && cart.cancelUrl.href, expectedIntent = window.xprops.intent, expectedCurrency = window.xprops.currency;
                                    if (intent !== expectedIntent) throw new Error("Expected intent from order api call to be " + expectedIntent + ", got " + intent + ". Please ensure you are passing " + sdk_constants_src.i.INTENT + "=" + intent + " to the sdk");
                                    if (currency && currency !== expectedCurrency) throw new Error("Expected currency from order api call to be " + expectedCurrency + ", got " + currency + ". Please ensure you are passing " + sdk_constants_src.i.CURRENCY + "=" + currency + " to the sdk");
                                    if (function(orderID) {
                                        return Boolean(orderID.match(/^[A-Z0-9]{17}$/));
                                    }(orderID)) {
                                        if (returnUrl && 0 !== returnUrl.indexOf(constants.e)) throw new Error("Return url is forbidden for smart payment button integration.");
                                        if (cancelUrl && 0 !== cancelUrl.indexOf(constants.e)) throw new Error("Cancel url is forbidden for smart payment button integration.");
                                    }
                                });
                            }(orderID);
                        }).catch(function(err) {
                            return zalgo_promise_src.a.all([ triggerError(err), close() ]);
                        })) : zalgo_promise_src.a.all([ close(), win && win.close() ]).then(src.h);
                    });
                }
            }).finally(function() {
                buttonProcessing = !1, Object(dom.a)(button);
            });
        }, tasks = {};
        return Object(dom.c)().forEach(function(button) {
            var _getSelectedFunding = Object(dom.e)(button), fundingSource = _getSelectedFunding.fundingSource, card = _getSelectedFunding.card, paymentMethodID = _getSelectedFunding.paymentMethodID;
            Object(src.j)(button, function(event) {
                event.preventDefault(), event.stopPropagation(), pay({
                    button: button,
                    fundingSource: fundingSource,
                    card: card,
                    paymentMethodID: paymentMethodID
                });
            });
        }), tasks.remember = zalgo_promise_src.a.try(function() {
            if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) return rememberFunding([ sdk_constants_src.g.VENMO ]);
        }), tasks.getPopupBridge = zalgo_promise_src.a.try(function() {
            if (getPopupBridge) return getPopupBridge().then(function(bridge) {
                popupBridge = bridge;
            });
        }), function() {
            var logger = Object(lib.a)();
            Object(src.f)() && logger.warn("button_child_intranet_mode");
            var xprops = window.xprops;
            if (!xprops) throw new Error("No xprops found");
            Object(src.c)().then(function(pageRenderTime) {
                var _logger$track, fundingSources = [].slice.call(document.querySelectorAll("[" + constants.d.FUNDING_SOURCE + "]")).map(function(el) {
                    return el.getAttribute(constants.d.CARD) || el.getAttribute(constants.d.FUNDING_SOURCE);
                }).filter(function(source) {
                    return source && source !== sdk_constants_src.g.CARD;
                }), layout = xprops.style && xprops.style.layout;
                logger.track(((_logger$track = {})[sdk_constants_src.d.TRANSITION] = constants.h.BUTTON_LOAD, 
                _logger$track[sdk_constants_src.d.FUNDING_LIST] = fundingSources.join(":"), _logger$track[sdk_constants_src.d.FUNDING_COUNT] = fundingSources.length.toString(), 
                _logger$track[sdk_constants_src.d.PAGE_LOAD_TIME] = pageRenderTime ? pageRenderTime.toString() : "", 
                _logger$track[sdk_constants_src.d.BUTTON_LAYOUT] = layout, _logger$track)), logger.flush();
            });
        }(), tasks.setupCheckout = function() {
            checkoutOpen = !1;
            var _ref = [ Object(cross_domain_utils_src.b)(window), Object(cross_domain_utils_src.c)(window) ], parent = _ref[0], top = _ref[1], tasks = {};
            return top && parent && parent !== top && (tasks.canRenderTo = window.paypal.Checkout.canRenderTo(top).then(function(result) {
                canRenderTop = result;
            })), zalgo_promise_src.a.hash(tasks).then(src.h);
        }(), init = onInit(), tasks.onInit = init.promise, tasks.prerender = tasks.onInit.then(function() {
            return getPrerenderDetails().then(function(prerenderDetails) {
                if (prerenderDetails) {
                    var win = prerenderDetails.win, fundingSource = prerenderDetails.fundingSource, card = prerenderDetails.card, button = document.querySelector("[" + constants.d.FUNDING_SOURCE + "=" + fundingSource + "]");
                    if (!button) throw new Error("Can not find button element");
                    return pay({
                        button: button,
                        win: win,
                        fundingSource: fundingSource,
                        card: card
                    });
                }
            });
        }), zalgo_promise_src.a.hash(tasks).then(src.h);
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return setupButton;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
    for (var __WEBPACK_IMPORT_KEY__ in _button__WEBPACK_IMPORTED_MODULE_0__) "default" !== __WEBPACK_IMPORT_KEY__ && function(key) {
        __webpack_require__.d(__webpack_exports__, key, function() {
            return _button__WEBPACK_IMPORTED_MODULE_0__[key];
        });
    }(__WEBPACK_IMPORT_KEY__);
} ]);
//# sourceMappingURL=smart-payment-buttons.js.map