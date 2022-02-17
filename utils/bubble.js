const tracer = {
  items: [],
  status: "",
  line: [],
};

function pushItems(items) {
  let newItems = [];
  items.forEach((item) => {
    newItems.push({ ...item });
  });
  tracer.items.push(newItems);
}

function markActive(items, i, j) {
  let newItems = [];
  items.forEach((item, index) => {
    if (index === i || index === j) {
      newItems.push({ ...item, state: "active" });
    } else {
      newItems.push({ ...item });
    }
  });
  tracer.items.push(newItems);
}

function markSorted(items, i) {
  let newItems = [];
  items.forEach((item, index) => {
    if (index === i) {
      newItems.push({ ...item, state: "sorted" });
    } else {
      newItems.push({ ...item });
    }
  });
  tracer.items.push(newItems);
}

function getBubbleSortTrace(arr) {
  let inversion = 0;
  let swapped;
  let indexOfLastUnsortedElement = arr.length;

  pushItems(arr);
  do {
    swapped = false;
    for (let i = 1; i < indexOfLastUnsortedElement; i++) {
      // mark two consecutive elements active and add it to trace
      markActive(arr, i - 1, i);

      if (arr[i - 1].value > arr[i].value) {
        swapped = true;
        inversion++;

        const temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;

        markActive(arr, i - 1, i);
      }
    }
    --indexOfLastUnsortedElement;
    markSorted(arr, indexOfLastUnsortedElement);
    arr[indexOfLastUnsortedElement].state = "sorted";
  } while (swapped);
}
const originalData = [
  { id: "f30nshwck9u", value: 29, state: "unsorted", position: 0 },
  { id: "0tumlygjcpr", value: 10, state: "unsorted", position: 1 },
  { id: "shka5lat2da", value: 14, state: "unsorted", position: 2 },
  { id: "2isw8ofrxuu", value: 37, state: "unsorted", position: 3 },
  { id: "djyrlt4gx07", value: 15, state: "unsorted", position: 4 },
];
getBubbleSortTrace(originalData);
console.log(tracer.items);
