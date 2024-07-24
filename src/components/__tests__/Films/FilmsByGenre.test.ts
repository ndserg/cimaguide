import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useFilmStore } from '@/stores/film';
import FilmsByGenre from '@/components/Films/FilmsByGenre.vue';
import { mockFilmData } from '@/mocks';

const windowMock = {
  scrollTo: vi.fn()
};

Object.assign(global, windowMock);

describe('GenresList', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useFilmStore>;

  beforeEach(() => {
    wrapper = mount(FilmsByGenre, {
      global: {
        plugins: [
          [router],
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              film: {
                films: []
              },
              isLoadingFilm: true
            }
          })
        ]
      }
    });
    store = useFilmStore();
  });

  it('При отсутствии фильмов происходит рендер Skeleton элементов карточек', () => {
    expect(wrapper.find('.films-list--skeleton').exists()).toBe(true);
    expect(wrapper.find('.film-card-skeleton').exists()).toBe(true);
  });

  it('Рендерит список фильмов при их наличии в Store', async () => {
    await store.$patch({ films: [mockFilmData, mockFilmData, mockFilmData], isLoadingFilm: false });

    expect(wrapper.find('.films-list').exists()).toBe(true);
  });

  it('Рендер определенного количества фильмов при их наличии в Store', async () => {
    await store.$patch({ films: [mockFilmData, mockFilmData, mockFilmData], isLoadingFilm: false });

    expect(wrapper.findAll('.film-card').length).toEqual(3);
  });

  it('Возвращает True если был скролл', async () => {
    await wrapper.trigger('scroll');

    expect((wrapper.vm as any).checkPosition()).toBe(true);
  });

  it('Возвращает False если скролла не было', () => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: -1000
    });

    expect((wrapper.vm as any).checkPosition()).toBe(false);
  });

  it('Удаляет Scroll Listener при размонтировании компонента', async () => {
    Object.defineProperty(window, 'removeEventListener', {
      value: vi.fn()
    });

    await wrapper.unmount();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
