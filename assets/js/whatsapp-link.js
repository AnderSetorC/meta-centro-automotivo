// Meta Centro Automotivo — Adiciona mensagem padrão única em todos os links do WhatsApp
(function () {
  'use strict';

  var MENSAGEM = 'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de atendimento!';

  function aplicar(link) {
    if (!link || !link.href) return;
    if (link.dataset.zapOk === '1') return;
    var href = link.getAttribute('href');
    if (!href || href.indexOf('wa.me/') === -1) return;

    // Separa path e query manualmente para tolerar "wa.me/55119...text=..." (sem ?)
    var queryStart = href.indexOf('?');
    var path = queryStart === -1 ? href : href.substring(0, queryStart);
    var query = queryStart === -1 ? '' : href.substring(queryStart + 1);

    // Constrói query limpa: remove qualquer text= existente
    var parts = query ? query.split('&') : [];
    var clean = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p && p.indexOf('text=') !== 0) clean.push(p);
    }
    clean.push('text=' + encodeURIComponent(MENSAGEM));

    link.href = path + '?' + clean.join('&');
    link.dataset.zapOk = '1';
  }

  function processarTodos() {
    document.querySelectorAll('a[href*="wa.me/"]').forEach(aplicar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processarTodos);
  } else {
    processarTodos();
  }
})();
