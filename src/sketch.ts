///<reference path="assets/p5.global-mode.d.ts" />

let values: any[] = [];
let state: number[] = [];
let scl = 5;

function setup() {
  createCanvas(700, 400);

  for (let i = 0; i < width / scl; i++) {
    values[i] = map(i, 0, width / scl, height, 0);
    state[i] = 0;
  }

  values = shuffle(values)

  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, lo, hi) {
  if (lo >= 0 && hi >= 0 && lo < hi) {
    const pivot = await partition(arr, lo, hi)
    state[pivot] = 0;

    await Promise.all([
      quickSort(arr, lo, pivot),
      quickSort(arr, pivot + 1, hi)
    ])

  }
}

async function partition(arr, lo, hi) {
  for (let i = lo; i < hi; i++) {
    state[i] = 2;
  }

  const pivotValue = arr[Math.floor((lo + hi) / 2)]

  let i = lo - 1
  let j = hi + 1

  while (true) {
    do {
      state[i] = 0;
      i = i + 1
      state[i] = 1;
    } while (arr[i] < pivotValue);

    do {
      state[j] = 0;
      j = j - 1
      state[j] = 1;
    } while (arr[j] > pivotValue);

    if (i >= j) return j

    await swap(arr, i, j);

  }
}

function draw() {
  background(123);

  noStroke()
  for (let i = 0; i < values.length; i++) {
    if (state[i] == 0) {
      fill(255, 255, 255)
    } else if (state[i] == 1) {
      fill(0, 255, 125)
    } else if (state[i] == 2) {
      fill(255, 200, 200)
    }
    rect(i * scl, height, scl, -values[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(10);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}