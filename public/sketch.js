const rows = 100;
const cols = 100;
const cellSize = 4; // Adjust the cell size as needed
const wallThickness = 2; // Adjust the wall thickness as needed

const maze = [];

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);
  generateMaze();
  drawMaze();
}

function generateMaze() {
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      maze[i][j] = {
        visited: false,
        walls: [true, true, true, true],
      };
    }
}
}

function drawMaze() {
  background(255); // Set the background color

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = maze[i][j];
      const x = j * cellSize;
      const y = i * cellSize;

      // Draw walls based on the wall information in the maze data structure
      if (cell.walls[0]) {
        rect(x, y, cellSize, wallThickness); // Top wall
      }
      if (cell.walls[1]) {
        rect(x + cellSize - wallThickness, y, wallThickness, cellSize); // Right wall
      }
      if (cell.walls[2]) {
        rect(x, y + cellSize - wallThickness, cellSize, wallThickness); // Bottom wall
      }
      if (cell.walls[3]) {
        rect(x, y, wallThickness, cellSize); // Left wall
      }
    }
  }
}
