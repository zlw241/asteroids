
Function.prototype.inherits = function(SuperClass) {
  // const Surrogate = function() {};
  // Surrogate.prototype = SuperClass.prototype;
  // this.prototype = new Surrogate();

  this.prototype = Object.create(SuperClass.prototype);
  this.prototype.constructor = this;
};

function MovingObject(name) {
  this.name = name;
}
function Ship(name) {
  this.name = name;
}
function Asteroid(name) {
  this.name = name;
}

Ship.inherits(MovingObject);
Asteroid.inherits(MovingObject);

MovingObject.prototype.move = function () {
  console.log(`${this.name} move move move`);
};

Ship.prototype.shoot = function () {
  console.log(`${this.name} pew pew pew`);
};

const ship = new Ship('magicschoolbus');
const asteroid = new MovingObject('astry');



asteroid.move();
ship.move();
ship.shoot();
