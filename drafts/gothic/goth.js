/* Пробные готические эффекты. Какие включить, задаёт window.GOTH до подключения:
   roman (римские номера), dagger (крест в разделителях), candle (мерцание логотипа),
   ash (пепел), arch (стрельчатая арка на первом экране), intro (заставка). */
(function(){
  var O = window.GOTH || { roman: 1, dagger: 1, candle: 1, ash: 1, arch: 1, intro: 1 };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css = "";

  /* 2. римские цифры */
  function roman(n){ var r = "", v = [1000,900,500,400,100,90,50,40,10,9,5,4,1], s = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]; for(var i = 0; i < v.length; i++) while(n >= v[i]){ r += s[i]; n -= v[i]; } return r; }
  function romanize(){
    document.querySelectorAll(".c-meta > .m:first-child").forEach(function(m){
      if(m._r) return; var t = m.lastChild; if(!t || t.nodeType !== 3) return;
      var n = parseInt(t.nodeValue, 10); if(!n) return; m._r = 1; t.nodeValue = " " + roman(n);
    });
  }

  /* 3. разделители с крестом */
  if(O.dagger) css +=
    "section{border-top:0!important;position:relative}" +
    "section::before{content:'';position:absolute;top:0;left:var(--gl,16px);right:var(--gr,16px);height:1px;background:linear-gradient(90deg,transparent,var(--hair) 12%,var(--hair) calc(50% - 26px),transparent calc(50% - 26px),transparent calc(50% + 26px),var(--hair) calc(50% + 26px),var(--hair) 88%,transparent)}" +
    "section::after{content:'\\2020';position:absolute;top:0;left:50%;transform:translate(-50%,-52%);font:400 22px/1 Georgia,'Times New Roman',serif;color:var(--ash)}";

  /* 5. свеча: неровное мерцание и тёплое свечение логотипа */
  if(O.candle && !reduce) css +=
    ".dh-logo img,#heroName img{animation:gCandle 5.5s infinite}" +
    "@keyframes gCandle{0%,100%{filter:brightness(1) drop-shadow(0 0 18px rgba(255,236,200,.18))}8%{filter:brightness(.86) drop-shadow(0 0 8px rgba(255,236,200,.08))}10%{filter:brightness(1.04) drop-shadow(0 0 24px rgba(255,236,200,.24))}31%{filter:brightness(.95) drop-shadow(0 0 14px rgba(255,236,200,.14))}33%{filter:brightness(.78) drop-shadow(0 0 4px rgba(255,236,200,.05))}35%{filter:brightness(1.02) drop-shadow(0 0 22px rgba(255,236,200,.22))}62%{filter:brightness(.97) drop-shadow(0 0 16px rgba(255,236,200,.16))}64%{filter:brightness(.9) drop-shadow(0 0 10px rgba(255,236,200,.1))}80%{filter:brightness(1.03) drop-shadow(0 0 20px rgba(255,236,200,.2))}}";

  /* 7. стрельчатая арка: обложка первого экрана в форме готического окна */
  if(O.arch) css += ".dh-full>img.cv,.dh-full>.lq{clip-path:url(#gArch)}" +
      "@media(max-width:760px){.dh-full>img.cv,.dh-full>.lq{clip-path:url(#gArchTall)}}";
  if(O.arch || O.archCards){
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0"); svg.style.position = "absolute";
    svg.innerHTML = '<clipPath id="gArch" clipPathUnits="objectBoundingBox"><path d="M.06,1V.5C.06,.2 .3,.06 .5,0C.7,.06 .94,.2 .94,.5V1Z"/></clipPath>' +
      '<clipPath id="gArchTall" clipPathUnits="objectBoundingBox"><path d="M0,1V.36C0,.16 .25,.05 .5,0C.75,.05 1,.16 1,.36V1Z"/></clipPath>' +
      '<clipPath id="gArchCard" clipPathUnits="objectBoundingBox"><path d="M0,1V.42C0,.18 .28,.05 .5,0C.72,.05 1,.18 1,.42V1Z"/></clipPath>';
    document.body.appendChild(svg);
  }

  /* 8. заставка: логотип проступает из темноты с мерцанием */
  if(O.intro && !reduce){
    css += ".g-intro{position:fixed;inset:0;z-index:10001;background:#050505;display:grid;place-items:center;transition:opacity .9s ease,visibility .9s}" +
      ".g-intro.out{opacity:0;visibility:hidden}" +
      ".g-intro img{width:min(70vw,520px);opacity:0;animation:gIn 1.9s ease forwards}" +
      "@keyframes gIn{0%{opacity:0;filter:blur(8px) brightness(.4)}30%{opacity:.5;filter:blur(3px) brightness(.7)}36%{opacity:.15}42%{opacity:.75;filter:blur(1px)}48%{opacity:.4}60%{opacity:1;filter:none}100%{opacity:1}}";
    var intro = document.createElement("div"); intro.className = "g-intro"; intro.innerHTML = '<img src="/img/logo.png" alt="">';
    document.body.appendChild(intro);
    function gone(){ intro.classList.add("out"); setTimeout(function(){ intro.remove(); }, 1000); }
    intro.addEventListener("click", gone); setTimeout(gone, 2300);
  }

  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* 6. пепел: редкие серые частицы медленно падают */
  if(O.ash && !reduce){
    var c = document.createElement("canvas"); c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9997";
    document.body.appendChild(c);
    var x = c.getContext("2d"), W, H, dpr = Math.min(2, devicePixelRatio || 1), P = [];
    function size(){ W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener("resize", size);
    function mk(top){ return { x: Math.random() * W, y: top ? -10 : Math.random() * H, r: .6 + Math.random() * 1.6, vy: .15 + Math.random() * .35, ph: Math.random() * 6.28, a: .12 + Math.random() * .3 }; }
    var N = Math.round(Math.min(46, W * H / 30000)); for(var i = 0; i < N; i++) P.push(mk());
    (function tick(){
      x.clearRect(0, 0, W, H);
      var light = document.documentElement.getAttribute("data-theme") === "light";
      P.forEach(function(p, i){
        p.ph += .01; p.y += p.vy; p.x += Math.sin(p.ph) * .25;
        if(p.y > H + 10) P[i] = mk(true);
        x.fillStyle = light ? "rgba(30,30,30," + p.a + ")" : "rgba(210,205,198," + p.a + ")";
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      });
      requestAnimationFrame(tick);
    })();
  }

  function run(){ if(O.roman) romanize(); }
  run(); setTimeout(run, 600);
  new MutationObserver(function(){ clearTimeout(run._t); run._t = setTimeout(run, 150); }).observe(document.body, { childList: true, subtree: true });
})();
