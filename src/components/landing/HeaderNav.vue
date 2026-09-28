<script setup lang="ts">
// HeaderNav - Navegação Superior Sticky da Mentoria O Código da Mente
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-white/10 bg-dark-surface/80 backdrop-blur-md transition-all"
  >
    <div class="container mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logotipo -->
      <a href="#" class="font-heading text-xl md:text-2xl font-bold tracking-widest text-white">
        MENTE <span class="text-gold">LIVRE</span>
      </a>

      <!-- Links de Navegação -->
      <nav class="hidden md:flex gap-8">
        <a
          href="#metodo"
          class="text-xs uppercase tracking-widest text-gray-300 hover:text-gold transition duration-200"
        >
          O Método
        </a>
        <a
          href="#checkout"
          class="text-xs uppercase tracking-widest text-gray-300 hover:text-gold transition duration-200"
        >
          Programa
        </a>
      </nav>

      <!-- CTA Superior -->
      <a
        href="#checkout"
        data-testid="header-cta"
        class="rounded-sm border border-gold bg-transparent px-5 py-2 text-xs font-bold uppercase tracking-widest text-gold transition duration-300 hover:bg-gold hover:text-black"
      >
        Garantir Vaga
      </a>
    </div>
  </header>
</template>
