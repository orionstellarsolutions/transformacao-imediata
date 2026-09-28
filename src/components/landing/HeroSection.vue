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

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-heading font-normal leading-tight mb-6 text-white drop-shadow-lg">
          Rompa as <br />
          <span class="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent italic">
            Correntes Invisíveis
          </span>
        </h1>

        <p class="text-gray-300 text-base md:text-lg mb-10 leading-relaxed font-light max-w-xl">
          Você acaba de destrancar a primeira porta. Conheça o método silencioso que grandes líderes
          usam para reescrever suas crenças, eliminar a auto-sabotagem e operar em estado de fluxo contínuo.
        </p>

        <a
          href="#checkout"
          data-testid="hero-cta"
          class="inline-block rounded-sm bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] transition duration-300 hover:bg-white"
        >
          Iniciar Reprogramação
        </a>
      </div>

      <!-- Coluna de Mídia / Preview de Vídeo -->
      <div class="lg:col-span-5 w-full">
        <div
          data-testid="video-preview-card"
          class="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 group cursor-pointer shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-dark-surface"
        >
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Mentoria O Código da Mente"
            loading="lazy"
            class="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition duration-700"
          />

          <!-- Botão Play Estilizado -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-20 h-20 bg-gold/90 rounded-full flex items-center justify-center text-black text-2xl group-hover:scale-110 transition duration-500 shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <svg class="h-8 w-8 ml-1 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
