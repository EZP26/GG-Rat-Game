let maze = null;
let res = 10;

function setup() {
  createCanvas(800,800);

  noStroke();

  makeMaze(width/res + 2, height/res +2);
  drawMaze();
}
let count = 0;
function draw(){
  if(count % 5 == 0){
    if(maze.stack.length != 0){
      background("#4A1D91");
      mazeIterate();
      drawMaze();
    }
  }
  count++;
}

function makeMaze(w, h){
  maze = 
  {
    "stack": [],
    "tiles": [],
    "w":w,
    "h":h,
  }

  for(let i = 0; i < w; i++)
  {
    maze.tiles[i] = [];
    for(let j = 0; j < h; j++)
    {
      maze.tiles[i][j] =
      {
        "up":"wall",
        "down":"wall",
        "left":"wall",
        "right":"wall",
        "isStart":false,
        "isCurrent":false,
        "x":i,
        "y":j,
        "seen":false,
      }
      if(i == 0 || i == w - 1 || j == 0 || j == h -1){
        maze.tiles[i][j].seen = true;
      }
    }
  }
  maze.tiles[1][1].isCurrent = true;
  maze.tiles[1][1].isStart = true;
  maze.tiles[1][1].seen = true;
  maze.stack.push(maze.tiles[1][1]);
}

function mazeIterate(){
  let current = maze.stack.pop();
  let tileAndWall = pickNeigbhor(current);
  if (tileAndWall){
    maze.stack.push(current);
  tileAndWall.tile[tileAndWall.wall] = "open";
  current[oppositeWall(tileAndWall.wall)] = "open";
  tileAndWall = true;
  maze.stack.push(tileAndWall.tile);
  
  current.isCurrent = false;
  tileAndWall.tile.isCurrent = true;
  }
  else if(maze.stack.length != 0){
    current.isCurrent = false;
    maze.stack[maze.stack.length-1].isCurrent = true;
  }
}

function pickNeigbhor(tile){
  let unSeen = [];
  
  let upTile = maze.tiles[tilel.x][tile.y+1];
  if(!upTile.seen)
  {
    unSeen.push({
      "tile": upTile,
      "wall": "up"
    });
  }

  let downTile = maze.tiles[tilel.x][tile.y+1];
  if(!downTile.seen)
  {
    unSeen.push({
      "tile": downTile,
      "wall": "down"
    });
  }

  let rightTile = maze.tiles[tilel.x][tile.y+1];
  if(!rightTile.seen)
  {
    unSeen.push({
      "tile": rightTile,
      "wall": "right"
    });
  }

  let leftTile = maze.tiles[tilel.x][tile.y+1];
  if(!leftTile.seen)
  {
    unSeen.push({
      "tile": leftTile,
      "wall": "left"
    });
  }

  if(unSeen.length == 0){
    return null;
  }

  return unSeen[Math.floor(Math.random()*unSeen.length)];
}

function oppositeWall(wall){
  if(wall == "up")
  {
    return "down";
  } 
  else if(wall == "down")
  {
    return "up";
  } 
  else if(wall == "left")
  {
    return "right";
  } 
  else if(wall == "right")
  {
    return "left";
  }

  return -1;
}

function drawMaze(){
  push();
  translate(-res, -res);
  for(let i = 0; i < maze.tiles.length; i++){
    for(let j = 0; j < maze.tiels[i].length; j++){
      let tile = maze.tiles[i][j];
      drawTile(tile, i, j);
    }
  }
  pop();
}

function drawTile(tile, i, j){
  strokeWeight(0);

  if(tile.seen == true){
    fill(0);
    square(i*res, j*res, res);
    
    strokeWeight(2);
    stroke("white");
    if(tile.up == "wall")
    {
      line((i)*res, (j)*res, (i+1)*res, (j)*res);
    }
    if(tile.down == "wall")
    {
      line((i)*res, (j+1)*res, (i+1)*res, (j+1)*res);
    }
    if(tile.right == "wall")
    {
      line((i)*res, (j)*res, (i)*res, (j+1)*res);
    }
    if(tile.left == "wall")
    {
      line((i+1)*res, (j)*res, (i+1)*res, (j+1)*res);
    }

  }
}