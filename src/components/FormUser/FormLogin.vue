<template>
  <Form class="user-form" @submit="onSubmit" :validation-schema="defaultSchema" novalidate="true">
    <div class="user-form__inputs">
      <FormInput
        type="email"
        name="email"
        id="email"
        mode="aggressive"
        placeholder="Электронная почта"
        iconName="icon-email"
        iconWidth="22px"
        iconHeight="18px"
        :disabled="userStore.isLoading"
      />

      <FormInput
        type="password"
        name="password"
        id="password"
        mode="aggressive"
        placeholder="Пароль"
        iconName="icon-key"
        iconWidth="22px"
        iconHeight="12px"
        minlength="5"
        maxlength="20"
        :disabled="userStore.isLoading"
      />
    </div>

    <p class="user-form__error-text" v-if="userStore.isError">{{ userStore.isError }}</p>

    <ButtonText text="Войти" extraClass="primary" type="submit" :disabled="userStore.isLoading" />
  </Form>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Form, type SubmissionHandler } from 'vee-validate';
import { useUserStore } from '@/stores/user';
import { defaultSchema } from './validationShema';
import ButtonText from '@/components/Buttons/ButtonText.vue';
import FormInput from '@/components/FormUser/FormInput.vue';
import type { IUserLogin } from '@/types';

const userStore = useUserStore();

const onSubmit: SubmissionHandler = (values) => {
  if (values.email && values.password) {
    const loginData: IUserLogin = {
      email: values.email,
      password: values.password
    };

    userStore.userLogIn(loginData);
  }
};

onBeforeMount(() => {
  userStore.isError = null;
});
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  width: 100%;
  margin-bottom: 24px;
}

.user-form__error-text {
  margin: 0;
  color: #ff7575;
}

.user-form__inputs {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.user-form__group {
  position: relative;
}

.user-form__input {
  width: 100%;
  padding-top: 14px;
  padding-right: 16px;
  padding-bottom: 14px;
  padding-left: 52px;

  font-size: 18px;
  font-weight: 400;
  line-height: 133%;
  color: var(--content-placeholder);

  background-color: var(--background-white);
  border: 1px solid var(--content-placeholder);
  border-radius: 8px;

  outline: none;

  transition: border-color 0.3s;
}

.user-form__input:not(:placeholder-shown) {
  color: var(--content-black);

  background-color: rgba(255, 255, 255, 0.15);
  border-color: var(--content-placeholder);
}

.user-form__input:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: var(--content-active);
}

.user-form__input:focus {
  border-color: var(--content-active);
}

.user-form__input:invalid {
  border-color: #ff7575;
}

.user-form__label {
  position: absolute;
  top: 50%;
  left: 16px;

  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;

  font-size: 0;
  line-height: 0;

  transform: translateY(-50%);
}

.user-form__input:not(:placeholder-shown) + .user-form__label svg {
  fill: var(--content-placeholder);
}

.user-form__input:hover + .user-form__label svg {
  fill: var(--content-active);
}

.user-form__input:focus + .user-form__label svg {
  fill: var(--content-active);
}

.user-form__input:invalid + .user-form__label svg {
  fill: #ff7575;
}

.user-form__input-icon {
  width: 100%;
  height: auto;
  max-height: 100%;

  fill: var(--content-placeholder);

  transition: fill 0.3s;
}
</style>
