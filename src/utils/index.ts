import { GENRES_RU_ru } from '@/const';
import type { IFilm, ILocalFilm } from '@/types';

export const toJson = (data: Object) => {
  const jsonData = JSON.stringify(data);

  return jsonData;
};

export const fromJson = (data: string) => {
  const dataFromJson = JSON.parse(data);

  return dataFromJson;
};

export const genreToLocaleRu = (str: string): string => {
  const genreLocaleStr = GENRES_RU_ru[String(str)] || 'неизвестный жанр';

  return genreLocaleStr;
};

export const getDurationString = (mins: number | ''): string => {
  if (!mins) {
    return '';
  }

  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  return `${hours} ч ${minutes} мин`;
};

export const convertUsdToRub = (usd: string | null, course: number): string | null => {
  if (!usd || usd === '0') {
    return null;
  }

  const rub = Math.round(Number(usd) * course);
  const rubStr = `${new Intl.NumberFormat('ru-Ru', {}).format(rub)} руб.`;

  return rubStr;
};

export const debounce = <T extends (...args: any[]) => any>(callback: T, waitFor: number) => {
  let timeout = 0;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };
};

export const rowFilmToLocal = (filmData: IFilm, isFavorite: boolean): ILocalFilm => {
  const genreLocal = genreToLocaleRu(filmData.genres[0]);
  const duration = getDurationString(filmData.runtime);

  const localFilmData = { ...filmData, isFavorite, genreLocal, duration };

  return localFilmData;
};
