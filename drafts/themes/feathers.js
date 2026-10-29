/* Готика «Перья»: изредка сверху медленно падают чёрные вороньи перья, покачиваясь и переворачиваясь */
(function(){
  var root = document.documentElement, c = document.createElement("canvas"), x = c.getContext("2d"), W, H, dpr = Math.min(2, devicePixelRatio || 1), F = [];
  c.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9990";
  document.body.appendChild(c);
  function size(){ W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); addEventListener("resize", size);
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function mk(top){ var s = 18 + Math.random() * 22; return { x: Math.random() * W, y: top ? -60 : Math.random() * H, s: s, vy: .35 + Math.random() * .35, ph: Math.random() * 6.28, sw: 18 + Math.random() * 30, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .01, flip: Math.random() * 6.28, d: .5 + s / 80 }; }
  for(var i = 0; i < (W < 700 ? 4 : 7); i++) F.push(mk(false));
  /* перо: стержень + опахало с зазубринами, светлый край, чтобы читалось на чёрном */
  function feather(f){
    var s = f.s, w = s * .26 * Math.abs(Math.cos(f.flip));
    x.save(); x.translate(f.x + Math.sin(f.ph) * f.sw, f.y); x.rotate(f.rot + Math.sin(f.ph) * .5);
    x.beginPath(); x.moveTo(0, -s);
    x.bezierCurveTo(w * 1.4, -s * .6, w * 1.2, s * .3, w * .2, s * .62);
    for(var k = 0; k < 3; k++) x.lineTo(w * (.6 - k * .15), s * (.4 - k * .22));
    x.lineTo(0, s * .6);
    x.bezierCurveTo(-w * 1.1, s * .3, -w * 1.5, -s * .5, 0, -s);
    x.fillStyle = "rgba(14,14,14,.92)"; x.fill(); x.strokeStyle = "rgba(225,221,213,.35)"; x.lineWidth = .7; x.stroke();
    x.beginPath(); x.moveTo(0, -s * .95); x.lineTo(0, s * .95); x.strokeStyle = "rgba(225,221,213,.45)"; x.lineWidth = .8; x.stroke();
    x.restore();
  }
  (function tick(){
    x.clearRect(0, 0, W, H);
    if(root.getAttribute("data-style") === "goth" && !reduce){
      F.forEach(function(f, i){
        f.ph += .012 * f.d; f.flip += .02; f.rot += f.vr; f.y += f.vy * f.d * (1 + .6 * Math.abs(Math.cos(f.ph)));
        feather(f); if(f.y > H + 60) F[i] = mk(true);
      });
    }
    requestAnimationFrame(tick);
  })();
})();
