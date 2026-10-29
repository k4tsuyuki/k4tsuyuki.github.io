/* Готика «Трещины»: клик по пустому месту оставляет трещину, как на стекле; она медленно затягивается */
(function(){
  var NS = "http://www.w3.org/2000/svg", root = document.documentElement;
  var css = document.createElement("style");
  css.textContent = ".g-crack{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9991;overflow:visible}" +
    ".g-crack path{fill:none;stroke:#e9e5dd;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:g-cr .45s cubic-bezier(.2,.8,.3,1) forwards;filter:drop-shadow(0 0 1px #000)}" +
    ".g-crack.out{transition:opacity 1.6s;opacity:0}" +
    "@keyframes g-cr{to{stroke-dashoffset:0}}";
  document.head.appendChild(css);
  function ray(x, y, ang, len, w, depth, out){
    var d = "M" + x.toFixed(1) + " " + y.toFixed(1), px = x, py = y, n = 5 + (Math.random() * 4 | 0);
    for(var i = 0; i < n; i++){
      ang += (Math.random() - .5) * .7; var step = len / n;
      px += Math.cos(ang) * step; py += Math.sin(ang) * step; d += "L" + px.toFixed(1) + " " + py.toFixed(1);
      if(depth < 2 && Math.random() < .35) ray(px, py, ang + (Math.random() < .5 ? -1 : 1) * (.5 + Math.random() * .6), len * .45, w * .6, depth + 1, out);
    }
    out.push([d, w, depth]);
  }
  document.addEventListener("click", function(e){
    if(root.getAttribute("data-style") !== "goth") return;
    if(e.target.closest("a,button,input,textarea,select,label,.card,iframe,.player,[role=button]")) return;
    var s = document.createElementNS(NS, "svg"); s.setAttribute("class", "g-crack"); s.setAttribute("aria-hidden", "true");
    var out = [], n = 6 + (Math.random() * 4 | 0), i;
    for(i = 0; i < n; i++) ray(e.clientX, e.clientY, i / n * 6.283 + Math.random() * .5, 60 + Math.random() * 120, 1.3, 0, out);
    /* кольцо вокруг точки удара */
    var r = 10 + Math.random() * 8, ring = "";
    for(i = 0; i <= 10; i++){ var a = i / 10 * 6.283, rr = r * (.8 + Math.random() * .4); ring += (i ? "L" : "M") + (e.clientX + Math.cos(a) * rr).toFixed(1) + " " + (e.clientY + Math.sin(a) * rr).toFixed(1); }
    out.push([ring, .8, 1]);
    out.forEach(function(o){ var p = document.createElementNS(NS, "path"); p.setAttribute("d", o[0]); p.setAttribute("pathLength", "1"); p.setAttribute("stroke-width", o[1]); p.style.opacity = o[2] ? .55 : .9; p.style.animationDelay = (o[2] * .12) + "s"; s.appendChild(p); });
    document.body.appendChild(s);
    setTimeout(function(){ s.classList.add("out"); }, 2200); setTimeout(function(){ s.remove(); }, 4000);
  });
})();
