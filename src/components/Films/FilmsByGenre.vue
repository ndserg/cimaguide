<template>
  <ul class="films-list list-reset" v-if="filmStore.films.length > 0">
    <li class="films-list__item" v-for="film in filmStore.films" :key="film.id">
      <FilmCard :film="film" :isLoadingFilm="filmStore.isLoadingFilm" />
    </li>
  </ul>

  <ul class="films-list films-list--skeleton list-reset" v-if="filmStore.isLoading">
    <li class="films-list__item" v-for="film in 10" :key="film">
      <FilmCardSkeleton />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useFilmStore } from '@/stores/film';
import FilmCardSkeleton from './FilmCardSkeleton.vue';
import FilmCard from './FilmCard.vue';
import { debounce } from '@/utils';

const SCROLL_DELAY = 500;

const filmStore = useFilmStore();

filmStore.loadFilmsByGenre();

const checkPosition = () => {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    filmStore.loadFilmsByGenre();
    return true;
  }
  return false;
};

const checkPositionHandler = debounce(checkPosition, SCROLL_DELAY);

onMounted(() => {
  window.addEventListener('scroll', checkPositionHandler);
  filmStore.loadFilmsByGenre();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkPositionHandler);
  filmStore.resetFilmsByGenre();
});
</script>

<style scoped>
.films-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 335px);
  row-gap: 24px;
  justify-content: center;
  margin-bottom: 40px;
}

.films-list__item {
  max-height: 502px;
  aspect-ratio: 2 / 3;
}

@media (min-width: 448px) {
  .films-list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    column-gap: 24px;
    justify-content: space-between;
  }
}

@media (min-width: 768px) {
  .films-list {
    grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
    row-gap: 40px;
    column-gap: 28px;
  }
}

@media (min-width: 992px) {
  .films-list {
    row-gap: 64px;
    column-gap: 40px;
  }
}
</style>
