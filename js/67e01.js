/*! Simple Calendar - 3.4.9
 * https://simplecalendar.io
 * Copyright (c) Xtendify Technologies 2025
 * Licensed GPLv2+ */

(() => {
    var ct = Object.create;
    var it = Object.defineProperty;
    var ft = Object.getOwnPropertyDescriptor;
    var lt = Object.getOwnPropertyNames;
    var dt = Object.getPrototypeOf,
        ht = Object.prototype.hasOwnProperty;
    var Q = (a, $) => () => ($ || a(($ = {
        exports: {}
    }).exports, $), $.exports);
    var mt = (a, $, U, W) => {
        if ($ && typeof $ == "object" || typeof $ == "function")
            for (let D of lt($)) !ht.call(a, D) && D !== U && it(a, D, {
                get: () => $[D],
                enumerable: !(W = ft($, D)) || W.enumerable
            });
        return a
    };
    var G = (a, $, U) => (U = a != null ? ct(dt(a)) : {}, mt($ || !a || !a.__esModule ? it(U, "default", {
        value: a,
        enumerable: !0
    }) : U, a));
    var at = Q((K, R) => {
        (function(a, $) {
            typeof K == "object" && typeof R < "u" ? R.exports = $() : typeof define == "function" && define.amd ? define($) : (a = typeof globalThis < "u" ? globalThis : a || self).dayjs = $()
        })(K, function() {
            "use strict";
            var a = 1e3,
                $ = 6e4,
                U = 36e5,
                W = "millisecond",
                D = "second",
                x = "minute",
                y = "hour",
                S = "day",
                v = "week",
                f = "month",
                l = "quarter",
                d = "year",
                o = "date",
                t = "Invalid Date",
                r = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
                w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
                T = {
                    name: "en",
                    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                    ordinal: function(u) {
                        var n = ["th", "st", "nd", "rd"],
                            e = u % 100;
                        return "[" + u + (n[(e - 20) % 10] || n[e] || n[0]) + "]"
                    }
                },
                p = function(u, n, e) {
                    var s = String(u);
                    return !s || s.length >= n ? u : "" + Array(n + 1 - s.length).join(e) + u
                },
                _ = {
                    s: p,
                    z: function(u) {
                        var n = -u.utcOffset(),
                            e = Math.abs(n),
                            s = Math.floor(e / 60),
                            i = e % 60;
                        return (n <= 0 ? "+" : "-") + p(s, 2, "0") + ":" + p(i, 2, "0")
                    },
                    m: function u(n, e) {
                        if (n.date() < e.date()) return -u(e, n);
                        var s = 12 * (e.year() - n.year()) + (e.month() - n.month()),
                            i = n.clone().add(s, f),
                            c = e - i < 0,
                            m = n.clone().add(s + (c ? -1 : 1), f);
                        return +(-(s + (e - i) / (c ? i - m : m - i)) || 0)
                    },
                    a: function(u) {
                        return u < 0 ? Math.ceil(u) || 0 : Math.floor(u)
                    },
                    p: function(u) {
                        return {
                            M: f,
                            y: d,
                            w: v,
                            d: S,
                            D: o,
                            h: y,
                            m: x,
                            s: D,
                            ms: W,
                            Q: l
                        }[u] || String(u || "").toLowerCase().replace(/s$/, "")
                    },
                    u: function(u) {
                        return u === void 0
                    }
                },
                h = "en",
                z = {};
            z[h] = T;
            var k = "$isDayjsObject",
                M = function(u) {
                    return u instanceof j || !(!u || !u[k])
                },
                C = function u(n, e, s) {
                    var i;
                    if (!n) return h;
                    if (typeof n == "string") {
                        var c = n.toLowerCase();
                        z[c] && (i = c), e && (z[c] = e, i = c);
                        var m = n.split("-");
                        if (!i && m.length > 1) return u(m[0])
                    } else {
                        var O = n.name;
                        z[O] = n, i = O
                    }
                    return !s && i && (h = i), i || !s && h
                },
                b = function(u, n) {
                    if (M(u)) return u.clone();
                    var e = typeof n == "object" ? n : {};
                    return e.date = u, e.args = arguments, new j(e)
                },
                g = _;
            g.l = C, g.i = M, g.w = function(u, n) {
                return b(u, {
                    locale: n.$L,
                    utc: n.$u,
                    x: n.$x,
                    $offset: n.$offset
                })
            };
            var j = function() {
                    function u(e) {
                        this.$L = C(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[k] = !0
                    }
                    var n = u.prototype;
                    return n.parse = function(e) {
                        this.$d = function(s) {
                            var i = s.date,
                                c = s.utc;
                            if (i === null) return new Date(NaN);
                            if (g.u(i)) return new Date;
                            if (i instanceof Date) return new Date(i);
                            if (typeof i == "string" && !/Z$/i.test(i)) {
                                var m = i.match(r);
                                if (m) {
                                    var O = m[2] - 1 || 0,
                                        Y = (m[7] || "0").substring(0, 3);
                                    return c ? new Date(Date.UTC(m[1], O, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0, Y)) : new Date(m[1], O, m[3] || 1, m[4] || 0, m[5] || 0, m[6] || 0, Y)
                                }
                            }
                            return new Date(i)
                        }(e), this.init()
                    }, n.init = function() {
                        var e = this.$d;
                        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds()
                    }, n.$utils = function() {
                        return g
                    }, n.isValid = function() {
                        return this.$d.toString() !== t
                    }, n.isSame = function(e, s) {
                        var i = b(e);
                        return this.startOf(s) <= i && i <= this.endOf(s)
                    }, n.isAfter = function(e, s) {
                        return b(e) < this.startOf(s)
                    }, n.isBefore = function(e, s) {
                        return this.endOf(s) < b(e)
                    }, n.$g = function(e, s, i) {
                        return g.u(e) ? this[s] : this.set(i, e)
                    }, n.unix = function() {
                        return Math.floor(this.valueOf() / 1e3)
                    }, n.valueOf = function() {
                        return this.$d.getTime()
                    }, n.startOf = function(e, s) {
                        var i = this,
                            c = !!g.u(s) || s,
                            m = g.p(e),
                            O = function(B, N) {
                                var Z = g.w(i.$u ? Date.UTC(i.$y, N, B) : new Date(i.$y, N, B), i);
                                return c ? Z : Z.endOf(S)
                            },
                            Y = function(B, N) {
                                return g.w(i.toDate()[B].apply(i.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(N)), i)
                            },
                            H = this.$W,
                            L = this.$M,
                            I = this.$D,
                            P = "set" + (this.$u ? "UTC" : "");
                        switch (m) {
                            case d:
                                return c ? O(1, 0) : O(31, 11);
                            case f:
                                return c ? O(1, L) : O(0, L + 1);
                            case v:
                                var F = this.$locale().weekStart || 0,
                                    J = (H < F ? H + 7 : H) - F;
                                return O(c ? I - J : I + (6 - J), L);
                            case S:
                            case o:
                                return Y(P + "Hours", 0);
                            case y:
                                return Y(P + "Minutes", 1);
                            case x:
                                return Y(P + "Seconds", 2);
                            case D:
                                return Y(P + "Milliseconds", 3);
                            default:
                                return this.clone()
                        }
                    }, n.endOf = function(e) {
                        return this.startOf(e, !1)
                    }, n.$set = function(e, s) {
                        var i, c = g.p(e),
                            m = "set" + (this.$u ? "UTC" : ""),
                            O = (i = {}, i[S] = m + "Date", i[o] = m + "Date", i[f] = m + "Month", i[d] = m + "FullYear", i[y] = m + "Hours", i[x] = m + "Minutes", i[D] = m + "Seconds", i[W] = m + "Milliseconds", i)[c],
                            Y = c === S ? this.$D + (s - this.$W) : s;
                        if (c === f || c === d) {
                            var H = this.clone().set(o, 1);
                            H.$d[O](Y), H.init(), this.$d = H.set(o, Math.min(this.$D, H.daysInMonth())).$d
                        } else O && this.$d[O](Y);
                        return this.init(), this
                    }, n.set = function(e, s) {
                        return this.clone().$set(e, s)
                    }, n.get = function(e) {
                        return this[g.p(e)]()
                    }, n.add = function(e, s) {
                        var i, c = this;
                        e = Number(e);
                        var m = g.p(s),
                            O = function(L) {
                                var I = b(c);
                                return g.w(I.date(I.date() + Math.round(L * e)), c)
                            };
                        if (m === f) return this.set(f, this.$M + e);
                        if (m === d) return this.set(d, this.$y + e);
                        if (m === S) return O(1);
                        if (m === v) return O(7);
                        var Y = (i = {}, i[x] = $, i[y] = U, i[D] = a, i)[m] || 1,
                            H = this.$d.getTime() + e * Y;
                        return g.w(H, this)
                    }, n.subtract = function(e, s) {
                        return this.add(-1 * e, s)
                    }, n.format = function(e) {
                        var s = this,
                            i = this.$locale();
                        if (!this.isValid()) return i.invalidDate || t;
                        var c = e || "YYYY-MM-DDTHH:mm:ssZ",
                            m = g.z(this),
                            O = this.$H,
                            Y = this.$m,
                            H = this.$M,
                            L = i.weekdays,
                            I = i.months,
                            P = i.meridiem,
                            F = function(N, Z, E, V) {
                                return N && (N[Z] || N(s, c)) || E[Z].slice(0, V)
                            },
                            J = function(N) {
                                return g.s(O % 12 || 12, N, "0")
                            },
                            B = P || function(N, Z, E) {
                                var V = N < 12 ? "AM" : "PM";
                                return E ? V.toLowerCase() : V
                            };
                        return c.replace(w, function(N, Z) {
                            return Z || function(E) {
                                switch (E) {
                                    case "YY":
                                        return String(s.$y).slice(-2);
                                    case "YYYY":
                                        return g.s(s.$y, 4, "0");
                                    case "M":
                                        return H + 1;
                                    case "MM":
                                        return g.s(H + 1, 2, "0");
                                    case "MMM":
                                        return F(i.monthsShort, H, I, 3);
                                    case "MMMM":
                                        return F(I, H);
                                    case "D":
                                        return s.$D;
                                    case "DD":
                                        return g.s(s.$D, 2, "0");
                                    case "d":
                                        return String(s.$W);
                                    case "dd":
                                        return F(i.weekdaysMin, s.$W, L, 2);
                                    case "ddd":
                                        return F(i.weekdaysShort, s.$W, L, 3);
                                    case "dddd":
                                        return L[s.$W];
                                    case "H":
                                        return String(O);
                                    case "HH":
                                        return g.s(O, 2, "0");
                                    case "h":
                                        return J(1);
                                    case "hh":
                                        return J(2);
                                    case "a":
                                        return B(O, Y, !0);
                                    case "A":
                                        return B(O, Y, !1);
                                    case "m":
                                        return String(Y);
                                    case "mm":
                                        return g.s(Y, 2, "0");
                                    case "s":
                                        return String(s.$s);
                                    case "ss":
                                        return g.s(s.$s, 2, "0");
                                    case "SSS":
                                        return g.s(s.$ms, 3, "0");
                                    case "Z":
                                        return m
                                }
                                return null
                            }(N) || m.replace(":", "")
                        })
                    }, n.utcOffset = function() {
                        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                    }, n.diff = function(e, s, i) {
                        var c, m = this,
                            O = g.p(s),
                            Y = b(e),
                            H = (Y.utcOffset() - this.utcOffset()) * $,
                            L = this - Y,
                            I = function() {
                                return g.m(m, Y)
                            };
                        switch (O) {
                            case d:
                                c = I() / 12;
                                break;
                            case f:
                                c = I();
                                break;
                            case l:
                                c = I() / 3;
                                break;
                            case v:
                                c = (L - H) / 6048e5;
                                break;
                            case S:
                                c = (L - H) / 864e5;
                                break;
                            case y:
                                c = L / U;
                                break;
                            case x:
                                c = L / $;
                                break;
                            case D:
                                c = L / a;
                                break;
                            default:
                                c = L
                        }
                        return i ? c : g.a(c)
                    }, n.daysInMonth = function() {
                        return this.endOf(f).$D
                    }, n.$locale = function() {
                        return z[this.$L]
                    }, n.locale = function(e, s) {
                        if (!e) return this.$L;
                        var i = this.clone(),
                            c = C(e, s, !0);
                        return c && (i.$L = c), i
                    }, n.clone = function() {
                        return g.w(this.$d, this)
                    }, n.toDate = function() {
                        return new Date(this.valueOf())
                    }, n.toJSON = function() {
                        return this.isValid() ? this.toISOString() : null
                    }, n.toISOString = function() {
                        return this.$d.toISOString()
                    }, n.toString = function() {
                        return this.$d.toUTCString()
                    }, u
                }(),
                A = j.prototype;
            return b.prototype = A, [
                ["$ms", W],
                ["$s", D],
                ["$m", x],
                ["$H", y],
                ["$W", S],
                ["$M", f],
                ["$y", d],
                ["$D", o]
            ].forEach(function(u) {
                A[u[1]] = function(n) {
                    return this.$g(n, u[0], u[1])
                }
            }), b.extend = function(u, n) {
                return u.$i || (u(n, j, b), u.$i = !0), b
            }, b.locale = C, b.isDayjs = M, b.unix = function(u) {
                return b(1e3 * u)
            }, b.en = z[h], b.Ls = z, b.p = {}, b
        })
    });
    var st = Q((X, tt) => {
        (function(a, $) {
            typeof X == "object" && typeof tt < "u" ? tt.exports = $() : typeof define == "function" && define.amd ? define($) : (a = typeof globalThis < "u" ? globalThis : a || self).dayjs_plugin_utc = $()
        })(X, function() {
            "use strict";
            var a = "minute",
                $ = /[+-]\d\d(?::?\d\d)?/g,
                U = /([+-]|\d\d)/g;
            return function(W, D, x) {
                var y = D.prototype;
                x.utc = function(t) {
                    var r = {
                        date: t,
                        utc: !0,
                        args: arguments
                    };
                    return new D(r)
                }, y.utc = function(t) {
                    var r = x(this.toDate(), {
                        locale: this.$L,
                        utc: !0
                    });
                    return t ? r.add(this.utcOffset(), a) : r
                }, y.local = function() {
                    return x(this.toDate(), {
                        locale: this.$L,
                        utc: !1
                    })
                };
                var S = y.parse;
                y.parse = function(t) {
                    t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), S.call(this, t)
                };
                var v = y.init;
                y.init = function() {
                    if (this.$u) {
                        var t = this.$d;
                        this.$y = t.getUTCFullYear(), this.$M = t.getUTCMonth(), this.$D = t.getUTCDate(), this.$W = t.getUTCDay(), this.$H = t.getUTCHours(), this.$m = t.getUTCMinutes(), this.$s = t.getUTCSeconds(), this.$ms = t.getUTCMilliseconds()
                    } else v.call(this)
                };
                var f = y.utcOffset;
                y.utcOffset = function(t, r) {
                    var w = this.$utils().u;
                    if (w(t)) return this.$u ? 0 : w(this.$offset) ? f.call(this) : this.$offset;
                    if (typeof t == "string" && (t = function(h) {
                            h === void 0 && (h = "");
                            var z = h.match($);
                            if (!z) return null;
                            var k = ("" + z[0]).match(U) || ["-", 0, 0],
                                M = k[0],
                                C = 60 * +k[1] + +k[2];
                            return C === 0 ? 0 : M === "+" ? C : -C
                        }(t), t === null)) return this;
                    var T = Math.abs(t) <= 16 ? 60 * t : t,
                        p = this;
                    if (r) return p.$offset = T, p.$u = t === 0, p;
                    if (t !== 0) {
                        var _ = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                        (p = this.local().add(T + _, a)).$offset = T, p.$x.$localOffset = _
                    } else p = this.utc();
                    return p
                };
                var l = y.format;
                y.format = function(t) {
                    var r = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                    return l.call(this, r)
                }, y.valueOf = function() {
                    var t = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                    return this.$d.valueOf() - 6e4 * t
                }, y.isUTC = function() {
                    return !!this.$u
                }, y.toISOString = function() {
                    return this.toDate().toISOString()
                }, y.toString = function() {
                    return this.toDate().toUTCString()
                };
                var d = y.toDate;
                y.toDate = function(t) {
                    return t === "s" && this.$offset ? x(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this)
                };
                var o = y.diff;
                y.diff = function(t, r, w) {
                    if (t && this.$u === t.$u) return o.call(this, t, r, w);
                    var T = this.local(),
                        p = x(t).local();
                    return o.call(T, p, r, w)
                }
            }
        })
    });
    var rt = Q((et, nt) => {
        (function(a, $) {
            typeof et == "object" && typeof nt < "u" ? nt.exports = $() : typeof define == "function" && define.amd ? define($) : (a = typeof globalThis < "u" ? globalThis : a || self).dayjs_plugin_timezone = $()
        })(et, function() {
            "use strict";
            var a = {
                    year: 0,
                    month: 1,
                    day: 2,
                    hour: 3,
                    minute: 4,
                    second: 5
                },
                $ = {};
            return function(U, W, D) {
                var x, y = function(l, d, o) {
                        o === void 0 && (o = {});
                        var t = new Date(l),
                            r = function(w, T) {
                                T === void 0 && (T = {});
                                var p = T.timeZoneName || "short",
                                    _ = w + "|" + p,
                                    h = $[_];
                                return h || (h = new Intl.DateTimeFormat("en-US", {
                                    hour12: !1,
                                    timeZone: w,
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    timeZoneName: p
                                }), $[_] = h), h
                            }(d, o);
                        return r.formatToParts(t)
                    },
                    S = function(l, d) {
                        for (var o = y(l, d), t = [], r = 0; r < o.length; r += 1) {
                            var w = o[r],
                                T = w.type,
                                p = w.value,
                                _ = a[T];
                            _ >= 0 && (t[_] = parseInt(p, 10))
                        }
                        var h = t[3],
                            z = h === 24 ? 0 : h,
                            k = t[0] + "-" + t[1] + "-" + t[2] + " " + z + ":" + t[4] + ":" + t[5] + ":000",
                            M = +l;
                        return (D.utc(k).valueOf() - (M -= M % 1e3)) / 6e4
                    },
                    v = W.prototype;
                v.tz = function(l, d) {
                    l === void 0 && (l = x);
                    var o, t = this.utcOffset(),
                        r = this.toDate(),
                        w = r.toLocaleString("en-US", {
                            timeZone: l
                        }),
                        T = Math.round((r - new Date(w)) / 1e3 / 60),
                        p = 15 * -Math.round(r.getTimezoneOffset() / 15) - T;
                    if (!Number(p)) o = this.utcOffset(0, d);
                    else if (o = D(w, {
                            locale: this.$L
                        }).$set("millisecond", this.$ms).utcOffset(p, !0), d) {
                        var _ = o.utcOffset();
                        o = o.add(t - _, "minute")
                    }
                    return o.$x.$timezone = l, o
                }, v.offsetName = function(l) {
                    var d = this.$x.$timezone || D.tz.guess(),
                        o = y(this.valueOf(), d, {
                            timeZoneName: l
                        }).find(function(t) {
                            return t.type.toLowerCase() === "timezonename"
                        });
                    return o && o.value
                };
                var f = v.startOf;
                v.startOf = function(l, d) {
                    if (!this.$x || !this.$x.$timezone) return f.call(this, l, d);
                    var o = D(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                        locale: this.$L
                    });
                    return f.call(o, l, d).tz(this.$x.$timezone, !0)
                }, D.tz = function(l, d, o) {
                    var t = o && d,
                        r = o || d || x,
                        w = S(+D(), r);
                    if (typeof l != "string") return D(l).tz(r);
                    var T = function(z, k, M) {
                            var C = z - 60 * k * 1e3,
                                b = S(C, M);
                            if (k === b) return [C, k];
                            var g = S(C -= 60 * (b - k) * 1e3, M);
                            return b === g ? [C, b] : [z - 60 * Math.min(b, g) * 1e3, Math.max(b, g)]
                        }(D.utc(l, t).valueOf(), w, r),
                        p = T[0],
                        _ = T[1],
                        h = D(p).utcOffset(_);
                    return h.$x.$timezone = r, h
                }, D.tz.guess = function() {
                    return Intl.DateTimeFormat().resolvedOptions().timeZone
                }, D.tz.setDefault = function(l) {
                    x = l
                }
            }
        })
    });
    var q = G(at()),
        ot = G(st()),
        ut = G(rt());
    q.default.extend(ot.default);
    q.default.extend(ut.default);
    jQuery(function(a) {
        a(".simcal-default-calendar").each(function(S, v) {
            var f = a(v),
                l = f.data("calendar-id"),
                d = f.data("offset"),
                o = f.data("events-first"),
                t = f.data("calendar-end"),
                r = f.find(".simcal-calendar-head"),
                w = r.find(".simcal-nav-button"),
                T = f.find(".simcal-ajax-loader"),
                p = r.find(".simcal-current"),
                _ = p.data("calendar-current"),
                h = p.find("span.simcal-current-month"),
                z = p.find("span.simcal-current-year"),
                k = (0, q.default)(_ * 1e3).tz(f.data("timezone")),
                M, C;
            f.hasClass("simcal-default-calendar-grid") ? (C = "simcal_default_calendar_draw_grid", M = new Date(k.year(), k.month()), $(w, M.getTime() / 1e3, o, t)) : (C = "simcal_default_calendar_draw_list", U(w, f, o, t, !1, _), W(f)), w.on("click", function() {
                var b = a(this).hasClass("simcal-next") ? "next" : "prev";
                if (C == "simcal_default_calendar_draw_grid") {
                    var g = f.find(".simcal-month"),
                        j, A, u;
                    b == "prev" ? j = new Date(M.setMonth(M.getMonth() - 1, 1)) : (j = new Date(M.setMonth(M.getMonth() + 2, 1)), j.setDate(0), j.setHours(23), j.setMinutes(59), j.setSeconds(59)), A = j.getMonth(), u = j.getFullYear(), a.ajax({
                        url: simcal_default_calendar.ajax_url,
                        type: "POST",
                        dataType: "json",
                        cache: !1,
                        data: {
                            action: C,
                            month: A + 1,
                            year: u,
                            id: l
                        },
                        beforeSend: function() {
                            T.fadeToggle()
                        },
                        success: function(c) {
                            h.text(simcal_default_calendar.months.full[A]), z.text(u), p.attr("data-calendar-current", j.getTime() / 1e3 + d + 1), $(w, j.getTime() / 1e3, o, t), T.fadeToggle(), M = j, g.replaceWith(c.data), x(f, n), y()
                        },
                        error: function(c) {
                            console.log(c)
                        }
                    })
                } else {
                    var n = f.find(".simcal-events-list-container"),
                        e = n.data("prev"),
                        s = n.data("next"),
                        i = b == "prev" ? e : s;
                    a.ajax({
                        url: simcal_default_calendar.ajax_url,
                        type: "POST",
                        dataType: "json",
                        cache: !1,
                        data: {
                            action: C,
                            ts: i,
                            id: l
                        },
                        beforeSend: function() {
                            T.fadeToggle()
                        },
                        success: function(c) {
                            n.replaceWith(c.data), p.attr("data-calendar-current", i), W(f), U(w, f, o, t, b, i), T.fadeToggle(), y()
                        },
                        error: function(c) {
                            console.log(c)
                        }
                    })
                }
            })
        });

        function $(S, v, f, l) {
            S.each(function(d, o) {
                var t = a(o),
                    r = new Date(v * 1e3);
                t.hasClass("simcal-prev") ? (r = new Date(r.setMonth(r.getMonth(), 1)), r.setDate(0), r.getTime() / 1e3 <= f ? t.attr("disabled", "disabled") : t.removeAttr("disabled")) : (r = new Date(r.setMonth(r.getMonth() + 1, 1)), r.setDate(0), r.setHours(23), r.setMinutes(59), r.setSeconds(59), r.getTime() / 1e3 >= l ? t.attr("disabled", "disabled") : t.removeAttr("disabled"))
            })
        }

        function U(S, v, f, l, d, o) {
            var t = v.find(".simcal-events-list-container"),
                r = t.data("prev"),
                w = t.data("next"),
                T = t.find("li.simcal-event:last").data("start");
            S.each(function(p, _) {
                var h = a(_);
                d ? h.hasClass("simcal-prev") ? d == "prev" ? r <= f && o <= f && h.attr("disabled", "disabled") : h.removeAttr("disabled") : h.hasClass("simcal-next") && (d == "next" ? (w >= l && o >= l || T >= l) && h.attr("disabled", "disabled") : h.removeAttr("disabled")) : h.hasClass("simcal-prev") ? r <= f && o <= f && h.attr("disabled", "disabled") : h.hasClass("simcal-next") && (w >= l && o >= l || T >= l) && h.attr("disabled", "disabled")
            })
        }

        function W(S) {
            var v = a(S).find(".simcal-current"),
                f = a(S).find(".simcal-events-list-container"),
                l = f.data("heading-small"),
                d = f.data("heading-large"),
                o = a("<h3 />");
            S.width() < 400 ? o.text(l) : o.text(d), v.html(o)
        }
        var D = a(".simcal-default-calendar-grid");

        function x(S) {
            var v = a(S).find("> table"),
                f = v.find("thead"),
                l = f.find("th.simcal-week-day"),
                d = v.find("td.simcal-day > div"),
                o = v.find("ul.simcal-events"),
                t = o.find("> li > .simcal-event-title"),
                r = v.find(".simcal-events-toggle"),
                w = v.find("span.simcal-events-dots"),
                T = v.find(".simcal-tooltip-content"),
                p = v.find(".simcal-event-toggled"),
                _ = v.data("event-bubble-trigger"),
                h = d.first().width();
            if (h < 60) {
                l.each(function(k, M) {
                    a(M).text(a(M).data("screen-small"))
                }), o.hide(), t.hide(), r != "undefined" && (r.hide(), p != "undefined" && p.show()), w.show(), _ = "click";
                var z = h - 10 + "px";
                d.css("min-height", z), v.find("span.simcal-events-dots:not(:empty)").css("min-height", z)
            } else h <= 240 ? l.each(function(k, M) {
                a(M).text(a(M).data("screen-medium"))
            }) : l.each(function(k, M) {
                a(M).text(a(M).data("screen-large"))
            }), o.show(), t.show(), r != "undefined" && (r.show(), p != "undefined" && p.hide()), w.hide(), d.css("min-height", h + "px");
            d.each(function(k, M) {
                var C = a(M).find("span.simcal-events-dots"),
                    b = a(M).find(".simcal-tooltip"),
                    g, j, A;
                h < 60 ? (T.show(), g = C) : (T.hide(), g = b), g.each(function(u, n) {
                    a(n).qtip({
                        content: h < 60 ? a(M).find("ul.simcal-events") : a(n).find("> .simcal-tooltip-content"),
                        position: {
                            my: "top center",
                            at: "bottom center",
                            target: a(n),
                            viewport: h < 60 ? a(window) : !0,
                            adjust: {
                                method: "shift",
                                scroll: !1
                            }
                        },
                        style: {
                            def: !1,
                            classes: "simcal-default-calendar simcal-event-bubble"
                        },
                        show: {
                            solo: !0,
                            effect: !1,
                            event: _ == "hover" ? "mouseenter" : "click"
                        },
                        hide: {
                            fixed: !0,
                            effect: !1,
                            event: _ == "click" ? "unfocus" : "mouseleave",
                            delay: 100
                        },
                        events: {
                            show: function(e, s) {
                                A && A.id && A.id != s.id && A.hide(), A = s
                            }
                        },
                        overwrite: !1
                    })
                })
            })
        }
        D.each(function(S, v) {
            x(v), a(v).on("change", function() {
                x(this)
            })
        }), window.onresize = function() {
            D.each(function(S, v) {
                x(v)
            })
        }, a("#print-calendar-button").on("click", function() {
            var S = a(".simcal-calendar").clone(!0);
            a("body").children().hide(), a("body").append(S), a("body").addClass("simcal-print-calendar"), window.print(), a("body > .simcal-calendar").remove(), a("body").children().not("script").show(), a("body").removeClass("simcal-print-calendar")
        });

        function y() {
            a(".simcal-events-toggle").each(function(S, v) {
                var f = a(v).prev(".simcal-events"),
                    l = f.find(".simcal-event-toggled"),
                    d = a(v).find("i");
                a(v).on("click", function() {
                    d.toggleClass("simcal-icon-rotate-180"), l.slideToggle()
                })
            })
        }
        y()
    });
})();
//# sourceMappingURL=default-calendar.min.js.map

