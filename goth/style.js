/* Переключатель тем: обычная / готическая. Кнопка с крестом рядом с кнопкой светлой темы,
   на телефоне в меню. Выбор запоминается. По умолчанию обычная. */
(function(){
  var root = document.documentElement, KEY = "kz-style";
  function set(on){ if(on) root.setAttribute("data-style", "goth"); else root.removeAttribute("data-style"); try{ localStorage.setItem(KEY, on ? "goth" : ""); }catch(e){} sync(); }
  var saved = ""; try{ saved = localStorage.getItem(KEY) || ""; }catch(e){}
  if(saved === "goth") root.setAttribute("data-style", "goth");
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M6 8h12"/></svg>';
  var btns = [];
  function sync(){ var on = root.getAttribute("data-style") === "goth"; btns.forEach(function(b){ b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); b.title = on ? "Normal theme" : "Gothic theme"; }); }
  function add(){
    var th = document.getElementById("themeBtn");
    if(th && !document.getElementById("styleBtn")){
      var b = document.createElement("button"); b.className = "tgl"; b.id = "styleBtn"; b.type = "button"; b.innerHTML = ICON;
      b.onclick = function(){ set(root.getAttribute("data-style") !== "goth"); }; th.parentNode.insertBefore(b, th); btns.push(b);
    }
    var row = document.querySelector(".dh-menu .row");
    if(row && !row.querySelector(".st")){
      var m = document.createElement("button"); m.type = "button"; m.className = "st"; m.innerHTML = "Gothic";
      m.onclick = function(){ set(root.getAttribute("data-style") !== "goth"); }; row.appendChild(m); btns.push(m);
    }
    sync();
  }
  var css = document.createElement("style");
  css.textContent = "#styleBtn svg{width:14px;height:14px}#styleBtn.on{background:var(--paper);color:var(--void)}.dh-menu .row .st.on{background:var(--paper);color:var(--void)}" +
    "html{transition:none}html.st-anim *{transition:background-color .6s,color .6s,border-color .6s,opacity .6s!important}";
  document.head.appendChild(css);
  add(); setTimeout(add, 500); setTimeout(add, 1500);
})();
