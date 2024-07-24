<template>
  <Form class="user-form" @submit="onSubmit" :validation-schema="registerSchema" novalidate="true">
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
      />

      <FormInput
        type="text"
        name="name"
        id="name"
        mode="aggressive"
        placeholder="Имя"
        iconName="icon-user"
        iconWidth="16px"
        iconHeight="21px"
        minlength="3"
        maxlength="20"
      />

      <FormInput
        type="text"
        name="surname"
        id="surname"
        mode="aggressive"
        placeholder="Фамилия"
        iconName="icon-user"
        iconWidth="16px"
        iconHeight="21px"
        minlength="3"
        maxlength="20"
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
      />

      <FormInput
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        mode="aggressive"
        placeholder="Подтвердите пароль"
        iconName="icon-key"
        iconWidth="22px"
        iconHeight="12px"
        minlength="5"
        maxlength="20"
      />
    </div>

    <ButtonText text="Создать аккаунт" extraClass="primary" type="submit" />
  </Form>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Form, type SubmissionHandler } from 'vee-validate';
import { useUserStore } from '@/stores/user';
import { registerSchema } from './validationShema';
import ButtonText from '@/components/Buttons/ButtonText.vue';
import FormInput from '@/components/FormUser/FormInput.vue';
import type { IUserRegister } from '@/types';

const emit = defineEmits(['on-reg-success']);

const userStore = useUserStore();

const onSuccess = () => {
  emit('on-reg-success');
};

const onSubmit: SubmissionHandler = (values) => {
  if (values.email && values.password && values.name && values.surname) {
    const registerData: IUserRegister = {
      email: values.email,
      name: values.name,
      surname: values.surname,
      password: values.password
    };

    userStore.userRegister(registerData, onSuccess);
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

.user-form__inputs {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.user-form__group {
  position: relative;
}
</style>
