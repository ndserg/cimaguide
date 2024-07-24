<template>
  <main :key="$route.fullPath">
    <FilmIntro />

    <RouterView />
  </main>
</template>

<script setup lang="ts">
import FilmIntro from '@/components/Films/FilmIntro.vue';
</script>
