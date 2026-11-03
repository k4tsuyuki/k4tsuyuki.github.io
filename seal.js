/* Печать после отправки заказа: на экран падает сургуч с K, глухой звук. window.kzSeal() вызывается из формы заказа. */
(function(){
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css = '' +
    '.kz-sov{position:fixed;inset:0;z-index:300;display:grid;place-items:center;background:rgba(0,0,0,0);transition:background .5s;cursor:pointer;color:#eeebe5}' +
    '.kz-sov.on{background:rgba(0,0,0,.86)}' +
    '.kz-sbox{display:flex;flex-direction:column;align-items:center;gap:22px}' +
    '.kz-seal{width:min(190px,48vw);aspect-ratio:1;opacity:0;transform:scale(2.6) rotate(-14deg)}' +
    '.kz-sov.on .kz-seal{animation:kzDrop .55s cubic-bezier(.6,0,.9,.5) .15s forwards}' +
    '@keyframes kzDrop{0%{opacity:0;transform:scale(2.6) rotate(-14deg)}70%{opacity:1;transform:scale(.94) rotate(3deg)}85%{transform:scale(1.03) rotate(2deg)}100%{opacity:1;transform:scale(1) rotate(2deg)}}' +
    '.kz-seal canvas{width:100%;height:100%;display:block}' +
    '.kz-smsg{display:flex;flex-direction:column;gap:8px;text-align:center;opacity:0;transform:translateY(8px);transition:opacity .5s .9s,transform .5s .9s}' +
    '.kz-sov.on .kz-smsg{opacity:1;transform:none}' +
    '.kz-smsg b{font-size:13px;letter-spacing:.24em;text-transform:uppercase}' +
    '.kz-smsg span{font-size:11px;color:#8a8a8f;letter-spacing:.14em;text-transform:uppercase}' +
    '.kz-shake{animation:kzShk .35s .62s}' +
    '@keyframes kzShk{0%,100%{transform:none}25%{transform:translate(3px,2px)}50%{transform:translate(-3px,-1px)}75%{transform:translate(2px,-2px)}}' +
    '@media(prefers-reduced-motion:reduce){.kz-sov.on .kz-seal{animation:none;opacity:1;transform:none}.kz-shake{animation:none}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var K = new Image(); K.src = "/img/k.png";

  function paint(cv){
    var x = cv.getContext("2d"), S = 380, C = S / 2, i, seed = Math.random() * 10;
    x.clearRect(0, 0, S, S); x.beginPath();
    for(i = 0; i <= 64; i++){ var a = i / 64 * Math.PI * 2, r = 150 + Math.sin(a * 5 + seed) * 7 + Math.sin(a * 11 + seed * 2) * 4 + Math.sin(a * 3) * 5; x.lineTo(C + Math.cos(a) * r, C + Math.sin(a) * r); }
    var g = x.createRadialGradient(C - 40, C - 50, 10, C, C, 170); g.addColorStop(0, "#3a3a3e"); g.addColorStop(.55, "#18181b"); g.addColorStop(1, "#060607");
    x.fillStyle = g; x.fill(); x.lineWidth = 2; x.strokeStyle = "rgba(255,255,255,.12)"; x.stroke();
    x.beginPath(); x.arc(C, C, 112, 0, Math.PI * 2); x.lineWidth = 6; x.strokeStyle = "rgba(0,0,0,.6)"; x.stroke();
    x.beginPath(); x.arc(C, C + 2, 112, 0, Math.PI * 2); x.lineWidth = 1.5; x.strokeStyle = "rgba(255,255,255,.18)"; x.stroke();
    var g2 = x.createRadialGradient(C, C, 20, C, C, 110); g2.addColorStop(0, "#121214"); g2.addColorStop(1, "#1d1d20");
    x.beginPath(); x.arc(C, C, 108, 0, Math.PI * 2); x.fillStyle = g2; x.fill();
    if(K.complete && K.naturalWidth){
      var h = 150, w = h * K.naturalWidth / K.naturalHeight, X = C - w / 2, Y = C - h / 2;
      var off = document.createElement("canvas"); off.width = S; off.height = S; var o = off.getContext("2d");
      var tint = function(col){ o.globalCompositeOperation = "source-over"; o.clearRect(0, 0, S, S); o.drawImage(K, X, Y, w, h); o.globalCompositeOperation = "source-in"; o.fillStyle = col; o.fillRect(0, 0, S, S); return off; };
      x.drawImage(tint("rgba(0,0,0,.85)"), 3, 4);
      x.drawImage(tint("rgba(255,255,255,.35)"), -1.5, -1.5);
      x.drawImage(tint("#2a2a2e"), 0, 0);
    }
    x.beginPath(); x.ellipse(C - 55, C - 70, 48, 22, -.6, 0, Math.PI * 2); x.fillStyle = "rgba(255,255,255,.07)"; x.fill();
  }
  var AC = null;
  /* звук разрешён только после нажатия: готовим его при отправке формы */
  window.kzSealPrime = function(){ try{ AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if(AC.resume) AC.resume(); }catch(e){} };
  function thud(){
    try{
      window.kzSealPrime(); var t = AC.currentTime;
      var o = AC.createOscillator(), g = AC.createGain(); o.type = "sine";
      o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(38, t + .25);
      g.gain.setValueAtTime(.9, t); g.gain.exponentialRampToValueAtTime(.001, t + .45); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + .5);
      var b = AC.createBuffer(1, Math.ceil(AC.sampleRate * .12), AC.sampleRate), d = b.getChannelData(0); for(var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      var n = AC.createBufferSource(), f = AC.createBiquadFilter(), g2 = AC.createGain(); n.buffer = b; f.type = "lowpass"; f.frequency.value = 700;
      g2.gain.setValueAtTime(.5, t); g2.gain.exponentialRampToValueAtTime(.001, t + .12); n.connect(f); f.connect(g2); g2.connect(AC.destination); n.start(t);
    }catch(e){}
  }
  window.kzSeal = function(){
    var uk = document.documentElement.lang === "uk";
    var ov = document.createElement("div"); ov.className = "kz-sov"; ov.setAttribute("role", "status");
    ov.innerHTML = '<div class="kz-sbox"><div class="kz-seal"><canvas width="380" height="380"></canvas></div><div class="kz-smsg"><b></b><span></span></div></div>';
    ov.querySelector("b").textContent = uk ? "Замовлення надіслано" : "Order sealed";
    ov.querySelector(".kz-smsg span").textContent = uk ? "Натисніть, щоб закрити" : "Tap anywhere to close";
    document.body.appendChild(ov);
    paint(ov.querySelector("canvas"));
    requestAnimationFrame(function(){ ov.classList.add("on"); });
    var m = document.querySelector("main") || document.body.firstElementChild;
    if(m){ m.classList.remove("kz-shake"); void m.offsetWidth; m.classList.add("kz-shake"); }
    setTimeout(thud, reduce ? 0 : 560);
    function close(){ ov.classList.remove("on"); document.removeEventListener("keydown", key); setTimeout(function(){ ov.remove(); }, 500); }
    function key(e){ if(e.key === "Escape") close(); }
    ov.addEventListener("click", close); document.addEventListener("keydown", key);
  };
})();
