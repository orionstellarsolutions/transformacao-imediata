<script setup lang="ts">
// HeroSection - Seção de Apresentação Principal e Quebra de Padrão
</script>

<template>
  <section class="relative min-h-[85vh] flex items-center pt-16 pb-20 overflow-hidden">
    <div class="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
      <!-- Coluna de Texto e CTA -->
      <div class="lg:col-span-7">
        <div
          class="inline-flex items-center gap-3 mb-6 bg-dark-surface/60 border border-gold/30 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm"
        >
          <!-- Ícone de Cadeado Aberto -->
          <svg class="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          <span class="text-xs uppercase tracking-widest text-gold font-medium">
            O Cadeado foi aberto
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-normal leading-tight mb-6 text-white drop-shadow-lg">
          CURSO <br />
          TRANSFORMAÇÃO <br />
          <span class="text-gold italic font-heading">
            IMEDIATA
          </span>
        </h1>

        <p class="text-gray-300 text-base md:text-lg mb-10 leading-relaxed font-light max-w-xl">
          Curso baseado no maior treinamento de Inteligência Emocional da América Latina. Entenda que a ansiedade pode ser controlada através de passos simples para compreender em que ponto está e onde quer chegar, trilhando esse caminho com leveza e determinação.
        </p>

        <a
          href="#checkout"
          data-testid="hero-cta"
          class="inline-block rounded-sm bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition duration-300 hover:bg-white"
        >
          Iniciar Transformação
        </a>
      </div>

      <!-- Coluna de Mídia / Imagem Oficial da Instrutora Laís Gulin -->
      <div class="lg:col-span-5 w-full">
        <div
          data-testid="video-preview-card"
          class="relative w-full max-w-md mx-auto aspect-[4/5] rounded-xl overflow-hidden border border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-dark-surface"
        >
          <img
            src="/images/lais_hero_final.png"
            alt="Curso Transformação Imediata - Laís Gulin"
            class="w-full h-full object-cover transition duration-700"
          />
        </div>
      </div>
    </div>
  </section>
</template>
