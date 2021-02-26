let cValues = []
let k = 0
let win = 5
let statesC = []


function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight / 2);
  myCanvas.parent("cocktailSortContainer");
  cValues = new Array(floor(width / win))
  for (let k = 0; k < cValues.length; k++) {
    cValues[k] = k * (height / cValues.length)
    statesC[k] = -1
  }
  cValues = cValues.sort(() => Math.random() - 0.5)
  frameRate(60)
  cocktailSort(cValues)
}
function draw() {
  background(51);

  for (let k = 0; k < cValues.length; k++) {
    stroke(0)
    if (statesC[k] == 0) {
      fill('#E0777D')
    }
    else if (statesC[k] == 1) {
      fill('#5DADE2')
    }
    else if (statesC[k] == 2) {
      fill('#D6FFB7')
    }
    else {
      fill(255)
    }
    rect(k * win, height - cValues[k], win, cValues[k])
  }
}

async function cocktailSort(nums) {
  let is_Sorted = true;
  while (is_Sorted) {
    for (let k = 0; k < nums.length - 1; k++) {
      statesC[k] = 0
      statesC[k + 1] = 0
      if (nums[k] > nums[k + 1]) {
        await swap(nums, k, k + 1)
        statesC[k] = -1
        statesC[k + 1] = -1
        is_Sorted = true;
      }
      statesC[k] = -1
      statesC[k + 1] = -1
    }

    if (!is_Sorted)
      break;

    is_Sorted = false;

    for (let j = nums.length - 1; j > 0; j--) {
      statesC[j] = -1
      statesC[j - 1] = -1
      if (nums[j - 1] > nums[j]) {
        statesC[j] = 0
        statesC[j - 1] = 0
        await swap(nums, j, j - 1)
        is_Sorted = true;
      }
      statesC[j] = -1
      statesC[j - 1] = -1
    }
  }
}

async function swap(arr, a, b) {
  await sleep(100)
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}