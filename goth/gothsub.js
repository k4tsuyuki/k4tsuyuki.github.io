/* Готика для вкладок заказов и PFS: зерно, пепел и дым снизу экрана, только при html[data-style=goth] */
(function(){
  var root = document.documentElement, G = 'html[data-style="goth"] ';
  var grain = "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";
  var css = document.createElement("style");
  css.textContent = ".g-gr,.g-cv{display:none}" +
    G + ".g-gr{display:block;position:fixed;inset:-50%;width:200%;height:200%;pointer-events:none;z-index:9995;opacity:.075;background:url(\"data:image/svg+xml;utf8," + grain + "\");animation:g-gr .9s steps(4) infinite}" +
    "@keyframes g-gr{25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-2%)}}" +
    G + ".g-cv{display:block;position:fixed;inset:0;width:100%;height:100%;pointer-events:none}" +
    "@media (prefers-reduced-motion:reduce){.g-gr{animation:none}}";
  document.head.appendChild(css);
  var gr = document.createElement("div"); gr.className = "g-gr"; document.body.appendChild(gr);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  /* один холст: пепел падает сверху, дым поднимается от нижнего края */
  var c = document.createElement("canvas"); c.className = "g-cv"; c.style.zIndex = 1; document.body.appendChild(c);
  var x = c.getContext("2d"), W, H, dpr = Math.min(2, devicePixelRatio || 1), A = [], S = [];
  function size(){ W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); addEventListener("resize", size);
  function ash(top){ return { x: Math.random() * W, y: top ? -10 : Math.random() * H, r: .6 + Math.random() * 1.6, vy: .15 + Math.random() * .35, ph: Math.random() * 6.28, a: .12 + Math.random() * .3 }; }
  function puff(){ return { x: Math.random() * W, y: H + 40, r: 50 + Math.random() * 100, vy: .2 + Math.random() * .3, vx: (Math.random() - .5) * .3, life: 0, max: 500 + Math.random() * 400 }; }
  var i; for(i = 0; i < Math.round(Math.min(46, W * H / 30000)); i++) A.push(ash());
  for(i = 0; i < Math.max(10, Math.round(W / 60)); i++){ var p = puff(); p.life = Math.random() * p.max; p.y = H - p.life * p.vy; S.push(p); }
  (function tick(){
    x.clearRect(0, 0, W, H);
    if(root.getAttribute("data-style") === "goth"){
      var light = root.getAttribute("data-theme") === "light";
      S.forEach(function(p, k){
        p.life++; p.y -= p.vy; p.x += p.vx; p.r += .05;
        var a = Math.sin(Math.PI * Math.min(1, p.life / p.max)) * (light ? .05 : .06);
        var g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r), col = light ? "60,58,54," : "220,216,208,";
        g.addColorStop(0, "rgba(" + col + a + ")"); g.addColorStop(1, "rgba(" + col + "0)");
        x.fillStyle = g; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
        if(p.life > p.max) S[k] = puff();
      });
      A.forEach(function(p, k){
        p.ph += .01; p.y += p.vy; p.x += Math.sin(p.ph) * .25; if(p.y > H + 10) A[k] = ash(true);
        x.fillStyle = light ? "rgba(30,30,30," + p.a + ")" : "rgba(210,205,198," + p.a + ")"; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      });
    }
    requestAnimationFrame(tick);
  })();
})();
