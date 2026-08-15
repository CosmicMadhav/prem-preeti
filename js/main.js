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
  function startTogether() {
    const T = C.together;
    const sec = $('#together');
    const m = T && String(T.since || '').match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2}))?/);

    // No date set yet? The section stays hidden — nothing broken shows.
    if (!m) return;

    const start = new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), 0, 0);
    if (isNaN(start) || start.getTime() > Date.now()) return;

    sec.hidden = false;
    $('#tgEyebrow').textContent = T.eyebrow;
    $('#tgTitle').textContent   = T.title;
    $('#tgMessage').textContent = T.message;
    const U = T.units || {};
    $('#tgYL').textContent = U.years   || 'years';
    $('#tgDL').textContent = U.days    || 'days';
    $('#tgHL').textContent = U.hours   || 'hours';
    $('#tgML').textContent = U.minutes || 'minutes';

    const els = { y: $('#tgY'), d: $('#tgD'), h: $('#tgH'), m: $('#tgM') };
    const prev = {};

    function set(key, value) {
      const str = String(value).padStart(2, '0');
      if (prev[key] === str) return;
      prev[key] = str;
      els[key].textContent = str;
      els[key].classList.remove('tick');
      void els[key].offsetWidth;
      els[key].classList.add('tick');
    }

    function tick() {
      const now = new Date();
      // whole years first, so "days" reads as days-since-the-anniversary
      let years = now.getFullYear() - start.getFullYear();
      const anniv = new Date(start);
      anniv.setFullYear(start.getFullYear() + years);
      if (anniv > now) { years--; anniv.setFullYear(anniv.getFullYear() - 1); }

      const rest = now - anniv;
      set('y', years);
      set('d', Math.floor(rest / 86400000));
      set('h', Math.floor(rest / 3600000) % 24);
      set('m', Math.floor(rest / 60000) % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* =========================================================
     3b. MEMORY GAME — find the panda pairs
  ========================================================= */
  function buildGame() {
    const G = C.game;
    const pics = ((C.pandaGallery && C.pandaGallery.items) || []).slice(0, 6);
    if (!G || pics.length < 2) { $('#game').hidden = true; return; }

    $('#gmEyebrow').textContent    = G.eyebrow;
    $('#gmTitle').textContent      = G.title;
    $('#gmSubtitle').textContent   = G.subtitle;
    $('#gmMovesLabel').textContent = G.movesLabel || 'moves';
    $('#gmWonTitle').textContent   = G.wonTitle;
    $('#gmWonMsg').textContent     = G.wonMessage;
    $('#gmRestart').textContent    = G.restart || 'Again';

    const board = $('#board');
    const won   = $('#gameWon');
    const moves = $('#gmMoves');
    let first = null, busy = false, matched = 0, count = 0;

    function deal() {
      board.innerHTML = '';
      won.hidden = true;
      first = null; busy = false; matched = 0; count = 0;
      moves.textContent = '0';

      const deck = pics.concat(pics)
        .map((p) => ({ p, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((x) => x.p);

      deck.forEach((pic) => {
        const t = document.createElement('button');
        t.type = 'button';
        t.className = 'tile';
        t.setAttribute('aria-label', 'Card');
        t.innerHTML =
          '<span class="tile__inner">' +
            '<span class="tile__face tile__back">🐼</span>' +
            '<span class="tile__face tile__front"></span>' +
          '</span>';
        mountImage($('.tile__front', t), pic.src, '');
        t.dataset.key = pic.src;
        t.addEventListener('click', () => flip(t));
        board.appendChild(t);
      });
    }

    function flip(t) {
      if (busy || t.classList.contains('is-up') || t.classList.contains('is-done')) return;
      t.classList.add('is-up');

      if (!first) { first = t; return; }

      count++;
      moves.textContent = String(count);

      if (first.dataset.key === t.dataset.key) {
        first.classList.add('is-done');
        t.classList.add('is-done');
        const r = t.getBoundingClientRect();
        FX.burst(r.left + r.width / 2, r.top + r.height / 2, 18, 6);
        first = null;
        matched++;
        if (matched === pics.length) {
          setTimeout(() => {
            FX.rain(140);
            won.hidden = false;
            won.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      } else {
        busy = true;
        const a = first;
        first = null;
        setTimeout(() => {
          a.classList.remove('is-up');
          t.classList.remove('is-up');
          busy = false;
        }, 800);
      }
    }

    $('#gmRestart').addEventListener('click', deal);
    deal();
  }

  /* =========================================================
     3c. OPEN WHEN… — sealed notes for later
  ========================================================= */
  function buildOpenWhen() {
    const O = C.openWhen;
    if (!O || !O.letters || !O.letters.length) { $('#openwhen').hidden = true; return; }

    $('#owEyebrow').textContent  = O.eyebrow;
    $('#owTitle').textContent    = O.title;
    $('#owSubtitle').textContent = O.subtitle;

    const host = $('#envelopes');
    O.letters.forEach((L) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'env reveal';
      b.setAttribute('aria-expanded', 'false');
      b.innerHTML =
        '<span class="env__body">' +
          '<span class="env__flap"></span>' +
          '<span class="env__seal">P</span>' +
          '<span class="env__when"></span>' +
          '<span class="env__note"></span>' +
          '<span class="env__hint"></span>' +
        '</span>';
      $('.env__when', b).textContent = L.when;
      $('.env__note', b).textContent = L.note;
      $('.env__hint', b).textContent = O.hint || 'tap to open';
      b.setAttribute('aria-label', 'Open when ' + L.when);

      b.addEventListener('click', () => {
        const open = b.classList.toggle('is-open');
        b.setAttribute('aria-expanded', String(open));
        if (open) {
          const r = b.getBoundingClientRect();
          FX.burst(r.left + r.width / 2, r.top + 40, 16, 6);
        }
      });
      host.appendChild(b);
    });
  }

  /* =========================================================
     3c-i. A little toast, bottom of the screen
  ========================================================= */
  let toastTimer = null;
  function toast(text, ms) {
    const el = $('#toast');
    if (!el || !text) return;
    el.textContent = text;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => { el.hidden = true; }, 450);
    }, ms || 4200);
  }

  /* =========================================================
     3c-ii. OUR PLACES — the map
  ========================================================= */
  function buildMap() {
    const M = C.map;
    const places = (M && M.places || []).filter((p) => isFinite(p.lat) && isFinite(p.lng));
    if (!M || !places.length) { $('#ourmap').hidden = true; return; }

    $('#mpEyebrow').textContent  = M.eyebrow;
    $('#mpTitle').textContent    = M.title;
    $('#mpSubtitle').textContent = M.subtitle;

    // Leaflet missing (offline, blocked)? Say so instead of showing a grey box.
    if (typeof L === 'undefined') {
      const off = $('#atlasOffline');
      off.textContent = M.offline || 'The map needs internet to load.';
      off.hidden = false;
      $('#atlasToggle').hidden = true;
      return;
    }

    const SAT = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19, attribution: 'Imagery &copy; Esri' });
    const STREETS = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' });

    let satellite = M.style !== 'streets';

    const map = L.map('atlasMap', {
      zoomControl: true,
      scrollWheelZoom: false,   // don't hijack the page scroll
      layers: [satellite ? SAT : STREETS],
    });

    // Frame all the pins, whatever the coordinates are
    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
    if (places.length === 1) map.setView([places[0].lat, places[0].lng], M.zoom || 14);
    else map.fitBounds(bounds, { padding: [50, 50], maxZoom: M.zoom || 14 });

    places.forEach((place) => {
      const icon = L.divIcon({
        className: 'mapPin',
        html: '<div class="mapPin__body"><span class="mapPin__pulse"></span></div>',
        iconSize: [30, 38],
        iconAnchor: [15, 38],
        popupAnchor: [0, -34],
      });
      const marker = L.marker([place.lat, place.lng], { icon, title: place.name }).addTo(map);
      marker.bindPopup(
        '<b class="pin__name">' + esc(place.name) + '</b>' +
        '<span class="pin__note">' + esc(place.note || '') + '</span>',
        { maxWidth: 260, closeButton: true }
      );
      marker.on('popupopen', () => {
        const el = marker.getElement();
        if (!el) return;
        const r = el.getBoundingClientRect();
        FX.burst(r.left + r.width / 2, r.top, 14, 5);
      });
    });

    /* --- streets / satellite toggle --- */
    const toggle = $('#atlasToggle');
    function labelToggle() {
      toggle.textContent = satellite
        ? (M.streetsLabel || 'Street map')
        : (M.satelliteLabel || 'Satellite');
    }
    labelToggle();
    toggle.addEventListener('click', () => {
      map.removeLayer(satellite ? SAT : STREETS);
      satellite = !satellite;
      map.addLayer(satellite ? SAT : STREETS);
      labelToggle();
    });

    // Leaflet needs a nudge if it was laid out while hidden
    new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        map.invalidateSize();
        obs.disconnect();
      });
    }, { threshold: 0.15 }).observe($('#atlas'));
    window.addEventListener('resize', () => map.invalidateSize(), { passive: true });
  }

  /** Escape text going into a popup's HTML. */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* =========================================================
     3c-iii. THE QUIZ
  ========================================================= */
  function buildQuiz() {
    const Q = C.quiz;
    if (!Q || !Q.questions || !Q.questions.length) { $('#quiz').hidden = true; return; }

    $('#qzEyebrow').textContent    = Q.eyebrow;
    $('#qzTitle').textContent      = Q.title;
    $('#qzSubtitle').textContent   = Q.subtitle;
    $('#qzScoreLabel').textContent = Q.scoreLabel || 'right';

    const host = $('#quizList');
    let right = 0, answered = 0;

    Q.questions.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'qz reveal';
      card.innerHTML = '<p class="qz__q"></p><div class="qz__opts"></div><p class="qz__reply"></p>';
      $('.qz__q', card).textContent     = item.q;
      $('.qz__reply', card).textContent = item.reply || '';

      const opts = $('.qz__opts', card);
      item.options.forEach((label, oi) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'qz__opt';
        b.textContent = label;
        b.addEventListener('click', () => {
          if (card.classList.contains('is-answered')) return;
          card.classList.add('is-answered');

          $$('.qz__opt', card).forEach((o, i) => {
            if (i === item.answer) o.classList.add('is-right');
            else if (i === oi) o.classList.add('is-wrong');
          });

          answered++;
          if (oi === item.answer) {
            right++;
            $('#qzScore').textContent = String(right);
            const r = b.getBoundingClientRect();
            FX.burst(r.left + r.width / 2, r.top + r.height / 2, 16, 6);
          }
          if (answered === Q.questions.length && Q.done) {
            const d = $('#qzDone');
            d.textContent = Q.done;
            d.hidden = false;
            FX.rain(90);
          }
        });
        opts.appendChild(b);
      });
      host.appendChild(card);
    });
  }

  /* =========================================================
     3c-iv. TIME CAPSULE — sealed until a date
  ========================================================= */
  function buildCapsule() {
    const T = C.timeCapsule;
    const m = T && String(T.openOn || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return;                         // no date set — section stays hidden

    const open = new Date(+m[1], +m[2] - 1, +m[3], 0, 0, 0, 0);
    const sec  = $('#capsule');
    const box  = $('#capsuleBox');
    sec.hidden = false;

    $('#tcEyebrow').textContent = T.eyebrow;
    $('#tcNote').textContent    = T.note;

    const ready = open.getTime() <= Date.now();

    if (!ready) {
      $('#tcTitle').textContent = T.lockedTitle;
      $('#tcHint').textContent  = T.lockedHint;
      const days = Math.ceil((open - Date.now()) / 86400000);
      $('#tcTimer').innerHTML =
        (T.unlocksIn || 'opens in') + ' <b>' + days + '</b> ' + (T.dayWord || 'days');
      return;
    }

    // The day has come.
    $('#tcTitle').textContent = T.openTitle;
    $('#tcHint').textContent  = '';
    $('#tcTimer').textContent = '';
    $('#tcLock').textContent  = '🤍';
    const btn = $('#tcBtn');
    btn.textContent = T.button || 'Open it';
    btn.hidden = false;
    btn.addEventListener('click', () => {
      box.classList.add('is-open');
      btn.hidden = true;
      FX.rain(140);
      const r = box.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + 60, 80, 12);
    });
  }

  /* =========================================================
     3d. SCRATCH TO REVEAL
  ========================================================= */
  function buildScratch() {
    const S = C.scratch;
    const card = $('#scratchCard');
    const canvas = $('#scFoil');
    if (!S || !card) return;

    $('#scEyebrow').textContent = S.eyebrow;
    $('#scTitle').textContent   = S.title;
    $('#scSecret').textContent  = S.secret;
    $('#scHint').textContent    = S.hint || 'scratch it';

    const ctx = canvas.getContext('2d');
    let dpr = 1, painted = false, done = false;

    function paint() {
      const w = card.clientWidth, h = card.clientHeight;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#9fc39a');
      g.addColorStop(0.5, '#7fae6f');
      g.addColorStop(1, '#5d8f77');
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // a few bamboo leaves printed on the foil
      ctx.fillStyle = 'rgba(255,255,255,.16)';
      for (let i = 0; i < 26; i++) {
        const x = Math.random() * w, y = Math.random() * h, r = 8 + Math.random() * 12;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI);
        ctx.beginPath();
        ctx.moveTo(-r * 1.7, 0);
        ctx.quadraticCurveTo(0, -r * 0.6, r * 1.7, 0);
        ctx.quadraticCurveTo(0, r * 0.6, -r * 1.7, 0);
        ctx.fill();
        ctx.restore();
      }
      painted = true;
    }

    function scratchAt(e) {
      if (done) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      check();
    }

    let lastCheck = 0;
    function check(force) {
      if (done) return;
      const now = performance.now();
      if (!force && now - lastCheck < 240) return;
      lastCheck = now;

      // sample a coarse grid rather than every pixel
      const step = 8 * dpr;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0, total = 0;
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          total++;
          if (data[(y * canvas.width + x) * 4 + 3] < 40) clear++;
        }
      }
      if (total && clear / total > 0.48) {
        done = true;
        card.classList.add('is-done');
        const b = card.getBoundingClientRect();
        FX.burst(b.left + b.width / 2, b.top + b.height / 2, 70, 11);
        const doneEl = $('#scDone');
        if (S.done) { doneEl.textContent = S.done; doneEl.hidden = false; }
      }
    }

    let drawing = false;
    canvas.addEventListener('pointerdown', (e) => {
      drawing = true;
      canvas.setPointerCapture(e.pointerId);
      scratchAt(e);
    });
    canvas.addEventListener('pointermove', (e) => { if (drawing) scratchAt(e); });
    // check once more when she lifts her finger — the throttle above can
    // otherwise swallow the stroke that actually crosses the threshold
    canvas.addEventListener('pointerup',     () => { drawing = false; check(true); });
    canvas.addEventListener('pointercancel', () => { drawing = false; check(true); });

    // Paint once it's actually on screen and has a size
    new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !painted) { paint(); obs.disconnect(); }
      });
    }, { threshold: 0.2 }).observe(card);
    window.addEventListener('resize', () => { if (painted && !done) paint(); }, { passive: true });
  }

  /* =========================================================
     3e. REPLY BUTTON
  ========================================================= */
  function buildReply() {
    const R = C.reply;
    const btn = $('#replyBtn');
    if (!R || !btn) return;
    const num = String(R.whatsapp || '').replace(/\D/g, '');
    if (!num) return;                       // no number set — stays hidden
    btn.href = 'https://wa.me/' + num + '?text=' + encodeURIComponent(R.message || '');
    btn.textContent = R.label || 'Reply';
    btn.hidden = false;
  }

  /* =========================================================
     3f. YOUR VOICE — appears only once the mp3 exists
  ========================================================= */
  function buildVoice() {
    const V = C.voice;
    const btn = $('#voiceBtn');
    const audio = $('#voiceAudio');
    if (!V || !V.src || !btn) return;

    const label = $('#voiceLabel');
    const cap = $('#voiceCap');
    label.textContent = V.label || 'Hear me say it';

    audio.preload = 'metadata';
    audio.src = V.src;
    audio.addEventListener('loadedmetadata', () => {
      btn.hidden = false;
      if (V.caption) { cap.textContent = V.caption; cap.hidden = false; }
    }, { once: true });
    audio.addEventListener('error', () => { btn.hidden = true; cap.hidden = true; });

    audio.addEventListener('ended', () => {
      btn.classList.remove('is-playing');
      label.textContent = V.label || 'Hear me say it';
    });

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(() => {
          btn.classList.add('is-playing');
          label.textContent = V.playing || 'Playing…';
        }).catch(() => {});
      } else {
        audio.pause();
        btn.classList.remove('is-playing');
        label.textContent = V.label || 'Hear me say it';
      }
    });
  }

  /* =========================================================
     3g. PRINT THE LETTER
  ========================================================= */
  function buildPrint() {
    const P = C.print;
    const btn = $('#printBtn');
    if (!P || P.enabled === false || !btn) return;
    btn.textContent = P.label || 'Print this letter';
    btn.hidden = false;
    btn.addEventListener('click', () => window.print());
  }

  /* =========================================================
     3h. TIME-OF-DAY GREETING
  ========================================================= */
  function buildGreeting() {
    const G = C.greeting;
    const el = $('#heroHello');
    if (!G || G.enabled === false || !el) return;
    const h = new Date().getHours();
    el.textContent =
      h < 5  ? (G.night     || '') :
      h < 12 ? (G.morning   || '') :
      h < 17 ? (G.afternoon || '') :
      h < 22 ? (G.evening   || '') : (G.night || '');
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
      media.className = 'chapter__media reveal' + (ch.wide ? ' is-wide' : '');
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
     5a-ii. THE REEL — videos, one after another, on a loop
  ========================================================= */
  function buildReel() {
    const R = C.reel;
    const clips = (R && R.videos || []).filter((v) => v && v.src);
    const sec = $('#reel');
    if (!R || !clips.length) { if (sec) sec.hidden = true; return; }

    $('#rlEyebrow').textContent  = R.eyebrow;
    $('#rlTitle').textContent    = R.title;
    $('#rlSubtitle').textContent = R.subtitle;

    const stage = $('#reelStage');
    const video = $('#reelVideo');
    const cap   = $('#reelCap');
    const bar   = $('#reelBar');
    const sound = $('#reelSound');
    const dotsHost = $('#reelDots');

    let i = 0;
    let visible = false;
    let unmuted = false;

    /* --- the little dots underneath --- */
    const dots = clips.map((_, n) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('aria-label', 'Clip ' + (n + 1));
      d.addEventListener('click', () => show(n));
      dotsHost.appendChild(d);
      return d;
    });
    function markDots() {
      dots.forEach((d, n) => d.classList.toggle('is-on', n === i));
    }

    function show(n) {
      i = (n + clips.length) % clips.length;
      video.classList.remove('is-ready');
      video.src = clips[i].src;
      video.load();
      cap.textContent = clips[i].caption || '';
      bar.style.width = '0%';
      markDots();
      if (visible) {
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
      }
    }

    // match the frame to the video's real shape, whatever it is
    video.addEventListener('loadedmetadata', () => {
      if (video.videoWidth && video.videoHeight) {
        stage.style.setProperty('--ar', video.videoWidth + ' / ' + video.videoHeight);
      }
      video.classList.add('is-ready');
    });

    video.addEventListener('timeupdate', () => {
      if (!video.duration || !isFinite(video.duration)) return;
      bar.style.width = ((video.currentTime / video.duration) * 100).toFixed(1) + '%';
    });

    video.addEventListener('ended', () => show(i + 1));
    // a broken file shouldn't stall the whole reel
    video.addEventListener('error', () => { if (clips.length > 1) setTimeout(() => show(i + 1), 600); });

    /* --- sound: unmuting pauses the songs, muting brings them back --- */
    function labelSound() {
      sound.textContent = unmuted ? (R.soundOn || 'Sound on') : (R.soundOff || 'Sound off');
    }
    function toggleSound() {
      unmuted = !unmuted;
      video.muted = !unmuted;
      if (unmuted) music.duck(true); else music.duck(false);
      labelSound();
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    }
    labelSound();
    sound.addEventListener('click', (e) => { e.stopPropagation(); toggleSound(); });
    $('#reelTap').addEventListener('click', toggleSound);

    /* --- only play while she's actually looking at it --- */
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible) {
          const p = video.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          video.pause();
          if (unmuted) { unmuted = false; video.muted = true; music.duck(false); labelSound(); }
        }
      });
    }, { threshold: 0.4 }).observe(stage);

    show(0);
  }

  /* =========================================================
     5b. THE REAL PANDAS
  ========================================================= */
  function buildPandaGallery() {
    const G = C.pandaGallery;
    if (!G) return;
    $('#pgEyebrow').textContent  = G.eyebrow;
    $('#pgTitle').textContent    = G.title;
    $('#pgSubtitle').textContent = G.subtitle;

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

    /* --- the easter egg: keep tapping the sleeping panda --- */
    const E = C.easterEgg;
    const gatePanda = $('#gatePanda');
    if (E && E.message && gatePanda) {
      const need = E.taps || 7;
      let taps = 0;
      gatePanda.addEventListener('click', () => {
        if (++taps !== need) return;
        toast(E.message, 7000);
        FX.rain(120);
        FX.burst(window.innerWidth / 2, window.innerHeight / 2, 90, 12);
      });
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
     8c-bis. HER NAME IN THE STARS
     Each letter is a set of polylines on a 60x100 grid. Stars
     sit on the vertices; the lines draw themselves once the
     sky is dark.
  ========================================================= */
  const GLYPHS = {
    A: [[[0,100],[30,0],[60,100]], [[12,62],[48,62]]],
    B: [[[0,100],[0,0],[40,0],[47,25],[40,50],[0,50]], [[40,50],[50,75],[40,100],[0,100]]],
    C: [[[55,15],[30,0],[5,28],[5,72],[30,100],[55,85]]],
    D: [[[0,100],[0,0],[34,10],[50,50],[34,90],[0,100]]],
    E: [[[55,0],[0,0],[0,100],[55,100]], [[0,50],[38,50]]],
    F: [[[55,0],[0,0],[0,100]], [[0,50],[38,50]]],
    G: [[[55,15],[30,0],[5,28],[5,72],[30,100],[55,85],[55,56],[32,56]]],
    H: [[[0,0],[0,100]], [[52,0],[52,100]], [[0,52],[52,52]]],
    I: [[[10,0],[50,0]], [[30,0],[30,100]], [[10,100],[50,100]]],
    J: [[[46,0],[46,78],[26,100],[5,86]]],
    K: [[[0,0],[0,100]], [[50,0],[0,55],[52,100]]],
    L: [[[0,0],[0,100],[52,100]]],
    M: [[[0,100],[0,0],[29,56],[58,0],[58,100]]],
    N: [[[0,100],[0,0],[52,100],[52,0]]],
    O: [[[28,0],[5,28],[5,72],[28,100],[52,72],[52,28],[28,0]]],
    P: [[[0,100],[0,0],[40,0],[47,25],[40,50],[0,50]]],
    Q: [[[28,0],[5,28],[5,72],[28,100],[52,72],[52,28],[28,0]], [[34,74],[58,106]]],
    R: [[[0,100],[0,0],[40,0],[47,25],[40,50],[0,50]], [[22,50],[52,100]]],
    S: [[[52,15],[26,0],[6,22],[26,46],[46,62],[30,100],[4,86]]],
    T: [[[0,0],[60,0]], [[30,0],[30,100]]],
    U: [[[0,0],[0,72],[26,100],[52,72],[52,0]]],
    V: [[[0,0],[28,100],[56,0]]],
    W: [[[0,0],[14,100],[30,42],[46,100],[60,0]]],
    X: [[[0,0],[52,100]], [[52,0],[0,100]]],
    Y: [[[0,0],[28,52],[56,0]], [[28,52],[28,100]]],
    Z: [[[0,0],[55,0],[0,100],[55,100]]],
  };

  function buildConstellation() {
    const K = C.constellation;
    const host = $('#constellation');
    const svg  = $('#constSvg');
    if (!K || K.enabled === false || !host || !svg) { if (host) host.remove(); return; }

    const word = String(K.word || C.her.name || '').toUpperCase().replace(/[^A-Z]/g, '');
    const letters = word.split('').filter((ch) => GLYPHS[ch]);
    if (!letters.length) { host.remove(); return; }

    const LW = 60, GAP = 34, H = 100;
    const totalW = letters.length * LW + (letters.length - 1) * GAP;
    svg.setAttribute('viewBox', `-6 -10 ${totalW + 12} ${H + 20}`);

    const NS = 'http://www.w3.org/2000/svg';
    const seen = new Set();
    let order = 0;

    letters.forEach((ch, li) => {
      const dx = li * (LW + GAP);

      GLYPHS[ch].forEach((stroke) => {
        // a little hand-drawn wobble so it reads as stars, not a font
        const pts = stroke.map(([x, y]) => [
          dx + x + (Math.random() - 0.5) * 3.2,
          y + (Math.random() - 0.5) * 3.2,
        ]);

        const line = document.createElementNS(NS, 'polyline');
        line.setAttribute('class', 'constellation__line');
        line.setAttribute('points', pts.map((p) => p.join(',')).join(' '));

        // measure so the draw-on animation covers the exact length
        let len = 0;
        for (let i = 1; i < pts.length; i++) {
          len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
        }
        line.style.setProperty('--len', len.toFixed(1));
        line.style.setProperty('--d', (li * 0.34).toFixed(2) + 's');
        svg.appendChild(line);

        pts.forEach((p) => {
          const key = p[0].toFixed(0) + ':' + p[1].toFixed(0);
          if (seen.has(key)) return;
          seen.add(key);
          const s = document.createElementNS(NS, 'circle');
          s.setAttribute('class', 'constellation__star');
          s.setAttribute('cx', p[0].toFixed(2));
          s.setAttribute('cy', p[1].toFixed(2));
          s.setAttribute('r', (1.1 + Math.random() * 0.9).toFixed(2));
          s.style.setProperty('--d', (li * 0.34 + Math.random() * 0.5).toFixed(2) + 's');
          svg.appendChild(s);
          order++;
        });
      });
    });

    $('#constCap').textContent = K.caption || '';

    // Light up when she actually arrives at it, then leave it lit.
    new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        host.style.opacity = '1';
        host.classList.add('lit');
        setTimeout(() => {
          const r = host.getBoundingClientRect();
          FX.burst(r.left + r.width / 2, r.top + r.height / 2, 40, 8);
        }, 2400);
        obs.disconnect();
      });
    }, { threshold: 0.35 }).observe(host);
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
        music.sectionChanged(e.target.id);   // swap the soundtrack with the mood
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
    const M = C.music || {};
    const btn = $('#musicBtn');
    const label = $('#musicLabel');
    const tracks = (M.tracks || []).filter((t) => t && t.src);
    if (!tracks.length || !btn) {
      return { play() {}, arm() {}, duck() {}, sectionChanged() {} };
    }

    const VOL  = M.volume != null ? M.volume : 0.42;
    const FADE = (M.fade != null ? M.fade : 2.2) * 1000;

    // "playlist" runs through every song in turn; "sections" ties each
    // song to a part of the page.
    const PLAYLIST = M.mode !== 'sections';

    // section id -> track index (only used in "sections" mode)
    const bySection = {};
    tracks.forEach((t, i) => (t.for || []).forEach((id) => { bySection[id] = i; }));

    // In playlist mode each song should appear once, in order.
    const seen = new Set();
    const queue = PLAYLIST
      ? tracks.filter((t) => (seen.has(t.src) ? false : seen.add(t.src)))
      : tracks;

    // Two players, so one can fade out while the next fades in.
    const players = [new Audio(), new Audio()];
    players.forEach((a) => { a.preload = 'none'; a.loop = false; a.volume = 0; });
    let active = 0;        // which player is currently in front
    let current = -1;      // which track index is playing
    let on = false;        // has she got the music switched on
    let ok = true;         // did the files load

    players[0].addEventListener('error', () => { ok = false; btn.hidden = true; });

    function ramp(audio, to, ms) {
      const from = audio.volume;
      const t0 = performance.now();
      cancelAnimationFrame(audio._raf);
      (function step(t) {
        const k = Math.min(1, (t - t0) / ms);
        audio.volume = Math.max(0, Math.min(1, from + (to - from) * k));
        if (k < 1) audio._raf = requestAnimationFrame(step);
        else if (to === 0) audio.pause();
      })(t0);
    }

    /** Bring track `i` in, fading whatever is playing out.
     *  Returns the play() promise so callers can spot a blocked autoplay. */
    // Seconds each song gets per turn (0 = play the whole thing).
    const SEGMENT = M.segment > 0 ? M.segment : 0;

    // Where each song should pick up next time its turn comes round.
    // Starts at its startAt, then walks forward through the song, so she
    // never hears the same ten seconds twice.
    const offsets = queue.map((t) => t.startAt || 0);
    let curFrom = 0;   // the offset the song now playing started from

    /** Jump to the part of the song worth hearing. Has to wait for the
     *  file's metadata, otherwise the seek is silently ignored. */
    function seekTo(audio, seconds) {
      const go = () => { try { audio.currentTime = seconds || 0; } catch (e) {} };
      if (audio.readyState >= 1) go();
      else audio.addEventListener('loadedmetadata', go, { once: true });
    }

    function crossfadeTo(i) {
      if (!ok || i < 0 || i === current) return null;
      const next = players[1 - active];
      const prev = players[active];

      // Same song either side of a gap? Just keep it playing.
      if (current >= 0 && queue[current].src === queue[i].src) { current = i; return null; }

      // Don't reload if it was already pre-buffered below.
      if (!next.src || !next.src.endsWith(queue[i].src)) next.src = queue[i].src;
      next.volume = 0;
      next._handedOver = false;
      // pick up where this song left off last time round
      const from = SEGMENT ? offsets[i] : (queue[i].startAt || 0);
      curFrom = from;
      if (SEGMENT) offsets[i] = from + SEGMENT;
      seekTo(next, from);
      const started = next.play();

      ramp(next, VOL, FADE);
      if (current >= 0) ramp(prev, 0, FADE);

      active = 1 - active;
      current = i;
      if (label && queue[i].title) label.textContent = queue[i].title;

      // Once the old one has finished fading, quietly load the song after
      // this, so the next hand-over doesn't stutter on a slow connection.
      if (PLAYLIST && queue.length > 1) {
        setTimeout(() => {
          const idle = players[1 - active];
          const after = queue[(current + 1) % queue.length];
          if (!idle.src || !idle.src.endsWith(after.src)) {
            idle.src = after.src;
            idle.preload = 'auto';
            idle.load();
          }
        }, FADE + 250);
      }
      return started;
    }

    /* --- playlist mode: hand over before the current one runs out, so
           the two overlap and she never hears a gap --- */
    if (PLAYLIST) {
      const overlap = FADE / 1000 + 0.3;
      const advance = (a) => {
        if (!on || a._handedOver) return;
        a._handedOver = true;

        // If the next slot would run off the end of the song, start it
        // again from its best bit rather than playing silence.
        if (SEGMENT && isFinite(a.duration) &&
            offsets[current] + SEGMENT > a.duration - 1) {
          offsets[current] = queue[current].startAt || 0;
        }
        crossfadeTo((current + 1) % queue.length);
      };
      players.forEach((a) => {
        a.addEventListener('timeupdate', () => {
          if (!a.duration || !isFinite(a.duration)) return;
          // whichever comes first: the end of its slot, or the end of the song
          let cut = a.duration - overlap;
          if (SEGMENT) cut = Math.min(cut, curFrom + SEGMENT - overlap);
          if (a.currentTime >= cut) advance(a);
        });
        a.addEventListener('ended', () => advance(a));
      });
    }

    function play() {
      btn.hidden = false;
      // carry on from where she muted, rather than starting over
      const want = wanted >= 0 ? wanted : Math.max(0, resumeAt);
      const started = crossfadeTo(want);

      on = true;
      btn.setAttribute('aria-pressed', 'true');

      // Autoplay blocked? Undo, so the next real tap tries again.
      if (started && started.catch) {
        started.catch(() => {
          on = false;
          current = -1;
          btn.setAttribute('aria-pressed', 'false');
          if (label) label.textContent = M.label || 'music';
        });
      }
    }

    /** Start the music as early as the browser will allow.
     *  Tries immediately (works on repeat visits, where the browser
     *  already trusts the site), and otherwise latches onto her very
     *  first tap, click or keypress — including typing the password. */
    function arm() {
      play();

      const events = ['pointerdown', 'keydown', 'touchstart'];
      function kick() {
        if (on && !players[active].paused) { done(); return; }
        play();
        // give the play promise a moment to settle before unhooking
        setTimeout(() => { if (on && !players[active].paused) done(); }, 300);
      }
      function done() {
        events.forEach((ev) => window.removeEventListener(ev, kick, true));
      }
      events.forEach((ev) => window.addEventListener(ev, kick, true));
    }

    function stop() {
      on = false;
      btn.setAttribute('aria-pressed', 'false');
      if (label) label.textContent = M.label || 'music';
      players.forEach((a) => ramp(a, 0, 700));
      resumeAt = current;
      current = -1;
    }

    let wanted = -1;      // section mode: which track the page wants
    let resumeAt = 0;     // playlist mode: where she left off

    /** Called as she scrolls into a new section.
     *  Ignored in playlist mode — there the songs just run in order. */
    function sectionChanged(id) {
      if (PLAYLIST || !(id in bySection)) return;
      wanted = bySection[id];
      if (on) crossfadeTo(wanted);
    }

    /** Drop the music right down (or bring it back) while a video plays
     *  with its sound on, so the two aren't fighting each other. */
    let ducked = false;
    function duck(quiet) {
      if (quiet === ducked) return;
      ducked = quiet;
      if (!on) return;
      players.forEach((a) => { if (!a.paused) ramp(a, quiet ? 0.04 : VOL, 500); });
    }

    btn.addEventListener('click', () => { if (on) stop(); else play(); });
    btn.hidden = false;

    return { play, arm, duck, sectionChanged };
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
    buildReel();
    buildPandaGallery();
    buildGame();
    buildOpenWhen();
    buildMap();
    buildQuiz();
    buildCapsule();
    buildScratch();
    buildConstellation();
    buildReply();
    buildVoice();
    buildPrint();
    buildGreeting();
    buildReasons();
    buildCake();
    buildProposal();
    buildPandas();
    buildNav();
    startTogether();
    startJourney();
    startBalloons();

    // Get the music going as soon as the browser will let us — which in
    // practice is her first tap, or typing the password.
    music.arm();

    // The tab quietly asks for her back while she's away.
    if (C.tabAway && C.tabAway.title) {
      const real = document.title;
      document.addEventListener('visibilitychange', () => {
        document.title = document.hidden ? C.tabAway.title : real;
      });
    }

    initGate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
