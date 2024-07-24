import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getCourse } from '@/api/valueCourse';
import { FALLBACK_COURSE_USD_RUB, CBRF_RUB_TO } from '@/const';
import { convertUsdToRub } from '@/utils';

interface ICoorses {
  cbrf: {
    columns: string[];
    data: number[][];
  };
}

export const useCoursesStore = defineStore('courses', () => {
  const TODAY = new Date().toLocaleDateString('en-US');

  const courses = ref<ICoorses | null>(null);
  const courseLastUpdate = ref<string>('');

  const checkActualCourse = computed(() => {
    const lastUpdate = new Date(courseLastUpdate.value);
    const isUpdated = courses.value && courseLastUpdate.value && lastUpdate >= new Date(TODAY);

    return !!isUpdated;
  });

  const updateValueCourse = async (): Promise<void> => {
    const allCourses = await getCourse();
    courses.value = allCourses;
    courseLastUpdate.value = new Date().toLocaleDateString('en-US');
  };

  const getUsdToRub = (inputValue: string | null): string | null => {
    const UsdRubCourse =
      courses.value?.cbrf.data[0][courses.value.cbrf.columns.indexOf(CBRF_RUB_TO.USD)];
    const currentUsdCourse = UsdRubCourse || FALLBACK_COURSE_USD_RUB;
    const rubValueLocalString = convertUsdToRub(inputValue, currentUsdCourse);

    return rubValueLocalString;
  };

  return { updateValueCourse, checkActualCourse, getUsdToRub };
});
