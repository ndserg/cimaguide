<template>
  <HeaderMain />

  <RouterView />

  <FooterMain />

  <AppNotifications
    :messages="notificationsStore.notifications"
    v-if="notificationsStore.notifications.length > 0"
  />

  <Teleport to="body">
    <Transition>
      <FormsUser v-if="userStore.openForm" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderMain from '@/components/HeaderMain.vue';
import FooterMain from '@/components/FooterMain.vue';
import AppNotifications from '@/components/AppNotifications.vue';
import FormsUser from '@/components/FormUser/FormsUser.vue';
import { useUserStore } from '@/stores/user';
import { useNotificationsStore } from '@/stores/notifications';

const notificationsStore = useNotificationsStore();

const userStore = useUserStore();
userStore.checkAuth();
</script>
