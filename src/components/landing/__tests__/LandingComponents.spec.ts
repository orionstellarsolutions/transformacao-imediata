import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HeaderNav from '../HeaderNav.vue';
import HeroSection from '../HeroSection.vue';
import MethodSection from '../MethodSection.vue';
import CheckoutSection from '../CheckoutSection.vue';
import SiteFooter from '../SiteFooter.vue';

describe('Landing Page Components', () => {
  describe('HeaderNav.vue', () => {
    it('deve renderizar a marca MENTE LIVRE e links de navegação corretos', () => {
      const wrapper = mount(HeaderNav);

      expect(wrapper.text()).toContain('MENTE');
      expect(wrapper.text()).toContain('LIVRE');
      expect(wrapper.find('a[href="#metodo"]').exists()).toBe(true);
      expect(wrapper.find('a[href="#checkout"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="header-cta"]').exists()).toBe(true);
    });
  });

  describe('HeroSection.vue', () => {
    it('deve renderizar a headline principal, badge de cadeado e card de preview de vídeo', () => {
      const wrapper = mount(HeroSection);

      expect(wrapper.text()).toContain('O Cadeado foi aberto');
      expect(wrapper.text()).toContain('Rompa as');
      expect(wrapper.text()).toContain('Correntes Invisíveis');

      const cta = wrapper.find('[data-testid="hero-cta"]');
      expect(cta.exists()).toBe(true);
      expect(cta.attributes('href')).toBe('#checkout');

      const videoCard = wrapper.find('[data-testid="video-preview-card"]');
      expect(videoCard.exists()).toBe(true);
    });
  });

  describe('MethodSection.vue', () => {
    it('deve renderizar os 3 pilares do método', () => {
      const wrapper = mount(MethodSection);

      expect(wrapper.text()).toContain('Não é motivação.');
      expect(wrapper.text()).toContain('É arquitetura mental.');

      expect(wrapper.text()).toContain('O Diagnóstico');
      expect(wrapper.text()).toContain('A Ruptura');
      expect(wrapper.text()).toContain('A Ascensão');
    });
  });

  describe('CheckoutSection.vue', () => {
    it('deve conter os links reais e seguros da Hotmart para a Mentoria e o Ebook', () => {
      const wrapper = mount(CheckoutSection);

      const btnMentoria = wrapper.find('[data-testid="btn-checkout-mentoria"]');
      expect(btnMentoria.exists()).toBe(true);
      expect(btnMentoria.attributes('href')).toBe(
        'https://hotmart.com/pt-br/marketplace/produtos/transformacao-imediata/Q90065181S'
      );
      expect(btnMentoria.attributes('target')).toBe('_blank');
      expect(btnMentoria.attributes('rel')).toContain('noopener');

      const btnEbook = wrapper.find('[data-testid="btn-checkout-ebook"]');
      expect(btnEbook.exists()).toBe(true);
      expect(btnEbook.attributes('href')).toBe(
        'https://hotmart.com/pt-br/marketplace/produtos/troque-e-transforme-sua-comunicacao/A85697379P?sck=HOTMART_PRODUCT_PAGE'
      );
      expect(btnEbook.attributes('target')).toBe('_blank');
      expect(btnEbook.attributes('rel')).toContain('noopener');
    });
  });

  describe('SiteFooter.vue', () => {
    it('deve renderizar o copyright da Mentoria', () => {
      const wrapper = mount(SiteFooter);

      expect(wrapper.text()).toContain('MENTE');
      expect(wrapper.text()).toContain('LIVRE');
      expect(wrapper.text()).toContain('2026 O Código da Mente');
    });
  });
});
