let values = []
let i = 0
let w = 5
let states = []
time = 100

async function setup() {
  createCanvas(windowWidth, windowHeight/2);
  values = new Array(floor(width/w))
  for (let i =0; i< values.length; i++){
    values[i] = i * (height/values.length) + 2
    states[i] = -1
  }
  values = values.sort(() => Math.random() - 0.5)
  frameRate(60)
  await flash_sort(values)
  await finished()
}

function draw() {
  background(51);

  for (let i = 0; i < values.length; i++){
    stroke(0)
    if (states[i] == 0){
      fill('#E0777D') // white
    } 
    else if(states [i] == 1){
      fill('#5DADE2') // blue
    }
    else if(states[i] == 2){
      fill('#D6FFB7') // green
    }
    else{
      fill(255)
    }
    rect(i * w, height - values[i], w, values[i])
  }
  noLoop
}

async function flash_sort(arr) 
  {
    var max = 0, min = arr[0];
    var n = arr.length;
    var m = ~~(0.45 * n);
    var l = new Array(m);
    var mm = 0
    for (var i = 1; i < n; ++i) {
      states[i] = 0
      await sleep(time)
        if (arr[i] < min) {
            states[mm] = -1
            min = arr[i];
            mm = i
            states[i] = 1
        }
        if (arr[i] > arr[max]) {
            states[max] = -1
            max = i;
            states[i] = 2
        }
        if (states[i] == 0){
          states[i] = -1 
        } 
        
      
    }
    states[mm] = -1
    states[max] = -1
 
     if (min === arr[max]) {
        return arr;
    }
 
    var c1 = (m - 1) / (arr[max] - min);
 
 
    for (var k = 0; k < m; k++) {
        l[k] = 0;
    }
    for (var j = 0; j < n; ++j) {
        k = ~~(c1 * (arr[j] - min));
        ++l[k];
    }
 
    for (var p = 1; p < m; ++p) {
        l[p] = l[p] + l[p - 1];
    }

    // await sleep(time)
    var hold = arr[max];
    arr[max] = arr[0];
    arr[0] = hold;
 
    //permutation
    var move = 0, t, flash;
    j = 0; 
    k = m - 1;
  
    while (move < (n - 1)) {
        while (j > (l[k] - 1)) {
            ++j;
            k = ~~(c1 * (arr[j] - min));
        }
        if (k < 0) break;
        flash = arr[j];
        // states[j] = 0
        while (j !== l[k]) {
            states[t] = 0
            console.log(t)
            console.log('-----t-----')
            await sleep(time)
            k = ~~(c1 * (flash - min));
            states[t] = -1
            hold = arr[t = --l[k]];
            console.log(t)
            console.log('-----t2-----')
            
            // await sleep(1000)
            arr[t] = flash;
            flash = hold;
            ++move;
        }
    }
 
    //insertion
    for (j = 1; j < n; j++) {
      states[j]= 0
      await sleep(time)
        hold = arr[j];
         i = j - 1;
        while (i >= 0 && arr[i] > hold) {
          await sleep(time)
            arr[i + 1] = arr[i--];
        }
        // await sleep(time)
        arr[i + 1] = hold;
        states[j]= -1
    }
    return arr;
}



async function finished(){
  
  console.log('Finished')
  
  for (let i = 0; i < values.length; i++){
    states[i] = 0
    await sleep(3) 
    states[i] = 2
  }
}


async function swap(arr, a, b){
  await sleep(25)
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}

async function finished(){
  
  console.log('Finished')
  
  for (let i = 0; i < values.length; i++){
    states[i] = 0
    await sleep(3) 
    states[i] = 2
  }
}