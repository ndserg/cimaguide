<template>
  <section class="favorites" @click.prevent="onCardButtonFavoriteClick">
    <h2 class="visually-hidden">Избранные фильмы</h2>

    <FilmsWithSwiperSkeleton v-if="filmStore.isLoadingFavorites || filmStore.isTogglingFavorite" />

    <FilmsListWithSwiper
      :films="filmStore.favoriteFilms"
      isFavoritePge
      v-else-if="filmStore.favoriteFilms.length > 0"
    />

    <div class="container" v-else>В списке избранных фильмов пока ничего нет</div>
  </section>
</template>

<script setup lang="ts">
import { useFilmStore } from '@/stores/film';
import FilmsListWithSwiper from './FilmsWithSwiper.vue';
import FilmsWithSwiperSkeleton from './FilmsWithSwiperSkeleton.vue';

const filmStore = useFilmStore();

filmStore.loadFavoriteFilms();

const onCardButtonFavoriteClick = (evt: Event) => {
  const el = (evt.target as HTMLElement).closest('button');
  if (el && el.classList.contains('films-list__delete-btn') && el.dataset.id) {
    filmStore.toggleFavoriteFilm(String(el.dataset.id));
  }
};
</script>
