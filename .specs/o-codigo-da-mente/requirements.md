# Especificação de Requisitos: Mentoria O Código da Mente

## 1. Visão Geral do Produto
O site **Mentoria O Código da Mente** (Mente Livre) é uma aplicação web imersiva de alta conversão. O acesso ao conteúdo da landing page é precedido por uma experiência interativa gamificada: um artefato 3D no estilo **Cryptex** que o usuário deve alinhar para destravar o site, transmitindo a mensagem de que "a chave não está fora, está dentro". O site conta também com a opção de pular o desafio e ser conduzido diretamente à landing page principal.

---

## 2. Requisitos em Notação EARS

### 2.1 Módulo Cryptex & Desbloqueio 3D (Gamificação de Acesso)

* **REQ-CRYP-001 (Ubiquitous - Renderização da Cena 3D):**
  * *EARS:* O sistema deverá renderizar uma cena WebGL 3D em tela cheia com iluminação volumétrica, névoa escura, poeira de partículas douradas suspensas e 35 itens flutuantes procedurais (chaves e cadeados).
  * *Critérios de Aceitação:*
    * Canvas cobrindo 100% da viewport em posição fixa de fundo (`z-index: -1`).
    * Gerenciamento correto de renderização e redimensionamento responsivo (`resize` event).
    * Taxa de quadros estável em dispositivos móveis e desktop ($\ge 60\text{ fps}$).

* **REQ-CRYP-002 (Event-driven - Rotação dos Anéis do Cryptex):**
  * *EARS:* Quando o usuário clicar nas setas de navegação esquerda ou direita de um anel específico, o sistema deverá girar o respectivo anel em incrementos angulares de $\frac{2\pi}{10}$ radianos com animação elástica suave.
  * *Critérios de Aceitação:*
    * Suporte a 3 anéis independentes com passos discretos.
    * Feedback sonoro tátil via Web Audio API (`playTickSound` a cada passo e `playLockSound` quando o passo for múltiplo de 10).
    * Setas flutuantes 2D sincronizadas com as coordenadas de projeção 3D dos anéis na tela.

* **REQ-CRYP-003 (State-driven - Indicação Visual de Alinhamento):**
  * *EARS:* Enquanto um anel estiver na posição correta de segredo (alinhamento zero / centro), o sistema deverá exibir o marcador e os controles do anel na cor verde esmeralda (`#4ade80`) com animação de pulso luminoso.
  * *Critérios de Aceitação:*
    * O marcador emissivo do anel alinhado muda de branco para verde fluorescente.
    * A classe de controle correspondente recebe destaque pulsante.

* **REQ-CRYP-004 (Event-driven - Desbloqueio Automático):**
  * *EARS:* Quando todos os 3 anéis estiverem simultaneamente alinhados com seus marcadores centrais, o sistema deverá disparar a sequência de destravamento cinematográfico.
  * *Critérios de Aceitação:*
    * Desativação imediata de interações de rotação.
    * Abertura radial das tampas superior e inferior do artefato.
    * Expansão dos anéis para fora do cilindro.
    * Explosão de luz emissiva no núcleo central e flash de tela branca (`#flash-overlay`).
    * Ocultação do splash/puzzle e transição suave de fade-in revelando o site principal.
    * Liberação do scroll vertical da página (`overflow: auto`).

* **REQ-CRYP-005 (Event-driven - Pular Desafio):**
  * *EARS:* Quando o usuário clicar em "Pular desafio", o sistema deverá alinhar automaticamente todos os anéis à posição correta e disparar a sequência de desbloqueio.
  * *Critérios de Aceitação:*
    * Rotação acelerada dos anéis para a posição 0.
    * Acionamento da sequência de destravamento em no máximo 600ms.

* **REQ-CRYP-006 (State-driven - Efeito Parallax de Fundo):**
  * *EARS:* Enquanto o usuário move o cursor ou interage com o dispositivo, o sistema deverá aplicar rotação suave e paralaxe de câmera baseada na posição do mouse ou orientação.
  * *Critérios de Aceitação:*
    * Movimento suave com amortecimento (*lerp/easing*).
    * Deslocamento suave das chaves e cadeados flutuantes no espaço tridimensional.

---

