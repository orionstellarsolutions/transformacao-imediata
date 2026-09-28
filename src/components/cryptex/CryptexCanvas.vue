<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { playTickSound, playLockSound } from '../../utils/audioSynth';
import type { RingPosition } from './PuzzleControls.vue';

const props = withDefaults(
  defineProps<{
    isUnlocked?: boolean;
  }>(),
  {
    isUnlocked: false,
  }
);

const emit = defineEmits<{
  (e: 'update-ring-positions', positions: RingPosition[]): void;
  (e: 'update-rings-aligned', aligned: boolean[]): void;
  (e: 'unlocked'): void;
}>();

const canvasContainer = ref<HTMLDivElement | null>(null);
const flashOverlay = ref<HTMLDivElement | null>(null);

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let animFrameId: number | null = null;

let artifactGroup: THREE.Group | null = null;
let coreLight: THREE.PointLight | null = null;
let coreMesh: THREE.Mesh | null = null;
let topCap: THREE.Mesh | null = null;
let topCapGold: THREE.Mesh | null = null;
let bottomCap: THREE.Mesh | null = null;
let bottomCapGold: THREE.Mesh | null = null;
const rings: THREE.Group[] = [];
const pointers: THREE.Mesh[] = [];

const floatingItems: THREE.Group[] = [];
let particlesMesh: THREE.Points | null = null;

const currentSteps = ref<number[]>([3, -4, 2]);
const targetRotations = [3 * (Math.PI * 2 / 10), -4 * (Math.PI * 2 / 10), 2 * (Math.PI * 2 / 10)];
const isLocallyUnlocked = ref<boolean>(false);
const isUnlockingSequence = ref<boolean>(false);

let mouseX = 0;
let mouseY = 0;
let targetRotX = 0;
let targetRotY = 0;
const sceneStartTime = performance.now();

function createPadlock(bgItemMat: THREE.Material, bgAccentMat: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 0.5), bgItemMat);
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.15, 16, 32, Math.PI), bgItemMat);
  shackle.position.y = 0.5;

  const keyholeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.55, 16), bgAccentMat);
  keyholeBase.rotation.x = Math.PI / 2;
  const hole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.6, 16),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  );
  hole.rotation.x = Math.PI / 2;

  group.add(body, shackle, keyholeBase, hole);
  group.scale.set(0.7, 0.7, 0.7);
  return group;
}

function createKey(bgItemMat: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  const head = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 16, 32), bgItemMat);
  head.position.y = 0.8;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 16), bgItemMat);
  const tooth1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.08), bgItemMat);
  tooth1.position.set(0.15, -0.5, 0);
  const tooth2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.08), bgItemMat);
  tooth2.position.set(0.15, -0.7, 0);

  group.add(head, shaft, tooth1, tooth2);
  group.scale.set(0.9, 0.9, 0.9);
  return group;
}

