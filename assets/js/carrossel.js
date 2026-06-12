/* Meta Centro Automotivo — Inicializador do carrossel Swiper */
(function () {
  function initCarrosseis() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll('.carrossel-meta').forEach(function (el) {
      // Evita reinicializar
      if (el.swiper) return;
      el.swiper = new Swiper(el, {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        effect: 'slide',
        speed: 700,
        grabCursor: true,
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev')
        },
        keyboard: { enabled: true },
        a11y: { prevSlideMessage: 'Foto anterior', nextSlideMessage: 'Próxima foto' }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarrosseis);
  } else {
    initCarrosseis();
  }
})();
