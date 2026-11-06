/* Катакомбы на странице 404: каждый раз новый лабиринт. Огонёк ведёшь к выходу,
   через пару секунд появляется тень и идёт за тобой по коридорам. Догнала: новый лабиринт.
   Управление: стрелки / WASD (можно держать), кнопки под лабиринтом или свайп по нему. */
(function(){
  "use strict";
  var $ = function(id){ return document.getElementById(id); };
  var box = $("maze"), MZ = $("mz"); if(!box || !MZ) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var uk = function(){ return document.documentElement.lang === "uk"; };
  var T = {
    won: ["You escaped", "Ви вибралися"], lost: ["The shade took you", "Тінь вас наздогнала"],
    again: ["New catacomb", "Нова катакомба"], retry: ["Try again", "Ще раз"],
    stirs: ["SOMETHING STIRS", "ЩОСЬ ВОРУШИТЬСЯ"], exit: ["EXIT", "ВИХІД"]
  };
  var tx = function(k){ return T[k][uk() ? 1 : 0]; };
  function track(p){ try{ window.goatcounter && window.goatcounter.count({ path: p, event: true }); }catch(e){} }

  /* звук только после нажатия */
  var AC = null;
  function ac(){ try{ AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if(AC.resume) AC.resume(); }catch(e){ AC = null; } return AC; }
  function noise(d){ var b = AC.createBuffer(1, Math.ceil(AC.sampleRate * d), AC.sampleRate), a = b.getChannelData(0); for(var i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; var s = AC.createBufferSource(); s.buffer = b; return s; }
  function click(f){ if(!AC || AC.state !== "running") return; var t = AC.currentTime, n = noise(.05), fl = AC.createBiquadFilter(), g = AC.createGain(); fl.type = "bandpass"; fl.frequency.value = f || 1800; g.gain.setValueAtTime(.2, t); g.gain.exponentialRampToValueAtTime(.001, t + .05); n.connect(fl); fl.connect(g); g.connect(AC.destination); n.start(t); }
  function thud(){ if(!AC || AC.state !== "running") return; var t = AC.currentTime, n = noise(.7), f = AC.createBiquadFilter(), g = AC.createGain(); f.type = "lowpass"; f.frequency.value = 200; g.gain.setValueAtTime(.6, t); g.gain.exponentialRampToValueAtTime(.001, t + .7); n.connect(f); f.connect(g); g.connect(AC.destination); n.start(t); }

  var mx = MZ.getContext("2d"), N = 11, S = MZ.width, CL = S / N;
  var G, P, shade, exit, state, trail, sparks, shakeT = 0, spawnAt = 0, held = null, heldT = 0, lastStep = 0, games = 0;
  var D4 = [[0, -1, 0, 2], [1, 0, 1, 3], [0, 1, 2, 0], [-1, 0, 3, 1]];

  function genMaze(){
    G = [];
    for(var y = 0; y < N; y++){ G.push([]); for(var x = 0; x < N; x++) G[y].push({ x: x, y: y, w: [1, 1, 1, 1], v: 0 }); }
    var st = [G[0][0]]; G[0][0].v = 1;
    while(st.length){
      var c = st[st.length - 1], nb = D4.map(function(d){ return [d, G[c.y + d[1]] && G[c.y + d[1]][c.x + d[0]]]; }).filter(function(p){ return p[1] && !p[1].v; });
      if(!nb.length){ st.pop(); continue; }
      var pick = nb[Math.floor(Math.random() * nb.length)], d = pick[0], n = pick[1];
      c.w[d[2]] = 0; n.w[d[3]] = 0; n.v = 1; st.push(n);
    }
    /* пара лишних проходов, чтобы от тени можно было уйти по кругу */
    for(var i = 0; i < 9; i++){
      var ex = 1 + Math.floor(Math.random() * (N - 2)), ey = 1 + Math.floor(Math.random() * (N - 2)), dd = D4[Math.floor(Math.random() * 4)], nn = G[ey + dd[1]][ex + dd[0]];
      G[ey][ex].w[dd[2]] = 0; nn.w[dd[3]] = 0;
    }
    var corners = [[N - 1, N - 1], [N - 1, 0], [0, N - 1]], e = corners[Math.floor(Math.random() * 3)];
    exit = { x: e[0], y: e[1] };
    P = { x: 0, y: 0, rx: 0, ry: 0, fx: 0, fy: 0, t: 1, dx: 0, dy: 1 };
    shade = null; trail = []; sparks = []; state = "play"; spawnAt = performance.now() + 2600;
    box.classList.remove("done");
    if(games++) track("404: new catacomb");
  }
  function open(x, y, dx, dy){ var k = G[y][x], w = dx === 1 ? 1 : dx === -1 ? 3 : dy === 1 ? 2 : 0; return !k.w[w]; }
  function move(dx, dy){
    if(state !== "play" || P.t < 1) return false;
    if(!open(P.x, P.y, dx, dy)){ shakeT = performance.now(); P.dx = dx; P.dy = dy; click(380); return false; }
    P.fx = P.x; P.fy = P.y; P.x += dx; P.y += dy; P.dx = dx; P.dy = dy; P.t = 0; click(1500 + Math.random() * 500);
    for(var i = 0; i < 5; i++) sparks.push({ x: (P.fx + .5) * CL, y: (P.fy + .5) * CL, vx: (-dx + (Math.random() - .5) * 1.4) * 3, vy: (-dy + (Math.random() - .5) * 1.4) * 3, l: 1 });
    return true;
  }
  /* тень идёт по кратчайшему пути */
  function bfsStep(from, to){
    var q = [[from.x, from.y]], prev = {}, key = function(x, y){ return x + "," + y; };
    prev[key(from.x, from.y)] = null;
    while(q.length){
      var c = q.shift(), x = c[0], y = c[1]; if(x === to.x && y === to.y) break;
      [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(function(d){
        var nx = x + d[0], ny = y + d[1]; if(nx < 0 || ny < 0 || nx >= N || ny >= N || !open(x, y, d[0], d[1])) return;
        var k = key(nx, ny); if(k in prev) return; prev[k] = [x, y]; q.push([nx, ny]);
      });
    }
    var cur = [to.x, to.y], p = prev[key(cur[0], cur[1])];
    if(p === undefined) return from;
    while(p && !(p[0] === from.x && p[1] === from.y)){ cur = p; p = prev[key(cur[0], cur[1])]; }
    return { x: cur[0], y: cur[1] };
  }
  function end(win){
    state = win ? "won" : "lost";
    $("mzMsg").textContent = tx(win ? "won" : "lost"); $("again").textContent = tx(win ? "again" : "retry");
    if(win){ click(900); setTimeout(function(){ click(1200); }, 110); track("404: escaped"); } else thud();
    setTimeout(function(){ box.classList.add("done"); if(win) $("again").focus({ preventScroll: true }); }, win ? 250 : 500);
    if(!win) setTimeout(function(){ if(state === "lost") genMaze(); }, 2600);
  }
  var ease = function(t){ return 1 - Math.pow(1 - t, 3); };
  function tick(now){
    var dt = Math.min(100, now - lastStep); lastStep = now;
    if(held && state === "play" && P.t >= 1 && now - heldT > 90){ move(held[0], held[1]); heldT = now; }
    if(P.t < 1) P.t = Math.min(1, P.t + dt / 115);
    var e = ease(P.t); P.rx = P.fx + (P.x - P.fx) * e; P.ry = P.fy + (P.y - P.fy) * e;
    trail.push({ x: P.rx, y: P.ry, l: 1 }); if(trail.length > 14) trail.shift(); trail.forEach(function(t){ t.l *= .86; });
    if(state === "play" && !shade && now > spawnAt){ shade = { x: 0, y: 0, fx: 0, fy: 0, t: 1, rx: 0, ry: 0, next: now + 300 }; click(200); }
    if(shade){
      if(shade.t >= 1 && now > shade.next && state === "play"){ var n = bfsStep(shade, P); shade.fx = shade.x; shade.fy = shade.y; shade.x = n.x; shade.y = n.y; shade.t = 0; shade.next = now + 330; }
      if(shade.t < 1) shade.t = Math.min(1, shade.t + dt / 330);
      shade.rx = shade.fx + (shade.x - shade.fx) * shade.t; shade.ry = shade.fy + (shade.y - shade.fy) * shade.t;
      if(state === "play" && Math.hypot(shade.rx - P.rx, shade.ry - P.ry) < .55) end(false);
    }
    if(state === "play" && P.t >= 1 && P.x === exit.x && P.y === exit.y) end(true);
    draw(now); requestAnimationFrame(tick);
  }
  function draw(now){
    mx.save();
    var sk = now - shakeT < 160 && !reduce ? (1 - (now - shakeT) / 160) * 6 : 0;
    mx.translate((Math.random() - .5) * sk, (Math.random() - .5) * sk);
    mx.fillStyle = "#030303"; mx.fillRect(-10, -10, S + 20, S + 20);
    var ex = (exit.x + .5) * CL, ey = (exit.y + .5) * CL, pul = .18 + Math.sin(now / 500) * .05, g = mx.createRadialGradient(ex, ey, 0, ex, ey, CL * 3);
    g.addColorStop(0, "rgba(238,235,229," + pul + ")"); g.addColorStop(1, "rgba(0,0,0,0)"); mx.fillStyle = g; mx.fillRect(0, 0, S, S);
    mx.strokeStyle = "#4e4e4a"; mx.lineWidth = 4; mx.lineCap = "square"; mx.beginPath();
    G.forEach(function(r){ r.forEach(function(k){ var X = k.x * CL, Y = k.y * CL;
      if(k.w[0]){ mx.moveTo(X, Y); mx.lineTo(X + CL, Y); } if(k.w[1]){ mx.moveTo(X + CL, Y); mx.lineTo(X + CL, Y + CL); }
      if(k.w[2]){ mx.moveTo(X, Y + CL); mx.lineTo(X + CL, Y + CL); } if(k.w[3]){ mx.moveTo(X, Y); mx.lineTo(X, Y + CL); } }); });
    mx.stroke();
    mx.fillStyle = "#eeebe5"; mx.font = "bold " + (CL * .22) + "px Arial,sans-serif"; mx.textAlign = "center"; mx.textBaseline = "middle"; mx.fillText(tx("exit"), ex, ey);
    trail.forEach(function(t){ mx.fillStyle = "rgba(238,235,229," + (t.l * .18) + ")"; mx.beginPath(); mx.arc((t.x + .5) * CL, (t.y + .5) * CL, CL * .13 * t.l + 1, 0, 7); mx.fill(); });
    sparks.forEach(function(p){ p.x += p.vx; p.y += p.vy; p.vx *= .9; p.vy *= .9; p.l -= .04; if(p.l > 0){ mx.fillStyle = "rgba(238,235,229," + p.l + ")"; mx.fillRect(p.x, p.y, 2.5, 2.5); } });
    sparks = sparks.filter(function(p){ return p.l > 0; });
    /* огонёк: светится и вытягивается по ходу движения */
    var px = (P.rx + .5) * CL, py = (P.ry + .5) * CL, mv = P.t < 1 ? Math.sin(P.t * Math.PI) : 0, br = 1 + Math.sin(now / 260) * .06;
    var h = mx.createRadialGradient(px, py, 0, px, py, CL * .95); h.addColorStop(0, "rgba(238,235,229,.32)"); h.addColorStop(1, "rgba(0,0,0,0)"); mx.fillStyle = h; mx.fillRect(px - CL, py - CL, CL * 2, CL * 2);
    mx.save(); mx.translate(px, py); mx.rotate(Math.atan2(P.dy, P.dx)); mx.scale((1 + mv * .55) * br, (1 - mv * .3) * br);
    mx.fillStyle = "#eeebe5"; mx.shadowColor = "#eeebe5"; mx.shadowBlur = 18; mx.beginPath(); mx.arc(0, 0, CL * .15, 0, 7); mx.fill(); mx.restore();
    /* тень: дым и два бледных глаза */
    if(shade){
      var sx = (shade.rx + .5) * CL, sy = (shade.ry + .5) * CL, born = Math.min(1, (now - spawnAt) / 700);
      for(var i = 0; i < 9; i++){ var a = now / 600 + i * .7, r = CL * (.26 + .12 * Math.sin(now / 300 + i)); mx.fillStyle = "rgba(70,70,66," + (.45 * born) + ")"; mx.beginPath(); mx.arc(sx + Math.cos(a) * CL * .12, sy + Math.sin(a * 1.3) * CL * .1, r, 0, 7); mx.fill(); }
      mx.fillStyle = "rgba(0,0,0," + (.9 * born) + ")"; mx.beginPath(); mx.arc(sx, sy, CL * .27, 0, 7); mx.fill();
      var blink = Math.sin(now / 900) > .97 ? .2 : 1; mx.fillStyle = "rgba(238,235,229," + born + ")";
      mx.fillRect(sx - CL * .12, sy - CL * .05, CL * .07, CL * .06 * blink); mx.fillRect(sx + CL * .05, sy - CL * .05, CL * .07, CL * .06 * blink);
      var dist = Math.hypot(shade.rx - P.rx, shade.ry - P.ry), dark = Math.max(0, 1 - dist / 4) * .6;
      if(dark > 0){ var v = mx.createRadialGradient(S / 2, S / 2, S * .25, S / 2, S / 2, S * .75); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0," + dark + ")"); mx.fillStyle = v; mx.fillRect(0, 0, S, S); }
    }
    if(state === "play" && !shade){ var left = Math.max(0, spawnAt - now); if(left < 1600){ mx.fillStyle = "rgba(138,138,134," + ((1 - left / 1600) * .8) + ")"; mx.font = "bold " + (CL * .2) + "px Arial,sans-serif"; mx.fillText(tx("stirs"), S / 2, CL * .5); } }
    mx.restore();
  }

  var DIR = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0], W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0] };
  addEventListener("keydown", function(e){
    var m = DIR[e.key]; if(!m || e.metaKey || e.ctrlKey || e.altKey) return;
    e.preventDefault(); ac();
    if(!held || held[0] !== m[0] || held[1] !== m[1]){ held = m; move(m[0], m[1]); heldT = performance.now(); }
  });
  addEventListener("keyup", function(e){ var m = DIR[e.key]; if(m && held && held[0] === m[0] && held[1] === m[1]) held = null; });
  Array.prototype.forEach.call(document.querySelectorAll(".pad button"), function(b){
    var m = b.getAttribute("data-d").split(",").map(Number);
    b.addEventListener("pointerdown", function(e){ e.preventDefault(); ac(); held = m; move(m[0], m[1]); heldT = performance.now() + 120; });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function(t){ b.addEventListener(t, function(){ held = null; }); });
    b.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); ac(); move(m[0], m[1]); } });
  });
  var sw = null;
  box.addEventListener("pointerdown", function(e){ sw = [e.clientX, e.clientY]; ac(); });
  box.addEventListener("pointermove", function(e){
    if(!sw) return; var dx = e.clientX - sw[0], dy = e.clientY - sw[1]; if(Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    var m = Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx), 0] : [0, Math.sign(dy)];
    if(move(m[0], m[1]) || P.t < 1) sw = [e.clientX, e.clientY];
  });
  box.addEventListener("pointerup", function(){ sw = null; }); box.addEventListener("pointercancel", function(){ sw = null; });
  $("again").addEventListener("click", genMaze);
  genMaze();
  requestAnimationFrame(function(t){ lastStep = t; tick(t); });
})();
