import { reactive, toRefs } from 'vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFilmStore } from '../film';
import { useUserStore } from '../user';
import { mockFilmData } from '@/mocks';
import { getFilms, filmsApiRoutes } from '@/api/films';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

const filmsDataMock = [
  mockFilmData,
  mockFilmData,
  mockFilmData,
  mockFilmData,
  mockFilmData,
  mockFilmData,
  mockFilmData,
  mockFilmData,
  mockFilmData,
  mockFilmData
];

const stateFilmOk = reactive({
  loading: false,
  error: '',
  data: mockFilmData
});

const stateFilmsOk = reactive({
  loading: false,
  error: '',
  data: filmsDataMock
});

const stateError = reactive({
  loading: false,
  error: 'Ошибка',
  data: null
});

const mockedImplementationFimOk = Promise.resolve({ ...toRefs(stateFilmOk) });
const mockedImplementationFimsOk = Promise.resolve({ ...toRefs(stateFilmsOk) });
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

describe('Film Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('Запрашивает и устанавливает Топ 10 фильмов в стор', async () => {
    const store = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimsOk);

    await store.loadTopFilms();

    expect(store.films.length).toBe(filmsDataMock.length);
  });

  it('Прерывает запрос Топ 10 в стор если уже идет загрузка', async () => {
    const filmsStore = useFilmStore();

    filmsStore.isLoading = true;

    await filmsStore.loadTopFilms();

    expect(filmsStore.isLoading).toBe(true);
  });

  it('Вызывает ошибку при ошибке запроса Топ 10 фильмов', async () => {
    const filmsStore = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationError);

    await filmsStore.loadTopFilms();

    expect(filmsStore.films.length).toBe(0);
  });

  it('Запрашивает и устанавливает фильмы по Жанру в стор', async () => {
    const store = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimsOk);

    await store.loadFilmsByGenre();

    expect(store.films.length).toBe(filmsDataMock.length);
  });

  it('Прерывает запрос фильмы по Жанру в стор если уже идет загрузка', async () => {
    const filmsStore = useFilmStore();

    filmsStore.isLoading = true;

    await filmsStore.loadFilmsByGenre();

    expect(filmsStore.isLoading).toBe(true);
  });

  it('Очищает стор от фильмов по Жанру', () => {
    const store = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimsOk);

    store.resetFilmsByGenre();

    expect(store.films.length === 0).toBe(true);
  });

  it('Вызывает ошибку при ошибке запроса фильмов по Жанру', async () => {
    const filmsStore = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationError);

    await filmsStore.loadFilmsByGenre();

    expect(filmsStore.films.length).toBe(0);
  });

  it('Запрашивает и устанавливает Избранные фильмы в стор', async () => {
    const filmsStore = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimsOk);

    await filmsStore.loadFavoriteFilms();

    expect(filmsStore.favoriteFilms.length).toBe(filmsDataMock.length);
  });

  it('Вызывает ошибку при ошибке запроса Избранных фильмов', async () => {
    const filmsStore = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationError);

    await filmsStore.loadFavoriteFilms();

    expect(filmsStore.favoriteFilms.length).toBe(0);
  });

  it('Прерывает запрос Избранных фильмов в стор если уже идет загрузка', async () => {
    const filmsStore = useFilmStore();

    filmsStore.isLoadingFavorites = true;

    await filmsStore.loadFavoriteFilms();

    expect(filmsStore.isLoadingFavorites).toBe(true);
  });

  it('Запрашивает и устанавливает Случайный фильм в стор', async () => {
    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimOk);
    const store = useFilmStore();

    await store.loadRandomFilm();

    expect(store.film?.id).toBe(mockFilmData.id);
  });

  it('Прерывает запрос Случайного фильма в стор если уже идет загрузка', async () => {
    const filmsStore = useFilmStore();

    filmsStore.isLoadingFilm = true;

    await filmsStore.loadRandomFilm();

    expect(filmsStore.isLoadingFilm).toBe(true);
  });

  it('Вызывает ошибку при ошибке запроса Случайного фильма', async () => {
    const filmsStore = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationError);

    await filmsStore.loadRandomFilm();

    expect(!!filmsStore.film).toBe(false);
  });

  it('Запрашивает и устанавливает фильм по ID в стор', async () => {
    const store = useFilmStore();
    const filmId = mockFilmData.id;

    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimOk);

    await store.loadFilmById(filmId);

    expect(store.film?.id).toBe(filmId);
  });

  it('Прерывает запрос фильм по ID в стор если уже идет загрузка', async () => {
    const filmsStore = useFilmStore();

    filmsStore.isLoadingFilm = true;

    await filmsStore.loadFilmById(mockFilmData.id);

    expect(filmsStore.isLoadingFilm).toBe(true);
  });

  it('Вызывает ошибку при ошибке запросе фильма по ID', async () => {
    const filmsStore = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationError);

    await filmsStore.loadFilmById(mockFilmData.id);

    expect(!!filmsStore.film).toBe(false);
  });

  it('Выполняет поиск фильмов по названию', async () => {
    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimsOk);
    const store = useFilmStore();

    await store.loadSearchedFilms(mockFilmData.title);

    expect(store.searchedFilms.length).toBe(filmsDataMock.length);
  });

  it('Вызывает ошибку при ошибке запроса поиска фильмов по названию', async () => {
    const filmsStore = useFilmStore();
    vi.mocked(getFilms).mockReturnValue(mockedImplementationError);

    await filmsStore.loadSearchedFilms(mockFilmData.title);

    expect(filmsStore.searchedFilms.length).toBe(0);
  });

  it('Добаляет фильм в избранные', async () => {
    const store = useFilmStore();

    const isAdding = await store.toggleFavoriteFilm(String(mockFilmData.id));
    vi.mocked(getFilms).mockReturnValue(mockedImplementationFimOk);

    expect(isAdding).toBe(true);
  });

  it('Прерывает запрос на изменение фильма в Избранное если уже идет загрузка', async () => {
    const filmsStore = useFilmStore();

    filmsStore.isTogglingFavorite = true;

    await filmsStore.toggleFavoriteFilm(String(mockFilmData.id));

    expect(filmsStore.isTogglingFavorite).toBe(true);
  });

  it('Удаляет фильм из избранных', async () => {
    const filmStore = useFilmStore();
    const userStore = useUserStore();

    const mockProfile = {
      favorites: ['52', '29', String(mockFilmData.id), '298'],
      name: 'Alex',
      surname: 'Ivanov',
      email: 'test@email.com'
    };

    userStore.userProfile = mockProfile;
    userStore.isAuth = true;

    const isAdding = await filmStore.toggleFavoriteFilm(String(mockFilmData.id));

    expect(isAdding).toBe(false);
  });
});
