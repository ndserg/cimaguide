export const getCourse = async (): Promise<any> => {
  try {
    const response = await fetch(
      'https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off'
    );

    if (!response.ok) {
      throw new Error('HTTP error, status = ' + response.status);
    }

    const courses = await response.json();

    return courses;
  } catch (error) {
    return 0;
  }
};
