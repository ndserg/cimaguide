import { describe, it, expect } from 'vitest';
import { isLoggedIn, setAuth, dropAuth } from '../auth';

describe('Auth API test', () => {
  it('Возвращает FALSE если пользователь авторизован', () => {
    expect(isLoggedIn()).toStrictEqual(false);
  });

  it('Возвращает TRUE если пользователь авторизован', () => {
    setAuth();

    expect(isLoggedIn()).toStrictEqual(true);
  });

  it('Возвращает FALSE после выхода из личного кабинета', () => {
    dropAuth();

    expect(isLoggedIn()).toStrictEqual(false);
  });
});
