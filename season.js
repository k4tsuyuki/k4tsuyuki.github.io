/* =====================================================================
   ПРАЗДНИЧНОЕ ОФОРМЛЕНИЕ. Включается само по датам ниже (если AUTO = true).
   Посмотреть заранее: katsuyuki.studio/?season=halloween (christmas, newyear).
   Отключить праздники совсем: AUTO = false.
   ===================================================================== */
(function(){
  var AUTO = false;
  var SEASONS = [
    { id: "halloween", from: "10-24", to: "11-01" },
    { id: "christmas", from: "12-20", to: "12-27" },
    { id: "newyear",   from: "12-28", to: "01-07" }
  ];

  var q = (location.search.match(/[?&]season=(\w+)/) || [])[1], now = new Date();
  function md(d){ return ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function inRange(s){ var t = md(now); return s.from <= s.to ? t >= s.from && t <= s.to : t >= s.from || t <= s.to; }
  var cur = q ? SEASONS.find(function(s){ return s.id === q; }) : AUTO ? SEASONS.find(inRange) : null;
  if(!cur) return;

  var root = document.documentElement, uk = function(){ return root.lang === "uk"; };
  var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia && matchMedia("(hover: none)").matches;
  root.setAttribute("data-season", cur.id);

  var CSS = {
    halloween:
      ':root[data-season="halloween"]{--acc:#ff6b1a}' +
      '[data-season="halloween"] .status .on i{background:var(--acc);box-shadow:0 0 12px var(--acc)}' +
      '[data-season="halloween"] .top nav a.nav-cta{border-color:var(--acc);color:var(--acc)}' +
      '[data-season="halloween"] .top nav a.nav-cta:hover{background:var(--acc);color:#000}' +
      '[data-season="halloween"] .hero-mark .logo-img{animation:s-flicker 7s infinite}' +
      '@keyframes s-flicker{0%,91%,95%,100%{opacity:1;filter:var(--logo)}92%{opacity:.25}93%{opacity:1;filter:var(--logo) drop-shadow(0 0 14px #ff6b1a)}94%{opacity:.4}}' +
      '.s-pk{position:absolute;bottom:-34px;pointer-events:none;z-index:1}' +
      '.s-pk.l{left:0;width:54px}.s-pk.r{right:0;width:84px}' +
      '.s-pk .eye{animation:s-glow 3.2s infinite}' +
      '@keyframes s-glow{0%,100%{opacity:1}45%{opacity:.75}50%{opacity:.95}55%{opacity:.6}}' +
      '.s-bat{position:fixed;left:0;top:0;z-index:39;pointer-events:none;color:var(--paper);opacity:.85;will-change:transform}' +
      '.s-bat .w{transform-origin:50% 40%;animation:s-flap .22s ease-in-out infinite alternate}' +
      '@keyframes s-flap{from{transform:scaleY(1)}to{transform:scaleY(-.35)}}' +
      '@media(max-width:760px){.s-pk.l{width:40px}.s-pk.r{width:66px}}',
    christmas:
      ':root[data-season="christmas"]{--acc:#dfe9ff}' +
      '[data-season="christmas"] .status .on i{background:var(--acc);box-shadow:0 0 10px var(--acc)}' +
      ':root[data-theme="light"][data-season="christmas"]{--acc:#7d97c4}' +
      '[data-season="christmas"] .sheet{position:relative}' +
      '.s-cap{position:absolute;left:-1px;right:-1px;top:-7px;height:12px;opacity:.92;pointer-events:none;z-index:2;color:#f4f6fb}' +
      ':root[data-theme="light"] .s-cap{color:#fff;filter:drop-shadow(0 1px 1px rgba(0,0,0,.12))}' +
      '.s-drift{position:fixed;left:0;right:0;bottom:0;height:46px;z-index:38;pointer-events:none;color:#f4f6fb;transition:opacity .4s}' +
      ':root[data-theme="light"] .s-drift{color:#fff;filter:drop-shadow(0 -2px 3px rgba(0,0,0,.08))}' +
      '.s-gar{position:absolute;left:0;right:0;top:100%;height:26px;pointer-events:none;overflow:visible}' +
      '.s-gar .b{animation:s-tw 2.4s ease-in-out infinite}' +
      '@keyframes s-tw{0%,100%{opacity:1}50%{opacity:.25}}' +
      '@media(max-width:760px){.s-drift{height:32px}}',
    newyear:
      ':root[data-season="newyear"]{--acc:#e8c46a}' +
      '[data-season="newyear"] .status .on i{background:var(--acc);box-shadow:0 0 10px var(--acc)}' +
      '[data-season="newyear"] .top nav a.nav-cta{border-color:var(--acc);color:var(--acc)}' +
      '[data-season="newyear"] .top nav a.nav-cta:hover{background:var(--acc);color:#000}' +
      ':root[data-theme="light"][data-season="newyear"]{--acc:#a8801f}'
  };
  var st = document.createElement("style");
  st.textContent = CSS[cur.id] +
    '.s-tag{display:inline-flex;align-items:center;gap:6px;color:var(--acc)}' +
    '.s-cv{position:fixed;inset:0;z-index:39;pointer-events:none;width:100%;height:100%}';
  document.head.appendChild(st);

  /* надпись в строке статуса на главной */
  function label(){
    var el = document.querySelector(".s-tag"), on = document.querySelector(".status .on");
    if(!on) return;
    if(!el){ el = document.createElement("span"); el.className = "s-tag"; on.after(el); }
    if(cur.id === "halloween") el.textContent = uk() ? "Щасливого Гелловіну" : "Happy Halloween";
    if(cur.id === "christmas") el.textContent = uk() ? "З Різдвом" : "Merry Christmas";
    if(cur.id === "newyear"){
      var ny = new Date(now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear(), 0, 1), left = ny - new Date();
      if(left > 0 && left < 864e5 * 4){
        var h = Math.floor(left / 36e5), m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60;
        el.textContent = ny.getFullYear() + (uk() ? " через " : " in ") + h + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
      } else el.textContent = (uk() ? "З Новим роком " : "Happy New Year ") + (now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear());
    }
  }
  function start(){
    label();
    setInterval(label, 1000);
    if(cur.id === "halloween") pumpkins();
    if(cur.id === "christmas"){ drifts(); garland(); }
    if(calm) return;
    if(cur.id === "halloween") bats();
    if(cur.id === "christmas") snow();
    if(cur.id === "newyear") fireworks();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();

  /* Хеллоуин: тыквы у логотипа */
  function pumpkin(face){
    var ribs = '<ellipse cx="50" cy="58" rx="44" ry="34" fill="#e8651a"/>' +
      '<ellipse cx="50" cy="58" rx="27" ry="34" fill="#f07a2a"/>' +
      '<ellipse cx="50" cy="58" rx="11" ry="34" fill="#f58a3a"/>' +
      '<path d="M50 26c-1-8 2-14 8-17" stroke="#4a3b1f" stroke-width="6" fill="none" stroke-linecap="round"/>';
    var eyes = face ? '<g class="eye" fill="#ffd36b"><path d="M28 50l10-10 8 12z"/><path d="M72 50l-10-10-8 12z"/>' +
      '<path d="M26 66q24 18 48 0l-6 2-4 6-5-5-5 6-4-6-5 5-4-6z"/></g>' : '';
    return '<svg viewBox="0 0 100 94" aria-hidden="true">' + ribs + eyes + '</svg>';
  }
  function pumpkins(){
    var m = document.querySelector(".hero-mark"); if(!m) return;
    m.insertAdjacentHTML("beforeend", '<span class="s-pk l">' + pumpkin(false) + '</span><span class="s-pk r">' + pumpkin(true) + '</span>');
  }
  /* Хеллоуин: изредка через экран пролетают летучие мыши */
  function bats(){
    var svg = '<svg viewBox="0 0 64 30" fill="currentColor"><path class="w" d="M32 10c-3-5-10-9-20-8 3 3 4 6 3 9-4-2-9-2-15 1 6 2 10 7 11 12 4-4 10-5 15-3 2-3 4-5 6-5s4 2 6 5c5-2 11-1 15 3 1-5 5-10 11-12-6-3-11-3-15-1-1-3 0-6 3-9-10-1-17 3-20 8z"/>' +
      '<ellipse cx="32" cy="13" rx="3" ry="5"/></svg>';
    function fly(){
      if(scrollY < innerHeight * 1.5 && !document.hidden){
        var n = Math.random() < .35 ? 2 : 1;
        for(var k = 0; k < n; k++) one(k);
      }
      setTimeout(fly, 5000 + Math.random() * 7000);
    }
    function one(k){
      var b = document.createElement("div"); b.className = "s-bat"; b.innerHTML = svg;
      var w = (touch ? 26 : 34) + Math.random() * 16; b.style.width = w + "px";
      document.body.appendChild(b);
      var ltr = Math.random() < .5, W = innerWidth + 2 * w, y0 = innerHeight * (.12 + Math.random() * .45),
          T = 5200 + Math.random() * 3000, ph = Math.random() * 6, t0 = performance.now() + k * 380;
      (function step(t){
        var p = (t - t0) / T;
        if(p < 0){ requestAnimationFrame(step); return; }
        if(p > 1){ b.remove(); return; }
        var x = ltr ? -w + p * W : innerWidth - p * W, y = y0 + Math.sin(p * 9 + ph) * 26 - p * 60;
        b.style.transform = "translate(" + x + "px," + y + "px)";
        requestAnimationFrame(step);
      })(performance.now());
    }
    setTimeout(fly, 1500);
  }

  /* Рождество: снег лежит на верхних краях карточек, внизу экрана сугробы */
  function capPath(w, seed){
    var d = "M0 16 L0 9", x = 0, r = seed;
    while(x < w){ r = (r * 9301 + 49297) % 233280; var s = 18 + (r / 233280) * 40, h = 2 + (r / 233280) * 6; d += " Q" + (x + s / 2) + " " + h + " " + (x + s) + " 9"; x += s; }
    return d + " L" + w + " 16 Z";
  }
  function drifts(){
    document.querySelectorAll(".sheet").forEach(function(sh, i){
      var c = document.createElement("div"); c.className = "s-cap"; sh.appendChild(c);
      function draw(){ var w = sh.offsetWidth + 2; c.innerHTML = '<svg width="100%" height="12" viewBox="0 0 ' + w + ' 16" preserveAspectRatio="none"><path fill="currentColor" d="' + capPath(w, 7 + i * 13) + '"/></svg>'; }
      draw(); addEventListener("resize", draw);
    });
    var d = document.createElement("div"); d.className = "s-drift";
    d.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 1000 70" preserveAspectRatio="none"><path fill="currentColor" opacity=".55" d="M0 70V40C80 22 150 30 230 38S390 18 480 28 650 44 740 30 900 14 1000 34V70Z"/>' +
      '<path fill="currentColor" d="M0 70V52C70 40 160 46 250 54S420 36 520 46 700 60 800 48 930 40 1000 50V70Z"/></svg>';
    document.body.appendChild(d);
    addEventListener("scroll", function(){ d.style.opacity = Math.max(0, 1 - scrollY / (innerHeight * .6)); }, { passive: true });
  }
  /* Рождество: гирлянда тёплых огоньков под верхним меню */
  function garland(){
    var top = document.querySelector(".top"); if(!top) return;
    var g = document.createElement("div"); g.className = "s-gar"; top.appendChild(g);
    var cols = ["#ffd27a", "#ff7a6b", "#9fd2ff", "#ffe9b0", "#a8e6a1"];
    function draw(){
      var W = innerWidth, span = W < 760 ? 90 : 140, n = Math.ceil(W / span), p = "M0 0", dots = "";
      for(var i = 0; i < n; i++){
        var x0 = i * span, x1 = x0 + span; p += " Q" + (x0 + span / 2) + " 22 " + x1 + " 0";
        for(var j = 1; j <= 3; j++){
          var t = j / 4, x = x0 + span * t, y = 2 * (1 - t) * t * 22;
          dots += '<circle class="b" cx="' + x + '" cy="' + (y + 3) + '" r="2.6" fill="' + cols[(i * 3 + j) % cols.length] + '" style="animation-delay:' + (((i * 3 + j) * 0.37) % 2.4).toFixed(2) + 's;filter:drop-shadow(0 0 3px ' + cols[(i * 3 + j) % cols.length] + ')"/>';
        }
      }
      g.innerHTML = '<svg width="' + W + '" height="26" viewBox="0 0 ' + W + ' 26"><path d="' + p + '" fill="none" style="stroke:var(--hair)" stroke-width="1"/>' + dots + '</svg>';
    }
    draw(); addEventListener("resize", draw);
  }

  function canvas(){
    var c = document.createElement("canvas"); c.className = "s-cv"; document.body.appendChild(c);
    var dpr = Math.min(2, devicePixelRatio || 1), ctx = c.getContext("2d");
    function size(){ c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener("resize", size);
    return ctx;
  }
  function ink(){ return root.getAttribute("data-theme") === "light" ? "17,17,17" : "238,235,229"; }

  /* Рождество: редкий медленный снег */
  function snow(){
    var ctx = canvas(), N = touch ? 45 : 90, F = [];
    for(var i = 0; i < N; i++) F.push({ x: Math.random(), y: Math.random(), r: .6 + Math.random() * 1.8, s: .15 + Math.random() * .45, w: Math.random() * 6 });
    (function loop(){
      var W = innerWidth, H = innerHeight, c = ink();
      ctx.clearRect(0, 0, W, H);
      F.forEach(function(f){
        f.y += f.s / H * 1.6; f.w += .01;
        if(f.y > 1.02){ f.y = -.02; f.x = Math.random(); }
        ctx.beginPath(); ctx.arc(f.x * W + Math.sin(f.w) * 14, f.y * H, f.r, 0, 6.3);
        ctx.fillStyle = "rgba(" + c + "," + (.25 + f.r / 4) + ")"; ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }

  /* Новый год: изредка в верхней части экрана тихие салюты. Клик по логотипу запускает ещё один. */
  function fireworks(){
    var ctx = canvas(), P = [], next = 600;
    function burst(x, y){
      var n = 46 + Math.random() * 20, gold = Math.random() < .5;
      for(var i = 0; i < n; i++){ var a = Math.PI * 2 * i / n, v = 1.2 + Math.random() * 2.4;
        P.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, g: gold }); }
    }
    var logo = document.querySelector(".hero-mark");
    if(logo) logo.addEventListener("click", function(e){ burst(e.clientX, e.clientY); });
    var last = performance.now();
    (function loop(t){
      var W = innerWidth, H = innerHeight, dt = Math.min(50, t - last); last = t;
      next -= dt;
      if(next <= 0 && scrollY < H){ burst(W * (.15 + Math.random() * .7), H * (.12 + Math.random() * .3)); next = 2600 + Math.random() * 3200; }
      ctx.clearRect(0, 0, W, H);
      var c = ink();
      P = P.filter(function(p){
        p.x += p.vx; p.y += p.vy; p.vy += .035; p.vx *= .985; p.vy *= .985; p.l -= .011;
        ctx.fillStyle = p.g ? "rgba(232,196,106," + p.l + ")" : "rgba(" + c + "," + p.l + ")";
        ctx.fillRect(p.x, p.y, 2, 2);
        return p.l > 0;
      });
      requestAnimationFrame(loop);
    })(last);
  }
})();
