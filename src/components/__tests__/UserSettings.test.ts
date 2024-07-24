import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useUserStore } from '@/stores/user';
import UserSettings from '@/components/UserSettings.vue';

vi.spyOn(router, 'push');

describe('UserSettings', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useUserStore>;

  beforeEach(() => {
    wrapper = mount(UserSettings, {
      global: {
        plugins: [
          [router],
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              user: {
                userProfile: {
                  favorites: [],
                  surname: 'Ivanov',
                  name: 'Ivan',
                  email: 'test@email.com'
                },
                isAuth: true,
                isLoading: true
              }
            }
          })
        ]
      }
    });
    store = useUserStore();
  });

  it('При отсутствии данных происходит рендер Skeleton элементов', () => {
    expect(wrapper.find('.user-settings-skeleton').exists()).toBe(true);
  });

  it('Рендер данных при их наличии в Store', async () => {
    await store.$patch({ isLoading: false });

    expect(wrapper.text()).toContain(store.userProfile?.email);
  });
});
