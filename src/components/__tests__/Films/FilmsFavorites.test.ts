import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useFilmStore } from '@/stores/film';
import FilmsFavorites from '@/components/Films/FilmsFavorites.vue';
import { mockFilmData } from '@/mocks';

describe('FilmsFavorites', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useFilmStore>;

  beforeEach(() => {
    wrapper = mount(FilmsFavorites, {
      global: {
        plugins: [
          [router],
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              film: {
                favoriteFilms: []
              },
              isLoadingFavorites: true,
              isTogglingFavorite: false
            }
          })
        ]
      }
    });
    store = useFilmStore();
  });

  it('При отсутствии фильмов происходит рендер Skeleton элементов карточек', () => {
    expect(wrapper.find('.film-card-skeleton').exists()).toBe(true);
  });

  it('Рендер определенного количества фильмов при их наличии в Store', async () => {
    await store.$patch({
      favoriteFilms: [mockFilmData, mockFilmData, mockFilmData],
      isLoadingFavorites: false
    });

    const filmCards = await wrapper.findAll('.films-list__item');

    expect(filmCards.length).toEqual(3);
  });

  it('Рендер сообщения об отсутсвии фильмов', async () => {
    await store.$patch({
      isLoadingFavorites: false
    });

    expect(wrapper.find('.container').exists()).toBe(true);
  });

  it('При клике по карточке вызывает переключение их в избранном', async () => {
    await store.$patch({
      favoriteFilms: [mockFilmData, mockFilmData, mockFilmData],
      isLoadingFavorites: false
    });

    await wrapper.find('.films-list__item').trigger('mouseover');
    const deleteBtn = await wrapper.find('.films-list__delete-btn');

    expect(deleteBtn.exists()).toBe(true);

    deleteBtn.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
