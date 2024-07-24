import { describe, it, expect, vi } from 'vitest';
import { getCourse } from '../valueCourse';

const responseWithValueMocked = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => typeof {}
  } as Response);

const responseErrorOrNullMocked = () =>
  Promise.resolve({
    ok: false,
    status: 200,
    json: async () => 0
  } as Response);

describe('Get Courses Value', () => {
  it('При успешном ответе возвращает объект курсов валют', async () => {
    global.fetch = vi.fn(responseWithValueMocked);

    const courses = await getCourse();

    expect(fetch).toHaveBeenCalled();
    expect(courses).toEqual(typeof {});
  });

  it('При не успешном ответе возвращает число 0', async () => {
    global.fetch = vi.fn(responseErrorOrNullMocked);
    const courses = await getCourse();

    expect(fetch).toHaveBeenCalled();
    expect(courses).toEqual(0);
  });
});
