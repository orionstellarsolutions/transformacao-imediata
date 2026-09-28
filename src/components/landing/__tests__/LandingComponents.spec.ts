import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HeaderNav from '../HeaderNav.vue';
import HeroSection from '../HeroSection.vue';
import MethodSection from '../MethodSection.vue';
import ModulesSection from '../ModulesSection.vue';
import BioSection from '../BioSection.vue';
import CheckoutSection from '../CheckoutSection.vue';
import SiteFooter from '../SiteFooter.vue';

describe('Landing Page Components', () => {
  describe('HeaderNav.vue', () => {
    it('deve renderizar a marca TRANSFORMAÇÃO IMEDIATA e links de navegação corretos', () => {
      const wrapper = mount(HeaderNav);

      expect(wrapper.text()).toContain('TRANSFORMAÇÃO');
      expect(wrapper.text()).toContain('IMEDIATA');
      expect(wrapper.find('a[href="#metodo"]').exists()).toBe(true);
      expect(wrapper.find('a[href="#checkout"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="header-cta"]').exists()).toBe(true);
    });
  });

  describe('HeroSection.vue', () => {
    it('deve renderizar a headline principal, badge de cadeado e imagem oficial da Laís Gulin', () => {
      const wrapper = mount(HeroSection);

      expect(wrapper.text()).toContain('O Cadeado foi aberto');
      expect(wrapper.text()).toContain('CURSO');
      expect(wrapper.text()).toContain('TRANSFORMAÇÃO');
      expect(wrapper.text()).toContain('IMEDIATA');

      const cta = wrapper.find('[data-testid="hero-cta"]');
      expect(cta.exists()).toBe(true);
      expect(cta.attributes('href')).toBe('#checkout');

      const imgCard = wrapper.find('[data-testid="video-preview-card"] img');
      expect(imgCard.exists()).toBe(true);
      expect(imgCard.attributes('src')).toBe('/images/lais_hero_final.png');
    });
  });

  describe('MethodSection.vue', () => {
    it('deve renderizar os 3 pilares do método', () => {
      const wrapper = mount(MethodSection);

      expect(wrapper.text()).toContain('Controle e Gestão das Emoções');
      expect(wrapper.text()).toContain('em Passos Simples');

      expect(wrapper.text()).toContain('CONTROLE EMOCIONAL');
      expect(wrapper.text()).toContain('CONEXÃO CÉREBRO-CORAÇÃO');
      expect(wrapper.text()).toContain('SAÚDE INTEGRAL');
    });
  });

  describe('ModulesSection.vue', () => {
    it('deve renderizar as 12 aulas e permitir expandir/recolher o acordeão', async () => {
      const wrapper = mount(ModulesSection);

      expect(wrapper.text()).toContain('CONTEÚDO DO CURSO');
      expect(wrapper.text()).toContain('01');
      expect(wrapper.text()).toContain('Boas Vindas');
      expect(wrapper.text()).toContain('12');
      expect(wrapper.text()).toContain('Juliana Karam');

      // O corpo do módulo 1 inicialmente não está no DOM
      expect(wrapper.find('[data-testid="module-body-1"]').exists()).toBe(false);

      // Clicar para expandir o módulo 1
      const header1 = wrapper.find('[data-testid="module-header-1"]');
      await header1.trigger('click');
      expect(wrapper.find('[data-testid="module-body-1"]').exists()).toBe(true);

      // Clicar novamente para recolher
      await header1.trigger('click');
      expect(wrapper.find('[data-testid="module-body-1"]').exists()).toBe(false);
    });
  });

  describe('BioSection.vue', () => {
    it('deve renderizar o perfil oficial da Laís Gulin com avatar circular e citação', () => {
      const wrapper = mount(BioSection);

      expect(wrapper.text()).toContain('LAÍS GULIN');
      expect(wrapper.text()).toContain('Analista Comportamental');
      expect(wrapper.text()).toContain('O meu viver é a ponte para o seu crescer');

      const avatar = wrapper.find('img');
      expect(avatar.exists()).toBe(true);
      expect(avatar.attributes('src')).toBe('/images/lais_avatar_circle.png');
    });
  });

  describe('CheckoutSection.vue', () => {
    it('deve conter os valores de R$ 297, 12x R$ 30,72 e links reais da Hotmart', () => {
      const wrapper = mount(CheckoutSection);

      expect(wrapper.text()).toContain('INICIE SUA');
      expect(wrapper.text()).toContain('TRANSFORMAÇÃO');
      expect(wrapper.text()).toContain('30');
      expect(wrapper.text()).toContain('72');
      expect(wrapper.text()).toContain('297,00');

      const btnCurso = wrapper.find('[data-testid="btn-checkout-mentoria"]');
      expect(btnCurso.exists()).toBe(true);
      expect(btnCurso.attributes('href')).toBe(
        'https://hotmart.com/pt-br/marketplace/produtos/transformacao-imediata/Q90065181S'
      );
      expect(btnCurso.attributes('target')).toBe('_blank');
      expect(btnCurso.attributes('rel')).toContain('noopener');

      const btnEbook = wrapper.find('[data-testid="btn-checkout-ebook"]');
      expect(btnEbook.exists()).toBe(true);
      expect(btnEbook.attributes('href')).toBe(
        'https://hotmart.com/pt-br/marketplace/produtos/troque-e-transforme-sua-comunicacao/A85697379P?sck=HOTMART_PRODUCT_PAGE'
      );
      expect(wrapper.text()).toContain('Mais barato que um cafezinho');
      expect(wrapper.text()).toContain('5');
      expect(wrapper.text()).toContain('97');
    });
  });

  describe('SiteFooter.vue', () => {
    it('deve renderizar o copyright oficial do Transformação Imediata', () => {
      const wrapper = mount(SiteFooter);

      expect(wrapper.text()).toContain('TRANSFORMAÇÃO');
      expect(wrapper.text()).toContain('IMEDIATA');
      expect(wrapper.text()).toContain('Laís Gulin');
      expect(wrapper.text()).toContain('2026 Transformação Imediata');
    });
  });
});
