/* Технические работы: пока ON = true, все страницы открывают /maintenance.html.
   Чтобы самому видеть сайт, один раз открой katsuyuki.studio/?preview (запомнится в этом браузере),
   выключить просмотр: katsuyuki.studio/?nopreview */
(function(){
  var ON = true;
  try{
    if(/[?&]nopreview\b/.test(location.search)) localStorage.removeItem("kz-preview");
    else if(/[?&]preview\b/.test(location.search)) localStorage.setItem("kz-preview", "1");
    if(!ON || localStorage.getItem("kz-preview")) return;
  }catch(e){ if(!ON) return; }
  document.documentElement.style.visibility = "hidden";
  location.replace("/maintenance.html");
})();
