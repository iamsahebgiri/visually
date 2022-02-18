function processUserArray(array: number[]) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    const element = {
      id: Math.random().toString(36).slice(2),
      value: array[i],
      state: "unsorted",
      // TODO: Think of a better way to store inversion
      inversion: 0,
    };
    arr.push(element);
  }
  return arr;
}

export default processUserArray;
