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
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const message = form.querySelector('.form-message');
        if (!btn) return;
        btn.textContent = 'Sending…';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = 'Message Sent';
          if (message) { message.textContent = "Thank you! We will be in touch within 24 hours."; message.style.display = 'block'; }
          form.reset();
          setTimeout(function () { btn.textContent = 'Send Message'; btn.disabled = false; if (message) message.style.display = 'none'; }, 5000);
        }, 1200);
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
