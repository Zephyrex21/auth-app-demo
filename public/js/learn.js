/* ══════════════════════════════════════════
   learn.js — Learn page logic + canvas bg

   FIX: canvas vars declared BEFORE applyTheme()
        (was causing TDZ ReferenceError → JS crash)
   FIX: debounced resize restarts animations
══════════════════════════════════════════ */

/* ─── Canvas vars declared first (MUST be before applyTheme) ─── */
let animFrame  = null;
let resizeTimer = null;
const canvas = document.getElementById('bgCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

/* ─── Dark: Drifting nebula orbs ─── */
function startDriftingOrbs() {
  cancelAnimationFrame(animFrame);
  resizeCanvas();
  const orbs = [
    { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 260, col: '0,240,255',   phase: 0,   spd: 0.0035, vx: 0.18,  vy: 0.11  },
    { x: canvas.width * 0.82, y: canvas.height * 0.18, r: 320, col: '123,47,255',  phase: 1.2, spd: 0.0025, vx: -0.14, vy: 0.15  },
    { x: canvas.width * 0.50, y: canvas.height * 0.75, r: 230, col: '0,240,255',   phase: 2.5, spd: 0.0042, vx: 0.12,  vy: -0.14 },
    { x: canvas.width * 0.08, y: canvas.height * 0.80, r: 200, col: '123,47,255',  phase: 3.8, spd: 0.0038, vx: 0.19,  vy: -0.09 },
    { x: canvas.width * 0.92, y: canvas.height * 0.58, r: 270, col: '0,200,160',   phase: 4.6, spd: 0.0030, vx: -0.11, vy: -0.13 },
    { x: canvas.width * 0.40, y: canvas.height * 0.05, r: 210, col: '0,240,255',   phase: 5.3, spd: 0.0045, vx: 0.13,  vy: 0.17  },
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy; o.phase += o.spd;
      if (o.x < -o.r) o.x = canvas.width + o.r;
      if (o.x > canvas.width + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = canvas.height + o.r;
      if (o.y > canvas.height + o.r) o.y = -o.r;
      const a = 0.055 + 0.03 * Math.sin(o.phase);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0,   `rgba(${o.col},${(a + 0.025).toFixed(3)})`);
      g.addColorStop(0.5, `rgba(${o.col},${(a * 0.45).toFixed(3)})`);
      g.addColorStop(1,   `rgba(${o.col},0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });
    animFrame = requestAnimationFrame(draw);
  }
  draw();
}

/* ─── Light: Soft gradient orbs (indigo/violet palette) ─── */
function startLightOrbs() {
  cancelAnimationFrame(animFrame);
  resizeCanvas();
  const orbs = [
    { x: canvas.width * 0.12, y: canvas.height * 0.20, r: 280, col: '79,70,229',   phase: 0,   spd: 0.003,  vx: 0.14,  vy: 0.10  },
    { x: canvas.width * 0.88, y: canvas.height * 0.14, r: 340, col: '124,58,237',  phase: 1.4, spd: 0.002,  vx: -0.12, vy: 0.13  },
    { x: canvas.width * 0.52, y: canvas.height * 0.82, r: 250, col: '99,102,241',  phase: 2.8, spd: 0.004,  vx: 0.10,  vy: -0.11 },
    { x: canvas.width * 0.22, y: canvas.height * 0.72, r: 200, col: '79,70,229',   phase: 3.5, spd: 0.0035, vx: 0.16,  vy: -0.08 },
    { x: canvas.width * 0.78, y: canvas.height * 0.62, r: 220, col: '124,58,237',  phase: 4.8, spd: 0.0038, vx: -0.10, vy: -0.12 },
    { x: canvas.width * 0.45, y: canvas.height * 0.08, r: 190, col: '99,102,241',  phase: 5.5, spd: 0.004,  vx: 0.13,  vy: 0.15  },
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy; o.phase += o.spd;
      if (o.x < -o.r) o.x = canvas.width + o.r;
      if (o.x > canvas.width + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = canvas.height + o.r;
      if (o.y > canvas.height + o.r) o.y = -o.r;
      const a = 0.07 + 0.035 * Math.sin(o.phase);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0,   `rgba(${o.col},${(a).toFixed(3)})`);
      g.addColorStop(0.55,`rgba(${o.col},${(a * 0.38).toFixed(3)})`);
      g.addColorStop(1,   `rgba(${o.col},0)`);
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });
    animFrame = requestAnimationFrame(draw);
  }
  draw();
}

function initCanvas(t) {
  if (t === 'dark') startDriftingOrbs();
  else startLightOrbs();
}

/* FIX: Debounced resize restarts animation */
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initCanvas(document.documentElement.getAttribute('data-theme') || 'dark');
  }, 150);
});

/* ─── Theme ─── */
const html     = document.documentElement;
const moonIcon = document.getElementById('moonIcon');
const sunIcon  = document.getElementById('sunIcon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  moonIcon.style.display = t === 'dark'  ? 'block' : 'none';
  sunIcon.style.display  = t === 'light' ? 'block' : 'none';
  initCanvas(t);
}
applyTheme(localStorage.getItem('theme') || 'dark'); /* safe — canvas vars are above */

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

/* ─── JWT Playground decoder ─── */
function decodeJWT(tok) {
  try {
    const parts = tok.trim().split('.');
    if (parts.length !== 3) return null;
    const decode = s => JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/')));
    return { header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2] };
  } catch { return null; }
}

const playInput  = document.getElementById('playgroundInput');
const playBtn    = document.getElementById('playgroundDecodeBtn');
const playResult = document.getElementById('playgroundResult');
const playError  = document.getElementById('playgroundError');

function runDecode() {
  if (!playInput || !playError || !playResult) return;
  playError.style.display = 'none';
  const tok = playInput.value.trim();
  if (!tok) {
    playError.style.display = 'block';
    playResult.classList.add('hidden');
    return;
  }
  const d = decodeJWT(tok);
  if (!d) {
    playError.style.display = 'block';
    playResult.classList.add('hidden');
    return;
  }
  const ph = document.getElementById('pgHeader');
  const pp = document.getElementById('pgPayload');
  const ps = document.getElementById('pgSig');
  if (ph) ph.textContent = JSON.stringify(d.header,  null, 2);
  if (pp) pp.textContent = JSON.stringify(d.payload, null, 2);
  if (ps) ps.textContent = d.signature;
  playResult.classList.remove('hidden');
}

playBtn   && playBtn.addEventListener('click', runDecode);

/* Ctrl+Enter to decode */
playInput && playInput.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runDecode();
});

/* Pre-load session token if user is logged in */
const storedToken = localStorage.getItem('token');
if (storedToken && playInput) {
  playInput.value = storedToken;
  playInput.style.borderColor = 'var(--accent)';
  const hint = document.createElement('div');
  hint.style.cssText = 'font-size:.72rem;color:var(--accent);margin-bottom:10px;display:flex;align-items:center;gap:6px;';
  hint.innerHTML = '<i class="fa-solid fa-circle-info"></i> Your current session token is pre-loaded — click Decode to inspect it.';
  playInput.parentNode.insertBefore(hint, playInput.nextSibling);
}
