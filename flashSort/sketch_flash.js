let valuesF = []
let z = 0
let wndw = 5
let statesF = []
const timeF = 100

async function setup() {
  var myCanvasFlash = createCanvas(windowWidth, windowHeight/2);
  myCanvasFlash.parent("flashSortContainer");
  valuesF = new Array(floor(width/wndw))
  for (let z =0; z< valuesF.length; z++){
    valuesF[z] = z * (height/valuesF.length) + 2
    statesF[z] = -1
  }
  valuesF = valuesF.sort(() => Math.random() - 0.5)
  frameRate(60)
  await flash_sort(valuesF)
  await finished()
}

function draw() {
  background(51);

  for (let z = 0; z < valuesF.length; z++){
    stroke(0)
    if (statesF[z] == 0){
      fill('#E0777D') // white
    } 
    else if(statesF [z] == 1){
      fill('#5DADE2') // blue
    }
    else if(statesF[z] == 2){
      fill('#D6FFB7') // green
    }
    else{
      fill(255)
    }
    rect(z * wndw, height - valuesF[z], wndw, valuesF[z])
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
    for (var z = 1; z < n; ++z) {
      statesF[z] = 0
      await sleep(timeF)
        if (arr[z] < min) {
            statesF[mm] = -1
            min = arr[z];
            mm = z
            statesF[z] = 1
        }
        if (arr[z] > arr[max]) {
            statesF[max] = -1
            max = z;
            statesF[z] = 2
        }
        if (statesF[z] == 0){
          statesF[z] = -1 
        } 
        
      
    }
    statesF[mm] = -1
    statesF[max] = -1
 
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

    // await sleep(timeF)
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
        // statesF[j] = 0
        while (j !== l[k]) {
            statesF[t] = 0
            console.log(t)
            console.log('-----t-----')
            await sleep(timeF)
            k = ~~(c1 * (flash - min));
            statesF[t] = -1
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
      statesF[j]= 0
      await sleep(timeF)
        hold = arr[j];
         z = j - 1;
        while (z >= 0 && arr[z] > hold) {
          await sleep(timeF)
            arr[z + 1] = arr[z--];
        }
        // await sleep(timeF)
        arr[z + 1] = hold;
        statesF[j]= -1
    }
    return arr;
}



async function finished(){
  
  console.log('Finished')
  
  for (let z = 0; z < valuesF.length; z++){
    statesF[z] = 0
    await sleep(3) 
    statesF[z] = 2
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
  
  for (let z = 0; z < valuesF.length; z++){
    statesF[z] = 0
    await sleep(3) 
    statesF[z] = 2
  }
}