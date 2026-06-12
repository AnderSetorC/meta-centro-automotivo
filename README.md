# Meta Centro Automotivo — Site

Site institucional da **Meta Centro Automotivo** (Centro Automotivo Porto Seguro Meta). Duas unidades em São Paulo: **Perdizes** e **Várzea da Barra Funda**.

---

## 🚀 Deploy rápido (Vercel)

### 1. Subir para o GitHub
```bash
cd site/
git init
git add .
git commit -m "Site Meta Centro Automotivo"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/meta-centro-automotivo.git
git push -u origin main
```

### 2. Deploy na Vercel
1. Acesse https://vercel.com e faça login com a conta do GitHub
2. **Add New Project** → selecione o repositório
3. **Root Directory** deixe vazio (a pasta `site/` vai direto)
4. **Framework Preset:** "Other"
5. **Build & Output:** deixe padrão
6. Clique em **Deploy**

Em 30-60s o site estará no ar em `https://meta-centro-automotivo.vercel.app`.

### 3. Apontar o domínio `centroautomotivometa.com.br` para a Vercel

**No painel da Vercel (Project → Settings → Domains):**
1. Adicione `centroautomotivometa.com.br` e `www.centroautomotivometa.com.br`
2. A Vercel vai mostrar os registros DNS a configurar

**Na sua hospedagem atual (Registro.br ou cPanel):**
- **APEX (`centroautomotivometa.com.br`):**
  - Tipo `A` → `76.76.21.21`
- **WWW (`www.centroautomotivometa.com.br`):**
  - Tipo `CNAME` → `cname.vercel-dns.com`
- Remova registros antigos (A, CNAME) que apontem para o servidor antigo

**Aguarde a propagação** (até 48h, normalmente 1-2h). O SSL/HTTPS é automático pela Vercel.

> Dica: o site não precisa mais ficar no seu servidor antigo — aponte tudo para a Vercel e desative o hosting antigo.

---

## 🏷️ Tags de rastreamento (Google + Facebook)

As tags **funcionam em qualquer domínio** porque rodam no navegador do visitante, não no servidor. Instale no código uma vez e o rastreamento funcionará tanto na Vercel quanto no `.com.br` (e qualquer redirecionamento entre eles).

### Google Tag Manager (recomendado)

1. Crie uma conta em https://tagmanager.google.com
2. Pegue o **GTM-XXXXXXX**
3. Substitua `GTM-XXXXXXX` em `assets/js/_TAGS-HEADER-SNIPPET.html` (snippet do `<head>`)
4. Substitua `GTM-XXXXXXX` em `assets/js/_TAGS-BODY-SNIPPET.html` (noscript do `<body>`)
5. Cole o snippet do `<head>` em todas as páginas, logo após `<link rel="icon">`
6. Cole o snippet do `<body>` em todas as páginas, logo após `<body>`

**Vantagem:** depois de instalar o GTM, todas as outras tags (GA4, Google Ads, Meta Pixel) são gerenciadas pelo painel do GTM, sem mexer no HTML.

### Google Analytics 4 (via GTM)
1. Crie uma propriedade GA4 em https://analytics.google.com
2. Adicione a tag "Google Analytics: GA4 Configuration" no GTM
3. Cole seu ID `G-XXXXXXXXXX`
4. Dispare em "All Pages"

### Meta Pixel (Facebook/Instagram Ads)
1. Crie um pixel em https://business.facebook.com/events-manager
2. Pegue o **Pixel ID** (número)
3. Substitua `000000000000000` (em 2 lugares) em `assets/js/_TAGS-HEADER-SNIPPET.html`
4. Cole o snippet do `<head>` em todas as páginas
5. No **Gerenciador de Eventos do Facebook**, configure os eventos padrão:
   - `Lead` — quando o usuário preenche o formulário de contato
   - `Contact` — quando clica no WhatsApp
   - Para rastrear via GTM é mais flexível, mas o snippet direto já cobre o `PageView`

> Quando configurar o pixel no Events Manager, adicione como URL do site **tanto** `centroautomotivometa.com.br` quanto o subdomínio temporário da Vercel. Assim o pixel funciona durante a migração.

### Google Search Console (indexação)

