let maze = null;
let res = 40;
let count = 0;
let tileCount = 0;
let mouseXPos = 0;
let mouseYPos = 0;
let newX;
let newY;
let colorCheck;
let currentTile;
let isEnd;
let beeps;
let mouseDot = {
  x: 0,
  y: 0,
};

function preload(){
  beeps = loadImage("beeps.png");
}

function setup() {
  createCanvas(720, 720);
  noStroke();
  makeMaze(width / res + 2, height / res + 2);
  drawMaze();
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(32);
  while (maze.stack.length != 0) {
    background("#aee68e");
    mazeIterate();
    drawMaze();
  }
}

function draw() {
  mouseXPos = mouseDot.x * res;
  mouseYPos = mouseDot.y * res;
  if(mouseXPos == 680 && mouseYPos == 680){
    background("GREEN");
    fill("RED");
    text("Great Job Getting out of the Maze", 360, 360);
  } else {
    print(mouseXPos, mouseYPos);
    drawMaze();
    fill("GREEN")
    ellipse(34 * res / 2 + res / 2, 34 * res / 2 + res / 2, res / 2);
    image(beeps, mouseXPos + res / 2, mouseYPos + res / 2, 30, 30);
  }
}


function keyPressed() {
  currentTile = maze.tiles[mouseDot.x][mouseDot.y];

  if (keyCode === UP_ARROW || key === "W") {
    colorCheck = get((mouseXPos + res / 2), (mouseYPos + res / 2 ) - 20);
    console.log(colorCheck);
    if (mouseDot.y !== 0) {
      if(colorCheck[0] != 0){
        mouseDot.y--;
      }
    }
  } else if (keyCode === DOWN_ARROW || key === "S") {
    colorCheck = get((mouseXPos + res / 2), (mouseYPos + res / 2 ) + 20);
    console.log(colorCheck);
    if (mouseDot.y !== 17 && colorCheck != 0) {
      if(colorCheck[0] != 0){
        mouseDot.y++;
      }
    }
  } else if (keyCode === RIGHT_ARROW || key === "D") {
    colorCheck = get((mouseXPos + res / 2) + 20, (mouseYPos + res / 2 ));
    console.log(colorCheck);
    if (mouseDot.x !== 17) {
      if(colorCheck[0] != 0){
        mouseDot.x++;
      }
    }
  } else if (keyCode === LEFT_ARROW || key === "A") {
    colorCheck = get((mouseXPos + res / 2) - 20, (mouseYPos + res / 2 ));
    console.log(colorCheck);
    if (mouseDot.x !== 0) {
      if(colorCheck[0] != 0){
        mouseDot.x--;
      }
    }
  }
}



function makeMaze(w, h) {
  maze = {
    stack: [],
    tiles: [],
    w: w,
    h: h,
  };

  for (let i = 0; i < w; i++) {
    maze.tiles[i] = [];
    for (let j = 0; j < h; j++) {
      maze.tiles[i][j] = {
        up: "wall",
        down: "wall",
        left: "wall",
        right: "wall",
        isStart: false,
        isCurrent: false,
        x: i,
        y: j,
        seen: false,
      };
      if (i == 0 || i == w - 1 || j == 0 || j == h - 1) {
        maze.tiles[i][j].seen = true;
      }
    }
  }

  maze.tiles[1][1].isCurrent = true;
  maze.tiles[1][1].isStart = true;
  maze.tiles[1][1].seen = true;
  maze.stack.push(maze.tiles[1][1]);
}

function mazeIterate() {
  let current = maze.stack.pop();

  let tileAndWall = pickNeighbor(current);
  if (tileAndWall) {
    maze.stack.push(current);
    tileAndWall.tile[tileAndWall.wall] = "open";
    current[oppositeWall(tileAndWall.wall)] = "open";
    tileAndWall.tile.seen = true;
    maze.stack.push(tileAndWall.tile);

    current.isCurrent = false;
    tileAndWall.tile.isCurrent = true;

    tileCount++;

    if (maze.stack.length != 0) {
      current.isCurrent = false;
      maze.stack[maze.stack.length - 1].isCurrent = true;
    }
  }
}

function pickNeighbor(tile) {
  let unSeen = [];

  let upTile = maze.tiles[tile.x][tile.y + 1];
  if (!upTile.seen) {
    unSeen.push({
      tile: upTile,
      wall: "up",
    });
  }
  let downTile = maze.tiles[tile.x][tile.y - 1];
  if (!downTile.seen) {
    unSeen.push({
      tile: downTile,
      wall: "down",
    });
  }
  let rightTile = maze.tiles[tile.x + 1][tile.y];
  if (!rightTile.seen) {
    unSeen.push({
      tile: rightTile,
      wall: "right",
    });
  }
  let leftTile = maze.tiles[tile.x - 1][tile.y];
  if (!leftTile.seen) {
    unSeen.push({
      tile: leftTile,
      wall: "left",
    });
  }

  if (unSeen.length == 0) {
    return null;
  }

  return unSeen[Math.floor(Math.random() * unSeen.length)];
}

function oppositeWall(wall) {
  if (wall == "up") {
    return "down";
  } else if (wall == "down") {
    return "up";
  } else if (wall == "right") {
    return "left";
  } else if (wall == "left") {
    return "right";
  }

  return -1;
}

function drawMaze() {
  push();
  translate(-res, -res);
  for (let i = 0; i < maze.tiles.length; i++) {
    for (let j = 0; j < maze.tiles[i].length; j++) {
      let tile = maze.tiles[i][j];
      drawTile(tile, i, j);
    }
  }
  pop();
}

function drawTile(tile, i, j) {
  strokeWeight(0);

  if (tile.seen == true) {
    fill("#e0ecff");
    square(i * res, j * res, res);

    strokeWeight(2);
    stroke("black");
    if (tile.up == "wall") {
      line(i * res, j * res, (i + 1) * res, j * res);
    }
    if (tile.down == "wall") {
      line(i * res, (j + 1) * res, (i + 1) * res, (j + 1) * res);
    }
    if (tile.left == "wall") {
      line((i + 1) * res, j * res, (i + 1) * res, (j + 1) * res);
    }
    if (tile.right == "wall") {
      line(i * res, j * res, i * res, (j + 1) * res);
    }
  }
}

function colorDetect(mouseXPos, mouseYPos){
  colorCheck = get(mouseXPos + 20, mouseYPos);
  console.log(colorCheck);
}