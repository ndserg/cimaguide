<template>
  <div class="user-block">
    <AnimatedPlaceholder
      class="user-block__link--loading"
      height="100%"
      border-radius="24px"
      v-if="userStore.isLoading"
    />

    <RouterLink class="user-block__link" to="/user" v-else>
      {{ !userStore.isAuth ? 'Войти' : userStore.userProfile?.name }}

      <svg class="user-block__icon" aria-hidden="true">
        <use
          :xlink:href="`/img/icons/sprite.svg#icon-user${userStore.isAuth ? '-active' : ''}`"
        ></use>
      </svg>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder.vue';

const userStore = useUserStore();
</script>

<style scoped>
.user-block__link {
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

.user-block__link:focus-visible,
.user-block__link:hover {
  color: var(--content-active);
}

.user-block__icon {
  width: 16px;
  height: 21px;

  fill: var(--content-primary);

  transition: fill 0.3s;
}

.current.user-block__link .user-block__icon {
  fill: #dc5dfc;
}

.user-block__link:focus-visible .user-block__icon,
.user-block__link:hover .user-block__icon {
  fill: var(--content-active);
}

.user-block__link--loading {
  width: 24px;
  height: 24px;
}

@media (min-width: 992px) {
  .user-block__link {
    position: relative;

    display: block;
    width: auto;
    height: auto;
    padding-top: 8px;
    padding-bottom: 8px;

    font-size: 24px;
    font-weight: 400;
    line-height: 133%;
    color: var(--background-white);
    text-decoration: none;
    text-transform: capitalize;
  }

  .user-block__link::after {
    position: absolute;
    bottom: 0;

    display: block;
    width: 100%;
    height: 1.5px;

    content: '';
    background-color: transparent;

    transition:
      transform 0.3s,
      background-color 0.3s;
    transform: scaleX(0);
  }

  .current.user-block__link::after {
    background-color: #dc5dfc;

    transform: scaleX(1);
  }

  .user-block__link--loading {
    width: 132px;
    height: 32px;
  }

  .user-block__icon {
    display: none;
  }
}
</style>
