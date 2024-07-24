import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '../user';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Устанавливает успешный статус Авторизации если сервер ответил True', async () => {
    const store = useUserStore();

    const mockUserData = {
      email: 'test@test.com',
      password: 'd4Sv{3d23f'
    };

    await store.userLogIn(mockUserData);

    expect(store.isAuth).toBe(true);
  });

  it('Устанавливает ошибку Авторизации (сообщение) если сервер ответил False', async () => {
    const store = useUserStore();
    const errorMessage = 'Ошибка авторизации';

    const mockUserData = {
      email: 'tes@tes.com',
      password: '3d23f'
    };

    await store.userLogIn(mockUserData);

    expect(store.isAuth).toBe(false);
    expect(store.isError).toBe(errorMessage);
  });

  it('При запросе данных Профиля - возвращает null если пользователь не авторизован', async () => {
    const store = useUserStore();

    await store.loadProfile();

    expect(store.userProfile).toBe(null);
  });

  it('Возвращает True если пользователь успешно вышел из профиля', async () => {
    const store = useUserStore();

    await store.userLogOut();

    expect(store.isAuth).toBe(false);
  });

  it('При регистрации - возвращает ошибку если пользователь ввел некорректные данные', async () => {
    const mockUserData = {
      email: 'test@test.com',
      password: 'd4Sv{3d23f',
      name: 'Alex',
      surname: 'Ivanov'
    };

    const errorMessage = 'Ошибка регистрации';

    const store = useUserStore();
    await store.userRegister(mockUserData, () => {});

    expect(store.isError).toBe(errorMessage);
  });

  it('При проверке авторизации, вызывает загрузку профиля если пользователь авторизован и утснавливает Умпешный статус авторизации', async () => {
    const store = useUserStore();

    const mockUserData = {
      email: 'test@test.com',
      password: 'd4Sv{3d23f'
    };

    await store.userLogIn(mockUserData);

    await store.checkAuth();

    expect(store.isAuth).toBe(true);
  });

  it('Возвращает False если фильма нет в списке ибранного в данных Профиля', () => {
    const store = useUserStore();

    expect(store.checkIsFavorite('176')).toBe(false);
  });

  it('Возвращает True если фильм в списке ибранного в данных Профиля', async () => {
    const store = useUserStore();

    const mockUserData = {
      email: 'test@test.com',
      password: 'd4Sv{3d23f'
    };

    const mockProfile = {
      favorites: ['52', '29', '176', '298'],
      name: 'Alex',
      surname: 'Ivanov',
      email: 'test@email.com'
    };

    await store.userLogIn(mockUserData);

    store.userProfile = mockProfile;

    expect(store.checkIsFavorite('176')).toBe(true);
  });
});
