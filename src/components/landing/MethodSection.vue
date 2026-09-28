<script setup lang="ts">
// MethodSection - Os 3 Pilares do Método
const pillars = [
  {
    step: '01',
    title: 'CONTROLE EMOCIONAL',
    description:
      'Técnicas que te ajudem líderes a entender e controlar a comunicação, a autoliderança e o perfeccionismo.',
  },
  {
    step: '02',
    title: 'CONEXÃO CÉREBRO-CORAÇÃO',
    description:
      'Desenvolvimento de sua sensibilidade através da compreensão profunda dessa conexão vital.',
  },
  {
    step: '03',
    title: 'SAÚDE INTEGRAL',
    description:
      'Fortalecimento da sua saúde mental e física para uma vida congruente, produtiva e leve.',
  },
];
</script>

<template>
  <section
    id="metodo"
    class="relative z-10 border-y border-white/5 bg-dark-surface/80 py-20 md:py-28 backdrop-blur-md"
  >
    <div class="container mx-auto px-6 text-center max-w-5xl">
      <!-- Ícone Raio Dourado -->
      <div class="flex justify-center mb-4">
        <svg class="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>

      <h2 class="font-heading text-2xl md:text-4xl font-normal leading-tight text-white mb-4 uppercase tracking-wider">
        Controle e Gestão das Emoções <br />
        <span class="text-gold">em Passos Simples</span>
      </h2>

      <p class="text-gray-300 font-light text-sm md:text-base leading-relaxed mb-16 max-w-2xl mx-auto">
        Você desenvolverá a sua confiança e ampliará a sua auto estima, aprimorará a sua comunicação e desenhará suas crenças fortalecedoras.
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
