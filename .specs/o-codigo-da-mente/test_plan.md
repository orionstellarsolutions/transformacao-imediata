# Matriz e Plano de Testes Automatizados: O Código da Mente

## 1. Estratégia de Cobertura
- **Alvo de Cobertura Global:** $\ge 95\%$ em linhas, funções, declarações e ramos.
- **Ferramentas:** Vitest 3 + Vue Test Utils + happy-dom + v8 coverage.
- **Diretriz Orion:** Zero testes manuais. Todos os comportamentos, cliques, emissão de eventos, reatividade e regras de negócio possuem suíte automatizada correspondente.
- **Mocks Controlados:** Mocks da Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`), `localStorage` e renderizador WebGL/Three.js em ambiente headless.

---

## 2. Impedimentos e Devoluções ao PO
- **Status:** **Nenhum impedimento identificado.**
- Todos os critérios de aceite estão formalizados e com comportamento determinístico mapeado.

---

## 3. Matriz Detalhada de Testes

### 3.1 Módulo Cryptex & Puzzle 3D
| ID do Teste | Tipo | Arquivo de Teste | Descrição / Cenário | Critério de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| **TEST-CRYP-001** | Unitário | `src/utils/__tests__/audioSynth.spec.ts` | Disparo de `playTickSound` com criação de oscilador e ganho | `audioContext.createOscillator` e rampas de frequência executadas |
| **TEST-CRYP-002** | Unitário | `src/utils/__tests__/audioSynth.spec.ts` | Disparo de `playLockSound` quando o passo for múltiplo de 10 | Onda quadrada configurada e ganho acionado |
| **TEST-CRYP-003** | Unitário | `src/utils/__tests__/audioSynth.spec.ts` | Tratamento de contexto de áudio em estado `suspended` | `audioCtx.resume()` chamado antes de disparar o som |
| **TEST-CRYP-004** | Unitário | `src/components/cryptex/__tests__/PuzzleControls.spec.ts` | Renderização dos 3 pares de setas e botão "Pular desafio" | 6 botões de seta e botão de skip presentes no DOM |
| **TEST-CRYP-005** | Unitário | `src/components/cryptex/__tests__/PuzzleControls.spec.ts` | Clique nas setas emite evento `rotate(index, direction)` | Evento emitido com índice do anel e direção correta (+1 / -1) |
| **TEST-CRYP-006** | Unitário | `src/components/cryptex/__tests__/PuzzleControls.spec.ts` | Clique em "Pular desafio" dispara alinhamento automático | Evento `skip` emitido e transição disparada |
| **TEST-CRYP-007** | Unitário | `src/components/cryptex/__tests__/PuzzleControls.spec.ts` | Destaque verde (`.ring-aligned`) nos anéis alinhados | Classe CSS aplicada quando `isAligned[index]` for verdadeiro |
| **TEST-CRYP-008** | Unitário | `src/components/cryptex/__tests__/CryptexCanvas.spec.ts` | Montagem e inicialização do canvas Three.js | Instanciação de cena, câmera, luzes e grupo do artefato |
| **TEST-CRYP-009** | Unitário | `src/components/cryptex/__tests__/CryptexCanvas.spec.ts` | Descarte de memória na desmontagem do componente (`unmount`) | `cancelAnimationFrame`, `renderer.dispose()`, descarte de geometrias/materiais |
| **TEST-CRYP-010** | Unitário | `src/components/cryptex/__tests__/CryptexCanvas.spec.ts` | Disparo da sequência cinematográfica de destravamento | Emissão do evento `unlocked` e animações acionadas |

### 3.2 Módulo Landing Page
| ID do Teste | Tipo | Arquivo de Teste | Descrição / Cenário | Critério de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| **TEST-LAND-001** | Unitário | `src/components/landing/__tests__/HeaderNav.spec.ts` | Renderização do logotipo e links de navegação | Links `#metodo`, `#checkout` e CTA renderizados |
| **TEST-LAND-002** | Unitário | `src/components/landing/__tests__/HeroSection.spec.ts` | Renderização do título, copy e card estético de vídeo | Título principal presente, badge de cadeado e botão de CTA |
| **TEST-LAND-003** | Unitário | `src/components/landing/__tests__/MethodSection.spec.ts` | Renderização dos 3 cards de pilares do método | 3 cards presentes com títulos "O Diagnóstico", "A Ruptura" e "A Ascensão" |
| **TEST-LAND-004** | Unitário | `src/components/landing/__tests__/CheckoutSection.spec.ts` | Validação dos links reais da Hotmart (Mentoria e Ebook) | Links externos configurados com `href` correto e `target="_blank"` seguro |
| **TEST-LAND-005** | Unitário | `src/components/landing/__tests__/SiteFooter.spec.ts` | Renderização do copyright da Mentoria | Texto de copyright 2026 presente |

### 3.3 Módulo Integração & Persistência (App.vue)
| ID do Teste | Tipo | Arquivo de Teste | Descrição / Cenário | Critério de Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| **TEST-INT-001** | Integração | `src/__tests__/App.spec.ts` | Carregamento inicial com `localStorage` vazio | Exibe o Cryptex / Splash screen inicialmente |
| **TEST-INT-002** | Integração | `src/__tests__/App.spec.ts` | Carregamento com `localStorage` contendo `cryptex_unlocked = 'true'` | Exibe a landing page diretamente sem o puzzle |
| **TEST-INT-003** | Integração | `src/__tests__/App.spec.ts` | Transição de desbloqueio atualiza `localStorage` e exibe site | Chave salva no storage e landing page revelada |
| **TEST-INT-004** | Integração | `src/__tests__/App.spec.ts` | Obrigatoriedade constitucional do OrionFooter | Componente `OrionFooter` presente na base em todos os estados |
