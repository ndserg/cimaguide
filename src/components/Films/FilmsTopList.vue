<template>
  <section class="top-films">
    <div class="container">
      <h2 class="top-films__title">Топ 10 фильмов</h2>
    </div>

    <FilmsWithSwiperSkeleton v-if="filmStore.films.length === 0" counter />

    <FilmsListWithSwiper :films="filmStore.films" counter v-else />
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { useFilmStore } from '@/stores/film';
import FilmsWithSwiperSkeleton from './FilmsWithSwiperSkeleton.vue';
import FilmsListWithSwiper from './FilmsWithSwiper.vue';

const filmStore = useFilmStore();
filmStore.loadTopFilms();

onBeforeUnmount(() => {
  filmStore.resetFilmsByGenre();
});
</script>

<style scoped>
.top-films {
  padding-top: 32px;
}

.top-films__title {
  margin: 0;
  margin-bottom: -32px;
  font-size: 24px;

  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);
}

@media (min-width: 768px) {
  .top-films {
    padding-top: 40px;
    padding-bottom: 120px;
  }

  .top-films__title {
    margin-bottom: 40px;

    font-size: 40px;
    line-height: 120%;
  }
}

@media (min-width: 1024px) {
  .top-films__title {
    margin-bottom: 64px;
  }
}
</style>
