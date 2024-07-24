<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <RouterLink class="header__logo" to="/">
          <img
            alt="Логотип LLC «Мультимедиа Визион» CinemaGuide"
            class="header__logo-img"
            src="@/assets/logo.svg"
            width="136"
            height="18"
          />
        </RouterLink>

        <nav class="header__nav">
          <HeaderNav />
        </nav>

        <div class="header__search">
          <HeaderSearch />
        </div>

        <div class="header__user">
          <UserBlock />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import HeaderNav from '@/components/HeaderNav.vue';
import HeaderSearch from '@/components/HeaderSearch.vue';
import UserBlock from '@/components/UserBlock.vue';
</script>

<style scoped>
.header {
  --header-padding-v: 16px;

  position: sticky;
  top: 0;
  z-index: 100;

  width: 100%;
  padding-top: var(--header-padding-v);
  padding-bottom: var(--header-padding-v);

  background-color: rgba(0, 0, 0, 0.5);

  backdrop-filter: blur(20px);
}

.header__wrapper {
  position: relative;

  display: flex;
  column-gap: 20px;
  align-items: center;
}

.header__logo {
  display: block;
  flex-shrink: 0;
  width: 136px;
  height: 18px;
  margin-right: auto;

  text-decoration: none;

  outline: none;

  transition: opacity 0.3s;
}

.header__logo:focus-visible,
.header__logo:hover {
  opacity: 0.5;
}

.header__logo-img {
  width: 100%;
  height: 100%;
}

@media (min-width: 576px) {
  .header__search {
    flex-grow: 1;
    flex-shrink: 1;
  }
}

@media (min-width: 768px) {
  .header {
    --header-padding-v: 24px;

    padding-top: var(--header-padding-v);
    padding-bottom: var(--header-padding-v);
  }
  .header__wrapper {
    column-gap: 40px;
  }
}

@media (min-width: 1200px) {
  .header__wrapper {
    column-gap: 0;
  }

  .header__logo {
    width: 240px;
    height: 32px;
    margin-right: 80px;
  }

  .header__nav {
    margin-right: 40px;
  }

  .header__search {
    margin-right: 80px;
  }
}
</style>