1. Adicione a propriedade em https://search.google.com/search-console
2. Tipo: **Domínio** (`centroautomotivometa.com.br`) — recomendado
3. Verifique via registro TXT no DNS
4. Depois de verificar, envie o sitemap: `https://centroautomotivometa.com.br/sitemap.xml`

### Google Business Profile (perfil da empresa)

1. Acesse https://business.google.com
2. Crie um perfil **para cada unidade**:
   - **Unidade Perdizes** — Av. Sumaré, 73, Perdizes, São Paulo
   - **Unidade Barra Funda** — Rua Quirino dos Santos, 230, Barra Funda, São Paulo
3. Categoria: "Oficina mecânica" / "Centro automotivo"
4. Adicione fotos, horário, telefone
5. Verifique por carta ou telefone

> Esta é a etapa que mais impacto traz para SEO local: quando alguém em SP busca "oficina perto de mim", o Google mostra o Business Profile com mapa + telefone.

---

## 🔎 Sobre o site

- **14 páginas HTML** com identidade visual META (azul ciano #00AEEF)
- **Responsivo** (mobile-first) com menu hamburger
- **Carrossel automático** em home, serviços e páginas de serviço
- **Botão flutuante WhatsApp** em todas as páginas
- **Como Chegar** com Google Maps embed (em `sobre.html`)
- **Página /bio** para link in bio do Instagram
- **Banner Porto Seguro** em todas as páginas + card destaque

### Estrutura de arquivos
```
site/
├── index.html              Home
├── servicos.html           Hub de serviços
├── servicos/               4 páginas de serviço
├── sobre.html              Quem somos + Como Chegar
├── faq.html                Perguntas frequentes
├── contato.html            Formulário
├── blog.html + blog/       Blog
├── bio.html                Link in bio (Instagram)
├── assets/
│   ├── css/style.css       Estilos
│   ├── js/
│   │   ├── carrossel.js    Inicializa Swiper
│   │   ├── _TAGS-HEADER-SNIPPET.html
│   │   └── _TAGS-BODY-SNIPPET.html
│   └── img/                Fotos reais + logo oficial
├── sitemap.xml
├── robots.txt
└── README.md
```

### SEO já configurado
- 1 H1 por página
- Meta title 50-60 caracteres
- Meta description 140-160 caracteres
- URLs amigáveis (slug)
- Schema.org: `AutoRepair`, `FAQPage`, `Service`, `BreadcrumbList`, `Article`
- NAP (Nome/Endereço/Telefone) consistente nas 2 unidades
- Imagens com ALT descritivo
- 4 `ContactPoint` no Schema (WhatsApp + fixo de cada unidade)
- Sitemap.xml + robots.txt

### Dados cadastrais
- **CNPJ:** 04.451.815/0001-48
- **IE:** 116.988.999.110
- **Razão Social:** Meta Servicos Automotivos LTDA
- **Marca:** Centro Automotivo Porto Seguro Meta
- **Domínio:** centroautomotivometa.com.br
- **Instagram:** @caps.meta
- **Facebook:** /capsmeta

### Contatos das unidades
| Unidade | WhatsApp | Telefone fixo |
|---|---|---|
| **Perdizes** | (11) 94270-9348 | (11) 3864-1616 |
| **Barra Funda** | (11) 99199-8096 | (11) 3822-4481 |

---

## 🛠️ Próximos passos sugeridos

- [ ] Subir no GitHub e fazer deploy na Vercel
- [ ] Apontar domínio `.com.br` para a Vercel (A + CNAME)
- [ ] Instalar Google Tag Manager em todas as páginas
- [ ] Configurar Google Analytics 4 via GTM
- [ ] Configurar Meta Pixel via GTM ou direto
- [ ] Adicionar site ao Google Search Console + enviar sitemap
- [ ] Criar Google Business Profile para as 2 unidades
- [ ] Adicionar fotos reais de serviços no Instagram
- [ ] Configurar WhatsApp Business API (opcional, para respostas automáticas)
- [ ] Adicionar linktree ou apenas a `/bio` no Instagram

---

## 📞 Suporte do site

Em caso de dúvidas sobre a estrutura do site, consulte este README ou abra uma issue no GitHub.
