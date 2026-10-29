/* Стрелки в тексте (→ ↓ ↑ ← ↗) заменяются нарисованными: у шрифтов на разных телефонах
   стрелка сидит ниже середины букв, а нарисованная всегда ровно по центру заглавных. */
(function(){
  var RE = /[→←↑↓↗]︎?/g;
  var BOX = { "↓": "4 -1 10 16", "↑": "4 -1 10 16", "↗": "1 -1 16 16" };
  var PATH = {
    "→": "M1 7h15M11 2l5 5-5 5", "←": "M17 7H2M7 2L2 7l5 5",
    "↓": "M9 0v14M4 9l5 5 5-5", "↑": "M9 14V0M4 5l5-5 5 5", "↗": "M3 13L15 1M6 1h9v9"
  };
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SVG: 1, TITLE: 1, OPTION: 1 };
  function svg(ch, bold){
    return '<svg viewBox="' + (BOX[ch] || "-1 -1 20 16") + '" fill="none" stroke="currentColor" stroke-width="' + (bold ? 2 : 1.4) + '" stroke-linecap="square" aria-hidden="true"><path d="' + PATH[ch] + '"/></svg>';
  }
  function fix(root){
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function(n){
      for(var p = n.parentNode; p && p !== root.parentNode; p = p.parentNode) if(SKIP[(p.nodeName || "").toUpperCase()] || (p.classList && p.classList.contains("ar"))) return NodeFilter.FILTER_REJECT;
      RE.lastIndex = 0; return RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    } }), list = [], n;
    while((n = w.nextNode())) list.push(n);
    list.forEach(function(t){
      var bold = parseInt(getComputedStyle(t.parentNode).fontWeight, 10) >= 600;
      var frag = document.createDocumentFragment(), s = t.nodeValue, last = 0, m;
      RE.lastIndex = 0;
      while((m = RE.exec(s))){
        /* пробелы вокруг стрелки становятся отступом: в кнопках-флексах крайний пробел иначе пропадает */
        var before = s.slice(last, m.index), gapL = /\s$/.test(before), gapR = /^\s/.test(s.slice(RE.lastIndex));
        if(gapL) before = before.replace(/\s$/, "");
        if(before) frag.appendChild(document.createTextNode(before));
        var sp = document.createElement("span"); sp.className = "ar" + (gapL ? " gl" : "") + (gapR ? " gr" : ""); sp.setAttribute("data-c", m[0][0]);
        sp.innerHTML = svg(m[0][0], bold); frag.appendChild(sp); last = RE.lastIndex + (gapR ? 1 : 0); RE.lastIndex = last;
      }
      if(last < s.length) frag.appendChild(document.createTextNode(s.slice(last)));
      t.parentNode.replaceChild(frag, t);
    });
  }
  var st = document.createElement("style");
  /* высота = высота заглавных букв Arial, низ на базовой линии */
  st.textContent = ".ar{display:inline-block;line-height:0;white-space:nowrap}.ar svg{display:inline-block;width:.86em;height:.7em;vertical-align:baseline;overflow:visible}.ar.gl{margin-left:.38em}.ar.gr{margin-right:.38em}.ar[data-c='↓'] svg,.ar[data-c='↑'] svg{width:.44em}.ar[data-c='↗'] svg{width:.7em}";
  document.head.appendChild(st);
  function run(){ fix(document.body); }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  /* новые и изменённые тексты (смена языка, подгруженные карточки): проверяется только то, что поменялось */
  new MutationObserver(function(recs){
    var seen = [];
    recs.forEach(function(r){
      var nodes = r.type === "characterData" ? [r.target] : Array.prototype.slice.call(r.addedNodes);
      nodes.forEach(function(n){
        var el = n.nodeType === 3 ? n.parentNode : n;
        if(el && el.nodeType === 1 && el.isConnected && seen.indexOf(el) < 0 && RE.test(el.textContent || "")){ seen.push(el); }
        RE.lastIndex = 0;
      });
    });
    seen.forEach(fix);
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
})();