;
/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

! function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                n = i[e] = i[e] || [];
            return -1 == n.indexOf(t) && n.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return -1 != n && i.splice(n, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            t = t || [];
            for (var r = this._onceEvents && this._onceEvents[e]; o;) {
                var s = r && r[o];
                s && (this.off(e, o), delete r[o]), o.apply(this, t), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t.allOff = t.removeAllListeners = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        var t = [];
        if (Array.isArray(e)) t = e;
        else if ("number" == typeof e.length)
            for (var i = 0; i < e.length; i++) t.push(e[i]);
        else t.push(e);
        return t
    }

    function o(e, t, r) {
        return this instanceof o ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = n(e), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
            this.check()
        }.bind(this))) : new o(e, t, r)
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }
    var h = e.jQuery,
        a = e.console;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(e) {
        var t = getComputedStyle(e);
        if (t)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
            }
    }, o.prototype.addImage = function(e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function(e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function() {
        function e(e, i, n) {
            setTimeout(function() {
                t.progress(e, i, n)
            })
        }
        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function(e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function() {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function(t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function(e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});;
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    },
    easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a
    },
    easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },
    easeInOutQuad: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    },
    easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },
    easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },
    easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    },
    easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    },
    easeInOutQuart: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    },
    easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    },
    easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    },
    easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    },
    easeInSine: function(e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    },
    easeOutSine: function(e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    },
    easeInOutSine: function(e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    },
    easeInExpo: function(e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    },
    easeOutExpo: function(e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    },
    easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    },
    easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },
    easeInOutCirc: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    },
    easeInElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    },
    easeOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    },
    easeInOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    },
    easeInBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },
    easeInOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    },
    easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    },
    easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    },
    easeInOutBounce: function(e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});

;
/*! 
 * Master Slider – Responsive Touch Swipe Slider [lite version]
 * Copyright © 2022 All Rights Reserved. 
 *
 * @author Averta [www.averta.net]
 * @version 2.85.13
 * @date Feb 2022
 */
