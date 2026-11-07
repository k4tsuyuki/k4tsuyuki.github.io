/* Пункт меню «MMXXVI» (итоги года) на главной. Виден сам с 17 декабря по 7 января.
   Посмотреть заранее: katsuyuki.studio/?yearlink */
(function(){
  var now = new Date(), m = now.getMonth(), d = now.getDate(), pre = /[?&]yearlink/.test(location.search);
  if(!(m === 11 && d >= 17 || m === 0 && d <= 7 || pre)) return;
  var y = m === 0 ? now.getFullYear() - 1 : now.getFullYear();
  var href = "/year/?" + (pre ? "preview&" : "") + "y=" + y;
  function R(n){ var s = "", v = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]]; v.forEach(function(p){ while(n >= p[0]){ s += p[1]; n -= p[0]; } }); return s; }
  function add(nav, before){
    if(!nav || nav.querySelector("a[data-year]")) return;
    var a = document.createElement("a"); a.href = href; a.textContent = R(y); a.setAttribute("data-year", ""); a.title = "Year in edits";
    a.addEventListener("click", function(){ try{ window.track && window.track("year: menu link", "year: menu link"); }catch(e){} });
    nav.insertBefore(a, before || null);
  }
  function run(){
    var nav = document.querySelector('header nav');
    add(nav, nav && nav.querySelector(".nav-cta"));
    add(document.querySelector(".dh-menu nav"));
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
