﻿// Version: 3.5.3
(function () {
    var n = null, r = !1; function t() { return function () { } }
    window.JSON && window.JSON.stringify || function () {
        function a() { try { return this.valueOf() } catch (a) { return n } } function c(a) { d.lastIndex = 0; return d.test(a) ? '"' + a.replace(d, function (a) { var b = q[a]; return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function b(d, H) {
            var h, i, l, j, m, q = e, f = H[d]; f && "object" === typeof f && (f = a.call(f)); "function" === typeof k && (f = k.call(H, d, f)); switch (typeof f) {
                case "string": return c(f); case "number": return isFinite(f) ? String(f) : "null"; case "boolean": case "null": return String(f);
                case "object": if (!f) return "null"; e += s; m = []; if ("[object Array]" === Object.prototype.toString.apply(f)) { j = f.length; for (h = 0; h < j; h += 1) m[h] = b(h, f) || "null"; l = 0 === m.length ? "[]" : e ? "[\n" + e + m.join(",\n" + e) + "\n" + q + "]" : "[" + m.join(",") + "]"; e = q; return l } if (k && "object" === typeof k) { j = k.length; for (h = 0; h < j; h += 1) i = k[h], "string" === typeof i && (l = b(i, f)) && m.push(c(i) + (e ? ": " : ":") + l) } else for (i in f) Object.hasOwnProperty.call(f, i) && (l = b(i, f)) && m.push(c(i) + (e ? ": " : ":") + l); l = 0 === m.length ? "{}" : e ? "{\n" + e + m.join(",\n" + e) + "\n" +
                q + "}" : "{" + m.join(",") + "}"; e = q; return l
            }
        } window.JSON || (window.JSON = {}); var d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, s, q = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, k; "function" !== typeof JSON.stringify && (JSON.stringify = function (a, c, d) {
            var i; s = e = ""; if ("number" === typeof d) for (i = 0; i < d; i += 1) s += " "; else "string" === typeof d && (s = d); if ((k = c) && "function" !== typeof c && ("object" !== typeof c || "number" !==
            typeof c.length)) throw Error("JSON.stringify"); return b("", { "": a })
        }); "function" !== typeof JSON.parse && (JSON.parse = function (a) { return eval("(" + a + ")") })
    }(); var aa = 1, v = r, ba = [], w = "-pnpres", z = 1E3, da = "/", ea = "&", ha = /{([\w\-]+)}/g; function E() { return "x" + ++aa + "" + +new Date } function G() { return +new Date } var I, ia = Math.floor(20 * Math.random()); I = function (a, c) { return 0 < a.indexOf("pubsub.") && a.replace("pubsub", "ps" + (c ? ja().split("-")[0] : 20 > ++ia ? ia : ia = 1)) || a };
    function ka(a, c) { var b = a.join(da), d = []; if (!c) return b; M(c, function (a, b) { d.push(a + "=" + N(b)) }); return b += "?" + d.join(ea) } function la(a, c) { function b() { e + c > G() ? (clearTimeout(d), d = setTimeout(b, c)) : (e = G(), a()) } var d, e = 0; return b } function ma(a, c) { var b = []; M(a || [], function (a) { c(a) && b.push(a) }); return b } function na(a, c) { return a.replace(ha, function (a, d) { return c[d] || a }) }
    function ja(a) { var c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) { var c = 16 * Math.random() | 0; return ("x" == a ? c : c & 3 | 8).toString(16) }); a && a(c); return c } function M(a, c) { if (a && c) if ("undefined" != typeof a[0]) for (var b = 0, d = a.length; b < d;) c.call(a[b], a[b], b++); else for (b in a) a.hasOwnProperty && a.hasOwnProperty(b) && c.call(a[b], b, a[b]) } function P(a, c) { var b = []; M(a || [], function (a, e) { b.push(c(a, e)) }); return b }
    function N(a) { return P(encodeURIComponent(a).split(""), function (a) { return 0 > "-_.!~*'()".indexOf(a) ? a : "%" + a.charCodeAt(0).toString(16).toUpperCase() }).join("") } function oa(a) { var c = []; M(a, function (a, d) { d.j && c.push(a) }); return c.sort() } function pa() { setTimeout(function () { v || (v = 1, M(ba, function (a) { a() })) }, z) }
    if (!window.PUBNUB) {
        var Q = function (a) { return document.getElementById(a) }, qa = function (a) { console.error(a) }, ra = function (a, c) { var b = []; M(a.split(/\s+/), function (a) { M((c || document).getElementsByTagName(a), function (a) { b.push(a) }) }); return b }, R = function (a, c, b) {
            M(a.split(","), function (a) {
                function e(a) { a || (a = window.event); b(a) || (a.cancelBubble = !0, a.returnValue = r, a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation()) } c.addEventListener ? c.addEventListener(a, e, r) : c.attachEvent ? c.attachEvent("on" +
                a, e) : c["on" + a] = e
            })
        }, sa = function () { return ra("head")[0] }, S = function (a, c, b) { if (b) a.setAttribute(c, b); else return a && a.getAttribute && a.getAttribute(c) }, ua = function (a, c) { for (var b in c) if (c.hasOwnProperty(b)) try { a.style[b] = c[b] + (0 < "|width|height|top|left|".indexOf(b) && "number" == typeof c[b] ? "px" : "") } catch (d) { } }, va = function (a) { return document.createElement(a) }, wa = function () { return T || U() ? 0 : E() }, ya = function (a) {
            function c(a, b) {
                O || (O = 1, f.onerror = n, clearTimeout(u), a || !b || X(b), setTimeout(function () {
                    a && Y(); var b =
                    Q(x), c = b && b.parentNode; c && c.removeChild(b)
                }, z))
            } if (T || U()) {
                a: {
                    var b, d, e = function () { if (!q) { q = 1; clearTimeout(g); try { d = JSON.parse(b.responseText) } catch (a) { return j(1) } s = 1; i(d) } }, s = 0, q = 0, k = a.timeout || 1E4, g = setTimeout(function () { j(1) }, k), H = a.b || t(), h = a.data || {}, i = a.c || t(), l = "undefined" === typeof a.g, j = function (a) { s || (s = 1, clearTimeout(g), b && (b.onerror = b.onload = n, b.abort && b.abort(), b = n), a && H()) }; try {
                        b = U() || window.XDomainRequest && new XDomainRequest || new XMLHttpRequest; b.onerror = b.onabort = function () { j(1) };
                        b.onload = b.onloadend = e; l && (b.timeout = k); h.pnsdk = xa; var m = ka(a.url, h); b.open("GET", m, l); b.send()
                    } catch (D) { j(0); T = 0; a = ya(a); break a } a = j
                } return a
            } var f = va("script"), e = a.a, x = E(), O = 0, u = setTimeout(function () { c(1) }, a.timeout || 1E4), Y = a.b || t(), k = a.data || {}, X = a.c || t(); window[e] = function (a) { c(0, a) }; a.g || (f[za] = za); f.onerror = function () { c(1) }; k.pnsdk = xa; f.src = ka(a.url, k); S(f, "id", x); sa().appendChild(f); return c
        }, Aa = function () { return !("onLine" in navigator) ? 1 : navigator.onLine }, U = function () {
            if (!Ba || !Ba.get) return 0;
            var a = { id: U.id++, send: t(), abort: function () { a.id = {} }, open: function (c, b) { U[a.id] = a; Ba.get(a.id, b) } }; return a
        }, za = "async", xa = "PubNub-JS-Web/3.5.3", T = -1 == navigator.userAgent.indexOf("MSIE 6"); window.console || (window.console = window.console || {}); console.log || (console.log = console.error = (window.opera || {}).postError || t()); var Ca, V = window.localStorage; Ca = {
            get: function (a) { try { return V ? V.getItem(a) : -1 == document.cookie.indexOf(a) ? n : ((document.cookie || "").match(RegExp(a + "=([^;]+)")) || [])[1] || n } catch (c) { } }, set: function (a,
            c) { try { if (V) return V.setItem(a, c) && 0; document.cookie = a + "=" + c + "; expires=Thu, 1 Aug 2030 20:00:00 UTC; path=/" } catch (b) { } }
        }; var W = { list: {}, unbind: function (a) { W.list[a] = [] }, bind: function (a, c) { (W.list[a] = W.list[a] || []).push(c) }, fire: function (a, c) { M(W.list[a] || [], function (a) { a(c) }) } }, Z = Q("pubnub") || 0, Da = function (a) {
            function c() { } function b(a) { J && J(a); J = n } function d() { y.time(function (a) { a || b(1); setTimeout(d, i) }) } function e() { fa() || b(1); setTimeout(e, z) } function s(a) {
                var b = 0; M(oa(A), function (c) {
                    if (c = A[c]) b++,
                    (a || t())(c)
                }); return b
            } function q(a) { a && (u.h = 0); !u.h && u.length && (u.h = 1, B(u.shift())) } a.jsonp && (T = 0); var k = a.subscribe_key || ""; a.uuid || Ca.get(k + "uuid"); a.xdr = ya; a.db = Ca; a.error = qa; a._is_online = Aa; a.jsonp_cb = wa; var g, H = +a.windowing || 10, h = (+a.timeout || 310) * z, i = (+a.keepalive || 60) * z, l = a.publish_key || "", j = a.subscribe_key || "", m = a.auth_key || "", D = a.ssl ? "s" : "", f = "http" + D + "://" + (a.origin || "pubsub.pubnub.com"), x = I(f), O = I(f), u = [], Y = 0, X = 0, J = 0, ca = 0, K = 0, A = {}, B = a.xdr, p = a.error || t(), fa = a._is_online || function () { return 1 },
            F = a.jsonp_cb || function () { return 0 }, L = a.db || { get: t(), set: t() }, C = a.uuid || L && L.get(j + "uuid") || "", y = {
                LEAVE: function (a, b) { var c = { uuid: C, auth: m }, d = I(f), e = F(); 0 < a.indexOf(w) || ("0" != e && (c.callback = e), B({ g: b || D, timeout: 2E3, a: e, data: c, url: [d, "v2", "presence", "sub_key", j, "channel", N(a), "leave"] })) }, history: function (a, b) {
                    var b = a.callback || b, c = a.count || a.limit || 100, d = a.reverse || "false", e = a.error || t(), f = a.channel, g = a.start, i = a.end, h = {}, l = F(); if (!f) return p("Missing Channel"); if (!b) return p("Missing Callback"); if (!j) return p("Missing Subscribe Key");
                    h.stringtoken = "true"; h.count = c; h.reverse = d; h.auth = m; l && (h.callback = l); g && (h.start = g); i && (h.end = i); B({ a: l, data: h, c: function (a) { b(a) }, b: e, url: [x, "v2", "history", "sub-key", j, "channel", N(f)] })
                }, replay: function (a) {
                    var b = b || a.callback || t(), c = a.source, d = a.destination, e = a.stop, f = a.start, h = a.end, g = a.reverse, a = a.limit, i = F(), k = {}; if (!c) return p("Missing Source Channel"); if (!d) return p("Missing Destination Channel"); if (!l) return p("Missing Publish Key"); if (!j) return p("Missing Subscribe Key"); "0" != i && (k.callback =
                    i); e && (k.stop = "all"); g && (k.reverse = "true"); f && (k.start = f); h && (k.end = h); a && (k.count = a); k.auth = m; B({ a: i, c: function (a) { b(a) }, b: function () { b([0, "Disconnected"]) }, url: [x, "v1", "replay", l, j, c, d], data: k })
                }, auth: function (a) { m = a; c() }, time: function (a) { var b = F(); B({ a: b, data: { uuid: C, auth: m }, timeout: 5 * z, url: [x, "time", b], c: function (b) { a(b[0]) }, b: function () { a(0) } }) }, publish: function (a, b) {
                    var b = b || a.callback || t(), c = a.message, d = a.channel, e = F(); if (!c) return p("Missing Message"); if (!d) return p("Missing Channel"); if (!l) return p("Missing Publish Key");
                    if (!j) return p("Missing Subscribe Key"); c = JSON.stringify(c); d = [x, "publish", l, j, 0, N(d), e, N(c)]; u.push({ a: e, timeout: 5 * z, url: d, data: { uuid: C, auth: m }, c: function (a) { b(a); q(1) }, b: function () { b([0, "Failed", c]); q(1) } }); q()
                }, unsubscribe: function (a) { a = a.channel; K = 0; ca = 1; a = P((a.join ? a.join(",") : "" + a).split(","), function (a) { return a + "," + a + w }).join(","); M(a.split(","), function (a) { v && y.LEAVE(a, 0); A[a] = 0 }); c() }, subscribe: function (a, d) {
                    function e(a) {
                        a ? setTimeout(c, z) : (x = I(f, 1), O = I(f, 1), setTimeout(function () { y.time(e) },
                        z)); s(function (b) { if (a && b.d) return b.d = 0, b.m(b.name); !a && !b.d && (b.d = 1, b.l(b.name)) })
                    } function i() {
                        var a = F(), d = oa(A).join(","); d && (b(), J = B({
                            timeout: Fa, a: a, b: function () { J = n; y.time(e) }, data: { uuid: C, auth: m }, url: [O, "subscribe", j, N(d), a, K], c: function (a) {
                                J = n; if (!a || "object" == typeof a && "error" in a && !a.error) return u(a), setTimeout(c, ga); K = !K && ca && L.get(j) || a[1]; s(function (a) { a.f || (a.f = 1, a.k(a.name)) }); ta && (K = 1E4, ta = 0); L.set(j, a[1]); var b, d = (2 < a.length ? a[2] : P(A, function (b) {
                                    return P(Array(a[0].length).join(",").split(","),
                                    function () { return b })
                                }).join(",")).split(","); b = function () { var a = d.shift() || X; return [(A[a] || {}).a || Y, a.split(w)[0]] }; M(a[0], function (c) { var d = b(); d[0](c, a, d[1]) }); setTimeout(i, ga)
                            }
                        }))
                    } var g = a.channel, d = (d = d || a.callback) || a.message, k = a.connect || t(), l = a.reconnect || t(), q = a.disconnect || t(), u = a.error || t(), D = a.presence || 0, fa = a.noheresync || 0, ta = a.backfill || 0, Ga = a.timetoken || 0, Fa = a.timeout || h, ga = a.windowing || H; ca = a.restore; K = Ga; if (!g) return p("Missing Channel"); if (!d) return p("Missing Callback"); if (!j) return p("Missing Subscribe Key");
                    M((g.join ? g.join(",") : "" + g).split(","), function (a) { var b = A[a] || {}; A[X = a] = { name: a, f: b.f, d: b.d, j: 1, a: Y = d, k: k, l: q, m: l }; D && (y.subscribe({ channel: a + w, callback: D }), !b.j && !fa && y.here_now({ channel: a, callback: function (b) { M("uuids" in b ? b.uuids : [], function (c) { D({ action: "join", uuid: c, timestamp: G(), occupancy: b.occupancy || 1 }, b, a) }) } })) }); c = function () { b(); setTimeout(i, ga) }; if (!v) return ba.push(c); c()
                }, here_now: function (a, b) {
                    var b = a.callback || b, c = a.error || t(), d = a.channel, e = F(), f = { uuid: C, auth: m }; if (!d) return p("Missing Channel");
                    if (!b) return p("Missing Callback"); if (!j) return p("Missing Subscribe Key"); "0" != e && (f.callback = e); B({ a: e, data: f, c: function (a) { b(a, d) }, b: c, url: [x, "v2", "presence", "sub_key", j, "channel", N(d)] })
                }, xdr: B, ready: pa, db: L, uuid: ja, map: P, each: M, "each-channel": s, grep: ma, offline: function () { b(1) }, supplant: na, now: G, unique: E, updater: la
            }; C || (C = y.uuid()); L.set(j + "uuid", C); setTimeout(e, z); setTimeout(d, i); y.time(t()); g = y; g.css = ua; g.$ = Q; g.create = va; g.bind = R; g.head = sa; g.search = ra; g.attr = S; g.events = W; g.init = Da; R("beforeunload",
            window, function () { g["each-channel"](function (a) { g.LEAVE(a.name, 0) }); return !0 }); if (a.notest) return g; R("offline", window, g.offline); R("offline", document, g.offline); return g
        }; R("load", window, function () { setTimeout(pa, 0) }); var $ = Z || {}; PUBNUB = Da({ notest: 1, publish_key: S($, "pub-key"), subscribe_key: S($, "sub-key"), ssl: !document.location.href.indexOf("https") || "on" == S($, "ssl"), origin: S($, "origin"), uuid: S($, "uuid") }); window.jQuery && (window.jQuery.PUBNUB = PUBNUB); "undefined" !== typeof module && (module.exports = PUBNUB) &&
        pa(); var Ba = Q("pubnubs") || 0; if (Z) { ua(Z, { position: "absolute", top: -z }); if ("opera" in window || S(Z, "flash")) Z.innerHTML = "<object id=pubnubs data=https://pubnub.a.ssl.fastly.net/pubnub.swf><param name=movie value=https://pubnub.a.ssl.fastly.net/pubnub.swf><param name=allowscriptaccess value=always></object>"; PUBNUB.rdx = function (a, c) { if (!c) return U[a].onerror(); U[a].responseText = unescape(c); U[a].onload() }; U.id = z }
    }
    var Ea = PUBNUB.ws = function (a, c) {
        if (!(this instanceof Ea)) return new Ea(a, c); var b = this, a = b.url = a || ""; b.protocol = c || "Sec-WebSocket-Protocol"; var d = a.split("/"), d = { ssl: "wss:" === d[0], origin: d[2], publish_key: d[3], subscribe_key: d[4], channel: d[5] }; b.CONNECTING = 0; b.OPEN = 1; b.CLOSING = 2; b.CLOSED = 3; b.CLOSE_NORMAL = 1E3; b.CLOSE_GOING_AWAY = 1001; b.CLOSE_PROTOCOL_ERROR = 1002; b.CLOSE_UNSUPPORTED = 1003; b.CLOSE_TOO_LARGE = 1004; b.CLOSE_NO_STATUS = 1005; b.CLOSE_ABNORMAL = 1006; b.onclose = b.onerror = b.onmessage = b.onopen = b.onsend =
        t(); b.binaryType = ""; b.extensions = ""; b.bufferedAmount = 0; b.trasnmitting = r; b.buffer = []; b.readyState = b.CONNECTING; if (!a) return b.readyState = b.CLOSED, b.onclose({ code: b.CLOSE_ABNORMAL, reason: "Missing URL", wasClean: !0 }), b; b.e = PUBNUB.init(d); b.e.i = d; b.i = d; b.e.subscribe({ restore: r, channel: d.channel, disconnect: b.onerror, reconnect: b.onopen, error: function () { b.onclose({ code: b.CLOSE_ABNORMAL, reason: "Missing URL", wasClean: r }) }, callback: function (a) { b.onmessage({ data: a }) }, connect: function () { b.readyState = b.OPEN; b.onopen() } })
    };
    Ea.prototype.send = function (a) { var c = this; c.e.publish({ channel: c.e.i.channel, message: a, callback: function (a) { c.onsend({ data: a }) } }) };
})();