window.averta = {},
    function($) {
        function getVendorPrefix() {
            if ("result" in arguments.callee) return arguments.callee.result;
            var regex = /^(Moz|Khtml|O|ms|Icab)(?=[A-Z])/,
                webKitOnly = /^(Webkit|webkit)(?=[A-Z])/,
                someScript = document.getElementsByTagName("script")[0];
            for (var prop in someScript.style)
                if (webKitOnly.test(prop)) return arguments.callee.result = "Webkit";
            for (var prop in someScript.style)
                if (regex.test(prop)) return arguments.callee.result = prop.match(regex)[0];
            return arguments.callee.result = "WebkitOpacity" in someScript.style ? "Webkit" : "KhtmlOpacity" in someScript.style ? "Khtml" : ""
        }

        function checkStyleValue(prop) {
            var b = document.body || document.documentElement,
                s = b.style,
                p = prop;
            if ("string" == typeof s[p]) return !0;
            v = ["Moz", "Webkit", "Khtml", "O", "ms"], p = p.charAt(0).toUpperCase() + p.substr(1);
            for (var i = 0; i < v.length; i++)
                if ("string" == typeof s[v[i] + p]) return !0;
            return !1
        }

        function supportsTransitions() {
            return checkStyleValue("transition")
        }

        function supportsTransforms() {
            return checkStyleValue("transform")
        }

        function supports3DTransforms() {
            if (!supportsTransforms()) return !1;
            var has3d, el = document.createElement("i"),
                transforms = {
                    WebkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    MSTransform: "-ms-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    Transform: "transform",
                    transform: "transform"
                };
            el.style.display = "block", document.body.insertBefore(el, null);
            for (var t in transforms) void 0 !== el.style[t] && (el.style[t] = "translate3d(1px,1px,1px)", has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]));
            return document.body.removeChild(el), null != has3d && has3d.length > 0 && "none" !== has3d
        }
        window["package"] = function(name) {
            window[name] || (window[name] = {})
        };
        var extend = function(target, object) {
            for (var key in object) target[key] = object[key]
        };
        Function.prototype.extend = function(superclass) {
            "function" == typeof superclass.prototype.constructor ? (extend(this.prototype, superclass.prototype), this.prototype.constructor = this) : (this.prototype.extend(superclass), this.prototype.constructor = this)
        };
        var trans = {
            Moz: "-moz-",
            Webkit: "-webkit-",
            Khtml: "-khtml-",
            O: "-o-",
            ms: "-ms-",
            Icab: "-icab-"
        };
        window._mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), window._touch = "ontouchstart" in document, $(document).ready(function() {
            window._jcsspfx = getVendorPrefix(), window._csspfx = trans[window._jcsspfx], window._cssanim = supportsTransitions(), window._css3d = supports3DTransforms(), window._css2d = supportsTransforms()
        }), window.parseQueryString = function(url) {
            var queryString = {};
            return url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) {
                queryString[$1] = $3
            }), queryString
        };
        var fps60 = 50 / 3;
        if (window.requestAnimationFrame || (window.requestAnimationFrame = function() {
                return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                    window.setTimeout(callback, fps60)
                }
            }()), window.getComputedStyle || (window.getComputedStyle = function(el) {
                return this.el = el, this.getPropertyValue = function(prop) {
                    var re = /(\-([a-z]){1})/g;
                    return "float" == prop && (prop = "styleFloat"), re.test(prop) && (prop = prop.replace(re, function() {
                        return arguments[2].toUpperCase()
                    })), el.currentStyle[prop] ? el.currentStyle[prop] : null
                }, el.currentStyle
            }), Array.prototype.indexOf || (Array.prototype.indexOf = function(elt) {
                var len = this.length >>> 0,
                    from = Number(arguments[1]) || 0;
                for (from = 0 > from ? Math.ceil(from) : Math.floor(from), 0 > from && (from += len); len > from; from++)
                    if (from in this && this[from] === elt) return from;
                return -1
            }), window.isMSIE = function(version) {
                if (!window.MSBrowserInfo.msie) return !1;
                if (!version) return !0;
                var ieVer = window.MSBrowserInfo.version.slice(0, window.MSBrowserInfo.version.indexOf("."));
                return "string" == typeof version ? eval(-1 !== version.indexOf("<") || -1 !== version.indexOf(">") ? ieVer + version : version + "==" + ieVer) : version == ieVer
            }, $.removeDataAttrs = function($target, exclude) {
                var i, attrName, dataAttrsToDelete = [],
                    dataAttrs = $target[0].attributes,
                    dataAttrsLen = dataAttrs.length;
                for (exclude = exclude || [], i = 0; dataAttrsLen > i; i++) attrName = dataAttrs[i].name, "data-" === attrName.substring(0, 5) && -1 === exclude.indexOf(attrName) && dataAttrsToDelete.push(dataAttrs[i].name);
                $.each(dataAttrsToDelete, function(index, attrName) {
                    $target.removeAttr(attrName)
                })
            }, jQuery) {
            $.jqLoadFix = function() {
                if (this.complete) {
                    var that = this;
                    setTimeout(function() {
                        $(that).trigger("load")
                    }, 1)
                }
            }, jQuery.uaMatch = jQuery.uaMatch || function(ua) {
                ua = ua.toLowerCase();
                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                }
            }, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, browser.version = matched.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0);
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            isIE11 && (browser.msie = "true", delete browser.mozilla), window.MSBrowserInfo = browser, $.fn.preloadImg = function(src, _event) {
                return this.each(function() {
                    var $this = $(this),
                        self = this,
                        img = new Image;
                    img.onload = function(event) {
                        null == event && (event = {}), $this.attr("src", src), event.width = img.width, event.height = img.height, $this.data("width", img.width), $this.data("height", img.height), setTimeout(function() {
                            _event.call(self, event)
                        }, 50), img = null
                    }, img.src = src
                }), this
            }
        }
    }(jQuery),
    function() {
        "use strict";
        averta.EventDispatcher = function() {
            this.listeners = {}
        }, averta.EventDispatcher.extend = function(_proto) {
            var instance = new averta.EventDispatcher;
            for (var key in instance) "constructor" != key && (_proto[key] = averta.EventDispatcher.prototype[key])
        }, averta.EventDispatcher.prototype = {
            constructor: averta.EventDispatcher,
            addEventListener: function(event, listener, ref) {
                this.listeners[event] || (this.listeners[event] = []), this.listeners[event].push({
                    listener: listener,
                    ref: ref
                })
            },
            removeEventListener: function(event, listener, ref) {
                if (this.listeners[event]) {
                    for (var i = 0; i < this.listeners[event].length; ++i) listener === this.listeners[event][i].listener && ref === this.listeners[event][i].ref && this.listeners[event].splice(i--, 1);
                    0 === this.listeners[event].length && (this.listeners[event] = null)
                }
            },
            dispatchEvent: function(event) {
                if (event.target = this, this.listeners[event.type])
                    for (var i = 0, l = this.listeners[event.type].length; l > i; ++i) this.listeners[event.type][i].listener.call(this.listeners[event.type][i].ref, event)
            }
        }
    }(),
    function($) {
        "use strict";
        var isTouch = "ontouchstart" in document,
            isPointer = window.navigator.pointerEnabled,
            isMSPoiner = !isPointer && window.navigator.msPointerEnabled,
            usePointer = isPointer || isMSPoiner,
            ev_start = (isPointer ? "pointerdown " : "") + (isMSPoiner ? "MSPointerDown " : "") + (isTouch ? "touchstart " : "") + "mousedown",
            ev_move = (isPointer ? "pointermove " : "") + (isMSPoiner ? "MSPointerMove " : "") + (isTouch ? "touchmove " : "") + "mousemove",
            ev_end = (isPointer ? "pointerup " : "") + (isMSPoiner ? "MSPointerUp " : "") + (isTouch ? "touchend " : "") + "mouseup",
            ev_cancel = (isPointer ? "pointercancel " : "") + (isMSPoiner ? "MSPointerCancel " : "") + "touchcancel";
        averta.TouchSwipe = function($element) {
            this.$element = $element, this.enabled = !0, $element.on(ev_start, {
                target: this
            }, this.__touchStart), $element[0].swipe = this, this.onSwipe = null, this.swipeType = "horizontal", this.noSwipeSelector = "input, textarea, button, .no-swipe, .ms-no-swipe", this.lastStatus = {}
        };
        var p = averta.TouchSwipe.prototype;
        p.getDirection = function(new_x, new_y) {
            switch (this.swipeType) {
                case "horizontal":
                    return new_x <= this.start_x ? "left" : "right";
                case "vertical":
                    return new_y <= this.start_y ? "up" : "down";
                case "all":
                    return Math.abs(new_x - this.start_x) > Math.abs(new_y - this.start_y) ? new_x <= this.start_x ? "left" : "right" : new_y <= this.start_y ? "up" : "down"
            }
        }, p.priventDefultEvent = function(new_x, new_y) {
            var dx = Math.abs(new_x - this.start_x),
                dy = Math.abs(new_y - this.start_y),
                horiz = dx > dy;
            return "horizontal" === this.swipeType && horiz || "vertical" === this.swipeType && !horiz
        }, p.createStatusObject = function(evt) {
            var temp_x, temp_y, status_data = {};
            return temp_x = this.lastStatus.distanceX || 0, temp_y = this.lastStatus.distanceY || 0, status_data.distanceX = evt.pageX - this.start_x, status_data.distanceY = evt.pageY - this.start_y, status_data.moveX = status_data.distanceX - temp_x, status_data.moveY = status_data.distanceY - temp_y, status_data.distance = parseInt(Math.sqrt(Math.pow(status_data.distanceX, 2) + Math.pow(status_data.distanceY, 2))), status_data.duration = (new Date).getTime() - this.start_time, status_data.direction = this.getDirection(evt.pageX, evt.pageY), status_data
        }, p.__reset = function(event, jqevt) {
            this.reset = !1, this.lastStatus = {}, this.start_time = (new Date).getTime();
            var point = this.__getPoint(event, jqevt);
            this.start_x = point.pageX, this.start_y = point.pageY
        }, p.__touchStart = function(event) {
            var swipe = event.data.target,
                jqevt = event;
            if (swipe.enabled && !($(event.target).closest(swipe.noSwipeSelector, swipe.$element).length > 0)) {
                if (event = event.originalEvent, usePointer && $(this).css("-ms-touch-action", "horizontal" === swipe.swipeType ? "pan-y" : "pan-x"), !swipe.onSwipe) return void $.error("Swipe listener is undefined");
                if (!(swipe.touchStarted || isTouch && swipe.start_time && "mousedown" === event.type && (new Date).getTime() - swipe.start_time < 600)) {
                    var point = swipe.__getPoint(event, jqevt);
                    swipe.start_x = point.pageX, swipe.start_y = point.pageY, swipe.start_time = (new Date).getTime(), $(document).on(ev_end, {
                        target: swipe
                    }, swipe.__touchEnd).on(ev_move, {
                        target: swipe
                    }, swipe.__touchMove).on(ev_cancel, {
                        target: swipe
                    }, swipe.__touchCancel);
                    var status = swipe.createStatusObject(point);
                    status.phase = "start", swipe.onSwipe.call(null, status), isTouch || jqevt.preventDefault(), swipe.lastStatus = status, swipe.touchStarted = !0
                }
            }
        }, p.__touchMove = function(event) {
            var swipe = event.data.target,
                jqevt = event;
            if (event = event.originalEvent, swipe.touchStarted) {
                clearTimeout(swipe.timo), swipe.timo = setTimeout(function() {
                    swipe.__reset(event, jqevt)
                }, 60);
                var point = swipe.__getPoint(event, jqevt),
                    status = swipe.createStatusObject(point);
                swipe.priventDefultEvent(point.pageX, point.pageY) && jqevt.preventDefault(), status.phase = "move", swipe.lastStatus = status, swipe.onSwipe.call(null, status)
            }
        }, p.__touchEnd = function(event) {
            var swipe = event.data.target,
                jqevt = event;
            event = event.originalEvent, clearTimeout(swipe.timo);
            var status = swipe.lastStatus;
            isTouch || jqevt.preventDefault(), status.phase = "end", swipe.touchStarted = !1, swipe.priventEvt = null, $(document).off(ev_end, swipe.__touchEnd).off(ev_move, swipe.__touchMove).off(ev_cancel, swipe.__touchCancel), status.speed = status.distance / status.duration, swipe.onSwipe.call(null, status)
        }, p.__touchCancel = function(event) {
            var swipe = event.data.target;
            swipe.__touchEnd(event)
        }, p.__getPoint = function(event, jqEvent) {
            return isTouch && -1 === event.type.indexOf("mouse") ? event.touches[0] : usePointer ? event : jqEvent
        }, p.enable = function() {
            this.enabled || (this.enabled = !0)
        }, p.disable = function() {
            this.enabled && (this.enabled = !1)
        }
    }(jQuery),
    function() {
        "use strict";
        averta.Ticker = function() {};
        var st = averta.Ticker,
            list = [],
            len = 0,
            __stopped = !0;
        st.add = function(listener, ref) {
            return list.push([listener, ref]), 1 === list.length && st.start(), len = list.length
        }, st.remove = function(listener, ref) {
            for (var i = 0, l = list.length; l > i; ++i) list[i] && list[i][0] === listener && list[i][1] === ref && list.splice(i, 1);
            len = list.length, 0 === len && st.stop()
        }, st.start = function() {
            __stopped && (__stopped = !1, __tick())
        }, st.stop = function() {
            __stopped = !0
        };
        var __tick = function() {
            if (!st.__stopped) {
                for (var item, i = 0; i !== len; i++) item = list[i], item[0].call(item[1]);
                requestAnimationFrame(__tick)
            }
        }
    }(),
    function() {
        "use strict";
        Date.now || (Date.now = function() {
            return (new Date).getTime()
        }), averta.Timer = function(delay, autoStart) {
            this.delay = delay, this.currentCount = 0, this.paused = !1, this.onTimer = null, this.refrence = null, autoStart && this.start()
        }, averta.Timer.prototype = {
            constructor: averta.Timer,
            start: function() {
                this.paused = !1, this.lastTime = Date.now(), averta.Ticker.add(this.update, this)
            },
            stop: function() {
                this.paused = !0, averta.Ticker.remove(this.update, this)
            },
            reset: function() {
                this.currentCount = 0, this.paused = !0, this.lastTime = Date.now()
            },
            update: function() {
                this.paused || Date.now() - this.lastTime < this.delay || (this.currentCount++, this.lastTime = Date.now(), this.onTimer && this.onTimer.call(this.refrence, this.getTime()))
            },
            getTime: function() {
                return this.delay * this.currentCount
            }
        }
    }(),
    function() {
        "use strict";
        window.CSSTween = function(element, duration, delay, ease) {
            this.$element = element, this.duration = duration || 1e3, this.delay = delay || 0, this.ease = ease || "linear"
        };
        var p = CSSTween.prototype;
        p.to = function(callback, target) {
            return this.to_cb = callback, this.to_cb_target = target, this
        }, p.from = function(callback, target) {
            return this.fr_cb = callback, this.fr_cb_target = target, this
        }, p.onComplete = function(callback, target) {
            return this.oc_fb = callback, this.oc_fb_target = target, this
        }, p.chain = function(csstween) {
            return this.chained_tween = csstween, this
        }, p.reset = function() {
            clearTimeout(this.start_to), clearTimeout(this.end_to)
        }, p.start = function() {
            var element = this.$element[0];
            clearTimeout(this.start_to), clearTimeout(this.end_to), this.fresh = !0, this.fr_cb && (element.style[window._jcsspfx + "TransitionDuration"] = "0ms", this.fr_cb.call(this.fr_cb_target));
            var that = this;
            return this.onTransComplete = function() {
                that.fresh && (that.reset(), element.style[window._jcsspfx + "TransitionDuration"] = "", element.style[window._jcsspfx + "TransitionProperty"] = "", element.style[window._jcsspfx + "TransitionTimingFunction"] = "", element.style[window._jcsspfx + "TransitionDelay"] = "", that.fresh = !1, that.chained_tween && that.chained_tween.start(), that.oc_fb && that.oc_fb.call(that.oc_fb_target))
            }, this.start_to = setTimeout(function() {
                that.$element && (element.style[window._jcsspfx + "TransitionDuration"] = that.duration + "ms", element.style[window._jcsspfx + "TransitionProperty"] = that.transProperty || "all", element.style[window._jcsspfx + "TransitionDelay"] = that.delay > 0 ? that.delay + "ms" : "", element.style[window._jcsspfx + "TransitionTimingFunction"] = that.ease, that.to_cb && that.to_cb.call(that.to_cb_target), that.end_to = setTimeout(function() {
                    that.onTransComplete()
                }, that.duration + (that.delay || 0)))
            }, 1), this
        }
    }(),
    function() {
        "use strict";

        function transPos(element, properties) {
            if (void 0 !== properties.x || void 0 !== properties.y)
                if (_cssanim) {
                    var trans = window._jcsspfx + "Transform";
                    void 0 !== properties.x && (properties[trans] = (properties[trans] || "") + " translateX(" + properties.x + "px)", delete properties.x), void 0 !== properties.y && (properties[trans] = (properties[trans] || "") + " translateY(" + properties.y + "px)", delete properties.y)
                } else {
                    if (void 0 !== properties.x) {
                        var posx = "auto" !== element.css("right") ? "right" : "left";
                        properties[posx] = properties.x + "px", delete properties.x
                    }
                    if (void 0 !== properties.y) {
                        var posy = "auto" !== element.css("bottom") ? "bottom" : "top";
                        properties[posy] = properties.y + "px", delete properties.y
                    }
                }
            return properties
        }
        var _cssanim = null;
        window.CTween = {}, CTween.setPos = function(element, pos) {
            element.css(transPos(element, pos))
        }, CTween.animate = function(element, duration, properties, options) {
            if (null == _cssanim && (_cssanim = window._cssanim), options = options || {}, transPos(element, properties), _cssanim) {
                var tween = new CSSTween(element, duration, options.delay, EaseDic[options.ease]);
                return options.transProperty && (tween.transProperty = options.transProperty), tween.to(function() {
                    element.css(properties)
                }), options.complete && tween.onComplete(options.complete, options.target), tween.start(), tween.stop = tween.reset, tween
            }
            var onCl;
            return options.delay && element.delay(options.delay), options.complete && (onCl = function() {
                options.complete.call(options.target)
            }), element.stop(!0).animate(properties, duration, options.ease || "linear", onCl), element
        }, CTween.fadeOut = function(target, duration, remove) {
            var options = {};
            remove === !0 ? options.complete = function() {
                target.remove()
            } : 2 === remove && (options.complete = function() {
                target.css("display", "none")
            }), CTween.animate(target, duration || 1e3, {
                opacity: 0
            }, options)
        }, CTween.fadeIn = function(target, duration, reset) {
            reset !== !1 && target.css("opacity", 0).css("display", ""), CTween.animate(target, duration || 1e3, {
                opacity: 1
            })
        }
    }(),
    function() {
        window.EaseDic = {
            linear: "linear",
            ease: "ease",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out",
            easeInCubic: "cubic-bezier(.55,.055,.675,.19)",
            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
            easeInOutExpo: "cubic-bezier(1,0,0,1)",
            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
            easeInSine: "cubic-bezier(.47,0,.745,.715)",
            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        }
    }(),
    function() {
        "use strict";
        window.MSAligner = function(type, $container, $img) {
            this.$container = $container, this.$img = $img, this.type = type || "stretch", this.widthOnly = !1, this.heightOnly = !1
        };
        var p = MSAligner.prototype;
        p.init = function(w, h) {
            switch (this.baseWidth = w, this.baseHeight = h, this.imgRatio = w / h, this.imgRatio2 = h / w, this.type) {
                case "tile":
                    this.$container.css("background-image", "url(" + this.$img.attr("src") + ")"), this.$img.remove();
                    break;
                case "center":
                    this.$container.css("background-image", "url(" + this.$img.attr("src") + ")"), this.$container.css({
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat"
                    }), this.$img.remove();
                    break;
                case "stretch":
                    this.$img.css({
                        width: "100%",
                        height: "100%"
                    });
                    break;
                case "fill":
                case "fit":
                    this.needAlign = !0, this.align()
            }
        }, p.align = function() {
            if (this.needAlign) {
                var cont_w = this.$container[0].offsetWidth,
                    cont_h = this.$container[0].offsetHeight,
                    contRatio = cont_w / cont_h;
                "fill" == this.type ? this.imgRatio < contRatio ? (this.$img.width(cont_w), this.$img.height(cont_w * this.imgRatio2)) : (this.$img.height(cont_h), this.$img.width(cont_h * this.imgRatio)) : "fit" == this.type && (this.imgRatio < contRatio ? (this.$img.height(cont_h), this.$img.width(cont_h * this.imgRatio)) : (this.$img.width(cont_w), this.$img.height(cont_w * this.imgRatio2))), this.setMargin()
            }
        }, p.setMargin = function() {
            var cont_w = this.$container[0].offsetWidth,
                cont_h = this.$container[0].offsetHeight;
            this.$img.css("margin-top", (cont_h - this.$img[0].offsetHeight) / 2 + "px"), this.$img.css("margin-left", (cont_w - this.$img[0].offsetWidth) / 2 + "px")
        }
    }(),
    function() {
        "use strict";
        var _options = {
                bouncing: !0,
                snapping: !1,
                snapsize: null,
                friction: .05,
                outFriction: .05,
                outAcceleration: .09,
                minValidDist: .3,
                snappingMinSpeed: 2,
                paging: !1,
                endless: !1,
                maxSpeed: 160
            },
            Controller = function(min, max, options) {
                if (null === max || null === min) throw new Error("Max and Min values are required.");
                this.options = options || {};
                for (var key in _options) key in this.options || (this.options[key] = _options[key]);
                this._max_value = max, this._min_value = min, this.value = min, this.end_loc = min, this.current_snap = this.getSnapNum(min), this.__extrStep = 0, this.__extraMove = 0, this.__animID = -1
            },
            p = Controller.prototype;
        p.changeTo = function(value, animate, speed, snap_num, dispatch) {
            if (this.stopped = !1, this._internalStop(), value = this._checkLimits(value), speed = Math.abs(speed || 0), this.options.snapping && (snap_num = snap_num || this.getSnapNum(value), dispatch !== !1 && this._callsnapChange(snap_num), this.current_snap = snap_num), animate) {
                this.animating = !0;
                var self = this,
                    active_id = ++self.__animID,
                    amplitude = value - self.value,
                    timeStep = 0,
                    targetPosition = value,
                    animFrict = 1 - self.options.friction,
                    timeconst = animFrict + (speed - 20) * animFrict * 1.3 / self.options.maxSpeed,
                    tick = function() {
                        if (active_id === self.__animID) {
                            var dis = value - self.value;
                            if (!(Math.abs(dis) > self.options.minValidDist && self.animating)) return self.animating && (self.value = value, self._callrenderer()), self.animating = !1, active_id !== self.__animID && (self.__animID = -1), void self._callonComplete("anim");
                            window.requestAnimationFrame(tick), self.value = targetPosition - amplitude * Math.exp(- ++timeStep * timeconst), self._callrenderer()
                        }
                    };
                return void tick()
            }
            this.value = value, this._callrenderer()
        }, p.drag = function(move) {
            this.start_drag && (this.drag_start_loc = this.value, this.start_drag = !1), this.animating = !1, this._deceleration = !1, this.value -= move, !this.options.endless && (this.value > this._max_value || this.value < 0) ? this.options.bouncing ? (this.__isout = !0, this.value += .6 * move) : this.value = this.value > this._max_value ? this._max_value : 0 : !this.options.endless && this.options.bouncing && (this.__isout = !1), this._callrenderer()
        }, p.push = function(speed) {
            if (this.stopped = !1, this.options.snapping && Math.abs(speed) <= this.options.snappingMinSpeed) return void this.cancel();
            if (this.__speed = speed, this.__startSpeed = speed, this.end_loc = this._calculateEnd(), this.options.snapping) {
                var snap_loc = this.getSnapNum(this.value),
                    end_snap = this.getSnapNum(this.end_loc);
                if (this.options.paging) return snap_loc = this.getSnapNum(this.drag_start_loc), this.__isout = !1, void(speed > 0 ? this.gotoSnap(snap_loc + 1, !0, speed) : this.gotoSnap(snap_loc - 1, !0, speed));
                if (snap_loc === end_snap) return void this.cancel();
                this._callsnapChange(end_snap), this.current_snap = end_snap
            }
            this.animating = !1, this.__needsSnap = this.options.endless || this.end_loc > this._min_value && this.end_loc < this._max_value, this.options.snapping && this.__needsSnap && (this.__extraMove = this._calculateExtraMove(this.end_loc)), this._startDecelaration()
        }, p.bounce = function(speed) {
            this.animating || (this.stopped = !1, this.animating = !1, this.__speed = speed, this.__startSpeed = speed, this.end_loc = this._calculateEnd(), this._startDecelaration())
        }, p.stop = function() {
            this.stopped = !0, this._internalStop()
        }, p.cancel = function() {
            this.start_drag = !0, this.__isout ? (this.__speed = 4e-4, this._startDecelaration()) : this.options.snapping && this.gotoSnap(this.getSnapNum(this.value), !0)
        }, p.renderCallback = function(listener, ref) {
            this.__renderHook = {
                fun: listener,
                ref: ref
            }
        }, p.snappingCallback = function(listener, ref) {
            this.__snapHook = {
                fun: listener,
                ref: ref
            }
        }, p.snapCompleteCallback = function(listener, ref) {
            this.__compHook = {
                fun: listener,
                ref: ref
            }
        }, p.getSnapNum = function(value) {
            return Math.floor((value + this.options.snapsize / 2) / this.options.snapsize)
        }, p.nextSnap = function() {
            this._internalStop();
            var curr_snap = this.getSnapNum(this.value);
            !this.options.endless && (curr_snap + 1) * this.options.snapsize > this._max_value ? (this.__speed = 8, this.__needsSnap = !1, this._startDecelaration()) : this.gotoSnap(curr_snap + 1, !0)
        }, p.prevSnap = function() {
            this._internalStop();
            var curr_snap = this.getSnapNum(this.value);
            !this.options.endless && (curr_snap - 1) * this.options.snapsize < this._min_value ? (this.__speed = -8, this.__needsSnap = !1, this._startDecelaration()) : this.gotoSnap(curr_snap - 1, !0)
        }, p.gotoSnap = function(snap_num, animate, speed) {
            this.changeTo(snap_num * this.options.snapsize, animate, speed, snap_num)
        }, p.destroy = function() {
            this._internalStop(), this.__renderHook = null, this.__snapHook = null, this.__compHook = null
        }, p._internalStop = function() {
            this.start_drag = !0, this.animating = !1, this._deceleration = !1, this.__extrStep = 0
        }, p._calculateExtraMove = function(value) {
            var m = value % this.options.snapsize;
            return m < this.options.snapsize / 2 ? -m : this.options.snapsize - m
        }, p._calculateEnd = function(step) {
            for (var temp_speed = this.__speed, temp_value = this.value, i = 0; Math.abs(temp_speed) > this.options.minValidDist;) temp_value += temp_speed, temp_speed *= this.options.friction, i++;
            return step ? i : temp_value
        }, p._checkLimits = function(value) {
            return this.options.endless ? value : value < this._min_value ? this._min_value : value > this._max_value ? this._max_value : value
        }, p._callrenderer = function() {
            this.__renderHook && this.__renderHook.fun.call(this.__renderHook.ref, this, this.value)
        }, p._callsnapChange = function(targetSnap) {
            this.__snapHook && targetSnap !== this.current_snap && this.__snapHook.fun.call(this.__snapHook.ref, this, targetSnap, targetSnap - this.current_snap)
        }, p._callonComplete = function(type) {
            this.__compHook && !this.stopped && this.__compHook.fun.call(this.__compHook.ref, this, this.current_snap, type)
        }, p._computeDeceleration = function() {
            if (this.options.snapping && this.__needsSnap) {
                var xtr_move = (this.__startSpeed - this.__speed) / this.__startSpeed * this.__extraMove;
                this.value += this.__speed + xtr_move - this.__extrStep, this.__extrStep = xtr_move
            } else this.value += this.__speed;
            if (this.__speed *= this.options.friction, this.options.endless || this.options.bouncing || (this.value <= this._min_value ? (this.value = this._min_value, this.__speed = 0) : this.value >= this._max_value && (this.value = this._max_value, this.__speed = 0)), this._callrenderer(), !this.options.endless && this.options.bouncing) {
                var out_value = 0;
                this.value < this._min_value ? out_value = this._min_value - this.value : this.value > this._max_value && (out_value = this._max_value - this.value), this.__isout = Math.abs(out_value) >= this.options.minValidDist, this.__isout && (this.__speed * out_value <= 0 ? this.__speed += out_value * this.options.outFriction : this.__speed = out_value * this.options.outAcceleration)
            }
        }, p._startDecelaration = function() {
            if (!this._deceleration) {
                this._deceleration = !0;
                var self = this,
                    tick = function() {
                        self._deceleration && (self._computeDeceleration(), Math.abs(self.__speed) > self.options.minValidDist || self.__isout ? window.requestAnimationFrame(tick) : (self._deceleration = !1, self.__isout = !1, self.value = self.__needsSnap && self.options.snapping && !self.options.paging ? self._checkLimits(self.end_loc + self.__extraMove) : Math.round(self.value), self._callrenderer(), self._callonComplete("decel")))
                    };
                tick()
            }
        }, window.Controller = Controller
    }(), window.MSSliderEvent = function(type) {
        this.type = type
    }, MSSliderEvent.CHANGE_START = "ms_changestart", MSSliderEvent.CHANGE_END = "ms_changeend", MSSliderEvent.WAITING = "ms_waiting", MSSliderEvent.AUTOPLAY_CHANGE = "ms_autoplaychange", MSSliderEvent.VIDEO_PLAY = "ms_videoPlay", MSSliderEvent.VIDEO_CLOSE = "ms_videoclose", MSSliderEvent.INIT = "ms_init", MSSliderEvent.HARD_UPDATE = "ms_hard_update", MSSliderEvent.RESIZE = "ms_resize", MSSliderEvent.RESERVED_SPACE_CHANGE = "ms_rsc", MSSliderEvent.DESTROY = "ms_destroy",
    function(window, document, $) {
        "use strict";
        window.MSSlide = function() {
            this.$element = null, this.$loading = $("<div></div>").addClass("ms-slide-loading"), this.view = null, this.index = -1, this.__width = 0, this.__height = 0, this.fillMode = "fill", this.selected = !1, this.pselected = !1, this.autoAppend = !0, this.isSleeping = !0, this.moz = window.MSBrowserInfo.mozilla
        };
        var p = MSSlide.prototype;
        p.onSwipeStart = function() {
            this.link && (this.linkdis = !0), this.video && (this.videodis = !0)
        }, p.onSwipeMove = function(e) {
            var move = Math.max(Math.abs(e.data.distanceX), Math.abs(e.data.distanceY));
            this.swipeMoved = move > 4
        }, p.onSwipeCancel = function() {
            return this.swipeMoved ? void(this.swipeMoved = !1) : (this.link && (this.linkdis = !1), void(this.video && (this.videodis = !1)))
        }, p.assetsLoaded = function() {
            this.ready = !0, this.slider.api._startTimer(), this.isSleeping || this.setupBG(), CTween.fadeOut(this.$loading, 300, !0), (0 === this.slider.options.preload || "all" === this.slider.options.preload) && this.index < this.view.slideList.length - 1 ? this.view.slideList[this.index + 1].loadImages() : "all" === this.slider.options.preload && this.index === this.view.slideList.length - 1 && this.slider._removeLoading()
        }, p.setBG = function(img) {
            this.hasBG = !0;
            var that = this;
            this.$imgcont = $("<div></div>").addClass("ms-slide-bgcont"), this.$element.append(this.$loading).append(this.$imgcont), this.$bg_img = $(img).css("visibility", "hidden"), this.$imgcont.append(this.$bg_img), this.bgAligner = new MSAligner(that.fillMode, that.$imgcont, that.$bg_img), this.bgAligner.widthOnly = this.slider.options.autoHeight, that.slider.options.autoHeight && (that.pselected || that.selected) && that.slider.setHeight(that.slider.options.height), void 0 !== this.$bg_img.data("src") ? (this.bg_src = this.$bg_img.data("src"), this.$bg_img.removeAttr("data-src")) : this.$bg_img.one("load", function(event) {
                that._onBGLoad(event)
            }).each($.jqLoadFix)
        }, p.setupBG = function() {
            !this.initBG && this.bgLoaded && (this.initBG = !0, this.$bg_img.css("visibility", ""), this.bgWidth = this.bgNatrualWidth || this.$bg_img.width(), this.bgHeight = this.bgNatrualHeight || this.$bg_img.height(), CTween.fadeIn(this.$imgcont, 300), this.slider.options.autoHeight && this.$imgcont.height(this.bgHeight * this.ratio), this.bgAligner.init(this.bgWidth, this.bgHeight), this.setSize(this.__width, this.__height), this.slider.options.autoHeight && (this.pselected || this.selected) && this.slider.setHeight(this.getHeight()))
        }, p.loadImages = function() {
            if (!this.ls) {
                if (this.ls = !0, this.hasBG && this.bg_src) {
                    var that = this;
                    this.$bg_img.preloadImg(this.bg_src, function(event) {
                        that._onBGLoad(event)
                    })
                }
                this.hasBG || this.hasLayers || this.assetsLoaded()
            }
        }, p._onBGLoad = function(event) {
            this.bgNatrualWidth = event.width, this.bgNatrualHeight = event.height, this.bgLoaded = !0, window.MSBrowserInfo.msie && this.$bg_img.on("dragstart", function(event) {
                event.preventDefault()
            }), (!this.hasLayers || this.layerController.ready) && this.assetsLoaded()
        }, p.setSize = function(width, height) {
            this.__width = width, this.slider.options.autoHeight && (this.bgLoaded ? (this.ratio = this.__width / this.bgWidth, height = Math.floor(this.ratio * this.bgHeight), this.$imgcont.height(height)) : (this.ratio = width / this.slider.options.width, height = this.slider.options.height * this.ratio)), this.__height = height, this.$element.width(width).height(height), this.hasBG && this.bgLoaded && this.bgAligner.align()
        }, p.getHeight = function() {
            return this.hasBG && this.bgLoaded ? this.bgHeight * this.ratio : Math.max(this.$element[0].clientHeight, this.slider.options.height * this.ratio)
        }, p.__playVideo = function() {
            this.vplayed || this.videodis || (this.vplayed = !0, this.slider.api.paused || (this.slider.api.pause(), this.roc = !0), this.vcbtn.css("display", ""), CTween.fadeOut(this.vpbtn, 500, !1), CTween.fadeIn(this.vcbtn, 500), CTween.fadeIn(this.vframe, 500), this.vframe.css("display", "block").attr("src", this.video + "&autoplay=1"), this.view.$element.addClass("ms-def-cursor"), this.moz && this.view.$element.css("perspective", "none"), this.view.swipeControl && this.view.swipeControl.disable(), this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_PLAY)))
        }, p.__closeVideo = function() {
            if (this.vplayed) {
                this.vplayed = !1, this.roc && this.slider.api.resume();
                var that = this;
                CTween.fadeIn(this.vpbtn, 500), CTween.animate(this.vcbtn, 500, {
                    opacity: 0
                }, {
                    complete: function() {
                        that.vcbtn.css("display", "none")
                    }
                }), CTween.animate(this.vframe, 500, {
                    opacity: 0
                }, {
                    complete: function() {
                        that.vframe.attr("src", "about:blank").css("display", "none")
                    }
                }), this.moz && this.view.$element.css("perspective", ""), this.view.swipeControl && this.view.swipeControl.enable(), this.view.$element.removeClass("ms-def-cursor"), this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_CLOSE))
            }
        }, p.create = function() {
            var that = this;
            this.link && this.link.addClass("ms-slide-link").html("").on("click", function(e) {
                that.linkdis && e.preventDefault()
            }), this.video && (-1 === this.video.indexOf("?") && (this.video += "?"), this.vframe = $("<iframe></iframe>").addClass("ms-slide-video").css({
                width: "100%",
                height: "100%",
                display: "none"
            }).attr("src", "about:blank").attr("allowfullscreen", "true").appendTo(this.$element), this.vpbtn = $("<div></div>").addClass("ms-slide-vpbtn").on("click", function() {
                that.__playVideo()
            }).appendTo(this.$element), this.vcbtn = $("<div></div>").addClass("ms-slide-vcbtn").on("click", function() {
                that.__closeVideo()
            }).appendTo(this.$element).css("display", "none"), window._touch && this.vcbtn.removeClass("ms-slide-vcbtn").addClass("ms-slide-vcbtn-mobile").append('<div class="ms-vcbtn-txt">Close video</div>').appendTo(this.view.$element.parent())), !this.slider.options.autoHeight && this.hasBG && (this.$imgcont.css("height", "100%"), ("center" === this.fillMode || "stretch" === this.fillMode) && (this.fillMode = "fill")), this.slider.options.autoHeight && this.$element.addClass("ms-slide-auto-height"), this.sleep(!0)
        }, p.destroy = function() {
            this.$element.remove(), this.$element = null
        }, p.prepareToSelect = function() {
            this.pselected || this.selected || (this.pselected = !0, (this.link || this.video) && (this.view.addEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this), this.view.addEventListener(MSViewEvents.SWIPE_MOVE, this.onSwipeMove, this), this.view.addEventListener(MSViewEvents.SWIPE_CANCEL, this.onSwipeCancel, this), this.linkdis = !1, this.swipeMoved = !1), this.loadImages(), this.moz && this.$element.css("margin-top", ""))
        }, p.select = function() {
            this.selected || (this.selected = !0, this.pselected = !1, this.$element.addClass("ms-sl-selected"), this.videoAutoPlay && (this.videodis = !1, this.vpbtn.trigger("click")))
        }, p.unselect = function() {
            this.pselected = !1, this.moz && this.$element.css("margin-top", "0.1px"), (this.link || this.video) && (this.view.removeEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this), this.view.removeEventListener(MSViewEvents.SWIPE_MOVE, this.onSwipeMove, this), this.view.removeEventListener(MSViewEvents.SWIPE_CANCEL, this.onSwipeCancel, this)), this.selected && (this.selected = !1, this.$element.removeClass("ms-sl-selected"), this.video && this.vplayed && (this.__closeVideo(), this.roc = !1))
        }, p.sleep = function(force) {
            (!this.isSleeping || force) && (this.isSleeping = !0, this.autoAppend && this.$element.detach(), this.hasLayers && this.layerController.onSlideSleep())
        }, p.wakeup = function() {
            this.isSleeping && (this.isSleeping = !1, this.autoAppend && this.view.$slideCont.append(this.$element), this.moz && this.$element.css("margin-top", "0.1px"), this.setupBG(), this.hasBG && this.bgAligner.align(), this.hasLayers && this.layerController.onSlideWakeup())
        }
    }(window, document, jQuery),
    function($) {
        "use strict";
        var SliderViewList = {};
        window.MSSlideController = function(slider) {
            this._delayProgress = 0, this._timer = new averta.Timer(100), this._timer.onTimer = this.onTimer, this._timer.refrence = this, this.currentSlide = null, this.slider = slider, this.so = slider.options, averta.EventDispatcher.call(this)
        }, MSSlideController.registerView = function(name, _class) {
            if (name in SliderViewList) throw new Error(name + ", is already registered.");
            SliderViewList[name] = _class
        }, MSSlideController.SliderControlList = {}, MSSlideController.registerControl = function(name, _class) {
            if (name in MSSlideController.SliderControlList) throw new Error(name + ", is already registered.");
            MSSlideController.SliderControlList[name] = _class
        };
        var p = MSSlideController.prototype;
        p.setupView = function() {
            var that = this;
            this.resize_listener = function() {
                that.__resize()
            };
            var viewOptions = {
                spacing: this.so.space,
                mouseSwipe: this.so.mouse,
                loop: this.so.loop,
                autoHeight: this.so.autoHeight,
                swipe: this.so.swipe,
                speed: this.so.speed,
                dir: this.so.dir,
                viewNum: this.so.inView,
                critMargin: this.so.critMargin
            };
            this.so.viewOptions && $.extend(viewOptions, this.so.viewOptions), this.so.autoHeight && (this.so.heightLimit = !1);
            var viewClass = SliderViewList[this.slider.options.view] || MSBasicView;
            if (!viewClass._3dreq || window._css3d && !window.MSBrowserInfo.msie || (viewClass = viewClass._fallback || MSBasicView), this.view = new viewClass(viewOptions), this.so.overPause) {
                var that = this;
                this.slider.$element.on("mouseenter", function() {
                    that.is_over = !0, that._stopTimer()
                }).on("mouseleave", function() {
                    that.is_over = !1, that._startTimer()
                })
            }
        }, p.onChangeStart = function() {
            this.change_started = !0, this.currentSlide && this.currentSlide.unselect(), this.currentSlide = this.view.currentSlide, this.currentSlide.prepareToSelect(), this.so.endPause && this.currentSlide.index === this.slider.slides.length - 1 && (this.pause(), this.skipTimer()), this.so.autoHeight && this.slider.setHeight(this.currentSlide.getHeight()), this.so.deepLink && this.__updateWindowHash(), this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_START))
        }, p.onChangeEnd = function() {
            if (this.change_started = !1, this._startTimer(), this.currentSlide.select(), this.so.preload > 1) {
                var loc, i, slide, l = this.so.preload - 1;
                for (i = 1; l >= i; ++i) {
                    if (loc = this.view.index + i, loc >= this.view.slideList.length) {
                        if (!this.so.loop) {
                            i = l;
                            continue
                        }
                        loc -= this.view.slideList.length
                    }
                    slide = this.view.slideList[loc], slide && slide.loadImages()
                }
                for (l > this.view.slideList.length / 2 && (l = Math.floor(this.view.slideList.length / 2)), i = 1; l >= i; ++i) {
                    if (loc = this.view.index - i, 0 > loc) {
                        if (!this.so.loop) {
                            i = l;
                            continue
                        }
                        loc = this.view.slideList.length + loc
                    }
                    slide = this.view.slideList[loc], slide && slide.loadImages()
                }
            }
            this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_END))
        }, p.onSwipeStart = function() {
            this.skipTimer()
        }, p.skipTimer = function() {
            this._timer.reset(), this._delayProgress = 0, this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))
        }, p.onTimer = function() {
            if (this._timer.getTime() >= 1e3 * this.view.currentSlide.delay && (this.skipTimer(), this.view.next(), this.hideCalled = !1), this._delayProgress = this._timer.getTime() / (10 * this.view.currentSlide.delay), this.so.hideLayers && !this.hideCalled && 1e3 * this.view.currentSlide.delay - this._timer.getTime() <= 300) {
                var currentSlide = this.view.currentSlide;
                currentSlide.hasLayers && currentSlide.layerController.animHideLayers(), this.hideCalled = !0
            }
            this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))
        }, p._stopTimer = function() {
            this._timer && this._timer.stop()
        }, p._startTimer = function() {
            this.paused || this.is_over || !this.currentSlide || !this.currentSlide.ready || this.change_started || this._timer.start()
        }, p.__appendSlides = function() {
            var slide, loc, i = 0,
                l = this.view.slideList.length - 1;
            for (i; l > i; ++i) slide = this.view.slideList[i], slide.detached || (slide.$element.detach(), slide.detached = !0);
            for (this.view.appendSlide(this.view.slideList[this.view.index]), l = 3, i = 1; l >= i; ++i) {
                if (loc = this.view.index + i, loc >= this.view.slideList.length) {
                    if (!this.so.loop) {
                        i = l;
                        continue
                    }
                    loc -= this.view.slideList.length
                }
                slide = this.view.slideList[loc], slide.detached = !1, this.view.appendSlide(slide)
            }
            for (l > this.view.slideList.length / 2 && (l = Math.floor(this.view.slideList.length / 2)), i = 1; l >= i; ++i) {
                if (loc = this.view.index - i, 0 > loc) {
                    if (!this.so.loop) {
                        i = l;
                        continue
                    }
                    loc = this.view.slideList.length + loc
                }
                slide = this.view.slideList[loc], slide.detached = !1, this.view.appendSlide(slide)
            }
        }, p.__resize = function(hard) {
            this.created && (this.width = this.slider.$element[0].clientWidth || this.so.width, this.so.fullwidth || (this.width = Math.min(this.width, this.so.width)), this.height = this.width / this.slider.aspect, this.so.autoHeight ? (this.currentSlide.setSize(this.width, null, hard), this.view.setSize(this.width, this.currentSlide.getHeight(), hard)) : this.view.setSize(this.width, Math.max(this.so.minHeight, this.so.heightLimit ? Math.min(this.height, this.so.height) : this.height), hard), this.slider.$controlsCont && this.so.centerControls && this.so.fullwidth && this.view.$element.css("left", Math.min(0, -(this.slider.$element[0].clientWidth - this.so.width) / 2) + "px"), this.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESIZE)))
        }, p.__dispatchInit = function() {
            this.dispatchEvent(new MSSliderEvent(MSSliderEvent.INIT))
        }, p.setup = function() {
            this.created = !0, this.paused = !this.so.autoplay, this.view.addEventListener(MSViewEvents.CHANGE_START, this.onChangeStart, this), this.view.addEventListener(MSViewEvents.CHANGE_END, this.onChangeEnd, this), this.view.addEventListener(MSViewEvents.SWIPE_START, this.onSwipeStart, this), this.currentSlide = this.view.slideList[this.so.start - 1], this.__resize();
            var startSlide = this.so.start - 1;
            if (this.view.create(startSlide), 0 === this.so.preload && this.view.slideList[0].loadImages(), this.scroller = this.view.controller, this.so.wheel) {
                var that = this,
                    last_time = (new Date).getTime();
                this.wheellistener = function(event) {
                    var e = window.event || event.orginalEvent || event;
                    e.preventDefault();
                    var current_time = (new Date).getTime();
                    if (!(400 > current_time - last_time)) {
                        last_time = current_time;
                        var delta = Math.abs(e.detail || e.wheelDelta);
                        window.MSBrowserInfo.mozilla && (delta *= 100);
                        var scrollThreshold = 15;
                        return e.detail < 0 || e.wheelDelta > 0 ? delta >= scrollThreshold && that.previous(!0) : delta >= scrollThreshold && that.next(!0), !1
                    }
                }, this.slider.$element[0].addEventListener("mousewheel", this.wheellistener, {
                    passive: !1
                })
            }
            0 === this.slider.$element[0].clientWidth && (this.slider.init_safemode = !0), this.__resize()
        }, p.index = function() {
            return this.view.index
        }, p.count = function() {
            return this.view.slidesCount
        }, p.next = function(checkLoop) {
            this.skipTimer(), this.view.next(checkLoop)
        }, p.previous = function(checkLoop) {
            this.skipTimer(), this.view.previous(checkLoop)
        }, p.gotoSlide = function(index) {
            index = Math.min(index, this.count() - 1), this.skipTimer(), this.view.gotoSlide(index)
        }, p.destroy = function(reset) {
            this.dispatchEvent(new MSSliderEvent(MSSliderEvent.DESTROY)), this.slider.destroy(reset)
        }, p._destroy = function() {
            this._timer.reset(), this._timer = null, $(window).off("resize", this.resize_listener), this.view.destroy(), this.view = null, this.so.wheel && (window.MSBrowserInfo.mozilla ? this.slider.$element[0].removeEventListener("DOMMouseScroll", this.wheellistener) : this.slider.$element.off("mousewheel", this.wheellistener), this.wheellistener = null), this.so = null
        }, p.runAction = function(action) {
            var actionParams = [];
            if (-1 !== action.indexOf("(")) {
                var temp = action.slice(0, action.indexOf("("));
                actionParams = action.slice(action.indexOf("(") + 1, -1).replace(/\"|\'|\s/g, "").split(","), action = temp
            }
            action in this ? this[action].apply(this, actionParams) : console
        }, p.update = function(hard) {
            this.slider.init_safemode && hard && (this.slider.init_safemode = !1), this.__resize(hard), hard && this.dispatchEvent(new MSSliderEvent(MSSliderEvent.HARD_UPDATE))
        }, p.locate = function() {
            this.__resize()
        }, p.resume = function() {
            this.paused && (this.paused = !1, this._startTimer())
        }, p.pause = function() {
            this.paused || (this.paused = !0, this._stopTimer())
        }, p.currentTime = function() {
            return this._delayProgress
        }, averta.EventDispatcher.extend(p)
    }(jQuery),
    function($) {
        "use strict";
        window.MasterSlider = function() {
            this.options = {
                forceInit: !0,
                autoplay: !1,
                loop: !1,
                mouse: !0,
                swipe: !0,
                grabCursor: !0,
                space: 0,
                fillMode: "fill",
                start: 1,
                view: "basic",
                width: 300,
                height: 150,
                inView: 15,
                critMargin: 1,
                mobileBGVideo: !1,
                heightLimit: !0,
                smoothHeight: !0,
                autoHeight: !1,
                minHeight: -1,
                fullwidth: !1,
                fullheight: !1,
                autofill: !1,
                layersMode: "center",
                hideLayers: !1,
                endPause: !1,
                centerControls: !0,
                overPause: !0,
                shuffle: !1,
                speed: 17,
                dir: "h",
                preload: 0,
                wheel: !1,
                layout: "boxed",
                autofillTarget: null,
                fullscreenMargin: 0,
                instantStartLayers: !1,
                parallaxMode: "mouse",
                rtl: !1,
                deepLink: null,
                deepLinkType: "path",
                disablePlugins: [],
                responsive: !0,
                tabletWidth: 768,
                tabletHeight: null,
                phoneWidth: 480,
                phoneHeight: null,
                sizingReference: "window"
            }, this.slides = [], this.activePlugins = [], this.$element = null, this.lastMargin = 0, this.leftSpace = 0, this.topSpace = 0, this.rightSpace = 0, this.bottomSpace = 0, this._holdOn = 0;
            var that = this;
            this.resize_listener = function() {
                that._resize()
            }, $(window).on("resize", this.resize_listener)
        }, MasterSlider.author = "Averta Ltd. (www.averta.net)", MasterSlider.version = "2.85.13", MasterSlider.releaseDate = "Feb 2022", MasterSlider._plugins = [];
        var MS = MasterSlider;
        MS.registerPlugin = function(plugin) {
            -1 === MS._plugins.indexOf(plugin) && MS._plugins.push(plugin)
        };
        var p = MasterSlider.prototype;
        p.__setupSlides = function() {
            var new_slide, that = this,
                ind = 0;
            this.$element.children(".ms-slide").each(function() {
                var $slide_ele = $(this);
                new_slide = new MSSlide, new_slide.$element = $slide_ele, new_slide.slider = that, new_slide.delay = void 0 !== $slide_ele.data("delay") ? $slide_ele.data("delay") : 3, new_slide.fillMode = void 0 !== $slide_ele.data("fill-mode") ? $slide_ele.data("fill-mode") : that.options.fillMode, new_slide.index = ind++, new_slide.id = $slide_ele.data("id");
                var slide_img = $slide_ele.children("img:not(.ms-layer)");
                if (slide_img.length > 0 && new_slide.setBG(slide_img[0]), that.controls)
                    for (var i = 0, l = that.controls.length; l > i; ++i) that.controls[i].slideAction(new_slide);
                $slide_ele.children("a").each(function() {
                    var $this = $(this);
                    "video" === this.getAttribute("data-type") ? (new_slide.video = this.getAttribute("href"), new_slide.videoAutoPlay = $this.data("autoplay"), $this.remove()) : $this.hasClass("ms-layer") || (new_slide.link = $(this))
                });
                that.slides.push(new_slide), that.slideController.view.addSlide(new_slide)
            })
        }, p._setupOverlayLayers = function() {
            var self = this,
                $ollayers = this.$element.children(".ms-overlay-layers").eq(0);
            if ($ollayers.length) {
                var overlayLayers = new MSOverlayLayers(this);
                overlayLayers.$element = $ollayers, self.__createSlideLayers(overlayLayers, $ollayers.find(".ms-layer")), this.view.$element.prepend($ollayers), this.overlayLayers = overlayLayers, overlayLayers.create()
            }
        }, p._removeLoading = function() {
            $(window).off("resize", this.resize_listener), this.$element.removeClass("before-init").css("visibility", "visible").css("height", "").css("opacity", 0), CTween.fadeIn(this.$element), this.$loading.remove(), this.slideController && this.slideController.__resize()
        }, p._resize = function() {
            if (this.$loading) {
                var h = this.$loading[0].clientWidth / this.aspect;
                h = this.options.heightLimit ? Math.min(h, this.options.height) : h, this.$loading.height(h), this.$element.height(h)
            }
        }, p._shuffleSlides = function() {
            for (var r, slides = this.$element.children(".ms-slide"), i = 0, l = slides.length; l > i; ++i) r = Math.floor(Math.random() * (l - 1)), i != r && (this.$element[0].insertBefore(slides[i], slides[r]), slides = this.$element.children(".ms-slide"))
        }, p._setupSliderLayout = function() {
            this._updateSideMargins(), this.lastMargin = this.leftSpace;
            var lo = this.options.layout;
            "boxed" !== lo && "partialview" !== lo && (this.options.fullwidth = !0), ("fullscreen" === lo || "fullwidth" === lo || "autofill" === lo) && ($(window).on("resize", {
                that: this
            }, this._updateLayout), this._updateLayout()), $(window).on("resize", this.slideController.resize_listener)
        }, p._updateLayout = function(event) {
            var that = event ? event.data.that : this,
                $element = (that.options.layout, that.$element),
                $win = $(window);
            $element.width($win.width() - that.leftSpace - that.rightSpace);
            var margin = -$element.offset().left + that.leftSpace + that.lastMargin;
            $element.css("margin-left", margin), that.lastMargin = margin
        }, p._init = function() {
            if (!(this._holdOn > 0) && this._docReady) {
                if (this.initialized = !0, "all" !== this.options.preload && this._removeLoading(), this.options.shuffle && this._shuffleSlides(), this.slideController.setupView(), this.view = this.slideController.view, this.$controlsCont = $("<div></div>").addClass("ms-inner-controls-cont"), this.options.centerControls && this.$controlsCont.css("max-width", this.options.width + "px"), this.$controlsCont.prepend(this.view.$element), this.$msContainer = $("<div></div>").addClass("ms-container").prependTo(this.$element).append(this.$controlsCont), this.controls)
                    for (var i = 0, l = this.controls.length; l > i; ++i) this.controls[i].setup();
                if (this._setupSliderLayout(), this.__setupSlides(), this.slideController.setup(), this._setupOverlayLayers(), this.controls)
                    for (i = 0, l = this.controls.length; l > i; ++i) this.controls[i].create();
                if (this.options.autoHeight && this.slideController.view.$element.height(this.slideController.currentSlide.getHeight()), this.options.swipe && !window._touch && this.options.grabCursor && this.options.mouse) {
                    var $view = this.view.$element;
                    $view.on("mousedown", function() {
                        $view.removeClass("ms-grab-cursor"), $view.addClass("ms-grabbing-cursor"), window.MSBrowserInfo.msie && window.ms_grabbing_curosr && ($view[0].style.cursor = "url(" + window.ms_grabbing_curosr + "), move")
                    }).addClass("ms-grab-cursor"), $(document).on("mouseup", function() {
                        $view.removeClass("ms-grabbing-cursor"), $view.addClass("ms-grab-cursor"), window.MSBrowserInfo.msie && window.ms_grab_curosr && ($view[0].style.cursor = "url(" + window.ms_grab_curosr + "), move")
                    })
                }
                this.slideController.__dispatchInit()
            }
        }, p.setHeight = function(value) {
            this.options.smoothHeight ? (this.htween && (this.htween.reset ? this.htween.reset() : this.htween.stop(!0)), this.htween = CTween.animate(this.slideController.view.$element, 500, {
                height: value
            }, {
                ease: "easeOutQuart"
            })) : this.slideController.view.$element.height(value)
        }, p.reserveSpace = function(side, space) {
            var sideSpace = side + "Space",
                pos = this[sideSpace];
            return this[sideSpace] += space, this._updateSideMargins(), pos
        }, p._updateSideMargins = function() {
            this.$element.css("margin", this.topSpace + "px " + this.rightSpace + "px " + this.bottomSpace + "px " + this.leftSpace + "px")
        }, p._realignControls = function() {
            this.rightSpace = this.leftSpace = this.topSpace = this.bottomSpace = 0, this._updateSideMargins(), this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE))
        }, p.control = function(control, options) {
            if (control in MSSlideController.SliderControlList) {
                this.controls || (this.controls = []);
                var ins = new MSSlideController.SliderControlList[control](options);
                return ins.slider = this, this.controls.push(ins), this
            }
        }, p.holdOn = function() {
            this._holdOn++
        }, p.release = function() {
            this._holdOn--, this._init()
        }, p.setup = function(target, options) {
            if (this.$element = "string" == typeof target ? $("#" + target) : target.eq(0), this.setupMarkup = this.$element.html(), 0 !== this.$element.length) {
                this.$element.addClass("master-slider").addClass("before-init"), window.MSBrowserInfo.msie ? this.$element.addClass("ms-ie").addClass("ms-ie" + window.MSBrowserInfo.version.slice(0, window.MSBrowserInfo.version.indexOf("."))) : window.MSBrowserInfo.webkit ? this.$element.addClass("ms-wk") : window.MSBrowserInfo.mozilla && this.$element.addClass("ms-moz");
                var ua = navigator.userAgent.toLowerCase(),
                    isAndroid = ua.indexOf("android") > -1;
                isAndroid && this.$element.addClass("ms-android");
                var that = this;
                $.extend(this.options, options), this.aspect = this.options.width / this.options.height, this.responsiveWidth = [this.options.phoneWidth, this.options.tabletWidth, this.options.width], this.responsiveHeight = [this.options.phoneHeight, this.options.tabletHeight, this.options.height], this.responsiveAspect = [this.options.phoneWidth / this.options.phoneHeight, this.options.tabletWidth / this.options.tabletHeight, this.options.width / this.options.height], this.$loading = $("<div></div>").addClass("ms-loading-container").insertBefore(this.$element).append($("<div></div>").addClass("ms-loading")), this.$loading.parent().css("position", "relative"), this.options.autofill && (this.options.fullwidth = !0, this.options.fullheight = !0), this.options.fullheight && this.$element.addClass("ms-fullheight"), this._resize(), this.slideController = new MSSlideController(this), this.api = this.slideController;
                for (var i = 0, l = MS._plugins.length; i !== l; i++) {
                    var plugin = MS._plugins[i]; - 1 === this.options.disablePlugins.indexOf(plugin.name) && this.activePlugins.push(new plugin(this))
                }
                return this.options.forceInit && MasterSlider.addJQReadyErrorCheck(this), $(document).ready(function() {
                    that.initialized || (that._docReady = !0, that._init())
                }), this
            }
        }, p.getActiveBreakpoint = function(getIndex) {
            var bpList = ["phone", "tablet", "desktop"],
                bpSizes = [this.options.phoneWidth || 480, this.options.tabletWidth || 768, this.options.width],
                currentSize = "self" === this.options.sizingReference ? this.$element.outerWidth(!1) : window.innerWidth,
                bp = "desktop",
                bpIndex = 2;
            return bpSizes.every(function(size, index) {
                return size >= currentSize ? (bp = bpList[index], bpIndex = index, !1) : !0
            }.bind(this)), getIndex ? bpIndex : bp
        }, p.getBreakpointReferenceSize = function() {
            var bp = this.getActiveBreakpoint();
            return "desktop" === bp ? this.options.width : this.options[bp + "Width"]
        }, p.getResponsiveValue = function(repsVal) {
            var bpIndex = this.getActiveBreakpoint(!0);
            return repsVal.slice(bpIndex).filter(function(value) {
                return void 0 !== value && 1 / 0 !== value
            })[0]
        }, p.destroy = function(insertMarkup) {
            for (var i = 0, l = this.activePlugins.length; i !== l; i++) this.activePlugins[i].destroy();
            if (this.controls)
                for (i = 0, l = this.controls.length; i !== l; i++) this.controls[i].destroy();
            this.slideController && this.slideController._destroy(), this.$loading && this.$loading.remove(), insertMarkup ? this.$element.html(this.setupMarkup).css("visibility", "hidden") : this.$element.remove();
            var lo = this.options.layout;
            ("fullscreen" === lo || "fullwidth" === lo) && $(window).off("resize", this._updateLayout), this.view = null, this.slides = null, this.options = null, this.slideController = null, this.api = null, this.resize_listener = null, this.activePlugins = null
        }
    }(jQuery),
    function($, window, document, undefined) {
        function MasterSliderPlugin(element, options) {
            this.element = element, this.$element = $(element), this.settings = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
        }
        var pluginName = "masterslider",
            defaults = {
                controls: {}
            };
        $.extend(MasterSliderPlugin.prototype, {
            init: function() {
                var self = this;
                this._slider = new MasterSlider;
                for (var control in this.settings.controls) this._slider.control(control, this.settings.controls[control]);
                this._slider.setup(this.$element, this.settings);
                var _superDispatch = this._slider.api.dispatchEvent;
                this._slider.api.dispatchEvent = function(event) {
                    self.$element.trigger(event.type), _superDispatch.call(this, event)
                }
            },
            api: function() {
                return this._slider.api
            },
            slider: function() {
                return this._slider
            }
        }), $.fn[pluginName] = function(options) {
            var args = arguments,
                plugin = "plugin_" + pluginName;
            if (options === undefined || "object" == typeof options) return this.each(function() {
                $.data(this, plugin) || $.data(this, plugin, new MasterSliderPlugin(this, options))
            });
            if ("string" == typeof options && "_" !== options[0] && "init" !== options) {
                var returns;
                return this.each(function() {
                    var instance = $.data(this, plugin);
                    instance instanceof MasterSliderPlugin && "function" == typeof instance[options] && (returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1))), instance instanceof MasterSliderPlugin && "function" == typeof instance._slider.api[options] && (returns = instance._slider.api[options].apply(instance._slider.api, Array.prototype.slice.call(args, 1))), "destroy" === options && $.data(this, plugin, null)
                }), returns !== undefined ? returns : this
            }
        }
    }(jQuery, window, document),
    function($, window) {
        "use strict";
        var sliderInstances = [];
        MasterSlider.addJQReadyErrorCheck = function(slider) {
            sliderInstances.push(slider)
        };
        var _ready = $.fn.ready,
            _onerror = window.onerror;
        $.fn.ready = function() {
            return window.onerror = function() {
                if (0 !== sliderInstances.length)
                    for (var i = 0, l = sliderInstances.length; i !== l; i++) {
                        var slider = sliderInstances[i];
                        slider.initialized || (slider._docReady = !0, slider._init())
                    }
                return _onerror ? _onerror.apply(this, arguments) : !1
            }, _ready.apply(this, arguments)
        }
    }(jQuery, window, document), window.MSViewEvents = function(type, data) {
        this.type = type, this.data = data
    }, MSViewEvents.SWIPE_START = "swipeStart", MSViewEvents.SWIPE_END = "swipeEnd", MSViewEvents.SWIPE_MOVE = "swipeMove", MSViewEvents.SWIPE_CANCEL = "swipeCancel", MSViewEvents.SCROLL = "scroll", MSViewEvents.CHANGE_START = "slideChangeStart", MSViewEvents.CHANGE_END = "slideChangeEnd",
    function($) {
        "use strict";
        window.MSBasicView = function(options) {
            this.options = {
                loop: !1,
                dir: "h",
                autoHeight: !1,
                spacing: 5,
                mouseSwipe: !0,
                swipe: !0,
                speed: 17,
                minSlideSpeed: 2,
                viewNum: 20,
                critMargin: 1
            }, $.extend(this.options, options), this.dir = this.options.dir, this.loop = this.options.loop, this.spacing = this.options.spacing, this.__width = 0, this.__height = 0, this.__cssProb = "h" === this.dir ? "left" : "top", this.__offset = "h" === this.dir ? "offsetLeft" : "offsetTop", this.__dimension = "h" === this.dir ? "__width" : "__height", this.__translate_end = window._css3d ? " translateZ(0px)" : "", this.$slideCont = $("<div></div>").addClass("ms-slide-container"), this.$element = $("<div></div>").addClass("ms-view").addClass("ms-basic-view").append(this.$slideCont), this.currentSlide = null, this.index = -1, this.slidesCount = 0, this.slides = [], this.slideList = [], this.viewSlidesList = [], this.css3 = window._cssanim, this.start_buffer = 0, this.firstslide_snap = 0, this.slideChanged = !1, this.controller = new Controller(0, 0, {
                snapping: !0,
                snapsize: 100,
                paging: !0,
                snappingMinSpeed: this.options.minSlideSpeed,
                friction: (100 - .5 * this.options.speed) / 100,
                endless: this.loop
            }), this.controller.renderCallback("h" === this.dir ? this._horizUpdate : this._vertiUpdate, this), this.controller.snappingCallback(this.__snapUpdate, this), this.controller.snapCompleteCallback(this.__snapCompelet, this), averta.EventDispatcher.call(this)
        };
        var p = MSBasicView.prototype;
        p.__snapCompelet = function() {
            this.slideChanged && (this.slideChanged = !1, this.__locateSlides(), this.start_buffer = 0, this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)))
        }, p.__snapUpdate = function(controller, snap, change) {
            if (this.loop) {
                var target_index = this.index + change;
                this.updateLoop(target_index), target_index >= this.slidesCount && (target_index -= this.slidesCount), 0 > target_index && (target_index = this.slidesCount + target_index), this.index = target_index
            } else {
                if (0 > snap || snap >= this.slidesCount) return;
                this.index = snap
            }
            this._checkCritMargins(), window.MSBrowserInfo.mozilla && (this.slideList[this.index].$element[0].style.marginTop = "0.1px", this.currentSlide && (this.currentSlide.$element[0].style.marginTop = ""));
            var new_slide = this.slideList[this.index];
            new_slide !== this.currentSlide && (this.currentSlide = new_slide, this.autoUpdateZIndex && this.__updateSlidesZindex(), this.slideChanged = !0, this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)))
        }, p._checkCritMargins = function() {
            if (!this.normalMode) {
                var hlf = Math.floor(this.options.viewNum / 2),
                    inView = this.viewSlidesList.indexOf(this.slideList[this.index]),
                    size = this[this.__dimension] + this.spacing,
                    cm = this.options.critMargin;
                return this.loop ? void((cm >= inView || inView >= this.viewSlidesList.length - cm) && (size *= inView - hlf, this.__locateSlides(!1, size + this.start_buffer), this.start_buffer += size)) : void((cm > inView && this.index >= cm || inView >= this.viewSlidesList.length - cm && this.index < this.slidesCount - cm) && this.__locateSlides(!1))
            }
        }, p._vertiUpdate = function(controller, value) {
            return this.__contPos = value, this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)), this.css3 ? void(this.$slideCont[0].style[window._jcsspfx + "Transform"] = "translateY(" + -value + "px)" + this.__translate_end) : void(this.$slideCont[0].style.top = -value + "px")
        }, p._horizUpdate = function(controller, value) {
            return this.__contPos = value, this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)), this.css3 ? void(this.$slideCont[0].style[window._jcsspfx + "Transform"] = "translateX(" + -value + "px)" + this.__translate_end) : void(this.$slideCont[0].style.left = -value + "px")
        }, p.__updateViewList = function() {
            if (this.normalMode) return void(this.viewSlidesList = this.slides);
            var temp = this.viewSlidesList.slice();
            this.viewSlidesList = [];
            var l, i = 0,
                hlf = Math.floor(this.options.viewNum / 2);
            if (this.loop)
                for (; i !== this.options.viewNum; i++) this.viewSlidesList.push(this.slides[this.currentSlideLoc - hlf + i]);
            else {
                for (i = 0; i !== hlf && this.index - i !== -1; i++) this.viewSlidesList.unshift(this.slideList[this.index - i]);
                for (i = 1; i !== hlf && this.index + i !== this.slidesCount; i++) this.viewSlidesList.push(this.slideList[this.index + i])
            }
            for (i = 0, l = temp.length; i !== l; i++) - 1 === this.viewSlidesList.indexOf(temp[i]) && temp[i].sleep();
            temp = null, this.currentSlide && this.__updateSlidesZindex()
        }, p.__locateSlides = function(move, start) {
            this.__updateViewList(), start = this.loop ? start || 0 : this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing);
            for (var slide, l = this.viewSlidesList.length, i = 0; i !== l; i++) {
                var pos = start + i * (this[this.__dimension] + this.spacing);
                slide = this.viewSlidesList[i], slide.wakeup(), slide.position = pos, slide.$element[0].style[this.__cssProb] = pos + "px"
            }
            move !== !1 && this.controller.changeTo(this.slideList[this.index].position, !1, null, null, !1)
        }, p.__createLoopList = function() {
            var return_arr = [],
                i = 0,
                count = this.slidesCount / 2,
                before_count = this.slidesCount % 2 === 0 ? count - 1 : Math.floor(count),
                after_count = this.slidesCount % 2 === 0 ? count : Math.floor(count);
            for (this.currentSlideLoc = before_count, i = 1; before_count >= i; ++i) return_arr.unshift(this.slideList[this.index - i < 0 ? this.slidesCount - i + this.index : this.index - i]);
            for (return_arr.push(this.slideList[this.index]), i = 1; after_count >= i; ++i) return_arr.push(this.slideList[this.index + i >= this.slidesCount ? this.index + i - this.slidesCount : this.index + i]);
            return return_arr
        }, p.__getSteps = function(index, target) {
            var right = index > target ? this.slidesCount - index + target : target - index,
                left = Math.abs(this.slidesCount - right);
            return left > right ? right : -left
        }, p.__pushEnd = function() {
            var first_slide = this.slides.shift(),
                last_slide = this.slides[this.slidesCount - 2];
            if (this.slides.push(first_slide), this.normalMode) {
                var pos = last_slide.$element[0][this.__offset] + this.spacing + this[this.__dimension];
                first_slide.$element[0].style[this.__cssProb] = pos + "px", first_slide.position = pos
            }
        }, p.__pushStart = function() {
            var last_slide = this.slides.pop(),
                first_slide = this.slides[0];
            if (this.slides.unshift(last_slide), this.normalMode) {
                var pos = first_slide.$element[0][this.__offset] - this.spacing - this[this.__dimension];
                last_slide.$element[0].style[this.__cssProb] = pos + "px", last_slide.position = pos
            }
        }, p.__updateSlidesZindex = function() {
            {
                var slide, l = this.viewSlidesList.length;
                Math.floor(l / 2)
            }
            if (this.loop)
                for (var loc = this.viewSlidesList.indexOf(this.currentSlide), i = 0; i !== l; i++) slide = this.viewSlidesList[i], this.viewSlidesList[i].$element.css("z-index", loc >= i ? i + 1 : l - i);
            else {
                for (var beforeNum = this.currentSlide.index - this.viewSlidesList[0].index, i = 0; i !== l; i++) this.viewSlidesList[i].$element.css("z-index", beforeNum >= i ? i + 1 : l - i);
                this.currentSlide.$element.css("z-index", l)
            }
        }, p.addSlide = function(slide) {
            slide.view = this, this.slides.push(slide), this.slideList.push(slide), this.slidesCount++
        }, p.appendSlide = function(slide) {
            this.$slideCont.append(slide.$element)
        }, p.updateLoop = function(index) {
            if (this.loop)
                for (var steps = this.__getSteps(this.index, index), i = 0, l = Math.abs(steps); l > i; ++i) 0 > steps ? this.__pushStart() : this.__pushEnd()
        }, p.gotoSlide = function(index, fast) {
            this.updateLoop(index), this.index = index;
            var target_slide = this.slideList[index];
            this._checkCritMargins(), this.controller.changeTo(target_slide.position, !fast, null, null, !1), target_slide !== this.currentSlide && (this.slideChanged = !0, this.currentSlide = target_slide, this.autoUpdateZIndex && this.__updateSlidesZindex(), this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)), fast && this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)))
        }, p.next = function(checkLoop) {
            return checkLoop && !this.loop && this.index + 1 >= this.slidesCount ? void this.controller.bounce(10) : void this.gotoSlide(this.index + 1 >= this.slidesCount ? 0 : this.index + 1)
        }, p.previous = function(checkLoop) {
            return checkLoop && !this.loop && this.index - 1 < 0 ? void this.controller.bounce(-10) : void this.gotoSlide(this.index - 1 < 0 ? this.slidesCount - 1 : this.index - 1)
        }, p.setupSwipe = function() {
            this.swipeControl = new averta.TouchSwipe(this.$element), this.swipeControl.swipeType = "h" === this.dir ? "horizontal" : "vertical";
            var that = this;
            this.swipeControl.onSwipe = "h" === this.dir ? function(status) {
                that.horizSwipeMove(status)
            } : function(status) {
                that.vertSwipeMove(status)
            }
        }, p.vertSwipeMove = function(status) {
            var phase = status.phase;
            if ("start" === phase) this.controller.stop(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));
            else if ("move" === phase && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveY) < this.cont_size / 2)) this.controller.drag(status.moveY), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));
            else if ("end" === phase || "cancel" === phase) {
                var speed = status.distanceY / status.duration * 50 / 3,
                    speedh = Math.abs(status.distanceY / status.duration * 50 / 3);
                Math.abs(speed) > .1 && Math.abs(speed) >= speedh ? (this.controller.push(-speed), speed > this.controller.options.snappingMinSpeed && this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status))) : (this.controller.cancel(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status)))
            }
        }, p.horizSwipeMove = function(status) {
            var phase = status.phase;
            if ("start" === phase) this.controller.stop(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START, status));
            else if ("move" === phase && (!this.loop || Math.abs(this.currentSlide.position - this.controller.value + status.moveX) < this.cont_size / 2)) this.controller.drag(status.moveX), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE, status));
            else if ("end" === phase || "cancel" === phase) {
                var speed = status.distanceX / status.duration * 50 / 3,
                    speedv = Math.abs(status.distanceY / status.duration * 50 / 3);
                Math.abs(speed) > .1 && Math.abs(speed) >= speedv ? (this.controller.push(-speed), speed > this.controller.options.snappingMinSpeed && this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END, status))) : (this.controller.cancel(), this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL, status)))
            }
        }, p.setSize = function(width, height, hard) {
            if (this.lastWidth !== width || height !== this.lastHeight || hard) {
                this.$element.width(width).height(height);
                for (var i = 0; i < this.slidesCount; ++i) this.slides[i].setSize(width, height, hard);
                this.__width = width, this.__height = height, this.__created && (this.__locateSlides(), this.cont_size = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing), this.loop || (this.controller._max_value = this.cont_size), this.controller.options.snapsize = this[this.__dimension] + this.spacing, this.controller.changeTo(this.currentSlide.position, !1, null, null, !1), this.controller.cancel(), this.lastWidth = width, this.lastHeight = height)
            }
        }, p.create = function(index) {
            this.__created = !0, this.index = Math.min(index || 0, this.slidesCount - 1), this.lastSnap = this.index, this.loop && (this.slides = this.__createLoopList()), this.normalMode = this.slidesCount <= this.options.viewNum;
            for (var i = 0; i < this.slidesCount; ++i) this.slides[i].create();
            this.__locateSlides(), this.controller.options.snapsize = this[this.__dimension] + this.spacing, this.loop || (this.controller._max_value = (this.slidesCount - 1) * (this[this.__dimension] + this.spacing)), this.gotoSlide(this.index, !0), this.options.swipe && (window._touch || this.options.mouseSwipe) && this.setupSwipe()
        }, p.destroy = function() {
            if (this.__created) {
                for (var i = 0; i < this.slidesCount; ++i) this.slides[i].destroy();
                this.slides = null, this.slideList = null, this.$element.remove(), this.controller.destroy(), this.controller = null
            }
        }, averta.EventDispatcher.extend(p), MSSlideController.registerView("basic", MSBasicView)
    }(jQuery),
    function() {
        "use strict";
        window.MSFadeView = function(options) {
            MSBasicView.call(this, options), this.$element.removeClass("ms-basic-view").addClass("ms-fade-view"), this.controller.renderCallback(this.__update, this)
        }, MSFadeView.extend(MSBasicView);
        var p = MSFadeView.prototype,
            _super = MSBasicView.prototype;
        p.__update = function(controller, value) {
            for (var slide, distance, cont_scroll = -value, i = 0; i < this.slidesCount; ++i) slide = this.slideList[i], distance = -cont_scroll - slide.position, this.__updateSlides(slide, distance)
        }, p.__updateSlides = function(slide, distance) {
            var value = Math.abs(distance / this[this.__dimension]);
            0 >= 1 - value ? slide.$element.css("opacity", 0).css("visibility", "hidden") : slide.$element.css("opacity", 1 - value).css("visibility", "")
        }, p.__locateSlides = function(move, start) {
            this.__updateViewList(), start = this.loop ? start || 0 : this.slides.indexOf(this.viewSlidesList[0]) * (this[this.__dimension] + this.spacing);
            for (var slide, l = this.viewSlidesList.length, i = 0; i !== l; i++) {
                var pos = start + i * this[this.__dimension];
                slide = this.viewSlidesList[i], slide.wakeup(), slide.position = pos
            }
            move !== !1 && this.controller.changeTo(this.slideList[this.index].position, !1, null, null, !1)
        }, p.__pushEnd = function() {
            var first_slide = this.slides.shift(),
                last_slide = this.slides[this.slidesCount - 2];
            this.slides.push(first_slide), first_slide.position = last_slide.position + this[this.__dimension]
        }, p.__pushStart = function() {
            var last_slide = this.slides.pop(),
                first_slide = this.slides[0];
            this.slides.unshift(last_slide), last_slide.position = first_slide.position - this[this.__dimension]
        }, p.create = function(index) {
            _super.create.call(this, index), this.spacing = 0, this.controller.options.minValidDist = 10
        }, MSSlideController.registerView("fade", MSFadeView)
    }(jQuery),
    function($) {
        "use strict";
        var BaseControl = function() {
                this.options = {
                    prefix: "ms-",
                    autohide: !0,
                    overVideo: !0,
                    customClass: null
                }
            },
            p = BaseControl.prototype;
        p.slideAction = function() {}, p.setup = function() {
            this.cont = this.options.insertTo ? $(this.options.insertTo) : this.slider.$controlsCont, this.options.overVideo || this._hideOnvideoStarts()
        }, p.checkHideUnder = function() {
            this.options.hideUnder && (this.needsRealign = !this.options.insetTo && ("left" === this.options.align || "right" === this.options.align) && this.options.inset === !1, $(window).on("resize", {
                that: this
            }, this.onResize), this.onResize())
        }, p.onResize = function(event) {
            var that = event && event.data.that || this,
                w = window.innerWidth;
            w <= that.options.hideUnder && !that.detached ? (that.hide(!0), that.detached = !0, that.onDetach()) : w >= that.options.hideUnder && that.detached && (that.detached = !1, that.visible(), that.onAppend())
        }, p.create = function() {
            this.options.autohide && (this.hide(!0), this.slider.$controlsCont.on("mouseenter", this._onMouseEnter.bind(this)).on("mouseleave", this._onMouseLeave.bind(this)).on("mousedown", this._onMouseDown.bind(this)), this.$element && this.$element.on("mouseenter", this._onMouseEnter.bind(this)).on("mouseleave", this._onMouseLeave.bind(this)).on("mousedown", this._onMouseDown.bind(this)), $(document).on("mouseup", this._onMouseUp.bind(this))), this.options.align && this.$element.addClass("ms-align-" + this.options.align), this.options.customClass && this.$element && this.$element.addClass(this.options.customClass)
        }, p._onMouseEnter = function() {
            this._disableAH || this.mdown || this.visible(), this.mleave = !1
        }, p._onMouseLeave = function() {
            this.mdown || this.hide(), this.mleave = !0
        }, p._onMouseDown = function() {
            this.mdown = !0
        }, p._onMouseUp = function() {
            this.mdown && this.mleave && this.hide(), this.mdown = !1
        }, p.onAppend = function() {
            this.needsRealign && this.slider._realignControls()
        }, p.onDetach = function() {
            this.needsRealign && this.slider._realignControls()
        }, p._hideOnvideoStarts = function() {
            var that = this;
            this.slider.api.addEventListener(MSSliderEvent.VIDEO_PLAY, function() {
                that._disableAH = !0, that.hide()
            }), this.slider.api.addEventListener(MSSliderEvent.VIDEO_CLOSE, function() {
                that._disableAH = !1, that.visible()
            })
        }, p.hide = function(fast) {
            if (fast) this.$element.css("opacity", 0), this.$element.css("display", "none");
            else {
                clearTimeout(this.hideTo);
                var $element = this.$element;
                this.hideTo = setTimeout(function() {
                    CTween.fadeOut($element, 400, !1)
                }, 20)
            }
            this.$element.addClass("ms-ctrl-hide")
        }, p.visible = function() {
            this.detached || (clearTimeout(this.hideTo), this.$element.css("display", ""), CTween.fadeIn(this.$element, 400, !1), this.$element.removeClass("ms-ctrl-hide"))
        }, p.destroy = function() {
            this.options && this.options.hideUnder && $(window).off("resize", this.onResize)
        }, window.BaseControl = BaseControl
    }(jQuery),
    function($) {
        "use strict";
        var MSArrows = function(options) {
            BaseControl.call(this), $.extend(this.options, options)
        };
        MSArrows.extend(BaseControl);
        var p = MSArrows.prototype,
            _super = BaseControl.prototype;
        p.setup = function() {
            var that = this;
            this.$next = $("<div></div>").addClass(this.options.prefix + "nav-next").on("click", function() {
                that.slider.api.next(!0)
            }), this.$prev = $("<div></div>").addClass(this.options.prefix + "nav-prev").on("click", function() {
                that.slider.api.previous(!0)
            }), _super.setup.call(this), this.cont.append(this.$next), this.cont.append(this.$prev), this.checkHideUnder()
        }, p.hide = function(fast) {
            return fast ? (this.$prev.css("opacity", 0).css("display", "none"), void this.$next.css("opacity", 0).css("display", "none")) : (CTween.fadeOut(this.$prev, 400, !1), CTween.fadeOut(this.$next, 400, !1), this.$prev.addClass("ms-ctrl-hide"), void this.$next.addClass("ms-ctrl-hide"))
        }, p.visible = function() {
            this.detached || (CTween.fadeIn(this.$prev, 400), CTween.fadeIn(this.$next, 400), this.$prev.removeClass("ms-ctrl-hide").css("display", ""), this.$next.removeClass("ms-ctrl-hide").css("display", ""))
        }, p.destroy = function() {
            _super.destroy(), this.$next.remove(), this.$prev.remove()
        }, window.MSArrows = MSArrows, MSSlideController.registerControl("arrows", MSArrows)
    }(jQuery),
    function($) {
        "use strict";
        var MSThumblist = function(options) {
            BaseControl.call(this), this.options.dir = "h", this.options.wheel = "v" === options.dir, this.options.arrows = !1, this.options.speed = 17, this.options.align = null, this.options.inset = !1, this.options.margin = 10, this.options.space = 10, this.options.width = 100, this.options.height = 100, this.options.type = "thumbs", this.options.hover = !1, $.extend(this.options, options), this.thumbs = [], this.index_count = 0, this.__dimen = "h" === this.options.dir ? "width" : "height", this.__alignsize = "h" === this.options.dir ? "height" : "width", this.__jdimen = "h" === this.options.dir ? "outerWidth" : "outerHeight", this.__pos = "h" === this.options.dir ? "left" : "top", this.click_enable = !0
        };
        MSThumblist.extend(BaseControl);
        var p = MSThumblist.prototype,
            _super = BaseControl.prototype;
        p.setup = function() {
            if (this.$element = $("<div></div>").addClass(this.options.prefix + "thumb-list"), "tabs" === this.options.type && this.$element.addClass(this.options.prefix + "tabs"), this.$element.addClass("ms-dir-" + this.options.dir), _super.setup.call(this), this.$element.appendTo(this.slider.$controlsCont === this.cont ? this.slider.$element : this.cont), this.$thumbscont = $("<div></div>").addClass("ms-thumbs-cont").appendTo(this.$element), this.options.arrows) {
                var that = this;
                this.$fwd = $("<div></div>").addClass("ms-thumblist-fwd").appendTo(this.$element).on("click", function() {
                    that.controller.push(-15)
                }), this.$bwd = $("<div></div>").addClass("ms-thumblist-bwd").appendTo(this.$element).on("click", function() {
                    that.controller.push(15)
                })
            }
            if (!this.options.insetTo && this.options.align) {
                var align = this.options.align;
                this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.detach().prependTo(this.slider.$element).css({
                    "margin-bottom": this.options.margin,
                    position: "relative"
                }) : "bottom" === align ? this.$element.css({
                    "margin-top": this.options.margin,
                    position: "relative"
                }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align()), "v" === this.options.dir ? this.$element.width(this.options.width) : this.$element.height(this.options.height)
            }
            this.checkHideUnder()
        }, p.align = function() {
            if (!this.detached) {
                var align = this.options.align,
                    pos = this.slider.reserveSpace(align, this.options[this.__alignsize] + 2 * this.options.margin);
                this.$element.css(align, -pos - this.options[this.__alignsize] - this.options.margin)
            }
        }, p.slideAction = function(slide) {
            var thumb_ele = slide.$element.find(".ms-thumb"),
                that = this,
                thumb_frame = $("<div></div>").addClass("ms-thumb-frame").append(thumb_ele).append($('<div class="ms-thumb-ol"></div>')).on(this.options.hover ? "hover" : "click", function() {
                    that.changeSlide(thumb_frame)
                });
            if (this.options.align && thumb_frame.width(this.options.width - ("v" === this.options.dir && "tabs" === this.options.type ? 12 : 0)).height(this.options.height).css("margin-" + ("v" === this.options.dir ? "bottom" : "right"), this.options.space), thumb_frame[0].index = this.index_count++, this.$thumbscont.append(thumb_frame), this.options.fillMode && thumb_ele.is("img")) {
                var aligner = new window.MSAligner(this.options.fillMode, thumb_frame, thumb_ele);
                thumb_ele[0].aligner = aligner, thumb_ele.one("load", function() {
                    var $this = $(this);
                    $this[0].aligner.init($this.width(), $this.height()), $this[0].aligner.align()
                }).each($.jqLoadFix)
            }
            window.MSBrowserInfo.msie && thumb_ele.on("dragstart", function(event) {
                event.preventDefault()
            }), this.thumbs.push(thumb_frame)
        }, p.create = function() {
            _super.create.call(this), this.__translate_end = window._css3d ? " translateZ(0px)" : "", this.controller = new Controller(0, 0, {
                snappingMinSpeed: 2,
                friction: (100 - .5 * this.options.speed) / 100
            }), this.controller.renderCallback("h" === this.options.dir ? this._hMove : this._vMove, this);
            var that = this;
            this.resize_listener = function() {
                that.__resize()
            }, $(window).on("resize", this.resize_listener), this.thumbSize = this.thumbs[0][this.__jdimen](!0), this.setupSwipe(), this.__resize();
            var that = this;
            this.options.wheel && (this.wheellistener = function(event) {
                var e = window.event || event.orginalEvent || event,
                    delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
                return that.controller.push(10 * -delta), !1
            }, window.MSBrowserInfo.mozilla ? this.$element[0].addEventListener("DOMMouseScroll", this.wheellistener) : this.$element.on("mousewheel", this.wheellistener)), this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.slider.api.addEventListener(MSSliderEvent.HARD_UPDATE, this.realignThumbs, this), this.cindex = this.slider.api.index(), this.select(this.thumbs[this.cindex])
        }, p._hMove = function(controller, value) {
            return this.__contPos = value, window._cssanim ? void(this.$thumbscont[0].style[window._jcsspfx + "Transform"] = "translateX(" + -value + "px)" + this.__translate_end) : void(this.$thumbscont[0].style.left = -value + "px")
        }, p._vMove = function(controller, value) {
            return this.__contPos = value, window._cssanim ? void(this.$thumbscont[0].style[window._jcsspfx + "Transform"] = "translateY(" + -value + "px)" + this.__translate_end) : void(this.$thumbscont[0].style.top = -value + "px")
        }, p.setupSwipe = function() {
            this.swipeControl = new averta.TouchSwipe(this.$element), this.swipeControl.swipeType = "h" === this.options.dir ? "horizontal" : "vertical";
            var that = this;
            this.swipeControl.onSwipe = "h" === this.options.dir ? function(status) {
                that.horizSwipeMove(status)
            } : function(status) {
                that.vertSwipeMove(status)
            }
        }, p.vertSwipeMove = function(status) {
            if (!this.dTouch) {
                var phase = status.phase;
                if ("start" === phase) this.controller.stop();
                else if ("move" === phase) this.controller.drag(status.moveY);
                else if ("end" === phase || "cancel" === phase) {
                    var speed = Math.abs(status.distanceY / status.duration * 50 / 3);
                    speed > .1 ? this.controller.push(-status.distanceY / status.duration * 50 / 3) : (this.click_enable = !0, this.controller.cancel())
                }
            }
        }, p.horizSwipeMove = function(status) {
            if (!this.dTouch) {
                var phase = status.phase;
                if ("start" === phase) this.controller.stop(), this.click_enable = !1;
                else if ("move" === phase) this.controller.drag(status.moveX);
                else if ("end" === phase || "cancel" === phase) {
                    var speed = Math.abs(status.distanceX / status.duration * 50 / 3);
                    speed > .1 ? this.controller.push(-status.distanceX / status.duration * 50 / 3) : (this.click_enable = !0, this.controller.cancel())
                }
            }
        }, p.update = function() {
            var nindex = this.slider.api.index();
            this.cindex !== nindex && (null != this.cindex && this.unselect(this.thumbs[this.cindex]), this.cindex = nindex, this.select(this.thumbs[this.cindex]), this.dTouch || this.updateThumbscroll())
        }, p.realignThumbs = function() {
            this.$element.find(".ms-thumb").each(function(index, thumb) {
                thumb.aligner && thumb.aligner.align()
            })
        }, p.updateThumbscroll = function() {
            var pos = this.thumbSize * this.cindex;
            if (0 / 0 == this.controller.value && (this.controller.value = 0), pos - this.controller.value < 0) return void this.controller.gotoSnap(this.cindex, !0);
            if (pos + this.thumbSize - this.controller.value > this.$element[this.__dimen]()) {
                var first_snap = this.cindex - Math.floor(this.$element[this.__dimen]() / this.thumbSize) + 1;
                return void this.controller.gotoSnap(first_snap, !0)
            }
        }, p.changeSlide = function(thumb) {
            this.click_enable && this.cindex !== thumb[0].index && this.slider.api.gotoSlide(thumb[0].index)
        }, p.unselect = function(ele) {
            ele.removeClass("ms-thumb-frame-selected")
        }, p.select = function(ele) {
            ele.addClass("ms-thumb-frame-selected")
        }, p.__resize = function() {
            var size = this.$element[this.__dimen]();
            if (this.ls !== size) {
                this.ls = size, this.thumbSize = this.thumbs[0][this.__jdimen](!0);
                var len = this.slider.api.count() * this.thumbSize;
                this.$thumbscont[0].style[this.__dimen] = len + "px", size >= len ? (this.dTouch = !0, this.controller.stop(), this.$thumbscont[0].style[this.__pos] = .5 * (size - len) + "px", this.$thumbscont[0].style[window._jcsspfx + "Transform"] = "") : (this.dTouch = !1, this.click_enable = !0, this.$thumbscont[0].style[this.__pos] = "", this.controller._max_value = len - size, this.controller.options.snapsize = this.thumbSize, this.updateThumbscroll())
            }
        }, p.destroy = function() {
            _super.destroy(), this.options.wheel && (window.MSBrowserInfo.mozilla ? this.$element[0].removeEventListener("DOMMouseScroll", this.wheellistener) : this.$element.off("mousewheel", this.wheellistener), this.wheellistener = null), $(window).off("resize", this.resize_listener), this.$element.remove(), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this)
        }, window.MSThumblist = MSThumblist, MSSlideController.registerControl("thumblist", MSThumblist)
    }(jQuery),
    function($) {
        "use strict";
        var MSBulltes = function(options) {
            BaseControl.call(this), this.options.dir = "h", this.options.inset = !0, this.options.margin = 10, this.options.space = 10, $.extend(this.options, options), this.bullets = []
        };
        MSBulltes.extend(BaseControl);
        var p = MSBulltes.prototype,
            _super = BaseControl.prototype;
        p.setup = function() {
            if (_super.setup.call(this), this.$element = $("<div></div>").addClass(this.options.prefix + "bullets").addClass("ms-dir-" + this.options.dir).appendTo(this.cont), this.$bullet_cont = $("<div></div>").addClass("ms-bullets-count").appendTo(this.$element), !this.options.insetTo && this.options.align) {
                var align = this.options.align;
                this.options.inset && this.$element.css(align, this.options.margin)
            }
            this.checkHideUnder()
        }, p.create = function() {
            _super.create.call(this);
            var that = this;
            this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.cindex = this.slider.api.index();
            for (var i = 0; i < this.slider.api.count(); ++i) {
                var bullet = $("<div></div>").addClass("ms-bullet");
                bullet[0].index = i, bullet.on("click", function() {
                    that.changeSlide(this.index)
                }), this.$bullet_cont.append(bullet), this.bullets.push(bullet), "h" === this.options.dir ? bullet.css("margin", this.options.space / 2) : bullet.css("margin", this.options.space)
            }
            "h" === this.options.dir ? this.$element.width(bullet.outerWidth(!0) * this.slider.api.count()) : this.$element.css("margin-top", -this.$element.outerHeight(!0) / 2), this.select(this.bullets[this.cindex])
        }, p.update = function() {
            var nindex = this.slider.api.index();
            this.cindex !== nindex && (null != this.cindex && this.unselect(this.bullets[this.cindex]), this.cindex = nindex, this.select(this.bullets[this.cindex]))
        }, p.changeSlide = function(index) {
            this.cindex !== index && this.slider.api.gotoSlide(index)
        }, p.unselect = function(ele) {
            ele.removeClass("ms-bullet-selected")
        }, p.select = function(ele) {
            ele.addClass("ms-bullet-selected")
        }, p.destroy = function() {
            _super.destroy(), this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.$element.remove()
        }, window.MSBulltes = MSBulltes, MSSlideController.registerControl("bullets", MSBulltes)
    }(jQuery),
    function($) {
        "use strict";
        var MSScrollbar = function(options) {
            BaseControl.call(this), this.options.dir = "h", this.options.autohide = !0, this.options.width = 4, this.options.color = "#3D3D3D", this.options.margin = 10, $.extend(this.options, options), this.__dimen = "h" === this.options.dir ? "width" : "height", this.__jdimen = "h" === this.options.dir ? "outerWidth" : "outerHeight", this.__pos = "h" === this.options.dir ? "left" : "top", this.__translate_end = window._css3d ? " translateZ(0px)" : "", this.__translate_start = "h" === this.options.dir ? " translateX(" : "translateY("
        };
        MSScrollbar.extend(BaseControl);
        var p = MSScrollbar.prototype,
            _super = BaseControl.prototype;
        p.setup = function() {
            if (this.$element = $("<div></div>").addClass(this.options.prefix + "sbar").addClass("ms-dir-" + this.options.dir), _super.setup.call(this), this.$element.appendTo(this.slider.$controlsCont === this.cont ? this.slider.$element : this.cont), this.$bar = $("<div></div>").addClass(this.options.prefix + "bar").appendTo(this.$element), this.slider.options.loop && (this.disable = !0, this.$element.remove()), "v" === this.options.dir ? this.$bar.width(this.options.width) : this.$bar.height(this.options.width), this.$bar.css("background-color", this.options.color), !this.options.insetTo && this.options.align) {
                this.$element.css("v" === this.options.dir ? {
                    right: "auto",
                    left: "auto"
                } : {
                    top: "auto",
                    bottom: "auto"
                });
                var align = this.options.align;
                this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.prependTo(this.slider.$element).css({
                    "margin-bottom": this.options.margin,
                    position: "relative"
                }) : "bottom" === align ? this.$element.css({
                    "margin-top": this.options.margin,
                    position: "relative"
                }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align())
            }
            this.checkHideUnder()
        }, p.align = function() {
            if (!this.detached) {
                var align = this.options.align,
                    pos = this.slider.reserveSpace(align, 2 * this.options.margin + this.options.width);
                this.$element.css(align, -pos - this.options.margin - this.options.width)
            }
        }, p.create = function() {
            if (!this.disable) {
                this.scroller = this.slider.api.scroller, this.slider.api.view.addEventListener(MSViewEvents.SCROLL, this._update, this), this.slider.api.addEventListener(MSSliderEvent.RESIZE, this._resize, this), this._resize(), this.options.autohide && this.$bar.css("opacity", "0")
            }
        }, p._resize = function() {
            this.vdimen = this.$element[this.__dimen](), this.bar_dimen = this.slider.api.view["__" + this.__dimen] * this.vdimen / this.scroller._max_value, this.$bar[this.__dimen](this.bar_dimen)
        }, p._update = function() {
            var value = this.scroller.value * (this.vdimen - this.bar_dimen) / this.scroller._max_value;
            if (this.lvalue !== value) {
                if (this.lvalue = value, this.options.autohide) {
                    clearTimeout(this.hto), this.$bar.css("opacity", "1");
                    var that = this;
                    this.hto = setTimeout(function() {
                        that.$bar.css("opacity", "0")
                    }, 150)
                }
                return 0 > value ? void(this.$bar[0].style[this.__dimen] = this.bar_dimen + value + "px") : (value > this.vdimen - this.bar_dimen && (this.$bar[0].style[this.__dimen] = this.vdimen - value + "px"), window._cssanim ? void(this.$bar[0].style[window._jcsspfx + "Transform"] = this.__translate_start + value + "px)" + this.__translate_end) : void(this.$bar[0].style[this.__pos] = value + "px"))
            }
        }, p.destroy = function() {
            _super.destroy(), this.slider.api.view.removeEventListener(MSViewEvents.SCROLL, this._update, this), this.slider.api.removeEventListener(MSSliderEvent.RESIZE, this._resize, this), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.$element.remove()
        }, window.MSScrollbar = MSScrollbar, MSSlideController.registerControl("scrollbar", MSScrollbar)
    }(jQuery),
    function($) {
        "use strict";
        var MSTimerbar = function(options) {
            BaseControl.call(this), this.options.autohide = !1, this.options.width = 4, this.options.color = "#FFFFFF", this.options.inset = !0, this.options.margin = 0, $.extend(this.options, options)
        };
        MSTimerbar.extend(BaseControl);
        var p = MSTimerbar.prototype,
            _super = BaseControl.prototype;
        p.setup = function() {
            if (_super.setup.call(this), this.$element = $("<div></div>").addClass(this.options.prefix + "timerbar"), _super.setup.call(this), this.$element.appendTo(this.slider.$controlsCont === this.cont ? this.slider.$element : this.cont), this.$bar = $("<div></div>").addClass("ms-time-bar").appendTo(this.$element), "v" === this.options.dir ? (this.$bar.width(this.options.width), this.$element.width(this.options.width)) : (this.$bar.height(this.options.width), this.$element.height(this.options.width)), this.$bar.css("background-color", this.options.color), !this.options.insetTo && this.options.align) {
                this.$element.css({
                    top: "auto",
                    bottom: "auto"
                });
                var align = this.options.align;
                this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.prependTo(this.slider.$element).css({
                    "margin-bottom": this.options.margin,
                    position: "relative"
                }) : "bottom" === align ? this.$element.css({
                    "margin-top": this.options.margin,
                    position: "relative"
                }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align())
            }
            this.checkHideUnder()
        }, p.align = function() {
            if (!this.detached) {
                var align = this.options.align,
                    pos = this.slider.reserveSpace(align, 2 * this.options.margin + this.options.width);
                this.$element.css(align, -pos - this.options.margin - this.options.width)
            }
        }, p.create = function() {
            _super.create.call(this), this.slider.api.addEventListener(MSSliderEvent.WAITING, this._update, this), this._update()
        }, p._update = function() {
            this.$bar[0].style.width = this.slider.api._delayProgress + "%"
        }, p.destroy = function() {
            _super.destroy(), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.slider.api.removeEventListener(MSSliderEvent.WAITING, this._update, this), this.$element.remove()
        }, window.MSTimerbar = MSTimerbar, MSSlideController.registerControl("timebar", MSTimerbar)
    }(jQuery),
    function($) {
        "use strict";
        var MSCircleTimer = function(options) {
            BaseControl.call(this), this.options.color = "#A2A2A2", this.options.stroke = 10, this.options.radius = 4, this.options.autohide = !1, $.extend(this.options, options)
        };
        MSCircleTimer.extend(BaseControl);
        var p = MSCircleTimer.prototype,
            _super = BaseControl.prototype;
        p.setup = function() {
            return _super.setup.call(this), this.$element = $("<div></div>").addClass(this.options.prefix + "ctimer").appendTo(this.cont), this.$canvas = $("<canvas></canvas>").addClass("ms-ctimer-canvas").appendTo(this.$element), this.$bar = $("<div></div>").addClass("ms-ctimer-bullet").appendTo(this.$element), this.$canvas[0].getContext ? (this.ctx = this.$canvas[0].getContext("2d"), this.prog = 0, this.__w = 2 * (this.options.radius + this.options.stroke / 2), this.$canvas[0].width = this.__w, this.$canvas[0].height = this.__w, void this.checkHideUnder()) : (this.destroy(), void(this.disable = !0))
        }, p.create = function() {
            if (!this.disable) {
                _super.create.call(this), this.slider.api.addEventListener(MSSliderEvent.WAITING, this._update, this);
                var that = this;
                this.$element.on("click", function() {
                    that.slider.api.paused ? that.slider.api.resume() : that.slider.api.pause()
                }), this._update()
            }
        }, p._update = function() {
            var that = this;
            $(this).stop(!0).animate({
                prog: .01 * this.slider.api._delayProgress
            }, {
                duration: 200,
                step: function() {
                    that._draw()
                }
            })
        }, p._draw = function() {
            this.ctx.clearRect(0, 0, this.__w, this.__w), this.ctx.beginPath(), this.ctx.arc(.5 * this.__w, .5 * this.__w, this.options.radius, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * this.prog, !1), this.ctx.strokeStyle = this.options.color, this.ctx.lineWidth = this.options.stroke, this.ctx.stroke()
        }, p.destroy = function() {
            _super.destroy(), this.disable || ($(this).stop(!0), this.slider.api.removeEventListener(MSSliderEvent.WAITING, this._update, this), this.$element.remove())
        }, window.MSCircleTimer = MSCircleTimer, MSSlideController.registerControl("circletimer", MSCircleTimer)
    }(jQuery),
    function($) {
        "use strict";
        window.MSSlideInfo = function(options) {
            BaseControl.call(this, options), this.options.autohide = !1, this.options.align = null, this.options.inset = !1, this.options.margin = 10, this.options.size = 100, this.options.dir = "h", $.extend(this.options, options), this.data_list = []
        }, MSSlideInfo.fadeDuratation = 400, MSSlideInfo.extend(BaseControl);
        var p = MSSlideInfo.prototype,
            _super = BaseControl.prototype;
        p.setup = function() {
            if (this.$element = $("<div></div>").addClass(this.options.prefix + "slide-info").addClass("ms-dir-" + this.options.dir), _super.setup.call(this), this.$element.appendTo(this.slider.$controlsCont === this.cont ? this.slider.$element : this.cont), !this.options.insetTo && this.options.align) {
                var align = this.options.align;
                this.options.inset ? this.$element.css(align, this.options.margin) : "top" === align ? this.$element.prependTo(this.slider.$element).css({
                    "margin-bottom": this.options.margin,
                    position: "relative"
                }) : "bottom" === align ? this.$element.css({
                    "margin-top": this.options.margin,
                    position: "relative"
                }) : (this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.align()), "v" === this.options.dir ? this.$element.width(this.options.size) : this.$element.css("min-height", this.options.size)
            }
            this.checkHideUnder()
        }, p.align = function() {
            if (!this.detached) {
                var align = this.options.align,
                    pos = this.slider.reserveSpace(align, this.options.size + 2 * this.options.margin);
                this.$element.css(align, -pos - this.options.size - this.options.margin)
            }
        }, p.slideAction = function(slide) {
            var info_ele = $(slide.$element.find(".ms-info"));
            info_ele.detach(), this.data_list[slide.index] = info_ele
        }, p.create = function() {
            _super.create.call(this), this.slider.api.addEventListener(MSSliderEvent.CHANGE_START, this.update, this), this.cindex = this.slider.api.index(), this.switchEle(this.data_list[this.cindex])
        }, p.update = function() {
            var nindex = this.slider.api.index();
            this.switchEle(this.data_list[nindex]), this.cindex = nindex
        }, p.switchEle = function(ele) {
            if (this.current_ele) {
                this.current_ele[0].tween && this.current_ele[0].tween.stop(!0), this.current_ele[0].tween = CTween.animate(this.current_ele, MSSlideInfo.fadeDuratation, {
                    opacity: 0
                }, {
                    complete: function() {
                        this.detach(), this[0].tween = null, ele.css("position", "relative")
                    },
                    target: this.current_ele
                }), ele.css("position", "absolute")
            }
            this.__show(ele)
        }, p.__show = function(ele) {
            ele.appendTo(this.$element).css("opacity", "0"), this.current_ele && ele.height(Math.max(ele.height(), this.current_ele.height())), clearTimeout(this.tou), this.tou = setTimeout(function() {
                CTween.fadeIn(ele, MSSlideInfo.fadeDuratation), ele.css("height", "")
            }, MSSlideInfo.fadeDuratation), ele[0].tween && ele[0].tween.stop(!0), this.current_ele = ele
        }, p.destroy = function() {
            _super.destroy(), clearTimeout(this.tou), this.current_ele && this.current_ele[0].tween && this.current_ele[0].tween.stop("true"), this.$element.remove(), this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE, this.align, this), this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START, this.update, this)
        }, MSSlideController.registerControl("slideinfo", MSSlideInfo)
    }(jQuery),
    function($, document, window) {
        var PId = 0,
            $window = $(window),
            $doc = $(document);
        if (window.MasterSlider) {
            var StartOnAppear = function(slider) {
                this.PId = PId++, this.slider = slider, this.$slider = slider.$element, this.slider.options.startOnAppear && (slider.holdOn(), $doc.ready(this.init.bind(this)))
            };
            StartOnAppear.name = "MSStartOnAppear";
            var p = StartOnAppear.prototype;
            p.init = function() {
                this.slider.api;
                $window.on("scroll.soa" + this.PId, this._onScroll.bind(this)).trigger("scroll")
            }, p._onScroll = function() {
                var vpBottom = $window.scrollTop() + $window.height(),
                    top = this.$slider.offset().top;
                vpBottom > top && ($window.off("scroll.soa" + this.PId), this.slider.release())
            }, p.destroy = function() {}, MasterSlider.registerPlugin(StartOnAppear)
        }
    }(jQuery, document, window),
    function($, window) {
        "use strict";
        if (window.MSReady)
            for (var i = 0, l = MSReady.length; i !== l; i++) MSReady[i].call(null, $)
    }(jQuery, window, document),
    function($) {
        $(window).on("vc_reload", function() {
            if (window.MSReady)
                for (var i = 0, l = MSReady.length; i !== l; i++) MSReady[i].call(null, $)
        }), window.msCli = function(f) {
            f = f || "pause";
            var m = masterslider_instances;
            for (var i in m) m[i].api[f]()
        }
    }(jQuery);