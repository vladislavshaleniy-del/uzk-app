// MyUzCity portal: живая карта Ташкента за первым экраном и историей.
// Каждая точка — настоящее место из данных приложения (data/dots.json, собирает scripts/build-dots.mjs).
// Раздел истории, который сейчас на экране, подсвечивает свои места: транспорт — метро и остановки,
// здоровье — аптеки и клиники, документы — госучреждения; на первом экране категории сменяют друг друга.
(() => {
  'use strict';
  const cv = document.getElementById('cityDots'), cap = document.getElementById('dotsCap');
  if (!cv || !window.MZ || !cv.getContext) return;
  const { DATA, getJ, fmt, lang } = MZ;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COL = { med: '#3BD17F', metro: '#FF6B6B', bus: '#62B0FF', cafes: '#F2B45A', mosque: '#2DD4BF', edu: '#C4A1FF', gov: '#F8E3A8', parking: '#9CC5AE', ev: '#7CF5C8', sight: '#FF9EC0' };
  const NAME = {
    ru: { med: 'аптек и клиник', metro: 'станций метро', bus: 'остановок', cafes: 'кафе и ресторанов', mosque: 'мечетей', edu: 'школ и детсадов', gov: 'госучреждений', parking: 'парковок', cap: 'каждая точка — реальное место в Ташкенте' },
    uz: { med: 'dorixona va klinika', metro: 'metro bekati', bus: 'bekat', cafes: 'kafe va restoran', mosque: 'masjid', edu: "maktab va bog'cha", gov: 'davlat idorasi', parking: 'parkovka', cap: 'har bir nuqta — Toshkentdagi haqiqiy joy' },
    en: { med: 'pharmacies and clinics', metro: 'metro stations', bus: 'bus stops', cafes: 'cafes and restaurants', mosque: 'mosques', edu: 'schools and kindergartens', gov: 'public offices', parking: 'car parks', cap: 'every dot is a real place in Tashkent' },
  };
  const STEP = { 'h:transport': ['metro', 'bus'], 'h:poi': ['med'], '1:19': ['gov'] };
  const CYCLE = [['med'], ['cafes'], ['metro', 'bus'], ['mosque'], ['edu']];
  const ctx = cv.getContext('2d');
  let J = null, W = 0, H = 0, dpr = 1, base = null, glow = {}, pts = {}, on = [], prev = [], mix = 1, cyc = 0, cycT = 0, raf = 0, vis = true, last = 0;

  function layout() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    const r = cv.getBoundingClientRect(); W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    cv.width = W * dpr; cv.height = H * dpr;
    const wide = W > 960, a = J.aspect || 1;
    let mw = wide ? Math.min(W * 0.62, H * 0.95 * a) : W * 1.05, mh = mw / a;
    const cx = wide ? W * 0.7 : W * 0.5, cy = wide ? H * 0.52 : H * 0.66; // на телефоне карта ниже текста первого экрана
    const x0 = cx - mw / 2, y0 = cy - mh / 2;
    pts = {};
    for (const k in J.c) { const f = J.c[k], out = new Float32Array(f.length); for (let i = 0; i < f.length; i += 2) { out[i] = (x0 + f[i] / 1000 * mw) * dpr; out[i + 1] = (y0 + f[i + 1] / 1000 * mh) * dpr; } pts[k] = out; }
    // dim base layer with every place, then one bright layer per category
    const mk = () => { const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; return c; };
    base = mk(); const b = base.getContext('2d'), r0 = 1.05 * dpr;
    for (const k in pts) { b.fillStyle = COL[k] || '#cfe'; b.globalAlpha = wide ? 0.32 : 0.18; const p = pts[k]; for (let i = 0; i < p.length; i += 2) { b.beginPath(); b.arc(p[i], p[i + 1], r0, 0, 6.283); b.fill(); } }
    glow = {};
    for (const k in pts) { const g = mk(), c = g.getContext('2d'), p = pts[k]; c.fillStyle = COL[k] || '#cfe'; c.shadowColor = COL[k] || '#cfe'; c.shadowBlur = 7 * dpr; const r = (k === 'metro' ? 2.6 : 1.7) * dpr; for (let i = 0; i < p.length; i += 2) { c.beginPath(); c.arc(p[i], p[i + 1], r, 0, 6.283); c.fill(); } glow[k] = g; }
  }

  function setOn(list) {
    const k = (list || []).join(',');
    if (k === on.join(',')) return;
    prev = on; on = list || []; mix = RM ? 1 : 0;
    if (cap) {
      const N = NAME[lang()] || NAME.ru;
      cap.innerHTML = on.map(x => `<span><i style="background:${COL[x]}"></i>${fmt(J.n[x] || 0)} ${N[x]}</span>`).join('') + `<em>${N.cap}</em>`;
      cap.hidden = false;
    }
    if (RM) draw(performance.now());
  }

  function draw(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.globalAlpha = 1; ctx.drawImage(base, 0, 0);
    if (mix < 1) { mix = Math.min(1, mix + 0.06); ctx.globalAlpha = 1 - mix; prev.forEach(k => glow[k] && ctx.drawImage(glow[k], 0, 0)); }
    ctx.globalAlpha = mix; on.forEach(k => glow[k] && ctx.drawImage(glow[k], 0, 0));
    if (!RM) { // a few places breathe brighter
      ctx.globalAlpha = 1;
      on.forEach(k => { const p = pts[k]; if (!p) return; const n = Math.min(40, p.length / 2), c = COL[k];
        for (let j = 0; j < n; j++) { const i = ((j * 7919 + Math.floor(t / 1600) * 104729) % (p.length / 2)) * 2, s = 0.5 + 0.5 * Math.sin(t / 420 + j); ctx.globalAlpha = 0.35 + 0.65 * s; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(p[i], p[i + 1], (1.6 + 1.8 * s) * dpr, 0, 6.283); ctx.fill(); } });
      ctx.globalAlpha = 1;
    }
  }

  function loop(t) {
    raf = 0; if (!vis || document.hidden) return;
    if (t - last > 33) { // ~30 кадров в секунду
      last = t;
      const step = document.querySelector('.story .step.on'), go = step && step.dataset.go;
      if (STEP[go]) setOn(STEP[go]);
      else { if (t - cycT > 3200 || !on.length) { cycT = t; setOn(CYCLE[cyc++ % CYCLE.length]); } }
      draw(t);
    }
    raf = requestAnimationFrame(loop);
  }
  const kick = () => { if (!raf && vis && !document.hidden && !RM) raf = requestAnimationFrame(loop); };

  function start(j) {
    if (!j || !j.c) return;
    J = j; window.MZdots = j; document.dispatchEvent(new CustomEvent('mz:dots', { detail: j }));
    layout(); cv.classList.add('on'); document.querySelector('.blk-hero')?.classList.add('dots-on');
    if (RM) { const step = document.querySelector('.story .step.on'); setOn(STEP[step && step.dataset.go] || ['med']); draw(0); return; }
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; kick(); }); io.observe(document.querySelector('.blk-hero') || cv);
    document.addEventListener('visibilitychange', kick);
    kick();
  }
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (J) { layout(); if (RM) draw(0); } }, 200); });
  document.addEventListener('mz:lang', () => { if (J) { const o = on; on = []; setOn(o); } });
  const go = () => getJ(DATA + 'data/dots.json').then(start);
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 1500 }); else setTimeout(go, 400);
})();
