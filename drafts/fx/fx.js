/* Пробные эффекты (только для /drafts/fx/): флипбук на обложках, появление заголовков, плёночное зерно */
(function(){
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css = document.createElement("style");
  css.textContent =
    /* 4. зерно: шум из SVG, дёргается 10 раз в секунду, как плёнка */
    ".fx-grain{position:fixed;inset:-50%;z-index:9998;pointer-events:none;opacity:.075;background:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\");animation:fxG 1s steps(10) infinite}" +
    "[data-theme=light] .fx-grain{opacity:.12;filter:invert(1)}" +
    "@keyframes fxG{0%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%,0)}70%{transform:translate(0,15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}100%{transform:translate(0,0)}}" +
    /* 3. заголовки выезжают снизу из-под маски, как титры */
    ".fx-l{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.06em}" +
    ".fx-l>span{display:inline-block;transform:translateY(105%);transition:transform 1.1s cubic-bezier(.2,.7,0,1)}" +
    ".fx-on .fx-l>span{transform:none}" +
    ".fx-up{opacity:0;transform:translateY(14px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.2,.7,0,1)}" +
    ".fx-up.fx-on{opacity:1;transform:none}" +
    /* 1. флипбук: слой с кадрами поверх обложки */
    ".fx-flip{position:absolute;inset:0;z-index:1;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .25s;pointer-events:none}" +
    ".fx-flip.on{opacity:1}";
  document.head.appendChild(css);
  if(!reduce){ var g = document.createElement("div"); g.className = "fx-grain"; document.body.appendChild(g); }

  /* 3. появление: большие заголовки секций и подписи над ними */
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

  /* 1. флипбук: при наведении обложка листает кадры из видео (YouTube даёт 3 кадра: начало, середина, конец) */
  function idOf(img){ var m = (img.currentSrc || img.src || "").match(/\/vi\/([\w-]{11})\//); return m && m[1]; }
  function flip(card){
    if(card._fx) return; var img = card.querySelector("img:not(.fx-flip)"); if(!img) return;
    card._fx = 1;
    var layer = null, t = null, k = 0;
    card.addEventListener("mouseenter", function(){
      var id = idOf(img); if(!id) return;
      if(!layer){ layer = document.createElement("img"); layer.className = "fx-flip"; layer.alt = ""; layer.style.filter = getComputedStyle(img).filter; img.parentNode.appendChild(layer);
        [1, 2, 3].forEach(function(n){ new Image().src = "https://i.ytimg.com/vi/" + id + "/hq" + n + ".jpg"; }); }
      k = 0; clearInterval(t);
      function next(){ k = k % 3 + 1; layer.src = "https://i.ytimg.com/vi/" + id + "/hq" + k + ".jpg"; layer.classList.add("on"); layer.style.filter = getComputedStyle(img).filter; }
      setTimeout(function(){ if(t !== null) next(); }, 350); t = setInterval(next, 650);
    });
    card.addEventListener("mouseleave", function(){ clearInterval(t); t = null; if(layer) layer.classList.remove("on"); });
  }
  function cards(){ if(!matchMedia("(hover: hover)").matches) return; document.querySelectorAll(".card .frame, .dh-strip button .dh-fr, .dh-row button").forEach(function(f){ flip(f.closest("button, .card") || f); }); }

  function run(){ reveal(); cards(); }
  run(); setTimeout(run, 800);
  new MutationObserver(function(){ clearTimeout(run._t); run._t = setTimeout(run, 200); }).observe(document.body, { childList: true, subtree: true });
})();
