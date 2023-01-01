//Map creation

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const worldMap = [
  //The game board 1 = walls, 0 = free space, and -1 = the goal
  [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]
]

const cols = 17
const size = parseInt(canvas.width / cols)

const world = []

worldMap.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    world.push({
      type: col === 1 ? 'BLOCK' : 'FLOOR',
      x: colIndex * size,
      y: rowIndex * size,
      width: size,
      height: size
    })
  })
});

const floors = world.filter(elm => elm.type === 'FLOOOR');
const blocks = world.filter(elm => elm.type === 'BLOCK');

//Define Entrance

//Define Exit//

// Player moving

const player = {
  x: size,
  y: 0,
  width: size,
  height: size,
  fill: 'red',
  moveUp: function() {
    const self = this
    let hit = false
   
    blocks.forEach(elm => {
      if (self.y - size === elm.y && self.x === elm.x) {
        hit = true
      }
    })
    
    if (!hit) this.y -= size
  },
  moveDown: function() {
    const self = this
    let hit = false
   
    blocks.forEach(elm => {
      if (self.y + size === elm.y && self.x === elm.x) {
        hit = true
      }
    })
    
    if (!hit) this.y += size},
  moveLeft: function() {
    const self = this
    let hit = false
   
    blocks.forEach(elm => {
      if (self.x - size === elm.x && self.y === elm.y) {
        hit = true
      }
    })
    
    if (!hit) this.x -= size
  },
  moveRight: function() {
    const self = this
    let hit = false
   
    blocks.forEach(elm => {
      if (self.x + size === elm.x && self.y === elm.y) {
        hit = true
      }
    })
    
    if (!hit) this.x += size
  }
}

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  blocks.forEach(elm => {
    ctx.fillRect(elm.x, elm.y, elm.width, elm.height)
  })
  
  floors.forEach(elm => {
    ctx.rect(elm.x, elm.y, elm.width, elm.height)
  });
  
  ctx.save()
  ctx.fillStyle = player.fill
  ctx.fillRect(player.x, player.y, player.width, player.height)
  ctx.restore()
}

render()

window.onkeydown = function(e) {
  const key = e.keyCode

  switch(key) {
    case 38: player.moveUp(); break
    case 40: player.moveDown(); break
    case 37: player.moveLeft(); break
    case 39: player.moveRight(); break
  }
  
  render()
}

// Timer

const settings = {
  color: "#889000",
  start : 60
 
};

const state = {
  finish: false
}

document.body.style.backgroundColor = settings.color;

let counter= 60;
let countdown = document.querySelector('.count-down');
let cicle = setInterval (function(){  
  counter -= 1;
  countdown.innerHTML = counter;
  if(counter === 0) {
    state.finish = true;
    console.log(state);
    clearInterval(cicle);
  }
}, 1000);

//Finished before timer

// setTimeout(() => {
// 	    if (self.y >= cols * size) {
// 	      alert('Você Saiu!!!!')
// }, timeout);    
//     }
//   },600)

// //// Display Victory
// function displayVictoryMess(moves) {
//   document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps.";
//   toggleVisablity("Message-Container");  
// }

// function toggleVisablity(id) {
//   if (document.getElementById(id).style.visibility == "visible") {
//     document.getElementById(id).style.visibility = "hidden";
//   } else {
//     document.getElementById(id).style.visibility = "visible";
//   }
// }