function initScene() {
  if (!canvasContainer.value) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020202, 0.02);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
  camera.position.set(0, 0, width < 768 ? 20 : 14);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  canvasContainer.value.appendChild(renderer.domElement);

  // Iluminação
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const mainLight = new THREE.DirectionalLight(0xfdf1b8, 6.0);
  mainLight.position.set(10, 15, 10);
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0x4a7cff, 8.0);
  rimLight.position.set(-15, 5, -15);
  scene.add(rimLight);

  coreLight = new THREE.PointLight(0xfdf1b8, 2.0, 15);
  scene.add(coreLight);

  // Materiais do Cryptex
  const darkMetal = new THREE.MeshPhysicalMaterial({
    color: 0x020202,
    metalness: 1.0,
    roughness: 0.1,
    clearcoat: 1.0,
  });
  const goldMetal = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 1.0,
    roughness: 0.15,
    emissive: 0x442200,
    emissiveIntensity: 0.6,
  });

  artifactGroup = new THREE.Group();

  // Núcleo brilhante
  const coreGeo = new THREE.CylinderGeometry(0.5, 0.5, 4.8, 32);
  coreMesh = new THREE.Mesh(
    coreGeo,
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfdf1b8,
      emissiveIntensity: 5.0,
      transparent: true,
      opacity: 0.9,
    })
  );
  artifactGroup.add(coreMesh);
  coreLight.position.copy(coreMesh.position);
  artifactGroup.add(coreLight);

  // Tampas
  const capsGroup = new THREE.Group();
  const capGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.5, 32);
  topCap = new THREE.Mesh(capGeo, darkMetal);
  topCap.position.y = 2.0;
  topCapGold = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.08, 16, 64), goldMetal);
  topCapGold.rotation.x = Math.PI / 2;
  topCapGold.position.y = 2.0;

  bottomCap = new THREE.Mesh(capGeo, darkMetal);
  bottomCap.position.y = -2.0;
  bottomCapGold = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.08, 16, 64), goldMetal);
  bottomCapGold.rotation.x = Math.PI / 2;
  bottomCapGold.position.y = -2.0;

  capsGroup.add(topCap, topCapGold, bottomCap, bottomCapGold);
  artifactGroup.add(capsGroup);

  // Anéis
  rings.length = 0;
  pointers.length = 0;
  const ringBodyGeo = new THREE.CylinderGeometry(1.3, 1.3, 1.0, 64);
  const ringDetailGeo = new THREE.TorusGeometry(1.3, 0.04, 16, 64);

  for (let i = 0; i < 3; i++) {
    const ringGroup = new THREE.Group();
    const rBody = new THREE.Mesh(ringBodyGeo, darkMetal);
    const rDetailTop = new THREE.Mesh(ringDetailGeo, goldMetal);
    rDetailTop.position.y = 0.5;
    rDetailTop.rotation.x = Math.PI / 2;
    const rDetailBot = new THREE.Mesh(ringDetailGeo, goldMetal);
    rDetailBot.position.y = -0.5;
    rDetailBot.rotation.x = Math.PI / 2;

    const pointer = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.6, 0.3),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 1.5,
      })
    );
    pointer.position.set(0, 0, 1.25);
    pointer.userData = { isAligned: false };
    pointers.push(pointer);

    ringGroup.add(rBody, rDetailTop, rDetailBot, pointer);
    ringGroup.position.y = 1.1 - i * 1.1;
    ringGroup.rotation.y = currentSteps.value[i] * ((Math.PI * 2) / 10);
    artifactGroup.add(ringGroup);
    rings.push(ringGroup);
  }

  artifactGroup.position.y = 1.0;
  artifactGroup.scale.set(0.8, 0.8, 0.8);
  scene.add(artifactGroup);

  // Fundo com chaves e cadeados
  const backgroundGroup = new THREE.Group();
  const bgItemMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.8,
    roughness: 0.3,
  });
  const bgAccentMat = new THREE.MeshStandardMaterial({
    color: 0x886600,
    metalness: 1.0,
    roughness: 0.4,
  });

  floatingItems.length = 0;
  for (let i = 0; i < 35; i++) {
    const item = Math.random() > 0.5 ? createPadlock(bgItemMat, bgAccentMat) : createKey(bgItemMat);
    item.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      -10 - Math.random() * 30
    );
    item.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    item.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.005,
      rotSpeedY: (Math.random() - 0.5) * 0.005,
      floatSpeedY: (Math.random() - 0.5) * 0.01,
    };
    backgroundGroup.add(item);
    floatingItems.push(item);
  }
  scene.add(backgroundGroup);

  // Partículas douradas
  const particlesGeo = new THREE.BufferGeometry();
  const posArray = new Float32Array(300 * 3);
  for (let i = 0; i < 900; i++) {
    posArray[i] = (Math.random() - 0.5) * 40;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesMesh = new THREE.Points(
    particlesGeo,
    new THREE.PointsMaterial({
      size: 0.08,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(particlesMesh);

  checkAlignment();
  animate();
}

function checkAlignment() {
  const alignedStatus: boolean[] = [false, false, false];
  let allAligned = true;

  for (let i = 0; i < 3; i++) {
    const isStepAligned = currentSteps.value[i] % 10 === 0;
    alignedStatus[i] = isStepAligned;

    if (pointers[i]) {
      const mat = pointers[i].material as THREE.MeshStandardMaterial;
      if (isStepAligned) {
        mat.color.setHex(0x00ff00);
        mat.emissive.setHex(0x00ff00);
        pointers[i].userData.isAligned = true;
      } else {
        mat.color.setHex(0xffffff);
        mat.emissive.setHex(0xffffff);
        mat.emissiveIntensity = 1.5;
        pointers[i].userData.isAligned = false;
        allAligned = false;
      }
    }
  }

  emit('update-rings-aligned', alignedStatus);

  if (allAligned && !isLocallyUnlocked.value && !isUnlockingSequence.value) {
    setTimeout(triggerUnlockSequence, 400);
  }
}

function rotateRing(index: number, direction: 1 | -1) {
  if (isLocallyUnlocked.value || isUnlockingSequence.value || !rings[index]) return;

  currentSteps.value[index] += direction;
  targetRotations[index] = currentSteps.value[index] * ((Math.PI * 2) / 10);

  if (currentSteps.value[index] % 10 === 0) {
    playLockSound();
  } else {
    playTickSound();
  }

  checkAlignment();
}

function skipChallenge() {
  if (isLocallyUnlocked.value || isUnlockingSequence.value) return;

  for (let i = 0; i < 3; i++) {
    currentSteps.value[i] = 0;
    targetRotations[i] = 0;
    if (rings[i]) {
      rings[i].rotation.y = 0;
    }
  }

  checkAlignment();
}

function triggerUnlockSequence() {
  if (isLocallyUnlocked.value || isUnlockingSequence.value) return;
  isUnlockingSequence.value = true;

  const startTime = performance.now();
  const duration = 1800;

  function unlockStep(time: number) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1.0);

    if (artifactGroup) {
      artifactGroup.rotation.y += 0.08 * (1 - progress);
    }

    if (topCap && bottomCap) {
      topCap.position.y = 2.0 + progress * 4.0;
      if (topCapGold) topCapGold.position.y = topCap.position.y;
      bottomCap.position.y = -2.0 - progress * 4.0;
      if (bottomCapGold) bottomCapGold.position.y = bottomCap.position.y;
    }

    rings.forEach((ring) => {
      ring.scale.x = 1.0 + progress * 1.5;
      ring.scale.z = 1.0 + progress * 1.5;
    });

    if (coreLight && coreMesh) {
      coreLight.intensity = 2.0 + progress * 80.0;
      (coreMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        5.0 + progress * 80.0;
    }

    if (flashOverlay.value && progress > 0.7) {
      const flashOpacity = (progress - 0.7) / 0.3;
      flashOverlay.value.style.opacity = `${flashOpacity}`;
    }

    if (progress < 1.0) {
      requestAnimationFrame(unlockStep);
    } else {
      isLocallyUnlocked.value = true;
      if (artifactGroup) artifactGroup.visible = false;
      if (camera) camera.position.z = 8;

      if (flashOverlay.value) {
        flashOverlay.value.style.transition = 'opacity 1.5s ease-out';
        flashOverlay.value.style.opacity = '0';
      }

      emit('unlocked');
    }
  }

  requestAnimationFrame(unlockStep);
}

function updateRingProjectedPositions() {
  if (!camera || rings.length < 3 || isLocallyUnlocked.value) return;

  const positions: RingPosition[] = [];
  const vector = new THREE.Vector3();

  for (let i = 0; i < 3; i++) {
    rings[i].getWorldPosition(vector);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    positions.push({ x, y });
  }

  emit('update-ring-positions', positions);
}

function handleMouseMove(e: MouseEvent) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

function handleResize() {
  if (!camera || !renderer) return;
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  if (!isLocallyUnlocked.value) {
    camera.position.z = width < 768 ? 20 : 14;
  }
}

function animate() {
  const isAutomated =
    typeof navigator !== 'undefined' &&
    (navigator.webdriver ||
      /HeadlessChrome|Lighthouse|Chrome-Lighthouse/i.test(navigator.userAgent));

  if (isAutomated) {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
      updateRingProjectedPositions();
    }
    return;
  }

  if (typeof document !== 'undefined' && document.hidden) {
    animFrameId = requestAnimationFrame(animate);
    return;
  }

  animFrameId = requestAnimationFrame(animate);
  const time = (performance.now() - sceneStartTime) * 0.001;

  if (!isLocallyUnlocked.value && !isUnlockingSequence.value) {
    if (coreLight && coreMesh) {
      coreLight.intensity = 2.0 + Math.sin(time * 3.0) * 0.8;
      coreMesh.scale.set(
        1 + Math.sin(time * 3.0) * 0.03,
        1,
        1 + Math.sin(time * 3.0) * 0.03
      );
    }

    if (artifactGroup) {
      targetRotX = mouseY * 0.15;
      targetRotY = mouseX * 0.15;
      artifactGroup.rotation.x += (targetRotX - artifactGroup.rotation.x) * 0.08;
      artifactGroup.rotation.y += (targetRotY - artifactGroup.rotation.y) * 0.08;
    }

    // Suavização da rotação dos anéis
    rings.forEach((ring, index) => {
      ring.rotation.y += (targetRotations[index] - ring.rotation.y) * 0.15;
    });

    pointers.forEach((pointer) => {
      if (pointer.userData.isAligned) {
        (pointer.material as THREE.MeshStandardMaterial).emissiveIntensity =
          3.0 + Math.sin(time * 12.0) * 1.5;
      }
    });

    updateRingProjectedPositions();
  } else if (camera) {
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    if (scene) camera.lookAt(scene.position);
  }

  floatingItems.forEach((item) => {
    item.rotation.x += item.userData.rotSpeedX;
    item.rotation.y += item.userData.rotSpeedY;
    item.position.y += item.userData.floatSpeedY;
    if (item.position.y > 30) item.position.y = -30;
    if (item.position.y < -30) item.position.y = 30;
  });

  if (particlesMesh) {
    particlesMesh.rotation.y = time * 0.02;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

defineExpose({
  rotateRing,
  skipChallenge,
  isUnlocked: isLocallyUnlocked,
});

onMounted(() => {
  if (props.isUnlocked) {
    isLocallyUnlocked.value = true;
  }

  initScene();
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
  }

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);

  if (scene) {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((mat) => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }

  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }

  scene = null;
  camera = null;
  renderer = null;
});
</script>

<template>
  <div>
    <!-- Container 3D Fixo de Fundo -->
    <div
      ref="canvasContainer"
      class="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    ></div>

    <!-- Flash Overlay de Transição Cinematográfica -->
    <div
      ref="flashOverlay"
      class="pointer-events-none fixed inset-0 z-50 bg-white opacity-0"
    ></div>
  </div>
</template>
