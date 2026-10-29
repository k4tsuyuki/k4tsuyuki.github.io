/* Пробно: свой курсор и магнитные кнопки (только на компьютере с мышью) */
(function(){
  if(!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var css = document.createElement("style");
  css.textContent =
    "html.cur-on,html.cur-on *{cursor:none!important}" +
    "html.cur-on input,html.cur-on textarea{cursor:text!important}" +
    /* точка идёт точно за мышью, кольцо догоняет с задержкой; цвет инвертируется над картинками */
    ".cur-dot,.cur-ring{position:fixed;left:0;top:0;z-index:10000;pointer-events:none;border-radius:50%;mix-blend-mode:difference;will-change:transform}" +
    ".cur-dot{width:6px;height:6px;margin:-3px 0 0 -3px;background:#fff;transition:opacity .2s}" +
    ".cur-ring{width:34px;height:34px;margin:-17px 0 0 -17px;border:1px solid #fff;display:grid;place-items:center;transition:width .35s cubic-bezier(.2,.7,0,1),height .35s cubic-bezier(.2,.7,0,1),margin .35s cubic-bezier(.2,.7,0,1),background .3s,border-color .3s,opacity .2s}" +
    ".cur-ring b{font:700 11px/1 KN,Arial,sans-serif;letter-spacing:.08em;color:#000;opacity:0;transition:opacity .2s}" +
    ".cur-ring.link{width:52px;height:52px;margin:-26px 0 0 -26px}" +
    ".cur-ring.play{width:84px;height:84px;margin:-42px 0 0 -42px;background:#eeebe5;border-color:#eeebe5;mix-blend-mode:normal}" +
    ".cur-ring.play b{opacity:1}" +
    ".cur-ring.down{transform-origin:center}" +
    ".cur-hide{opacity:0}" +
    /* магнитные кнопки */
    ".mag{transition:transform .5s cubic-bezier(.2,.7,0,1)}" +
    ".mag.pull{transition:transform .15s linear}";
  document.head.appendChild(css);
  var dot = document.createElement("div"), ring = document.createElement("div");
  dot.className = "cur-dot cur-hide"; ring.className = "cur-ring cur-hide"; ring.innerHTML = "<b>PLAY</b>";
  document.body.appendChild(ring); document.body.appendChild(dot);
  document.documentElement.classList.add("cur-on");
  var mx = -100, my = -100, rx = -100, ry = -100, scale = 1;
  addEventListener("mousemove", function(e){
    mx = e.clientX; my = e.clientY;
    dot.classList.remove("cur-hide"); ring.classList.remove("cur-hide");
    var t = e.target.closest ? e.target : null;
    var play = t && t.closest(".card, .dh-strip button, .dh-play, .big-play, .fc, .nc, #shield, .mp-shield, .frame.pv");
    var link = !play && t && t.closest("a, button, [role=slider], input[type=range], label, .pill, summary");
    ring.classList.toggle("play", !!play); ring.classList.toggle("link", !!link);
    dot.style.opacity = play ? 0 : 1;
  }, { passive: true });
  document.addEventListener("mouseleave", function(){ dot.classList.add("cur-hide"); ring.classList.add("cur-hide"); });
  addEventListener("mousedown", function(){ scale = .8; }); addEventListener("mouseup", function(){ scale = 1; });
  (function loop(){
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    dot.style.transform = "translate(" + mx + "px," + my + "px)";
    ring.style.transform = "translate(" + rx + "px," + ry + "px) scale(" + scale + ")";
    requestAnimationFrame(loop);
  })();

  /* магнитные кнопки: тянутся к мыши на треть расстояния, но не дальше 10px */
  var SEL = ".pill-btn, .tgl, .nav-cta, .cta, .totop, .go, .copy, .more, .p-close, .again, .big-play, .ctl, .dh-play, .dh-burger, .ntf button, .filters button, .pill-row button, [data-f]";
  function bind(el){
    if(el._mag) return; el._mag = 1; el.classList.add("mag");
    el.addEventListener("mousemove", function(e){
      var r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      var k = .3, max = 10; dx = Math.max(-max, Math.min(max, dx * k)); dy = Math.max(-max, Math.min(max, dy * k));
      el.classList.add("pull"); el.style.transform = "translate(" + dx + "px," + dy + "px)";
    });
    el.addEventListener("mouseleave", function(){ el.classList.remove("pull"); el.style.transform = ""; });
  }
  function scan(){ document.querySelectorAll(SEL).forEach(bind); }
  scan(); setTimeout(scan, 1000);
  new MutationObserver(function(){ clearTimeout(scan._t); scan._t = setTimeout(scan, 300); }).observe(document.body, { childList: true, subtree: true });
})();
