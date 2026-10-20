// BART-ZIEM - menu w pigułce, karuzela usług i slajder kroków
(function () {
  var body = document.body;
  var pill = document.querySelector('.kw-pill');
  function setMenu(open) {
    body.classList.toggle('kw-open', open);
    if (pill) pill.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (pill) {
    pill.addEventListener('click', function () { setMenu(!body.classList.contains('kw-open')); });
    document.querySelectorAll('.kw-menu a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // karuzela usług: strzałki + pasek postępu
  document.querySelectorAll('[data-kw-carousel]').forEach(function (box) {
    var track = box.querySelector('.kw-srv-track');
    var bar = box.parentNode.querySelector('.kw-progress i');
    if (!track) return;
    function step() { var it = track.querySelector('.kw-srv-item'); return it ? it.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 400; }
    box.querySelectorAll('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () { track.scrollBy({ left: step() * +b.getAttribute('data-dir'), behavior: 'smooth' }); });
    });
    function upd() {
      if (!bar) return;
      var max = track.scrollWidth - track.clientWidth;
      var vis = Math.max(.15, track.clientWidth / track.scrollWidth);
      bar.style.width = (vis * 100) + '%';
      bar.style.transform = 'translateX(' + (max > 0 ? (track.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0) + '%)';
    }
    track.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  });

  // slajder kroków
  document.querySelectorAll('[data-kw-slider]').forEach(function (box) {
    var track = box.querySelector('.kw-steps-track');
    var n = track ? track.children.length : 0, i = 0;
    if (!n) return;
    function go(k) { i = (k + n) % n; track.style.transform = 'translateX(' + (-100 * i) + '%)'; }
    box.querySelectorAll('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () { go(i + (+b.getAttribute('data-dir'))); });
    });
  });
})();
