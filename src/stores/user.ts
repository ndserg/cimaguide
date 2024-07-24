import { ref } from 'vue';
import { defineStore } from 'pinia';
import { userApi, userApiRoutes } from '@/api/user';
import { useRouter } from 'vue-router';
import { isLoggedIn, setAuth, dropAuth } from '@/api/auth';
import { useNotificationsStore } from '@/stores/notifications';
import type { IUserLogin, IUserRegister, IProfile } from '@/types';
import { toJson } from '@/utils';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const isAuth = ref<Boolean>(false);
  const openForm = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isError = ref<string | null>(null);
  const userProfile = ref<IProfile | null>(null);

  const notificationsStore = useNotificationsStore();

  const checkIsFavorite = (id: string): boolean => {
    if (isAuth.value && userProfile.value) {
      return userProfile.value.favorites.includes(id);
    }

    return false;
  };

  const loadProfile = async () => {
    isLoading.value = true;

    const options = {
      credentials: 'include'
    };

    const { data, error } = await userApi<IProfile>({
      route: userApiRoutes.profile,
      options: options
    });

    if (error.value || !data.value?.email) {
      const errorMessage = 'Ошибка загрузки личного профиля';

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      userProfile.value = data.value;
    }

    isLoading.value = false;
  };

  const userLogIn = async (loginData: IUserLogin) => {
    isLoading.value = true;

    const options = {
      method: 'POST',
      credentials: 'include',
      body: toJson(loginData)
    };

    const { data, error } = await userApi<Record<string, boolean>>({
      route: userApiRoutes.login,
      options: options
    });

    if (error.value || !data.value?.result) {
      const errorMessage = 'Ошибка авторизации';
      isError.value = errorMessage;

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      isError.value = null;
      openForm.value = false;
      isAuth.value = true;
      setAuth();
      await loadProfile();
    }

    isLoading.value = false;
  };

  const userLogOut = async () => {
    isLoading.value = true;

    const options = {
      credentials: 'include'
    };

    const { data, error } = await userApi<Record<string, boolean>>({
      route: userApiRoutes.logout,
      options: options
    });

    if (error.value || !data.value?.result) {
      const errorMessage = 'Ошибка выхода из профиля';
      isError.value = errorMessage;

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      isError.value = null;
      isAuth.value = false;
      dropAuth();
      userProfile.value = null;
      router.push('/');
    }

    isLoading.value = false;
  };

  const userRegister = async (registerData: IUserRegister, onRegistrationSuccess: () => void) => {
    isLoading.value = true;

    const options = {
      method: 'POST',
      credentials: 'include',
      body: toJson(registerData)
    };

    const { data, error } = await userApi<IProfile>({
      route: userApiRoutes.register,
      options: options
    });

    if (error.value || !data.value) {
      const errorMessage = 'Ошибка регистрации';
      isError.value = errorMessage;

      notificationsStore.setNotification(errorMessage, 'error');
    } else {
      isError.value = null;
      onRegistrationSuccess();
    }

    isLoading.value = false;
  };

  const checkAuth = async () => {
    if (isLoggedIn()) {
      isAuth.value = true;
      await loadProfile();
    }
  };

  return {
    isAuth,
    userProfile,
    openForm,
    userLogIn,
    userLogOut,
    userRegister,
    loadProfile,
    isLoading,
    isError,
    checkIsFavorite,
    checkAuth
  };
});
