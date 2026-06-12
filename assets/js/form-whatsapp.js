/* Meta Centro Automotivo — Envio do formulário de contato via WhatsApp */
(function () {
  // WhatsApp de destino padrão: Perdizes (pode ser alterado pela unidade selecionada)
  const WHATS = {
    'Perdizes — Av. Sumaré, 73': '5511942709348',
    'Barra Funda — Rua Quirino dos Santos, 230': '5511991998096',
    'Sem preferência': '5511942709348'
  };

  function escape(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>]/g, function (c) {
      return { '&': '%26', '<': '%3C', '>': '%3E' }[c];
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    var f = e.target;
    var dados = {
      nome: f.nome.value.trim(),
      telefone: f.telefone.value.trim(),
      email: (f.email && f.email.value.trim()) || '—',
      unidade: f.unidade.value,
      servico: f.servico.value,
      veiculo: (f.veiculo && f.veiculo.value.trim()) || '—',
      mensagem: f.mensagem.value.trim() || '—'
    };

    // Telefone formatado para a mensagem
    var telFormatado = dados.telefone;
    if (telFormatado && telFormatado.length >= 10) {
      telFormatado = '(' + telFormatado.slice(-11, -9) + ') ' +
        telFormatado.slice(-9, -4) + '-' + telFormatado.slice(-4);
    }

    // Monta a mensagem com quebras de linha (%0A) e emojis
    var texto =
      '🚗 *Agendamento — Meta Centro Automotivo*%0A%0A' +
      '👤 *Nome:* ' + escape(dados.nome) + '%0A' +
      '📱 *Telefone:* ' + escape(telFormatado) + '%0A' +
      '✉️ *E-mail:* ' + escape(dados.email) + '%0A' +
      '📍 *Unidade:* ' + escape(dados.unidade) + '%0A' +
      '🔧 *Serviço:* ' + escape(dados.servico) + '%0A' +
      '🚙 *Veículo:* ' + escape(dados.veiculo) + '%0A' +
      '💬 *Mensagem:* ' + escape(dados.mensagem) + '%0A%0A' +
      '─────────────────────%0A' +
      '📅 *Qual seria o melhor dia e horário para o atendimento?*%0A' +
      'Horário de funcionamento:%0A' +
      'Seg a Sex: 8h às 18h%0A' +
      'Sábado: 8h às 12h%0A' +
      'Domingo: fechado';

    var numero = WHATS[dados.unidade] || WHATS['Sem preferência'];
    var url = 'https://wa.me/' + numero + '?text=' + texto;

    // Feedback visual
    var btn = f.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Abrindo WhatsApp...';
    }

    // Pequeno delay para o usuário ver o feedback, depois abre o WhatsApp
    setTimeout(function () {
      window.open(url, '_blank', 'noopener');
      // Restaura o botão após 2s
      setTimeout(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Enviar solicitação'; }
        f.reset();
      }, 2000);
    }, 300);
  }

  // Liga o handler quando o DOM estiver pronto
  function init() {
    var form = document.getElementById('form');
    if (form) form.addEventListener('submit', onSubmit);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
