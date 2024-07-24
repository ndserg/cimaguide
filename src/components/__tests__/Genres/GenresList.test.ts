import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useGenresStore } from '@/stores/genres';
import GenresList from '@/components/Genres/GenresList.vue';

describe('GenresList', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useGenresStore>;

  beforeEach(() => {
    wrapper = mount(GenresList, {
      global: {
        plugins: [
          [router],
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              genres: {
                genres: []
              }
            }
          })
        ]
      }
    });
    store = useGenresStore();
  });

  it('При отсутствии данных происходит рендер Skeleton элементов', () => {
    expect(wrapper.findAll('.genre-card-skeleton').length).toBeGreaterThan(0);
  });

  it('Рендер данных при их наличии в Store', async () => {
    await store.$patch({ genres: ['history', 'horror', 'scifi', 'action'] });

    expect(wrapper.findAll('.genre-card').length).toBeGreaterThan(1);
  });
});
