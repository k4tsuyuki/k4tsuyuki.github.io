/* Готика «Свечи»: свеча с живым пламенем на разделителях разделов, мерцающий свет внизу первого экрана, обложка при наведении «разгорается» как от свечи */
(function(){
  var G = 'html[data-style="goth"] ';
  var css = document.createElement("style");
  css.textContent =
    ".g-candle,.g-glow{display:none}" +
    G + "section::after{display:none!important}" +
    G + "section{position:relative}" +
    G + ".g-candle{display:block;position:absolute;left:50%;top:0;width:26px;height:76px;transform:translate(-50%,-80%);z-index:2;pointer-events:none}" +
    G + ".g-candle::before{content:'';position:absolute;left:50%;bottom:28px;width:90px;height:90px;transform:translate(-50%,50%);background:radial-gradient(circle,rgba(255,244,225,.16),transparent 65%);animation:g-halo 3.2s ease-in-out infinite}" +
    ".g-candle svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}" +
    ".g-candle .fl{transform-origin:11px 30px;animation:g-fl 1.9s ease-in-out infinite}" +
    ".g-candle .fi{transform-origin:11px 30px;animation:g-fl 1.3s ease-in-out infinite reverse}" +
    "@keyframes g-fl{0%,100%{transform:scale(1,1) skewX(0)}20%{transform:scale(.92,1.08) skewX(3deg)}45%{transform:scale(1.04,.94) skewX(-4deg)}70%{transform:scale(.96,1.05) skewX(2deg)}}" +
    "@keyframes g-halo{0%,100%{opacity:.9}30%{opacity:.6}55%{opacity:1}80%{opacity:.7}}" +
    G + ".g-glow{display:block;position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 70% 55% at 50% 105%,rgba(255,240,215,.18),transparent 70%);mix-blend-mode:screen;animation:g-halo 4.1s ease-in-out infinite}" +
    G + ".dh-full::before{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 50% 70%,transparent 35%,rgba(0,0,0,.55) 100%)}" +
    G + ".card:hover .frame img," + G + ".card:focus-visible .frame img{animation:g-lit 1.1s ease-out both}" +
    "@keyframes g-lit{0%{filter:grayscale(1) brightness(.55)}18%{filter:grayscale(.7) brightness(.9)}30%{filter:grayscale(.8) brightness(.7)}48%{filter:grayscale(.35) brightness(1.02)}60%{filter:grayscale(.45) brightness(.88)}100%{filter:grayscale(0) brightness(.95)}}" +
    "@media (prefers-reduced-motion:reduce){.g-candle .fl,.g-candle .fi,.g-glow,.g-candle::before{animation:none}}";
  document.head.appendChild(css);
  var SVG = '<svg viewBox="0 0 22 64" aria-hidden="true">' +
    '<path class="fl" d="M11 4C14 12 17 17 17 23C17 27.5 14.3 30.5 11 30.5C7.7 30.5 5 27.5 5 23C5 17 9 14 11 4Z" fill="#f2ede4"/>' +
    '<path class="fi" d="M11 15C12.6 19 14 21.5 14 24.5C14 27 12.7 28.6 11 28.6C9.3 28.6 8 27 8 24.5C8 21.5 9.6 19 11 15Z" fill="#0b0b0b" opacity=".55"/>' +
    '<path d="M11 28V33" stroke="#555" stroke-width="1"/>' +
    '<path d="M5 33H17V64H5Z" fill="#d8d3ca"/><path d="M5 33C5 37 7 38 7 42C7 44 9 44 9 41V35C11 38 12 36 12 35C14 38 15 40 15 45C15 47 17 47 17 44V33Z" fill="#f0ece5"/></svg>';
  function place(){
    [].forEach.call(document.querySelectorAll("main section, section"), function(s, i){
      if(i === 0 || s.querySelector(":scope>.g-candle")) return;
      var c = document.createElement("div"); c.className = "g-candle"; c.innerHTML = SVG; s.appendChild(c);
    });
    var f = document.querySelector(".dh-full"); if(f && !f.querySelector(".g-glow")){ var g = document.createElement("div"); g.className = "g-glow"; f.appendChild(g); }
  }
  place(); setTimeout(place, 600); setTimeout(place, 1500);
})();
