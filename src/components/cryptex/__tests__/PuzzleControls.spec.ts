import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PuzzleControls from '../PuzzleControls.vue';

describe('PuzzleControls.vue', () => {
  it('deve renderizar os controles para os 3 anéis e o botão de pular', () => {
    const wrapper = mount(PuzzleControls, {
      props: {
        ringPositions: [
          { x: 100, y: 150 },
          { x: 100, y: 250 },
          { x: 100, y: 350 },
        ],
        ringsAligned: [false, false, false],
        disabled: false,
      },
    });

    for (let i = 0; i < 3; i++) {
      expect(wrapper.find(`[data-testid="btn-rotate-left-${i}"]`).exists()).toBe(true);
      expect(wrapper.find(`[data-testid="btn-rotate-right-${i}"]`).exists()).toBe(true);
    }

    const skipButton = wrapper.find('[data-testid="btn-skip"]');
    expect(skipButton.exists()).toBe(true);
    expect(skipButton.text()).toContain('Pular desafio');
  });

  it('deve emitir o evento rotate com índice e direção corretos ao clicar nas setas', async () => {
    const wrapper = mount(PuzzleControls);

    // Clica na seta esquerda do anel 0
    await wrapper.find('[data-testid="btn-rotate-left-0"]').trigger('click');
    expect(wrapper.emitted('rotate')).toBeTruthy();
    expect(wrapper.emitted('rotate')![0]).toEqual([0, 1]);

    // Clica na seta direita do anel 2
    await wrapper.find('[data-testid="btn-rotate-right-2"]').trigger('click');
    expect(wrapper.emitted('rotate')![1]).toEqual([2, -1]);
  });

  it('deve emitir o evento skip ao clicar no botão de pular', async () => {
    const wrapper = mount(PuzzleControls);

    await wrapper.find('[data-testid="btn-skip"]').trigger('click');
    expect(wrapper.emitted('skip')).toBeTruthy();
    expect(wrapper.emitted('skip')!.length).toBe(1);
  });

  it('não deve emitir eventos quando disabled for true', async () => {
    const wrapper = mount(PuzzleControls, {
      props: {
        disabled: true,
      },
    });

    await wrapper.find('[data-testid="btn-rotate-left-1"]').trigger('click');
    await wrapper.find('[data-testid="btn-skip"]').trigger('click');

    expect(wrapper.emitted('rotate')).toBeFalsy();
    expect(wrapper.emitted('skip')).toBeFalsy();
  });

  it('deve aplicar a classe ring-aligned quando o respectivo anel estiver alinhado', () => {
    const wrapper = mount(PuzzleControls, {
      props: {
        ringsAligned: [false, true, false],
      },
    });

    const row0 = wrapper.find('#arrow-row-0');
    const row1 = wrapper.find('#arrow-row-1');
    const row2 = wrapper.find('#arrow-row-2');

    expect(row0.classes()).not.toContain('ring-aligned');
    expect(row1.classes()).toContain('ring-aligned');
    expect(row2.classes()).not.toContain('ring-aligned');
  });
});
