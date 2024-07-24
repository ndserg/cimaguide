import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useFilmStore } from '@/stores/film';
import HeaderSearch from '@/components/HeaderSearch.vue';
import { mockFilmData } from '@/mocks';

describe('HeaderSearch', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useFilmStore>;

  beforeEach(() => {
    wrapper = mount(HeaderSearch, {
      global: {
        plugins: [
          [router],
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              film: {
                searchedFilms: []
              }
            }
          })
        ]
      }
    });
    store = useFilmStore();
  });

  it('Отображает кнопку вывода строки поиска на мобильных устройствах', async () => {
    await wrapper.find('.search__button').trigger('click');

    expect((wrapper.vm as any).isShowSearch).toBe(true);
  });

  it('Отображает вводимые данные в строке поиска', () => {
    const input = wrapper.find('.search__input');

    const testText = 'back';

    input.setValue(testText);

    expect((input.element as HTMLInputElement).value).toBe(testText);
  });

  it('Кнопка очистки вызывает функцию очистки и очищеут поле поиска', async () => {
    const input = wrapper.find('.search__input');

    const testText = 'back';

    input.setValue(testText);

    await wrapper.vm.$nextTick();

    const clearButton = await wrapper.find('.clear__button');

    clearButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect((input.element as HTMLInputElement).value).toBe('');
  });

  it('Отображает список найденных фильмов', async () => {
    const input = wrapper.find('.search__input');

    input.setValue('');

    await store.$patch({
      searchedFilms: [mockFilmData, mockFilmData, mockFilmData]
    });

    const searchedFilmsList = wrapper.find('.search__results');

    expect(searchedFilmsList.exists()).toBe(true);
  });
});
