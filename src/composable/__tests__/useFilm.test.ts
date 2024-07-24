import { describe, it, beforeEach, expect, vi } from 'vitest';
import { config } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useFilm } from '../useFilm';
import { useFilmStore } from '@/stores/film';
import { useUserStore } from '@/stores/user';
import { mockFilmData } from '@/mocks';
import { useRouter } from 'vue-router';

const router = useRouter();

config.global.plugins = [[router]];

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

vi.spyOn(router, 'push');

describe('Composable UseFilm', () => {
  let filmStore: ReturnType<typeof useFilmStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
      initialState: {
        film: {
          film: null
        },
        isLoadingFilm: true,
        loadRandomFilm: vi.fn()
      }
    });

    filmStore = useFilmStore();
  });

  it('Запрашивает и устанавливает Случайный фильм в стор', () => {
    useFilm().loadRandomFilm();

    expect(filmStore.loadRandomFilm).toHaveBeenCalledTimes(1);
  });

  it('Переключает фильм в избранном если пользователь авторизован', async () => {
    const userStore = useUserStore();
    userStore.isAuth = true;

    await filmStore.$patch({ film: mockFilmData, isLoadingFilm: false });

    useFilm().toggleFavorite();

    expect(filmStore.toggleFavoriteFilm).toHaveBeenCalledTimes(1);
    expect(filmStore.toggleFavoriteFilm).toHaveBeenCalledWith(String(mockFilmData.id));
  });

  it('Если пользователь не авторизован вызывает форму входа при попытке изменения избранного', async () => {
    await filmStore.$patch({ film: mockFilmData, isLoadingFilm: false });

    const toggle = useFilm().toggleFavorite();

    expect(toggle).toBe(false);
  });

  it('Вызывает показ трейлера', () => {
    useFilm().setShowTrailer();

    expect(filmStore.showTrailer).toBe(true);
  });

  it('Запрашивает фильм по ID', () => {
    useFilm().getFilmById(mockFilmData.id);

    expect(filmStore.loadFilmById).toHaveBeenCalledTimes(1);
    expect(filmStore.loadFilmById).toHaveBeenCalledWith(mockFilmData.id);
  });
});
