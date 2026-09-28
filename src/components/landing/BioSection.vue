<script setup lang="ts">
// BioSection - Apresentação oficial da mentora Laís Gulin conforme o vídeo de referência
</script>

<template>
  <section id="sobre" class="relative z-10 py-24 md:py-32 bg-dark-surface/40">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <!-- Foto Circular com Moldura Dourada -->
        <div class="shrink-0 relative">
          <div class="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-gold/60 to-gold/10 blur-sm"></div>
          <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_35px_rgba(212,175,55,0.25)]">
            <img
              src="/images/lais_avatar_circle.png"
              alt="Laís Gulin - Mentora e Desenvolvedora Humana"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Conteúdo Biográfico -->
        <div class="text-center md:text-left flex-1">
          <div class="inline-block rounded-full bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Sua Mentora
          </div>
          <h2 class="font-heading text-3xl md:text-4xl font-normal text-white mb-2">
            LAÍS GULIN
          </h2>
          <p class="text-xs md:text-sm font-semibold tracking-wider text-gold/90 uppercase mb-6">
            Analista Comportamental, Terapeuta Organizacional e Desenvolvedora Humana
          </p>

          <div class="space-y-4 text-gray-300 text-sm md:text-base font-light leading-relaxed">
            <p>
              Com anos de dedicação ao estudo da mente e do comportamento humano, Laís Gulin estruturou
              uma metodologia direta e transformadora para conduzir você para fora dos ciclos de ansiedade e insegurança.
            </p>
            <p>
              Unindo inteligência emocional prática, neurociência aplicada e alinhamento de comunicação,
              sua missão é capacitar indivíduos a assumirem o comando consciente de suas decisões,
              alcançando clareza mental e paz de espírito.
            </p>
          </div>

          <!-- Citação Destacada -->
          <div class="mt-6 pt-6 border-t border-white/10">
            <blockquote class="italic text-gold text-base md:text-lg font-heading">
              “O meu viver é o ponto para o seu crescer.”
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
