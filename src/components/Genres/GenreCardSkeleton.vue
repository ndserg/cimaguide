<template>
  <div class="genre-card-skeleton">
    <div class="genre-card__img-container">
      <AnimatedPlaceholder width="100%" height="100%" />
    </div>

    <h3 class="genre-card__title">
      <AnimatedPlaceholder width="70%" height="32px" border-radius="24px" />
    </h3>
  </div>
</template>

<script setup lang="ts">
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
</script>

<style scoped>
.genre-card-skeleton {
  position: relative;

  background-color: var(--background-black);
  border: 1px solid transparent;

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;

  outline: none;

  box-shadow: 0 0 80px 0 rgba(255, 255, 255, 0.33);
}

.genre-card__img-container {
  width: 100%;
  height: 220px;
  overflow: hidden;

  background-color: #616161;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

.genre-card__title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 84px;
}
</style>
