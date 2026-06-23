// Meta Centro Automotivo — Mensagens personalizadas do WhatsApp por contexto
(function () {
  'use strict';

  // Mapeamento de página (data-page no <body>) -> rótulo de origem exibido na mensagem
  const PAGINAS = {
    'home':               'página inicial',
    'servicos':           'página de Serviços',
    'servico-troca-oleo': 'página de Troca de Óleo',
    'servico-troca-pneus':'página de Troca de Pneus',
    'servico-troca-lampadas': 'página de Troca de Lâmpadas',
    'servico-troca-escapamento': 'página de Troca de Escapamento',
    'servico-alinhamento':'página de Alinhamento e Balanceamento',
    'servico-freio':      'página de Freio e Suspensão',
    'servico-ar':         'página de Higienização de Ar-Condicionado',
    'sobre':              'página Sobre',
    'faq':                'página de Perguntas Frequentes',
    'contato':            'página de Contato',
    'blog':               'Blog',
    'blog-oleo':          'artigo "Quando trocar o óleo do carro"',
    'blog-alinhamento':   'artigo "Alinhamento e Balanceamento: quando fazer"',
    'blog-ar':            'artigo "Higienização do ar-condicionado veicular"',
    'bio':                'link da bio do Instagram'
  };

  // Mapeamento de intenção (data-msg) -> mensagem customizada
  // (sobrescreve a mensagem padrão por página)
  const INTENCOES = {
    'orcamento':     'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de um orçamento.',
    'agendar':       'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de agendar uma revisão.',
    'agendar-gratis':'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de agendar uma revisão grátis.',
    'agendar-form':  'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de atendimento. Acabei de preencher o formulário de contato.'
  };

  // Mensagem padrão quando não houver contexto
  const FALLBACK = 'Olá! Vim pelo site do Centro Automotivo Meta e gostaria de atendimento!';

  function detectarOrigem() {
    // 1) data-page no <body>
    const body = document.body;
    if (body && body.dataset && body.dataset.page) {
      return PAGINAS[body.dataset.page] || null;
    }
    return null;
  }

  function montarMensagem(link) {
    // Prioridade: data-msg no <a> > data-page no <body> > fallback
    const intencao = link.dataset.msg;
    if (intencao && INTENCOES[intencao]) {
      return INTENCOES[intencao];
    }
    if (intencao) {
      // Aceita string livre
      return intencao;
    }
    const origem = detectarOrigem();
    if (origem) {
      return 'Olá! Vim pelo site do Centro Automotivo Meta (' + origem + ') e gostaria de atendimento!';
    }
    return FALLBACK;
  }

  function aplicarMensagem(link) {
    if (!link || !link.href) return;
    if (link.dataset.zapOk === '1') return;
    let url;
    try { url = new URL(link.href); } catch (e) { return; }
    if (!url.hostname.includes('wa.me')) return;
    // Não sobrescreve se já tem text= na URL
    if (url.searchParams.get('text')) return;

    url.searchParams.set('text', montarMensagem(link));
    link.href = url.toString();
    link.dataset.zapOk = '1';
  }

  function processarTodos() {
    document.querySelectorAll('a[href*="wa.me/"]').forEach(aplicarMensagem);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processarTodos);
  } else {
    processarTodos();
  }
})();
