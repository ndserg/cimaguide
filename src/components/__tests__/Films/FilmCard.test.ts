import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FilmCard from '@/components/Films/FilmCard.vue';
import router from '@/router';
import { setActivePinia, createPinia } from 'pinia';
import { mockFilmData } from '@/mocks';

vi.spyOn(router, 'push');

describe('FilmCard', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(FilmCard, {
      propsData: {
        film: mockFilmData,
        isLoadingFilm: false
      },
      global: {
        plugins: [router]
      }
    });
  });

  it('Отображает данные фильма', () => {
    expect(wrapper.text()).toContain(mockFilmData.title);
  });

  it('Отображает постер если есть ссылка на картинку', () => {
    expect(wrapper.find('.film-card__noimg').exists()).toBe(false);
    expect(wrapper.find('.film-card__img').exists()).toBe(true);
  });

  it('Отображает заголовок фильма вместо постера если нет картинки', async () => {
    await wrapper.setProps({ film: { ...mockFilmData, posterUrl: '' } });

    expect(wrapper.find('.film-card__img').exists()).toBe(false);
    expect(wrapper.find('.film-card__noimg').exists()).toBe(true);
  });

  it('Переходит на страницу с описанием фильма по ID', async () => {
    await wrapper.find('.film-card__link').trigger('click');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(`/about/${String(mockFilmData.id)}`);
  });

  it('Ссылка не работает если идет загрузка информации о фильме', async () => {
    await wrapper.setProps({ isLoadingFilm: true });

    expect(wrapper.find('.film-card__link').attributes('href')).toEqual('/');
  });
});
