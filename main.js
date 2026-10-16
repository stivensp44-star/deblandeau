(function () {
  'use strict';

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    function updateNav() {
      // Hysteresis: iOS address-bar jitter must not re-trigger the swap.
      // > 80 = scrolled on, < 40 = scrolled off, 40-80 = keep current state.
      if (window.scrollY > 80) { navbar.classList.add('scrolled'); navbar.classList.remove('light'); }
      else if (window.scrollY < 40) { navbar.classList.remove('scrolled'); navbar.classList.add('light'); }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    if (!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', 'false');
    function closeNav() {
      mobileNav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    toggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('click', function (e) {
      if (!mobileNav.contains(e.target) && !toggle.contains(e.target)) {
        closeNav();
      }
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || !window.IntersectionObserver) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  function initFaq() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    items.forEach(function (item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        items.forEach(function (el) {
          el.classList.remove('open');
          const a = el.querySelector('.faq-answer'); if (a) a.style.maxHeight = null;
          const q = el.querySelector('.faq-question'); if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function initForms() {
    const forms = document.querySelectorAll('.contact-form');
    if (!forms.length) return;
    forms.forEach(function (form) {
      const btn = form.querySelector('[type="submit"]');
      const message = form.querySelector('.form-message');
      const defaultLabel = btn ? btn.innerHTML : '';

      function showMessage(text, ok) {
        if (!message) return;
        message.textContent = text;
        message.classList.toggle('error', !ok);
        message.style.display = 'block';
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!btn) return;

        if (!form.checkValidity()) { form.reportValidity(); return; }

        btn.textContent = 'Sending…';
        btn.disabled = true;

        const formData = new FormData(form);
        const endpoint = form.getAttribute('action');

        // If no real endpoint is configured yet, fail gracefully with guidance.
        if (!endpoint || endpoint.indexOf('REPLACE') !== -1) {
          showMessage('Form is not connected yet. Please email deblandeaumed@gmail.com or call us directly.', false);
          btn.innerHTML = defaultLabel; btn.disabled = false;
          return;
        }

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.ok) {
              btn.textContent = 'Sent ✓';
              showMessage('Thank you! Daphne will be in touch within one business day.', true);
              form.reset();
              setTimeout(function () { btn.innerHTML = defaultLabel; btn.disabled = false; if (message) message.style.display = 'none'; }, 6000);
            } else {
              throw new Error(data.message || 'Submission failed');
            }
          })
          .catch(function () {
            showMessage('Something went wrong. Please email deblandeaumed@gmail.com or try again.', false);
            btn.innerHTML = defaultLabel; btn.disabled = false;
          });
      });
    });
  }

  function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function initSwipeDots() {
    // PLO swipe-row dots (decorative position indicator; row itself is pure CSS scroll-snap).
    if (!window.matchMedia || !window.matchMedia('(max-width: 768px)').matches) return;
    const row = document.querySelector('.services-grid');
    if (!row || !window.IntersectionObserver) return;
    const cards = row.querySelectorAll('.service-card');
    if (cards.length < 2) return;
    row.setAttribute('tabindex', '0');
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', 'Services, swipeable list');
    const dots = document.createElement('div');
    dots.className = 'swipe-dots';
    dots.setAttribute('aria-hidden', 'true');
    cards.forEach(function (card, i) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dots.appendChild(dot);
    });
    row.insertAdjacentElement('afterend', dots);
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const idx = Array.prototype.indexOf.call(cards, entry.target);
        dots.querySelectorAll('span').forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      });
    }, { root: row, threshold: 0.6 });
    cards.forEach(function (card) { observer.observe(card); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileNav();
    initReveal();
    initFaq();
    initForms();
    initAnchorScroll();
    initSwipeDots();
  });
})();
