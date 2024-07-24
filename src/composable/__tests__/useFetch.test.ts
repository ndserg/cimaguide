import { describe, it, expect, vi } from 'vitest';
import useFetch from '../useFetch';

const mockedImplementationUseFetch = () =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => {}
  } as Response);

describe('Composable UseFetch', () => {
  it('В ответе возвращает результат в виде объекта с полями loading, error, data', async () => {
    global.fetch = vi.fn(mockedImplementationUseFetch);

    const req = await useFetch('/movie');

    expect(fetch).toHaveBeenCalled();
    expect(req).toHaveProperty('loading');
    expect(req).toHaveProperty('error');
    expect(req).toHaveProperty('data');
  });
});
