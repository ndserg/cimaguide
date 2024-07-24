<template>
  <div class="genre-card">
    <div class="genre-card__img-container">
      <img class="genre-card__img" :src="`/img/genres/${genre}.jpg`" :alt="getGenreLocale" />
    </div>

    <h3 class="genre-card__title">
      <RouterLink class="genre-card__link" :to="`/genres/${genre}`">{{
        getGenreLocale
      }}</RouterLink>
    </h3>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { genreToLocaleRu } from '@/utils';

const props = defineProps<{
  genre: string;
}>();

const getGenreLocale = computed(() => {
  return genreToLocaleRu(props.genre);
});
</script>

<style scoped>
.genre-card {
  position: relative;

  background-color: var(--background-black);
  border: 1px solid transparent;
  border-radius: 24px;
}

.genre-card__img-container {
  width: 100%;
  height: 220px;

  background-color: #616161;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

.genre-card__img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

.genre-card__title {
  padding-top: 21px;
  padding-bottom: 29px;
  margin: 0;

  font-size: 24px;
  line-height: 133%;
  color: var(--content-primary);
  text-align: center;
}

.genre-card__link {
  font: inherit;
  color: inherit;
  text-decoration: none;
  text-transform: capitalize;

  outline: none;
}

.genre-card__link::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: block;
  width: 100%;
  height: 100%;

  font: inherit;
  color: inherit;

  content: '';

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;

  outline: none;

  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
}

.genre-card__link:focus-visible::after,
.genre-card__link:hover::after {
  border-color: rgba(133, 119, 225, 0.73);
  box-shadow: 0 0 80px 0 rgba(133, 119, 225, 0.53);
}

.genre-card__link:active::after {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
