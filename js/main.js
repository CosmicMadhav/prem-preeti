/* ============================================================
   PREM — behaviour
   Everything is driven by CONTENT (js/content.js).
   ============================================================ */

(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const C  = window.CONTENT || CONTENT;

  // ?skip lets you peek at the site without waiting for the countdown
  const SKIP = C.previewMode === true || /[?&]skip\b/.test(location.search);

  /* ---------------------------------------------------------
     Birthday parsing — "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM"
     Parsed as LOCAL time (never UTC), so the countdown is
     correct wherever she opens it.
  --------------------------------------------------------- */
  const B = (() => {
    const m = String(C.birthday).match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2}))?/);
    if (!m) return { y: 2026, mo: 8, d: 18, hh: 0, mi: 0 };
    return { y: +m[1], mo: +m[2], d: +m[3], hh: +(m[4] || 0), mi: +(m[5] || 0) };
  })();

  /** The exact moment the gate is meant to open. */
  const gateMoment = () => new Date(B.y, B.mo - 1, B.d, B.hh, B.mi, 0, 0);

  /**
   * Drives a group of day/hour/minute/second elements.
   * `getTarget` is a function so the target can roll to next year.
   */
  function driveClock(els, getTarget, onZero) {
    const prev = {};
    let fired = false;
    let iv = null;

    function set(key, value) {
      const el = els[key];
      if (!el) return;
      const str = String(value).padStart(2, '0');
      if (prev[key] === str) return;
      prev[key] = str;
      el.textContent = str;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    }

    function tick() {
      const diff = getTarget().getTime() - Date.now();
      const totalSec = Math.max(0, Math.floor(diff / 1000));
      set('d', Math.floor(totalSec / 86400));
      set('h', Math.floor(totalSec / 3600) % 24);
      set('m', Math.floor(totalSec / 60) % 60);
      set('s', totalSec % 60);
      if (diff <= 0 && !fired) {
        fired = true;
        clearInterval(iv);
        if (onZero) onZero();
      }
    }

    tick();
    if (!fired) iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }

  /* ---------------------------------------------------------
     Image helper — degrades gracefully when a photo is missing
  --------------------------------------------------------- */
  function mountImage(holder, src, altText) {
    if (!src) { holder.classList.add('is-empty'); return; }
    const img = new Image();
    img.alt = altText || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => holder.classList.add('is-empty'), { once: true });
    img.src = src;
    holder.appendChild(img);
  }

  /* ---------------------------------------------------------
     Reveal-on-scroll
  --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  const watchReveals = (root = document) =>
    $$('.reveal:not(.in)', root).forEach((el) => revealObserver.observe(el));

  /* =========================================================
     1. FILL IN THE STATIC TEXT
  ========================================================= */
  function fillText() {
    document.title = `${C.world.name} — ${C.world.tagline}`;

    // Lock
    $('#lockEyebrow').textContent = C.lock.eyebrow;
    $('#lockTitle').textContent   = C.lock.title;
    $('#lockHint').textContent    = C.lock.hint;
    $('#lockBtn').textContent     = C.lock.button;
    $('#lockInput').placeholder   = C.lock.placeholder;

    // Hero
    $('#heroGreeting').textContent = C.hero.greeting;
    $('#heroTagline').textContent  = C.world.tagline;
    $('#heroForName').textContent  = C.her.softName;
    $('#heroSubtitle').textContent = C.hero.subtitle;
    $('#heroScroll em').textContent = C.hero.scrollHint;

    // Countdown
    $('#cdEyebrow').textContent = C.countdown.eyebrow;

    // Gallery
    $('#galEyebrow').textContent  = C.gallery.eyebrow;
    $('#galTitle').textContent    = C.gallery.title;
    $('#galSubtitle').textContent = C.gallery.subtitle;

    // Reasons
    $('#rsEyebrow').textContent  = C.reasons.eyebrow;
    $('#rsTitle').textContent    = C.reasons.title;
    $('#rsSubtitle').textContent = C.reasons.subtitle;

    // Birthday
    $('#bdEyebrow').textContent  = C.birthdaySection.eyebrow;
    $('#bdTitle').textContent    = C.birthdaySection.title;
    $('#bdSubtitle').textContent = C.birthdaySection.subtitle;
    $('#wishTitle').textContent  = C.birthdaySection.doneTitle;
    $('#wishMsg').textContent    = C.birthdaySection.doneMessage;

    // Proposal
    $('#prEyebrow').textContent = C.proposal.eyebrow;
    $('#question').textContent  = C.proposal.question;
    $('#btnYes').textContent    = C.proposal.yes;
    $('#btnNo').textContent     = C.proposal.no;
    $('#yesTitle').textContent  = C.proposal.acceptedTitle;
    $('#yesMsg').textContent    = C.proposal.acceptedMessage;

    // Finale
    $('#fnEyebrow').textContent = C.finale.eyebrow;
    $('#fnTitle').textContent   = C.finale.title;
    $('#fnSign').textContent    = C.finale.signature;
    $('#fnBy').textContent      = C.finale.signedBy;
    $('#fnFooter').textContent  = C.finale.footer;

    const body = $('#fnBody');
    C.finale.letter.forEach((para) => {
      const p = document.createElement('p');
      p.textContent = para;
      body.appendChild(p);
    });

    $('#musicLabel').textContent   = C.music.label;
    $('.letter__seal').textContent = C.world.name[0];
  }

  /* =========================================================
     2. HERO — letter-by-letter world name
  ========================================================= */
  function buildHero() {
    const inner = $('.hero__worldInner');
    inner.textContent = '';
    C.world.name.split('').forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = ch;
      s.style.animationDelay = (0.35 + i * 0.13) + 's';
      inner.appendChild(s);
    });
    FX.floatingHearts($('#heroHearts'));
  }

  /* =========================================================
     3. COUNTDOWN
  ========================================================= */
  function startCountdown() {
    const clock = $('#clock');
    const title = $('#cdTitle');
    const msg   = $('#cdMessage');
    let celebrated = false;

    const now = new Date();
    const isToday = now.getMonth() === B.mo - 1 && now.getDate() === B.d;

    if (isToday) {
      clock.classList.add('is-today');
      title.textContent = C.countdown.todayTitle;
      msg.textContent   = C.countdown.todayMessage;

      // Rain confetti the first time this section is seen
      new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !celebrated) {
            celebrated = true;
            FX.rain(180);
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 }).observe($('#countdown'));
      return;
    }

    title.textContent = C.countdown.title;
    msg.textContent   = C.countdown.afterMessage;

    // Rolls to next year once this year's birthday has passed
    driveClock(
      { d: $('#cdD'), h: $('#cdH'), m: $('#cdM'), s: $('#cdS') },
      () => {
        const n = new Date();
        let t = new Date(n.getFullYear(), B.mo - 1, B.d, B.hh, B.mi, 0, 0);
        if (t.getTime() <= n.getTime()) t = new Date(n.getFullYear() + 1, B.mo - 1, B.d, B.hh, B.mi, 0, 0);
        return t;
      }
    );
  }

  /* =========================================================
     4. THE SERIES — chapters
  ========================================================= */
  function buildChapters() {
    const host = $('#chapters');
    C.chapters.forEach((ch) => {
      const art = document.createElement('article');
      art.className = 'chapter';

      const media = document.createElement('div');
      media.className = 'chapter__media reveal';
      const no = document.createElement('span');
      no.className = 'chapter__no';
      no.textContent = ch.number;
      const frame = document.createElement('div');
      frame.className = 'frame';
      frame.dataset.file = (ch.photo || '').split('/').pop() || 'a photo';
      mountImage(frame, ch.photo, ch.title);
      media.append(no, frame);

      const body = document.createElement('div');
      body.className = 'chapter__body reveal';
      body.innerHTML =
        `<p class="chapter__date"></p><h3 class="chapter__title"></h3><p class="chapter__note"></p>`;
      $('.chapter__date', body).textContent  = ch.date;
      $('.chapter__title', body).textContent = ch.title;
      $('.chapter__note', body).textContent  = ch.note;

      art.append(media, body);
      host.appendChild(art);
    });
  }

  /* =========================================================
     5a. LIGHTBOX — shared by both galleries
  ========================================================= */
  const lightbox = (() => {
    const box = $('#lightbox');
    const img = $('#lbImg');
    const cap = $('#lbCap');
    let list = [], index = 0;

    function show(i) {
      index = (i + list.length) % list.length;
      img.src = list[index].src;
      img.alt = list[index].caption || '';
      cap.textContent = list[index].caption || '';
    }
    function open(items, i) {
      list = items;
      show(i);
      box.hidden = false;
      document.body.classList.add('no-scroll');
      requestAnimationFrame(() => box.classList.add('in'));
    }
    function close() {
      box.classList.remove('in');
      document.body.classList.remove('no-scroll');
      setTimeout(() => { box.hidden = true; }, 350);
    }

    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', () => show(index - 1));
    $('#lbNext').addEventListener('click', () => show(index + 1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (box.hidden) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });

    return { open };
  })();

  /* =========================================================
     5b. THE REAL PANDAS
  ========================================================= */
  function buildPandaGallery() {
    const G = C.pandaGallery;
    if (!G) return;
    $('#pgEyebrow').textContent  = G.eyebrow;
    $('#pgTitle').textContent    = G.title;
    $('#pgSubtitle').textContent = G.subtitle;
    $('#pgCredit').textContent   = G.credit || '';

    const host = $('#pandaGrid');
    G.items.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pandaCard reveal';
      btn.dataset.file = (item.src || '').split('/').pop();
      btn.setAttribute('aria-label', item.caption || 'Panda');

      mountImage(btn, item.src, item.caption);

      const cap = document.createElement('span');
      cap.className = 'pandaCard__cap';
      cap.textContent = item.caption || '';
      btn.appendChild(cap);

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-empty')) return;
        lightbox.open(G.items, i);
      });
      host.appendChild(btn);
    });
  }

  /* =========================================================
     5. GALLERY
  ========================================================= */
  function buildGallery() {
    const host = $('#polaroids');
    const usable = [];

    C.gallery.photos.forEach((photo, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'polaroid reveal';
      btn.style.setProperty('--r', ((i % 2 ? 1 : -1) * (1 + Math.random() * 2.6)).toFixed(2) + 'deg');

      const holder = document.createElement('div');
      holder.className = 'polaroid__img';
      mountImage(holder, photo.src, photo.caption);

      const cap = document.createElement('span');
      cap.className = 'polaroid__cap';
      cap.textContent = photo.caption || '';

      btn.append(holder, cap);
      btn.addEventListener('click', () => {
        if (holder.classList.contains('is-empty')) return;
        lightbox.open(usable, usable.indexOf(photo));
      });
      host.appendChild(btn);
      usable.push(photo);
    });
  }

  /* =========================================================
     6. REASONS — flip cards
  ========================================================= */
  function buildReasons() {
    const host = $('#reasonCards');
    C.reasons.items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'flip reveal';
      btn.setAttribute('aria-label', item.front);
      btn.innerHTML =
        `<div class="flip__inner">
           <div class="flip__face flip__front"></div>
           <div class="flip__face flip__back"></div>
         </div>`;
      $('.flip__front', btn).textContent = item.front;
      $('.flip__back',  btn).textContent = item.back;
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-flipped');
        if (btn.classList.contains('is-flipped')) {
          const r = btn.getBoundingClientRect();
          FX.burst(r.left + r.width / 2, r.top + r.height / 2, 14, 5);
        }
      });
      host.appendChild(btn);
    });
  }

  /* =========================================================
     7. BIRTHDAY CAKE — blow out the candles
  ========================================================= */
  function buildCake() {
    const host  = $('#candles');
    const cake  = $('#cake');
    const wish  = $('#wish');
    const total = C.birthdaySection.candles || 5;
    let out = 0;

    for (let i = 0; i < total; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'candle';
      b.setAttribute('aria-label', 'Blow out candle ' + (i + 1));
      b.innerHTML = '<span class="flame"></span>';
      b.addEventListener('click', () => {
        if (b.classList.contains('out')) return;
        b.classList.add('out');
        out++;
        const r = b.getBoundingClientRect();
        FX.burst(r.left + r.width / 2, r.top, 12, 4);

        if (out === total) {
          cake.classList.add('is-done');
          FX.rain(160);
          const cr = cake.getBoundingClientRect();
          FX.burst(cr.left + cr.width / 2, cr.top + cr.height / 2, 120, 14);
          wish.hidden = false;
          requestAnimationFrame(() => wish.classList.add('in'));
        }
      });
      host.appendChild(b);
    }
  }

  /* =========================================================
     8. THE PROPOSAL
  ========================================================= */
  function buildProposal() {
    const host = $('#buildup');
    const lines = [];
    C.proposal.buildup.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      host.appendChild(p);
      lines.push(p);
    });

    // Reveal the buildup lines one at a time when the section is reached
    new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        lines.forEach((p, i) => setTimeout(() => p.classList.add('in'), 350 + i * 900));
        obs.disconnect();
      });
    }, { threshold: 0.3 }).observe($('#proposal'));

    /* --- the runaway "no" button --- */
    const btnNo   = $('#btnNo');
    const btnYes  = $('#btnYes');
    const tease   = $('#tease');
    const teases  = C.proposal.noTeases;
    let dodges = 0;

    function dodge() {
      dodges++;

      const pad = 16;
      const w = btnNo.offsetWidth;
      const h = btnNo.offsetHeight;
      const maxX = Math.max(pad, window.innerWidth  - w - pad);
      const maxY = Math.max(pad, window.innerHeight - h - pad);

      // Keep it away from wherever it currently is
      let x, y, tries = 0;
      const cur = btnNo.getBoundingClientRect();
      do {
        x = pad + Math.random() * (maxX - pad);
        y = pad + Math.random() * (maxY - pad);
        tries++;
      } while (tries < 12 && Math.hypot(x - cur.left, y - cur.top) < 180);

      btnNo.classList.add('is-loose');
      btnNo.style.left = x + 'px';
      btnNo.style.top  = y + 'px';

      tease.textContent = teases[(dodges - 1) % teases.length];
      tease.classList.add('show');

      // Yes gets a little more tempting each time
      const scale = Math.min(1 + dodges * 0.07, 1.6);
      btnYes.style.transform = `scale(${scale})`;
      btnNo.style.opacity = String(Math.max(0.25, 1 - dodges * 0.08));
    }

    btnNo.addEventListener('mouseenter', dodge);
    btnNo.addEventListener('focus', dodge);
    btnNo.addEventListener('click', (e) => { e.preventDefault(); dodge(); });
    btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); dodge(); }, { passive: false });

    /* --- YES --- */
    const over = $('#yesover');
    btnYes.addEventListener('click', () => {
      const r = btnYes.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height / 2, 160, 17);
      FX.rain(220);

      // Rolling bursts for a few seconds
      let n = 0;
      const iv = setInterval(() => {
        FX.burst(Math.random() * window.innerWidth, window.innerHeight * (0.25 + Math.random() * 0.5), 50, 12);
        if (++n > 7) clearInterval(iv);
      }, 420);

      btnNo.style.display = 'none';
      over.hidden = false;
      document.body.classList.add('no-scroll');
      requestAnimationFrame(() => over.classList.add('in'));
    });

    $('#yesClose').addEventListener('click', () => {
      over.classList.remove('in');
      document.body.classList.remove('no-scroll');
      setTimeout(() => {
        over.hidden = true;
        $('#finale').scrollIntoView({ behavior: 'smooth' });
      }, 700);
    });
  }

  /* =========================================================
     8b. PANDAS — tap one and it jumps and says something
  ========================================================= */
  function wirePanda(wrapSelector, bubbleSelector, lines) {
    const wrap   = $(wrapSelector);
    const bubble = bubbleSelector ? $(bubbleSelector) : null;
    if (!wrap) return;

    let i = Math.floor(Math.random() * lines.length);
    let hideTimer = null;

    wrap.addEventListener('click', () => {
      wrap.classList.remove('is-happy');
      void wrap.offsetWidth;
      wrap.classList.add('is-happy');

      const r = wrap.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height * 0.3, 22, 7);

      if (bubble) {
        bubble.textContent = lines[i % lines.length];
        i++;
        bubble.classList.add('show');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => bubble.classList.remove('show'), 3200);
      }
    });
  }

  function buildPandas() {
    wirePanda('#gatePanda',       '#gatePandaSay', C.panda.gateSays);
    wirePanda('#heroPanda',       '#heroPandaSay', C.panda.heroSays);
    wirePanda('.birthday__panda', '#cakePandaSay', C.panda.cakeSays);

    // A panda rolls across the bottom of the screen now and then.
    const roller = $('#roller');
    if (roller && !FX.reduced) {
      const send = () => {
        roller.classList.remove('go');
        void roller.offsetWidth;
        roller.classList.add('go');
      };
      setTimeout(function again() {
        if (document.body.classList.contains('is-open')) send();
        // somewhere between 40s and 80s later, do it again
        setTimeout(again, 40000 + Math.random() * 40000);
      }, 14000);
    }
  }

  /* =========================================================
     8c. THE JOURNEY — hills parallax + dawn → day → dusk → night
     One scroll handler drives the whole world.
  ========================================================= */
  function startJourney() {
    const ridges = [
      { el: $('.ridge--far'),  k: 0.020 },
      { el: $('.ridge--mid'),  k: 0.045 },
      { el: $('.ridge--near'), k: 0.075 },
    ].filter((l) => l.el);

    const skies = [$('#skyDawn'), $('#skyDay'), $('#skyDusk'), $('#skyNight')];
    const STOPS = [0, 0.36, 0.70, 0.94];   // where each sky peaks
    const sun = $('#sun'), moon = $('#moon');
    const stars = $('#stars'), flies = $('#fireflies');
    const shooting = $('#shooting'), nightfall = $('#nightfall');

    /* --- populate stars + fireflies once --- */
    if (stars) {
      for (let i = 0; i < 90; i++) {
        const s = document.createElement('i');
        const size = 1 + Math.random() * 2.2;
        s.style.cssText =
          `left:${Math.random() * 100}%;top:${Math.random() * 62}%;` +
          `width:${size}px;height:${size}px;--tw:${(2 + Math.random() * 3).toFixed(1)}s;` +
          `animation-delay:${(-Math.random() * 4).toFixed(1)}s`;
        stars.appendChild(s);
      }
    }
    if (flies) {
      for (let i = 0; i < (FX.coarse ? 14 : 26); i++) {
        const f = document.createElement('i');
        f.style.cssText =
          `left:${Math.random() * 100}%;top:${52 + Math.random() * 44}%;` +
          `--fl:${(10 + Math.random() * 12).toFixed(1)}s;` +
          `animation-delay:${(-Math.random() * 14).toFixed(1)}s,${(-Math.random() * 3).toFixed(1)}s`;
        flies.appendChild(f);
      }
    }

    /** Triangular blend: 1 at its own stop, 0 at the neighbours'. */
    function weight(i, p) {
      const here = STOPS[i];
      const prev = i > 0 ? STOPS[i - 1] : STOPS[0] - 0.3;
      const next = i < STOPS.length - 1 ? STOPS[i + 1] : STOPS[STOPS.length - 1] + 0.3;
      if (p <= prev || p >= next) return 0;
      return p < here ? (p - prev) / (here - prev) : 1 - (p - here) / (next - here);
    }

    let night = 0;
    let ticking = false;

    function update() {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      ridges.forEach((l) => { l.el.style.transform = `translateY(${y * l.k}px)`; });

      // Cross-fade the skies. Dawn holds at full until the first stop.
      skies.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === 0 && p <= STOPS[0] ? 1 : weight(i, p).toFixed(3);
      });

      night = p >= STOPS[3] ? 1 : weight(3, p);
      // the night sky itself must reach full black, not the blend's 0.8
      if (skies[3]) skies[3].style.opacity = night.toFixed(3);

      const day = 1 - night;
      if (stars)     stars.style.opacity     = night.toFixed(3);
      if (flies)     flies.style.opacity     = night.toFixed(3);
      if (shooting)  shooting.style.opacity  = night.toFixed(3);
      if (nightfall) nightfall.style.opacity = (night * 0.85).toFixed(3);

      // Sun arcs across and sets; the moon rises behind it.
      const arc = (t, el, fade) => {
        if (!el) return;
        const x = (0.08 + t * 0.84) * window.innerWidth;
        const yy = (0.52 - Math.sin(t * Math.PI) * 0.42) * window.innerHeight;
        el.style.transform = `translate(${x}px, ${yy}px) translate(-50%,-50%)`;
        el.style.opacity = fade.toFixed(3);
      };
      arc(Math.min(1, p / 0.82), sun, Math.max(0, day * 1.15 - 0.15));
      arc(Math.max(0, (p - 0.5) / 0.5), moon, night);

      document.documentElement.classList.toggle('is-night', night > 0.45);
    }

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    /* --- the occasional shooting star, once it's dark --- */
    if (shooting && !FX.reduced) {
      setInterval(() => {
        if (night < 0.5) return;
        const s = document.createElement('i');
        s.style.left = (Math.random() * 40) + '%';
        s.style.top  = (Math.random() * 34) + '%';
        shooting.appendChild(s);
        requestAnimationFrame(() => s.classList.add('go'));
        setTimeout(() => s.remove(), 1700);
      }, 5200);
    }
  }

  /* =========================================================
     8d. HEART BALLOONS — tap anywhere on the page
  ========================================================= */
  function startBalloons() {
    if (FX.reduced) return;
    const COLORS = ['#e0709b', '#f6a8c2', '#e5a545', '#7fae6f', '#c04a78'];
    let last = 0;

    function release(x, y) {
      const now = performance.now();
      if (now - last < 180) return;   // don't carpet the screen
      last = now;

      const size = 24 + Math.random() * 18;
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = x + 'px';
      b.style.top = y + 'px';
      b.style.width = size + 'px';
      b.style.height = size * 1.1 + 'px';
      b.style.animationDuration = (3 + Math.random() * 1.6) + 's';
      b.innerHTML =
        '<svg viewBox="0 0 32 29"><path fill="' +
        COLORS[(Math.random() * COLORS.length) | 0] +
        '" d="M16 29S1 19.5 1 9.9A8.9 8.9 0 0 1 16 4a8.9 8.9 0 0 1 15 5.9C31 19.5 16 29 16 29z"/></svg>';
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 5200);
    }

    window.addEventListener('pointerdown', (e) => {
      // let real controls do their own thing
      if (e.target.closest('button, a, input, .flip, .polaroid, .pandaCard, .candle')) return;
      if (!document.body.classList.contains('is-open')) return;
      release(e.clientX, e.clientY);
    });
  }

  /* =========================================================
     9. NAV DOTS · PROGRESS · SCROLL SPY
  ========================================================= */
  function buildNav() {
    const host = $('#dots');
    C.nav.forEach((item) => {
      const a = document.createElement('a');
      a.href = '#' + item.id;
      a.dataset.label = item.label;
      a.dataset.target = item.id;
      a.setAttribute('aria-label', item.label);
      host.appendChild(a);
    });

    const links = $$('a', host);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('active', l.dataset.target === e.target.id));
      });
    }, { threshold: 0.35, rootMargin: '-20% 0px -40% 0px' });

    C.nav.forEach((item) => {
      const sec = document.getElementById(item.id);
      if (sec) spy.observe(sec);
    });

    const bar = $('#progressBar');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        ticking = false;
      });
    }, { passive: true });
  }

  /* =========================================================
     10. MUSIC
  ========================================================= */
  const music = (() => {
    const audio = $('#audio');
    const btn   = $('#musicBtn');
    let ready = false;

    audio.preload = 'metadata';
    audio.volume = 0;
    audio.src = C.music.src;

    audio.addEventListener('canplaythrough', () => { ready = true; btn.hidden = false; }, { once: true });
    audio.addEventListener('loadedmetadata', () => { ready = true; btn.hidden = false; }, { once: true });
    audio.addEventListener('error', () => { ready = false; btn.hidden = true; });

    function fadeTo(target, ms = 1200) {
      const start = audio.volume;
      const t0 = performance.now();
      (function step(t) {
        const k = Math.min(1, (t - t0) / ms);
        audio.volume = start + (target - start) * k;
        if (k < 1) requestAnimationFrame(step);
        else if (target === 0) audio.pause();
      })(t0);
    }

    function play() {
      if (!ready) return;
      audio.play().then(() => {
        btn.setAttribute('aria-pressed', 'true');
        fadeTo(0.45);
      }).catch(() => { /* browser blocked it — she can tap the button */ });
    }
    function pause() {
      btn.setAttribute('aria-pressed', 'false');
      fadeTo(0, 600);
    }

    btn.addEventListener('click', () => {
      if (audio.paused) play(); else pause();
    });

    return { play };
  })();

  /* =========================================================
     11. THE GATE
     Stage 1 countdown → Stage 2 password → doors open
  ========================================================= */
  function initGate() {
    const gate    = $('#gate');
    const waiting = $('#gateWaiting');
    const pass    = $('#gatePass');
    const form    = $('#lockForm');
    const input   = $('#lockInput');
    const error   = $('#lockError');
    const heart   = FX.traceHeart($('#gateHeart'));

    /* ---- Stage 3: the doors ---- */
    function openGate() {
      heart.flare();
      FX.burst(window.innerWidth / 2, window.innerHeight / 2, 90, 13);
      gate.classList.add('is-unlocking');

      setTimeout(() => {
        gate.classList.add('is-open');
        document.body.classList.remove('is-locked');
        document.body.classList.add('is-open');
        music.play();
        watchReveals();
        FX.rain(90);
      }, 850);

      setTimeout(() => gate.remove(), 2600);
    }

    /* ---- Stage 2: the password ---- */
    function showPassword() {
      waiting.classList.remove('is-active');
      setTimeout(() => {
        pass.classList.add('is-active');
        setTimeout(() => input.focus(), 500);
      }, 700);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value.trim().toLowerCase();
      if (C.lock.passwords.map((p) => p.toLowerCase()).includes(value)) {
        error.classList.remove('show');
        openGate();
      } else {
        error.textContent = C.lock.wrongMessage;
        error.classList.add('show');
        gate.classList.add('shake');
        setTimeout(() => gate.classList.remove('shake'), 500);
        input.select();
      }
    });

    /* ---- Preview: straight through, no waiting ---- */
    if (SKIP) {
      gate.remove();
      document.body.classList.remove('is-locked');
      document.body.classList.add('is-open');
      watchReveals();
      return;
    }

    /* ---- Stage 1: the countdown ---- */
    $('#gwEyebrow').textContent = C.gate.eyebrow;
    $('#gwTitle').textContent   = C.gate.title;
    $('#gwHint').textContent    = C.gate.hint;

    // Already her birthday? The panda is up, go straight to the password.
    if (gateMoment().getTime() <= Date.now()) {
      $('#gatePanda').classList.add('is-awake');
      showPassword();
      return;
    }

    driveClock(
      { d: $('#gwD'), h: $('#gwH'), m: $('#gwM'), s: $('#gwS') },
      gateMoment,
      () => {
        // The moment it hits zero — the panda wakes up
        heart.flare();
        FX.rain(140);
        $('#gatePanda').classList.add('is-awake');
        $('#gwEyebrow').textContent = C.gate.openedEyebrow;
        $('#gwTitle').textContent   = C.gate.openedTitle;
        $('#gateClock').style.display = 'none';
        $('#gwHint').textContent = C.gate.wokeHint || '';
        setTimeout(showPassword, 2600);
      }
    );
  }

  /* =========================================================
     BOOT
  ========================================================= */
  function boot() {
    FX.startPetals($('#petals'));
    FX.initConfetti($('#confetti'));
    FX.startCursor($('#trail'));

    fillText();
    buildHero();
    buildChapters();
    buildGallery();
    buildPandaGallery();
    buildReasons();
    buildCake();
    buildProposal();
    buildPandas();
    buildNav();
    startCountdown();
    startJourney();
    startBalloons();

    initGate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
