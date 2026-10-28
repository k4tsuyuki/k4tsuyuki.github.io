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
      '@keyframes s-flicker{0%,91%,95%,100%{opacity:1;filter:var(--logo)}92%{opacity:.25}93%{opacity:1;filter:var(--logo) drop-shadow(0 0 14px #ff6b1a)}94%{opacity:.4}}',
    christmas:
      ':root[data-season="christmas"]{--acc:#dfe9ff}' +
      '[data-season="christmas"] .status .on i{background:var(--acc);box-shadow:0 0 10px var(--acc)}' +
      ':root[data-theme="light"][data-season="christmas"]{--acc:#7d97c4}',
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
    if(calm) return;
    if(cur.id === "christmas") snow();
    if(cur.id === "newyear") fireworks();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();

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
