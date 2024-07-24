<template>
  <div v-if="!film || isLoadingFilm">
    <FilmPromoSkeleton />
  </div>

  <section class="promo" v-else>
    <div class="promo__img">
      <img :src="film.posterUrl" :alt="film.title" v-if="film.posterUrl" />
    </div>

    <div class="container">
      <div class="promo__info">
        <FilmInfo :film="film" />

        <div class="promo__controls">
          <ButtonText
            class="promo__trailer-btn"
            extraClass="primary"
            text="Трейлер"
            data-action="showTrailer"
            @click="setShowTrailer"
            :disabled="isLoadingFilm || isTogglingFavorite"
          />
          <ButtonText
            text="О фильме"
            :disabled="isLoadingFilm || isTogglingFavorite"
            data-action="showFilmInfo"
            @click="router.push(`/about/${film.id}`)"
          />
          <ButtonWithIcon
            icon="favorite"
            iconWidth="20px"
            iconHeight="19px"
            :isActive="film.isFavorite"
            :disabled="isLoadingFilm || isTogglingFavorite"
            @action="toggleFavorite"
            data-action="toggleFavorite"
          />
          <ButtonWithIcon
            icon="random"
            iconWidth="20px"
            iconHeight="20px"
            :disabled="isLoadingFilm || isTogglingFavorite"
            @action="loadRandomFilm"
            data-action="loadRandomFilm"
          />
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <Transition>
      <FilmTrailer v-if="showTrailer" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import FilmPromoSkeleton from './FilmPromoSkeleton.vue';
import FilmInfo from '@/components/Films/FilmInfo.vue';
import FilmTrailer from '@/components/Films/FilmTrailer.vue';
import ButtonText from '@/components/Buttons/ButtonText.vue';
import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon.vue';
import { useFilm } from '@/composable/useFilm';

const router = useRouter();
const {
  film,
  isLoadingFilm,
  isTogglingFavorite,
  toggleFavorite,
  setShowTrailer,
  showTrailer,
  loadRandomFilm
} = useFilm();
</script>

<style scoped>
.promo {
  position: relative;
}

.promo__img {
  position: relative;

  aspect-ratio: 1.44;
}

.promo__img::after {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  width: 100%;
  height: 100%;

  content: '';

  background: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.5) 20.41%, rgba(0, 0, 0, 0) 100%);

  transform: rotate(-180deg);
}

.promo__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo__info {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  max-width: 600px;
  padding-top: 26px;
  padding-bottom: 24px;
}

.promo__controls {
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 16px;
}

.promo__trailer-btn {
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
}

@media (min-width: 576px) {
  .promo__trailer-btn {
    flex-grow: 0;
    width: auto;
  }
}

@media (min-width: 992px) {
  .promo {
    margin-top: -96px;
  }

  .promo__img {
    position: absolute;
    right: 0;
    z-index: -1;

    width: 62.5vw;
    height: 100%;
  }

  .promo__img::after {
    transform: rotate(0);
  }

  .promo__img img {
    position: absolute;
  }

  .promo__info {
    row-gap: 60px;
    padding-top: 202px;
    padding-bottom: 122px;
  }
}
</style>
