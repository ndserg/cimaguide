<template>
  <div class="film-card" :class="{ 'film-card--disabled': isLoadingFilm }">
    <h3 class="film-card__title">
      <RouterLink class="film-card__link" :to="isLoadingFilm ? '' : `/about/${String(film.id)}`">{{
        film.title
      }}</RouterLink>
    </h3>
    <img class="film-card__img" :src="film.posterUrl" :alt="film.plot" v-if="film.posterUrl" />
    <p class="film-card__noimg" v-else>{{ film.title }}</p>
  </div>
</template>

<script setup lang="ts">
import type { IFilm } from '@/types';

defineProps<{
  film: IFilm;
  isLoadingFilm: boolean;
}>();
</script>

<style scoped>
.film-card {
  position: relative;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background-color: #3c3c3c;

  border: 1px solid transparent;
  border-radius: 16px;
}

.film-card__img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-radius: 16px;
}

.film-card__noimg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
}

.film-card__title {
  font-size: 0;
  line-height: 0;
  color: transparent;
}

.film-card__link {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  width: 100%;
  height: 100%;

  font: inherit;
  color: inherit;

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;

  outline: none;

  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
}

.film-card__link:focus-visible,
.film-card__link:hover {
  border-color: rgba(133, 119, 225, 0.73);
  box-shadow: 0 0 80px 0 rgba(133, 119, 225, 0.53);
}

.film-card__link:active {
  background-color: rgba(255, 255, 255, 0.3);
}

.film-card--disabled .film-card__link {
  pointer-events: none;
  cursor: not-allowed;
  background-color: rgba(255, 255, 255, 0.5);
}

@media (min-width: 992px) {
  .film-card {
    transition: transform 0.3s;
  }

  .film-card:hover {
    transform: scale(1.03);
  }

  .film-card--disabled:hover {
    transform: scale(1);
  }
}
</style>
