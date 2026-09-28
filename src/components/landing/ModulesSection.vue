<script setup lang="ts">
import { ref } from 'vue';

interface ModuleItem {
  id: number;
  number: string;
  title: string;
  description: string;
  duration?: string;
}

const modules: ModuleItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Boas Vindas',
    description:
      'Apresentação da mentoria, dinâmica do método e orientações práticas para extrair o máximo potencial da sua jornada.',
  },
  {
    id: 2,
    number: '02',
    title: 'Introdução',
    description:
      'Fundamentos da Inteligência Emocional e a neurociência por trás da ansiedade e da tomada consciente de decisões.',
  },
  {
    id: 3,
    number: '03',
    title: 'Aula 1: Como ser o/a real comandante da sua vida',
    description:
      'Assuma a responsabilidade pelas suas escolhas, rompendo com o papel de espectador e criando autonomia emocional.',
  },
  {
    id: 4,
    number: '04',
    title: 'Aula 2: Tudo em você comunica, observe-se',
    description:
      'A linguagem do corpo, postura e microexpressões: como sua fisiologia molda seus sentimentos e a percepção dos outros.',
  },
  {
    id: 5,
    number: '05',
    title: 'Aula 3: Arquitete e construa o seu eu ideal',
    description:
      'Mapeamento de identidade e exercícios práticos para estruturar sua melhor versão com clareza e determinação.',
  },
  {
    id: 6,
    number: '06',
    title: 'Aula 4: Domine as palavras e tenha o poder nas suas mãos',
    description:
      'O impacto neurobiológico do vocabulário habitual e como transformar a comunicação em um instrumento de autoridade e paz.',
  },
  {
    id: 7,
    number: '07',
    title: 'Aula 5: Como concretizar objetivos grandiosos',
    description:
      'Plano de ação estruturado para tirar planos do papel com constância, foco e sem a paralisia do perfeccionismo.',
  },
  {
    id: 8,
    number: '08',
    title: 'Aula 6: Entenda seu propósito de vida',
    description:
      'Alinhamento com seus valores nucleares para encontrar direção, motivação duradoura e significado nas tarefas diárias.',
  },
  {
    id: 9,
    number: '09',
    title: 'Aula 7: Troque e transforme o que te limita',
    description:
      'Identificação de gatilhos automáticos e substituição sistemática de crenças restritivas por crenças fortalecedoras.',
  },
  {
    id: 10,
    number: '10',
    title: 'Aula 8: Como ir além',
    description:
      'Técnicas de resiliência e alta performance emocional para superar platôs de desânimo e expandir seus horizontes.',
  },
  {
    id: 11,
    number: '11',
    title: 'Aula 9: Avaliação da própria jornada',
    description:
      'Consolidação dos resultados, autoanálise comparativa antes/depois e o mapa contínuo para manter os ganhos.',
  },
  {
    id: 12,
    number: '12',
    title: 'Bônus: Consciência de Sua Comunicação com Juliana Karam',
    description:
      'Masterclass exclusiva com a convidada Juliana Karam aprofundando presença, oratória autêntica e conexão humana.',
  },
];

const openModuleId = ref<number | null>(null);

function toggleModule(id: number) {
  openModuleId.value = openModuleId.value === id ? null : id;
}
</script>

<template>
  <section id="conteudo" class="relative z-10 py-24 md:py-32 bg-dark/60">
    <div class="container mx-auto px-6 max-w-4xl">
      <!-- Título da Seção -->
      <div class="text-center mb-16">
        <h2 class="font-heading text-3xl md:text-5xl font-normal text-gold mb-4 tracking-wider">
          CONTEÚDO DO CURSO
        </h2>
        <div class="h-0.5 w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        <p class="mt-4 text-sm md:text-base text-gray-300 max-w-lg mx-auto font-light">
          Um roteiro completo em 12 etapas para você destravar seu potencial e liderar suas emoções.
        </p>
      </div>

      <!-- Lista de Módulos em Acordeão -->
      <div class="space-y-4">
        <div
          v-for="item in modules"
          :key="item.id"
          class="rounded-lg border transition-all duration-300 overflow-hidden"
          :class="[
            openModuleId === item.id
              ? 'border-gold bg-dark-surface/90 shadow-[0_0_20px_rgba(212,175,55,0.12)]'
              : 'border-white/10 bg-dark-surface/50 hover:border-gold/40 hover:bg-dark-surface/70',
          ]"
        >
          <!-- Cabeçalho do Card (Clicável) -->
          <button
            type="button"
            class="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
            :aria-expanded="openModuleId === item.id"
            :data-testid="`module-header-${item.id}`"
            @click="toggleModule(item.id)"
          >
            <div class="flex items-center space-x-4 md:space-x-6 pr-4">
              <span
                class="font-heading text-base md:text-lg font-bold shrink-0 transition-colors"
                :class="openModuleId === item.id ? 'text-gold' : 'text-gray-400'"
              >
                {{ item.number }}
              </span>
              <span
                class="font-heading text-sm md:text-base tracking-wide transition-colors"
                :class="openModuleId === item.id ? 'text-white font-semibold' : 'text-gray-200'"
              >
                {{ item.title }}
              </span>
            </div>

            <!-- Ícone de Expandir/Recolher -->
            <div
              class="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300"
              :class="[
                openModuleId === item.id
                  ? 'border-gold text-gold rotate-180 bg-gold/10'
                  : 'border-white/20 text-gray-400',
              ]"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <!-- Corpo do Card Expandido -->
          <div
            v-if="openModuleId === item.id"
            class="px-6 pb-6 pt-2 border-t border-white/5 text-gray-300 text-sm md:text-base font-light leading-relaxed animate-fade-in"
            :data-testid="`module-body-${item.id}`"
          >
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
