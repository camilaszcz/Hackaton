//Map creation

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const worldMap = [
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

////Determine the exit

function setTimeout() {
	    if (self.y >= cols * size)
	      alert('You won!!!!')}


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

// const settings = {
//   color: "#889000",
//   start : 60
 
// };

// const state = {
//   finish: false
// }

// // document.body.style.backgroundColor = settings.color;

// let counter= 60;
// let countdown = document.querySelector('.count-down');
// let cicle = setInterval (function(){  
//   counter -= 1;
//   countdown.innerHTML = counter;
//   if(counter == 0) {
//     state.finish = true;
//     console.log(state);
//     clearInterval(cicle);
//   }
// }, 1000);


// Timer component properties


// // Timer component
// function timer: TimerProperties = (props) => {
//   if (props.timer) {
//     return (
//       <p id="timer">
//         <span className="data">
//           {props.timer}
//         </span>
//         <span className="unit">
//           Seconds
//         </span>
//       </p>
//     )
//   } else { // Show -- if the timer is stopped
//     return (
//       <p id="timer">
//         <span className="data">
//           --
//         </span>
//       </p>
//     )
//   }
// }



// const GAME_LENGTH = 60 // seconds

// class MazeGame {
//   constructor() {
//     this.scoreboard = document.querySelector('.scoreboard')
//     this.maze = document.querySelector('.maze')
//     this.timer = document.querySelector('.timer')
//     this.score = {
//       won: 0,
//       lost: 0,
//       moves: 0,
//       best: Infinity,
//     }
//     this._then = performance.now()

//     this.maze.addEventListener('click', event => this.clickHandler(event), false)
//     this.maze.addEventListener('mousemove', event => this.mouseMoveHandler(event), false)
//     this.restartTimer = this.getTimer()
//     this.newGame()
//   }

//   getTimer() {
//     let duration = 60
//     let interval
//     const fn = () => {
//       const d = --duration > 9 ? duration : `0${duration}`
//       this.timer.innerHTML = `[ 0:${d} ]`
//       if (duration === 0) {
//         clearInterval(interval)
//         this.newGame(false)
//       }
//     }
//     interval = setInterval(fn, 1000)
//     return () => {
//       duration = GAME_LENGTH
//       clearInterval(interval)
//       interval = setInterval(fn, 1000)
//     }
//   }

//   newGame(won) {
//     // Set new moves to zero
//     this.score.moves = timer
//     // restart the game timer and update the scoreboard
//     this.restartTimer()
//     this.updateScoreBoard()

//     // If previous game was won, up the score
//     // Note directly checking the boolean because in first game, 'won' is undefined
//     if (won === true) this.score.won++
//     else if (won === false) this.score.lost++

//     let timeout = 0
//     if (won !== undefined) {
//       // Style game board green for a win or red for a loss
//       setTimeout(() => this.pathElms.forEach(el => {
//         el.style.setProperty('fill', won ? '#388E3C' : '#FF5252')
//       }), 400)
//       timeout = 2000
//     }

   

//   updateScoreBoard() {
//     const { won, lost, moves, best } = this.score;
//     this.scoreboard.innerHTML = `won: ${won} | lost: ${lost} | moves: ${moves} | best: ${best === Infinity ? '??' : best}`
//   }

  

//     // If player has reached goal..
//     if (util.pointInPolygon(this.player.xy, this.goal)) {
//       // Check if this was players best game and update scoreboard if it was
//       if (this.score.moves < this.score.best) this.score.best = this.score.moves
//       // Start a new game
//       this.newGame(true)
//     }

//     // Update scoreboard
//     this.updateScoreBoard()
//   }
  
//   getLocalPoint(event) {
//     const { top, left } = this.maze.getBoundingClientRect()
//     return [event.clientX - left - 10, event.clientY - top - 10]
//   }

//   mouseMoveHandler(event) {
//     return requestAnimationFrame(() => {
//       if (performance.now() - this._then > 0) {
//         this._then = performance.now()
//         // Get cursor position
//         const localPoint = this.getLocalPoint(event)

//         // Get the wall intersection between the player & the cursor this is closest to the player
//         const closestIntersection = util.getClosestIntersectionPoint([
//           this.getPlayerPosition(),
//           localPoint,
//         ], this.walls)

//         // Update line of sight
//         const line = [this.getPlayerPosition(), closestIntersection || localPoint]
//         this.setLinePosition(line)
//       }
//     })
//   }
// }

// new MazeGame()

// // if lost+won===3
// // banner game over


// //////////
// function CheckPath(dirc) {
//   if (!current.walls[dirc]) {
//       var newCell;
//       switch (dirc) {
//           case 0: // top
//               newCell = cells[index(current.x, current.y - d)];
//               break;
//           case 1: //right
//               newCell = cells[index(current.x + d, current.y)];
//               break;
//           case 2: // bottom
//               newCell = cells[index(current.x, current.y + d)];
//               break;
//           case 3: //left
//               newCell = cells[index(current.x - d, current.y)];
//               break;
//       }
//       keepMoving(newCell == path[path.length - 2], newCell);

//   }
//   return;
// }

// function keepMoving(dirc, n) {
//   if (dirc) {
//       move = setInterval(function() {
//           if (!(path[path.length - 2] && path[path.length - 2].Neighbours().length < 3)) {
//               if (path[path.length - 2]) {
//                   current = path[path.length - 2];
//                   path.pop();
//               }
//               clearInterval(move);
//               move = null;
//           } else {
//               current = path[path.length - 2];
//               path.pop();
//           }
//           DrawMaze();
//       }, 100);

//   } else {
//       current = n;
//       path.push(current);
//       move = setInterval(function() {
//           DrawMaze();
//           if (!(current != endPoint && current.Neighbours().length < 3)) {
//               clearInterval(move);
//               move = null;
//               if (current == endPoint) {
//                   win();
//               }
//           } else {
//               if (current.Neighbours().length == 1) {
//                   clearInterval(move);
//                   move = null;
//               } else {
//                   current = (current.Neighbours()[0] == path[path.length - 2]) ? current.Neighbours()[1] : current.Neighbours()[0];
//                   path.push(current);
//               }
//           }
//       }, 100);

//   }
// }

// function win() {
//   end = true;
//   mazec.font = "50px Arial";
//   mazec.textAlign = "center";
//   mazec.fillStyle = 'white';
//   mazec.fillText("Good job", maze.width / 2, maze.height / 2);
//   mazec.font = "20px Arial";
//   mazec.fillText("Press Space to play again", maze.width / 2, maze.height / 2 + 50);
// }

// function keyPush(e) {
//   if (move) {
//       return;
//   }
//   if (e.keyCode == 38) { // top
//       CheckPath(0);
//   } else if (e.keyCode == 39) { // right
//       CheckPath(1);
//   } else if (e.keyCode == 40) { // bottom
//       CheckPath(2);
//   } else if (e.keyCode == 37) { // left
//       CheckPath(3);
//   } else if (e.keyCode == 32) { // Space
//       if (end) {
//           newGame();
//       }
//   }
// }

// //////new game button
// // Button component
// const Button: ButtonProperties = (props) => {
//   return (
//     <button className={"button " + props.color} onClick={(event) => props.onClick(event)}>
//       {props.label}
//     </button>
//   )

