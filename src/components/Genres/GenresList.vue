<template>
  <ul class="genres-list list-reset" v-if="genresStore.genres.length === 0">
    <li v-for="genre in 8" :key="genre">
      <GenreCardSkeleton />
    </li>
  </ul>

  <ul class="genres-list list-reset" v-else>
    <li v-for="genre in genresStore.genres" :key="genre">
      <GenreCard :genre="genre" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import GenreCard from './GenreCard.vue';
import GenreCardSkeleton from './GenreCardSkeleton.vue';
import { useGenresStore } from '@/stores/genres';

const genresStore = useGenresStore();

genresStore.loadGenres();
</script>

<style scoped>
.genres-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 335px);
  row-gap: 24px;
  justify-content: center;
}

@media (min-width: 576px) {
  .genres-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
    column-gap: 28px;
    justify-content: space-between;
  }
}

@media (min-width: 1400px) {
  .genres-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    row-gap: 64px;
    column-gap: 40px;
  }
}
</style>
