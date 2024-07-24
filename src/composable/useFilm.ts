import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useFilmStore } from '@/stores/film';
import { useUserStore } from '@/stores/user';

export const useFilm = () => {
  const router = useRouter();
  const userStore = useUserStore();
  const filmStore = useFilmStore();
  const { film, isLoadingFilm, isTogglingFavorite, showTrailer } = storeToRefs(filmStore);

  const toggleFavorite = () => {
    const filmId = String(film.value?.id);
    if (!userStore.isAuth) {
      router.push('/user');

      return false;
    }

    filmStore.toggleFavoriteFilm(filmId);
  };

  const loadRandomFilm = () => {
    filmStore.loadRandomFilm();
  };

  const setShowTrailer = () => {
    filmStore.showTrailer = true;
  };

  const getFilmById = (id: number) => {
    filmStore.loadFilmById(id);
  };
  return {
    film,
    isLoadingFilm,
    isTogglingFavorite,
    toggleFavorite,
    setShowTrailer,
    showTrailer,
    getFilmById,
    loadRandomFilm
  };
};
