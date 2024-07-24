const AUTH_KEY_NAME = `cinema-guide-auth`;

export const isLoggedIn = () => {
  const token = localStorage.getItem(AUTH_KEY_NAME);
  return !!token;
};

export const setAuth = () => {
  localStorage.setItem(AUTH_KEY_NAME, 'true');
};

export const dropAuth = () => {
  localStorage.removeItem(AUTH_KEY_NAME);
};
