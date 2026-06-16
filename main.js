(function () {
  'use strict';

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    function updateNav() {
      if (window.scrollY > 60) { navbar.classList.add('scrolled'); navbar.classList.remove('light'); }
      else { navbar.classList.remove('scrolled'); navbar.classList.add('light'); }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    if (!toggle || !mobileNav) return;
    toggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', function (e) {
      if (!mobileNav.contains(e.target) && !toggle.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
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
        items.forEach(function (el) { el.classList.remove('open'); const a = el.querySelector('.faq-answer'); if (a) a.style.maxHeight = null; });
        if (!isOpen) { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
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
        const key = formData.get('access_key');

        // If no real endpoint/key is configured yet, fail gracefully with guidance.
        if (!endpoint || !key || key.indexOf('REPLACE') !== -1) {
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
            if (data.success) {
              btn.textContent = 'Sent ✓';
              showMessage('Thank you! Daphnee will be in touch within one business day.', true);
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

  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileNav();
    initReveal();
    initFaq();
    initForms();
    initAnchorScroll();
  });
})();
