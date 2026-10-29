/* черновик: переключатель шрифтов для готической темы (только на /drafts/themes/fonts/) */
(function(){
  var FONTS = [
    ["Texturina", "Texturina:wght@400;600", 1],
    ["Jacquard 24", "Jacquard+24", 1.05],
    ["New Rocker", "New+Rocker", .95],
    ["Metamorphous", "Metamorphous", .9],
    ["Germania One", "Germania+One", 1],
    ["Cinzel Decorative", "Cinzel+Decorative:wght@400;700", .85],
    ["Fruktur", "Fruktur", .95],
    ["Almendra Display", "Almendra+Display", 1],
    ["IM Fell English SC", "IM+Fell+English+SC", .95]
  ];
  var KEY = "kz-font", root = document.documentElement;
  var l = document.createElement("link"); l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?" + FONTS.map(function(f){ return "family=" + f[1]; }).join("&") + "&display=swap";
  document.head.appendChild(l);

  var st = document.createElement("style");
  st.textContent =
    'html[data-style="goth"] .s-head h2,html[data-style="goth"] .c-meta .t,html[data-style="goth"] .dh-play h2{font-family:var(--gf),var(--f);letter-spacing:0}' +
    'html[data-style="goth"] .s-head h2{font-size:calc(clamp(52px,8vw,128px)*var(--gs))}' +
    'html[data-style="goth"] .s-head h2 .jp{font-family:var(--f);font-size:15px}' +
    '.fp{position:fixed;left:12px;bottom:12px;z-index:99;display:flex;flex-wrap:nowrap;overflow-x:auto;gap:6px;max-width:calc(100vw - 24px);padding:8px;background:rgba(10,10,10,.85);border:1px solid var(--hair);backdrop-filter:blur(6px)}' +
    '.fp b{align-self:center;white-space:nowrap;font:700 10px var(--f);text-transform:uppercase;color:var(--ash);letter-spacing:.04em}' +
    '.fp button{background:none;color:#eeebe5;border:1px solid rgba(238,235,229,.25);border-radius:999px;padding:5px 11px;font-size:14px;cursor:pointer;line-height:1.1;white-space:nowrap;flex:none}' +
    '.fp button.on{background:#eeebe5;color:#060606}' +
    '.fp .x{margin-left:auto;font:700 11px var(--f)}' +
    'html:not([data-style="goth"]) .fp{display:none}';
  document.head.appendChild(st);

  function pick(i){
    var f = FONTS[i]; root.style.setProperty("--gf", '"' + f[0] + '"'); root.style.setProperty("--gs", f[2]);
    try{ localStorage.setItem(KEY, i); }catch(e){}
    [].forEach.call(document.querySelectorAll(".fp button[data-i]"), function(b){ b.classList.toggle("on", +b.dataset.i === i); });
  }
  var cur = 0; try{ cur = +localStorage.getItem(KEY) || 0; }catch(e){} if(!FONTS[cur]) cur = 0;

  function panel(){
    var p = document.createElement("div"); p.className = "fp";
    p.innerHTML = "<b>Font (draft)</b>" + FONTS.map(function(f, i){ return '<button type="button" data-i="' + i + '" style="font-family:\'' + f[0] + '\'">' + f[0] + "</button>"; }).join("") +
      '<button type="button" class="x" title="Hide">Hide</button>';
    p.addEventListener("click", function(e){ var b = e.target.closest("button"); if(!b) return; if(b.classList.contains("x")){ p.remove(); return; } pick(+b.dataset.i); });
    document.body.appendChild(p); pick(cur);
  }
  pick(cur);
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", panel); else panel();
})();
