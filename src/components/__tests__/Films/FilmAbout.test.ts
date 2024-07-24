import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import FilmAbout from '@/components/Films/FilmAbout.vue';
import { useFilmStore } from '@/stores/film';
import { mockFilmData } from '@/mocks';

describe('FilmAbout', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useFilmStore>;

  const emptyFields = {
    language: '',
    budget: '',
    director: '',
    production: ''
  };

  beforeEach(() => {
    wrapper = mount(FilmAbout, {
      global: {
        plugins: [
          [router],
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              film: {
                film: null
              },
              isLoadingFilm: true
            }
          })
        ]
      }
    });
    store = useFilmStore();
  });

  it('При отсутствии данных происходит рендер Skeleton элемента', () => {
    expect(wrapper.find('.about-list-skeleton').exists()).toBe(true);
  });

  it('Рендер данных при их наличии в Store', async () => {
    await store.$patch({ film: mockFilmData, isLoadingFilm: false });

    expect(wrapper.find('.about__list').exists()).toBe(true);
  });

  it('Выводит соответствующую инофрмацию в остутствующих полях', async () => {
    await store.$patch({ film: { ...mockFilmData, ...emptyFields }, isLoadingFilm: false });

    expect(wrapper.find('.about__list').exists()).toBe(true);
  });
});
