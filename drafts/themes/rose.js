/* Готика «Витраж»: роза-окно из тонких линий за логотипом, розетки между секциями, стрельчатые рамки на обложках */
(function(){
  function rose(){
    var p = [], c = 50;
    [48, 46, 33, 31, 13].forEach(function(r){ p.push('<circle cx="50" cy="50" r="' + r + '"/>'); });
    for(var i = 0; i < 12; i++){
      var a = i * Math.PI / 6, b = a + Math.PI / 12;
      p.push('<line x1="' + (c + 13 * Math.cos(a)) + '" y1="' + (c + 13 * Math.sin(a)) + '" x2="' + (c + 46 * Math.cos(a)) + '" y2="' + (c + 46 * Math.sin(a)) + '"/>');
      /* стрельчатые лепестки между спицами */
      var x = c + 39.5 * Math.cos(b), y = c + 39.5 * Math.sin(b), deg = b * 180 / Math.PI + 90;
      p.push('<path transform="translate(' + x + ' ' + y + ') rotate(' + deg + ')" d="M-3.2,5V-1.5Q-3.2,-4 0,-6Q3.2,-4 3.2,-1.5V5Z"/>');
      var x2 = c + 22 * Math.cos(b), y2 = c + 22 * Math.sin(b);
      p.push('<circle cx="' + x2 + '" cy="' + y2 + '" r="4.2"/>');
      p.push('<circle cx="' + (c + 47 * Math.cos(b)) + '" cy="' + (c + 47 * Math.sin(b)) + '" r=".9"/>');
    }
    for(var j = 0; j < 4; j++){ var t = j * Math.PI / 2; p.push('<circle cx="' + (c + 6 * Math.cos(t)) + '" cy="' + (c + 6 * Math.sin(t)) + '" r="5.2"/>'); }
    return '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width=".16">' + p.join("") + '</svg>';
  }
  var ROSE = rose();
  var MINI = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" stroke="%23857f76" stroke-width="1"><circle cx="20" cy="20" r="17"/><circle cx="20" cy="20" r="5"/>' +
    [0,1,2,3,4,5,6,7].map(function(i){ var a = i * Math.PI / 4; return '<circle cx="' + (20 + 11 * Math.cos(a)).toFixed(2) + '" cy="' + (20 + 11 * Math.sin(a)).toFixed(2) + '" r="4"/>'; }).join("") + '</svg>';
  var ARCH = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90" preserveAspectRatio="none" fill="none" stroke="white" stroke-opacity=".6" stroke-width="1"><path vector-effect="non-scaling-stroke" d="M6,86V34Q6,12 80,5Q154,12 154,34V86"/></svg>';
  var G = 'html[data-style="goth"] ';
  var css = document.createElement("style");
  css.textContent =
    ".g-rose{display:none}" +
    G + ".g-rose{display:block;position:absolute;z-index:1;left:50%;top:40%;width:min(118vw,1100px);aspect-ratio:1;transform:translate(-50%,-50%);color:rgba(238,235,229,.3);pointer-events:none;animation:gRot 240s linear infinite}" +
    G + ".g-rose svg{width:100%;height:100%;display:block}" +
    "@media(max-width:760px){" + G + ".g-rose{width:150vw;top:38%}}" +
    "@keyframes gRot{to{transform:translate(-50%,-50%) rotate(360deg)}}" +
    G + "section::after{content:''!important;width:34px;height:34px;transform:translate(-50%,-50%)!important;background:var(--void) url('data:image/svg+xml;utf8," + MINI + "') center/28px no-repeat;border-radius:50%}" +
    G + ".grid .frame::after{content:'';position:absolute;inset:0;z-index:2;pointer-events:none;background:url(\"data:image/svg+xml," + encodeURIComponent(ARCH) + "\") center/100% 100% no-repeat;opacity:.8;transition:opacity .6s}" +
    G + ".card:hover .frame::after{opacity:0}" +
    G + ".s-head h2{padding-bottom:14px;background:linear-gradient(var(--hair),var(--hair)) left bottom/100% 1px no-repeat,linear-gradient(var(--hair),var(--hair)) left calc(100% - 4px)/100% 1px no-repeat}" +
    G + "{--paper:#e9e6e0;--ash:#8d8a84}";
  document.head.appendChild(css);
  function place(){
    var full = document.querySelector(".dh-full"); if(!full || full.querySelector(".g-rose")) return;
    var r = document.createElement("div"); r.className = "g-rose"; r.innerHTML = ROSE;
    var logo = full.querySelector(".dh-logo"); full.insertBefore(r, logo || null);
  }
  place(); setTimeout(place, 600); setTimeout(place, 1500);
})();
