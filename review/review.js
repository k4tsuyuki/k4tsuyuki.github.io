/* Страница превью для заказчика: katsuyuki.studio/review/?k=ключ
   Клиент смотрит черновик (YouTube "по ссылке"), оставляет комментарии к секундам и нажимает Approve.
   LIVE: false — для обычных посетителей висит плашка "техработы". Проверка: ?test (настоящие данные) или ?demo (пример). */
(function(){
  var LIVE = false;
  var ENDPOINT = "https://script.google.com/macros/s/AKfycbz8BB4JviJmS3QEM2PcfzHuJt7190Vrx1Auoysb2Bj_WjxrKzrVK6FFg8vjXuT_uUM/exec";
  var q = new URLSearchParams(location.search), key = q.get("k") || "", DEMO = q.has("demo"), TEST = q.has("test");
  var root = document.documentElement, app = document.getElementById("app");
  var uk = function(){ return root.lang === "uk"; };
  function both(en, ua){ return '<span data-en>' + en + '</span><span data-uk>' + ua + '</span>'; }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]; }); }
  function mmss(t){ t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ":" + ("0" + t % 60).slice(-2); }
  function state(h, p, en, ua){
    app.innerHTML = '<div class="state"><div>' + (h ? '<div class="lb m">' + h + '</div>' : '') + '<h1>' + p + '</h1><p>' + both(en, ua) + '</p><a class="btn lb" href="/">katsuyuki.studio</a></div></div>';
  }

  if(!LIVE && !DEMO && !TEST){
    state(both("Under maintenance", "Технічні роботи"), both("Coming soon", "Скоро"), "This page is being set up and will work soon.", "Ця сторінка налаштовується і скоро запрацює.");
    return;
  }

  /* пример для ?demo */
  var demo = { ok: true, name: "Ann", draft: 1, items: "1 × Short (€20)", video: "YSs2BbX69Fo", approved: false,
    comments: [{ t: 6, text: "Can the flash be a bit softer here?" }, { t: 21, text: "Maybe use the scene with the rain instead" }] };

  function api(o){
    if(DEMO){
      if(o.action === "comment") demo.comments = demo.comments.concat([{ t: o.t, text: o.text }]).sort(function(a, b){ return a.t - b.t; });
      if(o.action === "approve") demo.approved = true;
      return new Promise(function(ok){ setTimeout(function(){ ok(JSON.parse(JSON.stringify(demo))); }, 300); });
    }
    o.k = key;
    return fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(o) })
      .then(function(r){ return r.json(); }).then(function(j){ if(!j.ok) throw new Error(j.error || "error"); return j; });
  }

  if(!DEMO && !/^\w{20}$/.test(key)){
    state("", both("Link not found", "Посилання не знайдено"), "Check the link in your email or reply to it.", "Перевірте посилання в листі або дайте на нього відповідь.");
    return;
  }

  var data = null, yp = null, timer = null, dur = 0, frozen = null, drag = false;
  var IC_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>', IC_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
  var IC_SND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" stroke="none"/><path d="M16 9a4 4 0 010 6M19 6a8 8 0 010 12"/></svg>';

  api({ action: "review" }).then(function(j){ data = j; render(); })
    .catch(function(e){
      if(String(e && e.message) === "not found") state("", both("Link not found", "Посилання не знайдено"), "Check the link in your email or reply to it.", "Перевірте посилання в листі або дайте на нього відповідь.");
      else state("", both("Something went wrong", "Щось пішло не так"), "Try again in a minute or reply to the email.", "Спробуйте ще раз за хвилину або дайте відповідь на лист.");
    });

  function render(){
    var cover = "https://i.ytimg.com/vi/" + data.video + "/hqdefault.jpg";
    app.innerHTML =
      '<div class="rv-head"><div><div class="lb m">' + both("Draft ", "Чернетка ") + data.draft + (DEMO ? ' · demo' : '') + '</div>' +
        '<h1>' + both(esc(data.name) + "’s edit", "Едіт для " + esc(data.name)) + '</h1><div class="lb m">' + esc(data.items).replace(/\n/g, " · ") + '</div></div></div>' +
      '<div class="rv"><div>' +
        '<div class="frame"><div class="mp">' +
          '<div class="yt"><div id="mpMount"></div></div><div class="mp-shield"></div>' +
          '<div class="mp-cov" style="background-image:url(' + cover + ')"><span class="mp-load"></span><span class="mp-ic">' + IC_PLAY + '</span></div>' +
          '<div class="mp-bar lb"><button class="mp-b" type="button" id="bPlay" aria-label="Play">' + IC_PLAY + '</button><span class="mp-t" id="tCur">0:00</span>' +
          '<div class="mp-seek" id="seek" role="slider" aria-label="Seek" tabindex="0"><i id="fill"></i></div><span class="mp-t" id="tDur">0:00</span>' +
          '<button class="mp-b" type="button" id="bMute" aria-label="Mute">' + IC_SND + '</button></div></div>' +
          '<div class="wm"><span>Katsuyuki · Preview</span></div></div>' +
        '<form class="add" id="add"><span class="at lb" id="at">0:00</span><input id="txt" maxlength="1000" autocomplete="off"><button class="btn solid lb" type="submit" id="send">' + both("Send", "Надіслати") + '</button></form>' +
        '<p class="hint">' + both("Pause where you want a change and write a comment. It's saved with that second.", "Поставте паузу там, де хочете зміну, і напишіть коментар. Він збережеться з цією секундою.") + '</p>' +
        '<div class="msg lb" id="msg"></div>' +
      '</div><aside class="side"><div class="lb m" id="cmHead"></div><div class="cms" id="cms"></div><div class="ok-box" id="okBox"></div></aside></div>';
    var txt = document.getElementById("txt");
    txt.placeholder = uk() ? "Коментар до цього моменту…" : "Comment at this moment…";
    document.getElementById("langBtn").addEventListener("click", function(){ setTimeout(function(){ txt.placeholder = uk() ? "Коментар до цього моменту…" : "Comment at this moment…"; }, 50); });
    txt.addEventListener("focus", function(){ if(frozen == null) frozen = now(); showAt(); });
    txt.addEventListener("input", function(){ if(!txt.value) { frozen = null; showAt(); } });
    document.getElementById("add").addEventListener("submit", function(e){
      e.preventDefault();
      var v = txt.value.trim(); if(!v) return;
      var b = document.getElementById("send"), t = frozen != null ? frozen : now();
      b.disabled = true; msg(uk() ? "Надсилаю…" : "Sending…");
      api({ action: "comment", t: Math.round(t * 10) / 10, text: v }).then(function(j){ data = j; txt.value = ""; frozen = null; side(); marks(); msg(uk() ? "Збережено ✓" : "Saved ✓"); })
        .catch(function(e){ msg(String(e && e.message) === "limit" ? (uk() ? "Забагато коментарів. Дайте відповідь на лист." : "Too many comments. Please reply to the email instead.") : (uk() ? "Не вдалося надіслати. Спробуйте ще раз." : "Couldn't send. Try again.")); })
        .then(function(){ b.disabled = false; });
    });
    side(); player();
  }
  function msg(t){ var m = document.getElementById("msg"); if(m) m.textContent = t || ""; }
  function now(){ return yp && yp.getCurrentTime ? yp.getCurrentTime() : 0; }
  function showAt(){ var a = document.getElementById("at"); if(a) a.textContent = mmss(frozen != null ? frozen : now()); }
  function side(){
    var c = data.comments || [];
    document.getElementById("cmHead").innerHTML = both("Comments", "Коментарі") + " · " + c.length;
    var list = document.getElementById("cms");
    list.innerHTML = c.length ? "" : '<div class="empty">' + both("No comments yet.", "Коментарів поки немає.") + '</div>';
    c.forEach(function(x){
      var b = document.createElement("button"); b.type = "button"; b.className = "cm";
      b.innerHTML = '<span class="t lb">' + mmss(x.t) + '</span><span class="x"></span>'; b.lastChild.textContent = x.text;
      b.addEventListener("click", function(){ if(yp && yp.seekTo){ yp.seekTo(x.t, true); yp.pauseVideo(); } });
      list.appendChild(b);
    });
    var ok = document.getElementById("okBox");
    if(data.approved) ok.innerHTML = '<div class="lb">' + both("Approved ✓", "Схвалено ✓") + '</div><p>' + both("Thank you! Katsuyuki got it.", "Дякую! Katsuyuki отримав це.") + '</p>';
    else {
      ok.innerHTML = '<button class="btn solid lb" type="button" id="approve">' + both("Approve ✓", "Схвалити ✓") + '</button><p>' + both("Press when everything is good and the edit is final.", "Натисніть, коли все подобається і едіт фінальний.") + '</p>';
      document.getElementById("approve").addEventListener("click", function(){
        var b = this; b.disabled = true;
        api({ action: "approve" }).then(function(j){ data = j; side(); }).catch(function(){ b.disabled = false; msg(uk() ? "Не вдалося. Спробуйте ще раз." : "Something went wrong. Try again."); });
      });
    }
  }
  function marks(){
    var s = document.getElementById("seek"); if(!s || !dur) return;
    s.querySelectorAll("b").forEach(function(b){ b.remove(); });
    (data.comments || []).forEach(function(x){ var b = document.createElement("b"); b.style.left = Math.min(100, x.t / dur * 100) + "%"; s.appendChild(b); });
  }
  function loadApi(cb){
    if(window.YT && window.YT.Player) return cb(true);
    window.onYouTubeIframeAPIReady = function(){ cb(true); };
    var sc = document.createElement("script"); sc.src = "https://www.youtube.com/iframe_api"; sc.onerror = function(){ cb(false); }; document.head.appendChild(sc);
  }
  function player(){
    var mp = document.querySelector(".mp"), cov = mp.querySelector(".mp-cov"), seek = document.getElementById("seek"), fill = document.getElementById("fill");
    var bPlay = document.getElementById("bPlay"), bMute = document.getElementById("bMute"), tCur = document.getElementById("tCur"), tDur = document.getElementById("tDur");
    function show(c){ fill.style.width = (dur ? c / dur * 100 : 0) + "%"; tCur.textContent = mmss(c); tDur.textContent = mmss(dur); if(frozen == null) showAt(); }
    function toggle(){ if(!yp || !yp.getPlayerState) return; if(yp.getPlayerState() === 1) yp.pauseVideo(); else yp.playVideo(); }
    function at(x){ var r = seek.getBoundingClientRect(), k = Math.min(1, Math.max(0, (x - r.left) / r.width)); show(k * dur); return k * dur; }
    mp.querySelector(".mp-shield").addEventListener("click", toggle);
    bPlay.addEventListener("click", toggle);
    bMute.addEventListener("click", function(){ if(!yp || !yp.isMuted) return; if(yp.isMuted()) yp.unMute(); else yp.mute(); setTimeout(function(){ bMute.style.opacity = yp.isMuted() ? .4 : 1; }, 60); });
    seek.addEventListener("pointerdown", function(e){ drag = true; seek.setPointerCapture(e.pointerId); at(e.clientX); });
    seek.addEventListener("pointermove", function(e){ if(drag) at(e.clientX); });
    seek.addEventListener("pointerup", function(e){ if(!drag) return; drag = false; var t = at(e.clientX); if(yp) yp.seekTo(t, true); });
    seek.addEventListener("keydown", function(e){ if(!yp) return; if(e.key === "ArrowRight") yp.seekTo(now() + 5, true); if(e.key === "ArrowLeft") yp.seekTo(now() - 5, true); });
    mp.classList.add("ps");
    loadApi(function(ok){
      if(!ok){ cov.innerHTML = '<a class="pv-play lb" href="https://youtu.be/' + data.video + '" target="_blank" rel="noopener">' + both("Watch on YouTube ↗", "Дивитися на YouTube ↗") + '</a>'; return; }
      yp = new YT.Player("mpMount", {
        videoId: data.video,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: function(e){ dur = e.target.getDuration() || 0; show(0); marks(); },
          onStateChange: function(e){
            var s = e.data;
            if(!dur && yp.getDuration) { dur = yp.getDuration(); marks(); }
            bPlay.innerHTML = s === 1 ? IC_PAUSE : IC_PLAY;
            mp.classList.toggle("on", s === 1); mp.classList.toggle("ps", s === 2 || s === -1 || s === 5); mp.classList.toggle("end", s === 0);
            clearInterval(timer);
            if(s === 1) timer = setInterval(function(){ if(!drag) show(now()); }, 250);
            else show(now());
          },
          onError: function(){ cov.innerHTML = '<a class="pv-play lb" href="https://youtu.be/' + data.video + '" target="_blank" rel="noopener">' + both("Watch on YouTube ↗", "Дивитися на YouTube ↗") + '</a>'; }
        }
      });
    });
  }
})();
