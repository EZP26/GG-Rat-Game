function setup() {
  createCanvas(400, 400);
  let w1 = new Walls(50, 50, 5);
  w1.getLocation();
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
