/* Готика «Цепи»: по краям первого экрана свисают цепи; при прокрутке раскачиваются и затихают */
(function(){
  var G = 'html[data-style="goth"] ', root = document.documentElement;
  var css = document.createElement("style");
  css.textContent = ".g-chain{display:none}" +
    G + ".g-chain{display:block;position:absolute;top:0;z-index:2;width:16px;transform-origin:50% 0;pointer-events:none;filter:drop-shadow(0 4px 6px rgba(0,0,0,.6))}" +
    ".g-chain svg{display:block;width:100%;height:100%}";
  document.head.appendChild(css);
  function svg(n){
    var h = n * 14 + 30, s = '<svg viewBox="0 0 16 ' + h + '" fill="none" stroke-linecap="round">';
    for(var i = 0; i < n; i++){ var y = i * 14; s += i % 2 ? '<rect x="6.5" y="' + (y - 2) + '" width="3" height="18" rx="1.5" stroke="#cfcac1" stroke-width="1.4"/>' : '<rect x="3" y="' + y + '" width="10" height="16" rx="5" stroke="#e9e5dd" stroke-width="1.6"/>'; }
    var y0 = n * 14; s += '<path d="M8 ' + (y0 - 2) + 'V' + (y0 + 8) + 'M3 ' + (y0 + 12) + 'H13" stroke="#e9e5dd" stroke-width="1.6"/><path d="M8 ' + (y0 + 4) + 'V' + (y0 + 28) + '" stroke="#e9e5dd" stroke-width="1.6"/></svg>';
    return { s: s, h: h };
  }
  var CH = [], vel = 0, last = scrollY;
  function place(){
    var f = document.querySelector(".dh-full"); if(!f || f.querySelector(".g-chain")) return;
    [[6, 9, 1], [11, 15, .8], [89, 11, .9], [95, 7, 1.1]].forEach(function(p){
      var o = svg(p[1]), d = document.createElement("div"); d.className = "g-chain"; d.style.left = p[0] + "%"; d.style.height = o.h + "px"; d.innerHTML = o.s;
      f.appendChild(d); CH.push({ el: d, a: 0, v: 0, k: p[2], t: Math.random() * 6 });
    });
  }
  place(); setTimeout(place, 600); setTimeout(place, 1500);
  addEventListener("scroll", function(){ var dy = scrollY - last; last = scrollY; vel += Math.max(-30, Math.min(30, dy)) * .02; }, { passive: true });
  (function tick(){
    if(root.getAttribute("data-style") === "goth") CH.forEach(function(c){
      c.t += .016; var target = Math.sin(c.t * c.k) * 1.2;
      c.v += (target - c.a) * .02 / c.k + vel * .4 / c.k; c.v *= .96; c.a += c.v; c.el.style.transform = "rotate(" + c.a.toFixed(2) + "deg)";
    });
    vel *= .8; requestAnimationFrame(tick);
  })();
})();