* **REQ-CRYP-007 (State-driven - Persistência do Desbloqueio):**
  * *EARS:* Enquanto o status de desbloqueio estiver gravado no armazenamento local (`localStorage.getItem('cryptex_unlocked') === 'true'`), o sistema deverá renderizar diretamente o site principal, pulando a exibição do Cryptex e do splash screen.
  * *Critérios de Aceitação:*
    * Ao carregar a página com a chave presente, a landing page é exibida imediatamente sem animação de puzzle.
    * Quando o usuário completa o alinhamento ou clica em "Pular desafio", o sistema grava `localStorage.setItem('cryptex_unlocked', 'true')`.

---

### 2.2 Módulo Landing Page (Site Principal)

* **REQ-LAND-001 (Ubiquitous - Header e Navegação):**
  * *EARS:* O sistema deverá exibir um cabeçalho fixo (*sticky*) com efeito de desfoque de fundo (*glassmorphism*), logotipo "MENTE LIVRE", links de âncora para "#metodo" e "#checkout", e botão CTA "Garantir Vaga".
  * *Critérios de Aceitação:*
    * Fixação no topo durante a rolagem.
    * Rolagem suave (*smooth scroll*) para as seções de destino.

* **REQ-LAND-002 (Ubiquitous - Seção Hero):**
  * *EARS:* O sistema deverá exibir a seção principal com badge indicativo "O Cadeado foi aberto", título em tipografia display "Rompa as Correntes Invisíveis" com gradiente dourado, parágrafo de chamada, botão CTA "Iniciar Reprogramação" (ancorando em `#checkout`) e card premium com preview de vídeo e botão play estético (player real registrado como dívida técnica).
  * *Critérios de Aceitação:*
    * Layout em grid responsivo (1 coluna em mobile, 12 colunas em desktop).
    * O clique no CTA ancora diretamente na seção de checkout.

* **REQ-LAND-003 (Ubiquitous - Seção O Método):**
  * *EARS:* O sistema deverá apresentar os 3 pilares do método de arquitetura mental ("01 O Diagnóstico", "02 A Ruptura", "03 A Ascensão") em cards estilizados com efeitos de hover luminosos dourados.
  * *Critérios de Aceitação:*
    * Grid de 3 colunas em telas médias/largas e 1 coluna em telas compactas.
    * Efeito de transição nos cards ao passar o cursor.

* **REQ-LAND-004 (Ubiquitous - Seção Oferta e Checkout Hotmart):**
  * *EARS:* O sistema deverá apresentar o card de oferta com título "Sua Chave Mestra", condição de pagamento em destaque ("12x R$ 97,14"), botão de ação redirecionando diretamente para o checkout da Hotmart (`https://hotmart.com/pt-br/marketplace/produtos/transformacao-imediata/Q90065181S`), link para o Ebook complementar (`https://hotmart.com/pt-br/marketplace/produtos/troque-e-transforme-sua-comunicacao/A85697379P?sck=HOTMART_PRODUCT_PAGE`) e selo de segurança com ícone de escudo.
  * *Critérios de Aceitação:*
    * Redirecionamento seguro para o checkout da Hotmart em nova aba com `rel="noopener noreferrer"`.
    * Apresentação clara do valor e formato de acesso (Vitalício).

* **REQ-LAND-005 (Ubiquitous - Rodapé Institucional & Orion Banner):**
  * *EARS:* O sistema deverá exibir o rodapé de copyright do produto e obrigatoriamente incluir o componente oficial `src/components/OrionFooter.vue` na base absoluta da página.
  * *Critérios de Aceitação:*
    * Preservação inalterada do rodapé corporativo Orion Stellar Solutions.
    * Posicionamento correto após o rodapé local da mentoria.

---

### 2.3 Requisitos Não-Funcionais e Performance

* **REQ-NFR-001 (Performance & Web Vitals Mobile):**
  * *EARS:* O sistema deverá atender aos limites de orçamento de performance mobile: LCP $\le 2.5\text{s}$, INP $\le 200\text{ms}$, CLS $\le 0.1$ e pontuação Lighthouse $\ge 90$.
* **REQ-NFR-002 (Gerenciamento de Ciclo de Vida WebGL):**
  * *EARS:* Quando os componentes 3D forem desmontados no Vue, o sistema deverá descartar todas as geometrias, texturas, materiais e cancelar os loops de animação (`cancelAnimationFrame`) para evitar vazamentos de memória.
* **REQ-NFR-003 (Stack & Modularização):**
  * *EARS:* O sistema deverá ser estruturado em Vue 3 SFCs com Composition API (`<script setup>`), TypeScript e Tailwind CSS, sem scripts inline globais legados.
