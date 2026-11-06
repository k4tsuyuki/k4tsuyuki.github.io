/* Тёмные штуки на главной:
   1) «Час волка»: с 00:00 до 04:00 по времени гостя сайт темнеет, в шапке надпись (посмотреть днём: ?wolf);
   2) Order в шапке: короткий клик просто открывает заказ, если зажать, вокруг кнопки набирается обводка и гудит;
   3) архив «All edits»: обложки можно схватить и бросить; переключатель Grid / Cabinet (архивный шкаф с ящиками);
   4) склеп: в самом низу страницы продолжаешь крутить вниз, страница уходит в темноту, спуск по ступеням, склеп со стеной клятв. */
(function(){
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var uk = function(){ return root.lang === "uk"; };
  var $ = function(id){ return document.getElementById(id); };
  var ENDPOINT = "https://script.google.com/macros/s/AKfycbz8BB4JviJmS3QEM2PcfzHuJt7190Vrx1Auoysb2Bj_WjxrKzrVK6FFg8vjXuT_uUM/exec";
  function track(p){ try{ window.goatcounter && window.goatcounter.count({ path: p, event: true }); }catch(e){} }
  var L = {
    wolf: ["The hour of the wolf", "Година вовка"],
    grid: ["Grid", "Сітка"], cab: ["Cabinet", "Шафа"],
    crypt: ["The crypt", "Склеп"], sealed: ["Sealed", "Запечатано"], next: ["Next edit", "Наступний едіт"], soon: ["Soon", "Скоро"],
    wall: ["Wall of oaths", "Стіна клятв"], your: ["Your name", "Ваше ім'я"], sign: ["Sign", "Підписати"], leave: ["Leave ↑", "Вийти ↑"],
    empty: ["No names yet. Be the first.", "Тут ще нікого. Будьте першими."], bad: ["Not this name", "Не це ім'я"], busy: ["Try again later", "Спробуйте пізніше"]
  };
  function t(k){ return L[k][uk() ? 1 : 0]; }
  var i18n = [];
  function bind(el, k, attr){ i18n.push([el, k, attr]); (attr ? el.setAttribute(attr, t(k)) : (el.textContent = t(k))); }
  try{ new MutationObserver(function(){ i18n.forEach(function(x){ x[2] ? x[0].setAttribute(x[2], t(x[1])) : (x[0].textContent = t(x[1])); }); }).observe(root, { attributes: true, attributeFilter: ["lang"] }); }catch(e){}

  var css = '' +
    /* час волка */
    '.kz-wl{display:none;color:var(--ash)}' +
    'html.kz-wolf .top .who [data-i18n="role"]{display:none}' +
    'html.kz-wolf .kz-wl{display:inline;animation:kzWl 2s ease both}' +
    '@keyframes kzWl{from{opacity:0}}' +
    '.kz-wv{position:fixed;inset:0;z-index:45;pointer-events:none;background:radial-gradient(ellipse at 50% 40%,rgba(0,0,0,.18),rgba(0,0,0,.5));opacity:0;transition:opacity 2s}' +
    'html.kz-wolf .kz-wv{opacity:1}' +
    'html.kz-wolf{--ash:#6b6b68}' +
    /* Order с зарядкой */
    '.top nav a.nav-cta{position:relative;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none}' +
    '.kz-ring{position:absolute;inset:-5px;width:calc(100% + 10px);height:calc(100% + 10px);pointer-events:none;overflow:visible}' +
    '.kz-ring rect{fill:none;stroke:var(--paper);stroke-width:2}' +
    '.top nav a.nav-cta.kz-full{background:var(--paper);color:var(--void)}' +
    /* бросок (только сетка архива) */
    '#arcGrid:not(.kz-cab) .card{touch-action:pan-y}' +
    '#arcGrid .card.kz-drag{position:relative;z-index:30;cursor:grabbing}' +
    '#arcGrid .card.kz-drag img{-webkit-user-drag:none}' +
    /* переключатель Grid / Cabinet */
    '.kz-vt{display:inline-flex;gap:6px;margin-left:auto}' +
    '.kz-vt[hidden]{display:none}' +
    '.kz-vt button{background:none;border:1px solid var(--hair);color:var(--ash);font:inherit;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:7px 13px;border-radius:999px;cursor:pointer;transition:border-color .25s,color .25s}' +
    '.kz-vt button[aria-pressed="true"]{border-color:var(--paper);color:var(--paper)}' +
    /* архивный шкаф: каждый эдит в ящике с биркой, ящик выдвигается при наведении */
    '#arcGrid.kz-cab{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;border:1px solid var(--hair);padding:10px;background:rgba(0,0,0,.25)}' +
    '#arcGrid.kz-cab .card{position:relative;display:block;height:92px;overflow:hidden;border:1px solid var(--hair);background:#0c0c0b}' +
    '#arcGrid.kz-cab .card .frame{position:absolute;inset:0;aspect-ratio:auto;height:100%;transform:none!important}' +
    '#arcGrid.kz-cab .card .frame img{filter:grayscale(1) brightness(.75) contrast(1.15)}' +
    '#arcGrid.kz-cab .card .frame .badge,#arcGrid.kz-cab .card .frame .pfm{display:none}' +
    '#arcGrid.kz-cab .card .c-meta{position:absolute;inset:0;z-index:5;margin:0;display:flex;align-items:center;gap:14px;padding:0 16px;background:linear-gradient(#171716,#0d0d0c);color:#eeebe5;transition:transform .7s cubic-bezier(.2,.8,.2,1)}' +
    '#arcGrid.kz-cab .card .c-meta > .m:first-child{display:block!important;flex:none;width:58px;font-size:12px;color:#8a8a86}' +
    '#arcGrid.kz-cab .card .c-meta .t{flex:1;min-width:0;border:1px solid #3a3a37;padding:8px 10px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '#arcGrid.kz-cab .card .c-meta .yr{flex:none;color:#8a8a86}' +
    '#arcGrid.kz-cab .card .c-meta .c-note{display:none}' +
    '#arcGrid.kz-cab .card .c-meta:after{content:"";flex:none;width:34px;height:10px;border:1px solid #4a4a46;border-top:0}' +
    '#arcGrid.kz-cab .card:hover .c-meta,#arcGrid.kz-cab .card:focus-visible .c-meta{transform:translateY(78%)}' +
    '@media(max-width:760px){#arcGrid.kz-cab{grid-template-columns:minmax(0,1fr)}#arcGrid.kz-cab .card .c-meta:after{display:none}}' +
    /* спуск в склеп */
    '.kz-sink{transform-origin:50% 100%;will-change:transform,filter}' +
    '.kz-veil{position:fixed;inset:0;z-index:55;pointer-events:none;background:linear-gradient(to top,#000 0%,rgba(0,0,0,.85) 30%,rgba(0,0,0,0) 75%);opacity:0}' +
    '.kz-pbar{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);z-index:56;width:120px;height:1px;margin-left:-60px;background:rgba(238,235,229,.18);overflow:hidden;opacity:0;pointer-events:none;transition:opacity .3s}' +
    '.kz-pbar i{position:absolute;inset:0;background:#eeebe5;transform:scaleX(0)}' +
    /* склеп */
    '.kz-crypt{position:fixed;inset:0;z-index:150;background:#000;color:#eeebe5;overflow-y:auto;overscroll-behavior:contain;display:none;font-family:inherit}' +
    '.kz-crypt.on{display:block}' +
    '.kz-crypt canvas{position:fixed;inset:0;width:100%;height:100%;pointer-events:none}' +
    '.kz-crypt .kz-st{z-index:4}' +
    '@property --kzr{syntax:"<percentage>";inherits:false;initial-value:0%}' +
    '.kz-room{position:relative;z-index:2;min-height:100%;display:flex;flex-direction:column;align-items:center;gap:26px;padding:calc(env(safe-area-inset-top,0px) + 56px) max(16px,env(safe-area-inset-right,0px)) calc(env(safe-area-inset-bottom,0px) + 48px) max(16px,env(safe-area-inset-left,0px));text-align:center;opacity:0;transform:scale(1.04);--kzr:0%;-webkit-mask-image:radial-gradient(circle at 50% 45%,#000 var(--kzr),transparent calc(var(--kzr) + 25%));mask-image:radial-gradient(circle at 50% 45%,#000 var(--kzr),transparent calc(var(--kzr) + 25%));transition:opacity 1.2s,transform 3s cubic-bezier(.2,.7,.2,1),--kzr 2.6s cubic-bezier(.3,0,.2,1)}' +
    '.kz-crypt.open .kz-room{opacity:1;transform:none;--kzr:120%}' +
    '.kz-room .lb{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}' +
    '.kz-room .m{color:#8a8a86}' +
    '.kz-ttl{display:flex;flex-direction:column;gap:8px;align-items:center}' +
    '.kz-ttl .jp{font-size:30px;color:#8a8a86}' +
    '.kz-arch{position:relative;width:min(300px,70vw);aspect-ratio:3/4;border:1px solid #3a3a37;border-radius:50% 50% 0 0/36% 36% 0 0;overflow:hidden;background:#050505;box-shadow:0 0 120px rgba(238,235,229,.06);flex:none}' +
    '.kz-arch:before{content:"";position:absolute;inset:8px;border:1px solid #1f1f1d;border-radius:inherit;z-index:2;pointer-events:none}' +
    '.kz-arch img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) blur(8px) brightness(.7) contrast(1.15);transform:scale(1.15)}' +
    '.kz-arch .lk{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:24px;gap:6px;background:linear-gradient(transparent 40%,rgba(0,0,0,.85))}' +
    '.kz-arch .lk b{font-size:20px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}' +
    '.kz-wall{width:min(760px,100%);border:1px solid #262624;background:repeating-linear-gradient(0deg,transparent 0 46px,#151514 46px 47px),#090909;padding:22px;display:flex;flex-direction:column;gap:16px}' +
    '.kz-names{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 22px;min-height:46px;max-height:260px;overflow-y:auto}' +
    '.kz-names span{font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:#7c7c78;text-shadow:0 1px 0 #000,0 -1px 0 #1d1d1b;overflow-wrap:anywhere}' +
    '.kz-names span.new{color:#eeebe5;animation:kzCarve 1.6s ease}' +
    '.kz-names em{font-style:normal;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5a5a56;align-self:center}' +
    '@keyframes kzCarve{from{letter-spacing:.8em;opacity:0}to{letter-spacing:.24em;opacity:1}}' +
    '.kz-sign{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}' +
    '.kz-sign input{background:#000;border:1px solid #2c2c2a;color:#eeebe5;font:inherit;padding:10px 12px;min-width:0;width:220px;max-width:100%;text-transform:uppercase;letter-spacing:.14em;font-size:12px;border-radius:0}' +
    '.kz-sign input:focus{outline:none;border-color:#eeebe5}' +
    '.kz-sign button,.kz-leave{background:none;border:1px solid #eeebe5;color:#eeebe5;font:inherit;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:10px 18px;cursor:pointer;border-radius:999px;transition:background .25s,color .25s}' +
    '.kz-sign button:hover,.kz-leave:hover{background:#eeebe5;color:#000}' +
    '.kz-leave{border-color:#3a3a37;border-radius:0}' +
    '.kz-smsg{min-height:14px;color:#8a8a86}' +
    '.kz-crypt :focus-visible{outline:2px solid #eeebe5;outline-offset:3px}' +
    '.kz-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}' +
    '@media(prefers-reduced-motion:reduce){.kz-room,.kz-wv{transition:none}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- звук (браузер включает его только после нажатия) ---------- */
  var AC = null;
  function ac(){ try{ AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if(AC.resume) AC.resume(); }catch(e){ AC = null; } return AC; }
  function noise(d){ var b = AC.createBuffer(1, Math.ceil(AC.sampleRate * d), AC.sampleRate), a = b.getChannelData(0); for(var i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; var s = AC.createBufferSource(); s.buffer = b; return s; }
  function click(f){ if(!AC || AC.state !== "running") return; var t = AC.currentTime, n = noise(.05), fl = AC.createBiquadFilter(), g = AC.createGain(); fl.type = "bandpass"; fl.frequency.value = f || 1800; g.gain.setValueAtTime(.2, t); g.gain.exponentialRampToValueAtTime(.001, t + .05); n.connect(fl); fl.connect(g); g.connect(AC.destination); n.start(t); }
  function rumble(){ if(!AC || AC.state !== "running") return; var t = AC.currentTime, n = noise(2.8), f = AC.createBiquadFilter(), g = AC.createGain();
    f.type = "lowpass"; f.frequency.setValueAtTime(140, t); f.frequency.linearRampToValueAtTime(60, t + 2.6);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.8, t + .5); g.gain.exponentialRampToValueAtTime(.001, t + 2.7);
    n.connect(f); f.connect(g); g.connect(AC.destination); n.start(t);
    var o = AC.createOscillator(), og = AC.createGain(); o.type = "sine"; o.frequency.setValueAtTime(55, t); o.frequency.linearRampToValueAtTime(41, t + 2.4);
    og.gain.setValueAtTime(.0001, t); og.gain.exponentialRampToValueAtTime(.3, t + .5); og.gain.exponentialRampToValueAtTime(.001, t + 2.8); o.connect(og); og.connect(AC.destination); o.start(t); o.stop(t + 2.9); }
  var humO = null, humG = null;
  function hum(on){ if(on){ if(humO || !ac()) return; try{ humO = AC.createOscillator(); humG = AC.createGain(); humO.type = "sawtooth"; humO.frequency.value = 60; humG.gain.value = 0; humO.connect(humG); humG.connect(AC.destination); humO.start(); }catch(e){ humO = null; } }
    else if(humO){ var o = humO; humG.gain.setTargetAtTime(0, AC.currentTime, .05); setTimeout(function(){ try{ o.stop(); }catch(e){} }, 300); humO = null; } }

  /* ---------- 1. Час волка ---------- */
  var who = document.querySelector(".top .who");
  if(who){ var wl = document.createElement("span"); wl.className = "m kz-wl"; bind(wl, "wolf"); who.appendChild(wl); }
  var wv = document.createElement("div"); wv.className = "kz-wv"; wv.setAttribute("aria-hidden", "true"); document.body.appendChild(wv);
  var forceWolf = /[?&]wolf\b/.test(location.search);
  function wolfCheck(){
    var h = new Date().getHours(), on = (forceWolf || h < 4) && root.getAttribute("data-theme") !== "light";
    root.classList.toggle("kz-wolf", on);
  }
  wolfCheck(); setInterval(wolfCheck, 60000);
  try{ new MutationObserver(wolfCheck).observe(root, { attributes: true, attributeFilter: ["data-theme"] }); }catch(e){}

  /* ---------- 2. Order с зарядкой ---------- */
  var ob = document.querySelector(".top nav a.nav-cta");
  if(ob){
    ob.insertAdjacentHTML("beforeend", '<svg class="kz-ring" aria-hidden="true"><rect x="1" y="1" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"></rect></svg>');
    var rect = ob.querySelector("rect"), ch = 0, holding = false, craf = 0, fired = false;
    var size = function(){ var r = ob.getBoundingClientRect(); if(!r.width) return; rect.setAttribute("width", r.width + 8); rect.setAttribute("height", r.height + 8); rect.setAttribute("rx", (r.height + 8) / 2); rect.setAttribute("ry", (r.height + 8) / 2); };
    size(); addEventListener("resize", size); if(document.fonts && document.fonts.ready) document.fonts.ready.then(size);
    var loop = function(){
      ch += holding ? 16 / 1100 : -16 / 400; ch = Math.max(0, Math.min(1, ch));
      rect.style.strokeDashoffset = 100 - ch * 100;
      if(humG){ humG.gain.value = ch * .04; humO.frequency.value = 60 + ch * 180; }
      ob.style.transform = holding && ch > .3 && !reduce ? "translate(" + ((Math.random() - .5) * ch * 3) + "px," + ((Math.random() - .5) * ch * 3) + "px)" : "";
      if(ch >= 1 && holding){ fire(); return; }
      if(ch > 0 || holding) craf = requestAnimationFrame(loop); else hum(false);
    };
    var fire = function(){
      holding = false; fired = true; hum(false); ob.classList.add("kz-full"); ob.style.transform = ""; click(900); track("order: charged");
      setTimeout(function(){ location.href = ob.href; }, 200);
      /* если человек вернулся назад, кнопка снова обычная */
      setTimeout(function(){ ob.classList.remove("kz-full"); ch = 0; fired = false; rect.style.strokeDashoffset = 100; }, 1500);
    };
    ob.addEventListener("pointerdown", function(e){ if(e.button) return; size(); fired = false; holding = true; ac(); hum(true); cancelAnimationFrame(craf); craf = requestAnimationFrame(loop); });
    var stop = function(){ holding = false; };
    ob.addEventListener("pointerup", stop); ob.addEventListener("pointerleave", stop); ob.addEventListener("pointercancel", stop);
    /* обычный клик (даже если чуть подержали) просто открывает заказ; после полной зарядки переход уже идёт сам */
    ob.addEventListener("click", function(e){ if(fired) e.preventDefault(); });
    ob.addEventListener("contextmenu", function(e){ if(holding || fired) e.preventDefault(); });
  }

  /* ---------- 3. Архив: бросок + шкаф ---------- */
  function throwable(c){
    if(c._kzT) return; c._kzT = 1;
    var s = null, x = 0, y = 0, vx = 0, vy = 0, rot = 0, vr = 0, raf = 0, lt = 0, moved = false, eat = false;
    var apply = function(){ c.style.transform = x || y || rot ? "translate(" + x + "px," + y + "px) rotate(" + rot + "deg)" : ""; };
    c.addEventListener("pointerdown", function(e){
      if(AG.classList.contains("kz-cab") || (e.pointerType === "mouse" && e.button !== 0)) return;
      cancelAnimationFrame(raf); s = { px: e.clientX, py: e.clientY, x: x, y: y, id: e.pointerId }; moved = false; vx = vy = 0; lt = performance.now();
    });
    c.addEventListener("pointermove", function(e){
      if(!s || e.pointerId !== s.id) return;
      var nx = s.x + e.clientX - s.px, ny = s.y + e.clientY - s.py, now = performance.now(), dt = Math.max(1, now - lt);
      if(!moved){ if(Math.hypot(nx - s.x, ny - s.y) < 8) return; moved = true; c.classList.add("kz-drag"); try{ c.setPointerCapture(e.pointerId); }catch(_){} }
      vx = (nx - x) / dt * 16; vy = (ny - y) / dt * 16; lt = now; x = nx; y = ny; rot = Math.max(-25, Math.min(25, vx * 1.2)); apply();
    });
    function rel(e){
      if(!s) return; s = null; if(!moved) return;
      eat = true; setTimeout(function(){ eat = false; }, 50);
      vr = vx * .8; var t0 = performance.now();
      if(Math.hypot(vx, vy) > 6) track("archive: throw");
      var step = function(now){
        var r = c.getBoundingClientRect();
        if(now - t0 < 900 && !reduce){
          x += vx; y += vy; rot += vr; vx *= .965; vy = vy * .965 + .55; vr *= .96;
          if((r.left < 0 && vx < 0) || (r.right > innerWidth && vx > 0)){ vx *= -.6; vr *= -.6; }
          if((r.top < 52 && vy < 0) || (r.bottom > innerHeight && vy > 0)) vy *= -.55;
        } else {
          x *= .82; y *= .82; rot *= .8;
          if(Math.abs(x) < .5 && Math.abs(y) < .5){ x = y = rot = 0; apply(); c.classList.remove("kz-drag"); return; }
        }
        apply(); raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    c.addEventListener("pointerup", rel); c.addEventListener("pointercancel", function(){ if(s && !moved) s = null; else rel(); });
    /* после броска клик не открывает плеер */
    c.addEventListener("click", function(e){ if(eat){ e.stopImmediatePropagation(); e.preventDefault(); } }, true);
    c.addEventListener("dragstart", function(e){ e.preventDefault(); });
  }
  var AG = $("arcGrid");
  if(AG){
    Array.prototype.forEach.call(AG.querySelectorAll(".card"), throwable);
    var moreRow = AG.nextElementSibling && AG.nextElementSibling.classList.contains("all-more") ? AG.nextElementSibling : null;
    var vt = document.createElement("div"); vt.className = "kz-vt"; vt.setAttribute("role", "group"); vt.hidden = true;
    var bG = document.createElement("button"), bC = document.createElement("button");
    [bG, bC].forEach(function(b){ b.type = "button"; vt.appendChild(b); });
    bind(bG, "grid"); bind(bC, "cab"); vt.setAttribute("aria-label", "View");
    var setView = function(cab, save){
      AG.classList.toggle("kz-cab", cab); bG.setAttribute("aria-pressed", !cab); bC.setAttribute("aria-pressed", cab);
      if(cab) Array.prototype.forEach.call(AG.querySelectorAll(".card"), function(c){ c.style.transform = ""; c.classList.remove("kz-drag"); });
      if(save){ try{ localStorage.setItem("kz-arc", cab ? "cab" : "grid"); }catch(e){} track("archive: " + (cab ? "cabinet" : "grid")); }
    };
    bG.onclick = function(){ setView(false, true); }; bC.onclick = function(){ setView(true, true); };
    var saved = null; try{ saved = localStorage.getItem("kz-arc"); }catch(e){}
    setView(saved === "cab", false);
    if(moreRow){ moreRow.style.display = "flex"; moreRow.style.flexWrap = "wrap"; moreRow.style.gap = "10px"; moreRow.style.alignItems = "center"; moreRow.appendChild(vt); }
    else AG.before(vt);
    var syncVt = function(){ vt.hidden = AG.hidden; };
    syncVt();
    try{ new MutationObserver(syncVt).observe(AG, { attributes: true, attributeFilter: ["hidden"] }); }catch(e){}
  }

  /* ---------- 4. Склеп ---------- */
  var sinkEls = [document.querySelector("main"), document.querySelector("footer")].filter(Boolean);
  sinkEls.forEach(function(el){ el.classList.add("kz-sink"); });
  var veil = document.createElement("div"); veil.className = "kz-veil"; veil.setAttribute("aria-hidden", "true"); document.body.appendChild(veil);
  var pbar = document.createElement("div"); pbar.className = "kz-pbar"; pbar.setAttribute("aria-hidden", "true"); pbar.innerHTML = "<i></i>"; document.body.appendChild(pbar);
  var endK = document.querySelector("footer .jp");
  var pull = 0, decay = 0, opened = false, ty = null, cr = null, fogRaf = 0;

  function maxS(){ return Math.max(1, document.documentElement.scrollHeight - innerHeight); }
  function atBottom(){ return scrollY >= maxS() - 2; }
  function busy(){
    if(opened) return true;
    var p = $("player"); if(p && !p.hidden) return true;
    if(document.querySelector(".kz-tov.on, .kz-sov")) return true;
    return false;
  }
  function paint(){
    var p = pull;
    sinkEls.forEach(function(el){
      el.style.transform = p ? "translateY(" + (-p * 70) + "px) scale(" + (1 - p * .05) + ")" : "";
      el.style.filter = p ? "brightness(" + (1 - p * .75) + ")" + (p > .02 ? " blur(" + (p * 1.5) + "px)" : "") : "";
    });
    veil.style.opacity = p; pbar.style.opacity = p ? 1 : 0; pbar.firstChild.style.transform = "scaleX(" + p + ")";
    if(endK) endK.style.textShadow = p ? "0 0 " + (p * 24) + "px rgba(238,235,229," + (p * .8) + ")" : "";
  }
  function setPull(v){
    pull = Math.max(0, Math.min(1, v)); paint(); clearTimeout(decay);
    if(pull > 0 && !opened) decay = setTimeout(function d(){ pull = Math.max(0, pull - .035); paint(); if(pull > 0) decay = setTimeout(d, 30); }, 420);
    if(pull >= 1 && !opened) openCrypt();
  }
  addEventListener("wheel", function(e){ if(busy() || e.deltaY <= 0 || !atBottom()) return; setPull(pull + Math.min(e.deltaY, 120) / 1500); }, { passive: true });
  addEventListener("touchstart", function(e){ ty = e.touches[0].clientY; }, { passive: true });
  addEventListener("touchmove", function(e){ if(busy() || ty == null || !atBottom()) return; var y = e.touches[0].clientY, d = ty - y; ty = y; if(d > 0) setPull(pull + d / 520); }, { passive: true });
  addEventListener("keydown", function(e){
    if(busy() || !atBottom()) return;
    var a = document.activeElement; if(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
    if(e.key === "PageDown" || e.key === "ArrowDown" || (e.key === " " && (!a || a === document.body))) setPull(pull + .12);
  });

  function build(){
    cr = document.createElement("div"); cr.className = "kz-crypt"; cr.setAttribute("role", "dialog"); cr.setAttribute("aria-modal", "true");
    cr.innerHTML = '<canvas class="kz-fog" aria-hidden="true"></canvas>' +
      '<div class="kz-room">' +
        '<div class="kz-ttl"><span class="jp">終</span><span class="lb m" data-k="crypt"></span></div>' +
        '<div class="kz-arch"><img alt=""><div class="lk"><span class="lb m" data-k="sealed"></span><b data-k="next"></b><span class="lb m" data-k="soon"></span></div></div>' +
        '<div class="kz-wall"><span class="lb m"><span data-k="wall"></span></span><div class="kz-names" aria-live="polite"></div>' +
          '<form class="kz-sign"><input maxlength="18" autocomplete="off" spellcheck="false"><input class="kz-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit" data-k="sign"></button></form>' +
          '<span class="lb kz-smsg" role="status"></span></div>' +
        '<button class="kz-leave" type="button" data-k="leave"></button>' +
      '</div><canvas class="kz-st" aria-hidden="true"></canvas>';
    document.body.appendChild(cr);
    Array.prototype.forEach.call(cr.querySelectorAll("[data-k]"), function(el){ bind(el, el.getAttribute("data-k")); });
    var inp = cr.querySelector(".kz-sign input"); bind(inp, "your", "placeholder"); bind(inp, "your", "aria-label"); bind(cr, "crypt", "aria-label");
    cr.querySelector(".kz-leave").addEventListener("click", leave);
    cr.querySelector(".kz-sign").addEventListener("submit", sign);
    cr.addEventListener("keydown", function(e){ if(e.key === "Escape") leave(); });
  }
  function cover(){
    var i = document.querySelector("#grid .card.big img") || document.querySelector("#grid .card img") || $("coverImg");
    return i ? (i.currentSrc || i.src) : "/img/og.jpg";
  }

  /* стена клятв: имена с сервера + своё имя, которое человек оставил на этом устройстве */
  var mine = null; try{ mine = localStorage.getItem("kz-oath"); }catch(e){}
  function addName(n, fresh, first){
    var box = cr.querySelector(".kz-names"), em = box.querySelector("em"); if(em) em.remove();
    var s = document.createElement("span"); s.textContent = n; if(fresh) s.className = "new";
    first ? box.prepend(s) : box.appendChild(s);
  }
  function loadNames(){
    var box = cr.querySelector(".kz-names"); box.innerHTML = "";
    var show = function(list){
      box.innerHTML = "";
      var low = list.map(function(x){ return String(x).toLowerCase(); });
      if(mine && low.indexOf(mine.toLowerCase()) < 0) addName(mine);
      list.forEach(function(n){ addName(String(n)); });
      if(!box.children.length){ var em = document.createElement("em"); bind(em, "empty"); box.appendChild(em); }
    };
    fetch(ENDPOINT + "?oaths=1").then(function(r){ return r.json(); }).then(function(j){ show(j && j.oaths || []); }).catch(function(){ show([]); });
  }
  function sign(e){
    e.preventDefault();
    var f = e.target, inp = f.querySelector("input"), msg = cr.querySelector(".kz-smsg");
    var v = inp.value.replace(/\s+/g, " ").trim().slice(0, 18);
    msg.textContent = "";
    if(!v) return;
    if(!/^[\p{L}\p{N} ._'\-]+$/u.test(v)){ msg.textContent = t("bad"); return; }
    addName(v, true, true); inp.value = ""; ac(); click(600); setTimeout(function(){ click(500); }, 120);
    mine = v; try{ localStorage.setItem("kz-oath", v); }catch(_){}
    track("crypt: oath");
    fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "oath", name: v, website: f.website.value }) })
      .then(function(r){ return r.json(); })
      .then(function(j){
        if(j && j.error === "name"){ var s = cr.querySelector(".kz-names span.new"); if(s) s.remove(); mine = null; try{ localStorage.removeItem("kz-oath"); }catch(_){} msg.textContent = t("bad"); }
        else if(j && j.error === "busy") msg.textContent = t("busy");
      }).catch(function(){});
  }

  function openCrypt(){
    opened = true; clearTimeout(decay); ac(); rumble(); track("crypt");
    if(!cr) build();
    cr.querySelector(".kz-arch img").src = cover();
    loadNames();
    sinkEls.forEach(function(el){ el.style.transition = "transform 1s cubic-bezier(.6,0,.9,.4),filter 1s"; el.style.transform = "translateY(-160px) scale(.9)"; el.style.filter = "brightness(0) blur(4px)"; });
    veil.style.transition = "opacity .8s"; veil.style.opacity = 1; pbar.style.opacity = 0;
    setTimeout(function(){
      cr.classList.add("on"); cr.scrollTop = 0; document.documentElement.style.overflow = "hidden";
      startFog();
      stairs(function(){ cr.classList.add("open"); setTimeout(function(){ cr.querySelector(".kz-leave").focus({ preventScroll: true }); }, 1800); });
    }, reduce ? 0 : 900);
  }
  function leave(){
    if(!cr || !opened) return;
    cr.classList.remove("open");
    setTimeout(function(){
      cr.classList.remove("on"); cancelAnimationFrame(fogRaf); document.documentElement.style.overflow = "";
      pull = 0;
      sinkEls.forEach(function(el){ el.style.transition = "none"; });
      veil.style.transition = ""; paint();
      requestAnimationFrame(function(){ sinkEls.forEach(function(el){ el.style.transition = ""; }); });
      opened = false; window.scrollTo({ top: 0, behavior: "instant" });
    }, reduce ? 0 : 1300);
  }

  /* спуск: ступени уходят вниз в темноту, потом из центра проявляется склеп */
  function stairs(done){
    var cv = cr.querySelector(".kz-st"), x = cv.getContext("2d"), D = Math.min(2, devicePixelRatio || 1), W = cv.width = innerWidth * D, H = cv.height = innerHeight * D;
    cv.style.display = "block"; cv.style.opacity = 1; cv.style.transition = "";
    if(reduce){ cv.style.display = "none"; done(); return; }
    var T = 1900, t0 = performance.now(), hz = H * .34, fired = false;
    var f = function(now){
      var t = Math.min(1, (now - t0) / T), ease = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      x.fillStyle = "#000"; x.fillRect(0, 0, W, H);
      var off = ease * 9;
      for(var k = 0; k < 26; k++){
        var z = k + 1 - (off % 1); if(z <= 0) continue;
        var p = 1 / z, y = hz + (H * 1.1) * p, hw = W * .55 * p + W * .04;
        var fade = Math.max(0, 1 - t * .85) * Math.min(1, p * 4) * (1 - k / 30);
        if(fade <= 0 || y > H * 1.2) continue;
        x.strokeStyle = "rgba(238,235,229," + (fade * .85) + ")"; x.lineWidth = Math.max(1, 3 * p * D);
        x.beginPath(); x.moveTo(W / 2 - hw, y); x.lineTo(W / 2 + hw, y); x.stroke();
        var y2 = hz + (H * 1.1) / (z + 1), hw2 = W * .55 / (z + 1) + W * .04;
        x.fillStyle = "rgba(58,58,54," + (fade * .75) + ")";
        x.beginPath(); x.moveTo(W / 2 - hw, y); x.lineTo(W / 2 + hw, y); x.lineTo(W / 2 + hw2, y2); x.lineTo(W / 2 - hw2, y2); x.closePath(); x.fill();
      }
      x.strokeStyle = "rgba(238,235,229," + Math.max(0, .3 - t * .3) + ")"; x.lineWidth = D;
      x.beginPath(); x.moveTo(W * .02, H); x.lineTo(W / 2 - W * .04, hz); x.moveTo(W * .98, H); x.lineTo(W / 2 + W * .04, hz); x.stroke();
      var v = x.createRadialGradient(W / 2, hz, 0, W / 2, hz, Math.max(W, H) * .8);
      v.addColorStop(0, "rgba(0,0,0," + (.05 + t * .5) + ")"); v.addColorStop(1, "rgba(0,0,0,.75)"); x.fillStyle = v; x.fillRect(0, 0, W, H);
      if(t > .62 && !fired){ fired = true; done(); }
      if(t < 1) requestAnimationFrame(f);
      else { cv.style.transition = "opacity .6s"; cv.style.opacity = 0; setTimeout(function(){ cv.style.display = "none"; }, 650); }
    };
    requestAnimationFrame(f);
  }
  function startFog(){
    var cv = cr.querySelector(".kz-fog"), x = cv.getContext("2d"), D = Math.min(2, devicePixelRatio || 1), W = cv.width = innerWidth * D, H = cv.height = innerHeight * D;
    var P = [], A = [], i;
    for(i = 0; i < 40; i++) P.push({ x: Math.random() * W, y: H * (.55 + Math.random() * .5), r: (80 + Math.random() * 220) * D, vx: (Math.random() - .5) * .25 * D, a: .02 + Math.random() * .035 });
    for(i = 0; i < 60; i++) A.push({ x: Math.random() * W, y: Math.random() * H, v: (.08 + Math.random() * .25) * D, s: (.6 + Math.random() * 1.4) * D });
    var frame = function(){
      x.clearRect(0, 0, W, H);
      var g = x.createRadialGradient(W / 2, H * .4, 0, W / 2, H * .4, Math.max(W, H) * .6); g.addColorStop(0, "rgba(238,235,229,.07)"); g.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H);
      P.forEach(function(p){ p.x += p.vx; if(p.x < -p.r) p.x = W + p.r; if(p.x > W + p.r) p.x = -p.r; var q = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); q.addColorStop(0, "rgba(200,200,195," + p.a + ")"); q.addColorStop(1, "rgba(200,200,195,0)"); x.fillStyle = q; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill(); });
      x.fillStyle = "rgba(238,235,229,.35)";
      A.forEach(function(d){ d.y -= d.v; d.x += Math.sin(d.y / 40) * .15; if(d.y < 0){ d.y = H; d.x = Math.random() * W; } x.fillRect(d.x, d.y, d.s, d.s); });
      if(!reduce) fogRaf = requestAnimationFrame(frame);
    };
    frame();
  }
})();
