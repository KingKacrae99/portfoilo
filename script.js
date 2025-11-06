// Small helper utilities for interactions & animations
document.addEventListener('DOMContentLoaded', () => {
  // set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => { nav.classList.toggle('open'); });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
        // close nav on mobile
        if (nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // typing effect
  const typedEl = document.querySelector('.typed');
  const phrases = [
    "I build full-stack apps that solve real-world problems.",
    "Smart contracts, APIs, and production-ready web apps.",
    "Currently pursuing BSc at BYU-Idaho (Pathway)."
  ];
  let p = 0, idx = 0, forward = true;
  function tick(){
    const phrase = phrases[p];
    if (forward) {
      typedEl.textContent = phrase.slice(0, idx++);
      if (idx > phrase.length){ forward = false; setTimeout(tick, 1400); return; }
    } else {
      typedEl.textContent = phrase.slice(0, idx--);
      if (idx === 0){ forward = true; p = (p+1)%phrases.length; }
    }
    setTimeout(tick, forward ? 40 : 20);
  }
  tick();

  // simple reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add('visible');
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
