/* Find My Local — premium site interactions (vanilla, no deps) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var svgNS = 'http://www.w3.org/2000/svg';
  var icon = function (id) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fmt(n) { return Math.round(n).toLocaleString('en-IN'); }

  /* ---------- Data ---------- */
  var STATES = [
    { code: 'tg', name: 'Telangana', status: 'active', sub: 'Live now · founding region',
      stats: [['1,200+', 'Helper capacity'], ['50+', 'Service types'], ['33', 'Districts'], ['24/7', 'Alert coverage']] },
    { code: 'ap', name: 'Andhra Pradesh', status: 'soon', sub: 'Expansion in planning',
      stats: [['26', 'Districts'], ['40+', 'Service types'], ['Q2', 'Target launch'], ['High', 'Demand signal']] },
    { code: 'ka', name: 'Karnataka', status: 'soon', sub: 'Expansion in planning',
      stats: [['31', 'Districts'], ['45+', 'Service types'], ['Q3', 'Target launch'], ['High', 'Demand signal']] },
    { code: 'mh', name: 'Maharashtra', status: 'soon', sub: 'Expansion in planning',
      stats: [['36', 'Districts'], ['50+', 'Service types'], ['Q3', 'Target launch'], ['Very high', 'Demand signal']] },
    { code: 'tn', name: 'Tamil Nadu', status: 'soon', sub: 'Expansion in planning',
      stats: [['38', 'Districts'], ['45+', 'Service types'], ['Q4', 'Target launch'], ['High', 'Demand signal']] },
    { code: 'kl', name: 'Kerala', status: 'soon', sub: 'Expansion in planning',
      stats: [['14', 'Districts'], ['40+', 'Service types'], ['Q4', 'Target launch'], ['High', 'Demand signal']] },
    { code: 'dl', name: 'Delhi NCR', status: 'soon', sub: 'Expansion in planning',
      stats: [['11', 'Districts'], ['50+', 'Service types'], ['Q2', 'Target launch'], ['Very high', 'Demand signal']] },
    { code: 'wb', name: 'West Bengal', status: 'soon', sub: 'Expansion in planning',
      stats: [['23', 'Districts'], ['40+', 'Service types'], ['Q4', 'Target launch'], ['High', 'Demand signal']] }
  ];

  var STEPS = [
    ['search', 'Find Helpers', 'Discover verified local helpers nearby by skill, distance, ratings, language and availability.'],
    ['file', 'Post Work', 'Post a requirement and let relevant nearby helpers come to you — a reverse local marketplace.'],
    ['alert', 'Raise Alerts', 'Broadcast an emergency from village to town, district and state — reaching community nodes fast.'],
    ['shield', 'Get Verified', 'A thoughtful verification journey — live selfie, government ID and residency proof build real trust.'],
    ['check', 'Service Agreements', 'Lock in service details, timing, pricing and terms with a clear digital commitment form.'],
    ['award', 'Community Trust System', 'Trust grows through verification, reviews, completed work, ratings and genuine participation.'],
    ['card', 'Payment Requests', 'Share clear, secure payment details — UPI, QR and bank — without imitating any payment app.'],
    ['switch', 'Dual Account Mode', 'One number, two roles. Switch smoothly between User Mode and Helper Mode whenever you need.']
  ];

  var FEATURES = [
    ['shield', 'Verified Helpers', 'Live selfie, ID and residency checks before a helper becomes discoverable.'],
    ['layers', 'Work Marketplace', 'Post work, match with nearby helpers and connect with the right person.'],
    ['alert', 'Emergency Alerts', 'Village-to-state alerts reaching nearby community nodes in real time.'],
    ['award', 'Community Trust Index', 'A living trust score from reviews, jobs, ratings and verification.'],
    ['pin', 'Local Tourism', 'Guidance, translation and local know-how from trusted residents.'],
    ['home', 'Accommodation Assistance', 'Find safe, local-verified stays and settling-in support.'],
    ['file', 'Digital Service Agreements', 'Clear expectations with a structured commitment form.'],
    ['search', 'Hyperlocal Discovery', 'Filter by location, skills, ratings, distance, service and language.'],
    ['bell', 'Real-time Notifications', 'Requests, messages, alerts and updates — the moment they happen.'],
    ['star', 'Reviews & Ratings', 'Two-way, abuse-resistant reviews that keep the network honest.'],
    ['card', 'Secure Payments', 'Clear UPI, QR and bank details — safe and transparent.'],
    ['globe', 'Region Operations', 'State, district and village targeting for precise operations.'],
    ['grid', 'Admin Dashboard', 'Verification, moderation, alerts and RBAC at national scale.'],
    ['switch', 'Dual Account Mode', 'One account, two roles — user and helper, seamlessly.']
  ];

  var FLOW = [
    ['file', 'Post a Work', 'User posts what they need.'],
    ['bell', 'Helpers Notified', 'Nearby verified helpers receive it.'],
    ['heart', 'Interest Shown', 'Helpers express interest.'],
    ['check', 'Agreement Sent', 'A service agreement is shared.'],
    ['award', 'Work Completed', 'The work gets done, tracked.'],
    ['star', 'Review Submitted', 'Both sides review the experience.']
  ];

  var TRUST = [
    ['shield', 'Verification System', 'Multi-step identity verification with live selfie, ID and residency proof.'],
    ['lock', 'Privacy & Security', 'Biometric app lock, OTP, single-device login, secure storage and role-based access.'],
    ['users', 'Community Guidelines', 'Clear, enforced standards that keep every interaction respectful and safe.'],
    ['alert', 'Emergency Support', 'Rapid community alerting for urgent, real-world situations.'],
    ['file', 'Legal Compliance', 'Built for Indian regulatory requirements, grievance redressal and transparency.'],
    ['eye', 'Fraud Prevention', 'Abuse detection, review-integrity checks and proactive moderation.']
  ];

  var STATE_TAGS = [
    ['Telangana', true], ['Andhra Pradesh', false], ['Karnataka', false], ['Maharashtra', false],
    ['Tamil Nadu', false], ['Kerala', false], ['Delhi NCR', false], ['West Bengal', false],
    ['Gujarat', false], ['Rajasthan', false], ['Uttar Pradesh', false], ['Madhya Pradesh', false],
    ['Punjab', false], ['Odisha', false], ['Bihar', false], ['Assam', false]
  ];

  /* ---------- Render: How it works ---------- */
  var stepsEl = $('#steps');
  if (stepsEl) {
    stepsEl.innerHTML = STEPS.map(function (s, i) {
      return '<div class="step glass reveal">' +
        '<div class="idx">' + (i + 1) + '</div>' +
        '<div><div class="k">' + icon(s[0]) + '<span style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)">Step ' + (i + 1) + '</span></div>' +
        '<h3>' + s[1] + '</h3><p>' + s[2] + '</p></div></div>';
    }).join('');
  }

  /* ---------- Render: Features ---------- */
  var fg = $('#features-grid');
  if (fg) {
    fg.innerHTML = FEATURES.map(function (f, i) {
      return '<div class="feat glass reveal" data-delay="' + (i % 4) + '">' +
        '<div class="ic">' + icon(f[0]) + '</div><h3>' + f[1] + '</h3><p>' + f[2] + '</p></div>';
    }).join('');
  }

  /* ---------- Render: Flow ---------- */
  var flowEl = $('#flow');
  if (flowEl) {
    flowEl.innerHTML = FLOW.map(function (f, i) {
      return '<div class="flow-step glass reveal" data-delay="' + (i % 4) + '">' +
        '<div class="fic">' + icon(f[0]) + '</div><h4>' + f[1] + '</h4><p>' + f[2] + '</p></div>';
    }).join('');
  }

  /* ---------- Render: Trust ---------- */
  var tg = $('#trust-grid');
  if (tg) {
    tg.innerHTML = TRUST.map(function (t, i) {
      return '<div class="trust-card glass reveal" data-delay="' + (i % 3) + '">' +
        '<div class="ic">' + icon(t[0]) + '</div><h3>' + t[1] + '</h3><p>' + t[2] + '</p></div>';
    }).join('');
  }

  /* ---------- Render: State tags ---------- */
  var st = $('#states-tags');
  if (st) {
    st.innerHTML = STATE_TAGS.map(function (s) {
      return '<span class="state-tag' + (s[1] ? ' on' : '') + '"><span class="d"></span>' + s[0] + (s[1] ? '' : ' · soon') + '</span>';
    }).join('');
  }

  /* ---------- India map hotspots + panel ---------- */
  var svgMap = document.getElementById('indiaMap');
  var hs = $('#hotspots');
  var panel = $('#mapPanel');
  function renderPanel(s) {
    if (!panel) return;
    panel.innerHTML =
      '<div class="st-name">' + s.name + ' <span class="tag ' + (s.status === 'active' ? 'active">Active' : 'soon">Coming soon') + '</span></div>' +
      '<div class="st-sub">' + s.sub + '</div>' +
      '<div class="map-stats">' + s.stats.map(function (p) {
        return '<div class="map-stat"><b>' + p[0] + '</b><span>' + p[1] + '</span></div>';
      }).join('') + '</div>';
  }
  function selectState(idx) {
    STATES.forEach(function (s, i) {
      var p = document.getElementById('st-' + s.code);
      if (p) p.classList.toggle('sel', i === idx);
    });
    if (hs) {
      var mk = hs.querySelectorAll('.mk');
      for (var i = 0; i < mk.length; i++) mk[i].setAttribute('aria-current', i === idx ? 'true' : 'false');
    }
    renderPanel(STATES[idx]);
  }
  if (svgMap) {
    STATES.forEach(function (s, i) {
      var p = document.getElementById('st-' + s.code);
      if (!p) return;
      p.classList.add('hot');
      p.classList.add(s.status === 'active' ? 'active' : 'soon');
      p.setAttribute('tabindex', '0');
      p.setAttribute('role', 'button');
      p.setAttribute('aria-label', s.name + ' — ' + (s.status === 'active' ? 'active' : 'coming soon'));
      var pick = function () { selectState(i); };
      p.addEventListener('click', pick);
      p.addEventListener('mouseenter', pick);
      p.addEventListener('focus', pick);
      p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
      // decorative marker at the state's centroid (bbox center)
      if (hs) {
        try {
          var bb = p.getBBox();
          var cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
          var g = document.createElementNS(svgNS, 'g');
          g.setAttribute('class', 'mk' + (s.status === 'active' ? ' active' : ''));
          var inner = '';
          if (s.status === 'active') inner += '<circle class="pulse" cx="' + cx + '" cy="' + cy + '" r="7"/>';
          inner += '<circle class="ring" cx="' + cx + '" cy="' + cy + '" r="7"/><circle class="core" cx="' + cx + '" cy="' + cy + '" r="2.6"/>';
          g.innerHTML = inner;
          hs.appendChild(g);
        } catch (e) {}
      }
    });
    selectState(0);
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = fmt(target) + suffix; return; }
    var dur = 1500, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = fmt(parseFloat(el.getAttribute('data-count')) || 0) + (el.getAttribute('data-suffix') || ''); });
  }

  /* ---------- Bar graph ---------- */
  var bars = $('#bars');
  if (bars && 'IntersectionObserver' in window) {
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          bars.querySelectorAll('.fill').forEach(function (f) { f.style.height = (f.getAttribute('data-h') || 0) + '%'; });
          bio.unobserve(bars);
        }
      });
    }, { threshold: 0.4 });
    bio.observe(bars);
  } else if (bars) {
    bars.querySelectorAll('.fill').forEach(function (f) { f.style.height = (f.getAttribute('data-h') || 0) + '%'; });
  }

  /* ---------- Nav scroll + mobile menu ---------- */
  var nav = $('#nav');
  var scrollBar = document.getElementById('scrollBar');
  var onScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
    if (scrollBar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      scrollBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var toggle = $('.menu-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.innerHTML = open ? icon('x') : icon('menu');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = icon('menu');
      });
    });
  }

  /* ---------- Parallax (subtle, rAF-throttled) ---------- */
  if (!reduce) {
    var halo = $('.hero-halo'), ph = $('.phone');
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < 900) {
          if (halo) halo.style.transform = 'translateY(' + (y * 0.12) + 'px)';
          if (ph) ph.style.transform = 'translateY(' + (y * -0.04) + 'px)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Feedback form ---------- */
  var rating = 0;
  var starBtns = document.querySelectorAll('.fb .stars button');
  starBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      rating = +b.dataset.rating;
      starBtns.forEach(function (x) {
        x.classList.toggle('active', +x.dataset.rating <= rating);
        x.setAttribute('aria-checked', +x.dataset.rating === rating ? 'true' : 'false');
      });
    });
  });
  var fbForm = $('#feedbackForm');
  if (fbForm) {
    fbForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = $('#formNote');
      if (!fbForm.name.value.trim() || !fbForm.feedback.value.trim()) {
        if (note) { note.style.color = 'var(--amber)'; note.textContent = 'Please add your name and feedback.'; }
        return;
      }
      if (note) { note.style.color = 'var(--green)'; note.textContent = 'Thank you! Your feedback has been recorded.'; }
      fbForm.reset(); rating = 0;
      starBtns.forEach(function (x) { x.classList.remove('active'); });
    });
  }

  /* ---------- Newsletter ---------- */
  var nl = $('#nlForm');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = $('#nlNote');
      var val = nl.email.value.trim();
      var ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
      if (note) {
        note.style.color = ok ? 'var(--green)' : 'var(--amber)';
        note.textContent = ok ? 'You\'re subscribed — welcome to Find My Local!' : 'Please enter a valid email address.';
      }
      if (ok) nl.reset();
    });
  }

  /* ---------- 3D tilt on app cards (fine pointer only) ---------- */
  if (!reduce && window.matchMedia && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.app-card').forEach(function (el) {
      el.classList.add('tilt');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.classList.remove('reset');
        el.style.setProperty('--ry', (px * 7).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-py * 7).toFixed(2) + 'deg');
        el.style.setProperty('--ty', '-6px');
      });
      el.addEventListener('pointerleave', function () {
        el.classList.add('reset');
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--ty', '0');
      });
    });
  }
})();
