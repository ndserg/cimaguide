import type { IQueryParams } from '@/types';
import useFetch from '@/composable/useFetch';

const fimsBaseRoute = '/movie';
const fimsFavoriteRoute = '/favorites';

type WithIdRoute<T extends string> = `${T}/${string}`;

export const filmsApiRoutes = {
  main: fimsBaseRoute,
  top10: `${fimsBaseRoute}/top10`,
  genres: `${fimsBaseRoute}/genres`,
  random: `${fimsBaseRoute}/random`,
  byId: <WithIdRoute<`${typeof fimsBaseRoute}`>>fimsBaseRoute,
  favorites: fimsFavoriteRoute,
  removeFavorite: <WithIdRoute<`${typeof fimsFavoriteRoute}`>>fimsFavoriteRoute
} as const;

type filmsApiRoutesKeys = keyof typeof filmsApiRoutes;
type filmsApiRoutesValues = (typeof filmsApiRoutes)[filmsApiRoutesKeys];

interface IGetFilms {
  route: filmsApiRoutesValues;
  params?: IQueryParams;
  options?: Record<string, unknown>;
}

export const getFilms = async <T>({ route, params, options }: IGetFilms) => {
  let searchParams: URLSearchParams | null = null;

  if (params) {
    const { count, page, title, genre } = params;
    searchParams = new URLSearchParams();

    const dataToAppend = [
      {
        key: 'count',
        value: count
      },
      {
        key: 'page',
        value: page
      },
      {
        key: 'title',
        value: title
      },
      {
        key: 'genre',
        value: genre
      }
    ];

    dataToAppend.forEach((item) => {
      if (item.value) {
        searchParams!.append(item.key, item.value);
      }
    });
  }

  const requestUrl = searchParams ? `${route}?${searchParams}` : `${route}`;

  const { data, loading, error } = await useFetch<T>(requestUrl, options);

  return { data, loading, error };
};
