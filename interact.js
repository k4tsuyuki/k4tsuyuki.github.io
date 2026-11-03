/* Интерактив на главной:
   1) обложки слегка наклоняются за мышкой (только мышь, без блика);
   2) быстрый росчерк по обложке разрезает её, потом открывается плеер;
   3) кнопка «Draw a card» в разделе Works: случайный эдит в виде карты. */
(function(){
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var uk = function(){ return document.documentElement.lang === "uk"; };
  function roman(n){ var r = "", v = [1000,900,500,400,100,90,50,40,10,9,5,4,1], s = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]; for(var i = 0; i < v.length; i++) while(n >= v[i]){ r += s[i]; n -= v[i]; } return r; }

  var css = '' +
    '.frame.kz-t{transition:transform .5s cubic-bezier(.2,.7,.2,1);will-change:transform}' +
    '.frame.kz-t.kz-live{transition:transform .08s linear}' +
    '#grid .frame,#arcGrid .frame{touch-action:pan-y}' +
    '.kz-half{position:absolute;inset:0;z-index:4;pointer-events:none;transition:transform .9s cubic-bezier(.16,.8,.2,1),opacity .8s ease .2s}' +
    '.kz-half img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1) brightness(.85)}' +
    '.kz-cutbg{position:absolute;inset:0;z-index:3;background:#000;pointer-events:none}' +
    '.kz-trail,.kz-slash{position:absolute;z-index:5;transform-origin:0 50%;pointer-events:none}' +
    '.kz-trail{height:1px;background:rgba(255,255,255,.7)}' +
    '.kz-slash{height:2px;background:#fff;box-shadow:0 0 12px #fff,0 0 2px #fff}' +
    /* карта */
    '.kz-draw{background:none;border:0;padding:0;color:inherit;font:inherit;cursor:pointer;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}' +
    '.kz-draw:hover{text-decoration-thickness:2px}' +
    '.kz-tov{position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;padding:24px 16px;background:rgba(0,0,0,.9);color:#eeebe5;opacity:0;transition:opacity .35s}' +
    '.kz-tov.on{opacity:1}' +
    '.kz-tz{perspective:1200px}' +
    '.kz-tc{position:relative;width:min(250px,62vw);aspect-ratio:5/8;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.3,1.4,.4,1);cursor:pointer}' +
    '.kz-tc.flip{transform:rotateY(180deg)}' +
    '.kz-tc.shuf{animation:kzShuf .7s ease}' +
    '@keyframes kzShuf{0%{transform:none}20%{transform:translateX(-26px) rotate(-6deg)}40%{transform:translateX(22px) rotate(5deg)}60%{transform:translateX(-14px) rotate(-3deg)}80%{transform:translateX(8px) rotate(2deg)}100%{transform:none}}' +
    '.kz-f{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:1px solid #eeebe5;background:#000;display:flex;flex-direction:column;padding:12px;gap:10px}' +
    '.kz-back{align-items:center;justify-content:center;background:repeating-linear-gradient(45deg,transparent 0 9px,rgba(255,255,255,.06) 9px 10px),repeating-linear-gradient(-45deg,transparent 0 9px,rgba(255,255,255,.06) 9px 10px),#000}' +
    '.kz-back:before{content:"";position:absolute;inset:8px;border:1px solid rgba(238,235,229,.45)}' +
    '.kz-back img{width:62px;position:relative}' +
    '.kz-back span{position:absolute;bottom:20px;font-size:10px;font-weight:700;letter-spacing:.3em}' +
    '.kz-front{transform:rotateY(180deg)}' +
    '.kz-front .n{text-align:center;font-size:13px;font-weight:700;letter-spacing:.3em}' +
    '.kz-front .a{flex:1;position:relative;overflow:hidden;border:1px solid rgba(238,235,229,.4);background:#111}' +
    '.kz-front .a img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15)}' +
    '.kz-front .t{text-align:center;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;text-wrap:balance}' +
    '.kz-front .y{text-align:center;font-size:10px;color:#8a8a8f;letter-spacing:.2em;font-weight:700}' +
    '.kz-tb{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}' +
    '.kz-tb button{font:inherit;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:13px 20px;cursor:pointer;border:1px solid #eeebe5;transition:background .25s,color .25s}' +
    '.kz-tb .w{background:#eeebe5;color:#000}.kz-tb .w:hover{background:#000;color:#eeebe5}' +
    '.kz-tb .g{background:#000;color:#eeebe5}.kz-tb .g:hover{background:#eeebe5;color:#000}' +
    '.kz-tb button:focus-visible,.kz-tc:focus-visible{outline:2px solid #eeebe5;outline-offset:3px}' +
    '.kz-tx{position:absolute;top:max(14px,env(safe-area-inset-top,0px));right:max(16px,env(safe-area-inset-right,0px));background:none;border:0;color:#eeebe5;font:inherit;font-size:12px;font-weight:700;letter-spacing:.14em;cursor:pointer;padding:8px}' +
    '@media(prefers-reduced-motion:reduce){.kz-tc{transition:none}.kz-tc.shuf{animation:none}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- звук (только после действия человека) ---------- */
  var AC = null;
  function sound(kind){
    try{ AC = AC || new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ return; }
    var t = AC.currentTime, out = AC.createGain(); out.gain.value = .8; out.connect(AC.destination);
    function noise(d){ var b = AC.createBuffer(1, Math.ceil(AC.sampleRate * d), AC.sampleRate), a = b.getChannelData(0); for(var i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; var s = AC.createBufferSource(); s.buffer = b; return s; }
    var n = noise(kind === "slash" ? .3 : .08), f = AC.createBiquadFilter(), g = AC.createGain();
    if(kind === "slash"){
      f.type = "bandpass"; f.Q.value = 1.2; f.frequency.setValueAtTime(5000, t); f.frequency.exponentialRampToValueAtTime(900, t + .25);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.35, t + .03); g.gain.exponentialRampToValueAtTime(.001, t + .28);
    } else { f.type = "highpass"; f.frequency.value = 2500; g.gain.setValueAtTime(.18, t); g.gain.exponentialRampToValueAtTime(.001, t + .08); }
    n.connect(f); f.connect(g); g.connect(out); n.start(t);
  }

  /* ---------- наклон + разрез ---------- */
  function wire(card){
    if(card._kz) return; card._kz = 1;
    var fr = card.querySelector(".frame"); if(!fr) return;
    fr.classList.add("kz-t");
    var pts = null, cut = false, big = card.classList.contains("big");
    card.addEventListener("pointermove", function(e){
      var r = fr.getBoundingClientRect();
      if(pts){ pts.push([e.clientX - r.left, e.clientY - r.top, Date.now()]); trail(fr, pts); }
      if(cut || reduce || e.pointerType !== "mouse") return;
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height, k = big ? 5 : 12;
      fr.classList.add("kz-live");
      fr.style.transform = "perspective(900px) rotateY(" + ((x - .5) * k).toFixed(2) + "deg) rotateX(" + ((.5 - y) * k).toFixed(2) + "deg)";
    });
    card.addEventListener("pointerleave", function(){ fr.classList.remove("kz-live"); if(!cut) fr.style.transform = ""; });
    fr.addEventListener("pointerdown", function(e){
      if(cut || (e.pointerType === "mouse" && e.button !== 0)) return;
      var r = fr.getBoundingClientRect(); pts = [[e.clientX - r.left, e.clientY - r.top, Date.now()]];
    });
    function end(){
      if(!pts) return; var p = pts; pts = null;
      var tr = fr.querySelector(".kz-trail"); if(tr) tr.remove();
      var a = p[0], b = p[p.length - 1], r = fr.getBoundingClientRect();
      if(Math.hypot(b[0] - a[0], b[1] - a[1]) > Math.min(r.width, r.height) * .45 && b[2] - a[2] < 900){ cut = true; slash(card, fr, a, b, r, function(){ cut = false; }); }
    }
    card.addEventListener("pointerup", end);
    card.addEventListener("pointercancel", function(){ pts = null; var tr = fr.querySelector(".kz-trail"); if(tr) tr.remove(); });
    /* клик сразу после росчерка не открывает плеер дважды */
    card.addEventListener("click", function(e){ if(card._kzHold){ e.stopImmediatePropagation(); e.preventDefault(); } }, true);
  }
  function trail(fr, p){
    var t = fr.querySelector(".kz-trail"); if(!t){ t = document.createElement("div"); t.className = "kz-trail"; fr.appendChild(t); }
    var a = p[0], b = p[p.length - 1], dx = b[0] - a[0], dy = b[1] - a[1];
    t.style.left = a[0] + "px"; t.style.top = a[1] + "px"; t.style.width = Math.hypot(dx, dy) + "px"; t.style.transform = "rotate(" + Math.atan2(dy, dx) + "rad)";
  }
  function slash(card, fr, a, b, r, done){
    var img = fr.querySelector("img"); if(!img || !img.src){ done(); return; }
    fr.classList.remove("kz-live"); fr.style.transform = "";
    card._kzHold = true;
    var W = r.width, H = r.height, ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    var d = [Math.cos(ang), Math.sin(ang)], n = [-d[1], d[0]], c = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], L = 3000;
    function P(k, m){ return (c[0] + d[0] * k + n[0] * m) + "px " + (c[1] + d[1] * k + n[1] * m) + "px"; }
    var bg = document.createElement("div"); bg.className = "kz-cutbg"; fr.appendChild(bg);
    var made = [bg];
    [1, -1].forEach(function(s){
      var h = document.createElement("div"); h.className = "kz-half";
      var im = document.createElement("img"); im.alt = ""; im.src = img.currentSrc || img.src; h.appendChild(im);
      h.style.clipPath = h.style.webkitClipPath = "polygon(" + P(-L, 0) + "," + P(L, 0) + "," + P(L, s * L) + "," + P(-L, s * L) + ")";
      fr.appendChild(h); made.push(h);
      requestAnimationFrame(function(){ requestAnimationFrame(function(){
        h.style.transform = "translate(" + (n[0] * s * W * .18) + "px," + (n[1] * s * H * .3 + H * .08) + "px) rotate(" + (s * 4) + "deg)"; h.style.opacity = "0";
      }); });
    });
    var ln = document.createElement("div"); ln.className = "kz-slash"; var len = Math.hypot(W, H) * 1.3;
    ln.style.left = (c[0] - d[0] * len / 2) + "px"; ln.style.top = (c[1] - d[1] * len / 2) + "px"; ln.style.width = len + "px";
    fr.appendChild(ln); made.push(ln);
    var rot = "rotate(" + ang + "rad) ";
    if(ln.animate) ln.animate([{ transform: rot + "scaleX(0)", opacity: 1 }, { transform: rot + "scaleX(1)", opacity: 1, offset: .35 }, { transform: rot + "scaleX(1)", opacity: 0 }], { duration: 520, easing: "ease-out", fill: "forwards" });
    else ln.style.transform = rot;
    sound("slash");
    try{ window.goatcounter && window.goatcounter.count({ path: "slash: " + ((card._w && card._w.title) || ""), event: true }); }catch(e){}
    setTimeout(function(){ card._kzHold = false; card.click(); }, reduce ? 0 : 560);
    setTimeout(function(){ made.forEach(function(m){ m.remove(); }); done(); }, 1500);
  }
  function wireAll(){ document.querySelectorAll("#grid .card, #arcGrid .card").forEach(wire); }
  wireAll();
  /* архив догружается позже: подключаем новые карточки */
  try{ new MutationObserver(wireAll).observe(document.getElementById("works") || document.body, { childList: true, subtree: true }); }catch(e){}

  /* ---------- Draw a card ---------- */
  var head = document.querySelector("#works .s-head > div");
  if(!head) return;
  var lb = head.querySelector(".lb");
  var btn = document.createElement("button"); btn.type = "button"; btn.className = "kz-draw";
  function label(){ btn.textContent = uk() ? "Витягнути карту" : "Draw a card"; }
  label();
  if(lb){ lb.appendChild(document.createTextNode(" · ")); lb.appendChild(btn); }
  try{ new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] }); }catch(e){}

  var ov = null, tc, last = null, busy = false, curCard = null;
  function pool(){ return Array.prototype.filter.call(document.querySelectorAll("#grid .card, #arcGrid .card"), function(c){ return c._w && c._w.id; }); }
  function build(){
    ov = document.createElement("div"); ov.className = "kz-tov"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    ov.innerHTML = '<button class="kz-tx" type="button" aria-label="Close">✕</button>' +
      '<div class="kz-tz"><div class="kz-tc" tabindex="0" role="button">' +
      '<div class="kz-f kz-back"><img src="/img/k.png" alt=""><span>KATSUYUKI</span></div>' +
      '<div class="kz-f kz-front"><div class="n"></div><div class="a"><img alt=""></div><div class="t"></div><div class="y"></div></div>' +
      '</div></div><div class="kz-tb"><button class="w" type="button"></button><button class="g" type="button"></button></div>';
    document.body.appendChild(ov);
    tc = ov.querySelector(".kz-tc");
    ov.querySelector(".kz-tx").onclick = close;
    ov.addEventListener("click", function(e){ if(e.target === ov) close(); });
    ov.querySelector(".g").onclick = draw;
    ov.querySelector(".w").onclick = watch;
    tc.addEventListener("click", function(){ if(tc.classList.contains("flip")) watch(); else draw(); });
    tc.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); tc.click(); } });
  }
  function onKey(e){ if(e.key === "Escape") close(); }
  function open(){
    if(!ov) build();
    ov.querySelector(".w").textContent = uk() ? "Дивитися" : "Watch";
    ov.querySelector(".g").textContent = uk() ? "Ще карту" : "Draw again";
    tc.setAttribute("aria-label", uk() ? "Карта" : "Card");
    ov.hidden = false; requestAnimationFrame(function(){ ov.classList.add("on"); });
    document.addEventListener("keydown", onKey);
    try{ window.goatcounter && window.goatcounter.count({ path: "draw a card", event: true }); }catch(e){}
    setTimeout(draw, reduce ? 0 : 250);
  }
  function close(){
    if(!ov) return; ov.classList.remove("on"); document.removeEventListener("keydown", onKey);
    setTimeout(function(){ ov.hidden = true; tc.classList.remove("flip"); }, 350);
    btn.focus();
  }
  function draw(){
    if(busy) return; var p = pool(); if(!p.length) return; busy = true;
    function go(){
      var c; do{ c = p[Math.floor(Math.random() * p.length)]; } while(p.length > 1 && c === last); last = c; curCard = c;
      var w = c._w, all = pool(), i = all.indexOf(c);
      var fi = ov.querySelector(".kz-front img"), k = 0, src = ["/img/covers/" + w.id + ".jpg", "https://i.ytimg.com/vi/" + w.id + "/hqdefault.jpg"];
      fi.onerror = function(){ if(k < src.length) fi.src = src[k++]; }; fi.src = src[k++];
      ov.querySelector(".kz-front .n").textContent = roman(i + 1);
      ov.querySelector(".kz-front .t").textContent = w.title;
      ov.querySelector(".kz-front .y").textContent = w.year || "";
      /* переворот только после того, как тасовка закончилась: иначе первый раз карта просто дёргалась и резко показывала эдит */
      var flipped = false;
      function flip(){
        if(flipped) return; flipped = true; tc.removeEventListener("animationend", flip);
        tc.classList.remove("shuf"); void tc.offsetWidth;
        requestAnimationFrame(function(){ tc.classList.add("flip"); sound("flip"); setTimeout(function(){ busy = false; }, 400); });
      }
      tc.classList.remove("shuf"); void tc.offsetWidth;
      if(reduce){ flip(); return; }
      tc.addEventListener("animationend", flip); tc.classList.add("shuf");
      setTimeout(flip, 1200);
    }
    if(tc.classList.contains("flip")){ tc.classList.remove("flip"); setTimeout(go, reduce ? 0 : 650); } else go();
  }
  function watch(){
    if(!curCard || !tc.classList.contains("flip")) return;
    var c = curCard; close(); setTimeout(function(){ c.click(); }, 120);
  }
  btn.addEventListener("click", open);
})();
