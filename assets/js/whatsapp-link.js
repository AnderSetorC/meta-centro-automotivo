// Adiciona mensagem automática "Vim pelo site" em todos os links do WhatsApp
(function() {
  const MENSAGEM_PADRAO = 'Olá! Vim pelo site da Meta Centro Automotivo e gostaria de um orçamento.';

  function adicionarMensagem(link) {
    if (!link || !link.href) return;
    if (link.dataset.zapOk === '1') return;
    try {
      const url = new URL(link.href);
      if (!url.hostname.includes('wa.me')) return;
      // Não sobrescreve se já tem mensagem
      if (url.searchParams.get('text')) return;
      url.searchParams.set('text', MENSAGEM_PADRAO);
      link.href = url.toString();
      link.dataset.zapOk = '1';
    } catch (e) { /* ignora links inválidos */ }
  }

  function processarTodos() {
    document.querySelectorAll('a[href*="wa.me/"]').forEach(adicionarMensagem);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processarTodos);
  } else {
    processarTodos();
  }
})();
