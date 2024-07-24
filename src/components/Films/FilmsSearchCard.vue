<template>
  <div class="film-search-card" :data-id="film.id">
    <div class="film-img-wrapper">
      <img class="film-img" :src="film.posterUrl" :alt="film.title" v-if="film.posterUrl" />
    </div>

    <div class="film-info">
      <h2 class="film-info__title">
        <RouterLink class="film-search-card__link" :to="`/about/${String(film.id)}`"
          >{{ film.title }}
        </RouterLink>
      </h2>

      <ul class="film-info__details-list list-reset" aria-label="Краткая информация">
        <li class="film-info__details-item">
          <span class="visually-hidden">Рейтинг: </span>
          <RatingElement :text="film.tmdbRating" size="small" />
        </li>
        <li class="film-info__details-item">
          <time class="visually-hidden" :datetime="film.releaseDate">Год выхода: </time
          >{{ film.releaseYear }}
        </li>
        <li class="film-info__details-item">
          <span class="visually-hidden">Жанр: </span>{{ getGenreLocale }}
        </li>
        <li class="film-info__details-item">
          <span class="visually-hidden">Длительность фильма: </span>{{ getDuration }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RatingElement from '@/components/Icons/IconRating.vue';
import type { IFilm } from '@/types';
import { genreToLocaleRu, getDurationString } from '@/utils';

const props = defineProps<{
  film: IFilm;
}>();

const getGenreLocale = computed(() => {
  return genreToLocaleRu(props.film.genres[0]);
});

const getDuration = computed(() => {
  return getDurationString(props.film.runtime);
});
</script>

<style scoped>
.film-search-card {
  position: relative;

  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.film-img {
  width: 158px;
  height: 206px;

  object-fit: cover;
}

.film-info {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.film-info__title {
  margin: 0;

  font-size: 18px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);
}

.film-search-card__link {
  font: inherit;
  color: inherit;
  text-decoration: none;
}

.film-info__details-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 12px;
  column-gap: 12px;
  align-items: center;
  order: -1;
}

.film-info__details-item {
  font-size: 14px;
  font-weight: 400;
  line-height: 143%;
  color: var(--content-secondary);
}

@media (min-width: 576px) {
  .film-search-card {
    flex-direction: row;
    column-gap: 16px;
    padding-top: 20px;
    padding-right: 8px;
    padding-bottom: 20px;
    padding-left: 8px;
  }

  .film-img {
    width: 40px;
    height: 52px;
  }

  .film-search-card__link::after {
    position: absolute;
    top: 0;
    left: 0;

    display: block;
    width: 100%;
    height: 100%;

    content: '';
  }

  .film-search-card__link:hover::after {
    border: 1px solid var(--content-disabled);
    border-radius: 6px;
  }
}
</style>
