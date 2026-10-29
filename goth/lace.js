/* Готика «Кружево»: вензеля по углам обложек, дым внизу первого экрана */
(function(){
  var G = 'html[data-style="goth"] ';
  var CORNER = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60' fill='none' stroke='%23e9e5dd' stroke-width='1.1' stroke-linecap='round'><path d='M3 57V20C3 10 10 3 20 3H57'/><path d='M9 50V24C9 15 15 9 24 9H50' stroke-opacity='.5'/><path d='M14 3C14 10 20 14 26 12C31 10 30 4 25 4C21 4 21 9 24 9'/><path d='M3 14C10 14 14 20 12 26C10 31 4 30 4 25C4 21 9 21 9 24'/><circle cx='17' cy='17' r='2.2' fill='%23e9e5dd'/></svg>";
  var FLOUR = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 24' fill='none' stroke='%23a9a49c' stroke-width='1' stroke-linecap='round'><path d='M0 12H92M148 12H240'/><path d='M120 3L127 12L120 21L113 12Z'/><path d='M92 12C98 12 101 6 106 6C110 6 111 10 108 11'/><path d='M148 12C142 12 139 6 134 6C130 6 129 10 132 11'/><path d='M92 12C98 12 101 18 106 18C110 18 111 14 108 13'/><path d='M148 12C142 12 139 18 134 18C130 18 129 14 132 13'/></svg>";
  var LACE = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='10' viewBox='0 0 24 10' fill='none' stroke='%23e9e5dd' stroke-opacity='.45' stroke-width='.8'><path d='M0 1H24'/><path d='M0 1C0 6 6 9 12 9C18 9 24 6 24 1'/><circle cx='12' cy='5' r='1.6'/></svg>";
  var css = document.createElement("style");
  css.textContent =
    ".g-smoke{display:none}" +
    G + ".grid .frame::before," + G + ".grid .frame::after{content:'';position:absolute;z-index:2;width:clamp(34px,4vw,56px);aspect-ratio:1;pointer-events:none;background:url(\"data:image/svg+xml;utf8," + CORNER + "\") center/contain no-repeat;opacity:.85;transition:opacity .6s}" +
    G + ".grid .frame::before{left:8px;top:8px}" +
    G + ".grid .frame::after{right:8px;bottom:8px;transform:rotate(180deg)}" +
    G + ".card:hover .frame::before," + G + ".card:hover .frame::after{opacity:.25}" +
    G + "section::after{content:''!important;width:120px;height:24px;transform:translate(-50%,-50%)!important;background:var(--void) url(\"data:image/svg+xml;utf8," + FLOUR.replace("viewBox='0 0 240 24'", "viewBox='60 0 120 24'") + "\") center/contain no-repeat}" +
    G + ".g-smoke{display:block;position:absolute;left:0;right:0;bottom:0;width:100%;height:60%;z-index:1;pointer-events:none;mix-blend-mode:screen}" +
    G + "body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:9996;background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,.5) 100%)}";
  document.head.appendChild(css);
  /* дым: мягкие серые клубы медленно поднимаются от низа первого экрана */
  function smoke(full){
    var c = document.createElement("canvas"); c.className = "g-smoke"; full.appendChild(c);
    var x = c.getContext("2d"), W, H, P = [];
    function size(){ W = c.width = c.clientWidth; H = c.height = c.clientHeight; }
    size(); addEventListener("resize", size);
    function mk(){ return { x: Math.random() * W, y: H + 40, r: 50 + Math.random() * 100, vy: .25 + Math.random() * .35, vx: (Math.random() - .5) * .3, a: 0, life: 0, max: 500 + Math.random() * 400 }; }
    for(var i = 0, N = Math.max(14, Math.round(W / 45)); i < N; i++){ var p = mk(); p.life = Math.random() * p.max; p.y = H - p.life * p.vy; P.push(p); }
    (function tick(){
      if(document.documentElement.getAttribute("data-style") === "goth"){
        x.clearRect(0, 0, W, H);
        P.forEach(function(p, i){
          p.life++; p.y -= p.vy; p.x += p.vx; p.r += .05;
          var k = p.life / p.max, a = Math.sin(Math.PI * Math.min(1, k)) * .085;
          var g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, "rgba(220,216,208," + a + ")"); g.addColorStop(1, "rgba(220,216,208,0)");
          x.fillStyle = g; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
          if(p.life > p.max) P[i] = mk();
        });
      }
      requestAnimationFrame(tick);
    })();
  }
  function place(){ var full = document.querySelector(".dh-full"); if(full && !full.querySelector(".g-smoke")) smoke(full); }
  place(); setTimeout(place, 600); setTimeout(place, 1500);
})();
