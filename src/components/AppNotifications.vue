<template>
  <div class="notification">
    <TransitionGroup
      class="notification__messages_list list-reset"
      name="notification-animate"
      tag="ul"
    >
      <li
        v-for="message in messages"
        class="notification__content"
        :class="`notification__content--${message.type}`"
        :key="message.id"
      >
        {{ message.text }}
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { INote } from '@/types';

defineProps<{
  messages: INote[];
}>();
</script>

<style scoped>
.notification {
  position: fixed;
  top: 100px;
  right: 16px;
  z-index: 9999;
}
.notification__messages_list {
  display: flex;
  flex-direction: column-reverse;
}
.notification__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 16px;
  margin-bottom: 16px;
  color: #fff;
  background-color: rgba(0, 128, 0, 0.6);
  border-radius: 4px;
}
.notification__content--error {
  background-color: rgba(255, 0, 0, 0.6);
}
.notification__content--warning {
  background-color: rgba(255, 165, 0, 0.6);
}
.notification-animate-enter {
  opacity: 0;
  transform: translateX(120px);
}
.notification-animate-enter-active {
  transition: all 0.6s ease;
}
.notification-animate-enter-to {
  opacity: 1;
}
.notification-animate-leave {
  height: 50px;
  opacity: 1;
}
.notification-animate-leave-active {
  transition:
    transform 0.6s ease,
    opacity 0.6s,
    height 0.6s 0.2s;
}
.notification-animate-leave-to {
  height: 0;
  opacity: 0;
  transform: translateX(120px);
}
.notification-animate-move {
  transition: transform 0.6s ease;
}
</style>
