/* Готика «Терновник»: при наведении на работу из углов ползут шипастые побеги, вокруг кнопки Play кольцо из терна */
(function(){
  var G = 'html[data-style="goth"] ', NS = "http://www.w3.org/2000/svg";
  /* ветка: волнистая линия по точкам + шипы, торчащие наружу по нормали */
  function branch(pts, every, len){
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1), t = "", side = 1;
    for(var i = 1; i < pts.length; i++){
      d += "L" + pts[i][0].toFixed(1) + " " + pts[i][1].toFixed(1);
      if(i % every === 0 && i < pts.length - 2){
        var a = pts[i - 1], b = pts[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1;
        var nx = -dy / m * side, ny = dx / m * side, x = pts[i][0], y = pts[i][1];
        t += (t ? "Z" : "") + "M" + (x - dx / m * 1.6).toFixed(1) + " " + (y - dy / m * 1.6).toFixed(1) + "L" + (x + nx * len + dx / m * 2.2).toFixed(1) + " " + (y + ny * len + dy / m * 2.2).toFixed(1) + "L" + (x + dx / m * 1.6).toFixed(1) + " " + (y + dy / m * 1.6).toFixed(1);
        side = -side;
      }
    }
    return [d, t + "Z"];
  }
  function line(w){ var p = []; for(var x = 0; x <= w; x += 3) p.push([x, 14 + Math.sin(x / 16) * 3.5 + Math.sin(x / 41) * 2]); return branch(p, 7, 6); }
  /* побег из угла: по нижней кромке и вверх по левой, закручиваясь */
  function corner(){ var p = [], i; for(i = 0; i <= 60; i++){ var k = i / 60; p.push([4 + k * 46, 96 - Math.sin(k * 9) * 2.2 - k * k * 6]); } return branch(p, 6, 3); }
  function side(){ var p = [], i; for(i = 0; i <= 60; i++){ var k = i / 60; p.push([4 + Math.sin(k * 8) * 1.8 + k * k * 5, 96 - k * 52]); } return branch(p, 6, 3); }
  function ring(){ var p = [], i; for(i = 0; i <= 120; i++){ var a = i / 120 * 6.283; var r = 36 + Math.sin(a * 7) * 2.2; p.push([40 + Math.cos(a) * r, 40 + Math.sin(a) * r]); } return branch(p, 5, 5); }
  var RING = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' fill='none' stroke='%23e9e5dd' stroke-width='1' stroke-linejoin='round'><path d='" + ring()[0] + "'/><path fill='%23e9e5dd' stroke='none' d='" + ring()[1] + "'/></svg>";

  var css = document.createElement("style");
  css.textContent =
    G + ".s-head>div:first-child::after{display:none!important}" +
    ".g-thorn{display:none}" +
    G + ".g-thorn{display:block;width:min(300px,70vw);height:28px;margin-top:12px;overflow:visible}" +
    ".g-thorn path,.g-tv path{fill:none;stroke:#d9d4cb;stroke-width:1.1;stroke-linejoin:round;stroke-dasharray:1 3;stroke-dashoffset:1}" +
    ".g-thorn path.k,.g-tv path.k{fill:#d9d4cb;stroke:none;opacity:0;transition:opacity .4s}" +
    G + ".g-thorn.in path.k{opacity:1;transition:opacity 1.2s 1.4s}" +
    G + ".card:hover .g-tv path.k," + G + ".card:focus-visible .g-tv path.k{opacity:1;transition:opacity .6s .7s}" +
    G + ".g-thorn.in path{transition:stroke-dashoffset 2.2s cubic-bezier(.5,0,.2,1);stroke-dashoffset:0}" +
    ".g-tv{display:none}" +
    G + ".g-tv{display:block;position:absolute;left:0;bottom:0;width:50%;aspect-ratio:1;z-index:3;pointer-events:none;overflow:visible}" +
    G + ".g-tv.r{left:auto;bottom:auto;right:0;top:0;transform:rotate(180deg)}" +
    ".g-tv path{stroke-width:.8;filter:drop-shadow(0 0 2px #000);transition:stroke-dashoffset .7s ease-in}" +
    G + ".card:hover .g-tv path," + G + ".card:focus-visible .g-tv path{stroke-dashoffset:0;transition:stroke-dashoffset 1.4s cubic-bezier(.3,0,.2,1)}" +
    G + ".dh-play .c{position:relative}" +
    G + ".dh-play .c::after{content:'';position:absolute;inset:-14px;background:url(\"data:image/svg+xml;utf8," + RING + "\") center/contain no-repeat;animation:g-spin 40s linear infinite;opacity:.8}" +
    "@keyframes g-spin{to{transform:rotate(360deg)}}" +
    "@media (prefers-reduced-motion:reduce){" + G + ".dh-play .c::after{animation:none}}";
  document.head.appendChild(css);

  function svg(cls, vb, ds, keep){
    var s = document.createElementNS(NS, "svg"); s.setAttribute("class", cls); s.setAttribute("viewBox", vb); s.setAttribute("aria-hidden", "true");
    if(!keep) s.setAttribute("preserveAspectRatio", "none");
    ds.forEach(function(b){ var p = document.createElementNS(NS, "path"); p.setAttribute("d", b[0]); p.setAttribute("pathLength", "1"); s.appendChild(p); var k = document.createElementNS(NS, "path"); k.setAttribute("d", b[1]); k.setAttribute("class", "k"); s.appendChild(k); });
    return s;
  }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .6 });
  var CORNER = corner(), SIDE = side();
  function scan(){
    [].forEach.call(document.querySelectorAll(".grid .frame"), function(f){
      if(f.querySelector(".g-tv")) return;
      /* левый нижний угол и, повёрнутый, правый верхний */
      f.appendChild(svg("g-tv", "0 0 100 100", [CORNER, SIDE], true));
      f.appendChild(svg("g-tv r", "0 0 100 100", [CORNER, SIDE], true));
    });
  }
  scan(); new MutationObserver(function(){ clearTimeout(scan.t); scan.t = setTimeout(scan, 120); }).observe(document.body, { childList: true, subtree: true });
})();
