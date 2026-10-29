/* Готика «Киберсигилизм»: шипастые углы на обложках, звезда-сигил между разделами, кнопка Order с шипами */
(function(){
  var G = 'html[data-style="goth"] ', NS = "http://www.w3.org/2000/svg";
  var seed = 11; function R(){ seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  /* лезвие: изогнутая линия, сужающаяся от основания к острию, как штрих тату-машинкой */
  function blade(x0, y0, x1, y1, bend, w, pow){
    var mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1;
    var cx = mx - dy / L * bend, cy = my + dx / L * bend, A = [], B = [], n = 18;
    for(var i = 0; i <= n; i++){
      var t = i / n, u = 1 - t;
      var px = u * u * x0 + 2 * u * t * cx + t * t * x1, py = u * u * y0 + 2 * u * t * cy + t * t * y1;
      var tx = 2 * u * (cx - x0) + 2 * t * (x1 - cx), ty = 2 * u * (cy - y0) + 2 * t * (y1 - cy), tl = Math.hypot(tx, ty) || 1;
      var ww = w * Math.pow(1 - t, pow || 1.4) * (i === 0 ? .6 : 1);
      A.push([px - ty / tl * ww, py + tx / tl * ww]); B.push([px + ty / tl * ww, py - tx / tl * ww]);
    }
    var d = "M" + A.map(function(p){ return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("L");
    d += "L" + B.reverse().map(function(p){ return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("L") + "Z";
    return { d: d, at: function(t){ var u = 1 - t; return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1]; } };
  }
  function cornerSigil(){
    return [blade(4, 4, 96, 10, -6, 2, 1.5).d, blade(4, 4, 10, 96, 6, 2, 1.5).d, blade(4, 4, 44, 44, 4, 2.4, 1.3).d,
      blade(22, 7, 40, 26, -6, 1.1, 1.5).d, blade(7, 22, 26, 40, 6, 1.1, 1.5).d, blade(52, 8, 70, 20, -4, .9, 1.5).d, blade(8, 52, 20, 70, 4, .9, 1.5).d].join("");
  }
  function star(){
    var out = [], i;
    for(i = 0; i < 4; i++){ var a = i * Math.PI / 2 - Math.PI / 2, ex = 50 + Math.cos(a) * 48, ey = 50 + Math.sin(a) * 48; out.push(blade(50, 50, ex, ey, 7, 3.2, 1.2).d); }
    for(i = 0; i < 4; i++){ var b = i * Math.PI / 2 - Math.PI / 4, fx = 50 + Math.cos(b) * 24, fy = 50 + Math.sin(b) * 24; out.push(blade(50, 50, fx, fy, -4, 1.8, 1.3).d); }
    return out.join("");
  }
  var SPIKE = [blade(98, 50, 4, 50, 0, 7, 1.6).d, blade(98, 50, 30, 18, -10, 4, 1.6).d, blade(98, 50, 30, 82, 10, 4, 1.6).d, blade(70, 36, 52, 10, -4, 2, 1.5).d, blade(70, 64, 52, 90, 4, 2, 1.5).d].join("");
  var CORNER = cornerSigil(), STAR = star();
  function uri(vb, d, fill){ return "url(\"data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='" + vb + "'><path fill='" + fill + "' d='" + d + "'/></svg>") + "\")"; }
  var css = document.createElement("style");
  css.textContent =
    G + ".grid .frame::before," + G + ".grid .frame::after{background-image:" + uri("0 0 100 100", CORNER, "#ece8e0") + "!important;width:clamp(44px,5.5vw,76px)!important;opacity:.9;filter:drop-shadow(0 0 3px rgba(0,0,0,.8))}" +
    G + ".card:hover .frame::before," + G + ".card:hover .frame::after{opacity:1!important;transform-origin:center}" +
    G + ".card:hover .frame::before{animation:g-twitch .5s steps(2) 1}" +
    "@keyframes g-twitch{30%{transform:translate(1px,-1px)}60%{transform:translate(-1px,0)}}" +
    G + "section::after{width:40px!important;height:40px!important;background:var(--void) " + uri("0 0 100 100", STAR, "#cfcac1") + " center/contain no-repeat!important}" +
    G + ".nav-cta{position:relative;isolation:isolate;border-color:transparent!important;border-radius:0!important;background:none!important;color:var(--paper)!important;transition:color .3s}" +
    G + ".nav-cta::before," + G + ".nav-cta::after{content:'';position:absolute;inset:0;z-index:-1;clip-path:polygon(9px 0,calc(100% - 9px) 0,100% 50%,calc(100% - 9px) 100%,9px 100%,0 50%);transition:opacity .3s,transform .3s}" +
    G + ".nav-cta::before{background:var(--paper)}" +
    G + ".nav-cta::after{inset:1px;background:var(--void)}" +
    G + ".nav-cta .g-sp{position:absolute;top:50%;width:22px;height:22px;pointer-events:none;background:" + uri("0 0 100 100", SPIKE, "#e9e5dd") + " center/contain no-repeat;transition:transform .35s cubic-bezier(.3,1.6,.5,1)}" +
    G + ".nav-cta .g-sp.l{right:100%;transform:translate(4px,-50%)}" +
    G + ".nav-cta .g-sp.r{left:100%;transform:translate(-4px,-50%) scaleX(-1)}" +
    "@media (max-width:760px){" + G + ".nav-cta .g-sp.r{display:none}}" +
    G + ".nav-cta:hover{color:var(--void)!important}" +
    G + ".nav-cta:hover::after{opacity:0}" +
    G + ".nav-cta:hover .g-sp.l{transform:translate(-2px,-50%)}" +
    G + ".nav-cta:hover .g-sp.r{transform:translate(2px,-50%) scaleX(-1)}" +
    ".g-sp{display:none}" + G + ".g-sp{display:block}" +
    /* кнопки: острый шестигранник вместо таблетки */
    G + ".btn{position:relative;isolation:isolate;border-color:transparent!important;border-radius:0!important;background:none!important;color:var(--paper)!important;transition:color .3s}" +
    G + ".btn::before," + G + ".btn::after{content:'';position:absolute;inset:0;z-index:-1;clip-path:polygon(10px 0,calc(100% - 10px) 0,100% 50%,calc(100% - 10px) 100%,10px 100%,0 50%);transition:opacity .3s}" +
    G + ".btn::before{background:var(--paper)}" +
    G + ".btn::after{inset:1px;background:var(--void)}" +
    G + ".btn.o::before{background:var(--hair)}" +
    G + ".btn:hover," + G + ".btn.solid{color:var(--void)!important}" +
    G + ".btn:hover::after," + G + ".btn.solid::after{opacity:0}" +
    G + ".btn.solid:hover{color:var(--paper)!important}" +
    G + ".btn.solid:hover::after{opacity:1}";
  document.head.appendChild(css);
  /* шипы по бокам кнопки Order */
  function spikes(){ [].forEach.call(document.querySelectorAll(".nav-cta"), function(a){ if(a.querySelector(".g-sp")) return; ["l", "r"].forEach(function(k){ var sp = document.createElement("i"); sp.className = "g-sp " + k; sp.setAttribute("aria-hidden", "true"); a.appendChild(sp); }); }); }
  spikes(); setTimeout(spikes, 800);
})();
