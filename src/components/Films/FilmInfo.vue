<template>
  <div class="promo__film-data">
    <h2 class="promo__title">{{ film.title }}</h2>

    <p class="promo__description">
      {{ film.plot }}
    </p>

    <ul class="promo__details-list list-reset" aria-label="Краткая информация">
      <li class="promo__details-item">
        <span class="visually-hidden">Рейтинг: </span>
        <RatingElement :text="film.tmdbRating" />
      </li>
      <li class="promo__details-item">
        <time class="visually-hidden" :datetime="film.releaseDate">Год выхода: </time
        >{{ film.releaseYear }}
      </li>
      <li class="promo__details-item">
        <span class="visually-hidden">Жанр: </span>{{ film.genreLocal }}
      </li>
      <li class="promo__details-item">
        <span class="visually-hidden">Длительность фильма: </span>{{ film.duration }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import RatingElement from '@/components/Icons/IconRating.vue';
import type { ILocalFilm } from '@/types';

const props = defineProps<{
  film: ILocalFilm;
}>();
</script>

<style scoped>
.promo__film-data {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}
.promo__title {
  margin: 0;

  font-size: clamp(24px, 6.4vw, 48px);
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);
}

.promo__description {
  margin: 0;

  font-size: clamp(18px, 4.8vw, 24px);
  line-height: 133%;
  color: var(--content-secondary);
}

.promo__details-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  align-items: center;
  order: -1;
}

.promo__details-item {
  font-size: clamp(14px, 3.73vw, 18px);
  line-height: 143%;
  color: var(--content-secondary);
}

@media (min-width: 576px) {
  .promo__trailer-btn {
    flex-grow: 0;
    width: auto;
  }
}

@media (min-width: 992px) {
  .promo__film-data {
    row-gap: 16px;
  }

  .promo__title {
    line-height: 117%;
  }

  .promo__details-item {
    line-height: 133%;
  }
}
</style>
