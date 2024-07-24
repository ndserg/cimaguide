<template>
  <swiper-container init="false">
    <swiper-slide v-for="film in films" :key="film.id">
      <FilmsSearchCard :film="film" />
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { register } from 'swiper/element/bundle';
import type { Swiper, SwiperOptions } from 'swiper/types';
import FilmsSearchCard from './FilmsSearchCard.vue';
import type { IFilm } from '@/types';

defineProps<{
  films: IFilm[];
}>();

type SwiperRef = null | (HTMLElement & { swiper: Swiper; initialize: () => void });

const swiperParams: SwiperOptions = {
  updateOnWindowResize: true,
  rewind: true,
  breakpoints: {
    320: {
      enabled: true,
      slidesPerView: 1,
      spaceBetween: 16,
      slidesOffsetBefore: 20,
      width: 220
    },
    576: {
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
      padding-top: 24px;
      padding-bottom: 24px;
    }

    @media (min-width: 576px) {
      .swiper {
        padding-top: 0;
        padding-bottom: 0;

        overflow: visible;
      }

      .swiper-wrapper {
        display: flex;
        flex-direction: column;
        column-gap: 16px;
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
