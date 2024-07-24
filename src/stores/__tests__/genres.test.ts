import { reactive, toRefs } from 'vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGenresStore } from '../genres';
import { getFilms, filmsApiRoutes } from '@/api/films';

const stateOk = reactive({
  loading: false,
  error: '',
  data: ['horror', 'history']
});

const stateError = reactive({
  loading: false,
  error: '',
  data: null
});

const mockedImplementationOk = Promise.resolve({ ...toRefs(stateOk) });
const mockedImplementationError = Promise.resolve({ ...toRefs(stateError) });

const mocks = vi.hoisted(() => {
  return {
    getFilms: vi.fn(),
    filmsApiRoutes: {}
  };
});

vi.mock('@/api/films', () => {
  return {
    getFilms: mocks.getFilms,
    filmsApiRoutes: mocks.filmsApiRoutes
  };
});

describe('Genres Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('Запрашивает и устанавливает жанры в стор', async () => {
    vi.mocked(getFilms).mockReturnValue(mockedImplementationOk);
    const store = useGenresStore();

    await store.loadGenres();

    expect(getFilms).toBeCalled();

    expect(store.genres.length).toBe(2);
  });

  it('При ошибке в запросе выводит соответствующее сообщение', async () => {
    vi.mocked(getFilms).mockReturnValue(mockedImplementationError);
    const store = useGenresStore();

    await store.loadGenres();

    expect(store.genres.length).toBe(0);
  });

  it('Прерывает запрос если жанры уже загружены', async () => {
    const store = useGenresStore();

    store.genres = ['horror', 'history'];

    const response = await store.loadGenres();

    expect(response).toBe(false);
  });
});
