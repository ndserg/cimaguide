<template>
  <main class="genres">
    <div class="container">
      <h2 class="genres__title">
        <RouterLink to="/genres" class="genres__title-link" v-if="genreTitle">
          <svg width="11" height="17" class="genres__title-icon" aria-hidden="true">
            <use xlink:href="/img/icons/sprite.svg#icon-arrow"></use>
          </svg>
        </RouterLink>
        {{ genreTitle ? genreTitle : 'Жанры фильмов' }}
      </h2>

      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { genreToLocaleRu } from '@/utils';
import { useGenresStore } from '@/stores/genres';

const genresStore = useGenresStore();

const route = useRoute();
const genreTitle = ref<string>('');

watch(
  () => route.params.genre,
  () => {
    if (route.params.genre) {
      genreTitle.value = genreToLocaleRu(String(route.params.genre));
    } else {
      genreTitle.value = '';
    }

    genresStore.currentGenre = String(route.params.genre);
  },
  { immediate: true }
);
</script>

<style scoped>
.genres {
  padding-top: 24px;
  padding-bottom: 40px;

  overflow: hidden;
}

.genres__title {
  display: flex;
  column-gap: 19px;
  align-items: center;
  margin: 0;
  margin-bottom: 40px;

  font-size: 24px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);
  text-transform: capitalize;
}

.genres__title-link {
  display: block;

  font-size: 0;
  line-height: 0;
  color: inherit;

  outline: none;

  transition: color 0.3s;
}

.genres__title-link:focus-visible {
  color: var(--background-brand-hovered);
}

.genres__title-link:hover {
  color: var(--content-active);
}

.genres__title-link:active {
  color: var(--background-brand-active);
}

.genres__title-icon {
  width: 11px;
  height: 17px;
}

@media (min-width: 768px) {
  .genres {
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .genres__title {
    column-gap: 30px;

    font-size: 32px;
    line-height: 117%;
  }

  .genres__title-icon {
    width: 13px;
    height: 22px;
  }
}

@media (min-width: 992px) {
  .genres {
    padding-top: 64px;
    padding-bottom: 160px;
  }

  .genres__title {
    margin-bottom: 64px;

    font-size: 48px;
  }
}
</style>
