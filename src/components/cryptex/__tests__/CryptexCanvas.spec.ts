import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CryptexCanvas from '../CryptexCanvas.vue';

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

  it('deve expor os métodos rotateRing e skipChallenge', () => {
    const wrapper = mount(CryptexCanvas);
    const vm = wrapper.vm as unknown as {
      rotateRing: (index: number, direction: 1 | -1) => void;
      skipChallenge: () => void;
    };

    expect(typeof vm.rotateRing).toBe('function');
    expect(typeof vm.skipChallenge).toBe('function');

    expect(() => vm.rotateRing(0, 1)).not.toThrow();
    expect(() => vm.skipChallenge()).not.toThrow();
  });

  it('deve limpar event listeners e cancelar animação no unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const wrapper = mount(CryptexCanvas);

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
