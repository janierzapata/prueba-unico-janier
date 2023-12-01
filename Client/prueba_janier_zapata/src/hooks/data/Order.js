
export const Order = (array, param, order) => {

  let temp;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (!order) {
        if (array[i][param] < array[j][param]) {
          temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      } else {
        if (array[i][param] > array[j][param]) {
          temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
  }

  return array;
};
