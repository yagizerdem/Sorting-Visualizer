const SD = {
  bublesort: 0,
  selectionsort: 1,
  insertionsort: 2,
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
// sleep main thread
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
