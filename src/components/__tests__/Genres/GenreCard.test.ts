import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import GenreCard from '@/components/Genres/GenreCard.vue';
import router from '@/router';
import { setActivePinia, createPinia } from 'pinia';
import { GENRES_RU_ru } from '@/const';

vi.spyOn(router, 'push');

describe('GenreCard', () => {
  let wrapper: ReturnType<typeof mount>;

  const sampleGenre = Object.keys(GENRES_RU_ru)[0];

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(GenreCard, {
      propsData: {
        genre: sampleGenre
      },
      global: {
        plugins: [router]
      }
    });
  });

  it('Отображает жанр на русском языке', () => {
    expect(wrapper.text()).toContain(GENRES_RU_ru[sampleGenre]);
  });

  it('Переходит на страницу фильмов по выбранному жанру', async () => {
    await wrapper.find('.genre-card__link').trigger('click');
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(`/genres/${sampleGenre}`);
  });
});
