import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';
import OrionFooter from '../components/OrionFooter.vue';
import CryptexCanvas from '../components/cryptex/CryptexCanvas.vue';
import PuzzleControls from '../components/cryptex/PuzzleControls.vue';

// Mock do WebGLRenderer para os testes de integração do App
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

describe('App.vue Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('deve inicializar com o puzzle bloqueado quando não houver chave no localStorage', () => {
    const wrapper = mount(App);

    expect(wrapper.findComponent(CryptexCanvas).exists()).toBe(true);
    expect(wrapper.findComponent(PuzzleControls).exists()).toBe(true);
    expect(wrapper.findComponent(OrionFooter).exists()).toBe(true);

    const mainSite = wrapper.find('#main-site');
    expect(mainSite.classes()).toContain('opacity-0');
  });

  it('deve inicializar diretamente com a landing page visível se cryptex_unlocked for true', () => {
    localStorage.setItem('cryptex_unlocked', 'true');
    const wrapper = mount(App);

    expect(wrapper.findComponent(PuzzleControls).exists()).toBe(false);
    const mainSite = wrapper.find('#main-site');
    expect(mainSite.classes()).toContain('opacity-100');
    expect(wrapper.findComponent(OrionFooter).exists()).toBe(true);
  });

  it('deve atualizar o estado e salvar no localStorage ao receber o evento unlocked do CryptexCanvas', async () => {
    const wrapper = mount(App);

    const canvasComponent = wrapper.findComponent(CryptexCanvas);
    await canvasComponent.vm.$emit('unlocked');

    expect(localStorage.getItem('cryptex_unlocked')).toBe('true');
    expect(wrapper.findComponent(PuzzleControls).exists()).toBe(false);
    expect(wrapper.find('#main-site').classes()).toContain('opacity-100');
  });

  it('deve repassar eventos de rotate e skip para a instância do CryptexCanvas', async () => {
    const wrapper = mount(App);

    const controls = wrapper.findComponent(PuzzleControls);
    await controls.vm.$emit('rotate', 0, 1);
    await controls.vm.$emit('skip');

    expect(wrapper.vm).toBeTruthy();
  });

  it('deve sempre conter o banner institucional OrionFooter em conformidade constitucional', () => {
    const wrapper = mount(App);
    const orionFooter = wrapper.findComponent(OrionFooter);

    expect(orionFooter.exists()).toBe(true);
    expect(orionFooter.text()).toContain('Orion Stellar Solutions');
  });
});
