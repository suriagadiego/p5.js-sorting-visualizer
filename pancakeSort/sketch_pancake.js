
let ppValues = []
let i = 0
let w = 5
let states = []
let index
const time = 1000
function setup() {
  var myCanvasPancake = createCanvas(windowWidth, windowHeight/2);
  myCanvasPancake.parent("pancakeSortContainer");
  
  pValues = new Array(floor(width/w))
  for (let i =0; i< pValues.length; i++){
    pValues[i] = i * (height/ppValues.length)
    states[i] = -1
  }
  console.log(states)
  ppValues = ppValues.sort(() => Math.random() - 0.5)
  frameRate(60)
  pancake_sort(pValues)
}


function draw() {
  background(51);

  for (let i = 0; i < pValues.length; i++){
    stroke(0)
    if (states[i] == 0){
      fill('#E0777D')
    } 
    else if(states [i] == 1){
      fill('#5DADE2')
    }
    else if(states[i] == 2){
      fill('#D6FFB7')
    }
    else{
      fill(255)
    }
    rect(i * w, height - pValues[i], w, pValues[i])
  }
}

async function pancake_sort(arr) {
  console.log(states)
  console.log('first')

  for (var i = arr.length - 1; i >= 1; i--) {
      // find the index of the largest element not yet sorted
      var max_idx = 0;
      var max = arr[0];
      states[max_idx] = -1
      for (var j = 1; j <= i; j++) {
          if (arr[j] > max) {
              max = arr[j];
              max_idx = j;
          }
          
          
          
      }
      console.log(states)

      if (max_idx == i) 
          continue; // element already in place

      var new_slice;

      // flip arr max element to index 0
      if (max_idx > 0) {
          // states[max_idx] = -1
          new_slice = arr.slice(0, max_idx+1).reverse();
          await sleep(time)
          for ( j = 0; j <= i; j++){ // AFTER SWAP GREEN
            states[j] = -1;
          }
          for ( j = 0; j <= max_idx; j++){ // BLUE
            states[j] = 1;
          }
          await flip(arr,max_idx,new_slice)
          for ( j = 0; j <= max_idx; j++){ // AFTER SWAP GREEN
            states[j] = 0;
          }
      }

      // then flip the max element to its place
      new_slice = arr.slice(0, i+1).reverse();
      await sleep(time)
      for ( j = 0; j <= max_idx; j++){ //BEFORE SWAP MAKE IT WHITE
        states[j] = -1;
      }
      for ( j = 0; j <= i; j++){ // MAKE IT BLUE
        states[j] = 1;
      }
      await flip(arr,i,new_slice)
      for ( j = 0; j <= i; j++){ // AFTER SWAP GREEN
        states[j] = 0;
      }
  }
  return arr;
}


async function finished(){
  
  console.log('Finished')
  
  for (let i = 0; i < pValues.length; i++){
    states[i] = 0
    await sleep(3) 
    states[i] = 2
  }
}

async function flip(arr,x,new_slice, max_idx){
  states[max_idx] = -1
  await sleep(time)
  for ( j = 0; j <= x; j++){
    arr[j] = new_slice[j];
  }
  
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}