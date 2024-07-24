<template>
  <section class="container user-settings-skeleton">
    <h2 class="visually-hidden">Настройка аккаунта</h2>
    <ul class="user-list list-reset">
      <li class="user-list__item">
        <div class="user-list__icon-wrapper">
          <AnimatedPlaceholder width="100%" height="100%" border-radius="50%" />
        </div>
        <div class="user-list__data">
          <h3 class="user-list__title">Имя Фамилия</h3>
          <p class="user-list__text user-list__text--name">
            <AnimatedPlaceholder width="200px" height="100%" border-radius="24px" />
          </p>
        </div>
      </li>
      <li class="user-list__item">
        <div class="user-list__icon-wrapper">
          <AnimatedPlaceholder width="100%" height="100%" border-radius="50%" />
        </div>
        <div class="user-list__data">
          <h3 class="user-list__title">Электронная почта</h3>
          <p class="user-list__text">
            <AnimatedPlaceholder width="200px" height="100%" border-radius="24px" />
          </p>
        </div>
      </li>
    </ul>

    <ButtonText text="Выйти из аккаунта" extraClass="primary" type="button" disabled />
  </section>
</template>

<script setup lang="ts">
import ButtonText from '@/components/Buttons/ButtonText.vue';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';
</script>

<style scoped>
.user-settings-skeleton {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.user-list {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.user-list__item {
  display: flex;
  column-gap: 16px;
  align-items: flex-start;
}

.user-list__data {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.user-list__icon-wrapper {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  font-size: 24px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);

  background-color: var(--background-disabled);
  border-radius: 50%;
}

.user-list__icon {
  fill: var(--content-primary);
}

.user-list__icon--email {
  width: 22px;
  height: 18px;
}

.user-list__title {
  margin: 0;
}

.user-list__text {
  height: 24px;
  margin: 0;
}

@media (min-width: 576px) {
  .user-settings-skeleton {
    align-items: flex-start;
  }
}

@media (min-width: 768px) {
  .user-list__icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .user-list__text {
    height: 32px;
  }
}

@media (min-width: 992px) {
  .user-settings-skeleton {
    row-gap: 64px;
  }
}
</style>
