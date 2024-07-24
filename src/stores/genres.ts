import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getFilms, filmsApiRoutes } from '@/api/films';
import { useNotificationsStore } from '@/stores/notifications';

export const useGenresStore = defineStore('genres', () => {
  const notificationsStore = useNotificationsStore();
  const genres = ref<string[]>([]);
  const currentGenre = ref<string>('');
  const genresLastUpdate = ref<string | null>(null);

  const TODAY = new Date().toLocaleDateString('en-US');

  const loadGenres = async () => {
    if (
      genres.value.length ||
      (genresLastUpdate.value && new Date(genresLastUpdate.value) >= new Date(TODAY))
    ) {
      return false;
    }

    const { data, error } = await getFilms<string[]>({ route: filmsApiRoutes.genres });

    if (error.value || !Array.isArray(data.value)) {
      const errorMessage = 'Ошибка запроса жанров';

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      genres.value = data.value;
      genresLastUpdate.value = new Date().toLocaleDateString('en-US');
    }
  };

  return { genres, currentGenre, loadGenres };
});
