import useFetch from '@/composable/useFetch';

const userAuthBaseRoute = '/auth';

export const userApiRoutes = {
  login: `${userAuthBaseRoute}/login`,
  logout: `${userAuthBaseRoute}/logout`,
  register: '/user',
  profile: '/profile'
} as const;

type userApiRoutesKeys = keyof typeof userApiRoutes;
type userApiRoutesValues = (typeof userApiRoutes)[userApiRoutesKeys];

interface IUserFetchParams {
  route: userApiRoutesValues;
  options?: Record<string, unknown>;
}

export const userApi = async <T>({ route, options }: IUserFetchParams) => {
  const { data, loading, error } = await useFetch<T>(route, options);

  return { data, loading, error };
};
