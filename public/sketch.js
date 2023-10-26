function setup() {
  createCanvas(400, 400);
  let w1 = new Walls(50, 50, 5);
  w1.getLocation();

  // Send log message to the server
  fetch('/log?message=Log message from p5.js')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function draw() {
  background(220);
}

class Walls {
  constructor(xLocate, yLocate, rotation) {
    this.xLocate = xLocate;
    this.yLocate = yLocate;
    this.rotation = rotation;
  }

  getLocation() {
    console.log(this.xLocate);
    console.log(this.yLocate);
  }
}
