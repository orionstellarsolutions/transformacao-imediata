<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CryptexCanvas from './components/cryptex/CryptexCanvas.vue';
import PuzzleControls from './components/cryptex/PuzzleControls.vue';
import type { RingPosition } from './components/cryptex/PuzzleControls.vue';
import HeaderNav from './components/landing/HeaderNav.vue';
import HeroSection from './components/landing/HeroSection.vue';
import MethodSection from './components/landing/MethodSection.vue';
import CheckoutSection from './components/landing/CheckoutSection.vue';
import SiteFooter from './components/landing/SiteFooter.vue';
import OrionFooter from './components/OrionFooter.vue';

const STORAGE_KEY = 'cryptex_unlocked';

function checkInitialUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

const isUnlocked = ref<boolean>(checkInitialUnlocked());
const cryptexRef = ref<InstanceType<typeof CryptexCanvas> | null>(null);

const ringPositions = ref<RingPosition[]>([
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
]);
const ringsAligned = ref<boolean[]>([false, false, false]);

function onUpdateRingPositions(positions: RingPosition[]) {
  ringPositions.value = positions;
}

function onUpdateRingsAligned(aligned: boolean[]) {
  ringsAligned.value = aligned;
}

function onRotate(ringIndex: number, direction: 1 | -1) {
  cryptexRef.value?.rotateRing(ringIndex, direction);
}

function onSkip() {
  cryptexRef.value?.skipChallenge();
}

function onUnlocked() {
  isUnlocked.value = true;
  try {
    localStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Storage desabilitado ou em modo anônimo estrito
  }
}
</script>

<template>
  <div class="relative min-h-screen bg-dark text-white selection:bg-gold selection:text-black">
    <!-- Cena 3D de Fundo e Transição (Sempre ativa em segundo plano) -->
    <CryptexCanvas
      ref="cryptexRef"
      :is-unlocked="isUnlocked"
      @update-ring-positions="onUpdateRingPositions"
      @update-rings-aligned="onUpdateRingsAligned"
      @unlocked="onUnlocked"
    />

    <!-- Controles do Puzzle e Tela de Acesso Restrito (Exibidos apenas antes de destravar) -->
    <PuzzleControls
      v-if="!isUnlocked"
      :ring-positions="ringPositions"
      :rings-aligned="ringsAligned"
      @rotate="onRotate"
      @skip="onSkip"
    />

    <!-- Site Principal da Mentoria (Renderizado no DOM para SEO e LCP, revelado com fade-in) -->
    <main
      id="main-site"
      class="relative z-10 transition-opacity duration-1000 ease-out"
      :class="{
        'opacity-100 pointer-events-auto': isUnlocked,
        'opacity-0 pointer-events-none select-none': !isUnlocked,
      }"
    >
      <!-- Efeito de iluminação e vinheta de fundo do site -->
      <div class="site-backdrop"></div>

      <HeaderNav />
      <HeroSection />
      <MethodSection />
      <CheckoutSection />
      <SiteFooter />
    </main>

    <!-- Banner Obrigatório da Orion Stellar Solutions na base de todas as telas -->
    <div class="relative z-30">
      <OrionFooter />
    </div>
  </div>
</template>
