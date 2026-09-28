<script setup lang="ts">
// BioSection - Apresentação oficial da mentora Laís Gulin conforme o vídeo de referência
</script>

<template>
  <section id="sobre" class="relative z-10 py-24 md:py-32 bg-dark-surface/40">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <!-- Foto Circular Oficial da Laís Gulin -->
        <div class="shrink-0 relative">
          <div class="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
            <img
              src="/images/lais_avatar_circle.png"
              alt="Laís Gulin - Analista Comportamental e Desenvolvedora Humana"
              class="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Conteúdo Biográfico Oficial -->
        <div class="text-center md:text-left flex-1">
          <h2 class="font-heading text-3xl md:text-4xl font-normal text-white mb-2">
            LAÍS GULIN
          </h2>
          <p class="text-xs md:text-sm font-semibold tracking-wider text-gold/90 uppercase mb-6">
            Analista Comportamental, Terapeuta Organizacional e Desenvolvedora Humana
          </p>

          <div class="space-y-4 text-gray-300 text-sm md:text-base font-light leading-relaxed">
            <p>
              Há mais de 11 anos, ajudo pessoas e empresas a conquistarem alta performance, bem-estar e fluidez —
              unindo o comando emocional, a comunicação eficaz e a transformação de crenças por meio das emoções.
            </p>
            <p>
              Minha atuação é guiada por ferramentas integrativas vindas de diferentes partes do mundo.
              Utilizo palavras, sons, movimentos, músicas, florais, leituras e, principalmente, a escuta do
              corpo e da mente para facilitar processos profundos de autoconhecimento e mudança.
            </p>
          </div>

          <!-- Citação Oficial com Barra Vertical Dourada -->
          <div class="mt-6 border-l-2 border-gold pl-4 text-left">
            <blockquote class="italic text-gold text-sm md:text-base font-heading">
              "O meu viver é a ponte para o seu crescer."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
