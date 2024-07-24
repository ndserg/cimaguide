import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { INote, noteType } from '@/types';

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<INote[]>([]);

  const setNotification = (message: string, type: noteType): void => {
    const timeStamp = Date.now().toLocaleString();

    notifications.value.unshift({ text: message, type: type, id: timeStamp });
    removeNotification();
  };

  const removeNotification = () => {
    if (notifications.value.length) {
      setTimeout(() => {
        notifications.value.splice(notifications.value.length - 1, 1);
      }, 3000);
    }
  };

  return { notifications, setNotification };
});
