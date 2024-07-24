<template>
  <ul class="about-list-skeleton list-reset">
    <li class="about__item">
      <span class="about__item-def">Язык оригинала</span>
      <AnimatedPlaceholder width="120px" />
    </li>
    <li class="about__item">
      <span class="about__item-def">Бюджет</span>
      <AnimatedPlaceholder width="154px" />
    </li>
    <li class="about__item">
      <span class="about__item-def">Выручка</span>
      <AnimatedPlaceholder width="170px" />
    </li>
    <li class="about__item">
      <span class="about__item-def">Режиссёр</span>
      <AnimatedPlaceholder width="220px" />
    </li>
    <li class="about__item">
      <span class="about__item-def">Продакшен</span>
      <AnimatedPlaceholder width="138px" />
    </li>
    <li class="about__item">
      <span class="about__item-def">Награды</span>
      <AnimatedPlaceholder width="204px" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
</script>

<style scoped>
.about-list-skeleton {
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

@media (min-width: 768px) {
  .about-list-skeleton {
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
</style>
