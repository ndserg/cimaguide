<template>
  <div class="user-welcome">
    <p class="user-welcome__title"><strong>Регистрация завершена</strong></p>
    <p class="user-welcome__text">Используйте вашу электронную почту для входа</p>

    <ButtonText @click="$emit('switch-to-logIn')" text="Войти" extraClass="primary" type="button" />
  </div>
</template>

<script setup lang="ts">
import ButtonText from '@/components/Buttons/ButtonText.vue';
</script>

<style scoped>
.user-welcome {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.user-welcome__title {
  margin: 0;

  font-size: 24px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-black);
  text-align: center;
}

.user-welcome__text {
  margin: 0;

  font-size: 18px;
  font-weight: 400;
  line-height: 133%;
  color: var(--content-black);
  text-align: center;
}
</style>
