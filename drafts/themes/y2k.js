/* Готика «Хром и колючка»: хромированный логотип с бликом, колючая проволока между секциями, мерцающие звёзды */
(function(){
  var G = 'html[data-style="goth"] ';
  var WIRE = "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='24' viewBox='0 0 96 24' fill='none' stroke='%23b9b5ae' stroke-width='1.3' stroke-linecap='round'><path d='M0 12 C12 6 24 18 36 12 S60 6 72 12 S84 18 96 12'/><path d='M0 12 C12 18 24 6 36 12 S60 18 72 12 S84 6 96 12' stroke-opacity='.6'/><path d='M44 5 L52 19 M52 5 L44 19 M40 12 H56'/></svg>";
  var STAR = '<svg viewBox="0 0 20 20"><path d="M10 0C10.6 6.5 13.5 9.4 20 10 13.5 10.6 10.6 13.5 10 20 9.4 13.5 6.5 10.6 0 10 6.5 9.4 9.4 6.5 10 0Z" fill="currentColor"/></svg>';
  var css = document.createElement("style");
  css.textContent =
    ".g-star,.g-chrome{display:none}" +
    G + "section{border-top:0!important}" +
    G + "section::before{content:''!important;top:-12px!important;height:24px!important;left:0!important;right:0!important;background:url(\"data:image/svg+xml;utf8," + WIRE + "\") repeat-x center/96px 24px!important}" +
    G + "section::after{display:none}" +
    /* хром: серебряный градиент внутри букв логотипа, блик проходит раз в несколько секунд */
    G + ".g-chrome{display:block;position:absolute;inset:0;pointer-events:none;-webkit-mask:url(img/logo.png) center/contain no-repeat;mask:url(img/logo.png) center/contain no-repeat;background:linear-gradient(180deg,#fff 0%,#9a9a9a 38%,#f4f4f4 50%,#5c5c5c 62%,#d8d8d8 100%)}" +
    G + ".g-chrome::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.95) 50%,transparent 60%) -200% 0/250% 100% no-repeat;animation:gSheen 4.5s ease-in-out infinite}" +
    "@keyframes gSheen{0%,55%{background-position:-200% 0}100%{background-position:200% 0}}" +
    G + ".dh-logo{position:absolute}" + G + ".dh-logo .logo-img{opacity:0}" +
    G + ".s-head h2>span:first-child{background:linear-gradient(180deg,#fff 0%,#a8a8a8 45%,#f2f2f2 55%,#6a6a6a 100%);-webkit-background-clip:text;background-clip:text;color:transparent}" +
    G + ".g-star{display:block;position:absolute;width:var(--s,14px);height:var(--s,14px);color:#f4f2ee;pointer-events:none;z-index:3;animation:gTw var(--d,3s) ease-in-out infinite;animation-delay:var(--dl,0s)}" +
    G + ".g-star svg{width:100%;height:100%;display:block}" +
    "@keyframes gTw{0%,100%{opacity:0;transform:scale(.3) rotate(0)}50%{opacity:1;transform:scale(1) rotate(45deg)}}" +
    G + ".pill-btn,.nav-cta{outline:1px solid var(--hair);outline-offset:3px}";
  document.head.appendChild(css);
  function stars(host, list){ list.forEach(function(s){ var e = document.createElement("i"); e.className = "g-star"; e.innerHTML = STAR; e.style.cssText = "left:" + s[0] + "%;top:" + s[1] + "%;--s:" + s[2] + "px;--d:" + s[3] + "s;--dl:" + s[4] + "s"; host.appendChild(e); }); }
  function place(){
    var logo = document.querySelector(".dh-logo");
    if(logo && !logo.querySelector(".g-chrome")){
      var c = document.createElement("div"); c.className = "g-chrome"; logo.appendChild(c);
      stars(logo, [[4, 18, 18, 3.2, 0], [93, 8, 12, 2.6, 1.1], [80, 88, 16, 3.8, .5], [16, 92, 10, 2.9, 1.8], [52, -6, 9, 3.4, 2.4]]);
    }
    document.querySelectorAll(".s-head h2").forEach(function(h){ if(h._st) return; h._st = 1; h.style.position = "relative"; stars(h, [[-2, 4, 12, 3, .3], [96, 70, 9, 3.6, 1.4]]); });
  }
  place(); setTimeout(place, 600); setTimeout(place, 1500);
})();
