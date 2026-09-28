# Arquitetura do Sistema: O Código da Mente

## 1. Visão Geral
A aplicação web **Mentoria O Código da Mente** é desenvolvida em Vue 3 SFCs com Composition API (`<script setup>`), TypeScript e Vite, estilizada com Tailwind CSS e alimentada por Three.js para renderização 3D e Web Audio API para síntese sonora nativa.

---

## 2. Mapa de Componentes

```
src/
├── App.vue                         # Orquestrador central de estado (bloqueado/desbloqueado)
├── components/
│   ├── OrionFooter.vue             # Rodapé corporativo obrigatório Orion Stellar Solutions
│   ├── cryptex/
│   │   ├── CryptexCanvas.vue       # Cena 3D Three.js, cilindro Cryptex, anéis, partículas e parallax
│   │   └── PuzzleControls.vue      # Controles 2D projetados com setas pulsantes e botão Pular desafio
│   └── landing/
│       ├── HeaderNav.vue           # Barra de navegação sticky com backdrop blur
│       ├── HeroSection.vue         # Headline, copy persuasiva e card de preview de vídeo
│       ├── MethodSection.vue       # Os 3 pilares da arquitetura mental (Diagnóstico, Ruptura, Ascensão)
│       ├── CheckoutSection.vue     # Oferta e links diretos para checkout da Hotmart
│       └── SiteFooter.vue          # Rodapé local da mentoria
└── utils/
    └── audioSynth.ts               # Síntese sonora em tempo real via Web Audio API (tick e lock sounds)
```

---

## 3. Fluxo de Vida e Desbloqueio
1. **Verificação Síncrona:** `App.vue` checa `localStorage.getItem('cryptex_unlocked')`. Se `true`, a landing page é exibida imediatamente sem flash de puzzle bloqueado.
2. **Interação com o Puzzle:**
   - O usuário clica nas setas de `PuzzleControls.vue`, que emite o evento `rotate`.
   - `App.vue` delega a rotação para `CryptexCanvas.vue`, que aciona `audioSynth.ts` para tocar o som de clique ou de travamento (`playTickSound`/`playLockSound`).
3. **Alinhamento & Revelação:**
   - Ao alinhar os 3 anéis no centro (ou clicar em "Pular desafio"), `CryptexCanvas.vue` aciona a animação cinematográfica (abertura das tampas, expansão dos anéis, clarão e flash overlay).
   - O evento `unlocked` é emitido, `App.vue` grava a chave no `localStorage` e exibe com fade-in a landing page.
4. **Descarte de Memória Seguro:**
   - Ao desmontar componentes 3D, geometrias, materiais e texturas do Three.js são descartados e `cancelAnimationFrame` é chamado para evitar vazamentos de memória (Memory Leaks).

---

## 4. Integração de Vendas
- **Mentoria O Código da Mente:** [Checkout Hotmart](https://hotmart.com/pt-br/marketplace/produtos/transformacao-imediata/Q90065181S)
- **Ebook Troque e Transforme Sua Comunicação:** [Checkout Hotmart](https://hotmart.com/pt-br/marketplace/produtos/troque-e-transforme-sua-comunicacao/A85697379P?sck=HOTMART_PRODUCT_PAGE)
- Links abertos em nova aba com `target="_blank"` e `rel="noopener noreferrer"`.
