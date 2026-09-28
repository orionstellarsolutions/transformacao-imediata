<script setup lang="ts">
// MethodSection - Os 3 Pilares da Arquitetura Mental
const pillars = [
  {
    step: '01',
    title: 'O Diagnóstico',
    description: 'Mapeamento das correntes invisíveis e crenças que ancoram seus resultados atuais.',
  },
  {
    step: '02',
    title: 'A Ruptura',
    description: 'Técnicas de reprocessamento neural para desativar os mecanismos de auto-sabotagem.',
  },
  {
    step: '03',
    title: 'A Ascensão',
    description: 'Instalação de novos paradigmas de alta performance e atração de oportunidades.',
  },
];
</script>

<template>
  <section
    id="metodo"
    class="relative z-10 border-y border-white/5 bg-dark-surface/80 py-24 md:py-32 backdrop-blur-md"
  >
    <div class="container mx-auto px-6 text-center max-w-4xl">
      <!-- Ícone Chave -->
      <div class="flex justify-center mb-6">
        <svg class="h-10 w-10 text-gold opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </div>

      <h2 class="font-heading text-3xl md:text-5xl font-normal leading-tight text-white mb-6">
        Não é motivação. <br />
        <span class="text-gold">É arquitetura mental.</span>
      </h2>

      <p class="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-16 max-w-2xl mx-auto">
        Muitos tentam mudar suas ações, mas falham porque a estrutura invisível da mente continua a mesma.
        Este programa é um upgrade no seu sistema operacional humano. Destranque bloqueios financeiros,
        emocionais e de performance.
      </p>

      <!-- Grid dos 3 Pilares -->
      <div class="grid md:grid-cols-3 gap-8 text-left">
        <div
          v-for="pillar in pillars"
          :key="pillar.step"
          class="group rounded-sm border border-white/10 bg-dark-surface/90 p-8 transition duration-300 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        >
          <span
            class="block font-heading text-3xl text-gold opacity-50 transition group-hover:opacity-100 mb-4"
          >
            {{ pillar.step }}
          </span>
          <h3 class="text-sm font-semibold uppercase tracking-widest text-white mb-3">
            {{ pillar.title }}
          </h3>
          <p class="text-sm font-light leading-relaxed text-gray-400">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
