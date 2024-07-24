import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import UserBlock from '@/components/UserBlock.vue';

describe('UserBlock', () => {
  let wrapper: ReturnType<typeof mount>;
  let store: ReturnType<typeof useUserStore>;

  beforeEach(() => {
    wrapper = mount(UserBlock, {
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
                isLoading: true,
                isAuth: false
              }
            }
          })
        ]
      }
    });
    store = useUserStore();
  });

  it('При отсутствии данных происходит рендер Skeleton элемента', () => {
    expect(wrapper.find('.user-block__link--loading').exists()).toBe(true);
  });

  it('Рендер данных при их наличии в Store', async () => {
    await store.$patch({ isLoading: false, isAuth: true });

    expect(wrapper.text()).toContain(store.userProfile?.name);
  });
});
