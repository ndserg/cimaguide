import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { useGenresStore } from '@/stores/genres';
import { useCoursesStore } from '@/stores/courses';
import { getFilms, filmsApiRoutes } from '@/api/films';
import { useNotificationsStore } from '@/stores/notifications';
import type { IFilm, ILocalFilm } from '@/types';
import { SAERCHED_FILMS_COUNT } from '@/const';
import { rowFilmToLocal, toJson } from '@/utils';
import { LOAD_FILMS_COUNT } from '@/const';

export const useFilmStore = defineStore('film', () => {
  const film = ref<ILocalFilm | null>(null);
  const films = ref<IFilm[] | []>([]);
  const searchedFilms = ref<IFilm[] | []>([]);
  const showTrailer = ref<boolean>(false);
  const favoriteFilms = ref<IFilm[] | []>([]);
  const isLoadingFavorites = ref<Boolean>(false);
  const currentPage = ref<number>(0);
  const isLastPage = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isLoadingFilm = ref<boolean>(false);
  const isTogglingFavorite = ref<boolean>(false);

  const userStore = useUserStore();
  const genresStore = useGenresStore();
  const coursesStore = useCoursesStore();
  const notificationsStore = useNotificationsStore();

  const loadFavoriteFilms = async (): Promise<void> => {
    if (isLoadingFavorites.value) {
      return;
    }

    isLoadingFavorites.value = true;
    const options = {
      credentials: 'include'
    };

    const { data, loading, error } = await getFilms<IFilm[] | []>({
      route: filmsApiRoutes.favorites,
      options: options
    });

    if (error.value || !Array.isArray(data.value)) {
      const errorMessage = `Ошибка запроса Избранных фильмов`;

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      favoriteFilms.value = data.value;
    }

    isLoadingFavorites.value = loading.value;
  };

  const loadFilmsByGenre = async () => {
    if (isLastPage.value || isLoading.value) {
      return;
    }

    isLoading.value = true;

    const requestParams = {
      count: LOAD_FILMS_COUNT,
      genre: genresStore.currentGenre || '',
      page: String(currentPage.value)
    };

    const { data, error } = await getFilms<IFilm[] | []>({
      route: filmsApiRoutes.main,
      params: requestParams
    });

    if (error.value || !Array.isArray(data.value)) {
      const errorMessage = `Ошибка запроса фильмов`;

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      if (data.value.length === 0) {
        isLastPage.value = true;
      }

      if (films.value.length > 0) {
        films.value.push(...(data.value as []));
      } else {
        const sortedFilms = [...data.value].sort((a, b) => b.tmdbRating - a.tmdbRating);
        films.value = sortedFilms;
      }
    }

    isLoading.value = false;
    currentPage.value++;
  };

  const loadSearchedFilms = async (searchStr: string) => {
    searchedFilms.value = [];

    const requestParams = {
      count: SAERCHED_FILMS_COUNT,
      title: searchStr
    };

    const { data, error } = await getFilms<IFilm[] | []>({
      route: filmsApiRoutes.main,
      params: requestParams
    });

    if (error.value || !Array.isArray(data.value)) {
      const errorMessage = `Ошибка поиска фильмов`;

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      searchedFilms.value = data.value;
    }
  };

  const resetFilmsByGenre = () => {
    isLastPage.value = false;
    isLoading.value = false;
    currentPage.value = 0;
    films.value = [];
  };

  const loadTopFilms = async (): Promise<void> => {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;

    const { data, error } = await getFilms<IFilm[] | []>({ route: filmsApiRoutes.top10 });

    if (error.value || !Array.isArray(data.value)) {
      const errorMessage = `Ошибка запроса Топ 10 фильмов`;

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      films.value = data.value;
    }
    isLoading.value = false;
  };

  const loadRandomFilm = async (): Promise<void> => {
    if (isLoadingFilm.value) {
      return;
    }

    isLoadingFilm.value = true;

    const { data, error } = await getFilms<IFilm>({ route: filmsApiRoutes.random });

    if (error.value || !data.value?.id) {
      const errorMessage = 'Ошибка запроса случайного фильма';

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      const isFavorite = userStore.checkIsFavorite(String(data.value.id));
      film.value = rowFilmToLocal(data.value, isFavorite);
    }

    isLoadingFilm.value = false;
  };

  const loadFilmById = async (id: number) => {
    if (isLoadingFilm.value) {
      return;
    }

    isLoadingFilm.value = true;

    searchedFilms.value = [];

    if (!coursesStore.checkActualCourse) {
      await coursesStore.updateValueCourse();
    }

    const { data, error } = await getFilms<IFilm>({ route: `${filmsApiRoutes.byId}/${id}` });

    if (error.value || !data.value?.id) {
      const errorMessage = 'Ошибка запроса фильма';

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      const filmData = {
        ...data.value,
        budget: coursesStore.getUsdToRub(data.value.budget),
        revenue: coursesStore.getUsdToRub(data.value.revenue)
      };
      const isFavorite = userStore.checkIsFavorite(String(filmData.id));
      film.value = rowFilmToLocal(filmData, isFavorite);
    }

    isLoadingFilm.value = false;
  };

  const toggleFavoriteFilm = async (id: string) => {
    let isAdding = false;

    if (userStore.isLoading || isLoadingFilm.value || isTogglingFavorite.value) {
      return;
    }

    isTogglingFavorite.value = true;
    userStore.isLoading = true;

    let errorMessage = '';

    if (userStore.checkIsFavorite(id)) {
      const options = {
        method: 'DELETE',
        credentials: 'include'
      };

      const { data, error } = await getFilms<Record<string, boolean>>({
        route: `${filmsApiRoutes.favorites}/${id}`,
        options: options
      });

      if (error.value || !data.value?.result) {
        errorMessage = `Ошибка удаления из избранного`;

        notificationsStore.setNotification(errorMessage, 'error');
      } else {
        const index = favoriteFilms.value.findIndex((item) => String(item.id) === id);

        if (index !== -1) {
          favoriteFilms.value.splice(index, 1);
        }
      }
    } else {
      isAdding = true;
      const options = {
        method: 'POST',
        credentials: 'include',
        body: toJson({ id: id })
      };

      const { data, error } = await getFilms<Record<string, boolean>>({
        route: filmsApiRoutes.favorites,
        options: options
      });

      if (error.value || !data.value?.result) {
        errorMessage = `Ошибка добавления в избранное`;
      }
    }

    if (errorMessage) {
      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      await userStore.loadProfile();

      if (film.value) {
        film.value.isFavorite = !film.value?.isFavorite;
      }
    }

    isTogglingFavorite.value = userStore.isLoading;

    return isAdding;
  };

  return {
    film,
    films,
    favoriteFilms,
    loadFilmsByGenre,
    resetFilmsByGenre,
    loadTopFilms,
    loadFavoriteFilms,
    loadRandomFilm,
    loadFilmById,
    toggleFavoriteFilm,
    isLoading,
    isLoadingFilm,
    isLoadingFavorites,
    isTogglingFavorite,
    showTrailer,
    loadSearchedFilms,
    searchedFilms
  };
});
