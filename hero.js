/* ПЕРВЫЙ ЭКРАН (вариант Poster): последний эдит на весь экран, логотип поверх, ниже лента недавних.
   Старый разворот (.spread) остаётся в разметке скрытым: из него сюда переносятся логотип и строка статуса. */
(function(){
  var V = "poster";
  var root = document.documentElement;
  var uk = function(){ return root.lang === "uk"; };
  var L = {
    latest: ["Latest", "Останнє"], open: ["Open for commissions", "Відкритий до замовлень"], order: ["Order →", "Замовити →"],
    recent: ["Recent", "Нещодавні"], swipe: ["Swipe →", "Гортай →"], scroll: ["Scroll ↓", "Гортай ↓"], tap: ["Tap a cover", "Обери обкладинку"],
    works: ["Works", "Роботи"], news: ["News", "Новини"], contact: ["Contact", "Контакти"]
  };
  function tx(k){ return L[k][uk() ? 1 : 0]; }

  /* те же работы и тот же порядок, что на сайте: без архива, по году, новые сверху */
  var W = (window.WORKS || []).map(function(w, i){ w._i = i; return w; })
    .filter(function(w){ return !w.archive && w.id; })
    .sort(function(a, b){ return (+b.year || 0) - (+a.year || 0) || a._i - b._i; });
  if(!W.length) return;
  function cover(w, hq){ return "https://i.ytimg.com/vi/" + w.id + "/" + (hq ? "hqdefault" : "maxresdefault") + ".jpg"; }
  function img(w){ var i = new Image(); i.alt = ""; i.decoding = "async"; i.src = cover(w); i.onload = function(){ if(i.naturalWidth <= 120) i.src = cover(w, 1); }; i.onerror = function(){ i.onerror = null; i.src = cover(w, 1); }; return i; }
  function meta(w){ return [w.year].concat(w.tags || []).filter(Boolean).join(" · "); }
  /* открыть плеер сайта: нажимаем на карточку этой работы в сетке */
  function play(w){
    var c = Array.prototype.find.call(document.querySelectorAll("#grid .card, #arcGrid .card"), function(c){ return c._w && c._w.id === w.id; });
    if(c) c.click(); else window.open("https://www.youtube.com/watch?v=" + w.id, "_blank");
  }

  var css = '' +
    
    '.dh{position:relative;color:#eeebe5;--ink:#eeebe5}' +
    '.dh .bw{filter:grayscale(1) contrast(1.05)}' +
    '.dh .lbx{font-weight:700;text-transform:uppercase;letter-spacing:.02em;font-size:12px}' +
    '.dh .mu{opacity:.6}' +
    '.dh-full{--paper:#eeebe5;--logo:drop-shadow(0 6px 34px rgba(0,0,0,.55));--hair:rgba(238,235,229,.18);position:relative;height:calc(100svh - var(--th,57px));min-height:520px;max-height:900px;overflow:hidden;background:#000}' +
    '.dh-full>img.cv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}' +
    '.dh-full::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,6,6,.45) 0%,rgba(6,6,6,.25) 40%,rgba(6,6,6,.92) 88%);pointer-events:none}' +
    '.dh-logo{position:absolute;z-index:2;left:50%;top:40%;transform:translate(-50%,-50%);width:min(86%,640px);filter:none!important;pointer-events:none}' +
    '.dh-info{position:absolute;z-index:3;left:max(16px,4vw);right:max(16px,4vw);bottom:22px;display:grid;gap:12px}' +
    '.dh-logo .name{margin:0;font-size:inherit;line-height:0;display:block}.dh-logo .logo-img{width:100%;display:block}.dh-full .status{margin:0;border-top:1px solid var(--hair);border-bottom:0;padding:12px 0 0}' +
    '.dh-play{display:flex;align-items:center;gap:14px;background:none;border:0;color:inherit;cursor:pointer;padding:0;text-align:left;font:inherit}' +
    '.dh-play .c{width:54px;height:54px;border-radius:50%;border:1px solid #eeebe5;display:grid;place-items:center;flex:none;transition:background .25s}' +
    '.dh-play .c::before{content:"";border-left:13px solid #eeebe5;border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:4px;transition:border-color .25s}' +
    '.dh-play:hover .c{background:#eeebe5}.dh-play:hover .c::before{border-left-color:#060606}' +
    '.dh-play h2{margin:0;font-size:clamp(24px,4vw,44px);letter-spacing:-.02em;line-height:1}' +
    '.dh-st{display:flex;justify-content:space-between;align-items:center;gap:12px;border-top:1px solid rgba(238,235,229,.18);padding-top:12px}' +
    '.dh-st a{color:#eeebe5}' +
    '.dh-dot{display:inline-flex;align-items:center;gap:8px}.dh-dot i{width:7px;height:7px;border-radius:50%;background:var(--acc,#eeebe5);box-shadow:0 0 8px var(--acc,#eeebe5);animation:dhp 1.8s infinite}' +
    '@keyframes dhp{50%{opacity:.35}}' +
    /* лента недавних */
    '.dh-rh{display:flex;justify-content:space-between;padding:22px max(16px,4vw) 10px;color:var(--paper)}' +
    '.dh-strip{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 max(16px,4vw) 8px;scrollbar-width:none}' +
    '.dh-strip::-webkit-scrollbar{display:none}' +
    '.dh-strip button{flex:0 0 72%;scroll-snap-align:start;background:none;border:0;padding:0;color:var(--paper);text-align:left;cursor:pointer;font:inherit}' +
    '.dh-strip img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;transition:filter 1.6s}' +
    '.dh-strip button:hover img{filter:none}' +
    '.dh-strip span{display:block;margin-top:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '@media(min-width:761px){.dh-strip button{flex:0 0 calc(25% - 8px)}.dh-strip{overflow:hidden}.dh-sw{display:none}}' +
    /* stories */
    '.dh-st-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.12);transition:opacity .9s,transform 6s linear}' +
    '.dh-st-img.on{opacity:1;transform:scale(1)}' +
    '.dh-bars{position:absolute;z-index:4;left:max(16px,4vw);right:max(16px,4vw);top:12px;display:flex;gap:5px}' +
    '.dh-bars i{flex:1;height:2px;background:rgba(238,235,229,.25);overflow:hidden;border-radius:2px}' +
    '.dh-bars b{display:block;height:100%;width:0;background:#eeebe5}' +
    '.dh-bars i.done b{width:100%}.dh-bars i.run b{animation:dhbar 5s linear forwards}' +
    '.dh-full.hold .dh-bars i.run b{animation-play-state:paused}' +
    '@keyframes dhbar{to{width:100%}}' +
    '.dh-tap{position:absolute;top:0;bottom:190px;width:40%;z-index:3;cursor:pointer}.dh-tap.l{left:0;cursor:w-resize}.dh-tap.r{right:0;cursor:e-resize}' +
    /* marquee */
    '.dh-mq{padding:clamp(24px,4vw,48px) 0 0;color:var(--paper)}' +
    '.dh-mq .lg{display:block;width:min(86%,620px);margin:0 auto 22px}' +
    '.dh-row{overflow:hidden;padding:6px 0}' +
    '.dh-track{display:flex;width:max-content;animation:dhmq 40s linear infinite}' +
    '.dh-track.rev{animation-direction:reverse;animation-duration:55s}' +
    '.dh-row:hover .dh-track,.dh-row.hold .dh-track{animation-play-state:paused}' +
    '@keyframes dhmq{to{transform:translateX(-50%)}}' +
    '.dh-row button{flex:none;width:clamp(200px,24vw,340px);margin-right:10px;background:none;border:0;padding:0;cursor:pointer;transition:transform .3s}' +
    '.dh-row button img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;transition:filter 1.6s}' +
    '.dh-row button:hover{transform:translateY(-4px)}.dh-row button:hover img,.dh-row button.sel img{filter:none}' +
    '.dh-row button.sel img{outline:1px solid var(--paper);outline-offset:3px}' +
    '.dh-words span{white-space:nowrap;font-size:clamp(40px,6vw,84px);font-weight:700;text-transform:uppercase;letter-spacing:-.03em;color:transparent;-webkit-text-stroke:1px var(--paper);opacity:.5}' +
    '.dh-now{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;padding:18px max(16px,4vw) 0}' +
    '.dh-now .dh-play{color:var(--paper)}.dh-now .dh-play .c{border-color:var(--paper)}.dh-now .dh-play .c::before{border-left-color:var(--paper)}' +
    '.dh-now .dh-play:hover .c{background:var(--paper)}.dh-now .dh-play:hover .c::before{border-left-color:var(--void)}' +
    '.dh-mq .dh-st{margin:16px max(16px,4vw) 0;border-color:var(--hair)}.dh-mq .dh-st a{color:var(--paper)}' +
    /* mask */
    '.dh-run{position:relative;height:calc(100svh * 2.2)}.dh-mask-pad{height:0}' +
    '.dh-stick{position:sticky;top:var(--th,57px);height:calc(100svh - var(--th,57px));overflow:hidden;background:var(--void)}' +
    '.dh-mk{position:absolute;inset:0;background-size:cover;background-position:center;filter:grayscale(1) contrast(1.1);-webkit-mask:url(img/logo.png) center 42%/var(--ms,86%) auto no-repeat;mask:url(img/logo.png) center 42%/var(--ms,86%) auto no-repeat}' +
    '.dh-stick::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(6,6,6,.9));opacity:var(--sh,0);pointer-events:none}' +
    '.dh-hint{position:absolute;left:0;right:0;bottom:80px;text-align:center;color:var(--paper);animation:dhp 1.8s infinite}' +
    '.dh-stick .dh-info{opacity:0;transform:translateY(16px);transition:opacity .4s,transform .4s}' +
    '.dh-stick .dh-info.on{opacity:1;transform:none}' +
    /* меню на телефоне */
    '.dh-burger{display:none;width:34px;height:34px;border:1px solid var(--hair);border-radius:50%;background:none;color:var(--paper);place-items:center;cursor:pointer;padding:0}' +
    '.dh-burger i{display:block;width:14px;height:1.5px;background:currentColor;box-shadow:0 -5px 0 currentColor,0 5px 0 currentColor}' +
    '@media(max-width:760px){.top nav>a:not(.nav-cta),.top nav>.tgl{display:none!important}.dh-burger{display:grid}}' +
    '.dh-menu{position:fixed;inset:0;z-index:90;background:var(--void);display:flex;flex-direction:column;padding:calc(env(safe-area-inset-top,0px) + 16px) 22px calc(env(safe-area-inset-bottom,0px) + 28px);opacity:0;pointer-events:none;transition:opacity .3s;color:var(--paper)}' +
    '.dh-menu.on{opacity:1;pointer-events:auto}' +
    '.dh-menu .mh{display:flex;justify-content:space-between;align-items:center}.dh-menu .mh img{height:26px}' +
    '.dh-menu .x{width:36px;height:36px;border:1px solid var(--hair);border-radius:50%;background:none;color:var(--paper);font-size:16px;cursor:pointer}' +
    '.dh-menu nav{margin-top:auto;display:grid;gap:4px}' +
    '.dh-menu nav a{font-size:44px;font-weight:700;letter-spacing:-.03em;text-transform:uppercase;color:var(--paper);transform:translateY(18px);opacity:0;transition:transform .5s cubic-bezier(.2,.9,.2,1),opacity .4s}' +
    '.dh-menu.on nav a{transform:none;opacity:1}' +
    '.dh-menu nav a:nth-child(2){transition-delay:.05s}.dh-menu nav a:nth-child(3){transition-delay:.1s}.dh-menu nav a:nth-child(4){transition-delay:.15s}' +
    '.dh-menu .row{margin-top:26px;display:flex;gap:8px}' +
    '.dh-menu .row button{border:1px solid var(--hair);border-radius:99px;padding:8px 16px;background:none;color:var(--paper);cursor:pointer}' +
    '.dh-flag{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);transform:translateX(-50%);z-index:80;background:var(--bar);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid var(--hair);border-radius:99px;padding:8px 14px;color:var(--paper);display:flex;gap:10px;align-items:center;white-space:nowrap}' +
    '.dh-flag a{color:var(--paper);opacity:.6}.dh-flag a.on{opacity:1;text-decoration:underline}' +
    '@media(prefers-reduced-motion:reduce){.dh *{animation:none!important;transition:none!important}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var spread = document.querySelector(".spread"); if(!spread) return;
  function th(){ var t = document.querySelector(".top"); if(t) root.style.setProperty("--th", t.offsetHeight + "px"); }
  th(); addEventListener("resize", th);
  var hero = document.getElementById("dh"); if(!hero){ hero = document.createElement("div"); hero.className = "dh dh-poster"; spread.before(hero); }
  var w0 = W[0];
  function status(){ return '<div class="dh-st lbx"><span class="dh-dot"><i></i><span data-t="open"></span></span><a href="order/" data-t="order"></a></div>'; }
  function info(w, withMeta){ return '<div class="dh-info">' + (withMeta ? '<div class="lbx mu dh-meta"></div>' : '') + '<button class="dh-play" type="button"><span class="c"></span><h2></h2></button>' + status() + '</div>'; }

  if(V === "poster"){
    hero.innerHTML = '<div class="dh-full"></div><div class="dh-rh lbx"><span data-t="recent"></span><span class="mu dh-sw" data-t="swipe"></span></div><div class="dh-strip"></div>';
    var full = hero.querySelector(".dh-full"), cv = img(w0); cv.className = "cv bw"; full.appendChild(cv);
    full.insertAdjacentHTML("beforeend", '<div class="dh-logo hero-mark"></div>' + info(w0, true));
    var name = document.getElementById("heroName"); if(name) full.querySelector(".dh-logo").appendChild(name);
    var siteSt = document.querySelector(".spread .status"), myStatus = full.querySelector(".dh-st");
    if(siteSt){ siteSt.classList.add("dh-st"); myStatus.replaceWith(siteSt); }
    full.querySelector(".dh-meta").textContent = tx("latest") + " · " + meta(w0);
    full.querySelector("h2").textContent = w0.title;
    full.querySelector(".dh-play").onclick = function(){ play(w0); };
    var strip = hero.querySelector(".dh-strip");
    W.slice(1, 5).forEach(function(w){ var b = document.createElement("button"); b.type = "button"; var i = img(w); i.className = "bw"; b.appendChild(i); b.insertAdjacentHTML("beforeend", '<span class="lbx"></span>'); b.lastChild.textContent = w.title; b.onclick = function(){ play(w); }; strip.appendChild(b); });
  }

  /* меню-гамбургер на телефоне */
  var nav = document.querySelector(".top nav");
  if(nav){
    var bg = document.createElement("button"); bg.className = "dh-burger"; bg.type = "button"; bg.setAttribute("aria-label", "Menu"); bg.innerHTML = "<i></i>"; nav.appendChild(bg);
    var menu = document.createElement("div"); menu.className = "dh-menu"; menu.setAttribute("aria-hidden", "true");
    menu.innerHTML = '<div class="mh"><img class="logo-img" src="img/logo.png" alt="Katsuyuki"><button class="x" type="button" aria-label="Close">✕</button></div>' +
      '<nav><a href="#works" data-t="works"></a><a href="#news" data-t="news"></a><a href="#contact" data-t="contact"></a><a href="files/">PFS</a></nav>' +
      '<div class="row lbx"><button type="button" data-p="langBtn"></button><button type="button" data-p="themeBtn">◐</button></div>';
    document.body.appendChild(menu);
    function close(){ menu.classList.remove("on"); menu.setAttribute("aria-hidden", "true"); }
    bg.onclick = function(){ menu.classList.add("on"); menu.setAttribute("aria-hidden", "false"); };
    menu.querySelector(".x").onclick = close;
    menu.querySelectorAll("nav a").forEach(function(a){ a.addEventListener("click", close); });
    menu.querySelectorAll("[data-p]").forEach(function(b){ b.onclick = function(){ var t = document.getElementById(b.dataset.p); if(t) t.click(); }; });
  }

  function texts(){
    document.querySelectorAll(".dh [data-t], .dh-menu [data-t]").forEach(function(el){ el.textContent = tx(el.getAttribute("data-t")); });
    var lb = menu && menu.querySelector("[data-p=langBtn]"); if(lb) lb.textContent = uk() ? "EN" : "УКР";
  }
  texts();
  new MutationObserver(texts).observe(root, { attributes: true, attributeFilter: ["lang"] });
})();
