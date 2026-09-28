<script setup lang="ts">
// CheckoutSection - Oferta Principal da Mentoria e Ebook Complementar
const HOTMART_MENTORIA_URL =
  'https://hotmart.com/pt-br/marketplace/produtos/transformacao-imediata/Q90065181S';
const HOTMART_EBOOK_URL =
  'https://hotmart.com/pt-br/marketplace/produtos/troque-e-transforme-sua-comunicacao/A85697379P?sck=HOTMART_PRODUCT_PAGE';
</script>

<template>
  <section id="checkout" class="relative z-10 py-24 md:py-32 text-center">
    <div class="container mx-auto px-6 max-w-4xl">
      <h2 class="font-heading text-4xl md:text-5xl font-normal mb-6 text-white">
        Sua Chave Mestra
      </h2>
      <p class="text-gray-300 mb-12 max-w-lg mx-auto font-light leading-relaxed">
        Junte-se a um grupo exclusivo de líderes que já reprogramaram seus destinos através do método.
      </p>

      <div class="grid md:grid-cols-12 gap-8 items-stretch max-w-3xl mx-auto">
        <!-- Card Principal da Mentoria -->
        <div
          class="md:col-span-8 rounded-lg border border-gold/50 bg-dark-surface/90 p-8 md:p-10 backdrop-blur-md shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col justify-between"
        >
          <div>
            <div class="inline-block rounded-full bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold mb-4">
              Mentoria Completa
            </div>
            <h3 class="font-heading text-2xl md:text-3xl text-white mb-2">
              Acesso Vitalício
            </h3>
            <p class="text-xs uppercase tracking-widest text-gray-400 mb-6">
              Vagas limitadas por turma
            </p>

            <div class="font-heading font-bold text-gold text-4xl md:text-5xl my-6">
              12x R$ 97<span class="text-xl text-gray-400">,14</span>
            </div>
          </div>

          <div>
            <!-- Botão Direto para o Checkout da Hotmart -->
            <a
              :href="HOTMART_MENTORIA_URL"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-checkout-mentoria"
              class="block w-full rounded-sm bg-gold py-4 text-center text-sm font-bold uppercase tracking-widest text-black transition duration-300 hover:bg-white shadow-lg mb-4"
            >
              Destrancar Meu Acesso
            </a>

            <!-- Selo de Segurança -->
            <div class="flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg class="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Ambiente 100% Seguro · Hotmart</span>
            </div>
          </div>
        </div>

        <!-- Card Ebook Complementar -->
        <div
          class="md:col-span-4 rounded-lg border border-white/10 bg-dark-surface/70 p-6 backdrop-blur-md flex flex-col justify-between text-left"
        >
          <div>
            <div class="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
              Leitura Essencial
            </div>
            <h4 class="font-heading text-lg text-white mb-2 leading-snug">
              Troque e Transforme Sua Comunicação
            </h4>
            <p class="text-xs text-gray-400 font-light leading-relaxed mb-4">
              Domine as técnicas práticas de expressão e persuasão para acelerar sua transformação.
            </p>
          </div>

          <a
            :href="HOTMART_EBOOK_URL"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-checkout-ebook"
            class="block w-full text-center rounded-sm border border-gold/60 py-3 text-xs font-semibold uppercase tracking-widest text-gold hover:bg-gold hover:text-black transition duration-200"
          >
            Ver Ebook
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
