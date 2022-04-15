function _typeof(t) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(t) {
        return typeof t
    }
    : function _typeof(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    ,
    _typeof(t)
}
!function(a) {
    "use strict";
    var t = "6.2.1"
      , r = {
        version: t,
        _plugins: {},
        _uuids: [],
        rtl: function rtl() {
            return "rtl" === a("html").attr("dir")
        },
        plugin: function plugin(t, e) {
            var i = e || functionName(t)
              , n = hyphenate(i);
            this._plugins[n] = this[i] = t
        },
        registerPlugin: function registerPlugin(t, e) {
            var i = e ? hyphenate(e) : functionName(t.constructor).toLowerCase();
            t.uuid = this.GetYoDigits(6, i),
            t.$element.attr("data-" + i) || t.$element.attr("data-" + i, t.uuid),
            t.$element.data("zfPlugin") || t.$element.data("zfPlugin", t),
            t.$element.trigger("init.zf." + i),
            this._uuids.push(t.uuid)
        },
        unregisterPlugin: function unregisterPlugin(t) {
            var e, i = hyphenate(functionName(t.$element.data("zfPlugin").constructor));
            for (e in this._uuids.splice(this._uuids.indexOf(t.uuid), 1),
            t.$element.removeAttr("data-" + i).removeData("zfPlugin").trigger("destroyed.zf." + i),
            t)
                t[e] = null
        },
        reInit: function reInit(t) {
            var e, i, n, o = t instanceof a;
            try {
                o ? t.each(function() {
                    a(this).data("zfPlugin")._init()
                }) : (e = _typeof(t),
                i = this,
                n = {
                    object: function object(t) {
                        t.forEach(function(t) {
                            t = hyphenate(t),
                            a("[data-" + t + "]").foundation("_init")
                        })
                    },
                    string: function string() {
                        t = hyphenate(t),
                        a("[data-" + t + "]").foundation("_init")
                    },
                    undefined: function undefined() {
                        this.object(Object.keys(i._plugins))
                    }
                },
                n[e](t))
            } catch (t) {
                console.error(t)
            } finally {
                return t
            }
        },
        GetYoDigits: function GetYoDigits(t, e) {
            return t = t || 6,
            Math.round(Math.pow(36, t + 1) - Math.random() * Math.pow(36, t)).toString(36).slice(1) + (e ? "-" + e : "")
        },
        reflow: function reflow(o, t) {
            void 0 === t ? t = Object.keys(this._plugins) : "string" == typeof t && (t = [t]);
            var s = this;
            a.each(t, function(t, e) {
                var i = s._plugins[e]
                  , n = a(o).find("[data-" + e + "]").addBack("[data-" + e + "]");
                n.each(function() {
                    var t = a(this)
                      , n = {};
                    if (t.data("zfPlugin"))
                        console.warn("Tried to initialize " + e + " on an element that already has a Foundation plugin.");
                    else {
                        t.attr("data-options") && t.attr("data-options").split(";").forEach(function(t, e) {
                            var i = t.split(":").map(function(t) {
                                return t.trim()
                            });
                            i[0] && (n[i[0]] = parseValue(i[1]))
                        });
                        try {
                            t.data("zfPlugin", new i(a(this),n))
                        } catch (t) {
                            console.error(t)
                        } finally {
                            return
                        }
                    }
                })
            })
        },
        getFnName: functionName,
        transitionend: function transitionend(t) {
            var e, i, n = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            }, o = document.createElement("div");
            for (i in n)
                void 0 !== o.style[i] && (e = n[i]);
            return e || (e = setTimeout(function() {
                t.triggerHandler("transitionend", [t])
            }, 1),
            "transitionend")
        }
    };
    r.util = {
        throttle: function throttle(i, n) {
            var o = null;
            return function() {
                var t = this
                  , e = arguments;
                null === o && (o = setTimeout(function() {
                    i.apply(t, e),
                    o = null
                }, n))
            }
        }
    };
    var e = function foundation(i) {
        var t = _typeof(i)
          , e = a("meta.foundation-mq")
          , n = a(".no-js");
        if (e.length || a('<meta class="foundation-mq">').appendTo(document.head),
        n.length && n.removeClass("no-js"),
        "undefined" === t)
            r.MediaQuery._init(),
            r.reflow(this);
        else {
            if ("string" !== t)
                throw new TypeError("We're sorry, " + t + " is not a valid parameter. You must use a string representing the method you wish to invoke.");
            var o = Array.prototype.slice.call(arguments, 1)
              , s = this.data("zfPlugin");
            if (void 0 === s || void 0 === s[i])
                throw new ReferenceError("We're sorry, '" + i + "' is not an available method for " + (s ? functionName(s) : "this element") + ".");
            1 === this.length ? s[i].apply(s, o) : this.each(function(t, e) {
                s[i].apply(a(e).data("zfPlugin"), o)
            })
        }
        return this
    };
    function functionName(t) {
        if (void 0 !== Function.prototype.name)
            return void 0 === t.prototype ? t.constructor.name : t.prototype.constructor.name;
        var e = /function\s([^(]{1,})\(/
          , i = e.exec(t.toString());
        return i && 1 < i.length ? i[1].trim() : ""
    }
    function parseValue(t) {
        return !!/true/.test(t) || !/false/.test(t) && (isNaN(+t) ? t : parseFloat(t))
    }
    function hyphenate(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }
    window.Foundation = r,
    a.fn.foundation = e,
    function() {
        Date.now && window.Date.now || (window.Date.now = Date.now = function() {
            return (new Date).getTime()
        }
        );
        for (var n, t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
            var i = t[e];
            window.requestAnimationFrame = window[i + "RequestAnimationFrame"],
            window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
        }
        !/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) && window.requestAnimationFrame && window.cancelAnimationFrame || (n = 0,
        window.requestAnimationFrame = function(t) {
            var e = Date.now()
              , i = Math.max(n + 16, e);
            return setTimeout(function() {
                t(n = i)
            }, i - e)
        }
        ,
        window.cancelAnimationFrame = clearTimeout),
        window.performance && window.performance.now || (window.performance = {
            start: Date.now(),
            now: function now() {
                return Date.now() - this.start
            }
        })
    }(),
    Function.prototype.bind || (Function.prototype.bind = function(t) {
        if ("function" != typeof this)
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var e = Array.prototype.slice.call(arguments, 1)
          , i = this
          , n = function fNOP() {}
          , o = function fBound() {
            return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)))
        };
        return this.prototype && (n.prototype = this.prototype),
        o.prototype = new n,
        o
    }
    )
}(jQuery),
function(o) {
    var t = {
        queries: [],
        current: "",
        _init: function _init() {
            var t, e = this, i = o(".foundation-mq").css("font-family"), n = parseStyleToObject(i);
            for (t in n)
                n.hasOwnProperty(t) && e.queries.push({
                    name: t,
                    value: "only screen and (min-width: " + n[t] + ")"
                });
            this.current = this._getCurrentSize(),
            this._watcher()
        },
        atLeast: function atLeast(t) {
            var e = this.get(t);
            return !!e && window.matchMedia(e).matches
        },
        is: function is(t) {
            return t = t.trim().split(" "),
            1 < t.length && "only" === t[1] ? t[0] === this._getCurrentSize() : this.atLeast(t[0])
        },
        get: function get(t) {
            for (var e in this.queries)
                if (this.queries.hasOwnProperty(e)) {
                    var i = this.queries[e];
                    if (t === i.name)
                        return i.value
                }
            return null
        },
        _getCurrentSize: function _getCurrentSize() {
            for (var t, e = 0; e < this.queries.length; e++) {
                var i = this.queries[e];
                window.matchMedia(i.value).matches && (t = i)
            }
            return "object" === _typeof(t) ? t.name : t
        },
        _watcher: function _watcher() {
            var i = this;
            o(window).on("resize.zf.mediaquery", function() {
                var t = i._getCurrentSize()
                  , e = i.current;
                t !== e && (i.current = t,
                o(window).trigger("changed.zf.mediaquery", [t, e]))
            })
        }
    };
    function parseStyleToObject(t) {
        var e = {};
        return "string" != typeof t ? e : (t = t.trim().slice(1, -1),
        t && (e = t.split("&").reduce(function(t, e) {
            var i = e.replace(/\+/g, " ").split("=")
              , n = i[0]
              , o = i[1]
              , n = decodeURIComponent(n)
              , o = void 0 === o ? null : decodeURIComponent(o);
            return t.hasOwnProperty(n) ? Array.isArray(t[n]) ? t[n].push(o) : t[n] = [t[n], o] : t[n] = o,
            t
        }, {})),
        e)
    }
    Foundation.MediaQuery = t,
    window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var i, t, n, e = window.styleMedia || window.media;
        return e || (i = document.createElement("style"),
        t = document.getElementsByTagName("script")[0],
        n = null,
        i.type = "text/css",
        i.id = "matchmediajs-test",
        t && t.parentNode && t.parentNode.insertBefore(i, t),
        n = "getComputedStyle"in window && window.getComputedStyle(i, null) || i.currentStyle,
        e = {
            matchMedium: function matchMedium(t) {
                var e = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                return i.styleSheet ? i.styleSheet.cssText = e : i.textContent = e,
                "1px" === n.width
            }
        }),
        function(t) {
            return {
                matches: e.matchMedium(t || "all"),
                media: t || "all"
            }
        }
    }()),
    Foundation.MediaQuery = t
}(jQuery),
function(l) {
    var i = {
        9: "TAB",
        13: "ENTER",
        27: "ESCAPE",
        32: "SPACE",
        37: "ARROW_LEFT",
        38: "ARROW_UP",
        39: "ARROW_RIGHT",
        40: "ARROW_DOWN"
    }
      , d = {}
      , t = {
        keys: getKeyCodes(i),
        parseKey: function parseKey(t) {
            var e = i[t.which || t.keyCode] || String.fromCharCode(t.which).toUpperCase();
            return t.shiftKey && (e = "SHIFT_" + e),
            t.ctrlKey && (e = "CTRL_" + e),
            t.altKey && (e = "ALT_" + e),
            e
        },
        handleKey: function handleKey(t, e, i) {
            var n, o, s, a = d[e], r = this.parseKey(t);
            if (!a)
                return console.warn("Component not defined!");
            n = void 0 === a.ltr ? a : Foundation.rtl() ? l.extend({}, a.ltr, a.rtl) : l.extend({}, a.rtl, a.ltr),
            o = n[r],
            s = i[o],
            s && "function" == typeof s ? (s.apply(),
            !i.handled && "function" != typeof i.handled || i.handled.apply()) : !i.unhandled && "function" != typeof i.unhandled || i.unhandled.apply()
        },
        findFocusable: function findFocusable(t) {
            return t.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function() {
                return !(!l(this).is(":visible") || l(this).attr("tabindex") < 0)
            })
        },
        register: function register(t, e) {
            d[t] = e
        }
    };
    function getKeyCodes(t) {
        var e, i = {};
        for (e in t)
            i[t[e]] = t[e];
        return i
    }
    Foundation.Keyboard = t
}(jQuery),
function(a) {
    var r = ["mui-enter", "mui-leave"]
      , l = ["mui-enter-active", "mui-leave-active"]
      , t = {
        animateIn: function animateIn(t, e, i) {
            animate(!0, t, e, i)
        },
        animateOut: function animateOut(t, e, i) {
            animate(!1, t, e, i)
        }
    };
    function Move(e, i, n) {
        var o, s, a = null;
        function move(t) {
            a = a || window.performance.now(),
            s = t - a,
            n.apply(i),
            s < e ? o = window.requestAnimationFrame(move, i) : (window.cancelAnimationFrame(o),
            i.trigger("finished.zf.animate", [i]).triggerHandler("finished.zf.animate", [i]))
        }
        o = window.requestAnimationFrame(move)
    }
    function animate(t, e, i, n) {
        var o, s;
        function finish() {
            t || e.hide(),
            reset(),
            n && n.apply(e)
        }
        function reset() {
            e[0].style.transitionDuration = 0,
            e.removeClass(o + " " + s + " " + i)
        }
        e = a(e).eq(0),
        e.length && (o = t ? r[0] : r[1],
        s = t ? l[0] : l[1],
        reset(),
        e.addClass(i).css("transition", "none"),
        requestAnimationFrame(function() {
            e.addClass(o),
            t && e.show()
        }),
        requestAnimationFrame(function() {
            e[0].offsetWidth,
            e.css("transition", "").addClass(s)
        }),
        e.one(Foundation.transitionend(e), finish))
    }
    Foundation.Move = Move,
    Foundation.Motion = t
}(jQuery),
function(a) {
    var t = {
        Feather: function Feather(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? "zf" : arguments[1];
            t.attr("role", "menubar");
            var i = t.find("li").attr({
                role: "menuitem"
            })
              , n = "is-" + e + "-submenu"
              , o = n + "-item"
              , s = "is-" + e + "-submenu-parent";
            t.find("a:first").attr("tabindex", 0),
            i.each(function() {
                var t = a(this)
                  , e = t.children("ul");
                e.length && (t.addClass(s).attr({
                    "aria-haspopup": !0,
                    "aria-expanded": !1,
                    "aria-label": t.children("a:first").text()
                }),
                e.addClass("submenu " + n).attr({
                    "data-submenu": "",
                    "aria-hidden": !0,
                    role: "menu"
                })),
                t.parent("[data-submenu]").length && t.addClass("is-submenu-item " + o)
            })
        },
        Burn: function Burn(t, e) {
            t.find("li").removeAttr("tabindex");
            var i = "is-" + e + "-submenu"
              , n = i + "-item"
              , o = "is-" + e + "-submenu-parent";
            t.find("*").removeClass(i + " " + n + " " + o + " is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "")
        }
    };
    Foundation.Nest = t
}(jQuery),
function() {
    function ImNotTouchingYou(t, e, i, n) {
        var o, s, a, r, l, d = GetDimensions(t);
        l = e ? (o = GetDimensions(e),
        s = d.offset.top + d.height <= o.height + o.offset.top,
        a = d.offset.top >= o.offset.top,
        r = d.offset.left >= o.offset.left,
        d.offset.left + d.width <= o.width) : (s = d.offset.top + d.height <= d.windowDims.height + d.windowDims.offset.top,
        a = d.offset.top >= d.windowDims.offset.top,
        r = d.offset.left >= d.windowDims.offset.left,
        d.offset.left + d.width <= d.windowDims.width);
        var u = [s, a, r, l];
        return i ? r === l == !0 : n ? a === s == !0 : -1 === u.indexOf(!1)
    }
    function GetDimensions(t, e) {
        if (t = t.length ? t[0] : t,
        t === window || t === document)
            throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        var i = t.getBoundingClientRect()
          , n = t.parentNode.getBoundingClientRect()
          , o = document.body.getBoundingClientRect()
          , s = window.pageYOffset
          , a = window.pageXOffset;
        return {
            width: i.width,
            height: i.height,
            offset: {
                top: i.top + s,
                left: i.left + a
            },
            parentDims: {
                width: n.width,
                height: n.height,
                offset: {
                    top: n.top + s,
                    left: n.left + a
                }
            },
            windowDims: {
                width: o.width,
                height: o.height,
                offset: {
                    top: s,
                    left: a
                }
            }
        }
    }
    function GetOffsets(t, e, i, n, o, s) {
        var a = GetDimensions(t)
          , r = e ? GetDimensions(e) : null;
        switch (i) {
        case "top":
            return {
                left: Foundation.rtl() ? r.offset.left - a.width + r.width : r.offset.left,
                top: r.offset.top - (a.height + n)
            };
        case "left":
            return {
                left: r.offset.left - (a.width + o),
                top: r.offset.top
            };
        case "right":
            return {
                left: r.offset.left + r.width + o,
                top: r.offset.top
            };
        case "center top":
            return {
                left: r.offset.left + r.width / 2 - a.width / 2,
                top: r.offset.top - (a.height + n)
            };
        case "center bottom":
            return {
                left: s ? o : r.offset.left + r.width / 2 - a.width / 2,
                top: r.offset.top + r.height + n
            };
        case "center left":
            return {
                left: r.offset.left - (a.width + o),
                top: r.offset.top + r.height / 2 - a.height / 2
            };
        case "center right":
            return {
                left: r.offset.left + r.width + o + 1,
                top: r.offset.top + r.height / 2 - a.height / 2
            };
        case "center":
            return {
                left: a.windowDims.offset.left + a.windowDims.width / 2 - a.width / 2,
                top: a.windowDims.offset.top + a.windowDims.height / 2 - a.height / 2
            };
        case "reveal":
            return {
                left: (a.windowDims.width - a.width) / 2,
                top: a.windowDims.offset.top + n
            };
        case "reveal full":
            return {
                left: a.windowDims.offset.left,
                top: a.windowDims.offset.top
            };
        case "left bottom":
            return {
                left: r.offset.left - (a.width + o),
                top: r.offset.top + r.height
            };
        case "right bottom":
            return {
                left: r.offset.left + r.width + o - a.width,
                top: r.offset.top + r.height
            };
        default:
            return {
                left: Foundation.rtl() ? r.offset.left - a.width + r.width : r.offset.left,
                top: r.offset.top + r.height + n
            }
        }
    }
    Foundation.Box = {
        ImNotTouchingYou: ImNotTouchingYou,
        GetDimensions: GetDimensions,
        GetOffsets: GetOffsets
    }
}(jQuery),
function(o) {
    var s = function() {
        for (var t = ["WebKit", "Moz", "O", "Ms", ""], e = 0; e < t.length; e++)
            if (t[e] + "MutationObserver"in window)
                return window[t[e] + "MutationObserver"];
        return !1
    }()
      , e = function triggers(e, i) {
        e.data(i).split(" ").forEach(function(t) {
            o("#" + t)["close" === i ? "trigger" : "triggerHandler"](i + ".zf.trigger", [e])
        })
    };
    function checkListeners() {
        eventsListener(),
        resizeListener(),
        scrollListener(),
        closemeListener()
    }
    function closemeListener(t) {
        var e, i = o("[data-yeti-box]"), n = ["dropdown", "tooltip", "reveal"];
        t && ("string" == typeof t ? n.push(t) : "object" === _typeof(t) && "string" == typeof t[0] ? n.concat(t) : console.error("Plugin names must be strings")),
        i.length && (e = n.map(function(t) {
            return "closeme.zf." + t
        }).join(" "),
        o(window).off(e).on(e, function(t, e) {
            var i = t.namespace.split(".")[0]
              , n = o("[data-" + i + "]").not('[data-yeti-box="' + e + '"]');
            n.each(function() {
                var t = o(this);
                t.triggerHandler("close.zf.trigger", [t])
            })
        }))
    }
    function resizeListener(e) {
        var i = void 0
          , n = o("[data-resize]");
        n.length && o(window).off("resize.zf.trigger").on("resize.zf.trigger", function(t) {
            i && clearTimeout(i),
            i = setTimeout(function() {
                s || n.each(function() {
                    o(this).triggerHandler("resizeme.zf.trigger")
                }),
                n.attr("data-events", "resize")
            }, e || 10)
        })
    }
    function scrollListener(e) {
        var i = void 0
          , n = o("[data-scroll]");
        n.length && o(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function(t) {
            i && clearTimeout(i),
            i = setTimeout(function() {
                s || n.each(function() {
                    o(this).triggerHandler("scrollme.zf.trigger")
                }),
                n.attr("data-events", "scroll")
            }, e || 10)
        })
    }
    function eventsListener() {
        if (!s)
            return !1;
        var t = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]")
          , e = function listeningElementsMutation(t) {
            var e = o(t[0].target);
            switch (e.attr("data-events")) {
            case "resize":
                e.triggerHandler("resizeme.zf.trigger", [e]);
                break;
            case "scroll":
                e.triggerHandler("scrollme.zf.trigger", [e, window.pageYOffset]);
                break;
            default:
                return !1
            }
        };
        if (t.length)
            for (var i = 0; i <= t.length - 1; i++) {
                var n = new s(e);
                n.observe(t[i], {
                    attributes: !0,
                    childList: !1,
                    characterData: !1,
                    subtree: !1,
                    attributeFilter: ["data-events"]
                })
            }
    }
    o(document).on("click.zf.trigger", "[data-open]", function() {
        e(o(this), "open")
    }),
    o(document).on("click.zf.trigger", "[data-close]", function() {
        var t = o(this).data("close");
        t ? e(o(this), "close") : o(this).trigger("close.zf.trigger")
    }),
    o(document).on("click.zf.trigger", "[data-toggle]", function() {
        e(o(this), "toggle")
    }),
    o(document).on("close.zf.trigger", "[data-closable]", function(t) {
        t.stopPropagation();
        var e = o(this).data("closable");
        "" !== e ? Foundation.Motion.animateOut(o(this), e, function() {
            o(this).trigger("closed.zf")
        }) : o(this).fadeOut().trigger("closed.zf")
    }),
    o(document).on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", function() {
        var t = o(this).data("toggle-focus");
        o("#" + t).triggerHandler("toggle.zf.trigger", [o(this)])
    }),
    o(window).on("load", function() {
        checkListeners()
    }),
    Foundation.IHearYou = checkListeners
}(jQuery),
function(n) {
    function Timer(e, t, i) {
        var n, o, s = this, a = t.duration, r = Object.keys(e.data())[0] || "timer", l = -1;
        this.isPaused = !1,
        this.restart = function() {
            l = -1,
            clearTimeout(o),
            this.start()
        }
        ,
        this.start = function() {
            this.isPaused = !1,
            clearTimeout(o),
            l = l <= 0 ? a : l,
            e.data("paused", !1),
            n = Date.now(),
            o = setTimeout(function() {
                t.infinite && s.restart(),
                i()
            }, l),
            e.trigger("timerstart.zf." + r)
        }
        ,
        this.pause = function() {
            this.isPaused = !0,
            clearTimeout(o),
            e.data("paused", !0);
            var t = Date.now();
            l -= t - n,
            e.trigger("timerpaused.zf." + r)
        }
    }
    function onImagesLoaded(t, e) {
        var i = t.length;
        function singleImageLoaded() {
            i--,
            0 === i && e()
        }
        0 === i && e(),
        t.each(function() {
            this.complete || void 0 !== this.naturalWidth && 0 < this.naturalWidth ? singleImageLoaded() : n(this).one("load", function() {
                singleImageLoaded()
            })
        })
    }
    Foundation.Timer = Timer,
    Foundation.onImagesLoaded = onImagesLoaded
}(jQuery),
function(o) {
    o.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart"in document.documentElement,
        preventDefault: !1,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var s, a, r, l = !1;
    function onTouchEnd() {
        this.removeEventListener("touchmove", onTouchMove),
        this.removeEventListener("touchend", onTouchEnd),
        l = !1
    }
    function onTouchMove(t) {
        var e, i, n;
        o.spotSwipe.preventDefault && t.preventDefault(),
        l && (e = t.touches[0].pageX,
        t.touches[0].pageY,
        i = s - e,
        r = (new Date).getTime() - a,
        Math.abs(i) >= o.spotSwipe.moveThreshold && r <= o.spotSwipe.timeThreshold && (n = 0 < i ? "left" : "right"),
        n && (t.preventDefault(),
        onTouchEnd.call(this),
        o(this).trigger("swipe", n).trigger("swipe" + n)))
    }
    function onTouchStart(t) {
        1 == t.touches.length && (s = t.touches[0].pageX,
        t.touches[0].pageY,
        l = !0,
        a = (new Date).getTime(),
        this.addEventListener("touchmove", onTouchMove, !1),
        this.addEventListener("touchend", onTouchEnd, !1))
    }
    function init() {
        this.addEventListener && this.addEventListener("touchstart", onTouchStart, !1)
    }
    o.event.special.swipe = {
        setup: init
    },
    o.each(["left", "up", "down", "right"], function() {
        o.event.special["swipe" + this] = {
            setup: function setup() {
                o(this).on("swipe", o.noop)
            }
        }
    })
}(jQuery),
function(n) {
    n.fn.addTouch = function() {
        this.each(function(t, e) {
            n(e).bind("touchstart touchmove touchend touchcancel", function() {
                i(event)
            })
        });
        var i = function handleTouch(t) {
            var e, i = t.changedTouches, n = i[0], o = {
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }, s = o[t.type];
            "MouseEvent"in window && "function" == typeof window.MouseEvent ? e = window.MouseEvent(s, {
                bubbles: !0,
                cancelable: !0,
                screenX: n.screenX,
                screenY: n.screenY,
                clientX: n.clientX,
                clientY: n.clientY
            }) : (e = document.createEvent("MouseEvent"),
            e.initMouseEvent(s, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null)),
            n.target.dispatchEvent(e)
        }
    }
}(jQuery);
var _createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(a) {
    var t = (_createClass(Drilldown, [{
        key: "_init",
        value: function _init() {
            this.$submenuAnchors = this.$element.find("li.is-drilldown-submenu-parent").children("a"),
            this.$submenus = this.$submenuAnchors.parent("li").children("[data-submenu]"),
            this.$menuItems = this.$element.find("li").not(".js-drilldown-back").attr("role", "menuitem").find("a"),
            this._prepareMenu(),
            this._keyboardEvents()
        }
    }, {
        key: "_prepareMenu",
        value: function _prepareMenu() {
            var i = this;
            this.$submenuAnchors.each(function() {
                var t = a(this)
                  , e = t.find("a:first");
                i.options.parentLink && e.clone().prependTo(t.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>'),
                e.data("savedHref", e.attr("href")).removeAttr("href"),
                t.children("[data-submenu]").attr({
                    "aria-hidden": !0,
                    tabindex: 0,
                    role: "menu"
                }),
                i._events(t)
            }),
            this.$submenus.each(function() {
                var t = a(this)
                  , e = t.find(".js-drilldown-back");
                e.length || t.prepend(i.options.backButton),
                i._back(t)
            }),
            this.$element.parent().hasClass("is-drilldown") || (this.$wrapper = a(this.options.wrapper).addClass("is-drilldown").css(this._getMaxDims()),
            this.$element.wrap(this.$wrapper))
        }
    }, {
        key: "_events",
        value: function _events(i) {
            var n = this;
            i.off("click.zf.drilldown").on("click.zf.drilldown", function(t) {
                var e;
                a(t.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent") && (t.stopImmediatePropagation(),
                t.preventDefault()),
                n._show(i.parent("li")),
                n.options.closeOnClick && (e = a("body").not(n.$wrapper),
                e.off(".zf.drilldown").on("click.zf.drilldown", function(t) {
                    t.preventDefault(),
                    n._hideAll(),
                    e.off(".zf.drilldown")
                }))
            })
        }
    }, {
        key: "_keyboardEvents",
        value: function _keyboardEvents() {
            var s = this;
            this.$menuItems.add(this.$element.find(".js-drilldown-back > a")).on("keydown.zf.drilldown", function(t) {
                var e, i, n = a(this), o = n.parent("li").parent("ul").children("li").children("a");
                o.each(function(t) {
                    if (a(this).is(n))
                        return e = o.eq(Math.max(0, t - 1)),
                        void (i = o.eq(Math.min(t + 1, o.length - 1)))
                }),
                Foundation.Keyboard.handleKey(t, "Drilldown", {
                    next: function next() {
                        n.is(s.$submenuAnchors) && (s._show(n.parent("li")),
                        n.parent("li").one(Foundation.transitionend(n), function() {
                            n.parent("li").find("ul li a").filter(s.$menuItems).first().focus()
                        }),
                        t.preventDefault())
                    },
                    previous: function previous() {
                        s._hide(n.parent("li").parent("ul")),
                        n.parent("li").parent("ul").one(Foundation.transitionend(n), function() {
                            setTimeout(function() {
                                n.parent("li").parent("ul").parent("li").children("a").first().focus()
                            }, 1)
                        }),
                        t.preventDefault()
                    },
                    up: function up() {
                        e.focus(),
                        t.preventDefault()
                    },
                    down: function down() {
                        i.focus(),
                        t.preventDefault()
                    },
                    close: function close() {
                        s._back()
                    },
                    open: function open() {
                        n.is(s.$menuItems) ? n.is(s.$submenuAnchors) && (s._show(n.parent("li")),
                        n.parent("li").one(Foundation.transitionend(n), function() {
                            n.parent("li").find("ul li a").filter(s.$menuItems).first().focus()
                        }),
                        t.preventDefault()) : (s._hide(n.parent("li").parent("ul")),
                        n.parent("li").parent("ul").one(Foundation.transitionend(n), function() {
                            setTimeout(function() {
                                n.parent("li").parent("ul").parent("li").children("a").first().focus()
                            }, 1)
                        }),
                        t.preventDefault())
                    },
                    handled: function handled() {
                        t.stopImmediatePropagation()
                    }
                })
            })
        }
    }, {
        key: "_hideAll",
        value: function _hideAll() {
            var e = this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");
            e.one(Foundation.transitionend(e), function(t) {
                e.removeClass("is-active is-closing")
            }),
            this.$element.trigger("closed.zf.drilldown")
        }
    }, {
        key: "_back",
        value: function _back(e) {
            var i = this;
            e.off("click.zf.drilldown"),
            e.children(".js-drilldown-back").on("click.zf.drilldown", function(t) {
                t.stopImmediatePropagation(),
                i._hide(e)
            })
        }
    }, {
        key: "_menuLinkEvents",
        value: function _menuLinkEvents() {
            var e = this;
            this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown", function(t) {
                setTimeout(function() {
                    e._hideAll()
                }, 0)
            })
        }
    }, {
        key: "_show",
        value: function _show(t) {
            t.children("[data-submenu]").addClass("is-active"),
            this.$element.trigger("open.zf.drilldown", [t])
        }
    }, {
        key: "_hide",
        value: function _hide(t) {
            t.addClass("is-closing").one(Foundation.transitionend(t), function() {
                t.removeClass("is-active is-closing"),
                t.blur()
            }),
            t.trigger("hide.zf.drilldown", [t])
        }
    }, {
        key: "_getMaxDims",
        value: function _getMaxDims() {
            var e = 0
              , t = {};
            return this.$submenus.add(this.$element).each(function() {
                var t = a(this).children("li").length;
                e = e < t ? t : e
            }),
            t["min-height"] = e * this.$menuItems[0].getBoundingClientRect().height + "px",
            t["max-width"] = this.$element[0].getBoundingClientRect().width + "px",
            t
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._hideAll(),
            Foundation.Nest.Burn(this.$element, "drilldown"),
            this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role").off(".zf.drilldown").end().off("zf.drilldown"),
            this.$element.find("a").each(function() {
                var t = a(this);
                t.data("savedHref") && t.attr("href", t.data("savedHref")).removeData("savedHref")
            }),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Drilldown);
    function Drilldown(t, e) {
        _classCallCheck(this, Drilldown),
        this.$element = t,
        this.options = a.extend({}, Drilldown.defaults, this.$element.data(), e),
        Foundation.Nest.Feather(this.$element, "drilldown"),
        this._init(),
        Foundation.registerPlugin(this, "Drilldown"),
        Foundation.Keyboard.register("Drilldown", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close",
            TAB: "down",
            SHIFT_TAB: "up"
        })
    }
    t.defaults = {
        backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
        wrapper: "<div></div>",
        parentLink: !1,
        closeOnClick: !1
    },
    Foundation.plugin(t, "Drilldown")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(c) {
    var t = (_createClass(DropdownMenu, [{
        key: "_init",
        value: function _init() {
            var t = this.$element.find("li.is-dropdown-submenu-parent");
            this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"),
            this.$menuItems = this.$element.find('[role="menuitem"]'),
            this.$tabs = this.$element.children('[role="menuitem"]'),
            this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass),
            this.$element.hasClass(this.options.rightClass) || "right" === this.options.alignment || Foundation.rtl() || this.$element.parents(".top-bar-right").is("*") ? (this.options.alignment = "right",
            t.addClass("opens-left")) : t.addClass("opens-right"),
            this.changed = !1,
            this._events()
        }
    }, {
        key: "_events",
        value: function _events() {
            var h = this
              , o = "ontouchstart"in window || void 0 !== window.ontouchstart
              , s = "is-dropdown-submenu-parent";
            (this.options.clickOpen || o) && this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu", function(t) {
                var e = c(t.target).parentsUntil("ul", "." + s)
                  , i = e.hasClass(s)
                  , n = "true" === e.attr("data-is-click");
                e.children(".is-dropdown-submenu");
                if (i)
                    if (n) {
                        if (!h.options.closeOnClick || !h.options.clickOpen && !o || h.options.forceFollow && o)
                            return;
                        t.stopImmediatePropagation(),
                        t.preventDefault(),
                        h._hide(e)
                    } else
                        t.preventDefault(),
                        t.stopImmediatePropagation(),
                        h._show(e.children(".is-dropdown-submenu")),
                        e.add(e.parentsUntil(h.$element, "." + s)).attr("data-is-click", !0)
            }),
            this.options.disableHover || this.$menuItems.on("mouseenter.zf.dropdownmenu", function(t) {
                t.stopImmediatePropagation();
                var e = c(this)
                  , i = e.hasClass(s);
                i && (clearTimeout(h.delay),
                h.delay = setTimeout(function() {
                    h._show(e.children(".is-dropdown-submenu"))
                }, h.options.hoverDelay))
            }).on("mouseleave.zf.dropdownmenu", function(t) {
                var e = c(this)
                  , i = e.hasClass(s);
                if (i && h.options.autoclose) {
                    if ("true" === e.attr("data-is-click") && h.options.clickOpen)
                        return !1;
                    clearTimeout(h.delay),
                    h.delay = setTimeout(function() {
                        h._hide(e)
                    }, h.options.closingTime)
                }
            }),
            this.$menuItems.on("keydown.zf.dropdownmenu", function(t) {
                var e, i, n = c(t.target).parentsUntil("ul", '[role="menuitem"]'), o = -1 < h.$tabs.index(n), s = o ? h.$tabs : n.siblings("li").add(n);
                s.each(function(t) {
                    if (c(this).is(n))
                        return e = s.eq(t - 1),
                        void (i = s.eq(t + 1))
                });
                var a = function nextSibling() {
                    n.is(":last-child") || i.children("a:first").focus()
                }
                  , r = function prevSibling() {
                    e.children("a:first").focus()
                }
                  , l = function openSub() {
                    var t = n.children("ul.is-dropdown-submenu");
                    t.length && (h._show(t),
                    n.find("li > a:first").focus())
                }
                  , d = function closeSub() {
                    var t = n.parent("ul").parent("li");
                    t.children("a:first").focus(),
                    h._hide(t)
                }
                  , u = {
                    open: l,
                    close: function close() {
                        h._hide(h.$element),
                        h.$menuItems.find("a:first").focus()
                    },
                    handled: function handled() {
                        t.preventDefault(),
                        t.stopImmediatePropagation()
                    }
                };
                o ? h.vertical ? "left" === h.options.alignment ? c.extend(u, {
                    down: a,
                    up: r,
                    next: l,
                    previous: d
                }) : c.extend(u, {
                    down: a,
                    up: r,
                    next: d,
                    previous: l
                }) : c.extend(u, {
                    next: a,
                    previous: r,
                    down: l,
                    up: d
                }) : "left" === h.options.alignment ? c.extend(u, {
                    next: l,
                    previous: d,
                    down: a,
                    up: r
                }) : c.extend(u, {
                    next: d,
                    previous: l,
                    down: a,
                    up: r
                }),
                Foundation.Keyboard.handleKey(t, "DropdownMenu", u)
            })
        }
    }, {
        key: "_addBodyHandler",
        value: function _addBodyHandler() {
            var i = c(document.body)
              , n = this;
            i.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu", function(t) {
                var e = n.$element.find(t.target);
                e.length || (n._hide(),
                i.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))
            })
        }
    }, {
        key: "_show",
        value: function _show(i) {
            var t = this.$tabs.index(this.$tabs.filter(function(t, e) {
                return 0 < c(e).find(i).length
            }))
              , e = i.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
            this._hide(e, t),
            i.css("visibility", "hidden").addClass("js-dropdown-active").attr({
                "aria-hidden": !1
            }).parent("li.is-dropdown-submenu-parent").addClass("is-active").attr({
                "aria-expanded": !0
            });
            var n, o, s = Foundation.Box.ImNotTouchingYou(i, null, !0);
            s || (n = "left" === this.options.alignment ? "-right" : "-left",
            o = i.parent(".is-dropdown-submenu-parent"),
            o.removeClass("opens" + n).addClass("opens-" + this.options.alignment),
            s = Foundation.Box.ImNotTouchingYou(i, null, !0),
            s || o.removeClass("opens-" + this.options.alignment).addClass("opens-inner"),
            this.changed = !0),
            i.css("visibility", ""),
            this.options.closeOnClick && this._addBodyHandler(),
            this.$element.trigger("show.zf.dropdownmenu", [i])
        }
    }, {
        key: "_hide",
        value: function _hide(t, i) {
            var e, n = t && t.length ? t : void 0 !== i ? this.$tabs.not(function(t, e) {
                return t === i
            }) : this.$element, o = n.hasClass("is-active") || 0 < n.find(".is-active").length;
            o && (n.find("li.is-active").add(n).attr({
                "aria-expanded": !1,
                "data-is-click": !1
            }).removeClass("is-active"),
            n.find("ul.js-dropdown-active").attr({
                "aria-hidden": !0
            }).removeClass("js-dropdown-active"),
            (this.changed || n.find("opens-inner").length) && (e = "left" === this.options.alignment ? "right" : "left",
            n.find("li.is-dropdown-submenu-parent").add(n).removeClass("opens-inner opens-" + this.options.alignment).addClass("opens-" + e),
            this.changed = !1),
            this.$element.trigger("hide.zf.dropdownmenu", [n]))
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"),
            c(document.body).off(".zf.dropdownmenu"),
            Foundation.Nest.Burn(this.$element, "dropdown"),
            Foundation.unregisterPlugin(this)
        }
    }]),
    DropdownMenu);
    function DropdownMenu(t, e) {
        _classCallCheck(this, DropdownMenu),
        this.$element = t,
        this.options = c.extend({}, DropdownMenu.defaults, this.$element.data(), e),
        Foundation.Nest.Feather(this.$element, "dropdown"),
        this._init(),
        Foundation.registerPlugin(this, "DropdownMenu"),
        Foundation.Keyboard.register("DropdownMenu", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "up",
            ARROW_DOWN: "down",
            ARROW_LEFT: "previous",
            ESCAPE: "close"
        })
    }
    t.defaults = {
        disableHover: !1,
        autoclose: !0,
        hoverDelay: 50,
        clickOpen: !1,
        closingTime: 500,
        alignment: "left",
        closeOnClick: !0,
        verticalClass: "vertical",
        rightClass: "align-right",
        forceFollow: !0
    },
    Foundation.plugin(t, "DropdownMenu")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(n) {
    var t = (_createClass(Magellan, [{
        key: "_init",
        value: function _init() {
            var t = this.$element[0].id || Foundation.GetYoDigits(6, "magellan");
            this.$targets = n("[data-magellan-target]"),
            this.$links = this.$element.find("a"),
            this.$element.attr({
                "data-resize": t,
                "data-scroll": t,
                id: t
            }),
            this.$active = n(),
            this.scrollPos = parseInt(window.pageYOffset, 10),
            this._events()
        }
    }, {
        key: "calcPoints",
        value: function calcPoints() {
            var i = this
              , t = document.body
              , e = document.documentElement;
            this.points = [],
            this.winHeight = Math.round(Math.max(window.innerHeight, e.clientHeight)),
            this.docHeight = Math.round(Math.max(t.scrollHeight, t.offsetHeight, e.clientHeight, e.scrollHeight, e.offsetHeight)),
            this.$targets.each(function() {
                var t = n(this)
                  , e = Math.round(t.offset().top - i.options.threshold);
                t.targetPoint = e,
                i.points.push(e)
            })
        }
    }, {
        key: "_events",
        value: function _events() {
            var i = this;
            n("html, body"),
            i.options.animationDuration,
            i.options.animationEasing;
            n(window).one("load", function() {
                i.options.deepLinking && location.hash && i.scrollToLoc(location.hash),
                i.calcPoints(),
                i._updateActive()
            }),
            this.$element.on({
                "resizeme.zf.trigger": this.reflow.bind(this),
                "scrollme.zf.trigger": this._updateActive.bind(this)
            }).on("click.zf.magellan", 'a[href^="#"]', function(t) {
                t.preventDefault();
                var e = this.getAttribute("href");
                i.scrollToLoc(e)
            })
        }
    }, {
        key: "scrollToLoc",
        value: function scrollToLoc(t) {
            var e = Math.round(n(t).offset().top - this.options.threshold / 2 - this.options.barOffset);
            n("html, body").stop(!0).animate({
                scrollTop: e
            }, this.options.animationDuration, this.options.animationEasing)
        }
    }, {
        key: "reflow",
        value: function reflow() {
            this.calcPoints(),
            this._updateActive()
        }
    }, {
        key: "_updateActive",
        value: function _updateActive() {
            var i, n, t, e, o, s = parseInt(window.pageYOffset, 10);
            e = s + this.winHeight === this.docHeight ? this.points.length - 1 : s < this.points[0] ? 0 : (i = this.scrollPos < s,
            n = this,
            t = this.points.filter(function(t, e) {
                return i ? t <= s : t - n.options.threshold <= s
            }),
            t.length ? t.length - 1 : 0),
            this.$active.removeClass(this.options.activeClass),
            this.$active = this.$links.eq(e).addClass(this.options.activeClass),
            this.options.deepLinking && (o = this.$active[0].getAttribute("href"),
            window.history.pushState ? window.history.pushState(null, null, o) : window.location.hash = o),
            this.scrollPos = s,
            this.$element.trigger("update.zf.magellan", [this.$active])
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var t;
            this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass),
            this.options.deepLinking && (t = this.$active[0].getAttribute("href"),
            window.location.hash.replace(t, "")),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Magellan);
    function Magellan(t, e) {
        _classCallCheck(this, Magellan),
        this.$element = t,
        this.options = n.extend({}, Magellan.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Magellan")
    }
    t.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "active",
        deepLinking: !1,
        barOffset: 0
    },
    Foundation.plugin(t, "Magellan")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(a) {
    var t = (_createClass(ResponsiveMenu, [{
        key: "_init",
        value: function _init() {
            if ("string" == typeof this.rules) {
                for (var t = {}, e = this.rules.split(" "), i = 0; i < e.length; i++) {
                    var n = e[i].split("-")
                      , o = 1 < n.length ? n[0] : "small"
                      , s = 1 < n.length ? n[1] : n[0];
                    null !== r[s] && (t[o] = r[s])
                }
                this.rules = t
            }
            a.isEmptyObject(this.rules) || this._checkMediaQueries()
        }
    }, {
        key: "_events",
        value: function _events() {
            var t = this;
            a(window).on("changed.zf.mediaquery", function() {
                t._checkMediaQueries()
            })
        }
    }, {
        key: "_checkMediaQueries",
        value: function _checkMediaQueries() {
            var e, i = this;
            a.each(this.rules, function(t) {
                Foundation.MediaQuery.atLeast(t) && (e = t)
            }),
            e && (this.currentPlugin instanceof this.rules[e].plugin || (a.each(r, function(t, e) {
                i.$element.removeClass(e.cssClass)
            }),
            this.$element.addClass(this.rules[e].cssClass),
            this.currentPlugin && this.currentPlugin.destroy(),
            this.currentPlugin = new this.rules[e].plugin(this.$element,{})))
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.currentPlugin.destroy(),
            a(window).off(".zf.ResponsiveMenu"),
            Foundation.unregisterPlugin(this)
        }
    }]),
    ResponsiveMenu);
    function ResponsiveMenu(t, e) {
        _classCallCheck(this, ResponsiveMenu),
        this.$element = a(t),
        this.rules = this.$element.data("responsive-menu"),
        this.currentMq = null,
        this.currentPlugin = null,
        this._init(),
        this._events(),
        Foundation.registerPlugin(this, "ResponsiveMenu")
    }
    t.defaults = {};
    var r = {
        dropdown: {
            cssClass: "dropdown",
            plugin: Foundation._plugins["dropdown-menu"] || null
        },
        drilldown: {
            cssClass: "drilldown",
            plugin: Foundation._plugins.drilldown || null
        },
        accordion: {
            cssClass: "accordion-menu",
            plugin: Foundation._plugins["accordion-menu"] || null
        }
    };
    Foundation.plugin(t, "ResponsiveMenu")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(a) {
    var t = (_createClass(Accordion, [{
        key: "_init",
        value: function _init() {
            this.$element.attr("role", "tablist"),
            this.$tabs = this.$element.children("li, [data-accordion-item]"),
            this.$tabs.each(function(t, e) {
                var i = a(e)
                  , n = i.children("[data-tab-content]")
                  , o = n[0].id || Foundation.GetYoDigits(6, "accordion")
                  , s = e.id || o + "-label";
                i.find("a:first").attr({
                    "aria-controls": o,
                    role: "tab",
                    id: s,
                    "aria-expanded": !1,
                    "aria-selected": !1
                }),
                n.attr({
                    role: "tabpanel",
                    "aria-labelledby": s,
                    "aria-hidden": !0,
                    id: o
                })
            });
            var t = this.$element.find(".is-active").children("[data-tab-content]");
            t.length && this.down(t, !0),
            this._events()
        }
    }, {
        key: "_events",
        value: function _events() {
            var n = this;
            this.$tabs.each(function() {
                var e = a(this)
                  , i = e.children("[data-tab-content]");
                i.length && e.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function(t) {
                    t.preventDefault(),
                    e.hasClass("is-active") ? (n.options.allowAllClosed || e.siblings().hasClass("is-active")) && n.up(i) : n.down(i)
                }).on("keydown.zf.accordion", function(t) {
                    Foundation.Keyboard.handleKey(t, "Accordion", {
                        toggle: function toggle() {
                            n.toggle(i)
                        },
                        next: function next() {
                            var t = e.next().find("a").focus();
                            n.options.multiExpand || t.trigger("click.zf.accordion")
                        },
                        previous: function previous() {
                            var t = e.prev().find("a").focus();
                            n.options.multiExpand || t.trigger("click.zf.accordion")
                        },
                        handled: function handled() {
                            t.preventDefault(),
                            t.stopPropagation()
                        }
                    })
                })
            })
        }
    }, {
        key: "toggle",
        value: function toggle(t) {
            if (t.parent().hasClass("is-active")) {
                if (!this.options.allowAllClosed && !t.parent().siblings().hasClass("is-active"))
                    return;
                this.up(t)
            } else
                this.down(t)
        }
    }, {
        key: "down",
        value: function down(t, e) {
            var i, n = this;
            this.options.multiExpand || e || (i = this.$element.children(".is-active").children("[data-tab-content]"),
            i.length && this.up(i)),
            t.attr("aria-hidden", !1).parent("[data-tab-content]").addBack().parent().addClass("is-active"),
            t.slideDown(this.options.slideSpeed, function() {
                n.$element.trigger("down.zf.accordion", [t])
            }),
            a("#" + t.attr("aria-labelledby")).attr({
                "aria-expanded": !0,
                "aria-selected": !0
            })
        }
    }, {
        key: "up",
        value: function up(t) {
            var e = t.parent().siblings()
              , i = this
              , n = this.options.multiExpand ? e.hasClass("is-active") : t.parent().hasClass("is-active");
            (this.options.allowAllClosed || n) && (t.slideUp(i.options.slideSpeed, function() {
                i.$element.trigger("up.zf.accordion", [t])
            }),
            t.attr("aria-hidden", !0).parent().removeClass("is-active"),
            a("#" + t.attr("aria-labelledby")).attr({
                "aria-expanded": !1,
                "aria-selected": !1
            }))
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$element.find("[data-tab-content]").slideUp(0).css("display", ""),
            this.$element.find("a").off(".zf.accordion"),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Accordion);
    function Accordion(t, e) {
        _classCallCheck(this, Accordion),
        this.$element = t,
        this.options = a.extend({}, Accordion.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Accordion"),
        Foundation.Keyboard.register("Accordion", {
            ENTER: "toggle",
            SPACE: "toggle",
            ARROW_DOWN: "next",
            ARROW_UP: "previous"
        })
    }
    t.defaults = {
        slideSpeed: 250,
        multiExpand: !1,
        allowAllClosed: !1
    },
    Foundation.plugin(t, "Accordion")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(o) {
    var t = (_createClass(Dropdown, [{
        key: "_init",
        value: function _init() {
            var t = this.$element.attr("id");
            this.$anchor = o('[data-toggle="' + t + '"]') || o('[data-open="' + t + '"]'),
            this.$anchor.attr({
                "aria-controls": t,
                "data-is-focus": !1,
                "data-yeti-box": t,
                "aria-haspopup": !0,
                "aria-expanded": !1
            }),
            this.options.positionClass = this.getPositionClass(),
            this.counter = 4,
            this.usedPositions = [],
            this.$element.attr({
                "aria-hidden": "true",
                "data-yeti-box": t,
                "data-resize": t,
                "aria-labelledby": this.$anchor[0].id || Foundation.GetYoDigits(6, "dd-anchor")
            }),
            this._events()
        }
    }, {
        key: "getPositionClass",
        value: function getPositionClass() {
            var t = this.$element[0].className.match(/(top|left|right|bottom)/g)
              , t = t ? t[0] : ""
              , e = /float-(.+)\s/.exec(this.$anchor[0].className)
              , e = e ? e[1] : ""
              , i = e ? e + " " + t : t;
            return i
        }
    }, {
        key: "_reposition",
        value: function _reposition(t) {
            this.usedPositions.push(t || "bottom"),
            !t && this.usedPositions.indexOf("top") < 0 ? this.$element.addClass("top") : "top" === t && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(t) : "left" === t && this.usedPositions.indexOf("right") < 0 ? this.$element.removeClass(t).addClass("right") : "right" === t && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(t).addClass("left") : !t && -1 < this.usedPositions.indexOf("top") && this.usedPositions.indexOf("left") < 0 ? this.$element.addClass("left") : "top" === t && -1 < this.usedPositions.indexOf("bottom") && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(t).addClass("left") : ("left" === t && -1 < this.usedPositions.indexOf("right") && this.usedPositions.indexOf("bottom") < 0 || "right" === t && -1 < this.usedPositions.indexOf("left") && this.usedPositions.indexOf("bottom"),
            this.$element.removeClass(t)),
            this.classChanged = !0,
            this.counter--
        }
    }, {
        key: "_setPosition",
        value: function _setPosition() {
            if ("false" === this.$anchor.attr("aria-expanded"))
                return !1;
            var t = this.getPositionClass()
              , e = Foundation.Box.GetDimensions(this.$element)
              , i = (Foundation.Box.GetDimensions(this.$anchor),
            "left" === t || "right" === t ? "left" : "top")
              , n = "top" === i ? "height" : "width";
            "height" === n ? this.options.vOffset : this.options.hOffset;
            if (e.width >= e.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.$element))
                return this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
                    width: e.windowDims.width - 2 * this.options.hOffset,
                    height: "auto"
                }),
                this.classChanged = !0,
                !1;
            for (this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, t, this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.$element, !1, !0) && this.counter; )
                this._reposition(t),
                this._setPosition()
        }
    }, {
        key: "_events",
        value: function _events() {
            var n = this;
            this.$element.on({
                "open.zf.trigger": this.open.bind(this),
                "close.zf.trigger": this.close.bind(this),
                "toggle.zf.trigger": this.toggle.bind(this),
                "resizeme.zf.trigger": this._setPosition.bind(this)
            }),
            this.options.hover && (this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                clearTimeout(n.timeout),
                n.timeout = setTimeout(function() {
                    n.open(),
                    n.$anchor.data("hover", !0)
                }, n.options.hoverDelay)
            }).on("mouseleave.zf.dropdown", function() {
                clearTimeout(n.timeout),
                n.timeout = setTimeout(function() {
                    n.close(),
                    n.$anchor.data("hover", !1)
                }, n.options.hoverDelay)
            }),
            this.options.hoverPane && this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function() {
                clearTimeout(n.timeout)
            }).on("mouseleave.zf.dropdown", function() {
                clearTimeout(n.timeout),
                n.timeout = setTimeout(function() {
                    n.close(),
                    n.$anchor.data("hover", !1)
                }, n.options.hoverDelay)
            })),
            this.$anchor.add(this.$element).on("keydown.zf.dropdown", function(t) {
                var e = o(this)
                  , i = Foundation.Keyboard.findFocusable(n.$element);
                Foundation.Keyboard.handleKey(t, "Dropdown", {
                    tab_forward: function tab_forward() {
                        n.$element.find(":focus").is(i.eq(-1)) && (n.options.trapFocus ? (i.eq(0).focus(),
                        t.preventDefault()) : n.close())
                    },
                    tab_backward: function tab_backward() {
                        (n.$element.find(":focus").is(i.eq(0)) || n.$element.is(":focus")) && (n.options.trapFocus ? (i.eq(-1).focus(),
                        t.preventDefault()) : n.close())
                    },
                    open: function open() {
                        e.is(n.$anchor) && (n.open(),
                        n.$element.attr("tabindex", -1).focus(),
                        t.preventDefault())
                    },
                    close: function close() {
                        n.close(),
                        n.$anchor.focus()
                    }
                })
            })
        }
    }, {
        key: "_addBodyHandler",
        value: function _addBodyHandler() {
            var e = o(document.body).not(this.$element)
              , i = this;
            e.off("click.zf.dropdown").on("click.zf.dropdown", function(t) {
                i.$anchor.is(t.target) || i.$anchor.find(t.target).length || i.$element.find(t.target).length || (i.close(),
                e.off("click.zf.dropdown"))
            })
        }
    }, {
        key: "open",
        value: function open() {
            var t;
            this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id")),
            this.$anchor.addClass("hover").attr({
                "aria-expanded": !0
            }),
            this._setPosition(),
            this.$element.addClass("is-open").attr({
                "aria-hidden": !1
            }),
            this.options.autoFocus && (t = Foundation.Keyboard.findFocusable(this.$element),
            t.length && t.eq(0).focus()),
            this.options.closeOnClick && this._addBodyHandler(),
            this.$element.trigger("show.zf.dropdown", [this.$element])
        }
    }, {
        key: "close",
        value: function close() {
            if (!this.$element.hasClass("is-open"))
                return !1;
            var t;
            this.$element.removeClass("is-open").attr({
                "aria-hidden": !0
            }),
            this.$anchor.removeClass("hover").attr("aria-expanded", !1),
            this.classChanged && (t = this.getPositionClass(),
            t && this.$element.removeClass(t),
            this.$element.addClass(this.options.positionClass).css({
                height: "",
                width: ""
            }),
            this.classChanged = !1,
            this.counter = 4,
            this.usedPositions.length = 0),
            this.$element.trigger("hide.zf.dropdown", [this.$element])
        }
    }, {
        key: "toggle",
        value: function toggle() {
            if (this.$element.hasClass("is-open")) {
                if (this.$anchor.data("hover"))
                    return;
                this.close()
            } else
                this.open()
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$element.off(".zf.trigger").hide(),
            this.$anchor.off(".zf.dropdown"),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Dropdown);
    function Dropdown(t, e) {
        _classCallCheck(this, Dropdown),
        this.$element = t,
        this.options = o.extend({}, Dropdown.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Dropdown"),
        Foundation.Keyboard.register("Dropdown", {
            ENTER: "open",
            SPACE: "open",
            ESCAPE: "close",
            TAB: "tab_forward",
            SHIFT_TAB: "tab_backward"
        })
    }
    t.defaults = {
        hoverDelay: 250,
        hover: !1,
        hoverPane: !1,
        vOffset: 1,
        hOffset: 1,
        positionClass: "",
        trapFocus: !1,
        autoFocus: !1,
        closeOnClick: !1
    },
    Foundation.plugin(t, "Dropdown")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(r) {
    var t = (_createClass(Tabs, [{
        key: "_init",
        value: function _init() {
            var t, n = this, a = this;
            this.$element.attr({
                role: "tablist"
            }),
            this.$tabTitles = this.$element.find("." + this.options.linkClass),
            this.$tabContent = r('[data-tabs-content="' + this.$element[0].id + '"]'),
            this.$tabTitles.each(function() {
                var t = r(this)
                  , e = t.find("a")
                  , i = t.hasClass("" + a.options.linkActiveClass)
                  , n = e[0].hash.slice(1)
                  , o = e[0].id ? e[0].id : n + "-label"
                  , s = r("#" + n);
                t.attr({
                    role: "presentation"
                }),
                e.attr({
                    role: "tab",
                    "aria-controls": n,
                    "aria-selected": i,
                    id: o
                }),
                s.attr({
                    role: "tabpanel",
                    "aria-hidden": !i,
                    "aria-labelledby": o
                }),
                i && a.options.autoFocus && r(window).on("load", function() {
                    r("html, body").animate({
                        scrollTop: t.offset().top
                    }, a.options.deepLinkSmudgeDelay, function() {
                        e.focus()
                    })
                })
            }),
            this.options.matchHeight && (t = this.$tabContent.find("img"),
            t.length ? Foundation.onImagesLoaded(t, this._setHeight.bind(this)) : this._setHeight()),
            this._checkDeepLink = function() {
                var t, e, i = window.location.hash;
                i.length && (t = n.$element.find('[href="' + i + '"]'),
                t.length && (n.selectTab(r(i), !0),
                n.options.deepLinkSmudge && (e = n.$element.offset(),
                r("html, body").animate({
                    scrollTop: e.top
                }, n.options.deepLinkSmudgeDelay)),
                n.$element.trigger("deeplink.zf.tabs", [t, r(i)])))
            }
            ,
            this.options.deepLink && this._checkDeepLink(),
            this._events()
        }
    }, {
        key: "_events",
        value: function _events() {
            this._addKeyHandler(),
            this._addClickHandler(),
            this._setHeightMqHandler = null,
            this.options.matchHeight && (this._setHeightMqHandler = this._setHeight.bind(this),
            r(window).on("changed.zf.mediaquery", this._setHeightMqHandler)),
            this.options.deepLink && r(window).on("popstate", this._checkDeepLink)
        }
    }, {
        key: "_addClickHandler",
        value: function _addClickHandler() {
            var e = this;
            this.$element.off("click.zf.tabs").on("click.zf.tabs", "." + this.options.linkClass, function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                e._handleTabChange(r(this))
            })
        }
    }, {
        key: "_addKeyHandler",
        value: function _addKeyHandler() {
            var s = this;
            this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", function(t) {
                var e, i, n, o;
                9 !== t.which && (e = r(this),
                i = e.parent("ul").children("li"),
                i.each(function(t) {
                    r(this).is(e) && (o = s.options.wrapOnKeys ? (n = 0 === t ? i.last() : i.eq(t - 1),
                    t === i.length - 1 ? i.first() : i.eq(t + 1)) : (n = i.eq(Math.max(0, t - 1)),
                    i.eq(Math.min(t + 1, i.length - 1))))
                }),
                Foundation.Keyboard.handleKey(t, "Tabs", {
                    open: function open() {
                        e.find('[role="tab"]').focus(),
                        s._handleTabChange(e)
                    },
                    previous: function previous() {
                        n.find('[role="tab"]').focus(),
                        s._handleTabChange(n)
                    },
                    next: function next() {
                        o.find('[role="tab"]').focus(),
                        s._handleTabChange(o)
                    },
                    handled: function handled() {
                        t.stopPropagation(),
                        t.preventDefault()
                    }
                }))
            })
        }
    }, {
        key: "_handleTabChange",
        value: function _handleTabChange(t, e) {
            var i, n, o, s, a;
            t.hasClass("" + this.options.linkActiveClass) ? this.options.activeCollapse && (this._collapseTab(t),
            this.$element.trigger("collapse.zf.tabs", [t])) : (i = this.$element.find("." + this.options.linkClass + "." + this.options.linkActiveClass),
            n = t.find('[role="tab"]'),
            o = n[0].hash,
            s = this.$tabContent.find(o),
            this._collapseTab(i),
            this._openTab(t),
            this.options.deepLink && !e && (a = t.find("a").attr("href"),
            this.options.updateHistory ? history.pushState({}, "", a) : history.replaceState({}, "", a)),
            this.$element.trigger("change.zf.tabs", [t, s]),
            s.find("[data-mutate]").trigger("mutateme.zf.trigger"))
        }
    }, {
        key: "_openTab",
        value: function _openTab(t) {
            var e = t.find('[role="tab"]')
              , i = e[0].hash
              , n = this.$tabContent.find(i);
            t.addClass("" + this.options.linkActiveClass),
            e.attr({
                "aria-selected": "true"
            }),
            n.addClass("" + this.options.panelActiveClass).attr({
                "aria-hidden": "false"
            })
        }
    }, {
        key: "_collapseTab",
        value: function _collapseTab(t) {
            var e = t.removeClass("" + this.options.linkActiveClass).find('[role="tab"]').attr({
                "aria-selected": "false"
            });
            r("#" + e.attr("aria-controls")).removeClass("" + this.options.panelActiveClass).attr({
                "aria-hidden": "true"
            })
        }
    }, {
        key: "selectTab",
        value: function selectTab(t, e) {
            var i = "object" === _typeof(t) ? t[0].id : t;
            i.indexOf("#") < 0 && (i = "#" + i);
            var n = this.$tabTitles.find('[href="' + i + '"]').parent("." + this.options.linkClass);
            this._handleTabChange(n, e)
        }
    }, {
        key: "_setHeight",
        value: function _setHeight() {
            var n = 0
              , o = this;
            this.$tabContent.find("." + this.options.panelClass).css("height", "").each(function() {
                var t = r(this)
                  , e = t.hasClass("" + o.options.panelActiveClass);
                e || t.css({
                    visibility: "hidden",
                    display: "block"
                });
                var i = this.getBoundingClientRect().height;
                e || t.css({
                    visibility: "",
                    display: ""
                }),
                n = n < i ? i : n
            }).css("height", n + "px")
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$element.find("." + this.options.linkClass).off(".zf.tabs").hide().end().find("." + this.options.panelClass).hide(),
            this.options.matchHeight && null != this._setHeightMqHandler && r(window).off("changed.zf.mediaquery", this._setHeightMqHandler),
            this.options.deepLink && r(window).off("popstate", this._checkDeepLink),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Tabs);
    function Tabs(t, e) {
        _classCallCheck(this, Tabs),
        this.$element = t,
        this.options = r.extend({}, Tabs.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Tabs"),
        Foundation.Keyboard.register("Tabs", {
            ENTER: "open",
            SPACE: "open",
            ARROW_RIGHT: "next",
            ARROW_UP: "previous",
            ARROW_DOWN: "next",
            ARROW_LEFT: "previous"
        })
    }
    t.defaults = {
        deepLink: !1,
        deepLinkSmudge: !1,
        deepLinkSmudgeDelay: 300,
        updateHistory: !1,
        autoFocus: !1,
        wrapOnKeys: !0,
        matchHeight: !1,
        activeCollapse: !1,
        linkClass: "tabs-title",
        linkActiveClass: "is-active",
        panelClass: "tabs-panel",
        panelActiveClass: "is-active"
    },
    Foundation.plugin(t, "Tabs")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(n) {
    var t = (_createClass(Tooltip, [{
        key: "_init",
        value: function _init() {
            var t = this.$element.attr("aria-describedby") || Foundation.GetYoDigits(6, "tooltip");
            this.options.positionClass = this._getPositionClass(this.$element),
            this.options.tipText = this.options.tipText || this.$element.attr("title"),
            this.template = this.options.template ? n(this.options.template) : this._buildTemplate(t),
            this.template.appendTo(document.body).html(this.options.tipText).hide(),
            this.$element.attr({
                title: "",
                "aria-describedby": t,
                "data-yeti-box": t,
                "data-toggle": t,
                "data-resize": t
            }).addClass(this.triggerClass),
            this.usedPositions = [],
            this.counter = 4,
            this.classChanged = !1,
            this._events()
        }
    }, {
        key: "_getPositionClass",
        value: function _getPositionClass(t) {
            if (!t)
                return "";
            var e = t[0].className.match(/\b(top|left|right)\b/g)
              , e = e ? e[0] : "";
            return e
        }
    }, {
        key: "_buildTemplate",
        value: function _buildTemplate(t) {
            var e = (this.options.tooltipClass + " " + this.options.positionClass + " " + this.options.templateClasses).trim()
              , i = n("<div></div>").addClass(e).attr({
                role: "tooltip",
                "aria-hidden": !0,
                "data-is-active": !1,
                "data-is-focus": !1,
                id: t
            });
            return i
        }
    }, {
        key: "_reposition",
        value: function _reposition(t) {
            this.usedPositions.push(t || "bottom"),
            !t && this.usedPositions.indexOf("top") < 0 ? this.template.addClass("top") : "top" === t && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : "left" === t && this.usedPositions.indexOf("right") < 0 ? this.template.removeClass(t).addClass("right") : "right" === t && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : !t && -1 < this.usedPositions.indexOf("top") && this.usedPositions.indexOf("left") < 0 ? this.template.addClass("left") : "top" === t && -1 < this.usedPositions.indexOf("bottom") && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : ("left" === t && -1 < this.usedPositions.indexOf("right") && this.usedPositions.indexOf("bottom") < 0 || "right" === t && -1 < this.usedPositions.indexOf("left") && this.usedPositions.indexOf("bottom"),
            this.template.removeClass(t)),
            this.classChanged = !0,
            this.counter--
        }
    }, {
        key: "_setPosition",
        value: function _setPosition() {
            var t = this._getPositionClass(this.template)
              , e = Foundation.Box.GetDimensions(this.template)
              , i = Foundation.Box.GetDimensions(this.$element)
              , n = "left" === t || "right" === t ? "left" : "top"
              , o = "top" === n ? "height" : "width";
            "height" === o ? this.options.vOffset : this.options.hOffset;
            if (e.width >= e.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template))
                return this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
                    width: i.windowDims.width - 2 * this.options.hOffset,
                    height: "auto"
                }),
                !1;
            for (this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center " + (t || "bottom"), this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.template) && this.counter; )
                this._reposition(t),
                this._setPosition()
        }
    }, {
        key: "show",
        value: function show() {
            if ("all" !== this.options.showOn && !Foundation.MediaQuery.atLeast(this.options.showOn))
                return !1;
            var t = this;
            this.template.css("visibility", "hidden").show(),
            this._setPosition(),
            this.$element.trigger("closeme.zf.tooltip", this.template.attr("id")),
            this.template.attr({
                "data-is-active": !0,
                "aria-hidden": !1
            }),
            t.isActive = !0,
            this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function() {}),
            this.$element.trigger("show.zf.tooltip")
        }
    }, {
        key: "hide",
        value: function hide() {
            var t = this;
            this.template.stop().attr({
                "aria-hidden": !0,
                "data-is-active": !1
            }).fadeOut(this.options.fadeOutDuration, function() {
                t.isActive = !1,
                t.isClick = !1,
                t.classChanged && (t.template.removeClass(t._getPositionClass(t.template)).addClass(t.options.positionClass),
                t.usedPositions = [],
                t.counter = 4,
                t.classChanged = !1)
            }),
            this.$element.trigger("hide.zf.tooltip")
        }
    }, {
        key: "_events",
        value: function _events() {
            var e = this
              , i = (this.template,
            !1);
            this.options.disableHover || this.$element.on("mouseenter.zf.tooltip", function(t) {
                e.isActive || (e.timeout = setTimeout(function() {
                    e.show()
                }, e.options.hoverDelay))
            }).on("mouseleave.zf.tooltip", function(t) {
                clearTimeout(e.timeout),
                i && (e.isClick || !e.options.clickOpen) || e.hide()
            }),
            this.options.clickOpen && this.$element.on("mousedown.zf.tooltip", function(t) {
                t.stopImmediatePropagation(),
                e.isClick ? e.hide() : (e.isClick = !0,
                !e.options.disableHover && e.$element.attr("tabindex") || e.isActive || e.show())
            }),
            this.options.disableForTouch || this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function(t) {
                e.isActive ? e.hide() : e.show()
            }),
            this.$element.on({
                "close.zf.trigger": this.hide.bind(this)
            }),
            this.$element.on("focus.zf.tooltip", function(t) {
                return i = !0,
                !e.isClick && void e.show()
            }).on("focusout.zf.tooltip", function(t) {
                i = !1,
                e.isClick = !1,
                e.hide()
            }).on("resizeme.zf.trigger", function() {
                e.isActive && e._setPosition()
            })
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.isActive ? this.hide() : this.show()
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tootip").removeAttr("aria-describedby").removeAttr("data-yeti-box").removeAttr("data-toggle").removeAttr("data-resize"),
            this.template.remove(),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Tooltip);
    function Tooltip(t, e) {
        _classCallCheck(this, Tooltip),
        this.$element = t,
        this.options = n.extend({}, Tooltip.defaults, this.$element.data(), e),
        this.isActive = !1,
        this.isClick = !1,
        this._init(),
        Foundation.registerPlugin(this, "Tooltip")
    }
    t.defaults = {
        disableForTouch: !1,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: !1,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: !0,
        positionClass: "",
        vOffset: 10,
        hOffset: 12
    },
    Foundation.plugin(t, "Tooltip")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(o) {
    var t = (_createClass(Orbit, [{
        key: "_init",
        value: function _init() {
            this.$wrapper = this.$element.find("." + this.options.containerClass),
            this.$slides = this.$element.find("." + this.options.slideClass);
            var t = this.$element.find("img")
              , e = this.$slides.filter(".is-active");
            e.length || this.$slides.eq(0).addClass("is-active"),
            this.options.useMUI || this.$slides.addClass("no-motionui"),
            t.length ? Foundation.onImagesLoaded(t, this._prepareForOrbit.bind(this)) : this._prepareForOrbit(),
            this.options.bullets && this._loadBullets(),
            this._events(),
            this.options.autoPlay && 1 < this.$slides.length && this.geoSync(),
            this.options.accessible && this.$wrapper.attr("tabindex", 0)
        }
    }, {
        key: "_loadBullets",
        value: function _loadBullets() {
            this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button")
        }
    }, {
        key: "geoSync",
        value: function geoSync() {
            var t = this;
            this.timer = new Foundation.Timer(this.$element,{
                duration: this.options.timerDelay,
                infinite: !1
            },function() {
                t.changeSlide(!0)
            }
            ),
            this.timer.start()
        }
    }, {
        key: "_prepareForOrbit",
        value: function _prepareForOrbit() {
            var e = this;
            this._setWrapperHeight(function(t) {
                e._setSlideHeight(t)
            })
        }
    }, {
        key: "_setWrapperHeight",
        value: function _setWrapperHeight(t) {
            var e, i = 0, n = 0;
            this.$slides.each(function() {
                e = this.getBoundingClientRect().height,
                o(this).attr("data-slide", n),
                n && o(this).css({
                    position: "relative",
                    display: "none"
                }),
                i = i < e ? e : i,
                n++
            }),
            n === this.$slides.length && (this.$wrapper.css({
                height: i
            }),
            t(i))
        }
    }, {
        key: "_setSlideHeight",
        value: function _setSlideHeight(t) {
            this.$slides.each(function() {
                o(this).css("max-height", t)
            })
        }
    }, {
        key: "_events",
        value: function _events() {
            var t, n = this;
            1 < this.$slides.length && (this.options.swipe && this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function(t) {
                t.preventDefault(),
                n.changeSlide(!0)
            }).on("swiperight.zf.orbit", function(t) {
                t.preventDefault(),
                n.changeSlide(!1)
            }),
            this.options.autoPlay && (this.$slides.on("click.zf.orbit", function() {
                n.$element.data("clickedOn", !n.$element.data("clickedOn")),
                n.timer[n.$element.data("clickedOn") ? "pause" : "start"]()
            }),
            this.options.pauseOnHover && this.$element.on("mouseenter.zf.orbit", function() {
                n.timer.pause()
            }).on("mouseleave.zf.orbit", function() {
                n.$element.data("clickedOn") || n.timer.start()
            })),
            this.options.navButtons && (t = this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass),
            t.attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function(t) {
                t.preventDefault(),
                n.changeSlide(o(this).hasClass(n.options.nextClass))
            })),
            this.options.bullets && this.$bullets.on("click.zf.orbit touchend.zf.orbit", function() {
                if (/is-active/g.test(this.className))
                    return !1;
                var t = o(this).data("slide")
                  , e = t > n.$slides.filter(".is-active").data("slide")
                  , i = n.$slides.eq(t);
                n.changeSlide(e, i, t)
            }),
            this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function(t) {
                Foundation.Keyboard.handleKey(t, "Orbit", {
                    next: function next() {
                        n.changeSlide(!0)
                    },
                    previous: function previous() {
                        n.changeSlide(!1)
                    },
                    handled: function handled() {
                        o(t.target).is(n.$bullets) && n.$bullets.filter(".is-active").focus()
                    }
                })
            }))
        }
    }, {
        key: "changeSlide",
        value: function changeSlide(t, e, i) {
            var n = this.$slides.filter(".is-active").eq(0);
            if (/mui/g.test(n[0].className))
                return !1;
            var o = this.$slides.first()
              , s = this.$slides.last()
              , a = t ? "Right" : "Left"
              , r = t ? "Left" : "Right"
              , l = this
              , d = e || (t ? !this.options.infiniteWrap || n.next("." + this.options.slideClass).length ? n.next("." + this.options.slideClass) : o : !this.options.infiniteWrap || n.prev("." + this.options.slideClass).length ? n.prev("." + this.options.slideClass) : s);
            d.length && (this.options.bullets && (i = i || this.$slides.index(d),
            this._updateBullets(i)),
            this.options.useMUI ? (Foundation.Motion.animateIn(d.addClass("is-active").css({
                position: "absolute",
                top: 0
            }), this.options["animInFrom" + a], function() {
                d.css({
                    position: "relative",
                    display: "block"
                }).attr("aria-live", "polite")
            }),
            Foundation.Motion.animateOut(n.removeClass("is-active"), this.options["animOutTo" + r], function() {
                n.removeAttr("aria-live"),
                l.options.autoPlay && !l.timer.isPaused && l.timer.restart()
            })) : (n.removeClass("is-active is-in").removeAttr("aria-live").hide(),
            d.addClass("is-active is-in").attr("aria-live", "polite").show(),
            this.options.autoPlay && !this.timer.isPaused && this.timer.restart()),
            this.$element.trigger("slidechange.zf.orbit", [d]))
        }
    }, {
        key: "_updateBullets",
        value: function _updateBullets(t) {
            var e = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur()
              , i = e.find("span:last").detach();
            this.$bullets.eq(t).addClass("is-active").append(i)
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Orbit);
    function Orbit(t, e) {
        _classCallCheck(this, Orbit),
        this.$element = t,
        this.options = o.extend({}, Orbit.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Orbit"),
        Foundation.Keyboard.register("Orbit", {
            ltr: {
                ARROW_RIGHT: "next",
                ARROW_LEFT: "previous"
            },
            rtl: {
                ARROW_LEFT: "next",
                ARROW_RIGHT: "previous"
            }
        })
    }
    t.defaults = {
        bullets: !0,
        navButtons: !0,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: !0,
        timerDelay: 5e3,
        infiniteWrap: !0,
        swipe: !0,
        pauseOnHover: !0,
        accessible: !0,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous",
        useMUI: !0
    },
    Foundation.plugin(t, "Orbit")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(d) {
    var t = (_createClass(Sticky, [{
        key: "_init",
        value: function _init() {
            var t = this.$element.parent("[data-sticky-container]")
              , e = this.$element[0].id || Foundation.GetYoDigits(6, "sticky")
              , i = this;
            t.length || (this.wasWrapped = !0),
            this.$container = t.length ? t : d(this.options.container).wrapInner(this.$element),
            this.$container.addClass(this.options.containerClass),
            this.$element.addClass(this.options.stickyClass).attr({
                "data-resize": e
            }),
            this.scrollCount = this.options.checkEvery,
            this.isStuck = !1,
            d(window).one("load.zf.sticky", function() {
                i.containerHeight = "none" == i.$element.css("display") ? 0 : i.$element[0].getBoundingClientRect().height,
                i.$container.css("height", i.containerHeight),
                i.elemHeight = i.containerHeight,
                "" !== i.options.anchor ? i.$anchor = d("#" + i.options.anchor) : i._parsePoints(),
                i._setSizes(function() {
                    var t = window.pageYOffset;
                    i._calc(!1, t),
                    i.isStuck || i._removeSticky(!(t >= i.topPoint))
                }),
                i._events(e.split("-").reverse().join("-"))
            })
        }
    }, {
        key: "_parsePoints",
        value: function _parsePoints() {
            for (var t, e, i, n = "" == this.options.topAnchor ? 1 : this.options.topAnchor, o = "" == this.options.btmAnchor ? document.documentElement.scrollHeight : this.options.btmAnchor, s = [n, o], a = {}, r = 0, l = s.length; r < l && s[r]; r++) {
                "number" == typeof s[r] ? i = s[r] : (t = s[r].split(":"),
                e = d("#" + t[0]),
                i = e.offset().top,
                t[1] && "bottom" === t[1].toLowerCase() && (i += e[0].getBoundingClientRect().height)),
                a[r] = i
            }
            this.points = a
        }
    }, {
        key: "_events",
        value: function _events(i) {
            var n = this
              , o = this.scrollListener = "scroll.zf." + i;
            this.isOn || (this.canStick && (this.isOn = !0,
            d(window).off(o).on(o, function(t) {
                0 === n.scrollCount ? (n.scrollCount = n.options.checkEvery,
                n._setSizes(function() {
                    n._calc(!1, window.pageYOffset)
                })) : (n.scrollCount--,
                n._calc(!1, window.pageYOffset))
            })),
            this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function(t, e) {
                n._setSizes(function() {
                    n._calc(!1),
                    n.canStick ? n.isOn || n._events(i) : n.isOn && n._pauseListeners(o)
                })
            }))
        }
    }, {
        key: "_pauseListeners",
        value: function _pauseListeners(t) {
            this.isOn = !1,
            d(window).off(t),
            this.$element.trigger("pause.zf.sticky")
        }
    }, {
        key: "_calc",
        value: function _calc(t, e) {
            if (t && this._setSizes(),
            !this.canStick)
                return this.isStuck && this._removeSticky(!0),
                !1;
            e = e || window.pageYOffset,
            e >= this.topPoint ? e <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0)
        }
    }, {
        key: "_setSticky",
        value: function _setSticky() {
            var t = this
              , e = this.options.stickTo
              , i = "top" === e ? "marginTop" : "marginBottom"
              , n = "top" === e ? "bottom" : "top"
              , o = {};
            o[i] = this.options[i] + "em",
            o[e] = 0,
            o[n] = "auto",
            this.isStuck = !0,
            this.$element.removeClass("is-anchored is-at-" + n).addClass("is-stuck is-at-" + e).css(o).trigger("sticky.zf.stuckto:" + e),
            this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                t._setSizes()
            })
        }
    }, {
        key: "_removeSticky",
        value: function _removeSticky(t) {
            var e = this.options.stickTo
              , i = "top" === e
              , n = {}
              , o = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight
              , s = i ? "marginTop" : "marginBottom"
              , a = t ? "top" : "bottom";
            n[s] = 0,
            n.bottom = "auto",
            n.top = t ? 0 : o,
            this.isStuck = !1,
            this.$element.removeClass("is-stuck is-at-" + e).addClass("is-anchored is-at-" + a).css(n).trigger("sticky.zf.unstuckfrom:" + a)
        }
    }, {
        key: "_setSizes",
        value: function _setSizes(t) {
            this.canStick = Foundation.MediaQuery.is(this.options.stickyOn),
            this.canStick || t && "function" == typeof t && t();
            var e = this.$container[0].getBoundingClientRect().width
              , i = window.getComputedStyle(this.$container[0])
              , n = parseInt(i["padding-left"], 10)
              , o = parseInt(i["padding-right"], 10);
            this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(),
            this.$element.css({
                "max-width": e - n - o + "px"
            });
            var s, a = this.$element[0].getBoundingClientRect().height || this.containerHeight;
            "none" == this.$element.css("display") && (a = 0),
            this.containerHeight = a,
            this.$container.css({
                height: a
            }),
            this.elemHeight = a,
            this.isStuck || this.$element.hasClass("is-at-bottom") && (s = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight,
            this.$element.css("top", s)),
            this._setBreakPoints(a, function() {
                t && "function" == typeof t && t()
            })
        }
    }, {
        key: "_setBreakPoints",
        value: function _setBreakPoints(t, e) {
            if (!this.canStick) {
                if (!e || "function" != typeof e)
                    return !1;
                e()
            }
            var i = emCalc(this.options.marginTop)
              , n = emCalc(this.options.marginBottom)
              , o = this.points ? this.points[0] : this.$anchor.offset().top
              , s = this.points ? this.points[1] : o + this.anchorHeight
              , a = window.innerHeight;
            "top" === this.options.stickTo ? (o -= i,
            s -= t + i) : "bottom" === this.options.stickTo && (o -= a - (t + n),
            s -= a - n),
            this.topPoint = o,
            this.bottomPoint = s,
            e && "function" == typeof e && e()
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._removeSticky(!0),
            this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
                height: "",
                top: "",
                bottom: "",
                "max-width": ""
            }).off("resizeme.zf.trigger"),
            this.$anchor && this.$anchor.length && this.$anchor.off("change.zf.sticky"),
            d(window).off(this.scrollListener),
            this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({
                height: ""
            }),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Sticky);
    function Sticky(t, e) {
        _classCallCheck(this, Sticky),
        this.$element = t,
        this.options = d.extend({}, Sticky.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Sticky")
    }
    function emCalc(t) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * t
    }
    t.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    },
    Foundation.plugin(t, "Sticky")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(i) {
    var t = (_createClass(Toggler, [{
        key: "_init",
        value: function _init() {
            var t;
            this.options.animate ? (t = this.options.animate.split(" "),
            this.animationIn = t[0],
            this.animationOut = t[1] || null) : (t = this.$element.data("toggler"),
            this.className = "." === t[0] ? t.slice(1) : t);
            var e = this.$element[0].id;
            i('[data-open="' + e + '"], [data-close="' + e + '"], [data-toggle="' + e + '"]').attr("aria-controls", e),
            this.$element.attr("aria-expanded", !this.$element.is(":hidden"))
        }
    }, {
        key: "_events",
        value: function _events() {
            this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this))
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]()
        }
    }, {
        key: "_toggleClass",
        value: function _toggleClass() {
            this.$element.toggleClass(this.className);
            var t = this.$element.hasClass(this.className);
            t ? this.$element.trigger("on.zf.toggler") : this.$element.trigger("off.zf.toggler"),
            this._updateARIA(t)
        }
    }, {
        key: "_toggleAnimate",
        value: function _toggleAnimate() {
            var t = this;
            this.$element.is(":hidden") ? Foundation.Motion.animateIn(this.$element, this.animationIn, function() {
                t._updateARIA(!0),
                this.trigger("on.zf.toggler")
            }) : Foundation.Motion.animateOut(this.$element, this.animationOut, function() {
                t._updateARIA(!1),
                this.trigger("off.zf.toggler")
            })
        }
    }, {
        key: "_updateARIA",
        value: function _updateARIA(t) {
            this.$element.attr("aria-expanded", !!t)
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$element.off(".zf.toggler"),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Toggler);
    function Toggler(t, e) {
        _classCallCheck(this, Toggler),
        this.$element = t,
        this.options = i.extend({}, Toggler.defaults, t.data(), e),
        this.className = "",
        this._init(),
        this._events(),
        Foundation.registerPlugin(this, "Toggler")
    }
    t.defaults = {
        animate: !1
    },
    Foundation.plugin(t, "Toggler")
}(jQuery);
_createClass = function() {
    function defineProperties(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(t, e, i) {
        return e && defineProperties(t.prototype, e),
        i && defineProperties(t, i),
        t
    }
}();
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
!function(h) {
    var t = (_createClass(Equalizer, [{
        key: "_init",
        value: function _init() {
            var t = this.$element.attr("data-equalizer") || ""
              , e = this.$element.find('[data-equalizer-watch="' + t + '"]');
            this.$watched = e.length ? e : this.$element.find("[data-equalizer-watch]"),
            this.$element.attr("data-resize", t || Foundation.GetYoDigits(6, "eq")),
            this.hasNested = 0 < this.$element.find("[data-equalizer]").length,
            this.isNested = 0 < this.$element.parentsUntil(document.body, "[data-equalizer]").length,
            this.isOn = !1;
            var i, n = this.$element.find("img");
            this.options.equalizeOn ? (i = this._checkMQ(),
            h(window).on("changed.zf.mediaquery", this._checkMQ.bind(this))) : this._events(),
            (void 0 !== i && !1 === i || void 0 === i) && (n.length ? Foundation.onImagesLoaded(n, this._reflow.bind(this)) : this._reflow())
        }
    }, {
        key: "_pauseEvents",
        value: function _pauseEvents() {
            this.isOn = !1,
            this.$element.off(".zf.equalizer resizeme.zf.trigger")
        }
    }, {
        key: "_events",
        value: function _events() {
            var e = this;
            this._pauseEvents(),
            this.hasNested ? this.$element.on("postequalized.zf.equalizer", function(t) {
                t.target !== e.$element[0] && e._reflow()
            }) : this.$element.on("resizeme.zf.trigger", this._reflow.bind(this)),
            this.isOn = !0
        }
    }, {
        key: "_checkMQ",
        value: function _checkMQ() {
            var t = !Foundation.MediaQuery.atLeast(this.options.equalizeOn);
            return t ? this.isOn && (this._pauseEvents(),
            this.$watched.css("height", "auto")) : this.isOn || this._events(),
            t
        }
    }, {
        key: "_killswitch",
        value: function _killswitch() {}
    }, {
        key: "_reflow",
        value: function _reflow() {
            if (!this.options.equalizeOnStack && this._isStacked())
                return this.$watched.css("height", "auto"),
                !1;
            this.options.equalizeByRow ? this.getHeightsByRow(this.applyHeightByRow.bind(this)) : this.getHeights(this.applyHeight.bind(this))
        }
    }, {
        key: "_isStacked",
        value: function _isStacked() {
            return this.$watched[0].offsetTop !== this.$watched[1].offsetTop
        }
    }, {
        key: "getHeights",
        value: function getHeights(t) {
            for (var e = [], i = 0, n = this.$watched.length; i < n; i++)
                this.$watched[i].style.height = "auto",
                e.push(this.$watched[i].offsetHeight);
            t(e)
        }
    }, {
        key: "getHeightsByRow",
        value: function getHeightsByRow(t) {
            var e = this.$watched.length ? this.$watched.first().offset().top : 0
              , i = []
              , n = 0;
            i[n] = [];
            for (var o = 0, s = this.$watched.length; o < s; o++) {
                this.$watched[o].style.height = "auto";
                var a = h(this.$watched[o]).offset().top;
                a != e && (n++,
                i[n] = [],
                e = a),
                i[n].push([this.$watched[o], this.$watched[o].offsetHeight])
            }
            for (var r = 0, l = i.length; r < l; r++) {
                var d = h(i[r]).map(function() {
                    return this[1]
                }).get()
                  , u = Math.max.apply(null, d);
                i[r].push(u)
            }
            t(i)
        }
    }, {
        key: "applyHeight",
        value: function applyHeight(t) {
            var e = Math.max.apply(null, t);
            this.$element.trigger("preequalized.zf.equalizer"),
            this.$watched.css("height", e),
            this.$element.trigger("postequalized.zf.equalizer")
        }
    }, {
        key: "applyHeightByRow",
        value: function applyHeightByRow(t) {
            this.$element.trigger("preequalized.zf.equalizer");
            for (var e = 0, i = t.length; e < i; e++) {
                var n = t[e].length
                  , o = t[e][n - 1];
                if (n <= 2)
                    h(t[e][0][0]).css({
                        height: "auto"
                    });
                else {
                    this.$element.trigger("preequalizedrow.zf.equalizer");
                    for (var s = 0, a = n - 1; s < a; s++)
                        h(t[e][s][0]).css({
                            height: o
                        });
                    this.$element.trigger("postequalizedrow.zf.equalizer")
                }
            }
            this.$element.trigger("postequalized.zf.equalizer")
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._pauseEvents(),
            this.$watched.css("height", "auto"),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Equalizer);
    function Equalizer(t, e) {
        _classCallCheck(this, Equalizer),
        this.$element = t,
        this.options = h.extend({}, Equalizer.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Equalizer")
    }
    t.defaults = {
        equalizeOnStack: !0,
        equalizeByRow: !1,
        equalizeOn: ""
    },
    Foundation.plugin(t, "Equalizer")
}(jQuery),
function(s) {
    var t = (_createClass(Abide, [{
        key: "_init",
        value: function _init() {
            this.$inputs = this.$element.find("input, textarea, select"),
            this._events()
        }
    }, {
        key: "_events",
        value: function _events() {
            var e = this;
            this.$element.off(".abide").on("reset.zf.abide", function() {
                e.resetForm()
            }).on("submit.zf.abide", function() {
                return e.validateForm()
            }),
            "fieldChange" === this.options.validateOn && this.$inputs.off("change.zf.abide").on("change.zf.abide", function(t) {
                e.validateInput(s(t.target))
            }),
            this.options.liveValidate && this.$inputs.off("input.zf.abide").on("input.zf.abide", function(t) {
                e.validateInput(s(t.target))
            })
        }
    }, {
        key: "_reflow",
        value: function _reflow() {
            this._init()
        }
    }, {
        key: "requiredCheck",
        value: function requiredCheck(t) {
            if (!t.attr("required"))
                return !0;
            var e = !0;
            switch (t[0].type) {
            case "checkbox":
                e = t[0].checked;
                break;
            case "select":
            case "select-one":
            case "select-multiple":
                var i = t.find("option:selected");
                i.length && i.val() || (e = !1);
                break;
            default:
                t.val() && t.val().length || (e = !1)
            }
            return e
        }
    }, {
        key: "findFormError",
        value: function findFormError(t) {
            var e = t.siblings(this.options.formErrorSelector);
            return e.length || (e = t.parent().find(this.options.formErrorSelector)),
            e
        }
    }, {
        key: "findLabel",
        value: function findLabel(t) {
            var e = t[0].id
              , i = this.$element.find('label[for="' + e + '"]');
            return i.length ? i : t.closest("label")
        }
    }, {
        key: "findRadioLabels",
        value: function findRadioLabels(t) {
            var o = this
              , e = t.map(function(t, e) {
                var i = e.id
                  , n = o.$element.find('label[for="' + i + '"]');
                return n.length || (n = s(e).closest("label")),
                n[0]
            });
            return s(e)
        }
    }, {
        key: "addErrorClasses",
        value: function addErrorClasses(t) {
            var e = this.findLabel(t)
              , i = this.findFormError(t);
            e.length && e.addClass(this.options.labelErrorClass),
            i.length && i.addClass(this.options.formErrorClass),
            t.addClass(this.options.inputErrorClass).attr("data-invalid", "")
        }
    }, {
        key: "removeRadioErrorClasses",
        value: function removeRadioErrorClasses(t) {
            var e = this.$element.find(':radio[name="' + t + '"]')
              , i = this.findRadioLabels(e)
              , n = this.findFormError(e);
            i.length && i.removeClass(this.options.labelErrorClass),
            n.length && n.removeClass(this.options.formErrorClass),
            e.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
        }
    }, {
        key: "removeErrorClasses",
        value: function removeErrorClasses(t) {
            if ("radio" == t[0].type)
                return this.removeRadioErrorClasses(t.attr("name"));
            var e = this.findLabel(t)
              , i = this.findFormError(t);
            e.length && e.removeClass(this.options.labelErrorClass),
            i.length && i.removeClass(this.options.formErrorClass),
            t.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
        }
    }, {
        key: "validateInput",
        value: function validateInput(t) {
            var e = this.requiredCheck(t)
              , i = !1
              , n = !0
              , o = t.attr("data-validator")
              , s = !0;
            if (t.is("[data-abide-ignore]") || t.is('[type="hidden"]'))
                return !0;
            switch (t[0].type) {
            case "radio":
                i = this.validateRadio(t.attr("name"));
                break;
            case "checkbox":
                i = e;
                break;
            case "select":
            case "select-one":
            case "select-multiple":
                i = e;
                break;
            default:
                i = this.validateText(t)
            }
            o && (n = this.matchValidation(t, o, t.attr("required"))),
            t.attr("data-equalto") && (s = this.options.validators.equalTo(t));
            var a = -1 === [e, i, n, s].indexOf(!1)
              , r = (a ? "valid" : "invalid") + ".zf.abide";
            return this[a ? "removeErrorClasses" : "addErrorClasses"](t),
            t.trigger(r, [t]),
            a
        }
    }, {
        key: "validateForm",
        value: function validateForm() {
            var t = []
              , e = this;
            this.$inputs.each(function() {
                t.push(e.validateInput(s(this)))
            });
            var i = -1 === t.indexOf(!1);
            return this.$element.find("[data-abide-error]").css("display", i ? "none" : "block"),
            this.$element.trigger((i ? "formvalid" : "forminvalid") + ".zf.abide", [this.$element]),
            i
        }
    }, {
        key: "validateText",
        value: function validateText(t, e) {
            e = e || t.attr("pattern") || t.attr("type");
            var i = t.val()
              , n = !1;
            return i.length ? n = this.options.patterns.hasOwnProperty(e) ? this.options.patterns[e].test(i) : e === t.attr("type") || new RegExp(e).test(i) : t.prop("required") || (n = !0),
            n
        }
    }, {
        key: "validateRadio",
        value: function validateRadio(t) {
            var e = this.$element.find(':radio[name="' + t + '"]')
              , i = !1
              , n = !1;
            return e.each(function(t, e) {
                s(e).attr("required") && (n = !0)
            }),
            n || (i = !0),
            i || e.each(function(t, e) {
                s(e).prop("checked") && (i = !0)
            }),
            i
        }
    }, {
        key: "matchValidation",
        value: function matchValidation(e, t, i) {
            var n = this;
            i = !!i;
            var o = t.split(" ").map(function(t) {
                return n.options.validators[t](e, i, e.parent())
            });
            return -1 === o.indexOf(!1)
        }
    }, {
        key: "resetForm",
        value: function resetForm() {
            var t = this.$element
              , e = this.options;
            s("." + e.labelErrorClass, t).not("small").removeClass(e.labelErrorClass),
            s("." + e.inputErrorClass, t).not("small").removeClass(e.inputErrorClass),
            s(e.formErrorSelector + "." + e.formErrorClass).removeClass(e.formErrorClass),
            t.find("[data-abide-error]").css("display", "none"),
            s(":input", t).not(":button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]").val("").removeAttr("data-invalid"),
            s(":input:radio", t).not("[data-abide-ignore]").prop("checked", !1).removeAttr("data-invalid"),
            s(":input:checkbox", t).not("[data-abide-ignore]").prop("checked", !1).removeAttr("data-invalid"),
            t.trigger("formreset.zf.abide", [t])
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var t = this;
            this.$element.off(".abide").find("[data-abide-error]").css("display", "none"),
            this.$inputs.off(".abide").each(function() {
                t.removeErrorClasses(s(this))
            }),
            Foundation.unregisterPlugin(this)
        }
    }]),
    Abide);
    function Abide(t) {
        var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
        _classCallCheck(this, Abide),
        this.$element = t,
        this.options = s.extend({}, Abide.defaults, this.$element.data(), e),
        this._init(),
        Foundation.registerPlugin(this, "Abide")
    }
    t.defaults = {
        validateOn: "fieldChange",
        labelErrorClass: "is-invalid-label",
        inputErrorClass: "is-invalid-input",
        formErrorSelector: ".form-error",
        formErrorClass: "is-visible",
        liveValidate: !1,
        patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        },
        validators: {
            equalTo: function equalTo(t, e, i) {
                return s("#" + t.attr("data-equalto")).val() === t.val()
            }
        }
    },
    Foundation.plugin(t, "Abide")
}(jQuery),
$(function() {
    $(document).foundation()
});

function _typeof(e) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
        return typeof e
    }
    : function _typeof(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ,
    _typeof(e)
}
!function(a) {
    function t(e) {
        if (n[e])
            return n[e].exports;
        var r = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return a[e].call(r.exports, r, r.exports, t),
        r.l = !0,
        r.exports
    }
    var n = {};
    t.m = a,
    t.c = n,
    t.d = function(e, r, a) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }
    ,
    t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return t.d(r, "a", r),
        r
    }
    ,
    t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    t.p = "",
    t(t.s = 2)
}([function(e, t, r) {
    "use strict";
    function a() {
        this.protocol = null,
        this.slashes = null,
        this.auth = null,
        this.host = null,
        this.port = null,
        this.hostname = null,
        this.hash = null,
        this.search = null,
        this.query = null,
        this.pathname = null,
        this.path = null,
        this.href = null
    }
    function n(e, t, r) {
        if (e && A.isObject(e) && e instanceof a)
            return e;
        var n = new a;
        return n.parse(e, t, r),
        n
    }
    function i(e) {
        return A.isString(e) && (e = n(e)),
        e instanceof a ? e.format() : a.prototype.format.call(e)
    }
    function o(e, t) {
        return n(e, !1, !0).resolve(t)
    }
    function s(e, t) {
        return e ? n(e, !1, !0).resolveObject(t) : t
    }
    var L = r(10)
      , A = r(12);
    t.parse = n,
    t.resolve = o,
    t.resolveObject = s,
    t.format = i,
    t.Url = a;
    var N = /^([a-z0-9.+-]+:)/i
      , l = /:[0-9]*$/
      , F = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
      , p = ["<", ">", '"', "`", " ", "\r", "\n", "\t"]
      , u = ["{", "}", "|", "\\", "^", "`"].concat(p)
      , M = ["'"].concat(u)
      , q = ["%", "/", "?", ";", "#"].concat(M)
      , J = ["/", "?", "#"]
      , _ = /^[+a-z0-9A-Z_-]{0,63}$/
      , E = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
      , V = {
        javascript: !0,
        "javascript:": !0
    }
      , W = {
        javascript: !0,
        "javascript:": !0
    }
      , B = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    }
      , G = r(13);
    a.prototype.parse = function(e, t, r) {
        if (!A.isString(e))
            throw new TypeError("Parameter 'url' must be a string, not " + _typeof(e));
        var a = e.indexOf("?")
          , n = -1 !== a && a < e.indexOf("#") ? "?" : "#"
          , i = e.split(n)
          , o = /\\/g;
        i[0] = i[0].replace(o, "/"),
        e = i.join(n);
        var s = e
          , s = s.trim();
        if (!r && 1 === e.split("#").length) {
            var l = F.exec(s);
            if (l)
                return this.path = s,
                this.href = s,
                this.pathname = l[1],
                l[2] ? (this.search = l[2],
                this.query = t ? G.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "",
                this.query = {}),
                this
        }
        var p, u, h = N.exec(s);
        if (h && (h = h[0],
        p = h.toLowerCase(),
        this.protocol = p,
        s = s.substr(h.length)),
        (r || h || s.match(/^\/\/[^@\/]+@[^@\/]+/)) && (u = "//" === s.substr(0, 2),
        !u || h && W[h] || (s = s.substr(2),
        this.slashes = !0)),
        !W[h] && (u || h && !B[h])) {
            for (var d, c, f = -1, m = 0; m < J.length; m++) {
                var b = s.indexOf(J[m]);
                -1 !== b && (-1 === f || b < f) && (f = b)
            }
            c = -1 === f ? s.lastIndexOf("@") : s.lastIndexOf("@", f),
            -1 !== c && (d = s.slice(0, c),
            s = s.slice(c + 1),
            this.auth = decodeURIComponent(d)),
            f = -1;
            for (m = 0; m < q.length; m++) {
                b = s.indexOf(q[m]);
                -1 !== b && (-1 === f || b < f) && (f = b)
            }
            -1 === f && (f = s.length),
            this.host = s.slice(0, f),
            s = s.slice(f),
            this.parseHost(),
            this.hostname = this.hostname || "";
            var g = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!g)
                for (var v = this.hostname.split(/\./), m = 0, k = v.length; m < k; m++) {
                    var y = v[m];
                    if (y && !y.match(_)) {
                        for (var j = "", z = 0, T = y.length; z < T; z++)
                            127 < y.charCodeAt(z) ? j += "x" : j += y[z];
                        if (!j.match(_)) {
                            var P = v.slice(0, m)
                              , w = v.slice(m + 1)
                              , x = y.match(E);
                            x && (P.push(x[1]),
                            w.unshift(x[2])),
                            w.length && (s = "/" + w.join(".") + s),
                            this.hostname = P.join(".");
                            break
                        }
                    }
                }
            255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
            g || (this.hostname = L.toASCII(this.hostname));
            var C = this.port ? ":" + this.port : ""
              , U = this.hostname || "";
            this.host = U + C,
            this.href += this.host,
            g && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
            "/" !== s[0] && (s = "/" + s))
        }
        if (!V[p])
            for (m = 0,
            k = M.length; m < k; m++) {
                var R, S = M[m];
                -1 !== s.indexOf(S) && (R = encodeURIComponent(S),
                R === S && (R = escape(S)),
                s = s.split(S).join(R))
            }
        var I = s.indexOf("#");
        -1 !== I && (this.hash = s.substr(I),
        s = s.slice(0, I));
        var D, O = s.indexOf("?");
        return -1 !== O ? (this.search = s.substr(O),
        this.query = s.substr(O + 1),
        t && (this.query = G.parse(this.query)),
        s = s.slice(0, O)) : t && (this.search = "",
        this.query = {}),
        s && (this.pathname = s),
        B[p] && this.hostname && !this.pathname && (this.pathname = "/"),
        (this.pathname || this.search) && (C = this.pathname || "",
        D = this.search || "",
        this.path = C + D),
        this.href = this.format(),
        this
    }
    ,
    a.prototype.format = function() {
        var e = this.auth || "";
        e && (e = encodeURIComponent(e),
        e = e.replace(/%3A/i, ":"),
        e += "@");
        var t = this.protocol || ""
          , r = this.pathname || ""
          , a = this.hash || ""
          , n = !1
          , i = "";
        this.host ? n = e + this.host : this.hostname && (n = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
        this.port && (n += ":" + this.port)),
        this.query && A.isObject(this.query) && Object.keys(this.query).length && (i = G.stringify(this.query));
        var o = this.search || i && "?" + i || "";
        return t && ":" !== t.substr(-1) && (t += ":"),
        this.slashes || (!t || B[t]) && !1 !== n ? (n = "//" + (n || ""),
        r && "/" !== r.charAt(0) && (r = "/" + r)) : n = n || "",
        a && "#" !== a.charAt(0) && (a = "#" + a),
        o && "?" !== o.charAt(0) && (o = "?" + o),
        r = r.replace(/[?#]/g, function(e) {
            return encodeURIComponent(e)
        }),
        o = o.replace("#", "%23"),
        t + n + r + o + a
    }
    ,
    a.prototype.resolve = function(e) {
        return this.resolveObject(n(e, !1, !0)).format()
    }
    ,
    a.prototype.resolveObject = function(e) {
        var t;
        A.isString(e) && (t = new a,
        t.parse(e, !1, !0),
        e = t);
        for (var r, n, i = new a, o = Object.keys(this), s = 0; s < o.length; s++) {
            var l = o[s];
            i[l] = this[l]
        }
        if (i.hash = e.hash,
        "" === e.href)
            return i.href = i.format(),
            i;
        if (e.slashes && !e.protocol) {
            for (var p = Object.keys(e), u = 0; u < p.length; u++) {
                var h = p[u];
                "protocol" !== h && (i[h] = e[h])
            }
            return B[i.protocol] && i.hostname && !i.pathname && (i.path = i.pathname = "/"),
            i.href = i.format(),
            i
        }
        if (e.protocol && e.protocol !== i.protocol) {
            if (!B[e.protocol]) {
                for (var d = Object.keys(e), c = 0; c < d.length; c++) {
                    var f = d[c];
                    i[f] = e[f]
                }
                return i.href = i.format(),
                i
            }
            if (i.protocol = e.protocol,
            e.host || W[e.protocol])
                i.pathname = e.pathname;
            else {
                for (var m = (e.pathname || "").split("/"); m.length && !(e.host = m.shift()); )
                    ;
                e.host || (e.host = ""),
                e.hostname || (e.hostname = ""),
                "" !== m[0] && m.unshift(""),
                m.length < 2 && m.unshift(""),
                i.pathname = m.join("/")
            }
            return i.search = e.search,
            i.query = e.query,
            i.host = e.host || "",
            i.auth = e.auth,
            i.hostname = e.hostname || e.host,
            i.port = e.port,
            (i.pathname || i.search) && (r = i.pathname || "",
            n = i.search || "",
            i.path = r + n),
            i.slashes = i.slashes || e.slashes,
            i.href = i.format(),
            i
        }
        var b = i.pathname && "/" === i.pathname.charAt(0)
          , g = e.host || e.pathname && "/" === e.pathname.charAt(0)
          , v = g || b || i.host && e.pathname
          , k = v
          , y = i.pathname && i.pathname.split("/") || []
          , m = e.pathname && e.pathname.split("/") || []
          , j = i.protocol && !B[i.protocol];
        if (j && (i.hostname = "",
        i.port = null,
        i.host && ("" === y[0] ? y[0] = i.host : y.unshift(i.host)),
        i.host = "",
        e.protocol && (e.hostname = null,
        e.port = null,
        e.host && ("" === m[0] ? m[0] = e.host : m.unshift(e.host)),
        e.host = null),
        v = v && ("" === m[0] || "" === y[0])),
        g)
            i.host = e.host || "" === e.host ? e.host : i.host,
            i.hostname = e.hostname || "" === e.hostname ? e.hostname : i.hostname,
            i.search = e.search,
            i.query = e.query,
            y = m;
        else if (m.length)
            y = y || [],
            y.pop(),
            y = y.concat(m),
            i.search = e.search,
            i.query = e.query;
        else if (!A.isNullOrUndefined(e.search)) {
            return j && (i.hostname = i.host = y.shift(),
            x = !!(i.host && 0 < i.host.indexOf("@")) && i.host.split("@"),
            x && (i.auth = x.shift(),
            i.host = i.hostname = x.shift())),
            i.search = e.search,
            i.query = e.query,
            A.isNull(i.pathname) && A.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")),
            i.href = i.format(),
            i
        }
        if (!y.length)
            return i.pathname = null,
            i.search ? i.path = "/" + i.search : i.path = null,
            i.href = i.format(),
            i;
        for (var z = y.slice(-1)[0], T = (i.host || e.host || 1 < y.length) && ("." === z || ".." === z) || "" === z, P = 0, w = y.length; 0 <= w; w--)
            z = y[w],
            "." === z ? y.splice(w, 1) : ".." === z ? (y.splice(w, 1),
            P++) : P && (y.splice(w, 1),
            P--);
        if (!v && !k)
            for (; P--; )
                y.unshift("..");
        !v || "" === y[0] || y[0] && "/" === y[0].charAt(0) || y.unshift(""),
        T && "/" !== y.join("/").substr(-1) && y.push("");
        var x, C = "" === y[0] || y[0] && "/" === y[0].charAt(0);
        return j && (i.hostname = i.host = !C && y.length ? y.shift() : "",
        x = !!(i.host && 0 < i.host.indexOf("@")) && i.host.split("@"),
        x && (i.auth = x.shift(),
        i.host = i.hostname = x.shift())),
        v = v || i.host && y.length,
        v && !C && y.unshift(""),
        y.length ? i.pathname = y.join("/") : (i.pathname = null,
        i.path = null),
        A.isNull(i.pathname) && A.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")),
        i.auth = e.auth || i.auth,
        i.slashes = i.slashes || e.slashes,
        i.href = i.format(),
        i
    }
    ,
    a.prototype.parseHost = function() {
        var e = this.host
          , t = l.exec(e);
        t && (t = t[0],
        ":" !== t && (this.port = t.substr(1)),
        e = e.substr(0, e.length - t.length)),
        e && (this.hostname = e)
    }
}
, function(e, t) {
    var r = function() {
        return this
    }();
    try {
        r = r || Function("return this")() || (0,
        eval)("this")
    } catch (e) {
        "object" == ("undefined" == typeof window ? "undefined" : _typeof(window)) && (r = window)
    }
    e.exports = r
}
, function(e, t, r) {
    "use strict";
    r(3),
    e.exports = r(4)
}
, function(e, t) {}
, function(u, t, h) {
    "use strict";
    (function(o) {
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(e) {
            return _typeof(e)
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e)
        }
          , t = function(t, r, a) {
            return r && e(t.prototype, r),
            a && e(t, a),
            t
        }
          , s = h(5)
          , i = h(6)
          , n = h(0)
          , l = {
            theme: "color",
            backendUrl: null,
            infoUrl: "http://ct.de/-2467514",
            infoDisplay: "blank",
            lang: "de",
            langFallback: "en",
            mailUrl: function mailUrl() {
                var e = n.parse(this.getURL(), !0);
                return e.query.view = "mail",
                delete e.search,
                n.format(e)
            },
            mailBody: function mailBody() {
                return this.getURL()
            },
            mediaUrl: null,
            orientation: "horizontal",
            buttonStyle: "standard",
            referrerTrack: null,
            services: ["twitter", "facebook", "info"],
            title: o.document.title,
            twitterVia: null,
            flattrUser: null,
            flattrCategory: null,
            url: function url() {
                var e = o.document.location.href
                  , t = s("link[rel=canonical]").attr("href") || this.getMeta("og:url") || "";
                return 0 < t.length && (t.indexOf("http") < 0 && (t = 0 !== t.indexOf("//") ? o.document.location.protocol + "//" + o.document.location.host + t : o.document.location.protocol + t),
                e = t),
                e
            }
        }
          , p = function() {
            function e(t, r) {
                var n = this;
                a(this, e),
                this.element = t,
                s(t).empty(),
                this.options = s.extend({}, l, r, s(t).data()),
                this.services = Object.keys(i).filter(function(e) {
                    return n.isEnabledService(e)
                }).sort(function(e, t) {
                    var r = n.options.services;
                    return r.indexOf(e) - r.indexOf(t)
                }).map(function(e) {
                    return i[e](n)
                }),
                this._addButtonList(),
                null !== this.options.backendUrl && "icon" !== this.options.buttonStyle && this.getShares(this._updateCounts.bind(this))
            }
            return t(e, [{
                key: "isEnabledService",
                value: function value(e) {
                    return -1 < this.options.services.indexOf(e)
                }
            }, {
                key: "$socialshareElement",
                value: function value() {
                    return s(this.element)
                }
            }, {
                key: "getLocalized",
                value: function value(e, t) {
                    return "object" === r(e[t]) ? void 0 === e[t][this.options.lang] ? e[t][this.options.langFallback] : e[t][this.options.lang] : "string" == typeof e[t] ? e[t] : void 0
                }
            }, {
                key: "getMeta",
                value: function value(e) {
                    return s('meta[name="' + e + '"],[property="' + e + '"]').attr("content") || ""
                }
            }, {
                key: "getInfoUrl",
                value: function value() {
                    return this.options.infoUrl
                }
            }, {
                key: "getInfoDisplayPopup",
                value: function value() {
                    return "popup" === this.options.infoDisplay
                }
            }, {
                key: "getInfoDisplayBlank",
                value: function value() {
                    return "popup" !== this.options.infoDisplay && "self" !== this.options.infoDisplay
                }
            }, {
                key: "getURL",
                value: function value() {
                    return this.getOption("url")
                }
            }, {
                key: "getOption",
                value: function value(e) {
                    var t = this.options[e];
                    return "function" == typeof t ? t.call(this) : t
                }
            }, {
                key: "getTitle",
                value: function value() {
                    var e = this.getOption("title");
                    if (s(this.element).data().title)
                        return e;
                    e = e || this.getMeta("DC.title");
                    var t = this.getMeta("DC.creator");
                    return e && t ? e + " - " + t : e
                }
            }, {
                key: "getReferrerTrack",
                value: function value() {
                    return this.options.referrerTrack || ""
                }
            }, {
                key: "getShares",
                value: function value(e) {
                    var t = n.parse(this.options.backendUrl, !0);
                    return t.query.url = this.getURL(),
                    delete t.search,
                    s.getJSON(n.format(t), e)
                }
            }, {
                key: "_updateCounts",
                value: function value(e, t, r) {
                    var a = this;
                    e && s.each(e, function(e, t) {
                        a.isEnabledService(e) && (1e3 <= t && (t = Math.round(t / 1e3) + "k"),
                        s(a.element).find("." + e + " a").append(s("<span/>").addClass("share_count").text(t)))
                    })
                }
            }, {
                key: "_addButtonList",
                value: function value() {
                    var n = this
                      , i = s("<ul/>").addClass(["theme-" + this.options.theme, "orientation-" + this.options.orientation, "button-style-" + this.options.buttonStyle, "shariff-col-" + this.options.services.length].join(" "));
                    this.services.forEach(function(e) {
                        var t, r = s("<li/>").addClass("shariff-button " + e.name), a = s("<a/>").attr("href", e.shareUrl);
                        "standard" === n.options.buttonStyle && (t = s("<span/>").addClass("share_text").text(n.getLocalized(e, "shareText")),
                        a.append(t)),
                        void 0 !== e.faPrefix && void 0 !== e.faName && a.prepend(s("<span/>").addClass(e.faPrefix + " " + e.faName)),
                        e.popup ? (a.attr("data-rel", "popup"),
                        "info" !== e.name && a.attr("rel", "nofollow")) : e.blank ? (a.attr("target", "_blank"),
                        "info" === e.name ? a.attr("rel", "noopener noreferrer") : a.attr("rel", "nofollow noopener noreferrer")) : "info" !== e.name && a.attr("rel", "nofollow"),
                        a.attr("title", n.getLocalized(e, "title")),
                        a.attr("role", "button"),
                        a.attr("aria-label", n.getLocalized(e, "title")),
                        r.append(a),
                        i.append(r)
                    }),
                    i.on("click", '[data-rel="popup"]', function(e) {
                        e.preventDefault();
                        var t = s(this).attr("href");
                        if (t.match(/twitter\.com\/intent\/(\w+)/)) {
                            var r = o.window;
                            if (r.__twttr && r.__twttr.widgets && r.__twttr.widgets.loaded)
                                return
                        }
                        o.window.open(t, "_blank", "width=600,height=460")
                    }),
                    this.$socialshareElement().append(i)
                }
            }]),
            e
        }();
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var a = t[r];
                a.enumerable = a.enumerable || !1,
                a.configurable = !0,
                "value"in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a)
            }
        }
        u.exports = p,
        o.Shariff = p,
        s(function() {
            s(".shariff").each(function() {
                this.hasOwnProperty("shariff") || (this.shariff = new p(this))
            })
        })
    }
    ).call(t, h(1))
}
, function(t, r, i) {
    "use strict";
    function a(e, t) {
        var r = [];
        return t = t || document,
        "function" == typeof e ? (t.attachEvent ? "complete" === t.readyState : "loading" !== t.readyState) ? e() : t.addEventListener("DOMContentLoaded", e) : r = e instanceof Element ? [e] : "string" == typeof e ? "<" === e[0] ? Array.prototype.slice.call(h(e)) : Array.prototype.slice.call(t.querySelectorAll(e)) : e,
        new n(r,t)
    }
    function n(e, t) {
        this.length = e.length,
        this.context = t;
        var r = this;
        u(e, function(e) {
            r[e] = this
        })
    }
    "function" != typeof Object.assign && (Object.assign = function(e, t) {
        if (null === e)
            throw new TypeError("Cannot convert undefined or null to object");
        for (var r = Object(e), a = 1; a < arguments.length; a++) {
            var n = arguments[a];
            if (null !== n)
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i])
        }
        return r
    }
    ),
    n.prototype.each = function(e) {
        for (var t = this.length - 1; 0 <= t; t--)
            e.call(this[t], t, this[t]);
        return this
    }
    ,
    n.prototype.empty = function() {
        return this.each(l)
    }
    ,
    n.prototype.text = function(e) {
        return void 0 === e ? this[0].textContent : this.each(function() {
            this.textContent = e
        })
    }
    ,
    n.prototype.attr = function(e, t) {
        return this.length < 1 ? null : void 0 === t ? this[0].getAttribute(e) : this.each(function() {
            this.setAttribute(e, t)
        })
    }
    ,
    n.prototype.data = function(e, t) {
        if (t)
            return this.attr("data-" + e, t);
        if (e)
            return this.attr("data-" + e);
        var r = Object.assign({}, this[0].dataset);
        return u(r, function(e, t) {
            r[e] = k(t)
        }),
        r
    }
    ,
    n.prototype.find = function(t) {
        var e = p(this, function(e) {
            return e.querySelectorAll(t)
        });
        return e = p(e, function(e) {
            return Array.prototype.slice.call(e)
        }),
        e = Array.prototype.concat.apply([], e),
        new n(e)
    }
    ,
    n.prototype.append = function(e) {
        return "string" == typeof e && (e = h(e)),
        c(this[0], e),
        this
    }
    ,
    n.prototype.prepend = function(e) {
        return "string" == typeof e && (e = h(e)),
        f(this[0], e),
        this
    }
    ,
    n.prototype.addClass = function(e) {
        return this.each(function() {
            var t = this;
            e.split(" ").forEach(function(e) {
                t.classList.add(e)
            })
        })
    }
    ,
    n.prototype.removeClass = function(e) {
        return this.each(function() {
            this.classList.remove(e)
        })
    }
    ,
    n.prototype.on = function(e, t, r) {
        return this.each(function() {
            b(t, e, r, this)
        })
    }
    ;
    var o, s, l = function i() {
        for (; this.hasChildNodes(); )
            this.removeChild(this.firstChild)
    }, p = function o(e, t) {
        return Array.prototype.map.call(e, t)
    }, u = function s(e, t) {
        if (e instanceof Array)
            for (var r = 0; r < e.length; r++)
                t.call(e[r], r, e[r]);
        else if (e instanceof Object)
            for (var a in e)
                t.call(e[a], a, e[a], e);
        return e
    }, h = function l(e) {
        var t = document.createElement("div");
        return t.innerHTML = e,
        t.children
    }, c = function p(e, t) {
        for (var r = 0; r < t.length; r++)
            e.appendChild(t[r])
    }, f = function u(e, t) {
        for (var r = t.length - 1; 0 <= r; r--)
            e.insertBefore(t[t.length - 1], e.firstChild)
    }, m = (o = HTMLElement.prototype,
    s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.msMatchesSelector,
    function e(t, r) {
        if (null !== t)
            return s.call(t, r) ? t : e(t.parentElement, r)
    }
    ), b = function d(r, e, a, t) {
        (t || document).addEventListener(e, function(e) {
            var t = m(e.target, r);
            t && a.call(t, e)
        })
    }, g = function e(t) {
        var a = {}
          , n = !1
          , r = 0
          , i = arguments.length;
        for ("[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (n = arguments[0],
        r++); r < i; r++) {
            var o = arguments[r];
            !function(t) {
                for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && (n && "[object Object]" === Object.prototype.toString.call(t[r]) ? a[r] = e(!0, a[r], t[r]) : a[r] = t[r])
            }(o)
        }
        return a
    }, v = function f(e, t) {
        var r = new XMLHttpRequest;
        r.open("GET", e, !0),
        r.setRequestHeader("Content-Type", "application/json"),
        r.setRequestHeader("Accept", "application/json"),
        r.onload = function() {
            var e;
            200 <= r.status && r.status < 400 ? (e = JSON.parse(r.responseText),
            t(e, r.status, r)) : t(null, r.status, r)
        }
        ,
        r.onerror = function(e) {
            t(new Error(e), null, r)
        }
        ,
        r.send()
    }, k = function m(t) {
        if ("true" === t)
            return !0;
        if ("false" === t)
            return !1;
        if ("null" === t)
            return null;
        if (+t + "" === t)
            return +t;
        if (/^[[{]/.test(t))
            try {
                return JSON.parse(t)
            } catch (e) {
                return t
            }
        return t
    };
    a.extend = g,
    a.map = p,
    a.each = u,
    a.getJSON = v,
    t.exports = a
}
, function(e, t, r) {
    "use strict";
    e.exports = {
        addthis: r(7),
        buffer: r(8),
        diaspora: r(9),
        facebook: r(16),
        flattr: r(17),
        flipboard: r(18),
        info: r(19),
        linkedin: r(20),
        mail: r(21),
        pinterest: r(22),
        pocket: r(23),
        print: r(24),
        qzone: r(25),
        reddit: r(26),
        stumbleupon: r(27),
        telegram: r(28),
        tencent: r(29),
        threema: r(30),
        tumblr: r(31),
        twitter: r(32),
        vk: r(33),
        weibo: r(34),
        whatsapp: r(35),
        xing: r(36)
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "addthis",
            faPrefix: "fas",
            faName: "fa-plus",
            title: {
                bg: "Сподели в AddThis",
                cs: "Sdílet na AddThis",
                da: "Del på AddThis",
                de: "Bei AddThis teilen",
                en: "Share on AddThis",
                es: "Compartir en AddThis",
                fi: "Jaa AddThisissä",
                fr: "Partager sur AddThis",
                hr: "Podijelite na AddThis",
                hu: "Megosztás AddThisen",
                it: "Condividi su AddThis",
                ja: "AddThis上で共有",
                ko: "AddThis에서 공유하기",
                nl: "Delen op AddThis",
                no: "Del på AddThis",
                pl: "Udostępnij przez AddThis",
                pt: "Compartilhar no AddThis",
                ro: "Partajează pe AddThis",
                ru: "Поделиться на AddThis",
                sk: "Zdieľať na AddThis",
                sl: "Deli na AddThis",
                sr: "Podeli na AddThis",
                sv: "Dela på AddThis",
                tr: "AddThis'ta paylaş",
                zh: "在AddThis上分享"
            },
            shareUrl: "http://api.addthis.com/oexchange/0.8/offer?url=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL());
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "buffer",
            faPrefix: "fab",
            faName: "fa-buffer",
            title: {
                bg: "Сподели в buffer",
                cs: "Sdílet na buffer",
                da: "Del på buffer",
                de: "Bei buffer teilen",
                en: "Share on buffer",
                es: "Compartir en buffer",
                fi: "Jaa bufferissä",
                fr: "Partager sur buffer",
                hr: "Podijelite na buffer",
                hu: "Megosztás bufferen",
                it: "Condividi su buffer",
                ja: "buffer上で共有",
                ko: "buffer에서 공유하기",
                nl: "Delen op buffer",
                no: "Del på buffer",
                pl: "Udostępnij przez buffer",
                pt: "Compartilhar no buffer",
                ro: "Partajează pe buffer",
                ru: "Поделиться на buffer",
                sk: "Zdieľať na buffer",
                sl: "Deli na buffer",
                sr: "Podeli na buffer",
                sv: "Dela på buffer",
                tr: "buffer'ta paylaş",
                zh: "在buffer上分享"
            },
            shareUrl: "https://buffer.com/add?text=" + encodeURIComponent(e.getTitle()) + "&url=" + t + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    var a = r(0);
    e.exports = function(e) {
        var t = a.parse("https://share.diasporafoundation.org/", !0);
        return t.query.url = e.getURL(),
        t.query.title = e.getTitle(),
        t.protocol = "https",
        delete t.search,
        {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "diaspora",
            faPrefix: "fas",
            faName: "fa-asterisk",
            title: {
                bg: "Сподели в diaspora*",
                cs: "Sdílet na diaspora*",
                da: "Del på diaspora*",
                de: "Bei diaspora* teilen",
                en: "Share on diaspora*",
                es: "Compartir en diaspora*",
                fi: "Jaa Diasporaissä",
                fr: "Partager sur diaspora*",
                hr: "Podijelite na diaspora*",
                hu: "Megosztás diaspora*",
                it: "Condividi su diaspora*",
                ja: "diaspora*上で共有",
                ko: "diaspora*에서 공유하기",
                nl: "Delen op diaspora*",
                no: "Del på diaspora*",
                pl: "Udostępnij przez diaspora*",
                pt: "Compartilhar no diaspora*",
                ro: "Partajează pe diaspora*",
                ru: "Поделиться на diaspora*",
                sk: "Zdieľať na diaspora*",
                sl: "Deli na diaspora*",
                sr: "Podeli na diaspora*-u",
                sv: "Dela på diaspora*",
                tr: "diaspora*'ta paylaş",
                zh: "分享至diaspora*"
            },
            shareUrl: a.format(t) + e.getReferrerTrack()
        }
    }
}
, function(e, D, O) {
    (function(e, t) {
        var r, j, z, T, P, n, g, w, x, C, a, v, k, y, U, R, S, I;
        function i(e) {
            throw new RangeError(y[e])
        }
        function o(e, t) {
            for (var r = e.length, a = []; r--; )
                a[r] = t(e[r]);
            return a
        }
        function s(e, t) {
            var r = e.split("@")
              , a = "";
            return 1 < r.length && (a = r[0] + "@",
            e = r[1]),
            e = e.replace(k, "."),
            a + o(e.split("."), t).join(".")
        }
        function l(e) {
            for (var t, r, a = [], n = 0, i = e.length; n < i; )
                t = e.charCodeAt(n++),
                55296 <= t && t <= 56319 && n < i ? (r = e.charCodeAt(n++),
                56320 == (64512 & r) ? a.push(((1023 & t) << 10) + (1023 & r) + 65536) : (a.push(t),
                n--)) : a.push(t);
            return a
        }
        function p(e) {
            return o(e, function(e) {
                var t = "";
                return 65535 < e && (e -= 65536,
                t += S(e >>> 10 & 1023 | 55296),
                e = 56320 | 1023 & e),
                t + S(e)
            }).join("")
        }
        function u(e) {
            return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : z
        }
        function h(e, t) {
            return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
        }
        function d(e, t, r) {
            var a = 0;
            for (e = r ? R(e / g) : e >> 1,
            e += R(e / t); U * P >> 1 < e; a += z)
                e = R(e / U);
            return R(a + (U + 1) * e / (e + n))
        }
        function c(e) {
            var t, r, a, n, o, s, l, h, c, f = [], m = e.length, b = 0, g = x, v = w, k = e.lastIndexOf(C);
            for (k < 0 && (k = 0),
            r = 0; r < k; ++r)
                128 <= e.charCodeAt(r) && i("not-basic"),
                f.push(e.charCodeAt(r));
            for (a = 0 < k ? k + 1 : 0; a < m; ) {
                for (n = b,
                o = 1,
                s = z; m <= a && i("invalid-input"),
                l = u(e.charCodeAt(a++)),
                (z <= l || l > R((j - b) / o)) && i("overflow"),
                b += l * o,
                h = s <= v ? T : v + P <= s ? P : s - v,
                !(l < h); s += z)
                    c = z - h,
                    o > R(j / c) && i("overflow"),
                    o *= c;
                t = f.length + 1,
                v = d(b - n, t, 0 == n),
                R(b / t) > j - g && i("overflow"),
                g += R(b / t),
                b %= t,
                f.splice(b++, 0, g)
            }
            return p(f)
        }
        function f(e) {
            var t, r, a, n, o, s, p, u, c, f, m, b, g, v, k, y = [];
            for (e = l(e),
            b = e.length,
            t = x,
            r = 0,
            o = w,
            s = 0; s < b; ++s)
                (m = e[s]) < 128 && y.push(S(m));
            for (a = n = y.length,
            n && y.push(C); a < b; ) {
                for (p = j,
                s = 0; s < b; ++s)
                    (m = e[s]) >= t && m < p && (p = m);
                for (g = a + 1,
                p - t > R((j - r) / g) && i("overflow"),
                r += (p - t) * g,
                t = p,
                s = 0; s < b; ++s)
                    if (m = e[s],
                    m < t && ++r > j && i("overflow"),
                    m == t) {
                        for (u = r,
                        c = z; f = c <= o ? T : o + P <= c ? P : c - o,
                        !(u < f); c += z)
                            k = u - f,
                            v = z - f,
                            y.push(S(h(f + k % v, 0))),
                            u = R(k / v);
                        y.push(S(h(u, 0))),
                        o = d(r, g, a == n),
                        r = 0,
                        ++a
                    }
                ++r,
                ++t
            }
            return y.join("")
        }
        function m(e) {
            return s(e, function(e) {
                return a.test(e) ? c(e.slice(4).toLowerCase()) : e
            })
        }
        function b(e) {
            return s(e, function(e) {
                return v.test(e) ? "xn--" + f(e) : e
            })
        }
        "object" == _typeof(D) && D && D.nodeType,
        "object" == _typeof(e) && e && e.nodeType,
        j = 2147483647,
        z = 36,
        T = 1,
        P = 26,
        n = 38,
        g = 700,
        w = 72,
        x = 128,
        C = "-",
        a = /^xn--/,
        v = /[^\x20-\x7E]/,
        k = /[\x2E\u3002\uFF0E\uFF61]/g,
        y = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
        },
        U = z - T,
        R = Math.floor,
        S = String.fromCharCode,
        I = {
            version: "1.4.1",
            ucs2: {
                decode: l,
                encode: p
            },
            decode: c,
            encode: f,
            toASCII: b,
            toUnicode: m
        },
        void 0 !== (r = function() {
            return I
        }
        .call(D, O, D, e)) && (e.exports = r)
    }
    ).call(D, O(11)(e), O(1))
}
, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}
        ,
        e.paths = [],
        e.children || (e.children = []),
        Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function get() {
                return e.l
            }
        }),
        Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function get() {
                return e.i
            }
        }),
        e.webpackPolyfill = 1),
        e
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = {
        isString: function isString(e) {
            return "string" == typeof e
        },
        isObject: function isObject(e) {
            return "object" == _typeof(e) && null !== e
        },
        isNull: function isNull(e) {
            return null === e
        },
        isNullOrUndefined: function isNullOrUndefined(e) {
            return null == e
        }
    }
}
, function(e, t, r) {
    "use strict";
    t.decode = t.parse = r(14),
    t.encode = t.stringify = r(15)
}
, function(e, t, r) {
    "use strict";
    function a(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    e.exports = function(e, t, r, n) {
        t = t || "&",
        r = r || "=";
        var i = {};
        if ("string" != typeof e || 0 === e.length)
            return i;
        var o = /\+/g;
        e = e.split(t);
        var s = 1e3;
        n && "number" == typeof n.maxKeys && (s = n.maxKeys);
        var l = e.length;
        0 < s && s < l && (l = s);
        for (var p = 0; p < l; ++p) {
            var u, h = e[p].replace(o, "%20"), d = h.indexOf(r), c = 0 <= d ? (u = h.substr(0, d),
            h.substr(d + 1)) : (u = h,
            ""), f = decodeURIComponent(u), m = decodeURIComponent(c);
            a(i, f) ? b(i[f]) ? i[f].push(m) : i[f] = [i[f], m] : i[f] = m
        }
        return i
    }
    ;
    var b = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
}
, function(e, t, r) {
    "use strict";
    function a(e, t) {
        if (e.map)
            return e.map(t);
        for (var r = [], a = 0; a < e.length; a++)
            r.push(t(e[a], a));
        return r
    }
    var o = function n(e) {
        switch (_typeof(e)) {
        case "string":
            return e;
        case "boolean":
            return e ? "true" : "false";
        case "number":
            return isFinite(e) ? e : "";
        default:
            return ""
        }
    };
    e.exports = function(r, n, i, e) {
        return n = n || "&",
        i = i || "=",
        null === r && (r = void 0),
        "object" == _typeof(r) ? a(l(r), function(e) {
            var t = encodeURIComponent(o(e)) + i;
            return s(r[e]) ? a(r[e], function(e) {
                return t + encodeURIComponent(o(e))
            }).join(n) : t + encodeURIComponent(o(r[e]))
        }).join(n) : e ? encodeURIComponent(o(e)) + i + encodeURIComponent(o(r)) : ""
    }
    ;
    var s = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
      , l = Object.keys || function(e) {
        var t, r = [];
        for (t in e)
            Object.prototype.hasOwnProperty.call(e, t) && r.push(t);
        return r
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "facebook",
            faPrefix: "fab",
            faName: "fa-facebook-f icon-facebook",
            title: {
                bg: "Сподели във Facebook",
                cs: "Sdílet na Facebooku",
                da: "Del på Facebook",
                de: "Bei Facebook teilen",
                en: "Share on Facebook",
                es: "Compartir en Facebook",
                fi: "Jaa Facebookissa",
                fr: "Partager sur Facebook",
                hr: "Podijelite na Facebooku",
                hu: "Megosztás Facebookon",
                it: "Condividi su Facebook",
                ja: "フェイスブック上で共有",
                ko: "페이스북에서 공유하기",
                nl: "Delen op Facebook",
                no: "Del på Facebook",
                pl: "Udostępnij na Facebooku",
                pt: "Compartilhar no Facebook",
                ro: "Partajează pe Facebook",
                ru: "Поделиться на Facebook",
                sk: "Zdieľať na Facebooku",
                sl: "Deli na Facebooku",
                sr: "Podeli na Facebook-u",
                sv: "Dela på Facebook",
                tr: "Facebook'ta paylaş",
                zh: "在Facebook上分享"
            },
            shareUrl: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL())
          , r = e.getTitle()
          , a = e.getMeta("description");
        return {
            popup: !0,
            shareText: "Flattr",
            name: "flattr",
            faPrefix: "far",
            faName: "fa-money-bill-alt",
            title: {
                de: "Artikel flattrn",
                en: "Flattr this"
            },
            shareUrl: "https://flattr.com/submit/auto?title=" + encodeURIComponent(r) + "&description=" + encodeURIComponent(a) + "&category=" + encodeURIComponent(e.options.flattrCategory || "text") + "&user_id=" + encodeURIComponent(e.options.flattrUser) + "&url=" + t + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL());
        return {
            popup: !0,
            shareText: "flip it",
            name: "flipboard",
            faPrefix: "fab",
            faName: "fa-flipboard",
            title: {
                bg: "Сподели в Flipboard",
                cs: "Sdílet na Flipboardu",
                da: "Del på Flipboard",
                de: "Bei Flipboard teilen",
                en: "Share on Flipboard",
                es: "Compartir en Flipboard",
                fi: "Jaa Flipboardissä",
                fr: "Partager sur Flipboard",
                hr: "Podijelite na Flipboardu",
                hu: "Megosztás Flipboardon",
                it: "Condividi su Flipboard",
                ja: "Flipboard上で共有",
                ko: "Flipboard에서 공유하기",
                nl: "Delen op Flipboard",
                no: "Del på Flipboard",
                pl: "Udostępnij na Flipboardu",
                pt: "Compartilhar no Flipboard",
                ro: "Partajează pe Flipboard",
                ru: "Поделиться на Flipboard",
                sk: "Zdieľať na Flipboardu",
                sl: "Deli na Flipboardu",
                sr: "Podeli na Flipboard-u",
                sv: "Dela på Flipboard",
                tr: "Flipboard'ta paylaş",
                zh: "在Flipboard上分享"
            },
            shareUrl: "https://share.flipboard.com/bookmarklet/popout?v=2&title=" + encodeURIComponent(e.getTitle()) + "&url=" + t + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            blank: e.getInfoDisplayBlank(),
            popup: e.getInfoDisplayPopup(),
            shareText: "Info",
            name: "info",
            faPrefix: "fas",
            faName: "fa-info",
            title: {
                bg: "Повече информация",
                cs: "Více informací",
                da: "Flere oplysninger",
                de: "Weitere Informationen",
                en: "More information",
                es: "Más informaciones",
                fi: "Lisätietoja",
                fr: "Plus d'informations",
                hr: "Više informacija",
                hu: "Több információ",
                it: "Maggiori informazioni",
                ja: "詳しい情報",
                ko: "추가 정보",
                nl: "Verdere informatie",
                no: "Mer informasjon",
                pl: "Więcej informacji",
                pt: "Mais informações",
                ro: "Mai multe informatii",
                ru: "Больше информации",
                sk: "Viac informácií",
                sl: "Več informacij",
                sr: "Više informacija",
                sv: "Mer information",
                tr: "Daha fazla bilgi",
                zh: "更多信息"
            },
            shareUrl: e.getInfoUrl()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL())
          , r = encodeURIComponent(e.getTitle());
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "mitteilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "シェア",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "distribuiți",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "linkedin",
            faPrefix: "fab",
            faName: "fa-linkedin-in icon-linkedin",
            title: {
                bg: "Сподели в LinkedIn",
                cs: "Sdílet na LinkedIn",
                da: "Del på LinkedIn",
                de: "Bei LinkedIn teilen",
                en: "Share on LinkedIn",
                es: "Compartir en LinkedIn",
                fi: "Jaa LinkedInissä",
                fr: "Partager sur LinkedIn",
                hr: "Podijelite na LinkedIn",
                hu: "Megosztás LinkedInen",
                it: "Condividi su LinkedIn",
                ja: "LinkedIn上で共有",
                ko: "LinkedIn에서 공유하기",
                nl: "Delen op LinkedIn",
                no: "Del på LinkedIn",
                pl: "Udostępnij przez LinkedIn",
                pt: "Compartilhar no LinkedIn",
                ro: "Partajează pe LinkedIn",
                ru: "Поделиться на LinkedIn",
                sk: "Zdieľať na LinkedIn",
                sl: "Deli na LinkedIn",
                sr: "Podeli na LinkedIn-u",
                sv: "Dela på LinkedIn",
                tr: "LinkedIn'ta paylaş",
                zh: "在LinkedIn上分享"
            },
            shareUrl: "https://www.linkedin.com/shareArticle?mini=true&summary=" + encodeURIComponent(e.getMeta("description")) + "&title=" + r + "&url=" + t
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = e.getOption("mailUrl");
        return 0 === t.indexOf("mailto:") && (t += "?subject=" + encodeURIComponent(e.getOption("mailSubject") || e.getTitle()),
        t += "&body=" + encodeURIComponent(e.getOption("mailBody").replace(/\{url\}/i, e.getURL()))),
        {
            blank: 0 === t.indexOf("http"),
            popup: !1,
            shareText: {
                en: "mail",
                zh: "分享"
            },
            name: "mail",
            faPrefix: "fas",
            faName: "fa-envelope icon-envelope",
            title: {
                bg: "Изпрати по имейл",
                cs: "Poslat mailem",
                da: "Sende via e-mail",
                de: "Per E-Mail versenden",
                en: "Send by email",
                es: "Enviar por email",
                fi: "Lähetä sähköpostitse",
                fr: "Envoyer par courriel",
                hr: "Pošaljite emailom",
                hu: "Elküldés e-mailben",
                it: "Inviare via email",
                ja: "電子メールで送信",
                ko: "이메일로 보내기",
                nl: "Sturen via e-mail",
                no: "Send via epost",
                pl: "Wyślij e-mailem",
                pt: "Enviar por e-mail",
                ro: "Trimite prin e-mail",
                ru: "Отправить по эл. почте",
                sk: "Poslať e-mailom",
                sl: "Pošlji po elektronski pošti",
                sr: "Pošalji putem email-a",
                sv: "Skicka via e-post",
                tr: "E-posta ile gönder",
                zh: "通过电子邮件传送"
            },
            shareUrl: t
        }
    }
}
, function(e, t, r) {
    "use strict";
    var i = r(0);
    e.exports = function(e) {
        var t = e.getTitle()
          , r = e.getMeta("DC.creator");
        0 < r.length && (t += " - " + r);
        var a = e.getOption("mediaUrl");
        (!a || a.length <= 0) && (a = e.getMeta("og:image"));
        var n = i.parse("https://www.pinterest.com/pin/create/link/", !0);
        return n.query.url = e.getURL(),
        n.query.media = a,
        n.query.description = t,
        delete n.search,
        {
            popup: !0,
            shareText: "pin it",
            name: "pinterest",
            faPrefix: "fab",
            faName: "fa-pinterest-p",
            title: {
                bg: "Сподели в Pinterest",
                cs: "Přidat na Pinterest",
                da: "Del på Pinterest",
                de: "Bei Pinterest pinnen",
                en: "Pin it on Pinterest",
                es: "Compartir en Pinterest",
                fi: "Jaa Pinterestissä",
                fr: "Partager sur Pinterest",
                hr: "Podijelite na Pinterest",
                hu: "Megosztás Pinteresten",
                it: "Condividi su Pinterest",
                ja: "Pinterest上で共有",
                ko: "Pinterest에서 공유하기",
                nl: "Delen op Pinterest",
                no: "Del på Pinterest",
                pl: "Udostępnij przez Pinterest",
                pt: "Compartilhar no Pinterest",
                ro: "Partajează pe Pinterest",
                ru: "Поделиться на Pinterest",
                sk: "Zdieľať na Pinterest",
                sl: "Deli na Pinterest",
                sr: "Podeli na Pinterest-u",
                sv: "Dela på Pinterest",
                tr: "Pinterest'ta paylaş",
                zh: "分享至Pinterest"
            },
            shareUrl: i.format(n) + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL());
        return {
            popup: !0,
            shareText: "Pocket",
            name: "pocket",
            faPrefix: "fab",
            faName: "fa-get-pocket",
            title: {
                bg: "Запазване в Pocket",
                cs: "Uložit do Pocket",
                da: "Gem i Pocket",
                de: "In Pocket speichern",
                en: "Save to Pocket",
                es: "Guardar en Pocket",
                fi: "Tallenna kohtaan Pocket",
                fr: "Enregistrer dans Pocket",
                hr: "Spremi u Pocket",
                hu: 'Mentés "Pocket"-be',
                it: "Salva in Pocket",
                ja: "「ポケット」に保存",
                ko: "Pocket에 저장",
                nl: "Opslaan in Pocket",
                no: "Lagre i Pocket",
                pl: "Zapisz w Pocket",
                pt: "Salvar em Pocket",
                ro: "Salvați în Pocket",
                ru: "Сохранить в Pocket",
                sk: "Uložiť do priečinka Pocket",
                sl: "Shrani v Pocket",
                sr: "Sačuvaj u Pocket",
                sv: "Spara till Pocket",
                tr: "Pocket e kaydet",
                zh: "保存到Pocket"
            },
            shareUrl: "https://getpocket.com/save?title=" + encodeURIComponent(e.getTitle()) + "&url=" + t + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            name: "print",
            faPrefix: "fas",
            faName: "fa-print",
            popup: !1,
            shareText: {
                bg: "",
                cs: "tlačit",
                da: "",
                de: "drucken",
                en: "print",
                es: "impresión",
                fi: "",
                fr: "imprimer",
                hr: "",
                hu: "",
                it: "stampa",
                ja: "",
                ko: "",
                nl: "afdrukken",
                no: "",
                pl: "drukuj",
                pt: "",
                ro: "",
                ru: "Распечатать",
                sk: "",
                sl: "",
                sr: "",
                sv: "",
                tr: "",
                zh: ""
            },
            title: {
                bg: "",
                cs: "tlačit",
                da: "",
                de: "drucken",
                en: "print",
                es: "impresión",
                fi: "",
                fr: "imprimer",
                hr: "",
                hu: "",
                it: "stampa",
                ja: "",
                ko: "",
                nl: "afdrukken",
                no: "",
                pl: "drukuj",
                pt: "",
                ro: "",
                ru: "Распечатать",
                sk: "",
                sl: "",
                sr: "",
                sv: "",
                tr: "",
                zh: ""
            },
            shareUrl: "javascript:window.print();"
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "qzone",
            faPrefix: "fab",
            faName: "fa-qq",
            title: {
                bg: "Сподели в Qzone",
                cs: "Sdílet na Qzone",
                da: "Del på Qzone",
                de: "Bei Qzone teilen",
                en: "Share on Qzone",
                es: "Compartir en Qzone",
                fi: "Jaa Qzoneissä",
                fr: "Partager sur Qzone",
                hr: "Podijelite na Qzone",
                hu: "Megosztás Qzone",
                it: "Condividi su Qzone",
                ja: "Qzone上で共有",
                ko: "Qzone에서 공유하기",
                nl: "Delen op Qzone",
                no: "Del på Qzone",
                pl: "Udostępnij przez Qzone",
                pt: "Compartilhar no Qzone",
                ro: "Partajează pe Qzone",
                ru: "Поделиться на Qzone",
                sk: "Zdieľať na Qzone",
                sl: "Deli na Qzone",
                sr: "Podeli na Qzone-u",
                sv: "Dela på Qzone",
                tr: "Qzone'ta paylaş",
                zh: "分享至QQ空间"
            },
            shareUrl: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(e.getURL()) + "&title=" + e.getTitle() + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL())
          , r = encodeURIComponent(e.getTitle());
        return "" !== r && (r = "&title=" + r),
        {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "reddit",
            faPrefix: "fab",
            faName: "fa-reddit-alien icon-reddit",
            title: {
                bg: "Сподели в Reddit",
                cs: "Sdílet na Redditu",
                da: "Del på Reddit",
                de: "Bei Reddit teilen",
                en: "Share on Reddit",
                es: "Compartir en Reddit",
                fi: "Jaa Redditissä",
                fr: "Partager sur Reddit",
                hr: "Podijelite na Reddit",
                hu: "Megosztás Redditen",
                it: "Condividi su Reddit",
                ja: "Reddit上で共有",
                ko: "Reddit에서 공유하기",
                nl: "Delen op Reddit",
                no: "Del på Reddit",
                pl: "Udostępnij przez Reddit",
                pt: "Compartilhar no Reddit",
                ro: "Partajează pe Reddit",
                ru: "Поделиться на Reddit",
                sk: "Zdieľať na Reddit",
                sl: "Deli na Reddit",
                sr: "Podeli na Reddit-u",
                sv: "Dela på Reddit",
                tr: "Reddit'ta paylaş",
                zh: "分享至Reddit"
            },
            shareUrl: "https://reddit.com/submit?url=" + t + r + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL())
          , r = encodeURIComponent(e.getTitle());
        return "" !== r && (r = "&title=" + r),
        {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "stumbleupon",
            faPrefix: "fab",
            faName: "fa-stumbleupon",
            title: {
                bg: "Сподели в Stumbleupon",
                cs: "Sdílet na Stumbleuponu",
                da: "Del på Stumbleupon",
                de: "Bei Stumbleupon teilen",
                en: "Share on Stumbleupon",
                es: "Compartir en Stumbleupon",
                fi: "Jaa Stumbleuponissä",
                fr: "Partager sur Stumbleupon",
                hr: "Podijelite na Stumbleupon",
                hu: "Megosztás Stumbleupon",
                it: "Condividi su Stumbleupon",
                ja: "Stumbleupon上で共有",
                ko: "Stumbleupon에서 공유하기",
                nl: "Delen op Stumbleupon",
                no: "Del på Stumbleupon",
                pl: "Udostępnij przez Stumbleupon",
                pt: "Compartilhar no Stumbleupon",
                ro: "Partajează pe Stumbleupon",
                ru: "Поделиться на Stumbleupon",
                sk: "Zdieľať na Stumbleupon",
                sl: "Deli na Stumbleupon",
                sr: "Podeli na Stumbleupon-u",
                sv: "Dela på Stumbleupon",
                tr: "Stumbleupon'ta paylaş",
                zh: "分享至Stumbleupon"
            },
            shareUrl: "https://www.stumbleupon.com/submit?url=" + t + r + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "telegram",
            faPrefix: "fab",
            faName: "fa-telegram",
            title: {
                bg: "Сподели в Telegram",
                cs: "Sdílet na Telegramu",
                da: "Del på Telegram",
                de: "Bei Telegram teilen",
                en: "Share on Telegram",
                es: "Compartir en Telegram",
                fi: "Jaa Telegramissä",
                fr: "Partager sur Telegram",
                hr: "Podijelite na Telegram",
                hu: "Megosztás Telegramen",
                it: "Condividi su Telegram",
                ja: "Telegram上で共有",
                ko: "Telegram에서 공유하기",
                nl: "Delen op Telegram",
                no: "Del på Telegram",
                pl: "Udostępnij przez Telegram",
                pt: "Compartilhar no Telegram",
                ro: "Partajează pe Telegram",
                ru: "Поделиться на Telegram",
                sk: "Zdieľať na Telegram",
                sl: "Deli na Telegram",
                sr: "Podeli na Telegram-u",
                sv: "Dela på Telegram",
                tr: "Telegram'ta paylaş",
                zh: "在Telegram上分享"
            },
            shareUrl: "https://t.me/share/url?url=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "tencent-weibo",
            faPrefix: "fab",
            faName: "fa-tencent-weibo",
            title: {
                bg: "Сподели в tencent weibo",
                cs: "Sdílet na tencent weibo",
                da: "Del på tencent weibo",
                de: "Bei tencent weibo teilen",
                en: "Share on tencent weibo",
                es: "Compartir en tencent weibo",
                fi: "Jaa tencent weiboissä",
                fr: "Partager sur tencent weibo",
                hr: "Podijelite na tencent weibo",
                hu: "Megosztás tencent weiboen",
                it: "Condividi su tencent weibo",
                ja: "Tencent weibo上で共有",
                ko: "Tencent weibo에서 공유하기",
                nl: "Delen op tencent weibo",
                no: "Del på tencent weibo",
                pl: "Udostępnij przez tencent weibo",
                pt: "Compartilhar no tencent weibo",
                ro: "Partajează pe tencent weibo",
                ru: "Поделиться на tencent weibo",
                sk: "Zdieľať na tencent weibo",
                sl: "Deli na tencent weibo",
                sr: "Podeli na tencent weibo-u",
                sv: "Dela på tencent weibo",
                tr: "Tencent weibo'ta paylaş",
                zh: "分享至腾讯微博"
            },
            shareUrl: "http://v.t.qq.com/share/share.php?url=" + encodeURIComponent(e.getURL()) + "&title=" + e.getTitle() + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL())
          , r = e.getTitle();
        return {
            popup: !1,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "threema",
            faPrefix: "fas",
            faName: "fa-lock",
            title: {
                bg: "Сподели в Threema",
                cs: "Sdílet na Threema",
                da: "Del på Threema",
                de: "Bei Threema teilen",
                en: "Share on Threema",
                es: "Compartir en Threema",
                fi: "Jaa Threemaissä",
                fr: "Partager sur Threema",
                hr: "Podijelite na Threema",
                hu: "Megosztás Threemaen",
                it: "Condividi su Threema",
                ja: "Threema上で共有",
                ko: "Threema에서 공유하기",
                nl: "Delen op Threema",
                no: "Del på Threema",
                pl: "Udostępnij przez Threema",
                pt: "Compartilhar no Threema",
                ro: "Partajează pe Threema",
                ru: "Поделиться на Threema",
                sk: "Zdieľať na Threema",
                sl: "Deli na Threema",
                sr: "Podeli na Threema-u",
                sv: "Dela på Threema",
                tr: "Threema'ta paylaş",
                zh: "在Threema上分享"
            },
            shareUrl: "threema://compose?text=" + encodeURIComponent(r) + "%20" + t + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "tumblr",
            faPrefix: "fab",
            faName: "fa-tumblr",
            title: {
                bg: "Сподели в tumblr",
                cs: "Sdílet na tumblru",
                da: "Del på tumblr",
                de: "Bei tumblr teilen",
                en: "Share on tumblr",
                es: "Compartir en tumblr",
                fi: "Jaa tumblrissä",
                fr: "Partager sur tumblr",
                hr: "Podijelite na tumblr",
                hu: "Megosztás tumblren",
                it: "Condividi su tumblr",
                ja: "tumblr上で共有",
                ko: "tumblr에서 공유하기",
                nl: "Delen op tumblr",
                no: "Del på tumblr",
                pl: "Udostępnij przez tumblr",
                pt: "Compartilhar no tumblr",
                ro: "Partajează pe tumblr",
                ru: "Поделиться на tumblr",
                sk: "Zdieľať na tumblr",
                sl: "Deli na tumblr",
                sr: "Podeli na tumblr-u",
                sv: "Dela på tumblr",
                tr: "tumblr'ta paylaş",
                zh: "在tumblr上分享"
            },
            shareUrl: "http://tumblr.com/widgets/share/tool?canonicalUrl=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    var a = r(0)
      , n = function n(e, t) {
        var r = document.createElement("div")
          , a = document.createTextNode(e);
        r.appendChild(a);
        var n = r.textContent;
        if (n.length <= t)
            return e;
        var i = n.substring(0, t - 1).lastIndexOf(" ");
        return n.substring(0, i) + "…"
    };
    e.exports = function(e) {
        var t = a.parse("https://twitter.com/intent/tweet", !0)
          , r = e.getTitle();
        return t.query.text = n(r, 120),
        t.query.url = e.getURL(),
        null !== e.options.twitterVia && (t.query.via = e.options.twitterVia),
        delete t.search,
        {
            popup: !0,
            shareText: {
                en: "tweet",
                ja: "のつぶやき",
                ko: "짹짹",
                ru: "твит",
                sr: "твеет",
                zh: "鸣叫"
            },
            name: "twitter",
            faPrefix: "fab",
            faName: "fa-twitter icon-twitter",
            title: {
                bg: "Сподели в Twitter",
                cs: "Sdílet na Twiiteru",
                da: "Del på Twitter",
                de: "Bei Twitter teilen",
                en: "Share on Twitter",
                es: "Compartir en Twitter",
                fi: "Jaa Twitterissä",
                fr: "Partager sur Twitter",
                hr: "Podijelite na Twitteru",
                hu: "Megosztás Twitteren",
                it: "Condividi su Twitter",
                ja: "ツイッター上で共有",
                ko: "트위터에서 공유하기",
                nl: "Delen op Twitter",
                no: "Del på Twitter",
                pl: "Udostępnij na Twitterze",
                pt: "Compartilhar no Twitter",
                ro: "Partajează pe Twitter",
                ru: "Поделиться на Twitter",
                sk: "Zdieľať na Twitteri",
                sl: "Deli na Twitterju",
                sr: "Podeli na Twitter-u",
                sv: "Dela på Twitter",
                tr: "Twitter'da paylaş",
                zh: "在Twitter上分享"
            },
            shareUrl: a.format(t) + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "vk",
            faPrefix: "fab",
            faName: "fa-vk",
            title: {
                bg: "Сподели във VK",
                cs: "Sdílet na VKu",
                da: "Del på VK",
                de: "Bei VK teilen",
                en: "Share on VK",
                es: "Compartir en VK",
                fi: "Jaa VKissa",
                fr: "Partager sur VK",
                hr: "Podijelite na VKu",
                hu: "Megosztás VKon",
                it: "Condividi su VK",
                ja: "フェイスブック上で共有",
                ko: "페이스북에서 공유하기",
                nl: "Delen op VK",
                no: "Del på VK",
                pl: "Udostępnij na VKu",
                pt: "Compartilhar no VK",
                ro: "Partajează pe VK",
                ru: "Поделиться на ВКонтакте",
                sk: "Zdieľať na VKu",
                sl: "Deli na VKu",
                sr: "Podeli na VK-u",
                sv: "Dela på VK",
                tr: "VK'ta paylaş",
                zh: "在VK上分享"
            },
            shareUrl: "https://vk.com/share.php?url=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "weibo",
            faPrefix: "fab",
            faName: "fa-weibo",
            title: {
                bg: "Сподели в weibo",
                cs: "Sdílet na weibo",
                da: "Del på weibo",
                de: "Bei weibo teilen",
                en: "Share on weibo",
                es: "Compartir en weibo",
                fi: "Jaa weiboissä",
                fr: "Partager sur weibo",
                hr: "Podijelite na weibo",
                hu: "Megosztás weiboen",
                it: "Condividi su weibo",
                ja: "Weibo上で共有",
                ko: "Weibo에서 공유하기",
                nl: "Delen op weibo",
                no: "Del på weibo",
                pl: "Udostępnij przez weibo",
                pt: "Compartilhar no weibo",
                ro: "Partajează pe weibo",
                ru: "Поделиться на weibo",
                sk: "Zdieľať na weibo",
                sl: "Deli na weibo",
                sr: "Podeli na weibo-u",
                sv: "Dela på weibo",
                tr: "Weibo'ta paylaş",
                zh: "分享至新浪微博"
            },
            shareUrl: "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(e.getURL()) + "&title=" + e.getTitle() + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        var t = encodeURIComponent(e.getURL())
          , r = e.getTitle();
        return {
            popup: !1,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "whatsapp",
            faPrefix: "fab",
            faName: "fa-whatsapp",
            title: {
                bg: "Сподели в Whatsapp",
                cs: "Sdílet na Whatsappu",
                da: "Del på Whatsapp",
                de: "Bei Whatsapp teilen",
                en: "Share on Whatsapp",
                es: "Compartir en Whatsapp",
                fi: "Jaa WhatsAppissä",
                fr: "Partager sur Whatsapp",
                hr: "Podijelite na Whatsapp",
                hu: "Megosztás WhatsAppen",
                it: "Condividi su Whatsapp",
                ja: "Whatsapp上で共有",
                ko: "Whatsapp에서 공유하기",
                nl: "Delen op Whatsapp",
                no: "Del på Whatsapp",
                pl: "Udostępnij przez WhatsApp",
                pt: "Compartilhar no Whatsapp",
                ro: "Partajează pe Whatsapp",
                ru: "Поделиться на Whatsapp",
                sk: "Zdieľať na Whatsapp",
                sl: "Deli na Whatsapp",
                sr: "Podeli na WhatsApp-u",
                sv: "Dela på Whatsapp",
                tr: "Whatsapp'ta paylaş",
                zh: "在Whatsapp上分享"
            },
            shareUrl: "whatsapp://send?text=" + encodeURIComponent(r) + "%20" + t + e.getReferrerTrack()
        }
    }
}
, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return {
            popup: !0,
            shareText: {
                bg: "cподеляне",
                cs: "sdílet",
                da: "del",
                de: "teilen",
                en: "share",
                es: "compartir",
                fi: "Jaa",
                fr: "partager",
                hr: "podijelite",
                hu: "megosztás",
                it: "condividi",
                ja: "共有",
                ko: "공유하기",
                nl: "delen",
                no: "del",
                pl: "udostępnij",
                pt: "compartilhar",
                ro: "partajează",
                ru: "поделиться",
                sk: "zdieľať",
                sl: "deli",
                sr: "podeli",
                sv: "dela",
                tr: "paylaş",
                zh: "分享"
            },
            name: "xing",
            faPrefix: "fab",
            faName: "fa-xing icon-xing",
            title: {
                bg: "Сподели в XING",
                cs: "Sdílet na XINGu",
                da: "Del på XING",
                de: "Bei XING teilen",
                en: "Share on XING",
                es: "Compartir en XING",
                fi: "Jaa XINGissä",
                fr: "Partager sur XING",
                hr: "Podijelite na XING",
                hu: "Megosztás XINGen",
                it: "Condividi su XING",
                ja: "XING上で共有",
                ko: "XING에서 공유하기",
                nl: "Delen op XING",
                no: "Del på XING",
                pl: "Udostępnij przez XING",
                pt: "Compartilhar no XING",
                ro: "Partajează pe XING",
                ru: "Поделиться на XING",
                sk: "Zdieľať na XING",
                sl: "Deli na XING",
                sr: "Podeli na XING-u",
                sv: "Dela på XING",
                tr: "XING'ta paylaş",
                zh: "分享至XING"
            },
            shareUrl: "https://www.xing.com/spi/shares/new?url=" + encodeURIComponent(e.getURL()) + e.getReferrerTrack()
        }
    }
}
]);

function _typeof(e) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
        return typeof e
    }
    : function _typeof(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ,
    _typeof(e)
}
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? e(require("jquery")) : e(window.jQuery || window.Zepto)
}(function(c) {
    var p, n, d, i, u, t, l = "Close", m = "BeforeClose", o = "AfterClose", r = "BeforeAppend", f = "MarkupParse", g = "Open", a = "Change", s = "mfp", h = "." + s, v = "mfp-ready", y = "mfp-removing", C = "mfp-prevent-close", e = function MagnificPopup() {}, I = !!window.jQuery, b = c(window), w = function _mfpOn(e, t) {
        p.ev.on(s + e + h, t)
    }, _ = function _getEl(e, t, o, n) {
        var i = document.createElement("div");
        return i.className = "mfp-" + e,
        o && (i.innerHTML = o),
        n ? t && t.appendChild(i) : (i = c(i),
        t && i.appendTo(t)),
        i
    }, x = function _mfpTrigger(e, t) {
        p.ev.triggerHandler(s + e, t),
        p.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1),
        p.st.callbacks[e] && p.st.callbacks[e].apply(p, c.isArray(t) ? t : [t]))
    }, k = function _getCloseBtn(e) {
        return e === t && p.currTemplate.closeBtn || (p.currTemplate.closeBtn = c(p.st.closeMarkup.replace("%title%", p.st.tClose)),
        t = e),
        p.currTemplate.closeBtn
    }, T = function _checkInstance() {
        c.magnificPopup.instance || (p = new e,
        p.init(),
        c.magnificPopup.instance = p)
    }, S = function supportsTransitions() {
        var e = document.createElement("p").style
          , t = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== e.transition)
            return !0;
        for (; t.length; )
            if (t.pop() + "Transition"in e)
                return !0;
        return !1
    };
    e.prototype = {
        constructor: e,
        init: function init() {
            var e = navigator.appVersion;
            p.isLowIE = p.isIE8 = document.all && !document.addEventListener,
            p.isAndroid = /android/gi.test(e),
            p.isIOS = /iphone|ipad|ipod/gi.test(e),
            p.supportsTransition = S(),
            p.probablyMobile = p.isAndroid || p.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
            d = c(document),
            p.popupsCache = {}
        },
        open: function open(e) {
            if (!1 === e.isObj) {
                p.items = e.items.toArray(),
                p.index = 0;
                for (var t, o = e.items, n = 0; n < o.length; n++)
                    if (t = o[n],
                    t.parsed && (t = t.el[0]),
                    t === e.el[0]) {
                        p.index = n;
                        break
                    }
            } else
                p.items = c.isArray(e.items) ? e.items : [e.items],
                p.index = e.index || 0;
            if (!p.isOpen) {
                p.types = [],
                u = "",
                e.mainEl && e.mainEl.length ? p.ev = e.mainEl.eq(0) : p.ev = d,
                e.key ? (p.popupsCache[e.key] || (p.popupsCache[e.key] = {}),
                p.currTemplate = p.popupsCache[e.key]) : p.currTemplate = {},
                p.st = c.extend(!0, {}, c.magnificPopup.defaults, e),
                p.fixedContentPos = "auto" === p.st.fixedContentPos ? !p.probablyMobile : p.st.fixedContentPos,
                p.st.modal && (p.st.closeOnContentClick = !1,
                p.st.closeOnBgClick = !1,
                p.st.showCloseBtn = !1,
                p.st.enableEscapeKey = !1),
                p.bgOverlay || (p.bgOverlay = _("bg").on("click" + h, function() {
                    p.close()
                }),
                p.wrap = _("wrap").attr("tabindex", -1).on("click" + h, function(e) {
                    p._checkIfClose(e.target) && p.close()
                }),
                p.container = _("container", p.wrap)),
                p.contentContainer = _("content"),
                p.st.preloader && (p.preloader = _("preloader", p.container, p.st.tLoading));
                var i = c.magnificPopup.modules;
                for (n = 0; n < i.length; n++) {
                    var r = i[n]
                      , r = r.charAt(0).toUpperCase() + r.slice(1);
                    p["init" + r].call(p)
                }
                x("BeforeOpen"),
                p.st.showCloseBtn && (p.st.closeBtnInside ? (w(f, function(e, t, o, n) {
                    o.close_replaceWith = k(n.type)
                }),
                u += " mfp-close-btn-in") : p.wrap.append(k())),
                p.st.alignTop && (u += " mfp-align-top"),
                p.fixedContentPos ? p.wrap.css({
                    overflow: p.st.overflowY,
                    overflowX: "hidden",
                    overflowY: p.st.overflowY
                }) : p.wrap.css({
                    top: b.scrollTop(),
                    position: "absolute"
                }),
                !1 !== p.st.fixedBgPos && ("auto" !== p.st.fixedBgPos || p.fixedContentPos) || p.bgOverlay.css({
                    height: d.height(),
                    position: "absolute"
                }),
                p.st.enableEscapeKey && d.on("keyup" + h, function(e) {
                    27 === e.keyCode && p.close()
                }),
                b.on("resize" + h, function() {
                    p.updateSize()
                }),
                p.st.closeOnContentClick || (u += " mfp-auto-cursor"),
                u && p.wrap.addClass(u);
                var a = p.wH = b.height()
                  , s = {};
                p.fixedContentPos && p._hasScrollBar(a) && (l = p._getScrollbarSize(),
                l && (s.marginRight = l)),
                p.fixedContentPos && (p.isIE7 ? c("body, html").css("overflow", "hidden") : s.overflow = "hidden");
                var l = p.st.mainClass;
                return p.isIE7 && (l += " mfp-ie7"),
                l && p._addClassToMFP(l),
                p.updateItemHTML(),
                x("BuildControls"),
                c("html").css(s),
                p.bgOverlay.add(p.wrap).prependTo(p.st.prependTo || c(document.body)),
                p._lastFocusedEl = document.activeElement,
                setTimeout(function() {
                    p.content ? (p._addClassToMFP(v),
                    p._setFocus()) : p.bgOverlay.addClass(v),
                    d.on("focusin" + h, p._onFocusIn)
                }, 16),
                p.isOpen = !0,
                p.updateSize(a),
                x(g),
                e
            }
            p.updateItemHTML()
        },
        close: function close() {
            p.isOpen && (x(m),
            p.isOpen = !1,
            p.st.removalDelay && !p.isLowIE && p.supportsTransition ? (p._addClassToMFP(y),
            setTimeout(function() {
                p._close()
            }, p.st.removalDelay)) : p._close())
        },
        _close: function _close() {
            x(l);
            var e = y + " " + v + " ";
            p.bgOverlay.detach(),
            p.wrap.detach(),
            p.container.empty(),
            p.st.mainClass && (e += p.st.mainClass + " "),
            p._removeClassFromMFP(e),
            p.fixedContentPos && (e = {
                marginRight: ""
            },
            p.isIE7 ? c("body, html").css("overflow", "") : e.overflow = "",
            c("html").css(e)),
            d.off("keyup" + h + " focusin" + h),
            p.ev.off(h),
            p.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            p.bgOverlay.attr("class", "mfp-bg"),
            p.container.attr("class", "mfp-container"),
            !p.st.showCloseBtn || p.st.closeBtnInside && !0 !== p.currTemplate[p.currItem.type] || p.currTemplate.closeBtn && p.currTemplate.closeBtn.detach(),
            p.st.autoFocusLast && p._lastFocusedEl && c(p._lastFocusedEl).focus(),
            p.currItem = null,
            p.content = null,
            p.currTemplate = null,
            p.prevHeight = 0,
            x(o)
        },
        updateSize: function updateSize(e) {
            var t;
            p.isIOS ? (t = document.documentElement.clientWidth / window.innerWidth,
            t = window.innerHeight * t,
            p.wrap.css("height", t),
            p.wH = t) : p.wH = e || b.height(),
            p.fixedContentPos || p.wrap.css("height", p.wH),
            x("Resize")
        },
        updateItemHTML: function updateItemHTML() {
            var e = p.items[p.index];
            p.contentContainer.detach(),
            p.content && p.content.detach(),
            e.parsed || (e = p.parseEl(p.index));
            var t = e.type;
            x("BeforeChange", [p.currItem ? p.currItem.type : "", t]),
            p.currItem = e,
            p.currTemplate[t] || (o = !!p.st[t] && p.st[t].markup,
            x("FirstMarkupParse", o),
            p.currTemplate[t] = !o || c(o)),
            i && i !== e.type && p.container.removeClass("mfp-" + i + "-holder");
            var o = p["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, p.currTemplate[t]);
            p.appendContent(o, t),
            e.preloaded = !0,
            x(a, e),
            i = e.type,
            p.container.prepend(p.contentContainer),
            x("AfterChange")
        },
        appendContent: function appendContent(e, t) {
            p.content = e,
            e ? p.st.showCloseBtn && p.st.closeBtnInside && !0 === p.currTemplate[t] ? p.content.find(".mfp-close").length || p.content.append(k()) : p.content = e : p.content = "",
            x(r),
            p.container.addClass("mfp-" + t + "-holder"),
            p.contentContainer.append(p.content)
        },
        parseEl: function parseEl(e) {
            var t, o = p.items[e], o = o.tagName ? {
                el: c(o)
            } : (t = o.type,
            {
                data: o,
                src: o.src
            });
            if (o.el) {
                for (var n = p.types, i = 0; i < n.length; i++)
                    if (o.el.hasClass("mfp-" + n[i])) {
                        t = n[i];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"),
                o.src || (o.src = o.el.attr("href"))
            }
            return o.type = t || p.st.type || "inline",
            o.index = e,
            o.parsed = !0,
            p.items[e] = o,
            x("ElementParse", o),
            p.items[e]
        },
        addGroup: function addGroup(t, o) {
            var e = function eHandler(e) {
                e.mfpEl = this,
                p._openClick(e, t, o)
            };
            o = o || {};
            var n = "click.magnificPopup";
            o.mainEl = t,
            o.items ? (o.isObj = !0,
            t.off(n).on(n, e)) : (o.isObj = !1,
            o.delegate ? t.off(n).on(n, o.delegate, e) : (o.items = t,
            t.off(n).on(n, e)))
        },
        _openClick: function _openClick(e, t, o) {
            var n = (void 0 !== o.midClick ? o : c.magnificPopup.defaults).midClick;
            if (n || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                n = (void 0 !== o.disableOn ? o : c.magnificPopup.defaults).disableOn;
                if (n)
                    if (c.isFunction(n)) {
                        if (!n.call(p))
                            return !0
                    } else if (b.width() < n)
                        return !0;
                e.type && (e.preventDefault(),
                p.isOpen && e.stopPropagation()),
                o.el = c(e.mfpEl),
                o.delegate && (o.items = t.find(o.delegate)),
                p.open(o)
            }
        },
        updateStatus: function updateStatus(e, t) {
            var o;
            p.preloader && (n !== e && p.container.removeClass("mfp-s-" + n),
            t || "loading" !== e || (t = p.st.tLoading),
            o = {
                status: e,
                text: t
            },
            x("UpdateStatus", o),
            e = o.status,
            t = o.text,
            p.preloader.html(t),
            p.preloader.find("a").on("click", function(e) {
                e.stopImmediatePropagation()
            }),
            p.container.addClass("mfp-s-" + e),
            n = e)
        },
        _checkIfClose: function _checkIfClose(e) {
            if (!c(e).hasClass(C)) {
                var t = p.st.closeOnContentClick
                  , o = p.st.closeOnBgClick;
                if (t && o)
                    return !0;
                if (!p.content || c(e).hasClass("mfp-close") || p.preloader && e === p.preloader[0])
                    return !0;
                if (e === p.content[0] || c.contains(p.content[0], e)) {
                    if (t)
                        return !0
                } else if (o && c.contains(document, e))
                    return !0;
                return !1
            }
        },
        _addClassToMFP: function _addClassToMFP(e) {
            p.bgOverlay.addClass(e),
            p.wrap.addClass(e)
        },
        _removeClassFromMFP: function _removeClassFromMFP(e) {
            this.bgOverlay.removeClass(e),
            p.wrap.removeClass(e)
        },
        _hasScrollBar: function _hasScrollBar(e) {
            return (p.isIE7 ? d.height() : document.body.scrollHeight) > (e || b.height())
        },
        _setFocus: function _setFocus() {
            (p.st.focus ? p.content.find(p.st.focus).eq(0) : p.wrap).focus()
        },
        _onFocusIn: function _onFocusIn(e) {
            if (e.target !== p.wrap[0] && !c.contains(p.wrap[0], e.target))
                return p._setFocus(),
                !1
        },
        _parseMarkup: function _parseMarkup(i, e, t) {
            var r;
            t.data && (e = c.extend(t.data, e)),
            x(f, [i, e, t]),
            c.each(e, function(e, t) {
                return void 0 === t || !1 === t || (r = e.split("_"),
                void (1 < r.length ? (o = i.find(h + "-" + r[0]),
                0 < o.length && (n = r[1],
                "replaceWith" === n ? o[0] !== t[0] && o.replaceWith(t) : "img" === n ? o.is("img") ? o.attr("src", t) : o.replaceWith(c("<img>").attr("src", t).attr("class", o.attr("class"))) : o.attr(r[1], t))) : i.find(h + "-" + e).html(t)));
                var o, n
            })
        },
        _getScrollbarSize: function _getScrollbarSize() {
            var e;
            return void 0 === p.scrollbarSize && (e = document.createElement("div"),
            e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
            document.body.appendChild(e),
            p.scrollbarSize = e.offsetWidth - e.clientWidth,
            document.body.removeChild(e)),
            p.scrollbarSize
        }
    },
    c.magnificPopup = {
        instance: null,
        proto: e.prototype,
        modules: [],
        open: function open(e, t) {
            return T(),
            e = e ? c.extend(!0, {}, e) : {},
            e.isObj = !0,
            e.index = t || 0,
            this.instance.open(e)
        },
        close: function close() {
            return c.magnificPopup.instance && c.magnificPopup.instance.close()
        },
        registerModule: function registerModule(e, t) {
            t.options && (c.magnificPopup.defaults[e] = t.options),
            c.extend(this.proto, t.proto),
            this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    },
    c.fn.magnificPopup = function(e) {
        T();
        var t, o, n, i = c(this);
        return "string" == typeof e ? "open" === e ? (t = I ? i.data("magnificPopup") : i[0].magnificPopup,
        o = parseInt(arguments[1], 10) || 0,
        n = t.items ? t.items[o] : (n = i,
        t.delegate && (n = n.find(t.delegate)),
        n.eq(o)),
        p._openClick({
            mfpEl: n
        }, i, t)) : p.isOpen && p[e].apply(p, Array.prototype.slice.call(arguments, 1)) : (e = c.extend(!0, {}, e),
        I ? i.data("magnificPopup", e) : i[0].magnificPopup = e,
        p.addGroup(i, e)),
        i
    }
    ;
    var P, E, z, M = "inline", O = function _putInlineElementsBack() {
        z && (E.after(z.addClass(P)).detach(),
        z = null)
    };
    c.magnificPopup.registerModule(M, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function initInline() {
                p.types.push(M),
                w(l + "." + M, function() {
                    O()
                })
            },
            getInline: function getInline(e, t) {
                if (O(),
                e.src) {
                    var o, n = p.st.inline, i = c(e.src);
                    return i.length ? (o = i[0].parentNode,
                    o && o.tagName && (E || (P = n.hiddenClass,
                    E = _(P),
                    P = "mfp-" + P),
                    z = i.after(E).detach().removeClass(P)),
                    p.updateStatus("ready")) : (p.updateStatus("error", n.tNotFound),
                    i = c("<div>")),
                    e.inlineElement = i,
                    i
                }
                return p.updateStatus("ready"),
                p._parseMarkup(t, {}, e),
                t
            }
        }
    });
    var B, L = "ajax", A = function _removeAjaxCursor() {
        B && c(document.body).removeClass(B)
    }, F = function _destroyAjaxRequest() {
        A(),
        p.req && p.req.abort()
    };
    c.magnificPopup.registerModule(L, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function initAjax() {
                p.types.push(L),
                B = p.st.ajax.cursor,
                w(l + "." + L, F),
                w("BeforeChange." + L, F)
            },
            getAjax: function getAjax(n) {
                B && c(document.body).addClass(B),
                p.updateStatus("loading");
                var e = c.extend({
                    url: n.src,
                    success: function success(e, t, o) {
                        o = {
                            data: e,
                            xhr: o
                        };
                        x("ParseAjax", o),
                        p.appendContent(c(o.data), L),
                        n.finished = !0,
                        A(),
                        p._setFocus(),
                        setTimeout(function() {
                            p.wrap.addClass(v)
                        }, 16),
                        p.updateStatus("ready"),
                        x("AjaxContentAdded")
                    },
                    error: function error() {
                        A(),
                        n.finished = n.loadError = !0,
                        p.updateStatus("error", p.st.ajax.tError.replace("%url%", n.src))
                    }
                }, p.st.ajax.settings);
                return p.req = c.ajax(e),
                ""
            }
        }
    });
    var H, j = function _getTitle(e) {
        if (e.data && void 0 !== e.data.title)
            return e.data.title;
        var t = p.st.image.titleSrc;
        if (t) {
            if (c.isFunction(t))
                return t.call(p, e);
            if (e.el)
                return e.el.attr(t) || ""
        }
        return ""
    };
    c.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function initImage() {
                var e = p.st.image
                  , t = ".image";
                p.types.push("image"),
                w(g + t, function() {
                    "image" === p.currItem.type && e.cursor && c(document.body).addClass(e.cursor)
                }),
                w(l + t, function() {
                    e.cursor && c(document.body).removeClass(e.cursor),
                    b.off("resize" + h)
                }),
                w("Resize" + t, p.resizeImage),
                p.isLowIE && w("AfterChange", p.resizeImage)
            },
            resizeImage: function resizeImage() {
                var e, t = p.currItem;
                t && t.img && p.st.image.verticalFit && (e = 0,
                p.isLowIE && (e = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)),
                t.img.css("max-height", p.wH - e))
            },
            _onImageHasSize: function _onImageHasSize(e) {
                e.img && (e.hasSize = !0,
                H && clearInterval(H),
                e.isCheckingImgSize = !1,
                x("ImageHasSize", e),
                e.imgHidden && (p.content && p.content.removeClass("mfp-loading"),
                e.imgHidden = !1))
            },
            findImageSize: function findImageSize(t) {
                var o = 0
                  , n = t.img[0]
                  , e = function mfpSetInterval(e) {
                    H && clearInterval(H),
                    H = setInterval(function() {
                        0 < n.naturalWidth ? p._onImageHasSize(t) : (200 < o && clearInterval(H),
                        o++,
                        3 === o ? mfpSetInterval(10) : 40 === o ? mfpSetInterval(50) : 100 === o && mfpSetInterval(500))
                    }, e)
                };
                e(1)
            },
            getImage: function getImage(e, t) {
                var o, n = 0, i = function onLoadComplete() {
                    e && (e.img[0].complete ? (e.img.off(".mfploader"),
                    e === p.currItem && (p._onImageHasSize(e),
                    p.updateStatus("ready")),
                    e.hasSize = !0,
                    e.loaded = !0,
                    x("ImageLoadComplete")) : (n++,
                    n < 200 ? setTimeout(onLoadComplete, 100) : r()))
                }, r = function onLoadError() {
                    e && (e.img.off(".mfploader"),
                    e === p.currItem && (p._onImageHasSize(e),
                    p.updateStatus("error", a.tError.replace("%url%", e.src))),
                    e.hasSize = !0,
                    e.loaded = !0,
                    e.loadError = !0)
                }, a = p.st.image, s = t.find(".mfp-img");
                return s.length && (o = document.createElement("img"),
                o.className = "mfp-img",
                e.el && e.el.find("img").length && (o.alt = e.el.find("img").attr("alt")),
                e.img = c(o).on("load.mfploader", i).on("error.mfploader", r),
                o.src = e.src,
                s.is("img") && (e.img = e.img.clone()),
                o = e.img[0],
                0 < o.naturalWidth ? e.hasSize = !0 : o.width || (e.hasSize = !1)),
                p._parseMarkup(t, {
                    title: j(e),
                    img_replaceWith: e.img
                }, e),
                p.resizeImage(),
                e.hasSize ? (H && clearInterval(H),
                e.loadError ? (t.addClass("mfp-loading"),
                p.updateStatus("error", a.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"),
                p.updateStatus("ready"))) : (p.updateStatus("loading"),
                e.loading = !0,
                e.hasSize || (e.imgHidden = !0,
                t.addClass("mfp-loading"),
                p.findImageSize(e))),
                t
            }
        }
    });
    var N, W = function getHasMozTransform() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform),
        N
    };
    c.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function opener(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function initZoom() {
                var e, t, o, n, i, r, a = p.st.zoom, s = ".zoom";
                a.enabled && p.supportsTransition && (t = a.duration,
                o = function getElToAnimate(e) {
                    var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image")
                      , o = "all " + a.duration / 1e3 + "s " + a.easing
                      , n = {
                        position: "fixed",
                        zIndex: 9999,
                        left: 0,
                        top: 0,
                        "-webkit-backface-visibility": "hidden"
                    }
                      , e = "transition";
                    return n["-webkit-" + e] = n["-moz-" + e] = n["-o-" + e] = n[e] = o,
                    t.css(n),
                    t
                }
                ,
                n = function showMainContent() {
                    p.content.css("visibility", "visible")
                }
                ,
                w("BuildControls" + s, function() {
                    p._allowZoom() && (clearTimeout(i),
                    p.content.css("visibility", "hidden"),
                    e = p._getItemToZoom(),
                    e ? (r = o(e),
                    r.css(p._getOffset()),
                    p.wrap.append(r),
                    i = setTimeout(function() {
                        r.css(p._getOffset(!0)),
                        i = setTimeout(function() {
                            n(),
                            setTimeout(function() {
                                r.remove(),
                                e = r = null,
                                x("ZoomAnimationEnded")
                            }, 16)
                        }, t)
                    }, 16)) : n())
                }),
                w(m + s, function() {
                    if (p._allowZoom()) {
                        if (clearTimeout(i),
                        p.st.removalDelay = t,
                        !e) {
                            if (e = p._getItemToZoom(),
                            !e)
                                return;
                            r = o(e)
                        }
                        r.css(p._getOffset(!0)),
                        p.wrap.append(r),
                        p.content.css("visibility", "hidden"),
                        setTimeout(function() {
                            r.css(p._getOffset())
                        }, 16)
                    }
                }),
                w(l + s, function() {
                    p._allowZoom() && (n(),
                    r && r.remove(),
                    e = null)
                }))
            },
            _allowZoom: function _allowZoom() {
                return "image" === p.currItem.type
            },
            _getItemToZoom: function _getItemToZoom() {
                return !!p.currItem.hasSize && p.currItem.img
            },
            _getOffset: function _getOffset(e) {
                var t = e ? p.currItem.img : p.st.zoom.opener(p.currItem.el || p.currItem)
                  , o = t.offset()
                  , n = parseInt(t.css("padding-top"), 10)
                  , e = parseInt(t.css("padding-bottom"), 10);
                o.top -= c(window).scrollTop() - n;
                n = {
                    width: t.width(),
                    height: (I ? t.innerHeight() : t[0].offsetHeight) - e - n
                };
                return W() ? n["-moz-transform"] = n.transform = "translate(" + o.left + "px," + o.top + "px)" : (n.left = o.left,
                n.top = o.top),
                n
            }
        }
    });
    var Z = "iframe"
      , R = "//about:blank"
      , q = function _fixIframeBugs(e) {
        var t;
        p.currTemplate[Z] && (t = p.currTemplate[Z].find("iframe"),
        t.length && (e || (t[0].src = R),
        p.isIE8 && t.css("display", e ? "block" : "none")))
    };
    c.magnificPopup.registerModule(Z, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen allow="autoplay"></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube-nocookie.com/embed/%id%?autoplay=1"
                },
                youtubeNoCookie: {
                    index: "youtube-nocookie.com",
                    id: "v=",
                    src: "//www.youtube-nocookie.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function initIframe() {
                p.types.push(Z),
                w("BeforeChange", function(e, t, o) {
                    t !== o && (t === Z ? q() : o === Z && q(!0))
                }),
                w(l + "." + Z, function() {
                    q()
                })
            },
            getIframe: function getIframe(e, t) {
                var o = e.src
                  , n = p.st.iframe;
                c.each(n.patterns, function() {
                    if (-1 < o.indexOf(this.index))
                        return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)),
                        o = this.src.replace("%id%", o),
                        !1
                });
                var i = {};
                return n.srcAction && (i[n.srcAction] = o),
                p._parseMarkup(t, i, e),
                p.updateStatus("ready"),
                t
            }
        }
    });
    var K = function _getLoopedId(e) {
        var t = p.items.length;
        return t - 1 < e ? e - t : e < 0 ? t + e : e
    }
      , D = function _replaceCurrTotal(e, t, o) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, o)
    };
    c.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function initGallery() {
                var r = p.st.gallery
                  , e = ".mfp-gallery";
                if (p.direction = !0,
                !r || !r.enabled)
                    return !1;
                u += " mfp-gallery",
                w(g + e, function() {
                    r.navigateByImgClick && p.wrap.on("click" + e, ".mfp-img", function() {
                        if (1 < p.items.length)
                            return p.next(),
                            !1
                    }),
                    d.on("keydown" + e, function(e) {
                        37 === e.keyCode ? p.prev() : 39 === e.keyCode && p.next()
                    })
                }),
                w("UpdateStatus" + e, function(e, t) {
                    t.text && (t.text = D(t.text, p.currItem.index, p.items.length))
                }),
                w(f + e, function(e, t, o, n) {
                    var i = p.items.length;
                    o.counter = 1 < i ? D(r.tCounter, n.index, i) : ""
                }),
                w("BuildControls" + e, function() {
                    var e, t;
                    1 < p.items.length && r.arrows && !p.arrowLeft && (t = r.arrowMarkup,
                    e = p.arrowLeft = c(t.replace(/%title%/gi, r.tPrev).replace(/%dir%/gi, "left")).addClass(C),
                    t = p.arrowRight = c(t.replace(/%title%/gi, r.tNext).replace(/%dir%/gi, "right")).addClass(C),
                    e.click(function() {
                        p.prev()
                    }),
                    t.click(function() {
                        p.next()
                    }),
                    p.container.append(e.add(t)))
                }),
                w(a + e, function() {
                    p._preloadTimeout && clearTimeout(p._preloadTimeout),
                    p._preloadTimeout = setTimeout(function() {
                        p.preloadNearbyImages(),
                        p._preloadTimeout = null
                    }, 16)
                }),
                w(l + e, function() {
                    d.off(e),
                    p.wrap.off("click" + e),
                    p.arrowRight = p.arrowLeft = null
                })
            },
            next: function next() {
                p.direction = !0,
                p.index = K(p.index + 1),
                p.updateItemHTML()
            },
            prev: function prev() {
                p.direction = !1,
                p.index = K(p.index - 1),
                p.updateItemHTML()
            },
            goTo: function goTo(e) {
                p.direction = e >= p.index,
                p.index = e,
                p.updateItemHTML()
            },
            preloadNearbyImages: function preloadNearbyImages() {
                for (var e = p.st.gallery.preload, t = Math.min(e[0], p.items.length), o = Math.min(e[1], p.items.length), n = 1; n <= (p.direction ? o : t); n++)
                    p._preloadItem(p.index + n);
                for (n = 1; n <= (p.direction ? t : o); n++)
                    p._preloadItem(p.index - n)
            },
            _preloadItem: function _preloadItem(e) {
                var t;
                e = K(e),
                p.items[e].preloaded || (t = p.items[e],
                t.parsed || (t = p.parseEl(e)),
                x("LazyLoad", t),
                "image" === t.type && (t.img = c('<img class="mfp-img" />').on("load.mfploader", function() {
                    t.hasSize = !0
                }).on("error.mfploader", function() {
                    t.hasSize = !0,
                    t.loadError = !0,
                    x("LazyLoadError", t)
                }).attr("src", t.src)),
                t.preloaded = !0)
            }
        }
    });
    var G = "retina";
    c.magnificPopup.registerModule(G, {
        options: {
            replaceSrc: function replaceSrc(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function initRetina() {
                var o, n;
                1 < window.devicePixelRatio && (o = p.st.retina,
                n = o.ratio,
                n = isNaN(n) ? n() : n,
                1 < n && (w("ImageHasSize." + G, function(e, t) {
                    t.img.css({
                        "max-width": t.img[0].naturalWidth / n,
                        width: "100%"
                    })
                }),
                w("ElementParse." + G, function(e, t) {
                    t.src = o.replaceSrc(t, n)
                })))
            }
        }
    }),
    T()
});

Array.prototype.forEach || (Array.prototype.forEach = function(t) {
    var e, n;
    if (null == this)
        throw new TypeError("this is null or not defined");
    var r, o = Object(this), i = o.length >>> 0;
    if ("function" != typeof t)
        throw new TypeError(t + " is not a function");
    for (1 < arguments.length && (e = arguments[1]),
    n = 0; n < i; ) {
        n in o && (r = o[n],
        t.call(e, r, n, o)),
        n++
    }
}
),
"function" != typeof NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach),
Array.from || (Array.from = function() {
    var e = Object.prototype.toString
      , a = function isCallable(t) {
        return "function" == typeof t || "[object Function]" === e.call(t)
    }
      , n = function toInteger(t) {
        var e = Number(t);
        return isNaN(e) ? 0 : 0 !== e && isFinite(e) ? (0 < e ? 1 : -1) * Math.floor(Math.abs(e)) : e
    }
      , r = Math.pow(2, 53) - 1
      , u = function toLength(t) {
        var e = n(t);
        return Math.min(Math.max(e, 0), r)
    };
    return function from(t) {
        var e = this
          , n = Object(t);
        if (null == t)
            throw new TypeError("Array.from requires an array-like object - not null or undefined");
        var r, o = 1 < arguments.length ? arguments[1] : void 0;
        if (void 0 !== o) {
            if (!a(o))
                throw new TypeError("Array.from: when provided, the second argument must be a function");
            2 < arguments.length && (r = arguments[2])
        }
        for (var i, s = u(n.length), c = a(e) ? Object(new e(s)) : new Array(s), h = 0; h < s; )
            i = n[h],
            c[h] = o ? void 0 === r ? o(i, h) : o.call(r, i, h) : i,
            h += 1;
        return c.length = s,
        c
    }
}()),
Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
    value: function value(t) {
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var e = Object(this)
          , n = e.length >>> 0;
        if ("function" != typeof t)
            throw new TypeError("predicate must be a function");
        for (var r = arguments[1], o = 0; o < n; ) {
            var i = e[o];
            if (t.call(r, i, o, e))
                return o;
            o++
        }
        return -1
    },
    configurable: !0,
    writable: !0
}),
function(h, a) {
    "use strict";
    var e;
    function IntersectionObserverEntry(t) {
        this.time = t.time,
        this.target = t.target,
        this.rootBounds = t.rootBounds,
        this.boundingClientRect = t.boundingClientRect,
        this.intersectionRect = t.intersectionRect || getEmptyRect(),
        this.isIntersecting = !!t.intersectionRect;
        var e = this.boundingClientRect
          , n = e.width * e.height
          , r = this.intersectionRect
          , o = r.width * r.height;
        this.intersectionRatio = n ? o / n : this.isIntersecting ? 1 : 0
    }
    function IntersectionObserver(t, e) {
        var n = e || {};
        if ("function" != typeof t)
            throw new Error("callback must be a function");
        if (n.root && 1 != n.root.nodeType)
            throw new Error("root must be an Element");
        this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT),
        this._callback = t,
        this._observationTargets = [],
        this._queuedEntries = [],
        this._rootMarginValues = this._parseRootMargin(n.rootMargin),
        this.thresholds = this._initThresholds(n.threshold),
        this.root = n.root || null,
        this.rootMargin = this._rootMarginValues.map(function(t) {
            return t.value + t.unit
        }).join(" ")
    }
    function now() {
        return h.performance && performance.now && performance.now()
    }
    function throttle(t, e) {
        var n = null;
        return function() {
            n = n || setTimeout(function() {
                t(),
                n = null
            }, e)
        }
    }
    function addEvent(t, e, n, r) {
        "function" == typeof t.addEventListener ? t.addEventListener(e, n, r || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, n)
    }
    function removeEvent(t, e, n, r) {
        "function" == typeof t.removeEventListener ? t.removeEventListener(e, n, r || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, n)
    }
    function computeRectIntersection(t, e) {
        var n = Math.max(t.top, e.top)
          , r = Math.min(t.bottom, e.bottom)
          , o = Math.max(t.left, e.left)
          , i = Math.min(t.right, e.right)
          , s = i - o
          , c = r - n;
        return 0 <= s && 0 <= c && {
            top: n,
            bottom: r,
            left: o,
            right: i,
            width: s,
            height: c
        }
    }
    function getBoundingClientRect(t) {
        var e;
        try {
            e = t.getBoundingClientRect()
        } catch (t) {}
        return e ? (e.width && e.height || (e = {
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            width: e.right - e.left,
            height: e.bottom - e.top
        }),
        e) : getEmptyRect()
    }
    function getEmptyRect() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }
    }
    function containsDeep(t, e) {
        for (var n = e; n; ) {
            if (n == t)
                return !0;
            n = getParentNode(n)
        }
        return !1
    }
    function getParentNode(t) {
        var e = t.parentNode;
        return e && 11 == e.nodeType && e.host ? e.host : e
    }
    "IntersectionObserver"in h && "IntersectionObserverEntry"in h && "intersectionRatio"in h.IntersectionObserverEntry.prototype ? "isIntersecting"in h.IntersectionObserverEntry.prototype || Object.defineProperty(h.IntersectionObserverEntry.prototype, "isIntersecting", {
        get: function get() {
            return 0 < this.intersectionRatio
        }
    }) : (e = [],
    IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100,
    IntersectionObserver.prototype.POLL_INTERVAL = null,
    IntersectionObserver.prototype.USE_MUTATION_OBSERVER = !0,
    IntersectionObserver.prototype.observe = function(e) {
        var t = this._observationTargets.some(function(t) {
            return t.element == e
        });
        if (!t) {
            if (!e || 1 != e.nodeType)
                throw new Error("target must be an Element");
            this._registerInstance(),
            this._observationTargets.push({
                element: e,
                entry: null
            }),
            this._monitorIntersections(),
            this._checkForIntersections()
        }
    }
    ,
    IntersectionObserver.prototype.unobserve = function(e) {
        this._observationTargets = this._observationTargets.filter(function(t) {
            return t.element != e
        }),
        this._observationTargets.length || (this._unmonitorIntersections(),
        this._unregisterInstance())
    }
    ,
    IntersectionObserver.prototype.disconnect = function() {
        this._observationTargets = [],
        this._unmonitorIntersections(),
        this._unregisterInstance()
    }
    ,
    IntersectionObserver.prototype.takeRecords = function() {
        var t = this._queuedEntries.slice();
        return this._queuedEntries = [],
        t
    }
    ,
    IntersectionObserver.prototype._initThresholds = function(t) {
        var e = t || [0];
        return Array.isArray(e) || (e = [e]),
        e.sort().filter(function(t, e, n) {
            if ("number" != typeof t || isNaN(t) || t < 0 || 1 < t)
                throw new Error("threshold must be a number between 0 and 1 inclusively");
            return t !== n[e - 1]
        })
    }
    ,
    IntersectionObserver.prototype._parseRootMargin = function(t) {
        var e = t || "0px"
          , n = e.split(/\s+/).map(function(t) {
            var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
            if (!e)
                throw new Error("rootMargin must be specified in pixels or percent");
            return {
                value: parseFloat(e[1]),
                unit: e[2]
            }
        });
        return n[1] = n[1] || n[0],
        n[2] = n[2] || n[0],
        n[3] = n[3] || n[1],
        n
    }
    ,
    IntersectionObserver.prototype._monitorIntersections = function() {
        this._monitoringIntersections || (this._monitoringIntersections = !0,
        this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (addEvent(h, "resize", this._checkForIntersections, !0),
        addEvent(a, "scroll", this._checkForIntersections, !0),
        this.USE_MUTATION_OBSERVER && "MutationObserver"in h && (this._domObserver = new MutationObserver(this._checkForIntersections),
        this._domObserver.observe(a, {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0
        }))))
    }
    ,
    IntersectionObserver.prototype._unmonitorIntersections = function() {
        this._monitoringIntersections && (this._monitoringIntersections = !1,
        clearInterval(this._monitoringInterval),
        this._monitoringInterval = null,
        removeEvent(h, "resize", this._checkForIntersections, !0),
        removeEvent(a, "scroll", this._checkForIntersections, !0),
        this._domObserver && (this._domObserver.disconnect(),
        this._domObserver = null))
    }
    ,
    IntersectionObserver.prototype._checkForIntersections = function() {
        var c = this._rootIsInDom()
          , h = c ? this._getRootRect() : getEmptyRect();
        this._observationTargets.forEach(function(t) {
            var e = t.element
              , n = getBoundingClientRect(e)
              , r = this._rootContainsTarget(e)
              , o = t.entry
              , i = c && r && this._computeTargetAndRootIntersection(e, h)
              , s = t.entry = new IntersectionObserverEntry({
                time: now(),
                target: e,
                boundingClientRect: n,
                rootBounds: h,
                intersectionRect: i
            });
            o ? c && r ? this._hasCrossedThreshold(o, s) && this._queuedEntries.push(s) : o && o.isIntersecting && this._queuedEntries.push(s) : this._queuedEntries.push(s)
        }, this),
        this._queuedEntries.length && this._callback(this.takeRecords(), this)
    }
    ,
    IntersectionObserver.prototype._computeTargetAndRootIntersection = function(t, e) {
        if ("none" != h.getComputedStyle(t).display) {
            for (var n = getBoundingClientRect(t), r = n, o = getParentNode(t), i = !1; !i; ) {
                var s = null
                  , c = 1 == o.nodeType ? h.getComputedStyle(o) : {};
                if ("none" == c.display)
                    return;
                if (o == this.root || o == a ? (i = !0,
                s = e) : o != a.body && o != a.documentElement && "visible" != c.overflow && (s = getBoundingClientRect(o)),
                s && (r = computeRectIntersection(s, r),
                !r))
                    break;
                o = getParentNode(o)
            }
            return r
        }
    }
    ,
    IntersectionObserver.prototype._getRootRect = function() {
        var t, e, n;
        return n = this.root ? getBoundingClientRect(this.root) : (t = a.documentElement,
        e = a.body,
        {
            top: 0,
            left: 0,
            right: t.clientWidth || e.clientWidth,
            width: t.clientWidth || e.clientWidth,
            bottom: t.clientHeight || e.clientHeight,
            height: t.clientHeight || e.clientHeight
        }),
        this._expandRectByRootMargin(n)
    }
    ,
    IntersectionObserver.prototype._expandRectByRootMargin = function(n) {
        var t = this._rootMarginValues.map(function(t, e) {
            return "px" == t.unit ? t.value : t.value * (e % 2 ? n.width : n.height) / 100
        })
          , e = {
            top: n.top - t[0],
            right: n.right + t[1],
            bottom: n.bottom + t[2],
            left: n.left - t[3]
        };
        return e.width = e.right - e.left,
        e.height = e.bottom - e.top,
        e
    }
    ,
    IntersectionObserver.prototype._hasCrossedThreshold = function(t, e) {
        var n = t && t.isIntersecting ? t.intersectionRatio || 0 : -1
          , r = e.isIntersecting ? e.intersectionRatio || 0 : -1;
        if (n !== r)
            for (var o = 0; o < this.thresholds.length; o++) {
                var i = this.thresholds[o];
                if (i == n || i == r || i < n != i < r)
                    return !0
            }
    }
    ,
    IntersectionObserver.prototype._rootIsInDom = function() {
        return !this.root || containsDeep(a, this.root)
    }
    ,
    IntersectionObserver.prototype._rootContainsTarget = function(t) {
        return containsDeep(this.root || a, t)
    }
    ,
    IntersectionObserver.prototype._registerInstance = function() {
        e.indexOf(this) < 0 && e.push(this)
    }
    ,
    IntersectionObserver.prototype._unregisterInstance = function() {
        var t = e.indexOf(this);
        -1 != t && e.splice(t, 1)
    }
    ,
    h.IntersectionObserver = IntersectionObserver,
    h.IntersectionObserverEntry = IntersectionObserverEntry)
}(window, document),
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);

function decryptCharcode(r, t, c, e) {
    return r += e,
    0 < e && c < r ? r = t + (r - c - 1) : e < 0 && r < t && (r = c - (t - r - 1)),
    String.fromCharCode(r)
}
function decryptString(r, t) {
    for (var c = "", e = r.length, n = 0; n < e; n++) {
        var o = r.charCodeAt(n);
        c += 43 <= o && o <= 58 ? decryptCharcode(o, 43, 58, t) : 64 <= o && o <= 90 ? decryptCharcode(o, 64, 90, t) : 97 <= o && o <= 122 ? decryptCharcode(o, 97, 122, t) : r.charAt(n)
    }
    return c
}
function linkTo_UnCryptMailto(r) {
    location.href = decryptString(r, 3)
}

GdTrackingModule = function GdTrackingModule() {
    var c = this;
    this.debugMode = !1,
    this.optOut = !1,
    this.cookieSettings = {
        default: !1,
        matomo: !1,
        statistics: !1,
        advert: !1
    },
    this.Data = {
        userId: ""
    },
    this.log = function(e) {
        !0 === c.debugMode && console.log("%cGD TRACKING: " + e, "color: #000000; background-color:gold;")
    }
    ,
    this.initialize = function() {
        if (!navigator.userAgent.match(/.*(KHTE|KTXN|GomezAgent|AlertSite|Pingdom|YottaMonitor|Screaming Frog SEO Spider|SearchmetricsBot|PhantomJS).*/gi) && !navigator.userAgent.match(/.*(Ich bin der PhantomJS).*/gi)) {
            if (-1 !== window.location.href.indexOf("gd-ncb=2") || "true" === window.sessionStorage.getItem("gd_no-tracking"))
                return c.CookieConsent.setCookie(!1, !1, !1),
                void window.sessionStorage.setItem("gd_no-tracking", "true");
            c.storeUtmParameter(),
            c.cookieSettings = c.CookieConsent.getSettings(),
            c.Matomo.init(),
            c.MatomoTagManager.init(),
            c.CookieConsent.init(),
            c.initTrackings(),
            c._dispatchLoadedEvent()
        }
    }
    ,
    this.initTrackings = function() {
        !0 === c.cookieSettings.statistics && (c.log("Init Trackings with CookieSettings > default: " + c.cookieSettings.default.toString() + ", statistics: " + c.cookieSettings.statistics.toString() + ", advert: " + c.cookieSettings.advert.toString() + ", matomo: " + c.cookieSettings.matomo.toString()),
        c.GoogleTagManager.init())
    }
    ,
    this.setOptOut = function(e) {
        c.optOut = !!e
    }
    ,
    this.setDebugMode = function(e) {
        c.debugMode = e
    }
    ,
    this.setUserId = function(e) {
        c.Data.userId = e
    }
    ,
    this._dispatchLoadedEvent = function() {
        var e = document.createEvent("CustomEvent");
        e.initEvent("GdTrackingLoaded", !0, !0),
        document.dispatchEvent(e)
    }
    ,
    this.CookieConsent = {
        domElement: null,
        isRendered: !1,
        panelsLoaded: !1,
        isLoading: !1,
        templateOptions: {
            mainTitle: "",
            mainText: "",
            acceptBtn: "",
            configBtn: ""
        },
        init: function init() {
            document.querySelectorAll('[data-cookie-open="config"]').forEach(function(e) {
                e.addEventListener("click", function(e) {
                    e.preventDefault(),
                    c.CookieConsent.showUserConfig()
                })
            }),
            navigator.userAgent.match(/.*(Ich bin der PhantomJS).*/gi) || -1 !== window.location.href.indexOf("gd-ncb=1") ? c.log("No need to show CookieConsent") : (c.log("Initialize CookieConsent"),
            !1 === c.cookieSettings.default && c.CookieConsent.show())
        },
        showPanel: function showPanel(t) {
            var o;
            !1 === c.CookieConsent.panelsLoaded ? !1 === c.CookieConsent.isLoading && (c.CookieConsent.isLoading = !0,
            o = new XMLHttpRequest,
            o.onload = function() {
                var e;
                200 === o.status ? (c.CookieConsent.show(),
                e = document.createElement("div"),
                e.innerHTML = o.responseText,
                e.childNodes.forEach(function(e) {
                    c.CookieConsent.domElement.appendChild(e)
                }),
                c.CookieConsent.isLoading = !1,
                c.CookieConsent.panelsLoaded = !0,
                c.CookieConsent.initConfigPanel(),
                setTimeout(function() {
                    c.CookieConsent.domElement.setAttribute("data-active-panel", t)
                }, 200)) : console.log("The request failed!")
            }
            ,
            o.open("GET", "/config.cookie_consent"),
            o.send()) : (c.CookieConsent.domElement.setAttribute("data-active-panel", t),
            c.CookieConsent.show())
        },
        initEvents: function initEvents() {
            c.CookieConsent.domElement.addEventListener("click", function(e) {
                var t, o, n, i;
                e.target && (e.target.matches("[data-cookie-open]") || e.target.matches("[data-cookie-open] *")) ? (e.preventDefault(),
                c.CookieConsent.showPanel(e.target.getAttribute("data-cookie-open") || e.target.parentNode.getAttribute("data-cookie-open"))) : e.target && (e.target.matches("[data-cookie-save]") || e.target.matches("[data-cookie-save] *")) ? (e.preventDefault(),
                t = "all" === e.target.getAttribute("data-cookie-save"),
                o = t || c.CookieConsent.domElement.querySelector('[data-cookie="statistics"]').checked,
                n = t || c.CookieConsent.domElement.querySelector('[data-cookie="advert"]').checked,
                i = t || c.CookieConsent.domElement.querySelector('[data-cookie="matomo"]').checked,
                !0 === c.MatomoTagManager.isInitialized && c.MatomoTagManager.submitConsentSettings("saveCookieSettings", i, o, n),
                c.CookieConsent.setCookie(o, n, i),
                c.CookieConsent.domElement.style.display = "none",
                c.initTrackings()) : e.target && (e.target.matches("[data-cookie-back]") || e.target.matches("[data-cookie-back] *")) && (e.preventDefault(),
                c.CookieConsent.showPanel("start"))
            }, !1)
        },
        initConfigPanel: function initConfigPanel() {
            c.CookieConsent.domElement.querySelectorAll('[data-panel="config"] .cookie-list__title.clickable').forEach(function(o) {
                o.addEventListener("click", function(e) {
                    var t = o.parentNode.parentNode;
                    t.classList.contains("open") ? t.classList.remove("open") : t.classList.add("open")
                })
            }),
            c.CookieConsent.domElement.querySelectorAll("[data-cookie-info]").forEach(function(t) {
                t.addEventListener("click", function(e) {
                    c.CookieConsent.showPanel("detail-config"),
                    c.CookieConsent.domElement.querySelector("#" + t.getAttribute("data-cookie-info")).scrollIntoView()
                })
            }),
            c.CookieConsent.domElement.querySelectorAll('[data-panel="config"] input[type="checkbox"]').forEach(function(t) {
                var e;
                !1 === t.disabled && (e = t.getAttribute("data-cookie"),
                t.checked = c.cookieSettings[e]),
                t.addEventListener("click", function(e) {
                    switch (t.getAttribute("data-cookie")) {
                    case "all":
                        !0 === t.checked ? c.CookieConsent.domElement.querySelectorAll('[data-cookie="advert"], [data-cookie="statistics"], [data-cookie="matomo"]').forEach(function(e) {
                            e.checked = !0
                        }) : c.CookieConsent.domElement.querySelectorAll('[data-cookie="advert"], [data-cookie="statistics"], [data-cookie="matomo"]').forEach(function(e) {
                            e.checked = !1
                        });
                        break;
                    case "advert":
                        !0 === t.checked ? c.CookieConsent.domElement.querySelectorAll('[data-cookie="all"], [data-cookie="statistics"], [data-cookie="matomo"]').forEach(function(e) {
                            e.checked = !0
                        }) : c.CookieConsent.domElement.querySelectorAll('[data-cookie="all"]').forEach(function(e) {
                            e.checked = !1
                        });
                        break;
                    case "matomo":
                        !1 === t.checked && c.CookieConsent.domElement.querySelectorAll('[data-cookie="advert"], [data-cookie="statistics"], [data-cookie="all"]').forEach(function(e) {
                            e.checked = !1
                        });
                        break;
                    case "statistics":
                        !0 === t.checked ? c.CookieConsent.domElement.querySelectorAll('[data-cookie="matomo"]').forEach(function(e) {
                            e.checked = !0
                        }) : c.CookieConsent.domElement.querySelectorAll('[data-cookie="advert"], [data-cookie="all"]').forEach(function(e) {
                            e.checked = !1
                        })
                    }
                })
            })
        },
        show: function show() {
            !1 === c.CookieConsent.isRendered && c.CookieConsent.render(),
            c.CookieConsent.domElement.style.display = "block"
        },
        showUserConfig: function showUserConfig() {
            c.CookieConsent.showPanel("config")
        },
        setCookie: function setCookie(e, t, o) {
            var n = {
                default: !0,
                matomo: o,
                statistics: e,
                advert: t
            };
            c.cookieSettings = n;
            var i = !0 === n.statistics ? 730 : 90;
            c.setCookie("GDS_CookieConsent", JSON.stringify(n), i)
        },
        getSettings: function getSettings() {
            var e = c.getCookie("GDS_CookieConsent");
            if (e) {
                var t = JSON.parse(e);
                return {
                    default: t.default || c.optOut,
                    matomo: t.matomo || c.optOut,
                    statistics: t.statistics || c.optOut,
                    advert: t.advert || c.optOut
                }
            }
            return {
                default: c.optOut,
                matomo: c.optOut,
                statistics: c.optOut,
                advert: c.optOut
            }
        },
        setTemplateOptions: function setTemplateOptions(e) {
            c.CookieConsent.templateOptions = e
        },
        render: function render() {
            var e = c.CookieConsent.templateOptions
              , t = '<div id="gd-cookie-consent" style="display: none;" data-active-panel="start">\n            <div data-panel="start">\n                <div class="content">\n                    <p class="head">' + e.mainTitle + "</p>\n                    <p>" + e.mainText + '</p>\n                    <div class="buttons">\n                       <button class="green large no-margin button" data-cookie-save="all">' + e.acceptBtn + '</button>\n                       <a data-cookie-open="config">' + e.configBtn + "</a>\n                   </div>\n         \t\t</div>\n            </div>\n    </div>";
            document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", t),
            c.CookieConsent.domElement = document.getElementById("gd-cookie-consent"),
            c.CookieConsent.initEvents(),
            c.CookieConsent.isRendered = !0
        }
    },
    this.GoogleTagManager = {
        isInitialized: !1,
        Options: {
            id: ""
        },
        setId: function setId(e) {
            c.GoogleTagManager.Options.id = e
        },
        init: function init() {
            "" !== c.GoogleTagManager.Options.id && !1 === c.GoogleTagManager.isInitialized && (c.log("load TagManager [" + c.GoogleTagManager.Options.id + "]"),
            c.GoogleTagManager.load(window, document, "script", "dataLayer", c.GoogleTagManager.Options.id),
            c.GoogleTagManager.isInitialized = !0,
            c.GoogleTagManager.initEventListeners())
        },
        load: function load(e, t, o, n, i) {
            window.dataLayer ? window.dataLayer.unshift({
                event: "setRetargetingSettings",
                cookieSetting_retargeting: c.cookieSettings.advert
            }) : (window.dataLayer = [],
            window.dataLayer.push({
                event: "setRetargetingSettings",
                cookieSetting_retargeting: c.cookieSettings.advert
            })),
            c.GoogleTagManager.doAdditionalStuff(),
            e[n] = e[n] || [],
            e[n].push({
                "gtm.start": (new Date).getTime(),
                event: "gtm.js"
            });
            var a = t.getElementsByTagName(o)[0]
              , s = t.createElement(o)
              , d = "dataLayer" != n ? "&l=" + n : "";
            s.async = !0,
            s.src = "//www.googletagmanager.com/gtm.js?id=" + i + d,
            a.parentNode.insertBefore(s, a)
        },
        pushEvent: function pushEvent(e) {
            !0 === c.GoogleTagManager.isInitialized && (c.log("Push Event " + e.event),
            window.dataLayer.push(e))
        },
        initEventListeners: function initEventListeners() {
            c.log("init TagManager Event Listeners"),
            document.addEventListener("mouseout", function handler(e) {
                e.toElement || e.relatedTarget || (document.removeEventListener("mouseout", handler, !1),
                setTimeout(function() {
                    GdTracking.GoogleTagManager.pushEvent({
                        event: "exit_intent"
                    })
                }, 1e3))
            })
        },
        doAdditionalStuff: function doAdditionalStuff() {
            void 0 !== window.gdGoogleAdvancedTracking && (1 < window.gdGoogleAdvancedTracking ? (c.GoogleTagManager.setGoogleCheckoutStep(1, !1, !0),
            c.GoogleTagManager.setGoogleCheckoutStep(2, !1, !0),
            c.GoogleTagManager.setGoogleCheckoutStep(3, !1, !1)) : 0 < window.gdGoogleAdvancedTracking && (c.GoogleTagManager.setGoogleCheckoutStep(1, !1, !0),
            c.GoogleTagManager.setGoogleCheckoutStep(2, !1, !1)))
        },
        setGoogleCheckoutStep: function setGoogleCheckoutStep(e) {
            if (e < 4)
                if (void 0 !== window.gdBasketItems && 0 < window.gdBasketItems.length) {
                    for (var t = [], o = 0; o < window.gdBasketItems.length; o++)
                        t.push({
                            id: window.gdBasketItems[o].id,
                            name: window.gdBasketItems[o].name,
                            category: window.gdBasketItems[o].category,
                            price: window.gdBasketItems[o].price,
                            quantity: window.gdBasketItems[o].quantity
                        });
                    window.dataLayer.push({
                        event: "EEcheckout",
                        ecommerce: {
                            checkout: {
                                actionField: {
                                    step: e
                                },
                                products: t
                            }
                        },
                        basketProducts: t
                    })
                } else
                    window.dataLayer.push({
                        event: "EEcheckout",
                        ecommerce: {
                            checkout: {
                                actionField: {
                                    step: e
                                }
                            }
                        }
                    })
        }
    },
    this.Matomo = {
        isInitialized: !1,
        Options: {
            id: 0
        },
        setId: function setId(e) {
            c.Matomo.Options.id = e
        },
        doAdditionalStuff: function doAdditionalStuff() {
            if (!0 === c.cookieSettings.matomo && void 0 !== window.dataLayer) {
                for (var e = null, t = 0; t < window.dataLayer.length; t++)
                    "undefined" != window.dataLayer[t].event && "purchase" == window.dataLayer[t].event && (e = window.dataLayer[t].purchasedBasket);
                if (null !== e) {
                    for (var o = 0; o < e.basketItems.length; o++)
                        window._paq = window._paq || [],
                        window._paq.push(["addEcommerceItem", e.basketItems[o].sku, e.basketItems[o].name, e.basketItems[o].abbreviation, e.basketItems[o].priceNetPerPiece, e.basketItems[o].qty]);
                    window._paq.push(["trackEcommerceOrder", e.orderId, parseFloat(e.revenueNet), parseFloat(e.revenueNet)])
                }
            }
        },
        init: function init() {
            0 < c.Matomo.Options.id && !1 === c.Matomo.isInitialized && (c.log("Initialize Matomo [" + c.Matomo.Options.id + "]"),
            window._paq = window._paq || [],
            window._paq.push(["requireCookieConsent"]),
            !0 === c.cookieSettings.matomo && (c.log("Activate Matomo Cookies"),
            _paq.push(["setCookieConsentGiven"])),
            void 0 !== c.Data.userId && "" !== c.Data.userId && window._paq.push(["setUserId", c.Data.userId]),
            window._paq.push(["enableLinkTracking"]),
            window._paq.push(["trackPageView"]),
            function() {
                var e = "//tracking.gdatasoftware.com/";
                window._paq.push(["setTrackerUrl", e + "matomo.php"]),
                window._paq.push(["setSiteId", c.Matomo.Options.id]);
                var t = document
                  , o = t.createElement("script")
                  , n = t.getElementsByTagName("script")[0];
                o.type = "text/javascript",
                o.async = !0,
                o.defer = !0,
                o.src = e + "matomo.js",
                n.parentNode.insertBefore(o, n)
            }(),
            c.Matomo.doAdditionalStuff(),
            c.Matomo.isInitialized = !0)
        }
    },
    this.MatomoTagManager = {
        isInitialized: !1,
        Options: {
            id: ""
        },
        setId: function setId(e) {
            c.MatomoTagManager.Options.id = e
        },
        init: function init() {
            var e, t, o;
            "" !== c.MatomoTagManager.Options.id && !1 === c.MatomoTagManager.isInitialized && (c.log("Initialize Matomo TagManager [" + c.MatomoTagManager.Options.id + "]"),
            window._paq = window._paq || [],
            window._paq.push(["requireCookieConsent"]),
            window._mtm = window._mtm || [],
            c.MatomoTagManager.submitConsentSettings("initCookieConsent", c.cookieSettings.matomo, c.cookieSettings.statistics, c.cookieSettings.advert),
            !0 === c.cookieSettings.matomo && (c.log("Activate Matomo Cookies"),
            _paq.push(["setCookieConsentGiven"])),
            window._mtm.push({
                "mtm.startTime": (new Date).getTime(),
                event: "mtm.Start"
            }),
            e = document,
            t = e.createElement("script"),
            o = e.getElementsByTagName("script")[0],
            t.type = "text/javascript",
            t.async = !0,
            t.defer = !0,
            t.src = "https://tracking.gdatasoftware.com/js/container_" + c.MatomoTagManager.Options.id + ".js",
            o.parentNode.insertBefore(t, o),
            c.MatomoTagManager.isInitialized = !0)
        },
        submitConsentSettings: function submitConsentSettings(e, t, o, n) {
            var i = n ? 3 : o ? 2 : t ? 1 : 0;
            _mtm.push({
                cookieConsent_matomo: t,
                cookieConsent_statistics: o,
                cookieConsent_advert: n,
                cookieConsent_level: i,
                event: e
            }),
            c.log("Submit Consent Settings to Matomo: " + e + ", Level " + i)
        }
    },
    this.getCookie = function(e) {
        for (var t = e + "=", o = document.cookie.split(";"), n = 0; n < o.length; n++) {
            for (var i = o[n]; " " == i.charAt(0); )
                i = i.substring(1);
            if (0 == i.indexOf(t))
                return i.substring(t.length, i.length)
        }
        return ""
    }
    ,
    this.setCookie = function(e, t, o) {
        var n = new Date
          , i = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
        -1 < o && (n.setTime(n.getTime() + 24 * o * 60 * 60 * 1e3),
        i = "expires=" + n.toUTCString()),
        document.cookie = e + "=" + t + ";" + i + ";secure;samesite=None;path=/"
    }
    ,
    this.storeUtmParameter = function() {
        var n = c.getUtmParameter();
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(e, t, o) {
            "utm_medium" !== t && "utm_source" !== t && "utm_campaign" !== t && "utm_content" !== t || (n[t] = o.replace(/(<([^>]+)>)/gi, ""))
        }),
        c.setCookie("GDS_utm", JSON.stringify(n), 1)
    }
    ,
    this.getUtmParameter = function() {
        var e = c.getCookie("GDS_utm");
        return e ? JSON.parse(e) : {
            utm_medium: "",
            utm_source: "",
            utm_campaign: "",
            utm_content: ""
        }
    }
}
;

function _typeof(e) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(e) {
        return typeof e
    }
    : function _typeof(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ,
    _typeof(e)
}
var GdPlatform = GdPlatform || {};
(function() {
    "use strict";
    var e = {
        function: !0,
        object: !0
    }
      , G = e["undefined" == typeof window ? "undefined" : _typeof(window)] && window || this
      , r = e["undefined" == typeof exports ? "undefined" : _typeof(exports)] && exports
      , t = e["undefined" == typeof module ? "undefined" : _typeof(module)] && module && !module.nodeType && module
      , i = r && t && "object" == ("undefined" == typeof global ? "undefined" : _typeof(global)) && global;
    !i || i.global !== i && i.window !== i && i.self !== i || (G = i);
    var n = Math.pow(2, 53) - 1
      , A = /\bOpera/
      , o = Object.prototype
      , a = o.hasOwnProperty
      , F = o.toString;
    function capitalize(e) {
        return e = String(e),
        e.charAt(0).toUpperCase() + e.slice(1)
    }
    function cleanupOS(e, t, r) {
        var i = {
            "10.0": "10",
            6.4: "10 Technical Preview",
            6.3: "8.1",
            6.2: "8",
            6.1: "Server 2008 R2 / 7",
            "6.0": "Server 2008 / Vista",
            5.2: "Server 2003 / XP 64-bit",
            5.1: "XP",
            5.01: "2000 SP1",
            "5.0": "2000",
            "4.0": "NT",
            "4.90": "ME"
        };
        return t && r && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (i = i[/[\d.]+$/.exec(e)]) && (e = "Windows " + i),
        e = String(e),
        t && r && (e = e.replace(RegExp(t, "i"), r)),
        e = format(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]),
        e
    }
    function each(e, t) {
        var r = -1
          , i = e ? e.length : 0;
        if ("number" == typeof i && -1 < i && i <= n)
            for (; ++r < i; )
                t(e[r], r, e);
        else
            forOwn(e, t)
    }
    function format(e) {
        return e = trim(e),
        /^(?:webOS|i(?:OS|P))/.test(e) ? e : capitalize(e)
    }
    function forOwn(e, t) {
        for (var r in e)
            a.call(e, r) && t(e[r], r, e)
    }
    function getClassOf(e) {
        return null == e ? capitalize(e) : F.call(e).slice(8, -1)
    }
    function isHostType(e, t) {
        var r = null != e ? _typeof(e[t]) : "number";
        return !(/^(?:boolean|number|string|undefined)$/.test(r) || "object" == r && !e[t])
    }
    function qualify(e) {
        return String(e).replace(/([ -])(?!$)/g, "$1?")
    }
    function reduce(r, i) {
        var n = null;
        return each(r, function(e, t) {
            n = i(n, e, t, r)
        }),
        n
    }
    function trim(e) {
        return String(e).replace(/^ +| +$/g, "")
    }
    function parse(i) {
        var t = G
          , e = i && "object" == _typeof(i) && "String" != getClassOf(i);
        e && (t = i,
        i = null);
        var r = t.navigator || {}
          , n = r.userAgent || "";
        i = i || n;
        var o, a, l = e ? !!r.likeChrome : /\bChrome\b/.test(i) && !/internal|\n/i.test(F.toString()), s = "Object", b = e ? s : "ScriptBridgingProxyObject", c = e ? s : "Environment", u = e && t.java ? "JavaPackage" : getClassOf(t.java), p = e ? s : "RuntimeObject", d = /\bJava/.test(u) && t.java, f = d && getClassOf(t.environment) == c, S = d ? "a" : "α", m = d ? "b" : "β", g = t.document || {}, x = t.operamini || t.opera, h = A.test(h = e && x ? x["[[Class]]"] : getClassOf(x)) ? h : x = null, y = i, O = [], M = null, w = i == n, P = w && x && "function" == typeof x.version && x.version(), v = getLayout([{
            label: "EdgeHTML",
            pattern: "(?:Edge|EdgA|EdgiOS)"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]), E = getName(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
            label: "Microsoft Edge",
            pattern: "(?:Edge|EdgA|EdgiOS)"
        }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
            label: "Samsung Internet",
            pattern: "SamsungBrowser"
        }, "SeaMonkey", {
            label: "Silk",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Sleipnir", "SlimBrowser", {
            label: "SRWare Iron",
            pattern: "Iron"
        }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
            label: "Opera Mini",
            pattern: "OPiOS"
        }, "Opera", {
            label: "Opera",
            pattern: "OPR"
        }, "Chrome", {
            label: "Chrome Mobile",
            pattern: "(?:CriOS|CrMo)"
        }, {
            label: "Firefox",
            pattern: "(?:Firefox|Minefield)"
        }, {
            label: "Firefox for iOS",
            pattern: "FxiOS"
        }, {
            label: "IE",
            pattern: "IEMobile"
        }, {
            label: "IE",
            pattern: "MSIE"
        }, "Safari"]), k = getProduct([{
            label: "BlackBerry",
            pattern: "BB10"
        }, "BlackBerry", {
            label: "Galaxy S",
            pattern: "GT-I9000"
        }, {
            label: "Galaxy S2",
            pattern: "GT-I9100"
        }, {
            label: "Galaxy S3",
            pattern: "GT-I9300"
        }, {
            label: "Galaxy S4",
            pattern: "GT-I9500"
        }, {
            label: "Galaxy S5",
            pattern: "SM-G900"
        }, {
            label: "Galaxy S6",
            pattern: "SM-G920"
        }, {
            label: "Galaxy S6 Edge",
            pattern: "SM-G925"
        }, {
            label: "Galaxy S7",
            pattern: "SM-G930"
        }, {
            label: "Galaxy S7 Edge",
            pattern: "SM-G935"
        }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
            label: "Kindle Fire",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
            label: "Wii U",
            pattern: "WiiU"
        }, "Wii", "Xbox One", {
            label: "Xbox 360",
            pattern: "Xbox"
        }, "Xoom"]), C = getManufacturer({
            Apple: {
                iPad: 1,
                iPhone: 1,
                iPod: 1
            },
            Archos: {},
            Amazon: {
                Kindle: 1,
                "Kindle Fire": 1
            },
            Asus: {
                Transformer: 1
            },
            "Barnes & Noble": {
                Nook: 1
            },
            BlackBerry: {
                PlayBook: 1
            },
            Google: {
                "Google TV": 1,
                Nexus: 1
            },
            HP: {
                TouchPad: 1
            },
            HTC: {},
            LG: {},
            Microsoft: {
                Xbox: 1,
                "Xbox One": 1
            },
            Motorola: {
                Xoom: 1
            },
            Nintendo: {
                "Wii U": 1,
                Wii: 1
            },
            Nokia: {
                Lumia: 1
            },
            Samsung: {
                "Galaxy S": 1,
                "Galaxy S2": 1,
                "Galaxy S3": 1,
                "Galaxy S4": 1
            },
            Sony: {
                PlayStation: 1,
                "PlayStation Vita": 1
            }
        }), W = getOS(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        function getLayout(e) {
            return reduce(e, function(e, t) {
                return e || RegExp("\\b" + (t.pattern || qualify(t)) + "\\b", "i").exec(i) && (t.label || t)
            })
        }
        function getManufacturer(e) {
            return reduce(e, function(e, t, r) {
                return e || (t[k] || t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(k)] || RegExp("\\b" + qualify(r) + "(?:\\b|\\w*\\d)", "i").exec(i)) && r
            })
        }
        function getName(e) {
            return reduce(e, function(e, t) {
                return e || RegExp("\\b" + (t.pattern || qualify(t)) + "\\b", "i").exec(i) && (t.label || t)
            })
        }
        function getOS(e) {
            return reduce(e, function(e, t) {
                var r = t.pattern || qualify(t);
                return !e && (e = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(i)) && (e = cleanupOS(e, r, t.label || t)),
                e
            })
        }
        function getProduct(e) {
            return reduce(e, function(e, t) {
                var r = t.pattern || qualify(t);
                return !e && (e = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(i) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(i) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(i)) && ((e = String(t.label && !RegExp(r, "i").test(t.label) ? t.label : e).split("/"))[1] && !/[\d.]+/.test(e[0]) && (e[0] += " " + e[1]),
                t = t.label || t,
                e = format(e[0].replace(RegExp(r, "i"), t).replace(RegExp("; *(?:" + t + "[_-])?", "i"), " ").replace(RegExp("(" + t + ")[-_.]?(\\w)", "i"), "$1 $2"))),
                e
            })
        }
        function getVersion(e) {
            return reduce(e, function(e, t) {
                return e || (RegExp(t + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(i) || 0)[1] || null
            })
        }
        function toStringPlatform() {
            return this.description || ""
        }
        if (v = v && [v],
        C && !k && (k = getProduct([C])),
        (o = /\bGoogle TV\b/.exec(k)) && (k = o[0]),
        /\bSimulator\b/i.test(i) && (k = (k ? k + " " : "") + "Simulator"),
        "Opera Mini" == E && /\bOPiOS\b/.test(i) && O.push("running in Turbo/Uncompressed mode"),
        "IE" == E && /\blike iPhone OS\b/.test(i) ? (o = parse(i.replace(/like iPhone OS/, "")),
        C = o.manufacturer,
        k = o.product) : /^iP/.test(k) ? (E = E || "Safari",
        W = "iOS" + ((o = / OS ([\d_]+)/i.exec(i)) ? " " + o[1].replace(/_/g, ".") : "")) : "Konqueror" != E || /buntu/i.test(W) ? C && "Google" != C && (/Chrome/.test(E) && !/\bMobile Safari\b/i.test(i) || /\bVita\b/.test(k)) || /\bAndroid\b/.test(W) && /^Chrome/.test(E) && /\bVersion\//i.test(i) ? (E = "Android Browser",
        W = /\bAndroid\b/.test(W) ? W : "Android") : "Silk" == E ? (/\bMobi/i.test(i) || (W = "Android",
        O.unshift("desktop mode")),
        /Accelerated *= *true/i.test(i) && O.unshift("accelerated")) : "PaleMoon" == E && (o = /\bFirefox\/([\d.]+)\b/.exec(i)) ? O.push("identifying as Firefox " + o[1]) : "Firefox" == E && (o = /\b(Mobile|Tablet|TV)\b/i.exec(i)) ? (W = W || "Firefox OS",
        k = k || o[1]) : !E || (o = !/\bMinefield\b/i.test(i) && /\b(?:Firefox|Safari)\b/.exec(E)) ? (E && !k && /[\/,]|^[^(]+?\)/.test(i.slice(i.indexOf(o + "/") + 8)) && (E = null),
        (o = k || C || W) && (k || C || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(W)) && (E = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(W) ? W : o) + " Browser")) : "Electron" == E && (o = (/\bChrome\/([\d.]+)\b/.exec(i) || 0)[1]) && O.push("Chromium " + o) : W = "Kubuntu",
        P = P || getVersion(["(?:Cloud9|CriOS|CrMo|Edge|EdgA|EdgiOS|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", qualify(E), "(?:Firefox|Minefield|NetFront)"]),
        (o = ("iCab" == v && 3 < parseFloat(P) ? "WebKit" : /\bOpera\b/.test(E) && (/\bOPR\b/.test(i) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(i) && !/^(?:Trident|EdgeHTML)$/.test(v) && "WebKit" || !v && /\bMSIE\b/i.test(i) && ("Mac OS" == W ? "Tasman" : "Trident") || "WebKit" == v && /\bPlayStation\b(?! Vita\b)/i.test(E) && "NetFront") && (v = [o]),
        "IE" == E && (o = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(i) || 0)[1]) ? (E += " Mobile",
        W = "Windows Phone " + (/\+$/.test(o) ? o : o + ".x"),
        O.unshift("desktop mode")) : /\bWPDesktop\b/i.test(i) ? (E = "IE Mobile",
        W = "Windows Phone 8.x",
        O.unshift("desktop mode"),
        P = P || (/\brv:([\d.]+)/.exec(i) || 0)[1]) : "IE" != E && "Trident" == v && (o = /\brv:([\d.]+)/.exec(i)) && (E && O.push("identifying as " + E + (P ? " " + P : "")),
        E = "IE",
        P = o[1]),
        w) {
            if (isHostType(t, "global"))
                if (d && (o = d.lang.System,
                y = o.getProperty("os.arch"),
                W = W || o.getProperty("os.name") + " " + o.getProperty("os.version")),
                f) {
                    try {
                        P = t.require("ringo/engine").version.join("."),
                        E = "RingoJS"
                    } catch (e) {
                        (o = t.system) && o.global.system == t.system && (E = "Narwhal",
                        W = W || (o[0].os || null))
                    }
                    E = E || "Rhino"
                } else
                    "object" == _typeof(t.process) && !t.process.browser && (o = t.process) && ("object" == _typeof(o.versions) && ("string" == typeof o.versions.electron ? (O.push("Node " + o.versions.node),
                    E = "Electron",
                    P = o.versions.electron) : "string" == typeof o.versions.nw && (O.push("Chromium " + P, "Node " + o.versions.node),
                    E = "NW.js",
                    P = o.versions.nw)),
                    E || (E = "Node.js",
                    y = o.arch,
                    W = o.platform,
                    P = /[\d.]+/.exec(o.version),
                    P = P ? P[0] : null));
            else
                getClassOf(o = t.runtime) == b ? (E = "Adobe AIR",
                W = o.flash.system.Capabilities.os) : getClassOf(o = t.phantom) == p ? (E = "PhantomJS",
                P = (o = o.version || null) && o.major + "." + o.minor + "." + o.patch) : "number" == typeof g.documentMode && (o = /\bTrident\/(\d+)/i.exec(i)) ? (P = [P, g.documentMode],
                (o = +o[1] + 4) != P[1] && (O.push("IE " + P[1] + " mode"),
                v && (v[1] = ""),
                P[1] = o),
                P = "IE" == E ? String(P[1].toFixed(1)) : P[0]) : "number" == typeof g.documentMode && /^(?:Chrome|Firefox)\b/.test(E) && (O.push("masking as " + E + " " + P),
                E = "IE",
                P = "11.0",
                v = ["Trident"],
                W = "Windows");
            W = W && format(W)
        }
        if (P && (o = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(P) || /(?:alpha|beta)(?: ?\d)?/i.exec(i + ";" + (w && r.appMinorVersion)) || /\bMinefield\b/i.test(i) && "a") && (M = /b/i.test(o) ? "beta" : "alpha",
        P = P.replace(RegExp(o + "\\+?$"), "") + ("beta" == M ? m : S) + (/\d+\+?/.exec(o) || "")),
        "Fennec" == E || "Firefox" == E && /\b(?:Android|Firefox OS)\b/.test(W))
            E = "Firefox Mobile";
        else if ("Maxthon" == E && P)
            P = P.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(k))
            "Xbox 360" == k && (W = null),
            "Xbox 360" == k && /\bIEMobile\b/.test(i) && O.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(E) && (!E || k || /Browser|Mobi/.test(E)) || "Windows CE" != W && !/Mobi/i.test(i))
            if ("IE" == E && w)
                try {
                    null === t.external && O.unshift("platform preview")
                } catch (e) {
                    O.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(k) || /\bBB10\b/.test(i)) && (o = (RegExp(k.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(i) || 0)[1] || P) ? (o = [o, /BB10/.test(i)],
                W = (o[1] ? (k = null,
                C = "BlackBerry") : "Device Software") + " " + o[0],
                P = null) : this != forOwn && "Wii" != k && (w && x || /Opera/.test(E) && /\b(?:MSIE|Firefox)\b/i.test(i) || "Firefox" == E && /\bOS X (?:\d+\.){2,}/.test(W) || "IE" == E && (W && !/^Win/.test(W) && 5.5 < P || /\bWindows XP\b/.test(W) && 8 < P || 8 == P && !/\bTrident\b/.test(i))) && !A.test(o = parse.call(forOwn, i.replace(A, "") + ";")) && o.name && (o = "ing as " + o.name + ((o = o.version) ? " " + o : ""),
                A.test(E) ? (/\bIE\b/.test(o) && "Mac OS" == W && (W = null),
                o = "identify" + o) : (o = "mask" + o,
                E = h ? format(h.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(o) && (W = null),
                w || (P = null)),
                v = ["Presto"],
                O.push(o));
        else
            E += " Mobile";
        (o = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(i) || 0)[1]) && (o = [parseFloat(o.replace(/\.(\d)$/, ".0$1")), o],
        "Safari" == E && "+" == o[1].slice(-1) ? (E = "WebKit Nightly",
        M = "alpha",
        P = o[1].slice(0, -1)) : P != o[1] && P != (o[2] = (/\bSafari\/([\d.]+\+?)/i.exec(i) || 0)[1]) || (P = null),
        o[1] = (/\bChrome\/([\d.]+)/i.exec(i) || 0)[1],
        537.36 == o[0] && 537.36 == o[2] && 28 <= parseFloat(o[1]) && "WebKit" == v && (v = ["Blink"]),
        o = w && (l || o[1]) ? (v && (v[1] = "like Chrome"),
        o[1] || (o = o[0],
        o < 530 ? 1 : o < 532 ? 2 : o < 532.05 ? 3 : o < 533 ? 4 : o < 534.03 ? 5 : o < 534.07 ? 6 : o < 534.1 ? 7 : o < 534.13 ? 8 : o < 534.16 ? 9 : o < 534.24 ? 10 : o < 534.3 ? 11 : o < 535.01 ? 12 : o < 535.02 ? "13+" : o < 535.07 ? 15 : o < 535.11 ? 16 : o < 535.19 ? 17 : o < 536.05 ? 18 : o < 536.1 ? 19 : o < 537.01 ? 20 : o < 537.11 ? "21+" : o < 537.13 ? 23 : o < 537.18 ? 24 : o < 537.24 ? 25 : o < 537.36 ? 26 : "Blink" != v ? "27" : "28")) : (v && (v[1] = "like Safari"),
        o = o[0],
        o < 400 ? 1 : o < 500 ? 2 : o < 526 ? 3 : o < 533 ? 4 : o < 534 ? "4+" : o < 535 ? 5 : o < 537 ? 6 : o < 538 ? 7 : o < 601 ? 8 : "8"),
        v && (v[1] += " " + (o += "number" == typeof o ? ".x" : /[.+]/.test(o) ? "" : "+")),
        "Safari" == E && (!P || 45 < parseInt(P)) && (P = o)),
        "Opera" == E && (o = /\bzbov|zvav$/.exec(W)) ? (E += " ",
        O.unshift("desktop mode"),
        "zvav" == o ? (E += "Mini",
        P = null) : E += "Mobile",
        W = W.replace(RegExp(" *" + o + "$"), "")) : "Safari" == E && /\bChrome\b/.exec(v && v[1]) && (O.unshift("desktop mode"),
        E = "Chrome Mobile",
        P = null,
        W = /\bOS X\b/.test(W) ? (C = "Apple",
        "iOS 4.3+") : null),
        P && 0 == P.indexOf(o = /[\d.]+$/.exec(W)) && -1 < i.indexOf("/" + o + "-") && (W = trim(W.replace(o, ""))),
        v && !/\b(?:Avant|Nook)\b/.test(E) && (/Browser|Lunascape|Maxthon/.test(E) || "Safari" != E && /^iOS/.test(W) && /\bSafari\b/.test(v[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(E) && v[1]) && (o = v[v.length - 1]) && O.push(o),
        O.length && (O = ["(" + O.join("; ") + ")"]),
        C && k && k.indexOf(C) < 0 && O.push("on " + C),
        k && O.push((/^on /.test(O[O.length - 1]) ? "" : "on ") + k),
        W && (o = / ([\d.+]+)$/.exec(W),
        a = o && "/" == W.charAt(W.length - o[0].length - 1),
        W = {
            architecture: 32,
            family: o && !a ? W.replace(o[0], "") : W,
            version: o ? o[1] : null,
            toString: function toString() {
                var e = this.version;
                return this.family + (e && !a ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
            }
        }),
        (o = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(y)) && !/\bi686\b/i.test(y) ? (W && (W.architecture = 64,
        W.family = W.family.replace(RegExp(" *" + o), "")),
        E && (/\bWOW64\b/i.test(i) || w && /\w(?:86|32)$/.test(r.cpuClass || r.platform) && !/\bWin64; x64\b/i.test(i)) && O.unshift("32-bit")) : W && /^OS X/.test(W.family) && "Chrome" == E && 39 <= parseFloat(P) && (W.architecture = 64),
        i = i || null;
        var B = {};
        return B.description = i,
        B.layout = v && v[0],
        B.manufacturer = C,
        B.name = E,
        B.prerelease = M,
        B.product = k,
        B.ua = i,
        B.version = E && P,
        B.os = W || {
            architecture: null,
            family: null,
            version: null,
            toString: function toString() {
                return "null"
            }
        },
        B.parse = parse,
        B.toString = toStringPlatform,
        B.version && O.unshift(P),
        B.name && O.unshift(E),
        W && E && (W != String(W).split(" ")[0] || W != E.split(" ")[0] && !k) && O.push(k ? "(" + W + ")" : "on " + W),
        O.length && (B.description = O.join(" ")),
        B
    }
    var l = parse();
    "function" == typeof define && "object" == _typeof(define.amd) && define.amd ? (G.platform = l,
    define(function() {
        return l
    })) : r && t ? forOwn(l, function(e, t) {
        r[t] = e
    }) : G.GdPlatform = l
}
).call(this),
GdPlatform.getOsFamily = function() {
    var e = "";
    switch (GdPlatform.os.family) {
    case "OS X":
        e = "Mac";
        break;
    case "Android":
        e = "Android";
        break;
    case "iOS":
        e = "iOS";
        break;
    case "Windows":
    case "Windows XP":
    case "Windows Server 2008 R2 / 7":
    case "Windows Server 2008 / Vista":
        e = "Windows";
        break;
    case "Windows Phone":
        e = "Windows_Mobile";
        break;
    case "Debian":
    case "Ubuntu":
    case "Fedora":
    case "Red Hat":
    case "SuSE":
        e = "GNU_Linux"
    }
    return e
}
,
GdPlatform.getBrowser = function() {
    var e = "";
    switch (GdPlatform.os.family) {
    case "Chrome":
    case "Chrome Mobile":
        e = "chrome";
        break;
    case "Firefox":
    case "Firefox Mobile":
        e = "firefox";
        break;
    case "Opera":
        e = "opera";
        break;
    case "Safari":
        e = "safari";
        break;
    case "IE":
    case "Microsoft Edge":
        e = "edge"
    }
    return e
}
;

var GdWebsite = GdWebsite || {};
GdWebsite.Data = {
    lastScrollTop: 0,
    scheduledAnimationFrame: !1
},
GdWebsite.Hooks = {
    onScroll: []
},
GdWebsite.Functions = {
    init: function init() {
        window.addEventListener("scroll", GdWebsite.Functions.onScroll),
        GdWebsite.Functions.writeJobConsoleMessage(),
        GdWebsite.Functions.updateMiniBasket()
    },
    registerObserver: function registerObserver(t, e, a, o, n) {
        GdWebsite.InsersectionObservers = GdWebsite.InsersectionObservers || {},
        GdWebsite.InsersectionObservers[t] = new IntersectionObserver(a,e),
        void 0 !== o && document.querySelectorAll(o).forEach(function(e) {
            void 0 !== n && n(e),
            GdWebsite.InsersectionObservers[t].observe(e)
        })
    },
    registerOnScrollHook: function registerOnScrollHook(e) {
        GdWebsite.Hooks.onScroll.push(e)
    },
    onScroll: function onScroll() {
        GdWebsite.Data.lastScrollTop = window.scrollY,
        GdWebsite.Data.scheduledAnimationFrame || (GdWebsite.Data.scheduledAnimationFrame = !0,
        window.requestAnimationFrame(GdWebsite.Functions.readAndUpdatePage))
    },
    readAndUpdatePage: function readAndUpdatePage() {
        GdWebsite.Hooks.onScroll.forEach(function(e) {
            e()
        }),
        GdWebsite.Data.scheduledAnimationFrame = !1
    },
    writeJobConsoleMessage: function writeJobConsoleMessage() {
        var e = window.location.hostname;
        "www.gdata.de" != e && "de" != e.substr(0, 2) || (console.log("%c\n                ██████╗     ██████╗  █████╗ ████████╗ █████╗\n                ██╔════╝     ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗ \t%cTRUST IN%c\n                ██║  ███╗    ██║  ██║███████║   ██║   ███████║  %cGERMAN%c\n                ██║   ██║    ██║  ██║██╔══██║   ██║   ██╔══██║ \t%cSICHERHEIT%c\n                ╚██████╔╝    ██████╔╝██║  ██║   ██║   ██║  ██║\n                 ╚═════╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝\n                ", "color:#c20e1a;font-family:monospace", "color:#000000;font-family:monospace", "color:#c20e1a;font-family:monospace", "color:#000000;font-family:monospace", "color:#c20e1a;font-family:monospace", "color:#000000;font-family:monospace", "color:#c20e1a;font-family:monospace"),
        console.log("%cOh, you are reading our sourcecode? You are a developer? We are hiring!", "color: #FFFFFF; font-size: x-large; background-color:#151c21;"),
        console.log("%cLooking for a job opportunity? www.gdata.de/jobs or apply now personal@gdata.de.", "color: #c20e1a; font-size: large;"))
    },
    addPopupSurvey: function addPopupSurvey() {
        var e, t, a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "corner", n = "popup-survey", i = "main";
        -1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") || null !== document.getElementById(i) && null !== document.getElementById(n) || (e = '<div class="inner">\n        <header>\n            <button data-survey-close>x</button>\n            <h3>\n                Helfen Sie uns, Ihnen auf unserer Website besser zu helfen.\n            </h3>\n            <p>Bitte beantworten Sie kurz anonym.</p>\n        </header>\n        <div class="popup-survey__content">\n            <div class="popup-survey__loader"><div></div><div></div><div></div></div>\n            <iframe sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation" src="https://survey.gdatasoftware.com/index.php/' + a + '?lang=de"></iframe>\n        </div>\n    </div>',
        t = document.createElement("div"),
        t.id = n,
        t.classList.add("popup-survey", "popup-survey_" + o),
        "corner" === o && t.classList.add("fadeInRight", "animated"),
        t.innerHTML = e,
        t.querySelector("[data-survey-close]").addEventListener("click", function() {
            t.remove()
        }),
        document.getElementById(i).appendChild(t))
    },
    lazyLoadImages: function lazyLoadImages() {
        var e, t;
        "loading"in HTMLImageElement.prototype ? (e = document.querySelectorAll('img[loading="lazy"]'),
        e.forEach(function(e) {
            e.dataset.src && (e.src = e.dataset.src),
            e.dataset.srcset && (e.srcset = e.dataset.srcset)
        })) : (t = document.createElement("script"),
        t.src = "/typo3conf/ext/gd_sites/Resources/Public/JavaScript/lazysizes.js",
        document.body.appendChild(t))
    },
    updateMiniBasket: function updateMiniBasket() {
        var e, t, o = document.querySelector("[data-menu-basket-badge]"), n = document.querySelector('[data-menu-trigger="basket"]');
        null !== o && null !== n && (e = document.cookie.replace(/(?:(?:^|.*;\s*)GDS_miniBasketData\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        t = decodeURIComponent(e).split("#"),
        t.forEach(function(e, t) {
            var a = e.split("|");
            0 === t && (a[0] <= 0 ? o.setAttribute("data-menu-basket-badge", 0) : (o.setAttribute("data-menu-basket-badge", a[0]),
            n.setAttribute("href", o.getAttribute("data-basket-url"))))
        }))
    }
},
jQuery(document).ready(function() {
    GdWebsite.Functions.init()
}),
window.addEventListener("load", function() {
    "undefined" != typeof GdPlatform && document.querySelectorAll('[data-tab-os-selected="' + GdPlatform.getOsFamily() + '"]').forEach(function(e) {
        var t = e.id
          , a = $("#" + e.parentNode.dataset.tabsContent);
        a.foundation("selectTab", t)
    })
}, !1),
$(document).ready(function() {
    var e;
    void 0 !== $.magnificPopup && ($('.fancybox:not([href*="youtube"])').magnificPopup({
        type: "image",
        closeOnContentClick: !0,
        mainClass: "mfp-img-mobile",
        image: {
            verticalFit: !0,
            titleSrc: function titleSrc(e) {
                var t = $(e.el).find("img")
                  , a = t.attr("title")
                  , o = t.attr("data-description");
                return null == a && (a = ""),
                null == o && (o = ""),
                a + "<small>" + o + "</small>"
            }
        }
    }),
    $('article[class*="teaser"] a[href*="youtube"], .video01, a.video[href*="youtube"], .fancybox[href*="youtube"], .cboxElement[href*="youtube"]').magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1
    }),
    $(".popup-gallery").each(function() {
        $(this).magnificPopup({
            delegate: "a.gallery-item",
            type: "image",
            tLoading: "Loading image #%curr%...",
            mainClass: "mfp-img-mobile",
            gallery: {
                enabled: !0,
                navigateByImgClick: !0,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function titleSrc(e) {
                    var t = $(e.el).find("img")
                      , a = t.attr("title")
                      , o = t.attr("data-description");
                    return null == a && (a = ""),
                    null == o && (o = ""),
                    a + "<small>" + o + "</small>"
                }
            }
        })
    })),
    $(window).scroll(function() {
        350 < $(this).scrollTop() ? 0 == $(".go-top").hasClass("fadeInUp") && $(".go-top").removeClass("fadeOutDown").addClass("animated fadeInUp") : $(".go-top").hasClass("fadeInUp") && 0 == $(".go-top").hasClass("fadeOutDown") && $(".go-top").removeClass("fadeInUp").addClass("fadeOutDown")
    }),
    $(".go-top").click(function(e) {
        e.preventDefault(),
        $("html, body").animate({
            scrollTop: 0
        }, 300)
    }),
    $("a[data-scroll-link]").click(function(e) {
        var t, a, o, n = $(this).attr("href");
        n.match("#") && (t = "#" + n.split("#")[1],
        "" != n.split("#")[1] && 1 == $(t).length && (e.preventDefault(),
        a = 0,
        o = $("[data-sticky], [data-scroll-offset]"),
        0 < o.length && o.each(function() {
            a += parseInt($(this).height())
        }),
        $("html, body").animate({
            scrollTop: $(t).offset().top - a
        }, 500)))
    }),
    0 < $(".gd-readmore-js").length && (e = $(".gd-readmore-js"),
    e.find(".read-more").on("click", function(e) {
        e.preventDefault();
        var t = $(this).parent();
        t.empty().html(t.attr("data-hidden"))
    })),
    $("#site-footer .change-language").on("click", function(e) {
        e.preventDefault(),
        $("#site-footer").toggleClass("lang-nav-open")
    }),
    GdWebsite.Functions.registerObserver("viewportAnimation", {
        rootMargin: "-50px",
        threshold: [.15]
    }, function(e, a) {
        e.forEach(function(e) {
            var t;
            0 < e.intersectionRatio && (t = e.target.getAttribute("data-animate-inview"),
            e.target.classList.add("animated"),
            e.target.classList.add(t),
            e.target.style.opacity = null,
            a.unobserve(e.target))
        })
    }, "[data-animate-inview]", function(e) {
        -1 < (" " + e.className + " ").indexOf(" hide-on-load ") && (e.style.opacity = 0)
    }),
    GdWebsite.Functions.registerObserver("lazyLoadingBackground", {
        rootMargin: "400px",
        threshold: [0]
    }, function(e, t) {
        e.forEach(function(e) {
            0 < e.intersectionRatio && (e.target.style.backgroundImage = "url(" + e.target.dataset.background + ")",
            e.target.dataset.background = "",
            t.unobserve(e.target))
        })
    }, "[data-background]", function(e) {}),
    document.querySelectorAll("[data-pm-field]").forEach(function(e) {
        e.addEventListener("click", function(e) {
            var t, a, o, n = e.target.getAttribute("data-pm-form"), i = e.target.getAttribute("data-pm-field"), r = e.target.getAttribute("data-pm-value");
            null !== i && null !== r && (t = (n ? n + " " : "") + '[name="tx_powermail_pi1[field][' + i + ']"]',
            a = document.querySelector(t),
            a && "SELECT" === a.tagName ? (o = document.querySelector(t + ' option[value="' + r + '"]'),
            o && (o.selected = !0)) : a && "INPUT" === a.tagName && (a.value = r))
        })
    })
}),
GdWebsite.Functions.lazyLoadImages();

$.fn.customPopup = function(t, e, i, n) {
    t.preventDefault(),
    e = e || "500",
    i = i || "400",
    strResize = n ? "yes" : "no";
    n = void 0 !== this.attr("title") ? this.attr("title") : "Social Share",
    i = "width=" + e + ",height=" + i + ",resizable=" + strResize,
    window.open(this.attr("href"), n, i).focus()
}
,
jQuery(document).ready(function() {
    $("[data-inline-tweet]").each(function() {
        var t = $(this)
          , e = t.text();
        t.data("inline-tweet-text") && (e = t.data("inline-tweet-text"));
        var i = encodeURIComponent(e)
          , n = document.location.toString().split("#")[0];
        n.match("#") && (n = n.split("#")[0]);
        var a = t.data("inline-tweet-via") ? "&via=" + t.data("inline-tweet-via") : ""
          , e = t.data("inline-tweet-tags") ? "&hashtags=" + t.data("inline-tweet-tags") : ""
          , e = "https://twitter.com/intent/tweet/?text=" + i + "&url=" + n + a + e.replace(" ", "")
          , e = $('<a href="' + e + '" class="inline-tweet" title="Share on Twitter"><span class="tcnt">' + t.html() + '</span><span class="tbtn"><i class="icon-twitter"></i></span></a>');
        e.on("click", function(t) {
            $(this).customPopup(t)
        }),
        t.replaceWith(e)
    }),
    $(".tweet-box .inner").on("click", function(t) {
        $(this).customPopup(t)
    })
});

var objectFitImages = function() {
    "use strict";
    var n = "fregante:object-fit-images"
      , c = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g
      , e = "undefined" == typeof Image ? {
        style: {
            "object-position": 1
        }
    } : new Image
      , r = "object-fit"in e.style
      , o = "object-position"in e.style
      , s = "background-size"in e.style
      , i = "string" == typeof e.currentSrc
      , a = e.getAttribute
      , l = e.setAttribute
      , g = !1;
    function createPlaceholder(e, t) {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + e + "' height='" + t + "'%3E%3C/svg%3E"
    }
    function polyfillCurrentSrc(e) {
        var t;
        e.srcset && !i && window.picturefill && (t = window.picturefill._,
        e[t.ns] && e[t.ns].evaled || t.fillImg(e, {
            reselect: !0
        }),
        e[t.ns].curSrc || (e[t.ns].supported = !1,
        t.fillImg(e, {
            reselect: !0
        })),
        e.currentSrc = e[t.ns].curSrc || e.src)
    }
    function getStyle(e) {
        for (var t, i = getComputedStyle(e).fontFamily, r = {}; null !== (t = c.exec(i)); )
            r[t[1]] = t[2];
        return r
    }
    function setPlaceholder(e, t, i) {
        var r = createPlaceholder(t || 1, i || 0);
        a.call(e, "src") !== r && l.call(e, "src", r)
    }
    function onImageReady(e, t) {
        e.naturalWidth ? t(e) : setTimeout(onImageReady, 100, e, t)
    }
    function fixOne(t) {
        var e = getStyle(t)
          , i = t[n];
        if (e["object-fit"] = e["object-fit"] || "fill",
        !i.img) {
            if ("fill" === e["object-fit"])
                return;
            if (!i.skipTest && r && !e["object-position"])
                return
        }
        if (!i.img) {
            i.img = new Image(t.width,t.height),
            i.img.srcset = a.call(t, "data-ofi-srcset") || t.srcset,
            i.img.src = a.call(t, "data-ofi-src") || t.src,
            l.call(t, "data-ofi-src", t.src),
            t.srcset && l.call(t, "data-ofi-srcset", t.srcset),
            setPlaceholder(t, t.naturalWidth || t.width, t.naturalHeight || t.height),
            t.srcset && (t.srcset = "");
            try {
                keepSrcUsable(t)
            } catch (e) {
                window.console && console.warn("https://bit.ly/ofi-old-browser")
            }
        }
        polyfillCurrentSrc(i.img),
        t.style.backgroundImage = 'url("' + (i.img.currentSrc || i.img.src).replace(/"/g, '\\"') + '")',
        t.style.backgroundPosition = e["object-position"] || "center",
        t.style.backgroundRepeat = "no-repeat",
        t.style.backgroundOrigin = "content-box",
        /scale-down/.test(e["object-fit"]) ? onImageReady(i.img, function() {
            i.img.naturalWidth > t.width || i.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto"
        }) : t.style.backgroundSize = e["object-fit"].replace("none", "auto").replace("fill", "100% 100%"),
        onImageReady(i.img, function(e) {
            setPlaceholder(t, e.naturalWidth, e.naturalHeight)
        })
    }
    function keepSrcUsable(i) {
        var t = {
            get: function get(e) {
                return i[n].img[e || "src"]
            },
            set: function set(e, t) {
                return i[n].img[t || "src"] = e,
                l.call(i, "data-ofi-" + t, e),
                fixOne(i),
                e
            }
        };
        Object.defineProperty(i, "src", t),
        Object.defineProperty(i, "currentSrc", {
            get: function get() {
                return t.get("currentSrc")
            }
        }),
        Object.defineProperty(i, "srcset", {
            get: function get() {
                return t.get("srcset")
            },
            set: function set(e) {
                return t.set(e, "srcset")
            }
        })
    }
    function hijackAttributes() {
        function getOfiImageMaybe(e, t) {
            return e[n] && e[n].img && ("src" === t || "srcset" === t) ? e[n].img : e
        }
        o || (HTMLImageElement.prototype.getAttribute = function(e) {
            return a.call(getOfiImageMaybe(this, e), e)
        }
        ,
        HTMLImageElement.prototype.setAttribute = function(e, t) {
            return l.call(getOfiImageMaybe(this, e), e, String(t))
        }
        )
    }
    function fix(e, t) {
        var i = !g && !e;
        if (t = t || {},
        e = e || "img",
        o && !t.skipTest || !s)
            return !1;
        "img" === e ? e = document.getElementsByTagName("img") : "string" == typeof e ? e = document.querySelectorAll(e) : "length"in e || (e = [e]);
        for (var r = 0; r < e.length; r++)
            e[r][n] = e[r][n] || {
                skipTest: t.skipTest
            },
            fixOne(e[r]);
        i && (document.body.addEventListener("load", function(e) {
            "IMG" === e.target.tagName && fix(e.target, {
                skipTest: t.skipTest
            })
        }, !0),
        g = !0,
        e = "img"),
        t.watchMQ && window.addEventListener("resize", fix.bind(null, e, {
            skipTest: t.skipTest
        }))
    }
    return fix.supportsObjectFit = r,
    fix.supportsObjectPosition = o,
    hijackAttributes(),
    fix
}();
objectFitImages(document.querySelectorAll(".image-object-fit--fill")),
objectFitImages(document.querySelectorAll(".image-object-fit--contain")),
objectFitImages(document.querySelectorAll(".image-object-fit--cover")),
objectFitImages(document.querySelectorAll(".image-object-fit--scale-down")),
objectFitImages(document.querySelectorAll(".image-object-fit--none"));

function GDataBusinessLightboxItem() {
    var a = this
      , i = this;
    this.DOMElements = {
        LightboxGalleries: document.querySelectorAll(".lightbox--gallery"),
        LightboxLinkItemClass: document.querySelectorAll(".b2b-lightbox"),
        LightboxLinkItemDataAttribute: document.querySelectorAll("[data-gd-business-lightbox]"),
        LightboxCloseButton: document.querySelectorAll(".lightbox-item__inner__close-button")
    },
    this.init = function() {
        a._initLightboxGalleries(),
        a._openLightboxItemOnClick(a.DOMElements.LightboxLinkItemClass),
        a._openLightboxItemOnClick(a.DOMElements.LightboxLinkItemDataAttribute),
        a._closeLightboxItemOnCloseButtonClick(),
        a._closeLightboxItemOnOutsideClick()
    }
    ,
    this._initLightboxGalleries = function() {
        a.DOMElements.LightboxGalleries.forEach(function(t) {
            for (var e = t.children, i = 0; i < e.length; i++) {
                var o = t.parentNode.id;
                e[i].querySelector(".lightbox-item").classList.add("cycle--" + o + i);
                var n = 0 === i
                  , s = i + 1 === e.length;
                a._setControlBtn(o, e[i], i, n, s, "prev"),
                a._setControlBtn(o, e[i], i, n, s, "next")
            }
        })
    }
    ,
    this._setControlBtn = function(t, e, i, o, n, s) {
        var l = e.querySelector(".lightbox-item__inner")
          , c = document.createElement("button");
        c.classList.add("lightbox-item__controls--" + s),
        o && "prev" === s || n && "next" === s ? c.classList.add("disabled") : a._setControlBtnClickEvent(t, e, c, "prev" === s ? i - 1 : i + 1),
        l.appendChild(c)
    }
    ,
    this._setControlBtnClickEvent = function(t, e, i, o) {
        i.addEventListener("click", function() {
            document.querySelector(".cycle--" + t + o).classList.add("active"),
            window.setTimeout(function() {
                e.querySelector(".lightbox-item").classList.remove("active")
            }, 100)
        })
    }
    ,
    this._openLightboxItemOnClick = function(t) {
        t.forEach(function(t) {
            t.addEventListener("click", function(t) {
                var e = null;
                this.dataset.gdBusinessLightbox ? e = document.getElementById(this.dataset.gdBusinessLightbox) : this.hash && (e = document.getElementById("b2b-lightbox-item-" + this.hash.substring(2))),
                e && (t.preventDefault(),
                document.querySelector("body").classList.add("business-lightbox-item-active"),
                e.classList.add("active"));
                try {
                    document.dispatchEvent(new CustomEvent("b2b-lightbox:opened",{
                        detail: {
                            clickSource: t.target,
                            lightbox: e
                        }
                    }))
                } catch (t) {}
            })
        })
    }
    ,
    this._closeLightboxItemOnCloseButtonClick = function() {
        a.DOMElements.LightboxCloseButton.forEach(function(e) {
            e.addEventListener("click", function(t) {
                i._closeLightboxItem(e.parentNode.parentNode.id)
            })
        })
    }
    ,
    this._closeLightboxItemOnOutsideClick = function() {
        window.onclick = function(t) {
            t.target.classList.contains("lightbox-item") && i._closeLightboxItem(t.target.id)
        }
    }
    ,
    this._closeLightboxItem = function(t) {
        t = document.getElementById(t);
        document.querySelector("body").classList.remove("business-lightbox-item-active"),
        t.classList.remove("active");
        try {
            document.dispatchEvent(new CustomEvent("b2b-lightbox:closed",{
                detail: {
                    lightbox: t
                }
            }))
        } catch (t) {}
    }
}
var GdWebsite = GdWebsite || {};
GdWebsite.BusinessLightboxItem = new GDataBusinessLightboxItem,
GdWebsite.BusinessLightboxItem.init(),
document.addEventListener("b2b-lightbox:closed", function(t) {
    if (t.detail.lightbox.querySelector(".fce"))
        for (var e = t.detail.lightbox.querySelector(".fce").children, i = 0; i < e.length; i++)
            if (e[i].hasAttribute("data-gdcontactform")) {
                var o = document.querySelector("[data-gdcontactform] > form")
                  , n = document.querySelectorAll("[data-gdcontactform-response]");
                o.reset(),
                o.style.display = "block";
                for (var s = 0; s < n.length; s++)
                    n[s].style.display = "none"
            }
});

function _typeof(t) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(t) {
        return typeof t
    }
    : function _typeof(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    ,
    _typeof(t)
}
var ratio, ratioDragger, iScroll, iScroll2, iPosition, dynamicScrollWidth;
function Scrollbar(t, i) {
    var e = this
      , o = t
      , s = {
        obj: $(".viewport", t)
    }
      , n = {
        obj: $(".images", t)
    }
      , r = {
        obj: $(".milestones", t)
    }
      , a = {
        obj: $(".content", t)
    }
      , l = {
        obj: $(".scrollbar", t)
    }
      , p = {
        obj: $(".scrollbar", t)
    }
      , h = {
        obj: $(".track", l.obj)
    }
      , c = {
        obj: $(".dragger", l.obj)
    }
      , d = "x" == i.axis
      , f = d ? "left" : "top"
      , u = d ? "Width" : "Height";
    function initialize() {
        return e.update(),
        setEvents(),
        e
    }
    function setSize() {
        c.obj.css(f, iScroll / l.ratio),
        n.obj.css(f, -iScroll),
        a.obj.css(f, -iScroll2),
        iMouse.start = c.obj.offset()[f];
        var t = u.toLowerCase();
        l.obj.css(t, h[i.axis]),
        h.obj.css(t, h[i.axis]),
        c.obj.css(t, c[i.axis])
    }
    function setEvents() {
        c.obj.bind("mousedown", start),
        c.obj[0].ontouchstart = function(t) {
            return t.preventDefault(),
            c.obj.unbind("mousedown"),
            start(t.touches[0]),
            !1
        }
        ,
        h.obj.bind("mouseup", drag),
        "1" == i.mouseWheel && this.addEventListener ? (o[0].addEventListener("DOMMouseScroll", wheel, !1),
        o[0].addEventListener("mousewheel", wheel, !1)) : "1" == i.mouseWheel && (o[0].onmousewheel = wheel)
    }
    function start(t) {
        iMouse.start = d ? t.pageX : t.pageY;
        var e = parseInt(c.obj.css(f));
        return iPosition.start = "auto" == e ? 0 : e,
        $(document).bind("mousemove", drag),
        document.ontouchmove = function(t) {
            $(document).unbind("mousemove"),
            drag(t.touches[0])
        }
        ,
        $(document).bind("mouseup", end),
        c.obj.bind("mouseup", end),
        c.obj[0].ontouchend = document.ontouchend = function(t) {
            $(document).unbind("mouseup"),
            c.obj.unbind("mouseup"),
            end(t.touches[0])
        }
        ,
        !1
    }
    function wheel(t) {
        var e;
        1 <= n.ratio && 1 <= a.ratio || (t = t || window.event,
        e = t.wheelDelta ? t.wheelDelta / 120 : -t.detail / 3,
        iScroll -= e * i.wheel * l.ratio,
        iScroll = Math.min(n[i.axis] - s[i.axis], Math.max(0, iScroll)),
        iScroll2 -= e * i.wheel * p.ratio,
        iScroll2 = Math.min(a[i.axis] - r[i.axis], Math.max(0, iScroll2)),
        c.obj.css(f, iScroll / l.ratio),
        n.obj.css(f, -iScroll),
        a.obj.css(f, -iScroll2),
        t = $.event.fix(t),
        t.preventDefault())
    }
    function end(t) {
        return $(document).unbind("mousemove", drag),
        $(document).unbind("mouseup", end),
        c.obj.unbind("mouseup", end),
        document.ontouchmove = c.obj[0].ontouchend = document.ontouchend = null,
        !1
    }
    function drag(t) {
        return 1 <= n.ratio && 1 <= a.ratio || (iPosition.now = Math.min(h[i.axis] - c[i.axis], Math.max(0, iPosition.start + ((d ? t.pageX : t.pageY) - iMouse.start))),
        iScroll = iPosition.now * l.ratio,
        iScroll2 = iPosition.now * p.ratio,
        1 <= n.ratio || $(n.obj).stop(!0, !0).animate({
            left: -iScroll
        }, 1e3, "easeInOutQuad"),
        1 <= a.ratio || $(a.obj).stop(!0, !0).animate({
            left: -iScroll2
        }, 700, "easeInOutQuad"),
        $(c.obj).stop(!0, !0).animate({
            left: iPosition.now
        }, 700, "easeInOutQuad")),
        !1
    }
    return iPosition = {
        start: -30,
        now: -30
    },
    iMouse = {},
    this.update = function(t) {
        s[i.axis] = s.obj[0]["offset" + u],
        r[i.axis] = r.obj[0]["offset" + u],
        n[i.axis] = n.obj[0]["scroll" + u],
        a[i.axis] = a.obj[0]["scroll" + u],
        n.ratio = s[i.axis] / n[i.axis],
        a.ratio = r[i.axis] / a[i.axis],
        h[i.axis] = "auto" == i.size ? s[i.axis] : dynamicScrollWidth,
        c[i.axis] = Math.min(h[i.axis], Math.max(0, "auto" == i.draggerWidth ? h[i.axis] * n.ratio : i.draggerWidth)),
        l.ratio = "auto" == i.draggerWidth ? n[i.axis] / h[i.axis] : (n[i.axis] - s[i.axis]) / (h[i.axis] - c[i.axis]),
        iScroll = "relative" == t && n.ratio <= 1 ? Math.min(n[i.axis] - s[i.axis], Math.max(0, iScroll)) : 0,
        iScroll = "bottom" == t && n.ratio <= 1 ? n[i.axis] - s[i.axis] : isNaN(parseInt(t)) ? iScroll : parseInt(t),
        p.ratio = "auto" == i.draggerWidth ? a[i.axis] / h[i.axis] : (a[i.axis] - r[i.axis]) / (h[i.axis] - c[i.axis]),
        iScroll2 = "relative" == t && a.ratio <= 1 ? Math.min(a[i.axis] - r[i.axis], Math.max(0, iScroll2)) : 0,
        iScroll2 = "bottom" == t && a.ratio <= 1 ? a[i.axis] - r[i.axis] : isNaN(parseInt(t)) ? iScroll2 : parseInt(t),
        l.ratio < 0 && p.ratio < 0 ? $(".dragger").hide() : $(".dragger").show(),
        ratio = p.ratio / l.ratio,
        ratioDragger = (h[i.axis] - c[i.axis]) / (n[i.axis] - h[i.axis]),
        setSize()
    }
    ,
    initialize()
}
function fixTitle(t) {
    !t.attr("title") && "string" == typeof t.attr("original-title") || t.attr("original-title", t.attr("title") || "").removeAttr("title")
}
function Tipsy(t, e) {
    this.$element = $(t),
    this.options = e,
    this.enabled = !0,
    fixTitle(this.$element)
}
!function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(I) {
    function e(t, e) {
        var o, s, n, r = t.nodeName.toLowerCase();
        return "area" === r ? (o = t.parentNode,
        s = o.name,
        !(!t.href || !s || "map" !== o.nodeName.toLowerCase()) && (n = I("img[usemap='#" + s + "']")[0],
        !!n && i(n))) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r && t.href || e) && i(t)
    }
    function i(t) {
        return I.expr.filters.visible(t) && !I(t).parents().addBack().filter(function() {
            return "hidden" === I.css(this, "visibility")
        }).length
    }
    var t, o, n, l;
    I.ui = I.ui || {},
    I.extend(I.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    I.fn.extend({
        scrollParent: function scrollParent(t) {
            var e = this.css("position")
              , i = "absolute" === e
              , o = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/
              , s = this.parents().filter(function() {
                var t = I(this);
                return (!i || "static" !== t.css("position")) && o.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
            }).eq(0);
            return "fixed" !== e && s.length ? s : I(this[0].ownerDocument || document)
        },
        uniqueId: (l = 0,
        function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++l)
            })
        }
        ),
        removeUniqueId: function removeUniqueId() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && I(this).removeAttr("id")
            })
        }
    }),
    I.extend(I.expr[":"], {
        data: I.expr.createPseudo ? I.expr.createPseudo(function(e) {
            return function(t) {
                return !!I.data(t, e)
            }
        }) : function(t, e, i) {
            return !!I.data(t, i[3])
        }
        ,
        focusable: function focusable(t) {
            return e(t, !isNaN(I.attr(t, "tabindex")))
        },
        tabbable: function tabbable(t) {
            var i = I.attr(t, "tabindex")
              , o = isNaN(i);
            return (o || 0 <= i) && e(t, !o)
        }
    }),
    I("<a>").outerWidth(1).jquery || I.each(["Width", "Height"], function(t, i) {
        function s(t, e, i, o) {
            return I.each(n, function() {
                e -= parseFloat(I.css(t, "padding" + this)) || 0,
                i && (e -= parseFloat(I.css(t, "border" + this + "Width")) || 0),
                o && (e -= parseFloat(I.css(t, "margin" + this)) || 0)
            }),
            e
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"]
          , o = i.toLowerCase()
          , r = {
            innerWidth: I.fn.innerWidth,
            innerHeight: I.fn.innerHeight,
            outerWidth: I.fn.outerWidth,
            outerHeight: I.fn.outerHeight
        };
        I.fn["inner" + i] = function(t) {
            return void 0 === t ? r["inner" + i].call(this) : this.each(function() {
                I(this).css(o, s(this, t) + "px")
            })
        }
        ,
        I.fn["outer" + i] = function(t, e) {
            return "number" != typeof t ? r["outer" + i].call(this, t) : this.each(function() {
                I(this).css(o, s(this, t, !0, e) + "px")
            })
        }
    }),
    I.fn.addBack || (I.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }
    ),
    I("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (I.fn.removeData = (n = I.fn.removeData,
    function(t) {
        return arguments.length ? n.call(this, I.camelCase(t)) : n.call(this)
    }
    )),
    I.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    I.fn.extend({
        focus: (o = I.fn.focus,
        function(e, i) {
            return "number" == typeof e ? this.each(function() {
                var t = this;
                setTimeout(function() {
                    I(t).focus(),
                    i && i.call(t)
                }, e)
            }) : o.apply(this, arguments)
        }
        ),
        disableSelection: (t = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown",
        function() {
            return this.bind(t + ".ui-disableSelection", function(t) {
                t.preventDefault()
            })
        }
        ),
        enableSelection: function enableSelection() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function zIndex(t) {
            if (void 0 !== t)
                return this.css("zIndex", t);
            if (this.length)
                for (var e, i, o = I(this[0]); o.length && o[0] !== document; ) {
                    if (e = o.css("position"),
                    ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(o.css("zIndex"), 10),
                    !isNaN(i) && 0 !== i))
                        return i;
                    o = o.parent()
                }
            return 0
        }
    }),
    I.ui.plugin = {
        add: function add(t, e, i) {
            var o, s = I.ui[t].prototype;
            for (o in i)
                s.plugins[o] = s.plugins[o] || [],
                s.plugins[o].push([e, i[o]])
        },
        call: function call(t, e, i, o) {
            var s, n = t.plugins[e];
            if (n && (o || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                for (s = 0; n.length > s; s++)
                    t.options[n[s][0]] && n[s][1].apply(t.element, i)
        }
    };
    var p, h = 0, c = Array.prototype.slice;
    I.cleanData = (p = I.cleanData,
    function(t) {
        for (var e, i, o = 0; null != (i = t[o]); o++)
            try {
                e = I._data(i, "events"),
                e && e.remove && I(i).triggerHandler("remove")
            } catch (t) {}
        p(t)
    }
    ),
    I.widget = function(e, i, o) {
        var s, r, a, l, p = {}, h = e.split(".")[0];
        return e = e.split(".")[1],
        s = h + "-" + e,
        o || (o = i,
        i = I.Widget),
        I.expr[":"][s.toLowerCase()] = function(t) {
            return !!I.data(t, s)
        }
        ,
        I[h] = I[h] || {},
        r = I[h][e],
        a = I[h][e] = function(t, e) {
            return this._createWidget ? void (arguments.length && this._createWidget(t, e)) : new a(t,e)
        }
        ,
        I.extend(a, r, {
            version: o.version,
            _proto: I.extend({}, o),
            _childConstructors: []
        }),
        l = new i,
        l.options = I.widget.extend({}, l.options),
        I.each(o, function(e, o) {
            return I.isFunction(o) ? void (p[e] = (s = function t() {
                return i.prototype[e].apply(this, arguments)
            }
            ,
            r = function n(t) {
                return i.prototype[e].apply(this, t)
            }
            ,
            function() {
                var t, e = this._super, i = this._superApply;
                return this._super = s,
                this._superApply = r,
                t = o.apply(this, arguments),
                this._super = e,
                this._superApply = i,
                t
            }
            )) : void (p[e] = o);
            var s, r
        }),
        a.prototype = I.widget.extend(l, {
            widgetEventPrefix: r && l.widgetEventPrefix || e
        }, p, {
            constructor: a,
            namespace: h,
            widgetName: e,
            widgetFullName: s
        }),
        r ? (I.each(r._childConstructors, function(t, e) {
            var i = e.prototype;
            I.widget(i.namespace + "." + i.widgetName, a, e._proto)
        }),
        delete r._childConstructors) : i._childConstructors.push(a),
        I.widget.bridge(e, a),
        a
    }
    ,
    I.widget.extend = function(t) {
        for (var e, i, o = c.call(arguments, 1), s = 0, n = o.length; s < n; s++)
            for (e in o[s])
                i = o[s][e],
                o[s].hasOwnProperty(e) && void 0 !== i && (t[e] = I.isPlainObject(i) ? I.isPlainObject(t[e]) ? I.widget.extend({}, t[e], i) : I.widget.extend({}, i) : i);
        return t
    }
    ,
    I.widget.bridge = function(n, e) {
        var r = e.prototype.widgetFullName || n;
        I.fn[n] = function(i) {
            var t = "string" == typeof i
              , o = c.call(arguments, 1)
              , s = this;
            return t ? this.each(function() {
                var t, e = I.data(this, r);
                return "instance" === i ? (s = e,
                !1) : e ? I.isFunction(e[i]) && "_" !== i.charAt(0) ? (t = e[i].apply(e, o),
                t !== e && void 0 !== t ? (s = t && t.jquery ? s.pushStack(t.get()) : t,
                !1) : void 0) : I.error("no such method '" + i + "' for " + n + " widget instance") : I.error("cannot call methods on " + n + " prior to initialization; attempted to call method '" + i + "'")
            }) : (o.length && (i = I.widget.extend.apply(null, [i].concat(o))),
            this.each(function() {
                var t = I.data(this, r);
                t ? (t.option(i || {}),
                t._init && t._init()) : I.data(this, r, new e(i,this))
            })),
            s
        }
    }
    ,
    I.Widget = function() {}
    ,
    I.Widget._childConstructors = [],
    I.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function _createWidget(t, e) {
            e = I(e || this.defaultElement || this)[0],
            this.element = I(e),
            this.uuid = h++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = I(),
            this.hoverable = I(),
            this.focusable = I(),
            e !== this && (I.data(e, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function remove(t) {
                    t.target === e && this.destroy()
                }
            }),
            this.document = I(e.style ? e.ownerDocument : e.document || e),
            this.window = I(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = I.widget.extend({}, this.options, this._getCreateOptions(), t),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: I.noop,
        _getCreateEventData: I.noop,
        _create: I.noop,
        _init: I.noop,
        destroy: function destroy() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(I.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: I.noop,
        widget: function widget() {
            return this.element
        },
        option: function option(t, e) {
            var i, o, s, n = t;
            if (0 === arguments.length)
                return I.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (n = {},
                i = t.split("."),
                t = i.shift(),
                i.length) {
                    for (o = n[t] = I.widget.extend({}, this.options[t]),
                    s = 0; i.length - 1 > s; s++)
                        o[i[s]] = o[i[s]] || {},
                        o = o[i[s]];
                    if (t = i.pop(),
                    1 === arguments.length)
                        return void 0 === o[t] ? null : o[t];
                    o[t] = e
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[t] ? null : this.options[t];
                    n[t] = e
                }
            return this._setOptions(n),
            this
        },
        _setOptions: function _setOptions(t) {
            for (var e in t)
                this._setOption(e, t[e]);
            return this
        },
        _setOption: function _setOption(t, e) {
            return this.options[t] = e,
            "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e),
            e && (this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus"))),
            this
        },
        enable: function enable() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function disable() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function _on(n, a, t) {
            var l, p = this;
            "boolean" != typeof n && (t = a,
            a = n,
            n = !1),
            t ? (a = l = I(a),
            this.bindings = this.bindings.add(a)) : (t = a,
            a = this.element,
            l = this.widget()),
            I.each(t, function(t, e) {
                function r() {
                    return n || !0 !== p.options.disabled && !I(this).hasClass("ui-state-disabled") ? ("string" == typeof e ? p[e] : e).apply(p, arguments) : void 0
                }
                "string" != typeof e && (r.guid = e.guid = e.guid || r.guid || I.guid++);
                var i = t.match(/^([\w:-]*)\s*(.*)$/)
                  , o = i[1] + p.eventNamespace
                  , s = i[2];
                s ? l.delegate(s, o, r) : a.bind(o, r)
            })
        },
        _off: function _off(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            t.unbind(e).undelegate(e),
            this.bindings = I(this.bindings.not(t).get()),
            this.focusable = I(this.focusable.not(t).get()),
            this.hoverable = I(this.hoverable.not(t).get())
        },
        _delay: function _delay(t, e) {
            function i() {
                return ("string" == typeof t ? o[t] : t).apply(o, arguments)
            }
            var o = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function _hoverable(t) {
            this.hoverable = this.hoverable.add(t),
            this._on(t, {
                mouseenter: function mouseenter(t) {
                    I(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function mouseleave(t) {
                    I(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function _focusable(t) {
            this.focusable = this.focusable.add(t),
            this._on(t, {
                focusin: function focusin(t) {
                    I(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function focusout(t) {
                    I(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function _trigger(t, e, i) {
            var o, s, n = this.options[t];
            if (i = i || {},
            e = I.Event(e),
            e.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
            e.target = this.element[0],
            s = e.originalEvent)
                for (o in s)
                    o in e || (e[o] = s[o]);
            return this.element.trigger(e, i),
            !(I.isFunction(n) && !1 === n.apply(this.element[0], [e].concat(i)) || e.isDefaultPrevented())
        }
    },
    I.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(n, r) {
        I.Widget.prototype["_" + n] = function(e, t, i) {
            "string" == typeof t && (t = {
                effect: t
            });
            var o, s = t ? !0 !== t && "number" != typeof t && t.effect || r : n;
            t = t || {},
            "number" == typeof t && (t = {
                duration: t
            }),
            o = !I.isEmptyObject(t),
            t.complete = i,
            t.delay && e.delay(t.delay),
            o && I.effects && I.effects.effect[s] ? e[n](t) : s !== n && e[s] ? e[s](t.duration, t.easing, i) : e.queue(function(t) {
                I(this)[n](),
                i && i.call(e[0]),
                t()
            })
        }
    }),
    I.widget;
    var d = !1;
    I(document).mouseup(function() {
        d = !1
    }),
    I.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function _mouseInit() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function(t) {
                return !0 === I.data(t.target, e.widgetName + ".preventClickEvent") ? (I.removeData(t.target, e.widgetName + ".preventClickEvent"),
                t.stopImmediatePropagation(),
                !1) : void 0
            }),
            this.started = !1
        },
        _mouseDestroy: function _mouseDestroy() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function _mouseDown(t) {
            if (!d) {
                this._mouseMoved = !1,
                this._mouseStarted && this._mouseUp(t),
                this._mouseDownEvent = t;
                var e = this
                  , i = 1 === t.which
                  , o = !("string" != typeof this.options.cancel || !t.target.nodeName) && I(t.target).closest(this.options.cancel).length;
                return i && !o && this._mouseCapture(t) && (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t),
                !this._mouseStarted) ? t.preventDefault() : (!0 === I.data(t.target, this.widgetName + ".preventClickEvent") && I.removeData(t.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(t) {
                    return e._mouseMove(t)
                }
                ,
                this._mouseUpDelegate = function(t) {
                    return e._mouseUp(t)
                }
                ,
                this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                t.preventDefault(),
                d = !0)),
                !0
            }
        },
        _mouseMove: function _mouseMove(t) {
            if (this._mouseMoved) {
                if (I.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button)
                    return this._mouseUp(t);
                if (!t.which)
                    return this._mouseUp(t)
            }
            return (t.which || t.button) && (this._mouseMoved = !0),
            this._mouseStarted ? (this._mouseDrag(t),
            t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t),
            this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted)
        },
        _mouseUp: function _mouseUp(t) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            t.target === this._mouseDownEvent.target && I.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
            d = !1,
            !1
        },
        _mouseDistanceMet: function _mouseDistanceMet(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function _mouseDelayMet() {
            return this.mouseDelayMet
        },
        _mouseStart: function _mouseStart() {},
        _mouseDrag: function _mouseDrag() {},
        _mouseStop: function _mouseStop() {},
        _mouseCapture: function _mouseCapture() {
            return !0
        }
    }),
    function() {
        function e(t, e, i) {
            return [parseFloat(t[0]) * (h.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (h.test(t[1]) ? i / 100 : 1)]
        }
        function i(t, e) {
            return parseInt(I.css(t, e), 10) || 0
        }
        function s(t) {
            var e = t[0];
            return 9 === e.nodeType ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : I.isWindow(e) ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: t.scrollTop(),
                    left: t.scrollLeft()
                }
            } : e.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: e.pageY,
                    left: e.pageX
                }
            } : {
                width: t.outerWidth(),
                height: t.outerHeight(),
                offset: t.offset()
            }
        }
        I.ui = I.ui || {};
        var n, S, C = Math.max, W = Math.abs, $ = Math.round, o = /left|center|right/, r = /top|center|bottom/, a = /[\+\-]\d+(\.[\d]+)?%?/, p = /^\w+/, h = /%$/, c = I.fn.position;
        I.position = {
            scrollbarWidth: function scrollbarWidth() {
                if (void 0 !== n)
                    return n;
                var t, e, i = I("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = i.children()[0];
                return I("body").append(i),
                t = o.offsetWidth,
                i.css("overflow", "scroll"),
                e = o.offsetWidth,
                t === e && (e = i[0].clientWidth),
                i.remove(),
                n = t - e
            },
            getScrollInfo: function getScrollInfo(t) {
                var e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x")
                  , i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y")
                  , o = "scroll" === e || "auto" === e && t.width < t.element[0].scrollWidth
                  , s = "scroll" === i || "auto" === i && t.height < t.element[0].scrollHeight;
                return {
                    width: s ? I.position.scrollbarWidth() : 0,
                    height: o ? I.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function getWithinInfo(t) {
                var e = I(t || window)
                  , i = I.isWindow(e[0])
                  , o = !!e[0] && 9 === e[0].nodeType;
                return {
                    element: e,
                    isWindow: i,
                    isDocument: o,
                    offset: e.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: e.scrollLeft(),
                    scrollTop: e.scrollTop(),
                    width: i || o ? e.width() : e.outerWidth(),
                    height: i || o ? e.height() : e.outerHeight()
                }
            }
        },
        I.fn.position = function(u) {
            if (!u || !u.of)
                return c.apply(this, arguments);
            u = I.extend({}, u);
            var g, m, _, v, b, y = I(u.of), w = I.position.getWithinInfo(u.within), x = I.position.getScrollInfo(w), P = (u.collision || "flip").split(" "), k = {}, t = s(y);
            return y[0].preventDefault && (u.at = "left top"),
            m = t.width,
            _ = t.height,
            v = t.offset,
            b = I.extend({}, v),
            I.each(["my", "at"], function() {
                var t, e, i = (u[this] || "").split(" ");
                1 === i.length && (i = o.test(i[0]) ? i.concat(["center"]) : r.test(i[0]) ? ["center"].concat(i) : ["center", "center"]),
                i[0] = o.test(i[0]) ? i[0] : "center",
                i[1] = r.test(i[1]) ? i[1] : "center",
                t = a.exec(i[0]),
                e = a.exec(i[1]),
                k[this] = [t ? t[0] : 0, e ? e[0] : 0],
                u[this] = [p.exec(i[0])[0], p.exec(i[1])[0]]
            }),
            1 === P.length && (P[1] = P[0]),
            "right" === u.at[0] ? b.left += m : "center" === u.at[0] && (b.left += m / 2),
            "bottom" === u.at[1] ? b.top += _ : "center" === u.at[1] && (b.top += _ / 2),
            g = e(k.at, m, _),
            b.left += g[0],
            b.top += g[1],
            this.each(function() {
                var o, t, r = I(this), a = r.outerWidth(), p = r.outerHeight(), s = i(this, "marginLeft"), n = i(this, "marginTop"), h = a + s + i(this, "marginRight") + x.width, c = p + n + i(this, "marginBottom") + x.height, d = I.extend({}, b), f = e(k.my, r.outerWidth(), r.outerHeight());
                "right" === u.my[0] ? d.left -= a : "center" === u.my[0] && (d.left -= a / 2),
                "bottom" === u.my[1] ? d.top -= p : "center" === u.my[1] && (d.top -= p / 2),
                d.left += f[0],
                d.top += f[1],
                S || (d.left = $(d.left),
                d.top = $(d.top)),
                o = {
                    marginLeft: s,
                    marginTop: n
                },
                I.each(["left", "top"], function(t, e) {
                    I.ui.position[P[t]] && I.ui.position[P[t]][e](d, {
                        targetWidth: m,
                        targetHeight: _,
                        elemWidth: a,
                        elemHeight: p,
                        collisionPosition: o,
                        collisionWidth: h,
                        collisionHeight: c,
                        offset: [g[0] + f[0], g[1] + f[1]],
                        my: u.my,
                        at: u.at,
                        within: w,
                        elem: r
                    })
                }),
                u.using && (t = function l(t) {
                    var e = v.left - d.left
                      , i = e + m - a
                      , o = v.top - d.top
                      , s = o + _ - p
                      , n = {
                        target: {
                            element: y,
                            left: v.left,
                            top: v.top,
                            width: m,
                            height: _
                        },
                        element: {
                            element: r,
                            left: d.left,
                            top: d.top,
                            width: a,
                            height: p
                        },
                        horizontal: i < 0 ? "left" : 0 < e ? "right" : "center",
                        vertical: s < 0 ? "top" : 0 < o ? "bottom" : "middle"
                    };
                    m < a && m > W(e + i) && (n.horizontal = "center"),
                    _ < p && _ > W(o + s) && (n.vertical = "middle"),
                    n.important = C(W(e), W(i)) > C(W(o), W(s)) ? "horizontal" : "vertical",
                    u.using.call(this, t, n)
                }
                ),
                r.offset(I.extend(d, {
                    using: t
                }))
            })
        }
        ,
        I.ui.position = {
            fit: {
                left: function left(t, e) {
                    var i, o = e.within, s = o.isWindow ? o.scrollLeft : o.offset.left, n = o.width, r = t.left - e.collisionPosition.marginLeft, a = s - r, l = r + e.collisionWidth - n - s;
                    e.collisionWidth > n ? 0 < a && l <= 0 ? (i = t.left + a + e.collisionWidth - n - s,
                    t.left += a - i) : t.left = !(0 < l && a <= 0) && l < a ? s + n - e.collisionWidth : s : 0 < a ? t.left += a : 0 < l ? t.left -= l : t.left = C(t.left - r, t.left)
                },
                top: function top(t, e) {
                    var i, o = e.within, s = o.isWindow ? o.scrollTop : o.offset.top, n = e.within.height, r = t.top - e.collisionPosition.marginTop, a = s - r, l = r + e.collisionHeight - n - s;
                    e.collisionHeight > n ? 0 < a && l <= 0 ? (i = t.top + a + e.collisionHeight - n - s,
                    t.top += a - i) : t.top = !(0 < l && a <= 0) && l < a ? s + n - e.collisionHeight : s : 0 < a ? t.top += a : 0 < l ? t.top -= l : t.top = C(t.top - r, t.top)
                }
            },
            flip: {
                left: function left(t, e) {
                    var i, o, s = e.within, n = s.offset.left + s.scrollLeft, r = s.width, a = s.isWindow ? s.scrollLeft : s.offset.left, l = t.left - e.collisionPosition.marginLeft, p = l - a, h = l + e.collisionWidth - r - a, c = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, d = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0];
                    p < 0 ? (i = t.left + c + d + f + e.collisionWidth - r - n,
                    (i < 0 || W(p) > i) && (t.left += c + d + f)) : 0 < h && (o = t.left - e.collisionPosition.marginLeft + c + d + f - a,
                    (0 < o || h > W(o)) && (t.left += c + d + f))
                },
                top: function top(t, e) {
                    var i, o, s = e.within, n = s.offset.top + s.scrollTop, r = s.height, a = s.isWindow ? s.scrollTop : s.offset.top, l = t.top - e.collisionPosition.marginTop, p = l - a, h = l + e.collisionHeight - r - a, c = "top" === e.my[1], d = c ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, u = -2 * e.offset[1];
                    p < 0 ? (o = t.top + d + f + u + e.collisionHeight - r - n,
                    (o < 0 || W(p) > o) && (t.top += d + f + u)) : 0 < h && (i = t.top - e.collisionPosition.marginTop + d + f + u - a,
                    (0 < i || h > W(i)) && (t.top += d + f + u))
                }
            },
            flipfit: {
                left: function left() {
                    I.ui.position.flip.left.apply(this, arguments),
                    I.ui.position.fit.left.apply(this, arguments)
                },
                top: function top() {
                    I.ui.position.flip.top.apply(this, arguments),
                    I.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var t, e, i, o = document.getElementsByTagName("body")[0], s = document.createElement("div"), n = document.createElement(o ? "div" : "body"), r = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            for (i in o && I.extend(r, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            }),
            r)
                n.style[i] = r[i];
            n.appendChild(s),
            t = o || document.documentElement,
            t.insertBefore(n, t.firstChild),
            s.style.cssText = "position: absolute; left: 10.7432222px;",
            e = I(s).offset().left,
            S = 10 < e && e < 11,
            n.innerHTML = "",
            t.removeChild(n)
        }()
    }(),
    I.ui.position,
    I.widget("ui.draggable", I.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function _create() {
            "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._setHandleClassName(),
            this._mouseInit()
        },
        _setOption: function _setOption(t, e) {
            this._super(t, e),
            "handle" === t && (this._removeHandleClassName(),
            this._setHandleClassName())
        },
        _destroy: function _destroy() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? void (this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._removeHandleClassName(),
            void this._mouseDestroy())
        },
        _mouseCapture: function _mouseCapture(t) {
            var e = this.options;
            return this._blurActiveElement(t),
            !(this.helper || e.disabled || 0 < I(t.target).closest(".ui-resizable-handle").length) && (this.handle = this._getHandle(t),
            !!this.handle && (this._blockFrames(!0 === e.iframeFix ? "iframe" : e.iframeFix),
            !0))
        },
        _blockFrames: function _blockFrames(t) {
            this.iframeBlocks = this.document.find(t).map(function() {
                var t = I(this);
                return I("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function _unblockFrames() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _blurActiveElement: function _blurActiveElement(t) {
            var e = this.document[0];
            if (this.handleElement.is(t.target))
                try {
                    e.activeElement && "body" !== e.activeElement.nodeName.toLowerCase() && I(e.activeElement).blur()
                } catch (t) {}
        },
        _mouseStart: function _mouseStart(t) {
            var e = this.options;
            return this.helper = this._createHelper(t),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            I.ui.ddmanager && (I.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(!0),
            this.offsetParent = this.helper.offsetParent(),
            this.hasFixedAncestor = 0 < this.helper.parents().filter(function() {
                return "fixed" === I(this).css("position")
            }).length,
            this.positionAbs = this.element.offset(),
            this._refreshOffsets(t),
            this.originalPosition = this.position = this._generatePosition(t, !1),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
            this._setContainment(),
            !1 === this._trigger("start", t) ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            I.ui.ddmanager && !e.dropBehaviour && I.ui.ddmanager.prepareOffsets(this, t),
            this._normalizeRightBottom(),
            this._mouseDrag(t, !0),
            I.ui.ddmanager && I.ui.ddmanager.dragStart(this, t),
            !0)
        },
        _refreshOffsets: function _refreshOffsets(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            },
            this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            }
        },
        _mouseDrag: function _mouseDrag(t, e) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(t, !0),
            this.positionAbs = this._convertPositionTo("absolute"),
            !e) {
                var i = this._uiHash();
                if (!1 === this._trigger("drag", t, i))
                    return this._mouseUp({}),
                    !1;
                this.position = i.position
            }
            return this.helper[0].style.left = this.position.left + "px",
            this.helper[0].style.top = this.position.top + "px",
            I.ui.ddmanager && I.ui.ddmanager.drag(this, t),
            !1
        },
        _mouseStop: function _mouseStop(t) {
            var e = this
              , i = !1;
            return I.ui.ddmanager && !this.options.dropBehaviour && (i = I.ui.ddmanager.drop(this, t)),
            this.dropped && (i = this.dropped,
            this.dropped = !1),
            "invalid" === this.options.revert && !i || "valid" === this.options.revert && i || !0 === this.options.revert || I.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? I(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== e._trigger("stop", t) && e._clear()
            }) : !1 !== this._trigger("stop", t) && this._clear(),
            !1
        },
        _mouseUp: function _mouseUp(t) {
            return this._unblockFrames(),
            I.ui.ddmanager && I.ui.ddmanager.dragStop(this, t),
            this.handleElement.is(t.target) && this.element.focus(),
            I.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function cancel() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function _getHandle(t) {
            return !this.options.handle || !!I(t.target).closest(this.element.find(this.options.handle)).length
        },
        _setHandleClassName: function _setHandleClassName() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element,
            this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function _removeHandleClassName() {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function _createHelper(t) {
            var e = this.options
              , i = I.isFunction(e.helper)
              , o = i ? I(e.helper.apply(this.element[0], [t])) : "clone" === e.helper ? this.element.clone().removeAttr("id") : this.element;
            return o.parents("body").length || o.appendTo("parent" === e.appendTo ? this.element[0].parentNode : e.appendTo),
            i && o[0] === this.element[0] && this._setPositionRelative(),
            o[0] === this.element[0] || /(fixed|absolute)/.test(o.css("position")) || o.css("position", "absolute"),
            o
        },
        _setPositionRelative: function _setPositionRelative() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function _adjustOffsetFromHelper(t) {
            "string" == typeof t && (t = t.split(" ")),
            I.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }),
            "left"in t && (this.offset.click.left = t.left + this.margins.left),
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
            "top"in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _isRootNode: function _isRootNode(t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function _getParentOffset() {
            var t = this.offsetParent.offset()
              , e = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== e && I.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            this._isRootNode(this.offsetParent[0]) && (t = {
                top: 0,
                left: 0
            }),
            {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function _getRelativeOffset() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var t = this.element.position()
              , e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function _cacheMargins() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function _cacheHelperProportions() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function _setContainment() {
            var t, e, i, o = this.options, s = this.document[0];
            return this.relativeContainer = null,
            o.containment ? "window" === o.containment ? void (this.containment = [I(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, I(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, I(window).scrollLeft() + I(window).width() - this.helperProportions.width - this.margins.left, I(window).scrollTop() + (I(window).height() || s.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === o.containment ? void (this.containment = [0, 0, I(s).width() - this.helperProportions.width - this.margins.left, (I(s).height() || s.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : o.containment.constructor === Array ? void (this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode),
            e = I(o.containment),
            i = e[0],
            void (i && (t = /(scroll|auto)/.test(e.css("overflow")),
            this.containment = [(parseInt(e.css("borderLeftWidth"), 10) || 0) + (parseInt(e.css("paddingLeft"), 10) || 0), (parseInt(e.css("borderTopWidth"), 10) || 0) + (parseInt(e.css("paddingTop"), 10) || 0), (t ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(e.css("borderRightWidth"), 10) || 0) - (parseInt(e.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(e.css("borderBottomWidth"), 10) || 0) - (parseInt(e.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relativeContainer = e))) : void (this.containment = null)
        },
        _convertPositionTo: function _convertPositionTo(t, e) {
            e = e || this.position;
            var i = "absolute" === t ? 1 : -1
              , o = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : o ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : o ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function _generatePosition(t, e) {
            var i, o, s, n, r = this.options, a = this._isRootNode(this.scrollParent[0]), l = t.pageX, p = t.pageY;
            return a && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }),
            e && (this.containment && (i = this.relativeContainer ? (o = this.relativeContainer.offset(),
            [this.containment[0] + o.left, this.containment[1] + o.top, this.containment[2] + o.left, this.containment[3] + o.top]) : this.containment,
            t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < i[1] && (p = i[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > i[3] && (p = i[3] + this.offset.click.top)),
            r.grid && (s = r.grid[1] ? this.originalPageY + Math.round((p - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY,
            p = !i || s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - r.grid[1] : s + r.grid[1],
            n = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX,
            l = !i || n - this.offset.click.left >= i[0] || n - this.offset.click.left > i[2] ? n : n - this.offset.click.left >= i[0] ? n - r.grid[0] : n + r.grid[0]),
            "y" === r.axis && (l = this.originalPageX),
            "x" === r.axis && (p = this.originalPageY)),
            {
                top: p - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function _clear() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1,
            this.destroyOnClear && this.destroy()
        },
        _normalizeRightBottom: function _normalizeRightBottom() {
            "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()),
            this.helper.css("right", "auto")),
            "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()),
            this.helper.css("bottom", "auto"))
        },
        _trigger: function _trigger(t, e, i) {
            return i = i || this._uiHash(),
            I.ui.plugin.call(this, t, [e, i, this], !0),
            /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"),
            i.offset = this.positionAbs),
            I.Widget.prototype._trigger.call(this, t, e, i)
        },
        plugins: {},
        _uiHash: function _uiHash() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    I.ui.plugin.add("draggable", "connectToSortable", {
        start: function start(e, t, i) {
            var o = I.extend({}, t, {
                item: i.element
            });
            i.sortables = [],
            I(i.options.connectToSortable).each(function() {
                var t = I(this).sortable("instance");
                t && !t.options.disabled && (i.sortables.push(t),
                t.refreshPositions(),
                t._trigger("activate", e, o))
            })
        },
        stop: function stop(e, t, i) {
            var o = I.extend({}, t, {
                item: i.element
            });
            i.cancelHelperRemoval = !1,
            I.each(i.sortables, function() {
                var t = this;
                t.isOver ? (t.isOver = 0,
                i.cancelHelperRemoval = !0,
                t.cancelHelperRemoval = !1,
                t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                },
                t._mouseStop(e),
                t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0,
                t._trigger("deactivate", e, o))
            })
        },
        drag: function drag(i, o, s) {
            I.each(s.sortables, function() {
                var t = !1
                  , e = this;
                e.positionAbs = s.positionAbs,
                e.helperProportions = s.helperProportions,
                e.offset.click = s.offset.click,
                e._intersectsWith(e.containerCache) && (t = !0,
                I.each(s.sortables, function() {
                    return this.positionAbs = s.positionAbs,
                    this.helperProportions = s.helperProportions,
                    this.offset.click = s.offset.click,
                    this !== e && this._intersectsWith(this.containerCache) && I.contains(e.element[0], this.element[0]) && (t = !1),
                    t
                })),
                t ? (e.isOver || (e.isOver = 1,
                s._parent = o.helper.parent(),
                e.currentItem = o.helper.appendTo(e.element).data("ui-sortable-item", !0),
                e.options._helper = e.options.helper,
                e.options.helper = function() {
                    return o.helper[0]
                }
                ,
                i.target = e.currentItem[0],
                e._mouseCapture(i, !0),
                e._mouseStart(i, !0, !0),
                e.offset.click.top = s.offset.click.top,
                e.offset.click.left = s.offset.click.left,
                e.offset.parent.left -= s.offset.parent.left - e.offset.parent.left,
                e.offset.parent.top -= s.offset.parent.top - e.offset.parent.top,
                s._trigger("toSortable", i),
                s.dropped = e.element,
                I.each(s.sortables, function() {
                    this.refreshPositions()
                }),
                s.currentItem = s.element,
                e.fromOutside = s),
                e.currentItem && (e._mouseDrag(i),
                o.position = e.position)) : e.isOver && (e.isOver = 0,
                e.cancelHelperRemoval = !0,
                e.options._revert = e.options.revert,
                e.options.revert = !1,
                e._trigger("out", i, e._uiHash(e)),
                e._mouseStop(i, !0),
                e.options.revert = e.options._revert,
                e.options.helper = e.options._helper,
                e.placeholder && e.placeholder.remove(),
                o.helper.appendTo(s._parent),
                s._refreshOffsets(i),
                o.position = s._generatePosition(i, !0),
                s._trigger("fromSortable", i),
                s.dropped = !1,
                I.each(s.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    }),
    I.ui.plugin.add("draggable", "cursor", {
        start: function start(t, e, i) {
            var o = I("body")
              , s = i.options;
            o.css("cursor") && (s._cursor = o.css("cursor")),
            o.css("cursor", s.cursor)
        },
        stop: function stop(t, e, i) {
            var o = i.options;
            o._cursor && I("body").css("cursor", o._cursor)
        }
    }),
    I.ui.plugin.add("draggable", "opacity", {
        start: function start(t, e, i) {
            var o = I(e.helper)
              , s = i.options;
            o.css("opacity") && (s._opacity = o.css("opacity")),
            o.css("opacity", s.opacity)
        },
        stop: function stop(t, e, i) {
            var o = i.options;
            o._opacity && I(e.helper).css("opacity", o._opacity)
        }
    }),
    I.ui.plugin.add("draggable", "scroll", {
        start: function start(t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
            i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        },
        drag: function drag(t, e, i) {
            var o = i.options
              , s = !1
              , n = i.scrollParentNotHidden[0]
              , r = i.document[0];
            n !== r && "HTML" !== n.tagName ? (o.axis && "x" === o.axis || (i.overflowOffset.top + n.offsetHeight - t.pageY < o.scrollSensitivity ? n.scrollTop = s = n.scrollTop + o.scrollSpeed : t.pageY - i.overflowOffset.top < o.scrollSensitivity && (n.scrollTop = s = n.scrollTop - o.scrollSpeed)),
            o.axis && "y" === o.axis || (i.overflowOffset.left + n.offsetWidth - t.pageX < o.scrollSensitivity ? n.scrollLeft = s = n.scrollLeft + o.scrollSpeed : t.pageX - i.overflowOffset.left < o.scrollSensitivity && (n.scrollLeft = s = n.scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (t.pageY - I(r).scrollTop() < o.scrollSensitivity ? s = I(r).scrollTop(I(r).scrollTop() - o.scrollSpeed) : I(window).height() - (t.pageY - I(r).scrollTop()) < o.scrollSensitivity && (s = I(r).scrollTop(I(r).scrollTop() + o.scrollSpeed))),
            o.axis && "y" === o.axis || (t.pageX - I(r).scrollLeft() < o.scrollSensitivity ? s = I(r).scrollLeft(I(r).scrollLeft() - o.scrollSpeed) : I(window).width() - (t.pageX - I(r).scrollLeft()) < o.scrollSensitivity && (s = I(r).scrollLeft(I(r).scrollLeft() + o.scrollSpeed)))),
            !1 !== s && I.ui.ddmanager && !o.dropBehaviour && I.ui.ddmanager.prepareOffsets(i, t)
        }
    }),
    I.ui.plugin.add("draggable", "snap", {
        start: function start(t, e, i) {
            var o = i.options;
            i.snapElements = [],
            I(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                var t = I(this)
                  , e = t.offset();
                this !== i.element[0] && i.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: e.top,
                    left: e.left
                })
            })
        },
        drag: function drag(t, e, i) {
            for (var o, s, n, r, a, l, p, h, c, d = i.options, f = d.snapTolerance, u = e.offset.left, g = u + i.helperProportions.width, m = e.offset.top, _ = m + i.helperProportions.height, v = i.snapElements.length - 1; 0 <= v; v--)
                a = i.snapElements[v].left - i.margins.left,
                l = a + i.snapElements[v].width,
                p = i.snapElements[v].top - i.margins.top,
                h = p + i.snapElements[v].height,
                g < a - f || l + f < u || _ < p - f || h + f < m || !I.contains(i.snapElements[v].item.ownerDocument, i.snapElements[v].item) ? (i.snapElements[v].snapping && i.options.snap.release && i.options.snap.release.call(i.element, t, I.extend(i._uiHash(), {
                    snapItem: i.snapElements[v].item
                })),
                i.snapElements[v].snapping = !1) : ("inner" !== d.snapMode && (o = f >= Math.abs(p - _),
                s = f >= Math.abs(h - m),
                n = f >= Math.abs(a - g),
                r = f >= Math.abs(l - u),
                o && (e.position.top = i._convertPositionTo("relative", {
                    top: p - i.helperProportions.height,
                    left: 0
                }).top),
                s && (e.position.top = i._convertPositionTo("relative", {
                    top: h,
                    left: 0
                }).top),
                n && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: a - i.helperProportions.width
                }).left),
                r && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left)),
                c = o || s || n || r,
                "outer" !== d.snapMode && (o = f >= Math.abs(p - m),
                s = f >= Math.abs(h - _),
                n = f >= Math.abs(a - u),
                r = f >= Math.abs(l - g),
                o && (e.position.top = i._convertPositionTo("relative", {
                    top: p,
                    left: 0
                }).top),
                s && (e.position.top = i._convertPositionTo("relative", {
                    top: h - i.helperProportions.height,
                    left: 0
                }).top),
                n && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left),
                r && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: l - i.helperProportions.width
                }).left)),
                !i.snapElements[v].snapping && (o || s || n || r || c) && i.options.snap.snap && i.options.snap.snap.call(i.element, t, I.extend(i._uiHash(), {
                    snapItem: i.snapElements[v].item
                })),
                i.snapElements[v].snapping = o || s || n || r || c)
        }
    }),
    I.ui.plugin.add("draggable", "stack", {
        start: function start(t, e, i) {
            var o, s = i.options, n = I.makeArray(I(s.stack)).sort(function(t, e) {
                return (parseInt(I(t).css("zIndex"), 10) || 0) - (parseInt(I(e).css("zIndex"), 10) || 0)
            });
            n.length && (o = parseInt(I(n[0]).css("zIndex"), 10) || 0,
            I(n).each(function(t) {
                I(this).css("zIndex", o + t)
            }),
            this.css("zIndex", o + n.length))
        }
    }),
    I.ui.plugin.add("draggable", "zIndex", {
        start: function start(t, e, i) {
            var o = I(e.helper)
              , s = i.options;
            o.css("zIndex") && (s._zIndex = o.css("zIndex")),
            o.css("zIndex", s.zIndex)
        },
        stop: function stop(t, e, i) {
            var o = i.options;
            o._zIndex && I(e.helper).css("zIndex", o._zIndex)
        }
    }),
    I.ui.draggable;
    var f, u = "ui-effects-", g = I;
    I.effects = {
        effect: {}
    },
    function(c, d) {
        function i(t, e, i) {
            var o = m[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = o.floor ? ~~t : parseFloat(t),
            isNaN(t) ? e.def : o.mod ? (t + o.mod) % o.mod : t < 0 ? 0 : t > o.max ? o.max : t)
        }
        function s(r) {
            var a = u()
              , l = a._rgba = [];
            return r = r.toLowerCase(),
            _(e, function(t, e) {
                var i, o = e.re.exec(r), s = o && e.parse(o), n = e.space || "rgba";
                return s ? (i = a[n](s),
                a[g[n].cache] = i[g[n].cache],
                l = a._rgba = i._rgba,
                !1) : d
            }),
            l.length ? ("0,0,0,0" === l.join() && c.extend(l, p.transparent),
            a) : p[r]
        }
        function n(t, e, i) {
            return i = (i + 1) % 1,
            6 * i < 1 ? t + 6 * (e - t) * i : 2 * i < 1 ? e : 3 * i < 2 ? t + 6 * (e - t) * (2 / 3 - i) : t
        }
        var p, t = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", f = /^([\-+])=\s*(\d+\.?\d*)/, e = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function parse(t) {
                return [t[1], t[2], t[3], t[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function parse(t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function parse(t) {
                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function parse(t) {
                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function parse(t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]]
            }
        }], u = c.Color = function(t, e, i, o) {
            return new c.Color.fn.parse(t,e,i,o)
        }
        , g = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, m = {
            byte: {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, a = u.support = {}, o = c("<p>")[0], _ = c.each;
        o.style.cssText = "background-color:rgba(1,1,1,.5)",
        a.rgba = -1 < o.style.backgroundColor.indexOf("rgba"),
        _(g, function(t, e) {
            e.cache = "_" + t,
            e.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }),
        u.fn = c.extend(u.prototype, {
            parse: function parse(n, t, e, o) {
                if (n === d)
                    return this._rgba = [null, null, null, null],
                    this;
                (n.jquery || n.nodeType) && (n = c(n).css(t),
                t = d);
                var r = this
                  , a = c.type(n)
                  , l = this._rgba = [];
                return t !== d && (n = [n, t, e, o],
                a = "array"),
                "string" === a ? this.parse(s(n) || p._default) : "array" === a ? (_(g.rgba.props, function(t, e) {
                    l[e.idx] = i(n[e.idx], e)
                }),
                this) : "object" === a ? (_(g, n instanceof u ? function(t, e) {
                    n[e.cache] && (r[e.cache] = n[e.cache].slice())
                }
                : function(t, o) {
                    var s = o.cache;
                    _(o.props, function(t, e) {
                        if (!r[s] && o.to) {
                            if ("alpha" === t || null == n[t])
                                return;
                            r[s] = o.to(r._rgba)
                        }
                        r[s][e.idx] = i(n[t], e, !0)
                    }),
                    r[s] && c.inArray(null, r[s].slice(0, 3)) < 0 && (r[s][3] = 1,
                    o.from && (r._rgba = o.from(r[s])))
                }
                ),
                this) : d
            },
            is: function is(t) {
                var s = u(t)
                  , n = !0
                  , r = this;
                return _(g, function(t, e) {
                    var i, o = s[e.cache];
                    return o && (i = r[e.cache] || e.to && e.to(r._rgba) || [],
                    _(e.props, function(t, e) {
                        return null != o[e.idx] ? n = o[e.idx] === i[e.idx] : d
                    })),
                    n
                }),
                n
            },
            _space: function _space() {
                var i = []
                  , o = this;
                return _(g, function(t, e) {
                    o[e.cache] && i.push(t)
                }),
                i.pop()
            },
            transition: function transition(t, a) {
                var l = u(t)
                  , e = l._space()
                  , o = g[e]
                  , s = 0 === this.alpha() ? u("transparent") : this
                  , p = s[o.cache] || o.to(s._rgba)
                  , h = p.slice()
                  , l = l[o.cache];
                return _(o.props, function(t, e) {
                    var o = e.idx
                      , s = p[o]
                      , n = l[o]
                      , r = m[e.type] || {};
                    null !== n && (null === s ? h[o] = n : (r.mod && (n - s > r.mod / 2 ? s += r.mod : s - n > r.mod / 2 && (s -= r.mod)),
                    h[o] = i((n - s) * a + s, e)))
                }),
                this[e](h)
            },
            blend: function blend(t) {
                if (1 === this._rgba[3])
                    return this;
                var e = this._rgba.slice()
                  , i = e.pop()
                  , o = u(t)._rgba;
                return u(c.map(e, function(t, e) {
                    return (1 - i) * o[e] + i * t
                }))
            },
            toRgbaString: function toRgbaString() {
                var t = "rgba("
                  , e = c.map(this._rgba, function(t, e) {
                    return null == t ? 2 < e ? 1 : 0 : t
                });
                return 1 === e[3] && (e.pop(),
                t = "rgb("),
                t + e.join() + ")"
            },
            toHslaString: function toHslaString() {
                var t = "hsla("
                  , e = c.map(this.hsla(), function(t, e) {
                    return null == t && (t = 2 < e ? 1 : 0),
                    e && e < 3 && (t = Math.round(100 * t) + "%"),
                    t
                });
                return 1 === e[3] && (e.pop(),
                t = "hsl("),
                t + e.join() + ")"
            },
            toHexString: function toHexString(t) {
                var e = this._rgba.slice()
                  , i = e.pop();
                return t && e.push(~~(255 * i)),
                "#" + c.map(e, function(t) {
                    return t = (t || 0).toString(16),
                    1 === t.length ? "0" + t : t
                }).join("")
            },
            toString: function toString() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }),
        u.fn.parse.prototype = u.fn,
        g.hsla.to = function(t) {
            if (null == t[0] || null == t[1] || null == t[2])
                return [null, null, null, t[3]];
            var e = t[0] / 255
              , i = t[1] / 255
              , o = t[2] / 255
              , s = t[3]
              , n = Math.max(e, i, o)
              , r = Math.min(e, i, o)
              , a = n - r
              , l = n + r
              , p = .5 * l
              , h = r === n ? 0 : e === n ? 60 * (i - o) / a + 360 : i === n ? 60 * (o - e) / a + 120 : 60 * (e - i) / a + 240
              , c = 0 === a ? 0 : p <= .5 ? a / l : a / (2 - l);
            return [Math.round(h) % 360, c, p, null == s ? 1 : s]
        }
        ,
        g.hsla.from = function(t) {
            if (null == t[0] || null == t[1] || null == t[2])
                return [null, null, null, t[3]];
            var e = t[0] / 360
              , i = t[1]
              , o = t[2]
              , s = t[3]
              , r = o <= .5 ? o * (1 + i) : o + i - o * i
              , a = 2 * o - r;
            return [Math.round(255 * n(a, r, e + 1 / 3)), Math.round(255 * n(a, r, e)), Math.round(255 * n(a, r, e - 1 / 3)), s]
        }
        ,
        _(g, function(l, t) {
            var o = t.props
              , a = t.cache
              , p = t.to
              , h = t.from;
            u.fn[l] = function(t) {
                if (p && !this[a] && (this[a] = p(this._rgba)),
                t === d)
                    return this[a].slice();
                var e, s = c.type(t), n = "array" === s || "object" === s ? t : arguments, r = this[a].slice();
                return _(o, function(t, e) {
                    var o = n["object" === s ? t : e.idx];
                    null == o && (o = r[e.idx]),
                    r[e.idx] = i(o, e)
                }),
                h ? (e = u(h(r)),
                e[a] = r,
                e) : u(r)
            }
            ,
            _(o, function(r, a) {
                u.fn[r] || (u.fn[r] = function(t) {
                    var e, i = c.type(t), o = "alpha" === r ? this._hsla ? "hsla" : "rgba" : l, s = this[o](), n = s[a.idx];
                    return "undefined" === i ? n : ("function" === i && (t = t.call(this, n),
                    i = c.type(t)),
                    null == t && a.empty ? this : ("string" === i && (e = f.exec(t),
                    e && (t = n + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1))),
                    s[a.idx] = t,
                    this[o](s)))
                }
                )
            })
        }),
        u.hook = function(t) {
            var e = t.split(" ");
            _(e, function(t, r) {
                c.cssHooks[r] = {
                    set: function set(t, e) {
                        var i, o, n = "";
                        if ("transparent" !== e && ("string" !== c.type(e) || (i = s(e)))) {
                            if (e = u(i || e),
                            !a.rgba && 1 !== e._rgba[3]) {
                                for (o = "backgroundColor" === r ? t.parentNode : t; ("" === n || "transparent" === n) && o && o.style; )
                                    try {
                                        n = c.css(o, "backgroundColor"),
                                        o = o.parentNode
                                    } catch (t) {}
                                e = e.blend(n && "transparent" !== n ? n : "_default")
                            }
                            e = e.toRgbaString()
                        }
                        try {
                            t.style[r] = e
                        } catch (t) {}
                    }
                },
                c.fx.step[r] = function(t) {
                    t.colorInit || (t.start = u(t.elem, r),
                    t.end = u(t.end),
                    t.colorInit = !0),
                    c.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
                }
            })
        }
        ,
        u.hook(t),
        c.cssHooks.borderColor = {
            expand: function expand(i) {
                var o = {};
                return _(["Top", "Right", "Bottom", "Left"], function(t, e) {
                    o["border" + e + "Color"] = i
                }),
                o
            }
        },
        p = c.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(g),
    function() {
        function e(t) {
            var e, i, o = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, s = {};
            if (o && o.length && o[0] && o[o[0]])
                for (i = o.length; i--; )
                    e = o[i],
                    "string" == typeof o[e] && (s[I.camelCase(e)] = o[e]);
            else
                for (e in o)
                    "string" == typeof o[e] && (s[e] = o[e]);
            return s
        }
        function i(t, e) {
            var i, o, s = {};
            for (i in e)
                o = e[i],
                t[i] !== o && (l[i] || !I.fx.step[i] && isNaN(parseFloat(o)) || (s[i] = o));
            return s
        }
        var n, s, r, p = ["add", "remove", "toggle"], l = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        I.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, e) {
            I.fx.step[e] = function(t) {
                ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (g.style(t.elem, e, t.end),
                t.setAttr = !0)
            }
        }),
        I.fn.addBack || (I.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
        ),
        I.effects.animateClass = function(r, t, o, s) {
            var l = I.speed(t, o, s);
            return this.queue(function() {
                var o = I(this)
                  , t = o.attr("class") || ""
                  , s = l.children ? o.find("*").addBack() : o
                  , s = s.map(function() {
                    var t = I(this);
                    return {
                        el: t,
                        start: e(this)
                    }
                })
                  , n = function a() {
                    I.each(p, function(t, e) {
                        r[e] && o[e + "Class"](r[e])
                    })
                };
                n(),
                s = s.map(function() {
                    return this.end = e(this.el[0]),
                    this.diff = i(this.start, this.end),
                    this
                }),
                o.attr("class", t),
                s = s.map(function() {
                    var t = this
                      , e = I.Deferred()
                      , i = I.extend({}, l, {
                        queue: !1,
                        complete: function complete() {
                            e.resolve(t)
                        }
                    });
                    return this.el.animate(this.diff, i),
                    e.promise()
                }),
                I.when.apply(I, s.get()).done(function() {
                    n(),
                    I.each(arguments, function() {
                        var e = this.el;
                        I.each(this.diff, function(t) {
                            e.css(t, "")
                        })
                    }),
                    l.complete.call(o[0])
                })
            })
        }
        ,
        I.fn.extend({
            addClass: (r = I.fn.addClass,
            function(t, e, i, o) {
                return e ? I.effects.animateClass.call(this, {
                    add: t
                }, e, i, o) : r.apply(this, arguments)
            }
            ),
            removeClass: (s = I.fn.removeClass,
            function(t, e, i, o) {
                return 1 < arguments.length ? I.effects.animateClass.call(this, {
                    remove: t
                }, e, i, o) : s.apply(this, arguments)
            }
            ),
            toggleClass: (n = I.fn.toggleClass,
            function(t, e, i, o, s) {
                return "boolean" == typeof e || void 0 === e ? i ? I.effects.animateClass.call(this, e ? {
                    add: t
                } : {
                    remove: t
                }, i, o, s) : n.apply(this, arguments) : I.effects.animateClass.call(this, {
                    toggle: t
                }, e, i, o)
            }
            ),
            switchClass: function switchClass(t, e, i, o, s) {
                return I.effects.animateClass.call(this, {
                    add: e,
                    remove: t
                }, i, o, s)
            }
        })
    }(),
    function() {
        function e(t, e, i, o) {
            return I.isPlainObject(t) && (e = t,
            t = t.effect),
            t = {
                effect: t
            },
            null == e && (e = {}),
            I.isFunction(e) && (o = e,
            i = null,
            e = {}),
            "number" != typeof e && !I.fx.speeds[e] || (o = i,
            i = e,
            e = {}),
            I.isFunction(i) && (o = i,
            i = null),
            e && I.extend(t, e),
            i = i || e.duration,
            t.duration = I.fx.off ? 0 : "number" == typeof i ? i : i in I.fx.speeds ? I.fx.speeds[i] : I.fx.speeds._default,
            t.complete = o || e.complete,
            t
        }
        function i(t) {
            return !(t && "number" != typeof t && !I.fx.speeds[t]) || ("string" == typeof t && !I.effects.effect[t] || (!!I.isFunction(t) || "object" == _typeof(t) && !t.effect))
        }
        var s, n, r;
        I.extend(I.effects, {
            version: "1.11.4",
            save: function save(t, e) {
                for (var i = 0; e.length > i; i++)
                    null !== e[i] && t.data(u + e[i], t[0].style[e[i]])
            },
            restore: function restore(t, e) {
                for (var i, o = 0; e.length > o; o++)
                    null !== e[o] && (i = t.data(u + e[o]),
                    void 0 === i && (i = ""),
                    t.css(e[o], i))
            },
            setMode: function setMode(t, e) {
                return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"),
                e
            },
            getBaseline: function getBaseline(t, e) {
                var i, o;
                switch (t[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = t[0] / e.height
                }
                switch (t[1]) {
                case "left":
                    o = 0;
                    break;
                case "center":
                    o = .5;
                    break;
                case "right":
                    o = 1;
                    break;
                default:
                    o = t[1] / e.width
                }
                return {
                    x: o,
                    y: i
                }
            },
            createWrapper: function createWrapper(i) {
                if (i.parent().is(".ui-effects-wrapper"))
                    return i.parent();
                var o = {
                    width: i.outerWidth(!0),
                    height: i.outerHeight(!0),
                    float: i.css("float")
                }
                  , t = I("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , e = {
                    width: i.width(),
                    height: i.height()
                }
                  , s = document.activeElement;
                try {
                    s.id
                } catch (t) {
                    s = document.body
                }
                return i.wrap(t),
                i[0] !== s && !I.contains(i[0], s) || I(s).focus(),
                t = i.parent(),
                "static" === i.css("position") ? (t.css({
                    position: "relative"
                }),
                i.css({
                    position: "relative"
                })) : (I.extend(o, {
                    position: i.css("position"),
                    zIndex: i.css("z-index")
                }),
                I.each(["top", "left", "bottom", "right"], function(t, e) {
                    o[e] = i.css(e),
                    isNaN(parseInt(o[e], 10)) && (o[e] = "auto")
                }),
                i.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                i.css(e),
                t.css(o).show()
            },
            removeWrapper: function removeWrapper(t) {
                var e = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                t[0] !== e && !I.contains(t[0], e) || I(e).focus()),
                t
            },
            setTransition: function setTransition(o, t, s, n) {
                return n = n || {},
                I.each(t, function(t, e) {
                    var i = o.cssUnit(e);
                    0 < i[0] && (n[e] = i[0] * s + i[1])
                }),
                n
            }
        }),
        I.fn.extend({
            effect: function effect() {
                function i(t) {
                    function i() {
                        I.isFunction(o) && o.call(e[0]),
                        I.isFunction(t) && t()
                    }
                    var e = I(this)
                      , o = n.complete
                      , s = n.mode;
                    (e.is(":hidden") ? "hide" === s : "show" === s) ? (e[s](),
                    i()) : r.call(e[0], n, i)
                }
                var n = e.apply(this, arguments)
                  , t = n.mode
                  , o = n.queue
                  , r = I.effects.effect[n.effect];
                return I.fx.off || !r ? t ? this[t](n.duration, n.complete) : this.each(function() {
                    n.complete && n.complete.call(this)
                }) : !1 === o ? this.each(i) : this.queue(o || "fx", i)
            },
            show: (r = I.fn.show,
            function(t) {
                if (i(t))
                    return r.apply(this, arguments);
                var o = e.apply(this, arguments);
                return o.mode = "show",
                this.effect.call(this, o)
            }
            ),
            hide: (n = I.fn.hide,
            function(t) {
                if (i(t))
                    return n.apply(this, arguments);
                var o = e.apply(this, arguments);
                return o.mode = "hide",
                this.effect.call(this, o)
            }
            ),
            toggle: (s = I.fn.toggle,
            function(t) {
                if (i(t) || "boolean" == typeof t)
                    return s.apply(this, arguments);
                var o = e.apply(this, arguments);
                return o.mode = "toggle",
                this.effect.call(this, o)
            }
            ),
            cssUnit: function cssUnit(t) {
                var i = this.css(t)
                  , o = [];
                return I.each(["em", "px", "%", "pt"], function(t, e) {
                    0 < i.indexOf(e) && (o = [parseFloat(i), e])
                }),
                o
            }
        })
    }(),
    f = {},
    I.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, t) {
        f[t] = function(t) {
            return Math.pow(t, e + 2)
        }
    }),
    I.extend(f, {
        Sine: function Sine(t) {
            return 1 - Math.cos(t * Math.PI / 2)
        },
        Circ: function Circ(t) {
            return 1 - Math.sqrt(1 - t * t)
        },
        Elastic: function Elastic(t) {
            return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
        },
        Back: function Back(t) {
            return t * t * (3 * t - 2)
        },
        Bounce: function Bounce(t) {
            for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; )
                ;
            return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
        }
    }),
    I.each(f, function(t, e) {
        I.easing["easeIn" + t] = e,
        I.easing["easeOut" + t] = function(t) {
            return 1 - e(1 - t)
        }
        ,
        I.easing["easeInOut" + t] = function(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2
        }
    }),
    I.effects
}),
function(e) {
    function f(t, e) {
        var i, o;
        1 < t.originalEvent.touches.length || (t.preventDefault(),
        i = t.originalEvent.changedTouches[0],
        o = document.createEvent("MouseEvents"),
        o.initMouseEvent(e, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
        t.target.dispatchEvent(o))
    }
    var i, t, o, s;
    e.support.touch = "ontouchend"in document,
    e.support.touch && (t = e.ui.mouse.prototype,
    o = t._mouseInit,
    s = t._mouseDestroy,
    t._touchStart = function(t) {
        var e = this;
        !i && e._mouseCapture(t.originalEvent.changedTouches[0]) && (i = !0,
        e._touchMoved = !1,
        f(t, "mouseover"),
        f(t, "mousemove"),
        f(t, "mousedown"))
    }
    ,
    t._touchMove = function(t) {
        i && (this._touchMoved = !0,
        f(t, "mousemove"))
    }
    ,
    t._touchEnd = function(t) {
        i && (f(t, "mouseup"),
        f(t, "mouseout"),
        this._touchMoved || f(t, "click"),
        i = !1)
    }
    ,
    t._mouseInit = function() {
        var t = this;
        t.element.bind({
            touchstart: e.proxy(t, "_touchStart"),
            touchmove: e.proxy(t, "_touchMove"),
            touchend: e.proxy(t, "_touchEnd")
        }),
        o.call(t)
    }
    ,
    t._mouseDestroy = function() {
        var t = this;
        t.element.unbind({
            touchstart: e.proxy(t, "_touchStart"),
            touchmove: e.proxy(t, "_touchMove"),
            touchend: e.proxy(t, "_touchEnd")
        }),
        s.call(t)
    }
    )
}(jQuery),
$.tiny = $.tiny || {},
$.tiny.scrollbar = {
    options: {
        axis: "x",
        wheel: 20,
        mouseWheel: "1",
        size: "auto",
        draggerWidth: "auto"
    }
},
$.fn.tinyscrollbar = function(t) {
    t = $.extend({}, $.tiny.scrollbar.options, t);
    return this.each(function() {
        $(this).data("tsb", new Scrollbar($(this),t))
    }),
    this
}
,
$.fn.tinyscrollbar_update = function(t) {
    return $(this).data("tsb").update(t)
}
,
Tipsy.prototype = {
    show: function show() {
        var t = this.getTitle();
        if (t && this.enabled) {
            var e = this.tip();
            e.find(".tipsy-inner")[this.options.html ? "html" : "text"](t),
            e[0].className = "tipsy",
            e.remove().css({
                top: 0,
                left: 0,
                visibility: "hidden",
                display: "block"
            }).appendTo(document.body);
            var i, o = $.extend({}, this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            }), s = e[0].offsetWidth, n = e[0].offsetHeight, r = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity;
            switch (r.charAt(0)) {
            case "n":
                i = {
                    top: o.top + o.height + this.options.offset,
                    left: o.left + o.width / 2 - s / 2
                };
                break;
            case "s":
                i = {
                    top: o.top - n - this.options.offset,
                    left: o.left + o.width / 2 - s / 2
                };
                break;
            case "e":
                i = {
                    top: o.top + o.height / 2 - n / 2,
                    left: o.left - s - this.options.offset
                };
                break;
            case "w":
                i = {
                    top: o.top + o.height / 2 - n / 2,
                    left: o.left + o.width + this.options.offset
                }
            }
            2 == r.length && ("w" == r.charAt(1) ? i.left = o.left + o.width / 2 - 15 : i.left = o.left + o.width / 2 - s + 15),
            e.css(i).addClass("tipsy-" + r),
            this.options.fade ? e.stop().css({
                opacity: 0,
                display: "block",
                visibility: "visible"
            }).animate({
                opacity: this.options.opacity
            }) : e.css({
                visibility: "visible",
                opacity: this.options.opacity
            })
        }
    },
    hide: function hide() {
        this.options.fade ? this.tip().stop().fadeOut(function() {
            $(this).remove()
        }) : this.tip().remove()
    },
    getTitle: function getTitle() {
        var t = this.$element
          , e = this.options;
        fixTitle(t);
        var i, e = this.options;
        return "string" == typeof e.title ? i = t.attr("title" == e.title ? "original-title" : e.title) : "function" == typeof e.title && (i = e.title.call(t[0])),
        i = ("" + i).replace(/(^\s*|\s*$)/, ""),
        i || e.fallback
    },
    tip: function tip() {
        return this.$tip || (this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>')),
        this.$tip
    },
    validate: function validate() {
        this.$element[0].parentNode || this.hide()
    },
    enable: function enable() {
        this.enabled = !0
    },
    disable: function disable() {
        this.enabled = !1
    },
    toggleEnabled: function toggleEnabled() {
        this.enabled = !this.enabled
    }
},
$.fn.tipsy = function(i) {
    if (!0 === i)
        return this.data("tipsy");
    if ("string" == typeof i)
        return this.data("tipsy")[i]();
    function get(t) {
        var e = $.data(t, "tipsy");
        return e || (e = new Tipsy(t,$.fn.tipsy.elementOptions(t, i)),
        $.data(t, "tipsy", e)),
        e
    }
    function enter() {
        var t = get(this);
        t.hoverState = "in",
        0 == i.delayIn ? t.show() : setTimeout(function() {
            "in" == t.hoverState && t.show()
        }, i.delayIn)
    }
    function leave() {
        var t = get(this);
        t.hoverState = "out",
        0 == i.delayOut ? t.hide() : setTimeout(function() {
            "out" == t.hoverState && t.hide()
        }, i.delayOut)
    }
    var t, e, o;
    return i = $.extend({}, $.fn.tipsy.defaults, i),
    i.live || this.each(function() {
        get(this)
    }),
    "manual" != i.trigger && (t = i.live ? "live" : "bind",
    e = "hover" == i.trigger ? "mouseenter" : "focus",
    o = "hover" == i.trigger ? "mouseleave" : "blur",
    this[t](e, enter)[t](o, leave)),
    this
}
,
$.fn.tipsy.defaults = {
    delayIn: 0,
    delayOut: 0,
    fade: !1,
    fallback: "",
    gravity: "n",
    html: !1,
    live: !1,
    offset: 0,
    opacity: 1,
    title: "title",
    trigger: "hover"
},
$.fn.tipsy.elementOptions = function(t, e) {
    return $.metadata ? $.extend({}, e, $(t).metadata()) : e
}
,
function(k) {
    function t(t, e) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var i = "[\\?&]" + t + "=([^&#]*)"
          , o = new RegExp(i)
          , s = o.exec(e);
        return null == s ? "" : s[1]
    }
    k.prettyPhoto = {
        version: "3.1.6"
    },
    k.fn.prettyPhoto = function(i) {
        function p() {
            k(".pp_loaderIcon").hide(),
            projectedTop = scroll_pos.scrollTop + (x / 2 - f.containerHeight / 2),
            projectedTop < 0 && (projectedTop = 0),
            $ppt.fadeTo(settings.animation_speed, 1),
            $pp_pic_holder.find(".pp_content").animate({
                height: f.contentHeight,
                width: f.contentWidth
            }, settings.animation_speed),
            $pp_pic_holder.animate({
                top: projectedTop,
                left: P / 2 - f.containerWidth / 2 < 0 ? 0 : P / 2 - f.containerWidth / 2,
                width: f.containerWidth
            }, settings.animation_speed, function() {
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(f.height).width(f.width),
                $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed),
                isSet && "image" == r(pp_images[set_position]) ? $pp_pic_holder.find(".pp_hoverContainer").show() : $pp_pic_holder.find(".pp_hoverContainer").hide(),
                settings.allow_expand && (f.resized ? k("a.pp_expand,a.pp_contract").show() : k("a.pp_expand").hide()),
                !settings.autoplay_slideshow || b || e || k.prettyPhoto.startSlideshow(),
                settings.changepicturecallback(),
                e = !0
            }),
            c(),
            i.ajaxcallback()
        }
        function o(t) {
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden"),
            $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function() {
                k(".pp_loaderIcon").show(),
                t()
            })
        }
        function a(t) {
            1 < t ? k(".pp_nav").show() : k(".pp_nav").hide()
        }
        function s(t, e) {
            if (resized = !1,
            n(t, e),
            imageWidth = t,
            imageHeight = e,
            (P < v || x < m) && doresize && settings.allow_resize && !w) {
                for (resized = !0,
                fitting = !1; !fitting; )
                    P < v ? (imageWidth = P - 200,
                    imageHeight = e / t * imageWidth) : x < m ? (imageHeight = x - 200,
                    imageWidth = t / e * imageHeight) : fitting = !0,
                    m = imageHeight,
                    v = imageWidth;
                (P < v || x < m) && s(v, m),
                n(imageWidth, imageHeight)
            }
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(m),
                containerWidth: Math.floor(v) + 2 * settings.horizontal_padding,
                contentHeight: Math.floor(u),
                contentWidth: Math.floor(g),
                resized: resized
            }
        }
        function n(t, e) {
            t = parseFloat(t),
            e = parseFloat(e),
            $pp_details = $pp_pic_holder.find(".pp_details"),
            $pp_details.width(t),
            detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom")),
            $pp_details = $pp_details.clone().addClass(settings.theme).width(t).appendTo(k("body")).css({
                position: "absolute",
                top: -1e4
            }),
            detailsHeight += $pp_details.height(),
            detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight,
            $pp_details.remove(),
            $pp_title = $pp_pic_holder.find(".ppt"),
            $pp_title.width(t),
            titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom")),
            $pp_title = $pp_title.clone().appendTo(k("body")).css({
                position: "absolute",
                top: -1e4
            }),
            titleHeight += $pp_title.height(),
            $pp_title.remove(),
            u = e + detailsHeight,
            g = t,
            m = u + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height(),
            v = t
        }
        function r(t) {
            return t.match(/youtube\.com\/watch/i) || t.match(/youtu\.be/i) ? "youtube" : t.match(/vimeo\.com/i) ? "vimeo" : t.match(/\b.mov\b/i) ? "quicktime" : t.match(/\b.swf\b/i) ? "flash" : t.match(/\biframe=true\b/i) ? "iframe" : t.match(/\bajax=true\b/i) ? "ajax" : t.match(/\bcustom=true\b/i) ? "custom" : "#" == t.substr(0, 1) ? "inline" : "image"
        }
        function l() {
            if (doresize && "undefined" != typeof $pp_pic_holder) {
                if (scroll_pos = d(),
                contentHeight = $pp_pic_holder.height(),
                contentwidth = $pp_pic_holder.width(),
                projectedTop = x / 2 + scroll_pos.scrollTop - contentHeight / 2,
                projectedTop < 0 && (projectedTop = 0),
                contentHeight > x)
                    return;
                $pp_pic_holder.css({
                    top: projectedTop,
                    left: P / 2 + scroll_pos.scrollLeft - contentwidth / 2
                })
            }
        }
        function d() {
            return self.pageYOffset ? {
                scrollTop: self.pageYOffset,
                scrollLeft: self.pageXOffset
            } : document.documentElement && document.documentElement.scrollTop ? {
                scrollTop: document.documentElement.scrollTop,
                scrollLeft: document.documentElement.scrollLeft
            } : document.body ? {
                scrollTop: document.body.scrollTop,
                scrollLeft: document.body.scrollLeft
            } : void 0
        }
        function h() {
            x = k(window).height(),
            P = k(window).width(),
            "undefined" != typeof $pp_overlay && $pp_overlay.height(k(document).height()).width(P)
        }
        function c() {
            isSet && settings.overlay_gallery && "image" == r(pp_images[set_position]) ? (itemWidth = 57,
            navWidth = "facebook" == settings.theme || "pp_default" == settings.theme ? 50 : 30,
            itemsPerPage = Math.floor((f.containerWidth - 100 - navWidth) / itemWidth),
            itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length,
            totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1,
            0 == totalPage ? (navWidth = 0,
            $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()) : $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show(),
            galleryWidth = itemsPerPage * itemWidth,
            fullGalleryWidth = pp_images.length * itemWidth,
            $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected"),
            goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage,
            k.prettyPhoto.changeGalleryPage(goToPage),
            $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")) : $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")
        }
        function _() {
            if (settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))),
            settings.markup = settings.markup.replace("{pp_social}", ""),
            k("body").append(settings.markup),
            $pp_pic_holder = k(".pp_pic_holder"),
            $ppt = k(".ppt"),
            $pp_overlay = k("div.pp_overlay"),
            isSet && settings.overlay_gallery) {
                currentGalleryPage = 0,
                toInject = "";
                for (var t = 0; t < pp_images.length; t++)
                    img_src = pp_images[t].match(/\b(jpg|jpeg|png|gif)\b/gi) ? (classname = "",
                    pp_images[t]) : (classname = "default",
                    ""),
                    toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject),
                $pp_pic_holder.find("#pp_full_res").after(toInject),
                $pp_gallery = k(".pp_pic_holder .pp_gallery"),
                $pp_gallery_li = $pp_gallery.find("li"),
                $pp_gallery.find(".pp_arrow_next").click(function() {
                    return k.prettyPhoto.changeGalleryPage("next"),
                    k.prettyPhoto.stopSlideshow(),
                    !1
                }),
                $pp_gallery.find(".pp_arrow_previous").click(function() {
                    return k.prettyPhoto.changeGalleryPage("previous"),
                    k.prettyPhoto.stopSlideshow(),
                    !1
                }),
                $pp_pic_holder.find(".pp_content").hover(function() {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
                }, function() {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
                }),
                itemWidth = 57,
                $pp_gallery_li.each(function(t) {
                    k(this).find("a").click(function() {
                        return k.prettyPhoto.changePage(t),
                        k.prettyPhoto.stopSlideshow(),
                        !1
                    })
                })
            }
            settings.slideshow && ($pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>'),
            $pp_pic_holder.find(".pp_nav .pp_play").click(function() {
                return k.prettyPhoto.startSlideshow(),
                !1
            })),
            $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme),
            $pp_overlay.css({
                opacity: 0,
                height: k(document).height(),
                width: k(window).width()
            }).bind("click", function() {
                settings.modal || k.prettyPhoto.close()
            }),
            k("a.pp_close").bind("click", function() {
                return k.prettyPhoto.close(),
                !1
            }),
            settings.allow_expand && k("a.pp_expand").bind("click", function() {
                return doresize = k(this).hasClass("pp_expand") ? (k(this).removeClass("pp_expand").addClass("pp_contract"),
                !1) : (k(this).removeClass("pp_contract").addClass("pp_expand"),
                !0),
                o(function() {
                    k.prettyPhoto.open()
                }),
                !1
            }),
            $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function() {
                return k.prettyPhoto.changePage("previous"),
                k.prettyPhoto.stopSlideshow(),
                !1
            }),
            $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function() {
                return k.prettyPhoto.changePage("next"),
                k.prettyPhoto.stopSlideshow(),
                !1
            }),
            l()
        }
        i = jQuery.extend({
            hook: "data-rel",
            animation_speed: "fast",
            ajaxcallback: function ajaxcallback() {},
            slideshow: 5e3,
            autoplay_slideshow: !1,
            opacity: .9,
            show_title: !0,
            allow_resize: !0,
            allow_expand: !0,
            default_width: 720,
            default_height: 410,
            counter_separator_label: "/",
            theme: "pp_default",
            horizontal_padding: 20,
            hideflash: !1,
            wmode: "opaque",
            autoplay: !0,
            modal: !1,
            overlay_gallery: !0,
            overlay_gallery_max: 30,
            keyboard_shortcuts: !0,
            changepicturecallback: function changepicturecallback() {},
            callback: function callback() {},
            markup: '<div class="pp_pic_holder"> \t\t\t\t\t\t<div class="ppt">&nbsp;</div> \t\t\t\t\t\t<div class="pp_top"> \t\t\t\t\t\t\t<div class="pp_left"></div> \t\t\t\t\t\t\t<div class="pp_middle"></div> \t\t\t\t\t\t\t<div class="pp_right"></div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="pp_content_container"> \t\t\t\t\t\t\t<div class="pp_left"> \t\t\t\t\t\t\t<div class="pp_right"> \t\t\t\t\t\t\t\t<div class="pp_content"> \t\t\t\t\t\t\t\t\t<div class="pp_loaderIcon"></div> \t\t\t\t\t\t\t\t\t<div class="pp_fade"> \t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_expand" title="Expand the image">Expand</a> \t\t\t\t\t\t\t\t\t\t<div class="pp_hoverContainer"> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_next" href="#">next</a> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_previous" href="#">previous</a> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t<div id="pp_full_res"></div> \t\t\t\t\t\t\t\t\t\t<div class="pp_details"> \t\t\t\t\t\t\t\t\t\t\t<div class="pp_nav"> \t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous">Previous</a> \t\t\t\t\t\t\t\t\t\t\t\t<p class="currentTextHolder">0/0</p> \t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next">Next</a> \t\t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t\t\t<p class="pp_description"></p> \t\t\t\t\t\t\t\t\t\t\t<div class="pp_social">{pp_social}</div> \t\t\t\t\t\t\t\t\t\t\t<a class="pp_close" href="#">Close</a> \t\t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="pp_bottom"> \t\t\t\t\t\t\t<div class="pp_left"></div> \t\t\t\t\t\t\t<div class="pp_middle"></div> \t\t\t\t\t\t\t<div class="pp_right"></div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t\t<div class="pp_overlay"></div>',
            gallery_markup: '<div class="pp_gallery"> \t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_previous">Previous</a> \t\t\t\t\t\t\t\t<div> \t\t\t\t\t\t\t\t\t<ul> \t\t\t\t\t\t\t\t\t\t{gallery} \t\t\t\t\t\t\t\t\t</ul> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t<a href="#" class="pp_arrow_next">Next</a> \t\t\t\t\t\t\t</div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: "",
            social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"><\/script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
        }, i);
        var f, e, u, g, m, v, b, y = this, w = !1, x = k(window).height(), P = k(window).width();
        return doresize = !0,
        scroll_pos = d(),
        k(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function() {
            l(),
            h()
        }),
        i.keyboard_shortcuts && k(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function(t) {
            if ("undefined" != typeof $pp_pic_holder && $pp_pic_holder.is(":visible"))
                switch (t.keyCode) {
                case 37:
                    k.prettyPhoto.changePage("previous"),
                    t.preventDefault();
                    break;
                case 39:
                    k.prettyPhoto.changePage("next"),
                    t.preventDefault();
                    break;
                case 27:
                    settings.modal || k.prettyPhoto.close(),
                    t.preventDefault()
                }
        }),
        k.prettyPhoto.initialize = function() {
            return settings = i,
            "pp_default" == settings.theme && (settings.horizontal_padding = 16),
            theRel = k(this).attr(settings.hook),
            galleryRegExp = /\[(?:.*)\]/,
            isSet = !!galleryRegExp.exec(theRel),
            pp_images = isSet ? jQuery.map(y, function(t) {
                return -1 != k(t).attr(settings.hook).indexOf(theRel) ? k(t).attr("href") : void 0
            }) : k.makeArray(k(this).attr("href")),
            pp_titles = isSet ? jQuery.map(y, function(t) {
                return -1 != k(t).attr(settings.hook).indexOf(theRel) ? k(t).find("img").attr("alt") ? k(t).find("img").attr("alt") : "" : void 0
            }) : k.makeArray(k(this).find("img").attr("alt")),
            pp_descriptions = isSet ? jQuery.map(y, function(t) {
                return -1 != k(t).attr(settings.hook).indexOf(theRel) ? k(t).attr("title") ? k(t).attr("title") : "" : void 0
            }) : k.makeArray(k(this).attr("title")),
            pp_images.length > settings.overlay_gallery_max && (settings.overlay_gallery = !1),
            set_position = jQuery.inArray(k(this).attr("href"), pp_images),
            rel_index = isSet ? set_position : k("a[" + settings.hook + "^='" + theRel + "']").index(k(this)),
            _(this),
            settings.allow_resize && k(window).bind("scroll.prettyphoto", function() {
                l()
            }),
            k.prettyPhoto.open(),
            !1
        }
        ,
        k.prettyPhoto.open = function(e) {
            return "undefined" == typeof settings && (settings = i,
            pp_images = k.makeArray(arguments[0]),
            pp_titles = arguments[1] ? k.makeArray(arguments[1]) : k.makeArray(""),
            pp_descriptions = arguments[2] ? k.makeArray(arguments[2]) : k.makeArray(""),
            isSet = 1 < pp_images.length,
            set_position = arguments[3] ? arguments[3] : 0,
            _(e.target)),
            settings.hideflash && k("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden"),
            a(k(pp_images).size()),
            k(".pp_loaderIcon").show(),
            settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href)),
            $pp_pic_holder.find(".pp_social").html(facebook_like_link)),
            $ppt.is(":hidden") && $ppt.css("opacity", 0).show(),
            $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity),
            $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + k(pp_images).size()),
            void 0 !== pp_descriptions[set_position] && "" != pp_descriptions[set_position] ? $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position])) : $pp_pic_holder.find(".pp_description").hide(),
            movie_width = parseFloat(t("width", pp_images[set_position])) ? t("width", pp_images[set_position]) : settings.default_width.toString(),
            movie_height = parseFloat(t("height", pp_images[set_position])) ? t("height", pp_images[set_position]) : settings.default_height.toString(),
            w = !1,
            -1 != movie_height.indexOf("%") && (movie_height = parseFloat(k(window).height() * parseFloat(movie_height) / 100 - 150),
            w = !0),
            -1 != movie_width.indexOf("%") && (movie_width = parseFloat(k(window).width() * parseFloat(movie_width) / 100 - 150),
            w = !0),
            $pp_pic_holder.fadeIn(function() {
                switch (settings.show_title && "" != pp_titles[set_position] && void 0 !== pp_titles[set_position] ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html("&nbsp;"),
                imgPreloader = "",
                skipInjection = !1,
                r(pp_images[set_position])) {
                case "image":
                    imgPreloader = new Image,
                    nextImage = new Image,
                    isSet && set_position < k(pp_images).size() - 1 && (nextImage.src = pp_images[set_position + 1]),
                    prevImage = new Image,
                    isSet && pp_images[set_position - 1] && (prevImage.src = pp_images[set_position - 1]),
                    $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]),
                    imgPreloader.onload = function() {
                        f = s(imgPreloader.width, imgPreloader.height),
                        p()
                    }
                    ,
                    imgPreloader.onerror = function() {
                        alert("Image cannot be loaded. Make sure the path is correct and image exist."),
                        k.prettyPhoto.close()
                    }
                    ,
                    imgPreloader.src = pp_images[set_position];
                    break;
                case "youtube":
                    f = s(movie_width, movie_height),
                    movie_id = t("v", pp_images[set_position]),
                    "" == movie_id && (movie_id = pp_images[set_position].split("youtu.be/"),
                    movie_id = movie_id[1],
                    0 < movie_id.indexOf("?") && (movie_id = movie_id.substr(0, movie_id.indexOf("?"))),
                    0 < movie_id.indexOf("&") && (movie_id = movie_id.substr(0, movie_id.indexOf("&")))),
                    movie = "http://www.youtube.com/embed/" + movie_id,
                    t("rel", pp_images[set_position]) ? movie += "?rel=" + t("rel", pp_images[set_position]) : movie += "?rel=1",
                    settings.autoplay && (movie += "&autoplay=1"),
                    toInject = settings.iframe_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                    break;
                case "vimeo":
                    f = s(movie_width, movie_height),
                    movie_id = pp_images[set_position];
                    var e = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/
                      , i = movie_id.match(e);
                    movie = "https://player.vimeo.com/video/" + i[3] + "?title=0&amp;byline=0&amp;portrait=0",
                    settings.autoplay && (movie += "&autoplay=1;"),
                    vimeo_width = f.width + "/embed/?moog_width=" + f.width,
                    toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, f.height).replace(/{path}/g, movie);
                    break;
                case "quicktime":
                    f = s(movie_width, movie_height),
                    f.height += 15,
                    f.contentHeight += 15,
                    f.containerHeight += 15,
                    toInject = settings.quicktime_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                    break;
                case "flash":
                    f = s(movie_width, movie_height),
                    flash_vars = pp_images[set_position],
                    flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length),
                    filename = pp_images[set_position],
                    filename = filename.substring(0, filename.indexOf("?")),
                    toInject = settings.flash_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                    break;
                case "iframe":
                    f = s(movie_width, movie_height),
                    frame_url = pp_images[set_position],
                    frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1),
                    toInject = settings.iframe_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{path}/g, frame_url);
                    break;
                case "ajax":
                    doresize = !1,
                    f = s(movie_width, movie_height),
                    doresize = !0,
                    skipInjection = !0,
                    k.get(pp_images[set_position], function(t) {
                        toInject = settings.inline_markup.replace(/{content}/g, t),
                        $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject,
                        p()
                    });
                    break;
                case "custom":
                    f = s(movie_width, movie_height),
                    toInject = settings.custom_markup;
                    break;
                case "inline":
                    myClone = k(pp_images[set_position]).clone().append('<br clear="all" />').css({
                        width: settings.default_width
                    }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(k("body")).show(),
                    doresize = !1,
                    f = s(k(myClone).width(), k(myClone).height()),
                    doresize = !0,
                    k(myClone).remove(),
                    toInject = settings.inline_markup.replace(/{content}/g, k(pp_images[set_position]).html())
                }
                imgPreloader || skipInjection || ($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject,
                p())
            }),
            !1
        }
        ,
        k.prettyPhoto.changePage = function(t) {
            currentGalleryPage = 0,
            "previous" == t ? (set_position--,
            set_position < 0 && (set_position = k(pp_images).size() - 1)) : "next" == t ? (set_position++,
            set_position > k(pp_images).size() - 1 && (set_position = 0)) : set_position = t,
            rel_index = set_position,
            doresize = doresize || !0,
            settings.allow_expand && k(".pp_contract").removeClass("pp_contract").addClass("pp_expand"),
            o(function() {
                k.prettyPhoto.open()
            })
        }
        ,
        k.prettyPhoto.changeGalleryPage = function(t) {
            "next" == t ? (currentGalleryPage++,
            currentGalleryPage > totalPage && (currentGalleryPage = 0)) : "previous" == t ? (currentGalleryPage--,
            currentGalleryPage < 0 && (currentGalleryPage = totalPage)) : currentGalleryPage = t,
            slide_speed = "next" == t || "previous" == t ? settings.animation_speed : 0,
            slide_to = currentGalleryPage * (itemsPerPage * itemWidth),
            $pp_gallery.find("ul").animate({
                left: -slide_to
            }, slide_speed)
        }
        ,
        k.prettyPhoto.startSlideshow = function() {
            void 0 === b ? ($pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function() {
                return k.prettyPhoto.stopSlideshow(),
                !1
            }),
            b = setInterval(k.prettyPhoto.startSlideshow, settings.slideshow)) : k.prettyPhoto.changePage("next")
        }
        ,
        k.prettyPhoto.stopSlideshow = function() {
            $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function() {
                return k.prettyPhoto.startSlideshow(),
                !1
            }),
            clearInterval(b),
            b = void 0
        }
        ,
        k.prettyPhoto.close = function() {
            $pp_overlay.is(":animated") || (k.prettyPhoto.stopSlideshow(),
            $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden"),
            k("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function() {
                k(this).remove()
            }),
            $pp_overlay.fadeOut(settings.animation_speed, function() {
                settings.hideflash && k("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible"),
                k(this).remove(),
                k(window).unbind("scroll.prettyphoto"),
                settings.callback(),
                doresize = !0,
                e = !1,
                delete settings
            }),
            0 !== simplePlayer && 1 == simplePlayer.prettyPaused && (simplePlayer.play(),
            simplePlayer.prettyPaused = 0))
        }
        ,
        this.unbind("click.prettyphoto").bind("click.prettyphoto", k.prettyPhoto.initialize)
    }
}(jQuery),
function(P) {
    P.fn.preload = function(i) {
        var o = this.length
          , s = 0;
        return this.each(function() {
            var t = new Image
              , e = this;
            void 0 !== e && (i && (t.onload = function() {
                i.call(e, 100 * ++s / o, s === o)
            }
            ),
            t.src = this.src)
        })
    }
    ,
    P.fn.timelineSlider = function(x) {
        x = P.extend({
            timelineWidth: 960,
            timelineHeight: 500,
            upperAreaHeight: 265,
            lowerAreaHeight: 215,
            draggerHeight: 21,
            responsive: !0,
            marksOnMobile: !0,
            version: "dark",
            designStyle: "default",
            accentColor: "#299ec4",
            timelineBorderWidth: 4,
            timelineBorderColor: "#ffffff",
            shadow: !0
        }, x);
        return this.each(function() {
            var l = P(window)
              , p = l.width()
              , h = P(this)
              , c = h.find(".timeline")
              , d = c.find(".viewport")
              , f = c.find(".viewport .images")
              , u = c.find(".milestones")
              , g = c.find(".milestones .content")
              , m = c.find(".scrollbar")
              , _ = c.find(".scrollbar .track")
              , v = c.find(".scrollbar .track .dragger")
              , b = c.find(".marks")
              , y = (c.find(".video_bt"),
            c.find(".image_bt,.video_bt"))
              , w = c.find(".readmore");
            function startDrag(o) {
                var s = 0;
                o.draggable({
                    axis: "x",
                    start: function start(t, e) {
                        null != e.position && (s = e.position.left)
                    },
                    drag: function drag(t, e) {
                        s = e.position.left;
                        var i = o.width() - h.width();
                        e.position.left < 0 && -1 * e.position.left > i && (s = -1 * i),
                        0 < e.position.left && (s = 0),
                        e.position.left = s,
                        g.css("left", s * ratio),
                        v.css("left", s * -ratioDragger),
                        iScroll = -s,
                        iScroll2 = -g.position().left
                    }
                }),
                o.addClass("drag_icon")
            }
            h.append('<div class="preload"></div>'),
            P("img", h).preload(function(t, e) {
                if (e) {
                    var i, o = 0, s = 0, n = 0;
                    g.children().each(function() {
                        o += P(this).outerWidth(!0)
                    }),
                    f.find("img").each(function() {
                        s += P(this).outerWidth(!0)
                    }),
                    n = parseInt(v.css("width")),
                    h.css("width", x.timelineWidth),
                    h.css("height", x.timelineHeight),
                    f.css("width", s),
                    d.css("height", x.upperAreaHeight),
                    g.css("width", o + 100),
                    u.css("height", x.lowerAreaHeight),
                    m.css("top", x.upperAreaHeight - x.draggerHeight),
                    _.css("height", x.draggerHeight),
                    v.css("height", x.draggerHeight),
                    P(".preload").fadeOut(500),
                    c.animate({
                        opacity: 1
                    }, 1e3, "easeOutQuad"),
                    "dark" == x.version && h.addClass("dark"),
                    "flat" == x.designStyle && (h.addClass("flat"),
                    v.find("img").attr("src", "/typo3conf/ext/gd_sites/Resources/Public/Images/milestones/scrollbar_dragger_flat.png")),
                    x.shadow && h.addClass("shadow"),
                    c.find(".date").css("color", x.accentColor),
                    c.find(".link a").hover(function() {
                        i = P(this).css("color"),
                        P(this).css("color", x.accentColor)
                    }, function() {
                        P(this).css("color", i)
                    }),
                    c.find(".boxed_link a").css("color", x.accentColor),
                    0 < x.timelineBorderWidth && (console.log(x.timelineBorderWidth),
                    h.css("border", x.timelineBorderWidth + "px solid " + x.timelineBorderColor),
                    u.css("border-top", x.timelineBorderWidth + "px solid " + x.timelineBorderColor)),
                    P("a[data-rel^='prettyPhoto']").prettyPhoto({
                        social_tools: !1,
                        theme: "timeline-slider"
                    }),
                    w.tipsy({
                        gravity: "w",
                        fade: !0,
                        offset: 5
                    }),
                    y.append("<span></span>").hover(function() {
                        P(this).children("span").stop(!0, !0).fadeIn(400)
                    }, function() {
                        P(this).children("span").stop(!0, !0).fadeOut(200)
                    });
                    for (var r = b.find("div").length, a = 0; a < r; a++)
                        current = b.find("div:nth-child(" + (a + 1) + ")"),
                        current.stop(!0, !0).delay(500).animate({
                            left: current.attr("data-xpos"),
                            opacity: 1
                        }, 700 + 100 * a, "easeOutQuad").show().tipsy({
                            gravity: "s",
                            fade: !0,
                            offset: 3,
                            fallback: current.attr("data-label")
                        });
                    startDrag(f);
                    function manageFullwidth() {
                        "auto" == x.timelineWidth || x.responsive && p < x.timelineWidth + 25 ? wrapperToFull() : (h.css("width", x.timelineWidth),
                        dynamicScrollWidth = x.timelineWidth,
                        c.tinyscrollbar_update()),
                        !x.marksOnMobile && p < 768 ? b.hide() : b.show()
                    }
                    function wrapperToFull() {
                        h.css("width", "auto"),
                        dynamicScrollWidth = parseInt(h.css("width")),
                        c.tinyscrollbar_update()
                    }
                    dynamicScrollWidth = x.timelineWidth,
                    c.tinyscrollbar({
                        wheel: 20,
                        mouseWheel: 1,
                        size: dynamicScrollWidth,
                        draggerWidth: n
                    }),
                    !x.responsive && "auto" != x.timelineWidth || (l.resize(function() {
                        p = l.width(),
                        manageFullwidth()
                    }),
                    manageFullwidth())
                }
            })
        })
    }
}(jQuery);

function GDataMainMenu() {
    var n = this
      , e = [];
    this.DOMElements = {
        MenuToggle: document.querySelector("[data-gd-menu-toggle]"),
        MenuTargets: document.querySelectorAll("[data-gd-menu-target]"),
        MenuLinks: document.querySelectorAll(".main-nav a")
    },
    this.init = function() {
        n._toggleNavigationOnClick(),
        n._toggleMenuTargetsOnClick(),
        n._closeMenuTargetOnOutsideClick(),
        n._closeMenuTargetsOnScrollDown(),
        n._closeMenuTargetsOnLinkClick()
    }
    ,
    this._toggleNavigationOnClick = function() {
        n.DOMElements.MenuToggle.addEventListener("click", function() {
            document.querySelector("body").classList.toggle("main-nav-active")
        })
    }
    ,
    this._toggleMenuTargetsOnClick = function() {
        n.DOMElements.MenuTargets.forEach(function(t) {
            e.push(t),
            t.addEventListener("click", function(e) {
                e.preventDefault(),
                n._hasParentClass(t, "open") || t.classList.contains("is-open") || n._removeActiveStates(),
                n._setMenuTargetState(t, t.dataset.gdMenuTarget, !1)
            })
        })
    }
    ,
    this._closeMenuTargetOnOutsideClick = function() {
        var e, t = function close() {
            1024 <= window.innerWidth && document.addEventListener("mouseup", function(e) {
                void 0 === e.target.dataset.gdMenuTarget && n._removeActiveStates()
            })
        };
        t(),
        window.addEventListener("resize", function() {
            e && window.cancelAnimationFrame(e),
            e = window.requestAnimationFrame(function() {
                t()
            })
        })
    }
    ,
    this._closeMenuTargetsOnScrollDown = function() {
        var e;
        window.addEventListener("scroll", function() {
            e && window.cancelAnimationFrame(e),
            e = window.requestAnimationFrame(function() {
                400 < window.pageYOffset && n.DOMElements.MenuTargets.forEach(function(e) {
                    n._setMenuTargetState(e, e.dataset.gdMenuTarget, !0)
                })
            })
        })
    }
    ,
    this._closeMenuTargetsOnLinkClick = function() {
        n.DOMElements.MenuLinks.forEach(function(e) {
            e.addEventListener("click", function() {
                e.dataset.gdMenuTarget || (document.querySelector("body").classList.remove("main-nav-active"),
                n._removeActiveStates())
            })
        })
    }
    ,
    this._setMenuTargetState = function(e, t, n) {
        var i = document.getElementById(t);
        e && i && (n ? (e.classList.remove("is-open"),
        i.classList.remove("open")) : (e.classList.toggle("is-open"),
        i.classList.toggle("open")))
    }
    ,
    this._hasParentClass = function(e, t) {
        if (0 <= e.className.split(" ").indexOf(t))
            return !0;
        try {
            return e.parentNode && n._hasParentClass(e.parentNode, t)
        } catch (e) {
            return !1
        }
    }
    ,
    this._removeActiveStates = function() {
        e.forEach(function(e) {
            n._setMenuTargetState(e, e.dataset.gdMenuTarget, !0)
        })
    }
}
var GdWebsite = GdWebsite || {};
GdWebsite.MainMenu = new GDataMainMenu,
GdWebsite.MainMenu.init();
