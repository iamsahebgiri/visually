let inversion = 0;
const trace = [];
const arr = [8, 9, 2, 4, 5, 6, 3, 1];

(function BubbleSort() {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n - i; j++) {
      if (arr[j - 1] > arr[j]) {
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;

        inversion++;
      }
      trace.push(arr);
    }
  }
})();

export default {
  trace,
  inversion,
};
