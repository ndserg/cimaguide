import { describe, it, expect } from 'vitest';
import { userApiRoutes, userApi } from '../user';
import { toJson } from '@/utils';
import type { IUserLogin, IUserRegister, IProfile } from '@/types';

describe('User API test', () => {
  it('Возвращает True если пользователь успешно авторизовался', async () => {
    const mockUserData = {
      email: 'test@test.com',
      password: 'd4Sv{3d23f'
    };

    const options = {
      method: 'POST',
      credentials: 'include',
      body: toJson(mockUserData)
    };

    const { data, error } = await userApi<Record<string, boolean>>({
      route: userApiRoutes.login,
      options: options
    });

    expect(!!error.value).toBe(false);
    expect(data.value?.result).toBe(true);
  });

  it('При запросе данных Профиля - возвращает ошибку если пользователь не авторизован', async () => {
    const options = {
      credentials: 'include'
    };

    const { data, error } = await userApi<IProfile>({
      route: userApiRoutes.profile,
      options: options
    });

    expect(!!error.value).toBe(true);
    expect(!!data.value?.email).toBe(false);
  });

  it('При регистрации - возвращает ошибку если пользователь ввел некорректные данные', async () => {
    const mockUserData = {
      email: 'test@test.com',
      password: 'd4Sv{3d23f',
      name: 'Alex',
      surname: 'Ivanov'
    };

    const options = {
      method: 'POST',
      credentials: 'include',
      body: toJson(mockUserData)
    };

    const { data, error } = await userApi<IProfile>({
      route: userApiRoutes.register,
      options: options
    });

    expect(!!error.value).toBe(true);
    expect(!!data.value?.email).toBe(false);
  });

  it('Возвращает True если пользователь успешно вышел из профиля', async () => {
    const options = {
      credentials: 'include'
    };

    const { data, error } = await userApi<Record<string, boolean>>({
      route: userApiRoutes.logout,
      options: options
    });

    expect(!!error.value).toBe(false);
    expect(data.value?.result).toBe(true);
  });
});
