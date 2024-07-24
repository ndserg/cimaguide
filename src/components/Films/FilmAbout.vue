<template>
  <section class="about">
    <div class="container">
      <h2 class="about__title">О фильме</h2>

      <FilmAboutSkeleton v-if="!film || filmStore.isLoadingFilm" />

      <ul class="about__list list-reset" v-else>
        <li class="about__item" v-for="[name, value] in filmPropertiesList" :key="name">
          <span class="about__item-def">{{ value }}</span>
          <span class="about__item-desc">{{ film[name] || 'Нет данных' }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFilmStore } from '@/stores/film';
import FilmAboutSkeleton from './FilmAboutSkeleton.vue';
import type { IFilm } from '@/types';

const filmStore = useFilmStore();
const { film } = storeToRefs(filmStore);

const filmPropertiesList: [key: keyof IFilm, string][] = [
  ['language', 'Язык оригинала'],
  ['budget', 'Бюджет'],
  ['revenue', 'Выручка'],
  ['director', 'Режиссёр'],
  ['production', 'Продакшен'],
  ['awardsSummary', 'Награды']
];
</script>

<style scoped>
.about {
  padding-top: 32px;
  padding-bottom: 32px;
}

.about__title {
  font-size: clamp(24px, 6.4vw, 40px);
  font-weight: 700;
  line-height: 133%;
}

.about__list {
  display: inline-flex;
  flex-direction: column;
  row-gap: 12px;
}

.about__item {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.about__item-def {
  font-size: clamp(14px, 3.73vw, 18px);
  line-height: 143%;
  color: var(--content-disabled);
}

.about__item-desc::first-letter {
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .about {
    padding-top: 40px;
    padding-bottom: 64px;
  }

  .about__list {
    row-gap: 24px;
  }

  .about__item {
    flex-direction: row;
    column-gap: 8px;
  }

  .about__item-def {
    display: flex;
    column-gap: 8px;
    min-width: 320px;

    color: var(--content-primary);
  }

  .about__item-def::after {
    display: block;
    flex-grow: 1;
    flex-shrink: 1;

    content: '';

    background-image: url('/img/about-bg.svg');
    background-repeat: repeat-x;
    background-position: left bottom;
  }
}

@media (min-width: 992px) {
  .about {
    padding-bottom: 120px;
  }

  .about__title {
    line-height: 120%;
  }
}
</style>
