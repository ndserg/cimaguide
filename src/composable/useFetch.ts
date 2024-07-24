import { ref } from 'vue';

const useFetch = async <T>(url: string, options?: Record<string, unknown>) => {
  const loading = ref<boolean>(true);
  const error = ref<string>('');
  const data = ref<T | null>(null);

  const baseURL = 'https://cinemaguide.skillbox.cc';

  const headers = {
    'Content-Type': 'application/json'
  };

  const requestConfig = options ? { headers, ...options } : { headers };

  const fetchData = async () => {
    loading.value = true;

    try {
      const response = await fetch(`${baseURL}${url}`, { ...requestConfig });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      data.value = await response.json();
    } catch (err: unknown) {
      const typedError = err as Error;
      error.value = String(typedError);
    } finally {
      loading.value = false;
    }
  };

  await fetchData();

  return { loading, error, data };
};

export default useFetch;
