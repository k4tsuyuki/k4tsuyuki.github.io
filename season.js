/* =====================================================================
   ПРАЗДНИЧНОЕ ОФОРМЛЕНИЕ. Включается само по датам ниже (если AUTO = true).
   Посмотреть заранее: katsuyuki.studio/?season=halloween (christmas, newyear, valentine, aprilfools, sakura).
   Отключить праздники совсем: AUTO = false.
   ===================================================================== */
(function(){
  var AUTO = true;
  var SEASONS = [
    { id: "valentine", from: "02-13", to: "02-15" },
    { id: "aprilfools", from: "04-01", to: "04-01" },
    { id: "sakura",    from: "03-25", to: "04-10" },
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
  var light = function(){ return root.getAttribute("data-theme") === "light"; };
  root.setAttribute("data-season", cur.id);

  /* ---------- стили ---------- */
  function accent(sel){ return '[data-season="' + sel + '"] .status .on i{background:var(--acc);box-shadow:0 0 10px var(--acc)}'; }
  function pill(sel){ return '[data-season="' + sel + '"] .top nav a.nav-cta{border-color:var(--acc);color:var(--acc)}[data-season="' + sel + '"] .top nav a.nav-cta:hover{background:var(--acc);color:#000}'; }
  var CSS = {
    halloween:
      ':root[data-season="halloween"]{--acc:#ff6b1a;--glow:#ff6b1a}' + accent("halloween") + pill("halloween") +
      '[data-season="halloween"] .hero-mark .logo-img{animation:s-flicker 7s infinite}' +
      '@keyframes s-flicker{0%,91%,95%,100%{opacity:1;filter:var(--logo)}92%{opacity:.25}93%{opacity:1;filter:var(--logo) drop-shadow(0 0 14px #ff6b1a)}94%{opacity:.4}}' +
      '.s-fog{position:fixed;left:-20%;right:-20%;bottom:-6vh;height:46vh;z-index:38;pointer-events:none;transition:opacity .4s}' +
      '.s-fog i{position:absolute;inset:0;background:radial-gradient(40% 55% at 20% 80%,rgba(190,190,200,.10),transparent 70%),radial-gradient(35% 50% at 55% 90%,rgba(190,190,200,.09),transparent 70%),radial-gradient(40% 60% at 85% 85%,rgba(190,190,200,.10),transparent 70%);animation:s-fog 38s ease-in-out infinite alternate}' +
      '.s-fog i+i{animation-duration:52s;animation-direction:alternate-reverse;opacity:.8;transform:scaleX(-1)}' +
      '@keyframes s-fog{from{translate:-6% 0}to{translate:6% 0}}' +
      ':root[data-theme="light"] .s-fog i{filter:invert(1);opacity:.6}' +
      '.s-flash{position:fixed;inset:0;z-index:60;pointer-events:none;background:#fff;opacity:0}' +
      '.s-flash.on{animation:s-flash 1s ease-out}' +
      '@keyframes s-flash{0%{opacity:0}4%{opacity:.09}8%{opacity:0}14%{opacity:.06}100%{opacity:0}}',
    christmas:
      ':root[data-season="christmas"]{--acc:#dfe9ff;--glow:#9fc3ff}' + accent("christmas") +
      ':root[data-theme="light"][data-season="christmas"]{--acc:#7d97c4}' +
      '.s-frost{position:fixed;inset:0;z-index:38;pointer-events:none;background:radial-gradient(120% 90% at 50% 50%,transparent 62%,rgba(190,215,255,.10) 85%,rgba(220,235,255,.18) 100%)}' +
      ':root[data-theme="light"] .s-frost{background:radial-gradient(120% 90% at 50% 50%,transparent 62%,rgba(120,160,220,.10) 85%,rgba(120,160,220,.18) 100%)}',
    newyear:
      ':root[data-season="newyear"]{--acc:#e8c46a;--glow:#e8c46a}' + accent("newyear") + pill("newyear") +
      ':root[data-theme="light"][data-season="newyear"]{--acc:#a8801f}',
    valentine:
      ':root[data-season="valentine"]{--acc:#ff4d5e;--glow:#ff3049}' + pill("valentine") +
      ':root[data-theme="light"][data-season="valentine"]{--acc:#d8283c}' +
      '[data-season="valentine"] .status .on i{background:var(--acc);box-shadow:0 0 10px var(--acc);animation:s-beat 1.4s infinite}' +
      '[data-season="valentine"] .hero-mark .logo-img{animation:s-beat2 1.4s infinite}' +
      '[data-season="valentine"] .hero-mark::before{animation:s-glowbeat 1.4s infinite}' +
      '@keyframes s-beat{0%,40%,100%{transform:scale(1)}15%{transform:scale(1.45)}28%{transform:scale(1.2)}}' +
      '@keyframes s-beat2{0%,40%,100%{transform:scale(1)}15%{transform:scale(1.025)}28%{transform:scale(1.01)}}' +
      '@keyframes s-glowbeat{0%,40%,100%{opacity:.16}15%{opacity:.3}}',
    aprilfools:
      ':root[data-season="aprilfools"]{--acc:var(--paper)}' +
      '[data-season="aprilfools"] .logo-img{transform:rotate(180deg)}' +
      '[data-season="aprilfools"] .hero-mark .logo-img{animation:s-glitch 6s infinite}' +
      '@keyframes s-glitch{0%,93%,100%{transform:rotate(180deg)}94%{transform:rotate(180deg) translate(6px,-2px) skewX(8deg)}95%{transform:rotate(180deg) translate(-8px,3px)}96%{transform:rotate(180deg) translate(3px,0) skewX(-6deg)}97%{transform:rotate(180deg)}}' +
      '[data-season="aprilfools"] .s-tag{display:inline-block;transform:scaleX(-1)}' +
      '[data-season="aprilfools"] .top nav a.nav-cta{transition:transform .25s cubic-bezier(.3,1.6,.5,1)}' +
      'html.s-rgb body{filter:drop-shadow(4px 0 rgba(255,0,60,.55)) drop-shadow(-4px 0 rgba(0,220,255,.55))}' +
      'html.s-rgb main{transform:translateX(-3px) skewX(-1deg)}',
    sakura:
      ':root[data-season="sakura"]{--acc:#f4a7c0;--glow:#f4a7c0}' + accent("sakura") +
      ':root[data-theme="light"][data-season="sakura"]{--acc:#cc5f86}'
  };
  var st = document.createElement("style");
  st.textContent = CSS[cur.id] +
    '.s-tag{display:inline-flex;align-items:center;gap:6px;color:var(--acc)}' +
    '.s-cv{position:fixed;inset:0;z-index:39;pointer-events:none;width:100%;height:100%}' +
    '[data-season] .hero-mark>*{position:relative;z-index:1}' +
    '[data-season] .hero-mark::before{content:"";position:absolute;left:15%;right:15%;top:22%;bottom:22%;background:radial-gradient(closest-side,var(--glow,transparent),transparent);opacity:.16;filter:blur(40px);pointer-events:none;z-index:0}' +
    ':root[data-theme="light"][data-season] .hero-mark::before{opacity:.12}' +
    '#heroName{position:relative}' +
    '.s-shine{position:absolute;pointer-events:none;-webkit-mask:url(img/logo.png) center/100% 100% no-repeat;mask:url(img/logo.png) center/100% 100% no-repeat;background:linear-gradient(105deg,transparent 42%,var(--shine) 50%,transparent 58%) no-repeat;background-size:300% 100%;animation:s-shine 7s ease-in-out infinite}' +
    '@keyframes s-shine{0%,55%{background-position:100% 0}85%,100%{background-position:0 0}}';
  document.head.appendChild(st);

  /* ---------- надпись в строке статуса ---------- */
  function label(){
    var el = document.querySelector(".s-tag"), on = document.querySelector(".status .on");
    if(!on) return;
    if(!el){ el = document.createElement("span"); el.className = "s-tag"; on.after(el); }
    var t = {
      halloween: ["Happy Halloween", "Щасливого Гелловіну"],
      christmas: ["Merry Christmas", "З Різдвом"],
      valentine: ["Happy Valentine's Day", "З Днем святого Валентина"],
      aprilfools: ["Happy April Fools'", "З 1 квітня"],
      sakura: ["Sakura season", "Сезон сакури"]
    }[cur.id];
    if(t) el.textContent = t[uk() ? 1 : 0];
    if(cur.id === "newyear"){
      var ny = new Date(now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear(), 0, 1), left = ny - new Date();
      if(left > 0 && left < 864e5 * 4){
        var h = Math.floor(left / 36e5), m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60;
        el.textContent = ny.getFullYear() + (uk() ? " через " : " in ") + h + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
      } else el.textContent = (uk() ? "З Новим роком " : "Happy New Year ") + ny.getFullYear();
    }
  }

  /* ---------- блик, пробегающий по логотипу ---------- */
  function shine(color){
    var h = document.getElementById("heroName"), img = h && h.querySelector("img"); if(!img) return;
    var s = document.createElement("span"); s.className = "s-shine"; s.style.setProperty("--shine", color); h.appendChild(s);
    function fit(){ s.style.left = img.offsetLeft + "px"; s.style.top = img.offsetTop + "px"; s.style.width = img.offsetWidth + "px"; s.style.height = img.offsetHeight + "px"; }
    fit(); img.addEventListener("load", fit); addEventListener("resize", fit);
  }

  /* ---------- частицы: один холст на всё ---------- */
  var M = { x: -999, y: -999, vx: 0, vy: 0, moved: 0 };
  addEventListener("pointermove", function(e){ M.vx = e.clientX - M.x; M.vy = e.clientY - M.y; M.x = e.clientX; M.y = e.clientY; M.moved = performance.now(); }, { passive: true });
  addEventListener("pointerleave", function(){ M.x = M.y = -999; });

  var P = [], ticks = [], ctx, W, H;
  function engine(){
    var c = document.createElement("canvas"); c.className = "s-cv"; document.body.appendChild(c);
    var dpr = Math.min(2, devicePixelRatio || 1); ctx = c.getContext("2d");
    function size(){ W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener("resize", size);
    var last = performance.now();
    (function loop(t){
      var k = Math.min(3, (t - last) / 16.67); last = t;
      if(!document.hidden){
        ticks.forEach(function(f){ f(k, t); });
        ctx.clearRect(0, 0, W, H);
        P = P.filter(function(p){ return step(p, k, t); });
      }
      requestAnimationFrame(loop);
    })(last);
  }
  /* p: x,y,vx,vy, g (гравитация), d (сопротивление), life/max (кадры, 0 = вечная), s (размер), a (прозрачность),
     kind, col, rot, vr, sw (раскачивание), ph, loop (возвращается наверх/вниз), rep (отталкивается курсором) */
  function add(p){
    p.vx = p.vx || 0; p.vy = p.vy || 0; p.g = p.g || 0; p.d = p.d == null ? 1 : p.d; p.max = p.life || 0; p.life = p.life || 0;
    p.rot = p.rot || Math.random() * 6.3; p.vr = p.vr == null ? 0 : p.vr; p.ph = Math.random() * 6.3; p.a = p.a == null ? 1 : p.a;
    p.bx = p.vx; p.by = p.vy; P.push(p); return p;
  }
  var wind = 0;
  function step(p, k, t){
    if(p.rep && M.x > -999){
      var dx = p.x - M.x, dy = p.y - M.y, d2 = dx * dx + dy * dy, R = 110;
      if(d2 < R * R){ var d = Math.sqrt(d2) || 1, f = (1 - d / R) * .9; p.vx += dx / d * f * k + M.vx * .015; p.vy += dy / d * f * k + M.vy * .01; }
    }
    if(p.loop){ p.vx += ((p.bx + wind * (p.wk || 1)) - p.vx) * .03 * k; p.vy += (p.by - p.vy) * .03 * k; }
    p.vy += p.g * k; p.vx *= Math.pow(p.d, k); p.vy *= Math.pow(p.d, k);
    p.ph += .02 * k;
    p.x += (p.vx + (p.sw ? Math.sin(p.ph) * p.sw : 0)) * k; p.y += p.vy * k; p.rot += p.vr * k;
    if(p.max){ p.life -= k; if(p.life <= 0) return false; }
    if(p.loop){
      if(p.by >= 0 && p.y > H + 20){ p.y = -20; p.x = Math.random() * W; p.vx = p.bx; }
      if(p.by < 0 && p.y < -20){ p.y = H + 20; p.x = Math.random() * W; p.vx = p.bx; }
      if(p.x > W + 40) p.x = -40; if(p.x < -40) p.x = W + 40;
    } else if(p.y > H + 40 || p.y < -60 || p.x < -60 || p.x > W + 60) return false;
    var al = p.a * (p.max ? Math.min(1, p.life / p.max * 1.6) : 1) * (p.tw ? .55 + .45 * Math.sin(t / 180 + p.ph * 9) : 1);
    if(al <= 0.01) return true;
    ctx.globalAlpha = Math.min(1, al); ctx.fillStyle = ctx.strokeStyle = typeof p.col === "function" ? p.col() : p.col;
    SHAPE[p.kind](p);
    ctx.globalAlpha = 1;
    return true;
  }
  var SHAPE = {
    dot: function(p){ ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.3); ctx.fill(); },
    sq: function(p){ ctx.fillRect(p.x, p.y, p.s, p.s); },
    glow: function(p){ var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.s * 3); g.addColorStop(0, ctx.fillStyle); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(p.x - p.s * 3, p.y - p.s * 3, p.s * 6, p.s * 6); },
    star: function(p){ var s = p.s; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.beginPath();
      ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0); ctx.quadraticCurveTo(0, 0, 0, s); ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill(); ctx.restore(); },
    flake: function(p){ var s = p.s; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.lineWidth = 1; ctx.lineCap = "round"; ctx.beginPath();
      for(var i = 0; i < 6; i++){ ctx.rotate(Math.PI / 3); ctx.moveTo(0, 0); ctx.lineTo(0, -s); ctx.moveTo(0, -s * .55); ctx.lineTo(s * .25, -s * .78); ctx.moveTo(0, -s * .55); ctx.lineTo(-s * .25, -s * .78); }
      ctx.stroke(); ctx.restore(); },
    heart: function(p){ var s = p.s; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.sin(p.ph) * .3); ctx.beginPath();
      ctx.moveTo(0, s * .35); ctx.bezierCurveTo(-s * 1.1, -s * .35, -s * .5, -s * 1.1, 0, -s * .45); ctx.bezierCurveTo(s * .5, -s * 1.1, s * 1.1, -s * .35, 0, s * .35); ctx.fill(); ctx.restore(); },
    petal: function(p){ var r = p.s; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.abs(Math.cos(p.ph * 1.7)) * .7 + .3); ctx.beginPath(); ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * .9, -r * .6, r * .8, r * .6, 0, r); ctx.bezierCurveTo(-r * .8, r * .6, -r * .9, -r * .6, 0, -r); ctx.fill(); ctx.restore(); },
    trail: function(p){ ctx.lineWidth = p.s; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 4, p.y - p.vy * 4); ctx.stroke(); }
  };
  function rnd(a, b){ return a + Math.random() * (b - a); }
  function ink(a){ return function(){ return light() ? "rgba(17,17,17," + a + ")" : "rgba(238,235,229," + a + ")"; }; }
  /* след за курсором */
  function trail(make, every){
    var acc = 0;
    ticks.push(function(k){
      if(touch || M.x < -900 || performance.now() - M.moved > 60) return;
      acc += Math.hypot(M.vx, M.vy); M.vx *= .5; M.vy *= .5;
      while(acc > every){ acc -= every; make(M.x, M.y); }
    });
  }
  function onClick(sel, fn){ document.addEventListener("click", function(e){ if(e.target.closest(sel)) fn(e.clientX, e.clientY, e); }); }
  function scrollFade(el, k){ function f(){ el.style.opacity = Math.max(0, 1 - scrollY / (innerHeight * k)); } addEventListener("scroll", f, { passive: true }); f(); }

  /* ---------- Хеллоуин ---------- */
  function halloween(){
    var fog = document.createElement("div"); fog.className = "s-fog"; fog.innerHTML = "<i></i><i></i>"; document.body.appendChild(fog); scrollFade(fog, .9);
    if(calm) return;
    engine();
    var ember = function(){ return ["#ff6b1a", "#ff8a2a", "#ffb347", "#ff4d1a"][Math.floor(Math.random() * 4)]; };
    /* искры поднимаются снизу, как от костра */
    for(var i = 0; i < (touch ? 14 : 26); i++) add({ x: rnd(0, innerWidth), y: rnd(0, innerHeight), vx: rnd(-.15, .15), vy: rnd(-.9, -.35), s: rnd(.8, 2), kind: "dot", col: ember(), a: rnd(.35, .8), sw: rnd(.2, .6), tw: 1, loop: 1, rep: 1 });
    /* за курсором тлеющие угольки */
    trail(function(x, y){ add({ x: x, y: y, vx: rnd(-.6, .6), vy: rnd(-1.4, -.4), g: -.01, d: .98, s: rnd(.8, 1.8), kind: "dot", col: ember(), life: rnd(40, 80), tw: 1 }); }, 14);
    /* редкие далёкие вспышки молнии */
    var fl = document.createElement("div"); fl.className = "s-flash"; document.body.appendChild(fl);
    (function storm(){ setTimeout(function(){ if(scrollY < innerHeight){ fl.classList.remove("on"); void fl.offsetWidth; fl.classList.add("on"); } storm(); }, rnd(22000, 40000)); })();
  }

  /* ---------- Рождество ---------- */
  function christmas(){
    var fr = document.createElement("div"); fr.className = "s-frost"; document.body.appendChild(fr);
    shine("rgba(200,225,255,.9)");
    if(calm) return;
    engine();
    var N = touch ? 50 : 110;
    for(var i = 0; i < N; i++){
      var big = Math.random() < .12;
      add({ x: rnd(0, innerWidth), y: rnd(0, innerHeight), vx: rnd(-.1, .1), vy: big ? rnd(.6, 1) : rnd(.25, .8), s: big ? rnd(4, 7) : rnd(.6, 2.2),
        kind: big ? "flake" : "dot", col: ink(1), a: big ? .7 : rnd(.35, .85), vr: big ? rnd(-.01, .01) : 0, sw: rnd(.1, .4), wk: big ? .7 : 1, loop: 1, rep: 1 });
    }
    /* порывы ветра */
    var target = 0;
    ticks.push(function(k){ wind += (target - wind) * .01 * k; });
    (function gust(){ setTimeout(function(){ target = rnd(-1, 1.6); setTimeout(function(){ target = 0; }, rnd(2500, 4500)); gust(); }, rnd(7000, 14000)); })();
    /* за курсором ледяные искорки */
    trail(function(x, y){ add({ x: x + rnd(-6, 6), y: y + rnd(-6, 6), vx: rnd(-.3, .3), vy: rnd(.1, .6), s: rnd(1.5, 3.2), kind: "star", col: light() ? "#6f8fc4" : "#e6f0ff", life: rnd(35, 60), vr: .03, tw: 1 }); }, 22);
  }

  /* ---------- Новый год ---------- */
  function newyear(){
    shine("rgba(255,222,140,.95)");
    if(calm) return;
    engine();
    var GOLD = ["#e8c46a", "#ffdd8a", "#fff3cf", "#d9a93c"];
    var gold = function(){ return GOLD[Math.floor(Math.random() * GOLD.length)]; };
    /* медленно падающие золотые блёстки */
    for(var i = 0; i < (touch ? 14 : 28); i++) add({ x: rnd(0, innerWidth), y: rnd(0, innerHeight), vy: rnd(.2, .5), vx: 0, s: rnd(2.2, 4), kind: "star", col: gold(), a: rnd(.4, .85), vr: rnd(-.02, .02), sw: .3, tw: 1, loop: 1, rep: 1 });
    function burst(x, y, big){
      var n = big ? 90 : rnd(50, 70), two = Math.random() < .5, c1 = gold(), c2 = two ? ink(1)() : gold();
      for(var i = 0; i < n; i++){ var a = Math.PI * 2 * i / n + rnd(-.05, .05), v = rnd(1.4, big ? 4.2 : 3.4);
        add({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: .035, d: .975, s: 1.4, kind: "trail", col: i % 2 ? c1 : c2, life: rnd(60, 95), tw: Math.random() < .4 ? 1 : 0 }); }
      add({ x: x, y: y, s: 30, kind: "glow", col: "rgba(255,220,140,.5)", life: 18 });
    }
    /* ракета взлетает снизу и взрывается */
    function rocket(){
      var x = rnd(innerWidth * .15, innerWidth * .85), ty = rnd(innerHeight * .1, innerHeight * .38);
      var r = add({ x: x, y: innerHeight + 10, vx: rnd(-.6, .6), vy: -rnd(9, 11), d: .985, s: 1.6, kind: "trail", col: "#fff3cf", life: 200 });
      var id = setInterval(function(){
        add({ x: r.x + rnd(-1, 1), y: r.y + 4, vx: rnd(-.3, .3), vy: rnd(.3, 1), g: .02, s: rnd(.6, 1.2), kind: "dot", col: gold(), life: rnd(20, 40) });
        if(r.y <= ty || r.vy > -2.5 || r.life <= 0){ clearInterval(id); r.life = 0.01; burst(r.x, r.y); }
      }, 30);
    }
    (function show(){ setTimeout(function(){ if(scrollY < innerHeight && !document.hidden){ rocket(); if(Math.random() < .3) setTimeout(rocket, 400); } show(); }, rnd(2600, 5200)); })();
    setTimeout(rocket, 700);
    onClick(".hero-mark", function(x, y){ burst(x, y, true); });
    trail(function(x, y){ add({ x: x + rnd(-5, 5), y: y + rnd(-5, 5), vx: rnd(-.4, .4), vy: rnd(.2, 1), g: .02, s: rnd(1.5, 3), kind: "star", col: gold(), life: rnd(30, 55), vr: .05, tw: 1 }); }, 16);
  }

  /* ---------- День святого Валентина ---------- */
  function valentine(){
    shine("rgba(255,120,140,.9)");
    if(calm) return;
    engine();
    var RED = ["#ff4d5e", "#ff7a8a", "#e8283c", "#ffb3bd"];
    var red = function(){ return RED[Math.floor(Math.random() * RED.length)]; };
    /* сердечки медленно всплывают снизу */
    for(var i = 0; i < (touch ? 10 : 18); i++) add({ x: rnd(0, innerWidth), y: rnd(0, innerHeight), vx: 0, vy: rnd(-.6, -.25), s: rnd(5, 11), kind: "heart", col: red(), a: rnd(.15, .4), sw: rnd(.3, .7), loop: 1, rep: 1 });
    /* клик где угодно — разлетаются сердечки */
    document.addEventListener("click", function(e){
      if(e.target.closest("a,button,input,textarea,iframe,.player")) return;
      for(var i = 0; i < 12; i++){ var a = rnd(0, 6.3), v = rnd(1, 3.2);
        add({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, g: .05, d: .97, s: rnd(4, 8), kind: "heart", col: red(), life: rnd(55, 85) }); }
    });
    trail(function(x, y){ add({ x: x, y: y, vx: rnd(-.3, .3), vy: rnd(-.9, -.3), s: rnd(2.5, 4.5), kind: "heart", col: red(), life: rnd(35, 55), a: .8 }); }, 34);
  }

  /* ---------- 1 апреля ---------- */
  function aprilfools(){
    if(calm) return;
    /* кнопка Order первые три раза убегает от курсора, потом сдаётся */
    var b = document.querySelector(".top nav a.nav-cta"), runs = 0;
    if(b && !touch) b.addEventListener("pointerenter", function(){
      if(runs >= 3){ b.style.transform = ""; return; }
      runs++; b.style.transform = "translate(" + (Math.random() < .5 ? -1 : 1) * rnd(40, 90) + "px," + rnd(6, 14) + "px)";
      setTimeout(function(){ if(runs >= 3) b.style.transform = ""; }, 1200);
    });
    /* изредка весь сайт на мгновение «ломается» */
    (function glitch(){ setTimeout(function(){
      root.classList.add("s-rgb"); setTimeout(function(){ root.classList.remove("s-rgb"); }, 120);
      setTimeout(function(){ root.classList.add("s-rgb"); setTimeout(function(){ root.classList.remove("s-rgb"); }, 80); }, 220);
      glitch(); }, rnd(14000, 26000)); })();
    /* курсор оставляет перевёрнутые «?!» */
    engine();
    trail(function(x, y){ add({ x: x, y: y, vy: rnd(-.8, -.2), vx: rnd(-.4, .4), s: rnd(2, 3), kind: "sq", col: ink(.9), life: rnd(25, 45), tw: 1 }); }, 26);
  }

  /* ---------- Сакура ---------- */
  function sakura(){
    shine("rgba(255,200,220,.9)");
    if(calm) return;
    engine();
    var pink = function(){ return light() ? ["#e88caa", "#d9708f", "#f0a6bf"][Math.floor(Math.random() * 3)] : ["#f6b7cb", "#ffd1df", "#f19ab8"][Math.floor(Math.random() * 3)]; };
    function petal(x, y, o){
      return add(Object.assign({ x: x, y: y, vx: rnd(.1, .5), vy: rnd(.35, .8), s: rnd(3.5, 7), kind: "petal", col: pink(), a: rnd(.45, .85), vr: rnd(-.03, .03), sw: rnd(.3, .8), loop: 1, rep: 1 }, o || {}));
    }
    for(var i = 0; i < (touch ? 24 : 44); i++) petal(rnd(0, innerWidth), rnd(0, innerHeight));
    /* порыв ветра: лепестки летят вбок, с края влетает целая стайка */
    var target = 0;
    ticks.push(function(k){ wind += (target - wind) * .015 * k; });
    (function gust(){ setTimeout(function(){
      if(scrollY < innerHeight * 2 && !document.hidden){
        target = rnd(2.5, 4);
        for(var i = 0; i < (touch ? 10 : 22); i++) petal(-rnd(10, 300), rnd(0, innerHeight * .8), { life: 600, loop: 0, vx: rnd(3, 5), vy: rnd(.2, .9), wk: 0 });
        setTimeout(function(){ target = 0; }, 3200);
      }
      gust(); }, rnd(9000, 16000)); })();
    /* клик где угодно — горсть лепестков */
    document.addEventListener("click", function(e){
      if(e.target.closest("a,button,input,textarea,iframe,.player")) return;
      for(var i = 0; i < 10; i++){ var a = rnd(0, 6.3), v = rnd(.8, 2.6); petal(e.clientX, e.clientY, { vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rnd(120, 200), loop: 0, d: .985, g: .015 }); }
    });
  }

  function start(){
    label();
    setInterval(label, 1000);
    ({ halloween: halloween, christmas: christmas, newyear: newyear, valentine: valentine, aprilfools: aprilfools, sakura: sakura })[cur.id]();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
