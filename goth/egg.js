/* Пасхалка: набрать «katsu» (на телефоне — 5 быстрых тапов по лого в шапке).
   Экран уходит в чёрный, вспыхивает K из лого, тема переключается обычная <-> готическая. */
(function(){
  var busy = false, buf = "", taps = [];
  var css = document.createElement("style");
  css.textContent =
    ".k-egg{position:fixed;inset:0;z-index:2147483000;background:#000;display:grid;place-items:center;opacity:0;transition:opacity .35s ease;pointer-events:none}" +
    ".k-egg.in{opacity:1}" +
    ".k-egg img{height:min(46vh,340px);width:auto;opacity:0;transform:scale(.82);filter:drop-shadow(0 0 28px rgba(240,236,228,.55));transition:opacity .45s ease .15s,transform 1.1s cubic-bezier(.2,.8,.2,1) .15s}" +
    ".k-egg.in img{opacity:1;transform:scale(1)}" +
    ".k-egg.out img{opacity:0;transform:scale(1.25);transition:opacity .4s ease,transform .5s ease}";
  document.head.appendChild(css);
  function go(){
    if(busy || !window.kzStyle) return; busy = true;
    var on = document.documentElement.getAttribute("data-style") !== "goth";
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){ window.kzStyle.apply(on); busy = false; return; }
    var o = document.createElement("div"); o.className = "k-egg"; o.setAttribute("aria-hidden", "true");
    var i = new Image(); i.src = "/img/k.png"; i.alt = ""; o.appendChild(i); document.body.appendChild(o);
    var show = function(){ requestAnimationFrame(function(){ o.classList.add("in"); }); };
    if(i.complete) show(); else { i.onload = show; i.onerror = show; }
    setTimeout(function(){ window.kzStyle.apply(on); }, 700);          /* тема меняется, пока экран чёрный */
    setTimeout(function(){ o.classList.add("out"); o.classList.remove("in"); }, 1500);
    setTimeout(function(){ o.remove(); busy = false; }, 2000);
    if(window.track) try{ window.track("egg: katsu"); }catch(e){}
  }
  var WORDS = ["katsu", "лфеыг", "лфеіг"]; /* то же на русской и украинской раскладке */
  addEventListener("keydown", function(e){
    var t = e.target; if(t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if(e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-5);
    if(WORDS.indexOf(buf) > -1){ buf = ""; go(); }
  });
  document.addEventListener("click", function(e){
    var l = e.target.closest && e.target.closest('.who[href="#top"]'); /* только на главной: в других вкладках лого ведёт домой */
    if(!l) return;
    var now = Date.now(); taps = taps.filter(function(x){ return now - x < 1800; }); taps.push(now);
    if(taps.length >= 5){ taps = []; e.preventDefault(); go(); }
  }, true);
})();
