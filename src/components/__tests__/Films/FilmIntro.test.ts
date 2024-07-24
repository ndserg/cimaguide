import { ref } from 'vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, config } from '@vue/test-utils';
import FilmIntro from '@/components/Films/FilmIntro.vue';
import FilmTrailer from '@/components/Films/FilmTrailer.vue';
import router from '@/router';
import { setActivePinia, createPinia } from 'pinia';
import { mockFilmData } from '@/mocks';
import type { ILocalFilm } from '@/types';
import { useFilm } from '@/composable/useFilm';
import { afterEach } from 'node:test';

vi.spyOn(router, 'push');

const windowMock = {
  scrollTo: vi.fn()
};

Object.assign(global, windowMock);

const mockUseFilmImplementationNull = {
  film: ref<ILocalFilm | null>(null),
  isLoadingFilm: ref<boolean>(true),
  isTogglingFavorite: ref<boolean>(false),
  toggleFavorite: vi.fn(),
  setShowTrailer: vi.fn(),
  showTrailer: ref<boolean>(false),
  loadRandomFilm: vi.fn(),
  getFilmById: vi.fn()
};

const mockUseFilmImplementationOk = {
  film: ref<ILocalFilm | null>(mockFilmData),
  isLoadingFilm: ref<boolean>(false),
  isTogglingFavorite: ref<boolean>(false),
  toggleFavorite: vi.fn(),
  setShowTrailer: vi.fn(),
  showTrailer: ref<boolean>(false),
  loadRandomFilm: vi.fn(),
  getFilmById: vi.fn()
};

vi.mock('@/composable/useFilm');

config.global.plugins = [[router]];

describe('FilmIntro', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Отображает данные фильма', async () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationOk);

    wrapper = mount(FilmIntro);

    expect(wrapper.text()).toContain(mockFilmData.title);
  });

  it('Отображает Skeleton если происходит загрузка информации', () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationNull);

    wrapper = mount(FilmIntro);

    expect(wrapper.find('.promo-skeleton').exists()).toBe(true);
  });

  it('Не отображает постер если нет ссылки на картинку', async () => {
    vi.mocked(useFilm).mockReturnValue({
      ...mockUseFilmImplementationOk,
      film: ref({ ...mockFilmData, posterUrl: '' })
    });

    wrapper = mount(FilmIntro);

    const imgWrapper = wrapper.find('.promo__img');
    expect(imgWrapper.find('img').exists()).toBe(false);
  });

  it('Вызывает функцию добавления/удаления фильма в избранное', async () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationOk);

    wrapper = mount(FilmIntro);

    const toggleButton = await wrapper.find('button[data-action="toggleFavorite"]');

    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger('click');

    expect(useFilm().toggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('Кнопка "Трейлер" вызывает показ трейлера при клике', async () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationOk);

    wrapper = mount(FilmIntro);

    await wrapper.find('button[data-action="showTrailer"]').trigger('click');

    expect(useFilm().setShowTrailer).toHaveBeenCalledTimes(1);
  });

  it('Трейлер показывается в модальном окне', async () => {
    vi.mocked(useFilm).mockReturnValue({
      ...mockUseFilmImplementationOk,
      showTrailer: ref(true)
    });

    wrapper = mount(FilmIntro);

    const trailer = await wrapper.findComponent(FilmTrailer);

    expect(trailer.exists()).toBe(true);
  });
});
