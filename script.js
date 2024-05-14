const SD = {
  bublesort: 0,
  selectionsort: 1,
  insertionsort: 2,
  mergesort: 3,
  quicksort: 4,
  radixsort: 5,
};
var startbtn;
var selectlist;
var container;
var refreshbtn;
var selectedAlgorithm = SD.bublesort;

window.onload = () => {
  startbtn = document.getElementById("start");
  selectlist = document.getElementById("select");
  container = document.getElementById("container");
  refreshbtn = document.getElementById("refresh");
  refreshbtn.addEventListener("click", () => {
    window.location.reload();
  });
  selectlist.addEventListener("change", select);
  startbtn.addEventListener("click", start);
};

var candels = [];
function start() {
  // populate array
  candels = Array.from(
    { length: 20 },
    () => Math.floor(Math.random() * 250) + 50
  );
  // remove elemnt for avoiding memory leaks
  selectlist.remove();
  startbtn.remove();
  printCandels();

  setTimeout(() => {
    // sort
    switch (selectedAlgorithm) {
      case SD.bublesort:
        bubleSort();
        break;
      case SD.insertionsort:
        insertionSort();
        break;
      case SD.selectionsort:
        selectionSort();
        break;
      case SD.mergesort:
        mergeSort();
        break;
      case SD.quicksort:
        quicksort();
        break;
      case SD.radixsort:
        radixsort();
        break;
    }
  }, 500);
}
function select(e) {
  selectedAlgorithm =
    SD[
      selectlist.value
        .split("")
        .filter((e) => e.trim().length)
        .join("")
    ];
}

function printCandels() {
  container.innerHTML = "";
  candels.forEach((element) => {
    var c = `<div class="candel" style="height:${element}px;width:${
      400 / candels.length
    }px">${element}</div>`;
    container.innerHTML += c;
  });
}
function printCandels2(arr) {
  console.log(arr);
  container.innerHTML = "";
  for (let element of arr) {
    var c = `<div class="candel" style="height:${element}px;width:${
      400 / arr.length
    }px">${element}</div>`;
    container.innerHTML += c;
  }
}
function color(i, j) {
  var allCandesl = document.getElementById("container").children;
  //   console.log(allCandesl);
  var c1 = allCandesl[i];
  var c2 = allCandesl[j];
  c1.style.backgroundColor = "green";
  c2.style.backgroundColor = "green";
}

async function bubleSort() {
  for (var i = 0; i < candels.length - 1; i++) {
    for (var j = 0; j < candels.length - i - 1; j++) {
      color(j, j + 1);
      if (candels[j] < candels[j + 1]) {
        [candels[j], candels[j + 1]] = [candels[j + 1], candels[j]];
      }
      await sleep(500);
      printCandels();
    }
  }
}
async function insertionSort() {
  for (var i = 1; i < candels.length; i++) {
    var max = candels[i];
    for (var j = i - 1; j >= 0 && candels[j] < max; j--) {
      color(j + 1, j);
      candels[j + 1] = candels[j];
      await sleep(100);
      printCandels();
    }
    candels[j + 1] = max;
    color(j + 1, i);
    await sleep(500);
    printCandels();
    await sleep(500);
  }
}
async function selectionSort() {
  for (var i = 0; i < candels.length - 1; i++) {
    var maxindex = i;
    for (var j = i + 1; j < candels.length; j++) {
      color(j, maxindex);
      if (candels[j] > candels[maxindex]) maxindex = j;
      await sleep(100);
      printCandels();
    }
    // swap
    color(maxindex, i);
    [candels[maxindex], candels[i]] = [candels[i], candels[maxindex]];
    await sleep(500);
    printCandels();
  }
}
async function mergeSort() {
  async function merege(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] > arr2[j]) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
    return result;
  }
  async function sort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = await sort(arr.slice(0, mid));
    let right = await sort(arr.slice(mid));
    let result = await merege(left, right);
    await sleep(500);
    printCandels2(result);
    return result;
  }
  candels = await sort(candels);
  printCandels2(candels);
}
async function quicksort() {
  async function sort(arr) {
    if (arr.length < 1) {
      return arr;
    }
    let left = [];
    let right = [];
    let pivot = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    let r = [...left, pivot, ...right];
    printCandels2(r);
    await sleep(100);
    return [...(await sort(left)), pivot, ...(await sort(right))];
  }
  candels = await sort(candels);
  console.log(candels);
  printCandels();
}
async function radixsort() {
  function getDigit(num, i) {
    return Math.floor(num / Math.pow(10, i)) % 10;
  }
  function getDigitCount(num) {
    if (num == 0) return 1;
    return Math.floor(Math.log10(num)) + 1;
  }
  function getMaxDigit(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      max = Math.max(max, getDigitCount(arr[i]));
    }
    return max;
  }
  async function sort(arr) {
    let max = getMaxDigit(arr);
    for (let i = 0; i < max; i++) {
      let bucket = Array.from({ length: 10 }, () => []);
      for (let j = 0; j < arr.length; j++) {
        bucket[9 - getDigit(arr[j], i)].push(arr[j]);
      }
      arr = [].concat(...bucket);
      await sleep(1000);
      printCandels2(arr);
    }
    return arr;
  }
  candels = await sort(candels);
  console.log(candels);
  printCandels();
}

// sleep main thread
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
