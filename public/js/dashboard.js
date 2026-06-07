/* ══════════════════════════════════════════════════════
   dashboard.js — Full dashboard logic
   JWT decoder · Expiry timer · Session info · Canvas BG

   canvas vars declared BEFORE applyTheme() call
   Aesthetic nebula orbs for both dark and light themes
══════════════════════════════════════════════════════ */

/* ─── Auth guard ─── */
const token = localStorage.getItem('token');
if (!token) window.location.href = 'index.html';

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

/* FIX: Debounced resize — restarts animation so it fills new dimensions */
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

/* ─── Sidebar panel navigation ─── */
const navItems = document.querySelectorAll('.nav-item[data-panel]');
const panels   = document.querySelectorAll('.panel');

const panelMeta = {
  overview: { title: 'Overview',           sub: 'Your account at a glance' },
  jwt:      { title: 'JWT Inspector',       sub: 'Decoded token — header, payload, signature' },
  session:  { title: 'Session & Storage',   sub: 'Where your token lives and session stats' },
  security: { title: 'Security Info',       sub: 'How this app protects your data' },
  api:      { title: 'API Reference',       sub: 'All endpoints with request / response examples' }
};

function switchPanel(id) {
  navItems.forEach(n  => n.classList.toggle('active', n.dataset.panel === id));
  panels.forEach(p   => p.classList.toggle('active', p.id === `panel-${id}`));
  const m = panelMeta[id] || {};
  const titleEl = document.getElementById('topbarTitle');
  const subEl   = document.getElementById('topbarSub');
  if (titleEl) titleEl.textContent = m.title || id;
  if (subEl)   subEl.textContent   = m.sub   || '';
}

navItems.forEach(item => item.addEventListener('click', () => switchPanel(item.dataset.panel)));

/* ─── Mobile sidebar ─── */
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const hamburger      = document.getElementById('hamburger');

hamburger && hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
  sidebarOverlay.style.display = 'block';
});
sidebarOverlay && sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.style.display = 'none';
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
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ─── Helpers ─── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return '☀️ Good morning';
  if (h < 17) return '🌤️ Good afternoon';
  return '🌙 Good evening';
}

function fmtUnix(ts) {
  const d = new Date(ts * 1000);
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ─── JWT Client-side Decoder ─── */
function decodeJWT(tok) {
  try {
    const parts  = tok.split('.');
    const decode = s => JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/')));
    return { header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2] };
  } catch { return null; }
}

/* ─── Color-coded JWT display ─── */
function renderColoredJWT(tok) {
  const parts = tok.split('.');
  const html  = `<span class="jwt-h-part">${parts[0]}</span>` +
                `<span class="jwt-dot">.</span>` +
                `<span class="jwt-p-part">${parts[1]}</span>` +
                `<span class="jwt-dot">.</span>` +
                `<span class="jwt-s-part">${parts[2]}</span>`;
  const raw = document.getElementById('jwtRaw');
  const sd  = document.getElementById('sessionTokenDisplay');
  if (raw) raw.innerHTML = html;
  if (sd)  sd.innerHTML  = html;
}

/* ─── Copy helper ─── */
async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
      btn.classList.remove('copied');
    }, 2000);
  } catch { showToast('Copy failed — try manually selecting the token', 'err'); }
}

/* ─── Token expiry countdown ─── */
let expiryInterval = null;

function startExpiryCountdown(payload) {
  const fill  = document.getElementById('expiryFill');
  const timer = document.getElementById('expiryTimer');
  const meta  = document.getElementById('expiryMeta');
  if (!fill || !timer) return;

  const { iat, exp } = payload;
  const total = exp - iat;
  if (meta) meta.textContent = `Issued: ${fmtUnix(iat)}  |  Expires: ${fmtUnix(exp)}`;

  /* Stat card shows duration */
  const days = Math.floor(total / 86400);
  set('statExpiry', `${days}d — ${new Date(exp * 1000).toLocaleDateString('en-GB', { day:'2-digit', month:'short' })}`);

  function tick() {
    const now  = Math.floor(Date.now() / 1000);
    const left = exp - now;

    if (left <= 0) {
      timer.textContent = 'EXPIRED';
      timer.style.color = 'var(--red)';
      fill.style.width  = '0%';
      fill.className    = 'expiry-fill crit';
      const badge = document.getElementById('tokenStatusBadge');
      if (badge) {
        badge.className = 'badge badge-red';
        badge.innerHTML = '<i class="fa-solid fa-circle" style="font-size:.45rem"></i> Token Expired';
      }
      clearInterval(expiryInterval);
      return;
    }

    const pct = Math.max(0, (left / total) * 100);
    const h   = Math.floor(left / 3600);
    const m   = Math.floor((left % 3600) / 60);
    const s   = left % 60;
    timer.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    fill.style.width  = pct + '%';
    fill.className    = 'expiry-fill' + (pct < 10 ? ' crit' : pct < 25 ? ' warn' : '');
  }

  clearInterval(expiryInterval);
  tick();
  expiryInterval = setInterval(tick, 1000);
}

