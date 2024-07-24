import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import IconRating from '@/components/Icons/IconRating.vue';

describe('IconRating', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(IconRating, {
      propsData: {
        text: '4'
      }
    });
  });

  it('Если рейтинг меньше или равен 5 - то не добавляет классы модификаторы цвета', () => {
    expect(wrapper.classes()).not.toContain('rating--low');
    expect(wrapper.classes()).not.toContain('rating--medium');
    expect(wrapper.classes()).not.toContain('rating--high');
  });

  it('Если рейтинг от 5 до 7 - то добавляет класс rating--low', async () => {
    await wrapper.setProps({ text: '5' });

    expect(wrapper.classes()).toContain('rating--low');
  });

  it('Если рейтинг от 7 до 8 - то добавляет класс rating--medium', async () => {
    await wrapper.setProps({ text: '7' });

    expect(wrapper.classes()).toContain('rating--medium');
  });

  it('Если рейтинг больше или равен 8 - то добавляет класс rating--high', async () => {
    await wrapper.setProps({ text: '8' });

    expect(wrapper.classes()).toContain('rating--high');
  });
});
