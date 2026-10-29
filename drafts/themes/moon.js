/* Готика «Луна»: полумесяц за облаками и туман на первом экране, лунный блик проходит по обложке при наведении, мягкое свечение заголовков */
(function(){
  var G = 'html[data-style="goth"] ';
  var MOON = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><radialGradient id='m' cx='38%' cy='40%' r='60%'><stop offset='0' stop-color='%23f4f1ea'/><stop offset='1' stop-color='%23bdb8ae'/></radialGradient><mask id='c'><rect width='100' height='100' fill='white'/><circle cx='66' cy='38' r='40' fill='black'/></mask></defs><circle cx='50' cy='50' r='42' fill='url(%23m)' mask='url(%23c)'/></svg>";
  var css = document.createElement("style");
  css.textContent =
    ".g-moon,.g-mist{display:none}" +
    G + ".g-moon{display:block;position:absolute;right:7%;top:9%;width:clamp(90px,13vw,190px);aspect-ratio:1;z-index:1;pointer-events:none;mix-blend-mode:screen}" +
    G + ".g-moon i{position:absolute;inset:0;background:url(\"data:image/svg+xml;utf8," + MOON + "\") center/contain no-repeat;filter:drop-shadow(0 0 22px rgba(240,236,228,.45));animation:g-moon 9s ease-in-out infinite}" +
    G + ".g-moon::before{content:'';position:absolute;inset:-60%;background:radial-gradient(circle,rgba(240,236,228,.16),transparent 60%)}" +
    G + ".g-moon b{position:absolute;height:28%;border-radius:50%;background:rgba(18,18,18,.9);filter:blur(10px);animation:g-cloud linear infinite}" +
    "@keyframes g-moon{50%{transform:translateY(-4px)}}" +
    "@keyframes g-cloud{from{transform:translateX(130%)}to{transform:translateX(-160%)}}" +
    G + ".g-mist{display:block;position:absolute;left:-20%;right:-20%;bottom:-6%;height:42%;z-index:1;pointer-events:none;opacity:.55;" +
      "background:radial-gradient(ellipse 30% 45% at 20% 70%,rgba(225,221,213,.35),transparent 70%),radial-gradient(ellipse 35% 40% at 60% 80%,rgba(225,221,213,.3),transparent 70%),radial-gradient(ellipse 25% 35% at 90% 65%,rgba(225,221,213,.28),transparent 70%);filter:blur(14px);animation:g-mist 26s ease-in-out infinite alternate}" +
    "@keyframes g-mist{to{transform:translateX(12%)}}" +
    G + ".grid .frame .g-sheen{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(115deg,transparent 35%,rgba(235,232,226,.28) 48%,rgba(255,255,255,.08) 52%,transparent 62%);background-size:250% 100%;background-position:130% 0;mix-blend-mode:screen}" +
    G + ".card:hover .g-sheen," + G + ".card:focus-visible .g-sheen{background-position:-40% 0;transition:background-position 1.3s cubic-bezier(.3,0,.2,1)}" +
    G + ".s-head h2>span:not(.jp),"+ G + ".dh-play h2{text-shadow:0 0 18px rgba(240,236,228,.28),0 0 2px rgba(240,236,228,.4)}" +
    "@media (prefers-reduced-motion:reduce){" + G + ".g-moon i," + G + ".g-moon b," + G + ".g-mist{animation:none}}";
  document.head.appendChild(css);
  function place(){
    var f = document.querySelector(".dh-full");
    if(f && !f.querySelector(".g-moon")){
      var m = document.createElement("div"); m.className = "g-moon";
      m.innerHTML = '<i></i><b style="width:120%;top:52%;animation-duration:38s"></b><b style="width:80%;top:22%;animation-duration:55s;animation-delay:-20s"></b>';
      f.appendChild(m); var s = document.createElement("div"); s.className = "g-mist"; f.appendChild(s);
    }
    [].forEach.call(document.querySelectorAll(".grid .frame"), function(fr){ if(!fr.querySelector(".g-sheen")){ var s = document.createElement("span"); s.className = "g-sheen"; fr.appendChild(s); } });
  }
  place(); new MutationObserver(function(){ clearTimeout(place.t); place.t = setTimeout(place, 120); }).observe(document.body, { childList: true, subtree: true });
})();
