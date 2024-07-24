<template>
  <section class="promo-skeleton">
    <div class="promo__img">
      <AnimatedPlaceholder height="100%" borderRadius="24px" />
    </div>

    <div class="container">
      <div class="promo__info">
        <div class="promo__film-data">
          <h2 class="promo__title">
            <AnimatedPlaceholder width="50%" height="100%" border-radius="12px" />
          </h2>

          <p class="promo__description">
            <AnimatedPlaceholder width="90%" border-radius="24px" />
          </p>
          <p class="promo__description">
            <AnimatedPlaceholder width="60%" border-radius="24px" />
          </p>
          <p class="promo__description">
            <AnimatedPlaceholder width="80%" border-radius="24px" />
          </p>

          <ul class="promo__details-list list-reset" aria-label="Краткая информация">
            <li class="promo__details-item promo__rate">
              <AnimatedPlaceholder width="60px" height="100%" border-radius="16px" />
            </li>
            <li class="promo__details-item">
              <AnimatedPlaceholder width="60px" height="100%" border-radius="6px" />
            </li>
            <li class="promo__details-item">
              <AnimatedPlaceholder width="60px" height="100%" border-radius="6px" />
            </li>
            <li class="promo__details-item">
              <AnimatedPlaceholder width="60px" height="100%" border-radius="6px" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
</script>

<style scoped>
.promo-skeleton {
  position: relative;
}

.promo__img {
  position: relative;

  aspect-ratio: 1.44;

  opacity: 0.3;
}

.promo__info {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  max-width: 600px;
  padding-top: 26px;
  padding-bottom: 24px;
}

.promo__film-data {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.promo__title {
  height: clamp(32px, 6.4vw, 48px);
  margin: 0;
}

.promo__description {
  height: clamp(18px, 4.8vw, 24px);
  margin: 0;
}

.promo__details-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  align-items: center;
  order: -1;
}

.promo__details-item {
  height: clamp(20px, 5.33vw, 24px);
}

.promo__rate {
  height: 32px;
}

@media (min-width: 576px) {
  .promo__trailer-btn {
    flex-grow: 0;
    width: auto;
  }
}

@media (min-width: 992px) {
  .promo-skeleton {
    margin-top: -96px;
  }

  .promo__img {
    position: absolute;
    right: 0;
    z-index: -1;

    width: 62.5vw;
    height: 100%;
  }

  .promo__info {
    row-gap: 60px;
    padding-top: 202px;
    padding-bottom: 122px;
  }

  .promo__film-data {
    row-gap: 16px;
  }

  .promo__title {
    line-height: 117%;
  }

  .promo__details-item {
    line-height: 133%;
  }
}
</style>
