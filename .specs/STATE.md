# Estado do Projeto e Histórico de Decisões (.specs/STATE.md)

## Estado Atual
- **Fase**: Marco 2 - Fase 4 & 5 (Quality Reviewer & Security Auditor / Auditoria Final)
- **Status Geral**: Implementação das 7 tarefas atômicas concluída pelo Developer com commits semânticos por tarefa. Modelo legado HTML removido conforme `/migrate-html`. Validações locais (lint, type-check, vitest coverage e build) 100% aprovadas. Passagem de bastão para auditoria de Clean Code, SOLID, OWASP e deploy no Cloudflare Pages.

---

## Decisões Técnicas e de Negócio (Marco 2 - O Código da Mente)
* **Checkout Hotmart:** Botão de compra principal configurado com a URL real da Hotmart (`https://hotmart.com/pt-br/marketplace/produtos/transformacao-imediata/Q90065181S`) e oferta de Ebook adicional (`https://hotmart.com/pt-br/marketplace/produtos/troque-e-transforme-sua-comunicacao/A85697379P?sck=HOTMART_PRODUCT_PAGE`).
* **Persistência de Desbloqueio:** O estado de destravamento do Cryptex é salvo em `localStorage` (`cryptex_unlocked = 'true'`), permitindo que visitantes recorrentes acessem diretamente a landing page sem repetição do puzzle 3D.
* **Dívida Técnica do Vídeo:** O card de vídeo no Hero será mantido esteticamente como preview/thumbnail no momento, registrando a integração de player real (YouTube / Vimeo / Cloudflare Stream) no arquivo `docs/tarefas/dividas_tecnicas.md`.
* **Plano de Implementação:** Quebra em 7 micro-tarefas atômicas gravadas em `.specs/tasks.md` para suportar 1 commit atômico por tarefa.

---

## Registro de Ocorrências e Dívidas Técnicas

### Incidente CI/CD #001 - Script de Lint Ausente no Pipeline
* **Ocorrência:** Ausência do script `lint` no `package.json` provocando a falha no pipeline de CI/CD (GitHub Actions `npm run lint`).
* **Resolução:** Adicionado o comando de lint (`"lint": "eslint ."`) aos scripts do `package.json`, configurado `eslint.config.mjs` compatível com a stack e instaladas as dependências de desenvolvimento necessárias (`eslint`).
* **Estado:** Resolvido e validado com commit atômico (`4d2f4c3`).
* **Validação Local:** `npm run lint` executado com código de retorno 0.

### Incidente CI/CD #002 - Ausência dos Scripts de Checagem Estática, Testes, Build e Orçamento Lighthouse
* **Ocorrência:** Falha crítica na etapa `npm run type-check` por script inexistente, com risco subsequente de quebras em `test:coverage`, `build` e na auditoria Lighthouse CI.
* **Resolução:** 
  1. Adicionados scripts `type-check` (`vue-tsc --noEmit`), `test:coverage` (`vitest run --coverage`), `build` (`vite build`) e `preview` (`vite preview --port 3000`) ao `package.json`.
  2. Configurado `tsconfig.json` e suporte estrito para TypeScript e SFCs Vue 3.
  3. Configurado Vitest com provedor de cobertura v8 (`vitest.config.ts`), criando testes unitários com cobertura de 100% para componentes (`OrionFooter.spec.ts` e `App.spec.ts`).
  4. Configurado bundler Vite (`vite.config.ts`), ponto de entrada SPA (`main.ts`, `App.vue` com `OrionFooter`) e montagem HTML.
  5. Criado arquivo de orçamento de performance móvel (`lighthouse-budget.json`) e adicionado `startServerCommand: npm run preview` no workflow `.github/workflows/ci.yml`.
* **Estado:** Resolvido e validado com commits atômicos por tarefa.
* **Validação Local:** `npm run lint`, `npm run type-check`, `npm run test:coverage` e `npm run build` executados com 100% de aprovação.

---

## Configurações de Ambiente e Integrações

### Configuração de Agente: Cloudflare Skills & Servidores MCP
* **Origem:** Instruções oficiais de setup Cloudflare (`https://developers.cloudflare.com/agent-setup/prompt.md`).
* **Ações Executadas:**
  1. Instalação das 14 skills oficiais do Cloudflare (`wrangler`, `workers-best-practices`, `durable-objects`, `agents-sdk`, `web-perf`, etc.) via `skills add` global (`~/.agents/skills`) e local (`.agents/skills/`).
  2. Registro dos 5 servidores MCP da Cloudflare (`cloudflare`, `cloudflare-docs`, `cloudflare-bindings`, `cloudflare-builds`, `cloudflare-observability`):
     - Globalmente em `~/.gemini/config/mcp_config.json` (Antigravity).
     - No repositório em `.cursor/mcp.json` e `.vscode/mcp.json`.
* **Estado:** Configuração concluída e pronta para autenticação OAuth sob demanda.

