/* Плёночное зерно, появление заголовков, римские номера, кресты между секциями, пепел и заставка с логотипом */
(function(){
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css = document.createElement("style");
  css.textContent =
    /* зерно: шум из SVG, дёргается 10 раз в секунду, как плёнка */
    ".fx-grain{position:fixed;inset:-50%;z-index:9998;pointer-events:none;opacity:.075;background:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\");animation:fxG 1s steps(10) infinite}" +
    "[data-theme=light] .fx-grain{opacity:.12;filter:invert(1)}" +
    "@keyframes fxG{0%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%,0)}70%{transform:translate(0,15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}100%{transform:translate(0,0)}}" +
    /* заголовки выезжают снизу из-под маски, как титры */
    ".fx-l{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.06em}" +
    ".fx-l>span{display:inline-block;transform:translateY(105%);transition:transform 1.1s cubic-bezier(.2,.7,0,1)}" +
    ".fx-on .fx-l>span{transform:none}" +
    ".fx-up{opacity:0;transform:translateY(14px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.2,.7,0,1)}" +
    ".fx-up.fx-on{opacity:1;transform:none}" +
    "";
  document.head.appendChild(css);
  if(!reduce){ var g = document.createElement("div"); g.className = "fx-grain"; document.body.appendChild(g); }

  /* появление: большие заголовки секций и подписи над ними */
  function reveal(){
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("fx-on"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px" }) : null;
    document.querySelectorAll(".s-head h2, .s-head .lb, .dh-full .dh-info, .ns-t, #news article h3").forEach(function(el, k){
      if(el._fx) return; el._fx = 1;
      if(el.tagName === "H2"){
        /* каждое слово (и иероглифы) отдельной полоской, с небольшой задержкой */
        [].slice.call(el.childNodes).forEach(function(n, j){
          if(n.nodeType === 3 && !n.nodeValue.trim()) return;
          var w = document.createElement("span"); w.className = "fx-l"; var inner = document.createElement("span");
          inner.style.transitionDelay = (j * .12) + "s"; el.replaceChild(w, n); inner.appendChild(n); w.appendChild(inner);
        });
      } else el.classList.add("fx-up");
      if(reduce || !io) el.classList.add("fx-on"); else io.observe(el);
    });
  }

  /* номера работ римскими цифрами: No. XIII */
  function roman(n){ var r = "", v = [1000,900,500,400,100,90,50,40,10,9,5,4,1], s = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]; for(var i = 0; i < v.length; i++) while(n >= v[i]){ r += s[i]; n -= v[i]; } return r; }
  function romanize(){
    document.querySelectorAll(".c-meta > .m:first-child").forEach(function(m){
      if(m._r) return; var t = m.lastChild; if(!t || t.nodeType !== 3) return;
      var n = parseInt(t.nodeValue, 10); if(!n) return; m._r = 1; t.nodeValue = " " + roman(n);
    });
  }

  /* кресты † на линиях между секциями */
  var css2 =
    "section{border-top:0!important;position:relative}" +
    "section::before{content:'';position:absolute;top:0;left:var(--gl,16px);right:var(--gr,16px);height:1px;background:linear-gradient(90deg,transparent,var(--hair) 12%,var(--hair) calc(50% - 26px),transparent calc(50% - 26px),transparent calc(50% + 26px),var(--hair) calc(50% + 26px),var(--hair) 88%,transparent)}" +
    "section::after{content:'\\2020';position:absolute;top:0;left:50%;transform:translate(-50%,-52%);font:400 22px/1 Georgia,'Times New Roman',serif;color:var(--ash)}";

  /* заставка: логотип проступает из темноты с мерцанием */
  var seen = false; try{ seen = sessionStorage.getItem("kz-intro"); sessionStorage.setItem("kz-intro", "1"); }catch(e){}
  /* заставка только при первом открытии сайта во вкладке: обновление страницы её не показывает, новая вкладка показывает */
  if(seen || reduce) document.documentElement.classList.remove("kzi");
  if(!seen && !reduce){
    css2 += ".g-intro{position:fixed;inset:0;z-index:10001;background:#050505;display:grid;place-items:center;transition:opacity .9s ease,visibility .9s}" +
      ".g-intro.out{opacity:0;visibility:hidden}" +
      ".g-intro img{width:min(70vw,520px);opacity:0;animation:gIn 1.9s ease forwards}" +
      "@keyframes gIn{0%{opacity:0;filter:blur(8px) brightness(.4)}30%{opacity:.5;filter:blur(3px) brightness(.7)}36%{opacity:.15}42%{opacity:.75;filter:blur(1px)}48%{opacity:.4}60%{opacity:1;filter:none}100%{opacity:1}}";
    var intro = document.createElement("div"); intro.className = "g-intro"; intro.innerHTML = '<img src="/img/logo.png" alt="">';
    document.body.appendChild(intro);
    document.documentElement.classList.remove("kzi");
    function gone(){ intro.classList.add("out"); setTimeout(function(){ intro.remove(); }, 1000); }
    intro.addEventListener("click", gone); setTimeout(gone, 2300);
  }

  var st2 = document.createElement("style"); st2.textContent = css2; document.head.appendChild(st2);

  /* пепел: редкие серые частицы медленно падают */
  if(!reduce){
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

  function run(){ reveal(); romanize(); }
  run(); setTimeout(run, 800);
  new MutationObserver(function(){ clearTimeout(run._t); run._t = setTimeout(run, 200); }).observe(document.body, { childList: true, subtree: true });
})();
