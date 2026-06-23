// Meta Centro Automotivo — Adiciona mensagem padrão única em todos os links do WhatsApp
// Formato: https://api.whatsapp.com/send/?phone=NUMERO&text=MENSAGEM
(function () {
  'use strict';

  var MSG_PADRAO = 'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de atendimento!';
  var UNIDADES = {
    'perdizes':    'Perdizes',
    'barra-funda': 'Barra Funda'
  };

  // Extrai o número de telefone de um link wa.me/ ou api.whatsapp.com/send/
  function extrairTelefone(href) {
    var m1 = href.match(/wa\.me\/(\d+)/);
    if (m1) return m1[1];
    var m2 = href.match(/api\.whatsapp\.com\/send\/\?[^#]*phone=(\d+)/);
    if (m2) return m2[1];
    return null;
  }

  // Monta a mensagem final considerando data-unidade (se houver)
  function montarMensagem(link) {
    var unidade = link.dataset.unidade && UNIDADES[link.dataset.unidade];
    if (unidade) {
      return 'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de atendimento na unidade ' + unidade + '!';
    }
    return MSG_PADRAO;
  }

  function montarLink(telefone, texto) {
    return 'https://api.whatsapp.com/send/?phone=' + telefone + '&text=' + encodeURIComponent(texto) + '&type=phone_number&app_absent=0';
  }

  function aplicar(link) {
    if (!link || !link.href) return;
    if (link.dataset.zapOk === '1') return;
    var href = link.getAttribute('href');
    if (!href || (href.indexOf('wa.me/') === -1 && href.indexOf('api.whatsapp.com/send/') === -1)) return;

    var telefone = extrairTelefone(href);
    if (!telefone) return;

    link.href = montarLink(telefone, montarMensagem(link));
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