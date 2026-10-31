/* Уведомление «Скопировано» внизу экрана + общее копирование для всего сайта.
   kzCopy(text) копирует (с запасным способом для старых браузеров) и показывает уведомление. */
(function(){
  var css = document.createElement("style");
  css.textContent =
    ".kz-toast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 24px);z-index:2147482500;display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--paper,#eeebe5);color:var(--void,#060606);font:700 12px/1 Arial,sans-serif;text-transform:uppercase;letter-spacing:.04em;box-shadow:0 10px 40px rgba(0,0,0,.45);transform:translate(-50%,140%);opacity:0;transition:transform .45s cubic-bezier(.2,.9,.25,1),opacity .3s;pointer-events:none;max-width:calc(100vw - 32px)}" +
    ".kz-toast.on{transform:translate(-50%,0);opacity:1}" +
    ".kz-toast svg{width:16px;height:16px;flex:none}" +
    ".kz-toast path{stroke-dasharray:24;stroke-dashoffset:24}" +
    ".kz-toast.on path{animation:kz-tick .45s .15s ease forwards}" +
    ".kz-toast .s{font-weight:400;text-transform:none;letter-spacing:0;opacity:.6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:46vw}" +
    "@keyframes kz-tick{to{stroke-dashoffset:0}}" +
    ".kz-flash{animation:kz-flash .6s ease}@keyframes kz-flash{0%{background-color:var(--paper,#eeebe5);color:var(--void,#060606)}100%{}}" +
    "@media (prefers-reduced-motion: reduce){.kz-toast{transition:opacity .2s}.kz-toast.on path{animation:none;stroke-dashoffset:0}}";
  document.head.appendChild(css);
  var el, timer;
  function uk(){ return document.documentElement.lang === "uk"; }
  window.kzToast = function(sub){
    if(!el){
      el = document.createElement("div"); el.className = "kz-toast"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
    }
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square"><path d="M4 12.5l5 5L20 6.5"/></svg><span>' + (uk() ? "Скопійовано" : "Copied") + '</span>' + (sub ? '<span class="s"></span>' : "");
    if(sub) el.lastChild.textContent = sub;
    el.classList.remove("on"); void el.offsetWidth; el.classList.add("on");
    clearTimeout(timer); timer = setTimeout(function(){ el.classList.remove("on"); }, 1900);
  };
  function fallback(text){
    var t = document.createElement("textarea"); t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(t); t.select(); var ok = false; try{ ok = document.execCommand("copy"); }catch(e){} t.remove(); return ok;
  }
  /* btn — кнопка, которую мигнуть; возвращает Promise<boolean> */
  window.kzCopy = function(text, btn){
    function done(){ kzToast(text); if(btn){ btn.classList.remove("kz-flash"); void btn.offsetWidth; btn.classList.add("kz-flash"); } return true; }
    try{ if(navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(done, function(){ return fallback(text) && done(); }); }catch(e){}
    return Promise.resolve(fallback(text) && done());
  };
})();
