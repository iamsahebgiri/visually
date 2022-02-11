function generateRandomArray(limit: number) {
  let arr = [];
  for (let i = 1; i <= limit; i++) {
    const element = {
      id: Math.random().toString(36).slice(2),
      value: Math.floor(Math.random() * 98) + 1,
      state: "unsorted",
    };
    arr.push(element);
  }
  return arr;
}

export default generateRandomArray;
