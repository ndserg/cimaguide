<template>
  <div class="films-container">
    <swiper-container init="false">
      <swiper-slide
        class="films-list__item"
        :class="{ 'films-list__item-counter': counter }"
        v-for="film in films"
        :key="film.id"
      >
        <FilmCard :film="film" :isLoadingFilm="filmStore.isLoadingFilm" />

        <button
          v-if="isFavoritePge && !filmStore.isLoadingFilm"
          class="films-list__delete-btn"
          type="button"
          :data-id="film.id"
        >
          <svg class="films-list__delete-icon" width="14" height="14" aria-hidden="true">
            <use xlink:href="/img/icons/sprite.svg#icon-delete"></use>
          </svg>
        </button>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import FilmCard from './FilmCard.vue';
import { register } from 'swiper/element/bundle';
import type { Swiper, SwiperOptions } from 'swiper/types';
import { useFilmStore } from '@/stores/film';
import type { IFilm } from '@/types';

defineProps<{
  films: IFilm[];
  counter?: boolean;
  isFavoritePge?: boolean;
}>();

const filmStore = useFilmStore();

type SwiperRef = null | (HTMLElement & { swiper: Swiper; initialize: () => void });

const swiperParams: SwiperOptions = {
  updateOnWindowResize: true,
  rewind: true,
  breakpoints: {
    320: {
      enabled: true,
      slidesPerView: 1,
      spaceBetween: 40,
      slidesOffsetBefore: 20,
      width: 224
    },
    768: {
      enabled: false,
      slidesPerView: 'auto',
      spaceBetween: 0,
      slidesOffsetBefore: 0,
      initialSlide: 0
    }
  },
  injectStyles: [
    `
    .swiper {
      padding-top: 72px;
      padding-bottom: 32px;
    }

    @media (min-width: 768px) {
      .swiper {
        padding-top: 0;
        padding-bottom: 0;

        overflow: visible;
      }

      .swiper-wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, 224px);
        row-gap: 40px;
        column-gap: 30px;
        justify-content: space-between;
      }
    }

    @media (min-width: 992px) {
      .swiper-wrapper {
        row-gap: 64px;
        column-gap: 40px;
      }
    }
    `
  ],
  on: {
    breakpoint: (swiper) => {
      swiper.activeIndex = 0;
    }
  }
};

register();

onMounted(() => {
  const swiperEl: SwiperRef = document.querySelector('swiper-container');

  if (swiperEl) {
    Object.assign(swiperEl, swiperParams);

    swiperEl.initialize();
  }
});

onBeforeUnmount(() => {
  const swiperEl: SwiperRef = document.querySelector('swiper-container');

  if (swiperEl) {
    swiperEl.swiper.destroy();
  }
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

.films-list {
  counter-reset: film-card;
}

.films-list__item {
  position: relative;

  box-sizing: border-box;
  height: 336px;

  counter-increment: film-card;
}

.films-list__item-counter::after {
  position: absolute;
  top: -12px;
  left: -12px;

  display: block;
  min-width: 62px;
  height: 48px;
  padding: 8px 24px;

  font-size: 24px;
  font-weight: 700;
  line-height: 133%;
  color: var(--background-brand-active);

  content: counter(film-card);

  background: var(--background-white);
  border-radius: 50px;
}

.films-list__delete-btn {
  position: absolute;
  top: -20px;
  right: -20px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;

  cursor: pointer;

  background-color: var(--background-white);
  border: none;
  border-radius: 50%;
  opacity: 0;

  transition:
    transform 0.3s,
    opacity 0.3s;

  transform: scale(0);
}

.films-list__delete-icon {
  width: 14px;
  height: 14px;

  fill: var(--content-black);
}

.films-list__item:hover .films-list__delete-btn {
  opacity: 1;
  transform: scale(1);
}

.films-list__item:hover .films-list__delete-btn:hover {
  opacity: 0.6;
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

  .films-container {
    max-width: 1440px;
    padding-right: 20px;
    padding-left: 20px;
    margin: 0 auto;
  }

  .films-list__item {
    padding-top: 0;
    padding-bottom: 0;
  }
}

@media (min-width: 1024px) {
  .top-films__title {
    margin-bottom: 64px;
  }

  .films-container {
    padding-right: 80px;
    padding-left: 80px;
  }
}
</style>
