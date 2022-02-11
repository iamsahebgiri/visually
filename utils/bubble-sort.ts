interface Item {
  id: string;
  value: number;
  x?: number;
  y?: number;
  state: string;
}

let inversion = 0;

let trace: Item[][] = [];

function makeTrace(arr: Item[], i: number, j: number) {
  let newArr: Item[] = [];
  arr.forEach((element, index) => {
    if (index == i || index == j) {
      newArr.push({ ...element, state: "active" });
    } else {
      if (element.state == "active") {
        newArr.push({ ...element, state: "unsorted" });
      }
      newArr.push(element);
    }
  });
  trace.push(newArr);
}

function getBubbleSortTrace(arr: Item[]) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n - i; j++) {
      if (arr[j - 1].value > arr[j].value) {
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;

        inversion++;
      }

      makeTrace(arr, i, j);
    }
  }
  return trace;
}

export { getBubbleSortTrace, inversion };
