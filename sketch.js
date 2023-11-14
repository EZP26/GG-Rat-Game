let maze = null;
let res = 50;
let count = 0;
let tileCount = 0;
let mouseXPos = 0;
let mouseYPos = 0;
let isKeyPressed = false;

function setup() {
  createCanvas(1600, 900);
  noStroke();
  makeMaze(width / res + 2, height / res + 2);
  drawMaze();
}

function draw() {
  while (maze.stack.length != 0) {
    background("#aee68e");
    mazeIterate();
    drawMaze();
  }

  if (!isKeyPressed) {
    drawMouse();
  }

  count++;
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

function drawMouse() {
  fill("gray");
  noStroke();
  circle(mouseXPos * res + res / 2, mouseYPos * res + res / 2, res / 2);
}

function mazeIterate() {
  let current = maze.stack.pop();

  let tileAndWall = pickNeighbor(current);
  if (tileAndWall) {
    maze.stack.push(current);
    tileAndWall.tile[tileAndWall.wall] = "open";
    current[opositeWall(tileAndWall.wall)] = "open";
    tileAndWall.tile.seen = true;
    maze.stack.push(tileAndWall.tile);

    current.isCurrent = false;
    tileAndWall.tile.isCurrent = true;

    tileCount++;

    if (tileCount % 30 == 0) {
      drawCheese(tileAndWall.tile.x, tileAndWall.tile.y);
    }
  } else if (maze.stack.length != 0) {
    current.isCurrent = false;
    maze.stack[maze.stack.length - 1].isCurrent = true;
  }
}

function drawCheese(i, j) {
  fill("yellow");
  noStroke();
  circle(i * res + res / 2, j * res + res / 2, res / 3);
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

function opositeWall(wall) {
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

function keyPressed() {
  isKeyPressed = true;

  if (keyCode === UP_ARROW || key === "W") {
    moveMouse(0, -1);
  } else if (keyCode === DOWN_ARROW || key === "S") {
    moveMouse(0, 1);
  } else if (keyCode === LEFT_ARROW || key === "A") {
    moveMouse(-1, 0);
  } else if (keyCode === RIGHT_ARROW || key === "D") {
    moveMouse(1, 0);
  }
}

function keyReleased() {
  isKeyPressed = false;
}


function moveMouse(dx, dy) {
  if (isKeyPressed) {
    let nextX = mouseXPos + dx;
    let nextY = mouseYPos + dy;

    if (
      nextX >= 0 &&
      nextX < maze.w &&
      nextY >= 0 &&
      nextY < maze.h &&
      maze.tiles[nextX][nextY].isCurrent !== false
    ) {
      maze.tiles[mouseXPos][mouseYPos].isCurrent = false;

      mouseXPos = nextX;
      mouseYPos = nextY;

      maze.tiles[mouseXPos][mouseYPos].isCurrent = true;
    }
  }
}
