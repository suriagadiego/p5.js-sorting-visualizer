let values = []
let i = 0
let w = 5
let states = []


function setup() {
  createCanvas(windowWidth, windowHeight / 2);
  values = new Array(floor(width / w))
  for (let i = 0; i < values.length; i++) {
    values[i] = i * (height / values.length)
    states[i] = -1
  }
  values = values.sort(() => Math.random() - 0.5)
  frameRate(60)
  cocktailSort(values)
}
function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    stroke(0)
    if (states[i] == 0) {
      fill('#E0777D')
    }
    else if (states[i] == 1) {
      fill('#5DADE2')
    }
    else if (states[i] == 2) {
      fill('#D6FFB7')
    }
    else {
      fill(255)
    }
    rect(i * w, height - values[i], w, values[i])
  }
}

async function cocktailSort(nums) {
  let is_Sorted = true;
  while (is_Sorted) {
    for (let i = 0; i < nums.length - 1; i++) {
      states[i] = 0
      states[i + 1] = 0
      if (nums[i] > nums[i + 1]) {
        await swap(nums, i, i + 1)
        states[i] = -1
        states[i + 1] = -1
        is_Sorted = true;
      }
      states[i] = -1
      states[i + 1] = -1
    }

    if (!is_Sorted)
      break;

    is_Sorted = false;

    for (let j = nums.length - 1; j > 0; j--) {
      states[j] = -1
      states[j - 1] = -1
      if (nums[j - 1] > nums[j]) {
        states[j] = 0
        states[j - 1] = 0
        await swap(nums, j, j - 1)
        is_Sorted = true;
      }
      states[j] = -1
      states[j - 1] = -1
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