//Constants
const INITIAL       = 10,
    GRAVITY       =  0,
    REBOUND_RATIO =  0.5,
    DAMPING_RATIO =  0.995;

//Globals
var timer, t = 0,
    objects = [],
    mX = window.innerWidth / 2, 
    mY = window.innerHeight / 2;

function init(){
  //Start the timer
  addSoccer(mX, mY, 50, 50)
  addP1(window.innerWidth / 4, mY, 100, 75)
  addP2((window.innerWidth / 4) * 3, mY, 100, 75)
  
  timer = window.setInterval(update, 10);
}

function addSoccer(x, y, w, h){
  //Create DOM element
  element = document.createElement("div");
  element.style.left   = x+"px";
  element.style.top    = y+"px";
  element.style.width  = w+"px";
  element.style.height = h+"px";
  element.id = "soccerBall"

  document.getElementById('gameField').appendChild(element);
  //Create object
  let object = {
    element: element,
    width:  w,
    height: h,
    px: x, py: y,
    vx: 0, vy: 0
  };
  //Add object to array
  objects.push(object);
}

function addP1(x, y, w, h){
  //Create DOM element
  element = document.createElement("div");
  element.style.left   = x+"px";
  element.style.top    = y+"px";
  element.style.width  = w+"px";
  element.style.height = h+"px";
  element.id = "p1"

  document.getElementById('gameField').appendChild(element);
  //Create object
  let object = {
    element: element,
    width:  w,
    height: h,
    px: x, py: y,
    vx: 0, vy: 0
  };
  //Add object to array
  objects.push(object);
}

function addP2(x, y, w, h){
  //Create DOM element
  element = document.createElement("div");
  element.style.left   = x+"px";
  element.style.top    = y+"px";
  element.style.width  = w+"px";
  element.style.height = h+"px";
  element.id = "p2"

  document.getElementById('gameField').appendChild(element);
  //Create object
  let object = {
    element: element,
    width:  w,
    height: h,
    px: x, py: y,
    vx: 0, vy: 0
  };
  //Add object to array
  objects.push(object);
}

function addForce(obj, x, y){
    obj.vx += x;
    obj.vy += y;
}

function update(){
  for(let i = objects.length - 1; i >= 0; i--){
    // Apply rebound after collision
    if (objects[i].px < 0) {
      // Left
      objects[i].px = 0;
      objects[i].vx = Math.abs(objects[i].vx) * REBOUND_RATIO;
    } else if (objects[i].px + objects[i].width > window.innerWidth - 10) {
      // Right
      objects[i].px = window.innerWidth - objects[i].width - 10;
      objects[i].vx = -Math.abs(objects[i].vx) * REBOUND_RATIO;
    }
    if (objects[i].py < 0) {
      // Top
      objects[i].py = 0;
      objects[i].vy = Math.abs(objects[i].vy) * REBOUND_RATIO;
    } else if (objects[i].py + objects[i].height > window.innerHeight - 10) {
      // Bottom
      objects[i].py = window.innerHeight - objects[i].height - 10;
      objects[i].vy = -Math.abs(objects[i].vy) * REBOUND_RATIO;
    }

    //Apply damping
    objects[i].vx *= DAMPING_RATIO;
    objects[i].vy *= DAMPING_RATIO;

    //Apply gravity
    objects[i].vy += GRAVITY;

    //Update position
    objects[i].px += objects[i].vx;
    objects[i].py += objects[i].vy;
    objects[i].element.style.left = objects[i].px+"px";
    objects[i].element.style.top  = objects[i].py+"px";
    
    //Update Rotation
    deg = Math.atan2(objects[i].vy, objects[i].vx) * 180 / Math.PI
    objects[i].element.style.transform = `rotate(${deg}deg)`
  }
  //Increment time
  t++;
}

document.addEventListener("DOMContentLoaded", function() {
  init()

  document.addEventListener('keydown', function(event) {
    //Player 1 controls
    if (event.key == "w") {
      addForce(objects[1], 0, -2.5);
    }
    if (event.key == "a") {
      addForce(objects[1], -2.5, 0);
    }
    if (event.key == "s") {
      addForce(objects[1], 0, 2.5);
    }
    if (event.key == "d") {
      addForce(objects[1], 2.5, 0);
    }

    //Player 2 controls
    if (event.key == "ArrowUp") {
      addForce(objects[2], 0, -2.5);
    }
    if (event.key == "ArrowLeft") {
      addForce(objects[2], -2.5, 0);
    }
    if (event.key == "ArrowDown") {
      addForce(objects[2], 0, 2.5);
    }
    if (event.key == "ArrowRight") {
      addForce(objects[2], 2.5, 0);
    }
  })
})