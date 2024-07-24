<template>
  <ModalDialog :showModal="openForm" @destroyModal="destroyModal" :isDisabled="isLoading">
    <div class="user-forms" :class="{ 'user-forms--disabled': userStore.isLoading }">
      <div class="user-forms__logo">
        <img
          alt="Логотип LLC «Мультимедиа Визион» CinemaGuide"
          class="user-forms__logo-img"
          src="@/assets/logo.svg"
          width="186"
          height="24"
        />
      </div>

      <FormWelcome @switch-to-logIn="switchToLogin" v-if="isRegistrationSuccess" />
      <FormLogin v-else-if="isLogin" />
      <FormRegister @on-reg-success="isRegistrationSuccess = true" v-else />

      <button
        class="user-forms__toggle-btn"
        @click="isLoginForm = !isLoginForm"
        :disabled="userStore.isLoading"
        v-if="!isRegistrationSuccess"
      >
        {{ isLoginForm ? 'Регистрация' : 'У меня есть пароль' }}
      </button>
    </div>
  </ModalDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import FormLogin from './FormLogin.vue';
import FormRegister from './FormRegister.vue';
import FormWelcome from './FormWelcome.vue';
import ModalDialog from '@/components/ModalDialog.vue';

const userStore = useUserStore();

const isLoginForm = ref<boolean>(true);
const isRegistrationSuccess = ref<boolean>(false);
const { openForm, isLoading } = storeToRefs(userStore);

const isLogin = computed(() => {
  if (isLoginForm.value && !isRegistrationSuccess.value) {
    return true;
  }

  return false;
});

const switchToLogin = () => {
  isLoginForm.value = true;
  isRegistrationSuccess.value = false;
};

const destroyModal = () => {
  openForm.value = false;
};
</script>

<style scoped>
.user-forms {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 420px;
  padding-top: 64px;
  padding-right: 20px;
  padding-bottom: 32px;
  padding-left: 20px;

  background-color: #f6f6f6;
  border-radius: 24px;
}

.user-forms--disabled::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: block;
  width: 100%;
  height: 100%;

  content: '';

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
}

.user-forms__logo {
  margin-bottom: 32px;
}

.user-forms__toggle-btn {
  padding: 0;

  font-size: 18px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-black);
  text-align: center;
  text-decoration: none;

  cursor: pointer;

  background-color: transparent;
  border: none;
}

@media (min-width: 576px) {
  .user-forms {
    width: 420px;
    padding-right: 40px;
    padding-left: 40px;
  }
}
</style>
