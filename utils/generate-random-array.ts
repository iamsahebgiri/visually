function generateRandomArray(
  limit: number,
  min: number = 1,
  max: number = 100
) {
  let arr = [];
  for (let i = 1; i <= limit; i++) {
    const element = {
      id: Math.random().toString(36).slice(2),
      value: Math.floor(Math.random() * (max - min + 1)) + min,
      state: "unsorted",
      // TODO: Think of a better way to store inversion
      inversion: 0,
    };
    arr.push(element);
  }
  return arr;
}

export default generateRandomArray;
