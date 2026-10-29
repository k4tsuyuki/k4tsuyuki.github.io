/* черновик: выбор элемента под большими заголовками (только на страницах /drafts/themes/) */
(function(){
  var C = "%23a9a49c", L = "%23e9e5dd";
  function S(w, body){ return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + w + " 28' fill='none' stroke='" + C + "' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'>" + body + "</svg>"; }
  var i, chain = "", beads = "", moon = "", arch = "";
  for(i = 0; i < 13; i++) chain += "<rect x='" + (i * 18 + 2) + "' y='" + (i % 2 ? 11 : 8) + "' width='" + (i % 2 ? 22 : 22) + "' height='" + (i % 2 ? 6 : 12) + "' rx='" + (i % 2 ? 3 : 6) + "'" + (i % 2 ? " stroke='" + L + "'" : "") + "/>";
  for(i = 0; i < 17; i++) beads += "<circle cx='" + (6 + i * 10) + "' cy='" + (8 + Math.sin(i / 16 * Math.PI) * 6).toFixed(1) + "' r='" + (i % 4 === 0 ? 2.6 : 1.6) + "' fill='" + C + "' stroke='none'/>";
  var ph = ["r", "rc", "h", "lc", "f", "lc2", "h2", "rc2", "n"];
  ph.forEach(function(p, k){
    var x = 14 + k * 26, y = 14, r = 6;
    if(p === "f") moon += "<circle cx='" + x + "' cy='14' r='7' fill='" + L + "' stroke='none'/>";
    else if(p === "n") moon += "<circle cx='" + x + "' cy='14' r='6'/>";
    else if(p[0] === "h") moon += "<path d='M" + x + " 8A6 6 0 0 " + (p === "h" ? 1 : 0) + " " + x + " 20Z' fill='" + C + "' stroke='none'/><circle cx='" + x + "' cy='14' r='6'/>";
    else { var right = p[0] === "r" ? 1 : 0, thin = p.length === 1 || p === "rc2" ? 3 : 1.5; if(p === "rc" || p === "lc") thin = 2.5;
      moon += "<path d='M" + x + " 8A6 6 0 0 " + right + " " + x + " 20A" + thin + " 6 0 0 " + (1 - right) + " " + x + " 8Z' fill='" + C + "' stroke='none'/><circle cx='" + x + "' cy='14' r='6' stroke-opacity='.4'/>"; }
  });
  for(i = 0; i < 8; i++){ var a = i * 30; arch += "<path d='M" + a + " 25V16C" + a + " 9 " + (a + 8) + " 4 " + (a + 15) + " 2C" + (a + 22) + " 4 " + (a + 30) + " 9 " + (a + 30) + " 16V25'/><path d='M" + (a + 9) + " 25V17C" + (a + 9) + " 13 " + (a + 12) + " 10 " + (a + 15) + " 9C" + (a + 18) + " 10 " + (a + 21) + " 13 " + (a + 21) + " 17V25' stroke-opacity='.5'/>"; }
  var OPTS = [
    ["Dagger", S(240, "<path d='M4 14H52M196 14H236' stroke-opacity='.5'/><circle cx='60' cy='14' r='3.2'/><path d='M63 12.5H80V15.5H63' /><path d='M66 12.5V15.5M70 12.5V15.5M74 12.5V15.5' stroke-opacity='.6'/><path d='M80 5C83 8 83 11 82 14C83 17 83 20 80 23' stroke='" + L + "' stroke-width='1.3'/><path d='M80 5C77 6 76 8 77 9M80 23C77 22 76 20 77 19' stroke-opacity='.7'/><path d='M83 11.2H178L192 14L178 16.8H83Z' fill='" + L + "' fill-opacity='.15' stroke='" + L + "'/><path d='M86 14H176' stroke-opacity='.6' stroke-width='.6'/>")],
    ["Chain", S(240, chain)],
    ["Rosary", S(240, beads + "<path d='M86 15L90 23' stroke-opacity='.6'/><path d='M90 22V28M87 24.5H93' stroke='" + L + "' stroke-width='1.2'/>")],
    ["Moon phases", S(240, moon)],
    ["Wings", S(240, "<path d='M4 14H82M158 14H236' stroke-opacity='.6'/><path d='M120 5V23M114 11H126' stroke='" + L + "' stroke-width='1.3'/><path d='M110 14C100 6 92 6 84 9C92 10 96 12 98 14C93 14 89 16 86 19C95 19 103 18 110 14Z'/><path d='M130 14C140 6 148 6 156 9C148 10 144 12 142 14C147 14 151 16 154 19C145 19 137 18 130 14Z'/><path d='M104 11L92 9.5M104 16L91 17.5M136 11L148 9.5M136 16L149 17.5' stroke-opacity='.5'/>")],
    ["Arches", S(240, arch + "<path d='M0 24.5H240'/>")],
    ["Thorn", S(240, (function(){ var d = "M2 14", t = ""; for(var x = 2; x <= 238; x += 3){ var y = 14 + Math.sin(x / 16) * 3; d += "L" + x + " " + y.toFixed(1); if(x % 21 === 2 && x > 10 && x < 230){ var s = (x / 21) % 2 ? -1 : 1; t += "M" + (x - 2) + " " + y.toFixed(1) + "L" + (x + 2) + " " + (y + s * 7).toFixed(1) + "L" + (x + 2) + " " + y.toFixed(1) + "Z"; } } return "<path d='" + d + "'/><path d='" + t + "' fill='" + C + "' stroke='none'/>"; })())],
    ["Double rule", S(240, "<path d='M2 11H238'/><path d='M2 17H160' stroke-opacity='.45'/><path d='M226 14L230 10L234 14L230 18Z' fill='" + C + "' stroke='none'/>")]
  ];
  var KEY = "kz-rule", G = 'html[data-style="goth"] ';
  var st = document.createElement("style"), dyn = document.createElement("style");
  st.textContent =
    G + ".g-thorn{display:none!important}" +
    '.rp{position:fixed;left:12px;bottom:12px;z-index:99;display:flex;flex-wrap:nowrap;overflow-x:auto;gap:6px;max-width:calc(100vw - 24px);padding:8px;background:rgba(10,10,10,.88);border:1px solid var(--hair);backdrop-filter:blur(6px);align-items:center}' +
    '.rp b{white-space:nowrap;font:700 10px var(--f);text-transform:uppercase;color:var(--ash)}' +
    '.rp button{flex:none;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;color:#eeebe5;border:1px solid rgba(238,235,229,.22);border-radius:10px;padding:5px 8px;font:700 10px var(--f);text-transform:uppercase;cursor:pointer}' +
    '.rp button i{display:block;width:96px;height:12px;background:center/contain no-repeat}' +
    '.rp button.on{border-color:#eeebe5;background:rgba(238,235,229,.12)}' +
    'html:not([data-style="goth"]) .rp{display:none}';
  document.head.appendChild(st); document.head.appendChild(dyn);
  function url(s){ return "url(\"data:image/svg+xml;utf8," + s + "\")"; }
  function pick(n){
    var o = OPTS[n];
    dyn.textContent = G + ".s-head>div:first-child::after{content:''!important;display:block!important;width:min(260px,62vw)!important;height:28px!important;margin-top:14px!important;background:" + url(o[1]) + " left center/contain no-repeat!important}";
    try{ localStorage.setItem(KEY, n); }catch(e){}
    [].forEach.call(document.querySelectorAll(".rp button[data-i]"), function(b){ b.classList.toggle("on", +b.dataset.i === n); });
  }
  var cur = 0; try{ cur = +localStorage.getItem(KEY) || 0; }catch(e){} if(!OPTS[cur]) cur = 0;
  pick(cur);
  function panel(){
    var p = document.createElement("div"); p.className = "rp";
    p.innerHTML = "<b>Under titles</b>" + OPTS.map(function(o, i){ return '<button type="button" data-i="' + i + '"><i style="background-image:' + url(o[1]).replace(/"/g, "&quot;") + '"></i>' + o[0] + "</button>"; }).join("") + '<button type="button" class="x">Hide</button>';
    p.addEventListener("click", function(e){ var b = e.target.closest("button"); if(!b) return; if(b.classList.contains("x")){ p.remove(); return; } pick(+b.dataset.i); });
    document.body.appendChild(p); pick(cur);
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", panel); else panel();
})();
