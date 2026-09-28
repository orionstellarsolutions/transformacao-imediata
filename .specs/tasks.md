# Plano de Implementação: O Código da Mente (.specs/tasks.md)

Este plano decompõe a migração de `modelo/o_c_digo_da_mente_completo.html` em tarefas atômicas sequenciais e independentes, orientando estritamente **um commit atômico por tarefa** para o Desenvolvedor.

---

### Task 1: Dependências e Configuração de Estilo
- **Escopo:** Instalar `three` e `@types/three` como dependências de produção/desenvolvimento. Configurar tipografia (`Cinzel`, `Inter`) e tokens de cores (`gold`, `dark`) no `tailwind.config.js` e `index.html`.
- **Arquivos:** `package.json`, `tailwind.config.js`, `index.html`.
- **Commit Atômico:** `feat(REQ-NFR-003-task1): adicionar three.js e configurar tokens tailwind cinzel e gold`

---

### Task 2: Utilitário de Síntese de Áudio (Web Audio API)
- **Escopo:** Implementar `src/utils/audioSynth.ts` para reprodução sintetizada de cliques de rotação (`playTickSound`) e trava de alinhamento (`playLockSound`), com tratamento para contexto suspenso. Criar suíte de testes unitários com mocks de `AudioContext`.
- **Arquivos:** `src/utils/audioSynth.ts`, `src/utils/__tests__/audioSynth.spec.ts`.
- **Commit Atômico:** `feat(REQ-CRYP-002-task2): implementar utilitario de sintese de audio com testes unitarios`

---

### Task 3: Controles do Puzzle e Splash Screen
- **Escopo:** Criar o componente `src/components/cryptex/PuzzleControls.vue` contendo o painel glassmorphic, setas flutuantes 2D projetadas, botão "Pular desafio", eventos de rotação, indicação de alinhamento verde (`.ring-aligned`) e gerenciamento de persistência no `localStorage` (`cryptex_unlocked`). Criar testes unitários com Vue Test Utils.
- **Arquivos:** `src/components/cryptex/PuzzleControls.vue`, `src/components/cryptex/__tests__/PuzzleControls.spec.ts`.
- **Commit Atômico:** `feat(REQ-CRYP-003-task3): criar controles 2d do puzzle e persistencia localstorage`

---

### Task 4: Cena e Artefato 3D Cryptex (Three.js)
- **Escopo:** Implementar o componente `src/components/cryptex/CryptexCanvas.vue` gerenciando a cena Three.js: cilindro Cryptex de 3 anéis com detalhes dourados, núcleo emissivo, 35 chaves e cadeados procedurais flutuantes, poeira de partículas, parallax responsivo, sequência de destravamento e descarte rigoroso de memória (geometrias, materiais, texturas e cancelamento do loop de animação). Criar testes correspondentes.
- **Arquivos:** `src/components/cryptex/CryptexCanvas.vue`, `src/components/cryptex/__tests__/CryptexCanvas.spec.ts`.
- **Commit Atômico:** `feat(REQ-CRYP-001-task4): implementar cena three.js do cryptex com ciclo de vida seguro`

---

### Task 5: Componentes Modulares da Landing Page
- **Escopo:** Criar os componentes modulares da landing page:
  - `src/components/landing/HeaderNav.vue`: Barra de navegação sticky com blur e logotipo.
  - `src/components/landing/HeroSection.vue`: Título display, copy persuasiva, CTA e card estético de vídeo.
  - `src/components/landing/MethodSection.vue`: 3 pilares do método de arquitetura mental.
  - `src/components/landing/CheckoutSection.vue`: Oferta com botões e links diretos para a Hotmart (Mentoria e Ebook).
  - `src/components/landing/SiteFooter.vue`: Rodapé local de copyright.
  Criar testes unitários para cada componente garantindo renderização e links corretos.
- **Arquivos:** `src/components/landing/*.vue`, `src/components/landing/__tests__/*.spec.ts`.
- **Commit Atômico:** `feat(REQ-LAND-001-task5): modularizar componentes da landing page com links hotmart`

---

### Task 6: Orquestração no App.vue e Integração do OrionFooter
- **Escopo:** Integrar no `src/App.vue` a lógica de orquestração entre a experiência 3D de entrada e a exibição da landing page, respeitando a persistência de desbloqueio e inserindo obrigatoriamente o componente oficial `src/components/OrionFooter.vue`. Criar testes de integração ponta a ponta de montagem e alternância de estado.
- **Arquivos:** `src/App.vue`, `src/__tests__/App.spec.ts`.
- **Commit Atômico:** `feat(REQ-LAND-005-task6): orquestrar desbloqueio do cryptex e landing page com orion footer`

---

### Task 7: Limpeza de Legado e Auditoria de Qualidade
- **Escopo:** Conforme a Skill `/migrate-html`, remover o arquivo legado `modelo/o_c_digo_da_mente_completo.html`. Executar validações de linters (`npm run lint`), tipos estáticos (`npm run type-check`), cobertura completa (`npm run test:coverage` $\ge 95\%$) e build de produção (`npm run build`).
- **Arquivos:** `modelo/o_c_digo_da_mente_completo.html`, documentação em `docs/arquitetura/visao_geral.md`.
- **Commit Atômico:** `chore(cleanup-task7): remover modelo legado html e consolidar auditoria de qualidade`
