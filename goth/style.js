/* Переключатель тем: обычная / готическая. Кнопка с крестом рядом с кнопкой светлой темы,
   на телефоне в меню. Сайт всегда открывается в обычной теме; выбор держится только внутри вкладки (sessionStorage). */
(function(){
  var root = document.documentElement, KEY = "kz-style";
  function apply(on){ if(on) root.setAttribute("data-style", "goth"); else root.removeAttribute("data-style"); try{ sessionStorage.setItem(KEY, on ? "goth" : ""); }catch(e){} sync(); }
  /* переход: новая тема раскрывается кругом от кнопки; старая стоит неподвижно, без размытия, чтобы шапка не дёргалась */
  function set(on, btn){
    if(!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches){ apply(on); return; }
    var r = btn && btn.getBoundingClientRect(), x = r ? r.left + r.width / 2 : innerWidth / 2, y = r ? r.top + r.height / 2 : 0;
    root.style.setProperty("--vtx", x + "px"); root.style.setProperty("--vty", y + "px");
    root.style.setProperty("--vtr", Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + "px");
    root.classList.add("vt-goth");
    var t = document.startViewTransition(function(){ apply(on); });
    t.finished.then(done, done); function done(){ root.classList.remove("vt-goth"); }
  }
  window.kzStyle = { apply: apply, set: set };
  var saved = ""; try{ saved = sessionStorage.getItem(KEY) || ""; }catch(e){}
  if(saved === "goth") root.setAttribute("data-style", "goth");
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M6 8h12"/></svg>';
  var btns = [];
  function sync(){ var on = root.getAttribute("data-style") === "goth"; btns.forEach(function(b){ b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); b.title = on ? "Normal theme" : "Gothic theme"; }); }
  function add(){
    var th = document.getElementById("themeBtn");
    if(th && !document.getElementById("styleBtn")){
      var b = document.createElement("button"); b.className = "tgl"; b.id = "styleBtn"; b.type = "button"; b.innerHTML = ICON;
      b.onclick = function(){ set(root.getAttribute("data-style") !== "goth", b); }; th.parentNode.insertBefore(b, th); btns.push(b);
    }
    var row = document.querySelector(".dh-menu .row");
    if(row && !row.querySelector(".st")){
      var m = document.createElement("button"); m.type = "button"; m.className = "st"; m.innerHTML = "Gothic";
      m.onclick = function(){ set(root.getAttribute("data-style") !== "goth", m); }; row.appendChild(m); btns.push(m);
    }
    sync();
  }
  var css = document.createElement("style");
  css.textContent = "#styleBtn svg{width:14px;height:14px}#styleBtn.on{background:var(--paper);color:var(--void)}.dh-menu .row .st.on{background:var(--paper);color:var(--void)}" +
    ".vt-goth::view-transition-old(root){animation:none;mix-blend-mode:normal}" +
    ".vt-goth::view-transition-new(root){animation:g-vt-in .9s cubic-bezier(.65,0,.25,1) both;mix-blend-mode:normal}" +
    "@keyframes g-vt-in{from{clip-path:circle(0 at var(--vtx) var(--vty))}to{clip-path:circle(var(--vtr) at var(--vtx) var(--vty))}}";
  document.head.appendChild(css);
  add(); setTimeout(add, 500); setTimeout(add, 1500);
})();
