!(function (e, t) {
    "function" == typeof define && define.amd ? define([], (function () {
        return t(e)
    })) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e)
})("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, (function (e) {
    "use strict";
    let t = "querySelector" in document && "addEventListener" in e && "requestAnimationFrame" in e && "closest" in e.Element.prototype,
        n = {
            ignore: "[data-scroll-ignore]",
            header: null,
            speed: 500,
            offset: 0,
            easing: "easeInOutCubic",
            customEasing: null,
            before: function () {
            },
            after: function () {
            }
        }, o = function () {
            for (let e = {}, t = 0, n = arguments.length; t < n; t++) {
                let o = arguments[t];
                !(function (t) {
                    for (let n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(o)
            }
            return e
        }, a = function (t) {
            return parseInt(e.getComputedStyle(t).height, 10)
        }, r = function (e) {
            "#" === e.charAt(0) && (e = e.substr(1));
            for (let t, n = String(e), o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) {
                if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                t >= 1 && t <= 31 || 127 == t || 0 === a && t >= 48 && t <= 57 || 1 === a && t >= 48 && t <= 57 && 45 === i ? r += "\\" + t.toString(16) + " " : r += t >= 128 || 45 === t || 95 === t || t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a)
            }
            return "#" + r
        }, i = function (e, t) {
            let n;
            return "easeInQuad" === e.easing && (n = t * t), "easeOutQuad" === e.easing && (n = t * (2 - t)), "easeInOutQuad" === e.easing && (n = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1), "easeInCubic" === e.easing && (n = t * t * t), "easeOutCubic" === e.easing && (n = --t * t * t + 1), "easeInOutCubic" === e.easing && (n = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (n = t * t * t * t), "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (n = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (n = t * t * t * t * t), "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (n = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (n = e.customEasing(t)), n || t
        }, u = function () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
        }, c = function (e, t, n) {
            let o = 0;
            if (e.offsetParent) do {
                o += e.offsetTop, e = e.offsetParent
            } while (e);
            return o = Math.max(o - t - n, 0)
        }, s = function (e) {
            return e ? a(e) + e.offsetTop : 0
        }, l = function (t, n, o) {
            o || (t.focus(), document.activeElement.id !== t.id && (t.setAttribute("tabindex", "-1"), t.focus(), t.style.outline = "none"), e.scrollTo(0, n))
        }, f = function (t) {
            return !!("matchMedia" in e && e.matchMedia("(prefers-reduced-motion)").matches)
        };
    return function (a, d) {
        let m, h, g, p, v, b, y, S = {};
        S.cancelScroll = function () {
            cancelAnimationFrame(y)
        }, S.animateScroll = function (t, a, r) {
            let f = o(m || n, r || {}), d = "[object Number]" === Object.prototype.toString.call(t),
                h = d || !t.tagName ? null : t;
            if (d || h) {
                let g = e.pageYOffset;
                f.header && !p && (p = document.querySelector(f.header)), v || (v = s(p));
                let b, y, E, I = d ? t : c(h, v, parseInt("function" == typeof f.offset ? f.offset() : f.offset, 10)),
                    O = I - g, A = u(), C = 0, w = function (n, o) {
                        let r = e.pageYOffset;
                        if (n == o || r == o || (g < o && e.innerHeight + r) >= A) return S.cancelScroll(), l(t, o, d), f.after(t, a), b = null, !0
                    }, Q = function (t) {
                        b || (b = t), C += t - b, y = C / parseInt(f.speed, 10), y = y > 1 ? 1 : y, E = g + O * i(f, y), e.scrollTo(0, Math.floor(E)), w(E, I) || (e.requestAnimationFrame(Q), b = t)
                    };
                0 === e.pageYOffset && e.scrollTo(0, 0), f.before(t, a), S.cancelScroll(), e.requestAnimationFrame(Q)
            }
        };
        let E = function (e) {
            h && (h.id = h.getAttribute("data-scroll-id"), S.animateScroll(h, g), h = null, g = null)
        }, I = function (t) {
            if (!f() && 0 === t.button && !t.metaKey && !t.ctrlKey && (g = t.target.closest(a)) && "a" === g.tagName.toLowerCase() && !t.target.closest(m.ignore) && g.hostname === e.location.hostname && g.pathname === e.location.pathname && /#/.test(g.href)) {
                let n;
                try {
                    n = r(decodeURIComponent(g.hash))
                } catch (e) {
                    n = r(g.hash)
                }
                if ("#" === n) {
                    t.preventDefault(), h = document.body;
                    let o = h.id ? h.id : "smooth-scroll-top";
                    return h.setAttribute("data-scroll-id", o), h.id = "", void(e.location.hash.substring(1) === o ? E() : e.location.hash = o)
                }
                h = document.querySelector(n), h && (h.setAttribute("data-scroll-id", h.id), h.id = "", g.hash === e.location.hash && (t.preventDefault(), E()))
            }
        }, O = function (e) {
            b || (b = setTimeout((function () {
                b = null, v = s(p)
            }), 66))
        };
        return S.destroy = function () {
            m && (document.removeEventListener("click", I, !1), e.removeEventListener("resize", O, !1), S.cancelScroll(), m = null, h = null, g = null, p = null, v = null, b = null, y = null)
        }, S.init = function (a) {
            t && (S.destroy(), m = o(n, a || {}), p = m.header ? document.querySelector(m.header) : null, v = s(p), document.addEventListener("click", I, !1), e.addEventListener("hashchange", E, !1), p && e.addEventListener("resize", O, !1))
        }, S.init(d), S
    }
}));

$(document).ready(function () {
    $(".button-collapse").sideNav({
        closeOnClick: true
    });
    $("#fullpage").fullpage({
        responsiveWidth: 0,
        responsiveSlides: true,
        navigation: true,
        navigationPosition: 'right',
        anchors: ['homeAnchor', 'aboutWTMAnchor', 'aboutHerHackAnchor', 'prizesAnchor', 'herRegistrationAnchor', 'herSponsorsAnchor']
    });
    $('select').material_select();
    $('.carousel').carousel({fullWidth: true, noWrap: false});
    $(window).on('hashchange',function(){
        let animationName = 'animated fadeInLeft';
        let animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd webkitAnimationEnd';
        $('.contentBox').addClass(animationName).one(animationEnd, function(){
            $('.contentBox').removeClass(animationName);
        });

    });
    $('.carousel').click(()=>{
        console.log('carousel mofos !');
    });
    $('.carousel-item').click(()=>{
        console.log('carousel item clicked !');
    });
    $('#fname').click(()=>{
        console.log('fname clicked !')
    })

    let scroll = new SmoothScroll('a[href*="#"]');
});
function next() {
    console.log();
    $('.carousel').carousel('next', 1);
}
function callAPI(data){
    return new Promise ((res,rej)=>{
        $.ajax({
            url:'https://hackher.herokuapp.com/register',
            type:'POST',
            data:data,
            success:function (data) {
                res(data);
            },
            error:function () {
                rej(data);
            }
        })
    });
}
function register() {
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let regno = $('#reg').val();
    let gender = $('#dropdown').val();
    const $loading =$('#loading');
    $loading.addClass('la-animate');
    callAPI({fname,lname,email,phone,regno,gender}).then((data)=>{
        $loading.removeClass('la-animate');
        if(data.flag){
            let $regForm=$('#regForm');
            $regForm.before('<h2>Registration successful</h2>');
            $regForm.remove();
        }
        else {
            data.errors.split('+').map((err)=>{
                Materialize.toast(err,3000);
            });
        }
        console.log(data);
    }).catch(function () {
        $loading.removeClass('la-animate');
        Materialize.toast('Network connectivity error !',3000);
    })
}