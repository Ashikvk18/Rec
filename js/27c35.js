var Wiky = {
    version: 0.95,
    blocks: null,
    rules: {
        all: ["Wiky.rules.pre", "Wiky.rules.nonwikiblocks", "Wiky.rules.wikiblocks", "Wiky.rules.post", ],
        pre: [{
            rex: /(\r?\n)/g,
            tmplt: "\xB6"
        }, ],
        post: [{
            rex: /(^\xB6)|(\xB6$)/g,
            tmplt: ""
        }, {
            rex: /@([0-9]+)@/g,
            tmplt: function($0, $1) {
                return Wiky.restore($1);
            }
        }, {
            rex: /\xB6/g,
            tmplt: "\n"
        }],
        nonwikiblocks: [{
            rex: /\\([%])/g,
            tmplt: function($0, $1) {
                return Wiky.store($1);
            }
        }, {
            rex: /\[(?:\{([^}]*)\})?(?:\(([^)]*)\))?%(.*?)%\]/g,
            tmplt: function($0, $1, $2, $3) {
                return ":p]" + Wiky.store("<pre" + ($2 ? (" lang=\"x-" + Wiky.attr($2) + "\"") : "") + Wiky.style($1) + ">" + Wiky.apply($3, $2 ? Wiky.rules.lang[Wiky.attr($2)] : Wiky.rules.code) + "</pre>") + "[p:";
            }
        }],
        wikiblocks: ["Wiky.rules.nonwikiinlines", "Wiky.rules.escapes", {
            rex: /(?:^|\xB6)(={1,6})(.*?)[=]*(?=\xB6|$)/g,
            tmplt: function($0, $1, $2) {
                var h = $1.length;
                return ":p]\xB6<h" + h + ">" + $2 + "</h" + h + ">\xB6[p:";
            }
        }, {
            rex: /(?:^|\xB6)[-]{4}(?:\xB6|$)/g,
            tmplt: "\xB6<hr/>\xB6"
        }, {
            rex: /\\\\([ \xB6])/g,
            tmplt: "<br/>$1"
        }, {
            rex: /(^|\xB6)([*01aAiIg]*[\.*])[ ]/g,
            tmplt: function($0, $1, $2) {
                var state = $2.replace(/([*])/g, "u").replace(/([\.])/, "");
                return ":" + state + "]" + $1 + "[" + state + ":";
            }
        }, {
            rex: /(?:^|\xB6);[ ](.*?):[ ]/g,
            tmplt: "\xB6:l][l:$1:d][d:"
        }, {
            rex: /\[(?:\{([^}]*)\})?(?:\(([^)]*)\))?\"/g,
            tmplt: function($0, $1, $2) {
                return ":p]<blockquote" + Wiky.attr($2, "cite", 0) + Wiky.attr($2, "title", 1) + Wiky.style($1) + ">[p:";
            }
        }, {
            rex: /\"\]/g,
            tmplt: ":p]</blockquote>[p:"
        }, {
            rex: /\[(\{[^}]*\})?\|/g,
            tmplt: ":t]$1[r:"
        }, {
            rex: /\|\]/g,
            tmplt: ":r][t:"
        }, {
            rex: /\|\xB6[ ]?\|/g,
            tmplt: ":r]\xB6[r:"
        }, {
            rex: /\|/g,
            tmplt: ":c][c:"
        }, {
            rex: /^(.*)$/g,
            tmplt: "[p:$1:p]"
        }, {
            rex: /(([\xB6])([ \t\f\v\xB6]*?)){2,}/g,
            tmplt: ":p]$1[p:"
        }, {
            rex: /\[([01AIacdgilprtu]+)[:](.*?)[:]([01AIacdgilprtu]+)\]/g,
            tmplt: function($0, $1, $2, $3) {
                return Wiky.sectionRule($1 == undefined ? "" : $1, "", Wiky.apply($2, Wiky.rules.wikiinlines), !$3 ? "" : $3);
            }
        }, {
            rex: /\[[01AIacdgilprtu]+[:]|[:][01AIacdgilprtu]+\]/g,
            tmplt: ""
        }, {
            rex: /<td>(?:([0-9]*)[>])?([ ]?)(.*?)([ ]?)<\/td>/g,
            tmplt: function($0, $1, $2, $3, $4) {
                return "<td" + ($1 ? " colspan=\"" + $1 + "\"" : "") + ($2 == " " ? (" style=\"text-align:" + ($2 == $4 ? "center" : "right") + ";\"") : ($4 == " " ? " style=\"text-align:left;\"" : "")) + ">" + $2 + $3 + $4 + "</td>";
            }
        }, {
            rex: /<(p|table)>(?:\xB6)?(?:\{(.*?)\})/g,
            tmplt: function($0, $1, $2) {
                return "<" + $1 + Wiky.style($2) + ">";
            }
        }, {
            rex: /<p>([ \t\f\v\xB6]*?)<\/p>/g,
            tmplt: "$1"
        }, "Wiky.rules.shortcuts"],
        nonwikiinlines: [{
            rex: /%(?:\{([^}]*)\})?(?:\(([^)]*)\))?(.*?)%/g,
            tmplt: function($0, $1, $2, $3) {
                return Wiky.store("<code" + ($2 ? (" lang=\"x-" + Wiky.attr($2) + "\"") : "") + Wiky.style($1) + ">" + Wiky.apply($3, $2 ? Wiky.rules.lang[Wiky.attr($2)] : Wiky.rules.code) + "</code>");
            }
        }, {
            rex: /%(.*?)%/g,
            tmplt: function($0, $1) {
                return Wiky.store("<code>" + Wiky.apply($2, Wiky.rules.code) + "</code>");
            }
        }],
        wikiinlines: [{
            rex: /\*([^*]+)\*/g,
            tmplt: "<strong>$1</strong>"
        }, {
            rex: /_([^_]+)_/g,
            tmplt: "<em>$1</em>"
        }, {
            rex: /\^([^^]+)\^/g,
            tmplt: "<sup>$1</sup>"
        }, {
            rex: /~([^~]+)~/g,
            tmplt: "<sub>$1</sub>"
        }, {
            rex: /\(-(.+?)-\)/g,
            tmplt: "<del>$1</del>"
        }, {
            rex: /\?([^ \t\f\v\xB6]+)\((.+)\)\?/g,
            tmplt: "<abbr title=\"$2\">$1</abbr>"
        }, {
            rex: /\[(?:\{([^}]*)\})?[Ii]ma?ge?\:([^ ,\]]*)(?:[, ]([^\]]*))?\]/g,
            tmplt: function($0, $1, $2, $3) {
                return Wiky.store("<img" + Wiky.style($1) + " src=\"" + $2 + "\" alt=\"" + ($3 ? $3 : $2) + "\" title=\"" + ($3 ? $3 : $2) + "\"/>");
            }
        }, {
            rex: /\[([^ ,]+)[, ]([^\]]*)\]/g,
            tmplt: function($0, $1, $2) {
                return Wiky.store("<a href=\"" + $1 + "\">" + $2 + "</a>");
            }
        }, {
            rex: /(((http(s?))\:\/\/)?[A-Za-z0-9\._\/~\-:]+\.(?:png|jpg|jpeg|gif|bmp))/g,
            tmplt: function($0, $1, $2) {
                return Wiky.store("<img src=\"" + $1 + "\" alt=\"" + $1 + "\"/>");
            }
        }, {
            rex: /((mailto\:|javascript\:|(news|file|(ht|f)tp(s?))\:\/\/)[A-Za-z0-9\.:_\/~%\-+&#?!=()@\x80-\xB5\xB7\xFF]+)/g,
            tmplt: "<a href=\"$1\">$1</a>"
        }],
        escapes: [{
            rex: /\\([|*_~\^])/g,
            tmplt: function($0, $1) {
                return Wiky.store($1);
            }
        }, {
            rex: /\\&/g,
            tmplt: "&amp;"
        }, {
            rex: /\\>/g,
            tmplt: "&gt;"
        }, {
            rex: /\\</g,
            tmplt: "&lt;"
        }],
        shortcuts: [{
            rex: /---/g,
            tmplt: "&#8212;"
        }, {
            rex: /--/g,
            tmplt: "&#8211;"
        }, {
            rex: /[\.]{3}/g,
            tmplt: "&#8230;"
        }, {
            rex: /<->/g,
            tmplt: "&#8596;"
        }, {
            rex: /<-/g,
            tmplt: "&#8592;"
        }, {
            rex: /->/g,
            tmplt: "&#8594;"
        }, ],
        code: [{
            rex: /&/g,
            tmplt: "&amp;"
        }, {
            rex: /</g,
            tmplt: "&lt;"
        }, {
            rex: />/g,
            tmplt: "&gt;"
        }],
        lang: {}
    },
    inverse: {
        all: ["Wiky.inverse.pre", "Wiky.inverse.nonwikiblocks", "Wiky.inverse.wikiblocks", "Wiky.inverse.post"],
        pre: [{
            rex: /(\r?\n)/g,
            tmplt: "\xB6"
        }],
        post: [{
            rex: /@([0-9]+)@/g,
            tmplt: function($0, $1) {
                return Wiky.restore($1);
            }
        }, {
            rex: /\xB6/g,
            tmplt: "\n"
        }],
        nonwikiblocks: [{
            rex: /<pre([^>]*)>(.*?)<\/pre>/mgi,
            tmplt: function($0, $1, $2) {
                return Wiky.store("[" + Wiky.invStyle($1) + Wiky.invAttr($1, ["lang"]).replace(/x\-/, "") + "%" + Wiky.apply($2, Wiky.hasAttr($1, "lang") ? Wiky.inverse.lang[Wiky.attrVal($1, "lang").substr(2)] : Wiky.inverse.code) + "%]");
            }
        }],
        wikiblocks: ["Wiky.inverse.nonwikiinlines", "Wiky.inverse.escapes", "Wiky.inverse.wikiinlines", {
            rex: /<h1>(.*?)<\/h1>/mgi,
            tmplt: "=$1="
        }, {
            rex: /<h2>(.*?)<\/h2>/mgi,
            tmplt: "==$1=="
        }, {
            rex: /<h3>(.*?)<\/h3>/mgi,
            tmplt: "===$1==="
        }, {
            rex: /<h4>(.*?)<\/h4>/mgi,
            tmplt: "====$1===="
        }, {
            rex: /<h5>(.*?)<\/h5>/mgi,
            tmplt: "=====$1====="
        }, {
            rex: /<h6>(.*?)<\/h6>/mgi,
            tmplt: "======$1======"
        }, {
            rex: /<(p|table)[^>]+(style=\"[^\"]*\")[^>]*>/mgi,
            tmplt: function($0, $1, $2) {
                return "<" + $1 + ">" + Wiky.invStyle($2);
            }
        }, {
            rex: /\xB6{2}<li/mgi,
            tmplt: "\xB6<li"
        }, {
            rex: /<li class=\"?([^ >\"]*)\"?[^>]*?>([^<]*)/mgi,
            tmplt: function($0, $1, $2) {
                return $1.replace(/u/g, "*").replace(/([01aAiIg])$/, "$1.") + " " + $2;
            }
        }, {
            rex: /(^|\xB6)<(u|o)l[^>]*?>\xB6/mgi,
            tmplt: "$1"
        }, {
            rex: /(<\/(?:dl|ol|ul|p)>[ \xB6]*<(?:p)>)/gi,
            tmplt: "\xB6\xB6"
        }, {
            rex: /<dt>(.*?)<\/dt>[ \f\n\r\t\v]*<dd>/mgi,
            tmplt: "; $1: "
        }, {
            rex: /<blockquote([^>]*)>/mgi,
            tmplt: function($0, $1) {
                return Wiky.store("[" + Wiky.invStyle($1) + Wiky.invAttr($1, ["cite", "title"]) + "\"");
            }
        }, {
            rex: /<\/blockquote>/mgi,
            tmplt: "\"]"
        }, {
            rex: /<td class=\"?lft\"?>\xB6*[ ]?|<\/tr>/mgi,
            tmplt: "|"
        }, {
            rex: /\xB6<tr(?:[^>]*?)>/mgi,
            tmplt: "\xB6"
        }, {
            rex: /<td colspan=\"([0-9]+)\"(?:[^>]*?)>/mgi,
            tmplt: "|$1>"
        }, {
            rex: /<td(?:[^>]*?)>/mgi,
            tmplt: "|"
        }, {
            rex: /<table>/mgi,
            tmplt: "["
        }, {
            rex: /<\/table>/mgi,
            tmplt: "]"
        }, {
            rex: /<tr(?:[^>]*?)>\xB6*|<\/td>\xB6*|<tbody>\xB6*|<\/tbody>/mgi,
            tmplt: ""
        }, {
            rex: /<hr\/?>/mgi,
            tmplt: "----"
        }, {
            rex: /<br\/?>/mgi,
            tmplt: "\\\\"
        }, {
            rex: /(<p>|<(d|o|u)l[^>]*>|<\/(dl|ol|ul|p)>|<\/(li|dd)>)/mgi,
            tmplt: ""
        }, "Wiky.inverse.shortcuts"],
        nonwikiinlines: [{
            rex: /<code>(.*?)<\/code>/g,
            tmplt: function($0, $1) {
                return Wiky.store("%" + Wiky.apply($1, Wiky.inverse["code"]) + "%");
            }
        }],
        wikiinlines: [{
            rex: /<strong[^>]*?>(.*?)<\/strong>/mgi,
            tmplt: "*$1*"
        }, {
            rex: /<b[^>]*?>(.*?)<\/b>/mgi,
            tmplt: "*$1*"
        }, {
            rex: /<em[^>]*?>(.*?)<\/em>/mgi,
            tmplt: "_$1_"
        }, {
            rex: /<i[^>]*?>(.*?)<\/i>/mgi,
            tmplt: "_$1_"
        }, {
            rex: /<sup[^>]*?>(.*?)<\/sup>/mgi,
            tmplt: "^$1^"
        }, {
            rex: /<sub[^>]*?>(.*?)<\/sub>/mgi,
            tmplt: "~$1~"
        }, {
            rex: /<del[^>]*?>(.*?)<\/del>/mgi,
            tmplt: "(-$1-)"
        }, {
            rex: /<abbr title=\"([^\"]*)\">(.*?)<\/abbr>/mgi,
            tmplt: "?$2($1)?"
        }, {
            rex: /<a href=\"([^\"]*)\"[^>]*?>(.*?)<\/a>/mgi,
            tmplt: function($0, $1, $2) {
                return $1 == $2 ? $1 : "[" + $1 + "," + $2 + "]";
            }
        }, {
            rex: /<img([^>]*)\/>/mgi,
            tmplt: function($0, $1) {
                var a = Wiky.attrVal($1, "alt"),
                    h = Wiky.attrVal($1, "src"),
                    t = Wiky.attrVal($1, "title"),
                    s = Wiky.attrVal($1, "style");
                return s || (t && h != t) ? ("[" + Wiky.invStyle($1) + "img:" + h + (t && ("," + t)) + "]") : h;
            }
        }, ],
        escapes: [{
            rex: /([|*_~%\^])/g,
            tmplt: "\\$1"
        }, {
            rex: /&amp;/g,
            tmplt: "\\&"
        }, {
            rex: /&gt;/g,
            tmplt: "\\>"
        }, {
            rex: /&lt;/g,
            tmplt: "\\<"
        }],
        shortcuts: [{
            rex: /&#8211;|\u2013/g,
            tmplt: "--"
        }, {
            rex: /&#8212;|\u2014/g,
            tmplt: "---"
        }, {
            rex: /&#8230;|\u2026/g,
            tmplt: "..."
        }, {
            rex: /&#8596;|\u2194/g,
            tmplt: "<->"
        }, {
            rex: /&#8592;|\u2190/g,
            tmplt: "<-"
        }, {
            rex: /&#8594;|\u2192/g,
            tmplt: "->"
        }],
        code: [{
            rex: /&amp;/g,
            tmplt: "&"
        }, {
            rex: /&lt;/g,
            tmplt: "<"
        }, {
            rex: /&gt;/g,
            tmplt: ">"
        }],
        lang: {}
    },
    toHtml: function(str) {
        Wiky.blocks = [];
        return Wiky.apply(str, Wiky.rules.all);
    },
    toWiki: function(str) {
        Wiky.blocks = [];
        return Wiky.apply(str, Wiky.inverse.all);
    },
    apply: function(str, rules) {
        if (str && rules)
            for (var i in rules) {
                if (typeof(rules[i]) == "string")
                    str = Wiky.apply(str, eval(rules[i]));
                else
                    str = str.replace(rules[i].rex, rules[i].tmplt);
            }
        return str;
    },
    store: function(str, unresolved) {
        return unresolved ? "@" + (Wiky.blocks.push(str) - 1) + "@" : "@" + (Wiky.blocks.push(str.replace(/@([0-9]+)@/g, function($0, $1) {
            return Wiky.restore($1);
        })) - 1) + "@";
    },
    restore: function(idx) {
        return Wiky.blocks[idx];
    },
    attr: function(str, name, idx) {
        var a = str && str.split(",")[idx || 0];
        return a ? (name ? (" " + name + "=\"" + a + "\"") : a) : "";
    },
    hasAttr: function(str, name) {
        return new RegExp(name + "=").test(str);
    },
    attrVal: function(str, name) {
        return str.replace(new RegExp("^.*?" + name + "=\"(.*?)\".*?$"), "$1");
    },
    invAttr: function(str, names) {
        var a = [],
            x;
        for (var i in names)
            if (str.indexOf(names[i] + "=") >= 0)
                a.push(str.replace(new RegExp("^.*?" + names[i] + "=\"(.*?)\".*?$"), "$1"));
        return a.length ? ("(" + a.join(",") + ")") : "";
    },
    style: function(str) {
        var s = str && str.split(/,|;/),
            p, style = "";
        for (var i in s) {
            p = s[i].split(":");
            if (p[0] == ">") style += "margin-left:4em;";
            else if (p[0] == "<") style += "margin-right:4em;";
            else if (p[0] == ">>") style += "float:right;";
            else if (p[0] == "<<") style += "float:left;";
            else if (p[0] == "=") style += "display:block;margin:0 auto;";
            else if (p[0] == "_") style += "text-decoration:underline;";
            else if (p[0] == "b") style += "border:solid 1px;";
            else if (p[0] == "c") style += "color:" + p[1] + ";";
            else if (p[0] == "C") style += "background:" + p[1] + ";";
            else if (p[0] == "w") style += "width:" + p[1] + ";";
            else style += p[0] + ":" + p[1] + ";";
        }
        return style ? " style=\"" + style + "\"" : "";
    },
    invStyle: function(str) {
        var s = /style=/.test(str) ? str.replace(/^.*?style=\"(.*?)\".*?$/, "$1") : "",
            p = s && s.split(";"),
            pi, prop = [];
        for (var i in p) {
            pi = p[i].split(":");
            if (pi[0] == "margin-left" && pi[1] == "4em") prop.push(">");
            else if (pi[0] == "margin-right" && pi[1] == "4em") prop.push("<");
            else if (pi[0] == "float" && pi[1] == "right") prop.push(">>");
            else if (pi[0] == "float" && pi[1] == "left") prop.push("<<");
            else if (pi[0] == "margin" && pi[1] == "0 auto") prop.push("=");
            else if (pi[0] == "display" && pi[1] == "block");
            else if (pi[0] == "text-decoration" && pi[1] == "underline") prop.push("_");
            else if (pi[0] == "border" && pi[1] == "solid 1px") prop.push("b");
            else if (pi[0] == "color") prop.push("c:" + pi[1]);
            else if (pi[0] == "background") prop.push("C:" + pi[1]);
            else if (pi[0] == "width") prop.push("w:" + pi[1]);
            else if (pi[0]) prop.push(pi[0] + ":" + pi[1]);
        }
        return prop.length ? ("{" + prop.join(",") + "}") : "";
    },
    sectionRule: function(fromLevel, style, content, toLevel) {
        var trf = {
            p_p: "<p>$1</p>",
            p_u: "<p>$1</p><ul$3>",
            p_o: "<p>$1</p><ol$3>",
            u_p: "<li$2>$1</li></ul>",
            u_c: "<li$2>$1</li></ul></td>",
            u_r: "<li$2>$1</li></ul></td></tr>",
            uu_p: "<li$2>$1</li></ul></li></ul>",
            uo_p: "<li$2>$1</li></ol></li></ul>",
            uuu_p: "<li$2>$1</li></ul></li></ul></li></ul>",
            uou_p: "<li$2>$1</li></ul></li></ol></li></ul>",
            uuo_p: "<li$2>$1</li></ol></li></ul></li></ul>",
            uoo_p: "<li$2>$1</li></ol></li></ol></li></ul>",
            u_u: "<li$2>$1</li>",
            uu_u: "<li$2>$1</li></ul></li>",
            uo_u: "<li$2>$1</li></ol></li>",
            uuu_u: "<li$2>$1</li></ul></li></ul></li>",
            uou_u: "<li$2>$1</li></ul></li></ol></li>",
            uuo_u: "<li$2>$1</li></ol></li></ul></li>",
            uoo_u: "<li$2>$1</li></ol></li></ol></li>",
            u_uu: "<li$2>$1<ul$3>",
            u_o: "<li$2>$1</li></ul><ol$3>",
            uu_o: "<li$2>$1</li></ul></li></ul><ol$3>",
            uo_o: "<li$2>$1</li></ol></li></ul><ol$3>",
            uuu_o: "<li$2>$1</li></ul></li></ul></li></ul><ol$3>",
            uou_o: "<li$2>$1</li></ul></li></ol></li></ul><ol$3>",
            uuo_o: "<li$2>$1</li></ol></li></ul></li></ul><ol$3>",
            uoo_o: "<li$2>$1</li></ol></li></ol></li></ul><ol$3>",
            u_uo: "<li$2>$1<ol$3>",
            o_p: "<li$2>$1</li></ol>",
            oo_p: "<li$2>$1</li></ol></li></ol>",
            ou_p: "<li$2>$1</li></ul></li></ol>",
            ooo_p: "<li$2>$1</li></ol></li></ol>",
            ouo_p: "<li$2>$1</li></ol></li></ul></li></ol>",
            oou_p: "<li$2>$1</li></ul></li></ol></li></ol>",
            ouu_p: "<li$2>$1</li></ul></li></ul></li></ol>",
            o_u: "<li$2>$1</li></ol><ul$3>",
            oo_u: "<li$2>$1</li></ol></li></ol><ul$3>",
            ou_u: "<li$2>$1</li></ul></li></ol><ul$3>",
            ooo_u: "<li$2>$1</li></ol></li></ol></li></ol><ul$3>",
            ouo_u: "<li$2>$1</li></ol></li></ul></li></ol><ul$3>",
            oou_u: "<li$2>$1</li></ul></li></ol></li></ol><ul$3>",
            ouu_u: "<li$2>$1</li></ul></li></ul></li></ol><ul$3>",
            o_ou: "<li$2>$1<ul$3>",
            o_o: "<li$2>$1</li>",
            oo_o: "<li$2>$1</li></ol></li>",
            ou_o: "<li$2>$1</li></ul></li>",
            ooo_o: "<li$2>$1</li></ol></li></ol></li>",
            ouo_o: "<li$2>$1</li></ol></li></ul></li>",
            oou_o: "<li$2>$1</li></ul></li></ol></li>",
            ouu_o: "<li$2>$1</li></ul></li></ul></li>",
            o_oo: "<li$2>$1<ol$3>",
            l_d: "<dt>$1</dt>",
            d_l: "<dd>$1</dd>",
            d_u: "<dd>$1</dd></dl><ul>",
            d_o: "<dd>$1</dd></dl><ol>",
            p_l: "<p>$1</p><dl>",
            u_l: "<li$2>$1</li></ul><dl>",
            o_l: "<li$2>$1</li></ol><dl>",
            uu_l: "<li$2>$1</li></ul></li></ul><dl>",
            uo_l: "<li$2>$1</li></ol></li></ul><dl>",
            ou_l: "<li$2>$1</li></ul></li></ol><dl>",
            oo_l: "<li$2>$1</li></ol></li></ol><dl>",
            d_p: "<dd>$1</dd></dl>",
            p_t: "<p>$1</p><table>",
            p_r: "<p>$1</p></td></tr>",
            p_c: "<p>$1</p></td>",
            t_p: "</table><p>$1</p>",
            r_r: "<tr><td>$1</td></tr>",
            r_p: "<tr><td><p>$1</p>",
            r_c: "<tr><td>$1</td>",
            r_u: "<tr><td>$1<ul>",
            c_p: "<td><p>$1</p>",
            c_r: "<td>$1</td></tr>",
            c_c: "<td>$1</td>",
            u_t: "<li$2>$1</li></ul><table>",
            o_t: "<li$2>$1</li></ol><table>",
            d_t: "<dd>$1</dd></dl><table>",
            t_u: "</table><p>$1</p><ul>",
            t_o: "</table><p>$1</p><ol>",
            t_l: "</table><p>$1</p><dl>"
        };
        var type = {
            "0": "decimal-leading-zero",
            "1": "decimal",
            "a": "lower-alpha",
            "A": "upper-alpha",
            "i": "lower-roman",
            "I": "upper-roman",
            "g": "lower-greek"
        };
        var from = "",
            to = "",
            maxlen = Math.max(fromLevel.length, toLevel.length),
            sync = true,
            sectiontype = type[toLevel.charAt(toLevel.length - 1)],
            transition;
        for (var i = 0; i < maxlen; i++)
            if (fromLevel.charAt(i + 1) != toLevel.charAt(i + 1) || !sync || i == maxlen - 1) {
                from += fromLevel.charAt(i) == undefined ? " " : fromLevel.charAt(i);
                to += toLevel.charAt(i) == undefined ? " " : toLevel.charAt(i);
                sync = false;
            }
        transition = (from + "_" + to).replace(/([01AIagi])/g, "o");
        return !trf[transition] ? ("?(" + transition + ")") : trf[transition].replace(/\$2/, " class=\"" + fromLevel + "\"").replace(/\$3/, !sectiontype ? "" : (" style=\"list-style-type:" + sectiontype + ";\"")).replace(/\$1/, content).replace(/<p><\/p>/, "");
    }
};
Date.CultureInfo = {
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    amDesignator: "AM",
    pmDesignator: "PM",
    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    dateElementOrder: "mdy",
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy"
    },
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,
        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,
        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|aft(er)?|from|hence)/i,
        subtract: /^(\-|bef(ore)?|ago)/i,
        yesterday: /^yes(terday)?/i,
        today: /^t(od(ay)?)?/i,
        tomorrow: /^tom(orrow)?/i,
        now: /^n(ow)?/i,
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^mn|min(ute)?s?/i,
        hour: /^h(our)?s?/i,
        week: /^w(eek)?s?/i,
        month: /^m(onth)?s?/i,
        day: /^d(ay)?s?/i,
        year: /^y(ear)?s?/i,
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a|p)/i
    },
    timezones: {
        UTC: "-000",
        GMT: "-000",
        EST: "-0500",
        EDT: "-0400",
        CST: "-0600",
        CDT: "-0500",
        MST: "-0700",
        MDT: "-0600",
        PST: "-0800",
        PDT: "-0700"
    }
};
(function() {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo;
    $P.clearTime = function() {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    };
    $P.setTimeToNow = function() {
        var n = new Date();
        this.setHours(n.getHours());
        this.setMinutes(n.getMinutes());
        this.setSeconds(n.getSeconds());
        this.setMilliseconds(n.getMilliseconds());
        return this;
    };
    $D.today = function() {
        return new Date().clearTime();
    };
    $D.compare = function(date1, date2) {
        if (isNaN(date1) || isNaN(date2)) {
            throw new Error(date1 + " - " + date2);
        } else if (date1 instanceof Date && date2 instanceof Date) {
            return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
        } else {
            throw new TypeError(date1 + " - " + date2);
        }
    };
    $D.equals = function(date1, date2) {
        return (date1.compareTo(date2) === 0);
    };
    $D.getMonthNumberFromName = function(name) {
        var n = $C.monthNames,
            m = $C.abbreviatedMonthNames,
            s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) {
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
                return i;
            }
        }
        return -1;
    };
    $D.getDayNumberFromName = function(name) {
        var n = $C.dayNames,
            m = $C.abbreviatedDayNames,
            o = $C.shortestDayNames,
            s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) {
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s) {
                return i;
            }
        }
        return -1;
    };
    $D.isLeapYear = function(year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    };
    $D.getDaysInMonth = function(year, month) {
        return [31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };
    $D.getTimezoneOffset = function(s) {
        return $C.timezones[s.toUpperCase()];
    };
    $D.getTimezoneAbbreviation = function(offset) {
        var n = $C.timezones,
            p;
        for (var i = 0; i < n.length; i++) {
            if (n[i] === offset) {
                return n[i];
            }
        }
        return null;
    };
    $P.clone = function() {
        return new Date(this.getTime());
    };
    $P.compareTo = function(date) {
        return Date.compare(this, date);
    };
    $P.equals = function(date) {
        return Date.equals(this, date);
    };
    $P.between = function(start, end) {
        var t = this.getTime();
        return t >= start.getTime() && t <= end.getTime();
    };
    $P.addMilliseconds = function(value) {
        this.setMilliseconds(this.getMilliseconds() + value);
        return this;
    };
    $P.addSeconds = function(value) {
        return this.addMilliseconds(value * 1000);
    };
    $P.addMinutes = function(value) {
        return this.addMilliseconds(value * 60000);
    };
    $P.addHours = function(value) {
        return this.addMilliseconds(value * 3600000);
    };
    $P.addDays = function(value) {
        return this.addMilliseconds(value * 86400000);
    };
    $P.addWeeks = function(value) {
        return this.addDays(value * 7);
    };
    $P.addMonths = function(value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
        return this;
    };
    $P.addYears = function(value) {
        return this.addMonths(value * 12);
    };
    $P.add = function(config) {
        if (typeof config == "number") {
            this._orient = config;
            return this;
        }
        var x = config;
        if (x.millisecond || x.milliseconds) {
            this.addMilliseconds(x.millisecond || x.milliseconds);
        }
        if (x.second || x.seconds) {
            this.addSeconds(x.second || x.seconds);
        }
        if (x.minute || x.minutes) {
            this.addMinutes(x.minute || x.minutes);
        }
        if (x.hour || x.hours) {
            this.addHours(x.hour || x.hours);
        }
        if (x.week || x.weeks) {
            this.addWeeks(x.week || x.weeks);
        }
        if (x.month || x.months) {
            this.addMonths(x.month || x.months);
        }
        if (x.year || x.years) {
            this.addYears(x.year || x.years);
        }
        if (x.day || x.days) {
            this.addDays(x.day || x.days);
        }
        return this;
    };
    $D._validate = function(n, min, max, name) {
        if (typeof n == "undefined") {
            return false;
        } else if (typeof n != "number") {
            throw new TypeError(n + " is not a Number.");
        } else if (n < min || n > max) {
            throw new RangeError(n + " is not a valid value for " + name + ".");
        }
        return true;
    };
    $D.validateMillisecond = function(value) {
        return $D._validate(value, 0, 999, "milliseconds");
    };
    $D.validateSecond = function(value) {
        return $D._validate(value, 0, 59, "seconds");
    };
    $D.validateMinute = function(value) {
        return $D._validate(value, 0, 59, "minutes");
    };
    $D.validateHour = function(value) {
        return $D._validate(value, 0, 23, "hours");
    };
    $D.validateDay = function(value, year, month) {
        return $D._validate(value, 1, $D.getDaysInMonth(year, month), "days");
    };
    $D.validateMonth = function(value) {
        return $D._validate(value, 0, 11, "months");
    };
    $D.validateYear = function(value) {
        return $D._validate(value, 0, 9999, "years");
    };
    $P.set = function(config) {
        if ($D.validateMillisecond(config.millisecond)) {
            this.addMilliseconds(config.millisecond - this.getMilliseconds());
        }
        if ($D.validateSecond(config.second)) {
            this.addSeconds(config.second - this.getSeconds());
        }
        if ($D.validateMinute(config.minute)) {
            this.addMinutes(config.minute - this.getMinutes());
        }
        if ($D.validateHour(config.hour)) {
            this.addHours(config.hour - this.getHours());
        }
        if ($D.validateMonth(config.month)) {
            this.addMonths(config.month - this.getMonth());
        }
        if ($D.validateYear(config.year)) {
            this.addYears(config.year - this.getFullYear());
        }
        if ($D.validateDay(config.day, this.getFullYear(), this.getMonth())) {
            this.addDays(config.day - this.getDate());
        }
        if (config.timezone) {
            this.setTimezone(config.timezone);
        }
        if (config.timezoneOffset) {
            this.setTimezoneOffset(config.timezoneOffset);
        }
        return this;
    };
    $P.moveToFirstDayOfMonth = function() {
        return this.set({
            day: 1
        });
    };
    $P.moveToLastDayOfMonth = function() {
        return this.set({
            day: $D.getDaysInMonth(this.getFullYear(), this.getMonth())
        });
    };
    $P.moveToNthOccurrence = function(dayOfWeek, occurrence) {
        var shift = 0;
        if (occurrence) {
            if (occurrence > 0) {
                shift = occurrence - 1;
            } else if (occurrence == -1) {
                return this.moveToLastDayOfMonth().moveToDayOfWeek(dayOfWeek, -1);
            }
        }
        return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
    };
    $P.moveToDayOfWeek = function(dayOfWeek, orient) {
        var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;
        return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
    };
    $P.moveToMonth = function(month, orient) {
        var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
        return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
    };
    $P.getDayOfYear = function() {
        return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / 86400000);
    };
    $P.getWeekOfYear = function(firstDayOfWeek) {
        var y = this.getFullYear(),
            m = this.getMonth(),
            d = this.getDate();
        var dow = firstDayOfWeek || $C.firstDayOfWeek;
        var offset = 7 + 1 - new Date(y, 0, 1).getDay();
        if (offset == 8) {
            offset = 1;
        }
        var daynum = (($D.UTC(y, m, d, 0, 0, 0) - $D.UTC(y, 0, 1, 0, 0, 0)) / 86400000) + 1;
        var w = Math.floor((daynum - offset + 7) / 7);
        if (w === dow) {
            y--;
            var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
            if (prevOffset == 2 || prevOffset == 8) {
                w = 53;
            } else {
                w = 52;
            }
        }
        return w;
    };
    $P.getTimezone = function() {
        return $D.getTimezoneAbbreviation(this.getUTCOffset());
    };
    $P.setTimezoneOffset = function(s) {
        var here = this.getTimezoneOffset(),
            there = Number(s) * -6 / 10;
        return this.addMinutes(there - here);
    };
    $P.setTimezone = function(s) {
        return this.setTimezoneOffset($D.getTimezoneOffset(s));
    };
    $P.hasDaylightSavingTime = function() {
        return (Date.today().set({
            month: 0,
            day: 1
        }).getTimezoneOffset() !== Date.today().set({
            month: 6,
            day: 1
        }).getTimezoneOffset());
    };
    $P.isDaylightSavingTime = function() {
        return (this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({
            month: 6,
            day: 1
        }).getTimezoneOffset());
    };
    $P.getUTCOffset = function() {
        var n = this.getTimezoneOffset() * -10 / 6,
            r;
        if (n < 0) {
            r = (n - 10000).toString();
            return r[0] + r.substr(2);
        } else {
            r = (n + 10000).toString();
            return "+" + r.substr(1);
        }
    };
    $P.getElapsed = function(date) {
        return (date || new Date()) - this;
    };
    $P._toString = $P.toString;
    $P.toString = function(format) {
        var x = this;
        var p = function p(s) {
            return s < 10 ? '0' + s : s;
        };
        return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(format) {
            switch (format) {
                case "hh":
                    return p(x.getHours() < 13 ? (x.getHours() === 0 ? 12 : x.getHours()) : (x.getHours() - 12));
                case "h":
                    return x.getHours() < 13 ? (x.getHours() === 0 ? 12 : x.getHours()) : (x.getHours() - 12);
                case "HH":
                    return p(x.getHours());
                case "H":
                    return x.getHours();
                case "mm":
                    return p(x.getMinutes());
                case "m":
                    return x.getMinutes();
                case "ss":
                    return p(x.getSeconds());
                case "s":
                    return x.getSeconds();
                case "yyyy":
                    return x.getFullYear();
                case "yy":
                    return x.getFullYear().toString().substring(2, 4);
                case "dddd":
                    return $C.dayNames[x.getDay()];
                case "ddd":
                    return $C.abbreviatedDayNames[x.getDay()];
                case "dd":
                    return p(x.getDate());
                case "d":
                    return x.getDate().toString();
                case "MMMM":
                    return $C.monthNames[x.getMonth()];
                case "MMM":
                    return $C.abbreviatedMonthNames[x.getMonth()];
                case "MM":
                    return p((x.getMonth() + 1));
                case "M":
                    return x.getMonth() + 1;
                case "t":
                    return x.getHours() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);
                case "tt":
                    return x.getHours() < 12 ? $C.amDesignator : $C.pmDesignator;
                case "zzz":
                case "zz":
                case "z":
                    return "";
            }
        }) : this._toString();
    };
}());
(function() {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo,
        $N = Number.prototype,
        _isSecond = false;
    $P._orient = +1;
    $P._nth = null;
    $P._is = false;
    $N._dateElement = "day";
    $P.next = function() {
        this._orient = +1;
        return this;
    };
    $D.next = function() {
        return $D.today().next();
    };
    $P.last = $P.prev = $P.previous = function() {
        this._orient = -1;
        return this;
    };
    $D.last = $D.prev = $D.previous = function() {
        return $D.today().last();
    };
    $P.is = function() {
        this._is = true;
        return this;
    };
    $P.at = function(time) {
        return (typeof time === "string") ? $D.parse(this.toShortDateString() + " " + time) : this.set(time);
    };
    $P.weekday = function() {
        if (this._is) {
            this._is = false;
            return (!this.is().sat() && !this.is().sun());
        }
    };
    $N.fromNow = $N.after = function(date) {
        var c = {};
        c[this._dateElement] = this;
        return ((!date) ? new Date() : date.clone()).add(c);
    };
    $N.ago = $N.before = function(date) {
        var c = {};
        c[this._dateElement] = this * -1;
        return ((!date) ? new Date() : date.clone()).add(c);
    };
    var dx = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),
        mx = ("january february march april may june july august september october november december").split(/\s/),
        px = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),
        nth = ("final first second third fourth fifth").split(/\s/),
        de;
    var df = function(n) {
        return function() {
            if (this._is) {
                this._is = false;
                return this.getDay() == n;
            }
            if (this._nth !== null) {
                if (this._isSecond) {
                    this.addSeconds(this._orient * -1);
                }
                this._isSecond = false;
                var ntemp = this._nth;
                this._nth = null;
                var temp = this.clone().moveToLastDayOfMonth();
                this.moveToNthOccurrence(n, ntemp);
                if (this > temp) {
                    throw new RangeError($D.getDayName(n) + " does not occur " + ntemp + " times in the month of " + $D.getMonthName(temp.getMonth()) + " " + temp.getFullYear() + ".");
                }
                return this;
            }
            return this.moveToDayOfWeek(n, this._orient);
        };
    };
    var sdf = function(n) {
        return function() {
            var t = $D.today(),
                shift = n - t.getDay();
            if (n === 0 && $C.firstDayOfWeek === 1 && t.getDay() !== 0) {
                shift = shift + 7;
            }
            return t.addDays(shift);
        };
    };
    for (var i = 0; i < dx.length; i++) {
        $D[dx[i].toUpperCase()] = $D[dx[i].toUpperCase().substring(0, 3)] = i;
        $D[dx[i]] = $D[dx[i].substring(0, 3)] = sdf(i);
        $P[dx[i]] = $P[dx[i].substring(0, 3)] = df(i);
    }
    var mf = function(n) {
        return function() {
            if (this._is) {
                this._is = false;
                return this.getMonth() === n;
            }
            return this.moveToMonth(n, this._orient);
        };
    };
    var smf = function(n) {
        return function() {
            return $D.today().set({
                month: n,
                day: 1
            });
        };
    };
    for (var j = 0; j < mx.length; j++) {
        $D[mx[j].toUpperCase()] = $D[mx[j].toUpperCase().substring(0, 3)] = j;
        $D[mx[j]] = $D[mx[j].substring(0, 3)] = smf(j);
        $P[mx[j]] = $P[mx[j].substring(0, 3)] = mf(j);
    }
    var ef = function(j) {
        return function() {
            if (this._isSecond) {
                this._isSecond = false;
                return this;
            }
            if (j.substring(j.length - 1) != "s") {
                j += "s";
            }
            return this["add" + j](this._orient);
        };
    };
    var nf = function(n) {
        return function() {
            this._dateElement = n;
            return this;
        };
    };
    for (var k = 0; k < px.length; k++) {
        de = px[k].toLowerCase();
        $P[de] = $P[de + "s"] = ef(px[k]);
        $N[de] = $N[de + "s"] = nf(de);
    }
    var nthfn = function(n) {
        return function(dayOfWeek) {
            if (dayOfWeek || dayOfWeek === 0) {
                return this.moveToNthOccurrence(dayOfWeek, n);
            }
            this._nth = n;
            if (n === 2 && (dayOfWeek === undefined || dayOfWeek === null)) {
                this._isSecond = true;
                return this.addSeconds(this._orient);
            }
            return this;
        };
    };
    for (var l = 0; l < nth.length; l++) {
        $P[nth[l]] = (l === 0) ? nthfn(-1) : nthfn(l);
    }
    $P.toJSONString = function() {
        return this.toString("yyyy-MM-ddThh:mm:ssZ");
    };
    $P.toShortDateString = function() {
        return this.toString($C.formatPatterns.shortDate);
    };
    $P.toLongDateString = function() {
        return this.toString($C.formatPatterns.longDate);
    };
    $P.toShortTimeString = function() {
        return this.toString($C.formatPatterns.shortTime);
    };
    $P.toLongTimeString = function() {
        return this.toString($C.formatPatterns.longTime);
    };
    $P.getOrdinal = function() {
        switch (this.getDate()) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th";
        }
    };
}());
(function() {
    Date.Parsing = {
        Exception: function(s) {
            this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
        }
    };
    var $P = Date.Parsing;
    var _ = $P.Operators = {
        rtoken: function(r) {
            return function(s) {
                var mx = s.match(r);
                if (mx) {
                    return ([mx[0], s.substring(mx[0].length)]);
                } else {
                    throw new $P.Exception(s);
                }
            };
        },
        token: function(s) {
            return function(s) {
                return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
            };
        },
        stoken: function(s) {
            return _.rtoken(new RegExp("^" + s));
        },
        until: function(p) {
            return function(s) {
                var qx = [],
                    rx = null;
                while (s.length) {
                    try {
                        rx = p.call(this, s);
                    } catch (e) {
                        qx.push(rx[0]);
                        s = rx[1];
                        continue;
                    }
                    break;
                }
                return [qx, s];
            };
        },
        many: function(p) {
            return function(s) {
                var rx = [],
                    r = null;
                while (s.length) {
                    try {
                        r = p.call(this, s);
                    } catch (e) {
                        return [rx, s];
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        },
        optional: function(p) {
            return function(s) {
                var r = null;
                try {
                    r = p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                return [r[0], r[1]];
            };
        },
        not: function(p) {
            return function(s) {
                try {
                    p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                throw new $P.Exception(s);
            };
        },
        ignore: function(p) {
            return p ? function(s) {
                var r = null;
                r = p.call(this, s);
                return [null, r[1]];
            } : null;
        },
        product: function() {
            var px = arguments[0],
                qx = Array.prototype.slice.call(arguments, 1),
                rx = [];
            for (var i = 0; i < px.length; i++) {
                rx.push(_.each(px[i], qx));
            }
            return rx;
        },
        cache: function(rule) {
            var cache = {},
                r = null;
            return function(s) {
                try {
                    r = cache[s] = (cache[s] || rule.call(this, s));
                } catch (e) {
                    r = cache[s] = e;
                }
                if (r instanceof $P.Exception) {
                    throw r;
                } else {
                    return r;
                }
            };
        },
        any: function() {
            var px = arguments;
            return function(s) {
                var r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        r = null;
                    }
                    if (r) {
                        return r;
                    }
                }
                throw new $P.Exception(s);
            };
        },
        each: function() {
            var px = arguments;
            return function(s) {
                var rx = [],
                    r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        throw new $P.Exception(s);
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        },
        all: function() {
            var px = arguments,
                _ = _;
            return _.each(_.optional(px));
        },
        sequence: function(px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            if (px.length == 1) {
                return px[0];
            }
            return function(s) {
                var r = null,
                    q = null;
                var rx = [];
                for (var i = 0; i < px.length; i++) {
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        break;
                    }
                    rx.push(r[0]);
                    try {
                        q = d.call(this, r[1]);
                    } catch (ex) {
                        q = null;
                        break;
                    }
                    s = q[1];
                }
                if (!r) {
                    throw new $P.Exception(s);
                }
                if (q) {
                    throw new $P.Exception(q[1]);
                }
                if (c) {
                    try {
                        r = c.call(this, r[1]);
                    } catch (ey) {
                        throw new $P.Exception(r[1]);
                    }
                }
                return [rx, (r ? r[1] : s)];
            };
        },
        between: function(d1, p, d2) {
            d2 = d2 || d1;
            var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
            return function(s) {
                var rx = _fn.call(this, s);
                return [
                    [rx[0][0], r[0][2]], rx[1]
                ];
            };
        },
        list: function(p, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return (p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
        },
        set: function(px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return function(s) {
                var r = null,
                    p = null,
                    q = null,
                    rx = null,
                    best = [
                        [], s
                    ],
                    last = false;
                for (var i = 0; i < px.length; i++) {
                    q = null;
                    p = null;
                    r = null;
                    last = (px.length == 1);
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        continue;
                    }
                    rx = [
                        [r[0]], r[1]
                    ];
                    if (r[1].length > 0 && !last) {
                        try {
                            q = d.call(this, r[1]);
                        } catch (ex) {
                            last = true;
                        }
                    } else {
                        last = true;
                    }
                    if (!last && q[1].length === 0) {
                        last = true;
                    }
                    if (!last) {
                        var qx = [];
                        for (var j = 0; j < px.length; j++) {
                            if (i != j) {
                                qx.push(px[j]);
                            }
                        }
                        p = _.set(qx, d).call(this, q[1]);
                        if (p[0].length > 0) {
                            rx[0] = rx[0].concat(p[0]);
                            rx[1] = p[1];
                        }
                    }
                    if (rx[1].length < best[1].length) {
                        best = rx;
                    }
                    if (best[1].length === 0) {
                        break;
                    }
                }
                if (best[0].length === 0) {
                    return best;
                }
                if (c) {
                    try {
                        q = c.call(this, best[1]);
                    } catch (ey) {
                        throw new $P.Exception(best[1]);
                    }
                    best[1] = q[1];
                }
                return best;
            };
        },
        forward: function(gr, fname) {
            return function(s) {
                return gr[fname].call(this, s);
            };
        },
        replace: function(rule, repl) {
            return function(s) {
                var r = rule.call(this, s);
                return [repl, r[1]];
            };
        },
        process: function(rule, fn) {
            return function(s) {
                var r = rule.call(this, s);
                return [fn.call(this, r[0]), r[1]];
            };
        },
        min: function(min, rule) {
            return function(s) {
                var rx = rule.call(this, s);
                if (rx[0].length < min) {
                    throw new $P.Exception(s);
                }
                return rx;
            };
        }
    };
    var _generator = function(op) {
        return function() {
            var args = null,
                rx = [];
            if (arguments.length > 1) {
                args = Array.prototype.slice.call(arguments);
            } else if (arguments[0] instanceof Array) {
                args = arguments[0];
            }
            if (args) {
                for (var i = 0, px = args.shift(); i < px.length; i++) {
                    args.unshift(px[i]);
                    rx.push(op.apply(null, args));
                    args.shift();
                    return rx;
                }
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var gx = "optional not ignore cache".split(/\s/);
    for (var i = 0; i < gx.length; i++) {
        _[gx[i]] = _generator(_[gx[i]]);
    }
    var _vector = function(op) {
        return function() {
            if (arguments[0] instanceof Array) {
                return op.apply(null, arguments[0]);
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var vx = "each any all".split(/\s/);
    for (var j = 0; j < vx.length; j++) {
        _[vx[j]] = _vector(_[vx[j]]);
    }
}());
(function() {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo;
    var flattenAndCompact = function(ax) {
        var rx = [];
        for (var i = 0; i < ax.length; i++) {
            if (ax[i] instanceof Array) {
                rx = rx.concat(flattenAndCompact(ax[i]));
            } else {
                if (ax[i]) {
                    rx.push(ax[i]);
                }
            }
        }
        return rx;
    };
    $D.Grammar = {};
    $D.Translator = {
        hour: function(s) {
            return function() {
                this.hour = Number(s);
            };
        },
        minute: function(s) {
            return function() {
                this.minute = Number(s);
            };
        },
        second: function(s) {
            return function() {
                this.second = Number(s);
            };
        },
        meridian: function(s) {
            return function() {
                this.meridian = s.slice(0, 1).toLowerCase();
            };
        },
        timezone: function(s) {
            return function() {
                var n = s.replace(/[^\d\+\-]/g, "");
                if (n.length) {
                    this.timezoneOffset = Number(n);
                } else {
                    this.timezone = s.toLowerCase();
                }
            };
        },
        day: function(x) {
            var s = x[0];
            return function() {
                this.day = Number(s.match(/\d+/)[0]);
            };
        },
        month: function(s) {
            return function() {
                this.month = ((s.length == 3) ? $D.getMonthNumberFromName(s) : (Number(s) - 1));
            };
        },
        year: function(s) {
            return function() {
                var n = Number(s);
                this.year = ((s.length > 2) ? n : (n + (((n + 2000) < $C.twoDigitYearMax) ? 2000 : 1900)));
            };
        },
        rday: function(s) {
            return function() {
                switch (s) {
                    case "yesterday":
                        this.days = -1;
                        break;
                    case "tomorrow":
                        this.days = 1;
                        break;
                    case "today":
                        this.days = 0;
                        break;
                    case "now":
                        this.days = 0;
                        this.now = true;
                        break;
                }
            };
        },
        finishExact: function(x) {
            x = (x instanceof Array) ? x : [x];
            for (var i = 0; i < x.length; i++) {
                if (x[i]) {
                    x[i].call(this);
                }
            }
            var now = new Date();
            if ((this.hour || this.minute) && (!this.month && !this.year && !this.day)) {
                this.day = now.getDate();
            }
            if (!this.year) {
                this.year = now.getFullYear();
            }
            if (!this.month) {
                this.month = now.getMonth();
            }
            if (!this.day) {
                this.day = 1;
            }
            if (!this.hour) {
                this.hour = 0;
            }
            if (!this.minute) {
                this.minute = 0;
            }
            if (!this.second) {
                this.second = 0;
            }
            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            if (this.day > $D.getDaysInMonth(this.year, this.month)) {
                throw new RangeError(this.day + " is not a valid value for days.");
            }
            var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
            if (this.timezone) {
                r.set({
                    timezone: this.timezone
                });
            } else if (this.timezoneOffset) {
                r.set({
                    timezoneOffset: this.timezoneOffset
                });
            }
            return r;
        },
        finish: function(x) {
            x = (x instanceof Array) ? flattenAndCompact(x) : [x];
            if (x.length === 0) {
                return null;
            }
            for (var i = 0; i < x.length; i++) {
                if (typeof x[i] == "function") {
                    x[i].call(this);
                }
            }
            var today = $D.today();
            if (this.now && !this.unit && !this.operator) {
                return new Date();
            } else if (this.now) {
                today = new Date();
            }
            var expression = !!(this.days && this.days !== null || this.orient || this.operator);
            var gap, mod, orient;
            orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
            if (!this.now && "hour minute second".indexOf(this.unit) != -1) {
                today.setTimeToNow();
            }
            if (this.month || this.month === 0) {
                if ("year day hour minute second".indexOf(this.unit) != -1) {
                    this.value = this.month + 1;
                    this.month = null;
                    expression = true;
                }
            }
            if (!expression && this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (!this.month) {
                    this.month = temp.getMonth();
                }
                this.year = temp.getFullYear();
            }
            if (expression && this.weekday && this.unit != "month") {
                this.unit = "day";
                gap = ($D.getDayNumberFromName(this.weekday) - today.getDay());
                mod = 7;
                this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
            }
            if (this.month && this.unit == "day" && this.operator) {
                this.value = (this.month + 1);
                this.month = null;
            }
            if (this.value != null && this.month != null && this.year != null) {
                this.day = this.value * 1;
            }
            if (this.month && !this.day && this.value) {
                today.set({
                    day: this.value * 1
                });
                if (!expression) {
                    this.day = this.value * 1;
                }
            }
            if (!this.month && this.value && this.unit == "month" && !this.now) {
                this.month = this.value;
                expression = true;
            }
            if (expression && (this.month || this.month === 0) && this.unit != "year") {
                this.unit = "month";
                gap = (this.month - today.getMonth());
                mod = 12;
                this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                this.month = null;
            }
            if (!this.unit) {
                this.unit = "day";
            }
            if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
                this[this.unit + "s"] = this[this.unit + "s"] + ((this.operator == "add") ? 1 : -1) + (this.value || 0) * orient;
            } else if (this[this.unit + "s"] == null || this.operator != null) {
                if (!this.value) {
                    this.value = 1;
                }
                this[this.unit + "s"] = this.value * orient;
            }
            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            if (this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (temp.getMonth() !== today.getMonth()) {
                    this.month = temp.getMonth();
                }
            }
            if (this.month && !this.day) {
                this.day = 1;
            }
            if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
                return $D.jan().first().mon().addWeeks(this.value);
            }
            if (!expression && this.timezone && this.day && this.days) {
                this.day = this.days;
            }
            return (expression) ? today.add(this) : today.set(this);
        }
    };
    var _ = $D.Parsing.Operators,
        g = $D.Grammar,
        t = $D.Translator,
        _fn;
    g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
    g.timePartDelimiter = _.stoken(":");
    g.whiteSpace = _.rtoken(/^\s*/);
    g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
    var _C = {};
    g.ctoken = function(keys) {
        var fn = _C[keys];
        if (!fn) {
            var c = $C.regexPatterns;
            var kx = keys.split(/\s+/),
                px = [];
            for (var i = 0; i < kx.length; i++) {
                px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
            }
            fn = _C[keys] = _.any.apply(null, px);
        }
        return fn;
    };
    g.ctoken2 = function(key) {
        return _.rtoken($C.regexPatterns[key]);
    };
    g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
    g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
    g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
    g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
    g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
    g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
    g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
    g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
    g.hms = _.cache(_.sequence([g.H, g.mm, g.ss], g.timePartDelimiter));
    g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
    g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
    g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
    g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
    g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
    g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function(s) {
        return function() {
            this.weekday = s;
        };
    }));
    g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
    g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
    g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
    g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
    g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
    g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
    g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
    _fn = function() {
        return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
    };
    g.day = _fn(g.d, g.dd);
    g.month = _fn(g.M, g.MMM);
    g.year = _fn(g.yyyy, g.yy);
    g.orientation = _.process(g.ctoken("past future"), function(s) {
        return function() {
            this.orient = s;
        };
    });
    g.operator = _.process(g.ctoken("add subtract"), function(s) {
        return function() {
            this.operator = s;
        };
    });
    g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
    g.unit = _.process(g.ctoken("second minute hour day week month year"), function(s) {
        return function() {
            this.unit = s;
        };
    });
    g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function(s) {
        return function() {
            this.value = s.replace(/\D/g, "");
        };
    });
    g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
    _fn = function() {
        return _.set(arguments, g.datePartDelimiter);
    };
    g.mdy = _fn(g.ddd, g.month, g.day, g.year);
    g.ymd = _fn(g.ddd, g.year, g.month, g.day);
    g.dmy = _fn(g.ddd, g.day, g.month, g.year);
    g.date = function(s) {
        return ((g[$C.dateElementOrder] || g.mdy).call(this, s));
    };
    g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function(fmt) {
        if (g[fmt]) {
            return g[fmt];
        } else {
            throw $D.Parsing.Exception(fmt);
        }
    }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function(s) {
        return _.ignore(_.stoken(s));
    }))), function(rules) {
        return _.process(_.each.apply(null, rules), t.finishExact);
    });
    var _F = {};
    var _get = function(f) {
        return _F[f] = (_F[f] || g.format(f)[0]);
    };
    g.formats = function(fx) {
        if (fx instanceof Array) {
            var rx = [];
            for (var i = 0; i < fx.length; i++) {
                rx.push(_get(fx[i]));
            }
            return _.any.apply(null, rx);
        } else {
            return _get(fx);
        }
    };
    g._formats = g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyy", "Mdyy", "dMyy", "d"]);
    g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
    g.start = function(s) {
        try {
            var r = g._formats.call({}, s);
            if (r[1].length === 0) {
                return r;
            }
        } catch (e) {}
        return g._start.call({}, s);
    };
    $D._parse = $D.parse;
    $D.parse = function(s) {
        var r = null;
        if (!s) {
            return null;
        }
        if (s instanceof Date) {
            return s;
        }
        try {
            r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
        } catch (e) {
            return null;
        }
        return ((r[1].length === 0) ? r[0] : null);
    };
    $D.getParseFunction = function(fx) {
        var fn = $D.Grammar.formats(fx);
        return function(s) {
            var r = null;
            try {
                r = fn.call({}, s);
            } catch (e) {
                return null;
            }
            return ((r[1].length === 0) ? r[0] : null);
        };
    };
    $D.parseExact = function(s, fx) {
        return $D.getParseFunction(fx)(s);
    };
}());