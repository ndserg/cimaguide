<template>
  <div class="search" :class="{ 'search--show': isShowSearch }">
    <div class="search__control">
      <input
        class="search__input"
        v-model="searchStr"
        type="text"
        name="search"
        id="search"
        autocomplete="off"
        placeholder="Поиск"
      />

      <label class="search__label" for="search">
        Поиск по фильмам

        <svg class="search__icon" aria-hidden="true">
          <use xlink:href="/img/icons/sprite.svg#icon-search"></use>
        </svg>
      </label>

      <button class="clear__button" type="button" v-if="searchStr.length > 0" @click="clearSearch">
        Поиск
        <svg class="clear__button-icon" aria-hidden="true">
          <use xlink:href="/img/icons/sprite.svg#icon-delete"></use>
        </svg>
      </button>
    </div>

    <div v-if="filmStore.searchedFilms.length > 0" class="search__results">
      <FilmsSearchList :films="searchedFilms" />
    </div>

    <button class="search__button" type="button" @click="isShowSearch = true">
      Поиск
      <svg class="search__button-icon" aria-hidden="true">
        <use xlink:href="/img/icons/sprite.svg#icon-search"></use>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useFilmStore } from '@/stores/film';
import FilmsSearchList from '@/components/Films/FilmsSearchList.vue';

const filmStore = useFilmStore();
const router = useRouter();
const { searchedFilms } = storeToRefs(filmStore);

const searchStr = ref<string>('');
const isShowSearch = ref(false);

const clearSearch = () => {
  searchStr.value = '';
  isShowSearch.value = false;
  searchedFilms.value = [];
};

router.afterEach(() => {
  clearSearch();
});

watch(searchStr, (newSearch) => {
  if (newSearch.length >= 3) {
    filmStore.loadSearchedFilms(searchStr.value);
  }
});
</script>

<style scoped>
.search {
  position: relative;
}

.search--show {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
}

.search__control {
  position: relative;

  display: none;
  align-items: center;
  height: 56px;
  padding-right: 16px;
  padding-left: 16px;

  background-color: var(--background-secondary);
  border: none;
  border-radius: 8px;
}

.search--show .search__control {
  display: flex;
}

.search__icon {
  width: 20px;
  height: 20px;

  fill: var(--content-disabled);

  transition: fill 0.3s;
}

.search__input {
  width: 100%;
  margin-right: 12px;
  margin-left: 12px;

  font-size: 18px;
  font-weight: 400;
  line-height: 133%;
  color: var(--background-white);

  background-color: transparent;
  border: none;
}

.search__input:placeholder-shown {
  color: var(--content-disabled);
}

.search__label {
  display: flex;
  align-items: center;
  justify-content: center;
  order: -1;
  width: 24px;
  height: 24px;

  font-size: 0;
  line-height: 0;
}

.search__input:focus {
  outline: none;
}

.search__input:focus + .search__label .search__icon {
  fill: var(--background-white);
}

.search__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;

  font-size: 0;
  line-height: 0;

  cursor: pointer;

  background-color: transparent;
  border: none;

  outline: none;

  transition: color 0.3s;
}

.search__button:focus-visible,
.search__button:hover {
  color: var(--content-active);
}

.search__button-icon {
  width: 20px;
  height: 20px;

  fill: var(--background-white);

  transition: fill 0.3s;
}

.search__button:focus-visible .search__button-icon,
.search__button:hover .search__button-icon {
  fill: var(--content-active);
}

.search--show .search__button {
  display: none;
}

.clear__button {
  display: block;
  width: 24px;
  height: 24px;
  padding: 0;

  font-size: 0;
  line-height: 0;

  cursor: pointer;

  background-color: transparent;
  border: none;

  outline: none;

  transition:
    fill 0.3s,
    opacity 0.3s;
}

.clear__button-icon {
  width: 14px;
  height: 14px;

  fill: var(--content-disabled);

  transition: fill 0.3s;
}

.clear__button:focus-visible .clear__button-icon,
.clear__button:hover .clear__button-icon {
  fill: var(--content-primary);
}

.clear__button:active {
  opacity: 0.6;
}

.search__results {
  position: absolute;
  top: calc(100% + 8px);

  width: 100%;

  background-color: var(--background-secondary);
}

@media (min-width: 576px) {
  .search--show {
    position: relative;

    width: auto;
  }

  .search__button {
    display: none;
  }

  .search__control {
    display: flex;
    height: 48px;
  }

  .search__results {
    top: calc(100% + var(--header-padding-v));
    height: auto;
    padding-right: 8px;
    padding-bottom: 8px;
    padding-left: 8px;

    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
</style>
