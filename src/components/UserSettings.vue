<template>
  <UserSettingsSkeleton v-if="userStore.isLoading" />

  <section class="container wrapper" v-else>
    <h2 class="visually-hidden">Настройка аккаунта</h2>
    <ul class="user-list list-reset">
      <li class="user-list__item">
        <div class="user-list__icon-wrapper">{{ getUserNameInitials }}</div>
        <div class="user-list__data">
          <h3 class="user-list__title">Имя Фамилия</h3>
          <p class="user-list__text user-list__text--name">{{ getUserFullName }}</p>
        </div>
      </li>
      <li class="user-list__item">
        <div class="user-list__icon-wrapper">
          <svg
            class="user-list__icon user-list__icon--email"
            width="22"
            height="18"
            aria-hidden="true"
          >
            <use xlink:href="/img/icons/sprite.svg#icon-email"></use>
          </svg>
        </div>
        <div class="user-list__data">
          <h3 class="user-list__title">Электронная почта</h3>
          <p class="user-list__text">{{ userStore.userProfile?.email }}</p>
        </div>
      </li>
    </ul>

    <ButtonText
      @click="userStore.userLogOut"
      text="Выйти из аккаунта"
      extraClass="primary"
      type="button"
      :disabled="userStore.isLoading"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import ButtonText from '@/components/Buttons/ButtonText.vue';
import UserSettingsSkeleton from './UserSettingsSkeleton.vue';

const userStore = useUserStore();

const getUserNameInitials = computed(() => {
  const initials = `${userStore.userProfile?.name[0]}${userStore.userProfile?.surname[0]}`;
  return initials.toUpperCase();
});

const getUserFullName = computed(() => {
  const fullName = `${userStore.userProfile?.name} ${userStore.userProfile?.surname}`;
  return fullName;
});
</script>

<style scoped>
.wrapper {
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

  font-size: 14px;
  font-weight: 400;
  line-height: 143%;
  color: var(--content-disabled);
}

.user-list__text {
  margin: 0;

  font-size: 18px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);
}

.user-list__text--name {
  text-transform: capitalize;
}

@media (min-width: 576px) {
  .wrapper {
    align-items: flex-start;
  }
}

@media (min-width: 768px) {
  .user-list__icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .user-list__title {
    font-size: 18px;
    line-height: 133%;
    color: var(--content-primary);
  }

  .user-list__text {
    font-size: 24px;
  }
}

@media (min-width: 992px) {
  .wrapper {
    row-gap: 64px;
  }
}
</style>