/* ─── Browser / Session info ─── */
function fillSessionInfo() {
  const ua = navigator.userAgent;
  let browser = 'Unknown', os = 'Unknown';

  if (ua.includes('Edg'))          browser = 'Microsoft Edge';
  else if (ua.includes('Chrome'))  browser = 'Google Chrome';
  else if (ua.includes('Firefox')) browser = 'Mozilla Firefox';
  else if (ua.includes('Safari'))  browser = 'Apple Safari';
  else if (ua.includes('Opera'))   browser = 'Opera';

  if (ua.includes('Windows'))                                            os = 'Windows';
  else if (ua.includes('Mac OS'))                                        os = 'macOS';
  else if (ua.includes('Android'))                                       os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad'))                 os = 'iOS';
  else if (ua.includes('Linux'))                                         os = 'Linux';

  set('sessionBrowser', browser);
  set('sessionOS', os);
  set('sessionScreen', `${screen.width} × ${screen.height}`);

  const loginTime = parseInt(localStorage.getItem('loginTime') || '0', 10);
  if (loginTime) {
    set('sessionLoginTime', new Date(loginTime).toLocaleTimeString('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }));
    function updateDuration() {
      const diff = Math.floor((Date.now() - loginTime) / 1000);
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      set('sessionDuration', h > 0 ? `${h}h ${m}m ${s}s` : m > 0 ? `${m}m ${s}s` : `${s}s`);
    }
    updateDuration();
    setInterval(updateDuration, 1000);
  } else {
    set('sessionLoginTime', 'This session (time not recorded)');
    set('sessionDuration', 'Active now');
  }
}

/* ─── Load Profile from API ─── */
async function loadProfile() {
  try {
    const res = await fetch('/api/users/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('loginTime');
      window.location.href = 'index.html';
      return;
    }

    if (!res.ok) {
      showToast('Failed to load profile — server error', 'err');
      return;
    }

    const { user } = await res.json();

    /* Avatars & names */
    const initial = (user.name || 'U').trim().charAt(0).toUpperCase();
    ['profileAvatar', 'sidebarAvatar', 'topbarAvatar'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = initial;
    });

    set('profileName',  user.name);
    set('profileEmail', user.email);
    set('sidebarName',  user.name);
    set('sidebarEmail', user.email);
    set('greetingText', getGreeting());

    /* Overview data rows */
    set('infoName',    user.name);
    set('infoEmail',   user.email);
    set('infoId',      user._id);
    set('infoCreated', formatDate(user.createdAt));
    set('infoUpdated', user.updatedAt ? formatDate(user.updatedAt) : '—');
    set('statJoined',  new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }));

    /* Decode JWT and fill inspector */
    const decoded = decodeJWT(token);
    if (decoded) {
      const { header, payload } = decoded;
      set('jwtAlg',   header.alg   || 'HS256');
      set('jwtSub',   payload.id   || payload.sub || '—');
      set('jwtEmail', payload.email || '—');
      set('jwtIat',   fmtUnix(payload.iat));
      set('jwtExp',   fmtUnix(payload.exp));
      renderColoredJWT(token);
      startExpiryCountdown(payload);
    }

    /* Copy buttons (attach listeners once) */
    const copyBtn = document.getElementById('copyJwtBtn');
    if (copyBtn) copyBtn.addEventListener('click', () => copyText(token, copyBtn));
    const sessionCopyBtn = document.getElementById('sessionCopyBtn');
    if (sessionCopyBtn) sessionCopyBtn.addEventListener('click', () => copyText(token, sessionCopyBtn));

    /* Fill session info */
    fillSessionInfo();

  } catch (err) {
    console.error('loadProfile error:', err);
    showToast('Network error — is the server running?', 'err');
  }
}

loadProfile();

/* ─── Logout ─── */
document.getElementById('logoutBtn').addEventListener('click', () => {
  clearInterval(expiryInterval);
  localStorage.removeItem('token');
  localStorage.removeItem('loginTime');
  window.location.href = 'index.html';
});
