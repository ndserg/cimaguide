import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCoursesStore } from '../courses';

describe('Courses Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Возвращает False (нужно обновить курс) если курс не актуальный или не установлен', () => {
    const store = useCoursesStore();
    expect(store.checkActualCourse).toBe(false);
  });

  it('Возвращает True (курс актуален, обновлять не требуется) если курс не актуальный или не установлен', async () => {
    const store = useCoursesStore();

    await store.updateValueCourse();

    expect(store.checkActualCourse).toBe(true);
  });

  it('Конвертирует USD в Рубли (в локализованную строку)', async () => {
    const store = useCoursesStore();

    const usdToRubStr = '9\u00A0000 руб.';
    const usdSum = '100';

    expect(store.getUsdToRub(usdSum)).toBe(usdToRubStr);
  });
});
