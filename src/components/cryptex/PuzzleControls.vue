<script setup lang="ts">
export interface RingPosition {
  x: number;
  y: number;
}

const props = withDefaults(
  defineProps<{
    ringPositions?: RingPosition[];
    ringsAligned?: boolean[];
    disabled?: boolean;
  }>(),
  {
    ringPositions: () => [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    ringsAligned: () => [false, false, false],
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: 'rotate', ringIndex: number, direction: 1 | -1): void;
  (e: 'skip'): void;
}>();

function handleRotate(ringIndex: number, direction: 1 | -1) {
  if (props.disabled) return;
  emit('rotate', ringIndex, direction);
}

function handleSkip() {
  if (props.disabled) return;
  emit('skip');
}
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-40 overflow-hidden">
    <!-- Setas Flutuantes dos 3 Anéis -->
    <div
      v-for="(pos, index) in props.ringPositions"
      :key="index"
      :id="`arrow-row-${index}`"
      class="arrow-row absolute flex items-center justify-between pointer-events-none transition-all duration-75"
      :class="{ 'ring-aligned': props.ringsAligned[index] }"
      :style="
        pos.x > 0 && pos.y > 0
          ? { left: `${pos.x}px`, top: `${pos.y}px` }
          : { left: '50%', top: `${35 + index * 10}%` }
      "
    >
      <!-- Seta Esquerda -->
      <button
        type="button"
        :aria-label="`Girar anel ${index + 1} para esquerda`"
        :data-testid="`btn-rotate-left-${index}`"
        class="arrow-btn pointer-events-auto p-3 text-gold transition-transform hover:scale-125 focus:outline-none disabled:opacity-50"
        :disabled="props.disabled"
        @click="handleRotate(index, 1)"
      >
        <svg class="h-8 w-8 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Seta Direita -->
      <button
        type="button"
        :aria-label="`Girar anel ${index + 1} para direita`"
        :data-testid="`btn-rotate-right-${index}`"
        class="arrow-btn pointer-events-auto p-3 text-gold transition-transform hover:scale-125 focus:outline-none disabled:opacity-50"
        :disabled="props.disabled"
        @click="handleRotate(index, -1)"
      >
        <svg class="h-8 w-8 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Painel de Desbloqueio Inferior -->
    <div
      id="splash-screen"
      class="fixed bottom-[4vh] left-0 w-full flex justify-center pointer-events-none z-50 px-4"
    >
      <div
        id="puzzle-panel"
        class="glass-panel pointer-events-auto bg-dark-surface/70 backdrop-blur-md border border-gold/30 rounded-lg p-6 max-w-xs w-full text-center shadow-2xl"
      >
        <h2 class="text-xs uppercase tracking-widest text-gold mb-2 font-semibold">
          Acesso Restrito
        </h2>
        <p class="text-gray-300 text-sm font-light mb-5 leading-relaxed">
          A chave não está fora, está dentro.<br />
          Use as setas para <strong class="text-white font-medium">alinhar os marcadores</strong> ao centro do cilindro.
        </p>
        <button
          id="btn-skip"
          type="button"
          data-testid="btn-skip"
          :disabled="props.disabled"
          class="text-xs text-gray-400 hover:text-gold uppercase tracking-widest transition duration-300 underline underline-offset-4 focus:outline-none disabled:opacity-50"
          @click="handleSkip"
        >
          Pular desafio
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arrow-row {
  transform: translate(-50%, -50%);
  width: 320px;
}

@media (max-width: 768px) {
  .arrow-row {
    width: 270px;
  }
}

@keyframes arrowPulse {
  0% {
    transform: scale(1);
    opacity: 0.85;
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
    filter: drop-shadow(0 0 22px rgba(212, 175, 55, 0.9));
  }
  100% {
    transform: scale(1);
    opacity: 0.85;
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
  }
}

.arrow-btn {
  animation: arrowPulse 2s infinite ease-in-out;
}

.ring-aligned .arrow-btn {
  color: #4ade80 !important;
  animation: alignedPulse 1.5s infinite alternate !important;
}

@keyframes alignedPulse {
  from {
    transform: scale(1);
    opacity: 0.85;
    filter: drop-shadow(0 0 12px rgba(74, 222, 128, 0.5));
  }
  to {
    transform: scale(1.15);
    opacity: 1;
    filter: drop-shadow(0 0 25px rgba(74, 222, 128, 0.95));
  }
}
</style>
