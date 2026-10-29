/* Готика «Чернила»: заголовки проступают как растекающиеся чернила, при наведении цвет расползается по обложке кляксой от курсора, клякса-разделитель между разделами */
(function(){
  var G = 'html[data-style="goth"] ', NS = "http://www.w3.org/2000/svg";
  /* клякса: неровный круг с брызгами вокруг */
  function blot(seed){
    var r = function(){ seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var n = 26, d = "", i;
    for(i = 0; i <= n; i++){ var a = i / n * 6.283, k = 30 + r() * 9 + (i % 5 === 0 ? 8 : 0), x = 50 + Math.cos(a) * k, y = 50 + Math.sin(a) * k; d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1); }
    d += "Z"; for(i = 0; i < 9; i++){ var b = r() * 6.283, q = 42 + r() * 7, s = 1 + r() * 2.6; d += "M" + (50 + Math.cos(b) * q + s).toFixed(1) + " " + (50 + Math.sin(b) * q).toFixed(1) + "a" + s.toFixed(1) + " " + s.toFixed(1) + " 0 1 0 0 .1Z"; }
    return d;
  }
  var B = blot(7), MASK = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><filter id='f'><feTurbulence baseFrequency='.09' numOctaves='2' seed='3'/><feDisplacementMap in='SourceGraphic' scale='6'/></filter><path filter='url(%23f)' d='" + B + "'/></svg>";
  var DOT = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='%23cfcac1' d='" + blot(19) + "'/></svg>";
  var defs = document.createElementNS(NS, "svg"); defs.setAttribute("width", 0); defs.setAttribute("height", 0); defs.style.position = "absolute";
  defs.innerHTML = '<filter id="g-ink"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4"/><feDisplacementMap id="g-ink-d" in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>';
  var css = document.createElement("style");
  css.textContent =
    G + ".s-head h2>span:not(.jp){display:inline-block}" +
    G + ".s-head h2.g-bleed>span:not(.jp){filter:url(#g-ink) blur(var(--ib,0px));opacity:var(--io,1)}" +
    G + "section::after{content:''!important;width:34px;height:34px;transform:translate(-50%,-50%)!important;background:var(--void) url(\"data:image/svg+xml;utf8," + DOT + "\") center/contain no-repeat}" +
    G + ".card:hover .frame img," + G + ".card:focus-visible .frame img{filter:grayscale(1) contrast(1.05) brightness(.95)}" +
    ".g-col{display:none}" +
    G + ".g-col{display:block;position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;filter:none!important;opacity:1!important;" +
      "-webkit-mask:url(\"data:image/svg+xml;utf8," + MASK + "\") no-repeat;mask:url(\"data:image/svg+xml;utf8," + MASK + "\") no-repeat;" +
      "-webkit-mask-size:var(--ms,0px) var(--ms,0px);mask-size:var(--ms,0px) var(--ms,0px);-webkit-mask-position:var(--mx,50%) var(--my,50%);mask-position:var(--mx,50%) var(--my,50%);" +
      "transition:-webkit-mask-size .5s ease-in,mask-size .5s ease-in,-webkit-mask-position .5s ease-in,mask-position .5s ease-in;transform:scale(1.04)}" +
    G + ".card:hover .g-col," + G + ".card:focus-visible .g-col{transition-duration:1.7s;transition-timing-function:cubic-bezier(.2,.7,.2,1)}";
  document.head.appendChild(css);
  document.body.appendChild(defs);

  /* заголовки: смещение и размытие уходят в ноль, когда заголовок попадает в кадр */
  function bleed(h){
    h.classList.add("g-bleed"); var d = document.getElementById("g-ink-d"), t0 = null;
    (function step(t){ if(t0 === null) t0 = t; var k = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - k, 3);
      d.setAttribute("scale", (60 * (1 - e)).toFixed(1)); h.style.setProperty("--ib", (6 * (1 - e)).toFixed(2) + "px"); h.style.setProperty("--io", Math.min(1, e * 1.6).toFixed(2));
      if(k < 1) requestAnimationFrame(step); else h.classList.remove("g-bleed"); })(performance.now());
  }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting && document.documentElement.getAttribute("data-style") === "goth"){ bleed(e.target); io.unobserve(e.target); } }); }, { threshold: .5 });
  [].forEach.call(document.querySelectorAll(".s-head h2"), function(h){ io.observe(h); });

  /* цвет кляксой: цветная копия обложки поверх ч/б, маска растёт из точки входа курсора */
  document.addEventListener("pointerover", function(e){
    var card = e.target.closest && e.target.closest(".grid .card"); if(!card || card.contains(e.relatedTarget)) return;
    var f = card.querySelector(".frame"), img = f && f.querySelector("img:not(.lq):not(.g-col)"); if(!img) return;
    var c = f.querySelector(".g-col"); if(!c){ c = document.createElement("img"); c.className = "g-col"; c.alt = ""; img.after(c); }
    if(c.src !== (img.currentSrc || img.src)) c.src = img.currentSrc || img.src;
    var r = f.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, S = Math.max(r.width, r.height) * 2.8;
    c.style.transition = "none"; c.style.setProperty("--ms", "0px"); c.style.setProperty("--mx", x + "px"); c.style.setProperty("--my", y + "px");
    c.offsetWidth; c.style.transition = "";
    c.style.setProperty("--ms", S + "px"); c.style.setProperty("--mx", (x - S / 2) + "px"); c.style.setProperty("--my", (y - S / 2) + "px");
    card.addEventListener("pointerleave", function out(){ card.removeEventListener("pointerleave", out);
      var r2 = f.getBoundingClientRect(); c.style.setProperty("--ms", "0px"); c.style.setProperty("--mx", (r2.width / 2) + "px"); c.style.setProperty("--my", (r2.height / 2) + "px"); });
  });
})();
