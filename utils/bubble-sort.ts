interface Item {
  id: string;
  value: number;
  x?: number;
  y?: number;
  state: string;
}

let inversion = 0;
let tracer: Item[][] = [];

function pushItems(items: Item[]) {
  let newItems: Item[] = [];
  items.forEach((item) => {
    newItems.push({ ...item });
  });
  tracer.push(newItems);
}

function markActive(items: Item[], i: number, j: number) {
  let newItems: Item[] = [];
  items.forEach((item, index) => {
    if (index === i || index === j) {
      newItems.push({ ...item, state: "active" });
    } else {
      newItems.push({ ...item });
    }
  });
  tracer.push(newItems);
}

function markSorted(items: Item[], i: number) {
  let newItems: Item[] = [];
  items.forEach((item, index) => {
    if (index === i) {
      newItems.push({ ...item, state: "sorted" });
    } else {
      newItems.push({ ...item });
    }
  });
  tracer.push(newItems);
}

function getBubbleSortTrace(arr: Item[]) {
  let swapped;
  let indexOfLastUnsortedElement = arr.length;

  // store the initial state
  pushItems(arr);

  do {
    swapped = false;
    for (let i = 1; i < indexOfLastUnsortedElement; i++) {
      // mark two consecutive elements active and add it to trace
      markActive(arr, i - 1, i);

      if (arr[i - 1].value > arr[i].value) {
        swapped = true;
        inversion++;

        let temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;

        markActive(arr, i - 1, i);
      }
    }
    --indexOfLastUnsortedElement;
    markSorted(arr, indexOfLastUnsortedElement);
    arr[indexOfLastUnsortedElement].state = "sorted";
  } while (swapped);

  return tracer;
}

export { getBubbleSortTrace, inversion };
