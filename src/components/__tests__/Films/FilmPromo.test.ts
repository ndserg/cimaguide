import { ref } from 'vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, config } from '@vue/test-utils';
import FilmPromo from '@/components/Films/FilmPromo.vue';
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

describe('FilmPromo', () => {
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

    wrapper = mount(FilmPromo);

    expect(wrapper.text()).toContain(mockFilmData.title);
  });

  it('Отображает Skeleton если происходит загрузка информации', () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationNull);

    wrapper = mount(FilmPromo);

    expect(wrapper.find('.promo-skeleton').exists()).toBe(true);
  });

  it('Не отображает постер если нет ссылки на картинку', async () => {
    vi.mocked(useFilm).mockReturnValue({
      ...mockUseFilmImplementationOk,
      film: ref({ ...mockFilmData, posterUrl: '' })
    });

    wrapper = mount(FilmPromo);

    const imgWrapper = wrapper.find('.promo__img');
    expect(imgWrapper.find('img').exists()).toBe(false);
  });

  it('Вызывает функцию добавления/удаления фильма в избранное', async () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationOk);

    wrapper = mount(FilmPromo);

    const toggleButton = await wrapper.find('button[data-action="toggleFavorite"]');

    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger('click');

    expect(useFilm().toggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('Кнопка "Трейлер" вызывает показ трейлера при клике', async () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationOk);

    wrapper = mount(FilmPromo);

    await wrapper.find('button[data-action="showTrailer"]').trigger('click');

    expect(useFilm().setShowTrailer).toHaveBeenCalledTimes(1);
  });

  it('Запрашивает случайный фильм при клике', async () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationOk);

    wrapper = mount(FilmPromo);

    await wrapper.find('button[data-action="loadRandomFilm"]').trigger('click');

    expect(useFilm().loadRandomFilm).toHaveBeenCalledTimes(1);
  });

  it('Переходит на страницу с описанием фильма по ID', async () => {
    vi.mocked(useFilm).mockReturnValue(mockUseFilmImplementationOk);

    wrapper = mount(FilmPromo);

    await wrapper.find('button[data-action="showFilmInfo"]').trigger('click');
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith(`/about/${String(mockFilmData.id)}`);
  });

  it('Трейлер показывается в модальном окне', async () => {
    vi.mocked(useFilm).mockReturnValue({
      ...mockUseFilmImplementationOk,
      showTrailer: ref(true)
    });

    wrapper = mount(FilmPromo);

    const trailer = await wrapper.findComponent(FilmTrailer);

    expect(trailer.exists()).toBe(true);
  });
});
