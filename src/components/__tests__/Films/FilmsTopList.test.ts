import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useFilmStore } from '@/stores/film';
import FilmsTopList from '@/components/Films/FilmsTopList.vue';
import { mockFilmData } from '@/mocks';

const windowMock = {
  scrollTo: vi.fn()
};

Object.assign(global, windowMock);

describe('FilmsTopList', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useFilmStore>;

  beforeEach(() => {
    wrapper = mount(FilmsTopList, {
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
    expect(wrapper.find('.film-card-skeleton').exists()).toBe(true);
  });

  it('Рендер определенного количества фильмов при их наличии в Store', async () => {
    await store.$patch({ films: [mockFilmData, mockFilmData, mockFilmData], isLoadingFilm: false });

    expect(wrapper.findAll('.film-card').length).toEqual(3);
  });
});
