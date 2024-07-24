import { describe, it, expect } from 'vitest';
import { getFilms, filmsApiRoutes } from '../films';
import type { IFilm } from '@/types';

describe('Films API test', () => {
  it('Возвращает фильмs при запросе', async () => {
    const { data, error } = await getFilms<IFilm[] | []>({ route: filmsApiRoutes.top10 });

    expect(!!error.value).toBe(false);
    expect(Array.isArray(data.value)).toBe(true);
  });
});
