import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CryptexCanvas from '../CryptexCanvas.vue';
import { playLockSound, playTickSound } from '../../../utils/audioSynth';

// Mock do Web Audio
vi.mock('../../../utils/audioSynth', () => ({
  playTickSound: vi.fn(),
  playLockSound: vi.fn(),
}));

// Mock do THREE.WebGLRenderer para ambiente headless sem GPU WebGL nativa
vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>();

  class MockWebGLRenderer {
    domElement = document.createElement('canvas');
    setSize = vi.fn();
    setPixelRatio = vi.fn();
    render = vi.fn();
    dispose = vi.fn();
    toneMapping = 0;
    toneMappingExposure = 1;
  }

  return {
    ...actual,
    WebGLRenderer: MockWebGLRenderer,
  };
});

describe('CryptexCanvas.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => setTimeout(cb, 16)));
    vi.stubGlobal('cancelAnimationFrame', vi.fn((id) => clearTimeout(id)));
  });

  it('deve montar o componente e renderizar os containers de canvas e flash overlay', () => {
    const wrapper = mount(CryptexCanvas);

    expect(wrapper.find('div.fixed.inset-0.-z-10').exists()).toBe(true);
    expect(wrapper.find('div.bg-white.opacity-0').exists()).toBe(true);
    expect(wrapper.emitted('update-rings-aligned')).toBeTruthy();
  });

  it('deve montar com isUnlocked = true quando a prop for fornecida', () => {
    const wrapper = mount(CryptexCanvas, {
      props: {
        isUnlocked: true,
      },
    });

    const vm = wrapper.vm as unknown as { isUnlocked: boolean };
    expect(vm.isUnlocked).toBe(true);
  });

  it('deve expor e executar os métodos rotateRing e skipChallenge corretamente', () => {
    const wrapper = mount(CryptexCanvas);
    const vm = wrapper.vm as unknown as {
      rotateRing: (index: number, direction: 1 | -1) => void;
      skipChallenge: () => void;
    };

    expect(typeof vm.rotateRing).toBe('function');
    expect(typeof vm.skipChallenge).toBe('function');

    // Gira anel e toca som
    vm.rotateRing(0, 1);
    expect(playTickSound).toHaveBeenCalled();

    // Pula o desafio para zerar os passos e disparar alinhamento
    vm.skipChallenge();
    expect(wrapper.emitted('update-rings-aligned')).toBeTruthy();
  });

  it('deve responder aos eventos de mousemove e resize', () => {
    const wrapper = mount(CryptexCanvas);

    // Dispara mousemove
    window.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: 500,
        clientY: 300,
      })
    );

    // Dispara resize desktop
    window.innerWidth = 1200;
    window.innerHeight = 800;
    window.dispatchEvent(new Event('resize'));

    // Dispara resize mobile
    window.innerWidth = 375;
    window.innerHeight = 667;
    window.dispatchEvent(new Event('resize'));

    expect(wrapper.vm).toBeTruthy();
  });

  it('deve tocar som de lock quando o anel atingir múltiplo de 10 passos', () => {
    const wrapper = mount(CryptexCanvas);
    const vm = wrapper.vm as unknown as {
      rotateRing: (index: number, direction: 1 | -1) => void;
    };

    // Anel 0 começa em 3. Com 7 passos atinge 10
    for (let i = 0; i < 7; i++) {
      vm.rotateRing(0, 1);
    }

    expect(playLockSound).toHaveBeenCalled();
  });

  it('deve disparar a sequência cinematográfica de desbloqueio ao zerar os passos', async () => {
    vi.useFakeTimers();
    const wrapper = mount(CryptexCanvas);
    const vm = wrapper.vm as unknown as { skipChallenge: () => void };

    vm.skipChallenge();
    vi.advanceTimersByTime(2500);

    expect(wrapper.emitted('update-rings-aligned')).toBeTruthy();
    vi.useRealTimers();
  });

  it('deve limpar event listeners e cancelar animação no unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const wrapper = mount(CryptexCanvas);

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
