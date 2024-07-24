<template>
  <div class="film-card-skeleton">
    <AnimatedPlaceholder width="100%" height="100%" border-radius="16px" />
  </div>
</template>

<script setup lang="ts">
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
</script>

<style scoped>
.film-card-skeleton {
  position: relative;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
