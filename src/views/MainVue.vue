<template>
  <main>
    <FilmPromo />

    <FilmsTopList />
  </main>
</template>

<script setup lang="ts">
import { useFilmStore } from '@/stores/film';
import FilmPromo from '@/components/Films/FilmPromo.vue';
import FilmsTopList from '@/components/Films/FilmsTopList.vue';

const filmStore = useFilmStore();

filmStore.loadRandomFilm();
</script>
