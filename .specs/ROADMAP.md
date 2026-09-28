# Roadmap do Projeto: Transformação Imediata

## Marco 1: Infraestrutura e Governança [Concluído]
- [x] Configuração da pipeline de CI/CD (GitHub Actions).
- [x] Configuração dos scripts e linters (`lint`, `type-check`, `test:coverage`, `build`).
- [x] Integração das skills e servidores MCP do Cloudflare.
- [x] Autenticação Git e Cloudflare da organização Orion Stellar Solutions.

## Marco 2: Migração e Arquitetura do Site "O Código da Mente" [Em Andamento]
- [x] **Fase 1 (PO):** Extração de requisitos EARS e análise do modelo legado (`modelo/o_c_digo_da_mente_completo.html`).
- [ ] **Fase 2 (Test Planner):** Desenho da matriz de testes unitários e de integração para os componentes do Cryptex e da Landing Page.
- [ ] **Fase 3 (Developer):** Refatoração do HTML/JS para componentes Vue 3 modulares, testes automatizados e commits atômicos por tarefa.
- [ ] **Fase 4 (Quality Reviewer & Security):** Auditoria de código limpo, descarte de memória WebGL e conformidade de segurança.
- [ ] **Fase 5 (Publisher):** Validação final, testes de regressão, build e deploy no Cloudflare Pages.

## Marco 3: Otimizações de Conversão & Performance Mobile [Planejado]
- [ ] Auditoria Lighthouse CI mobile com metas LCP $\le 2.5\text{s}$ e Score $\ge 90$.
- [ ] Integração com gateway de pagamento real / plataforma de checkout.
- [ ] Telemetria e Web Analytics da Cloudflare.
