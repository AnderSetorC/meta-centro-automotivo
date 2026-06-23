// Meta Centro Automotivo — Adiciona mensagem padrão em links WhatsApp que ainda não têm
// Formato alvo: https://api.whatsapp.com/send/?phone=NUMERO&text=MENSAGEM
(function () {
  'use strict';

  var MENSAGEM = 'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de atendimento!';

  function aplicar(link) {
    if (!link || !link.href) return;
    if (link.dataset.zapOk === '1') return;
    var href = link.getAttribute('href');
    if (!href) return;
    if (href.indexOf('wa.me/') === -1 && href.indexOf('api.whatsapp.com/send/') === -1) return;

    // Se já tem &text= ou ?text= no href, não mexe — o link já tem mensagem
    if (/[?&]text=/.test(href)) {
      link.dataset.zapOk = '1';
      return;
    }

    // Adiciona o sufixo: &text=...&type=phone_number&app_absent=0
    var sep = href.indexOf('?') === -1 ? '?' : '&';
    link.href = href + sep + 'text=' + encodeURIComponent(MENSAGEM) + '&type=phone_number&app_absent=0';
    link.dataset.zapOk = '1';
  }

  function processarTodos() {
    document.querySelectorAll('a[href*="wa.me/"], a[href*="api.whatsapp.com/send/"]').forEach(aplicar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processarTodos);
  } else {
    processarTodos();
  }
})();