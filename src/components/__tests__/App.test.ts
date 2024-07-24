import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';

describe('App', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [
          [router],
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false
          })
        ]
      }
    });
  });

  it('Отображает Header', () => {
    expect(wrapper.find('.header').exists()).toBe(true);
  });

  it('Отображает Footer', () => {
    expect(wrapper.find('.footer').exists()).toBe(true);
  });
});
