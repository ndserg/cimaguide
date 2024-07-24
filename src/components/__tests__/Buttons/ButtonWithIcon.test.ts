import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon.vue';

describe('ButtonWithIcon', () => {
  let wrapper: ReturnType<typeof mount>;

  const iconName = 'favorite';

  beforeEach(() => {
    wrapper = mount(ButtonWithIcon, {
      propsData: {
        icon: iconName
      }
    });
  });

  it('Отображает svg иконку с заданным именем', () => {
    expect(wrapper.find('use').attributes('href')).toEqual(
      `/img/icons/sprite.svg#icon-${iconName}`
    );
  });

  it('Меняет иконку при необходимости при добавлении параметров', async () => {
    await wrapper.setProps({ isActive: true });

    expect(wrapper.find('use').attributes('href')).toEqual(
      `/img/icons/sprite.svg#icon-${iconName}-active`
    );
  });
});
