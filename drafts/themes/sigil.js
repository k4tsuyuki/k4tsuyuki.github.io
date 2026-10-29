/* Готика «Киберсигилизм»: острые тонкие сигилы по бокам логотипа, шипастые углы на обложках, звезда-сигил между разделами */
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
  /* сигил для левого края логотипа (зеркалится для правого) */
  function sideSigil(){
    seed = 23; var out = [];
    var sp = blade(176, 6, 158, 394, -46, 5, .5); out.push(sp.d);
    out.push(blade(158, 394, 186, 230, 34, 2.4, 1.1).d, blade(176, 6, 196, 120, -20, 2, 1.3).d);
    [.1, .22, .36, .5, .63, .76, .88].forEach(function(t, k){
      var p = sp.at(t), up = (k % 2 ? -1 : 1) * (t < .5 ? 1 : -1), mid = Math.sin(Math.PI * t);
      var len = 70 + mid * 100 + R() * 30, ex = Math.max(4, p[0] - len), ey = p[1] - up * (30 + R() * 60);
      var b = blade(p[0], p[1], ex, ey, up * (30 + R() * 40), 4 + mid * 3, 1.5); out.push(b.d);
      var q = b.at(.35 + R() * .2); out.push(blade(q[0], q[1], q[0] - 25 - R() * 40, q[1] + up * (25 + R() * 30), -up * (12 + R() * 10), 2.2, 1.5).d);
      if(R() < .6){ var q2 = b.at(.65); out.push(blade(q2[0], q2[1], q2[0] - 4 - R() * 10, q2[1] - up * (18 + R() * 16), up * 8, 1.4, 1.5).d); }
      if(k % 3 === 1) out.push(blade(p[0], p[1], p[0] + 16 + R() * 10, p[1] + up * (14 + R() * 12), -up * 6, 1.8, 1.5).d);
    });
    out.push(blade(176, 6, 110, 60, 30, 2.6, 1.4).d, blade(158, 394, 96, 350, -26, 2.6, 1.4).d);
    return out.join("");
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
  var SIDE = sideSigil(), CORNER = cornerSigil(), STAR = star();
  function uri(vb, d, fill){ return "url(\"data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='" + vb + "'><path fill='" + fill + "' d='" + d + "'/></svg>") + "\")"; }
  var css = document.createElement("style");
  css.textContent =
    ".g-sig{display:none}" +
    G + ".grid .frame::before," + G + ".grid .frame::after{background-image:" + uri("0 0 100 100", CORNER, "#ece8e0") + "!important;width:clamp(44px,5.5vw,76px)!important;opacity:.9;filter:drop-shadow(0 0 3px rgba(0,0,0,.8))}" +
    G + ".card:hover .frame::before," + G + ".card:hover .frame::after{opacity:1!important;transform-origin:center}" +
    G + ".card:hover .frame::before{animation:g-twitch .5s steps(2) 1}" +
    "@keyframes g-twitch{30%{transform:translate(1px,-1px)}60%{transform:translate(-1px,0)}}" +
    G + "section::after{width:40px!important;height:40px!important;background:var(--void) " + uri("0 0 100 100", STAR, "#cfcac1") + " center/contain no-repeat!important}" +
    G + ".g-sig{display:block;position:absolute;top:50%;z-index:2;height:min(64%,560px);aspect-ratio:1/2;pointer-events:none;transform:translateY(-58%);" +
      "background:" + uri("0 0 200 400", SIDE, "#efebe3") + " center/contain no-repeat;filter:drop-shadow(0 0 10px rgba(240,236,228,.25)) drop-shadow(0 2px 10px rgba(0,0,0,.6));opacity:0;animation:g-sig-in 1.6s .3s cubic-bezier(.2,.7,.2,1) forwards}" +
    G + ".g-sig.l{right:calc(50% + min(26vw,330px))}" +
    G + ".g-sig.r{left:calc(50% + min(26vw,330px));transform:translateY(-58%) scaleX(-1)}" +
    "@keyframes g-sig-in{from{opacity:0;clip-path:inset(0 0 100% 0)}to{opacity:.92;clip-path:inset(0 0 0 0)}}" +
    "@media (max-width:760px){" + G + ".g-sig{height:42%}" + G + ".g-sig.l{right:calc(50% + 32vw)}" + G + ".g-sig.r{left:calc(50% + 32vw)}}";
  document.head.appendChild(css);
  function place(){
    var f = document.querySelector(".dh-full"); if(!f || f.querySelector(".g-sig")) return;
    ["l", "r"].forEach(function(s){ var d = document.createElement("div"); d.className = "g-sig " + s; f.appendChild(d); });
  }
  place(); setTimeout(place, 600); setTimeout(place, 1500);
})();
