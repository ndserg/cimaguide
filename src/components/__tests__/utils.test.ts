import { describe, it, expect } from 'vitest';
import {
  toJson,
  fromJson,
  genreToLocaleRu,
  getDurationString,
  convertUsdToRub,
  rowFilmToLocal,
  debounce
} from '@/utils';
import { mockFilmData, originalFilmData } from '@/mocks';
import { GENRES_RU_ru } from '@/const';

describe('Utils', () => {
  it('Возвращает сериализованный объект', () => {
    expect(toJson(mockFilmData)).toEqual(JSON.stringify(mockFilmData));
  });

  it('Возвращает объект из строки', () => {
    expect(fromJson(JSON.stringify(mockFilmData))).toEqual(mockFilmData);
  });

  it('Переводитс строку с Английского на русский если присутствует в словаре', () => {
    const currentGenre = Object.keys(GENRES_RU_ru)[0];

    expect(genreToLocaleRu(currentGenre)).toEqual(GENRES_RU_ru[currentGenre]);
  });

  it('Выводит сообщение о неизвестном жанре если отсутствует в словаре', () => {
    const unknownGenre = 'неизвестный жанр';

    expect(genreToLocaleRu('some-genre')).toEqual(unknownGenre);
  });

  it('Возвращает строку вида 1 ч 35 мин если есть данные о количестве минут', () => {
    const timeString = '1 ч 35 мин';

    expect(getDurationString(95)).toEqual(timeString);
  });

  it('Возвращает пустую строку если нет данных о количестве минут', () => {
    expect(getDurationString(0)).toEqual('');
  });

  it('Конвертирует Доллары в строку суммы в рублях, если есть данные', () => {
    const usdToRubStr = '9\u00A0000 руб.';
    const usdSum = '100';
    const valueCourse = 90;

    expect(convertUsdToRub(usdSum, valueCourse)).toEqual(usdToRubStr);
  });

  it('Возвращает null при попытке сковертировать валюту без данных или если сумма = 0', () => {
    const valueCourse = 90;

    expect(convertUsdToRub('0', valueCourse)).toEqual(null);
  });

  it('Преобразует оригинальный объект фильма в локальный с дополнительными полями и переведенной информацией', () => {
    expect(rowFilmToLocal(originalFilmData, false)).toEqual(mockFilmData);
  });

  it('Возвращает функцию в обертке SetTimeOut c переданной задержкой в мс', () => {
    expect(debounce(() => {}, 0)).toBeTypeOf('function');
  });
});
