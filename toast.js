/* Копирование для всего сайта: kzCopy(text, btn) копирует (с запасным способом для старых браузеров)
   и показывает отклик прямо на месте: кнопка «вдавливается» и заливается белым с галочкой,
   а скопированный текст рядом (если есть) подсвечивается белой полосой. */
(function(){
  var css = document.createElement("style");
  css.textContent =
    ".kz-press{animation:kz-press .38s cubic-bezier(.2,.9,.25,1)}" +
    "@keyframes kz-press{0%{transform:scale(1)}30%{transform:scale(.9)}100%{transform:scale(1)}}" +
    ".kz-ok{background:var(--paper,#eeebe5)!important;color:var(--void,#060606)!important;border-color:var(--paper,#eeebe5)!important;transition:background-color .2s,color .2s;animation:kz-press .38s cubic-bezier(.2,.9,.25,1),kz-ring .6s ease-out}" +
    "@keyframes kz-ring{0%{box-shadow:0 0 0 0 var(--paper,#eeebe5)}100%{box-shadow:0 0 0 10px transparent}}" +
    ".kz-ok::before{content:\"\";display:inline-block;width:4px;height:8px;border:solid currentColor;border-width:0 2px 2px 0;margin:0 9px 0 2px;vertical-align:.12em;transform:rotate(45deg);animation:kz-chk .35s .1s ease both}" +
    "@keyframes kz-chk{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0)}}" +
    ".kz-hl{background-image:linear-gradient(var(--paper,#eeebe5),var(--paper,#eeebe5));background-repeat:no-repeat;background-position:0 0;color:var(--void,#060606)!important;animation:kz-wipe .4s cubic-bezier(.65,0,.25,1) both;box-decoration-break:clone;-webkit-box-decoration-break:clone}" +
    ".kz-hl.out{animation:kz-unwipe .4s cubic-bezier(.65,0,.25,1) both}" +
    "@keyframes kz-wipe{from{background-size:0 100%}to{background-size:100% 100%}}" +
    "@keyframes kz-unwipe{from{background-size:100% 100%;background-position:100% 0}to{background-size:0 100%;background-position:100% 0}}" +
    "@media (prefers-reduced-motion: reduce){.kz-press,.kz-ok,.kz-ok::before,.kz-hl,.kz-hl.out{animation:none}}";
  document.head.appendChild(css);
  function restart(node, cls){ node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); }
  function fallback(text){
    var t = document.createElement("textarea"); t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(t); t.select(); var ok = false; try{ ok = document.execCommand("copy"); }catch(e){} t.remove(); return ok;
  }
  /* старое имя оставлено, чтобы ничего не сломалось; само уведомление больше не показывается */
  window.kzToast = function(){};
  /* btn — нажатая кнопка; возвращает Promise<boolean> */
  window.kzCopy = function(text, btn){
    if(btn) restart(btn, "kz-press");
    function done(){
      if(btn){
        clearTimeout(btn._kz); btn.classList.remove("kz-press"); restart(btn, "kz-ok");
        var row = btn.closest(".c-row"), v = row && row.querySelector(".v");
        if(v){ v.classList.remove("out"); restart(v, "kz-hl"); }
        btn._kz = setTimeout(function(){
          btn.classList.remove("kz-ok");
          if(v){ v.classList.add("out"); setTimeout(function(){ v.classList.remove("kz-hl", "out"); }, 420); }
        }, 1600);
      }
      return true;
    }
    try{ if(navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(done, function(){ return fallback(text) && done(); }); }catch(e){}
    return Promise.resolve(fallback(text) && done());
  };
})();
