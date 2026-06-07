/* ══════════════════════════════════════════════════
   auth.js — Login / Register page logic + canvas bg
   
   FIX: canvas vars declared BEFORE applyTheme() call
        (was causing TDZ ReferenceError → JS crash)
══════════════════════════════════════════════════ */

/* ─── Canvas vars declared first (MUST be before applyTheme) ─── */
let animFrame = null;
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

function initCanvas(theme) {
  if (theme === 'dark') startDriftingOrbs();
  else startLightOrbs();
}

/* Restart animation on window resize (debounced) */
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initCanvas(document.documentElement.getAttribute('data-theme') || 'dark');
  }, 150);
});

/* ─── Theme (applyTheme can now safely call initCanvas) ─── */
const html     = document.documentElement;
const moonIcon = document.getElementById('moonIcon');
const sunIcon  = document.getElementById('sunIcon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  moonIcon.style.display = t === 'dark'  ? 'block' : 'none';
  sunIcon.style.display  = t === 'light' ? 'block' : 'none';
  initCanvas(t);
}
applyTheme(localStorage.getItem('theme') || 'dark'); /* safe now — canvas vars are defined above */

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

/* ─── Redirect if already logged in ─── */
if (localStorage.getItem('token')) window.location.href = 'dashboard.html';

/* ─── Tab Switcher ─── */
const tabBtns      = document.querySelectorAll('.tab-btn');
const tabPill      = document.getElementById('tabPill');
const loginForm    = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

function movePill(tab) {
  /* FIX: use CSS calc instead of offsetWidth (safer, never returns 0) */
  tabPill.style.transform = tab === 'register'
    ? 'translateX(calc(100% + 4px))'
    : 'translateX(0)';
}

function switchTab(tab) {
  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  movePill(tab);
  loginForm.style.display    = tab === 'login'    ? 'flex' : 'none';
  registerForm.style.display = tab === 'register' ? 'flex' : 'none';
  clearAllErrors();
}

tabBtns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
window.addEventListener('load', () => movePill('login'));

/* ─── Password Eye Toggle ─── */
document.querySelectorAll('.eye-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const inp  = document.getElementById(btn.dataset.for);
    const hide = inp.type === 'password';
    inp.type = hide ? 'text' : 'password';
    btn.querySelector('.eye-show').style.display = hide ? 'none'   : 'inline';
    btn.querySelector('.eye-hide').style.display = hide ? 'inline' : 'none';
  });
});

/* ─── Password Strength ─── */
const regPw  = document.getElementById('regPassword');
const bars   = [
  document.getElementById('pwBar1'),
  document.getElementById('pwBar2'),
  document.getElementById('pwBar3')
];
const pwLbl  = document.getElementById('pwLabel');

regPw && regPw.addEventListener('input', () => {
  const v = regPw.value;
  let score = 0;
  if (v.length >= 5)  score++;
  if (v.length >= 8)  score++;
  if (/[A-Z]/.test(v) && /[0-9!@#$%^&*]/.test(v)) score++;
  const labels = ['', 'Weak', 'Fair', 'Strong'];
  const cls    = ['', 'weak', 'fair', 'strong'];
  bars.forEach((b, i) => {
    b.className = 'pw-bar' + (i < score ? ' ' + cls[score] : '');
  });
  pwLbl.textContent = labels[score] || '';
  pwLbl.style.color = score === 3 ? 'var(--green)'
    : score === 2 ? 'var(--yellow)' : 'var(--red)';
});

/* ─── Toast ─── */
let toastTimer = null;
function showToast(msg, type = 'ok') {
  const toast = document.getElementById('toast');
  const dot   = document.getElementById('toastDot');
  dot.className  = 'toast-dot ' + type;
  dot.innerHTML  = type === 'ok'
    ? '<i class="fa-solid fa-check"></i>'
    : '<i class="fa-solid fa-xmark"></i>';
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ─── Field Errors ─── */
function setErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearAllErrors() {
  ['loginEmailErr', 'loginPwErr', 'regNameErr', 'regEmailErr', 'regPwErr']
    .forEach(id => setErr(id, ''));
}

/* ─── Button Loading ─── */
function setLoading(btn, on) {
  btn.disabled = on;
  /* FIX: restore display with '' (reset to default), not 'flex' which is wrong for <span> */
  btn.querySelector('.btn-label').style.display   = on ? 'none'   : '';
  btn.querySelector('.btn-spinner').style.display = on ? 'inline' : 'none';
}

/* ─── Login ─── */
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearAllErrors();
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const btn      = document.getElementById('loginBtn');

  if (!email)    return setErr('loginEmailErr', 'Email is required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr('loginEmailErr', 'Enter a valid email address');
  if (!password) return setErr('loginPwErr',    'Password is required');

  setLoading(btn, true);
  try {
    const res  = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.message || 'Login failed', 'err');
      loginForm.classList.add('shake');
      setTimeout(() => loginForm.classList.remove('shake'), 450);
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('loginTime', Date.now());
      showToast('Welcome back! Taking you in…', 'ok');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    }
  } catch {
    showToast('Cannot reach server. Is it running on the correct port?', 'err');
  } finally {
    setLoading(btn, false);
  }
});

/* ─── Register ─── */
registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearAllErrors();
  const name     = document.getElementById('regName').value.trim();
  const email    = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const btn      = document.getElementById('registerBtn');

  if (!name)                return setErr('regNameErr',  'Name is required');
  if (name.length < 2)      return setErr('regNameErr',  'Name must be at least 2 characters');
  if (!email)               return setErr('regEmailErr', 'Email is required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr('regEmailErr', 'Enter a valid email address');
  if (password.length < 5)  return setErr('regPwErr',    'Min. 5 characters');

  setLoading(btn, true);
  try {
    const res  = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.message || 'Registration failed', 'err');
      registerForm.classList.add('shake');
      setTimeout(() => registerForm.classList.remove('shake'), 450);
    } else {
      showToast('Account created! Please sign in.', 'ok');
      setTimeout(() => switchTab('login'), 1300);
    }
  } catch {
    showToast('Cannot reach server. Is it running on the correct port?', 'err');
  } finally {
    setLoading(btn, false);
  }
});
