/* ============================================================
   PREM — visual effects
   Petals · confetti · heart cursor trail · floating hearts
   ============================================================ */

const FX = (() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse  = window.matchMedia('(pointer: coarse)').matches;

  /* ---------------------------------------------------------
     Shared canvas helper (handles DPR + resize)
  --------------------------------------------------------- */
  function setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    return { ctx, get w() { return w; }, get h() { return h; } };
  }

  /* ---------------------------------------------------------
     1. FALLING BAMBOO LEAVES + BLOSSOM PETALS
  --------------------------------------------------------- */
  function startPetals(canvas) {
    if (reduced) return;
    const c = setupCanvas(canvas);

    // mostly bamboo leaves, with blossom petals mixed in
    const LEAF_COLORS   = ['#6f9e6a', '#8fbd78', '#4f7f57', '#a3ca8b', '#5f8f5c'];
    const PETAL_COLORS  = ['#f6a8c2', '#ffd0de', '#e88bb0'];
    const COUNT = coarse ? 18 : 34;
    const bits = [];

    function make(seed) {
      const isLeaf = Math.random() < 0.65;
      return {
        isLeaf,
        x: Math.random() * c.w,
        y: seed ? Math.random() * c.h : -30 - Math.random() * 120,
        r: isLeaf ? 7 + Math.random() * 9 : 5 + Math.random() * 6,
        sway: 0.8 + Math.random() * 2,
        vy: 0.3 + Math.random() * 0.8,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.03,
        phase: Math.random() * Math.PI * 2,
        color: isLeaf
          ? LEAF_COLORS[(Math.random() * LEAF_COLORS.length) | 0]
          : PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
        alpha: 0.45 + Math.random() * 0.4,
      };
    }
    for (let i = 0; i < COUNT; i++) bits.push(make(true));

    // a long pointed bamboo leaf
    function leafPath(ctx, r) {
      ctx.beginPath();
      ctx.moveTo(-r * 1.7, 0);
      ctx.quadraticCurveTo(0, -r * 0.62, r * 1.7, 0);
      ctx.quadraticCurveTo(0, r * 0.62, -r * 1.7, 0);
      ctx.closePath();
    }
    // a soft rounded blossom petal
    function petalPath(ctx, r) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.8, -r * 0.6, r * 1.2, r * 0.5, 0, r * 1.5);
      ctx.bezierCurveTo(-r * 1.2, r * 0.5, -r * 0.8, -r * 0.6, 0, 0);
      ctx.closePath();
    }

    let t = 0;
    (function loop() {
      const { ctx } = c;
      ctx.clearRect(0, 0, c.w, c.h);
      t += 0.01;
      for (let i = 0; i < bits.length; i++) {
        const p = bits[i];
        p.y += p.vy;
        p.x += Math.sin(t * 2 + p.phase) * p.sway * 0.5;
        p.rot += p.vrot;
        if (p.y > c.h + 40) bits[i] = make(false);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.isLeaf) {
          leafPath(ctx, p.r);
          ctx.fill();
          // centre vein
          ctx.globalAlpha = p.alpha * 0.4;
          ctx.strokeStyle = '#2f5340';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-p.r * 1.6, 0);
          ctx.lineTo(p.r * 1.6, 0);
          ctx.stroke();
        } else {
          petalPath(ctx, p.r);
          ctx.fill();
        }
        ctx.restore();
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------------------------------------------------
     2. CONFETTI + HEART BURST
  --------------------------------------------------------- */
  let confettiCtx = null, pieces = [], running = false;

  function initConfetti(canvas) {
    confettiCtx = setupCanvas(canvas);
  }

  function heartPath(ctx, s) {
    ctx.beginPath();
    ctx.moveTo(0, s * 0.35);
    ctx.bezierCurveTo(0, -s * 0.15, -s, -s * 0.15, -s, s * 0.35);
    ctx.bezierCurveTo(-s, s * 0.9, 0, s * 1.15, 0, s * 1.5);
    ctx.bezierCurveTo(0, s * 1.15, s, s * 0.9, s, s * 0.35);
    ctx.bezierCurveTo(s, -s * 0.15, 0, -s * 0.15, 0, s * 0.35);
    ctx.closePath();
  }

  // Chosen to read against the light dawn sky — no white
  const CONFETTI_COLORS = ['#e0709b', '#c04a78', '#e5a545', '#7fae6f', '#4f7f57', '#2b2320'];

  function burst(x, y, amount = 90, spread = 12) {
    if (!confettiCtx || reduced) return;
    for (let i = 0; i < amount; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = Math.random() * spread + 2;
      pieces.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 4,
        g: 0.16 + Math.random() * 0.12,
        size: 5 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.24,
        color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        heart: Math.random() < 0.45,
        life: 1,
        decay: 0.006 + Math.random() * 0.008,
      });
    }
    if (!running) { running = true; loopConfetti(); }
  }

  /** Confetti raining from the top of the screen. */
  function rain(amount = 140) {
    if (!confettiCtx || reduced) return;
    for (let i = 0; i < amount; i++) {
      pieces.push({
        x: Math.random() * confettiCtx.w,
        y: -20 - Math.random() * confettiCtx.h * 0.5,
        vx: (Math.random() - 0.5) * 2.4,
        vy: 2 + Math.random() * 3.5,
        g: 0.03,
        size: 5 + Math.random() * 9,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.2,
        color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        heart: Math.random() < 0.5,
        life: 1,
        decay: 0.0035,
      });
    }
    if (!running) { running = true; loopConfetti(); }
  }

  function loopConfetti() {
    const { ctx } = confettiCtx;
    ctx.clearRect(0, 0, confettiCtx.w, confettiCtx.h);

    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.vy += p.g;
      p.vx *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > confettiCtx.h + 60) { pieces.splice(i, 1); continue; }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
      ctx.fillStyle = p.color;
      if (p.heart) {
        ctx.scale(0.55, 0.55);
        heartPath(ctx, p.size);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }

    if (pieces.length) requestAnimationFrame(loopConfetti);
    else running = false;
  }

  /* ---------------------------------------------------------
     3. HEART CURSOR + TRAIL
  --------------------------------------------------------- */
  function startCursor(trailEl) {
    if (reduced) return;

    // Mostly hearts, with the occasional panda for her
    const GLYPHS = ['🤍', '💗', '💕', '🩷', '💖', '🤍', '💗', '💕', '🐼'];
    let last = 0;

    function drop(x, y) {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      const s = document.createElement('span');
      s.className = 'trail-dot';
      s.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.fontSize = (10 + Math.random() * 10) + 'px';
      trailEl.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }

    if (!coarse) {
      // Custom heart cursor for mouse users
      const cur = document.createElement('div');
      cur.className = 'cursor';
      cur.innerHTML = '<svg viewBox="0 0 32 29"><path d="M16 29S1 19.5 1 9.9A8.9 8.9 0 0 1 16 4a8.9 8.9 0 0 1 15 5.9C31 19.5 16 29 16 29z"/></svg>';
      document.body.appendChild(cur);

      let tx = 0, ty = 0, cx = 0, cy = 0;
      window.addEventListener('mousemove', (e) => {
        tx = e.clientX; ty = e.clientY;
        drop(e.clientX, e.clientY);
      }, { passive: true });
      window.addEventListener('mousedown', () => cur.classList.add('is-tap'));
      window.addEventListener('mouseup',   () => cur.classList.remove('is-tap'));
      window.addEventListener('mouseout',  (e) => { if (!e.relatedTarget) cur.style.opacity = '0'; });
      window.addEventListener('mouseover', () => { cur.style.opacity = '1'; });

      (function follow() {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
        cur.style.transform = `translate(${cx}px, ${cy}px)`;
        requestAnimationFrame(follow);
      })();
    } else {
      // Touch: hearts follow the finger
      window.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        if (t) drop(t.clientX, t.clientY);
      }, { passive: true });
    }
  }

  /* ---------------------------------------------------------
     4. FLOATING HEARTS (hero background)
  --------------------------------------------------------- */
  function floatingHearts(container, count) {
    if (reduced) return;
    const GLYPHS = ['🤍', '💗', '💞', '🌸', '💕', '🤍', '💗', '🐼'];
    const n = count || (coarse ? 12 : 22);
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      s.style.left = (Math.random() * 100) + '%';
      s.style.fontSize = (12 + Math.random() * 24) + 'px';
      s.style.animationDuration = (11 + Math.random() * 14) + 's';
      s.style.animationDelay = (-Math.random() * 22) + 's';
      container.appendChild(s);
    }
  }

  /* ---------------------------------------------------------
     5. TRACED HEART OUTLINE  (the gate's centrepiece)
     A light travels around the classic heart curve, leaving a
     glowing tail — a Canvas-2D take on the WebGL preloader idea.
  --------------------------------------------------------- */
  function traceHeart(canvas) {
    const c = setupCanvas(canvas);

    // x = 16sin³t ,  y = -(13cos t − 5cos2t − 2cos3t − cos4t)
    function pt(t, s, cx, cy) {
      const st = Math.sin(t);
      return {
        x: cx + 16 * st * st * st * s,
        y: cy - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s,
      };
    }

    const TAIL = 1.15;   // length of the glowing tail, in radians
    const STEPS = 26;    // segments per tail
    let head = 0;
    let intensity = 1;   // bumped to 2 during the unlock flourish

    function drawArc(ctx, from, to, s, cx, cy, color, width, glow) {
      ctx.beginPath();
      for (let i = 0; i <= STEPS; i++) {
        const p = pt(from + ((to - from) * i) / STEPS, s, cx, cy);
        i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.shadowColor = color;
      ctx.shadowBlur = glow;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function frame() {
      const { ctx } = c;
      const cx = c.w / 2, cy = c.h / 2;
      const s = Math.min(c.w, c.h) / 38;

      ctx.clearRect(0, 0, c.w, c.h);
      if (!s || !isFinite(s)) { requestAnimationFrame(frame); return; }

      // the resting outline
      ctx.beginPath();
      for (let i = 0; i <= 220; i++) {
        const p = pt((i / 220) * Math.PI * 2, s, cx, cy);
        i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(79,127,87,.3)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // two travelling lights, opposite sides of the heart
      const k = intensity;
      drawArc(ctx, head - TAIL, head, s, cx, cy, 'rgba(224,112,155,.5)', 5 * k, 12 * k);
      drawArc(ctx, head - TAIL * 0.45, head, s, cx, cy, 'rgba(192,74,120,.95)', 2.2 * k, 8 * k);

      const opp = head + Math.PI;
      drawArc(ctx, opp - TAIL, opp, s, cx, cy, 'rgba(229,165,69,.45)', 4.4 * k, 12 * k);
      drawArc(ctx, opp - TAIL * 0.45, opp, s, cx, cy, 'rgba(198,131,38,.95)', 2 * k, 8 * k);

      // bright head
      [head, opp].forEach((t, i) => {
        const p = pt(t, s, cx, cy);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 13 * k);
        g.addColorStop(0, i ? 'rgba(229,165,69,.9)' : 'rgba(224,112,155,.9)');
        g.addColorStop(1, i ? 'rgba(229,165,69,0)' : 'rgba(224,112,155,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14 * k, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) head += 0.02;
      requestAnimationFrame(frame);
    }
    frame();

    return {
      /** Brief surge of light — used the moment the gate unlocks. */
      flare() {
        const t0 = performance.now();
        (function step(t) {
          const k = Math.min(1, (t - t0) / 900);
          intensity = 1 + Math.sin(k * Math.PI) * 1.6;
          if (k < 1) requestAnimationFrame(step); else intensity = 1;
        })(t0);
      },
    };
  }

  return { startPetals, initConfetti, burst, rain, startCursor, floatingHearts, traceHeart, reduced, coarse };
})();
