const time = 1

sleep = function(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}

swap =  async function(arr, a, b) {
  await sleep(time)
  temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

var cocktail = function(c){
  c.values = []
  c.i = 0
  c.w = 5
  c.states = []

  c.setup = function(){
    c.createCanvas(600, 200);
    c.values = new Array(~~(c.width / c.w))
    for (let i = 0; i < c.values.length; i++) {
      c.values[i] = i * (c.height / c.values.length) + 2
      c.states[i] = -1
    }
    c.values = c.values.sort(() => Math.random() - 0.5)
    c.frameRate(60)
    c.cocktailSort(c.values)
    console.log(c.values)
  }

  c.draw = function(){
    c.background(51);

    for (let i = 0; i < c.values.length; i++) {
      c.stroke(0)
      if (c.states[i] == 0) {
        c.fill('#E0777D')
      }
      else if (c.states[i] == 1) {
        c.fill('#5DADE2')
      }
      else if (c.states[i] == 2) {
        c.fill('#D6FFB7')
      }
      else {
        c.fill(255)
      }
      c.rect(i * c.w, c.height - c.values[i], c.w, c.values[i])
    }
  }

  c.cocktailSort = async function(nums) {
    c.is_Sorted = true;
    while (c.is_Sorted) {
      for (let i = 0; i < nums.length - 1; i++) {
        c.states[i] = 0
        c.states[i + 1] = 0
        if (nums[i] > nums[i + 1]) {
          await swap(nums, i, i + 1)
          c.states[i] = -1
          c.states[i + 1] = -1
          c.is_Sorted = true;
        }
        c.states[i] = -1
        c.states[i + 1] = -1
      }
  
      if (!c.is_Sorted)
        break;
  
        c.is_Sorted = false;
  
      for (let j = nums.length - 1; j > 0; j--) {
        c.states[j] = -1
        c.states[j - 1] = -1
        if (nums[j - 1] > nums[j]) {
          c.states[j] = 0
          c.states[j - 1] = 0
          await swap(nums, j, j - 1)
          c.is_Sorted = true;
        }
        c.states[j] = -1
        c.states[j - 1] = -1
      }
    }
  }

}

var pancake = function(p){
  p.values = []
  p.i = 0
  p.w = 5
  p.states = []
  p.time = 50
  p.setup = function(){
    p.createCanvas(600, 200);
    p.values = new Array(~~(p.width / p.w))
    for (let i = 0; i < p.values.length; i++) {
      p.values[i] = i * (p.height / p.values.length) + 2
      p.states[i] = -1
    }
    p.values = p.values.sort(() => Math.random() - 0.5)
    p.frameRate(60)
    p.pancake_sort(p.values)
    console.log(p.values)
  }

  p.draw = function(){
    p.background(51);

    for (let i = 0; i < p.values.length; i++) {
      p.stroke(0)
      if (p.states[i] == 0) {
        p.fill('#E0777D')
      }
      else if (p.states[i] == 1) {
        p.fill('#5DADE2')
      }
      else if (p.states[i] == 2) {
        p.fill('#D6FFB7')
      }
      else {
        p.fill(255)
      }
      p.rect(i * p.w, p.height - p.values[i], p.w, p.values[i])
    }
  }

  p.pancake_sort = async function(arr) {
    for (var i = arr.length - 1; i >= 1; i--) {
        // find the index of the largest element not yet sorted
        p.max_idx = 0;
        p.max = arr[0];
        p.states[p.max_idx] = -1
        for (var j = 1; j <= i; j++) {
            if (arr[j] > p.max) {
              p.max = arr[j];
              p.max_idx = j;
            }          
        }
        if (p.max_idx == i) 
            continue; // element already in place
  
            p.new_slice;
  
        // flip arr max element to index 0
        if (p.max_idx > 0) {
            // states[max_idx] = -1
            p.new_slice = arr.slice(0, p.max_idx+1).reverse();
            await sleep(p.time)
            for ( j = 0; j <= i; j++){ // AFTER SWAP GREEN
              p.states[j] = -1;
            }
            for ( j = 0; j <= p.max_idx; j++){ // BLUE
              p.states[j] = 1;
            }
            await p.flip(arr,p.max_idx,p.new_slice)
            for ( j = 0; j <= p.max_idx; j++){ // AFTER SWAP GREEN
              p.states[j] = 0;
            }
        }
        // then flip the max element to its place
        p.new_slice = arr.slice(0, i+1).reverse();
        await sleep(p.time)
        for ( j = 0; j <= p.max_idx; j++){ //BEFORE SWAP MAKE IT WHITE
          p.states[j] = -1;
        }
        for ( j = 0; j <= i; j++){ // MAKE IT BLUE
          p.states[j] = 1;
        }
        await p.flip(arr,i,p.new_slice)
        for ( j = 0; j <= i; j++){ // AFTER SWAP GREEN
          p.states[j] = 0;
        }
    }
    return arr;
  }

  p.flip = async function (arr,x,new_slice, max_idx){
    p.states[max_idx] = -1
    await sleep(p.time)
    for ( j = 0; j <= x; j++){
      arr[j] = new_slice[j];
    }
    
  }


}
var flash = function(f){
  f.values = []
  f.i = 0
  f.w = 5
  f.states = []

  f.setup = function(){
    f.createCanvas(600, 200);
    f.values = new Array(~~(f.width / f.w))
    for (let i = 0; i < f.values.length; i++) {
      f.values[i] = i * (f.height / f.values.length) + 2
      f.states[i] = -1
    }
    f.values = f.values.sort(() => Math.random() - 0.5)
    f.frameRate(60)
    f.flash_sort(f.values)
    console.log(f.values)
  }

  f.draw = function(){
    f.background(51);

    for (let i = 0; i < f.values.length; i++) {
      f.stroke(0)
      if (f.states[i] == 0) {
        f.fill('#E0777D')
      }
      else if (f.states[i] == 1) {
        f.fill('#5DADE2')
      }
      else if (f.states[i] == 2) {
        f.fill('#D6FFB7')
      }
      else {
        f.fill(255)
      }
      f.rect(i * f.w, f.height - f.values[i], f.w, f.values[i])
    }
  }
  f.flash_sort = async function(arr) 
  {
    f.max = 0, f.min = arr[0];
    f.n = arr.length;
    f.m = ~~(0.45 * f.n);
    f.l = new Array(f.m);
    f.mm = 0
    for (var i = 1; i < f.n; ++i) {
      f.states[i] = 0
      await sleep(time)
        if (arr[i] < f.min) {
          f.states[f.mm] = -1
            f.min = arr[i];
            f.mm = i
            f.states[i] = 1
        }
        if (arr[i] > arr[f.max]) {
          f.states[f.max] = -1
            f.max = i;
            f.states[i] = 2
        }
        if (f.states[i] == 0){
          f.states[i] = -1 
        } 
        
      
    }
    f.states[f.mm] = -1
    f.states[f.max] = -1
 
     if (f.min === arr[f.max]) {
        return arr;
    }
 
    f.c1 = (f.m - 1) / (arr[f.max] - f.min);
 
 
    for (var k = 0; k < f.m; k++) {
      f.l[k] = 0;
    }
    for (var j = 0; j < f.n; ++j) {
      f.k = ~~(f.c1 * (arr[j] - f.min));
        ++f.l[f.k];
    }
 
    for (var p = 1; p < f.m; ++p) {
      f.l[p] = f.l[p] + f.l[p - 1];
    }

    // await sleep(time)
    f.hold = arr[f.max];
    arr[f.max] = arr[0];
    arr[0] = f.hold;
 
    //permutation
    f.move = 0, f.t, f.flash;
    f.j = 0; 
    f.k = f.m - 1;
  
    while (f.move < (f.n - 1)) {
        while (f.j > (f.l[f.k] - 1)) {
            ++f.j;
            f.k = ~~(f.c1 * (arr[f.j] - f.min));
        }
        if (f.k < 0) break;
        f.flash = arr[f.j];
        // states[j] = 0
        while (f.j !== f.l[f.k]) {
            f.states[f.t] = 0
            await sleep(time)
            f.k = ~~(f.c1 * (f.flash - f.min));
            f.states[f.t] = -1
            f.hold = arr[f.t = --f.l[f.k]];
            // await sleep(1000)
            arr[f.t] = f.flash;
            f.flash = f.hold;
            ++f.move;
        }
    }
 
    //insertion
    for (j = 1; j < f.n; j++) {
      f.states[j]= 0
      await sleep(time)
      f.hold = arr[j];
      f.i = j - 1;
        while (f.i >= 0 && arr[f.i] > f.hold) {
          await sleep(time)
            arr[f.i + 1] = arr[f.i--];
        }
        // await sleep(time)
        arr[f.i + 1] = f.hold;
        f.states[j]= -1
    }
    return arr;
}
}



var cocktailp5 = new p5(cocktail, 'cocktail')
var pancakep5 = new p5(pancake, 'pancake')
var flashp5 = new p5(flash, 'pancake')