let maze = null;
let res = 40;
let count = 0;
let tileCount = 0;
let mouseXPos = 0;
let mouseYPos = 0;
let isKeyPressed = false;
let mouseDot = {
  x: 1,
  y: 1,
};


function setup() {
  createCanvas(720, 720);
  noStroke();
  makeMaze(width / res + 2, height / res + 2);
  drawMaze();

  mouseXPos = mouseDot.x * res;
  mouseYPos = mouseDot.y * res;

  while (maze.stack.length != 0) {
    background("#aee68e");
    mazeIterate();
    drawMaze();
  }
}

function draw() {
  fill("red");
  ellipse(mouseXPos + res / 2, mouseYPos + res / 2, res / 2);
  count++;
}

function mousePressed() {
  let i = floor(mouseX / res);
  let j = floor(mouseY / res);

  if (i >= 0 && i < maze.w && j >= 0 && j < maze.h && maze.tiles[i][j].seen) {
    mouseDot.x = i;
    mouseDot.y = j;
    mouseXPos = i * res;
    mouseYPos = j * res;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && mouseDot.y > 0 && maze.tiles[mouseDot.x][mouseDot.y].down !== "wall") {
    mouseDot.y--;
    mouseYPos -= res;
  } else if (keyCode === DOWN_ARROW && mouseDot.y < maze.h - 1 && maze.tiles[mouseDot.x][mouseDot.y].up !== "wall") {
    mouseDot.y++;
    mouseYPos += res;
  } else if (keyCode === RIGHT_ARROW && mouseDot.x < maze.w - 1 && maze.tiles[mouseDot.x][mouseDot.y].right !== "wall") {
    mouseDot.x++;
    mouseXPos += res;
  } else if (keyCode === LEFT_ARROW && mouseDot.x > 0 && maze.tiles[mouseDot.x][mouseDot.y].left !== "wall") {
    mouseDot.x--;
    mouseXPos -= res;
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
    current[opositeWall(tileAndWall.wall)] = "open";
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